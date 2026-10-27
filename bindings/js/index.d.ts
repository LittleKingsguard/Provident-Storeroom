// `provident-storeroom` — **THE AUTHORED TYPE DECLARATION OF THE PUBLISHED NODE ESM BINDING**
// (`docs/specs/storeroom-publish/contract.md §2.4`; `docs/specs/storeroom-publish/distribution.md §5`;
// `PUB-DD-3`; `Q3-4`).
//
// **THIS FILE IS HAND-AUTHORED AND NOT GENERATED** (`§2.4` item 1; `PUB-DD-21`): it carries no generation
// banner, no build-time code generator produces it, and it is the file the package's own `types` field
// reaches and the package's own `files` allowlist ships.
//
// **IT DECLARES THREE THINGS AND NOTHING ELSE** (`distribution.md §5.2`): (1) the claimed entry's OWN
// NAMED EXPORT SET — **ONE NAME, `storeCreate`, AND NOTHING ELSE** (`surface.md §2.9` item 1's `A127`
// clause; `docs/decisions.md` · `A127`/`A128`, 2026-10-16: the module-level count is `11 → 1` ✓, the
// deprecation window of `A128`'s fiat being declared away at that clause); (2) the instance's own member
// set, **FOURTEEN OWN MEMBERS AND NOTHING ELSE — `10 + 1 + 1 + 2 = 14` ✓** (`distribution.md §5.2` item 2 read
// with `surface.md §2.4` item 9 (f)'s `A127` clause): **THE TEN METHODS** `read(address, tier?)` ·
// `readLiteral(address, tier?)` · `write(address, tier, value, commit?)` · `delete(address, tier?)` ·
// `rollback(opId)` · `listen(handle, addresses)` · `unlisten(handle)` · `addConstraint(pair, constraint)` ·
// `constraintOn(pair, constraint)` · `constraintOff(pair, constraint)`, **PLUS `register(handle, listener)
// -> undefined`, `constraints() -> ConstraintPair[]`, `removeListener(handle) -> undefined` AND
// `removeConstraint(pair) -> undefined`** — the first two the singles the 2026-10-18 clause below names, the
// last two the members `contract.md §2.7` item 9 adds — the first being the
// listener registration, the second the registered-pair read; **`settle(record) -> undefined` STOOD HERE
// AS THE ORDERING SEAM AND IS REMOVED WHOLE** (the clause below carries the mark and the ruling); and (3) the
// failure surface, a thrown plain object with exactly
// `{status, message, log}` — **THREE MEMBERS FROM 2026-10-16, `2 → 3`, on the architect's ruling *"Bubble
// the message log to the client on failure, override any clauses that forbid this."*** (`surface.md §2.5`'s
// clause of that date, the crossing form's ONE home; **the ONE figure that moves is the arity, and
// `storeCreate` remains the namespace's one name and the product its twelve own members**).
//
// **⟶ AND THE METHOD LIST ABOVE CARRIES ONE STALE SPELLING AND ONE STALE ARITY, SUPERSEDED HERE, 2026-10-19:**
// **`listen` IS `listen(handle, addresses)` AND NOT `listen(address)` — arity `2`, position `1` the
// caller-spelled `handle` (a non-empty `string`) and position `2` `addresses`, a SET of addresses whose
// member is an address and whose EMPTY ARRAY is in the domain** (`docs/specs/storeroom-held-listener-identity/
// contract.md §2.2` item 1; `listen-verb.md §1` item 1 and `§2.2` items 1–2: the arity figure moves `1 → 2`
// at four declared sites, each needing its own dated clause). **THE BYTES LISTING `listen(address)` STAND AS
// THE PRE-2026-10-18 READING AND ARE READ THROUGH THIS CLAUSE** (`DEF-2026-10-02`: no whole-file rewrite).
//
// **⟶ AND THE MEMBER-SET FIGURE ABOVE IS SUPERSEDED AND IS READ THROUGH THIS CLAUSE, 2026-10-18: THE
// OPERATIVE SET IS TWELVE OWN MEMBERS, `10 + 1 + 1 = 12` ✓ — THE TEN METHODS, `register` AND `constraints`** —
// declared at `surface.md §2.4` item 9 (f)'s clause of that date, which moves the set `13 → 12` on the
// architect's rulings of 2026-10-18, VERBATIM: *"Settle is redundant because the kernel is always in the
// loop."* · *"Always route to the kernel, because the JS code does not decide whether constraints trigger."* ·
// *"The kernel is always supposed to be in the middle. Any occasion where the write path is not governed by
// the kernel is a hallucination."* **`settle` IS THE MEMBER THAT LEAVES AND NO OTHER MEMBER MOVES WITH IT**
// (`§2.4` item 9's `REMOVED-WHOLE` pointer of the same date, whose own words are *"NO DRIVE MAY ASSERT A CALL
// OF `settle` FROM THIS DATE, ON ANY INSTANCE, FOR ANY ARGUMENT"*). **THE TWO REMAINING SINGLES ARE `register`
// AND `constraints`, AND THEY ARE NAMED BECAUSE A LONE `+1` WOULD NOT COMPUTE.** **SO A DECLARATION FILE THAT
// STILL DECLARES A `settle(record) -> undefined` MEMBER AT ANY POSITION, OR THAT READS THIRTEEN OWN MEMBERS,
// AFTER THIS DATE IS A FINDING BY THAT CLAUSE'S OWN WORDS** (`surface.md §2.4` item 9 (f)'s clause of
// 2026-10-18, item 4: *"a declaration file that still reads THIRTEEN own members, or that declares a
// `settle(record) -> undefined` member at any position, after this date is a FINDING"*). **THE BYTES ABOVE
// STAND AS THE `A127` PASS'S READING (`DEF-2026-10-02`: no whole-file rewrite) and every "twelve own members"
// figure in this file is read through the 2026-10-17 thirteen-mark and through THIS clause as TWELVE AGAIN,
// with the thirteen being the 2026-10-17 reading and not the operative one.** **THE TWO ROUTES THAT WOULD
// HAVE MOVED THE SET EARLIER ARE STILL REFUSED BY NAME AND NEITHER IS ONE OF THESE** (`§2.5`'s clause of
// 2026-10-16: a `constraintLog(commit)` reader and a second module-namespace name).
//
// **⟶ AND THE MEMBER-SET FIGURE ABOVE IS SUPERSEDED AND IS READ THROUGH THIS CLAUSE, 2026-10-19: THE
// OPERATIVE SET IS FOURTEEN OWN MEMBERS, `10 + 1 + 1 + 2 = 14` ✓ — THE TEN METHODS, `register`, `constraints`
// AND THE TWO REMOVE MEMBERS `removeListener(handle)` AND `removeConstraint(pair)`** — **WHICH SUPERSEDES THE
// METHOD LIST'S OWN *"THE TWO REMAINING SINGLES ARE `register` AND `constraints`"* OF 2026-10-18: the singles
// that remain are still those two, and the fourteen-member set carries them PLUS the two remove members, so
// no reader counts the `+ 2` into the singles** — declared at
// `docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9, THE MEMBER SET `14`, whose own list
// is `{ read, readLiteral, write, delete, rollback, listen, unlisten, addConstraint, constraintOn,
// constraintOff, register, constraints, removeListener, removeConstraint }`. **THE FIGURE MOVES `12 → 14`
// and the two new members are reached through the factory's product ALONE — the module namespace keeps its
// ONE name (`11 → 1` ✓), because the two new members are NOT module exports** (`contract.md §2.7` item 9's
// `[CENSUS]` and its closing clause). **AND THE `12 → 13` FIGURE IS WITHDRAWN BY NAME: the thirteen-mark of
// 2026-10-17 is a SUPERSEDED READING and was never the operative one** (`P: docs/pending.md · (AA-5)`,
// verbatim: *"the member set is 14 and the `12 → 13` figure is withdrawn by name"*). **SO EVERY "twelve own
// members" FIGURE BELOW — the `A127` pass's reading at its own bytes, the 2026-10-18 clause's operative
// `TWELVE`, and `StoreInstance`'s `"THE TWELVE"` — IS READ THROUGH THIS CLAUSE AS FOURTEEN, and a
// declaration file that declares twelve while the product ships fourteen is the FINDING `contract.md §2.7`
// item 9 exists to prevent.** **THE TWO ROUTES THAT WOULD HAVE MOVED THE SET EARLIER ARE STILL REFUSED BY
// NAME AND NEITHER IS ONE OF THESE** (`§2.5`'s clause of 2026-10-16: a `constraintLog(commit)` reader and a
// second module-namespace name) — the 2026-10-18 paragraph's closing sentence above stands BYTE-FOR-BYTE and
// is read through this clause.
//
// **THE TEN METHODS TAKE THE RECEIVER'S OWN POSITION AWAY: `8 → 1` ✓ AND `4 → 12` ✓** (`surface.md §2.9`
// item 1's and `§2.4` item 9 (f)'s `A127` clauses). The seven verbs that reach the store are METHODS of the
// object `storeCreate` returned, so **NO DECLARED SIGNATURE CARRIES A LEADING `instance` POSITION** — the
// receiver is not a position — and the module namespace's own spelling, not a second name at any layer,
// is what a consumer reaches them through. **`on` AND `off` ARE MERGED AWAY BY `A127` AND ARE NOT
// MEMBERS**: the listener registration route is `listen` + `register` and its withdrawal is `unlisten`.
//
// **AND THE RECORDS THOSE METHODS ANSWER WITH ARE DECLARED BESIDE THEM, WHICH IS STILL PART (1) AND NOT A
// FOURTH THING**: `Address` · `Tier` · `TierSet` · `StoreConfig` · `BaseState` · `JournalOp` ·
// `WriteRecord` · `DeleteRecord` · `RollbackRecord` · `Handle` · `Listener` are the SHAPES OF THE
// ARGUMENTS AND OF THE ANSWERS, in `DD-39`'s own member spellings (the sibling directory's `contract.md
// §0.2`), and a declaration that did not carry them would declare one name and no surface. **None of
// them is a STORE type**: no register, no anchor, no tier tree, no journal and no store verb is declared
// here (`§5.2` item 4).
//
// **AND TWO MORE SHAPES STAND BESIDE THOSE ELEVEN WITHOUT A BYTE OF EITHER BEING MINTED HERE, BECAUSE THE
// WRITE'S COMMIT POSITION IS THE KERNEL'S OWN RECORD AND NOT THIS PACKAGE'S** (`§2.4` item 9
// (f)'s *"each with its argument types"* read with its *"no `pending`-shaped record type this unit does
// not declare"*): **`AttemptRef` (`1` member) and `CommitRecord` (`4` members — `attempt` · `op` ·
// `triggered` · `pending`) are THE KERNEL'S OWN NAMED SHAPES, DECLARED BY THE KERNEL AND NOT BY THIS
// UNIT** (`kernel-surface.md §1` item 4's closed record enumeration; its `§2.1` item 2 for the record's
// four members; `attempt-lifecycle.md §2.4` item 1 for the one-member `AttemptRef`) — so the record position
// carries its own `pending` member and this file MINTS NO RECORD TYPE OF ITS OWN to carry it.
// **`AttemptRef` and `CommitRecord` are therefore not STORE types either, and not store records**: they
// are kernel-side shapes, cited from their own unit's declaration.
// **⟶ AND THE POSITION THEY ARE CITED FOR MOVED WITH `settle`'s REMOVAL, 2026-10-18**: `settle`'s own
// argument is gone with the member, and these two shapes now stand here for the ONE position that still
// reads a `CommitRecord` — the `commit` argument of `write` (`§2.4` item 9 (g) item 1's class test, the
// record position `A120` (1) admits). **THE SHAPES THEMSELVES ARE UNMOVED AND `CommitRecord` KEEPS ITS
// `FOUR` MEMBERS, `pending` AMONG THEM** (`§2.4` item 9's adoption-machinery clause of that date, item
// `(vi)`: *"THE ADOPTION SYSTEM CONSUMED IT AND DID NOT OWN IT"*).
//
// **AND THE ONE THING THIS DECLARATION MUST NOT CARRY, STATED SO THE FINDING RULE IS CHECKABLE**
// (`distribution.md §5.2` item 4): **it declares NO store type, NO store verb, NO `findAddress`, NO
// release verb and NO constraint or repair seam** — each of those is a declaration the sibling directory
// refuses, and a declaration file carrying one would declare a surface the package does not publish.
//
// **⟶ AND THE LIMITS OF THIS FILE ARE STATED RATHER THAN IMPLIED, ADDED 2026-10-17** (`DEF-2026-10-16-Q`:
// *"`bindings/js/index.d.ts` IS TYPE-CHECKED NOWHERE, AND THE TYPES SHIP TO CONSUMERS"*). **NOTHING IN THIS
// REPOSITORY TYPE-CHECKS THIS FILE — no `tsc`, no `tsd`, no `checkJs` and no type-test file anywhere in the
// tree — so EVERY CHANGE MADE HERE IS TEXTUAL: it is a claim read by a HUMAN and by a consumer's own
// compiler, never a claim this repository's own suite can fail on.** **THE THREE CLAIMS A `TypeScript`
// DECLARATION CANNOT ENFORCE, EACH NAMED SO NO READER READS THEM AS ENFORCED:**
// 1. **`tier?: TierSet` CANNOT EXPRESS SUPPLIED-VERSUS-OMITTED `undefined`** (`PAR-JS-6`: a SUPPLIED
//    `undefined` at the tier position is PRESENT and takes the store's `AddressMalformed`, while the call
//    that supplied NOTHING there folds to the ABSENT row). An optional parameter admits both spellings
//    identically and no type can separate them; the distinction is a RUNTIME one, driven at
//    `a127-surface.test.mjs`.
// 2. **`Address = readonly (string | number)[]` CANNOT EXPRESS NON-NEGATIVE INTEGER** (`PAR-JS-5`). The
//    domain is a string key or a non-negative integer a `u64` can carry exactly; `number` admits `-1`,
//    `1.5`, `NaN` and `Infinity`, each of which the boundary REFUSES with the store's own
//    `AddressMalformed`. The narrowest lawful widening a declaration can make is `number`, and this file
//    makes it.
// 3. **THE INSTANCE'S *"TWELVE OWN MEMBERS AND NOTHING ELSE"* IS NOT STRUCTURALLY ENFORCEABLE HERE**
//    (`§2.4` item 9 (f)'s `A127` clause; `§2.9` item 1's) — **AND THE COUNT IT NAMES IS THE SUPERSEDED ONE:
//    THE OPERATIVE FIGURE IS FOURTEEN, read through the member-set clause of 2026-10-19 above**
//    (`docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9). An interface declares the
//    members a value HAS
//    and constrains no excess member, so a product carrying a thirteenth own member still satisfies
//    `StoreInstance`. The count is driven at the boundary instead (`a127-surface.test.mjs`'s
//    `Object.getOwnPropertyNames` cell, which exists precisely because this declaration cannot fail on it).

/**
 * A position in the register: the address a verb is called at, as a sequence of path segments.
 *
 * **A SEGMENT IS A `string` (a key) OR A NON-NEGATIVE INTEGER (an index)** — `PAR-JS-5`'s own domain, and the
 * domain the shipped walk admits and the store's own records return. **`readonly string[]` WAS THE SHIPPED
 * DECLARATION AND IS FALSE OF EVERY ADDRESS CARRYING AN INDEX**, so a consumer compiling the lawful
 * `read(instance, ['key', 0])` met a type error on a correct call.
 */
export type Address = readonly (string | number)[];

/**
 * The tier a verb is called at: the store's own persistence tokens.
 *
 * **THE DOMAIN IS THE STORE'S THREE TOKENS — `'mem'` · `'file'` · `'temp'`** (`PAR-JS-6` · `PAR-JS-7` ·
 * `PAR-JS-11`; the store's own tier row). **`'mem' | 'file'` WAS THE SHIPPED DECLARATION AND DROPPED
 * `'temp'`**, mis-typing a lawful third token as a value outside the domain.
 */
export type Tier = 'mem' | 'file' | 'temp';

/**
 * **THE READER'S ARITY, DECLARED BECAUSE IT IS NOT THE WRITER'S** (`PAR-JS-6`; `crossing.md §1.3`'s
 * `TierArg` row 2): on `read` and `readLiteral` a tier is ABSENT, ONE token, or an ARRAY of tokens read as an
 * ANY-MATCH set. **On `write` and `delete` an array is outside the domain — the array spelling is the
 * reader's arity — so those two verbs take the single token `Tier` alone** (`PAR-JS-7` · `PAR-JS-11`).
 */
export type TierSet = Tier | readonly Tier[];

/**
 * The configuration a store is constructed from — **the store's FOUR declared keys and no FIFTH**
 * (`filePath` · `journalLength` · `listeners` · `constraints`), each passed through WITHOUT a default, a
 * rename or a key of this package's own.
 *
 * **⟶ RE-SPELLED 2026-10-15 (`surface.md §2.1`'s `cfg` block and its dated clause of 2026-10-15;
 * `contract.md` `DD-36` as amended 2026-10-15; `parameter-semantics.md §2.21` = `PAR-JS-21`): this cell as
 * filed read *"the store's THREE declared keys and no fourth"* and is re-spelled IN PLACE to the four-key,
 * no-FIFTH reading — the fourth declared key is `constraints`, whose own declaration stands below, and the
 * set's declared arity is `4`.** **NO OTHER CELL OF THIS FILE MOVES** (`distribution.md §5.2`), **READ AT
 * THE FIGURES `A127` MOVED** — the entry's `1` named export (`11 → 1` ✓), the addon's `5`, the instance's
 * `12` own members (`4 → 12` ✓), the kernel's `5` and the store's `8` register rows.
 */
export interface StoreConfig {
  /** The journal's declared length: a positive integer (`PAR-JS-3`). */
  readonly journalLength: number;
  /**
   * The listeners a construction adopts (`PAR-JS-4`): an array of `{ address, handle }` records, the EMPTY
   * array included.
   *
   * **AND THE KEY IS REQUIRED, NOT OPTIONAL**: an ABSENT `listeners` is the ONE absence the construction
   * does not admit and answers `AddressMalformed` for, so `listeners?` — the shipped spelling — invited a
   * call that can never construct. **The ELEMENT SHAPE IS THE STORE'S TO REFUSE**: a member that is not an
   * `{ address, handle }` record, or whose `handle` is not a plain non-empty `string`, is admitted here and
   * refused by the store's own construction, because the package mints no second refusal for that position.
   */
  readonly listeners: readonly unknown[];
  /** The file the file tier is backed by, where one is declared (`PAR-JS-2`; ABSENT is in domain). */
  readonly filePath?: string;
  /**
   * **⟶ ADDED 2026-10-15 (`parameter-semantics.md §2.21`; `surface.md §2.1`'s `cfg` block dated
   * 2026-10-15; `contract.md §8.1` #16) — THE FOURTH DECLARED KEY: THE CONSTRUCTION'S CONSTRAINT LIST**,
   * an array of `{ address, id }` pairs (`[{ address: [key], id: 'c1' }]`).
   *
   * **IT IS OPTIONAL AND ITS ABSENCE IS IN DOMAIN** — *"an ABSENT `constraints` is the ordinary
   * no-constraint store, and no default is declared for it"* — **and every element and every shape outside
   * the list is refused at the store's own construction with ITS OWN code and ITS OWN message**, which is
   * why the element type is the caller's own shape and not a narrowed record here.
   *
   * **⟶ AMENDED 2026-10-24 (`D-26`, verbatim: *"The batch in cfg.constraints must supply functions"*): THE
   * ELEMENT IS THREE MEMBERS AND THE FUNCTION IS REQUIRED. The pair is the element's ADDRESSING and the
   * function is its SUBSTANCE — the reading the use-case record has carried since 2026-10-16, now the
   * declaration's own. THE STORE NEVER SEES THE FUNCTION**: a JavaScript function cannot cross into Rust at
   * any depth, so the crossing carries the pair and **the PACKAGE arms the substance** at construction
   * through the same act the add route performs (`D-26` items 3–4). The state this key's earlier prose named
   * — *"a well-formed element that carried no function … is NOT a carried pair"* — therefore **HAS NO
   * PRODUCER ON THIS ROUTE**: a batch element is always carried.
   *
   * **AND THE ELEMENT'S `id` IS THE PAIR'S HANDLE, A HANDLE IS INSTANCE-SCOPED AND UNIQUE, AND TWO RULES
   * FOLLOW THAT ARE DIFFERENT RULES FOR DIFFERENT ACTS — a declaration that conflates them gets both wrong**
   * (`D-23`, verbatim: *"Setting a constraint should expect a handle name to be used for handle and
   * process/error logging purposes"*; `D-24`, verbatim: *"The handle becomes the id - the handle needs to be
   * unique regardless, and setting a duplicate handle is an overwrite"*; `D-27`'s own table):
   *
   * | act | a repeated handle |
   * |---|---|
   * | **this key, `cfg.constraints`** | **REJECTED** — the list is ONE supplied act, so an internal ambiguity is malformed input and not a second write |
   * | **`addConstraint(pair, constraint)`** | **OVERWRITE** — acts are separate in time, so a later one replaces the earlier |
   *
   * **SO, AT CONSTRUCTION, TWO REFUSALS THAT THE STORE CANNOT TAKE AND THE PACKAGE OWNS** (`D-27`): **no two
   * elements of one `cfg.constraints` may name one `id`; and no element's `id` may equal a `handle` this
   * construction's `listeners` adopts** — a cross-KIND collision, rejected regardless of kind (`D-27`:
   * *"Reject duplicate handles in batch - regardless of listener/constraint type"*). **The second is not an
   * overwrite and the first is not a second registration.** Both are refused **before any filesystem act**,
   * in the surface's one thrown form `{status, message, log}`, under the store's existing
   * `ConstraintListInvalid` — **the package mints no code**.
   *
   * **AND THE NAME'S OTHER TWO READERS NEED NOTHING** (`D-24` items 2–3, both recorded so no pass adds a
   * member): `constraints()` already returns the bare `id`, so its four exclusions stand exactly as written;
   * and `LogEntry` already carries `id`, so **the name's logging role moves no member-set** and no undeclared
   * seventh member exists.
   */
  readonly constraints?: readonly {
    readonly address: Address;
    readonly id: string;
    readonly constraint: Constraint;
  }[];
}

/**
 * **THE STORE'S OWN CLOSED SET OF FAILURE CODES, AS THE TYPE DECLARES IT — A UNION OVER A
 * DECLARED-BUT-OPEN SET** (`contract.md §2.4` item 2; `distribution.md §5.3`; `PUB-DD-3`).
 *
 * **THE SIXTEEN MEMBERS BELOW ARE THE STORE'S OWN, and their membership is the STORE'S to close and
 * never this package's**: this package MINTS NO MEMBER, WIDENS NO SET AND RENAMES NONE
 * (`distribution.md §5.3` item 3).
 *
 * **AND AN UNKNOWN STATUS IS STILL TYPED — THE ESCAPE IS LOAD-BEARING, NOT A LOOSENESS.** The store's set
 * has already moved twice: from fourteen members to fifteen, and 2026-10-15 to SIXTEEN, the sixteenth being
 * `ConstraintListInvalid` (`contract.md §8.1` #16, amended 2026-10-15; `parameter-semantics.md §2.20` and
 * `§2.21`). So an immutably-enumerated union would mis-type a LAWFUL refusal the moment the store's set
 * moves (`PUB-DD-3`'s refused alternative). The `(string & {})` arm is what keeps a member the store has
 * added typeable in an installed `0.1.0`, and its absence would be a finding rather than a strictness.
 *
 * **AND THE SIXTEENTH MEMBER IS DISCOVERABLE HERE AND NOT MERELY TYPEABLE**: `ConstraintListInvalid` is
 * written among the literals at its rank's own place — LAST of the sixteen and BEFORE the escape — because
 * `distribution.md §5.3` item 1 requires the store's members to be *"DISCOVERABLE in the type"*, and a
 * member the declaration does not name is not discoverable from the type at all. **NO RANK OF `1`…`15`
 * MOVES AND NO EXISTING TRIGGER MOVES: THE MEMBER IS APPENDED AS THE SIXTEENTH** (`contract.md §8.1`'s
 * amended heading, whose algebra reads `11 + 2 + 1 + 1 + 1 = 16` ✓; the row that drives it is
 * `docs/specs/storeroom-native/implementation-plan.md §10.9` row 8). **ITS TRIGGER IS THE VALIDATION OF
 * THE SUPPLIED CONSTRAINT LIST** — at
 * construction/startup, or of the LOADED state against that list at load — **and the store writes no byte of
 * that list into the file and holds no register key for it** (`contract.md §7.1` step 4 and `§7.2` item 6 as
 * amended 2026-10-15; `seams-and-lifecycle.md §8.1`).
 *
 * **⟶ AMENDED 2026-10-24 (`docs/specs/storeroom-native/contract.md §8.1`'s 2026-10-23 amendment (`A148` Q3,
 * folded into `U-STOREROOM-JSON-CROSSING`); `strata/decisions.md`'s `FINDING` of this date; `R-3`'s `Q4`;
 * `REVIEW-2026-10-24.md`'s `Q4`) — THE SET IS SEVENTEEN AND THE DECLARATION WAS ONE BEHIND THE STORE.** The
 * amendment widens the closed set `16 → 17` with **`ValueRefusedAtBoundary` at rank `17`**, and *"the
 * operative set is `17` members ranked `1`…`17`"* with the spelling moved to `[&'static str; 17]`; the store
 * implements seventeen (`src/error.rs`'s `CODES`). **So `ValueRefusedAtBoundary` is written among the
 * literals at rank `17`, LAST of the seventeen and BEFORE the escape — the position `ConstraintListInvalid`
 * held, because the amendment APPENDS and moves no rank of `1`…`16`.** **THE ALGEBRA NOW READS
 * `11 + 2 + 1 + 1 + 1 + 1 = 17` ✓, and the four figures this paragraph carries are read through this clause:
 * *"THE SIXTEEN MEMBERS BELOW"* reads SEVENTEEN; *"its set has already moved twice … and 2026-10-15 to
 * SIXTEEN"* reads THREE times, the third being this amendment, **which is the escape arm's own evidence and
 * therefore reinforces §the arm rather than weakening it**; *"THE SIXTEENTH MEMBER … LAST of the sixteen"*
 * reads `ValueRefusedAtBoundary` as the SEVENTEENTH and last of the seventeen, with `ConstraintListInvalid`
 * at rank `16`; and `constraints()`' *"the store's closed `16`-member set is not reached"* keeps its
 * statement about THAT READ while its FIGURE moves to `17`. **`ValueNotAdmitted` STAYS AT RANK `14` AND IS
 * NOT REMOVED** — it remains the store's own answer on the native route — **so a pass that reads rank `17`
 * as a RENAME of rank `14` has destroyed a member** (`DEF-2026-10-02`: no whole-file rewrite).
 *
 * **⟶ AND AMENDED AGAIN 2026-10-26, BY THE ARCHITECT'S RULING ON THE DOWNSTREAM CLAIMS `DEF-S` AND `DEF-N`,
 * VERBATIM: *"Expand the returned error set for both S/N"*.** **THE SET IS NINETEEN, RANKED `1`…`19`, AND THE
 * TWO APPENDED TERMS ARE `ConstraintBodyThrew` AT RANK `18` AND `ConstraintRefusedAtRegistration` AT RANK
 * `19`** — the same two members, in the same rank order, that `src/error.rs`'s `CODES` now carries last;
 * **NO RANK OF `1`…`17` MOVES, the algebra reads `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 = 19` ✓, and the escape arm
 * `(string & {})` still stands EXACTLY ONCE, after the members.** **THE FIGURES ABOVE ARE READ THROUGH THIS
 * CLAUSE**: every *"seventeen"* and every *"`17`"* in them is the figure of its own date. **`ConstraintListInvalid`
 * KEEPS rank `16` AND ITS OWN TRIGGER** — the malformed entry — because `DEF-N`'s arm is a WELL-FORMED pair
 * refused by its own body's verdict, which that member's generated sentence names as a shape failure and
 * which is therefore the wrong code for it.
 *
 * **⟶ AND AMENDED AGAIN 2026-10-26, BY THE ARCHITECT'S RULING ON THE DOWNSTREAM CLAIMS `DEF-H` AND `DEF-W`,
 * VERBATIM: *"Expand the returned fail-state list to include the refusal"* and *"Assert the constraints on
 * rollback"*** (`strata/decisions.md` · `D-38`). **THE SET IS TWENTY, RANKED `1`…`20`, AND THE APPENDED TERM
 * IS `ConstraintPassRefused` AT RANK `20`** — **the ONE member a CONSTRAINT REFUSAL answers with**, *"ONE
 * status for the refusal, not one per `KC` token"*, whose token continues to ride the attempt's own
 * `outcome` entry's `state` inside the failure's `log`. **NO RANK OF `1`…`19` MOVES, the algebra reads
 * `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓, and the escape arm `(string & {})` still stands EXACTLY
 * ONCE, after the members.** **`FileCommitFailed` KEEPS RANK `15` AND IS NOW THE SAVE'S CODE ALONE** — *"a
 * constraint-refused write is a commit that did not stand"* was the ground for reusing it and `D-38`
 * falsifies it — **so `write`'s and `rollback`'s refusal paths may no longer answer it and the `file` tier's
 * own failing save still does.** **IT IS THE MEMBER THIS DECLARATION PUBLISHES FOR THE REFUSAL, WHICH IS WHAT
 * MAKES THE UNION HONEST ABOUT WHICH LAYER FAILED RATHER THAN A WIDENING FOR ITS OWN SAKE.**
 */
export type StoreStatus =
  | 'AddressMalformed'
  | 'AddressNotFound'
  | 'LeafHasNoDownstream'
  | 'TierNotFound'
  | 'OutOfDomainTier'
  | 'ParentAnchorMonotonicityViolation'
  | 'ContainerKindConflict'
  | 'ReadTargetIsBranch'
  | 'WriteParentNotLink'
  | 'JournalOpUnknown'
  | 'RollbackCompacted'
  | 'ConstructionArgumentMissing'
  | 'FilePathUnreachable'
  | 'ValueNotAdmitted'
  | 'FileCommitFailed'
  | 'ConstraintListInvalid'
  | 'ValueRefusedAtBoundary'
  | 'ConstraintBodyThrew'
  | 'ConstraintRefusedAtRegistration'
  | 'ConstraintPassRefused'
  | (string & {});

/**
 * **THE KERNEL'S OWN LOG ENTRY** — *"exactly six members — `seq` · `kind` · `id` · `message` · `opId` ·
 * `state`"* (`docs/specs/storeroom-constraints/kernel-surface.md §2.5` item 1, whose member set is CLOSED:
 * *"a seventh member of `LogEntry` … is not a variation, it is a different shape"*). **DECLARED HERE ONLY
 * AS THE ELEMENT SHAPE OF THE FAILURE'S `log` MEMBER, AND MINTED BY NO CLAUSE OF THIS UNIT**: an attempt's
 * message log entries are the KERNEL'S records, carried VERBATIM, and no flattening is declared — a client
 * that reads one reads the kernel's own entry.
 *
 * `kind` is the kernel's closed four-member `LogKind` set, and `state` is the kernel's own `KC` token on the
 * one `outcome` entry and `null` on the three non-`outcome` kinds.
 */
export interface LogEntry {
  readonly seq: number;
  readonly kind: 'constraint-check' | 'repair-run' | 'commit' | 'outcome';
  readonly id: string | null;
  readonly message: string;
  readonly opId: string | null;
  readonly state: string | null;
}

/**
 * **THE SINGLE FAILURE SURFACE** (`contract.md §1.4`; `distribution.md §5.2` item 3) — **AND ITS MEMBER SET
 * MOVES `2 → 3` FROM 2026-10-16 ON THE ARCHITECT'S RULING *"Bubble the message log to the client on failure,
 * override any clauses that forbid this."*** (`surface.md §2.5`'s clause of that date, whose items 1–10 are
 * the crossing form's ONE home). A THROWN plain object carrying exactly `{status, message, log}` — never an
 * `Error` subclass, never a returned tagged union and never a `Promise` rejection. **The status is carried
 * VERBATIM from the store's own closed set and the message is the store's own generated string**; this
 * package mints neither.
 *
 * **`log` IS AN ORDINARY OWN ENUMERABLE DATA MEMBER OF THAT SAME PLAIN OBJECT** (item 9): *"written with an
 * object literal, not `Object.defineProperty`, not a getter, not on a prototype and not behind a `Symbol`"* —
 * so `Object.keys(caught)` reads exactly `["log","message","status"]` and its length is `3` on EVERY arm. **IT
 * IS NEVER ABSENT, NEVER `null` AND NEVER A NON-ARRAY** (item 9), **and `[]` is its declared value where the
 * failure's cause has no attempt at all** (item 4: the empty array, never an absent member and never a
 * placeholder entry) — **while every failure whose attempt exists carries that attempt's own entries, taken
 * BEFORE the attempt is disposed of** (item 10 (iii)).
 */
export interface StoreRefusal {
  readonly status: StoreStatus;
  readonly message: string;
  readonly log: LogEntry[];
}

/**
 * **⟶ `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`): `Handle` MOVES `object → string`**
 * (`contract.md §2.1` item 1; `P: docs/pending.md · P-6`, the type ruling, verbatim: *"Refuse handles that
 * aren't strings."*). **THE CALLER SPELLS IT, HOLDS IT AND PASSES IT BACK; NOTHING MINTS IT.** The value the
 * store reports in a trigger pair and the value the caller holds ARE ONE VALUE, and its domain is
 * `{ s : s ∈ String ∧ s ≠ "" }` (`identity-and-domain.md §2` item 1).
 *
 * **THIS IS A CONSUMER-VISIBLE BREAK** (§7 item 2 of the contract): every signature below that names a
 * handle is re-typed with it, and the release class is the release gate's (`P: docs/pending.md · (AA-4)`).
 */
export type Handle = string;

/** The caller's listener: any JS function, invoked with the triggering address as its ONE argument. */
export type Listener = (address: Address) => void;

/**
 * **A BASE STATE — THE PRE- AND POST-STATE A JOURNAL OP CARRIES** (`DD-39`: *"`BaseState` → `{ present,
 * value }`"*). **`present` is whether a version stood at the address, and `value` is that version's value
 * where one did — `undefined` where none did**, because the record is the store's own and the package adds
 * no member to it.
 */
export interface BaseState {
  readonly present: boolean;
  readonly value: unknown;
}

/**
 * **THE STORE'S OWN JOURNAL OP, CROSSED MEMBER FOR MEMBER AND IN THE STORE'S OWN SPELLINGS** — `DD-39`'s
 * eight declared names (`distribution.md §5.2` item 1; `P-PUB-7`): `{ opId, kind, address, tier, before,
 * after, seq, compacted }`.
 *
 * **`opId` IS A `string`** — the store's own op-id domain is a non-empty string (`PAR-JS-9`), and the id a
 * `write` returns is the id a `rollback` takes. **`kind` is the store's own token** (`'write'` and
 * `'delete'` today) **and its membership is the STORE'S to close, so it is typed as `string` and this
 * package mints no union over it.** **`tier` is one of the store's own three tokens, or `null` where the op
 * carries none**; **`seq` is the journal's own sequence number and `compacted` the store's own flag**, each
 * carried verbatim.
 */
export interface JournalOp {
  readonly opId: string;
  readonly kind: string;
  readonly address: Address;
  readonly tier: Tier | null;
  readonly before: BaseState;
  readonly after: BaseState;
  readonly seq: number;
  readonly compacted: boolean;
}

/**
 * The record a `write` answers: fresh data on every call, never a view of the store's own state.
 *
 * **`op` IS THE STORE'S OWN JOURNAL RECORD AND NOT A NUMBER** (`DD-39`; `P-PUB-7`'s `S-TYPES`): **the shipped
 * declaration read `op: number`, which is false of EVERY value the line returns**, and a consumer compiling
 * `write(i, a, 'mem', v).op.opId` met a type error on a correct call.
 */
export interface WriteRecord {
  readonly op: JournalOp;
  readonly watched: readonly Address[];
  /** **THE TRIGGER'S PAIRS** (`contract.md §2.4` item 1; `PAR-HL-38`): the pair REPLACES a bare handle list. */
  readonly triggered: readonly TriggerPair[];
}

/**
 * **⟶ `U-STOREROOM-HELD-LISTENER-IDENTITY`: THE TRIGGER'S PAIR, `{handle, address}`** (`contract.md §2.4`
 * item 1; `trigger-and-pair.md §1`; `PAR-HL-19`, `PAR-HL-20`, `PAR-HL-21`).
 *
 * **`handle` IS THE CALLER'S OWN STRING** and **`address` IS THE BINDING'S OWN ADDRESS** — the address the
 * listener was bound at, never the address the write targeted. **THE TWO ARE TOLD APART**: the write's own
 * address crosses as the record's `triggeringAddress`, and the invocation's ONE argument is that write
 * address (`contract.md §2.4` item 7).
 *
 * **NO PARALLEL `triggeredAddresses` ARRAY EXISTS AND NONE MAY BE ADDED** — the aligned form is an i-th
 * correspondence, which reverses `DD-37` (`contract.md §2.4` item 1; `trigger-and-pair.md §2` item 4).
 */
export interface TriggerPair {
  readonly handle: Handle;
  readonly address: Address;
}

/** The record a `delete` answers. */
export interface DeleteRecord {
  readonly address: Address;
  readonly tiers: readonly Tier[];
  /** **THE TRIGGER'S PAIRS** (`contract.md §2.4` item 1; `PAR-HL-38`; `A43` — a delete fires its own set). */
  readonly triggered: readonly TriggerPair[];
  /**
   * **THE OP THE `delete` LANDED — THE STORE'S OWN JOURNAL RECORD, `null` WHERE THE ACT REMOVED NOTHING**
   * (`strata/decisions.md` · `D-43` item 3, the architect, verbatim: *"Delete should be journaled and
   * reversible"*).
   *
   * **IT IS THE MEMBER `WriteRecord` CARRIES, AT THE SAME NAME AND THE SAME TYPE** (`WriteRecord.op` above,
   * the store's own eight-member `JournalOp`), so a caller has **one spelling for "the op this act landed"**
   * and one route to reversing it: `store.rollback(record.op.opId)` restores every version the delete
   * removed, **at its own tier**, exactly as a write's reversal restores what the write replaced.
   *
   * **THE MEASURED FACT THIS MEMBER EXISTS FOR.** The delete was already journaled — the store appended one
   * entry carrying the address, the per-tier before-state and an op id, and `rollback` already accepted that
   * id — but the record carried no identity, so **the act could not be NAMED, and an act that cannot be
   * named cannot be reversed**: that is why the kernel's unwinding could not reach a delete's effect at all.
   *
   * **AND `null` IS THE `D-3` ARM, SAID PLAINLY.** A delete that removes no version is a **success** with
   * `tiers: []` (`§4.4` arm `D-3`; `native contract.md §6.5` item 11 adds `triggered: []`) and appends no
   * journal entry, so there is no op to carry: **nothing is named because nothing was destroyed.**
   */
  readonly op: JournalOp | null;
  /**
   * **THE DISCARD'S WITNESS — THE REVERSALS THIS ACT'S OWN DELIVERY RAISED AND THE PACKAGE THREW AWAY**
   * (`strata/decisions.md` · `D-49`, the architect, verbatim: *"Make discard observable"*; `DEF-AH`).
   *
   * **WHY THIS MEMBER EXISTS.** A `delete`'s listener delivery **runs no constraint pass** — there is no attempt
   * for one to run over — so a `rollback` a listener body issues inside it raises a **restart request with no
   * consumer**, and the fail-state is honest only if the caller learns it happened (`D-43` item 2's fail-state
   * and both exits stand; `D-49` owes the witness and nothing else). **A listener at `window.tabs` fires for a
   * delete at `window.tabs.landingPage`** — the triggered set's membership rule is the address prefix — **and the
   * check it runs there is exactly the act the window discards**; this member is where that caller reads it.
   *
   * **ITS SHAPE, AND IT IS A LIST SO THE MEMBER CAN CARRY ONE TODAY AND MORE WITHOUT A SECOND SPELLING.** The
   * restart machinery holds **one** pending request per instance (a second in-flight action overwrites the
   * first — a declared limit, not a claim of this member), so the array is **`0` or `1` long**:
   *   * `opId` — **the store's own echo of the id the discarded reversal named**, or `null` where the reversal's
   *     call answered no id;
   *   * `addresses` — **the addresses the discarded check would have been asked at** (the watch's own addresses,
   *     each a fresh segment list), so a caller can re-run its own check at exactly those addresses.
   *
   * **A WITNESS IS NOT A REFUSAL.** The `delete` still answers what it answered — this record's other members
   * are unmoved, the act **throws nothing**, **no member of the closed status set is minted**, and the reversed
   * effect **still stands** (the request is reported, not re-run). **AND THIS MEMBER IS A NON-ENUMERABLE OWN
   * PROPERTY**: `Object.keys(record)` and every deep-equality over the record read the same four members they
   * read before, while a caller reads the witness **by its name**. A spread or `Object.assign` copy of the record
   * does not carry it — read the member off the record itself.
   *
   * **WHAT IT CANNOT CARRY, SAID HERE RATHER THAN LEFT TO BE DISCOVERED.** The other passless window — a
   * registration's own evaluation (`addConstraint`) — answers an **opaque identity** and carries **no witness**:
   * an identity is not a record and no member of it is declared, so the action raised there remains unobservable
   * without a new surface (`D-49`'s own instruction: say so rather than invent a member).
   */
  readonly discarded: readonly {
    readonly opId: string | null;
    readonly addresses: readonly Address[];
  }[];
}

/**
 * The record a `rollback` answers (`DD-39`: *"`RollbackResult` → `{ opId, undoneOps, restoredTo }`"*).
 *
 * **ALL THREE MEMBERS WERE MISTYPED BY THE SHIPPED DECLARATION** (`opId: number`, `undoneOps: number`,
 * `restoredTo: number`): **`opId` echoes the id the caller passed, and that id is a `string`** (`PAR-JS-9`'s
 * own unit: *"the `JournalOp.opId` string"*); **`undoneOps` is the LIST of the ids the reversal undid — an
 * ARRAY of those ids, not a count**; and **`restoredTo` is the base state the addressed subtree now stands
 * at**, `{ present, value }`.
 */
export interface RollbackRecord {
  readonly opId: string;
  readonly undoneOps: readonly string[];
  readonly restoredTo: BaseState;
}

/**
 * **THE ATTEMPT'S IDENTITY — THE KERNEL'S OWN ONE-MEMBER RECORD AND NOT THIS PACKAGE'S**
 * (`attempt-lifecycle.md §2.4` item 1: *"`AttemptRef { id: string }` — the attempt's identity: a non-empty,
 * kernel-unique token"*; read with `kernel-surface.md §1` item 4's closed record enumeration, which counts
 * it as a named kernel-side shape).
 *
 * **IT IS DECLARED HERE FOR ONE POSITION AND NO OTHER**: the `attempt` member of the `CommitRecord` the
 * `write` member's `commit` position takes (`§2.4` item 9 (f)'s *"each with its argument types"* read
 * with item 9 (g) item 1's record-position class test). **⟶ THE POSITION IT IS CITED FOR MOVED WITH
 * `settle`'s REMOVAL, 2026-10-18**: that member's argument is gone with the member, and the ONE position
 * that still reads a `CommitRecord` is the `commit` argument above. **No verb of this entry answers with it
 * and this package mints it nowhere.**
 */
export interface AttemptRef {
  /** The attempt's identity: a non-empty, kernel-unique token. */
  readonly id: string;
}

/**
 * **THE WRITE'S COMMIT POSITION IS THIS RECORD — THE KERNEL'S OWN `{ attempt, op, triggered, pending }`, AND
 * NOT THE STORE'S `WriteRecord`** (**⟶ RE-SPELLED 2026-10-18: this block read *"THE ORDERING SEAM'S ONE
 * ARGUMENT"*, and the seam `settle` is REMOVED WHOLE from the product — the BYTES stand and are read through
 * this clause; THE SHAPE IS UNMOVED and takes the ONE position that still reads it, the `write` member's
 * `commit` argument) (`kernel-surface.md §2.1` item 2's return-shape block: *"`CommitRecord`,
 * a record with exactly FOUR members, the FOURTH added at the `A108` landing pass of 2026-10-13"*; its
 * `§1` item 4 counts it among the kernel's own named shapes).
 *
 * **THE RECORD THE KERNEL PASSES IS THIS ONE AND THE STORE'S IS NOT.** **The kernel passes the `CommitRecord`
 * `commit` built and the pass's terminal arm reads again — one identity, at both instants** (`surface.md`
 * `§2.4` item 9 (a)–(b)'s table: *"the record identity (the `CommitRecord` `commit` is building)"* then
 * *"the SAME record identity"*; `PAR-JS-19`'s `supplier` cell: THE KERNEL, *"at instant (a) from `commit`
 * … and at instant (b) from the pass's terminal arm"*). **AND IT IS `NOT` THE STORE'S OWN RECORD**:
 * `kernel-surface.md §2.1` item 2's *"WHAT IT IS NOT"* clause reads *"the `CommitRecord` is the KERNEL'S
 * OWN record and is NOT the store's `WriteResult`"* — the store's write answers `{op, watched, triggered}`
 * and `WriteRecord` above is that three-member record, carrying NO `attempt` and NO `pending`.
 *
 * **SO THE `pending` MEMBER BELOW IS THE KERNEL'S, CARRIED VERBATIM FROM THE KERNEL'S OWN DECLARATION AND
 * MINTED NOWHERE HERE** (`surface.md` `§2.4` item 9 (f)'s *"no `pending`-shaped record type this unit does
 * not declare"*; `A116` (D4) — *"the carrier `CommitRecord.pending` and its two removal rules unchanged"*):
 * it carries THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS this call's write returned, each entry leaving
 * it only by being checked off as it passes (`kernel-surface.md §2.1` item 2).
 *
 * **`triggered` and `pending` are the store's own returned handle set and the kernel's own member
 * respectively, each read as a SET** (`§2.1` item 2; `Handle` above is this file's opaque-handle spelling);
 * **`op` is the op the store's write returned, VERBATIM** (`JournalOp` above, the store's own eight-member
 * record — `§2.1` item 2: *"the op the store's write returned, VERBATIM"*).
 */
export interface CommitRecord {
  /** The attempt this commit opened — its identity (`attempt-lifecycle.md §2.4` item 1). */
  readonly attempt: AttemptRef;
  /** The op the store's write returned, VERBATIM (`JournalOp` above; `§2.1` item 2). */
  readonly op: JournalOp;
  /** The store's own `triggered` member, VERBATIM, read as a SET (`§2.1` item 2) — now a PAIR LIST. */
  readonly triggered: readonly TriggerPair[];
  /**
   * **THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS, each entry leaving it only by being checked off as it
   * passes — and now a PAIR list, because `pending` is SEEDED AS A CLONE OF `triggered` and therefore
   * INHERITS ITS SHAPE** (`P: docs/pending.md · P-7`'s `pending` ruling, verbatim: *"Push the pair into
   * pending. Pending is seeded as a clone of triggered."*; `(AA-7)`: *"Pop from set to check off"*;
   * `contract.md §2.4` items 3–4; `PAR-HL-22`, `PAR-HL-39`).
   *
   * **ITS ELEMENT TYPE IS TOTAL — NO BARE HANDLE STANDS IN IT** (`contract.md §2.5` item 2): the bare-handle
   * union the check-off and the discard once carried has no subject under POP, because the checked-off entry
   * is REMOVED rather than carried beside.
   */
  readonly pending: readonly TriggerPair[];
}

/**
 * **THE INSTANCE `storeCreate` RETURNS — THE FOURTEEN OWN MEMBERS READ THROUGH `contract.md §2.7` ITEM 9,
 * `10 + 1 + 1 + 2 = 14` ✓: THE TEN METHODS, `register`, `constraints` AND THE TWO REMOVE MEMBERS
 * `removeListener(handle)` AND `removeConstraint(pair)`.** Each is reached through the
 * factory's own product alone (`package.md §1.3` item 3) — **NO member below is a named export**, because
 * the module namespace carries ONE name, `storeCreate` (`§2.9` item 1's `A127` clause; `11 → 1` ✓).
 *
 * **⟶ AND THE OPENING FIGURE ABOVE WAS *"THE TWELVE OWN MEMBERS OF `surface.md §2.4` item 9 (f)'s clause of
 * 2026-10-18"*, SUPERSEDED HERE 2026-10-19: the operative set is the FOURTEEN of
 * `docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9, the withdrawn `12 → 13` figure not
 * among the readings** (`P: docs/pending.md · (AA-5)`: *"the member set is 14 and the `12 → 13` figure is
 * withdrawn by name"*). **THE BYTES STAND AS THAT PASS'S READING AND ARE READ THROUGH THIS CLAUSE**
 * (`DEF-2026-10-02`: no whole-file rewrite).
 *
 * **THE TEN METHODS ARE THE DECLARED POSITIONS OF `§2.2`, `§2.4`, `§2.10` AND `§2.12` WITH THE LEADING
 * `instance` POSITION DROPPED** (`A127`): `a.read(address, tier?)` is the declared `read`, `a.write(address,
 * tier, value, commit?)` the declared `write`, and so on — **the receiver IS the instance, so the position
 * is not a position and the arity every one of them is judged by is the arity of the method's OWN call.**
 * **`on` and `off` are merged away and are NOT members**: registration is `listen` + `register`, and
 * withdrawal is `unlisten`.
 *
 * **THE STATE IS PRIVATE AND NONE OF THE TWELVE IS A RELEASE VERB** (`surface.md §2.1` (e) item 1; `A74`):
 * the instance's own state is released with the instance and by nothing else — no `dispose()`, no `close()`
 * and no finalizer is declared here. **⟶ AND `"THE TWELVE"` IS THE OPERATIVE FIGURE FROM 2026-10-18: the
 * set read THIRTEEN from 2026-10-17 to that date, and `settle`'s removal brings it BACK TO TWELVE — the ten
 * methods, `register` and `constraints`** (this interface's own clause for the last one below; the file's
 * header carries the member-set mark, the architect's rulings and the two still-refused routes).
 * **⟶ AND `"THE TWELVE"` IS SUPERSEDED IN TURN, 2026-10-19: THE OPERATIVE FIGURE IS `"THE FOURTEEN"` —
 * `10 + 1 + 1 + 2 = 14` ✓, the ten methods, `register`, `constraints` AND the two remove members
 * `removeListener(handle)` and `removeConstraint(pair)`** (`docs/specs/storeroom-held-listener-identity/
 * contract.md §2.7` item 9; the file header's clause of this date names the two members and the arithmetic).
 * **THIS SENTENCE'S ONWARD CLAIM IS UNMOVED AND IS THE POINT OF THE PASS: none of the fourteen is a RELEASE
 * VERB** (`surface.md §2.1` (e) item 1; `A74`) — **the two remove members remove a LISTENER and a
 * CONSTRAINT PAIR, never the instance's own state, and no `dispose()`, `close()` or finalizer stands beside
 * them.**
 */
export interface StoreInstance {
  /**
   * Read a leaf's literal, a branch's assembled value, or the empty address's whole register.
   *
   * **`tier` IS THE READER'S ARITY** (`PAR-JS-6`): absent, ONE token, or an ARRAY of tokens read as an
   * ANY-MATCH set — **so the earlier `tier?: Tier` spelling refused, as a type error, a lawful call
   * spelling a set**.
   *
   * **AND `undefined` AT THIS POSITION IS NOT THE SAME CALL AS NO POSITION AT ALL** (`parameter-semantics.md
   * §2.6`, read with `acceptance.md §4.1` item 7): **a SUPPLIED `undefined` is PRESENT and the store answers
   * `AddressMalformed` for it**, while ONLY the call that spells NO tier folds to absent. **THE DECLARATION
   * CANNOT TELL THE TWO APART** — `tier?: TierSet` admits both spellings, which is why `TierSet` carries no
   * `undefined` member — and the distinction is a RUNTIME one at this member (`a127`'s
   * `read_the_absent_tier_position_is_in_domain`).
   */
  read(address: Address, tier?: TierSet): unknown;
  /** The same read, narrowed to a leaf — a branch answers `ReadTargetIsBranch`; `tier` is `TierSet`, with the same SUPPLIED-`undefined` reading as `read`. */
  readLiteral(address: Address, tier?: TierSet): unknown;
  /**
   * Write `value` at `address` on `tier` — EXACTLY ONE token, never an array (`PAR-JS-7`).
   *
   * **THE DECLARED ORDER IS `write(address, tier, value, commit?)`** (`surface.md §2.2`'s dated clause of
   * 2026-10-15; `parameter-semantics.md §2.20`), read with `§2.4` item 9 (f)'s `A127` clause: **THREE
   * REQUIRED ARGUMENTS AND THE OPTIONAL ONE LAST — the commit, at the FOURTH position of the METHOD**,
   * which is the position the `instance`-leading spelling made FIVE (`A124`).
   *
   * **AN ABSENT `commit` IS IN DOMAIN** (§2.2 clause 3: *"the write opens or joins a commit all the
   * same"*) and **NO DEFAULT RECORD IS FABRICATED FOR IT**; **the admitted form is the kernel's own
   * `CommitRecord`** (`surface.md §2.4` item 9 (g) item 1: an object carrying a `pending` member present
   * and not `undefined`), and **every other form at this position — absent, `undefined`, `null`, a
   * primitive, a function, a `Proxy`, an object whose `pending` member is absent or `undefined` — throws
   * THE CLASS TEST'S OWN `TypeError`, whose `status` member is ABSENT and whose STRING `message` member is
   * REQUIRED** (`surface.md` §2.4 item 9 (g) item 1's discriminator, landed 2026-10-15 on `A116` (D1); the
   * operative predicate is `file-tier-save.test.mjs`'s `positionRefusal`, which asserts exactly those two
   * halves). **A REFUSED POSITION STOPS THE WRITE**: no verb is reached and no byte moves.
   *
   * **⟶ CORRECTED 2026-10-17 — THIS CELL ATTRIBUTED THAT `TypeError` TO *"the registration site's own"*
   * FORM, AND THE ATTRIBUTION WAS FALSE** (`DEF-2026-10-16-Q`; `surface.md` §2.5 item 5 (g), THE OPERATIVE
   * READING). **THE REGISTRATION SITE THROWS NO `TypeError` AT ALL**: its refusal *"IS a rejection under
   * `A76` and travels in THIS section's single form, with its `status` drawn from the store's closed set —
   * the store's own `AddressMalformed`"*, `message` generated as clause (d) declares, so `register`'s
   * outside argument answers a plain `{status, message}` (driven at `register.test.mjs`'s
   * `isRegistrationRefusal`, which counts a `TypeError` as a FAILURE). **A `TypeError` thrown by any
   * STORE-REACHING VERB is itself a FINDING** (`a127-surface.test.mjs`'s
   * `a127_no_store_reaching_verb_throws_the_class_test_form`). The two forms are DIFFERENT forms of
   * DIFFERENT sites, and this position's is the class test's own, declared at `§2.4` item 9 (g) —
   * beside, and not drawn from, the registration site's `§2.4` item 5.
   *
   * **AND A SUPPLIED `undefined` AT THE `tier` POSITION IS PRESENT HERE TOO** (`parameter-semantics.md
   * §2.6`; `PAR-JS-6`): it is not the absent tier and the store answers `AddressMalformed` for it.
   */
  write(address: Address, tier: Tier, value: unknown, commit?: CommitRecord): WriteRecord;
  /**
   * Remove the versions the address names, and answer the operation's record.
   *
   * **THE NAME IS `delete` AND IT IS A METHOD NAME, WHICH IS WHY THIS DECLARATION PARSES**: `delete` is a
   * RESERVED WORD, so under the superseded module-level spelling the function had to be declared as
   * `deleteOp` and re-exported (`export { deleteOp as delete }`). **A METHOD NAME IS NOT AN IDENTIFIER
   * BINDING, so the member is declared under the one name the surface publishes** (`A127`).
   *
   * **⟶ AND THE WORKAROUND THAT SENTENCE DESCRIBES IS HISTORICAL AND NO LONGER EXISTS, 2026-10-19: `deleteOp`
   * HAS BEEN DELETED FROM THE CODEBASE ENTIRELY** — the `P-8` merge removed the module-level spelling, so
   * `grep -n "deleteOp" bindings/js/index.mjs` now returns THAT NAME ONLY INSIDE MOVED-POINTER COMMENTS
   * (the `delete` member's own doc block, whose body was `deleteOp`'s) **and no live binding by that name
   * stands at any site** (`P: docs/pending.md · P-8`; `archive/p8-merge/2026-10-18/blocks/deleteOp.md`).
   * **SO `export { deleteOp as delete }` IS NOT A SHAPE THIS PACKAGE ANY LONGER HAS AND MUST NOT BE READ AS
   * ONE — the module namespace is ONE name, `storeCreate` (`11 → 1` ✓), and `delete` is reached as the
   * instance's own method alone** (`§2.9` item 1's `A127` clause). **THE DECLARATION BELOW IS UNCHANGED AND
   * WAS ALWAYS CORRECT: `delete(address, tier?): DeleteRecord`.**
   */
  delete(address: Address, tier?: Tier): DeleteRecord;
  /**
   * Roll the journal back to `opId`, and answer what the rollback restored.
   *
   * **`opId` IS A NON-EMPTY `string` AND NOT A NUMBER** (`PAR-JS-9`'s own unit: *"the `JournalOp.opId`
   * string"*): a number is an OUTSIDE value the store answers `AddressMalformed` for, and the ordinary
   * call `a.rollback(w.op.opId)`, whose id is the string `write` returned, is a correct call.
   */
  rollback(opId: string): RollbackRecord;

  /**
   * **⟶ AND IT THROWS: `1.1.0`'S DECLARATION, ADDED BESIDE THE SIGNATURE RATHER THAN IN IT.** **`rollback` was
   * TOTAL at `1.0.1` — it answered a `RollbackRecord` and could not fail. It is PARTIAL now**: **a reversal the
   * registered constraints do not admit REFUSES**, throwing the one plain form `{status, message, log}` with
   * `status: 'ConstraintPassRefused'`, **and the store is restored to the state it stood at before the reversal**
   * (`D-38`, `D-40`, `D-41`). **A TypeScript signature has no `throws` clause, so this is the honest place to say
   * it**: *the return type describes what a call returns when it returns, and the throw is part of the contract.*
   * **A lawful reversal is unchanged** — same record, same members, no `log`. **Callers on `1.0.1` must handle it.**
   */
  /**
   * Begin watching the addresses the caller names under the caller's own handle.
   *
   * **⟶ THIS BLOCK'S FEATURE SENTENCE READ *"Begin watching an address, and answer the fresh opaque handle
   * it is keyed by"*, AND BOTH HALVES OF IT ARE SUPERSEDED, 2026-10-19** (`DEF-2026-10-02`: no whole-file
   * rewrite — the bytes stand above and are read through this clause; `docs/specs/storeroom-held-listener-
   * identity/contract.md §2.2` items 1, 2 and 10; `listen-verb.md §1` item 1). **THE CALLER SPELLS THE
   * HANDLE AND `listen` ANSWERS `undefined`** — a DECLARED change of the return shape `Handle → undefined`,
   * forced because returning the supplied handle would be a second spelling of the caller's own datum
   * (`contract.md §2.2` item 10) — and **THE ADDRESS POSITION IS A SET**: position `2` is `addresses`, an
   * ARRAY of addresses with the EMPTY ARRAY in the domain. **(The declaration below already carries both:
   * `listen(handle: Handle, addresses: readonly Address[]): void` — `listen-verb.md §2.2` item 1's arity
   * `2`, with no third position.)**
   *
   * **AND IT IS AN ADDRESS SITE THAT DECLARES ITS ARGUMENT POSITION** (`parameter-semantics.md §2.17`'s
   * dated clause; `surface.md §2.5` item 5 (b)'s position half): the address is `1` of `1`, so a CLASS
   * refusal here — a `Proxy` over an array included — carries `a Proxy` AND `first argument` inside the one
   * failure form's message, and NO trap is run (`NG-JS-I`). **⟶ READ WITH THE CLAUSE ABOVE, the class test
   * this sentence describes is the SET POSITION'S: the six outside classes are `listen-verb.md §2.2` item 2's
   * and the declared answer for every one of them is the surface's one thrown form with the store's
   * `AddressMalformed` (`§2.2` item 3; the position figure `1` of `1` above is the PRE-2026-10-18 reading —
   * position `1` is `1` OF TWO, `listen-verb.md §1` item 1's arity `2`).**
   *
   * **A REPEATED CALL AT A HELD ADDRESS MINTS NOTHING AND ANSWERS THE ADDRESS'S EXISTING ENTRY'S HANDLE**
   * (`write-and-read.md §6.5` item 12 (c); `§0.4` clause 2), so the two calls answer ONE opaque value.
   * **⟶ SUPERSEDED, 2026-10-19: `listen(h, S2)` AFTER `listen(h, S1)` IS SET-ASSIGNMENT AND NOT UNION —
   * `S1` IS PURGED WHOLESALE AND `S2` INSTALLED, with no intermediate state observable — AND THE CALL
   * ANSWERS NOTHING** (`contract.md §2.2` items 3 and 10; `listen-verb.md §3` item 1). **THE SURVIVING HALF
   * IS THE MINTING HALF: the handle is the CALLER'S, so nothing mints one.** (`P: docs/pending.md · (R1)`,
   * verbatim: *"`listen(h, S2)` AFTER `listen(h, S1)` IS SET-ASSIGNMENT, NOT UNION"*.)**
   *
   * **⟶ AMENDED 2026-10-24 (`strata/decisions.md` `D-22`, verbatim: *"Listen should return the handle on
   * success, or error message on fail. Discard the noop prefix"*): `listen` ANSWERS THE HANDLE IT WATCHES
   * UNDER ON SUCCESS — the caller's own spelling, returned as THE IDENTITY THE STORE HOLDS FOR THAT ENTRY —
   * and EVERY FAILURE REMAINS THE SURFACE'S ONE THROWN FORM (`{status, message, log}`), because this ruling
   * mints no second failure channel. THE RETURN IS A SUCCESS SIGNAL THAT CARRIES THE IDENTITY AND NOT AN ECHO
   * TO BE SUPPRESSED**: the ground this block states above — *"returning the supplied handle would be a
   * second spelling of the caller's own datum"* — is OVERRULED BY NAME, and the sentence stands as text read
   * THROUGH this clause (`RCA-8(d)` ANNOTATE-BESIDE; `DEF-2026-10-02`: no whole-file rewrite). **What it is
   * FOR, declared because the return has one consumer:** `K-1` ADOPTS the value, which is what
   * `kernel-surface.md` declared all along (*"adopted, never minted by the kernel"*) and what the discarded
   * `constraint@<JSON address>` prefix had replaced. **A caller that ignores the return is unaffected by
   * widening `void → Handle`.**
   */
  listen(handle: Handle, addresses: readonly Address[]): Handle;
  /**
   * Withdraw a watching, and answer `undefined` — a no-op success for every value outside the domain.
   *
   * **AND THE WITHDRAWAL CARRIES THE PACKAGE'S OWN HALF TOO** (`surface.md §2.4` item 7 (b)'s
   * VALIDATE · UNLISTEN · DEREGISTER step list, MERGED INTO THIS ONE MEMBER by `A127`'s receiver ruling;
   * `contract.md §5.5`'s fourth added entry): **the store-side home entry named by this call is withdrawn,
   * and the registry's entry for the identity is REMOVED where the identity no longer stands anywhere** — so
   * the registered function is unreachable afterwards and a re-`listen` at the withdrawn address answers a
   * DIFFERENT handle. **AT `DD-39`'s CONSTRUCTION DUPLICATE — ONE caller-spelled token naming MORE THAN ONE
   * entry at ONE address — ONE entry is withdrawn per call while the address still holds the identity, and
   * the registry's entry STANDS: a later trigger there STILL returns that identity and the function fires
   * for it ONCE, never once per entry** (`contract.md §5.5`'s third added entry; `§2.4` rule 4's *"never the
   * function"*).
   */
  unlisten(handle: Handle): void;
  /**
   * **THE POST-CREATION ADD ROUTE — `addConstraint(pair, constraint) -> constraint identity`**
   * (`surface.md §2.12` item 2 (a) and item 3's ADD row; `parameter-semantics.md §2.25` = `PAR-JS-25`):
   * **the pair's element IS the supplied `constraint` from this call on, whether the pair was HELD or
   * NOT**, and at a pair already held the supplied constraint OVERWRITES the held one under **THE SAME
   * IDENTITY** the pair was already added under, so the call throws nothing for the mere fact that the
   * pair was held.
   *
   * **Every outside form of either position throws ONE `TypeError`, whose `status` member is ABSENT, and
   * nothing is added, enabled, disabled or otherwise changed.**
   *
   * **⟶ AMENDED 2026-10-24 (`D-25`, verbatim: *"Attempting to overwrite a listener with a constraint or vice
   * versa is rejected"*; `D-29`, verbatim: *"Handle becomes the internal ID"*): THE OVERWRITE IS
   * SAME-KIND ONLY.** The sentence above — *"throws nothing for the mere fact that the pair was held"* — is
   * TRUE AND UNAFFECTED and is now read **SCOPED BY KIND**: a repeated handle of the SAME kind at this act is
   * an overwrite (`D-24`), while **a pair whose `id` equals a LIVE LISTENER'S HANDLE is REJECTED** — it does
   * not overwrite the listener and it does not throw nothing. **The rejection is the surface's one thrown
   * form `{status, message, log}` with the store's `AddressMalformed`**, its `message` naming BOTH SIDES and
   * carrying the shared rule sentence *"a listener and a constraint do not share one"*, and it is taken
   * **after the two positions' class tests and before the held-pair purge and before any store call**, so
   * **no state moves**. `register`'s own direction of the same rule stands at that member (§its own clause).
   */
  addConstraint(pair: ConstraintPair, constraint: Constraint): ConstraintIdentity;
  /** **THE ENABLE HALF** (`§2.12` item 2 (a) and item 3's `constraintOn` row): `undefined`. **The
   *  `constraint` position is REQUIRED and is a NO-OP on every success** — the caller supplies as a function
   *  the identity it holds at that pair, the entry never substitutes one, and it is the element the entry
   *  carried at that pair that is evaluated at the next write. **Idempotent success where the pair already
   *  stands ENABLED.** */
  constraintOn(pair: ConstraintPair, constraint: Constraint): void;
  /** **THE DISABLE HALF** (`§2.12` item 2 (a) and item 3's `constraintOff` row): `undefined`; the pair's
   *  element is NOT evaluated on a subsequent write, and **a write the disabled constraint would have
   *  refused is ACCEPTED**. The `constraint` position's rule is `constraintOn`'s, clause for clause.
   *  **Idempotent success where the pair already stands DISABLED.** */
  constraintOff(pair: ConstraintPair, constraint: Constraint): void;
  /** Register `listener` under the opaque `handle`, and answer `undefined` (`surface.md §2.4` item 5 (b)).
   *
   *  **⟶ AND IT REFUSES WHERE A CONSTRAINT'S `id` STANDS AT THE ADDRESS** (`D-25`'s *"vice versa"*; `D-29`):
   *  the cross-kind rule's register-side direction, in the surface's **own** thrown form
   *  `{status, message, log}` with the store's `AddressMalformed` — **not** the `TypeError` this member's
   *  conflict arm carried while a reserved `constraint@` prefix existed to be exempted — taken after the
   *  handle's domain and registry tests and **before the registry write and before the re-install `listen`**,
   *  so **no state moves**. **The exemption for kernel-prefixed handles is DELETED, not moved**: under `D-22`
   *  the kernel's handle is no longer a reserved spelling and under `D-25` **the kernel registers nothing**, so
   *  nothing needs to get past the test. */
  register(handle: Handle, listener: Listener): void;
  /** **`removeListener(handle) -> undefined`** — the entry removed WHOLE and its store entries withdrawn; every arm that is not a real removal THROWS (`contract.md §2.7` item 2; `PAR-HL-14`, `PAR-HL-15`). */
  removeListener(handle: Handle): void;
  /** **`removeConstraint(pair) -> undefined`** — the pair, its N address rows, the kernel's registration and the store's home entry all gone; it is the ONE act that deletes an identity (`contract.md §2.7` item 3; `PAR-HL-16`, `PAR-HL-17`). */
  removeConstraint(pair: ConstraintPair): void;
  /**
   * **THE REGISTERED-PAIR READ — `constraints() -> ConstraintPair[]`** (`surface.md §2.4` item 9 (f)'s
   * `constraints` clause of 2026-10-17, items 2–9; `§2.12` item 2-bis; `parameter-semantics.md §2.27` =
   * `PAR-JS-27`**) — **one of the FOURTEEN own members, `10 + 1 + 1 + 2 = 14` ✓, the SECOND of the two
   * remaining singles** (`docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9 — the
   * member-set clause of 2026-10-19, which moves the figure `12 → 14`). **⟶ AND THE FIGURE THAT STOOD HERE WAS
   * *"THE TWELVE own members, `10 + 1 + 1 = 12`"*, read from `surface.md §2.4` item 9 (f)'s clause of
   * 2026-10-18, `13 → 12`: THAT READING IS SUPERSEDED — the two remove members `removeListener(handle)` and
   * `removeConstraint(pair)` are the `+ 2`** (`P: docs/pending.md · (AA-5)`, verbatim: *"the member set is 14
   * and the `12 → 13` figure is withdrawn by name"*; `DEF-2026-10-02`: no whole-file rewrite). **AND THIS
   * MEMBER'S OWN SIBLING AMONG THE NON-STORE-REACHING MEMBERS IS `register` ALONE FROM THAT DATE
   * (2026-10-18)**: the sentence that read *"beside `register` and `settle`"* is re-spelled at its own bytes,
   * and this is the operative reading — **and it is NOT read as a count of the fourteen-member set's
   * classes, because no clause of this file asserts which members make up that class** (`contract.md §2.7`
   * items 2–5 for the two new members' own clauses; `§2.7` item 9).
   *
   * **THE RECEIVER IS THE STORE, THE CALL TAKES NO ARGUMENT (arity `0`) AND IT THROWS NOTHING**: there is no
   * outside argument for the class test to refuse, and the call makes NO STORE CALL, MINTS NO CODE, APPENDS
   * NO JOURNAL ENTRY AND CHANGES NO NODE — so this member is one of the product's NON-STORE-REACHING members
   * and `§2.4` item 9 (f)'s rule (ii) has no subject at it.
   *
   * **WHAT IS RETURNED, EXACTLY — THE PAIRS AND NOT THE FUNCTIONS:** a **FRESH JS ARRAY on every call**,
   * whose **every element is a FRESH plain object carrying EXACTLY TWO MEMBERS** — `address` (a fresh array of
   * the store's own segments) and `id` (the constraint's own BARE `id`, a `string`) — the same two data the
   * kernel's own registry is keyed by. **The empty array `[]` is the declared value where the instance carries
   * no pair at all** (`PAR-JS-27`'s `domain` cell).
   *
   * **THE FOUR DECLARED EXCLUSIONS, EACH STATED SO A DECLARATION THAT VIOLATED ONE WOULD BE VISIBLE AT ITS OWN
   * BYTES:**
   * 1. **NO CONSTRAINT FUNCTION IS RETURNED** (item 3, four named grounds — the operative one being the
   *    anti-pattern rulings' *do not hand out a value whose later use the contract cannot bound*). The
   *    `Constraint` type below is that function and **NO MEMBER OF THIS RETURN CARRIES ONE**; a disabled pair
   *    makes the hazard sharp, since `constraintOff` parks a stub in the kernel while the caller's function is
   *    kept in the entry.
   * 2. **NO OPAQUE IDENTITY IS EXPOSED** (item 4): `ConstraintIdentity` is NOT reachable through this return —
   *    `PAR-JS-25`'s opacity would break the moment a consumer read one out of the array. **The pair is the
   *    caller's own datum; the identity is this unit's opaque handle for it, and the two are NOT the same
   *    datum.**
   * 3. **NO ORDER IS PROMISED** (item 6): the returned array's order is **UNDECLARED** and a consumer compares
   *    the pairs **as a SET and never as a sequence** (`DD-22`; `§2.7` item 3). **Nothing in this declaration
   *    may be read as a registration order, an address order or a `seq`-like ordinal.**
   *    **⟶ AND THIS EXCLUSION IS RETIRED, 2026-10-26 (`strata/decisions.md` `D-39`, whose ruling is VERBATIM
   *    *"add deterministic ordering"*; its own record reads: *"`constraints()` must emit in a DECLARED,
   *    deterministic order — registration sequence … The declaration currently says "no order" among its four
   *    exclusions; that exclusion is superseded"*):** **`constraints()` EMITS IN REGISTRATION SEQUENCE — THE
   *    ORDER THE PAIRS WERE REGISTERED — DETERMINISTICALLY AND STABLY ACROSS EVERY CALL AND EVERY INTERVENING
   *    ACT; THE ORDER IS PART OF WHAT THE METHOD PROMISES.** **The bytes above stand as the reading this
   *    exclusion was filed at and are read THROUGH this clause (`RCA-8(g)` ANNOTATE-BESIDE; `DEF-2026-10-02`:
   *    no whole-file rewrite): a consumer MAY now compare the returned array element by element, and the
   *    registration order it reads is the order its own `addConstraint` calls and its `cfg.constraints`
   *    elements stood in.** **NO OTHER EXCLUSION MOVES — items 1, 2 and 4 stand WHOLE — and the member still
   *    answers a FRESH array of FRESH two-member objects on every call.**
   * 4. **A DISABLED PAIR DOES APPEAR** (item 5): `constraintOff` is a TOGGLE and NOT A REMOVAL, so a pair it
   *    disabled is STILL REGISTERED and still enumerated — **and therefore there is NO `enabled` member on an
   *    element and NO way to read a pair's state off this return**; the state is read at the toggles' own
   *    clauses. **No removal route exists**, so an absence here means nothing was ever registered.
   *
   * **THE COVERAGE, BOTH POPULATION ROUTES ON ONE FOOTING** (item 7): a pair the batch registered at
   * `storeCreate` (`cfg.constraints`) and a pair `addConstraint` registered appear alike, because *"the entry
   * carries a pair if and only if a function stands registered at that pair in the kernel's own pair-keyed
   * registry"*. **The two declared exclusions are therefore structural**: a well-formed `cfg.constraints`
   * element that carried no function is **not** a carried pair and does not appear, and a REFUSED
   * registration — at the batch loop or at `addConstraint` — leaves the entry exactly as it stood and does not
   * appear. **An overwrite changes no membership**: a second `addConstraint` at a held pair replaces the
   * function at the SAME pair and returns the SAME identity, so the pair is carried ONCE before and after.
   * **⟶ AMENDED 2026-10-24 (`D-26` item 4; `D-27` item 1): THE BATCH HALF OF THAT EXCLUSION HAS NO PRODUCER
   * AND IS READ THROUGH THIS CLAUSE.** A `cfg.constraints` element **must** carry its function, and the batch
   * **arms** it (`D-27`: *"Functions are armed"*), so *"a well-formed `cfg.constraints` element that carried no
   * function"* is an element the construction now REFUSES under `ConstraintListInvalid` **before any
   * filesystem act** — and the exclusion above stands for **the add route's refused registration alone**, and
   * for a pair whose function was never supplied by any route.
   *
   * **IT ADDS NO POPULATION ROUTE** (`§2.12` item 2-bis): the two routes stand at TWO, and a read closes none
   * and opens none. **It is NOT a `pending()` reader, NOT an `attempts()` enumerator and NOT a live view of a
   * running commit**; it announces no identity, no function and no order.
   *
   * **AND IT MOVES NO OTHER FIGURE**: the module namespace keeps its ONE name `storeCreate` (`§2.9` item 1's
   * `A127` clause, `11 → 1` ✓), the kernel's extent stays FIVE with no `K-6` proposed (`§2.4` item 9 (f),
   * item 8 — the pairs are read from the entry's OWN registry, which is keyed exactly as the kernel's is), the
   * store's closed `17`-member set is not reached, the kernel's `KC` set stands closed at `8`, and the register
   * keeps its `8` rows.
   *
   * **It is NOT a named export of this entry** (`package.md §1.3` item 3): it is reached through
   * `storeCreate`'s own product alone.
   */
  constraints(): ConstraintPair[];
}

/**
 * Construct a store at `cfg` and answer its instance.
 *
 * **AN ADDON THAT IS ABSENT, THAT FAILS TO LOAD, OR WHOSE OWN `version` DOES NOT MATCH THIS PACKAGE'S
 * VERSION IS A DECLARED REFUSAL AND NEVER A SILENT FALLBACK** (`docs/specs/storeroom-publish/
 * resolution.md §2`, `§5`): **no instance is returned, no JavaScript store is substituted, and the
 * thrown value is the one `StoreRefusal`.** The load path resolves the scoped platform package for this
 * runtime first, this checkout's own module-relative addon second, and answers the declared absent form
 * when neither yields a loadable artefact.
 */
export function storeCreate(cfg: StoreConfig): StoreInstance;

/**
 * **THE POST-CREATION CONSTRAINT PAIR — `parameter-semantics.md §2.24` (`PAR-JS-24`)**: the key the three
 * constraint methods name — **an `address` inside `§1.5`'s segment array, and an `id` that is a NON-EMPTY
 * `string`** — **and NOT the whole of a batch element**, which is this pair PLUS its constraint function.
 * **Every outside form of the pair throws the three methods' one `TypeError`**, and **a well-formed pair
 * the entry does not carry is outside the two toggles' domain**: it is NOT a third population route.
 *
 * **⟶ AND THIS SHAPE IS ALSO THE ELEMENT OF THE FOURTH MEMBER'S RETURN, ADDED 2026-10-17**
 * (`surface.md §2.4` item 9 (f)'s `constraints` clause; `parameter-semantics.md §2.27` = `PAR-JS-27`,
 * `return-field`): `a.constraints()`'s every element carries **exactly these TWO members and no third** —
 * the `address` a pair was registered under and its bare `id` — **and NEITHER the constraint function nor the
 * opaque identity** (`PAR-JS-25`'s opacity, unmoved). **THE TWO ROLES ARE ONE SHAPE AND NOT TWO**: this is the
 * caller's own datum entering at `addConstraint` (and at `cfg.constraints`' elements, which are this pair
 * PLUS a `constraint`) and coming back out at the read. **`Row 27`'s `alt` cell refuses an `enabled` member on
 * the element**, so no third member is declared here and this interface is left exactly as it stood.
 */
export interface ConstraintPair {
  /**
   * **THE ADDRESS MEMBER'S TYPE MOVES.** At the CREATION act it is a single address (`constraint-identity.md
   * §6`'s pair table: *"and, at the REGISTRATION act, a single address"*); on the READ and at the REMOVAL it
   * is the pair's own SET (`P: docs/pending.md · P-7`'s answer clause: *"1. (one id, N addresses)"*;
   * `contract.md §2.6` item 5; `PAR-HL-13`).
   *
   * **⟶ AND THE CREATION-ACT HALF IS CORRECTED, 2026-10-26 (`strata/decisions.md` `D-38`, verbatim: *"Accept a
   * one-to-many handler/constraint addressing at package surface"*, whose ruling reads *"one id at N addresses
   * is LAWFUL, at every act"*).** **THE CREATION ACT TAKES AN ADDRESS OR A SET OF ADDRESSES (`Address |
   * readonly Address[]` — the type this member already carries), and the single-address reading above is the
   * SUPERSEDED one, read THROUGH this clause (`RCA-8(g)` ANNOTATE-BESIDE; `DEF-2026-10-02`: no whole-file
   * rewrite).** **THE RUNTIME ALREADY ACCEPTS THE PAIR AND UNIONS ITS ADDRESSES**: one call at
   * `{ address: [['a'], ['b']], id: 'c1' }` registers ONE pair at BOTH addresses, and this member's own read
   * answers that one pair carrying both members.
   */
  readonly address: Address | readonly Address[];
  /**
   * **THE PAIR'S `id` — WHICH IS ITS HANDLE, ONE `id` NAMING ONE PAIR, ONE IDENTITY AND ONE HANDLE**
   * (`D-23`/`D-24`, and `D-29`'s *"Handle becomes the internal ID"*, verbatim). **⟶ AND THE SENTENCE THE PAIR
   * HAS CARRIED SINCE 2026-10-17 — *"two pairs at two addresses are TWO pairs"* — IS READ THROUGH THIS
   * CLAUSE: the pair-local reuse of one `id` at two addresses is NO LONGER LAWFUL**, because a handle is
   * INSTANCE-SCOPED and a repeated handle is REJECTED in one supplied list (`cfg.constraints`, `D-27`) and an
   * OVERWRITE at the add route (`D-24`). **THE SHAPE IS UNCHANGED — NO FIELD IS ADDED** (`D-24` item 1).
   *
   * **⟶ AND THE "NO LONGER LAWFUL" HALF OF THAT SENTENCE IS SUPERSEDED, 2026-10-26 (`strata/decisions.md`
   * `D-38`: *"one id at N addresses is LAWFUL, at every act"*; `D-38`'s own record names the superseded reading
   * at its own bytes — *"`index.d.ts` currently says 'the pair-local reuse of one `id` at two addresses is NO
   * LONGER LAWFUL'"* — and rules that *"the declaration moves; no behaviour changes"*).** **WHAT A TYPED
   * CONSUMER NEEDS, IN ONE RULE: ONE `id` NAMES ONE PAIR, A SECOND ADDRESS JOINS IT, AND THE `constraint`
   * IS THE MEMBER AN ADD OVERWRITES.** **So `addConstraint({ address: [['a'], ['b']], id: 'c1' }, f)` answers ONE
   * pair standing at BOTH addresses under ONE identity; a later add at that same `id` naming a further address
   * EXTENDS that one pair's address set (the runtime unions the sets, `D-38`'s two-call arm) and REPLACES `f` —
   * the `id` never becomes a second pair, and the `constraint` is the only member an add overwrites.** **THE
   * TWO RULES THIS DOES NOT MOVE ARE DIFFERENT RULES FOR DIFFERENT ACTS AND BOTH STAND: within ONE supplied
   * batch list a repeated `id` is REJECTED (`cfg.constraints`, `D-27`), and a pair whose `id` equals a LIVE
   * listener's handle is REJECTED in both directions (`D-25`).** **AND THE SHAPE IS STILL UNCHANGED — NO FIELD
   * IS ADDED** (`D-24` item 1).
   */
  readonly id: string;
}

/**
 * **THE CONSTRAINT FUNCTION — `parameter-semantics.md §2.22` (`PAR-JS-22`)**: a JS function, supplied by THE
 * CALLER at whichever of the three methods it takes — **the ADD route's own argument** or the batch
 * element's own — **invoked by the KERNEL with ONE argument, the attempt's own context** (`PAR-C-16`: *"the
 * attempt context — the constraint's ONE argument"*), and read for its answer (`kernel-surface.md §2.3`
 * item 1: `true` is the only pass value). **Every non-function is outside the position AT EVERY ONE OF THE
 * THREE METHODS**, and a non-function at the toggle's position is refused on the ARGUMENT's ground and
 * never on the pair's.
 */
export type Constraint = (context: unknown) => unknown;

/**
 * **THE CONSTRAINT IDENTITY — `parameter-semantics.md §2.25` (`PAR-JS-25`)**: ONE OPAQUE VALUE THE PACKAGE
 * OWNS, minted once per pair, **equal to itself on a second `addConstraint` at the SAME pair** (the
 * overwrite arm) **and distinguishable from every other pair's**. **No spelling for it is declared, no
 * accessor reaches a member of it, and a consumer compares identities and never contents.**
 */
export type ConstraintIdentity = object;
