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
// **AND `touchedAddresses` ITSELF IS READ BY `DW-13.5`/`DW-13.6`** — the set the union materialises, printed as the
// function answers it rather than as the drive re-derives it (`D-17`: the one place is `kernel-foundations.mjs`'s).
import { kernelFor, touchedAddresses } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { currentWindow, openCommits, windowMark } from '../../bindings/js/src/entry/state.mjs';
// **THE STORE'S OWN POSITION, REACHED AT THE ADDON'S ENTRY EXACTLY AS THE PACKAGE REACHES IT** — the instrument
// `D-63`'s two boundaries are measured with (`state.mjs`'s opening cache IS this answer, and the bump IS its
// re-read). A cell that measured the gap from anywhere else would be measuring its own arithmetic.
import { withAddon } from '../../bindings/js/src/entry/artefact.mjs';
// **THE `D-67`/`D-66` PER-TIER CELL NEEDS A `file`-TIER STORE** — the residual is a HIGHER-PERSISTENCE write that
// purges a value, so the drive constructs at an OS-temporary path and removes it at the end of its own block.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

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

/**
 * **⟶ THE PAIR'S OWN-DEPTH SHIELD, ADDED 2026-10-29 (`D-56`) — A PAIR AT AN ANCESTOR IS NOW ASKED FOR THE ACTS
 * BELOW IT.**
 *
 * The architect, verbatim: *"A listener/constraint should fire when the descendants of its targeted address node
 * change, because the descendants become part of the object that is read from that address"*
 * (`strata/decisions.md` · `D-56`). So the pair standing at `['window']` in this file's drives is asked by a
 * `delete` at `['window','tabs','landingPage']` — and **the pass's context carries THE ACT's address, tier and
 * value** (`kernel-surface.md §2.3` item 1), not the object at the pair's own address.
 *
 * **WHAT THIS HELPER DOES, AND WHAT IT DOES NOT DO.** It answers `true` for the asks an act BELOW the pair's own
 * address makes of it, and hands every ask for an act AT its own depth to the body that judges — **so the pair's
 * ask is TAKEN, COUNTED and ENTERED in the log (the widening, measured), while the drives' own subjects — the
 * witness on the delete's answer, the registration window's silence — are not displaced by a refusal from a pair
 * that was never the subject.** A pair that judges another location reads it (`D-50`), which is what W8 drives.
 * **NO CELL OF THIS FILE ASSERTS THAT AN ANCESTOR GOES UNASKED**; the two cells that read the direction
 * (`DW-10.13`, `DW-10.15`) assert the opposite and print the measurement.
 */
const atOwnDepth = (depth, judge) => (context) => {
  if (context === null || typeof context !== 'object' || !Array.isArray(context.address)) return true;
  if (context.address.length !== depth) return true; // a DESCENDANT act's ask (`D-56`)
  return judge(context);
};

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
  // **`D-56` (2026-10-29): this pair is asked for the delete at `['window','tabs','landingPage']` too, and the
  // context carries THAT act's value (`undefined` for a delete). `atOwnDepth` lets the ancestor ask pass, so the
  // act's own answer — this cell's subject — is what the drive reads.** The ask is still taken and the count is
  // still printed.
  const registered = attempt(() => store.addConstraint({ address: ['window'], id: 'one-active-tab' },
    atOwnDepth(1, (context) => {
      const count = activeCount(context.value.tabs);
      asked.push(count);
      return count === 1 ? true : { message: `exactly one tab must be active, ${count} stand so` };
    })));
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
  // **`D-56`: the pair is asked for the delete below it as well as by the at-rest judgement; the shield answers
  // the ancestor ask and the judgement — this cell's subject — is judged.**
  attempt(() => store.addConstraint({ address: ['window'], id: 'one-active-tab' },
    atOwnDepth(1, (context) => {
      const count = activeCount(context.value.tabs);
      return count === 1 ? true : { message: `exactly one tab must be active, ${count} stand so` };
    })));
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
  // **⟶ `D-56` READS ONTO THIS PAIR IN TWO PLACES, 2026-10-29.** (1) The pair stands at `['window']` and the
  // registration below is at `['window','tabs','settings']`, so the registration's own pass ASKS it — the ask is
  // taken and answered `true` here (`atOwnDepth`), because this cell's subject is the registration's own window
  // and not this pair's refusal. (2) **AND THE NEXT WRITE MOVED, FOR THE RULING'S OWN REASON**: it used to land at
  // `['window','tabs','settings']` — a DESCENDANT of the address this pair watches — and `D-56` makes such an act
  // an ask of this pair, so it is no longer "unrelated": it lands at `['elsewhere']` instead, and the cell's
  // subject — that a registration's discarded request is attributed to NO later act — is read where it can be
  // read. **THE SHIELD IS NOT AN OVERRIDE OF `D-56`**: an ancestor ask is taken, and the pair still refuses the
  // state after the reversal when it is asked for an act at its own depth (W5 drives exactly that refusal).
  const first = attempt(() => store.addConstraint({ address: ['window'], id: 'landing-page-stands' },
    atOwnDepth(1, (context) => {
      const tabs = context.value.tabs;
      return Object.hasOwn(tabs, 'landingPage')
        ? true
        : { message: 'the window must keep a landing page; none stands' };
    })));
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
  const next = attempt(() => store.write(['elsewhere'], 'mem', { active: 'AFTER' }));
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
  // **⟶ RE-DERIVED 2026-10-29 (`D-56`) — THE PAIR IS ASKED BY THE DELETE'S OWN PASS, AND THAT IS THE POINT.**
  // **What stood here** recorded `activeCount(context.value.tabs)` per ask and the cell read *"the pair is asked
  // exactly as often as the registration asked it — once — and not once by the delivery"*, on the sentence *"this
  // pair stands at an ANCESTOR of the deleted address, which that pass does not ask (the exact-address rule)"*.
  // **`D-56` supersedes that rule**: *"A listener/constraint should fire when the descendants of its targeted
  // address node change, because the descendants become part of the object that is read from that address"* — so
  // the DELETE's pass asks this pair, and the count reads TWO (the registration's and the pass's). **WHAT IS
  // UNMOVED IS THE DELIVERY**: no pass runs in the listener's own window, so the reversal the listener raised is
  // still discarded and still witnessed (`DW-07.2`, `DW-07.3`). The ask records `'ancestor-ask'` where the act is
  // not at the pair's own depth, which is the shape `D-56` gives it.
  attempt(() => store.addConstraint({ address: ['window'], id: 'one-active-tab' }, (context) => {
    // THE ASK IS RECORDED WHOEVER MAKES IT: its own depth's value where the act lands there, and the act's depth
    // where `D-56` sends a descendant act's ask. The pair answers `true` both ways — its own refusal is W5's.
    const depth = Array.isArray(context.address) ? context.address.length : null;
    asks.push(depth === 1 ? activeCount(context.value.tabs) : `ancestor-ask@${depth}`);
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
  // **⟶ AND THE WINDOW THIS CELL MEASURES IS THE DELIVERY — `D-55` ITEM `3` AND `D-56`, 2026-10-29.** `D-1-bis`
  // (*a delete consults no constraint*) is **superseded for the delete's OWN act**: the verb runs a pass of its
  // own kind, and from `D-56` that pass asks the pair standing at an ANCESTOR of the deleted address too. **SO THE
  // COUNT MOVES FROM ONE TO TWO** — the registration's ask and the delete's pass's — **AND WHAT THE CELL IS ABOUT
  // IS UNMOVED: THE DELIVERY ADDS NO ASK.** The predicate therefore reads the count the pass's own widening
  // gives, plus the fact that the pass asked it exactly once (no third ask at the delivery).
  A('DW-07.1', '`D-43` item 2 (`D-1-bis`: a delete consults no constraint — READ THROUGH `D-55` item 3 of 2026-10-29: the DELETE runs a pass, and `D-56` makes an ancestor pair a member of it; THIS DELIVERY still runs none); `D-49` (`the behaviour unchanged` — no pass runs in this delivery)',
    'the pair is asked TWICE — once by its registration and once by the delete\'s own pass (`D-56`) — and NOT a third time by the DELIVERY, which passes no constraint at all',
    receipt.ok && afterRegistration === 1 && afterDelete === 2,
    `asks ${JSON.stringify(asks)}`);
  A('DW-07.2', '`D-49` (a witness reports a discard; it does not run the check it names)',
    'the delete produced NO refusal, NO restored state and NO judgement: the reversal\'s effect still stands at the end',
    receipt.ok && !Object.hasOwn(store.read(['window']).tabs, 'about'),
    receipt.ok ? JSON.stringify(store.read(['window'])) : String(receipt.caught));
  const w7Witness = witnessOf(receipt.ok ? receipt.value : null);
  A('DW-07.3', '`D-49` (what a request still does NOT do, said rather than implied)',
    'the record reports the discard while the pair stands unasked BY THE DELIVERY at the state the action left — the witness is the whole of what the act now says (its last ask is the pass\'s, the second of two)',
    w7Witness !== null && w7Witness.length === 1 && afterDelete === 2,
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
    'THE DELETE HOST IS JUDGED: the pass ran (the pair asked at `7`), the delete ran inside it and its listener delivered at the PASS\'s window (`open 1`, `live 1` — so the delete opened no window of its own and reports no witness), the reversal ANSWERED its record, and the pass\'s terminal state was JUDGED — the pair asked at `5`, the declared `ConstraintPassRefused` with ONE entry naming it, and the store restored to the LAST VALIDATED MARK `7` (`D-63`: the write\'s own approved landing stands, and the state the reversal left does not)',
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
      && deleteStanding === THIRD,
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
    'THE REENTRANT HOST IS JUDGED: the listener reversed in the OUTER write\'s window (`open 1`, `live 0`) and then made a nested write in a window of its own, whose pass LEFT the enclosing request standing — and the outer pass\'s own drain judged it: the pair asked at `5`, the declared `ConstraintPassRefused` with ONE entry naming it, the store restored to the LAST VALIDATED MARK `7` (`D-63`), and the listener\'s own nested write `b = 11` STANDING — it is beyond the mark, because a listener\'s write is discrete from the write that triggered it (`D-60`)',
    reentrantRegistered.ok === true
      && reentrantWindow !== null && reentrantWindow.open === 1 && reentrantWindow.live === 0
      && reentrantRollback !== null && reentrantRollback.ok === true
      && reentrantNested !== null && reentrantNested.ok === true
      && reentrantAsks[0] === LANDED
      && reentrantAsks.filter((value) => Object.is(value, SEED)).length === 1
      && statusOf(reentrantCaught) === PASS_REFUSED
      && reentrantLog.length === 1 && reentrantLog[0].kind === 'constraint-check'
      && reentrantLog[0].id === 'reentrant-host' && restoreSaid(reentrantLog)
      && reentrantStanding === THIRD
      // **⟶ AND THE NESTED WRITE'S OWN VALUE NOW STANDS — `D-63`, 2026-10-28, RE-DERIVED.** This limb read
      // `reentrantNestedStanding.ok === false` because the restore named the mark the OUTER commit cached at its
      // OPENING, which precedes the nested write's op; **from this date the mark moves forward at every passing
      // sweep — the listener's own nested write is one — so the outer's restore does not reach it** (`D-60`'s
      // discrete half, by position). **THE SUBJECT OF THIS CELL IS UNMOVED**: the outer pass's own drain judges the
      // request its window raised, refuses in the declared form with ONE entry, and restores.
      && reentrantNestedStanding.ok === true && reentrantNestedStanding.value === 11,
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
      // **`D-65` (2026-10-28): the position is the ARRAY INDEX and no member — the reading prints the index.**
      log: log.map((entry, position) => ({ position, kind: entry.kind, message: entry.message })),
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
  // **⟶ AND FROM 2026-10-28 (`D-58`) THE STORE KEEPS NO LOG AFTER THE HANDOFF**, so the seal's own subject —
  // the handed-off record — is measured where the handoff put it: the CROSSED REFUSAL. `K-5` answers the
  // retained record, which carries no log at all.
  const aoBefore = aoCrossedLog === null ? null : JSON.stringify(aoCrossedLog);
  const aoBeforeOutcome = aoReport === undefined || aoReport === null ? null : aoReport.outcome;
  // DRIVE MORE: a passing write, a refused write, a reversal, a delete — the commit this record belongs to is
  // closed and dropped, so none of them may move it.
  attempt(() => aoStore.write(['b'], 'mem', 1));
  attempt(() => aoStore.write(['a'], 'mem', 6));
  const aoLater = attempt(() => aoStore.write(['a'], 'mem', 8));
  if (aoLater.ok) attempt(() => aoStore.rollback(aoLater.value.op.opId));
  attempt(() => aoStore.delete(['b']));
  const aoAfter = aoCrossedLog === null ? null : JSON.stringify(aoCrossedLog);
  P('DEF-AO · the crossed refusal\'s status / log', aoThrown.ok ? '<no throw>' : [statusOf(aoThrown.caught),
    aoCrossedLog === null ? '<no log>' : aoCrossedLog.length]);
  P('DEF-AO · the retained record (`K-5`, after `D-58`) — outcome · carries a log?', aoReport === undefined || aoReport === null
    ? '<none>' : [aoBeforeOutcome, 'log' in aoReport]);
  P('DEF-AO · the CROSSED log frozen? · the handed-off record is the one that holds it?', aoCrossedLog === null
    ? '<none>' : [Object.isFrozen(aoCrossedLog), aoReport !== null && aoReport !== undefined && !('log' in aoReport)]);
  P('DEF-AO · the held log BEFORE → AFTER the further drives', [aoBefore, aoAfter]);
  A('DW-10.6', '`D-55` item 6 / `DEF-AO` (2026-10-28): *"a consumer holding a refusal is holding the record, and a record that changes after the handoff is not a record"* — read with `D-58`, which lets the store\'s copy of the list go',
    'the handed-off record\'s LOG is FROZEN at the handoff and further drives leave it byte-for-byte unchanged; the store retains no list after the handoff and `K-5` answers none, so the record the consumer holds is the ONLY one',
    aoThrown.ok === false && aoCrossedLog !== null
      && aoBefore !== null && aoBefore === aoAfter
      && Object.isFrozen(aoCrossedLog) === true
      && aoReport !== undefined && aoReport !== null && !('log' in aoReport),
    `report ${aoReport === undefined || aoReport === null ? '<none>' : 'held'} · frozen handed log `
      + `${aoCrossedLog === null ? '<none>' : Object.isFrozen(aoCrossedLog)} · store log `
      + `${aoReport === undefined || aoReport === null ? '<none>' : ('log' in aoReport ? '<retained>' : '<let go>')} · `
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
  P('X2 · the log — each entry\'s POSITION (the array index; `seq` removed by `D-65`)', rCaught === null || !Array.isArray(rCaught.log)
    ? '<none>' : rCaught.log.map((entry, position) => ({ position, kind: entry.kind, id: entry.id, state: entry.state })));
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

  // ── (X4) THE LOG: THE DELETE'S ENTRIES IN THE COMMIT'S ONE LIST, WITH THEIR POSITIONS ──────────────
  // **⟶ `D-65`, 2026-10-28: THE POSITION IS THE ARRAY INDEX AND THE `seq` MEMBER IS GONE.** The readings below
  // print the index each entry stands at — the array's own ordinal — and the cell asserts the same order the
  // member used to carry, at the index.
  const log = rCaught !== null && Array.isArray(rCaught.log) ? rCaught.log : [];
  P('X4 · the commit\'s one list — entry by entry, at its own index', log.map((entry, position) => ({
    position, kind: entry.kind, id: entry.id, opId: entry.opId, state: entry.state, message: entry.message,
  })));
  const positions = log.map((entry) => log.indexOf(entry));
  A('DW-10.11', '`D-53` (one list per commit); `D-65` (the ARRAY INDEX IS THE POSITION — the `seq` member is removed, 2026-10-28); `kernel-surface.md §2.5` item 1 (the entry\'s five members; `seq` absent)',
    'the delete\'s log IS the commit\'s one list: each entry stands at its own index `0..n-1` with no gap, no duplicate and no renumbering, the `constraint-check` entry names the pair AND the delete\'s op (`D-53`\'s combined identity), the terminal `outcome` entry names the same op with the kernel\'s token in `state`, and every entry carries exactly the five declared members with `seq` absent',
    positions.length === 2 && positions[0] === 0 && positions[1] === 1
      && log[0].kind === 'constraint-check' && log[0].id === 'refusing-pair'
      && typeof log[0].opId === 'string' && log[0].opId === log[1].opId
      && log[1].kind === 'outcome' && log[1].state === 'KC-3'
      && log.every((entry) => keyOfAddr(ownNamesOf(entry)) === keyOfAddr(['id', 'kind', 'message', 'opId', 'state'])),
    `positions ${JSON.stringify(positions)} · kinds ${JSON.stringify(log.map((entry) => entry.kind))} · opIds `
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
  // attempts' entries stand, each at its own index (`D-65`: the position is the array index; `seq` is gone).
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
  P('X5b · the commit\'s ONE list — both attempts\' entries, at their own indices (`seq` removed, `D-65`)', oLog.map((entry, position) => ({
    position, kind: entry.kind, id: entry.id, opId: entry.opId, state: entry.state,
  })));
  A('DW-10.14', '`D-53` (one list per commit); `D-65` (the ARRAY INDEX IS THE POSITION, 2026-10-28); `D-55` item 3',
    'a delete inside a constraint body JOINS the enclosing commit\'s list: the enclosing pass\'s `constraint-check`, the delete\'s own terminal `commit` entry and the enclosing attempt\'s terminal `outcome` stand in ONE list at indices `0..2`, no second list, no renumbering and no `seq` member',
    oPair.ok === true && oInner !== null && oInner.ok === true
      && oCaught !== null && statusOf(oCaught) === PASS_REFUSED
      && oLog.length === 3
      && oLog.indexOf(oLog[0]) === 0 && oLog[0].kind === 'constraint-check' && oLog[0].id === 'outer-pair'
      && oLog.indexOf(oLog[1]) === 1 && oLog[1].kind === 'commit'
      && oLog.indexOf(oLog[2]) === 2 && oLog[2].kind === 'outcome' && typeof oLog[2].state === 'string'
      && oLog.every((entry) => Object.hasOwn(entry, 'seq') === false),
    `inner ${oInner === null ? '<not reached>' : JSON.stringify(oInner.ok ? 'answered' : statusOf(oInner.caught))}`
      + ` · outer ${oCaught === null ? 'ANSWERED' : statusOf(oCaught)} · list `
      + `${JSON.stringify(oLog.map((entry) => [oLog.indexOf(entry), entry.kind, entry.id || null, entry.opId || null]))}`);

  // ═════════════════════════════════════════════════════════════════════════════════════════════════════
  // (X6) `D-56` — THE PASS'S SET WIDENS FROM EXACT ADDRESS TO PREFIX, AND THE DIRECTION IT DOES NOT RULE
  //
  // **THE RULING** (`strata/decisions.md` · `D-56`, 2026-10-29, the architect, verbatim):
  //
  //     A listener/constraint should fire when the descendants of its targeted address node change, because the
  //     descendants become part of the object that is read from that address
  //
  // **THE GROUND IS SEMANTIC AND NOT A PREFERENCE**: the value read at a prefix CONTAINS its subtree, so a change
  // at a descendant changes what a read at the ancestor returns, and a pair standing at the ancestor **judges an
  // object that moved**. **THE SET, STATED ONCE: a pair is asked when THE ACT'S ADDRESS IS AT OR BELOW THE PAIR'S
  // ADDRESS** — the pair's address is a prefix of the act's, equality included. **THE UNRULED DIRECTION — an act
  // AT OR ABOVE a pair's address — is MEASURED here and NOT implemented**: the ruling's sentence names the
  // DESCENDANTS of the pair's node, and the reverse is reported.
  //
  // **⟶ `RCA-8(g)` ANNOTATE-BESIDE — THE CELL THAT STOOD HERE.** `DW-10.13` read *"the delete's pass asks the
  // pairs standing at THE DELETE'S OWN ADDRESS and no pair at an ancestor — the exact-address rule the write's
  // pass keeps, so an ancestor pair's ask count is unmoved by a descendant delete"* and asserted **one** ask (the
  // registration's) for the pair at `['a']` in a delete at `['a','b']`, on `contract.md §2.8` item 1 and the
  // pass's own scan. **`D-56` supersedes that rule by number** (`HL-8` item 1's sentence and
  // `attempt-lifecycle.md §2.4` item 5 (iv) are the other two deferrers), **so the cell is re-derived to the
  // measurement the ruling asks for and keeps its id**: the ancestor IS asked, its refusal CROSSES, and the
  // commit ROLLS BACK (`D-55` item 5's safe state).
  // ═════════════════════════════════════════════════════════════════════════════════════════════════════

  // ── (X6a) `DW-10.13` — THE ANCESTOR PAIR IS ASKED, ITS REFUSAL CROSSES, THE COMMIT ROLLS BACK ──────
  // **THIS IS THE SCENARIO THE EXACT-ADDRESS PASS STOPPED ON.** The pair stands at `['window','tabs']` — the use
  // case's own address, *"when window.tabs.landingPage is removed … check that exactly one tab is active"* — and
  // the act is a DELETE at its descendant `['window','tabs','landingPage']`. **THE PAIR JUDGES THE OBJECT AT ITS
  // OWN ADDRESS AND READS IT** (`D-50`'s route, which `D-56` leaves standing): it is handed the ACT's address and
  // value, and the object it is responsible for is the one at its own address.
  const aStore = make();
  aStore.write(['window'], 'mem', tabsSeed());
  const aAsks = [];
  const aPair = attempt(() => aStore.addConstraint({ address: ['window', 'tabs'], id: 'one-active-tab' },
    (context) => {
      const atRegistration = context.attempt === null;
      const tabsAtRegister = atRegistration ? context.value : aStore.read(['window', 'tabs']);
      aAsks.push({ at: atRegistration ? 'registration' : 'pass', askAddress: context.address.slice(), active: activeCount(tabsAtRegister) });
      if (atRegistration) return true;
      const count = activeCount(tabsAtRegister);
      return count === 1 ? true : { message: `exactly one tab must be active, ${count} stand so` };
    }));
  // A LISTENER STANDS AT THE ANCESTOR AND A PAIR AT THE DESCENDANT: a listener and a constraint never share one
  // address (`D-25`), so the two subjects are kept apart by the tree — and a REFUSED delete delivers NOTHING.
  const aDelivered = [];
  const aHandle = aStore.listen('window-listener', [['window']]);
  aStore.register(aHandle, (address) => { aDelivered.push(address); });
  const tabsBefore = aStore.read(['window', 'tabs']);
  const aReceipt = attempt(() => aStore.delete(['window', 'tabs', 'landingPage']));
  const tabsAfter = attempt(() => aStore.read(['window', 'tabs']));
  const aCaught = aReceipt.ok ? null : aReceipt.caught;
  const aLog = aCaught !== null && Array.isArray(aCaught.log) ? aCaught.log : [];
  P('X6a · BEFORE — `window.tabs` (the pair\'s own address) at the delete\'s opening', tabsBefore);
  P('X6a · the pair\'s asks, in order — {at, askAddress, active}', aAsks);
  P('X6a · AFTER — the delete\'s answer', aReceipt.ok ? 'ANSWERED (no refusal)' : `${statusOf(aCaught)} · ${JSON.stringify(aCaught.message)}`);
  P('X6a · the crossed log (the commit\'s ONE list), each entry at its own index', aLog.map((entry, position) => ({ position, kind: entry.kind, id: entry.id, state: entry.state })));
  P('X6a · AFTER — `window.tabs` once the refusal has taken its rollback', tabsAfter.ok ? tabsAfter.value : `<refused: ${statusOf(tabsAfter.caught)}>`);
  P('X6a · the listener the refused delete delivered to', aDelivered.length);
  A('DW-10.13', '`strata/decisions.md` · `D-56` (a pair is asked when the act\'s address is at or below its own — the pair\'s address is a prefix of the act\'s, equality included); `D-55` item 5 (a refused edit rolls back to the safe state); `D-50` (a body that cares about a location reads it)',
    'THE ANCESTOR PAIR IS ASKED FOR A DELETE AT ITS DESCENDANT: `[\'window\',\'tabs\']` is in the pass at `[\'window\',\'tabs\',\'landingPage\']`, its refusal CROSSES as `ConstraintPassRefused` naming it in the commit\'s log, and the commit ROLLS BACK — `window.tabs.landingPage` stands again and nothing is delivered',
    aPair.ok === true
      && aAsks.length === 2 && aAsks[1].at === 'pass'
      && keyOfAddr(aAsks[1].askAddress) === keyOfAddr(['window', 'tabs', 'landingPage'])
      && aAsks[1].active === 0
      && aReceipt.ok === false && statusOf(aCaught) === PASS_REFUSED
      && aLog.some((entry) => entry.kind === 'constraint-check' && entry.id === 'one-active-tab')
      && aLog.some((entry) => entry.kind === 'outcome' && typeof entry.state === 'string')
      && tabsAfter.ok === true && Object.hasOwn(tabsAfter.value, 'landingPage')
      && aDelivered.length === 0,
    `asks ${JSON.stringify(aAsks)} · delete ${aReceipt.ok ? 'ANSWERED' : statusOf(aCaught)} · `
      + `tabs after ${JSON.stringify(tabsAfter.ok ? tabsAfter.value : '<refused>')} · delivered ${aDelivered.length}`);

  // ── (X6b) `DW-10.15` — THE EQUAL-ADDRESS ARM, UNCHANGED: a pair at the ACT'S OWN address is asked ──
  // **THE OTHER HALF OF THE SAME PREDICATE, AND IT DID NOT MOVE**: *"a pair at `['tabs','landingPage']` is asked
  // for that same delete"* (`D-56`). The pair at the act's own address is a prefix of itself, so the predicate
  // admits it by the same test that admits the ancestor — one rule, two depths.
  const bStore = make();
  bStore.write(['window'], 'mem', tabsSeed());
  const bAsks = [];
  const bPair = attempt(() => bStore.addConstraint({ address: ['window', 'tabs', 'landingPage'], id: 'own-address-pair' },
    (context) => {
      bAsks.push({ at: context.attempt === null ? 'registration' : 'pass', value: context.value === undefined ? '<absent>' : context.value });
      return true;
    }));
  // THE LISTENER STANDS AT THE ANCESTOR, so the delivery is measured as well as the pass (`D-25`).
  const bDelivered = [];
  const bHandle = bStore.listen('ancestor-listener', [['window', 'tabs']]);
  bStore.register(bHandle, (address) => { bDelivered.push(address); });
  const bReceipt = attempt(() => bStore.delete(['window', 'tabs', 'landingPage']));
  P('X6b · the pair at the ACT\'S OWN address: its asks', bAsks);
  P('X6b · the delete\'s answer and its delivery', bReceipt.ok
    ? `ANSWERED · delivered ${bDelivered.length} to ${JSON.stringify(bDelivered[0])}`
    : `${statusOf(bReceipt.caught)}`);
  A('DW-10.15', '`strata/decisions.md` · `D-56` ("a pair at `[tabs,landingPage]` is asked for that same delete" — equality is a prefix)',
    'THE EQUAL-ADDRESS ARM IS UNCHANGED: a pair standing AT the delete\'s own address is asked ONCE by the pass (its second ask; the first is its registration), and the delete ANSWERS because this pair passes',
    bPair.ok === true && bAsks.length === 2 && bAsks[1].at === 'pass'
      && bReceipt.ok === true && bDelivered.length === 1,
    `asks ${JSON.stringify(bAsks)} · delete ${bReceipt.ok ? 'ANSWERED' : statusOf(bReceipt.caught)} · `
      + `delivered ${JSON.stringify(bDelivered)}`);

  // ── (X6c) `DW-10.16` — RE-DERIVED 2026-10-29 (`D-66`): THE DESCENDANT THE DELETE REMOVED IS ASKED ──
  // **`D-56`'s SENTENCE WAS ONE-DIRECTIONAL AND THIS CELL MEASURED THE REVERSE AS *"NOT ASKED"*.** The architect
  // has since ruled it, verbatim (`strata/decisions.md` · `D-66`): *"A pair at a descendant should only be asked if
  // the change also affects that descendant"* — **and the criterion is TOUCHED, not descendant.** *"For a DELETE,
  // the WHOLE SUBTREE at the act's address, because the act removes all of it — a descendant of a deleted node is
  // ABSENT after the act and was not before, which is a change to what a read there returns."* **So the pair at
  // `['window','tabs','settings']` IS asked for a delete at its parent, and the cell keeps its id and reads the
  // newer ruling's measurement**: the pass's ask is printed beside the address it was asked at and the value the
  // pass handed it, and the store's own read of the removed address after the act is printed beside them.
  // **THE CELL'S SECOND READING IS UNMOVED AND STILL THE POINT**: the delete ANSWERS, because this pair passes.
  const pStore = make();
  pStore.write(['window'], 'mem', tabsSeed());
  const pAsks = [];
  const pValues = [];
  const pAskAddresses = [];
  const pPair = attempt(() => pStore.addConstraint({ address: ['window', 'tabs', 'settings'], id: 'descendant-pair' },
    (context) => {
      pAsks.push(context.attempt === null ? 'registration' : 'pass');
      pAskAddresses.push(context.address.slice());
      pValues.push(context.value);
      return true;
    }));
  const pHandle = pStore.listen('tabs-listener-c', [['window', 'tabs']]);
  pStore.register(pHandle, () => {});
  const pReceipt = attempt(() => pStore.delete(['window', 'tabs']));
  const pAfter = attempt(() => pStore.read(['window', 'tabs', 'settings']));
  P('X6c · the DESCENDANT pair\'s asks for a delete at its ANCESTOR (`[\'window\',\'tabs\']`)', pAsks);
  P('X6c · the ADDRESS each ask was made at', pAskAddresses);
  P('X6c · the value the pass handed it (a delete\'s `after` is absence)', pValues.map((v) => (v === undefined ? '<absent>' : v)));
  P('X6c · WHAT ITS VALUE BECOMES — the store\'s own read of its address after the delete', pAfter.ok ? pAfter.value : `<refused: ${statusOf(pAfter.caught)}>`);
  P('X6c · the delete\'s op: what the act removed, read off the store\'s own journal op', pReceipt.ok
    ? { kind: pReceipt.value.op.kind, address: pReceipt.value.op.address, beforePresent: pReceipt.value.op.before.present,
      beforeValue: pReceipt.value.op.before.present ? pReceipt.value.op.before.value : '<absent>',
      afterPresent: pReceipt.value.op.after.present }
    : '<no receipt>');
  A('DW-10.16', '`strata/decisions.md` · `D-66` (the criterion is TOUCHED: *"for a DELETE, the WHOLE SUBTREE at the act\'s address, because the act removes all of it"*) — read beside `D-56` (a pair at an ANCESTOR is asked, unmoved) and `D-50` (a body that cares about a location reads it)',
    'THE DESCENDANT THE DELETE REMOVED IS ASKED: a delete at `[\'window\',\'tabs\']` produces TWO asks for the pair at `[\'window\',\'tabs\',\'settings\']` — its registration\'s and the pass\'s — the pass\'s ask naming the ACT\'s address `[\'window\',\'tabs\']` and carrying NO value, because a delete\'s after-state is absence; and the delete ANSWERS, the removed address now reading `AddressNotFound`',
    pPair.ok === true && pAsks.length === 2 && pAsks[1] === 'pass'
      && keyOfAddr(pAskAddresses[1]) === keyOfAddr(['window', 'tabs'])
      && pValues[1] === undefined
      && pReceipt.ok === true
      && pReceipt.value.op.kind === 'delete'
      && keyOfAddr(pReceipt.value.op.address) === keyOfAddr(['window', 'tabs'])
      && pReceipt.value.op.before.present === true
      && pAfter.ok === false,
    `asks ${JSON.stringify(pAsks)} · ask addresses ${JSON.stringify(pAskAddresses)} · `
      + `values ${JSON.stringify(pValues.map((v) => (v === undefined ? '<absent>' : v)))} · `
      + `delete ${pReceipt.ok ? 'ANSWERED' : statusOf(pReceipt.caught)} · after `
      + `${pAfter.ok ? JSON.stringify(pAfter.value) : statusOf(pAfter.caught)}`);

  // ── (X6d) `DW-10.17` — THE SNAPSHOT: MATERIALISED ONCE, FROZEN, ORDERED BY REGISTRATION ────────────
  // **`CX-12` STILL HOLDS AND `D-56` DOES NOT MOVE IT**: the pass's set is FIXED WHEN THE PASS BEGINS, and it is
  // now materialised from the act's address AND ITS ANCESTORS. **`HL-8` ITEM 6's ORDER RULE SURVIVES**: the list
  // is ordered by FIRST-REGISTRATION ORDER (`D-39`), and **the ancestors interleave into that ONE order** — the
  // one `Map` sequence every row stands in — rather than forming a second.
  //
  // The drive: FOUR pairs, registered in this order — `['window']` (a deep ancestor), `['window','tabs']` (the
  // act's parent), `['window','tabs','landingPage']` (the act's own address), and a mid-pass registrar that
  // registers `['window']`-second DURING the pass. **The pass must ask exactly the first three, in that order,
  // and the fourth not at all** (it enters the NEXT pass's set), and the printed POSITIONS of the
  // `constraint-check` entries must be `0..2` in list order, the
  // `commit` entry after them — one materialisation, frozen at the pass's start.
  const dStore = make();
  dStore.write(['window'], 'mem', tabsSeed());
  const dOrder = [];
  const dMidPassId = 'registered-during-the-pass';
  let dMidPassRegistered = false;
  const dRegisterMidPass = (id) => {
    if (dMidPassRegistered) return;
    dMidPassRegistered = true;
    // **AND THE NEW PAIR RECORDS ITS OWN ASKS TOO**, so the NEXT pass's list is read off the same list this
    // drive's other three write to: an entry for the registration it was created by, and one for every pass
    // that reaches it afterwards.
    dStore.addConstraint({ address: ['window'], id }, (context) => {
      dOrder.push({ id, at: context.attempt === null ? 'registration' : 'pass', askAddress: context.address.slice() });
      return true;
    });
  };
  const dPairs = [];
  const dRegister = (address, id, registerASecond) => dPairs.push(attempt(() => dStore.addConstraint({ address, id }, (context) => {
    const atRegistration = context.attempt === null;
    dOrder.push({ id, at: atRegistration ? 'registration' : 'pass', askAddress: context.address.slice() });
    if (!atRegistration && registerASecond) dRegisterMidPass(dMidPassId);
    return true;
  })));
  dRegister(['window'], 'ancestor-deep', true);              // 1st — the mid-pass registrar
  dRegister(['window', 'tabs'], 'ancestor-parent', false);   // 2nd
  dRegister(['window', 'tabs', 'landingPage'], 'at-the-address', false); // 3rd
  const dReceipt = attempt(() => dStore.delete(['window', 'tabs', 'landingPage']));
  const dPassAsks = dOrder.filter((one) => one.at === 'pass').map((one) => one.id);
  // THE LOG ON BOTH ARMS: the refusal's own `log` where the delete refused, and the closed attempt's log through
  // `K-4` where it passed (the receipt carries the `CommitRecord` at its non-enumerable `commit`, `D-49`'s device).
  const dClosed = dReceipt.ok && dReceipt.value.commit !== null && dReceipt.value.commit !== undefined
    ? attempt(() => kernel.log(dStore, dReceipt.value.commit.attempt))
    : null;
  const dLog = dReceipt.ok
    ? (dClosed !== null && dClosed.ok && Array.isArray(dClosed.value) ? dClosed.value : [])
    : (Array.isArray(dReceipt.caught.log) ? dReceipt.caught.log : []);
  // **⟶ `D-65`: THE POSITION IS THE ARRAY INDEX.** The reading prints each `constraint-check` entry with the
  // index it stands at — the list's own ordinal — and no `seq` member is read anywhere.
  const dCheckedSeq = dLog.filter((entry) => entry.kind === 'constraint-check')
    .map((entry) => [dLog.indexOf(entry), entry.id]);
  P('X6d · the pass\'s asks, IN ORDER (registration order across ancestors and the act\'s own)', dPassAsks);
  P('X6d · the `constraint-check` entries with their POSITIONS (the array index)', dCheckedSeq);
  P('X6d · the mid-pass registration and where it was asked', {
    registered: dMidPassRegistered,
    inThisPass: dPassAsks.includes(dMidPassId),
    asksInOrder: dOrder.length,
  });
  // THE NEXT PASS IS THE PROOF OF THE FREEZE: a fresh act at the same address asks the FOURTH pair and not a
  // fifth — the registry grew by one row and the set grew by one, and only now.
  const dOrderBefore = dOrder.length;
  const dSecond = attempt(() => dStore.write(['window', 'tabs', 'landingPage'], 'mem', 2));
  const dSecondAsks = dOrder.slice(dOrderBefore).filter((one) => one.at === 'pass').map((one) => one.id);
  P('X6d · the NEXT pass\'s asks (the mid-pass registration has entered the set)', dSecondAsks);
  A('DW-10.17', '`CX-12` (the pass\'s evaluated set is FIXED WHEN THE PASS BEGINS); `HL-8` item 6 (`D-39`\'s first-registration order, ancestors interleaved into that ONE order); `D-56` (the set is materialised from the act\'s address AND its ancestors)',
    'THE SNAPSHOT: the pass asks EXACTLY the three pairs registered before it began — in the ONE registration order across the deep ancestor, the parent and the act\'s own address — and NOT the pair registered during it; the fourth enters the NEXT pass; and the `seq` order of the `constraint-check` entries is that same order',
    dPairs.every((one) => one.ok === true)
      && keyOfAddr(dPassAsks) === keyOfAddr(['ancestor-deep', 'ancestor-parent', 'at-the-address'])
      && dMidPassRegistered === true
      && dReceipt.ok === true
      && keyOfAddr(dSecondAsks) === keyOfAddr(['ancestor-deep', 'ancestor-parent', 'at-the-address', dMidPassId]),
    `pass asks ${JSON.stringify(dPassAsks)} · checked ${JSON.stringify(dCheckedSeq)} · mid-pass `
      + `${dMidPassRegistered} in this pass ${dPassAsks.includes(dMidPassId)} · next pass ${JSON.stringify(dSecondAsks)}`);
  console.log('');
  console.log('        THE SENTENCE TO CARRY AWAY (`D-55`): A WITNESS ENTRY NEVER SHIPS AN EMPTY ADDRESS LIST while');
  console.log('        the ROOT still stands as `[[]]`; a thrown message stands in the commit\'s log and the crossed');
  console.log('        sentence no longer claims the value crosses; a refused edit undoes the WHOLE commit to the');
  console.log('        mark its OUTERMOST opening cached; the handed-off report and log are FROZEN; and the drain');
  console.log('        judges the STATE THE COMMIT STANDS AT, so two raises in one commit are both judged.');
  console.log('        AND `DEF-X` IS NO LONGER A MEASUREMENT: the delete runs a pass of its own kind, its delivery');
  console.log('        follows it, and `rollback` is named as the arm that still lacks the same attempt machinery.');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (W11) `D-58` — NO IN-FLIGHT INSIGHT, AND NO RETENTION AFTER THE HANDOFF
//
// **THE RULING** (`strata/decisions.md` · `D-58`, 2026-10-28, the architect, verbatim):
//
//     The client does not need any insight into the current state of a commit/attempt before it completes.
//     Don't expose any of it. After a commit/attempt resolves/rejects, the store does not need to retain the
//     message log or other client-returned data. Don't retain it.
//
// **TWO DEMANDS, EACH DRIVEN AND PRINTED.** (1) **NOTHING ABOUT A RUNNING COMMIT IS READABLE**: `K-4`'s live arm
// used to answer the in-flight list — `D-39`'s entry sequence PART-WAY THROUGH the pass, as a consumer read
// (and since `D-65` the ordinal there is the array index, not a `seq` member) —
// and it refuses `KC-7` now, **the same member `K-5` already used**, so the two readers refuse with ONE shape,
// ONE message family and ONE empty `log`. (2) **NOTHING IS RETAINED AFTER THE HANDOFF**: `K-5` answers the record
// the store still NEEDS — the outcome, the ops the journal holds, the reversal's record — and **not the message
// log**, which was handed off with `K-3`'s return (or with the refusal a caller caught) and is the consumer's
// from that instant.
//
// **EVERY CELL BELOW BITES UNDER A `/tmp` REVERT**, one line each:
//   · `DW-11.1`/`DW-11.2` — restore `if (live !== undefined) return live.log;` in `kernel-terminal.mjs` → RED;
//   · `DW-11.3`/`DW-11.4` — remove the `dropHandoff(...)` call from `kernel-attempt.mjs` → RED on the retained
//     shape, on `K-5`'s answer and on the single-copy proof.
console.log('\n── W11 · `D-58` · NO IN-FLIGHT INSIGHT, AND NO RETENTION AFTER THE HANDOFF ─────────────');
{
  const store = make();
  store.write(['w11'], 'mem', 0);
  const seen = [];
  const registered = attempt(() => store.addConstraint({ address: ['w11'], id: 'w11-pair' }, (context) => {
    // THE RUNNING COMMIT, READ FROM INSIDE: every route a caller has to it is taken HERE, at the pass's own
    // instant, and the answers are the measurement.
    if (context.attempt !== null) {
      seen.push({
        log: attempt(() => kernel.log(store, context.attempt)),
        report: attempt(() => kernel.report(store, context.attempt)),
        constraints: attempt(() => Object.keys(store.constraints()[0] ?? {}).sort()),
        record: context.commit,
      });
    }
    return context.value === 9 ? { message: 'w11 refuses 9' } : true;
  }));
  A('DW-11.0', 'the drive is coherent or the cell says so: the pair registers and the open attempt is minted',
    'the registration lands and `K-2` answers its `CommitRecord`',
    registered.ok === true, registered.ok ? 'registered' : JSON.stringify(registered.caught && registered.caught.status));
  // (a) THE OPEN ATTEMPT: `K-4` AND `K-5` ANSWER THE ONE REFUSAL.
  const open = attempt(() => kernel.commit(store, ['w11'], 'mem', 9));
  const liveLog = attempt(() => kernel.log(store, open.value.attempt));
  const liveReport = attempt(() => kernel.report(store, open.value.attempt));
  P('D-58 · `K-4` over an OPEN attempt', [liveLog.ok ? 'ANSWERED' : liveLog.caught.status,
    liveLog.ok ? null : liveLog.caught.message, liveLog.ok ? null : liveLog.caught.log]);
  P('D-58 · `K-5` over the same OPEN attempt', [liveReport.ok ? 'ANSWERED' : liveReport.caught.status,
    liveReport.ok ? null : liveReport.caught.message, liveReport.ok ? null : liveReport.caught.log]);
  P("D-58 · the readers' refusal forms", [keysOf(liveLog.caught), keysOf(liveReport.caught)]);
  A('DW-11.1', '`D-58` (2026-10-28) — *"The client does not need any insight into the current state of a commit/attempt before it completes. Don\'t expose any of it."* — read with `kernel-surface.md §2.1` item 5\'s `KC-7` row',
    '`K-4` OVER A LIVE ATTEMPT REFUSES `KC-7` — the member `K-5` uses — in the same three-member form, the same empty `log` and the same message family; and it no longer answers the in-flight list',
    liveLog.ok === false && liveLog.caught.status === 'KC-7'
      && liveReport.ok === false && liveReport.caught.status === 'KC-7'
      && keysOf(liveLog.caught).join(',') === keysOf(liveReport.caught).join(',')
      && JSON.stringify(liveLog.caught.log) === '[]'
      && liveLog.caught.message === liveReport.caught.message
      && liveLog.caught.message.includes(open.value.attempt.id),
    `K-4 ${liveLog.ok ? 'ANSWERED' : liveLog.caught.status} · K-5 `
      + `${liveReport.ok ? 'ANSWERED' : liveReport.caught.status} · forms `
      + `${JSON.stringify([keysOf(liveLog.caught), keysOf(liveReport.caught)])} · messages equal `
      + `${liveLog.ok === false && liveReport.ok === false && liveLog.caught.message === liveReport.caught.message}`);
  // (b) AND NOTHING OF THE RUNNING COMMIT IS REACHABLE FROM INSIDE IT: the pass's own instant, taken by the
  // pair's body at its landing and READ HERE (the run is driven below, before this cell is evaluated).
  // (c) THE COMMIT RESOLVES: the one record the consumer is handed, and the store's copy after the handoff.
  const run = attempt(() => kernel.runAttempt(store, open.value));
  const crossed = run.ok === false ? run.caught : null;
  const handed = crossed !== null && Array.isArray(crossed.log) ? crossed.log : null;
  const inFlight = seen[0] ?? null;
  P('D-58 · inside the pass — `K-4` / `K-5`', inFlight === null ? '<not entered>' : [
    inFlight.log.ok ? 'ANSWERED' : inFlight.log.caught.status,
    inFlight.report.ok ? 'ANSWERED' : inFlight.report.caught.status,
  ]);
  P("D-58 · inside the pass — `constraints()` members, the context's commit", inFlight === null ? '<not entered>'
    : [inFlight.constraints.ok ? inFlight.constraints.value : null, inFlight.record]);
  A('DW-11.2', '`D-58` — *"Don\'t expose any of it"* — read with `surface.md §2.2`\'s `constraints()` row (a pair is `{address, id}` and nothing else) and `D-44`\'s `context` (five members, no commit)',
    'WHILE THE COMMIT RUNS NO ROUTE HANDS A CLIENT ITS STATE: both readers refuse `KC-7` at the pass\'s own instant, `constraints()` answers `{address, id}` pairs, and the pass\'s context carries NO commit member',
    inFlight !== null && inFlight.log.ok === false && inFlight.log.caught.status === 'KC-7'
      && inFlight.report.ok === false && inFlight.report.caught.status === 'KC-7'
      && JSON.stringify(inFlight.constraints.value) === JSON.stringify(['address', 'id'])
      && inFlight.record === undefined,
    inFlight === null ? '<not entered>' : JSON.stringify([inFlight.log.caught.status, inFlight.report.caught.status,
      inFlight.constraints.value, inFlight.record]));

  const retained = attempt(() => kernel.report(store, open.value.attempt));
  const closedLog = attempt(() => kernel.log(store, open.value.attempt));
  const before = ['attempt', 'log', 'ops', 'outcome', 'rollback'];
  const after = retained.ok ? keysOf(retained.value) : [];
  P("D-58 · the closed attempt's retained shape BEFORE → AFTER", [before, after]);
  P('D-58 · `K-5` AFTER the drop', retained.ok ? {
    attempt: retained.value.attempt,
    outcome: retained.value.outcome,
    ops: retained.value.ops.length,
    rollback: retained.value.rollback.length,
    log: 'log' in retained.value ? '<RETAINED: a finding>' : '<let go>',
  } : retained.caught.status);
  P('D-58 · `K-4` AFTER the drop', closedLog.ok ? closedLog.value : closedLog.caught.status);
  A('DW-11.3', '`D-58` — *"After a commit/attempt resolves/rejects, the store does not need to retain the message log or other client-returned data. Don\'t retain it."* — and its own bound: *"it may still hold outcomes, but it must not hold logs"*',
    'once the commit has RESOLVED OR REJECTED the retained record is the outcome, the ops and the reversal — the `log` member LET GO — and `K-4` over the closed attempt STILL ANSWERS (the empty retained list) while `K-5` still answers the record',
    crossed !== null
      && keysOf(retained.value).join(',') === 'attempt,ops,outcome,rollback'
      && 'log' in retained.value === false
      && retained.value.outcome === 'failed'
      && JSON.stringify(closedLog.value) === '[]',
    `shapes ${JSON.stringify([before, after])} · K-4 `
      + `${closedLog.ok ? JSON.stringify(closedLog.value) : closedLog.caught.status} · K-5 outcome `
      + `${retained.ok ? retained.value.outcome : retained.caught.status}`);
  // (d) THE SINGLE-COPY PROOF: the consumer's record keeps the list; the store's copy is not that object.
  P("D-58 · the crossed refusal's log · the store's closed record", [handed === null ? '<none>' : handed.length,
    'log' in retained.value ? '<retained>' : '<let go>']);
  P("D-58 · ONE OBJECT? (`K-5`'s answer === the handed record?)", retained.value === crossed);
  A('DW-11.4', '`D-58` — the handoff made SINGLE-COPY: *"a retained copy is a second source of truth that can disagree with the one the consumer holds"* (`D-55` item 6\'s ground, read forward)',
    'THE CONSUMER STILL HOLDS ITS RECORD AFTER THE STORE DROPPED ITS OWN: the crossed refusal\'s list is populated and frozen, `K-5`\'s answer is NOT that object, and the store\'s record carries no list at all',
    crossed !== null && handed !== null && handed.length > 0
      && Object.isFrozen(handed) === true
      && retained.value !== crossed
      && 'log' in retained.value === false,
    `handed ${handed === null ? '<none>' : handed.length} · frozen ${handed !== null && Object.isFrozen(handed)}`
      + ` · same object ${retained.value === crossed} · store log `
      + `${'log' in retained.value ? '<retained>' : '<let go>'}`);
  console.log('');
  console.log('        THE SENTENCE TO CARRY AWAY (`D-58`): A RUNNING COMMIT HANDS A CLIENT NOTHING — both readers');
  console.log('        refuse `KC-7`, and the pass\'s own context carries no commit — and once the commit RESOLVES OR');
  console.log('        REJECTS the store keeps the OUTCOME, the OPS and the REVERSAL and lets the MESSAGE LOG go: the');
  console.log('        record the consumer holds is the only copy of it, which is what the seal was for.');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (W12) `D-63` — THE MARK MOVES FORWARD WHEN A SWEEP VALIDATES: the restore target is the LAST VALIDATED STATE
//
// **THE RULING** (`strata/decisions.md` · `D-63`, 2026-10-28, the architect, verbatim): *"After the constraint
// sweep ends in a valid state, bump the restore mark. The passing constraint state marks the new next valid
// state."* **IT NEEDS NO COMMIT IDENTITY, NO NEW PARAMETER, NO NEW JOURNAL FIELD AND NO ARITY CHANGE** — **the
// restore is told a POSITION, and the ruling moves the position.**
//
// **THE FOUR ARMS, AND `D-60`'s TWO HALVES ARE THE REASON EACH ONE IS WHERE IT IS:**
//   * **★ a VALIDATED EDIT STANDS against a later refusal** — write A, its sweep PASSES, a later refusal in the
//     same commit crosses, and `read A` answers what A wrote. **This is the arm `DEF-AN` measured as undone.**
//   * **a REPAIR'S WRITE IS UNDONE WITH THE WRITE** — it lands DURING the sweep, so a sweep that refuses it never
//     bumps and the refusal restores to the opening. Unchanged, printed (`D-60`'s atomic half).
//   * **a LISTENER'S WRITE SURVIVES** — it lands AFTER the sweep, in the delivery, so it is beyond the validated
//     position and the outer's restore does not reach it. **`DEF-AN`'s row's own arm, measured RED at `D-61`.**
//   * **a COMMIT WHOSE SWEEP NEVER PASSES RESTORES TO ITS OPENING** — nothing bumps, and that is today's behaviour
//     and stays for that case.
//
// **THE PLACEMENT IS MEASURED, NOT ASSERTED**: the sweep's passing verdict lands in `kernel-attempt.mjs` at
// `close(kernel, attempt, 'passed')` and the delivery begins at `settleArm`; **the bump stands between them**, so
// the position the opening cached (readable at the pass's own ask) and the position the delivery sees (readable
// inside a listener body) are two DIFFERENT readings — the gap in which a repair and a listener are on different
// sides.
//
// **D-21.** Every cell prints the readings it took before it asserts; **D-17**: the expectations are literals here
// and the citations are comments — no `docs/**` path is opened at runtime.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W12 · `D-63` — bump the mark when a sweep ends valid ─────────────────────────────');
{
  /** THE CROSSED STATUS OF A CAUGHT VALUE, or `<answered>` — a local spelling. */
  const statusOf = (caught) => (caught !== null && typeof caught === 'object' && typeof caught.status === 'string'
    ? caught.status
    : '<no status on the caught value>');
  /** THE STORE'S OWN POSITION, at the addon's entry and never composed here. */
  const journalMarkOf = (store) => {
    try {
      return Reflect.apply(withAddon().journalMark, store, []);
    } catch (unanswered) {
      return undefined;
    }
  };
  /** **THE `DEF-Q` RULE APPLIES TO A CELL'S OWN PRINT**: no column prints `undefined`. */
  const markSpelling = (mark) => {
    if (mark === undefined) return 'NO CACHE';
    if (mark === null || typeof mark !== 'object') return `a mark of class ${typeof mark}`;
    if (mark.k === 's' && typeof mark.v === 'string') return mark.v;
    if (mark.k === 'F') return 'Absent';
    return `a mark of kind ${JSON.stringify(mark.k)}`;
  };

  // ── * DW-12.1 · A VALIDATED EDIT STANDS AGAINST A LATER REFUSAL ─────────────────────────────────
  // **THE DRIVE, IN THE ORDER THE RULING NAMES IT.** `['a']` opens at `5` and is written to `6` (an earlier op the
  // listener will reverse). The write under test lands `7`, its sweep PASSES — the pair approves everything but
  // `5` — and then the DELIVERY's listener reverses the `6` op, so `['a']` stands at `5`, which the restarted check
  // REFUSES. **BEFORE `D-63` the restore named the commit's OPENING (`6`) and A's own approved value was undone;
  // AFTER IT the restore names the mark the passing sweep validated (`7`), and A's value stands.**
  const starStore = make();
  starStore.write(['a'], 'mem', 5);
  const starPrior = starStore.write(['a'], 'mem', 6);
  const starOpening = markSpelling(journalMarkOf(starStore));
  const starVerdict = [];
  const starDelivery = [];
  let starDeliveryStore = 'NO CACHE';
  let starReversal = null;
  const starAsks = [];
  const starListener = starStore.listen('star-listener', [['a']]);
  starStore.register(starListener, () => {
    starDelivery.push(markSpelling(windowMark(starStore)));
    starDeliveryStore = markSpelling(journalMarkOf(starStore));
    if (starReversal === null) starReversal = attempt(() => starStore.rollback(starPrior.op.opId));
  });
  const starRegistered = attempt(() => starStore.addConstraint({ address: ['a'], id: 'star-pair' }, (context) => {
    starAsks.push(context.value);
    if (context.attempt !== null && starVerdict.length === 0) starVerdict.push(markSpelling(windowMark(starStore)));
    return Object.is(context.value, 5)
      ? { message: 'the state the reversal leaves is not one this pair admits' }
      : true;
  }));
  const starBefore = starStore.read(['a']);
  const starTerminal = attempt(() => starStore.write(['a'], 'mem', 7));
  const starAfter = starStore.read(['a']);

  P("D-63 · the OPENING's cache (measured at rest, before the call)", starOpening);
  P("D-63 · the cache in flight as the SWEEP passes (the verdict's boundary)", starVerdict);
  P("D-63 · the cache in flight when the DELIVERY runs (the mark the restore names)", starDelivery);
  P("D-63 · the store's own `journalMark` at that same instant", starDeliveryStore);
  P('D-63 · the pairs asked, in order', starAsks);
  P("D-63 · the reversal's own record", starReversal === null ? '<not reached>'
    : (starReversal.ok ? 'answered' : statusOf(starReversal.caught)));
  P("D-63 · the write's answer", starTerminal.ok ? 'ANSWERED' : statusOf(starTerminal.caught));
  P("D-63 · the store BEFORE → AFTER (what A wrote)", [starBefore, starAfter]);

  A('DW-12.1', '`D-63` (2026-10-28) — *"After the constraint sweep ends in a valid state, bump the restore mark. The passing constraint state marks the new next valid state."* · `D-60`\'s discrete half by position',
    'A VALIDATED EDIT STANDS AGAINST A LATER REFUSAL: write A\'s sweep passes, the listener\'s reversal makes the restarted check refuse, the write crosses `ConstraintPassRefused` — and `read [\'a\']` answers what A wrote (`7`), because the restore names the LAST VALIDATED MARK and the state the reversal left is what it undid',
    starRegistered.ok === true
      && starTerminal.ok === false && statusOf(starTerminal.caught) === PASS_REFUSED
      && JSON.stringify(starAsks) === JSON.stringify([6, 7, 5])
      && starVerdict.length === 1 && starVerdict[0] === starOpening
      && starDelivery.length === 1 && starDelivery[0] === starDeliveryStore && starDelivery[0] !== starOpening
      && starBefore === 6 && starAfter === 7,
    `registered ${starRegistered.ok} · asks ${JSON.stringify(starAsks)} · answer `
      + `${starTerminal.ok ? 'ANSWERED' : statusOf(starTerminal.caught)} · opening ${JSON.stringify(starOpening)} · `
      + `verdict ${JSON.stringify(starVerdict)} · delivery ${JSON.stringify(starDelivery)} · store before → after `
      + `${JSON.stringify([starBefore, starAfter])}`);

  // ── DW-12.2 · A REPAIR'S WRITE IS UNDONE WITH THE WRITE (unchanged, printed) ──────────────────────
  // **`D-60`'s ATOMIC HALF, BY POSITION**: the repair lands an op DURING the sweep, the re-run refuses it, **no sweep
  // ever passed, so nothing bumped** — and the refusal restores the state the commit found.
  const repairStore = make();
  repairStore.write(['a'], 'mem', 5);
  const repairAsks = [];
  const repairRegistered = attempt(() => repairStore.addConstraint({ address: ['a'], id: 'repair-pair' }, (context) => {
    repairAsks.push(context.value);
    if (Object.is(context.value, 5)) return true;
    return {
      message: 'the repair landing is not a state this pair admits',
      repair: (repairContext) => {
        const written = repairStore.write(repairContext.address, repairContext.tier, 6, repairContext);
        return { ok: true, message: 'repaired to 6', op: written.op };
      },
    };
  }));
  const repairTerminal = attempt(() => repairStore.write(['a'], 'mem', 9));
  const repairAfter = repairStore.read(['a']);

  P("D-63 · the repair's pairs asked, in order (5 · the write's 9 · the repair's own 6)", repairAsks);
  P("D-63 · the write's answer", repairTerminal.ok ? 'ANSWERED' : statusOf(repairTerminal.caught));
  P("D-63 · the store AFTER (the repair's landing gone with the write)", repairAfter);

  A('DW-12.2', '`D-60`\'s atomic half read through `D-63`\'s placement — *"A constraint repair is atomic with the original write"*',
    'A REPAIR\'S WRITE IS UNDONE WITH THE WRITE: the repair lands, the re-run refuses it, NO sweep passed so nothing bumped, and `read [\'a\']` answers the state the commit found (`5`) — the repair\'s `6` and the write\'s `9` are both gone',
    repairRegistered.ok === true
      && repairTerminal.ok === false && statusOf(repairTerminal.caught) === PASS_REFUSED
      && JSON.stringify(repairAsks) === JSON.stringify([5, 9, 6])
      && repairAfter === 5,
    `registered ${repairRegistered.ok} · asks ${JSON.stringify(repairAsks)} · answer `
      + `${repairTerminal.ok ? 'ANSWERED' : statusOf(repairTerminal.caught)} · store after ${JSON.stringify(repairAfter)}`);

  // ── DW-12.3 · A LISTENER'S WRITE SURVIVES THE OUTER REFUSAL — `DEF-AN`'s row's own arm ─────────────
  // **THE ARM `D-61` MEASURED RED ON THE SHIPPED ARTEFACT**: *"The listener's `write(['g'],'mem',1)` returned; the
  // outer write crossed `ConstraintPassRefused`; `read(['g'])` throws `AddressNotFound`."* **THE OUTER WRITE'S
  // REFUSAL IS THE RESTARTED CHECK'S, SO IT IS TAKEN AFTER THE LISTENER'S WRITE** — and the listener's own commit's
  // sweep passes, so the mark moves past `g`'s op and the outer's restore cannot reach it.
  const surviveStore = make();
  surviveStore.write(['a'], 'mem', 5);
  const survivePrior = surviveStore.write(['a'], 'mem', 6);
  const surviveMarks = [];
  let surviveNested = null;
  let surviveReversal = null;
  const surviveListener = surviveStore.listen('survive-listener', [['a']]);
  surviveStore.register(surviveListener, () => {
    surviveNested = attempt(() => surviveStore.write(['g'], 'mem', 1));
    surviveMarks.push(markSpelling(windowMark(surviveStore)));
    if (surviveReversal === null) surviveReversal = attempt(() => surviveStore.rollback(survivePrior.op.opId));
  });
  const surviveRegistered = attempt(() => surviveStore.addConstraint({ address: ['a'], id: 'survive-pair' },
    (context) => (Object.is(context.value, 5)
      ? { message: 'the state the reversal leaves is not one this pair admits' }
      : true)));
  const surviveTerminal = attempt(() => surviveStore.write(['a'], 'mem', 7));
  const surviveA = surviveStore.read(['a']);
  const surviveG = attempt(() => surviveStore.read(['g']));

  P("D-63 · the listener's own write", surviveNested === null ? '<not reached>'
    : (surviveNested.ok ? 'answered its own record' : statusOf(surviveNested.caught)));
  P("D-63 · the cache in flight AFTER the listener's write (the mark carried past it)", surviveMarks);
  P("D-63 · the outer write's answer", surviveTerminal.ok ? 'ANSWERED' : statusOf(surviveTerminal.caught));
  P("D-63 · the store AFTER: ['a'] · ['g']", [surviveA, surviveG.ok ? surviveG.value : statusOf(surviveG.caught)]);

  A('DW-12.3', '`D-60`\'s discrete half by position — *"A listener write is discrete, because it occurs after all constraints"* — and `DEF-AN`\'s row, measured RED at `D-61`',
    'A LISTENER\'S WRITE SURVIVES THE OUTER REFUSAL: the outer write crosses `ConstraintPassRefused`, and the listener\'s `write([\'g\'],\'mem\',1)` answers `1` — it is beyond the bumped mark, so the outer\'s restore does not reach it — while the outer write\'s own validated landing (`7`) stands',
    surviveRegistered.ok === true
      && surviveNested !== null && surviveNested.ok === true
      && surviveReversal !== null && surviveReversal.ok === true
      && surviveTerminal.ok === false && statusOf(surviveTerminal.caught) === PASS_REFUSED
      && surviveA === 7
      && surviveG.ok === true && surviveG.value === 1,
    `registered ${surviveRegistered.ok} · nested ${surviveNested === null ? '<not reached>' : (surviveNested.ok ? 'answered' : statusOf(surviveNested.caught))} · `
      + `reversal ${surviveReversal === null ? '<not reached>' : (surviveReversal.ok ? 'answered' : statusOf(surviveReversal.caught))} · `
      + `answer ${surviveTerminal.ok ? 'ANSWERED' : statusOf(surviveTerminal.caught)} · marks ${JSON.stringify(surviveMarks)} · `
      + `store a=${JSON.stringify(surviveA)} g=${JSON.stringify(surviveG.ok ? surviveG.value : statusOf(surviveG.caught))}`);

  // ── DW-12.4 · A COMMIT WHOSE SWEEP NEVER PASSES RESTORES TO ITS OPENING (unchanged, printed) ─────
  // **THE ARM THE RULING LEAVES WHERE IT WAS, DRIVEN ON BOTH ROUTES A REFUSAL CAN TAKE.** **(a) THE PLAIN ONE**: the
  // pair refuses the write's own value on the FIRST sweep, so the passing arm is never reached, no line of it runs,
  // and the terminal composition's own floor calls restore the address. **(b) THE REVERSAL'S — AND THIS IS THE ONE
  // THAT BITES**: a pair body reverses the attempt's own landing *during* the sweep and the pass then ends FAILING,
  // so the restarted check judges at the state the reversal left and the compensation is `restoreReversal`, whose
  // target is the cache in flight — **the opening's, because nothing bumped.** A mark bumped anywhere on a failing
  // sweep would restore the write's own landing here instead of the born state, which is what this arm pins.
  const neverStore = make();
  neverStore.write(['a'], 'mem', 5);
  const neverOpening = markSpelling(journalMarkOf(neverStore));
  const neverRegistered = attempt(() => neverStore.addConstraint({ address: ['a'], id: 'never-pair' },
    (context) => (Object.is(context.value, 5) ? true : { message: 'a must stand at 5' })));
  const neverTerminal = attempt(() => neverStore.write(['a'], 'mem', 7));
  const neverAfter = neverStore.read(['a']);

  const neverReversalStore = make();
  const neverOpeningReversal = markSpelling(journalMarkOf(neverReversalStore));
  const neverReversalAsks = [];
  let neverReversed = false;
  let neverInner = null;
  const neverReversalRegistered = attempt(() => neverReversalStore.addConstraint(
    { address: ['a'], id: 'never-reversal-pair' },
    (context) => {
      neverReversalAsks.push(context.value);
      if (context.attempt !== null && neverReversed === false) {
        neverReversed = true;
        neverInner = attempt(() => neverReversalStore.rollback(context.op.opId));
      }
      if (neverReversed === true && context.value === 7) {
        return { message: 'the pair refuses the landing it has just reversed' };
      }
      if (neverReversalAsks.length > 2 && context.value === undefined) {
        return { message: 'the reversal leaves the address absent, which this pair does not admit' };
      }
      return true;
    },
  ));
  const neverReversalTerminal = attempt(() => neverReversalStore.write(['a'], 'mem', 7));
  // **AN ABSENT ADDRESS THROWS `AddressNotFound` AND IS PRINTED AS NOTHING** (`DEF-Q`: a cell may print absence) —
  // so the standing is read through the caught arm and not through `ok`.
  const neverReversalRead = attempt(() => neverReversalStore.read(['a']));
  const neverReversalStanding = neverReversalRead.ok ? neverReversalRead.value : undefined;

  P("D-63 · (a) the OPENING's cache · the store AFTER", [neverOpening, neverAfter]);
  P("D-63 · (a) the write's answer", neverTerminal.ok ? 'ANSWERED' : statusOf(neverTerminal.caught));
  P("D-63 · (b) the OPENING's cache · the reversal's asks · the store AFTER",
    [neverOpeningReversal, neverReversalAsks,
      neverReversalStanding === undefined ? 'NOTHING (absent)' : neverReversalStanding]);
  P("D-63 · (b) the write's answer", neverReversalTerminal.ok ? 'ANSWERED'
    : statusOf(neverReversalTerminal.caught));

  A('DW-12.4', '`D-63` read for its own limit — *"the passing constraint state marks the new next valid state"*: where no sweep passes, no state is marked',
    'A COMMIT WHOSE SWEEP NEVER PASSES RESTORES TO ITS OPENING: (a) the pair refuses the write\'s own value on the FIRST sweep and the store answers the state the commit found (`5`); and (b) a pair body\'s reversal inside a sweep that then FAILS is undone against the cache in flight — the OPENING\'s, the FLOOR — so the address stands at NOTHING, the state the store was born with. Nothing bumped on either route, and that is today\'s behaviour and it stays for that case',
    neverRegistered.ok === true
      && neverTerminal.ok === false && statusOf(neverTerminal.caught) === PASS_REFUSED
      && neverAfter === 5
      && neverReversalRegistered.ok === true
      && neverReversed === true
      && neverInner !== null && neverInner.ok === true
      && neverReversalTerminal.ok === false
      && statusOf(neverReversalTerminal.caught) === PASS_REFUSED
      && neverReversalRead.ok === false
      && neverReversalStanding === undefined,
    `(a) registered ${neverRegistered.ok} · answer `
      + `${neverTerminal.ok ? 'ANSWERED' : statusOf(neverTerminal.caught)} · store after ${JSON.stringify(neverAfter)} `
      + `|| (b) registered ${neverReversalRegistered.ok} · reversed ${neverReversed} · asks `
      + `${JSON.stringify(neverReversalAsks)} · answer `
      + `${neverReversalTerminal.ok ? 'ANSWERED' : statusOf(neverReversalTerminal.caught)} · store after `
      + `${JSON.stringify(neverReversalStanding === undefined ? 'NOTHING (absent)' : neverReversalStanding)}`);

  console.log('');
  console.log('        THE SENTENCE TO CARRY AWAY (`D-63`): A REFUSED EDIT ROLLS BACK TO THE LAST VALIDATED STATE,');
  console.log('        NOT TO THE STATE THE COMMIT OPENED AT. The restore is told a POSITION and the position MOVES');
  console.log('        FORWARD at every constraint sweep that ends valid, so an edit the sweep APPROVED stands against');
  console.log("        a later refusal in the same commit, a repair's write (during the sweep) goes with the write,");
  console.log("        a listener's write (in the delivery) is beyond the mark and survives, and a commit that never");
  console.log('        passes a sweep keeps its opening mark and restores to it — which is why `DEF-AN` closes with no');
  console.log('        commit identity on the journal at all.');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W13) `D-66` — A PAIR AT A DESCENDANT IS ASKED ONLY WHEN THE ACT TOUCHED IT
//
// **THE RULING** (`strata/decisions.md` · `D-66`, 2026-10-28, the architect, verbatim):
//
//     A pair at a descendant should only be asked if the change also affects that descendant, ex. write(['a',
//     'b'], {'c': "foo", 'd': "bar"} should trigger at ['a'], ['a', 'b'], ['a', 'b', 'c'], and ['a', 'b', 'd'],
//     but not ['a', 'b', 'e']
//
// **`D-56` RULED THE ANCESTOR DIRECTION AND LEFT THE DESCENDANT ONE MEASURED AND NOT IMPLEMENTED; `D-66` RULES THE
// DESCENDANT ONE AND THE CRITERION IT NAMES IS TOUCHED, NOT DESCENDANT.** **A pair is asked when THE ACT CHANGES
// THE VALUE AT THE PAIR'S ADDRESS**: an ancestor's read contains the subtree (`D-56`, unmoved), and a node the act
// CREATED OR DESTROYED has a value that changed (**`D-66`**). **`['a','b','e']` IS NOT ASKED BECAUSE THE WRITE DID
// NOT TOUCH `e`.**
//
// **WHAT THE SET IS COMPUTED FROM, AND WHERE**: `pairsAtAddress` (`bindings/js/src/entry/kernel-foundations.mjs`)
// asks `touchedAddresses` for the act's path set — **the act being the `JournalOp` the run evaluates against**,
// whose `address` and `after`/`before` the store's own journal carries. **A WRITE touches exactly the paths its
// value contains** (a scalar contains none; an array contributes its own `number` indices; a nested object its own
// member names, recursed one level down), **a DELETE touches the whole subtree at its address**, read off the
// `before` state it removed. **THE SNAPSHOT'S THREE PROPERTIES SURVIVE `D-66`** (`CX-12`; `HL-8` item 6): one
// materialisation at pass start, frozen, and ONE registration order across ancestors, the act's own address and
// the touched descendants — the touched rows interleave into the same `Map` sequence and form no second list.
//
// **⟶ AND THE WRITE ARM IS NOW SYMMETRIC, 2026-10-29 — `DW-13.5` and `DW-13.6`, ADDED BESIDE `DW-13.1`–`DW-13.4`
// AND MOVING NOT ONE BYTE OF THEM.** `RCA-8(g)` ANNOTATE-BESIDE: **the sentence above — *"A WRITE touches exactly
// the paths its value contains"* — is the reading of its own date and is read THROUGH this clause, which SUPERSEDES
// it and leaves the delete arm exactly as it stood.** **THE MEASURED RESIDUAL WAS THIS**: a write that REPLACES a
// node DROPS the sub-paths the old value carried — `{c: 1}` written over `{c: {x: 1}}` leaves `['a','b','c','x']`
// present-before and absent-after, **which is a change to what a read there returns** — and the written value does
// not name `x`, so the pair standing there went unasked. **THE CRITERION `D-66` NAMED DECIDES IT WITHOUT A NEW
// RULE**: *"a pair is asked when the act changes the value at the pair's address"*, **and a path that DISAPPEARS
// changed as surely as a path that APPEARS.** **SO THE TOUCHED SET IS THE UNION OF BOTH VALUES' PATH SETS FOR A
// WRITE — the paths of `after.value` together with the paths of `before.value` — and `op.before.value` is the
// source of the second half.** `['a','b','e']` is STILL NOT ASKED, because `e` stands in neither value.
//
// **EVERY CELL BELOW BITES UNDER A `/tmp` REVERT**, one line each:
//   · `DW-13.1`/`DW-13.2` — restore `pairsAtAddress`'s membership test to `isAddressPrefix` alone (drop the
//     `|| touchesAddress(...)` term) → RED on the touched arm (the write's `c`/`d` pairs go unasked, and the
//     nested write's `p`/`p.q`/`p.r` too);
//   · `DW-13.3` — register the touched rows into a SECOND list appended after the prefix rows, or re-read the
//     registry inside the loop → RED on the one-order and on the freeze;
//   · `DW-13.5`/`DW-13.6` — restore `touchedAddresses`'s write arm to `after` ALONE (delete the `before` half of
//     the union) → RED on the residual: the pair at `['a','b','c','x']` goes unasked while `['a','b','c','z']`
//     stays unasked, which is exactly the asymmetry the union removes;
//   · `DW-13.6` — drop `before` from what the pass hands the set (or read `op.before.value` without the
//     `present` guard) → RED on the presence measurement and, on the first write, on a throw.
console.log('\n── W13 · `D-66` · A PAIR AT A DESCENDANT IS ASKED ONLY WHEN THE ACT TOUCHED IT ────────');
{
  const statusOf = (caught) => (caught !== null && typeof caught === 'object' && typeof caught.status === 'string'
    ? caught.status
    : '<no status on the caught value>');
  // ── DW-13.1 · THE RULING'S OWN EXAMPLE, ALL FIVE ASKS PRINTED ─────────────────────────────────────
  // **THE ARCHITECT'S OWN DRIVE, VERBATIM**: a write of `{c:'foo', d:'bar'}` at `['a','b']`, with a pair standing
  // at each of the five addresses the ruling names. **FOUR ARE ASKED AND THE FIFTH IS NOT**, and the cell prints
  // every one of the five with its own verdict so the absence of `['a','b','e']` is read and not inferred.
  const rStore = make();
  rStore.write(['a'], 'mem', {});
  const rAsks = [];
  const rBody = (id) => (context) => {
    if (context.attempt !== null) {
      rAsks.push({ id, askAddress: context.address.slice(), kind: context.op === null ? null : context.op.kind,
        opAddress: context.op === null ? null : context.op.address });
    }
    return true;
  };
  const rSeeded = [
    [['a'], 'at-a'],
    [['a', 'b'], 'at-a.b'],
    [['a', 'b', 'c'], 'at-a.b.c'],
    [['a', 'b', 'd'], 'at-a.b.d'],
    [['a', 'b', 'e'], 'at-a.b.e'],
  ].map(([address, id]) => ({ address, id, registered: attempt(() => rStore.addConstraint({ address, id }, rBody(id))) }));
  const rRecord = attempt(() => kernel.commit(rStore, ['a', 'b'], 'mem', { c: 'foo', d: 'bar' }));
  const rRun = rRecord.ok ? attempt(() => kernel.runAttempt(rStore, rRecord.value)) : null;
  const rAsked = rAsks.map((one) => one.id);
  // **THE FIVE, ONE LINE EACH** — the ruling's own sentence, read against this run.
  for (const { address, id } of rSeeded) {
    P(`X7 · ${JSON.stringify(address)}`, rAsked.includes(id) ? 'ASKED' : 'NOT ASKED');
  }
  P('X7 · the pass\'s asks, IN ORDER', rAsks);
  P('X7 · the write\'s own op (kind · address · value)', rRecord.ok
    ? { kind: rRecord.value.op.kind, address: rRecord.value.op.address, value: rRecord.value.op.after.value }
    : '<no record>');
  A('DW-13.1', '`strata/decisions.md` · `D-66` (the ruling\'s own example, verbatim: *"write([\'a\', \'b\'], {\'c\': \\"foo\\", \'d\': \\"bar\\"} should trigger at [\'a\'], [\'a\', \'b\'], [\'a\', \'b\', \'c\'], and [\'a\', \'b\', \'d\'], but not [\'a\', \'b\', \'e\']"*) — read with `D-56` (the ancestor arm) and `D-66`\'s criterion (*"a pair is asked when the act changes the value at the pair\'s address"*)',
    'THE RULING\'S OWN EXAMPLE, ALL FIVE: a write of `{c:\'foo\', d:\'bar\'}` at `[\'a\',\'b\']` asks `[\'a\']`, `[\'a\',\'b\']`, `[\'a\',\'b\',\'c\']` and `[\'a\',\'b\',\'d\']` — IN THAT ONE REGISTRATION ORDER — and does NOT ask `[\'a\',\'b\',\'e\']`, because the write did not touch `e`',
    rSeeded.every((one) => one.registered.ok === true)
      && rRecord.ok === true && rRun !== null && rRun.ok === true && rRun.value.outcome === 'passed'
      && keyOfAddr(rAsked) === keyOfAddr(['at-a', 'at-a.b', 'at-a.b.c', 'at-a.b.d'])
      && rAsked.includes('at-a.b.e') === false,
    `asked ${JSON.stringify(rAsked)} · run ${rRun === null ? '<not reached>' : (rRun.ok ? rRun.value.outcome : statusOf(rRun.caught))} · `
      + `the five ${JSON.stringify(rSeeded.map(({ address, id }) => [keyOfAddr(address), rAsked.includes(id) ? 'ASKED' : 'NOT ASKED']))}`);

  // ── DW-13.2 · THE NESTED WRITE: A VALUE'S PATH SET IS ITS OWN SUB-PATHS, ONE LEVEL DOWN ──────────
  // **`D-66`: *"a nested object touches its own sub-paths, by the same rule one level down"*.** The value written
  // at `['n','o']` is `{p:{q:1, r:[7,8]}}`, so its path set is `['n','o','p']`, `['n','o','p','q']`,
  // `['n','o','p','r']`, `['n','o','p','r',0]` and `['n','o','p','r',1]` — **the array's indices as `number`
  // segments** — and the pair at `['n','o','p','z']` is NOT asked, because nothing of the value stands at `z`.
  const nStore = make();
  nStore.write(['n'], 'mem', {});
  const nAsks = [];
  const nBody = (id) => (context) => {
    if (context.attempt !== null) nAsks.push(id);
    return true;
  };
  const nSeeded = [
    [['n', 'o', 'p'], 'at-p'],
    [['n', 'o', 'p', 'q'], 'at-p.q'],
    [['n', 'o', 'p', 'r'], 'at-p.r'],
    [['n', 'o', 'p', 'r', 0], 'at-p.r[0]'],
    [['n', 'o', 'p', 'z'], 'at-p.z'],
  ].map(([address, id]) => ({ address, id, registered: attempt(() => nStore.addConstraint({ address, id }, nBody(id))) }));
  const nRecord = attempt(() => kernel.commit(nStore, ['n', 'o'], 'mem', { p: { q: 1, r: [7, 8] } }));
  const nRun = nRecord.ok ? attempt(() => kernel.runAttempt(nStore, nRecord.value)) : null;
  for (const { address, id } of nSeeded) {
    P(`X7 · nested ${JSON.stringify(address)}`, nAsks.includes(id) ? 'ASKED' : 'NOT ASKED');
  }
  P('X7 · the nested pass\'s asks, IN ORDER', nAsks);
  A('DW-13.2', '`strata/decisions.md` · `D-66` (*"a nested object touches its own sub-paths, by the same rule one level below"*) — read with `contract.md §1`\'s segment law (an array index is a non-negative integer, never a string)',
    'THE NESTED WRITE TOUCHES ITS OWN SUB-PATHS: a write of `{p:{q:1, r:[7,8]}}` at `[\'n\',\'o\']` asks the pairs at `[\'n\',\'o\',\'p\']`, `[\'n\',\'o\',\'p\',\'q\']`, `[\'n\',\'o\',\'p\',\'r\']` and `[\'n\',\'o\',\'p\',\'r\',0]` — the array\'s index spelled as a `number` — and NOT the pair at `[\'n\',\'o\',\'p\',\'z\']`',
    nSeeded.every((one) => one.registered.ok === true)
      && nRecord.ok === true && nRun !== null && nRun.ok === true && nRun.value.outcome === 'passed'
      && nAsks.includes('at-p') && nAsks.includes('at-p.q') && nAsks.includes('at-p.r')
      && nAsks.includes('at-p.r[0]') && nAsks.includes('at-p.z') === false,
    `asks ${JSON.stringify(nAsks)} · run ${nRun === null ? '<not reached>' : (nRun.ok ? nRun.value.outcome : statusOf(nRun.caught))}`);

  // ── DW-13.3 · THE SNAPSHOT, WITH THE TOUCHED ROWS IN IT: ONCE, FROZEN, ONE ORDER ─────────────────
  // **`D-66` DEFERS TO `CX-12` AND TO `HL-8` ITEM 6 AND MOVES NEITHER.** The drive registers FOUR pairs in one
  // sequence — the deep ancestor `['window']`, the act's own address `['window','tabs']`, the touched descendant
  // `['window','tabs','settings']` and the UNTOUCHED descendant `['window','tabs','about']` — and a fifth from
  // INSIDE the pass. **The pass asks the first three in that one order, and none of the last two**; the fifth
  // enters the NEXT pass's set and no earlier one.
  const sStore = make();
  sStore.write(['window'], 'mem', tabsSeed());
  const sOrder = [];
  const sMidPassId = 'registered-during-the-pass';
  let sMidPassRegistered = false;
  const sRegisterMidPass = () => {
    if (sMidPassRegistered) return;
    sMidPassRegistered = true;
    sStore.addConstraint({ address: ['window', 'tabs', 'settings', 'active'], id: sMidPassId }, (context) => {
      sOrder.push({ id: sMidPassId, at: context.attempt === null ? 'registration' : 'pass' });
      return true;
    });
  };
  // **THE REGISTRATION SEQUENCE IS DELIBERATELY NOT THE PREFIX-THEN-TOUCHED ONE**: the TOUCHED descendant is
  // registered FIRST and the deep ancestor SECOND, **so a listing that put the touched rows into a SECOND list
  // after the prefix rows would print `[ancestor-deep, at-the-address, touched-descendant]` and this cell would be
  // red** — the one order is the registration order, and this is the drive that can tell it from a second one.
  const sSeeded = [
    [['window', 'tabs', 'settings'], 'touched-descendant', false],
    [['window'], 'ancestor-deep', true],
    [['window', 'tabs'], 'at-the-address', false],
    [['window', 'tabs', 'about'], 'untouched-descendant', false],
  ].map(([address, id, registers]) => ({ id, registered: attempt(() => sStore.addConstraint({ address, id }, (context) => {
    const atRegistration = context.attempt === null;
    sOrder.push({ id, at: atRegistration ? 'registration' : 'pass' });
    if (atRegistration === false && registers) sRegisterMidPass();
    return true;
  })) }));
  // **THE ACT WRITES THE TAB OBJECT ITSELF, NOT THE SEED'S WRAPPER**: the value's path set is what `D-66` reads,
  // so the write at `['window','tabs']` carries `{landingPage, settings}` and touches those two names and theirs.
  const sTabs = () => ({ landingPage: { active: true }, settings: { active: false } });
  const sRecord = attempt(() => kernel.commit(sStore, ['window', 'tabs'], 'mem', sTabs()));
  const sRun = sRecord.ok ? attempt(() => kernel.runAttempt(sStore, sRecord.value)) : null;
  const sPassAsks = sOrder.filter((one) => one.at === 'pass').map((one) => one.id);
  const sOrderBefore = sOrder.length;
  const sSecond = attempt(() => sStore.write(['window', 'tabs'], 'mem', sTabs()));
  const sSecondAsks = sOrder.slice(sOrderBefore).filter((one) => one.at === 'pass').map((one) => one.id);
  P('X7 · the pass\'s asks, IN ORDER — ancestor · the act\'s own address · the TOUCHED descendant', sPassAsks);
  P('X7 · the untouched descendant and the mid-pass registration, in THIS pass', {
    untouchedAsked: sPassAsks.includes('untouched-descendant'),
    midPassAsked: sPassAsks.includes(sMidPassId),
    midPassRegistered: sMidPassRegistered,
  });
  P('X7 · the NEXT pass\'s asks (the mid-pass registration has entered the set)', sSecondAsks);
  A('DW-13.3', '`CX-12` (the pass\'s evaluated set is FIXED WHEN THE PASS BEGINS); `HL-8` item 6 (`D-39`\'s first-registration order); `D-56` and `D-66` (the set is materialised from the act\'s address, its ancestors AND the descendants it touched)',
    'THE SNAPSHOT SURVIVES THE WIDENING: the pass asks EXACTLY the three rows — the TOUCHED descendant, the deep ancestor and the act\'s own address — in the ONE registration order they stand in (the touched row FIRST, because it was registered first, and never in a second list after the prefix rows), and neither the UNTOUCHED descendant nor the pair registered during the pass; that pair enters the NEXT pass and no earlier one',
    sSeeded.every((one) => one.registered.ok === true)
      && sRecord.ok === true && sRun !== null && sRun.ok === true && sRun.value.outcome === 'passed'
      && keyOfAddr(sPassAsks) === keyOfAddr(['touched-descendant', 'ancestor-deep', 'at-the-address'])
      && sMidPassRegistered === true
      && sSecond.ok === true
      && keyOfAddr(sSecondAsks) === keyOfAddr(['touched-descendant', 'ancestor-deep', 'at-the-address', sMidPassId]),
    `pass asks ${JSON.stringify(sPassAsks)} · untouched asked ${sPassAsks.includes('untouched-descendant')} · `
      + `mid-pass ${sMidPassRegistered}/${sPassAsks.includes(sMidPassId)} · next pass ${JSON.stringify(sSecondAsks)}`);

  // ── DW-13.4 · A DELETE'S SUBTREE, AT THE RULING'S OWN ADDRESSES: `['a','b']` ASKS `['a','b','c']` ──
  // **`D-66`: *"for a DELETE, the WHOLE SUBTREE at the act's address, because the act removes all of it"*.** The
  // same two addresses the ruling's write example uses, driven with the OTHER verb: a delete at `['a','b']` removes
  // `['a','b','c']` (and whatever stands under it), so the pair there IS asked — and the pair at `['a','b','e']`,
  // which stood nowhere before the act and stands nowhere after it, is NOT.
  const tStore = make();
  tStore.write(['a'], 'mem', {});
  tStore.write(['a', 'b'], 'mem', { c: { x: 1 }, d: 'bar' });
  const tAsks = [];
  const tBody = (id) => (context) => {
    if (context.attempt !== null) tAsks.push(id);
    return true;
  };
  const tSeeded = [
    [['a'], 'del-a'],
    [['a', 'b'], 'del-a.b'],
    [['a', 'b', 'c'], 'del-a.b.c'],
    [['a', 'b', 'e'], 'del-a.b.e'],
  ].map(([address, id]) => ({ address, id, registered: attempt(() => tStore.addConstraint({ address, id }, tBody(id))) }));
  const tReceipt = attempt(() => tStore.delete(['a', 'b']));
  for (const { address, id } of tSeeded) {
    P(`X7 · delete ${JSON.stringify(address)}`, tAsks.includes(id) ? 'ASKED' : 'NOT ASKED');
  }
  P('X7 · the delete\'s op — what it removed (the subtree it touched)', tReceipt.ok
    ? { kind: tReceipt.value.op.kind, address: tReceipt.value.op.address,
      removed: tReceipt.value.op.before.present ? tReceipt.value.op.before.value : '<absent>' }
    : '<no receipt>');
  A('DW-13.4', '`strata/decisions.md` · `D-66` (*"for a DELETE, the WHOLE SUBTREE at the act\'s address"*) — read with `D-56` (the ancestors, unmoved) and `D-66`\'s sentence *"a descendant of a deleted node is ABSENT after and not before"*',
    'A DELETE TOUCHES THE WHOLE SUBTREE IT REMOVED: a delete at `[\'a\',\'b\']` asks `[\'a\']`, `[\'a\',\'b\']` and `[\'a\',\'b\',\'c\']` — the descendant is GONE, which is a change — and does NOT ask `[\'a\',\'b\',\'e\']`, which stood nowhere before the act',
    tSeeded.every((one) => one.registered.ok === true)
      && tReceipt.ok === true
      && keyOfAddr(tAsks) === keyOfAddr(['del-a', 'del-a.b', 'del-a.b.c'])
      && tAsks.includes('del-a.b.e') === false,
    `asks ${JSON.stringify(tAsks)} · delete ${tReceipt.ok ? 'ANSWERED' : statusOf(tReceipt.caught)}`);

  // ── DW-13.5 · THE RESIDUAL'S OWN ARM: THE PAIR AT THE PATH THE WRITE DROPPED IS ASKED ────────────
  // **THE DEFECT THIS PASS MEASURED, DRIVEN AGAIN WITH THE UNION IN PLACE.** `D-66`'s write arm read *"exactly the
  // paths the written value contains"*, **and that set has one edge the act DID move and the written value does
  // not name**: a node the write REPLACED loses the sub-paths the old value carried. Writing `{c: 1}` over
  // `{c:{x:1}}` leaves `['a','b','c','x']` **present-before and absent-after** — a change to what a read there
  // returns — **and `x` stands in the replaced value alone.** **THE CRITERION *"a pair is asked when the act changes
  // the value at the pair's address"* ASKS IT**, so the touched set is the UNION of the two values' path sets and
  // `op.before.value` is the source of the second half. **BOTH SIDES ARE PRINTED**: the pair at `['a','b','c','x']`
  // — a path in the replaced value and not in the written one — **IS ASKED**; the pair at `['a','b','c','z']` — a
  // path in NEITHER value — **IS NOT ASKED**, and neither is `['a','b','y']`, a sibling neither value carries.
  const gStore = make();
  gStore.write(['a'], 'mem', {});
  gStore.write(['a', 'b'], 'mem', {});
  gStore.write(['a', 'b', 'c'], 'mem', { x: 1 });
  const gAsks = [];
  const gBody = (id) => (context) => {
    if (context.attempt !== null) gAsks.push(id);
    return true;
  };
  // **THE REGISTRATION SEQUENCE IS THE ONE ORDER THE PASS WILL ASK THEM IN**, and every address is a DESCENDANT of
  // the act's — so nothing here is admitted by `D-56`'s prefix arm and every verdict below is the touched arm's.
  const gSeeded = [
    [['a', 'b', 'c', 'x'], 'replaced-descendant'],
    [['a', 'b', 'c', 'z'], 'untouched-beside-x'],
    [['a', 'b', 'y'], 'untouched-sibling'],
  ].map(([address, id]) => ({ address, id, registered: attempt(() => gStore.addConstraint({ address, id }, gBody(id))) }));
  const gRecord = attempt(() => kernel.commit(gStore, ['a', 'b'], 'mem', { c: 1 }));
  const gRun = gRecord.ok ? attempt(() => kernel.runAttempt(gStore, gRecord.value)) : null;
  const gAfter = attempt(() => gStore.read(['a', 'b', 'c', 'x']));
  const gSet = gRecord.ok ? touchedAddresses(gRecord.value.op) : [];
  for (const { address, id } of gSeeded) {
    P(`X7 · residual ${JSON.stringify(address)}`, gAsks.includes(id) ? 'ASKED' : 'NOT ASKED');
  }
  P('X7 · residual · the write\'s two states — what it WROTE, and what it REPLACED', {
    wrote: gRecord.ok ? gRecord.value.op.after.value : '<no record>',
    replaced: gRecord.ok ? (gRecord.value.op.before.present ? gRecord.value.op.before.value : '<absent>') : '<no record>',
  });
  P('X7 · residual · the touched set the union materialises (`touchedAddresses(op)`)', gSet);
  P('X7 · residual · what a read at the dropped path answers AFTER the act', gAfter.ok ? gAfter.value : statusOf(gAfter.caught));
  A('DW-13.5', '`strata/decisions.md` · `D-66`\'s criterion (*"a pair is asked when the act changes the value at the pair\'s address"*) read SYMMETRICALLY — a path that DISAPPEARS changed as surely as a path that appears — with `op.before.value` (`JournalOp`\'s `before`, `src/records.rs`) as the second half\'s source and `touchedAddresses` (`bindings/js/src/entry/kernel-foundations.mjs`) as its one place',
    'A WRITE\'S TOUCHED SET IS THE UNION OF BOTH VALUES\' PATH SETS: a write of `{c:1}` over `{c:{x:1}}` at `[\'a\',\'b\']` ASKS the pair at `[\'a\',\'b\',\'c\',\'x\']` — present before the act and absent after it — and does NOT ask the pairs at `[\'a\',\'b\',\'c\',\'z\']` or `[\'a\',\'b\',\'y\']`, which stand in neither value',
    gSeeded.every((one) => one.registered.ok === true)
      && gRecord.ok === true && gRun !== null && gRun.ok === true && gRun.value.outcome === 'passed'
      && keyOfAddr(gSet) === keyOfAddr([['a', 'b', 'c'], ['a', 'b', 'c', 'x']])
      && keyOfAddr(gAsks) === keyOfAddr(['replaced-descendant'])
      && gAfter.ok === false,
    `asks ${JSON.stringify(gAsks)} · the set ${JSON.stringify(gSet)} · `
      + `read after the act ${gAfter.ok ? JSON.stringify(gAfter.value) : statusOf(gAfter.caught)} · `
      + `run ${gRun === null ? '<not reached>' : (gRun.ok ? gRun.value.outcome : statusOf(gRun.caught))}`);

  // ── DW-13.6 · `op.before` IS PRESENT ON EVERY WRITE THE PASS EVALUATES, AND THE FIRST WRITE IS ABSENT ──
  // **THE UNION'S SECOND HALF NEEDS ITS SOURCE ON EVERY WRITE THE PASS SEES, AND THE FIRST WRITE HAS NO VALUE TO
  // READ.** `D-66` asked for exactly this measurement (*"measure whether the path set is reachable from what the
  // attempt holds, and say so plainly if it is not"*), and the answer is the store's own record: **`JournalOp`'s
  // `before` is a non-`Option` `BaseState`** (`src/records.rs`), so the crossing carries it unconditionally, and a
  // write's `before` is `state_from_captured` — **`Store::absent_state()` where nothing was captured, a
  // `present: true` value everywhere else** (`src/store.rs`). **SO THE MEMBER IS NEVER MISSING: the first write's
  // `before` is `present: false` and its union is the written value's path set exactly — not a throw and not an
  // empty set.** The drive reads the op at EVERY evaluation the pass makes and prints the shape it saw.
  const fStore = make();
  const fSeen = [];
  const fAsks = [];
  const fBody = (id) => (context) => {
    if (context.attempt !== null) {
      fAsks.push(id);
      const op = context.op;
      fSeen.push({
        kind: op === null || typeof op !== 'object' ? '<no op>' : op.kind,
        hasBefore: op !== null && typeof op === 'object' && Object.hasOwn(op, 'before'),
        beforeIsObject: op !== null && typeof op === 'object' && op.before !== null && typeof op.before === 'object',
        beforePresent: op !== null && typeof op === 'object' && op.before !== null && typeof op.before === 'object'
          ? op.before.present : '<none>',
        beforePresentIsBoolean: op !== null && typeof op === 'object' && op.before !== null && typeof op.before === 'object'
          && typeof op.before.present === 'boolean',
        hasBeforeValue: op !== null && typeof op === 'object' && op.before !== null && typeof op.before === 'object'
          && Object.hasOwn(op.before, 'value'),
        valueType: op !== null && typeof op === 'object' && op.before !== null && typeof op.before === 'object'
          ? typeof op.before.value : '<none>',
      });
    }
    return true;
  };
  // **A FIRST WRITE AT `['f']` — NOTHING STOOD THERE** — whose value is `{g:{q:1}}`, with a pair at the written
  // path `['f','g']`, at the nested path `['f','g','q']` and at `['f','h']`, which neither state carries.
  const fSeeded = [
    [['f', 'g'], 'written-path'],
    [['f', 'g', 'q'], 'written-nested-path'],
    [['f', 'h'], 'neither-state-carries-it'],
  ].map(([address, id]) => ({ address, id, registered: attempt(() => fStore.addConstraint({ address, id }, fBody(id))) }));
  const fRecord = attempt(() => kernel.commit(fStore, ['f'], 'mem', { g: { q: 1 } }));
  const fRun = fRecord.ok ? attempt(() => kernel.runAttempt(fStore, fRecord.value)) : null;
  const fSet = fRecord.ok ? touchedAddresses(fRecord.value.op) : [];
  for (const { address, id } of fSeeded) {
    P(`X7 · first write ${JSON.stringify(address)}`, fAsks.includes(id) ? 'ASKED' : 'NOT ASKED');
  }
  P('X7 · first write · what `op.before` IS where nothing stood', fRecord.ok
    ? { present: fRecord.value.op.before.present, hasValue: Object.hasOwn(fRecord.value.op.before, 'value'),
      valueType: typeof fRecord.value.op.before.value }
    : '<no record>');
  P('X7 · first write · the touched set the union materialises (`touchedAddresses(op)`)', fSet);
  P('X7 · first write · `op.before` AS SEEN AT EVERY EVALUATION THE PASS MADE (one row per ask)', fSeen);
  A('DW-13.6', '`strata/decisions.md` · `D-66` (*"measure whether the path set is reachable from what the attempt holds, and say so plainly if it is not"*) — read with `JournalOp`\'s `before: BaseState` (`src/records.rs`), `Store::absent_state()` (`src/store.rs`) and `frame.mjs`\'s `decodeJournalOp`',
    '`op.before` IS PRESENT ON EVERY WRITE THE PASS EVALUATES — an object carrying a boolean `present` and an own `value` — and THE FIRST WRITE\'S `before` IS `present: false`, so its union is the written value\'s path set EXACTLY (`[\'f\',\'g\']` and `[\'f\',\'g\',\'q\']` asked, `[\'f\',\'h\']` not) and no arm throws',
    fSeeded.every((one) => one.registered.ok === true)
      && fRecord.ok === true && fRun !== null && fRun.ok === true && fRun.value.outcome === 'passed'
      && fRecord.value.op.before.present === false
      && fSeen.length === 2
      && fSeen.every((one) => one.hasBefore === true && one.beforeIsObject === true
        && one.beforePresentIsBoolean === true && one.hasBeforeValue === true)
      && fSeen.every((one) => one.beforePresent === false)
      && keyOfAddr(fSet) === keyOfAddr([['f', 'g'], ['f', 'g', 'q']])
      && keyOfAddr(fAsks) === keyOfAddr(['written-path', 'written-nested-path'])
      && fAsks.includes('neither-state-carries-it') === false,
    `before ${fRecord.ok ? JSON.stringify({ present: fRecord.value.op.before.present }) : '<no record>'} · `
      + `set ${JSON.stringify(fSet)} · asks ${JSON.stringify(fAsks)} · `
      + `before-shape ${fSeen.length === 0 ? '<the pass made no evaluation>' : JSON.stringify(fSeen[0])} · `
      + `run ${fRun === null ? '<not reached>' : (fRun.ok ? fRun.value.outcome : statusOf(fRun.caught))}`);

  // **A REPLACING WRITE'S `before` IS THE STATE IT REPLACED, SEEN THROUGH THE SAME PASS — THE OTHER HALF OF THE
  // MEASUREMENT, ON THE SAME RECORD `DW-13.5` DRIVES**: the op the pass evaluated carries `present: true` and the
  // replaced tree. It is printed here and not asserted twice: `DW-13.5`'s assertion is the asked set, and this line
  // is what the set was computed from.
  if (gRecord.ok) {
    P('X7 · replacing write · `op.before` where something DID stand', {
      present: gRecord.value.op.before.present,
      carried: gRecord.value.op.before.value,
    });
  }
  console.log('');
  console.log('        THE SENTENCE TO CARRY AWAY (`D-66`): A PAIR IS ASKED WHEN THE ACT CHANGES THE VALUE AT ITS');
  console.log('        ADDRESS — the ancestors because a prefix read CONTAINS its subtree (`D-56`), and the');
  console.log('        descendants THE ACT TOUCHED because a node it created or destroyed has a changed value. A');
  console.log('        write touches the paths of the value it WROTE and of the value it REPLACED — a path that');
  console.log('        disappears changed as surely as a path that appears — and a delete the whole subtree it removed.');
  console.log('        A descendant neither value touched is NOT asked, and the set is still one snapshot, frozen at');
  console.log('        pass start, in one registration order.');
}


// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (W14) `D-67` + `D-69` — THE STORE'S ANSWER IS THE ONLY ANSWER: the listener at a touched descendant, the
// per-tier residual, the pass as a filter, and `pending`'s composition
//
// **THE TWO RULINGS** (`strata/decisions.md`, 2026-10-28):
//   · `D-67`, verbatim: *"Does the listener get fired when the value is purged by a higher-persistence write that
//     doesn't include it? Because that's the actual problem, not whether the before/after displays by tier"* —
//     **measured NO**, because `triggered_for` filtered by `is_prefix` while the PASS had been widened to the
//     touched descendants (`D-66`): *"A CONSTRAINT AT A TOUCHED DESCENDANT IS ASKED; A LISTENER AT THE SAME
//     ADDRESS IS NEVER TOLD."*
//   · `D-69`, verbatim: *"It doesn't need to mint an inert listener body, it already should require a constraint
//     function with a handle"* — **the registration is a HANDLE AND A BODY, and a pair has both** (`id`, `D-29`;
//     `constraint`, `D-26`), **so `K-1` hands the store what the pair already has and the pass becomes a FILTER
//     over `triggered`.**
// **THE ONE PREDICATE NOW LIVES WHERE THE VERSIONS DO** (`src/store.rs`'s `registration_triggered` over
// `touched_below`): *the registration's address is a PREFIX of the act's, OR the act TOUCHED it*, and *touched*
// counts **the paths the written value contains AND the whole subtree of every version the act purged**.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W14 · `D-67`/`D-69` · THE STORE\'S ANSWER IS THE ONLY ANSWER ─────────────────────');
{
  // ── DW-14.1 · ★ THE `D-67` ARM: A LISTENER AT A TOUCHED DESCENDANT FIRES ─────────────────────────
  // The listener stands at `['a','b','c']` and the act is at `['a','b']`, so its address is NOT a prefix of the
  // act's — **it fires because the write TOUCHED it (`D-66`): `['a','b','c']` stands in the value the write
  // installed.** Before 2026-10-29 this invocation count was `0`.
  const dStore = make();
  dStore.write(['a'], 'mem', { b: { c: 'old' } });
  const dFired = [];
  const dHandle = dStore.listen('deep-listener', [['a', 'b', 'c']]);
  dStore.register(dHandle, (address) => { dFired.push(address); });
  const dRecord = attempt(() => dStore.write(['a', 'b'], 'mem', { c: 'new' }));
  P('D-67 · the listener at [a,b,c], invoked how many times', dFired.length);
  P('D-67 · the ONE argument it was handed (the TRIGGERING address)', dFired[0]);
  P('D-67 · the write\'s `triggered` list', dRecord.ok ? dRecord.value.triggered : String(dRecord.caught));
  A('DW-14.1', '`strata/decisions.md` · `D-67` (the ruling, verbatim: *"Does the listener get fired when the value is purged by a higher-persistence write that doesn\'t include it? Because that\'s the actual problem"*) read with `D-66`\'s criterion (*"a pair is asked when the act changes the value at the pair\'s address"*) and `src/store.rs`\'s `registration_triggered`',
    '★ A LISTENER AT A TOUCHED DESCENDANT FIRES: the listener bound at `[a,b,c]` runs EXACTLY ONCE for a write at `[a,b]` that writes `c`, and receives the TRIGGERING address `[a,b]` — its own address is NOT a prefix of the act\'s, so the touched arm is the only one that can reach it',
    dRecord.ok && dFired.length === 1
      && keyOfAddr(dFired[0]) === keyOfAddr(['a', 'b'])
      && dRecord.value.triggered.some((one) => one.handle === 'deep-listener'
        && keyOfAddr(one.address) === keyOfAddr(['a', 'b', 'c'])),
    `invocations ${dFired.length} · argument ${JSON.stringify(dFired[0])} · triggered ${dRecord.ok ? JSON.stringify(dRecord.value.triggered) : String(dRecord.caught)}`);

  // ── DW-14.2 · ★ THE PER-TIER RESIDUAL: A HIGHER-PERSISTENCE WRITE THAT PURGES A VALUE ──────────
  // **`D-67`'s OWN QUESTION, DRIVEN.** `['a','b']` stands at TWO tiers at once — a `file` version carrying `{f:1}`
  // and a `mem` shadow carrying `{m:2}` — and the act is a write at `[a,b]` at the `file` tier carrying `{n:3}`.
  // **IT PURGES BOTH**, and with them `['a','b','f']` and `['a','b','m']`. A listener AND a constraint stand at
  // `['a','b','f']`; a control constraint stands at `['a','b','z']`, which neither value names.
  const wDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sr-w14-'));
  try {
    const wStore = storeCreate({ filePath: path.join(wDir, 'state.json'), journalLength: 256, listeners: [] });
    wStore.write(['a'], 'file', {});
    wStore.write(['a', 'b'], 'file', { f: 1 });
    wStore.write(['a', 'b'], 'mem', { m: 2 });
    P('D-66 residual · the versions standing at [a,b] before the act',
      wStore.read(['a', 'b']));
    P('D-66 residual · the same node read at each tier',
      { file: attempt(() => wStore.read(['a', 'b'], 'file')).ok, mem: attempt(() => wStore.read(['a', 'b'], 'mem')).ok });
    const wFired = [];
    const wHandle = wStore.listen('at-f-listener', [['a', 'b', 'f']]);
    wStore.register(wHandle, (address) => { wFired.push(address); });
    const wAsks = [];
    const wBody = (id) => (context) => {
      if (context.attempt !== null) wAsks.push(id);
      return true;
    };
    const wPair = attempt(() => wStore.addConstraint({ address: [['a', 'b', 'f']], id: 'at-f-pair' }, wBody('at-f-pair')));
    const wControl = attempt(() => wStore.addConstraint({ address: [['a', 'b', 'z']], id: 'at-z-pair' }, wBody('at-z-pair')));
    const wRecord = attempt(() => wStore.write(['a', 'b'], 'file', { n: 3 }));
    // **THE JS PROJECTION, PRINTED BESIDE THE STORE'S ANSWER** — `touchedAddresses` reads the act's own
    // `before`/`after` VALUES, and this write's `before` collapses the node's TWO versions into ONE array of two
    // values (§6.2's `BaseState`), **so the paths the purge removed are not nameable from it**. That gap IS the
    // residual `D-66` left open and `D-67` closes by computing the set where the versions live.
    const wProjected = wRecord.ok ? touchedAddresses(wRecord.value.op) : [];
    P('D-66 residual · the JS projection `touchedAddresses(op)`, printed as the crossing answers it', wProjected);
    P('D-66 residual · the store\'s `triggered` list', wRecord.ok ? wRecord.value.triggered : String(wRecord.caught));
    P('D-66 residual · the listener\'s invocations', wFired);
    P('D-66 residual · the pass\'s asks', wAsks);
    A('DW-14.2', '`strata/decisions.md` · `D-67` (*"the store computes `touched`, because it alone knows the versions it purged"*) read with `D-66`\'s criterion and `src/store.rs`\'s `touched_below` (`Captured::under` names the enclosing version, so a PURGED version\'s whole subtree is touched at the tier the act actually took)',
      '★ THE PER-TIER RESIDUAL IS CLOSED: a `file`-tier write at `[a,b]` that PURGES the shadow there fires the listener bound at `[a,b,f]` (`1` invocation) and ASKS the constraint standing at `[a,b,f]` — the node both of them bind was removed — while the control at `[a,b,z]`, which neither value names, is asked NOTHING and is not in the trigger set; and the JS projection of the same act NAMES NEITHER, which is the residual the store\'s answer closes',
      wPair.ok && wControl.ok && wRecord.ok
        && wFired.length === 1
        && wAsks.includes('at-f-pair') && wAsks.includes('at-z-pair') === false
        && wRecord.value.triggered.some((one) => one.handle === 'at-f-listener')
        && wRecord.value.triggered.some((one) => one.handle === 'at-f-pair')
        && wRecord.value.triggered.some((one) => one.handle === 'at-z-pair') === false
        && wProjected.some((one) => keyOfAddr(one) === keyOfAddr(['a', 'b', 'f'])) === false,
      `invocations ${wFired.length} · asks ${JSON.stringify(wAsks)} · projected ${JSON.stringify(wProjected)} · `
        + `triggered ${wRecord.ok ? JSON.stringify(wRecord.value.triggered.map((one) => one.handle)) : String(wRecord.caught)} · `
        + `pairs ${JSON.stringify([wPair.ok, wControl.ok])}`);
  } finally {
    try { fs.rmSync(wDir, { recursive: true, force: true }); } catch { /* the drive's own scratch */ }
  }

  // ── DW-14.3 · THE PASS IS A FILTER: ONE `triggered` LIST CARRYING BOTH KINDS ─────────────────────
  // **`D-69`: *"an element whose handle is a constraint's `id` is asked; a listener's is delivered."*** The drive
  // stands a constraint at `['a','b','c']` and a listener at `['a']` — **one list, two kinds** — and reads what
  // each of them receives: the constraint the five-member `AttemptContext`, the listener the triggering address.
  // **AND THE CONSTRAINT IS NOT DELIVERED**: its body runs ONCE, asked by the pass, and never a second time with
  // the address as its argument — which is what the registration's `kind` member is for.
  const fStore = make();
  fStore.write(['a'], 'mem', { b: { c: 1 } });
  const fCalls = [];
  const fPair = attempt(() => fStore.addConstraint({ address: [['a', 'b', 'c']], id: 'the-constraint' }, (context) => {
    if (context.attempt !== null) {
      fCalls.push({ kind: 'constraint', received: keysOf(context), address: context.address.slice() });
    }
    return true;
  }));
  const fListener = fStore.listen('the-listener', [['a']]);
  fStore.register(fListener, (address) => { fCalls.push({ kind: 'listener', received: address }); });
  const fRecord = attempt(() => fStore.write(['a', 'b'], 'mem', { c: 2 }));
  P('DW-14.3 · ONE `triggered` list carrying BOTH kinds', fRecord.ok ? fRecord.value.triggered : String(fRecord.caught));
  P('DW-14.3 · what each kind RECEIVED, in the order it ran', fCalls);
  // **AND THE KIND IS WHAT KEEPS A PAIR'S BODY OUT OF THE DELIVERY — THE REACHABLE ARM.** A registration whose
  // own constraint REFUSED it (`ConstraintRefusedAtRegistration`, state 2 of `§7.3` (b)) leaves **NO row in the
  // kernel's registry and its store-side entry standing** — the declared `(D-vi)` state, where the pair's two
  // standings are two facts — so **the store's `triggered` names that handle and the pass asks NOTHING for it**:
  // the handle therefore stays in `pending` and reaches the terminal arm's delivery. **WITHOUT THE KIND THE
  // REFUSED CONSTRAINT'S OWN BODY WOULD BE INVOKED THERE, WITH THE TRIGGERING ADDRESS AS ITS ONE ARGUMENT** — a
  // body asked by a pass being delivered as if it were a listener.
  const rStore = make();
  rStore.write(['a'], 'mem', { b: { c: 1 } });
  const rCalls = [];
  const rRefused = attempt(() => rStore.addConstraint({ address: [['a', 'b', 'c']], id: 'refused-pair' }, () => {
    rCalls.push('the refused body ran');
    return { message: 'no' };
  }));
  const rStatus = rRefused.ok === false && rRefused.caught !== null && typeof rRefused.caught === 'object'
    ? rRefused.caught.status
    : '<admitted>';
  // **AND THE RESIDUE IS READ AT BOTH OF ITS INSTANTS** (`A112`: the whole set at `K-2`, the checked-off residue
  // after the pass): the refused handle is in the member at BOTH, because the pass holds no row to ask.
  const rRecord = attempt(() => kernel.commit(rStore, ['a', 'b'], 'mem', { c: 2 }));
  const rAtK2 = rRecord.ok ? rRecord.value.pending.map((one) => one.handle) : [];
  const rRun = rRecord.ok ? attempt(() => kernel.runAttempt(rStore, rRecord.value)) : null;
  const rAfter = rRecord.ok ? rRecord.value.pending.map((one) => one.handle) : [];
  P('DW-14.3 · a REFUSED registration: the status, the carried read, the later write\'s `triggered`, and `pending` at both instants', {
    status: rStatus,
    carried: rStore.constraints().length,
    triggered: rRecord.ok ? rRecord.value.triggered.map((one) => one.handle) : String(rRecord.caught),
    pendingAtK2: rAtK2,
    pendingAfter: rAfter,
    delivered: rCalls.length,
  });
  A('DW-14.3', '`strata/decisions.md` · `D-69` (*"the pass becomes a FILTER over `triggered` rather than a walk over `kernel.pairs` — an element whose handle is a constraint\'s `id` is asked; a listener\'s is delivered"*) read with `kernel-surface.md §2.3` item 1 (the five-member `AttemptContext`) and `PAR-JS-12` (a listener\'s ONE argument is the triggering address)',
    'THE PASS IS A FILTER AND THE TWO KINDS PART COMPANY THERE: the write\'s `triggered` is ONE list carrying the listener\'s handle AND the constraint\'s `id`; the constraint is ASKED — handed the `AttemptContext` — and the listener is DELIVERED the triggering address, ONCE each, in that order; and a REFUSED registration\'s residual handle, which the store still names and no pass asks, is DELIVERED NOTHING — the body\'s ONE run is the registration\'s own evaluation and never a listener\'s invocation',
    fPair.ok && fRecord.ok
      && fRecord.value.triggered.length === 2
      && fRecord.value.triggered.some((one) => one.handle === 'the-listener')
      && fRecord.value.triggered.some((one) => one.handle === 'the-constraint')
      && fCalls.length === 2
      && fCalls[0].kind === 'constraint' && fCalls[0].received.includes('address')
      && fCalls[0].received.includes('attempt') && fCalls[0].received.includes('op')
      && fCalls[1].kind === 'listener' && keyOfAddr(fCalls[1].received) === keyOfAddr(['a', 'b'])
      && rRefused.ok === false && rStatus === 'ConstraintRefusedAtRegistration'
      && rRecord.ok === true && rRecord.value.triggered.some((one) => one.handle === 'refused-pair')
      && rAtK2.includes('refused-pair') && rAfter.includes('refused-pair')
      && rRun !== null && rRun.ok === true && rRun.value.outcome === 'passed'
      && rCalls.length === 1,
    `triggered ${fRecord.ok ? JSON.stringify(fRecord.value.triggered.map((one) => one.handle)) : String(fRecord.caught)} · `
      + `calls ${JSON.stringify(fCalls)} · refused ${rStatus} · pending ${JSON.stringify([rAtK2, rAfter])} · `
      + `its body delivered ${rCalls.length} time(s)`);

  // ── DW-14.4 · `pending`'S COMPOSITION, BEFORE → AFTER ────────────────────────────────────────────
  // **`D-56`'S `pending` IS *"the list of handles the pass did not evaluate"*** (`kernel-surface.md §2.1` item 2;
  // `A112`: *"`pending` IS THE WHOLE RETURNED SET … AND CHECKS EACH OFF AS IT PASSES"*). **THE STORE NOW SEES
  // CONSTRAINTS, SO THE SET IT RETURNS IS WIDER AND THE MEMBER'S COMPOSITION MOVES WITH IT** — measured here
  // rather than assumed: at `K-2` the member carries the store's WHOLE set, and after the pass every element the
  // pass asked is GONE. **The `before` column is the prefix-only subset, computed by the DRIVE as an instrument
  // and labelled as one**, since it is the set the store returned before 2026-10-29.
  const pStore = make();
  pStore.write(['p'], 'mem', { q: { r: 1 } });
  const pCalls = [];
  const pPair = attempt(() => pStore.addConstraint({ address: [['p', 'q', 'r']], id: 'touched-pair' }, (context) => {
    if (context.attempt !== null) pCalls.push(context.address.slice());
    return true;
  }));
  const pListener = pStore.listen('ancestor-listener', [['p']]);
  pStore.register(pListener, () => {});
  const pRecord = attempt(() => kernel.commit(pStore, ['p', 'q'], 'mem', { r: 2 }));
  const pAtK2 = pRecord.ok ? pRecord.value.pending.slice() : [];
  const isPrefixOfAct = (address) => Array.isArray(address)
    && address.length <= 2
    && address[0] === 'p' && (address.length === 1 || address[1] === 'q');
  const pPrefixOnly = pAtK2.filter((one) => isPrefixOfAct(one.address));
  const pRun = pRecord.ok ? attempt(() => kernel.runAttempt(pStore, pRecord.value)) : null;
  const pAfter = pRecord.ok ? pRecord.value.pending.slice() : [];
  P('pending · AT K-2, the store\'s WHOLE returned set', pAtK2.map((one) => one.handle));
  P('pending · AT K-2, the PREFIX-ONLY subset (the composition before 2026-10-29, an instrument)', pPrefixOnly.map((one) => one.handle));
  P('pending · AFTER the pass (every asked element checked off)', pAfter.map((one) => one.handle));
  P('pending · the pass\'s asks', pCalls);
  A('DW-14.4', '`kernel-surface.md §2.1` item 2 read with `A112` (*"`pending` IS THE WHOLE RETURNED SET … AND CHECKS EACH OFF AS IT PASSES"*) and `D-69`\'s single predicate; the measured change is that the store now NAMES a constraint standing at a TOUCHED DESCENDANT, so the member carries it until the pass asks it',
    '`pending`\'S COMPOSITION MOVES AT `K-2` AND IS UNMOVED AFTER THE PASS: the whole returned set now carries the TOUCHED-DESCENDANT constraint\'s `id` beside the ancestor listener\'s handle (2 members where the prefix-only composition had 1), and after the pass the asked element is CHECKED OFF and only the listener\'s handle stands — so the DELIVERED residue is the same one member it always was',
    pPair.ok && pRecord.ok && pRun !== null && pRun.ok === true
      && pAtK2.length === 2 && pPrefixOnly.length === 1
      && pPrefixOnly[0].handle === 'ancestor-listener'
      && pAtK2.some((one) => one.handle === 'touched-pair')
      && pAfter.length === 1 && pAfter[0].handle === 'ancestor-listener'
      && pCalls.length === 1,
    `at-K2 ${JSON.stringify(pAtK2.map((one) => one.handle))} · prefix-only ${JSON.stringify(pPrefixOnly.map((one) => one.handle))} · `
      + `after ${JSON.stringify(pAfter.map((one) => one.handle))} · asks ${JSON.stringify(pCalls)} · `
      + `run ${pRun === null ? '<not reached>' : (pRun.ok ? pRun.value.outcome : statusOf(pRun.caught))}`);

  // ── DW-14.5 · THE CENSUSES `D-69`'s REGISTRATION LEAVES UNMOVED ──────────────────────────────────
  // **A REGISTRATION IS NOT A KERNEL ITEM** (`D-57`: *"the kernel's six items are the WRITE's surface, not the
  // constraint machinery's whole surface"*), and **`K-1` handing the store a body mints no member on the
  // product**: the channel it reaches is a `Symbol.for` key, invisible to `Object.getOwnPropertyNames`
  // (`A117` (D6)). Both figures are read LIVE here, not quoted.
  const censusStore = make();
  const censusRegistered = attempt(() => censusStore.addConstraint({ address: [['c']], id: 'census-pair' }, () => true));
  const members = ownNamesOf(censusStore);
  const kernelItems = Object.keys(kernel).sort();
  P('census · the product\'s own members, after a registration', members);
  P('census · the kernel barrel\'s own items, after a registration', kernelItems);
  A('DW-14.5', '`surface.md §2.4` item 9 (f)\'s clause (`10 + 1 + 1 + 2 = 14`), `docs/specs/storeroom-js/surface.md §1`\'s kernel extent (`commit · log · register · remove · report · runAttempt`) and `D-57` (no kernel item is owed to the constraint machinery)',
    '`K-1` REGISTERING THE PAIR WITH THE STORE MINTS NOTHING: the product still carries EXACTLY its fourteen own members and the kernel barrel EXACTLY its six items, so no seventh kernel item and no fifteenth product member came with the registration',
    censusRegistered.ok === true
      && keyOfAddr(members) === keyOfAddr(['addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete',
        'listen', 'read', 'readLiteral', 'register', 'removeConstraint', 'removeListener', 'rollback', 'unlisten',
        'write'])
      && keyOfAddr(kernelItems) === keyOfAddr(['commit', 'log', 'register', 'remove', 'report', 'runAttempt']),
    `members ${members.length} ${JSON.stringify(members)} · kernel items ${kernelItems.length} ${JSON.stringify(kernelItems)}`);

  console.log('');
  console.log('        THE SENTENCE TO CARRY AWAY (`D-69`): THE REGISTRATION IS A HANDLE AND A BODY, AND A PAIR HAS');
  console.log('        BOTH — its `id` (`D-29`) and its `constraint` (`D-26`). So `K-1` hands the store what it');
  console.log('        already has, `triggered` names the pair beside the listeners, and the pass FILTERS that one');
  console.log('        list: an element whose handle is a constraint\'s `id` is ASKED, a listener\'s is DELIVERED.');
  console.log('        The reach is the STORE\'s — the registration\'s address is a prefix of the act\'s OR the act');
  console.log('        TOUCHED it — and it is computed where the versions live, which is what makes a purge');
  console.log('        visible to a listener and to a constraint alike.');
}


// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// (W15) `D-70` — A DERIVED VALUE IS NOT AN ADDRESS, AND EACH KIND HAS ITS JOB
//
// **THE RULINGS** (`strata/decisions.md` · `D-70`, the architect, verbatim):
//
//     A constraint/listener that cares about a derived value like the vec index should listen to the vec, not the
//     contained node
//     Functions that automatically produce changes in the stored data should be written as constraint/repair, not
//     as listeners, because constraint/repair has loop guards while listeners don't
//     The use case for listeners is for updating external code with new data, ex. changing the rendered
//     information on screen
//
// **WHAT THE CELLS DRIVE, ON ONE `VEC`.** `store.write(['v'], 'mem', [{b:1},{b:2},{b:3}])` MINTS the `VEC`
// (`surface.md §4.2`; `write-and-read.md §3.4`), and `store.delete(['v',0])` REMOVES ONE ANCHOR — so the survivors
// are RENUMBERED in container order from `0` (`write-and-read.md §4.4`'s renumbering clause; the guide's `§6.4`
// closing sentence): `{b:2}` moves `['v',1] → ['v',0]` and `{b:3}` moves `['v',2] → ['v',1]`. So an address whose last
// segment is an index names a POSITION and not a node, and the position it named before the act names a different
// node after it.
//
// **THE THREE ARMS, EACH ITS OWN CELL.**
//   (DW-15.1) **A LISTENER AT THE CONTAINER `['v']` FIRES for the delete at `['v',0]`**, is handed the ACT's address
//             `['v',0]`, and **the collection it reads inside its body is the RENUMBERED one** — the value it cares
//             about, read at the address that is not derived (`D-50`; `D-70` item 1).
//   (DW-15.2) **A LISTENER AT THE INDEX `['v',1]` DOES NOT FIRE**, and its handle stands nowhere in the record's
//             `triggered` — **asserted as CORRECT and not as a defect**: nothing was written at that address, the
//             act's op names `['v',0]`, and the store owes a firing for the address it wrote, not for a renumbering.
//   (DW-15.3) **A CONSTRAINT AT `['v']` IS ASKED for the same delete** — once by the pass, handed the act's
//             `address`/`value` — and **the collection it JUDGES is the one its body reads at `['v']`** (`D-50`;
//             `D-70` item 2: the kind that changes data is the constraint, because the loop guards live in the pass).
//
// **EVERY CELL BELOW BITES UNDER A `/tmp` REVERT**, one line each, and the revert is the one `D-70` names — THE
// CONTAINER REGISTRATION REPLACED BY AN INDEX ONE (`['v']` → `['v',1]`), and its mirror for the second:
//   · `DW-15.1` — `listen('v-container-listener', [['v']])` → `[['v',1]]` → RED: `0` invocations, no container read;
//   · `DW-15.2` — `listen('v-index-listener', [['v',1]])` → `[['v']]` → RED: the `0` becomes a `1`;
//   · `DW-15.3` — `addConstraint({ address: ['v'], … })` → `{ address: ['v',1], … }` → RED: the pass asks it `0` times.
// **AND `D-31`'s OWN RULE IS RESPECTED BY NONE OF THEM CHANGING**: a listener that DOES fire and a constraint that
// IS asked are asserted in the same drive, so a machine that fires nothing cannot be read as this section's green.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('\n── W15 · `D-70` · WHICH KIND, AND WHY AN INDEX IS NOT AN ADDRESS ─────────────────────');
{
  const vStore = make();
  // **THE `VEC` THE RULING'S RESIDUAL NAMES**, three anchors, each carrying a `b`.
  vStore.write(['v'], 'mem', [{ b: 1 }, { b: 2 }, { b: 3 }]);
  const vBefore = vStore.read(['v']);
  // **THE CONTAINER LISTENER AND THE INDEX LISTENER STAND AT THE SAME INSTANT**, so the two cells below measure the
  // SAME act: one registration at `['v']`, one at the derived `['v',1]`.
  const vHeard = [];
  const vHandle = vStore.listen('v-container-listener', [['v']]);
  vStore.register(vHandle, (address) => { vHeard.push({ address, read: vStore.read(['v']) }); });
  const vIndexHeard = [];
  const vIndexHandle = vStore.listen('v-index-listener', [['v', 1]]);
  vStore.register(vIndexHandle, (address) => { vIndexHeard.push({ address, read: vStore.read(['v']) }); });
  // **AND THE CONSTRAINT AT THE CONTAINER**, whose body takes the ask it is given and reads the collection it judges
  // (`D-50`): the registration's own evaluation is the ask with `attempt` `null`, the pass's is the one carrying an
  // attempt — printed apart, because they hand different things (`§7.6`; `kernel-surface.md §2.3` item 1).
  const vAsks = [];
  const vRegistered = attempt(() => vStore.addConstraint({ address: ['v'], id: 'v-container-pair' }, (context) => {
    vAsks.push({
      duringAttempt: context.attempt !== null,
      address: context.address,
      value: context.value,
      kind: context.op === null || context.op === undefined ? null : context.op.kind,
      read: vStore.read(['v']),
    });
    return true;
  }));
  const vBeforeIndex = attempt(() => vStore.read(['v', 1]));
  const vRecord = attempt(() => vStore.delete(['v', 0]));
  const vAfter = attempt(() => vStore.read(['v']));
  const vAfterIndex = attempt(() => vStore.read(['v', 1]));
  const vPassAsks = vAsks.filter((one) => one.duringAttempt === true);
  const vTriggers = vRecord.ok ? vRecord.value.triggered : [];

  P('DW-15.1 · `[v]` before the delete', vBefore);
  P('DW-15.1 · the container listener at `[v]`: invocations and what it read, per invocation', vHeard);
  P('DW-15.1 · the delete record\'s `triggered`', vTriggers);
  P('DW-15.1 · `[v]` AFTER the delete (the renumbered collection)', vAfter.ok ? vAfter.value : String(vAfter.caught));
  A('DW-15.1', '`strata/decisions.md` · `D-70` (*"A constraint/listener that cares about a derived value like the vec index should listen to the vec, not the contained node"*) read with `D-49`\'s fire rule (an ancestor registration hears a descendant delete) and `D-50` (a body that cares about a location reads it)',
    '★ THE CONTAINER PATTERN WORKS: the listener bound at `[v]` fires EXACTLY ONCE for a delete at `[v,0]`, is handed the act\'s address `[v,0]`, and the collection it reads inside its body is the RENUMBERED one — `[{b:2},{b:3}]`, where the anchor that was `[v,1]` now stands at index `0` — and the record\'s `triggered` names the handle at the address it was BOUND at, `[v]`',
    vHeard.length === 1
      && keyOfAddr(vHeard[0].address) === keyOfAddr(['v', 0])
      && vHeard[0].read.length === 2 && keyOfAddr(vHeard[0].read[0]) === keyOfAddr({ b: 2 })
      && vAfter.ok === true && keyOfAddr(vHeard[0].read) === keyOfAddr(vAfter.value)
      && vTriggers.some((one) => one.handle === 'v-container-listener'
        && keyOfAddr(one.address) === keyOfAddr(['v'])),
    `invocations ${vHeard.length} · heard ${JSON.stringify(vHeard)} · after ${vAfter.ok ? JSON.stringify(vAfter.value) : String(vAfter.caught)}`);

  // ── DW-15.2 · ★ THE INDEX LISTENER DOES NOT FIRE — AND THAT IS CORRECT, NOT A DEFECT ─────────────
  // **`D-70` ITEM 1'S OTHER HALF, ASSERTED AS THE RULING STATES IT**: *"a listener at `['v','1']` does not hear it —
  // correctly: `1` is a DERIVED value, a position inside a collection, and its meaning changes when a neighbour is
  // removed. A registration at a DERIVED address is a registration on a value the store never wrote … the
  // `triggered` list is right to be empty, because nothing at `['v','1']` was written."*
  // **AND WHAT THE ADDRESS NAMED BEFORE AND AFTER IS PRINTED**, because that is the reason: the node the index
  // registration named is NOT the node it names after the act, so a firing at that address would be a firing about a
  // different value — and the store, which writes addresses and not positions, owes none.
  P('DW-15.2 · the index listener at `[v,1]`: invocations', vIndexHeard.length);
  P('DW-15.2 · what `[v,1]` named BEFORE the act', vBeforeIndex.ok ? vBeforeIndex.value : String(vBeforeIndex.caught));
  P('DW-15.2 · what `[v,1]` names AFTER the act', vAfterIndex.ok ? vAfterIndex.value : String(vAfterIndex.caught));
  P('DW-15.2 · is the index handle in the record\'s `triggered`?', vTriggers.some((one) => one.handle === 'v-index-listener'));
  A('DW-15.2', '`strata/decisions.md` · `D-70` (the ruling, verbatim: *"a listener at `[\'v\',\'1\']` does not hear it — correctly … A registration at a DERIVED address is a registration on a value the store never wrote … the `triggered` list is right to be empty, because nothing at `[\'v\',\'1\']` was written"*)',
    '★ THE INDEX PATTERN DOES NOT WORK, AND THE CELL ASSERTS THAT AS **CORRECT**: the listener bound at the derived `[v,1]` is invoked `0` times for the delete at `[v,0]`, its handle stands NOWHERE in the record\'s `triggered`, and `[v,1]` names `{b:2}` before the act and `{b:3}` after it — the renumber moved a DIFFERENT node under the position it registered, which is why nothing was written at that address and why `0` is the right number',
    vIndexHeard.length === 0
      && vTriggers.some((one) => one.handle === 'v-index-listener') === false
      && vBeforeIndex.ok === true && keyOfAddr(vBeforeIndex.value) === keyOfAddr({ b: 2 })
      && vAfterIndex.ok === true && keyOfAddr(vAfterIndex.value) === keyOfAddr({ b: 3 })
      && vRecord.ok === true && vRecord.value.tiers.length > 0,
    `invocations ${vIndexHeard.length} · triggered ${JSON.stringify(vTriggers.map((one) => one.handle))} · `
      + `[v,1] before ${vBeforeIndex.ok ? JSON.stringify(vBeforeIndex.value) : String(vBeforeIndex.caught)} · `
      + `after ${vAfterIndex.ok ? JSON.stringify(vAfterIndex.value) : String(vAfterIndex.caught)}`);

  // ── DW-15.3 · ★ THE CONTAINER CONSTRAINT IS ASKED FOR THE SAME DELETE ───────────────────────────
  // **THE SECOND KIND AT THE CONTAINER, ON THE SAME ACT.** The pair stands at `['v']`, the act is the delete at
  // `['v',0]`, and **the pass ASKS it** — handing it THE ACT's `address` (`['v',0]`), `tier` and `value` (the value
  // the delete left AT THE ACT'S ADDRESS, which for this renumbering is the survivor that moved into index `0`,
  // `{b:2}`, and not the collection). **THE COLLECTION IT JUDGES IT READS** (`D-50`), which is what makes the
  // container the right address for BOTH kinds: a listener at `['v']` is delivered the act and reads; a constraint
  // at `['v']` is asked the act and reads.
  P('DW-15.3 · the pair\'s asks, in order (registration first, the pass\'s second)', vAsks);
  P('DW-15.3 · the pass\'s asks alone', vPassAsks);
  A('DW-15.3', '`strata/decisions.md` · `D-70` (the ruling, verbatim: *"Functions that automatically produce changes in the stored data should be written as constraint/repair, not as listeners, because constraint/repair has loop guards while listeners don\'t"*) read with `D-56` (a pair at an ancestor IS asked for the act below it), `D-69` (one `triggered` list carries both kinds) and `D-50` (a body that cares about a location reads it)',
    '★ THE CONTAINER CONSTRAINT IS ASKED FOR THE SAME DELETE: registered at `[v]`, it is asked EXACTLY ONCE by the pass — handed the act\'s `address` `[v,0]`, `tier` and `value` (the node the renumber left at index `0`, `{b:2}`) with the delete\'s own `op` — and the collection it JUDGES is the one its body reads at `[v]`, the renumbered `[{b:2},{b:3}]`; its `id` stands in the same `triggered` list as the two listener handles, beside them',
    vRegistered.ok === true
      && vRecord.ok === true
      && vPassAsks.length === 1
      && keyOfAddr(vPassAsks[0].address) === keyOfAddr(['v', 0])
      && vPassAsks[0].kind === 'delete'
      && keyOfAddr(vPassAsks[0].value) === keyOfAddr({ b: 2 })
      && vPassAsks[0].read.length === 2 && keyOfAddr(vPassAsks[0].read[0]) === keyOfAddr({ b: 2 })
      && vTriggers.some((one) => one.handle === 'v-container-pair' && keyOfAddr(one.address) === keyOfAddr(['v'])),
    `registered ${vRegistered.ok} · pass asks ${vPassAsks.length} ${JSON.stringify(vPassAsks)} · `
      + `triggered ${JSON.stringify(vTriggers.map((one) => one.handle))} · `
      + `registration ask ${JSON.stringify(vAsks.filter((one) => one.duringAttempt !== true))}`);

  console.log('');
  console.log('        THE SENTENCE TO CARRY AWAY (`D-70`): IF YOUR CALLBACK CHANGES THE STORE, IT IS A CONSTRAINT OR A');
  console.log('        REPAIR — the pass runs it, judges it, and its loop guards (the restart budget, the applied-repair');
  console.log('        marker, the per-op floor) bound it. IF IT TELLS THE WORLD, IT IS A LISTENER — it runs after the');
  console.log('        constraints, opens its own commit when it writes, and NOTHING BOUNDS IT. And an INDEX IS A');
  console.log('        DERIVED VALUE, NOT AN ADDRESS: a registration at `[v,1]` names a position the store never wrote,');
  console.log('        so `delete([v,0])` renumbers the survivors and tells it NOTHING — correctly. Register at the');
  console.log('        CONTAINER `[v]` and read what you care about.');
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
