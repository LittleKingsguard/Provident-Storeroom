// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// A CONSTRAINT THAT OWNS AN ADDRESS CAN RECONSTRUCT IT: the pair is added to a store that LACKS its object, its
// body refuses absence WITH a repair, and **the repair runs at the REGISTRATION INSTANT — so the `addConstraint`
// call itself passes and the object stands at the address afterwards.**
//
// **THE SCENARIO, IN ONE SENTENCE AND IN THE ARCHITECT'S OWN TERMS:** *"User wants to enforce a constraint that a
// given top-level register address must exist, with a repair that reconstructs it if missing … creating that
// constraint on a store that does not contain the object at start (pass scenario is that the repair creates it
// automatically when the constraint is run on the store during its initial add)."* **So the pass value is not
// "the add is refused" and not "the add passes and the address is still empty": it is THE ADD PASSING BECAUSE
// THE REPAIR ALREADY RAN.**
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE MECHANISM, MEMBER BY MEMBER, EACH READ AT ITS OWN BYTES ON THIS CHECKOUT BEFORE A CELL WAS WRITTEN
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **1 · THE PAIR IS EVALUATED ONCE WHEN IT IS ADDED, THROUGH A FIVE-MEMBER CONTEXT.**
// `bindings/js/src/entry/kernel-registration.mjs:291-317` (`registrationEvaluation`) builds
// `registrationContext(store, address, null)` **above** the body's invocation, and `:345-356`
// (`registrationContext`) answers exactly five members — `address`, `tier`, `value`, `attempt`, `op` — with
// `tier: null` (`:350`), `attempt: null` at this instant (`:306`, `:353`), `op: null` (`:354`) and
// `value: readCurrent(store, address)` (`:352`). **`readCurrent` (`:360-366`) is `store.read(address)` with its
// REFUSAL SWALLOWED into `undefined`** — so *"the address holds nothing"* and *"the read refused"* are ONE
// reading here, and **ABSENCE AT THE REGISTRATION INSTANT IS `context.value === undefined`.** `D-17`: the
// citation is a comment and no `docs/**` path is opened at runtime.
//
// **2 · THE BODY'S OUTCOME IS A CLOSED THREE-ARM SET, READ IN ORDER.** `PAR-C-5`'s three arms, read live at
// `kernel-registration.mjs:329-333`: `true` is the pass (`:329`); an object carrying an own-or-inherited
// `message` is the violation arm **and its `repair` member, where it is a function, is the repair attempted**
// (`:330-333`); **a value outside the three arms is read as the `{message}` arm and never as an arm of its own**;
// and **a repair the outcome does not carry means NO repair is registered for the pair** (`:336`, state 2's
// refusal). *(The landing instant reads the same closed set with an own-member gate — `kernel-attempt.mjs:688-699`
// — and this file's body returns ONE object literal whose `message` and `repair` are both OWN members, so both
// instants read one shape alike and no cell here rests on either read's prototype rule.)*
//
// **3 · WITH A REPAIR PRESENT THE KERNEL RUNS IT ON THE SYNTHETIC ATTEMPT OF THE SAME COMMIT, AND HANDS IT THE
// SIX-MEMBER `RepairContext`.** `kernel-registration.mjs:430-483` mints the synthetic attempt, appends the
// `constraint-check` and `repair-run` entries (`:478`, `:480`), and calls
// `registrationRepairContext(store, address, pair.id, attempt.commit)` (`:483`) — whose record is EXACTLY SIX
// members (`:387-398`): `address` (the pair's own, `:389`), `id` (the pair's `id`, `:390`), `tier: null` (`:392`),
// `value` (the store's current value at the pair's address, read and not landed, `:393`), `op: null` (`:394`) and
// **`pending` — the commit the repair is part of, handed as a fresh list (`:396`)**. **THE INVOCATION NAMES THAT
// COMMIT** (`:497`, `repairInCommit`, `:38-42`): `D-53`, verbatim — *"Constraints/Repairs should always use the
// same commit"* — so the write a repair makes with that record at `write`'s FOURTH position JOINS the registration's
// commit and opens none of its own (`D-46` item 2's position: an object carrying an own present `pending`).
// **AND THE REPAIR ANSWERS `{ ok: true, op }` WITH THE STORE'S OWN RECORD** — `landedOp` (`:510-517`,
// `kernel-foundations.mjs:1105-1131`) credits an own `op` carrying a non-empty `opId`, and the guide's canonical
// shape is `docs/guides/package-use.md:1010-1029` (the §7.6 example: `const landed = store.write(…, repairContext);`
// then `return { ok: true, op: landed.op };`). **NO OTHER RETURN CREDITS ANYTHING: `{ok:false}` or an `ok:true`
// return whose `op` is absent reaches arm (d) and the registration is REFUSED** (`:512-517`).
//
// **3-bis · AND THE FOURTH POSITION ON THAT WRITE ALSO DECIDES WHETHER THE WRITE RUNS A PASS OF ITS OWN — MEASURED,
// AND THE REASON CELL (2) COUNTS TWO READINGS AND NOT THREE.** `bindings/js/index.mjs:339-412` chooses `write`'s
// route BY ARITY: `arguments.length <= 3` reaches `constraintWrite` (the kernel's `K-2` route), while a call that
// SUPPLIES the fourth position calls the STORE'S OWN VERB directly (`Reflect.apply(entryOf().write, …)`) and enters
// no `K-2`. **SO THE REPAIR'S WRITE — `store.write(['window'], 'mem', WINDOW, repairContext)`, the guide's own
// spelling — lands with NO pass over it, and the pair's next evaluation is the kernel's re-run and nothing else.**
// **MEASURED ON THIS CHECKOUT AT AUTHORING TIME, IN A THROWAWAY DRIVE OUTSIDE THIS BATTERY AND NOT ASSERTED BY ANY
// CELL BELOW: the same body with the THREE-position spelling answers THREE readings, not two** (the write's own
// `K-2` pass over the pair at the op it landed, then the synthetic attempt's re-run), **so the count cell (2)
// asserts is a property of the CANONICAL spelling and `D-53`'s *"same commit"* holds under both** — what the fourth
// position adds is that no second pass is opened over the repair's own landing.
//
// **4 · AFTER THE REPAIR LANDS THE PAIR IS RE-RUN OVER THE REPAIR'S OWN OP.** `kernel-registration.mjs:548-630`
// (`registrationRerun`), reached at `:528` with `produced` (the op the repair's write landed); the evaluated set is
// the pair's own registry key alone (`:592`) — *"a re-run of a registration is not a pass over the registry"* — and
// the context it builds (`:597-603`) carries **`value: produced.after.value`** (`:600`) and **`op: produced`**
// (`:603`). **SO THE LATER EVALUATION'S `value` IS THE LANDED OBJECT AND ITS `op` IS THE VERY OP THE REPAIR
// RETURNED.** A non-`true` outcome there fails the registration (`:625-627`) and the whole `addConstraint` call
// is refused (`:529-532` → `:213-220`).
//
// **5 · THE BODY RECEIVES NOTHING BUT ITS CONTEXT, SO IT CLOSES OVER THE INSTANCE.** That is lawful and measured:
// **`D-1-bis` settles that reads check no constraint** (the architect, verbatim: *"a is correct"* — reading (b),
// *"reads check constraints"*, refused), and `docs/guides/package-use.md:1048-1050` withdraws `D-45`'s contrary
// reading in terms — *"MEASURED 2026-10-28, AND THAT CLAUSE IS WRONG: A READ BRACKETS NO COMMIT AT ALL … a read
// inside a body runs INSIDE the attempt's window, opens nothing, and disturbs nothing"* — *"AND A READ RUNS NO
// CHECK, SO NOTHING IS JUDGED BY IT."* **Cell (2) measures that in passing: the read it takes after the add asks
// the body ZERO further times.**
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT EACH CELL PROVES, AND WHAT IT WOULD BE IF THE RULE WERE READ WRONGLY
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
//   (1) **THE REPAIR CREATES THE OBJECT DURING THE ADD.** The store refuses `read(['window'])` with
//       `AddressNotFound` BEFORE the add (asserted, not assumed); then the `addConstraint` call — called
//       directly, so a refusal escapes and fails this cell rather than being swallowed — leaves
//       `store.read(['window'])` answering **exactly the object the repair wrote**. **READ WRONGLY:** if absence
//       were spelled `null` (or allowed to propagate as a refusal) instead of `undefined`, the body would not
//       take its refusal arm, would answer `true`, and the add would still pass while the address stayed empty —
//       **so the deep-equal on the READ, and not "the call did not throw", is the assertion this cell rests on.**
//       If state 3 were read as state 2 (the repair never attempted) the add would refuse
//       `ConstraintRefusedAtRegistration`; if the repair's return were credited as a bare op, `landedOp` would
//       answer `null` and the add would refuse the same way.
//   (2) **THE TWO EVALUATIONS, NAMED.** Every invocation records its own `context.value`, `attempt`, `op` and the
//       answer it handed back: **the FIRST is `undefined` with `attempt: null` and `op: null`** (the registration
//       instant, mechanism `1`), **a LATER one carries the landed object with a non-null `attempt` and `op` THAT
//       IS THE OBJECT THE REPAIR RETURNED** (the re-run over the repair's own op, mechanism `4`), and **that later
//       answer is the pass.** **READ WRONGLY:** a kernel that lands the repair and never re-runs the pair reads
//       `1` here, not `2`; a re-run handed the OLD context (`value: undefined`) sends the body back into its
//       refusal arm, so the registration refuses and the call throws — and the "the later answer is `true`"
//       assertion goes red before that; a re-run over some other op fails the `op === ` identity assertion; and
//       a kernel that hands the constraint the REPAIR's six-member record instead of the constraint's five-member
//       one fails the member census taken on every reading. **AND A THIRD READING IS THE OTHER MISREAD**: the
//       repair's write is made with the commit at `write`'s fourth position (mechanism `3-bis`), so it opens no
//       pass — drop that position and the same body answers `3`, which the count assertion refuses.
//   (3) **THE ALREADY-PRESENT ARM PASSES WITHOUT A REPAIR.** A second store HOLDS the object before the add: the
//       body passes on its FIRST evaluation, the add does not throw, **the repair is never invoked** (a counter
//       this cell owns, plus a trap: the repair it *would* run answers `{ok:false}`, so an invocation refuses the
//       registration outright), and the object is unchanged. **READ WRONGLY:** a kernel that invokes a repair on
//       the passing arm — or that re-runs a pair whose repair never ran — shows `repairs === 1` and, through the
//       trap, a thrown refusal; a kernel that treats an already-present value as absent reads
//       `readings.length === 2` with the first reading `undefined`.
//   (4) **THE PAIR STANDS REGISTERED IN BOTH ARMS.** `store.constraints()` answers ONE row per store, **exactly
//       two members — `address` (the pair's own SET) and `id` — and NO function** (`bindings/js/index.d.ts:1118-1126`'s
//       `ConstraintPair` clause: *"`a.constraints()`'s every element carries exactly these TWO members and no
//       third … and NEITHER the constraint function nor the opaque identity"*; `src/entry/constraints.mjs`'s
//       `enumerateConstraints` builds `{address: entry.addresses.map(…), id: entry.id}` and nothing else).
//       **READ WRONGLY:** a refused registration leaves no row, so this cell is also the witness that the
//       repaired add REGISTERED rather than merely failed to throw; and an element carrying the function would
//       make the member census read three. **The address member is read AS A SET and never as a sequence**, and
//       each store carries ONE pair, so no cell here depends on an order (`D-39`'s declared order, cited and not
//       exercised).
//
// **D-21.** Every cell prints the readings it took at its own `t.diagnostic`, and a cell that cannot reach its arm
// says so at an assertion instead of reporting a verdict. **D-35 / D-36.** No cell here is a client-scope
// hardening cell: the repaired return is one object literal whose two members are own members, so no cell rests on
// either instant's prototype rule. **THE INSTRUMENTS ARE THE DECLARED ONES** — `storeCreate` and the product's own
// members — plus `kernelFor` for ONE closing reading (`live.size`, the open attempts), the helper
// `tests/e2e/repair-in-commit.test.mjs` already takes from this module.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';

/** The address the scenario's constraint owns — a TOP-LEVEL register address, and the object whose presence it
 *  enforces. The value is nested on purpose: a repair that "creates" the key but drops its subtree would pass a
 *  shallow check and fail the deep one. */
const WINDOW = { settings: { theme: 'dark' }, tabs: { landingPage: 'home' } };
/** The pair the scenario adds: one address, one caller-chosen `id` (`D-24`: *"The handle becomes the id"*). */
const ADDRESS = ['window'];
const ID = 'window-must-exist';
/** The refusal sentence the body carries on its violation arm — `PAR-C-5`'s `{message}` half, and the text the
 *  registration would answer with if the repair were absent or failed. */
const VIOLATION = 'the top-level register address must exist';

/** **THE FIVE-MEMBER EVALUATION CONTEXT, SORTED** (`kernel-registration.mjs:345-356`; a SIXTH member is refused
 *  by name at `kernel-surface.md §2.3` item 1's (6), which is why the census is asserted on EVERY reading). */
const CONTEXT_MEMBERS = ['address', 'attempt', 'op', 'tier', 'value'];
/** **THE SIX-MEMBER `RepairContext`, SORTED** (`kernel-registration.mjs:387-398`) — the constraint's record plus
 *  `id` and `pending`, and NOT the constraint's record (`:373-374`: *"THE REPAIR'S CONTEXT IS NOT THE CONSTRAINT'S
 *  CONTEXT, AND THE TWO ARE NOT INTERCHANGEABLE"*). */
const REPAIR_CONTEXT_MEMBERS = ['address', 'id', 'op', 'pending', 'tier', 'value'];
/** `PAR-JS-13`: the write's returned record is `{op, watched, triggered}` — fresh on every call, never a view. */
const WRITE_RECORD_MEMBERS = ['op', 'triggered', 'watched'];
/** `constraints()`'s declared two members (`index.d.ts:1118-1126`), sorted. */
const PAIR_MEMBERS = ['address', 'id'];

const make = () => storeCreate({ journalLength: 256, listeners: [] });

/** Run `fn`; answer the thrown value as a value. Every call in this file is synchronous, so this is total — and
 *  it is used ONLY where a refusal is the SUBJECT and its `status` is asserted below. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

const shapeOf = (caught) => ({
  status: caught !== null && typeof caught === 'object' ? caught.status ?? null : null,
  message: caught !== null && typeof caught === 'object' && typeof caught.message === 'string'
    ? caught.message
    : String(caught),
});

/**
 * **A PAIR'S ADDRESS, READ AS A SET OF ADDRESSES AND NEVER AS A SEQUENCE.** `index.d.ts`'s
 * `ConstraintPair.address` is `Address | readonly Address[]`, and its own clause reads *"on the READ and at the
 * REMOVAL it is the pair's own SET"*; the surface's own encoding of a set of ONE (`['window']` against
 * `[['window']]`) is not printed by the declaration, so both are read and the SET is what the cells assert —
 * the same reading `tests/e2e/blind-constraints-surface.test.mjs`'s `addressSet` takes of the same member.
 */
const addressSet = (address) => {
  const members = Array.isArray(address) && Array.isArray(address[0]) ? address : [address];
  return members.map((member) => member.join('/')).sort();
};

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (1) THE REPAIR RUNS AT THE REGISTRATION INSTANT AND CREATES THE OBJECT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('registration-repair (1) · THE REPAIR CREATES THE OBJECT DURING THE ADD: a `mem` store holding NO `window` key takes the pair, its body refuses `context.value === undefined` with a repair, and the `addConstraint` CALL ITSELF passes and leaves the object the repair wrote standing at the address', (t) => {
  const store = make();
  // **THE PREMISE IS ASSERTED AS A REFUSAL AND NOT ASSUMED**: the store does not contain the object at start.
  // `D-1-bis`: a read consults no constraint — so this read is the STORE's answer about the store's own state
  // and not a verdict of any pair. It is the only read in this cell taken before a pair exists.
  const absent = attempt(() => store.read(['window']));
  const absentShape = absent.ok === true ? { status: null, message: 'the read RETURNED' } : shapeOf(absent.caught);

  // ── THE BODY. It receives nothing but its context, so it closes over the instance (mechanism `5`). ────────
  const repairReadings = [];
  let repairs = 0;
  let landedRecord = null;
  // **THE CALL IS MADE DIRECTLY: a refusal from the registration ESCAPES and fails this cell loudly** — the
  // scenario's whole claim is that this call passes, and a `try`/`catch` here would be the finding.
  const identity = store.addConstraint({ address: ['window'], id: ID }, (context) => (context.value === undefined
    ? {
        message: VIOLATION,
        repair: (repairContext) => {
          repairs += 1;
          repairReadings.push({
            address: repairContext.address,
            id: repairContext.id,
            members: Object.keys(repairContext).sort(),
            op: repairContext.op,
            pending: Array.isArray(repairContext.pending) ? repairContext.pending.slice() : null,
            tier: repairContext.tier,
            value: repairContext.value,
          });
          // **THE REPAIR MAKES ITS OWN WRITE, NAMING THAT CONTEXT'S OWN RECORD AT THE WRITE'S FOURTH POSITION**
          // (`kernel-registration.mjs:396`; `D-46` item 2's accepted spelling), and answers the STORE'S OWN
          // record of the write it just made (`landedOp`, `kernel-foundations.mjs:1105-1131`).
          const landed = store.write(['window'], 'mem', WINDOW, repairContext);
          landedRecord = landed;
          return { ok: true, op: landed.op };
        },
      }
    : true));

  const standing = store.read(['window']);
  const rest = kernelFor(store).live.size;

  // ── (a) THE STORE REALLY WAS EMPTY, AND IT SAID SO ITSELF. ────────────────────────────────────────────
  assert.equal(absent.ok, false,
    `**THE STORE MUST NOT CONTAIN \`window\` BEFORE THE ADD**, or this cell measures the wrong arm: the drive's `
      + `read answered ${JSON.stringify(absent.ok === true ? absent.value : null)}`);
  assert.equal(absentShape.status, 'AddressNotFound',
    `and it must refuse with the store's own absence code (\`docs/specs/storeroom-native/contract.md §8.1\`): the `
      + `drive caught ${JSON.stringify(absentShape)}`);
  assert.equal(absentShape.message.includes("'window' does not exist in"),
    true,
    `and the refusal's message carries the address and the row's fixed phrase \`does not exist in\` `
      + `(\`contract.md:4489\`): ${JSON.stringify(absentShape.message)}`);

  // ── (b) THE CALL PASSED — asserted by NOT catching it above, and by its answer being an identity. ──────
  assert.equal(typeof identity, 'object',
    `**\`addConstraint\` ANSWERS THE PAIR'S OPAQUE IDENTITY AND DOES NOT THROW** (\`surface.md §2.12\` item 2 (a); `
      + `\`PAR-JS-25\`'s opacity): the call answered a ${typeof identity}`);
  assert.notEqual(identity, null,
    `and the identity is an object and not \`null\`: ${JSON.stringify(identity)}`);

  // ── (c) THE REPAIR RAN ONCE, WITH THE SIX-MEMBER RECORD, AND ITS WRITE LANDED. ────────────────────────
  assert.equal(repairs, 1,
    `**THE PAIR'S REPAIR IS THE ACT THAT MAKES THIS ADD PASS, AND IT RUNS ONCE** `
      + `(\`kernel-registration.mjs:430-497\`): the drive entered it ${repairs} time(s)`);
  assert.deepEqual(repairReadings[0].members, REPAIR_CONTEXT_MEMBERS,
    `**AND IT IS HANDED THE SIX-MEMBER \`RepairContext\` — \`address\` · \`id\` · \`tier\` · \`value\` · \`op\` · `
      + `\`pending\`** (\`kernel-registration.mjs:387-398\`), which is NOT the constraint's five-member record: the `
      + `drive read ${JSON.stringify(repairReadings[0].members)}`);
  assert.deepEqual(repairReadings[0].address, ADDRESS,
    `the record's \`address\` is the pair's own: ${JSON.stringify(repairReadings[0].address)}`);
  assert.equal(repairReadings[0].id, ID,
    `its \`id\` is the pair's own — the member the constraint's record does not carry at all: `
      + `${JSON.stringify(repairReadings[0].id)}`);
  assert.equal(repairReadings[0].tier, null,
    `\`tier\` is ABSENT and spelled \`null\` at this instant: ${JSON.stringify(repairReadings[0].tier)}`);
  assert.equal(repairReadings[0].op, null,
    `and so is \`op\` — no landing at this address has left one valid: ${JSON.stringify(repairReadings[0].op)}`);
  assert.equal(repairReadings[0].value, undefined,
    `**AND \`value\` IS THE STORE'S CURRENT VALUE AT THE PAIR'S ADDRESS, READ AND NOT LANDED — \`undefined\`, `
      + `because the address holds nothing** (\`:393\`; the same \`readCurrent\` arm): `
      + `${JSON.stringify(repairReadings[0].value)}`);
  assert.deepEqual(repairReadings[0].pending, [],
    `\`pending\` is the commit the repair is part of, handed as a FRESH list — empty here, because a registration `
      + `lands no \`K-2\` of its own: ${JSON.stringify(repairReadings[0].pending)}`);

  assert.notEqual(landedRecord, null,
    'the repair\'s own write must have been made, or there is no landing for the re-run to judge');
  assert.deepEqual(Object.keys(landedRecord).sort(), WRITE_RECORD_MEMBERS,
    `the repair's write answers the declared record (\`PAR-JS-13\`): `
      + `${JSON.stringify(Object.keys(landedRecord))}`);
  assert.equal(typeof landedRecord.op, 'object',
    `and it carries the store's own op, which the repair returns as \`{ok: true, op}\`: `
      + `${JSON.stringify(landedRecord.op === undefined ? null : landedRecord.op.opId ?? null)}`);
  assert.deepEqual(landedRecord.op.address, ADDRESS,
    `the op landed AT the address the pair owns — the repair reconstructs the object in place: `
      + `${JSON.stringify(landedRecord.op.address)}`);
  assert.deepEqual(landedRecord.op.after, { present: true, value: WINDOW },
    `and its landed state is the object the repair wrote: ${JSON.stringify(landedRecord.op.after)}`);
  assert.deepEqual(landedRecord.triggered.map((element) => element.handle), [ID],
    `**AND THE STORE NAMED THIS PAIR'S OWN \`id\` IN THE ACT'S REACH** (\`D-69\`'s \`triggered\`): the home entry `
      + `the registration's \`listen\` created is what the store reached — `
      + `${JSON.stringify(landedRecord.triggered)}`);

  // ── (d) THE OBJECT EXISTS AFTERWARDS, AND IT IS THE ONE THE REPAIR WROTE. ──────────────────────────────
  assert.deepEqual(standing, WINDOW,
    `**\`store.read(['window'])\` ANSWERS EXACTLY THE OBJECT THE REPAIR WROTE** — the pass value of the whole `
      + `scenario: the drive read ${JSON.stringify(standing)}`);
  assert.equal(Object.getPrototypeOf(standing), Object.prototype,
    'and what crosses back is a PLAIN object and not a live view or an instance: read back with prototype '
      + `${JSON.stringify(Object.getPrototypeOf(standing) === Object.prototype ? 'Object.prototype' : Object.getPrototypeOf(standing))}`);
  assert.deepEqual(Object.keys(standing).sort(), Object.keys(WINDOW).sort(),
    `carrying the members that were written: ${JSON.stringify(Object.keys(standing).sort())}`);
  assert.deepEqual(standing.tabs, WINDOW.tabs,
    `**and the SUBTREE survives the reconstruction** — a repair that created the key and dropped its object `
      + `would answer \`true\` here and fail this line: ${JSON.stringify(standing.tabs)}`);
  assert.equal(rest, 0,
    `and the call returns at rest — the synthetic attempt closed and no attempt stands open `
      + `(\`kernel-registration.mjs:411-412\`): the kernel record's \`live\` holds ${rest}`);

  t.diagnostic(`registration-repair (1) · THE ADD RECONSTRUCTED WHAT IT GUARDS: \`read(['window'])\` refused `
    + `${JSON.stringify(absentShape.status)} (\"${absentShape.message}\") BEFORE the add; the repair ran `
    + `${repairs}× with the record ${JSON.stringify(repairReadings[0].members)} \`{address `
    + `${JSON.stringify(repairReadings[0].address)}, id ${JSON.stringify(repairReadings[0].id)}, tier `
    + `${JSON.stringify(repairReadings[0].tier)}, value ${JSON.stringify(repairReadings[0].value)}, op `
    + `${JSON.stringify(repairReadings[0].op)}, pending ${JSON.stringify(repairReadings[0].pending)}}\`, wrote `
    + `${JSON.stringify(landedRecord.op.opId ?? null)} at ${JSON.stringify(landedRecord.op.address)} and `
    + `answered \`{ok: true, op}\`; \`addConstraint\` answered an identity (${typeof identity}) and did not throw; `
    + `\`read(['window'])\` now answers ${JSON.stringify(standing)}; the store's reach named `
    + `${JSON.stringify(landedRecord.triggered.map((element) => element.handle))} and the kernel's \`live\` is `
    + `${rest}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (2) THE TWO EVALUATIONS, NAMED — the registration instant, and the re-run over the repair's own op
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('registration-repair (2) · THE TWO EVALUATIONS, NAMED: ONE `addConstraint` call asks the pair TWICE — the FIRST reading is `undefined` with `attempt`/`op` ABSENT, a LATER one carries the landed object over THE OP THE REPAIR RETURNED, and that later answer is the PASS', (t) => {
  const store = make();
  // **EVERY INVOCATION IS RECORDED FROM INSIDE THE BODY**, with the members it was handed, the answer it handed
  // back, and whether the repair's write had already landed when it was asked.
  const readings = [];
  let repairs = 0;
  let repaired = false;
  let returnedOp = null;
  store.addConstraint({ address: ['window'], id: ID }, (context) => {
    const reading = {
      address: context.address,
      attempt: context.attempt,
      members: Object.keys(context).sort(),
      op: context.op,
      repairedBeforeThisReading: repaired,
      tier: context.tier,
      value: context.value,
    };
    if (context.value === undefined) {
      const refusal = {
        message: VIOLATION,
        repair: (repairContext) => {
          repairs += 1;
          const landed = store.write(['window'], 'mem', WINDOW, repairContext);
          returnedOp = landed.op;
          repaired = true;
          return { ok: true, op: landed.op };
        },
      };
      reading.answer = refusal.message;
      readings.push(reading);
      return refusal;
    }
    reading.answer = true;
    readings.push(reading);
    return true;
  });
  const afterAdd = readings.length;
  // **THE READ BRACKETS NO COMMIT AND JUDGES NOTHING** (`D-1-bis`; `package-use.md:1048-1050`): if it asked the
  // body, the count below moves and this cell says so.
  const standing = store.read(['window']);
  const afterRead = readings.length;
  const first = readings[0];
  const later = readings[readings.length - 1];
  const absences = readings.filter((reading) => reading.value === undefined).length;

  // ── (a) THE PASS ITSELF, BEFORE ANY READING IS INTERPRETED. ───────────────────────────────────────────
  assert.deepEqual(standing, WINDOW,
    `the call passed and the repair's object stands: the drive read ${JSON.stringify(standing)}`);
  assert.equal(afterRead, afterAdd,
    `**AND THE READ ASKED THE PAIR NOTHING** — a read brackets no commit and runs no check (\`D-1-bis\`; `
      + `\`package-use.md:1049\`): the readings went ${afterAdd} → ${afterRead} across \`read(['window'])\``);

  // ── (b) THE COUNT — TWO INSTANTS AND NO THIRD. ────────────────────────────────────────────────────────
  assert.equal(readings.length >= 2, true,
    `**THE BODY MUST RUN AT LEAST TWICE ACROSS THE SINGLE \`addConstraint\` CALL** — the registration's own `
      + `evaluation and the synthetic attempt's re-run (\`kernel-registration.mjs:306\` and \`:597-610\`): the `
      + `drive recorded ${readings.length} reading(s): ${JSON.stringify(readings.map((reading) => reading.value))}`);
  assert.equal(readings.length, 2,
    `**AND EXACTLY TWO, BECAUSE THIS REPAIR NAMES THE COMMIT AT ITS WRITE'S FOURTH POSITION** (mechanism `
      + `\`3-bis\`: \`bindings/js/index.mjs:339-412\` routes a FOUR-position call to the store's own verb and a `
      + `three-position one into \`K-2\`'s pass) — so the pair's next evaluation is the kernel's re-run and `
      + `nothing else, and a THIRD reading would mean a pass ran over the repair's own landing. The drive `
      + `recorded ${readings.length}: ${JSON.stringify(readings.map((reading) => reading.value))}`);
  assert.equal(absences, 1,
    `and exactly ONE of them met the address ABSENT — \`context.value === undefined\` is the only presence `
      + `datum at the registration instant and it is read once: ${JSON.stringify(readings.map((reading) => reading.value))}`);

  // ── (c) THE FIRST READING IS THE REGISTRATION INSTANT, WITH ITS TWO ABSENCES. ─────────────────────────
  assert.equal(first.value, undefined,
    `**THE FIRST READING IS ABSENCE** — \`readCurrent\`'s swallowed refusal, \`kernel-registration.mjs:360-366\`: `
      + `${JSON.stringify(first.value)}`);
  assert.equal(first.attempt, null,
    `and the registration instant's \`attempt\` is the declared \`null\` (\`:306\`, \`:353\`): `
      + `${JSON.stringify(first.attempt)}`);
  assert.equal(first.op, null,
    `with \`op\` the declared \`null\` (\`:354\`): ${JSON.stringify(first.op)}`);
  assert.equal(first.tier, null,
    `and \`tier\` the declared \`null\` (\`:350\`): ${JSON.stringify(first.tier)}`);
  assert.deepEqual(first.members, CONTEXT_MEMBERS,
    `**THE CONTEXT IS FIVE MEMBERS AND NO SIXTH** (\`:345-356\`; a sixth is refused by name): `
      + `${JSON.stringify(first.members)}`);
  assert.deepEqual(first.address, ADDRESS,
    `and its \`address\` is the pair's own: ${JSON.stringify(first.address)}`);
  assert.notEqual(first.answer, true,
    `and the registration instant's answer is the VIOLATION arm and not the pass — there is the repair to run: `
      + `${JSON.stringify(first.answer)}`);
  assert.equal(first.repairedBeforeThisReading, false,
    'and it was asked BEFORE the repair ran, as the declared order has it');

  // ── (d) THE LATER READING IS THE RE-RUN, OVER THE REPAIR'S OWN OP, AND IT IS THE PASS. ────────────────
  assert.notEqual(first, later,
    'the two readings must be two distinct invocations, or the count above counted one twice');
  assert.deepEqual(later.value, WINDOW,
    `**THE LATER READING CARRIES THE OBJECT THE REPAIR LANDED** — \`registrationRerun\`'s \`value: `
      + `produced.after.value\` (\`:600\`): ${JSON.stringify(later.value)}`);
  assert.equal(later.repairedBeforeThisReading, true,
    `**AND IT HAPPENED AFTER THE REPAIR RETURNED** — so it is the RE-RUN over the repair's own op and not a `
      + `second look at the same state that sent the body into its refusal arm`);
  assert.notEqual(later.attempt, null,
    `its \`attempt\` is the SYNTHETIC ATTEMPT's own \`AttemptRef\` (\`:601\`) and not the \`null\` of the `
      + `registration instant: ${JSON.stringify(later.attempt)}`);
  assert.equal(typeof later.attempt.id, 'string',
    `and that ref carries an id the kernel minted: ${JSON.stringify(later.attempt)}`);
  assert.equal(later.op === returnedOp, true,
    `**AND ITS \`op\` IS THE VERY OP THE REPAIR RETURNED** — the same object, not a copy and not a neighbour `
      + `(\`:603\`'s \`op: produced\`, credited by \`landedOp\`): the drive read `
      + `${JSON.stringify(later.op === null || later.op === undefined ? null : later.op.opId ?? null)} against `
      + `the repair's ${JSON.stringify(returnedOp === null ? null : returnedOp.opId ?? null)}`);
  assert.equal(later.tier, 'mem',
    `the op's own tier rides the re-run's context (\`:599\`): ${JSON.stringify(later.tier)}`);
  assert.deepEqual(later.members, CONTEXT_MEMBERS,
    `and the re-run is handed the SAME five-member shape — it is not the repair's six-member record: `
      + `${JSON.stringify(later.members)}`);
  assert.equal(later.answer, true,
    `**AND THE LATER ANSWER IS THE PASS — \`true\`, the only pass value of \`PAR-C-5\`'s closed set** `
      + `(\`kernel-registration.mjs:329\`, \`:625\`): ${JSON.stringify(later.answer)}`);
  assert.equal(repairs, 1,
    `and the repair itself ran ONCE across the whole call: ${repairs}`);
  assert.equal(store.constraints().length, 1,
    `**AND THE PAIR STANDS REGISTERED** — the re-run's \`true\` is what \`addConstraint\` accepted, and a non-\`true\` `
      + `there would have refused the registration and thrown (\`:529-532\`): \`constraints()\` answers `
      + `${store.constraints().length} row(s)`);

  t.diagnostic(`registration-repair (2) · TWO EVALUATIONS, NAMED: the body was asked ${readings.length}× inside `
    + `ONE \`addConstraint\` call — [1] value=${JSON.stringify(first.value)} attempt=${JSON.stringify(first.attempt)} `
    + `op=${JSON.stringify(first.op)} tier=${JSON.stringify(first.tier)} members=${JSON.stringify(first.members)} `
    + `answer=${JSON.stringify(first.answer)}; [2] value=${JSON.stringify(later.value)} `
    + `attempt=${JSON.stringify(later.attempt)} op=${JSON.stringify(later.op === null || later.op === undefined ? null : later.op.opId)} `
    + `(the op the repair returned: ${JSON.stringify(later.op === returnedOp)}) tier=${JSON.stringify(later.tier)} `
    + `answer=${JSON.stringify(later.answer)}. The absences count ${absences} and the repair ran ${repairs}×; a `
    + `\`read(['window'])\` taken after the add asked the body ${afterRead - afterAdd} further time(s) and answered `
    + `${JSON.stringify(standing)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (3) THE ALREADY-PRESENT ARM — the body passes on its first evaluation and the repair is never invoked
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('registration-repair (3) · THE ALREADY-PRESENT ARM PASSES WITHOUT A REPAIR: a store that HOLDS `window` before the add asks the body ONCE, the add does not throw, THE REPAIR IS NEVER INVOKED, and the object is unchanged', (t) => {
  const store = make();
  // The object stands BEFORE the pair is added — the arm that must NOT reconstruct anything.
  const written = store.write(['window'], 'mem', WINDOW);
  const before = store.read(['window']);
  const readings = [];
  let repairs = 0;
  // **THE CALL IS MADE DIRECTLY AND MUST NOT THROW.** The store's object is present, so the body's first
  // evaluation is the pass and `addConstraint` refuses nothing.
  const identity = store.addConstraint({ address: ['window'], id: ID }, (context) => {
    readings.push({ attempt: context.attempt, op: context.op, tier: context.tier, value: context.value });
    if (context.value === undefined) {
      return {
        message: VIOLATION,
        // **A TRAP AS WELL AS A COUNTER**: this repair REFUSES, so an invocation the counter missed would still
        // fail the cell — the registration would answer `ConstraintRefusedAtRegistration` and throw out of the
        // call above, which no `catch` here would swallow.
        repair: () => {
          repairs += 1;
          return { ok: false, message: 'this repair must never run: the object stood when the pair was added' };
        },
      };
    }
    return true;
  });
  const standing = store.read(['window']);
  const rest = kernelFor(store).live.size;

  // ── (a) THE DRIVE REACHED THE ARM IT CLAIMS. ─────────────────────────────────────────────────────────
  assert.deepEqual(before, WINDOW,
    `the store must HOLD the object before the add — the drive read ${JSON.stringify(before)}`);
  assert.deepEqual(Object.keys(written).sort(), WRITE_RECORD_MEMBERS,
    `and it was written through the declared record: ${JSON.stringify(Object.keys(written))}`);
  assert.equal(typeof identity, 'object',
    `**\`addConstraint\` PASSED AND ANSWERED AN IDENTITY**: it answered a ${typeof identity}`);
  assert.notEqual(identity, null,
    `and not \`null\`: ${JSON.stringify(identity)}`);

  // ── (b) ONE EVALUATION, AND ITS READING IS THE PRESENT VALUE. ────────────────────────────────────────
  assert.equal(readings.length, 1,
    `**AN ALREADY-PRESENT OBJECT PASSES ON THE FIRST EVALUATION** — the registration's own (\`:306\`), with no `
      + `synthetic attempt behind it: the body was asked ${readings.length} time(s): `
      + `${JSON.stringify(readings.map((reading) => reading.value))}`);
  assert.deepEqual(readings[0].value, WINDOW,
    `and what the body was handed IS the value standing at its address: `
      + `${JSON.stringify(readings[0].value)}`);
  assert.equal(readings[0].attempt, null,
    `its \`attempt\` is the registration instant's declared \`null\` — no synthetic attempt was minted: `
      + `${JSON.stringify(readings[0].attempt)}`);
  assert.equal(readings[0].op, null,
    `and its \`op\` is \`null\` too: ${JSON.stringify(readings[0].op)}`);

  // ── (c) THE REPAIR IS NEVER INVOKED, AND THE OBJECT IS UNTOUCHED. ────────────────────────────────────
  assert.equal(repairs, 0,
    `**THE REPAIR IS NEVER INVOKED** — a repair is attempted only on state 3, a VIOLATION carrying one `
      + `(\`kernel-registration.mjs:336-339\`): the drive's own counter reads ${repairs}`);
  assert.deepEqual(standing, WINDOW,
    `**AND THE OBJECT IS UNCHANGED** — byte for byte what stood before the add: the drive read `
      + `${JSON.stringify(standing)}`);
  assert.equal(Object.getPrototypeOf(standing) === Object.prototype, true,
    'and it is read back as a plain object, exactly as the absent arm\'s repaired object is');
  assert.equal(rest, 0,
    `and the call returns at rest with no attempt open: the kernel record's \`live\` holds ${rest}`);
  assert.equal(store.constraints().length, 1,
    `and the pair stands registered: \`constraints()\` answers ${store.constraints().length} row(s)`);

  t.diagnostic(`registration-repair (3) · THE PRESENT ARM: \`window\` was written before the add `
    + `(\`${JSON.stringify(written.op.opId)}\`) and read ${JSON.stringify(before)}; the pair was then added and the `
    + `body was asked ${readings.length}× with value=${JSON.stringify(readings[0].value)}, attempt=`
    + `${JSON.stringify(readings[0].attempt)}, op=${JSON.stringify(readings[0].op)}; THE REPAIR RAN ${repairs}×; `
    + `the read after the add answers ${JSON.stringify(standing)} and the kernel's \`live\` is ${rest}. `
    + `**THE TWO ARMS DIVERGE IN EXACTLY ONE PLACE AND IT IS THE PRESENCE DATUM** — this reading is PRESENT, `
    + `cell (2)'s first reading is \`undefined\`, and the same body answers \`true\` here and the repair arm there`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (4) THE PAIR STANDS REGISTERED IN BOTH ARMS — `constraints()` answers one two-member row per store
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('registration-repair (4) · THE PAIR STANDS REGISTERED IN BOTH ARMS: `store.constraints()` answers exactly ONE row per store — `address` and `id` and NOTHING else, no function, read as a SET — for the store the repair reconstructed and for the store that already held the object', (t) => {
  // **THE BODY IS ONE SHAPE FOR BOTH STORES** — the same pair, the same refusal, the same repair — so the two
  // arms differ only in whether the object stands when the add is made.
  const bodyFor = (store, counter) => (context) => (context.value === undefined
    ? {
        message: VIOLATION,
        repair: (repairContext) => {
          counter.repairs += 1;
          const landed = store.write(['window'], 'mem', WINDOW, repairContext);
          return { ok: true, op: landed.op };
        },
      }
    : true);

  const reconstructed = make();
  const repairedCounter = { repairs: 0 };
  // **BOTH CALLS ARE MADE DIRECTLY: a refusal would escape and fail this cell.**
  const reconstructedIdentity = reconstructed.addConstraint(
    { address: ['window'], id: ID },
    bodyFor(reconstructed, repairedCounter),
  );

  const present = make();
  const presentCounter = { repairs: 0 };
  present.write(['window'], 'mem', WINDOW);
  const presentIdentity = present.addConstraint(
    { address: ['window'], id: ID },
    bodyFor(present, presentCounter),
  );

  const reconstructedRows = reconstructed.constraints();
  // A SECOND CALL, because the read's own declaration is a FRESH array of FRESH two-member objects every time.
  const reconstructedAgain = reconstructed.constraints();
  const presentRows = present.constraints();

  // ── (a) THE DRIVE REACHED BOTH ARMS, EACH THROUGH ITS OWN PATH. ──────────────────────────────────────
  assert.equal(repairedCounter.repairs, 1,
    `the reconstructed arm must have run its repair exactly once, or this cell is reading the wrong arm: `
      + `${repairedCounter.repairs}`);
  assert.equal(presentCounter.repairs, 0,
    `and the present arm must have run none: ${presentCounter.repairs}`);
  assert.equal(typeof reconstructedIdentity, 'object',
    `the reconstructed add answered an identity: a ${typeof reconstructedIdentity}`);
  assert.equal(typeof presentIdentity, 'object',
    `and so did the present one: a ${typeof presentIdentity}`);

  // ── (b) ONE ROW PER STORE, TWO MEMBERS AND NO THIRD. ─────────────────────────────────────────────────
  assert.equal(reconstructedRows.length, 1,
    `**ONE PAIR IS ONE ROW** (\`D-29\`'s keying, read at \`enumerateConstraints\`): the reconstructed store `
      + `answers ${reconstructedRows.length}: ${JSON.stringify(reconstructedRows)}`);
  assert.equal(presentRows.length, 1,
    `and so does the present store: ${JSON.stringify(presentRows)}`);
  for (const [label, rows] of [['reconstructed', reconstructedRows], ['present', presentRows]]) {
    assert.deepEqual(Object.keys(rows[0]).sort(), PAIR_MEMBERS,
      `**"EXACTLY THESE TWO MEMBERS AND NO THIRD"** (\`index.d.ts:1118-1126\`) — no \`fn\`, no \`enabled\`, no opaque `
        + `identity (exclusions 1, 2 and 4): the ${label} row carries ${JSON.stringify(Object.keys(rows[0]))}`);
    assert.equal(typeof rows[0].id, 'string',
      `and \`id\` is the caller's own BARE \`id\` (\`D-24\`: *"The handle becomes the id"*): `
        + `${JSON.stringify(rows[0].id)}`);
    assert.equal(rows[0].id, ID,
      `**AND IT IS THIS PAIR'S OWN \`id\`** — the same string the registration was made under, not a minted `
        + `spelling: the ${label} row reads ${JSON.stringify(rows[0].id)}`);
    assert.equal(Array.isArray(rows[0].address), true,
      `and \`address\` is an array — the pair's own SET at the READ (\`ConstraintPair.address\`'s clause): `
        + `${JSON.stringify(rows[0].address)}`);
    assert.deepEqual(addressSet(rows[0].address), ['window'],
      `**AND THE SET IS THE ADDRESS THE PAIR OWNS, READ AS A SET AND NOT AS A SEQUENCE**: the ${label} row reads `
        + `${JSON.stringify(rows[0].address)} → ${JSON.stringify(addressSet(rows[0].address))}`);
    assert.equal(Object.values(rows[0]).every((value) => typeof value !== 'function'), true,
      `**NO MEMBER OF THE ROW IS A FUNCTION** (exclusion 1 — the anti-pattern rulings' *"do not hand out a value `
        + `whose later use the contract cannot bound"*): the ${label} row's member classes are `
        + `${JSON.stringify(Object.values(rows[0]).map((value) => typeof value))}`);
  }

  // ── (c) THE READ IS FRESH ON EVERY CALL, AND THE TWO ARMS ANSWER THE SAME PAIR. ───────────────────────
  assert.notEqual(reconstructedRows, reconstructedAgain,
    '**`constraints()` ANSWERS A FRESH ARRAY ON EVERY CALL** (`index.d.ts`\'s `constraints` clause): the two '
      + 'calls answered the same array object');
  assert.notEqual(reconstructedRows[0], reconstructedAgain[0],
    `and a FRESH object per element — a caller that mutates one changes nothing the next call returns: `
      + `${JSON.stringify(reconstructedAgain)}`);
  assert.deepEqual(reconstructedAgain, reconstructedRows,
    `and the second call answers the same PAIR: ${JSON.stringify(reconstructedAgain)}`);
  assert.deepEqual(presentRows, reconstructedRows,
    `**BOTH ARMS STAND REGISTERED ALIKE** — the repaired store and the already-present store answer the same row, `
      + `so the repair changed WHAT EXISTS and not WHETHER the pair stands: present `
      + `${JSON.stringify(presentRows)} against reconstructed ${JSON.stringify(reconstructedRows)}`);

  t.diagnostic(`registration-repair (4) · BOTH ARMS REGISTERED: the reconstructed store answers `
    + `${JSON.stringify(reconstructedRows)} (repair ran ${repairedCounter.repairs}×, object `
    + `${JSON.stringify(reconstructed.read(['window']))}) and the already-present store answers `
    + `${JSON.stringify(presentRows)} (repair ran ${presentCounter.repairs}×, object `
    + `${JSON.stringify(present.read(['window']))}). Every row carries exactly `
    + `${JSON.stringify(PAIR_MEMBERS)} and the address set `
    + `${JSON.stringify(addressSet(reconstructedRows[0].address))}; the second call answered the same pair in a `
    + `fresh array of fresh objects`);
});
