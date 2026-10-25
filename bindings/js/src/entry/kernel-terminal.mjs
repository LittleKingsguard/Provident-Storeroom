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
 * `composition-and-states.md §2.6` ITEM 2, ITEM 5 (a) AND ITEM 8 (iii) — THE PER-OP ROLLBACK COMPOSITION.
 *
 * THE CALL LIST IS ITEM 2'S OWN ON BOTH ARMS — `A111`'s RE-SPELLING, WHICH SUPERSEDES BY NAME THE
 * SINGLE-OP READING OF ITEM 8 (iii)'S *"THE ATTEMPT'S FIRST OP ALONE"* SENTENCE — AND THE KERNEL ISSUES
 * ONE CALL PER STILL-OWED OP: THE NUMBER OF CALLS ISSUED IS THE NUMBER OF STEPS RECORDED (item 5 (a)
 * (i), item 3).
 *
 * (1) THE ORDER (item 2, declared by the kernel and by nothing store-side): **the repaired ops
 *     first, in REVERSE of the order they were created, and the attempt's first write's op LAST** —
 *     "so the composition is `ops` minus its first entry, reversed, then that first entry last, and the
 *     order is TOTAL over `ops`". SO THE CALL LIST'S FIRST CALL IS THE LIST'S LAST ENTRY — THE ATTEMPT'S
 *     OWN FIRST OP. AND WHERE THE `checkpoint` MEMBER NAMES AN OP THE LIST IS FIXED AT COMPOSITION TIME
 *     AS `ops` UP TO AND EXCLUDING THAT OP, REVERSED; THE STOP OP IS NEVER PASSED, because no call is
 *     issued over the `checkpoint` op or over anything at or before it (item 4's reach/stop clause,
 *     item 5 (b)) — and the `checkpoint` op is not a member of the list, not an op the walk re-shapes it
 *     against.
 *
 * (2) AN OP AN EARLIER RETURNED CALL'S OWN `undoneOps` MEMBER ALREADY REPORTS UNDONE IS NOT A STILL-OWED
 *     OP: the kernel ISSUES NO CALL over it and records NO step for it (item 5 (a)'s skip clause and its
 *     `VF-10` bullet, whose worked case is the live run's own `E2E-C-2.7`, where the second call over an
 *     op the first call had already reversed was answered `RollbackCompacted` and left the address's
 *     entry standing). THE PREDICATE IS THE STORE'S OWN MEMBER AND NEVER AN INFERENCE ABOUT WHAT A LATER
 *     CALL WOULD DO, and `performed` holds it: the `opId`s EARLIER RETURNED CALLS REPEATED — a THROWING
 *     call undoes nothing (`undoneOps: []`), so it can never put an op on that list. THE STEP COUNT IS
 *     THEREFORE THE CALLS ISSUED AND MAY RUN BELOW THE LIST'S SIZE.
 *
 * SO THE WALK NEVER STOPS SHORT OF AN OP IT STILL OWES: `failed` is THAT CALL'S OWN ANSWER (`true` iff
 * it threw), a `true` step carries no claim that the walk stopped, and an op the walk never reached
 * carries no step at all because no call was issued over it.
 *
 * THE ONE MEMBER THE STORE'S OWN REPORT IS READ FOR BESIDE THE SKIP IS THE FLOOR (`item 5 (b)`): an op
 * the composition STILL OWES — one whose `opId` stands in NO earlier step's `undoneOps` member — whose
 * call fails either floor code is `KC-8`. `KC-8` is answered in the attempt's ONE `outcome` entry,
 * naming the store's own code, and the composition STOPS at that failing call: no call is issued over an
 * op after it (item 6 (a); `fail-surface.md §2`'s `KC-8` row).
 *
 * EACH STEP'S MEMBERS ARE THE STORE'S OWN (`§2.6` item 3): `answer` is THE LITERAL `'ok'` where the call
 * RETURNED and THE STORE'S OWN CODE where it THREW; `undoneOps` is the store's own report of the
 * reversals it performed, and `[]` on the throwing arm, where nothing was undone; `restoredTo` is the
 * store's `RollbackResult.restoredTo` on the returning arm and, on the throwing arm, THE STATE THE NAMED
 * OP'S OWN SUBTREE STOOD AT read through the store's own `read` verb — a TWO-MEMBER `BaseState` on BOTH
 * arms; and `checkpoint` is the attempt's ONE value, on every step of the attempt.
 */
function composeRollback(kernel, attempt) {
  // (1) THE CALL LIST, FIXED WHEN THE COMPOSITION BEGINS AND IN ITEM 2'S OWN ORDER ON BOTH ARMS: `ops`
  // up to and excluding the `checkpoint` op where the member NAMES one (so the stop op is no member of
  // the list at all), REVERSED — the repaired ops in reverse of their creation and THE FIRST WRITE'S OP
  // LAST. Where the member is `null` the list is the whole of `ops` under that same order.
  const callList = [];
  for (const op of attempt.ops) {
    if (attempt.checkpoint !== null && op.opId === attempt.checkpoint) break;
    appendOwn(callList, op);
  }
  callList.reverse();
  // THE REVERSALS EARLIER RETURNED CALLS PERFORMED — the store's own reports, the only member item 5's
  // "still owes" predicate (and item 5 (a)'s skip) is decided by.
  //
  // ⟶ AND THE PREDICATE IS THE MEMBER ALONE, READ AGAINST THE SET IT NAMES — CORRECTED 2026-10-17, AT THE
  // TEMPORAL-STOP AMENDMENT, AND THE CORRECTION IS NAMED WITH WHAT IT WAS AND WHAT IT IS BECAUSE THIS IS
  // THE ONE KERNEL EDIT THE AMENDMENT OWES. **WHAT IT WAS:** the guard below was
  // `!performed.includes(op.opId)`, which is the same reading ONLY WHILE THE STORE'S PER-OP REACH WAS
  // TOTAL OVER THE WHOLE ADDRESSED SUBTREE — under that reach an op's ABSENCE from every earlier
  // `undoneOps` member proved a call still owed it, because a call's `undoneOps` was the whole of what lay
  // under its own op. **WHAT IT IS:** under the amended scope an entry `E` is in scope iff `op.address` is
  // a prefix of `E.address` **AND** `E.seq` >= the named op's own `seq` (`A: docs/specs/storeroom-native/
  // write-and-read.md §6.4` item 1's `M-5` amendment and item 3's `M-7` amendment, both 2026-10-16;
  // `A: docs/decisions.md` · the architect's rulings *"Add temporal stop to the rollback."* and
  // *"Overshoot is a defect."*), so the store's own walk **STOPS AT THE NAMED OP** — this composition
  // passes ops in reverse creation order, so an op it has already passed is OLDER than every op a later
  // call names, is IN THE ADDRESSED SUBTREE AND OUT OF SCOPE, and the store does NOT report it undone by
  // that later call. The skip's premise is therefore void exactly there, and a still-owed op whose `opId`
  // stands in no earlier `undoneOps` member **GETS ITS OWN CALL.**
  //
  // **THE RULE ABOVE THIS LINE IS UNCHANGED AND SO IS ITS OBSERVABLE — WHICH IS WHAT THE AMENDED CLAUSE
  // DECLARES AT ITS OWN SITE** (`composition-and-states.md §2.6` item 5 (a)'s 2026-10-16 mark: *"a call's
  // totality is TOTAL OVER THE TEMPORALLY BOUNDED SET and never over the whole addressed subtree"*, and
  // *"the kernel still reads only the returned `undoneOps` member and still reasons about no mark"*): the
  // kernel derives NOTHING from a cross-call premise below. The guard reads the step index `i` instead of
  // `op.opId` for the ONE reason the two differ and this file's own work loop needs them to: a composition
  // may in principle receive one `opId` twice (every arm this unit drives holds unique ids), and step `i`
  // is the step a call over the `i`-th member ISSUED — the op's own id is what the store was NAMED, never
  // which member it was. **NO CLAUSE MOVES WITH IT: the step count stays the calls ISSUED, `failed` stays
  // that call's own answer, no mark is consulted and the walk still stops at the failing call.**
  const performed = [];
  const recorded = [];
  let floor = null;
  for (let i = 0; i < callList.length; i += 1) {
    const op = callList[i];
    // (2) THE SKIP: an op an earlier returned call's own `undoneOps` already reports undone is not still
    // owed, so NO call is issued over it and no step stands for it (item 5 (a)) — and under the amended
    // scope that is the WHOLE of it: absence from the member is evidence of nothing beyond the store's own
    // performed set, so an op the member does not name GETS ITS OWN CALL.
    if (recorded.includes(i)) continue;
    let answer = 'ok';
    let failed = false;
    let record = null;
    try {
      record = attempt.store.rollback(op.opId);
    } catch (thrown) {
      failed = true;
      answer = thrown !== null && typeof thrown === 'object' && typeof thrown.status === 'string'
        ? thrown.status
        : 'the call threw';
    }
    if (failed && floor === null && STORE_FLOOR_CODES.includes(answer)) {
      floor = { opId: op.opId, code: answer };
    }
    const undoneOps = record !== null && Array.isArray(record.undoneOps) ? record.undoneOps : [];
    appendOwn(attempt.rollback, {
      opId: op.opId,
      answer,
      failed,
      undoneOps,
      // THE THROWING ARM CANNOT READ A RETURNED `RollbackResult`: the state stands at the NAMED OP's own
      // subtree, read at the store's own verb (item 3).
      restoredTo: record !== null && record.restoredTo !== undefined && record.restoredTo !== null
        ? record.restoredTo
        : baseState(attempt.store, op.address),
      checkpoint: attempt.checkpoint,
    });
    for (const undone of undoneOps) {
      if (!performed.includes(undone)) appendOwn(performed, undone);
      // THE STEPS THAT ARE ALREADY — RECORDED BY THE MEMBER'S OWN NAMES, WHICH IS THE PREDICATE'S ONE
      // SOURCE (`item 5 (a)`, unmoved): an op this member names is one this composition has performed.
      for (let at = i + 1; at < callList.length; at += 1) {
        if (callList[at].opId === undone && !recorded.includes(at)) appendOwn(recorded, at);
      }
    }
    // AND THE WALK STOPS AT THE FAILING CALL: a call that met either floor code is the composition's
    // LAST — "the walk STOPS at the failing call" (`§2.6` item 6 (a); `fail-surface.md §2`'s `KC-8`
    // row), so no call is issued over an op after it and none of those ops carries a step.
    if (floor !== null) break;
  }
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

