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

**⟶ AND ONE READING RULE FOR THIS ROW, ADDED 2026-10-11 BY THE BOUNDED CORRECTION PASS (`role_spec_writer`),
CLOSING THE IMPLEMENTER'S CONTRACT FINDING `CF-1` AT THIS ROW'S OWN HOME.** `RCA-8(d)` ANNOTATE-BESIDE: **every
cell above stands byte-for-byte; THIS clause is a PURE INSERTION, it adds no row to `§1`'s arithmetic and it
re-decides nothing.** **THE ROW'S ONE ANSWER IS UNMOVED: `AddressMalformed` for EVERY outside form of `cfg`,
the prototype-carrying object and the class instance included, with no instance returned.** **The class name
that state carries, and the rule that keeps the class name apart from this row's CODE, are declared at
`docs/specs/storeroom-js/crossing.md §1.8`'s dated clause of 2026-10-11 — which is that rule's ONE home, and
this row is read through it** (`[A3 docs/specs/storeroom-js/crossing.md §1.8 — the code-by-position rule;
A3 docs/specs/storeroom-js/parameter-semantics.md §2.1 · `PAR-JS-1` | cross-reference]`).

**⟶ AND ONE PARAMETER THIS ROW'S SCOPE DECLARES, LANDED 2026-10-11 BY THE BOUNDED CORRECTION PASS
(`role_spec_writer`), CLOSING THE IMPLEMENTER'S CONTRACT FINDING `CF-4`: THE VERBS' `instance` ARGUMENT.**
`RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte and the row's declared answer for every
outside form of `cfg` is unmoved; THIS clause is a PURE INSERTION, IT ADDS NO ROW — `§1`'s `18` and its
`16 + 1 + 1 + 1` arithmetic stand, and no printed range or count of this directory moves — and it declares ONE
parameter the set had left to discovery.** **THE DEFECT IT CLOSES, NAMED WITH ITS TERMS: EVERY verb's FIRST
argument is the package's own instance handle — `read` · `readLiteral` · `write` · `delete` · `rollback` as
`(instance, …)`, and `listen`/`unlisten` likewise (`contract.md §2.2`, `§2.10`) — while NO `PAR-JS` row
declared that position's domain, its outside values or its code.**

- **WHY A CLAUSE ON THIS ROW AND NOT A NINETEENTH ROW, SAID BECAUSE THE CHOICE MUST BE STATED: minting
  `PAR-JS-19` would falsify NINE printed ranges and counts at once** — `contract.md`'s index-region
  unit/prefix bullet, its part-map row for `parameter-semantics`, its `§6` header sentence, its `§6`
  arithmetic, its `§7.1` figure 10 and its `§7.3` row 29; THIS part's `§1` scope statement and its `§1`
  arithmetic; and `docs/specs/storeroom-js/test-cases.md` row 63 — **while the PRECEDENT for carrying a
  declared position inside a row that already exists is the `A76`/`A77` pass's own re-derivation of
  `PAR-JS-12`** (*"the registration's own parameter pair is carried by the two rows that exist and NO new row
  is minted"*), **and THIS row — the CONSTRUCTION's own row, whose PRODUCT the instance handle IS — is the
  row that scope belongs to.** **SO THE COUNT STAYS `18`, ITS ARITHMETIC STAYS TRUE, AND THE ONE SENTENCE THAT
  IS READ THROUGH THIS CLAUSE IS THE COVERAGE CLAIM *"every parameter the JS surface declares has a row"*,
  which now reads *"… has a row, or is carried inside a row's own scope by a dated clause"***
  (`contract.md §6`'s dated clause).
- **ITS DOMAIN, ITS UNIT AND ITS KIND: `parameter` · unitless · ONE opaque instance handle — THE OBJECT THE
  PACKAGE'S OWN FACTORY RETURNED, the handle `storeCreate(cfg)` answered, for ANY instance of THIS package
  module instance in this process.** **It is an identity the package owns, carrying exactly ONE own member —
  `register(handle, listener)`** (`contract.md §2.1`; `contract.md §2.4` item 5 (a)).
- **THE VALUES OUTSIDE IT: ABSENT** (a call supplying no value for the position) **· `null` · `undefined` · a
  non-object scalar (a `number`, a `string`, a `boolean`, a `bigint`, a `symbol`) · a plain object · an array ·
  a function · THE PACKAGE'S OTHER OPAQUE KIND — a `ListenerHandle` a verb returned or the construction
  adopted (`contract.md §2.3` item 2; `§2.8`) · a `Proxy` · and an object an instance of ANOTHER COPY of the
  package module returned.**
- **THE DECLARED ANSWER FOR EACH OF THEM: `AddressMalformed` — ONE answer for every class above, thrown in
  the single form of `docs/specs/storeroom-js/surface.md §2.5` and returning NO value** — **its `status` drawn
  from the store's closed `15`-member set, whose own declared trigger already covers *"a present argument
  outside its domain"* and *"an absent required argument"*, and its `message` generated as that section's
  item 5 declares at the failing target and the argument's position** (`surface.md §2.5` item 5 (g); `DD-40`)
  — **and NOTHING REACHES THE STORE in any of these cases: no verb call, no node minted, no anchor installed,
  no container changed and no journal entry appended.**
- **AND THE ONE ORDERING FACT THE POSITION OWES, SO A TWO-FAULT CALL IS NOT READ AS AMBIGUOUS: the `instance`
  position is decided FIRST, before the verb's other argument positions** — **so a call whose `instance` AND
  whose `address` are both outside their domains answers the INSTANCE's refusal; and a `TypeError` — or any
  other host error — escaping this position is a FINDING** (`surface.md §2.5` item 5 (e)).
- **ITS OBSERVABLE: a verb whose first argument is a handle the factory returned proceeds to that verb's own
  arguments and its own arm; EACH outside form above throws `{status: 'AddressMalformed', message}`, with the
  failing target and the class carried inside the one form; and no code of the closed set gains or loses a
  trigger by this clause** (`contract.md §2.9` item 2; `P-IM-3`'s `S-FAILSET`).
- **ITS `alt`, PRICED: A CALLER-SPELLED INSTANCE TOKEN — a plain `string` id — AS THE VERBS' FIRST
  ARGUMENT** — priced: it would make an instance addressable by a guessable name beside the handle `DD-14`
  makes opaque, and it would give the position a second spelling that `unlisten`-style reasoning would then
  have to answer; **available only with a fresh ruling of the architect recorded as an ACTIVE
  `docs/decisions.md` row, followed by a bounded amendment of `docs/specs/storeroom-js/`; the reversal
  instrument is that amendment and NO PARK IS NAMED AS IT** (`A66`).
- **ITS `park`: — (nothing of this position is parked; the instance handle's own boundary crossing is
  `contract.md §2.3`'s and is settled there).**

`[A3 docs/specs/storeroom-js/surface.md §2.2 — the verbs' signatures, whose FIRST position this clause
declares; A3 docs/specs/storeroom-js/contract.md §2.1 and §2.4 item 5 (a) — the factory's own product and its
one declared member; A3 docs/specs/storeroom-js/surface.md §2.5 item 5 (g) — the status's own declared
trigger; A1 docs/specs/storeroom-js-proposal.md §17 · `A75` — the package's own instance handle factory |
declared parameter semantics]`

### §2.2 `PAR-JS-2` — `cfg.filePath`, the `file` tier's external location

| Cell | Its value |
| --- | --- |
| `id` | **`PAR-JS-2`** |
| `parameter` | **`cfg.filePath`** |
| `kind` | **`parameter`** |
| `unit` | **unitless** — a filesystem path string |
| `domain` | **ABSENT — which is IN DOMAIN and creates the register at `mem` — or a non-empty `string` naming a path that PASSES the store's construction-time reachability probe (`A52`/`A55`: a DRY RUN with a write-access requirement)** **⟶ AMENDED 2026-10-13: *"PASSES the reachability probe"* is re-read at its source — `docs/specs/storeroom-native/contract.md §10.4` — whose TWO ARMS ARE BOTH KERNEL-DECIDED, and a PASSING path whose file is ABSENT is left by the store's own EXCLUSIVE CREATE as a ZERO-LENGTH FILE (AN EMPTY FILE AND NO BYTE; the PROBE itself still creates nothing, which is what the `A55` citation above still means)** |
| `the values OUTSIDE it` | **`null`** · **`undefined`** · **`''`** · **a non-string** · **a string that FAILS the probe, in three named forms: the parent directory does not exist · the path or its directory is not writable (an existing but read-only file is the canonical case) · the path IS a directory** **⟶ AND TWO FORMS THIS CELL ADDS 2026-10-13, so the domain's own `A55` citation is not read as covering them: the parent lies on a READ-ONLY MOUNT (`EROFS`) · the create is denied by an ACCESS ACL or an OWNERSHIP MISMATCH between the mode bits and the process (`EACCES`) — the withdrawn mode-bit arm answered BOTH of these REACHABLE and the first `file`-tier write then threw `FileCommitFailed` (`DEF-20`; `docs/specs/storeroom-native/contract.md §10.4` parts 1 and 5)** |
| `the declared answer for EACH outside value` | **`null` / `undefined` / `''` / a non-string → `AddressMalformed`, NO instance returned.** **A string that fails the probe → `FilePathUnreachable`, NO instance returned, and NOTHING created by the probe.** **AND THE ONE ABSENCE IS NOT AN OUTSIDE VALUE: an ABSENT `filePath` returns an instance whose register is `mem`** **⟶ AND 2026-10-13, SO THE OTHER SIDE OF THE CELL IS STATED TOO: a string that PASSES with its file ABSENT returns an instance whose register is `file`, and the construction's own EXCLUSIVE CREATE leaves the path ZERO-LENGTH — *"NOTHING created by the probe"* stands, and *"nothing created by the construction"* is NOT claimed** (`docs/specs/storeroom-native/contract.md §10.4` part 3) |
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

**⟶ AMENDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`), ON THE MINT RULE THE `domain` CELL
IS READ THROUGH.** `RCA-8(d)` ANNOTATE-BESIDE: **the row's cells above stand byte-for-byte; THIS clause is the
operative statement of ONE half of its `domain` cell, and it is a PURE INSERTION — no row is added, moved or
renumbered, and `§1`'s `18`-row arithmetic is unchanged.** **WHAT MOVED, NAMED WITH ITS TERMS: the `domain`
cell reads *"a store-minted handle being UNIQUE PER PROCESS (`A69`)"*, and `contract.md §2.3` item 6 now
declares that a REPEAT `listen` at an ALREADY-REGISTERED address MINTS NOTHING and returns the EXISTING
entry's handle** — **so the operative reading of the cell's uniqueness half is this, and NOT a promise of a
fresh token per call:** ***"a store-minted handle is unique per PROCESS over the tokens the store MINTS — no
OTHER token the store mints, in this instance, in any other instance of this process, or at any later moment
of this process, is equal to a minted one — and `A69` is a rule about the MINTS and never a promise that each
`listen` CALL mints one."*** **The cell's remaining halves stand: the construction's `listeners[]` takes a
plain `string`; every handle a verb RETURNS is the package's opaque JS value; and `unlisten` accepts the
OPAQUE form ONLY.** **AND NOTHING ELSE OF THIS ROW MOVES: its `the values OUTSIDE it` cell, its declared
answers (the no-op success at `unlisten`, and `AddressMalformed` with no instance for a construction entry
the construction cannot admit), its `supplier`, its `evaluator`, its `observable`, its `alt` and its `park`
cell are the row's own and stand as printed** — **and the rule's declaration, its operative terms (`A45`'s one
home entry per address and the store's address-level idempotence), the one case in which a later `listen`
DOES mint a different handle, and its priced `alt`, stand at `docs/specs/storeroom-js/contract.md §2.3` item 6**
(`[A3 docs/specs/storeroom-native/write-and-read.md §6.5 item 12 (c) — the mint rule at its store-side home;
A1 docs/specs/storeroom-js/contract.md §2.3 item 6; `DD-15` | declared parameter semantics]`).

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THIS ROW'S FIRING HALF, INHERITED FROM THE STORE'S LISTENER
CLAUSES.** `RCA-8(d)` ANNOTATE-BESIDE: **the table above and this row's own dated clause stand byte-for-byte
and are read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no row to `§1`'s `18`, moves no cell
of the table and declares no rule of its own.** **THE RULING, VERBATIM:** ***"Listener behavior is part of
store."*** (`docs/specs/storeroom-js-proposal.md` `§19` · `A78`).
**THE SPLIT, SO THE ROW'S OWN OUTSIDE-VALUE ANSWERS ARE NOT READ AS FIRING RULES:**
1. **WHAT STAYS THIS ROW'S AND THIS UNIT'S:** **the TWO JS SPELLINGS — a plain `string` IN at the construction
   and the package's OPAQUE value OUT — the opaque wrapper's internal identity comparison, the `unlisten`
   OPAQUE-only acceptance, and the wrapper's token being unreadable from JS** are the DELIVERY'S SPELLINGS of
   one handle and remain this row's own declaration (`DD-14`; `docs/specs/storeroom-js/contract.md §2.3` item 2).
2. **WHAT THE ROW INHERITS AND POINTS AT:** **the token's UNIQUENESS DOMAIN and its scope, the MINT's
   collision rule, the address-level idempotence that makes a repeat `listen` return the existing entry's
   handle, and every answer the row gives over a value OUTSIDE the domain are THE STORE'S** — **the domain and
   the mint at `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 and at
   `docs/specs/storeroom-native/contract.md §0.4`'s `ListenerHandle` construction rule; the outside-value
   answers as that store's own `§6.5` item 6 carried forward into its item 12, and as that store's own
   `parameter-semantics.md §2.13` (`PAR-13`) states them row by row.**
3. **AND ONE SENTENCE OF THIS ROW'S `observable` CELL — *"a handle appears in `triggered` ONLY where its
   listener's address is a prefix of the triggering address"* — IS A FIRING RULE AND IS NOW A POINTER:**
   **its home is `write-and-read.md §6.5` item 10 (d) (iii), the prefix test as a property of the store's
   listener surface, with that part's item 14 stating what a trigger's returned set contains and when a
   registration takes effect.** **The cell's remaining observables (the no-op success that removes nothing, a
   returned handle's unreadable token, and the destruction drive) are the row's own and stand as printed.**
**AND NOTHING ELSE OF THIS ROW MOVES: its `unit`, its `domain` cell's JS half, its `supplier`, its `evaluator`,
its `the clause that declares it` cell, its ruling cell, its `alt`, its `park` cell and every answer of its
outside-value list stand exactly as printed; this part's `§1` arithmetic stays `18` rows; and no row is added,
moved or renumbered** (`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78`; A3
docs/specs/storeroom-native/write-and-read.md §6.5 items 10 (d) (iii), 12 and 14 — the store-side clauses this
row reads through; A3 docs/specs/storeroom-native/parameter-semantics.md §2.13 · `PAR-13` | declared parameter
semantics]`).

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

**⟶ AND A SECOND DATED EXCEPTION CLAUSE, LANDED 2026-10-11 BY THE BOUNDED DECLARATION PASS
(`role_spec_writer`) ON `A76`: THE REGISTRATION SITE'S FAILURE FORM, RECONCILED TO THE ONE FORM AND TO THE
STORE'S CLOSED SET.** `RCA-8(d)` ANNOTATE-BESIDE: **the exception clause above stands byte-for-byte and is
read THROUGH this clause; THIS clause is a PURE INSERTION — it adds no row, moves no cell of the table above
and re-decides no ruling.** **WHAT MOVED, AND WHY IT HAD TO MOVE RATHER THAN BE READ BESIDE THE REST: `A76`
declares that a non-conforming input is rejected with a VERBOSE ERROR TO THE CLIENT INSIDE THE SINGLE DECLARED
FAILURE FORM, and `A76`'s reach clause states that it *"does NOT license a SECOND failure form"* — while the
exception clause above reads the registration's refusal as a JS `TypeError` carrying NO `status` and NO
`message` member.** **THE OPERATIVE READING, STATED WITH ITS TERMS: THE REGISTRATION SITE'S REFUSAL IS
DELIVERED IN `docs/specs/storeroom-js/surface.md §2.5`'s SINGLE FORM — `{status, message}` — with its `status`
drawn from the store's CLOSED `15`-member set (the store's own `AddressMalformed`, whose declared trigger
already covers *"a present argument outside its domain"* and *"an absent required argument"*) and its
`message` generated as that section's item 6 (d) declares.** **CONSEQUENTLY THE TWO THINGS THE AS-FILED CLAUSE
NAMED AS THE SITE'S OWN ARE READ AS THE SITE'S HISTORY AND NOT AS ITS OPERATIVE FORM: the `TypeError` is the
SHAPE the site was declared with at the bounded correction pass of 2026-10-11, and its *"NO `status` and NO
`message`"* was never a permission to MINT a status** — **and a `status` of `TypeError`, reached at the
addon's own boundary, is that finding and not a declared form, because the store's closed set holds no such
member** (`archive/gate4/storeroom-js-adversarial.md` · the sweep's row `10`;
`docs/specs/storeroom-js/contract.md §2.4` item 5 (d)).

**AND WHAT THE RECONCILIATION DOES NOT MOVE, ONE LINE EACH.** **The SITE stays `register(handle, listener)` on
the object `storeCreate` returned, and its two argument positions are unchanged** (`docs/specs/storeroom-js/contract.md
§2.4` item 5 (b)). **The DOMAIN stays *"a value THIS INSTANCE minted or adopted"*, so an outside handle is
still refused and the `unlisten`-style no-op reading still does not extend to it.** **The REPLACEMENT arm stays
a SUCCESS returning `undefined`.** **And the two-SITES distinction of the clause above is read as the
site-versus-verb distinction: a drive must still tell the two sites apart, while a `TypeError` escaping from a
VERB, in any form, remains a FINDING** (`docs/specs/storeroom-js/surface.md §2.4` item 5 (e);
`docs/specs/storeroom-js/surface.md §2.5` item 6 (g))
(`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the verbose rejection travels inside the one form;
A1 docs/specs/storeroom-js-proposal.md §18 · `A76`'s reach clause — no second failure form | state or
fail-state declaration]`).

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), CLOSING GATE 4'S `JS-4`: THE
INVOCATION ARGUMENT'S PRODUCER, AND ITS ARMS.** `RCA-8(d)` ANNOTATE-BESIDE: **this row's cells above stand
byte-for-byte and are read THROUGH this clause; THIS clause is a PURE INSERTION and it adds no row to `§1`'s
`18` — the invocation argument is carried INSIDE `PAR-JS-12`'s own scope, exactly as the handle the
registration site takes is carried inside it.** **THE FINDING IT CLOSES, NAMED WITH ITS TERMS: the `domain`
cell declares that the package's invocation *"passes the triggering ADDRESS as its argument"* while NO CLAUSE
DECLARED WHO PRODUCES THAT ADDRESS — and gate 4 measured a wire member (the facade's `triggeringAddress`)
carrying the CALLER'S OWN ENCODED ADDRESS rather than a value any `WriteResult`/`DeleteReceipt` clause
declares, with the no-op `listen` and the absent-tier `delete` unstated** (`archive/gate4/
storeroom-js-adversarial.md` §A · `JS-4`).

**THE PRODUCER IS DECLARED HERE, AND ITS ARMS ARE ENUMERATED EXHAUSTIVELY — so the member has a producer at
every arm and NO ARM IS LEFT TO DISCOVERY:**

1. **THE PRODUCER IS THE VERB'S OWN ADDRESS ARGUMENT.** **The invocation argument is the address the TRIGGERING
   VERB WAS CALLED WITH** — **the same JS array of segments the caller passed as that verb's `address`
   argument, carried through the crossing as a value and never a store-side record member** — **and it is
   therefore ALWAYS PRODUCED, because a verb that triggered cannot have been called without one: an address
   outside `AddressArg`'s domain is refused and produces NO trigger at all**
   (`docs/specs/storeroom-js/crossing.md §1.3`'s `AddressArg` rows; `PAR-JS-5`'s own row).
2. **AND IT IS NOT A MEMBER OF THE RETURNED RECORD, STATED SO THE TWO ARE NOT CONFLATED.** **No member of
   `WriteResult` or `DeleteReceipt` carries the invoking address**: **`watched` is a LIST of addresses the
   write's scope matched and is NOT the triggering address (`PAR-JS-14`), and `triggered` carries IDS and not
   addresses (`PAR-JS-15`).** **A reader looking for the argument in the record finds it in the CALLER'S OWN
   CALL and in no member.**
3. **THE ARMS, EVERY ONE OF THEM, WITH WHAT THE INVOCATION RECEIVES.** **The trigger-producing half of the
   declared surface is EXACTLY the two records `§2.7` item 1 names, so the arms are these and no others:**

   | The triggering verb | What the invocation receives as its ONE argument |
   | --- | --- |
   | **`write(instance, address, tier, value)`** — its `triggered` comes from the `WriteResult` | **the caller's own `address` argument, verbatim** — the same address the write was aimed at, whether it resolved to an existing node or minted one |
   | **`delete(instance, address, tier)` with a tier PRESENT** — its `triggered` comes from the `DeleteReceipt` | **the caller's own `address` argument, verbatim** |
   | **`delete(instance, address)` with the TIER ABSENT** — the same receipt and the same `triggered` | **the caller's own `address` argument, verbatim: the absent tier changes WHAT IS REMOVED and never the invoking address** |

4. **THE TWO ARMS GATE 4 NAMED AS UNSTATED, ANSWERED ONE LINE EACH.** **(i) A `delete` WITH AN ABSENT TIER
   contributes the SAME producer as the tier-present arm, per item 3's third row.** **(ii) A NO-OP `listen`
   — the repeat `listen` at an already-registered address that MINTS NOTHING — PRODUCES NO TRIGGERING ADDRESS
   AT ALL, BECAUSE IT PRODUCES NO TRIGGER: `listen` returns the entry's own handle
   (`docs/specs/storeroom-js/crossing.md §1.3`'s `ListenerHandle` row 2's ADOPTION; `contract.md §2.3` item 6
   at its own home) and `listen`'s own return carries no `triggered` member and invokes nothing** — **so the
   arm contributes NOTHING to this producer's domain and its absence is DECLARED rather than a silence**
   (`docs/specs/storeroom-js/contract.md §2.3` item 6; `§2.10`'s `listen` signature).
5. **AND THE ONE THING THIS DECLARATION IS NOT — STATED WITH ITS PRICE BECAUSE A NAMED PRODUCER OWES ONE.**
   **IT IS NOT A CONTRACT AMENDMENT OF THE RETURNED RECORDS:** **if a later pass wants the invoking address to
   be a RECORD MEMBER — a `triggeringAddress`-shaped member on `WriteResult`/`DeleteReceipt` — that is a
   SECOND CONTRACT AMENDMENT of this directory, priced here: it would add a member the store does not return,
   so the package would MINT it, and a minted record member is a datum with no store-side authority beside
   the two records `crossing.md §1.3` fixes member for member.** **The declaration above needs no such member,
   and the reversal instrument is a bounded amendment of `docs/specs/storeroom-js/`** (`[A1
   docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12` — a pinned default carries a priced alternative;
   `docs/specs/storeroom-js/surface.md §2.7` item 5 | declared parameter semantics]`).

**⟶ ADDED 2026-10-11 — THE BOUNDED COMBINED REPAIR (`role_spec_writer`), CLOSING `CF-DUP-3` AT THIS ROW'S
REGISTRATION HALF: THE POINTER, AND THE RULE THIS ROW DOES NOT DECLARE.** `RCA-8(d)` ANNOTATE-BESIDE: **this
row's table above and its three dated clauses stand byte-for-byte and are read THROUGH this clause; THIS
clause is a PURE INSERTION, it adds no row to `§1`'s `18`, moves no cell of the table, and declares no rule of
its own.**
**THE CORNER THE `CF-DUP-3` FINDING NAMED AT THIS ROW — a registration, a replacement or a withdrawal made
DURING a delivery window — IS DECLARED, WITH ITS ARGUMENT, AT `docs/specs/storeroom-js/surface.md` `§2.4`'s
`CF-DUP-3` clause, which is the ONE home that owns the delivery's rules: a delivery window's recipient set is
read from the array as it stands when the window opens, and a registration, a replacement or a withdrawal made
during it takes effect at the NEXT trigger.** **THIS ROW'S `the declared answer for EACH outside value` CELL AND
ITS `domain` CELL ARE UNMOVED AND DECLARE NOTHING ABOUT A WINDOW: `register`'s in-domain answer stays
`undefined` with the previous function REPLACED, its refusal form stays `surface.md §2.5`'s single form, and
WHEN a registration so made is reached by a delivery is NOT this row's to state** — **because the registry is
this row's subject and the DELIVERY WINDOW is `surface.md §2.4`'s and `§2.7`'s** (`docs/specs/storeroom-js/surface.md`
`§2.4`'s `CF-DUP-3` clause, at its own home; `docs/pending.md`'s `CF-DUP-3` clause, whose revisit condition (b)
this pointer satisfies; `docs/open-items-review.md` `§2-bis`).
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12` — a pinned default carries a priced
alternative; A3 docs/specs/storeroom-js/parameter-semantics.md `§2.12` · `PAR-JS-12` — the row this pointer
stands at | declared parameter semantics]`).

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THIS POINTER'S TARGET, CORRECTED TO THE STORE'S OWN CLAUSE.**
`RCA-8(d)` ANNOTATE-BESIDE: **the row's table above, its three dated clauses and the `CF-DUP-3` pointer clause
directly above stand byte-for-byte — *"`docs/specs/storeroom-js/surface.md` `§2.4`'s `CF-DUP-3` clause, which is
the ONE home that owns the delivery's rules"* and its *"WHEN a registration so made is reached by a delivery
is NOT this row's to state"* included — and they are read THROUGH this clause; THIS clause is a PURE
INSERTION, it adds no row to `§1`'s `18`, moves no cell of the table and declares no rule of its own.**
**THE RULING, VERBATIM:** ***"Listener behavior is part of store."*** (`docs/specs/storeroom-js-proposal.md`
`§19` · `A78`). **AND THE RULING'S OWN SENTENCE ABOUT EXACTLY THIS POINTER:** ***"when a REGISTRATION takes
effect is a property of the STORE's listener surface … so its home is the STORE's listener clause, with the
package's delivery carrying only the consequence — that the window's recipient set is read from the array as
it stands, which is the delivery-side half and stays at `§2.4` as a POINTER."***
1. **THE OPERATIVE TARGET OF THE POINTER ABOVE IS NOW THE STORE'S OWN CLAUSE:** **the registration's effect
   timing relative to a trigger — what a trigger's returned set contains, that a `listen` or an `unlisten`
   landing after that computation takes effect at the NEXT trigger, and the two symmetric cases — stands at
   `docs/specs/storeroom-native/write-and-read.md §6.5` item 14, with its argument (the returned list's order
   being unobservable, so no outcome may depend on an occurrence's position).**
2. **AND WHAT STAYS AT `docs/specs/storeroom-js/surface.md §2.4` IS THE DELIVERY-SIDE CONSEQUENCE ONLY:** **the
   package receives the list, performs its invocation after the verb has returned, and reads its recipient
   set from the list IT HOLDS once per distinct identity** — **which is this unit's own rule and is pointed
   back to the store's clause for the firing's terms.**
3. **AND THIS ROW ITSELF IS UNMOVED IN EVERY OTHER RESPECT:** **its `domain` cell declares the registration's
   ARGUMENTS, and WHEN a registration so made is reached by a delivery remains NOT this row's to state — it is
   the store's clause's to answer, as the pointer above already said.**
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78` — including its own `CF-DUP-3` re-homing sentence,
re-emitted above; A3 docs/specs/storeroom-native/write-and-read.md §6.5 item 14 — the pointer's operative
target; A3 docs/specs/storeroom-js/surface.md §2.4's re-homing clause of 2026-10-11 — the delivery-side
consequence, at its own home | declared parameter semantics]`).

**⟶ RE-DERIVED 2026-10-11 — THE `Q1` CONTRACT AMENDMENT (`role_spec_writer`), `A80`/`A81`: THE HANDLE SLOT OF
THE NEW `off` MEMBER, CARRIED INSIDE THIS ROW AND NOT JOINED BY A NINETEENTH.** `RCA-8(d)` ANNOTATE-BESIDE: **every
cell of the table above — its `domain`, its outside-value list, its declared answers, its `alt` and its `park` cell
— and this row's re-homing clause stand byte-for-byte and are read THROUGH this clause; THIS clause is a PURE
INSERTION, it adds NO ROW to `§1`'s `18`, moves no `§`-number, and re-derives THIS ROW'S SUBJECT rather than
minting a row beside it.** **THE RULINGS, VERBATIM:** ***"`off` can deregister"*** · ***"always validate"***
(`docs/specs/storeroom-js-proposal.md` `§8` · **`A80`** · **`A81`**). **AND WHY THE RE-DERIVATION RATHER THAN A
NINETEENTH ROW, SAID BECAUSE THE CHOICE OWES ITS REASON: `off`'s argument is THE SAME DATUM THIS ROW ALREADY
DECLARES — the package's opaque handle — reached at ONE MORE POSITION, exactly as the `instance` position of the
verbs was carried inside `PAR-JS-1` and the registration's handle inside `PAR-JS-12`; a new row would have
falsified nine printed ranges at once for a datum whose domain, spells and outside values are already these.**

**THE SLOT, NAMED WITH ITS SIGNATURE AND ITS POSITION: `off(handle) -> undefined`, the handle at `off`'s FIRST
AND ONLY ARGUMENT POSITION — and the position is ARGUMENT POSITION `1` OF `2`, reported as such.** **THE SLOT IS
A DIFFERENT VERB REACHING THE SAME DOMAIN, AND ITS DIFFERENCE FROM `unlisten` IS DECLARED AND NOT INCIDENTAL:
`unlisten(instance, handle)` performs the STORE-FACING WITHDRAWAL ONLY — the package's registry entry STANDING
(`§2.4` rule 4, UNMOVED) — while `off` performs the store-side withdrawal AND removes the PACKAGE'S OWN registry
entry for that identity, so RULE 4 IS SUPPLEMENTED AND NOT EXCEPTED** (`docs/specs/storeroom-js/surface.md §2.4`
item 7 (b), at its own home; `A80`'s own reconciliation).

**AND THE FOUR CELLS THE SLOT ADDS TO THIS ROW, EACH PRINTED BECAUSE THIS PART'S SCHEMA REQUIRES ALL THIRTEEN
AND A RE-DERIVATION OWES THE ONES IT MOVES:**
- **`parameter` (the slot).** **`handle`, at `off(handle)`'s first and only argument position** — **the same
  datum the `parameter` cell above names, at one more position; that cell's own words stand and this line names
  the position.**
- **`domain` (the slot's).** **THE OPAQUE HANDLE VALUE OF THIS INSTANCE — a value THIS INSTANCE minted (through
  `listen`, or through `on`, whose return is the same spelling) or ADOPTED at its own construction's
  `listeners[]`. `off` accepts the OPAQUE form ONLY and accepts NO `string`: a bare `string` is OUTSIDE this
  slot's domain, as it is outside `unlisten`'s (`§2.3` item 2).**
- **`the declared answer for EACH outside value` (the slot's), CLASS BY CLASS.**
  **A handle IN the domain whose identity the registry HOLDS a function for → `undefined`, with the store-side
  home entry WITHDRAWN and the registry's own entry for that identity REMOVED.**
  **A handle IN the domain whose identity the registry holds NO function for (never registered, or already
  removed by an earlier `off`) → `undefined`, removing nothing that was not there and disturbing NO OTHER
  REGISTRATION.**
  **A handle a FOREIGN instance minted · a value a PRIOR SESSION minted · a value the store never minted at all
  (fabricated) · a blank (empty-string) token · a non-opaque value · `null` · `undefined` · an ABSENT argument →
  `AddressMalformed` in `§2.5`'s single form, with NEITHER removal performed.** — **THE CONTRAST IS DECLARED,
  NOT OVERSIGHT: `unlisten` over each of those same values is a NO-OP SUCCESS and removes nothing (`§2.3` item 4,
  UNMOVED), while `off` REFUSES — because `off` removes a PACKAGE-OWNED entry and an unknown identity names no
  such entry.** **AND THE REFUSAL'S FORM IS THE SINGLE ONE and NEVER a `TypeError`** (`docs/specs/storeroom-js/surface.md
  §2.5` item 5, clause (g); `docs/specs/storeroom-js/parameter-semantics.md §2.12`'s second dated exception
  clause).
- **`evaluator` (the slot's) and the POSITION THE REFUSAL IS REPORTED AT.** **THE PACKAGE evaluates the slot —
  the class decision and the domain test are the package's own and are taken BEFORE any store call, so the store
  is never reached by an outside handle — and the STORE evaluates the withdrawal that a passing handle then
  performs.** **AND THE POSITION: a refusal at this slot is reported with THE ARGUMENT POSITION `1` OF `2` beside
  the failing class and the failing value, inside `§2.5`'s generated message and NEVER as a third member — which
  is exactly the class half plus the position half `A81`'s *"always validate"* requires and `A76`'s verbose
  rejection carries.**
**AND THE VALIDATION ORDER IS THIS SLOT'S OWN TERM OF THE CLAUSE: class first, on the value as it is, NEVER
repaired; the two removals happen only after the slot has passed, so a refused handle leaves the STORE-SIDE home
entry AND the registry entry BOTH UNTOUCHED** (`docs/specs/storeroom-js/crossing.md §1.7`–`§1.8`;
`docs/specs/storeroom-js/surface.md §2.4` item 7 (b), steps 1–3).
**AND THE ONE THING THIS SLOT IS NOT: `off` is a DELIVERY-SIDE member, so this slot's cells declare a PARAMETER
and NEVER a firing rule — what the store's home does when a `listen` or an `unlisten` lands is the store's, and
the authority for it is `docs/specs/storeroom-native/write-and-read.md §6.5` item 14** (`A78`).
**AND NOTHING ELSE OF THIS ROW MOVES: the cells above stand exactly as printed, no other row of `§2` is touched,
`§1`'s arithmetic stays `15 + 1 + 1 + 1 = 18` ✓, and NO NINETEENTH ROW EXISTS**
(`[A1 docs/specs/storeroom-js-proposal.md §8 · `A80` · `A81` — the rulings this slot implements;
docs/specs/storeroom-js/contract.md §2.3 item 4 and §2.4 rules 2–4 — the store-facing no-op set and the registry
rules the contrast is read against; A3 docs/specs/storeroom-js/surface.md §2.4 item 7 (b) — the slot's own clause
home | declared parameter semantics]`).

**⟶ RE-DERIVED 2026-10-11 — THE `Q1` CONTRACT AMENDMENT (`role_spec_writer`), `A79`/`A81`: `on`'s LISTENER SLOT,
CARRIED INSIDE THIS ROW AND NOT JOINED BY A NINETEENTH.** `RCA-8(d)` ANNOTATE-BESIDE: **every cell of the table
above — its `domain`, its outside-value list, its declared answers, its `alt` and its `park` cell — and this
row's four dated clauses stand byte-for-byte and are read THROUGH this clause; THIS clause is a PURE INSERTION, it
adds NO ROW to `§1`'s `18`, moves no `§`-number, and re-derives THIS ROW'S SUBJECT rather than minting a row
beside it.** **THE RULINGS, VERBATIM:** ***"Use S-1"*** · ***"always validate"***
(`docs/specs/storeroom-js-proposal.md` `§8` · **`A79`** · **`A81`**). **AND WHY THE RE-DERIVATION RATHER THAN A
NINETEENTH ROW, SAID BECAUSE THE CHOICE OWES ITS REASON: the slot below is THE SAME DATUM THIS ROW ALREADY
DECLARES — the caller's function, held by the package's registry — reached at ONE MORE POSITION, exactly as this
row already carries the `register` site's handle beside it.**

**THE SLOT, NAMED WITH ITS SIGNATURE AND ITS POSITION: `on(address, listener) -> handle`, the listener at `on`'s
SECOND ARGUMENT POSITION — and the position is ARGUMENT POSITION `2` OF `2`, reported as such.**
**ITS `domain` (the slot's): ANY JS FUNCTION the caller offers at that position; the package's registry admits
functions and NOTHING ELSE.** **Two clauses travel with it, each because the slot's own verb moves it:**
- **ITS HANDLE POSITION IS NOT THE REGISTRATION'S, AND THE DOMAIN IS THEREFORE NOT THE SAME.** **`on`'s FIRST
  argument is an `address`, NOT a handle: the handle `on` produces is its RETURN** (`docs/specs/storeroom-js/surface.md
  §2.4` item 7 (a); `docs/specs/storeroom-js/parameter-semantics.md §2.5`'s `PAR-JS-5`). **So an OUTSIDE HANDLE is
  no arm of this slot at all: at `on` the handle is not an argument, and `PAR-JS-8`'s domain governs it at `off`
  and at `register` and at no other position.**
- **AND WHERE `on` RETURNS A HELD ADDRESS'S EXISTING HANDLE, THE REGISTRY'S FUNCTION IS REPLACED** — **the same
  replacement arm `register` has, over the same map (`§2.4` rule 2), and the one difference between the two sites
  is the RETURN: `on` returns THE HANDLE, while the registration site returns `undefined`.**
**AND ITS `the declared answer for EACH outside value` CELL, RE-DERIVED FOR THIS SLOT — THE WHOLE CLASS SET IS
ENUMERATED SO NO CLASS FALLS BETWEEN THE TWO POSITIONS:**
- **A NON-FUNCTION `listener` (a number, a string, an object, `null`, `undefined`, an ABSENT second argument) →
  A REFUSAL: `§2.5`'s SINGLE FORM, a thrown `{status, message}` whose `status` is the store's own
  `AddressMalformed` — a member of the store's closed `15`-member set, minted by nothing — and whose `message`
  carries the failing target, the failing CLASS and THE ARGUMENT POSITION `2` OF `2`.** **IT IS NOT A JS
  `TypeError` AND NO SECOND FAILURE FORM ARISES** (`docs/specs/storeroom-js/surface.md §2.5` item 5, clause (g);
  this row's second dated exception clause; `DD-40`).
- **AN `address` OUTSIDE `AddressArg`'s DOMAIN → a REFUSAL at ARGUMENT POSITION `1` OF `2` in the same single
  form and with the same `status`, and it is `PAR-JS-5`'s `domain` and `PAR-JS-5`'s outside-value list that
  enumerate it — this row carries NO address class of its own** (`docs/specs/storeroom-js/parameter-semantics.md
  §2.5`; `docs/specs/storeroom-js/crossing.md §1.3`'s `AddressArg` rows).
- **THE TWO-AT-ONCE ARM, WHICH IS THE ONE THIS SLOT OWES BECAUSE `on` IS THE COMBINED CALL.** **Where BOTH
  arguments are outside their domains, the refusal reported is the FIRST FAILING POSITION's — the `address`, at
  position `1` — because `on` validates the `address` and then the `listener` and admits nothing until both have
  passed; AND IN EITHER ORDER THE OUTCOME THE CALLER OBSERVES IS THE SAME: NOTHING IS ADMITTED, so after the
  refusal no store-side home entry and no registry entry exists**
  (`docs/specs/storeroom-js/surface.md §2.4` item 7 (a), steps 1–3).
- **ITS `observable` (the slot's).** **A function invoked once after a write whose address scope covers its
  listener's address; a second `on` at one held address leaving ONE function registered for that identity with
  the replaced function never firing again; and — THE ATOMICITY OBSERVABLE — a refused `on` whose address the
  home did NOT hold leaving the home holding NOTHING, while a refused `on` at an address the home ALREADY held
  leaves that address's entry STANDING AND UNCHANGED.**
- **AND `supplier` / `evaluator` (the slot's).** **THE CALLER supplies the function; THE PACKAGE evaluates it —
  the class decision is the package's own and is taken BEFORE any store call — and the package's registry is the
  map that holds it; the store is reached only after both arguments have passed.**
**AND THE VALIDATION ORDER IS THIS SLOT'S OWN TERM OF THE CLAUSE: class first, on the value as it is, NEVER
repaired — a `Proxy`-wrapped callable being a CLASS question the same decision answers — and never a coercion of
a non-function into a callable** (`docs/specs/storeroom-js/crossing.md §1.7`–`§1.8`; `A81`).
**AND THE ONE THING THIS SLOT IS NOT: `on` is a DELIVERY-SIDE member, so this slot declares a PARAMETER and NEVER
a firing rule — WHICH listener fires and WHEN remain the store's, and their authority is
`docs/specs/storeroom-native/write-and-read.md §6.5` item 14** (`A78`).
**AND NOTHING ELSE OF THIS ROW MOVES: the cells above stand exactly as printed — this row's `domain` cell's
invocation half, its producer clause and its arms table, its `CF-DUP-3` pointer clause and its re-homing clause
included — no other row of `§2` is touched, `§1`'s arithmetic stays `15 + 1 + 1 + 1 = 18` ✓, and NO NINETEENTH ROW
EXISTS** (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A81` — the rulings this slot implements; A3
docs/specs/storeroom-js/surface.md §2.4 item 7 (a) — the slot's own clause home; A3
docs/specs/storeroom-js/parameter-semantics.md §2.5 and §2.8 — the neighbouring rows this slot's classes are told
apart from | declared parameter semantics]`).

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

**⟶ AMENDED 2026-10-11 — THE BOUNDED CALLER-SPELLED-DUPLICATE PASS (`role_spec_writer`), CLOSING THE SECOND
PRICED RESIDUAL THE PREVIOUS PASS NAMED: THE STALE *"PER INSTANCE AND PER SESSION"* UNIQUENESS SPELLING THIS
ROW'S OWN AUTHORITY TAG REACHES.** `RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte — its
`park` cell's `DD-22` pointer included — and is read THROUGH this clause; THIS clause is a PURE INSERTION, it
adds NO ROW to `§1`'s `18`, moves no `§`-number, and NO byte of the store's directory
`docs/specs/storeroom-native/**` is written by it — the correction lands HERE, in the citing row, and never
there** (`docs/specs/storeroom-js/contract.md §8`; `A1` `A68`).

**THE STALE SPELLING, NAMED WITH ITS SITE AND ITS TERMS AS THE PREVIOUS PASS FILED IT:** ***"`PAR-13`'s
`domain` cell still prints 'unique PER STORE INSTANCE and PER SESSION'"*** — that cell is
`docs/specs/storeroom-native/parameter-semantics.md` `§2.13` · **`PAR-13`**, the store's own row for the
`handle`, and it is the row THIS row's authority tag cites; **the store's own `docs/specs/storeroom-native/contract.md §0.4`
clause 2's dated reconciliation carries the OPERATIVE reading — a store-minted handle is UNIQUE PER PROCESS —
and that contract's `§2.13` cell stands as filed in its directory, which is NOT this unit's to amend**
(`docs/specs/storeroom-js/backup/GATE5-DOC-2026-10-11-manifest.md` `§6`, its residual clause; `A1`
`docs/specs/storeroom-js-proposal.md §13` · `A69` — *"Proceed on b"*; `A3`
`docs/specs/storeroom-native/contract.md §0.4` clause 2's dated clause).

**THE OPERATIVE READING, AND IT IS THIS UNIT'S OWN ROW'S READING BECAUSE THE TOKEN'S SCOPE IS THE WHOLE OF
WHAT `PAR-JS-13`'s `opId` AND EVERY HANDLE-SHAPED VALUE IN THIS DIRECTORY IS SCOPED BY:** **an `opId` is a
`string` the instance's own journal holds, and its uniqueness is satisfied by the SAME PROCESS-GLOBAL MINT
that mints handles — so the spelling this directory RELIES ON is *"UNIQUE PER PROCESS"*, which the store's
dated clause carries, and NEVER *"per instance and per session"*, which is the store's as-filed cell read
ALONE.** **This row's own cells move NOTHING by it: its `domain` cell's reach half — *"a non-empty `string` the
store's journal holds — in practice the `WriteResult.op.opId` the store returned"* — and its outside value *"a
well-shaped string the journal does not hold"* with its declared answer `JournalOpUnknown` STAY EVERY
`JournalOpUnknown` reachable only through THIS instance's own lookup** (`docs/specs/storeroom-js/contract.md
§2.3` items 1 and 4; `surface.md §2.3` item 1, whose token domain is the PROCESS).

**AND THE TWO HOMES' TERMS, STATED SO THE CITATION RESOLVES FROM EITHER SIDE:** **the store-side cell's own
as-filed bytes stand in the store's directory and are re-spelled by NO pass of this unit; the OPERATIVE
statement of that cell is the store's own dated clause at its `§0.4` clause 2, and THIS directory's rows cite
the operative statement and the as-filed cell TOGETHER, naming which is which — which is what this clause
does** (`[A3 docs/specs/storeroom-native/contract.md §0.4` clause 2's dated clause — the operative scope; A1
docs/specs/storeroom-js/contract.md §2.3 item 1 — this unit's own process-scoped token domain |
cross-reference]`).

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

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON `A77`: THIS ROW'S MEMBERS ARE
**IDS**, AND THE ADDRESS THIS UNIT INVOKES WITH IS A DIFFERENT DATUM.** `RCA-8(d)` ANNOTATE-BESIDE: **the row's
cells above stand byte-for-byte and are read THROUGH this clause; THIS clause is a PURE INSERTION and it adds
no row to `§1`'s `18`.** **THE RULING, VERBATIM:** ***"Listener passes an id back to client-side when
triggered, JS then has to match id to the function it was set with."*** (`docs/specs/storeroom-js-proposal.md`
`§18` · `A77`).

**THE OPERATIVE READING OF THIS ROW'S `domain` CELL, STATED WITH ITS TERMS:** **each member of this array is
the ID the trigger carries — the matched identity the registration site of `PAR-JS-12` was given, which is the
handle's OUTPUT spelling (`PAR-JS-8`) — and the package matches that identity to the function the caller
registered with it, so this row's members DECIDE WHICH functions are invoked and they are NEVER the argument
those functions receive.** **The argument is the TRIGGERING ADDRESS, whose producer and arms are `PAR-JS-12`'s
own dated clause; the two data travel in different places and a drive must not read either as the other**
(`docs/specs/storeroom-js/surface.md §2.4` item 6 (d); `docs/specs/storeroom-js/surface.md §2.7` item 5)
(`[A1 docs/specs/storeroom-js-proposal.md §18 · `A77`; A3 docs/specs/storeroom-js/parameter-semantics.md §2.12
| declared parameter semantics]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CALLER-SPELLED-DUPLICATE PASS (`role_spec_writer`), CLOSING THE
IMPLEMENTER'S `CF-DUP-1` AND THE PRICED RESIDUAL THE PREVIOUS PASS NAMED AT THIS ROW: THIS ROW'S `unit`, ITS
`domain` AND ITS OUTSIDE-VALUE LIST READ AS A COUNT, NEVER AS AN ARRAY DEDUPLICATION.** `RCA-8(d)`
ANNOTATE-BESIDE: **every cell above stands byte-for-byte and is read THROUGH this clause — the earlier dated
clause beneath this row included; THIS clause is a PURE INSERTION, it adds NO ROW to `§1`'s `18`, moves no
`§`-number and re-decides no rule of this directory.**

**THE THREE AS-FILED CELLS, NAMED AS FILED AND RE-EMITTED VERBATIM SO `git diff` RECOVERS THEM WHERE THEY
STAND:** the `unit` cell reads ***"`count` — a count of DISTINCT handles"***; the `domain` cell reads ***"a
fresh JS ARRAY of the package's OPAQUE handles, one per distinct handle the store returned. The empty array is
IN the domain and means no listener triggered"***; and the outside-value list carries ***"a duplicated
member"***.

**THE RECONCILIATION, ONE LINE PER CELL, BECAUSE TWO COUNTS TRAVEL IN ONE MEMBER AND THE TWO ARE NOT THE SAME
COUNTER** (`docs/specs/storeroom-js/surface.md §2.4`'s dated clause of 2026-10-11, clauses (i)–(ii), and its
twin at `docs/specs/storeroom-js/contract.md §2.4`; `docs/specs/storeroom-js/contract.md §5.5`'s and `§5.8`'s
dated clauses of the same date):

- **THE `unit` CELL.** **The figure is the INVOCATION COUNT — ONE PER DISTINCT IDENTITY — and it is the
  PACKAGE's own rule; it is TRUE of that count and FALSE read as a size the ARRAY must have.** **The ARRAY's
  own length is the STORE's multiplicity, carried ELEMENT FOR ELEMENT and not deduplicated at the boundary, so
  a lawful caller-spelled duplicate's one identity crosses TWICE while the invocation count stays `1`.** **The
  operative reading of the cell is therefore: *"`count` — a count of DISTINCT handles, AND IT IS THE INVOCATION
  COUNT; the array's own length is NOT this count."***
- **THE `domain` CELL.** ***"One per distinct handle the store returned"* is the DISTINCT-IDENTITY count and
  NEVER a promise that the array carries each identity ONCE.*** **The operative reading is: *"a fresh JS ARRAY
  of the package's OPAQUE handles whose MULTIPLICITY IS THE STORE'S — the handle the store's own list carries
  appears as many times as that list carries it, ELEMENT FOR ELEMENT — while the DISTINCT identities it holds
  number one per distinct handle the store returned; `[]` is IN the domain and means no listener
  triggered."*** **A caller may compare the array MEMBER BY MEMBER and count its DISTINCT identities; neither
  figure is read as the other and NO ORDER IS ASSERTED.**
- **THE OUTSIDE-VALUE LIST'S *"a duplicated member"*.** **IT STAYS AN OUTSIDE VALUE, AND THE REASON IS STATED SO
  THE ENTRY IS NOT READ AS A DEDUPLICATION RULE: a duplicated member is nothing this row's DECLARED READING
  produces, because the row declares no deduplication at all; it is precisely the member the PRICED ALTERNATIVE
  of collapsing the boundary — the alternative the same dated clause prices — would introduce.** **The entry
  is therefore READ AS: *"a duplicated member ARISING FROM A BOUNDARY-SIDE COLLAPSE, which this row does not
  declare"*, never as *"duplicated members are refused."*** **And the store's own contract declares that same
  member for the caller-spelled duplicate, so a reader who meets this entry after those clauses reads it
  through this one** (`docs/specs/storeroom-native/contract.md §0.2` · `DD-42` clause 3 and `DD-39`).

**AND WHAT DOES NOT MOVE HERE:** **the `parameter` · `kind` · `supplier` · `evaluator` · `observable` · the
clause-that-declares-it · the ruling-that-pins-it · the `alt` and the `park` cells stand exactly as printed;
NO row is re-spelled, added or renumbered, and this part's `§1` arithmetic stays `15 + 1 + 1 + 1 = 18` ✓.**
**This clause writes no byte of `docs/specs/storeroom-js/test-cases.md`, of the red set, of any runner or of
any build: the RED-SET AUTHOR re-derives `NG-JS-G`'s figures in parallel and the register's rows are the
CONTRACT's, named and not edited here.** **AND THE `derivation:` CLAUSE STAYS SINGLE: this clause carries an
authority tag and no `derivation:` clause** (`archive/gate3/storeroom-js-red-set.md` `§12.5` finding 3;
`docs/specs/storeroom-js/backup/GATE5-DOC-2026-10-11-manifest.md` `§5` item 3, whose named repair this clause
takes)
(`[A1 docs/specs/storeroom-js/contract.md §2.4 rule 3's CASE B — the array's multiplicity is the store's and
the invocation count is the package's; A3 docs/specs/storeroom-js/surface.md §2.4's dated clause of 2026-10-11
— the operative statement this row is read through | declared parameter semantics]`).

**⟶ RE-HOMED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THIS ROW IS THE STORE'S RETURNED MEMBER, AND ITS FIRING HALF IS
INHERITED.** `RCA-8(d)` ANNOTATE-BESIDE: **the row's cells above and its two dated clauses stand byte-for-byte
and are read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no row to `§1`'s `18`, moves no cell
of the table and declares no rule of its own.** **THE RULING, VERBATIM:** ***"Listener behavior is part of
store."*** (`docs/specs/storeroom-js-proposal.md` `§19` · `A78`).
**THE SPLIT, ONE LINE PER HALF, BECAUSE THIS ROW SITS EXACTLY ON THE BOUNDARY:**
1. **WHAT THE STORE'S LIST CARRIES — ITS MEMBERSHIP, ITS ELEMENT MULTIPLICITY AND WHAT IT HOLD WHEN THE
   TRIGGER WAS COMPUTED — IS THE STORE'S, AND THIS ROW CARRIES IT AND EDITS NOTHING.** **The membership rule is
   the address-prefix test at `docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (d) (iii); the
   member itself is that part's item 11 with the store's `§3.6`/`§4.4`; and WHAT the set contains relative to a
   registration or a withdrawal that lands after the trigger was computed is that part's item 14 (d)–(e), with
   its argument: the list's order is unobservable, so no reading may tie an outcome to a position in it.**
2. **WHAT IS THIS UNIT'S IS THE ARRAY'S JS SPELLING AND THE PACKAGE'S USE OF IT:** **the fresh JS array of the
   package's OPAQUE handles, its `[]` empty case, the no-order drive rule, and the registry's once-per-distinct
   -identity invocation are this unit's** — **and the row's own dated clause above already separates the
   STORE's multiplicity from the PACKAGE's invocation count, a separation this clause leaves exactly as
   printed.**
3. **AND NOTHING ELSE OF THIS ROW MOVES: its `unit` cell's INVOCATION-COUNT reading, its outside-value list,
   its declared answers, its `supplier`, its `evaluator`, its `observable`, its `the clause that declares it`
   cell, its ruling cell, its `alt` and its `park` cell stand exactly as printed; this part's `§1` arithmetic
   stays `18` rows; and no row is added, moved or renumbered** (`[A1 docs/specs/storeroom-js-proposal.md §19 ·
   `A78`; A3 docs/specs/storeroom-native/write-and-read.md §6.5 items 10 (d) (iii), 11 and 14 — the store-side
   clauses this row reads through | declared parameter semantics]`).

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

**⟶ ADDED 2026-10-11 — THE `Q1` CONTRACT AMENDMENT (`role_spec_writer`), `A81`: THE REFUSAL AT THE TWO NEW
MEMBERS' SITES — ITS FORM, ITS `status`, ITS CLASS HALF AND ITS POSITION HALF — DECLARED AT THIS ROW'S OWN `§`.**
`RCA-8(d)` ANNOTATE-BESIDE: **every cell above stands byte-for-byte and is read THROUGH this clause; THIS clause
is a PURE INSERTION, it adds NO ROW to `§1`'s `18`, moves no cell of the table above, adds no member to the form
and mints no code.** **THE RULING, VERBATIM:** ***"always validate"*** (`docs/specs/storeroom-js-proposal.md` `§8`
· **`A81`**).

**THE TWO NEW SITES PRODUCE NO NEW FAILURE FORM, NO NEW STATUS AND NO NEW MEMBER — AND THE CLASS SET IS
EXHAUSTIVE AND CLOSED, STATED HERE SO NO CLASS IS LEFT TO DISCOVERY:**
1. **A NON-FUNCTION `listener` at `on`'s position `2` of `2`** — including an ABSENT second argument —
   **→ `AddressMalformed`.**
2. **An `address` outside `AddressArg`'s domain at `on`'s position `1` of `2`** **→ `AddressMalformed`.**
3. **A handle this instance never minted or adopted at `off`'s position `1` of `2`** — a foreign instance's
   value, a prior session's value, a fabricated value, a bare `string`, a blank token, `null`, `undefined` or an
   ABSENT argument — **→ `AddressMalformed`.**
**AND `AddressMalformed` IS THE STORE'S OWN MEMBER of its closed `15`-member set, CARRIED VERBATIM: this unit
mints no code, widens no set and renames no member** (`DD-40`; `docs/specs/storeroom-js/surface.md §2.5` item 5
(c)).
**AND THE CLASS HALF AND THE POSITION HALF, AT THESE TWO SITES, AS `A81` REQUIRES: the reason is THE CLASS THE
VALUE HAS — named as `crossing.md §1.2`'s or `§1.3`'s own class, never as a class the value could be converted
to — and the POSITION IS CARRIED BESIDE IT AS THE ARGUMENT POSITION: `1` OF `2` for an `address` or a `handle`,
`2` OF `2` for a `listener`. The class half is MANDATORY and the position half is CONDITIONAL where no position
is declared** (`docs/specs/storeroom-js/surface.md §2.5` item 5 (b)). **AND BOTH HALVES TRAVEL INSIDE THE
GENERATED MESSAGE'S OWN TEXT AND NEVER AS A THIRD MEMBER — the member set stays EXACTLY `{status, message}`**
(`docs/specs/storeroom-js/surface.md §2.5` item 5 (b) and its Segment One / Segment Two split clause, which fixes
Segment One as the store's own and Segment Two as the boundary's appended class-and-position half).
**AND THREE THINGS THIS CLAUSE DECLARES SO THEY ARE NOT MET AS SURPRISES.** **FIRST, THE MESSAGE'S AUTHORITY IS
THE STORE'S GENERATOR AND NOT A PACKAGE CONSTANT: a package-authored string that STANDS IN FOR Segment One is a
FINDING, and the honest consequence that a target-VARYING refusal is not byte-identical to any constant stands as
`§2.5`'s `CF-3` clause prints it.** **SECOND, A RAW HOST `TypeError` escaping FROM EITHER NEW SITE IS A FINDING
AND NOT A FORM — the `TypeError` is the SHAPE the registration site was declared with at the bounded correction
pass of 2026-10-11, and it is not the operative form at `register`, at `on` or at `off`.** **THIRD, `off`'s
outside-arm refusal is NOT `unlisten`'s no-op `undefined`: the two verbs answer one value differently BY
DECLARATION, and the contrast is `docs/specs/storeroom-js/surface.md §2.4` item 7 (b)'s and `§2.3`'s dated
clause's.**
**AND NOTHING ELSE OF THIS ROW MOVES: its `status` cell, its `message` cell, its outside-value list, its
`supplier`, its `evaluator`, its `observable`, its `alt` and its `park` cell stand exactly as printed, `§1`'s
arithmetic stays `15 + 1 + 1 + 1 = 18` ✓, and NO ROW IS MINTED HERE**
(`[A1 docs/specs/storeroom-js-proposal.md §8 · `A81` — *"always validate"*; A3
docs/specs/storeroom-js/surface.md §2.5 item 5, clauses (b), (c), (d) and (g) — the form, the status, the class and
the position this clause applies at the two sites; `DD-40` | declared parameter semantics]`).

**6. AND THE ONE CLASS AT THE `listener` POSITION THAT THIS CLAUSE'S OWN EXHAUSTIVENESS DID NOT REACH —
   DECIDED AND DECLARED HERE, LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`), CLOSING THE
   CONTRACT FINDING THE HOST-FIX PASS FILED AGAINST THIS ROW.** `RCA-8(d)` ANNOTATE-BESIDE: **the five items
   above stand byte-for-byte — the *"EXHAUSTIVE AND CLOSED"* sentence included — and they are read THROUGH
   this item; THIS item is a PURE INSERTION, it adds NO class to item 1's refusal, moves no cell of the table
   above, adds no member to the form and mints no code.** **THE CLASS IT DECIDES: A `Proxy`-WRAPPED CALLABLE AT
   `on`'s LISTENER POSITION — `Proxy(function () {}, handler)`.** **`typeof` a `Proxy` OVER A FUNCTION IS
   `'function'`, and the class decision this row's item 1 declares is `typeof listener !== 'function'` READ
   ON THE VALUE AS IT IS — so the value IS ADMITTED as a listener and NOT refused as a non-function, and the
   sentence *"THE CLASS SET IS EXHAUSTIVE AND CLOSED"* did not say which side of its own boundary this class
   falls on.**
   **THE TWO READINGS, PRICED, AND THE ONE THIS PASS TAKES — STATED PLAINLY BECAUSE A DECISION IS THE WHOLE
   OF WHAT IS OWED HERE:**
   1. **ADMISSION — THE READING TAKEN, AND THE OPERATIVE ONE.** **A `Proxy` over a callable at `on`'s
   `listener` position is IN DOMAIN: it is a JS function by the language's own class test, the registry holds
   it as it holds any function, and the invocation of `deliver` calls it — the caller's OWN handler running,
   inside the caller's own function, at the moment the caller's own function would run.**
      **(a) WHY IT IS THE READING THIS CONTRACT'S OWN ORDER REQUIRES.** **`DD-34`'s refusal of a `Proxy` is a
   refusal at the ADDRESS position and is taken there because THE WALK READS the value: a trap-carrying
   `Proxy` over an ARRAY would run `getPrototypeOf` and `get` traps during the class decision itself, and a
   throwing trap would raise a raw host error out of a NEW member** (`§2.4` item 7 (a)'s order clause;
   `crossing.md §1.4` item 4 (g); `crossing.md §1.3`'s `AddressArg` row 12). **A listener is NEVER WALKED,
   NEVER COPIED AND NEVER READ BY ANY CLASS DECISION: nothing of the package touches it but `typeof` and the
   registry's own map, so NO TRAP RUNS AT ADMISSION, and the `DD-34` ground does not reach this position.**
      **(b) AND THE SHIPPED TREE ALREADY ANSWERS IT THIS WAY — EVIDENCE OF WHAT THE CODE DOES AND NOT ITS
   AUTHORITY: `bindings/js/index.mjs`'s `validateOnArguments` tests the listener with `typeof` alone, and its
   registry stores whatever passed that test** (`bindings/js/index.mjs`'s `validateOnArguments`/`deliver`).
   **THE ADMISSION IS THEREFORE ALSO THE READING THAT FALSIFIES NO CELL, and a drive may assert it at its own
   observable: a `Proxy` over a function is admitted by `on`, and the handler's trap (where the handler
   carries one) runs at the INVOCATION and not at the registration.**
      **(c) AND ITS ONE BOUNDARY IS `(e)` BELOW: the caller's own trap runs in the caller's own function,
   which is the DELIVERY-side throwing body and not a store state, and no class of this store's closed set is
   owed for it.**
   2. **REFUSAL — PRICED, AND NOT TAKEN.** **The alternative reading refuses the class at `on`'s step 1 by
   testing the candidate for proxiness before the function test, answering `AddressMalformed` in the one
   form.** **PRICED, AND THE PRICE HAS FOUR PARTS:** **(i) it is a CODE FINDING AND NOT A SPECIFICATION
   ALONE** — nothing in the shipped tree tests a listener for proxiness, so the reading cannot be declared
   into truth without a change to `bindings/js/index.mjs`, WHICH IS OUTSIDE THIS PASS'S WRITE SCOPE; **(ii)
   it makes the class-decision order ASYMMETRIC WITHIN ONE CALL** — `on` would test its `listener` argument
   for proxiness while its `address` argument is refused for proxiness as a CLASS at the position that
   decides classes, so the same predicate would stand at one position as a class decision and at the other
   as a pre-test of a value no clause reads; **(iii) it refuses a value the LANGUAGE classes as a function**,
   whose refusal therefore owes a class half the class taxonomy does not carry (`crossing.md §1.2`'s
   `Function` row 8 is the FUNCTION class and row 13's `NonPlainCollection` is the non-plain-collection class,
   and neither is a `Proxy`-over-a-function class); and **(iv) it falsifies NOTHING on its own** — no cell
   asserts a `Proxy` at this position, which is exactly why the class was left unpinned.
      **AVAILABILITY AND REVERSAL: BOTH READINGS REVERSE ONLY ON EVIDENCE A DRIVE PRODUCES, through the
   instrument named at the end of this item — a bounded amendment of `docs/specs/storeroom-js/`** (`A66`; no
   park is named as an instrument).
   **AND WHAT THIS ITEM DOES NOT DO, SAID SO THE EXHAUSTIVENESS SENTENCE IS NOT READ AS WIDENED: items 1, 2
   and 3 above keep their three refusal classes, `AddressMalformed` stays the only status at all three, the
   form stays exactly `{status, message}`, no fourth class is added to any refusal arm, and no `Proxy` is
   refused at the listener position — the class that was unpinned is now PINNED BY THIS CLAUSE and not by a
   new arm.** **AND THE ONE THING THE ALTERNATIVE WOULD OWE IF IT WERE EVER TAKEN IS NAMED: THE `Proxy`
   TEST'S OWN ORDER RELATIVE TO THE FUNCTION TEST AT THIS POSITION, so no reader re-derives a walk that
   reads a callable's traps before it decides its class.**
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A81` — *"always validate"*, whose class half this item
   states at this position; A3 docs/specs/storeroom-js/surface.md §2.4` item 7 (a) and §2.5 item 5 — the
   refusal's form, its status, its class half and its position half; A3 docs/specs/storeroom-js/crossing.md
   §1.2's rows 8 and 13 and §1.4 item 4 (g) with `DD-34` — the class taxonomy and the proxy ground this
   admission is measured against; A3 docs/specs/storeroom-js/surface.md §2.7` — the delivery-side throwing
   body | declared parameter semantics]`).

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

**⟶ RECONCILED 2026-10-11 — THE `Q8` DOCUMENTATION-REVIEW GATE (`role_documentation_reviewer`) ON THE JS CONVENIENCE ADD-ON, AT THIS PART'S `§2.17` (`PAR-JS-17`): THE REFUSAL SITE'S CLASS SET READ AGAINST THE DRIVES THAT NOW EXIST, AND ONE FIGURE IN A TEST CELL REPORTED RATHER THAN EDITED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands byte-for-byte — the `§1` index and its `15 + 1 + 1 + 1 = 18` arithmetic, every `PAR-JS-n` row and every dated clause at `§2.1`, `§2.8`, `§2.12` and `§2.17` — and each is read THROUGH this clause; THIS clause is a PURE INSERTION: it mints NO `PAR-JS` row, moves no count, rewrites no cell and re-decides no ruling.**
1. **`§2.17`'s ITEMS `1`–`3` ARE NOW DRIVEN, AND THE DRIVES EXIST AT `bindings/js/test/convenience.test.mjs`:** item 1 (a non-function `listener` at `on`'s position `2` of `2`), item 2 (an `address` outside `AddressArg`'s domain at position `1` of `2`) and item 3 (a handle this instance never minted or adopted at `off`'s position `1` of `2`) are each driven by that file's validation/atomicity cell and its outside-handle cell, with the class half and the argument position asserted inside the ONE form and NO raw host `TypeError` accepted at either site. **The drives are the amendment's red set, measured green; they add no row here.**
2. **AND THE `§2.17` ITEM `6` CLAUSE'S EXHAUSTIVENESS IS NOT WIDENED BY THE DRIVES: `AddressMalformed` stays the only status at all three sites, the form stays exactly `{status, message}`, no fourth class is added and no class is removed.** **The one class this part declares as PINNED-BY-CLAUSE rather than by a fourth arm — a `Proxy`-wrapped callable at the `listener` position — stands as item 6 prints it.**
3. **AND ONE FIGURE THIS PASS REPORTS AND DOES NOT EDIT, BECAUSE IT IS A TEST FILE'S OWN COMMENT AND NOT DOCUMENTATION: `bindings/js/test/convenience.test.mjs`'s header cites *"`§2.17` (the refusal site — the SIXTEEN-clause class set …)"*, while this part's `§2.17` now carries items `1`–`6` (the three original classes, the two new members' clauses, and item 6's `Proxy`-callable pin) with no clause of this part spelling a `SIXTEEN`-clause count.** **The `SIXTEEN` figure has no home in this part, so the test-side comment reads as a stale count of this part's own class set; it is REPORTED for the test role that owns that file and no byte of it is written by this pass.**
4. **AND NOTHING ELSE MOVES: the `§1` arithmetic stays `15 + 1 + 1 + 1 = 18` ✓, no row is minted, no `§`-number moves, the register keeps its `8` rows, and the ledger's census — an amendment being a ROW and never a unit — reads `2 DONE / 0 open` UNITS = `2` ✓ with THIS PASS MOVING NO COUNT.** **NO `APP`-GREEN IS CLAIMED AND NONE IS AVAILABLE: the `APP` layer for this unit is `NONE` and no consumer application has ever loaded this package** (`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81`; A3 docs/specs/storeroom-js/surface.md §2.4` item 7 and `§2.5` item 5 (g) — the single form and the two new sites' answers; A3 `bindings/js/test/convenience.test.mjs` — the drives, read at their own bytes; A3 docs/specs/storeroom-js/contract.md §5.5` — the re-derived register row whose six added failure entries those drives catch | declared parameter semantics]`).
