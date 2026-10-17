// ============================================================================
//  typecheck/consumer-fixture.ts — THE CONSUMER'S CALLS AGAINST THE SHIPPED
//  DECLARATION, COMPILED (`DEF-2026-10-16-Q`)
// ============================================================================
//
//  WHAT THIS FILE IS. A CONSUMER's source file, checked with `tsc --noEmit`
//  (`npm run typecheck`, `tsconfig.typecheck.json`). It imports the package
//  the way a consumer does, through the PACKAGE SPECIFIER, so the resolution
//  goes through `bindings/js/package.json`'s own `types` routing and never
//  through a relative path into the tree.
//
//  WHAT IT EXERCISES, AND WHY EACH PART CAN FAIL
//  ---------------------------------------------------------------------------
//  · the module's ONE export — `storeCreate`, and NOTHING ELSE (a second named
//    export appearing in the declaration is refused below);
//  · the instance's TWELVE own members, each CALLED at its declared arity and
//    in its declared argument order, with the address / handle / `opId` / pair
//    FIRST;
//  · `write`'s OPTIONAL FOURTH-POSITION `commit`;
//  · the DECLARED RETURN SHAPES, member by member — `WriteRecord.op` is the
//    store's `JournalOp` record (not a number), `RollbackRecord.opId` is a
//    string and `undoneOps` an ARRAY of ids (not counts), `restoredTo` a
//    `BaseState`, `delete`'s record's `tiers` the tier tokens, `listen`'s
//    handle opaque, the constraint triple's `ConstraintIdentity` opaque;
//  · and the calls the declaration must REFUSE, each under `@ts-expect-error`
//    — an unused `@ts-expect-error` is a COMPILE ERROR, so every refusal below
//    is a live assertion and not a comment.
//
//  ==========================================================================
//  WHAT THIS FIXTURE DOES **NOT** ASSERT, AND MUST NEVER BE READ AS ASSERTING
//  ==========================================================================
//  THREE CLAIMS THE DECLARATION'S OWN HEADER ALREADY NAMES AS UNENFORCEABLE
//  (`bindings/js/index.d.ts`, lines 53–73). This fixture does not make them
//  and a green run does not evidence them:
//
//  1. SUPPLIED-VERSUS-OMITTED `undefined` AT THE TIER POSITION (`PAR-JS-6`).
//     `read(addr, undefined)` and `read(addr)` are DIFFERENT calls at runtime —
//     the supplied `undefined` is PRESENT and the store answers
//     `AddressMalformed`, while the call that spells no tier folds to absent —
//     and `tier?: TierSet` admits BOTH spellings identically. Because
//     `TierSet` carries no `undefined` member, the fixture BELOW COMPILES
//     `read([], undefined)` in a commented-out cell and never asserts it: a
//     type cannot separate the two spellings, so asserting either outcome here
//     would be asserting something the type system does not check.
//  2. NON-NEGATIVE-INTEGER ADDRESS SEGMENTS (`PAR-JS-5`).
//     `Address = readonly (string | number)[]` admits `-1`, `1.5`, `NaN` and
//     `Infinity`, every one of which the RUNTIME refuses with the store's own
//     `AddressMalformed`. The fixture therefore uses only in-domain segments
//     and makes NO `@ts-expect-error` demand on the two bad ones: the
//     declaration cannot refuse them and this instrument does not pretend it
//     does.
//  3. THE TWELVE-OWN-MEMBER COUNT (`surface.md §2.4` item 9 (f)'s `A127`
//     clause). An `interface` declares the members a value HAS and constrains no
//     excess member, so a product carrying a THIRTEENTH own member still
//     satisfies `StoreInstance` and a FOURTEENTH name reached off the instance
//     is the only thing this file could refuse. The count is driven at the
//     RUNTIME boundary (`a127-surface.test.mjs`'s `Object.getOwnPropertyNames`
//     cell), which exists precisely because this declaration cannot fail on it.
//     The fixture below names all twelve and refuses the members `A127`
//     MERGED AWAY (`on` / `off` / `manageConstraints`), which is a statement
//     about NAMES, not about the count.
//
//  AND ONE MORE, WHICH IS THE WHOLE LIMIT OF THIS INSTRUMENT:
//  A GREEN `tsc` DOES NOT PROVE THE DECLARATION MATCHES THE RUNTIME. `tsc`
//  reads `index.d.ts` and never loads `index.mjs`, never loads the addon, and
//  never compares a declared signature to an implemented one. If the
//  declaration said `read(address: number)` and the implementation took an
//  array, THIS FILE WOULD COMPILE GREEN (it would simply be rewritten to match
//  the wrong declaration). The runtime's agreement is measured by `npm test`
//  and by the `.mjs` harnesses; this instrument measures the DECLARATION's own
//  internal consistency and the compilability of a consumer's calls.
// ============================================================================
import { storeCreate } from 'provident-storeroom';
import type {
  Address,
  AttemptRef,
  BaseState,
  CommitRecord,
  Constraint,
  ConstraintIdentity,
  ConstraintPair,
  DeleteRecord,
  Handle,
  JournalOp,
  Listener,
  RollbackRecord,
  StoreConfig,
  StoreInstance,
  StoreRefusal,
  StoreStatus,
  Tier,
  TierSet,
  WriteRecord,
} from 'provident-storeroom';

// ---------------------------------------------------------------------------
// THE STORE'S DECLARED CONFIG — the FOUR keys and no fifth, `listeners`
// REQUIRED (an ABSENT `listeners` is the one absence construction refuses).
// ---------------------------------------------------------------------------
const config: StoreConfig = {
  journalLength: 64,
  listeners: [],
  filePath: '/tmp/store-fixture.json',
  constraints: [{ address: ['k'], id: 'c1' }],
};

// ===========================================================================
// 1 · THE MODULE'S ONE EXPORT
// ===========================================================================
// The factory is a function taking a `StoreConfig` and answering a
// `StoreInstance`. Both halves are asserted by USING the answer below.
const store: StoreInstance = storeCreate(config);

// THE ONE EXPORT AND NOTHING ELSE: a consumer that reached for a second module
// name meets an error. (`A127`: the module-level count is `11 → 1`.)
// @ts-expect-error — `read` is a MEMBER of the instance, never a named export
import { read as readExport } from 'provident-storeroom';
// @ts-expect-error — the instance's `storeCreate` IS the module's only export
import { write as writeExport } from 'provident-storeroom';

// ===========================================================================
// 2 · THE TWELVE OWN MEMBERS, EACH CALLED AT ITS DECLARED ARITY AND ORDER
// ===========================================================================
// The address / handle / opId / pair is FIRST in every one of them: the
// receiver is the instance, so NO declared signature carries a leading
// `instance` position (`A127`) — a fixture that passed one would fail below.

// ---- the ten store-reaching methods -------------------------------------
const address: Address = ['users', 0, 'name'];
const tiers: Tier = 'mem';
const tierSet: TierSet = ['mem', 'file'];

const readWhole: unknown = store.read([]);
const readAt: unknown = store.read(address);
const readOneTier: unknown = store.read(address, 'temp');
const readTierSet: unknown = store.read(address, tierSet);

const literal: unknown = store.readLiteral(address, 'file');

const written: WriteRecord = store.write(address, tiers, { name: 'Ada' });
const op: JournalOp = written.op;
const opId: string = op.opId;
const opKind: string = op.kind;
const opAddress: Address = op.address;
const opTier: Tier | null = op.tier;
const opBefore: BaseState = op.before;
const opAfter: BaseState = op.after;
const opSeq: number = op.seq;
const opCompacted: boolean = op.compacted;
const watched: readonly Address[] = written.watched;
const writtenTriggered: readonly Handle[] = written.triggered;

const removed: DeleteRecord = store.delete(address, 'temp');
const removedAddress: Address = removed.address;
const removedTiers: readonly Tier[] = removed.tiers;
const removedTriggered: readonly Handle[] = removed.triggered;

const rolledBack: RollbackRecord = store.rollback(opId);
const rolledBackOpId: string = rolledBack.opId;
const undone: readonly string[] = rolledBack.undoneOps;
const restoredTo: BaseState = rolledBack.restoredTo;
const restoredPresent: boolean = restoredTo.present;
const restoredValue: unknown = restoredTo.value;

const handle: Handle = store.listen(address);
const withdrawn: void = store.unlisten(handle);

// ---- the constraint triple: pair first, constraint second ---------------
const pair: ConstraintPair = { address: ['k'], id: 'c1' };
const constraint: Constraint = (context: unknown): unknown => context !== undefined;
const identity: ConstraintIdentity = store.addConstraint(pair, constraint);
const enabled: void = store.constraintOn(pair, constraint);
const disabled: void = store.constraintOff(pair, constraint);

// ---- the ordering seam and the registration route -----------------------
const listener: Listener = (at: Address): void => {
  void at;
};
const registered: void = store.register(handle, listener);

const attempt: AttemptRef = { id: 'attempt-1' };
const commit: CommitRecord = {
  attempt,
  op,
  triggered: writtenTriggered,
  pending: writtenTriggered,
};
const settled: void = store.settle(commit);

// ===========================================================================
// 3 · `write`'s OPTIONAL FOURTH-POSITION COMMIT
// ===========================================================================
// THREE required arguments and the optional one LAST — the commit at the
// FOURTH position of the METHOD (the `instance`-leading spelling made it five).
const withCommit: WriteRecord = store.write(address, 'file', 1, commit);
const withoutCommit: WriteRecord = store.write(address, 'file', 1);

// ===========================================================================
// 4 · THE CALLS THE DECLARATION MUST REFUSE
// ===========================================================================
// Each `@ts-expect-error` is checked by TypeScript itself: if the line below it
// ever COMPILES, the directive is unused and `npm run typecheck` FAILS.

// ---- the argument ORDER: the address is FIRST, never second -------------
// @ts-expect-error — `read`'s first position is the ADDRESS, not the tier
store.read('mem', address);
// @ts-expect-error — a (tier, address) pair is not the declared order
store.write('mem', address, 1);

// ---- `write`'s tier is EXACTLY ONE token: the array spelling is the
//      reader's arity, and `write` must refuse it ------------------------
// @ts-expect-error — `write` takes `tier: Tier`, never a `TierSet`
store.write(address, tierSet, 1);
// @ts-expect-error — and never `'archive'`, which is outside the three tokens
store.write(address, 'archive', 1);
// `delete` is the writer's arity too.
// @ts-expect-error — `delete`'s tier is one token, never an array
store.delete(address, tierSet);

// ---- `rollback`'s id is a STRING (`PAR-JS-9`), never a number -----------
// @ts-expect-error — the op id `write` returned is a string, never a number
store.rollback(1);

// ---- the seam's record is the kernel's FOUR-member `CommitRecord` -------
// @ts-expect-error — a store `WriteRecord` carries no `attempt` member
store.settle(written);
// @ts-expect-error — and the primitive forms never reach the record position
store.settle(undefined);

// ---- the toggle pair is a PAIR: both positions are required -------------
// @ts-expect-error — `addConstraint` requires the pair AND the constraint
store.addConstraint(pair);
// @ts-expect-error — and a non-function at the constraint position is refused
store.addConstraint(pair, 'not a function');

// ---- `unlisten` takes a HANDLE and answers `void` -----------------------
// NOT REFUSED HERE, AND DELIBERATELY SO: `Handle` is declared `object`, and an
// `Address` is an array, which IS an object — so `store.unlisten(address)`
// COMPILES and this fixture must not claim otherwise. The narrower domain (a
// handle this instance minted) is a RUNTIME rule the store answers as a no-op
// success, not a type rule; `Handle` is opaque BY DECLARATION and this
// instrument checks the OPACITY (a consumer cannot read a member off it, see
// below) rather than the PROVENANCE, which no declared type could express.
const unlistenedWithAddress: void = store.unlisten(address);
void unlistenedWithAddress;
// The opacity IS checkable: no declared member is reachable off a `Handle`.
// @ts-expect-error — a `Handle` declares no members, so none may be read off it
const handleMember: unknown = handle.id;

// ---- the config's FOUR keys and no fifth; `listeners` is REQUIRED ------
// @ts-expect-error — a FIFTH config key is not declared (`PAR-JS-21`)
storeCreate({ journalLength: 8, listeners: [], extra: true });
// @ts-expect-error — `listeners` is REQUIRED: an absent one cannot construct
storeCreate({ journalLength: 8 });
// @ts-expect-error — and `journalLength` is required too (`PAR-JS-3`)
storeCreate({ listeners: [] });

// ---- the members `A127` MERGED AWAY are not on the instance ------------
// @ts-expect-error — `on`/`off` are merged into `listen`/`register`/`unlisten`
store.on(address, listener);
// @ts-expect-error — and there is no `manageConstraints` member
store.manageConstraints(pair, constraint);
// @ts-expect-error — and NO release verb is declared on the instance (`A74`)
store.dispose();

// ---- the record members' DECLARED types, refused when violated ----------
// @ts-expect-error — `undoneOps` is a LIST of ids, not a count
const undoneAsCount: number = rolledBack.undoneOps;
// @ts-expect-error — `op` is the store's journal record, not a number
const opAsNumber: number = written.op;
// @ts-expect-error — `opId` is a string, not a number
const opIdAsNumber: number = rolledBack.opId;

// ---- the failure surface: `{status, message}` and a THIRD member is not
//      part of the declared form ------------------------------------------
declare const refusal: StoreRefusal;
const refusalStatus: StoreStatus = refusal.status;
const refusalMessage: string = refusal.message;
// @ts-expect-error — the failure form carries exactly `{status, message}`
const refusalThird: unknown = refusal.cause;

// ===========================================================================
// 5 · WHAT THIS FILE DELIBERATELY DOES NOT DO
// ===========================================================================
// NOT ASSERTED, BECAUSE THE TYPE SYSTEM CANNOT: the three claims listed in the
// header above. Concretely, and intentionally, this file does NOT write:
//
//     store.read(address, undefined);      // supplied `undefined` is PRESENT
//     store.read(address);                 // no tier at all is ABSENT
//
// as a PAIR with any assertion — `tier?: TierSet` admits both and cannot tell
// them apart. The commented cell below documents the widening and is compiled
// out so no reader mistakes it for a checked guarantee:
//
//     // store.read(address, undefined);   // VALID TYPES, runtime `AddressMalformed`
//     // store.read(address);              // VALID TYPES, runtime absent-tier read
//
// NOR does it write `store.read(['k', -1])` under a `@ts-expect-error`:
// `Address` admits `-1` and the RUNTIME is what refuses it (`PAR-JS-5`).
const widenedAddressSegment: Address = ['k', -1];
const widenedAddressFraction: Address = ['k', 1.5];
void widenedAddressSegment;
void widenedAddressFraction;
//
// NOR does it assert the twelve-member COUNT. It names the twelve (above) and
// refuses the three names `A127` merged away; a thirteenth own member on the
// real product still satisfies `StoreInstance` and is caught by the RUNTIME
// suite (`a127-surface.test.mjs`), not here.

// ---------------------------------------------------------------------------
// Everything bound above is consumed here so that `noUnusedLocals`-style
// strictness in a consumer's own project could not make this fixture pass for
// the wrong reason; the VALUES are irrelevant — the RESOLUTIONS are the point.
// ---------------------------------------------------------------------------
void [
  readWhole, readAt, readOneTier, readTierSet, literal,
  opKind, opAddress, opTier, opBefore, opAfter, opSeq, opCompacted,
  watched, writtenTriggered, removedAddress, removedTiers, removedTriggered,
  rolledBackOpId, restoredPresent, restoredValue, withdrawn,
  identity, enabled, disabled, registered, settled,
  withCommit, withoutCommit,
  undoneAsCount, opAsNumber, opIdAsNumber,
  refusalStatus, refusalMessage, refusalThird,
  readExport, writeExport,
];
