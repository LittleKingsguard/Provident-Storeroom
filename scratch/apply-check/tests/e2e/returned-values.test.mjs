// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// U-STOREROOM-08 RETURN-VALUES — SEVEN CELLS, ONE test() EACH, IN THE ORDER RV-1 ... RV-7.
//
// **THE UNIT, IN ONE SENTENCE** (D-149 item 2, D-150 items 1-3): the act's receipt carries the delivered set's
// SETTLED RETURN VALUES as a NON-ENUMERABLE, configurable own ACCESSOR named returnedValues, ONE ENTRY PER
// HANDLE WHOSE BODY RETURNED A VALUE, the shared frozen empty object where none did, PRESENT ON EVERY ARM.
//
// **THE RULINGS THE CELLS DISCHARGE, NAMED IN PLAIN PROSE:**
//   * D-149 item 2 — a write's answer (and, on the same reasoning, a delete's) gains a datum keyed by handle,
//     one entry per listener that RETURNED A VALUE; its seat is the bodyFailures device: a non-enumerable,
//     configurable own accessor, so Object.keys stays the three typed members.
//   * D-149 item 3 — the SETTLE is what makes the datum possible, so the map is COMPLETE when the caller reads
//     it and a promise a body returned is already a value (RV-1, RV-6).
//   * D-149 item 4 — the receipt is the answer on every arm; nothing is handed to a channel (no cell here
//     names a channel, because no cfg key of that name exists).
//   * D-150 item 1 — the name is returnedValues, and Object.getOwnPropertyNames reads SEVEN on a write's
//     receipt and NINE on a delete's (RV-5, RV-7).
//   * D-150 item 2 — its empty value is the SHARED FROZEN EMPTY OBJECT, present always, never absent and never
//     undefined, on every arm including the all-synchronous one (RV-4).
//   * D-150 item 3 — StoreInstance is unmoved at FIFTEEN own members (RV-5).
//   * D-148 item 1(c) — a body that returns undefined contributes NO ENTRY, and the silence is the client's:
//     ABSENCE, not present-and-undefined (RV-2); the same absence holds for a body that REJECTED (RV-3).
//
// **THE THREE RULES THAT BIND EVERY CELL BELOW, STATED ONCE.**
//
//   1. NO ORDER IS ASSERTED. Every collection is read through asSet (a de-duplicating SORT) or as a count, and
//      never as a sequence (surface.md section 2.7 item 3; DD-22, "a drive compares sets, never sequences").
//      Where an insertion order IS legible at all — a JS object's own string keys are read in insertion order,
//      which is the ARRIVAL order and is promised by no clause (delivery.mjs's own note on the failure map) —
//      the cell PRINTS that order through t.diagnostic and refuses to assert it as a sequence. The one
//      exception is RV-5's exact Object.keys list, which is the census the ruling names verbatim, and it is
//      asserted both as that literal list and as its sorted set.
//
//   2. D-17 — the expectation is a literal in this file and the citation is prose: no docs path is opened at
//      runtime and no clause is parsed. D-21 — a cell that cannot reach its arm asserts the drive's own
//      coherence first and says so, rather than reporting a verdict about an arm it never stood in.
//
//   3. NO CELL PASSES VACUOUSLY. Wherever a premise is "a body that suspended", the cell proves the body
//      suspended: a marks array the body appends to AFTER its own await, a thenable the settle must be riding
//      on, an unsettled flag read AT THE CALL, or a gate this drive opens itself. A body that happened to stay
//      synchronous cannot make a cell green.
//
// **THE INSTRUMENTS.** The entry is imported EXACTLY AS A CONSUMER DOES — ../../bindings/js/index.mjs — and
// storeCreate is the only product constructor used. Nothing internal is imported from the package: no module
// under bindings/js/src, no state slot, no kernel helper. The tier is mem on every cell and no filePath is ever
// passed, so no cell performs file I/O, and NO TIMER IS ARMED ANYWHERE: the one loop turn any cell may need is
// setImmediate, which is a loop turn and not a scheduler (a timer is a scheduler, and the contract forbids it).
//
// **THE HELPERS ARE THIS FILE'S OWN.** None is imported from a sibling test and none lives outside this file.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';

// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE FILE-LOCAL HELPERS.
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

/** One store per cell, constructed by the package's own call and by nothing else. mem tier throughout: no
 *  filePath is passed, so no arm touches the filesystem. */
const make = () => storeCreate({ journalLength: 64, listeners: [] });

/** Run fn; answer the thrown value as a value, so a throw is a reading and never a crash of the cell. Total. */
function captured(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** IS THE VALUE A THENABLE — read as a typeof on the language's own assimilation slot, never as a guess. Read
 *  on an object and on a function, because a function may carry a then too. */
const isThenable = (value) => (
  value !== null
  && (typeof value === 'object' || typeof value === 'function')
  && typeof value.then === 'function'
);

/** A SET READING AND NEVER A SEQUENCE: de-duplicate, then sort. Two collections are the same set iff these
 *  answers are equal, and no index of one is ever compared to an index of the other. */
const asSet = (list) => [...new Set(list)].sort();

/** A record's own enumerable string keys, as a SET. Used wherever the cell's question is "which members of the
 *  map exist" rather than "in what order did they arrive". */
const sortedKeys = (record) => Object.keys(record).sort();

/** **THE ACCESSOR READ OFF THE RECORD WITHOUT READING IT AS A PLAIN MEMBER.** returnedValues is declared a
 *  non-enumerable, configurable own GETTER, so a cell reads its DESCRIPTOR first and its VALUE second, and an
 *  absent member is a reading (present: false) rather than a crash. A getter is INVOKED by the value read, so
 *  the value here is what a consumer reading record.returnedValues receives. */
function memberOf(record, name) {
  if (record === null || typeof record !== 'object') {
    return { present: false, descriptor: undefined, value: undefined };
  }
  const descriptor = Object.getOwnPropertyDescriptor(record, name);
  return {
    present: descriptor !== undefined,
    descriptor,
    value: descriptor === undefined ? undefined : record[name],
  };
}

/** **THE DESCRIPTOR'S SHAPE, AS THE SIX FACTS A CENSUS CAN READ** — two attributes and the typeof of each of
 *  the four slots. A data property answers typeof undefined for get and set; an accessor answers typeof
 *  undefined for value and writable. The frozen expectation is FAMILY_ACCESSOR below. */
function shapeOf(descriptor) {
  if (descriptor === undefined) return { absent: true };
  return {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    get: typeof descriptor.get,
    set: typeof descriptor.set,
    value: typeof descriptor.value,
    writable: typeof descriptor.writable,
  };
}

/** **THE FAMILY'S SHAPE** (D-150 item 1; the same device as discarded, log and bodyFailures): enumerable false,
 *  configurable true, a GETTER, and no data slot of any kind. */
const FAMILY_ACCESSOR = {
  enumerable: false,
  configurable: true,
  get: 'function',
  set: 'undefined',
  value: 'undefined',
  writable: 'undefined',
};

/** **A GATE** — one promise plus the one function that opens it. A gate this drive never opens is a declared
 *  state (the answer is withheld, and that means withheld), so holding one is asserting a law and not leaking
 *  a timer. NO timeout is armed beside it anywhere in this file. */
function gateOf() {
  const held = { open: null, promise: null };
  held.promise = new Promise((resolve) => { held.open = resolve; });
  return held;
}

/** One turn of the event loop, and one that is NOT a timer: setImmediate. */
const drain = () => new Promise((resolve) => { setImmediate(resolve); });

/** **THE UNHANDLED-REJECTION COUNTER** — installed, not avoided. A rejecting listener body is a datum on the
 *  receipt and never a rejection of the act, so the counter must read ZERO; without it a leaking rejection
 *  would take the test process down and make the reading illegible. Removed in a finally so no sibling cell
 *  inherits it. */
function countUnhandled() {
  const seen = [];
  const listener = (reason) => { seen.push(reason); };
  process.on('unhandledRejection', listener);
  return { seen, stop: () => { process.off('unhandledRejection', listener); } };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 1 OF 7 · RV-1 — THE MAP IS THE VALUES.
//
// THE RULINGS: D-149 item 2 (one entry per listener that RETURNED A VALUE, keyed by handle), D-150 item 1 (the
// name and the accessor's shape) and D-149 item 3 (the settle is what makes the map possible, so a body that
// returns a promise is read as its settled value). THE RULING D-148 item 1(c) holds the other half: a body that
// returns nothing contributes nothing, which is RV-2's whole subject.
//
// THE OBSERVABLE: two bodies stand at ONE address. One returns a SHARED OBJECT and one a STRING, and BOTH
// suspend one microtask hop (await null) before returning, so the act's answer is a thenable and the settle
// runs at all. The cell then asserts that the answer is a thenable, that returnedValues is PRESENT,
// NON-ENUMERABLE, CONFIGURABLE and a GETTER, that the map's entry set is exactly the two handles, and that each
// entry IS what the body returned — the same reference for the object, strict equality for the string.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RV-1 · THE MAP IS THE VALUES — one entry per handle that returned a value, keyed by handle (D-149 item 2, D-150 item 1)', async (t) => {
  const store = make();
  // THE PREMISE'S OWN RECORD: a mark a body appends to AFTER its await. A body that never suspended cannot
  // fill it, and the cell below asserts the set is complete.
  const marks = [];
  // THE OBJECT THE BODY RETURNS — held here so IDENTITY can be asserted and not merely deep equality.
  const shared = { data: 1 };

  store.listen('rv1-object', [['rv1-a']]);
  store.listen('rv1-string', [['rv1-a']]);
  store.register('rv1-object', async () => {
    await null;
    marks.push('rv1-object');
    return shared;
  });
  store.register('rv1-string', async () => {
    await null;
    marks.push('rv1-string');
    return 'two';
  });

  // ── THE CALL, AND ITS ANSWER'S CLASS, READ BEFORE ANYTHING IS AWAITED. ─────────────────────────────────
  const answer = captured(() => store.write(['rv1-a'], 'mem', 1));
  assert.equal(answer.ok, true,
    'THE WRITE MUST STAND: both bodies fulfill, so nothing refuses the act — the call threw '
      + String(answer.caught !== undefined && answer.caught !== null ? answer.caught.status : 'nothing'));
  const thenable = isThenable(answer.value);
  assert.equal(thenable, true,
    '**THE ANSWER MUST BE A THENABLE**, or the settle never ran and the map below was read about a delivery '
      + 'that had not started: thenable = ' + String(thenable));

  const record = await answer.value;
  assert.equal(record !== null && typeof record === 'object', true,
    'the settled answer must be the receipt itself (D-149 item 4), not a value of some other shape: '
      + 'read ' + String(record === null ? 'null' : typeof record));

  // ── THE ACCESSOR: PRESENT, NON-ENUMERABLE, CONFIGURABLE, A GETTER. ───────────────────────────────────────
  const member = memberOf(record, 'returnedValues');
  assert.equal(member.present, true,
    'returnedValues must be an OWN member of the receipt (D-150 item 1): own names read '
      + JSON.stringify(Object.getOwnPropertyNames(record)));
  assert.deepEqual(shapeOf(member.descriptor), FAMILY_ACCESSOR,
    'the descriptor must be the family device — enumerable false, configurable true, a getter, no data slot '
      + '(D-150 item 1; the same shape discarded, log and bodyFailures carry): read '
      + JSON.stringify(shapeOf(member.descriptor)));

  const map = member.value;
  assert.equal(map !== null && typeof map === 'object', true,
    'the accessor must answer the map itself: read ' + String(map === null ? 'null' : typeof map));

  // ── THE ENTRY SET, AND NEVER THE ORDER. ─────────────────────────────────────────────────────────────────
  t.diagnostic('RV-1 · Object.keys(map) in ARRIVAL order (printed, not asserted) = '
    + JSON.stringify(Object.keys(map)) + '; the same keys as a set = ' + JSON.stringify(sortedKeys(map)));
  assert.deepEqual(sortedKeys(map), ['rv1-object', 'rv1-string'],
    '**THE MAP IS KEYED BY HANDLE AND CARRIES BOTH HANDLES THAT RETURNED A VALUE** (D-149 item 2), read as a '
      + 'SET and never as a sequence: read ' + JSON.stringify(map));

  // ── THE VALUES ARE THE VALUES: IDENTITY FOR THE OBJECT, STRICT EQUALITY FOR THE STRING. ─────────────────
  assert.equal(map['rv1-object'], shared,
    '**THE OBJECT ENTRY MUST BE THE VERY REFERENCE THE BODY RETURNED** and not a copy, a wrapper or a '
      + 're-creation of it: identity = ' + String(map['rv1-object'] === shared));
  assert.equal(map['rv1-string'], 'two',
    '**THE STRING ENTRY MUST BE STRICTLY EQUAL TO WHAT THE BODY RETURNED** (a string is compared by value, '
      + 'and a wrapper would show here): read ' + JSON.stringify(map['rv1-string']));

  // ── THE PREMISE IS DISCHARGED: BOTH BODIES CROSSED THEIR OWN await. ─────────────────────────────────────
  assert.deepEqual(asSet(marks), ['rv1-object', 'rv1-string'],
    '**BOTH BODIES MUST HAVE SUSPENDED AND RESUMED** — otherwise the arm is the all-synchronous one and no '
      + 'settle ran: marks reached after the await, as a set = ' + JSON.stringify(asSet(marks)));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 2 OF 7 · RV-2 — AN undefined-RETURNER CONTRIBUTES NO ENTRY.
//
// THE RULING: D-148 item 1(c), kept whole by D-149 item 2 and by D-150 item 1 — a body that returns undefined
// does not pass back, its silence is the client's, and the map therefore carries ONE ENTRY PER HANDLE THAT
// RETURNED A VALUE and no row at all for the rest. THE OBSERVABLE IS ABSENCE AND NOT PRESENT-AND-undefined:
// Object.hasOwn must be FALSE, and the own descriptor must be undefined rather than a row whose value is
// undefined.
//
// THE OBSERVABLE: three bodies at one address — one returns a value, one returns undefined EXPLICITLY, one
// returns nothing — and all three suspend, so all three are in the started and settled set.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RV-2 · AN undefined-RETURNER CONTRIBUTES NO ENTRY — absence, not present-and-undefined (D-148 item 1(c), D-150 item 1)', async (t) => {
  const store = make();
  const marks = [];

  store.listen('rv2-value', [['rv2-a']]);
  store.listen('rv2-explicit', [['rv2-a']]);
  store.listen('rv2-nothing', [['rv2-a']]);
  store.register('rv2-value', async () => {
    await null;
    marks.push('rv2-value');
    return 'kept';
  });
  store.register('rv2-explicit', async () => {
    await null;
    marks.push('rv2-explicit');
    // THE EXPLICIT undefined: this body DOES return, and what it returns is undefined.
    return undefined;
  });
  store.register('rv2-nothing', async () => {
    await null;
    marks.push('rv2-nothing');
    // THE BODY THAT RETURNS NOTHING AT ALL — no return statement is reached.
  });

  const answer = captured(() => store.write(['rv2-a'], 'mem', 1));
  assert.equal(answer.ok, true, 'the write must stand: all three bodies fulfill');
  assert.equal(isThenable(answer.value), true,
    '**THE ANSWER MUST BE A THENABLE**, or the settle never ran: thenable = ' + String(isThenable(answer.value)));

  const record = await answer.value;
  const member = memberOf(record, 'returnedValues');
  assert.equal(member.present, true,
    'returnedValues must be present on the receipt (D-150 item 2): own names read '
      + JSON.stringify(Object.getOwnPropertyNames(record)));
  const map = member.value;

  t.diagnostic('RV-2 · the map in ARRIVAL order (printed, not asserted) = ' + JSON.stringify(map)
    + '; its keys as a set = ' + JSON.stringify(sortedKeys(map))
    + '; hasOwn(rv2-explicit) = ' + String(Object.hasOwn(map, 'rv2-explicit'))
    + '; hasOwn(rv2-nothing) = ' + String(Object.hasOwn(map, 'rv2-nothing')));

  // ── ONE ENTRY, AT THE RETURNING HANDLE. ─────────────────────────────────────────────────────────────────
  assert.deepEqual(sortedKeys(map), ['rv2-value'],
    '**THE MAP MUST CARRY THE RETURNING HANDLE AND NO OTHER** (D-148 item 1(c)): read ' + JSON.stringify(map));
  assert.equal(map['rv2-value'], 'kept',
    'the returning body\'s value must cross as itself: read ' + JSON.stringify(map['rv2-value']));

  // ── ABSENCE, AND NOT PRESENT-AND-undefined. ─────────────────────────────────────────────────────────────
  assert.equal(Object.hasOwn(map, 'rv2-explicit'), false,
    '**AN undefined-RETURNER MUST CONTRIBUTE NO ROW AT ALL**: Object.hasOwn(rv2-explicit) = '
      + String(Object.hasOwn(map, 'rv2-explicit')));
  assert.equal(Object.hasOwn(map, 'rv2-nothing'), false,
    '**A BODY WITH NO RETURN STATEMENT MUST CONTRIBUTE NO ROW EITHER**: Object.hasOwn(rv2-nothing) = '
      + String(Object.hasOwn(map, 'rv2-nothing')));
  assert.equal(Object.getOwnPropertyDescriptor(map, 'rv2-explicit'), undefined,
    '**THE ABSENCE MUST BE ABSENCE AND NOT A ROW WHOSE VALUE IS undefined** (D-148 item 1(c); this is the one '
      + 'reading that separates the two, and a define with value undefined would answer a descriptor here)');
  assert.equal(Object.getOwnPropertyDescriptor(map, 'rv2-nothing'), undefined,
    'the silent body\'s row must be absent by the same reading');

  // ── THE PREMISE: ALL THREE BODIES SUSPENDED AND RESUMED, SO ALL THREE ARE IN THE STARTED SET. ───────────
  assert.deepEqual(asSet(marks), ['rv2-explicit', 'rv2-nothing', 'rv2-value'],
    '**ALL THREE BODIES MUST HAVE CROSSED THEIR OWN await** — the undefined-returners were STARTED, so their '
      + 'absence from the map is a reading about the datum and not about a delivery that never reached them: '
      + 'marks as a set = ' + JSON.stringify(asSet(marks)));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 3 OF 7 · RV-3 — A REJECTING BODY CONTRIBUTES NOTHING AND THE FAILURE STILL CROSSES.
//
// THE RULINGS: D-138 (a rejecting body is a DATUM on the receipt and the act RESOLVES), D-137 item 5 (the entry's
// status is rank 23 ListenerBodyRejected and the message is the generator's own sentence; the rejection's own
// reason is never read, stored or rendered) and D-149 item 2 (the value map reads the FULFILLED half only).
//
// THE OBSERVABLE: one body resolves and one rejects. The map carries the resolving handle ONLY; bodyFailures
// still carries the rejecting handle at status ListenerBodyRejected; and the rejection's own reason text
// appears in NEITHER datum. The unhandled-rejection counter reads ZERO, which is what makes the rejection a
// datum and not a leak, and it is removed in a finally so no sibling cell inherits it.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RV-3 · A REJECTING BODY CONTRIBUTES NOTHING AND THE FAILURE STILL CROSSES (D-138, D-137 item 5, D-149 item 2)', async (t) => {
  const store = make();
  const counter = countUnhandled();
  // THE REASON'S OWN TEXT, spelled once and searched for in both data. A marker rather than a sentence, so
  // the search cannot be satisfied by an accident of the generator's wording.
  const marker = 'rv3-rejection-reason-marker-4c71';
  let record = null;

  try {
    store.listen('rv3-resolving', [['rv3-a']]);
    store.listen('rv3-rejecting', [['rv3-a']]);
    store.register('rv3-resolving', async () => {
      await null;
      return 'crossed';
    });
    store.register('rv3-rejecting', async () => {
      await null;
      throw new Error(marker);
    });

    const answer = captured(() => store.write(['rv3-a'], 'mem', 1));
    assert.equal(answer.ok, true,
      '**THE WRITE MUST RESOLVE AND NOT REJECT**: a body\'s rejection is a datum and never a failure form of '
        + 'the act (D-138 items 2 and 4) — the call threw '
        + String(answer.caught !== undefined && answer.caught !== null ? answer.caught.status : 'nothing'));
    assert.equal(isThenable(answer.value), true,
      'the answer must be a thenable, or no settle ran: thenable = ' + String(isThenable(answer.value)));

    record = await answer.value;
    // ONE LOOP TURN, SO AN UNHANDLED-REJECTION NOTIFICATION WOULD HAVE FIRED BEFORE THE COUNT IS READ.
    await drain();

    // ── THE VALUE MAP: THE RESOLVING HANDLE ONLY. ─────────────────────────────────────────────────────────
    const values = memberOf(record, 'returnedValues');
    assert.equal(values.present, true,
      'returnedValues must be present even where a body rejected (D-150 item 2): own names read '
        + JSON.stringify(Object.getOwnPropertyNames(record)));
    assert.deepEqual(sortedKeys(values.value), ['rv3-resolving'],
      '**A REJECTED BODY CONTRIBUTES NO ENTRY TO THE VALUE MAP** (D-149 item 2 reads the fulfilled half only): '
        + 'read ' + JSON.stringify(values.value));
    assert.equal(Object.hasOwn(values.value, 'rv3-rejecting'), false,
      'the rejecting handle must be ABSENT from the value map, not present-and-undefined: hasOwn = '
        + String(Object.hasOwn(values.value, 'rv3-rejecting')));

    // ── THE FAILURE DATUM: THE REJECTING HANDLE, AT RANK 23. ───────────────────────────────────────────────
    const failures = memberOf(record, 'bodyFailures');
    assert.equal(failures.present, true,
      'bodyFailures must still be present beside the value map (D-136; D-149 keeps it): own names read '
        + JSON.stringify(Object.getOwnPropertyNames(record)));
    assert.deepEqual(sortedKeys(failures.value), ['rv3-rejecting'],
      '**THE FAILURE STILL CROSSES, AT THE REJECTING HANDLE** (D-138): read ' + JSON.stringify(failures.value));
    const failure = failures.value['rv3-rejecting'];
    assert.equal(failure !== null && typeof failure === 'object', true,
      'the failure row must be an object: read ' + JSON.stringify(failure));
    assert.equal(failure.status, 'ListenerBodyRejected',
      '**THE ROW\'S STATUS IS RANK 23\'S OWN NAME, USED AND NEVER WIDENED** (D-137 item 5): read '
        + JSON.stringify(failure.status));
    assert.equal(typeof failure.message, 'string',
      'the row must carry the generator\'s own sentence as a string: read ' + JSON.stringify(failure.message));

    // ── THE REASON IS IN NEITHER DATUM. ────────────────────────────────────────────────────────────────────
    t.diagnostic('RV-3 · the value map = ' + JSON.stringify(values.value)
      + '; the failure map = ' + JSON.stringify(failures.value)
      + '; unhandled rejections counted = ' + String(counter.seen.length));
    assert.equal(JSON.stringify(values.value).includes(marker), false,
      '**THE REJECTION\'S OWN REASON MUST NOT REACH THE VALUE MAP** (D-137 item 5; D-58\'s retained-data '
        + 'bound): the marker was found in ' + JSON.stringify(values.value));
    assert.equal(JSON.stringify(failures.value).includes(marker), false,
      '**THE REJECTION\'S OWN REASON MUST NOT REACH THE FAILURE DATUM EITHER** — the sentence declares what '
        + 'crossed and not what the body rejected with (D-137 item 5): the marker was found in '
        + JSON.stringify(failures.value));

    // ── THE PREMISE: THE REJECTION WAS A DATUM AND NOT A LEAK. ─────────────────────────────────────────────
    assert.equal(counter.seen.length, 0,
      '**NO UNHANDLED REJECTION MAY SURVIVE THE SETTLE** — an act that resolves while a rejection escapes '
        + 'into the process has failed the ruling (D-138): counted '
        + String(counter.seen.length) + ', first reason = '
        + JSON.stringify(counter.seen.length === 0 ? null : String(counter.seen[0])));
  } finally {
    counter.stop();
  }

  assert.equal(record !== null, true, 'the drive must have reached its arm and answered a receipt');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 4 OF 7 · RV-4 — PRESENT AND EMPTY IS THE SHARED FROZEN EMPTY OBJECT.
//
// THE RULING: D-150 item 2 — the empty value is the SHARED FROZEN EMPTY OBJECT, on the precedent D-142 set for
// the failure map and defineResolutionLog set for the shared empty list: PRESENT ALWAYS, NEVER ABSENT AND NEVER
// undefined, on every arm. The D-149 item 3 reading holds the other half of the cell: the arm with no settle at
// all must answer the same datum, because the ACCESSOR is installed at the build while only the DATUM is the
// settle's (that is why the member is a getter).
//
// THE TWO ARMS, because one arm could pass for the wrong reason:
//   (a) THE SETTLED ARM — bodies that ALL return undefined, one of them suspending, so the answer is a thenable
//       and a settle runs and still finds no value.
//   (b) THE PLAIN SYNCHRONOUS ARM — a body that returns nothing and does not suspend, so there is NO SETTLE AT
//       ALL and the answer is a RECORD. This cell asserts the answer is NOT a thenable, which is the premise.
// ON BOTH: the property exists with the family descriptor shape, has ZERO own keys, and two reads answer the
// SAME OBJECT. Whether the two arms answer the same object is the shared-constant reading; it is measured here,
// PRINTED, and asserted only after the reading is printed beside it.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RV-4 · PRESENT AND EMPTY IS THE SHARED FROZEN EMPTY OBJECT — on a settled arm and on a plain synchronous arm (D-150 item 2)', async (t) => {
  // ── ARM (a) · THE SETTLED ARM. ───────────────────────────────────────────────────────────────────────────
  const settledStore = make();
  const settledMarks = [];
  settledStore.listen('rv4a-undefined', [['rv4a-a']]);
  settledStore.listen('rv4a-nothing', [['rv4a-a']]);
  settledStore.register('rv4a-undefined', async () => {
    await null;
    settledMarks.push('rv4a-undefined');
    return undefined;
  });
  settledStore.register('rv4a-nothing', async () => {
    await null;
    settledMarks.push('rv4a-nothing');
  });

  const settledAnswer = settledStore.write(['rv4a-a'], 'mem', 1);
  assert.equal(isThenable(settledAnswer), true,
    '**ARM (a) MUST SETTLE**, or this arm is arm (b) wearing another name: thenable = '
      + String(isThenable(settledAnswer)));
  const settledRecord = await settledAnswer;
  assert.deepEqual(asSet(settledMarks), ['rv4a-nothing', 'rv4a-undefined'],
    'arm (a)\'s two bodies must both have crossed their own await, so the settle had a set to settle: marks as '
      + 'a set = ' + JSON.stringify(asSet(settledMarks)));

  const a1 = memberOf(settledRecord, 'returnedValues');
  assert.equal(a1.present, true,
    'arm (a): the member must be PRESENT even where the settle found no value (D-150 item 2): own names read '
      + JSON.stringify(Object.getOwnPropertyNames(settledRecord)));
  assert.deepEqual(shapeOf(a1.descriptor), FAMILY_ACCESSOR,
    'arm (a): the empty member keeps the family descriptor shape: read ' + JSON.stringify(shapeOf(a1.descriptor)));
  assert.equal(Object.keys(a1.value).length, 0,
    'arm (a): the empty map must have ZERO own keys, so a body\'s undefined is not carried as a row: read '
      + JSON.stringify(a1.value));
  const a2 = settledRecord.returnedValues;
  assert.equal(Object.is(a1.value, a2), true,
    '**arm (a): TWO READS OF THE MEMBER MUST ANSWER THE SAME OBJECT** (D-150 item 2, on the shared-constant '
      + 'device): Object.is(read1, read2) = ' + String(Object.is(a1.value, a2)));
  assert.equal(Object.isFrozen(a2), true,
    'arm (a): the empty map must be FROZEN (D-150 item 2): frozen = ' + String(Object.isFrozen(a2)));

  // ── ARM (b) · THE PLAIN SYNCHRONOUS ARM — NO SETTLE AT ALL. ──────────────────────────────────────────────
  const syncStore = make();
  let fired = 0;
  syncStore.listen('rv4b-sync', [['rv4b-a']]);
  syncStore.register('rv4b-sync', () => { fired += 1; });

  const syncAnswer = captured(() => syncStore.write(['rv4b-a'], 'mem', 1));
  assert.equal(syncAnswer.ok, true, 'arm (b): the write must stand — its only body is synchronous and returns nothing');
  assert.equal(fired, 1,
    '**arm (b) MUST REACH ITS ARM AT ALL** — the body fired, so this is a receipt about a delivery and not '
      + 'about an empty trigger set: fired = ' + String(fired));
  assert.equal(isThenable(syncAnswer.value), false,
    '**THE ALL-SYNCHRONOUS ARM ANSWERS A RECORD AND NOT A THENABLE** (no body returned a thenable, so no settle '
      + 'ran): thenable = ' + String(isThenable(syncAnswer.value)));
  assert.equal(syncAnswer.value !== null && typeof syncAnswer.value === 'object', true,
    'arm (b): the answer must be the receipt: read '
      + String(syncAnswer.value === null ? 'null' : typeof syncAnswer.value));

  const b1 = memberOf(syncAnswer.value, 'returnedValues');
  assert.equal(b1.present, true,
    'arm (b): the member must be PRESENT where no settle ran at all (D-150 item 2): own names read '
      + JSON.stringify(Object.getOwnPropertyNames(syncAnswer.value)));
  assert.deepEqual(shapeOf(b1.descriptor), FAMILY_ACCESSOR,
    'arm (b): the family descriptor shape again: read ' + JSON.stringify(shapeOf(b1.descriptor)));
  assert.equal(Object.keys(b1.value).length, 0,
    'arm (b): zero own keys: read ' + JSON.stringify(b1.value));
  const b2 = syncAnswer.value.returnedValues;
  assert.equal(Object.is(b1.value, b2), true,
    '**arm (b): two reads must answer the same object**: Object.is(read1, read2) = ' + String(Object.is(b1.value, b2)));
  assert.equal(Object.isFrozen(b2), true,
    'arm (b): the empty map must be frozen: frozen = ' + String(Object.isFrozen(b2)));

  // ── ACROSS THE TWO ARMS: THE SHARED-CONSTANT READING, PRINTED AND THEN ASSERTED. ─────────────────────────
  const across = Object.is(a1.value, b1.value);
  t.diagnostic('RV-4 · arm (a) settled, arm (b) plain; empty map own keys = '
    + String(Object.keys(a1.value).length) + ' and ' + String(Object.keys(b1.value).length)
    + '; frozen = ' + String(Object.isFrozen(b1.value))
    + '; **the two arms answer the SAME OBJECT = ' + String(across) + '** (the shared frozen constant)');
  assert.equal(across, true,
    '**THE EMPTY VALUE IS ONE SHARED CONSTANT AND NOT A FRESH OBJECT PER CALL** (D-150 item 2; D-142\'s '
      + 'precedent): the arm that settled and the arm that never settled answered the same object = '
      + String(across));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 5 OF 7 · RV-5 — THE CENSUS.
//
// THE RULINGS: D-150 item 1 (Object.keys STAYS ["op","watched","triggered"]; Object.getOwnPropertyNames reads
// SEVEN — the three typed plus discarded, log, bodyFailures and returnedValues) and D-150 item 3
// (StoreInstance is unmoved at FIFTEEN own members). This cell turns no behaviour; it is the census the
// rulings name verbatim, and it is the cell that fails first if the datum is ever made enumerable.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RV-5 · THE CENSUS — Object.keys is the three, own names number seven, the instance fifteen (D-150 items 1 and 3)', async (t) => {
  const store = make();
  store.listen('rv5-h', [['rv5-a']]);
  store.register('rv5-h', async () => {
    await null;
    return 'census';
  });

  const record = await store.write(['rv5-a'], 'mem', 1);
  assert.equal(record !== null && typeof record === 'object',
    true, 'the census is read on the receipt: read ' + String(record === null ? 'null' : typeof record));

  const keys = Object.keys(record);
  const ownNames = Object.getOwnPropertyNames(record);
  const instanceNames = Object.getOwnPropertyNames(store);

  t.diagnostic('RV-5 · Object.keys in insertion order = ' + JSON.stringify(keys)
    + '; Object.getOwnPropertyNames in insertion order = ' + JSON.stringify(ownNames)
    + ' (' + String(ownNames.length) + ' names)'
    + '; the instance\'s own names = ' + JSON.stringify(instanceNames)
    + ' (' + String(instanceNames.length) + ')');

  // ── THE ENUMERABLE THREE, UNMOVED. ───────────────────────────────────────────────────────────────────────
  assert.deepEqual(keys, ['op', 'watched', 'triggered'],
    '**Object.keys MUST STAY EXACTLY THE THREE TYPED MEMBERS** (D-150 item 1): read ' + JSON.stringify(keys));
  assert.deepEqual(asSet(keys), ['op', 'triggered', 'watched'],
    'the same three read as a SET, which is the form no order can fail: read ' + JSON.stringify(asSet(keys)));

  // ── THE SEVEN OWN NAMES. ─────────────────────────────────────────────────────────────────────────────────
  assert.equal(ownNames.includes('returnedValues'), true,
    '**Object.getOwnPropertyNames MUST CARRY returnedValues** (D-150 item 1): read ' + JSON.stringify(ownNames));
  assert.equal(ownNames.length, 7,
    '**A WRITE\'S RECEIPT MUST READ SEVEN OWN NAMES** — the three typed plus discarded, log, bodyFailures and '
      + 'returnedValues (D-150 item 1, moving six to seven): read ' + JSON.stringify(ownNames));
  assert.deepEqual(asSet(ownNames), ['bodyFailures', 'discarded', 'log', 'op', 'returnedValues', 'triggered', 'watched'],
    'the seven, as a SET and never as a sequence: read ' + JSON.stringify(asSet(ownNames)));

  // ── THE INSTANCE, UNMOVED AT FIFTEEN. ────────────────────────────────────────────────────────────────────
  assert.equal(instanceNames.length, 15,
    '**StoreInstance MUST BE UNMOVED AT FIFTEEN OWN MEMBERS** (D-150 item 3): read '
      + String(instanceNames.length) + ' — ' + JSON.stringify(instanceNames));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 6 OF 7 · RV-6 — THE VALUE IS THE SETTLED ONE, NOT THE PROMISE.
//
// THE RULINGS: D-149 item 3 (the answer is withheld until the delivered set settles, SO THE MAP IS COMPLETE WHEN
// THE CALLER READS IT and a promise a body returned is already settled into a value) and D-149 item 2 (the entry
// is the VALUE, one per handle that returned one).
//
// THE OBSERVABLE, AND ITS PREMISE PROVEN AT THE CALL: a body returns a promise that resolves the string 'late'
// on a setImmediate. Read immediately after the call — before any loop turn — the promise has NOT settled (a
// flag the setImmediate callback sets still reads FALSE) and the answer IS a thenable. After the answer
// resolves, the flag reads TRUE and the entry IS the string 'late' and is not a thenable. Without the flag the
// cell could be green about a body that resolved synchronously.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RV-6 · THE VALUE IS THE SETTLED ONE, NOT THE PROMISE (D-149 item 3)', async (t) => {
  const store = make();
  // THE PREMISE'S FLAG: set by the setImmediate callback and by nothing else, so it answers "has the promise
  // the body returned settled" and not "was the body invoked".
  let settledFlag = false;
  let returnedPromise = null;

  store.listen('rv6-h', [['rv6-a']]);
  store.register('rv6-h', () => {
    const body = new Promise((resolve) => {
      setImmediate(() => {
        settledFlag = true;
        resolve('late');
      });
    });
    returnedPromise = body;
    return body;
  });

  const answer = captured(() => store.write(['rv6-a'], 'mem', 1));
  assert.equal(answer.ok, true, 'the write must stand: the body returns a promise and never rejects');

  // ── THE PREMISE, READ AT THE CALL AND BEFORE ANY LOOP TURN. ──────────────────────────────────────────────
  assert.equal(isThenable(returnedPromise), true,
    '**THE BODY MUST ACTUALLY HAVE RETURNED A THENABLE**, or the entry below is not a settled value: the body '
      + 'returned ' + String(returnedPromise === null ? 'null' : typeof returnedPromise));
  assert.equal(settledFlag, false,
    '**THE PROMISE THE BODY RETURNED MUST NOT HAVE SETTLED AT THE CALL** (the setImmediate has not run): flag = '
      + String(settledFlag));
  assert.equal(isThenable(answer.value), true,
    '**THE ANSWER MUST BE A THENABLE** — the settle is what the entry is read off (D-149 item 3): thenable = '
      + String(isThenable(answer.value)));

  const record = await answer.value;
  const map = memberOf(record, 'returnedValues').value;

  // ── AFTER THE ANSWER: THE FLAG HAS FLIPPED AND THE ENTRY IS THE VALUE. ──────────────────────────────────
  assert.equal(settledFlag, true,
    '**THE BODY\'S PROMISE MUST HAVE SETTLED BEFORE THE ANSWER CROSSED** (D-149 item 3): flag = '
      + String(settledFlag));
  t.diagnostic('RV-6 · at the call: thenable = ' + String(isThenable(answer.value))
    + ', body promise settled = false; after the answer: settled = ' + String(settledFlag)
    + ', map = ' + JSON.stringify(map));
  assert.deepEqual(sortedKeys(map), ['rv6-h'],
    'the map must carry the one handle whose body returned a value: read ' + JSON.stringify(map));
  assert.equal(map['rv6-h'], 'late',
    '**THE ENTRY MUST BE THE PROMISE\'S RESOLVED VALUE AND NOT THE PROMISE** (D-149 item 3): read '
      + JSON.stringify(map['rv6-h']));
  assert.equal(isThenable(map['rv6-h']), false,
    '**THE ENTRY MUST NOT BE A THENABLE** — a promise carried through would be a wait the caller did not ask '
      + 'for: thenable = ' + String(isThenable(map['rv6-h'])));
  assert.equal(map['rv6-h'] === returnedPromise, false,
    'the entry must not be the very promise object either: identity = '
      + String(map['rv6-h'] === returnedPromise));
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 7 OF 7 · RV-7 — THE DELETE'S RECEIPT CARRIES IT TOO.
//
// THE RULING: D-149 item 2 in the architect's own words — a write's answer AND, ON THE SAME REASONING, A
// DELETE'S answer gains the datum — read with D-150 item 1 for the accessor's name and shape. D-149 item 2's
// device is installed at the delete's receipt build and its datum by the same settle, so the delete's own names
// move EIGHT TO NINE while its enumerable four are unmoved.
//
// THE OBSERVABLE, AND THE GATE THAT MAKES IT A CELL: a value is seeded first, then a listener is registered,
// then the address is deleted by a body that suspends on a gate THIS DRIVE opens only after it has read the
// answer as a thenable. So the arm proves, in order: the delete's answer is a thenable; the body has NOT
// crossed the gate when the thenable is read; the gate opens; the body crosses; and the receipt carries
// returnedValues with the fired handle's value. The delete's enumerable keys are the FOUR (address, op, tiers,
// triggered) and its own names number NINE.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RV-7 · THE DELETE RECEIPT CARRIES IT TOO — four enumerable keys, nine own names (D-149 item 2, D-150 item 1)', async (t) => {
  const store = make();

  // ── THE SEED, TAKEN BEFORE ANY LISTENER STANDS, SO IT IS A PLAIN RECORD AND NOT A SETTLE. ────────────────
  const seeded = captured(() => store.write(['rv7-a'], 'mem', 5));
  assert.equal(seeded.ok, true, 'the seed write must stand: no listener stands at this instant');
  assert.equal(isThenable(seeded.value), false,
    '**THE SEED MUST BE A PLAIN RECORD** (no listener stood, so no body returned a thenable and no settle '
      + 'ran), or the delete below would be driving a store whose state is a promise: thenable = '
      + String(isThenable(seeded.value)));

  const gate = gateOf();
  const marks = [];
  store.listen('rv7-h', [['rv7-a']]);
  store.register('rv7-h', async () => {
    await gate.promise;
    marks.push('rv7-h');
    return 'delete-value';
  });

  // ── THE DELETE, AND ITS ANSWER READ AS A THENABLE BEFORE THE GATE IS TOUCHED. ────────────────────────────
  const answer = captured(() => store.delete(['rv7-a']));
  assert.equal(answer.ok, true,
    'the delete must stand: its one body fulfills — the call threw '
      + String(answer.caught !== undefined && answer.caught !== null ? answer.caught.status : 'nothing'));
  assert.equal(isThenable(answer.value), true,
    '**THE DELETE\'S ANSWER MUST BE A THENABLE WHERE A BODY SUSPENDED** (D-149 item 2 read for the delete): '
      + 'thenable = ' + String(isThenable(answer.value)));
  assert.deepEqual(asSet(marks), [],
    '**THE BODY MUST STILL BE HELD AT THE GATE WHEN THE THENABLE IS READ** — otherwise the gate proves nothing: '
      + 'marks as a set = ' + JSON.stringify(asSet(marks)));

  gate.open();
  const receipt = await answer.value;
  assert.deepEqual(asSet(marks), ['rv7-h'],
    '**THE GATE WAS OPENED BY THIS DRIVE AND THE BODY CROSSED IT** — the settle therefore ran after the '
      + 'opening and the map below was read off a settled set: marks as a set = ' + JSON.stringify(asSet(marks)));

  // ── THE MEMBER, THE MAP, AND THE FIRED HANDLE'S VALUE. ───────────────────────────────────────────────────
  const member = memberOf(receipt, 'returnedValues');
  assert.equal(member.present, true,
    '**THE DELETE\'S RECEIPT MUST CARRY returnedValues** (D-149 item 2): own names read '
      + JSON.stringify(Object.getOwnPropertyNames(receipt)));
  assert.deepEqual(shapeOf(member.descriptor), FAMILY_ACCESSOR,
    'and with the family descriptor shape — non-enumerable, configurable, a getter: read '
      + JSON.stringify(shapeOf(member.descriptor)));
  const map = member.value;
  assert.deepEqual(sortedKeys(map), ['rv7-h'],
    'the map must carry the fired handle and no other: read ' + JSON.stringify(map));
  assert.equal(map['rv7-h'], 'delete-value',
    '**THE ENTRY MUST BE WHAT THE FIRED BODY RETURNED**: read ' + JSON.stringify(map['rv7-h']));

  // ── THE DELETE'S OWN CENSUS: FOUR ENUMERABLE, NINE OWN. ──────────────────────────────────────────────────
  const keys = Object.keys(receipt);
  const ownNames = Object.getOwnPropertyNames(receipt);
  t.diagnostic('RV-7 · the delete receipt\'s Object.keys in insertion order = ' + JSON.stringify(keys)
    + '; the same four as a set = ' + JSON.stringify(asSet(keys))
    + '; Object.getOwnPropertyNames in insertion order = ' + JSON.stringify(ownNames)
    + ' (' + String(ownNames.length) + ' names)');
  assert.deepEqual(asSet(keys), ['address', 'op', 'tiers', 'triggered'],
    '**THE DELETE\'S FOUR ENUMERABLE MEMBERS ARE UNMOVED** (D-150 item 1 reads the accessor as '
      + 'non-enumerable): read ' + JSON.stringify(keys));
  assert.equal(keys.length, 4,
    'and there are exactly four of them: read ' + JSON.stringify(keys));
  assert.equal(ownNames.includes('returnedValues'), true,
    'the name must be among the delete receipt\'s own names: read ' + JSON.stringify(ownNames));
  assert.equal(ownNames.length, 9,
    '**A DELETE\'S RECEIPT MUST READ NINE OWN NAMES** — the four typed plus commit, discarded, log, '
      + 'bodyFailures and returnedValues (D-149 item 2, moving eight to nine): read ' + JSON.stringify(ownNames));
});
