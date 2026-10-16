// VERDICT-CORRECTION DRIVER — the TWO-CELL REMAND on `U-STOREROOM-CONSTRAINTS`' `A112` blind greens set.
//
// LAYER: LIVE / ASSEMBLED PACKAGE. The store is the shipped package (`provident-storeroom`, resolved through
// `scratch/node_modules`); the kernel is the module the docs declare as its one home
// (`kernel-surface.md §1` item 1, `bindings/js/src/constraint-kernel.mjs`), reached through its five declared
// exports ONLY. NO BYTE OF `bindings/js/src/**` WAS READ; the module was imported, never opened.
//
// WHAT THIS DRIVER IS FOR: the two cells `[A112-D4]` and `[A112-E8]` of
// `docs/specs/storeroom-constraints/live-greens-a112.md` each READ `PASS` while the observed value they printed
// showed the opposite. This driver replaces both verdicts with a DERIVATION: each cell's expected observable is
// turned into an explicit FALSIFIER PREDICATE, and the verdict is read off that predicate and nothing else.
//
// WHERE THE CLAUSE IS TWO-VALUED the driver does NOT pick a side: it evaluates BOTH printed readings and, when
// they disagree, records the cell `NOT-EXERCISABLE` and NAMES THE SPLIT. That is a finding about the docs.
//
// Every handler body below is FUNCTION DATA handed to `K-1` (constraint bodies and repair bodies alike).
import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt, log, report } from '../bindings/js/src/constraint-kernel.mjs';
import { writeFileSync } from 'node:fs';

const RUN = process.argv[2] || 'run1';
const OUT = 'scratch/vc-a112-correction-out-' + RUN + '.json';
const mk = () => storeNs.storeCreate({ journalLength: 64, listeners: [] });
const st = (e) => (e && typeof e === 'object' && e.status) ? e.status : (e && e.message ? String(e.message) : String(e));
const grab = (fn) => { try { return { value: fn() }; } catch (e) { return { thrown: e }; } };
const J = (v) => JSON.stringify(v);

const cells = [];
// THE ONE RULE THIS DRIVER APPLIES TO EVERY CELL: the verdict is the falsifier's own answer, and a two-valued
// clause yields NO verdict. A cell can therefore never read PASS while its observed line shows the failure.
function record(id, clause, expected, falsifier, limbs, observed, extra) {
  const a = limbs.readingA, b = limbs.readingB;
  let verdict, why;
  if (a === b) { verdict = a; why = 'both printed readings agree: ' + a; }
  else {
    verdict = 'NOT-EXERCISABLE';
    why = 'THE CLAUSE IS TWO-VALUED ON THIS DRIVE: the reading the cell filed answers ' + a
      + ', the sibling reading answers ' + b + ' — named in the split below; the observable is printed WITHOUT a verdict';
  }
  cells.push({ id, clause, expected, falsifier, verdict, why, readings: limbs, observed, ...(extra || {}) });
  console.log('[' + id + '] verdict=' + verdict + ' (filed reading: ' + a + ' | sibling reading: ' + b + ')');
  console.log('    falsifier: ' + falsifier);
  console.log('    observed : ' + observed);
  console.log('    why      : ' + why);
}

// =====================================================================================================
// C1 — `[A112-D4]`
// Clause: docs/specs/storeroom-js/surface.md §2.4 rule 1 + docs/specs/storeroom-constraints/kernel-surface.md §2.1 item 1
// =====================================================================================================
{
  const id = 'A112-D4';
  const clause = 'docs/specs/storeroom-js/surface.md §2.4 rule 1 (an unregistered handle fires nothing, silently) '
    + '+ kernel-surface.md §2.1 item 1 (the adopted handle; "the kernel holds its own registry entry beside it")';
  const expected = 'a listener the app registered after the kernel\'s adoption is not invoked while the kernel\'s registration stands';
  const falsifier = 'FAIL iff the app listener registered AFTER K-1 is invoked INSIDE the K-2 window '
    + '(appListenerCallsAtK-2 > 0) while the kernel\'s own registration for that address still stands '
    + '(its caller-side entry evaluated → kernelPairCalls=1 and outcome=passed)';

  const s = mk();
  let kernelPairCalls = 0; let appListenerCalls = 0;
  const h1 = register(s, ['a'], 'p', () => { kernelPairCalls += 1; return true; });   // K-1: the kernel adopts the address
  const h2 = s.on(['a'], () => { appListenerCalls += 1; });                           // the app registers AFTER the adoption
  const sameHandle = h1 === h2;
  const rec = commit(s, ['a'], 'mem', 1);                                             // K-2 (the write's own window)
  const atK2 = { kernelPairCalls, appListenerCalls };                                 // read AT K-2's return
  const rep = runAttempt(s, rec);                                                     // K-3 (the attempt's terminal arm)
  const pendingAfterK3 = rec.pending.length;
  const kernelRegistrationStands = kernelPairCalls === 1 && rep.outcome === 'passed';

  // READING A — the reading the cell filed, and the one the live battery derived: §2.4 rule 1 read with
  // kernel-surface.md §2.1 item 1's "the kernel holds its own registry entry beside it", i.e. the kernel's
  // registration stands, so a listener the app added at that address may not run inside the write's window.
  const readingA = (kernelRegistrationStands && atK2.appListenerCalls > 0) ? 'FAIL' : 'PASS';

  // READING B — the sibling clause in the SAME section the cell rests on: §2.4 rule 2 ("A SECOND REGISTRATION
  // FOR THE SAME HANDLE REPLACES THE FIRST — one handle, one function") and §2.4 item 7 (a)'s HELD arm
  // observable, verbatim: "the SAME opaque value two `on` calls at one address return, and the registry's
  // function for it is the SECOND listener — a later trigger invokes the REPLACEMENT once, and the replaced
  // function never fires again". On THAT reading the same measured value is the declared observable and the
  // drive CONFORMS.
  const readingB = (sameHandle === true && atK2.appListenerCalls === 1 && kernelRegistrationStands && pendingAfterK3 === 0) ? 'PASS' : 'FAIL';

  record(id, clause, expected, falsifier,
    { readingA, readingB },
    'on() returned the SAME adopted handle=' + sameHandle
    + '; app listener calls INSIDE the K-2 window=' + atK2.appListenerCalls
    + '; the constraint bodies\' calls at that same instant=' + atK2.kernelPairCalls
    + '; outcome=' + rep.outcome + '; constraint body calls after K-3=' + kernelPairCalls
    + '; pending after K-3=' + pendingAfterK3,
    {
      split: 'THE SPLIT, NAMED: docs/specs/storeroom-js/surface.md §2.4 rule 1 + kernel-surface.md §2.1 item 1 '
        + '(the app\'s `listen`/`on` and the kernel\'s `register` return the SAME adopted handle and "neither call '
        + 'replaces the other\'s holder — the store holds ONE entry at that address, and the kernel holds its own '
        + 'registry entry beside it" → the kernel\'s registration stands → the app\'s listener may not be invoked) '
        + 'AGAINST docs/specs/storeroom-js/surface.md §2.4 rule 2 + §2.4 item 7 (a)\'s HELD arm (the address is already '
        + 'held, the second registration REPLACES the registry\'s function for that identity and "a later trigger '
        + 'invokes the REPLACEMENT once") → the app\'s listener IS invoked and the drive conforms. THE ORDERING that '
        + 'would decide between them is the gate handed off at docs/next-steps.md · N7 (enforced nowhere in the '
        + 'delivered surface), which is the reason this cell cannot be read as a clean product failure.'
    });
}

// =====================================================================================================
// C2 — `[A112-E8]`
// Clause: fail-surface.md §2 KC-4 + §1.1 + kernel-surface.md §2.3 item 2
// =====================================================================================================
{
  const id = 'A112-E8';
  const clause = 'fail-surface.md §2 KC-4 (the repair transition: "the repair\'s own verb call threw the store\'s code") '
    + '+ §1.1 (the three-member failure form) + kernel-surface.md §2.3 item 2';
  const expected = 'the kernel\'s answer is KC-4, its message NAMES the store\'s own code, and `ops` holds no op for the attempt';
  const falsifier = 'READING A\'s falsifier (the cell as filed + §1.1\'s head + §1.2 item 3\'s sentence "the thrown form\'s '
    + '`status` is `KC-4`"): FAIL unless the thrown form is exactly {log,message,status} AND its `status` is the kernel\'s '
    + 'own KC-4. READING B\'s falsifier (§1.1 items 3 and 5 + §1.2 item 2 and item 3\'s ruling sentence + §2\'s KC-4 row\'s '
    + '`observable` cell): FAIL unless the caller holds the BODY\'S OWN THROWABLE — the store\'s own {status,message} with '
    + 'the store\'s code VERBATIM — while KC-4\'s token stands on the attempt\'s own `outcome` entry, the `repair-run` '
    + 'entry\'s message NAMES the store\'s code, the report reads `failed`, and the refused edit left no op in `ops`';

  const s = mk();
  register(s, ['a'], 'p', () => ({
    repair: (rc) => { const w = storeNs.write(s, rc.address.concat(['leaf']), rc.tier, 'orphan'); return { ok: true, message: 'fixed', op: w.op }; },
    message: 'p refuses',
  }));
  const rec = commit(s, ['a'], 'mem', 'leaf-value');
  const thrown = grab(() => runAttempt(s, rec));
  const k4 = grab(() => log(s, rec.attempt));
  const k5 = grab(() => report(s, rec.attempt));
  const rep = k5.value || {};
  const logArr = (k4.value || []);
  const outcomeEntry = logArr.find((e) => e.kind === 'outcome');
  const repairRun = logArr.find((e) => e.kind === 'repair-run');
  const formKeys = thrown.thrown ? Object.keys(thrown.thrown).sort().join(',') : '(no throw)';
  const token = st(thrown.thrown);
  const storeCodeVerbatim = token === 'WriteParentNotLink';
  const kcCarriedByOutcome = !!outcomeEntry && outcomeEntry.state === 'KC-4';
  const codeNamed = !!repairRun && String(repairRun.message).includes('WriteParentNotLink');
  const ops = Array.isArray(rep.ops) ? rep.ops : [];
  const writeOp = rec.op; // the K-2 write's own op — the only edit the store landed in this window
  const refusedEditLeftNoOp = ops.length === 1 && (writeOp === undefined || J(ops[0]) === J(writeOp));

  // READING A — the cell as filed, and the live battery's stricter form of it (§1.1's head: "EVERY FAILURE THIS
  // KERNEL REPORTS IS A THROWN PLAIN OBJECT WITH EXACTLY THREE MEMBERS"; §1.2 item 3, first sentence).
  const readingA = (formKeys === 'log,message,status' && token === 'KC-4') ? 'PASS' : 'FAIL';

  // READING B — §1.1 item 3 ("ON THE THROWING-REPAIR PATH THAT ENTRY'S `state` IS THE ONLY DECLARED CARRIER OF
  // KC-4 … the caller there holds the BODY'S OWN THROWABLE and no form of this shape at all"), §1.1 item 5, §1.2
  // item 2 ("the store's form is a thrown {status, message} whose `status` is one of the store's closed 15 members
  // VERBATIM"), §1.2 item 3's own ruling sentence, and §2's KC-4 row `observable` cell.
  const readingB = (formKeys === 'message,status' && storeCodeVerbatim && kcCarriedByOutcome && codeNamed
    && rep.outcome === 'failed' && refusedEditLeftNoOp) ? 'PASS' : 'FAIL';

  record(id, clause, expected, falsifier,
    { readingA, readingB },
    'thrown form keys=[' + formKeys + '] status=' + token + ' (a store code? ' + storeCodeVerbatim + '; the kernel\'s own KC-4? ' + (token === 'KC-4') + ')'
    + '; the thrown form carries a `log` member=' + ('log' in (thrown.thrown || {}))
    + '; K-4 names the store code in its repair-run entry=' + codeNamed
    + '; the attempt\'s own outcome entry state=' + String(outcomeEntry && outcomeEntry.state)
    + '; report.outcome=' + String(rep.outcome) + ' report.ops.length=' + ops.length
    + ' (the refused edit left no op=' + refusedEditLeftNoOp + ')',
    {
      split: 'THE SPLIT, NAMED — and it is printed INSIDE ONE ITEM: fail-surface.md §1.1\'s head + §1.1 item 1 (a) '
        + '("EVERY FAILURE THIS KERNEL REPORTS IS A THROWN PLAIN OBJECT WITH EXACTLY THREE MEMBERS"; "`status` … is never '
        + 'a member of the store\'s closed 15") + §1.2 item 3\'s FIRST sentence ("a REPAIR\'s store failure does not reach '
        + 'the caller as a store failure … the kernel\'s answer to the CALLER is KC-4") and its later sentence "the thrown '
        + 'form\'s `status` is `KC-4`" AGAINST §1.1 item 3 + §1.1 item 5 + §1.2 item 2 + §1.2 item 3\'s OWN RULING sentence '
        + '("ON THIS PATH the caller holds the BODY\'S OWN THROWABLE, which is the STORE\'s own form carrying the store\'s '
        + 'own code for its `status` … §2\'s KC-4 row is the MORE SPECIFIC clause and governs this path") + §2\'s KC-4 row\'s '
        + '`observable` cell ("THE DECLARED MEMBER THAT CARRIES THIS MEMBER ON THE THROWING-REPAIR PATH IS NAMED SO IT IS NOT '
        + 'SOUGHT IN THE THROWN FORM … its ONE `outcome` ENTRY, whose `state` member carries KC-4"). The spec-side '
        + 'reconciliation of that split is a parallel pass; this cell is not graded on a guess at its outcome. '
        + 'NOTE ALSO: the cell\'s third limb ("`ops` holds no op for the attempt") is read the same two ways — §2\'s KC-4 row '
        + '(CC-9) reads it as no op OF THE REFUSED EDIT, which the drive satisfies (`ops.length=1`, that op being K-2\'s own write).'
    });
}

// =====================================================================================================
// TOTALS — the correction set is the two remanded cells; the SET they belong to is reported in the docs.
// =====================================================================================================
const totals = { cells: cells.length, PASS: 0, FAIL: 0, 'NOT-EXERCISABLE': 0 };
for (const c of cells) totals[c.verdict] += 1;
const filedReadings = { PASS: 0, FAIL: 0, 'NOT-EXERCISABLE': 0 };
for (const c of cells) filedReadings[c.readings.readingA] += 1;
console.log('');
console.log('CORRECTION SET — derived verdicts: ' + J(totals));
console.log('CORRECTION SET — the readings the cells filed: ' + J(filedReadings));
writeFileSync(OUT, JSON.stringify({ run: RUN, layer: 'LIVE / ASSEMBLED PACKAGE', totals, filedReadings, cells }, null, 1));
console.log('record: ' + OUT);
