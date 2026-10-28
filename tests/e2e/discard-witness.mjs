// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DISCARD WITNESS — `D-49`: *"Make discard observable"*, and the `window.tabs` use case that says why
//
// **THE RULING** (`strata/decisions.md` · `D-49`, 2026-10-28, the architect, verbatim):
//
//     Make discard observable
//     Example use case: window.tabs reads as object. When window.tabs.landingPage is removed, listener should
//     fire on window.tabs to check that exactly one tab is active
//
// **`DEF-AH` IS THE DEFECT IT ANSWERS, AND IT IS A VISIBILITY DEFECT.** Two windows run **no pass** — a
// `delete`'s listener delivery, and a registration's own evaluation — so a restart request raised inside one of
// them **dies with its window**, and the caller could not learn that it did. **The fail-state stands (`D-43`
// item 2, both exits); what this pass owes is the WITNESS** — on the act's own answer, not in a document and
// not on the next unrelated call.
//
// **WHAT THIS FILE DRIVES, IN THE ORDER `D-49` ASKS FOR IT.**
//   (W1) **THE USE CASE'S FOUNDATION, FIRST, BECAUSE IT IS THE ONE AHEAD OF THE DISCARD**: a delete at a
//        DESCENDANT must FIRE a listener at its ANCESTOR — *"the triggered set's membership rule is the address
//        prefix"* — so the listener standing at `window.tabs` runs for a delete at `window.tabs.landingPage`.
//        **Measured: the invocation count and the address the listener was handed, printed.**
//   (W2) **THE USE CASE END TO END**: the same drive, with the listener doing the caller's own check — **exactly
//        one tab is active** — and the delete's answer read member for member. **A delete whose delivery raised
//        nothing carries `discarded: []`.**
//   (W3) **THE WITNESS**: the listener, finding the invariant broken, raises a `rollback` — **a restart request
//        with no consumer** — and the delete's own answer reports the discard, **printed before → after**.
//   (W3b) **THE WITNESS IS THE ACT'S OWN**: a nested delete inside the same delivery raises nothing and its answer
//        carries `[]`; the request belongs to the window that raised it and is reported there and nowhere else.
//   (W4) **A WITNESS IS NOT A REFUSAL**: the act still answers what it answered, nothing is minted in the closed
//        status set, and the reversal's effect still stands.
//   (W5) **WHAT THE DISCARD COST — THE CONTROL**: the same `rollback` one frame out is JUDGED, REFUSED
//        `ConstraintPassRefused` and the store restored. That is what the window threw away.
//   (W6) **THE OTHER WINDOW — a registration's own evaluation**: its answer is an OPAQUE IDENTITY with no own
//        member, so **nothing can carry a witness there without a new surface**, and this cell asserts that
//        honestly instead of inventing a member. The request it raised is still discarded (the next unrelated
//        call does not receive it).
//   (W7) **AND THE BEHAVIOUR UNCHANGED**: these two windows still run **no pass** — the pair is asked by the
//        registration alone, by no pass in either window — so a request still does not get judged, refused or
//        restored. **The witness reports; it does not run the check.**
//   (W8) **`D-50`, THE RULING THAT CLOSES THE FINDING THIS PASS MADE**: *"If a constraint needs to look for the
//        data at a given location, it can read()"*. **A repair lands at a BESIDE address, the re-run hands the
//        pair the value that op returned, and the pair's own address still stands at the violation.** **The same
//        body WITH a read of the location it cares about refuses on what it read (and the write fails, the store
//        restored); the same body WITHOUT the read passes — the read is the whole difference.** And the read's
//        own window is printed: it runs with the attempt's own commit open and leaves that attempt undisturbed.
//
// **D-21.** Every cell prints the readings it took; a cell that cannot reach its arm asserts the drive's coherence
// FIRST and says so instead of reporting a verdict; a cell that never ran is counted in `AUTHORED`/`EXECUTED` and
// the run EXITS NON-ZERO.
// **D-17.** The expectations are literals here and the citations are comments — no `docs/**` path is opened at
// runtime. **The instruments are the declaration's own**: `openCommits` (`state.mjs`'s in-flight verb windows),
// the kernel record's `live` map (`kernelFor(store).live`) and the `attempt-opened` channel
// (`Symbol.for('provident-storeroom.attempt-opened')`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import { storeCreate } from '../../bindings/js/index.mjs';
// **`D-55`'s `DEF-AO`/`DEF-X` CELLS READ THE KERNEL'S OWN ITEMS** (`K-2`/`K-3`/`K-5`): the closed report a
// consumer holds and the pass shape the delete has no verb for are kernel-level facts, and the barrel is the
// kernel's one checkout home (`kernel-surface.md §1` item 1).
import * as kernel from '../../bindings/js/src/constraint-kernel.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { currentWindow, openCommits } from '../../bindings/js/src/entry/state.mjs';

const LAYER = 'ENVELOPE/PURE';
const APP_LAYER = 'NONE';

/** The set's rank-`20` member (`src/error.rs`'s `CODES`), the ONE status a constraint refusal answers with. */
const PASS_REFUSED = 'ConstraintPassRefused';
/** `surface.md §2.2`'s delete record, its enumerable members — `op` joined them 2026-10-27 (`D-43`). */
const RECEIPT_ENUMERABLE = ['address', 'op', 'tiers', 'triggered'];
/** `surface.md §2.5` items 3–4: the one crossed form's own three members, sorted. */
const REFUSAL_MEMBERS = ['log', 'message', 'status'];
/** **THE COUNT'S OWN OBSERVER** (`§4.2` item 2: *"`observer` is a FUNCTION called once per commit that OPENS
 *  for that store"*) — the same `Symbol.for` key `state.mjs` installs and this drive reads. */
const ATTEMPT_OPENED = Symbol.for('provident-storeroom.attempt-opened');

// ── the run's own bookkeeping ─────────────────────────────────────────────────────────────────────────
let authored = 0, executed = 0, pass = 0, fail = 0;
const fails = [];

function A(id, clause, expectation, cond, observed) {
  authored += 1;
  executed += 1;
  if (cond) {
    pass += 1;
    console.log(`  PASS ${id}  ${expectation}`);
  } else {
    fail += 1;
    fails.push({ id, clause, expectation, observed: String(observed) });
    console.log(`  FAIL ${id}  expected: ${expectation}\n            observed: ${observed}\n            clause:   ${clause}`);
  }
}

/** A reading this run TAKES and PRINTS — the envelope quotes these lines, so they are not commentary. */
function P(label, value) {
  console.log(`        ${label} = ${typeof value === 'string' ? value : JSON.stringify(value)}`);
}

const make = () => storeCreate({ journalLength: 256, listeners: [] });
const activeCount = (tabs) => Object.values(tabs).filter((tab) => tab.active === true).length;
const attempt = (fn) => {
  try { return { ok: true, value: fn() }; } catch (caught) { return { ok: false, caught }; }
};
const keysOf = (v) => (v === null || typeof v !== 'object' ? [] : Object.keys(v).sort());
const ownNamesOf = (v) => (v === null || typeof v !== 'object' ? [] : Object.getOwnPropertyNames(v).sort());
const keyOfAddr = (a) => JSON.stringify(a);
/** **TOTAL BY DESIGN** (`D-21`): a record that carries no witness reads `null` here, so the cells that assert it
 *  FAIL with an observed value rather than aborting the run on a member that is not there. */
const witnessOf = (record) => (record !== null && typeof record === 'object' && Array.isArray(record.discarded)
  ? record.discarded
  : null);
const statusesIn = (v) => (v === null || typeof v !== 'object' ? [] : Object.keys(v)
  .filter((k) => typeof v[k] === 'string' && /^[A-Z][A-Za-z]+$/.test(v[k])));

/** THE USE CASE'S TREE, AT ONE ADDRESS: `window.tabs` reads as an object with exactly one ACTIVE tab. */
const tabsSeed = () => ({ tabs: { landingPage: { active: true }, settings: { active: false } } });

/** THE WINDOW A CALL SEES, read off the discriminator's OWN two sources (`§4.1`/`§4.2`): the open-commit count
 *  and the kernel record's live-attempt count. */
const windowOf = (store) => ({ open: openCommits(store), live: kernelFor(store).live.size });

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W1) THE FOUNDATION, FIRST: DOES A DESCENDANT DELETE FIRE THE ANCESTOR LISTENER?
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W1 · THE ANCESTOR-FIRE MEASUREMENT (`D-49` item 1) ──────────────────────────────');
{
  const store = make();
  store.write(['window'], 'mem', tabsSeed());
  const handed = [];
  const handle = store.listen('tabs-listener', [['window', 'tabs']]);
  store.register(handle, (address) => { handed.push(address); });
  const receipt = attempt(() => store.delete(['window', 'tabs', 'landingPage']));
  const count = handed.length;
  const addr = handed[0];
  P('listener invocation count', count);
  P('the address it was handed', addr);
  P('the delete record\'s `triggered`', receipt.ok ? receipt.value.triggered : String(receipt.caught));
  P('`window.tabs` after the delete', receipt.ok ? store.read(['window', 'tabs']) : '<no receipt>');
  A('DW-01.1', '`D-49` item 1 (the triggered set\'s membership rule is the address prefix); `A43` (a delete fires its own set)',
    'a delete at `[window, tabs, landingPage]` FIRES the listener installed at `[window, tabs]` — count `1`',
    receipt.ok && count === 1, count);
  A('DW-01.2', '`PAR-JS-12` (the invocation\'s ONE argument is the triggering ADDRESS)',
    'the address handed to the ancestor listener is the DELETED address, `[window, tabs, landingPage]`',
    addr !== undefined && keyOfAddr(addr) === keyOfAddr(['window', 'tabs', 'landingPage']), JSON.stringify(addr));
  A('DW-01.3', '`contract.md §2.4` item 1 (a trigger is a `{handle, address}` pair; the address is the binding\'s)',
    'the record\'s `triggered` names the listener at the address it was BOUND at, `[window, tabs]`',
    receipt.ok && receipt.value.triggered.some((p) => p.handle === 'tabs-listener'
      && keyOfAddr(p.address) === keyOfAddr(['window', 'tabs'])),
    receipt.ok ? JSON.stringify(receipt.value.triggered) : String(receipt.caught));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W2) THE USE CASE END TO END: the listener RUNS, and the caller's check is performed there
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W2 · THE USE CASE: `window.tabs` CHECKS THAT EXACTLY ONE TAB IS ACTIVE ──────────');
{
  const store = make();
  store.write(['window'], 'mem', tabsSeed());
  const checks = [];
  const windows = [];
  const handle = store.listen('tabs-listener', [['window', 'tabs']]);
  store.register(handle, (address) => {
    checks.push({ at: address, active: activeCount(store.read(['window', 'tabs'])), open: openCommits(store) });
  });
  const receipt = attempt(() => store.delete(['window', 'tabs', 'landingPage']));
  P('the listener\'s checks (`address`, `active tabs`, `open commits`)', checks);
  P('the delete record\'s enumerable keys', receipt.ok ? keysOf(receipt.value) : '<no receipt>');
  P('the delete record\'s own names', receipt.ok ? ownNamesOf(receipt.value) : '<no receipt>');
  P('`discarded` (nothing was raised in this delivery)', receipt.ok ? receipt.value.discarded : '<no receipt>');
  A('DW-02.1', '`D-49`\'s use case (the listener fires on `window.tabs` and checks)',
    'the caller\'s check RUNS, at the deleted address, with ONE open commit and `0` active tabs left',
    receipt.ok && checks.length === 1 && checks[0].open === 1
      && keyOfAddr(checks[0].at) === keyOfAddr(['window', 'tabs', 'landingPage'])
      && checks[0].active === 0,
    JSON.stringify(checks));
  A('DW-02.2', '`surface.md §2.2` (the delete record answers `{address, tiers, triggered, op}`); `D-49` (the witness stands BESIDE it)',
    'the act still answers its four ENUMERABLE members, and the witness is a fifth OWN member that is not enumerable',
    receipt.ok && keyOfAddr(keysOf(receipt.value)) === keyOfAddr(RECEIPT_ENUMERABLE)
      && ownNamesOf(receipt.value).includes('discarded'),
    receipt.ok ? `${keysOf(receipt.value)} / ${ownNamesOf(receipt.value)}` : String(receipt.caught));
  A('DW-02.3', '`D-49` (an empty list where nothing was discarded is the member\'s own answer)',
    'a delivery that raised no action carries `discarded: []` — the member is present and empty, never absent',
    receipt.ok && Array.isArray(receipt.value.discarded) && receipt.value.discarded.length === 0,
    receipt.ok ? JSON.stringify(receipt.value.discarded) : String(receipt.caught));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W3) THE WITNESS: the listener raises a `rollback`, and the delete's OWN answer reports the discard
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W3 · THE WITNESS ON THE ACT\'S OWN ANSWER, PRINTED BEFORE → AFTER ───────────────');
{
  const store = make();
  store.write(['window'], 'mem', tabsSeed());
  const prior = store.write(['window', 'tabs', 'about'], 'mem', { active: false });
  const asked = [];
  const registered = attempt(() => store.addConstraint({ address: ['window'], id: 'one-active-tab' }, (context) => {
    const count = activeCount(context.value.tabs);
    asked.push(count);
    return count === 1 ? true : { message: `exactly one tab must be active, ${count} stand so` };
  }));
  // **⟶ AND THE WITNESS'S OWN CONTROL, ADDED 2026-10-28 — `DEF-AM`: TWO PAIRS ARE REGISTERED AND THE REVERSAL
  // MOVES ONE.** The witness must name the address the refused act MOVED — `['window']`, whose `tabs` loses
  // `about` — and NOT `['window','settings']`, an address the same registry watches and the reversal never
  // touches. **A WITNESS THAT NAMES EVERY WATCHED ADDRESS NAMES NOTHING**: it would read the same whether the
  // act moved one address or all of them.
  const secondPair = attempt(() => store.addConstraint({ address: ['window', 'settings'], id: 'settings-pair' },
    () => true));
  const registry = attempt(() => store.constraints());
  const raised = [];
  const handle = store.listen('tabs-listener', [['window', 'tabs']]);
  store.register(handle, (address) => {
    const count = activeCount(store.read(['window', 'tabs']));
    // THE CALLER'S CHECK FAILS, SO THE CALLER RAISES AN ACTION — a `rollback` of an op it can name.
    if (count !== 1) raised.push(attempt(() => store.rollback(prior.op.opId)));
  });
  const receipt = attempt(() => store.delete(['window', 'tabs', 'landingPage']));
  const before = receipt.ok
    ? { address: receipt.value.address, tiers: receipt.value.tiers, triggered: receipt.value.triggered, op: receipt.value.op }
    : null;
  const after = receipt.ok ? receipt.value.discarded : null;
  P('BEFORE — the act\'s answer, its four enumerable members', before === null ? '<no receipt>' : before);
  P('AFTER — the witness BESIDE it, `record.discarded`', after);
  P('the rollback the listener raised', raised.length === 0 ? '<none>' : raised[0]);
  P('the pair\'s asks (`context.value.tabs` active counts)', asked);
  const descriptor = receipt.ok ? Object.getOwnPropertyDescriptor(receipt.value, 'discarded') : undefined;
  P('`discarded`\'s own descriptor', descriptor === undefined ? '<absent>'
    : { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable });
  const witness = witnessOf(receipt.ok ? receipt.value : null);
  A('DW-03.1', '`D-49` (a request a window discards is visible on the act\'s own answer); `D-42` item 3 (the request belongs to the act that raised it)',
    'the delete\'s answer reports exactly ONE discarded request, whose `opId` is the id the reversal named',
    witness !== null && witness.length === 1 && witness[0].opId === prior.op.opId,
    witness === null ? '<no witness on the record>' : JSON.stringify(witness));
  A('DW-03.2', '`D-49` (the addresses the discarded check owed); `D-39` (the constraint\'s registration order is the check\'s own walk)',
    'the witness names the ADDRESS the discarded check would have been asked at — the pair\'s own `[window]` — as a fresh segment list',
    witness !== null && witness.length === 1 && Array.isArray(witness[0].addresses)
      && witness[0].addresses.length === 1
      && keyOfAddr(witness[0].addresses[0]) === keyOfAddr(['window']),
    witness === null ? '<no witness on the record>' : JSON.stringify(witness));
  A('DW-03.3', '`surface.md §2.2` (the record\'s declared members are unmoved by the witness)',
    'the witness is a NON-ENUMERABLE, NON-WRITABLE own property: `Object.keys` is still the four',
    receipt.ok && descriptor !== undefined && descriptor.enumerable === false && descriptor.writable === false
      && keyOfAddr(keysOf(receipt.value)) === keyOfAddr(RECEIPT_ENUMERABLE),
    descriptor === undefined ? '<absent>' : `${JSON.stringify(keysOf(receipt.value))} / ${JSON.stringify(descriptor)}`);
  // **⟶ DW-03.4 — THE TWO-PAIR CONTROL (`DEF-AM`).** Two pairs stand in the registry; the reversal the delivery
  // raises moves ONE of their addresses (`['window']`, whose `tabs` loses `about`); the witness names that one and
  // NOT `['window','settings']`. **THE DRIVE'S COHERENCE IS ASSERTED FIRST**, so a registry that never carried two
  // pairs refuses the arm instead of reporting a verdict on it.
  const registryAddresses = registry.ok && Array.isArray(registry.value)
    ? registry.value.map((entry) => keyOfAddr(entry.address))
    : [];
  P('the registry the witness could have named (two pairs)', registryAddresses);
  A('DW-03.4', '`DEF-AM` (2026-10-28: the witness names the addresses the refused act MOVED, not every watched address)',
    'with TWO pairs registered and ONE address moved, the witness names exactly the moved address — one of the two — and never the untouched one',
    secondPair.ok && registered.ok && registryAddresses.length === 2
      && witness !== null && witness.length === 1 && Array.isArray(witness[0].addresses)
      && witness[0].addresses.length === 1
      && keyOfAddr(witness[0].addresses[0]) === keyOfAddr(['window'])
      && keyOfAddr(witness[0].addresses[0]) !== keyOfAddr(['window', 'settings']),
    `two pairs registered: ${JSON.stringify(registryAddresses)}; the witness named `
      + `${witness === null ? '<no witness>' : JSON.stringify(witness.map((one) => one.addresses))}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W3b) THE WITNESS IS THE ACT'S OWN WINDOW: a nested delete reports nothing and steals nothing
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W3b · A NESTED DELETE RAISES NOTHING AND ITS ANSWER CARRIES `[]` ────────────────');
{
  const store = make();
  store.write(['window'], 'mem', {
    tabs: { landingPage: { active: true }, settings: { active: false }, about: { active: false } },
  });
  const prior = store.write(['window', 'tabs', 'legal'], 'mem', { active: false });
  attempt(() => store.addConstraint({ address: ['window'], id: 'one-active-tab' }, () => true));
  const inner = [];
  const outer = [];
  let depth = 0;
  const handle = store.listen('tabs-listener', [['window', 'tabs']]);
  store.register(handle, () => {
    depth += 1;
    if (depth > 1) return; // THE NESTED DELIVERY RAISES NOTHING
    store.rollback(prior.op.opId); // RAISED IN THE OUTER DELETE'S OWN WINDOW
    inner.push(attempt(() => store.delete(['window', 'tabs', 'settings'])));
  });
  const receipt = attempt(() => store.delete(['window', 'tabs', 'landingPage']));
  const innerReceipt = inner.length === 0 ? null : inner[0];
  P('the outer delete\'s `discarded`', receipt.ok ? receipt.value.discarded : '<no receipt>');
  P('the nested delete\'s `discarded`', innerReceipt !== null && innerReceipt.ok
    ? innerReceipt.value.discarded : String(innerReceipt === null ? '<not reached>' : innerReceipt.caught));
  const outerWitness = witnessOf(receipt.ok ? receipt.value : null);
  const nestedWitness = witnessOf(innerReceipt !== null && innerReceipt.ok ? innerReceipt.value : null);
  A('DW-03b.1', '`D-42` item 3 (a request belongs to the act that raised it, measured by the window stamp)',
    'the request is reported on the OUTER delete\'s answer — the act whose window raised it',
    outerWitness !== null && outerWitness.length === 1,
    outerWitness === null ? '<no witness on the record>' : JSON.stringify(outerWitness));
  A('DW-03b.2', '`D-42` item 3 (a nested act is a window of its own)',
    'the NESTED delete\'s own answer reports nothing — it neither reports nor consumes another window\'s request',
    nestedWitness !== null && nestedWitness.length === 0,
    nestedWitness === null ? '<no witness on the nested record>' : JSON.stringify(nestedWitness));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W4) A WITNESS IS NOT A REFUSAL
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W4 · A WITNESS IS NOT A REFUSAL: the act answers, nothing is minted, the effect stands ──');
{
  const store = make();
  store.write(['window'], 'mem', tabsSeed());
  const prior = store.write(['window', 'tabs', 'about'], 'mem', { active: false });
  attempt(() => store.addConstraint({ address: ['window'], id: 'one-active-tab' }, () => true));
  const handle = store.listen('tabs-listener', [['window', 'tabs']]);
  store.register(handle, () => { store.rollback(prior.op.opId); });
  const receipt = attempt(() => store.delete(['window', 'tabs', 'landingPage']));
  P('the delete threw?', receipt.ok ? 'no' : JSON.stringify(receipt.caught));
  P('the record\'s `address` / `tiers` / `op.kind`', receipt.ok
    ? [receipt.value.address, receipt.value.tiers, receipt.value.op === null ? null : receipt.value.op.kind] : '<no receipt>');
  P('the reversal\'s effect — `window` now reads', receipt.ok ? store.read(['window']) : '<no receipt>');
  A('DW-04.1', '`D-49` (a witness is not a refusal: the act still answers what it answered, and throws nothing)',
    'the delete ANSWERS its record: no throw, `address` verbatim, one removed tier, `op.kind` the delete\'s own',
    receipt.ok && keyOfAddr(receipt.value.address) === keyOfAddr(['window', 'tabs', 'landingPage'])
      && keyOfAddr(receipt.value.tiers) === keyOfAddr(['mem'])
      && receipt.value.op !== null && receipt.value.op.kind === 'delete',
    receipt.ok ? JSON.stringify({ address: receipt.value.address, tiers: receipt.value.tiers, op: receipt.value.op && receipt.value.op.kind })
      : String(receipt.caught));
  const oneWitnessed = witnessOf(receipt.ok ? receipt.value : null);
  A('DW-04.2', '`DD-40` (the closed status set is neither widened nor re-spelled; a witness mints no code)',
    'neither the record nor its witness carries a status token, and the record\'s members are the declared ones',
    receipt.ok && statusesIn(receipt.value).length === 0 && oneWitnessed !== null && oneWitnessed.length === 1
      && statusesIn(oneWitnessed[0]).length === 0
      && keyOfAddr(ownNamesOf(oneWitnessed[0])) === keyOfAddr(['addresses', 'opId']),
    receipt.ok ? JSON.stringify({ record: statusesIn(receipt.value), witness: oneWitnessed === null ? '<none>' : ownNamesOf(oneWitnessed[0]) }) : String(receipt.caught));
  A('DW-04.3', '`D-42` (the step is not judged as a step: an in-window action\'s effect stands); `D-49` (the witness reports, it does not re-run)',
    'the reversal the listener performed STANDS — `window.tabs.about` is gone — and no refusal was produced',
    receipt.ok && !Object.hasOwn(store.read(['window']).tabs, 'about'),
    receipt.ok ? JSON.stringify(store.read(['window'])) : String(receipt.caught));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W5) THE CONTROL: the same reversal AT REST is judged, refused, and the store restored
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W5 · THE CONTROL — the same reversal ONE FRAME OUT is judged and refused ─────────');
{
  // **THE SAME DRIVE AS W3, WITH THE REVERSAL MOVED ONE FRAME OUT**: the listener runs its check and raises
  // nothing; after the delete has returned, the caller raises the same `rollback` it raised from inside the
  // delivery in W3. **THE ONLY DIFFERENCE IS THE FRAME — and the difference is the whole finding.**
  const store = make();
  store.write(['window'], 'mem', tabsSeed());
  const prior = store.write(['window', 'tabs', 'about'], 'mem', { active: false });
  const checks = [];
  attempt(() => store.addConstraint({ address: ['window'], id: 'one-active-tab' }, (context) => {
    const count = activeCount(context.value.tabs);
    return count === 1 ? true : { message: `exactly one tab must be active, ${count} stand so` };
  }));
  const handle = store.listen('tabs-listener', [['window', 'tabs']]);
  store.register(handle, () => { checks.push(activeCount(store.read(['window', 'tabs']))); });
  const receipt = attempt(() => store.delete(['window', 'tabs', 'landingPage']));
  const atRest = attempt(() => store.rollback(prior.op.opId));
  const caught = atRest.ok ? null : atRest.caught;
  P('the listener\'s check inside the delete\'s window (no action raised)', checks);
  P('the delete\'s witness (this delivery raised nothing)', receipt.ok ? receipt.value.discarded : '<no receipt>');
  P('the at-rest rollback, one frame out', atRest.ok ? 'answered its record' : JSON.stringify({ status: caught && caught.status, log: caught && caught.log && caught.log.length }));
  P('`window` after the refusal', store.read(['window']));
  A('DW-05.1', '`D-38` (a reversal at rest is judged at its terminal state); `D-41` (a judgement that refuses restores)',
    'the same reversal OUTSIDE the delete\'s window is refused `ConstraintPassRefused` in the one three-member form',
    atRest.ok === false && keyOfAddr(ownNamesOf(caught)) === keyOfAddr(REFUSAL_MEMBERS)
      && caught.status === PASS_REFUSED,
    atRest.ok ? 'answered' : JSON.stringify({ status: caught && caught.status, keys: ownNamesOf(caught) }));
  A('DW-05.2', '`D-38`/`D-41` (the refusal restores the state the reversal left)',
    'and the store is put BACK: `window.tabs.about` stands again — the state the window\'s discarded check owed',
    Object.hasOwn(store.read(['window']).tabs, 'about'),
    JSON.stringify(store.read(['window'])));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W6) THE OTHER WINDOW: a registration whose evaluated body raises an action — what CARRIES it?
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W6 · THE REGISTRATION WINDOW: an opaque identity carries NO witness ─────────────');
{
  // **THE DRIVE IS ARMED SO THE DISCARD WOULD HAVE TEETH IF IT WERE ATTRIBUTED**: one pair stands over
  // `[window]` and refuses a state where `landingPage` is gone; the second pair's registration body reverses the
  // write that put `landingPage` there, so **a restarted check of the first pair at the state the reversal left
  // WOULD refuse** — and the next unrelated write is the act a wrong attribution would land that refusal on.
  const store = make();
  store.write(['window'], 'mem', { tabs: { settings: { active: false } } });
  const prior = store.write(['window', 'tabs', 'landingPage'], 'mem', { active: true });
  const first = attempt(() => store.addConstraint({ address: ['window'], id: 'landing-page-stands' }, (context) => {
    const tabs = context.value.tabs;
    return Object.hasOwn(tabs, 'landingPage')
      ? true
      : { message: 'the window must keep a landing page; none stands' };
  }));
  let inside = null;
  let raised = null;
  const registration = attempt(() => store.addConstraint({ address: ['window', 'tabs', 'settings'], id: 'registration-window' },
    (context) => {
      inside = openCommits(store);
      // **THE ACTION IS RAISED AT THE REGISTRATION'S OWN INSTANT AND NOWHERE ELSE**: the registration's context
      // carries `attempt: null` (`kernel-surface.md §2.3` item 1's clause), while a landing pass's context carries
      // the attempt's `AttemptRef` — so this body acts ONCE, at the evaluation the window declares, and at every
      // later pass over its address it is a lawful pair that answers `true`.
      if (context.attempt === null) raised = attempt(() => store.rollback(prior.op.opId));
      return true;
    }));
  const identity = registration.ok ? registration.value : null;
  const next = attempt(() => store.write(['window', 'tabs', 'settings'], 'mem', { active: 'AFTER' }));
  P('the first pair registered against the seed', first.ok);
  P('the prior op (id, seq, compacted)', [prior.op.opId, prior.op.seq, prior.op.compacted]);
  P('the registration body ran with open commits', inside);
  P('the rollback it raised', raised === null ? '<not reached>' : (raised.ok ? 'answered its record' : JSON.stringify(raised.caught)));
  P('the registration\'s answer — `typeof` / own names', [identity === null ? '<no answer>' : typeof identity, ownNamesOf(identity)]);
  P('the state the reversal left (`window.tabs`)', store.read(['window', 'tabs']));
  P('the next unrelated write', next.ok ? 'answered normally' : JSON.stringify({ status: next.caught && next.caught.status }));
  A('DW-06.1', '`D-49` (a registration\'s own evaluation answers an identity or throws); `PAR-JS-25` (the identity is opaque)',
    'the registration answers an OPAQUE identity carrying NO own member — so no witness can be carried there without a new surface, and none is invented',
    registration.ok && identity !== null && typeof identity === 'object' && ownNamesOf(identity).length === 0,
    registration.ok ? `own names ${JSON.stringify(ownNamesOf(identity))}` : String(registration.caught));
  A('DW-06.2', '`D-42` item 3 (the request belongs to the window that raised it); `D-43` item 2 (the fail-state stands)',
    'the request the registration evaluation raised is DISCARDED and NOT attributed to the next unrelated write, which answers normally — and the pair that would refuse that state is never asked',
    first.ok && inside === 1 && raised !== null && raised.ok && next.ok,
    `first ${first.ok} · open ${inside} · raised ${raised === null ? '<not reached>' : raised.ok} · next ${next.ok}${next.ok ? '' : ` (${next.caught && next.caught.status})`}`);
  A('DW-06.3', '`D-49` (the witness is on the ACT\'S OWN ANSWER and never on the next unrelated call)',
    'and the next write\'s own record carries no witness of the registration\'s discard (a `WriteRecord` has three members and no `discarded`)',
    next.ok && keyOfAddr(keysOf(next.value)) === keyOfAddr(['op', 'triggered', 'watched'])
      && !('discarded' in next.value),
    next.ok ? `${JSON.stringify(keysOf(next.value))} / discarded in record: ${'discarded' in next.value}` : String(next.caught));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W7) AND THE BEHAVIOUR UNCHANGED: these two windows still run NO PASS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W7 · BEHAVIOUR UNCHANGED — no pass runs in either window ────────────────────────');
{
  const store = make();
  store.write(['window'], 'mem', tabsSeed());
  const prior = store.write(['window', 'tabs', 'about'], 'mem', { active: false });
  const asks = [];
  attempt(() => store.addConstraint({ address: ['window'], id: 'one-active-tab' }, (context) => {
    asks.push(activeCount(context.value.tabs));
    return true;
  }));
  const afterRegistration = asks.length;
  const handle = store.listen('tabs-listener', [['window', 'tabs']]);
  store.register(handle, () => { store.rollback(prior.op.opId); });
  const receipt = attempt(() => store.delete(['window', 'tabs', 'landingPage']));
  const afterDelete = asks.length;
  P('the pair\'s asks: at registration · after the delete', [afterRegistration, afterDelete]);
  P('the delete\'s witness (a report, not a check)', receipt.ok ? receipt.value.discarded : '<no receipt>');
  P('`window` after the delete (the effect stands)', receipt.ok ? store.read(['window']) : '<no receipt>');
  // **⟶ AND THE WINDOW THIS CELL MEASURES IS NOW DEFINED BY THE DELIVERY AND NOT BY THE VERB — `D-55` ITEM `3`,
  // 2026-10-29.** `D-1-bis` (*a delete consults no constraint*) is **superseded for the delete's OWN act**: the verb
  // runs a pass of its own kind, and this cell's pair stands at an ANCESTOR of the deleted address, which that
  // pass does not ask (the exact-address rule — `X6`/`DW-10.13`). **THE OBSERVABLE IS THEREFORE UNMOVED AND ITS
  // GROUND HAS NARROWED TO THE DELIVERY, which still runs no pass**, so the cell keeps its predicate and its
  // sentence and is read through the dated clause.
  A('DW-07.1', '`D-43` item 2 (`D-1-bis`: a delete consults no constraint — READ THROUGH `D-55` item 3 of 2026-10-29: the DELETE runs a pass; THIS DELIVERY runs none, and this pair stands at an ancestor the pass does not ask); `D-49` (`the behaviour unchanged` — no pass runs in this delivery)',
    'the delete\'s DELIVERY passes NO CONSTRAINT: the pair is asked exactly as often as the registration asked it — once — and not once by the delivery',
    receipt.ok && afterRegistration === 1 && afterDelete === 1,
    `asks ${JSON.stringify(asks)}`);
  A('DW-07.2', '`D-49` (a witness reports a discard; it does not run the check it names)',
    'the delete produced NO refusal, NO restored state and NO judgement: the reversal\'s effect still stands at the end',
    receipt.ok && !Object.hasOwn(store.read(['window']).tabs, 'about'),
    receipt.ok ? JSON.stringify(store.read(['window'])) : String(receipt.caught));
  const w7Witness = witnessOf(receipt.ok ? receipt.value : null);
  A('DW-07.3', '`D-49` (what a request still does NOT do, said rather than implied)',
    'the record reports the discard while the pair stands unasked at the state the action left — the witness is the whole of what the act now says',
    w7Witness !== null && w7Witness.length === 1 && afterDelete === 1,
    receipt.ok ? JSON.stringify({ discarded: w7Witness, asks }) : String(receipt.caught));
  console.log('');
  console.log('        WHAT A REQUEST STILL DOES NOT DO, IN ONE PARAGRAPH: a `rollback` raised inside either passless');
  console.log('        DELIVERY window is still NOT judged — no body is asked at the state it left, no refusal is');
  console.log('        produced, and nothing is restored. (A `delete` itself runs a pass from 2026-10-29 — `D-55` item');
  console.log('        3 — but its DELIVERY is still the passless instant, and it sits AFTER that pass.) In the');
  console.log('        delete\'s delivery it is now REPORTED on the act\'s own record');
  console.log('        (`record.discarded`); in a registration\'s window it is still silent, because its answer is an');
  console.log('        opaque identity with no member a witness could stand on. The recovery is unchanged and is still');
  console.log('        the consumer\'s: reload the file, or regenerate the store (`D-43` item 2, both exits).');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (W8) `D-50` — THE FINDING THIS PASS MADE, AND THE RULING THAT CLOSES IT
//
// **THE RULING** (`strata/decisions.md` · `D-50`, 2026-10-28, the architect, verbatim): *"If a constraint needs
// to look for the data at a given location, it can read()"*.
//
// **THE MEASURED FINDING IT CLOSES, DRIVEN HERE:** `c1` refuses `2` at its own address `['a']`; its repair lands
// `11` at a BESIDE address `['b']`; the re-run hands `c1` the value that repair's op returned — `11` — and the
// address `c1` judges still stands at `2`. **NOT A MACHINERY DEFECT: A CALLER NOT ASKING.** *"A package cannot be
// wrong about a value it was told to hand over; it can only be wrong about what it stored."*
//
// **THE TWO ARMS, AND THE READ IS THE WHOLE DIFFERENCE.** The pair's law here is about the location its repair
// lands at: `['b']` must be left at its seed, and a repair that lands `11` there is a state the pair refuses.
//   (a) WITH THE READ — the body calls `store.read(['b'])` to decide; on the re-run it reads `11` and REFUSES on
//       what it read, so the write fails (`ConstraintPassRefused`, the pair's own `KC-5` repeat) and the store is
//       restored.
//   (b) THE CONTROL, THE SAME BODY WITHOUT THE READ — it judges nothing but the value it was handed, passes at
//       `11`, and the write ANSWERS ITS RECORD with its own value still standing at `['a']` — the finding.
//
// **AND THE READ'S OWN WINDOW, PRINTED BECAUSE IT IS THE PART A READER GETS WRONG:** the read is run with the
// attempt's own commit open and the attempt LIVE (`open` `1`, `live` `1`), and the count and the attempt are the
// SAME after it returns. **A `read` is one of the surface's NON-BRACKETING calls — `read`, `readLiteral` and
// `constraints` open no commit — so the read's own act has no second count to show: what is measured and
// asserted is that it neither opens nor disturbs the attempt's own window, and that it runs NO CHECK — no other
// constraint is asked by it, and no verdict comes back from it.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W8 · `D-50` — a repair that lands elsewhere, and the read that sees it ───────────');
{
  const SEED_A = 5;      // the pair's own address `['a']`, admitted
  const VIOLATION = 2;   // the value the pair refuses at `['a']`
  const SEED_B = 0;      // the location the repair lands at, as the pair demands it
  const REPAIR = 11;     // the value the repair lands at `['b']` — a BESIDE address
  const windowIs = (readings) => readings !== null
    && JSON.stringify({ open: readings.open, live: readings.live }) === JSON.stringify({ open: 1, live: 1 });

  /**
   * `readsTheLocation` is the ONE thing the two arms differ in: the same body with `store.read(['b'])` as its
   * decision, or the same body without the read.
   */
  function crossAddressDrive(readsTheLocation) {
    const store = make();
    store.write(['a'], 'mem', SEED_A);
    store.write(['b'], 'mem', SEED_B);
    const asks = [];
    const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'c1' }, (context) => {
      if (context.value === VIOLATION) {
        asks.push({ kind: 'refuse', attempt: context.attempt === null ? null : context.attempt.id, value: context.value });
        return {
          message: 'c1 refuses 2 at its own address',
          repair: () => {
            const landed = store.write(['b'], 'mem', REPAIR);
            return { ok: true, op: landed.op };
          },
        };
      }
      if (!readsTheLocation) {
        asks.push({ kind: 'judge-context', attempt: context.attempt === null ? null : context.attempt.id, value: context.value });
        return true;
      }
      const before = windowOf(store);
      const read = store.read(['b']);
      const after = windowOf(store);
      asks.push({
        kind: 'judge-read',
        attempt: context.attempt === null ? null : context.attempt.id,
        value: context.value,
        read,
        before,
        after,
      });
      return read === SEED_B ? true : { message: `c1 refuses what it read at ['b']: ${JSON.stringify(read)}` };
    }));
    let openings = 0;
    const stop = store[ATTEMPT_OPENED](() => { openings += 1; });
    const written = attempt(() => store.write(['a'], 'mem', VIOLATION));
    stop();
    return {
      store,
      registered,
      asks,
      written,
      openings,
      standingA: attempt(() => store.read(['a'])),
      standingB: attempt(() => store.read(['b'])),
      rest: windowOf(store),
    };
  }

  const readArm = crossAddressDrive(true);
  const control = crossAddressDrive(false);
  const readRan = readArm.asks.find((ask) => ask.kind === 'judge-read' && ask.attempt !== null) ?? null;
  const firstAsk = readArm.asks.find((ask) => ask.kind === 'refuse') ?? null;
  const controlRan = control.asks.find((ask) => ask.kind === 'judge-context' && ask.attempt !== null) ?? null;
  const readLog = readArm.written.ok === false && Array.isArray(readArm.written.caught.log)
    ? readArm.written.caught.log
    : [];
  const readRefusal = readLog.filter((entry) => entry.kind === 'constraint-check').map((entry) => entry.message);
  const theRefusal = readLog.filter((entry) => entry.kind === 'constraint-check' && typeof entry.message === 'string'
    && entry.message.includes('refuses what it read'));

  P('the value the context handed the pair at the re-run', readRan === null ? '<not reached>' : readRan.value);
  P('the value the body\'s own `read([\'b\'])` returned', readRan === null ? '<not reached>' : readRan.read);
  P('the window during the read / after it', readRan === null ? '<not reached>' : [readRan.before, readRan.after]);
  P('the attempt the read ran under (and the first ask\'s)', readRan === null ? '<not reached>'
    : [readRan.attempt, firstAsk === null ? null : firstAsk.attempt]);
  P('the write\'s answer (WITH the read)', readArm.written.ok ? 'answered its record'
    : `${readArm.written.caught.status} · ${JSON.stringify(readRefusal)}`);
  P('the store after the refused write (`[\'a\']`, `[\'b\']`)',
    [readArm.standingA.ok ? readArm.standingA.value : '<threw>',
      readArm.standingB.ok ? readArm.standingB.value : '<threw>']);
  P('the control: the same body WITHOUT the read — what the context handed it', controlRan === null ? '<not reached>' : controlRan.value);
  P('the control\'s write', control.written.ok ? 'ANSWERED ITS RECORD' : `${control.written.caught.status}`);
  P('the control\'s store after (`[\'a\']`, `[\'b\']`) — the finding',
    [control.standingA.ok ? control.standingA.value : '<threw>',
      control.standingB.ok ? control.standingB.value : '<threw>']);
  P('`attempt-opened` for the whole write · WITH the read / without it', [readArm.openings, control.openings]);
  A('DW-08.1', '`D-50` (verbatim: *"If a constraint needs to look for the data at a given location, it can read()"*; `context.value` is the value the write verb returned — `S-WINDOW`, unmoved); `D-45` (a callback\'s call enters at the surface); `D-1-bis` (a read consults no constraint)',
    'A REPAIR THAT LANDS ELSEWHERE IS SEEN BY A READ AND ONLY BY A READ: the re-run hands the pair `11` (the value the write verb returned) while `[\'a\']` still stands at `2`; the same body WITH `read([\'b\'])` refuses on what it read (`11`) and the write fails with the pair\'s own repeat, the store restored; the same body WITHOUT the read passes and the write answers its record with its own value still standing — and the read itself ran under the attempt\'s own window (`1`/`1`) and left it exactly as it found it',
    readArm.registered.ok === true
      && readArm.written.ok === false && readArm.written.caught.status === PASS_REFUSED
      && readRan !== null && readRan.value === REPAIR && readRan.read === REPAIR
      && windowIs(readRan.before) && windowIs(readRan.after)
      && readRan.attempt !== null && firstAsk !== null && readRan.attempt === firstAsk.attempt
      && theRefusal.length === 1
      && readArm.standingA.ok && readArm.standingA.value === SEED_A
      && readArm.standingB.ok && readArm.standingB.value === SEED_B
      && readArm.rest.open === 0 && readArm.rest.live === 0
      && readArm.openings === 1
      && control.registered.ok === true && control.written.ok === true
      && controlRan !== null && controlRan.value === REPAIR
      && control.standingA.ok && control.standingA.value === VIOLATION
      && control.standingB.ok && control.standingB.value === REPAIR
      && control.openings === 1,
    `read arm: registered ${readArm.registered.ok} · re-run context ${readRan === null ? '<not reached>' : readRan.value} · read ${readRan === null ? '<not reached>' : readRan.read} · window ${readRan === null ? '<not reached>' : `${readRan.before.open}/${readRan.before.live}->${readRan.after.open}/${readRan.after.live}`} · write ${readArm.written.ok ? 'ANSWERED' : readArm.written.caught.status} · `
      + `standings a=${readArm.standingA.ok ? readArm.standingA.value : '<threw>'} b=${readArm.standingB.ok ? readArm.standingB.value : '<threw>'} · openings ${readArm.openings} || `
      + `control: re-run context ${controlRan === null ? '<not reached>' : controlRan.value} · write ${control.written.ok ? 'ANSWERED' : control.written.caught.status} · `
      + `standings a=${control.standingA.ok ? control.standingA.value : '<threw>'} b=${control.standingB.ok ? control.standingB.value : '<threw>'} · openings ${control.openings}`);
  console.log('');
  console.log('        THE SENTENCE TO CARRY AWAY (`D-50`): `context.value` IS THE VALUE THE WRITE VERB RETURNED;');
  console.log('        A CONSTRAINT THAT CARES ABOUT ANOTHER LOCATION READS IT. And the consequence a reader gets');
  console.log('        wrong: a read inside a body is caller code entering the surface (`D-45`) and it runs NO');
  console.log('        CHECK — nothing is judged by it: no other constraint is asked on the value it returns, and');
  console.log('        that value is never a verdict. A read is a NON-BRACKETING call, so it opens no commit of its');
  console.log('        own and moves no count; it neither repeats nor replaces the pass the write already ran.');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W9) `D-54` — THE FALSE CLAUSE, AND THE THREE HOSTS THAT REFUTE IT
//
// **THE FINDING** (`strata/decisions.md` · `D-54`, 2026-10-28): the shipped guide said *"every pass that DOES run
// drains its own restart request — so the fail-state is bounded by the two acts that run none"*, and the
// consumer MEASURED three hosts where BOTH cannot hold — **a repair body**, **a delete's pass** and **a
// reentrant reversal-then-write** — each RUNS a pass and each left the reversal unjudged with its effect
// standing (zero judge invocations, the refused `5` still there).
//
// **THE TWO HALVES THE FIX LANDS, AND EACH HOST IS DRIVEN AGAINST ITS OWN**:
//   * **(a) A PASS DOES NOT CONSUME A REQUEST IT DID NOT RAISE.** A nested pass — the `['b']` write inside the
//     listener body below — used to CLEAR the enclosing window's request at the drain's window comparison, so
//     the enclosing pass found nothing to judge. It now leaves it standing.
//   * **(b) A REQUEST RAISED INSIDE A PASS IS CARRIED TO THAT PASS'S OWN TERMINAL STATE** — including a pass
//     that ends by THROWING. The failing arm's drain runs at the state the pass left, and the kernel's own
//     compensating rollback is flagged (`Symbol.for('provident-storeroom.compensating-rollback')`) so it raises
//     and is judged as no consumer's action (`D-42`: *"a restart is only ever raised by a consumer's own
//     `rollback` member call"*).
//
// **EACH HOST PRINTS THE FOUR FACTS `D-54` WAS REFUTED AGAINST**: did a pass run (which pairs, at which
// values); was a request raised (its window, the op its reversal named); who consumed it (the pass's own drain,
// evidenced by the restarted ask); and is the reversal judged (the ask at the state it left, the refusal, the
// store's reading). **THE CONTROL IS THE DECLARED WINDOW**: a delete's listener delivery that OPENS the window
// still runs NO pass, still reports the discard and still leaves the effect standing.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W9 · `D-54` — three hosts where a pass runs, and the reversal is JUDGED ──────────');
{
  const SEED = 5;      // the state the reversal RESTORES — and the state every pair here REFUSES
  const LANDED = 9;    // the value the reversal's target op landed — the state the pair was registered at
  const THIRD = 7;     // the terminal write's own value
  const windowAt = (store) => ({ open: openCommits(store), live: kernelFor(store).live.size, window: currentWindow(store) });
  const statusOf = (caught) => (caught !== null && typeof caught === 'object' && typeof caught.status === 'string'
    ? caught.status
    : null);
  /** A pair whose law is: admit `LANDED`, refuse every other state — so the state the reversal leaves (`SEED`)
   *  is the one it refuses, and the value the write landed (`THIRD`) is the one a repair may see. */
  const refusesTheRest = (asked) => (context) => {
    asked.push(context.value);
    if (Object.is(context.value, LANDED)) return true;
    return { message: 'the state this pair is asked for is not one it admits' };
  };
  const restoreSaid = (log) => (log.length === 1 && typeof log[0].message === 'string'
    && /\bUNDONE\b/.test(log[0].message));

  // ── HOST 1 · A REPAIR BODY ─────────────────────────────────────────────────────────────────────────
  const repairStore = make();
  repairStore.write(['a'], 'mem', SEED);
  const repairTarget = repairStore.write(['a'], 'mem', LANDED);
  const repairAsks = [];
  let repairRollback = null;
  let repairWindow = null;
  const repairRegistered = attempt(() => repairStore.addConstraint({ address: ['a'], id: 'repair-host' }, (context) => {
    repairAsks.push(context.value);
    if (Object.is(context.value, THIRD) && context.attempt !== null) {
      return {
        message: 'the repair host refuses this state and reverses',
        repair: () => {
          repairWindow = windowAt(repairStore);
          repairRollback = attempt(() => repairStore.rollback(repairTarget.op.opId));
          return { ok: false, message: 'the repair gave up' };
        },
      };
    }
    return Object.is(context.value, SEED)
      ? { message: 'the state this pair is asked for is not one it admits' }
      : true;
  }));
  const repairTerminal = attempt(() => repairStore.write(['a'], 'mem', THIRD));
  const repairCaught = repairTerminal.ok === false ? repairTerminal.caught : null;
  const repairLog = repairCaught !== null && Array.isArray(repairCaught.log) ? repairCaught.log : [];
  const repairStanding = repairStore.read(['a']);

  P('HOST 1 (repair body) · the pairs asked, in order', repairAsks);
  P('HOST 1 (repair body) · the window the repair body reversed in (its window)', repairWindow);
  P('HOST 1 (repair body) · the reversal\'s own record', repairRollback === null ? '<not reached>'
    : (repairRollback.ok ? repairRollback.value : String(repairRollback.caught)));
  P('HOST 1 (repair body) · the write\'s answer', repairCaught === null ? '<answered>'
    : { status: statusOf(repairCaught), log: repairLog.map((entry) => entry.id) });
  P('HOST 1 (repair body) · the store after it, before → after', [repairStanding]);

  A('DW-09.1', '`D-54` (b) — a repair body\'s reversal is carried to the pass\'s TERMINAL state; `D-38` (the judgement is of the terminal state, once); `D-42` item 3',
    'THE REPAIR HOST IS JUDGED: the pass ran (the pair asked at `7`), the repair body reversed in the pass\'s own window (`open 1`, `live 1`), the reversal still ANSWERED its record (the step is not judged as a step), and the pass\'s terminal state was JUDGED — the pair asked at `5`, the declared refusal `ConstraintPassRefused` with ONE `constraint-check` entry naming it, and the store restored to `9`',
    repairRegistered.ok === true
      && repairWindow !== null && repairWindow.open === 1 && repairWindow.live === 1
      && repairRollback !== null && repairRollback.ok === true
      && repairAsks[0] === LANDED && repairAsks[1] === THIRD
      && repairAsks.filter((value) => Object.is(value, SEED)).length === 1
      && statusOf(repairCaught) === PASS_REFUSED
      && repairLog.length === 1 && repairLog[0].kind === 'constraint-check'
      && repairLog[0].id === 'repair-host' && restoreSaid(repairLog)
      && repairStanding === LANDED,
    `registered ${repairRegistered.ok} · window ${JSON.stringify(repairWindow)} · reversal `
      + `${repairRollback !== null && repairRollback.ok ? 'answered' : '<not reached>'} · asks ${JSON.stringify(repairAsks)} · `
      + `answer ${repairCaught === null ? 'ANSWERED' : statusOf(repairCaught)} · log ${JSON.stringify(repairLog.map((entry) => [entry.kind, entry.id]))} · `
      + `store ${JSON.stringify(repairStanding)} (the reversal left ${SEED}, the pair refuses ${SEED}, the commit opened at ${LANDED})`);

  // ── HOST 2 · A DELETE'S PASS ──────────────────────────────────────────────────────────────────────
  // THE DELETE IS PERFORMED INSIDE A PASS: it joins that pass's commit (`opened === false`), its delivery
  // fires a listener, and the reversal that listener raises is stamped with the PASS's window. **THE DECLARED
  // delete window it is NOT**: the DECLARED one is the delete's passless DELIVERY. **⟶ AND FROM 2026-10-29 THE
  // DELETE'S OWN ACT RUNS A PASS OF ITS OWN KIND TOO (`D-55` item 3, `X`/`DW-10.8`) — at `['x']`, where this
  // drive registers no pair, so it asks nothing and this host's readings are unmoved.**
  const deleteStore = make();
  deleteStore.write(['a'], 'mem', SEED);
  deleteStore.write(['x'], 'mem', 1);
  const deleteTarget = deleteStore.write(['a'], 'mem', LANDED);
  const deleteAsks = [];
  let deleteRollback = null;
  let deleteWindow = null;
  let deleteReceipt = null;
  let deleteActed = false;
  const deleteListener = deleteStore.listen('delete-pass-listener', [['x']]);
  deleteStore.register(deleteListener, () => {
    if (deleteRollback === null) {
      deleteWindow = windowAt(deleteStore);
      deleteRollback = attempt(() => deleteStore.rollback(deleteTarget.op.opId));
    }
  });
  const deleteRegistered = attempt(() => deleteStore.addConstraint({ address: ['a'], id: 'delete-pass-host' }, (context) => {
    deleteAsks.push(context.value);
    if (context.attempt !== null && deleteActed === false) {
      deleteActed = true;
      deleteReceipt = attempt(() => deleteStore.delete(['x'], 'mem'));
      return { message: 'the delete host refuses the state its delivery left' };
    }
    return Object.is(context.value, SEED)
      ? { message: 'the state this pair is asked for is not one it admits' }
      : true;
  }));
  const deleteTerminal = attempt(() => deleteStore.write(['a'], 'mem', THIRD));
  const deleteCaught = deleteTerminal.ok === false ? deleteTerminal.caught : null;
  const deleteLog = deleteCaught !== null && Array.isArray(deleteCaught.log) ? deleteCaught.log : [];
  const deleteStanding = deleteStore.read(['a']);
  const deleteDiscarded = deleteReceipt !== null && deleteReceipt.ok
    && Array.isArray(deleteReceipt.value.discarded) ? deleteReceipt.value.discarded : null;

  P('HOST 2 (delete\'s pass) · the pairs asked, in order', deleteAsks);
  P('HOST 2 (delete\'s pass) · the window the delete\'s listener reversed in (its window)', deleteWindow);
  P('HOST 2 (delete\'s pass) · the reversal\'s own record', deleteRollback === null ? '<not reached>'
    : (deleteRollback.ok ? deleteRollback.value : String(deleteRollback.caught)));
  P('HOST 2 (delete\'s pass) · the delete\'s own answer', deleteReceipt === null ? '<not reached>'
    : (deleteReceipt.ok ? { discarded: deleteDiscarded, triggered: deleteReceipt.value.triggered }
      : String(deleteReceipt.caught)));
  P('HOST 2 (delete\'s pass) · the write\'s answer', deleteCaught === null ? '<answered>'
    : { status: statusOf(deleteCaught), log: deleteLog.map((entry) => entry.id) });
  P('HOST 2 (delete\'s pass) · the store after it', [deleteStanding]);

  A('DW-09.2', '`D-54` (b) — a reversal raised while a delete runs inside a pass is carried to THAT pass\'s terminal state; `D-43` item 1 (`D-1-bis` — *a delete consults no constraint* — is READ THROUGH `D-55` item 3 of 2026-10-29: the delete now runs a pass of its own kind, at its own address, and this host registers no pair there)',
    'THE DELETE HOST IS JUDGED: the pass ran (the pair asked at `7`), the delete ran inside it and its listener delivered at the PASS\'s window (`open 1`, `live 1` — so the delete opened no window of its own and reports no witness), the reversal ANSWERED its record, and the pass\'s terminal state was JUDGED — the pair asked at `5`, the declared `ConstraintPassRefused` with ONE entry naming it, and the store restored to `9`',
    deleteRegistered.ok === true && deleteActed === true
      && deleteWindow !== null && deleteWindow.open === 1 && deleteWindow.live === 1
      && deleteRollback !== null && deleteRollback.ok === true
      && deleteReceipt !== null && deleteReceipt.ok === true && deleteDiscarded !== null
      && deleteReceipt.value.discarded.length === 0
      && deleteAsks[0] === LANDED && deleteAsks[1] === THIRD
      && deleteAsks.filter((value) => Object.is(value, SEED)).length === 1
      && statusOf(deleteCaught) === PASS_REFUSED
      && deleteLog.length === 1 && deleteLog[0].kind === 'constraint-check'
      && deleteLog[0].id === 'delete-pass-host' && restoreSaid(deleteLog)
      && deleteStanding === LANDED,
    `registered ${deleteRegistered.ok} · acted ${deleteActed} · window ${JSON.stringify(deleteWindow)} · reversal `
      + `${deleteRollback !== null && deleteRollback.ok ? 'answered' : '<not reached>'} · delete `
      + `${deleteReceipt === null ? '<not reached>' : (deleteReceipt.ok ? `answered, discarded ${JSON.stringify(deleteDiscarded)}` : String(deleteReceipt.caught))} · `
      + `asks ${JSON.stringify(deleteAsks)} · answer ${deleteCaught === null ? 'ANSWERED' : statusOf(deleteCaught)} · `
      + `log ${JSON.stringify(deleteLog.map((entry) => [entry.kind, entry.id]))} · store ${JSON.stringify(deleteStanding)}`);

  // ── HOST 3 · A REENTRANT REVERSAL-THEN-WRITE ───────────────────────────────────────────────────────
  // THE LISTENER BODY OF THE OUTER WRITE'S DELIVERY reverses at `['a']` and THEN writes at `['b']`. The nested
  // write is a pass in a window of its own; under the old drain it DROPPED the enclosing window's request at
  // the window comparison, so the outer write's own drain judged nothing (`D-54` (a)).
  const reentrantStore = make();
  reentrantStore.write(['a'], 'mem', SEED);
  const reentrantTarget = reentrantStore.write(['a'], 'mem', LANDED);
  const reentrantAsks = [];
  let reentrantRollback = null;
  let reentrantWindow = null;
  let reentrantNested = null;
  const reentrantListener = reentrantStore.listen('reentrant-listener', [['a']]);
  reentrantStore.register(reentrantListener, () => {
    if (reentrantRollback === null) {
      reentrantWindow = windowAt(reentrantStore);
      reentrantRollback = attempt(() => reentrantStore.rollback(reentrantTarget.op.opId));
      reentrantNested = attempt(() => reentrantStore.write(['b'], 'mem', 11));
    }
  });
  // **THE OUTER WRITE MUST PASS** for its terminal delivery to run at all, so this pair admits `THIRD` and
  // refuses only the state the reversal leaves (`SEED`) — the shape `D-42`'s in-commit arms measure.
  const reentrantRegistered = attempt(() => reentrantStore.addConstraint({ address: ['a'], id: 'reentrant-host' },
    (context) => {
      reentrantAsks.push(context.value);
      return Object.is(context.value, SEED)
        ? { message: 'the state the reversal leaves is not one this pair admits' }
        : true;
    }));
  const reentrantTerminal = attempt(() => reentrantStore.write(['a'], 'mem', THIRD));
  const reentrantCaught = reentrantTerminal.ok === false ? reentrantTerminal.caught : null;
  const reentrantLog = reentrantCaught !== null && Array.isArray(reentrantCaught.log) ? reentrantCaught.log : [];
  const reentrantStanding = reentrantStore.read(['a']);
  const reentrantNestedStanding = attempt(() => reentrantStore.read(['b']));

  P('HOST 3 (reentrant) · the pairs asked, in order', reentrantAsks);
  P('HOST 3 (reentrant) · the window the listener reversed in (its window)', reentrantWindow);
  P('HOST 3 (reentrant) · the reversal\'s own record', reentrantRollback === null ? '<not reached>'
    : (reentrantRollback.ok ? reentrantRollback.value : String(reentrantRollback.caught)));
  P('HOST 3 (reentrant) · the nested write', reentrantNested === null ? '<not reached>'
    : (reentrantNested.ok ? 'answered its own record' : String(reentrantNested.caught)));
  P('HOST 3 (reentrant) · the outer write\'s answer', reentrantCaught === null ? '<answered>'
    : { status: statusOf(reentrantCaught), log: reentrantLog.map((entry) => entry.id) });
  P('HOST 3 (reentrant) · the store after it (`[\'a\']`, `[\'b\']`)',
    [reentrantStanding, reentrantNestedStanding.ok ? reentrantNestedStanding.value : '<threw>']);

  A('DW-09.3', '`D-54` (a) — a pass does not consume a request it did not raise; `D-42` item 3 (a request belongs to the act that raised it); `D-38`',
    'THE REENTRANT HOST IS JUDGED: the listener reversed in the OUTER write\'s window (`open 1`, `live 0`) and then made a nested write in a window of its own, whose pass LEFT the enclosing request standing — and the outer pass\'s own drain judged it: the pair asked at `5`, the declared `ConstraintPassRefused` with ONE entry naming it, the store restored to `9` (the whole-commit undo, so the nested write\'s own value goes with it),',
    reentrantRegistered.ok === true
      && reentrantWindow !== null && reentrantWindow.open === 1 && reentrantWindow.live === 0
      && reentrantRollback !== null && reentrantRollback.ok === true
      && reentrantNested !== null && reentrantNested.ok === true
      && reentrantAsks[0] === LANDED
      && reentrantAsks.filter((value) => Object.is(value, SEED)).length === 1
      && statusOf(reentrantCaught) === PASS_REFUSED
      && reentrantLog.length === 1 && reentrantLog[0].kind === 'constraint-check'
      && reentrantLog[0].id === 'reentrant-host' && restoreSaid(reentrantLog)
      && reentrantStanding === LANDED
      // **THE REFUSAL'S COMPENSATING ACT IS THE WHOLE-COMMIT UNDO** (`DEF-AJ`): `restoreMark` names the mark
      // the OUTER commit cached at its opening, so the nested write's own value is undone with the reversal —
      // and the crossed sentence says so.
      && reentrantNestedStanding.ok === false,
    `registered ${reentrantRegistered.ok} · window ${JSON.stringify(reentrantWindow)} · reversal `
      + `${reentrantRollback !== null && reentrantRollback.ok ? 'answered' : '<not reached>'} · nested `
      + `${reentrantNested !== null && reentrantNested.ok ? 'answered' : '<not reached>'} · asks ${JSON.stringify(reentrantAsks)} · `
      + `answer ${reentrantCaught === null ? 'ANSWERED' : statusOf(reentrantCaught)} · `
      + `log ${JSON.stringify(reentrantLog.map((entry) => [entry.kind, entry.id]))} · `
      + `store a=${JSON.stringify(reentrantStanding)} b=${JSON.stringify(reentrantNestedStanding.ok ? reentrantNestedStanding.value : '<threw>')}`);

  // ── THE CONTROL · THE DECLARED WINDOW, UNCHANGED ──────────────────────────────────────────────────
  // **A DELETE THAT OPENS ITS OWN WINDOW RUNS NO PASS** (`D-1-bis`; `D-43` item 2): the request a listener
  // raises there is still reported by the `discarded` witness, is still consumed by nobody, and the reversal's
  // effect still stands. **THE FIX MOVED NEITHER THE WINDOW NOR ITS EXIT.**
  const controlStore = make();
  controlStore.write(['a'], 'mem', 1);
  controlStore.write(['b'], 'mem', SEED);
  const controlTarget = controlStore.write(['b'], 'mem', LANDED);
  const controlAsks = [];
  const controlRegistered = attempt(() => controlStore.addConstraint({ address: ['b'], id: 'declared-window-pair' },
    refusesTheRest(controlAsks)));
  let controlRollback = null;
  let controlWindow = null;
  const controlListener = controlStore.listen('declared-window-listener', [['a']]);
  controlStore.register(controlListener, () => {
    if (controlRollback === null) {
      controlWindow = windowAt(controlStore);
      controlRollback = attempt(() => controlStore.rollback(controlTarget.op.opId));
    }
  });
  const controlDelete = attempt(() => controlStore.delete(['a'], 'mem'));
  const controlWitness = controlDelete.ok && Array.isArray(controlDelete.value.discarded)
    ? controlDelete.value.discarded
    : null;
  const controlStanding = controlStore.read(['b']);
  P('CONTROL (declared window) · the pairs asked', controlAsks);
  P('CONTROL (declared window) · the window the delete\'s listener reversed in', controlWindow);
  P('CONTROL (declared window) · the delete\'s witness, before → after', controlWitness);
  P('CONTROL (declared window) · the store after it (the effect STANDS)', controlStanding);
  A('DW-09.4', '`D-54` (the two declared windows unchanged); `D-43` item 2; `D-49` (a witness reports, it does not run the check)',
    'THE CONTROL IS UNCHANGED: a delete that OPENS its own window runs NO pass — the pair is asked ONLY at registration, never at the state the reversal left — the request is still reported by `discarded` (ONE entry), and the reversal\'s effect (`5`) still stands',
    controlRegistered.ok === true
      && controlWindow !== null && controlWindow.open === 1 && controlWindow.live === 0
      && controlRollback !== null && controlRollback.ok === true
      && controlDelete.ok === true
      && controlWitness !== null && controlWitness.length === 1
      && controlAsks.length === 1 && controlAsks[0] === LANDED
      && controlAsks.filter((value) => Object.is(value, SEED)).length === 0
      && controlStanding === SEED,
    `registered ${controlRegistered.ok} · window ${JSON.stringify(controlWindow)} · reversal `
      + `${controlRollback !== null && controlRollback.ok ? 'answered' : '<not reached>'} · delete `
      + `${controlDelete.ok ? 'answered' : String(controlDelete.caught)} · witness ${JSON.stringify(controlWitness)} · `
      + `asks ${JSON.stringify(controlAsks)} · store ${JSON.stringify(controlStanding)}`);
  console.log('');
  console.log('        THE SENTENCE TO CARRY AWAY (`D-54`): THE FAIL-STATE OF PASS-HOSTED REVERSALS IS EMPTY.');
  console.log('        Every pass that runs — the passing arm AND the failing arm, a repair body\'s, a delete\'s,');
  console.log('        a reentrant one\'s — now carries the request its own bodies raised to its terminal state and');
  console.log('        judges it there; and no pass consumes a request another window raised. The two declared');
  console.log('        windows that run NO pass stand exactly as they stood: the delete\'s delivery (reported on');
  console.log('        `discarded`, effect standing) and the registration\'s own evaluation (silent, identity-only).');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (W10) `D-55`'s CLARIFICATIONS — THE FIVE ROWS THIS PASS SETTLES, EACH MEASURED ON THE SHIPPED ARTEFACT
//
// **THE RULING** (`strata/decisions.md` · `D-55`, 2026-10-28, the architect, verbatim, six clarifications).
// The rows are `DEF-AH` (a witness entry's address LIST is never empty), `DEF-AK` (a thrown message stands in
// the message log), `DEF-AN` (a refused edit undoes the WHOLE commit), `DEF-AO` (a closed attempt's report and
// log do not mutate after the handoff) and `DEF-AP` (two listeners each reversing in one commit judge the
// state the commit STANDS at). `DEF-X` IS A MEASUREMENT and not a build: can a delete run a constraint pass?
//
// **EACH CELL PRINTS THE READING IT TOOK BEFORE IT ASSERTS ANYTHING** (`D-21`), and every clause cited is a
// comment — no `docs/**` path is opened at runtime (`D-17`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W10 · `D-55` — the five settled rows, measured ───────────────────────────────────');
{
  /** THE CROSSED STATUS OF A CAUGHT VALUE, or `<answered>` — a local spelling, so no cell here reads a
   *  helper another section happens to define. */
  const statusOf = (caught) => (caught !== null && typeof caught === 'object' && typeof caught.status === 'string'
    ? caught.status
    : '<no status on the caught value>');

  // ── (AH-1) AN ENTRY WITH AN EMPTY ADDRESS LIST IS NEVER SHIPPED — `DEF-AH` ─────────────────────────
  // THE MEASUREMENT THE ROW FILES, DRIVEN: a delete's listener makes a NESTED WRITE and then reverses an op
  // that moved NOTHING the registry watches. The request is raised (the action ran in this window), its
  // moved set is EMPTY, and `1.3.0` reported `addresses: []` — a LIST, which `D-55` says is not a legal
  // response for any watched address. **NOTHING MOVED, SO THERE IS NO DISCARD TO REPORT: THE ENTRY IS ABSENT.**
  const ahStore = make();
  ahStore.write(['window'], 'mem', tabsSeed());
  const ahPrior = ahStore.write(['elsewhere'], 'mem', 1);
  const ahAsks = [];
  attempt(() => ahStore.addConstraint({ address: ['window'], id: 'window-pair' }, (context) => {
    ahAsks.push(context.attempt === null ? 'registration' : 'pass');
    return true;
  }));
  let ahRollback = null;
  const ahHandle = ahStore.listen('ah-listener', [['window', 'tabs']]);
  ahStore.register(ahHandle, () => {
    // THE NESTED WRITE, and then a reversal of an op the watched address never held.
    attempt(() => ahStore.write(['elsewhere'], 'mem', 2));
    ahRollback = attempt(() => ahStore.rollback(ahPrior.op.opId));
  });
  const ahReceipt = attempt(() => ahStore.delete(['window', 'tabs', 'landingPage']));
  const ahDiscarded = ahReceipt.ok && Array.isArray(ahReceipt.value.discarded) ? ahReceipt.value.discarded : null;
  const ahEmptyEntries = ahDiscarded === null ? null : ahDiscarded.filter((one) => Array.isArray(one.addresses)
    && one.addresses.length === 0).length;
  P('DEF-AH · the delete\'s `discarded` (the nested-write arm)', ahDiscarded);
  P('DEF-AH · entries with an EMPTY address list', ahEmptyEntries);
  P('DEF-AH · the pair\'s asks (registration / pass)', ahAsks);
  P('DEF-AH · the reversal the listener raised', ahRollback === null ? '<not reached>'
    : (ahRollback.ok ? 'answered its record' : String(ahRollback.caught)));
  A('DW-10.1', '`D-55` item 2 / `DEF-AH` (2026-10-28): *"A witness address of [] corresponds to the register itself. This is not a legal response for any other watched address"* — an empty address LIST is never lawful',
    'a discarded request whose reversal moved NOTHING ships NO entry — `discarded` is the empty list, and no entry carries an empty `addresses` — because nothing moved and there is no discard to report',
    ahReceipt.ok === true && ahDiscarded !== null && ahDiscarded.length === 0 && ahEmptyEntries === 0
      && ahRollback !== null && ahRollback.ok === true,
    `receipt ${ahReceipt.ok ? 'answered' : String(ahReceipt.caught)} · discarded ${JSON.stringify(ahDiscarded)} · `
      + `empty-list entries ${ahEmptyEntries} · asks ${JSON.stringify(ahAsks)}`);

  // ── (AH-2) AND THE ROOT STAYS AN ADDRESS — `[[]]`, NOT `[]` ─────────────────────────────────────────
  // The pair stands at the ROOT (`[]` — the register itself), so a reversal that moves the root's assembled
  // value moves THAT ADDRESS. **ONE ELEMENT WHOSE SEGMENT LIST IS EMPTY** is the distinction the ruling draws,
  // and it is printed beside the empty-LIST arm above so a reader cannot confuse the two.
  const ahRootStore = make();
  ahRootStore.write(['a'], 'mem', 1);
  const ahRootPrior = ahRootStore.write(['c'], 'mem', 5);
  const ahRootPair = attempt(() => ahRootStore.addConstraint({ address: [], id: 'root-pair' }, () => true));
  const ahRootHandle = ahRootStore.listen('ah-root-listener', [['a']]);
  ahRootStore.register(ahRootHandle, () => { attempt(() => ahRootStore.rollback(ahRootPrior.op.opId)); });
  const ahRootReceipt = attempt(() => ahRootStore.delete(['a']));
  const ahRootDiscarded = ahRootReceipt.ok && Array.isArray(ahRootReceipt.value.discarded)
    ? ahRootReceipt.value.discarded : null;
  const ahRootAddresses = ahRootDiscarded !== null && ahRootDiscarded.length === 1
    && Array.isArray(ahRootDiscarded[0].addresses) ? ahRootDiscarded[0].addresses : null;
  P('DEF-AH · the ROOT pair registered', ahRootPair.ok);
  P('DEF-AH · `discarded` where the reversal moved the ROOT', ahRootDiscarded);
  P('DEF-AH · `addresses` — one element, the empty SEGMENT list', ahRootAddresses);
  A('DW-10.2', '`D-55` item 2 / `DEF-AH`: an ADDRESS of `[]` IS the register and must appear — `[[]]` — while a LIST of `[]` is never shipped',
    'a reversal that moves the root reports `addresses: [[]]` — length `1`, whose one element is the empty segment list — so the root is distinguishable from the empty list above',
    ahRootPair.ok === true && ahRootDiscarded !== null && ahRootDiscarded.length === 1
      && ahRootAddresses !== null && ahRootAddresses.length === 1
      && Array.isArray(ahRootAddresses[0]) && ahRootAddresses[0].length === 0,
    `pair ${ahRootPair.ok} · discarded ${JSON.stringify(ahRootDiscarded)} · addresses ${JSON.stringify(ahRootAddresses)}`);

  // ── (AK) THE THROWN MESSAGE STANDS IN THE MESSAGE LOG — `D-55` item 1 / `DEF-AK` ────────────────────
  // THE CLARIFICATION, VERBATIM: *"Include a thrown message in the message log. Obviously."* **THE MEASURED
  // DEFECT:** the crossed rank-`18` form's `log` carried only the attempt's `outcome` entry and the thrown
  // value's own literal occurred ZERO times in it, while the crossed sentence claimed *"a constraint body's
  // throwable crosses as this refusal"*. **Now the terminal entry's sentence carries the form the value took,
  // and the crossed sentence says in its own words that the value does NOT cross as this refusal.**
  const thrownForms = [
    { label: 'an `Error`', thrown: new Error('DW-THROWN-ERROR'), literal: 'DW-THROWN-ERROR', expects: 'own `message` member' },
    { label: 'a string', thrown: 'DW-THROWN-STRING', literal: 'DW-THROWN-STRING', expects: 'a string whose text is' },
    { label: 'an object without `message`', thrown: { note: 'no message member' }, literal: null, expects: 'carrying no own string' },
  ];
  const thrownReadings = [];
  for (const one of thrownForms) {
    const store = make();
    store.write(['a'], 'mem', 1);
    const pair = attempt(() => store.addConstraint({ address: ['a'], id: 'thrower' }, (context) => {
      if (context.value === 7) throw one.thrown;
      return true;
    }));
    const caught = attempt(() => store.write(['a'], 'mem', 7));
    const crossed = caught.ok ? null : caught.caught;
    const log = crossed !== null && Array.isArray(crossed.log) ? crossed.log : [];
    thrownReadings.push({
      label: one.label,
      pair: pair.ok,
      status: crossed === null ? null : crossed.status,
      message: crossed === null ? null : crossed.message,
      log: log.map((entry) => ({ seq: entry.seq, kind: entry.kind, message: entry.message })),
      inLog: one.literal === null ? null : log.some((entry) => String(entry.message).includes(one.literal)),
      formSaid: log.some((entry) => String(entry.message).includes(one.expects)),
    });
  }
  P('DEF-AK · the throwable\'s form in the crossed `log`', thrownReadings.map((one) => ({
    thrown: one.label, status: one.status, inLog: one.inLog, form: one.formSaid,
    log: one.log.map((entry) => `${entry.kind}: ${entry.message}`),
  })));
  P('DEF-AK · the crossed message for an `Error`', thrownReadings[0] === undefined ? '<not reached>' : thrownReadings[0].message);
  A('DW-10.3', '`D-55` item 1 / `DEF-AK` (2026-10-28): *"Include a thrown message in the message log. Obviously."*',
    'a constraint body that throws an `Error` crosses `ConstraintBodyThrew` whose `log` holds an entry PRINTING THE THROWN MESSAGE, and the crossed sentence says the value does NOT cross as this refusal',
    thrownReadings.length === 3 && thrownReadings.every((one) => one.pair === true && one.status === 'ConstraintBodyThrew')
      && thrownReadings[0].inLog === true && thrownReadings[0].formSaid === true
      && typeof thrownReadings[0].message === 'string'
      && thrownReadings[0].message.includes('does NOT cross as this refusal'),
    JSON.stringify(thrownReadings.map((one) => ({ thrown: one.label, status: one.status, inLog: one.inLog }))));
  A('DW-10.4', '`D-55` item 1 / `DEF-AK` — a NON-`Error` reaches the log in a form a consumer can read, and the form is SAID rather than silently stringified',
    'a thrown string reaches the log as *"a string whose text is …"* with the literal present, and a thrown object with no `message` reaches it as *"an object … carrying no own string `message` member"* — the form each value took is named',
    thrownReadings.length === 3
      && thrownReadings[1].inLog === true && thrownReadings[1].formSaid === true
      && thrownReadings[2].formSaid === true,
    JSON.stringify(thrownReadings.map((one) => ({ thrown: one.label, inLog: one.inLog, form: one.formSaid }))));

  // ── (AN) A REFUSED EDIT UNDOES THE WHOLE COMMIT — `D-55` item 5 / `DEF-AN` ──────────────────────────
  // THE BEHAVIOUR WAS ALREADY CORRECT AND NOTHING SAID SO: the restore names the mark the commit cached at its
  // OUTERMOST OPENING, so a write that SUCCEEDED earlier in the same commit is undone with the refusal. **THE
  // MEASUREMENT: the write lands, a listener's reversal inside its window moves the watched state, the
  // restarted check refuses, and the store stands at the state the commit OPENED at — the landing's own value
  // gone with the reversal's.**
  const anStore = make();
  anStore.write(['x'], 'mem', { y: 1 });
  const anPrior = anStore.write(['x', 'z'], 'mem', 9);
  const anAsks = [];
  attempt(() => anStore.addConstraint({ address: ['x'], id: 'x-must-keep-z' }, (context) => {
    anAsks.push(context.value);
    return context.value !== undefined && context.value.z === 9
      ? true : { message: 'x must keep z' };
  }));
  const anHandle = anStore.listen('an-listener', [['x', 'y']]);
  anStore.register(anHandle, () => { attempt(() => anStore.rollback(anPrior.op.opId)); });
  const anOpenedAt = anStore.read(['x']);
  const anWrite = attempt(() => anStore.write(['x', 'y'], 'mem', 2));
  const anAfter = anStore.read(['x']);
  P('DEF-AN · the state the commit OPENED at', anOpenedAt);
  P('DEF-AN · the write\'s answer', anWrite.ok ? 'ANSWERED (no refusal — the finding)' : statusOf(anWrite.caught));
  P('DEF-AN · the pair asked at', anAsks);
  P('DEF-AN · the store after the refusal (the landing undone with it)', anAfter);
  A('DW-10.5', '`D-55` item 5 / `DEF-AN`: *"A constraint-refused edit rolls back to the previous safe state, with all edits in the commit undone"* — and the restore is the OUTERMOST opening mark',
    'the write that SUCCEEDED before the refusal is undone with it: the refusal crosses `ConstraintPassRefused` and the store stands at the state the commit opened at — `x.y` back at `1` and `x.z` back at `9`',
    anWrite.ok === false && statusOf(anWrite.caught) === PASS_REFUSED
      && JSON.stringify(anAfter) === JSON.stringify(anOpenedAt)
      && anAsks.length === 2 && anAsks[0].z === 9 && anAsks[1].z === undefined,
    `answer ${anWrite.ok ? 'ANSWERED' : statusOf(anWrite.caught)} · asks ${JSON.stringify(anAsks)} · opened `
      + `${JSON.stringify(anOpenedAt)} · after ${JSON.stringify(anAfter)}`);

  // ── (AO) THE HANDED-OFF RECORD IS FINAL — `D-55` item 6 / `DEF-AO` ──────────────────────────────────
  // THE CLARIFICATION, VERBATIM: *"Attempts don't log. This is what the commits are for. The commits have their
  // log handed off to the client and are dropped after closing out."* **SO THE CLOSED REPORT AND THE LOG ARE
  // SEALED AT THE HANDOFF**: the drain's amendment is the last act of closing out, and after it a later act can
  // neither append to the list nor re-member the report. **THE DRIVE HOLDS BOTH RECORDS — the crossed refusal
  // and the closed report read through `K-5` — AND DRIVES MORE.**
  const aoStore = make();
  aoStore.write(['a'], 'mem', 9);
  attempt(() => aoStore.addConstraint({ address: ['a'], id: 'must-be-9' }, (context) => (context.value === 9
    ? true : { message: 'a must stand at 9' })));
  // THE RECORD IS TAKEN THROUGH THE KERNEL'S OWN ITEMS SO THE **REPORT** IS IN HAND TOO (`K-2`/`K-3`/`K-5`).
  const aoRecord = kernel.commit(aoStore, ['a'], 'mem', 5);
  const aoThrown = attempt(() => kernel.runAttempt(aoStore, aoRecord));
  const aoReport = kernel.report(aoStore, aoRecord.attempt);
  const aoCrossedLog = !aoThrown.ok && aoThrown.caught !== null && typeof aoThrown.caught === 'object'
    && Array.isArray(aoThrown.caught.log) ? aoThrown.caught.log : null;
  const aoBefore = aoReport === undefined || aoReport === null ? null : JSON.stringify(aoReport.log);
  const aoBeforeOutcome = aoReport === undefined || aoReport === null ? null : aoReport.outcome;
  // DRIVE MORE: a passing write, a refused write, a reversal, a delete — the commit this record belongs to is
  // closed and dropped, so none of them may move it.
  attempt(() => aoStore.write(['b'], 'mem', 1));
  attempt(() => aoStore.write(['a'], 'mem', 6));
  const aoLater = attempt(() => aoStore.write(['a'], 'mem', 8));
  if (aoLater.ok) attempt(() => aoStore.rollback(aoLater.value.op.opId));
  attempt(() => aoStore.delete(['b']));
  const aoAfter = aoReport === undefined || aoReport === null ? null : JSON.stringify(aoReport.log);
  P('DEF-AO · the crossed refusal\'s status / log', aoThrown.ok ? '<no throw>' : [statusOf(aoThrown.caught),
    aoCrossedLog === null ? '<no log>' : aoCrossedLog.length]);
  P('DEF-AO · the closed report (`K-5`) — outcome · one list? · frozen?', aoReport === undefined || aoReport === null
    ? '<none>' : [aoBeforeOutcome, aoReport.log === aoCrossedLog, Object.isFrozen(aoReport)]);
  P('DEF-AO · `report.log` frozen? · the CROSSED log is that same list?', aoReport === undefined || aoReport === null
    ? '<none>' : [Object.isFrozen(aoReport.log), aoReport.log === aoCrossedLog]);
  P('DEF-AO · the held log BEFORE → AFTER the further drives', [aoBefore, aoAfter]);
  A('DW-10.6', '`D-55` item 6 / `DEF-AO` (2026-10-28): *"a consumer holding a refusal is holding the record, and a record that changes after the handoff is not a record"*',
    'the closed attempt\'s report AND its log are FROZEN at the handoff, the crossed refusal\'s log is that same list, and further drives leave the held record byte-for-byte unchanged',
    aoThrown.ok === false && aoReport !== undefined && aoReport !== null
      && aoBefore !== null && aoBefore === aoAfter
      && Object.isFrozen(aoReport) === true && Object.isFrozen(aoReport.log) === true
      && aoReport.log === aoCrossedLog,
    `report ${aoReport === undefined || aoReport === null ? '<none>' : 'held'} · frozen report `
      + `${aoReport === undefined || aoReport === null ? '<none>' : Object.isFrozen(aoReport)} · frozen log `
      + `${aoReport === undefined || aoReport === null ? '<none>' : Object.isFrozen(aoReport.log)} · `
      + `same list ${aoReport === undefined || aoReport === null ? '<none>' : aoReport.log === aoCrossedLog} · `
      + `unchanged ${aoBefore === aoAfter}`);

  // ── (AP) THE DRAIN JUDGES THE STATE THE COMMIT STANDS AT — `D-55` item 6 / `DEF-AP` ──────────────────
  // THE MEASUREMENT THE ROW FILES, DRIVEN: TWO LISTENERS EACH REVERSE IN ONE COMMIT. Registered first is the
  // pair the passing raise would be judged against (`b`), and the VIOLATING raise belongs to the listener that
  // registered FIRST (`a`) — so under the old one-request record the later raise REPLACED the earlier, the
  // earlier violation was asked ZERO times, and the write returned normally with it standing. **NOW the request
  // merges to the earliest capture of each address, so BOTH pairs are asked at the state the commit stands at
  // and the write is refused.**
  const apStore = make();
  apStore.write(['a'], 'mem', {});
  apStore.write(['b'], 'mem', {});
  apStore.write(['t'], 'mem', {});
  const apOpA = apStore.write(['a', 'keep'], 'mem', 5);
  const apOpB = apStore.write(['b', 'keep'], 'mem', 5);
  const apAsksB = [];
  const apAsksA = [];
  // REGISTRATION ORDER puts the PASSING pair (`b`) first, so the walk reaches it before the violating one.
  attempt(() => apStore.addConstraint({ address: ['b'], id: 'b-pair' }, (context) => {
    apAsksB.push(context.value);
    return true;
  }));
  attempt(() => apStore.addConstraint({ address: ['a'], id: 'a-pair' }, (context) => {
    apAsksA.push(context.value);
    return context.value !== undefined && context.value.keep === 5
      ? true : { message: 'a.keep must stand at 5' };
  }));
  // LISTENER ORDER: the VIOLATING raise first (`a`), the passing one second.
  const apListenerA = apStore.listen('ap-a', [['t']]);
  const apListenerB = apStore.listen('ap-b', [['t']]);
  apStore.register(apListenerA, () => { attempt(() => apStore.rollback(apOpA.op.opId)); });
  apStore.register(apListenerB, () => { attempt(() => apStore.rollback(apOpB.op.opId)); });
  const apOpenedAt = [apStore.read(['a']), apStore.read(['b'])];
  const apWrite = attempt(() => apStore.write(['t', 'x'], 'mem', 1));
  const apAfter = [apStore.read(['a']), apStore.read(['b'])];
  P('DEF-AP · the pairs asked (`b` first, `a` the earlier listener\'s) — registration, then the drain', [apAsksB, apAsksA]);
  P('DEF-AP · the write\'s answer', apWrite.ok ? 'ANSWERED (a violation still standing — the finding)' : statusOf(apWrite.caught));
  P('DEF-AP · the store the commit opened at → after', [apOpenedAt, apAfter]);
  A('DW-10.7', '`D-55` item 6 / `DEF-AP` (2026-10-28): the drain judges THE STATE THE COMMIT STANDS AT, not the request that happened to survive',
    'with two listeners each reversing in ONE commit, BOTH pairs are asked at the drain — the earlier listener\'s raise is not lost — and the write is refused `ConstraintPassRefused` with the whole commit undone',
    apWrite.ok === false && statusOf(apWrite.caught) === PASS_REFUSED
      && apAsksA.length === 2 && apAsksB.length === 2
      && JSON.stringify(apAfter) === JSON.stringify(apOpenedAt),
    `answer ${apWrite.ok ? 'ANSWERED' : statusOf(apWrite.caught)} · asks b=${JSON.stringify(apAsksB)} `
      + `a=${JSON.stringify(apAsksA)} · opened ${JSON.stringify(apOpenedAt)} · after ${JSON.stringify(apAfter)}`);

  // ── (X) THE DELETE'S PATH — `D-55` ITEM 3, `DEF-X`: THE BUILD ────────────────────────────────────────
  // THE CLARIFICATION, VERBATIM: *"A delete is an editing verb and must pass constraints. This includes all of
  // the relevant commit and message logic."* **THE PREVIOUS PASS MEASURED THE ABSENCE AND PRINTED IT; THIS ONE
  // BUILT THE THING IT NAMED.** The measurement that scoped the build, kept here as the BEFORE side of every
  // printed arm: a delete opened its own commit window, called the addon's `delete` directly, ran **no** pass
  // (`the pair's asks [1,1]`), and the ONE pass shape the artefact had (`K-2` + `K-3`) **landed a write of its
  // own first** (`storeAfter {"c":2}`), so it judged a state a delete is never in. **THE BUILD IS `index.mjs`'s
  // `delete` → `constraints.mjs`'s `constraintDelete` → the kernel's `commitRemoval` (a delete-shaped attempt
  // that lands no write) → `runAttempt` (the ONE pass, at the delete's own op) → the terminal entry → and the
  // delivery, MOVED to after the pass.**
  // (`statusOf` is the drive's own, declared where the earlier section reads it.)

  // ── (X1) THE DELETE-SHAPED ATTEMPT AND ITS PASS ────────────────────────────────────────────────────
  const xStore = make();
  xStore.write(['a'], 'mem', { b: 1, keep: { z: 0 } });
  const xAsks = [];
  let xPassWindow = null;
  const xPair = attempt(() => xStore.addConstraint({ address: ['a', 'b'], id: 'ab-pair' }, (context) => {
    xAsks.push({
      at: context.attempt === null ? 'registration' : 'pass',
      op: context.op === null ? null : context.op.kind,
      tier: context.tier,
      value: context.value,
      attempt: context.attempt === null ? null : 'an AttemptRef',
    });
    // THE ATTEMPT'S OWN WINDOW, TAKEN INSIDE THE ONE INVOCATION THE PASS MAKES: the delete-shaped attempt is
    // LIVE (the kernel's `live` map holds it) and the commit the member opened is OPEN — `D-44`'s invariant,
    // measured at the pass and nowhere else.
    if (context.attempt !== null) xPassWindow = windowOf(xStore);
    return true;
  }));
  let xDelivery = null;
  const xHandle = xStore.listen('x-listener', [['a']]);
  xStore.register(xHandle, () => {
    // **THE DELIVERY'S POSITION, READ BY THE LISTENER ITSELF**: how many PASS asks had happened when it fired —
    // `0` at `1.3.0` (the delivery preceded every judgement), `1` now (the delivery follows the pass) — and the
    // state it is handed.
    const seen = attempt(() => xStore.read(['a', 'b']));
    xDelivery = {
      passAsksWhenItFired: xAsks.filter((one) => one.at === 'pass').length,
      openCommitsInside: openCommits(xStore),
      storeAtFire: seen.ok ? seen.value : statusOf(seen.caught),
    };
  });
  const xReceipt = attempt(() => xStore.delete(['a', 'b']));
  P('X1 · the delete\'s path — its record', xReceipt.ok
    ? { address: xReceipt.value.address, tiers: xReceipt.value.tiers, op: xReceipt.value.op && xReceipt.value.op.kind,
      opSeq: xReceipt.value.op && xReceipt.value.op.seq, discarded: xReceipt.value.discarded }
    : statusOf(xReceipt.caught));
  P('X1 · the pair\'s asks — registration first (BEFORE the change this list was ONE entry)', xAsks);
  P('X1 · the window inside the pass — open · live (BEFORE the change: [null, null] — no pass ran)', xPassWindow);
  P('X1 · the delivery — what the listener saw WHEN IT FIRED', xDelivery);
  A('DW-10.8', '`D-55` item 3 / `DEF-X` (2026-10-29): *"A delete is an editing verb and must pass constraints"*',
    'the delete runs a DELETE-SHAPED attempt of its own: the pair standing AT THE DELETE\'S OWN ADDRESS is asked TWICE — its registration and the delete\'s pass — and the pass\'s context carries THE DELETE\'s op, `tier: null`, the AFTER-state (absence) as `value` and an `AttemptRef`; the attempt is LIVE and the commit OPEN at that ask; and the listener fired AFTER the pass, seeing that judged state',
    xPair.ok === true && xReceipt.ok === true
      && xAsks.length === 2
      && xAsks[0].at === 'registration' && xAsks[1].at === 'pass'
      && xAsks[1].op === 'delete' && xAsks[1].tier === null
      && xAsks[1].value === undefined && xAsks[1].attempt === 'an AttemptRef'
      && xPassWindow !== null && xPassWindow.open === 1 && xPassWindow.live === 1
      && xDelivery !== null && xDelivery.passAsksWhenItFired === 1
      && xDelivery.openCommitsInside === 1 && xDelivery.storeAtFire === 'AddressNotFound',
    `pair ${xPair.ok} · delete ${xReceipt.ok} · asks ${JSON.stringify(xAsks)} · window in the pass `
      + `${JSON.stringify(xPassWindow)} · delivery ${JSON.stringify(xDelivery)}`);

  // ── (X2) A DELETE REFUSED BY A CONSTRAINT — THE CROSSED FORM, THE LOG, THE ROLLED-BACK STORE ────────
  const rStore = make();
  rStore.write(['r'], 'mem', { c: 1 });
  rStore.write(['keep'], 'mem', 'seeded');
  let rAsks = 0;
  const rPair = attempt(() => rStore.addConstraint({ address: ['r'], id: 'refusing-pair' }, (context) => {
    rAsks += 1;
    // THE PAIR ADMITS ITS REGISTRATION'S STATE AND REFUSES THE PASS'S — so the arm is the delete's own.
    return rAsks === 1 ? true : { message: 'a delete here is not a state this pair admits' };
  }));
  const rOpenedAt = attempt(() => rStore.read(['r']));
  const rDelete = attempt(() => rStore.delete(['r']));
  const rAfter = attempt(() => rStore.read(['r']));
  const rOther = attempt(() => rStore.read(['keep']));
  const rCaught = rDelete.ok ? null : rDelete.caught;
  P('X2 · the delete — answered, or refused?', rDelete.ok ? 'ANSWERED (no pass judged it)' : 'REFUSED');
  P('X2 · the crossed form — own keys · status', rCaught === null ? '<none>' : [ownNamesOf(rCaught), statusOf(rCaught)]);
  P('X2 · the message', rCaught === null ? '<none>' : rCaught.message);
  P('X2 · the log — each entry\'s `seq` sequence', rCaught === null || !Array.isArray(rCaught.log)
    ? '<none>' : rCaught.log.map((entry) => ({ seq: entry.seq, kind: entry.kind, id: entry.id, state: entry.state })));
  P('X2 · the store the commit opened at → after the refusal', [rOpenedAt.ok ? rOpenedAt.value : statusOf(rOpenedAt.caught),
    rAfter.ok ? rAfter.value : statusOf(rAfter.caught)]);
  A('DW-10.9', '`D-55` item 3 (a delete passes constraints) and item 5 (a refused edit rolls back to the safe state); `D-38` (ONE status for a constraint refusal; the token rides `log[].state`); `surface.md §2.5` (the one crossed form)',
    'a delete whose pass a pair refuses throws the ONE three-member form with `status` `ConstraintPassRefused`, its `log` naming the pair, and the store is put BACK at the state the commit opened at — while a control delete the pair admits is unchanged',
    rPair.ok === true && rDelete.ok === false
      && keyOfAddr(ownNamesOf(rCaught)) === keyOfAddr(REFUSAL_MEMBERS)
      && statusOf(rCaught) === PASS_REFUSED
      && Array.isArray(rCaught.log) && rCaught.log.length === 2
      && rCaught.log[0].id === 'refusing-pair' && rCaught.log[0].kind === 'constraint-check'
      && rCaught.log[1].kind === 'outcome' && typeof rCaught.log[1].state === 'string'
      && JSON.stringify(rAfter.ok ? rAfter.value : statusOf(rAfter.caught)) === JSON.stringify(rOpenedAt.value)
      && rOther.ok && rOther.value === 'seeded',
    `pair ${rPair.ok} · delete ${rDelete.ok ? 'ANSWERED' : statusOf(rCaught)} · keys `
      + `${rCaught === null ? '<none>' : JSON.stringify(ownNamesOf(rCaught))} · log `
      + `${rCaught === null ? '<none>' : JSON.stringify(rCaught.log)} · opened → after `
      + `${JSON.stringify(rOpenedAt.value)} → ${JSON.stringify(rAfter.ok ? rAfter.value : statusOf(rAfter.caught))}`
      + ` · other address ${JSON.stringify(rOther.ok ? rOther.value : statusOf(rOther.caught))}`);
  // THE CONTROL, ON THE SAME ADDRESS AND THE SAME PAIR SHAPE: a delete the pair admits answers its record.
  const cStore = make();
  cStore.write(['c'], 'mem', { c: 1 });
  const cPair = attempt(() => cStore.addConstraint({ address: ['c'], id: 'admitting-pair' }, () => true));
  const cDelete = attempt(() => cStore.delete(['c']));
  const cAfter = attempt(() => cStore.read(['c']));
  P('X2 · THE CONTROL — a delete the pair admits', cDelete.ok
    ? { address: cDelete.value.address, tiers: cDelete.value.tiers, opKind: cDelete.value.op && cDelete.value.op.kind }
    : statusOf(cDelete.caught));
  P('X2 · THE CONTROL — the address after it', cAfter.ok ? cAfter.value : statusOf(cAfter.caught));

  // ── (X3) THE DELIVERY'S POSITION, PRINTED ON BOTH SIDES OF THE CHANGE ──────────────────────────────
  // **THE BEFORE FIGURES ARE NOT ASSERTED FROM MEMORY**: the same probe was run against the pre-change tree
  // (the four bytes restored from `HEAD` in `/tmp`) and printed `passAsksWhenItFired: 0`,
  // `storeAtFire: "AddressNotFound"`, `openCommitsInside: 1`, asks `[1,1]`. **THE CHANGE MOVES THE DELIVERY
  // FROM BEFORE THE PASS TO AFTER IT**, and the reading above (`X1 · the delivery`) is the after side.
  P('X3 · the delivery — BEFORE the change · AFTER it', {
    before: { passAsksWhenItFired: 0, storeAtFire: 'AddressNotFound', openCommitsInside: 1 },
    after: xDelivery,
  });
  A('DW-10.10', '`D-55` item 3 (*a listener fired by a delete must see a judged state*); `surface.md §2.7` item 6 (constraints first, the other listeners once every constraint has passed)',
    'the delivery sits AFTER the pass: the listener fires with the pass\'s ask already taken (`passAsksWhenItFired` `1`, where the pre-change tree read `0`), inside the delete\'s own commit window, and sees the after-state the pass approved',
    xDelivery !== null && xDelivery.passAsksWhenItFired === 1 && xDelivery.openCommitsInside === 1
      && xDelivery.storeAtFire === 'AddressNotFound',
    `delivery ${JSON.stringify(xDelivery)}`);

  // ── (X4) THE LOG: THE DELETE'S ENTRIES IN THE COMMIT'S ONE LIST, WITH THE `seq` SEQUENCE ────────────
  const log = rCaught !== null && Array.isArray(rCaught.log) ? rCaught.log : [];
  P('X4 · the commit\'s one list — entry by entry', log.map((entry) => ({
    seq: entry.seq, kind: entry.kind, id: entry.id, opId: entry.opId, state: entry.state, message: entry.message,
  })));
  const seqs = log.map((entry) => entry.seq);
  A('DW-10.11', '`D-53` (one list per commit; `seq` the ordinal of the list it stands in); `kernel-surface.md §2.5` item 1 (the entry\'s six members; `seq` ascending from `1`)',
    'the delete\'s log IS the commit\'s one list: `seq` ascends `1..n` with no gap and no renumbering, the `constraint-check` entry names the pair AND the delete\'s op (`D-53`\'s combined identity), the terminal `outcome` entry names the same op with the kernel\'s token in `state`, and every entry carries exactly the six declared members',
    seqs.length === 2 && seqs[0] === 1 && seqs[1] === 2
      && log[0].kind === 'constraint-check' && log[0].id === 'refusing-pair'
      && typeof log[0].opId === 'string' && log[0].opId === log[1].opId
      && log[1].kind === 'outcome' && log[1].state === 'KC-3'
      && log.every((entry) => keyOfAddr(ownNamesOf(entry)) === keyOfAddr(['id', 'kind', 'message', 'opId', 'seq', 'state'])),
    `seq ${JSON.stringify(seqs)} · kinds ${JSON.stringify(log.map((entry) => entry.kind))} · opIds `
      + `${JSON.stringify(log.map((entry) => entry.opId))} · entries `
      + `${JSON.stringify(log.map((entry) => ownNamesOf(entry)))}`);

  // ── (X5) `rollback`'S DISPOSITION — WHAT IT ALREADY CARRIES AND WHAT IT STILL LACKS ─────────────────
  // `D-55` item 4: *"A reverse is an editing verb and must be treated as above."* **`D-38` ALREADY JUDGES A
  // REVERSAL AT ITS TERMINAL STATE, SO THIS CELL BUILDS NOTHING — IT MEASURES THE DISPOSITION AND NAMES THE
  // GAP.** The reversal's judgement is driven into its refusing arm (a pair that admits its registration and
  // refuses the state the reversal leaves) and every member it carries is printed.
  const vStore = make();
  vStore.write(['v'], 'mem', { tabs: { landing: { active: true } } });
  const vPrior = vStore.write(['v', 'tabs', 'legal'], 'mem', { active: false });
  let vAsks = 0;
  const vJudged = [];
  const vPair = attempt(() => vStore.addConstraint({ address: ['v'], id: 'refuses-the-reversal' }, (context) => {
    vAsks += 1;
    vJudged.push({
      attempt: context.attempt === null ? null : 'an AttemptRef',
      op: context.op === null ? null : 'an op',
      tier: context.tier,
    });
    return vAsks === 1 ? true : { message: 'the reversal left a state this pair refuses' };
  }));
  const vAttemptsBefore = kernelFor(vStore).attempts;
  const vReversal = attempt(() => vStore.rollback(vPrior.op.opId));
  const vCaught = vReversal.ok ? null : vReversal.caught;
  const vLog = vCaught !== null && Array.isArray(vCaught.log) ? vCaught.log : [];
  P('X5 · the reversal at rest — answered, or refused?', vReversal.ok ? 'answered its record' : 'REFUSED');
  P('X5 · the crossed form · status · the judgement\'s log', {
    keys: vCaught === null ? '<none>' : ownNamesOf(vCaught),
    status: vCaught === null ? '<none>' : statusOf(vCaught),
    entries: vLog.map((entry) => ({ keys: ownNamesOf(entry), kind: entry.kind, id: entry.id, state: entry.state })),
  });
  P('X5 · the judgement\'s ask — its identity members', vJudged.slice(-1));
  P('X5 · the attempt counter · live · openCommits around the reversal', {
    attemptsBefore: vAttemptsBefore, attemptsAfter: kernelFor(vStore).attempts,
    live: kernelFor(vStore).live.size, open: openCommits(vStore),
  });
  P('X5 · what it still lacks', vCaught === null ? '<not reached>' : {
    anAttemptRecord: kernelFor(vStore).attempts === vAttemptsBefore ? 'NONE (no attempt was minted)' : 'one',
    attemptIdentityInTheContext: vJudged.length === 0 ? '<not asked>' : vJudged[vJudged.length - 1].attempt,
    opIdentityInTheContext: vJudged.length === 0 ? '<not asked>' : vJudged[vJudged.length - 1].op,
    aTerminalOutcomeEntry: vLog.some((entry) => entry.kind === 'outcome') ? 'present' : 'ABSENT',
    aCommitEntryOnThePassingArm: vLog.some((entry) => entry.kind === 'commit') ? 'present' : 'ABSENT',
    aKcTokenInTheLogsState: vLog.some((entry) => typeof entry.state === 'string') ? 'present' : 'ABSENT',
  });
  A('DW-10.12', '`D-55` item 4 (*"A reverse is an editing verb and must be treated as above"*); `D-38` (a reversal is judged at its terminal state); `D-53` (the log belongs to the commit)',
    'the reversal CARRIES the judgement it always carried — an open commit, the pairs asked at the state it left, the one crossed form with a log naming the pair, and the restore to the commit\'s cached mark — and STILL LACKS the delete-shaped attempt\'s machinery: no attempt record, no attempt or op identity in the context, no terminal `outcome` entry with a `KC` token, and no `commit` entry on a passing arm',
    vPair.ok === true && vReversal.ok === false
      && keyOfAddr(ownNamesOf(vCaught)) === keyOfAddr(REFUSAL_MEMBERS)
      && statusOf(vCaught) === PASS_REFUSED
      && vLog.length === 1 && vLog[0].id === 'refuses-the-reversal'
      && vJudged.length > 0 && vJudged[vJudged.length - 1].attempt === null
      && vJudged[vJudged.length - 1].op === null
      && kernelFor(vStore).attempts === vAttemptsBefore
      && !vLog.some((entry) => entry.kind === 'outcome') && !vLog.some((entry) => entry.kind === 'commit')
      && !vLog.some((entry) => typeof entry.state === 'string'),
    `reversal ${vReversal.ok ? 'answered' : statusOf(vCaught)} · form `
      + `${vCaught === null ? '<none>' : JSON.stringify(ownNamesOf(vCaught))} · log `
      + `${JSON.stringify(vLog.map((entry) => ({ keys: ownNamesOf(entry), kind: entry.kind, state: entry.state })))}`
      + ` · ask ${JSON.stringify(vJudged.slice(-1))} · attempts `
      + `${vAttemptsBefore} → ${kernelFor(vStore).attempts}`);

  // ── (X5b) ONE LIST PER COMMIT — A NESTED DELETE'S ENTRIES JOIN THE ENCLOSING COMMIT'S LIST (`D-53`) ─────────
  // **`D-53`'s FIRST INVARIANT: *"If it's part of the same commit, then it uses the same message log."*** A
  // delete performed INSIDE a constraint body is part of that body's commit, so its entries are THAT list's
  // entries — no second list, no merge and no renumbering — and the enclosing refusal's `log` is where both
  // attempts' entries stand, in one `seq` sequence.
  const oStore = make();
  oStore.write(['o'], 'mem', 1);
  oStore.write(['p'], 'mem', 2);
  let oInner = null;
  const oPair = attempt(() => oStore.addConstraint({ address: ['o'], id: 'outer-pair' }, (context) => {
    if (context.attempt === null) return true;
    oInner = attempt(() => oStore.delete(['p']));
    return { message: 'the outer pair refuses after the inner delete' };
  }));
  const oWrite = attempt(() => oStore.write(['o'], 'mem', 3));
  const oCaught = oWrite.ok ? null : oWrite.caught;
  const oLog = oCaught !== null && Array.isArray(oCaught.log) ? oCaught.log : [];
  P('X5b · the inner delete and the outer refusal', {
    inner: oInner === null ? '<not reached>' : (oInner.ok ? `answered ${oInner.value.op && oInner.value.op.opId}` : statusOf(oInner.caught)),
    outer: oCaught === null ? 'ANSWERED' : statusOf(oCaught),
  });
  P('X5b · the commit\'s ONE list — both attempts\' entries, in `seq` order', oLog.map((entry) => ({
    seq: entry.seq, kind: entry.kind, id: entry.id, opId: entry.opId, state: entry.state,
  })));
  A('DW-10.14', '`D-53` (one list per commit; `seq` the ordinal of the list it stands in); `D-55` item 3',
    'a delete inside a constraint body JOINS the enclosing commit\'s list: the enclosing pass\'s `constraint-check`, the delete\'s own terminal `commit` entry and the enclosing attempt\'s terminal `outcome` stand in ONE list with `seq` `1..3`, no second list and no renumbering',
    oPair.ok === true && oInner !== null && oInner.ok === true
      && oCaught !== null && statusOf(oCaught) === PASS_REFUSED
      && oLog.length === 3
      && oLog[0].seq === 1 && oLog[0].kind === 'constraint-check' && oLog[0].id === 'outer-pair'
      && oLog[1].seq === 2 && oLog[1].kind === 'commit'
      && oLog[2].seq === 3 && oLog[2].kind === 'outcome' && typeof oLog[2].state === 'string',
    `inner ${oInner === null ? '<not reached>' : JSON.stringify(oInner.ok ? 'answered' : statusOf(oInner.caught))}`
      + ` · outer ${oCaught === null ? 'ANSWERED' : statusOf(oCaught)} · list `
      + `${JSON.stringify(oLog.map((entry) => [entry.seq, entry.kind, entry.id || null, entry.opId || null]))}`);

  // ── (X6) THE ANCESTOR PAIR IS STILL NOT ASKED — THE EXACT-ADDRESS RULE, UNMOVED ─────────────────────
  // **THE PASS IS THE WRITE'S: its evaluated set is the pairs whose own address IS the attempt's**
  // (`pairsAtAddress`; `contract.md §2.8` item 1's exact-address rule, NOT `triggered`'s prefix set). So the
  // pair at `['a']` in the drive below is asked at its registration and by no pass of a delete at `['a','b']` —
  // which is why the earlier `W7` window's readings are unmoved.
  const eStore = make();
  eStore.write(['a'], 'mem', { b: 1 });
  const eAsks = [];
  const ePair = attempt(() => eStore.addConstraint({ address: ['a'], id: 'ancestor-pair' }, (context) => {
    eAsks.push(context.attempt === null ? 'registration' : 'pass');
    return true;
  }));
  // THE LISTENER STANDS AT THE DELETE'S OWN ADDRESS AND THE PAIR AT ITS ANCESTOR — a listener and a
  // constraint never share one address (`D-25`), so the two subjects are kept apart by the tree itself.
  const eHandle = eStore.listen('e-listener', [['a', 'b']]);
  eStore.register(eHandle, () => {});
  const eReceipt = attempt(() => eStore.delete(['a', 'b']));
  P('X6 · an ANCESTOR pair\'s asks for a delete at its descendant', eAsks);
  A('DW-10.13', '`contract.md §2.8` item 1 (the pass selects the pairs whose address IS the triggering address; the trigger set\'s prefix widening is NOT the pass\'s rule)',
    'the delete\'s pass asks the pairs standing at THE DELETE\'S OWN ADDRESS and no pair at an ancestor — the exact-address rule the write\'s pass keeps, so an ancestor pair\'s ask count is unmoved by a descendant delete',
    ePair.ok === true && eReceipt.ok === true && eAsks.length === 1 && eAsks[0] === 'registration',
    `asks ${JSON.stringify(eAsks)} · delete ${eReceipt.ok ? 'answered' : statusOf(eReceipt.caught)}`);
  console.log('');
  console.log('        THE SENTENCE TO CARRY AWAY (`D-55`): A WITNESS ENTRY NEVER SHIPS AN EMPTY ADDRESS LIST while');
  console.log('        the ROOT still stands as `[[]]`; a thrown message stands in the commit\'s log and the crossed');
  console.log('        sentence no longer claims the value crosses; a refused edit undoes the WHOLE commit to the');
  console.log('        mark its OUTERMOST opening cached; the handed-off report and log are FROZEN; and the drain');
  console.log('        judges the STATE THE COMMIT STANDS AT, so two raises in one commit are both judged.');
  console.log('        AND `DEF-X` IS NO LONGER A MEASUREMENT: the delete runs a pass of its own kind, its delivery');
  console.log('        follows it, and `rollback` is named as the arm that still lacks the same attempt machinery.');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RUN'S OWN REPORT — `D-21`: a cell that did not run may not exit 0
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('');
console.log('────────────────────────────────────────────────────────────────────────────────────');
console.log(`LAYER: ${LAYER}   APP LAYER: ${APP_LAYER}   (no APP-green is claimed)`);
console.log(`SITE:  node tests/e2e/discard-witness.mjs   (cwd: ${process.cwd()})`);
console.log(`AUTHORED ${authored} · EXECUTED ${executed} · PASS ${pass} · FAIL ${fail}`);
if (fail > 0) {
  console.log('');
  console.log('EVERY FAIL, ONE LINE EACH (cell · expected · observed · clause):');
  for (const f of fails) console.log(`  ${f.id} :: ${f.expectation} :: ${f.observed} :: [${f.clause}]`);
}
if (executed !== authored) {
  console.log(`A CELL DID NOT RUN: authored ${authored}, executed ${executed} — this run may not exit 0.`);
}
process.exit(fail > 0 || executed !== authored ? 1 : 0);
