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
// **AND THE ONE THING THIS DECLARATION MUST NOT CARRY, STATED SO THE FINDING RULE IS CHECKABLE**
// (`distribution.md §5.2` item 4): **it declares NO store type, NO store verb, NO `findAddress`, NO
// release verb and NO constraint or repair seam** — each of those is a declaration the sibling directory
// refuses, and a declaration file carrying one would declare a surface the package does not publish.

/** A position in the register: the address a verb is called at, as a sequence of path segments. */
export type Address = readonly string[];

/** The tier a verb is called at: the store's memory tier or its file tier. */
export type Tier = 'mem' | 'file';

/** The configuration a store is constructed from — the store's three declared keys and no fourth. */
export interface StoreConfig {
  /** The journal's declared length. */
  readonly journalLength: number;
  /** The listeners a construction adopts, if any. */
  readonly listeners?: readonly unknown[];
  /** The file the file tier is backed by, where one is declared. */
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

/** The record a `write` answers: fresh data on every call, never a view of the store's own state. */
export interface WriteRecord {
  readonly op: number;
  readonly watched: readonly Address[];
  readonly triggered: readonly Handle[];
}

/** The record a `delete` answers. */
export interface DeleteRecord {
  readonly address: Address;
  readonly tiers: readonly Tier[];
  readonly triggered: readonly Handle[];
}

/** The record a `rollback` answers. */
export interface RollbackRecord {
  readonly opId: number;
  readonly undoneOps: number;
  readonly restoredTo: number;
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

/** Read a leaf's literal, a branch's assembled value, or the empty address's whole register. */
export function read(instance: StoreInstance, address: Address, tier?: Tier): unknown;

/** The same read, narrowed to a leaf — a branch answers `ReadTargetIsBranch`. */
export function readLiteral(instance: StoreInstance, address: Address, tier?: Tier): unknown;

/** Write `value` at `address` on `tier`, and answer the operation's record. */
export function write(instance: StoreInstance, address: Address, tier: Tier, value: unknown): WriteRecord;

/** Remove the versions the address names, and answer the operation's record. */
export function delete(instance: StoreInstance, address: Address, tier?: Tier): DeleteRecord;

/** Roll the journal back to `opId`, and answer what the rollback restored. */
export function rollback(instance: StoreInstance, opId: number): RollbackRecord;

/** Begin watching an address, and answer the fresh opaque handle it is keyed by. */
export function listen(instance: StoreInstance, address: Address): Handle;

/** Withdraw a watching, and answer `undefined` — a no-op success for every value outside the domain. */
export function unlisten(instance: StoreInstance, handle: Handle): void;
