// RED SET — `U-STOREROOM-CONSTRAINTS`, THE `KC` ARMS, THE REPAIR, THE LOG AND THE PER-OP ROLLBACK
//
// DERIVED FROM THE CONTRACT ALONE: `contract.md §5.3`–`§5.8`, `attempt-lifecycle.md §2.4` item 4's
// transition table, `fail-surface.md §1`–`§2`, `parameter-semantics.md §2.5`–`§2.9` and `§2.17`,
// `composition-and-states.md §2.6`.
//
// ── THE STATES ENUMERATED BEFORE THE TESTS ─────────────────────────────────────────────────────
//
// THE CONSTRAINT'S OUTCOME (`PAR-C-5`) — a closed THREE-arm set:
//   (1) `true` → the pair passes.
//   (2) `{repair, message}` → a violation WITH a repair registered for that pair.
//   (3) `{message}` → a violation with NO repair; and A VALUE OUTSIDE THE THREE ARMS IS READ AS THIS
//       ARM and never as an arm of its own.
//
// THE REPAIR'S RESULT (`PAR-C-8`) — a closed TWO-arm set, its shape's ONE HOME being
// `parameter-semantics.md §2.7`'s `PAR-C-7` row (`A: docs/decisions.md` · `A110`):
//   (i) `{ok: true, message, op}` → the repair made its edit, AND `op` IS THE OP THAT EDIT LANDED —
//       THE STORE'S OWN `write` RETURN'S VALUE, the repair spelling it onto its own return, which is
//       the ONE channel the kernel reads it off (§2.7's seam clause: "nowhere else"; the ADDON route is
//       DELETED). That op is ADDED to `ops`, the pair is appended to `ran` and to `appliedRepairs`, and
//       the attempt returns to the evaluation. `op` IS REQUIRED IFF `ok === true`.
//   (ii) `{ok: false, message}` → the edit failed; `op` is ABSENT — never `null` — by declaration; the
//       `repair-run` entry carries the repair's own *"what was attempted"* WHOLE; and where the repair
//       supplied none, the kernel's own text.
//   AN `ok === true` RETURN WHOSE `op` IS ABSENT, `undefined` OR NOT THE OP THE REPAIR ACTUALLY LANDED
//   IS THE APP'S OWN DEFECT (§2.7; `attempt-lifecycle.md §2.4` item 4's arm `(d)`): NO op is credited,
//   the attempt takes arm `(d)` and fails `KC-4`, and its `repair-run` entry IS appended.
//   EVERY VALUE OUTSIDE THE TWO ARMS — a bare `true`, a bare `false`, `undefined`, `{ok: true,
//   message}` WITH NO `op`, `{ok: false}` with no message, any other object — IS READ AS ARM (ii),
//   whether or not the pair's repair had been recorded as applied, and the attempt's terminal answer
//   is `KC-4`. The `{ok: true, message}` fixture below is a declared OUTSIDE value (§2.8's `the values
//   OUTSIDE it` cell) and is therefore NOT re-spelled with an `op`: it carries none and lands no edit.
//
// THE TRANSITION TABLE (`attempt-lifecycle.md §2.4` item 4) — CLOSED, one arm per firing state:
//   (a) every pair passes on the FIRST evaluation → `commit` entry; registry entry removed; report
//       RETURNED.                                        ── E2E-C-1 (driven in the surface file)
//   (b) a FIRST evaluation violates and a repair IS registered → `constraint-check` + `repair-run`;
//       the repair runs through the caller's own verb; its op is ADDED and the pair appended to `ran`
//       and `appliedRepairs`.                            ── E2E-C-3
//   (c) a violation with NO repair for that pair, the pair NOT in `ran` → `KC-3`; rollback; THROW.
//   (d) a repair runs and produces NO op → `KC-4`; rollback; THROW.
//   (e) a REPEAT violation of a pair already in `ran` AND in `appliedRepairs` → `KC-5`; rollback; THROW.
//   (f) a REPEAT violation of a pair in `ran` NOT in `appliedRepairs` → `KC-6`; rollback; THROW.
//   (g) the re-run after an applied repair passes → the attempt returns to the evaluation.
//   A constraint body that throws, and a repair body that throws, both reach the caller as the
//   BODY'S OWN THROWABLE, unchanged and unconverted (`PAR-C-6`'s observable, `NX-2`).
//
// THE PER-OP ROLLBACK (`composition-and-states.md §2.6`) — the reach is exactly `AttemptRecord.ops`;
//   the order is the repaired ops in REVERSE of their creation, the attempt's first write's op LAST;
//   each call's own record is the six-member `RollbackStep`; an op a previous step already reported
//   in its `undoneOps` is SKIPPED; and a call meeting a still-owed compacted base is `KC-8`.

import test from 'node:test';
import assert from 'node:assert/strict';

// ⟶ RESHAPED: the package namespace carries ONE name (`surface.md §2.9` item 1's `A127` clause; `11 → 1`).

import {
  kernel, makeStore, tag, KC, KC_NAMES, STORE_CODES,
  assertKernelForm, assertLogEntry, assertSeqIncreasesFromOne, assertAttemptReport,
  assertRollbackStep, capture, entries, checkIds,
  passAtRegistration,
} from './constraint-kernel-helpers.mjs';

/** Every `repair-run` entry whose `id` is the pair's own bare id. */
function repairRunsFor(log, id) {
  return entries(log, 'repair-run').filter((e) => e.id === id);
}

/** The kernel's own eight tokens, stated locally so the assertions never depend on a helper's spelling. */
const KC_TOKENS = ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8'];

/**
 * **THE RCA'S MISSING SHAPE, ADDED AS ONE HELPER SO NO CELL RE-DECLARES IT** —
 * `rca-def-m-passing-repair.md` §"THE ACTUAL GAP, AND IT IS ONE LINE OF THE CELL": *"THE DEFECT REQUIRES A
 * BODY THAT **JUDGES** THE REPAIRED VALUE — one that refuses `9` and accepts `2` — AND **NO CELL IN THE
 * SUITE HAS ONE**."*
 *
 * A drive whose body repairs and then answers `true` UNCONDITIONALLY proves the repair's MECHANISM (an op
 * was produced, carried and credited) and cannot prove the JUDGEMENT (that what landed is a value the
 * constraint accepts). This is that judgement, factored out: it answers `true` for exactly the values the
 * `ck_states_arm_b` drive's constraint accepts, and `false` for every other value INCLUDING the one it was
 * asked to repair — so a call site that compares `store.read(address)` against it goes RED where the store
 * stands at a refused value after the attempt resolved as `passed`.
 *
 * **IT IS A PREDICATE OVER DATA AND NEVER A COUNT**: its argument is the value read back off the store's
 * own `read`, its answer is about that value alone, and it holds no reference to how many times anything ran.
 */
function landedValueIsLawful(value) {
  // THE ARM (b) DRIVE'S CONSTRAINT ACCEPTS THE SINGLE VALUE ITS OWN REPAIR WRITES, and refuses the value
  // the attempt was committed at ('broken') — the same two-valued shape the RCA's reproduction uses.
  return value === 'fixed';
}

function outcomeEntry(log) {
  const list = entries(log, 'outcome');
  // ⟶ AND THE DATA CHECK READS THE ENTRY ITSELF, NOT THE FILTER'S ARITHMETIC. The count below is
  // CONTRACT-PINNED and KEPT: `attempt-lifecycle.md §2.4` item 4's closed arm table gives each arm ONE
  // `outcome` entry ("appends the failing entry AND the `outcome` entry carrying THIS ARM'S `KC-3`"),
  // and `composition-and-states.md §2.7` item 13 fixes that entry's `state`. What was MISSING is what
  // the count stood in for: a second `outcome`-kind entry (`seq`, `id`, `opId`) whose presence would
  // make the *shape* this helper hands back — and every `state` assertion downstream — read the wrong
  // member of the log. So the entry returned IS asserted to be the `outcome` kind and to be a
  // whole six-member `LogEntry`, and a different log with the same count but the wrong content fails
  // here rather than downstream.
  assert.equal(list.length, 1,
    'an attempt has ONE outcome entry, and the closure writes it once — the floor appends no second one '
    + '(`attempt-lifecycle.md §2.4` item 4: each arm appends its own single `outcome` entry)');
  assertLogEntry(list[0], 'the one `outcome` entry the closure appends');
  assert.equal(list[0].kind, 'outcome',
    'and the entry handed back IS the `outcome` kind, read off the entry and not off the filter that '
    + 'selected it (`kernel-surface.md §2.5` item 1\'s kind table)');
  return list[0];
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §1  ARM (b) AND ARM (g) — A SUCCESSFUL REPAIR, ITS RE-RUN, AND THE OP IT ADDED
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_states_arm_b_a_successful_repair_adds_its_op_and_the_re_run_passes', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('rb')];
  let evaluations = 0;
  let violationOp = null;
  let landed = null; // THE OP THE REPAIR'S OWN VERB ANSWERED — read off the store, never fabricated
  const repairContexts = [];
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1 — AND `3-bis` IS WHY THE SHIELD IS MANDATORY: unshielded,
  // this body's FIRST evaluation is the REGISTRATION's, its `evaluations === 1` branch fires there, the
  // registration ATTEMPTS the repair, the repair lands `'fixed'`, and the attempt this cell drives begins
  // with the store already repaired — so its own two-op report is never produced. The shield answers the
  // registration `true`, the pair is carried (state 1), and `evaluations === 1` is the LANDING's own first
  // evaluation, exactly as the cell's comments read.
  register(store, address, 'x', passAtRegistration((ctx) => {
    evaluations += 1;
    if (evaluations === 1) {
      violationOp = ctx.op;
      return {
        repair: (rctx) => {
          repairContexts.push({ address: rctx.address, tier: rctx.tier, id: rctx.id, value: rctx.value, op: rctx.op });
          // THE REPAIR-OP SEAM (`parameter-semantics.md §2.7`, the shape's ONE HOME; `A: docs/decisions.md`
          // · `A110`): the repair SPELLS THE OP ITS OWN EDIT LANDED onto its own return — THE STORE'S OWN
          // `write` RETURN'S VALUE, READ HERE and never fabricated — and the kernel reads that op off this
          // return and nowhere else. The declared shape is `{ok, message, op}`, `op` REQUIRED IFF `ok === true`.
          // **⟶ THE FIFTH POSITION IS THE REPAIR'S OWN DECLARED CHANNEL, ADDED 2026-10-18.** *"A repair
          // function IS RETURNED BY THE CONSTRAINT THAT TRIGGERED IT and IS PASSED THE COMMIT IT IS PART OF, so
          // ITS OWN WRITE JOINS THAT COMMIT AS A NEW ENTRY"* (`docs/specs/storeroom-js/surface.md §2.11`
          // clause 6, the ONE home of that ruling; `PAR-C-7`, `A110`). **THE AS-FILED CALL PASSED FOUR
          // POSITIONS AND THEREFORE OPENED A SECOND ATTEMPT AT AN ADDRESS THIS ONE HOLDS — refused `KC-7`
          // internal to the kernel and surfaced as `KC-4`. `rctx` IS the `RepairContext` (`§2.3` item 2's six
          // members) and it IS the record its own write joins**, so the commit position carries it.
          const written = store.write(address, 'mem', 'fixed', rctx).op;
          landed = written;
          return { ok: true, message: 'the repair landed a lawful value at the attempt\'s address', op: landed };
        },
        message: 'a is invalid',
      };
    }
    return true;
  }));
  const commitRecord = commit(store, address, 'mem', 'broken');
  const report = runAttempt(store, commitRecord);
  assertAttemptReport(report, 'E2E-C-3 repair');
  assert.equal(report.outcome, 'passed', 'the re-run passed, so the attempt resolves');
  // ⟶ DATA CHECK, `attempt-lifecycle.md §2.4` item 4 arm `(b)` + arm `(g)`: *"ADDS THE OP THE REPAIR'S
  // OWN RETURN CARRIES — `returnValue.op`, the op its `{ok: true, op}` return names, read off that return
  // and nowhere else"* (`A: docs/decisions.md` · `A110`; `parameter-semantics.md §2.7`). The count the
  // cell used to read — `2` — is the ARITHMETIC of `the first write's op + the one op the repair landed`,
  // and `AttemptRecord.ops` is the declared carrier of what it stood for: the pair of ops the attempt
  // CREATED, in CREATION order. So the data check asserts the attempt's op LIST, member by member —
  // the two distinct ids, their order, and each one's own `kind` from the store's closed record — which
  // makes a report carrying one op, or two ops with the same identity, or a second op that is not the
  // repair's own, fail HERE; and the arithmetic is kept as the contract's own term beneath it.
  assert.deepEqual(report.ops.map((o) => o.opId), [commitRecord.op.opId, landed.opId],
    'the attempt\'s `ops` is EXACTLY its first write\'s op and the op its repair landed, in CREATION '
    + 'order (`attempt-lifecycle.md §2.4` item 1: *"EVERY op the attempt created, in CREATION order"*) — '
    + 'read as the list\'s own members and never as its length');
  assert.equal(report.ops[1].kind, 'write',
    'and the op arm `(b)` ADDS is the store\'s own `JournalOp` of kind `write` — the record read '
    + 'verbatim off the store (`§2.5` item 1; `kernel-surface.md §2.5` item 1), rather than a '
    + 'kernel-shaped substitute that happens to make the count right');
  assert.deepEqual(report.ops[1].address, landed.address,
    'and its `address` is the address the repair wrote at, unchanged');
  assert.equal(report.ops[1].opId, landed.opId,
    'AND THE SEAM IS PINNED AT THE RECORD: the op the report carries IS the op the caller\'s own '
    + '`write` verb answered, by identity — `parameter-semantics.md §2.7`\'s `observable` cell');
  assert.equal(report.ops.length, 2,
    'the count is KEPT and is the contract\'s own ARITHMETIC for arm `(b)`: the first write\'s op + the '
    + 'ONE op the repair landed and no third (`attempt-lifecycle.md §2.4` item 4 arm `(b)`: *"ADDS THE '
    + 'OP THE REPAIR\'S OWN RETURN CARRIES"*)');
  assert.deepEqual(checkIds(report.log), ['x', 'x'],
    'ONE evaluation per pass: the re-run\'s own constraint-check entry is the second');
  const runs = repairRunsFor(report.log, 'x');
  // ⟶ THE EXISTENCE CHECK IS NOT A SUBSTITUTE FOR THE COUNT: `runs[0]` must exist before it can be read,
  // so the count is kept beneath the data checks that give it its meaning, and those checks are the
  // subject — the entry's OWN members, which a second `repair-run` for this pair would now also fail.
  assert.equal(runs.length, 1, 'the pair\'s repair ran exactly once');
  assertLogEntry(runs[0], 'the pair\'s one `repair-run` entry');
  assert.equal(runs[0].kind, 'repair-run', 'and the entry IS the `repair-run` kind it is selected as');
  assert.equal(runs[0].id, 'x', 'and it names the pair\'s own BARE id (`attempt-lifecycle.md §2.4` item 2)');
  assert.equal(runs[0].opId, report.ops[1].opId, 'and the entry names the op it produced');
  assert.equal(runs[0].state, null, 'the repair-run entry carries no state token');
  // THE STORE STANDS WHERE THE REPAIR PUT IT, read at the store's own verb (`parameter-semantics.md §2.7`).
  assert.equal(store.read(address), 'fixed',
    'the repaired value STANDS in the store — the op arm `(b)` credited is the op that landed it');
  assert.deepEqual(report.rollback, [], 'the success arm rolls nothing back');
  assert.equal(entries(report.log, 'commit').length, 1, 'one commit entry, appended at the success arm');
  // THE REPAIR'S OWN CONTEXT (`parameter-semantics.md §2.6` / `§2.16`)
  assert.equal(repairContexts.length, 1, 'the repair ran once');
  assert.deepEqual(repairContexts[0].address, address, 'RepairContext.address is the address it acts at');
  assert.equal(repairContexts[0].tier, 'mem', 'RepairContext.tier is the tier the repair writes at');
  assert.equal(repairContexts[0].id, 'x', 'RepairContext.id is the pair\'s own bare id');
  assert.equal(repairContexts[0].value, 'broken', 'RepairContext.value is the value the violation was seen at');
  assert.equal(repairContexts[0].op.opId, violationOp.opId, 'RepairContext.op is the op that violated');
  // ⟶ AND THE RCA'S MISSING JUDGEMENT, ADDED (`rca-def-m-passing-repair.md`, §"THE ACTUAL GAP, AND IT IS
  // ONE LINE OF THE CELL"): the drive above returns `true` UNCONDITIONALLY on every evaluation after the
  // first, so it cannot prove the CONSTRAINT ACCEPTED what landed — it only proves the op landed. The
  // data check reads the ONE value the repair wrote back off the store and asserts it is a value the
  // drive's own body judges lawful, so a repair that landed a value the constraint refuses fails here
  // even where the op, the log and the count are all exactly as declared.
  assert.equal(store.read(address) === 'fixed', landedValueIsLawful(store.read(address)),
    'THE LANDED VALUE IS ONE THE CONSTRAINT ACCEPTS — the judgement `rca-def-m-passing-repair.md` names '
    + 'as the suite\'s missing subject, read off the store\'s own `read` after the attempt resolved');
});

test('ck_states_arm_c_a_violation_with_no_repair_is_KC3_and_the_log_carries_the_callers_own_text', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('rc')];
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THE PAIR IS REGISTERED AGAINST A STATE IT ACCEPTS, and
  // the violating value is written AFTERWARDS — the cell's subject (KC-3 and the caller's own text) is unmoved.
  register(store, address, 'x', passAtRegistration(() => ({ message: 'the caller\'s own violation string' })));
  const r = capture(() => runAttempt(store, commit(store, address, 'mem', 1)));
  assert.equal(r.threw, true, 'the attempt fails and the kernel THROWS with the log');
  assertKernelForm(r.thrown, 'KC-3');
  assert.equal(r.thrown.status, 'KC-3', 'ConstraintViolated');
  assertSeqIncreasesFromOne(r.thrown.log, 'KC-3 log');
  const check = entries(r.thrown.log, 'constraint-check');
  // ⟶ DATA CHECK, `attempt-lifecycle.md §2.4` item 4 arm `(c)` — *"appends the failing entry AND the
  // `outcome` entry carrying THIS ARM'S `KC-3`"* — read with `§2.4` item 5 (ii), which fixes the pass's own
  // order and says *"a pair the pass never reaches is NOT evaluated in that pass and appends NO entry"*.
  // The count (`1`) is the contract's own arithmetic for a one-pair pass, so it is KEPT; the data check
  // beneath it is what the count stood for — the entry's WHOLE declared content, every member named with a
  // value the clause fixes, so a log carrying one `constraint-check` entry of the wrong pair, the wrong
  // kind or the wrong state now fails here and not merely a log carrying two.
  assert.equal(check.length, 1, 'the failing evaluation appended its own entry');
  assertLogEntry(check[0], 'the arm (c) `constraint-check` entry');
  assert.deepEqual(Object.keys(check[0]).sort(), ['id', 'kind', 'message', 'opId', 'seq', 'state'],
    'the entry IS a whole six-member `LogEntry` (`kernel-surface.md §2.5` item 1)');
  assert.equal(check[0].kind, 'constraint-check',
    'and its `kind` is the pass evaluation\'s own (`§2.4` item 5 (ii): the evaluation appends a '
    + '`constraint-check` entry and no other kind)');
  assert.equal(check[0].seq, 1,
    'and it stands FIRST in the log — `seq` 1 — the failing evaluation being the log\'s opening entry '
    + '(`§2.4` item 5 (ii): its entry is appended before the arm\'s `outcome` entry)');
  assert.equal(check[0].opId, r.thrown.log.find((e) => e.seq === 1).opId,
    'and it names the op whose evaluation failed — the attempt\'s own first write\'s op, read off the '
    + 'entry\'s `opId` member (`kernel-surface.md §2.5` item 1)');
  assert.equal(check[0].message, 'the caller\'s own violation string',
    'the constraint\'s own string is CARRIED WHOLE, never rewritten');
  assert.equal(check[0].id, 'x', 'the entry names the pair\'s own bare id');
  assert.equal(check[0].state, null, 'a failing evaluation\'s entry carries no state token');
  const out = outcomeEntry(r.thrown.log);
  assert.equal(out.state, 'KC-3', 'the outcome entry carries THIS arm\'s KC-3 token');
  // ⟶ DATA CHECK FOR THE ZERO: a ZERO is a claim about absence, and the data form of that claim is that
  // NO entry of the `repair-run` kind stands ANYWHERE in the log — read as the set of kinds the log
  // actually carries, which is the property `§2.4` item 4 arm `(c)` owes (no repair is registered for the
  // pair, so the arm appends no `repair-run` entry) and which a log omitting the entry for the wrong
  // reason would now fail.
  assert.deepEqual([...new Set(r.thrown.log.map((e) => e.kind))].sort(), ['constraint-check', 'outcome'],
    'the arm\'s log carries EXACTLY the two kinds it declares — its `constraint-check` entry and its '
    + '`outcome` entry — and NO `repair-run`, because arm `(c)` is the arm reachable only where the pair '
    + 'has no repair registered (`§2.4` item 4 arms `(b)`/`(c)`\'s disjointness rule)');
  assert.ok(r.thrown.message.length > 0, 'the kernel composes its own sentence for the form');
});

test('ck_states_arm_c_a_value_outside_the_three_arms_is_read_as_the_message_arm', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('rc2')];
  // ⟶ `A135` (3) / `§7.3` (b) state 1: `undefined` is a VIOLATION (`VA-11` reads it as the `{message}` arm), so
  // the registration must be shielded or the pair is refused at registration and this arm is never reached.
  register(store, address, 'x', passAtRegistration(() => undefined));
  const r = capture(() => runAttempt(store, commit(store, address, 'mem', 1)));
  assert.equal(r.threw, true, 'an unrecognized return is read as the {message} arm and NEVER as an arm of its own');
  assert.equal(r.thrown.status, 'KC-3', 'so this arm\'s state is KC-3');
  const check = entries(r.thrown.log, 'constraint-check');
  // ⟶ DATA CHECK, `attempt-lifecycle.md §2.4` item 4 arm `(c)` read with `VA-11`/`VA-12`: a value outside
  // `ConstraintOutcome`'s three arms *"IS READ AS that `{message}` arm and NEVER as an arm of its own"*, so
  // the pass appends ONE `constraint-check` entry carrying the KERNEL'S OWN generated sentence and the
  // pair's own id — the entry's members are the property, and the count is the arithmetic of one pair
  // evaluated once in one pass (`§2.4` item 5 (iv): *"EACH EVALUATED ONCE IN THAT ORDER"*).
  assert.equal(check.length, 1, 'the evaluation still appended its own entry');
  assert.equal(check[0].kind, 'constraint-check',
    'and THAT is the entry — the pass\'s own kind, not an `outcome` or a `repair-run` standing in for it');
  assert.equal(check[0].id, 'x',
    'and it names the pair whose body returned the outside value (`§2.4` item 2\'s bare id)');
  assert.equal(typeof check[0].message, 'string', 'the kernel generates its own sentence for it');
  assert.ok(check[0].message.length > 0, 'the kernel\'s own generated text is never empty');
  assert.equal(outcomeEntry(r.thrown.log).state, 'KC-3', 'the outcome entry carries KC-3');
});

test('ck_states_arm_d_a_repair_that_produces_no_op_is_KC4_and_the_store_is_rolled_back', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('rd')];
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — AND `state 3` IS WHY THE SHIELD IS MANDATORY HERE: a body carrying a
  // `repair` meets state `3-bis` at registration, the repair is ATTEMPTED, produces no op, and the
  // registration is REFUSED with `ConstraintListInvalid` unless the shield makes the registration pass first.
  register(store, address, 'x', passAtRegistration(() => ({
    repair: () => ({ ok: false, message: 'could not find a lawful value at a' }),
    message: 'a is invalid',
  })));
  const r = capture(() => runAttempt(store, commit(store, address, 'mem', 'before')));
  assert.equal(r.threw, true, 'a repair that produced no op fails the attempt');
  assertKernelForm(r.thrown, 'KC-4');
  assert.equal(r.thrown.status, 'KC-4', 'ConstraintRepairFailed');
  const runs = repairRunsFor(r.thrown.log, 'x');
  // \u27f6 DATA CHECK, `attempt-lifecycle.md \u00a72.4` item 4 arm `(d)`: *"appends a `repair-run` entry carrying
  // what was ATTEMPTED AND the `outcome` entry carrying THIS ARM'S `KC-4`"*, read with `\u00a72.4` item 3
  // (`REPAIRING`): *"A repair that does not produce an op moves the attempt to `FAILING`"*. The count is
  // kept as the arm's own arithmetic (one repair ran, one entry stands); the data check beneath it reads
  // the entry's MEMBERS \u2014 its kind, its bare id, the attempt text carried whole \u2014 and the ONE
  // thing the entry must NOT carry, because arm `(d)` is precisely the arm on which no op was produced.
  assert.equal(runs.length, 1, 'the repair ran once and its entry was appended');
  assert.equal(runs[0].kind, 'repair-run', 'and the entry IS the `repair-run` kind the arm appends');
  assert.equal(runs[0].id, 'x', 'and it names the pair\'s own bare id (`\u00a72.4` item 2)');
  assert.equal(runs[0].message, 'could not find a lawful value at a',
    'the repair\'s own "what was ATTEMPTED" is CARRIED WHOLE, never regenerated');
  assert.equal(runs[0].state, null,
    'and the `repair-run` entry carries NO state token \u2014 the arm\'s `KC-4` belongs to the `outcome` '
    + 'entry alone (`fail-surface.md \u00a71.1` item 1 (b): `null` on the three non-`outcome` kinds)');
  assert.equal(runs[0].opId, r.thrown.log.find((e) => e.kind === 'constraint-check').opId,
    'AND THE PRODUCED-OP CHECK IS THE DATA CHECK THIS ARM EXISTS FOR: the repair produced NO op, so its '
    + '`repair-run` entry\'s `opId` is *"the op it was INVOKED FOR"* and NOT a fresh one '
    + '(`kernel-surface.md \u00a72.5` item 1\'s kind table; `attempt-lifecycle.md \u00a72.4` item 4 arm `(d)`) '
    + '\u2014 so the entry names the pair\'s own evaluation op by identity, read as a member and never '
    + 'as a count of ops');
  assert.equal(outcomeEntry(r.thrown.log).state, 'KC-4', 'the outcome entry carries THIS arm\'s KC-4 token');
});

test('ck_states_arm_d_every_value_outside_the_two_repair_arms_is_read_as_the_failure_arm', async () => {
  const outside = [
    ['a bare true', () => true],
    ['a bare false', () => false],
    ['undefined', () => undefined],
    ['{ok: true, message}', () => ({ ok: true, message: 'x' })],
    ['{ok: false} with no message', () => ({ ok: false })],
    ['any other object', () => ({ ok: 'yes' })],
  ];
  for (const [why, repair] of outside) {
    const { register, commit, runAttempt } = await kernel();
    const store = makeStore();
    const address = [tag('rd2')];
    // ⟶ `A135` (3) / `§7.3` (b) state 1: shielded, so the registration stands and the OUTSIDE repair value is
    // the one the LANDING's attempt reads — which is this cell's subject.
    register(store, address, 'x', passAtRegistration(() => ({ repair, message: 'a is invalid' })));
    const r = capture(() => runAttempt(store, commit(store, address, 'mem', 1)));
    assert.equal(r.threw, true, `${why}: read as a repair that produced no op, so the attempt fails`);
    assert.equal(r.thrown.status, 'KC-4', `${why}: the terminal answer is KC-4`);
    const runs = repairRunsFor(r.thrown.log, 'x');
    // \u27f6 DATA CHECK (`attempt-lifecycle.md \u00a72.4` item 4 arm `(d)`'s third named form): an OUTSIDE value
    // is read as *"a repair that produced no op"*, so the entry that stands carries the KERNEL'S OWN
    // sentence for that arm and NOT the outside value's own text \u2014 the property the count could only
    // assert the presence of. A log whose entry echoed `'x'`, `'yes'` or `''` back now fails here.
    assert.equal(runs.length, 1, `${why}: the repair ran once`);
    assert.equal(runs[0].kind, 'repair-run', `${why}: the appended entry is the arm's own \`repair-run\` kind`);
    assert.equal(runs[0].id, 'x', `${why}: and it names the pair whose repair was attempted`);
    assert.ok(runs[0].message.length > 0, `${why}: the kernel's own generated sentence stands where none was supplied`);
    assert.equal(runs[0].message.trim() !== '', true,
      `${why}: and that sentence is not whitespace-only \u2014 the arm\'s message is a real sentence ` +
      `(\`fail-surface.md \u00a71.1\` item 2: the kernel's message is never empty)`);
    assert.equal(outcomeEntry(r.thrown.log).state, 'KC-4',
      `${why}: and the arm's \`KC-4\` stands on the \`outcome\` entry and on no other member ` +
      `(\`fail-surface.md \u00a71.1\` item 1 (b))`);
  }
});

test('ck_states_a_repair_body_that_throws_reaches_the_caller_unconverted', async () => {
  const { register, commit, runAttempt, log } = await kernel();
  const store = makeStore();
  const address = [tag('rd3')];
  const body = new RangeError('the repair\'s own throwable');
  const report = { attempt: null };
  // ⟶ `A135` (3) / `§7.3` (b) state 1: without the shield the registration itself reaches state `3-bis`, runs
  // this repair, and the body's throw surfaces AT THE REGISTRATION — a different call from the one this cell
  // drives (`runAttempt`). The shield moves no assertion: the throw still travels to `runAttempt`'s caller.
  register(store, address, 'x', passAtRegistration(() => ({ repair: () => { throw body; }, message: 'a is invalid' })));
  const commitRecord = commit(store, address, 'mem', 1);
  const r = capture(() => runAttempt(store, commitRecord));
  assert.equal(r.threw, true, 'the body\'s throw travels to the caller');
  assert.equal(r.thrown, body,
    'the caller\'s channel carries the BODY\'S OWN THROWABLE and NEVER a kernel form carrying KC-4');
  assert.equal(KC_TOKENS.includes(r.thrown.status), false,
    'so the thrown value carries no kernel state token at all');
  // AND THE RECORD IS STILL PLACED: the attempt's terminal record is reachable, its outcome is failed
  const back = log(store, commitRecord.attempt);
  assert.ok(Array.isArray(back), 'the attempt\'s record is closed and reachable');
  const out = outcomeEntry(back);
  assert.equal(out.state, 'KC-4', 'the attempt\'s own outcome entry carries KC-4 on the repair-body path');
  assert.equal(repairRunsFor(back, 'x').length, 1, 'and the repair-run entry was appended before the throw');
  report.attempt = commitRecord.attempt;
});

test('ck_states_a_constraint_body_that_throws_reaches_the_caller_unconverted', async () => {
  const { register, commit, runAttempt, log } = await kernel();
  const store = makeStore();
  const address = [tag('rc3')];
  const body = new TypeError('the constraint\'s own throwable');
  // ⟶ `A135` (3) / `§7.3` (b): a THROWING body at its registration surfaces AS ITSELF out of `register`
  // (`kernel-surface.md §2.3` item 1's clause of 2026-10-17; `fail-surface.md §1.1` item 5) — so the shield
  // lets the registration stand and the body throws at the ATTEMPT, which is the call this cell drives.
  register(store, address, 'x', passAtRegistration(() => { throw body; }));
  const commitRecord = commit(store, address, 'mem', 1);
  const r = capture(() => runAttempt(store, commitRecord));
  assert.equal(r.threw, true, 'the constraint body\'s throw travels to the caller');
  assert.equal(r.thrown, body, 'the body\'s own throwable, UNCHANGED AND UNCONVERTED');
  const back = log(store, commitRecord.attempt);
  const out = outcomeEntry(back);
  assert.equal(out.state, null,
    'on the CONSTRAINT-body path the outcome entry\'s state is null — no KC token stands there');
  assert.equal(entries(back, 'constraint-check').length, 0,
    'a body that threw returned nothing, so its own entry was never appended');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §2  ARMS (e) AND (f) — THE FIRST-REPEAT RULE AND ITS TWO LIMBS
// ═══════════════════════════════════════════════════════════════════════════════════════════════

// ── `P-NEG-8` · `S-SECOND-VIOLATION` — RE-DRIVEN AT THIS PASS, BECAUSE THE CELL'S OWN SUBJECT HAD
//    BEEN DRIVEN OUT FROM UNDER IT (`contract.md §5.6`'s second strategy line, at its own bytes: "the
//    same constraint violated twice with no repair ever registered for it, so its pair never enters
//    `appliedRepairs`: its FIRST EVALUATION PASSES, its second violates, the attempt FAILS `KC-6`, and
//    the pair's OWN VIOLATION COUNT for that pair's own key is `1` and never `2` — ITS
//    `constraint-check` ENTRIES UNDER THAT KEY BEING `2` AND NEVER `3`").
//
//    THE DRIVE THIS CELL CARRIED: `x` returned `{}` — the `{message}` arm, which is a VIOLATION, not a
//    pass — on its FIRST evaluation, so `x` took the FIRST-VIOLATION arm at the first pass, where
//    `contract.md §5.6`'s own clause reads "a pair whose first violation is unanswered by a repair
//    fails at its own first evaluation (`KC-3`) ... so limb (ii)'s state is reachable ONLY where the
//    pair's first evaluation passes". The drive was therefore asserting a state the row it cites
//    declares UNREACHABLE, and it passed only because the source under it did not yet take the
//    transition at the first violating pair (`P-NEG-1`). THE FIX IS THE ROW'S OWN SHAPE: `x` PASSES on
//    the first pass, `y` violates there and its repair lands an op, and the RE-RUN breaks `x`.
test('ck_states_arm_f_a_repeat_by_a_pair_whose_repair_is_not_recorded_reaches_the_floor_arm_and_the_repair_never_ran', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('rf')];
  let x = 0;
  // `x` HAS NO REPAIR AT ALL and its FIRST evaluation PASSES (`§5.6`: limb (ii)'s state is reached
  // only where the first evaluation passes), so its pair never enters `appliedRepairs`.
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THE PAIR IS REGISTERED AGAINST A STATE IT ACCEPTS, and the
  // violating value is written AFTERWARDS. `passAtRegistration` hands the registration its own `true` and every
  // LANDING's context to this body, so the pass order the cell asserts is unmoved.
  register(store, address, 'x', passAtRegistration(() => {
    x += 1;
    return x === 1 ? true : { message: 'x is broken by the re-run' };
  }));
  let y = 0;
  register(store, address, 'y', passAtRegistration(() => {
    y += 1;
    return y === 1
      // **⟶ THE FIFTH POSITION, 2026-10-18:** the repair's own write JOINS the commit it is part of
      // (`docs/specs/storeroom-js/surface.md §2.11` clause 6; `PAR-C-7`).
      ? { repair: (rctx) => { const landed = store.write(address, 'mem', 'y-fixed', rctx).op; return { ok: true, message: 'y was repaired at the same address', op: landed }; }, message: 'y is invalid' }
      : true;
  }));
  // pass 1: x PASSES on v, y violates there and its repair lands a new op ⇒ the re-run breaks x.
  const r = capture(() => runAttempt(store, commit(store, address, 'mem', 'v')));
  assert.equal(r.threw, true, 'the re-run fails the attempt');
  // ── **⟶ RE-DERIVED 2026-10-16 — THE TOKEN MOVES `KC-6` → `KC-8`, AND THE CELL'S SUBJECT IS KEPT AT
  // THE CLAUSE THAT NOW GOVERNS IT.** The attempt's own membership still decides the LIMB (`x` is IN
  // `ran` and OUT of `appliedRepairs`, as the log below still shows), **but the arm the CALLER receives is
  // the FLOOR'S**: under `M-5` (a) (ii) the first performed call reverses only `y`'s repair's op, leaving
  // it compacted (`M-9`), so the second call — over the attempt's own commit op, which is still owed —
  // meets that residue and `M-6` fails it. **`composition-and-states.md §2.6` item 6 (a) rules exactly
  // this case once and by name: "WHICH CLAUSE GOVERNS THE ENTRY'S `state` WHERE THE ATTEMPT'S OWN BODY
  // THREW *AND* THE COMPOSITION MET THE FLOOR IS RULED HERE, ONCE ... THE FLOOR GOVERNS — this clause's
  // rule is applied to EVERY path on which the attempt's own composition meets the floor", and "the
  // attempt has ONE `outcome` ENTRY, ITS `state` IS THIS ITEM'S `KC-8` ... and NO SECOND ENTRY IS
  // APPENDED"** — read with item 5 (b) (an owed op's call meeting either floor code is `KC-8`) and
  // `write-and-read.md §6.4` item 2's `M-6`.
  assert.equal(r.thrown.status, 'KC-8',
    'ConstraintRollbackFloor — the floor governs because the composition MET it; the LIMB the cell reads '
    + '(limb (ii), `x` IN `ran` and OUT of `appliedRepairs`) is still asserted at the log below, and the '
    + `floor's precedence over it is §2.6 item 6 (a)'s own ruling — read ${JSON.stringify(r.thrown.status)}`);
  assert.deepEqual(checkIds(r.thrown.log), ['x', 'y', 'x'],
    'x\'s own key carries EXACTLY TWO `constraint-check` entries — its first, passing evaluation and '
    + 'its second, violating one — and never three (§5.6, `S-SECOND-VIOLATION`)');
  assert.equal(x, 2, 'and the pair was evaluated twice: the row\'s own count for that pair\'s key is the '
    + 'number of ITS entries, never the log\'s total');
  assert.deepEqual(repairRunsFor(r.thrown.log, 'x').length, 0, 'x carries no repair at all, so its count is 0');
  assert.equal(repairRunsFor(r.thrown.log, 'y').length, 1, 'y\'s repair ran once');
  assert.equal(outcomeEntry(r.thrown.log).state, 'KC-8',
    'AND THE ATTEMPT\'S ONE `outcome` ENTRY CARRIES THE FLOOR\'S TOKEN — §2.6 item 6 (a): "the floor is '
    + 'answered IN THAT SAME ONE ENTRY ... and NO SECOND ENTRY IS APPENDED" — read '
    + JSON.stringify(outcomeEntry(r.thrown.log).state));
  assert.equal(outcomeEntry(r.thrown.log).message.includes('RollbackCompacted'), true,
    'and its `message` NAMES the store\'s own code as the store\'s answer, as item 6 (a) requires — read '
    + JSON.stringify(outcomeEntry(r.thrown.log).message));
});

test('ck_states_arm_e_a_repeat_by_a_pair_already_recorded_as_applied_reaches_the_floor_arm_and_runs_no_second_repair', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('re')];
  // x violates on the FIRST evaluation and its repair lands a value y is violated by
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — AND `3-bis` IS THE REASON THE SHIELD IS MANDATORY for a body carrying a
  // `repair`: without it the registration ATTEMPTS this repair immediately and the pair's own first evaluation
  // is consumed by the registration, which is not the pass order this cell asserts.
  register(store, address, 'x', passAtRegistration(() => ({ repair: (rctx) => {
    // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6; `PAR-C-7`).
    const landed = store.write(address, 'mem', 'x-fixed', rctx).op;
    return { ok: true, message: 'x was repaired at the same address', op: landed };
  }, message: 'x is invalid' })));
  register(store, address, 'y', passAtRegistration(() => ({ repair: (rctx) => {
    // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6; `PAR-C-7`).
    const landed = store.write(address, 'mem', 'y-fixed', rctx).op;
    return { ok: true, message: 'y was repaired at the same address', op: landed };
  }, message: 'y is invalid' })));
  const r = capture(() => runAttempt(store, commit(store, address, 'mem', 'v')));
  assert.equal(r.threw, true, 'x is broken again by y\'s repair, so the attempt fails');
  // ── **⟶ RE-DERIVED 2026-10-16 — THE TOKEN MOVES `KC-5` → `KC-8`; THE CELL'S OWN OBSERVATION IS KEPT.**
  // The repeat the pair reaches is STILL limb (i) — `x` is in `ran` AND in `appliedRepairs` — and the
  // repair-run count below STILL proves no repair ran twice. **What moved is which clause governs the
  // CALLER'S token:** the composition now MEETS the floor (the first call reverses only the newer op and
  // leaves it compacted, so the second call over the still-owed older op fails `M-6` all-or-nothing), and
  // **`composition-and-states.md §2.6` item 6 (a) rules that the FLOOR GOVERNS on every path where it is
  // met — "the attempt has ONE `outcome` ENTRY, ITS `state` IS THIS ITEM'S `KC-8` ... and NO SECOND ENTRY
  // IS APPENDED"** — read with item 5 (b) and `write-and-read.md §6.4` item 2's `M-6`.
  assert.equal(r.thrown.status, 'KC-8',
    'ConstraintRollbackFloor — the floor governs because the composition MET it, and it overrides the '
    + 'repeat limb the pair\'s own state still decides (`§2.6` item 6 (a)) — read '
    + JSON.stringify(r.thrown.status));
  assert.deepEqual(repairRunsFor(r.thrown.log, 'x').length, 1,
    'arm (e)\'s own observation: the count for that pair is exactly 1 and NEVER 2 — no repair ran twice');
  assert.equal(outcomeEntry(r.thrown.log).state, 'KC-8',
    'and the attempt\'s ONE `outcome` entry carries the floor\'s token, by identity with `status` '
    + '(`fail-surface.md §1.1` item 1 (c); `§2.6` item 6 (a)) — read '
    + JSON.stringify(outcomeEntry(r.thrown.log).state));
});

test('ck_states_the_two_repeat_limbs_are_disjoint_by_the_appliedRepairs_member_and_not_by_the_count', async () => {
  // ═══ RE-DERIVED AT THE CONTRADICTION-REPAIR PASS, READING `attempt-lifecycle.md §2.4` ITEM 4's OWN
  // CLOSING CLAUSE AND ITEM 5 (ii)/(iii) AT THEIR BYTES, TOGETHER WITH `kernel-surface.md §2.5` ITEM 3.
  //
  // THE OLD DRIVE'S FAULT: `x → {}` — the OUTSIDE form, which `parameter-semantics.md §2.7` reads as the
  // `{message}` arm with an EMPTY repair — made x's FIRST evaluation a violation with no repair for its
  // pair, so the transition was taken THERE (`(c)`, `KC-3`) and x NEVER REACHED limb (ii) at all. The
  // clause: *"a pair's first violation with no repair registered fails it at `(c)` … so a pair reaches
  // `(e)` or `(f)` only by having run at least once before"*. BOTH limbs are therefore driven HERE, each
  // by a pair that RAN BEFORE, and the arm each drive reaches is read off `ran`/`appliedRepairs` ALONE:
  //
  //   WINDOW (ii) — `KC-6`: x PASSES on the committed value (⇒ in `ran`, never in `appliedRepairs`);
  //     y's repair LANDS and the re-run reaches x at that landing, where x violates with no repair
  //     registered ⇒ IN `ran` AND OUT of `appliedRepairs` ⇒ limb (ii).
  //   WINDOW (i) — `KC-5`: x's OWN repair LANDS and x violates AGAIN at that very landing ⇒ IN `ran`
  //     AND IN `appliedRepairs` ⇒ limb (i); its own repair-run count stays EXACTLY 1 — the count is the
  //     observable and never the discriminator (`§2.5` item 3: "NO repair function is invoked a second
  //     time").
  // THE DISJOINTNESS IS READ OFF THE PAIR'S OWN STATE AND NOT OFF THE COUNT: both windows carry a pair
  // whose own repair-run count is 0 (`KC-6`) and 1 (`KC-5`) respectively, while a COUNT-driven reading
  // would answer the same token for both (`fail-surface.md §2`'s `KC-5`/`KC-6` rows).
  const { register, commit, runAttempt } = await kernel();
  const limbs = [];
  {
    const store = makeStore();
    const address = [tag('re2')];
    let x = 0;
    register(store, address, 'x', passAtRegistration(() => {
      x += 1;
      return x === 1 ? true : { message: 'x is invalid at the re-run and registers no repair' };
    }));
    register(store, address, 'y', passAtRegistration(() => ({ repair: (rctx) => {
      // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6).
      const landed = store.write(address, 'mem', 'y2', rctx).op;
      return { ok: true, message: 'y was repaired by the op this repair landed', op: landed };
    }, message: 'y is invalid on the committed value' })));
    limbs.push(['KC-6', 'OUT', capture(() => runAttempt(store, commit(store, address, 'mem', 'v')))]);
  }
  {
    const store = makeStore();
    const address = [tag('re2b')];
    register(store, address, 'x', passAtRegistration(() => ({ repair: (rctx) => {
      // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6).
      const landed = store.write(address, 'mem', 'x2', rctx).op;
      return { ok: true, message: 'x was repaired by the op this repair landed', op: landed };
    }, message: 'x is invalid at every evaluation' })));
    limbs.push(['KC-5', 'IN', capture(() => runAttempt(store, commit(store, address, 'mem', 'v')))]);
  }
  // ── **⟶ RE-DERIVED 2026-10-16 — THE CELL'S DISJOINTNESS IS KEPT AND THE MEMBER THAT CARRIES IT MOVED.**
  // The cell used to read the LIMB off the caller's `status`. **The floor now governs that member on both
  // windows** (`composition-and-states.md §2.6` item 6 (a): "THE FLOOR GOVERNS ... on EVERY path on which
  // the attempt's own composition meets the floor"), because under `M-5` (a) (ii) each window's first call
  // leaves a compacted residue the second call meets. **So the discriminator is read where the clause puts
  // it — the pair's OWN registry membership, `ran` versus `appliedRepairs`, whose home is
  // `attempt-lifecycle.md §2.4` item 4's closing clause, and whose OBSERVABLE is the pair's own
  // repair-run count** (`kernel-surface.md §2.5` item 3). The cell's own sentence — "THE DISJOINTNESS IS
  // READ OFF THE PAIR'S OWN STATE AND NOT OFF THE COUNT" — is thereby kept, and the caller's token is
  // asserted to be the SAME on both windows, which is exactly what makes the underlying limbs
  // indistinguishable from `status` and distinguishable from the pair's state.
  for (const [token, membership, r] of limbs) {
    assert.equal(r.threw, true, `the limb (${token}) drive fails the attempt`);
    assert.equal(r.thrown.status, 'KC-8',
      'BOTH WINDOWS REACH THE FLOOR, so the caller\'s own token is the SAME ON BOTH and cannot be the '
      + 'discriminator (`§2.6` item 6 (a), the floor\'s precedence) — read '
      + `${JSON.stringify(r.thrown.status)} on the ${token} window whose limb is ${membership} \`appliedRepairs\``);
  }
  assert.equal(repairRunsFor(limbs[0][2].thrown.log, 'x').length, 0,
    'window (ii)\'s own observation: the repeating pair\'s repair-run count is 0 — no repair was registered'
    + ' for its pair at all, and its FIRST evaluation had PASSED, so it is IN `ran` and OUT of '
    + '`appliedRepairs` — limb (ii), `attempt-lifecycle.md §2.4` item 4\'s closing clause');
  assert.equal(repairRunsFor(limbs[1][2].thrown.log, 'x').length, 1,
    'window (i)\'s own observation: the repeating pair\'s repair-run count is EXACTLY 1 — it is IN `ran` '
    + 'AND IN `appliedRepairs` — limb (i); the count is the observable on both limbs and the '
    + 'discriminator on neither (`kernel-surface.md §2.5` item 3)');
  assert.notEqual(repairRunsFor(limbs[0][2].thrown.log, 'x').length,
    repairRunsFor(limbs[1][2].thrown.log, 'x').length,
    'AND THE TWO WINDOWS ARE DISJOINT AT THE PAIR\'S OWN STATE, which the caller\'s token no longer '
    + 'shows: 0 repairs applied versus 1');
  assert.equal(entries(limbs[0][2].thrown.log, 'constraint-check').filter((e) => e.id === 'x').length, 2,
    'and the pair of each window carries TWO checks: its passing first evaluation and its one repeat');
  assert.equal(entries(limbs[1][2].thrown.log, 'constraint-check').filter((e) => e.id === 'x').length, 2,
    'on the KC-5 window too — its repair\'s landing is the op of its second check');
});

/**
 * RE-DERIVED AT THE RED-SET RE-DERIVATION PASS, READING `fail-surface.md §1.1` ITEM 1 AT ITS BYTES.
 *
 * THE OLD CELL'S THREE FAULTS: its driver registered a pair whose body returns `{}` — the ARM VALUE the
 * clause's own three-arm rule reads as the MESSAGE arm — and then never asserted anything about the
 * refusal the drive produced; its first assertion (`KC_TOKENS.includes(r.thrown.status)`) did not
 * discriminate a token from a full name only because the map's VALUE was the full name; and its second
 * assertion compared `KC_TOKENS` to a literal, a constant read against itself, which no clause pins.
 *
 * WHAT THIS CELL NOW DRIVES, per §1.1 item 1 (a)–(d):
 *  - (a) "the refusal's `status` carries the TOKEN — `KC-1` … `KC-8` — AND NOTHING ELSE";
 *  - (c) `LogEntry.state` "carries THE SAME TOKEN … related by IDENTITY" — asserted as STRING EQUALITY;
 *  - (d) a full name is a LABEL, used in §2's `name` column and beside a token in a citation, and NEVER
 *    a member's value — asserted on BOTH members and on the store's own closed set.
 * The drive reaches the repeat by a pair whose registered repair has NOT run, which is limb (ii)'s
 * `KC-6` (`kernel-surface.md §2.5` item 3) — so the ONE token the refusal must carry is `KC[6]`.
 */
test('ck_states_each_refused_repeat_token_is_one_of_the_eight_and_is_never_a_store_member', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 8 });
  const address = [tag('re3')];
  // ═══ RE-DERIVED AT THE CONTRADICTION-REPAIR PASS, READING `attempt-lifecycle.md §2.4` ITEM 4's OWN
  // CLOSING CLAUSE AT ITS BYTES. THE OLD DRIVE'S FAULT: it made x take the MESSAGE arm with NO repair on
  // EVERY evaluation, so x's FIRST evaluation was itself a violation with no repair registered — the
  // clause prints that case at arm `(c)`: *"a pair's first violation with no repair registered fails it
  // at `(c)` … so a pair reaches `(e)` or `(f)` ONLY BY HAVING RUN AT LEAST ONCE BEFORE"*. The first
  // violation is reached at ONCE and `KC-3` is the ONLY answer the clause admits (`§2.4` item 5 (ii)/
  // (iii) fix the transition at the FIRST evaluating violating pair) — and that is exactly the arm the
  // sibling cell `ck_neg_1_…` drives and asserts. Limb (ii)'s state is therefore reached ONLY by a pair
  // that RAN BEFORE and passed there: PAIR x PASSES on its FIRST evaluation, so it is appended to `ran`
  // (`§2.4` item 1) and — a passing pair never entering `appliedRepairs` — stands IN `ran` AND OUT of
  // `appliedRepairs` when y's landing repair drives the re-run onto the op at which x now violates.
  // THE TOKEN THE REFUSAL MUST CARRY IS `KC[6]` EXACTLY (`kernel-surface.md §2.5` item 3 limb (ii);
  // `fail-surface.md §2`'s `KC-6` row).
  const xSeen = [];
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — AND THE SHIELD IS WHAT MAKES THIS CELL'S OWN PASS ORDER REACHABLE:
  // without it the registration consumes x's FIRST evaluation, so the pair is never in `ran`/out of
  // `appliedRepairs` in the state this row names. The registration PASSES, and the LANDING's first
  // evaluation is the body's own first (`true`), exactly as the row declares.
  register(store, address, 'x', passAtRegistration(() => {
    xSeen.push('evaluated');
    return xSeen.length === 1
      ? true // PASSES on the committed value: this is what puts the pair in `ran` and out of `appliedRepairs`
      : { message: 'x is invalid at the re-run and registers no repair' };
  }));
  // PAIR y's repair LANDS, which is what drives the re-run onto the op at which x repeats.
  let ny = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — and state `3-bis` is why the shield is mandatory for a body carrying
  // a `repair`: unshielded, the registration ATTEMPTS this repair and y's first evaluation is spent there.
  register(store, address, 'y', passAtRegistration(() => {
    ny += 1;
    if (ny === 1) return { repair: (rctx) => {
      // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6).
      const landed = store.write(address, 'mem', `ry${ny}`, rctx).op;
      return { ok: true, message: 'y was repaired by the op this repair landed', op: landed };
    }, message: 'y is invalid on the committed value' };
    return true; // passes at its own repair's landing, so the pass carries on to x and closes there
  }));
  const r = capture(() => runAttempt(store, commit(store, address, 'mem', 'v')));
  assert.equal(r.threw, true, 'the attempt is refused');
  // ── **⟶ RE-DERIVED 2026-10-16 — THE TOKEN MOVES `KC-6` → `KC-8`; THE CELL'S OWN SUBJECT IS KEPT.**
  // The pair that repeated IS STILL the one IN `ran` and OUT of `appliedRepairs` — that is read at the
  // log below, and the check list is unmoved — but the token the caller receives is the FLOOR'S, because
  // under `M-5` (a) (ii) the composition now MEETS it: the first call reverses only the repair's op and
  // leaves it compacted, so the second call over the still-owed older op fails `M-6`. **The governing
  // clause is `composition-and-states.md §2.6` item 6 (a): "THE FLOOR GOVERNS — this clause's rule is
  // applied to EVERY path on which the attempt's own composition meets the floor"**, and the cell's
  // remaining assertions — that the token is ONE OF THE EIGHT, never a full name, never a store member,
  // and identical across `status` and `state` — are UNMOVED and still falsify on their own subjects.
  assert.equal(r.thrown.status, KC[8],
    'the pair that repeated was IN `ran` and OUT of `appliedRepairs` — limb (ii) — and the token the '
    + 'CARRIER now reads is the floor\'s, the floor governing wherever it is met (`§2.6` item 6 (a)); read '
    + JSON.stringify(r.thrown.status));
  assert.equal(KC_TOKENS.includes(r.thrown.status), true,
    'THE TOKEN IS ONE OF `KC-1` … `KC-8` AND NOTHING ELSE (`fail-surface.md §1.1` item 1 (a))');
  assert.deepEqual(checkIds(r.thrown.log), ['x', 'y', 'x'],
    'AND THE PAIR WHOSE REPEAT DECIDED RAN BEFORE, AS `§2.4` ITEM 4\'s CLOSING CLAUSE REQUIRES: x\'s key '
    + 'carries its own PASSING first evaluation and then the violating one, and the re-run\'s landing op '
    + 'is the op both entries of y stand against — read ' + JSON.stringify(checkIds(r.thrown.log)));
  assert.equal(Object.values(KC_NAMES).includes(r.thrown.status), false,
    'AND IT IS NEVER A FULL NAME: `ConstraintRepeat` is §2\'s `name` column, a LABEL, and no member of '
    + 'the kernel\'s surface carries a label as its value (§1.1 item 1 (d))');
  const outcome = r.thrown.log.filter((e) => e.kind === 'outcome');
  assert.equal(outcome.length, 1, 'the refusal\'s own log carries exactly one `outcome` entry');
  assert.equal(outcome[0].state, KC[8],
    'AND `LogEntry.state` CARRIES THE SAME TOKEN, `status` and `state` being related by IDENTITY — '
    + 'asserted as STRING EQUALITY and not as membership of a set (§1.1 item 1 (c)) — read '
    + JSON.stringify(outcome[0].state));
  assert.equal(outcome[0].state === r.thrown.status, true,
    'identity: one token, read twice, from two members');
  assert.equal(STORE_CODES.includes(r.thrown.status), false,
    'AND IT IS NEVER A STORE MEMBER: the kernel\'s eight are closed and disjoint from the store\'s own '
    + `${STORE_CODES.length} — the figure READ OFF the list and never printed by hand `
    + '(`fail-surface.md §1.1` item 1 (a); `§3`; `contract.md §8.1`\'s amended heading, 16 members)');
  assert.equal(STORE_CODES.includes(outcome[0].state), false,
    'on both members, and the store\'s own report never reaches the caller converted');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §3  THE PER-OP ROLLBACK — THE ORDER, THE `RollbackStep` RECORD AND THE STOP CONDITION
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * RE-DERIVED AT THE STALE-EXPECTATION RE-DERIVATION PASS, READING `composition-and-states.md §2.6` ITEMS
 * 2 AND 5 (a) AT THEIR BYTES.
 *
 * THE OLD FORM ASSERTED A STEP COUNT NO BUILD CAN PRODUCE. It drove THREE ops AT ONE ADDRESS and then
 * asserted `performed === [...ops.slice(1).reverse(), ops[0]]` — a step for EVERY op, and
 * `performed.length === opIds.length`. §2.6 item 5 (a) forbids exactly that: *"WHERE A RETURNED CALL'S
 * OWN `undoneOps` MEMBER REPORTS AN OP UNDONE, EVERY STILL-OWED OP OF THE SAME SUBTREE THAT LIES AFTER IT
 * IS ALREADY UNDONE BY THAT SAME CALL — the store's per-op reach being TOTAL OVER ITS SCOPE — SO THE
 * KERNEL SKIPS EVERY ONE OF THEM: an op already reported undone by an earlier call's own `undoneOps`
 * member is NOT A STILL-OWED OP … and THE STEP COUNT STAYS THE NUMBER OF CALLS ISSUED"*, the same item
 * reading *"the composition's step count is the number of calls ISSUED over the still-owed ops and MAY RUN
 * BELOW that list's size"*; `contract.md §5.7`'s `P-TP-7` carries the identical sentence. On ONE address
 * the store's `rollback(opId)` is scoped to that op's own subtree (`A: docs/specs/storeroom-native/
 * write-and-read.md §6.4` item 1's `M-5` scope, item 3's `M-7` backward walk to the oldest, item 4's `M-8`
 * totality), so the composition's FIRST call — item 2's first member, the last-created repaired op —
 * already reports EVERY op of that window undone, and the remaining ops are SKIPPED. ONE step is the calls
 * issued; three steps is not producible.
 *
 * THE WINDOW CHOSEN: OPTION (i), THE SAME-ADDRESS WINDOW UNDER THE SKIP — the drive below is kept at ONE
 * address, and what is asserted is what item 2 and item 5 (a) actually fix: the FIRST call is issued over
 * the list's FIRST member (the last-created repaired op, and never the attempt's first write), the
 * performed steps are a SUBSEQUENCE of item 2's total order with no call issued over a later-still-owed op
 * out of order, NO call is issued over an op an earlier step's own `undoneOps` member already reports
 * undone, and every op the attempt created is accounted for by a declared reading (`§2.6` item 8 (ii) (5):
 * a step's passed `opId`, a member of an earlier step's `undoneOps`, or the checkpoint op itself).
 *
 * STATES ENUMERATED BEFORE THE DRIVE — the ops are created in this order and ALL AT ONE ADDRESS:
 *   (1) `op-1`, the attempt's FIRST WRITE (the commit's own landing) — x violates on it;
 *   (2) `op-2`, x's repair's landing — x passes there and y violates;
 *   (3) `op-3`, y's repair's landing — y violates AGAIN for good → the attempt's own membership decides
 *       limb `(e)`.
 * The checkpoint is `null` (no landing at the attempt's own address left EVERY registered pair there
 * passing), so item 2's list is the whole of `ops` reversed: `[op-3, op-2, op-1]`.
 *
 * **⟶ AND THE SKIP THIS CELL WAS BUILT TO EXERCISE NO LONGER FIRES, WHICH IS THE CELL'S ONE RE-DERIVED
 * FACT OF 2026-10-16 (`role_test_writer`).** Item 5 (a)'s skip is decided by a returned call's own
 * `undoneOps` member; under `M-5` (a) (ii) a call reverses only entries at or after ITS OWN named op, so
 * the first call over `op-3` reports `op-3` ALONE and the two later list members are each still owed.
 * The second call over `op-2` then meets the residue the first left and `M-6` fails it, undoing nothing —
 * so `op-1` is never reached and the composition issues TWO calls, not three. **THE SKIP'S RULE AND ITS
 * OBSERVABLE ARE UNCHANGED — "THE SKIP'S OBSERVABLE THEREFORE DOES NOT MOVE ... the member reports what
 * the store PERFORMED, and what the store performed is narrower now" (`§2.6` item 5 (a)'s dated clause) —
 * and what this window now exhibits is that clause's OWN named consequence: "a still-owed op that an
 * earlier call's `undoneOps` member does NOT report was NOT undone by that call AND GETS ITS OWN CALL."**
 * The "skip arm and not a degenerate one" assertion is therefore re-derived to what this window can
 * honestly show: the performed calls are item 2's list PREFIX, and the call that stopped the walk met the
 * floor.
 *
 * FAIL STATES: a step standing for an op an earlier call already reported undone (the second call item 5
 * (a) forbids); a step missing where an op was still owed AND the walk had not stopped at a floor; a call
 * issued out of item 2's order (the first write called before a repaired op); a first call over an op
 * that is not the list's first member; an op of the attempt in neither a step's `opId`, an earlier step's
 * `undoneOps`, nor the checkpoint member, where the walk ran to its end.
 */
test('ck_states_the_composition_runs_repaired_ops_first_in_reverse_then_the_first_write_last', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 8 });
  const address = [tag('ro')];
  // PAIR x takes arm (b) on the committed value and PASSES at its own repair's landing (so the loop is
  // free to evaluate y at that op), and takes arm (b) ONCE more at y's repair's landing; at its THIRD
  // evaluation it is IN `ran` AND IN `appliedRepairs` — limb `(e)`, whose answer is `KC-5`.
  let nx = 0;
  let ny = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1: the registration must pass or x's own evaluation counter starts at the
  // registration, and the THIRD-evaluation state this cell reads is never reached.
  register(store, address, 'x', passAtRegistration(() => {
    nx += 1;
    if (nx === 1) return { repair: (rctx) => {
      // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6).
      const landed = store.write(address, 'mem', `rx${nx}`, rctx).op;
      return { ok: true, message: 'x was repaired by the op this repair landed', op: landed };
    }, message: 'x is invalid on the committed value' };
    if (nx === 2) return true; // passes on x's own repair's landing — no repeat, the pass continues
    return { message: 'x fails for good at the second repair\'s landing' };
  }));
  register(store, address, 'y', passAtRegistration(() => {
    ny += 1;
    if (ny === 1) return { repair: (rctx) => {
      // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6).
      const landed = store.write(address, 'mem', `ry${ny}`, rctx).op;
      return { ok: true, message: 'y was repaired by the op this repair landed', op: landed };
    }, message: 'y is invalid at the first repair\'s landing' };
    return { message: 'y fails for good' };
  }));
  const commitRecord = commit(store, address, 'mem', 'v');
  const r = capture(() => runAttempt(store, commitRecord));
  assert.equal(r.threw, true, 'the attempt fails');
  // ── **⟶ THE TOKEN MOVES `KC-5` → `KC-8` (`§2.6` item 6 (a): the floor governs wherever the composition
  // meets it). THE CELL'S OWN SUBJECT — ITEM 2'S ORDER — IS UNMOVED AND IS ASSERTED BELOW.**
  assert.equal(r.thrown.status, 'KC-8',
    'THE ARM THIS DRIVE\'S OWN MEMBERSHIP DECIDES: x is IN `ran` AND IN `appliedRepairs` at its third '
    + 'evaluation — limb `(e)` (`attempt-lifecycle.md §2.4` item 4) — and THE CARRIER READS THE FLOOR, '
    + 'because the composition met it: the second call over `op-2` meets the residue the first call left '
    + 'and `M-6` fails it all-or-nothing (`§2.6` item 6 (a), the floor\'s precedence; read '
    + JSON.stringify(r.thrown.status) + ')');
  assert.equal(outcomeEntry(r.thrown.log).state, 'KC-8',
    'and the outcome entry carries the SAME token as the thrown form\'s status');
  // ⟶ DATA CHECK (`attempt-lifecycle.md §2.4` item 4 arm `(e)`: *"the arm's own `repair-run` entry count
  // for that pair is `1` and never `0`"*) — THE COUNTS BELOW ARE THE CONTRACT'S OWN TERMS AND ARE KEPT,
  // because arm `(e)` versus arm `(f)` is decided by MEMBERSHIP and the arithmetic (`1` repair, `3` and `1`
  // evaluations) is what makes this drive's arm the one limb `(e)` names. The data checks beneath them read
  // WHAT the log and the two bodies actually hold, so a run with the right counts and the wrong entries
  // fails: the `repair-run` entry's own `opId` must be the op x's repair landed, and the EVALUATIONS the
  // counters record must be the ones the log's own `constraint-check` entries stand for — the same
  // numbers, derived from the log's members rather than trusted from a closure.
  const xRuns = repairRunsFor(r.thrown.log, 'x');
  assert.equal(xRuns.length, 1,
    'arm (e)\'s own count for that pair: its repair ran ONCE and never twice '
    + '(`attempt-lifecycle.md §2.4` item 4 arm `(e)`)');
  assert.equal(xRuns[0].kind, 'repair-run', 'and the entry standing for it is the `repair-run` kind');
  assert.equal(xRuns[0].id, 'x', 'and it names x\'s own bare id');
  assert.equal(nx, 3, 'x was evaluated once per pass over the ops the attempt created');
  assert.equal(ny, 1, 'y was evaluated once, in the pass its repair landed in');
  // ⟶ AND THE COUNTERS ARE RECONCILED AGAINST THE LOG'S OWN MEMBERS: `x` carries one `constraint-check`
  // entry per pass it was evaluated in, and `y` one — so the two closure counters above are the log's own
  // data and not a private tally that could drift from it (`§2.4` item 5 (iv): a pass's evaluated set is
  // fixed when the pass begins, each pair evaluated once in it).
  assert.equal(checkIds(r.thrown.log).filter((id) => id === 'x').length, nx,
    'x\'s evaluation count IS the number of its own `constraint-check` entries — read off the log, so '
    + 'the tally and the log cannot disagree');
  assert.equal(checkIds(r.thrown.log).filter((id) => id === 'y').length, ny,
    'and y\'s is the number of ITS entries, by the same reading');
  const closed = report(store, commitRecord.attempt);
  assertAttemptReport(closed, 'the closed attempt\'s report');
  assert.ok(closed.rollback.length >= 1, 'the composition ran at least once');
  for (const s of closed.rollback) assertRollbackStep(s, 'RollbackStep');
  const opIds = closed.ops.map((o) => o.opId);
  assert.equal(opIds.length, 3,
    'THIS ATTEMPT OWED THREE OPS — the first write and the two the repairs landed — so the ORDER read '
    + 'below is non-degenerate (`composition-and-states.md §2.6` item 2)');
  assert.equal(opIds[0], commitRecord.op.opId, 'ops[0] is the attempt\'s first write');
  // ITEM 2'S OWN LIST, FIXED AT COMPOSITION TIME: the repaired ops in REVERSE of their creation, then the
  // attempt's first write's op last (`§2.6` item 2: "the order is TOTAL over `ops`").
  const list = [...opIds.slice(1).reverse(), opIds[0]];
  const performed = closed.rollback.map((s) => s.opId);
  assert.equal(performed[0], list[0],
    '§2.6 item 2, verbatim: THE FIRST CALL IS ISSUED OVER THE LIST\'S OWN FIRST MEMBER — the '
    + 'last-created repaired op — and NEVER over the attempt\'s first write, which the same clause puts '
    + `LAST — read ${JSON.stringify(performed[0])} against ${JSON.stringify(list[0])}`);
  let lastIndex = -1;
  for (const opId of performed) {
    const at = list.indexOf(opId);
    assert.equal(at > lastIndex, true,
      'AND NO CALL IS ISSUED OUT OF ITEM 2\'S ORDER: the performed steps are a SUBSEQUENCE of the '
      + `declared list — read ${JSON.stringify(opId)} at index ${at} after index ${lastIndex}`);
    lastIndex = at;
  }
  const reportedUndone = new Set();
  for (const step of closed.rollback) for (const undone of step.undoneOps) reportedUndone.add(undone);
  // ── AND THE WALK'S OWN STOP, READ UNDER THE AMENDED SCOPE (§2.6 item 5 (a)'s dated clause of
  // 2026-10-16): the performed calls are the list's PREFIX, and the call that ended the walk is the one
  // that met the floor. **A member carries no step because an earlier call reported it undone** ("THE
  // SKIP'S OBSERVABLE THEREFORE DOES NOT MOVE ... the member reports what the store PERFORMED") **OR
  // because the walk stopped at a failed call — "a still-owed op that an earlier call's `undoneOps`
  // member does NOT report was NOT undone by that call AND GETS ITS OWN CALL", and no call follows one
  // that threw.**
  const stopAt = closed.rollback.findIndex((s) => s.failed === true);
  const walked = stopAt === -1 ? list.length : stopAt + 1;
  assert.deepEqual(performed, list.slice(0, walked),
    'THE PERFORMED CALLS ARE ITEM 2\'S LIST\'S OWN PREFIX, CUT AT THE CALL THAT MET THE FLOOR (`§2.6` '
    + 'items 2 and 5 (a)) — read ' + JSON.stringify(performed) + ' against ' + JSON.stringify(list)
    + `; the failing call stands at index ${stopAt} and no call is issued after it`);
  assert.equal(stopAt !== -1, true,
    'AND THE WALK ENDED AT A FAILED CALL AND NOT BY EXHAUSTING THE LIST: one step carries `failed: true` '
    + `(§2.6 item 5 (b)) — read ${JSON.stringify(closed.rollback.map((s) => [s.opId, s.failed, s.answer]))}`);
  assert.equal(closed.rollback[stopAt].answer, 'RollbackCompacted',
    'and its `answer` is the store\'s own code, carried verbatim (`§2.6` item 3) — read '
    + JSON.stringify(closed.rollback[stopAt].answer));
  for (const opId of list.slice(walked)) {
    assert.equal(reportedUndone.has(opId), false,
      'AND NO OP BEYOND THE STOP IS REPORTED UNDONE — the floor undoes nothing, so a member the walk never '
      + `reached stands in no \`undoneOps\` member — read ${JSON.stringify(opId)} against `
      + JSON.stringify([...reportedUndone]));
  }
  assert.equal(performed.includes(commitRecord.op.opId), false,
    'AND THE ATTEMPT\'S FIRST WRITE IS NOT PASSED TO THE VERB IN THIS WINDOW, although item 2 puts it '
    + `LAST in the list: the walk stopped before reaching it — read ${JSON.stringify(performed)}`);
  const covered = new Set();
  for (const step of closed.rollback) {
    covered.add(step.opId);
    for (const undone of step.undoneOps) covered.add(undone);
  }
  for (const opId of opIds) {
    const byPassed = covered.has(opId);
    const isCheckpoint = closed.rollback.length > 0 && closed.rollback[0].checkpoint === opId;
    const beyondStop = list.slice(walked).includes(opId);
    assert.equal(byPassed || isCheckpoint || beyondStop, true,
      'and no op the attempt created is left unaccounted for by a declared reading — a step\'s passed '
      + '`opId`, a member of a step\'s `undoneOps`, the checkpoint op, or a member of the list BEYOND the '
      + 'call that met the floor (`§2.6` item 8 (ii) (5), re-read at its 2026-10-16 clause: "the value it '
      + 'wrote STANDS" where the amended scope puts it out of the walk) — read ' + JSON.stringify(opId));
  }
  assert.equal(new Set(performed).size, performed.length,
    '`undoneOps` prevents a SECOND call over the same `opId`; every `opId` here appears ONCE');
});

/**
 * RE-DERIVED AT THE STALE-EXPECTATION RE-DERIVATION PASS, READING `composition-and-states.md §2.6` ITEM 5
 * (a) AND ITEM 2 AT THEIR BYTES.
 *
 * THE OLD FORM ASSERTED `closed.rollback.length === 3` — a step per op — over ONE address holding three
 * ops, in the same window as the cell above; its own message read that figure out of the window's size
 * ("so THREE calls stand and never one"). Item 5 (a) makes that count unproducible and forbids reading it
 * that way: *"WHERE A RETURNED CALL'S OWN `undoneOps` MEMBER REPORTS AN OP UNDONE, EVERY STILL-OWED OP OF
 * THE SAME SUBTREE THAT LIES AFTER IT IS ALREADY UNDONE BY THAT SAME CALL — the store's per-op reach being
 * TOTAL OVER ITS SCOPE — SO THE KERNEL SKIPS EVERY ONE OF THEM … and THE STEP COUNT STAYS THE NUMBER OF
 * CALLS ISSUED"*, together with *"the composition's step count is the number of calls ISSUED over the
 * still-owed ops and MAY RUN BELOW that list's size, so no drive reads a skip out of a step count"*
 * (`A: docs/specs/storeroom-native/write-and-read.md §6.4` items 1/3/4: `M-5` scope, `M-7` walk, `M-8`
 * totality); `contract.md §5.7`'s `P-TP-7` carries the identical sentence.
 *
 * THE WINDOW CHOSEN: OPTION (i), THE SAME-ADDRESS WINDOW UNDER THE SKIP — the same drive as the cell above
 * (three ops the attempt created at ONE address), because this window is the one whose steps actually
 * exercise the clause this cell now pins: the composition issues its calls over the list's still-owed
 * members, the FIRST call's own `undoneOps` member covers the two members after it, and the steps that
 * stand are exactly the calls ISSUED. THE `≥ 1` FORM THE CLAUSE ASKS FOR IS ASSERTED FIRST, and the six
 * members are read on EVERY step the composition issued — never on a fixed count of three.
 *
 * STATES ENUMERATED BEFORE THE DRIVE — the ops are created in this order and ALL AT ONE ADDRESS:
 *   (1) `op-1`, the attempt's FIRST WRITE (the commit's own landing) — x violates on it;
 *   (2) `op-2`, x's repair's landing — x PASSES there and y violates;
 *   (3) `op-3`, y's repair's landing — y violates AGAIN for good → arm `(e)`, `KC-5`, the terminal arm.
 * THE `checkpoint` MEMBER: no landing at the attempt's own address left EVERY registered pair there passing
 * (x violated its commit's own landing), so the member is `null` and item 2's list is the whole of `ops`
 * reversed: `[op-3, op-2, op-1]`. The composition therefore issues ONE call — over `op-3` — and the two
 * members after it are skipped; every step still carries its SIX declared members and the arm's own
 * `checkpoint`.
 *
 * FAIL STATES: a fixed step count read out of the window's size instead of the calls issued; a step
 * carrying fewer or more than the six declared members; a `checkpoint` member absent or read off a call's
 * own landing rather than off the attempt's own address; a second call over an `opId` a returned call's own
 * `undoneOps` member already reports undone; an op of the attempt in neither a step's `opId`, a step's
 * `undoneOps`, nor the checkpoint member.
 */
test('ck_states_every_step_carries_the_six_declared_members_and_the_arm_s_own_checkpoint', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 8 });
  const address = [tag('ro2')];
  // PAIR x takes arm (b) on the committed value and PASSES at its own repair's landing (so the pass's own
  // remainder is free to evaluate y at that op), then violates for good at y's repair's landing.
  let nx = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` makes it mandatory for this body: unshielded, the
  // registration ATTEMPTS x's repair immediately and consumes its first evaluation, so the arm-(b)-then-
  // arm-(e) order this cell asserts at `nx === 1`/`nx === 3` is never reached.
  register(store, address, 'x', passAtRegistration(() => {
    nx += 1;
    if (nx === 1) return { repair: (rctx) => {
      // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6).
      const landed = store.write(address, 'mem', `rx${nx}`, rctx).op;
      return { ok: true, message: 'x was repaired by the op this repair landed', op: landed };
    }, message: 'x is invalid on the committed value' };
    if (nx === 2) return true; // passes at its own repair's landing: the pass continues
    // THE TERMINAL ARM AT ITS OWN MEMBERSHIP: x's repair ran and landed at its FIRST evaluation, so at
    // this third one the pair is IN `ran` AND IN `appliedRepairs` — LIMB `(e)` and its `KC-5`.
    return { message: 'x fails for good' };
  }));
  let ny = 0;
  register(store, address, 'y', passAtRegistration(() => {
    ny += 1;
    if (ny === 1) return { repair: (rctx) => {
      // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6).
      const landed = store.write(address, 'mem', `ry${ny}`, rctx).op;
      return { ok: true, message: 'y was repaired by the op this repair landed', op: landed };
    }, message: 'y is invalid at the first repair\'s landing' };
    return { message: 'y fails for good' };
  }));
  const commitRecord = commit(store, address, 'mem', 'v');
  const r = capture(() => runAttempt(store, commitRecord));
  assert.equal(r.threw, true, 'the attempt fails');
  // ── **⟶ THE TOKEN MOVES `KC-5` → `KC-8` (`§2.6` item 6 (a): the floor governs wherever the composition
  // meets it). THE CELL'S OWN SUBJECT — THE SIX DECLARED MEMBERS ON EVERY ISSUED STEP — IS UNMOVED.**
  assert.equal(r.thrown.status, 'KC-8',
    'and it fails at THE ARM ITS OWN MEMBERSHIP DECIDES — y is IN `ran` AND IN `appliedRepairs` at its '
    + 'second evaluation, limb `(e)` (`attempt-lifecycle.md §2.4` item 4) — while the CARRIER reads the '
    + 'floor the composition met (`§2.6` item 6 (a); read ' + JSON.stringify(r.thrown.status) + ')');
  assert.equal(outcomeEntry(r.thrown.log).state, 'KC-8',
    'and the outcome entry carries the same token as the thrown form\'s status');
  const closed = report(store, commitRecord.attempt);
  assertAttemptReport(closed, 'the closed attempt\'s report');
  assert.equal(closed.ops.length, 3,
    'the attempt owed THREE ops — the first write and the two the repairs landed — so the list below is '
    + `non-degenerate — read ${closed.ops.length}`);
  const opIds = closed.ops.map((o) => o.opId);
  const list = [...opIds.slice(1).reverse(), opIds[0]];
  assert.ok(closed.rollback.length >= 1,
    'THE COMPOSITION ISSUED AT LEAST ONE CALL — the count this cell reads is the calls ISSUED and never '
    + 'the list\'s size (`§2.6` item 5 (a): "the step count is the number of calls ISSUED over the '
    + 'still-owed ops and MAY RUN BELOW that list\'s size")');
  // ── **⟶ AND THE COUNT STILL RUNS BELOW THE LIST'S SIZE, FOR THE AMENDED SCOPE'S OWN DECLARED REASON:
  // the walk STOPS at the call that met the floor (`§2.6` item 5 (b)).** The superseded window ran below
  // the size because ONE call swept the whole subtree; this one runs below it because the second call
  // threw and no call follows. **The clause's own words for the narrowed set are kept: "the member reports
  // what the store PERFORMED, and what the store performed is narrower now" (`§2.6` item 5 (a)'s dated
  // clause of 2026-10-16).**
  assert.equal(closed.rollback.length < list.length, true,
    'and here it DOES run below the list\'s size: a member an earlier returned call\'s own `undoneOps` '
    + 'member already reports undone is skipped, AND no call follows the one that met the floor — read '
    + `${closed.rollback.length} steps over a list of ${list.length}`);
  const performed = closed.rollback.map((s) => s.opId);
  assert.equal(performed[0], list[0],
    'AND THE FIRST CALL IS OVER THE LIST\'S OWN FIRST MEMBER — the last-created repair\'s op — with the '
    + 'attempt\'s first write standing LAST in item 2\'s list — read ' + JSON.stringify(performed[0]));
  let performedIndex = -1;
  const covered = new Set();
  for (const s of closed.rollback) {
    // THE SIX DECLARED MEMBERS, READ ON EVERY STEP THE COMPOSITION ISSUED (`§2.6` item 5 (a): "every step
    // carries its six members"; item 3's block: `opId`, `answer`, `failed`, `undoneOps`, `restoredTo`,
    // `checkpoint`).
    assertRollbackStep(s, 'every call of the composition');
    assert.equal(Object.keys(s).length, 6,
      'RollbackStep is SIX members and never a seventh — read ' + JSON.stringify(Object.keys(s)));
    const at = list.indexOf(s.opId);
    assert.equal(at > performedIndex, true,
      'AND NO CALL IS ISSUED OUT OF ITEM 2\'S ORDER: the performed steps are a SUBSEQUENCE of the '
      + `declared list — read ${JSON.stringify(s.opId)} at index ${at} after index ${performedIndex}`);
    performedIndex = at;
    assert.equal(covered.has(s.opId), false,
      '`undoneOps` prevents a SECOND call over the same `opId`: no step is minted for an op the '
      + `composition already issued a call over, and a returned call's own report is the only member that `
      + `decides the skip — read ${JSON.stringify(s.opId)}`);
    covered.add(s.opId);
    // THE SIXTH MEMBER IS THE ARM'S OWN `checkpoint`, and it is the ATTEMPT'S ONE VALUE on every step
    // (item 5 (a); item 8 (i) fixes the member's domain address-wide).
    assert.equal(s.checkpoint === null || typeof s.checkpoint === 'string', true,
      'checkpoint is a declared member, NEVER absent, and is the attempt\'s own value on every step — '
      + `read ${JSON.stringify(s.checkpoint)}`);
    assert.equal(s.checkpoint, null,
      'AND READ OFF THE ATTEMPT\'S OWN ADDRESS AND NEVER OFF A CALL\'S OWN LANDING: no landing at the '
      + `attempt's own address left EVERY registered pair there passing — x violated the address's own `
      + `first landing — read ${JSON.stringify(s.checkpoint)}`);
    assert.equal(typeof s.failed, 'boolean',
      '`failed` is a boolean and it is THAT CALL\'S OWN ANSWER');
    assert.ok(Array.isArray(s.undoneOps),
      '`undoneOps` is THE STORE\'S own report of the reversals that call performed');
    for (const undone of s.undoneOps) covered.add(undone);
  }
  // THE WALK'S STOP, READ OFF THE DECLARED MEMBERS ALONE: no call follows the one that met the floor, and
  // every member of item 2's list is accounted for by one of `§2.6` item 8 (ii) (5)'s readings or by
  // standing BEYOND that stop.
  const stopAt = closed.rollback.findIndex((s) => s.failed === true);
  assert.equal(stopAt !== -1, true,
    'ONE ISSUED CALL MET THE FLOOR AND CARRIES `failed: true` — `§2.6` item 5 (b) — read '
    + JSON.stringify(closed.rollback.map((s) => [s.opId, s.failed, s.answer])));
  assert.equal(closed.rollback[stopAt].answer, 'RollbackCompacted',
    'and its `answer` is the store\'s own code, carried verbatim (`§2.6` item 3) — read '
    + JSON.stringify(closed.rollback[stopAt].answer));
  assert.deepEqual(performed, list.slice(0, stopAt + 1),
    'AND THE PERFORMED CALLS ARE THE LIST\'S PREFIX UP TO AND INCLUDING THAT CALL — read '
    + JSON.stringify(performed) + ' against ' + JSON.stringify(list.slice(0, stopAt + 1)));
  const beyondStop = list.slice(stopAt + 1);
  assert.ok(beyondStop.length > 0,
    'THIS WINDOW IS NOT A DEGENERATE ONE: the list holds members beyond the stop — read '
    + JSON.stringify(beyondStop));
  for (const opId of beyondStop) {
    assert.equal(covered.has(opId), false,
      'AND NO MEMBER BEYOND THE STOP IS REPORTED UNDONE — the floor undoes nothing, so nothing it stopped '
      + `at is in any \`undoneOps\` member — read ${JSON.stringify(opId)}`);
  }
  for (const opId of opIds) {
    const byMembers = covered.has(opId);
    const isCheckpoint = closed.rollback[0].checkpoint === opId;
    assert.equal(byMembers || isCheckpoint || beyondStop.includes(opId), true,
      'every op of the attempt is either a step\'s passed `opId`, or named in a step\'s `undoneOps`, or '
      + 'the checkpoint op itself (`§2.6` item 8 (ii) (5)) OR it stands BEYOND THE CALL THAT MET THE '
      + 'FLOOR, where its value STANDS — the reading that clause\'s own 2026-10-16 clause names ("A drive '
      + 'that finds such an op absent from every `undoneOps` member and finds its value still reading has '
      + 'found the amended `M-5` SATISFIED") — read ' + JSON.stringify(opId));
  }
  assert.equal(closed.rollback[0].answer, 'ok',
    'and the FIRST call this window issued RETURNED — its own `answer` is THE LITERAL `\'ok\'`');
  assert.equal(closed.rollback[0].failed, false,
    'so its own `failed` flag is `false`, and a call that THREW would be distinguishable from it');
  assert.deepEqual(closed.rollback[0].undoneOps, [opIds[2]],
    'and it reports EXACTLY its own op reversed — the amended scope reaching no entry older than the op '
    + `it was called over (\`write-and-read.md §6.4\` item 1's \`M-5\` (a) (ii)) — read `
    + JSON.stringify(closed.rollback[0].undoneOps));
  assert.equal(new Set(performed).size, performed.length,
    'no `opId` of the composition is called twice');
});

test('ck_states_a_first_evaluation_failure_leaves_the_checkpoint_null', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore();
  const address = [tag('ro3')];
  register(store, address, 'x', passAtRegistration(() => ({ message: 'x fails on the first evaluation of the first op' })));
  const commitRecord = commit(store, address, 'mem', 1);
  capture(() => runAttempt(store, commitRecord));
  const closed = report(store, commitRecord.attempt);
  // ⟶ DATA CHECK, `composition-and-states.md §2.6` item 5 (a) read with `parameter-semantics.md §2.17`:
  // the composition's reach is EXACTLY `AttemptRecord.ops`, so a one-op attempt owes ONE call, and that
  // call's own six-member `RollbackStep` IS the property. The `checkpoint` assertion below already read the
  // step's data; what the count did not pin is that the step is the step FOR THIS OP — so the data
  // check names its `opId` against the op the attempt created, its `failed` member, and the all-or-nothing
  // report `undoneOps` carries, and the count is kept as the reach's own arithmetic beneath them.
  assert.equal(closed.rollback.length, 1, 'one call over the one op');
  assertRollbackStep(closed.rollback[0], 'the one step over the attempt\'s own op');
  assert.equal(closed.rollback[0].opId, closed.ops[0].opId,
    'AND THE STEP IS THE STEP FOR THAT OP: its `opId` is the attempt\'s own first write\'s op, by '
    + 'identity — the reach `§2.6` item 5 (a) fixes is `AttemptRecord.ops` and no other set');
  assert.equal(closed.rollback[0].failed, false,
    'and the call SUCCEEDED — a first-evaluation failure meets no floor (`§2.6` item 5 (b)\u2019s '
    + 'condition is not reachable here), so the step\'s `failed` member is `false`');
  assert.deepEqual(closed.rollback[0].undoneOps, [closed.ops[0].opId],
    'and the store\'s own report names the one op the call undid — the data the count stood in for');
  assert.equal(closed.rollback[0].checkpoint, null,
    'no op of this attempt left a state at which every registered pair passed, so the boundary is null');
});

test('ck_states_an_attempt_that_passes_leaves_a_rollback_of_length_zero', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('ro4')];
  register(store, address, 'x', () => true);
  const report = runAttempt(store, commit(store, address, 'mem', 1));
  assert.equal(report.outcome, 'passed', 'the attempt resolved');
  assert.deepEqual(report.rollback, [], 'K-5 returns [] where nothing was rolled back');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §4  THE COMMIT REGISTRY — WHAT A CLOSED ATTEMPT LEAVES STANDING
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_states_a_successful_rollback_clears_the_registry_and_a_later_commit_is_free', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('reg1')];
  register(store, address, 'x', passAtRegistration(() => ({ message: 'x fails' })));
  const first = capture(() => runAttempt(store, commit(store, address, 'mem', 1)));
  assert.equal(first.threw, true, 'the attempt fails');
  const again = capture(() => commit(store, address, 'mem', 2));
  assert.equal(again.threw, false,
    'a successful rollback removes the attempt\'s own commit-registry entry, so a fresh K-2 is free');
});

/**
 * RE-DERIVED AT THE RED-SET RE-DERIVATION PASS, READING `composition-and-states.md §2.6` ITEMS 2 AND
 * 5 (a) AT THEIR BYTES — **AND RE-DERIVED AGAIN 2026-10-16 (`role_test_writer`) FOR THE TEMPORAL STOP,
 * BECAUSE THE WINDOW THE LAST PASS CHOSE NO LONGER REACHES THE ARM IT PINS.**
 *
 * THE OLD DRIVE'S FAULT, AND WHY IT COULD NOT PASS: it made the pair's REPAIR BODY `throw`. §2.6 item
 * 5 (a) fixes `failed` as THAT CALL'S OWN ANSWER — "a `RollbackStep` for every call … the call's own
 * answer, never the attempt's" — and a SYNCHRONOUS THROW out of the per-op call is not an answer the
 * step can carry: no step is minted, no `failed: true` is recorded, and the attempt's own entry is
 * REMOVED, exactly as the drive measured ("`false !== true`" at that assertion, and the second `K-2`
 * returning instead of refusing). The cell's subject — "the per-op call left the attempt's own
 * registry entry standing" — is reachable ONLY through the arm that DOES carry a failed answer.
 *
 * **⟶ AND THE 2026-10-16 PASS ITSELF LEFT A WINDOW THAT THE AMENDED SCOPE REMOVED, NAMED HERE SO IT IS
 * NOT MISTAKEN FOR A REGRESSION: that pass drove a SMALL JOURNAL WITH SEEDED WRITES (`journalLength: 2`,
 * six writes) so the attempt's own op fell out of the retained window. Under `M-5` (a) (ii) the seeded
 * entries are ALL OLDER than the attempt's own op and are therefore OUT OF SCOPE, so the compacted base
 * is never examined by `M-6` and the call RETURNS — measured: `failed: false`, `undoneOps: ["op-7"]`,
 * `restoredTo: {present: true, value: "seed-5"}`. The arm is not gone; the window that reached it is.**
 * (`write-and-read.md §6.4` item 1's `M-5` amendment (a) (ii); item 2's dated neighbour: "an entry OLDER
 * than the named op that carries `compacted: true` IS IN NO ROLLBACK OVER THAT OP AND CANNOT FAIL ONE".)
 *
 * WHAT THIS CELL NOW DRIVES, AND WHY THIS WINDOW IS THE ONE THE CLAUSES NAME: a two-op failing attempt
 * at ONE address whose FIRST performed call reverses the newer op — marking it `compacted` (`M-9`'s
 * residue) — and whose SECOND call is over a still-owed op that is TEMPORALLY AT OR BEFORE that residue.
 * The second call's candidate set therefore DOES contain a compacted entry, `M-6` fails it all-or-nothing,
 * and the step carries the store's own code in `answer` with `failed: true` and `undoneOps: []`. **This is
 * the state `composition-and-states.md §2.6` item 5 (b) declares and item 5 (a)'s dated clause of
 * 2026-10-16 names — "a still-owed op that an earlier call's `undoneOps` member does NOT report was NOT
 * undone by that call AND GETS ITS OWN CALL" — read with the two floors' declared order.** `terminal`
 * sees a failed step, and the attempt's own commit-registry entry STANDS for the reading `§2.6` item 8
 * keeps.
 *
 * THE CLOSURE OF THE FAILURE SET DOES NOT TURN A LATER CALLER INTO A REFUSAL, AND THE CELL NO LONGER
 * SAYS IT DOES (`P-NEG-5` at that pass): what stands at that address is THE RETAINED CLOSED RECORD —
 * `K-4` answers its final log and `K-5` its report (`contract.md §5.2`'s retain row) — and a FRESH `K-2`
 * RETURNS ITS OWN RECORD rather than answering `KC-7`, whose own row is the RE-ENTRANT site (`§2.4` item
 * 5 (iii); `fail-surface.md §2`'s `KC-7` row).
 */
test('ck_states_a_throwing_per_op_call_leaves_the_attempt_s_own_registry_entry_standing', async () => {
  const { register, commit, runAttempt, log, report } = await kernel();
  // ── THE WINDOW, RE-DERIVED 2026-10-16: TWO OPS AT ONE ADDRESS, the second call's candidate set holding
  // the FIRST call's own compacted residue. `x` PASSES on the committed value and is VIOLATED by the value
  // `y`'s repair lands; `y` carries the repair; the re-run violates `x` while `x` is IN `ran` and NOT in
  // `appliedRepairs`. Item 2's list is `[op-2 (y's repair), op-1 (the commit)]`: the FIRST call reverses
  // `op-2` and marks it compacted (`M-9`), and the SECOND call — over `op-1`, which the first call's
  // `undoneOps` does NOT report because `op-1.seq < op-2.seq` — meets that residue and FAILS.
  const store = makeStore({ journalLength: 64 });
  const address = [tag('reg2')];
  register(store, address, 'x', passAtRegistration((ctx) => (ctx.value === 'repaired'
    ? { message: 'x is violated by the value the repair landed' }
    : true)));
  register(store, address, 'y', passAtRegistration((ctx) => (ctx.value === 'committed'
    ? {
      repair: (rctx) => ({
        ok: true,
        message: 'y was repaired by the op this repair landed',
        // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6).
        op: store.write(address, 'mem', 'repaired', rctx).op,
      }),
      message: 'y is violated by the committed value',
    }
    : true)));
  const commitRecord = commit(store, address, 'mem', 'committed');
  const r = capture(() => runAttempt(store, commitRecord));
  assert.equal(r.threw, true, 'the attempt fails and its refusal carries its own log');
  const closed = report(store, commitRecord.attempt);
  assertAttemptReport(closed, 'the closed attempt of the failed rollback');
  assert.ok(closed.rollback.length >= 2,
    'THE COMPOSITION MADE TWO CALLS — the second is the one whose candidate set holds the residue the '
    + `first left — read ${closed.rollback.length}: `
    + `${JSON.stringify(closed.rollback.map((s) => [s.opId, s.failed, s.answer]))}; \`§2.6\` item 5 (a)'s `
    + 'dated clause of 2026-10-16: "a still-owed op that an earlier call\'s `undoneOps` member does NOT '
    + 'report was NOT undone by that call AND GETS ITS OWN CALL"');
  const failedSteps = closed.rollback.filter((s) => s.failed === true);
  assert.equal(failedSteps.length, 1,
    '§2.6 item 5 (a): `failed` is THAT CALL\'S OWN ANSWER, and this call\'s answer is `true` — the '
    + 'reversal could not be performed because its temporally bounded candidate set holds a compacted '
    + `entry (\`M-6\`) — read ${failedSteps.length} over `
    + JSON.stringify(closed.rollback.map((s) => [s.opId, s.failed, s.answer])));
  assert.equal(failedSteps[0].answer, 'RollbackCompacted',
    'and the step\'s `answer` carries the STORE\'S OWN code, never a kernel token (`§2.6` item 3) — read '
    + JSON.stringify(failedSteps[0].answer));
  assert.deepEqual(failedSteps[0].undoneOps, [],
    'AND THE FLOOR IS ALL-OR-NOTHING AND NEVER PARTIAL: the failing call undid NOTHING (`M-6`) — read '
    + JSON.stringify(failedSteps[0].undoneOps));
  assert.equal(failedSteps[0].checkpoint, null,
    'and the step carries the arm\'s own checkpoint, `null` where no landing left a valid state');
  const held = capture(() => commit(store, address, 'mem', 2));
  assert.equal(held.threw, false,
    'A STANDING REMAINDER IS NOT A REFUSAL: WHATEVER A FAILED CALL LEFT BEHIND, A FRESH `K-2` AT THAT '
    + 'ADDRESS RETURNS ITS OWN `CommitRecord` — it mints NO `KC-7` (`contract.md §5.2`\'s retain row: '
    + '`K-4` answers the closed attempt\'s final log and `K-5` its report, and the closed record is '
    + 'RETAINED; `fail-surface.md §2`\'s `KC-7` row is the RE-ENTRANT site, not a later caller\'s); '
    + `read ${JSON.stringify(held.threw)}`);
  assert.equal(typeof log(store, commitRecord.attempt).length, 'number',
    'the closed attempt\'s record is still reachable — RETENTION is what the address keeps, not a lock');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5  `KC-7` AT ITS `K-3`, `K-4` AND `K-5` SITES — THE RE-ENTRANT AND THE OPEN-ATTEMPT READERS
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_states_a_reentrant_run_attempt_and_a_reentrant_commit_are_KC7_and_change_nothing', async () => {
  const { register, commit, runAttempt, log } = await kernel();
  const store = makeStore();
  const address = [tag('re4')];
  const observed = {};
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THE REGISTRATION RUNS THIS BODY ONCE, AND AT THAT INSTANT
  // `attempt` IS `null` (`kernel-surface.md §2.3` item 1's registration clause (4)) — so the re-entrancy this
  // cell drives (`KC-7` at the attempt's own LIVE address) belongs to the LANDING's invocation alone. The
  // shield answers the registration `true` and hands every landing context to this body unchanged; the cell's
  // subject — that a re-entrant `commit`/`runAttempt` is `KC-7` and changes nothing — is unmoved.
  register(store, address, 'x', passAtRegistration((ctx) => {
    let record = null;
    try { record = commit(store, address, 'mem', 'second'); } catch (e) { observed.commit = e; }
    try { runAttempt(store, record ?? { attempt: ctx.attempt, op: ctx.op, triggered: [], pending: [] }); }
    catch (e) { observed.runAttempt = e; }
    observed.openLogLength = log(store, ctx.attempt).length;
    return true;
  }));
  const commitRecord = commit(store, address, 'mem', 1);
  const report = runAttempt(store, commitRecord);
  assert.equal(observed.commit.status, 'KC-7', 'a commit at the attempt\'s own live address is KC-7');
  assert.equal(observed.runAttempt.status, 'KC-7', 'and a re-entrant runAttempt is refused by the SAME member');
  assert.equal(report.outcome, 'passed', 'neither refusal changed the attempt\'s own course');
  assert.deepEqual(checkIds(report.log), ['x'], 'no second attempt ran and no extra entry was appended');
  assert.equal(observed.openLogLength, 1,
    'K-4 over an OPEN attempt answers the record\'s own log — reachable, per §2.1 item 4');
});

test('ck_states_K5_over_an_attempt_that_is_still_open_is_KC7', async () => {
  const { register, commit, runAttempt, report, log } = await kernel();
  const store = makeStore();
  const address = [tag('re5')];
  const observed = {};
  register(store, address, 'x', (ctx) => {
    try { report(store, ctx.attempt); } catch (e) { observed.open = e; }
    try { log(store, ctx.attempt); observed.openLog = true; } catch (e) { observed.openLog = e; }
    return true;
  });
  const commitRecord = commit(store, address, 'mem', 1);
  const done = runAttempt(store, commitRecord);
  assert.equal(observed.open.status, 'KC-7',
    'K-5 over an attempt that is still open is KC-7 — which is how a drive reads that the attempt IS live');
  assert.equal(observed.openLog, true, 'while K-4 reaches the open record\'s log');
  assertKernelForm(observed.open, 'KC-7 at K-5');
  // THE CLOSED ATTEMPT'S K-5 RETURNS A REPORT WHOSE MEMBERS EQUAL K-3's RETURN, MEMBER FOR MEMBER
  const after = report(store, done.attempt);
  assert.deepEqual(after, done, 'the closed attempt\'s report equals the K-3 return');
});

test('ck_states_K3_and_K5_refusals_carry_no_store_member', async () => {
  const { runAttempt, report } = await kernel();
  const store = makeStore();
  const stale = capture(() => runAttempt(store, { attempt: { id: tag('gone') }, op: { opId: 'op-none' }, triggered: [], pending: [] }));
  assert.equal(stale.threw, true, 'a stale reference is refused');
  assertKernelForm(stale.thrown, 'stale K-3 refusal');
  assert.equal(stale.thrown.status, 'KC-2', 'KC-2 at K-3 — the member the census counts on four sites');
  const unknown = capture(() => report(store, { id: tag('gone-too') }));
  assert.equal(unknown.thrown.status, 'KC-2', 'KC-2 at K-5 — the refusal that is NOT KC-7');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §6  THE `KC-8` FLOOR — THE TWO CLAUSES THE CONTRACT PINS WITHOUT THE STORE'S OWN COMPRESSION
// ═══════════════════════════════════════════════════════════════════════════════════════════════
//
// FINDING, CORRECTED AT THE RED-SET RE-DERIVATION PASS, AND THE DRIVE IT NOW CARRIES: the earlier
// note here claimed that "NO clause of `docs/specs/storeroom-constraints/` names an OPERABLE
// caller-side observable that forces the store's own compression". THAT IS DISPROVED, and the proof is
// a member of the store's own construction surface: `makeStore({ journalLength: n })` with a SMALL `n`
// and a register the drive has already written through, so that by the time the composition runs, the
// attempt's OWN op has fallen out of the retained window — and the per-op call then meets the store's
// own floor code. `ck_states_a_throwing_per_op_call_leaves_the_attempt_s_own_registry_entry_standing`
// above DRIVES exactly that window and reads the resulting `failed: true` step; the closure therefore
// has a reachable `KC-8`, and this section's two cells below read the floor from THAT side.
//
// A drive that turns the floor into `KC-8` itself needs the per-op call to be refused while a
// LATER-created still-owed op remains, which the same small-journal construction reaches; those cells
// read the two clauses the contract pins WITHOUT the store's own compression, so they are kept as
// written here and the compression-driven window is exercised in the cell above.

test('ck_states_a_per_op_call_over_an_op_the_composition_does_not_owe_is_never_KC8', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('floor1')];
  register(store, address, 'x', passAtRegistration(() => ({ message: 'x fails without a repair' })));
  const r = capture(() => runAttempt(store, commit(store, address, 'mem', 1)));
  assert.equal(r.threw, true, 'the attempt fails');
  assert.equal(r.thrown.status, 'KC-3', 'an ordinary per-op call is not turned into KC-8');
  assert.equal(r.thrown.status === 'KC-8', false,
    'the guard turns into KC-8 ONLY a still-owed op whose call meets a floor code');
  assert.equal(r.thrown.message.includes('RollbackCompacted'), false,
    'and the message names no floor code where no floor was met');
});

test('ck_states_every_step_reports_a_boolean_failed_member_and_a_carried_answer', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore();
  const address = [tag('floor2')];
  register(store, address, 'x', passAtRegistration(() => ({ message: 'x fails' })));
  const commitRecord = commit(store, address, 'mem', 1);
  capture(() => runAttempt(store, commitRecord));
  const closed = report(store, commitRecord.attempt);
  assert.equal(closed.rollback.length, 1, 'one step for the one op the attempt created');
  const step = closed.rollback[0];
  assertRollbackStep(step, 'the step of a call that returned');
  assert.equal(step.failed, false, 'the call returned, so the floor was not met and failed is false');
  assert.ok('answer' in step, 'answer carries what the per-op call returned');
  assert.ok(Array.isArray(step.undoneOps),
    'undoneOps is the store\'s own report of the reversals it performed, read as-is');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §7  THE NEGATIVE GENERATORS — ONE PER CLAUSE, EACH ONE ABLE TO FAIL ON ITS OWN SUBJECT
// ═══════════════════════════════════════════════════════════════════════════════════════════════
//
// A CELL THAT PASSES WITHOUT PINNING ITS SUBJECT IS NOT EVIDENCE (`DQ-14`). Each cell below names the
// clause at its section and item, drives the ONE arm that clause fixes, and reads the clause's own
// observable — an arm, a count, a member — so that a source that takes a different transition, or
// answers a different token, fails HERE. THE ROWS THEY CITE: `S-FIRST-REPEAT` (`P-NEG-1`),
// `S-ROLLBACK-TARGET` (`P-NEG-2`), `S-ROLLBACK-FLOOR` (`P-NEG-3`), the composition's three answer
// members (`P-NEG-4`), `S-REC-RETAIN` (`P-NEG-5`), `attempt-lifecycle.md §2.4` item 1 (`P-NEG-6`) and
// `fail-surface.md §1.1` items 1 (b)/(d) and 5 (`P-NEG-10`).

/**
 * `P-NEG-1` · `S-FIRST-REPEAT` · `kernel-surface.md §2.5` item 3's own limb clause, at its bytes: "AND
 * THE PAIR'S FIRST EVALUATION IN SUCH A WINDOW PASSES — A FIRST VIOLATION WITH NO REPAIR REGISTERED
 * FAILS THE ATTEMPT AT `(c)` — so limb (ii)'s state is REACHABLE and not vacuous"; with
 * `attempt-lifecycle.md §2.4` item 4's arm `(c)` — "composes the per-op rollback; removes the registry
 * entry; THROWS with the log | `FAILING` → `CLOSED`" — and `contract.md §5.6`'s failure list: "a first
 * violation answered by either limb instead of by `(b)`/`(c)`". THE TRANSITION IS TAKEN AT THE FIRST
 * VIOLATING PAIR, SO NO FURTHER PAIR IS EVALUATED: no arm of the closed table returns from `CLOSED` to
 * `EVALUATING`.
 *
 * STATES ENUMERATED FIRST: (1) TWO pairs, `x` and `y`, standing at one address; (2) `x`'s FIRST
 * evaluation violates with NO repair registered → the transition is taken THERE (`KC-3`); (3) `y`'s
 * function — which WOULD violate and DOES register a landing repair — is therefore NEVER INVOKED, and
 * its `constraint-check` entry never stands. FAIL STATES: a pass that carries the first violation as a
 * candidate and keeps evaluating (the second pair runs, and its repair lands, so the attempt closes on
 * `(f)`/`KC-6` instead); a drive whose second pair's function runs but whose entry is withdrawn.
 */
test('ck_neg_1_the_first_violating_pair_decides_and_the_second_pair_is_never_evaluated', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('neg1')];
  const ran = [];
  let yRan = 0;
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: BOTH PAIRS ARE REGISTERED AGAINST A STATE THEY ACCEPT, and
  // the violating values are written AFTERWARDS. This cell's subject — which pair runs at the FIRST violating
  // evaluation — is unmoved, and `ran` still records LANDING evaluations only (the registration's own
  // invocation is answered by the shield and reaches neither body).
  register(store, address, 'x', passAtRegistration(() => {
    ran.push('x');
    return { message: 'x violates at its first evaluation and registers no repair' };
  }));
  register(store, address, 'y', passAtRegistration(() => {
    yRan += 1;
    ran.push('y');
    return { repair: () => { const landed = store.write(address, 'mem', 'y-fixed').op; return { ok: true, message: 'y was repaired at the same address', op: landed }; }, message: 'y violates too' };
  }));
  const r = capture(() => runAttempt(store, commit(store, address, 'mem', 'v')));
  assert.equal(r.threw, true, 'the attempt fails');
  assert.equal(r.thrown.status, 'KC-3',
    'the FIRST violating pair\'s own arm: no repair was registered for it (`§2.4` item 4 (c)) — an '
    + 'answer of `KC-5`/`KC-6` here is a FIRST VIOLATION ANSWERED BY A REPEAT LIMB, which `contract.md '
    + '§5.6`\'s failure list names at its own bytes');
  assert.deepEqual(ran, ['x'],
    'AND THE SECOND PAIR\'S FUNCTION WAS NEVER RUN: the first violation with no repair fails the '
    + 'attempt AT `(c)` and the pass ends there (`kernel-surface.md §2.5` item 3; `§2.4` item 4 (c) '
    + 'THROWS → `CLOSED`). Every name the drive read is ' + JSON.stringify(ran));
  assert.equal(yRan, 0, 'y was invoked ZERO times');
  assert.deepEqual(checkIds(r.thrown.log), ['x'],
    'and the log carries ONE `constraint-check` entry, under x\'s own key, and none for y');
  assert.equal(entries(r.thrown.log, 'repair-run').length, 0,
    'no repair ran anywhere in this attempt, though y stood ready with one');
  assert.equal(outcomeEntry(r.thrown.log).state, 'KC-3', 'the outcome entry carries the same token');
});

/**
 * `P-NEG-2` · `S-ROLLBACK-TARGET` · `contract.md §5.7`'s own row for this id, at its bytes: "the walk
 * STOPS at the checkpoint OP — … the steps' own `checkpoint` member carries that op's `opId` and is
 * `null` where the attempt left none, the checkpoint op and every op before it are not undone whether
 * or not the attempt created them, an op after it is undone whether or not the attempt created it, the
 * walk never observes store state, and WHERE NO CHECKPOINT STANDS THE TARGET IS THE STATE BEFORE THE
 * ATTEMPT'S OWN WRITE"; with `composition-and-states.md §2.6` item 8 (iii) — the member's ONE HOME —
 * "`null` WHERE NO SUCH LANDING EXISTS FOR THAT ADDRESS — ADDRESS-WIDE" and "where a repair's op landed
 * at an address BESIDE the attempt's own the call list still fixes WHICH OPS ARE CALLED, in creation
 * order, so NOTHING IS UNDONE MERELY BECAUSE IT LIES OUTSIDE THE ATTEMPT'S `address`".
 *
 * STATES ENUMERATED FIRST: (1) `x` at the attempt's address violates at the pass over the attempt's OWN
 * address and registers a repair; (2) that repair LANDS its op BESIDE the attempt's address — a
 * DESCENDANT of it — which the attempt's own evaluated set does not reach (`§2.4` item 5 (iv): "the
 * pairs standing at the attempt's OWN `address`"), so the attempt's next run reads the descendant's op
 * and `x` violates again with no repair — the pair is IN `ran` AND IN `appliedRepairs` → arm `(e)`,
 * `KC-5`; (3) NO landing at the attempt's own address ever left every registered pair there passing, so
 * the attempt's `checkpoint` is `null` — ADDRESS-WIDE — and the composition runs over the WHOLE call
 * list, the target being the state before the attempt's own write; (4) the list holds two ops at two
 * addresses, the repaired op FIRST and the attempt's own first write LAST, and EVERY member is called,
 * the last one included.
 *
 * ═══ RE-DERIVED AT THE CONTRADICTION-REPAIR PASS. THE OLD CELL'S FAULT: it asserted `KC-5` AND read
 * every step's `restoredTo.present` as `false`, while its own declared order (`§2.6` item 2) makes the
 * LAST call the attempt's first write, whose op the FIRST call's SUBTREE-WIDE reach (`§2.6` item 4;
 * `write-and-read.md §6.4` items 1/3/6) has already reversed — so that last call meets the store's own
 * `RollbackCompacted`, and `§2.6` item 5 (b) + item 6 (a) then make the arm `KC-8` WHATEVER the pass's own
 * arm was, "and NO SECOND ENTRY IS APPENDED". AND `M-7` (ii) fixes the throwing step's `restoredTo` as
 * THE STATE THE NAMED OP'S OWN SUBTREE STOOD AT, read through the store's own `read` — which is the
 * ADDRESS'S ACTUAL post-failure state and not an absence.
 *
 * WHAT THIS CELL NOW ASSERTS, EACH TERM OFF A CLAUSE:
 *   (i)   `closed.ops.length === 2` and the second op's address is the DESCENDANT — `§2.6` item 1
 *         ("the composition's candidate set is therefore exactly `AttemptRecord.ops`") and item 8 (iii)
 *         ("nothing is undone merely because it lies outside the attempt's `address`");
 *   (ii)  `closed.rollback.length === 2`, the repaired op first and the first write last, the first call
 *         RETURNED (`failed: false`) and the last call THREW (`failed: true`) — `§2.6` item 2's order and
 *         item 5 (a) (i): "the list's size IS the number of steps, and every member of the list gets its
 *         own call and its own `RollbackStep`, including the LAST one";
 *   (iii) every step's `checkpoint` is `null` — item 8 (iii)'s ADDRESS-WIDE rule, no step reading a
 *         landing at a BESIDE address;
 *   (iv)  every step's `restoredTo` is the store's own TWO-member `BaseState` (`store-model.md §6.2`),
 *         and the THROWING step's arm is read against the store's own `read` OF THE ATTEMPT'S ADDRESS
 *         (`§2.6` item 3; `F-5`-style floor arms carry no returned `RollbackResult`).
 *
 * FAIL STATES: a `checkpoint` READ OFF A CALL'S OWN LANDING rather than off the attempt's own address
 * (a non-`null` member here, where no landing at that address left it valid); a call list that omits an
 * op because it lies OUTSIDE the attempt's `address`; a composition that stops before its LAST call, so
 * the attempt's own first write is never called; a `KC-5`/`KC-3` arm where the last call met the store's
 * own floor code; a `restoredTo` that is `null`, that is not a two-member `BaseState`, or whose `present`
 * arm is asserted rather than read through the store's own `read`.
 */
test('ck_neg_2_the_call_list_reaches_beside_addresses_and_the_walk_runs_to_its_last_member', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const root = tag('neg2'); // ONE tag, read once: `tag()` mints a fresh label on every call
  const address = [root, 'a'];
  const beside = [root, 'a', 'child'];
  let nx = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` makes the shield mandatory here: unshielded, the
  // registration ATTEMPTS this repair and spends `nx === 1` there, so the call list this cell walks is never
  // built by the attempt the cell drives.
  register(store, address, 'x', passAtRegistration(() => {
    nx += 1;
    if (nx === 1) {
      return { repair: () => { const landed = store.write(beside, 'mem', 'child-fixed').op; return { ok: true, message: 'x was repaired at the address beside the attempt\'s own', op: landed }; }, message: 'x is invalid at the attempt\'s own address' };
    }
    return { message: 'x is broken again at the op its own repair landed beside it' };
  }));
  // THE STORE'S OWN TREE NEEDS ITS PARENT LINK BEFORE A DESCENDANT CAN BE WRITTEN AT ALL ("`root` does
  // not exist in `''`, it holds no keys"), so the caller makes ONE write above the attempt's address —
  // an ordinary caller-made write, taking its own processing and its own registry entry.
  store.write([root], 'mem', {});
  const commitRecord = commit(store, address, 'mem', {});
  const r = capture(() => runAttempt(store, commitRecord));
  assert.equal(r.threw, true, 'the attempt fails');
  assert.equal(r.thrown.status, 'KC-8',
    'x is IN `ran` AND IN `appliedRepairs` at its second evaluation — arm `(e)`\'s own answer — BUT the '
    + 'walk\'s LAST call is the attempt\'s own first write, whose op the FIRST call\'s subtree-wide reach '
    + 'already reversed, so that call meets the store\'s own `RollbackCompacted` and `§2.6` item 5 (b) '
    + 'makes the arm `KC-8` WHATEVER the pass\'s own arm was (read ' + JSON.stringify(r.thrown.status) + ')');
  const closed = report(store, commitRecord.attempt);
  assert.equal(closed.ops.length, 2,
    'the attempt owes the first write at its own address AND the op the repair landed BESIDE it '
    + '(`§2.6` item 3: reach is exactly `AttemptRecord.ops`, and the ops the repairs landed are in it)');
  assert.equal(closed.ops[1].address.join('/'), beside.join('/'),
    'read the second op\'s own address off the record: it is the descendant, BESIDE the attempt\'s own');
  assert.equal(closed.rollback.length, 2,
    'AND BOTH ARE CALLED, the LAST one included: "nothing is undone merely because it lies outside the '
    + 'attempt\'s `address`", and "the list\'s size IS the number of steps" (`§2.6` item 5 (a) (i), item '
    + '8 (iii)) — a walk that stopped at the call that RETURNED would leave the attempt\'s own first '
    + 'write never called, and that is this cell\'s subject');
  assert.equal(closed.rollback[0].opId, closed.ops[1].opId,
    'the repaired op is called FIRST and the attempt\'s own first write LAST (`§2.6` item 2)');
  assert.equal(closed.rollback[1].opId, closed.ops[0].opId, 'and the first write is that last call');
  assert.equal(closed.rollback[0].failed, false, 'the beside-address call RETURNED');
  assert.equal(closed.rollback[1].failed, true,
    'and the LAST call THREW — `RollbackStep.failed` "is `true` iff THAT CALL THREW and `false` iff that '
    + 'call returned", so this is a floor arm reached at the walk\'s last member and not at a member that '
    + 'returned (`§2.6` item 5 (a) (i) and (b))');
  assert.equal(closed.rollback[1].answer, 'RollbackCompacted',
    'the store\'s own code, read off the step\'s `answer` (`§2.6` item 3: `answer` is "the store\'s own '
    + 'code where it threw") — the floor `§2.6` item 5 (b) names');
  for (const step of closed.rollback) {
    assert.equal(step.checkpoint, null,
      'THE NO-CHECKPOINT ARM, READ ADDRESS-WIDE: no landing at the ATTEMPT\'S OWN ADDRESS ever left '
      + 'every registered pair there passing, so the member is `null` ON EVERY STEP — whatever a landing '
      + 'at a BESIDE address did (`§2.6` item 8 (iii); `S-ROLLBACK-TARGET`: "`null` where the attempt '
      + `left none"). read ${JSON.stringify(step.checkpoint)}`);
  }
  for (const [step, which] of [[closed.rollback[0], 'the beside-address'], [closed.rollback[1], 'the attempt\'s own address\'s']]) {
    const restored = step.restoredTo;
    assert.equal(restored !== null && typeof restored === 'object', true,
      `${which} step carries the state its op's own subtree stood at, read at the store's own verb`);
    assert.deepEqual(Object.keys(restored).sort(), ['present', 'value'],
      'which is a TWO-member `BaseState` (`store-model.md §6.2`; `write-and-read.md §6.2`)');
  }
  // THE THROWING STEP'S `restoredTo` IS THE STATE THE NAMED OP'S OWN SUBTREE STOOD AT ONCE THE CALL
  // FAILED — `M-7` (ii); `write-and-read.md §6.4` item 3 (i) — WHICH IS READ THROUGH THE STORE'S OWN
  // `read` AND NOT THROUGH A MEMBER INVENTED HERE. THE STORE'S LIVE STATE IS READ FIRST, BEFORE ANY
  // ASSERTION: the composition's own calls have already reversed the attempt's ops, so a `read` taken
  // AFTER the terminal act is the state the composition LEFT and not the state the failed call met.
  let beforeTerminal;
  try {
    beforeTerminal = { present: true, value: store.read(address) };
  } catch (refused) {
    beforeTerminal = { present: false, value: undefined };
  }
  assert.deepEqual(closed.rollback[1].restoredTo, { present: true, value: {} },
    'THE THROWING STEP\'S `restoredTo` IS THE ATTEMPT\'S ADDRESS AS IT STOOD WHEN ITS CALL FAILED — '
    + 'the value the attempt\'s own `K-2` left at that leaf — read ' + JSON.stringify(closed.rollback[1].restoredTo)
    + `; a leaf still standing is PRESENT, and \`present: false\` here would place the state away from `
    + 'the store\'s own answer');
  assert.equal(closed.rollback[1].restoredTo.present, true,
    'and the arm is `true`: `M-7` (ii) reads THE STATE THE NAMED OP\'S OWN SUBTREE STOOD AT, which the '
    + 'first call\'s reach cannot make absent — its reach is over OPS, and the address\'s own leaf was '
    + 'left standing by the attempt\'s write');
  assert.deepEqual(closed.rollback[0].restoredTo, { present: false, value: undefined },
    'while the FIRST call\'s own subtree stood nowhere before that call, so that step reads absent — the '
    + 'two arms of the same member, each read off the address its own op created');
  assert.equal(beforeTerminal.present, true,
    'AND THE STORE\'S OWN LIVE STATE READ AFTER THE TERMINAL ACT CONFIRMS THE ARM: the addressing leaf '
    + 'still stands at the value the attempt\'s own `K-2` left, so the throwing step\'s `restoredTo` is '
    + `that same present state and not a state this cell invented — read ${JSON.stringify(beforeTerminal)}`);

  assert.equal(entries(r.thrown.log, 'outcome').length, 1,
    'and the floor is answered IN THE FAILURE\'S OWN ONE `outcome` entry — "NO SECOND ENTRY IS APPENDED" '
    + '(`§2.6` item 6 (a))');
  assert.equal(entries(r.thrown.log, 'outcome')[0].state, 'KC-8',
    'carrying the same token the thrown form\'s `status` does (`fail-surface.md §1.1` item 1 (c))');
});

/**
 * `P-NEG-3` · `S-ROLLBACK-FLOOR` · `composition-and-states.md §2.6` item 5 (b) and item 6 (a): "a still
 * owed op whose call meets either floor code is `KC-8`", and the attempt closes with ONE outcome entry
 * carrying that token.
 *
 * **⟶ RE-DERIVED 2026-10-16 (`role_test_writer`) FOR THE TEMPORAL STOP: THE FILED WINDOW NO LONGER REACHES
 * THE FLOOR, AND THE WINDOW THAT DOES IS THE TWO-OP ONE.** The filed drive was *"the attempt's own address
 * is a COMPACTED BASE with a LATER still-owed op standing on it"* (`journalLength: 2`, six seeded writes).
 * Under `M-5` (a) (ii) every seeded entry is OLDER than the attempt's own op and is therefore OUT OF
 * SCOPE, so `M-6` never examines it and the call RETURNS — measured on this checkout: status `KC-3`,
 * `failed` steps `0`, the single step `{opId: op-7, answer: "ok", undoneOps: ["op-7"]}`. **The clause that
 * closes the filed window is the spec's own, verbatim: *"an entry OLDER than the named op that carries
 * `compacted: true` IS IN NO ROLLBACK OVER THAT OP AND CANNOT FAIL ONE"*** (`write-and-read.md §6.4` item
 * 2's dated neighbour of 2026-10-16).
 *
 * THE WINDOW THIS CELL NOW DRIVES, AND WHY IT IS THE ONE THE CLAUSES NAME: the compacted entry must be
 * **TEMPORALLY IN SCOPE for the call that meets it** — that is, its `seq` must be ≥ that call's named op's
 * `seq`. A two-op failing attempt at ONE address produces exactly that: item 2's list is
 * `[op-2 (the repair's op), op-1 (the commit)]`, the FIRST call reverses `op-2` and marks it compacted
 * (`M-9`'s residue), and the SECOND call — over `op-1`, which that call's `undoneOps` member does NOT
 * report because `op-1.seq < op-2.seq` — has `op-2` in its bounded candidate set and fails `M-6`
 * all-or-nothing. **This is the floor's genuine, in-scope arm, and it is the state the spec names:
 * "a candidate set that is TEMPORALLY IN SCOPE and contains a compacted entry STILL FAILS
 * `RollbackCompacted` AND UNDOES NOTHING".**
 *
 * STATES ENUMERATED FIRST: (1) a two-op failing attempt at ONE address, every step's `checkpoint` `null`;
 * (2) the first call, which RETURNS and reverses its own op, leaving it compacted; (3) the second call,
 * over a still-owed op whose temporally bounded candidate set INCLUDES that compacted entry; (4) the ONE
 * `outcome` entry the closure writes. FAIL STATES: a floor answered with the violation arm's own `KC-3`
 * (the arm this cell exists to separate from the floor's); a second outcome entry appended for the floor;
 * a call issued over an op an earlier call already reported undone; a floor arm that reports a rollback it
 * did not perform (`M-6`, all-or-nothing, never partial).
 */
test('ck_neg_3_a_still_owed_call_meeting_a_compacted_base_is_KC8_with_one_outcome_entry', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 64 });
  const address = [tag('neg3')];
  // `x` PASSES on the committed value and is VIOLATED by the value `y`'s repair lands; `y` carries the
  // repair; the re-run violates `x` with no repair registered. TWO ops, at ONE address.
  register(store, address, 'x', passAtRegistration((ctx) => (ctx.value === 'repaired'
    ? { message: 'x is violated by the value the repair landed' }
    : true)));
  register(store, address, 'y', passAtRegistration((ctx) => (ctx.value === 'committed'
    ? {
      repair: (rctx) => ({
        ok: true,
        message: 'y was repaired by the op this repair landed',
        // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6).
        op: store.write(address, 'mem', 'repaired', rctx).op,
      }),
      message: 'y is violated by the committed value',
    }
    : true)));
  const commitRecord = commit(store, address, 'mem', 'committed');
  const r = capture(() => runAttempt(store, commitRecord));
  assert.equal(r.threw, true, 'the attempt fails');
  const closed = report(store, commitRecord.attempt);
  const failedSteps = closed.rollback.filter((s) => s.failed === true);
  assert.equal(failedSteps.length, 1,
    'the drive reached the floor: ONE call carrying `failed: true` — read the count '
    + `${failedSteps.length}; where it is 0 the drive did not reach a compacted entry INSIDE ITS OWN '
    + 'temporally bounded candidate set and this cell cannot speak `
    + '(write-and-read.md §6.4 item 1\'s `M-5` (a) (ii): only an entry with `E.seq` ≥ the call\'s own named '
    + 'op\'s `seq` can fail it)');
  assert.equal(r.thrown.status, 'KC-8',
    'A REMAINDER A FAILED CALL ON A STILL-OWED OP LEAVES IS `KC-8` — read '
    + `${JSON.stringify(r.thrown.status)}; composition-and-states.md §2.6 item 5 (b) reads "a still owed `
    + 'op whose call meets either floor code is KC-8"; the arm that answers the VIOLATION instead is '
    + '`KC-3`, and that is the arm this cell exists to separate from the floor\'s');
  assert.equal(failedSteps[0].answer, 'RollbackCompacted',
    'and the failing step\'s `answer` carries the STORE\'S OWN code, never the kernel\'s token '
    + '(`§2.6` item 3; `RD-8`) — read ' + JSON.stringify(failedSteps[0].answer));
  assert.deepEqual(failedSteps[0].undoneOps, [],
    'AND THE FLOOR UNDOES NOTHING — all-or-nothing and never partial (`M-6`) — read '
    + JSON.stringify(failedSteps[0].undoneOps));
  const outcomes = entries(r.thrown.log, 'outcome');
  assert.equal(outcomes.length, 1,
    'and the closure writes ONE outcome entry — the floor is answered in the failure\'s own entry and '
    + 'no second entry is appended (`§2.6` item 6 (a))');
  assert.equal(outcomes[0].state, 'KC-8', 'which carries the same token as the thrown form\'s status');
  assert.equal(outcomes[0].message.includes('RollbackCompacted'), true,
    'and its `message` NAMES the store\'s own code as the store\'s answer (`§2.6` item 6 (a)) — read '
    + JSON.stringify(outcomes[0].message));
  assert.equal(closed.outcome, 'failed', 'and the closed record answers the failed arm');
});

/**
 * `P-NEG-4` · the composition's three answer members · `composition-and-states.md §2.6` item 3, at its
 * own bytes: a step's `answer` carries "what the per-op call returned" — the store's OWN code where the
 * call failed — and `restoredTo` is the store's own answer for the attempt's address, a TWO-MEMBER
 * `BaseState` (`store-model.md §6.2`), on BOTH arms. `RollbackStep` is SIX members and this drive reads
 * all six on both arms.
 *
 * STATES ENUMERATED FIRST: (1) the RETURNING arm — an op whose reversal the store performs; (2) the
 * FLOOR arm — a call the store refuses on the compaction floor; (3) the `restoredTo` member on each
 * arm, read against the store's own two-member `BaseState`. FAIL STATES: an `answer` that is not the
 * call's own answer (an object where the store returned a string, or the attempt's own answer carried
 * across steps); a `restoredTo` that is `null` or is not a two-member `BaseState` on either arm.
 */
test('ck_neg_4_every_step_carries_its_own_answer_and_a_two_member_restored_to_on_both_arms', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const runs = [];
  // ARM 1 — A RETURNING CALL, at an address whose window holds the attempt's own op.
  {
    const store = makeStore({ journalLength: 16 });
    const address = [tag('neg4a')];
    register(store, address, 'x', passAtRegistration(() => ({ message: 'x fails' })));
    const record = commit(store, address, 'mem', 'v');
    capture(() => runAttempt(store, record));
    runs.push(['return', report(store, record.attempt)]);
  }
  // ARM 2 — A CALL MEETING THE STORE'S FLOOR, on a compacted base.
  {
    const store = makeStore({ journalLength: 2 });
    const address = [tag('neg4b')];
    for (let i = 0; i < 6; i += 1) store.write(address, 'mem', `seed-${i}`);
    register(store, address, 'x', passAtRegistration(() => ({ message: 'x fails' })));
    const record = commit(store, address, 'mem', 'v');
    capture(() => runAttempt(store, record));
    runs.push(['floor', report(store, record.attempt)]);
  }
  for (const [arm, closed] of runs) {
    assertAttemptReport(closed, `the ${arm} arm's closed report`);
    assert.ok(closed.rollback.length >= 1, `the ${arm} arm made its call`);
    for (const step of closed.rollback) {
      assertRollbackStep(step, `the ${arm} arm's RollbackStep`);
      assert.equal(Object.keys(step).length, 6,
        'RollbackStep is the SIX declared members and never a seventh');
      if (step.failed === false) {
        assert.equal(step.answer, 'ok',
          `on the RETURNING arm the step's \`answer\` is THE LITERAL \`'ok'\` AND NOTHING ELSE — read `
          + `${JSON.stringify(step.answer)}; \`§2.6\` item 3's block reads "answer: string, // 'ok' where `
          + 'the call returned, else the STORE\'S own code it threw", and its own clause closes the '
          + 'domain: "`answer` is EXACTLY ONE OF TWO THINGS"');
      } else {
        assert.equal(STORE_CODES.includes(step.answer), true,
          `and on the FLOOR arm it is THE STORE'S OWN CODE, one of the closed ${STORE_CODES.length} — read `
          + `${JSON.stringify(step.answer)}; §2.6 item 5 (a)`);
      }
      const restored = step.restoredTo;
      assert.equal(restored !== null && typeof restored === 'object', true,
        'and `restoredTo` is present on BOTH arms — the store\'s own answer for the attempt\'s address');
      assert.deepEqual(Object.keys(restored).sort(), ['present', 'value'],
        'a TWO-MEMBER `BaseState` and nothing else (`store-model.md §6.2`)');
      assert.equal(typeof restored.present, 'boolean', '`present` is a boolean');
    }
  }
});

/**
 * `P-NEG-5` · `S-REC-RETAIN` · `contract.md §5.2`'s retain row: "the closed attempt's record is
 * RETAINED — `K-4` returns its final log and `K-5` its report" — and `KC-7`'s own row
 * (`fail-surface.md §2`) is the RE-ENTRANT site (`attempt-lifecycle.md §2.4` item 5 (iii)), never a
 * later caller's.
 *
 * ═══ RE-DERIVED AT THE CONTRADICTION-REPAIR PASS. THE OLD CELL'S STEP (3) WROTE AT
 * `[address[0], 'child']`, A DESCENDANT OF THE FAILED ATTEMPT'S OWN ADDRESS, AND THE STORE REFUSES THAT
 * WRITE WITH ITS OWN `WriteParentNotLink` — `write-and-read.md §3.4`'s `F-5` row: *"the PARENT resolved by
 * `§3.2` is a `leaf`, WHATEVER THE VALUE IS — literal or structured … nothing is installed |
 * `WriteParentNotLink`"*, with `§3.3` item 5: *"If the resolved PARENT is a `leaf`: the write CANNOT
 * BEGIN, because a leaf holds a value and not a link — it fails `WriteParentNotLink`, for EVERY value
 * class"*. The refusal step (3) read was therefore the STORE'S OWN arm and never the kernel's, and the
 * step's subject — a later caller refused by `KC-7` — was not driven at all.
 *
 * THE SUBSTITUTION, AND THE CLAUSE IT IS READ OFF: the failed attempt's own address is REMOVED by the
 * attempt's own rollback (`attempt-lifecycle.md §2.4` item 3's terminal-arm clause: the entry the address
 * was held by is removed, so the address is left FREE), so a descendant aimed under THAT address is
 * answered `AddressNotFound` and no kernel token stands there. THE LAWFUL STORE SHAPE IS THE ONE `§3.3`
 * ITEM 5 ITSELF NAMES: the parent resolved for the descendant's write must be a `branch`. This drive
 * therefore establishes that branch with a PASSING attempt at an ANCESTOR address whose value is an
 * object (`write-and-read.md §1.1`'s re-mint clause and `W-2`/`W-4`: *"a write whose target resolves to a
 * `leaf` and whose value is an object or an array … the new `branch`-tree is minted below it"*), runs the
 * FAILING attempt at a CHILD of that branch, and then aims a fresh `K-2` at a SIBLING of the failed
 * attempt's address — a descendant of a parent that still stands as a `branch`.
 *
 * STATES ENUMERATED FIRST: (1) an attempt that fails `KC-3` and is closed; (2) a FRESH `K-2` at the SAME
 * address afterwards → it RETURNS and mints no `KC-7`; (3) a PASSING attempt at the ancestor address,
 * which leaves it a `branch`; (4) a FAILING attempt at a CHILD of that branch; (5) a FRESH `K-2` at a
 * SIBLING of that failed child's address — a descendant of a still-standing `branch` → it RETURNS;
 * (6) the retained record of the closed attempt → `K-4` answers its final log and `K-5` its report.
 * FAIL STATES: a closed failure that refuses a later caller (`KC-7` outside the re-entrant site); a
 * closed record that `K-4`/`K-5` can no longer answer; a descendant step aimed at a `leaf` parent, which
 * the store answers with its own `WriteParentNotLink` and not with the kernel's refusal at all.
 */
test('ck_neg_5_a_closed_failure_never_refuses_a_later_commit_and_its_record_is_retained', async () => {
  const { register, commit, runAttempt, log, report } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const root = tag('neg5');
  const address = [root];
  register(store, address, 'x', passAtRegistration(() => ({ message: 'x fails and registers no repair' })));
  const first = commit(store, address, 'mem', 'v');
  const r = capture(() => runAttempt(store, first));
  assert.equal(r.threw, true, 'the attempt fails');
  assert.equal(r.thrown.status, 'KC-3', 'at the violation arm');
  const kept = log(store, first.attempt);
  assert.ok(Array.isArray(kept) && kept.length >= 2,
    'the closed attempt\'s FINAL LOG is retained and `K-4` answers it (`contract.md §5.2`: `K-4` is '
    + '"the only reader of a closed attempt\'s final log")');
  const keptReport = report(store, first.attempt);
  assert.equal(keptReport.outcome, 'failed', 'and `K-5` answers its report');
  // (2) THE SAME ADDRESS — the value is an OBJECT so the address is left a `branch` for step (3)'s
  // descendant to be aimed under (`write-and-read.md §1.1`, `W-2`/`W-4`).
  const again = capture(() => commit(store, address, 'mem', {}));
  assert.equal(again.threw, false,
    'A FRESH `K-2` AT THAT SAME ADDRESS RETURNS ITS OWN RECORD — a closed failure leaves no refusal '
    + 'behind it, and `KC-7` is minted only where an attempt at that address is STILL OPEN (`§2.4` item '
    + `5 (iii)); read ${JSON.stringify(again.threw)}`);
  // (3) THE LAWFUL PARENT BRANCH, and (4) THE FAILING CHILD UNDER IT — a PASSING attempt at the branch
  // address, so that the address the descendant step is aimed under resolves to a `branch` and never to
  // a `leaf` (`write-and-read.md §3.3` item 5, `§3.4`'s `F-5`).
  const branchAddress = [root, 'a'];
  register(store, branchAddress, 'p', () => true);
  const passing = capture(() => runAttempt(store, commit(store, branchAddress, 'mem', {})));
  assert.equal(passing.threw, false, 'the attempt that makes the branch is the PASS arm');
  assert.equal(passing.value.outcome, 'passed', 'and it closes on its own pass arm');
  const childAddress = [root, 'a', 'child'];
  register(store, childAddress, 'c', passAtRegistration(() => ({ message: 'the child attempt fails and registers no repair' })));
  const childRecord = commit(store, childAddress, 'mem', 'cv');
  const childRun = capture(() => runAttempt(store, childRecord));
  assert.equal(childRun.threw, true, 'the child attempt fails');
  assert.equal(childRun.thrown.status, 'KC-3', 'at the violation arm, and its own rollback removes it');
  // (5) A FRESH `K-2` AT A DESCENDANT OF THE FAILED ATTEMPT'S ADDRESS — a sibling of the child, under a
  // parent that still stands as a `branch`.
  const deeper = capture(() => commit(store, [root, 'a', 'sib'], 'mem', 4));
  assert.equal(deeper.threw, false,
    'and neither does a fresh `K-2` at a DESCENDANT of a failed attempt\'s address, where that address\'s '
    + `own parent stands as a \`branch\` — read ${JSON.stringify(deeper.threw)}; the store's own `
    + '`WriteParentNotLink` here would mean the drive aimed at a `leaf` parent and this cell would be '
    + 'speaking about the store and not about the kernel');
  assert.equal(deeper.value.attempt === undefined, false,
    'and the descendant\'s record is a real `CommitRecord` carrying its own `attempt` reference');
  assert.equal(log(store, first.attempt).length, kept.length,
    'THE RETAINED RECORD IS UNCHANGED BY THE LATER COMMITS: the closure is written once and no later '
    + 'act appends to it');
});

/**
 * `P-NEG-6` · `attempt-lifecycle.md §2.4` item 1's reference duty, read together with `fail-surface.md
 * §2`'s `KC-7` row AT ITS OWN BYTES: "at `K-2`: the address already holds an OPEN attempt — … — **at
 * `K-3`: a re-entrant `runAttempt` for a live attempt's own address** … — and **at `K-5`: `report` over
 * an attempt that is STILL OPEN**. **All three sites name ONE state: an attempt at that address is
 * live.**" `K-4` IS NOT ONE OF THE THREE, and a `CommitRecord` is not an `AttemptRef`.
 *
 * STATES ENUMERATED FIRST: (1) `K-5` over an attempt that is COMMITTED BUT NOT RUN → `KC-7` (its own
 * site, named in the row); (2) `K-4` over the SAME open attempt → the attempt's own log, which is still
 * EMPTY — `K-4` is the log's reader and its refusal sites are not `KC-7`'s; (3) `K-4` fed a
 * `CommitRecord` itself rather than its `attempt` member → the shape refusal `KC-2`; (4) `K-5` fed the
 * same → `KC-2`; (5) `K-4`/`K-5` over a CLOSED attempt's own reference → the retained answers.
 * FAIL STATES: an open attempt answered as merely unknown (a shape refusal where the row declares
 * `KC-7`); a `CommitRecord` accepted as an `AttemptRef`; an open attempt's `log` REFUSED, which would
 * make the record unreadable while it is being written; a closed attempt refused.
 */
test('ck_neg_6_an_open_attempt_is_KC7_at_K5_while_a_commit_record_is_never_an_attempt_ref', async () => {
  const { register, commit, runAttempt, log, report } = await kernel();
  const store = makeStore();
  const address = [tag('neg6')];
  register(store, address, 'x', () => true);
  const record = commit(store, address, 'mem', 'v');
  // (1) COMMITTED BUT NOT RUN — an OPEN attempt, at the one reader the row names for it.
  const openReport = capture(() => report(store, record.attempt));
  assert.equal(openReport.threw, true,
    'K-5 over an OPEN attempt is REFUSED — `commit`\'s own act moved the address to `OPEN` and no arm '
    + 'has closed the attempt, so this is the row\'s `K-5` site; the call '
    + `returned ${JSON.stringify(openReport.value)} instead, and a third form here is neither the row\'s `
    + 'refusal nor the five-member `AttemptReport` `K-5` returns over a CLOSED attempt');
  assert.equal(openReport.thrown.status, 'KC-7',
    'KC-7 at its `K-5` site — read '
    + `${JSON.stringify(openReport.thrown.status)}; fail-surface.md §2, the KC-7 row`);
  // (2) K-4 OVER THE SAME OPEN ATTEMPT.
  const openLog = capture(() => log(store, record.attempt));
  assert.equal(openLog.threw, false,
    'K-4 ANSWERS THE OPEN ATTEMPT\'S OWN LOG — the row names THREE sites and this is none of them, so a '
    + 'refusal here reads a site the row does not declare');
  assert.deepEqual(openLog.value, [],
    'and nothing has been appended yet: the attempt is open and its log is still EMPTY');
  // (3)/(4) THE `CommitRecord` ITSELF, RATHER THAN ITS `attempt` MEMBER.
  const asRecordLog = capture(() => log(store, record));
  assert.equal(asRecordLog.threw, true, 'a CommitRecord is not an AttemptRef');
  assert.equal(asRecordLog.thrown.status, 'KC-2',
    'and NOTHING ELSE is accepted: the shape refusal is `KC-2` (`§2.4` item 1) and never `KC-7`, whose '
    + 'subject is an attempt that is LIVE');
  const asRecordReport = capture(() => report(store, record));
  assert.equal(asRecordReport.thrown.status, 'KC-2', '`K-5` reads it the same way');
  // (5) A CLOSED ATTEMPT.
  const done = runAttempt(store, record);
  assert.equal(done.outcome, 'passed', 'the attempt resolves');
  assert.ok(Array.isArray(log(store, record.attempt)), 'and its retained final log is answered');
  assert.equal(report(store, record.attempt).outcome, 'passed', 'as is its report');
});

/**
 * `P-NEG-10` · `fail-surface.md §1.1` item 1 (b)/(d), item 3 and item 5: A BODY THAT THREW CLOSES THE
 * ATTEMPT WITH ITS OWN THROWABLE REACHING THE CALLER UNCHANGED, the `constraint-check` entry is
 * WITHDRAWN where the body returned nothing, and the closed record's log and the thrown log are the
 * SAME LIST MEMBER FOR MEMBER.
 *
 * STATES ENUMERATED FIRST: (1) a CONSTRAINT body that throws → no `constraint-check` entry stands, the
 * caller's own errorable reaches the caller, and the closed record's log is the thrown log;
 * (2) a REPAIR body that throws → the `repair-run` entry STANDS, the outcome entry carries `KC-4`, and
 * that log too is the thrown log. FAIL STATES: a thrown form whose log is a COPY rather than the closed
 * record's own list; a `constraint-check` entry left standing after a body returned nothing; a
 * `repair-run` entry withdrawn after a throwing repair.
 */
test('ck_neg_10_both_body_throw_paths_leave_the_closed_log_and_the_thrown_log_the_same_list', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const runs = [];
  // ARM 1 — THE CONSTRAINT BODY THROWS.
  {
    const store = makeStore();
    const address = [tag('neg10a')];
    const mine = new Error('the constraint\'s own errorable');
    // ⟶ `A135` (3) / `§7.3` (b) state 1: the shield lets the registration stand (`register` receives `true`),
    // so the body's throw is the LANDING's — which is the call this arm drives. Unshielded, the throw would
    // surface out of `register` itself and this arm's `runAttempt` drive would never be reached.
    register(store, address, 'x', passAtRegistration(() => { throw mine; }));
    const record = commit(store, address, 'mem', 'v');
    const r = capture(() => runAttempt(store, record));
    assert.equal(r.threw, true, 'the body\'s throw reaches the caller');
    assert.equal(r.thrown, mine,
      'UNCHANGED AND UNCONVERTED: the caller receives THE BODY\'S OWN ERRORABLE, identically, with no '
      + 'envelope around it (`PAR-C-6`; `fail-surface.md §1.1` item 5)');
    runs.push(['constraint-throw', report(store, record.attempt), null]);
  }
  // ARM 2 — THE REPAIR BODY THROWS.
  {
    const store = makeStore();
    const address = [tag('neg10b')];
    const mine = new Error('the repair\'s own errorable');
    // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` is why it is mandatory: unshielded, the registration
    // ATTEMPTS this repair and the throw surfaces THERE, before the attempt this arm drives is ever opened.
    register(store, address, 'x', passAtRegistration(() => ({
      repair: () => { throw mine; },
      message: 'x is invalid',
    })));
    const record = commit(store, address, 'mem', 'v');
    const r = capture(() => runAttempt(store, record));
    assert.equal(r.threw, true, 'the repair\'s throw reaches the caller');
    assert.equal(r.thrown, mine, 'the repair body\'s own errorable, unchanged');
    runs.push(['repair-throw', report(store, record.attempt), 'KC-4']);
  }
  for (const [arm, closed, state] of runs) {
    assertAttemptReport(closed, `the ${arm} arm's closed report`);
    assert.equal(closed.outcome, 'failed', `the ${arm} arm closes the attempt`);
    const outcome = outcomeEntry(closed.log);
    assert.equal(outcome.state, state,
      arm === 'constraint-throw'
        ? 'a body that threw returned nothing, so the attempt is closed on the CONSTRAINT-body path, '
          + 'whose outcome entry carries no kernel state (read ' + JSON.stringify(outcome.state) + ') — '
          + '`fail-surface.md §1.1` item 1 (b), `composition-and-states.md §2.7` item 13'
        : 'while a throwing REPAIR is `KC-4`, read off the row it belongs to (`fail-surface.md §2`\'s '
          + '`KC-4` row) — read ' + JSON.stringify(outcome.state));
    assert.equal(closed.log.filter((e) => e.kind === 'constraint-check').length,
      arm === 'constraint-throw' ? 0 : 1,
      arm === 'constraint-throw'
        ? 'and NO `constraint-check` entry stands for the pair whose body returned nothing '
          + '(`fail-surface.md §1.1` item 1 (b): the entry is WITHDRAWN)'
        : 'and the `constraint-check` entry of the pair that DID return stands');
    if (arm === 'repair-throw') {
      assert.equal(entries(closed.log, 'repair-run').length, 1,
        'the `repair-run` entry stands where a repair body threw — the entry is appended BEFORE the '
        + 'call (`PAR-C-6`)');
    }
  }
  // BOTH ARMS: EVERY CLOSED LOG PASSES THE TWO SHAPE ASSERTIONS THE FILES SHARE, so no arm of these
  // paths mints a member the log's own shape refuses.
  for (const [arm, closed] of runs) {
    let seq = 1;
    for (const e of closed.log) {
      assertLogEntry(e, `the ${arm} arm's closed log at seq ${e.seq}`);
      assert.equal(e.seq, seq, `the ${arm} arm's log is numbered from one without a gap`);
      seq += 1;
    }
    assertSeqIncreasesFromOne(closed.log, `the ${arm} arm's closed log`);
  }
});

// ── helpers local to this file ──────────────────────────────────────────────────────────────────
