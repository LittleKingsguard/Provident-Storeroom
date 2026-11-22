// RED SET — TWO STORE INSTANCES INTERLEAVED AT ONE ADDRESS: THE CELL THE `D-30` DEFECT NEEDED
// AND NO LEG RAN.
//
// ── WHY THIS FILE EXISTS ────────────────────────────────────────────────────────────────────────────────
//
// `strata/decisions.md` · `D-30` (2026-10-24) records a defect that was found by a battery **no leg ran**
// and fixed by hand: the kernel's live and closed attempt records were MODULE-LEVEL `Map`s while the
// per-store record was a `WeakMap`, so **a live attempt in ONE store instance refused a write at that
// address in a DIFFERENT, fresh instance** — against `A137`'s own ruling that *"the registries and the
// journals are independent and a constraint on one store does not refuse a write to the same address on
// another"*. **Nothing in any leg had ever driven two instances against each other.** This file does.
//
// ── WHAT IT DRIVES, AND THROUGH WHICH DECLARED SURFACE ──────────────────────────────────────────────────
//
// Two instances are constructed through the package's ONE declared module export, `storeCreate`
// (`bindings/js/index.mjs`, §2.9 item 1's `A127` clause), and the kernel's declared items are reached
// through the declared kernel module at its declared checkout home (`bindings/js/src/constraint-kernel.mjs`,
// `K-1`–`K-5`). **No source byte is read by this file and no `docs/**` path is opened by it**: every
// expectation below is a declared sentence of the corpus, cited at the cell that asserts it.
//
// THE THREE CELLS, AND THE TWO HALVES THAT KEEP THE SET HONEST:
//
//   1. `two_instances_interleave_at_one_address_without_crossing` — the `D-30` cell proper. An attempt
//      open in `A` may not refuse `B`'s write, `B`'s `K-2` or `B`'s `K-3` at the SAME address, and each
//      instance's own records and registry rows answer only for themselves.
//   2. `the_same_instance_still_refuses_a_second_attempt_at_a_held_address` — **THE HONESTY HALF.** A
//      build that had "fixed" `D-30` by deleting `KC-7` outright would pass cell 1 and fail this one:
//      a second `K-2` at an address held WITHIN one instance is still refused, in each instance
//      independently, and the release is per instance too.
//   3. `registrations_and_handle_identities_do_not_cross_between_instances` — the registry rows and the
//      store-side home entries behind them are each instance's own: `K-6`'s removal in `A` leaves `B`'s
//      registration standing and `B`'s write still triggers it.
//
// **A NOTE ON THE LAYER, STATED SO NO CELL OVERCLAIMS:** this is the `ENVELOPE` layer against the built
// artefact on the checkout. `APP LAYER: NONE` — no Electron process is loaded here and no cell claims one.
//
// **RUN:** `node --test tests/e2e/instance-independence.test.mjs` (from the repository root), or as part
// of the `test` leg, whose glob `tests/**/*.test.mjs` owns this file. It declares no module-scope exit
// arm, so `scripts/greens-chain.mjs` does not discover it as a runner: `node:test` owns its exit code.

import test from 'node:test';
import assert from 'node:assert/strict';

import { storeCreate } from '../../bindings/js/index.mjs';
import * as kernel from '../../bindings/js/src/constraint-kernel.mjs';

// ── the two instances, at the one address every cell below interleaves at ──────────────────────────────
/// **A FRESH, MEM-TIER INSTANCE** — the same four declared keys every consumer uses, with no `filePath`
/// (so the register's tier is `mem` and no filesystem act stands in the drive).
function instance() {
  return storeCreate({ journalLength: 8, listeners: [] });
}

/// The address both instances are driven at. One string segment, so the register needs no seeding and the
/// address is in domain by §1.3's own rule (`crossing.md §1.3`–`§1.4`).
const AT = ['two-instances'];

/// A constraint that always passes, at its registration and at every landing (`PAR-C-5`'s `true` arm).
const passing = () => true;

/// **THE `AttemptRef` A `K-2` ANSWERED WITH**, read off the record and never reconstructed: every reader
/// below takes the ref this ref is (`K-4`/`K-5` take the ref, `K-3` takes the record itself).
function refOf(record) {
  assert.ok(record !== null && typeof record === 'object', '`K-2` answers a `CommitRecord` object');
  assert.ok(record.attempt !== null && typeof record.attempt === 'object',
    'the record carries the attempt reference it was opened under (§2.1 item 2)');
  assert.equal(typeof record.attempt.id, 'string', 'the reference carries a string `id`');
  assert.ok(record.attempt.id.length > 0, 'and it is non-empty (§2.1 item 2)');
  return record.attempt;
}

/// The one throwable a call answered, or `null` where it returned.
function refusalOf(call) {
  try {
    call();
    return null;
  } catch (thrown) {
    return thrown;
  }
}

/// **A REFUSAL IS A PLAIN OBJECT CARRYING `{status, message}`** (`seams-and-lifecycle.md §8.1`), so the
/// token is read off `status` and never off an `Error` subclass's `message`.
function statusOf(call) {
  const thrown = refusalOf(call);
  assert.notEqual(thrown, null, 'the call was expected to refuse and it returned instead');
  assert.ok(thrown !== null && typeof thrown === 'object', 'a refusal is a plain object, never a bare throw');
  assert.equal(typeof thrown.status, 'string', 'and it carries its `status` token');
  return thrown.status;
}

/// The handles a `triggered`/`pending` set carries, in the set's own order — the pair shape is
/// `{handle, address}` (`trigger-and-pair.md §2` item 1) and the handle IS the caller's own string.
function handlesOf(set) {
  assert.ok(Array.isArray(set), 'a triggered/pending member is an array');
  return set.map((pair) => {
    assert.ok(pair !== null && typeof pair === 'object', 'each member is a pair object, not a bare handle');
    return pair.handle;
  });
}

/// The pair ids a closed attempt's log evaluated (`constraint-check` entries, `§2.5` item 1's `LogKind`).
function checkedIdsOf(report) {
  assert.ok(Array.isArray(report.log), 'the report carries the attempt\'s own log');
  return report.log.filter((entry) => entry.kind === 'constraint-check').map((entry) => entry.id);
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 1 — THE `D-30` CELL: TWO INSTANCES INTERLEAVED AT ONE ADDRESS DO NOT CROSS
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THE DEFECT THIS CELL WOULD HAVE CAUGHT, AT ITS OWN BYTES** (`D-30`; `A137`): with `LIVE`/`CLOSED` at
// module scope, `attemptHeldAt` iterated every live attempt and compared ADDRESS ALONE — so `B`'s write
// at `AT` reached `constraintWrite`'s `K-2`, met `A`'s live attempt, and was refused `KC-7` before `B`'s
// store verb was ever called. **The refusal below is therefore driven at BOTH routes the entry has**:
// the bare three-position `write` (which enters `K-2` since 2026-10-18's unconditional routing) and the
// kernel's own `K-2`/`K-3` pair.
//
// **EVERY ASSERTION IS ON THE DECLARED SURFACE, AND EACH ONE IS TWO-SIDED:** that `B` is NOT refused is
// asserted beside `A`'s attempt still standing, so a build that had merely stopped opening attempts
// anywhere cannot pass it.
test('two_instances_interleave_at_one_address_without_crossing', () => {
  const a = instance();
  const b = instance();

  // THE TWO REGISTRATIONS, ONE PER INSTANCE, AT THE SAME ADDRESS. The handle is the caller's own id
  // (`D-23`/`D-24`), so the two strings below deliberately differ and each instance must answer with
  // its OWN pair in `triggered`.
  const handleA = kernel.register(a, AT, 'pair-a', passing);
  const handleB = kernel.register(b, AT, 'pair-b', passing);
  assert.equal(handleA, 'pair-a', '`K-1` answers the caller-spelled handle it adopted (`D-22`/`D-23`)');
  assert.equal(handleB, 'pair-b', 'and the second instance\'s pair answers its own handle');

  // ── THE ATTEMPT OPEN IN `A`, WHICH STAYS OPEN ACROSS EVERY `B` ACT BELOW ─────────────────────────────
  const recordA = kernel.commit(a, AT, 'mem', 1);
  const refA = refOf(recordA);
  // **THE INSTRUMENT THAT SAYS `A`'S ATTEMPT IS REALLY OPEN**: `K-5` over a live attempt is `KC-7`
  // ("which is how a drive reads that the attempt IS live", `kernel-surface.md §2.1` item 5). Without
  // this the cell could pass on a build where `K-2` had silently stopped opening anything.
  assert.equal(statusOf(() => kernel.report(a, refA)), 'KC-7',
    '`A`\'s attempt at the address is LIVE at this instant: `K-5` over an open attempt is KC-7');

  // ── `B`'S ATTEMPT RECORDS ARE ITS OWN: WHILE `B` HOLDS NONE, `A`'S REFERENCE ANSWERS NOTHING ──────────
  // Driven BEFORE `B` has minted any attempt of its own, so the lookup cannot land on an ordinal of
  // `B`'s by coincidence. **`K-3` refuses with `KC-2` AND NAMES THE OTHER INSTANCE**; **`K-4`/`K-5`
  // refuse with `KC-2`**, which is the unknown-reference arm (`kernel-surface.md §2.1` items 4–5).
  // On a module-scope `LIVE` these three answered `A`'s record from `B`: `K-4` RETURNED `A`'s log and
  // `K-5` answered `KC-7` (live), and both are red below.
  assert.equal(statusOf(() => kernel.runAttempt(b, refA)), 'KC-2',
    '`B` holds no open attempt under that reference: `K-3` answers KC-2 before it touches `A`\'s attempt');
  assert.equal(statusOf(() => kernel.log(b, refA)), 'KC-2',
    'and `K-4` answers the unknown-reference arm — never `A`\'s log, which is `A`\'s own record');
  assert.equal(statusOf(() => kernel.report(b, refA)), 'KC-2',
    'and `K-5` answers KC-2 and never KC-7: `A`\'s liveness is not a fact of `B`\'s instance');

  // ── `B`'S BARE WRITE AT THE SAME ADDRESS IS NOT REFUSED ──────────────────────────────────────────────
  // THE DEFECT'S OWN OBSERVABLE. The three-position write is routed through `constraintWrite`'s `K-2`
  // unconditionally (the entry→kernel edge, 2026-10-18), so pre-`D-30` this call threw `KC-7`. It must
  // return, and its `triggered` set must carry `B`'s own handle and `A`'s not at all.
  const writeB = b.write(AT, 'mem', 2);
  assert.ok(writeB !== null && typeof writeB === 'object', '`B`\'s write returns its `WriteRecord`');
  assert.deepEqual(handlesOf(writeB.triggered), ['pair-b'],
    '`B`\'s write triggers `B`\'s own registration and NOT `A`\'s: the registries are independent (A137)');

  // ── `B`'S `K-2` AT THE SAME ADDRESS IS NOT REFUSED ───────────────────────────────────────────────────
  const recordB = kernel.commit(b, AT, 'mem', 3);
  const refB = refOf(recordB);
  assert.notEqual(refB, refA, 'the two instances minted two different attempt references');
  assert.notEqual(refB.id, refA.id,
    '`A`\'s attempt at the same address did not consume `B`\'s ordinal: the attempt counter is the instance\'s '
    + '(D-30: "a new store is a new stack")');

  // ── `B`'S `K-3` RUNS TO COMPLETION WHILE `A`'S ATTEMPT STILL STANDS ──────────────────────────────────
  const reportB = kernel.runAttempt(b, refB);
  assert.equal(reportB.outcome, 'passed', '`B`\'s pass reaches the passing arm');
  assert.deepEqual(checkedIdsOf(reportB), ['pair-b'],
    'and it evaluated `B`\'s registry alone: `A`\'s pair is not in `B`\'s pass');
  assert.equal(statusOf(() => kernel.runAttempt(b, reportB.attempt)), 'KC-2',
    'the closed attempt is disposed of by its own `K-3`: a second run of it is KC-2');

  // ── `A`'S ATTEMPT SURVIVED EVERY ONE OF `B`'S ACTS ───────────────────────────────────────────────────
  assert.equal(statusOf(() => kernel.report(a, refA)), 'KC-7',
    '`B`\'s write, `K-2` and `K-3` moved nothing in `A`: `A`\'s attempt is STILL live at the end of them');

  // ── AND `A`'S OWN `K-3` RUNS ITS OWN PASS, OVER ITS OWN REGISTRY ALONE ───────────────────────────────
  const reportA = kernel.runAttempt(a, refA);
  assert.equal(reportA.outcome, 'passed', '`A`\'s pass reaches the passing arm');
  assert.deepEqual(checkedIdsOf(reportA), ['pair-a'],
    'and it evaluated `A`\'s pair alone: `B`\'s pair is not in `A`\'s pass');
  // THE SETS DO NOT OVERLAP IN EITHER DIRECTION — the one direction each instance's report names and the
  // other's does not is stated at both.
  assert.equal(checkedIdsOf(reportA).includes('pair-b'), false, '`A`\'s log carries no `B` pair');
  assert.equal(checkedIdsOf(reportB).includes('pair-a'), false, 'and `B`\'s log carries no `A` pair');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 2 — THE HONESTY HALF: THE SAME INSTANCE STILL REFUSES A SECOND ATTEMPT AT A HELD ADDRESS
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **A CELL THAT ONLY PROVED INDEPENDENCE WOULD PASS ON A BUILD THAT HAD SIMPLY DELETED THE REFUSAL**
// (`D-30`: *"the `KC-7` refusal stands, a second `K-2` at a held address within one instance is still
// refused"*; `contract.md §2.8` item 7). So both instances open at the SAME address at the SAME time,
// and **each refuses a second attempt of its OWN while admitting the other's** — and `A`'s terminal act
// leaves `B`'s hold standing, which is the release being the instance's own too.
test('the_same_instance_still_refuses_a_second_attempt_at_a_held_address', () => {
  const a = instance();
  const b = instance();
  kernel.register(a, AT, 'pair-a', passing);
  kernel.register(b, AT, 'pair-b', passing);

  // BOTH ADDRESS-HOLDS STAND AT ONCE: this is the state a module-scope registry could not hold.
  const recordA = kernel.commit(a, AT, 'mem', 1);
  const recordB = kernel.commit(b, AT, 'mem', 2);
  const refA = refOf(recordA);
  const refB = refOf(recordB);

  // ── THE REFUSAL, IN EACH INSTANCE, AT THE ADDRESS ITS OWN ATTEMPT HOLDS ─────────────────────────────
  assert.equal(statusOf(() => kernel.commit(a, AT, 'mem', 3)), 'KC-7',
    'a second `K-2` at an address `A` itself holds is refused KC-7 (`contract.md §2.8` item 7)');
  assert.equal(statusOf(() => kernel.commit(b, AT, 'mem', 4)), 'KC-7',
    'and so is a second `K-2` at the address `B` itself holds — the refusal is NOT deleted');
  // THE REFUSAL IS `KC-7` AND NOT A STORE CODE: the kernel reached no verb, so the store minted nothing.
  const refused = refusalOf(() => kernel.commit(a, AT, 'mem', 5));
  assert.equal(refused.status, 'KC-7', 'the token is the kernel\'s own ConstraintAttemptOpen');
  assert.equal(typeof refused.message, 'string', 'and it carries the generated sentence, not the code alone');
  assert.ok(refused.message.includes('already open'), 'naming the held address\'s attempt');

  // ── AND THE HOLD IS STILL THERE AFTER THE REFUSALS ────────────────────────────────────────────────────
  assert.equal(statusOf(() => kernel.report(a, refA)), 'KC-7', '`A`\'s attempt is still live after its refusals');
  assert.equal(statusOf(() => kernel.report(b, refB)), 'KC-7', '`B`\'s attempt is still live after its refusals');

  // ── `A`'S RELEASE IS `A`'S ALONE: IT FREES `A`'S ADDRESS AND LEAVES `B`'S HOLD STANDING ────────────────
  const reportA = kernel.runAttempt(a, refA);
  assert.equal(reportA.outcome, 'passed', '`A`\'s pass closes its own attempt');
  const reopenedA = kernel.commit(a, AT, 'mem', 6);
  assert.equal(typeof refOf(reopenedA).id, 'string',
    'and the address is FREE in `A`: a fresh `K-2` there is ADMITTED (the release is the terminal act\'s)');
  assert.equal(statusOf(() => kernel.commit(b, AT, 'mem', 7)), 'KC-7',
    'while `B`\'s own attempt at the same address is STILL OPEN: `A`\'s terminal act released nothing of `B`\'s');

  // ── `B`\'S OWN PASS CLOSES ITS OWN ATTEMPT ─────────────────────────────────────────────────────────────
  const reportB = kernel.runAttempt(b, refB);
  assert.equal(reportB.outcome, 'passed', '`B`\'s pass reaches the passing arm');
  assert.equal(typeof reportB.attempt.id, 'string', 'and it answers the reference it ran');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 3 — THE REGISTRATIONS AND THE HANDLE IDENTITIES ARE EACH INSTANCE'S OWN
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THE SAME HANDLE STRING IS REGISTERED IN BOTH INSTANCES ON PURPOSE**, so the drive cannot pass on a
// merely-differently-spelled identity: what is asserted is that the kernel's pair row and the store-side
// home entry behind it are each instance's, and that `K-6`'s removal in one moves nothing in the other
// (`contract.md §2.9` items 3–4, 7; `A137`).
test('registrations_and_handle_identities_do_not_cross_between_instances', () => {
  const a = instance();
  const b = instance();

  const handleA = kernel.register(a, AT, 'shared-name', passing);
  const handleB = kernel.register(b, AT, 'shared-name', passing);
  assert.equal(handleA, 'shared-name', 'the id IS the handle (`D-24`)');
  assert.equal(handleB, 'shared-name', 'and the same string is the second instance\'s handle too');

  // BOTH WRITES TRIGGER THEIR OWN INSTANCE'S ENTRY AND NOTHING ELSE — and both are driven while neither
  // holds an attempt, so this is the bare-write path with no kernel pass in the way.
  assert.deepEqual(handlesOf(a.write(AT, 'mem', 1).triggered), ['shared-name'],
    '`A`\'s write triggers `A`\'s entry');
  assert.deepEqual(handlesOf(b.write(AT, 'mem', 2).triggered), ['shared-name'],
    'and `B`\'s write triggers `B`\'s entry — one string, two independent entries');

  // ── THE REMOVAL IN `A` MOVES NOTHING IN `B` ────────────────────────────────────────────────────────────
  assert.equal(kernel.remove(a, { address: AT, id: 'shared-name' }), undefined,
    '`K-6` answers `undefined` (`contract.md §2.9` item 3)');
  assert.deepEqual(handlesOf(a.write(AT, 'mem', 3).triggered), [],
    '`A`\'s home entry is GONE: its write triggers nothing');
  assert.deepEqual(handlesOf(b.write(AT, 'mem', 4).triggered), ['shared-name'],
    'while `B`\'s registration at the same address and under the same handle STANDS: `K-6` reached one instance');

  // ── AND `B`\'S PAIR IS STILL THE ONE ITS OWN PASS EVALUATES ────────────────────────────────────────────
  const reportB = kernel.runAttempt(b, kernel.commit(b, AT, 'mem', 5));
  assert.equal(reportB.outcome, 'passed', '`B`\'s pass runs over a registry `A`\'s removal did not touch');
  assert.deepEqual(checkedIdsOf(reportB), ['shared-name'],
    'and the pair it evaluated is `B`\'s own row under the shared identity');
});
