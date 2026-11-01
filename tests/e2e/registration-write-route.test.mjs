// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE WRITE ROUTE A REPAIR MAY TAKE AT A REGISTRATION INSTANT — `U-STOREROOM-CONSTRAINT-REGISTRATION-INSTANT`'s
// SUBJECT TWO, its gate-3 cells `G3-20`…`G3-27` (`verification.md §2.2`), written from
// `docs/specs/storeroom-constraint-registration-instant/contract.md` `§2`'s `PIN-6`, `PIN-7`, `PIN-8` and `§8`'s
// answered questions — and from NOTHING ELSE. **NO CELL HERE IS WRITTEN FROM THE IMPLEMENTATION**: each states
// what the contract REQUIRES and fails against this tree wherever the tree does not yet do it.
//
// **THE RULING THE PINS CARRY** (`strata/decisions.md` · `D-91`, the architect, verbatim): ***"Give the
// registration instant a lawful write route."*** — and the three requirements it puts on the route: *"A body or a
// repair invoked at a registration instant must be able to write, and that write must join the registration's own
// commit … must land, and must be creditable by the same rule every repair's return is."*
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE ROUTE, AS THE PINS DECLARE IT — the six facts every cell below rests on
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **1 · THE CARRIER IS THE REPAIR'S OWN RECORD, AND THE MEMBER'S SPELLING IS `write`** (`PIN-6` (i), (ii)).
// The registration instant's repair record gains ONE member — `write`, a FUNCTION — and **the constraint body's
// five-member evaluation context is UNMOVED and gains nothing at any instant** (`D-92` (1): the route is *"the
// repair's own record and by nothing else"*; `D-93` (1): a body's direct write is *"UNSUPPORTED"* and this unit
// presents it as supported NOWHERE — no cell here drives a body's write, and `G3-25` asserts the body's record
// carries no such member at either instant). **`G3-25` is the census at all four records.**
//
// **2 · THE POSITIONS ARE EXACTLY THE STORE'S `write`'S FIRST THREE — `(address, tier, value)` — AND A SUPPLIED
// FOURTH IS REFUSED BY THIS UNIT'S OWN CLASS TEST** (`PIN-6` (iii)): **a `TypeError` whose `status` member is
// ABSENT and which carries NO `log` member**, thrown unwrapped, **before any store act**, and **nothing lands on
// a refused call**. **The refusal is NOT the commit position's**: that position's own test ACCEPTS any object
// carrying an own present `pending` (`delivery.mjs:27`-`:54`), **which is exactly the record a repair holds**, so
// re-using it would accept the call the pin forbids. `G3-24` drives five fourth-position spellings, **a lawful
// `CommitRecord` INCLUDED** — the very record the store's own test accepts.
//
// **3 · THE ROUTE ANSWERS THE STORE'S OWN `WriteRecord` — `{op, watched, triggered}` — AND IT CONVERTS
// NOTHING** (`PIN-6` (iv)): a refusal **crosses unconverted and uncaught, in the store's own form**
// (`WriteParentNotLink`, `AddressNotFound`, `AddressMalformed`, the boundary's own `ValueRefusedAtBoundary`),
// **and the route mints no code**. `G3-24`'s second half reads three of those codes raw at the route's own return.
//
// **4 · THE WRITE JOINS THE REGISTRATION'S OWN COMMIT AND CREDITS THE EXISTING WAY** (`PIN-7`). The route NAMES
// the registration's own `CommitRecord` — the record the repair's context already carries at its `pending` — and
// the caller cannot name another, which is what (2)'s arity refusal secures. **Where a commit window stands
// (`addConstraint`, the re-arm) the write JOINS it and opens nothing; where none stands for the caller
// (construction, a boot) the call opens the window its own write needs and releases it on every arm.** And a
// repair's route-write **is credited iff the repair RETURNS `{ok: true, op: <the record's own `op`>}`** and that
// op is not already held by the attempt (`landedOp`, called with the invoked-for op `null`). `G3-21` reads the
// join's two figures at `addConstraint` and the credit's identity; `G3-23` reads the four return arms; `G3-20`
// reads the construction instant, where the caller holds nothing.
//
// **5 · THE ROUTE RUNS NO PASS OF ITS OWN** (`PIN-6` (v)): the write **appends no `constraint-check` entry, no
// `outcome` entry and no terminal act, delivers no listener, and opens no attempt** — it is judged by the
// registration's own re-run over the op it landed. **Observable: the census of the `log` a refusal crosses with
// is unchanged by the route's write.** `G3-22` is that census, with a WATCHER pair and a live listener beside it.
//
// **6 · A FAILED REGISTRATION LEAVES THE ROUTE'S LANDINGS STANDING** (`PIN-7` (iv)): *"the registration instant
// composes no rollback, so a write the route landed before a refusal STANDS"* — and the pin **forbids gate 3 from
// adding one**. `G3-26` is that arm.
//
// **AND `D-95` DECIDES WHAT THE RECORD'S `value` MEANS ONCE A WRITE IS POSSIBLE THERE**: it is the value read at
// the instant the record was BUILT — read once, before the invocation, **not re-read after any write** — so
// `G3-20`'s first reading is `undefined` and its second (the RE-RUN over the landed op) carries the repair's
// state, **and no cell here expects the in-flight record to refresh**.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE INSTRUMENTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **`D-17`.** No cell opens a document at runtime: the expectation is a literal here and the citation is a
// comment. **The instruments are the ones `verification.md §2` names** — the same instruments
// `tests/e2e/registration-repair-existence.test.mjs` and `tests/e2e/repair-in-commit.test.mjs` already use:
// `storeCreate` from the entry by PATH (this project's `O4` route), `openCommits` from
// `bindings/js/src/entry/state.mjs` (the count a commit window lives in), `kernelFor` from
// `bindings/js/src/entry/kernel-foundations.mjs` (the kernel's `live` map), `report` from
// `bindings/js/src/constraint-kernel.mjs` (`K-5`'s closed attempt report, whose `ops` carry the credited op), and
// the `Symbol.for('provident-storeroom.attempt-opened')` channel, **which catches an OPENING at its own instant
// rather than inferring one from a later count**.
//
// **D-21.** Every cell prints its readings at its own `t.diagnostic` and **asserts its own drive's coherence
// BEFORE it reports a verdict**; `attempt()` wraps an ACT whose outcome IS the subject and hands the thrown value
// back as a value (both siblings' shape) — **never an assertion**, and there is no `skip` and no `try`/`catch`
// with an empty body anywhere in this file. **Where a cell cannot reach its arm, it fails at the act and prints
// the refusal it caught**, rather than passing vacuously over an arm it never drove.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { report as kernelReport } from '../../bindings/js/src/constraint-kernel.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';

/** The store's own closed status set at the three members these cells read: rank `19` the registration's
 *  refusal, rank `2` the walk's absence, `AddressMalformed` (rank `1`) the tier/address position's and
 *  `WriteParentNotLink` (rank `5`) the leaf parent's. **`PIN-10`: no status is minted by this unit.** */
const REGISTRATION_REFUSED = 'ConstraintRefusedAtRegistration';
const ADDRESS_NOT_FOUND = 'AddressNotFound';
const ADDRESS_MALFORMED = 'AddressMalformed';
const WRITE_PARENT_NOT_LINK = 'WriteParentNotLink';

/** **THE BODY'S FIVE-MEMBER EVALUATION CONTEXT, SORTED** (`kernel-registration.mjs:345`-`:356`) — UNMOVED at
 *  both instants (`PIN-8` (iii) (a); `D-92` (1)). */
const CONTEXT_MEMBERS = ['address', 'attempt', 'op', 'tier', 'value'];
/** **THE LANDING INSTANT'S SIX-MEMBER REPAIR RECORD, SORTED** (`kernel-attempt.mjs:756`-`:782`) — **UNMOVED and
 *  gains no route** (`PIN-8` (iii) (c); `sites.md §2`'s forbidden site). */
const LANDING_REPAIR_MEMBERS = ['address', 'id', 'op', 'pending', 'tier', 'value'];
/** **THE REGISTRATION INSTANT'S SEVEN-MEMBER REPAIR RECORD, SORTED** — the six above **plus the ONE member
 *  `PIN-6` (ii) declares, `write`** (`5 + 1 = 6` at the BODY, `6 + 1 = 7` at the REPAIR; `PIN-8` (iii) (b)). */
const REGISTRATION_REPAIR_MEMBERS = ['address', 'id', 'op', 'pending', 'tier', 'value', 'write'];
/** `PAR-JS-13` / `PIN-6` (iv): the record the route answers is the store's own — `{op, watched, triggered}`. */
const WRITE_RECORD_MEMBERS = ['op', 'triggered', 'watched'];
/** **THE COUNT'S OWN OBSERVER** (`§4.2` item 2: *"`observer` is a FUNCTION called once per commit that OPENS for
 *  that store"*) — the same `Symbol.for` key `state.mjs` installs and this drive reads. */
const ATTEMPT_OPENED = Symbol.for('provident-storeroom.attempt-opened');

/** The value a repair writes — nested on purpose, so a route that landed a shallow copy would fail a deep read. */
const WINDOW = { settings: { theme: 'dark' }, tabs: { landingPage: 'home' } };
/** The refusal sentences the bodies carry — `PAR-C-5`'s `{message}` half; their text is the drive's own. */
const ABSENT = 'the address this pair owns must exist';

const make = (extra = {}) => storeCreate({ journalLength: 256, listeners: [], ...extra });

/** Run `fn`; answer the thrown value as a value. Every drive here is synchronous, so this is total — and it is
 *  used ONLY where the OUTCOME of an act is the subject, never around an assertion. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** A refusal's `status` and `message` as a reading, or `null` where the act returned. */
const shapeOf = (caught) => (caught === null || caught === undefined
  ? { status: null, message: 'the act RETURNED' }
  : {
      status: caught !== null && typeof caught === 'object' ? caught.status ?? null : null,
      message: caught !== null && typeof caught === 'object' && typeof caught.message === 'string'
        ? caught.message
        : String(caught),
    });

/** **THE `log` CENSUS A REFUSAL CROSSES WITH** — the KINDS, in order (`PIN-6` (v): the route appends none), or
 *  `null` where the refusal carries no `log` at all. */
const logKinds = (caught) => (caught !== null && typeof caught === 'object' && Array.isArray(caught.log)
  ? caught.log.map((entry) => (entry !== null && typeof entry === 'object' ? entry.kind : entry))
  : null);

/** **A PAIR'S ADDRESS, READ AS A SET AND NEVER AS A SEQUENCE** (`ConstraintPair.address` is
 *  `Address | readonly Address[]`; the set-of-one encoding is not printed by the declaration). */
const addressSet = (address) => {
  const members = Array.isArray(address) && Array.isArray(address[0]) ? address : [address];
  return members.map((member) => member.join('/')).sort();
};

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-20` · THE DOWNSTREAM'S OWN CASE, END TO END
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-20 · THE DOWNSTREAM\'S OWN CASE, END TO END: a `cfg.constraints` element at `[\'window\']` whose body refuses on `undefined` and whose repair WRITES `[\'window\']` THROUGH THE ROUTE and returns `{ok: true, op: <the op it landed>}` — the construction RETURNS AN INSTANCE, `read([\'window\'])` is the repair\'s value, `constraints()` names the pair, and the body is asked TWICE: at the registration with `value === undefined` and at the re-run with the landed value', (t) => {
  // **THE SCENARIO THE UNIT WAS OPENED ON, IN THE ARCHITECT'S OWN TERMS** (`docs/specs/storeroom-constraint-
  // registration-instant-proposal-review.md`'s downstream report): *"User wants to enforce a constraint that a
  // given top-level register address must exist, with a repair that reconstructs it if missing … the repair
  // creates it automatically when the constraint is run on the store during its initial add."* **THE
  // CONSTRUCTION INSTANT IS WHERE THE CALLER HOLDS NO STORE AT ALL** (`sites.md §3`'s addendum: *"the
  // construction route has no external observer during the act"*), **so the only way the repair can write is the
  // record it is handed** — that is the whole of `D-91`'s requirement, and this cell is the end-to-end reading of
  // it. **TODAY THE REPAIR'S RECORD HAS NO `write` MEMBER (`sites.md §3.1` item 7: *"`typeof write ===
  // 'undefined'` on both"*), so the call below throws inside the repair and the registration refuses rank `19`
  // (`sites.md §3` row 2).**
  let routeMemberType = null;
  let routeRecordKeys = null;
  let routeOpId = null;
  let repairs = 0;
  const asks = [];
  const construction = attempt(() => make({
    constraints: [{
      address: ['window'],
      id: 'window-must-exist',
      constraint: (context) => {
        asks.push({ members: Object.keys(context).sort(), value: context.value });
        if (context.value !== undefined) return true;
        return {
          message: ABSENT,
          repair: (repairContext) => {
            repairs += 1;
            // **THE MEMBER `PIN-6` (ii) DECLARES, READ BEFORE IT IS CALLED** — so a tree without it fails at
            // the assertion below and not at an opaque `not a function` deep inside a repair.
            routeMemberType = typeof repairContext.write;
            // **THE ROUTE'S THREE POSITIONS**: `(address, tier, value)` — exactly the store's own first three.
            const answer = repairContext.write(['window'], 'mem', WINDOW);
            routeRecordKeys = Object.keys(answer).sort();
            routeOpId = answer.op.opId;
            // **THE CREDIT** (`PIN-7` (ii)): the op the route landed, returned as the repair's answer.
            return { ok: true, op: answer.op };
          },
        };
      },
    }],
  }));
  const constructionShape = shapeOf(construction.ok === true ? null : construction.caught);
  const standing = construction.ok === true ? attempt(() => construction.value.read(['window'])) : null;
  const rows = construction.ok === true ? construction.value.constraints() : [];

  // ── (a) THE MEMBER THE PIN DECLARES IS THERE, AND IT IS A FUNCTION. ───────────────────────────────────
  assert.equal(routeMemberType, 'function',
    `**THE REGISTRATION INSTANT'S REPAIR RECORD MUST CARRY \`write\` AND ITS VALUE MUST BE A FUNCTION** `
      + `(\`PIN-6\` (ii): *"The record's seventh member at a registration instant is named \`write\`, and its `
      + `value is a FUNCTION"*): the drive read typeof \`repairContext.write\` = `
      + `${JSON.stringify(routeMemberType)}. **TODAY'S TREE CARRIES SIX MEMBERS AND NO ROUTE** `
      + `(\`sites.md §3.1\` item 7)`);

  // ── (b) THE CONSTRUCTION STANDS — `D-91` (1): the timing does not move and the refusal stops surfacing. ─
  assert.equal(construction.ok, true,
    `**THE CONSTRUCTION MUST RETURN AN INSTANCE** — the repair's write makes the state its own body admits, and `
      + `\`D-91\` (ii) requires the route to *"land"* and to be *"creditable by the same rule every repair's `
      + `return is"*: the construction answered ${JSON.stringify(constructionShape.status)} with log `
      + `${JSON.stringify(logKinds(construction.caught))} and message `
      + `${JSON.stringify(constructionShape.message)}`);

  // ── (c) THE REPAIR RAN ONCE, ITS WRITE ANSWERED THE STORE'S OWN RECORD, AND THE VALUE STANDS. ─────────
  assert.equal(repairs, 1,
    `**THE REPAIR RUNS ONCE AT THE REGISTRATION** (\`kernel-registration.mjs:430\`-\`:497\`): ${repairs}`);
  assert.deepEqual(routeRecordKeys, WRITE_RECORD_MEMBERS,
    `**AND THE ROUTE ANSWERS THE STORE'S OWN \`WriteRecord\` — \`{op, watched, triggered}\`** (\`PIN-6\` (iv): `
      + `*"the very record \`write\` answers"*): it answered ${JSON.stringify(routeRecordKeys)}`);
  assert.notEqual(routeOpId, undefined,
    `and it carries the store's own op, which is what the repair returns as \`{ok: true, op}\`: `
      + `${JSON.stringify(routeOpId)}`);
  assert.equal(standing.ok, true,
    `**AND \`read(['window'])\` IS THE REPAIR'S VALUE** — the pass value of the whole scenario: the read threw `
      + `${JSON.stringify(shapeOf(standing.ok === true ? null : standing.caught))}`);
  assert.deepEqual(standing.value, WINDOW,
    `byte for byte what the repair wrote, subtree and all: ${JSON.stringify(standing.value)}`);

  // ── (d) TWO EVALUATIONS, NAMED — `D-95`'s consequence and `PIN-7` (iii)'s re-run. ──────────────────────
  assert.equal(asks.length, 2,
    `**THE BODY IS ASKED TWICE**: at the REGISTRATION, with \`value === undefined\`, and at the RE-RUN over the `
      + `op the route landed (\`PIN-7\` (iii); \`D-94\` (1): the re-run is unconditional): the drive recorded `
      + `${asks.length} ask(s): ${JSON.stringify(asks.map((ask) => ask.value))}`);
  assert.equal(asks[0].value, undefined,
    `**THE FIRST READING IS ABSENCE** — the value read at the instant the record was BUILT, and \`D-95\` (1) `
      + `keeps it there: *"read once, before the invocation, and NOT re-read after any write"*: it read `
      + `${JSON.stringify(asks[0].value)}`);
  assert.deepEqual(asks[1].value, WINDOW,
    `**AND THE SECOND IS THE RE-RUN'S, CARRYING THE STATE THE REPAIR LANDED** (\`D-95\` (4): *"the re-run's `
      + `context is where the pair meets the repair's state"*): it read ${JSON.stringify(asks[1].value)}`);
  for (const [index, ask] of asks.entries()) {
    assert.deepEqual(ask.members, CONTEXT_MEMBERS,
      `**AND THE BODY'S RECORD IS FIVE MEMBERS AT BOTH INSTANTS — UNMOVED, AND CARRYING NO \`write\`** `
        + `(\`PIN-8\` (iii) (a); \`D-92\` (1)): reading ${index} carried ${JSON.stringify(ask.members)}`);
  }
  assert.equal(rows.length, 1,
    `and \`constraints()\` names the pair (\`PIN-4\` (i)): ${JSON.stringify(rows)}`);
  assert.deepEqual(addressSet(rows[0].address), ['window'],
    `at the address it was registered at: ${JSON.stringify(addressSet(rows[0].address))}`);

  t.diagnostic(`G3-20 · THE DOWNSTREAM'S CASE: \`repairContext.write\` is a ${JSON.stringify(routeMemberType)}; `
    + `the construction answered ${JSON.stringify(constructionShape.status)} with the repair running ${repairs}×, `
    + `writing ${JSON.stringify(routeOpId)} and answering ${JSON.stringify(routeRecordKeys)}; `
    + `\`read(['window'])\` = ${JSON.stringify(standing.ok === true ? standing.value : null)}; the body was asked `
    + `${asks.length}× with ${JSON.stringify(asks.map((ask) => ask.value))} and the census `
    + `${JSON.stringify(asks.map((ask) => ask.members))}; \`constraints()\` = `
    + `${JSON.stringify(rows.map((row) => ({ address: addressSet(row.address), id: row.id })))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-21` · THE ROUTE'S WRITE JOINS THE REGISTRATION'S COMMIT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-21 · THE ROUTE\'S WRITE JOINS THE REGISTRATION\'S COMMIT: at `addConstraint` — where a commit window stands — `openCommits(store)` reads `1` at the repair\'s entry AND `1` on the route-write\'s return, the `attempt-opened` channel fires ZERO times across the route\'s write, and the op the route landed IS the op the synthetic attempt credits', (t) => {
  // **`PIN-7` (i)'s TWO ARMS ARE NOT A NUANCE** (`sites.md §3`'s addendum): *"a commit window STANDS when a pair
  // is evaluated at `addConstraint` and at a re-arm, and NONE stands at construction or at a boot"* — so here the
  // route's write **JOINS a window that already stands and opens nothing**, and a `2` at either reading is the
  // exact failure `D-46` reversed (`tests/e2e/repair-in-commit.test.mjs:148`-`:157` is the precedent's shape).
  // **AND THE CREDIT IS THE EXISTING RULE, POINTED AT** (`PIN-7` (ii)): the op the route landed must be the op
  // the synthetic attempt holds, which is what `K-5`'s report answers.
  const store = make();
  const asks = [];
  let routeMemberType = null;
  let attemptRef = null;
  let routeOp = null;
  let openingsAcrossTheRoute = 0;
  const windows = [];
  const add = attempt(() => store.addConstraint({ address: ['a'], id: 'a' }, (context) => {
    asks.push(context.value);
    // **THE RE-RUN'S OWN `AttemptRef`** — the synthetic attempt the registration mints, read where it is handed
    // out (`kernel-registration.mjs:601`); `K-5` is asked of it after the call returns.
    if (context.attempt !== null && context.attempt !== undefined) attemptRef = context.attempt;
    if (context.value !== undefined) return true;
    return {
      message: ABSENT,
      repair: (repairContext) => {
        routeMemberType = typeof repairContext.write;
        windows.push({ at: 'repair-entry', open: openCommits(store), live: kernelFor(store).live.size });
        // **THE OBSERVER IS ARMED AROUND THE ROUTE'S WRITE ALONE**, so the count is that call's and not the
        // enclosing `addConstraint`'s.
        const stop = store[ATTEMPT_OPENED](() => { openingsAcrossTheRoute += 1; });
        const answer = repairContext.write(['b'], 'mem', 99);
        stop();
        windows.push({ at: 'route-return', open: openCommits(store), live: kernelFor(store).live.size });
        routeOp = answer.op;
        return { ok: true, op: answer.op };
      },
    };
  }));
  const addShape = shapeOf(add.ok === true ? null : add.caught);
  const reported = attemptRef === null ? null : attempt(() => kernelReport(store, attemptRef));
  const ops = reported !== null && reported.ok === true && Array.isArray(reported.value.ops)
    ? reported.value.ops
    : null;
  const landed = attempt(() => store.read(['b']));
  const windowAt = (label) => windows.find((entry) => entry.at === label) ?? null;

  // ── (a) THE DRIVE REACHED ITS ARM. ────────────────────────────────────────────────────────────────────
  assert.equal(routeMemberType, 'function',
    `**THE REPAIR'S RECORD MUST CARRY THE ROUTE** (\`PIN-6\` (ii)): the drive read typeof `
      + `\`repairContext.write\` = ${JSON.stringify(routeMemberType)}`);
  assert.equal(windows.length, 2,
    `and the drive must have read the count on both sides of its own write: `
      + `${JSON.stringify(windows)}`);
  assert.equal(add.ok, true,
    `**THE REGISTRATION MUST STAND** — the route writes the state the re-run asks after, so the pair at `
      + `\`['a']\` is asked at the re-run with the op's landed value and passes (\`PIN-7\` (iii)): the call `
      + `answered ${JSON.stringify(addShape.status)} with log ${JSON.stringify(logKinds(add.caught))} and `
      + `message ${JSON.stringify(addShape.message)}`);

  // ── (b) THE JOIN: ONE WINDOW AT THE ENTRY AND ONE ON THE RETURN. ──────────────────────────────────────
  assert.equal(windowAt('repair-entry').open, 1,
    `**THE REPAIR IS ENTERED INSIDE \`addConstraint\`'S OWN COMMIT — the count is \`1\`** (\`PIN-7\` (i); the `
      + `\`openCommit\` census \`sites.md §3\`'s addendum carries: \`index.mjs:970\` is \`addConstraint\`'s `
      + `bracket): the entry read ${JSON.stringify(windowAt('repair-entry'))}`);
  assert.equal(windowAt('route-return').open, 1,
    `**AND THE ROUTE'S WRITE JOINS IT — THE COUNT IS \`1\` ON ITS RETURN TOO, AND A \`2\` IS THE FAILURE THIS `
      + `ASSERTION EXISTS FOR** (\`D-53\`: *"Constraints/Repairs should always use the same commit"*; `
      + `\`PIN-7\` (i): *"Where a commit window stands (\`addConstraint\`, the re-arm) the write JOINS it and `
      + `opens nothing"*): the return read ${JSON.stringify(windowAt('route-return'))}`);
  assert.equal(openingsAcrossTheRoute, 0,
    `**AND NO COMMIT OPENED ACROSS THE ROUTE'S WRITE** — the \`attempt-opened\` channel fires zero times for it `
      + `(\`state.mjs:533\`-\`:548\`: *"A JOIN CAN ONLY BE A JOIN OF A COMMIT THAT IS OPEN"*): the observer counted `
      + `${openingsAcrossTheRoute}`);

  // ── (c) THE CREDIT: THE OP THE ROUTE LANDED IS THE OP THE ATTEMPT HOLDS. ──────────────────────────────
  assert.notEqual(reported, null,
    `**\`K-5\` MUST ANSWER THE SYNTHETIC ATTEMPT'S REPORT**, or the attempt's own \`ops\` were never read: the `
      + `re-run's \`AttemptRef\` was ${JSON.stringify(attemptRef)} and the report call answered `
      + `${JSON.stringify(reported === null ? null : shapeOf(reported.ok === true ? null : reported.caught))}`);
  assert.equal(ops !== null, true,
    `and the report carries its closed \`ops\` list (\`AttemptReport\`): `
      + `${JSON.stringify(reported.ok === true ? Object.keys(reported.value) : null)}`);
  assert.notEqual(routeOp, null,
    `and the route landed an op at all: ${JSON.stringify(routeOp)}`);
  assert.equal(ops[ops.length - 1].opId, routeOp.opId,
    `**AND THE OP THE ROUTE LANDED IS THE OP THE SYNTHETIC ATTEMPT CREDITS — its LAST member** `
      + `(\`PIN-7\` (ii), \`landedOp\`: the membership ground stands alone at a registration, and `
      + `\`kernel-registration.mjs:519\`-\`:536\` appends it): the report reads `
      + `${JSON.stringify(ops.map((op) => op.opId))} and the route landed ${JSON.stringify(routeOp.opId)}`);
  assert.equal(landed.ok, true,
    `and the route's write landed in the store: \`read(['b'])\` threw `
      + `${JSON.stringify(shapeOf(landed.ok === true ? null : landed.caught))}`);
  assert.equal(landed.value, 99,
    `answering the value it wrote: ${JSON.stringify(landed.value)}`);

  // ── (d) AND THE CALL RETURNS AT REST. ─────────────────────────────────────────────────────────────────
  assert.equal(openCommits(store), 0,
    `and the whole call returns with no window standing: ${openCommits(store)}`);
  assert.equal(kernelFor(store).live.size, 0,
    `and no attempt left open: ${kernelFor(store).live.size}`);

  t.diagnostic(`G3-21 · THE JOIN AND THE CREDIT: \`repairContext.write\` is a `
    + `${JSON.stringify(routeMemberType)}; the count went ${JSON.stringify(windows)} — ONE window at the entry `
    + `AND ONE on the return — and \`attempt-opened\` fired ${openingsAcrossTheRoute}× across the route's write; `
    + `the route landed ${JSON.stringify(routeOp === null ? null : routeOp.opId)} and the attempt's \`ops\` read `
    + `${JSON.stringify(ops === null ? null : ops.map((op) => op.opId))}; \`read(['b'])\` = `
    + `${JSON.stringify(landed.ok === true ? landed.value : null)}; the pair was asked `
    + `${asks.length}× with ${JSON.stringify(asks)}; the call returns at `
    + `{\`open\`: ${openCommits(store)}, \`live\`: ${kernelFor(store).live.size}}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-22` · THE CONSTRUCTION INSTANT NEEDS NO WINDOW OF ITS OWN: IT RUNS NO PASS AND DELIVERS NO LISTENER
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-22 · THE ROUTE RUNS NO PASS OF ITS OWN AND DELIVERS NO LISTENER: with a WATCHER pair at `[\'b\']` carried first and a LIVE listener bound at the register, a repair that ROUTE-WRITES at `[\'b\']` makes the watcher\'s ask-count rise by ZERO, opens ZERO commits, fires the listener ZERO times, and the refused-registration variant\'s `log` carries EXACTLY TWO entries — `constraint-check` and `repair-run`', (t) => {
  // **`PIN-6` (v), VERBATIM**: *"The write the route performs APPENDS NO `constraint-check` ENTRY, NO `outcome`
  // ENTRY AND NO TERMINAL ACT, delivers no listener, and is judged by the registration's own re-run over the op
  // it landed … **Observable: the census of the `log` a refusal crosses with is unchanged by the route's
  // write**."* **AND THE SEAT IS DELIBERATE** (`verification.md §2.2`'s note on this cell): *"the cell cannot be
  // seated at a `mem` CONSTRUCTION with a `['b']` body that refuses, because `['b']`'s parent is the register and
  // the pair is APPLIED, so that construction would refuse before the assertion"* — **so the WATCHER is registered
  // first and the REFUSING pair is added afterwards, through `addConstraint`, on the same store.**
  //
  // **AND THE LISTENER'S ADDRESS IS THE REGISTER AND NOT `['b']`** — **a finding this cell records rather than
  // hides**: the store REFUSES to install a listener at an address where a constraint pair stands
  // (`AddressMalformed`: *"the listener cannot be installed at `b`: the constraint `b` stands there, and a
  // listener and a constraint do not share one"*), so *"no listener bound at `['b']` fires"* is not a drive the
  // tree admits at that spelling. **A listener bound at the REGISTER is delivered for every act at `['b']`
  // (measured: an ordinary `write(['b'], 'mem', 7)` fires it once), so it is the strongest available witness and
  // the control write at the end of this cell proves it live.**
  const store = make();
  let watcherAsks = 0;
  const watcher = store.addConstraint({ address: ['b'], id: 'b-watch' }, (context) => {
    watcherAsks += 1;
    // **A WATCHER THAT PASSES ON `undefined`**, so its own registration stands (`['b']`'s parent is the register
    // and the pair is APPLIED — `D-90` (1)'s second example).
    return context.value === 'never-this' ? { message: 'the watcher refuses only a sentinel' } : true;
  });
  let listenerFires = 0;
  const listener = store.listen('witness', [[]]);
  store.register(listener, () => { listenerFires += 1; });

  const watcherBefore = watcherAsks;
  const listenerBefore = listenerFires;
  let routeMemberType = null;
  let repairs = 0;
  let openingsAcrossTheRoute = 0;
  let routeOpId = null;
  const add = attempt(() => store.addConstraint({ address: ['a'], id: 'a' }, (context) => {
    if (context.value !== undefined) return true;
    return {
      message: ABSENT,
      repair: (repairContext) => {
        repairs += 1;
        routeMemberType = typeof repairContext.write;
        const stop = store[ATTEMPT_OPENED](() => { openingsAcrossTheRoute += 1; });
        const answer = repairContext.write(['b'], 'mem', 99);
        stop();
        routeOpId = answer.op.opId;
        // **THE REFUSED-REGISTRATION VARIANT**: the repair declines AFTER its route-write landed, so the `log`
        // census of the refusal is read with the route's write behind it (`PIN-7` (iv): the landing stands).
        return { ok: false, message: 'the repair declines, and the registration refuses at rank 19' };
      },
    };
  }));
  const addShape = shapeOf(add.ok === true ? null : add.caught);
  const watcherDelta = watcherAsks - watcherBefore;
  const listenerDelta = listenerFires - listenerBefore;
  const landed = attempt(() => store.read(['b']));
  // **THE CONTROL THAT MAKES THE TWO ZEROS MEAN SOMETHING**: an ordinary write at `['b']` must fire the listener
  // and must ask the watcher, or this cell's zeros are the zeros of a dead instrument.
  const controlFires = listenerFires;
  const controlAsks = watcherAsks;
  const control = attempt(() => store.write(['b'], 'mem', 7));
  const controlListenerDelta = listenerFires - controlFires;
  const controlWatcherDelta = watcherAsks - controlAsks;

  // ── (a) THE DRIVE REACHED ITS ARM. ────────────────────────────────────────────────────────────────────
  assert.equal(typeof watcher, 'object',
    `**THE WATCHER PAIR MUST REGISTER** (\`['b']\`'s parent is the register; \`D-90\` (1)): it answered `
      + `${JSON.stringify(typeof watcher)}`);
  assert.equal(watcherBefore, 1,
    `and it must have been asked once at its own registration, or the arm is not the one claimed: `
      + `${watcherBefore}`);
  assert.equal(routeMemberType, 'function',
    `**THE REPAIR'S RECORD MUST CARRY THE ROUTE** (\`PIN-6\` (ii)): typeof \`repairContext.write\` = `
      + `${JSON.stringify(routeMemberType)}`);
  assert.equal(repairs, 1,
    `and the repair must have run once: ${repairs}`);
  assert.equal(add.ok, false,
    `**THIS DRIVE'S REGISTRATION REFUSES** — the repair declines after its write (\`PIN-7\` (iv)): the call `
      + `RETURNED ${JSON.stringify(add.ok === true ? add.value : null)}`);
  assert.equal(addShape.status, REGISTRATION_REFUSED,
    `at rank \`19\`: ${JSON.stringify(addShape.status)} / ${JSON.stringify(addShape.message)}`);

  // ── (b) THE LOG CENSUS IS TWO ENTRIES — THE ROUTE ADDED NONE. ─────────────────────────────────────────
  assert.deepEqual(logKinds(add.caught), ['constraint-check', 'repair-run'],
    `**THE REFUSAL'S \`log\` CARRIES EXACTLY TWO ENTRIES — \`constraint-check\` AND \`repair-run\` — WITH NO `
      + `PASS ENTRY FROM THE ROUTE'S WRITE** (\`PIN-6\` (v): *"the census of the \`log\` a refusal crosses with `
      + `is unchanged by the route's write"*; \`sites.md §3.1\` item 5 measures the same two for a carried `
      + `repair): the drive read ${JSON.stringify(logKinds(add.caught))}`);

  // ── (c) NO PASS, NO LISTENER, AND THE LANDING STANDS. ─────────────────────────────────────────────────
  assert.equal(watcherDelta, 0,
    `**THE WATCHER PAIR AT \`['b']\` IS ASKED ZERO TIMES ACROSS THE ROUTE'S WRITE** — the route starts no pass `
      + `of its own (\`PIN-6\` (v); \`D-53\`'s join): the watcher's count rose by ${watcherDelta}, from `
      + `${watcherBefore} to ${watcherAsks}`);
  assert.equal(listenerDelta, 0,
    `**AND NO LISTENER FIRES ACROSS IT** (\`PIN-6\` (v): *"delivers no listener"*): the witness bound at the `
      + `register fired ${listenerDelta} time(s) across the repair's route-write`);
  assert.equal(openingsAcrossTheRoute, 0,
    `and no commit opened across it: the \`attempt-opened\` observer counted ${openingsAcrossTheRoute}`);
  assert.notEqual(routeOpId, null,
    `and the route landed an op: ${JSON.stringify(routeOpId)}`);
  assert.equal(landed.ok, true,
    `**AND THE LANDING STANDS EVEN THOUGH THE REGISTRATION REFUSED** (\`PIN-7\` (iv): *"a write the route landed `
      + `before a refusal STANDS"*): \`read(['b'])\` threw `
      + `${JSON.stringify(shapeOf(landed.ok === true ? null : landed.caught))}`);
  assert.equal(landed.value, 99,
    `answering ${JSON.stringify(landed.value)}`);

  // ── (d) THE CONTROL — THE TWO ZEROS ARE LIVE ZEROS. ───────────────────────────────────────────────────
  assert.equal(control.ok, true,
    `**THE CONTROL WRITE MUST LAND**, or the instruments above were never armed: `
      + `${JSON.stringify(shapeOf(control.ok === true ? null : control.caught))}`);
  assert.equal(controlListenerDelta >= 1, true,
    `**AND AN ORDINARY WRITE AT \`['b']\` DOES FIRE THE LISTENER** — so the zero above is a zero of the route's `
      + `absence of a delivery and not of a dead binding: the control fired it `
      + `${controlListenerDelta} time(s)`);
  assert.equal(controlWatcherDelta >= 1, true,
    `**AND IT DOES ASK THE WATCHER** — so the zero above is a zero of the route's absence of a pass: the control `
      + `raised the watcher's count by ${controlWatcherDelta}`);

  t.diagnostic(`G3-22 · NO PASS AND NO DELIVERY: the watcher at \`['b']\` was asked ${watcherBefore}× at its own `
    + `registration; the repair's route-write at \`['b']\` landed ${JSON.stringify(routeOpId)} and moved the `
    + `watcher by ${watcherDelta}, the listener by ${listenerDelta} and \`attempt-opened\` by `
    + `${openingsAcrossTheRoute}; the refusal answered ${JSON.stringify(addShape.status)} with \`log\` `
    + `${JSON.stringify(logKinds(add.caught))}; \`read(['b'])\` = ${JSON.stringify(landed.ok === true ? landed.value : null)}. `
    + `**THE CONTROL**: an ordinary \`write(['b'],'mem',7)\` fired the listener ${controlListenerDelta}× and asked `
    + `the watcher ${controlWatcherDelta}×`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-23` · THE CREDIT IS THE EXISTING RULE AND NO NEW ONE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-23 · THE CREDIT IS THE EXISTING RULE AND NO NEW ONE: four repairs, ONE DRIVE EACH, at the same address — returning `{ok: true, op: <the route\'s own op>}` STANDS; returning `{ok: true, op: {opId: \'not-the-op-it-landed\'}}` REFUSES rank `19`; returning `{ok: false, message}` REFUSES rank `19`; returning `{ok: true}` with no `op` REFUSES rank `19`', (t) => {
  // **`PIN-7` (ii)**: *"A repair's route-write is credited **iff** the repair RETURNS `{ ok: true, op: <the
  // record's own op> }` and that op is not already held by the attempt — `landedOp(attempt, result, null)` …
  // so the ORDINAL GROUND IS NOT APPLIED AND THE MEMBERSHIP GROUND STANDS ALONE."* **NO NEW RULE IS MINTED AND
  // NO ARM IS ADDED**: the four returns below are `PAR-C-5`'s and the credit rule's, unchanged, and the cell's
  // job is to show that the route's op is credited by the SAME rule and that every other return is not.
  const arms = [
    { label: 'the route\'s own op', expect: 'stands', answer: (landed) => ({ ok: true, op: landed.op }) },
    { label: 'a foreign op identity', expect: 'refuses', answer: () => ({ ok: true, op: { opId: 'not-the-op-it-landed' } }) },
    { label: 'a declining return', expect: 'refuses', answer: () => ({ ok: false, message: 'declined' }) },
    { label: '`{ok: true}` with no `op`', expect: 'refuses', answer: () => ({ ok: true }) },
  ];
  const rows = [];
  for (const arm of arms) {
    const store = make();
    let routeMemberType = null;
    let routeOpId = null;
    let asks = 0;
    const add = attempt(() => store.addConstraint({ address: ['a'], id: 'a' }, (context) => {
      asks += 1;
      if (context.value !== undefined) return true;
      return {
        message: ABSENT,
        repair: (repairContext) => {
          routeMemberType = typeof repairContext.write;
          // **THE ROUTE WRITES THE PAIR'S OWN ADDRESS**, so the re-run over a CREDITED op meets the state the
          // body admits and the registration can stand (`PIN-7` (iii)).
          const landed = repairContext.write(['a'], 'mem', 11);
          routeOpId = landed.op.opId;
          return arm.answer(landed);
        },
      };
    }));
    const shape = shapeOf(add.ok === true ? null : add.caught);
    const standing = attempt(() => store.read(['a']));
    const constraints = store.constraints();
    rows.push({
      arm,
      asks,
      constraints,
      okay: add.ok,
      routeMemberType,
      routeOpId,
      shape,
      standing: standing.ok === true ? standing.value : shapeOf(standing.caught).status,
    });
  }

  // ── (a) EVERY DRIVE REACHED THE ROUTE — otherwise the four outcomes are not the credit rule's. ─────────
  for (const row of rows) {
    assert.equal(row.routeMemberType, 'function',
      `**THE REPAIR'S RECORD MUST CARRY THE ROUTE IN EVERY ONE OF THE FOUR DRIVES** (\`PIN-6\` (ii)): the `
        + `${row.arm.label} arm read typeof \`repairContext.write\` = ${JSON.stringify(row.routeMemberType)}`);
    assert.notEqual(row.routeOpId, null,
      `and the route landed an op in every one of them: the ${row.arm.label} arm landed `
        + `${JSON.stringify(row.routeOpId)}`);
  }

  // ── (b) THE ONE ARM THAT STANDS. ──────────────────────────────────────────────────────────────────────
  const own = rows[0];
  assert.equal(own.okay, true,
    `**A REPAIR THAT RETURNS THE OP ITS OWN ROUTE-WRITE LANDED IS CREDITED AND THE REGISTRATION STANDS** `
      + `(\`PIN-7\` (ii)–(iii); \`D-91\` (ii): the route *"must be creditable by the same rule every repair's `
      + `return is"*): the ${own.arm.label} arm answered ${JSON.stringify(own.shape.status)} with message `
      + `${JSON.stringify(own.shape.message)}`);
  assert.equal(own.standing, 11,
    `and the re-run met the state the repair landed: \`read(['a'])\` = ${JSON.stringify(own.standing)}`);
  assert.equal(own.constraints.length, 1,
    `and the pair stands registered: ${JSON.stringify(own.constraints)}`);

  // ── (c) THE THREE ARMS THAT DO NOT. ───────────────────────────────────────────────────────────────────
  for (const row of rows.slice(1)) {
    assert.equal(row.okay, false,
      `**A RETURN THAT IS NOT THE ROUTE'S OWN OP IS NOT CREDITED** (\`PIN-7\` (ii), \`landedOp\`'s membership `
        + `ground: the op is *"not already held by the attempt"* and nothing else is admitted): the `
        + `${row.arm.label} arm RETURNED ${JSON.stringify(row.okay === true ? 'an instance' : null)}`);
    assert.equal(row.shape.status, REGISTRATION_REFUSED,
      `and it refuses at rank \`19\`: the ${row.arm.label} arm answered ${JSON.stringify(row.shape.status)} with `
        + `message ${JSON.stringify(row.shape.message)}`);
    assert.equal(row.constraints.length, 0,
      `and no pair is carried on a refusal (\`sites.md §3.1\` item 3: *"the pair is NOT carried on a `
        + `refusal"*): the ${row.arm.label} arm's \`constraints()\` = ${JSON.stringify(row.constraints)}`);
    assert.equal(row.standing, 11,
      `**AND THE ROUTE'S LANDING STANDS ANYWAY** (\`PIN-7\` (iv)): the ${row.arm.label} arm's `
        + `\`read(['a'])\` = ${JSON.stringify(row.standing)}`);
  }

  t.diagnostic(`G3-23 · THE CREDIT, FOUR ARMS, ONE DRIVE EACH: `
    + `${JSON.stringify(rows.map((row) => ({
      arm: row.arm.label,
      status: row.shape.status,
      constraints: row.constraints.length,
      standing: row.standing,
      route: row.routeOpId,
    })))} — ONLY the op the route landed is credited, and the three other returns refuse at rank `
    + `\`19\` leaving the landing standing`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-24` · THE ROUTE'S POSITIONS AND ITS ONE CLASS REFUSAL
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-24 · THE ROUTE\'S POSITIONS AND ITS ONE CLASS REFUSAL: a FOURTH position — a lawful `CommitRecord`, a `{pending: []}`, a string id, `null` and an explicit `undefined` each — answers ONE `TypeError` whose `status` member is ABSENT and which carries NO `log` member, and NOTHING LANDS; a tier that holds no token answers the store\'s own `AddressMalformed`; a write under an ABSENT or LEAF parent answers `AddressNotFound` / `WriteParentNotLink` UNCONVERTED, and the registration then refuses rank `19` with the store\'s state unmoved at that address', (t) => {
  // **`PIN-6` (iii) IN THREE SENTENCES**: the positions are **exactly the store's `write`'s first three —
  // `(address, tier, value)`**; **a call supplying a fourth position — of ANY class, a lawful `CommitRecord`
  // INCLUDED — is REFUSED BEFORE ANY STORE ACT**; and the refusal is **THIS UNIT'S OWN CLASS TEST and NOT the
  // commit position's**, *"a `TypeError` whose `status` member is ABSENT and which carries NO `log` member —
  // thrown unwrapped"*, whose sentence **is the implementer's and must name the arity and the reason (the commit
  // is the registration's)**. **AND `PIN-6` (iv)**: the route converts nothing, so a store code crosses raw.
  const store = make();
  store.write(['leaf'], 'mem', 5); // a REAL leaf parent, for the `WriteParentNotLink` arm

  /** One probe, one registration: the pair at `['p<n>']` refuses at its registration and its repair performs the
   *  route call and hands back the thrown value as a value — the shape both siblings use for an act whose
   *  outcome IS the subject. */
  const probe = (label, index, body) => {
    const address = [`p${index}`];
    let routeMemberType = null;
    const add = attempt(() => store.addConstraint({ address, id: `p${index}` }, (context) => {
      if (context.value !== undefined) return true;
      return {
        message: ABSENT,
        repair: (repairContext) => {
          routeMemberType = typeof repairContext.write;
          body(repairContext);
          // **THE REGISTRATION DECLINES AFTER THE PROBE**, so the refusal's own status and the store's state are
          // both readable and no credit is attempted.
          return { ok: false, message: 'the probe declines' };
        },
      };
    }));
    return { add, label, routeMemberType, shape: shapeOf(add.ok === true ? null : add.caught) };
  };

  // ══ THE FIVE FOURTH-POSITION SPELLINGS — every one of them OUTSIDE the route's three positions. ══════════
  const fourthPosition = [];
  const fourthProbes = [
    ['a lawful `CommitRecord` — the record the repair itself holds', (repairContext) => repairContext],
    ['an object carrying an own `pending: []`', () => ({ pending: [] })],
    ['a string id', () => 'attempt-1'],
    ['`null`', () => null],
    ['an explicit `undefined`', () => undefined],
  ];
  for (const [index, [label, fourth]] of fourthProbes.entries()) {
    const address = `q${index}`;
    let refused = null;
    const one = probe(label, index, (repairContext) => {
      // **THE FOURTH POSITION SUPPLIED** — `(address, tier, value, fourth)`.
      refused = attempt(() => repairContext.write([address], 'mem', 1, fourth(repairContext)));
    });
    const landed = attempt(() => store.read([address]));
    fourthPosition.push({ ...one, refused, landed, address });
  }

  // ══ THE THREE STORE-CODE ARMS — the route converts nothing (`PIN-6` (iv)). ══════════════════════════════
  const storeCodes = [];
  const storeCodeProbes = [
    ['a tier that holds no token (a supplied `undefined`)', (repairContext) => repairContext.write(['tier-probe'], undefined, 1), ADDRESS_MALFORMED, ['tier-probe']],
    ['a write under an ABSENT parent', (repairContext) => repairContext.write(['x', 'y'], 'mem', 1), ADDRESS_NOT_FOUND, ['x', 'y']],
    ['a write under a LEAF parent', (repairContext) => repairContext.write(['leaf', 'y'], 'mem', 1), WRITE_PARENT_NOT_LINK, ['leaf']],
  ];
  for (const [index, [label, call, expected, address]] of storeCodeProbes.entries()) {
    let refused = null;
    const one = probe(label, 10 + index, (repairContext) => {
      refused = attempt(() => call(repairContext));
    });
    const after = attempt(() => store.read(address));
    storeCodes.push({ ...one, after, address, expected, refused });
  }
  const leafStanding = attempt(() => store.read(['leaf']));

  // ── (a) EVERY PROBE REACHED THE ROUTE. ────────────────────────────────────────────────────────────────
  for (const row of [...fourthPosition, ...storeCodes]) {
    assert.equal(row.routeMemberType, 'function',
      `**THE REPAIR'S RECORD MUST CARRY THE ROUTE, OR NONE OF THESE ARMS IS DRIVEN** (\`PIN-6\` (ii)): the `
        + `"${row.label}" probe read typeof \`repairContext.write\` = ${JSON.stringify(row.routeMemberType)}`);
    assert.equal(row.shape.status, REGISTRATION_REFUSED,
      `and each probe's registration declines at rank \`19\` after the repair returns (so the probe itself `
        + `crossed nothing): the "${row.label}" probe answered ${JSON.stringify(row.shape.status)}`);
  }

  // ── (b) THE FOURTH POSITION IS REFUSED BY THE UNIT'S OWN CLASS TEST. ──────────────────────────────────
  for (const row of fourthPosition) {
    assert.equal(row.refused.ok, false,
      `**A SUPPLIED FOURTH POSITION MUST BE REFUSED — OF ANY CLASS, A LAWFUL \`CommitRecord\` INCLUDED** `
        + `(\`PIN-6\` (iii)): the "${row.label}" call RETURNED `
        + `${JSON.stringify(row.refused.ok === true ? row.refused.value : null)}. **A CALL THAT IS ACCEPTED `
        + `HERE IS THE ONE THE PIN EXISTS TO FORBID**`);
    assert.equal(row.refused.caught instanceof TypeError, true,
      `**AND THE REFUSAL IS THE ENTRY'S CLASS REFUSAL — ONE \`TypeError\`** (\`PIN-6\` (iii); the form the commit `
        + `position's own refusal takes, \`index.mjs:370\`-\`:372\`): the "${row.label}" call threw `
        + `${JSON.stringify(row.refused.caught === null || row.refused.caught === undefined ? null : row.refused.caught.constructor?.name)}`);
    assert.equal('status' in row.refused.caught, false,
      `**WHOSE \`status\` MEMBER IS ABSENT** — no store code is minted for it (\`PIN-10\`: *"no status is `
        + `minted"*): the "${row.label}" refusal carries `
        + `${JSON.stringify(Object.keys(row.refused.caught))}`);
    assert.equal('log' in row.refused.caught, false,
      `**AND WHICH CARRIES NO \`log\` MEMBER** (\`PIN-6\` (iii): the class refusal is thrown unwrapped and has no `
        + `census): the "${row.label}" refusal's members are `
        + `${JSON.stringify(Object.keys(row.refused.caught))}`);
    assert.equal(typeof row.refused.caught.message === 'string' && row.refused.caught.message.length > 0, true,
      `and it carries a sentence: ${JSON.stringify(row.refused.caught.message)}`);
    assert.equal(/commit/i.test(row.refused.caught.message), true,
      `**AND THE SENTENCE NAMES THE REASON — *"the commit is the registration's"*** (\`PIN-6\` (iii): *"Its `
        + `sentence is the implementer's and must name the arity and the reason"*): the "${row.label}" sentence `
        + `reads ${JSON.stringify(row.refused.caught.message)}`);
    assert.equal(/3|three/i.test(row.refused.caught.message), true,
      `and it names the ARITY the route takes — three positions (\`PIN-6\` (iii)): the "${row.label}" sentence `
        + `reads ${JSON.stringify(row.refused.caught.message)}`);
    assert.equal(row.landed.ok, false,
      `**AND NOTHING LANDS ON A REFUSED CALL** (\`PIN-6\` (iii): *"Nothing lands on a refused call"*; *"REFUSED `
        + `BEFORE ANY STORE ACT"*): the "${row.label}" call left \`read(['${row.address}'])\` answering `
        + `${JSON.stringify(row.landed.ok === true ? row.landed.value : null)}`);
    assert.equal(shapeOf(row.landed.caught).status, ADDRESS_NOT_FOUND,
      `with the store's own absence code: ${JSON.stringify(shapeOf(row.landed.caught).status)}`);
  }

  // ── (c) THE STORE'S OWN CODES CROSS RAW. ──────────────────────────────────────────────────────────────
  for (const row of storeCodes) {
    assert.equal(row.refused.ok, false,
      `**THE STORE'S OWN REFUSAL MUST CROSS — the route converts nothing** (\`PIN-6\` (iv)): the `
        + `"${row.label}" call RETURNED ${JSON.stringify(row.refused.ok === true ? row.refused.value : null)}`);
    assert.equal(shapeOf(row.refused.caught).status, row.expected,
      `**UNCONVERTED, IN THE STORE'S OWN FORM** (\`PIN-6\` (iv): \`WriteParentNotLink\`, \`AddressNotFound\`, `
        + `\`AddressMalformed\` — *"the store's own members and no other; … the route converts nothing, catches `
        + `nothing and mints no code"*): the "${row.label}" call answered `
        + `${JSON.stringify(shapeOf(row.refused.caught).status)} against the expected `
        + `${JSON.stringify(row.expected)}, with message ${JSON.stringify(shapeOf(row.refused.caught).message)}`);
  }
  assert.equal(leafStanding.ok, true,
    `**AND THE STORE'S STATE IS UNMOVED AT THAT ADDRESS** — the leaf parent still holds its leaf: `
      + `\`read(['leaf'])\` threw ${JSON.stringify(shapeOf(leafStanding.ok === true ? null : leafStanding.caught))}`);
  assert.equal(leafStanding.value, 5,
    `answering ${JSON.stringify(leafStanding.value)}`);
  const absentStanding = attempt(() => store.read(['x', 'y']));
  assert.equal(absentStanding.ok, false,
    `and the absent parent's address still holds nothing: \`read(['x','y'])\` = `
      + `${JSON.stringify(absentStanding.ok === true ? absentStanding.value : null)}`);

  t.diagnostic(`G3-24 · THE POSITIONS AND THE ONE CLASS REFUSAL: the FOURTH position was refused for `
    + `${JSON.stringify(fourthPosition.map((row) => row.label))} — each ONE \`TypeError\` with members `
    + `${JSON.stringify(fourthPosition.map((row) => Object.keys(row.refused.caught ?? {})))} and the sentences `
    + `${JSON.stringify(fourthPosition.map((row) => row.refused.caught?.message ?? null))} — and nothing landed `
    + `(${JSON.stringify(fourthPosition.map((row) => shapeOf(row.landed.caught).status))}); the STORE'S codes `
    + `crossed raw: ${JSON.stringify(storeCodes.map((row) => [row.label, shapeOf(row.refused.caught).status]))}; `
    + `\`read(['leaf'])\` = ${JSON.stringify(leafStanding.value)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-25` · THE TWO RECORDS, AT THE TWO INSTANTS (`V-3`'s drive)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-25 · THE TWO RECORDS, AT THE TWO INSTANTS: the BODY\'s context is FIVE members at a registration and at a landing and carries NO `write`; the REPAIR\'s record is SEVEN at a registration with `typeof write === \'function\'` and SIX at a landing with NO `write` member at all', (t) => {
  // **`PIN-8` (iii) (a)-(c)'s RE-DERIVATION, DRIVEN**: the body's five-member context is UNMOVED at both instants
  // (`D-92` (1): *"the constraint body's five-member evaluation context gains no member, at any instant"*), **the
  // registration instant's repair record is SEVEN** (`PIN-6` (ii)), and **the landing instant's is SIX and gains
  // no route** (`PIN-8` (iii) (c); `sites.md §2`'s forbidden site `kernel-attempt.mjs:756`-`:782`). **THE MEASURED
  // STATE OF ALL FOUR IS `sites.md §3.1` ITEM 7** (*"the body's context is `['address','attempt','op','tier',
  // 'value']` at a registration **and** at a landing; the repair's record is `['address','id','op','pending',
  // 'tier','value']` at **both**, with `typeof write === 'undefined'` on both"*), so the ONE thing this cell adds
  // to that census is `PIN-6`'s seventh member at the registration instant — and the three others are asserted
  // UNMOVED, which is what forbids a landing-instant route.
  // **NO BODY IN THIS CELL WRITES** (`D-92` (2), `D-93` (1)): the body's record is read and never used, and a
  // route on it would fail the census below.

  // ══ (i) THE REGISTRATION INSTANT — the pair refuses at `addConstraint`, its repair declines. ═════════════
  const registration = make();
  let registrationBodyMembers = null;
  let registrationRepairMembers = null;
  let registrationRepairWriteType = null;
  const refused = attempt(() => registration.addConstraint({ address: ['a'], id: 'a' }, (context) => {
    registrationBodyMembers = Object.keys(context).sort();
    return {
      message: ABSENT,
      repair: (repairContext) => {
        registrationRepairMembers = Object.keys(repairContext).sort();
        registrationRepairWriteType = typeof repairContext.write;
        // **THE REPAIR DECLINES**, so the registration refuses and the drive keeps a reading on both records.
        return { ok: false, message: 'declined' };
      },
    };
  }));

  // ══ (ii) THE LANDING INSTANT — the same pair, judged by a write's own pass. ═════════════════════════════
  const landing = make();
  landing.write(['a'], 'mem', 5);
  let landingBodyMembers = null;
  let landingRepairMembers = null;
  let landingRepairWriteType = null;
  const registered = attempt(() => landing.addConstraint({ address: ['a'], id: 'a' }, (context) => {
    if (context.attempt !== null) landingBodyMembers = Object.keys(context).sort();
    return context.value === 9
      ? {
          message: 'the pair refuses the landed value',
          repair: (repairContext) => {
            landingRepairMembers = Object.keys(repairContext).sort();
            landingRepairWriteType = typeof repairContext.write;
            // **THE LANDING INSTANT'S REPAIR NAMES THE COMMIT AT THE FOURTH POSITION** — the spelling
            // `sites.md §3.1` item 8 measures (the record at `write`'s fourth position is what a repair holds,
            // `D-46` item 2) — and the pair's own address is restored, so the write passes.
            const answer = landing.write(['a'], 'mem', 5, repairContext);
            return { ok: true, op: answer.op };
          },
        }
      : true;
  }));
  const judged = attempt(() => landing.write(['a'], 'mem', 9));

  // ── (a) THE DRIVE REACHED ALL FOUR RECORDS. ───────────────────────────────────────────────────────────
  assert.equal(refused.ok, false,
    `**THE REGISTRATION MUST REFUSE, OR NO REGISTRATION-INSTANT REPAIR RECORD WAS READ**: it RETURNED `
      + `${JSON.stringify(refused.ok === true ? refused.value : null)}`);
  assert.equal(shapeOf(refused.caught).status, REGISTRATION_REFUSED,
    `at rank \`19\`: ${JSON.stringify(shapeOf(refused.caught).status)}`);
  assert.equal(registered.ok, true,
    `**AND THE PAIR AT \`['a']\` MUST REGISTER ON THE STORE THAT HOLDS \`5\`** (\`['a']\`'s parent is the `
      + `register, so the pair is APPLIED and its body passes): the call answered `
      + `${JSON.stringify(shapeOf(registered.ok === true ? null : registered.caught))}`);
  assert.equal(judged.ok, true,
    `**AND THE WRITE THAT ASKS THE PAIR AT A LANDING MUST PASS** — its repair restores what the body admits: it `
      + `answered ${JSON.stringify(shapeOf(judged.ok === true ? null : judged.caught))}`);
  for (const [label, value] of [
    ['the registration instant\'s body census', registrationBodyMembers],
    ['the registration instant\'s repair census', registrationRepairMembers],
    ['the landing instant\'s body census', landingBodyMembers],
    ['the landing instant\'s repair census', landingRepairMembers],
  ]) {
    assert.notEqual(value, null,
      `**${label.toUpperCase()} MUST HAVE BEEN READ** — a null here is an arm this cell never reached: `
        + `${JSON.stringify(value)}`);
  }

  // ── (b) THE BODY'S RECORD IS FIVE AT BOTH INSTANTS AND CARRIES NO ROUTE. ──────────────────────────────
  for (const [label, members] of [
    ['AT A REGISTRATION', registrationBodyMembers],
    ['AT A LANDING', landingBodyMembers],
  ]) {
    assert.deepEqual(members, CONTEXT_MEMBERS,
      `**THE BODY'S EVALUATION CONTEXT IS FIVE MEMBERS ${label} AND IS UNMOVED** (\`PIN-8\` (iii) (a); `
        + `\`D-92\` (1): *"the constraint body's five-member evaluation context gains no member, at any `
        + `instant"*): the drive read ${JSON.stringify(members)}`);
    assert.equal(members.includes('write'), false,
      `**AND IT CARRIES NO \`write\`** (\`D-92\` (2): the route *"is the repair's alone"*; \`D-93\` (1): a body's `
        + `write is *"UNSUPPORTED"*): ${JSON.stringify(members)}`);
  }

  // ── (c) THE REPAIR'S RECORD IS SEVEN AT A REGISTRATION, WITH `write` A FUNCTION. ───────────────────────
  assert.deepEqual(registrationRepairMembers, REGISTRATION_REPAIR_MEMBERS,
    `**THE REGISTRATION INSTANT'S REPAIR RECORD IS SEVEN MEMBERS — THE SIX PLUS \`write\`** (\`PIN-6\` (i)-(ii); `
      + `\`PIN-8\` (iii) (b): *"\`5 + 1 = 6\` … the repair's record is seven with \`write\` a function among `
      + `them"*): the drive read ${JSON.stringify(registrationRepairMembers)}. **TODAY IT READS SIX** `
      + `(\`sites.md §3.1\` item 7)`);
  assert.equal(registrationRepairWriteType, 'function',
    `**AND ITS \`write\` MEMBER IS A FUNCTION** (\`PIN-6\` (ii)): typeof reads `
      + `${JSON.stringify(registrationRepairWriteType)}`);

  // ── (d) THE LANDING INSTANT'S RECORD IS SIX, AND GAINS NO ROUTE. ──────────────────────────────────────
  assert.deepEqual(landingRepairMembers, LANDING_REPAIR_MEMBERS,
    `**THE LANDING INSTANT'S REPAIR RECORD IS THE SIX-MEMBER ONE, BYTE-UNMOVED** (\`PIN-8\` (iii) (c); `
      + `\`kernel-attempt.mjs:756\`-\`:782\` is a FORBIDDEN SITE): the drive read `
      + `${JSON.stringify(landingRepairMembers)}`);
  assert.equal(landingRepairMembers.includes('write'), false,
    `**AND IT CARRIES NO \`write\` MEMBER AT ALL** — the route is the REGISTRATION instant's and not the `
      + `landing's (\`PIN-6\` (i): *"the registration instant's repair record gains ONE member"*): `
      + `${JSON.stringify(landingRepairMembers)}`);
  assert.equal(landingRepairWriteType, 'undefined',
    `and \`typeof repairContext.write\` there is \`undefined\`, not a function: `
      + `${JSON.stringify(landingRepairWriteType)}`);

  t.diagnostic(`G3-25 · THE TWO RECORDS AT THE TWO INSTANTS: REGISTRATION — body `
    + `${JSON.stringify(registrationBodyMembers)} (refused ${JSON.stringify(shapeOf(refused.caught).status)}), `
    + `repair ${JSON.stringify(registrationRepairMembers)} with typeof \`write\` = `
    + `${JSON.stringify(registrationRepairWriteType)}; LANDING — body ${JSON.stringify(landingBodyMembers)}, `
    + `repair ${JSON.stringify(landingRepairMembers)} with typeof \`write\` = `
    + `${JSON.stringify(landingRepairWriteType)}. **THE BODY IS FIVE AT BOTH AND THE ROUTE IS THE `
    + `REGISTRATION'S ALONE**`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-26` · A REFUSED REGISTRATION LEAVES THE ROUTE'S LANDINGS STANDING
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-26 · A REFUSED REGISTRATION LEAVES THE ROUTE\'S LANDINGS STANDING: a repair that ROUTE-WRITES at `[\'b\']` and then returns `{ok: false, message}` makes the registration refuse rank `19`, and `read([\'b\'])` STILL ANSWERS THE REPAIR\'S VALUE', (t) => {
  // **`PIN-7` (iv), QUOTED WHOLE**: *"WHAT A FAILED REGISTRATION DOES TO THE ROUTE'S LANDINGS IS DECLARED AND
  // LEFT ALONE: THE REGISTRATION INSTANT COMPOSES NO ROLLBACK, SO A WRITE THE ROUTE LANDED BEFORE A REFUSAL
  // STANDS … `PIN-7` moves no byte of that arm and forbids gate 3 from adding one."*
  //
  // **THE SEAT IS `addConstraint` AND THE REASON IS THE PIN'S OWN SUBJECT**: the cell's reading is the store's
  // state AFTER the refusal, and a construction that refuses returns no instance — there is nothing a caller
  // could read `['b']` from. `D-91` (4) names `addConstraint` as one of the four registration instants, the arm
  // is the same one (`registrationEvaluation` + the synthetic attempt), and the drive below is the only seat at
  // which the pin's claim is OBSERVABLE AT ALL.
  const store = make();
  let routeMemberType = null;
  let routeOpId = null;
  const add = attempt(() => store.addConstraint({ address: ['a'], id: 'a' }, (context) => {
    if (context.value !== undefined) return true;
    return {
      message: ABSENT,
      repair: (repairContext) => {
        routeMemberType = typeof repairContext.write;
        const answer = repairContext.write(['b'], 'mem', 99);
        routeOpId = answer.op.opId;
        return { ok: false, message: 'the repair declines after its write landed' };
      },
    };
  }));
  const addShape = shapeOf(add.ok === true ? null : add.caught);
  const landed = attempt(() => store.read(['b']));
  const rows = store.constraints();

  // ── (a) THE ROUTE WAS DRIVEN AND THE REGISTRATION REFUSED. ────────────────────────────────────────────
  assert.equal(routeMemberType, 'function',
    `**THE REPAIR'S RECORD MUST CARRY THE ROUTE** (\`PIN-6\` (ii)): typeof \`repairContext.write\` = `
      + `${JSON.stringify(routeMemberType)}`);
  assert.notEqual(routeOpId, null,
    `and the route landed an op before the refusal: ${JSON.stringify(routeOpId)}`);
  assert.equal(add.ok, false,
    `**THE REGISTRATION REFUSES** — the repair returns \`{ok: false}\`, which no credit rule admits `
      + `(\`PIN-7\` (ii)): the call RETURNED ${JSON.stringify(add.ok === true ? add.value : null)}`);
  assert.equal(addShape.status, REGISTRATION_REFUSED,
    `at rank \`19\`: ${JSON.stringify(addShape.status)} with message ${JSON.stringify(addShape.message)}`);
  assert.deepEqual(logKinds(add.caught), ['constraint-check', 'repair-run'],
    `with the two-entry census \`PIN-6\` (v) leaves the route unable to change: `
      + `${JSON.stringify(logKinds(add.caught))}`);
  assert.deepEqual(rows, [],
    `and no pair is carried on a refusal: \`constraints()\` = ${JSON.stringify(rows)}`);

  // ── (b) AND THE LANDING IS STILL THERE — THE REGISTRATION COMPOSES NO ROLLBACK. ───────────────────────
  assert.equal(landed.ok, true,
    `**THE ROUTE'S LANDING MUST STAND THROUGH THE REFUSAL** (\`PIN-7\` (iv): *"a write the route landed before `
      + `a refusal STANDS"*; \`kernel-registration.mjs:681\`-\`:686\`: *"the registration instant opens no `
      + `\`K-2\`, delivers no listener and composes no rollback"*): \`read(['b'])\` threw `
      + `${JSON.stringify(shapeOf(landed.ok === true ? null : landed.caught))}. **A MISSING VALUE HERE WOULD BE `
      + `A ROLLBACK THIS UNIT IS FORBIDDEN TO ADD**`);
  assert.equal(landed.value, 99,
    `answering exactly what the repair wrote: ${JSON.stringify(landed.value)}`);

  t.diagnostic(`G3-26 · A REFUSED REGISTRATION LEAVES ITS LANDINGS: typeof \`repairContext.write\` is `
    + `${JSON.stringify(routeMemberType)}; the route landed ${JSON.stringify(routeOpId)}; the registration `
    + `answered ${JSON.stringify(addShape.status)} with \`log\` ${JSON.stringify(logKinds(add.caught))} and `
    + `\`constraints()\` ${JSON.stringify(rows)}; \`read(['b'])\` = `
    + `${JSON.stringify(landed.ok === true ? landed.value : null)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-27` · `PIN-9` — A SKIPPED PAIR CANNOT BE RESCUED BY ITS OWN REPAIR
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-27 · `PIN-9` — A SKIPPED PAIR CANNOT BE RESCUED BY ITS OWN REPAIR: a `cfg.constraints` element at `[\'window\',\'tabs\']` whose body refuses and whose repair WOULD CREATE `window` leaves the construction STANDING (the pair is skipped), the repair running `0` times, and `read([\'window\'])` throwing `AddressNotFound`', (t) => {
  // **`PIN-9`, VERBATIM**: *"A pair whose parent is absent is never asked, so nothing runs to create the parent —
  // `['window','tabs']` with no `window` cannot be rescued by a repair, and a consumer wanting that state must
  // apply the pair at a walkable address (`['window']`) whose repair creates the node. This is stated so no
  // implementer "fixes" it by asking a pair it should skip."* **THE COMPLEMENTARY ARM IS DECLARED AND OWED NO
  // BYTE** (`PIN-9`'s second sentence): a repair for an APPLIED pair may create the node its own pair names and
  // may make a skipped pair's parent stand — **and that is a side effect of a lawful write and never a route by
  // which the skipped pair is asked.**
  let asks = 0;
  let repairs = 0;
  let routeMemberType = null;
  const construction = attempt(() => make({
    constraints: [{
      address: ['window', 'tabs'],
      id: 'cannot-be-rescued',
      constraint: (context) => {
        asks += 1;
        return {
          message: ABSENT,
          // **THE REPAIR THAT WOULD CREATE THE PARENT** — the act `PIN-9` says must NOT run, because the pair is
          // never asked. It is written through the ROUTE, which is the only handle a construction-instant repair
          // has (`PIN-6` (i)), and if it ever ran it would create `window` and defeat the claim above.
          repair: (repairContext) => {
            repairs += 1;
            routeMemberType = typeof repairContext.write;
            const answer = repairContext.write(['window'], 'mem', { tabs: {} });
            return { ok: true, op: answer.op };
          },
        };
      },
    }],
  }));
  const constructionShape = shapeOf(construction.ok === true ? null : construction.caught);
  const window = construction.ok === true ? attempt(() => construction.value.read(['window'])) : null;
  const rows = construction.ok === true ? construction.value.constraints() : [];

  // ── (a) THE CONSTRUCTION STANDS. ──────────────────────────────────────────────────────────────────────
  assert.equal(asks, 0,
    `**THE BODY MUST NEVER HAVE BEEN ENTERED** — the pair's parent cannot be walked to, so the pair is SKIPPED `
      + `(\`PIN-2\` (ii)'s second arm; \`PIN-3\`: *"not asked"*): the body ran ${asks} time(s)`);
  assert.equal(construction.ok, true,
    `**AND THE CONSTRUCTION STANDS — THE PAIR IS CARRIED AND NOBODY CAN RESCUE IT** (\`PIN-9\`; \`D-90\` (3): `
      + `*"registration does not fail for it"*): it answered ${JSON.stringify(constructionShape.status)} with `
      + `log ${JSON.stringify(logKinds(construction.caught))} and message `
      + `${JSON.stringify(constructionShape.message)}`);

  // ── (b) THE REPAIR NEVER RAN, AND SO THE PARENT WAS NEVER CREATED. ────────────────────────────────────
  assert.equal(repairs, 0,
    `**THE REPAIR NEVER RUNS, SO NOTHING CREATES THE PARENT** (\`PIN-9\`: *"nothing runs to create the `
      + `parent"*; \`D-91\` (iv): *"a pair skipped because its parent is absent is not asked, so nothing runs to `
      + `create the parent; that consequence is \`D-90\`'s and is recorded there, not repaired here"*): the `
      + `drive entered it ${repairs} time(s), and it would have written through `
      + `${JSON.stringify(routeMemberType)}`);
  assert.equal(window.ok, false,
    `**AND \`read(['window'])\` THROWS \`AddressNotFound\`** — the address the repair would have created holds `
      + `nothing: the read answered ${JSON.stringify(window.ok === true ? window.value : null)}`);
  assert.equal(shapeOf(window.caught).status, ADDRESS_NOT_FOUND,
    `with the store's own absence code: ${JSON.stringify(shapeOf(window.caught).status)}`);
  assert.equal(rows.length, 1,
    `and the pair stands registered all the same (\`PIN-4\` (i); \`D-90\` (3): *"A pair whose parent is absent is `
      + `carried anyway"*): \`constraints()\` = ${JSON.stringify(rows)}`);

  t.diagnostic(`G3-27 · \`PIN-9\`: the body ran ${asks}× and the repair ${repairs}×; the construction answered `
    + `${JSON.stringify(constructionShape.status)}; \`read(['window'])\` threw `
    + `${JSON.stringify(shapeOf(window === null ? null : window.caught).status)}; \`constraints()\` = `
    + `${JSON.stringify(rows.map((row) => ({ address: addressSet(row.address), id: row.id })))} — **THE SKIPPED `
    + `PAIR'S OWN REPAIR IS NOT A ROUTE BY WHICH IT IS ASKED**`);
});
