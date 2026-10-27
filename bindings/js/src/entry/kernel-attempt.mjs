// `D-13` (`docs/L1/kernel-subdivision.md` §1 part `9d`) — the pass: bytes moved from `bindings/js/src/constraint-kernel.mjs`; no logic changed.
import { KC, KC_TOKENS, SETTLED_ON_THE_PASSING_ARM, SAVE_FAILED_AT_THE_TERMINAL_ARM, TERMINAL_ARM, markBodyThrow, refuse, isKernelRefusal, pairSpelling, sameAddress, kernelFor, append, appendOwn, ownMember, withdraw, landedOp, landedOpDefect, pairsAtAddress } from './kernel-foundations.mjs';
import { commitAttemptIdOf, terminal, close } from './kernel-terminal.mjs';
// ---------------------------------------------------------------------------------------------
// `K-3` `runAttempt(store, commit) -> AttemptReport`
// ---------------------------------------------------------------------------------------------
/// **`D-44`'s CHANNEL, SPELLED ON THIS SIDE TOO** — `state.mjs`'s `installAttemptSeam` installs it and this
/// module reads it, **and neither side imports the other**: the key is a `Symbol.for` spelling, the same device
/// `SETTLED_ON_THE_PASSING_ARM`, `SAVE_FAILED_AT_THE_TERMINAL_ARM` and `TERMINAL_ARM` already cross this boundary
/// by (`kernel-surface.md §1` item 1: this module's import footprint is EMPTY, so it cannot import `state.mjs`
/// and must not).
///
/// **THE INVARIANT IS THE ARCHITECT'S, VERBATIM: *"There should be no state where a constraint is being checked
/// without an open commit. Any action that would cause a constraint check should open a commit before
/// beginning"*** (`strata/decisions.md` · `D-44`) — **and it is enforced HERE, at the one frame where a check
/// runs, and not at the frame that called it**: a bracket taken in `constraintWrite` would be bypassed by every
/// direct `K-2`/`K-3` drive, and *"a seam a driver can bypass is not an invariant."*  **SO THE PASS OPENS ITS OWN
/// SCOPE, AND A STORE THAT CARRIES NO CHANNEL IS REFUSED RATHER THAN RUN UNCOMMITTED** — the invariant fails
/// closed, `KC-2` (the kernel's own argument token, the one its other two store-mismatch arms answer with; no
/// ninth token is minted, `fail-surface.md §2`).
const COMMIT_SCOPE = Symbol.for('provident-storeroom.commit-scope');

export function runAttempt(store, commitRecord) {
  // THE SEAM, READ BEFORE ANY STATE MOVES: **a store this package did not build carries no such channel, so it
  // is not this package's store and no pass of this kernel may run against it.** The refusal is thrown BEFORE
  // `status` moves, before an entry is appended and before a body is invoked, so a caller's attempt stands
  // exactly as it stood and nothing is evaluated outside a commit.
  const scope = store !== null && typeof store === 'object' ? store[COMMIT_SCOPE] : undefined;
  if (typeof scope !== 'function') {
    refuse(KC.arg,
      'the store this constraint attempt would be run against carries no commit-scope channel, so there is no '
        + 'open commit a constraint could be checked in',
      []);
  }
  return scope(() => passInCommitScope(store, commitRecord));
}

/// **THE PASS AND ITS WHOLE TERMINAL ACT, TAKEN INSIDE THE COMMIT WINDOW `D-44` REQUIRES.** The scope covers
/// everything a check reaches — the landing's pass, every re-run, the residue's delivery and the `file`-tier save
/// — so a body of a delivered set, a repair and a pair body are all invoked in a window. **ON THE PRODUCTION PATH
/// THE SCOPE JOINS THE VERB'S OWN COMMIT AND MOVES NOTHING** (`state.mjs`'s `openCommit` answers `false` where the
/// count already stands above zero, which is `§4.1`'s join rule); **on a DIRECT `K-2`/`K-3` DRIVE IT OPENS THE ONE
/// THE PASS OWES AND CLOSES ONLY THAT**, so the state *"no open commit, one open attempt"* — `D-44`'s direct-pass
/// window — no longer exists on any path.
function passInCommitScope(store, commitRecord) {
  const kernel = kernelFor(store);
  const id = commitAttemptIdOf(commitRecord);
  const attempt = kernel.live.get(id);
  if (attempt === undefined) {
    // A CLOSED or UNKNOWN attempt is KC-2 — and NEVER KC-7, whose `K-3` site is the RE-ENTRANT call
    // for a LIVE attempt (`fail-surface.md §2`'s KC-2 row; `kernel-surface.md §2.3` item 3).
    refuse(KC.arg, `no open constraint attempt answers to ${id}`, []);
  }
  // `kernel-surface.md §2.1` item 3's `RD-9` CLAUSE, READ WITH `attempt-lifecycle.md §2.4` item 1: the
  // `AttemptRef` is MINTED BY THE KERNEL INSTANCE (its `id` "unique within the kernel instance"), so a
  // `CommitRecord` whose attempt was opened by ANOTHER instance names an attempt THE KERNEL INSTANCE
  // HANDED THE RECORD HOLDS NONE FOR. That call is THIS refusal — `KC-2`, NO STATE MOVED AND NO ENTRY
  // APPENDED — and NEVER a run of another instance's attempt: the attempt's own `store` is the instance
  // its `K-2` reached, and what is refused here is refused BEFORE `status` moves, so the caller's own
  // attempt stands OPEN, its pair unevaluated, and its address held by ITS OWN run alone (item 4's
  // unconstrained-argument clause is declared for `K-4`/`K-5` and is not widened to `K-3`).
  if (attempt.store !== store) {
    refuse(KC.arg,
      `no open constraint attempt answers to ${id}: it was opened through another store instance`,
      []);
  }
  if (attempt.status === 'running') {
    // THE RE-ENTRANT `K-3`, refused by the SAME `KC-7` member a live address answers with.
    refuse(KC.attemptOpen,
      `the constraint attempt at ${JSON.stringify(attempt.address)} is already running`, []);
  }

  attempt.status = 'running';
  const terminalArm = runToCompletion(kernel, attempt);
  if (terminalArm !== null) {
    // A FAILING LANDING: the arm's own terminal act, its per-op rollback composition, and the throw
    // of `fail-surface.md §1.1`'s form carrying the log.
    terminal(kernel, attempt, terminalArm.status, terminalArm.message);
    // **⟶ INSTANT (b) ON THE FAILING ARM, AND IT PRECEDES THE REFUSAL** (`docs/decisions.md` · `A116`
    // (D1); `surface.md §2.4` item 9's table row (b): *"AT THE PASS'S TERMINAL ARM … after the last
    // constraint of the attempt has been evaluated and before `runAttempt` returns to the calling
    // process"*). The attempt is already CLOSED and the DISCARD has already emptied the member
    // (`attempt-lifecycle.md §2.4` item 8 (i) (5); `terminal` above), so the residue this seam reads
    // stands EMPTY and the arm delivers ZERO — *"on a write that fails on constraints THE OTHER LISTENERS
    // ARE DISCARDED"* (`§2.7` item 6, read at item 7 (d)) — while the delivery itself is still owed at
    // this instant and is taken HERE rather than skipped, because the residue and not the arm decides
    // what it reaches (`§2.7` item 7 (c): *"the empty delivery is a NO-OP AND NOT A FAILURE"*).
    settleArm(store, attempt);
    // THE ARM IS READ OFF THE CLOSED ATTEMPT WHERE THE COMPOSITION'S OWN FLOOR OVERRODE IT: a still-owed
    // op's call meeting `RollbackCompacted`/`JournalOpUnknown` is `KC-8` and not the pass's own arm
    // (`composition-and-states.md §2.6` item 5 (b); `KC-8`'s own row).
    refuse(attempt.throwState, attempt.throwMessage, attempt.log);
  }

  // THE SUCCESS ARM: the registry entry removed and the five-member report — **AND THE `commit` ENTRY IS
  // NOT APPENDED HERE** (`DEF-2026-10-16-B`; `kernel-surface.md §2.1` item 3's `LogKind` table: `commit`
  // = "the attempt's SUCCESS arm, appended once"; `composition-and-states.md §2.7` items 5 and 7 put it on
  // the PASSED arm's own sequence). The save is A CONSTRAINT EVALUATED LAST (`surface.md §2.11` clause 5),
  // so an arm that appends this entry BEFORE the save's own instant appends it on an arm whose save may
  // not stand — and the entry's own declared text then LIES beside the `outcome` entry the failure arm
  // appends (`§2.1` item 4 (ii)). **THE APPEND THEREFORE FOLLOWS THE SAVE'S OWN SUCCESS**, below: it stands
  // on the passing arm alone, appended once, and it closes that arm's log.
  const closed = close(kernel, attempt, 'passed');
  // **⟶ INSTANT (b) ON THE PASSING ARM — THE ORDERING LAW'S WHOLE POINT** (`docs/decisions.md` · `A116`
  // (D1); `surface.md §2.7` item 6): *"for a write, the surface runs the write's TRIGGERED CONSTRAINTS
  // FIRST, and THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY CONSTRAINT HAS PASSED"*. Every constraint
  // of this attempt has now been evaluated — the pass reached its terminal arm — and the delivery follows
  // it, at THIS instant, before this item returns to the calling process. The attempt is closed FIRST so
  // that a listener body's own kernel act meets a disposed attempt rather than a live one.
  //
  // AND THE PASS'S OWN CHECK-OFFS ARE PUBLISHED HERE, BEFORE THE SEAM IS REACHED (`A117` (D5)): the
  // identities this attempt's pass evaluated and checked off are what the terminal arm resolves beside
  // the residue, so that a registration standing at one of those identities' addresses — the firing the
  // check-off did NOT consume — is delivered ONCE at this instant (`§2.7` item 6). It is placed on the
  // PASSING arm ALONE: the failing arm above delivered nothing and published nothing.
  publishCheckedOff(attempt);
  // **⟶ AND THE PASSING ARM'S OWN MARK IS TAKEN WITH THEM** (`SETTLED_ON_THE_PASSING_ARM` above;
  // `surface.md §2.11` clause 2): the seam's terminal arm performs the store's `file`-tier commit on THIS
  // arm alone — *"the `file` tier, the TERMINAL ARM and the PASSING ARM alone"* (clause 1) — and the
  // failing arm above reaches the same `settle` call with the same record in hand and owes no save.
  if (attempt.record !== undefined) {
    attempt.record[SETTLED_ON_THE_PASSING_ARM] = true;
  }
  // **⟶ AND THE SAVE IS A CONSTRAINT EVALUATED LAST, SO THE PASS THAT FAILED REPORTS IT** (`surface.md
  // §2.11` clause 5; `kernel-surface.md §2.1` items 3–5; `fail-surface.md §1.1` items 1 and 3;
  // `composition-and-states.md §2.6` item 3). **THIS IS THE ONE ARM ON WHICH THE PASSING ARM'S OWN FIRST
  // ACT FAILS**, and the clause reads it exactly as it reads every other failing landing: *"a save that
  // fails IS A CONSTRAINT VIOLATION"*, `ok === false`, the log gains the ONE `outcome` entry, and the
  // report is the run's answer and never the passing arm's.
  //
  // **THE ARM IS READ OFF THE IDENTITY THE SEAM MARKS AND OFF NOTHING ELSE** (`SAVE_FAILED_AT_THE_TERMINAL_
  // ARM` above): a BODY OF THE DELIVERED SET that throws is NOT this arm — `§2.7` item 4 leaves it NOT
  // caught, not retried and not reported — so it is rethrown with the attempt standing just as it stood.
  //
  // **THE TERMINAL ACT IS THIS MODULE'S ONE TERMINAL ACT, TAKEN VERBATIM** (`terminal` below): the per-op
  // rollback composition FIRST — ROLLBACK FIRST, MESSAGE SECOND — then the attempt's ONE `outcome` entry,
  // whose `state` is the token the composition's own floor decides (`KC-8` where the still-owed op's call
  // meets the store's own `JournalOpUnknown`, the failed save's arm being the store's own `§7.2` item 3
  // rollback and the entry it rolled back being gone) and the pass's own token `KC-3` where no floor is met.
  // **THE CALLER MEETS NEITHER FORM**: the store's verb produced this failure, so its code crosses on the
  // STORE's channel, in the store's own two-member form, VERBATIM AND UNCONVERTED (`§1.2` item 2) — the
  // kernel's token standing in the `outcome` entry's `state` — and THE VERY THROWABLE THE SEAM REWROTE is
  // what leaves this call.
  try {
    settleArm(store, attempt);
  } catch (saveFailure) {
    if (attempt.record === undefined
      || attempt.record[SAVE_FAILED_AT_THE_TERMINAL_ARM] !== saveFailure) {
      throw saveFailure;
    }
    // **AND THE PIN THE PASSING ARM TOOK IS RELEASED WITH IT** (`composition-and-states.md §2.6` item 3's
    // `checkpoint` member's own domain, read at item 8 (iii); item 1's filter; item 2's *"WHERE THE ATTEMPT
    // PASSED NO CHECKPOINT, THE CALL LIST IS ITEM 2'S OWN — THE WHOLE LIST"*). **THE MEMBER IS *"the opId of
    // the op whose LANDING left the attempt's LAST VALID STATE, or null where no such landing exists FOR
    // THAT ADDRESS"*** — and on THIS arm no landing of this attempt left one: the store's own failure arm
    // has ALREADY restored the pre-state and popped the entry (`src/store.rs`'s `commit_file`; `§8.1` #15;
    // clause 5's ROLLBACK FIRST), so the pass's own pin stood on a landing the save unsaid. **THE PIN IS
    // THEREFORE `null` AND THE COMPOSITION'S CALL LIST IS THE WHOLE OF `ops`** — item 1's filter excludes
    // the op a `null` member names from nothing — so the per-op call THIS ARM OWES IS ISSUED and its step
    // stands in the report's `rollback`: *"the report carries the rollback that actually happened"*
    // (`§2.6` item 3). Where the pinned op still stands in the store the call returns and the step records
    // `'ok'`; where the failed save's own rollback took it the store answers `JournalOpUnknown` and the
    // composition's floor reads `KC-8` in the ONE `outcome` entry (item 5 (b); item 6 (a)).
    attempt.checkpoint = null;
    terminal(kernel, attempt, KC.violated,
      typeof saveFailure.message === 'string'
        ? saveFailure.message
        : `the attempt's own save at ${JSON.stringify(attempt.address)} failed`);
    throw saveFailure;
  }
  // **THE `commit` ENTRY: THE ATTEMPT'S SUCCESS ARM, APPENDED ONCE, ON THIS ARM ALONE**
  // (`DEF-2026-10-16-B`; `kernel-surface.md §2.1` item 3's `LogKind` table — *"`commit` = the attempt's
  // success arm, appended once"*, its `id` `null`, its `opId` the attempt's last op, its `state` `null`;
  // `composition-and-states.md §2.7` items 5 and 7: *"one `constraint-check` entry per registered pair is
  // appended, THEN the `commit` entry"*). **THE SAVE HAS STOOD** — the call above returned and this arm was
  // not reached by the failed-save path — **SO IT IS APPENDED HERE AND ONLY HERE, AFTER every
  // `constraint-check` entry of the pass, AND IT CLOSES THE LOG**: it is the PASSED arm's LAST entry, and
  // the failing arm above appended its own ONE `outcome` entry and NO `commit` entry at all
  // (`kernel-surface.md §2.1` item 4 (ii); item 3's two rows read together — the two one-shot arms never
  // stand in one log). **AND NOTHING IS APPENDED TO THIS LOG AFTER IT**: the delivered set's bodies ran
  // before this line and reach this attempt's log by no act (`§2.7` item 6), the record this attempt's
  // report carries being the same list this line closes.
  append(attempt, 'commit', null, attempt.ops[attempt.ops.length - 1].opId,
    `every constraint registered at ${JSON.stringify(attempt.address)} passed; the commit stands`);
  return closed;
}

/**
 * **THE SEAM'S TERMINAL INSTANT, TAKEN AT THE ONE PLACE BOTH ARMS REACH** (`surface.md §2.4` item 9 (b);
 * `PAR-JS-19`; `A116` (D1)–(D2)): the record identity `K-2` answered, handed once more to THE INSTANCE'S
 * OWN `settle` member — the member the kernel CALLS and the entry IMPLEMENTS — so that the entry delivers
 * the residue standing in that record's `pending` at this instant through ITS OWN registry
 * (`§2.7` item 7 (a)–(b)). **A SECOND CALL FOR THE SAME IDENTITY IS THE DELIVERY** (`PAR-JS-19`'s
 * domain cell: *"the first call on this instance for a given identity IS the adoption, and the SECOND
 * call for that identity is the delivery"*), so the record this reads is the very record instant (a)
 * adopted and never a copy of it.
 *
 * **THE MEMBER IS REACHED WITH NO ADDON CALL AND NO STORE VERB**, on the caller's own instance object —
 * the same object every item of this surface takes first.
 */
function settleArm(store, attempt) {
  const record = attempt.record;
  if (record === undefined) return;
  // **⟶ AND THE SEAM'S INSTANT (b) IS REACHED THROUGH THE `TERMINAL_ARM` CHANNEL, 2026-10-18** (`§2.1` item 3's
  // clause of that date: *"THE KERNEL CALLS NO SEAM ON EITHER TERMINAL ARM"* — the SEAM `settle` is gone; what
  // remains is the ENTRY'S OWN ACT at this instant, which `docs/specs/storeroom-js/surface.md §2.7` item `7`
  // declares and `§2.11` clause 2 keys). **THE ARM STILL OWES ITS DELIVERY AND ITS SAVE, AND THIS IS WHERE IT
  // IS MADE**: a symbol-keyed channel adds no member and mints no kernel item.
  if (typeof store[TERMINAL_ARM] === 'function') store[TERMINAL_ARM](record);
}

/**
 * THE PASS LOOP OF ONE ATTEMPT — the first pass and, for EVERY repair the pass lands, the op's own
 * ATOMIC LANDING EVALUATION followed by THE RE-RUN.
 *
 * `attempt-lifecycle.md §2.4` item 5 (iv): a pass's evaluated set is EVERY PAIR STANDING AT THE
 * ATTEMPT'S OWN `address` WHEN THAT PASS BEGINS — the first pass and every re-run alike, the pairs that
 * had already run INCLUDED, the pair whose repair just ran INCLUDED and a pair whose repair is
 * registered but has not run INCLUDED — each evaluated ONCE in clause (ii)'s first-registration order,
 * with NO EXCLUSION AND NO SKIP.
 *
 * `kernel-surface.md §2.3` item 1 — the OTHER rule: "EVERY WRITE THAT LANDS AT AN ADDRESS THE KERNEL
 * REGISTERS PAIRS AT RUNS, AFTER THE WRITE VERB RETURNED AND BEFORE ANY OTHER KERNEL ACT, ONE PASS OVER
 * EVERY PAIR REGISTERED AT THAT ADDRESS against THAT ONE OP's value and tier, its `AttemptContext.op`
 * naming that op". A repair's own op is such a landing, and THIS is the arm "a repair's edit lands, the
 * re-run evaluates EVERY pair at the attempt's address against THAT op, and where one of those
 * evaluations does not return the pass arm THE ATTEMPT MOVES THROUGH THE RE-RUN'S OWN FOUR
 * COMBINATIONS" names — so the repair's op is evaluated BEFORE the re-run, and the checkpoint therefore
 * moves to THE REPAIR'S OWN OP.
 *
 * Returns `null` on the success arm, and the attempt's terminal arm otherwise.
 */
function runToCompletion(kernel, attempt) {
  for (;;) {
    // EVERY RUN READS THE ATTEMPT'S OWN SET, IN CLAUSE (ii)'s ORDER, AGAINST THE LANDING'S OWN OP:
    // `attempt-lifecycle.md §2.4` item 5 (iv) fixes ONE scope for the first pass and every re-run alike,
    // and `kernel-surface.md §2.3` item 1's atomic landing evaluation — whose own one home is that item —
    // is the arm a repair's op landing owes: "a repair's edit lands, the re-run evaluates EVERY pair at
    // the attempt's address against THAT op, and where one of those evaluations does not return the pass
    // arm THE ATTEMPT MOVES THROUGH THE RE-RUN'S OWN FOUR COMBINATIONS". So the op a repair landed becomes
    // THE NEXT RUN'S `op`, and every pair at the attempt's address — the pairs that had already run
    // included — is evaluated against it, with no exclusion and no skip. THE RUN'S LANDING IS THE
    // ATTEMPT'S LAST OP, AND THE RUN'S ADDRESS IS THAT OP'S OWN ADDRESS.
    const landing = attempt.ops[attempt.ops.length - 1];
    const run = evaluate(kernel, attempt, landing);
    if (run.terminal !== null) return run.terminal;
    if (!run.rerun) return null;
  }
}

/**
 * ONE EVALUATION RUN — a LANDING'S OWN PASS. `attempt-lifecycle.md §2.4` item 5 (iv): "a pass's evaluated
 * set is THE PAIRS STANDING AT THE ATTEMPT'S OWN `address` WHEN THAT PASS BEGINS … the first pass and
 * every re-run alike … the pairs that had already run INCLUDED, the pair whose repair just ran INCLUDED
 * and a pair whose repair is registered but has not run INCLUDED … each evaluated ONCE in clause (ii)'s
 * first-registration order, WITH NO EXCLUSION AND NO SKIP." Every run — the commit's own landing, the
 * repair's own landing and the re-run alike — therefore evaluates THAT ONE SET, against the op whose
 * landing it reads. Answers:
 *   `{ terminal }` — the attempt's terminal arm, an EXISTING `KC` member, where one was reached;
 *   `{ terminal: null, rerun: true }` — a repair landed and its op was added to the attempt;
 *   `{ terminal: null, rerun: false }` — the pass arm, the `checkpoint` member pinned at that op.
 */
function evaluate(kernel, attempt, landing) {
  // THE PASS'S OWN ADDRESS IS THE ATTEMPT'S (`attempt-lifecycle.md §2.4` item 5 (iv): "THE KERNEL
  // EVALUATES THE PAIRS IT REGISTERED AT THE ATTEMPT'S OWN ADDRESS — the first pass and every re-run
  // alike — and NOT the union of the store's prefix-selected addresses"), WHILE THE OP EVERY EVALUATION
  // CARRIES IS THE LANDING'S OWN — the repair's op where a repair's edit landed, and the attempt's first
  // write where the pass is the commit's own landing.
  // THE PASS'S OWN EVALUATED SET IS FIXED WHEN THE PASS BEGINS — a SNAPSHOT of the registry's rows for
  // the attempt's address AT THAT INSTANT, and never a live view of the registry this pass reads again:
  // "a PASS's evaluated set is FIXED WHEN THE PASS BEGINS — it is every pair registered at the attempt's
  // address AT THAT INSTANT, each evaluated once in clause (ii)'s order", so "A `K-1` THAT RETURNS
  // DURING A PASS APPENDS A PAIR TO THE REGISTRY WITHOUT APPENDING ANY ENTRY TO THAT PASS AND WITHOUT
  // BEING EVALUATED BY IT: the new pair enters the NEXT pass's set" (`attempt-lifecycle.md §2.4` item 5
  // (iv); `CX-12`). The snapshot is ALSO the set the layer (a) delivery of this run is read over.
  const list = pairsAtAddress(kernel, attempt.address);
  // THE ATOMIC LANDING EVALUATION'S OWN ARM-TAKING IS `attempt-lifecycle.md §2.4` item 4's arms, read
  // over THE PAIR THAT FAILED AT THAT OP (`kernel-surface.md §2.3` item 1; `§2.4`: `KC-3` where that pair
  // is NOT in `ran` before this run and no repair is registered for it; `KC-6` where it IS in `ran` and
  // is NOT in `appliedRepairs`; `KC-5` where it IS in `ran` and IS in `appliedRepairs`; and arm (b)
  // where its repair is registered and has not run).
  //
  // `§2.4` ITEM 5 (ii)–(iii): "THE ATTEMPT TRANSITIONS AT THE FIRST EVALUATING PAIR WHOSE OUTCOME IS A
  // VIOLATION: THAT PAIR'S OWN ARM DECIDES WHAT HAPPENS NEXT", and "where two pairs of one pass would
  // violate, the FIRST in clause (ii)'s order decides and THE SECOND IS NOT EVALUATED". THE DECISION IS
  // THEREFORE TAKEN INSIDE THE LOOP AT THE FIRST VIOLATING PAIR WHATEVER ITS FORM: a return standing
  // OUTSIDE the three declared arms is READ AS the `{message}` arm (`PAR-C-5`; item 4's arm (c)
  // predicate), so it is a violation of exactly the same standing as the caller's own `{message}` arm
  // and is disposed of by the SAME predicates — NEVER carried to the end of the pass, where a later
  // pair's landed repair would supersede the arm the attempt took first.
  if (list !== undefined) {
    for (const key of list) {
      const pair = kernel.pairs.get(key);
      if (pair === undefined) continue;
      // `kernel-surface.md §2.3` item 1 — THE OP WHOSE LANDING LEFT THE STATE THIS EVALUATION RUNS AT,
      // VERBATIM, and the value that write returned, VERBATIM: "the data the constraint confirms".
      const op = landing;
      const context = {
        address: attempt.address.slice(),
        attempt: attempt.ref,
        op,
        tier: op.tier === undefined ? null : op.tier,
        value: op.after === undefined ? undefined : op.after.value,
      };

      // THE ENTRY IS OPENED BEFORE THE BODY RUNS, so a body that reads the record's own log mid-flight
      // reads its own evaluation's entry — and it is WITHDRAWN where the body returns nothing
      // (`kernel-surface.md §2.5` item 1; `PAR-C-6`).
      append(attempt, 'constraint-check', pair.id, op.opId, `the evaluation of ${pair.id}`);
      const check = attempt.log[attempt.log.length - 1];
      let outcome;
      try {
        outcome = pair.constraint(context);
      } catch (body) {
        // A body that threw returned nothing, so no `constraint-check` entry stands and the attempt is
        // closed (`PAR-C-6`; `NX-2`; `composition-and-states.md §2.7` item 13).
        withdraw(attempt, check);
        terminal(kernel, attempt, null, `the constraint ${pair.id} threw; the attempt is closed`);
        // **⟶ AND THE VALUE IS MARKED HERE, BY THE FRAME THAT CAUGHT IT FROM THE BODY — `DEF-S`, 2026-10-26,
        // on the architect's ruling *"Expand the returned error set for both S/N"*.** The mark is what the
        // entry's `constraintCrossing` converts on, and an UNMARKED value still crosses as itself
        // (`DEF-A`'s protection, unmoved). **THE MARK CARRIES THE ATTEMPT'S OWN LOG, TAKEN HERE — BEFORE THE
        // ATTEMPT IS DISPOSED OF — AND THE ADDRESS THE BODY WAS EVALUATED AT** (`markBodyThrow`'s clause,
        // `kernel-foundations.mjs`). The throwable's own identity is unmoved at THIS layer: a kernel-level
        // caller still meets the very value the body threw.
        throw markBodyThrow(body, attempt.address, attempt.log);
      }

      // THE CONSTRAINT'S OWN OUTCOME — A CLOSED THREE-ARM SET (`PAR-C-5`). A value outside the three
      // arms is read as the `{message}` arm and never as an arm of its own.
      // **⟶ AND ITS TWO MEMBERS ARE READ AS THE OUTCOME'S OWN — `D-35`'s READ HALF, CLOSED 2026-10-26.**
      // `outcome` IS THE CALLER'S CONSTRAINT RETURN. `'message' in outcome` and `outcome.message` were a
      // `[[HasProperty]]` and a `[[Get]]`, each walking the chain, so a prototype decided the sentence the
      // refusal carried — measured: a body returning `Object.create({ message: '…' })` made the write refuse
      // `FileCommitFailed` with THE INHERITED STRING as its message and as the log entry's text. **`ownMember`
      // is `[[GetOwnProperty]]`**, so an inherited member is absent here and the arm answers this unit's own
      // `unrecognized` sentence, exactly as it answers a return outside the three arms.
      let text;
      let repair = null;
      if (outcome === true) {
        text = `the constraint ${pair.id} passed at ${JSON.stringify(attempt.address)}`;
      } else if (outcome !== null && typeof outcome === 'object' && Object.hasOwn(outcome, 'message')) {
        const outcomeMessage = ownMember(outcome, 'message');
        text = typeof outcomeMessage === 'string' && outcomeMessage.length > 0
          ? outcomeMessage
          : unrecognized(pair);
        const outcomeRepair = ownMember(outcome, 'repair');
        if (typeof outcomeRepair === 'function') repair = outcomeRepair;
      } else {
        text = unrecognized(pair);
      }

      check.message = text;

      // THE VIOLATION ARMS (`attempt-lifecycle.md §2.4` item 4 (b)–(f)), read off THE PAIR THAT FAILED
      // and off nothing else. THE ONE DISCRIMINATOR IS THE PAIR'S OWN REGISTRY MEMBERSHIP READ AT THE
      // INSTANT BEFORE THIS EVALUATION, TOGETHER WITH `ran` (`kernel-surface.md §2.5` item 3;
      // `fail-surface.md §2`'s `KC-5`/`KC-6` rows): `KC-5` iff in `ran` AND in `appliedRepairs`;
      // `KC-6` iff in `ran` AND OUT of `appliedRepairs` — whether or not a repair is registered for the
      // pair, and NEVER off a repair-run COUNT.
      const ran = attempt.ran.includes(key);
      if (!ran) appendOwn(attempt.ran, key);
      if (outcome === true) continue;
      if (repair === null) {
        // ARMS (c), (e) AND (f) — THE PAIR'S FIRST-EVALUATION ARM AND ITS TWO REPEAT ARMS, taken
        // AT ONCE at the first violating pair whatever the form its return carried
        // (`attempt-lifecycle.md §2.4` item 4's disjointness rule and item 5 (ii)–(iii)). Arm (c)'s
        // predicate is "NOT in `ran` before this evaluation and no repair registered for it"; a pair
        // IN `ran` is a repeat and never this arm, so its own token is read first.
        if (ran) {
          return { terminal: attempt.appliedRepairs.includes(key)
            ? { status: KC.repairRepeat,
              message: `the pair ${pairSpelling(pair)} violated a re-run and its repair had `
                + 'already been applied' }
            : { status: KC.repeat,
              message: `the pair ${pairSpelling(pair)} violated a re-run and no repair had `
                + 'been applied to it' },
            rerun: false };
        }
        return { terminal: { status: KC.violated, message: text }, rerun: false };
      }
      // LIMB (f) — A REPEAT BY A PAIR WHOSE REGISTERED REPAIR HAS NOT RUN IS TAKEN HERE AND NOT BELOW:
      // "NO repair function is invoked a second time" (`P-SM-6`; `kernel-surface.md §2.5` item 3), the
      // pair's own registry membership and never a repair-run count being the discriminator.
      if (ran && !attempt.appliedRepairs.includes(key)) {
        return { terminal: { status: KC.repeat,
          message: `the pair ${pairSpelling(pair)} violated a re-run and no repair had `
            + 'been applied to it' },
          rerun: false };
      }
      // LIMB (e) — THE PAIR'S REPAIR HAS ALREADY RUN AND IS RECORDED AS APPLIED, so the second repair is
      // never invoked and the repeat is `KC-5`.
      if (ran) {
        return { terminal: { status: KC.repairRepeat,
          message: `the pair ${pairSpelling(pair)} violated a re-run and its repair had `
            + 'already been applied' },
          rerun: false };
      }

      // ARM (b) — THE PAIR'S REPAIR RUNS THROUGH THE CALLER'S OWN VERB, AND THE OP IT LANDED IS READ
      // OFF ITS OWN RETURN AND NOWHERE ELSE (`§2.7`). THE ENTRY'S `opId` IS THE ROW'S OWN VALUE FROM THE
      // INSTANT IT IS APPENDED — "THE OP THE REPAIR PRODUCED WHERE IT PRODUCED ONE, ELSE THE OP IT WAS
      // INVOKED FOR" (`kernel-surface.md §2.5` item 1's `repair-run` row) — so on EVERY arm the entry
      // names THE OP THIS EVALUATION CARRIED, and only the arm that produced an op rewrites it below.
      append(attempt, 'repair-run', pair.id, op.opId, 'the pair\'s repair was attempted');
      const entry = attempt.log[attempt.log.length - 1];
      let result;
      try {
        result = repair({
          address: attempt.address.slice(),
          id: pair.id,
          op,
          tier: context.tier,
          value: context.value,
          // **⟶ ADDED 2026-10-15 (`surface.md §2.11` clause 6; the architect's ruling of 2026-10-15;
          // `kernel-surface.md §2.3` item 2).** **THE REPAIR IS PASSED THE COMMIT IT IS PART OF**, and it is
          // passed THE ONE OBJECT THIS CALL HANDS IT — the context itself — *"so that they can make their
          // own write call use that commit"*: *"Repair functions are returned by the constraint that they
          // are triggered by. As externally-provided code, they should be using the package surface
          // functions, which means they will need to be passed the commit they are part of so that they can
          // make their own write call use that commit."* **THE FORM IS THE ONE `write`'s FOURTH POSITION
          // ADMITS** (`ORDINAL CORRECTED 2026-10-21`: the old `"fifth"` was the retired
          // `call(instance, verb, args)` dispatcher's ARRAY frame, deleted at
          // `export-set-and-dispatch.md §2`; `write`'s commit position is the FOURTH of the method's four,
          // `surface.md §2.2`'s `a.write(address, tier, value, commit?)`): **its class test is *"an object
          // position is a record position only where it CARRIES A
          // `pending` MEMBER whose value is present and not `undefined`"* (`§2.4` item 9 (g) item 1), and the
          // member this context carries is THE COMMIT'S OWN `pending`, VERBATIM — the record `K-2` returned,
          // the one `attempt.record` names, so the repair's write passes THE CONTEXT and the position reads
          // the commit it stands for. **IT IS A CLASS TEST AND NEVER AN IDENTITY TEST** (the position's own
          // clause), so a fresh list is handed and the record's own member is not aliased. **NO MEMBER OF
          // THE DECLARED FIVE IS MOVED**: `address` · `id` · `op` · `tier` · `value` stand as `§2.3` item 2
          // prints them, and the commit is carried beside them.
          pending: attempt.record === undefined ? [] : attempt.record.pending.slice(),
        });
      } catch (body) {
        // THE REPAIR-RUN ENTRY IS APPENDED BEFORE THE THROW, and the attempt's outcome entry carries
        // `KC-4` (`ck_states_a_repair_body_that_throws_reaches_the_caller_unconverted`).
        //
        // AND WHERE THE STORE'S OWN VERB REFUSED THE REPAIR'S EDIT, THE ENTRY'S `message` NAMES THE
        // STORE'S OWN CODE — `fail-surface.md §2`'s `KC-4` row's `observable` cell, read with `§1.2`
        // item 3: "THE KERNEL'S GENERIC DESCRIPTION OF THE ATTEMPTED REPAIR ALONE DOES NOT SATISFY IT,
        // AND THE CODE IS THE STORE'S OWN TOKEN — `WriteParentNotLink` in this unit's own repair window
        // — and never a kernel string and never a `KC` token." The body threw the store's own form up
        // through the kernel, so the code is read off that throwable's `status` and it is a STORE code
        // (the store's form is `{status, message}`, carrying no `log` member — `§1.2` item 2; the
        // kernel's own form carries three members, and a `KC` token is never named as a store code).
        // The entry's `state` stays `null`; the thrown form's `status` is `KC-4`.
        // **⟶ THE TEST THAT THIS THROWABLE IS *NOT* THE KERNEL'S OWN WAS `!('log' in body)`, AND THAT
        // TEST DIED ON 2026-10-16 WITH THE FLAT `log` RULING — THIS IS THE SECOND SITE THE RULING BROKE AND
        // IS REPORTED AS A FINDING, NOT SILENTLY REPAIRED.** The old test read *"the store's form carries two
        // members and the kernel's carries three, so a `log` member means the kernel built it"*. **`surface.md
        // §2.5` item 4 now puts `log` on EVERY failure the JS surface throws, so a STORE REFUSAL REACHING
        // THIS FRAME THROUGH THE PACKAGE CARRIES A `log` AND THE OLD TEST READ IT AS THE KERNEL'S OWN** —
        // measured: the two `S-JOIN` `WriteParentNotLink` cells went red with the caller's `status` reading
        // `WriteParentNotLink` instead of `KC-4`, because `storeCode` was answered `null` and the refusal fell
        // through to the unconverted `throw body` below.
        //
        // **THE REPLACEMENT IS THE SAME ONE THE ENTRY'S CROSSING TOOK — THE KERNEL'S OWN REFUSAL-CLASS MARK
        // AND NEVER A MEMBER'S PRESENCE** (`KERNEL_REFUSAL` above): a value this kernel built is marked, and
        // everything unmarked that carries a store code IS a store code, whatever members the surface has
        // attached to it on its way back. A `KC` token is still never a store code on either spelling.
        // **⟶ AND THAT CODE IS READ OFF THE THROWABLE'S OWN MEMBERS — `D-35`'s READ HALF, CLOSED
        // 2026-10-26.** `body` IS THE CALLER'S OWN THROWABLE (a repair body's throw). `body.status` was a
        // `[[Get]]` that walked the chain, so a prototype's `status` was read as a STORE CODE — measured: a
        // body throwing `Object.create({ status: 'WriteParentNotLink' })` made the write refuse
        // `WriteParentNotLink`, a store member the caller's prototype minted. **`ownMember` is
        // `[[GetOwnProperty]]`**, so the store code is read off the throwable's own bytes and an inherited one
        // is no code this kernel read: the throw crosses unconverted, exactly as an unmarked body's does.
        const bodyStatus = body !== null && typeof body === 'object' ? ownMember(body, 'status') : undefined;
        const storeCode = body !== null && typeof body === 'object'
          && isKernelRefusal(body) === false
          && typeof bodyStatus === 'string'
          && bodyStatus.length > 0
          && !KC_TOKENS.includes(bodyStatus)
          ? bodyStatus
          : null;
        if (storeCode !== null) {
          entry.message = `the repair ${pair.id} was attempted and the store refused its own edit — the `
            + `store's answer is ${storeCode}`;
          terminal(kernel, attempt, KC.repairFailed, entry.message);
          // **⟶ AND THE FORM THAT CROSSES TO THE CALLER IS THE KERNEL'S OWN** (`kernel-surface.md §2.3`
          // item 2 (iii): the attempt *"moves to `FAILING` with `KC-4`"*, and *"the thrown form's `status`
          // is NEVER a store member"*) — **the very form the FAILING arm above throws**, carrying the
          // store's own token in its MESSAGE and not in its `status` (§1.2 item 3). **A BODY WHOSE THROW
          // CARRIES NO STORE CODE REACHES THE CALLER UNCONVERTED**, below: the unconverted throw is that
          // body's own arm and this conversion is the refused-verb's.
          refuse(attempt.throwState, attempt.throwMessage, attempt.log);
        }
        terminal(kernel, attempt, KC.repairFailed, `the repair ${pair.id} threw; the attempt is closed`);
        throw body;
      }

      // THE REPAIR'S OWN RESULT — A CLOSED TWO-ARM SET (`PAR-C-8`), WHOSE SUCCESS ARM'S THIRD MEMBER
      // IS THE OP THE REPAIR LANDED. AN `ok === true` RETURN WHOSE `op` IS ABSENT, `undefined` OR NOT
      // THE OP THE REPAIR ACTUALLY LANDED HAS CARRIED NO OP AND IS THE APP'S OWN DEFECT: it is read as
      // a repair that produced no op, so it fails `KC-4` whether or not the pair's repair had been
      // recorded as applied (`§2.7`'s home; `§2.8`'s outside values; `A: docs/decisions.md` · `A110`).
      // **⟶ AND ITS `ok` AND `message` ARE THE RETURN'S OWN MEMBERS TOO — `D-35`'s READ HALF, 2026-10-26.**
      // `result` IS THE CALLER'S REPAIR RETURN. `result.ok` and `result.message` were chain reads, and the
      // measured consequence is the worst one in this file: a repair returning
      // `Object.create({ ok: true, op: <a real op> })` was CREDITED — its edit ADMITTED and its pair recorded
      // as applied — on two members standing on `Object.prototype`. **`ownMember` is `[[GetOwnProperty]]`**, so
      // an inherited `ok` is not an `ok` this kernel read: the return carries no op, the attempt takes arm
      // `(d)` and fails `KC-4`, which is the clause's own answer for *"a return carrying any other identity"*.
      const okMember = result !== null && typeof result === 'object' ? ownMember(result, 'ok') : undefined;
      const ok = okMember === true;
      const produced = ok ? landedOp(attempt, result, op) : null;
      if (produced === null) {
        const messageMember = result !== null && typeof result === 'object'
          ? ownMember(result, 'message')
          : undefined;
        const carried = ok
          ? landedOpDefect(attempt, pair, result)
          : okMember === false
            && typeof messageMember === 'string' && messageMember.length > 0
            ? messageMember
            : `the repair ${pair.id} produced no op at ${JSON.stringify(attempt.address)}`;
        entry.message = carried;
        return { terminal: { status: KC.repairFailed, message: carried }, rerun: false };
      }

      // THE OP THE REPAIR PRODUCED IS ADDED and the pair enters `appliedRepairs`. The attempt then
      // returns to the evaluation through THAT OP's OWN ATOMIC LANDING EVALUATION and the re-run.
      entry.opId = produced.opId;
      entry.message = `the repair ${pair.id} landed ${produced.opId}`;
      appendOwn(attempt.ops, produced);
      appendOwn(attempt.appliedRepairs, key);
      // THE LAYER (a) DELIVERY OF THIS RUN'S OWN HANDLES, ONE PER EVALUATED PAIR (`kernel-surface.md
      // §2.1` item 2; `§2.2` item 2): every handle this attempt's write returned that stands for a pair
      // THIS RUN evaluated has now been checked off as it passed — it was invoked in the kernel's own
      // window — so it leaves `CommitRecord.pending`, the member the caller's own loop reads its work
      // off, THAT LOOP BEING ONE INVOKER AMONG THE JS SURFACE'S ORDERED LAYERS AND NEVER THE ONLY ONE
      // (`A: docs/decisions.md` · `A112`). A handle whose pair this run did NOT evaluate STANDS IN THE
      // MEMBER for that caller's own loop, and is never delivered twice.
      releasePending(kernel, attempt, list);
      return { terminal: null, rerun: true };
    }
  }
  // A RUN THAT REACHES THIS LINE REACHED NO ARM INSIDE ITS LOOP: EVERY PAIR OF ITS OWN SNAPSHOT
  // RETURNED THE PASS ARM OR LANDED A REPAIR, and a landed repair returned `rerun: true` above, its op's
  // own landing evaluation following (`attempt-lifecycle.md §2.4` item 5 (i), (iv)).
  releasePending(kernel, attempt, list);
  // THE PASS ARM — EVERY PAIR OF THIS RUN'S OWN SET RETURNED THE PASS ARM, SO THE LANDING LEFT A VALID
  // STATE AND THE EVALUATION'S RESULT IS PINNED HERE, AT THE ATTEMPT'S OWN `checkpoint` MEMBER, AND AT
  // THAT LANDING'S OP (`composition-and-states.md §2.6` item 8 (i)–(ii), (iii); `kernel-surface.md §2.3`
  // item 1). A run whose pair set is EMPTY is still a pair set: it returns the pass arm vacuously and
  // PINS THE MEMBER AT THAT LANDING'S OP, so the `null` arm of item 8 (iii) is never that arm.
  //
  // AND THE VALUE IS ADDRESS-WIDE: THE CHECKPOINT IS "THE `opId` OF THE LAST LANDING THAT LEFT EVERY
  // REGISTERED PAIR AT THE ATTEMPT'S OWN ADDRESS PASSING", so the pin belongs to the attempt's ADDRESS —
  // a landing BESIDE it (a repair's op at a descendant address, whose pair set this attempt's scope does
  // not reach) pins no member of this attempt and moves nothing (`§2.6` item 8 (i)'s foreign-landing
  // clause; `VD-3`; `VD-6`). A violation arm returned above and therefore LEAVES THE MEMBER UNMOVED, so
  // an earlier pin survives a later landing that failed.
  // **⟶ THE CHECKPOINT'S COMPARISON IS STRUCTURAL AND SEGMENT-WISE, WITH `string` AND `number` DISTINGUISHED**
  // (`P: docs/pending.md · M-3` item (iv), verbatim). **NO OBSERVABLE MOVES**: the prefixes made exactly this
  // distinction, so a landing at `['a', 0]` and an attempt at `['a', '0']` are still DIFFERENT addresses.
  if (sameAddress(landing.address, attempt.address)) attempt.checkpoint = landing.opId;
  return { terminal: null, rerun: false };
}

/**
 * A RUN'S OWN LAYER (a) DELIVERY — one per evaluated pair, each carrying that pair's own function
 * (`kernel-surface.md §2.1` item 2; `§2.2` item 2). The handle each evaluated pair's registration stands
 * behind has now been invoked in the kernel's own window — THE PAIR'S PASS HAS CHECKED IT OFF AS IT
 * PASSED — so it has left the member BY ITS OWN PASS and it STILL STANDS in `triggered`, the store's own
 * returned set, which no removal ever reaches (`A: docs/decisions.md` · `A112`).
 *
 * **AND THE CHECK-OFF REMOVES EVERY OCCURRENCE OF THE IDENTITY IT EVALUATED — the entry's OWN pass is
 * the removal's warrant** (`surface.md §2.7` item 7 (a): the member is the returned set *"MINUS the
 * entries the pass checked off as they passed … AND MINUS NOTHING ELSE"*; `§2.4` item 8 (c): a body of
 * a checked-off identity run at the delivery instant is a FAILURE of that item). **THE SINGLE-OCCURRENCE
 * REMOVAL THIS SITE ONCE SHIPPED — `indexOf` + `splice`, one entry per evaluated pair — LEFT ONE
 * OCCURRENCE STANDING WHERE THE STORE'S OWN LIST CARRIED THAT IDENTITY TWICE** (the lawful
 * caller-spelled duplicate: two construction entries at one address carrying the caller's same token
 * resolve to ONE home entry and ONE handle, which the store returns TWICE — `DD-42` clause 3; `DD-39`;
 * `surface.md §2.4`'s dated clause (ii); `PAR-JS-15`), **so the residue delivered that identity's
 * function a second time AT THE DELIVERY INSTANT — an entry the pass checked off, delivered.** **THE
 * DISCARD BESIDE THIS SITE ALREADY REMOVES BY THE SET (`terminal`'s `filter` against the failed write's
 * own returned set, `:892`), and the check-off now removes by the identity it evaluated** — ONE warrant,
 * every occurrence of it, and NO occurrence counts as a second entry for a set the pass has passed.
 *
 * **⟶ AND WHAT THE CHECK-OFF CONSUMED IS RECORDED AS IT IS TAKEN** (`docs/decisions.md` · `A117` (D5)):
 * the removal below is `A117`'s *"check-off consumes the evaluated pair's own delivery of that identity"*
 * and it is NOT *"that identity's whole owed delivery"* — so the identity it took is pushed onto the
 * attempt's own `checkedOff` list, which the PASSING arm publishes onto the record (`publishCheckedOff`)
 * for the terminal arm's delivery to resolve exactly as it resolves the residue. **THE REMOVAL ITSELF IS
 * UNTOUCHED BY THE RECORDING** — same warrant, same by-identity extent, same member, `pending`-based
 * assertions intact.
 */
function releasePending(kernel, attempt, keys) {
  const record = attempt.record;
  if (record === undefined || keys === undefined) return;
  for (const key of keys) {
    const handle = kernel.handles.get(key);
    if (handle === undefined) continue;
    // **⟶ THE CHECK-OFF POPS: THE ENTRY IS REMOVED, AND THE FILTER COMPARES `entry.handle` AND NEVER `entry`**
    // (`P: docs/pending.md · (AA-7)`, verbatim: *"Pop from set to check off. Pending will only store the actual
    // still-pending steps"*; `P: docs/pending.md · P-7`'s `pending` ruling, item (2); `contract.md §2.4`
    // item 4; `trigger-and-pair.md §3` items 3–5). **UNDER POP NOTHING IS CARRIED BESIDE `pending`, so the
    // bare-handle union has no subject** — and `attempt.checkedOff` is therefore NOT written here any more
    // (`AA-7`'s own reading; `contract.md §2.4` item 5).
    record.pending = record.pending.filter((entry) => entry.handle !== handle);
  }
}

/**
 * **THE PASSING ARM'S OWN PUBLICATION — `A117` (D5)'s finding PLACED ON THE RECORD THE TERMINAL ARM
 * HANDS TO THE INSTANCE'S SEAM.**
 *
 * It is called at `runAttempt`'s success arm, AFTER the attempt is CLOSED and BEFORE `settleArm`, and it
 * is called THERE and on NO FAILING ARM (`terminal`'s arm reaches none of this): on a write that fails on
 * constraints the other listeners are DISCARDED (`§2.7` item 6 read at item 7 (d); `A114` (D1)/(D2)), so
 * the arm's residue is empty AND a checked-off identity stands for NO delivery, its body never run — the
 * failing arm stays `0` of the failed write's own set and `0` for the identity too.
 *
 * **THE KEY IS A SYMBOL** (`CHECKED_OFF` above): `CommitRecord` keeps its four members (`A117` (D6)), the
 * record's enumerable shape does not move, and every census that reads a record's members reads them
 * through the same four.
 */
function publishCheckedOff(attempt) {
  // **⟶ UNDER POP IT PUBLISHES NOTHING — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`).** **The entry a
  // check-off removes is REMOVED from `pending`, so nothing is carried beside it and the bare-handle union
  // has no subject** (`P: docs/pending.md · (AA-7)`, verbatim; `contract.md §2.4` item 5; `trigger-and-pair.md
  // §3` item 3). **THE THIRD SITE THAT CARRIED THE UNION IS NAMED WITH THE OTHER TWO**: `releasePending`'s push
  // into `checkedOff` and the terminal arm's re-append of bare handles are the two, and this is the third —
  // **all three have no subject under POP**, so the symbol key is left UNWRITTEN and the record keeps its FOUR
  // members (`A117` (D6)).
  //
  // **AND THE OWED FIRING IS UNMOVED**: `A117` (D5)/(D6) already holds that an owed firing's home is THE
  // REGISTRY'S RESOLUTION OF ITS IDENTITY, so a popped identity's firing is still reached at the delivery
  // instant (`contract.md §2.4` item 4).
  return attempt;
}

/** `PAR-C-5`'s outside value, read as the `{message}` arm with the KERNEL's own generated sentence.
 *
 *  **⟶ CORRECTED 2026-10-26 ON THE DOWNSTREAM `DEF-Q` ROW: THE SENTENCE'S ADDRESS SLOT IS READ OFF THE MEMBER
 *  THE REGISTRY ROW ACTUALLY CARRIES.**
 *
 *  **THE DEFECT, MEASURED AT BOTH ENTRIES THIS SENTENCE REACHES.** The bytes this return replaced were
 *  ``+ `${JSON.stringify(pair.address)}` ``, and **the kernel's registry row carries NO `address` member at
 *  all** — `kernel.pairs`' value is `{ addresses, id, constraint }` (`kernelFor` above; `contract.md §2.6`
 *  item 4's *"one pair, N registry rows"*), while `address` is the member the CALLER's registration pair and
 *  the `constraints()` ELEMENT spell. **So the slot read `undefined`**, and the sentence reached the caller
 *  twice through `evaluate` — once on the `constraint-check` entry the pass was writing (`check.message`) and
 *  once in the `outcome` entry `terminal` appends carrying that same text — as
 *  *"… outside the three declared outcome arms at undefined"*, **a member the entry no longer prints while the
 *  pair still carries it.**
 *
 *  **WHICH RENDERING, AND WHERE THE DECLARATION FIXES IT.** The row's address member is the SET
 *  (`addresses` — `contract.md §2.6` item 5: *"`address`: THE ADDRESS SET the pair was created with — and, at
 *  the REGISTRATION act, a single address"*), and **this sentence's slot is ONE address and not the set**:
 *  the kernel declares that reading once, at `pairSpelling` (`kernel-foundations.mjs`), whose own sentence
 *  spells *"the address's segments joined by `/`"* off **`pair.addresses[0]`** — the pair's first address —
 *  and never off the whole set. **AND EVERY SIBLING `at <address>` SENTENCE IN THIS FILE IS THE SINGLE-ADDRESS
 *  SHAPE**: `JSON.stringify(attempt.address)` at the `passed`, `produced no op`, `save` and `commit` arms.
 *  **SO THE SET FORM `[["a"]]` IS NOT THIS SLOT'S RENDERING AND `["a"]` IS** — the same one-address rendering,
 *  read off a member the row really holds, and no member of the sentence moves. */
function unrecognized(pair) {
  return `the constraint ${pair.id} returned a value outside the three declared outcome arms at `
    + `${JSON.stringify(pair.addresses[0])}`;
}

