// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `DEF-AE` — A WRITE THAT REPORTS REFUSAL WHILE ITS OWN VALUE LANDS — AND THE MARK THAT CLOSES IT
//
// **THE ARCHITECT'S RULING, VERBATIM: *"Cache the restoreMark when opening a commit, based on the last valid
// state/op of the journal."***
//
// **THE DEFECT, AS THE LAST PASS REPRODUCED IT AND CAUSED IT.** `restoreReversal` restored the journal's HEAD
// (`restoreMark()` with no position) on the reasoning that *"a reversal appends no journal entry, so that head
// describes the state that stood BEFORE the action"*. **THE REASONING FAILS ON ONE ARM**: in the restart arm the
// ENCLOSING WRITE'S OWN OP STANDS AT THE HEAD when the listener's reversal runs, so the compensation restored
// the write's LANDING — **`9` became `7`, and the refusal's own value stood**. **The only JS-reachable route to
// the pre-attempt state was a mark naming the op BEFORE the attempt's first, and no declared verb named it.**
// **It is named now**: `journalMark` answers the journal's LAST VALID MARK (an op id, or the FLOOR where the
// journal holds no entry), `state.mjs`'s `openCommit` caches it on the window it opens, and `restoreReversal`
// hands that cached mark back to the store instead of asking for the head.
//
// **WHAT EACH CELL PROVES.**
//   (1) **`DEF-AE` ITSELF: `9 → 9`.** A listener body reverses an in-commit op, the check restarts, a pair
//       refuses the state the reversal leaves, and the write THROWS — **and the store stands where the ATTEMPT
//       found it**, not where the write left it. The mark the opening cached is PRINTED as the op id it names,
//       read off the window's own cache inside the listener body (the outermost opening's mark) and asserted to
//       be the store's own `journalMark` read at rest before the call.
//   (2) **THE ARM SWEEP — THE SEVEN REFUSING ARMS THE LAST PASS MEASURED, NAMED.** Plain `{message}`, the two
//       repair-return arms, repair-lands-then-re-run-refuses, repair throws, body throws, and a repair at an
//       ancestor: **each leaves the store where the attempt found it.** (These are the write-refusal arms the
//       kernel's own floor restores; they were green before this pass and are asserted here so the fix cannot
//       move them.)
//   (3) **THE LAWFUL SIDE IS UNCHANGED**: a lawful reversal still answers its record and leaves its effect
//       standing, and a lawful write still answers its record with its value standing.
//   (4) **AND THE MARK'S FLOOR**: a store whose commit opened on an EMPTY journal caches the FLOOR, and a
//       refused reversal restores the state the store was BORN with — the address absent again — which no op id
//       could have named.
//
// **D-21.** Every cell prints the readings it took at its own `t.diagnostic`, and asserts the drive's coherence
// BEFORE its verdict, so a cell that could not reach its arm says so instead of failing on a symptom.
// **D-17.** The expectations are literals here and the citations are comments: no `docs/**` path is opened at
// runtime. **The instruments are the declared ones**: the window's cached mark (`state.mjs`'s `windowMark`, the
// accessor beside `openCommits`) and the store's own `journalMark` entry, reached exactly as the package reaches
// it — so both the CACHE and the STORE'S ANSWER are measured and neither is assumed.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { windowMark } from '../../bindings/js/src/entry/state.mjs';
import { withAddon } from '../../bindings/js/src/entry/artefact.mjs';

/** `surface.md §2.5` items 3–4: the ONE crossed form's member set, sorted ascending. */
const REFUSAL_MEMBERS = ['log', 'message', 'status'];
/** The set's rank-`20` member (`src/error.rs`'s `CODES`, `[&str; 20]`): the status both arms of a constraint
 *  refusal cross with (`DEF-H`; `D-38`). */
const PASS_REFUSED = 'ConstraintPassRefused';

const SEED = 5;      // the state the reversal RESTORES — and the state the pair REFUSES
const LANDED = 9;    // the value the reversal's op landed — the state the pair is registered at
const THIRD = 7;     // the write's own value — the state the pass approves, and the OLD wrong reading

const make = () => storeCreate({ journalLength: 256, listeners: [] });

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The mark a cache answers, printed as the entry it names — the op id, or `Absent` for the floor. **THE
 *  `DEF-Q` RULE APPLIES TO A CELL'S OWN PRINT AS IT APPLIES TO A MESSAGE: no column prints `undefined`.** */
function markSpelling(mark) {
  if (mark === undefined) return 'NO CACHE';
  if (mark === null || typeof mark !== 'object') return `a mark of class ${typeof mark}`;
  if (mark.k === 's' && typeof mark.v === 'string') return mark.v;
  if (mark.k === 'F') return 'Absent';
  return `a mark of kind ${JSON.stringify(mark.k)}`;
}

/** The store's own `journalMark` answer, reached at the addon's entry exactly as the package reaches it. */
function storeMark(store) {
  const addon = withAddon();
  return Reflect.apply(addon.journalMark, store, []);
}

/** The standing at one address, as `undefined` where it holds nothing (`DEF-Q`: a cell may print absence). */
function standingAt(store, address) {
  const read = attempt(() => store.read(address));
  return read.ok ? read.value : undefined;
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (1) `DEF-AE` ITSELF — the restart arm, and it must be the PRE-ATTEMPT state
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

// **⟶ THE CELL IS RE-DERIVED 2026-10-28 — `D-63`: THE RESTORE NAMES THE LAST VALIDATED MARK, SO THE READINGS ARE
// `9 → 7*` (the write's OWN VALIDATED LANDING) AND NOT `9 → 9` (the state the attempt found), AND NOT `9 → 7`
// BECAUSE THE HEAD HAPPENED TO BE THERE.** **THE RULING, THE ARCHITECT, VERBATIM:** *"After the constraint sweep
// ends in a valid state, bump the restore mark. The passing constraint state marks the new next valid state."*
// **THE THREE READINGS OF THE SAME DRIVE, IN ORDER, SO NO ONE READS THE NUMBER WITHOUT ITS REASON:** the journal's
// HEAD put the store at `7` *because the head was all there was* (`DEF-AE`'s defect); the commit's OPENING mark put
// it at `9`, the state the attempt found (`DEF-AE`'s fix); and from this date the mark MOVES FORWARD AT THE PASSING
// SWEEP, so the store stands at `7` *because the sweep APPROVED it* — **a validated edit stands against a later
// refusal, and the reversal's effect (the state `5` the pair refuses) is what the restore undid.** **THE CELL'S
// SUBJECT IS UNMOVED**: a listener body's reversal inside an open commit is not judged as a step, the check
// restarts, a pair refuses the state the reversal left, and the write throws in the one declared form.
test('DEF-AE (1) · A LISTENER BODY REVERSES AN IN-COMMIT OP, THE CHECK RESTARTS, A PAIR REFUSES THE STATE THE REVERSAL LEAVES, AND THE WRITE THROWS — the store stands where the LAST VALIDATED MARK names it: `9 → 7` because the sweep APPROVED it', (t) => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const target = attempt(() => store.write(['a'], 'mem', LANDED));
  // THE MARK THE COMMIT WILL CACHE, read at rest immediately before the call: the opening is the member's first
  // act, so nothing the commit lands stands between this read and the cache it takes.
  const markBeforeTheCall = storeMark(store);
  // THE WINDOW'S OWN CACHE, read INSIDE the listener body — where the write's commit is in flight and the cache
  // in flight is the OUTERMOST opening's mark. **THIS IS THE INSTRUMENT, NOT AN INFERENCE**: it is the value
  // `restoreReversal` will hand to the store.
  const cached = [];
  // **AND THE STORE'S OWN POSITION AT THE SAME INSTANT** (`journalMark` at the delivery's boundary), so the cache
  // is measured against the store's answer and not against a second spelling of this cell's own making.
  let lastMark = undefined;
  let inner = null;
  const asked = [];
  const handle = store.listen('def-ae-listener', [['a']]);
  store.register(handle, () => {
    if (inner === null) {
      cached.push(windowMark(store));
      lastMark = storeMark(store);
      inner = attempt(() => store.rollback(target.value.op.opId));
    }
  });
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'def-ae' }, (context) => {
    asked.push(context.value);
    return Object.is(context.value, SEED)
      ? { message: 'the state the reversal leaves is not one this pair admits' }
      : true;
  }));
  const before = standingAt(store, ['a']);
  const terminal = attempt(() => store.write(['a'], 'mem', THIRD));
  const after = standingAt(store, ['a']);
  const caught = terminal.ok === false ? terminal.caught : null;
  const log = caught !== null && Array.isArray(caught.log) ? caught.log : [];

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ───────────────
  assert.equal(target.ok, true,
    `the reversal's target op must land: the write caught ${JSON.stringify(target.caught)}`);
  assert.equal(registered.ok, true,
    `the pair must REGISTER (it passes against ${LANDED}): the call caught ${JSON.stringify(registered.caught)}`);
  assert.equal(inner.ok, true,
    `the reversal itself answers its record inside the open commit (the step is not judged as a step): the drive `
      + `caught ${JSON.stringify(inner.caught)}`);
  assert.equal(cached.length, 1,
    `the listener body must have run once inside the write's commit and taken the window's cached mark; the drive `
      + `took ${cached.length}`);

  // ── THE FINDING: THE REFUSAL, IN THE DECLARED FORM, AND THE ATTEMPT'S STATE STANDING. ────────
  assert.equal(terminal.ok, false,
    `the write must REFUSE — the check the reversal invalidated restarts and the pair refuses the state it left. `
      + `THE DRIVE'S WRITE ANSWERED ok (the store stands at ${JSON.stringify(after)})`);
  assert.deepEqual(Object.keys(caught).sort(), REFUSAL_MEMBERS,
    `the refusal crosses as ${JSON.stringify(REFUSAL_MEMBERS)}: ${JSON.stringify(Object.keys(caught))}`);
  assert.equal(caught.status, PASS_REFUSED,
    `the crossed status is the set's rank-\`20\` member: ${JSON.stringify(caught.status)}`);
  assert.equal(log.some((entry) => entry.id === 'def-ae'), true,
    `the refusal's log names the pair that refused the state the reversal left: ${JSON.stringify(log)}`);
  assert.deepEqual(asked, [LANDED, THIRD, SEED],
    `the pair is asked at REGISTRATION (${LANDED}), by the write's PASS (${THIRD}) and by the RESTART at the `
      + `state the reversal left (${SEED}): THE DRIVE WAS ASKED AT ${JSON.stringify(asked)}`);
  // **THE CELL'S WHOLE POINT, PRINTED BEFORE AND AFTER, WITH EACH READING'S REASON ATTACHED: it was
  // `${LANDED} → ${THIRD}` UNDER THE HEAD MARK (right value, no reason — the head happened to be there), it was
  // `${LANDED} → ${LANDED}` UNDER THE OPENING'S CACHE, and it is `${LANDED} → ${THIRD}` FROM 2026-10-28 BECAUSE THE
  // SWEEP APPROVED THAT STATE (`D-63`).** `${SEED}` — the state the reversal leaves — is the violating effect and
  // it stands in none of the three readings.
  assert.equal(before, LANDED,
    `the state BEFORE the attempt is ${LANDED} (the value the pair was registered at): the drive read `
      + `${JSON.stringify(before)}`);
  assert.equal(after, THIRD,
    `**A VALIDATED EDIT STANDS AGAINST A LATER REFUSAL — ${LANDED} → ${THIRD}.** The write's own landing is `
      + `the LAST VALIDATED MARK the restore names, and ${SEED} (the state the reversal left) is nowhere in the `
      + `store. THE DRIVE READ ${JSON.stringify(after)}`);

  // ── AND THE MARK IT NAMES, MEASURED AT BOTH BOUNDARIES AND AGAINST THE STORE'S OWN ANSWER. ──
  // **THE OPENING'S CACHE IS THE STATE THE ATTEMPT FOUND** — the store's own `journalMark` read at rest
  // immediately before the call, which is what the opening takes and nothing that the commit lands stands
  // between the two.
  assert.equal(markSpelling(markBeforeTheCall), target.value.op.opId,
    `the store's own \`journalMark\` — read at rest immediately before the call — names the op the reversal `
      + `targeted (${JSON.stringify(target.value.op.opId)}), which is the position the commit's opening caches: `
      + `${JSON.stringify(markSpelling(markBeforeTheCall))}`);
  // **AND THE CACHE IN FLIGHT AT THE DELIVERY IS THE BUMPED ONE**: the store's own position at that instant —
  // taken inside the listener body, where the write's commit is in flight and no later op has landed — and NOT
  // the opening's. **THIS IS THE INSTRUMENT, NOT AN INFERENCE**: it is the very value `restoreReversal` will hand
  // the store (`constraints.mjs`'s `windowMark`).
  assert.equal(markSpelling(cached[0]), markSpelling(lastMark),
    `**THE MARK MOVED FORWARD AT THE PASSING SWEEP** — the cache in flight when the delivery runs names the `
      + `store's own position there (${JSON.stringify(markSpelling(lastMark))}), and NOT the opening's `
      + `(${JSON.stringify(markSpelling(markBeforeTheCall))}): the cache read ${JSON.stringify(markSpelling(cached[0]))}`);
  assert.equal(markSpelling(cached[0]) !== markSpelling(markBeforeTheCall), true,
    `and the two boundaries are TOLD APART, which is the whole of \`D-63\`: the opening's cache was `
      + `${JSON.stringify(markSpelling(markBeforeTheCall))} and the delivery's is `
      + `${JSON.stringify(markSpelling(cached[0]))}`);

  t.diagnostic(`DEF-AE (1) · RE-DERIVED 2026-10-28 (\`D-63\`) · THE RESTART ARM, PRINTED BEFORE → AFTER: before `
    + `the attempt the store stood at ${JSON.stringify(before)}, the write landed ${JSON.stringify(THIRD)} and then `
    + `threw ${JSON.stringify(caught.status)}; AFTER the refusal the store stands at ${JSON.stringify(after)}. `
    + `THE TWO BOUNDARIES, MEASURED: the opening's cache names `
    + `${JSON.stringify(markSpelling(markBeforeTheCall))} (the position the commit found) and the cache in flight `
    + `when the DELIVERY runs names ${JSON.stringify(markSpelling(cached[0]))} — the store's own `
    + `\`journalMark\` at that instant (${JSON.stringify(markSpelling(lastMark))}), i.e. the state the passing sweep `
    + `VALIDATED. The pair's asks were ${JSON.stringify(asked)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (2) THE ARM SWEEP — the SEVEN refusing arms the last pass measured, each leaving the store where the attempt
// found it
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **WHY THIS CELL EXISTS.** `DEF-AE` is ONE arm of a wider shape: a write that reports refusal. The last pass
// swept seven refusing arms and measured that **every one of them left the store where the attempt found it** —
// only the restart arm did not. **This cell is that sweep, NAMED ARM BY ARM, so the fix cannot move any of them
// and so the one arm that was wrong is legible beside the seven that were right.**
//
// **THE SEVEN, NAMED (their own bodies are the fixture):**
//   1. **plain `{message}`** — the pair refuses the written value with its own sentence;
//   2. **repair-return `{ok: false, message}`** — the repair DECLINES and says why;
//   3. **repair-return outside the closed two-arm set (`{ok: true}` with no `op`)** — read as "no op produced";
//   4. **repair-lands-then-re-run-refuses** — the repair writes a value the same pair then refuses;
//   5. **repair throws** — the repair body's own throwable;
//   6. **body throws** — the pair body's own throwable;
//   7. **repair at an ancestor** — the repair writes at the attempt's PARENT address, which is the spatial case
//      the floor's per-address composition exists for.
// **EACH ARM IS DRIVEN THROUGH THE PRODUCT'S OWN `write`** (`SEED` standing, `LANDED` written, the refusal
// thrown) and asserts `read` at the attempt's address is `SEED` afterwards.

/** One arm: seed `['a'] = SEED`, write `LANDED` with the pair/repair the arm supplies, and answer the readings. */
function sweepArm(arm) {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const registered = attempt(() => store.addConstraint(arm.pair, arm.body(store)));
  const before = standingAt(store, ['a']);
  const terminal = attempt(() => arm.write(store));
  const after = standingAt(store, ['a']);
  return {
    registered,
    before,
    after,
    refused: terminal.ok === false,
    status: terminal.ok === false && terminal.caught !== null && typeof terminal.caught === 'object'
      ? terminal.caught.status
      : null,
  };
}

test('DEF-AE (2) · THE ARM SWEEP: the SEVEN refusing arms — plain `{message}`, both repair returns, repair-lands-then-re-run-refuses, repair throws, body throws, and a repair at an ancestor — EACH leave the store where the attempt found it', (t) => {
  const readings = [];
  const record = (name, arm) => {
    const read = sweepArm(arm);
    readings.push({ name, ...read });
    return read;
  };

  // (1) PLAIN `{message}`.
  const plain = record('plain {message}', {
    pair: { address: ['a'], id: 'sweep-plain' },
    body: () => (context) => (Object.is(context.value, SEED) ? true : { message: 'a must stand at 5' }),
    write: (store) => store.write(['a'], 'mem', LANDED),
  });

  // (2) REPAIR-RETURN `{ok: false, message}` — the repair DECLINES.
  const declined = record('repair returns {ok:false, message}', {
    pair: { address: ['a'], id: 'sweep-declined' },
    body: () => (context) => (Object.is(context.value, SEED)
      ? true
      : { message: 'a must stand at 5', repair: () => ({ ok: false, message: 'the repair declined' }) }),
    write: (store) => store.write(['a'], 'mem', LANDED),
  });

  // (3) REPAIR-RETURN OUTSIDE THE CLOSED TWO-ARM SET — `{ok: true}` carrying no `op`, read as "no op produced".
  const noOp = record('repair returns {ok:true} with no op', {
    pair: { address: ['a'], id: 'sweep-noop' },
    body: () => (context) => (Object.is(context.value, SEED)
      ? true
      : { message: 'a must stand at 5', repair: () => ({ ok: true }) }),
    write: (store) => store.write(['a'], 'mem', LANDED),
  });

  // (4) REPAIR LANDS, THEN THE RE-RUN REFUSES — the repair's own op is refused by the same pair.
  const reRun = record('repair lands, the re-run refuses', {
    pair: { address: ['a'], id: 'sweep-rerun' },
    body: (store) => (context) => {
      if (Object.is(context.value, SEED)) return true;
      return {
        message: 'a must stand at 5',
        repair: (repairContext) => {
          const written = store.write(repairContext.address, repairContext.tier, 6, repairContext);
          return { ok: true, message: 'repaired to 6', op: written.op };
        },
      };
    },
    write: (store) => store.write(['a'], 'mem', LANDED),
  });

  // (5) REPAIR THROWS.
  const repairThrew = record('repair throws', {
    pair: { address: ['a'], id: 'sweep-repair-throw' },
    body: () => (context) => (Object.is(context.value, SEED)
      ? true
      : {
        message: 'a must stand at 5',
        repair: () => {
          throw new Error('the repair body throws');
        },
      }),
    write: (store) => store.write(['a'], 'mem', LANDED),
  });

  // (6) BODY THROWS.
  const bodyThrew = record('body throws', {
    pair: { address: ['a'], id: 'sweep-body-throw' },
    body: () => (context) => {
      if (Object.is(context.value, SEED)) return true;
      throw new Error('the constraint body throws');
    },
    write: (store) => store.write(['a'], 'mem', LANDED),
  });

  // (7) REPAIR AT AN ANCESTOR — the attempt's address is `['a','b']` and the repair writes at `['a']`.
  const ancestorStore = make();
  ancestorStore.write(['a'], 'mem', { b: SEED });
  const ancestorRegistered = attempt(() => ancestorStore.addConstraint({ address: ['a', 'b'], id: 'sweep-ancestor' },
    (context) => (Object.is(context.value, SEED)
      ? true
      : {
        message: 'b must stand at 5',
        repair: (repairContext) => {
          const written = ancestorStore.write(['a'], 'mem', { b: 6 }, repairContext);
          return { ok: true, message: 'repaired at the ancestor', op: written.op };
        },
      })));
  const ancestorBefore = standingAt(ancestorStore, ['a', 'b']);
  const ancestorTerminal = attempt(() => ancestorStore.write(['a', 'b'], 'mem', LANDED));
  const ancestorAfter = standingAt(ancestorStore, ['a', 'b']);
  readings.push({
    name: 'repair at an ancestor',
    registered: ancestorRegistered,
    before: ancestorBefore,
    after: ancestorAfter,
    refused: ancestorTerminal.ok === false,
    status: ancestorTerminal.ok === false && ancestorTerminal.caught !== null
      && typeof ancestorTerminal.caught === 'object'
      ? ancestorTerminal.caught.status
      : null,
  });

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ───────────────
  assert.deepEqual(readings.map((row) => row.registered.ok), [true, true, true, true, true, true, true],
    `every arm's pair must REGISTER (each passes against the seed): the drive recorded `
      + `${JSON.stringify(readings.map((row) => row.registered.caught ?? null))}`);
  assert.deepEqual(readings.map((row) => row.before), [SEED, SEED, SEED, SEED, SEED, SEED, SEED],
    `every arm must stand the seed BEFORE its attempt: ${JSON.stringify(readings.map((row) => row.before))}`);
  assert.deepEqual(readings.map((row) => row.refused), [true, true, true, true, true, true, true],
    `every arm's write must REFUSE — that is what makes it a refusing arm: the drive recorded `
      + `${JSON.stringify(readings.map((row) => ({ name: row.name, refused: row.refused, after: row.after })))}`);

  // ── THE FINDING: EACH ONE LEAVES THE STORE WHERE THE ATTEMPT FOUND IT. ───────────────────────
  assert.deepEqual(readings.map((row) => row.after), [SEED, SEED, SEED, SEED, SEED, SEED, SEED],
    `**EVERY REFUSING ARM LEAVES THE STORE WHERE THE ATTEMPT FOUND IT** — ${SEED} at the address the attempt `
      + `wrote, on all seven. THE DRIVE READ `
      + `${JSON.stringify(readings.map((row) => ({ arm: row.name, before: row.before, after: row.after, status: row.status })))}`);

  t.diagnostic(`DEF-AE (2) · 2026-10-27 · THE ARM SWEEP, NAMED: `
    + readings.map((row) => `'${row.name}' ${JSON.stringify(row.before)} → ${JSON.stringify(row.after)} `
      + `(${JSON.stringify(row.status)})`).join(' · ')
    + ` — SEVEN refusing arms, each leaving the store where the attempt found it, beside the restart arm's `
      + `own reading in cell (1)`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (3) THE LAWFUL SIDE — a lawful reversal and a lawful write are unchanged
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DEF-AE (3) · THE LAWFUL SIDE IS UNCHANGED: a lawful reversal still answers `{opId, undoneOps, restoredTo}` and its effect STANDS, and a lawful write still answers its record with its value standing', (t) => {
  const store = make();
  const seeded = attempt(() => store.write(['a'], 'mem', SEED));
  const target = attempt(() => store.write(['a'], 'mem', LANDED));
  // A pair that ADMITS every value: nothing refuses, so no compensating act runs.
  const asked = [];
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'def-ae-lawful' }, (context) => {
    asked.push(context.value);
    return true;
  }));
  const reversal = attempt(() => store.rollback(target.value.op.opId));
  const afterReversal = standingAt(store, ['a']);
  const lawfulWrite = attempt(() => store.write(['a'], 'mem', THIRD));
  const afterWrite = standingAt(store, ['a']);

  assert.equal(seeded.ok, true, `the seed write must land: ${JSON.stringify(seeded.caught)}`);
  assert.equal(target.ok, true, `the target write must land: ${JSON.stringify(target.caught)}`);
  assert.equal(registered.ok, true, `the pair must register: ${JSON.stringify(registered.caught)}`);
  assert.equal(reversal.ok, true,
    `a lawful reversal ANSWERS its declared record and never throws: the drive caught `
      + `${JSON.stringify(reversal.caught)}`);
  assert.deepEqual(Object.keys(reversal.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    `the record is \`{opId, undoneOps, restoredTo}\` and no new member (\`PAR-JS-9\`): `
      + `${JSON.stringify(Object.keys(reversal.value))}`);
  assert.deepEqual(reversal.value.restoredTo, { present: true, value: SEED },
    `and it restored the seed: ${JSON.stringify(reversal.value.restoredTo)}`);
  assert.equal(afterReversal, SEED,
    `the reversal's effect STANDS because nothing refused it: the drive read ${JSON.stringify(afterReversal)}`);
  assert.equal(lawfulWrite.ok, true,
    `a lawful write ANSWERS its record: the drive caught ${JSON.stringify(lawfulWrite.caught)}`);
  assert.equal(afterWrite, THIRD,
    `and its value stands: the drive read ${JSON.stringify(afterWrite)}`);
  assert.deepEqual(asked, [LANDED, SEED, THIRD],
    `the pair is asked at registration (${LANDED}), by the reversal's judgement (${SEED}) and by the write's `
      + `pass (${THIRD}): THE DRIVE WAS ASKED AT ${JSON.stringify(asked)}`);

  t.diagnostic(`DEF-AE (3) · 2026-10-27 · THE LAWFUL SIDE: the reversal answered `
    + `${JSON.stringify(reversal.value)} and its effect stands at ${JSON.stringify(afterReversal)}; the lawful `
    + `write answered and its value stands at ${JSON.stringify(afterWrite)}; the pair was asked at `
    + `${JSON.stringify(asked)} and refused nothing — no compensating act ran, and no cached mark was spent`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (4) THE MARK'S FLOOR — the position an EMPTY-journal commit caches, and the one case in which it is the target
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **WHY THIS ARM IS ITS OWN CELL AND NOT A FOOTNOTE.** The journal's read answers `Absent` where it holds no
// entry, and **`restoreMark`'s ABSENT arm names the HEAD** — so once the attempt's own op is in the journal, no
// op id names the state that stood before it. **The mark therefore has a FLOOR row of its own** — the carrier's
// `F` tag, `crossing.rs`'s `JsOpIdArg::Floor`, which `codec.rs`'s `op_id_of` reads — and this cell drives it end
// to end.
//
// **⟶ AND THE CELL IS RE-DERIVED 2026-10-28 — `D-63`: THE MARK MOVES FORWARD WHEN A SWEEP VALIDATES, SO THE FLOOR
// IS THE OPENING'S CACHE AND NOT THE TARGET OF A COMMIT THAT PASSED.** *"After the constraint sweep ends in a
// valid state, bump the restore mark. The passing constraint state marks the new next valid state."* **WHAT THE
// OLD READING ASSERTED, AND WHY IT IS NOW WRONG, NAMED:** it read the cache INSIDE the listener and found the
// FLOOR there, because nothing moved the cache between the opening and the delivery; **from this date the delivery
// runs AFTER the bump, so the cache in flight there is the store's own position (the write's landing) and the
// refusal restores THAT.** **THE FLOOR IS STILL A TARGET, AND THE CELL STILL DRIVES IT AS ONE**: a commit whose
// sweep NEVER PASSES bumps nothing, so a refusal inside such a commit restores the opening's cache — the born
// state — and that is arm (b) below. **BOTH BOUNDARIES ARE MEASURED IN ARM (a)**: the cache the OPENING takes (read
// at the pass's own ask, before the bump) is the FLOOR, and the cache the DELIVERY sees (read in the listener body,
// after it) is the store's own `journalMark` at that instant.

test('DEF-AE (4) · THE MARK\'S FLOOR IS THE OPENING\'S CACHE AND THE BUMP CARRIES IT FORWARD: a commit that opened on an EMPTY journal caches the FLOOR at its opening, its passing sweep moves the cache to its own landing (so the refused reversal restores that landing), and a commit whose sweep NEVER PASSES still restores the born state — the address absent — which no op id could name', (t) => {
  // ── (a) THE OPENING'S FLOOR, AND THE BUMP'S TWO BOUNDARIES. ──────────────────────────────────
  const store = make();
  // THE JOURNAL IS EMPTY AT THIS INSTANT, and the store's own read says so.
  const markBeforeTheCall = storeMark(store);
  // THE OPENING'S CACHE, read INSIDE the pass's own ask — the sweep is in flight and the bump has not happened yet,
  // so this is exactly the position the opening cached.
  const opening = [];
  // AND THE CACHE IN FLIGHT AT THE DELIVERY, read inside the callback — after the bump — beside the store's own
  // position at that same instant, so the cache is measured against the store's answer and not a second spelling.
  const delivery = [];
  let deliveryMark = undefined;
  let inner = null;
  let inCommitOp = null;
  const asked = [];
  const handle = store.listen('def-ae-floor-listener', [['a']]);
  store.register(handle, () => {
    if (inner === null) {
      delivery.push(windowMark(store));
      deliveryMark = storeMark(store);
      // AND THE IN-COMMIT OP IS NAMED BY THE STORE'S OWN READ AT THIS INSTANT: the enclosing write's op is the
      // journal's head here, which is precisely the position the OLD restore mis-took for the pre-attempt state.
      inCommitOp = markSpelling(storeMark(store));
      inner = attempt(() => store.rollback(inCommitOp));
    }
  });
  // **THE PAIR ADMITS THE REGISTRATION ASK** (the address is absent then, and `D-39`'s registration evaluation
  // asks the state standing) **and REFUSES the absent state the reversal leaves** — decided by the ask's own
  // ordinal, so the arm is the restart's and not a registration refusal.
  const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'def-ae-floor' }, (context) => {
    asked.push(context.value);
    if (context.attempt !== null && opening.length === 0) opening.push(windowMark(store));
    if (asked.length > 1 && context.value === undefined) {
      return { message: 'the reversal leaves the address absent, which this pair does not admit' };
    }
    return true;
  }));
  const before = standingAt(store, ['a']);
  // THE ONE WRITE: the first this store ever makes, so its commit opened on an EMPTY journal.
  const terminal = attempt(() => store.write(['a'], 'mem', LANDED));
  const after = standingAt(store, ['a']);
  const caught = terminal.ok === false ? terminal.caught : null;
  const log = caught !== null && Array.isArray(caught.log) ? caught.log : [];

  assert.equal(markSpelling(markBeforeTheCall), 'Absent',
    `the store's own read on an EMPTY journal is the FLOOR — printed as Absent: `
      + `${JSON.stringify(markBeforeTheCall)}`);
  assert.equal(registered.ok, true,
    `the pair must REGISTER at the state standing then (nothing): the call caught `
      + `${JSON.stringify(registered.caught)}`);
  assert.equal(opening.length, 1,
    `the pass's own ask must have been taken inside the write's commit, where the window's cache is readable: the `
      + `drive took ${opening.length}`);
  assert.equal(markSpelling(opening[0]), 'Absent',
    `**THE CACHE THE OPENING TOOK IS THE FLOOR** — the journal held no entry when the commit opened, so the `
      + `position is the state the store was born with, printed as Absent: ${JSON.stringify(opening[0])}`);
  assert.equal(opening[0].k, 'F',
    `and its carrier is the mark's FLOOR row, which is a POSITION and not an op id: `
      + `${JSON.stringify(opening[0])}`);
  assert.equal(delivery.length, 1,
    `the listener body must have run once inside the write's commit: the drive took ${delivery.length}`);
  assert.equal(markSpelling(delivery[0]), markSpelling(deliveryMark),
    `**AND THE CACHE IN FLIGHT AT THE DELIVERY IS THE STORE'S OWN POSITION THERE — THE BUMP, MEASURED**: it read `
      + `${JSON.stringify(markSpelling(delivery[0]))} against the store's `
      + `${JSON.stringify(markSpelling(deliveryMark))}`);
  assert.equal(markSpelling(delivery[0]) !== markSpelling(opening[0]), true,
    `so the TWO BOUNDARIES ARE TOLD APART — the opening's ${JSON.stringify(markSpelling(opening[0]))} and the `
      + `delivery's ${JSON.stringify(markSpelling(delivery[0]))} — which is the whole of \`D-63\``);
  assert.equal(inCommitOp !== null, true,
    `the enclosing write's op must be nameable at the callback's instant — it is the HEAD there, which is the `
      + `position the old restore mis-took for the pre-attempt state`);
  assert.equal(inner.ok, true,
    `the reversal answers its record: the drive caught ${JSON.stringify(inner.caught)}`);
  assert.equal(terminal.ok, false,
    `the write must REFUSE: the pair refuses the state the reversal leaves. THE DRIVE ANSWERED ok (the store `
      + `stands at ${JSON.stringify(after)})`);
  assert.equal(caught.status, PASS_REFUSED,
    `the crossed status is the set's rank-\`20\` member: ${JSON.stringify(caught.status)}`);
  assert.equal(log.some((entry) => entry.id === 'def-ae-floor'), true,
    `the refusal names the pair: ${JSON.stringify(log)}`);
  assert.equal(before, undefined,
    `the address stood at nothing BEFORE the attempt: the drive read ${JSON.stringify(before)}`);
  assert.equal(after, LANDED,
    `**A VALIDATED EDIT STANDS — the address holds ${JSON.stringify(LANDED)}, the state the passing sweep `
      + `approved** — and neither the born state the opening's cache names nor the absent state the reversal `
      + `leaves: THE DRIVE READ ${JSON.stringify(after)}`);

  // ── (b) THE FLOOR AS THE TARGET: A COMMIT WHOSE SWEEP NEVER PASSES BUMPS NOTHING. ─────────────
  // **THE OTHER SIDE OF `D-63`'s PLACEMENT, DRIVEN SO THE FLOOR IS MEASURED AND NOT MERELY ASSERTED.** A pair body
  // reverses the attempt's OWN landing inside the pass and the pass then ends FAILING — no sweep passed, so
  // nothing bumped — and the restarted check refuses the absent state the reversal leaves. The compensation is the
  // reversal's own and it names the cache in flight: THE FLOOR. The store must stand at the state it was BORN with.
  const floorStore = make();
  const floorAsks = [];
  let reversedOnce = false;
  let floorInner = null;
  const floorRegistered = attempt(() => floorStore.addConstraint({ address: ['a'], id: 'def-ae-floor-2' }, (context) => {
    floorAsks.push(context.value);
    if (context.attempt !== null && reversedOnce === false) {
      reversedOnce = true;
      floorInner = attempt(() => floorStore.rollback(context.op.opId));
    }
    if (reversedOnce === true && context.value === LANDED) {
      return { message: 'the pair refuses the landing it has just reversed' };
    }
    if (floorAsks.length > 2 && context.value === undefined) {
      return { message: 'the reversal leaves the address absent, which this pair does not admit' };
    }
    return true;
  }));
  const floorTerminal = attempt(() => floorStore.write(['a'], 'mem', LANDED));
  const floorAfter = standingAt(floorStore, ['a']);
  const floorCaught = floorTerminal.ok === false ? floorTerminal.caught : null;

  assert.equal(floorRegistered.ok, true,
    `arm (b)'s pair must REGISTER at the absent state: the call caught `
      + `${JSON.stringify(floorRegistered.caught)}`);
  assert.equal(reversedOnce, true,
    `arm (b)'s body must have reversed the attempt's own landing inside the pass: the asks were `
      + `${JSON.stringify(floorAsks)}`);
  assert.equal(floorInner !== null && floorInner.ok === true, true,
    `and that reversal must have ANSWERED its record (a step inside an open attempt is not judged as a step): `
      + `${JSON.stringify(floorInner && floorInner.caught)}`);
  assert.equal(floorTerminal.ok, false,
    `arm (b)'s write must REFUSE — the sweep ends failing and the restarted check refuses the state the reversal `
      + `leaves; the drive answered ok (the store stands at ${JSON.stringify(floorAfter)})`);
  assert.equal(floorCaught.status, PASS_REFUSED,
    `and it crosses in the set's rank-\`20\` member: ${JSON.stringify(floorCaught.status)}`);
  assert.equal(floorAfter, undefined,
    `**NOTHING BUMPED, SO THE REFUSAL RESTORES THE OPENING'S CACHE — THE FLOOR — AND THE ADDRESS STANDS AT `
      + `NOTHING**, the state the store was born with, which no op id could name: THE DRIVE READ `
      + `${JSON.stringify(floorAfter)}`);

  t.diagnostic(`DEF-AE (4) · RE-DERIVED 2026-10-28 (\`D-63\`) · THE FLOOR AND THE BUMP: the store's own read on the `
    + `empty journal was ${JSON.stringify(markSpelling(markBeforeTheCall))}; the cache the OPENING took was `
    + `${JSON.stringify(markSpelling(opening[0]))} and the cache in flight when the DELIVERY ran was `
    + `${JSON.stringify(markSpelling(delivery[0]))}, the store's own position there `
    + `(${JSON.stringify(markSpelling(deliveryMark))}). The write landed ${JSON.stringify(LANDED)}, the callback `
    + `reversed that very op (${JSON.stringify(inCommitOp)}), the write threw `
    + `${JSON.stringify(caught.status)}, and the address stands at ${JSON.stringify(after)} — the VALIDATED `
    + `LANDING. ARM (b), WHERE NO SWEEP PASSED: asks ${JSON.stringify(floorAsks)}, the write threw `
    + `${JSON.stringify(floorCaught.status)} and the address stands at `
    + `${floorAfter === undefined ? 'NOTHING (absent) — the born state, restored' : JSON.stringify(floorAfter)}`);
});
