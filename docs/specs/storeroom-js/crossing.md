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
| **3** | `StoreValue::Num` | **a JS `number`** | every finite `number`, integral or fractional, **positive and negative**, and both `0` and `-0` **in memory** | `NaN`, `Infinity`, `-Infinity` → `ValueNotAdmitted` (`NonFinite`); a `Number` object wrapper → `ValueNotAdmitted` |
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
| **`FilePathArg` 1** | a **non-empty `string`** naming a path that PASSES the store's construction-time reachability probe | any such path | — |
| **`FilePathArg` 2** | **ABSENT** | **IN DOMAIN** — the register is created at `mem` and the store IS returned | — |
| **`FilePathArg` 3** | **`null`** / **`undefined`** / **`''`** / a **non-string** | — | **`AddressMalformed`**, no instance returned |
| **`FilePathArg` 4** | a string whose **parent directory does not exist** | — | **`FilePathUnreachable`**, no instance returned |
| **`FilePathArg` 5** | a string that **is a directory** | — | **`FilePathUnreachable`**, no instance returned |
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
**AND THE TWO THINGS THIS RELATION DOES NOT DO, STATED SO IT IS NOT OVER-READ:** **a caller comparing two
objects with `===` is comparing REFERENCES and not values** — the relation above is the only value
comparison this unit declares; and **the relation is a property of the PACKAGE's own helper and of this
unit's acceptance layer, NEVER of the store**, whose own equality already ignores member order
(`[A3 docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 — *"an object's key order counted as significant"*
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
`cfg` object and each of its three keys, every verb's `address`, `tier` and `opId`, the construction's
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
   THE REASON STEP ONE MUST PRECEDE ANY CONVERSION.** **`rollback(instance, Symbol())` reached
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
