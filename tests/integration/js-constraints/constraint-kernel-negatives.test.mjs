// RED SET — `U-STOREROOM-CONSTRAINTS`, THE NEGATIVE GENERATORS `P-NEG-14` … `P-NEG-20` AND `P-NEG-22`
// (the gate-4 closure verification's SECOND red set; `P-NEG-21`, the register's own closure, stands
// beside the budget cell it reads, `constraint-kernel-properties.test.mjs`, because it reads that
// file's own `ROW_CELLS`).
//
// EVERY CELL HERE TESTS A DECLARED RULE AND CITES IT BESIDE THE ASSERTION. NOTHING HERE IS DRIVEN
// THROUGH THE REGISTER'S `row()` HARNESS: these are HAND-BUILT NEGATIVE DRIVES, so the register's own
// census — the `row()` cell count `21`, the `21 x 19 = 399 <= 400` budget arithmetic, the `27` declared
// strategy ids and their `24 + 3` closure — MOVES NOT ONE TERM.
//
// THE FIXTURE RULE IS THE UNIT'S (`kernel-surface.md §1` item 1, cited and not re-declared): every
// store here is the package's own `storeCreate(cfg)` through the shared helper, and no drive reaches a
// store another way.
//
// ── THE EIGHT CELLS, ONE LINE EACH, WITH THE CLAUSE EACH IS DERIVED FROM ─────────────────────────
//   `P-NEG-14` THE DISCRIMINATOR IS THE SET, NEVER THE AUTHOR: the ancestor plain listener's handle —
//        which THIS write's own returned set carries but which the pass never evaluates — LEAVES
//        `pending` on the failing `K-3` arm BY THE DISCARD, because "THE DISCARD ACTS ON THAT WRITE'S
//        OWN RETURNED SET AND REACHES EVERY HANDLE OF IT" (`A: docs/decisions.md` · `A112`;
//        `attempt-lifecycle.md §2.4` item 8 (i) (5); `§3` item 8), and STANDS on the passing arm, where
//        nothing is discarded — `kernel-surface.md §2.1` item 2's discarded-set clause. **RE-DERIVED
//        FROM THE BY-SET LAW: this cell ONCE asserted the ancestor handle STANDING after the failing
//        arm by reading it as ANOTHER write's — the premise `kernel-surface.md §2.1` item 2 WITHDRAWS
//        (the registration's AUTHOR is no discriminator; the set a handle came back in is).**
//   `P-NEG-15` a pair registered MID-PASS joins no pass: `checkIds == ['a']`, `b` ran zero times, the
//        attempt `passed` — `attempt-lifecycle.md §2.4` item 5 (iv)'s no-exclusion clause read with
//        `CX-12`.
//   `P-NEG-16` the outside form decides AT THE FIRST violating pair, whatever its form: `KC-3`,
//        `checkIds == ['a']`, `b`'s body never ran — `attempt-lifecycle.md §2.4` items 4 (c) and 5 (ii).
//   `P-NEG-17` `repair-run`'s `opId` on arm `(d)` is THE OP IT WAS INVOKED FOR, on both arms —
//        `kernel-surface.md §2.5` item 1's kind table.
//   `P-NEG-18` a repair naming an op landed BEFORE the attempt credits nothing: `KC-4`,
//        `report.ops.length == 1` — `parameter-semantics.md §2.7`; `attempt-lifecycle.md §2.4`
//        item 4's arm `(d)`.
//   `P-NEG-19` a `CommitRecord` from ANOTHER instance is refused `KC-2` and eats nothing —
//        `kernel-surface.md §2.1` item 3's `RD-9` clause (READING WRITTEN, printed below).
//   `P-NEG-20` a constraint body that throws over a COMPACTED base: the ONE `outcome` entry carries
//        `KC-8` — `composition-and-states.md §2.6` item 6 (a)'s ruling.
//   `P-NEG-22` a DELETE-shaped repair THAT RETURNS NO OP reaches arm `(d)`/`KC-4` — `parameter-semantics.md`
//        §2.7's one carrier (`PAR-C-7`; `A110`), RE-DERIVED 2026-10-27 because `D-43` item 3 put `op` on the
//        delete's own record (the shape this cell asserts inverted with it; the arm did not).

import test from 'node:test';
import assert from 'node:assert/strict';

// ⟶ RESHAPED: the package namespace carries ONE name (`surface.md §2.9` item 1's `A127` clause; `11 → 1`).

import {
  kernel, makeStore, tag, KC,
  assertKernelForm, assertAttemptReport, assertSeqIncreasesFromOne,
  capture, entries, checkIds, countingListener, noop,
  passAtRegistration, atLandingOnly,
  listenAndRegister, carriesHandle, setHandles, setAddresses,
  handedLog, assertRetainedRecord, } from './constraint-kernel-helpers.mjs';

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-14` — THE DISCARD'S DISCRIMINATOR IS THE SET A HANDLE CAME BACK IN, NEVER THE ANCESTRY
// OF ITS REGISTRATION: THE SAME ANCESTOR HANDLE LEAVES ON THE FAILING ARM AND STANDS ON THE PASSING ONE
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE, AT ITS ONE HOME (`attempt-lifecycle.md §2.4` item 8 (i) (5)): **where a caller-made write
 * failed the registered constraints at its landing and could not be repaired, its composition is rolled
 * back to the attempt's last valid state and the triggered set THAT WRITE RETURNED IS DISCARDED WHOLE —
 * no handle in it is delivered by either layer, and a body already run is never un-run, so the discard
 * reaches only the triggers not yet invoked.** Read with `kernel-surface.md §2.1` item 2's discarded-set
 * clause AT ITS `A112` RECONCILIATION: **the discard reaches THE FAILED WRITE'S OWN RETURNED SET and
 * nothing beside it — `WHOLE` READS THE SET THAT WRITE RETURNED, hand by hand, and NEVER the
 * registration's ancestry or its author** — so `triggered` then stands as the store's own returned set,
 * every handle OF THAT WRITE leaves the member by that DISCARD, and the ONE entry that stands is one of
 * ANOTHER WRITE — a handle no returned record of this attempt carried at all. The blanket-clear sentence
 * this head once quoted (*"so `triggered` then stands as the store's own returned set while `pending` is
 * `[]`"*) is the SECOND, UNLAWFUL REMOVAL, WITHDRAWN BY NAME at that clause and at `attempt-lifecycle.md
 * §3` item 8; and the `SIFT` clause at `kernel-surface.md §2.1` item 2 names FILTERING BY THE WRITE'S
 * AUTHOR unlawful beside it.
 *
 * THE DRIVE'S OWN MEMBER, AND THE PREMISE THIS CELL WAS RE-DERIVED FOR: an ANCESTOR plain listener's
 * handle — a registration at a PROPER PREFIX of the attempt's address, which the STORE'S OWN trigger
 * selection returns FOR THIS WRITE and which NO pass of this attempt evaluates, the pass being
 * ADDRESS-SCOPED (`kernel-surface.md §2.3` item 1; `§2.1` item 2). **THAT HANDLE IS A MEMBER OF THE
 * FAILED WRITE'S OWN RETURNED SET — `record.triggered` carries it, asserted below at the arm — SO THE
 * DISCARD REACHES IT AND IT LEAVES `pending`, exactly as the attempt-address entry beside it does.** The
 * premise this cell previously rested on — that the handle STANDS because it is *"the ANCESTOR write's
 * own returned handle"* which the failed write *"does NOT OWN"* — IS THE READING THE BY-SET LAW
 * WITHDRAWS: `A112` fixes the discriminator as THE SET A HANDLE CAME BACK IN and the `SIFT` clause names
 * filtering by the write's author unlawful, so a handle this write returned leaves with this write's set
 * whatever the ancestry of its registration.
 *
 * THE SURVIVOR READING IS RECORDED HERE AS THE FINDING IT IS, AND IS NOT ASSERTED: `attempt-lifecycle.md
 * §3` item 8's other half — *"AN ENTRY FOR A HANDLE OF ANY OTHER WRITE STANDS"* — **HAS NO REACHABLE
 * DRIVE IN THIS UNIT'S FIXTURES.** A handle reaches `pending` only by being returned for a write, and on
 * this surface the only returned record is `K-2`'s own, whose set every entry of `pending` came back in;
 * a kernel-made write's set is carried by no returned record (`kernel-surface.md §2.1` item 2's two
 * further sources (i)/(ii), declared there as NOT READABLE OFF THIS SURFACE'S OWN RECORD). The sibling
 * pass recorded the same finding at `constraint-kernel-deltamodel.test.mjs:640`–`652`, where the
 * surviving entry is read as the PREFIX handle of the SAME write's returned set and NOT as another
 * write's. So this cell reads the survivor half ONLY at the one instant it is observable — the PASSING
 * arm below, where no discard runs and the same ancestor handle stands for a reason the law gives it:
 * `attempt-lifecycle.md §3` item 8 — *"a passing arm's `pending` as `triggered` MINUS the evaluated
 * pairs' checked-off entries"* — and NOT as another write's standing entry.
 *
 * STATES ENUMERATED FIRST: (1) the record as `K-2` returns it — the ancestor's handle stands in
 * `pending` because the member IS the whole returned set at that instant, no pass having run
 * (`attempt-lifecycle.md §3` item 10); (2) THE FAILING ARM — `x` registers no repair, the attempt fails
 * `KC-3`, its write is rolled back and THAT WRITE'S OWN RETURNED HANDLES ARE DISCARDED, the ancestor
 * handle among them (it is IN that set), while `triggered` stands verbatim; (3) THE PASSING ARM WHOSE
 * CHECKPOINT IS NON-NULL — `x`'s repair lands and the re-run's landing evaluation passes at that op
 * (`composition-and-states.md §2.6` item 8 (i)–(ii)); no discard reaches a passing attempt, so the
 * attempt-address entry leaves by ITS OWN pass's check-off alone and the ancestor handle STANDS.
 *
 * ▸ THE STORE'S OWN DELIVERY IS NOT A LAYER OF THIS UNIT AND IS NOT COUNTED AS ONE: a plain registration
 * at an ancestor address is invoked by the STORE ITSELF on every write beneath it, on both arms, and no
 * clause of this part reaches that delivery (`A: docs/specs/storeroom-js/surface.md §2.4` item 7). The
 * count is therefore read as a POSITIVE CONTROL that the registration is live, and the discard is read
 * where the clauses read it — off the record's own `pending` member, the member the caller's own loop
 * reads its work off and the ONE INVOKER it is among the JS surface's ordered layers (`A:
 * docs/decisions.md` · `A112`).
 *
 * AND THE PASSING ARM OWES THE DISCRIMINATOR ITSELF: the SAME ancestor handle, in the SAME relation to
 * this write's returned set, STANDS on the passing arm — so the removal observed on the failing arm is
 * the DISCARD's own act and never a general rule about ancestor registrations, and the arm's own member
 * is read as the SET RELATION (`triggered` against `pending`) rather than as a count.
 *
 * FAIL STATES: a `pending` member still carrying a handle OF THE FAILED WRITE'S OWN RETURNED SET after
 * the failing arm — the prefix handle included — which is the SECOND DELIVERY the caller's loop would
 * make off that member (the defect this cell exists for, read at
 * `constraint-kernel-deltamodel.test.mjs`'s `ck_neg_dm_05_*`); a failing arm that removes an entry the
 * failed write did NOT return (the second, unlawful removal — a whole-member clear or a discard widened
 * to another write's entry); a passing attempt that empties `pending` for a set the attempt never rolled
 * back, i.e. a subtraction taken beside the evaluated pairs' own check-offs (the `SIFT`).
 *
 * ▸ AND ONE READING OF ONE MEMBER IS REPORTED AND NOT ASSERTED HERE: `composition-and-states.md §2.7`
 * item 4b's own sentence — *"a write that failed the registered constraints and was rolled back leaves
 * its set in `triggered` and in `pending` NEVER"* — read literally would empty `triggered` too, while
 * `kernel-surface.md §2.1` item 2 prints the SAME state as *"`triggered` then stands as the store's own
 * returned set"*. This cell therefore reads `pending` alone, the member both clauses agree is `[]` of
 * that write's own handles.
 */
test('ck_p_neg_14_the_discard_reaches_a_handle_by_the_set_it_came_back_in_and_not_by_the_ancestry_of_its_registration', async () => {
  const { register, commit, runAttempt, report } = await kernel();

  // ── ARM 2 FIRST — THE PASSING ARM, WHERE THE SAME ANCESTOR HANDLE STANDS FOR THE REASON THE LAW
  // GIVES A PASSING ARM (`§3` item 8), and where the attempt-address entry leaves by ITS OWN pass's
  // check-off alone — so the two arms' own addresses and handles never meet ───────────────────────
  {
    const store = makeStore({ journalLength: 16 });
    const ancestor = [tag('n14p')];
    const address = [ancestor[0], 'c'];
    store.write(ancestor, 'mem', { seed: 'the ancestor home entry stands' });
    const plain = countingListener();
    const handlePlain = listenAndRegister(store, ancestor, plain);
    let landed = null;
    let evaluations = 0;
    // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1 — AND `3-bis` MAKES IT MANDATORY: this body carries a
    // `repair`, so an unshielded registration ATTEMPTS it and consumes `evaluations === 1`, which is the
    // checkpoint evidence this cell reads at the attempt's SECOND op.
    const handleX = register(store, address, 'x', passAtRegistration(() => {
      evaluations += 1;
      if (evaluations === 1) {
        return {
          // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6; `PAR-C-7`):
          // the repair's own write JOINS the commit it is part of — `rctx` IS that record.
          repair: (rctx) => {
            landed = store.write(address, 'mem', 'fixed', rctx).op;
            return { ok: true, message: 'x was repaired at the attempt\'s own address', op: landed };
          },
          message: 'x is invalid on the committed value',
        };
      }
      return true;
    }));
    const record = commit(store, address, 'mem', 'broken');
    assert.equal(carriesHandle(record.triggered, handlePlain), true,
      'THE SAME ANCESTOR HANDLE IS A MEMBER OF THIS WRITE\'S RETURNED SET — the registration stands at a '
      + 'PROPER PREFIX of the attempt\'s address, so the store\'s own descendant-inclusive prefix test '
      + 'returns it FOR THIS WRITE (`kernel-surface.md §2.1` item 2) — and THE PASSING ARM THEREFORE OWES '
      + 'IT A READING FOR A REASON THE FAILING ARM DOES NOT: here nothing is discarded, so it stands in '
      + '`pending` because no removal reaches it, and NOT because it is another write\'s');
    assert.equal(carriesHandle(record.triggered, handleX), true,
      'and the attempt-address pair\'s own handle is a member of that same returned set — read '
      + JSON.stringify(record.triggered.map(String)));
    assert.deepEqual(record.pending.slice(), record.triggered.slice(),
      'AND AT `K-2`\'S RETURN THE MEMBER IS THE WHOLE RETURNED SET, ENTRY FOR ENTRY — both handles above '
      + 'standing in `pending` before any pass has run (`attempt-lifecycle.md §3` item 10; '
      + '`kernel-surface.md §2.1` item 2) — read ' + JSON.stringify(record.pending.map(String)));
    const done = runAttempt(store, record);
    assertAttemptReport(done, 'P-NEG-14 passing arm');
    assert.equal(done.outcome, 'passed', 'the attempt resolves on the pass arm: the repair landed and the '
      + 're-run evaluated the pair at the repair\'s own op, where it passed');
    const closed = report(store, record.attempt);
    assert.equal(landed !== null && typeof landed.opId === 'string', true,
      'the repair\'s own edit landed an op through the caller\'s own verb');
    // **⟶ `D-58`: THE LIST IS THE HANDED-OFF ONE — the record `K-3` returned on this passing arm.**
    const atTheLanding = entries(done.log, 'constraint-check').filter((e) => e.opId === landed.opId);
    assert.equal(atTheLanding.length, 1,
      'THE CHECKPOINT IS NON-NULL, AND THIS IS ITS OWN DECLARED EVIDENCE: the landing at the repair\'s op '
      + 'ran ONE pass over the ONE pair registered at the attempt\'s address, and its `constraint-check` '
      + 'entry stands in the log at that op (`composition-and-states.md §2.6` item 8 (ii) (2): "the '
      + `attempt's log carries a PASS \`constraint-check\` entry for every pair of that scope at that op")`);
    assert.equal(entries(done.log, 'outcome').length, 0,
      'and no evaluation of that op returned a violation, so the landing left every registered pair at '
      + 'the attempt\'s address passing and the member is pinned at that op and NOT at `null` '
      + '(`composition-and-states.md §2.6` item 8 (iii))');
    assert.ok(plain.seen.length >= 1,
      'THE STORE\'S OWN DELIVERY IS NOT ONE OF THIS UNIT\'S TWO LAYERS, AND IT IS NOT COUNTED AS ONE: a '
      + 'plain registration at an ancestor address is invoked by the STORE ITSELF on every write beneath '
      + 'it (`A: docs/specs/storeroom-js/surface.md §2.4` item 7; the layers set\'s '
      + '`ck_layer_b_the_plain_store_listener_carries_the_triggering_address_as_its_one_argument`), so '
      + 'this count is the store\'s — read ' + plain.seen.length + ' — and the DISCARD is read where the '
      + 'clauses read it: off the record\'s own `pending` member');
    assert.equal(carriesHandle(record.pending, handlePlain), true,
      'AND THE ANCESTOR HANDLE STILL STANDS, SO THE REMOVAL OBSERVED ON THE FAILING ARM IS THE DISCARD\'S '
      + 'OWN ACT AND NEVER A RULE ABOUT ANCESTOR REGISTRATIONS: no discard reaches a passing attempt — the '
      + 'discard rule is the FAILURE arm\'s own (`attempt-lifecycle.md §2.4` item 8 (i) (5)) — and the '
      + 'check-off that empties an entry removes only the entry OF A PAIR THE PASS EVALUATED, this '
      + 'registration\'s pair being at an ancestor address the ADDRESS-SCOPED pass never reaches '
      + '(`kernel-surface.md §2.3` item 1) — read '
      + `pending.length = ${record.pending.length}`);
    // **⟶ RE-DERIVED 2026-10-18: THE COMPARISON IS TAKEN AT THE PAIRS' `handle` MEMBERS ON BOTH SIDES**
    // (`trigger-and-pair.md §4` item 1: *"they compare `entry.handle`, never `entry`"*). The as-filed
    // `record.triggered.filter((h) => h !== handleX)` compared a PAIR to a HANDLE and could subtract
    // nothing — `TF-3`/`TF-4` read from the reader's side. **THE CLAIM IS UNMOVED.**
    assert.deepEqual(setHandles(record.pending).slice().sort(),
      setHandles(record.triggered).filter((h) => h !== handleX).slice().sort(),
      'AND THE ARM RULES THE TWO ENTRIES APART BY WHAT REACHED EACH, AND BY NOTHING ELSE: the member after '
      + 'a passing arm is "`triggered` MINUS the evaluated pairs\' checked-off entries" '
      + '(`attempt-lifecycle.md §3` item 8) — the attempt-address pair\'s own handle leaves BY ITS OWN '
      + 'CHECK-OFF AS IT PASSED (`§2.4` item 8 (i) (5); the same removal asserted at '
      + '`constraint-kernel-deltamodel.test.mjs`\'s `ck_neg_dm_06_*`) and the ancestor handle leaves by '
      + 'nothing and stands, WHILE ON THE FAILING ARM THAT SAME ANCESTOR HANDLE LEAVES BY THE DISCARD. '
      + 'FAIL-STATE DISTINGUISHED: a passing arm that subtracted an entry no pass evaluated — the `SIFT` '
      + '`kernel-surface.md §2.1` item 2 declares UNLAWFUL — read `pending` '
      + JSON.stringify(record.pending.map(String)) + ' of `triggered` '
      + JSON.stringify(record.triggered.map(String)));
    assert.equal(carriesHandle(record.triggered, handleX), true,
      'and `triggered` STANDS UNMOVED ON THIS ARM TOO: the check-off reaches the MEMBER and never the '
      + 'store\'s own returned set (`kernel-surface.md §2.1` item 2; `attempt-lifecycle.md §2.4` item 8 (i) '
      + `(5), its comment on the pair\'s own pass) — read triggered.length = ${record.triggered.length}`);
  }

  // ── ARM 1 — THE FAILING ATTEMPT, WHOSE SET IS DISCARDED ─────────────────────────────────────────
  {
    const store = makeStore({ journalLength: 16 });
    const ancestor = [tag('n14f')];
    const address = [ancestor[0], 'c'];
    store.write(ancestor, 'mem', { seed: 'the ancestor home entry stands' });
    const plain = countingListener();
    const handlePlain = listenAndRegister(store, ancestor, plain);
    // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: this body violates at its registration, so it is shielded
    // or the pair is REFUSED there (`ConstraintListInvalid`, state 2) and the failing arm this cell reads is
    // never reached. The body still violates every LANDING — the cell's subject is unmoved.
    register(store, address, 'x', passAtRegistration(() => ({ message: 'x is invalid and registers no repair' })));
    const record = commit(store, address, 'mem', 'v');
    assert.equal(carriesHandle(record.triggered, handlePlain), true,
      'the set the caller\'s own write returned carries the ancestor registration\'s handle — a '
      + 'registration at a PROPER PREFIX of the attempt\'s address, returned FOR THIS WRITE by the store\'s '
      + 'own descendant-inclusive prefix test (`kernel-surface.md §2.1` item 2) — so the discard below has '
      + 'a member to reach, and the membership is read at THE WRITE\'S OWN RETURNED SET and not at the '
      + 'ancestry of the registration');
    assert.equal(carriesHandle(record.pending, handlePlain), true,
      'and it stands in `pending` as `K-2` returns the record: at that instant the member IS the whole '
      + 'returned set, no pass having run (`attempt-lifecycle.md §3` item 10)');
    assert.deepEqual(record.pending.slice(), record.triggered.slice(),
      'AND `pending` CARRIES THE WHOLE SET AT THIS INSTANT, ENTRY FOR ENTRY — the premise the arm below is '
      + 'read against (`kernel-surface.md §2.1` item 2\'s `pending` clause; `attempt-lifecycle.md §3` '
      + `item 10) — read ${JSON.stringify(record.pending.map(String))} of `
      + `${JSON.stringify(record.triggered.map(String))}`);
    const r = capture(() => runAttempt(store, record));
    assert.equal(r.threw, true, 'the attempt fails: `x` registers no repair for its violation');
    assertKernelForm(r.thrown, 'P-NEG-14 failing arm');
    assert.equal(r.thrown.status, KC[3],
      'and the arm it fails on is the first-violation arm `(c)` read with the outside-form rule — here '
      + `\`x\`'s own \`{message}\` arm — read ${JSON.stringify(r.thrown.status)}`);
    assert.equal(plain.seen.length, 0,
      'AND ON THIS ARM THE STORE\'S OWN DELIVERY REACHED THE ANCESTOR REGISTRATION NOWHERE — NEITHER '
      + 'INSIDE THE WRITE\'S WINDOW NOR AT THE TERMINAL ARM: the write is KERNEL-DRIVEN, so instant (a) '
      + 'withheld its in-window invocation before the store\'s verb was called (`surface.md §2.4` item 9; '
      + '`A116` (D1)–(D2); `§2.7` item 7), and the arm then FAILED, so the residue that carries this '
      + 'handle was delivered by nothing — "no handle of that write being invoked by either layer" '
      + '(`attempt-lifecycle.md §2.4` item 8 (i) (5); `§3` item 8). READ THE TWO ARMS APART: the passing '
      + 'arm above reaches this same body ONCE at its terminal arm — read ' + plain.seen.length + ' here; '
      + 'the set the record carries points at a live registration either way, which is why this count is '
      + 'not the membership premise the arm below is read against');
    assert.deepEqual(record.pending.slice(), [],
      'THE DISCARD RULE\'S OWN EXTENT, READ AT `A112` AS RECONCILED: the DISCARD "ACTS ON THAT WRITE\'S '
      + 'OWN RETURNED SET AND REACHES EVERY HANDLE OF IT" (`attempt-lifecycle.md §2.4` item 8 (i) (5); '
      + '`§3` item 8) — and `handlePlain` IS IN THAT SET, which `record.triggered` carries above, so THE '
      + 'DISCARD REACHES IT AND IT LEAVES `pending` beside the attempt-address entry: THE DISCRIMINATOR IS '
      + 'THE SET A HANDLE CAME BACK IN AND NEVER THE ANCESTRY OF ITS REGISTRATION (the `SIFT` clause, '
      + '`kernel-surface.md §2.1` item 2: "filtering by the write\'s author" is UNLAWFUL, and so is any '
      + 'reading that spares an entry because another write registered it). THE PREMISE THIS CELL ONCE '
      + 'RESTED ON — that the ancestor handle STANDS as "the ANCESTOR write\'s own returned handle ... '
      + 'which the failed write does NOT OWN" — IS THE READING THE BY-SET LAW WITHDRAWS: the entry that '
      + 'stands is one of a handle THIS WRITE DID NOT RETURN, and this write returned `handlePlain`. The '
      + 'blanket clear — `record.pending = []` — is the SECOND, UNLAWFUL REMOVAL WITHDRAWN BY NAME at that '
      + 'clause for the OPPOSITE reason: it removes an entry whether or not the failed write returned it, '
      + 'whereas the law removes by THE SET and never by the member (a member with a foreign entry would '
      + 'keep it, which no fixture of this unit can reach). `pending` is the member the caller\'s own loop '
      + 'reads its work off, so an entry left standing here is the SECOND DELIVERY that loop would make '
      + '(`kernel-surface.md §2.1` item 2\'s throwing-arm clause; `A: docs/decisions.md` · `A112`) — read '
      + `pending.length = ${record.pending.length}`);
    assert.deepEqual(record.triggered.filter((h) => carriesHandle(record.pending, h)), [],
      'AND THE READING IS THE SET RELATION OVER EVERY HANDLE OF THAT SET AND NOT A COUNT: no entry of the '
      + 'failed write\'s own returned set survives the arm, WHATEVER THE SIZE OF THE SET — the two handles '
      + 'this fixture produces are read by their own names at the two assertions either side of this one, '
      + 'and this expression is the SAME LAW read over the whole set at once, so a third handle of the set '
      + 'would be caught here as well (`kernel-surface.md §2.4` item 5 (i): "`WHOLE` READS THAT WRITE\'S '
      + 'OWN RETURNED SET, WHOSE EVERY HANDLE IS A NOT-YET-INVOKED TRIGGER WHEN THE ARM TAKES IT") — read '
      + `\`pending\` ${JSON.stringify(record.pending.map(String))} of \`triggered\` `
      + `${JSON.stringify(record.triggered.map(String))}`);
    assert.equal(carriesHandle(record.triggered, handlePlain), true,
      'AND `triggered` STANDS VERBATIM AS THE STORE\'S OWN RETURNED SET THROUGH THE ARM: the clause prints '
      + 'the SAME state as "`triggered` then stands as the store\'s own returned set" — the DISCARD reaches '
      + 'the MEMBER and never the store\'s own answer'
      + ` (\`kernel-surface.md §2.1\` item 2; \`composition-and-states.md §2.7\` item 4b) — read `
      + `triggered.length = ${record.triggered.length}`);
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-15` — A PAIR REGISTERED MID-PASS JOINS NO PASS AND APPENDS NO ENTRY IN IT
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`attempt-lifecycle.md §2.4` item 5 (iv), read with `CX-12`): **a pass's evaluated set is
 * EVERY PAIR STANDING AT THE ATTEMPT'S OWN ADDRESS WHEN THAT PASS BEGINS — a snapshot taken at the
 * pass's start — each evaluated ONCE in clause (ii)'s first-registration order, with NO EXCLUSION and
 * NO SKIP; and a pair registered DURING a pass is carried into the NEXT pass's set and appends NO
 * `constraint-check` entry of the pass it was registered in** (`kernel-surface.md §2.5` item 1's
 * `constraint-check` row: one entry per evaluation, and an evaluation this pass never ran appends none).
 * **The `K-1` that returns DURING a pass is ADMITTED** (`§2.4` item 8 (ii) (c)), so the drive is lawful.
 *
 * STATES ENUMERATED FIRST: (1) pair `a` alone at the pass's start, its body registering pair `b` at the
 * attempt's address MID-PASS and returning the pass arm; (2) the pass's own snapshot — `a` alone, so
 * `checkIds == ['a']` and `b`'s body runs ZERO times in it; (3) the attempt's outcome — `passed`, `b`'s
 * violation being no arm of this attempt; (4) THE POSITIVE CONTROL — the pair DOES stand in the
 * registry, so the next attempt at that address evaluates it (`checkIds == ['a', 'b']`).
 *
 * FAIL STATES: a pass that re-reads its own registry and evaluates the pair it registered mid-pass
 * (`checkIds` carrying `b`, `b`'s body running, and the attempt failing on `b`'s violation); a `K-1`
 * whose mid-pass registration is dropped rather than carried into the registry (the positive control's
 * own fail state).
 */
test('ck_p_neg_15_a_pair_registered_mid_pass_joins_no_pass_and_appends_no_entry_in_it', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('n15')];
  let aRuns = 0;
  let bRuns = 0;
  let bHandle = null;
  // ⟶ `A135` (3) / `§7.3` (b) state 1: THIS CELL'S SUBJECT IS A PAIR REGISTERED *MID-PASS*, so `a`'s own
  // first LANDING evaluation must be the one that registers `b` — unshielded the registration consumes
  // `aRuns === 1` and `b` is registered before the pass, which is the state the cell excludes.
  register(store, address, 'a', atLandingOnly(() => {
    aRuns += 1;
    if (aRuns === 1) {
      bHandle = register(store, address, 'b', passAtRegistration(() => {
        bRuns += 1;
        return { message: 'b is invalid on this value' };
      }));
    }
    return true;
  }));
  const record = commit(store, address, 'mem', 'v');
  const first = capture(() => runAttempt(store, record));
  assert.equal(first.threw, false,
    'THE ATTEMPT RESOLVES ON THE PASS ARM: the pass evaluated the snapshot taken at its start, and the '
    + 'pair registered during it is no arm of this attempt — a kernel that re-read its own registry '
    + 'mid-pass has evaluated `b` inside this pass and failed the attempt on `b`\'s violation — read '
    + (first.threw ? JSON.stringify(first.thrown.status) + ' / ' + JSON.stringify(first.thrown.message)
      : JSON.stringify(first.value.outcome)));
  const done = first.value;
  assert.equal(aRuns, 1, 'the pass evaluated `a` exactly once');
  assert.equal(bHandle !== null && bHandle !== undefined, true,
    'the mid-pass `K-1` was ADMITTED and answered the store\'s own adopted handle for that address '
    + '(`attempt-lifecycle.md §2.4` item 8 (ii) (c); `kernel-surface.md §2.1` item 1)');
  assert.deepEqual(checkIds(done.log), ['a'],
    'THE PASS\'S EVALUATED SET IS THE SNAPSHOT TAKEN WHEN THE PASS BEGAN: `b` was registered during it, so '
    + '`b` appends NO `constraint-check` entry of this pass — read ' + JSON.stringify(checkIds(done.log))
    + ' (`§2.4` item 5 (iv); `CX-12`)');
  assert.equal(bRuns, 0,
    'and `b`\'s body ran ZERO times in that pass — read ' + bRuns
    + '; a pass that evaluated it has re-read its own registry mid-pass');
  assert.equal(done.outcome, 'passed',
    'the attempt resolves on the pass arm: `b`\'s `{message}` violation is no arm of THIS attempt, whose '
    + 'evaluated set is the snapshot — read ' + JSON.stringify(done.outcome));
  assert.equal(entries(done.log, 'outcome').length, 0,
    'and a passing attempt appends no `outcome` entry (`kernel-surface.md §2.5` item 1)');

  // ── THE POSITIVE CONTROL: the pair STANDS, and the NEXT attempt at that address evaluates it ────
  const second = capture(() => runAttempt(store, commit(store, address, 'mem', 'v2')));
  assert.equal(second.threw, true,
    'and the pair the mid-pass `K-1` registered DOES stand in the registry: the next attempt at that '
    + 'address meets it and fails');
  assert.equal(second.thrown.status, KC[3],
    'on the first-violation arm `(c)`, `b` registering no repair — read '
    + JSON.stringify(second.thrown.status));
  assert.deepEqual(checkIds(second.thrown.log), ['a', 'b'],
    'the next pass evaluated BOTH pairs, in first-registration order (`§2.4` item 5 (ii)) — read '
    + JSON.stringify(checkIds(second.thrown.log)));
  assert.equal(bRuns, 1, 'and `b`\'s body has run ONCE in the instance\'s life — in the second pass and '
    + 'in no part of the first');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-16` — THE ARM IS TAKEN AT THE FIRST VIOLATING PAIR, WHATEVER ITS FORM
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`attempt-lifecycle.md §2.4` item 4's arm `(c)` read with item 5 (ii)): **a value OUTSIDE
 * `ConstraintOutcome`'s three declared arms is READ AS the `{message}` arm and never as an arm of its
 * own, so the pair's own `(c)` predicate holds for it exactly as it holds for a `{message}` return; and
 * "the attempt TRANSITIONS at THE FIRST evaluating pair whose outcome is a violation — that pair's own
 * arm decides what happens next", so a LATER pair of the same pass is NOT evaluated** (`§2.4` item 5
 * (iii): *"where two pairs of one pass would violate, the FIRST in clause (ii)'s order decides and THE
 * SECOND IS NOT EVALUATED"*). **The transition is taken at the pair that violated FIRST and never at a
 * later pair's registered repair**, so a pass whose first pair returned an outside form reaches `KC-3`
 * whatever the pairs behind it carry.
 *
 * STATES ENUMERATED FIRST: (1) pair `a`, registered first, returning the OUTSIDE form `undefined` on its
 * first evaluation; (2) pair `b`, registered later, carrying a REPAIR that lands a lawful op; (3) the
 * pass's transition — taken at `a`, so `checkIds == ['a']`, `b`'s body runs ZERO times, its repair runs
 * ZERO times, and the thrown form's status is `KC-3`; (4) the one `outcome` entry, whose `state` is the
 * same `KC-3` token.
 *
 * FAIL STATES: an outside form carried to the end of the pass so that a later pair is evaluated (the
 * defect this cell exists for — `b`'s body running, its repair landing, and the arm becoming the
 * repeat/`KC-5` arm of a re-run); an outside form routed to an arm of its own rather than `(c)`; a
 * second pair evaluated after the transition.
 */
test('ck_p_neg_16_the_outside_form_decides_at_the_first_violating_pair_whatever_its_form', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('n16')];
  let bRuns = 0;
  let bRepairs = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1: `a`'s OUTSIDE FORM is itself a violation (`VA-11`), so both bodies are
  // shielded or each is refused at its own registration (`ConstraintListInvalid`) and the outside form — this
  // cell's subject — is never the pair the pass decides at.
  register(store, address, 'a', passAtRegistration(() => undefined));
  register(store, address, 'b', passAtRegistration(() => {
    bRuns += 1;
    return {
      repair: (rctx) => {
        bRepairs += 1;
        const landed = store.write(address, 'mem', 'fixed', rctx).op;
        return { ok: true, message: 'b was repaired', op: landed };
      },
      message: 'b is invalid on this value',
    };
  }));
  const record = commit(store, address, 'mem', 'v');
  const r = capture(() => runAttempt(store, record));
  assert.equal(bRuns, 0,
    'THE TRANSITION IS TAKEN AT THE FIRST VIOLATING PAIR: `a` returned a value outside the three '
    + 'declared arms, which is READ AS its `{message}` arm and is a violation, so `b` — the SECOND pair '
    + `of the pass — is "NOT EVALUATED" and its body runs ZERO times — read ${bRuns} `
    + '(`attempt-lifecycle.md §2.4` items 4 (c) and 5 (ii)–(iii))');
  assert.equal(bRepairs, 0, 'and its registered repair runs ZERO times — read ' + bRepairs
    + '; a drive that reached it has read the outside form as a form the pass may carry to its end');
  assert.equal(r.threw, true, 'the attempt fails at `a`');
  assertKernelForm(r.thrown, 'P-NEG-16');
  assert.equal(r.thrown.status, KC[3],
    'and the arm is `(c)` — `KC-3` — `a` being not in `ran` before its evaluation and carrying no '
    + 'repair: read ' + JSON.stringify(r.thrown.status) + '; the arm a later pair\'s repair would move '
    + 'the attempt to is the re-run\'s own and not this one');
  assert.deepEqual(checkIds(r.thrown.log), ['a'],
    'and the log carries ONE `constraint-check` entry, `a`\'s — read '
    + JSON.stringify(checkIds(r.thrown.log)));
  const outcomes = entries(r.thrown.log, 'outcome');
  assert.equal(outcomes.length, 1, 'and the closure writes ONE `outcome` entry');
  assert.equal(outcomes[0].state, KC[3],
    'whose `state` is the same `KC-3` token the thrown form\'s `status` carries (`fail-surface.md §1.1` '
    + 'item 1 (c)) — read ' + JSON.stringify(outcomes[0].state));
  assertSeqIncreasesFromOne(r.thrown.log, 'P-NEG-16 log');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-17` — `repair-run`'s `opId` ON ARM `(d)`: THE OP THE ENTRY WAS INVOKED FOR
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`kernel-surface.md §2.5` item 1's kind table, the `repair-run` row): **`repair-run`'s
 * `opId` is "the op the repair produced where it produced one, ELSE THE OP IT WAS INVOKED FOR"** — and on
 * arm `(d)` the repair produces none, so the entry names the op the pair's evaluation carried: the
 * attempt's own first write's op on the pass that reached it (`attempt-lifecycle.md §2.4` item 4's arm
 * `(d)`; item 3's A110 clause, whose seam reads the op off the repair's own return and nowhere else).
 * **The entry is appended BEFORE the arm's terminal act on BOTH of arm `(d)`'s printed forms** (`§2.4`
 * item 8 (i) (2)).
 *
 * STATES ENUMERATED FIRST: (1) arm `(d)` reached through an `{ok: false, message}` return — the repair's
 * own text carried WHOLE into the entry's `message`, the caller receiving the kernel's `KC-4` form;
 * (2) arm `(d)` reached through a repair BODY that THROWS — the caller receiving the body's own throwable
 * unchanged and the closed record's `outcome` entry carrying `KC-4`'s token
 * (`composition-and-states.md §2.7` item 13); (3) on both, the ONE `repair-run` entry of that attempt.
 *
 * FAIL STATES: a `repair-run` entry whose `opId` is `null` on arm `(d)` — the state the assertion this
 * cell replaces tolerated; an entry naming the op the repair produced where it produced none; an entry
 * appended only on the returning arm.
 */
test('ck_p_neg_17_the_repair_run_entry_names_the_op_it_was_invoked_for_on_both_arm_d_arms', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const arms = [];

  // ── ARM 1 — `{ok: false, message}` ──────────────────────────────────────────────────────────────
  {
    const store = makeStore({ journalLength: 16 });
    const address = [tag('n17a')];
    // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` makes it mandatory: unshielded, the registration
    // ATTEMPTS this repair, its `{ok: false}` return fires arm (d) at the registration, and the `repair-run`
    // entry this cell reads is written by the registration and not by the write's attempt.
    register(store, address, 'x', passAtRegistration(() => ({
      repair: () => ({ ok: false, message: 'the repair attempted a rewrite of the value' }),
      message: 'x is invalid on the committed value',
    })));
    const record = commit(store, address, 'mem', 'broken');
    const r = capture(() => runAttempt(store, record));
    assert.equal(r.threw, true, 'arm 1: the attempt fails');
    assertKernelForm(r.thrown, 'P-NEG-17 arm 1');
    assert.equal(r.thrown.status, KC[4], 'arm 1: `KC-4` — read ' + JSON.stringify(r.thrown.status));
    arms.push({
      arm: 'the `{ok: false, message}` arm',
      record,
      log: r.thrown.log,
      carried: 'the repair attempted a rewrite of the value',
    });
  }

  // ── ARM 2 — THE REPAIR BODY THROWS ──────────────────────────────────────────────────────────────
  {
    const store = makeStore({ journalLength: 16 });
    const address = [tag('n17b')];
    const fromTheBody = { fromTheRepairBody: true };
    // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` makes it mandatory: unshielded, the body's throw
    // surfaces out of `register` itself instead of out of the attempt this cell drives.
    register(store, address, 'x', passAtRegistration(() => ({
      repair: () => { throw fromTheBody; },
      message: 'x is invalid on the committed value',
    })));
    const record = commit(store, address, 'mem', 'broken');
    const r = capture(() => runAttempt(store, record));
    assert.equal(r.threw, true, 'arm 2: the attempt ends at the body\'s throw');
    assert.equal(r.thrown, fromTheBody,
      'arm 2: THE BODY\'S OWN THROWABLE reaches the caller UNCHANGED and UNCONVERTED — no kernel form is '
      + 'minted for a body that threw (`composition-and-states.md §2.7` item 13; `PAR-C-6`)');
    const closed = report(store, record.attempt);
    assertRetainedRecord(closed, 'P-NEG-17 arm 2 retained record');
    // **⟶ AND `D-58` TAKES THE LIST OUT OF BOTH HANDS ON THIS ARM**: the store retains none after the
    // handoff and the throwable is the BODY'S own — so the `KC-4` token its outcome entry names is the
    // unreadable half, and this cell says so instead of reporting it from an empty list.
    assert.equal('log' in closed, false, 'the retained record answers no log (`D-58`)');
    assert.equal(closed.outcome, 'failed', 'the retained record answers the ARM');
    assert.deepEqual(handedLog(r.thrown), [], 'and the body\'s throwable carries no list');
    arms.push({ arm: 'the throwing repair body', record, log: null, carried: null });
  }

  for (const { arm, record, log, carried } of arms) {
    // **⟶ `D-58`: THE THROWING-REPAIR ARM'S LIST IS HANDED TO NOBODY — the store keeps none and the body's
    // throwable carries none. THE CELL MEASURES WHAT REMAINS: the pair's own arm below, and the two arms'
    // `repair-run` arithmetic on the arm whose list crosses.**
    if (log === null) {
      // THE ARM WHOSE LIST IS HANDED TO NOBODY: the store retains none (`D-58`) and the throwable is the
      // body's own — so the cell says the `repair-run` arithmetic is unobservable HERE rather than reading
      // its absence from an empty list. The sibling arm measures it, and this arm's own retained record is
      // asserted above.
      continue;
    }
    const runs = entries(log, 'repair-run');
    assert.equal(runs.length, 1,
      `${arm}: the pair's repair ran once and its \`repair-run\` entry IS appended on arm (d) `
      + '(`attempt-lifecycle.md §2.4` item 8 (i) (2))');
    assert.equal(runs[0].opId, record.op.opId,
      `${arm}: the entry's \`opId\` IS "the op the repair produced where it produced one, ELSE THE OP IT `
      + 'WAS INVOKED FOR" — this repair produced none, so the entry names the op the pair\'s evaluation '
      + `carried, the attempt's own first write's op — read ${JSON.stringify(runs[0].opId)} against `
      + `${JSON.stringify(record.op.opId)} (\`kernel-surface.md §2.5\` item 1's \`repair-run\` row)`);
    assert.equal(runs[0].state, null,
      `${arm}: and \`state\` stays \`null\` on this kind — read ${JSON.stringify(runs[0].state)}`);
    assert.equal(runs[0].id, 'x', `${arm}: the entry names the constraint's own bare id`);
    if (carried !== null) {
      assert.equal(runs[0].message, carried,
        `${arm}: and the \`message\` carries the repair's own "what was ATTEMPTED" WHOLE `
        + '(`kernel-surface.md §2.5` item 1\'s message table, the `repair-run` row)');
    }
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-18` — A REPAIR NAMING AN OP LANDED BEFORE THE ATTEMPT CREDITS NOTHING AND IS `KC-4`
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`parameter-semantics.md §2.7`, the seam's ONE home): **`op` IS THE OP THE REPAIR'S OWN
 * EDIT LANDED — the store's own `write` return's value, the ONE channel the kernel reads it off — and
 * "AN `ok === true` RETURN WHOSE `op` IS ABSENT, `undefined`, OR NOT THE OP THE REPAIR ACTUALLY LANDED
 * IS THE APP'S OWN DEFECT AND NOT A KERNEL STATE OF ITS OWN: THE KERNEL CREDITS NO OP, THE ATTEMPT TAKES
 * ARM `(d)` AND FAILS `KC-4`, its `repair-run` entry is appended, and the kernel's own generated
 * sentence NAMES THE UNRECOGNIZED OR UNLANDED `op`"** (`attempt-lifecycle.md §2.4` item 4's arm `(d)`).
 *
 * THE DRIVE'S OWN STATE: an op that landed BEFORE the attempt — a caller-made write at the attempt's own
 * address, so the identity the repair names is a REAL op of the store and of the same address, and the
 * ONLY thing that makes it unlanded is that THE ATTEMPT DID NOT CREATE IT.
 *
 * STATES ENUMERATED FIRST: (1) the pre-attempt write's op, standing in no member of the attempt's `ops`;
 * (2) the repair's own edit, landing ITS OWN op — which the repair does NOT name; (3) the repair's return,
 * naming the PRE-ATTEMPT op; (4) the arm — `(d)`, `KC-4`, the kernel's sentence naming that id;
 * (5) the report's `ops` — the attempt's own first write, and NOT the named op.
 *
 * FAIL STATES: an attempt that CREDITS the foreign op (the defect this cell exists for — `ops` growing to
 * two, the pair entering `appliedRepairs` and the attempt re-evaluating at a landing it never made); an
 * arm other than `(d)`; a kernel sentence that names nothing of the return it refused.
 */
test('ck_p_neg_18_a_repair_naming_a_pre_attempt_op_credits_nothing_and_is_KC4', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('n18')];
  // (1) THE FOREIGN OP: a write that landed BEFORE the attempt, at the attempt's own address.
  const before = store.write(address, 'mem', 'before').op;
  let repairedOp = null;
  let evaluations = 0;
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1 — AND `3-bis` MAKES IT MANDATORY: this body carries a
  // `repair`, so an unshielded registration ATTEMPTS it and `repairedOp` is set by a call the drive has not
  // reached — which is exactly what the cell's own next assertion (*"the drive has run no repair yet"*) names.
  register(store, address, 'x', passAtRegistration(() => {
    evaluations += 1;
    if (evaluations === 1) {
      return {
        repair: (rctx) => {
          // (2) THE REPAIR'S OWN EDIT LANDS — and its own op is NOT the one it names below.
          repairedOp = store.write(address, 'mem', 'fixed', rctx).op;
          // (3) THE IDENTITY IT NAMES IS THE PRE-ATTEMPT OP.
          return { ok: true, message: 'x was repaired', op: before };
        },
        message: 'x is invalid on the committed value',
      };
    }
    return true;
  }));
  const record = commit(store, address, 'mem', 'broken');
  assert.equal(repairedOp, null, 'the drive has run no repair yet');
  const r = capture(() => runAttempt(store, record));
  assert.equal(repairedOp !== null && repairedOp.opId !== before.opId, true,
    'the drive\'s own two identities are TWO: the op this repair landed and the op it named are '
    + `different ops — read ${JSON.stringify(repairedOp && repairedOp.opId)} against `
    + `${JSON.stringify(before.opId)}`);
  assert.equal(record.op.opId !== before.opId, true,
    'and the commit\'s own write is a SECOND op at that address, distinct from the pre-attempt op the '
    + 'repair will name — the two identities of this drive are two ops of one store');
  assert.equal(r.threw, true,
    'the repair named an op it did not land — an op the attempt never created — so the attempt fails');
  assertKernelForm(r.thrown, 'P-NEG-18');
  assert.equal(r.thrown.status, KC[4],
    'AND THE ARM IS `(d)`: a return naming an op the repair did not land "is the app\'s own defect ... '
    + 'the kernel credits no op, the attempt takes arm (d) and fails KC-4" — read '
    + JSON.stringify(r.thrown.status) + ' (`parameter-semantics.md §2.7`, its `observable` cell)');
  assert.equal(r.thrown.message.includes(before.opId), true,
    'and the kernel\'s own generated sentence NAMES the unlanded op it refused — read '
    + JSON.stringify(r.thrown.message) + ` for ${JSON.stringify(before.opId)}`);
  const closed = report(store, record.attempt);
  assertRetainedRecord(closed, 'P-NEG-18 retained record');
  assert.equal(closed.ops.length, 1,
    'AND NO FOREIGN LANDING IS CREDITED: `ops` carries the ONE op the attempt itself created — read '
    + `\`ops.length\` = ${closed.ops.length}; the arm-(d) proof must exclude a landing this attempt never `
    + 'made, and a credit is what would move the pair into `appliedRepairs` and the attempt into a '
    + 're-evaluation at an op of the attempt\'s own past');
  assert.equal(closed.ops[0].opId, record.op.opId,
    'and that one op is the op the commit record carries — read '
    + JSON.stringify(closed.ops[0].opId) + ' against ' + JSON.stringify(record.op.opId));
  assert.equal(closed.ops.some((o) => o.opId === before.opId), false,
    'the pre-attempt op stands in NO member of `ops`, in no order and under no spelling');
  // **⟶ AND THE LIST IS THE THROWN FORM'S OWN FROM 2026-10-28 (`D-58`): the store retains none of it.**
  assert.equal(entries(handedLog(r.thrown), 'outcome')[0].state, KC[4],
    'and the handed-off record\'s ONE `outcome` entry carries the same `KC-4` token the thrown form does');
  assert.equal(entries(handedLog(r.thrown), 'repair-run').length, 1,
    'and its `repair-run` entry was appended, as arm (d) owes');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-19` — A `CommitRecord` FROM ANOTHER INSTANCE: REFUSED `KC-2`, AND NOTHING IS EATEN
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`kernel-surface.md §2.1` item 3's `RD-9` clause): **a `K-3` whose `CommitRecord.attempt`
 * names a CLOSED attempt — one its own terminal arm already disposed of, so the kernel's registry holds
 * no attempt for it — OR AN UNKNOWN attempt is REFUSED WITH `KC-2` (`ConstraintArgRefused`), and NOT with
 * `KC-7`; NO STATE MOVES AND NO ENTRY IS APPENDED.** **And `§2.1` item 4's unconstrained-argument clause —
 * "for `K-4` and `K-5` the argument is NEITHER VALIDATED NOR READ" — is declared for THE TWO READERS
 * ALONE and is not extended to `K-3`, whose first position IS read: the kernel reaches the store through
 * it** (cited, neither re-derived nor widened here).
 *
 * ▸ THE READING THIS CELL IS WRITTEN AGAINST, NAMED BECAUSE THE SPEC WRITER HAS NOT RULED THE
 * FOREIGN-INSTANCE `K-3` BY NAME AND BOTH READINGS STAND: **(a) WRITTEN HERE** — the record names an
 * attempt THE KERNEL INSTANCE THAT WAS HANDED THE RECORD holds none for (the `AttemptRef` is minted
 * per kernel instance, `attempt-lifecycle.md §2.4` item 1), so the call is the `RD-9` refusal: `KC-2`,
 * no state moved, and the caller's attempt still the caller's to run from its own instance. **(b) NOT
 * ASSERTED** — the run is accepted, so the attempt is consumed and its address is not left `KC-7` for
 * the instance's life. The two readings are MUTUALLY EXCLUSIVE on the fresh-`K-2` observable: reading (a)
 * leaves the attempt OPEN and its address held, reading (b) does not. This cell asserts (a).
 *
 * STATES ENUMERATED FIRST: (1) an OPEN attempt at instance A, its pair passing, its record held by the
 * caller; (2) a SECOND instance B, holding no attempt at all; (3) THE FOREIGN CALL — `runAttempt(B, record
 * of A)`: refused `KC-2`, with NO pass run over the record and no entry appended anywhere; (4) THE
 * CALLER'S OWN RUN — `runAttempt(A, record)` still reaches A's terminal arm, the pair evaluated ONCE and
 * by that run alone; (5) AFTER IT, A's address answers a fresh `K-2`, its registry entry removed by its
 * own terminal act (`§2.4` item 3; `composition-and-states.md §2.7` item 13).
 *
 * FAIL STATES: a foreign record that RUNS the attempt against the other instance (the defect this cell
 * exists for — the attempt eaten, so the caller's own `K-3` then meets `KC-2`, and A's address left
 * `KC-7` for the instance's life because the terminal act freed the WRONG kernel's entry); a refusal
 * carrying `KC-7` or a store member; a refusal that moved the caller's attempt.
 */
test('ck_p_neg_19_a_commit_record_from_another_instance_is_refused_KC2_and_eats_nothing', async () => {
  const { register, commit, runAttempt } = await kernel();
  const storeA = makeStore({ journalLength: 16 });
  const storeB = makeStore({ journalLength: 16 });
  const address = [tag('n19')];
  let runs = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1: `runs` IS THIS CELL'S COUNT OF THE PASS'S OWN RUNS, and its own
  // assertion reads `0` at `K-2`'s return — so the registration's invocation is answered by the shield and
  // not counted (`kernel-surface.md §2.1` item 3: *"`K-2` opens the attempt and evaluates nothing"*).
  register(storeA, address, 'x', atLandingOnly(() => { runs += 1; return true; }));
  const recordA = commit(storeA, address, 'mem', 'v');
  assert.equal(runs, 0, 'no pass has run: `K-2` opens the attempt and evaluates nothing');

  // ── (3) THE FOREIGN CALL ─────────────────────────────────────────────────────────────────────────
  const foreign = capture(() => runAttempt(storeB, recordA));
  assert.equal(foreign.threw, true,
    'READING (a): the record names an attempt the kernel instance handed the record holds none for, so '
    + 'the call is refused — read `threw` = ' + foreign.threw);
  assertKernelForm(foreign.thrown, 'P-NEG-19 foreign K-3');
  assert.equal(foreign.thrown.status, KC[2],
    'and the refusal is `KC-2` (`ConstraintArgRefused`) and never `KC-7`, whose `K-3` site is the '
    + 'RE-ENTRANT call for a LIVE attempt (`kernel-surface.md §2.1` item 3\'s `RD-9` clause) — read '
    + JSON.stringify(foreign.thrown.status));
  assert.equal(runs, 0,
    'AND NO STATE MOVED: no pass ran over the record — read the pair\'s own evaluation count ' + runs
    + '; a foreign run that evaluated the pair has reached instance A\'s attempt through the wrong handle');
  assert.deepEqual(entries(foreign.thrown.log, 'commit'), [],
    'and no entry was appended anywhere: the refusal\'s own log is empty (`RD-9`: "NO STATE MOVES AND NO '
    + 'ENTRY IS APPENDED") — read ' + foreign.thrown.log.length + ' entries');

  // ── (4) THE CALLER'S OWN RUN ─────────────────────────────────────────────────────────────────────
  const own = capture(() => runAttempt(storeA, recordA));
  assert.equal(own.threw, false,
    'AND THE CALLER\'S OWN ATTEMPT IS STILL THE CALLER\'S: `K-3` over its own instance reaches its '
    + 'terminal arm — read `threw` = ' + own.threw
    + '; a `KC-2` here is a foreign call that CONSUMED an attempt it did not own');
  assertAttemptReport(own.value, 'P-NEG-19 the caller\'s own run');
  assert.equal(own.value.outcome, 'passed', 'and its arm is the pass arm — read '
    + JSON.stringify(own.value.outcome));
  assert.equal(runs, 1,
    'the pair was evaluated ONCE in the instance\'s life, by the caller\'s own run and by no foreign one '
    + '— read ' + runs);

  // ── (5) THE ADDRESS IS NOT LEFT `KC-7` FOR THE INSTANCE'S LIFE ───────────────────────────────────
  const after = capture(() => commit(storeA, address, 'mem', 'after'));
  assert.equal(after.threw, false,
    'and store A\'s address is not left `KC-7` for the instance\'s life: the attempt\'s OWN terminal act '
    + 'removed the entry that held it (`attempt-lifecycle.md §2.4` item 3; `composition-and-states.md '
    + '§2.7` item 13) — read `threw` = ' + after.threw
    + (after.threw ? ' with status ' + JSON.stringify(after.thrown.status) : ''));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-20` — A THROWING BODY OVER A COMPACTED BASE: THE ONE `outcome` ENTRY CARRIES `KC-8`
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE (`composition-and-states.md §2.6` item 6 (a), whose own sentence RULES this case once):
 * **"AND WHICH CLAUSE GOVERNS THE ENTRY'S `state` WHERE THE ATTEMPT'S OWN BODY THREW *AND* THE
 * COMPOSITION MET THE FLOOR IS RULED HERE, ONCE ... THE FLOOR GOVERNS — this clause's rule is applied to
 * EVERY path on which the attempt's own composition meets the floor, INCLUDING EACH OF THE TWO
 * BODY-THROW PATHS ... SO ON THE CONSTRAINT-BODY PATH THE ENTRY'S `state` IS `KC-8` AND NOT `null`, that
 * path's `null` arm standing WHERE THE COMPOSITION MEETS NO FLOOR"** — read with item 5 (b)'s guard and
 * with `kernel-surface.md §2.5` item 1's `state` row. **The ruling IS ON DISK at that clause's own
 * bytes; a cell written against `composition-and-states.md §2.7` item 13's `null` alone would be the
 * reading this clause WITHDRAWS by name where the floor is met** (`RE-6`; `RD-7`; `RD-8`; `S7`).
 *
 * **⟶ RE-DERIVED 2026-10-16 (`role_test_writer`) FOR THE TEMPORAL STOP: THE FILED WINDOW NO LONGER
 * REACHES THE FLOOR, AND THE COMPENSATING HALF OF THIS CELL'S SUBJECT MOVED WITH IT.** The filed drive
 * was a journal base compacted under the attempt (`journalLength: 2`, six seeded writes past it) with the
 * attempt's own op lying past it. **Under `M-5` (a) (ii) every seeded entry is OLDER than the attempt's
 * own op and is therefore OUT OF SCOPE**, so `M-6` never examines it and the per-op call RETURNS — measured
 * on this checkout: `failed` steps `0` and a single `{answer: "ok", undoneOps: ["op-7"]}`. The clause that
 * closes the filed window is the spec's own, verbatim: *"an entry OLDER than the named op that carries
 * `compacted: true` IS IN NO ROLLBACK OVER THAT OP AND CANNOT FAIL ONE"* (`write-and-read.md §6.4` item 2's
 * dated neighbour of 2026-10-16).
 *
 * THE DRIVE THIS CELL NOW RUNS, AND WHY IT IS THE ONE THE CLAUSES NAME: the compacted entry must be
 * TEMPORALLY IN SCOPE for the call that meets it. A two-op failing attempt at ONE address produces that —
 * the FIRST call reverses the newer op and marks it compacted (`M-9`'s residue), and the SECOND call over
 * the still-owed older op has it inside its bounded candidate set — and a constraint body that THROWS
 * reaches the body-throw path this cell reads. **That combination is the exact case `§2.6` item 6 (a) rules
 * once: the CONSTRAINT-body path's entry carries `KC-8` and not `null` where the composition met the floor.**
 *
 * STATES ENUMERATED FIRST: (1) the two ops the attempt creates at one address, the first call's residue
 * standing inside the second call's temporally bounded candidate set; (2) the constraint body's THROW on
 * its evaluation, the body's own throwable reaching the caller; (3) the composition, whose call over the
 * still-owed op meets `RollbackCompacted` — ONE step with `failed: true` and the store's own code in
 * `answer`; (4) THE ONE `outcome` ENTRY, its `state` `KC-8` and its `message` naming the store's own
 * `RollbackCompacted` as the store's answer (`§2.6` item 6 (a)).
 *
 * FAIL STATES: an `outcome` entry left at `null` on this path (the withdrawn reading); a SECOND
 * `outcome` entry appended for the floor; a floor answered by the violation arm's own token; a drive whose
 * compacted entry is OUT OF SCOPE by `seq` (where the floor is not met at all and this cell cannot speak).
 *
 * ▸ AND ONE MEMBER THIS CELL DOES NOT READ, WITH ITS TWO READINGS NAMED BECAUSE THE SPEC IS INTERNALLY
 * INCONSISTENT ON IT AND THE SUPERVISOR OF THIS PASS HAS NOT RULED IT: THE CALLER'S OWN CHANNEL.
 * `composition-and-states.md §2.6` item 6 (b) says the kernel THROWS ITS OWN FORM with `KC-8` carrying
 * the attempt's own log, while `attempt-lifecycle.md §2.4` item 8 (i) says *"what the caller receives
 * where the composition meets the floor on that path: THE BODY'S OWN THROWABLE AND NOTHING ELSE"*. The
 * two cannot both hold on one path, so this cell asserts NOTHING about `r.thrown` and reads the ruled
 * member — the `outcome` entry's `state` — off the closed record `K-5` returns.
 */
test('ck_p_neg_20_a_throwing_body_over_a_compacted_base_leaves_the_one_outcome_entry_at_KC8', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 64 });
  const address = [tag('n20')];
  const fromTheBody = { fromTheConstraintBody: true };
  // ⟶ `A135` (3) / `§7.3` (b): a THROWING body at its registration surfaces AS ITSELF out of `register`
  // (`kernel-surface.md §2.3` item 1's clause of 2026-10-17), so the shield lets the registration stand and
  // the throw reaches the ATTEMPT — which is the body-throw path this cell reads.
  //
  // THE TWO OPS: `y` violates on the committed value and ITS repair lands one op; `x`'s body THROWS on the
  // re-run at that landing. Item 2's list is `[op-2 (y's repair), op-1 (the commit)]`; the first call
  // reverses `op-2` and leaves it compacted, and the second call over `op-1` meets it.
  let y = 0;
  register(store, address, 'y', passAtRegistration((ctx) => {
    y += 1;
    if (y === 1) return { repair: (rctx) => {
      // **⟶ THE FIFTH POSITION, 2026-10-18** (`docs/specs/storeroom-js/surface.md §2.11` clause 6; `PAR-C-7`).
      const landed = store.write(address, 'mem', 'y-fixed', rctx).op;
      return { ok: true, message: 'y was repaired by the op this repair landed', op: landed };
    }, message: 'y is violated by the committed value' };
    return true;
  }));
  register(store, address, 'x', passAtRegistration((ctx) => {
    // **⟶ RE-DERIVED 2026-10-26 (`D-40`, 2026-10-26): THE COMPACTED BASE IS LEFT BY THE CALLER'S OWN ACT
    // INSIDE THE PASS.** `D-40`'s composition is ONE call over the attempt's first op, so the two-call
    // producer of a compacted residue is gone; the body below reaches the store's own `rollback` verb over
    // the op its landing left (`ctx.op`) BEFORE it throws, which puts that compacted entry inside the
    // attempt's floor call's own temporally bounded candidate set — the genuine, in-scope floor arm `M-6`
    // names. The BODY'S OWN THROWABLE still reaches the caller unchanged.
    if (ctx.op !== null && ctx.value === 'y-fixed') store.rollback(ctx.op.opId);
    throw fromTheBody;
  }));
  const record = commit(store, address, 'mem', 'v');
  const r = capture(() => runAttempt(store, record));
  assert.equal(r.threw, true, 'the attempt ends at the body\'s throw');
  const closed = report(store, record.attempt);
  assertRetainedRecord(closed, 'P-NEG-20 retained record');
  assert.equal(closed.outcome, 'failed', 'and its terminal record answers the failed arm — read '
    + JSON.stringify(closed.outcome));
  const failed = closed.rollback.filter((s) => s.failed === true);
  assert.equal(failed.length, 1,
    'THE DRIVE REACHED THE FLOOR: ONE per-op call carries `failed: true` — read ' + failed.length
    + '; where it is 0 the drive did not reach the compacted base and this cell cannot speak');
  const outcomes = entries(handedLog(r.thrown), 'outcome');
  assert.equal(outcomes.length, 1,
    'AND THE ATTEMPT HAS ONE `outcome` ENTRY: the floor "is answered in that same one entry ... and NO '
    + 'SECOND ENTRY IS APPENDED" — read ' + outcomes.length + ' (`§2.6` item 6 (a))');
  assert.equal(outcomes[0].state, KC[8],
    'THE RULED MEMBER: on the CONSTRAINT-body path the entry\'s `state` IS `KC-8` and NOT `null` where the '
    + 'composition met the floor — read ' + JSON.stringify(outcomes[0].state)
    + '; `composition-and-states.md §2.6` item 6 (a) rules this case once and by name, and its `null` arm '
    + 'stands only where the composition meets NO floor');
  assert.equal(outcomes[0].message.includes('RollbackCompacted'), true,
    'and its `message` NAMES the store\'s own `RollbackCompacted` as the STORE\'S answer — read '
    + JSON.stringify(outcomes[0].message) + ' (`§2.6` item 6 (a); `kernel-surface.md §2.5` item 1\'s '
    + 'message table, the `outcome` row)');
  assert.equal(outcomes[0].id, null, 'and the entry names no constraint: its `id` is `null`');
  assert.equal(failed[0].opId, closed.ops[0].opId,
    'AND THE FAILING CALL IS THE ATTEMPT\'S ONE FLOOR CALL, ADDRESSED AT ITS FIRST OP (`D-40`, '
    + '2026-10-26) — read ' + `${JSON.stringify(failed[0].opId)} against ${JSON.stringify(closed.ops[0].opId)}`);
  // **AND THE FLOOR STATE BESIDE THE TOKEN**: `M-6` restores NOTHING where it is met, so the store answers
  // what the caller's own reversal left — the value the attempt's own commit landed.
  let n20Floor;
  try {
    n20Floor = { present: true, value: store.read(address) };
  } catch (refused) {
    n20Floor = { present: false, code: refused.status };
  }
  assert.equal(n20Floor.present, true,
    'AND THE STORE ANSWERS WHAT THE FLOOR LEFT AND NOT A RESTORED STATE (`§2.6` item 6 (c): "NOTHING IS '
    + 'RESTORED") — read ' + JSON.stringify(n20Floor));
  assert.equal(n20Floor.value, 'v',
    'the value the attempt\'s own commit landed, which the caller\'s own reversal restored and the floor '
    + 'then left standing — read ' + JSON.stringify(n20Floor.value));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `P-NEG-22` — A DELETE-SHAPED REPAIR WHOSE *RETURN* CARRIES NO OP REACHES ARM `(d)`: THE SEAM'S ONE
// CARRIER IS THE REPAIR'S OWN RETURN, AND IT IS NOT THE STORE'S DELETE RECORD
// ═══════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE CLAUSE, RE-DERIVED 2026-10-27, BECAUSE THE ONE IT WAS WRITTEN AGAINST HAS MOVED.
 *
 * ▸ WHAT THE CELL ASSERTED BEFORE THIS PASS, AND WHAT MOVED IT. `parameter-semantics.md §2.7`'s
 * `observable` cell read *"a repair whose `delete` REMOVED VERSIONS and whose attempt arm is STILL
 * `KC-4`, because the `DeleteReceipt` carries no op member"* — and that ground is **GONE**: the
 * architect's ruling `D-43` item 3 (`strata/decisions.md`, verbatim: *"Delete should be journaled and
 * reversible"*) puts `op` on the delete's record, the member `write`'s record carries at the same name,
 * so a delete IS nameable and its record DOES carry an identity. **This cell's own head said it
 * "INVERTS to the task's other wording on the day a ruling names a delete op carrier" — that day is
 * this one, and what inverts is the SHAPE it asserts, not the arm.** (Measured, and printed below: the
 * delete's record carries `op` with `kind: "delete"`, its before-state `{present: true, value: "two"}`
 * and a `seq` above the attempt's own.)
 *
 * ▸ WHAT THE CLAUSE STILL SAYS, AND WHY THE ARM IS UNMOVED. **THE KERNEL'S ONE CARRIER IS THE REPAIR'S
 * OWN RETURN** — `kernel-foundations.mjs`'s `landedOp`: *"THE KERNEL READS THE OP THE REPAIR LANDED OFF
 * THE REPAIR'S OWN RETURN AND NOWHERE ELSE … the op it APPENDS to the attempt's `ops` IS
 * `returnValue.op`"* (`PAR-C-7`; `A110`). **A repair that edits by `delete` and returns `{ok: true}` —
 * carrying no `op` of its own — has carried no identity, so the kernel credits nothing, arm `(d)` is
 * taken and `KC-4` answers.** That is exactly what this drive does, and the ruling changes it not at
 * all: **what the ruling changes is that such a repair CAN now carry the op it landed
 * (`return {ok: true, op: store.delete(address).op}`) and be credited.**
 *
 * STATES ENUMERATED FIRST: (1) versions standing at the attempt's address before the attempt; (2) the
 * repair's own `delete`, WHICH LANDS — its record naming the tier the removed versions stood on;
 * (3) the delete's record — FOUR members, `{address, tiers, triggered, op}`, its `op` the delete's own;
 * (4) the repair's RETURN — `{ok: true, message}` and NO `op`, which is the seam's one carrier absent;
 * (5) the arm — `(d)`, `KC-4`, one `repair-run` entry and one `outcome` entry; (6) the report's `ops` —
 * the attempt's own first write alone.
 *
 * FAIL STATES: an arm other than `(d)`; a `repair-run` entry omitted; a delete record that does NOT
 * carry the op it landed (`D-43` item 3); an op credited off a return that carries none.
 */
test('ck_p_neg_22_a_delete_shaped_repair_whose_return_carries_no_op_reaches_arm_d_KC4', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('n22')];
  store.write(address, 'mem', 'one');
  let removed = null;
  let evaluations = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — AND `3-bis` MAKES IT MANDATORY: this body carries a `repair`, so an
  // unshielded registration ATTEMPTS it, `removed` is set before the attempt, and the arm-(d) state this cell
  // reads is spent at the registration.
  register(store, address, 'x', passAtRegistration(() => {
    evaluations += 1;
    if (evaluations === 1) {
      return {
        repair: (rctx) => {
          // THE EDIT LANDS — THE STORE'S OWN `delete` REMOVES THE VERSIONS THE ADDRESS NAMES.
          removed = store.delete(address);
          return { ok: true, message: 'x was repaired by removing the versions at the address' };
        },
        message: 'x is invalid on the committed value',
      };
    }
    return true;
  }));
  const record = commit(store, address, 'mem', 'two');
  const r = capture(() => runAttempt(store, record));
  assert.equal(removed !== null, true,
    'the repair\'s own `delete` RETURNED — a delete at an address that holds no versions is the store\'s '
    + 'own refusal, so a returned record IS the removal having landed');
  assert.deepEqual(Object.keys(removed).sort(), ['address', 'op', 'tiers', 'triggered'],
    'and THE PIVOT OF THIS CELL MOVED WITH THE RULING: the store\'s own delete record carries FOUR members '
    + '— `op` beside the three — read ' + JSON.stringify(Object.keys(removed).sort())
    + ' (`A: bindings/js/index.d.ts`: `DeleteRecord`; `strata/decisions.md` · `D-43` item 3)');
  assert.equal(removed.op === null || typeof removed.op !== 'object', false,
    'A DELETE NOW RETURNS THE OP IT LANDED (`D-43` item 3: *"Delete should be journaled and reversible"*) '
    + '— so the identity a reversal takes is IN THE CALLER\'S HAND — read ' + JSON.stringify(removed.op));
  assert.equal(removed.op.kind, 'delete',
    'and it is the DELETE\'s own journal op, not a write\'s — read ' + JSON.stringify(removed.op.kind));
  assert.equal(typeof removed.op.seq, 'number',
    'carrying the journal\'s own append ordinal, which is the ground `landedOp` compares a repair\'s '
    + 'returned op against (`parameter-semantics.md §2.7`; `§2.8`)');
  assert.deepEqual(removed.tiers, ['mem'],
    'and the record names the tier the removed versions stood on — read ' + JSON.stringify(removed.tiers));
  assert.equal(r.threw, true, 'so the attempt fails');
  assertKernelForm(r.thrown, 'P-NEG-22');
  assert.equal(r.thrown.status, KC[4],
    'AND THE ARM IS `(d)` FOR THE REASON THAT SURVIVES THE RULING: **the repair RETURNED `{ok: true}` and '
    + 'no `op`**, and the kernel credits `returnValue.op` and nothing else (`PAR-C-7`; `A110`) — so a repair '
    + 'whose edit landed by `delete` is credited exactly when it carries `removed.op` home, and here it '
    + 'carried none — read ' + JSON.stringify(r.thrown.status) + ' (`parameter-semantics.md §2.7`)');
  const closed = report(store, record.attempt);
  assertRetainedRecord(closed, 'P-NEG-22 retained record');
  assert.equal(closed.ops.length, 1,
    'and NO OP IS CREDITED for the delete: `ops` carries the ONE op the attempt itself created — read '
    + '`ops.length` = ' + closed.ops.length);
  assert.equal(closed.ops[0].opId, record.op.opId,
    'that one op being the attempt\'s own commit write — read ' + JSON.stringify(closed.ops[0].opId));
  assert.equal(entries(handedLog(r.thrown), 'repair-run').length, 1,
    'and its `repair-run` entry was appended, as arm (d) owes (`attempt-lifecycle.md §2.4` item 8 (i) (2)) '
    + '— read off the record the handoff made (`D-58`), the store retaining none of it');
  assert.equal(entries(handedLog(r.thrown), 'outcome').length, 1, 'and its ONE `outcome` entry stands');
  assert.equal(entries(handedLog(r.thrown), 'outcome')[0].state, KC[4],
    'carrying `KC-4`\'s token — read ' + JSON.stringify(entries(handedLog(r.thrown), 'outcome')[0].state));
});
