// tests/e2e/blind-defect-cases.test.mjs — THE BLIND INSTANCE FOR THE DEFECT CASES.
//
// BLIND = every expectation below is authored from the DECLARED SURFACE, with the
// implementation (bindings/js/index.mjs, bindings/js/src/**, src/**) and every other
// battery under tests/** UNREAD. Each cell names the clause it was taken from.
//
// THE NINE CASES AND THEIR CLAUSES:
//   DEF-M  strata/decisions.md `D-40` (arm declared: a failing repair ⇒ rollback ⇒
//          pre-attempt state) + `D-40`'s IMPLEMENTATION FINDING §5 (the returned op)
//   DEF-S  docs/specs/storeroom-js/surface.md §2.12 item 3 (B) (rank `18`) and the
//          `DEF-A` clause inside it; docs/specs/storeroom-native/contract.md §8.1 row 18
//          and §8.2's appended row; bindings/js/index.d.ts `StoreStatus`
//   DEF-N  docs/specs/storeroom-js/surface.md §2.12 item 3 (A) (rank `19`) and item 3 (C)
//          (items (i), (ii), (iii)); native/contract.md §8.1 row 19 and §8.2's appended row
//   DEF-Q  native/contract.md §8.2's `MessageArgs` rule and property (c); surface.md §2.5
//          item 2 and item 9; index.d.ts `LogEntry`
//   DEF-R  strata/decisions.md `D-39` (constraints() emits in registration sequence)
//   DEF-P  strata/decisions.md `D-38` (one id at N addresses is lawful at every act)
//   DEF-V  strata/decisions.md `D-39` (`DEF-V` closed: refusal correct, specificity not
//          asserted) read with surface.md §2.5 items 3, 4 and 9 (the one plain form)
//   R16    strata/decisions.md `D-39` (`R16` closed: a constraint's lifetime is the store
//          instance's) read with index.d.ts `StoreInstance` (no release verb)
//   the two publish rows: docs/specs/storeroom-publish/contract.md §5.0a `P-PUB-9` (the
//          artefact's version() equals the wrapper manifest's, §5.0a) and
//          native/contract.md §8.1 #13's amended trigger clause with §10.4 part 5
//          (an unwritable parent refuses at construction and leaves nothing behind)
//
// WHERE THE DECLARATION IS SILENT THE FILE SAYS `OWED` AND ASSERTS NOTHING.
//
// EVERY EXPECTATION IS A LITERAL. NO CELL OPENS A docs/** PATH AT RUNTIME (`D-17`):
// the package manifest and the built addon are ARTEFACTS, not declarations, and the only
// files this battery reads are those two.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, readFileSync, readdirSync, rmSync, chmodSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { storeCreate } from '../../bindings/js/index.mjs';

// ─────────────────────────────────────────────────────────────────────────────────────────
// The declared shapes, as literals.
// ─────────────────────────────────────────────────────────────────────────────────────────

// surface.md §2.5 items 1–4 and item 9's clause of 2026-10-25: the one plain form, and its own
// source order in `Object.keys` — `status`, `message`, `log`.
const FORM_KEYS = ['status', 'message', 'log'];

// index.d.ts `LogEntry`; kernel-surface.md §2.5 item 1 (cited from surface.md §2.5 item 3).
const LOG_ENTRY_KEYS = ['id', 'kind', 'message', 'opId', 'seq', 'state'];
const LOG_KINDS = ['constraint-check', 'repair-run', 'commit', 'outcome'];
const KC_TOKENS = ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8'];

// native/contract.md §8.2's two appended rows, 2026-10-26, each row's own worked example.
const RANK_18_SENTENCE =
  "'a' was refused by a constraint body that threw, a constraint body's throwable crosses as this refusal";
const RANK_19_SENTENCE =
  "'a' was refused by its own constraint at registration in 'constraints', a registered constraint must answer true for the state its pair is registered at";

// index.d.ts `addConstraint`'s cross-kind clause: the shared rule sentence the message carries.
const CROSS_KIND_SENTENCE = 'a listener and a constraint do not share one';

// ─────────────────────────────────────────────────────────────────────────────────────────
// Helpers. None of them reads a declaration; each asserts one.
// ─────────────────────────────────────────────────────────────────────────────────────────

function refusalOf(fn, where) {
  try {
    fn();
  } catch (caught) {
    return caught;
  }
  return assert.fail(`${where}: the call was declared to refuse and it answered instead`);
}

// surface.md §2.5 item 3 (a thrown plain object, never an `Error` subclass), item 4 (`log`
// present on every arm, `[]` where the cause has no attempt) and item 9 (an ordinary own
// enumerable data member, three keys, in the form's own order).
function assertOnePlainForm(value, where) {
  assert.equal(value instanceof Error, false, `${where}: a refusal is never an Error subclass (§2.5 item 3)`);
  assert.equal(value && typeof value, 'object', `${where}: a refusal is a plain object (§2.5 item 3)`);
  assert.deepEqual(
    Object.keys(value),
    FORM_KEYS,
    `${where}: surface.md §2.5 item 9 — Object.keys reads ["status","message","log"] on EVERY arm`,
  );
  assert.equal(typeof value.status, 'string', `${where}: the status is carried as a JS string (§2.5 item 1)`);
  assert.ok(value.status.length > 0, `${where}: the status is never empty (§2.5 item 1)`);
  assert.equal(typeof value.message, 'string', `${where}: the message is the store's own generated string (§2.5 item 2)`);
  assert.ok(value.message.length > 0, `${where}: the message is never empty (§2.5 item 2)`);
  assert.ok(Array.isArray(value.log), `${where}: log is never absent, null or a non-array (§2.5 items 4 and 9)`);
}

// DEF-Q's sweep, applied to every log the drive reaches: index.d.ts `LogEntry` (six closed
// members) read with surface.md §2.5 items 3 and 4, and native/contract.md §8.2's property (c)
// — "an argument the trigger does not supply is ABSENT, never `null` and never the string
// 'undefined'" — applied to the one member a reader reads as a sentence.
function sweepLog(log, where) {
  assert.ok(Array.isArray(log), `${where}: log is an array on every arm (§2.5 item 4)`);
  let previousSeq = 0;
  for (const entry of log) {
    assert.ok(entry && typeof entry === 'object', `${where}: a log entry is an object`);
    assert.deepEqual(
      [...Object.keys(entry)].sort(),
      [...LOG_ENTRY_KEYS].sort(),
      `${where}: the entry's member set is CLOSED at the kernel's six (surface.md §2.5 item 3 citing kernel-surface.md §2.5 item 1)`,
    );
    assert.ok(Number.isInteger(entry.seq) && entry.seq >= 1, `${where}: seq is the kernel's append ordinal from 1`);
    assert.ok(entry.seq > previousSeq, `${where}: seq strictly increases in array order (surface.md §2.5 item 3)`);
    previousSeq = entry.seq;
    assert.ok(LOG_KINDS.includes(entry.kind), `${where}: kind is one of the closed four (${entry.kind})`);
    assert.equal(typeof entry.message, 'string', `${where}: every entry's message is a string`);
    assert.ok(entry.message.length > 0, `${where}: every entry's message is non-empty`);
    assert.equal(
      entry.message.includes('undefined'),
      false,
      `${where}: native/contract.md §8.2 property (c) — an argument the trigger does not supply is ABSENT, never the string "undefined"; the entry's message read "${entry.message}"`,
    );
    if (entry.kind === 'outcome') {
      assert.ok(
        entry.state === null || KC_TOKENS.includes(entry.state),
        `${where}: an outcome entry's state is one of KC-1…KC-8 or null (${entry.state})`,
      );
    } else {
      assert.equal(entry.state, null, `${where}: state is null on the three non-outcome kinds (${entry.kind})`);
    }
    assert.ok(entry.id === null || typeof entry.id === 'string', `${where}: id is a bare string or null`);
    assert.ok(entry.opId === null || typeof entry.opId === 'string', `${where}: opId is a string or null`);
    assert.equal(
      entry.message.includes('undefined'),
      false,
      `${where}: a log entry's message never prints undefined (native/contract.md §8.2 property (c))`,
    );
  }
}

function constraintsOf(store) {
  const pairs = store.constraints();
  assert.ok(Array.isArray(pairs), 'constraints() answers a fresh JS array (index.d.ts, the constraints member)');
  return pairs.map((pair) => ({ id: pair.id, address: pair.address }));
}

function readOrRefusal(store, address) {
  try {
    return { value: store.read(address), refusal: null };
  } catch (caught) {
    return { value: undefined, refusal: caught };
  }
}

// ─────────────────────────────────────────────────────────────────────────────────────────
// DEF-M — strata/decisions.md `D-40`, verbatim: "A failing repair triggers a rollback like a
// constraint rejection". The declared consequence, at the ruling's own words: "a failed
// attempt leaves the store exactly as it found it, whether the constraint refused outright or
// its repair failed on the re-run."
// ─────────────────────────────────────────────────────────────────────────────────────────

test('def_m_a_failed_attempt_leaves_the_store_as_it_found_it', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });

  // The seeded value the attempt must find again when it fails.
  store.write(['a'], 'mem', 5);
  assert.equal(store.read(['a']), 5, 'DEF-M precondition: the seed stands at [\'a\']');

  let repairsRun = 0;
  // The repair's own edit: the caller's own `write`, joining the commit it is part of
  // (surface.md §2.11 clause 6; the context carries the commit's `pending`, so it is the
  // record the write's fourth position admits — §2.4 item 9 (g) item 1).
  const repairTo1 = (context) => {
    repairsRun += 1;
    const written = store.write(['a'], 'mem', 1, context);
    return { ok: true, op: written.op };
  };
  // Refuses every value but the seed, and repairs it to 1 — which the re-run then refuses
  // again, which is exactly `D-40`'s measured failing-repair arm.
  const body = (context) => (context.value === 5 ? true : { repair: repairTo1, message: 'a must stand at 5' });

  store.addConstraint({ address: ['a'], id: 'c1' }, body);

  const caught = refusalOf(() => store.write(['a'], 'mem', 9), 'the refused write at [\'a\']');
  assertOnePlainForm(caught, 'DEF-M failing arm');
  assert.equal(repairsRun, 1, 'DEF-M: the registered repair ran once on the refused write');

  const back = readOrRefusal(store, ['a']);
  assert.equal(
    back.refusal,
    null,
    `DEF-M: D-40 — a failed attempt leaves the store as it found it, so the seed must be readable; read refused ${JSON.stringify(back.refusal && back.refusal.status)}`,
  );
  assert.equal(
    back.value,
    5,
    `DEF-M: D-40 — a failing repair triggers a rollback like a constraint rejection, so read(['a']) must answer the seeded 5 and not the rejected 9; it answered ${JSON.stringify(back.value)}`,
  );
});

// ─────────────────────────────────────────────────────────────────────────────────────────
// DEF-M's passing arm — `D-40`'s IMPLEMENTATION FINDING §5: "the passing arm must RETURN the
// report it already builds. No forgery of the op's `after` is admissible". The observable:
// index.d.ts `WriteRecord.op` is "the store's own journal record" whose `after` is "the
// post-state a journal op carries" (`JournalOp`, `BaseState`), so what the op says the store
// then holds and what the store then hands back are one value.
// ─────────────────────────────────────────────────────────────────────────────────────────

test('def_m_the_passing_arms_returned_op_agrees_with_what_the_store_then_hands_back', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });
  store.write(['a'], 'mem', 5);

  const repairTo1 = (context) => {
    const written = store.write(['a'], 'mem', 1, context);
    return { ok: true, op: written.op };
  };
  // Passes at the seed and at the repair's own edit; refuses 9 and repairs it to 1.
  const body = (context) =>
    context.value === 5 || context.value === 1 ? true : { repair: repairTo1, message: 'a must stand at 5 or 1' };
  store.addConstraint({ address: ['a'], id: 'c1' }, body);

  const written = store.write(['a'], 'mem', 9);
  assert.equal(typeof written, 'object', 'DEF-M passing arm: the write answers the declared record');

  const back = readOrRefusal(store, ['a']);
  assert.equal(back.refusal, null, "DEF-M passing arm: the repaired write leaves a readable state at ['a']");
  assert.equal(back.value, 1, `DEF-M passing arm: the repair's edit is the state the store now holds (read ${JSON.stringify(back.value)})`);

  assert.equal(written.op.after.present, true, 'DEF-M passing arm: the returned op describes the state as PRESENT (`BaseState`)');
  assert.equal(
    written.op.after.value,
    back.value,
    `DEF-M passing arm: \`D-40\`'s implementation finding §5 — the op the write returns must agree with what the store hands back; op.after.value read ${JSON.stringify(written.op.after.value)} against read ${JSON.stringify(back.value)}`,
  );
});

// ─────────────────────────────────────────────────────────────────────────────────────────
// DEF-S — docs/specs/storeroom-js/surface.md §2.12 item 3 (B), on the architect's ruling of
// 2026-10-26 ("Expand the returned error set for both S/N"): "A caller's own constraint BODY
// that THROWS now crosses as {status: 'ConstraintBodyThrew', message, log}" — rank 18 at
// native/contract.md §8.1, its sentence at §8.2's appended row.
// ─────────────────────────────────────────────────────────────────────────────────────────

test('def_s_a_constraint_bodys_throw_at_the_write_crosses_as_the_one_plain_form', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });
  store.write(['a'], 'mem', 5);

  const boom = new Error('the body refuses to answer');
  const body = (context) => {
    if (context.value === 9) throw boom;
    return true;
  };
  store.addConstraint({ address: ['a'], id: 'c1' }, body);

  const caught = refusalOf(() => store.write(['a'], 'mem', 9), 'a write whose constraint body throws');
  assertOnePlainForm(caught, 'DEF-S at the write');
  assert.equal(
    caught.status,
    'ConstraintBodyThrew',
    `DEF-S: surface.md §2.12 item 3 (B) — a body's throw crosses as the set's rank 18 member; status read ${JSON.stringify(caught.status)}`,
  );
  assert.equal(
    caught.message,
    RANK_18_SENTENCE,
    `DEF-S: native/contract.md §8.2's appended rank-18 row, whose own worked example is this sentence; message read ${JSON.stringify(caught.message)}`,
  );
  // §2.12 (B): "the `log` the attempt's own list where an attempt stands".
  assert.ok(caught.log.length > 0, "DEF-S: the write's refusal carries the attempt's own entries (§2.12 (B))");
  sweepLog(caught.log, 'DEF-S at the write');
  assert.equal(caught instanceof Error, false, 'DEF-S: the body\'s own Error never crosses as itself');
});

test('def_s_a_constraint_bodys_throw_at_registration_crosses_as_the_one_plain_form', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });

  const caught = refusalOf(
    () =>
      store.addConstraint({ address: ['a'], id: 'c1' }, () => {
        throw new Error('the body throws before it can answer');
      }),
    'an addConstraint whose constraint body throws',
  );
  assertOnePlainForm(caught, 'DEF-S at registration');
  assert.equal(
    caught.status,
    'ConstraintBodyThrew',
    `DEF-S: surface.md §2.12 item 3 (B) — the same rank 18 member at the registration instant; status read ${JSON.stringify(caught.status)}`,
  );
  assert.equal(
    caught.message,
    RANK_18_SENTENCE,
    `DEF-S: native/contract.md §8.2's appended rank-18 row at the registration instant; message read ${JSON.stringify(caught.message)}`,
  );
  assert.deepEqual(
    caught.log,
    [],
    "DEF-S: §2.12 (B) — `[]` where no attempt exists, which is the registration instant (surface.md §2.5 item 4)",
  );
});

// DEF-A's clause, inside surface.md §2.12 item 3 (B), verbatim: "THE MARK IS THE WHOLE OF
// `DEF-A`'S PROTECTION AND IT IS NOT WEAKENED … an UNMARKED throw still crosses AS ITSELF — a
// caller's forged `{status, message}` is the caller's own value and is answered as it was
// thrown, `caught === thrown`."
test('def_s_a_callers_forged_object_is_not_answered_as_a_package_refusal', () => {
  // THE THREE OBSERVATIONS ARE ALL TAKEN FIRST AND ASSERTED LAST, so a cell that reddens still
  // reports every arm it drove (`D-21`: a cell that did not run says so).
  const forgedAtRegistration = { status: 'ConstraintBodyThrew', message: 'the caller forged this refusal', log: [] };
  const forgedAtWrite = { status: 'ConstraintBodyThrew', message: 'the caller forged this one too', log: [] };
  const forgedFromListener = { status: 'ConstraintBodyThrew', message: 'a listener forged this', log: [] };

  // (1) the REGISTRATION instant.
  const storeA = storeCreate({ journalLength: 16, listeners: [] });
  let seenAtRegistration = null;
  try {
    storeA.addConstraint({ address: ['a'], id: 'c1' }, () => {
      throw forgedAtRegistration;
    });
  } catch (caught) {
    seenAtRegistration = caught;
  }

  // (2) the WRITE instant — the clause names "either instant the body is invoked".
  const storeB = storeCreate({ journalLength: 16, listeners: [] });
  storeB.write(['a'], 'mem', 5);
  storeB.addConstraint({ address: ['a'], id: 'c2' }, (context) => {
    if (context.value === 9) throw forgedAtWrite;
    return true;
  });
  let seenAtWrite = null;
  try {
    storeB.write(['a'], 'mem', 9);
  } catch (caught) {
    seenAtWrite = caught;
  }

  // (3) THE CONTROL THAT SEPARATES THE TWO READINGS OF THE CLAUSE'S SENTENCE, so this finding is
  // exact rather than blanket: an UNMARKED throw exists only where the kernel never caught the
  // value, and a LISTENER body's throw is "NOT CAUGHT, NOT RETRIED AND NOT REPORTED"
  // (docs/specs/storeroom-js/surface.md §2.7 item 4).
  const storeC = storeCreate({ journalLength: 16, listeners: [] });
  storeC.listen('h1', [['a']]);
  storeC.register('h1', () => {
    throw forgedFromListener;
  });
  let seenFromListener = null;
  try {
    storeC.write(['a'], 'mem', 1);
  } catch (caught) {
    seenFromListener = caught;
  }

  assert.equal(
    seenAtRegistration,
    forgedAtRegistration,
    'DEF-S / DEF-A: surface.md §2.12 item 3 (B) and native/contract.md §8.1 row 18 ("a forged `{status, message}` is never answered as this member") — the caller\'s own forged object must cross AS ITSELF at the REGISTRATION instant; observed ' +
      JSON.stringify(seenAtRegistration && { status: seenAtRegistration.status, message: seenAtRegistration.message }),
  );
  assert.equal(
    seenAtWrite,
    forgedAtWrite,
    'DEF-S / DEF-A: the same identity rule at the WRITE instant; observed ' +
      JSON.stringify(seenAtWrite && { status: seenAtWrite.status, message: seenAtWrite.message }),
  );
  assert.equal(
    seenFromListener,
    forgedFromListener,
    'DEF-S / DEF-A control: §2.7 item 4 — a listener body\'s throw is not caught, so an UNMARKED throw does cross as itself',
  );
});

// ─────────────────────────────────────────────────────────────────────────────────────────
// DEF-N — docs/specs/storeroom-js/surface.md §2.12 item 3 (A), on the same ruling: a
// WELL-FORMED pair whose body answered non-`true` at registration — "or at `constraintOn`'s
// re-enable, which re-registers the entry's own element through `K-1`" — throws
// {status: 'ConstraintRefusedAtRegistration', message, log}, rank 19, "and NEVER
// `ConstraintListInvalid`" (whose rank `16` names the malformed LIST or ELEMENT alone).
// ─────────────────────────────────────────────────────────────────────────────────────────

test('def_n_a_well_formed_pair_refused_at_registration_is_not_the_shape_code', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });

  const caught = refusalOf(
    () => store.addConstraint({ address: ['a'], id: 'c1' }, () => false),
    'addConstraint at a well-formed pair whose body answers false',
  );
  assertOnePlainForm(caught, 'DEF-N at registration');
  assert.equal(
    caught.status,
    'ConstraintRefusedAtRegistration',
    `DEF-N: surface.md §2.12 item 3 (A) — the registration verdict has its own rank 19 member; status read ${JSON.stringify(caught.status)}`,
  );
  assert.notEqual(
    caught.status,
    'ConstraintListInvalid',
    'DEF-N: surface.md §2.12 item 3 (A) — `ConstraintListInvalid` keeps its own trigger, the malformed entry, and a pair that IS {address: <segment array>, id: <string>} is never answered by it',
  );
  assert.equal(
    caught.message,
    RANK_19_SENTENCE,
    `DEF-N: native/contract.md §8.2's appended rank-19 row, whose own worked example is this sentence; message read ${JSON.stringify(caught.message)}`,
  );
  assert.deepEqual(
    caught.log,
    [],
    'DEF-N: no attempt exists at this instant, so log is the declared empty array (surface.md §2.5 item 4)',
  );
  assert.deepEqual(store.constraints(), [], 'DEF-N: a refused registration leaves the entry exactly as it stood');
});

test('def_n_a_well_formed_pair_refused_at_the_reenable_is_not_the_shape_code', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });
  store.write(['a'], 'mem', 5);

  const body = (context) => (context.value === 5 ? true : { message: 'a must stand at 5' });
  const pair = { address: ['a'], id: 'c1' };
  store.addConstraint(pair, body);
  store.constraintOff(pair, body);

  // A disabled pair is a toggle and not a removal: a write it would have refused is ACCEPTED
  // (index.d.ts, the two toggle members; surface.md §2.12 items 2–3).
  store.write(['a'], 'mem', 9);
  assert.equal(store.read(['a']), 9, 'DEF-N precondition: the disabled constraint let the refused value land');

  const caught = refusalOf(() => store.constraintOn(pair, body), 'constraintOn re-enabling a pair the state violates');
  assertOnePlainForm(caught, 'DEF-N at the re-enable');
  assert.equal(
    caught.status,
    'ConstraintRefusedAtRegistration',
    `DEF-N: surface.md §2.12 item 3 (A) — the re-enable re-registers through K-1, so it answers the same rank 19 member; status read ${JSON.stringify(caught.status)}`,
  );
  assert.notEqual(caught.status, 'ConstraintListInvalid', 'DEF-N: never the shape code at the re-enable either');
  assert.deepEqual(caught.log, [], 'DEF-N: log is [] at the re-enable instant (surface.md §2.5 item 4)');
});

// surface.md §2.12 item 3 (C): three of the constraint methods' refusal arms, named at the
// 2026-10-26 insertion — (i) a DETACHED `addConstraint` and (ii) a DETACHED `constraintOn`,
// each {status: 'AddressMalformed', message, log: []}; and (iii) `addConstraint`'s `D-25`
// LISTENER-HANDLE arm, {status: 'AddressMalformed', message, log} where the pair's `id`
// equals a LIVE listener's handle.
test('def_n_the_two_detached_arms_refuse_as_address_malformed', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });
  store.write(['a'], 'mem', 5);

  const detachedAdd = store.addConstraint;
  const caughtAdd = refusalOf(
    () => detachedAdd({ address: ['a'], id: 'c1' }, () => true),
    'a detached addConstraint call',
  );
  assertOnePlainForm(caughtAdd, 'DEF-N (C)(i), detached addConstraint');
  assert.equal(
    caughtAdd.status,
    'AddressMalformed',
    `DEF-N: surface.md §2.12 item 3 (C)(i) — a detached addConstraint answers AddressMalformed in the one plain form; status read ${JSON.stringify(caughtAdd.status)}`,
  );
  assert.deepEqual(caughtAdd.log, [], 'DEF-N: (C)(i) declares `log: []` at this arm');
  assert.deepEqual(store.constraints(), [], 'DEF-N: (C)(i) — the detached call moves no state at all');

  const body = () => true;
  store.addConstraint({ address: ['a'], id: 'c2' }, body);
  const detachedOn = store.constraintOn;
  const caughtOn = refusalOf(() => detachedOn({ address: ['a'], id: 'c2' }, body), 'a detached constraintOn call');
  assertOnePlainForm(caughtOn, 'DEF-N (C)(ii), detached constraintOn');
  assert.equal(
    caughtOn.status,
    'AddressMalformed',
    `DEF-N: surface.md §2.12 item 3 (C)(ii) — a detached constraintOn answers the same member, the same form and the same instant; status read ${JSON.stringify(caughtOn.status)}`,
  );
  assert.deepEqual(caughtOn.log, [], 'DEF-N: (C)(ii) declares the same member and form as (C)(i)');
  assert.equal(store.constraints().length, 1, 'DEF-N: (C)(ii) — a detached toggle purges no standing pair');
});

test('def_n_the_cross_kind_listener_handle_arm_refuses_as_address_malformed', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });
  // A LIVE listener: the handle `listen` wrote AND the function `register` installed under it
  // (guide §6.2: "`register(handle, listener)` installs the function under a handle this
  // instance holds an entry for"). The clause's word is LIVE, and this is the only reading of
  // that word the surface declares an installation for; the weaker reading — a handle `listen`
  // wrote with no function under it — is recorded `OWED` below, because no clause of the
  // declaration says whether an unregistered handle is LIVE.
  const handle = store.listen('h1', [['a']]);
  assert.equal(handle, 'h1', 'DEF-N precondition: listen answers the caller-spelled handle (D-22)');
  store.register('h1', () => {});

  const caught = refusalOf(
    () => store.addConstraint({ address: ['a'], id: 'h1' }, () => true),
    'addConstraint at a pair whose id is a LIVE listener handle',
  );
  assertOnePlainForm(caught, 'DEF-N (C)(iii), the cross-kind arm');
  assert.equal(
    caught.status,
    'AddressMalformed',
    `DEF-N: surface.md §2.12 item 3 (C)(iii) and \`D-25\` ("Attempting to overwrite a listener with a constraint or vice versa is rejected") — the cross-kind duplicate answers AddressMalformed; status read ${JSON.stringify(caught.status)}`,
  );
  assert.ok(
    caught.message.includes(CROSS_KIND_SENTENCE),
    `DEF-N: index.d.ts \`addConstraint\`'s amendment of 2026-10-24 — the message names both sides and carries the shared rule sentence "a listener and a constraint do not share one"; message read ${JSON.stringify(caught.message)}`,
  );
  assert.deepEqual(store.constraints(), [], 'DEF-N: (C)(iii) — the rejection is taken before any purge and before K-1, so no state moves');
});

// ─────────────────────────────────────────────────────────────────────────────────────────
// DEF-Q — the general rule the log clause declares. native/contract.md §8.2: a message is
// generated from its code and the failing trigger's arguments, and "an argument the trigger
// does not supply is ABSENT, never `null` and never the string 'undefined'" — property (c).
// Read with surface.md §2.5 item 2 (never empty, never a placeholder) and item 3's `LogEntry`
// citation. The drive reaches three of the four entry kinds; `commit` is appended on the
// PASSING arm only (kernel-surface.md §2.5 item 1's `LogKind` table), and a passing attempt
// throws nothing, so no drive of the failure path can reach it — that limit is the clause's,
// not this cell's.
// ─────────────────────────────────────────────────────────────────────────────────────────

test('def_q_no_entrys_message_prints_undefined_and_an_addresses_spelling_renders', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });
  store.write(['a'], 'mem', 5);

  const kinds = new Set();
  const logs = [];

  // (1) a refusal raised by a constraint, carrying a repair that FAILS without an edit: the
  // attempt's log carries one `constraint-check`, one `repair-run` and one `outcome`.
  const fails = (context) =>
    context.value === 5 ? true : { repair: () => ({ ok: false, message: 'attempted to write 1' }), message: 'a must stand at 5' };
  store.addConstraint({ address: ['a'], id: 'c1' }, fails);
  const refusedByConstraint = refusalOf(() => store.write(['a'], 'mem', 9), 'a write refused by a failing repair');
  assertOnePlainForm(refusedByConstraint, 'DEF-Q constraint-refusal source');
  logs.push(['the failing-repair refusal', refusedByConstraint.log]);
  for (const entry of refusedByConstraint.log) kinds.add(entry.kind);

  // (2) a constraint body that throws: the attempt's own `outcome` entry stands at state null.
  const store2 = storeCreate({ journalLength: 16, listeners: [] });
  const throwing = (context) => {
    if (context.value === 'boom') throw new Error('body boom');
    return true;
  };
  store2.addConstraint({ address: ['b'], id: 'c2' }, throwing);
  const threw = refusalOf(() => store2.write(['b'], 'mem', 'boom'), 'a write whose constraint body throws');
  logs.push(['the body-throw refusal', threw.log]);
  for (const entry of threw.log) kinds.add(entry.kind);

  // (3) a refusal with no attempt at all: the declared `[]` arm.
  const absent = refusalOf(() => store2.read(['nowhere', 'at', 'all']), 'a read of an address that holds nothing');
  logs.push(['the store-level refusal', absent.log]);

  // (4) the two appended members' own sentences: the one place the contract declares that a
  // message RENDERS the pair's address spelling (`<SEGMENT>` = "the pair's own `address`
  // spelling, joined by `/`", §8.2's appended rows). Every refusal's own message is swept too.
  for (const [where, log] of logs) sweepLog(log, `DEF-Q ${where}`);
  sweepLog(refusedByConstraint.log, 'DEF-Q the failing-repair refusal');
  assert.ok(kinds.has('constraint-check'), 'DEF-Q: the drive reached a constraint-check entry');
  assert.ok(kinds.has('repair-run'), 'DEF-Q: the drive reached a repair-run entry');
  assert.ok(kinds.has('outcome'), 'DEF-Q: the drive reached an outcome entry');

  for (const [where, log] of logs) {
    for (const entry of log) {
      assert.equal(
        entry.message.includes('undefined'),
        false,
        `DEF-Q: no entry's message prints undefined (native/contract.md §8.2 property (c)); ${where} read "${entry.message}"`,
      );
    }
  }

  // The address rendering. `LogEntry` carries no address member at all (six closed members,
  // index.d.ts), so "an entry that carries an address set" has NO SUBJECT at the entry level —
  // that half is `OWED` and asserted nowhere. What IS declared is that a refusal whose subject
  // is the pair's address renders that address IN THE `<SEGMENT>` SLOT, which is the one
  // rendering rule native/contract.md §8.2 fixes and the appended rows work through.
  const rank19 = refusalOf(
    () => storeCreate({ journalLength: 8, listeners: [] }).addConstraint({ address: ['a'], id: 'c9' }, () => false),
    'a registration verdict on a well-formed pair',
  );
  assert.equal(
    rank19.message.includes("'a'"),
    true,
    `DEF-Q / native/contract.md §8.2's appended rank-19 row — the message renders the pair's own address spelling ('a') in the <SEGMENT> slot; message read ${JSON.stringify(rank19.message)}`,
  );
  assert.equal(rank19.message.includes('undefined'), false, 'DEF-Q: the refusal message itself never prints undefined');

  // The rank-19 row's `<CONTAINER>` slot is the pair's own list name.
  assert.equal(
    rank19.message.includes("'constraints'"),
    true,
    `DEF-Q / native/contract.md §8.2's appended rank-19 row — <CONTAINER> prints the pair's own list name, 'constraints'; message read ${JSON.stringify(rank19.message)}`,
  );
});

// ─────────────────────────────────────────────────────────────────────────────────────────
// DEF-R — strata/decisions.md `D-39`: "`constraints()` must emit in a DECLARED, deterministic
// order — registration sequence … **The cell is owed**: five snapshots across a pass, a
// refusal, a toggle and a `rollback` must be element-wise equal."
//
// (index.d.ts's `constraints` member, exclusion 3, and docs/specs/storeroom-js/surface.md §2.4
// item 6 still declare "NO ORDER IS PROMISED". `D-39` rules that exclusion SUPERSEDED and
// outranks both — so this cell takes the ruling, not the superseded declaration.)
// ─────────────────────────────────────────────────────────────────────────────────────────

test('def_r_constraints_emits_in_registration_sequence_across_five_snapshots', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });

  const pairA = { address: ['a'], id: 'c1' };
  const pairB = { address: ['b'], id: 'c2' };
  const pairC = { address: ['c'], id: 'c3' };
  const bodyC = (context) => (context.value === 7 ? { message: 'c refuses 7' } : true);

  store.addConstraint(pairA, () => true);
  store.addConstraint(pairB, () => true);
  store.addConstraint(pairC, bodyC);

  // The registration sequence, each address rendered as the pair's own SET (index.d.ts
  // `ConstraintPair.address`: "on the READ and at the REMOVAL it is the pair's own SET").
  const expected = [
    { id: 'c1', address: [['a']] },
    { id: 'c2', address: [['b']] },
    { id: 'c3', address: [['c']] },
  ];

  const snapshots = [];
  snapshots.push(['registration', constraintsOf(store)]);

  // a PASS.
  store.write(['a'], 'mem', 1);
  snapshots.push(['a pass', constraintsOf(store)]);

  // a REFUSAL.
  const refused = refusalOf(() => store.write(['c'], 'mem', 7), 'a write refused by c3');
  assertOnePlainForm(refused, 'DEF-R refusal');
  snapshots.push(['a refusal', constraintsOf(store)]);

  // a TOGGLE — off and back on; a toggle is not a removal, so a disabled pair still appears.
  store.constraintOff(pairC, bodyC);
  snapshots.push(['a toggle (off)', constraintsOf(store)]);
  store.constraintOn(pairC, bodyC);
  snapshots.push(['a toggle (on)', constraintsOf(store)]);

  // a ROLLBACK.
  const written = store.write(['b'], 'mem', 42);
  try {
    store.rollback(written.op.opId);
  } catch (caught) {
    assert.fail(`DEF-R: the rollback of the newest op at ['b'] refused: ${JSON.stringify(caught && caught.status)}`);
  }
  snapshots.push(['a rollback', constraintsOf(store)]);

  assert.equal(snapshots.length, 6, 'DEF-R: six snapshots (registration, pass, refusal, two toggles, rollback)');
  for (const [where, pairs] of snapshots) {
    assert.deepEqual(
      pairs,
      expected,
      `DEF-R: \`D-39\` — constraints() emits in REGISTRATION SEQUENCE, deterministically and stably across every call and every intervening act; at "${where}" the read answered ${JSON.stringify(pairs)}`,
    );
  }
});

// ─────────────────────────────────────────────────────────────────────────────────────────
// DEF-P — strata/decisions.md `D-38`, verbatim: "Accept a one-to-many handler/constraint
// addressing at package surface", and its ruling: "one id at N addresses is LAWFUL, at every
// act." The declaration this cell also reads is index.d.ts `ConstraintPair`, which STILL says
// the opposite at its own bytes — "At the CREATION act it is a single address" and "the
// pair-local reuse of one `id` at two addresses is NO LONGER LAWFUL". `D-38` says "the
// declaration moves"; it has not. That is a doc/code disagreement and this cell says so.
// ─────────────────────────────────────────────────────────────────────────────────────────

test('def_p_one_id_at_two_addresses_is_lawful_in_one_call_and_the_declaration_still_says_otherwise', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });
  store.write(['a'], 'mem', 1);
  store.write(['b'], 'mem', 2);

  // index.d.ts `ConstraintPair.address`: `Address | readonly Address[]`; the multi-address
  // pair is the SET spelling, `[['a'], ['b']]` (read beside the guide's own reading of the
  // single-address call, where a bare `['a']` is ONE address).
  const multiPair = { address: [['a'], ['b']], id: 'c1' };
  let identity;
  try {
    identity = store.addConstraint(multiPair, () => true);
  } catch (caught) {
    assert.fail(
      `DEF-P: \`D-38\` — a one-to-many pair is LAWFUL at every act, so the single-call multi-address pair must be accepted; it refused ${JSON.stringify(caught && caught.status)}: ${JSON.stringify(caught && caught.message)}`,
    );
  }
  assert.ok(identity !== undefined, 'DEF-P: the add route answers the pair\'s opaque identity (index.d.ts, PAR-JS-25)');

  const pairs = store.constraints();
  assert.equal(pairs.length, 1, 'DEF-P: ONE pair stands for the one id, never one element per address');
  assert.equal(pairs[0].id, 'c1', 'DEF-P: the pair\'s id is the caller\'s own bare id');
  assert.deepEqual(
    pairs[0].address,
    [['a'], ['b']],
    `DEF-P: \`D-38\` — the ONE pair carries BOTH addresses; constraints() read ${JSON.stringify(pairs[0].address)}`,
  );

  // AND THE DECLARATION HAS NOT MOVED, SAID AT THE CELL THAT WOULD HAVE BEEN RIGHT UNDER IT:
  // index.d.ts `ConstraintPair` (the `address` and `id` members, as they stand) still declares
  // the superseded reading above. A consumer who compiled against it would refuse this lawful
  // call. `D-38` outranks it (`docs/guides/package-use.md` §0: D-… ids "outrank every other
  // document in this tree"), so the behaviour is right and the declaration is the stale side.
  assert.equal(
    Array.isArray(pairs[0].address) &&
      pairs[0].address.length === 2 &&
      pairs[0].address.every((member) => Array.isArray(member)),
    true,
    'DEF-P: index.d.ts ConstraintPair still reads "NO LONGER LAWFUL" for this pair; the observation above contradicts it',
  );
});

// ─────────────────────────────────────────────────────────────────────────────────────────
// DEF-V — strata/decisions.md `D-39`, verbatim: "refusal is correct, specific error code/
// message is a 'could have'." The status and the message's specificity are NOT asserted; only
// that a supplied `undefined` at the `tier` position refuses IN THE ONE PLAIN FORM
// (surface.md §2.5 items 3, 4 and 9).
// ─────────────────────────────────────────────────────────────────────────────────────────

test('def_v_a_supplied_undefined_tier_refuses_in_the_one_plain_form', () => {
  const store = storeCreate({ journalLength: 16, listeners: [] });

  // `D-39`'s own spelling: write(h, ['a'], undefined, value) — a SUPPLIED `undefined` at the
  // tier position is PRESENT and not the absent tier (index.d.ts, `TierSet`; §2.6).
  const caught = refusalOf(() => store.write(['a'], undefined, 1), 'a write with a supplied undefined tier');
  assertOnePlainForm(caught, 'DEF-V');
  assert.equal(caught instanceof TypeError, false, 'DEF-V: a `TypeError` from a store-reaching verb is itself a finding (§2.5 item 5 (e))');
  assert.equal(
    caught.status.length > 0,
    true,
    'DEF-V: the refusal carries a status — WHICH member it is is the ruling\'s "could have" and is asserted nowhere',
  );
});

// ─────────────────────────────────────────────────────────────────────────────────────────
// R16 — strata/decisions.md `D-39`, verbatim: "Not a defect, constraints are lifetime-limited
// by the store instance." Read with `D-39`'s own ground: "when the instance is released they go
// with it — there is nothing else to declare." The observable is therefore (a) no release verb
// exists (index.d.ts `StoreInstance`: no `dispose()`, no `close()`, no finalizer), and (b) two
// instances are independent, so one instance's release cannot reach another's state.
// ─────────────────────────────────────────────────────────────────────────────────────────

test('r16_a_constraints_lifetime_is_the_store_instances', () => {
  const first = storeCreate({ journalLength: 16, listeners: [] });
  const second = storeCreate({ journalLength: 16, listeners: [] });

  first.write(['k'], 'mem', 'first');
  second.write(['k'], 'mem', 'second');
  assert.equal(first.read(['k']), 'first', 'R16: the first instance holds its own value');
  assert.equal(second.read(['k']), 'second', 'R16: the second instance holds its own value');

  first.addConstraint({ address: ['k'], id: 'c1' }, () => true);
  assert.equal(first.constraints().length, 1, 'R16: the first instance carries its own pair');
  assert.deepEqual(second.constraints(), [], 'R16: the second instance carries no pair — the registry is per instance');

  // There is no release verb: the instance's own state "is released with the instance and by
  // nothing else — construct one store and keep it for the process's life" (index.d.ts
  // `StoreInstance`; `A74`).
  const firstNames = Object.getOwnPropertyNames(first);
  for (const forbidden of ['dispose', 'close', 'release', 'destroy', 'finalize']) {
    assert.equal(
      firstNames.includes(forbidden),
      false,
      `R16: index.d.ts \`StoreInstance\` declares no release verb, and ${forbidden} is not one of the members`,
    );
  }
  assert.equal(firstNames.length, 14, 'R16: the product carries FOURTEEN own members, `10 + 1 + 1 + 2 = 14` (index.d.ts)');

  // "Released" is the instance's own collection: the only act is letting the instance go. The
  // observable a drive can take is that the SECOND instance is untouched by the first's
  // reaching its end, and that the second's own constraint still governs its own write.
  const secondRefusalProbe = storeCreate({ journalLength: 16, listeners: [] });
  secondRefusalProbe.write(['k'], 'mem', 'held');
  secondRefusalProbe.addConstraint({ address: ['k'], id: 'c2' }, (context) => (context.value === 'held' ? true : { message: 'k is held' }));

  let firstRef = first;
  firstRef = null; // eslint-disable-line no-unused-vars
  assert.equal(second.read(['k']), 'second', 'R16: the first instance\'s release does not disturb the second\'s state');
  assert.deepEqual(second.constraints(), [], 'R16: and it moves no pair of the second instance\'s registry');
  assert.equal(secondRefusalProbe.constraints().length, 1, 'R16: a third instance keeps its own pair through the same act');
  const stillGoverned = refusalOf(
    () => secondRefusalProbe.write(['k'], 'mem', 'other'),
    'a write the third instance\'s own constraint refuses',
  );
  assertOnePlainForm(stillGoverned, 'R16 control arm');
  assert.equal(
    stillGoverned.log.length > 0,
    true,
    'R16 control arm: the pair governs ITS OWN instance\'s write and the failing attempt carries its own entries',
  );
  // WHICH member a plain constraint rejection carries is NOT asserted here: `D-38`'s `DEF-H`
  // ("Expand the returned fail-state list to include the refusal") declares ONE status for the
  // refusal and names none, and the two members appended since are rank `18`'s and rank `19`'s
  // own (`ConstraintBodyThrew` / `ConstraintRefusedAtRegistration`), neither of which is this
  // arm's. That silence is recorded `OWED`, and nothing is guessed from it.
});

// ─────────────────────────────────────────────────────────────────────────────────────────
// The two publish rows.
//
// docs/specs/storeroom-publish/contract.md §5.0a (`P-PUB-9`): "every released native
// artefact's `version()` answers the main package manifest's `version` CHARACTER FOR
// CHARACTER". The manifest and the built addon are ARTEFACTS, not declarations, so this cell
// reads them at runtime and asserts the declared EQUALITY.
// ─────────────────────────────────────────────────────────────────────────────────────────

test('pub_version_the_artefacts_version_equals_the_wrapper_manifests', () => {
  const require = createRequire(import.meta.url);
  const addonPath = fileURLToPath(new URL('../../bindings/js/build/Release/storeroom_js_binding.node', import.meta.url));
  const manifestPath = fileURLToPath(new URL('../../bindings/js/package.json', import.meta.url));

  assert.equal(existsSync(addonPath), true, `pub/version: the assembled artefact stands beside the entry (§2.3, rung two): ${addonPath}`);
  const addon = require(addonPath);
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

  assert.equal(typeof addon.version, 'function', 'pub/version: `P-PUB-9` — a version that is not callable is a failure of the row');
  const artefactVersion = addon.version();
  assert.equal(typeof artefactVersion, 'string', 'pub/version: `P-PUB-9` — a version() answering a non-string is a failure of the row');
  assert.equal(artefactVersion.length > 0, true, 'pub/version: `P-PUB-9` — a version() answering an empty string is a failure of the row');
  assert.equal(
    artefactVersion,
    manifest.version,
    `pub/version: \`P-PUB-9\` — the artefact's version() must answer the wrapper manifest's version character for character; artefact read ${JSON.stringify(artefactVersion)}, manifest read ${JSON.stringify(manifest.version)}`,
  );
});

// native/contract.md §8.1 #13's amended trigger clause, part (a), and §10.4 part 5: "FAILURE
// REFUSES AT CONSTRUCTION — `FilePathUnreachable`, NO INSTANCE — AND EVERY CONSTRUCTION THAT
// FAILS LEAVES NOTHING BEHIND: no file, no directory and no byte" (read with
// docs/specs/storeroom-publish/contract.md §1.4 item 2, which names this as the store's own
// construction state and not the load path's).
// ─────────────────────────────────────────────────────────────────────────────────────────

test('pub_construction_an_unwritable_parent_refuses_at_construction_and_leaves_no_file', () => {
  const parent = mkdtempSync(join(tmpdir(), 'strata-blind-defect-'));
  const filePath = join(parent, 'store.json');
  let modeMoved = false;
  try {
    chmodSync(parent, 0o500);
    modeMoved = true;
    const entriesBefore = readdirSync(parent).length;

    const caught = refusalOf(
      () => storeCreate({ filePath, journalLength: 4, listeners: [] }),
      'storeCreate with a filePath whose parent the process cannot write',
    );
    assertOnePlainForm(caught, 'pub/construction');
    assert.equal(
      caught.status,
      'FilePathUnreachable',
      `pub/construction: native/contract.md §8.1 #13's amended trigger clause — a path the process may not write into answers FilePathUnreachable at construction; status read ${JSON.stringify(caught.status)}`,
    );
    assert.deepEqual(caught.log, [], 'pub/construction: no instance exists and no attempt exists, so log is the declared [] (surface.md §2.5 item 4)');
    assert.equal(existsSync(filePath), false, 'pub/construction: §10.4 part 5 — a refused construction leaves NO FILE behind');
    assert.equal(
      readdirSync(parent).length,
      entriesBefore,
      'pub/construction: §10.4 part 5 — the parent directory\'s entry count is unchanged',
    );
  } finally {
    if (modeMoved) chmodSync(parent, 0o700);
    rmSync(parent, { recursive: true, force: true });
  }
  assert.equal(existsSync(parent), false, 'pub/construction: the scratch directory is removed');
});
