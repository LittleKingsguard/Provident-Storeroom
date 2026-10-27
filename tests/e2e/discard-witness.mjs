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
//
// **D-21.** Every cell prints the readings it took; a cell that cannot reach its arm asserts the drive's coherence
// FIRST and says so instead of reporting a verdict; a cell that never ran is counted in `AUTHORED`/`EXECUTED` and
// the run EXITS NON-ZERO.
// **D-17.** The expectations are literals here and the citations are comments — no `docs/**` path is opened at
// runtime. **The instruments are the declaration's own**: `openCommits` (`state.mjs`'s in-flight verb windows) and
// the store's own registers read through its published verbs.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import { storeCreate } from '../../bindings/js/index.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';

const LAYER = 'ENVELOPE/PURE';
const APP_LAYER = 'NONE';

/** The set's rank-`20` member (`src/error.rs`'s `CODES`), the ONE status a constraint refusal answers with. */
const PASS_REFUSED = 'ConstraintPassRefused';
/** `surface.md §2.2`'s delete record, its enumerable members — `op` joined them 2026-10-27 (`D-43`). */
const RECEIPT_ENUMERABLE = ['address', 'op', 'tiers', 'triggered'];
/** `surface.md §2.5` items 3–4: the one crossed form's own three members, sorted. */
const REFUSAL_MEMBERS = ['log', 'message', 'status'];

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
  A('DW-07.1', '`D-43` item 2 (`D-1-bis`: a delete consults no constraint); `D-49` (`the behaviour unchanged` — no pass runs)',
    'the delete\'s delivery passes NO CONSTRAINT: the pair is asked exactly as often as the registration asked it — once — and not once for the delete',
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
  console.log('        window is still NOT judged — no body is asked at the state it left, no refusal is produced, and');
  console.log('        nothing is restored. In the delete\'s window it is now REPORTED on the act\'s own record');
  console.log('        (`record.discarded`); in a registration\'s window it is still silent, because its answer is an');
  console.log('        opaque identity with no member a witness could stand on. The recovery is unchanged and is still');
  console.log('        the consumer\'s: reload the file, or regenerate the store (`D-43` item 2, both exits).');
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
