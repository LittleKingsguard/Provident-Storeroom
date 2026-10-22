# `crossing` — the value crossing: the deep copy in, the deep copy out, the per-class walk, and the JS-side equality relation

**KIND: `carrier`.** **This part holds RELOCATED SECTIONS of `docs/specs/storeroom-js/contract.md`'s own
text — its `§1` (`§1.1`–`§1.6`) — WHOLE**: **the relocated span keeps its `§`-number, its tables, its prose
and its authority citations unchanged**, and *a relocation is not a re-derivation — no claim gains or loses
an authority by moving* (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — the kind rule, and
§C.11.9 — the ordinary cross-reference clause | requirement]`). **The relocation is SPAN-BY-SPAN and
BYTE-EXACT against the baseline, and the pass's own record enumerates the citation re-spellings it required
as a REQUIREMENT list, one line per re-spelled citation, old form → new form** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v), and its class (v-2) | requirement]`).

**AND THE ONE THING THIS PART ADDS BESIDE THE RELOCATION, STATED SO IT IS NOT READ AS A SECOND HOME:** **a
citation to a relocated section names THIS part's path plus the `§`-number** — `docs/specs/storeroom-js/crossing.md
§1.2`, and so on — **because a bare `§n` across two documents is not an edge**
(`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`).

---

## §1. The value crossing — deep copy in, deep copy out, and no shared ownership either way

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried, rule for
rule, at `docs/specs/storeroom-js/crossing.md` (`§1`–`§5` of this document, relocated WHOLE), which is the
`carrier` part this directory's map declares for it.** **A citation to it names that part's path plus the
`§`-number**, because *a bare `§n` across two documents is not an edge* (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 — the ordinary cross-reference clause | requirement]`).
**The relocation is not a re-derivation: no claim below gains or loses an authority by moving, and every
authority citation stands unchanged in both homes** (`[A3 docs/specs/spec-scope-and-structure/contract.md
§C.11.6 — the kind rule | requirement]`).

### §1.1 The copy discipline, ruled — both directions, and nothing else

**THE ARCHITECT'S RULING, VERBATIM:** ***"Input must deep-copy the external data into the store, and the
output must deep-copy from the store into the JS output. Neither the store nor the JS should be able to get
a reference/pointer to data owned by the other."*** (`docs/specs/storeroom-js-proposal.md` `§10` · `A65`).
**THE DISCIPLINE, IN FOUR CLAUSES AND NOTHING ELSE:**
1. **INPUT IS A DEEP COPY.** A JS value the caller passes is **read once and CONVERTED into a value the
   STORE owns**; the store retains **no reference into JS memory**.
2. **OUTPUT IS A DEEP COPY.** A value the store returns is **CONVERTED into fresh JS-owned data**; the JS
   side holds **no reference into store-owned data**.
3. **NO SHARED OWNERSHIP EITHER WAY.** **No proxy, no live view, no getter into either side, no borrow and
   no pointer crosses in either direction, at any verb, at any argument position and at any return
   position.**
4. **CONSEQUENTLY THE BOUNDARY IS A VALUE BOUNDARY IN BOTH DIRECTIONS.** A mutation on one side after a
   call is **invisible** to the other, and **neither side's lifetime constrains the other's**.
   (`[A1 docs/specs/storeroom-js-proposal.md §10 · A65 | requirement]`)

**AND THE THREE THINGS THE RULING DOES NOT SAY, EACH DISPOSED OF HERE AS A DECLARED DEFAULT RATHER THAN
LEFT TO DISCOVERY:** **how either copy is performed** — the input copy **is** a structural walk
(`crossing.md §3`), and **no JSON-text carrier exists on the store's declared surface**, so a
`JSON.stringify`-then-parse route is impossible without a store-side change (`DD-6`); **whether the
store's own read already returns a copy the binding may adopt** — **the binding treats the store's returned
value as the thing to translate, and performs no second copy of its own** (`crossing.md §1.4`); and **what a
caller observes if it MUTATES its argument during a call** — **the walk reads each member ONCE, at the
moment it visits it, and the read-once rule is the whole of the answer: a mutation that lands after a member
has been visited is not observed, and a mutation that lands on a member the walk has not yet reached IS
observed — a single call is therefore a sequence of read-once observations and never a snapshot**
(`crossing.md §1.4`, `DD-34`).

**⟶ AMENDED 2026-10-21 BY `A140`: THE *"no JSON-text carrier"* HALF ABOVE IS READ AS *"no JSON-text carrier ON THE STORE'S DECLARED SURFACE"*.** **The input copy is still the structural walk, and it MAY use a binding-internal JSON-text step over the walk's own sanitized clone; the walk decides every class before any text. No store verb accepts, returns or exposes text** (`A140`; `contract.md` · `DD-6 — RE-DECIDED 2026-10-21`).

### §1.2 The crossing table's own closure — what a JS value can become

**THE TAXONOMY IS THE STORE'S AND IT IS UNMOVED.** **A JS value crosses into `StoreValue`, whose admitted
variants are `Str` · `Bool` · `Num` · `Object` · `Array`, and whose outside variants are `Null` ·
`Undefined` · `Function` · `Symbol` · `BigInt` · `NonFinite` · `Cyclic` · `NonPlainCollection`**
(`docs/specs/storeroom-native/contract.md §0.4`'s `StoreValue` rows; `src/value.rs`).
**THIS UNIT ADDS NO VARIANT, REMOVES NONE AND RE-NAMES NONE** (`[A3
docs/specs/storeroom-native/contract.md §1.4 — the admitted taxonomy and its outside list | requirement]`).

| # | The crossing row | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- | --- |
| **1** | `StoreValue::Str` | **a JS `string`**, primitive and `String` object alike? **— no: the OBJECT wrapper is refused** | `'a'`, `''`, a multi-byte string, a lone surrogate | a `new String('a')` **object wrapper** → `ValueNotAdmitted` (it is a `NonPlainCollection`, not a primitive) |
| **2** | `StoreValue::Bool` | **a JS `boolean`** | `true`, `false` | a `Boolean` object wrapper → `ValueNotAdmitted` |
| **3** | `StoreValue::Num` | **a JS `number`** | every finite `number`, integral or fractional, **positive and negative**, and both `0` and `-0` **in memory** — **⟶ 2026-10-21: `-0` CROSSES AS `0` AT THE BINDING BOUNDARY** (`A140`) | `NaN`, `Infinity`, `-Infinity` → `ValueNotAdmitted` (`NonFinite`); a `Number` object wrapper → `ValueNotAdmitted` |
| **4** | `StoreValue::Object` | **a plain JS object** | `{}`, `{a: 1}`, `Object.create(null)`, **a plain object from ANY realm**, an object with **non-integer-like** keys in any order | an object with a **`Symbol`-keyed own property** → `ValueNotAdmitted`; an object holding an **accessor** (`get`/`set`) own property → `ValueNotAdmitted`; a **class instance** (`new Foo()`) → `ValueNotAdmitted`; a `Map`/`Set`/typed array/`Date`/`RegExp` → `ValueNotAdmitted`; **a `Proxy` whose target is a plain object** → `ValueNotAdmitted` (`NonPlainCollection`, `DD-34`) |
| **5** | `StoreValue::Array` | **a plain JS array** | `[]`, `[1, 2, 3]`, a **dense** array of any admitted members, a cross-realm array? **— no: a cross-realm array IS accepted (it is an `Array`), a class extending `Array` is not** | a **sparse** array (`[1, , 3]`) → `ValueNotAdmitted` (`DD-8`); an array with an own **`Symbol`-keyed** property → `ValueNotAdmitted`; a class extending `Array` → `ValueNotAdmitted` |
| **6** | `StoreValue::Null` | **a JS `null`** | — | **ALWAYS REFUSED**: `ValueNotAdmitted`, at any depth |
| **7** | `StoreValue::Undefined` | **a JS `undefined`** — including an object member `{a: undefined}` | — | **ALWAYS REFUSED**: `ValueNotAdmitted`, at any depth. **The member is NOT dropped and its key is NOT skipped** |
| **8** | `StoreValue::Function` | **a JS function** (arrow, method, generator, async) | — | **ALWAYS REFUSED**: `ValueNotAdmitted` |
| **9** | `StoreValue::Symbol` | **a JS `symbol`** | — | **ALWAYS REFUSED**: `ValueNotAdmitted` — **and a symbol used as an OWN KEY is refused by row 4's rule, which is the same answer by a different route** |
| **10** | `StoreValue::BigInt` | **a JS `bigint`** | — | **ALWAYS REFUSED**: `ValueNotAdmitted`. **Stated because the store's numeric bound is JS-unreachable without it: a `BigInt` is the only JS spelling of `2^53 + 1`, and it is an outside class, so the out-of-bounds refusal has no JS-reachable instance and is a DEFENSE-IN-DEPTH rule** (`docs/specs/storeroom-js-proposal.md §8` · `A62`) |
| **11** | `StoreValue::NonFinite` | **a non-finite JS `number`** | — | **ALWAYS REFUSED**: `ValueNotAdmitted` |
| **12** | `StoreValue::Cyclic` | **a JS value that contains itself** | — | **ALWAYS REFUSED**: `ValueNotAdmitted`, detected on the walk's own ancestor stack (`DD-11`) |
| **13** | `StoreValue::NonPlainCollection` | **any other non-plain collection** | — | **ALWAYS REFUSED**: `ValueNotAdmitted` — a `Map`, a `Set`, a `WeakMap`, a `WeakSet`, a typed array, an `ArrayBuffer`, a `DataView`, a `Date`, a `RegExp`, a `Promise`, an `Error`, a `Proxy`, a class instance |
**AND THE REFUSAL'S ONE FORM, STATED SO NO ROW ABOVE NEEDS TO REPEAT IT:** **every refused row answers the
SAME code, `ValueNotAdmitted`, with its message generated by the store's own generator from the failing
target's address; no node is minted, no anchor is installed, no container changes and no journal entry is
appended** (`[A3 docs/specs/storeroom-native/contract.md §1.4 · §8.1 #14 | state or fail-state declaration]`).
**AND THE ONE CODE THIS TABLE NEVER PRODUCES: the KIND-CONTRADICTING case is a DIFFERENT failure.** A value
that IS admitted but whose container kind contradicts the target's answers **`ContainerKindConflict`** at
the STORE, and this unit's crossing does not pre-empt it (`[A3
docs/specs/storeroom-native/contract.md §1.4's kind-contradiction paragraph | state or fail-state
declaration]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDING 5 (`archive/gate3/storeroom-js-red-set.md` §5 item 5): THE LONE SURROGATE'S LAYER AND ITS ANSWER.**
`RCA-8(d)` ANNOTATE-BESIDE: **row 1 above stands byte-for-byte, *"a lone surrogate"* included among its
accepted forms; THIS clause is the operative statement of that class's LAYER, and it is a PURE INSERTION.**
**THE DEFECT IT CLOSES, NAMED: row 1 lists *"a lone surrogate"* among `StoreValue::Str`'s accepted forms,
and a Rust `String` is valid UTF-8 and CANNOT CARRY ONE — so the class had no Rust spelling at all, and the
same table's claim that the per-class table is drivable in Rust without a Node runtime was FALSE OF THIS ONE
ROW unless the class's layer is declared.**

**AND THE LAYER IS THE JS LAYER ALONE, WITH THE SAME ANSWER THE TABLE'S OTHER OUTSIDE STRING STATE
CARRIES:** **a JS `string` carrying a LONE SURROGATE (an unpaired surrogate code unit, e.g. a string holding
`\uD800` alone) is REFUSED `ValueNotAdmitted` AT THE PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED.** **The
reason is the row's own: the class cannot be represented as the store's `StoreValue::Str`, and *"any other
answer would DROP A MEMBER SILENTLY"* — so it is refused, and never silently replaced, never silently
dropped and never normalized into a replacement character.** **It is a BOUNDARY-ONLY class in the same
sense `a non-function registration` is: its refusal site is the package's own edge, it reaches no store and
it mints no code.** **AND THE CONSEQUENCE FOR THE DRIVE IS THE WHOLE POINT OF THE DECLARATION: a LONE
SURROGATE IS NOT CONSTRUCTIBLE IN RUST AT ALL, so its drive belongs to the JS LAYER and a Rust cell that
reports the class as driven is a FINDING** (`acceptance.md §4.1` item 6, which states the same in the
acceptance layer's own terms). **A Rust cell MAY drive the NEAREST REPRESENTABLE states — an astral
(non-BMP) character, which is a valid surrogate PAIR, and the replacement character `\uFFFD` — and it must
say in its own cell that the surrogate class itself is not among them** (`archive/gate3/storeroom-js-red-set.md`
§5 item 5) (`[A3 docs/specs/storeroom-js/acceptance.md §4.1 item 6; A3
docs/specs/storeroom-native/contract.md §1.4 — the admitted taxonomy and its outside list | state or
fail-state declaration]`).

### §1.3 The argument carriers' crossing table — `8` carriers, and the refused forms with their answers

**THE CARRIERS ARE THE STORE'S OWN ARGUMENT TYPES** (`docs/specs/storeroom-native/contract.md §0.4`), and
**the JS side spells each ONE FOR ONE: no carrier is renamed, merged or omitted** (`[A3
docs/specs/storeroom-native/contract.md §0.4 — the declared Rust spellings of every surface item |
requirement]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDING 4 (`archive/gate3/storeroom-js-red-set.md` §5 item 4): THE ABSENT-VERSUS-`undefined` RULE, DECLARED
ONCE AND CITED BY THE FOUR ROWS IT GOVERNS.** `RCA-8(d)` ANNOTATE-BESIDE: **every table below stands
byte-for-byte; THIS clause is the ONE rule they are read through, and it is a PURE INSERTION.** **THE DEFECT
IT CLOSES, NAMED WITH ITS ROWS: `JournalLengthArg` (rows 2 and 9), `ListenersArg` (row 5 and the
`null`/`undefined` case), `FilePathArg` (rows 2 and 3) and `TierArg` (rows 3 and 4) each print TWO rows with
TWO DIFFERENT answers for ABSENT against `null`/`undefined` — while NO clause said how a JS CALL
distinguishes them, and JS `undefined` is not one state but TWO: an ABSENT key, and a key PRESENT carrying
`undefined` (which the language distinguishes from both an absent key and `null`).**

**THE RULE. THE READING IS BY THE CARRIER'S OWN KIND, AND THE TWO KINDS ARE THE TWO WAYS A JS VALUE REACHES
THE PACKAGE:**

1. **A VERB'S TRAILING ARGUMENT IS READ BY CALL ARITY.** **For `read` · `readLiteral` · `delete` (and
   `write`, whose `tier` is required), an argument position the CALL SUPPLIED NO VALUE FOR IS ABSENT, and
   an argument position the caller spelled `undefined` at folds to THE SAME STATE as an absent one — because
   the language makes no distinction a callee can observe, and a JS call passes exactly the values it was
   given, with no key membership to test.** **CONSEQUENTLY `read(i, a)`, `read(i, a, undefined)` and
   `readLiteral(i, a, undefined)` are the ABSENT rows (`TierArg` row 3), while `read(i, a, null)` and
   `read(i, a, 'mem')` are PRESENT and answer their own rows.** **`TierArg` rows 3 and 4 therefore do not
   collapse: row 4's `undefined` half is reachable only where a VALUE carries `undefined` and not where a
   position is unfilled** — **which is why row 3's reading is ARITY and row 4's is the value's own class.**
   (`[A1 docs/specs/storeroom-js-proposal.md §9.1 · `K18`'s neighbourhood — the `TierArg` arity; A3
   docs/specs/storeroom-native/contract.md §3.1.1 — the arity table's own `null`/`undefined` column, read
   with `PAR-2`/`PAR-3` | declared parameter semantics]`)
2. **A `cfg` KEY IS READ BY `in`-MEMBERSHIP, AND AN ABSENT KEY IS NOT THE SAME STATE AS A KEY PRESENT
   CARRYING `undefined`.** **`storeCreate` takes ONE OBJECT, and object-key absence is a fact the carrier
   CAN carry — so the test is `'filePath' in cfg`, `'journalLength' in cfg`, `'listeners' in cfg`, and never
   an arity test.** **THE DECLARED ANSWERS, ONE PER STATE, AND THE TWO ANSWERS ARE THE WHOLE POINT OF THE
   RULE:**
   - **`filePath`: an ABSENT key IS IN DOMAIN and the register is created at `mem`; a key PRESENT carrying
     `undefined` is `FilePathArg` row 3's `AddressMalformed` (`undefined` is not a `string`).**
   - **`journalLength`: an ABSENT key is `JournalLengthArg` row 2's `ConstructionArgumentMissing`; a key
     PRESENT carrying `undefined` is row 9's `AddressMalformed`.** **The two states are told apart by their
     ANSWER and by nothing else, because at the object boundary both reach the carrier as the same JS value
     — so a drive MUST therefore carry the distinction as an object-key membership fact.**
   - **`listeners`: an ABSENT key is `ListenersArg` row 5's `AddressMalformed`; a key PRESENT carrying
     `undefined` is the same `AddressMalformed` and no instance is returned — so this is the ONE key of the
     three whose two states coincide in their ANSWER while still being TWO states of the carrier.**
   (`[A3 docs/specs/storeroom-js/parameter-semantics.md §2.2 · §2.3 · §2.4 — the three rows, read with this
   rule; A3 docs/specs/storeroom-native/parameter-semantics.md §2.6 · §2.7 · §2.12 | declared parameter
   semantics]`)
3. **WHAT THE RULE DOES NOT SAY.** **It declares no JS-side pre-check and no arity check by the package: the
   package still passes every position and every key through as supplied (`DD-46`), and the DISTINCTION is
   read by the CARRIER's own conversion and answers the store's own code.** **And no clause of this part
   may read an `undefined` MEMBER OF A STORED VALUE as an absent one: inside a value the walk meets, an
   `{a: undefined}` member is `§1.4` item 3's refusal and the key is never dropped, which is a DIFFERENT
   rule over a different subject** (`§1.4` item 3; `§1.2` row 7)
   (`[A1 docs/specs/storeroom-js-proposal.md §9.1 — the supervisor's priced `K3` rule, as adopted; `DD-8` |
   requirement]`).

**AND THE FOUR ROWS THIS RULE GOVERNS, NAMED SO EACH ROW IS READ THROUGH IT RATHER THAN RE-DERIVED:** **`JournalLengthArg` rows 2 and 9 · `ListenersArg` row 5 · `FilePathArg` rows 2 and 3 · `TierArg` rows 3 and 4 — the four carriers whose absent half and whose `undefined` half stand in TWO rows and would otherwise collapse into one.** **Every other carrier's row is unaffected: it is reached as a VALUE, and its own `null`/`undefined` row is the whole of what it has.**

**`AddressArg`** — the address argument, on `read` · `readLiteral` · `write` · `delete` · `listen`.

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`AddressArg` 1** | a JS **array** of segments | `[]`; `['a']`; `['a', 0, 'b']`; any array of in-domain segments | — |
| **`AddressArg` 2** | **`Segment` = a JS `string`** | `'a'`; `''` (**the empty string IS a legal key and a legal register key**); any string including one containing a `.` or a `/` | — |
| **`AddressArg` 3** | **`Segment` = a JS non-negative integer `number`** | `0`; `1`; `2**32`; a `number` that is integral, `>= 0` and exact as an `f64` | — |
| **`AddressArg` 4** | an **ABSENT** `address` | — | **`AddressMalformed`** (a required argument is missing) |
| **`AddressArg` 5** | **`null`** / **`undefined`** | — | **`AddressMalformed`** (the shape is not the address's shape at all) |
| **`AddressArg` 6** | a **non-array** — a number, a string, a boolean, an object, a function | — | **`AddressMalformed`** — **`'a.b'` is NOT a delimited address and is refused as a shape, verbatim** |
| **`AddressArg` 7** | an array holding a **negative integer** | — | **`AddressMalformed`** |
| **`AddressArg` 8** | an array holding a **non-integer `number`** (`1.5`, `NaN`, `Infinity`) | — | **`AddressMalformed`** |
| **`AddressArg` 9** | an array holding **`null`** / **`undefined`** | — | **`AddressMalformed`** |
| **`AddressArg` 10** | an array holding a **boolean**, an **object**, a nested **array** or a **function** | — | **`AddressMalformed`** |
| **`AddressArg` 11** | a **class instance** that is array-like but not an `Array` | — | **`AddressMalformed`** (the shape is not an array) |
| **`AddressArg` 12** | a **`Proxy` over an array** | — | **`AddressMalformed`** — **the binding owns proxy detection at the argument boundary exactly as it does inside the walk** (`DD-34`) |
| **`AddressArg` 13** | a **cross-realm array** (a `vm` array, an `Array` from a worker) | **ACCEPTED** — it is an `Array` | — |
| **`AddressArg` 14** | a **sparse array** as the address itself | — | **`AddressMalformed`** — **a hole is not an in-domain segment, and neither reading of a hole may be chosen silently** (`DD-8`) |

**⟶ AMENDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`), CLOSING THE CONTRACT FINDING THE
HOST-FIX PASS FILED AGAINST ROW 3: THE OUT-OF-RANGE INTEGRAL SEGMENT, ITS ANSWER AND ITS BOUNDARY.**
`RCA-8(d)` ANNOTATE-BESIDE: **every row of the `AddressArg` table above stands byte-for-byte — row 3's
*"a `number` that is integral, `>= 0` and exact as an `f64`"* included — and row 3 is read THROUGH this
clause; THIS clause is a PURE INSERTION, it adds no row to the table, mints no code and moves no census
figure.** **THE DEFECT IT CLOSES, NAMED WITH ITS TERMS: row 3's accepted forms are MATHEMATICALLY complete
and CARRIER-INCOMPLETE.** **The carrier that row's own spelling reaches is `JsSegment::Index(u64)`
(`package.md §4.5` item 2's `JsSegment` row, and `bindings/js/src/crossing.rs`'s
`JsSegment::Index(i) => Segment::Index(*i)`), so a JS `number` ABOVE `u64::MAX` that is nevertheless integral,
`>= 0` and exact as an `f64` — `2**64`, `1e30` — was ADMITTED by the row AS WRITTEN and had NO EXACT SPELLING
IN THE CARRIER AT ALL; the facade read it with `n as u64`, a SATURATING cast in Rust, so **two distinct
admitted addresses became ONE store address and shared ONE handle** — a silent fold, and therefore a repair,
which `A76`'s second part and `§1.8` forbid.** **THE RANGE CLAUSE, DECLARED AT THIS ROW:**
1. **ITS DOMAIN, COMPLETED — AND THE BOUND IS A DECLARED BOUND AND NOT THE CARRIER'S FULL RANGE.** **An
   integral segment `n` is IN DOMAIN iff `0 <= n <= Number.MAX_SAFE_INTEGER` (`2^53 − 1`), which is the
   largest integral `number` a JS consumer can hold, compare and transmit EXACTLY, and every `number` at or
   below it is exact in the carrier's `u64` as well.** **`Number.MAX_SAFE_INTEGER` IS THE BOUNDARY CARRIED
   HERE, and the declaration is deliberately narrower than the carrier's own `u64` range, which no JS
   `number` above `2^53 − 1` can spell exactly anyway.**
2. **THE OUT-OF-RANGE INTEGRAL SEGMENT'S ANSWER IS `AddressMalformed`** — **row 8's own code for a number
   outside the segment domain, carried and never minted** (`DD-40`) — **and it is REFUSED AT THE PACKAGE'S
   OWN WALK, BEFORE ANY VERB IS CALLED and BEFORE the carrier's cast is reached.** **`2**53` — the smallest
   integral `number` above the bound — and every integral `number` above it, `2**64` and `1e30` among them,
   are therefore REFUSED AND NOT FOLDED: no saturation, no truncation and no two addresses sharing one store
   address is lawful.** **The failing TARGET is the value as the boundary spells it and the failing SEGMENT
   is named by its INDEX in the message's reason half**, exactly as this table's other segment refusals name
   theirs (`surface.md §2.5` item 5 (b)).
3. **AND THE ROWS THIS CLAUSE DOES NOT MOVE, NAMED SO NO NEIGHBOUR IS READ AS AMENDED: row 3's acceptance of
   `0`, of positive integers, of `2**32`, of the empty string and of any string remains; row 8's
   non-integer, `NaN` and `Infinity` classes answer their own code unchanged; and rows 7, 9, 10 and 14 are
   untouched** — **the boundary is a RANGE statement inside an existing row's own subject and opens no new
   class.**
**AND ONE CONSISTENCY THIS PASS REPORTS AND DOES NOT DECIDE, BECAUSE THE CELL IT NAMES IS THE STORE'S: `on`'s
walk and the module namespace's `listen` read this boundary differently in the shipped tree, and the two
spellings of one act owe one answer.** **`bindings/js/index.mjs`'s `validateOnAddress` refuses an integral
segment above `Number.MAX_SAFE_INTEGER` with `AddressMalformed`, while the store's own `listen` route
(`src/store.rs`) tests each segment with `Segment::is_in_domain`, whose `Index` arm admits every `u64` — so a
JS `number` in `(2^53 − 1, u64::MAX]` is refused by the package at `on` and admitted by the store's own
carrier at `listen`.** **THE DECLARED ANSWER AT THIS BOUNDARY IS THE ONE THIS CLAUSE PRINTS — `2**53` is
refused — and making the module namespace's own `listen` route agree is a STORE-SIDE RE-DERIVATION owned by
that directory's author and REPORTED here rather than taken: it is named as the cell that must be re-derived
with this boundary, and no byte of `src/**` or of the store's directory is written by this pass** (`A68`).

**⟶ RECONCILED 2026-10-11 — THE `Q7` PROOFREADING GATE OF THE JS CONVENIENCE ADD-ON (`role_proofreader`): THE CONSISTENCY THE CLAUSE ABOVE REPORTS IS CLOSED AT THE BOUNDARY, AND TWO READINGS OF ONE CLASS ARE NAMED RATHER THAN SETTLED.** `RCA-8(d)` ANNOTATE-BESIDE: **every word of the clause above stands BYTE-FOR-BYTE — its two range items, its *"row 8's own code"* naming, its `Number.MAX_SAFE_INTEGER` boundary and its *"one act, two spellings owe one answer"* report included — and it is read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no row to the `AddressArg` table, mints no code and writes no `src/**` byte.**
1. **THE DIVERGENCE IS NO LONGER TWO-SIDED AT THE PACKAGE'S OWN EDGE — `listen` REFUSES WHAT `on` REFUSES, BY THE SAME ARM.** **THE CLAUSE ABOVE REPORTS** *"a JS `number` in `(2^53 − 1, u64::MAX]` is refused by the package at `on` and admitted by the store's own carrier at `listen`"*, **and the shipped tree's `bindings/js/index.mjs` no longer reads that way: `validateOnAddress` (the `on` site) and `encodeSegment` (the ONE arm every other verb's address is encoded through, `encodeAddress`'s) each take the SAME class-then-RANGE decision on the value as it is and each refuse it BEFORE the carrier's cast is reached; the module namespace's own `listen` passes its `address` through `encodeAddress` with no argument position, so `listen` refuses an integral segment above `Number.MAX_SAFE_INTEGER` too, in `§2.5`'s single form with the same `AddressMalformed` — the ONLY difference between the two sites being the message's ARGUMENT-POSITION half, which `on` carries and `listen` does not declare.** **SO NO JS `number` REACHES THE STORE'S OWN `u64`-ONLY ARM, AND THE TWO SPELLINGS OF ONE ACT NOW OWE ONE ANSWER AT THE BOUNDARY.** **WHAT THE STORE'S OWN Rust SURFACE DOES IS UNMOVED AND REMAINS THE STORE'S: `src/store.rs`'s `Segment::is_in_domain` admits every `u64`, so the CARRIER is wider than the boundary's declared bound — which is exactly the narrowing this clause declares (`package.md §4.5` item 2's `JsSegment` row is the carrier the bound sits in front of).**
2. **AND ONE THING THIS PASS REPORTS RATHER THAN DECIDES, WITH BOTH READINGS NAMED, BECAUSE THE CLASS IT NAMES HAS NO ROW OF ITS OWN.** **THE READING THIS CLAUSE PRINTS** — *"THE OUT-OF-RANGE INTEGRAL SEGMENT'S ANSWER IS `AddressMalformed` — row 8's own code for a number outside the segment domain"* — **reads `AddressArg` row 8 as the home of every number outside the segment domain.** **BUT ROW 8'S OWN PRINTED SUBJECT IS *"an array holding a non-integer `number` (`1.5`, `NaN`, `Infinity`)"*, AND AN INTEGRAL SEGMENT ABOVE THE BOUND IS NOT A NON-INTEGER — SO THE TWO READINGS ARE: (i) row 8's subject is *"a number outside the segment domain"* and its three spellings are examples of that subject, in which case the class IS carried and only its three example spellings are incomplete (THIS clause's own reading, and the code's comment reads the same way); (ii) row 8's subject is exactly the non-integer class, in which case the out-of-range INTEGRAL segment has NEITHER a row NOR a declared class, and its answer arrives as `AddressMalformed` by the code's own choice of that code rather than by a row's declaration — a TABLE GAP in the `AddressArg` table this clause does not fill.** **THIS PASS DOES NOT SETTLE WHICH READING THE ARCHITECT INTENDED: it adds no row (which would be the amendment's act, not a proofread's), and it names both so a later bounded amendment re-derives the row's subject instead of guessing** — **the boundary itself, its answer and the code's behaviour are the same under both readings, so no drive and no green depends on the choice.** **OWNER OF A DECISION: the architect or the JS contract's author role.**
3. **AND THE LAYER IS UNMOVED: every clause and figure of this part is `ENVELOPE/PURE`, the ASSEMBLED/`APP` LAYER FOR THIS UNIT IS `NONE`, and no `APP`-green is claimed here** (`[T: the out-of-range segment's boundary, the two sites that now agree, and one row-subject reading reported with both readings | CENSUS]`).
(`[A3 docs/specs/storeroom-js/crossing.md §1.3`'s `AddressArg` rows 3 and 8 — the two rows this clause reads;
A3 docs/specs/storeroom-js/crossing.md §1.8 — the no-repair prohibition the saturation violated; A3
docs/specs/storeroom-js/package.md §4.5 item 2 — the `JsSegment::Index(u64)` carrier this row's spelling
reaches; `DD-40` | state or fail-state declaration]`).

**⟶ RE-DERIVED 2026-10-11 — THE STORE-SIDE RE-DERIVATION THIS ROW'S CLAUSE *"REPORTED HERE RATHER THAN TAKEN"*
IS **TAKEN**, AND THE TWO SENTENCES THAT READ AS IF IT WERE NOT ARE RE-DERIVED WITH THE AS-FILED FORMS NAMED.**
`RCA-8(d)` ANNOTATE-BESIDE: **every word above stands BYTE-FOR-BYTE — the range clause's two items, its
*"row 8's own code"* naming, its `Number.MAX_SAFE_INTEGER` boundary, its *"one act, two spellings owe one
answer"* report, its `RECONCILED` clause's three items and its foot tag included — and each is read THROUGH
this clause; THIS clause is a PURE INSERTION, it adds no row to the `AddressArg` table, mints no code, moves no
census figure and writes no `src/**` byte.**

**THE STATE THAT MOVED, NAMED WITH ITS TERMS: the store-side re-derivation the clause above owns to
`docs/specs/storeroom-native/`'s author has LANDED, and the store's own shared segment predicate now carries
THE SAME BOUND this row declares.** **`src/value.rs`'s `Segment::is_in_domain` admits `Index(n)` iff
`n <= 9_007_199_254_740_991` (`2^53 − 1`, INCLUSIVE) — the ONE predicate FIVE routes ask: the walk's `L-1`
arm (behind `read`, `readLiteral` and `findAddress`), `write`'s target arm and its parents' walk, `delete`'s
target arm and its parents' walk, `listen`'s per-segment loop, and the construction's `listeners[]`
adoption.** **THE DOMAIN'S HOME IS THE STORE'S OWN and is `docs/specs/storeroom-native/store-model.md §1.5`
item 1's dated clause; THE ANSWER'S HOME IS `docs/specs/storeroom-native/store-model.md §2.2`'s `L-1` arm,
whose code is `AddressMalformed` (`docs/specs/storeroom-native/seams-and-lifecycle.md §8.1` #1)** — **so an
integral segment above the bound answers `AddressMalformed` ON EVERY ONE OF THE FIVE ROUTES and not at the
package's boundary alone.**

**1. THE FIRST SENTENCE RE-DERIVED — `RECONCILED` CLAUSE ITEM 1'S CLOSING.** **THE AS-FILED SENTENCE, RE-EMITTED
VERBATIM BECAUSE THIS CLAUSE RE-DERIVES IT AND NEVER REPLACES IT:** *"WHAT THE STORE'S OWN Rust SURFACE DOES IS
UNMOVED AND REMAINS THE STORE'S: `src/store.rs`'s `Segment::is_in_domain` admits every `u64`, so the CARRIER is
wider than the boundary's declared bound — which is exactly the narrowing this clause declares
(`package.md §4.5` item 2's `JsSegment` row is the carrier the bound sits in front of)."* **IT IS STALE IN TWO
OF ITS TERMS AND TRUE IN ONE, EACH STATED:** **(i) the clause it quotes has MOVED** — the predicate no longer
admits every `u64`, so the store's admissible segment domain and THIS boundary's declared bound are now ONE
bound and not two (`docs/specs/storeroom-native/store-model.md §1.5` item 1's dated clause); **(ii) the
sentence's *"the CARRIER is wider than the boundary's declared bound"* no longer describes the tree and ITS
READING IS HEREBY RETIRED — the retirement is stated below, with what it retires and what stands in its place;
and **(iii) its closing parenthesis STANDS WHOLE AND UNMOVED** — `package.md §4.5` item 2's `JsSegment` row IS
the carrier this boundary's spelling reaches, and this clause adds no word to it. **AND ONE PATH IN THE
AS-FILED SENTENCE IS RE-SPELLED HERE BECAUSE NO CITATION OF THIS DIRECTORY MAY POINT AT A PATH THAT DOES NOT
RESOLVE: the sentence above names the predicate's home as `src/store.rs`, and the predicate stands at
`src/value.rs`'s `Segment::is_in_domain`** (`RCA-8(d)` ANNOTATE-BESIDE: the as-filed path is RE-EMITTED verbatim
in the sentence quoted above and stands byte-for-byte; this clause is a PURE INSERTION and corrects no byte of
it) — **so the two clauses' spellings of ONE home now agree, and a reader who opens either path finds the
predicate at the second.**

**THE READING RETIRED, NAMED SO NO READER TAKES TWO STATES FOR ONE:** **the reading that *"THE STORE'S OWN
CARRIER IS WIDER THAN THE BOUNDARY'S DECLARED BOUND"* — i.e. that `Segment::Index`'s `u64` carrier's own range
is the store's segment domain, so a `number` in `(2^53 − 1, u64::MAX]` is IN DOMAIN at the store's Rust surface
and the store is therefore MORE PERMISSIVE than this boundary — IS RETIRED AS A READING OF THE TREE.** **WHAT
STANDS IN ITS PLACE, IN ONE LINE: THE STORE'S SEGMENT DOMAIN AND THIS BOUNDARY'S DECLARED BOUND COINCIDE at
`[0, 2^53 − 1]`, and `Segment::Index`'s `u64` is the CARRIER's TYPE WIDTH and is no longer the admitted domain**
— **declared as the domain's own bound at the home this clause names above, and enforced at the one shared
predicate the five routes ask.** **AND WHAT THIS RETIREMENT DOES NOT WITHDRAW, NAMED SO NO LIVE CLAIM FALLS
WITH IT: the `RECONCILED` clause's ITEM 1's own operative halves stand** — *"`validateOnAddress` … and
`encodeSegment` … each take the SAME class-then-RANGE decision on the value as it is and each refuse it BEFORE
the carrier's cast is reached"*, *"the module namespace's own `listen` passes its `address` through
`encodeAddress`"*, and *"NO JS `number` REACHES THE STORE'S OWN `u64`-ONLY ARM, AND THE TWO SPELLINGS OF ONE ACT
NOW OWE ONE ANSWER AT THE BOUNDARY"* — **and each of them is now true TWICE OVER: the boundary refuses BEFORE
the cast, AND the store refuses the value at its own walk.** **NOTHING OF `§1.3`'s ROW 3 RANGE CLAUSE, OF ROW 8,
OR OF THE `AddressArg` TABLE MOVES.**

**2. THE SECOND SENTENCE RE-DERIVED — `RECONCILED` CLAUSE ITEM 2'S LAST SENTENCE.** **THE AS-FILED SENTENCE,
RE-EMITTED VERBATIM BECAUSE THIS CLAUSE RE-DERIVES IT AND NEVER REPLACES IT:** *"— the boundary itself, its
answer and the code's behaviour are the same under both readings, so no drive and no green depends on the
choice."* **WHAT THIS CLAUSE RE-DERIVES, KEEPING EVERY HALF THAT STILL HOLDS AND NAMING THE ONE THAT MOVED:**
**(a) THE BOUNDARY, ITS ANSWER AND THE CODE'S BEHAVIOUR ARE THE SAME UNDER BOTH READINGS — UNMOVED.** **Row 8
is read either way as *"a number outside the segment domain"* (this part's reading) or as exactly the
non-integer class (the other), and BOTH readings print `AddressMalformed` for the out-of-range integral
segment** — **and the store now answers the SAME code at the SAME bound through the SAME member
(`docs/specs/storeroom-native/store-model.md §1.5` item 1 and its `§2.2` `L-1`), so the choice of reading is
even LESS observable at the tree than when the sentence was written.** **(b) THE OWNER STANDS: *"OWNER OF A
DECISION: the architect or the JS contract's author role"*** — **the row-subject question (`AddressArg` row
8's subject: the general class against its three example spellings) is NOT SETTLED here and NO ROW IS ADDED,
exactly as item 2 declares; it remains the later bounded amendment's subject.** **(c) AND THE ONE TERM THAT
MOVED, NAMED WITH ITS OBSERVABLE: *"so no drive and no green depends on the choice"* IS NOW TRUE OF THE DRIVES
AND FALSE OF ONE RED-SET CONTROL'S OWN EXPECTED READING.** **The store's `L-1` bound gives
`archive/gate3/storeroom-js-red-set.md`'s `NG-JS-L` cell a THIRD backstop: its saturation arm records that
*"THE SATURATION ARM IS BACKSTOPPED TWICE AT `on` (the walk's own guard AND `encodeSegment`'s) and once more at
the store's carrier, so NO SINGLE-BYTE control reaches it"*, while the store's `L-1` now refuses the value at
its own walk too** — **so a control that removes the two JS guards no longer reaches the carrier's saturation,
and the arm's recorded `BROKEN` reading and the cell's own `BROKEN` sentence owe ONE re-derivation at their
owner's hand.** **THE CELL IS `NG-JS-L`'s saturation arm at that record, and the re-derivation belongs to
`role_test_writer` and to that record's author — NOT to this pass: no test byte and no red-set byte is written
here** (`A68`'s layout: the store's directory and the test tree are not this pass's to write). **The arm's
SUBJECT is unmoved — an integral segment above the bound is refused, not folded — and only the SITE of the
first refusal and the recorded failure signature move.**
(`[A1 docs/specs/storeroom-js-proposal.md §11 · `A9`; A3 docs/specs/storeroom-native/store-model.md §1.5 item 1
— the domain's bound and its home; A3 docs/specs/storeroom-native/store-model.md §2.2 — the `L-1` arm that
answers it; A3 docs/specs/storeroom-native/seams-and-lifecycle.md §8.1 #1 — the code; A3
archive/gate3/storeroom-js-red-set.md — the `NG-JS-L` saturation arm's recorded reading; `A76`;
`docs/specs/storeroom-js/crossing.md §1.7` (a) and `§1.8` — the class decided first and the no-repair
prohibition; `DD-40` | state or fail-state declaration]`).

**`TierArg` and `TierSetItem`** — the tier argument, per verb; its arity is the STORE's own table and the
package passes it through verbatim (`DD-37`, `DD-46`).

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`TierArg` 1** | a tier **token string** | `'file'` · `'mem'` · `'temp'` | any other token (`'secure'`, `'FILE'`, `'disk'`, `'session'`, `''`) → **`OutOfDomainTier`** |
| **`TierArg` 2** | an **array** of tier tokens | on `read`/`readLiteral`: `[]`, `['mem']`, `['file','mem','temp']`, duplicates included | on `write`/`delete`: **any array of any length → `OutOfDomainTier`** (the array spelling is the READER's arity) |
| **`TierArg` 3** | **ABSENT** | on `read`/`readLiteral`/`delete`: in domain | on `write`: **`AddressMalformed`** (a required argument is missing) |
| **`TierArg` 4** | **`null`** / **`undefined`** | — | **`AddressMalformed`** on every verb |
| **`TierArg` 5** | a **non-string scalar** (number, boolean) | — | **`OutOfDomainTier`** |
| **`TierArg` 6** | an **object** | — | **`OutOfDomainTier`** |
| **`TierArg` 7** | a **function** | — | **`OutOfDomainTier`** |
| **`TierSetItem` 1** | a member of the tier array: a **token string** | `'file'` · `'mem'` · `'temp'` | any other token → **`OutOfDomainTier`** |
| **`TierSetItem` 2** | a member that is **`null`** / **`undefined`** | — | **`OutOfDomainTier`** |
| **`TierSetItem` 3** | a member that is a **non-string scalar** | — | **`OutOfDomainTier`** |
| **`TierSetItem` 4** | a member that is an **object** or a **function** | — | **`OutOfDomainTier`** |

**`OpIdArg`** — the rollback's op id.

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`OpIdArg` 1** | a **non-empty `string`** | only a value the `WriteResult.op.opId` the store returned, or a value the store's journal otherwise holds | — |
| **`OpIdArg` 2** | a **string the store's journal does not hold** | — | **`JournalOpUnknown`** (a well-shaped but unknown op id) |
| **`OpIdArg` 3** | the **empty string** | — | **`AddressMalformed`** (a blank `opId`) |
| **`OpIdArg` 4** | **ABSENT** | — | **`AddressMalformed`** |
| **`OpIdArg` 5** | **`null`** / **`undefined`** | — | **`AddressMalformed`** |
| **`OpIdArg` 6** | a **number** | — | **`AddressMalformed`** |

**`FilePathArg`** and **`JournalLengthArg`** — the two construction arguments.

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`FilePathArg` 1** | a **non-empty `string`** naming a path that PASSES the store's construction-time reachability probe | any such path | — **⟶ AMENDED 2026-10-13: *"PASSES the reachability probe"* is re-read at its source — `docs/specs/storeroom-native/contract.md §10.4`, whose two arms are BOTH kernel-decided (a write-mode open of an EXISTING path; an EXCLUSIVE CREATE at an ABSENT one) — and A PASSING PATH WHOSE FILE IS ABSENT NOW LEAVES A ZERO-LENGTH FILE, stated as this row's own observable at row `1`-bis** |
| **`FilePathArg` 1-bis** | **⟶ ADDED 2026-10-13 (`docs/specs/storeroom-native/contract.md §10.4`): a PASSING path whose file is ABSENT — the store's own EXCLUSIVE CREATE leaves it ZERO-LENGTH (AN EMPTY FILE AND NO BYTE, the boot's own act and not a second durability route), and the construction RETURNS an instance with the register fixed at `file`** | **the same path, now present and `0` bytes long, and the directory's entry count moved by EXACTLY ONE** | — |
| **`FilePathArg` 2** | **ABSENT** | **IN DOMAIN** — the register is created at `mem` and the store IS returned | — |
| **`FilePathArg` 3** | **`null`** / **`undefined`** / **`''`** / a **non-string** | — | **`AddressMalformed`**, no instance returned |
| **`FilePathArg` 4** | a string whose **parent directory does not exist** | — | **`FilePathUnreachable`**, no instance returned |
| **`FilePathArg` 5** | a string that **is a directory** | — | **`FilePathUnreachable`**, no instance returned |
| **`FilePathArg` 5-bis** | **⟶ ADDED 2026-10-13 (`docs/specs/storeroom-native/contract.md §10.4` parts 1 and 5; that document's `§8.1` #13's amended trigger clause): a string whose parent lies on a READ-ONLY MOUNT (`EROFS`), or whose create the process is denied by an ACCESS ACL or an OWNERSHIP MISMATCH between the mode bits and the process (`EACCES`) — the withdrawn mode-bit arm answered these REACHABLE, so the first `file`-tier write threw `FileCommitFailed`; the exclusive create answers them HERE** | — | **`FilePathUnreachable`**, no instance returned, and **NOTHING created — no file, no directory, no byte** |
| **`FilePathArg` 6** | a string naming an **existing but not writable** path | — | **`FilePathUnreachable`**, no instance returned |
| **`JournalLengthArg` 1** | a **positive integer `number`** (`>= 1`) | `1`, `2`, `100` | — |
| **`JournalLengthArg` 2** | **ABSENT** | — | **`ConstructionArgumentMissing`** — **the ONE absence the amended construction still refuses** |
| **`JournalLengthArg` 3** | **`0`** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 4** | a **negative integer** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 5** | a **fractional number** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 6** | **`NaN`** / **`Infinity`** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 7** | a **numeric string** (`'5'`) | — | **`AddressMalformed`** — **no coercion** |
| **`JournalLengthArg` 8** | a **boolean** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 9** | **`null`** / **`undefined`** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 10** | an **object** / a **function** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 11** | a **`bigint`** | — | **`AddressMalformed`** |
| **`JournalLengthArg` 12** | a positive integer **beyond `u32`** | — | **`AddressMalformed`** |

**⟶ ADDED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): ROW 12'S CARRIER, DECLARED BESIDE
THE ROW BECAUSE THE ROW'S OWN ANSWER ARRIVES THROUGH IT.** `RCA-8(d)` ANNOTATE-BESIDE: **the tables above and
below stand byte-for-byte and row 12's printed answer DOES NOT MOVE; THIS clause is a PURE INSERTION and it
names the state row 12 is reached through.**

**THE ROW'S ANSWER IS CARRIED BY A STATE THE TABLE DOES NOT PRINT: `JsJournalLengthArg::TooLarge(u64)`,
which carries the `u64` a positive integer beyond `u32` arrives as.** **The `u64` is converted onto the
STORE'S OWN `JournalLengthArg::Fractional` arm, whose answer for a non-integral value is the `AddressMalformed`
row 12 declares — so THE DECLARED ANSWER IS UNCHANGED, IT IS REACHED BY A DECLARED CARRIER RATHER THAN BY
ROW 12'S OWN ARM, and NO CODE IS MINTED, CONVERTED OR RE-MAPPED on the way** (`DD-1`; `DD-40`). **The state
is declared at its own home in `package.md §4.5` item 2's carrier clause, which names this row beside it.**
**A value beyond `u32` that answers anything but `AddressMalformed`, and a second state carrying the same
class, are FINDINGS** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12`; A3
docs/specs/storeroom-js/package.md §4.5 item 2 — the carrier table and its `TooLarge(u64)` clause; A3
docs/specs/storeroom-native/parameter-semantics.md §2.7 · `PAR-7` | declared parameter semantics]`).

**`ListenersArg`** and **`ListenerHandle`** — the construction's array and the handle.

| # | Its JS side | The accepted forms | The REFUSED forms, and the answer |
| --- | --- | --- | --- |
| **`ListenersArg` 1** | a JS **array** of `{ address, handle }` records | `[]` (**the ordinary no-listener store**); `[{address:['a'], handle:'l1'}]`; **a duplicate address with two DIFFERENT handles — both entries are KEPT** | — |
| **`ListenersArg` 2** | an array entry that is **not** a plain `{ address, handle }` record | — | **`AddressMalformed`**, no instance returned |
| **`ListenersArg` 3** | an array entry whose **`address`** lies outside `AddressArg`'s domain (rows 4–14) | — | **`AddressMalformed`** (`AddressArg`'s own answer carried) |
| **`ListenersArg` 4** | an array entry whose **`handle`** the construction cannot admit (a non-string, `null`, `undefined`, an object) | — | **`AddressMalformed`**, no instance returned |
| **`ListenersArg` 5** | **ABSENT** | — | **`AddressMalformed`** — **the ONE absence the construction does not admit** |
| **`ListenerHandle` 1** | **INPUT**: a **plain `string`** in a construction entry | any non-empty string; **a string equal to one the store would itself mint is ADOPTED VERBATIM and is lawful** | an empty string → **`AddressMalformed`** |
| **`ListenerHandle` 2** | **OUTPUT**: the package's **opaque JS value** wrapping a token the store returned | an identity the package itself minted a wrapper for, or adopted | **a bare `string` passed to `unlisten`** → the package answers as an unknown handle → **a no-op success** (see `§2.3.3`) |

### §1.4 The walk's own rules — the per-class decisions, the plain-object test, the ceiling and the guard

**The whole of this subsection is carried at `docs/specs/storeroom-js/crossing.md §3`, cited by path from
every site that needs it** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`).

1. **A `Symbol`-KEYED OWN PROPERTY REFUSES THE WHOLE VALUE.** If the walk meets an object or an array
   carrying an own property whose key is a `Symbol`, **the whole value is refused `ValueNotAdmitted`** —
   **because a symbol key is invisible to `Object.keys`/`Object.entries`/`JSON.stringify`, so any other
   answer would DROP A MEMBER SILENTLY, which the store's own taxonomy forbids** (`DD-8`).
2. **A SPARSE ARRAY REFUSES THE WHOLE VALUE.** If the walk meets an array with a hole, **the whole value is
   refused `ValueNotAdmitted`** — **because `Array.from` reads the hole as `undefined` and
   `JSON.stringify` reads it as `null`, so the two readings disagree and neither may be chosen silently**
   (`DD-8`).
3. **AN `{a: undefined}` MEMBER REFUSES THE WHOLE VALUE.** The walk **sees** the member and **must decide**;
   `undefined` is an outside class, so **the member's value is refused `ValueNotAdmitted` and the key is
   NEVER dropped** (`DD-8`; row 7 of `§1.2`).
4. **THE PLAIN-OBJECT TEST IS STRUCTURAL AND REALM-AGNOSTIC, STATED IN WORDS SO IT IS NOT A ONE-LINER:**
   **a value is a plain object iff ALL of the following hold:** **(a)** it is not `null` and
   `typeof x === 'object'`; **(b)** its own property keys that are **enumerable string** keys are the
   members the walk takes; **(c)** it carries **no own accessor** (`get`/`set`) property — one refuses the
   whole value; **(d)** it carries **no own `Symbol`-keyed property**; **(e)** its prototype is **either
   `null`** (**and `Object.create(null)` is ACCEPTED — it is the plainest case there is**) **or a prototype
   whose OWN properties are exactly the plain-object prototype's, reached without an `instanceof` test and
   without a comparison against this realm's `Object.prototype`** — so **a plain object from ANOTHER REALM
   (`vm`, a worker, `structuredClone`) is ACCEPTED**; **(f)** it is **not** a class instance — **a
   prototype-carrying object whose prototype is not a plain-object prototype is REFUSED
   `ValueNotAdmitted` (`NonPlainCollection`)**, **and this is the ONE place where a rule resembling an
   identity test is right**; and **(g)** it is **not a `Proxy`** — **the BINDING owns proxy detection, and a
   `Proxy` is REFUSED** (`DD-34`).
   (`[A1 docs/specs/storeroom-js-proposal.md §9.1 — the supervisor's priced `K2` rule, as adopted |
   declared parameter semantics]`)
5. **THE DEPTH AND SIZE CEILING IS DECLARED AND PRICED.** **The walk refuses a value whose nesting depth
   exceeds `64` or whose visited-node count exceeds `1,000,000`, with `ValueNotAdmitted`; the package ships
   no configuration knob for either bound** (`DD-10`). **The two figures are this unit's own declaration and
   are not measurements** (`[A1 docs/specs/storeroom-js-proposal.md §10 · A65 — the copy's cost bound is
   one of the four things the ruling does not name | declared parameter semantics]`).

   **⟶ AND THE ARM THIS CEILING ROW'S PROPERTY IS ABOUT, DECLARED 2026-10-11 BY THE BOUNDED DECLARATION PASS
   (`role_spec_writer`), CLOSING GATE 4'S `JS-8`.** `RCA-8(d)` ANNOTATE-BESIDE: **the item above stands
   byte-for-byte and its two figures and its answer do not move; THIS clause is a PURE INSERTION, it adds no
   row, and it declares WHICH SIDE'S WALK answers — because gate 4 found the ceiling measured at the ADDON
   and the clause placed at the package's own walk, one class later**
   (`archive/gate4/storeroom-js-adversarial.md` §A · `JS-8`).

   **THE ARM IS THE PACKAGE'S OWN WALK'S, AND THE PROPERTY IS ABOUT THAT ARM:** **the depth-`64` /
   node-`1,000,000` refusal this item declares is the PACKAGE'S OWN WALK'S — the refusal is PRODUCED at the
   package's boundary (`§1.7`'s step three), BEFORE any verb is called and BEFORE any addon call is
   reached — and the walk that produces it is the SAME walk `§1.7` declares the class decision for.**
   **THE TWO ARMS THE PROPERTY MUST NOT BE CONFUSED WITH, NAMED SO A DRIVE CANNOT SATISFY ONE BY MEASURING
   THE OTHER:** **(i) AN ADDON-SIDE CEILING THAT REFUSES THE SAME VALUE ONE CLASS LATER IS A DIFFERENT ARM
   AND DOES NOT SATISFY THIS PROPERTY** — **it is a refusal produced after the package's walk has already
   admitted the value, so the walk's own bound was not measured; and its class is whatever the arm that
   produced it answers, which is exactly the divergence gate 4 measured** (`JS-8`: the value is refused at
   the addon *"one class later than the clause places it"*); **(ii) A STORE-SIDE CEILING IS NOT AN ARM OF
   THIS ROW AT ALL** — the store's own declared bound is the store's clause and not this unit's, and a
   refusal it produced is not evidence about this walk.

   **AND THE EXACT BOUNDARY THE PROPERTY'S ARM ASSERTS, SO THE TWO ARMS' FIGURES CANNOT BE READ AS ONE:**
   **the PACKAGE'S OWN WALK admits a value of depth `64` and REFUSES a value of depth `65`, and admits a
   value whose visited-node count is `1,000,000` and REFUSES one of `1,000,001`** — **and gate 4's `NG-JS-D`
   corpus (`63`/`64`/`65`/`66` and `999,999`/`1,000,000`/`1,000,001`) is driven THROUGH THE PACKAGE'S ENTRY
   for exactly this reason.** **A drive that reaches any of those values through anything but the claimed
   entry measures the other arm** (`archive/gate4/storeroom-js-adversarial.md` §B · `NG-JS-D`;
   `§1.4` item 5's figures; `DD-10`) (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the refusal
   belongs where the walk is, which is the package's own edge; A3
   docs/specs/storeroom-js/crossing.md §1.7 — the validation order, whose step three is this refusal's site
   | state or fail-state declaration]`).

   **⟶ AND THE ARM AND THE CLASS AT THE BOUND, LANDED 2026-10-11 BY THE BOUNDED CORRECTION PASS
   (`role_spec_writer`), CLOSING THE IMPLEMENTER'S CONTRACT FINDING `CF-6` (THE RESIDUAL `JS-8`).**
   `RCA-8(d)` ANNOTATE-BESIDE: **item 5 and its dated clause above stand byte-for-byte and their figures and
   their answer do not move; THIS clause is a PURE INSERTION, it adds no row, and it assigns the two arms the
   clause above distinguished but did not assign.** **THE DEFECT IT CLOSES, NAMED WITH ITS TERMS: the shipped
   build produces the depth refusal on the OTHER side of the boundary from the site the clause above's wording
   places it — the boundary's own encoder carries its bound ONE PAST the declared one
   (`bindings/js/index.mjs`'s `ENCODER_CEILING = 65`, whose own comment says exactly that) — so a value of
   depth `65` IS ENCODED AND HANDED OVER and refused by the CONVERSION CORE's own bound, while a value of
   depth `66` is refused AT THE BOUNDARY, and NO CLAUSE SAID WHICH ARM ASSERTS THE PROPERTY OR WHAT CLASS THE
   ENCODER USES AT ITS BOUND.**

   **THE ARM THAT ASSERTS THE PROPERTY, DECLARED: IT IS THE CONVERSION CORE'S OWN BOUND — the same package's
   own walk, whose model `package.md §4.5` item 2 declares and whose bound is measured over that model's own
   visited nodes and nesting depth.** **The core's arm returns the value as an OUTSIDE CLASS of the store's
   own taxonomy, and the store's own taxonomy check then answers `ValueNotAdmitted` with the store's own
   generated message at the failing target's address** — **so the refusal is reached the STORE's way and NO
   CODE IS MINTED AT EITHER ARM.**
   **AND THE CLASS THE ENCODER USES AT ITS BOUND, DECLARED WITH IT: `Cyclic` — the store's own outside class
   of `§1.2` row 12, carried by the boundary's own marker and never a class of the package's coinage.**
   **`Cyclic` IS THE CLASS THE ENCODER CHOOSES FOR A VALUE BEYOND ITS OWN BOUND, and the code
   `ValueNotAdmitted` then follows from the CLASS rather than from the depth rule** — **which is lawful and is
   stated so it is not read as a repair or as a substitution: THE CLASS IS DECIDED FIRST AND THE CODE FOLLOWS
   FROM THE CLASS, which is `A76`'s own order** (`§1.7` (a); `§1.8`).
   **AND HOW THE CLAUSE ABOVE IS READ THROUGH THIS ONE, STATED SO THE TWO DO NOT CONTRADICT: the conversion
   core IS this unit's own walk** — it is the sibling crate's own module, PURE RUST, declared at
   `package.md §4.5` item 1 — **so its bound is *"the package's own walk's"* in the operative sense, and the
   clause above's two exclusions are read as excluding (i) a bound that refuses a value the package's walk has
   ALREADY ADMITTED AND CONVERTED, and (ii) the STORE's own declared bound, which is the store's clause and
   not this unit's.** **AND *"BEFORE ANY ADDON CALL IS REACHED"* IS READ AS *"BEFORE ANY VERB IS CALLED"*,
   which HOLDS at both arms: neither arm reaches a store verb, and no node, anchor, container or journal entry
   is touched by either** (`§1.2`'s closing clause).

   **THE TWO-ARM SPLIT, AT ITS EXACT FIGURES, SO A DRIVE POINTS AT THE ARM IT MEASURES:**

   | The value's depth | Which arm decides | The observable |
   | --- | --- | --- |
   | **`63` and `64`** | **neither — the value is INSIDE the declared bound** | **ADMITTED: the write succeeds and the value round-trips** |
   | **`65`** | **the CONVERSION CORE's bound — the ENCODER admitted the value, one past the declared bound, by its own declared design** | **REFUSED `ValueNotAdmitted`, with the store's own generated message** |
   | **`66` and beyond** | **the BOUNDARY's own encoder's bound, which carries the value as the outside class `Cyclic`** | **REFUSED `ValueNotAdmitted` — the same code and the same form, by the other arm** |

   **A DRIVE THAT ASSERTS THE REFUSAL AT DEPTH `65` HAPPENS AT THE BOUNDARY'S OWN FRAME, OR THAT ASSERTS ANY
   DEPTH'S REFUSAL COMES FROM A STORE-SIDE BOUND, ASSERTS AN ARM THIS BUILD DOES NOT HAVE** — **and the
   declared boundary *"the walk admits `64` and refuses `65`"* HOLDS ACROSS THE TWO ARMS rather than at one
   site**, which is why gate 4's `NG-JS-D` corpus (`63`/`64`/`65`/`66`) is driven THROUGH THE CLAIMED ENTRY
   (`archive/gate4/storeroom-js-adversarial.md` §B · `NG-JS-D`).
   **AND THE `alt` THIS DECLARATION CARRIES, PRICED, NAMED FOR THE TWO READINGS THAT STOOD OPEN:**
   **(i) THE ENCODER CARRIES A TOO-DEEP VALUE AS A CLASS OF ITS OWN — a *"depth"* class beside the cycle
   class** — priced: `§1.2`'s opening clause says **this unit ADDS NO VARIANT** to the store's taxonomy, the
   model's `14` states would move to `15` and `package.md §4.5` item 2's census with them, and the ANSWER
   would be unchanged (`ValueNotAdmitted`), so the census would pay for a distinction no observable carries;
   and **(ii) THE ENCODER'S OWN BOUND IS WITHDRAWN, so the core's bound is the only arm at every depth** —
   priced: the boundary would then encode an arbitrarily deep value before the core measured it, and the
   ENGINE'S OWN STACK LIMIT would become a reachable host `RangeError`, a failure OUTSIDE the store's closed
   `16`-member set (RE-SPELLED 2026-10-15: the set's count is `16` since `ConstraintListInvalid` landed at
   `docs/specs/storeroom-native/contract.md §8.1` #16; the `alt` above and `DD-10`'s reading of it are
   UNMOVED), which `DD-10`'s own `alt` already prices and refuses. **BOTH are available only with a
   fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded
   amendment of `docs/specs/storeroom-js/`; the reversal instrument is that amendment and NO PARK IS NAMED AS
   IT** (`A66`)
   (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the class decided first and the code from the
   class; A3 docs/specs/storeroom-js/package.md §4.5 item 2 — the model the core's bound is measured over;
   A3 docs/specs/storeroom-js/crossing.md §1.2 row 12 — `Cyclic`; `DD-10` | state or fail-state
   declaration]`).

6. **THE CYCLE GUARD IS AN ANCESTOR STACK.** **A value that contains itself is refused `ValueNotAdmitted`,
   detected by testing each value against the walk's OWN ANCESTOR STACK — never by a `WeakSet` of visited
   objects, which would refuse an acyclic DIAMOND (a value reachable by two paths)** (`DD-11`).
7. **THE WALK READS EACH MEMBER ONCE, AND THAT IS THE WHOLE OF THE MUTATION ANSWER.** **No snapshot is
   taken and no argument is deep-copied twice** (`DD-6`; `§1.1`'s third unnamed item).
8. **THE WALK'S ORDER IS THE ENGINE'S OWN ENUMERATION ORDER AND NO CLAUSE DEPENDS ON IT.** **`Object.keys`
   order is not a declared order, it is not observable through the store, and no drive may assert it** —
   **and the round trip is asserted under the member-SET relation of `§1.5` precisely because the engine
   re-orders integer-like keys regardless of insertion order**
   (`[A1 docs/specs/storeroom-js-proposal.md §9.1 — the supervisor's priced `K3` rule, as adopted | ordering
   claim]`).
9. **THE LONE SURROGATE IS A BOUNDARY-ONLY CLASS, REFUSED AT THE PACKAGE'S OWN WALK.** **Added 2026-10-11 by
   the bounded correction pass, closing the red set's CONTRACT FINDING 5.** **A JS `string` carrying a LONE
   SURROGATE — an unpaired surrogate code unit — is REFUSED `ValueNotAdmitted` at the PACKAGE's own edge,
   BEFORE any verb is called and BEFORE any `to_store_value` call could be reached, because a Rust `String`
   is valid UTF-8 and cannot carry one.** **THE WALK MUTATES NOTHING AND SUBSTITUTES NOTHING: the value is
   never dropped, never coerced into a replacement character and never truncated.** **CONSEQUENCE, STATED
   SO THE ACCEPTANCE LAYER CAN ACT ON IT: the class is NOT CONSTRUCTIBLE in Rust, so its drive belongs to
   the JS LAYER alone, and a Rust cell that represents this class as driven is a FINDING** — **a Rust cell
   MAY drive an astral character and the replacement character and must declare in its own cell that the
   surrogate class is not among them** (`§1.2` row 1's lone-surrogate clause; `acceptance.md §4.1` item 6)
   (`[A3 docs/specs/storeroom-js/acceptance.md §4.1 item 6 — the drive belongs to the JS layer; A3
   docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`).

   **⟶ AND THE TWO POSITIONS THAT ARE NOT THE VALUE POSITION ARE DECLARED HERE, LANDED 2026-10-11 BY THE
   BOUNDED CLOSE-OUT PASS (`role_spec_writer`), CLOSING THE CONTRACT FINDING THE HOST-FIX PASS FILED AGAINST
   ITEM 9 AND `§1.2` ROW 1'S DATED CLAUSE.** `RCA-8(d)` ANNOTATE-BESIDE: **item 9 above and `§1.2` row 1's
   dated clause stand byte-for-byte — *"AT THE PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED"* and *"a
   BOUNDARY-ONLY class"* included — and they are read THROUGH this clause; THIS clause is a PURE INSERTION, it
   adds no row to either table, mints no code, moves no census figure, and it does not reword either clause
   it extends.** **THE CHOICE THIS PASS TAKES, STATED FIRST BECAUSE THE FINDING NAMED BOTH: THE TWO POSITIONS
   ARE GIVEN THEIR OWN DATED CLAUSE** — this one — **and not an in-place extension of the item or of the row,
   because an extension inside either cell would re-word a byte of text this directory's own rule leaves
   standing; the two clauses above are therefore EXTENDED BY REACH AT THIS CELL and not by amendment at
   theirs.** **THE DEFECT IT CLOSES, NAMED WITH ITS POSITIONS: item 9 pins the class at the VALUE position
   and names *"the package's own walk"* generally, and row 1's dated clause names *"a JS `string` carrying a
   LONE SURROGATE"* without saying WHICH STRING POSITIONS the class reaches — while a JS `string` is a class
   property of a SEGMENT (`§1.3`'s `AddressArg` row 2) and of a member KEY, not only of a value; and neither
   clause says that the failing TARGET at those two positions is named BY CLASS AND POSITION rather than by
   the code unit's own unrepresentable bytes.** **THE TWO POSITIONS, ONE CLAUSE EACH, AND THE ANSWER IS ROW
   1'S OWN:**
   1. **THE SEGMENT POSITION.** **A SEGMENT of an address that is a JS `string` carrying a LONE SURROGATE is
   REFUSED `ValueNotAdmitted` AT THE PACKAGE'S OWN WALK, BEFORE ANY VERB IS CALLED — the answer `§1.2` row 1's
   dated clause declares — and the failing SEGMENT is named by its INDEX with the ARGUMENT POSITION beside
   it.** **THE FAILING TARGET IS NAMED BY THE POSITION AND NOT BY THE SEGMENT'S BYTES:** the unpaired code
   unit has no `String` form a Rust `String` can carry, so the only spellings of it are the caller's own
   unrepresentable code unit or a REPAIR of it — which `§1.8` forbids — and the target is therefore named
   `'address'` (the spelling this position already uses for its other class) with the index carried in the
   message's reason half (`§1.3`'s `AddressArg` row 2; `§1.8`).
   2. **THE MEMBER-KEY POSITION.** **An OBJECT MEMBER whose KEY is a JS `string` carrying a LONE SURROGATE
   refuses the WHOLE VALUE `ValueNotAdmitted` at the same walk, and the KEY IS NEVER DROPPED and never
   renamed** — `§1.4` item 3's own rule over a member the walk reached — **because the class is a property of
   the KEY as it is a property of a value.** **THE FAILING TARGET IS NAMED BY THE MEMBER'S POSITION AND NOT BY
   THE KEY'S BYTES:** the member's position is carried as its own key path, the key's class half is carried,
   and the key's bytes are not — for the same reason position 1 gives (`§1.4` item 3; `surface.md §2.5` item 5
   (b)).
   **AND WHAT THIS CLAUSE DOES NOT DO: it widens the class to NO third position, it does not weaken row 1's
   acceptance of *"a lone surrogate"* among `StoreValue::Str`'s forms — which remains the class's LAYER
   statement and is read through row 1's dated clause — and it mints no code, the answer at both positions
   being `ValueNotAdmitted`, a member of the store's closed set, carried and never minted** (`DD-40`). **AND
   THE DRIVE CONSEQUENCE IS ITEM 9'S OWN, CARRIED TO THE TWO POSITIONS: the class is NOT CONSTRUCTIBLE in
   Rust at either position, so BOTH drives belong to the JS LAYER, and a Rust cell that represents either as
   driven is a FINDING** (`acceptance.md §4.1` item 6).
   (`[A3 docs/specs/storeroom-js/crossing.md §1.2` row 1's dated clause and `§1.4` item 9 — the two clauses
   this one extends by reach; A3 docs/specs/storeroom-js/crossing.md §1.3's `AddressArg` row 2 and `§1.4` item
   3 — the two positions' own clauses; A3 docs/specs/storeroom-js/surface.md §2.5 item 5 (b) — the class half
   mandatory and the position half conditional; A3 docs/specs/storeroom-js/acceptance.md §4.1 item 6 — the
   drive belongs to the JS layer | state or fail-state declaration]`).

### §1.5 The JS-side equality relation — one declared relation, and its three clauses

**THE RELATION, STATED ONCE, AND IT IS THE ONLY RELATION THIS UNIT'S ACCEPTANCE LAYER MAY ASSERT:** **two
JS values are EQUAL under this unit's relation iff all three of the following hold:**
1. **MEMBER-SET EQUALITY FOR OBJECTS.** Two objects are equal iff their **member key sets are equal as
   SETS** — **compared as a sorted set, never by insertion order and never by the engine's enumeration
   order** — and each member's value is equal under this relation. **A JS engine re-orders keys that look
   like array indices numerically, whatever order they were inserted in, so the store's own
   `BTreeMap`-based lexicographic order (`"10" < "2"`) is NEVER what a JS consumer sees, and no drive may
   assert it** (`DD-9`).
2. **ARRAY INDEX ORDER IS SIGNIFICANT.** Two arrays are equal iff they are **dense**, of **equal length**,
   and **equal member-by-member by index** under this relation. **A `VEC`'s index order is a store-level
   fact and it is preserved across the boundary** (`DD-9`).
3. **`Object.is` WHERE SIGN OR `NaN` MATTERS.** Two numbers are equal iff **`Object.is(a, b)`** is true.
   **`-0` and `0` are therefore NOT equal under this relation, while JS `===` says they are** — and the
   store's own `mem`/`temp` behaviour keeps the sign, so a `mem`-tier `-0` round trip is
   **`Object.is`-equal** (`DD-9`).
**⟶ AMENDED 2026-10-21 BY `A140`: CLAUSE 3'S `-0` HALF IS READ THROUGH THE BINDING NORMALIZATION.** **`Object.is` remains the relation, but a binding `-0` write reads back `0`; the store's own `mem`/`temp` sign rule is not amended, because the package boundary normalizes it** (`A140`).
**AND THE TWO THINGS THIS RELATION DOES NOT DO, STATED SO IT IS NOT OVER-READ:** **a caller comparing two
objects with `===` is comparing REFERENCES and not values** — the relation above is the only value
comparison this unit declares; and **the relation is a property of the PACKAGE's own helper and of this
unit's acceptance layer, NEVER of the store**, whose own equality already ignores member order
(`[A3 docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 — **THE STORE UNIT'S OWN `P-IM-1`, SPELLED WITH ITS PATH AND REACHED BY NO RENAMING: the re-mint of 2026-10-17 (`DEF-2026-10-16-S`) renamed THIS unit's eight register ids and left every id of `docs/specs/storeroom-native/` UNTOUCHED** — *"an object's key order counted as significant"*
FAILS the row | cross-reference]`).

### §1.6 The crossing's own census, printed with its terms

**THE CROSSING TABLE'S OWN ARITHMETIC, AND EVERY FIGURE IS RE-DERIVABLE FROM THE TABLES ABOVE:**
- **the value variants: `13` rows = `5` ADMITTED (`Str` · `Bool` · `Num` · `Object` · `Array`) + `8` OUTSIDE
  (`Null` · `Undefined` · `Function` · `Symbol` · `BigInt` · `NonFinite` · `Cyclic` ·
  `NonPlainCollection`) — `5 + 8 = 13` ✓**;
- **the argument carriers: `8` — `AddressArg` · `TierArg` · `TierSetItem` · `OpIdArg` · `FilePathArg` ·
  `JournalLengthArg` · `ListenersArg` · `ListenerHandle`**;
- **the carriers' own variant rows: `56` = `AddressArg` `14` + `TierArg` `7` + `TierSetItem` `4` + `OpIdArg`
  `6` + `FilePathArg` `6` + `JournalLengthArg` `12` + `ListenersArg` `5` + `ListenerHandle` `2` — `14 + 7 +
  4 + 6 + 6 + 12 + 5 + 2 = 56` ✓**;
- **the REFUSED classes the crossing declares: `8` outside value classes, `10` outside segment classes, `8`
  carrier-refusal classes (`AddressMalformed` · `OutOfDomainTier` · `JournalOpUnknown` ·
  `ConstructionArgumentMissing` · `FilePathUnreachable` · `ValueNotAdmitted` · `ContainerKindConflict` ·
  the package's unknown-handle no-op), and `0` package-minted codes.**
**⟶ CORRECTED 2026-10-11, IN THE SAME PASS THAT AUTHORED IT (`RCA-8(d)` ANNOTATE-BESIDE — the figure this
clause corrects was first written as `66`, and `66` is REFUTED BY ITS OWN TERMS):** **the operative figure is
`56`, and it is re-derived ROW BY ROW rather than by the arithmetic alone: the `AddressArg` table prints
`14` rows, the `TierArg` table `7`, the `TierSetItem` table `4`, the `OpIdArg` table `6`, the `FilePathArg`
table `6`, the `JournalLengthArg` table `12`, the `ListenersArg` table `5` and the `ListenerHandle` table
`2`, each numbered in its own first column** (`[A3 docs/specs/storeroom-js/crossing.md §2 — the same tables,
relocated WHOLE | numeric or census claim]`). **THE VALUE-ROW AND OUTSIDE-CLASS FIGURES MOVE BY THIS
CLAUSE'S OWN COUNT: `13 = 5 + 8` ✓ and the refused-value-class figure is `8`; a `66` nowhere appears in
the operative text.**

**⟶ AMENDED 2026-10-13 — THE `FilePathArg` CARRIER'S ROW COUNT MOVES BY THIS AMENDMENT'S OWN TWO ROWS, AND THE CARRIER TOTAL MOVES WITH IT** (`RCA-8(d)` ANNOTATE-BESIDE: **every figure above — `14` · `7` · `4` · `6` · `6` · `12` · `5` · `2` · `56` · `13` · `8` · `10` · `0` — and every clause beneath this one stand BYTE-FOR-BYTE; THIS clause is the operative statement of TWO of those terms and mints no id and moves no row NUMBER**; `docs/specs/storeroom-native/contract.md §10.4`; `docs/specs/storeroom-access-probe-review.md` `§5.1`'s `S-8` row; `[A3 docs/specs/storeroom-native/contract.md §10.4 · that document's `§8.1` #13 as amended | numeric or census claim]`). **THE `FilePathArg` TABLE NOW PRINTS `8` ROWS: its as-filed `6` (`FilePathArg` `1`…`6`) PLUS THIS AMENDMENT'S TWO — `FilePathArg` `1`-bis (the passing path whose file is ABSENT, now left ZERO-LENGTH) and `FilePathArg` `5`-bis (the READ-ONLY MOUNT and the ACL-deny/ownership-mismatch forms, now answered `FilePathUnreachable` at construction).** **THE AS-FILED SIX KEEP THEIR NUMBERS `1`…`6`: the two new rows are numbered `1`-bis and `5`-bis and sit BESIDE the rows they narrow, so NO carrier table's row is renumbered and every citation of `FilePathArg` rows 1–6 still resolves** (`[T: the two rows' numbering, so a citation written before this amendment is not made ambiguous by it | CROSS-REF]`). **THEREFORE THE CARRIERS' VARIANT-ROW TOTAL IS `58` (`14 + 7 + 4 + 6 + 8 + 12 + 5 + 2 = 58` ✓), and the as-filed `56` and its `6` term stand above as this clause's own record of what moved.** **AND THE REFUSED-CLASS FIGURES ARE UNMOVED: `8` outside value classes, `10` outside segment classes, `8` carrier-refusal classes and `0` package-minted codes — `FilePathArg` `5`-bis answers the SAME class `FilePathArg` `4`/`5`/`6` answer, so NO refusal class is added** (`docs/specs/storeroom-native/contract.md §8.1` #13, whose member and message are unmoved).

**⟶ RECONCILED 2026-10-11 — THE BOUNDED CLOSE-OUT PASS (`role_spec_writer`): THIS SECTION'S CARRIER FIGURES
AGAINST THE MODEL THE CONTRACT REQUIRES, WITH NOTHING HERE MOVED.** `RCA-8(d)` ANNOTATE-BESIDE: **every
figure above stands byte-for-byte — `13` · `8` · `56` · `8` · `10` · `8` · `0` — and THIS clause is a PURE
INSERTION that states what those figures ARE, so the model's own state counts are read as a different
quantity rather than as a defect in this census.**

**THE `56` IS THE CARRIER TABLES' OWN ARITHMETIC — A COUNT OF THE ROWS THE EIGHT TABLES PRINT — AND IT IS
NOT A COUNT OF THE MODEL'S STATES.** **The two quantities answer two questions: the `56` answers *"how many
declared forms does each carrier's table print?"* and a state count answers *"how many Rust arms does
`package.md §4.5` item 2's model carry?"* — and they DIFFER for six of the eight carriers, by the count
`package.md §4.5` item 2's dated clause prints row by row, `4` of the six OVER the row count and `2` UNDER
it and still total.** **STATED HERE SO THE TWO ARE READ TOGETHER:
`AddressArg` prints `14` rows and the model covers them with `9` variants (both LIST arms plus one arm per
outside class, with row 6's five named classes carried by `JsNonArray`'s own five); `TierArg` prints `7` and
the model carries `8` (the set spelling is its own variant); `TierSetItem` prints `4` and the model carries
`7` (the scalar and object classes split); `OpIdArg` prints `6` and the model carries `5` (total, because
`Absent`/`Null`/`Undefined` are three states for two rows); `FilePathArg` prints `6` and the model carries
`6`; `JournalLengthArg` prints `12` and the model carries `15` — the three extra states being `Null`,
`Undefined` and the `TooLarge(u64)` this part's `§1.3` row-12 clause declares; `ListenersArg` prints `5` and
the model carries `5`; and `ListenerHandle` prints `2` (its output twin being `JsHandleArg`, whose `4` states
cover them).** **AND THE TWO THAT MATCH ARE NAMED SO THE COUNT IS CHECKED AND NOT TRUSTED: `FilePathArg`
(`6` = `6`) and `ListenersArg` (`5` = `5`) — `2` of the `8`, beside `4` OVER and `2` UNDER.**
**NO ROW IS ADDED, REMOVED OR RENUMBERED BY THIS CLAUSE, AND THE `56` STANDS AS PRINTED** —
**the reconciliation of the MODEL'S counts is `package.md §4.5` item 2's dated clause, which also withdraws
the blanket *"EXACTLY"* claim that would have made six of these eight carriers findings** (`[A3
docs/specs/storeroom-js/package.md §4.5 item 2 — the type table and its dated count reconciliation; A1
docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-12` | numeric or census claim]`).

---

### §1.7 The validation order — the class decision FIRST, the shape test SECOND, and ADMIT or REFUSE — declared for EVERY JS value and EVERY argument

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING `A76`.**
`RCA-8(d)` ANNOTATE-BESIDE: **every clause of `§1.1`–`§1.6` above stands byte-for-byte and is read THROUGH
this subsection; THIS subsection is a PURE INSERTION and it adds no row to `§1.2`'s table and no row to
`§1.3`'s tables.** **THE RULING, VERBATIM:** ***"Test JS data for compliance with permitted shape before
admitting and do not attempt to fix. reject with verbose error to client"*** (`docs/specs/storeroom-js-proposal.md`
`§18` · `A76`). **WHAT THIS SUBSECTION DECLARES, IN ONE LINE: the ORDER the boundary's decisions are taken
in — because a validation that happens AFTER a coercion, or that is skipped for a value the language makes
look conforming, is the defect class `A76` rules against, and its four shipped instances are named as this
rule's own negative examples at (b) below.**

**THE VALIDATION ORDER IS THREE STEPS, AND IT IS APPLIED TO EVERY JS VALUE AND EVERY ARGUMENT POSITION — the
`cfg` object and each of its four keys, every verb's `address`, `tier` and `opId`, the construction's
`listeners[]` and every entry and member in it, `register`'s two arguments, and every member of every value
the walk reaches at any depth** (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the validation-first
discipline, in three parts | requirement]`):

**(a) STEP ONE — THE CLASS DECISION IS FIRST, AND IT IS TAKEN ON THE VALUE AS IT IS.** **The class of the
value is decided BEFORE any conversion is attempted and BEFORE any shape test that could pass on a value of
the wrong class — and in particular BEFORE any `Array.isArray`-style shortcut, because `Array.isArray` returns
`true` for a class that EXTENDS `Array`.** **The decision is taken on the value ITSELF: the class the value
HAS, as a member of the crossing's own class set, and NEVER a class the value could be made to have by a
conversion.** **A CLASS DECISION IS NEVER DEFERRED AND NEVER REVISITED AFTER A COERCION** — **so no clause of
this part and no drive may read a value's class from anything but the value, and a value whose class was
decided after a conversion has had its class decided TWICE, which is the defect and not the rule.**

**(b) THE FOUR SHIPPED DEFECTS THIS RULE FORBIDS, EACH NAMED AS THE RULE'S OWN NEGATIVE EXAMPLE — because a
rule that does not name the defect class it rules against is read as a preference** (`archive/gate4/
storeroom-js-adversarial.md` §A · `JS-6` · `JS-1` · `JS-2` · `JS-5`):

1. **A `bigint` CARRIED THROUGH THE NUMERIC ARM.** **(i) OF STEP ONE.** **The shipped walk tested
   `Number.isFinite(x)` on a `bigint` — which is `false`, so the value fell into the NUMBER arm — and the
   facade's numeric read then answered `0.0` for a `bigint`, so `10n` was refused with the store's message
   rendering `0` where the caller's target was `10n`.** **THE RULE'S ANSWER: a `bigint` IS a `bigint`** —
   `§1.2` row 10's outside class — **and it is REFUSED as that class, BEFORE any numeric arm is entered**
   (`archive/gate4/storeroom-js-adversarial.md` §A · `JS-6`).
2. **A `Number()` CALL THROWING A HOST `TypeError` FROM THE BOUNDARY'S OWN FRAME.** **(ii) OF STEP ONE, AND
   THE REASON STEP ONE MUST PRECEDE ANY CONVERSION.** **`a.rollback(Symbol())` — the method form, the receiver
   being the store, re-spelled 2026-10-16 under `A127`'s receiver ruling at this clause's own bytes and stated
   here so no drive reads the shipped module-form example as the declared shape — reached
   `Number(opId)`, which throws a RAW JS `TypeError` from the package's own frame — a form outside `§2.5`'s
   single failure form, and one no clause of this unit permits.** **THE RULE'S ANSWER: a `Symbol` IS a
   `Symbol`** — `§1.2` row 9's outside class — **and `OpIdArg`'s own rows answer `AddressMalformed` for an
   argument whose shape is not the op id's shape at all (`§1.3`'s `OpIdArg` row 6's neighbourhood), so the
   conversion is NEVER REACHED** (`archive/gate4/storeroom-js-adversarial.md` §A · `JS-1`; `§2.5`).
3. **AN `Array.isArray` SHORT-CIRCUITING THE PROTOTYPE TEST, SO A CLASS EXTENDING `Array` IS ADMITTED.** **(i)
   OF STEP ONE, AND THE CASE THAT PROVES THE RULE: `§1.2` row 5 REFUSES *"a class extending `Array`"* BY NAME,
   and `§1.3`'s `AddressArg` row 11 refuses the array-like class for the address position.** **A prototype
   test may not be skipped because a SHAPE test answered `true` on a subclass, and `Array.isArray` is a SHAPE
   test: it distinguishes an array from a non-array and it does NOT distinguish a plain array from a class
   whose prototype chain carries `Array.prototype`.** **THE RULE'S ANSWER: `class V extends Array {}` is a
   CLASS INSTANCE and is REFUSED, at the value position and at the address position alike** — **and the ONE
   EXCEPTION THE CONTRACT KEEPS IS NAMED HERE SO IT IS NOT READ AS A LOOPHOLE: THE ARRAY ARM CARRIES THE
   PROTOTYPE DECISION **BESIDE** THE CLASS DECISION, so a value is an array under step one only where the
   class decision says `Array` AND the value's prototype class is `Plain` or `Null`.** **That conjunction is
   not a shape test replacing the class decision — it is the class decision, taken without a shortcut, for
   the ONE class whose shape test a subclass passes** (`archive/gate4/storeroom-js-adversarial.md` §A ·
   `JS-2`; `§1.2` row 5; `§1.3`'s `AddressArg` row 11; `§1.4` item 4 (e)'s realm-agnostic prototype rule,
   which is the same rule over the object arm).
4. **A MEMBER READ THROUGH THE PROTOTYPE CHAIN, SO A PROTOTYPE-CARRYING OBJECT IS ADMITTED.** **(i) OF STEP
   ONE AND STEP TWO TOGETHER, AND IT COVERS THE `cfg`/WIRE-MEMBER READING: `§2.1` declares that `storeCreate`
   TAKES *"ONE plain object"*, and `§1.4` item 4's plain-object test (a)–(g) refuses a prototype-carrying
   object, while the shipped facade read every `cfg` member and every wire member through the PROTOTYPE
   CHAIN — so `class Cfg { get journalLength() { return 8 } }` was admitted AS `cfg`.** **THE RULE'S ANSWER:
   a key is read by OWN membership and never through the prototype chain** — **the declared reading
   `§1.3`'s absent-versus-`undefined` rule already fixes for `cfg`'s keys is `in`-membership, and
   `in`-membership is a MEMBERSHIP test over the value, taken at step two, and never a chain read**
   (`archive/gate4/storeroom-js-adversarial.md` §A · `JS-5`; `§2.1`; `§1.3`'s dated absent-versus-undefined
   rule; `§1.4` item 4).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE IMPLEMENTER'S CONTRACT
FINDING `CF-2`: THE ARRAY ARM'S PROTOTYPE CLASS, RE-SPELLED SO THE EXCEPTION CANNOT REFUSE A CROSS-REALM
ARRAY.** `RCA-8(d)` ANNOTATE-BESIDE: **item 3 of (b) above — and `§1.4` item 4 (e) as cited there — stands
byte-for-byte, its *"the value's prototype class is `Plain` or `Null`"* included, and it is read THROUGH this
clause; THIS clause is a PURE INSERTION and it re-decides no ruling.** **THE AS-FILED WORDING, NAMED BESIDE ITS
OPERATIVE REPLACEMENT: (b) item 3 reads *"a value is an array under step one only where the class decision
says `Array` AND the value's prototype class is `Plain` or `Null`"* — and read literally that conjunction
REFUSES A CROSS-REALM PLAIN ARRAY, which `§1.2` row 5 (*"a cross-realm array IS accepted (it is an
`Array`)"*), `§1.3`'s `AddressArg` row 13 and `§1.4` item 4 (e)'s realm-agnostic prototype rule each DECLARE
ACCEPTED.**

**THE OPERATIVE SPELLING, TAKEN FROM THOSE THREE CLAUSES AND FROM THE SHIPPED BUILD: THE ARRAY ARM ADMITS THE
PROTOTYPE CLASSES `Plain` · `ForeignPlain` · `Null` AND REFUSES `Class`, AND NOTHING ELSE.** **`ForeignPlain`
is a plain-array prototype of ANOTHER REALM, reached by the OWN-KEY-SET comparison `§1.4` item 4 (e) declares
and NEVER by an identity comparison against this realm's `Array.prototype`** — **because the realm-agnostic
test `DD-7` declares for the OBJECT arm is the SAME test over the ARRAY arm, and the two arms' prototype
decisions cannot disagree about what *"plain"* means.** **A `Class` prototype — `class V extends Array {}` —
IS REFUSED, and its code is the code its POSITION declares: `§1.2` row 5's `ValueNotAdmitted` at a value
position and `§1.3`'s `AddressArg` row 11's `AddressMalformed` at an address position** (`§1.8`'s dated
clause, which declares the code-by-position rule this sentence obeys).
**AND THE CONDUIT OF THE DECISION, STATED SO ITS PLACE IS NOT LOOKED FOR IN THE MODEL: the admitted array
crosses as the model's own ARRAY, so the prototype decision is taken AT THE BOUNDARY and no prototype member
travels with an array** — **the model's `JsProto` carries `4` variants for the OBJECT arm's twin of the same
decision** (`package.md §4.5` item 2's `JsValue` and `JsProto` rows, each with its own dated clause).
**AND THE DRIVE THIS CLAUSE MAKES LAWFUL, NAMED SO ITS OBSERVABLE IS NOT READ OFF THE OBJECT ARM: A
CROSS-REALM PLAIN ARRAY — a `vm` array, an `Array` constructed in a worker and passed in, an array surviving
`structuredClone` across a realm boundary — is ACCEPTED as an address and as a value member, while a class
extending `Array` is REFUSED at both positions.** **The boundary decides this STRUCTURALLY, by the
prototype's own property-name set and its own symbols' descriptions, without `instanceof` and without an
identity comparison — and the drive that reaches it through the claimed entry is the acceptance layer's own
cross-realm cell** (`bindings/js/index.mjs`'s `arrayClass`, whose answer `foreign` is the admitted class;
`archive/gate4/storeroom-js-adversarial.md` §B · `NG-JS-E`)
(`[A3 docs/specs/storeroom-js/crossing.md §1.2 row 5 · §1.3's `AddressArg` row 13 · §1.4 item 4 (e) — the
three clauses this exception is re-spelled to; A1 docs/specs/storeroom-js-proposal.md §9.1 · `K2` — the priced
realm-agnostic test `DD-7` adopts; A3 docs/specs/storeroom-js/package.md §4.5 item 2 — the model's own
prototype states | requirement]`).

**(c) STEP TWO — THE SHAPE TEST AGAINST THE PERMITTED SET, TAKEN AFTER THE CLASS DECISION AND ON THE SAME
VALUE.** **The shape test is the value's membership in the permitted set its class declares: `§1.2`'s rows
1–5 for a value, `§1.3`'s rows for each carrier, and `§1.4` item 4's structural plain-object test (a)–(g) for
the object arm.** **NO SHAPE TEST MAY STAND IN PLACE OF THE CLASS DECISION**, and **no shape test may be
taken on a value the class decision has not yet classified** (`§1.4` item 4; `§1.2`; `§1.3`).

**(d) STEP THREE — ADMIT OR REFUSE, AND NOTHING ELSE.** **A value that CONFORMS with its class's permitted
shape is ADMITTED; a value that does NOT is REFUSED.** **A refusal answers the ONE declared form and never a
second: for a value the store's own taxonomy governs, the store's own outside class is the answer
(`§1.2`'s rows 6–13, each answering the store's `ValueNotAdmitted`); for a carrier, the row's own declared
code; and the rejection's CONTENT — what *"verbose"* means at its own cell — is declared at
`docs/specs/storeroom-js/surface.md §2.5` item 6** (`§1.2`'s closing clause; `§1.3`'s rows).

**AND THE FOUR THINGS THIS SUBSECTION DOES NOT DO, STATED SO IT IS NOT READ WIDER THAN IT IS.** 1. **IT
ADDS NO OUTSIDE CLASS, NO CODE AND NO ROW**: `§1.2`'s `13 = 5 + 8` rows, `§1.3`'s `56` carrier-variant rows
and `§1.6`'s census stand unmoved, and the refused-class figures (`8` outside value classes, `10` outside
segment classes) are unchanged. 2. **IT DOES NOT NARROW WHAT THE STORE ADMITS**: the classes the store's own
taxonomy admits are the SAME `5`, and this rule moves only the SITE at which the class decision is taken —
the package's own boundary — for a value the store's taxonomy would refuse anyway. 3. **IT DOES NOT REACH A
ROW THE TABLES DO NOT PRINT**: `§1.2` row 5's `Array` subclass and `§1.2` row 4's prototype-carrying object
are PRINTED REFUSALS, and this rule is the order in which the boundary arrives at them. 4. **IT DOES NOT
FORBID THE CARRIER PASS-THROUGH**: `DD-1`'s rule that each carrier's outside variants are admitted AS VALUES
and converted to the store's own refusal is untouched, because a carrier's conversion is itself a class
decision and never a coercion (see `§1.8`'s third clause)
(`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76`; `DD-1` | declared parameter semantics]`).

### §1.8 The no-repair prohibition — nothing at the boundary converts, substitutes, defaults, truncates or "fixes up" a non-conforming input

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON `A76`'S SECOND PART.** `RCA-8(d)`
ANNOTATE-BESIDE: **every clause above stands byte-for-byte; THIS subsection is a PURE INSERTION and no table
of this part gains or loses a row.** **THE RULING, VERBATIM:** ***"do not attempt to fix"***
(`docs/specs/storeroom-js-proposal.md` `§18` · `A76`).

**THE PROHIBITION, IN ONE CLAUSE: NOTHING AT THIS BOUNDARY CONVERTS, SUBSTITUTES, DEFAULTS, TRUNCATES OR
"FIXES UP" A NON-CONFORMING INPUT.** **A NON-CONFORMING VALUE IS REFUSED, AND THE REFUSAL'S CLASS IS THE
CLASS THE VALUE HAS** — **the class the value is, never the class it would have after a conversion and never
the class of a substituted value** (`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` | requirement]`).
**THE CONSEQUENCE FOR CALLER-FACING BEHAVIOUR IS THE DECLARED INTENT AND IS STATED SO IT IS NOT READ AS A
REGRESSION:** **a caller who expected a coercion — a numeric string where a number is required, a `bigint`
read as a number, a defaulted `journalLength`, a `listeners` array defaulted to `[]`, a `Symbol` stringified
into an `opId`, a hole read as `undefined` or as `null` — GETS A REFUSAL INSTEAD, AND THAT IS THE DECLARED
AND INTENDED BEHAVIOUR.** **No clause of this part may be read as promising a coerced value on any path, and
a drive that expects one asserts a behaviour the contract does not declare.**

**AND THE ONE READING THIS PROHIBITION DOES NOT TAKE, STATED SO `DD-1` IS NOT CONTRADICTED BY IT:** **`DD-1`
declares that the binding ADMITS each carrier's outside variants AS VALUES and converts them to the store's
own refusal BY CALLING the store's verb with them, so the store's own closed fail set stays the only producer
of a code.** **That is NOT a repair and it is not forbidden here: a carrier's conversion is the class
decision — the value's class is decided, its carrier spelling is CONSTRUCTED from the value as it is, and the
store's own carrier answers its own code.** **THE TWO CLAUSES ARE READ TOGETHER LIKE THIS: a carrier's
outside variant travels to the store UNCHANGED and is refused THERE; a value the WALK meets is refused AT
THE WALK, and never admitted by a substitution. NO ROW IS REPAIRED IN EITHER READING** (`§1.3`'s
absent-versus-`undefined` rule; `DD-1`; `DD-46`).

**AND THE THREE CLASSES THE PROHIBITION'S NEGATIVE EXAMPLES COME FROM, NAMED SO THE REFUSAL'S CLASS IS NEVER
THE SUBSTITUTE'S CLASS:** **a `bigint` is refused as a `BigInt` and never as the `Num(0.0)` a failed numeric
read produced; a class extending `Array` is refused as a class and never admitted by `Array.isArray`; and a
prototype-carrying object is refused as a `NonPlainCollection` and never read through its chain**
(`§1.7` (b) items 1, 3 and 4).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE IMPLEMENTER'S CONTRACT
FINDING `CF-1`: THE CARRIER-POSITION STATE'S ONE CODE, DECLARED SO ONE STATE CANNOT BE READ WITH TWO.**
`RCA-8(d)` ANNOTATE-BESIDE: **the paragraph above stands byte-for-byte — *"a prototype-carrying object is
refused as a `NonPlainCollection` and never read through its chain"* included — and it is read THROUGH this
clause; THIS clause is a PURE INSERTION, it adds no row to `§1.2`'s table and no row to `§1.3`'s tables, and
it re-decides no ruling.** **THE DEFECT IT CLOSES, NAMED WITH ITS THREE CELLS AND ITS TWO ANSWERS: `§1.8`'s
closing paragraph names the CLASS `NonPlainCollection` for a prototype-carrying object, whose VALUE code is
`ValueNotAdmitted`; `parameter-semantics.md §2.1` (`PAR-JS-1`) declares `AddressMalformed` for EVERY outside
form of `cfg`; and `§1.7` (d) says *"for a carrier, the row's own declared code"* — so ONE state could be read
with TWO answers where the state stands at a CARRIER position.**

**THE STATE, SPLIT BY POSITION, WITH THE ONE CODE EACH POSITION DECLARES:**
1. **AT A VALUE POSITION — a member of a value the WALK meets, or the written value itself — the class is
   `NonPlainCollection` and the code is that class's own `ValueNotAdmitted`** (`§1.2` row 13; `§1.4` item 4
   (f)), **produced AT THE WALK.**
2. **AT A CARRIER POSITION — `cfg` and each of its four keys, every verb's `address` · `tier` · `opId` ·
   `instance`, and the construction's `listeners[]` and every entry in it — the class is decided the same way,
   and THE CODE IS THAT CARRIER'S OWN ROW'S DECLARED CODE: `AddressMalformed` for `cfg`** (`PAR-JS-1`), **the
   same for an array-like class at an address position** (`§1.3`'s `AddressArg` row 11), **and so on row by
   row** (`§1.7` (d)). **⟶ AND THE `cfg` KEY COUNT THIS ITEM PRINTS IS RE-SPELLED, 2026-10-15 BY THE `RCA-9`
   FILE-TIER-SAVE PASS: `three` reads `four` — `filePath` · `journalLength` · `listeners` · `constraints` —
   per `docs/specs/storeroom-js/surface.md §2.1`'s dated clause, whose `cfg` block is the key set this
   position is read against, so a `constraints` value at this position is a carrier this item reaches like
   any other; the POSITION, the class decision and the per-row code above are UNMOVED, and no byte of this
   item's subject moves with the count.**
3. **THE RELATIONSHIP, STATED SO NO READER NEEDS TO DERIVE EITHER HALF FROM THE OTHER: `NonPlainCollection`
   IS A CLASS NAME OF THE STORE'S OWN TAXONOMY AND IT IS NEVER A CODE AT A CARRIER POSITION.** **The class
   name travels in the REFUSAL'S REASON HALF, rendered class-first and verbosely; the code travels in the
   refusal's `status`; the two are DIFFERENT SLOTS of the ONE declared form and neither is read off the
   other** (`surface.md §2.5` item 5 (b)–(c)).
4. **CONSEQUENTLY, FOR THE `cfg` STATE THIS FINDING NAMES, THERE IS ONE ANSWER: `AddressMalformed` — the
   CARRIER-ROW READING, and the one the shipped boundary takes** — **and the class is named verbosely in the
   message's reason half, as the shipped boundary's own class spelling does** (`bindings/js/index.mjs`'s
   `classSpelling`, whose prototype-carrying spelling reads *"a class instance or another prototype-carrying
   non-plain object"*, reached from `encodeConfig`, which carries `PAR-JS-1`'s declared status).
   **A `cfg` ANSWERING `ValueNotAdmitted`, AND A `cfg` WHOSE MESSAGE DOES NOT CARRY ITS CLASS, ARE EACH A
   FINDING.**
**AND THE `alt` THIS DECLARATION CARRIES, PRICED BECAUSE ONE OF THE TWO READINGS HAD TO BE TAKEN: THE CLASS'S
OWN VALUE CODE `ValueNotAdmitted` FOR EVERY CARRIER-POSITION PROTOTYPE-CARRYING FORM.** **Priced: it would give
ONE JS shape TWO codes by position while `§1.3`'s carrier tables declare ONE answer per row; it would make
`PAR-JS-1`'s own row print two answers for one state; and it would move a refusal the STORE's own construction
answers at its own carrier set (`docs/specs/storeroom-native/contract.md §7.1`) into the WALK's taxonomy, which
`DD-1` refuses for the refusal surface.** **Available only with a fresh ruling of the architect recorded as an
ACTIVE `docs/decisions.md` row, followed by a bounded amendment of `docs/specs/storeroom-js/` — and, the store's
own construction row being the one that answers `AddressMalformed` for that form, a store-side amendment would
be the amendment the alternative needs; the reversal instrument is that amendment and NO PARK IS NAMED AS IT**
(`A66`)
(`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the rejection's class half and its status half are two
slots of ONE form; A3 docs/specs/storeroom-js/parameter-semantics.md §2.1 · `PAR-JS-1` — the carrier row's own
declared answer; A3 docs/specs/storeroom-js/surface.md §2.5 item 5 (b)–(c) — the two slots; A3
docs/specs/storeroom-native/contract.md §7.1 — the store's own construction row | state or fail-state
declaration]`).

**AND ONE THING THIS SUBSECTION DOES NOT DECLARE: IT ADDS NO FAILURE FORM AND NO CODE.** **The refusal
answers the rows' own declared answers, inside the single form of `docs/specs/storeroom-js/surface.md §2.5`**,
**and what *"verbose"* means at its cell is `docs/specs/storeroom-js/surface.md §2.5` item 6's declaration,
not this subsection's** (`§1.7` (d); `docs/specs/storeroom-js/surface.md §2.5` item 6).

---

**END OF THIS PART.** **It carries the contract's `§1` whole and declares nothing the contract does not
already carry: the `§`-numbers, the rules, the tables and every authority citation are the contract
document's own** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a carrier introduces no
claim of its own | requirement]`).

**⟶ AND THE SWEEP RECORD THIS PART POINTS AT, ADDED 2026-10-11 BY THE BOUNDED DIVERGENCE SWEEP
(`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **no clause above moves.** **The unit's divergence table
is the contract document's own `SW-1` clause, and the rows that touch THIS part are: the walk's per-class
rules and the carrier variant counts against the shipped model's own variant sets; `§1.6`'s `56`-row census
against the `12` variant rows it prints for `JournalLengthArg` while the required model carries `15` states;
`§1.4` item 4 (e)'s realm-agnostic plain-object test against a build whose proto test is a realm-identity
comparison; and `§1.2` row 4's cross-realm acceptance, whose drive this part's own row names and which no cell
of the shipped JS suite drives.** **The value taxonomy, the walk's own rules and the equality relation stand
exactly as printed, and the clause that records each divergence names its owner** (`[A1
docs/specs/storeroom-js/contract.md · the sweep clause | cross-reference]`).

**⟶ AND THE GATE-8 RECONCILIATION'S OWN EFFECT ON THIS PART, LANDED 2026-10-11 BY
`role_documentation_reviewer`.** `RCA-8(d)` ANNOTATE-BESIDE: **no clause above moves, and this clause is a
PURE INSERTION — it re-spells no rule, moves no variant, and adds no row to any table.** **THE DIVERGENCES THE
SWEEP RECORD ABOVE NAMES, READ AT THE BUILD'S OWN BYTES BY THIS PASS:**
1. **THIS PART'S `§1.6` `56`-ROW CARRIER CENSUS IS UNMOVED**, and its `14 + 7 + 4 + 6 + 6 + 12 + 5 + 2 = 56` ✓
   arithmetic stands. **The reconciliation of the `12`-row `JournalLengthArg` table against the model's `15`
   states is `package.md §4.5`'s dated clause, WITH ITS TERMS, and it names where each extra state comes
   from** — `Null` and `Undefined` carried as two states, and `TooLarge(u64)` declared beside row 12 with the
   row's declared answer `AddressMalformed` UNMOVED and NO CODE MINTED on the way. **A row no state answers,
   and a state that answers no row, are each a FINDING at that clause — and neither fires.**
2. **`§1.2` ROW 4'S CROSS-REALM PLAIN-OBJECT ACCEPTANCE AND `§1.4` ITEM 4 (e)'s REALM-AGNOSTIC TEST ARE
   DRIVEN, AND THEY HOLD.** The build's own test of the class is structural and carries a FOURTH prototype
   class for a plain object from another realm (`bindings/js/src/crossing.rs`'s `JsProto::{Plain, Null,
   ForeignPlain, Class}`, and `index.mjs`'s `isPlainObjectValue`), and the drive that the gate-5 record booked
   as *"STILL OPEN as a drive — recorded, not claimed"* is now the live battery's `LIVE-10`
   (`archive/gate6/storeroom-js-live-determination.md` `§4`, `§6` (h)): **a cross-realm plain object,
   `Object.create(null)` and a cross-realm array ACCEPTED and round-tripping; a cross-realm class instance
   `ValueNotAdmitted`; and a cross-realm array at an ADDRESS position answered by the walk's own
   `AddressNotFound`, never as a malformed shape.**
3. **AND THE `§1.8`-NEIGHBOURING VERBOSE-REJECTION CELL THIS PART'S OWN SUBSECTION DECLARES IS THE GATE-5
   FINDING'S SUBJECT AND IS NOW HELD:** the fourteen refused value classes answer FOURTEEN DISTINCT messages,
   each carrying the failing target's own spelling, the class and the argument position, in the ONE form
   (`archive/gate6/storeroom-js-live-determination.md` `§3` · `LIVE-F1`; `LIVE-OBS-1`'s open reading of the
   `prototype-carrying` spelling's Part One stands as an OBSERVATION and is NOT decided here).
**NO CONTRACT BYTE OF THIS PART IS RE-DECIDED, NO FAILURE CODE IS MINTED, NO `DD` ROW'S `alt` MOVES, AND THE
REGISTER OF `contract.md §5` KEEPS ITS `8` ROWS** (`[A3 docs/specs/storeroom-js/contract.md §10 — this pass's
own reconciliation region; A3 docs/specs/storeroom-js/package.md §4.5's dated clause — the carrier-count
reconciliation; A3 archive/gate6/storeroom-js-live-determination.md §3 · §4 | cross-reference]`).
