// `provident-storeroom` — **THE AUTHORED TYPE DECLARATION OF THE PUBLISHED NODE ESM BINDING**
// (`docs/specs/storeroom-publish/contract.md §2.4`; `docs/specs/storeroom-publish/distribution.md §5`;
// `PUB-DD-3`; `Q3-4`).
//
// **THIS FILE IS HAND-AUTHORED AND NOT GENERATED** (`§2.4` item 1; `PUB-DD-21`): it carries no generation
// banner, no build-time code generator produces it, and it is the file the package's own `types` field
// reaches and the package's own `files` allowlist ships.
//
// **IT DECLARES THREE THINGS AND NOTHING ELSE** (`distribution.md §5.2`): (1) the EIGHT VERBS of the
// claimed ESM entry, exactly as the sibling directory enumerates them and with NO ninth name; (2) the
// instance's own member set, `{ register, on, off, settle }` — FOUR own members and nothing else
// (`distribution.md §5.2` item 2 read with `surface.md §2.1`'s dated clause (a) and `§2.4` item 9 (f)):
// `register(handle, listener) -> undefined` · `on(address, listener) -> handle` · `off(handle) ->
// undefined` · `settle(record) -> undefined`, each with its argument types and its return, the FOURTH
// being THE ORDERING SEAM the kernel calls and the entry implements, and with NO fifth member and NO
// ninth named export for it; and (3) the failure surface, a thrown plain object with exactly
// `{status, message}`.
//
// **AND THE RECORDS THOSE VERBS ANSWER WITH ARE DECLARED BESIDE THEM, WHICH IS STILL PART (1) AND NOT A
// FOURTH THING**: `Address` · `Tier` · `TierSet` · `StoreConfig` · `BaseState` · `JournalOp` ·
// `WriteRecord` · `DeleteRecord` · `RollbackRecord` · `Handle` · `Listener` are the SHAPES OF THE
// ARGUMENTS AND OF THE ANSWERS, in `DD-39`'s own member spellings (the sibling directory's `contract.md
// §0.2`), and a declaration that did not carry them would declare eight names and no surface. **None of
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
 * set's declared arity is `4`.** **NO OTHER CELL OF THIS FILE MOVES** (`distribution.md §5.2`; the entry's
 * `8` verbs, the addon's `5`, the instance's `4` own members, the kernel's `5` and the store's `8` register
 * rows all stand as printed).
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
 * **THE INSTANCE `storeCreate` RETURNS — `{ register, on, off, settle }`, FOUR OWN MEMBERS AND NOTHING
 * ELSE** (`distribution.md §5.2` item 2 read with `surface.md §2.1`'s dated clause (a) and `§2.4` item 9).
 * **The instance's own state is released with the instance and by nothing else: none of the four is a
 * release verb.**
 */
export interface StoreInstance {
  /** Register `listener` under the opaque `handle`, and answer `undefined`. */
  register(handle: Handle, listener: Listener): void;
  /** Register a listener at `address` and answer the fresh opaque handle it is keyed by. */
  on(address: Address, listener: Listener): Handle;
  /** Withdraw the store-side home entry the `handle` names, and answer `undefined`. */
  off(handle: Handle): void;
  /**
   * **THE ORDERING SEAM — `settle(record) -> undefined`** (`surface.md §2.4` item 9; `A116` (D1)–(D2);
   * `PAR-JS-19`): the one member THE KERNEL CALLS and the entry implements, at the two instants of a
   * kernel-driven write — **the adoption at the first call for a record identity**, taken before the write
   * verb (the write in flight is withheld: the in-window invocation set is empty), **and the delivery at
   * the second call for that identity**, taken at the pass's terminal arm (the residue standing in the
   * record's own `pending` member is delivered through this instance's own registry, one invocation per
   * handle, each with the triggering address as its single argument). **Every other form at the record
   * position — absent, `undefined`, `null`, a primitive, a function, a `Proxy`, an identity this instance
   * never adopted — throws the registration site's own `TypeError` and changes nothing.**
   *
   * **THE RECORD POSITION TAKES THE KERNEL'S OWN `CommitRecord` — `{ attempt, op, triggered, pending }`,
   * FOUR MEMBERS — AND NOT THE STORE'S `WriteRecord`** (`surface.md` `§2.4` item 9 (f)'s *"each with its
   * argument types"* read with item 9's own two-instant table; `PAR-JS-19`'s `supplier` cell; `A116` (D4):
   * *"the carrier `CommitRecord.pending` and its two removal rules unchanged"*). **THE INSTANTS' OWN TABLE
   * NAMES IT: the record is *"the `CommitRecord` `commit` is building"* at instant (a) and *"the SAME record
   * identity"* at instant (b)** (`surface.md` `§2.4` item 9 (a)–(b)). **AND THE STORE'S RECORD IS NOT ONE:
   * `WriteRecord` above is the three-member `{op, watched, triggered}` the `write` verb answers with and
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
 * Read a leaf's literal, a branch's assembled value, or the empty address's whole register.
 *
 * **`tier` IS THE READER'S ARITY** (`PAR-JS-6`): absent, ONE token, or an ARRAY of tokens read as an
 * ANY-MATCH set — **so the shipped `tier?: Tier` refused, as a type error, a lawful call spelling a set**.
 */
export function read(instance: StoreInstance, address: Address, tier?: TierSet): unknown;

/** The same read, narrowed to a leaf — a branch answers `ReadTargetIsBranch`; `tier` is `TierSet`. */
export function readLiteral(instance: StoreInstance, address: Address, tier?: TierSet): unknown;

/**
 * Write `value` at `address` on `tier` — EXACTLY ONE token, never an array (`PAR-JS-7`).
 *
 * **⟶ AMENDED 2026-10-15 (`surface.md §2.2`'s dated clause of 2026-10-15; `parameter-semantics.md §2.20`):
 * THE DECLARED ORDER IS `write(instance, address, tier, value, commit?)`** — **FOUR REQUIRED ARGUMENTS
 * AND THE OPTIONAL ONE AT POSITION FIVE** (`proposal-review.md §22.5` item 5) — and this is the published
 * declaration file `surface.md §2.4` item 9 (f) names.
 *
 * **AN ABSENT `commit` IS IN DOMAIN** (§2.2 clause 3: *"the write opens or joins a commit all the same"*)
 * and **NO DEFAULT RECORD IS FABRICATED FOR IT**; **the admitted form is the kernel's own `CommitRecord`**
 * (`surface.md §2.4` item 9 (g) item 1: an object carrying a `pending` member present and not `undefined`),
 * and **every other form at this position throws the registration site's own `TypeError`**, whose `status`
 * member is ABSENT. **A REFUSED POSITION STOPS THE WRITE**: no verb is reached and no byte moves.
 */
export function write(
  instance: StoreInstance,
  address: Address,
  tier: Tier,
  value: unknown,
  commit?: CommitRecord,
): WriteRecord;

/**
 * Remove the versions the address names, and answer the operation's record.
 *
 * **AND THE NAME IS `delete`, WHICH THIS DECLARATION CANNOT BIND AS AN IDENTIFIER**: `delete` is a RESERVED
 * WORD, so the function is declared as `deleteOp` and EXPORTED under the name the entry publishes —
 * `export { deleteOp as delete }` — exactly as `bindings/js/index.mjs` does on its own side.
 * **`export function delete(…)`, WHICH THE SHIPPED FILE CARRIED, IS NOT A PARSEABLE DECLARATION AT ALL**, so
 * a consumer's compiler read no surface from this file rather than a mis-typed one (`P-PUB-7`; `Q3-4`).
 */
declare function deleteOp(instance: StoreInstance, address: Address, tier?: Tier): DeleteRecord;
export { deleteOp as delete };

/**
 * Roll the journal back to `opId`, and answer what the rollback restored.
 *
 * **`opId` IS A NON-EMPTY `string` AND NOT A NUMBER** (`PAR-JS-9`'s own unit: *"the `JournalOp.opId`
 * string"*): the shipped `opId: number` both mis-declared the domain — a number is an OUTSIDE value the
 * store answers `AddressMalformed` for — and made the ordinary call `rollback(i, w.op.opId)`, whose id is
 * the string `write` returned, a type error.
 */
export function rollback(instance: StoreInstance, opId: string): RollbackRecord;

/** Begin watching an address, and answer the fresh opaque handle it is keyed by. */
export function listen(instance: StoreInstance, address: Address): Handle;

/** Withdraw a watching, and answer `undefined` — a no-op success for every value outside the domain. */
export function unlisten(instance: StoreInstance, handle: Handle): void;
