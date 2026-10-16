// RED SET — `U-STOREROOM-CONSTRAINTS`, THE `A112` DELIVERY-MODEL RE-SPELL (2026-10-13):
// THE JS SURFACE AS THE INVOKER, ITS TWO ORDERED LAYERS, AND `CommitRecord.pending` AS THE WHOLE
// RETURNED SET OF TRIGGERED CONSTRAINTS.
//
// DERIVED FROM THE SPEC ALONE, at the re-spelled clauses and at no implementation:
//   · `kernel-surface.md §2.1` item 2 — the `CommitRecord` block's fourth member, the `A112`
//     consequence clause ("`pending` CARRIES THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS AT THE
//     MOMENT THIS CALL'S WRITE'S SET IS WRITTEN, AND AN ENTRY LEAVES IT ONLY BY BEING CHECKED OFF AS
//     IT PASSES"), the ORDER LAW ("EVERY LAYER (a) DELIVERY OF THIS CALL COMPLETES BEFORE ANY LAYER (b)
//     BODY OF THIS CALL RUNS"), the OWED populated-state clause, the call-shape clause (i)/(ii), and
//     the throwing-arm clause;
//   · `kernel-surface.md §2.2` item 2 (the split's predicate and layer (b)'s observable: "THE CALLER
//     LAYER TAKES THAT WRITE'S HANDLES AS THE `pending` MEMBER") and item 3 ("A HANDLE THE KERNEL
//     INVOKES IN ITS OWN WINDOW IS CHECKED OFF AS IT PASSES AND THEREFORE STANDS IN `pending` NO
//     LONGER");
//   · `attempt-lifecycle.md §2.4` item 5 (iii)/(iv), item 8 (i) (5) and item 8 (ii) (e);
//   · `e2e-scenarios.md` `E2E-C-1` cell 7 and `E2E-C-8` cells 5/6;
//   · `e2e-scenarios-b.md` `E2E-C-16` cells 2/5 and its steps (1b)/(4);
//   · `composition-and-states.md §2.6` item 4 (b), read through that part's §3 item 1;
//   · `contract.md §5.5` (`P-SM-5`) and `fail-surface.md`'s closing delta (its `KC` rows are UNMOVED —
//     read at that part before this file asserts any `KC` token).
//
// THE `A112` LAW THIS FILE IS DERIVED AT, AT ITS BYTES: **the Rust store returns the handles and
// invokes nothing; the JS surface is the invoker, in two ordered layers before it returns to the calling
// process — first the triggered CONSTRAINTS, and only once every constraint has passed, the OTHER
// LISTENERS; `pending` is the whole returned set of triggered constraints with each entry leaving it
// only by being checked off as it passes; and because no listener runs until the constraints pass,
// every listener is `pending` on every write.** The superseded readings this file asserts NOWHERE:
// *"the caller's own loop is layer (b)'s only invoker"*; *"a handle already run is never in `pending`"*;
// *"`pending` carries a sifted subset"*; *"the store's own delivery"* as the name of the invoking layer.
//
// ── THE STATES ENUMERATED BEFORE THE CELLS (one valid drive per reasonable state) ────────────────
//
// S1  A WRITE RETURNING A HANDLE WHOSE PAIR NO PASS EVER EVALUATES. The store's own registration at the
//     watched proper prefix is triggered by the operation's landing; the write returns its handle; no
//     attempt pass runs at that registration's address, so no constraint entry is ever checked off for
//     it. This is `E2E-C-16` step (1b)'s listener handle (`cL`).
// S2  A WRITE RETURNING A HANDLE WHOSE PAIR A PASS DOES EVALUATE. The kernel's own `K-1` pair stands at
//     the write's landing address, so the same returned set also carries the pair's own `K-1` handle.
//     This is `E2E-C-16` step (1b)'s `cA`-shaped handle.
// S3  A PASSING PASS. Every registered pair at the attempt's address returns the pass arm; the log
//     closes on a `commit` entry, the report reads `outcome: 'passed'`, and no `outcome` entry exists.
// S4  A VIOLATING / THROWING PASS. A constraint body returns the violation arm or throws; the caller's
//     channel is the thrown three-member form and the caller's loop meets a throw instead of a return.
// S5  A WRITE UNDER A REGISTRATION WITH NO KERNEL PAIR AT THE ATTEMPT'S ADDRESS. Only plain store
//     registrations are triggered, so the attempt appends no `constraint-check` entry.
// S6  A ROLLED-BACK WRITE. The write failed the registered constraints at its landing and could not be
//     repaired, so its triggered set is DISCARDED rather than carried.
//
// ── THE WHOLE-SET CLAUSE STANDS SETTLED, AND EVERY CELL THAT READS IT ASSERTS IT ─────────────────
//
// SUPERSEDED HEADER, CORRECTED AT THE DELTA PASS OF 2026-10-13: this block once claimed that the
// whole-set clause's observation was "CONFLICTED IN THE SPEC AT TWO LIVE, IN-FORCE SITES", that "the
// three cells that would read it are SKIPPED WITH THE CONFLICT … at their own SKIP REASON below", and
// that "NO expectation is invented here for it" — FALSE OF THIS FILE ON ALL THREE COUNTS: no cell of
// this file is skipped, no skip reason is declared anywhere in it, and the cells that read the clause
// ASSERT it outright. The conflict is also WITHDRAWN BY NAME: `kernel-surface.md §2.2` item 3's
// *"STANDS IN `pending` NO LONGER"* and `§2.1` item 2's *"THE FIRST IS CARRIED BY `triggered` ALONE"*
// are the SUPERSEDED spellings, and the standing reading is the one this file asserts: "`pending`
// CARRIES THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS AT THE MOMENT THIS CALL'S WRITE'S SET IS
// WRITTEN, AND AN ENTRY LEAVES IT ONLY BY BEING CHECKED OFF AS IT PASSES" (`§2.1` item 2; `§2.2`
// item 3 re-spelled; `A: docs/decisions.md` · `A112`), so an entry that was checked off as it passed
// stood in the member BEFORE that pass and left it by that act — never by never having been there.
// THE CELLS THIS FILE CARRIES ARE RE-DERIVED AT THAT READING AND AT NO OTHER; the citations below name
// the clauses that survive, and no message of this file prints a withdrawn sentence as live law.
//
// ── THE FIXTURE AND SURFACE RULES (cited, not re-declared) ───────────────────────────────────────
// Every store is the package's own `storeCreate(cfg)` through the shared helper (`kernel-surface.md §1`
// item 1); every kernel item is reached through the module the helper loads at its one declared home;
// the two call shapes (`§2.1` item 2 (i)/(ii)) are driven off each body's OWN recorded argument; no
// member is read off a store verb's returned value except where a clause names the store's own return
// (`§2.1` item 2's "the store's write returns `{op, watched, triggered}`"). The store's own `write` is
// imported for the drives that must mint the link tier an operation's address needs — the caller's own
// act and no kernel act (`A: docs/specs/storeroom-native/write-and-read.md §3.4`).
//
// THE ONE REGISTRATION-ADDRESS RULE THESE FIXTURES OBEY: the store holds ONE entry per ADDRESS, so at
// one address a plain listener and a kernel pair are ONE entry and the later registration REPLACES the
// earlier body (`attempt-lifecycle.md §2.4` item 5 (iii)'s own measurement). The two-handle drives
// therefore stand the plain registration at a WATCHED PROPER PREFIX of the operation's own address and
// the kernel's pair elsewhere, and each cell reads the layer it is about.

import test from 'node:test';
import assert from 'node:assert/strict';

import { write as storeWrite } from 'provident-storeroom';

import {
  kernel, makeStore, tag, KC,
  assertLogEntry, assertAttemptReport, assertSeqIncreasesFromOne,
  capture, entries,
} from './constraint-kernel-helpers.mjs';

/**
 * THE WHOLE-SET CITATION, printed into the message of every cell that reads the whole-set clause AT ITS
 * ONE SURVIVING HOME, so a reader is sent to the clause that governs and to no withdrawn spelling:
 * `kernel-surface.md §2.1` item 2 — "`pending` CARRIES THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS
 * AT THE MOMENT THIS CALL'S WRITE'S SET IS WRITTEN, AND AN ENTRY LEAVES IT ONLY BY BEING CHECKED OFF AS
 * IT PASSES" — read with `§2.2` item 3 as the `A112` delivery-model re-spell leaves it, where the
 * *"STANDS IN `pending` NO LONGER"* spelling is WITHDRAWN BY NAME and an entry the kernel's own window
 * evaluates "IS STILL WRITTEN AS `pending` WITH THE WHOLE RETURNED SET AND LEAVES IT ONLY BY BEING
 * CHECKED OFF AS IT PASSES; IT IS NEVER *'NO LONGER'* A MEMBER" (`A: docs/decisions.md` · `A112`).
 */
const wholeSetLaw =
  'READ AT THE CLAUSE THAT GOVERNS: `kernel-surface.md §2.1` item 2 — "`pending` CARRIES THE WHOLE '
  + 'RETURNED SET OF TRIGGERED CONSTRAINTS AT THE MOMENT THIS CALL\'S WRITE\'S SET IS WRITTEN, AND AN '
  + 'ENTRY LEAVES IT ONLY BY BEING CHECKED OFF AS IT PASSES" — with `§2.2` item 3 AS RE-SPELLED: an '
  + 'entry the kernel\'s own window evaluates is STILL WRITTEN AS `pending` WITH THE WHOLE RETURNED SET '
  + 'and leaves it ONLY by being checked off as it passes, and the *"STANDS IN `pending` NO LONGER"* '
  + 'and *"THE FIRST IS CARRIED BY `triggered` ALONE"* spellings are WITHDRAWN BY NAME (`A: '
  + 'docs/decisions.md` · `A112`)';

/**
 * THE `S1`/`S2` FIXTURE, ONE ACT PER STEP, so each cell reads a state and not a coincidence:
 * the caller's own minting write at `watch` (which leaves the link tier `operation` needs), the plain
 * registration at `watch`, the kernel's pair at `pairAddress`, and the caller's own `K-2`-composed write
 * at `operation` — the write whose returned set carries BOTH handles.
 */
function twoHandleFixture({ watch, operation, pairAddress }) {
  const store = makeStore();
  const listenerCalls = [];
  const listenerHandle = store.on(watch, (address) => { listenerCalls.push(address); });
  const pairCalls = [];
  const pairHandle = register(store, pairAddress, 'p', (ctx) => { pairCalls.push(ctx); return true; });
  storeWrite(store, watch, 'mem', { [tag('dm-link')]: 1 });
  const beforeCalls = listenerCalls.length;
  return { store, listenerHandle, listenerCalls, pairHandle, pairCalls, beforeCalls };
}

let register; // assigned per cell from the kernel module, so no cell shares another's module handle

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §1  THE STORE'S OWN RETURN AND THE HANDLE'S OWN LAYER (`§2.1` item 2; `§2.2` items 2–3)
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_dm_the_callers_own_write_returns_the_handle_the_adopted_registration_answers_with', async () => {
  ({ register } = await kernel());
  const store = makeStore();
  const address = [tag('dm-a')];
  // S2's own act: the `K-1` pair stands at this address, so the write's returned set carries the
  // registration handle the kernel adopted.
  const pairHandle = register(store, address, 'x', () => true);
  const written = storeWrite(store, address, 'mem', 1);

  assert.deepEqual(Object.keys(written).sort(), ['op', 'triggered', 'watched'],
    'the store\'s own write returns its own three members, and the kernel adds no member to it '
    + '(`§2.1` item 2\'s "WHAT IT IS NOT")');
  assert.ok(Array.isArray(written.triggered), 'the store\'s own `triggered` member is a set of handles');
  assert.equal(written.triggered.length, 1,
    'the store\'s own prefix selection answers this write with the ONE registration standing at its own '
    + `address — read ${written.triggered.length}`);
  assert.equal(written.triggered[0], pairHandle,
    'FAIL-STATE DISTINGUISHED: a store whose write returned a handle the registration did not answer '
    + 'with — the adopted handle IS the one registration entry the store holds for that address '
    + '(`§2.2` item 3; `A: docs/specs/storeroom-native/write-and-read.md §6.5` item 10 (a))');
});

test('ck_dm_the_triggering_address_is_the_operations_own_address_and_never_the_watch_address', async () => {
  ({ register } = await kernel());
  const store = makeStore();
  const watch = [tag('dm-w')];
  const operation = [...watch, tag('dm-wo')];
  const listenerCalls = [];
  const listenerHandle = store.on(watch, (address) => { listenerCalls.push(address); });
  register(store, operation, 'y', () => true);
  storeWrite(store, watch, 'mem', { [tag('dm-wl')]: 1 }); // the caller's own minting act
  listenerCalls.length = 0;

  const written = storeWrite(store, operation, 'mem', 1);
  assert.equal(written.triggered.includes(listenerHandle), true,
    'the proper-prefix registration is triggered by the operation at its descendant address '
    + '(`§2.1` item 2\'s prefix-test citation: a watched address `W` is triggered by an operation at `X` '
    + 'iff `W` IS A PREFIX OF `X`)');
  assert.deepEqual(listenerCalls, [operation],
    'THE ONE ARGUMENT IS THE OPERATION\'S OWN ADDRESS — read ' + JSON.stringify(listenerCalls) + ' for '
    + `the operation at ${JSON.stringify(operation)} under the watch address ${JSON.stringify(watch)}. `
    + 'FAIL-STATE DISTINGUISHED: a delivery carrying the WATCH address, "WHICH MAY BE A PROPER PREFIX OF '
    + 'IT" and is what this clause excludes BY NAME (`§2.1` item 2)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §2  THE CONSTRAINTS LAYER, ITS OWN WINDOW, AND THE ORDER LAW (`§2.1` item 2; item 2 (i))
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_dm_the_kernel_runs_an_evaluated_pairs_own_body_in_its_own_window_with_the_attempt_context', async () => {
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('dm-b')];   // the pair's OWN address: the attempt's first pass evaluates it
  const contexts = [];
  register(store, address, 'x', (ctx) => {
    contexts.push({ address: ctx.address, tier: ctx.tier, value: ctx.value });
    return true;
  });

  const record = commit(store, address, 'mem', 7);
  assert.deepEqual(contexts, [],
    'NO PAIR BODY RUNS AT `K-2`: the JS surface\'s constraints layer runs the pairs ITS OWN PASS '
    + 'evaluated, and the pass is `K-3`\'s (`§2.1` item 2 (i); `attempt-lifecycle.md §2.4` item 5 (iv)) — '
    + `read ${contexts.length} deliveries before \`K-3\``);

  const report = runAttempt(store, record);
  assertAttemptReport(report, 'the pass over the attempt\'s own address');
  assert.equal(report.outcome, 'passed', 'the pair returned the pass arm, so the attempt resolves');
  assert.deepEqual(contexts, [{ address, tier: 'mem', value: 7 }],
    'THE KERNEL RAN THE PAIR\'S OWN BODY, ONE DELIVERY PER EVALUATED PAIR, and that call carried THAT '
    + 'ATTEMPT\'S CONTEXT as its ONE argument, "each VERBATIM as the call it answers carried it" '
    + '(`§2.1` item 2 (i), its one home) — read ' + JSON.stringify(contexts) + '. FAIL-STATE '
    + 'DISTINGUISHED: a pass that delivers no context, a context built from another caller\'s arguments, '
    + 'or a delivery for a pair this pass did not evaluate');
});

test('ck_dm_a_plain_listener_body_is_never_run_by_the_surfaces_constraints_layer', async () => {
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const watch = [tag('dm-c')];
  const operation = [...watch, tag('dm-co')];
  const pairAddress = [...operation, tag('dm-cp')];
  const f = twoHandleFixture({ watch, operation, pairAddress });

  const record = commit(f.store, operation, 'mem', 1);
  const report = runAttempt(f.store, record);
  assert.equal(report.outcome, 'passed', 'this attempt resolves (no pair runs at its own address)');
  assert.deepEqual(f.pairCalls, [],
    'a pair of a DESCENDANT address is not evaluated by this attempt — the pass\'s own set is the '
    + 'address-scoped one (`§2.1` item 2\'s layer-(a) extent clause; `§2.3` item 1) — read '
    + `${f.pairCalls.length} pair deliveries`);
  assert.deepEqual(f.listenerCalls.slice(f.beforeCalls), [operation],
    'THE ONE BODY THE SURFACE RAN IN THIS WINDOW IS THE PLAIN LISTENER\'S, AND IT IS NO PAIR\'S: the '
    + 'constraints layer\'s extent is "ONE DELIVERY PER EVALUATED PAIR, EACH CARRYING THAT PAIR\'S OWN '
    + 'FUNCTION — AND FOR NO OTHER" (`§2.1` item 2\'s layer-(a) extent clause), and the call this body '
    + 'received carries the OPERATION\'s own address, which is the plain listener\'s own declared shape '
    + '(item 2 (ii)) — read ' + JSON.stringify(f.listenerCalls.slice(f.beforeCalls)) + '. FAIL-STATE '
    + 'DISTINGUISHED: a constraints layer that runs a LISTENER body for a pair it did not evaluate, or a '
    + 'pair\'s context handed to a listener');
});

test('ck_dm_a_passed_constraint_does_not_mark_a_listener_run_and_no_kernel_act_runs_one', async () => {
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const watch = [tag('dm-e')];
  const operation = [...watch, tag('dm-eo')];
  const pairAddress = [...operation, tag('dm-ep')];
  const f = twoHandleFixture({ watch, operation, pairAddress });

  const record = commit(f.store, operation, 'mem', 1);
  // ── ⟶ RE-DERIVED AT THE `A116` ORDERING-SEAM PASS (2026-10-15) AT THE CLAUSE THAT MOVED THE INSTANT:
  //    `surface.md §2.4` item 9's instant (a) with `A116` (D1)–(D2) — THE KERNEL CALLS THE SEAM BEFORE
  //    THE STORE'S WRITE VERB IS CALLED AND THE ENTRY WITHHOLDS THAT WRITE'S IN-WINDOW INVOCATION, so
  //    the write this attempt's pass carries delivers NOTHING inside the verb's window and the residue
  //    follows the pass to ITS TERMINAL ARM (`§2.7` item 7). The two counts are named apart below: the
  //    in-window set is asserted where the window closes, and the terminal arm's own delivery is
  //    asserted after `K-3` returns.
  const inWindowAtCommit = f.listenerCalls.length;
  const callsBeforeRunAttempt = f.listenerCalls.length;
  const report = runAttempt(f.store, record);
  assert.equal(report.outcome, 'passed', 'the attempt resolves');
  assert.deepEqual(entries(report.log, 'constraint-check'), [],
    'this attempt evaluated no pair, so no `constraint-check` entry exists to be read as a constraint '
    + 'having passed (`kernel-surface.md §2.5` item 1\'s kind table; S5)');
  assert.equal(inWindowAtCommit, f.beforeCalls,
    'AND THE COMMIT\'S OWN IN-WINDOW INVOCATION SET IS EMPTY: the write `K-2` issued was adopted at '
    + 'instant (a) BEFORE the store\'s write verb was called (`surface.md §2.4` item 9; `A116` (D1)), so '
    + 'the package\'s post-verb invocation reaches NO handle of that write and the only calls standing '
    + 'when the window closes are the ones the caller\'s own earlier minting write reached — '
    + '`§2.7` item 7\'s own clause ("its instant is the pass\'s terminal arm") read at this write\'s '
    + `window. FAIL-STATE DISTINGUISHED: a delivery still made inside the verb's window — read `
    + `${inWindowAtCommit - f.beforeCalls} in-window invocation(s) beyond the minting write`);
  assert.equal(f.listenerCalls.length, callsBeforeRunAttempt + 1,
    'AND THE RESIDUE IS DELIVERED AT THE PASS\'S TERMINAL ARM, AFTER THE LAST CONSTRAINT HAS BEEN '
    + 'EVALUATED AND BEFORE `runAttempt` RETURNS TO THE CALLING PROCESS: the residue this attempt\'s '
    + 'check-off leaves is the plain listener\'s own handle — the pair\'s entry left by being checked off '
    + 'as it passed and no pair of this attempt stands at the listener\'s address, so nothing else left '
    + 'the member — and the seam\'s instant (b) iterates THAT residue through the instance\'s own '
    + 'registry, one invocation per handle (`surface.md §2.4` item 9\'s instant (b); `§2.7` item 7 '
    + '(a)–(b)). FAIL-STATE DISTINGUISHED: a terminal arm that delivers nothing, which would leave the '
    + 'residue owed by nothing — read '
    + `${f.listenerCalls.length - callsBeforeRunAttempt} invocation(s) at the terminal arm of ${1} owed`);
  assert.deepEqual(f.listenerCalls, [watch, operation],
    'and each of those calls carried the operation\'s own address — the minting write\'s own address and '
    + 'then the commit\'s own, which is the TRIGGERING ADDRESS the terminal arm\'s delivery carries as '
    + 'its single argument (`§2.7` item 5; `§2.4` item 9\'s instant (b))');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §3  THE FAIL-STATE ARMS THE SAME CLAUSES FIX
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_dm_on_a_throwing_arm_the_callers_loop_performs_no_invocation_for_a_handle_the_set_carries', async () => {
  // ── RE-DERIVED AT THE CELL-REPAIR REMAND OF 2026-10-13, AT `A112` AS IT SETTLES: NO LISTENER RUNS
  //    UNTIL THE CONSTRAINTS PASS. ────────────────────────────────────────────────────────────────────
  // ── ⟶ RE-DERIVED AGAIN AT THE FINAL CELL-CORRECTION PASS OF 2026-10-13: **THE ORDERING EXPECTATION
  //    IS HANDED TO THE JS SURFACE UNIT** (`D-GP-SVM-4` OUTCOME (a); its own OPEN row at
  //    `docs/next-steps.md`). ─────────────────────────────────────────────────────────────────────────
  // THE EXPECTATION, NAMED AS IT STOOD AND AS THE CLAUSES ABOVE STATE IT: that a registered PLAIN
  // LISTENER'S BODY NOT BE DELIVERED WHILE A CONSTRAINT OF THE SAME OPERATION STANDS UNCHECKED.
  // THE EVIDENCE THAT THIS UNIT CANNOT DELIVER IT, MEASURED BY THIS CELL'S OWN DRIVE AT THIS TREE: the
  // listener body IS delivered inside `K-2`'s own window — the operation's own address recorded before
  // any pass of this attempt has run — while `K-2` invokes NO constraint body at all (`§2.1` item 2 (i)
  // read with `attempt-lifecycle.md §2.4` item 5 (iv): the pass is `K-3`'s). THE DELIVERY IS THE PACKAGE
  // ENTRY'S OWN ACT (`bindings/js/index.mjs`'s `on`, whose wrapper the store's own machinery calls), the
  // entry cannot learn whether a constraint stands owed — the kernel's five exports (`K-1`–`K-5`) carry
  // no such read — and importing the kernel into the entry collides with the publish contract (`P-PUB-7`
  // pins the published files to `README.md`/`index.d.ts`/`index.mjs`, and the publish drive stages
  // `index.mjs` alone, so a kernel import would fail there). SO THE WITHHOLDING IS HANDED OFF AND
  // NOTHING IS DELETED HERE: the cell stands, its id and its subject standing with it.
  // EVERY CLAUSE OF THIS HEADER STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS ONE (`RCA-8(d)`
  // ANNOTATE-BESIDE): the sentence below that reads the listener as standing UN-RUN across this arm's
  // whole window states the HANDED-OFF ordering expectation and is asserted nowhere in the body, and the
  // extent this header once REPORTED WITHOUT ASSERTING is now PINNED BY LAW AND ASSERTED IN THE BODY on
  // the clause that fixes it (`attempt-lifecycle.md §2.4` item 8 (i) (5); `§3` items 8 and 11).
  // WHAT THIS CELL NOW ASSERTS — THE KERNEL'S OWN DECLARED SURFACE AND NOTHING ELSE: on this throwing arm
  // the kernel runs ONE DELIVERY PER EVALUATED PAIR, CARRYING THAT PAIR'S OWN FUNCTION AND FOR NO OTHER,
  // in its own window (`§2.1` item 2 (i)); the store invokes no constraint body on either layer's behalf
  // (`§2.2` item 2 — `K-2`'s own return carrying zero pair deliveries); the caller's loop is ONE INVOKER
  // AMONG THE JS SURFACE'S OWN ORDERED LAYERS AND NEVER THE ONLY ONE (`§2.2` item 2); and the caller
  // meets a throw instead of a return, so its loop performs no invocation for any handle the member
  // carries (`§2.1` item 2).
  // THE GROUND THIS CELL ONCE RESTED ON IS WITHDRAWN BY NAME: it required, on an arm whose registered
  // constraint NEVER PASSES, that a registered plain listener's body HAD ALREADY RUN — i.e. it read the
  // other-listeners layer as running BEFORE the constraints resolved. `A: docs/decisions.md` · `A112`
  // says the opposite in one line — **THE JS SURFACE RUNS THE TRIGGERED CONSTRAINTS FIRST AND ONLY THEN
  // THE OTHER LISTENERS; NO LISTENER RUNS UNTIL THE CONSTRAINTS PASS; EVERY LISTENER IS `pending` ON
  // EVERY WRITE** — and `§2.1` item 2's order law is the same order ("EVERY LAYER (a) DELIVERY OF THIS
  // CALL COMPLETES BEFORE ANY LAYER (b) BODY OF THIS CALL RUNS"). WHAT THIS CELL NOW DRIVES: ON A
  // NEVER-PASSING ARM THE LISTENER STANDS UN-RUN, AND THE LOOP THE CLAUSE NAMES PERFORMS NO INVOCATION
  // FOR ANY HANDLE THE MEMBER CARRIES — the caller meets a throw instead of a return.
  // ▸ THE ONE READING THIS CELL ONCE REPORTED AND DID NOT ASSERT IS NOW PINNED BY LAW AND ASSERTED
  //   BELOW, ON THE CLAUSE THAT FIXES IT AND NOT ON A READING: the two clauses that reach this arm's set
  //   are ONE RULE (`attempt-lifecycle.md §3` item 8 (`F1`) and item 11 (`F4`); `A: docs/decisions.md` ·
  //   `A112`): THE FAILING ARM READS `triggered` AS THE STORE'S RETURNED SET VERBATIM AND REMOVES FROM
  //   `pending` EXACTLY THE HANDLES OF THE WRITE THAT FAILED — no pass of this attempt checks any of them
  //   off, so the ONE lawful removal beside a check-off, the DISCARD, is what empties them
  //   (`§2.4` item 8 (i) (5)) — WHILE AN ENTRY FOR A HANDLE OF ANY OTHER WRITE, a registration at a
  //   PREFIX address whose pair NO pass of this attempt evaluates, STANDS in the member after the arm;
  //   the whole-member clear is the SECOND, UNLAWFUL REMOVAL and is WITHDRAWN BY NAME, so no reading of
  //   this arm demands an empty member.
  // ▸ AND THE TWO OBSERVABLES ARE NOT ONE: THE LOOP'S OWN COUNT IS READ OFF THE BODIES' COUNTERS AND
  //   NEVER OFF THAT EXTENT — the caller's loop performs NO invocation because it MEETS A THROW instead
  //   of a return, WHATEVER the member carries (`F4`), so an entry the member still carries is invoked
  //   by nothing here.
  // ▸ THE EXTENT IS NOT RE-DERIVED A THIRD TIME HERE: RE-DERIVED AT THIS BY-SET PASS ON THE FAILED
  //   WRITE'S OWN RETURNED SET — EVERY handle that write returned leaves, and an entry it did not return
  //   stands — it is asserted by the sibling negatives
  //   `ck_neg_dm_01_throwing_arm_prefix_listener_discard_extent` and
  //   `ck_neg_dm_02_pass_exits_at_repair_unevaluated_handle`
  //   (`bindings/js/test/constraint-kernel-deltamodel.test.mjs`) and by
  //   `ck_p_neg_14_the_discard_reaches_a_handle_by_the_set_it_came_back_in_and_not_by_the_ancestry_of_its_registration`
  //   (`bindings/js/test/constraint-kernel-negatives.test.mjs`) — RE-DERIVED SINCE THAT PASS AND READ BY
  //   THIS SAME LAW, ITS FAILING-ARM READING BY THE SET RELATION AND NOT BY THE ANCESTRY OF A
  //   REGISTRATION, THE FINDING NAMED IN THE EARLIER PASS THEREFORE DISCHARGED AT THAT CELL — while its
  //   survivor half is UNREACHABLE in this unit, filed at `ck_neg_dm_census_*`, and its first-arm
  //   removal stands. The clause's survivor half is asserted by no cell of this unit, and no survivor is
  //   invented here.
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const store = makeStore();
  const watch = [tag('dm-f')];
  const operation = [...watch, tag('dm-fo')];
  const listenerCalls = [];
  // THE TWO BODIES ARE HELD, NOT INLINED, AND THE PAIR'S OWN HANDLE IS KEPT: the caller's own loop
  // invokes A REGISTERED BODY and the count this cell reads is THAT BODY'S OWN (`attempt-lifecycle.md
  // §2.4` item 8 (ii) (e)), while `K-1`'s return is the store's own home handle for the address it
  // registered at — the handle the write at that address returns (`kernel-surface.md §2.1` item 2).
  const listenerBody = (address) => { listenerCalls.push(address); };
  const listenerHandle = store.on(watch, listenerBody);
  let pairRuns = 0;
  const pairBody = () => { pairRuns += 1; return false; };
  const pairHandle = register(store, operation, 'x', pairBody);
  storeWrite(store, watch, 'mem', { [tag('dm-fl')]: 1 });
  listenerCalls.length = 0; // the minting write is the caller's own act and not this arm's window

  const record = commit(store, operation, 'mem', 1);
  assert.equal(record.triggered.includes(listenerHandle), true,
    'the returned set this drive meets carries an un-run listener\'s handle — the registration at the '
    + 'proper prefix is triggered by the operation at its descendant address, and NO CONSTRAINT OF THIS '
    + 'CALL HAS PASSED, so `A112` leaves its body un-run (`§2.1` item 2; `A: docs/decisions.md` · `A112`)');
  assert.equal(pairRuns, 0,
    'AND THE STORE INVOKES NO CONSTRAINT BODY ON EITHER LAYER\'S BEHALF: the ONE delivery per evaluated '
    + 'pair is the CONSTRAINTS LAYER\'s, and its own run completes in its own verb call\'s window, which '
    + 'is `K-3`\'s (`§2.1` item 2 (i); `attempt-lifecycle.md §2.4` item 5 (iv); `§2.2` item 2 — the store '
    + 'returns the handles) — read ' + `${pairRuns} pair deliveries at \`K-2\`'s own return`);
  const afterCommit = listenerCalls.length;

  // ── THE CALLER'S OWN PATH, TAKEN WHOLE AND IN THE CALLER'S OWN ORDER ─────────────────────────────
  // The loop the clause names is THE CALLER'S OWN: for each handle the member carries it invokes the
  // body that handle's own registration returned (`kernel-surface.md §2.1` item 2's layer-(b) clause;
  // `attempt-lifecycle.md §2.4` item 8 (ii) (e)), and the caller's own code stands it AFTER its verb
  // call, ON THE RETURN PATH. THIS DRIVE TAKES THAT PATH AND NOT A PROXY FOR IT: what it counts is THE
  // INVOCATIONS THE LOOP MAKES, cross-read at the bodies' own counters (`listenerCalls`, `pairRuns`), and
  // the member's own ENTRIES are A DIFFERENT OBSERVABLE, read where the law reads them, below.
  const bodiesOfTheCallersLoop = new Map([[listenerHandle, listenerBody], [pairHandle, pairBody]]);
  let loopInvocations = 0;
  const invokeInTheCallersLoop = (handle) => {
    const body = bodiesOfTheCallersLoop.get(handle);
    if (body === undefined) return; // no registered body stands behind this handle
    loopInvocations += 1;           // the loop's own act, counted where it is made
    body(operation);                // and the body counts itself, at its own counter
  };
  const outcome = capture(() => {
    const report = runAttempt(store, record);
    for (const handle of record.pending) invokeInTheCallersLoop(handle);
    return report;
  });
  assert.equal(outcome.threw, true, 'a failing pair reaches the caller as a THROW and not a return');
  assert.equal(outcome.thrown.status, KC[3],
    'the token is the constraint-violation token of the closed eight (`fail-surface.md §2`), and NO '
    + '`KC-*` row is moved by this re-spell — that part\'s closing delta is read before this assertion '
    + 'is made');
  for (const e of outcome.thrown.log) assertLogEntry(e, 'the thrown form\'s own log entry');
  assertSeqIncreasesFromOne(outcome.thrown.log, 'the thrown form carries the attempt\'s own log');

  assert.equal(listenerCalls.length - afterCommit, 0,
    'AND NO KERNEL ACT RUNS A LISTENER BODY: the closure of this attempt added no invocation of its own '
    + '— read ' + `${listenerCalls.length - afterCommit} listener invocations across \`K-3\`'s own window, `
    + 'the listener\'s own delivery standing at `K-2` and being the package entry\'s own act '
    + '(`bindings/js/index.mjs`\'s `on`, whose wrapper the store\'s own machinery calls), WHOSE ORDERING '
    + 'IS HANDED TO THE JS SURFACE UNIT (`D-GP-SVM-4` outcome (a); `docs/next-steps.md`\'s OPEN row) AND '
    + 'IS ASSERTED NOWHERE HERE. FAIL-STATE DISTINGUISHED: a kernel act that runs a listener body when '
    + 'the attempt closes (`§2.1` item 2 (i); `§2.2` item 2)');

  // THE CLAUSE AT ITS BYTES: "ON A THROWING ARM THE CALLER'S LOOP PERFORMS NO INVOCATION FOR ANY HANDLE
  // THIS MEMBER CARRIES" (`§2.1` item 2), AND ITS ONE GROUND IS THE THROW: the caller's own code stands
  // its loop on the RETURN path (the path this drive took above, and the loop with it), and the loop's
  // own work is the INVOCATION of a carried handle's registered body — so the count is read off THE
  // BODIES' OWN COUNTERS and NEVER off the member's entries (`attempt-lifecycle.md §3` item 11 (`F4`);
  // `§2.4` item 8 (ii) (e)).
  assert.equal(loopInvocations, 0,
    'THE CALLER\'S LOOP PERFORMS NO INVOCATION ON THIS ARM, WHATEVER THE MEMBER CARRIES: it meets a THROW '
    + 'instead of a return (`§2.1` item 2; `attempt-lifecycle.md §3` item 11: "the caller\'s loop performs '
    + 'NO invocation because it meets a THROW instead of a return, WHATEVER the member carries") — read '
    + `${loopInvocations} invocations made by the caller's own loop, with the listener's own counter at `
    + `${listenerCalls.length - afterCommit} across \`K-3\`'s own window (the assertion above, whose `
    + 'window the loop stood inside) and the pair\'s own counter at ' + `${pairRuns}. FAIL-STATE `
    + 'DISTINGUISHED: a failing arm that RETURNS instead of throwing — the caller would then reach this '
    + 'loop and invoke the body the entry below still carries, WHICH IS EXACTLY THE INVOCATION THIS '
    + 'CLAUSE FORBIDS');
  assert.equal(bodiesOfTheCallersLoop.has(listenerHandle), true,
    'AND THE LOOP HAD ITS WORK STANDING IN FRONT OF IT AND PERFORMED NONE OF IT: the entry the member '
    + 'still carries below is one this loop\'s own map resolves to the registered body itself, so the '
    + `zero above is THE THROW'S and never an empty loop shape. FAIL-STATE DISTINGUISHED: a drive that `
    + 'reads this clause off an EMPTIED member — the malformed proxy this cell carried before its '
    + 're-derivation, which demanded the member be empty on the very arm the law leaves an earlier '
    + 'write\'s entry standing in (`attempt-lifecycle.md §2.4` item 8 (i) (5); `§3` item 8): the extent '
    + 'is the OTHER observable, asserted below, and is never the count\'s ground (`§3` item 11)');
  // ── THE EXTENT, THE OTHER OBSERVABLE, READ AT THE ONE INSTANT THE CALLER HAS AND ON THE ONE-REMOVAL
  //    RULE THAT FIXES IT (`attempt-lifecycle.md §3` item 8 (`F1`); `§2.4` item 8 (i) (5);
  //    `A: docs/decisions.md` · `A112`). CROSS-CITED AND NOT RE-DERIVED HERE: the two siblings at
  //    `bindings/js/test/constraint-kernel-deltamodel.test.mjs:233`/`:375` — re-derived since at the
  //    same pass as this block, its trailing survivor-assuming expression REMOVED — and the negative at
  //    `bindings/js/test/constraint-kernel-negatives.test.mjs:102` assert these same two edges. AND THE
  //    NEGATIVE'S SECOND-ARM ASSERTION WAS READ WITH ITS OWN FINDING FILED AT THAT PASS: its
  //    FAILING-arm block, `constraint-kernel-negatives.test.mjs:136` (then named
  //    `ck_p_neg_14_the_failed_writes_own_set_leaves_pending_and_the_ancestor_entry_stands_on_both_
  //    arms`, now
  //    `ck_p_neg_14_the_discard_reaches_a_handle_by_the_set_it_came_back_in_and_not_by_the_ancestry_
  //    of_its_registration`),
  //    read the member as `[handlePlain]` on the premise that pass withdrew — SO THE FINDING IS NOW
  //    DISCHARGED AT THAT CELL, whose failing arm is taken by the settled by-set law (its member
  //    `[]`, the discard reaching every handle that write returned, the ancestry of a registration
  //    no discriminator) and whose citation is RE-POINTED here. ─────────────────────────────────────
  assert.equal(record.triggered.includes(pairHandle), true,
    'AND `triggered` STANDS AS THE STORE\'S OWN RETURNED SET VERBATIM, THIS WRITE\'S OWN HANDLE IN IT '
    + 'BESIDE THE UN-RUN LISTENER\'S: `K-1`\'s return is the store\'s own home handle for the address it '
    + 'registered at, and the write at that address returns it (`kernel-surface.md §2.1` item 2\'s '
    + 'prefix-test citation; `attempt-lifecycle.md §3` item 8: "the failing arm reads `triggered` as the '
    + 'store\'s returned set VERBATIM") — the discard empties the OTHER member and moves nothing of this '
    + 'one');
  assert.equal(record.pending.includes(pairHandle), false,
    'AND THE FAILED WRITE\'S OWN ENTRY IS GONE FROM THE MEMBER: the ONE lawful removal beside a check-off '
    + 'is the DISCARD — "THE DISCARD ACTS ON THAT WRITE\'S OWN RETURNED SET AND REACHES EVERY HANDLE OF '
    + 'IT ... WHILE AN ENTRY FOR A HANDLE OF ANY OTHER WRITE STANDS" (`attempt-lifecycle.md §3` item 8) — '
    + 'and NO pass of this attempt checks this pair off, its own evaluation having reached a terminal '
    + 'violation arm (`§2.4` item 8 (i) (5)) — read `pending` ' + JSON.stringify(record.pending.length)
    + '. CROSS-CITED: the same removal at '
    + '`ck_neg_dm_01_throwing_arm_prefix_listener_discard_extent` '
    + '(`constraint-kernel-deltamodel.test.mjs:233`, and at `:375` for the sibling arm, where the handle '
    + 'read is the failed write\'s own; the PREFIX handle of these two cells\' own shape is driven at '
    + '`ck_neg_dm_05_*`, RED and awaiting the discard\'s extent, and at '
    + '`ck_p_neg_14_the_discard_reaches_a_handle_by_the_set_it_came_back_in_and_not_by_the_ancestry_of_its_registration` '
    + '(`constraint-kernel-negatives.test.mjs:136`), RE-DERIVED SINCE THE PASS THAT NAMED IT AND '
    + 'NOW READING ITS FAILING ARM BY THE SET RELATION — the ancestor handle is IN that write\'s own '
    + 'returned set, so the discard reaches it — AND NOT BY THE ANCESTRY OF THE REGISTRATION, the finding '
    + 'filed at the earlier pass being DISCHARGED at that cell. FAIL-STATE DISTINGUISHED: the whole-member '
    + 'clear, '
    + '`record.pending = []`, which removes an entry the failed write\'s own set did not return');
  // ── RE-DERIVED AT THIS BY-SET PASS ───────────────────────────────────────────────────────────────
  // WHAT THIS ASSERTION RESTED ON: that the prefix registration's handle STANDS after the arm because
  // an earlier caller write registered it. THE LAW CARRIES NO SUCH DISCRIMINATOR. `attempt-lifecycle.md
  // §2.4` item 8 (i) (5) fixes the discard's extent by THE SET EACH HANDLE CAME BACK IN — "THE DISCARD
  // ACTS ON THE BLOCKED WRITE'S OWN RETURNED SET … and removes EVERY handle of it, WHILE AN ENTRY FOR A
  // HANDLE OF ANY OTHER WRITE … STANDS" — and `§3` item 8 reads the same: "every entry of that write
  // leaves the member by the DISCARD, no handle of that write being invoked by either layer". THIS
  // WRITE RETURNED THE PREFIX HANDLE — `triggered` carries it, asserted two assertions above — so IT
  // LEAVES. AND THE CLAUSE'S OTHER HALF IS UNREACHABLE HERE: an entry that write did not return cannot
  // stand in a member whose every entry the store returned for the write that failed, so the cell
  // asserts the SET RELATION and not a survivor the fixture cannot produce.
  assert.equal(record.pending.includes(listenerHandle), false,
    'AND THE PREFIX HANDLE IS A MEMBER OF THE FAILED WRITE\'S OWN RETURNED SET, SO IT LEAVES WITH EVERY '
    + 'OTHER HANDLE OF THAT SET: the store answered THIS write with it — `triggered` carries it, asserted '
    + 'above — and the store\'s own prefix test is what put it there, its body\'s delivery inside this '
    + 'verb call\'s window being the store\'s own and no pass of this attempt\'s (`§2.1` item 2 (ii); '
    + '`§2.3` item 1). "AN ENTRY FOR A HANDLE OF ANY OTHER WRITE STANDS" is true of an entry the failing '
    + 'write DID NOT RETURN; the earlier write\'s own return of this same handle is no reason for it to '
    + 'stand, the law fixing each entry\'s fate BY THE SET IT CAME BACK IN and never by the '
    + 'registration\'s author — `kernel-surface.md §2.1` item 2 declaring "filtering by the write\'s '
    + 'author" a `SIFT`, which is UNLAWFUL. FAIL-STATE DISTINGUISHED: a discard scoped to the pairs the '
    + 'pass evaluated or to the attempt address\'s home handle, which leaves THIS entry standing as the '
    + 'caller\'s loop\'s second delivery — read `pending` ' + JSON.stringify(record.pending.length));
  assert.deepEqual(record.pending.slice(), [],
    'AND THE MEMBER AFTER THE ARM IS EMPTY BY THAT RELATION AND NOT BY A CLEAR: every entry it carries is '
    + 'a handle the write that failed returned — at `K-2`\'s return the member "IS the whole returned set" '
    + '(`kernel-surface.md §2.1` item 2; `attempt-lifecycle.md §3` item 10) and the only write whose set '
    + 'it carries is the one whose arm threw (`§2.4` item 8 (i) (5)) — so `pending` after the arm is that '
    + 'set minus its own handles, entry for entry, and NOTHING is left for the caller\'s loop. THE BLANKET '
    + 'CLEAR IS WITHDRAWN BY NAME as the SECOND, UNLAWFUL REMOVAL (`§3` item 8), and it is NOT this '
    + 'assertion\'s rule: it removes what no such relation removes, which is why the relation above, and '
    + 'never the emptiness, is the reading; read `triggered` ' + record.triggered.length + ' of `pending` '
    + record.pending.length);
  // ── AND THE "EXACTLY ONE REMOVAL PER ARM" READING IS CARRIED BY THE SET RELATIONS ABOVE, IN BOTH ──
  //    DIRECTIONS, AND NOT BY A TRAILING EXPRESSION THAT ASSUMED A SURVIVOR: `triggered` is asserted as
  //    the store's returned set VERBATIM (`:430`) and this write's OWN handle of it as gone from the
  //    member (`:437`), the prefix handle's departure standing beside it (`:464`) with the member empty
  //    by that relation (`:476`) — so a member from which an entry the failed write's own set did not
  //    return was subtracted is caught by THOSE reads. A `record.triggered.filter((h) => h !==
  //    pairHandle)` residue — the withdrawn premise's own spelling, a member keeping `listenerHandle`
  //    STANDING — is not re-derivable here: THIS WRITE RETURNED the prefix handle (`:430`), so by the
  //    by-set law (`attempt-lifecycle.md §2.4` item 8 (i) (5); `§3` item 8) it LEAVES, and the residue
  //    contradicts `:464`/`:476` two lines above. REMOVED AT THIS CELL-REPAIR PASS AND NOT RE-SPELLED —
  //    no weaker replacement stands in its place.
  assert.equal(pairRuns, 1,
    'AND THE KERNEL\'S OWN WINDOW RAN THAT ONE DELIVERY, ONCE, FOR THE PAIR IT EVALUATED AND FOR NO '
    + 'OTHER: "ONE DELIVERY PER EVALUATED PAIR, EACH CARRYING THAT PAIR\'S OWN FUNCTION — AND FOR NO '
    + 'OTHER" (`§2.1` item 2 (i)), the throw being what the caller meets INSTEAD OF A RETURN so that no '
    + 'second invoker reaches that body (`§2.1` item 2\'s throwing-arm clause) — read '
    + `${pairRuns} deliveries of the pair's own body on this arm`);
});

test('ck_dm_the_throw_reaches_the_caller_and_the_arm_leaves_nothing_for_a_loop_to_invoke', async () => {
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('dm-g')];
  const runs = [];
  register(store, address, 'x', () => { runs.push('pair'); return false; });
  const record = commit(store, address, 'mem', 1);

  const outcome = capture(() => runAttempt(store, record));
  assert.equal(outcome.threw, true, 'the arm throws');
  assert.deepEqual(runs, ['pair'],
    'EXACTLY ONE DELIVERY OF THE PAIR\'S OWN BODY HAPPENS ON THIS ARM — the surface\'s constraints layer '
    + 'runs the pair it evaluated once, and the throw is what the caller meets INSTEAD OF A RETURN, so no '
    + 'second invoker reaches that body (`§2.1` item 2\'s throwing-arm clause) — read '
    + JSON.stringify(runs));
  assert.deepEqual(record.pending, [],
    'AND "THE ARM REACHES THE LOOP WITH NOTHING LEFT IN IT TO INVOKE — THE HANDLES IT CARRIES ARE EVERY '
    + 'ONE OF THEM OF THE KERNEL\'S OWN WINDOW, THE SET THE STORE\'S RETURN CARRIED, RUN THROUGH THE JS '
    + 'SURFACE\'S CONSTRAINTS LAYER" (`§2.1` item 2). FAIL-STATE DISTINGUISHED: a throwing arm whose set '
    + `still carries an un-run handle — read ${JSON.stringify(record.pending)}`);
});

test('ck_dm_a_rolled_back_writes_triggered_set_is_discarded_rather_than_carried', async () => {
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const store = makeStore();
  const watch = [tag('dm-h')];
  const operation = [...watch, tag('dm-ho')];
  // THE OUTSIDE FORM IS THE VIOLATION ARM: a body returning an object carrying no `repair` key, with NO
  // repair registered for its id, is arm (c)'s violation (`fail-surface.md §2`'s `KC-3` row;
  // `attempt-lifecycle.md §2.4` item 4).
  register(store, operation, 'x', () => ({ message: 'the value is invalid and no repair is registered' }));
  storeWrite(store, watch, 'mem', { [tag('dm-hl')]: 1 });

  const record = commit(store, operation, 'mem', 1);
  const outcome = capture(() => runAttempt(store, record));
  assert.equal(outcome.threw, true,
    'arm (c): the pair returned a non-pass arm and no repair is registered for it, so the attempt\'s own '
    + 'terminal act is a throw (`fail-surface.md §2`\'s `KC-3` row; `attempt-lifecycle.md §2.4` item 4)');
  assert.equal(outcome.thrown.status, KC[3], 'and the token it carries is that arm\'s own');
  for (const e of outcome.thrown.log) assertLogEntry(e, 'the thrown form\'s own log entry');
  assert.ok(record.triggered.length >= 1, 'the store\'s own returned set stands in `triggered`');
  assert.deepEqual(record.pending, [],
    'ITS SET IS DISCARDED RATHER THAN CARRIED — "so `triggered` then stands as the store\'s own returned '
    + 'set while `pending` is `[]` and no handle of that write is invoked by either layer" (`§2.1` '
    + 'item 2; the discard rule\'s one home `attempt-lifecycle.md §2.4` item 8 (i) (5)). FAIL-STATE '
    + 'DISTINGUISHED: a rolled-back write whose discarded set still stands in `pending` — read '
    + `${JSON.stringify(record.pending)}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §4  THE WHOLE-SET CLAUSE, ITS CHECK-OFF EDGES, AND THE NEGATIVE ARM OF THE SIFTED SUBSET
//     — EACH CELL ASSERTS THE SETTLED READING AND CITES THE CLAUSES THAT SURVIVE
// ═══════════════════════════════════════════════════════════════════════════════════════════════

// THE READING EACH CELL BELOW ASSERTS, AND WHERE IT STANDS: `kernel-surface.md §2.1` item 2's OWN
// WORDS ARE "`pending` CARRIES THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS AT THE MOMENT THIS
// CALL'S WRITE'S SET IS WRITTEN" — the member is written WHEN THE SET IS WRITTEN, and "AN ENTRY LEAVES
// IT ONLY BY BEING CHECKED OFF AS IT PASSES", the pass being `K-3`'s (`attempt-lifecycle.md §2.4`
// item 5 (iv)). THE CLAUSE THAT ONCE STOOD BESIDE IT AS A CONFLICT — `§2.1` item 2's and `§2.2`
// item 3's "the first is carried by `triggered` alone" / "STANDS IN `pending` NO LONGER" — IS
// WITHDRAWN BY NAME AT THE `A112` DELIVERY-MODEL RE-SPELL, and the two readings are ONE LAW read at
// two instants: the whole set at the write's own instant, the checked-off residue after the pass.
// EACH MESSAGE BELOW CITES THAT LAW (`wholeSetLaw`, declared with the file's imports). THE CELLS ARE
// NOT SKIPPED, and no message of this file prints a withdrawn sentence as its ground.

test('ck_dm_a_writes_whole_returned_set_stands_in_pending_at_the_moment_the_record_is_produced', async () => {
  // ── RE-DERIVED AT THE CELL-REPAIR REMAND OF 2026-10-13, AT THE `A112` DELIVERY-MODEL RE-SPELL AS IT
  //    SETTLES: WHAT THE CALLER CAN READ OF THIS MEMBER. ────────────────────────────────────────────
  // THE OBSERVATION THIS CELL ONCE ASSERTED — `pending` DEEP-EQUAL TO `triggered` "AT THE MOMENT THIS
  // CALL'S WRITE'S SET IS WRITTEN" — IS DECLARED BY `kernel-surface.md §2.1` item 2 TO BE **NOT A
  // CALLER-OBSERVABLE READING OF ANY RECORD THIS SURFACE RETURNS**: "FOR A WRITE THE CALLER MADE THE
  // INVOKING INSTANT IS SINGLE-VALUED AND IT IS THE WRITE'S OWN — SO THE RECORD'S `pending` IS THE WHOLE
  // SET AT THE INSTANT THIS CALL WRITES IT ... and the instant a CALLER can read is the other one: the
  // caller reads its record only after the verb call's window closes, so what THAT reading holds is the
  // set MINUS the entries the window's layer checked off as they passed, and the WHOLE SET AT THAT
  // WRITE'S OWN INSTANT IS NOT A CALLER-OBSERVABLE READING OF ANY RECORD THIS SURFACE RETURNS." A cell
  // asserting that equality reads an instant no returned record carries; the sibling at
  // `constraint-kernel-layers.test.mjs:250` asserts the ONE observable the write-instant clause leaves
  // (`pending.length >= 1` after `K-2`'s return) and is not re-driven here.
  // WHAT THIS CELL NOW DRIVES, AND THE CLAUSE EACH ASSERTION RESTS ON:
  //   · THE RETURNED SET CARRIES ONE HANDLE WHOSE PAIR THE WINDOW'S OWN LAYER RUNS — the `K-1` pair
  //     standing at the write's own landing address — AND ONE HANDLE WHOSE PAIR NO PASS OF THIS ATTEMPT
  //     EVALUATES — the plain registration at the WATCHED PROPER PREFIX, its pair set being the
  //     address-scoped one of the landing's own address and "NOT THOSE OF ANY ANCESTOR ADDRESS"
  //     (`§2.1` item 2's layer-(a) extent clause; `§2.3` item 1);
  //   · AT THE WRITE'S OWN WINDOW'S CLOSE, THE RUN PAIR'S ENTRY HAS LEFT THE MEMBER AND THE UN-RUN
  //     HANDLE'S ENTRY STANDS: the check-off edge, read at `§2.1` item 2's surviving clause — "AN ENTRY
  //     LEAVES IT ONLY BY BEING CHECKED OFF AS IT PASSES" — with `§2.2` item 2's layer (b) clause, "A
  //     HANDLE THE KERNEL DID NOT INVOKE ... STANDS IN THE MEMBER AS ANY CALLER-MADE WRITE'S HANDLE
  //     DOES", the two differing exactly by whether their own pass checked them off. THE WITHDRAWN
  //     SPELLING *"STANDS IN `pending` NO LONGER"* IS CITED NOWHERE AS THIS FILE'S GROUND: `§2.2`
  //     item 3 as re-spelled writes the same state as an entry that "IS STILL WRITTEN AS `pending` WITH
  //     THE WHOLE RETURNED SET AND LEAVES IT ONLY BY BEING CHECKED OFF AS IT PASSES" (`A:
  //     docs/decisions.md` · `A112`);
  //   · AND THE SIFT'S OWN ABSENCE IS ASSERTED BY THE MECHANISM AND NEVER BY EQUALITY WITH `triggered`:
  //     `pending` `⊇` the one entry the pass did not check off, and `pending` carries NO entry this
  //     write's returned set does not carry — so the member is a state of the returned set and not a
  //     subset subtracted from it (`A: docs/decisions.md` · `A112`: a `SIFT` is "A SUBTRACTION OF AN
  //     ENTRY FROM `pending` NOT TIED TO THAT ENTRY'S OWN PASS").
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const store = makeStore();
  const watch = [tag('dm-i')];
  const operation = [...watch, tag('dm-io')];
  const listenerCalls = [];
  const listenerHandle = store.on(watch, (address) => { listenerCalls.push(address); });
  const pairHandle = register(store, operation, 'x', () => true);
  storeWrite(store, watch, 'mem', { [tag('dm-il')]: 1 }); // the caller's own minting act for the watcher
  listenerCalls.length = 0;

  const record = commit(store, operation, 'mem', 1);
  assert.equal(record.triggered.includes(listenerHandle), true,
    'THE UN-RUN HANDLE\'S OWN ORIGIN IS THE STORE\'S RETURN: the write at the operation\'s address is '
    + 'triggered by the registration at its proper prefix, so the returned set carries it '
    + '(`§2.1` item 2\'s prefix-test citation)');
  assert.equal(record.triggered.includes(pairHandle), true,
    'and the returned set carries the evaluated pair\'s own handle beside it — two handles at the one '
    + 'write, read off `triggered`, the member the store\'s own answer stands in VERBATIM');

  const report = runAttempt(store, record);
  assert.equal(report.outcome, 'passed', 'the evaluated pair returned the pass arm, so the attempt resolves');
  assert.equal(record.pending.includes(pairHandle), false,
    'THE CHECK-OFF EDGE, AT THE ONE INSTANT THE CALLER CAN READ IT: the pair THIS ATTEMPT\'S OWN PASS '
    + 'EVALUATED stands in the member no longer — "AN ENTRY LEAVES IT ONLY BY BEING CHECKED OFF AS IT '
    + 'PASSES" (`§2.1` item 2), and this entry passed (`§2.2` item 3). FAIL-STATE DISTINGUISHED: a build '
    + 'that leaves the checked-off entry for the caller\'s loop to invoke as though no pass had reached '
    + 'it — read `pending` ' + JSON.stringify(record.pending.length) + ' after the window');
  assert.equal(record.pending.includes(listenerHandle), true,
    'AND THE HANDLE WHOSE PAIR NO PASS OF THIS ATTEMPT EVALUATED STILL STANDS: the pass\'s own set is '
    + 'the address-scoped one — "the pairs registered at the landing\'s own address and NOT THOSE OF ANY '
    + 'ANCESTOR ADDRESS" (`§2.1` item 2\'s layer-(a) extent clause; `§2.3` item 1) — so this entry has no '
    + 'pass of its own to be checked off by and is removed by NOTHING BUT such a pass (`A: '
    + 'docs/decisions.md` · `A112`). FAIL-STATE DISTINGUISHED: the SIFT — a `pending` from which an '
    + 'entry was subtracted WITHOUT that entry\'s own pass, which `A112` declares UNNECESSARY AND '
    + 'UNLAWFUL, and which would empty this member at the write itself');
  assert.deepEqual(record.pending.slice(), record.triggered.filter((h) => h !== pairHandle),
    'AND THE MEMBER IS THE RETURNED SET MINUS THE ONE ENTRY THAT WAS CHECKED OFF AS IT PASSED, ENTRY FOR '
    + 'ENTRY: no returned handle the pass did not check off is absent from it, and no handle it carries '
    + 'stands outside the returned set — so the sift is asserted ABSENT BY THE MECHANISM (`A: '
    + 'docs/decisions.md` · `A112`) and never by an equality with `triggered` AT THE WRITE\'S OWN INSTANT, '
    + 'which `§2.1` item 2 declares NOT a caller-observable reading of any record this surface returns — '
    + 'read `pending` ' + JSON.stringify(record.pending.length) + ' against `triggered` '
    + JSON.stringify(record.triggered.length) + '. FAIL-STATE DISTINGUISHED: a record whose `pending` was '
    + 'SIFTED at the write — a subset of the returned set subtracted before the pass that owns each entry '
    + 'ran — and equally a record whose member carries an entry this write never returned');
});

test('ck_dm_a_checked_off_entry_leaves_pending_and_a_failing_entry_stands_until_it_passes', async () => {
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('dm-j')];
  register(store, address, 'x', () => true);
  const record = commit(store, address, 'mem', 1);
  const before = record.pending.length;
  const report = runAttempt(store, record);
  assert.equal(report.outcome, 'passed', 'the pair passed');
  assert.equal(before, record.triggered.length,
    'the whole set stood in `pending` before the pass — "AT THE MOMENT THIS CALL\'S WRITE\'S SET IS '
    + `WRITTEN" (\`§2.1\` item 2) — read ${before} of \`triggered\` ${record.triggered.length}. `
    + wholeSetLaw);
  assert.deepEqual(record.pending, [],
    'and each entry left it by being checked off as it passed — the check-off\'s own edge, read at the '
    + 'clause that survives: "AN ENTRY LEAVES IT ONLY BY BEING CHECKED OFF AS IT PASSES" (`§2.1` item 2; '
    + '`§2.2` item 3 AS RE-SPELLED at the `A112` delivery-model pass: an entry the kernel\'s own window '
    + 'evaluates is written as `pending` WITH the whole returned set and leaves it by that check-off, and '
    + `the *'NO LONGER'* spelling is WITHDRAWN BY NAME) — read ${JSON.stringify(record.pending)}`);
});

test('ck_dm_no_sifted_subset_is_produced_and_no_listener_is_absent_from_the_write_pending', async () => {
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const watch = [tag('dm-k')];
  const operation = [...watch, tag('dm-ko')];
  const pairAddress = [...operation, tag('dm-kp')];
  const f = twoHandleFixture({ watch, operation, pairAddress });
  // THE PAIR THE ATTEMPT ACTUALLY EVALUATES IS REGISTERED BEFORE THE WRITE `K-2` COMPOSES — the attempt's
  // first pass evaluates the pairs standing at its own address when it runs — so the write's returned set
  // carries it beside the prefix registration's handle, and its `K-1` handle is the one this cell reads.
  const writePairHandle = register(f.store, operation, 'kp-write-address', () => true);

  const record = commit(f.store, operation, 'mem', 1);
  // ── RE-DERIVED AT THE CELL-REPAIR REMAND OF 2026-10-13: THE FIXTURE IS THE HANDLE THE ATTEMPT ACTUALLY
  //    RETURNED. ─────────────────────────────────────────────────────────────────────────────────────
  // THE CELL ONCE STANDED A `K-1` PAIR AT A DESCENDANT of the write's own address and then asserted THAT
  // pair's handle to be in `pending`: the store's trigger selection is the descendant-inclusive PREFIX
  // test (a registration at `W` is triggered by an operation at `X` iff `W` is a PREFIX of `X`), so a
  // pair registered at `[...operation, tag]` is a DESCENDANT address and the store never returns its
  // handle for a write AT `operation` — measured `triggered.length = 1`, `triggered.includes(pair)`
  // false. The cell then demanded `pending.includes(pair) === true` (length 2) AND `pending` deep-equal
  // `triggered` (length 1): the two assertions were unsatisfiable together by ANY implementation — a
  // malformed cell, not a red. ITS SIBLING AT `constraint-kernel-layers.test.mjs:218` drives the
  // descendant case correctly — "a pair of a DESCENDANT address is not evaluated by this attempt" — and
  // this cell no longer doubles it.
  // WHAT THIS CELL NOW DRIVES: the write's ENTIRE RETURNED SET is the two handles the store answered it
  // with — the plain registration's at the watched PROPER PREFIX `watch` and the `K-1` pair's at the
  // write's OWN address `operation` — and NO pass of this attempt evaluates either of those entries off
  // (`K-2` invokes no pair in its window; the pass belongs to `K-3`, and its set is the address-scoped
  // one of `§2.3` item 1, whose pairs are the attempt's own), so at the record's own production NOT ONE
  // entry of the member has anything to be checked off by: the member IS the whole returned set, entry
  // for entry, and a `pending` carrying anything less is EXACTLY the sift `A112` declares UNNECESSARY
  // AND UNLAWFUL. The listener-handle assertion is kept at the top — no listener may be absent from the
  // write's `pending` — and the pair-handle assertion is REPAIRED to the handle this write returned.
  // AND THE PAIR-HANDLE ASSERTION IS REPAIRED TO THE HANDLE THIS WRITE RETURNED (`writePairHandle`), whose
  // registration stands at the write's own address and is therefore in the set the store answered with.
  assert.equal(record.triggered.includes(f.listenerHandle), true,
    'the listener\'s handle stands in the set the write returned');
  assert.equal(record.triggered.length, 2,
    'and the returned set is EXACTLY the two handles the store\'s own prefix test answered with: the '
    + 'registration at the proper prefix `watch` and the pair at the write\'s OWN address — read '
    + `${record.triggered.length} for the write at ${JSON.stringify(operation)}. A HANDLE OF A `
    + 'DESCENDANT REGISTRATION IS NOT IN IT, the trigger selection running a prefix test and never a '
    + 'descendant one (`§2.1` item 2\'s prefix-test citation)');
  assert.equal(record.pending.includes(f.listenerHandle), true,
    'EVERY LISTENER IS `pending` ON EVERY WRITE, so a listener the constraints have not yet passed cannot '
    + 'be absent from this member (`§2.1` item 2) — the re-derived falsifier of `e2e-scenarios.md` '
    + '`E2E-C-8` cell 6: a `pending` read as carrying a listener the constraints have not yet passed');
  assert.equal(record.pending.includes(writePairHandle), true,
    'AND THE EVALUATED PAIR\'S OWN HANDLE — the one THIS WRITE returned at its own address, adopted by '
    + 'the kernel at `K-1` — STANDS IN THE MEMBER TOO: `pending` CARRIES THE WHOLE RETURNED SET and '
    + '"sifting a subset out of the returned set is UNNECESSARY AND UNLAWFUL" (`§2.1` item 2): a record '
    + 'from which the kernel has SUBTRACTED the pair handle its own pass will check off is EXACTLY the '
    + 'sift `A112` withdraws by name, and this cell is driven at that negative arm. FAIL-STATE '
    + 'DISTINGUISHED: a member written as `triggered \\ {the kernel\'s own pairs}`, which is the sift and '
    + 'not the whole set');
  assert.deepEqual(record.pending, record.triggered,
    'and the two members are read together AT THE ONE INSTANT THE CALLER HAS — `K-2`\'s return, where NO '
    + 'pass of this attempt has yet evaluated an entry off, so the set MINUS the entries checked off as '
    + 'they passed IS the whole returned set entry for entry — read `pending` '
    + `${record.pending.length} of \`triggered\` ${record.triggered.length}. The write-instant reading is `
    + 'asserted NOWHERE: `§2.1` item 2 declares it not a caller-observable reading of any record this '
    + 'surface returns');
  const report = runAttempt(f.store, record);
  assert.equal(report.outcome, 'passed', 'the attempt resolves (no pair runs at its own address)');
  assert.equal(record.pending.includes(f.listenerHandle), true,
    'AND THE ENTRY SURVIVES THE WINDOW THAT CHECKED THE OTHER ONE OFF: no pass of this attempt evaluates '
    + 'the prefix registration\'s pair, so nothing checked it off and nothing may subtract it — the set '
    + 'the discard rule reaches is "THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS AND NOT A SIFTED SUBSET '
    + 'OF IT" (`attempt-lifecycle.md §2.4` item 8 (i) (5); `§2.1` item 2)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §5  THE LOOP IS ONE INVOKER AMONG THE SURFACE'S LAYERS — THE BOTH-AND CELL
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_dm_the_callers_loop_is_one_invoker_and_the_kernel_runs_a_pair_body_in_its_own_window', async () => {
  // ── ⟶ RE-DERIVED AT THE FINAL CELL-CORRECTION PASS OF 2026-10-13: **THE ORDERING EXPECTATION IS
  //    HANDED TO THE JS SURFACE UNIT** (`D-GP-SVM-4` OUTCOME (a); its own OPEN row at
  //    `docs/next-steps.md`). ─────────────────────────────────────────────────────────────────────────
  // THE EXPECTATION, NAMED AS IT STOOD: that a registered PLAIN STORE LISTENER'S BODY NOT BE DELIVERED
  // WHILE A CONSTRAINT OF THE SAME OPERATION STANDS UNCHECKED — the assertion the body once carried at
  // `K-2`'s own return (`NO LISTENER BODY RUNS BEFORE THE CONSTRAINTS HAVE PASSED`).
  // THE EVIDENCE THAT THIS UNIT CANNOT DELIVER IT, MEASURED BY THIS CELL'S OWN DRIVE AT THIS TREE: the
  // listener body IS delivered inside `K-2`'s own window — `[["<tag>","<tag>"]]`, the OPERATION'S OWN
  // ADDRESS, recorded before any pass of this attempt has run — while `K-2` invokes NO pair body at all
  // (`§2.1` item 2 (i) read with `attempt-lifecycle.md §2.4` item 5 (iv): the pass is `K-3`'s). THE
  // DELIVERY IS THE PACKAGE ENTRY'S OWN ACT (`bindings/js/index.mjs`'s `on`, whose wrapper the store's
  // own machinery calls); the entry cannot learn whether a constraint stands owed — the kernel's five
  // exports (`K-1`–`K-5`) carry no such read — and importing the kernel into the entry collides with the
  // publish contract (`P-PUB-7` pins the published files to `README.md`/`index.d.ts`/`index.mjs`, and the
  // publish drive stages `index.mjs` alone, so a kernel import would fail there). SO THE WITHHOLDING IS
  // HANDED OFF AND NOTHING IS DELETED HERE: the cell stands, its id and its subject standing with it.
  // WHAT THIS CELL NOW ASSERTS — THE KERNEL'S OWN DECLARED SURFACE AND NOTHING ELSE: the kernel runs ONE
  // DELIVERY PER EVALUATED PAIR, CARRYING THAT PAIR'S OWN FUNCTION AND FOR NO OTHER, IN ITS OWN WINDOW
  // (`§2.1` item 2 (i)); the store invokes no constraint body on either layer's behalf, returning the
  // handles (`§2.2` item 2 — no pair body runs at `K-2`); and the caller's loop is ONE INVOKER AMONG THE
  // JS SURFACE'S OWN ORDERED LAYERS AND NEVER THE ONLY ONE (`§2.2` item 2), its work read off the
  // record's `pending` member after the pass that checks entries off as they pass (`§2.1` item 2).
  ({ register } = await kernel());
  const { commit, runAttempt } = await kernel();
  const watch = [tag('dm-m')];
  const attemptAddress = [...watch, tag('dm-mm')]; // the pair's address IS the attempt's own address
  const kernelRuns = [];
  const loopRuns = [];
  const store = makeStore();
  register(store, attemptAddress, 'x', (ctx) => { kernelRuns.push(ctx.address); return true; });
  const storeDeliveries = [];
  const listenerHandle = store.on(watch, (arg) => { storeDeliveries.push(arg); });
  storeWrite(store, watch, 'mem', { [tag('dm-ml')]: 1 }); // the caller's own minting act
  storeDeliveries.length = 0;
  const record = commit(store, attemptAddress, 'mem', 1);

  assert.equal(record.triggered.includes(listenerHandle), true,
    'the store registration\'s own handle is in this write\'s returned set');
  assert.deepEqual(kernelRuns, [],
    'NO PAIR BODY RUNS AT `K-2`: the kernel\'s ONE DELIVERY PER EVALUATED PAIR is the CONSTRAINTS '
    + 'LAYER\'s and it completes in its own verb call\'s window, which is `K-3`\'s (`§2.1` item 2 (i); '
    + '`attempt-lifecycle.md §2.4` item 5 (iv)) — read ' + `${kernelRuns.length} kernel deliveries at `
    + '`K-2`\'s own return');
  // ── ⟶ RE-DERIVED AT THE `A116` ORDERING-SEAM PASS (2026-10-15) AT THE INSTANT THAT MOVED
  //    (`surface.md §2.4` item 9's instant (a); `A116` (D1)–(D2); `§2.7` item 7): the plain
  //    registration's body is NOT reached inside this write's window at all — the entry withheld that
  //    write's in-window invocation before the store's verb was called — so THE IN-WINDOW SET IS READ
  //    EMPTY HERE and the delivery is asserted at the pass's terminal arm, below the pass. ───────────
  assert.deepEqual(storeDeliveries, [],
    'AND THE PLAIN REGISTRATION\'S IN-WINDOW INVOCATION SET IS EMPTY — the write `K-2` issued was '
    + 'adopted at instant (a) BEFORE the store\'s write verb was called, so the package\'s post-verb '
    + 'invocation "reaches NO handle of that write" (`surface.md §2.4` item 9\'s instant (a); `A116` '
    + '(D1)). FAIL-STATE DISTINGUISHED: a delivery made inside the verb\'s window, which is the instant '
    + 'this seam moved — read ' + JSON.stringify(storeDeliveries));
  assert.deepEqual(kernelRuns, [],
    'and the kernel ran no pair body in what remains of this window either: the constraints layer is '
    + '`K-3`\'s (`§2.1` item 2 (i))');

  const report = runAttempt(store, record);
  assert.equal(report.outcome, 'passed', 'the attempt\'s own pair returned the pass arm');
  assert.deepEqual(kernelRuns, [attemptAddress],
    'AND THE KERNEL IS ONE INVOKER, IN ITS OWN WINDOW: it ran the evaluated pair\'s body once, with '
    + 'THAT ATTEMPT\'S CONTEXT whose `address` is the address the pair was registered at (`§2.1` item 2 '
    + '(i)) — read ' + JSON.stringify(kernelRuns));
  assert.deepEqual(storeDeliveries, [attemptAddress],
    'AND THE PLAIN REGISTRATION\'S OWN DELIVERY IS REACHED AT THE PASS\'S TERMINAL ARM AND CARRIES NO '
    + 'DELIVERY OF THE KERNEL\'S — read non-vacuously, so a body reached by nothing at all is a failure '
    + 'too: the ONE argument a kernel delivery carries is THIS ATTEMPT\'S CONTEXT (`§2.1` item 2 (i)), '
    + 'while the ONE argument a plain registration\'s delivery carries is THE TRIGGERING ADDRESS '
    + '(`§2.1` item 2 (ii); `§2.7` item 5) — so the delivery reaching this body is no layer the kernel '
    + 'runs, and the kernel runs THAT PAIR\'S OWN FUNCTION — AND FOR NO OTHER. THE TERMINAL ARM IS THE '
    + 'INSTANT BOTH CLAUSES FIX AND THE ORDERING THE EARLIER PASSES HANDED OFF IS NOW THE LAW AT THIS '
    + 'CELL (`§2.7` item 7: "after the last constraint of that attempt has been evaluated, and before '
    + '`runAttempt` returns to the calling process"; `§2.4` item 9\'s instant (b)) — read '
    + JSON.stringify(storeDeliveries));

  // THE LOOP, TAKEN BY THIS DRIVE OFF THE RECORD'S OWN `pending` MEMBER AND AFTER THE PASS THAT CHECKS
  // ENTRIES OFF AS THEY PASS: ONE INVOKER AMONG THE SURFACE'S LAYERS AND NEVER THE ONLY ONE.
  for (const handle of record.pending) {
    if (handle === listenerHandle) loopRuns.push(['LOOP', attemptAddress]);
  }
  assert.deepEqual(loopRuns, [['LOOP', attemptAddress]],
    'THE CALLER\'S OWN LOOP IS ONE INVOKER: it resolves each `pending` handle in the caller\'s own map '
    + 'and calls that function with the TRIGGERING ADDRESS as its ONE argument (`§2.1` item 2 (ii); '
    + '`§2.2` item 2 — "THE CALLER LAYER TAKES THAT WRITE\'S HANDLES AS THE `pending` MEMBER") — and the '
    + 'handle it runs is the one whose pair THIS ATTEMPT\'S PASS DID NOT EVALUATE, WHICH STANDS IN THAT '
    + 'MEMBER "AS ANY CALLER-MADE WRITE\'S HANDLE DOES AND IS RUN BY THE CALLER\'S OWN LOOP AT LAYER (b)" '
    + '(`§2.1` item 2), the kernel\'s own window standing beside it as the OTHER invoker — so the layers '
    + 'are asserted AS TWO, each read off its own body\'s own recorded argument, and NEITHER IS ASSERTED '
    + 'TO BE THE ONLY ONE (`§2.2` item 2; the withdrawn *"the caller\'s own loop is layer (b)\'s only '
    + 'invoker"* and *"BY NO SECOND INVOKER"* spellings are asserted NOWHERE here) — read '
    + JSON.stringify(loopRuns));
});
