// RED SET — `U-STOREROOM-CONSTRAINTS`, THE FIVE-ITEM SURFACE AND ITS ARGUMENT / RETURN SHAPES
//
// DERIVED FROM THE CONTRACT ALONE: `docs/specs/storeroom-constraints/contract.md`,
// `kernel-surface.md §1`–`§2`, `parameter-semantics.md §2.1`–`§2.17`, `fail-surface.md §1`.
// NO IMPLEMENTATION IS READ, STUBBED OR EDITED BY THIS FILE.
//
// ── THE STATES ENUMERATED BEFORE THE TESTS (the state machine this unit declares) ─────────────
//
// `K-1` `register(store, address, id, constraint)` — the registration key's TWO members are the
//   address (`PAR-C-1`: the store's own domain, unchanged) and the id (`PAR-C-2`: a non-empty
//   string) and the third argument is the registered function (`PAR-C-3`).
//   VALID STATES: an in-domain address, a non-empty id, a function. Two ids at one address leave
//   TWO registry entries and ONE store home entry.
//   FAIL STATES: `address` outside its shape domain → the kernel's `KC-1`; an address the STORE
//   refuses → the STORE's own code on the STORE's own channel; `id` outside its domain (empty
//   string, null, undefined, non-string, absent) → `KC-2`; a non-function `constraint` → `KC-2`.
//
// `K-2` `commit(store, address, tier, value)` — the attempt's FIRST WRITE, issued through the
//   caller's own store write verb (`kernel-surface.md §2.1` item 2).
//   VALID STATES: an in-domain `tier` + an admitted `value` → the four-member `CommitRecord`.
//   FAIL STATES: an address that already holds an OPEN attempt → `KC-7`, REFUSED BEFORE the write
//   verb is reached; an out-of-domain `tier` or an absent `value` → THE STORE'S OWN CODE AT THE
//   VERB CALL, the kernel minting NO `KC-2` for either (`fail-surface.md §2`'s `KC-2` row,
//   `parameter-semantics.md §2.14`'s absent-`value` reading, withdrawn-by-name reading).
//
// `K-3` `runAttempt(store, commit)` — evaluates the write's pass at the attempt's own address.
//   VALID STATES: an open attempt's `CommitRecord` → the five-member `AttemptReport`.
//   FAIL STATES: a `CommitRecord.attempt` naming a CLOSED or UNKNOWN attempt → `KC-2`.
//
// `K-4` `log(store, attempt)` — the closed attempt's own `LogEntry[]`.
//   FAIL STATES: an UNKNOWN attempt reference → `KC-2`.
//
// `K-5` `report(store, attempt)` — the closed attempt's five-member `AttemptReport`.
//   FAIL STATES: an unknown attempt reference → `KC-2` AND NEVER `KC-7`; an attempt that is still
//   OPEN → `KC-7`.
//
// `K-1`–`K-5` ARE THE WHOLE SURFACE: no sixth item is declared, no callback parameter exists on any
//   of the five, and no store verb accepts a function at any position.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  kernel, makeStore, tag, KC, STORE_CODES, KC_TOKENS,
  assertAttemptRef, assertKernelForm, assertLogEntry, assertSeqIncreasesFromOne,
  assertAttemptReport, assertStoreRefusal, capture, entries, checkIds, noop, } from './constraint-kernel-helpers.mjs';

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §1  `K-1` `register` — EVERY ARGUMENT'S DOMAIN, AND THE HANDLE IT ADOPTS
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_surface_K1_the_five_items_are_the_whole_surface', async () => {
  const mod = await kernel();
  for (const item of ['register', 'commit', 'runAttempt', 'log', 'report']) {
    assert.equal(typeof mod[item], 'function', `K-${item} is reachable from the module`);
  }
  for (const absent of ['unregister', 'attempts', 'pending', 'findAddress', 'release']) {
    assert.equal(absent in mod, false,
      `no sixth item is declared: ${absent} is not a member of the kernel module (§1 item 2)`);
  }
});

test('ck_surface_K1_a_lawful_registration_returns_the_store_s_own_adopted_handle', async () => {
  const { register } = await kernel();
  const store = makeStore();
  const address = [tag('k1a')];
  const handle = register(store, address, 'x', () => true);
  // THE HANDLE'S OWN ROW, CITED AND NOT WIDENED (`kernel-surface.md §2.1` item 1, the return-shape row:
  // "the handle the store's machinery holds for that address — the handle is ADOPTED, never minted by
  // the kernel"; `A: bindings/js/index.d.ts`: `Handle = object`, and the store's own `listen` "answers
  // the FRESH opaque handle it is keyed by"). NOTHING DECLARES A STRING, so no type outside that row is
  // asserted; what the row DOES declare is IDENTITY — one adopted value per address, minted by the
  // store's own verb — and that is what is read below.
  assert.notEqual(handle, undefined, 'K-1 answers the store\'s own handle and never undefined');
  const again = register(store, address, 'x', () => true);
  assert.equal(again, handle,
    'a second registration at the SAME address answers the SAME adopted handle: the store\'s `listen` '
    + 'is idempotent at the address level and returns the existing entry\'s handle (`§2.1` item 1)');
  const same = (store.register(store.listen(address), () => {}) || store.listen(address));
  assert.equal(same, handle,
    'the kernel ADOPTS the store\'s own home entry for the address and mints no token of its own: the '
    + 'store\'s own verb answers the kernel\'s own value, so the two are the ONE value');
  // AND THE KERNEL EXPOSES NO MEMBER OF THE HANDLE BEYOND THAT VALUE — the store\'s module namespace is
  // CLOSED at its EIGHT verbs and the instance at its THREE members `register` · `on` · `off`, so no
  // invocation member exists anywhere for a handle to be reached through (`§2.2` item 2, whose bare-call
  // reading is withdrawn by name; `A: docs/specs/storeroom-js/contract.md §2.9` item 1).
  assert.deepEqual(Object.keys(handle), [],
    'the handle is OPAQUE: it carries no member the kernel could read a state off');
  for (const member of ['on', 'off', 'register', 'invoke', 'call', 'fn', 'constraint']) {
    assert.equal(member in handle, false,
      `no member of the handle is declared — ${member} stands on neither the store's surface nor the kernel's`);
  }
});

test('ck_surface_K1_two_ids_at_one_address_leave_two_entries_and_one_store_home', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('k1b')];
  const h1 = register(store, address, 'x', () => true);
  const h2 = register(store, address, 'y', () => true);
  assert.equal(h1, h2, 'ONE store home entry stands for the one address (§2.1 item 1)');
  const commitRecord = commit(store, address, 'mem', 1);
  const report = runAttempt(store, commitRecord);
  assertAttemptReport(report, 'K-1 two-id pass');
  assert.equal(report.outcome, 'passed', 'both pairs passed');
  assert.deepEqual(checkIds(report.log).sort(), ['x', 'y'],
    'the registry holds TWO entries — one per pair key — and the pass evaluated both');
});

test('ck_surface_K1_a_null_address_is_refused_with_KC1', async () => {
  const { register } = await kernel();
  const store = makeStore();
  const r = capture(() => register(store, null, 'x', () => true));
  assert.equal(r.threw, true, 'an address outside its shape domain is refused, never admitted');
  assertKernelForm(r.thrown, 'KC-1 null address');
  assert.equal(r.thrown.status, 'KC-1', 'the member token is ConstraintAddressRefused');
  assert.equal(r.thrown.log.length, 0, 'no attempt exists yet, so the carried log is empty');
});

test('ck_surface_K1_every_address_shape_outside_the_domain_is_refused_with_KC1', async () => {
  const { register } = await kernel();
  const store = makeStore();
  const outside = [
    ['undefined', undefined],
    ['a non-array', 'a'],
    ['a number', 7],
    ['an object', { 0: 'a' }],
    ['an array with a segment outside the domain', [null]],
    ['an array with a negative index', [-1]],
    ['an array with a fractional index', [1.5]],
    ['an array holding an array segment', [['a']]],
  ];
  for (const [why, address] of outside) {
    const r = capture(() => register(store, address, 'x', () => true));
    assert.equal(r.threw, true, `${why}: outside the address domain, so refused`);
    assertKernelForm(r.thrown, `KC-1 ${why}`);
    assert.equal(r.thrown.status, 'KC-1', `${why}: ConstraintAddressRefused`);
  }
});

test('ck_surface_K1_the_empty_address_is_in_the_store_s_domain', async () => {
  const { register } = await kernel();
  const store = makeStore();
  const handle = register(store, [], 'x', () => true);
  // THE EMPTY ARRAY IS IN THE STORE'S OWN DOMAIN (`PAR-C-1`'s domain cell: "the empty array included"),
  // so the row this cell reads is `§2.1` item 1's RETURN SHAPE and not a type: the value the store's own
  // verb adopted for that address, `===` to it (`A: bindings/js/index.d.ts`: `Handle = object`).
  assert.notEqual(handle, undefined,
    'the empty array is inside the address domain (§2.1: "the empty array included"), so it is admitted and not KC-1');
  assert.equal((store.register(store.listen([]), () => {}) || store.listen([])), handle,
    'and the admitted address answers the store\'s own adopted handle — one value, adopted and never minted');
});

test('ck_surface_K1_every_id_outside_its_domain_is_refused_with_KC2', async () => {
  const { register } = await kernel();
  const store = makeStore();
  const address = [tag('k1c')];
  const outside = [
    ['the empty string', ''],
    ['null', null],
    ['undefined', undefined],
    ['a number', 3],
    ['a boolean', false],
    ['an object', { id: 'x' }],
    ['an array', ['x']],
    ['a function', () => {}],
  ];
  for (const [why, id] of outside) {
    const r = capture(() => register(store, address, id, () => true));
    assert.equal(r.threw, true, `${why}: outside the id domain, so refused before the store sees anything`);
    assertKernelForm(r.thrown, `KC-2 id ${why}`);
    assert.equal(r.thrown.status, 'KC-2', `${why}: ConstraintArgRefused`);
  }
  // the ABSENT argument
  const absent = capture(() => register(store, address));
  assert.equal(absent.threw, true, 'an absent id is outside the domain');
  assert.equal(absent.thrown.status, 'KC-2', 'an absent id is ConstraintArgRefused');
});

test('ck_surface_K1_a_non_function_constraint_is_refused_with_KC2', async () => {
  const { register } = await kernel();
  const store = makeStore();
  const address = [tag('k1d')];
  for (const [why, fn] of [['a string', 'not a function'], ['null', null], ['undefined', undefined],
    ['a number', 1], ['an object', {}], ['an array', []]]) {
    const r = capture(() => register(store, address, 'x', fn));
    assert.equal(r.threw, true, `${why} is not a function, so the registration is refused`);
    assert.equal(r.thrown.status, 'KC-2', `${why}: ConstraintArgRefused`);
  }
  const absent = capture(() => register(store, address, 'x'));
  assert.equal(absent.threw, true, 'an absent constraint is outside the domain');
  assert.equal(absent.thrown.status, 'KC-2', 'an absent constraint is ConstraintArgRefused');
});

test('ck_surface_K1_the_three_refused_shapes_of_E2E_C_12_add_nothing_to_the_registry', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('k1e')];
  const refused = [
    capture(() => register(store, null, 'x', () => true)),
    capture(() => register(store, address, '', () => true)),
    capture(() => register(store, address, 'x', 'not a function')),
  ];
  assert.deepEqual(refused.map((r) => r.threw), [true, true, true], 'each of the three throws');
  assert.deepEqual(refused.map((r) => r.thrown.status), ['KC-1', 'KC-2', 'KC-2'],
    'ConstraintAddressRefused, then ConstraintArgRefused twice');
  // THE SUBSTITUTE OBSERVATION THE SCENARIO NAMES: the lawful pass evaluates ONE entry per pair it holds
  register(store, address, 'y', () => true);
  const commitRecord = commit(store, address, 'mem', 1);
  const report = runAttempt(store, commitRecord);
  assert.deepEqual(checkIds(report.log), ['y'],
    'exactly ONE constraint-check entry, id y — so the three refused calls added NOTHING to the registry');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §2  `K-2` `commit` — THE FOUR-MEMBER `CommitRecord`, AND THE STORE'S OWN CHANNEL
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_surface_K2_commit_returns_a_four_member_CommitRecord_and_opens_the_attempt', async () => {
  const { register, commit } = await kernel();
  const store = makeStore();
  const address = [tag('k2a')];
  register(store, address, 'x', () => true);
  const record = commit(store, address, 'mem', 42);
  assert.equal(typeof record, 'object', 'K-2 hands back the commit\'s record');
  assert.notEqual(record, null, 'the record is not null');
  assert.deepEqual(Object.keys(record).sort(), ['attempt', 'op', 'pending', 'triggered'],
    'CommitRecord carries exactly FOUR members — attempt, op, triggered, pending');
  assertAttemptRef(record.attempt, 'CommitRecord.attempt');
  assert.equal(typeof record.op, 'object', 'CommitRecord.op is the op the store\'s write returned VERBATIM');
  assert.equal(typeof record.op.opId, 'string', 'the op carries its own opId');
  assert.equal(record.op.kind, 'write', 'the attempt\'s first write is a write op');
  assert.deepEqual(record.op.address, address, 'the op names the address the write landed at');
  assert.equal(record.op.tier, 'mem', 'the op names the tier the write landed at');
  assert.ok(Array.isArray(record.triggered), 'triggered is the store\'s own member, read as a SET');
  assert.ok(Array.isArray(record.pending),
    'pending is the kernel\'s own fourth member — THE WHOLE RETURNED SET OF TRIGGERED CONSTRAINTS this '
    + 'call\'s write returned, each entry leaving it ONLY by being checked off as it passes, and the '
    + 'member the caller\'s own loop reads its work off (`kernel-surface.md §2.1` item 2; '
    + '`A: docs/decisions.md` · `A112`). RE-DERIVED AT THE `A112` DELIVERY-MODEL RE-DERIVATION PASS: the '
    + 'label that once stood here read this member as *"layer (b)\'s handles"*, which carried the '
    + 'withdrawn sift reading — both members carry the whole returned set, and their difference is one of '
    + 'EXTENT AND ORDER and not a filter');
});

test('ck_surface_K2_a_second_commit_at_the_same_address_meets_KC7_before_the_write_verb', async () => {
  const { register, commit } = await kernel();
  const store = makeStore();
  const address = [tag('k2b')];
  register(store, address, 'x', () => true);
  const first = commit(store, address, 'mem', 1);
  assertAttemptRef(first.attempt, 'first commit');
  const r = capture(() => commit(store, address, 'mem', 2));
  assert.equal(r.threw, true, 'a second K-2 at a live address is refused');
  assertKernelForm(r.thrown, 'KC-7 at K-2');
  assert.equal(r.thrown.status, 'KC-7', 'the refusal happens BEFORE the write verb is reached');
});

test('ck_surface_K2_an_out_of_domain_tier_is_the_store_s_own_code_on_the_store_s_own_channel', async () => {
  const { register, commit } = await kernel();
  const store = makeStore();
  const address = [tag('k2c')];
  register(store, address, 'x', () => true);
  const r = capture(() => commit(store, address, 'notATier', 1));
  assert.equal(r.threw, true, 'the kernel passes the tier through and the store\'s own write refuses it');
  // THE CHANNEL RULE, READ OFF ITS OWN ROW (`fail-surface.md §1.2` item 2: where the kernel invokes the
  // store's own verb — "the write verb at `K-2`" — "the failure is the STORE'S, it is thrown in the
  // STORE'S own form, and the KERNEL WRAPS NOTHING AND RE-LABELS NOTHING", its `status` being one of the
  // store's closed set "VERBATIM" — the amended heading carries `16` members (`11 + 2 + 1 + 1 + 1 = 16` ✓;
  // AMENDED 2026-10-15, `DEF-2026-10-15-Y`); and the state's own row (`§2.1` item 2's `tier`-refusal clause:
  // "the `tier` is evaluated STORE-SIDE and the store's own `OutOfDomainTier` is thrown at the verb call").
  assertStoreRefusal(r.thrown, 'the out-of-domain tier on the store\'s own channel');
  // AND NO ATTEMPT WAS OPENED: a second, lawful commit at the same address is NOT refused with KC-7
  const lawful = commit(store, address, 'mem', 1);
  assertAttemptRef(lawful.attempt, 'the address was left unheld by the refused write');
});

test('ck_surface_K2_an_absent_value_is_refused_by_the_store_and_never_by_a_KC2', async () => {
  const { register, commit } = await kernel();
  const store = makeStore();
  const address = [tag('k2d')];
  register(store, address, 'x', () => true);
  const r = capture(() => commit(store, address, 'mem'));
  assert.equal(r.threw, true,
    'an absent value is refused AT THE VERB CALL ON THE STORE\'S OWN CHANNEL — the kernel mints NO KC-2 for it');
  assert.equal(STORE_CODES.includes(r.thrown.status), true,
    `the store's own code, and never a kernel state (read ${r.thrown.status})`);
  assert.equal(KC_TOKENS.includes(r.thrown.status), false,
    'a KC-2 thrown for an absent value would BE the defect this clause names');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §3  `K-3` `runAttempt` — THE FIVE-MEMBER REPORT, THE PASS ARM AND ITS LOG
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_surface_K3_the_happy_path_is_a_two_entry_log_a_one_op_report_and_an_empty_rollback', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('k3a')];
  const seen = [];
  register(store, address, 'x', (ctx) => {
    seen.push({ ...ctx, attempt: ctx.attempt, op: ctx.op });
    return true;
  });
  const commitRecord = commit(store, address, 'mem', 'v1');
  const report = runAttempt(store, commitRecord);
  assertAttemptReport(report, 'E2E-C-1 pass');
  assert.deepEqual(report.attempt, commitRecord.attempt, 'the report is the one the commit opened');
  assert.equal(report.outcome, 'passed', 'every constraint passed: the success arm');
  assert.equal(report.ops.length, 1, 'ops carries EXACTLY the write\'s op');
  assert.equal(report.ops[0].opId, commitRecord.op.opId, 'ops[0] IS the op the write returned');
  assert.deepEqual(report.rollback, [], 'rollback is [] on the success arm');
  assert.equal(report.log.length, 2, 'the returned log carries EXACTLY TWO entries');
  assertSeqIncreasesFromOne(report.log, 'E2E-C-1 log');
  assert.equal(report.log[0].kind, 'constraint-check', 'seq 1 is the pass evaluation\'s entry');
  assert.equal(report.log[0].id, 'x', 'the entry names the constraint\'s own BARE id');
  assert.equal(report.log[0].state, null, 'a pass evaluation\'s entry carries no state token');
  assert.equal(report.log[1].kind, 'commit', 'seq 2 is the commit entry');
  assert.equal(report.log[1].id, null, 'the commit entry names no constraint');
  assert.equal(report.log[1].state, null, 'the commit entry carries no state token');
  for (const e of report.log) assertLogEntry(e, 'E2E-C-1 entry');
  // THE ATTEMPT CONTEXT EVERY CONSTRAINT SAW (`kernel-surface.md §2.3` item 1)
  assert.equal(seen.length, 1, 'the constraint was invoked exactly once');
  assert.deepEqual(seen[0].address, address, 'AttemptContext.address is the attempt\'s own address');
  assert.equal(seen[0].tier, 'mem', 'AttemptContext.tier is the tier the write landed at');
  assert.equal(seen[0].value, 'v1', 'AttemptContext.value is the value the write landed, VERBATIM');
  assert.deepEqual(seen[0].attempt, commitRecord.attempt, 'AttemptContext.attempt is the attempt\'s own ref');
  assert.equal(seen[0].op.opId, commitRecord.op.opId, 'AttemptContext.op is the op being evaluated');
});

test('ck_surface_K3_the_log_entry_is_exactly_six_members_in_seq_order', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('k3b')];
  register(store, address, 'x', () => true);
  const report = runAttempt(store, commit(store, address, 'mem', 1));
  assertSeqIncreasesFromOne(report.log, 'log order');
  for (const [i, e] of report.log.entries()) {
    assert.deepEqual(Object.keys(e).sort(), ['id', 'kind', 'message', 'opId', 'seq', 'state'],
      `entry ${i}'s member set is exactly the six declared`);
  }
});

test('ck_surface_K3_a_pass_that_holds_no_pair_carries_no_constraint_check_entry', async () => {
  const { commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('k3c')];
  const report = runAttempt(store, commit(store, address, 'mem', 1));
  assertAttemptReport(report, 'empty-pair pass');
  assert.equal(report.outcome, 'passed', 'nothing failed, so the attempt resolves');
  assert.equal(entries(report.log, 'constraint-check').length, 0,
    'ONE entry per EVALUATED PAIR, and the pass evaluated none');
  assert.equal(entries(report.log, 'repair-run').length, 0, 'no repair ran');
  assert.equal(entries(report.log, 'outcome').length, 0, 'a successful attempt appends no outcome entry');
  assert.deepEqual(report.rollback, [], 'the success arm rolls nothing back');
});

test('ck_surface_K3_a_closed_commit_record_is_refused_with_KC2_and_never_reruns', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore();
  const address = [tag('k3d')];
  let calls = 0;
  register(store, address, 'x', () => { calls += 1; return true; });
  const commitRecord = commit(store, address, 'mem', 1);
  const first = runAttempt(store, commitRecord);
  assert.equal(first.outcome, 'passed', 'the first run resolves');
  assert.equal(calls, 1, 'the constraint ran once');
  const again = capture(() => runAttempt(store, commitRecord));
  assert.equal(again.threw, true, 'a CommitRecord whose attempt is CLOSED is refused');
  assertKernelForm(again.thrown, 'KC-2 stale commit record');
  assert.equal(again.thrown.status, 'KC-2', 'ConstraintArgRefused — and no ninth member is minted for it');
  assert.equal(calls, 1, 'the refused call ran NO second attempt');
});

test('ck_surface_K3_an_unknown_attempt_reference_is_refused_with_KC2', async () => {
  const { runAttempt } = await kernel();
  const store = makeStore();
  const record = { attempt: { id: tag('no-such-attempt') }, op: { opId: tag('no-such-op'), kind: 'write' }, triggered: [], pending: [] };
  const r = capture(() => runAttempt(store, record));
  assert.equal(r.threw, true, 'an UNKNOWN attempt reference is refused');
  assertKernelForm(r.thrown, 'KC-2 unknown attempt at K-3');
  assert.equal(r.thrown.status, 'KC-2', 'ConstraintArgRefused, not KC-7');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// §4  `K-4` `log` AND `K-5` `report` — THE CLOSED RECORD'S TWO READERS
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_surface_K4_the_closed_attempt_s_log_is_reachable_and_is_the_report_s_own_list', async () => {
  const { register, commit, runAttempt, log } = await kernel();
  const store = makeStore();
  const address = [tag('k4a')];
  register(store, address, 'x', () => true);
  const commitRecord = commit(store, address, 'mem', 1);
  const report = runAttempt(store, commitRecord);
  // A CLOSED attempt's record K-4 CAN reach — the failure list names the opposite as a defect
  const entriesBack = log(store, report.attempt);
  assert.ok(Array.isArray(entriesBack), 'K-4 returns LogEntry[]');
  assert.deepEqual(entriesBack, report.log, 'the same list the report carries, member for member');
  for (const e of entriesBack) assertLogEntry(e, 'K-4 entry');
});

test('ck_surface_K5_the_report_is_the_five_member_shape_and_equals_the_K3_return', async () => {
  const { register, commit, runAttempt, report } = await kernel();
  const store = makeStore();
  const address = [tag('k5a')];
  register(store, address, 'x', () => true);
  const commitRecord = commit(store, address, 'mem', 1);
  const fromRun = runAttempt(store, commitRecord);
  const fromReport = report(store, fromRun.attempt);
  assertAttemptReport(fromReport, 'K-5 over a closed attempt');
  assert.deepEqual(fromReport, fromRun, 'the two returns are the ONE five-member shape, member for member');
});

test('ck_surface_K5_an_unknown_attempt_reference_is_KC2_and_never_KC7', async () => {
  const { report, log } = await kernel();
  const store = makeStore();
  const unknown = { id: tag('never-minted') };
  const r = capture(() => report(store, unknown));
  assert.equal(r.threw, true, 'an unknown reference is refused');
  assertKernelForm(r.thrown, 'KC-2 unknown reference at K-5');
  assert.equal(r.thrown.status, 'KC-2', 'ConstraintArgRefused — and NOT KC-7');
  const l = capture(() => log(store, unknown));
  assert.equal(l.threw, true, 'and K-4 refuses the same reference');
  assert.equal(l.thrown.status, 'KC-2', 'K-4\'s unknown-reference refusal is KC-2 too');
});

test('ck_surface_K4_the_readers_answer_from_the_record_and_not_from_the_store_instance', async () => {
  const { register, commit, runAttempt, log } = await kernel();
  const store = makeStore();
  const other = makeStore();
  const address = [tag('k4b')];
  register(store, address, 'x', () => true);
  const report = runAttempt(store, commit(store, address, 'mem', 1));
  const viaOther = log(other, report.attempt);
  assert.deepEqual(viaOther, report.log,
    'the closed attempt\'s record is the kernel\'s own caller-side shape and carries its own log');
});
