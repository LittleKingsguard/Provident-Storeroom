// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// A REPAIR JOINS THE ATTEMPT'S COMMIT; A LISTENER OPENS ITS OWN — `D-46`: the discriminator is THE COMMIT A CALL
// NAMES ON ITS OWN ENTRY, and neither a depth nor an authorship the package infers.
//
// **THE RULING** (`strata/decisions.md` · `D-46`, 2026-10-26, the architect, verbatim):
//   * *"A listener should be operating at the surface and opening a new commit"*
//   * *"A constraint's repair needs to stay as part of the same commit so that it can be tracked as part of the
//     commit process"*
//   * *"The original way of maintaining this was to accept an optional parameter on entry for the commit id, so
//     that a constraint can identify which open commit it is repairing"*
//
// **WHAT EACH CELL PROVES, AND WHAT IT WOULD BE IF THE RULE WERE READ AS A DEPTH.**
//   (1) A REPAIR IS TRACKED INSIDE ITS ATTEMPT — its own write (THREE positions, naming nothing) joins the
//       attempt's commit because **the kernel names that commit when it repairs**, so the returned record's `op`
//       IS the repair's op, the attempt's own `ops` carry it, the `repair-run` entry names it, and
//       `attempt-opened` fires ONCE for the whole write — *"a repair is not a new act"*. **A `2` here is the mark
//       the last pass took, and it is the thing this cell exists to refuse.**
//   (2) THE DISCRIMINATOR IS THE FOURTH POSITION — a `write` that SUPPLIES it JOINS the commit it names (no
//       opening, the count unchanged, no second pass), and a `write` that supplies NONE OPENS (one opening, the
//       count beside the enclosing commit's, its own pass asking its own address). The two arms are driven from
//       ONE constraint body, which is the one caller in the package with **no commit in hand to name**.
//   (3) WHAT THE FOURTH POSITION ACCEPTS, MEASURED — **a RECORD** (an object carrying an own, present `pending`),
//       never an id token, never `null`, never an explicit `undefined`; an ABSENT position is in the domain.
//
// **THE LISTENER'S OWN COMMIT IS NOT RE-DRIVEN HERE, AND THAT IS BY DESIGN**: `tests/e2e/external-commit.test.mjs`
// is `D-45`'s cell and it is the listener's — the descendant window's counts, the outer verb's count unchanged
// across the callback, the pair asked by the listener's own attempt, and the production nesting figure. **This
// pass moves its marker and moves none of its readings**, and that file is green beside this one.
//
// **D-21.** Every cell prints the readings it took at its own `t.diagnostic`; a cell that cannot reach its arm
// asserts the drive's coherence FIRST and says so instead of reporting a verdict.
//
// **D-17.** The expectation is a literal here and the citation is a comment: no `docs/**` path is opened at
// runtime. **The instruments are the declaration's own**: `openCommits` (`state.mjs`'s exported accessor over the
// index the count lives in), the kernel record's `live` map (`kernelFor(store).live`), the `attempt-opened`
// channel (`Symbol.for('provident-storeroom.attempt-opened')`, `§4.2` item 2), which catches an OPENING at its
// own instant rather than inferring one from a later count, and `K-5`'s report (`kernelReport`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { commit as kernelCommit, report as kernelReport } from '../../bindings/js/src/constraint-kernel.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';

/** `PAR-JS-13`: the returned record is `{op, watched, triggered}` — fresh on every call, never a view. */
const WRITE_RECORD_MEMBERS = ['op', 'triggered', 'watched'];
/** **THE COUNT'S OWN OBSERVER** (`§4.2` item 2: *"`observer` is a FUNCTION called once per commit that OPENS
 *  for that store"*) — the same `Symbol.for` key `state.mjs` installs and this drive reads. */
const ATTEMPT_OPENED = Symbol.for('provident-storeroom.attempt-opened');
/** The store's `AddressMalformed`'s sibling at a class position: the ONE `TypeError` a verb throws for an
 *  outside value — `status` ABSENT (`docs/specs/storeroom-js/surface.md §2.5` item 5 (e)). */
const COMMIT_POSITION_MESSAGE = 'the commit position takes an object carrying a `pending` member';

const SEED = 5;      // the state `['a']` is seeded with and the pair ADMITS
const REFUSED = 9;   // the outer write's value — the state the pair REFUSES
const REPAIRED = 11; // the value the repair lands, at the beside address `['z']`

const make = () => storeCreate({ journalLength: 256, listeners: [] });

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The window each arm is taken in, read off the discriminator's OWN two sources. */
const windowOf = (store) => ({ open: openCommits(store), live: kernelFor(store).live.size });

const shapeOf = (caught) => ({
  status: caught !== null && typeof caught === 'object' ? caught.status ?? null : null,
  message: caught !== null && typeof caught === 'object' && typeof caught.message === 'string'
    ? caught.message
    : String(caught),
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (1) A REPAIR IS TRACKED INSIDE ITS ATTEMPT — its op is the attempt's op, and no second commit opens for it
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-46 (1) · A REPAIR IS TRACKED INSIDE ITS ATTEMPT: the repair body\'s write — THREE positions, naming nothing — JOINS the attempt\'s commit because the kernel names it, so the commit\'s own record carries the repair\'s op, the attempt\'s `ops` carry it, and `attempt-opened` fires ONCE for the whole write', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  // **THE PAIR REFUSES THE LANDED VALUE AND OFFERS A REPAIR THAT WRITES AT A BESIDE ADDRESS** — the shape
  // `attempt-lifecycle.md §2.4` item 4 arm `(b)` names, and the one whose op the re-run is judged against.
  const asked = [];
  const facts = [];
  let repairedRecord = null;
  let attemptRef = null;
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'rep' }, (context) => {
    asked.push(context.value);
    if (context.attempt !== null) attemptRef = context.attempt;
    return context.value === REFUSED
      ? {
          message: 'the landed value is not one this pair admits',
          // **THE REPAIR NAMES NOTHING AT ITS OWN ENTRY** — three positions, which is every repair body's
          // spelling that does not pass its context through (`docs/specs/storeroom-js/surface.md §2.11`
          // clause 6). **IT JOINS BY THE KERNEL'S NAME AND NOT BY ITS OWN**, which is the half `D-46` adds.
          repair: () => {
            facts.push(windowOf(store));
            const landed = attempt(() => store.write(['z'], 'mem', REPAIRED));
            assert.equal(landed.ok, true,
              `the repair's own write must land: it caught ${JSON.stringify(shapeOf(landed.caught))}`);
            repairedRecord = landed.value;
            facts.push(windowOf(store));
            return { ok: true, op: landed.value.op };
          },
        }
      : true;
  }));
  let openings = 0;
  const stop = store[ATTEMPT_OPENED](() => { openings += 1; });
  const written = attempt(() => store.write(['a'], 'mem', REFUSED));
  stop();
  const standing = store.read(['a']);
  const repairedStanding = store.read(['z']);
  const reported = attemptRef === null ? null : attempt(() => kernelReport(store, attemptRef));
  const report = reported !== null && reported.ok === true ? reported.value : null;
  const ops = report !== null && Array.isArray(report.ops) ? report.ops : [];
  const repairEntry = report !== null && Array.isArray(report.log)
    ? report.log.filter((entry) => entry.kind === 'repair-run')
    : [];

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(registered.ok, true,
    `the pair must REGISTER (it admits ${SEED} and refuses only ${REFUSED}): the call caught `
      + `${JSON.stringify(shapeOf(registered.caught))}`);
  assert.equal(written.ok, true,
    `the write must COMPLETE — the pair's repair lands a value its own re-run admits: it caught `
      + `${JSON.stringify(shapeOf(written.caught))}`);
  assert.equal(facts.length, 2,
    `the repair body must RUN ONCE and the drive must read the window on both sides of its own write: the drive `
      + `recorded ${JSON.stringify(facts)}`);
  assert.equal(report !== null, true,
    `\`K-5\` must answer the attempt's closed report, or the attempt's own \`ops\` were never read: the drive `
      + `caught ${JSON.stringify(shapeOf(reported !== null && reported.ok === false ? reported.caught : null))}`);

  // ── (a) THE REPAIR'S WRITE JOINED — THE COUNT IS THE ATTEMPT'S OWN, BEFORE AND AFTER IT. ─────
  assert.deepEqual(facts, [{ open: 1, live: 1 }, { open: 1, live: 1 }],
    `**THE REPAIR RUNS INSIDE THE ATTEMPT'S OWN COMMIT AND ITS WRITE JOINS IT**: the count is \`1\` — the write's `
      + `own commit — at the instant the repair is entered AND on the return of the write it makes, with ONE live `
      + `attempt beside it. **A \`2\` HERE IS THE REPAIR OPENING A COMMIT OF ITS OWN, which is what the last pass `
      + `made it do and what \`D-46\` reverses.** THE DRIVE READ ${JSON.stringify(facts)}`);
  assert.equal(openings, 1,
    `**AND NO SECOND COMMIT OPENED FOR IT** — \`attempt-opened\` fires ONCE across the whole write: the caller's `
      + `commit, which the kernel's store leg joined, the pass's scope joined and **the repair joined**. `
      + `*"A repair is not a new act"* (\`D-46\`: *"A constraint's repair needs to stay as part of the same commit `
      + `so that it can be tracked as part of the commit process"*). The observer counted ${openings}`);

  // ── (b) AND THE COMMIT'S OWN RECORD DESCRIBES THE REPAIR IT PERFORMED. ───────────────────────
  assert.deepEqual(Object.keys(written.value).sort(), WRITE_RECORD_MEMBERS,
    `the write answers the declared record: ${JSON.stringify(Object.keys(written.value))}`);
  const repairOpId = repairedRecord === null || repairedRecord.op === undefined
    ? null
    : repairedRecord.op.opId;
  assert.notEqual(repairOpId, null,
    `the repair's own write must answer an op: ${JSON.stringify(repairedRecord === null ? null : Object.keys(repairedRecord))}`);
  assert.equal(written.value.op.opId, repairOpId,
    `**THE COMMIT'S OWN RECORD CARRIES THE REPAIR'S OP AS ITS OWN** — the returned record's \`op\` is the op the `
      + `repair landed, because the state this commit leaves is the repair's and never the refused value's: the `
      + `drive read ${JSON.stringify(written.value.op.opId)} against the repair's ${JSON.stringify(repairOpId)}`);
  assert.equal(written.value.op.after.value, REPAIRED,
    `and that op's landed value is the repaired one: ${JSON.stringify(written.value.op.after)}`);
  assert.ok(ops.some((op) => op.opId === repairOpId),
    `**AND THE REPAIR'S OP STANDS AMONG THE ATTEMPT'S OPS** (\`report.ops\`, the closed attempt's own list): the `
      + `drive read ${JSON.stringify(ops.map((op) => op.opId))} and the repair landed ${JSON.stringify(repairOpId)}`);
  assert.equal(ops[ops.length - 1].opId, repairOpId,
    `and it is the attempt's LAST op — the landing that left the state the commit stands at: `
      + `${JSON.stringify(ops.map((op) => op.opId))}`);
  assert.equal(repairEntry.length, 1,
    `ONE \`repair-run\` entry and never two: ${JSON.stringify(repairEntry)}`);
  assert.equal(repairEntry[0].opId, repairOpId,
    `and THE LOG ENTRY NAMES THE OP THE REPAIR LANDED (\`kernel-surface.md §2.5\` item 1's \`repair-run\` row): `
      + `${JSON.stringify(repairEntry[0])}`);
  assert.deepEqual(asked, [SEED, REFUSED, REPAIRED],
    `and the pair is asked at REGISTRATION, by the PASS and — from the repair — by the RE-RUN at the repaired `
      + `state: ${JSON.stringify(asked)}`);
  assert.equal(standing, REFUSED,
    `and the value the attempt wrote still stands at its own address — the repair moved a BESIDE state and the `
      + `attempt's own landing is unmoved, which is the shape that makes the commit's last op the repair's: `
      + `${JSON.stringify(standing)}`);
  assert.equal(repairedStanding, REPAIRED,
    `and the repair's own op stands at the beside address it wrote: ${JSON.stringify(repairedStanding)}`);
  // ── (c) AND `seq` IS MONOTONE ACROSS THE COMMIT'S ATTEMPTS — **`DEF-AI`'S MEASUREMENT, 2026-10-28**. ──
  // **THE ROW DEMANDS THIS BE CHECKED AGAINST THE MERGE RATHER THAN ASSUMED.** With the log on the COMMIT
  // (`D-53`), one repair write is several attempts — the pass, the repair's own joined write and the re-run —
  // and every one of them appends to the SAME array. **THE ORDINAL MUST BE STRICTLY INCREASING IN ARRAY ORDER
  // AND CONTINUOUS FROM `1`**, because that is what *"the position of the entry in the commit's own message
  // log"* means; it is printed in the diagnostic below so a reader reads the sequence itself and not this
  // cell's intention. **NO ENTRY IS MINTED FROM THE STORE'S JOURNAL COUNTER** (`DEF-AI`'s prohibition): the
  // numbers below are the kernel's own arithmetic on the commit's one list.
  const seqs = report.log.map((entry) => entry.seq);
  assert.ok(seqs.length >= 2,
    `the commit must hold at least the pass's and the repair's entries for monotonicity to have a subject: `
      + `the drive read ${JSON.stringify(seqs)}`);
  for (let index = 1; index < seqs.length; index += 1) {
    assert.equal(seqs[index], seqs[index - 1] + 1,
      `**\`seq\` IS MONOTONE ACROSS THIS COMMIT'S ATTEMPTS — ONE LIST, \`1..n\`, NO RENUMBERING** (\`D-53\`; `
        + `\`DEF-AI\`): the entries read ${JSON.stringify(seqs)} and the kinds `
        + `${JSON.stringify(report.log.map((entry) => entry.kind))}`);
  }
  assert.equal(seqs[0], 1,
    `and the one list starts at \`1\`: ${JSON.stringify(seqs)}`);
  assert.deepEqual(windowOf(store), { open: 0, live: 0 },
    `and the whole call returns at rest: ${JSON.stringify(windowOf(store))}`);

  t.diagnostic(`D-46 (1) · 2026-10-27 · A REPAIR IS TRACKED INSIDE ITS ATTEMPT: the repair body was entered at `
    + `${JSON.stringify(facts[0])} and returned with the count at ${JSON.stringify(facts[1])} — \`attempt-opened\` `
    + `fired ${openings} time for the whole write, so the repair OPENED NOTHING. The commit's own record answered `
    + `\`op\` ${JSON.stringify(written.value.op.opId)} (the repair's), landed ${JSON.stringify(written.value.op.after.value)}; `
    + `the attempt's \`ops\` are ${JSON.stringify(ops.map((op) => op.opId))} and its \`repair-run\` entry names `
    + `${JSON.stringify(repairEntry[0].opId)}; the pair was asked at ${JSON.stringify(asked)}; the store stands at `
    + `${JSON.stringify(standing)} and \`['z']\` at ${JSON.stringify(repairedStanding)}, the call returning `
    + `${JSON.stringify(windowOf(store))}. **AND THE COMMIT'S \`seq\` IS MONOTONE ACROSS ITS ATTEMPTS — `
    + `\`DEF-AI\`'S MEASUREMENT: ${JSON.stringify(seqs)} over the kinds `
    + `${JSON.stringify(report.log.map((entry) => entry.kind))}** — one list, \`1..n\`, no renumbering, and no `
    + `number read off the store's journal counter`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (2) THE DISCRIMINATOR IS THE FOURTH POSITION — supplied JOINS, absent OPENS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-46 (2) · A CALLER-SUPPLIED COMMIT ID JOINS AND AN ABSENT ONE OPENS: a `write` with the FOURTH position naming an open commit JOINS it — no opening, the enclosing count unchanged, no second pass — and the same call without it OPENS — one opening, the count beside the enclosing commit\'s, its own pass asking its own address', (t) => {
  // **THE TWO ARMS ARE DRIVEN FROM ONE CONSTRAINT BODY, AND THAT IS THE POINT**: a constraint body is
  // externally-supplied code **with no commit in hand to name** (`kernel-surface.md §2.3` item 1 hands it five
  // members and no commit), so its verb's entry is the ONLY thing that can name one — `D-46`'s rule, read at the
  // one caller where the name cannot come from anywhere else.
  const store = make();
  store.write(['seed'], 'mem', 1);
  const armA = { label: 'ABSENT — three positions', openings: null, during: null };
  const armB = { label: 'SUPPLIED — four positions, `{pending: []}`', openings: null, after: null };
  // THE COUNT AT THE INSTANT OF A PASS, read by a pair standing where the ABSENT arm's write lands.
  const nested = [];
  store.addConstraint({ address: ['b'], id: 'b-watch' }, (context) => {
    if (context.attempt !== null) nested.push(windowOf(store));
    return true;
  });
  let armed = false;
  let openings = 0;
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'namer' }, (context) => {
    if (context.attempt === null || armed === true) return true;
    armed = true;
    // ── ARM A: THE ABSENT POSITION. IT OPENS. ────────────────────────────────────────────────────
    const before = openings;
    const absentWrite = attempt(() => store.write(['b'], 'mem', 2));
    armA.openings = openings - before;
    armA.ok = absentWrite.ok;
    armA.caught = absentWrite.ok === false ? shapeOf(absentWrite.caught) : null;
    armA.during = nested.length === 0 ? null : nested[nested.length - 1];
    // ── ARM B: THE SUPPLIED POSITION, NAMING THE COMMIT THAT IS OPEN. IT JOINS. ───────────────────
    const beforeNamed = openings;
    const namedWrite = attempt(() => store.write(['c'], 'mem', 3, { pending: [] }));
    armB.openings = openings - beforeNamed;
    armB.ok = namedWrite.ok;
    armB.caught = namedWrite.ok === false ? shapeOf(namedWrite.caught) : null;
    armB.after = windowOf(store);
    armB.record = namedWrite.ok === true ? Object.keys(namedWrite.value).sort() : null;
    return true;
  }));
  const stop = store[ATTEMPT_OPENED](() => { openings += 1; });
  let outer = null;
  // THE OBSERVER IS ARMED FOR THE OUTER WRITE'S OWN OPENING TOO, so the figures below are the whole call's.
  outer = attempt(() => store.write(['a'], 'mem', 4));
  stop();
  const standingB = store.read(['b']);
  const standingC = store.read(['c']);

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(registered.ok, true,
    `the naming pair must REGISTER: the call caught ${JSON.stringify(shapeOf(registered.caught))}`);
  assert.equal(armed, true,
    `the pair's body must RUN inside a pass, or neither arm was driven: the drive reached `
      + `${JSON.stringify(armed)}`);
  assert.equal(outer.ok, true,
    `the outer write must complete: it caught ${JSON.stringify(shapeOf(outer.caught))}`);
  assert.equal(armA.ok, true,
    `the ABSENT arm's write must land: it caught ${JSON.stringify(armA.caught)}`);
  assert.equal(armB.ok, true,
    `the SUPPLIED arm's write must land: it caught ${JSON.stringify(armB.caught)}`);

  // ── (a) THE ABSENT POSITION OPENS — AND THE COUNT RISES BESIDE THE ENCLOSING COMMIT'S. ──────
  // ── **⟶ AND THIS ARM MOVES ON 2026-10-28, BY `D-53`'S SECOND INVARIANT AND BY NOTHING ELSE.**
  // `D-46` read the discriminator as THE NAME A CALL SUPPLIES ON ITS OWN ENTRY, so a constraint body's
  // three-position write — naming nothing, and running one frame inside an open commit — OPENED one, and this arm
  // recorded `1` opening and the count at `2`. **THE ARCHITECT'S LATER RULING IS UNCONDITIONAL ON THE KIND:**
  // *"Constraints/Repairs should always use the same commit. Listeners should open a new commit, because the
  // triggering commit already passed constraints"* (`strata/decisions.md` · `D-53`). **A CONSTRAINT BODY IS A
  // CHECK, NOT A NEW QUESTION**: the kernel now NAMES the attempt's commit when it invokes it (`kernel-attempt.mjs`'s
  // `constraintInCommit`), so the body's write JOINS and the whole call opens ONE commit.
  // **THE ARM'S SUBJECT IS UNMOVED AND IS ASSERTED BELOW**: an ABSENT fourth position is in the domain and the
  // write LANDS; what moved is which commit it landed in — joining the enclosing one instead of opening a second.
  // **THE SUPPLIED ARM (`armB`) IS UNMOVED** and still joins, and `nested.length` is still `1`: the body's write ran
  // its own pass at its own address.
  assert.equal(armA.openings, 0,
    `**A \`write\` FROM A CONSTRAINT BODY — ONE OF THE TWO KINDS \`D-53\` NAMES — NEVER OPENS A COMMIT**: `
      + `\`attempt-opened\` fired ${armA.openings} times across the absent arm, and it must fire zero`);
  assert.deepEqual(armA.during, { open: 1, live: 2 },
    `**AND THE COUNT IS THE ENCLOSING COMMIT'S OWN — \`1\` — WHILE TWO ATTEMPTS STAND LIVE**: the outer write's `
      + `attempt and the body's own, both of the SAME commit, which is what \`D-53\`'s one list means. THE DRIVE `
      + `READ ${JSON.stringify(armA.during)}`);

  // ── (b) THE SUPPLIED POSITION JOINS — NO OPENING, THE COUNT UNCHANGED, AND NO SECOND PASS. ───
  assert.equal(armB.openings, 0,
    `**A \`write\` THAT NAMES AN OPEN COMMIT AT THE FOURTH POSITION JOINS IT AND OPENS NOTHING**: the observer `
      + `counted ${armB.openings} openings across the supplied arm`);
  assert.deepEqual(armB.after, { open: 1, live: 1 },
    `**AND THE COUNT IS THE ENCLOSING COMMIT'S OWN, UNCHANGED** — \`1\`, the outer write's, with its one live `
      + `attempt: the supplied call neither opened a commit nor started a second pass `
      + `(\`docs/specs/storeroom-js/surface.md §2.12\` item 1 stage \`4\`: *"a five-position call can never start a `
      + `second pass"*). THE DRIVE READ ${JSON.stringify(armB.after)}`);
  assert.deepEqual(armB.record, WRITE_RECORD_MEMBERS,
    `and it answers the declared four-member record from the store leg: ${JSON.stringify(armB.record)}`);
  assert.equal(nested.length, 1,
    `**AND ONLY THE ABSENT ARM RAN A PASS** — the pair standing at \`['b']\` was asked exactly once, by the `
      + `body's own write, and the supplied arm asked nothing because it entered no pass: the drive recorded `
      + `${JSON.stringify(nested)}`);
  assert.equal(openings, 1,
    `**ONE OPENING FOR THE WHOLE CALL** — the outer write's own; NEITHER arm opened anything, the absent arm `
      + `joining by the kernel's name and the supplied arm joining by its own position (\`D-53\`, \`D-46\`). `
      + `The observer counted ${openings}`);
  assert.equal(standingB, 2,
    `and the absent arm's write landed: ${JSON.stringify(standingB)}`);
  assert.equal(standingC, 3,
    `and so did the supplied arm's, although no pass judged it: ${JSON.stringify(standingC)}`);
  assert.deepEqual(windowOf(store), { open: 0, live: 0 },
    `and the whole call returns at rest: ${JSON.stringify(windowOf(store))}`);

  t.diagnostic(`D-46 (2) · 2026-10-27 · THE FOURTH POSITION DECIDES: the ABSENT arm opened `
    + `${armA.openings} commit and its pass read the count at ${JSON.stringify(armA.during)}; the SUPPLIED arm `
    + `(\`{pending: []}\` at the fourth position, naming the commit that was open) opened ${armB.openings} and `
    + `left the count at ${JSON.stringify(armB.after)}, its record ${JSON.stringify(armB.record)} and no second `
    + `pass — the pair at \`['b']\` was asked ${nested.length} time. Openings for the whole call: ${openings}; the `
    + `store stands at ${JSON.stringify([standingB, standingC])} and the call returns `
    + `${JSON.stringify(windowOf(store))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (3) WHAT THE FOURTH POSITION ACCEPTS, MEASURED — a RECORD, and never an id token
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-46 (3) · WHAT THE FOURTH POSITION ACCEPTS, MEASURED: it takes a RECORD — an object carrying an OWN, present `pending` — and it REFUSES a string id, a number, `null`, an explicit `undefined`, an object carrying none, an inherited one, a `Proxy` and an array; an ABSENT position is in the domain and OPENS', (t) => {
  // **THE MEASUREMENT THE RULE RESTS ON**: `D-46` calls the discriminator *"a commit id"*, and the position it
  // names already exists (`index.d.ts`: *"the commit, at the FOURTH position of the METHOD"*). **WHAT IT HOLDS
  // IS A RECORD AND NOT A TOKEN** — so the "id" a caller names is the `CommitRecord` the commit was described
  // by, which is the object a repair's context carries at its `pending`, and no spelling of an identifier in a
  // value slot is admitted (`docs/specs/storeroom-js/surface.md §2.4` item 9 (g) item 1: *"an object position is a
  // record position only where it CARRIES A `pending` MEMBER whose value is present and not `undefined`"*).
  const store = make();
  store.write(['seed'], 'mem', 1);
  const kernelRecord = kernelCommit(store, ['leg'], 'mem', 2);
  const accepted = [];
  const refused = [];
  const probes = [
    // [ label, the value at the fourth position, whether the call SUPPLIES that position at all ]
    ['absent (three positions)', undefined, false],
    ['an object carrying an own `pending: []`', { pending: [] }, true],
    ['the kernel\'s own `CommitRecord`', kernelRecord, true],
    ['a string id', 'attempt-1', true],
    ['a number id', 7, true],
    ['`null`', null, true],
    ['an explicit `undefined`', undefined, true],
    ['an object carrying no `pending`', { attempt: null }, true],
    ['an own `pending` whose value is `undefined`', { pending: undefined }, true],
    ['an inherited `pending`', Object.create({ pending: [] }), true],
    ['a `Proxy`', new Proxy({ pending: [] }, {}), true],
    ['an array', [], true],
  ];
  for (const [label, value, supplied] of probes) {
    const before = openCommits(store);
    const one = attempt(() => (supplied === true
      ? store.write([`probe-${accepted.length + refused.length}`], 'mem', 1, value)
      : store.write([`probe-${accepted.length + refused.length}`], 'mem', 1)));
    const after = openCommits(store);
    const row = { label, ok: one.ok, after, before, status: one.ok === false ? shapeOf(one.caught).status : null };
    if (one.ok === true) {
      row.record = Object.keys(one.value).sort();
      accepted.push(row);
    } else {
      row.message = shapeOf(one.caught).message;
      refused.push(row);
    }
  }

  // ── THE ACCEPTED SET: THREE SPELLINGS OF THE POSITION'S DOMAIN, AND ONE OF THEM IS ABSENCE. ──
  assert.equal(accepted.length, 3,
    `exactly three of the ${probes.length} probes are in the position's domain: the ABSENT position, an object `
      + `carrying an own present \`pending\`, and the kernel's own record. THE DRIVE ACCEPTED `
      + `${JSON.stringify(accepted.map((row) => row.label))}`);
  assert.equal(accepted.some((row) => row.label === 'absent (three positions)'), true,
    `**AN ABSENT POSITION IS IN DOMAIN** (\`index.d.ts\`: *"AN ABSENT \`commit\` IS IN DOMAIN"*) and it OPENS a `
      + `commit: ${JSON.stringify(accepted)}`);
  assert.equal(accepted.some((row) => row.label === 'the kernel\'s own `CommitRecord`'), true,
    `and the kernel's own record is accepted — the very object a repair's context carries at its \`pending\` `
      + `(\`surface.md §2.11\` clause 6): ${JSON.stringify(accepted.map((row) => row.label))}`);
  assert.equal(accepted.every((row) => row.after === 0), true,
    `**AND EVERY ACCEPTED PROBE LEFT THE COUNT AT ZERO**: each opened its own commit at a store at rest and `
      + `closed it on its return — ${JSON.stringify(accepted.map((row) => [row.label, row.after]))}`);

  // ── THE REFUSED SET: NO ID TOKEN IS A COMMIT, AND THE MESSAGE NAMES THE POSITION. ────────────
  assert.equal(refused.length, probes.length - 3,
    `and the other ${probes.length - 3} are OUTSIDE the position's domain: ${JSON.stringify(refused.map((row) => row.label))}`);
  for (const row of refused) {
    assert.equal(row.status, null,
      `a refusal at a class position is the ONE \`TypeError\` with \`status\` ABSENT `
        + `(\`docs/specs/storeroom-js/surface.md §2.5\` item 5 (e)): the drive read ${JSON.stringify(row.status)} `
        + `for ${row.label}`);
    assert.equal(typeof row.message === 'string' && row.message.includes(COMMIT_POSITION_MESSAGE), true,
      `and its message names the position and its class: ${JSON.stringify(row.message)} for ${row.label}`);
    assert.equal(row.after, 0,
      `and a refused write leaves no count standing — the bracket is released on the throwing arm too: `
        + `${JSON.stringify([row.label, row.before, row.after])}`);
  }
  // **AND THE ID TOKENS ARE THE ONES THE RULING'S WORD COULD BE MISREAD AS ACCEPTING** — they are refused, so the
  // name a call supplies is the RECORD and never a token: that is the measurement `D-46`'s rule is written on.
  assert.equal(refused.some((row) => row.label === 'a string id'), true,
    'a string id is REFUSED at this position: the "commit id" is carried as the record, not as a token');
  assert.equal(refused.some((row) => row.label === 'an explicit `undefined`'), true,
    'and an explicit `undefined` is a SUPPLIED position outside the domain and is refused — only ABSENCE opens');

  t.diagnostic(`D-46 (3) · 2026-10-27 · THE FOURTH POSITION, MEASURED: ACCEPTED `
    + `${JSON.stringify(accepted.map((row) => row.label))} (each returning `
    + `${JSON.stringify(accepted.map((row) => row.record))} and leaving the count at `
    + `${JSON.stringify(accepted.map((row) => row.after))}); REFUSED `
    + `${JSON.stringify(refused.map((row) => row.label))}, every one the position's \`TypeError\` with \`status\` `
    + `ABSENT and a message carrying ${JSON.stringify(COMMIT_POSITION_MESSAGE)}`);
});
