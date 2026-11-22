// tests/e2e/creation-sweep-instants.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `U-STOREROOM-CREATION-SWEEP` — GATE 3, THE WIDENING AT THE TWO SINGLE-PAIR ROUTES: `CSW-12`, `CSW-16`,
// `CSW-17`, `CSW-18`, `CSW-21`, `CSW-21b`, `CSW-24`. **EVERY CELL HERE IS `e`** — the package's own surface
// (`addConstraint`, `constraintOn`, a caller's `write`) with a `filePath` where a save is the subject.
//
// **THE RULING.** `D-125` item 1, VERBATIM: *"Widen: `addConstraint`, a re-arm, the boot and the creation ALL
// deliver after their repairs"* — *"the listeners its write fires are delivered — `storeCreate`, a boot over an
// existing `filePath`, `addConstraint`, and a re-arm — after the constraints pass, after the save, in `D-117`'s
// order, instant for instant, with no delivery on a refusing arm."* **AND WHAT THE WIDENING DOES NOT MOVE, BY
// THE SAME ROW** (`D-125` item 3): *"THE SWEEP'S MEMBERSHIP DOES NOT WIDEN WITH THE DELIVERY"* — `addConstraint`
// and a re-arm keep the registration instant's own SINGLE-PAIR scope and can only refuse. `D-125` item 4: a
// pair's SECOND repair attempt *"is an inconsistent result and refuses at rank `20`"*. `D-124` item 2: a fired
// body's throw at these instants is the MINTED rank `21` `ListenerBodyThrew`.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE SIX FACTS THESE CELLS REST ON, EACH AT ITS PIN
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **1 · THE DELIVERED SET AT `addConstraint` AND AT A RE-ARM IS THE STORE'S OWN `triggered`** (`PIN-6` (ii)):
// the `WriteRecord` the repair route already answers — *"It answers THE STORE'S OWN `WriteRecord` —
// `{op, watched, triggered}`, the very record `write` answers"* (`kernel-registration.mjs:506`–`:507`), which
// is the architect's own ground for the widening (*"because the repairs use the write/delete surface"*,
// `strata/decisions.md:6443`–`:6444`).
//
// **2 · THE ONE ARGUMENT IS THE REPAIR'S OWN OP ADDRESS** (`PIN-6` (iv)) — *"at the other three the repair's own
// op address, which the record carries and the reversal's loop already reads"*.
//
// **3 · THE DELIVERY PRECEDES THE ANSWER AT EVERY INSTANT** (`PIN-2`: *"SAVE → DELIVER → THE ANSWER"*), which is
// what makes `D-125` item 2 (i)'s *"the caller's view of a registration gains a third observable"* a fact. **A
// delivery at `addConstraint` DOES NOT change the answer's declared type** (`D-125` item 2): the identity is
// still the answer, and a re-arm still answers `undefined`.
//
// **4 · NO DELIVERY ON A REFUSING ARM** (`PIN-2`; `D-117` item 2's *"no delivery on the failing arm"* read over
// it at `PIN-6` (v)).
//
// **5 · THE CYCLE REFUSES THE REGISTRATION AT RANK `20`** (`D-125` item 4, with `PIN-5` and `Q-11`'s carried
// reading rank `19`), **and the caller receives the throw and not the identity** — *"an add route cannot return
// an inconsistent RESULT"* (`D-125` item 3)'s reading at `§4` `CSW-21`, **so `addConstraint` and a re-arm keep
// their single-pair scope and refuse; the instance and every other pair stand.**
//
// **6 · A FIRED BODY'S THROW AT THESE INSTANTS PRE-EMPTS THE ANSWER AND THE STANDING STANDS** (`PIN-10`;
// `Q-13`: *"the throw pre-empts the answer … the pair **stands registered**, the save stands, **no withdrawal
// arm is declared and no rollback composes**"*).
//
// **THE INSTRUMENTS**: the entry by path (`O4`); `openCommits` (`state.mjs`) and `kernelFor`
// (`kernel-foundations.mjs`) for the at-rest readings `CSW-12` takes — the same two the house's registration
// cells use (`tests/e2e/registration-write-route.test.mjs:87`–`:88`). **`D-17`**: no document is opened at
// runtime. **`D-21`**: every cell prints its readings and fails AT THE ACT where it cannot reach its arm.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';

const make = (extra = {}) => storeCreate({ journalLength: 32, listeners: [], ...extra });

function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

const statusOf = (caught) => (caught !== null && typeof caught === 'object' ? caught.status ?? null : null);
const messageOf = (caught) => (caught !== null && typeof caught === 'object' && typeof caught.message === 'string'
  ? caught.message
  : String(caught));
const logKinds = (caught) => (caught !== null && typeof caught === 'object' && Array.isArray(caught.log)
  ? caught.log.map((entry) => (entry !== null && typeof entry === 'object' ? entry.kind : entry))
  : null);

const CONSTRAINT_PASS_REFUSED = 'ConstraintPassRefused';
const CONSTRAINT_REFUSED_AT_REGISTRATION = 'ConstraintRefusedAtRegistration';
const LISTENER_BODY_THREW = 'ListenerBodyThrew';

const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), `cswi-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
};
const bytesOf = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);
const standing = (instance, address) => {
  const read = attempt(() => instance.read(address));
  return read.ok ? { present: true, value: read.value } : { present: false, refused: statusOf(read.caught) };
};
const addressSet = (address) => {
  const members = Array.isArray(address) && Array.isArray(address[0]) ? address : [address];
  return members.map((member) => member.join('/')).sort();
};

/**
 * **⟶ AND `CSW-16` AND `CSW-24` DRIVE WITHOUT THE HOUSE `shield`, ON THE AMENDMENT THAT DISPOSES OF THEM
 * (`F-7`).** A body that carries a `repair` is ATTEMPTED at its own registration, and the house shield
 * (`tests/e2e/repair-listener-delivery.test.mjs:103`) answers the registration instant — `tier` and `op` BOTH
 * `null` — with `true` so a fixture does not spend its repair there. **AT THE TWO SINGLE-PAIR ROUTES THAT
 * DISCRIMINATION INVERTS ITS PURPOSE**: the registration ask IS these cells' subject, so the shield answers the
 * cell's own refusal, no repair runs, no `triggered` set exists and the delivery is never reached (`asks === []`,
 * `watched.calls.length === 0` for ever). **SO NEITHER CELL SHIELDS ANYTHING**: each body refuses at the
 * registration ask (`context.op === null`; `kernel-registration.mjs:887`–`:890`) and PASSES on the re-run, whose
 * `value` is the credited op's `after.value` (`D-95` (4)). **THE HELPER IS DELETED RATHER THAN LEFT UNUSED**, so a
 * later pass cannot re-inherit the device it removed by ruling.
 */

/** Bind a listener at `address` and answer the record of its invocations. */
function bindWatching(store, handle, address, extra = () => ({})) {
  const calls = [];
  const answered = store.listen(handle, [address]);
  store.register(answered, function listener(...args) {
    calls.push({ argCount: args.length, address: args[0], ...extra() });
  });
  return { handle: answered, calls };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-16` · DELIVERY AT `addConstraint`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-16 · DELIVERY AT `addConstraint` (`PIN-6` (ii), (iv); `PIN-2`; `D-125` items 1, 2) — a pair registered POST-CREATION whose repair writes an address an adopted handle watches: driven with NO `shield`, at the route\'s OWN registration ask, the listener is invoked EXACTLY ONCE, AFTER the save and BEFORE `addConstraint` answers its IDENTITY, with the repair\'s op address as its ONE argument — the answer is still the identity, the pair is carried, and the repair ran ONCE', (t) => {
  // **`D-125` item 2, VERBATIM**: *"A delivery at `addConstraint` DOES NOT change the answer's declared type"* —
  // **the identity is still the answer** — and item 1 puts the delivery *"after the constraints pass, after the
  // save"*. **THE ORDER IS READ AT THE ONE OBSERVABLE THAT CANNOT BE FAKED**: the body records whether the call
  // had already answered when it ran, and the bytes it stood over.
  //
  // **⟶ AMENDED 2026-11-06 (gate 3, post-implementation): THE STATEMENT STANDS AND THE FIRST FIXTURE COULD NOT
  // REACH ITS ARM — ITS TWO FAULTS ARE `F-7`'S AND BOTH ARE REPAIRED HERE.** (i) **The `shield`** answered every
  // context carrying `tier === null && op === null` with `true`, and that pair belongs to the REGISTRATION ask
  // alone — so at `addConstraint` it answered THIS CELL'S OWN REFUSAL, `asks === []`, no repair landed, no
  // `triggered` set existed and `watched.calls.length` was `0` for ever. (ii) **Beneath it** the body refused a
  // value (`context.value !== 2`) that the address it judges never holds, so the arm was unreachable with the
  // shield removed as well. **WHAT IS DRIVEN NOW IS THE ROUTE'S OWN REGISTRATION ASK**: the body refuses there
  // (`context.op === null`) and PASSES on the re-run, whose `value` is the credited op's `after.value` (`D-95`
  // (4)); its repair route-writes the adopted handle's address `['w']` at the `file` tier and returns
  // `{ ok: true, op: <that write's own op> }` — the credit `PIN-7` (ii) requires. **IT NEED NOT WRITE THE PAIR'S
  // OWN ADDRESS**, because the re-run is handed the op's landing and not the pair's address's state.
  const { dir, filePath } = scratch('csw16');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const flags = { answered: false };
  const watched = bindWatching(store, 'W', ['w'], () => ({
    bytesAtDelivery: bytesOf(filePath),
    answered: flags.answered,
    openCommitsAtDelivery: openCommits(store),
  }));
  let repairs = 0;
  const asks = [];
  const add = attempt(() => store.addConstraint({ address: ['a'], id: 'csw16-a' }, (context) => {
    asks.push({ opIsNull: context.op === null, tierIsNull: context.tier === null, value: context.value });
    // **THE REGISTRATION ASK ALONE** (`kernel-registration.mjs:887`–`:890`): `op` and `tier` BOTH `null`.
    if (context.op !== null) return true;
    return {
      message: '`["a"]` must exist',
      repair: (record) => {
        repairs += 1;
        // **THE ROUTE'S THREE POSITIONS** — `(address, tier, value)` — and the CREDIT `PIN-7` (ii) requires.
        return { ok: true, op: record.write(['w'], 'file', 'by-repair').op };
      },
    };
  }));
  flags.answered = true;
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  // ── (a) THE DRIVE REACHED THE SEAT: ONE REGISTRATION ASK, ONE REPAIR. ──────────────────────────────────
  assert.equal(repairs, 1,
    `**THE REPAIR RAN EXACTLY ONCE — WHICH IS WHAT SAYS THE SEAT WAS REACHED AT ALL** (\`D-125\` item 1; `
      + `\`PIN-6\` (ii)): the drive entered it ${repairs} time(s) over `
      + `${JSON.stringify(asks.map((ask) => ({ op: ask.opIsNull, tier: ask.tierIsNull, value: ask.value })))} `
      + `— **the first fixture's \`asks === []\` IS \`F-7\`'S FIRST FAULT AND IT IS NOT THIS READING**`);
  assert.equal(add.ok, true,
    `**THE REGISTRATION MUST STAND** (\`PIN-7\` (iii): the re-run over the landed op admits it): it answered `
      + `${JSON.stringify(add.ok ? 'an identity' : statusOf(add.caught))} with message `
      + `${JSON.stringify(add.ok ? null : messageOf(add.caught))}`);
  assert.equal(watched.calls.length, 1,
    `**THE REPAIR\'S LISTENER IS INVOKED EXACTLY ONCE AT \`addConstraint\`** (\`D-125\` item 1: *"\`addConstraint\` … `
      + `deliver after their repairs"*; \`PIN-6\` (ii): the delivered set is *"THE STORE\'S OWN \`triggered\`"*): `
      + `the drive counted ${watched.calls.length} invocation(s)`);
  assert.equal(watched.calls[0]?.argCount, 1,
    `and its ONE argument is the repair\'s own op address (\`PIN-6\` (iv)): `
      + `${JSON.stringify(watched.calls[0]?.argCount)}`);
  assert.deepEqual(watched.calls[0]?.address, ['w'],
    `**AND THE ADDRESS IT WAS HANDED IS THE REPAIR\'S WRITE\'S** (\`PIN-6\` (iv): *"at the other three the `
      + `repair\'s own op address, which the record carries"*): the body read `
      + `${JSON.stringify(watched.calls[0]?.address)}`);
  assert.equal(watched.calls[0]?.answered, false,
    `**AND THE BODY RAN BEFORE \`addConstraint\` ANSWERED** (\`PIN-2\`: *"SAVE → DELIVER → THE ANSWER"*; `
      + `\`D-125\` item 2 (i): *"the caller\'s view of a registration gains a third observable"*): the body read `
      + `the answered-flag as ${JSON.stringify(watched.calls[0]?.answered)}`);
  assert.equal(String(watched.calls[0]?.bytesAtDelivery).includes('by-repair'), true,
    `**AND AFTER THE SAVE — THE BYTES IT STOOD OVER CARRY THE REPAIR** (\`D-125\` item 1; \`PIN-2\`) — the body `
      + `read ${JSON.stringify(watched.calls[0]?.bytesAtDelivery)} and the path holds ${JSON.stringify(bytes)}`);
  assert.notEqual(add.value, undefined,
    `**AND THE ANSWER IS STILL THE IDENTITY — ITS DECLARED TYPE IS UNMOVED** (\`D-125\` item 2: *"a delivery at `
      + `\`addConstraint\` DOES NOT change the answer\'s declared type"*): the call answered `
      + `${JSON.stringify(add.value)}`);
  assert.equal(subscriptionStands(store), true,
    `and the pair stands registered: \`constraints()\` = ${JSON.stringify(store.constraints())}`);

  function subscriptionStands(instance) {
    const rows = instance.constraints();
    return Array.isArray(rows) && rows.length === 1 && rows[0].id === 'csw16-a';
  }

  t.diagnostic(`CSW-16 · THE DELIVERY AT \`addConstraint\`: the registration answered `
    + `${JSON.stringify(add.ok ? 'an identity' : statusOf(add.caught))}; the repair ran ${repairs}× over `
    + `${asks.length} ask(s); the listener ran ${watched.calls.length}× with `
    + `${JSON.stringify(watched.calls.map((call) => ({
      argCount: call.argCount,
      address: call.address,
      answered: call.answered,
      bytes: call.bytesAtDelivery,
      openCommits: call.openCommitsAtDelivery,
    })))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-17` · DELIVERY AT A RE-ARM
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-17 · DELIVERY AT A RE-ARM (`PIN-6` (ii); `PIN-2`; `D-125` item 1) — the SAME instant driven through `constraintOn`: the re-registration\'s `K-1` reaches a repair whose write fires an adopted handle, delivered ONCE, AFTER the save, BEFORE `constraintOn` answers `undefined`', (t) => {
  // **`D-125` item 1 names the re-arm by name**: *"`addConstraint`, a re-arm, the boot and the creation ALL
  // deliver after their repairs"*. **THE DRIVE IS `FSC-ARM1-H`'s** (`tests/e2e/file-save-coverage.test.mjs:132`):
  // the pair is held and its state removed, so the re-arm is the only act that can move it — **and the re-arm's
  // body is `entry.fn`, the element the ENTRY carried, because carriage is pair-keyed**
  // (`index.mjs`'s `constraintOn` clause) — so the repairing body is the one supplied at `addConstraint`.
  const { dir, filePath } = scratch('csw17');
  const store = make({ filePath });
  const address = { address: ['h'], id: 'csw17-h' };
  const flags = { answered: false };
  const watched = bindWatching(store, 'W', ['w'], () => ({
    bytesAtDelivery: bytesOf(filePath),
    answered: flags.answered,
  }));
  const body = (context) => (context.value !== undefined
    ? true
    : {
        message: '`["h"]` must exist',
        repair: (record) => ({ ok: true, op: record.write(['w'], 'file', 'by-the-rearm').op }),
      });
  store.write(['h'], 'file', 'settled');
  const added = attempt(() => store.addConstraint(address, body));
  const disabled = added.ok ? attempt(() => store.constraintOff(address, body)) : null;
  const cleared = disabled !== null && disabled.ok ? attempt(() => store.delete(['h'], 'file')) : null;
  watched.calls.length = 0;
  const rearmed = cleared !== null && cleared.ok ? attempt(() => store.constraintOn(address, body)) : null;
  flags.answered = true;
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  assert.equal(added.ok && disabled.ok && cleared.ok, true,
    `the drive must reach the re-arm — \`addConstraint\`, \`constraintOff\` and the \`delete\` all have to stand: `
      + `${JSON.stringify({
        add: added.ok ? 'ok' : statusOf(added.caught),
        off: disabled === null ? null : (disabled.ok ? 'ok' : statusOf(disabled.caught)),
        clear: cleared === null ? null : (cleared.ok ? 'ok' : statusOf(cleared.caught)),
      })}`);
  assert.equal(rearmed !== null && rearmed.ok, true,
    `**AND THE RE-ARM MUST STAND — IT ANSWERS \`undefined\`** (\`§2.12\` item 2 (a); \`D-125\` item 2: *"the identity `
      + `is still the answer"* at \`addConstraint\` and \`undefined\` at the re-arm): it answered `
      + `${JSON.stringify(rearmed === null ? null : (rearmed.ok ? String(rearmed.value) : statusOf(rearmed.caught)))}`);
  assert.equal(rearmed === null ? null : rearmed.value, undefined,
    `and its answer is exactly \`undefined\`: ${JSON.stringify(rearmed === null ? null : rearmed.value)}`);
  assert.equal(watched.calls.length, 1,
    `**THE RE-ARM'S REPAIR FIRES THE ADOPTED HANDLE ONCE** (\`D-125\` item 1; \`PIN-6\` (ii)): the drive counted `
      + `${watched.calls.length} invocation(s) — **TODAY A RE-ARM DELIVERS NOTHING** `
      + `(\`kernel-registration.mjs:510\`–\`:512\`)`);
  assert.deepEqual(watched.calls[0]?.address, ['w'],
    `**AND THE ONE ARGUMENT IS THE REPAIR'S OP ADDRESS** (\`PIN-6\` (iv)): the body read `
      + `${JSON.stringify(watched.calls[0]?.address)}`);
  assert.equal(watched.calls[0]?.answered, false,
    `**AND THE BODY RAN BEFORE \`constraintOn\` ANSWERED** (\`PIN-2\`): the answered-flag read `
      + `${JSON.stringify(watched.calls[0]?.answered)}`);
  assert.equal(String(watched.calls[0]?.bytesAtDelivery).includes('by-the-rearm'), true,
    `**AND AFTER THE SAVE** (\`PIN-2\`: *"SAVE → DELIVER"*): the body read `
      + `${JSON.stringify(watched.calls[0]?.bytesAtDelivery)} and the path holds ${JSON.stringify(bytes)}`);
  t.diagnostic(`CSW-17 · THE DELIVERY AT A RE-ARM: the re-arm answered `
    + `${JSON.stringify(rearmed === null ? null : rearmed.ok ? 'undefined' : statusOf(rearmed.caught))}; the `
    + `listener ran ${watched.calls.length}× with ${JSON.stringify(watched.calls)}; the path holds `
    + `${JSON.stringify(bytes)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-18` · NO DELIVERY ON THE TWO SINGLE-PAIR REFUSING ARMS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-18 · NO DELIVERY ON THE TWO SINGLE-PAIR REFUSING ARMS (`PIN-2`; `PIN-6` (v); `D-117` item 2) — an `addConstraint` and a `constraintOn` whose repair is ROLLED BACK on a `D-107` refusing arm invoke NOTHING: zero invocations, no throw from a listener, and the refusal is the REGISTRATION\'s own — while the same pair PASSING at the same route delivers once', (t) => {
  // **`D-117` item 2's *"no delivery on the failing arm"*, read over the widened seat at `PIN-6` (v)**: *"a
  // registration whose repair the `D-107` composition rolled back delivers NOTHING"*. **THE CONTROL AT EACH
  // ROUTE IS WHAT MAKES THE TWO ZEROS MEANINGFUL**, and it is what fails on today's tree beside them.
  const { dir, filePath } = scratch('csw18');
  const rows = [];

  const drive = (label, refusing, instant) => {
    const store = make({ filePath });
    const watched = bindWatching(store, 'W', ['w']);
    const address = { address: ['a'], id: `csw18-${label}` };
    const body = (context) => {
      if (context.value !== undefined) return true;
      return {
        message: '`["a"]` must exist',
        repair: (record) => {
          record.write(['w'], 'mem', 1);
          // **THE `D-107` REFUSING ARM** — the repair lands and then DECLINES, so the registration refuses and
          // its route's landing is composed away.
          return refusing ? { ok: false, message: 'the repair declines' } : { ok: true, op: record.write(['a'], 'mem', 'settled').op };
        },
      };
    };
    let outcome;
    if (instant === 'addConstraint') {
      outcome = attempt(() => store.addConstraint(address, body));
    } else {
      store.write(['a'], 'mem', 'settled');
      const added = attempt(() => store.addConstraint(address, body));
      const off = added.ok ? attempt(() => store.constraintOff(address, body)) : null;
      const cleared = off !== null && off.ok ? attempt(() => store.delete(['a'])) : null;
      watched.calls.length = 0;
      outcome = cleared !== null && cleared.ok ? attempt(() => store.constraintOn(address, body)) : null;
    }
    rows.push({ label, instant, refusing, fires: watched.calls.length, status: outcome === null || outcome.ok ? 'returned' : statusOf(outcome.caught) });
    return { outcome, watched };
  };

  const addRefused = drive('add-refused', true, 'addConstraint');
  const addControl = drive('add-control', false, 'addConstraint');
  const rearmRefused = drive('rearm-refused', true, 'constraintOn');
  const rearmControl = drive('rearm-control', false, 'constraintOn');
  rmSync(dir, { recursive: true, force: true });

  // ── (a) THE TWO REFUSING ARMS INVOKE NOTHING. ─────────────────────────────────────────────────────────
  for (const [label, arm] of [['addConstraint', addRefused], ['constraintOn', rearmRefused]]) {
    assert.equal(arm.outcome !== null && arm.outcome.ok === false, true,
      `**THE ${label} REFUSING ARM MUST REFUSE, AND THE REFUSAL IS THE REGISTRATION'S OWN** (\`D-107\` item 1: `
        + `*"Any refusal should be rolling back"*): it answered `
        + `${JSON.stringify(arm.outcome === null ? 'no outcome' : (arm.outcome.ok ? 'a success' : statusOf(arm.outcome.caught)))}`);
    assert.equal([CONSTRAINT_REFUSED_AT_REGISTRATION, CONSTRAINT_PASS_REFUSED].includes(statusOf(arm.outcome.caught)), true,
      `and it crosses a code whose subject is the CONSTRAINT — the registration instant's own rank \`19\` or the `
        + `pass's rank \`20\` (\`contract.md:4289\`, \`:4652\`): ${JSON.stringify(statusOf(arm.outcome.caught))}`);
    assert.equal(arm.watched.calls.length, 0,
      `**AND IT INVOKES NOTHING — ZERO INVOCATIONS AT THE ${label} REFUSING ARM** (\`PIN-2\`: *"with no delivery `
        + `on a refusing arm"*; \`PIN-6\` (v): *"a registration whose repair the \`D-107\` composition rolled back `
        + `delivers NOTHING"*): the listener ran ${arm.watched.calls.length} time(s)`);
  }

  // ── (b) AND THE PASSING CONTROLS AT THE SAME TWO ROUTES DELIVER ONCE. ─────────────────────────────────
  for (const [label, arm] of [['addConstraint', addControl], ['constraintOn', rearmControl]]) {
    assert.equal(arm.outcome !== null && arm.outcome.ok, true,
      `**THE ${label} PASSING CONTROL MUST STAND**: it answered `
        + `${JSON.stringify(arm.outcome === null ? 'no outcome' : (arm.outcome.ok ? 'a success' : statusOf(arm.outcome.caught)))}`);
    assert.equal(arm.watched.calls.length, 1,
      `**AND IT DELIVERS ONCE — SO THE ZERO ABOVE IS THE REFUSING ARM'S AND NOT A MISSING SEAT** `
        + `(\`D-125\` item 1; \`PIN-6\` (ii)): the ${label} control fired ${arm.watched.calls.length} time(s)`);
  }

  t.diagnostic(`CSW-18 · THE TWO REFUSING ARMS: ${JSON.stringify(rows)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-24` · THE THROW WHERE AN IDENTITY ALREADY STANDS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-24 · THE THROW WHERE AN IDENTITY ALREADY STANDS (`PIN-10`; `Q-13`; `D-124` item 2) — an `addConstraint` whose fired body throws: the caller receives rank `21` `ListenerBodyThrew` and NOT the identity, the pair STANDS REGISTERED (`constraints()` names it), NO rollback composes, the `file` bytes stand, and the body is ASKED AGAIN at a later write at that address', (t) => {
  // **`Q-13`'s answer is the declaration's**: *"not undone. The throw pre-empts the answer (`PIN-2`: delivery
  // before the answer), the pair **stands registered**, the save stands, **no withdrawal arm is declared and no
  // rollback composes**"*. **`D-125` residual `3` is what it answers** (*"whether the registration is undone is
  // unstated"*), and `PIN-10` names the member: *"at a registration that has already answered an identity …
  // THE THROW PRE-EMPTS THE ANSWER AND THE STANDING STANDS."*
  //
  // **⟶ AMENDED 2026-11-06 (gate 3, post-implementation): THE STATEMENT WAS OWED AND THE FIRST FIXTURE COULD NOT
  // REACH IT — AND ONE OF ITS LIMBS IS STRUCK WITH ITS REASON.** **THE UNREACHABLE ARM WAS `CSW-16`'S AND IT WAS
  // THE SAME `shield`** (`F-7`): the registration ask was answered `true`, no repair ran, `addConstraint`
  // answered its identity and nothing threw. **WHAT IS DRIVEN NOW**: no `shield`; a body that refuses at the
  // registration ask (`context.op === null` — the one ask that carries that pair) and passes on the re-run; a
  // repair that route-writes the watched `['w']` at `file`, where a REGISTERED body throws.
  //
  // **STRUCK — *"and a later write at that address is still refused by it"* — BECAUSE IT IS FALSE AT THE BYTES
  // AND NOT BECAUSE IT IS INCONVENIENT**: at a caller's `write` the pass's context `value` is the landed op's
  // `after.value` (`kernel-attempt.mjs:732`), so a body that refuses `undefined` passes there and the write
  // STANDS (measured: `write(['x'],'mem','w2')` returns). **THE LIVENESS LIMB IS RE-PINNED AS THE ASK**: a later
  // write at `['x']` **asks the body again** — its ask-count rises — and `constraints()` still names the pair —
  // **a ghost is asked nothing, and that is the observable the struck limb was reaching for.**
  const { dir, filePath } = scratch('csw24');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const thrownBody = new Error('the add-route listener throws');
  const watched = [];
  const answered = store.listen('W', [['w']]);
  store.register(answered, () => { watched.push('fired'); throw thrownBody; });
  let asks = 0;
  const add = attempt(() => store.addConstraint({ address: ['x'], id: 'csw24-x' }, (context) => {
    asks += 1;
    // **THE REGISTRATION ASK ALONE** (`kernel-registration.mjs:887`–`:890`): `op` and `tier` BOTH `null`.
    if (context.op !== null || context.tier !== null) return true;
    return {
      message: '`["x"]` must exist',
      repair: (record) => ({ ok: true, op: record.write(['w'], 'file', 'landed-by-the-repair').op }),
    };
  }));
  const rows = store.constraints();
  const landedAtTheRepair = attempt(() => store.read(['w']));
  const openAtTheAnswer = openCommits(store);
  const liveAtTheAnswer = kernelFor(store).live.size;
  const bytes = bytesOf(filePath);
  const asksAtTheAnswer = asks;
  const laterWrite = attempt(() => store.write(['x'], 'mem', 'refused-by-the-standing-pair'));
  const rowsAfterTheWrite = store.constraints();
  rmSync(dir, { recursive: true, force: true });

  assert.equal(add.ok, false,
    `**THE CALLER RECEIVES THE THROW AND NOT THE IDENTITY** (\`PIN-10\`: *"the caller receives the throw and `
      + `never the identity"*): the call RETURNED ${JSON.stringify(add.ok ? add.value : null)}`);
  assert.equal(statusOf(add.caught), LISTENER_BODY_THREW,
    `**AND IT IS THE MINTED RANK \`21\` \`ListenerBodyThrew\`** (\`D-124\` item 2; \`D-125\` item 2: *"a fired body's `
      + `throw at those instants is \`D-124\` item 2's rank \`21\` \`ListenerBodyThrew\` by the same reading"*): the `
      + `refusal answered ${JSON.stringify(statusOf(add.caught))} with message `
      + `${JSON.stringify(messageOf(add.caught))}`);
  assert.equal(watched.length, 1,
    `and the body DID run exactly once — the throw is the body's: ${watched.length} invocation(s)`);
  assert.deepEqual(rows.map((row) => row.id), ['csw24-x'],
    `**AND THE PAIR STANDS REGISTERED — \`constraints()\` STILL NAMES IT** (\`Q-13\`: *"the pair remains `
      + `registered, its save stands, and no withdrawal arm is declared"*): \`constraints()\` read `
      + `${JSON.stringify(rows.map((row) => ({ id: row.id, address: addressSet(row.address) })))}`);
  assert.equal(landedAtTheRepair.ok, true,
    `**AND THE REPAIR'S LANDING STANDS — NO ROLLBACK COMPOSES** (\`PIN-10\`: *"NO ROLLBACK COMPOSES AT ANY OF `
      + `THEM"*): \`read(['w'])\` answered `
      + `${JSON.stringify(landedAtTheRepair.ok ? landedAtTheRepair.value : statusOf(landedAtTheRepair.caught))}`);
  assert.equal(openAtTheAnswer, 0,
    `and no commit window stands on the instance after the throw (\`PIN-2\`: the answer was reached): `
      + `${JSON.stringify(openAtTheAnswer)}`);
  assert.equal(liveAtTheAnswer, 0,
    `and no attempt is left open — the throw pre-empts the answer and leaves no live attempt: `
      + `${JSON.stringify(liveAtTheAnswer)}`);
  assert.equal(bytes !== null && bytes.includes('landed-by-the-repair'), true,
    `**AND THE \`file\` BYTES STAND** (\`Q-13\`: *"the save stands"*): the file read ${JSON.stringify(bytes)}`);
  // ── THE RE-PINNED LIVENESS LIMB: THE BODY IS ASKED AGAIN (`§4` `CSW-24`'s struck limb's replacement). ──
  assert.equal(laterWrite.ok, true,
    `**A LATER WRITE AT THE PAIR'S ADDRESS STANDS — THE STRUCK LIMB, MEASURED AND NOT ASSUMED** `
      + `(\`kernel-attempt.mjs:732\`: the pass's \`value\` is the landed op's \`after.value\`, so the body admits `
      + `it): the write answered `
      + `${JSON.stringify(laterWrite.ok ? laterWrite.value : statusOf(laterWrite.caught))}`);
  assert.equal(asks > asksAtTheAnswer, true,
    `**AND IT ASKED THE BODY AGAIN — A GHOST IS ASKED NOTHING, AND THAT IS THE OBSERVABLE THE STRUCK LIMB WAS `
      + `REACHING FOR** (\`§4\` \`CSW-24\`; \`PIN-4\` (i)'s \`carried\`): the ask-count rose from `
      + `${asksAtTheAnswer} to ${asks}`);
  assert.deepEqual(rowsAfterTheWrite.map((row) => row.id), ['csw24-x'],
    `and the pair is still carried after that write: `
      + `${JSON.stringify(rowsAfterTheWrite.map((row) => row.id))}`);
  t.diagnostic(`CSW-24 · THE THROW WHERE AN IDENTITY STANDS: the call answered `
    + `${JSON.stringify(statusOf(add.caught))}; \`constraints()\` names `
    + `${JSON.stringify(rows.map((row) => row.id))}; the repair's landing reads `
    + `${JSON.stringify(landedAtTheRepair.ok ? landedAtTheRepair.value : statusOf(landedAtTheRepair.caught))}; `
    + `the later write at \`["x"]\` answered `
    + `${JSON.stringify(laterWrite.ok ? 'a value' : statusOf(laterWrite.caught))} and raised the ask-count from `
    + `${asksAtTheAnswer} to ${asks}; the file read ${JSON.stringify(bytes)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-21` · THE CYCLE AT THE ADD ROUTE · `CSW-21b` · THE CYCLE AT THE RE-ARM
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-21 · THE CYCLE AT THE ADD ROUTE (`PIN-5`; `D-125` items 3, 4; `Q-11`) — an `addConstraint` at a pair that would repair a SECOND time: the REGISTRATION refuses at rank `20` `ConstraintPassRefused` (rank `19` the carried reading), the caller receives the throw and not the identity, and the INSTANCE and EVERY OTHER PAIR stand', (t) => {
  // **`D-125` item 4 at a single-pair route**: *"at `addConstraint` and a re-arm the REGISTRATION refuses"* —
  // **and `D-125` item 3 says why the sweep must not widen with it**: *"a creation's answer is a store and an
  // add route's answer is an identity, so *\"an inconsistent result\"* is a state only the former can return"*.
  // **`Q-11`'s default pins rank `20` at all four instants with rank `19` the CARRIED reading**, and this cell
  // asserts the pin: *"a cell that finds `19` here is a `Q-11` re-read and not a failure of the behaviour."*
  const store = make();
  const kept = attempt(() => store.addConstraint({ address: ['kept'], id: 'kept' }, () => true));
  let repairs = 0;
  let asks = 0;
  const add = attempt(() => store.addConstraint({ address: ['q'], id: 'csw21-q' }, (context) => {
    asks += 1;
    if (context.value === 'settled') return true;
    return {
      message: '`["q"]` must be "settled"',
      repair: (record) => {
        repairs += 1;
        // **THE REPAIR LEAVES A VALUE THE BODY STILL REFUSES**, so the registration's own re-run asks again and
        // a SECOND repair is what would land — the cycle, at a route whose answer is an identity.
        return { ok: true, op: record.write(['q'], 'mem', 'raw').op };
      },
    };
  }));
  const rowsAfter = store.constraints();
  const keptStanding = attempt(() => store.read(['kept']));

  assert.equal(kept.ok, true,
    `the drive's other pair must stand before the cycle is driven: `
      + `${JSON.stringify(kept.ok ? 'ok' : statusOf(kept.caught))}`);
  assert.equal(add.ok, false,
    `**THE REGISTRATION REFUSES — THE CALLER RECEIVES THE THROW AND NOT THE IDENTITY** (\`D-125\` item 4; `
      + `\`§4\` \`CSW-21\`): the call RETURNED ${JSON.stringify(add.ok ? add.value : null)}`);
  assert.equal(statusOf(add.caught), CONSTRAINT_PASS_REFUSED,
    `**AND AT RANK \`20\` \`ConstraintPassRefused\` — \`Q-11\`'s pinned reading, with rank \`19\` the CARRIED one** `
      + `(\`PIN-5\`: *"L1 PINS \`20\` AT THE ADD ROUTE AND CARRIES \`19\`"*; \`contract.md:4312\`: *"it is not the `
      + `\`…AtRegistration\` family of rank \`19\` — that member is the registration *verdict*, a different instant `
      + `and a different subject"*): the refusal answered ${JSON.stringify(statusOf(add.caught))} with message `
      + `${JSON.stringify(messageOf(add.caught))}`);
  assert.equal(repairs <= 1, true,
    `**AND THE PAIR NEVER LANDED A SECOND REPAIR** (\`D-124\` item 1: *"the same constraint should not attempt `
      + `a repair twice"*; \`PIN-4\` (i)): it repaired ${repairs} time(s) over ${asks} ask(s)`);
  assert.deepEqual(rowsAfter.map((row) => row.id), ['kept'],
    `**AND THE INSTANCE AND EVERY OTHER PAIR STAND** (\`D-125\` item 3's single-pair scope; \`§4\` \`CSW-21\`): `
      + `\`constraints()\` reads ${JSON.stringify(rowsAfter.map((row) => row.id))}`);
  assert.equal(keptStanding.ok === false && statusOf(keptStanding.caught) === 'AddressNotFound', true,
    `and the other pair's address is untouched and unwritten by the refused registration: `
      + `\`read(["kept"])\` answered `
      + `${JSON.stringify(keptStanding.ok ? keptStanding.value : statusOf(keptStanding.caught))} (\`D-125\` item 3: `
      + `an add route's refused registration leaves the instance and every other pair standing)`);
  t.diagnostic(`CSW-21 · THE CYCLE AT THE ADD ROUTE: the registration answered `
    + `${JSON.stringify(add.ok ? 'an identity' : statusOf(add.caught))} with message `
    + `${JSON.stringify(add.ok ? null : messageOf(add.caught))}; the repair ran ${repairs}× over ${asks} ask(s); `
    + `\`constraints()\` = ${JSON.stringify(rowsAfter.map((row) => row.id))}`);
});

test('CSW-21b · THE CYCLE AT THE RE-ARM (`PIN-5`; `D-125` items 3, 4; `Q-15`) — a `constraintOn` whose re-registration would repair a SECOND time: the TOGGLE refuses at rank `20`, and the INSTANCE and every other pair stand — \`Q-15\`\'s own default: *"the toggle refuses; the instance and every other pair stand"*', (t) => {
  // **`Q-15`, the declaration's one open question**: *"At a re-arm, does a cycle refuse the TOGGLE and leave the
  // instance and every other pair standing, or does it refuse more? — **Default: the toggle refuses; the
  // instance and every other pair stand** — a re-arm's answer is `undefined`, the registration instant keeps
  // its single-pair scope (`D-125` item 3), and nothing about a store is at stake there."*
  const store = make();
  const kept = attempt(() => store.addConstraint({ address: ['kept'], id: 'kept' }, () => true));
  const address = { address: ['h'], id: 'csw21b-h' };
  let repairs = 0;
  const cycling = (context) => {
    if (context.value === 'settled') return true;
    return {
      message: '`["h"]` must be "settled"',
      repair: (record) => {
        repairs += 1;
        // **THE REPAIR LEAVES `"raw"`, WHICH THE BODY STILL REFUSES** — so the re-arm's re-run asks again and a
        // second repair would land.
        return { ok: true, op: record.write(['h'], 'mem', 'raw').op };
      },
    };
  };
  store.write(['h'], 'mem', 'settled');
  const added = attempt(() => store.addConstraint(address, cycling));
  const disabled = added.ok ? attempt(() => store.constraintOff(address, cycling)) : null;
  const cleared = disabled !== null && disabled.ok ? attempt(() => store.delete(['h'])) : null;
  repairs = 0;
  const rearmed = cleared !== null && cleared.ok ? attempt(() => store.constraintOn(address, cycling)) : null;
  const rowsAfter = store.constraints();

  assert.equal(added.ok && disabled.ok && cleared.ok, true,
    `the drive must reach the re-arm: ${JSON.stringify({
      add: added.ok ? 'ok' : statusOf(added.caught),
      off: disabled === null ? null : (disabled.ok ? 'ok' : statusOf(disabled.caught)),
      clear: cleared === null ? null : (cleared.ok ? 'ok' : statusOf(cleared.caught)),
    })}`);
  assert.equal(rearmed !== null && rearmed.ok, false,
    `**THE TOGGLE REFUSES — the re-arm is the act the cycle refuses** (\`D-125\` item 4: *"at \`addConstraint\` `
      + `and a re-arm the REGISTRATION refuses"*; \`Q-15\`): it RETURNED `
      + `${JSON.stringify(rearmed === null ? null : (rearmed.ok ? String(rearmed.value) : null))}`);
  assert.equal(statusOf(rearmed.caught), CONSTRAINT_PASS_REFUSED,
    `**AND AT RANK \`20\`** (\`PIN-5\`; \`Q-11\`'s pinned reading with rank \`19\` carried): it answered `
      + `${JSON.stringify(statusOf(rearmed.caught))} with message ${JSON.stringify(messageOf(rearmed.caught))}`);
  assert.equal(repairs <= 1, true,
    `and no second repair landed: ${repairs} repair(s) at the re-arm`);
  assert.deepEqual(rowsAfter.map((row) => row.id).sort(), ['csw21b-h', 'kept'],
    `**AND THE INSTANCE AND EVERY OTHER PAIR STAND** (\`Q-15\`: *"the toggle refuses; the instance and every `
      + `other pair stand"*): \`constraints()\` reads ${JSON.stringify(rowsAfter.map((row) => row.id))}`);
  assert.equal(kept.ok, true,
    `the other pair stands: ${JSON.stringify(kept.ok ? 'ok' : statusOf(kept.caught))}`);
  t.diagnostic(`CSW-21b · THE CYCLE AT THE RE-ARM: the toggle answered `
    + `${JSON.stringify(rearmed === null ? null : (rearmed.ok ? 'undefined' : statusOf(rearmed.caught)))}; the `
    + `repair ran ${repairs}×; \`constraints()\` = ${JSON.stringify(rowsAfter.map((row) => row.id))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-12` · THE ORDER — A BODY SEES THE SAVED BYTES AND THE ACT RETURNS AT REST
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-12 · THE ORDER (`PIN-2`; `D-125` item 1) — at the creation, at `addConstraint` and at a re-arm a body that runs at the delivery observes the SAVED bytes on disk, and each act RETURNS AT REST: no commit window stands and no attempt is left open on the instance', (t) => {
  // **`PIN-2`, REDRAWN**: *"ASK → REPAIRS LAND → RE-RUN → SAVE → DELIVER → THE ANSWER, at `storeCreate`-with-the-
  // boot, at `addConstraint` and at a re-arm."* **THE AT-REST HALF IS `index.mjs:1743`–`:1745`'s own clause**:
  // *"a \`listen\` the construction itself performs is not counted as a commit the caller opened and leaves the
  // count at \`0\` on the return"* — so the count and the kernel's `live` map are read on the returned instance.
  const { dir, filePath } = scratch('csw12');
  const rows = [];

  // ── THE CREATION: the listener is adopted through `cfg.listeners` because the delivery happens DURING the
  // construction, before any instance exists.
  const creationFires = [];
  const creation = attempt(() => make({
    filePath,
    listeners: [{
      address: ['k'],
      handle: 'K',
      listener: function listener(...args) {
        creationFires.push({ argCount: args.length, address: args[0], bytesAtDelivery: bytesOf(filePath) });
      },
    }],
    constraints: [{
      address: ['k'],
      id: 'csw12-k',
      constraint: (context) => (context.value !== undefined
        ? true
        : { message: '`["k"]` must exist', repair: (record) => ({ ok: true, op: record.write(['k'], 'file', 'by-the-creation').op }) }),
    }],
  }));
  rows.push({
    instant: 'creation',
    status: creation.ok ? 'returned' : statusOf(creation.caught),
    fires: creationFires.length,
    sawSavedBytes: creationFires.length > 0 && String(creationFires[0].bytesAtDelivery).includes('by-the-creation'),
  });
  const creationRest = creation.ok
    ? { open: openCommits(creation.value), live: kernelFor(creation.value).live.size }
    : null;

  // ── `addConstraint` AND THE RE-ARM: the listener is bound through the product's two declared acts, so these
  // arms are red on the DELIVERY and not on the element's shape.
  const routeArm = (instant) => {
    const store = make({ filePath });
    const calls = [];
    const bound = store.listen('W', [['w']]);
    store.register(bound, function listener(...args) {
      calls.push({ argCount: args.length, address: args[0], bytesAtDelivery: bytesOf(filePath) });
    });
    const address = { address: ['p'], id: `csw12-${instant}` };
    const body = (context) => (context.value !== undefined
      ? true
      : { message: '`["p"]` must exist', repair: (record) => ({ ok: true, op: record.write(['w'], 'file', `by-${instant}`).op }) });
    let outcome;
    if (instant === 'addConstraint') {
      outcome = attempt(() => store.addConstraint(address, body));
    } else {
      store.write(['p'], 'mem', 'settled');
      const added = attempt(() => store.addConstraint(address, body));
      const off = added.ok ? attempt(() => store.constraintOff(address, body)) : null;
      const cleared = off !== null && off.ok ? attempt(() => store.delete(['p'])) : null;
      calls.length = 0;
      outcome = cleared !== null && cleared.ok ? attempt(() => store.constraintOn(address, body)) : null;
    }
    rows.push({
      instant,
      status: outcome === null || outcome.ok ? 'returned' : statusOf(outcome.caught),
      fires: calls.length,
      sawSavedBytes: calls.length > 0 && String(calls[0].bytesAtDelivery).includes(`by-${instant}`),
    });
    return { outcome, rest: { open: openCommits(store), live: kernelFor(store).live.size } };
  };
  const addArm = routeArm('addConstraint');
  const rearmArm = routeArm('re-arm');
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  // ── (a) EVERY ARM RAN, AND EVERY BODY STOOD OVER THE SAVED BYTES. ─────────────────────────────────────
  for (const row of rows) {
    assert.equal(row.status, 'returned',
      `**THE ${row.instant} ARM MUST RETURN** (\`PIN-2\`: the order ends with THE ANSWER): it answered `
        + `${JSON.stringify(row.status)}`);
    assert.equal(row.fires, 1,
      `**AND ITS ONE BODY OBSERVES THE SAVED BYTES ONLY IF IT RUNS AT ALL — WHICH IS THE DELIVERY \`D-125\` `
        + `ITEM 1 PUTS AT THIS INSTANT** (\`PIN-2\`: *"SAVE → DELIVER → THE ANSWER"*): the ${row.instant} arm `
        + `fired ${row.fires} time(s) — **TODAY THE REGISTRATION INSTANTS DELIVER NOTHING** `
        + `(\`kernel-registration.mjs:510\`–\`:512\`, \`:888\`–\`:889\`)`);
    assert.equal(row.sawSavedBytes, true,
      `**AND THE BYTES THE BODY STOOD OVER ARE THE SAVED ONES** (\`PIN-2\`; \`D-106\` item 1's save at the `
        + `registration's own passing close): the ${row.instant} arm read ${JSON.stringify(row)} and the path `
        + `holds ${JSON.stringify(bytes)}`);
  }

  // ── (b) AND EVERY ACT RETURNS AT REST. ────────────────────────────────────────────────────────────────
  assert.deepEqual(creationRest, { open: 0, live: 0 },
    `**THE CONSTRUCTION RETURNS AT REST — NO WINDOW STANDING, NO ATTEMPT OPEN** (\`index.mjs:1743\`–\`:1745\`: `
      + `*"a \`listen\` the construction itself performs is not counted as a commit the caller opened and leaves `
      + `the count at \`0\` on the return"*): the reading was ${JSON.stringify(creationRest)}`);
  assert.deepEqual(addArm.rest, { open: 0, live: 0 },
    `and \`addConstraint\` returns at rest: ${JSON.stringify(addArm.rest)}`);
  assert.deepEqual(rearmArm.rest, { open: 0, live: 0 },
    `and so does the re-arm: ${JSON.stringify(rearmArm.rest)}`);
  t.diagnostic(`CSW-12 · THE ORDER: ${JSON.stringify(rows)}; the rest readings read `
    + `creation=${JSON.stringify(creationRest)} addConstraint=${JSON.stringify(addArm.rest)} `
    + `re-arm=${JSON.stringify(rearmArm.rest)}; the path holds ${JSON.stringify(bytes)}`);
});
