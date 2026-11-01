// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE CROSS-KIND CORRECTION'S OWN CELLS — `XK-1` … `XK-8`
//
// **WHAT THIS FILE IS.** The eight cells `docs/L1/cross-kind-handle-only.md` §5.3 declares the correction OWES,
// written to that declaration's drives and to nothing else, and named `XK-n` **so that no existing cell's name
// moves**. It is the L4 battery's half of the correction; §5.1's rewrites live in the files that already carried
// the withdrawn arm and §5.2's kept cells live where they stood.
//
// **THE RULING THESE CELLS ASSERT, VERBATIM** (`strata/decisions.md` · `D-98`, 2026-11-01; `ACTIVE`):
// *"Constraints and listeners can share the same address, but not handle"* — and, restated when the report's own
// premise was put to the architect: *"A constraint and a listener can share an address, as can multiple
// constraints/listeners. The restriction is that a listener and a constraint cannot have the same *handle*."*
// **So: (i) a pair and a listener MAY stand at ONE address; (ii) MULTIPLE constraints at one address and
// MULTIPLE listeners at one address are LAWFUL; (iii) the ONLY cross-kind restriction is a SHARED HANDLE,
// refused in both directions.** The route reading (`D-99`'s `ANSWERED` clause — *"Route reading — the kernel's act
// is its own"*) is what makes `XK-6`'s four kernel re-listings lawful at any number of addresses, and `D-100`
// (`1.7.0`, a MINOR) is why the four message texts may move at all.
//
// **THE INSTRUMENTS, AND NOTHING ELSE.** `storeCreate` from the package's declared ESM entry
// (`bindings/js/index.mjs`) and the instance's own declared members — `addConstraint`, `constraints`,
// `constraintOff`, `constraintOn`, `listen`, `register`, `write` — which is the route every consumer has. **The
// kernel is never reached and the addon is reached at ONE cell only**: `XK-7` drives the artefact's internal
// `errorMessage` because the correction's own delta is a sentence in it (§3.7), and that entry is the only
// observable for the generator's two new arms. **No `docs/**` path is opened at runtime**: every clause this
// file cites is a comment, and every expectation is a literal derived from the declaration (§D-17).
//
// **THE FOUR OBSERVABLES, EACH A DECLARED ONE.** A write answers the store's own three-member record and its
// `triggered` set is the store's `{handle, address}` list (`contract.md §2.4` item 1), so "the listener stands at
// the address" and "the pair is still registered" are read there; a pair's ask-count is the cell's own body
// counter, taken as a DELTA around the act so the registration instant's own evaluation cannot be mistaken for a
// landing (`contract.md §7.3` (b) state 1); `constraints()` is the read model's enumeration; and a refusal is the
// surface's one plain thrown object with `address`, `log`, `message`, `status`.
//
// **WHAT THIS FILE DOES NOT DRIVE, NAMED SO ITS ABSENCE IS A DECISION.**
//   1. **`B-1`/`B-2`'s message family** — the batch's shape-shaped clause and its double-quoted subject are `Q-3`
//      (`§7`), explicitly NOT this correction's: a cell asserting the current bytes would bless the defect and
//      one asserting the corrected bytes would red the tree before its owner acts. `§5.3`'s closing clause says
//      so in as many words.
//   2. **A CONSTRAINT BODY THAT CLAIMS ITS OWN PAIR'S HANDLE** as a cell — the re-entrancy probe has no subject
//      since the marker went (`D-99`'s `ANSWERED` clause, `§9.5`: *"there is no marker for a constraint body to
//      borrow"*). **A measurement this pass took at that state is PRINTED at `XK-8` rather than asserted**, and
//      it disagrees with one sentence of `§9.5`: see that cell's diagnostic.
//   3. **A NUMERIC BOUND ON ANY COUNT** — `D-98` names none, and every count here is the drive's own.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { ADDON_ARTEFACT, require_ } from './addon-surface-support.mjs';

// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE INSTRUMENTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────

/** A `mem` store at the two REQUIRED `cfg` keys (`surface.md §2.1`), with anything a cell seats at the
 *  construction supplied as `extra`. */
const make = (extra = {}) => storeCreate({ journalLength: 256, listeners: [], ...extra });

/** Run `fn`; answer the thrown value as a value. Every drive here is synchronous, so this is total — and it is
 *  used ONLY where the OUTCOME of an act is the cell's subject, never around an assertion. */
function capture(fn) {
  try {
    return { threw: false, value: fn() };
  } catch (thrown) {
    return { threw: true, thrown };
  }
}

/** The surface's ONE thrown form's member census, sorted (`surface.md §2.5` items 4 and 9; `index.d.ts`). */
const PLAIN_FORM = '["address","log","message","status"]';
const censusOf = (refusal) => JSON.stringify(Object.keys(refusal).sort());

/** A pair's or a listener's address, read as a SET and never as a sequence: `constraints()` answers an address
 *  per pair as an array of addresses, while `triggered`'s elements carry ONE address each (`contract.md §24`
 *  item 1; `DD-37`/`DD-22` — no order is declared over any returned list, so everything here is compared by
 *  set). */
const segmentAddresses = (address) => {
  const members = Array.isArray(address) && Array.isArray(address[0]) ? address : [address];
  return members.map((member) => member.join('/')).sort();
};

/** The handles a write's `triggered` set carries, sorted and de-duplicated — the store's own `{handle, address}`
 *  record is what a co-located pair and listener are observed in. */
const triggeredHandles = (record) => [...new Set(record.triggered.map((pair) => pair.handle))].sort();

/** The addresses the store's own `triggered` set carries UNDER ONE HANDLE, sorted — which is how "the listener
 *  stands at BOTH members of its set" is read without an order being asserted. */
const addressesUnder = (record, handle) => record.triggered
  .filter((pair) => pair.handle === handle)
  .map((pair) => pair.address.join('/'))
  .sort();

/** **A PASSING CONSTRAINT BODY THAT COUNTS ITS LANDINGS AND NOT ITS REGISTRATION.** `contract.md §7.3` (b)
 *  state 1 makes every registration evaluate its own constraint once, with `tier` and `op` spelled `null` — a
 *  context no landing carries together — so the counter skips that instant and a cell's ask-delta is the PASS's
 *  own. */
function countingPass(landings) {
  return function passingConstraint(context) {
    if (!(context !== null && typeof context === 'object' && context.tier === null && context.op === null)) {
      landings.push(context === null || typeof context !== 'object' ? null : context.address);
    }
    return true;
  };
}

/** **A BODY THAT PASSES EVERYWHERE** — at its registration and at every landing. The fixture every cell that
 *  needs a pair to STAND and to let a write through uses, so a witness write is never refused by the pair it is
 *  witnessing. */
const passing = () => true;

/** **A BODY THAT REFUSES AT REGISTRATION** — the arm `XK-6`'s fourth re-listing drives: a refusal raised by the
 *  registration's own evaluation is what wakes `restoreHeldPair` (`contract.md §2.3` item 4; `§4` item 2). */
const refusingAtRegistration = (context) => (
  context !== null && typeof context === 'object' && context.tier === null && context.op === null
    ? { message: 'this body refuses the state its own registration stands at' }
    : true
);

/** The three-address set `XK-6`/`XK-8` drive their `N = 3` arms at. **THREE TOP-LEVEL KEYS AND NOT A CHAIN**,
 *  deliberately: each address stands on its own, so the store rows a re-listing installs can be witnessed by one
 *  write per address with no container written first and no order asserted among them. */
const SET3 = [['xk-a'], ['xk-b'], ['xk-c']];

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `XK-1` · A LISTENER AND A PAIR AT ONE ADDRESS IS LAWFUL AT THE RUNTIME
// `D-98` clause (i) · `docs/L1/cross-kind-handle-only.md` §5.3's `XK-1` row · `D-22` (the answer)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('XK-1 · A PAIR AND A LISTENER AT ONE ADDRESS IS LAWFUL AT THE RUNTIME: the pair is armed first, then `listen` and `register` under the caller\'s own handle — BOTH ACTS RETURN, `triggered` carries the pair\'s `id` AND the listener\'s handle, and the listener is DELIVERED EXACTLY ONCE', (t) => {
  // **THE DRIVE IS §5.3's OWN, IN ITS OWN ORDER**: a pair at `['tabs']` ARMED FIRST, then `listen('app', …)` and
  // `register('app', fn)` at the same address, then ONE `write`. **This is the arm the `1.6.2` build refused**
  // (`research.md` §6's `K-1`: *"THROW K-1 listen('h',[['tabs']]) (different handles, one address) =>
  // AddressMalformed"*), and the arm the downstream app worked around; under `D-98` it is the ordinary shape.
  const store = make();
  const landings = [];
  const PAIR = { address: ['tabs'], id: 'tabs-must-stand' };
  const identity = store.addConstraint(PAIR, countingPass(landings));
  assert.equal(typeof identity, 'object',
    'PREMISE: the pair registers and answers its own opaque identity (compared, never read — `PAR-JS-25`)');
  assert.deepEqual(store.constraints().map((row) => ({ address: segmentAddresses(row.address), id: row.id })),
    [{ address: ['tabs'], id: 'tabs-must-stand' }],
    'and `constraints()` names it at the one address it was registered at');

  // ── (a) BOTH ACTS RETURN. ───────────────────────────────────────────────────────────────────────────────
  const listened = capture(() => store.listen('app', [['tabs']]));
  assert.equal(listened.threw, false,
    '**`listen` AT A PAIR\'S ADDRESS UNDER AN APP HANDLE IS LAWFUL** — it does not throw, because the only '
    + 'cross-kind restriction is a SHARED HANDLE and `app` is not the pair\'s `id` (`D-98` clauses (i) and (iii): '
    + '*"A constraint and a listener can share an address"*). It '
    + `${listened.threw ? 'THREW ' + JSON.stringify(String(listened.thrown.status)) : 'returned'}`);
  assert.equal(listened.value, 'app',
    'and it ANSWERS THE HANDLE IT WATCHES UNDER (`D-22`; `docs/L1/surface-deltas.md` §1.1): read '
    + JSON.stringify(listened.threw ? null : listened.value));
  let deliveries = 0;
  const registered = capture(() => store.register('app', () => { deliveries += 1; }));
  assert.equal(registered.threw, false,
    '**AND `register` UNDER THAT HANDLE IS LAWFUL TOO** — the register-side arm reads the same HANDLE and the '
    + 'pair\'s `id` is `tabs-must-stand` (`D-98` clause (iii); `B-5`\'s surviving condition). It '
    + `${registered.threw ? 'THREW ' + JSON.stringify(String(registered.thrown.status)) : 'returned'}`);
  assert.equal(registered.value, undefined,
    'and `register` answers `undefined`, its own declared answer (`surface.md §2.5` item 5 (g))');

  // ── (b) ONE WRITE, AND `triggered` CARRIES BOTH KINDS. ─────────────────────────────────────────────────
  const landingsBefore = landings.length;
  const written = capture(() => store.write(['tabs'], 'mem', 1));
  assert.equal(written.threw, false,
    'PREMISE: the write passes — the pair answers `true` and nothing refuses: '
    + `${written.threw ? JSON.stringify(String(written.thrown.status)) : 'returned'}`);
  assert.deepEqual(triggeredHandles(written.value), ['app', 'tabs-must-stand'],
    '**`triggered` CARRIES THE PAIR\'S `id` AND THE LISTENER\'S HANDLE** — ONE address, TWO kinds, both reached '
    + 'by the one act (`D-98` clause (i); `D-68`\'s one trigger set filtered by kind): read '
    + JSON.stringify(written.value.triggered));

  // ── (c) THE LISTENER IS DELIVERED EXACTLY ONCE AND THE PAIR ASKED EXACTLY ONCE. ──────────────────────────
  assert.equal(deliveries, 1,
    '**AND THE LISTENER IS DELIVERED EXACTLY ONCE** — one invocation per DISTINCT HANDLE (`surface.md §2.4` '
    + 'rule 1; `§2.7` item 2): the body ran ' + `${deliveries} time(s)`);
  assert.equal(landings.length - landingsBefore, 1,
    'and the pair is ASKED EXACTLY ONCE at that write — the delta is the landings the act added, so the '
    + `registration instant's own evaluation is not counted: +${landings.length - landingsBefore}`);

  t.diagnostic(`XK-1 · CO-LOCATION AT THE RUNTIME: the pair \`tabs-must-stand\` stood at \`['tabs']\` first; `
    + `\`listen('app', [['tabs']])\` answered ${JSON.stringify(listened.threw ? null : listened.value)} and `
    + `\`register('app', …)\` ${registered.threw ? 'threw' : 'answered undefined'}; one `
    + `\`write(['tabs'],'mem',1)\` carried ${JSON.stringify(written.threw ? null : written.value.triggered)}, `
    + `delivered the listener ${deliveries}× and asked the pair ${landings.length - landingsBefore}×`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `XK-2` · THE CONSTRUCTION STANDS WITH A PAIR AND AN ADOPTED LISTENER AT ONE ADDRESS
// `D-98` clauses (i)–(ii) · §5.3's `XK-2` row · `C-15`/§6.4 (the order) · `research.md` §6's `K-19` (the defect)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('XK-2 · THE CONSTRUCTION STANDS: `cfg.constraints` ONE element at `[\'tabs\']` and `cfg.listeners` ONE listener at `[\'tabs\']` — the instance EXISTS, one write TRIGGERS the pair and DELIVERS the adopted listener ONCE', (t) => {
  // **`research.md` §6's `K-19` MEASURED THE OPPOSITE, AND IT IS THE DEFECT §5.3's ROW NAMES**: *"THROW K-19
  // construction: listeners [{address:['tabs'],handle:'L'}] + batch pair P@['tabs'] => AddressMalformed (the
  // adopted listeners are applied through `listen` after the batch arms)"*. **C-15/§6.4 keeps the ORDER (batch
  // first, `cfg.listeners` after) and states that under the correction the order decides no refusal outcome —
  // which is exactly what this cell puts to the test rather than assumes.**
  const built = capture(() => storeCreate({
    journalLength: 256,
    listeners: [{ address: ['tabs'], handle: 'L' }],
    constraints: [{ address: ['tabs'], id: 'P', constraint: passing }],
  }));
  assert.equal(built.threw, false,
    '**THE CONSTRUCTION STANDS** — two kinds, one address, supplied in ONE `cfg`: it '
    + `${built.threw ? 'THREW ' + JSON.stringify(String(built.thrown.status)) + ' / '
      + JSON.stringify(String(built.thrown.message).slice(0, 120)) : 'returned the instance'}`);
  const store = built.value;
  assert.equal(typeof store, 'object',
    'and what it answers is the INSTANCE (`storeCreate`\'s one declared product — `package.md §1.3`)');

  assert.deepEqual(store.constraints().map((row) => ({ address: segmentAddresses(row.address), id: row.id })),
    [{ address: ['tabs'], id: 'P' }],
    'and the batch pair is CARRIED and ENUMERATED at its address — the construction\'s arming walk ran');

  let deliveries = 0;
  const armed = capture(() => store.register('L', () => { deliveries += 1; }));
  assert.equal(armed.threw, false,
    'and the ADOPTED listener is armable under its own handle — `cfg.listeners` applies `listen`, so the entry '
    + 'exists and `register` re-arms it (`listen-verb.md §4` state `1` → `2`). It '
    + `${armed.threw ? 'THREW ' + JSON.stringify(String(armed.thrown.status)) : 'returned'}`);

  const written = capture(() => store.write(['tabs'], 'mem', 1));
  assert.equal(written.threw, false,
    'PREMISE: the write passes: '
    + `${written.threw ? JSON.stringify(String(written.thrown.status)) : 'returned'}`);
  assert.deepEqual(triggeredHandles(written.value), ['L', 'P'],
    '**`triggered` CARRIES THE PAIR AND THE ADOPTED LISTENER AT THE SAME ADDRESS** (`D-98` clauses (i)–(ii)): '
    + 'read ' + JSON.stringify(written.value.triggered));
  assert.equal(deliveries, 1,
    '**AND THE LISTENER IS DELIVERED EXACTLY ONCE** — the construction\'s own adopted listener, at the address '
    + `the pair stands at: ${deliveries} invocation(s)`);

  t.diagnostic(`XK-2 · THE CONSTRUCTION AT ONE ADDRESS: \`cfg.constraints\` = [{address:['tabs'], id:'P'}] and `
    + `\`cfg.listeners\` = [{address:['tabs'], handle:'L'}] — `
    + `${built.threw ? 'REFUSED ' + JSON.stringify(String(built.thrown.status)) : 'the construction STOOD'}, `
    + `\`constraints()\` = ${JSON.stringify(built.threw ? null : store.constraints())}, one write carried `
    + `${JSON.stringify(written.threw ? null : written.value.triggered)} and delivered ${deliveries}×`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `XK-3` · THE MIXED SET IS LAWFUL AND INSTALLS BOTH MEMBERS
// `D-98` clause (i) · §5.3's `XK-3` row · `research.md` §6's `K-4` (the whole-refusal is the defect)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('XK-3 · THE MIXED SET `listen(\'h\', [[\'tabs\'], [\'tabs\',\'order\']])` IS LAWFUL WHERE A PAIR STANDS AT `[\'tabs\']`, IT INSTALLS BOTH MEMBERS, AND A WRITE AT `[\'tabs\',\'order\']` REACHES THE LISTENER', (t) => {
  // **`research.md` §6's `K-4`: *"THROW K-4 listen('h2',[['tabs'],['tabs','order']]) (mixed set, refuses whole) =>
  // AddressMalformed"* — the whole-refusal is the defect, and the reason the caller could not learn WHICH member
  // offended (`log: []`, `address: null`).** Under the ruling one member of the set is at a pair's address and
  // the act is lawful, so the set installs exactly as spelled and NOTHING is refused.
  const store = make();
  store.addConstraint({ address: ['tabs'], id: 'tabs-must-stand' }, passing);

  const listened = capture(() => store.listen('h', [['tabs'], ['tabs', 'order']]));
  assert.equal(listened.threw, false,
    '**THE MIXED SET IS LAWFUL** — a `listen` at a pair\'s address is not a conflict (`D-98` clause (i)): it '
    + `${listened.threw ? 'THREW ' + JSON.stringify(String(listened.thrown.status)) : 'returned'}`);
  assert.equal(listened.value, 'h', 'and it answers its handle (`D-22`)');

  let deliveries = 0;
  store.register('h', () => { deliveries += 1; });

  // ── (a) THE FIRST MEMBER IS INSTALLED — a write at `['tabs']` reaches the listener. ─────────────────────
  const atTabs = capture(() => store.write(['tabs'], 'mem', {}));
  assert.equal(atTabs.threw, false,
    'PREMISE: the write at `[\'tabs\']` passes — an empty container, so the write\'s own address is the only '
    + 'one it touches and the second member is read at its own write below: '
    + `${atTabs.threw ? JSON.stringify(String(atTabs.thrown.status)) : 'returned'}`);
  assert.deepEqual(addressesUnder(atTabs.value, 'h'), ['tabs'],
    'and the store\'s own `triggered` set carries the listener at `[\'tabs\']` — THE FIRST MEMBER IS INSTALLED');
  assert.equal(deliveries, 1, 'and it was delivered once there');

  // ── (b) BOTH MEMBERS ARE INSTALLED — one write at `['tabs','order']` triggers BOTH of the handle's rows. ──
  const atOrder = capture(() => store.write(['tabs', 'order'], 'mem', 'x'));
  assert.equal(atOrder.threw, false,
    'and the write at `[\'tabs\',\'order\']` passes: '
    + `${atOrder.threw ? JSON.stringify(String(atOrder.thrown.status)) : 'returned'}`);
  assert.deepEqual(addressesUnder(atOrder.value, 'h'), ['tabs', 'tabs/order'],
    '**BOTH MEMBERS ARE INSTALLED** — the store\'s `triggered` set carries the ONE handle at BOTH addresses of '
    + 'the set the caller spelled (`contract.md §2.2` items 2/3: one entry, two rows; `§2.4` item 1 for the '
    + 'record): read ' + JSON.stringify(atOrder.value.triggered));
  assert.equal(deliveries - 1, 1,
    '**AND A WRITE AT `[\'tabs\',\'order\']` REACHES THE LISTENER** — the body ran ONCE MORE, because the two '
    + 'matching rows belong to ONE distinct handle and the delivery is one invocation per DISTINCT HANDLE, '
    + `never one per element (\`surface.md §2.4\` rule 1): +${deliveries - 1}`);

  t.diagnostic(`XK-3 · THE MIXED SET: \`listen('h', [['tabs'], ['tabs','order']])\` answered `
    + `${JSON.stringify(listened.threw ? null : listened.value)} where the pair \`tabs-must-stand\` stands at `
    + `\`['tabs']\`; \`write(['tabs'])\` carried ${JSON.stringify(atTabs.threw ? null : addressesUnder(atTabs.value, 'h'))} `
    + `and \`write(['tabs','order'])\` carried `
    + `${JSON.stringify(atOrder.threw ? null : addressesUnder(atOrder.value, 'h'))}; deliveries ${deliveries}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `XK-4` · FIVE PAIRS AND ONE LISTENER AT ONE ADDRESS — THE APP'S OWN SHAPE
// `D-98` clause (ii) · §5.3's `XK-4` row · `research.md` §6's `K-15`/`K-26`/`K-28`
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('XK-4 · MULTIPLE PAIRS AND A LISTENER AT ONE ADDRESS: FIVE pairs at `[\'tabs\']` (the app\'s shape) and ONE listener there — `triggered` carries ALL SIX handles, the listener is delivered ONCE, and EACH PAIR IS ASKED EXACTLY ONCE', (t) => {
  // **THE APP'S OWN SHAPE** (`Provident-Electron`'s `src/main/tabs-record/index.ts`: five constraint pairs stand
  // at `['tabs']`), which is why the address refusal reached it at all. **`D-98` item 2's measured `19 lawful`
  // arms are pinned here as a cell and not only as a note** (§5.3's `Q6`: *"every count is re-derived by a drive
  // rather than carried from the report"*).
  const store = make();
  const IDS = ['p1', 'p2', 'p3', 'p4', 'p5'];
  const landings = new Map(IDS.map((id) => [id, 0]));
  for (const id of IDS) {
    store.addConstraint({ address: ['tabs'], id }, (context) => {
      if (!(context !== null && typeof context === 'object' && context.tier === null && context.op === null)) {
        landings.set(id, landings.get(id) + 1);
      }
      return true;
    });
  }
  assert.equal(store.constraints().length, IDS.length,
    'PREMISE: five pairs at ONE address are LAWFUL and all five enumerate (`D-98` clause (ii); `D-24`\'s '
    + 'same-kind multiplicity): read ' + JSON.stringify(store.constraints().map((row) => row.id)));

  let deliveries = 0;
  store.listen('tabs-record', [['tabs']]);
  store.register('tabs-record', () => { deliveries += 1; });

  const written = capture(() => store.write(['tabs'], 'mem', 1));
  assert.equal(written.threw, false,
    'PREMISE: the write passes: '
    + `${written.threw ? JSON.stringify(String(written.thrown.status)) : 'returned'}`);
  assert.deepEqual(triggeredHandles(written.value), ['p1', 'p2', 'p3', 'p4', 'p5', 'tabs-record'],
    '**`triggered` CARRIES ALL SIX HANDLES** — the five pairs\' ids and the listener\'s handle, at ONE address '
    + '(`D-98` clause (ii); `D-68`\'s one trigger set): read ' + JSON.stringify(written.value.triggered));
  assert.equal(deliveries, 1,
    '**AND THE LISTENER IS DELIVERED EXACTLY ONCE** — one invocation per distinct handle, not one per element '
    + `(\`surface.md §2.4\` rule 1): ${deliveries} invocation(s)`);
  assert.deepEqual([...landings.entries()].sort(), IDS.map((id) => [id, 1]).sort(),
    '**AND EACH PAIR IS ASKED EXACTLY ONCE** — the delta is each pair\'s own landing count, so the five '
    + `registration instants are not counted: ${JSON.stringify([...landings.entries()].sort())}`);

  t.diagnostic(`XK-4 · FIVE PAIRS AND A LISTENER AT ONE ADDRESS: \`constraints()\` = `
    + `${JSON.stringify(store.constraints().map((row) => ({ id: row.id, address: segmentAddresses(row.address) })))}, `
    + `one \`write(['tabs'],'mem',1)\` carried ${JSON.stringify(written.threw ? null : triggeredHandles(written.value))}, `
    + `delivered the listener ${deliveries}× and asked each pair ${JSON.stringify([...landings.entries()].sort())}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `XK-5` · THE FOUR EXACT MESSAGES — AUTHORED LAST, AFTER THE `§8.2` ROWS LANDED
// `D-98` item 4 · `docs/L1/cross-kind-handle-only.md` §3.3, §3.6, §5.3's `XK-5` row ·
// `docs/specs/storeroom-native/contract.md §8.2` clause 6 (*"no cell of any drive may assert a
// registration-instant sentence until it lands"*) · `§6.2` (the addon rebuild is an environment fact)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('XK-5 · THE FOUR EXACT MESSAGES OF THE DECLARATION §3.6, ONE PER ARM, EACH ASSERTED WHOLE WITH `status`, `log: []`, `address: null` AND THE FOUR-MEMBER CENSUS — AND THE FALSE SENTENCE ASSERTED ABSENT BY LITERAL', (t) => {
  // **WHY THIS CELL IS LAST AND WHY IT EXISTS AT ALL** (§3.7 item 4 (ii)): `contract.md §8.2` clause 3's `OWED`
  // row orders *"no cell of any drive may assert a registration-instant sentence until it lands"*, and the
  // correction's two qualified arms are the landing. **THE DEFECT THESE TEXTS REPLACE, AT ITS BYTES**
  // (`research.md` §5.3): the generated half was the store's `AddressMalformed` SEGMENT template rendered with the
  // default container `''` — *"'tabs' is not a legal address segment in '', segments are strings or non-negative
  // integers"* — **false twice at once** (the segment IS legal; `''` is a placeholder and not a container the
  // mismatch was found in), and the clause read the ADDRESS where the ruling reads the HANDLE.
  //
  // **THE FOUR SUBJECTS ARE THE DECLARATION'S OWN WORKED EXAMPLES**: `tabs-must-stand` (B-6), `pair1` (B-5), `hx`
  // (B-4) and `shared-handle` (B-3), so the bytes are checkable against §3.6 line for line.
  //
  // **AND ONE CORRECTION TO THE DECLARATION'S OWN DRIVE LINE, PRINTED RATHER THAN TAKEN SILENTLY.** §3.6's
  // `B-6` line reads *"`B-6` — `listen('h', [['tabs']])` with the pair `tabs-must-stand` at `['tabs']`"* — **but
  // under `D-98` that call is LAWFUL**, because `B-6` fires only where the claim's HANDLE equals a carried pair's
  // `id`, and the message the same line prints names `tabs-must-stand` as the claimed handle. **The TEXT is what
  // this cell asserts and the text is unambiguous; the drive is re-spelled to the arm that answers it —
  // `listen('tabs-must-stand', [['tabs']])`** — and the disagreement is reported with this pass's findings.
  const FALSE_GENERATED_HALF = 'is not a legal address segment';
  const PLACEHOLDER_CONTAINER = "in ''";

  /** Assert the one plain form, the census, the member, the two empty members, the whole text, and the two
   *  absences — in that order, so a failure names which obligation moved. */
  function assertArm(label, refusal, expectedMessage, expectedStatus) {
    assert.equal(refusal !== null && typeof refusal === 'object' && !(refusal instanceof Error), true,
      `${label}: the refusal is the surface's ONE plain thrown object and never an Error subclass `
      + '(`surface.md §2.5` item 3)');
    assert.equal(censusOf(refusal), PLAIN_FORM,
      `${label}: the census is EXACTLY the four declared members (\`surface.md §2.5\` items 4 and 9): read `
      + censusOf(refusal));
    assert.equal(refusal.status, expectedStatus,
      `${label}: the member follows the act's subject — \`${expectedStatus}\` (\`D-98\` item 4; §3.5): read `
      + JSON.stringify(refusal.status));
    assert.deepEqual(refusal.log, [], `${label}: \`log\` is \`[]\` — no attempt was opened (\`surface.md §2.5\` item 4)`);
    assert.equal(refusal.address, null,
      `${label}: \`address\` is \`null\` BY CONSTRUCTION — the refusal's subject is a string in the HANDLE `
      + `namespace (§3.4: a pair stands at N addresses, so naming one would assert an order): read `
      + JSON.stringify(refusal.address));
    assert.equal(refusal.message, expectedMessage,
      `${label}: the message is EXACTLY §3.6's text, WHOLE — a fragment assertion is what let the false `
      + `generated half survive four arms: read ${JSON.stringify(refusal.message)}`);
    assert.equal(refusal.message.includes(FALSE_GENERATED_HALF), false,
      `${label}: AND THE FALSE SENTENCE IS ABSENT BY NAME — no arm prints a segment-legality claim about a legal `
      + 'segment (§3.1\u2013§3.2; `D-98` item 4: *"the false half cannot stay"*)');
    assert.equal(refusal.message.includes(PLACEHOLDER_CONTAINER), false,
      `${label}: and the placeholder container \`''\` is printed by NO arm — the qualified arms carry no `
      + '<CONTAINER> slot at all (§3.3)');
  }

  // ── `B-6` — `listen`, under a carried pair's own `id`. ─────────────────────────────────────────────────
  const afterListen = make();
  afterListen.addConstraint({ address: ['tabs'], id: 'tabs-must-stand' }, passing);
  const b6 = capture(() => afterListen.listen('tabs-must-stand', [['tabs']]));
  assert.equal(b6.threw, true,
    '`B-6` refuses a `listen` whose HANDLE is a carried pair\'s `id` (`D-98` clause (iii); §1\'s `B-6` row): '
    + `${b6.threw ? 'threw' : 'RETURNED ' + JSON.stringify(b6.value)}`);
  assertArm('B-6 (listen)', b6.thrown,
    "'tabs-must-stand' is already a handle this instance carries, a listener's handle and a constraint's id are "
    + "one string and one string only, listen refuses: the constraint pair 'tabs-must-stand' keeps that handle, "
    + 'and a listener and a constraint do not share one handle',
    'AddressMalformed');

  // ── `B-5` — `register`, under a carried pair's own `id`. ───────────────────────────────────────────────
  const afterRegister = make();
  afterRegister.addConstraint({ address: ['k'], id: 'pair1' }, passing);
  const b5 = capture(() => afterRegister.register('pair1', () => {}));
  assert.equal(b5.threw, true,
    '`B-5` refuses a `register` whose HANDLE is a carried pair\'s `id` (`D-98` clause (iii); §1\'s `B-5` row): '
    + `${b5.threw ? 'threw' : 'RETURNED ' + JSON.stringify(b5.value)}`);
  assertArm('B-5 (register)', b5.thrown,
    "'pair1' is already a handle this instance carries, a listener's handle and a constraint's id are one "
    + "string and one string only, register refuses: the constraint pair 'pair1' keeps that handle, and a "
    + 'listener and a constraint do not share one handle',
    'AddressMalformed');

  // ── `B-4` — `addConstraint`, over a LIVE listener's handle. ────────────────────────────────────────────
  const afterAdd = make();
  afterAdd.listen('hx', [['p']]);
  afterAdd.register('hx', () => {});
  const b4 = capture(() => afterAdd.addConstraint({ address: ['q'], id: 'hx' }, passing));
  assert.equal(b4.threw, true,
    '`B-4` refuses a pair whose `id` is a LIVE listener\'s handle — the `D-25` *"or vice versa"* direction, KEPT '
    + 'whole by `D-98` §2: ' + `${b4.threw ? 'threw' : 'RETURNED ' + JSON.stringify(b4.value)}`);
  assertArm('B-4 (addConstraint)', b4.thrown,
    "'hx' is already a handle this instance carries, a listener's handle and a constraint's id are one string "
    + "and one string only, addConstraint refuses: the listener 'hx' keeps that handle, and a listener and a "
    + 'constraint do not share one handle',
    'AddressMalformed');

  // ── `B-3` — the construction's batch, over an adopted listener's handle. ───────────────────────────────
  const b3 = capture(() => storeCreate({
    journalLength: 8,
    listeners: [{ address: ['lk'], handle: 'shared-handle' }],
    constraints: [{ address: ['ck'], id: 'shared-handle', constraint: passing }],
  }));
  assert.equal(b3.threw, true,
    '`B-3` refuses a batch element whose `id` is an adopted listener\'s handle — the HANDLE arm, KEPT whole by '
    + '`D-98` §2: ' + `${b3.threw ? 'threw' : 'RETURNED an instance'}`);
  assertArm('B-3 (the batch)', b3.thrown,
    "'shared-handle' is already a handle this instance carries, a batch element's id is its pair's handle and "
    + "it may not be one this construction adopts as a listener's, the batch element at position 0 names that "
    + 'handle, and this construction adopts a listener under it at lk',
    'ConstraintListInvalid');

  t.diagnostic('XK-5 · THE FOUR TEXTS, EACH WHOLE: B-6 ' + JSON.stringify(b6.thrown.message)
    + ' | B-5 ' + JSON.stringify(b5.thrown.message)
    + ' | B-4 ' + JSON.stringify(b4.thrown.message)
    + ' | B-3 ' + JSON.stringify(b3.thrown.message));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `XK-6` · THE FOUR KERNEL RE-LISTINGS, AT `N = 1` AND `N = 3` — AND THE DISABLED PAIR'S HANDLE
// `D-99`'s `ANSWERED` clause (the route reading) · `D-98` open (ii) · §9.2, §9.3, §9.4, §9.5 · §5.3's `XK-6` row
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('XK-6 · EVERY KERNEL RE-LISTING IS LAWFUL AT `N = 1` AND `N = 3` — the construction\'s arming walk, a held-pair extension, a `constraintOff → constraintOn` cycle and a refused re-registration\'s wake — AND A DISABLED PAIR\'S HANDLE STILL BLOCKS A CALLER AT BOTH ARMS', (t) => {
  // **WHAT THIS CELL PROVES AND WHAT IT CANNOT.** The four acts are the kernel's OWN store-side registrations
  // (`constraintsKernel().register` at `constraints.mjs`\'s arming walk, `index.mjs`\'s extension and enable arms
  // and `restoreHeldPair`'s wake). Under `D-99`'s route reading they reach the store through the kernel's own
  // route (`LISTEN_ROUTE` → `listenOn`, §9.2) and **never pass the caller-facing cross-kind test at all** — so the
  // cell's value is not that an instrument admitted them, but that **there is no instrument to admit them**: each
  // is lawful at ONE address and at THREE, in the same instance and the same build.
  // **The witness is the store's own `triggered` set**: if the kernel's registration did not reach the store, a
  // write at the pair's address could not carry its handle. **The N = 3 arm cannot be read off a count**: each of
  // the three addresses is written to and read separately, so three rows are three reads and never one.
  //
  // **AND THE ONE INSTANT WHERE `N = 3` HAS NO SPELLING IS PRINTED RATHER THAN SMOOTHED.** The construction's
  // arming walk is driven at `N = 1` only, because **a `cfg.constraints` element carries ONE address**: the batch
  // admits `addresses: [element.address.s]` (`frame.mjs`'s admitted list), and an element whose `address` is an
  // ADDRESS SET is refused at the encoder. That refusal is asserted below, so the absence of that arm is a
  // measurement and not an omission.
  const witness = (store, address, id, label) => {
    const written = capture(() => store.write(address, 'mem', 1));
    assert.equal(written.threw, false,
      `${label}: a write at ${JSON.stringify(address)} PASSES — the pair stands and answers: `
      + `${written.threw ? JSON.stringify(String(written.thrown.status)) : 'returned'}`);
    assert.deepEqual(addressesUnder(written.value, id), [address.join('/')],
      `${label}: THE STORE'S OWN \`triggered\` SET CARRIES THE PAIR AT ${JSON.stringify(address)} — the kernel's `
      + `re-listing reached the store's rows, which is the whole claim of the route (§9.2): read `
      + JSON.stringify(written.value.triggered));
  };

  // ── (1) THE CONSTRUCTION'S ARMING WALK — `N = 1`, and the `N = 3` spelling's refusal. ──────────────────
  const constructed = capture(() => storeCreate({
    journalLength: 256,
    listeners: [],
    constraints: [{ address: ['xk-c1'], id: 'constructed', constraint: passing }],
  }));
  assert.equal(constructed.threw, false,
    '**(1) THE CONSTRUCTION\'S ARMING WALK AT `N = 1` IS LAWFUL** — the registration instant evaluates and the '
    + 'construction stands (§9.2\'s first re-listing; `C-2`\'s bracket is DELETED and nothing was needed): '
    + `${constructed.threw ? JSON.stringify(String(constructed.thrown.status)) : 'returned'}`);
  witness(constructed.value, ['xk-c1'], 'constructed', '(1) construction, N = 1');

  const setAtConstruction = capture(() => storeCreate({
    journalLength: 256,
    listeners: [],
    constraints: [{ address: [['xk-d1'], ['xk-d2'], ['xk-d3']], id: 'constructed-3', constraint: passing }],
  }));
  assert.equal(setAtConstruction.threw, true,
    '**AND THE `N = 3` ARM OF THAT INSTANT HAS NO SPELLING** — a `cfg.constraints` element carries ONE address '
    + '(`frame.mjs`\'s admitted element), so a batch element whose `address` is an ADDRESS SET is refused by the '
    + 'encoder and the pair never reaches the arming walk. **The cell therefore drives the construction at '
    + '`N = 1` and the other three re-listings at both N, and the declaration\'s *"each lawful at N = 1 and '
    + 'N = 3"* has no `N = 3` member at this instant**');
  assert.equal(setAtConstruction.thrown.status, 'ConstraintListInvalid',
    'and the refusal is the batch\'s own member — the list\'s validation (`D-27`; §3.5): read '
    + JSON.stringify(String(setAtConstruction.thrown.status)));

  // ── (2) A HELD-PAIR EXTENSION — `N = 1` (a re-add at the same address) and `N = 3`. ─────────────────────
  const extendedOne = make();
  extendedOne.addConstraint({ address: ['xk-e1'], id: 'extended-one' }, passing);
  const extensionOne = capture(() => extendedOne.addConstraint({ address: ['xk-e1'], id: 'extended-one' }, passing));
  assert.equal(extensionOne.threw, false,
    '**(2a) THE HELD-PAIR EXTENSION AT `N = 1` IS LAWFUL** — a second `addConstraint` at the SAME address is the '
    + 'overwrite arm, and its re-listing walks a set of one (`D-24`; §9.3\'s withdrawn bracket, whose bytes are '
    + 'unmoved): ' + `${extensionOne.threw ? JSON.stringify(String(extensionOne.thrown.status)) : 'returned'}`);
  witness(extendedOne, ['xk-e1'], 'extended-one', '(2a) extension, N = 1');

  const extendedThree = make();
  extendedThree.addConstraint({ address: ['xk-f1'], id: 'extended-three' }, passing);
  const extensionThree = capture(() => extendedThree.addConstraint({ address: [['xk-f2'], ['xk-f3']], id: 'extended-three' }, passing));
  assert.equal(extensionThree.threw, false,
    '**(2b) THE HELD-PAIR EXTENSION AT `N = 3` IS LAWFUL** — the union of the pair\'s addresses is walked, and '
    + 'the kernel\'s route takes the accumulated set (`index.mjs`\'s extension arm; §9.2): '
    + `${extensionThree.threw ? JSON.stringify(String(extensionThree.thrown.status)) : 'returned'}`);
  for (const address of [['xk-f1'], ['xk-f2'], ['xk-f3']]) witness(extendedThree, address, 'extended-three', '(2b) extension, N = 3');

  // ── (3) A `constraintOff → constraintOn` CYCLE — `N = 1` and `N = 3`. ───────────────────────────────────
  const cycledOne = make();
  cycledOne.addConstraint({ address: ['xk-g1'], id: 'cycled-one' }, passing);
  assert.equal(cycledOne.constraintOff({ address: ['xk-g1'], id: 'cycled-one' }, passing), undefined,
    '(3a) PREMISE: the disable half answers `undefined` (`surface.md §2.12` item 2 (a))');
  const enableOne = capture(() => cycledOne.constraintOn({ address: ['xk-g1'], id: 'cycled-one' }, passing));
  assert.equal(enableOne.threw, false,
    '**(3a) THE `constraintOff → constraintOn` CYCLE AT `N = 1` IS LAWFUL** — the enable arm re-lists through '
    + 'the kernel\'s route, where the `enabled` skip used to decide (`D-98` open (ii); `C-19`): '
    + `${enableOne.threw ? JSON.stringify(String(enableOne.thrown.status)) : 'returned'}`);
  witness(cycledOne, ['xk-g1'], 'cycled-one', '(3a) cycle, N = 1');

  const cycledThree = make();
  cycledThree.addConstraint({ address: SET3, id: 'cycled-three' }, passing);
  assert.equal(cycledThree.constraintOff({ address: SET3, id: 'cycled-three' }, passing), undefined,
    '(3b) PREMISE: the disable half answers `undefined` at the three-address pair too');
  const enableThree = capture(() => cycledThree.constraintOn({ address: SET3, id: 'cycled-three' }, passing));
  assert.equal(enableThree.threw, false,
    '**(3b) THE CYCLE AT `N = 3` IS LAWFUL — AND THIS IS THE ARM `C-2` WAS BUILT FOR AND `D-99` DELETED THE NEED '
    + 'FOR**: the enable arm re-lists ONE ADDRESS PER CALL and the pair\'s first call is a SINGLETON, which the '
    + 'coverage instrument could not admit (§1.2\'s table, §9.4 ground 4). **Under the route reading there is no '
    + 'instrument to admit it**: ' + `${enableThree.threw ? JSON.stringify(String(enableThree.thrown.status)) : 'returned'}`);
  for (const address of SET3) witness(cycledThree, address, 'cycled-three', '(3b) cycle, N = 3');

  // ── (4) A REFUSED RE-REGISTRATION'S WAKE — `N = 1` and `N = 3`. ────────────────────────────────────────
  const wokenOne = make();
  wokenOne.addConstraint({ address: ['xk-h1'], id: 'woken-one' }, passing);
  const wakeOne = capture(() => wokenOne.addConstraint({ address: ['xk-h2'], id: 'woken-one' }, refusingAtRegistration));
  assert.equal(wakeOne.threw, true,
    '(4a) PREMISE: the extension whose body refuses its own registration REFUSES at rank `19` '
    + '(`ConstraintRefusedAtRegistration`; `contract.md §7.3` (b) state 2): '
    + `${wakeOne.threw ? 'threw' : 'RETURNED ' + JSON.stringify(wakeOne.value)}`);
  assert.equal(wakeOne.thrown.status, 'ConstraintRefusedAtRegistration',
    'and the refusal carries the registration\'s own member: read ' + JSON.stringify(String(wakeOne.thrown.status)));
  assert.deepEqual(wokenOne.constraints().map((row) => ({ address: segmentAddresses(row.address), id: row.id })),
    [{ address: ['xk-h1'], id: 'woken-one' }],
    '**THE WAKE PUT THE PAIR BACK AT ITS OWN ADDRESS** — `restoreHeldPair` re-lists the held pair (§9.3: the '
    + 'latent refusal is *"repaired by the act being the kernel\'s own"*), so the read model and the kernel\'s '
    + 'rows cannot disagree: read ' + JSON.stringify(wokenOne.constraints()));
  witness(wokenOne, ['xk-h1'], 'woken-one', '(4a) wake, N = 1');

  const wokenThree = make();
  wokenThree.addConstraint({ address: SET3, id: 'woken-three' }, passing);
  const wakeThree = capture(() => wokenThree.addConstraint({ address: ['xk-i4'], id: 'woken-three' }, refusingAtRegistration));
  assert.equal(wakeThree.threw, true,
    '(4b) PREMISE: the extension over the three-address pair refuses at the same rank: '
    + `${wakeThree.threw ? 'threw' : 'RETURNED ' + JSON.stringify(wakeThree.value)}`);
  assert.equal(wakeThree.thrown.status, 'ConstraintRefusedAtRegistration',
    'and with the same member: read ' + JSON.stringify(String(wakeThree.thrown.status)));
  assert.deepEqual(segmentAddresses(wokenThree.constraints()[0]?.address), ['xk-a', 'xk-b', 'xk-c'],
    '**AND THE WAKE RE-LISTED ALL THREE ADDRESSES** — the pair stands at exactly the set it stood at before the '
    + 'refused extension, and at no fourth: read ' + JSON.stringify(wokenThree.constraints()));
  for (const address of SET3) witness(wokenThree, address, 'woken-three', '(4b) wake, N = 3');

  // ── (5) THE DISABLED PAIR — ITS HANDLE BLOCKS BOTH ARMS. ───────────────────────────────────────────────
  const disabled = make();
  disabled.addConstraint({ address: SET3, id: 'disabled-pair' }, passing);
  assert.equal(disabled.constraintOff({ address: SET3, id: 'disabled-pair' }, passing), undefined,
    '(5) PREMISE: the disable half answers `undefined`');
  assert.deepEqual(disabled.constraints().map((row) => ({ address: segmentAddresses(row.address), id: row.id })),
    [{ address: ['xk-a', 'xk-b', 'xk-c'], id: 'disabled-pair' }],
    'and a DISABLED pair is STILL CARRIED and STILL ENUMERATED (`removal-members.md §3` item 3) — which is the '
    + 'source `C-19` reads membership from (`state.constraints`, §9.1)');

  const disabledListenOwn = capture(() => disabled.listen('disabled-pair', SET3));
  assert.equal(disabledListenOwn.threw, true,
    '**A CALLER\'S `listen` AT A DISABLED PAIR\'S `id` IS REFUSED, WITH THE PAIR\'S OWN SET** — the `enabled` '
    + 'skip is DELETED (`C-19`, §9.4: *"a disabled pair\'s handle blocks both arms"*), so the pair\'s polarity is '
    + 'not read: ' + `${disabledListenOwn.threw ? 'threw' : 'RETURNED ' + JSON.stringify(disabledListenOwn.value)}`);
  assert.equal(disabledListenOwn.thrown.status, 'AddressMalformed',
    'and the status is the handle arm\'s own: read ' + JSON.stringify(String(disabledListenOwn.thrown.status)));
  assert.equal(String(disabledListenOwn.thrown.message).includes('listen refuses: the constraint pair'),
    true,
    '**AND IT IS `B-6`\'S OWN CLAUSE HALF THAT ANSWERS** — the handle arm, not the registry or the domain: read '
    + JSON.stringify(String(disabledListenOwn.thrown.message).slice(0, 160)));
  assert.equal(censusOf(disabledListenOwn.thrown), PLAIN_FORM,
    'in the surface\'s one plain form with the four-member census: read ' + censusOf(disabledListenOwn.thrown));

  const disabledListenOther = capture(() => disabled.listen('disabled-pair', [['xk-elsewhere']]));
  assert.equal(disabledListenOther.threw, true,
    '**AND THE SET IT NAMES DOES NOT MATTER** — a different address is refused identically, which is what makes '
    + 'the arm the HANDLE and not the address (`D-98` clause (iii)): '
    + `${disabledListenOther.threw ? 'threw' : 'RETURNED ' + JSON.stringify(disabledListenOther.value)}`);

  const disabledRegister = capture(() => disabled.register('disabled-pair', () => {}));
  assert.equal(disabledRegister.threw, true,
    '**AND A CALLER\'S `register` AT IT IS REFUSED TOO** (§9.4: both arms; §9.5\'s re-shaped `XK-6`): '
    + `${disabledRegister.threw ? 'threw' : 'RETURNED ' + JSON.stringify(disabledRegister.value)}`);
  assert.equal(disabledRegister.thrown.status, 'AddressMalformed',
    'and its status is the module\'s one registration member: read '
    + JSON.stringify(String(disabledRegister.thrown.status)));
  // **THE ASSERTION IS THE ARM THAT ANSWERS, AND IT IS NOT `B-5`'S.** §9.4 prints the measurement: the disable
  // purges the store rows THROUGH `removeListener`, which removes the registry entry with them — so the handle is
  // refused one arm EARLIER than `B-5`, at the registry-membership test, and the message says so. **Asserting
  // `B-5`'s text here would assert an arm the build does not reach** (§9.4's measurement (a) is the same class of
  // finding, and this cell records its own).
  assert.equal(String(disabledRegister.thrown.message).includes('holds no listener entry'), true,
    '**AND THE ARM THAT ANSWERS IS THE REGISTRY-MEMBERSHIP ONE** — the disable removed the registry reservation '
    + 'with the store rows, so `register` refuses at *"this instance holds no listener entry"* and not at `B-5` '
    + '(§9.2 (iii) item (2) names that test as what makes `register(`<pair id>`)` reach `B-5` — and a DISABLED '
    + 'pair holds no reservation, which is the measurement §9.4 owes the record): read '
    + JSON.stringify(String(disabledRegister.thrown.message).slice(0, 200)));
  assert.equal(String(disabledRegister.thrown.message).includes('register refuses: the constraint pair'), false,
    '**SO `B-5`\'S TEXT IS NOT ASSERTED AND IS NOT PRINTED HERE** — the refusal is real and the arm is not the '
    + 'cross-kind one: read ' + JSON.stringify(String(disabledRegister.thrown.message).slice(0, 200)));

  // ── (6) AND THE DISABLED PAIR RE-ENABLES WITH NOTHING STANDING UNDER ITS HANDLE. ────────────────────────
  const reEnabled = capture(() => disabled.constraintOn({ address: SET3, id: 'disabled-pair' }, passing));
  assert.equal(reEnabled.threw, false,
    'AND THE DISABLED PAIR RE-ENABLES — no caller could claim its handle, so there is no listener for the enable '
    + 'to clobber (§9.4: *"the premise is EMPTY at the caller\'s route"*): '
    + `${reEnabled.threw ? JSON.stringify(String(reEnabled.thrown.status)) : 'returned'}`);
  for (const address of SET3) witness(disabled, address, 'disabled-pair', '(6) re-enabled, N = 3');

  t.diagnostic('XK-6 · THE FOUR RE-LISTINGS AND THE DISABLED PAIR: construction N = 1 lawful (N = 3 has no '
    + 'spelling — a batch element carries ONE address, refused '
    + `${JSON.stringify(String(setAtConstruction.thrown.status))}); extension N = 1 and N = 3 lawful; cycle `
    + 'N = 1 and N = 3 lawful; wake N = 1 and N = 3 lawful and the pair restored to its own set. The disabled '
    + `pair: \`listen('<id>', <any set>)\` refused at \`${JSON.stringify(String(disabledListenOwn.thrown.status))}\` `
    + `with \`B-6\`'s clause, and \`register('<id>')\` refused at `
    + `\`${JSON.stringify(String(disabledRegister.thrown.status))}\` by the REGISTRY-MEMBERSHIP arm `
    + '(the disable took the reservation with the store rows) — not by `B-5`.');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `XK-7` · THE GENERATOR'S TWO NEW ARMS, AND THE THREE-POSITION CALL UNMOVED
// `D-98` item 4 · `C-7`, `C-12` (§3.3, §3.7) · §5.3's `XK-7` row · `§3.8` (the ABI is internal)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('XK-7 · THE GENERATOR\'S TWO NEW ARMS RENDER EXACTLY §3.3\'S SENTENCES, THE THREE-POSITION CALL RENDERS BYTE-IDENTICALLY TO TODAY, AND A BOGUS TOKEN RENDERS THE ORDINARY ARM', (t) => {
  // **THE ARTEFACT IS REACHED AT THIS CELL AND NOWHERE ELSE IN THIS FILE**, because the correction's own delta is a
  // SENTENCE in the store's generator (`src/error.rs`'s two qualified branches) reached from JS at a new FOURTH
  // position (`facade.rs`'s `errorMessage`), and that entry is the only observable for it. **The widening is
  // artefact-internal** (`§3.8`): no named export of the module namespace and no subpath carries it, so no
  // consumer surface moves and the four texts of `XK-5` are the consumer-facing change.
  const addon = require_(ADDON_ARTEFACT);

  // ── (a) THE TWO QUALIFIED ARMS, EACH EXACTLY §3.3's SENTENCE. ──────────────────────────────────────────
  const addressMalformed = addon.errorMessage('AddressMalformed', 'h', undefined, 'handle');
  assert.equal(addressMalformed,
    "'h' is already a handle this instance carries, a listener's handle and a constraint's id are one string and "
    + 'one string only',
    '**THE `AddressMalformed` ARM RENDERS EXACTLY §3.3\'S `<mismatch clause>` + `<available clause>`** — and it '
    + 'prints NO `<CONTAINER>` slot, which is why the placeholder disappears by construction rather than by a '
    + 'better container (§3.3; §3.2 (e)): read ' + JSON.stringify(addressMalformed));

  const constraintListInvalid = addon.errorMessage('ConstraintListInvalid', 'h', undefined, 'handle');
  assert.equal(constraintListInvalid,
    "'h' is already a handle this instance carries, a batch element's id is its pair's handle and it may not be "
    + "one this construction adopts as a listener's",
    'and the `ConstraintListInvalid` twin renders ITS row\'s two clauses — the batch\'s qualified arm (§3.3), also '
    + 'with no container slot: read ' + JSON.stringify(constraintListInvalid));

  // ── (b) THE THREE-POSITION CALL RENDERS BYTE-IDENTICALLY TO TODAY. ─────────────────────────────────────
  const twoPositions = addon.errorMessage('AddressMalformed', 'h');
  const threeWithUndefined = addon.errorMessage('AddressMalformed', 'h', undefined);
  const withContainer = addon.errorMessage('AddressMalformed', 'h', 'a');
  assert.equal(twoPositions, threeWithUndefined,
    '**AN OMITTED FOURTH POSITION REPRODUCES THE CURRENT BYTES EXACTLY** — the `..Default::default()` device '
    + '(`src/error.rs`, §3.7), asserted against the three-position call with an explicitly absent container: read '
    + JSON.stringify(twoPositions) + ' vs ' + JSON.stringify(threeWithUndefined));
  assert.equal(twoPositions.includes('is not a legal address segment'), true,
    '**AND THE ORDINARY ARM IS THE ONE THAT ANSWERS WHERE NO TOKEN IS SUPPLIED** — the store\'s own segment '
    + 'template stands at the two- and three-position calls, so the qualified arm cannot fire by accident: read '
    + JSON.stringify(twoPositions));
  assert.equal(withContainer, "'h' is not a legal address segment in 'a', segments are strings or non-negative "
    + 'integers',
    'and the THREE-position call still fills the container slot it always filled — the first three positions are '
    + 'byte-unmoved (`C-12`): read ' + JSON.stringify(withContainer));

  // ── (c) A BOGUS TOKEN RENDERS THE ORDINARY ARM. ────────────────────────────────────────────────────────
  const bogus = addon.errorMessage('AddressMalformed', 'h', undefined, 'not-a-token-this-store-reads');
  assert.equal(bogus, twoPositions,
    '**AN UNKNOWN TOKEN LEAVES THE SLOT ABSENT AND THE ORDINARY RENDERING STANDS** — the token is matched against '
    + 'a closed literal, so NO CALLER-SUPPLIED TEXT CAN ENTER A GENERATED SENTENCE (§3.2 item 2; `facade.rs`\'s '
    + '`_ => None` arm): read ' + JSON.stringify(bogus));
  const bogusOnTheList = addon.errorMessage('ConstraintListInvalid', 'h', undefined, '');
  assert.equal(bogusOnTheList.includes('is already a handle this instance carries'), false,
    'and an empty token is no token at all — the list\'s ordinary arm answers: read '
    + JSON.stringify(bogusOnTheList));

  // ── (d) A SECOND CODE IS NOT REACHED BY THE TOKEN. ─────────────────────────────────────────────────────
  const otherCode = addon.errorMessage('AddressNotFound', 'h', undefined, 'handle');
  assert.equal(otherCode, "'h' does not exist in '', it holds no keys",
    '**THE TOKEN SELECTS A QUALIFIED ARM OF THE TWO ANSWERING ROWS AND OF NO THIRD** — no other code of the '
    + 'closed set renders differently for it (§3.7: *"two branches"*; the closed set is unmoved, `CODES` '
    + '`[&str; 20]`): read ' + JSON.stringify(otherCode));

  t.diagnostic('XK-7 · THE GENERATOR\'S ARMS: 4-position handle token on AddressMalformed = '
    + JSON.stringify(addressMalformed) + '; on ConstraintListInvalid = ' + JSON.stringify(constraintListInvalid)
    + '; 2-position = ' + JSON.stringify(twoPositions) + '; 3-position = ' + JSON.stringify(withContainer)
    + '; bogus token = ' + JSON.stringify(bogus) + '; AddressNotFound is unmoved = ' + JSON.stringify(otherCode));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `XK-8` · THE PAIR OF ACTS AT ONE HANDLE — THE CALLER'S REFUSED, THE KERNEL'S STANDING
// `D-99`'s `ANSWERED` clause (`Q-1` RETIRED BY NAME) · §9.5's re-shaped `XK-8` · §5.3's `XK-8` row
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('XK-8 · THE PAIR OF ACTS AT ONE HANDLE IN ONE INSTANCE: a caller\'s `listen(\'<pair id>\', …)` IS REFUSED WITH ANY SET — the pair\'s own included — AND THE KERNEL\'S OWN RE-LISTING AT THAT SAME HANDLE STANDS', (t) => {
  // **`Q-1`'S RESIDUAL IS RETIRED BY NAME** (`D-99`'s `ANSWERED` clause; §9.5): there is no marker for a
  // constraint body to borrow, so the exemption has no subject, and **this cell is the state the pair of acts
  // leaves observable** — the CALLER's claim of a pair's handle refused, the KERNEL's re-listing of that same
  // handle standing. The re-listing is driven twice, by two different acts (`constraintOn`'s enable arm and a
  // held-pair extension), because the declaration names both and one of them could stand while the other moved.
  const store = make();
  store.addConstraint({ address: SET3, id: 'kernel-handle' }, passing);

  // ── (a) THE CALLER'S ACT IS REFUSED, AT EVERY SPELLING OF THE SET. ─────────────────────────────────────
  const ownSet = capture(() => store.listen('kernel-handle', SET3));
  assert.equal(ownSet.threw, true,
    '**A CALLER\'S `listen` UNDER THE PAIR\'S OWN `id` IS REFUSED WHATEVER SET IT CARRIES — THE PAIR\'S OWN SET '
    + 'INCLUDED** (§9.5: *"a caller\'s `listen(\'<pair id>\', <any set, the pair\'s own included>)` REFUSED"*): '
    + `${ownSet.threw ? 'threw' : 'RETURNED ' + JSON.stringify(ownSet.value)}`);
  assert.equal(ownSet.thrown.status, 'AddressMalformed',
    'and the member is the handle domain\'s own: read ' + JSON.stringify(String(ownSet.thrown.status)));
  assert.equal(censusOf(ownSet.thrown), PLAIN_FORM,
    'in the one plain form: read ' + censusOf(ownSet.thrown));
  assert.equal(ownSet.thrown.address, null,
    'and `address` is `null` — the refusal names no address, because the address is the relation the ruling '
    + 'declares lawful (§3.4)');

  const otherSet = capture(() => store.listen('kernel-handle', [['xk-nowhere']]));
  assert.equal(otherSet.threw, true,
    'and the SAME handle with a set that names the pair nowhere is refused identically — the test is the HANDLE '
    + `and nothing else (\`D-98\` clause (iii); \`C-16\`): ${otherSet.threw ? 'threw' : 'RETURNED'}`);
  const emptySet = capture(() => store.listen('kernel-handle', []));
  assert.equal(emptySet.threw, true,
    '**INCLUDING THE EMPTY SET** — the empty array is IN the position\'s domain (`listen-verb.md §2.2` item 1), '
    + 'so this refusal is the cross-kind arm and not a domain arm: '
    + `${emptySet.threw ? 'threw' : 'RETURNED ' + JSON.stringify(emptySet.value)}`);
  assert.equal(String(ownSet.thrown.message).includes('listen refuses: the constraint pair'), true,
    'and each of the three is `B-6`\'s own clause: read '
    + JSON.stringify(String(ownSet.thrown.message).slice(0, 160)));

  // ── (b) THE KERNEL'S OWN RE-LISTING AT THE SAME HANDLE STANDS — BY THE ENABLE ARM. ──────────────────────
  assert.equal(store.constraintOff({ address: SET3, id: 'kernel-handle' }, passing), undefined,
    'PREMISE: the disable half answers `undefined`');
  const reEnabled = capture(() => store.constraintOn({ address: SET3, id: 'kernel-handle' }, passing));
  assert.equal(reEnabled.threw, false,
    '**THE KERNEL\'S OWN RE-LISTING AT THAT EXACT HANDLE STANDS** — `constraintOn` re-registers the pair through '
    + 'the kernel\'s route (`LISTEN_ROUTE`, §9.2), which never reaches the caller-facing test, so the same string '
    + 'that was refused one act earlier is registered here: '
    + `${reEnabled.threw ? 'REFUSED ' + JSON.stringify(String(reEnabled.thrown.status)) : 'returned'}`);
  const afterEnable = capture(() => store.write(['xk-a'], 'mem', 1));
  assert.equal(afterEnable.threw, false,
    'and the pair\'s store row stands at its first address after the re-enable: '
    + `${afterEnable.threw ? JSON.stringify(String(afterEnable.thrown.status)) : 'returned'}`);
  assert.deepEqual(addressesUnder(afterEnable.value, 'kernel-handle'), ['xk-a'],
    'read off the store\'s own `triggered` set: ' + JSON.stringify(afterEnable.value.triggered));

  // ── (c) AND BY AN EXTENSION. ───────────────────────────────────────────────────────────────────────────
  const extended = capture(() => store.addConstraint({ address: [['xk-d']], id: 'kernel-handle' }, passing));
  assert.equal(extended.threw, false,
    '**AND THE OTHER RE-LISTING STANDS TOO** — a held-pair extension at the same handle is lawful '
    + '(`addConstraint`\'s `B-4` reads the LIVE-LISTENER arm and no listener stands under this handle): '
    + `${extended.threw ? 'REFUSED ' + JSON.stringify(String(extended.thrown.status)) : 'returned'}`);
  assert.deepEqual(segmentAddresses(store.constraints()[0].address), ['xk-a', 'xk-b', 'xk-c', 'xk-d'],
    'and the pair stands at its four addresses: read ' + JSON.stringify(store.constraints()));

  // ── (d) THE RE-ENTRANCY STATE, RECORDED AND NOT ASSERTED. ──────────────────────────────────────────────
  // **`§9.5` SAYS A CONSTRAINT BODY THAT CALLS `listen('<its own pair id>', …)` DURING ITS OWN REGISTRATION *"IS
  // REFUSED BY `B-6`"*, BECAUSE *"ITS HANDLE IS IN THE CARRIED-PAIR MAP"*.** **MEASURED AT THIS BUILD, THAT IS
  // TRUE AT A RE-REGISTRATION AND FALSE AT THE FIRST ARMING WALK** — and the reason is `§9.1`'s own decisive
  // measurement: `carryConstraint` writes the pair's row AFTER its loop, so at the first registration's body the
  // handle is NOT in `state.constraints` yet and the helper answers `null`. **This is `Q-1`'s residual arriving
  // from the other side, and it is NOT a cell of this pass** (§5.3's clause retires the re-entrancy probe because
  // there is no marker to borrow — which is true — but the admission at the first walk is a DIFFERENT state and
  // this pass records it rather than asserting either reading). **The observable is bounded and is printed**: the
  // admitted listener cannot be armed either, because `register` under that handle is refused at `B-5` once the
  // pair's row lands, so no delivery is lost silently.
  const probe = make();
  const bodyOutcomes = [];
  probe.addConstraint({ address: ['xk-self'], id: 'self-claiming' }, (context) => {
    if (context !== null && typeof context === 'object' && context.tier === null && context.op === null) {
      const claimed = capture(() => probe.listen('self-claiming', [['xk-self']]));
      bodyOutcomes.push(claimed.threw ? `refused:${claimed.thrown.status}` : 'admitted');
    }
    return true;
  });
  const armable = capture(() => probe.register('self-claiming', () => {}));
  t.diagnostic('XK-8 · THE RE-ENTRANCY STATE AT THE FIRST ARMING WALK (RECORDED, NOT ASSERTED): a body that '
    + 'claims its own pair\'s handle during its registration was '
    + `${JSON.stringify(bodyOutcomes)} — the row is written AFTER the arming walk (§9.1's table), so the handle `
    + `is not yet in \`state.constraints\`. \`register('self-claiming')\` afterwards answers `
    + `${armable.threw ? JSON.stringify(String(armable.thrown.status)) : 'undefined'}, so nothing the caller could `
    + 'arm was lost. **§9.5\'s sentence holds at a RE-registration (measured: refused) and not at the first '
    + 'walk — a disagreement reported to the record and not resolved by a cell here.**');

  t.diagnostic('XK-8 · THE PAIR OF ACTS AT ONE HANDLE: the caller\'s `listen(\'kernel-handle\', …)` was refused '
    + `with the pair's own set, another set AND the empty set (\`${JSON.stringify(String(ownSet.thrown.status))}\` `
    + 'each); the kernel\'s own re-listing at that same handle STOOD twice — by `constraintOn` and by an '
    + 'extension — and the pair stood at four addresses afterwards.');
});
