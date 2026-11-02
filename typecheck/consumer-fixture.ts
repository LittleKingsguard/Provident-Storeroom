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
//  · the instance's FOURTEEN own members, each CALLED at its declared arity and
//    in its declared argument order, with the address / handle / `opId` / pair
//    FIRST;
//  · `write`'s OPTIONAL FOURTH-POSITION `commit`, whose DECLARED type is the CLASS TEST's own class
//    (`CommitCarrier`, ONE member) since the `Q-1` clause of 2026-11-01;
//  · the REPAIR-OUTCOME TYPES of `docs/L1/repair-outcome-types.md` §5.2 (`D-101`), used as declared and refused
//    where they refuse: the three-arm `ConstraintOutcome`, the two-arm `RepairOutcome` and one end-to-end body,
//    the two contexts' censuses (`AttemptContext`'s five, `RepairContext`'s six,
//    `RegistrationRepairContext`'s seven), the union's `'write' in` narrowing, the registration route's
//    three-position arity driven against a supplied fourth, and the commit position's carrier — section 5 below;
//  · the DECLARED RETURN SHAPES, member by member — `WriteRecord.op` is the
//    store's `JournalOp` record (not a number), `RollbackRecord.opId` is a
//    string and `undoneOps` an ARRAY of ids (not counts), `restoredTo` a
//    `BaseState`, `delete`'s record's `tiers` the tier tokens, `listen`'s
//    answer `void` (the caller spells the identity), the trigger sets the
//    PAIR `{handle, address}` and not a bare handle, the constraint triple's
//    `ConstraintIdentity` opaque;
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
//  3. THE FOURTEEN-OWN-MEMBER COUNT (`surface.md §2.4` item 9 (f)'s clause as
//     moved by `(AA-5)`). An `interface` declares the members a value HAS and
//     constrains no excess member, so a product carrying a FIFTEENTH own member
//     still satisfies `StoreInstance` and a name reached off the instance that
//     the interface does not declare is the only thing this file could refuse.
//     The count is driven at the RUNTIME boundary (`a127-surface.test.mjs`'s
//     `Object.getOwnPropertyNames` cell), which exists precisely because this
//     declaration cannot fail on it. The fixture below names all fourteen and
//     refuses the members `A127` MERGED AWAY (`on` / `off` /
//     `manageConstraints`) and the member later REMOVED (`settle`), which is a
//     statement about NAMES, not about the count.
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
  AttemptContext,
  AttemptRef,
  BaseState,
  CommitCarrier,
  CommitRecord,
  Constraint,
  ConstraintIdentity,
  ConstraintOutcome,
  ConstraintPair,
  DeleteRecord,
  Handle,
  JournalOp,
  Listener,
  RegistrationRepairContext,
  RepairContext,
  RepairOutcome,
  RollbackRecord,
  StoreConfig,
  StoreInstance,
  StoreRefusal,
  StoreStatus,
  Tier,
  TierSet,
  TriggerPair,
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
  // THE ELEMENT IS THREE MEMBERS AND ITS `constraint` IS REQUIRED (`D-26`): the pair is the
  // element's ADDRESSING and the function is its SUBSTANCE. The function is captured
  // JS-side and never crosses; the package arms it at construction.
  constraints: [
    {
      address: ['k'],
      id: 'c1',
      // **⟶ RE-DERIVED 2026-11-01** (`docs/L1/repair-outcome-types.md` §5.1; `strata/decisions.md` · `D-101`
      // (1)): the member is `Constraint`, so the ANSWER is `ConstraintOutcome` and this body returns one of the
      // closed set's arms — `true` (the only pass value) or a `{ message }` arm — never a widened `boolean`.
      // **The PARAMETER keeps this fixture's own spelling `context: unknown`, which stays LAWFUL**: a
      // parameter accepting `unknown` accepts an `AttemptContext`, and the body's own narrowing is its business.
      constraint: (context: unknown): ConstraintOutcome => {
        if (context === undefined) return { message: 'the constraint was handed no context' };
        return true;
      },
    },
  ],
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
// 2 · THE FOURTEEN OWN MEMBERS, EACH CALLED AT ITS DECLARED ARITY AND ORDER
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
// `triggered` IS THE PAIR, NOT A BARE HANDLE (`contract.md §2.4` item 1;
// `trigger-and-pair.md §1`): the pair REPLACES the handle list it supersedes.
const writtenTriggered: readonly TriggerPair[] = written.triggered;

const removed: DeleteRecord = store.delete(address, 'temp');
const removedAddress: Address = removed.address;
const removedTiers: readonly Tier[] = removed.tiers;
const removedTriggered: readonly TriggerPair[] = removed.triggered;

const rolledBack: RollbackRecord = store.rollback(opId);
const rolledBackOpId: string = rolledBack.opId;
const undone: readonly string[] = rolledBack.undoneOps;
const restoredTo: BaseState = rolledBack.restoredTo;
const restoredPresent: boolean = restoredTo.present;
const restoredValue: unknown = restoredTo.value;

// `listen(handle, addresses)` — TWO positions, the second a SET
// (`contract.md §2.2` item 1; `listen-verb.md §2.2` item 1: the arity moves
// `1 → 2`), and IT ANSWERS THE HANDLE IT WATCHES UNDER ON SUCCESS (`D-22`:
// the return moves `void → Handle`, a success signal that CARRIES the
// identity; failure stays the one thrown form). THE CALLER SPELLS THE
// HANDLE — `Handle` is a `string` (`contract.md §2.1` item 1).
const handle: Handle = 'listener-a';
const listened: Handle = store.listen(handle, [address]);
const withdrawn: void = store.unlisten(handle);

// ---- the constraint triple: pair first, constraint second ---------------
const pair: ConstraintPair = { address: ['k'], id: 'c1' };
// **⟶ RE-DERIVED 2026-11-01** (`docs/L1/repair-outcome-types.md` §5.1; `D-101` (1)): THIS is the cell that
// asserts the `Constraint` line itself. The shipped line is `(context: AttemptContext) => ConstraintOutcome`,
// so the body answers an arm of the CLOSED THREE-ARM SET — `true` or a `{ message }` arm — and a body handing
// back a widened `boolean` (the shape this cell used to spell) is now `TS2322`. The parameter's spelling is
// this fixture's own and stays lawful; the ANSWER is the pass's whole point.
const constraint: Constraint = (context: unknown): ConstraintOutcome => {
  if (context === undefined) return { message: 'the constraint was handed no context' };
  return true;
};
const identity: ConstraintIdentity = store.addConstraint(pair, constraint);
const enabled: void = store.constraintOn(pair, constraint);
const disabled: void = store.constraintOff(pair, constraint);

// ---- the ordering seam and the registration route -----------------------
const listener: Listener = (at: Address): void => {
  void at;
};
const registered: void = store.register(handle, listener);

// ---- the TWO remove members, the set `12 → 14` --------------------------
// `removeListener(handle) -> undefined` and `removeConstraint(pair) ->
// undefined` (`contract.md §2.7` items 1–3; `removal-members.md §2`,
// `§3`), the success return each and NOT a returned discriminant: every arm
// that is not a real removal THROWS (`contract.md §2.7` item 4).
const listenerRemoved: void = store.removeListener(handle);
const constraintRemoved: void = store.removeConstraint(pair);

const attempt: AttemptRef = { id: 'attempt-1' };
// THE KERNEL'S `CommitRecord` KEEPS ITS FOUR MEMBERS AND BOTH LISTS ARE PAIRS
// (`contract.md §2.4` item 8; `trigger-and-pair.md §3` item 3 — `pending` is
// SEEDED AS A CLONE OF `triggered` and therefore inherits its shape).
const commit: CommitRecord = {
  attempt,
  op,
  triggered: writtenTriggered,
  pending: writtenTriggered,
};

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
// THE `settle` MEMBER IS REMOVED WHOLE (`contract.md §1` item 2's clause of
// 2026-10-18; `bindings/js/index.d.ts`'s header: *"no instance declares
// `settle(record) -> undefined` after this date"*), so the name is reached and
// REFUSED here rather than called. The record position it served survives as
// `write`'s own OPTIONAL FOURTH argument, exercised in section 3 above.
// @ts-expect-error — `settle` is REMOVED: no instance carries the member
store.settle(commit);
// @ts-expect-error — and the primitive forms never reach the record position
store.settle(undefined);

// ---- `removeConstraint`'s pair is a PAIR, both members required ---------
// @ts-expect-error — `removeConstraint` requires the pair's `address` and `id`
store.removeConstraint({ address: ['k'] });
// @ts-expect-error — and a bare handle is not a pair (`contract.md §2.7` item 3)
store.removeConstraint(handle);

// ---- the toggle pair is a PAIR: both positions are required -------------
// @ts-expect-error — `addConstraint` requires the pair AND the constraint
store.addConstraint(pair);
// @ts-expect-error — and a non-function at the constraint position is refused
store.addConstraint(pair, 'not a function');

// ---- `unlisten` takes a HANDLE and answers `void` -----------------------
// **⟶ RE-DERIVED 2026-10-18: THE `object` PREMISE IS GONE.** `Handle` MOVED
// `object → string` (`contract.md §2.1` item 1; `P: docs/pending.md · P-6`,
// the rule *"Refuse handles that aren't strings"*), so the earlier cell's
// reason for NOT refusing `unlisten(address)` — *"an `Address` is an array,
// which IS an object"* — is no longer true of the declared type. The former
// PROVENANCE claim (a handle *this instance minted*) is retired with the mint:
// the handle is the CALLER'S STRING and nothing mints it (`§2.1` items 1–3).
// What the declaration still cannot express is the handle's NON-EMPTINESS and
// its presence in the instance's own map, which stay RUNTIME rules
// (`§2.1` items 1, 4) driven by the runtime suite and never claimed here.
// NOT REFUSED, AND DELIBERATELY SO: an `Address` is not a `string`, so
// `store.unlisten(address)` is a TYPE ERROR the declaration already makes — the
// cell below is therefore a REFUSAL and not a compiled call.
// @ts-expect-error — `unlisten`'s position is the caller's `string`, not an `Address`
store.unlisten(address);
// The `string` handle is the declared spelling, and it compiles.
const unlistenedWithHandle: void = store.unlisten(handle);
void unlistenedWithHandle;
// The OPACITY CLAIM LEFT WITH THE WRAPPER: `Handle` is a `string`, so it has
// no declared MEMBER to read — `handle.id` is refused as a property of a
// primitive, which is the same fact spelled the only way a `string` can spell it.
// @ts-expect-error — a `string` carries no `id` member, and `Handle` is a `string`
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
// 5 · THE REPAIR-OUTCOME TYPES, USED AS DECLARED
// ===========================================================================
// `docs/L1/repair-outcome-types.md` §5.2 (2026-11-01; `strata/decisions.md` · `D-101` (1)) — and, for the commit
// position, the declaration's `⟶ ANSWERED` `Q-1` clause of the same date. SIX NAMES ARE DECLARED and this section
// USES EACH ONE: `AttemptContext` · `RepairContext` · `RegistrationRepairContext` · `ConstraintOutcome` ·
// `RepairOutcome` · and the `Q-1` clause's `CommitCarrier`. A name no cell can instantiate is an omission printed
// as a type; every cell below is one a consumer writes.
//
// AND THE LIMITS, SAID HERE SO NO GREEN BELOW IS READ AS THEIR EVIDENCE (the declaration's §5.4): structural typing
// cannot tell an OWN member from an inherited one (so `Object.assign(Object.create({ ok: true }), { op })` is
// admitted here and refused by the kernel's `ownMember` read); it cannot express `message`'s or `id`'s or `opId`'s
// NON-EMPTINESS (`string` admits `''`); it refuses an excess `op` on the failed arm only as a FRESH object literal
// (through a variable the wider shape is admitted); and it carries nothing of the credit ground's four conditions.
// The type names the CARRIER; the credit is prose and a runtime act.

// ---- (i) THE THREE-ARM ANSWER, ASSIGNABLE AS DECLARED -------------------
// `true` is the ONLY pass value; the repairable arm REQUIRES `message` because the kernel reads it first; and the
// unrepairable arm is the `message`-only one. A FOURTH arm is a compile error (below), which is the whole point:
// at run time a value outside the three is read as `{ message }` and never as a fourth thing.
const passArm: ConstraintOutcome = true;
const repairableArm: ConstraintOutcome = {
  message: 'the parent is not a link',
  repair: (context: RepairContext | RegistrationRepairContext): RepairOutcome => {
    void context;
    return { ok: false, message: 'the repair did not land' };
  },
};
const unrepairableArm: ConstraintOutcome = { message: 'the tier is out of domain' };
// THE SAME ANSWER THROUGH THE POSITION (`addConstraint`'s second position IS a `Constraint`): a body written
// inline is contextually typed, so `ctx` is an `AttemptContext` and `ctx.value` the `unknown` that member
// declares — and the answer is still the closed set, never a widened `boolean`.
const identityFromBody: ConstraintIdentity = store.addConstraint(
  pair,
  (ctx) => (ctx.value === 2 ? true : { message: 'refused' }),
);

// ---- (ii) THE REPAIR'S ANSWER, ASSIGNABLE AS DECLARED --------------------
// **⟶ RE-DERIVED 2026-11-01 — `ORC-T1`/`ORC-T2`: `op` IS OPTIONAL ON THE CREDITED ARM, `null` IS ADMITTED, AND
// `void` IS A MEMBER OF THE UNION** (`strata/decisions.md` · `D-105` item `1`; `docs/L1/op-free-repair-credit.md`
// §6.1). **THE SENTENCES THIS CLAUSE SUPERSEDES ARE NAMED RATHER THAN OVERWRITTEN** (`RCA-8(g)` ANNOTATE-BESIDE):
// *"`op` is REQUIRED on the credited arm and ABSENT on the failed one, and `undefined` is not one of the two — so a
// repair answering nothing, or a bare `{ ok: true }`, is a compile error instead of a `ConstraintPassRefused`
// (`ST-F2`'s measured defect)"* — **and after the ruling the two shapes it refused are the two the type must
// ADMIT, because the runtime CREDITS them: `ST-F2` is closed BY CARRIER and not by text.** THE CARRIER, where a
// body does return one, IS STILL THE STORE'S OWN RECORD, reached by indexed access, so no second op carrier
// exists to disagree with it — **and no reader in the kernel reads that `op` at all** (§6.1's printed limit: the
// type declares the shape a consumer SHOULD return and the runtime declines to judge what a consumer DOES return).
const credited: RepairOutcome = { ok: true, op: written.op };
const failed: RepairOutcome = { ok: false, message: 'the write was refused' };
// **`ORC-T1`, CELL ONE — THE BARE `{ ok: true }`: LAWFUL, AND ITS DIRECTIVE RETIRED.** It states `ST-F2`'s defect
// from the type's own side: a body with an opinion and no op is a repair whose edit the kernel credits anyway.
const creditedNoOp: RepairOutcome = { ok: true };
// **`ORC-T1`, CELL TWO — `undefined`: LAWFUL.** This is the natural shape of `repair: () => { … }`, which the
// ruling's own words make the FIRST case (*"A repair that does its write and returns `undefined` … is NOT
// refused"*), and without the union's `void` member it is a compile error.
const creditedNothing: RepairOutcome = undefined;
// **AND `op: null` IS ADMITTED BY THE SAME CLAUSE** (§6.1: the member is INFORMATIONAL, so `DeleteRecord['op']`'s
// declared `null` arm — a `delete` that removed nothing — costs a consumer nothing).
const creditedNullOp: RepairOutcome = { ok: true, op: null };

// ---- (ii-bis) ONE END-TO-END BODY THAT COMPILES -------------------------
// **⟶ RE-DERIVED BY THE `Q-1` CLAUSE, 2026-11-01** (`docs/L1/repair-outcome-types.md` §8's `⟶ ANSWERED`): `write`'s
// commit position is now the class test's own class, `CommitCarrier`, so this cell is THE GUIDE'S OWN
// FOUR-POSITION SPELLING (`docs/guides/package-use.md:1072`–`:1090`) and not the three-position form the
// declaration's §5.2 (ii) measured while the position demanded a `CommitRecord`. A repair passes the record it
// was invoked with; the kernel's class test reads that record's PRESENT, defined `pending` and admits it.
const endToEnd: Constraint = (context: AttemptContext): ConstraintOutcome => {
  if (context.op !== null) return true;
  return {
    message: 'the leaf below the parent must be repaired',
    repair: (rc: RepairContext | RegistrationRepairContext): RepairOutcome => {
      const landed: WriteRecord = store.write(['b'], 'mem', 11, rc);
      return { ok: true, op: landed.op };
    },
  };
};

// ---- (iii) WHAT MUST NOT BE ASSIGNABLE, EACH UNDER `@ts-expect-error` ---
// The declaration's §5.2 (iii) table, row for row, with the code its probe measured. An UNUSED directive is
// itself a compile error, so each cell below is a live assertion: the type really does refuse it. (The table's
// EIGHTH row — `op` as a `number` — already stands at section 4, `const opAsNumber`, and stays used there.)
//
// **⟶ AND THE TWO DIRECTIVES THAT STOOD HERE ARE RETIRED BY `ORC-T1`, 2026-11-01** (`D-105`;
// `docs/L1/op-free-repair-credit.md` §6.1): `refusedNoOp` (`{ ok: true }`) and `refusedUndefined` (`undefined`)
// were **LAWFUL ASSIGNMENTS** from the ruling's own date — the credit is the failing pair's mark and the returned
// `op` is read by nothing — so each became a `TS2578` (an UNUSED directive) and each is now the positive cell
// `creditedNoOp`/`creditedNothing` above. **THE LOSS IS NAMED: the alias no longer refuses the one shape `ST-F2`
// was about, and that is the point of the ruling rather than a regression** (§6.1's *"the type stops refusing the
// one shape `ST-F2` was about. That is the point of the ruling and not a loss"*).
// @ts-expect-error — `TS2740`: THE BARE RECEIPT IS NOT THE OP — a `WriteRecord` is not a `WriteRecord['op']`
const refusedReceiptAsOp: RepairOutcome = { ok: true, op: written };
// @ts-expect-error — `TS2322`: no `message`, so the repair is NEVER SEEN — a REAL refusal and not a mere excess-property one: it holds THROUGH A VARIABLE too (§5.2 (iii) row `d`)
const refusedRepairOnly: ConstraintOutcome = { repair: () => credited };
// @ts-expect-error — `TS2322`: the closed set has no string arm, and an outside value is read as `{ message }`
const refusedString: ConstraintOutcome = 'pass';
// @ts-expect-error — `TS2322`: THE WIDENED `boolean` — the shape a consumer's existing body hands back
const refusedWidenedBoolean: ConstraintOutcome = true as boolean;
// @ts-expect-error — `TS2353`: `op` is ABSENT on the failed arm; and this refusal is the EXCESS-PROPERTY check, FRESH-LITERAL ONLY — a variable carrying `op` is ADMITTED, which the type cannot prevent (§5.4 item 4)
const refusedExcessOp: RepairOutcome = { ok: false, message: 'x', op: written.op };

// ---- (iv) THE `op`'s OWN MEMBERS, THROUGH THE CREDITED ARM --------------
// The declaration's §3: the alias expresses `opId` and `seq` by NAMING the store's record, and a consumer holds
// that only where a compiler can. The credited arm is narrowed by its `ok` discriminant.
//
// **⟶ AND `ORC-T2`, 2026-11-01: THE `op` IS OPTIONAL AND ADMITS `null`, SO A CONSUMER READS IT ONLY AFTER
// NARROWING IT** (`docs/L1/op-free-repair-credit.md` §6.1's second table row: *"a consumer who annotated a value
// as `RepairOutcome` and reads `.op` must now narrow — the declared break, and the reason the release class is
// `MINOR`"*). **THE BYTES THIS CLAUSE RE-DERIVES READ `credited.op.opId` DIRECTLY AND ARE NOW `TS18049`** — two
// errors at `:449`/`:450` on the pre-fix head — so the narrowing is a member test on the value itself and the
// reading stands behind it. The declaration's §3's own subject (the alias EXPRESSES `opId` and `seq` by naming
// the store's record, so no second op carrier is minted) is unmoved: what moved is only the gate a consumer's
// own read must pass.
if (credited.ok && credited.op !== undefined && credited.op !== null) {
  const creditedOpId: string = credited.op.opId;
  const creditedSeq: number = credited.op.seq;
  void creditedOpId;
  void creditedSeq;
}
// **AND THE GATE HAS A NEGATIVE SIDE, ASSERTED SO THE NARROWING IS NOT A TAUTOLOGY**: read WITHOUT it, the
// credited arm's `op` is `WriteRecord['op'] | null | undefined`, so the direct member read the pre-fix head
// carried is exactly the `TS18049` this clause exists for.
// @ts-expect-error — `TS18049`: `op` is possibly `null` or `undefined` until the gate above narrows it
const creditedOpIdUngated: string = credited.ok ? credited.op.opId : '';

// ---- (iv-a) `AttemptContext` — FIVE MEMBERS, AND NO SIXTH AT ANY INSTANT -
declare const ctx: AttemptContext;
const ctxAddress: Address = ctx.address;
const ctxAttempt: AttemptRef | null = ctx.attempt;
const ctxOp: JournalOp | null = ctx.op;
const ctxTier: Tier | null = ctx.tier;
const ctxValue: unknown = ctx.value;
// @ts-expect-error — the constraint's record gains NO member at any instant: no `pending` (`D-92` (1))
const ctxPending: unknown = ctx.pending;
// @ts-expect-error — and no `write` route: the seventh member is the registration's, on the repair's record
const ctxWrite: unknown = ctx.write;

// ---- (iv-b) `RepairContext` — SIX MEMBERS, AND `write` IS NOT ONE OF THEM -
declare const rc: RepairContext;
const rcAddress: Address = rc.address;
const rcId: string = rc.id;
const rcOp: JournalOp | null = rc.op;
const rcTier: Tier | null = rc.tier;
const rcValue: unknown = rc.value;
const rcPending: readonly TriggerPair[] = rc.pending;
// @ts-expect-error — `write` is the REGISTRATION's seventh member: without narrowing, the six carry no route
const rcWrite: unknown = rc.write(address, 'mem', 1);

// ---- (iv-c) THE UNION'S ONE DISCRIMINATOR IS `'write' in` ---------------
// `typeof u.write === 'function'` is NOT a guard a consumer can write: the member read is `TS2339` BEFORE the test,
// so the `in` operator is the only discriminator the two-instant union offers (both spellings measured).
declare const atEitherInstant: RepairContext | RegistrationRepairContext;
// @ts-expect-error — the member cannot be READ to be tested, so no `typeof` guard exists for this union
const unionTypeofTest: unknown = typeof atEitherInstant.write;
if ('write' in atEitherInstant) {
  const routeThroughNarrowing: WriteRecord = atEitherInstant.write(address, 'mem', 1);
  void routeThroughNarrowing;
}

// ---- (iv-d) `RegistrationRepairContext` — SEVEN, AND THE ROUTE IS THREE -
// A `declare const`, and NOT an annotated repair body: see the finding below the route's two cells.
declare const registrationRecord: RegistrationRepairContext;
const routeLanded: WriteRecord = registrationRecord.write(address, 'mem', 1);
void routeLanded;
// @ts-expect-error — a SUPPLIED FOURTH is refused BEFORE any store act (`kernel-registration.mjs:494`–`:500`; `D-91` (2)): `TS2554`, the runtime's own arity refusal as a compile error
const routeRefusesFourth: unknown = registrationRecord.write(address, 'mem', 1, commit);
// THE FINDING THIS PAIR CARRIES, PRINTED RATHER THAN DISCOVERED: a repair body ANNOTATED with the SEVEN-member alias
// is REFUSED (`TS2322`) — the position's parameter is the UNION `RepairContext | RegistrationRepairContext` and
// the seven-member alias is the narrower one — so the lawful spellings are the six-member alias, the union
// narrowed with `'write' in`, or no annotation at all. It is a price of the declaration's §2 choice `C`.
const sevenMemberAnnotation: ConstraintOutcome = {
  message: 'the seven-member alias is not a body annotation',
  // @ts-expect-error — `TS2322`: the union is not assignable to the SEVEN-member parameter
  repair: (narrow: RegistrationRepairContext): RepairOutcome => ({ ok: false, message: narrow.id }),
};

// ---- (iv-e) THE SEVENTH MEMBER IS NOT OPTIONAL WHERE THE ALIAS IS NAMED -
// @ts-expect-error — `TS2741`: the six without the route are NOT a `RegistrationRepairContext`
const sixOnly: RegistrationRepairContext = {
  address,
  id: 'c1',
  op,
  tier: 'mem',
  value: 1,
  pending: writtenTriggered,
};

// ---- AND THE COMMIT POSITION'S OWN CLASS TEST (`Q-1`, 2026-11-01) --------
// `write`'s fourth position is `commit?: CommitCarrier`: ONE member, `pending`, spelled exactly as
// `CommitRecord.pending` spells it. THE KERNEL READS A MEMBER'S PRESENCE AND NEVER ITS MEMBER COUNT, so a FRESH
// carrier, the store's own record AND the repair's own record are all carriers — which is why the guide's
// four-position spelling now type-checks. What the type cannot see (an INHERITED `pending`, a `Proxy`, a supplied
// `undefined` at the optional position) is the class test's, at run time, and stays prose.
const carrier: CommitCarrier = { pending: writtenTriggered };
const withCarrier: WriteRecord = store.write(address, 'file', 1, carrier);
const withFreshCarrier: WriteRecord = store.write(address, 'file', 1, { pending: [] });
const withRepairRecord: WriteRecord = store.write(address, 'file', 1, rc);
void withCarrier;
void withFreshCarrier;
void withRepairRecord;
// @ts-expect-error — `null` is outside the class test's domain (`delivery.mjs:28` refuses it before any read)
const carrierNull: WriteRecord = store.write(address, 'file', 1, null);
// @ts-expect-error — a supplied `pending: undefined` is not a `readonly TriggerPair[]` (`delivery.mjs:39` refuses it)
const carrierUndefinedPending: WriteRecord = store.write(address, 'file', 1, { pending: undefined });
// @ts-expect-error — a fresh carrier carrying NO `pending` is refused: `pending` is this class's whole member set
const carrierWithoutPending: WriteRecord = store.write(address, 'file', 1, { attempt: null });

// ===========================================================================
// 6 · WHAT THIS FILE DELIBERATELY DOES NOT DO
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
// NOR does it assert the fourteen-member COUNT. It names the fourteen (above),
// refuses the three names `A127` merged away and the removed `settle`; a
// fifteenth own member on the real product still satisfies `StoreInstance` and
// is caught by the RUNTIME suite (`a127-surface.test.mjs`), not here.
//
// AND THE REPAIR-OUTCOME TYPES' FIVE UNENFORCEABLE CLAIMS ARE LISTED AT SECTION 5'S OWN HEAD, not here: the
// own-member reads, `message`'s and `id`'s non-emptiness, the excess-`op` arm a VARIABLE admits, and the credit
// ground's four conditions (`docs/L1/repair-outcome-types.md` §5.4). No cell below demands any of them.

// ---------------------------------------------------------------------------
// Everything bound above is consumed here so that `noUnusedLocals`-style
// strictness in a consumer's own project could not make this fixture pass for
// the wrong reason; the VALUES are irrelevant — the RESOLUTIONS are the point.
// ---------------------------------------------------------------------------
void [
  readWhole, readAt, readOneTier, readTierSet, literal,
  opKind, opAddress, opTier, opBefore, opAfter, opSeq, opCompacted,
  watched, writtenTriggered, removedAddress, removedTiers, removedTriggered,
  rolledBackOpId, restoredPresent, restoredValue, listened, withdrawn,
  identity, enabled, disabled, registered,
  listenerRemoved, constraintRemoved,
  withCommit, withoutCommit,
  undoneAsCount, opAsNumber, opIdAsNumber,
  refusalStatus, refusalMessage, refusalThird,
  readExport, writeExport,
  passArm, repairableArm, unrepairableArm, identityFromBody,
  credited, failed, endToEnd,
  // **⟶ RE-DERIVED 2026-11-01 — `ORC-T1`/`ORC-T2`** (`D-105`; `docs/L1/op-free-repair-credit.md` §6.1): the two
  // retired directives' variables are GONE and the three POSITIVE cells that replaced them are consumed here —
  // `creditedNoOp` (`{ok: true}`), `creditedNothing` (`undefined`) and `creditedNullOp` (`op: null`) — beside the
  // narrowed `op` reading (consumed at its own `void`s inside the gate) and its negative side
  // (`creditedOpIdUngated`), so no
  // binding of this section can pass for want of a reader.
  creditedNoOp, creditedNothing, creditedNullOp, creditedOpIdUngated,
  refusedReceiptAsOp, refusedRepairOnly,
  refusedString, refusedWidenedBoolean, refusedExcessOp,
  ctxAddress, ctxAttempt, ctxOp, ctxTier, ctxValue, ctxPending, ctxWrite,
  rcAddress, rcId, rcOp, rcTier, rcValue, rcPending, rcWrite,
  unionTypeofTest, routeLanded, routeRefusesFourth, sevenMemberAnnotation, sixOnly,
  carrier, withCarrier, withFreshCarrier, withRepairRecord,
  carrierNull, carrierUndefinedPending, carrierWithoutPending,
];
