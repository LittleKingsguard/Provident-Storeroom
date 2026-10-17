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
// set, **TWELVE OWN MEMBERS AND NOTHING ELSE — `10 + 1 + 1 = 12` ✓** (`distribution.md §5.2` item 2 read
// with `surface.md §2.4` item 9 (f)'s `A127` clause): **THE TEN METHODS** `read(address, tier?)` ·
// `readLiteral(address, tier?)` · `write(address, tier, value, commit?)` · `delete(address, tier?)` ·
// `rollback(opId)` · `listen(address)` · `unlisten(handle)` · `addConstraint(pair, constraint)` ·
// `constraintOn(pair, constraint)` · `constraintOff(pair, constraint)`, **PLUS `register(handle, listener)
// -> undefined` and `settle(record) -> undefined`** — the last being THE ORDERING SEAM the kernel calls and
// the entry implements; and (3) the failure surface, a thrown plain object with exactly
// `{status, message}`.
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
// **AND TWO MORE SHAPES STAND BESIDE THOSE ELEVEN WITHOUT A BYTE OF EITHER BEING MINTED HERE, BECAUSE
// `settle`'s ONE ARGUMENT POSITION IS THE KERNEL'S OWN RECORD AND NOT THIS PACKAGE'S** (`§2.4` item 9
// (f)'s *"each with its argument types"* read with its *"no `pending`-shaped record type this unit does
// not declare"*): **`AttemptRef` (`1` member) and `CommitRecord` (`4` members — `attempt` · `op` ·
// `triggered` · `pending`) are THE KERNEL'S OWN NAMED SHAPES, DECLARED BY THE KERNEL AND NOT BY THIS
// UNIT** (`kernel-surface.md §1` item 4's closed record enumeration; its `§2.1` item 2 for the record's
// four members; `attempt-lifecycle.md §2.4` item 1 for the one-member `AttemptRef`) — so the seam's
// argument carries its own `pending` member and this file MINTS NO RECORD TYPE OF ITS OWN to carry it.
// **`AttemptRef` and `CommitRecord` are therefore not STORE types either, and not store records**: they
// are kernel-side shapes the instance's `settle` member takes, cited from their own unit's declaration.
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
//    (`§2.4` item 9 (f)'s `A127` clause; `§2.9` item 1's). An interface declares the members a value HAS
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
   */
  readonly constraints?: readonly { readonly address: Address; readonly id: string }[];
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
  | (string & {});

/**
 * **THE SINGLE FAILURE SURFACE** (`contract.md §1.4`; `distribution.md §5.2` item 3): a THROWN plain
 * object carrying exactly `{status, message}` — never an `Error` subclass, never a returned tagged union,
 * never a `Promise` rejection and never a third member. **The status is carried VERBATIM from the store's
 * own closed set and the message is the store's own generated string**; this package mints neither.
 */
export interface StoreRefusal {
  readonly status: StoreStatus;
  readonly message: string;
}

/** The opaque handle a listener registration is keyed by: the package's own value for one registration. */
export type Handle = object;

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
  readonly triggered: readonly Handle[];
}

/** The record a `delete` answers. */
export interface DeleteRecord {
  readonly address: Address;
  readonly tiers: readonly Tier[];
  readonly triggered: readonly Handle[];
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
 * instance's `settle` member takes (`§2.4` item 9 (f)'s *"each with its argument types"*). **No verb of
 * this entry answers with it and this package mints it nowhere.**
 */
export interface AttemptRef {
  /** The attempt's identity: a non-empty, kernel-unique token. */
  readonly id: string;
}

/**
 * **THE ORDERING SEAM'S ONE ARGUMENT — THE KERNEL'S OWN `{ attempt, op, triggered, pending }` RECORD, AND
 * NOT THE STORE'S `WriteRecord`** (`kernel-surface.md §2.1` item 2's return-shape block: *"`CommitRecord`,
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
  /** The store's own `triggered` member, VERBATIM, read as a SET (`§2.1` item 2). */
  readonly triggered: readonly Handle[];
  /** THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS, each entry leaving it only by being checked off as it passes (`§2.1` item 2). */
  readonly pending: readonly Handle[];
}

/**
 * **THE INSTANCE `storeCreate` RETURNS — THE TWELVE OWN MEMBERS OF `surface.md §2.4` item 9 (f)'s `A127`
 * clause, `10 + 1 + 1 = 12` ✓: THE TEN METHODS, `register` AND `settle`.** Each is reached through the
 * factory's own product alone (`package.md §1.3` item 3) — **NO member below is a named export**, because
 * the module namespace carries ONE name, `storeCreate` (`§2.9` item 1's `A127` clause; `11 → 1` ✓).
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
 * and no finalizer is declared here.
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
   * Begin watching an address, and answer the fresh opaque handle it is keyed by.
   *
   * **AND IT IS AN ADDRESS SITE THAT DECLARES ITS ARGUMENT POSITION** (`parameter-semantics.md §2.17`'s
   * dated clause; `surface.md §2.5` item 5 (b)'s position half): the address is `1` of `1`, so a CLASS
   * refusal here — a `Proxy` over an array included — carries `a Proxy` AND `first argument` inside the one
   * failure form's message, and NO trap is run (`NG-JS-I`).
   *
   * **A REPEATED CALL AT A HELD ADDRESS MINTS NOTHING AND ANSWERS THE ADDRESS'S EXISTING ENTRY'S HANDLE**
   * (`write-and-read.md §6.5` item 12 (c); `§0.4` clause 2), so the two calls answer ONE opaque value.
   */
  listen(address: Address): Handle;
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
  /** Register `listener` under the opaque `handle`, and answer `undefined` (`surface.md §2.4` item 5 (b)). */
  register(handle: Handle, listener: Listener): void;
  /**
   * **THE ORDERING SEAM — `settle(record) -> undefined`** (`surface.md §2.4` item 9; `A116` (D1)–(D2);
   * `PAR-JS-19`): the one member THE KERNEL CALLS and the entry implements, at the two instants of a
   * kernel-driven write — **the adoption at the first call for a record identity**, taken before the write
   * verb (the write in flight is withheld: the in-window invocation set is empty), **and the delivery at
   * the second call for that identity**, taken at the pass's terminal arm (the residue standing in the
   * record's own `pending` member is delivered through this instance's own registry, one invocation per
   * handle, each with the triggering address as its single argument). **Every other form at the record
   * position — absent, `undefined`, `null`, a primitive, a function, a `Proxy`, an identity this instance
   * never adopted — throws THE ORDERING SEAM'S OWN `TypeError`, whose `status` member is ABSENT and whose
   * STRING `message` member is REQUIRED, and changes nothing.**
   *
   * **⟶ CORRECTED 2026-10-17 — THIS CELL ATTRIBUTED THAT `TypeError` TO *"the registration site's own"*
   * FORM AND THAT ATTRIBUTION WAS FALSE** (`DEF-2026-10-16-Q`; `surface.md` §2.5 item 5 (g), the operative
   * reading of the registration site; `§2.4` item 9 (b), landed 2026-10-15 on `A116` (D1), which re-spells
   * the re-spelling this position takes). **THE REGISTRATION SITE ANSWERS A PLAIN `{status, message}` with
   * `status` `AddressMalformed` — a `TypeError` there is a FAILURE** (`register.test.mjs`'s
   * `isRegistrationRefusal`), and **the seam's own form is declared at `§2.4` item 9 (b) and not at item
   * 5**: *"a `TypeError` with its `status` member ABSENT and a STRING `message` member REQUIRED AND NOT
   * FORBIDDEN"* (`§2.5` item 5 (g)'s own record of that re-spelling, whose two dated readings of one
   * phrase it reports and settles by no clause). **SO THE TWO SITES' FORMS ARE NOT ONE FORM, and this
   * member's is the seam's.**
   *
   * **THE RECORD POSITION TAKES THE KERNEL'S OWN `CommitRecord` — `{ attempt, op, triggered, pending }`,
   * FOUR MEMBERS — AND NOT THE STORE'S `WriteRecord`** (`surface.md` `§2.4` item 9 (f)'s *"each with its
   * argument types"* read with item 9's own two-instant table; `PAR-JS-19`'s `supplier` cell; `A116` (D4):
   * *"the carrier `CommitRecord.pending` and its two removal rules unchanged"*). **THE INSTANTS' OWN TABLE
   * NAMES IT: the record is *"the `CommitRecord` `commit` is building"* at instant (a) and *"the SAME record
   * identity"* at instant (b)** (`surface.md` `§2.4` item 9 (a)–(b)). **AND THE STORE'S RECORD IS NOT ONE:
   * `WriteRecord` above is the three-member `{op, watched, triggered}` the `write` member answers with and
   * carries NO `pending` member, `PAR-JS-13` is that record's returned `op` field (`parameter-semantics.md
   * §2.13`) and not the record's own shape, and the kernel's record carries TWO of the store's members
   * VERBATIM beside its own `attempt` identity and its own `pending` member** (`kernel-surface.md §2.1` item
   * 2's *"WHAT IT IS NOT"* clause: *"the `CommitRecord` is the KERNEL'S OWN record and is NOT the store's
   * `WriteResult`"*).
   *
   * **`CommitRecord` IS THE KERNEL'S DECLARED SHAPE AND IS NOT MINTED HERE** (`surface.md` `§2.4` item 9
   * (f) forbids *"a `pending`-shaped record type this unit does not declare"*, and this unit declares none):
   * the type is declared above with the kernel's own four members and cited from its own unit's declaration
   * — `kernel-surface.md §1` item 4's closed record enumeration, `§2.1` item 2 for the record, and
   * `attempt-lifecycle.md §2.4` item 1 for its `AttemptRef` — **and NO named export is added for it or for
   * `settle`.**
   *
   * **It is NOT a named export of this entry** (`package.md §1.3` item 3): it is reached through
   * `storeCreate`'s own product alone.
   */
  settle(record: CommitRecord): void;
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
 */
export interface ConstraintPair {
  readonly address: Address;
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
