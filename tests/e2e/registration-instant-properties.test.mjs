// tests/e2e/registration-instant-properties.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// GATE 11 — THE PROPERTY REGISTER FOR `U-STOREROOM-CONSTRAINT-REGISTRATION-INSTANT` (`D-GP-SCRI`).
//
// **THE REGISTER IS `verification.md §3`'s, ROW FOR ROW — `P-SCRI-1`, `P-SCRI-2`, `P-SCRI-3`, THREE ROWS, and
// `ZERO-ROW` IS UNAVAILABLE to this unit because the predicates are EXECUTABLE** (`contract.md §3`'s gate-11
// line; the gate-1 record's `§0` condition 4). **Each row is a UNIVERSALLY QUANTIFIED predicate over
// GENERATED input, and each names its GENERATOR and its FALSIFIER in the cell that executes it.**
//
//   §3 `P-SCRI-1` · THE PARENT DECIDES, NOT THE ADDRESS — AND IT DECIDES BY RESOLVING, NOT BY BEING A
//       CONTAINER. A pair at `A` is asked at an instant iff the parent `A` minus its last segment RESOLVES —
//       as a branch, as a LEAF, or as the register — and is not asked iff the parent does NOT resolve.
//   §3 `P-SCRI-2` · A SKIP IS INERT. The set of instants at which a pair's body runs is unchanged by the
//       pair's presence in the list when its parent does not resolve; no `log` entry names it; and the act
//       that would have asked it answers exactly what it answers with the pair absent.
//   §3 `P-SCRI-3` · THE CREDIT IS CONSERVATIVE — **AND THAT ROW'S PRINTED FORM IS FALSE AT A REGISTRATION,
//       WHICH THIS FILE STATES AS THE CORRECTED READING `PIN-7` (ii) GIVES AND REPORTS AS A FINDING RATHER
//       THAN ENCODING.** The row reads *"the registration stands only if `R`'s own `op` member is a
//       `WriteRecord.op` this store landed during `R`'s own invocation and is not already held by the
//       synthetic attempt"*. `PIN-7` (ii)'s operative sentence is narrower and is the truth: the credit check
//       runs with the invoked-for op `null`, so **THE ORDINAL GROUND IS NOT APPLIED AND THE MEMBERSHIP GROUND
//       STANDS ALONE**, and a registration lands nothing before the repair — **so a `{ok: true, op}` return is
//       CREDITED WHATEVER IDENTITY IT NAMES, and the RE-RUN over that op (`D-94`, `PIN-7` (iii)) is what
//       decides whether the registration stands.** A forged op is credited; a returned op the store landed in
//       an EARLIER act (not during this invocation) is credited; and a registration can therefore stand on a
//       return naming an op the repair never landed. **The ROW is reported; the PIN is asserted.**
//
// ── THE DISCIPLINE ───────────────────────────────────────────────────────────────────────────────────────
//
// **EVERY EXPECTATION BELOW WAS AUTHORISED FROM THE DECLARATION AND FROM NOTHING ELSE**: `contract.md`
// `PIN-2` (i)–(v) with `D-96`'s dated inversion, `PIN-3`, `PIN-4`, `PIN-5`, `PIN-6`, `PIN-7` (i)–(iv),
// `PIN-9`, `PIN-10`; `verification.md §3`; `clause-context.md §1`; `strata/decisions.md` `D-90`…`D-97`; and the
// PUBLISHED SURFACE — `bindings/js/index.d.ts` and `docs/guides/package-use.md §7.1`–`§8`.
// **NO BYTE OF `bindings/js/src/entry/**` OR OF `src/**` WAS READ TO AUTHOR THIS FILE, AND NONE IS
// IMPORTED**: the entry reached here is `bindings/js/index.mjs` by PATH and nothing else, and every reading is
// taken at a published member. **No cell opens a document at runtime** (`D-17`).
//
// **THE SHAPE IS THE HOUSE'S**, matched from `tests/e2e/held-listener-identity-properties.test.mjs`: a seeded
// `mulberry32` 32-bit mixer with ONE PINNED LITERAL SEED PER PROPERTY, so a failure is reproducible from the
// seed and the printed attempt index alone; a fixed case count per property; at most five failures collected
// before a row stops; the FALSIFIER named in the cell; and a diagnostic that prints the GENERATED INPUT of
// every case that failed. **THAT PRECEDENT IS THE ONE FILE READ BESIDE THE DECLARATION FOR THIS FILE, AND ITS
// SHAPE ALONE — no expectation of its rows is reused, restated or weakened here.** **`bindings/js/index.mjs`,
// `bindings/js/src/entry/**`, `src/**` and this unit's two gate-3 batteries were NOT read, and the drives were
// exercised against the published entry as a CONSUMER before they were written — which fixed the DRIVE and no
// expectation: every expectation below cites the clause it was written from.**
//
// **AND EVERY FALSIFIER IS REACHABLE, WHICH IS ASSERTED AND NOT CLAIMED**: each property's generator rotates
// its decisive dimension DETERMINISTICALLY across the case budget (the parent's class, the list's mode or the
// return's shape), and each property CLOSES on an assertion that every arm of that dimension occurred at
// least once. An arm that never occurred would make its own falsifier unreachable and the property vacuous;
// the closing assertion is what makes that a failure instead of a silence.
//
// ── THE GENERATORS' DOMAINS, EACH THE DECLARATION'S OWN ─────────────────────────────────────────────────
//
// · THE SEGMENT POOL — `['', 'a', 'b', 'window', 'tabs', 0, 1]`: a segment is a `string` KEY or a
//   NON-NEGATIVE INTEGER INDEX, the empty string included (`index.d.ts`, `Address`; `PAR-JS-5`).
// · THE REGISTER'S KEY POOL — the string keys alone: the register is a map, so a write at a bare index
//   answers `AddressNotFound` ("`0` does not exist in `''`, it holds no keys"), and the generator draws only
//   keys the register admits for a depth-1 node. An integral segment is admitted BELOW an array.
// · THE PARENT STATES — the REGISTER (always a container, `PIN-2` (i)), a BRANCH, a LEAF, and ABSENT
//   (`PIN-2` (ii)'s three arms as `D-96` (3) inverts the third).
// · THE VALUE POOL — `{a finite number, a string, a boolean, {}, {k: 1}, []}`: the six that separate a leaf
//   from a branch and an empty container from both (`verification.md §3`, `P-SCRI-1`'s own generator;
//   `sites §3.1` item 6). **`null` is NOT in it — the JavaScript crossing refuses it as
//   `ValueRefusedAtBoundary` before the store sees it.**
// · THE LISTS — WELL-FORMED (0..n elements carrying a pair and its function) and MALFORMED in the four ways
//   `PIN-5` (ii) leaves the shape arm: an `address` that is not a segment array, an `id` that is not a
//   string, a DUPLICATE `id` in one supplied list, and a CROSS-KIND collision with a listener's handle
//   (`guide §7.2`; `index.d.ts`, `StoreConfig.constraints`; `D-27`).
// · THE REPAIR RETURNS — the closed two-arm set `{ok: true, op}` · `{ok: false, message}` plus its declared
//   degenerate form `{ok: true}` with no `op`, crossed with the three op provenances `own` (the op this
//   invocation's route-write landed), `inherited` (an op THIS STORE landed in an EARLIER act, not during this
//   invocation) and `forged` (a well-formed identity the store never landed).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { storeCreate } from '../../bindings/js/index.mjs';

/** A store at the two REQUIRED `cfg` keys alone (`index.d.ts`, `StoreConfig`), plus the case's own keys. */
const make = (extra = {}) => storeCreate({ journalLength: 64, listeners: [], ...extra });

// ── THE DETERMINISTIC PINNED SEEDS ───────────────────────────────────────────────────────────────────────
//
// ONE SEED PER PROPERTY, PINNED AS A LITERAL. `mulberry32` is a pure function of the seed: no clock, no
// `Math.random`, no host entropy — every run draws the same values in the same order, so a reported failure
// is reproducible from `(seed, attempt)` alone.
const SEEDS = {
  'P-SCRI-1': 0x5C4101,
  'P-SCRI-2': 0x5C4102,
  'P-SCRI-3': 0x5C4103,
};

const MAX_FAILURES_PER_PROPERTY = 5;

function rngFor(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (next, list) => list[Math.floor(next() * list.length) % list.length];
const intBetween = (next, lo, hi) => lo + Math.floor(next() * (hi - lo + 1));

/**
 * THE PROPERTY RUNNER — at most `cases` generated cases, stopping after `MAX_FAILURES_PER_PROPERTY` failures,
 * and carrying the generated input of every case out with its verdict. `draw` is the case's own record of
 * what it drew: it is what a failing case PRINTS, so a failure names its own input and not a category.
 */
function runProperty({ row, seed, cases, body }) {
  const rng = rngFor(seed);
  const failures = [];
  const arms = Object.create(null);
  let ran = 0;
  for (let i = 0; i < cases && failures.length < MAX_FAILURES_PER_PROPERTY; i += 1) {
    const draw = { attempt: i };
    ran += 1;
    try {
      body(rng, i, draw, arms);
    } catch (err) {
      failures.push({ attempt: i, input: draw, message: err && err.message ? err.message : String(err) });
    }
  }
  return { row, seed, cases: ran, failures, arms };
}
const tally = (arms, name) => { arms[name] = (arms[name] || 0) + 1; };

/** Run `fn`, answering `{threw, value}`. Neither arm is a pass here; the case decides what each means. */
function attempt(fn) {
  try {
    return { threw: false, value: fn() };
  } catch (err) {
    return { threw: true, value: err };
  }
}

/** The one thrown form (`guide §8`; `index.d.ts`, `StoreRefusal`): asserts the form and answers the value. */
function plainRefusal(value, label) {
  assert.equal(value instanceof Error, false, `${label}: the failure form is a PLAIN object and never an Error`);
  assert.deepEqual(Object.keys(value).sort(), ['address', 'log', 'message', 'status'],
    `${label}: Object.keys(caught) reads exactly ["status","message","log","address"] (§8; D-77)`);
  assert.equal(typeof value.status, 'string', `${label}: status is a string from the store's own closed set`);
  assert.equal(Array.isArray(value.log), true, `${label}: log is never absent, never null and never a non-array (§8)`);
  return value;
}

// ── THE GENERATORS ───────────────────────────────────────────────────────────────────────────────────────

const SEGMENTS = ['', 'a', 'b', 'window', 'tabs', 0, 1];     // a key OR an index (`index.d.ts`, `Address`)
const STRING_KEYS = ['', 'a', 'b', 'window', 'tabs'];        // the register is a map: only keys stand at depth 1
const LEAF_KINDS = ['number', 'string', 'boolean'];
const BRANCH_KINDS = ['emptyObject', 'object', 'array'];

/** A fresh literal of one kind, so no case can share a value object with another (`P-SCRI-1`'s value pool). */
function freshValue(kind) {
  if (kind === 'number') return 7;
  if (kind === 'string') return 'leaf';
  if (kind === 'boolean') return true;
  if (kind === 'emptyObject') return {};
  if (kind === 'object') return { k: 1 };
  if (kind === 'array') return [];
  throw new Error('no value of kind ' + kind);
}

/**
 * PUT A GENERATED STATE UNDER A GENERATED PARENT (`P-SCRI-1`'s state generator). The address is of depth
 * `1`–`3`, so its parent is of depth `0`–`2`; each prefix that must be a container for the next segment to
 * exist is written first, and the parent's own node is written LAST so the arm drawn is the arm the store
 * holds. **A MAP AND AN ARRAY ARE NOT INTERCHANGEABLE HERE, AND THE GENERATOR RESPECTS BOTH HALVES: a map
 * refuses an INDEX (`ContainerKindConflict`) and an array refuses a KEY (`AddressNotFound`), and an index at
 * or below the array's length selects a slot while an index past it refuses — so an integral second segment
 * is raised under an array TWO SLOTS LONG and a string one under a map.** And the ABSENT arm takes a string
 * second segment, because a slot of a raised array is a node that stands.
 */
function buildState(store, next, wantedClass) {
  const depth = wantedClass === 'register' ? 0 : intBetween(next, 1, 2);
  const kind = wantedClass === 'absent' ? 'absent'
    : wantedClass === 'branch' ? pick(next, BRANCH_KINDS)
      : pick(next, LEAF_KINDS);
  const parent = [];
  if (depth >= 1) {
    parent.push(pick(next, STRING_KEYS));
    if (depth === 2) {
      const second = kind === 'absent' ? pick(next, STRING_KEYS) : pick(next, SEGMENTS);
      store.write([parent[0]], 'mem', typeof second === 'number' ? [0, 0] : {});
      parent.push(second);
    }
    if (kind !== 'absent') store.write(parent, 'mem', freshValue(kind));
  }
  return { parent, kind, depth };
}

/**
 * THE DISCRIMINATOR, READ INDEPENDENTLY OF THE RULE UNDER TEST: `readLiteral` at the parent with the tier
 * argument OMITTED (`PIN-2` (ii)). Three answers and no fourth: `ReadTargetIsBranch` (a branch), a value (a
 * leaf), `AddressNotFound` (absent).
 */
function parentAnswer(store, parent) {
  try {
    return { threw: false, value: store.readLiteral(parent) };
  } catch (err) {
    return { threw: true, status: err && err.status, message: err && err.message };
  }
}

/** The `id`s an instance carries, in registration sequence (`D-39`; `guide §7.4`). */
const namedIds = (store) => store.constraints().map((pair) => pair.id);

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SCRI-1` — THE PARENT DECIDES, NOT THE ADDRESS, AND IT DECIDES BY RESOLVING
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('scri_prop_P_SCRI_1_the_pair_is_asked_exactly_when_its_parent_resolves', (t) => {
  // **PROPERTY.** `∀` generated in-domain address `A` (depth `1`–`3`) and `∀` generated store state `S`: a pair
  // at `A` is ASKED at the instant that populates it (`addConstraint`) **iff** the parent `A` minus its last
  // segment RESOLVES against `S` — as a `Node::Branch`, as a `Node::Leaf`, or as the register, which always
  // resolves to a container — **and is NOT asked iff the parent does NOT resolve (`AddressNotFound`)**.
  // (`PIN-2` (i)(ii)(iv) as amended by `D-96` (1)–(3); `guide §7.2` (2).)
  //
  // **GENERATOR.** The parent's CLASS is rotated deterministically across the budget — register, branch, leaf,
  // absent — so every arm and both halves of the falsifier occur; the parent's depth (`0`–`2`), every key and
  // index of it, the six-variant value written at it, and the pair's own last segment are drawn from the PRNG
  // under seed `0x5C4101`. 40 cases.
  //
  // **FALSIFIER.** A pair asked with an ABSENT parent, **or a pair SKIPPED with a parent that RESOLVES — the
  // LEAF arm being the case a "not a container" reading gets wrong** (`D-96` (1)–(2); `verification.md §2.1`
  // `G3-08` (i); that unit's `G3-13`).
  const CLASSES = ['register', 'branch', 'leaf', 'absent'];
  const result = runProperty({
    row: 'verification.md §3 · P-SCRI-1',
    seed: SEEDS['P-SCRI-1'],
    cases: 40,
    body: (next, i, draw, arms) => {
      const wantedClass = CLASSES[i % CLASSES.length];
      const store = make();
      const { parent, kind } = buildState(store, next, wantedClass);
      const address = [...parent, pick(next, SEGMENTS)];
      Object.assign(draw, { parentClass: wantedClass, parent, kind, address });

      // ── THE DISCRIMINATOR, READ AT ITS OWN BYTES AND BEFORE THE RULE IS DRIVEN.
      const answer = parentAnswer(store, parent);
      draw.parentAnswer = answer.threw ? answer.status : { value: answer.value };
      const resolves = wantedClass !== 'absent';
      // **THE THREE ANSWERS, AND THE ONE THAT IS NOT A REFUSAL OF THE PARENT'S KIND**: `readLiteral` THROWS
      // `ReadTargetIsBranch` at a branch and `AddressNotFound` where nothing stands, and ANSWERS A VALUE at a
      // leaf. So "the parent does not resolve" is one of the two THROWING arms, and reading the two apart is
      // what the discriminator's whole argument rests on (`PIN-2` (ii); `sites §3.1` item 6).
      const parentDoesNotResolve = answer.threw && answer.status === 'AddressNotFound';
      assert.equal(parentDoesNotResolve, !resolves,
        `P-SCRI-1 ${JSON.stringify(draw)}: the parent ${JSON.stringify(parent)} RESOLVES where its class says it does and answers \`AddressNotFound\` where it is absent (PIN-2 (ii); D-96 (1))`);
      if (!resolves) {
        assert.equal(answer.status, 'AddressNotFound',
          `P-SCRI-1 ${JSON.stringify(draw)}: the absent arm is \`AddressNotFound\` and no other (PIN-2 (ii), second arm)`);
      } else if (wantedClass === 'branch' || wantedClass === 'register') {
        assert.equal(answer.threw, true,
          `P-SCRI-1 ${JSON.stringify(draw)}: a container does not ANSWER the leaf read, it refuses it with its own status (PIN-2 (ii), first arm)`);
        assert.equal(answer.status, 'ReadTargetIsBranch',
          `P-SCRI-1 ${JSON.stringify(draw)}: and that status is \`ReadTargetIsBranch\` (PIN-2 (ii), first arm)`);
      } else {
        assert.equal(answer.threw, false,
          `P-SCRI-1 ${JSON.stringify(draw)}: a LEAF ANSWERS — the third answer, and the arm D-96 (3) inverts (PIN-2 (ii))`);
        assert.deepEqual(answer.value, freshValue(kind),
          `P-SCRI-1 ${JSON.stringify(draw)}: and it answers its own value (PIN-2 (ii) as D-96 (3) inverts it)`);
      }

      // ── THE PROPERTY ITSELF.
      let asked = 0;
      const added = attempt(() => store.addConstraint({ address, id: 'p1-' + i }, () => { asked += 1; return true; }));
      draw.asked = asked;
      assert.equal(added.threw, false,
        `P-SCRI-1 ${JSON.stringify(draw)}: a well-formed pair is registered and carried whatever its parent's state (PIN-4 (i); D-90 (3))`);
      assert.equal(asked, resolves ? 1 : 0,
        `P-SCRI-1 ${JSON.stringify(draw)}: THE PARENT DECIDES — asked once where it resolves and NOT AT ALL where it does not (PIN-2 (ii); D-96 (1); the row's falsifier)`);
      assert.deepEqual(namedIds(store), ['p1-' + i],
        `P-SCRI-1 ${JSON.stringify(draw)}: and the pair is named by \`constraints()\` in BOTH arms (PIN-4 (i))`);
      tally(arms, wantedClass);
    },
  });

  if (result.failures.length > 0) t.diagnostic('P-SCRI-1 · THE GENERATED INPUTS THAT FAILED:\n' + JSON.stringify(result.failures, null, 2));
  // **THE FALSIFIER IS REACHABLE, AND THIS IS HOW IT IS KNOWN**: every arm occurred, so an inversion of ANY
  // one arm — the leaf-as-skip reading above all — fails at least one generated case in this very run.
  for (const wantedClass of CLASSES) {
    assert.ok(result.arms[wantedClass] > 0,
      `P-SCRI-1: the generator must reach the \`${wantedClass}\` arm — an arm never reached is a falsifier that could not fire (read ${JSON.stringify(result.arms)})`);
  }
  assert.deepEqual(result.failures, [],
    `P-SCRI-1 held over ${result.cases} generated cases (seed 0x${(result.seed >>> 0).toString(16)})`);

  t.diagnostic(`SCRI-P1 · P-SCRI-1 held over ${result.cases} generated cases, seed 0x${(result.seed >>> 0).toString(16)}: `
    + `parent arms reached ${JSON.stringify(result.arms)}. The discriminator's three answers were read at \`readLiteral\` with the tier `
    + `omitted, and the ask-count is 1 where the parent resolves and 0 where it does not — including the LEAF arm, `
    + `which the withdrawn "not a container" reading made a skip (PIN-2 (ii); D-96 (1)-(3); verification.md §3 P-SCRI-1).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SCRI-2` — A SKIP IS INERT
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('scri_prop_P_SCR2_a_skip_runs_nothing_names_nothing_and_changes_no_act_outcome', (t) => {
  // **PROPERTY.** `∀` generated list and `∀` generated state: the set of instants at which a pair's body runs
  // is UNCHANGED by the pair's presence in the list when its parent does not resolve — the pair is asked zero
  // times, no `log` entry names it, and **the act that would have asked it answers EXACTLY what it answers
  // with the pair absent**. (`PIN-3`; `D-90` (2); `verification.md §3` `P-SCRI-2`.) **And the malformed LIST is
  // still refused at construction, under the shape arm alone, so that a list's other arms cannot be read as
  // inertness either** (`PIN-5` (ii); `guide §7.2` (5); `sites §3` row 9).
  //
  // **GENERATOR.** Three list modes rotated deterministically across the budget — a WELL-FORMED list whose
  // skipped pair is followed by a passing act, a WELL-FORMED list whose skipped pair is followed by a pair
  // that refuses at a LANDING, and a MALFORMED list (its malformed shape rotated across the four `PIN-5` (ii)
  // leaves) — with the skipped pair's absent parent, the act's address, and the value each act writes drawn
  // from the PRNG under seed `0x5C4102`. 30 cases.
  //
  // **FALSIFIER.** ANY entry, ANY status, or ANY act outcome that differs from the control store that carries
  // the same state and the same list MINUS the skipped pair; and an ask of the skipped body.
  const MODES = ['inert-act', 'inert-log', 'malformed'];
  const MALFORMED_SHAPES = ['address-not-a-segment-array', 'id-not-a-string', 'duplicate-id', 'cross-kind-collision'];
  const VALUE_KINDS = ['number', 'string', 'boolean', 'emptyObject', 'object', 'array'];

  // **A PARENT THAT DOES NOT RESOLVE, AND THE PREFIX THE STATE STILL NEEDS.** The pair's parent is left
  // unwritten on purpose; its own parent is written as a container where the depth needs one, so the case
  // exercises an ABSENT node under a STANDING one and not a whole absent subtree.
  const absentParent = (next) => {
    const depth = intBetween(next, 1, 2);
    const parent = [pick(next, STRING_KEYS)];
    const prefix = typeof parent[0] === 'number' ? [] : {};
    if (depth === 2) parent.push(pick(next, SEGMENTS));
    return { parent, prefix, depth };
  };
  const seedPrefix = (store, { parent, prefix, depth }) => {
    if (depth === 2) store.write([parent[0]], 'mem', typeof parent[1] === 'number' ? [] : prefix);
  };

  const result = runProperty({
    row: 'verification.md §3 · P-SCRI-2',
    seed: SEEDS['P-SCRI-2'],
    cases: 30,
    body: (next, i, draw, arms) => {
      const mode = MODES[i % MODES.length];
      const valueKind = pick(next, VALUE_KINDS);
      const state = absentParent(next);
      const skipAddress = [...state.parent, pick(next, SEGMENTS)];
      Object.assign(draw, { mode, skipAddress, parent: state.parent, valueKind });

      if (mode === 'inert-act') {
        // ── THE SKIPPED PAIR PRESENT, AND AN ACT AT AN ADDRESS IT NEITHER STANDS AT NOR UNDER.
        const written = freshValue(valueKind);
        draw.act = { address: ['act'], written };
        let skipAsked = 0;
        const withSkip = make();
        seedPrefix(withSkip, state);
        withSkip.addConstraint({ address: skipAddress, id: 'skipped-pair' }, () => { skipAsked += 1; return { message: 'this body must never run' }; });
        const control = make();
        seedPrefix(control, state);

        const one = attempt(() => withSkip.write(['act'], 'mem', written));
        const two = attempt(() => control.write(['act'], 'mem', written));
        const projection = (outcome, store) => {
          if (outcome.threw) {
            const caught = plainRefusal(outcome.value, 'the act\'s refusal');
            return { threw: true, status: caught.status, message: caught.message, kinds: caught.log.map((entry) => entry.kind), ids: caught.log.map((entry) => entry.id) };
          }
          const readBack = attempt(() => store.read(['act']));
          return { threw: false, after: outcome.value.op.after, triggered: outcome.value.triggered.map((pair) => pair.handle), read: readBack.threw ? readBack.value.status : readBack.value };
        };
        const withSkipAnswer = projection(one, withSkip);
        const controlAnswer = projection(two, control);
        draw.withSkipAnswer = withSkipAnswer;
        draw.controlAnswer = controlAnswer;

        assert.equal(skipAsked, 0,
          `P-SCRI-2 ${JSON.stringify(draw)}: the skipped pair's body must not run — its parent does not resolve (PIN-3; D-90 (2))`);
        assert.deepEqual(withSkipAnswer, controlAnswer,
          `P-SCRI-2 ${JSON.stringify(draw)}: THE ACT ANSWERS EXACTLY WHAT IT ANSWERS WITH THE PAIR ABSENT — the skip is inert (the row's falsifier)`);
        assert.deepEqual(namedIds(withSkip).sort(), ['skipped-pair'],
          `P-SCRI-2 ${JSON.stringify(draw)}: and the pair is CARRIED, so its inertness is not its absence (PIN-4 (i))`);
        tally(arms, 'inert-act');
        return;
      }

      if (mode === 'inert-log') {
        // ── THE SKIPPED PAIR PRESENT BESIDE A PAIR THAT REFUSES THE ACT AT ITS LANDING, AND THE LOG COMPARED.
        // The refuser passes at its own registration (`context.op === null` is the registration instant's
        // spelling, `clause-context §1.1`) and refuses every later ask, so the act's refusal is the one the
        // two stores can be compared on.
        const gate = (context) => (context.op === null ? true : { message: 'the act is not one this pair admits' });
        let skipAsked = 0;
        const withSkip = make();
        seedPrefix(withSkip, state);
        withSkip.addConstraint({ address: skipAddress, id: 'skipped-pair' }, () => { skipAsked += 1; return { message: 'this body must never run' }; });
        withSkip.addConstraint({ address: ['act'], id: 'gate' }, gate);
        const control = make();
        seedPrefix(control, state);
        control.addConstraint({ address: ['act'], id: 'gate' }, gate);

        const written = freshValue(valueKind);
        draw.act = { address: ['act'], written };
        const one = attempt(() => withSkip.write(['act'], 'mem', written));
        const two = attempt(() => control.write(['act'], 'mem', written));
        assert.equal(one.threw, true, `P-SCRI-2 ${JSON.stringify(draw)}: the gate pair refuses the act's landing (PIN-2 (iii); guide §7.6)`);
        assert.equal(two.threw, true, `P-SCRI-2 ${JSON.stringify(draw)}: and it refuses it in the control store too`);
        const withSkipRefusal = plainRefusal(one.value, 'the act\'s refusal where the skip stands');
        const controlRefusal = plainRefusal(two.value, 'the act\'s refusal in the control store');
        const census = (refusal) => ({ status: refusal.status, message: refusal.message, kinds: refusal.log.map((entry) => entry.kind), ids: refusal.log.map((entry) => entry.id) });
        draw.withSkipCensus = census(withSkipRefusal);
        draw.controlCensus = census(controlRefusal);

        assert.equal(skipAsked, 0, `P-SCRI-2 ${JSON.stringify(draw)}: the skipped body did not run (PIN-3)`);
        assert.deepEqual(census(withSkipRefusal), census(controlRefusal),
          `P-SCRI-2 ${JSON.stringify(draw)}: the act answers EXACTLY what it answers with the pair absent — same status, same sentence, same entries (the row's falsifier)`);
        for (const entry of withSkipRefusal.log) {
          assert.notEqual(entry.id, 'skipped-pair',
            `P-SCRI-2 ${JSON.stringify(draw)}: NO log entry names the skipped pair (PIN-3; guide §8.0a :1401)`);
        }
        tally(arms, 'inert-log');
        return;
      }

      // ── THE MALFORMED LIST: THE SHAPE ARM ALONE, AND NOTHING RAN.
      const shapeIndex = Math.floor(i / MODES.length) % MALFORMED_SHAPES.length;
      const shape = MALFORMED_SHAPES[shapeIndex];
      draw.shape = shape;
      let skipAsked = 0;
      const skipElement = { address: skipAddress, id: 'skipped-pair', constraint: () => { skipAsked += 1; return true; } };
      let listeners = [];
      let list;
      if (shape === 'address-not-a-segment-array') {
        list = [{ address: 'not-a-segment-array', id: 'malformed', constraint: () => true }, skipElement];
      } else if (shape === 'id-not-a-string') {
        list = [{ address: ['fine'], id: 7, constraint: () => true }, skipElement];
      } else if (shape === 'duplicate-id') {
        list = [
          { address: ['fine'], id: 'twice', constraint: () => true },
          { address: ['also-fine'], id: 'twice', constraint: () => true },
          skipElement,
        ];
      } else {
        listeners = [{ address: ['l'], handle: 'shared-handle' }];
        list = [{ address: ['fine'], id: 'shared-handle', constraint: () => true }, skipElement];
      }
      draw.list = list.map((element) => ({ address: element.address, id: element.id }));
      draw.listeners = listeners;

      const built = attempt(() => make({ listeners, constraints: list }));
      assert.equal(built.threw, true, `P-SCRI-2 ${JSON.stringify(draw)}: a MALFORMED list is refused at construction (PIN-5 (ii); guide §7.2 (5))`);
      const caught = plainRefusal(built.value, 'the malformed list');
      assert.equal(caught.status, 'ConstraintListInvalid',
        `P-SCRI-2 ${JSON.stringify(draw)}: the shape arm answers \`ConstraintListInvalid\`, rank 16 (PIN-5 (ii)(iii))`);
      assert.deepEqual(caught.log, [], `P-SCRI-2 ${JSON.stringify(draw)}: and carries \`log: []\` — no evaluation was entered (sites §3 row 9)`);
      assert.equal(caught.address, null, `P-SCRI-2 ${JSON.stringify(draw)}: a list's validation names no act at an address (D-77)`);
      assert.equal(skipAsked, 0, `P-SCRI-2 ${JSON.stringify(draw)}: and the skipped element's body never ran either (PIN-3)`);
      tally(arms, 'malformed-' + shape);
    },
  });

  // **THE FALSIFIER IS REACHABLE, AND THIS IS HOW IT IS KNOWN**: all three modes and all four malformed shapes
  // occurred, so the inertness comparison ran on both a passing and a refusing act, and the shape arm was
  // driven at each of its four declared leaves.
  for (const name of ['inert-act', 'inert-log', ...MALFORMED_SHAPES.map((shape) => 'malformed-' + shape)]) {
    assert.ok(result.arms[name] > 0,
      `P-SCRI-2: the generator must reach \`${name}\` — an arm never reached is a falsifier that could not fire (read ${JSON.stringify(result.arms)})`);
  }
  if (result.failures.length > 0) t.diagnostic('P-SCRI-2 · THE GENERATED INPUTS THAT FAILED:\n' + JSON.stringify(result.failures, null, 2));
  assert.deepEqual(result.failures, [],
    `P-SCRI-2 held over ${result.cases} generated cases (seed 0x${(result.seed >>> 0).toString(16)})`);

  t.diagnostic(`SCRI-P2 · P-SCRI-2 held over ${result.cases} generated cases, seed 0x${(result.seed >>> 0).toString(16)}: `
    + `list arms reached ${JSON.stringify(result.arms)}. On every arm the skipped pair's body ran zero times, `
    + `no crossed log named it, and the act equalled its own control answer member for member (PIN-3; D-90 (2)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SCRI-3` — THE CREDIT, CORRECTED AT A REGISTRATION: MEMBERSHIP ALONE, AND THE RE-RUN DECIDES
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('scri_prop_P_SCR3_the_credit_at_a_registration_is_the_membership_ground_alone', (t) => {
  // **PROPERTY, AS `PIN-7` (ii) GIVES IT — AND `verification.md §3`'s PRINTED ROW IS REPORTED IN THE
  // DIAGNOSTIC BELOW AND NOT ENCODED HERE.** `∀` generated repair return `R` over the closed two-arm set
  // crossed with the three op provenances: **`R` is CREDITED iff it is the repairable arm `{ok: true, op}`
  // carrying an op not already held by the synthetic attempt — and at a registration the synthetic attempt
  // holds NOTHING, so the membership ground refuses nothing and the identity's PROVENANCE is not a test at
  // all. A credited return starts the RE-RUN over the op it names (`D-94` (1); `PIN-7` (iii)), AND THE RE-RUN'S
  // OWN VERDICT IS WHAT DECIDES THE REGISTRATION'S STANDING.** A return outside that arm is not credited: the
  // pair is not re-run and the registration refuses at rank `19`.
  //
  // **GENERATOR.** Five return shapes rotated deterministically across the budget — `own`, `inherited`,
  // `forged`, `{ok: true}` with no `op`, and `{ok: false, message}` — crossed with the re-run's own verdict
  // (`admit` / `refuse`), with the earlier act's address and value and the route's landed value drawn from the
  // PRNG under seed `0x5C4103`. 40 cases, so every one of the ten combinations occurs at least four times.
  //
  // **FALSIFIER.** A return credited without an op the invocation's own route landed — **which is the ROW's
  // falsifier and is REACHED here: the `forged` and `inherited` arms are exactly that return, and this cell
  // asserts the credit (the ask-count of `2`) and the re-run's verdict rather than a refusal by provenance.**
  // The other half fires too: a `{ok: true, op}` return that is NOT re-run, and a return outside the arm that
  // IS re-run, both fail.
  const SHAPES = ['own', 'inherited', 'forged', 'no-op', 'declined'];
  const VERDICTS = ['admit', 'refuse'];
  const CREDITED = { own: true, inherited: true, forged: true, 'no-op': false, declined: false };

  const result = runProperty({
    row: 'verification.md §3 · P-SCRI-3 (as corrected by PIN-7 (ii))',
    seed: SEEDS['P-SCRI-3'],
    cases: 40,
    body: (next, i, draw, arms) => {
      const shape = SHAPES[i % SHAPES.length];
      const verdict = VERDICTS[Math.floor(i / SHAPES.length) % VERDICTS.length];
      const earlierValue = freshValue(pick(next, ['number', 'string', 'boolean', 'emptyObject', 'object', 'array']));
      const landedValue = pick(next, [7, 11, 12]);
      Object.assign(draw, { shape, verdict, earlierValue, landedValue });

      const store = make();
      // **THE EARLIER ACT — an op THIS STORE landed, and NOT during the repair's own invocation.** It is the
      // `inherited` provenance, and it stands before the registration so its membership cannot be confused
      // with the route's own landing.
      const earlier = store.write(['earlier'], 'mem', earlierValue);
      draw.earlierOpId = earlier.op.opId;

      const asks = [];
      const drive = attempt(() => store.addConstraint({ address: ['q'], id: 'p3-' + i }, (context) => {
        asks.push({ opIsNull: context.op === null, valueClass: context.value === undefined ? 'absent' : typeof context.value });
        if (context.op !== null) {
          return verdict === 'admit' ? true : { message: 'the re-run refuses the state it was handed' };
        }
        return {
          message: 'the pair judges the absence of its own key',
          repair: (repairRecord) => {
            const landed = repairRecord.write(['q'], 'mem', landedValue);
            if (shape === 'own') return { ok: true, op: landed.op };
            if (shape === 'inherited') return { ok: true, op: earlier.op };
            if (shape === 'forged') return { ok: true, op: { opId: 'an-op-identity-this-store-never-landed' } };
            if (shape === 'no-op') return { ok: true };
            return { ok: false, message: 'declined, and the op I landed is mine to keep' };
          },
        };
      }));

      const credited = CREDITED[shape];
      const caught = drive.threw ? plainRefusal(drive.value, 'the registration refusal') : null;
      draw.asked = asks.length;
      draw.asks = asks;
      draw.status = caught === null ? 'stood' : caught.status;

      // ── THE CREDIT, READ AT THE ONE OBSERVABLE THAT SEPARATES IT: a credited repair is RE-RUN.
      assert.equal(asks.length, credited ? 2 : 1,
        `P-SCRI-3 ${JSON.stringify(draw)}: a \`{ok: true, op}\` return is CREDITED — the membership ground stands alone and the attempt holds nothing — so the re-run RUNS; a return outside that arm is NOT credited and is not re-run (PIN-7 (ii); D-94 (1))`);
      assert.equal(asks[0].opIsNull, true,
        `P-SCRI-3 ${JSON.stringify(draw)}: the first ask is the registration instant's, whose \`op\` is absent and spelled \`null\` (clause-context §1.1)`);
      if (credited) {
        assert.equal(asks[1].opIsNull, false,
          `P-SCRI-3 ${JSON.stringify(draw)}: the re-run evaluates the pair AGAINST THE OP THE RETURN NAMED (PIN-7 (iii))`);
      }

      // ── THE STANDING IS THE RE-RUN'S, AND NEVER THE IDENTITY'S PROVENANCE.
      if (!credited) {
        assert.notEqual(caught, null,
          `P-SCRI-3 ${JSON.stringify(draw)}: an uncredited return fails the registration (PIN-7 (ii); guide §7.6)`)
        ;
        assert.equal(caught.status, 'ConstraintRefusedAtRegistration',
          `P-SCRI-3 ${JSON.stringify(draw)}: at rank \`19\`, the registration verdict (guide §8.1)`);
      } else {
        assert.equal(caught === null, verdict === 'admit',
          `P-SCRI-3 ${JSON.stringify(draw)}: THE RE-RUN DECIDES THE REGISTRATION — it STANDS where the re-run admits and REFUSES where the re-run does not, whatever identity the return named (PIN-7 (iii); D-94 (1)-(3); the corrected reading)`);
        if (caught !== null) {
          assert.equal(caught.status, 'ConstraintRefusedAtRegistration',
            `P-SCRI-3 ${JSON.stringify(draw)}: and that refusal is rank \`19\` (guide §8.1; D-96 (4))`);
        }
      }

      // ── AND A FAILED REGISTRATION LEAVES THE ROUTE'S LANDING STANDING.
      assert.deepEqual(store.read(['q']), landedValue,
        `P-SCRI-3 ${JSON.stringify(draw)}: a write the route landed before a refusal STANDS — the registration composes no rollback (PIN-7 (iv))`);
      assert.deepEqual(namedIds(store), caught === null ? ['p3-' + i] : [],
        `P-SCRI-3 ${JSON.stringify(draw)}: a refused registration leaves the entry as it stood (index.d.ts, constraints())`);
      tally(arms, `${shape}/${verdict}`);
    },
  });

  // **THE FALSIFIER IS REACHABLE, AND THIS IS HOW IT IS KNOWN**: every one of the ten combinations occurred,
  // and the two the ROW cannot express — `forged/admit` and `inherited/admit`, where the registration STANDS on
  // a return naming an op the invocation never landed — are asserted directly. A run in which either were
  // absent would fail this closing check rather than pass quietly.
  for (const shape of SHAPES) {
    for (const verdict of VERDICTS) {
      const name = `${shape}/${verdict}`;
      assert.ok(result.arms[name] > 0,
        `P-SCRI-3: the generator must reach \`${name}\` — an arm never reached is a falsifier that could not fire (read ${JSON.stringify(result.arms)})`);
    }
  }
  if (result.failures.length > 0) t.diagnostic('P-SCRI-3 · THE GENERATED INPUTS THAT FAILED:\n' + JSON.stringify(result.failures, null, 2));
  assert.deepEqual(result.failures, [],
    `P-SCRI-3 held over ${result.cases} generated cases (seed 0x${(result.seed >>> 0).toString(16)})`);

  t.diagnostic(`SCRI-P3 · P-SCRI-3 held over ${result.cases} generated cases, seed 0x${(result.seed >>> 0).toString(16)}: `
    + `return arms reached ${JSON.stringify(result.arms)}. The credit was read at the pair's ask-count (2 where the return is `
    + `\`{ok: true, op}\` and 1 where it is not), and the registration's standing was read at the re-run's own verdict. `
    + `FINDING, REPORTED AND NOT ENCODED: verification.md §3's P-SCRI-3 row reads *"the registration stands only if R's own `
    + `op member is a WriteRecord.op this store landed during R's own invocation and is not already held by the synthetic `
    + `attempt"* — FALSE AT A REGISTRATION on both halves: the attempt holds nothing, so the membership ground never refuses, `
    + `and a forged or inherited identity is CREDITED and can leave the registration STANDING (the forged/admit and `
    + `inherited/admit arms above). The true rule is PIN-7 (ii): the credit is the membership ground alone, and the RE-RUN `
    + `over the op the return names is what decides (PIN-7 (iii); D-94 (1)-(3)).`);
});
