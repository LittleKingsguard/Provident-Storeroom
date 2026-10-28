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
  //
  // **⟶ AND THE SAVE ARM'S OWN TOKEN IS NOT OVERWRITTEN BY IT — `D-53`'s THIRD RULING, 2026-10-28.** **THE FLOOR
  // BELONGS TO THE COMPOSITION AND `KC-8` KEEPS ITS DECLARED MEANING; what it may not do is make a SAVE FAILURE
  // and a CONSTRAINT REFUSAL end at the same token**, which is the contradiction `D-52` measured (*"`KC-8` crosses
  // as both statuses"*). **SO THE PRECEDENCE IS ONE SENTENCE: THE FLOOR GOVERNS EVERY ARM BUT THE SAVE'S, and the
  // save's arm keeps `KC-9`, its own message, and the floor's own sentence beside it** — so the caller can still
  // read, from the ONE `outcome` entry, both what failed and what the composition then met.
  const floorGoverns = floor !== null && status !== KC.saveFailed;
  const finalStatus = floorGoverns ? KC.rollbackFloor : status;
  const finalMessage = floorGoverns
    ? `the per-op rollback met the store's own ${floor.code} at ${floor.opId}`
    : floor === null
      ? message
      : `${message} — the per-op rollback then met the store's own ${floor.code} at ${floor.opId}`;
  // THE `outcome` ENTRY — appended ONCE, and `state` is THE ARM'S ONE TOKEN: the floor is answered IN THIS
  // SAME ENTRY where the attempt would also have had a failure arm, and NO SECOND ENTRY IS APPENDED
  // (`kernel-surface.md §2.5` item 1's kind table; `§2.6` item 6 (a), (b)).
  // **⟶ AND ITS ITERATION NAMES NO PAIR AND THE ATTEMPT'S LAST OP — `D-53`'s first ruling**, so the two columns
  // travel as one identity wherever an op exists and read `null` where one does not ("an `outcome` names them
  // where they exist").
  append(attempt, 'outcome', { pair: null, op: attempt.ops[attempt.ops.length - 1] }, finalMessage, finalStatus);
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
 * **⟶ AND `D-40`'S SPATIAL SCOPE IS CLOSED, 2026-10-26: ONE FLOOR CALL PER DISTINCT ADDRESS THE ATTEMPT'S
 * OWED OPS TOUCHED, AT THAT ADDRESS'S OWN FIRST OWED OP.** **THE MEASURED RESIDUAL THIS CLOSES, SAID AS IT WAS
 * FOUND:** the single call's scope is the ADDRESSED SUBTREE of its named op (`src/store.rs`'s `rollback`: the
 * `is_prefix(&address, &entry.address) && entry.seq >= floor` filter), so a repair that landed at a BESIDE
 * address — an address the named op's subtree does not contain — is in NO candidate set of that call; **the
 * attempt's own address is restored and the beside address's value STANDS**, and the ruling's sentence *"a
 * failed attempt leaves the store exactly as it found it"* was true of one address and false of the other.
 * **THE STORE'S FLOOR IS PER ADDRESS**, so the cure is per address: the plan below issues ONE call per distinct
 * address at that address's own first owed op — no per-op walk, one call per address, the single call's
 * property kept whole.
 *
 * **THE CALL PLAN — the ordering rule, stated so it can be checked (`floorCallPlan`): the addresses are taken
 * SHALLOWEST FIRST (segment count ascending, creation order within a length) and a candidate UNDER an address
 * already issued is SKIPPED, because that earlier call's floor — the earliest owed op at or under the earlier
 * address — already swept every entry this address has.** So the issued addresses form an ANTICHAIN: no one is
 * a prefix of another, their subtrees are PAIRWISE DISJOINT, and a call's candidate set can contain no entry a
 * previous call compacted. **That is the ordering check, and it is structural rather than empirical: a later
 * call can never re-compact what an earlier one undid, because it cannot see it.**
 *
 * **THE FLOOR (`item 5 (b)`) IS STILL THE STORE'S OWN CODE AND STILL `KC-8`**: a call that throws either floor
 * code is the arm's answer, named in the attempt's ONE `outcome` entry (item 6 (a); `fail-surface.md §2`'s
 * `KC-8` row). **THE ARM IS UNMOVED AND IS NO LONGER A CONSEQUENCE OF ANY ORDER — it is the store's answer to
 * the attempt's own floor call — and where several calls are issued the FIRST floor met is the arm's, the steps
 * before it standing in the report beside it** (the composition reports what it PERFORMED; `§2.6` item 3).
 */
function composeRollback(kernel, attempt) {
  // An attempt with no op at all owes no call, and nor does one whose `checkpoint` op IS its first op — item 1's
  // filter leaves that list empty and the composition records no step for it.
  if (attempt.ops.length === 0) return null;
  const first = attempt.ops[0];
  if (attempt.checkpoint !== null && first.opId === attempt.checkpoint) return null;
  const plan = floorCallPlan(attempt);
  let floor = null;
  for (let index = 0; index < plan.length; index += 1) {
    const call = plan[index];
    let answer = 'ok';
    let failed = false;
    let record = null;
    try {
      record = attempt.store.rollback(call.opId);
    } catch (thrown) {
      failed = true;
      answer = thrown !== null && typeof thrown === 'object' && typeof thrown.status === 'string'
        ? thrown.status
        : 'the call threw';
    }
    // THE FLOOR, TAKEN OFF THE STORE'S OWN CODE AND OFF NOTHING ELSE (`§2.6` item 5 (b)).
    if (floor === null && failed && STORE_FLOOR_CODES.includes(answer)) {
      floor = { opId: call.opId, code: answer };
    }
    const undoneOps = record !== null && Array.isArray(record.undoneOps) ? record.undoneOps : [];
    appendOwn(attempt.rollback, {
      opId: call.opId,
      answer,
      failed,
      undoneOps,
      // THE THROWING ARM CANNOT READ A RETURNED `RollbackResult`: the state stands at the NAMED OP's own
      // subtree, read at the store's own verb (item 3) — the subtree of THIS call's address.
      restoredTo: record !== null && record.restoredTo !== undefined && record.restoredTo !== null
        ? record.restoredTo
        : baseState(attempt.store, call.address),
      checkpoint: attempt.checkpoint,
    });
  }
  return floor;
}

/**
 * **THE FLOOR CALL PLAN** — one call per distinct address the attempt's ops touched, each at that address's
 * own FIRST owed op, ordered SHALLOWEST-FIRST so an outer address is called before any address inside it.
 *
 * **THE STORE'S CALL SCOPE IS THE NAMED OP'S OWN ADDRESSED SUBTREE AT OR AFTER THAT OP'S `seq`**
 * (`src/store.rs`'s `rollback`), so a call at an address's first owed op sweeps every LATER op under that
 * address and nothing above it. **THAT IS WHY THE ADDRESS'S OWN FIRST OWED OP IS THE FLOOR — never an op
 * beneath it**: a call at a DEEPER op carries the deeper address and cannot reach the shallower one's own
 * entries. **AND IT IS WHY THE OUTER ADDRESS GOES FIRST**: a container's shape must be back before a value is
 * set into it (a repair that landed at an ancestor replaced the subtree with a leaf, so restoring the
 * descendant first has no parent to stand in), and an outer call issued at or before a descendant's first owed
 * op sweeps that descendant whole.
 *
 * **A CANDIDATE IS SKIPPED IN TWO CASES, AND EACH IS THE STORE'S OWN LAW RATHER THAN A PREFERENCE:**
 *   * **COVERED** — an issued address is a prefix of it AND that call's floor stands at or before its own first
 *     owed op: every entry it has was already swept, so a second call could only meet the store's COMPACTED
 *     MARK and the floor is all-or-nothing (undoing nothing).
 *   * **UNREACHABLE** — an issued address is a prefix of it and that call's floor stands AFTER its own first
 *     owed op, while this address still has an owed op at or after that floor. **The two calls cannot both be
 *     issued**: the outer one has already compacted the later entries, so the inner one's scope would contain a
 *     compacted entry and undo nothing. **THE OUTER ADDRESS IS KEPT AND THE INNER ADDRESS'S EARLIER ENTRIES
 *     STAND** — the one residual this plan cannot remove, named here rather than left to a measurement (it
 *     needs an attempt whose repair order writes at a DESCENDANT and then at its ANCESTOR, with a later
 *     descendant write still owed).
 * **THE ISSUED CALLS' CANDIDATE SETS ARE THEREFORE PAIRWISE DISJOINT, AND THAT IS THE PROPERTY THE ORDERING
 * BUYS**: a call issued now is either disjoint from every call already issued (its address is unrelated, or it
 * is nested but stands wholly BELOW the outer call's floor) or it is skipped — so no call can see an entry an
 * earlier one compacted, no call can re-compact what an earlier one undid, and **the composition's own ordering
 * can never be the producer of `RollbackCompacted`**. **AND THE ATTEMPT'S FIRST OP IS THE FIRST CALL'S FLOOR
 * WHENEVER ITS ADDRESS IS THE SHALLOWEST** — the call the reduction named is still issued, and in the
 * single-address case it is the only one. **AND ONE STORE-LEVEL LIMIT IS NAMED RATHER THAN LEFT TO A
 * MEASUREMENT**: where a repair landed at an ANCESTOR of the attempt's address, the ancestor's call puts the
 * CONTAINER back but the store's own `restore` for the descendant's op does not reach into the re-minted
 * container — measured, `['a']` answers `{b: 99}` where the pre-attempt standing was `{b: 0}`. The plan still
 * issues the call (the container is back and the descendant is readable again), and the value beneath it is the
 * STORE's restore limit and not this composition's ordering.
 */
function floorCallPlan(attempt) {
  const candidates = [];
  for (let index = 0; index < attempt.ops.length; index += 1) {
    const op = attempt.ops[index];
    let known = false;
    for (let seen = 0; seen < candidates.length; seen += 1) {
      if (sameSegments(candidates[seen].address, op.address)) {
        known = true;
        break;
      }
    }
    if (known === false) appendOwn(candidates, { address: op.address, order: index });
  }
  // SHALLOWEST FIRST, CREATION ORDER WITHIN A LENGTH — a local insertion sort, so no `Array.prototype.sort` is
  // read on this path (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`).
  for (let index = 1; index < candidates.length; index += 1) {
    const held = candidates[index];
    let at = index - 1;
    while (at >= 0 && (candidates[at].address.length > held.address.length
      || (candidates[at].address.length === held.address.length && candidates[at].order > held.order))) {
      candidates[at + 1] = candidates[at];
      at -= 1;
    }
    candidates[at + 1] = held;
  }
  const issued = [];
  const plan = [];
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    let covered = false;
    let unreachable = false;
    for (let seen = 0; seen < issued.length; seen += 1) {
      const one = issued[seen];
      if (addressBelow(one.address, candidate.address) === false) continue;
      if (one.floor <= candidate.order) {
        covered = true;
        break;
      }
      // THE OUTER CALL'S FLOOR STANDS AFTER THIS ADDRESS'S FIRST OWED OP: a call issued now would meet an entry
      // the outer call compacted. IT IS UNREACHABLE ONLY WHERE SUCH AN ENTRY EXISTS — a candidate whose every
      // entry stands BELOW the outer floor is disjoint from the outer scope and is issued after it safely.
      for (let scan = one.floor; scan < attempt.ops.length; scan += 1) {
        if (addressBelow(candidate.address, attempt.ops[scan].address)) {
          unreachable = true;
          break;
        }
      }
      if (unreachable) break;
    }
    if (covered || unreachable) continue;
    const floorOp = attempt.ops[candidate.order];
    appendOwn(issued, { address: candidate.address, floor: candidate.order });
    appendOwn(plan, { address: candidate.address, opId: floorOp.opId });
  }
  return plan;
}

/** Whether `outer` is a prefix of `inner` — the store's own scope relation (`§6.4` `M-5`, `DD-21`), read here
 *  on the decoded segment arrays the journal op carries. */
function addressBelow(outer, inner) {
  if (outer.length > inner.length) return false;
  for (let index = 0; index < outer.length; index += 1) {
    if (!sameSegment(outer[index], inner[index])) return false;
  }
  return true;
}

/** One segment's equality: a string against a string, an index against an index, and never a coercion. */
function sameSegment(left, right) {
  return typeof left === typeof right && left === right;
}

/** Two decoded addresses' equality by their segments. */
function sameSegments(left, right) {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index += 1) {
    if (!sameSegment(left[index], right[index])) return false;
  }
  return true;
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
// `K-4` `log(store, attempt) -> LogEntry[]` — the attempt's own log, REFUSED while it runs.
// ---------------------------------------------------------------------------------------------
export function log(store, reference) {
  // **THE READS ARE THE INSTANCE'S OWN** (`D-30`): the reference names an attempt the kernel instance the
  // caller's `store` answers MINTED, and this is the kernel that holds its records — the reader answers "from
  // the record and not from the store instance" (`§2.1` item 4) still, the record being the instance's.
  const kernel = kernelFor(store);
  const id = attemptIdOf(reference);
  const live = kernel.live.get(id);
  if (live !== undefined) {
    // **⟶ AND A LIVE ATTEMPT HAS NO LOG A CLIENT MAY READ — `D-58`, 2026-10-28. THE ARCHITECT, VERBATIM: *"The
    // client does not need any insight into the current state of a commit/attempt before it completes. Don't
    // expose any of it."*** **`K-5` REFUSED AN OPEN ATTEMPT FROM ITS OWN RULING AND THIS ITEM DID NOT**: a live
    // attempt's list answers `D-39`'s entry sequence PART-WAY THROUGH the pass — the entries appended so far,
    // in their own index order (`D-65` removed the `seq` member; the index is the position) —
    // as a consumer read — which is exactly the in-flight insight the ruling forbids. **SO THE LIVE ARM REFUSES
    // WITH THE SAME MEMBER `K-5` USES, in the same shape and the same message family**: `KC-7`
    // (`ConstraintAttemptOpen`), *"the constraint attempt <id> is still open"*, and the refusal's own `log` the
    // empty list every kernel refusal carries (`fail-surface.md §1.1` item 4).
    refuse(KC.attemptOpen, `the constraint attempt ${id} is still open`, []);
  }
  const closed = kernel.closed.get(id);
  // **AND A CLOSED ATTEMPT ANSWERS — WITH THE ENTRIES THE STORE STILL HOLDS, WHICH AFTER THE HANDOFF IS NONE**
  // (`D-58`'s second demand): the log was handed to the client with the report and dropped here, so the answer
  // is the empty list and it reads *"the store retains nothing"*, never *"the attempt logged nothing"* — the
  // record the client was handed is the one that carries the entries.
  if (closed !== undefined) return Array.isArray(closed.log) ? closed.log : [];
  refuse(KC.arg, `no constraint attempt answers to ${id}`, []);
}

/**
 * **⟶ THE DELETION SITE — `D-58`'S SECOND DEMAND, AND THE ONE `DEF-J` FILED AS *"NO DELETION SITE"*.** The
 * architect, verbatim: *"After a commit/attempt resolves/rejects, the store does not need to retain the message
 * log or other client-returned data. Don't retain it."*
 *
 * **WHAT IS DROPPED, AND WHY IT IS THE LOG.** `D-55` item 6 made the commit's log *"handed off to the client and
 * dropped after closing out"*, and only the SEAL was built (`sealHandoff` freezes the record the client
 * received). **The DROP was not**: the closed attempt's report stood in `kernel.closed` carrying `log` — the
 * commit's one list, entries and all — for the life of the instance, which is the retention `D-39` could not
 * bound and `DEF-J` filed. **SO ONCE THE COMMIT HAS RESOLVED OR REJECTED, THE STORE KEEPS WHAT IT STILL NEEDS AND
 * LETS GO OF WHAT THE CLIENT WAS HANDED**: the outcome (which is `K-5`'s answer), the ops (the journal holds
 * them), and the reversal's record — **and NOT the message log, nor the entries' client-returned data.**
 *
 * **THE HANDED-OFF RECORD IS UNTOUCHED, AND THAT IS THE SINGLE-COPY PROPERTY**: the record the driver received
 * from `K-3` (or the refusal it caught) is the object this act leaves alone — sealed, frozen, its list
 * populated — and the store simply stops naming it. **A retained copy would be a second source of truth that
 * can disagree with the one the consumer holds, which is why the drop and the seal are the same act's two
 * halves** (`D-55` item 6's ground, read forward).
 */
export function dropHandoff(kernel, report) {
  if (report === null || typeof report !== 'object') return;
  const attempt = report.attempt;
  if (attempt === null || typeof attempt !== 'object' || typeof attempt.id !== 'string') return;
  kernel.closed.set(attempt.id, {
    attempt,
    outcome: report.outcome,
    ops: report.ops,
    rollback: report.rollback,
  });
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

