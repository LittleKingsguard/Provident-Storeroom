// RE-DERIVED SET — `U-STOREROOM-CONSTRAINTS`, THE MALFORMED-CELL RE-DERIVATION OF THE GATE-6 CELLS ON
// THE `null`-`checkpoint` ROLLBACK TARGET AND ON THE POST-FAILURE ADDRESS (the `A111` landing pass).
//
// ── THE RULING, AND THE CLAIM IT WITHDRAWS BY NAME ────────────────────────────────────────────────
//
// `docs/decisions.md`'s ACTIVE row **`A111`** (the architect's gate-6 ruling of 2026-10-13): **"THE
// FAILED COMMIT'S PRE-STATE CLAIM IS WITHDRAWN BY NAME IN `U-STOREROOM-CONSTRAINTS`"** — a failed commit
// at an address the caller already wrote to **UNDOES THE CALLER'S OWN EARLIER WRITE THERE** — because the
// store's own rollback scope (`docs/specs/storeroom-native/write-and-read.md §6.4` items 1/3/4 — `M-5`
// subtree scope, `M-7` backward walk to the OLDEST entry, `M-8` totality) sweeps the whole subtree back
// to the oldest entry **for ANY op the kernel may lawfully pass**, and **NO COMMIT-LEVEL ROLLBACK
// EXISTS** (the per-op store verb is mandated, `§2.6` item 1). The reading is recorded as a STANDING
// LIMIT of the closed caller-side surface and **`OWED`** to the store-side pass `J-20`–`J-22`
// (`contract.md §0.1` item 5 (i)): **no clause of the unit claims the pre-state until that row lands.**
// TWO CELLS OF THIS FILE WERE WRITTEN AGAINST THE WITHDRAWN CLAIM and are re-derived here, at their
// bytes, by their author role, with no re-freeze (`D-GP-SVM-4` outcome (a)).
//
// DERIVED FROM THE RE-SPELLED CLAUSES ALONE, EACH CITED BESIDE ITS ASSERTION:
//   · `composition-and-states.md §2.6` item 8 (iii) — at this member's ONE home: *"the attempt's FIRST
//     OP ALONE"*, the single call, the worked example that read that one call as leaving an earlier
//     write at the address standing, and the duty that no such earlier write is ever left
//     `AddressNotFound` are ALL **WITHDRAWN BY NAME AND NOT RETAINED BESIDE THAT CLAUSE**; the STANDING
//     LIMIT is printed there in the ruling's own words, and the pre-state claim is `OWED` there.
//   · `composition-and-states.md §2.6` item 2 — **THE CALL LIST IS THE STANDING LAW**: the repaired ops
//     first, in REVERSE of the order they were created, and the attempt's first write's op LAST; and on
//     the `null` arm the call list is **ITEM 2'S OWN — THE WHOLE LIST**.
//   · `composition-and-states.md §2.6` item 5 (a) — the ONE thing that shortens the performed set: an op
//     an earlier call's own returned `undoneOps` member already reports undone is NOT still owed, so no
//     call is issued over it and no step stands for it; the step count is the calls ISSUED.
//   · `composition-and-states.md §2.6` item 3 — the `RollbackStep`'s six members, `opId` being the opId
//     the kernel PASSED, echoed; `restoredTo` the store's own member.
//   · `composition-and-states.md §2.6` items 5 (b) and 6 (a), (c) — the FLOOR: a still-owed op's call
//     meeting `RollbackCompacted`/`JournalOpUnknown` is `KC-8`, answered in the attempt's ONE `outcome`
//     entry whose message names the STORE'S own code and the op whose call met the floor, and nothing is
//     restored past the compacted base.
//   · `contract.md §5.7`'s `P-TP-7` — its re-derived call-list limb, its `S-ROLLBACK-PER-OP` /
//     `S-ROLLBACK-TARGET` rows, and its FAILURE LIST's named one: **"NO COMPOSITION OF THIS KERNEL LEAVES
//     THE CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S ADDRESS STANDING."**
//   · `fail-surface.md §2`'s `KC-7` row (the residue is not a live attempt; a later `K-2` reaches its
//     write verb) and its `KC-8` row (the floor's token and its one `outcome` entry) — the two rows the
//     post-failure-address cells read.
//   · `fail-surface.md §2`'s `KC-4` row's `observable` cell — the repair-refused path's `message` NAMES
//     the store's own token (the duty's ONE home; `§1.2` item 3).
//
// ── ▸ TWO RESIDUAL LIMBS, REPORTED AND NEVER ASSERTED (a finding, not a cell) ─────────────────────
//
// `composition-and-states.md §2.6` item 8 (iii)'s `⟶` paragraph and `contract.md §5.7`'s `null`-arm
// sentences STILL SPELL THE WITHDRAWN CLAIM at their bytes, beside the withdrawal that names it:
// *"THE OP PASSED TO THE STORE'S `rollback` IS `op-3` … `op-2` STANDS, AND THE ADDRESS MUST READ THE
// CALLER'S OWN EARLIER VALUE … AND NEVER `AddressNotFound`"*; *"the call list under that member being
// that one op alone"*; *"the op the walk BEGINS over is the list's last entry"*. THAT READING IS NOT
// SATISFIABLE, measured on this checkout through the package's own verbs: `rollback()` over the
// attempt's own first op AND over its repair's op alike report `undoneOps: ["op-3","op-2","op-1"]` and
// leave the address answering the store's own `AddressNotFound`, and any second call over an op the
// first already swept is answered `RollbackCompacted` (`A111`'s own finding; gate-6 evidence
// `scratch/live-constraints-gate6-out.txt`). THE CLAUSES THIS FILE DERIVES FROM ARE THEREFORE THE
// STANDING LIMIT, ITEM 2'S CALL LIST AND THE STORE'S FLOOR — the residual limbs are reported to the
// supervisor, and NO CELL BELOW ASSERTS THEM.
//
// ── THE STATES ENUMERATED BEFORE THE TESTS ────────────────────────────────────────────────────────
//
// THE `null` ARM'S PERFORMED CALLS (item 2 + item 5 (a)) — the states this file drives, each read off a
// DECLARED member and never off the store's internals:
//   (1) an attempt whose window passed NO checkpoint — no landing at its address left every registered
//       pair there passing, so every step's `checkpoint` member reads `null` — and whose address HELD A
//       VALUE the CALLER wrote before the attempt: a PRE-EXISTING op stands in the journal beneath the
//       attempt's own ops. The ruled end state is the store's own reach: that earlier write is UNDONE.
//   (2) the same window with NO pre-existing write: the address's pre-attempt state is the store's own
//       absence, and it is that absence the composition's own reach leaves standing.
//   (3) the two-op failing attempt (a repair lands one op; the re-run violates a pair carrying no repair)
//       — the composition's own performed calls are the `rollback` member, and the skip is the store's
//       own `undoneOps` report.
//   (4) a FAILED attempt's residue at its address — the commit registry's own entry, holding the ops
//       that attempt never undid — followed by a LATER `K-2` at that address, and then by that second
//       attempt's own terminal arm.
//   (5) the repair-refused window: the store's own verb refuses the repair's edit before any op exists.
//
// ── THE SIX CELLS, ONE LINE EACH, WITH ITS STATE AND ITS CLAUSE ───────────────────────────────────
// **⟶ EVERY LINE BELOW IS RE-DERIVED AT THE TEMPORAL-STOP PASS OF 2026-10-16 (`role_test_writer`), TO
// `write-and-read.md §6.4` item 1's amended `M-5` and item 3's amended `M-7` and to
// `composition-and-states.md §2.6` item 5 (a)'s and item 8 (iii)'s dated clauses of the same date.** The
// two architect's rulings, both VERBATIM and both of that date: *"Add temporal stop to the rollback."* and
// *"Overshoot is a defect."*
//   1  `ck_constraint_null_arm_the_calls_are_item_2_s_list_minus_the_ops_the_store_reported_undone` — a
//      two-op failing window at one address, `null` `checkpoint` on every step: the steps' own `opId`s
//      are the ops the kernel PASSED, and they are EXACTLY item 2's list minus the ops an earlier step's
//      own `undoneOps` member reports undone. `composition-and-states.md §2.6` items 2 and 5 (a);
//      `contract.md §5.7`'s `P-TP-7`. **(B) — THE VALUE MOVED: `KC-6` → `KC-8`**, the store's performed
//      set being narrower so the second call IS issued and meets the residue (item 5 (a)'s dated clause).
//   2  `ck_constraint_null_arm_holds_at_a_fresh_address_where_the_pre_state_is_absence` — the same law
//      on the other data state the `null` arm names: an address that held NOTHING before the attempt, its
//      end state read through the store's own verb. `§2.6` items 2 and 5 (a); item 8 (iii)'s own words
//      ("THE IDENTITY IS COMPUTABLE FROM WHAT A CALLER-SIDE KERNEL HOLDS"); `§5.7`. **(B) — THE VALUE
//      MOVED: the end state is the commit's own value, `M-6`'s all-or-nothing floor having undone
//      nothing**, in place of the store's absence.
//   3  `ck_constraint_a_failed_attempt_at_an_address_the_caller_already_wrote_undoes_that_addresss_own_entry`
//      — **THE OVERSHOOT PROPERTY, THIS FILE'S ONE (A) CELL: THE SUBJECT MOVED AND THE ASSERTION WITH IT.**
//      The caller's own earlier op is never PASSED and is **NEVER REPORTED UNDONE** (the seed STANDS, and
//      `AddressNotFound` is the WITHDRAWN answer), the seed's own `seq` being strictly BELOW the temporal
//      floor. `write-and-read.md §6.4` item 1's amended `M-5` (a) (ii) and its own stated observable; item
//      3's `M-7` amendment; `composition-and-states.md §2.6` item 8 (iii), which withdrew the standing
//      limit at its own cell and kept the gate-6 run as the defect's reproduction.
//   4  `ck_constraint_a_later_commit_at_a_failed_attempts_address_returns_a_fresh_record` — `W2`'s `K-2`
//      layer: a later `K-2` at a failed attempt's address returns a FRESH record, throws no `KC-7`, and
//      its write verb is REACHED. `fail-surface.md §2`'s `KC-7` row; `kernel-surface.md §2.1` item 2.
//      LIST-INDEPENDENT (its window's attempt holds ONE op) and UNMOVED by the amendment.
//   5  `ck_constraint_a_second_attempt_at_a_failed_attempts_address_leaves_the_older_compacted_residue_out_of_scope_and_closes_KC3`
//      — **RENAMED AND (A)-SORTED: the first attempt's compacted residue is BELOW the second attempt's
//      temporal floor, so the two floors' declared order excludes it before `M-6` looks at it** — the
//      walk performs, reverses its own op and returns `KC-3`. `write-and-read.md §6.4` item 1's amended
//      `M-5` (a) (ii) and item 2's dated neighbour (the temporal floor bounds the set FIRST); `§2.6`
//      items 5 (b) and 6; `fail-surface.md §2`'s `KC-3` and `KC-8` rows. **The in-scope compacted case —
//      where the floor IS met — is driven at `ck_neg_3` and `ck_p_neg_20`.**
//   6  `ck_constraint_a_store_refused_repair_has_its_own_token_named_in_the_repair_run_entry` — `W3`(e):
//      the refusal path's ONE `repair-run` entry NAMES the store's own `WriteParentNotLink`.
//      `fail-surface.md §2`'s `KC-4` row's `observable` cell (`§1.2` item 3); `E2E-C-13` (β). UNMOVED.
//
// THE FAIL-STATES THIS FILE PINS (each the clause's own falsifier):
//   · a call list that is NOT item 2's — the withdrawn single-op reading, which passes the attempt's own
//     first write FIRST and drops every other op of `ops` from the list;
//   · a call issued over an op an earlier step's own `undoneOps` member already reports undone (the
//     state the live run's `E2E-C-2.7` reached, answered `RollbackCompacted` where no floor belonged);
//   · a step whose `opId` is not an op the attempt itself created (an op older than the attempt passed
//     to the store verb);
//   · **THE OVERSHOOT: an entry older than the named op reversed by a rollback over it** — the state
//     `M-7`'s amendment declares FORBIDDEN BY CLAUSE and the architect's second ruling names a DEFECT;
//     read at the seed's own absence from every `undoneOps` member and at the address not answering the
//     store's `AddressNotFound` where the seed stood;
//   · a later `K-2` at an address a failed attempt has left behind that is refused, or whose write verb
//     is never reached;
//   · a second attempt whose walk REVERSES THE FIRST ATTEMPT'S OLDER RESIDUE, or whose `outcome` entry
//     is a SECOND entry, or whose `restoredTo` disagrees with the store's own read;
//   · a `repair-run` entry whose `message` does not name the store's own token where the store refused.
//
// ── ▸ WHAT IS RED AND WHAT IS GREEN, MEASURED AT THIS PASS (no narration; read this before the cells)
//
// **⟶ RE-MEASURED 2026-10-16 (`role_test_writer`) AGAINST THE AMENDED SCOPE, AND THE THREE BULLETS BELOW
// REPLACE THE READINGS THE SUPERSEDED ADDRESS-WIDE REACH PRODUCED.** The build this file is measured
// against now implements `M-5` (a) (ii): a call reverses only entries with `E.seq` ≥ its OWN named op's
// `seq`. Measured on this checkout, at the package's own verbs:
//
//   · **THE OVERSHOOT IS GONE, AND THAT IS THE MEASUREMENT CELL 3 PINS.** A drive that seeds `['k']`,
//     arms a passing constraint, writes a violating value and observes the rollback finds **THE SEED
//     STILL READS** — `restoredTo` answers the seed and the caller's own `read` answers it too — where the
//     superseded reach reported `undoneOps: ["op-4","op-3","op-2"]` and left the address absent. That
//     gate-6 observation is **RETAINED BY THE SPEC AS THE DEFECT'S OWN REPRODUCTION AND NO LONGER A
//     WARRANT** (`composition-and-states.md §2.6` item 8 (iii)), and a drive reproducing it FAILS.
//   · **THE PERFORMED SET IS NARROWER, SO ITEM 5 (a)'s SKIP FIRES LESS.** A first call over the repair's
//     op reports ONLY that op undone. Item 2 puts the repair's op FIRST and the attempt's first write
//     LAST, and the first write's `seq` is LESS than the repair's — so the first call does NOT sweep it.
//     It is therefore STILL OWED and GETS ITS OWN CALL, which meets the residue the first call left
//     (`M-9`) and `M-6`'s floor — `KC-8`, with NOTHING undone. **This is why cells 1, 2 and 3 read
//     `KC-8`: the arm moved and the store's answer with it, while the skip's OBSERVABLE — the kernel reads
//     only `undoneOps` and reasons about no mark — did not move at all** (`§2.6` item 5 (a)'s dated
//     clause of 2026-10-16).
//   · **A COMPACTED RESIDUE OLDER THAN A LATER ATTEMPT'S OWN OP IS OUT OF SCOPE AND CANNOT FAIL IT.** The
//     second attempt at a failed attempt's address therefore RUNS ITS COMPOSITION TO COMPLETION — one call,
//     `failed: false`, its own op reversed — and closes `KC-3` (cell 5). The two floors' order is the
//     spec's own: **"THE TEMPORAL FLOOR BOUNDS THE CANDIDATE SET FIRST, AND THE COMPACTED PREDICATE IS THEN
//     EVALUATED OVER THAT BOUNDED SET"** (`§6.4` item 2's dated neighbour), whose stated consequence is
//     that an older compacted entry *"CANNOT FAIL ONE"*. **THE FLOOR IS NOT WEAKENED, AND THE IN-SCOPE
//     COMPACTED CASE — where a call's bounded candidate set DOES hold a compacted entry — is driven at
//     `constraint-kernel-negatives.test.mjs`'s `ck_p_neg_20` and at
//     `constraint-kernel-states.test.mjs`'s `ck_neg_3`, both of which place the compacted entry AT OR
//     AFTER the named op.**
//
// THE FIXTURE RULE IS THE UNIT'S (`kernel-surface.md §1` item 1): every store is the package's own
// `storeCreate(cfg)` through the shared helper, and no drive reaches a store another way. NOTHING HERE
// IS DRIVEN THROUGH THE REGISTER'S `row()` HARNESS, so the register's `27` declared ids, the `21`-row
// cell count and the `21 × 19 = 399 <= 400` budget arithmetic MOVE NOT ONE TERM: the re-derivation
// renames cells and re-aims their assertions, adds no cell, removes none, and the file's own six cells
// stay six. The `KC` census stays `8` members on `13` sites (`2 + 2 + 2 + 1 + 1 = 8`;
// `1 + 4 + 4 + 3 + 1 = 13`): no cell here mints a member, and every token it reads is one of the eight.

import test from 'node:test';
import assert from 'node:assert/strict';

// ⟶ RESHAPED: the package namespace carries ONE name (`surface.md §2.9` item 1's `A127` clause; `11 → 1`).

import {
  kernel, makeStore, tag, KC,
  assertKernelForm, assertAttemptReport, assertRollbackStep, assertStoreRefusal,
  capture, entries,
  passAtRegistration,
} from './constraint-kernel-helpers.mjs';

/** The store's own read, captured without conflating "returned" with "refused" (`§6.4`). */
function readAt(store, address) {
  try {
    return { threw: false, value: store.read(address) };
  } catch (thrown) {
    return { threw: true, thrown };
  }
}

/**
 * ITEM 2'S OWN CALL LIST FOR AN ATTEMPT THAT PASSED NO CHECKPOINT (`composition-and-states.md §2.6`
 * item 2, at its bytes): **"the repaired ops first, in REVERSE of the order they were created, and the
 * attempt's first write's op LAST"** — the repaired ops being ALL the ops in `ops` other than the
 * attempt's first write's op — **"so the composition is `ops` minus its first entry, reversed, then that
 * first entry last"**. `created` is the attempt's own creation record, `ops[0]` being the attempt's
 * FIRST WRITE'S OP (`§2.6` item 2's total order over `ops`).
 */
function item2CallList(created) {
  return created.slice(1).reverse().concat([created[0]]);
}

/**
 * THE COMPOSITION'S PERFORMED CALLS, DERIVED FROM TWO DECLARED THINGS AND FROM NOTHING ELSE:
 * item 2's call list above, and item 5 (a)'s ONE shortening rule — **"an op already reported undone by
 * an earlier call's own `undoneOps` member is NOT A STILL-OWED OP"**, so no call is issued over it and
 * **"no step stands for it"**, the step count being **"the number of calls ISSUED"**.
 *
 * **⟶ RE-DERIVED 2026-10-16 TO THE AMENDED SCOPE, AND THE RULE ABOVE IS UNCHANGED — WHAT MOVED IS THE SET
 * THE STORE'S `undoneOps` MEMBER REPORTS.** `composition-and-states.md §2.6` item 5 (a)'s dated clause of
 * that date, at its bytes: **"THE SKIP'S OBSERVABLE THEREFORE DOES NOT MOVE: the kernel still reads only
 * the returned `undoneOps` member and still reasons about no mark — the member reports what the store
 * PERFORMED, and what the store performed is narrower now"** — read with **"a still-owed op that an earlier
 * call's `undoneOps` member does NOT report was NOT undone by that call AND GETS ITS OWN CALL — the store
 * no longer sweeps an entry older than the op it was called over, so absence from `undoneOps` is evidence
 * of nothing beyond the store's performed set"** (`write-and-read.md §6.4` item 1's `M-5` amendment (a)
 * (ii): a call reverses only entries with `E.seq` ≥ its own named op's `seq`).
 *
 * So the assertion is an EQUALITY over the whole sequence, not a subset: walking item 2's list in its
 * own order, each op is either
 *   (i) the next performed call — the step's `opId`, which `§2.6` item 3 declares to be the opId the
 *       kernel PASSED, echoed — in which case that step's own returned `undoneOps` member extends the
 *       performed set; or
 *   (ii) an op an earlier step's `undoneOps` member ALREADY reports undone — skipped, no call, no step;
 * and no third case exists. It also reads item 5 (a)'s own prohibition — **"A CALL ALREADY PERFORMED IS
 * NEVER PERFORMED AGAIN"** — on the step it would falsify.
 *
 * A build that passes the attempt's own first write FIRST (the single-op reading `A111` withdrew), or
 * that issues a call over an op an earlier call already swept (the live run's `E2E-C-2.7`), FAILS here.
 * **AND UNDER THE AMENDED SCOPE THE SECOND DISJUNCT IS NARROWER, NOT WEAKER: an op the older reach swept
 * is now NOT in any call's `undoneOps` and therefore GETS its own call, which is exactly what this
 * function requires of it.**
 */
function assertPerformedCallsAreItem2CallList(created, steps, where) {
  const list = item2CallList(created);
  const performed = [];
  let at = 0;
  for (const opId of list) {
    if (at < steps.length && steps[at].opId === opId) {
      assert.equal(performed.includes(opId), false,
        `${where}: a call was ISSUED over the op ${opId}, which an earlier step's own \`undoneOps\` `
        + 'member ALREADY REPORTS UNDONE — that op is not still owed, so no call is issued over it and no '
        + `step stands for it (\`§2.6\` item 5 (a)); read the performed calls `
        + `${JSON.stringify(steps.map((s) => s.opId))}`);
      for (const undone of steps[at].undoneOps) {
        if (!performed.includes(undone)) performed.push(undone);
      }
      at += 1;
      continue;
    }
    assert.equal(performed.includes(opId), true,
      `${where}: item 2's call list holds the still-owed op ${opId}, and NO CALL WAS ISSUED OVER IT and no `
      + "earlier call's `undoneOps` member reports it undone — the performed calls are "
      + `${JSON.stringify(steps.map((s) => s.opId))} against item 2's list ${JSON.stringify(list)}; `
      + '`composition-and-states.md §2.6` item 2 (the repaired ops first, in REVERSE of their creation, '
      + "the attempt's first write's op LAST) and item 5 (a) (ONE CALL PER STILL-OWED OP, IN THAT ORDER)");
  }
  assert.equal(at, steps.length,
    `${where}: the performed calls are EXACTLY item 2's list minus the ops a step's own \`undoneOps\` `
    + `member reports undone — read ${JSON.stringify(steps.map((s) => s.opId))} against item 2's list `
    + `${JSON.stringify(list)}`);
}

/**
 * ONE TWO-OP FAILING WINDOW, BUILT ON `e2e-scenarios.md`'s `E2E-C-2` (its own single-violation rule
 * read at its bytes: "the window that drives a two-op failing attempt is one whose FIRST violation is
 * the repairable pair's"): `x` PASSES on the committed value and is VIOLATED by the value `y`'s repair
 * writes; `y` registers the repair; `x` carries NO repair, so the re-run violates `x` while `x` is IN
 * `ran` and NOT in `appliedRepairs` — arm `(f)`, `KC-6`. TWO ops stand at ONE address, the attempt's
 * first write FIRST and the repair's op SECOND, and every step's `checkpoint` is `null` (item 8 (iii)'s
 * ADDRESS-WIDE rule: no landing at that address left every registered pair there passing).
 */
function twoOpFailingWindow(register, store, address) {
  register(store, address, 'x', (ctx) => (ctx.value === 'repaired'
    ? { message: 'x is violated by the value the repair landed' }
    : true));
  register(store, address, 'y', (ctx) => (ctx.value === 'committed'
    ? {
      // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6; `PAR-C-7`).
      repair: (rctx) => ({
        ok: true,
        message: 'y was repaired by the op this repair landed',
        op: store.write(address, 'mem', 'repaired', rctx).op,
      }),
      message: 'y is violated by the committed value',
    }
    : true));
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// 1 — THE `null` ARM'S PERFORMED CALLS: ITEM 2'S CALL LIST MINUS WHAT THE STORE REPORTED UNDONE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSES, AT THEIR BYTES. `composition-and-states.md §2.6` item 2: **"the repaired ops first, in
 * REVERSE of the order they were created, and the attempt's first write's op LAST"** — so the
 * composition **"is `ops` minus its first entry, reversed, then that first entry last, and the order is
 * TOTAL over `ops`"** — read on the `null` arm with item 2's own sentence there: **"WHERE THE ATTEMPT
 * PASSED NO CHECKPOINT, THE CALL LIST IS ITEM 2'S OWN — THE WHOLE LIST"**, the sentence that once read
 * that arm as *"THE ATTEMPT'S OWN FIRST OP ALONE"* being WITHDRAWN BY NAME (`A111`). And item 5 (a):
 * **"ONE CALL PER STILL-OWED OP, IN THE ORDER ITEM 2 DECLARES, AND A CALL ALREADY PERFORMED IS NEVER
 * PERFORMED AGAIN"** — the list being **"a COMPOSITION-TIME list, holding every still-owed op exactly
 * once"**, the ONE shortening rule being the store's own member: **"an op already reported undone by an
 * earlier call's own `undoneOps` member is NOT A STILL-OWED OP … the step count stays the number of calls
 * ISSUED."**
 *
 * THE MEMBER EACH ASSERTION READS: `RollbackStep.opId` — `§2.6` item 3 declares it to be **"the opId the
 * kernel PASSED to that call, echoed"** — and the step's `undoneOps`, the store's own report of the
 * reversals that call PERFORMED, which is the only thing item 5 (a)'s skip predicate may be decided by.
 *
 * STATES ENUMERATED FIRST: (1) a two-op failing attempt at ONE address, with NO caller write before it,
 * its window having passed NO checkpoint (`checkpoint` reads `null` on every step); (2) the attempt's own
 * creation record `ops` — `ops[0]` its first write's op, `ops[1]` the op its own repair landed (item 2's
 * total order); (3) the composition's performed calls, in performed order, read against item 2's list.
 *
 * FAIL STATES: a call list that is NOT item 2's — the withdrawn single-op reading, which passes the
 * attempt's own first write FIRST and reaches one call where the list holds two; a call issued over an
 * op an earlier step's `undoneOps` member already reports undone (the state the live run's
 * `E2E-C-2.7` reached, answered `RollbackCompacted` where no floor belonged); a step whose `opId` is an
 * op the attempt did not create; an attempt whose own ops are not all reported undone; a `checkpoint`
 * member that is non-`null` on a window the clause places in the `null` arm.
 */
test('ck_constraint_null_arm_the_calls_are_item_2_s_list_minus_the_ops_the_store_reported_undone', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 64 });
  const address = [tag('ckc1')];
  twoOpFailingWindow(register, store, address);
  const record = commit(store, address, 'mem', 'committed');
  const r = capture(() => runAttempt(store, record));
  assert.equal(r.threw, true, 'the window fails its attempt (arm (f) at the re-run)');
  assert.equal(r.thrown.status, KC[8],
    '⟶ RE-DERIVED 2026-10-16 — THE TOKEN MOVES `KC-6` → `KC-8` AND THE CELL\'S OWN SUBJECT IS KEPT. '
    + 'THE MECHANISM, AT THE AMENDED CLAUSES: the composition\'s first call is item 2\'s first member (the '
    + 'repair\'s op), and the store now reverses ONLY entries at or after that op — "`E.seq` ≥ THE NAMED '
    + 'OP\'S OWN `seq`" (`write-and-read.md §6.4` item 1\'s amended `M-5` (a) (ii)) — so the attempt\'s own '
    + 'first write\'s op is NO LONGER swept by that call and DOES NOT STAND IN ITS `undoneOps` MEMBER. '
    + 'Item 5 (a)\'s skip is decided by that member and by nothing else, so the second call IS ISSUED over '
    + 'a still-owed op; the op the first call reversed now carries the `compacted` mark (`M-9`\'s residue), '
    + 'and `M-6` fails any rollback whose TEMPORALLY BOUNDED candidate set includes it — `RollbackCompacted` '
    + '— which item 5 (b) makes `KC-8`. **THE SKIP\'S OBSERVABLE DID NOT MOVE; ITS REPORTED SET NARROWED**, '
    + 'and this token is the observable that narrowness produces: `composition-and-states.md §2.6` item 5 '
    + '(a)\'s dated clause of 2026-10-16, "the member reports what the store PERFORMED, and what the store '
    + 'performed is narrower now", and its named consequence, "a still-owed op that an earlier call\'s '
    + '`undoneOps` member does NOT report was NOT undone by that call AND GETS ITS OWN CALL". A build still '
    + 'sweeping the older entry would answer `KC-6` here AND would have found the overshoot the architect\'s '
    + 'second ruling names a DEFECT — read ' + JSON.stringify(r.thrown.status));
  const closed = report(store, record.attempt);
  assertAttemptReport(closed, 'the closed attempt of the two-op window');
  const created = closed.ops.map((o) => o.opId);
  assert.equal(created.length, 2,
    'THE DRIVE PRODUCED THE TWO OPS THE CLAUSE\'S OWN WINDOW CARRIES: the attempt\'s first write and the '
    + `op its repair landed — read ${created.length} (${JSON.stringify(created)})`);
  assert.equal(created[0], record.op.opId,
    'and `ops[0]` IS the attempt\'s first write\'s own op, read off `K-2`\'s returned `CommitRecord.op`; '
    + '`composition-and-states.md §2.6` item 2\'s total order puts the first write\'s op LAST in the call '
    + 'list, so its POSITION IN `ops` and not in that list is what names it as the earliest-created');
  assert.ok(closed.rollback.length >= 1,
    'the composition PERFORMED at least one call — `S-ROLLBACK-PER-OP`: "AT LEAST ONE AND NEVER NONE ON '
    + 'EVERY FAILURE ARM WHOSE COMPOSITION HAS AT LEAST ONE STILL-OWED OP"');
  for (const step of closed.rollback) {
    assertRollbackStep(step, 'a performed call of the composition');
    assert.equal(step.checkpoint, null,
      'THE NO-CHECKPOINT ARM, READ ADDRESS-WIDE: no landing at the attempt\'s own address ever left every '
      + 'registered pair there passing, so the member is `null` — read ' + JSON.stringify(step.checkpoint)
      + '; `§2.6` item 8 (iii), "`null` WHERE NO SUCH LANDING EXISTS FOR THAT ADDRESS — ADDRESS-WIDE"');
    assert.equal(created.includes(step.opId), true,
      'AND NO STEP NAMES AN OP THE ATTEMPT DID NOT CREATE: the op passed to the store verb is one this '
      + `attempt\'s own record holds — read ${JSON.stringify(step.opId)} against ${JSON.stringify(created)}`);
  }
  // ── THE CALL LIST, DERIVED AND NOT GUESSED: item 2's order, minus item 5 (a)'s skip. THIS IS THE
  // SHARP ASSERTION OF THIS CELL, and the one the build measured here fails: the performed calls must be
  // item 2's list — the repair's op FIRST, the attempt's first write LAST — filtered by the store's own
  // `undoneOps` report, and no call may be issued over an op an earlier step already reports undone.
  assertPerformedCallsAreItem2CallList(created, closed.rollback, 'the null arm\'s composition');
  const performed = closed.rollback.map((s) => s.opId);
  assert.equal(new Set(performed).size, performed.length,
    'and no op is passed twice — `§2.6` item 5 (a): "A CALL ALREADY PERFORMED IS NEVER PERFORMED AGAIN"');
  const swept = closed.rollback.flatMap((s) => s.undoneOps);
  // ── **⟶ RE-DERIVED 2026-10-16: "EVERY OP THE ATTEMPT CREATED IS REPORTED UNDONE" IS NO LONGER A
  // CONSEQUENCE OF THE AMENDED SCOPE, AND THE CELL'S SUBJECT — THE UNION IS EXACTLY THE PERFORMED SET AND
  // NO WIDER — IS KEPT.** Under `M-5` (a) (ii) a call reverses only entries at or after ITS OWN named op,
  // so the attempt's EARLIER op is not in the later call's `undoneOps`; and where that op's own call meets
  // the compacted residue `M-6` undoes nothing at all. **What the clause fixes is the OTHER side of the
  // equality**: the performed set is the union of the steps' `undoneOps` members and NO WIDER (`§2.6` item
  // 3; `contract.md §5.7`), and every op the attempt created is accounted for by a DECLARED reading —
  // `§2.6` item 8 (ii) (5)'s accounting as its dated clause of 2026-10-16 re-reads it.
  for (const undone of swept) {
    assert.equal(created.includes(undone), true,
      'AND THE PERFORMED SET IS THE UNION OF THE STEPS\' `undoneOps` MEMBERS AND NO WIDER: no call reports '
      + `an op the attempt did not create — read ${JSON.stringify(swept)} against ${JSON.stringify(created)}; `
      + '`§2.6` item 3; `contract.md §5.7`');
  }
  // THE ACCOUNTING, READ AT ITS OWN DATED CLAUSE (`§2.6` item 8 (ii) (5), re-derived 2026-10-16): "THE
  // STATE: *"every remaining op is accounted for by its `opId` standing in an earlier step's `undoneOps`
  // member"* no longer HOLDS OF AN OP OLDER THAN THE CALL'S NAMED OP — such an op is neither passed to the
  // verb nor reported undone, and it is accounted for by the amended scope instead", and "every op of the
  // attempt is either a step's passed `opId`, or named in an earlier step's `undoneOps`, or the checkpoint
  // op itself". An op the attempt created is therefore accounted for by ONE of those three readings, never
  // by an unaccounted fourth.
  const accounted = new Set([...performed, ...swept]);
  for (const opId of created) {
    const byPassed = performed.includes(opId);
    const byUndone = swept.includes(opId);
    const isCheckpoint = closed.rollback.length > 0 && closed.rollback[0].checkpoint === opId;
    assert.equal(byPassed || byUndone || isCheckpoint, true,
      'AND EVERY OP THE ATTEMPT ITSELF CREATED IS ACCOUNTED FOR BY ONE DECLARED READING — a step\'s passed '
      + '`opId`, a member of a step\'s `undoneOps`, or the checkpoint op itself (`§2.6` item 8 (ii) (5), '
      + `read through its 2026-10-16 clause) — read ${JSON.stringify(opId)} against `
      + `${JSON.stringify([...accounted])} over ${JSON.stringify(created)}; the op that is NEITHER is one no `
      + 'act of this composition reached');
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// 2 — THE NO-CHECKPOINT WINDOW WITH NO PRE-EXISTING WRITE: THE SAME LIST, AND THE STORE'S OWN ABSENCE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSES: `composition-and-states.md §2.6` item 2 — **"WHERE THE ATTEMPT PASSED NO CHECKPOINT, THE
 * CALL LIST IS ITEM 2'S OWN — THE WHOLE LIST"** — with item 5 (a)'s skip, read here on the OTHER data
 * state the `null` arm names: **an address that held NOTHING before the attempt.** The identity this cell
 * reads is the one item 8 (iii) states is computable caller-side — **"`ops` IS THE ATTEMPT'S WHOLE
 * CREATION RECORD AND ITS FIRST ENTRY IS THE ATTEMPT'S FIRST WRITE'S OP"** — and the END STATE is the
 * store's own answer, which at a fresh address is the store's own ABSENCE: the composition's calls report
 * the ops they performed undone, and the address the attempt wrote to is left standing nowhere.
 *
 * THE MEMBERS EACH ASSERTION READS: the steps' own `opId`s (the performed calls) and the store's own
 * `undoneOps` (item 5 (a)'s skip predicate) against item 2's list; `K-2`'s returned `CommitRecord.op.opId`
 * (the attempt's first write's op); and the store's own `read` at that address for the end state.
 *
 * STATES ENUMERATED FIRST: (1) a fresh address, no caller write before the attempt — the pre-attempt
 * state is the store's own absence; (2) a two-op failing attempt there, `checkpoint` `null` on every
 * step; (3) the composition's performed calls, read against item 2's list; (4) the end state at that
 * address, read through the store's own verb.
 *
 * FAIL STATES: a call list that is not item 2's; a step naming an op outside the attempt's `ops`; an
 * attempt whose own ops are not all reported undone; an address that reads back a value where the store's
 * own absence stood.
 */
test('ck_constraint_null_arm_holds_at_a_fresh_address_where_the_pre_state_is_absence', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 64 });
  const address = [tag('ckc2')];
  const before = readAt(store, address);
  assert.equal(before.threw, true,
    'THE PRE-STATE THIS CELL DRIVES IS THE STORE\'S OWN ABSENCE: nothing was ever written at this address');
  assertStoreRefusal(before.thrown, 'the store\'s own read at an address nothing was written to');
  assert.equal(before.thrown.status, 'AddressNotFound',
    'and the store names that absence with its own code — read ' + JSON.stringify(before.thrown.status));
  twoOpFailingWindow(register, store, address);
  const record = commit(store, address, 'mem', 'committed');
  const r = capture(() => runAttempt(store, record));
  assert.equal(r.threw, true, 'the attempt fails');
  const closed = report(store, record.attempt);
  assertAttemptReport(closed, 'the closed attempt');
  const created = closed.ops.map((o) => o.opId);
  assert.equal(created.length, 2, 'the same two-op window, at an address that held nothing before it');
  assert.equal(created[0], record.op.opId, 'and `ops[0]` is the attempt\'s first write\'s op');
  assert.ok(closed.rollback.length >= 1, 'the composition performed its calls');
  for (const step of closed.rollback) {
    assertRollbackStep(step, 'a performed call of the composition');
    assert.equal(step.checkpoint, null,
      'every step reads the `null` arm (item 8 (iii), ADDRESS-WIDE)');
    assert.equal(created.includes(step.opId), true,
      'AND NO STEP NAMES AN OP OLDER THAN THE ATTEMPT\'S OWN: the op passed to the store verb is one this '
      + `attempt\'s own record holds — read ${JSON.stringify(step.opId)} against ${JSON.stringify(created)}`);
  }
  assertPerformedCallsAreItem2CallList(created, closed.rollback, 'the null arm\'s composition at a fresh address');
  const swept = closed.rollback.flatMap((s) => s.undoneOps);
  // ── **⟶ RE-DERIVED 2026-10-16 — THE UNION CLAUSE IS KEPT AND THE "EVERY CREATED OP UNDONE" CLAUSE IS
  // RE-DERIVED TO THE FLOOR'S OWN ACCOUNTING.** The amended scope narrows each call's performed set, so
  // this window's second call meets the compacted residue and `M-6` undoes nothing; the performed set
  // remains the union of the steps' `undoneOps` and NO WIDER, and every op is accounted for by one of
  // `§2.6` item 8 (ii) (5)'s three declared readings.
  for (const undone of swept) {
    assert.equal(created.includes(undone), true,
      'AND THE PERFORMED SET IS THE UNION OF THE STEPS\' `undoneOps` MEMBERS AND NO WIDER: no call reports '
      + `an op the attempt did not create — read ${JSON.stringify(swept)} against ${JSON.stringify(created)}`);
  }
  const performedHere = closed.rollback.map((s) => s.opId);
  for (const opId of created) {
    const byPassed = performedHere.includes(opId);
    const byUndone = swept.includes(opId);
    const isCheckpoint = closed.rollback.length > 0 && closed.rollback[0].checkpoint === opId;
    assert.equal(byPassed || byUndone || isCheckpoint, true,
      'AND EVERY OP THE ATTEMPT CREATED IS ACCOUNTED FOR BY ONE DECLARED READING — a step\'s passed '
      + '`opId`, a member of a step\'s `undoneOps`, or the checkpoint op (`§2.6` item 8 (ii) (5), read '
      + `through its 2026-10-16 clause) — read ${JSON.stringify(opId)} against `
      + `${JSON.stringify([...performedHere, ...swept])} over ${JSON.stringify(created)}`);
  }
  // ── THE END STATE AT A FRESH ADDRESS, READ THROUGH THE STORE'S OWN VERB. **⟶ RE-DERIVED 2026-10-16:
  // THE OLD FORM ASSERTED THE STORE'S OWN ABSENCE. Under the amended scope the address is NOT left absent
  // — the attempt's own first write's call meets the compacted residue and `M-6` UNDOES NOTHING, so the
  // value the commit landed STANDS, which is `§2.6` item 6 (a)'s and (c)'s own declared end state:
  // *"NOTHING IS RESTORED — the last-valid-state rule does not override the store's floor"*.** The cell's
  // subject — the END STATE READ THROUGH THE STORE'S OWN VERB, and never through the kernel's own claim —
  // is unmoved; the value moves and the reason is the floor.
  const after = readAt(store, address);
  assert.equal(after.threw, false,
    'THE END STATE IS READ THROUGH THE STORE\'S OWN VERB AND NOT THROUGH A KERNEL CLAIM — read '
    + JSON.stringify(after.threw ? after.thrown.status : after.value) + '; `§2.6` item 8 (iii): "the '
    + 'store\'s OWN answer — the `restoredTo` and `undoneOps` members of the steps item 5 (a) records, and '
    + 'the state the caller\'s own `read(address, tier?)` then answers — IS the end state"');
  assert.equal(after.value, 'committed',
    'AND ITS VALUE IS THE ONE THE ATTEMPT\'S OWN COMMIT LANDED, THE FLOOR HAVING UNDONE NOTHING — read '
    + JSON.stringify(after.value) + '; `§2.6` item 6 (a), (c): "NOTHING IS RESTORED — the last-valid-state '
    + 'rule does not override the store\'s floor", read with `write-and-read.md §6.4` item 2\'s `M-6` '
    + '(all-or-nothing, never partial). The address is NOT led to the store\'s absence, which was the '
    + 'answer the superseded address-wide reach produced');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// 3 — THE OVERSHOOT PROPERTY: THE CALLER'S OWN EARLIER WRITE THERE **STANDS** (TEMPORAL STOP)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * **⟶ RE-DERIVED 2026-10-16 (`role_test_writer`) — THE SUBJECT OF THIS CELL MOVED, NOT ITS VALUE.**
 * The cell below stood on `A111`'s STANDING LIMIT: *"a failed commit at an address the caller already
 * wrote to UNDOES THE CALLER'S OWN EARLIER WRITE THERE"*. **`composition-and-states.md §2.6` item 8
 * (iii) WITHDREW that disposition at its own cell** — *"THE STANDING-LIMIT DISPOSITION IS WITHDRAWN AT
 * ITS OWN CELL, 2026-10-16 ... ON THE ARCHITECT'S TWO RULINGS, BOTH VERBATIM AND BOTH OF 2026-10-16:
 * *"Add temporal stop to the rollback."* — AND *"Overshoot is a defect."*"* — and **THE STATE THE OLD
 * CELL CALLED LAWFUL IS NOW FORBIDDEN BY CLAUSE.**
 *
 * THE OPERATIVE LAW, AT ITS ONE HOME (`docs/specs/storeroom-native/write-and-read.md §6.4` item 1's
 * `M-5` amendment, dated 2026-10-16, part (a) (ii), read with item 3's `M-7` amendment): **"AN ENTRY `E`
 * IS IN SCOPE IFF BOTH HOLD — (i) THE SPATIAL TEST OF ITEM 1 IS SATISFIED (`op.address` is a prefix of
 * `E.address`) AND (ii) THE TEMPORAL TEST: `E.seq` ≥ THE NAMED OP'S OWN `seq`"** — **"so AN ENTRY AT OR
 * AFTER THE NAMED OP, WITHIN ITS SUBTREE, AND NOTHING OLDER"**, and part (b): **"THE SELF-INCLUSION IS
 * STATED IN THE COMPARISON: `≥`, NOT `>`"**. The amended `M-7` then reads: **"a rollback walks BACKWARD
 * — one entry at a time — FROM THE NEWEST ENTRY IN SCOPE DOWN TO THE NAMED OP, AND IT STOPS AT THE NAMED
 * OP, WHICH IS THE OLDEST ENTRY IT MAY REVERSE"**, so **"every entry of the addressed subtree whose
 * `seq` is LESS than the named op's is IN NO WALK AND IS REVERSED BY NO ROLLBACK OVER THAT OP"** and
 * **"the state *"an entry older than the named op was reversed by a rollback over it"* is FORBIDDEN BY
 * CLAUSE and is a defect where a drive finds it."**
 *
 * THE OBSERVABLE, STATED AS THE CLAUSE'S OWN AND DRIVEN HERE: **"A ROLLBACK OVER AN OP THAT AN ATTEMPT
 * CREATED LEAVES EVERY VALUE WRITTEN AT OR UNDER THAT ADDRESS BY AN EARLIER `seq` STANDING"** —
 * **"a drive that seeds a value, arms a passing constraint, writes a violating value and observes the
 * rollback has found the property WHEN THE SEED STILL READS"**; **"a drive that finds the seed reversed,
 * or the address absent, has found a failure of THIS clause."** The same withdrawal, in the constraints
 * unit's own words (`composition-and-states.md §2.6` item 8 (iii)): **"SO THE FAILED COMMIT *LEAVES* THE
 * CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S ADDRESS STANDING ... AND A DRIVE THAT FINDS THE SEED AT
 * `['a']` STILL READING ITS OWN VALUE AFTER THE FAILED COMMIT HAS FOUND THE AMENDED `M-5` SATISFIED."**
 *
 * WHAT THE OLD CELL'S EVIDENCE NOW PROVES: `composition-and-states.md §2.6` item 8 (iii) retains the
 * gate-6 run's `undoneOps: ["op-4","op-3","op-2"]` **"AS THE RECORD OF THE DEFECT AND ... NO LONGER A
 * WARRANT FOR ANYTHING"** — **"a drive reproducing `undoneOps: ["op-4","op-3","op-2"]` over an attempt
 * whose first op is `op-3` while the caller's seed is `op-2` has found the store reversing an entry OUT OF
 * SCOPE BY `M-5`'s TEMPORAL TEST, and FAILS."**
 *
 * THE OBSERVABLES THIS CELL READS, ALL DECLARED AND NONE STORE-SIDE: (1) the seed's own value through the
 * caller's own `read(address)` — the clause's own observable; (2) the composition's performed calls
 * (`RollbackStep.opId`, `undoneOps`, `restoredTo` — `§2.6` item 3); (3) the attempt's own `ops` and its
 * `log`. `restoredTo` is read on the LAST performed step, which `§2.6` item 8 (ii) (5) declares to be
 * **"the state the caller reads as the reach"**.
 *
 * STATES ENUMERATED FIRST (the seed states this cell now enumerates, each an arm of the clause's own
 * observable): (1) the caller's own earlier write at the attempt's address — a PRE-EXISTING op with `seq`
 * strictly LESS than every op the attempt creates, distinct from all of them; (2) the attempt's own two
 * ops, created after it, in that order; (3) the failing attempt whose window passed NO checkpoint
 * (`checkpoint` `null` on every step), so the composition's call list is item 2's own; (4) **THE END STATE
 * AT THAT ADDRESS — THE SEED, STILL READING ITS OWN VALUE — read through the caller's own `read` and off
 * the last performed step's own `restoredTo` member.**
 *
 * FAIL STATES, EACH THE CLAUSE'S OWN FALSIFIER: **THE OVERSHOOT — the seed reported undone by any step's
 * `undoneOps` member, or its value reversed, or the address left absent where the seed stood** (the
 * amended `M-5`'s defect, and the state the old cell asserted as lawful); a step naming the pre-existing
 * op (an op older than the attempt's own first op passed to the store verb — permitted by `M-5`'s spatial
 * test and forbidden by its temporal one); a call list that is not item 2's; a `KC-8` thrown for a call
 * the kernel should have skipped (item 5 (a)).
 */
test('ck_constraint_a_failed_attempt_at_an_address_the_caller_already_wrote_undoes_that_addresss_own_entry', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 64 });
  const address = [tag('ckc3')];

  // (1) THE CALLER'S OWN EARLIER WRITE — the live run's own pre-existing op at the attempt's address,
  // under the caller's own processing, before any attempt is opened (`A106` `D6`: a write that opens no
  // attempt still has its own registry entry; nothing in this unit's surface is used to make it).
  const earlier = store.write(address, 'mem', 2).op;
  const beforeAttempt = readAt(store, address);
  assert.equal(beforeAttempt.threw, false,
    'the caller\'s own earlier write LANDED, so the address holds a value before the attempt — read '
    + JSON.stringify(beforeAttempt));
  assert.equal(beforeAttempt.value, 2, 'and the value that stood there is the caller\'s own');

  // (2)–(3) THE ATTEMPT'S OWN TWO OPS AND ITS FAILED TERMINAL ARM.
  twoOpFailingWindow(register, store, address);
  const record = commit(store, address, 'mem', 'committed');
  const r = capture(() => runAttempt(store, record));
  assert.equal(r.threw, true, 'the attempt fails');
  assert.equal(r.thrown.status, KC[8],
    '⟶ RE-DERIVED 2026-10-16 — THE TOKEN MOVES `KC-6` → `KC-8` AND THE CELL\'S OWN SUBJECT IS KEPT: the '
    + 'arm this window reaches is now the FLOOR\'S, because the store\'s performed set narrowed. THE '
    + 'MECHANISM, AT THE AMENDED CLAUSES: the composition\'s first call is item 2\'s first member (the '
    + 'repair\'s op), and the store now reverses ONLY entries at or after that op — "`E.seq` ≥ THE NAMED '
    + 'OP\'S OWN `seq`" (`write-and-read.md §6.4` item 1\'s amended `M-5` (a) (ii)) — so the attempt\'s own '
    + 'first write\'s op is NO LONGER swept by that call and DOES NOT STAND IN ITS `undoneOps` MEMBER. '
    + 'Item 5 (a)\'s skip is decided by that member and by nothing else, so the second call IS ISSUED over '
    + 'a still-owed op; the op the first call reversed now carries the `compacted` mark (`M-9`\'s residue), '
    + 'and `M-6` fails any rollback whose TEMPORALLY BOUNDED candidate set includes it — `RollbackCompacted` '
    + '— which item 5 (b) makes `KC-8`. **THE SKIP\'S OBSERVABLE DID NOT MOVE AND IS WHAT THIS ASSERTION '
    + 'STILL READS:** `composition-and-states.md §2.6` item 5 (a)\'s dated clause of 2026-10-16: "THE '
    + 'SKIP\'S OBSERVABLE THEREFORE DOES NOT MOVE: the kernel still reads only the returned `undoneOps` '
    + 'member and still reasons about no mark — the member reports what the store PERFORMED, and what the '
    + 'store performed is narrower now", and its named consequence: "a still-owed op that an earlier '
    + 'call\'s `undoneOps` member does NOT report was NOT undone by that call AND GETS ITS OWN CALL — the '
    + 'store no longer sweeps an entry older than the op it was called over, so absence from `undoneOps` is '
    + 'evidence of nothing beyond the store\'s performed set". A build sweeping the older entry would '
    + 'answer `KC-6` here AND would have found the overshoot — read '
    + `${JSON.stringify(r.thrown.status)}`);
  const closed = report(store, record.attempt);
  assertAttemptReport(closed, 'the closed attempt of this window');
  const created = closed.ops.map((o) => o.opId);
  assert.equal(created.length, 2,
    'the attempt created TWO ops — its commit\'s write and the op its repair landed — in that order, read '
    + JSON.stringify(created));
  assert.equal(created[0], record.op.opId, 'its first write\'s op is its earliest-created op');
  assert.equal(created.includes(earlier.opId), false,
    'and the caller\'s own earlier write is a DISTINCT op from every op the attempt created — read '
    + `${JSON.stringify(earlier.opId)} against ${JSON.stringify(created)}`);

  // (4) THE COMPOSITION'S OWN PERFORMED CALLS, READ AGAINST ITEM 2'S LIST AND AGAINST THE STORE'S OWN
  // `undoneOps` REPORT.
  assert.ok(closed.rollback.length >= 1, 'the composition performed its calls');
  for (const step of closed.rollback) {
    assertRollbackStep(step, 'a performed call');
    assert.equal(step.checkpoint, null, 'the `null` arm, ADDRESS-WIDE (item 8 (iii))');
    assert.equal(step.opId === earlier.opId, false,
      'AND NO OP OLDER THAN THE ATTEMPT\'S OWN FIRST OP IS PASSED TO THE STORE VERB: the caller\'s own '
      + 'earlier op is named by NO call of this composition — read ' + JSON.stringify(step.opId));
    assert.equal(created.includes(step.opId), true,
      'and every op the kernel PASSED is one this attempt itself created — read '
      + `${JSON.stringify(step.opId)} against ${JSON.stringify(created)}`);
  }
  assertPerformedCallsAreItem2CallList(created, closed.rollback, 'the null arm\'s composition');

  // (5) THE OVERSHOOT PROPERTY, AT THE COMPOSITION'S OWN MEMBERS: the caller's own earlier op is reported
  // undone by NO call the composition performed. THIS IS THE ASSERTION A BUILD MAKING THE OVERSHOOT FAILS
  // — and the assertion the old form of this cell inverted.
  const swept = closed.rollback.flatMap((s) => s.undoneOps);
  assert.equal(swept.includes(earlier.opId), false,
    'THE OVERSHOOT: the caller\'s own earlier write at that address is IN NO STEP\'S `undoneOps` MEMBER — '
    + `read ${JSON.stringify(swept)} against the seed's own op ${JSON.stringify(earlier.opId)}; `
    + '`docs/specs/storeroom-native/write-and-read.md §6.4` item 1\'s `M-5` amendment (a) (ii), 2026-10-16: '
    + '"AN ENTRY `E` IS IN SCOPE IFF BOTH HOLD — (i) THE SPATIAL TEST ... AND (ii) THE TEMPORAL TEST: '
    + '`E.seq` ≥ THE NAMED OP\'S OWN `seq`", so "AN ENTRY AT OR AFTER THE NAMED OP, WITHIN ITS SUBTREE, AND '
    + 'NOTHING OLDER"; and item 3\'s `M-7` amendment: "the state *"an entry older than the named op was '
    + 'reversed by a rollback over it"* is FORBIDDEN BY CLAUSE and is a defect where a drive finds it." '
    + 'The architect\'s second ruling of that date, VERBATIM: "Overshoot is a defect." '
    + '(`composition-and-states.md §2.6` item 8 (iii), which WITHDREW the standing limit by name and '
    + 'retained the gate-6 run as the defect\'s own reproduction: "a drive reproducing `undoneOps: '
    + '["op-4","op-3","op-2"]` over an attempt whose first op is `op-3` while the caller\'s seed is `op-2` '
    + 'has found the store reversing an entry OUT OF SCOPE BY `M-5`\'s TEMPORAL TEST, and FAILS")');
  assert.equal(created.includes(earlier.opId), false,
    'AND THE TWO SETS ARE DISJOINT: the seed\'s op is NEVER passed to the verb and NEVER reported undone — '
    + `read ${JSON.stringify(earlier.opId)} against ${JSON.stringify(created)} — the boundary \`M-5\` (a) `
    + '(ii) draws, read on one drive');
  // ── AND THE HALF OF THIS WINDOW THAT IS THE **SKIP CLAUSE'S OWN DECLARED CONSEQUENCE** AND NOT A NEW
  // RULE (`composition-and-states.md §2.6` item 5 (a)'s dated clause of 2026-10-16): *"a still-owed op
  // that an earlier call's `undoneOps` member does NOT report was NOT undone by that call AND GETS ITS OWN
  // CALL"*. On this window the first call reverses ONLY the repair's op — the narrower performed set the
  // amendment declares — so the attempt's first write IS still owed and IS called, and THAT call meets the
  // compacted entry the first call left (`M-9`'s residue, `M-6`'s floor). NOTHING IS UNDONE ON THE FLOOR.
  const floorSteps = closed.rollback.filter((s) => s.failed === true);
  assert.equal(floorSteps.length, 1,
    'THE SECOND CALL MEETS THE STORE\'S OWN FLOOR — one performed call carries `failed: true` — read '
    + `${floorSteps.length} over ${JSON.stringify(closed.rollback.map((s) => [s.opId, s.failed, s.answer]))}; `
    + '`§2.6` item 5 (a)\'s named consequence ("absence from `undoneOps` is evidence of nothing beyond the '
    + 'store\'s performed set") read with item 5 (b) (an owed op\'s call meeting `RollbackCompacted` is '
    + '`KC-8`) and `write-and-read.md §6.4` item 2\'s `M-6`');
  assert.equal(floorSteps[0].answer, 'RollbackCompacted',
    'and its `answer` is the store\'s own code, carried verbatim (`§2.6` item 3) — read '
    + JSON.stringify(floorSteps[0].answer));
  assert.equal(floorSteps[0].undoneOps.length, 0,
    'AND THE FLOOR IS ALL-OR-NOTHING AND NEVER PARTIAL: the call that met it undid NOTHING (`M-6`) — read '
    + JSON.stringify(floorSteps[0].undoneOps));

  // (6) THE STEP'S OWN `restoredTo` — THE STORE'S OWN MEMBER, and on the returning arm the state the
  // named op's subtree stood at. **RE-DERIVED WITH THE SCOPE: what the amended scope leaves under the
  // attempt's own writes is EXACTLY its content at the floor, and the seed's own value stands BELOW them —
  // `restoredTo` reports the state the LAST performing step left, which here is the attempt's own value
  // because the floor restored nothing.** The seed's own survival is read at its own member in (7).
  const lastStep = closed.rollback[closed.rollback.length - 1];
  assert.equal(lastStep.restoredTo.present, true,
    'THE STEP\'S OWN `restoredTo` READS THE ADDRESS PRESENT — the store\'s own `RollbackResult.restoredTo` '
    + 'member, carried verbatim (`§2.6` item 3); the amended `M-5` leaves every earlier-`seq` value '
    + 'standing, so no arm of this window can report the address ABSENT — read '
    + JSON.stringify(lastStep.restoredTo) + ' against the value `2` the caller wrote there');

  // (7) THE CALLER'S OWN `read(address, tier?)` — "IS the end state", read at the amended scope's own
  // terms. **THE OVERSHOOT PROPERTY IS AN ASSERTION ABOUT `undoneOps` AND ABOUT `seq`, NOT A PROMISE
  // ABOUT WHAT THE TOP OF THE ADDRESS READS** — the clause's own sentence is *"A ROLLBACK OVER AN OP THAT
  // AN ATTEMPT CREATED LEAVES EVERY VALUE WRITTEN AT OR UNDER THAT ADDRESS BY AN EARLIER `seq`
  // STANDING"*, and a value the attempt's own later `seq` wrote ABOVE the seed masks it at a plain
  // `read` without reversing it. So this cell reads the two things the clause actually fixes:
  //   (a) the seed is reversed by NO entry of the store's performed set — the overshoot assertion in (5);
  //   (b) the address is NOT left at the store's own ABSENCE — the answer of the WITHDRAWN standing limit.
  const after = readAt(store, address);
  assert.equal(after.threw, false,
    'AND AFTER THE FAILED ATTEMPT THE CALLER\'S OWN READ AT THAT ADDRESS DOES NOT ANSWER THE STORE\'S OWN '
    + 'ABSENCE — read ' + JSON.stringify(after.threw ? after.thrown.status : after.value) + '; '
    + '`write-and-read.md §6.4` item 1\'s amended `M-5`: "A drive that finds the seed reversed, or the '
    + 'address absent, has found a failure of THIS clause". The `AddressNotFound` arm belongs to the '
    + 'WITHDRAWN standing limit (`composition-and-states.md §2.6` item 8 (iii): "the address is ABSENT, '
    + 'the caller\'s own earlier write there being part of what the sweep removed" — WITHDRAWN 2026-10-16)');
  assert.equal(after.thrown, undefined,
    'AND NEVER THE STORE\'S OWN `AddressNotFound`: the state the operator `A111` once recorded and '
    + '`composition-and-states.md §2.6` item 8 (iii) withdrew on 2026-10-16 — a drive reading that code '
    + "here has found the overshoot the architect's second ruling names a DEFECT");
  // (c) THE SEED'S OWN ENTRY IS OUT OF SCOPE BY `seq`, WHICH IS THE CLAUSE'S OWN INSTRUMENT — the check
  // that distinguishes "the seed survived the rollback" from "the seed was masked by a later value".
  assert.equal(earlier.seq < record.op.seq, true,
    'AND THE SEED\'S OWN `seq` IS STRICTLY LESS THAN THE TEMPORAL FLOOR\'S — the named op being the '
    + 'attempt\'s first write — read ' + JSON.stringify([earlier.seq, record.op.seq]) + '; '
    + '`write-and-read.md §6.4` item 1\'s amended `M-5` (a) (ii) bounds the candidate set at "`E.seq` ≥ '
    + 'THE NAMED OP\'S OWN `seq`", so the seed is IN THE ADDRESSED SUBTREE AND OUT OF SCOPE by the '
    + 'comparison itself, and it is unreachable by ANY call this composition issues — the clause\'s own '
    + 'two-part statement, and the reason (5) reads what it reads');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// 4 — THE RESIDUE IS NOT A LIVE ATTEMPT: A LATER `K-2` AT THAT ADDRESS RETURNS A FRESH RECORD
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`fail-surface.md §2`'s `KC-7` row, with the hold's open/release rule read at ITS home,
 * `kernel-surface.md §2.1` item 2): **"THE COMMIT REGISTRY'S OWN ENTRY STANDING AFTER A FAILURE ARM IS
 * RESIDUE AND NOT A LIVE ATTEMPT — AN ATTEMPT WHOSE TERMINAL ARM HAS RUN HAS REACHED ITS TERMINAL ARM
 * WHATEVER ITS OWN COMPOSITION LEFT STANDING — SO A LATER `K-2` AT THAT ADDRESS RETURNS A FRESH RECORD
 * AND NEVER THROWS `KC-7`, ITS WRITE VERB BEING REACHED"**, because **"THE HOLD OPENS BY `K-2`'S OWN ACT
 * AND ONLY BY IT, AND IT IS RELEASED BY THE ATTEMPT'S OWN TERMINAL ARM AND BY NO OTHER ACT"** — "NOT by
 * the residue, and NOT by any tick".
 *
 * THIS CELL DRIVES THE `K-2` LAYER THE ROW NAMES, ON THE ADDRESS THE GATE-6 LIVE RUN READ: a caller's own
 * earlier write, a failed attempt, then a LATER `K-2` at the SAME address — which must reach its write
 * verb, return a record whose `attempt` reference is fresh, and carry that attempt's own pair.
 *
 * STATES ENUMERATED FIRST: (1) an address holding the caller's own earlier value; (2) a failed attempt at
 * that address (its own ops swept by the composition); (3) a LATER `K-2` at the same address, issued
 * after that attempt's terminal arm; (4) that second attempt's own `CommitRecord`, and the pair
 * registered for its own window.
 *
 * FAIL STATES: a `KC-7` for the residue (a hold the terminal arm did not release); a `K-2` whose write
 * verb was never reached — the store's own refusal where the failed attempt left the address absent — a
 * state no clause of this unit declares; a record carrying the CLOSED attempt's reference.
 *
 * ▸ THE `K-2` LAYER'S OTHER LIMB IS ALREADY PINNED AND IS NOT RE-PINNED HERE: a second `K-2` BEFORE the
 * terminal arm throwing `KC-7` is `constraint-kernel.test.mjs`'s
 * `ck_surface_K2_a_second_commit_at_the_same_address_meets_KC7_before_the_write_verb`, and a closed
 * failure never refusing a later commit is `constraint-kernel-states.test.mjs`'s
 * `ck_neg_5_a_closed_failure_never_refuses_a_later_commit_and_its_record_is_retained`. WHAT THIS CELL
 * ADDS IS THE ROW'S OWN OBSERVABLE AT AN ADDRESS A FAILED ATTEMPT HAS ALREADY TOUCHED, where the store
 * has already been asked to roll back at that address — MEASURED GREEN at this build, and GREEN BY
 * CLAUSE. WHAT THE SECOND ATTEMPT'S OWN TERMINAL ARM THEN DOES IS THE NEXT CELL'S SUBJECT, AND IS NOT
 * CARRIED BY THIS GREEN.
 *
 * ▸ AND IT HOLDS UNDER ITEM 2'S CALL LIST UNCHANGED, WHICH IS WHY IT IS NOT RE-AIMED HERE: this window's
 * attempt holds ONE op (`a-fails` carries no repair, so the attempt's first write is its whole creation
 * record), so item 2's list, item 5 (a)'s skip and the order the list declares have NOTHING TO DECIDE
 * HERE — the composition issues its one call over that one op whatever the order. The cell asserts no
 * position in any list.
 */
test('ck_constraint_a_later_commit_at_a_failed_attempts_address_returns_a_fresh_record', async () => {
  const { register, commit, runAttempt, log } = await kernel();
  const store = makeStore({ journalLength: 64 });
  const address = [tag('ckc4')];

  // (1) THE CALLER'S OWN EARLIER WRITE, so the address the attempt leaves behind held a value.
  store.write(address, 'mem', 2);

  // (2) THE FAILED ATTEMPT: one pair, violated with NO repair, so the attempt fails `KC-3` and its own
  // composition sweeps its op (`attempt-lifecycle.md §2.4` item 4's arm `(c)`).
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: this body violates at its registration, so it is shielded or
  // the pair is REFUSED there (`ConstraintListInvalid`, state 2) and the `KC-3` arm this cell reads — and the
  // later `K-2` at the same address — are never reached.
  const failing = register(store, address, 'a-fails', passAtRegistration(() => ({ message: 'a-fails violates and registers no repair' })));
  assert.equal(failing !== undefined, true, 'the failing pair is registered');
  const first = commit(store, address, 'mem', 1);
  const firstRun = capture(() => runAttempt(store, first));
  assert.equal(firstRun.threw, true, 'the first attempt fails');
  assert.equal(firstRun.thrown.status, KC[3],
    'at the violation arm, the pair carrying no repair; fail-surface.md §1.1\'s thrown form carries the token');
  assertKernelForm(firstRun.thrown, 'the first attempt\'s refusal');
  assert.ok(log(store, first.attempt).length >= 2, 'and its closed record is retained (K-4 answers it)');

  // (3) THE LATER `K-2` AT THE SAME ADDRESS, after that attempt's terminal arm.
  const second = capture(() => commit(store, address, 'mem', 3));
  assert.equal(second.threw, false,
    'A LATER `K-2` AT THAT ADDRESS RETURNS A FRESH RECORD AND NEVER THROWS `KC-7` — read '
    + JSON.stringify(second.threw ? second.thrown.status : second.value)
    + '; fail-surface.md §2\'s `KC-7` row: the residue "is RESIDUE and NOT a live attempt … so a later '
    + '`K-2` at that address RETURNS a fresh record and throws no `KC-7`, ITS WRITE VERB BEING REACHED"; '
    + '`kernel-surface.md §2.1` item 2: the hold "is RELEASED BY THE ATTEMPT\'S OWN TERMINAL ARM AND BY '
    + 'NO OTHER ACT". ▸ THE STORE\'S OWN REFUSAL HERE (`AddressNotFound`) IS NEITHER THE ROW\'S FRESH '
    + 'RECORD NOR A `KC-7`, and `fail-surface.md §2` names exactly this drive as the one whose absence '
    + 'sent a later write "to the STORE\'s own absent value and by nothing this member declares"');
  assert.equal(second.value.attempt === undefined, false,
    'and the record it returned carries a real `CommitRecord.attempt` — the ONLY declared way an attempt '
    + 'reference is obtained (`attempt-lifecycle.md §2.4` item 1)');
  assert.equal(typeof second.value.attempt.id, 'string', 'the reference is an `AttemptRef` (`§2.15`)');
  assert.notEqual(second.value.attempt.id, first.attempt.id,
    'and it is a FRESH attempt, not the closed one — read '
    + `${JSON.stringify(second.value.attempt.id)} against ${JSON.stringify(first.attempt.id)}`);

  // (4) THE NEW ATTEMPT'S OWN RECORD IS THE NEW ATTEMPT'S, and the pair registered for it alone is the
  // one its own window evaluates — the layer this cell pins ends here, the next cell reading what the
  // second attempt's own terminal arm does.
  const pair = register(store, address, 'b-passes', () => true);
  assert.equal(pair !== undefined, true,
    'a pair is registered at that address for the second attempt alone — its own window\'s terms');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// 5 — THE SECOND ATTEMPT AT A FAILED ATTEMPT'S ADDRESS: ITS WALK MEETS THE STORE'S OWN FLOOR
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE WINDOW THIS CELL DRIVES, AND WHY IT IS THIS ONE: the first attempt's own ops were reported undone
 * by its composition, so the store marks them compacted and LEAVES THEM IN THE JOURNAL
 * (`write-and-read.md §6.4` item 5's `M-9` residue), and the SECOND attempt at that address lands its own
 * write op in the SAME subtree — so the first attempt's compacted entries stand in the CANDIDATE SET of
 * the rollback call the second attempt's own composition issues over ITS still-owed op, and `M-6` fails
 * that call (`"A rollback whose candidate set (item 1) includes AT LEAST ONE COMPACTED ENTRY FAILS
 * `RollbackCompacted` AND UNDOES NOTHING"`). The unit's answer for exactly that state is DECLARED, at
 * `composition-and-states.md §2.6` item 5 (b) — **"AN OP THE COMPOSITION STILL OWES WHOSE CALL FAILS
 * EITHER FLOOR CODE — `RollbackCompacted` OR `JournalOpUnknown` — IS `KC-8` (`ConstraintRollbackFloor`)"**
 * — and item 6 (a) names what the caller then holds: **"the attempt's log CARRIES ITS SINGLE `outcome`
 * ENTRY (`state` `KC-8`, appended ONCE and never twice) whose message NAMES the store's own
 * `RollbackCompacted` … as the store's answer and names the op whose call met the floor"**, with item 6 (c)
 * adding that the kernel **"claims NO reach past the compacted base, reports NO rollback it did not
 * perform"**. `fail-surface.md §2`'s `KC-8` row is that token's home.
 *
 * **⟶ RE-DERIVED 2026-10-16 (`role_test_writer`) — THE SUBJECT OF THIS CELL MOVED WITH THE SCOPE, AND
 * THE CELL'S NAME NO LONGER STATES WHAT THE CLAUSE NOW DECLARES.** The cell was written to drive *"a
 * second attempt at a failed attempt's address MEETS THE STORE'S OWN FLOOR AND CLOSES `KC-8`"*, on the
 * premise that the FIRST attempt's compacted residue stands inside the SECOND attempt's candidate set.
 * **THE AMENDED `M-5` FALSIFIES THAT PREMISE:** the residue's op carries a `seq` STRICTLY LESS than the
 * second attempt's own named op, so *"`E.seq` ≥ THE NAMED OP'S OWN `seq`"*
 * (`docs/specs/storeroom-native/write-and-read.md §6.4` item 1's `M-5` amendment (a) (ii), 2026-10-16)
 * places it **OUT OF SCOPE**, and the two floors' own declared order
 * (`§6.4` item 2's dated neighbour: *"THE TEMPORAL FLOOR BOUNDS THE CANDIDATE SET FIRST, AND THE
 * COMPACTED PREDICATE IS THEN EVALUATED OVER THAT BOUNDED SET"*) means **`M-6` NEVER EXAMINES IT.** The
 * consequence is stated at that clause in the spec's own words: *"an entry OLDER than the named op that
 * carries `compacted: true` IS IN NO ROLLBACK OVER THAT OP AND CANNOT FAIL ONE — it is outside the
 * candidate set by the temporal bound, so `M-6` never examines it and the rollback over that op does NOT
 * answer `RollbackCompacted` because of it."*
 *
 * **SO THE SECOND ATTEMPT'S COMPOSITION RUNS TO THE PASS ARM'S OWN TERMS — its one call returns and its
 * own op is reversed — and the cell asserts THAT, at the same declared members it always read.** This is
 * the (A)-class sort: the cell's subject is the SCOPE ITSELF (what the second attempt's walk may touch),
 * so the assertion moves to the clause's own observable rather than to a different subject. **AND THE
 * COMPENSATING HALF IS KEPT AND IS THE POINT: the floor is not weakened, and a candidate set that is
 * TEMPORALLY IN SCOPE and holds a compacted entry STILL fails `RollbackCompacted` and undoes nothing** —
 * that state is driven by `constraint-kernel-negatives.test.mjs`'s `ck_p_neg_20` and by
 * `ck_neg_3_a_still_owed_call_meeting_a_compacted_base_is_KC8_with_one_outcome_entry`, whose windows place
 * the compacted entry AT OR AFTER the named op.
 *
 * A GENUINELY-PASSING SECOND ATTEMPT EXISTS AND IS NOT THIS CELL'S WINDOW: where the second attempt's own
 * window leaves EVERY pair registered at its address passing for the value IT lands, its terminal arm is
 * the pass arm, its composition is NEVER REACHED, and `rollback` is `[]` — measured on this checkout, and
 * the reason is declared rather than incidental (the floor is answered only by a call the composition
 * issues, `§2.6` item 5 (b), and the composition is reached only on a failure arm). THIS CELL DRIVES THE
 * WINDOW IN WHICH THE COMPOSITION IS REACHED — the FIRST attempt's own pair is still registered at that
 * address and violates again at the second attempt's landing, so its `KC-3` arm is the second attempt's
 * own and its walk runs — because THAT is the window in which the residue's own effect is readable at all,
 * and the claim the cell once made (a second attempt that reaches its pass arm under a pair registered for
 * it alone) is not a claim any clause of this unit makes: a pair registered at an address is evaluated by
 * every attempt at that address, and the earlier pair is never unregistered by the terminal arm.
 *
 * THE MEMBERS EACH ASSERTION READS: the FIRST attempt's own performed calls (`undoneOps`, the residue's
 * own origin); the later `K-2`'s returned `CommitRecord` (`fail-surface.md §2`'s `KC-7` row — "ITS WRITE
 * VERB BEING REACHED"); the second attempt's thrown form (`fail-surface.md §1.1`: three members, the
 * token in `status`); its closed `AttemptReport`'s `log`, `ops` and `rollback`; and the store's own `read`
 * at that address for the end state.
 *
 * STATES ENUMERATED FIRST: (1) a FRESH address, with no caller write before the first attempt; (2) a first
 * attempt that FAILS `KC-3` and whose own composition reports ITS OWN op undone (the compacted residue's
 * own origin — an entry whose `seq` is now BELOW every later attempt's floor); (3) a later `K-2` at that
 * address, after the terminal arm — reached, a fresh record; (4) **the second attempt's own landing, its
 * own `KC-3` failure arm, and the composition over its own op — WHICH NO LONGER MEETS THE FLOOR, the
 * residue being out of scope by `seq`**; (5) the end state at that address, read off the step's own
 * members and through the store's own verb.
 *
 * FAIL STATES: a second attempt refused (`KC-7` for the residue, or a write verb never reached); **a
 * second attempt whose walk REVERSES THE FIRST ATTEMPT'S OWN RESIDUE — an entry older than the named op
 * reversed by a rollback over it, which `M-7`'s amendment declares FORBIDDEN BY CLAUSE and a defect where
 * a drive finds it**; MORE THAN ONE `outcome` entry, or an entry whose `state` is not the arm the
 * attempt's own membership decides (item 6 (a), whose floor-governs rule stands WHERE THE FLOOR IS MET —
 * the windows `ck_p_neg_20` and `ck_neg_3` drive); a step that reports an op undone which the store did
 * not perform; an end state in which the second attempt's own write does not stand.
 */
test('ck_constraint_a_second_attempt_at_a_failed_attempts_address_leaves_the_older_compacted_residue_out_of_scope_and_closes_KC3', async () => {
  const { register, commit, runAttempt, report, log } = await kernel();
  const store = makeStore({ journalLength: 64 });
  const address = [tag('ckc5')];

  // (1)–(2) A FRESH ADDRESS AND A FAILED FIRST ATTEMPT WHOSE OWN COMPOSITION SWEEPS ITS OWN OP.
  const missing = readAt(store, address);
  assert.equal(missing.threw, true,
    'the address held NOTHING before the first attempt, so this cell reads the residue alone');
  // ⟶ `A135` (3) / `§7.3` (b) state 1: shielded — the failed first attempt whose own composition sweeps its op
  // is the state this cell reads, and it is reached only where the registration STOOD.
  register(store, address, 'a-fails', passAtRegistration(() => ({ message: 'a-fails violates and registers no repair' })));
  const first = commit(store, address, 'mem', 1);
  const firstRun = capture(() => runAttempt(store, first));
  assert.equal(firstRun.threw, true, 'the first attempt fails');
  assert.equal(firstRun.thrown.status, KC[3], 'at the violation arm; its own composition sweeps its op');
  assert.ok(log(store, first.attempt).length >= 2, 'and its closed record is retained');
  const firstClosed = report(store, first.attempt);
  assertAttemptReport(firstClosed, 'the closed first attempt');
  const firstOps = firstClosed.ops.map((o) => o.opId);
  assert.equal(firstOps.length, 1, 'the first attempt created ONE op — its commit\'s own write');
  const firstSwept = firstClosed.rollback.flatMap((s) => s.undoneOps);
  assert.equal(firstSwept.includes(firstOps[0]), true,
    'AND ITS OWN COMPOSITION REPORTS THAT OP UNDONE — read ' + JSON.stringify(firstSwept) + '; the op a '
    + 'rollback undid is marked compacted and STAYS in the journal (`write-and-read.md §6.4` item 5\'s '
    + '`M-9` residue) — **and that residue is now BELOW every later attempt\'s temporal floor, which is '
    + 'the whole subject of this cell**');

  // (3) THE LATER `K-2`, AFTER THE TERMINAL ARM — the row's own "write verb being reached".
  const second = capture(() => commit(store, address, 'mem', 3));
  assert.equal(second.threw, false,
    'A LATER `K-2` AT THAT ADDRESS IS REACHED — "ITS WRITE VERB BEING REACHED" — and never throws `KC-7` '
    + `for the residue — read ${JSON.stringify(second.threw ? second.thrown.status : second.value)}`);
  assert.equal(typeof second.value.attempt.id, 'string',
    'and it returned a fresh `CommitRecord` whose `attempt` reference is a real `AttemptRef`');
  assert.notEqual(second.value.attempt.id, first.attempt.id, 'a fresh attempt, and not the closed one');

  // (4) THE SECOND ATTEMPT'S OWN TERMINAL ARM: its own window's pair (the FIRST attempt's, still
  // registered) violates, so its own `KC-3` arm is reached, and its composition runs over its own op.
  const secondRun = capture(() => runAttempt(store, second.value));
  assert.equal(secondRun.threw, true,
    'the second attempt does not close on a pass arm: the FIRST attempt\'s own pair stands registered at '
    + 'that address and violates at the second attempt\'s landing, so the second attempt\'s own failure '
    + 'arm is reached and its composition RUNS');
  assertKernelForm(secondRun.thrown, 'the second attempt\'s refusal');
  assert.equal(secondRun.thrown.status, KC[3],
    '⟶ RE-DERIVED 2026-10-16 — THE TOKEN MOVES `KC-8` → `KC-3` AND THE CELL\'S OWN SUBJECT IS KEPT. THE '
    + 'arm is now the ATTEMPT\'S OWN VIOLATION ARM and NOT the floor\'s, because the FIRST attempt\'s '
    + 'compacted residue is OUT OF SCOPE BY `SEQ`: `write-and-read.md §6.4` item 1\'s amended `M-5` (a) '
    + '(ii) bounds the candidate set at "`E.seq` ≥ THE NAMED OP\'S OWN `seq`", and the residue\'s op was '
    + 'created BEFORE the second attempt\'s own — so the temporal floor excludes it FIRST and `M-6`\'s '
    + 'compacted predicate is evaluated over the bounded set and NEVER EXAMINES IT (§6.4 item 2\'s dated '
    + 'neighbour: "THE TEMPORAL FLOOR BOUNDS THE CANDIDATE SET FIRST, AND THE COMPACTED PREDICATE IS THEN '
    + 'EVALUATED OVER THAT BOUNDED SET"), whose own stated consequence is "an entry OLDER than the named op '
    + 'that carries `compacted: true` IS IN NO ROLLBACK OVER THAT OP AND CANNOT FAIL ONE ... so the rollback '
    + 'over that op does NOT answer `RollbackCompacted` because of it." THE FLOOR IS NOT WEAKENED: the '
    + 'in-scope compacted case is driven at `ck_neg_3` and `ck_p_neg_20` — read '
    + JSON.stringify(secondRun.thrown.status));

  const secondClosed = report(store, second.value.attempt);
  assertAttemptReport(secondClosed, 'the closed second attempt');
  const secondOps = secondClosed.ops.map((o) => o.opId);
  assert.equal(secondOps.length, 1, 'the second attempt created ONE op of its own');

  // (5) THE ATTEMPT'S OWN ANSWER: ONE `outcome` entry carrying the arm its own membership decides, and a
  // composition that PERFORMED — the residue's absence from the step making the call a SUCCESS.
  const outcomes = entries(secondClosed.log, 'outcome');
  assert.equal(outcomes.length, 1,
    'THE ATTEMPT\'S LOG CARRIES ITS SINGLE `outcome` ENTRY — appended ONCE and never twice '
    + `(\`§2.6\` item 4's arms append the entry, item 6 (a) forbids a second) — read ${outcomes.length}`);
  assert.equal(outcomes[0].state, KC[3],
    'and its `state` is the arm the attempt\'s own membership decides — the violation arm — read '
    + JSON.stringify(outcomes[0].state) + '; `fail-surface.md §2`\'s `KC-3` row, read with `§2.6` item 6 '
    + '(a), whose floor-governs rule applies ONLY WHERE THE FLOOR IS MET');
  assert.equal(outcomes[0].message.includes('RollbackCompacted'), false,
    'AND THE ENTRY\'S MESSAGE DOES NOT NAME THE STORE\'S `RollbackCompacted`, BECAUSE THE STORE NEVER '
    + 'ANSWERED IT: the residue is out of scope, so no call of this composition met the floor — read '
    + JSON.stringify(outcomes[0].message) + '; `write-and-read.md §6.4` item 1\'s amended `M-5` (a) (ii) '
    + 'and item 2\'s dated neighbour, which say the older compacted entry "CANNOT FAIL ONE"');
  assert.equal(secondClosed.rollback.length, 1,
    'the composition recorded ONE step — one call ISSUED over the one still-owed op it holds (`§2.6` item '
    + '5 (a): "the step count is the calls ISSUED")');
  const floorStep = secondClosed.rollback[0];
  assertRollbackStep(floorStep, 'the second attempt\'s own step');
  assert.equal(floorStep.opId, secondOps[0],
    'and that call was made over the second attempt\'s OWN op — read ' + JSON.stringify(floorStep.opId)
    + ' against ' + JSON.stringify(secondOps));
  assert.equal(floorStep.failed, false,
    'AND THE CALL DID NOT FAIL — the step carries `failed: false`, the store having returned — read '
    + JSON.stringify(floorStep.failed) + '; `§2.6` item 5 (a)\'s `failed` being THAT CALL\'S OWN ANSWER, '
    + 'read with item 5 (b), which makes `KC-8` of an owed call meeting either floor code and of nothing '
    + 'else');
  assert.equal(floorStep.answer, 'ok',
    'and its `answer` is the store\'s own answer for a call that returned, never a floor code — read '
    + JSON.stringify(floorStep.answer) + '; `§2.6` item 3');
  assert.deepEqual(floorStep.undoneOps, [secondOps[0]],
    'AND IT REVERSED EXACTLY THE SECOND ATTEMPT\'S OWN OP — read '
    + JSON.stringify(floorStep.undoneOps) + '; the amended `M-5`\'s scope is the named op AT OR AFTER its '
    + 'own `seq`, so the call reaches its own op and STOPS THERE');
  // THE OVERSHOOT ASSERTION, ON THIS CELL'S OWN WINDOW — the residue is the entry an address-wide reach
  // would have swept.
  const sweptHere = secondClosed.rollback.flatMap((s) => s.undoneOps);
  assert.equal(sweptHere.includes(firstOps[0]), false,
    'THE OVERSHOOT: THE FIRST ATTEMPT\'S OWN COMPACTED RESIDUE IS REVERSED BY NO CALL OF THE SECOND '
    + `ATTEMPT\'S COMPOSITION — read ${JSON.stringify(sweptHere)} against the residue `
    + `${JSON.stringify(firstOps[0])}; \`write-and-read.md §6.4\` item 3's \`M-7\` amendment: "every entry `
    + 'of the addressed subtree whose `seq` is LESS than the named op\'s is IN NO WALK AND IS REVERSED BY '
    + 'NO ROLLBACK OVER THAT OP ... the state *"an entry older than the named op was reversed by a '
    + 'rollback over it"* is FORBIDDEN BY CLAUSE and is a defect where a drive finds it." The architect\'s '
    + 'second ruling of 2026-10-16, VERBATIM: "Overshoot is a defect."');

  // (6) THE END STATE, READ THROUGH THE STORE'S OWN VERB. **⟶ RE-DERIVED 2026-10-16: the comparison's
  // own success means the attempt's ONE op IS reversed, and this address held NOTHING BEFORE the first
  // attempt — so the store's own answer is its ABSENCE, and the step's `restoredTo` member says so
  // BEFORE the read does.** The cell's subject — the END STATE READ THROUGH THE STORE'S OWN VERB, never
  // through a kernel claim — is unmoved.
  const after = readAt(store, address);
  assert.equal(secondClosed.rollback[0].restoredTo.present, false,
    'THE STEP\'S OWN `restoredTo` REPORTS THE STATE THE ADDRESS ACTUALLY STANDS AT AFTER THE ROLLBACK — '
    + 'PRESENT OR ABSENT, and here ABSENT because nothing at this address is older than the reversed op — '
    + 'read ' + JSON.stringify(secondClosed.rollback[0].restoredTo) + '; `write-and-read.md §6.4` item 3\'s '
    + 'clause (ii): "`restoredTo` REPORTS THE STATE THE ADDRESSED SUBTREE ACTUALLY STANDS AT AFTER THE '
    + 'ROLLBACK — PRESENT OR ABSENT, NEVER AN UNDONE ENTRY\'S PRE-STATE"');
  assert.equal(secondClosed.rollback[0].restoredTo.value, undefined,
    'and the two-member `BaseState` carries no value where none stands (`§2.6` item 3) — read '
    + JSON.stringify(secondClosed.rollback[0].restoredTo.value));
  assert.equal(after.threw, true,
    'AND THE STORE\'S OWN READ ANSWERS WHATEVER THE STEP\'S `restoredTo` ALREADY REPORTED — the store\'s '
    + 'own absence — read ' + JSON.stringify(after.threw ? after.thrown.status : after.value)
    + '; `§2.6` item 8 (iii): "the state the caller\'s own `read(address, tier?)` then answers — IS the '
    + 'end state"');
  assertStoreRefusal(after.thrown, 'the store\'s own read after the second attempt\'s composition');
  assert.equal(after.thrown.status, 'AddressNotFound',
    'and the code is the STORE\'S own, never a kernel token — read ' + JSON.stringify(after.thrown.status));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// 6 — THE REPAIR-REFUSED PATH'S ONE ENTRY NAMES THE STORE'S OWN TOKEN
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE, AT THE DUTY'S ONE HOME (`fail-surface.md §2`'s `KC-4` row's `observable` cell, read with
 * `§1.2` item 3): **"the `repair-run` entry carries what was ATTEMPTED, and its `message` NAMES the
 * store's own code where the store refused the repair"** — and the row's own `trigger` cell: **"WHERE THE
 * STORE'S OWN VERB REFUSED THE REPAIR'S EDIT … THE KERNEL'S GENERIC DESCRIPTION OF THE ATTEMPTED REPAIR
 * ALONE DOES NOT SATISFY IT, AND THE CODE IS THE STORE'S OWN TOKEN — `WriteParentNotLink` in this unit's
 * own repair window — and never a kernel string and never a `KC` token"**, the cell that pins it being
 * `e2e-scenarios-b.md`'s `E2E-C-13`'s `repair-run` message.
 *
 * THE DRIVE IS `E2E-C-13`'s OWN:` (α) is not re-driven here (the store's own code at `K-2` is pinned at
 * `constraint-kernel.test.mjs`'s `ck_surface_K2_an_out_of_domain_tier_is_the_store_s_own_code_on_the_store_s_own_channel`);
 * (β) is this cell: a lawful attempt at an address that holds a LEAF, whose repair's own write aims at a
 * DESCENDANT of that leaf — `write-and-read.md §3.3` item 5: *"If the resolved PARENT is a `leaf`: the
 * write CANNOT BEGIN, because a leaf holds a value and not a link — it fails `WriteParentNotLink`"*, so
 * the repair LANDS NO EDIT, reaches no return, and the attempt terminates at arm `(d)` with `KC-4`.
 *
 * STATES ENUMERATED FIRST: (1) the attempt's address holding a leaf value (written by the caller, before
 * the attempt); (2) the constraint's first evaluation violating WITH a repair registered; (3) the
 * repair's own verb call, refused by the STORE with its own code — no op exists; (4) the attempt's
 * terminal arm `(d)`: ONE `repair-run` entry and ONE `outcome` entry whose `state` is `KC-4`.
 *
 * FAIL STATES: a `repair-run` message carrying the kernel's own description of the attempted repair and
 * NOTHING of the store's token; the store's token minted into the kernel's `status`; an op credited that
 * the store never returned; a second `outcome` entry.
 */
test('ck_constraint_a_store_refused_repair_has_its_own_token_named_in_the_repair_run_entry', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 64 });
  const address = [tag('ckc6')];
  store.write(address, 'mem', 7); // the attempt's address holds a LEAF

  let reached = false;
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — AND `3-bis` MAKES IT MANDATORY: this body carries a `repair`, so an
  // unshielded registration ATTEMPTS it at the registration and the store's own refusal surfaces THERE, with
  // `reached` already set by a call this cell did not drive.
  register(store, address, 'x', passAtRegistration(() => ({
    repair: () => {
      reached = true;
      // THE REPAIR'S OWN EDIT, REFUSED BY THE STORE BEFORE ANY OP EXISTS (`E2E-C-13` (β)).
      const landed = store.write([address[0], 'child'], 'mem', 9).op;
      return { ok: true, message: 'the edit landed', op: landed };
    },
    message: 'x is invalid at this address',
  })));
  const record = commit(store, address, 'mem', 1);
  const r = capture(() => runAttempt(store, record));
  assert.equal(r.threw, true, 'the attempt terminates');
  assert.equal(reached, true, 'the repair body WAS invoked (arm (b)\'s own transition)');
  const closed = report(store, record.attempt);
  assertAttemptReport(closed, 'the closed attempt of the repair-refused window');
  assert.equal(closed.outcome, 'failed', 'and it closes on the failed arm');
  const runs = entries(closed.log, 'repair-run');
  assert.equal(runs.length, 1,
    'ONE `repair-run` entry stands for the refused repair — read ' + runs.length);
  assert.equal(runs[0].id, 'x', 'under the pair\'s own BARE id (`attempt-lifecycle.md §2.4` item 2)');
  assert.equal(runs[0].message.includes('WriteParentNotLink'), true,
    'AND THAT ENTRY\'S `message` NAMES THE STORE\'S OWN TOKEN — read '
    + JSON.stringify(runs[0].message) + '; `fail-surface.md §2`\'s `KC-4` row\'s `observable` cell: "its '
    + '`message` NAMES the store\'s own code where the store refused the repair", the code being the '
    + 'STORE\'S own token and "never a kernel string and never a `KC` token"; the gate-6 live run\'s '
    + '`E2E-C-13.6` found this exact member naming only "the pair\'s repair was attempted"');
  for (const token of Object.values(KC)) {
    assert.equal(runs[0].message.includes(token), false,
      'and the entry\'s message carries NO kernel token — it is not the carrier of a state — read '
      + token);
  }
  const outcomes = entries(closed.log, 'outcome');
  assert.equal(outcomes.length, 1,
    'the attempt has ONE `outcome` entry and no second is appended for the refused repair');
  assert.equal(outcomes[0].state, KC[4],
    'and its `state` is `KC-4`, read off the entry and never off a thrown form\'s `status` — the arm '
    + `\`attempt-lifecycle.md §2.4\` item 4 calls \`(d)\` — read ${JSON.stringify(outcomes[0].state)}`);
  assert.equal(closed.ops.length, 1,
    'AND THE STORE NEVER RETURNED AN OP, SO NONE IS CREDITED: `ops` holds the attempt\'s own first write '
    + `alone — read ${closed.ops.length}; \`e2e-scenarios-b.md\`'s \`E2E-C-13\` step (5) (β) falsifies a `
    + 'report whose `ops` has length 2 after the store refused the repair\'s write');
});
