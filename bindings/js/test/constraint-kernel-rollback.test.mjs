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
//   1  `ck_constraint_null_arm_the_calls_are_item_2_s_list_minus_the_ops_the_store_reported_undone` — a
//      two-op failing window at one address, `null` `checkpoint` on every step: the steps' own `opId`s
//      are the ops the kernel PASSED, and they are EXACTLY item 2's list minus the ops an earlier step's
//      own `undoneOps` member reports undone. `composition-and-states.md §2.6` items 2 and 5 (a);
//      `contract.md §5.7`'s `P-TP-7`. RED at this build (see the measured section below) — the
//      standing-law pin item 2's restoration turns green.
//   2  `ck_constraint_null_arm_holds_at_a_fresh_address_where_the_pre_state_is_absence` — the same law
//      on the other data state the `null` arm names: an address that held NOTHING before the attempt,
//      whose end state is the store's own absence. `§2.6` items 2 and 5 (a); item 8 (iii)'s own words
//      ("THE IDENTITY IS COMPUTABLE FROM WHAT A CALLER-SIDE KERNEL HOLDS"); `§5.7`. RED at this build,
//      on the same limb as cell 1.
//   3  `ck_constraint_a_failed_attempt_at_an_address_the_caller_already_wrote_undoes_that_addresss_own_entry`
//      — `A111`'s STANDING LIMIT, named in the composition's own performed calls and in the caller's own
//      `read`: the caller's own earlier op is never PASSED (green) and IS REPORTED UNDONE, the step's
//      `restoredTo` reads the address absent, and the read answers the store's own `AddressNotFound`.
//      `§2.6` item 8 (iii) (the STANDING LIMIT + the `OWED`); item 2 + item 5 (a); `contract.md §5.7`'s
//      failure list; `fail-surface.md §3`. RED at this build on the item-2 limb alone.
//   4  `ck_constraint_a_later_commit_at_a_failed_attempts_address_returns_a_fresh_record` — `W2`'s `K-2`
//      layer: a later `K-2` at a failed attempt's address returns a FRESH record, throws no `KC-7`, and
//      its write verb is REACHED. `fail-surface.md §2`'s `KC-7` row; `kernel-surface.md §2.1` item 2.
//      GREEN at this build, and LIST-INDEPENDENT (its window's attempt holds ONE op).
//   5  `ck_constraint_a_second_attempt_at_a_failed_attempts_address_meets_the_store_s_own_floor_and_closes_KC8`
//      — the second attempt at a failed attempt's address, its walk meeting the store's own
//      `RollbackCompacted` over the compacted residue the first attempt left: the declared token, the
//      ONE `outcome` entry naming the store's own code, and nothing restored. `§2.6` items 5 (b) and
//      6 (a), (c); `fail-surface.md §2`'s `KC-8` row; `write-and-read.md §6.4` items 2/5. GREEN at this
//      build.
//   6  `ck_constraint_a_store_refused_repair_has_its_own_token_named_in_the_repair_run_entry` — `W3`(e):
//      the refusal path's ONE `repair-run` entry NAMES the store's own `WriteParentNotLink`.
//      `fail-surface.md §2`'s `KC-4` row's `observable` cell (`§1.2` item 3); `E2E-C-13` (β). GREEN at
//      this build.
//
// THE FAIL-STATES THIS FILE PINS (each the clause's own falsifier):
//   · a call list that is NOT item 2's — the withdrawn single-op reading, which passes the attempt's own
//     first write FIRST and drops every other op of `ops` from the list;
//   · a call issued over an op an earlier step's own `undoneOps` member already reports undone (the
//     state the live run's `E2E-C-2.7` reached, answered `RollbackCompacted` where no floor belonged);
//   · a step whose `opId` is not an op the attempt itself created (an op older than the attempt passed
//     to the store verb);
//   · an attempt whose own ops are not all reported undone by the composition's performed calls;
//   · **A BUILD THAT CLAIMS THE WITHDRAWN PRE-STATE**: the caller's own earlier op reported undone by no
//     step, or the address answering the caller's own earlier value where the store's own reach swept it;
//   · a later `K-2` at an address a failed attempt has left behind that is refused, or whose write verb
//     is never reached;
//   · a second attempt whose walk meets no floor, or a `KC-8` whose entry does not name the store's own
//     code and the op whose call met it, or a floor arm that reports a rollback it did not perform;
//   · a `repair-run` entry whose `message` does not name the store's own token where the store refused.
//
// ── ▸ WHAT IS RED AND WHAT IS GREEN, MEASURED AT THIS PASS (no narration; read this before the cells)
//
// THE BUILD THIS FILE IS MEASURED AGAINST ISSUES ITS `null`-ARM CALLS IN CREATION ORDER — the attempt's
// own first write FIRST — WHICH IS THE WITHDRAWN SINGLE-OP READING, so cells 1, 2 and 3 stand RED on ONE
// limb and one limb only: **the performed calls are not item 2's list**. `A111` supersedes that reading,
// item 2's own words are the standing law, and FOUR CELLS OF OTHER FILES pin the same list (their
// owners restore them; this file touches no other file). Measured on this checkout:
//
//   · `rollback()` over the attempt's FIRST op and over its REPAIR's op alike report
//     `undoneOps: ["op-3","op-2","op-1"]` — the store's own reach is subtree-wide and backward to the
//     OLDEST entry (`write-and-read.md §6.4` items 1/3/4, `M-5`/`M-7`/`M-8`) — and leave the address
//     answering `AddressNotFound`. So on EVERY target the kernel may lawfully pass, a two-op attempt's
//     FIRST call already reports BOTH of its own ops undone, and item 5 (a) skips the second: the step
//     count is ONE and it is the calls ISSUED. The list's DECLARED ORDER is what the red limb reads, not
//     the reach: item 2 puts the repair's op FIRST and the first write LAST.
//   · THE ADDRESS'S OWN ENTRY IS UNDONE ON THE `null` ARM — the STANDING LIMIT, not a defect: the
//     caller's own earlier op stands in none of the steps' `undoneOps` members only where the store's
//     own answer says so, and on this checkout it says so by reporting it undone and leaving the address
//     absent. Cell 3 asserts THAT reading; a build claiming the withdrawn pre-state fails it.
//   · THE COMPACTED RESIDUE IS IN THE NEXT ATTEMPT'S CALL SCOPE: an op a rollback undid is marked
//     compacted and STAYS in the journal (`§6.4` item 5's `M-9` residue), and `M-6` fails any later
//     rollback whose candidate set includes a compacted entry — so the second attempt whose own
//     composition IS reached meets the store's own floor and closes `KC-8`, its ONE `outcome` entry
//     naming `RollbackCompacted`, and NOTHING is restored (cell 5). WHERE THE SECOND ATTEMPT'S
//     COMPOSITION IS NEVER REACHED — all pairs registered at that address passing for its own landed
//     value — it passes on its own terms with `rollback: []`; cell 5 states which window it drives and
//     why (the residue's own effect is only readable on a composition that runs).
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
      repair: () => ({
        ok: true,
        message: 'y was repaired by the op this repair landed',
        op: store.write(address, 'mem', 'repaired').op,
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
  assert.equal(r.thrown.status, KC[6],
    'and it fails at the arm its own membership decides — `x` is IN `ran` and NOT in `appliedRepairs` — '
    + `read ${JSON.stringify(r.thrown.status)}; e2e-scenarios.md's E2E-C-2 step (6). THIS TOKEN IS ALSO `
    + "the skip's own observable: a call issued over an op an earlier call already swept would meet the "
    + 'store\'s own `RollbackCompacted` and make the arm `KC-8` (item 5 (b)), which is the state item 5 \''
    + '(a) exists to prevent (`scratch/live-constraints-gate6-out.txt`\'s `E2E-C-2.7`)');
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
  for (const opId of created) {
    assert.equal(swept.includes(opId), true,
      'AND EVERY OP THE ATTEMPT ITSELF CREATED IS REPORTED UNDONE by the composition\'s performed calls — '
      + `read ${JSON.stringify(swept)} against ${JSON.stringify(created)}; the performed set being the `
      + 'union of the steps\' `undoneOps` members and no wider (`§2.6` item 3; `contract.md §5.7`)');
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
  for (const opId of created) {
    assert.equal(swept.includes(opId), true,
      'and every op the attempt itself created is reported undone — read '
      + `${JSON.stringify(swept)} against ${JSON.stringify(created)}`);
  }
  // ── THE END STATE AT A FRESH ADDRESS, READ THROUGH THE STORE'S OWN VERB: the `null` arm's target is
  // the state the attempt's own first landing stood on, and at an address that held nothing that state is
  // the store's own absence — so the attempt's own write is left standing NOWHERE.
  const after = readAt(store, address);
  assert.equal(after.threw, true,
    'THE ADDRESS STANDS AT THE STORE\'S OWN ABSENCE after the failed attempt\'s composition — read '
    + JSON.stringify(after.threw ? after.thrown.status : after.value));
  assertStoreRefusal(after.thrown, 'the store\'s own read after the composition');
  assert.equal(after.thrown.status, 'AddressNotFound',
    'and it is the store\'s own code for an address that stands nowhere — read '
    + JSON.stringify(after.thrown.status));
  assert.equal(after.value, undefined,
    'and NOT a value: no clause of this unit leaves the attempt\'s own write readable there');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// 3 — `A111`'s STANDING LIMIT: THE CALLER'S OWN EARLIER WRITE THERE IS UNDONE BY THE STORE'S OWN REACH
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE, AT ITS ONE HOME (`composition-and-states.md §2.6` item 8 (iii)), IN THE RULING'S OWN WORDS:
 * **"A FAILED COMMIT AT AN ADDRESS THE CALLER ALREADY WROTE TO **UNDOES THE CALLER'S OWN EARLIER WRITE
 * THERE**"** — the store's own `rollback` **"walks BACKWARD over EVERY ENTRY TOUCHING THAT OP'S SUBTREE
 * TO THE OLDEST"** (`write-and-read.md §6.4` item 1's `M-5`, item 3's `M-7`, item 4's `M-8`), **"for ANY
 * OP THE KERNEL MAY LAWFULLY PASS"**, and **"NO COMMIT-LEVEL ROLLBACK EXISTS to aim past that reach"** —
 * and: **"SO ON THE `null` ARM THE ADDRESS STANDS WHERE THE STORE'S OWN REACH LEFT IT AND NOT AT A STATE
 * THIS KERNEL'S CLAUSES CAN AIM: after the composition's calls, the store's OWN answer — the `restoredTo`
 * and `undoneOps` members of the steps item 5 (a) records, and the state the caller's own `read(address,
 * tier?)` then answers — IS the end state."** The PRE-STATE CLAIM is **"`OWED` — TO THE STORE-SIDE PASS
 * `J-20`–`J-22` (`contract.md §7.3` clause 3), whose OWNER IS THE ARCHITECT"**, and **"NO CLAUSE OF THIS
 * DIRECTORY CLAIMS IT UNTIL THAT ROW LANDS: a `read` at such an address answering the caller's earlier
 * value is a store-side obligation and NOT a verification the closed caller-side surface can have"**.
 * `contract.md §5.7`'s FAILURE LIST names the same thing as the one claim this directory may not make:
 * **"NO COMPOSITION OF THIS KERNEL LEAVES THE CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S ADDRESS
 * STANDING."** `docs/decisions.md`'s ACTIVE row `A111` records the withdrawal, and the two clauses that
 * once spelled the pre-state — item 8 (iii)'s worked example and `§5.7`'s "the address answers THE
 * CALLER'S OWN EARLIER VALUE" — are WITHDRAWN BY NAME (the file's header carries both readings; this cell
 * asserts the STANDING ONE).
 *
 * THE THREE OBSERVABLES THE CLAUSE NAMES, EACH READ AT ITS OWN MEMBER: the composition's own performed
 * calls (`RollbackStep.opId`, `undoneOps`, `restoredTo` — §2.6 item 3, item 5 (a)) and the CALLER'S OWN
 * `read(address, tier?)`, which "IS the end state".
 *
 * STATES ENUMERATED FIRST: (1) the caller's own earlier write at the attempt's address, leaving a value
 * there and an op of its own in the store's journal — a PRE-EXISTING op, distinct from every op the
 * attempt creates; (2) the attempt's own ops, created after it, in that order; (3) the failing attempt
 * whose window passed NO checkpoint (`checkpoint` `null` on every step); (4) the end state at that
 * address, read off the steps' own members and through the store's own verb.
 *
 * FAIL STATES: **A BUILD THAT CLAIMS THE WITHDRAWN PRE-STATE** — the caller's own earlier op reported
 * undone by NO step, or the address answering the caller's own earlier value where the store's own reach
 * swept it; a step naming the pre-existing op (an op older than the attempt's own first op passed to the
 * store verb); a call list that is not item 2's; a `KC-8` thrown for a call the kernel should have
 * skipped (item 5 (a) — the state the live run's own `E2E-C-2.7` reached).
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
  assert.equal(r.thrown.status, KC[6],
    'and it fails at the window\'s OWN arm — the re-run violation carrying no repair — and NOT at the '
    + 'store\'s floor: item 5 (a) issues no call over an op an earlier call already reported undone, so '
    + 'the walk never meets a compacted base here and no `KC-8` is thrown — read '
    + `${JSON.stringify(r.thrown.status)}; \`composition-and-states.md §2.6\` item 5 (a) and item 5 (b)'s `
    + '`VF-10` bullet, whose worked case is the live run\'s own `E2E-C-2.7`');
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

  // (5) THE STANDING LIMIT, AT THE COMPOSITION'S OWN MEMBERS: the caller's own earlier op IS reported
  // undone by a call the composition performed. THIS IS THE ASSERTION A BUILD CLAIMING THE WITHDRAWN
  // PRE-STATE FAILS.
  const swept = closed.rollback.flatMap((s) => s.undoneOps);
  assert.equal(swept.includes(earlier.opId), true,
    'THE CALLER\'S OWN EARLIER WRITE AT THAT ADDRESS IS UNDONE, read off the store\'s own `undoneOps` '
    + `member — read ${JSON.stringify(swept)}; \`composition-and-states.md §2.6\` item 8 (iii): "A FAILED `
    + 'COMMIT AT AN ADDRESS THE CALLER ALREADY WROTE TO **UNDOES THE CALLER\'S OWN EARLIER WRITE '
    + 'THERE**", the store\'s own reach walking backward over every entry touching the named op\'s subtree '
    + 'to the OLDEST (`write-and-read.md §6.4` items 1/3/4) and no commit-level rollback existing to aim '
    + 'past it. A build that leaves this op standing claims the claim `A111` WITHDREW');
  for (const opId of created) {
    assert.equal(swept.includes(opId), true,
      'and every op the attempt itself created is reported undone by those same calls — read '
      + `${JSON.stringify(swept)} against ${JSON.stringify(created)}`);
  }

  // (6) THE STEP'S OWN `restoredTo` — THE STORE'S OWN MEMBER, and on the returning arm the state the
  // named op's subtree stood at: at an address whose every entry was swept, that state is ABSENT.
  const lastStep = closed.rollback[closed.rollback.length - 1];
  assert.equal(lastStep.restoredTo.present, false,
    'THE STEP\'S OWN `restoredTo` READS THE ADDRESS ABSENT after the sweep — the store\'s own '
    + `\`RollbackResult.restoredTo\` member, carried verbatim (\`§2.6\` item 3) — read `
    + `${JSON.stringify(lastStep.restoredTo)} against the value \`2\` the caller wrote there`);
  assert.equal(lastStep.restoredTo.value, undefined,
    'and it carries no value where none stands (the two-member \`BaseState\` is carried on both arms)');

  // (7) THE CALLER'S OWN `read(address, tier?)` — "IS the end state": the store's own refusal names the
  // absence, and NEVER the caller's own earlier value.
  const after = readAt(store, address);
  assert.equal(after.threw, true,
    'AND AFTER THE FAILED ATTEMPT THE CALLER\'S OWN READ AT THAT ADDRESS ANSWERS THE STORE\'S OWN '
    + '`AddressNotFound` — read ' + JSON.stringify(after.threw ? after.thrown.status : after.value)
    + '; `composition-and-states.md §2.6` item 8 (iii): "the state the caller\'s own `address.read('
    + 'tier?)` then answers — IS the end state", and item 8 (iii)\'s standing limit: "the address is '
    + 'ABSENT, the caller\'s own earlier write there being part of what the sweep removed"');
  assertStoreRefusal(after.thrown, 'the store\'s own read after the failed attempt\'s composition');
  assert.equal(after.thrown.status, 'AddressNotFound',
    'and the code is the store\'s own, never a kernel token — read '
    + JSON.stringify(after.thrown.status) + '; `A111`: "the caller\'s own earlier write at the attempt\'s '
    + 'address ends undone (`AddressNotFound`)"');
  assert.equal(after.value, undefined,
    'AND NEVER THE CALLER\'S OWN EARLIER VALUE: a `read` at such an address answering the caller\'s '
    + 'earlier value is a STORE-SIDE obligation and NOT a verification the closed caller-side surface '
    + 'can have — the pre-state claim `A111` withdrew and `OWED` to the store-side pass `J-20`–`J-22` '
    + '(`contract.md §0.1` item 5 (i))');
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
 * own origin); (3) a later `K-2` at that address, after the terminal arm — reached, a fresh record; (4)
 * the second attempt's own landing, its own `KC-3` failure arm, and the composition over its own op; (5)
 * the end state at that address, read off the step's own members and through the store's own verb.
 *
 * FAIL STATES: a second attempt refused (`KC-7` for the residue, or a write verb never reached); a second
 * attempt whose walk meets the floor and whose arm is NOT `KC-8` (a store code minted into the kernel's
 * own token, `RD-8`); MORE THAN ONE `outcome` entry, or an entry whose `message` does not name the store's
 * own code AND the op whose call met the floor (item 6 (a)); a floor arm that reports a rollback it did
 * not perform, or a step whose `undoneOps` is non-empty where the floor undoes nothing (`M-6`, all-or-
 * nothing, never partial); an end state in which the second attempt's own write was undone.
 */
test('ck_constraint_a_second_attempt_at_a_failed_attempts_address_meets_the_store_s_own_floor_and_closes_KC8', async () => {
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
    + '`M-9` residue), which is the entry the SECOND attempt\'s own walk then meets');

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
  assert.equal(secondRun.thrown.status, KC[8],
    'AND ITS COMPOSITION\'S OWN ANSWER IS THE FLOOR: a call over an op the composition STILL OWES whose '
    + 'candidate set includes the first attempt\'s own compacted entry fails the store\'s own '
    + '`RollbackCompacted`, and `§2.6` item 5 (b) makes that arm `KC-8` — read '
    + JSON.stringify(secondRun.thrown.status) + '; `fail-surface.md §2`\'s `KC-8` row. THE STORE\'S OWN '
    + 'CODE IS NEVER MINTED INTO THIS MEMBER (`RD-8`); it is carried in the step\'s `answer` and named in '
    + 'the `outcome` entry\'s message, both read below');

  const secondClosed = report(store, second.value.attempt);
  assertAttemptReport(secondClosed, 'the closed second attempt');
  const secondOps = secondClosed.ops.map((o) => o.opId);
  assert.equal(secondOps.length, 1, 'the second attempt created ONE op of its own');

  // (5) THE KERNEL'S OWN ANSWER, WITH ITS THREE PARTS (`§2.6` item 6): ONE `outcome` entry, its `state`
  // this item's token, its message naming the STORE'S own code and the op whose call met the floor.
  const outcomes = entries(secondClosed.log, 'outcome');
  assert.equal(outcomes.length, 1,
    'THE ATTEMPT\'S LOG CARRIES ITS SINGLE `outcome` ENTRY — appended ONCE and never twice, the floor being '
    + `answered IN THAT SAME ONE ENTRY (\`§2.6\` item 6 (a)) — read ${outcomes.length}`);
  assert.equal(outcomes[0].state, KC[8],
    'and its `state` is `KC-8` — read ' + JSON.stringify(outcomes[0].state)
    + '; `fail-surface.md §2`\'s `KC-8` row, read with `§2.6` item 6 (a)');
  assert.equal(outcomes[0].message.includes('RollbackCompacted'), true,
    'AND ITS MESSAGE NAMES THE STORE\'S OWN CODE AS THE STORE\'S ANSWER — read '
    + JSON.stringify(outcomes[0].message) + '; `§2.6` item 6 (a): "its message NAMES the store\'s own '
    + '`RollbackCompacted` … as the store\'s answer", and `§2.6` item 3: the third code is never minted '
    + 'into the kernel\'s own `status`');
  assert.equal(secondClosed.rollback.length, 1,
    'the composition recorded ONE step — one call ISSUED over the one still-owed op it holds (`§2.6` item '
    + '5 (a): "the step count is the calls ISSUED")');
  const floorStep = secondClosed.rollback[0];
  assertRollbackStep(floorStep, 'the floor\'s own step');
  assert.equal(floorStep.opId, secondOps[0],
    'and that call was made over the second attempt\'s OWN op — read ' + JSON.stringify(floorStep.opId)
    + ' against ' + JSON.stringify(secondOps));
  assert.equal(floorStep.answer, 'RollbackCompacted',
    'THE STEP\'S `answer` CARRIES THE STORE\'S OWN CODE IT THREW — read '
    + JSON.stringify(floorStep.answer) + '; `§2.6` item 3\'s throwing arm, `answer` being the store\'s code '
    + 'where the call threw');
  assert.equal(floorStep.failed, true,
    'and `failed` is `true` — THAT CALL THREW, and never a claim that the walk stopped (`§2.6` item 5 (a))');
  assert.equal(floorStep.undoneOps.length, 0,
    'AND NOTHING WAS UNDONE: the floor is ALL-OR-NOTHING and never partial (`write-and-read.md §6.4` item '
    + '2\'s `M-6`; `§2.6` item 3\'s throwing arm, `undoneOps: []`) — read '
    + JSON.stringify(floorStep.undoneOps));
  assert.equal(outcomes[0].message.includes(floorStep.opId), true,
    'AND THE ENTRY\'S MESSAGE NAMES THE OP WHOSE CALL MET THE FLOOR — read '
    + JSON.stringify(outcomes[0].message) + ' against ' + JSON.stringify(floorStep.opId)
    + '; `§2.6` item 6 (a)');
  const performed = secondClosed.rollback.flatMap((s) => s.undoneOps);
  assert.equal(performed.length, 0,
    'AND THE PERFORMED SET IS THE UNION OF THE STEPS\' `undoneOps` MEMBERS AND NO WIDER — no rollback is '
    + 'reported that was not performed (`§2.6` item 6 (c)) — read ' + JSON.stringify(performed));

  // (6) NOTHING IS RESTORED, READ THROUGH THE STORE'S OWN VERB: the second attempt's own write stands.
  const after = readAt(store, address);
  assert.equal(after.threw, false,
    'NOTHING IS RESTORED PAST THE COMPACTED BASE: the second attempt\'s own landed value still stands at '
    + 'that address — read ' + JSON.stringify(after.threw ? after.thrown.status : after.value)
    + '; `§2.6` item 6 (a), (c): "NOTHING IS RESTORED — the last-valid-state rule does not override the '
    + 'store\'s floor"');
  assert.equal(after.value, 3,
    'and it is the value the second attempt\'s own write landed — read '
    + JSON.stringify(after.value) + '; the floor undid no op, so no op of that attempt\'s was reversed');
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
