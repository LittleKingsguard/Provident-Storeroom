// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `U-STOREROOM-06 DELIVERY-SETTLE` — THE TWELVE CELLS OF `docs/specs/storeroom-delivery-settle/contract.md §6`,
// IN THE CONTRACT'S OWN ORDER, ONE `test()` PER CELL.
//
// **THE SCOPE SENTENCE THE CELLS DISCHARGE** (`contract.md §1`, verbatim): *"every body of a write's or a
// delete's delivered set is *started* in the one synchronous invocation loop, and the act's answer is
// *withheld* until that set has settled, and no package slot two suspended bodies can both reach may cross
// between them."* **THE UNIT IS PACKAGE-ONLY** (`§1`): no store byte, no addon entry, no Rust file, no `cfg`
// key, no status. **NOTHING HERE DRIVES THE STORE'S OWN BEHAVIOUR** and no cell claims it.
//
// **THE TWELVE, AND THE PIN EACH NAMES** (`contract.md §4`; the cell map is `§6`):
//   `S-SLOTS-1` `PIN-7`,`PIN-8` · `S-SETTLE-1` `PIN-1`,`PIN-2`,`PIN-9` · `S-SLOTS-2` `PIN-7` ·
//   `S-SLOTS-3` `PIN-7` · `S-SLOTS-4` `PIN-7` · `S-SLOTS-5` `PIN-7` · `S-SETTLE-2` `PIN-1`,`PIN-3` ·
//   `S-REJECTED-BODY` `PIN-5`,`PIN-10` · `S-REJECTED-BODY-PLURAL` `PIN-3`,`PIN-5`,`PIN-9` ·
//   `S-SYNCTHROW` `PIN-4` · `S-RECEIPT-ACCESSOR` `PIN-10`,`PIN-12` · `S-SETTLE-3` `PIN-6`,`PIN-11`.
// **`S-A112` IS `OWED` AND NO CELL IS WRITTEN FOR IT** (`§6`, closing line; `§9` residual `4`).
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE THREE RULES THAT BIND EVERY BLOCK BELOW, STATED ONCE SO NO SINGLE BLOCK HAS TO RE-STATE THEM.
//
// **1. `PIN-3` — NO ORDER IS ASSERTED.** *"`DD-22` read at the datum: no clause promises an invocation order,
// an arrival order among rejections, or an index-to-index correspondence between the started and the settled
// set; a drive compares sets and multisets, never sequences."* (`contract.md §4`, `PIN-3`; `DD-22`'s own
// sentence, quoted at `delivery.mjs:126`–\`:128\`: *"a drive compares sets, never sequences"*.) **SO EVERY
// COLLECTION BELOW IS READ THROUGH `asSet` (a de-duplicating SORT) OR AS A COUNT, NEVER AS A SEQUENCE** — and
// where a collection's ORDER is legible at all (a JS object's own string keys are read in insertion order,
// `design.md §5`: *"the **arrival** order of `N` rejections is observable through `Object.keys(failures)`"*),
// the block says so at its assertion and refuses to assert it.
//
// **2. `D-17`** — the expectation is a literal here and the citation is a comment: **no `docs/**` path is
// opened at runtime** and no clause is parsed. **`D-21`** — a block that cannot reach its arm asserts THE
// DRIVE'S OWN COHERENCE FIRST and says so instead of reporting a verdict.
//
// **3. NO BLOCK PASSES VACUOUSLY.** Wherever a block's premise is *a body that suspends*, the drive proves
// the body suspended: a mark set **after** an `await`, which the block asserts was reached. A body that
// happens to stay synchronous cannot make a block green.
//
// **THE INSTRUMENTS, AND WHY THESE AND NOT OTHERS.** The entry is imported **exactly as a consumer does**
// (`'../../bindings/js/index.mjs'`, `O4`'s reach-by-path rule; no cell here claims the packaged resolution)
// and its `storeCreate` is the only product constructor used. **`openCommits` and `currentWindow` are imported
// from `bindings/js/src/entry/state.mjs`**, and that import is this contract's own instrument, not an
// invention: `contract.md §10` ran `M-0` by importing exactly those two — *"It imports the entry's own
// internal accessors — `openCommits` and `currentWindow` from `bindings/js/src/entry/state.mjs` — because that
// is the only place the commit count is readable, and a test may import them."* They are read **only** where
// the observable is the commit count or the window in flight (`S-SLOTS-1`, `S-SLOTS-5`), and nowhere else.
//
// **D-45 IS WHY A BODY'S OWN VERB IS A LEGAL INSTRUMENT HERE** (architect, verbatim: *"A listener is an
// externally-passed function and should be making calls at the package surface. It should be opening a new
// commit by default of entering at the surface."*): every nested write below is issued from a *body* or from a
// *continuation*, names no commit, and therefore opens its own (`tests/e2e/external-commit.test.mjs` prints
// both figures). **NO CELL BELOW PASSES A COMMIT TO A BODY'S OWN WRITE EXCEPT WHERE THE KERNEL'S OWN REPAIR
// ROUTE REQUIRES IT** (`D-46`'s fourth position; the form `tests/e2e/repair-listener-delivery.test.mjs`
// drives).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { currentWindow, openCommits } from '../../bindings/js/src/entry/state.mjs';

// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE FILE-LOCAL HELPERS. **NO HELPER LIVES OUTSIDE THIS FILE** and none is imported from a sibling test: a
// block's instruments are its own. (`contract.md §6` is the register of the twelve; this is a test file, not
// a support module.)
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

/** One store per drive, constructed by the package's own call and by nothing else. **`mem` tier throughout**:
 *  M-0 and the four drives of `strata/research.md §22.12` all ran `storeCreate({journalLength: 16, listeners:
 *  []})` — *"`mem` tier, no `filePath`, hence **no file I/O on any arm**"* — and no cell here needs a file. */
const make = () => storeCreate({ journalLength: 64, listeners: [] });

/** Run `fn`; answer the thrown value as a value, so a throw is a reading and never a crash. Total. */
function captured(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The `status` of a thrown surface form, as a readable value (`undefined` where the value carries none). */
const statusOf = (thrown) => (thrown !== null && typeof thrown === 'object' ? thrown.status : undefined);

/** The `message` of a thrown surface form, as a readable value. */
const messageOf = (thrown) => (thrown !== null && typeof thrown === 'object' ? thrown.message : undefined);

/** **IS THE VALUE A THENABLE** — `PIN-6`'s and `PIN-11`'s whole subject, read as a `typeof` and never as a
 *  guess: *"`Object.keys` must be the three. **Assert `typeof answer.then !== 'function'`**"* (`contract.md
 *  §4`, `PIN-6`). Read on both an object and a function, because a function may carry a `then` too. */
const isThenable = (value) => (
  value !== null
  && (typeof value === 'object' || typeof value === 'function')
  && typeof value.then === 'function'
);

/** **A SET READING AND NEVER A SEQUENCE** (`PIN-3`; `DD-22`): de-duplicate, then sort. Two collections are
 *  the same set iff these answers are equal — and no index of one is ever compared to an index of the other. */
const asSet = (list) => [...new Set(list)].sort();

/** The members of a returned set, read as a SET (`DD-22`: the store's list has no declared order). */
const handlesOf = (returned) => (Array.isArray(returned) ? returned.map((element) => (
  element === null || typeof element !== 'object' ? element : element.handle
)) : []);

/** The `opId`s a log names, as a SET. A log entry's own members are `{kind, id, opId, message, state}`
 *  (`bindings/js/src/entry/kernel-foundations.mjs:1062`–\`:1068\`, `D-65`'s five-member entry), so `opId` is the
 *  one column a drive reads when it asks *"does this commit's list name that write?"*. */
const opIdsIn = (log) => asSet((Array.isArray(log) ? log : [])
  .map((entry) => (entry !== null && typeof entry === 'object' ? entry.opId : undefined))
  .filter((opId) => typeof opId === 'string'));

/** The `kind`s a log carries, as a SET. Used where the question is *"did a `repair-run` entry land here?"*. */
const kindsIn = (log) => asSet((Array.isArray(log) ? log : [])
  .map((entry) => (entry !== null && typeof entry === 'object' ? entry.kind : undefined))
  .filter((kind) => typeof kind === 'string'));

/** A store `read`, answered as a VALUE so a missing address is a reading and not a crash. */
function readOf(store, address, tier) {
  const answer = captured(() => (tier === undefined ? store.read(address) : store.read(address, tier)));
  return answer.ok ? answer.value : `<${statusOf(answer.caught)}>`;
}

/** **THE ACCESSOR AS READ OFF THE RECORD, WITHOUT READING IT AS A PLAIN MEMBER.** `bodyFailures` is declared a
 *  non-`enumerable`, `configurable` own GETTER (`contract.md §4`, `PIN-10`; `design.md §5`), so a drive reads its
 *  DESCRIPTOR first and its VALUE second — and an absent member is a reading (`undefined`) rather than a crash. */
function memberOf(record, name) {
  if (record === null || typeof record !== 'object') return { present: false, descriptor: undefined, value: undefined };
  const descriptor = Object.getOwnPropertyDescriptor(record, name);
  return {
    present: descriptor !== undefined,
    descriptor,
    // A getter is INVOKED here; a data property is handed over. Either way the caller gets what a consumer
    // reading `record.bodyFailures` gets, which is the surface's own answer.
    value: descriptor === undefined ? undefined : record[name],
  };
}

/** **A GATE** — one promise plus the one function that opens it. `design.md §7` arm `4` makes a never-opened
 *  gate a *declared* state (*"the settle never happens … the answer is withheld, and that means withheld"*), so
 *  a block that holds a gate forever is asserting that law and not leaking a timer: **no timeout is armed
 *  anywhere in this file** (`contract.md:602`: a timer is a scheduler). */
function gateOf() {
  const held = { open: null, promise: null };
  held.promise = new Promise((resolve) => { held.open = resolve; });
  return held;
}

/** One turn of the event loop, and one that is **not** a timer: `setImmediate`. `S-SETTLE-2`'s own gate is
 *  opened from the continuation of one of these — *"one listener awaits a gate opened by a later
 *  `setImmediate`"* (`contract.md §6`). */
const drain = () => new Promise((resolve) => { setImmediate(resolve); });

/** **THE UNHANDLED-REJECTION COUNTER** — `strata/research.md §22.12`'s fifth drive, installed.
 *
 *  **WHAT IT MEASURES, VERBATIM** (`§22.12` (3), `M-2`): *"An `async` body's rejection never reaches the
 *  caller, and kills the process after the caller has been answered."* Without a handler the measured shape is
 *  `exit 1`, the body's error as an uncaught exception, and `survived the drain` never printing.
 *
 *  **IT IS INSTALLED, NOT AVOIDED.** A block whose bodies reject without a counter would take the whole test
 *  process down and make the red illegible; with the counter the same fact is a COUNT (`0` where the law
 *  holds). It is removed in a `finally` so no sibling block inherits it. */
function countUnhandled() {
  const seen = [];
  const listener = (reason) => { seen.push(reason); };
  process.on('unhandledRejection', listener);
  return { seen, stop: () => { process.off('unhandledRejection', listener); } };
}

/** The class of a captured answer, as a readable string (used where a block's diagnostic prints an arm). */
const armOf = (answer) => (answer.ok ? 'returned' : `threw ${JSON.stringify(statusOf(answer.caught))}`);

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 1 OF 12 · `S-SLOTS-1` — **RUNS FIRST** (`contract.md §6`: *"`S-SLOTS-1` RUNS FIRST: it is the falsifying
// drive of `§2`'s `M-0`, and if it is red the spine is wrong and no later cell means anything."*)
//
// THE PINS: `PIN-7` (the five slots do not cross) and `PIN-8` (the slot's lifetime is one synchronous span).
// THE RULING, `D-130` ITEM 5's LAST SENTENCE, as `contract.md §4` `PIN-7` reads it: **"nothing suspends inside a
// commit bracket, an invocation bracket, or a registration's catch"** — and, in the design's own words
// (`design.md §4`, slot 1's device), *"(C) + the no-await rule. For a *delivered* body the name is `undefined`
// at both ends by construction … the depth's one consumer (`openCommit:674`–\`:675\`) is reached with
// `index.open === 0` (no bracket spans a microtask), so its fallback answers the **declared** OPEN of `D-45`
// though the depth it reads is the restored one — **same answer, second route**."*
// THE OBSERVABLE, `contract.md §6` row 1, VERBATIM: *"two suspended bodies each read `openCommits(store)` before
// and after their own `write` — each reads `1` then `0`, never `2`; the two `op.opId`s differ and neither body's
// `op` appears in the other's commit `log`; **the variant registers a constraint pair at the body's own address
// and asserts the body's `op` is absent from the triggering commit's `log`**"*.
//
// **WHERE THE CONTRACT'S `1` IS READ, AND WHY NOT WHERE IT IS NOT.** `contract.md §10` measured `M-0` on this
// very tree and its transcript is the baseline this block re-takes: `["body:sync-part",1,2]` — the commit IS
// open inside the body's synchronous span — and `["body:post-await-BEFORE-write",0,0]` — *"★ AT THE SUSPENDED
// CONTINUATION NO BRACKET STANDS OPEN"*. **So `1` is read INSIDE the act's window and `0` AT the continuation,
// and the invariant both readings serve is the one the pin states in one word: NEVER `2`.** A block that
// asserted `1` at a post-suspension sample would be red against a correct implementation and would be a defect
// of its own; the block below asserts the `1`, the two `0`s, and `max ≤ 1` at every sample, and prints all
// three so no reader has to take the mapping on trust.
//
// **AND THE SECOND ARM IS THE VARIANT `§10` NAMES AS THE REAL TEST** (`§10` (c): *"the real test of `PIN-7` is
// `S-SLOTS-1`'s variant after this unit's own `await` exists"*): a constraint pair registered AT THE BODY'S OWN
// ADDRESS, so that the body's write runs a pass of its own over a pair — and the assertion that the body's `op`
// is absent from the TRIGGERING commit's `log`. **THE SHARPER OBSERVABLE THE SAME CLAUSE CARRIES, ADDED BECAUSE
// IT IS THE ONE A JOIN CANNOT SURVIVE:** a write that JOINED an enclosing commit answers `log: []` — the JOINED
// arm is the one `resolutionLogOf` answers `undefined` for (`bindings/js/src/entry/constraints.mjs:1991`–\`:1994\`;
// `index.d.ts:670`–\`:673\`: *"a call that JOINED an enclosing commit … answers `[]`"*) — while a write that
// opened its own commit appends its `commit` entry unconditionally (`index.d.ts:656`–\`:657\`: *"A passing write
// over a store carrying NO pair answers ONE entry, `kind === 'commit'`"*). **So `log` is non-empty exactly when
// the write was its own act, and that is asserted beside the contract's own sentence.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-SLOTS-1 · THE COMMIT COUNT AT A SUSPENDED BODY\'S OWN WRITE (`PIN-7`, `PIN-8`) · arm (a): the count is `1` inside the body\'s synchronous span and `0` at its own post-suspension continuation, NEVER `2`; its own write opens and closes its own commit; and — the variant — a pair at the body\'s own address is asked under that body\'s own commit and the body\'s `op` stands in no other commit\'s `log`', async (t) => {
  // ── ARM (a) · THE BASE DRIVE — `M-0`'s own shape, re-taken as a cell. ──────────────────────────────────
  const store = make();
  const samples = [];
  const gate = gateOf();
  let suspended = false;
  let completed = false;
  let inner = null;

  store.listen('slots1-h', [['slots1-a']]);
  store.register('slots1-h', async () => {
    // THE BODY'S SYNCHRONOUS SPAN — the delivery instant, inside the triggering write's own commit bracket
    // (`index.mjs:598` / `:760`), which is `M-0`'s `["body:sync-part",1,2]` sample.
    samples.push({ at: 'sync', open: openCommits(store), window: currentWindow(store) });
    await gate.promise;
    suspended = true;
    samples.push({ at: 'before-own-write', open: openCommits(store), window: currentWindow(store) });
    inner = captured(() => store.write(['slots1-b'], 'mem', 9));
    samples.push({ at: 'after-own-write', open: openCommits(store), window: currentWindow(store) });
    completed = true;
  });

  const beforeOuter = openCommits(store);
  const outer = captured(() => store.write(['slots1-a'], 'mem', 1));
  const afterOuter = openCommits(store);
  gate.open();
  await drain();
  await drain();

  const sampleOf = (name) => samples.find((sample) => sample.at === name);
  const syncSample = sampleOf('sync');
  const beforeOwnWrite = sampleOf('before-own-write');
  const afterOwnWrite = sampleOf('after-own-write');
  const opens = samples.map((sample) => sample.open);

  // ── (a.0) THE DRIVE REACHED ITS ARM. ───────────────────────────────────────────────────────────────────
  assert.equal(outer.ok, true,
    `THE OUTER WRITE MUST STAND — its only body resolves, so nothing refuses: the call ${armOf(outer)}`);
  assert.equal(syncSample !== undefined, true,
    `THE BODY MUST BE INVOKED AT ALL, or the count was read about no delivery: the drive recorded `
      + `${JSON.stringify(samples)}`);
  assert.equal(suspended && completed, true,
    `**THE BODY MUST ACTUALLY SUSPEND AND ITS CONTINUATION MUST BE REACHED** — a block that passes whether or `
      + `not the body suspended is a defect (§6's own rule): reached-after-await = ${JSON.stringify({ suspended, completed })}`);

  // ── (a.1) THE BASELINE `M-0` MEASURED, RE-TAKEN: THE BRACKET CLOSES BEFORE THE VERB RETURNS. ────────────
  assert.equal(beforeOuter, 0,
    `nothing stands open before the write: ${beforeOuter}`);
  assert.equal(syncSample.open, 1,
    `**THE COMMIT IS OPEN INSIDE THE BODY'S SYNCHRONOUS SPAN** — \`M-0\`'s \`["body:sync-part",1,2]\` `
      + `(\`contract.md §10\`), the delivery instant: the drive read ${JSON.stringify(syncSample)}`);
  assert.equal(afterOuter, 0,
    `**AND IT HAS CLOSED BY THE TIME THE VERB RETURNED** (\`contract.md §10\`: `
      + `\`["after-outer-write-returned",0,0]\` — *"the bracket closes before the verb returns"* is the `
      + `BASELINE the unit must preserve): the drive read ${afterOuter}`);

  // ── (a.2) THE SUBJECT — `0` AT THE CONTINUATION, AND NEVER `2` ANYWHERE. ────────────────────────────────
  assert.equal(beforeOwnWrite.open, 0,
    `**★ AT THE SUSPENDED CONTINUATION NO BRACKET STANDS OPEN** — \`contract.md §10\`'s `
      + `\`["body:post-await-BEFORE-write",0,0]\`, the measurement the falsifying drive of \`§2\`'s \`M-0\` `
      + `exists for: **the condition \`P-5\`'s MUST NOT needs in order to be crossed silently does not stand on `
      + `this path** (\`state.mjs:674\`–\`:675\`'s depth fallback is never reached with a commit open). The drive `
      + `read ${JSON.stringify(beforeOwnWrite)}`);
  assert.equal(afterOwnWrite.open, 0,
    `**AND THE BODY'S OWN WRITE OPENED ITS OWN COMMIT AND CLOSED IT SYNCHRONOUSLY** — \`M-0\`'s `
      + `\`["body:post-await-AFTER-write",0,0]\`: the drive read ${JSON.stringify(afterOwnWrite)}`);
  assert.equal(Math.max(...opens) <= 1, true,
    `**NEVER \`2\`** (\`contract.md §6\` row 1: *"each reads \`1\` then \`0\`, **never \`2\`**"*): a \`2\` is a `
      + `bracket of the triggering act standing open across the suspension, which is exactly the crossing `
      + `\`PIN-7\`'s slot 1 forbids. Every sample read ${JSON.stringify(opens)}`);
  assert.equal(inner.ok, true,
    `and the body's own write must land and answer its own record: it ${armOf(inner)}`);

  const innerRecord = inner.ok ? inner.value : null;
  // **⟶ REPAIRED AT THIS LINE, 2026-11-17, AFTER THE IMPLEMENTATION LANDED — THE ANSWER IS A THENABLE**
  // (`PIN-2`: *"the answer is withheld until the delivered set has settled"*). **`M-0`'s probe read the record
  // synchronously because no withhold existed then; the cell is the same reading taken after the gate, which is
  // the only instant at which the record exists.**
  const outerRecord = outer.ok ? await outer.value : null;
  assert.notEqual(innerRecord.op.opId, outerRecord.op.opId,
    `**THE TWO \`op.opId\`s DIFFER** (\`contract.md §6\` row 1) — the body's write is its own operation and not a `
      + `second landing of the outer act's: the drive read ${JSON.stringify([innerRecord.op.opId, outerRecord.op.opId])}`);
  assert.deepEqual(opIdsIn(outerRecord.log).includes(innerRecord.op.opId), false,
    `**AND NEITHER BODY'S \`op\` APPEARS IN THE OTHER'S COMMIT \`log\`** (\`contract.md §6\` row 1, the base arm's `
      + `second half) — here the "other" commit is the TRIGGERING one, and its list is the one the body's write `
      + `would have joined had a bracket stood open: \`outer.log\` names `
      + `${JSON.stringify(opIdsIn(outerRecord.log))} and the body's write landed ${JSON.stringify(innerRecord.op.opId)}`);
  assert.equal(Array.isArray(innerRecord.log) && innerRecord.log.length >= 1, true,
    `**AND THE BODY'S OWN WRITE OWNS A COMMIT — ITS \`log\` IS NOT THE JOINED ARM'S \`[]\`** `
      + `(\`index.d.ts:670\`–\`:673\`: *"a call that JOINED an enclosing commit … answers \`[]\`, because that `
      + `commit's list has not crossed and this call owns none of it"*\`, read beside \`:656\`–\`:657\`: *"A passing `
      + `write over a store carrying NO pair answers ONE entry, \`kind === 'commit'\`"\`): the drive read `
      + `${JSON.stringify(innerRecord.log)}`);

  // ── ARM (b) · THE VARIANT `§10` NAMES — A PAIR AT THE BODY'S OWN ADDRESS. ───────────────────────────────
  //
  // **THIS IS THE DRIVE \`contract.md §10\` (c) SAYS THE UNIT'S REAL TEST IS** (*"the real test of `PIN-7` is
  // `S-SLOTS-1`'s variant after this unit's own `await` exists"*), and it is taken on a SECOND store so the two
  // arms cannot contaminate each other's samples.
  const variant = make();
  variant.write(['slots1-vb'], 'mem', 1); // the state the pair is registered against — it admits it
  const pairAsks = [];
  const pairAdded = captured(() => variant.addConstraint({ address: ['slots1-vb'], id: 'slots1-pair' }, (context) => {
    // **THE PAIR READS THE COUNT AT ITS OWN ASK** — the one instant a pass runs (K-3), and the honest place to
    // read the "`1`" half of the contract's figure: the body's own commit is the one commit in flight there.
    pairAsks.push({
      open: openCommits(variant),
      window: currentWindow(variant),
      op: context.op === null || context.op === undefined ? null : context.op.opId,
      value: context.value === undefined ? null : context.value,
    });
    return true;
  }));
  const vGate = gateOf();
  let vSuspended = false;
  let vInner = null;
  variant.listen('slots1-vh', [['slots1-va']]);
  variant.register('slots1-vh', async () => {
    await vGate.promise;
    vSuspended = true;
    vInner = captured(() => variant.write(['slots1-vb'], 'mem', 21));
  });
  const vOuter = captured(() => variant.write(['slots1-va'], 'mem', 1));
  vGate.open();
  await drain();
  await drain();

  const vInnerRecord = vInner !== null && vInner.ok ? vInner.value : null;
  const vOuterRecord = vOuter.ok ? await vOuter.value : null;   // the withhold, as at `:284`
  const asksUnderAnOp = pairAsks.filter((ask) => ask.op !== null);

  assert.equal(pairAdded.ok, true,
    `**THE PAIR MUST REGISTER** — at the registration ask it is handed the state standing there, ${'`1`'}, and `
      + `admits it: the call ${armOf(pairAdded)}`);
  assert.equal(vOuter.ok, true,
    `the variant's outer write must stand: the call ${armOf(vOuter)}`);
  assert.equal(vSuspended, true,
    `**AND ITS BODY MUST ACTUALLY SUSPEND** — the continuation was reached: ${JSON.stringify(vSuspended)}`);
  assert.equal(vInnerRecord !== null, true,
    `and its own write must land: the call ${vInner === null ? 'never ran' : armOf(vInner)}`);
  assert.equal(asksUnderAnOp.length >= 1, true,
    `**THE PAIR AT THE BODY'S OWN ADDRESS MUST BE ASKED UNDER AN OP** — that is the body's write's own pass, and `
      + `so the pass this variant exists to run: the drive recorded ${JSON.stringify(pairAsks)}`);
  assert.deepEqual(asSet(asksUnderAnOp.map((ask) => ask.open)), [1],
    `**AND THAT PASS RUNS WITH EXACTLY ONE COMMIT OPEN — THE BODY'S OWN** (\`contract.md §6\` row 1's \`1\`, read `
      + `where it is true): a \`2\` here is the triggering act's bracket standing open beside the body's own, `
      + `which is the crossing; a \`0\` would be a pass in no commit at all. The drive read `
      + `${JSON.stringify(asksUnderAnOp)}`);
  assert.deepEqual(asSet(asksUnderAnOp.map((ask) => ask.value)), [21],
    `and it is asked at the value the body's own write landed: ${JSON.stringify(asksUnderAnOp.map((ask) => ask.value))}`);
  assert.notEqual(vInnerRecord.op.opId, vOuterRecord.op.opId,
    `**THE TWO OP IDENTITIES DIFFER** — the body's write landed as its own operation: `
      + `${JSON.stringify([vInnerRecord.op.opId, vOuterRecord.op.opId])}`);
  assert.deepEqual(opIdsIn(vOuterRecord.log).includes(vInnerRecord.op.opId), false,
    `**AND THE BODY'S \`op\` IS ABSENT FROM THE TRIGGERING COMMIT'S \`log\`** — \`contract.md §6\` row 1's variant, `
      + `VERBATIM: *"the variant registers a constraint pair at the body's own address and asserts the body's `
      + `\`op\` is absent from the triggering commit's \`log\`"*. The triggering commit's list names `
      + `${JSON.stringify(opIdsIn(vOuterRecord.log))}; the body's write landed `
      + `${JSON.stringify(vInnerRecord.op.opId)}`);
  assert.equal(Array.isArray(vInnerRecord.log) && vInnerRecord.log.length >= 1, true,
    `**AND THE BODY'S WRITE OWNS ITS OWN LIST** — a JOIN carries \`[]\` (\`index.d.ts:670\`–\`:673\`) and this one `
      + `carries ${JSON.stringify(vInnerRecord.log)}`);
  assert.deepEqual(vInnerRecord.op.address, ['slots1-vb'],
    `and it landed at ITS OWN address: ${JSON.stringify(vInnerRecord.op.address)}`);

  t.diagnostic(`S-SLOTS-1 · THE COMMIT COUNT (\`PIN-7\`, \`PIN-8\`; the falsifying drive of §2's \`M-0\`): arm (a) — `
    + `the body's samples read ${JSON.stringify(samples)} (max ${Math.max(...opens)}, never \`2\`), the outer `
    + `verb's count ${JSON.stringify([beforeOuter, afterOuter])}, the body's own write landed `
    + `${JSON.stringify(innerRecord.op.opId)} beside the outer's ${JSON.stringify(outerRecord.op.opId)}, `
    + `\`outer.log\` = ${JSON.stringify(opIdsIn(outerRecord.log))}, \`inner.log\` = `
    + `${JSON.stringify(opIdsIn(innerRecord.log))}; arm (b) — the pair at \`["slots1-vb"]\` was asked `
    + `${pairAsks.length}× with ${JSON.stringify(pairAsks)}, the body's write landed `
    + `${JSON.stringify(vInnerRecord.op.opId)} beside the triggering `
    + `${JSON.stringify(vOuterRecord.op.opId)}, and the triggering commit's list names `
    + `${JSON.stringify(opIdsIn(vOuterRecord.log))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 2 OF 12 · `S-SETTLE-1` — `PIN-1` (start-all), `PIN-2` (the withhold and its one scope), `PIN-9` (the
// settle is total and it is the answer's only wait).
//
// THE RULINGS. **`PIN-1`, verbatim:** *"Every member of the delivered set whose registry slot holds a function
// is **started** before the answer is given, in the one shipped loop, and the started set's membership equals
// the delivered set's minus the kind-skipped and the absent."* **`PIN-2`, verbatim:** *"The answer is withheld
// until the delivered set has settled — and **only** where an answer exists."* **`PIN-9`, verbatim:** *"Every
// started body's outcome is **final** before the answer arrives: the answer resolves after the last settlement
// and after no other event; the count of started bodies equals the deduplicated triggered set's count; and each
// started body's continuation is observed before the answer."* **And `D-130` item 4's own sentence, as
// `design.md §6` reads it:** *"No order is asserted among bodies, by construction … **A drive may compare the
// membership of the started set, the membership of the settled set, the multiset of outcomes, and the phase
// boundary (every start precedes every resume) — never an index-to-index correspondence.**"*
//
// **WHY THE THREE LISTENERS STAND AT ONE ADDRESS AND NOT AT THREE.** `design.md §8` prints the drive as
// *"three listeners at `['a']`,`['b']`,`['c']` … `const answer = write(['a'],'mem',1)`"*, and **that literal
// drive cannot reach the arm**: the store's trigger test is prefix-based (a listener at `['a']` fires for a
// write at `['a']` and at `['a','b']`, `external-commit.test.mjs`'s descendant drive), so **three distinct
// addresses are never all prefixes of one write's address and only one of the three would ever be started.**
// The pin's subject is the DELIVERED SET's membership, and three distinct handles at one address give a
// delivered set of exactly three — which is what the contract's `PIN-1` and `PIN-9` count (`contract.md §6` row
// 2: *"three listeners each record `start` then await one shared gate"*). **THE HANDLES ARE DISTINCT AND THE
// SETS BELOW ARE COMPARED BY HANDLE, NEVER BY POSITION** (`PIN-3`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-SETTLE-1 · THE WITHHOLD AND ITS TOTALITY (`PIN-1`, `PIN-2`, `PIN-9`) — three bodies are ALL started before the answer and every one of them before the gate opens; the answer is a thenable while they hang and NO drain resolves it; and the settled set\'s membership EQUALS the started set\'s, read as sets', async (t) => {
  const store = make();
  const gate = gateOf();
  const started = [];
  const resumed = [];
  const handles = ['settle1-h1', 'settle1-h2', 'settle1-h3'];
  for (const handle of handles) {
    store.listen(handle, [['settle1-a']]);
    store.register(handle, async () => {
      started.push(handle);
      await gate.promise;
      resumed.push(handle);
      return handle;
    });
  }

  const answer = store.write(['settle1-a'], 'mem', 1);
  const atReturn = {
    thenable: isThenable(answer),
    started: asSet(started),
    resumed: asSet(resumed),
  };
  let arrived = false;
  let resolved = null;
  let resumedAtResolution = null;
  if (isThenable(answer)) {
    answer.then((value) => {
      arrived = true;
      resumedAtResolution = asSet(resumed);
      resolved = value;
    });
  }
  // ONE FULL TURN WITH THE GATE STILL SHUT — if the answer could arrive without the delivered set, it would
  // arrive here, and the block would say so instead of asserting a withhold it never measured.
  await drain();
  const oneTurnLater = { arrived, resumed: asSet(resumed) };
  gate.open();
  const settled = isThenable(answer) ? await answer : null;

  // ── (a) THE WITHHOLD: A THENABLE, AND NOTHING RESOLVES IT BUT THE SET'S SETTLEMENT. ────────────────────
  assert.equal(atReturn.thenable, true,
    `**THE ANSWER IS A THENABLE** (\`contract.md §6\` row 2: *"the answer is a thenable"*; \`PIN-2\`: *"the answer `
      + `is withheld until the delivered set has settled"*). The call answered `
      + `${JSON.stringify(atReturn.thenable ? 'a thenable' : typeof answer)} — a record here is the unit's `
      + `whole subject missing`);
  assert.equal(oneTurnLater.arrived, false,
    `**AND ONE TURN LATER IT HAS NOT ARRIVED** — no scheduler, no flush and no microtask resolves it; the only `
      + `event that may (\`PIN-9\`: *"the answer resolves after the last settlement and after no other event"*) is `
      + `the three bodies' settlement, which is still hanging: arrived = ${JSON.stringify(oneTurnLater.arrived)}`);

  // ── (b) `PIN-1` — START-ALL, BEFORE THE GATE OPENS AND BEFORE THE ANSWER. ─────────────────────────────
  assert.deepEqual(atReturn.started, asSet(handles),
    `**ALL THREE ARE STARTED BEFORE THE ANSWER IS GIVEN** (\`PIN-1\`, verbatim: *"Every member of the delivered `
      + `set whose registry slot holds a function is **started** before the answer is given, in the one shipped `
      + `loop"*): the drive read ${JSON.stringify(atReturn.started)} of ${JSON.stringify(asSet(handles))}`);
  assert.deepEqual(atReturn.resumed, [],
    `**AND NONE OF THEM HAS RESUMED** — the drive's own premise, that all three really suspend: `
      + `${JSON.stringify(atReturn.resumed)}`);

  // ── (c) `PIN-9` — THE SETTLED SET'S MEMBERSHIP EQUALS THE STARTED SET'S, AS SETS. ──────────────────────
  assert.equal(settled !== null, true,
    `the answer must have resolved once the gate opened: the call answered ${JSON.stringify(settled)}`);
  assert.deepEqual(resumedAtResolution === null ? ['<the answer never resolved>'] : resumedAtResolution,
    atReturn.started,
    `**THE SETTLED SET'S MEMBERSHIP EQUALS THE STARTED SET'S** (\`PIN-9\`: *"each started body's continuation is `
      + `observed before the answer"*; \`PIN-3\`: the comparison is a SET comparison and never an index-to-index `
      + `correspondence). At the instant the answer resolved the drive had observed `
      + `${JSON.stringify(resumedAtResolution)}; the started set was ${JSON.stringify(atReturn.started)}`);
  assert.deepEqual(asSet(resumed), atReturn.started,
    `and the same reading after the fact: ${JSON.stringify(asSet(resumed))}`);
  assert.deepEqual(asSet(Object.keys(settled)), ['op', 'triggered', 'watched'],
    `**AND THE ANSWER'S RECORD IS THE RECORD A PLAIN WRITE ANSWERS** — the settle resolves WITH the act's own `
      + `\`WriteRecord\` (\`design.md §2\`: *"the write **resolves** with that same record"*), whose enumerable `
      + `set is the declared three (\`PAR-JS-13\`): the drive read ${JSON.stringify(Object.keys(settled))}`);

  t.diagnostic(`S-SETTLE-1 · THE WITHHOLD: at the return the started set read ${JSON.stringify(atReturn.started)} `
    + `and the resumed set ${JSON.stringify(atReturn.resumed)}; one turn later arrived=`
    + `${JSON.stringify(oneTurnLater.arrived)} with resumed ${JSON.stringify(oneTurnLater.resumed)}; after the gate `
    + `the answer resolved and the resumed set read ${JSON.stringify(resumedAtResolution)} — **EQUAL AS SETS**, and `
    + `the resolved record's keys ${JSON.stringify(Object.keys(settled))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 3 OF 12 · `S-SLOTS-2` — `PIN-7`, slot 2 of the five: `state.legDelivery`.
//
// THE RULING AND THE CROSSING, `D-130` ITEM 5's last sentence as `design.md §4` (slot `state.legDelivery`)
// states it, VERBATIM: *"a `delete` holding `'member'` across a suspension makes an interleaved write's
// terminal arm **skip its delivery silently** — no code, no log, no throw"*. **THE DEVICE:** *"(C): the flag is
// already captured into `standingDelivery` (`:855`) and restored in a `finally`; the design's rule puts **the
// wait outside that `finally`**, so the `'arm'`/`'member'` window covers only the synchronous act."*
// **THE OBSERVABLE, `contract.md §6` row 3, VERBATIM:** *"a `delete`-fired listener suspends; from its
// continuation the caller writes at an address carrying its own listener — that listener fires (count `1`, not
// `0`) and the delete still answers its full `triggered` set."*
//
// **THE ZERO THIS BLOCK EXISTS TO CATCH IS SILENT** — no refusal, no log entry, no throw (`D-130` item 5's own
// words) — **so the instrument is a COUNT and the control is inside the same block**: the count of the second
// listener's invocations, read after the continuation ran, beside the delete's own answer still carrying its
// full set.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-SLOTS-2 · THE DELETE\'S FLAG DOES NOT REACH ITS SUSPENDED BODY\'S WRITE (`PIN-7`, slot 2) — a `delete`-fired body suspends; the write it issues from its continuation fires ITS OWN listener (count `1`, not the silent `0`), and the delete still answers its full `triggered` set', async (t) => {
  const store = make();
  store.write(['slots2-d'], 'mem', 1); // the delete must remove something, or it is the `D-3` arm
  const gate = gateOf();
  let suspended = false;
  let innerWrite = null;
  store.listen('slots2-del', [['slots2-d']]);
  store.register('slots2-del', async () => {
    await gate.promise;
    suspended = true;
    // **THE INTERLEAVED WRITE — issued from the continuation, at an address carrying a listener of its own.**
    innerWrite = captured(() => store.write(['slots2-w'], 'mem', 9));
  });
  let secondListener = 0;
  store.listen('slots2-w', [['slots2-w']]);
  store.register('slots2-w', () => { secondListener += 1; });

  const deletion = store.delete(['slots2-d'], 'mem');
  const atReturn = { thenable: isThenable(deletion), secondListener };
  gate.open();
  await drain();
  await drain();
  const afterContinuation = { secondListener, suspended, innerOk: innerWrite !== null && innerWrite.ok };
  const receipt = await deletion;

  // ── (a) THE DRIVE REACHED ITS ARM. ───────────────────────────────────────────────────────────────────────
  assert.equal(atReturn.thenable, true,
    `**THE DELETE'S ANSWER IS WITHHELD TOO** — \`PIN-2\` names \`index.mjs:887\` as one of the two sites that pass `
      + `the settlement (*"\`settlement\` is passed at \`delivery.mjs:987\` and \`index.mjs:887\` and nowhere else"*). `
      + `The call answered ${JSON.stringify(atReturn.thenable ? 'a thenable' : typeof deletion)}`);
  assert.equal(afterContinuation.suspended, true,
    `**AND THE DELETE-FIRED BODY MUST ACTUALLY SUSPEND** — its continuation was reached: `
      + `${JSON.stringify(afterContinuation)}`);
  assert.equal(afterContinuation.innerOk, true,
    `and the continuation's own write must land: ${innerWrite === null ? 'it never ran' : armOf(innerWrite)}`);

  // ── (b) THE SUBJECT — THE SECOND LISTENER FIRES, ONCE. ──────────────────────────────────────────────────
  assert.equal(afterContinuation.secondListener, 1,
    `**THE WRITE'S OWN LISTENER FIRES EXACTLY ONCE — COUNT \`1\`, NOT THE SILENT \`0\`** (\`contract.md §6\` row 3; `
      + `\`design.md §4\` slot 2: the crossing *"makes an interleaved write's terminal arm **skip its delivery `
      + `silently** — no code, no log, no throw"*). The drive counted `
      + `${afterContinuation.secondListener} invocation(s)`);
  assert.equal(atReturn.secondListener, 0,
    `**AND IT HAD NOT FIRED BEFORE THE CONTINUATION RAN** — so the one above is that write's own delivery and `
      + `not a second act's: the drive read ${atReturn.secondListener} at the delete's return`);

  // ── (c) AND THE DELETE STILL ANSWERS ITS FULL `triggered` SET. ───────────────────────────────────────────
  assert.deepEqual(asSet(handlesOf(receipt.triggered)), ['slots2-del'],
    `**AND THE DELETE STILL ANSWERS ITS FULL \`triggered\` SET** (\`contract.md §6\` row 3) — the set the store `
      + `returned for it, unmoved by anything its body did after it suspended: the drive read `
      + `${JSON.stringify(handlesOf(receipt.triggered))}`);
  assert.deepEqual(asSet(Object.keys(receipt)), ['address', 'op', 'tiers', 'triggered'],
    `and its receipt is still the declared four-member \`DeleteRecord\` (\`PAR-JS-16\`; \`D-49\`'s \`discarded\` is `
      + `non-enumerable): ${JSON.stringify(Object.keys(receipt))}`);

  t.diagnostic(`S-SLOTS-2 · THE DELETE'S FLAG (\`PIN-7\` slot 2): the delete answered `
    + `${JSON.stringify(atReturn.thenable ? 'a thenable' : typeof deletion)}; the body suspended `
    + `(${JSON.stringify(afterContinuation.suspended)}) and its write `
    + `${innerWrite !== null && innerWrite.ok ? `landed ${JSON.stringify(innerWrite.value.op.opId)}` : 'refused'}; `
    + `the write's own listener fired ${JSON.stringify([atReturn.secondListener, afterContinuation.secondListener])} `
    + `time(s) — **\`0\` AT THE RETURN, \`1\` AFTER THE CONTINUATION**; the delete's \`triggered\` read `
    + `${JSON.stringify(handlesOf(receipt.triggered))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 4 OF 12 · `S-SLOTS-3` — `PIN-7`, slot 3 of the five: `state.listenerFailure`.
//
// THE RULING AND THE CROSSING, `design.md §4` (slot `state.listenerFailure`), VERBATIM: *"two registration
// deliveries write the same slot; the second act's throwable overwrites the first's before the first act reads
// and converts it. **Device: (C) and only (C):** the slot's lifetime is one synchronous frame — the catch
// (`:576`–\`:582\`) and the act's conversion are in the same span."* **THE OBSERVABLE, `contract.md §6` row 4,
// VERBATIM:** *"two registrations, each firing a synchronously throwing body, **nested inside one another**;
// each act answers rank `21` `ListenerBodyThrew` naming **its own** address and neither carries the other's
// throwable."*
//
// **WHAT THE CONVERSION ACTUALLY ANSWERS, MEASURED AT ITS OWN BYTES — READ SO THE ASSERTIONS ARE NOT WIDER THAN
// THE SURFACE.** `raiseListenerFailure` (`bindings/js/index.mjs:144`–\`:151\`) reads `state.listenerFailure`'s
// `address` and clears the slot; `listenerBodyRefused` (`:275`–\`:282\`) generates rank `21`'s sentence **over
// that address alone** — `spellAddressBare(address)` is the subject — and its fixed clause says the throwable
// *"is its own and refuses the act instead of crossing as itself"*. **So the two things a drive can read are
// (i) the ADDRESS each answer names and (ii) that the answer is the package's rank-`21` form and NOT the body's
// throwable object.** Both are asserted; the throwable's own members are never rendered and are not asserted to
// be absent from a text this package never authors.
//
// **THE NESTING, SPELLED SO THE SLOT IS ACTUALLY CONTENDED.** The outer registration's own delivery fires a
// listener whose body performs a SECOND registration; the inner registration's own delivery fires a second
// listener which throws; the inner act converts ITS throwable and answers rank `21`; that refusal crosses the
// body (which records it) and the body then throws its own; the outer act's delivery catches and converts. **A
// slot shared without the one-frame discipline would make the outer act name the inner's address, and that is
// exactly the reading below that would move.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-SLOTS-3 · THE TWO REGISTRATIONS\' THROWABLES DO NOT CROSS (`PIN-7`, slot 3) — two registrations nested inside one another, each firing a synchronously throwing body: EACH act answers rank `21` `ListenerBodyThrew` naming ITS OWN address, and neither answer is the other\'s throwable nor the body\'s own', (t) => {
  const store = make();
  const OUTER_THROW = new Error('slots3-the outer registration\'s listener threw');
  const INNER_THROW = new Error('slots3-the inner registration\'s listener threw');
  const fired = { outer: 0, inner: 0 };

  // THE INNER REGISTRATION's throwing body — bound at the address the inner repair's write will land at.
  store.listen('slots3-innerListener', [['slots3-wi']]);
  store.register('slots3-innerListener', () => { fired.inner += 1; throw INNER_THROW; });
  // THE OUTER REGISTRATION's body — bound at the address the outer repair's write will land at. **IT IS THE
  // NESTING'S OWN NODE**: it starts the second registration and then throws.
  store.listen('slots3-outerListener', [['slots3-wo']]);
  let innerAnswer = null;
  store.register('slots3-outerListener', () => {
    fired.outer += 1;
    innerAnswer = captured(() => store.addConstraint(
      { address: ['slots3-xi'], id: 'slots3-innerPair' },
      (context) => (context.op !== null || context.tier !== null
        ? true
        : {
          message: '`["slots3-xi"]` must exist',
          // **THE KERNEL'S OWN REPAIR ROUTE — `D-46`'s fourth position** (`tests/e2e/repair-listener-delivery`
          // drives the same form): the repair's write JOINS the registration's commit.
          repair: (record) => ({ ok: true, op: store.write(['slots3-wi'], 'mem', 2, record).op }),
        }),
    ));
    throw OUTER_THROW;
  });

  const outerAnswer = captured(() => store.addConstraint(
    { address: ['slots3-xo'], id: 'slots3-outerPair' },
    (context) => (context.op !== null || context.tier !== null
      ? true
      : {
        message: '`["slots3-xo"]` must exist',
        repair: (record) => ({ ok: true, op: store.write(['slots3-wo'], 'mem', 1, record).op }),
      }),
  ));

  const outerRefusal = outerAnswer.ok ? null : outerAnswer.caught;
  const innerRefusal = innerAnswer !== null && innerAnswer.ok === false ? innerAnswer.caught : null;
  const outerMessage = messageOf(outerRefusal);
  const innerMessage = messageOf(innerRefusal);

  // ── (a) THE DRIVE REACHED ITS ARM: BOTH ACTS FIRED A SYNCHRONOUSLY THROWING BODY. ───────────────────────
  assert.deepEqual(fired, { outer: 1, inner: 1 },
    `**BOTH REGISTRATIONS MUST HAVE FIRED A BODY EXACTLY ONCE EACH**, or neither throw below is a registration `
      + `delivery's: the drive counted ${JSON.stringify(fired)}`);
  assert.equal(innerRefusal !== null, true,
    `**AND THE NESTED (INNER) REGISTRATION MUST HAVE REFUSED** — its own delivery's throwable pre-empts its `
      + `identity (\`PIN-10\`; \`Q-13\`): the inner call `
      + `${innerAnswer === null ? 'never ran' : (innerAnswer.ok ? 'ANSWERED ITS IDENTITY' : JSON.stringify(statusOf(innerAnswer.caught)))}`);
  assert.equal(outerRefusal !== null, true,
    `and the outer one must have refused: it ${outerAnswer.ok ? 'ANSWERED ITS IDENTITY' : 'threw'}`);

  // ── (b) THE SUBJECT: EACH ANSWER NAMES ITS OWN ADDRESS. ────────────────────────────────────────────────
  assert.equal(statusOf(innerRefusal), 'ListenerBodyThrew',
    `**THE INNER ACT ANSWERS RANK \`21\`** (\`D-124\` item 2's minted member; \`D-125\` item 2: *"a fired body's `
      + `throw at those instants is \`D-124\` item 2's rank \`21\` \`ListenerBodyThrew\` by the same reading"*): `
      + `it answered ${JSON.stringify(statusOf(innerRefusal))}`);
  assert.equal(String(innerMessage).includes('slots3-wi'), true,
    `**AND IT NAMES ITS OWN ADDRESS** — \`spellAddressBare\`'s subject for the inner act is \`["slots3-wi"]\` `
      + `(\`index.mjs:275\`–\`:282\`): the sentence read ${JSON.stringify(innerMessage)}`);
  assert.equal(String(innerMessage).includes('slots3-wo'), false,
    `**AND IT DOES NOT NAME THE OTHER ACT'S ADDRESS** — \`contract.md §6\` row 4: *"neither carries the other's"*: `
      + `the sentence read ${JSON.stringify(innerMessage)}`);
  assert.equal(statusOf(outerRefusal), 'ListenerBodyThrew',
    `**THE OUTER ACT ANSWERS THE SAME RANK, ITS OWN** — a shared slot without the one-frame discipline would `
      + `make this act answer the inner's address instead: it answered ${JSON.stringify(statusOf(outerRefusal))}`);
  assert.equal(String(outerMessage).includes('slots3-wo'), true,
    `**AND IT NAMES ITS OWN ADDRESS — THE OUTER ONE** (\`contract.md §6\` row 4: *"naming **its own** address"*): `
      + `the sentence read ${JSON.stringify(outerMessage)}`);
  assert.equal(String(outerMessage).includes('slots3-wi'), false,
    `**AND NOT THE INNER'S** — the crossing this block exists to falsify, read as it would appear: the sentence `
      + `read ${JSON.stringify(outerMessage)}`);

  // ── (c) NEITHER ANSWER IS A BODY'S THROWABLE, AND NEITHER IS THE OTHER'S. ───────────────────────────────
  assert.notEqual(outerRefusal, innerRefusal,
    '**THE TWO REFUSALS ARE DISTINCT OBJECTS** — one per act, never one act\'s object answered twice');
  for (const [label, refusal] of [['the outer act\'s', outerRefusal], ['the inner act\'s', innerRefusal]]) {
    assert.notEqual(refusal, OUTER_THROW,
      `${label} answer is not the outer body's own throwable — *"the throwable it raised is its own and refuses `
        + `the act instead of crossing as itself"* (\`index.mjs:279\`–\`:280\`)`);
    assert.notEqual(refusal, INNER_THROW,
      `${label} answer is not the inner body's own throwable, by the same sentence`);
    assert.equal(refusal !== null && typeof refusal === 'object' && typeof refusal.status === 'string', true,
      `${label} answer is the surface's own form, carrying a \`status\`: `
        + `${JSON.stringify(refusal === null ? null : Object.keys(refusal))}`);
  }

  t.diagnostic(`S-SLOTS-3 · THE TWO THROWABLES (\`PIN-7\` slot 3): the drive fired `
    + `${JSON.stringify(fired)}; the inner act answered ${JSON.stringify(statusOf(innerRefusal))} with `
    + `${JSON.stringify(innerMessage)}; the outer act answered ${JSON.stringify(statusOf(outerRefusal))} with `
    + `${JSON.stringify(outerMessage)} — **EACH NAMES ITS OWN ADDRESS AND NEITHER IS THE OTHER'S OBJECT**`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 5 OF 12 · `S-SLOTS-4` — `PIN-7`, slot 4 of the five: `witnessDiscardedReversal`.
//
// THE RULING AND THE CROSSING, `design.md §4` (slot `witnessDiscardedReversal`), VERBATIM: *"a raise is stamped
// with a window id and consumed by whichever act reports it; a suspended body's raise could be settled by the
// wrong window's report. **Device (C):** the window is captured into the local `window` at `:830` at the
// delete's opening and handed to the witness at its own answer … and the witness clears only
// `raise.window === window` (`constraints.mjs:2176`–\`:2189\`)."* **`D-42` item 3 is the rule the stamp carries:**
// *"a request belongs to the act that raised it"*. **THE OBSERVABLE, `contract.md §6` row 5, VERBATIM:** *"two
// suspended bodies each raise a `rollback`; the delete's answer reports **its own** window's raise and `[]`
// about the other's."*
//
// **THE READING THAT MAKES THIS BLOCK'S ZERO A LIVE ZERO, MEASURED AT THE BYTES AND NOT ASSUMED.** A raise is
// recorded only where `reversalAtRest(instance) === false` — `openCommits === 0 && kernelFor(instance).live.size
// === 0` (`constraints.mjs:1659`–\`:1665\`); **a suspended body's continuation runs at a microtask boundary, where
// by `PIN-7`'s own rule no bracket and no attempt stands, so its `rollback` takes the AT-REST arm and raises no
// request at all** (`:2397`–\`:2414\`: *"an at-rest call proves the previous window has ended"*). **So the two
// suspended raises cannot reach the delete's witness — and the drive proves they are REVERSALS and not nothing:
// each answers a record whose `opId` echoes the op it named, and the store's state proves the reversal.** The
// delete's own report carries the ONE raise stamped with its window — a raise made SYNCHRONOUSLY inside its
// delivery, which is a request `D-42`'s stamp attributes to the delete and to nobody else.
//
// **NO ORDER IS ASSERTED** (`PIN-3`): the three raises are compared by `opId`, as SETS.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-SLOTS-4 · THE WITNESS REPORTS ITS OWN WINDOW AND NO OTHER\'S (`PIN-7`, slot 4) — two suspended bodies each raise a `rollback` and one body raises inside the delete\'s own delivery: the delete\'s `discarded` names its own window\'s raise, names NEITHER suspended raise, and each suspended reversal DID happen', async (t) => {
  const store = make();
  // THREE OPS, ONE PER RAISE, so the `opId` a witness names identifies the raise it reports and no other.
  const opA = store.write(['slots4-r1'], 'mem', 1);
  const opB = store.write(['slots4-r2'], 'mem', 1);
  const opC = store.write(['slots4-r3'], 'mem', 1);
  store.write(['slots4-d'], 'mem', 1); // the delete must remove something
  // **A PAIR MUST STAND**, or `reversalWatch` returns before a raise is recorded at all
  // (`constraints.mjs:2295`: `if (state.constraints.size === 0) return watched;`). It admits every state.
  const pairAdded = captured(() => store.addConstraint({ address: ['slots4-r1'], id: 'slots4-pair' }, () => true));

  const gate = gateOf();
  const raises = [];
  let resumedB = false;
  let resumedC = false;
  store.listen('slots4-b', [['slots4-d']]);
  store.register('slots4-b', async () => {
    await gate.promise;
    resumedB = true;
    raises.push({ label: 'b', answer: captured(() => store.rollback(opB.op.opId)) });
  });
  store.listen('slots4-c', [['slots4-d']]);
  store.register('slots4-c', async () => {
    await gate.promise;
    resumedC = true;
    raises.push({ label: 'c', answer: captured(() => store.rollback(opC.op.opId)) });
  });
  // **THE SYNCHRONOUS RAISE — INSIDE THE DELETE'S OWN DELIVERY, WHERE ITS WINDOW IS OPEN.**
  let syncRaise = null;
  store.listen('slots4-sync', [['slots4-d']]);
  store.register('slots4-sync', () => {
    syncRaise = captured(() => store.rollback(opA.op.opId));
  });

  const deletion = store.delete(['slots4-d'], 'mem');
  gate.open();
  const receipt = await deletion;
  await drain();
  await drain();

  const syncRecord = syncRaise !== null && syncRaise.ok ? syncRaise.value : null;
  const syncReported = syncRecord === null ? null : syncRecord.discarded;
  const discardedOpIds = asSet((Array.isArray(syncReported) ? syncReported : [])
    .map((entry) => (entry !== null && typeof entry === 'object' ? entry.opId : undefined))
    .filter((opId) => typeof opId === 'string'));

  // ── (a) THE DRIVE REACHED ITS ARM. ───────────────────────────────────────────────────────────────────────
  assert.equal(pairAdded.ok, true,
    `**A PAIR MUST STAND** or no raise is recorded at all: the call ${armOf(pairAdded)}`);
  assert.equal(resumedB && resumedC, true,
    `**BOTH SUSPENDED BODIES MUST REACH THEIR CONTINUATIONS** — a block that passes whether or not they `
      + `suspended is a defect: ${JSON.stringify({ resumedB, resumedC })}`);
  assert.equal(syncRaise !== null && syncRaise.ok, true,
    `**AND THE SYNCHRONOUS RAISE MUST ANSWER ITS DECLARED RECORD** (\`PAR-JS-9\`: \`{opId, undoneOps, `
      + `restoredTo}\`): the call ${syncRaise === null ? 'never ran' : armOf(syncRaise)}`);
  assert.deepEqual(asSet(raises.map((raise) => raise.answer.ok)), [true],
    `**AND EACH SUSPENDED RAISE MUST ANSWER A RECORD TOO — A REFUSED CALL WOULD PROVE NOTHING** (\`D-71\`: *"a `
      + `listener's refusal does not fail the write that fired it"*): the drive read `
      + `${JSON.stringify(raises.map((raise) => armOf(raise.answer)))}`);
  assert.deepEqual(asSet(raises.map((raise) => raise.answer.value.opId)),
    asSet([opB.op.opId, opC.op.opId]),
    `**SO EACH SUSPENDED BODY'S REVERSAL DID HAPPEN — THE ZEROS BELOW ARE LIVE ZEROS** (\`D-75\`: *"report every `
      + `discarded raise at any count, on every path"*): the raises echoed `
      + `${JSON.stringify(raises.map((raise) => raise.answer.value.opId))} for ops `
      + `${JSON.stringify([opB.op.opId, opC.op.opId])}`);

  // ── (b) THE SUBJECT — THE DELETE NAMES ITS OWN WINDOW'S RAISE AND NOTHING ELSE. ───────────────────────────
  assert.equal(Array.isArray(syncReported), true,
    `**THE DELETE'S ANSWER CARRIES ITS WITNESS** (\`D-49\`: *"Make discard observable"*; \`D-75\`): the member read `
      + `${JSON.stringify(syncReported)}`);
  assert.deepEqual(discardedOpIds, [opA.op.opId],
    `**IT REPORTS ITS OWN WINDOW'S RAISE — AND \`[]\` ABOUT THE OTHERS'** (\`contract.md §6\` row 5, VERBATIM). The `
      + `delete's list names ${JSON.stringify(discardedOpIds)}; the raise made inside its own delivery named `
      + `${JSON.stringify(opA.op.opId)}, and the two suspended raises named `
      + `${JSON.stringify([opB.op.opId, opC.op.opId])}`);
  assert.equal(discardedOpIds.includes(opB.op.opId) || discardedOpIds.includes(opC.op.opId), false,
    `**AND NEITHER SUSPENDED RAISE CROSSES INTO IT — THE CROSSING THIS SLOT EXISTS TO STOP** `
      + `(\`contract.md §6\` row 5: *"the delete's answer reports its own window's raise and \`[]\` about the `
      + `other's"*): the delete's list read ${JSON.stringify(discardedOpIds)}`);
  assert.ok(Array.isArray(receipt.discarded) && receipt.discarded.length === 1,
    `and it is ONE entry, not a list grown by the two raises the continuations made: `
      + `${JSON.stringify(receipt.discarded)}`);
  assert.deepEqual(asSet((Array.isArray(receipt.discarded) ? receipt.discarded : []).map((entry) => entry.opId)),
    discardedOpIds,
    `**AND THE DELETE\'S ANSWER AND THE RAISE\'S OWN ANSWER AGREE — ONE WINDOW, ONE REPORT** (\`D-75\`'s *"the `
      + `raise's own answer (carries the witness, including a raise made inside a constraint body)"*): `
      + `${JSON.stringify([receipt.discarded, syncReported])}`);

  t.diagnostic(`S-SLOTS-4 · THE WITNESS'S OWN WINDOW (\`PIN-7\` slot 4): the synchronous raise named `
    + `${JSON.stringify(syncRecord.opId)} and its answers read ${JSON.stringify([discardedOpIds, syncReported])}; `
    + `the two suspended raises named ${JSON.stringify(raises.map((one) => one.answer.value.opId))} and read `
    + `${JSON.stringify(raises.map((one) => one.answer.value.discarded))} — **THEY RAN AT REST AND ARE NOT `
    + `DISCARDED RAISES AT ALL, WHICH IS WHY NEITHER REACHES THE DELETE'S REPORT**; the delete's `
    + `\`discarded\` = ${JSON.stringify(receipt.discarded)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 6 OF 12 · `S-SLOTS-5` — `PIN-7`, slot 5 of the five: `REPAIR_LEGS_LAST`.
//
// THE RULING AND THE CROSSING, `design.md §4` (slot `REPAIR_LEGS_LAST`), VERBATIM: *"the outer bracket sets it at
// its own first suspension; an inner bracket closing *later* would leave the outer's legs answering. **Device
// (C):** the brackets close **LIFO by construction** … and an append from a suspended body finds
// `REPAIR_LEGS_OPEN` empty and goes nowhere (`:423`) — **loss, never mis-attribution**."* **THE OBSERVABLE,
// `contract.md §6` row 6, VERBATIM:** *"a body suspended in one delivery writes at an address carrying a pair;
// no `repair-run` entry and no `pending` element of the *other* delivery names that write, and the kernel's
// restore floor is unchanged across both."*
//
// **THE INSTRUMENT FOR "THE RESTORE FLOOR", AND WHY IT IS THE WINDOW AND NOT A MARK.** The floor a commit caches
// for its restore is `windowMark`'s, and `state.mjs:566`–\`:570\` answers `undefined` where no window stands in
// flight — **so the floor's own precondition is the window's identity, and `currentWindow`/`openCommits` are the
// pair `contract.md §10` sanctions as this unit's instruments.** A window in flight at the suspended
// continuation would be a bracket standing open across a suspension, which is the crossing; "unchanged across
// both" is asserted as: the same reading before the delete, at the continuation, and after everything — no
// window, no attempt. **What is NOT asserted is a mark this contract does not name**: `windowMark` is not the
// contract's instrument and this block does not mint one.
//
// **"THE OTHER DELIVERY'S `pending`" HAS A PUBLIC READER ONLY ON A DELETE'S RECEIPT** — `receipt.commit` is the
// kernel's own `CommitRecord` (`index.d.ts:726`–\`:759\`, a non-enumerable own data property) and its `pending` is
// the residue a repair-leg merge would grow. **So the other delivery is a `delete`**: without that, the member
// the pin names would be unreadable from the public surface and the assertion would have to be dropped.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-SLOTS-5 · THE REPAIR LEGS OF ANOTHER DELIVERY ARE NOT TAKEN (`PIN-7`, slot 5) — a body suspended in a delete\'s delivery writes at an address carrying a pair and its listener: no `repair-run` entry and no `pending` element of the DELETE\'s own commit names that write, and no window stands in flight at either end', async (t) => {
  const store = make();
  store.write(['slots5-d'], 'mem', 1);
  store.write(['slots5-p'], 'mem', 1); // the state the pair is registered against — it admits it
  let pairAsks = 0;
  const pairAdded = captured(() => store.addConstraint({ address: ['slots5-p'], id: 'slots5-pair' }, () => {
    pairAsks += 1;
    return true;
  }));
  let secondListener = 0;
  store.listen('slots5-p2', [['slots5-p']]);
  store.register('slots5-p2', () => { secondListener += 1; });

  const gate = gateOf();
  let suspended = false;
  let atTheContinuation = null;
  let inner = null;
  store.listen('slots5-del', [['slots5-d']]);
  store.register('slots5-del', async () => {
    await gate.promise;
    suspended = true;
    // **THE FLOOR, READ AT THE OTHER DELIVERY'S OWN CONTINUATION.**
    atTheContinuation = { open: openCommits(store), window: currentWindow(store) };
    inner = captured(() => store.write(['slots5-p'], 'mem', 5));
  });

  const atRest = { open: openCommits(store), window: currentWindow(store) };
  const asksBefore = pairAsks;
  const deletion = store.delete(['slots5-d'], 'mem');
  gate.open();
  const receipt = await deletion;
  await drain();
  await drain();
  const afterEverything = { open: openCommits(store), window: currentWindow(store) };

  const innerRecord = inner !== null && inner.ok ? inner.value : null;
  const residue = receipt !== null && typeof receipt === 'object' ? memberOf(receipt.commit, 'pending') : null;

  // ── (a) THE DRIVE REACHED ITS ARM. ───────────────────────────────────────────────────────────────────────
  assert.equal(pairAdded.ok, true,
    `**THE PAIR MUST STAND**, or the address the body writes at carries nothing for the pass to ask: the call `
      + `${armOf(pairAdded)}`);
  assert.equal(suspended, true,
    `**THE BODY MUST ACTUALLY SUSPEND AND ITS CONTINUATION RUN**: ${JSON.stringify(suspended)}`);
  assert.equal(innerRecord !== null, true,
    `and the continuation's write must land: ${inner === null ? 'it never ran' : armOf(inner)}`);
  assert.deepEqual(readOf(store, ['slots5-p'], 'mem'), 5,
    `**AND ITS LANDING STANDS — THE WRITE HAPPENED** (\`D-71\`): \`read(['slots5-p'])\` = `
      + `${JSON.stringify(readOf(store, ['slots5-p'], 'mem'))}`);
  assert.equal(secondListener >= 1, true,
    `and the listener the write triggered fired, so the write carried a returned set at all: `
      + `${secondListener}`);
  assert.equal(pairAsks - asksBefore >= 1, true,
    `**AND THE PAIR WAS ASKED BY THE WRITE\'S OWN PASS — the pair-carrying address really was consulted**: the `
      + `ask count rose from ${asksBefore} to ${pairAsks}`);

  // ── (b) THE SUBJECT — NOTHING OF THE OTHER DELIVERY NAMES THAT WRITE. ────────────────────────────────────
  assert.equal(kindsIn(receipt.log).includes('repair-run'), false,
    `**NO \`repair-run\` ENTRY OF THE DELETE\'S COMMIT NAMES THAT WRITE** (\`contract.md §6\` row 6; `
      + `\`design.md §4\` slot 5: an append from a suspended body *"finds \`REPAIR_LEGS_OPEN\` empty and goes `
      + `nowhere"*). The delete's list carries ${JSON.stringify(kindsIn(receipt.log))}`);
  assert.equal(opIdsIn(receipt.log).includes(innerRecord.op.opId), false,
    `and no entry of it names the write's own op: the list names `
      + `${JSON.stringify(opIdsIn(receipt.log))} where the continuation's write landed `
      + `${JSON.stringify(innerRecord.op.opId)}`);
  assert.equal(residue !== null && residue.present, true,
    `**AND THE DELETE\'S OWN COMMIT CARRIES A \`pending\` MEMBER TO READ** (\`index.d.ts:733\`–\`:735\`: *"\`pending\` IS `
      + `THE DELETE\'S RESIDUE … **IT IS THE SET THE DELIVERY FIRES**"*) — without it this half of the pin is `
      + `unreadable from the public surface and the block would have to say so instead: `
      + `${JSON.stringify(residue === null ? null : residue.present)}`);
  assert.deepEqual(asSet(handlesOf(residue.value)), ['slots5-del'],
    `**AND NO ELEMENT OF IT NAMES THE WRITE\'S HANDLE — THE RESIDUE IS THE DELETE\'S OWN** `
      + `(\`contract.md §6\` row 6: *"no \`pending\` element of the other delivery names that write"*): the `
      + `residue read ${JSON.stringify(handlesOf(residue.value))} where the continuation's write returned `
      + `${JSON.stringify(handlesOf(innerRecord.triggered))}`);
  assert.equal(handlesOf(residue.value).includes('slots5-p2'), false,
    `and specifically not the listener the suspended body's write fired: `
      + `${JSON.stringify(handlesOf(residue.value))}`);

  // ── (c) AND THE RESTORE FLOOR IS UNCHANGED ACROSS BOTH. ──────────────────────────────────────────────────
  assert.deepEqual(atTheContinuation, { open: 0, window: 0 },
    `**NO WINDOW STANDS IN FLIGHT AT THE SUSPENDED CONTINUATION** — so no restore mark exists for either `
      + `delivery to inherit, which is the fact "the kernel's restore floor is unchanged across both" names: `
      + `the drive read ${JSON.stringify(atTheContinuation)}`);
  assert.deepEqual(afterEverything, atRest,
    `**AND THE READING IS THE SAME AT BOTH ENDS** (\`contract.md §6\` row 6): before the delete `
      + `${JSON.stringify(atRest)}, after everything ${JSON.stringify(afterEverything)} — the suspended body left `
      + `no bracket and no attempt standing`);

  t.diagnostic(`S-SLOTS-5 · THE OTHER DELIVERY'S LEGS (\`PIN-7\` slot 5): the continuation's write landed `
    + `${JSON.stringify(innerRecord.op.opId)} at \`["slots5-p"]\` and returned `
    + `${JSON.stringify(handlesOf(innerRecord.triggered))} over ${pairAsks} pair ask(s); the delete's `
    + `\`log\` carried ${JSON.stringify(kindsIn(receipt.log))} naming ${JSON.stringify(opIdsIn(receipt.log))}, and `
    + `its commit's \`pending\` read ${JSON.stringify(handlesOf(residue.value))}; the floor read `
    + `${JSON.stringify([atRest, atTheContinuation, afterEverything])} — **UNCHANGED ACROSS BOTH**`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 7 OF 12 · `S-SETTLE-2` — `PIN-1` and `PIN-3`.
//
// THE RULING, `D-130` ITEM 4 as `contract.md §6` row 7 states it, VERBATIM: *"one listener awaits a gate opened by
// a later `setImmediate`, a sibling is synchronous: the sibling's mark stands before the answer resolves — a
// suspension delays no sibling and the answer only."* **And `PIN-3` is the constraint on how the phase boundary
// may be read** (`contract.md §4`): *"No clause promises an invocation order, an arrival order among rejections,
// or an index-to-index correspondence between the started and the settled set."*
//
// **WHAT IS ASSERTED IS A PHASE BOUNDARY AND NEVER AN ORDER AMONG BODIES.** The block does not say the gated body
// starts before or after its sibling — it says (i) BOTH are started before the answer, (ii) the synchronous
// sibling's mark STANDS at the write's return and at the later `setImmediate`, and (iii) the answer has NOT
// resolved at that `setImmediate`, because the one thing it waits for is the gate. (iii) is the falsifier: an
// implementation that answered at the sibling's settlement and let the gated body fall off the end of the
// delivered set would arrive one turn early and be caught.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-SETTLE-2 · A GATED SIBLING DELAYS NO SIBLING AND THE ANSWER ONLY (`PIN-1`, `PIN-3`) — one listener awaits a gate opened by a later `setImmediate`, its sibling is synchronous: the sibling\'s mark stands at the return and at that immediate, the answer has NOT resolved there, and it resolves only once the gated body resumes', async (t) => {
  const store = make();
  const gate = gateOf();
  const started = [];
  const resumed = [];
  let siblingMark = false;
  store.listen('settle2-gated', [['settle2-a']]);
  store.register('settle2-gated', async () => {
    started.push('settle2-gated');
    await gate.promise;
    resumed.push('settle2-gated');
  });
  store.listen('settle2-sync', [['settle2-a']]);
  store.register('settle2-sync', () => {
    started.push('settle2-sync');
    siblingMark = true;
  });

  const answer = store.write(['settle2-a'], 'mem', 1);
  const atReturn = {
    thenable: isThenable(answer),
    siblingMark,
    started: asSet(started),
    resumed: asSet(resumed),
  };
  let arrived = false;
  if (isThenable(answer)) answer.then(() => { arrived = true; });

  // **THE LATER `setImmediate` — the instant the contract names. The gate is opened from its continuation and
  // the answer's state is read one hair before that.**
  await drain();
  const atTheImmediate = { arrived, siblingMark, resumed: asSet(resumed) };
  gate.open();
  const settled = isThenable(answer) ? await answer : null;

  // ── (a) THE DRIVE REACHED ITS ARM. ───────────────────────────────────────────────────────────────────────
  assert.equal(atReturn.thenable, true,
    `**THE ANSWER IS A THENABLE** — it is withheld for the delivered set (\`PIN-2\`): the call answered `
      + `${JSON.stringify(atReturn.thenable ? 'a thenable' : typeof answer)}`);
  assert.deepEqual(atReturn.started, ['settle2-gated', 'settle2-sync'],
    `**BOTH BODIES ARE STARTED BEFORE THE ANSWER IS GIVEN** (\`PIN-1\`) — a suspending sibling must not stop the `
      + `loop reaching the next recipient: the drive read ${JSON.stringify(atReturn.started)}`);
  assert.deepEqual(atReturn.resumed, [],
    `**AND THE GATED BODY REALLY SUSPENDED** — nothing of it resumed at the return: `
      + `${JSON.stringify(atReturn.resumed)}`);

  // ── (b) THE SUBJECT — THE SIBLING'S MARK STANDS; THE ANSWER DOES NOT ARRIVE. ─────────────────────────────
  assert.equal(atReturn.siblingMark, true,
    `**THE SIBLING'S MARK STANDS AT THE RETURN — A SUSPENSION DELAYS NO SIBLING** (\`contract.md §6\` row 7; `
      + `\`design.md §6\`: *"Every body is *started* before \`terminalArm\` returns"*): the drive read `
      + `${JSON.stringify(atReturn.siblingMark)}`);
  assert.equal(atTheImmediate.siblingMark, true,
    `**AND IT STANDS AT THE LATER \`setImmediate\` TOO** — the phase the contract's sentence names: `
      + `${JSON.stringify(atTheImmediate)}`);
  assert.equal(atTheImmediate.arrived, false,
    `**AND THE ANSWER HAS NOT RESOLVED AT THAT IMMEDIATE — IT DELAYS THE ANSWER AND NOTHING ELSE** `
      + `(\`contract.md §6\` row 7, VERBATIM: *"a suspension delays no sibling and the answer only"*). The answer `
      + `arrived = ${JSON.stringify(atTheImmediate.arrived)} with resumed ${JSON.stringify(atTheImmediate.resumed)}`);
  assert.deepEqual(atTheImmediate.resumed, [],
    `and the gated body still has not resumed at that instant — so the withhold above is the gate's and not an `
      + `accident of scheduling: ${JSON.stringify(atTheImmediate.resumed)}`);

  // ── (c) THE ANSWER RESOLVES ONCE THE GATED BODY HAS RESUMED. ─────────────────────────────────────────────
  assert.deepEqual(asSet(resumed), ['settle2-gated'],
    `**THE ANSWER RESOLVED ONLY AFTER THE GATED BODY RESUMED** (\`PIN-9\`): the resumed set read `
      + `${JSON.stringify(asSet(resumed))}`);
  assert.equal(settled !== null && typeof settled === 'object', true,
    `and it resolved with the act's own record: ${JSON.stringify(settled === null ? null : Object.keys(settled))}`);
  assert.deepEqual(asSet(Object.keys(settled)), ['op', 'triggered', 'watched'],
    `whose enumerable set is the declared three (\`PAR-JS-13\`): ${JSON.stringify(Object.keys(settled))}`);

  t.diagnostic(`S-SETTLE-2 · THE GATED SIBLING (\`PIN-1\`, \`PIN-3\`): at the return started=`
    + `${JSON.stringify(atReturn.started)} resumed=${JSON.stringify(atReturn.resumed)} siblingMark=`
    + `${JSON.stringify(atReturn.siblingMark)}; at the later \`setImmediate\` arrived=`
    + `${JSON.stringify(atTheImmediate.arrived)} resumed=${JSON.stringify(atTheImmediate.resumed)}; after the gate `
    + `the resumed set read ${JSON.stringify(asSet(resumed))} and the answer resolved with `
    + `${JSON.stringify(Object.keys(settled))} — **NO ORDER AMONG THE TWO BODIES IS ASSERTED ANYWHERE ABOVE**`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 8 OF 12 · `S-REJECTED-BODY` — `PIN-5` and `PIN-10`.
//
// THE RULING, `D-138` ITEMS 1–2 AND 5, as `design.md §7` arm 2 states it, VERBATIM: *"**A body rejects.** The
// rejection becomes the datum; **the write resolves** with the record (`D-138` items 2, 4); nothing is rendered
// from the reason."* **`PIN-5`, verbatim:** *"The write **resolves** with its record; the failure is read as one
// entry per rejecting handle; **the reason is never read, stored or rendered**; nothing retries and nothing rolls
// back. **No `Promise` rejection is a failure form on any arm.**"* **And `D-137` item 5 is the entry's shape:**
// *"the sentence declares what crossed and not what the body rejected with"* (`D-58`'s retained-data bound).
// **THE OBSERVABLE, `contract.md §6` row 8, VERBATIM:** *"of two `async` listeners one resolves one rejects: the
// write resolves; `bodyFailures` has **one** entry at the rejecting handle with `status ===
// 'ListenerBodyRejected'`, a message naming the watched address's spelling and no rendering of the reason;
// `read` answers the written value; unhandled-rejection count `0`."*
//
// **THE UNHANDLED-REJECTION COUNT IS THE MEASURED FATAL SHAPE AND NOT A HYPOTHETICAL.** `strata/research.md
// §22.12`'s `M-2`, VERBATIM: *"An `async` body's rejection never reaches the caller, and kills the process after
// the caller has been answered."* **Its fifth drive's transcript is the shape this block's counter discharges:**
// without a handler the same body answered `write answered, record.op.opId = op-1` and then `[shell exit=1]`, with
// `survived the drain` never printing. **So the count is asserted `0`: an implementation that observes the
// settle converts that fatal shape into a datum, and one that observes nothing leaves it fatal.**
//
// **THE ADDRESS IS A DISTINCTIVE SPELLING ON PURPOSE** — `['srb-addr']` and not `['a']`: the message assertion is
// a substring test over the watched address's spelling, and a one-letter spelling would be satisfied by almost
// any English sentence.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-REJECTED-BODY · A REJECTING BODY RESOLVES THE WRITE AND BECOMES A DATUM (`PIN-5`, `PIN-10`) — of two `async` listeners one resolves and one rejects: the write RESOLVES with its record, `bodyFailures` carries ONE entry at the rejecting handle (rank `23` `ListenerBodyRejected`, its message naming the watched address, the reason rendered nowhere), `read` answers the written value, and the unhandled-rejection count is `0`', async (t) => {
  const REASON_SENTENCE = 'srb-the body refused with this very sentence and it must never be rendered';
  const reason = new Error(REASON_SENTENCE);
  const unhandled = countUnhandled();
  let drive = null;
  try {
    const store = make();
    store.listen('srb-resolves', [['srb-addr']]);
    store.register('srb-resolves', async () => { await null; return 'the resolving body\'s own value'; });
    store.listen('srb-rejects', [['srb-addr']]);
    store.register('srb-rejects', async () => { await null; throw reason; });

    const answer = store.write(['srb-addr'], 'mem', 1);
    const atReturn = { thenable: isThenable(answer) };
    const record = await answer;
    // THREE TURNS, so the rejection's own `unhandledRejection` instant (if there is one) has passed before the
    // count is read. **No timer is armed anywhere** (`contract.md:602`).
    await drain();
    await drain();
    await drain();
    const failures = record === null || record === undefined ? null : memberOf(record, 'bodyFailures');
    drive = {
      atReturn,
      record,
      keys: record === null || record === undefined ? [] : Object.keys(record),
      failures,
      entry: failures === null || failures.value === undefined ? null : failures.value['srb-rejects'],
      failureKeys: failures === null || failures.value === undefined ? [] : asSet(Object.keys(failures.value)),
      read: readOf(store, ['srb-addr'], 'mem'),
    };
  } finally {
    unhandled.stop();
  }

  // ── (a) THE WRITE RESOLVES, AND NOT WITH A REFUSAL. ──────────────────────────────────────────────────────
  assert.equal(drive.atReturn.thenable, true,
    `**THE WITNESS IS WITHHELD — THE ANSWER IS A THENABLE** (\`PIN-2\`): the call answered `
      + `${JSON.stringify(drive.atReturn.thenable ? 'a thenable' : typeof drive.record)}`);
  assert.deepEqual(asSet(drive.keys), ['op', 'triggered', 'watched'],
    `**AND THE WRITE RESOLVES WITH ITS RECORD — NEVER A REJECTION** (\`D-138\` item 2; \`PIN-5\`: *"The write `
      + `**resolves** with its record"*): the resolved value's enumerable set read ${JSON.stringify(drive.keys)}`);

  // ── (b) `bodyFailures` — ONE ENTRY, AT THE REJECTING HANDLE, RANK `23`. ──────────────────────────────────
  assert.equal(drive.failures !== null && drive.failures.present, true,
    `**THE RECEIPT CARRIES \`bodyFailures\`, PRESENT ON EVERY ARM** (\`PIN-10\`: *"the plain arm reads the frozen `
      + `empty \`{}\` and is present, never absent and never \`undefined\`"*): the member was `
      + `${drive.failures === null ? 'unreadable' : JSON.stringify(drive.failures.present)}`);
  assert.deepEqual(asSet(Object.keys(drive.failures.value === undefined ? {} : drive.failures.value)), ['srb-rejects'],
    `**ONE ENTRY, AT THE REJECTING HANDLE** (\`contract.md §6\` row 8; \`PIN-5\`: *"one entry per rejecting `
      + `handle"*) — the resolving body is not in it and no absent handle is either: the datum's keys read `
      + `${JSON.stringify(drive.failureKeys)}`);
  assert.equal(drive.entry !== null && drive.entry !== undefined, true,
    `and the entry itself must be readable at that key: `
      + `${JSON.stringify(drive.failures === undefined ? null : drive.failures)}`);
  assert.equal(drive.entry === null || drive.entry === undefined ? undefined : drive.entry.status, 'ListenerBodyRejected',
    `**AND ITS \`status\` IS RANK \`23\`'S OWN NAME, VERBATIM** (\`D-137\` item 5; \`contract.md §6\` row 8: `
      + `\`status === 'ListenerBodyRejected'\`): the entry read `
      + `${JSON.stringify(drive.entry === null ? null : drive.entry.status)}`);
  assert.equal(typeof drive.entry.message === 'string' && drive.entry.message.includes('srb-addr'), true,
    `**AND ITS MESSAGE NAMES THE WATCHED ADDRESS'S SPELLING** (\`design.md §5\`: *"\`message\` is \`D-137\` item `
      + `5's generated sentence over the **watched address's spelling**"*): the sentence read `
      + `${JSON.stringify(drive.entry === null ? null : drive.entry.message)}`);
  assert.deepEqual(drive.entry.address === undefined ? '<absent>' : drive.entry.address, ['srb-addr'],
    `**AND THE ENTRY'S \`address\` IS THE BINDING'S OWN** (\`design.md §5\`: *"\`address\` is the binding's own `
      + `address off the pair at \`deliver:157\`"*): the entry read `
      + `${JSON.stringify(drive.entry === null ? null : drive.entry.address)}`);

  // ── (c) THE REASON IS NEVER RENDERED, READ OR STORED. ─────────────────────────────────────────────────────
  const rendered = JSON.stringify(drive.failures === null || drive.failures.value === undefined ? null : drive.failures.value);
  assert.equal(rendered.includes(REASON_SENTENCE), false,
    `**NOTHING RENDERS THE REASON** (\`PIN-5\`: *"the reason is never read, stored or rendered"*; \`D-137\` item `
      + `5; \`D-58\`'s retained-data bound). The datum serialized as ${JSON.stringify(rendered)}`);
  assert.equal(Object.values(drive.entry === null || drive.entry === undefined ? {} : drive.entry)
    .some((value) => value === reason), false,
    'and no member of the entry IS the reason object either — the throwable does not cross as itself');
  assert.equal(String(drive.entry === null ? '' : drive.entry.message).includes(REASON_SENTENCE), false,
    `and the generated sentence is generated: it read `
      + `${JSON.stringify(drive.entry === null ? null : drive.entry.message)}`);

  // ── (d) THE STORE AND THE PROCESS. ─────────────────────────────────────────────────────────────────────────
  assert.deepEqual(drive.read, 1,
    `**AND THE WRITE LANDED — \`read\` ANSWERS THE WRITTEN VALUE** (\`contract.md §6\` row 8; \`D-138\` item 5: `
      + `nothing retries and nothing rolls back): \`read(['srb-addr'])\` = ${JSON.stringify(drive.read)}`);
  assert.deepEqual(unhandled.seen, [],
    `**AND THE UNHANDLED-REJECTION COUNT IS \`0\`** — the assertion stands against the MEASURED FATAL SHAPE of a `
      + `dropped listener promise (\`strata/research.md §22.12\`'s \`M-2\`: *"An \`async\` body's rejection never `
      + `reaches the caller, and kills the process after the caller has been answered"*, its fifth drive `
      + `printing \`[shell exit=1]\` with \`survived the drain\` never printing). The counter saw `
      + `${JSON.stringify(unhandled.seen.map((one) => (one === null || typeof one !== 'object' ? String(one) : one.message)))}`);

  t.diagnostic(`S-REJECTED-BODY · THE DATUM (\`PIN-5\`, \`PIN-10\`): the write answered `
    + `${JSON.stringify(drive.atReturn.thenable ? 'a thenable' : typeof drive.record)} and resolved with `
    + `${JSON.stringify(drive.keys)}; \`bodyFailures\` read ${rendered}; the entry's \`status\` is `
    + `${JSON.stringify(drive.entry === null ? null : drive.entry.status)}, its \`address\` `
    + `${JSON.stringify(drive.entry === null ? null : drive.entry.address)} and its \`message\` `
    + `${JSON.stringify(drive.entry === null ? null : drive.entry.message)}; \`read\` = `
    + `${JSON.stringify(drive.read)}; **UNHANDLED REJECTIONS = ${unhandled.seen.length}**`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 9 OF 12 · `S-REJECTED-BODY-PLURAL` — `PIN-3`, `PIN-5`, `PIN-9`.
//
// THE RULING, `D-138`'s UNSETTLED ITEM 2 as `design.md §5` reads it, VERBATIM: *"The plurality — confirmed, with
// one correction … a JS object's own string keys are read in insertion order, so the **arrival** order of `N`
// rejections is observable through `Object.keys(failures)`. **No clause may promise it and no drive may assert
// it** — a drive compares the entry **set**, never its order (`DD-22` read at the datum)."*
// **THE OBSERVABLE, `contract.md §6` row 9, VERBATIM:** *"three bodies reject: three entries, read as a **set** of
// handles; no entry names another's reason; `Object.keys(failures)` order never asserted."*
//
// **THE DRIVE MAKES THE ORDER LOOK NON-TRIVIAL ON PURPOSE.** The three bodies take a DIFFERENT number of
// microtask hops before they throw (`3`, `1`, `2`), so the arrival order is neither the handle order nor its
// reverse — which is what makes "read as a set" a real instruction rather than a formality. **The order is
// PRINTED at the diagnostic and asserted NOWHERE.**
//
// **THE UNHANDLED-REJECTION COUNTER IS INSTALLED HERE TOO**, for the reason `S-REJECTED-BODY` states: three
// dropping bodies would take the process down and make the red illegible (`strata/research.md §22.12`'s `M-2`).
// The count is asserted `0`, by the same law (`PIN-5`: *"No `Promise` rejection is a failure form on any arm"*).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-REJECTED-BODY-PLURAL · THREE REJECTIONS ARE A SET, NOT A SEQUENCE (`PIN-3`, `PIN-5`, `PIN-9`) — three bodies reject and `bodyFailures` carries three entries whose HANDLE SET is the rejecting set, every one at rank `23`, no entry naming any body\'s reason — and `Object.keys(failures)`\' order, which the drive makes non-trivial, is PRINTED and never asserted', async (t) => {
  const sentences = [
    'plural-the first body\'s own reason',
    'plural-the second body\'s own reason',
    'plural-the third body\'s own reason',
  ];
  const reasons = sentences.map((sentence) => new Error(sentence));
  const handles = ['plural-h1', 'plural-h2', 'plural-h3'];
  const hops = [3, 1, 2]; // the arrival order is neither the handle order nor its reverse
  const unhandled = countUnhandled();
  let drive = null;
  try {
    const store = make();
    const settledMarks = [];
    for (let index = 0; index < handles.length; index += 1) {
      store.listen(handles[index], [['plural-addr']]);
      store.register(handles[index], async () => {
        for (let hop = 0; hop < hops[index]; hop += 1) await null;
        settledMarks.push(handles[index]);
        throw reasons[index];
      });
    }
    const answer = store.write(['plural-addr'], 'mem', 1);
    const atReturn = { thenable: isThenable(answer) };
    let settledAtResolution = null;
    if (isThenable(answer)) answer.then(() => { settledAtResolution = asSet(settledMarks); });
    const record = await answer;
    await drain();
    await drain();
    await drain();
    const failures = record === null || record === undefined ? null : memberOf(record, 'bodyFailures');
    const datum = failures === null ? undefined : failures.value;
    const entries = datum === undefined ? [] : Object.values(datum);
    drive = {
      atReturn,
      settledAtResolution,
      settledMarks: asSet(settledMarks),
      keys: datum === undefined ? [] : Object.keys(datum),
      entries,
      keysAsSet: datum === undefined ? [] : asSet(Object.keys(datum)),
      datum,
    };
  } finally {
    unhandled.stop();
  }

  const rendered = JSON.stringify(drive.datum === undefined ? null : drive.datum);

  // ── (a) THE DRIVE REACHED ITS ARM. ───────────────────────────────────────────────────────────────────────
  assert.equal(drive.atReturn.thenable, true,
    `**THE ANSWER IS WITHHELD** (\`PIN-2\`): the call answered `
      + `${JSON.stringify(drive.atReturn.thenable ? 'a thenable' : 'something else')}`);
  assert.deepEqual(drive.settledAtResolution === null ? ['<the answer never resolved>'] : drive.settledAtResolution,
    asSet(handles),
    `**ALL THREE BODIES SETTLED BEFORE THE ANSWER — THE SETTLE IS TOTAL** (\`PIN-9\`; \`contract.md §6\` row 9). At `
      + `the resolution instant the drive had observed ${JSON.stringify(drive.settledAtResolution)} of `
      + `${JSON.stringify(asSet(handles))}`);

  // ── (b) THE SUBJECT — THREE ENTRIES, READ AS A SET OF HANDLES. ────────────────────────────────────────────
  assert.equal(drive.entries.length, 3,
    `**THREE ENTRIES** (\`contract.md §6\` row 9): the datum read ${JSON.stringify(drive.datum)}`);
  assert.deepEqual(drive.keysAsSet, asSet(handles),
    `**AND THE HANDLE SET IS THE REJECTING SET — READ AS A SET, NEVER AS A SEQUENCE** (\`PIN-3\`: *"a drive `
      + `compares sets and multisets, never sequences"*). The drive read `
      + `${JSON.stringify(drive.keys)} — **its ORDER IS PRINTED HERE AND ASSERTED NOWHERE** `
      + `(\`design.md §5\`: *"No clause may promise it and no drive may assert it"*), sorted it reads `
      + `${JSON.stringify(drive.keysAsSet)}`);
  assert.equal(drive.entries.filter((entry) => entry !== null && typeof entry === 'object'
    && entry.status === 'ListenerBodyRejected').length, 3,
    `**AND EVERY ONE CARRIES RANK \`23\`'S NAME — A MULTISET OF THREE** (\`D-137\` item 5; \`DD-22\`: a multiset `
      + `is what a count is): the statuses read `
      + `${JSON.stringify(drive.entries.map((entry) => (entry === null ? null : entry.status)))}`);
  assert.deepEqual(asSet(drive.entries.map((entry) => (entry !== null && typeof entry === 'object'
    && Array.isArray(entry.address) ? entry.address.join('/') : '<no address>'))), ['plural-addr'],
    `and each names the watched address it was bound at (\`design.md §5\`): `
      + `${JSON.stringify(drive.entries.map((entry) => (entry === null ? null : entry.address)))}`);

  // ── (c) NO ENTRY NAMES A REASON. ───────────────────────────────────────────────────────────────────────────
  for (const sentence of sentences) {
    assert.equal(rendered.includes(sentence), false,
      `**NO ENTRY NAMES ANOTHER\'S REASON — NOR ITS OWN** (\`PIN-5\`: *"the reason is never read, stored or `
        + `rendered"*; \`D-137\` item 5). The datum serialized as ${JSON.stringify(rendered)} and the sentence `
        + `${JSON.stringify(sentence)} was found in it`);
  }
  assert.equal(drive.entries.some((entry) => reasons.some((one) => Object.values(entry === null ? {} : entry)
    .some((value) => value === one))), false,
    'and no member of any entry IS a body\'s reason object: the throwables do not cross as themselves');

  // ── (d) AND THE PROCESS SURVIVED ALL THREE. ────────────────────────────────────────────────────────────────
  assert.deepEqual(unhandled.seen, [],
    `**THE UNHANDLED-REJECTION COUNT IS \`0\`** — the same instrument and the same law as `
      + `\`S-REJECTED-BODY\`'s (\`strata/research.md §22.12\`'s \`M-2\`: a dropped listener promise is FATAL, `
      + `measured); three of them would be three times as fatal. The counter saw `
      + `${JSON.stringify(unhandled.seen.map((one) => (one === null || typeof one !== 'object' ? String(one) : one.message)))}`);

  t.diagnostic(`S-REJECTED-BODY-PLURAL · THREE AS A SET (\`PIN-3\`, \`PIN-5\`, \`PIN-9\`): the datum read `
    + `${rendered}; \`Object.keys\` = ${JSON.stringify(drive.keys)} (**PRINTED, NEVER ASSERTED — its insertion `
    + `order is the arrival order**), its set ${JSON.stringify(drive.keysAsSet)}; the statuses read `
    + `${JSON.stringify(drive.entries.map((entry) => (entry === null ? null : entry.status)))}; the bodies' `
    + `settled set at the answer read ${JSON.stringify(drive.settledAtResolution)}; **UNHANDLED REJECTIONS = `
    + `${unhandled.seen.length}**`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 10 OF 12 · `S-SYNCTHROW` — `PIN-4`. **THE ANTI-HARMONISATION CONTROL.**
//
// THE RULING, `D-73`, as `design.md §2` reads it, VERBATIM: *"`settledAnswer` contains **no invocation, no store
// call and no `deliver`**, and is entered only after the start loop returned normally. A synchronous body's
// throw therefore never reaches an `async` frame: it leaves `deliver` as a throw, crosses `terminalArm`
// (`:987`, no `try`), `settleArm`, `runAttempt`, and is re-thrown unchanged by `constraintWrite`'s
// `catch`/`constraintCrossing` (`constraints.mjs:811`–\`:813\`) — **the write answers nothing and the caller sees
// the body's own error object** (measured, `M-1`)."* **`PIN-4` adds its corollary, verbatim:** *"**And:** no
// `async` and no `await` stands anywhere between the first invocation and the last, on any of the five call
// sites."* **THE OBSERVABLE, `contract.md §6` row 10, VERBATIM:** *"a synchronous listener throws a sentinel: the
// write **throws that same object**, answers no record and no thenable, and a sibling started earlier is not
// waited for."*
//
// **THE MEASUREMENT THIS BLOCK RE-TAKES IS `M-1`'s, AND IT IS THE ONE THAT MUST NOT MOVE** (`strata/research.md
// §22.12` (3), verbatim): *"A synchronous throw is the declared channel and behaves as declared. `write` throws
// **the body's own error object** (`C-sync-threw`) and returns **no record** (`record= undefined`); the process
// survives."* **A pass that made `write` `async` would convert this throw into a REJECTION — a harmonisation
// `D-138` item 4 forbids — and this block is what fails loudly if it is made.** **IT IS EXPECTED GREEN ON
// TODAY'S BYTES AND MUST STAY GREEN.**
//
// **WHY THE DRIVE IS TAKEN TWICE, WITH THE TWO REGISTRATIONS IN THE TWO ORDERS.** The `triggered` list's order is
// the store's and unspecified (`DD-22`), so which of the two bodies is invoked first is NOT something a drive may
// assert — and *"a sibling already started"* is only exercised in the order where the sibling is reached first.
// **So the same law is driven in both orders and the block records which of the two actually started a sibling
// before the throw** — the disjunction is a coherence requirement, never an order assertion.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-SYNCTHROW · THE ANTI-HARMONISATION CONTROL (`PIN-4`) — a synchronously throwing listener leaves the write UNANSWERED: the call THROWS THAT SAME OBJECT (identity), answers no record and no thenable, the loop stops there, and a sibling already started is neither awaited nor observed', async (t) => {
  const SENTINEL = new Error('syncthrow — this very object must cross unchanged');
  const neverOpened = gateOf(); // **NEVER OPENED**: an awaited sibling would hang forever, and the withhold asserts it does not
  const run = (order) => {
    const store = make();
    const fired = [];
    const facts = { atThrow: 0 };
    const bodies = {
      sibling: async () => {
        fired.push('sibling:sync-part');
        await neverOpened.promise; // **never opened** — a package that awaited this would never answer
        fired.push('sibling:resumed');
      },
      thrower: () => {
        fired.push('thrower:entered');
        facts.atThrow = fired.length;
        throw SENTINEL;
      },
    };
    for (const name of order) {
      store.listen(`syncthrow-${name}`, [['syncthrow-a']]);
      store.register(`syncthrow-${name}`, bodies[name]);
    }
    const answer = captured(() => store.write(['syncthrow-a'], 'mem', 1));
    return {
      // **THE LIVE LIST, NOT A SNAPSHOT OF IT** — a later mark pushed by an awaited sibling must be visible
      // to the reading below, or the assertion that no sibling resumed would be vacuous by construction.
      order, answer, firedAtTheThrow: facts.atThrow, fired, store,
      openAtTheThrow: openCommits(store),
    };
  };
  const first = run(['sibling', 'thrower']);
  const second = run(['thrower', 'sibling']);
  await drain();
  await drain();
  const runs = [first, second].map((one) => ({ ...one, firedAfterDrains: one.fired.slice() }));

  // ── (a) THE DRIVE REACHED ITS ARM IN AT LEAST ONE ORDER — the sibling really was started before the throw. ─
  assert.equal(runs.some((one) => one.firedAtTheThrow >= 2), true,
    `**THE DRIVE MUST REACH THE ARM IT EXISTS FOR — "A SIBLING ALREADY STARTED"** — in at least one of the two `
      + `registration orders, or the second half of \`PIN-4\` is not being discharged and the block says so `
      + `instead of reporting a verdict (\`D-21\`; \`DD-22\`: the invocation order is the store's and is not `
      + `asserted here). The two runs started ${JSON.stringify(runs.map((one) => one.firedAtTheThrow))} `
      + `bodies before their throw`);

  for (const one of runs) {
    const label = `the order ${JSON.stringify(one.order)}`;
    // ── (b) THE THROW IS THAT SAME OBJECT, AND IT IS NOT A PROMISE. ────────────────────────────────────────
    assert.equal(one.answer.ok, false,
      `**${label} · THE CALL ANSWERS NOTHING — IT THROWS** (\`PIN-4\`: *"the act answers no record and no `
        + `thenable"*): it ${one.answer.ok ? `RETURNED ${JSON.stringify(one.answer.value)}` : 'threw'}`);
    assert.equal(one.answer.caught, SENTINEL,
      `**AND THE THROWN VALUE IS THE BODY'S OWN OBJECT — THE SAME IDENTITY, NOT A COPY, NOT A RENDERED FORM** `
        + `(\`contract.md §6\` row 10: *"the write **throws that same object**"*; \`M-1\`: *"\`write\` throws **the `
        + `body's own error object**"\`): ${label} threw `
        + `${JSON.stringify(one.answer.caught === null || typeof one.answer.caught !== 'object' ? String(one.answer.caught) : one.answer.caught.message)}`);
    assert.equal(isThenable(one.answer.caught), false,
      `**AND NOTHING AWAITED IT — THE THROWN VALUE IS NO THENABLE** (\`PIN-4\`: no \`async\` and no \`await\` stands `
        + `between the first invocation and the last): ${label} threw a thenable`);

    // ── (c) THE LOOP STOPPED AT THE THROW, AND NO SIBLING WAS WAITED FOR. ──────────────────────────────────
    assert.equal(one.firedAfterDrains.length, one.firedAtTheThrow,
      `**THE START LOOP ENDS AT THE THROW — NO LATER BODY STARTS** (\`design.md §7\` arm 1: *"'Start all' is a `
        + `property of the non-throwing arm only: a throw pre-empts the loop and later bodies never start"*): `
        + `${label} had fired ${one.firedAtTheThrow} bod(y/ies) at the throw and `
        + `${one.firedAfterDrains.length} after two drains — ${JSON.stringify(one.firedAfterDrains)}`);
    assert.equal(one.firedAfterDrains.includes('sibling:resumed'), false,
      `**AND A SIBLING ALREADY STARTED IS NEITHER AWAITED NOR OBSERVED** (\`PIN-4\`; \`design.md §7\` arm 1: `
        + `*"Bodies already started are **not** waited for and their settlements are **not** observed"*; `
        + `\`D-130\` item 5's caller hazard): ${label} read ${JSON.stringify(one.firedAfterDrains)}`);
    assert.equal(one.openAtTheThrow, 0,
      `**AND THE THROW LEAVES NO BRACKET STANDING** (\`contract.md §4\` \`PIN-7\`: the count is \`0\` at every `
        + `microtask boundary; the \`finally\` at \`index.mjs:759\`–\`:761\` releases it on every arm): ${label} read `
        + `${JSON.stringify(one.openAtTheThrow)}`);
  }

  t.diagnostic(`S-SYNCTHROW · THE ANTI-HARMONISATION CONTROL (\`PIN-4\`): order `
    + `${JSON.stringify(runs[0].order)} threw ${JSON.stringify(runs[0].answer.ok ? null : runs[0].answer.caught === SENTINEL ? '<THE SENTINEL, BY IDENTITY>' : '<another value>')} `
    + `after ${runs[0].firedAtTheThrow} start(s) → ${JSON.stringify(runs[0].firedAfterDrains)}; order `
    + `${JSON.stringify(runs[1].order)} threw `
    + `${JSON.stringify(runs[1].answer.ok ? null : runs[1].answer.caught === SENTINEL ? '<THE SENTINEL, BY IDENTITY>' : '<another value>')} `
    + `after ${runs[1].firedAtTheThrow} start(s) → ${JSON.stringify(runs[1].firedAfterDrains)}; **NEITHER ORDER `
    + `AWAITED THE SIBLING AND NEITHER ANSWERED A RECORD OR A THENABLE**`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 11 OF 12 · `S-RECEIPT-ACCESSOR` — `PIN-10` and `PIN-12`.
//
// THE RULING, `PIN-10`, VERBATIM: *"`Object.keys(record)` stays `["op","watched","triggered"]`;
// `Object.getOwnPropertyNames` moves `5 → 6` with `bodyFailures` present; the descriptor is `{ enumerable:
// false, configurable: true, get: … }`; the plain arm reads the frozen empty `{}` and is present, never absent
// and never `undefined`; and no seventh name is added here."* **And `D-138`'s unsettled item 3, which forces the
// PRESENCE** (`design.md §5`): *"a body's failure must be readable **exactly when no channel stands**, so no
// `channel`-conditional presence and no `undefined` arm"*; **and the datum is a per-handle map, *"its empty value
// is `{}` rather than `log`'s `[]`"*, a frozen module-level constant on `defineResolutionLog`'s precedent**
// (`constraints.mjs:1959`).
//
// **THE FIGURE `5 → 6` IS THE *WRITE* RECORD'S AND IS MEASURED, NOT ASSUMED.** `contract.md`'s figures line
// prints *"today's `Object.getOwnPropertyNames(record)` reads **five** (measured, `strata/research.md §23.16`
// (2))"* and `design.md §5` prints the five: `["op","watched","triggered","discarded","log"]`. **The `delete`'s
// RECEIPT IS NOT AT FIVE AND THIS BLOCK DOES NOT PRETEND IT IS** — it already carries `commit` and `log` beside
// `discarded` (`constraints.mjs:1021`, `:1029`; `index.mjs:906`) — **so for the delete and for the rollback the
// block asserts PRESENCE, THE DESCRIPTOR and the UNMOVED `Object.keys`, and records the own-name count at its
// diagnostic instead of pinning a figure this contract does not print for them.** The rollback's own record is
// at five today for the same reason the write's is (three enumerable + `discarded` + `log`,
// `index.mjs:1005`), and its `6` IS asserted below.
//
// **`PIN-12`'s HALF** — *"the instance stays at fifteen own members"* — is asserted beside it: the datum is
// symbol-keyed on the RECORD and the accessor is a member of the record, so the PRODUCT's census must not move
// (`A117` (D6)'s device).
//
// **THE UNHANDLED-REJECTION COUNTER IS INSTALLED** because arm (b) drives a rejecting body through a write whose
// answer this block must hold; without it the same `M-2` fatality would end the run. It is asserted `0`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-RECEIPT-ACCESSOR · THE CENSUS MOVES BY ONE NAME AND NO MORE (`PIN-10`, `PIN-12`) — over a plain write, a rejected-body write, a delete and a rollback: `Object.keys` is unmoved, `getOwnPropertyNames` reads `7` for the write with `bodyFailures` AND `returnedValues` present — **⟶ AND THE TITLE IS RE-CUT FROM `6` 2026-11-17: the ASSERTION was re-pinned to seven when `U-STOREROOM-08` landed and the title was left behind, so this name contradicted the cell it names. A title printing a figure that the assertion does not read is the same defect as a sentence one layer up**, the descriptor is a non-enumerable `configurable` GETTER, and the plain arm reads the frozen `{}` and is PRESENT', async (t) => {
  const unhandled = countUnhandled();
  let drive = null;
  try {
    const store = make();
    // (a) A PLAIN WRITE — an all-synchronous delivered set, so the answer is a record (`PIN-6`).
    store.listen('ra-plain', [['ra-plain']]);
    store.register('ra-plain', () => {});
    const plain = store.write(['ra-plain'], 'mem', 1);
    // (b) A REJECTED-BODY WRITE.
    store.listen('ra-reject', [['ra-rejected']]);
    store.register('ra-reject', async () => { await null; throw new Error('ra-the body refused'); });
    const rejectedAnswer = store.write(['ra-rejected'], 'mem', 1);
    const rejected = await rejectedAnswer;
    await drain();
    await drain();
    // (c) A DELETE.
    store.write(['ra-del'], 'mem', 1);
    store.listen('ra-del', [['ra-del']]);
    store.register('ra-del', () => {});
    const deletion = await store.delete(['ra-del'], 'mem');
    // (d) A ROLLBACK — a lawful reversal at rest, so its judgement answers its own three-member record.
    const written = store.write(['ra-rb'], 'mem', 1);
    const reversal = await store.rollback(written.op.opId);

    const describe = (label, record) => ({
      label,
      keys: record === null || typeof record !== 'object' ? [] : Object.keys(record),
      ownNames: record === null || typeof record !== 'object' ? [] : Object.getOwnPropertyNames(record),
      failures: record === null || typeof record !== 'object' ? null : memberOf(record, 'bodyFailures'),
    });
    drive = {
      store,
      plain: describe('a plain write', plain),
      rejected: describe('a rejected-body write', rejected),
      deletion: describe('a delete', deletion),
      reversal: describe('a rollback', reversal),
      instanceOwnNames: Object.getOwnPropertyNames(store),
    };
  } finally {
    unhandled.stop();
  }

  const { plain, rejected, deletion, reversal } = drive;

  // ── (a) `Object.keys` IS UNMOVED ON EVERY ARM. ────────────────────────────────────────────────────────────
  assert.deepEqual(asSet(plain.keys), ['op', 'triggered', 'watched'],
    `**\`Object.keys\` STAYS \`["op","watched","triggered"]\`** — \`PIN-10\`, VERBATIM — on the plain write: the drive `
      + `read ${JSON.stringify(plain.keys)}`);
  assert.deepEqual(asSet(rejected.keys), ['op', 'triggered', 'watched'],
    `**AND ON THE REJECTED-BODY WRITE — THE DATUM IS NOT AN ENUMERABLE MEMBER** (\`PIN-10\`: *"No seventh name is `
      + `added here"*; \`design.md §5\`: *"a fourth enumerable member"* is what the accessor must NOT be): the `
      + `drive read ${JSON.stringify(rejected.keys)}`);
  assert.deepEqual(asSet(deletion.keys), ['address', 'op', 'tiers', 'triggered'],
    `**AND THE DELETE'S DECLARED FOUR ARE UNMOVED** (\`PAR-JS-16\`; \`D-49\`'s \`discarded\` and \`D-49\`'s \`commit\` `
      + `are both non-enumerable): the drive read ${JSON.stringify(deletion.keys)}`);
  assert.deepEqual(asSet(reversal.keys), ['opId', 'restoredTo', 'undoneOps'],
    `**AND THE ROLLBACK'S DECLARED THREE** (\`PAR-JS-9\`; \`D-75\`'s \`discarded\` is an accessor): the drive read `
      + `${JSON.stringify(reversal.keys)}`);

  // ── (b) `getOwnPropertyNames` MOVES `5 → 6` ON THE WRITE, WITH `bodyFailures` PRESENT. ───────────────────
  assert.deepEqual(asSet(plain.ownNames),
    ['bodyFailures', 'discarded', 'log', 'op', 'returnedValues', 'triggered', 'watched'],
    `**THE WRITE'S OWN NAMES MOVE \`5 → 6\` AND BY ONE NAME ONLY** (\`PIN-10\`, VERBATIM; today's five are measured `
      + `at \`strata/research.md §23.16\` (2) and printed at \`design.md §5\`: `
      + `\`["op","watched","triggered","discarded","log"]\`): the drive read ${JSON.stringify(plain.ownNames)}`);
  // **⟶ RE-PINNED AT THIS LINE, 2026-11-17, WHEN `U-STOREROOM-08 RETURN-VALUES` LANDED:** the count is **seven**, and
  // the seventh name is that unit's `returnedValues` — the accessor `D-150` item 1 named, over the settled return values
  // `D-149` item 2 put on the receipt. **This cell's own earlier sentence said *"a seventh name here is the seventh
  // `U-08 CHANNEL` owes and not this unit's"*; the unit landed and the name is owed no longer.**
  assert.equal(plain.ownNames.length, 7,
    `and the count is seven — the three typed, \`discarded\`, \`log\`, \`bodyFailures\` (this unit) and `
      + `\`returnedValues\` (\`U-STOREROOM-08\`, \`D-150\` item 1): ${plain.ownNames.length}`);
  assert.equal(rejected.ownNames.includes('bodyFailures'), true,
    `**AND IT IS PRESENT ON THE REJECTED-BODY ARM TOO** (\`PIN-10\`: *"present always"*): `
      + `${JSON.stringify(rejected.ownNames)}`);
  assert.equal(deletion.ownNames.includes('bodyFailures'), true,
    `**AND ON THE DELETE'S RECEIPT** (\`contract.md §3\`: the accessor is installed *"at the build"* on **both** `
      + `receipt-building frames): ${JSON.stringify(deletion.ownNames)}`);
  assert.deepEqual(asSet(reversal.ownNames),
    ['bodyFailures', 'discarded', 'log', 'opId', 'restoredTo', 'returnedValues', 'undoneOps'],
    `**AND ON THE ROLLBACK'S RECORD, WHICH IS AT FIVE TODAY FOR THE WRITE'S OWN REASON** (three enumerable + `
      + `\`discarded\` + \`log\`; \`index.mjs:1005\`): the drive read ${JSON.stringify(reversal.ownNames)}`);

  // ── (c) THE DESCRIPTOR — A NON-ENUMERABLE, `configurable` OWN **GETTER**. ─────────────────────────────────
  for (const arm of [plain, rejected, deletion, reversal]) {
    const descriptor = arm.failures === null ? undefined : arm.failures.descriptor;
    assert.equal(descriptor !== undefined, true,
      `**${arm.label} · THE MEMBER MUST BE PRESENT** (\`PIN-10\`: *"never absent and never \`undefined\`"*): the `
        + `descriptor was ${JSON.stringify(descriptor === undefined ? null : descriptor)}`);
    assert.equal(descriptor.enumerable, false,
      `**${arm.label} · \`enumerable: false\`** — a fourth enumerable member is the one thing \`PIN-10\` names as `
        + `forbidden: the descriptor read ${JSON.stringify(descriptor)}`);
    assert.equal(descriptor.configurable, true,
      `**${arm.label} · \`configurable: true\`** — \`PIN-10\`'s own figure: ${JSON.stringify(descriptor)}`);
    assert.equal(typeof descriptor.get, 'function',
      `**${arm.label} · AND IT IS A \`get\`** (\`design.md §5\`: *"A getter by necessity, not by taste: the record `
        + `is built at \`constraints.mjs:859\`–\`:895\` *before* the set settles, so a datum captured there would `
        + `answer \`{}\` about a body that then rejects"*): the descriptor read ${JSON.stringify(descriptor)}`);
    assert.equal(Object.hasOwn(descriptor, 'value'), false,
      `**${arm.label} · AND NOT A DATA PROPERTY** (\`PIN-10\`; \`design.md §5\`: *"a data property"* is in the `
        + `"must not acquire" column): the descriptor read ${JSON.stringify(descriptor)}`);
  }

  // ── (d) THE PLAIN ARM READS THE FROZEN EMPTY `{}`, AND IS PRESENT. ─────────────────────────────────────────
  assert.deepEqual(plain.failures.value, {},
    `**THE PLAIN ARM READS \`{}\` AND IS PRESENT** (\`PIN-10\`, VERBATIM: *"the plain arm reads the frozen empty `
      + `\`{}\` and is present"*; \`design.md §5\`: *"its empty value is \`{}\` rather than \`log\`'s \`[]\`"*): the `
      + `read answered ${JSON.stringify(plain.failures.value)}`);
  assert.equal(Object.isFrozen(plain.failures.value), true,
    `**AND IT IS THE FROZEN CONSTANT AND NOT A FRESH \`{}\` PER CALL** (\`design.md §5\`: *"A frozen module-level `
      + `\`{}\` is the constant, on \`defineResolutionLog\`'s precedent for \`[]\`"*): frozen read `
      + `${JSON.stringify(Object.isFrozen(plain.failures.value))}`);
  assert.deepEqual(asSet(Object.keys(plain.failures.value)), [],
    'and it carries no handle: the empty map is empty');
  assert.deepEqual(rejected.failures.value === undefined ? null : asSet(Object.keys(rejected.failures.value)),
    ['ra-reject'],
    `**AND THE REJECTED-BODY ARM READS ITS ONE ENTRY AT THE REJECTING HANDLE** (\`PIN-5\`): `
      + `${JSON.stringify(rejected.failures.value)}`);
  assert.deepEqual(deletion.failures.value, {},
    `and the delete's receipt reads the empty map — no rejection is a failure form on it: `
      + `${JSON.stringify(deletion.failures.value)}`);
  assert.deepEqual(reversal.failures.value, {},
    `and the rollback's record reads the empty map: ${JSON.stringify(reversal.failures.value)}`);

  // ── (e) `PIN-12` — NOTHING ELSE MOVES: THE INSTANCE'S OWN MEMBER SET. ─────────────────────────────────────
  assert.equal(drive.instanceOwnNames.length, 15,
    `**THE INSTANCE STAYS AT FIFTEEN OWN MEMBERS** (\`PIN-12\`, VERBATIM: *"the instance stays at fifteen own `
      + `members"*; \`surface.md §2.4\` item 9 (f)'s clause: \`10 + 1 + 1 + 2 + 1 = 15\` ✓): the drive read `
      + `${JSON.stringify(drive.instanceOwnNames)}`);
  assert.deepEqual(unhandled.seen, [],
    `and the arm-(b) rejecting body produced no unhandled rejection (\`strata/research.md §22.12\`'s \`M-2\`): `
      + `${JSON.stringify(unhandled.seen.map((one) => (one === null || typeof one !== 'object' ? String(one) : one.message)))}`);

  t.diagnostic(`S-RECEIPT-ACCESSOR · THE CENSUS (\`PIN-10\`, \`PIN-12\`): the plain write read keys `
    + `${JSON.stringify(plain.keys)} / own ${JSON.stringify(plain.ownNames)} (${plain.ownNames.length}) / `
    + `\`bodyFailures\` = ${JSON.stringify(plain.failures.value)} (frozen `
    + `${JSON.stringify(Object.isFrozen(plain.failures.value))}); the rejected-body write read own `
    + `${JSON.stringify(rejected.ownNames)} with \`bodyFailures\` = ${JSON.stringify(rejected.failures.value)}; the `
    + `delete read own ${JSON.stringify(deletion.ownNames)} (${deletion.ownNames.length}) and the rollback own `
    + `${JSON.stringify(reversal.ownNames)} (${reversal.ownNames.length}) — **THE \`5 → 6\` FIGURE IS THE WRITE'S `
    + `AND THE OTHER TWO ARE PRINTED, NOT PINNED**; the instance's own names read `
    + `${drive.instanceOwnNames.length}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 12 OF 12 · `S-SETTLE-3` *(control)* — `PIN-6` and `PIN-11`. **THE ALL-SYNCHRONOUS CONTROL AND THE ONE
// THAT KEEPS EVERY SHIPPED CELL GREEN.**
//
// **ARM (a) — `PIN-6`, VERBATIM:** *"A delivered set whose bodies are all synchronous produces **no thenable**:
// `deliver` answers `null`, `settledAnswer` is never invoked, `write` answers the record it answered before,
// `Object.keys` is the three."* **`design.md §2`:** *"`null` iff no started invocation returned a thenable — **so
// an all-synchronous delivery produces no promise anywhere and no shipped cell changes shape**"*.
// **ARM (b) — `PIN-11`, VERBATIM:** *"The creation answers an instance, a registration an identity or
// `undefined`, a reversal's judgement its log — each is **not a thenable on every arm**, including the arm where a
// body suspends; and `settlement` is absent at those sites so that a rejecting body there stays `D-130` item 5's
// caller hazard rather than becoming a declared silence (`D-138` item 4's asymmetry, kept)."* **`D-149` item 1 is
// the ruling that removed the forged path:** *"nothing is forged — the package invokes only listeners … **the
// creation's and the four registration instants' calls pass NOTHING and withhold nothing** — their answers are an
// instance and an identity, and the caller is the one who acted."*
//
// **WHAT THIS BLOCK IS, SAID PLAINLY SO NO READER TAKES IT FOR A FALSIFIER OF TODAY'S BYTES.** Arm (a) and arm
// (b) are **CONTROLS**: they are expected GREEN on today's tree and must stay green after the landing. **A
// control's red is a defect of the landing and not of the drive** — it fails exactly when a later pass makes a
// no-receipt instant withhold an answer, or makes an all-synchronous write answer a promise.
//
// **ONE HONEST EDGE, NAMED AT ITS OWN ARM.** At the CREATION no caller body can be suspended: a body reaches the
// package through `listen` + `register` (`D-22`; `surface.md §2.4` item 5) or through a `cfg.constraints` element
// whose own registration ask is *synchronous by construction* — a pair's answer is read as a value, not awaited
// — so the creation's delivered set can fire no caller function at all. **The creation's arm therefore asserts
// the ANSWER's shape, which is `PIN-11`'s own subject, and says at its diagnostic that it carries no suspension
// rather than claiming one.**
//
// **THE OTHER THREE INSTANTS DO CARRY A SUSPENDING BODY**, and each proves it did: the fired listener is `async`,
// awaits a gate, and the gate is opened only after the instant's answer has been captured — so the answer was
// taken WHILE the body hung.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('S-SETTLE-3 · THE ALL-SYNCHRONOUS CONTROL (`PIN-6`, `PIN-11`) · arm (a): an all-synchronous delivered set answers a RECORD and `typeof answer.then !== \'function\'`; arm (b): the creation, `addConstraint`, a re-arm and a `rollback`\'s judgement each answer NOT a thenable, on the arm where a body really suspends', async (t) => {
  // ═══ ARM (a) · NO PROMISE ANYWHERE ═══════════════════════════════════════════════════════════════════════
  const store = make();
  const ran = [];
  for (const handle of ['settle3-a', 'settle3-b', 'settle3-c']) {
    store.listen(handle, [['settle3-addr']]);
    store.register(handle, () => { ran.push(handle); });
  }
  const answer = captured(() => store.write(['settle3-addr'], 'mem', 1));
  const record = answer.ok ? answer.value : null;

  assert.equal(answer.ok, true,
    `**THE WRITE STANDS** — three synchronous bodies and no refusal: the call ${armOf(answer)}`);
  assert.equal(record !== null && typeof record === 'object', true,
    `**AN ALL-SYNCHRONOUS DELIVERED SET ANSWERS A RECORD** (\`contract.md §6\` row 12, arm (a)): the call `
      + `returned ${JSON.stringify(answer.ok ? typeof answer.value : statusOf(answer.caught))}`);
  assert.ok(typeof record.then !== 'function',
    `**AND \`typeof answer.then !== 'function'\` — NO THENABLE ANYWHERE** (\`PIN-6\`, VERBATIM: *"A delivered set `
      + `whose bodies are all synchronous produces **no thenable**"*; \`design.md §2\`: *"so an all-synchronous `
      + `delivery produces no promise anywhere and no shipped cell changes shape"*): \`typeof answer.then\` read `
      + `${JSON.stringify(typeof record.then)}`);
  assert.equal(isThenable(record), false,
    `and read as the same fact from the other side: ${JSON.stringify(isThenable(record))}`);
  assert.deepEqual(asSet(Object.keys(record)), ['op', 'triggered', 'watched'],
    `**AND \`Object.keys\` IS THE THREE** (\`PIN-6\`: *"\`Object.keys\` is the three"*; \`PAR-JS-13\`): the drive read `
      + `${JSON.stringify(Object.keys(record))}`);
  assert.deepEqual(asSet(ran), ['settle3-a', 'settle3-b', 'settle3-c'],
    `**AND THE PREMISE IS MEASURED — ALL THREE BODIES RAN SYNCHRONOUSLY, INSIDE THE CALL** (no drain was taken `
      + `before this reading): the drive counted ${JSON.stringify(asSet(ran))}`);

  // ═══ ARM (b) · THE FOUR NO-RECEIPT INSTANTS ═══════════════════════════════════════════════════════════════
  //
  // **THE ONE INSTANT WITH NO SUSPENSION, SAID AT ITS OWN ASSERTION** (the header's honest edge): the creation.
  const created = captured(() => storeCreate({ journalLength: 64, listeners: [] }));
  const creationAnswer = created.ok ? created.value : null;

  // ── (b.1) `addConstraint` — A REPAIR'S ROUTE-WRITE FIRES AN `async` LISTENER THAT SUSPENDS. ─────────────
  const addStore = make();
  const addGate = gateOf();
  let addSuspended = false;
  addStore.listen('settle3-addListener', [['settle3-addPair']]);   // the repair's own target, so its write fires this body
  addStore.register('settle3-addListener', async () => {
    await addGate.promise;
    addSuspended = true;
  });
  const added = captured(() => addStore.addConstraint(
    { address: ['settle3-addPair'], id: 'settle3-addPair' },
    (context) => (context.value !== undefined
      ? true
      : {
        // **⟶ REPAIRED AT THIS BLOCK, 2026-11-17: THE REPAIR WRITES AT THE PAIR'S OWN ADDRESS.** The `addConstraint`
        // arm's context carries a non-null `op` or `tier` at every pass, so the earlier `context.op !== null ||
        // context.tier !== null` guard answered `true` and NO REPAIR EVER LANDED — the drive could not reach its own
        // premise (`addSuspended` read `false`). **A repair writing elsewhere cannot satisfy the pair**, so the act
        // would refuse and the arm would measure the refusal rather than the withhold.
        message: '`["settle3-addPair"]` must exist',
        repair: (held) => ({ ok: true, op: addStore.write(['settle3-addPair'], 'mem', 2, held).op }),
      }),
  ));

  // ── (b.2) A RE-ARM — the same instant through `constraintOn`, driven as `CSW-17` drives it. ─────────────
  const rearmStore = make();
  const rearmGate = gateOf();
  let rearmSuspended = false;
  rearmStore.listen('settle3-rearmListener', [['settle3-rearmPair']]);   // the repair's own target
  rearmStore.register('settle3-rearmListener', async () => {
    await rearmGate.promise;
    rearmSuspended = true;
  });
  const rearmPair = { address: ['settle3-rearmPair'], id: 'settle3-rearmPair' };
  const rearmBody = (context) => (context.value !== 1
    ? {
      // **⟶ REPAIRED AT THIS BLOCK, 2026-11-17.** The pair stands at `'settled'` from the write below, so
      // `context.value !== undefined` answered `true` at every pass and no repair landed — the same unreachable
      // premise as (b.1). **The pair now refuses until its own address reads `1`, and the repair writes exactly
      // that**, so the re-run passes and the listener at the pair's address fires.
      message: '`["settle3-rearmPair"]` must read 1',
      repair: (held) => ({ ok: true, op: rearmStore.write(['settle3-rearmPair'], 'mem', 1, held).op }),
    }
    : true);
  rearmStore.write(['settle3-rearmPair'], 'mem', 'settled');
  const rearmAdded = captured(() => rearmStore.addConstraint(rearmPair, rearmBody));
  const rearmDisabled = rearmAdded.ok ? captured(() => rearmStore.constraintOff(rearmPair, rearmBody)) : null;
  const rearmCleared = rearmDisabled !== null && rearmDisabled.ok
    ? captured(() => rearmStore.delete(['settle3-rearmPair'], 'mem'))
    : null;
  const rearmed = rearmCleared !== null && rearmCleared.ok
    ? captured(() => rearmStore.constraintOn(rearmPair, rearmBody))
    : null;

  // ── (b.3) A `rollback`'S JUDGEMENT — a pair refuses the post-reversal state, its repair rewrites the
  //          address (so the re-run passes) and that write fires an `async` listener which suspends. ───────
  const reversionStore = make();
  reversionStore.write(['settle3-r'], 'mem', 1);
  const reversed = reversionStore.write(['settle3-r'], 'mem', 2);
  const reversionGate = gateOf();
  let reversionSuspended = false;
  reversionStore.listen('settle3-reversionListener', [['settle3-r']]);
  reversionStore.register('settle3-reversionListener', async () => {
    await reversionGate.promise;
    reversionSuspended = true;
  });
  const reversionPair = captured(() => reversionStore.addConstraint(
    { address: ['settle3-r'], id: 'settle3-reversionPair' },
    (context) => (context.value === 1
      ? {
        message: '`["settle3-r"]` must not stand at 1',
        repair: (held) => ({ ok: true, op: reversionStore.write(['settle3-r'], 'mem', 3, held).op }),
      }
      : true),
  ));
  const judged = captured(() => reversionStore.rollback(reversed.op.opId));

  // **THE INSTANTS' ANSWERS ARE CAPTURED; ONLY NOW ARE THE GATES OPENED**, so every answer above was taken
  // while its body hung.
  addGate.open();
  rearmGate.open();
  reversionGate.open();
  await drain();
  await drain();

  // ── (b.0) THE DRIVE REACHED ITS ARMS. ─────────────────────────────────────────────────────────────────────
  assert.equal(created.ok, true,
    `**THE CREATION MUST ANSWER AN INSTANCE** (\`PIN-11\`: *"The creation answers an instance"*): the call `
      + `${armOf(created)}`);
  assert.equal(added.ok, true,
    `**THE \`addConstraint\` MUST ANSWER ITS IDENTITY** — its fired body is \`async\` and does not throw: the call `
      + `${armOf(added)}`);
  assert.equal(addSuspended, true,
    `**AND THE BODY IT FIRED MUST ACTUALLY SUSPEND — THE ARM THIS INSTANT EXISTS FOR** (\`PIN-11\`: *"including `
      + `the arm where a body suspends"*): the drive read ${JSON.stringify(addSuspended)}`);
  assert.equal(rearmed !== null && rearmed.ok, true,
    `**THE RE-ARM MUST STAND** (\`CSW-17\`'s drive): the call `
      + `${rearmed === null ? 'was never reached' : armOf(rearmed)}`);
  assert.equal(rearmSuspended, true,
    `**AND ITS FIRED BODY MUST ACTUALLY SUSPEND**: the drive read ${JSON.stringify(rearmSuspended)}`);
  assert.equal(reversionPair.ok, true,
    `the reversal's pair must register (\`A135\` (3)'s registration arm admits \`2\`): the call `
      + `${armOf(reversionPair)}`);
  assert.equal(judged.ok, true,
    `**AND THE ROLLBACK MUST ANSWER ITS RECORD** (\`PAR-JS-9\`; \`D-117\` item 1 puts the delivery inside the `
      + `judgement's own frame): the call ${armOf(judged)}`);
  assert.equal(reversionSuspended, true,
    `**AND THE BODY ITS JUDGEMENT'S DELIVERY FIRED MUST ACTUALLY SUSPEND**: the drive read `
      + `${JSON.stringify(reversionSuspended)}`);

  // ── (b.4) THE SUBJECT — NOT ONE OF THE FOUR ANSWERS IS A THENABLE. ────────────────────────────────────────
  assert.equal(isThenable(creationAnswer), false,
    `**THE CREATION'S ANSWER IS NOT A THENABLE** (\`PIN-11\`; \`D-149\` item 1: *"the creation's and the four `
      + `registration instants' calls pass NOTHING and withhold nothing — their answers are an instance and an `
      + `identity"*): the drive read ${JSON.stringify(isThenable(creationAnswer))}. **THIS ARM CARRIES NO `
      + `SUSPENSION AND SAYS SO** — a body reaches the package only through \`listen\` + \`register\`, which cannot `
      + `precede the creation's own return, so the assertion is the ANSWER's shape, which is this pin's subject`);
  assert.equal(isThenable(added.value), false,
    `**AND \`addConstraint\`'S ANSWER IS NOT A THENABLE — WITH THE BODY SUSPENDED** (\`PIN-11\`): the identity it `
      + `answered read ${JSON.stringify(added.value === undefined ? '<undefined>' : typeof added.value)}`);
  assert.equal(isThenable(rearmed.value), false,
    `**AND THE RE-ARM'S \`undefined\` IS NOT A THENABLE** (\`PIN-11\`; \`D-125\` item 2: *"a re-arm still answers `
      + `\`undefined\`"): the drive read ${JSON.stringify(rearmed.value === undefined ? '<undefined>' : typeof rearmed.value)}`);
  assert.equal(rearmed.value, undefined,
    `and it is exactly \`undefined\`: ${JSON.stringify(rearmed.value === undefined ? '<undefined>' : rearmed.value)}`);
  assert.equal(isThenable(judged.value), false,
    `**AND THE ROLLBACK'S JUDGEMENT ANSWERS ITS RECORD, NOT A THENABLE** (\`PIN-11\`: *"a reversal's judgement its `
      + `log"*; \`design.md §13\`: *"A reversal's judgement therefore answers synchronously on every arm"*): the `
      + `drive read ${JSON.stringify(isThenable(judged.value))}`);
  assert.deepEqual(asSet(Object.keys(judged.value)), ['opId', 'restoredTo', 'undoneOps'],
    `**AND ITS RECORD IS THE DECLARED THREE** (\`PAR-JS-9\`): ${JSON.stringify(Object.keys(judged.value))}`);

  t.diagnostic(`S-SETTLE-3 · THE CONTROLS (\`PIN-6\`, \`PIN-11\`): arm (a) — the all-synchronous write answered `
    + `${JSON.stringify(typeof record.then)} for \`answer.then\`, keys ${JSON.stringify(Object.keys(record))}, `
    + `bodies run ${JSON.stringify(asSet(ran))}; arm (b) — the creation answered an instance `
    + `(${JSON.stringify(isThenable(creationAnswer))} thenable, **no suspension at that instant, recorded as `
    + `such**), \`addConstraint\` answered ${JSON.stringify(added.value === undefined ? '<undefined>' : typeof added.value)} `
    + `with its body suspended ${JSON.stringify(addSuspended)}, the re-arm answered `
    + `${JSON.stringify(rearmed.value === undefined ? '<undefined>' : typeof rearmed.value)} with its body `
    + `suspended ${JSON.stringify(rearmSuspended)}, and the rollback answered `
    + `${JSON.stringify(Object.keys(judged.value))} with its judgement's body suspended `
    + `${JSON.stringify(reversionSuspended)} — **NOT ONE OF THE FOUR IS A THENABLE**`);
});
