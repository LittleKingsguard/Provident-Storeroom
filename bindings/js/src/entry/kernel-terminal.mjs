// `D-13` (`docs/L1/kernel-subdivision.md` §1 part `9e`) — the terminal act, the reference's spellings and the record readers: bytes moved from `bindings/js/src/constraint-kernel.mjs`; no logic changed.
import { KC, STORE_FLOOR_CODES, refuse, kernelFor, append, appendOwn } from './kernel-foundations.mjs';
/**
 * The attempt reference a READER was handed — THE `AttemptRef` RECORD OR ITS `id` STRING AND NOTHING
 * ELSE (`attempt-lifecycle.md §2.4` item 1: "`K-4`/`K-5` accept either the `AttemptRef` record or its
 * `id` string and NOTHING ELSE"; `parameter-semantics.md §2.15`). A `CommitRecord` is NOT an
 * `AttemptRef` — it carries four members, its `attempt` among them — so a reference that is neither of
 * the two declared forms is `null` here and is refused `KC-2` by the caller, never answered out of the
 * live map and never reaching `KC-7`'s subject.
 */
function attemptIdOf(reference) {
  if (typeof reference === 'string') return reference;
  if (reference !== null && typeof reference === 'object' && typeof reference.id === 'string') {
    return reference.id;
  }
  return null;
}

/** `K-3`'S OWN ARGUMENT IS THE `CommitRecord` `K-2` RETURNED (`kernel-surface.md §2.1` item 2), and the
 *  attempt it names is the `AttemptRef` that record carries. */
export function commitAttemptIdOf(commitRecord) {
  if (commitRecord !== null && typeof commitRecord === 'object'
      && commitRecord.attempt !== null && typeof commitRecord.attempt === 'object'
      && typeof commitRecord.attempt.id === 'string') {
    return commitRecord.attempt.id;
  }
  return attemptIdOf(commitRecord);
}

/**
 * THE TERMINAL ACT (`attempt-lifecycle.md §2.4` item 3's terminal-arm clause; item 7;
 * `composition-and-states.md §2.7` item 13): the per-op rollback composition runs FIRST, then the
 * attempt's final record is placed in the closed store.
 *
 * THE THROWN FORM'S `status` AND THE `outcome` ENTRY'S `state` ARE ONE TOKEN, and where a still-owed
 * op's own call meets a compacted base the composition's own answer is `KC-8` — that token being both
 * the arm's and the entry's (`composition-and-states.md §2.6` items 5 (b) and 6 (a), (iv);
 * `fail-surface.md §2`'s `KC-8` row). The CONSTRAINT-body path passes `null` and its entry's `state` is
 * `null`; the repair-body path passes `KC-4`'s token.
 *
 * AND THE ATTEMPT-RECORD ENTRY THE ADDRESS WAS HELD BY IS REMOVED ON EVERY TERMINAL ARM, the standing
 * remainder being THE COMMIT REGISTRY'S OWN ENTRY and never that open `AttemptRecord` entry
 * (`§2.4` item 3's terminal-arm clause; item 8 (i) (3); `contract.md §5.2`'s retain row) — so a fresh
 * `K-2` at that address RETURNS a `CommitRecord` and is never refused `KC-7`, whose own subject is the
 * attempt that IS live.
 */
export function terminal(kernel, attempt, status, message) {
  const floor = composeRollback(kernel, attempt);
  // THE COMPOSITION'S OWN FLOOR, TAKEN OFF THE MEMBER IT WAS DECIDED ON (`composition-and-states.md
  // §2.6` item 5 (b)): a still-owed op's call meeting either floor code makes the arm `KC-8` WHATEVER
  // the pass's own arm was, and nothing is restored (item 6 (a), (c)).
  const finalStatus = floor === null ? status : KC.rollbackFloor;
  const finalMessage = floor === null
    ? message
    : `the per-op rollback met the store's own ${floor.code} at ${floor.opId}`;
  // THE `outcome` ENTRY — appended ONCE, and `state` is THE ARM'S ONE TOKEN: the floor is answered IN THIS
  // SAME ENTRY where the attempt would also have had a failure arm, and NO SECOND ENTRY IS APPENDED
  // (`kernel-surface.md §2.5` item 1's kind table; `§2.6` item 6 (a), (b)).
  append(attempt, 'outcome', null, attempt.ops[attempt.ops.length - 1].opId, finalMessage, finalStatus);
  // THE DISCARD RULE, AT ITS ONE OBSERVABLE (`attempt-lifecycle.md §2.4` item 8 (i) (5), read with
  // `kernel-surface.md §2.1` item 2's discarded-set clause; `A: docs/decisions.md` · `A112`): where the
  // attempt's own write FAILED the registered constraints at its landing and could not be repaired, its
  // composition is ROLLED BACK and THE DISCARD ACTS ON THAT WRITE'S OWN RETURNED SET AND REACHES EVERY
  // HANDLE OF IT — no handle of that write being delivered by either layer — WHILE AN ENTRY FOR A HANDLE
  // OF ANY OTHER WRITE STANDS, the whole-member clear being WITHDRAWN BY NAME AS THE SECOND, UNLAWFUL
  // REMOVAL. THE FAILED WRITE'S OWN RETURNED SET IS READ OFF THE WRITE ITSELF (`attempt.write`'s own
  // `triggered`, the record's `triggered` member VERBATIM) AND NEVER DERIVED FROM THE ATTEMPT'S ADDRESS OR FROM THE
  // AUTHOR OF ANY REGISTRATION: the store's own trigger selection is prefix-inclusive, so a handle it
  // returned for a registration at a PREFIX address IS a member of THIS write's returned set and LEAVES
  // with every other handle of it, its pair being one NO pass of this attempt evaluates and no check-off
  // therefore reaching it. An entry for a handle THIS WRITE DID NOT RETURN — which is what "an entry for
  // a handle of any other write" means — STANDS. So this is the ONE
  // REMOVAL PER ARM beside a check-off, and a body already run is never un-run; a PASSING attempt
  // discards nothing (its own removals are the check-offs `releasePending` performs), and the member is
  // NEVER cleared as a whole.
  if (attempt.record !== undefined) {
    // **⟶ AND THE DISCARD'S FILTER IS PAIR-AWARE: IT COMPARES `entry.handle`, NEVER `entry`**
    // (`P: docs/pending.md · P-7`'s `pending` ruling, item (2), verbatim; `contract.md §2.4` item 5;
    // `trigger-and-pair.md §4` item 1 item (ii)). **WITH PAIR ELEMENTS THE AS-BUILT FILTER COMPARED A PAIR TO
    // A HANDLE AND WOULD SILENTLY STOP REMOVING ANYTHING** (`TF-4`). **THE FAILED WRITE'S OWN RETURNED SET IS
    // READ OFF THE WRITE ITSELF, VERBATIM** (`A112`).
    const returnedSet = attempt.write.triggered.map((element) => element.handle);
    attempt.record.pending = attempt.record.pending.filter((entry) => !returnedSet.includes(entry.handle));
  }
  attempt.status = 'closed';
  attempt.throwState = finalStatus;
  attempt.throwMessage = finalMessage;
  attempt.report = {
    attempt: attempt.ref,
    // THE `outcome` MEMBER IS THE ATTEMPT'S OWN TWO-ARM ANSWER — `'passed'` or `'failed'` — and NEVER
    // the arm's `KC` token, which belongs to the thrown form's `status` and to the `outcome` ENTRY's
    // `state` (`PAR-C-5`'s observable: "its terminal record placed with `outcome: 'failed'`"; the two
    // members read the same token string only in `status`/`state`, `fail-surface.md §1.1` item 1 (c)).
    outcome: 'failed',
    ops: attempt.ops.slice(),
    log: attempt.log,
    rollback: attempt.rollback.slice(),
  };
  kernel.closed.set(attempt.ref.id, attempt.report);
  release(kernel, attempt);
}

/**
 * THE ONE REMOVAL EVERY TERMINAL ARM OWES (`attempt-lifecycle.md §2.4` item 3; `composition-and-states.md
 * §2.7` item 13): the attempt's OPEN-RECORD entry — the entry the address was HELD by — is removed, so
 * the address is left FREE and a fresh `K-2` there RETURNS rather than being refused `KC-7`. What is
 * retained is the CLOSED record (`K-4`/`K-5`'s arm) and, behind it, the commit registry's own entry —
 * and NOT this map's.
 */
function release(kernel, attempt) {
  // **⟶ `kernel.held.delete` IS GONE** (`P: docs/pending.md · M-3` item (v), verbatim): **the hold is the live
  // attempt map's own membership now**, so removing the live attempt record IS the release, and the address is
  // left FREE for a fresh `K-2` (`attempt-lifecycle.md §2.4` item 3's terminal-arm clause). **AND THE MAP IS
  // THE INSTANCE'S OWN** (`D-30`): `kernel.live`, the record `kernelFor(store)` created.
  kernel.live.delete(attempt.ref.id);
}

/** The success arm's own bookkeeping, shared with `terminal`'s removal rule. */
export function close(kernel, attempt, outcome) {
  attempt.status = 'closed';
  const report = {
    attempt: attempt.ref,
    outcome,
    ops: attempt.ops.slice(),
    log: attempt.log,
    rollback: [],
  };
  attempt.report = report;
  kernel.closed.set(attempt.ref.id, report);
  release(kernel, attempt);
  return report;
}

/**
 * `composition-and-states.md §2.6` ITEM 2, ITEM 5 (a) AND ITEM 8 (iii) — THE PER-OP ROLLBACK COMPOSITION,
 * TAKEN AS **ONE CALL**.
 *
 * **⟶ ONE CALL OVER THE ATTEMPT'S FIRST OP, AND THE WALK IS GONE — `D-40` (2026-10-26), `strata/decisions.md`
 * · *"A failing repair triggers a rollback like a constraint rejection."* AND ITS IMPLEMENTATION FINDING'S
 * FLOOR LAW IS THE REASON THE WALK COULD NOT STAND.** **The store's own scope is TEMPORALLY FLOORED at the
 * named op's `seq` and ALL-OR-NOTHING at the compacted mark** (`src/store.rs`'s `rollback`: a candidate set of
 * every entry in the addressed subtree at or after the named op's `seq`, then *"the floor is all-or-nothing
 * and undoes NOTHING"* where ANY candidate is compacted — `M-5` item 1's amendment (a) (ii); `M-6`). **SO A
 * NEWEST-FIRST WALK CAN NEVER REACH THE FLOOR ONCE A REPAIR OP EXISTS:** the first call over the repair's op
 * reverses it AND MARKS IT COMPACTED, and the second call — over the write's op, whose candidate set now
 * CONTAINS that compacted entry — is answered `RollbackCompacted` and **undoes nothing**. The measured arm:
 * seed `5`, refused `9`, repair `1`, and the store left holding `9`, the value the constraint REFUSED.
 * **THE ONE CALL OVER THE ATTEMPT'S FIRST OP SWEEPS THE WHOLE ATTEMPT IN ONE STORE ACT** — every op of the
 * attempt stands at or after that op's `seq` — so the attempt's floor is reached, exactly as a plain
 * constraint rejection reaches it with its own single-op composition. **THIS IS ALSO ITEM 2'S OWN LAST CALL**
 * (the repaired ops in reverse of their creation, *"and the attempt's first write's op LAST"*): the walk's
 * last entry is the call that is now the only one, and the calls before it were the ones the floor law had
 * already made unsound. **NO ARM'S OUTCOME IS RE-SHAPED BY THE REDUCTION:** a plain rejection still leaves
 * the pre-attempt state, a repair answering `{ok: false}` still leaves it, and a PASSING repaired write still
 * lands its repaired value and composes nothing.
 *
 * **THE `checkpoint` MEMBER MOVES NO CALL.** Item 1's filter fixes the call list as `ops` up to and excluding
 * the `checkpoint` op, and the list's LAST entry is the attempt's first op whenever the list is non-empty —
 * so the ONE call this composition issues is the one the list's own tail named. **A LIST WHOSE FIRST OP IS THE
 * `checkpoint` OP IS EMPTY AND OWES NO CALL**: an attempt whose first landing left the last valid state has
 * nothing older than that landing to reverse, and no call is issued.
 *
 * **THE STEP IS THE STORE'S OWN REPORT** (`§2.6` item 3): `answer` is THE LITERAL `'ok'` where the call
 * RETURNED and THE STORE'S OWN CODE where it THREW; `undoneOps` is the store's own report of the reversals it
 * performed, and `[]` on the throwing arm, where nothing was undone; `restoredTo` is the store's
 * `RollbackResult.restoredTo` on the returning arm and, on the throwing arm, THE STATE THE NAMED OP'S OWN
 * SUBTREE STOOD AT read through the store's own `read` verb — a TWO-MEMBER `BaseState` on BOTH arms; and
 * `checkpoint` is the attempt's ONE value. **THE COMPOSITION THEREFORE RECORDS ONE STEP WHERE IT ISSUED ONE
 * CALL**, and the report's `rollback` carries the rollback that actually happened.
 *
 * **THE FLOOR (`item 5 (b)`) IS STILL THE STORE'S OWN CODE AND STILL `KC-8`**: a call that throws either floor
 * code is the arm's answer, named in the attempt's ONE `outcome` entry, and nothing is restored (item 6 (a);
 * `fail-surface.md §2`'s `KC-8` row). **THE ARM IS UNMOVED AND IS NO LONGER A CONSEQUENCE OF THE WALK'S ORDER
 * — it is the store's answer to the attempt's own floor call.**
 */
function composeRollback(kernel, attempt) {
  // THE CALL: the attempt's own first op, which every later op of the attempt stands at or after. An attempt
  // with no op at all owes no call, and nor does one whose `checkpoint` op IS its first op — item 1's filter
  // leaves that list empty and the composition records no step for it.
  if (attempt.ops.length === 0) return null;
  const first = attempt.ops[0];
  if (attempt.checkpoint !== null && first.opId === attempt.checkpoint) return null;
  let answer = 'ok';
  let failed = false;
  let record = null;
  try {
    record = attempt.store.rollback(first.opId);
  } catch (thrown) {
    failed = true;
    answer = thrown !== null && typeof thrown === 'object' && typeof thrown.status === 'string'
      ? thrown.status
      : 'the call threw';
  }
  // THE FLOOR, TAKEN OFF THE STORE'S OWN CODE AND OFF NOTHING ELSE (`§2.6` item 5 (b)).
  const floor = failed && STORE_FLOOR_CODES.includes(answer)
    ? { opId: first.opId, code: answer }
    : null;
  const undoneOps = record !== null && Array.isArray(record.undoneOps) ? record.undoneOps : [];
  appendOwn(attempt.rollback, {
    opId: first.opId,
    answer,
    failed,
    undoneOps,
    // THE THROWING ARM CANNOT READ A RETURNED `RollbackResult`: the state stands at the NAMED OP's own
    // subtree, read at the store's own verb (item 3).
    restoredTo: record !== null && record.restoredTo !== undefined && record.restoredTo !== null
      ? record.restoredTo
      : baseState(attempt.store, first.address),
    checkpoint: attempt.checkpoint,
  });
  return floor;
}

/**
 * THE STORE'S OWN BASE STATE AT ONE ADDRESS, READ THROUGH THE STORE'S OWN VERB (`composition-and-states.md
 * §2.6` item 3: the state that address stands at once the call has returned, read through the store's own
 * `read`). BOTH members are always carried: a state that is not present carries `value` as `undefined`,
 * so the two-member shape never depends on the arm the call took.
 */
function baseState(store, address) {
  try {
    return { present: true, value: store.read(address) };
  } catch (refused) {
    // `AddressNotFound` is the store's own arm for an address that stands nowhere: ABSENT, and still
    // the declared two-member `BaseState`.
    return { present: false, value: undefined };
  }
}

// ---------------------------------------------------------------------------------------------
// `K-4` `log(store, attempt) -> LogEntry[]` — the attempt's own log, OPEN or CLOSED alike.
// ---------------------------------------------------------------------------------------------
export function log(store, reference) {
  // **THE READS ARE THE INSTANCE'S OWN** (`D-30`): the reference names an attempt the kernel instance the
  // caller's `store` answers MINTED, and this is the kernel that holds its records — the reader answers "from
  // the record and not from the store instance" (`§2.1` item 4) still, the record being the instance's.
  const kernel = kernelFor(store);
  const id = attemptIdOf(reference);
  const live = kernel.live.get(id);
  if (live !== undefined) return live.log;
  const closed = kernel.closed.get(id);
  if (closed !== undefined) return closed.log;
  refuse(KC.arg, `no constraint attempt answers to ${id}`, []);
}

// ---------------------------------------------------------------------------------------------
// `K-5` `report(store, attempt) -> AttemptReport`
// ---------------------------------------------------------------------------------------------
export function report(store, reference) {
  // **AND `K-5`'S READS ARE THE SAME INSTANCE'S** (`D-30`), taken the one way every item on this surface
  // takes the instance: through `kernelFor`.
  const kernel = kernelFor(store);
  const id = attemptIdOf(reference);
  const live = kernel.live.get(id);
  if (live !== undefined) {
    // `K-5` OVER AN ATTEMPT THAT IS STILL OPEN IS `KC-7` — "which is how a drive reads that the attempt
    // IS live" (`kernel-surface.md §2.1` item 5; `fail-surface.md §2`'s `KC-7` row). THIS IS THE MEMBER
    // THE OPEN ATTEMPT ANSWERS WITH AND NOT `KC-2`: a live record carries no final report at all, so an
    // open record is refused whether the attempt is mid-run or has not yet begun.
    refuse(KC.attemptOpen, `the constraint attempt ${id} is still open`, []);
  }
  const closed = kernel.closed.get(id);
  if (closed !== undefined) return closed;
  // AN UNKNOWN REFERENCE IS KC-2 AND NEVER KC-7 (`kernel-surface.md §2.1` item 5).
  refuse(KC.arg, `no constraint attempt answers to ${id}`, []);
}

