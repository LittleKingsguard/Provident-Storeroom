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
// instance's own member set, `{ register, on, off }` — three own members and nothing else; and (3) the
// failure surface, a thrown plain object with exactly `{status, message}`.
//
// **AND THE RECORDS THOSE VERBS ANSWER WITH ARE DECLARED BESIDE THEM, WHICH IS STILL PART (1) AND NOT A
// FOURTH THING**: `Address` · `Tier` · `TierSet` · `StoreConfig` · `BaseState` · `JournalOp` ·
// `WriteRecord` · `DeleteRecord` · `RollbackRecord` · `Handle` · `Listener` are the SHAPES OF THE
// ARGUMENTS AND OF THE ANSWERS, in `DD-39`'s own member spellings (the sibling directory's `contract.md
// §0.2`), and a declaration that did not carry them would declare eight names and no surface. **None of
// them is a STORE type**: no register, no anchor, no tier tree, no journal and no store verb is declared
// here (`§5.2` item 4).
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

/** The configuration a store is constructed from — the store's three declared keys and no fourth. */
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
}

/**
 * **THE STORE'S OWN CLOSED SET OF FAILURE CODES, AS THE TYPE DECLARES IT — A UNION OVER A
 * DECLARED-BUT-OPEN SET** (`contract.md §2.4` item 2; `distribution.md §5.3`; `PUB-DD-3`).
 *
 * **THE FIFTEEN MEMBERS BELOW ARE THE STORE'S OWN, and their membership is the STORE'S to close and
 * never this package's**: this package MINTS NO MEMBER, WIDENS NO SET AND RENAMES NONE
 * (`distribution.md §5.3` item 3).
 *
 * **AND AN UNKNOWN STATUS IS STILL TYPED — THE ESCAPE IS LOAD-BEARING, NOT A LOOSENESS.** The store's set
 * has already moved from fourteen to fifteen members and the store's own park prices a sixteenth, so an
 * immutably-enumerated union would mis-type a LAWFUL refusal the moment the store's set moves
 * (`PUB-DD-3`'s refused alternative). The `(string & {})` arm is what keeps a member the store has added
 * typeable in an installed `0.1.0`, and its absence would be a finding rather than a strictness.
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
 * **THE INSTANCE `storeCreate` RETURNS — `{ register, on, off }`, THREE OWN MEMBERS AND NOTHING ELSE**
 * (`distribution.md §5.2` item 2). **The instance's own state is released with the instance and by nothing
 * else: none of the three is a release verb.**
 */
export interface StoreInstance {
  /** Register `listener` under the opaque `handle`, and answer `undefined`. */
  register(handle: Handle, listener: Listener): void;
  /** Register a listener at `address` and answer the fresh opaque handle it is keyed by. */
  on(address: Address, listener: Listener): Handle;
  /** Withdraw the store-side home entry the `handle` names, and answer `undefined`. */
  off(handle: Handle): void;
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

/** Write `value` at `address` on `tier` — EXACTLY ONE token, never an array (`PAR-JS-7`). */
export function write(instance: StoreInstance, address: Address, tier: Tier, value: unknown): WriteRecord;

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
