// `receiver-detachment.test.mjs` — **A DETACHED CALL IS REFUSED, IT MOVES NO STATE, AND IT THROWS THE ONE
// PLAIN FORM — ALL FOURTEEN MEMBERS, ONE ANSWER.**
//
// ── WHY THIS FILE EXISTS ────────────────────────────────────────────────────────────────────────────────
//
// The architect's ruling, verbatim: ***"Run the fix by rejecting the detached functions."*** **THE DEFECT IT
// ANSWERS WAS MEASURED 2026-10-26 AND THE MEASUREMENT IS RE-TAKEN AT THIS FILE'S OWN `before` CLAUSE BELOW,
// BECAUSE A CELL THAT CANNOT SAY WHAT IT WAS RED AGAINST IS A CELL THAT CANNOT BE CHECKED:**
//
//   * the seven store-reaching verbs (`read`, `readLiteral`, `write`, `delete`, `rollback`, `listen`,
//     `unlisten`) answered a detached call with ONE refusal — `{status: 'AddressMalformed', message: "the
//     receiver position is not the store object this addon's storeCreate returned", log: []}`;
//   * `removeListener` answered that same refusal, and `register` answered its own domain refusal in the same
//     form (it is a *handle-domain* arm, not a receiver arm — see the arm's own note below);
//   * **and the four constraint members did NOT refuse for the detachment at all** — a detached
//     `addConstraint` **ANSWERED and edited the real store's pair registry**, a detached `removeConstraint`
//     **deleted a standing pair**, the detached toggles threw the constraint methods' `TypeError`
//     (`status` ABSENT, `log: []`, an `Error`), and a detached `constraints()` answered the read.
//
// **SO ONE LAWFUL-BUT-DETACHED CALL WAS ANSWERED THREE DIFFERENT WAYS ACROSS THE PACKAGE'S OWN SURFACE: A
// REFUSAL, A STATE EDIT, AND A RAW-ISH CLASS ERROR.** This file drives all fourteen detached and asserts the
// one answer — **and, because the state edit is the half that makes this a defect rather than a style
// question, it proves the state did not move rather than asserting that it did not.**
//
// ── THE CLAUSES THIS FILE IS WRITTEN TO (NO SOURCE BYTE AND NO `strata/**` PATH IS OPENED BY IT) ───────────
//
//   * **the ONE FORM**: `docs/specs/storeroom-js/surface.md §2.5` items 1–4 and 9 — a failure crosses as a
//     THROWN PLAIN OBJECT carrying exactly `{status, message, log}`, never an `Error` subclass, and `log` is
//     the EMPTY ARRAY where the failure's cause has no attempt at all.
//   * **the RECEIVER ARM**: the addon's `not_a_receiver` (`bindings/js/src/facade.rs`), reached by the seven
//     verbs because they hand their own `this` to their own entry — `status: 'AddressMalformed'`, the one
//     message this file spells once in `THE_RECEIVER_ARM`.
//   * **THE STATUS AND MESSAGE THE FOUR CONSTRAINT MEMBERS TAKE ARE THE SEVEN'S, BYTE FOR BYTE**: **NO
//     CONSTRAINT CLAUSE NAMES A DIFFERENT ARM** — `docs/specs/storeroom-constraints/contract.md` carries no
//     receiver clause at all (its failure channel is the `KC` channel, `§5.3`, whose subject is a PASS's
//     refusal and never a call's shape), `docs/specs/storeroom-js/surface.md §2.6` is MOVED OUT with a
//     one-line pointer, and `§2.7` is listener delivery. So the seven's form governs, unaltered.
//   * **`D-35` / `D-36` ARE UNMOVED AND ARE NOT TESTED AWAY**: the object model is NOT hardened by this
//     change and a REBOUND member is still the client's own function and still undetected (`§12.2`'s second
//     half). This file asserts nothing about rebinding but the one fact that keeps it honest — a member
//     called on a LIVE receiver still answers (`cell 3`, the control).
//
// ── THE LAYER, AND `D-21` ────────────────────────────────────────────────────────────────────────────────
//
// **LAYER: `ENVELOPE` against the built artefact on the checkout. `APP LAYER: NONE`** — no Electron process is
// loaded and no cell claims one. **RUN:** `node --test tests/e2e/receiver-detachment.test.mjs` from the
// repository root, or as part of `npm test`, whose glob `tests/**/*.test.mjs` owns this file. **It declares no
// module-scope exit arm** — `node:test` owns its exit code, and a cell that did not run is reported by the
// runner as not run (`strata/decisions.md` `D-21`: *"A runner whose cells are red, or whose cells never ran,
// may not exit `0`."*).

import test from 'node:test';
import assert from 'node:assert/strict';

import { storeCreate } from '../../bindings/js/index.mjs';

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// THE FOURTEEN MEMBERS, THE ONE RECEIVER ARM, AND THE FOURTEEN DETACHED CALLS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THE MEMBER SET IS THE PRODUCT'S DECLARED FOURTEEN** (`docs/specs/storeroom-js/surface.md §2.4` item 9
// (f); `bindings/js/index.d.ts`'s `StoreInstance`): the seven store-reaching verbs, the four constraint
// members, `constraints`, `register` and `removeListener`. **A SYMBOL-KEYED channel is not a member and is
// not driven here** — it is invisible to `Object.keys` and to `Object.getOwnPropertyNames` both
// (`§2.11` clause 9; `A117` (D6)).
const MEMBERS = [
  'read', 'readLiteral', 'write', 'delete', 'rollback', 'listen', 'unlisten',
  'addConstraint', 'constraintOn', 'constraintOff', 'removeConstraint',
  'constraints', 'register', 'removeListener',
];

/** **THE ONE MESSAGE THE RECEIVER ARM CARRIES, SPELLED ONCE** — the addon's `not_a_receiver`, whose bytes
 *  the seven verbs answer with (`bindings/js/src/facade.rs`; `docs/specs/storeroom-js/surface.md §2.5`'s one
 *  form, crossed by
 *  `carryRefusal` and `fail`, which is what attaches `log: []`). **THE FOUR CONSTRAINT MEMBERS TAKE IT
 *  BYTE-COMPATIBLY, AND NO CONSTRAINT CLAUSE NAMES A DIFFERENT ONE** (the header's third bullet prints the
 *  search). */
const THE_RECEIVER_ARM = "the receiver position is not the store object this addon's storeCreate returned";

/// The status the receiver arm carries — a member of the store's own closed set, carried and never minted
/// (`§2.5` item 1; `DD-40`).
const THE_RECEIVER_STATUS = 'AddressMalformed';

/// **THE DETACHED SWEEP'S OWN PAIR AND ITS OWN BODY** — one address the drive seeds nothing at, and a body
/// whose every invocation is COUNTED, because a count of zero after a bound write at that address is what
/// proves no pair (and no store-side home entry) was left standing by the detached calls.
const SWEEP_ADDRESS = ['detached-sweep'];
const SWEEP_ID = 'detached-sweep-id';
const STANDING_ADDRESS = ['detached-standing'];
const STANDING_ID = 'detached-standing-id';
const PROBE_ADDRESS = ['detached-probe'];
const PROBE_HANDLE = 'detached-probe-handle';

/// **A FRESH, MEM-TIER INSTANCE** — the same four declared keys every consumer uses, with no `filePath`, so
/// no cell here is a filesystem test and no temp path enters the drive.
function mem() {
  return storeCreate({ journalLength: 16, listeners: [] });
}

/// **A CALL, CLASSIFIED — THE CALLER'S ONE VIEW OF A THROW** (`§2.5`: the failure is THROWN and never
/// returned). `answered` is `true` where the call RETURNED, which is the failure `P-SAS-4`'s third term
/// names (*"a success"*) and the arm this whole file exists to catch.
function classify(call) {
  try {
    return { answered: true, answer: call() };
  } catch (thrown) {
    return { answered: false, thrown };
  }
}

/// **THE ONE PLAIN FORM'S OWN READ** — the three members `§2.5` items 1–4 declare, the `Error` class it
/// forbids (item 3), and the `log` VALUE item 4 fixes (`[]`, *"never an absent member, never `null`, and never
/// a placeholder entry"*). **NOTHING HERE MINTED A MEMBER**: the read is `Object.keys` and two member reads.
function assertTheOnePlainForm(thrown, where) {
  assert.notEqual(thrown, null, `${where} — the call THREW a value, and an absent value is no refusal`);
  assert.equal(typeof thrown, 'object',
    `${where} — \`§2.5\` item 3: the thrown value is a PLAIN OBJECT. It is \`${typeof thrown}\``);
  assert.equal(thrown instanceof Error, false,
    `${where} — \`§2.5\` item 3: "no \`Error\` subclass". It is `
    + `${Object.prototype.toString.call(thrown)} and the ruling's defect is exactly this class error`);
  assert.deepEqual(Object.keys(thrown).sort(), ['address', 'log', 'message', 'status'],
    `${where} — \`§2.5\` items 1–4: EXACTLY three members, \`{status, message, log}\` and no fourth. `
    + `It carries ${JSON.stringify(Object.keys(thrown))}`);
  assert.deepEqual(thrown.log, [],
    `${where} — \`§2.5\` item 4: \`log\` is the EMPTY ARRAY where the failure's cause has no attempt at all `
    + `("never an absent member, never \`null\`, and never a placeholder entry"). It is `
    + `${JSON.stringify(thrown.log)}`);
}

/** **THE RECEIVER ARM, ASSERTED WHOLE** — the form, the status and the message, all three of them, because
 *  the ruling is that every member must answer a detached call THE SAME WAY and *"the same way"* is only
 *  checkable if the bytes are. */
function assertTheReceiverArm(thrown, member) {
  assertTheOnePlainForm(thrown, `detached \`${member}\``);
  assert.equal(thrown.status, THE_RECEIVER_STATUS,
    `detached \`${member}\` — the receiver arm's \`status\` is the store's \`AddressMalformed\`, the member the `
    + 'seven store-reaching verbs carry. Got ' + JSON.stringify(thrown.status));
  assert.equal(thrown.message, THE_RECEIVER_ARM,
    `detached \`${member}\` — and its \`message\` is the one sentence the receiver arm carries, BYTE FOR BYTE: `
    + 'no constraint clause names a different arm, so the seven\'s governs unaltered. Got '
    + JSON.stringify(thrown.message));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// THE DETACHED SWEEP — ONE CALL PER MEMBER, DESTRUCTURED OFF THE RECEIVER
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **EACH ARM IS THE PATTERN `§12.2` NAMES: `const { read } = store; read(…)`.** **EVERY ARGUMENT IS
// IN DOMAIN**, so the arm that answers is the RECEIVER's and never a carrier's: an admitted address, an
// admitted tier, a well-formed pair, a function at the constraint position, a held handle. **A cell that
// passed an outside value would be answered by that position's own class test and would say nothing about
// the receiver** — which is the trap this sweep avoids arm by arm.
//
// **THE ORDER IS LOAD-BEARING IN THE STATE CELL, AND IT IS STATED RATHER THAN LEFT TO THE READER:** the
// detached `addConstraint` is driven BEFORE the detached `removeConstraint` and the two toggles, so a build
// in which those three still answer cannot have the ADD's residue undone by the REMOVE's before the
// measurement is taken. **THE TARGETS ARE CHOSEN FOR THE SAME REASON**: `addConstraint` names an address
// with no pair at it (so an answered add LEAVES a row), `removeConstraint`/`constraintOn`/`constraintOff`
// name the STANDING pair the store carries (so an answered remove DELETES a row and an answered toggle
// changes the pair's polarity), and every other arm names a value that exists.
function detachedSweep(store, counted) {
  const calls = [];
  for (const member of MEMBERS) calls.push([member, () => {
    // ── THE SEVEN STORE-REACHING VERBS ───────────────────────────────────────────────────────────────
    if (member === 'read') { const { read } = store; return read(['detached-seed'], 'mem'); }
    if (member === 'readLiteral') { const { readLiteral } = store; return readLiteral(['detached-seed'], 'mem'); }
    if (member === 'write') { const { write } = store; return write(['detached-seed'], 'mem', 3); }
    // `delete` is a reserved word; the member is destructured under a lawful binding and called detached.
    if (member === 'delete') { const { delete: remove } = store; return remove(['detached-seed'], 'mem'); }
    if (member === 'rollback') { const { rollback } = store; return rollback('detached-op'); }
    if (member === 'listen') { const { listen } = store; return listen(PROBE_HANDLE, [PROBE_ADDRESS]); }
    if (member === 'unlisten') { const { unlisten } = store; return unlisten(PROBE_HANDLE); }
    // ── THE FOUR CONSTRAINT MEMBERS ──────────────────────────────────────────────────────────────────
    if (member === 'addConstraint') {
      const { addConstraint } = store;
      return addConstraint({ address: [SWEEP_ADDRESS], id: SWEEP_ID }, counted.sweepBody);
    }
    if (member === 'removeConstraint') {
      const { removeConstraint } = store;
      return removeConstraint({ address: [STANDING_ADDRESS], id: STANDING_ID });
    }
    if (member === 'constraintOn') {
      const { constraintOn } = store;
      return constraintOn({ address: [STANDING_ADDRESS], id: STANDING_ID }, counted.sweepBody);
    }
    if (member === 'constraintOff') {
      const { constraintOff } = store;
      return constraintOff({ address: [STANDING_ADDRESS], id: STANDING_ID }, counted.sweepBody);
    }
    // ── THE THREE THAT ARE NOT STORE-REACHING ─────────────────────────────────────────────────────────
    if (member === 'constraints') { const { constraints } = store; return constraints(); }
    // **A HANDLE THIS INSTANCE DOES NOT HOLD.** `register` is a NON-STORE-REACHING member whose arms are
    // its DOMAIN's (`docs/specs/storeroom-js/surface.md §2.1` item 5's `register` column; `R-B4`), and the
    // ruling KEEPS that arm: it *"already refuses in the form"*. An unheld handle is the value that reaches
    // it; a HELD one does not (see this file's closing note on the residue).
    if (member === 'register') { const { register } = store; return register('a-handle-this-instance-does-not-hold', () => true); }
    if (member === 'removeListener') { const { removeListener } = store; return removeListener(PROBE_HANDLE); }
    throw new Error(`the member \`${member}\` is declared to this file and no detached arm drives it`);
  }]);
  const outcomes = new Map();
  for (const [member, call] of calls) outcomes.set(member, classify(call));
  return outcomes;
}

/// **THE STORE THE SWEEP IS DRIVEN AGAINST, AND ITS THREE OBSERVABLES — each of them PUBLIC.** The store
/// carries a STANDING pair (a lawful `addConstraint`, so `constraints()` has a row and the store has a
/// home entry at `STANDING_ADDRESS`), a registered PROBE listener at its own address, and a seeded leaf.
/// **THE COUNTERS ARE THE DRIVE'S OWN AND NOTHING IN THE PACKAGE KNOWS THEM**:
///   * `standing` — the standing pair's body, which a bound write at its address must invoke;
///   * `sweep` — the body the detached calls SUPPLY, which nothing may ever invoke;
///   * `probe` — the registered listener's body, which a bound write at its address must invoke.
function seededStore() {
  const store = mem();
  const counted = {
    standing: 0,
    sweepCalls: 0,
    probe: 0,
    standingBody: () => { counted.standing += 1; return true; },
    sweepBody: () => { counted.sweepCalls += 1; return true; },
    probeBody: (address) => { counted.probe += 1; return address; },
  };
  store.write(['detached-seed'], 'mem', 0);
  store.addConstraint({ address: [STANDING_ADDRESS], id: STANDING_ID }, counted.standingBody);
  store.listen(PROBE_HANDLE, [PROBE_ADDRESS]);
  store.register(PROBE_HANDLE, counted.probeBody);
  return { store, counted };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 1 — THE REFUSAL HALF: ALL FOURTEEN MEMBERS, DETACHED, ONE ANSWER
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('receiver_detachment_every_member_refuses_a_detached_call_in_the_one_plain_form', () => {
  const { store, counted } = seededStore();
  const outcomes = detachedSweep(store, counted);
  assert.equal(outcomes.size, MEMBERS.length,
    `the sweep drove all fourteen declared members (${MEMBERS.length}) — a sweep that skipped one would `
    + 'report a refusal set it never took');

  // ── THE TWELVE THAT CARRY THE RECEIVER ARM ───────────────────────────────────────────────────────────
  // The seven store-reaching verbs, the four constraint members, and `removeListener` — whose own domain
  // tests pass for a HELD handle and which therefore reaches its own entry and takes the addon's arm.
  const carryTheReceiverArm = [
    'read', 'readLiteral', 'write', 'delete', 'rollback', 'listen', 'unlisten',
    'addConstraint', 'constraintOn', 'constraintOff', 'removeConstraint', 'removeListener',
  ];
  for (const member of carryTheReceiverArm) {
    const outcome = outcomes.get(member);
    assert.equal(outcome.answered, false,
      `detached \`${member}\` — the architect's ruling ("Run the fix by rejecting the detached `
      + 'functions.") and `§12.2`: a call whose receiver names no live store REFUSES. '
      + `It ANSWERED ${JSON.stringify(outcome.answer)} instead, which is \`P-SAS-4\`'s third failure term, `
      + '"a success"');
    assertTheReceiverArm(outcome.thrown, member);
  }

  // ── `register`: THE RULING KEEPS ITS OWN DOMAIN ARM, AND THIS CELL ASSERTS THAT ARM AND NOT ANOTHER ───
  const register = outcomes.get('register');
  assert.equal(register.answered, false,
    'detached `register` — with a handle this instance does not hold, its own domain arm answers '
    + '(`R-B4`: "`AddressMalformed` — the instance\'s domain is the domain"). A success here would be the '
    + 'same defect class at a member the ruling explicitly keeps unmoved');
  assertTheOnePlainForm(register.thrown, 'detached `register`');
  assert.equal(register.thrown.status, THE_RECEIVER_STATUS,
    'and that arm\'s status is the same `AddressMalformed` member the receiver arm carries');
  assert.notEqual(register.thrown.message, THE_RECEIVER_ARM,
    'and its MESSAGE is its own — the handle-domain arm names the argument\'s position and class, and the '
    + 'ruling keeps it: "`register`/`removeListener` keep their own domain refusals — do not change them"');
  assert.ok(register.thrown.message.includes("register's first argument"),
    'the kept arm names the position it refuses, which is what `§2.5` item 5 (b) asks of a package-side '
    + 'reason: ' + JSON.stringify(register.thrown.message));

  // ── `constraints()`: THE ONE MEMBER WITH NO RECEIVER ARM TO TAKE ──────────────────────────────────────
  // **ITS CLAUSE DECLARES IT THROWS NOTHING, AND THIS CELL ASSERTS THE DECLARED ANSWER RATHER THAN A REFUSAL
  // NO CLAUSE OF THIS SURFACE DECLARES** (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s
  // `constraints` clause: *"IT THROWS NOTHING: arity `0` means there is no outside argument for the
  // package's class test to refuse, and the call performs NO STORE CALL, MINTS NO CODE, APPENDS NO JOURNAL
  // ENTRY AND CHANGES NO NODE"*). **THE STATE HALF IS STILL THIS CELL'S AND IS ASSERTED IN CELL 2**: an
  // answering read is lawful only while it moves nothing.
  const constraints = outcomes.get('constraints');
  assert.equal(constraints.answered, true,
    'detached `constraints()` — the declared answer of a member whose arity is `0` and whose clause '
    + 'declares it throws nothing (`§2.4` item 9 (f)). **This is the ONE member that does not refuse for the '
    + 'detachment, and it is recorded here rather than refused by assertion**: a cell demanding a refusal '
    + 'would pin a behaviour no clause of this surface declares');
  assert.ok(Array.isArray(constraints.answer),
    'and that answer is the declared `Array<{address, id}>` (`PAR-JS-27`): '
    + JSON.stringify(constraints.answer));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 2 — THE STATE HALF: THE WHOLE DETACHED SWEEP MOVES NOTHING
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THIS IS THE CELL THAT MAKES THE DEFECT A DEFECT.** A detached call that answers is a style question; a
// detached call that EDITS THE REAL STORE is the state move the ruling's second sentence forbids: *"a
// detached call is REFUSED, it moves NO STATE"*. **AND IT IS PROVED AND NOT ASSERTED** — through three
// public observables, each read before the sweep and after it:
//
//   1. `constraints()` — the pair registry, read as bytes (`JSON.stringify` of the whole answer);
//   2. the STORE'S OWN HOME ENTRY at the standing pair's address, read through a bound write's `triggered`
//      list and its body's invocation count (`§2.7` item 1: `triggered` is the store's own answer);
//   3. the STORE'S OWN HOME ENTRY at the probe listener's address, read the same way and delivered to the
//      body `register` installed.
//
// **MEASURED RED BEFORE THE FIX, AND THE MEASUREMENT IS PRINTED AT THIS CELL'S FIRST ASSERTION**: after the
// sweep the registry read `[{"address":[["detached-sweep"]],"id":"detached-sweep-id"}]` where it had read
// `[{"address":[["detached-standing"]],"id":"detached-standing-id"}]` — the detached ADD had carried a pair
// and the detached REMOVE had deleted the standing one — the standing pair's address answered `triggered:
// []`, and a bound write at the sweep address answered `triggered: [{handle: "detached-sweep-id", …}]` with
// the sweep body invoked twice.

test('receiver_detachment_the_whole_detached_sweep_moves_no_state', () => {
  const { store, counted } = seededStore();

  // ── THE BASELINE, TAKEN BEFORE ANY DETACHED CALL ──────────────────────────────────────────────────────
  const registryBefore = JSON.stringify(store.constraints());
  const baseline = store.write(['detached-standing'], 'mem', 1);
  const standingBefore = counted.standing;
  const standingDelta = standingBefore - 1; // the registration site evaluated the body once already.
  assert.ok(standingDelta > 0,
    'the standing pair is ARMED and this drive has a live observable: the bound write evaluated its body '
    + `(${standingDelta} time(s) on this write). Baseline registry: ${registryBefore}`);
  assert.deepEqual(baseline.triggered.map((row) => row.handle), [STANDING_ID],
    'and the store\'s own home entry at that address is what the write\'s `triggered` list names '
    + `(\`§2.7\` item 1). Read: ${JSON.stringify(baseline.triggered)}`);
  const probeBefore = counted.probe;

  // ── THE SWEEP ─────────────────────────────────────────────────────────────────────────────────────────
  const outcomes = detachedSweep(store, counted);

  // ── 1. THE PAIR REGISTRY, BYTE-IDENTICAL ───────────────────────────────────────────────────────────────
  const registryAfter = JSON.stringify(store.constraints());
  assert.equal(registryAfter, registryBefore,
    'NO STATE MAY MOVE ON A REFUSED CALL: `constraints()` must read exactly what it read before the whole '
    + 'detached sweep, byte for byte. **THE MEASURED RED**: before this fix the detached `addConstraint` '
    + 'carried the sweep pair and the detached `removeConstraint` deleted the standing one, so this read '
    + `moved from ${registryBefore} to ${registryAfter}`);

  // ── 2. THE STORE'S HOME ENTRY AT THE STANDING PAIR'S ADDRESS, UNTOUCHED ─────────────────────────────────
  const after = store.write(['detached-standing'], 'mem', 2);
  const standingAfterSweep = counted.standing - standingBefore;
  assert.deepEqual(after.triggered.map((row) => row.handle), [STANDING_ID],
    'and the store\'s home entry the standing pair stands on is UNTOUCHED: the same bound write after the '
    + 'sweep still names the same handle. **THE MEASURED RED**: the detached `removeConstraint` deleted the '
    + `pair, and this list answered \`[]\`. Read: ${JSON.stringify(after.triggered)}`);
  assert.equal(standingAfterSweep, standingDelta,
    'and its body is evaluated exactly as many times as the baseline write evaluated it — no more (a toggle '
    + 'left in the other polarity would change the count) and no fewer (a purged registration would answer '
    + `zero). Baseline ${standingDelta}, after the sweep ${standingAfterSweep}`);

  // ── 3. NO STORE-SIDE ENTRY AND NO PAIR AT THE SWEEP ADDRESS ─────────────────────────────────────────────
  // **THE SWEEP'S OWN ADDRESS, WHICH THE DETACHED `addConstraint` NAMED.** If an answering add had carried
  // the pair, `K-1` would have called `store.listen(id, set)` and the store's home would hold an entry whose
  // handle the next write at that address would name (`§2.12` item 1's stage 2: the kernel's store leg).
  const atTheSweepAddress = store.write([...SWEEP_ADDRESS], 'mem', 4);
  assert.deepEqual(atTheSweepAddress.triggered, [],
    'and NOTHING stands at the address the detached `addConstraint` named: a bound write there triggers no '
    + 'handle. **THE MEASURED RED**: `triggered` answered '
    + `\`[{"handle":"${SWEEP_ID}","address":["detached-sweep"]}]\`. Read: `
    + JSON.stringify(atTheSweepAddress.triggered));
  assert.equal(counted.sweepCalls, 0,
    `and the body the detached calls SUPPLIED was never invoked, at registration or at a pass: ${counted.sweepCalls}`
    + ' invocation(s). **THE MEASURED RED: 2** — the answered add registered it and the answered pass evaluated it');

  // ── 4. THE PROBE LISTENER'S HOME ENTRY, UNTOUCHED ──────────────────────────────────────────────────────
  const probeWrite = store.write([...PROBE_ADDRESS], 'mem', 5);
  assert.deepEqual(probeWrite.triggered.map((row) => row.handle), [PROBE_HANDLE],
    'and the registered listener\'s entry is untouched by the detached `unlisten` and `removeListener` that '
    + 'named its handle: a bound write at its address still triggers it. **NO OTHER REGISTRATION IS '
    + `REMOVED** (\`§2.3\` item 4). Read: ${JSON.stringify(probeWrite.triggered)}`);
  assert.equal(counted.probe, probeBefore + 1,
    'and exactly one delivery reached the function `register` installed — the package still performs the '
    + 'invocation the store\'s `triggered` list names (`§2.7` item 2): one per trigger and no more');

  // AND NOTHING OF THE SWEEP ANSWERED (kept here so a refusal regression fails THIS cell too, where the state
  // it would move is what the assertions above measure).
  const answered = [...outcomes.entries()].filter(([, outcome]) => outcome.answered
    && outcome.answer !== undefined
    && !Array.isArray(outcome.answer));
  assert.deepEqual(answered.map(([member]) => member), [],
    'and no member of the sweep ANSWERED a value beyond `constraints()`\'s declared array — a member that '
    + 'answers is the arm `receiver-and-refusal.md §3` says does not exist. Answered: '
    + JSON.stringify(answered.map(([member, outcome]) => [member, outcome.answer])));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 3 — THE CONTROL: THE SAME CALLS ON A PROPERLY BOUND RECEIVER STILL BEHAVE AS DECLARED
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **A CELL THAT ASSERTED ONLY REFUSALS COULD GO GREEN BY REFUSING EVERYTHING**, including a build that
// threw the receiver arm from every member on every call. **THE CONTROL IS THE SAME FOUR MEMBERS, THE SAME
// ARGUMENTS, ON THE SAME OBJECT — AND THEY MUST ANSWER.** Its expectations are the declared ones and not
// this unit's: `addConstraint` answers the pair's own opaque identity (`§2.12` item 2 (a); `PAR-JS-25`),
// the two toggles answer `undefined` (`§2.12` item 3), `removeConstraint` answers `undefined`
// (`contract.md §2.7` item 3), and a bound `write`/`read` pair still moves and reads the store.

test('receiver_detachment_the_bound_control_the_same_members_still_answer_as_declared', () => {
  const store = mem();
  const pair = { address: [['detached-control']], id: 'detached-control-id' };
  const body = () => true;

  // ── THE ADD ROUTE: AN IDENTITY, AND A ROW THE READ REPORTS ─────────────────────────────────────────────
  const added = classify(() => store.addConstraint(pair, body));
  assert.equal(added.answered, true,
    'the CONTROL — bound, `addConstraint` ANSWERS: `§2.12` item 2 (a), the add route "carries the function" '
    + `and answers the pair's identity. It refused with ${JSON.stringify(added.thrown)}`);
  assert.equal(typeof added.answer, 'object',
    'and that answer is the pair\'s opaque identity, an object (`PAR-JS-25`)');
  assert.deepEqual(Object.keys(added.answer), [],
    'and it carries NO own enumerable member — `PAR-JS-25`\'s opacity read at its own observable: '
    + JSON.stringify(Object.keys(added.answer)));
  assert.deepEqual(store.constraints(), [{ address: [['detached-control']], id: 'detached-control-id' }],
    'and the pair is CARRIED and ENUMERATED (`§2.12` item 3 clause 5): `constraints()` answers its one row');

  // ── THE TOGGLES: `undefined`, AND THE PAIR STILL CARRIED ────────────────────────────────────────────────
  const off = classify(() => store.constraintOff(pair, body));
  assert.equal(off.answered, true,
    'bound `constraintOff` ANSWERS `undefined` (`§2.12` item 3): ' + JSON.stringify(off.thrown));
  assert.equal(off.answer, undefined, 'and the answer is `undefined`, the toggles\' declared value');
  assert.equal(store.constraints().length, 1,
    'and a DISABLED pair is STILL CARRIED and STILL ENUMERATED — the toggle is not a removal');
  const on = classify(() => store.constraintOn(pair, body));
  assert.equal(on.answered, true,
    'bound `constraintOn` ANSWERS `undefined` at a pair the entry carries: ' + JSON.stringify(on.thrown));
  assert.equal(on.answer, undefined, 'and its answer is `undefined`');

  // ── THE REMOVAL: `undefined`, AND THE ROW GONE ──────────────────────────────────────────────────────────
  const removed = classify(() => store.removeConstraint(pair));
  assert.equal(removed.answered, true,
    'bound `removeConstraint` ANSWERS `undefined` (`contract.md §2.7` item 3): ' + JSON.stringify(removed.thrown));
  assert.equal(removed.answer, undefined, 'and the answer is `undefined`');
  assert.deepEqual(store.constraints(), [],
    'and the one act that DELETES an identity did delete it: `constraints()` is empty again');

  // ── AND THE STORE ITSELF IS LIVE THROUGH THE SAME OBJECT ───────────────────────────────────────────────
  // **THE LAST CONTROL, AND THE ONE THAT MAKES THE OTHER THREE WORTH SOMETHING**: the same `store` answers a
  // bound write and a bound read, so nothing above went green by the store being unreachable.
  const written = classify(() => store.write(['detached-control'], 'mem', 41));
  assert.equal(written.answered, true,
    'the store the control was driven on is LIVE — a bound `write` answers a record: '
    + JSON.stringify(written.thrown));
  assert.equal(store.read(['detached-control'], 'mem'), 41,
    'and a bound `read` answers the value that write landed');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RESIDUE THIS FILE DOES NOT CLOSE, PRINTED SO IT IS NOT READ AS A SKIP (`D-21`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **TWO OF THE FOURTEEN ARE NOT ANSWERED WITH THE RECEIVER ARM BY THIS PASS, AND NEITHER IS A CELL THIS FILE
// MAY WEAKEN:**
//
//   * **`constraints()`** — arity `0`, and its own clause declares that it THROWS NOTHING (`§2.4` item 9
//     (f)). Cell 1 asserts the declared answer and cell 2 asserts it moved nothing; a refusal is what no
//     clause of this surface declares at that member.
//   * **`register`** — the ruling keeps its DOMAIN arm, and cell 1 asserts that arm at an unheld handle. **A
//     HELD handle is the residue**: `registerOn` reaches its re-install `listen` through `state.receiver` —
//     *"THIS SITE HAS NO CALLER'S `this` AND MUST NOT INVENT ONE"* (`bindings/js/src/entry/delivery.mjs`) —
//     so a detached `register(heldHandle, fn)` answers and moves that entry. **THAT MEMBER IS OUTSIDE THIS
//     PASS'S WRITE SCOPE** (the ruling names the four constraint members; `register`'s internal re-install
//     route is its own member's), and this note is its record rather than its silence.
