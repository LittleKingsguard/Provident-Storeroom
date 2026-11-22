// tests/e2e/creation-sweep-listeners.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `U-STOREROOM-CREATION-SWEEP` — GATE 3, THE ELEMENT, THE REFUSAL AND THE DELIVERY AT THE CREATION AND THE
// BOOT: `CSW-04`, `CSW-05`, `CSW-06`, `CSW-07`, `CSW-08`, `CSW-09`, `CSW-10`, `CSW-23`, `CSW-26` and the
// property row `P-CSW-2`. **EVERY CELL HERE IS `e`** — `storeCreate` at the package's own surface, with a
// `filePath` where a save (or its absence) is the subject.
//
// **THE PINS.** `PIN-8` (`D-123` item 2, `Q-9`): the `cfg.listeners[]` element gains a THIRD member,
// `listener: Listener`, it is REQUIRED, and **it never crosses** — *"THE ELEMENT'S THIRD MEMBER IS DROPPED
// HERE AND ONLY HERE … THE PACKAGE ARMS THE SUBSTANCE"* (`frame.mjs:70`–`:74`, `D-26`'s move one key over).
// `PIN-9`: an entry carrying no function is REFUSED AT STEP 2, **before any filesystem act**, in the form the
// encoder already answers that position with (`boundaryReject('AddressMalformed', 'listeners', …)`) and **no
// code is minted for it**. `PIN-6` (i), (iii), (iv), (v): the creation's and the boot's delivered set is
// **the adopted set ∩ the addresses that RESOLVE in the register**, once per distinct handle, with the
// listener's own watched address as its one argument, **and never on a refusing arm** (`PIN-2`).
// `PIN-10` (`D-124` item 2): a creation-fired body that throws refuses at **rank `21`
// `ListenerBodyThrew`, minted**, and `PIN-12` leaves the passing sibling's saved landing standing.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT EACH CELL READS, AND WHY NO CELL READS MORE
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// · `CSW-04` reads the REFUSAL AND THE FILESYSTEM: `PIN-9`'s whole claim is *"before any filesystem act"*, so
//   the observable is that no file stands at `filePath` after the call, beside the refusal's own code and
//   subject.
// · `CSW-05` reads the CROSSING: the element is admitted, the store's own trigger record still answers the
//   two members `{address, handle}` (`src/records.rs:253`–`:260`, `contract.md:908`/`:910` — frozen by
//   `PIN-14`), and a fresh instance over an equal `filePath` loads NO listener (`DD-38`).
// · `CSW-06`, `CSW-23` read the DELIVERY at the creation and at the boot, and its ORDER (`PIN-2`: ask →
//   repairs land → re-run → SAVE → DELIVER), which the body observes as the bytes it stands over and as the
//   constraint's own ask-count at the instant it is reached.
// · `CSW-07` reads the SILENCE of a watched address that does not resolve — and pairs it with a WITNESS bound
//   at an address that does, so the zero is a zero of the delivery rule and not of a dead binding.
// · `CSW-08` reads ONE INVOCATION PER DISTINCT HANDLE at the creation and at a re-arm's repair (`PIN-6`
//   (iii): the reversal's running handle list, `constraints.mjs:3009`–`:3037`).
// · `CSW-09` reads NO DELIVERY ON A REFUSING ARM (`PIN-2`) beside a passing control at the same instant.
// · `CSW-10` reads the THROW (`PIN-10`) and `PIN-12`'s standing bytes.
// · `CSW-26` reads EMPTY AS A COUNT OF ZERO AT ALL FOUR INSTANTS (`PIN-6` (v); `D-125` residual `2`; `Q-12`),
//   and distinguishes it from the ROLLED-BACK arm by the count and by the refusal, never by an absence of
//   observation.
//
// **THE INSTRUMENTS ARE THE HOUSE'S** (`D-17`: the expectation is a literal here and the citation is a
// comment; `D-21`: every cell prints its readings, and a cell that cannot reach its arm fails AT THE ACT and
// prints the refusal it caught). The entry is reached BY PATH (`O4`); a listener is armed through the
// product's two declared acts where a cell is not about the `cfg` element (`D-22`, `D-98`: the caller spells
// the handle). **NO CELL ASSERTS AN ORDER WITHIN A STORE'S RETURNED SET** (`DD-22`: the store's list has no
// declared order), and **no cell asserts a per-handle address where one act fired a handle twice.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

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

/** The two members the store's own listener record still answers, read off a returned trigger set
 *  (`TriggerPair`, `index.d.ts`: `{handle, address}`) — `PIN-14`: the third member never crosses. */
const TRIGGER_MEMBERS = ['address', 'handle'];
const handlesOf = (set) => (Array.isArray(set) ? set.map((element) => (
  element !== null && typeof element === 'object' ? element.handle : element
)) : null);

/** `PIN-10`'s minted member. **`D-124` item 2**: *"A CREATION-FIRED BODY THAT THROWS REFUSES AT A MINTED
 *  RANK `21` `ListenerBodyThrew`"*, the closed set moving `20 → 21`. */
const LISTENER_BODY_THREW = 'ListenerBodyThrew';
/** `PIN-9`'s form: the member the encoder already answers the `listeners` position with. */
const ADDRESS_MALFORMED = 'AddressMalformed';

const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), `cswl-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
};
const bytesOf = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);

/**
 * **THE ELEMENT `PIN-8` DECLARES** — the store's own `{address, handle}` record plus the ONE member this unit
 * adds, spelled for its own type as `D-26` spells a pair's member (`constraint: Constraint` → this key's
 * `listener: Listener`, `index.d.ts:519`).
 */
const adopted = (address, handle, listener) => ({ address, handle, listener });

/** A body that records the count of its own invocations and the argument it was handed. */
function watching(label) {
  const calls = [];
  const listener = function listener(...args) {
    calls.push({ label, argCount: args.length, address: args[0], at: null });
  };
  return { listener, calls };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-04` · THE FUNCTION-LESS ENTRY — REFUSED BEFORE ANY FILESYSTEM ACT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-04 · THE FUNCTION-LESS ENTRY (`PIN-9`; `D-123` item 2) — `listeners: [{ address: [\'a\'], handle: \'L\' }]` carrying NO function is REFUSED at step 2, BEFORE THE EXCLUSIVE CREATE: the call answers `AddressMalformed` naming `listeners`, and NO FILE STANDS AT `filePath` afterwards', (t) => {
  // **THE ARCHITECT'S OWN GROUND, WHICH IS THE RULING'S** (`D-123` item 2, verbatim): *"Why would a listener
  // that doesn't have a function to fire on the listened address be accepted?"* — and `PIN-9` places the
  // refusal at `index.mjs:166`–`:171`, *"the last instant at which a refusal can leave nothing behind"*
  // (`contract.md §10.4` part 5). **THE FILESYSTEM LIMB IS THE PIN'S WHOLE POINT**: a check placed in the
  // arming loop would refuse AFTER the exclusive create had left the store's own zero-length file on disk.
  const { dir, filePath } = scratch('csw04');
  const construction = attempt(() => make({
    filePath,
    listeners: [{ address: ['a'], handle: 'L' }],
  }));
  const refusalStatus = construction.ok ? null : statusOf(construction.caught);
  const refusalMessage = construction.ok ? null : messageOf(construction.caught);
  const leftBehind = existsSync(filePath);
  rmSync(dir, { recursive: true, force: true });

  assert.equal(construction.ok, false,
    `**AN ENTRY THAT CARRIES NO FUNCTION IS REFUSED — IT IS NOT A LISTENER** (\`D-123\` item 2; \`PIN-9\`): `
      + `**THE CONSTRUCTION RETURNED AN INSTANCE**, and the entry was adopted as a handle with a body owed `
      + `later — the RESERVATION reading \`D-123\` item 2 WITHDRAWS at this entry point`);
  assert.equal(refusalStatus, ADDRESS_MALFORMED,
    `**AND THE FORM IS THE ENCODER'S OWN — \`AddressMalformed\`, NO CODE MINTED FOR IT** (\`PIN-9\`: *"the form `
      + `is \`frame.mjs:25\`'s (\`boundaryReject('AddressMalformed', 'listeners', …)\`), the same member and the `
      + `same subject the two-member refusal answers today"*): the refusal answered `
      + `${JSON.stringify(refusalStatus)} with message ${JSON.stringify(refusalMessage)}`);
  assert.equal(String(refusalMessage).includes('listeners'), true,
    `**AND ITS SUBJECT IS THE \`listeners\` POSITION** (\`PIN-9\`): the message reads `
      + `${JSON.stringify(refusalMessage)}`);
  assert.equal(leftBehind, false,
    `**AND NO FILE STANDS AT \`filePath\` AFTERWARDS — THE REFUSAL PRECEDES THE EXCLUSIVE CREATE** `
      + `(\`PIN-9\`: *"AN ENTRY THAT CARRIES NO FUNCTION IS REFUSED AT STEP 2, BEFORE ANY FILESYSTEM ACT"*; `
      + `\`contract.md §10.4\` part 5): the path answered ${JSON.stringify(leftBehind)}`);

  t.diagnostic(`CSW-04 · THE FUNCTION-LESS ENTRY: the call answered `
    + `${JSON.stringify(construction.ok ? 'AN INSTANCE' : refusalStatus)} with message `
    + `${JSON.stringify(refusalMessage)}; a file at \`filePath\` after the call: ${JSON.stringify(leftBehind)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-05` · THE THIRD MEMBER IS ADMITTED AND DOES NOT CROSS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-05 · THE THIRD MEMBER IS ADMITTED AND DOES NOT CROSS (`PIN-8`; `PIN-14`) — an element carrying `listener` is ADMITTED; the store\'s own trigger record still answers exactly `{address, handle}`; and a FRESH instance over an equal `filePath` loads NO listener', (t) => {
  // **`PIN-8`**: *"the element gains a third member, `listener: Listener`, IT IS REQUIRED, AND IT NEVER
  // CROSSES … the store's record, `ListenerEntry` and `src/args.rs` do not move"* — and `PIN-14` freezes the
  // store's two-member record by name (`src/store.rs:748`–`:754`: *"no function is stored, because the record
  // has no place to put one"*). **THE THREE READINGS**: (a) the element is admitted; (b) the store's own
  // returned trigger set is still two-membered; (c) `DD-38` — a fresh instance over an equal path *"loads no
  // registration"* — so no listener crosses the file either.
  const { dir, filePath } = scratch('csw05');
  const witness = watching('csw05-watch');
  const construction = attempt(() => make({
    filePath,
    listeners: [adopted(['a'], 'L', witness.listener)],
  }));
  const constructionStatus = construction.ok ? null : statusOf(construction.caught);

  // ── (a) THE ELEMENT IS ADMITTED. ──────────────────────────────────────────────────────────────────────
  assert.equal(construction.ok, true,
    `**AN ELEMENT CARRYING \`listener\` IS ADMITTED** (\`PIN-8\`; \`D-123\` item 2: *"the element gains a third `
      + `member … THE PACKAGE ARMS THE SUBSTANCE"*): the construction answered `
      + `${JSON.stringify(constructionStatus)} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))} — **TODAY THE ENCODER `
      + `COUNTS THE KEYS (\`frame.mjs:31\`: \`keys.length !== 2\`) AND REFUSES THE THIRD**`);

  if (construction.ok) {
    // ── (b) AND THE STORE'S RECORD IS STILL TWO MEMBERS. ────────────────────────────────────────────────
    const written = attempt(() => construction.value.write(['a'], 'file', 'present'));
    assert.equal(written.ok, true,
      `the drive must land a version at the adopted address: `
        + `${JSON.stringify(written.ok ? null : statusOf(written.caught))}`);
    const triggered = written.ok ? written.value.triggered : null;
    const names = handlesOf(triggered);
    assert.equal(Array.isArray(names) && names.includes('L'), true,
      `**THE ADOPTED HANDLE IS THE STORE'S OWN AND IS RETURNED IN ITS TRIGGERED SET** (\`D-22\`/\`D-98\`: the `
        + `caller spells the handle): the record read ${JSON.stringify(triggered)}`);
    const entryMembers = triggered.find((element) => element !== null && typeof element === 'object'
      && element.handle === 'L');
    assert.deepEqual(Object.keys(entryMembers ?? {}).sort(), TRIGGER_MEMBERS,
      `**AND THAT ELEMENT ANSWERS EXACTLY THE STORE'S TWO MEMBERS — \`{address, handle}\` — BECAUSE THE `
        + `FUNCTION NEVER CROSSES** (\`PIN-8\`; \`PIN-14\` freezes \`src/store.rs:748\`–\`:754\`, `
        + `\`src/args.rs:302\` and \`src/records.rs:253\`–\`:260\` at the closed two-member set): it read `
        + `${JSON.stringify(Object.keys(entryMembers ?? {}).sort())}`);

    // ── (c) A FRESH INSTANCE OVER AN EQUAL `filePath` LOADS NO LISTENER. ─────────────────────────────────
    const fresh = attempt(() => make({ filePath }));
    assert.equal(fresh.ok, true,
      `a fresh instance over an equal \`filePath\` must construct: `
        + `${JSON.stringify(fresh.ok ? null : statusOf(fresh.caught))}`);
    const freshWrite = fresh.ok ? attempt(() => fresh.value.write(['a'], 'mem', 'second')) : null;
    const freshNames = freshWrite !== null && freshWrite.ok ? handlesOf(freshWrite.value.triggered) : null;
    assert.equal(Array.isArray(freshNames) && freshNames.includes('L'), false,
      `**AND IT LOADS NO LISTENER — \`DD-38\`: *"a fresh \`storeCreate\` over an equal path LOADS NO `
        + `REGISTRATION"*** (\`contract.md:563\`; \`src/store.rs\`, the boot-load that *"performs the load and `
        + `nothing else"*): the fresh instance's write read ${JSON.stringify(freshNames)}`);
  }
  rmSync(dir, { recursive: true, force: true });

  t.diagnostic(`CSW-05 · THE THIRD MEMBER: the construction answered ${JSON.stringify(constructionStatus)}; `
    + `the store's trigger record members read ${JSON.stringify(TRIGGER_MEMBERS)}; the witness fired `
    + `${witness.calls.length}×`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-06` · THE CREATION'S DELIVERED SET — ADOPTED ∩ EXISTING, AFTER THE CONSTRAINTS PASS, ONE ARGUMENT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-06 · THE CREATION\'S DELIVERY (`PIN-6` (i), (iv); `PIN-2`; `D-123` item 2) — an adopted listener whose watched address RESOLVES is invoked EXACTLY ONCE, AFTER the constraints pass and AFTER the save, with its own watched address as its ONE argument (`argCount === 1`)', (t) => {
  // **`PIN-6` (i)**: *"AT THE CREATION AND THE BOOT the delivered set is the ADOPTED set ∩ the addresses that
  // RESOLVE in the register"*, by the reversal's own mechanism (*"one `deliver` call per address in creation
  // order with the running handle list held ACROSS the calls"*, `constraints.mjs:3009`–`:3037`). **`PIN-6`
  // (iv)**: *"THE ONE ARGUMENT IS THE TRIGGERING ADDRESS — at the creation the listener's own watched
  // address (`Q-3`'s default)"*. **`PIN-2`**: ask → repairs land → re-run → SAVE → DELIVER, so the body stands
  // over the SAVED bytes and stands after the constraints have been asked.
  const { dir, filePath } = scratch('csw06');
  const seed = make({ filePath });
  seed.write(['a'], 'file', 'present');
  const witness = watching('csw06-watch');
  const asks = [];
  let deliveries = 0;
  const construction = attempt(() => make({
    filePath,
    listeners: [adopted(['a'], 'L', function listener(...args) {
      deliveries += 1;
      witness.calls.push({
        label: 'csw06',
        argCount: args.length,
        address: args[0],
        asksAtDelivery: asks.length,
        bytesAtDelivery: bytesOf(filePath),
      });
    })],
    constraints: [{
      address: ['k'],
      id: 'csw06-k',
      constraint: (context) => {
        asks.push(context.value);
        if (context.value !== undefined) return true;
        return {
          message: '`["k"]` must exist',
          repair: (record) => ({ ok: true, op: record.write(['k'], 'file', 'repaired').op }),
        };
      },
    }],
  }));
  const constructionStatus = construction.ok ? null : statusOf(construction.caught);
  const first = witness.calls[0] ?? null;
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  // ── (a) THE DRIVE REACHED ITS ARM. ────────────────────────────────────────────────────────────────────
  assert.equal(construction.ok, true,
    `**THE CONSTRUCTION MUST RETURN AN INSTANCE** — the repair lands and no pair refuses: it answered `
      + `${JSON.stringify(constructionStatus)} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}`);
  assert.equal(deliveries, 1,
    `**THE ADOPTED LISTENER IS INVOKED EXACTLY ONCE** (\`PIN-6\` (i); \`D-123\` item 2: *"every adopted `
      + `listener whose watched address EXISTS is fired"*): the drive counted ${deliveries} invocation(s) — `
      + `**TODAY THE REGISTRATION INSTANT REACHES NO DELIVERY SEAM AT ALL** `
      + `(\`kernel-registration.mjs:888\`–\`:889\`: *"IT STILL OPENS NO \`K-2\` AND STILL DELIVERS NO `
      + `LISTENER"*, the clause \`D-125\` item 1 closes)`);

  // ── (b) ONE ARGUMENT, AND IT IS THE LISTENER'S OWN WATCHED ADDRESS. ───────────────────────────────────
  assert.equal(first !== null && first.argCount, 1,
    `**THE INVOCATION TAKES ONE ARGUMENT** (\`PAR-JS-12\`; \`PIN-6\` (iv): *"THE ONE ARGUMENT IS THE `
      + `TRIGGERING ADDRESS"*): the body read \`arguments.length === `
      + `${JSON.stringify(first === null ? null : first.argCount)}\``);
  assert.deepEqual(first === null ? null : first.address, ['a'],
    `**AND IT IS THE LISTENER'S OWN WATCHED ADDRESS** (\`PIN-6\` (iv): *"at the creation the listener's own `
      + `watched address (\`Q-3\`'s default)"*): the body was handed `
      + `${JSON.stringify(first === null ? null : first.address)}`);

  // ── (c) AFTER THE CONSTRAINTS PASS AND AFTER THE SAVE. ────────────────────────────────────────────────
  assert.equal(first !== null && first.asksAtDelivery >= 2, true,
    `**THE BODY IS REACHED ONLY ONCE THE CONSTRAINTS HAVE PASSED** (\`PIN-2\`: *"ASK → REPAIRS LAND → RE-RUN → `
      + `SAVE → DELIVER"*; \`D-117\` item 2's order, instant for instant): the constraint had been asked `
      + `${JSON.stringify(first === null ? null : first.asksAtDelivery)} time(s) when the body ran — `
      + `**NOT ONCE, WHICH IS THE REGISTRATION'S OWN ASK ALONE AND NOT THE PASS**`);
  assert.equal(first !== null && typeof first.bytesAtDelivery === 'string', true,
    `and the body could read the store's file at its own instant: `
      + `${JSON.stringify(first === null ? null : first.bytesAtDelivery)}`);
  assert.equal(first !== null && String(first.bytesAtDelivery).includes('repaired'), true,
    `**AND THE BYTES IT READ ALREADY CARRY THE REPAIR — THE SAVE PRECEDED THE DELIVERY** (\`PIN-2\`; `
      + `\`D-106\` item 1's save at the registration's own passing close): the body read `
      + `${JSON.stringify(first === null ? null : first.bytesAtDelivery)} and the path holds `
      + `${JSON.stringify(bytes)}`);

  t.diagnostic(`CSW-06 · THE CREATION'S DELIVERY: the construction answered `
    + `${JSON.stringify(constructionStatus)}; the listener was invoked ${deliveries}× with `
    + `${JSON.stringify(first === null ? null : { argCount: first.argCount, address: first.address, asks: first.asksAtDelivery, bytes: first.bytesAtDelivery })}; `
    + `the constraint was asked ${asks.length}× with ${JSON.stringify(asks)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-07` · A WATCHED ADDRESS THAT DOES NOT RESOLVE IS SILENT, AND IS NOT A REFUSAL
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-07 · THE NOT-EXISTING-ADDRESS SILENCE (`PIN-7`; `D-123` item 3) — an adopted listener whose watched address does NOT resolve: NO invocation, NO code, NO log entry and NO throw, and the construction returns its instance; a WITNESS adopted at an address that DOES resolve fires once beside it', (t) => {
  // **`PIN-7`, VERBATIM**: *"A LISTENER WHOSE WATCHED ADDRESS DOES NOT RESOLVE IS NOT FIRED, AND THAT IS NOT A
  // REFUSAL. No invocation, no code, no log entry and no throw"* — the architect's own qualifier (*"fire all
  // ones with an EXISTING address"*, `D-123` item 3) read at the listener. **THE WITNESS IS WHAT MAKES THE
  // ZERO MEANINGFUL**: a tree that simply dropped every adopted listener would satisfy the silent arm and
  // fail the witness arm.
  const { dir, filePath } = scratch('csw07');
  const seed = make({ filePath });
  seed.write(['here'], 'file', 'present');
  const silent = watching('csw07-silent');
  const witness = watching('csw07-witness');
  const construction = attempt(() => make({
    filePath,
    listeners: [
      adopted(['nowhere'], 'SILENT', silent.listener),
      adopted(['here'], 'WITNESS', witness.listener),
    ],
  }));
  const constructionStatus = construction.ok ? null : statusOf(construction.caught);
  rmSync(dir, { recursive: true, force: true });

  assert.equal(construction.ok, true,
    `**THE CONSTRUCTION RETURNS ITS INSTANCE — AN UNRESOLVING WATCHED ADDRESS IS NOT A REFUSAL** (\`PIN-7\`; `
      + `\`D-123\` item 3): it answered ${JSON.stringify(constructionStatus)} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))} and log `
      + `${JSON.stringify(construction.ok ? null : logKinds(construction.caught))}`);
  assert.equal(silent.calls.length, 0,
    `**NO INVOCATION FOR THE ABSENT ADDRESS** (\`PIN-7\`): the silent listener ran `
      + `${silent.calls.length} time(s)`);
  assert.equal(witness.calls.length, 1,
    `**AND THE WITNESS AT THE ADDRESS THAT RESOLVES FIRES ONCE — SO THE ZERO ABOVE IS THE RULE'S AND NOT A `
      + `DEAD BINDING'S** (\`PIN-6\` (i); \`PIN-7\`): it ran ${witness.calls.length} time(s) with `
      + `${JSON.stringify(witness.calls.map((call) => call.address))}`);
  assert.deepEqual(witness.calls[0]?.address, ['here'],
    `and it was handed its own watched address (\`PIN-6\` (iv)): `
      + `${JSON.stringify(witness.calls[0]?.address)}`);
  t.diagnostic(`CSW-07 · THE SILENCE: the construction answered ${JSON.stringify(constructionStatus)}; the `
    + `absent-address listener ran ${silent.calls.length}× and the witness ${witness.calls.length}× with `
    + `${JSON.stringify(witness.calls.map((call) => call.address))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-08` · ONE INVOCATION PER DISTINCT HANDLE — AT THE CREATION AND AGAIN AT A RE-ARM'S REPAIR
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-08 · ONE INVOCATION PER DISTINCT HANDLE (`PIN-6` (iii); `D-125` item 1) — one handle adopted at TWO existing addresses fires ONCE at the creation, at the FIRST address that names it; and at a RE-ARM whose repair\'s write triggers the same handle at two addresses, it fires ONCE again', (t) => {
  // **`PIN-6` (iii)**: *"ONCE PER DISTINCT HANDLE at every instant — the running list is the mechanism, so an
  // identity two addresses would fire fires once, at the first that names it; `delivery.mjs:156`–`:183` and
  // `:188`–`:208` are unmoved"* (`D-123` item 2's mechanism, which is `D-117`'s reversal's own,
  // `constraints.mjs:3009`–`:3037`).
  const { dir, filePath } = scratch('csw08');
  const seed = make({ filePath });
  seed.write(['a'], 'file', 'present');
  seed.write(['b'], 'file', 'present');

  // ── (a) THE CREATION: one handle, two addresses, ONE invocation. ──────────────────────────────────────
  const creation = watching('csw08-creation');
  const construction = attempt(() => make({
    filePath,
    listeners: [adopted(['a'], 'L', creation.listener), adopted(['b'], 'L', creation.listener)],
  }));
  const creationStatus = construction.ok ? null : statusOf(construction.caught);

  // ── (b) A RE-ARM WHOSE REPAIR TRIGGERS THE SAME HANDLE AT TWO ADDRESSES. ──────────────────────────────
  const store = make({ filePath });
  const rearm = watching('csw08-rearm');
  const bound = store.listen('L', [['w1'], ['w2']]);
  store.register(bound, rearm.listener);
  store.write(['w1'], 'mem', { k: 0 });
  store.write(['w2'], 'mem', { k: 0 });
  const body = (context) => {
    if (context.value !== undefined) return true;
    return {
      message: '`["h"]` must exist',
      repair: (record) => {
        const landed = record.write(['h'], 'mem', 'settled').op;
        record.write(['w1', 'k'], 'mem', 1);
        record.write(['w2', 'k'], 'mem', 1);
        return { ok: true, op: landed };
      },
    };
  };
  const added = attempt(() => store.addConstraint({ address: ['h'], id: 'h' }, body));
  const disabled = added.ok ? attempt(() => store.constraintOff({ address: ['h'], id: 'h' }, body)) : null;
  const cleared = disabled !== null && disabled.ok ? attempt(() => store.delete(['h'])) : null;
  rearm.calls.length = 0;
  const rearmed = cleared !== null && cleared.ok
    ? attempt(() => store.constraintOn({ address: ['h'], id: 'h' }, body))
    : null;
  rmSync(dir, { recursive: true, force: true });

  // ── (a) THE CREATION'S ONE INVOCATION. ────────────────────────────────────────────────────────────────
  assert.equal(construction.ok, true,
    `**THE CONSTRUCTION MUST RETURN AN INSTANCE** (\`PIN-8\`; \`D-123\` item 2): it answered `
      + `${JSON.stringify(creationStatus)} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}`);
  assert.equal(creation.calls.length, 1,
    `**ONE HANDLE ADOPTED AT TWO EXISTING ADDRESSES FIRES ONCE** (\`PIN-6\` (iii): *"an identity two addresses `
      + `would fire fires once, at the first address that names it"*; \`surface.md §2.4\` rule 3): the drive `
      + `counted ${creation.calls.length} invocation(s) with `
      + `${JSON.stringify(creation.calls.map((call) => call.address))}`);
  assert.deepEqual(creation.calls[0]?.address, ['a'],
    `**AND IT IS THE FIRST ADDRESS THAT NAMES IT, IN CREATION ORDER** (\`PIN-6\` (i): the running list is held `
      + `ACROSS the per-address \`deliver\` calls, so the first call that names the handle fires it): the body `
      + `was handed ${JSON.stringify(creation.calls[0]?.address)}`);

  // ── (b) THE RE-ARM'S ONE INVOCATION. ──────────────────────────────────────────────────────────────────
  assert.equal(added.ok && disabled.ok && cleared.ok, true,
    `the drive must reach the re-arm — \`addConstraint\`, \`constraintOff\` and the \`delete\` that empties the `
      + `pair's address all have to stand: ${JSON.stringify({
        add: added.ok ? 'ok' : statusOf(added.caught),
        off: disabled === null ? null : (disabled.ok ? 'ok' : statusOf(disabled.caught)),
        clear: cleared === null ? null : (cleared.ok ? 'ok' : statusOf(cleared.caught)),
      })}`);
  assert.equal(rearmed !== null && rearmed.ok, true,
    `**THE RE-ARM MUST STAND** (\`§2.12\` item 2 (a): \`constraintOn\` answers \`undefined\`): it answered `
      + `${JSON.stringify(rearmed === null ? null : (rearmed.ok ? 'undefined' : statusOf(rearmed.caught)))}`);
  assert.equal(rearm.calls.length, 1,
    `**AND THE RE-ARM'S REPAIR FIRES THE HANDLE ONCE — THOUGH ITS TWO WRITES NAME IT AT TWO ADDRESSES** `
      + `(\`PIN-6\` (iii) read at \`D-125\` item 1's four instants: *"the repair's own \`triggered\`"*, deduped by `
      + `the running list): the drive counted ${rearm.calls.length} invocation(s) with `
      + `${JSON.stringify(rearm.calls.map((call) => call.address))} — **TODAY A REGISTRATION INSTANT DELIVERS `
      + `NOTHING AT ALL** (\`D-125\` item 1's superseded clause, \`kernel-registration.mjs:510\`–\`:512\`)`);
  assert.equal(rearm.calls[0]?.argCount, 1,
    `and that invocation takes its ONE argument (\`PIN-6\` (iv)): `
      + `${JSON.stringify(rearm.calls[0]?.argCount)}`);

  t.diagnostic(`CSW-08 · ONE INVOCATION PER DISTINCT HANDLE: at the creation the handle fired `
    + `${creation.calls.length}× with ${JSON.stringify(creation.calls.map((call) => call.address))}; at the `
    + `re-arm it fired ${rearm.calls.length}× with ${JSON.stringify(rearm.calls.map((call) => call.address))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-09` · NO DELIVERY ON A REFUSING ARM
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-09 · NO DELIVERY ON A REFUSING ARM (`PIN-2`; `D-117` item 2; `PIN-6` (v)) — a construction whose sweep REFUSES delivers NOTHING to any adopted handle, and a PASSING control at the same instant delivers ONCE', (t) => {
  // **`PIN-2`, LAST CLAUSE**: *"WITH NO DELIVERY ON A REFUSING ARM"* (`D-123` item 2; `D-117` item 2's *"no
  // delivery on the failing arm"* read over it at `PIN-6` (v)). **THE CONTROL IS THE HOUSE'S OWN DEVICE**: a
  // zero beside a live one, so the zero cannot be the zero of a missing seat.
  const { dir, filePath } = scratch('csw09');
  const seed = make({ filePath });
  seed.write(['a'], 'file', 'present');

  const refusedWitness = watching('csw09-refused');
  const refused = attempt(() => make({
    filePath,
    listeners: [adopted(['a'], 'L', refusedWitness.listener)],
    constraints: [{
      address: ['gate'],
      id: 'gate',
      constraint: () => ({ message: 'the gate refuses every construction' }),
    }],
  }));
  const refusedStatus = refused.ok ? null : statusOf(refused.caught);

  const controlWitness = watching('csw09-control');
  const control = attempt(() => make({
    filePath,
    listeners: [adopted(['a'], 'L', controlWitness.listener)],
    constraints: [{
      address: ['gate'],
      id: 'gate',
      constraint: (context) => (context.value !== undefined
        ? true
        : { message: 'the gate admits the construction', repair: (record) => ({ ok: true, op: record.write(['gate'], 'mem', 1).op }) }),
    }],
  }));
  rmSync(dir, { recursive: true, force: true });

  assert.equal(refused.ok, false,
    `**THE REFUSING ARM MUST REFUSE** (\`PIN-5\`; the pair answers non-\`true\` at its own registration): the `
      + `call RETURNED ${JSON.stringify(refused.ok ? 'an instance' : null)}`);
  assert.equal(refusedWitness.calls.length, 0,
    `**AND IT DELIVERS NOTHING — ZERO INVOCATIONS** (\`PIN-2\`: *"with no delivery on a refusing arm"*; `
      + `\`D-117\` item 2): the adopted listener ran ${refusedWitness.calls.length} time(s) on the refused act `
      + `(${JSON.stringify(refusedStatus)})`);
  assert.equal(control.ok, true,
    `**THE PASSING CONTROL MUST STAND** — otherwise the zero above is a zero of a broken drive: the control `
      + `answered ${JSON.stringify(control.ok ? 'an instance' : statusOf(control.caught))}`);
  assert.equal(controlWitness.calls.length, 1,
    `**AND THE SAME INSTANT, PASSING, DELIVERS ONCE** (\`PIN-6\` (i)): the control fired its adopted listener `
      + `${controlWitness.calls.length} time(s) — **a registration instant that delivers nothing while this `
      + `control fires is the FAILURE MODE \`§6\` item 2 names**`);
  t.diagnostic(`CSW-09 · THE REFUSING ARM: the refused construction answered `
    + `${JSON.stringify(refusedStatus)} and fired ${refusedWitness.calls.length}×; the passing control fired `
    + `${controlWitness.calls.length}×`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-10` · THE THROW — RANK `21`, AND THE PASSING SIBLING'S SAVED BYTES STAND
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-10 · THE THROW (`PIN-10`; `D-124` item 2; `PIN-12`) — a creation-fired body that throws: the construction is REFUSED with rank `21` `ListenerBodyThrew` (MINTED), NO instance exists, and the `file` bytes a PASSING SIBLING registration saved still stand', (t) => {
  // **`D-124` item 2, VERBATIM**: *"A CREATION-FIRED BODY THAT THROWS REFUSES AT A MINTED RANK `21`
  // `ListenerBodyThrew`"* and *"The closed fail set moves `20 → 21`"*. `PIN-10`: **no rollback composes at the
  // instant**, because the delivery sits after the save and `D-107`'s composition is spent per route — so
  // `PIN-12`'s *"every earlier sibling registration's already-saved `file` landing"* STANDS.
  const { dir, filePath } = scratch('csw10');
  const thrownBody = new Error('the creation-fired listener throws');
  const construction = attempt(() => make({
    filePath,
    listeners: [adopted(['k'], 'L', () => { throw thrownBody; })],
    constraints: [{
      address: ['k'],
      id: 'passing-sibling',
      constraint: (context) => (context.value !== undefined
        ? true
        : { message: '`["k"]` must exist', repair: (record) => ({ ok: true, op: record.write(['k'], 'file', 'saved-by-sibling').op }) }),
    }],
  }));
  const refusalStatus = construction.ok ? null : statusOf(construction.caught);
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  assert.equal(construction.ok, false,
    `**THE CONSTRUCTION IS REFUSED — THE THROW PRE-EMPTS THE INSTANCE** (\`PIN-10\`; \`D-124\` item 2; `
      + `\`D-73\`'s asymmetry reversed at a new instant: *"at a creation the caller is not yet holding an `
      + `instance, so the throw refuses the call"*): the call `
      + `${construction.ok ? 'RETURNED AN INSTANCE' : 'refused'}`);
  assert.equal(refusalStatus, LISTENER_BODY_THREW,
    `**AND THE MEMBER IS THE MINTED RANK \`21\` \`ListenerBodyThrew\`** (\`D-124\` item 2; \`PIN-10\`: *"rank `
      + `\`21\` at \`storeCreate\`, the boot, \`addConstraint\` and a re-arm; the throw REFUSES the act at every `
      + `one of them and NO ROLLBACK COMPOSES at any of them"*): the refusal answered `
      + `${JSON.stringify(refusalStatus)} with message ${JSON.stringify(messageOf(construction.caught))} and `
      + `log ${JSON.stringify(logKinds(construction.caught))}`);
  assert.equal(String(messageOf(construction.caught)).includes('listener'), true,
    `and its subject is the LISTENER's body and not the constraint body's — rank \`18\` is NOT widened `
      + `(\`D-124\` item 2: *"The subject is the LISTENER BODY and not the constraint body"*): the message reads `
      + `${JSON.stringify(messageOf(construction.caught))}`);
  assert.equal(bytes !== null && bytes.includes('saved-by-sibling'), true,
    `**AND THE PASSING SIBLING REGISTRATION'S SAVED BYTES STAND** (\`PIN-12\`: *"A REFUSED CREATION LEAVES THE `
      + `STORE'S OWN CREATED FILE AND EVERY EARLIER SIBLING REGISTRATION'S ALREADY-SAVED \`file\` LANDING `
      + `STANDING, AND NO REMOVAL ARM IS DECLARED"*; \`PIN-10\`: *"NO ROLLBACK COMPOSES AT ANY OF THEM"*): the `
      + `file read ${JSON.stringify(bytes)}`);
  t.diagnostic(`CSW-10 · THE THROW: the construction answered ${JSON.stringify(refusalStatus)} with message `
    + `${JSON.stringify(messageOf(construction.caught))}; the file read ${JSON.stringify(bytes)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-23` · DELIVERY AT THE BOOT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-23 · DELIVERY AT THE BOOT (`PIN-6` (ii); `D-125` item 1) — a construction over an EXISTING `filePath` whose list\'s repair writes an adopted handle\'s address: the construction RETURNS its instance, the listener is delivered ONCE, AFTER the save, with the listener\'s OWN watched address as its ONE argument, and the bytes that body stood over carry the repair', (t) => {
  // **`D-125` item 1 names the boot by name**: *"the listeners its write fires are delivered — `storeCreate`, a
  // boot over an existing `filePath`, `addConstraint`, and a re-arm — after the constraints pass, after the
  // save"*. **`PIN-6` (i)**: at the creation and at the boot the delivered set is **adopted ∩ the addresses that
  // RESOLVE**, and the ONE ARGUMENT is *"the listener's own watched address"* — not the repair's op address
  // (`PIN-6` (iv)'s split, which is why this fixture makes the two DIFFERENT addresses).
  //
  // **⟶ AMENDED 2026-11-06 (gate 3, post-implementation): THE FIRST FIXTURE'S REPAIR NEVER SATISFIED ITS OWN
  // PAIR, SO THE CONSTRUCTION REFUSED AT RANK `20` AND THE CELL NEVER RETURNED AN INSTANCE.** Measured at the
  // bytes: the pair stood at `['k']` and the repair wrote `['a','sub']`, so the sweep's next round offered the
  // repair a second time, `index.mjs:1952`'s guard suppressed it, the carry's rank-`19` verdict was converted at
  // `index.mjs:1959`–`:1967`, and `storeCreate` threw `ConstraintPassRefused` (`D-123` item 1's one-repair rule
  // plus `D-124` item 1 refuse exactly this construction). **AND THE DELIVERED SET AT THIS INSTANT IS NOT THE
  // REPAIR'S**: `PIN-6` (i) makes the boot's set *adopted ∩ resolving*, so a witness adopted at an address the
  // seed already holds fires `1`, and a refusal pre-empts every delivery (`PIN-2`: no delivery on a refusing
  // arm) — and neither reading is the boot's repair.
  //
  // **WHAT IS DRIVEN NOW**: a listener adopted at `['k','sub']`, which resolves **only once the boot's own repair
  // writes it**; and a pair at `['k']` whose body refuses while `['k']` holds nothing and whose repair writes
  // `['k']` at the `file` tier — **so the repair is the pair's ONLY one** (it satisfies its own pair at the
  // re-run AND at the next round's pass, `PIN-4` (iii), (iv)), **and the op address `['k']` and the listener's
  // watched `['k','sub']` are two different addresses**, which is the discrimination `PIN-6` (i) against (iv)
  // makes. **THE REFUSAL'S OWN MESSAGE IS QUOTED AT THE DRIVE** whenever this shape refuses: a cell that
  // swallowed it into a bare `ok === false` is the cell this amendment removes.
  const { dir, filePath } = scratch('csw23');
  const seed = make({ filePath });
  seed.write(['loaded'], 'file', 'committed');
  const witness = watching('csw23');
  const repairAddress = ['k'];
  const watchedAddress = ['k', 'sub'];
  let repairs = 0;
  const construction = attempt(() => make({
    filePath,
    listeners: [adopted(watchedAddress, 'L', function listener(...args) {
      witness.calls.push({
        label: 'csw23',
        argCount: args.length,
        address: args[0],
        bytesAtDelivery: bytesOf(filePath),
      });
    })],
    constraints: [{
      address: repairAddress,
      id: 'csw23-k',
      constraint: (context) => {
        if (context.value !== undefined) return true;
        return {
          message: '`["k"]` must exist',
          repair: (record) => {
            repairs += 1;
            // **THE REPAIR WRITES THE PAIR'S OWN ADDRESS** — the clause `§4` `CSW-26` (iii) states in the file's
            // own words (*"or the repair writes the pair's own address"*), and the one a CONSTRUCTION requires:
            // the sweep's next round asks the pair's own address again, so a repair that satisfies only the
            // re-run's `value` would leave the pair refusing there (`D-124` item 1's cycle).
            return { ok: true, op: record.write(repairAddress, 'file', { sub: 'by-repair' }).op };
          },
        };
      },
    }],
  }));
  const constructionStatus = construction.ok ? null : statusOf(construction.caught);
  const bytes = bytesOf(filePath);
  const watchedStands = construction.ok
    ? attempt(() => construction.value.read(watchedAddress))
    : null;
  rmSync(dir, { recursive: true, force: true });

  assert.equal(construction.ok, true,
    `**THE BOOT MUST RETURN ITS INSTANCE** (\`D-125\` item 1's second instant; \`D-123\` item 1: the repair makes `
      + `the state its own pair admits): it answered ${JSON.stringify(constructionStatus)} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}`);
  assert.equal(repairs, 1,
    `**THE REPAIR RAN ONCE AND IS THE PAIR'S ONLY ONE** (\`D-124\` item 1): the drive entered it ${repairs} time(s)`);
  assert.equal(witness.calls.length, 1,
    `**THE REPAIR'S WRITE FIRES THE ADOPTED HANDLE ONCE, AT THE BOOT** (\`D-125\` item 1; \`PIN-6\` (i)): the `
      + `drive counted ${witness.calls.length} invocation(s)`);
  assert.equal(witness.calls[0]?.argCount, 1,
    `and it takes ONE argument (\`PIN-6\` (iv)): ${JSON.stringify(witness.calls[0]?.argCount)}`);
  assert.deepEqual(witness.calls[0]?.address, watchedAddress,
    `**AND THE ONE ARGUMENT IS THE LISTENER'S OWN WATCHED ADDRESS AND NOT THE REPAIR'S OP ADDRESS** `
      + `(\`PIN-6\` (i), (iv): *"at the creation and the boot the argument is the listener's address"*; the `
      + `repair's op address is ${JSON.stringify(repairAddress)}): the body read `
      + `${JSON.stringify(witness.calls[0]?.address)}`);
  assert.equal(witness.calls[0]?.bytesAtDelivery === undefined ? null : String(witness.calls[0].bytesAtDelivery).includes('by-repair'), true,
    `**AND IT STANDS AFTER THE SAVE — THE BYTES IT READ CARRY THE REPAIR** (\`PIN-6\` (ii); \`PIN-2\`: *"SAVE → `
      + `DELIVER → THE ANSWER"*): the body read ${JSON.stringify(witness.calls[0]?.bytesAtDelivery)} and the `
      + `path holds ${JSON.stringify(bytes)}`);
  assert.equal(watchedStands !== null && watchedStands.ok === true, true,
    `**AND THE WATCHED ADDRESS RESOLVED ONLY ONCE THE REPAIR WROTE IT** (\`PIN-6\` (i)'s *"the addresses that `
      + `RESOLVE"*): \`read(['k','sub'])\` on the returned instance answered `
      + `${JSON.stringify(watchedStands === null ? null : (watchedStands.ok ? watchedStands.value : statusOf(watchedStands.caught)))}`);
  t.diagnostic(`CSW-23 · THE BOOT'S DELIVERY: the construction answered ${JSON.stringify(constructionStatus)} `
    + `after ${repairs} repair(s); the adopted listener at ${JSON.stringify(watchedAddress)} ran `
    + `${witness.calls.length}× with `
    + `${JSON.stringify(witness.calls.map((call) => ({ address: call.address, argCount: call.argCount, bytes: call.bytesAtDelivery })))}; `
    + `the repair's op address was ${JSON.stringify(repairAddress)}; the path holds ${JSON.stringify(bytes)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-26` · EMPTY IS A COUNT AND NOT SILENCE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-26 · EMPTY IS A COUNT OF `0` AND NOT SILENCE — RESTATED (`PIN-6` (v); `D-125` residual `2`; `Q-12`) — THERE ARE TWO ARMS AT EACH OF THE FOUR INSTANTS AND THEY ARE TOLD APART BY THE ACT\'S ANSWER AND NEVER BY THE COUNT: THE EMPTY ARM reaches the seat, delivers ZERO and ANSWERS (an instance at the creation and the boot, an identity at `addConstraint`, `undefined` at a re-arm); THE SILENT ARM refuses, its count is ALSO `0`, and it THROWS ITS OWN MEMBER. Every `0` sits beside a live `1` at the same instant and with the same fixture, and the creation\'s arm takes a FRESH path so it is not the boot', (t) => {
  // **`Q-12`'s answer is the declaration's**: *"reach it, and deliver the EMPTY SET — a count of `0`, no throw,
  // no log entry; a repair rolled back on a `D-107` refusing arm delivers NOTHING (`D-117` item 2)"*.
  //
  // **⟶ REDRAWN 2026-11-06 (gate 3, post-implementation) ON `§4` `CSW-26`'s FOUR CLAUSES — THE STATEMENT WAS
  // RIGHT AND EVERY ARM BUT TWO WAS UNBUILDABLE.** The superseded drive demanded `0` from arms that `PIN-6` (i)
  // makes `1` (`creation-silent` and `boot-silent` adopted a listener at a RESOLVING `['watch']`), credited a
  // repair with no op at the re-arm (`repair: () => ({ ok: true })` refuses at rank `19` at
  // `kernel-registration.mjs:716`–`:722`, so that arm never returned), and left all four FIRING arms' repairs
  // unsatisfied by their own re-run — so each refused at rank `20` before any delivery (`CSW-23`'s measured
  // failure four times over). **THE FOUR CLAUSES THIS CELL NOW DRIVES:**
  //   (i)   **TWO ARMS, TOLD APART BY THE ANSWER AND NEVER BY THE COUNT** — the EMPTY arm answers, the SILENT
  //         arm throws; a count of `0` alone therefore proves nothing and no limb below reads it as though it did;
  //   (ii)  **THE SET IS THE INSTANT'S OWN AND NOT THE REPAIR'S SILENCE** — at the creation and the boot it is
  //         *adopted ∩ resolving*, so an empty arm there is an adopted listener at an address that does NOT
  //         resolve (never a listener standing at an existing address, which is `1` and is `CSW-06`/`CSW-07`/
  //         `CSW-B1`'s reading), and at the two single-pair routes it is the repair's own `triggered`, so an empty
  //         arm there is a registration that PASSED with no repair;
  //   (iii) **EVERY FIRING CONTROL\'S REPAIR IS SATISFIED BY ITS OWN RE-RUN** — either the body passes when
  //         `context.op !== null`, or **the repair writes the pair\'s own address**; at the creation and the boot
  //         the SECOND form is the one that survives the sweep's next round (`PIN-4` (iii), (iv)), because the
  //         third ask is a FRESH registration ask with `op === null`;
  //   (iv)  **EACH `0` SITS BESIDE A LIVE `1` AT THE SAME INSTANT, WITH THE SAME FIXTURE, DIFFERING IN THE ONE
  //         THING THAT DECIDES IT** — the watched address made to resolve (the repair made to write it) at the
  //         creation and the boot, the repair made to fire the handle at the two single-pair routes.
  // **AND THE CREATION\'S ARM TAKES A FRESH PATH** (`§4` `CSW-26` (ii): *"over one seeded `filePath` they are one
  // act at one byte"*), so the two are two arms on two paths and not one byte read twice.
  const WATCHED = ['q', 'gone'];
  const PAIR = ['q'];
  const rows = [];
  /** Drive one arm and record its readings; `answered` is the act's ANSWER and `status` its throw. */
  const drive = (instant, kind, path, existedBefore, run) => {
    const watcher = watching(`csw26-${instant}-${kind}`);
    // **THE DRIVE IS TOTAL**: `run` answers the act's own value and its throwable is the reading
    // (`D-21`: a cell that cannot reach its arm fails AT THE ACT and prints the refusal it caught).
    const outcome = attempt(() => run(watcher));
    const row = {
      instant,
      kind,
      path,
      existedBefore,
      fires: watcher.calls.length,
      answered: outcome.ok === true,
      answer: outcome.ok === true ? (outcome.value === undefined ? 'undefined' : typeof outcome.value) : null,
      status: outcome.ok === true ? null : statusOf(outcome.caught),
      message: outcome.ok === true ? null : messageOf(outcome.caught),
      repairs: 0,
    };
    rows.push(row);
    // **THE PUSHED ROW IS HANDED BACK BY REFERENCE** as `row`, so a later limb can amend it (the repair count a
    // construction's control lands) without a second list; the spread members above are its reading at the time
    // of the drive.
    return { ...row, outcome, watcher, row };
  };

  /** The creation/boot fixture: one adopted handle at `WATCHED`, one pair at `PAIR`, and a `mode`. */
  const construction = (path, mode, counter) => (watcher) => make({
    filePath: path,
    listeners: [adopted(WATCHED, 'L', watcher.listener)],
    constraints: [{
      address: PAIR,
      id: 'quiet',
      constraint: (context) => {
        if (mode === 'empty') return true;
        if (context.value !== undefined) return true;
        return {
          message: 'absent',
          repair: (record) => {
            counter.value += 1;
            // **THE REPAIR WRITES THE PAIR\'S OWN ADDRESS** — clause (iii)\'s second form, and what makes the
            // sweep\'s next round\'s ask PASS instead of offering a second repair (`D-124` item 1).
            const landed = record.write(PAIR, 'file', { gone: mode === 'firing' ? 'by-repair' : 'declined' });
            return mode === 'firing' ? { ok: true, op: landed.op } : { ok: false, message: 'the repair declines' };
          },
        };
      },
    }],
  });

  // ══ INSTANT 1 · THE CREATION — A FRESH PATH (`existedBefore: false`). ══════════════════════════════════
  const creationScratch = scratch('csw26-creation');
  const creationEmptyCounter = { value: 0 };
  const creationEmpty = drive('creation', 'empty', creationScratch.filePath, existsSync(creationScratch.filePath),
    construction(creationScratch.filePath, 'empty', creationEmptyCounter));
  creationEmpty.row.repairs = creationEmptyCounter.value;
  const creationFiringCounter = { value: 0 };
  const creationFiring = drive('creation', 'firing', join(creationScratch.dir, 'firing.json'), false,
    construction(join(creationScratch.dir, 'firing.json'), 'firing', creationFiringCounter));
  creationFiring.row.repairs = creationFiringCounter.value;
  const creationSilentCounter = { value: 0 };
  const creationSilent = drive('creation', 'silent', join(creationScratch.dir, 'silent.json'), false,
    construction(join(creationScratch.dir, 'silent.json'), 'silent', creationSilentCounter));
  creationSilent.row.repairs = creationSilentCounter.value;
  const creationWatchedStands = creationEmpty.outcome.ok === true
    ? attempt(() => creationEmpty.outcome.value.read(WATCHED))
    : null;

  // ══ INSTANT 2 · THE BOOT — AN EXISTING PATH (`existedBefore: true`). ══════════════════════════════════
  const bootScratch = scratch('csw26-boot');
  const bootSeed = make({ filePath: bootScratch.filePath });
  bootSeed.write(['loaded'], 'file', 'committed');
  const bootEmptyCounter = { value: 0 };
  const bootEmpty = drive('boot', 'empty', bootScratch.filePath, existsSync(bootScratch.filePath),
    construction(bootScratch.filePath, 'empty', bootEmptyCounter));
  bootEmpty.row.repairs = bootEmptyCounter.value;
  const bootFiringCounter = { value: 0 };
  const bootFiring = drive('boot', 'firing', join(bootScratch.dir, 'firing.json'), false, (watcher) => {
    const seeded = make({ filePath: join(bootScratch.dir, 'firing.json') });
    seeded.write(['loaded'], 'file', 'committed');
    return construction(join(bootScratch.dir, 'firing.json'), 'firing', bootFiringCounter)(watcher);
  });
  bootFiring.row.repairs = bootFiringCounter.value;
  const bootSilentCounter = { value: 0 };
  const bootSilent = drive('boot', 'silent', join(bootScratch.dir, 'silent.json'), false, (watcher) => {
    const seeded = make({ filePath: join(bootScratch.dir, 'silent.json') });
    seeded.write(['loaded'], 'file', 'committed');
    return construction(join(bootScratch.dir, 'silent.json'), 'silent', bootSilentCounter)(watcher);
  });
  bootSilent.row.repairs = bootSilentCounter.value;
  const bootWatchedStands = bootEmpty.outcome.ok === true
    ? attempt(() => bootEmpty.outcome.value.read(WATCHED))
    : null;

  // ══ INSTANT 3 · `addConstraint` — THE SET IS THE REPAIR\'S OWN `triggered` (`PIN-6` (ii)). ═════════════
  const routeScratch = scratch('csw26-routes');
  const routeSeed = make({ filePath: routeScratch.filePath });
  routeSeed.write(['watch'], 'file', 'present');
  /** A store over the same existing path with the witness BOUND at `['watch']`. */
  const boundStore = (watcher) => {
    const store = make({ filePath: routeScratch.filePath });
    store.listen('L', [['watch']]);
    store.register('L', watcher.listener);
    return store;
  };
  const addBody = (mode) => (context) => {
    if (mode === 'empty' || context.value !== undefined) return true;
    return {
      message: 'absent',
      repair: (record) => {
        const landed = record.write(['watch'], 'mem', mode === 'firing' ? 'by-repair' : 'declined');
        return mode === 'firing' ? { ok: true, op: landed.op } : { ok: false, message: 'the repair declines' };
      },
    };
  };
  const addEmpty = drive('addConstraint', 'empty', routeScratch.filePath, true, (watcher) => (
    boundStore(watcher).addConstraint({ address: ['x-quiet'], id: 'x-quiet' }, addBody('empty'))));
  const addFiring = drive('addConstraint', 'firing', routeScratch.filePath, true, (watcher) => (
    boundStore(watcher).addConstraint({ address: ['x-firing'], id: 'x-firing' }, addBody('firing'))));
  const addSilent = drive('addConstraint', 'silent', routeScratch.filePath, true, (watcher) => (
    boundStore(watcher).addConstraint({ address: ['x-silent'], id: 'x-silent' }, addBody('silent'))));

  // ══ INSTANT 4 · A RE-ARM — the same set, reached through `constraintOn`. ══════════════════════════════
  /** Add the pair, turn it off, remove its state where a mode needs the re-arm to move it, and re-arm. */
  const rearm = (watcher, mode) => {
    const store = boundStore(watcher);
    const address = { address: ['h'], id: 'h' };
    const body = addBody(mode === 'empty' ? 'empty' : mode);
    if (mode !== 'empty') store.write(['h'], 'mem', 'settled');
    store.addConstraint(address, body);
    store.constraintOff(address, body);
    if (mode !== 'empty') store.delete(['h']);
    // **AND THE RE-ARM ANSWERS `undefined`** — the empty arm's own declared answer (`§4` `CSW-26` (i)).
    return store.constraintOn(address, body);
  };
  const rearmEmpty = drive('re-arm', 'empty', routeScratch.filePath, true, (watcher) => rearm(watcher, 'empty'));
  const rearmFiring = drive('re-arm', 'firing', routeScratch.filePath, true, (watcher) => rearm(watcher, 'firing'));
  const rearmSilent = drive('re-arm', 'silent', routeScratch.filePath, true, (watcher) => rearm(watcher, 'silent'));
  rmSync(creationScratch.dir, { recursive: true, force: true });
  rmSync(bootScratch.dir, { recursive: true, force: true });
  rmSync(routeScratch.dir, { recursive: true, force: true });

  const empties = rows.filter((row) => row.kind === 'empty');
  const firings = rows.filter((row) => row.kind === 'firing');
  const silents = rows.filter((row) => row.kind === 'silent');
  const rowOf = (instant, kind) => rows.find((row) => row.instant === instant && row.kind === kind) ?? null;

  // ── (a) THE EMPTY ARM: THE SEAT IS REACHED, THE SET IS EMPTY, AND THE ACT **ANSWERS**. ────────────────
  // **THE ANSWER IS THE INSTANT\'S OWN** (`§4` `CSW-26` (i)): an instance at the creation and the boot — an
  // object carrying the declared members — an identity at `addConstraint`, `undefined` at a re-arm.
  const ANSWER_OF = {
    creation: 'object',
    boot: 'object',
    addConstraint: 'object',
    're-arm': 'undefined',
  };
  for (const row of empties) {
    assert.equal(row.answered, true,
      `**THE ${row.instant} EMPTY ARM MUST ANSWER — the seat is REACHED and delivers the EMPTY SET, and that is `
        + `not a refusal** (\`Q-12\`; \`surface.md:1717\`: *"the empty residue is a NO-OP AND NOT A FAILURE. A `
        + `drive may assert it as a count: zero invocations …, no throw"*): the arm answered `
        + `${JSON.stringify(row.status)} with message ${JSON.stringify(row.message)}`);
    assert.equal(row.answer, ANSWER_OF[row.instant],
      `**AND ITS ANSWER IS THE INSTANT\'S DECLARED ONE — \`\`${ANSWER_OF[row.instant]}\`\`** (\`§4\` \`CSW-26\` (i); `
        + `\`D-125\` item 2: *"a delivery at \`addConstraint\` DOES NOT change the answer\'s declared type"*): the `
        + `${row.instant} empty arm answered ${JSON.stringify(row.answer)}`);
    assert.equal(row.fires, 0,
      `**AND ITS COUNT IS \`0\`** (\`PIN-6\` (v): *"EMPTY IS A COUNT OF ZERO AND NOT SILENCE"*): the `
        + `${row.instant} empty arm fired ${row.fires} time(s)`);
  }
  assert.equal(creationEmpty.row.repairs, 0,
    `and the creation's empty arm LANDED NO REPAIR at all — it is the same fixture as its control with the repair `
      + `NOT triggered (\`§4\` \`CSW-26\` (iv)): it landed ${creationEmpty.row.repairs}`);

  // ── (b) THE EMPTY ARM AT THE CREATION AND THE BOOT IS AN ADDRESS THAT DOES NOT RESOLVE. ───────────────
  // **`§4` `CSW-26` (ii)**: *"an empty arm there is **an adopted listener at an address that does NOT resolve** —
  // never a listener standing at an existing address …, which is `1`"*.
  for (const [instant, reading] of [['creation', creationWatchedStands], ['boot', bootWatchedStands]]) {
    assert.equal(reading !== null && reading.ok === false && statusOf(reading.caught) === 'AddressNotFound', true,
      `**THE ${instant.toUpperCase()} EMPTY ARM\'S WATCHED ADDRESS MUST NOT RESOLVE** (\`§4\` \`CSW-26\` (ii); `
        + `\`PIN-6\` (i): the set is *adopted ∩ RESOLVING*): \`read(${JSON.stringify(WATCHED)})\` answered `
        + `${JSON.stringify(reading === null ? null : (reading.ok ? reading.value : statusOf(reading.caught)))}`);
  }

  // ── (c) THE SILENT ARM: THE ACT **REFUSES**, AND ITS COUNT IS ALSO `0`. ───────────────────────────────
  for (const row of silents) {
    assert.equal(row.answered, false,
      `**THE ${row.instant} SILENT ARM MUST REFUSE — the delivery is not reached at all** (\`D-117\` item 2: *"no `
        + `delivery on the failing arm"*, read over \`PIN-6\` (v)): it `
        + `${row.answered ? 'ANSWERED' : 'refused'} ${JSON.stringify(row.answer)}`);
    assert.equal(row.status, 'ConstraintRefusedAtRegistration',
      `**AND IT THROWS ITS OWN MEMBER — THE REGISTRATION\'S OWN RANK \`19\`** (\`D-107\` item 1: *"Any refusal should `
        + `be rolling back"*; the repair lands and then declines, so the arm is the registration\'s and not the `
        + `cycle\'s): the ${row.instant} silent arm answered ${JSON.stringify(row.status)} with message `
        + `${JSON.stringify(row.message)}`);
    assert.equal(row.fires, 0,
      `and it delivers NOTHING at all: ${row.fires} invocation(s)`);
  }

  // ── (d) THE TWO ARMS ARE TOLD APART BY THE ANSWER AND NEVER BY THE COUNT. ─────────────────────────────
  // **`§4` `CSW-26` (i)**: *"A count of `0` alone therefore proves nothing, and no cell may read it as though it
  // did"*. Every empty arm and every silent arm reads `0`; what separates them is that one ANSWERS and the other
  // THROWS — so this limb asserts the COUNTS ARE EQUAL and the ANSWERS DIFFER, in that order, at every instant.
  assert.deepEqual([...empties, ...silents].map((row) => row.fires), Array(empties.length + silents.length).fill(0),
    `**EVERY \`0\` ABOVE IS THE SAME NUMBER IN BOTH ARMS — WHICH IS WHY THE COUNT CANNOT TELL THEM APART** `
      + `(\`§4\` \`CSW-26\` (i)): ${JSON.stringify([...empties, ...silents].map((row) => row.fires))}`);
  assert.deepEqual(empties.map((row) => row.answered), empties.map(() => true),
    `and every EMPTY arm ANSWERED: ${JSON.stringify(empties.map((row) => row.answered))}`);
  assert.deepEqual(silents.map((row) => row.answered), silents.map(() => false),
    `and every SILENT arm THREW: ${JSON.stringify(silents.map((row) => row.answered))}`);

  // ── (e) EVERY `0` SITS BESIDE A LIVE `1` AT THE SAME INSTANT — AND ITS REPAIR IS SATISFIED BY ITS RE-RUN.
  // **`§4` `CSW-26` (iii) and (iv)**: the control differs in the ONE thing that decides it, and its repair must
  // be satisfied by its own re-run — which at the creation and the boot is the pair\'s own address being written
  // (the sweep\'s next round asks it again, `PIN-4` (iii), (iv)).
  for (const instant of ['creation', 'boot', 'addConstraint', 're-arm']) {
    const empty = rowOf(instant, 'empty');
    const firing = rowOf(instant, 'firing');
    assert.equal(empty !== null && empties.includes(empty), true,
      `**THE ${instant} INSTANT CARRIES ITS OWN EMPTY ARM** (nothing is borrowed across instants): `
        + `${JSON.stringify(rows.filter((row) => row.instant === instant).map((row) => row.kind))}`);
    assert.equal(firing !== null && firings.includes(firing), true,
      `**AND ITS OWN FIRING CONTROL AT THE SAME INSTANT AND WITH THE SAME FIXTURE** (\`§4\` \`CSW-26\` (iv)): `
        + `${JSON.stringify(rows.filter((row) => row.instant === instant).map((row) => row.kind))}`);
    assert.equal(firing.answered, true,
      `**THE ${instant} CONTROL MUST ANSWER** — its repair lands and no pair refuses (\`§4\` \`CSW-26\` (iii): a `
        + `repair that never satisfies its own pair is a second repair attempt and refuses at rank \`20\`): it `
        + `answered ${JSON.stringify(firing.status)} with message ${JSON.stringify(firing.message)}`);
    assert.equal(firing.fires, 1,
      `**AND IT DELIVERS ONCE — SO THE \`0\` BESIDE IT IS THE SEAT\'S EMPTY SET AND NOT A MISSING SEAT** `
        + `(\`§6\` item 2: *"a registration instant that delivers nothing while the creation delivers everything is `
        + `the FAILURE MODE this item exists to catch"*): the ${instant} control fired ${firing.fires} time(s)`);
  }
  assert.equal(creationFiring.row.repairs, 1,
    `**AND THE CREATION\'S CONTROL LANDED EXACTLY ONE REPAIR — SATISFIED BY ITS OWN RE-RUN** (\`D-124\` item 1): `
      + `it landed ${creationFiring.row.repairs}`);
  assert.equal(bootFiring.row.repairs, 1,
    `and so did the boot's: ${bootFiring.row.repairs}`);

  // ── (f) THE CREATION\'S ARM TAKES A FRESH PATH, SO IT IS NOT THE BOOT (`§4` `CSW-26` (ii)). ───────────
  assert.equal(creationEmpty.row.existedBefore, false,
    `**THE CREATION ARM\'S PATH MUST NOT EXIST BEFORE THE ACT** (a fresh path, \`PIN-9\`\'s *"the exclusive `
      + `create"*): it ${creationEmpty.row.existedBefore ? 'EXISTED' : 'did not exist'} at `
      + `${JSON.stringify(creationEmpty.row.path)}`);
  assert.equal(bootEmpty.row.existedBefore, true,
    `**AND THE BOOT ARM\'S PATH MUST** — the boot is a construction over an existing \`filePath\` (\`D-125\` item 1): `
      + `it ${bootEmpty.row.existedBefore ? 'existed' : 'did NOT exist'} at `
      + `${JSON.stringify(bootEmpty.row.path)}`);
  assert.notEqual(creationEmpty.row.path, bootEmpty.row.path,
    `**SO THE TWO ARE TWO ARMS ON TWO PATHS AND NOT ONE ACT AT ONE BYTE** (\`§4\` \`CSW-26\` (ii); \`F-3\`, \`Q-1\`\'s `
      + `default): the creation read ${JSON.stringify(creationEmpty.row.path)} and the boot `
      + `${JSON.stringify(bootEmpty.row.path)}`);

  t.diagnostic(`CSW-26 · EMPTY IS A COUNT: ${JSON.stringify(rows.map((row) => ({
    instant: row.instant,
    kind: row.kind,
    fires: row.fires,
    answered: row.answered,
    answer: row.answer,
    status: row.status,
    repairs: row.repairs,
  })))} — the EMPTY arms answer and read \`0\`; the SILENT arms throw their own rank \`19\` and read \`0\`; every `
    + `FIRING control answers and reads \`1\` at the same instant with the same fixture`);
  // **UNUSED-BINDING HYGIENE IS NOT THE POINT — THE DRIVES ABOVE ARE THE READING** (the file's own precedent):
  // the arms are named so a later pass cannot lose one silently, and every one of them is read through `rows`.
  void creationSilent; void addEmpty; void addFiring; void addSilent;
  void rearmEmpty; void rearmFiring; void rearmSilent;
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-CSW-2` · THE DELIVERED SET AT THE FOUR REGISTRATION INSTANTS — THE PROPERTY ROW (`e`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('csw_prop_P_CSW_2_the_delivered_set_is_contained_in_what_the_store_fires_and_empty_on_refusals', (t) => {
  // **PROPERTY.** At each of the four registration instants, `∀` generated case: **(i)** every handle the act
  // invoked is a handle the STORE would fire at that address (the containment half, read against a CONTROL
  // write's own `triggered` set, which is the store's rule and not this unit's); **(ii)** **one invocation per
  // distinct handle** at every instant (`PIN-6` (iii)); **(iii)** on every REFUSING arm the count is `0` — a
  // count of zero, never an undefined silence (`D-125` residual `2`, `Q-12`). (`§4` `P-CSW-2`; `D-125` item 1;
  // `PIN-6` (i)–(v).)
  //
  // **GENERATOR.** The instant is rotated across the budget — the creation, the boot, `addConstraint`, a
  // re-arm — crossed with three modes: `fires` (the repair writes the watched address), `silent` (its repairs
  // land nothing at that address) and `refuses` (the repair lands and then declines, so `D-107` composes the
  // refusal). 32 cases, one pinned literal seed.
  //
  // **FALSIFIER.** An invocation of a handle the store would not fire at that address; a handle invoked twice;
  // or a non-zero count on a refusing arm.
  const SEED = 0x5C5702;
  const INSTANTS = ['creation', 'boot', 'addConstraint', 're-arm'];
  const MODES = ['fires', 'silent', 'refuses'];
  const MAX_FAILURES = 5;
  const WATCH = ['watch'];
  let a = SEED >>> 0;
  const next = () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let x = a;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
  const intBetween = (lo, hi) => lo + Math.floor(next() * (hi - lo + 1));
  const failures = [];
  const arms = Object.create(null);
  let ran = 0;

  /** The body a case's repair uses, honouring its mode. */
  const bodyFor = (mode, written) => (context) => {
    if (context.value !== undefined) return true;
    return {
      message: 'the watched address must carry the case\'s value',
      repair: (record) => {
        if (mode === 'silent') return { ok: true };
        const landed = record.write(WATCH, 'mem', written).op;
        if (mode === 'refuses') return { ok: false, message: 'the repair declines after its landing' };
        return { ok: true, op: landed };
      },
    };
  };

  for (let i = 0; i < 32 && failures.length < MAX_FAILURES; i += 1) {
    ran += 1;
    const instant = INSTANTS[i % INSTANTS.length];
    const mode = MODES[Math.floor(i / INSTANTS.length) % MODES.length];
    const drawn = intBetween(0, 9);
    const draw = { attempt: i, instant, mode, drawn };
    // **THE ARM IS TALLIED WHEN THE GENERATOR DRAWS IT AND NOT WHEN ITS CASE PASSES**, so the reachability
    // check below is about the GENERATOR and never about the tree's behaviour: an arm drawn and then failed is
    // still an arm reached, and its failure belongs in `failures` where the property's verdict reads it.
    arms[`${instant}/${mode}`] = (arms[`${instant}/${mode}`] || 0) + 1;
    try {
      const calls = [];
      const listener = function listener(...args) { calls.push(args); };
      const { dir, filePath } = scratch('pcsw2');
      let outcome = null;
      let store = null;
      if (instant === 'creation' || instant === 'boot') {
        if (instant === 'boot') {
          const seedStore = make({ filePath });
          seedStore.write(['loaded'], 'file', 'present');
        }
        outcome = attempt(() => make({
          filePath,
          listeners: [adopted(WATCH, 'L', listener)],
          constraints: [{ address: ['p'], id: 'p', constraint: bodyFor(mode, drawn) }],
        }));
        store = outcome.ok ? outcome.value : null;
      } else {
        store = make({ filePath });
        store.listen('L', [WATCH]);
        store.register('L', listener);
        if (instant === 'addConstraint') {
          outcome = attempt(() => store.addConstraint({ address: ['p'], id: 'p' }, bodyFor(mode, drawn)));
        } else {
          // **THE RE-ARM NEEDS THE PAIR HELD AND ITS STATE ABSENT**, so the pair is added while the address
          // stands, then disabled, then the address is removed — exactly the shape `FSC-ARM1-H` drives.
          store.write(['p'], 'mem', 'settled');
          const added = attempt(() => store.addConstraint({ address: ['p'], id: 'p' }, bodyFor(mode, drawn)));
          const off = added.ok ? attempt(() => store.constraintOff({ address: ['p'], id: 'p' }, bodyFor(mode, drawn))) : null;
          const cleared = off !== null && off.ok ? attempt(() => store.delete(['p'])) : null;
          calls.length = 0;
          outcome = cleared !== null && cleared.ok
            ? attempt(() => store.constraintOn({ address: ['p'], id: 'p' }, bodyFor(mode, drawn)))
            : (cleared ?? off ?? added);
        }
      }
      const fired = calls.length;
      const invokedHandles = new Set(calls.map(() => 'L'));
      draw.fires = fired;
      draw.status = outcome.ok ? 'returned' : statusOf(outcome.caught);

      // ── (iii) A REFUSING ARM DELIVERS NOTHING. ────────────────────────────────────────────────────────
      if (mode === 'refuses') {
        assert.equal(outcome.ok, false,
          `P-CSW-2 ${JSON.stringify(draw)}: the REFUSING arm must refuse (D-107 item 1: the repair landed and `
            + `then declined): it answered ${JSON.stringify(draw.status)}`);
        assert.equal(fired, 0,
          `P-CSW-2 ${JSON.stringify(draw)}: **EMPTY ON EVERY REFUSING ARM OF EVERY INSTANT — a count of 0, `
            + `never an undefined silence** (D-125 residual 2; Q-12; D-117 item 2): it fired ${fired} time(s)`);
      }

      // ── (ii) ONE INVOCATION PER DISTINCT HANDLE. ──────────────────────────────────────────────────────
      assert.equal(fired <= invokedHandles.size, true,
        `P-CSW-2 ${JSON.stringify(draw)}: **ONE INVOCATION PER DISTINCT HANDLE** (PIN-6 (iii)): the drive bound `
          + `ONE handle and counted ${fired} invocation(s)`);

      // ── (i) AND THE CONTAINMENT, READ AT THE STORE'S OWN RULE. ────────────────────────────────────────
      if (store !== null && fired > 0) {
        const control = attempt(() => store.write(WATCH, 'mem', 'control-' + drawn));
        const controlHandles = control.ok ? handlesOf(control.value.triggered) : null;
        draw.controlHandles = controlHandles;
        for (const handle of invokedHandles) {
          assert.equal(Array.isArray(controlHandles) && controlHandles.includes(handle), true,
            `P-CSW-2 ${JSON.stringify(draw)}: **THE DELIVERED SET IS CONTAINED IN WHAT THE STORE FIRES** — the `
              + `control write at the watched address returned ${JSON.stringify(controlHandles)} (PIN-6 (ii): `
              + `the delivered set is the store's own \`triggered\`)`);
        }
      }
      // ── (iv) THE EXPECTED COUNT AT A NON-REFUSING ARM. ────────────────────────────────────────────────
      assert.equal(fired, outcome.ok && mode === 'fires' ? 1 : 0,
        `P-CSW-2 ${JSON.stringify(draw)}: a registration whose repair FIRES the watched address delivers once, `
          + `and one whose repairs land nothing delivers ZERO (PIN-6 (i), (v); D-125 item 1) — it fired `
          + `${fired} time(s) with status ${JSON.stringify(draw.status)}`);
      rmSync(dir, { recursive: true, force: true });
    } catch (err) {
      failures.push({ attempt: i, input: draw, message: err && err.message ? err.message : String(err) });
    }
  }

  if (failures.length > 0) t.diagnostic('P-CSW-2 · THE GENERATED INPUTS THAT FAILED:\n' + JSON.stringify(failures, null, 2));
  for (const instant of INSTANTS) {
    for (const mode of MODES) {
      assert.ok((arms[`${instant}/${mode}`] || 0) > 0,
        `P-CSW-2: the generator must reach \`${instant}/${mode}\` — an arm never reached is a falsifier that `
          + `could not fire (read ${JSON.stringify(arms)})`);
    }
  }
  assert.deepEqual(failures, [],
    `P-CSW-2 held over ${ran} generated cases (seed 0x${(SEED >>> 0).toString(16)}): the delivered set is `
      + `contained in what the store fires, one invocation per distinct handle at every instant, and zero on `
      + `every refusing arm`);

  t.diagnostic(`P-CSW-2 held over ${ran} generated cases, seed 0x${(SEED >>> 0).toString(16)}: arms `
    + `${JSON.stringify(arms)}. Containment is read against a CONTROL write's own \`triggered\` set — the `
    + `store's rule and not this unit's — and the refusing arm is read for its refusal as well as its zero`);
});
