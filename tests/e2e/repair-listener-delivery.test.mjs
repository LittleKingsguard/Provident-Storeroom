// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-104` — A REPAIR'S WRITE'S TRIGGERED **LISTENERS** ARE DELIVERED IN THE COMMIT'S ONE DELIVERY, AFTER THE
// PASS, ONE INVOCATION PER DISTINCT HANDLE: THE EIGHT `e2e` CELLS THE DECLARATION OWES (`RLD-1` … `RLD-8`).
//
// THE DECLARATION: `docs/L1/repair-listener-delivery.md` — §1 (the defect at the bytes), §2 (the behaviour),
// §3 (the mechanism `(a)`), §4 (`pending` re-read), §5 (the failing arm), §6 (the ordering), §7.1 (THESE EIGHT
// CELLS). THE RULING: `strata/decisions.md` · `D-104`, whose item 2 fixes the behaviour — *"The repair's write's
// listeners ARE delivered — in the COMMIT's delivery, after the pass, with the other listeners"* — whose item 3
// handed the mechanism to L1 and whose item 4 fixes the bound: **no status, no member, no arity, no type may
// move**.
//
// THE DEFECT THE FIX CLOSES, AT ITS BYTES AND IN ONE SENTENCE: a repair's write is this package's own `write`
// member, so its `triggered` set is carried on a record only the ENTRY holds (`bindings/js/index.mjs`'s
// `state.leg`), while the kernel's repair arm credited that write's `op` and read nothing else — so a listener
// a repair's write fired was invoked by NOBODY (`§1` links 3–4; measured `0`).
//
// THE BEHAVIOUR THESE CELLS ASSERT, EACH AT ITS OWN OBSERVABLE:
//   · a repair's write's triggered LISTENERS are appended to the commit's `pending` at the repair arm —
//     **de-duplicated by `handle`, and a carried pair's handle is never merged** (`§3.3`, `§3.4`) — and
//     delivered in the commit's ONE `deliver` call, AFTER the pass (`A112`; `§6`), **one invocation per distinct
//     handle** (`surface.md §2.4` rule 3);
//   · the FAILING arm still delivers NOTHING (`surface.md §2.7` item 6): the discard's filter is widened to the
//     union of the failed write's returned set and THIS attempt's repairs' sets (`kernel-terminal.mjs`), so a
//     merged listener leaves the member too, and the invocation count stays `0`;
//   · the REGISTRATION INSTANT is UNMOVED — a repair at a registration's evaluation delivers nothing
//     (`G3-22`'s two zeros, re-asserted here at `RLD-6` so the carrier cannot grow a path to that instant);
//   · a store-refused repair merges nothing (arm `(d)`, `KC-4`) and a NESTED (three-position) write inside a
//     repair merges nothing (the `kernel.attempts` guard). **Those two guards are driven at the KERNEL's own
//     surface — `RLD-I4`/`RLD-I5` — in
//     `tests/integration/js-constraints/repair-listener-delivery.test.mjs`, and no cell here infers them.**
//
// ── THE TWO HELD HALVES, NAMED AT THE HEAD SO NO ASSERTION BELOW IS READ AS MORE THAN IT IS ──────────────
//
// **`RLD-3`'s `discarded`-WITNESS HALF IS HELD ON `Q-7`.** `D-104` item 2 reads *"the witness (`discarded`)
// reads them as it reads any other discarded raise"*; at the bytes the witness's element is `{opId, addresses}` —
// a discarded REVERSAL REQUEST (`bindings/js/index.mjs`'s `delete` member; `D-49`, `D-75`) — and **no member of
// that shape can carry a listener's HANDLE**, so honouring the sentence would mint a member on a record, which
// `D-104` item 4 forbids. **So `RLD-3` asserts the two observables the failing arm's law does carry — the
// invocation count `0` and `pending`'s emptiness — and RECORDS the witness half at its own `t.diagnostic`,
// together with the assertion it would carry once `Q-7` is answered. Nothing here asserts what the witness
// cannot say.**
//
// **`RLD-7` IS HELD ON `Q-2` ENTIRELY.** A repair during a `delete`'s pass lands on `evaluate`'s repair arm,
// which both attempt kinds share, and the delete's own delivery reads the same record's residue (`§2` `B-5`) —
// so the merge is in the fix BY CONSTRUCTION; **but the architect has not yet CONFIRMED or NARROWED that scope**
// (`§10` `Q-2`: narrowing costs a kind test at the merge), so the cell DRIVES the arm, asserts the DRIVE's own
// coherence (the pair asked at the delete's own instant, the repair run and its op landed, the store left at the
// value the repair wrote), and **RECORDS the delivery it observed without asserting it**.
//
// ── THE INSTRUMENTS, NAMED — AND THE THREE RULES THIS FILE OBEYS ────────────────────────────────────────
// The ENTRY is reached BY PATH (`O4`, `D-6`/`D-7`): no cell here claims the packaged resolution. The KERNEL is
// reached through `bindings/js/src/constraint-kernel.mjs`'s `register`/`commit`/`runAttempt` — the three items
// every kernel drive in this tree uses — and **the kernel's own record is the only place `pending` and
// `triggered` are read**, never a store verb's returned value (`CommitRecord` is `K-2`'s own four-member
// record). A listener is armed through the product's TWO declared acts, `listen(handle, addresses)` and
// `register(handle, listener)` (`D-22`, `D-98`: **the caller spells the handle**), and the invocation's ONE
// argument is the TRIGGERING ADDRESS (`PAR-JS-12`).
//
// **D-17**: the expectation is a literal here and the citation is a comment — no `docs/**` path is opened at
// runtime. **D-21**: every cell prints the readings it took at its own `t.diagnostic`, and a cell that cannot
// reach its arm asserts the drive's coherence FIRST and says so instead of reporting a verdict.
//
// **AND WHAT NO CELL MAY ASSERT, DECLARED BECAUSE IT IS TEMPTING** (`§6`): any order among the merged elements,
// any order among the residue's elements, any per-handle ATTRIBUTION of which act fired a doubly-fired handle,
// or a per-handle address for one. The store's returned list is a set whose order is unspecified (`DD-22`,
// `DD-37`, `AB-3`), so **every reading of `pending` or `triggered` below is a SET reading**.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import {
  commit as kernelCommit,
  register as kernelRegister,
  runAttempt as kernelRunAttempt,
} from '../../bindings/js/src/constraint-kernel.mjs';

/** One store per drive, constructed by the package's own call and by nothing else. */
const make = () => storeCreate({ journalLength: 128, listeners: [] });

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function captured(fn) {
  try {
    return { threw: false, value: fn() };
  } catch (thrown) {
    return { threw: true, thrown };
  }
}

/** The store's own `read`, read as a VALUE so a missing address is a reading and not a crash. */
function read(store, address) {
  const answer = captured(() => store.read(address));
  return answer.threw ? `<${answer.thrown.status}>` : answer.value;
}

/**
 * **THE REGISTRATION-INSTANT SHIELD — `A135` (3) / `contract.md §7.3` (b) state 1, THE HOUSE DEVICE.**
 * A body that carries a `repair` is ATTEMPTED at its own registration (`3-bis`), so an unshielded fixture
 * would spend its repair (and its op, and its `repair-run` entry) on the registration instead of on the pass
 * the cell drives. The shield answers the registration instant — `tier` and `op` BOTH `null`, the one pair of
 * members no landing's context carries together (`kernel-surface.md §2.3` item 1) — with `true`, so the pair
 * is CARRIED, and hands every other context to the cell's own body untouched.
 */
const shield = (body) => (context) => (
  context !== null && typeof context === 'object' && context.tier === null && context.op === null
    ? true
    : body(context)
);

/** The `handle` members of a returned set, read as a SET (`DD-22`: the store's list has no declared order). */
const handlesOf = (set) => set.map((element) => (
  element === null || typeof element !== 'object' ? element : element.handle
));

/** One handle spelling per listener, unique per store — `D-98` clause (i): the caller spells the handle. */
let listenerUid = 0;
function bindListener(store, address, label) {
  listenerUid += 1;
  const handle = `rld-${label}-${process.pid.toString(36)}-${listenerUid}`;
  const seen = [];
  const answered = store.listen(handle, [address]);
  store.register(answered, (triggeringAddress) => seen.push(triggeringAddress));
  return { handle: answered, seen };
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-1` · THE DELIVERY — the defect itself, read as a count of `1` where the unfixed tree answered `0`
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLD-1 · THE DELIVERY — a repair\'s write fires the listener BOUND AT THE REPAIR\'S ADDRESS: the caller sees it invoked EXACTLY ONCE, AFTER the pass, `pending` carries the repair\'s element while `triggered` does not', (t) => {
  // THE DECLARATION'S OWN DRIVE (`§7.1`): *"a pair at `['a']` refuses `2` and its repair writes `3` at `['b']`,
  // where a listener is BOUND; the caller sees it invoked **exactly once**, and the invocation happens **after
  // the pass**"*. THE DEFECT IT CATCHES: `D-104`'s `0` — a build that credits the repair's op and delivers
  // nothing.
  const store = make();
  const address = ['rld1-a'];
  const repairedAddress = ['rld1-b'];
  // THE PRE-STATE, LANDED BY CALLER WRITES AT THREE POSITIONS: a home entry at `['a']` for the commit's own
  // write's address, and one at `['b']` for the address the repair will rewrite.
  store.write(address, 'mem', 1);
  store.write(repairedAddress, 'mem', 1);
  const listener = bindListener(store, repairedAddress, 'rld1-b');
  listener.seen.length = 0; // the seed write above is not this cell's subject

  let repairs = 0;
  let ranAgain = false; // SET BY THE RE-RUN'S OWN ASK, AND READ BY THE LISTENER: the ordering evidence
  let repairWriteHandles = null;
  kernelRegister(store, address, 'rld1-c', shield((context) => {
    if (context.value !== 2) {
      // THE RE-RUN'S ASK — the pass's second evaluation of this pair, at the repair's own op.
      ranAgain = true;
      return true;
    }
    return {
      message: 'the landed value contradicts the pair',
      repair: (repairContext) => {
        repairs += 1;
        // **THE SUPPORTED ROUTE (`D-46`, `D-103`): the repair NAMES its commit at `write`'s FOURTH position, so
        // the write JOINS the attempt's commit and opens no attempt of its own.** `repairContext` is that
        // commit (`§2.3` item 2's sixth member), and the position's class test admits it.
        const written = store.write(repairedAddress, 'mem', 3, repairContext);
        repairWriteHandles = handlesOf(written.triggered);
        return { ok: true, op: written.op };
      },
    };
  }));
  const record = kernelCommit(store, address, 'mem', 2);
  const outcome = captured(() => kernelRunAttempt(store, record));

  // ── (a) THE DRIVE REACHED ITS ARM. ────────────────────────────────────────────────────────────────────
  assert.equal(outcome.threw, false,
    'THE ATTEMPT RESOLVES ON THE PASS ARM — the repair landed and the re-run passed it: the run threw '
      + `${JSON.stringify(outcome.threw ? outcome.thrown.status : null)}`);
  assert.equal(outcome.value.outcome, 'passed',
    `and the outcome is the pass arm — read ${JSON.stringify(outcome.value.outcome)}`);
  assert.equal(repairs, 1, `THE REPAIR MUST HAVE RUN ONCE: ${repairs}`);
  assert.equal(Array.isArray(repairWriteHandles) && repairWriteHandles.includes(listener.handle), true,
    '**AND THE REPAIR\'S WRITE MUST HAVE RETURNED THE LISTENER\'S OWN HANDLE — THE PREMISE OF THE WHOLE CELL** '
      + '(the store\'s descendant-inclusive trigger test; `kernel-surface.md §2.1` item 2): the repair\'s write '
      + `returned ${JSON.stringify(repairWriteHandles)}`);

  // ── (b) THE SUBJECT — ONE INVOCATION, FROM THE COMMIT'S OWN DELIVERY. ─────────────────────────────────
  assert.equal(listener.seen.length, 1,
    '**THE REPAIR\'S LISTENER IS INVOKED EXACTLY ONCE** — `D-104` item 2 (*"The repair\'s write\'s listeners '
      + 'ARE delivered — in the COMMIT\'s delivery, after the pass, with the other listeners"*), one '
      + 'invocation per distinct handle (`surface.md §2.4` rule 3): the caller counted '
      + `${listener.seen.length} invocation(s) — the unfixed build answered 0, which is the defect`);
  assert.deepEqual(listener.seen[0], repairedAddress,
    '**AND THE INVOCATION\'S ONE ARGUMENT IS THE TRIGGERING ADDRESS** (`PAR-JS-12`), which where a repair '
      + 'landed is the repair\'s op address — the leg is the repair\'s write\'s record (`§2` `B-3`, declared '
      + `and not repaired): read ${JSON.stringify(listener.seen[0])}`);
  assert.equal(ranAgain, true,
    '**AND THE INVOCATION STANDS AFTER THE PASS** — the mark the pair\'s own re-run ask set is what the '
      + 'listener read, so the pass\'s second evaluation had happened before the body was reached (`§6`: '
      + '`A112`\'s *"THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY CONSTRAINT HAS PASSED"*, unmoved '
      + 'because the merged set rides the SAME `deliver` call)');

  // ── (c) `pending` CARRIES THE REPAIR'S ELEMENT; `triggered` DOES NOT. ─────────────────────────────────
  assert.deepEqual(handlesOf(record.pending), [listener.handle],
    '**`pending` CARRIES THE REPAIR\'S ELEMENT AND NOTHING ELSE ON THIS COMMIT** — the commit\'s own residue '
      + '(`rld1-c`) was checked off as it passed, and the repair\'s listener stands where the delivery will '
      + 'fire it (`§4`: *"`pending` is the list of handles the pass did not evaluate"*, and a listener the '
      + 'repair\'s write fired is exactly such a handle) — read '
      + `${JSON.stringify(handlesOf(record.pending))}`);
  assert.equal(handlesOf(record.triggered).includes(listener.handle), false,
    '**AND `triggered` IS UNMOVED: it stays THE STORE\'S OWN RETURNED SET FOR THE COMMIT\'S WRITE, VERBATIM** '
      + '(`§2` `B-6`; `A112`: *"`triggered` then stands as the store\'s own returned set"*) — the repair\'s set '
      + 'is NOT written into it, because a package that wrote a second act\'s handles there would be forging a '
      + `store result: read ${JSON.stringify(handlesOf(record.triggered))}`);
  assert.deepEqual(record.pending.map((entry) => entry.address), [repairedAddress],
    'and the element\'s `address` is THE ADDRESS THE LISTENER WAS BOUND AT (`guide §6.4`; the surface\'s own '
      + 'reading of a `triggered` element), never the act\'s — the one datum `PAR-JS-12` forbids as the '
      + `invocation's argument — read ${JSON.stringify(record.pending.map((entry) => entry.address))}`);

  t.diagnostic(`RLD-1 · THE DELIVERY: the repair wrote at ${JSON.stringify(repairedAddress)} and its returned `
    + `set read ${JSON.stringify(repairWriteHandles)}; the bound listener was invoked `
    + `${listener.seen.length}× with ${JSON.stringify(listener.seen)}; the re-run's ask preceded it `
    + `(${ranAgain}); \`pending\` = ${JSON.stringify(handlesOf(record.pending))} and \`triggered\` = `
    + `${JSON.stringify(handlesOf(record.triggered))}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-2` · THE DOUBLY-FIRED HANDLE — one invocation and ONE member element, where a merge without the
// member's de-duplication would have made a caller's own loop run the body twice
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLD-2 · THE DOUBLY-FIRED HANDLE — a listener fired by BOTH the commit\'s own write and the repair\'s edit is invoked ONCE and stands in `pending` ONCE', (t) => {
  // THE DECLARATION'S OWN DRIVE (`§7.1`): *"one listener bound at `['a']` is fired by **both** the original
  // write and the repair's edit (the repair rewrites `['a']`): **invoked once**, and `pending` carries **one**
  // element for that handle"*. THE FAILURE IT CATCHES: **a merge that appends without the member's own
  // de-duplication (`§3.4`)** — `deliver`'s rule 3 de-duplicates the array it is HANDED, and `pending` is also
  // THE CALLER'S OWN WORK LIST (`A112`), so a member carrying one handle twice would run that body twice.
  const store = make();
  const address = ['rld2-a'];
  store.write(address, 'mem', 1);
  const listener = bindListener(store, address, 'rld2-a');
  listener.seen.length = 0;

  let repairs = 0;
  let repairWriteHandles = null;
  kernelRegister(store, address, 'rld2-c', shield((context) => {
    if (context.value !== 2) return true;
    return {
      message: 'the landed value contradicts the pair',
      repair: (repairContext) => {
        repairs += 1;
        // THE REPAIR REWRITES THE COMMIT'S OWN ADDRESS, so the same listener is fired a second time.
        const written = store.write(address, 'mem', 3, repairContext);
        repairWriteHandles = handlesOf(written.triggered);
        return { ok: true, op: written.op };
      },
    };
  }));
  const record = kernelCommit(store, address, 'mem', 2);

  // ── (a) THE PREMISE: BOTH ACTS FIRED THE ONE HANDLE. ──────────────────────────────────────────────────
  assert.equal(handlesOf(record.triggered).includes(listener.handle), true,
    '**THE COMMIT\'S OWN WRITE RETURNED THE LISTENER\'S HANDLE** — so the residue carries it before any '
      + `repair: read ${JSON.stringify(handlesOf(record.triggered))}`);
  const outcome = captured(() => kernelRunAttempt(store, record));
  assert.equal(outcome.threw, false,
    `the attempt resolves on the pass arm (threw ${JSON.stringify(outcome.threw ? outcome.thrown.status : null)})`);
  assert.equal(repairs, 1, `THE REPAIR RAN ONCE: ${repairs}`);
  assert.equal(Array.isArray(repairWriteHandles) && repairWriteHandles.includes(listener.handle), true,
    '**AND THE REPAIR\'S WRITE RETURNED IT A SECOND TIME — THE DOUBLY-FIRED STATE IS MEASURED AND NOT '
      + `ASSUMED**: the repair's write returned ${JSON.stringify(repairWriteHandles)}`);

  // ── (b) THE SUBJECT: ONE INVOCATION, ONE MEMBER ELEMENT. ──────────────────────────────────────────────
  assert.equal(listener.seen.length, 1,
    '**THE DOUBLY-FIRED HANDLE IS INVOKED ONCE** — `deliver`\'s rule 3 (*"one function per DISTINCT '
      + '`entry.handle` … at the element\'s FIRST occurrence"*, `surface.md §2.4`): the caller counted '
      + `${listener.seen.length} invocation(s) — a second window or a second element would answer 2`);
  assert.equal(record.pending.filter((entry) => entry.handle === listener.handle).length, 1,
    '**AND THE MEMBER CARRIES ONE ELEMENT FOR THAT HANDLE — the merge\'s OWN de-duplication (`§3.4`), a SECOND '
      + 'rule with a SECOND ground** (`pending` is *also* the caller\'s own work list, `A112`): the member read '
      + `${JSON.stringify(handlesOf(record.pending))}`);
  assert.deepEqual(handlesOf(record.pending), [listener.handle],
    'and nothing else stands beside it on this commit — the pair\'s own handle left by its check-off and no '
      + `pair\'s id was merged (\`§3.3\`): read ${JSON.stringify(handlesOf(record.pending))}`);

  t.diagnostic(`RLD-2 · THE DOUBLY-FIRED HANDLE: the commit's write returned ${JSON.stringify(handlesOf(record.triggered))}; `
    + `the repair's rewrite returned ${JSON.stringify(repairWriteHandles)}; invocations = ${listener.seen.length}; `
    + `\`pending\` = ${JSON.stringify(handlesOf(record.pending))} (one element for the one handle)`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-3` · THE FAILING ARM — a repair that LANDED and was then refused delivers NOTHING
// (`RLD-3`'s `discarded`-witness half is HELD on `Q-7` and is RECORDED, never asserted)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLD-3 · THE FAILING ARM — a second pair refuses at the re-run: the repair\'s listener is NOT invoked (`0`), the store is restored, and `pending` holds no handle of either set', (t) => {
  // THE DECLARATION'S OWN DRIVE (`§7.1`): *"a second pair refuses at the re-run; the repair's listener is **not
  // invoked** (`0`), the store is restored, `pending` holds **no handle of either set**"*. THE FAILURE IT
  // CATCHES: **a fix that delivers a discarded set** — the failure the deltamodel unit's own clause already
  // names (`§5`: *"a merge without the widened discard would deliver a discarded set on every failing repaired
  // attempt"*).
  const store = make();
  const address = ['rld3-a'];
  const repairedAddress = ['rld3-b'];
  store.write(address, 'mem', 1);
  store.write(repairedAddress, 'mem', 1);
  const listener = bindListener(store, repairedAddress, 'rld3-b');
  listener.seen.length = 0;

  let repairs = 0;
  const repairWriteSets = [];
  kernelRegister(store, address, 'rld3-c1', shield((context) => {
    if (context.value !== 2) return true;
    return {
      message: 'the landed value contradicts the pair',
      repair: (repairContext) => {
        repairs += 1;
        const written = store.write(repairedAddress, 'mem', 3, repairContext);
        repairWriteSets.push(handlesOf(written.triggered));
        return { ok: true, op: written.op };
      },
    };
  }));
  // THE SECOND PAIR REFUSES **AFTER** THE REPAIR LANDED — at the re-run's op, on the value the repair wrote —
  // and registers no repair, so the re-run takes the first-violation arm and the attempt fails.
  kernelRegister(store, address, 'rld3-c2', shield((context) => (
    context.value === 3 ? { message: 'the repaired value contradicts the second pair' } : true
  )));
  const record = kernelCommit(store, address, 'mem', 2);
  const outcome = captured(() => kernelRunAttempt(store, record));

  // ── (a) THE DRIVE REACHED ITS ARM: THE REPAIR LANDED AND THE RE-RUN THEN REFUSED. ─────────────────────
  assert.equal(outcome.threw, true,
    '**THE ATTEMPT FAILS AT THE RE-RUN** — the second pair refuses the value the repair landed: the run '
      + `RETURNED ${JSON.stringify(outcome.threw ? null : outcome.value.outcome)}`);
  assert.equal(outcome.thrown.status, 'KC-3',
    'and it fails on the first-violation arm `(c)` — read '
      + `${JSON.stringify(outcome.thrown.status)} / ${JSON.stringify(outcome.thrown.message)}`);
  assert.equal(repairs, 1, `THE REPAIR MUST HAVE LANDED BEFORE THE REFUSAL: ${repairs}`);
  assert.equal(repairWriteSets.length === 1 && repairWriteSets[0].includes(listener.handle), true,
    '**AND THE REPAIR\'S WRITE RETURNED THE LISTENER\'S HANDLE — so a set the merge WOULD have carried '
      + `EXISTED**: read ${JSON.stringify(repairWriteSets)}`);

  // ── (b) THE SUBJECT: THE FAILING ARM DELIVERS NOTHING. ────────────────────────────────────────────────
  assert.equal(listener.seen.length, 0,
    '**THE REPAIR\'S LISTENER IS INVOKED ZERO TIMES** — *"a failed attempt\'s delivery is EMPTY"* '
      + '(`surface.md §2.7` item 6; `§5`): the merge put the element in the member, the widened discard took '
      + 'it out, and the terminal arm\'s `deliver` was handed an empty set: the caller counted '
      + `${listener.seen.length} invocation(s)`);
  assert.deepEqual(handlesOf(record.pending), [],
    '**AND `pending` HOLDS NO HANDLE OF EITHER SET** — the failed write\'s own returned set AND this attempt\'s '
      + 'repair\'s set both leave by the discard (`§5`: *"the union of the failed write\'s returned set and the '
      + 'sets this attempt\'s repairs\' writes returned"*) — read '
      + `${JSON.stringify(handlesOf(record.pending))}`);
  assert.deepEqual([...handlesOf(record.triggered)].sort(), ['rld3-c1', 'rld3-c2'],
    'and `triggered` STANDS VERBATIM AS THE STORE\'S OWN RETURNED SET THROUGH THE ARM — the discard reaches the '
      + `MEMBER and never the store\'s answer: read ${JSON.stringify(handlesOf(record.triggered))}`);
  assert.deepEqual(read(store, address), 1,
    '**AND THE STORE IS RESTORED** (`D-40`: *"a failed attempt leaves the store exactly as it found it"*) — '
      + `\`read(['rld3-a'])\` answers ${JSON.stringify(read(store, address))} where the refused value was 2`);
  assert.deepEqual(read(store, repairedAddress), 1,
    'and the repair\'s own landing at the beside address is rolled back with the commit it joined — '
      + `\`read(['rld3-b'])\` answers ${JSON.stringify(read(store, repairedAddress))} where the repair wrote 3`);

  // ── (c) THE WITNESS HALF: **HELD ON `Q-7`** — RECORDED, NEVER ASSERTED. ──────────────────────────────
  //
  // `D-104` item 2's second half reads *"the witness (`discarded`) reads them as it reads any other discarded
  // raise"*, and **AT THE BYTES IT CANNOT**: the witness is the `delete` member's non-enumerable `discarded`
  // member (`bindings/js/index.mjs`), whose element is `{opId, addresses}` — the id a discarded REVERSAL
  // REQUEST named and the addresses the refused act MOVED (`D-49`; `D-75`; `DEF-AM`) — **and a listener HANDLE
  // has no member in that shape into which it could be written**, a failed WRITE's arm reaching no such record
  // at all. **SO THIS CELL ASSERTS NEITHER ITS PRESENCE NOR ITS ABSENCE**; the readings are printed below so
  // the half is legible and the hold is a recorded state rather than a silence:
  //   · WHEN `Q-7` IS ANSWERED AS `(i)` — the sentence read as THE FAILING ARM'S LAW and not as a member's
  //     promise — **this cell's assertion is exactly the two it already makes: `0` invocations and an empty
  //     `pending`**, and no witness reading is added;
  //   · WHEN `Q-7` IS ANSWERED AS `(ii)` — a handle witness minted — **the assertion would be that the witness
  //     names the listener's handle**, which would require a member `D-104` item 4 forbids;
  //   · WHEN `Q-7` IS ANSWERED AS `(iii)` — the handles in the existing witness — **the assertion would be one
  //     entry whose `opId` is the repair's op**, which the witness's own meaning (*"what moved"*) refuses.
  // **NO ASSERTION IS WEAKENED BY THE HOLD: NOTHING HERE CLAIMS WHAT THE WITNESS CANNOT SAY.**
  const thrownMembers = Object.keys(outcome.thrown).sort();
  t.diagnostic(`RLD-3 · THE FAILING ARM (its \`discarded\`-witness half HELD on \`Q-7\`): the repair landed an op `
    + `whose returned set read ${JSON.stringify(repairWriteSets)}, the re-run refused with `
    + `${JSON.stringify(outcome.thrown.status)}, invocations = ${listener.seen.length}, \`pending\` = `
    + `${JSON.stringify(handlesOf(record.pending))}, the store back at `
    + `${JSON.stringify([read(store, address), read(store, repairedAddress)])}. **THE HELD HALF, RECORDED**: the `
    + `thrown form's members read ${JSON.stringify(thrownMembers)} — a failed WRITE's arm carries NO `
    + `\`discarded\` member at all (the witness lives on the \`delete\` member's record and its element is `
    + `\`{opId, addresses}\`, a discarded reversal request), so *"the witness reads them"* has no member to be `
    + `written into. WHEN \`Q-7\` IS ANSWERED, the assertion owed here is the one the answer names — under `
    + `\`(i)\` NOTHING is added and these two observables ARE the law`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-4` · THE SEAT — the listeners are invoked NEITHER inside the repair body NOR inside the pass
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLD-4 · THE SEAT — the repair\'s listener is invoked NEITHER inside the repair body NOR inside the pass: the counter at the repair\'s return is `0`, the counter at the re-run\'s ask is `0`, and the body reads the re-run\'s own mark', (t) => {
  // THE DECLARATION'S OWN DRIVE (`§7.1`): *"a listener body that reads `store.read(['a'])` sees the post-re-run
  // value, and a counter read at the repair body's return is `0`"*. THE FAILURE IT CATCHES: **an in-window
  // invocation** — the withheld instant `A116`/`A115` withdrew, which would make the delivery run a body
  // BEFORE every constraint of the attempt had passed (`A112`).
  const store = make();
  const address = ['rld4-a'];
  const repairedAddress = ['rld4-b'];
  store.write(address, 'mem', 1);
  store.write(repairedAddress, 'mem', 1);
  const listener = bindListener(store, repairedAddress, 'rld4-b');
  listener.seen.length = 0;
  // THE MARK THE RE-RUN SETS — the one datum that can tell "after the pass" from "inside the pass".
  const reRunMark = { set: false };
  let atTheRepairsReturn = null;
  let atTheReRunsAsk = null;
  const readingAtTheInvocation = [];
  store.register(listener.handle, (triggeringAddress) => {
    listener.seen.push(triggeringAddress);
    readingAtTheInvocation.push({
      reRan: reRunMark.set,
      repairedValue: read(store, repairedAddress),
      committedValue: read(store, address),
    });
  });

  let repairs = 0;
  kernelRegister(store, address, 'rld4-c', shield((context) => {
    if (context.value !== 2) {
      reRunMark.set = true;
      // THE SECOND COUNTER INSTANT: the pass's own re-run, reading the listener's count from inside a BODY.
      atTheReRunsAsk = listener.seen.length;
      return true;
    }
    return {
      message: 'the landed value contradicts the pair',
      repair: (repairContext) => {
        repairs += 1;
        const written = store.write(repairedAddress, 'mem', 3, repairContext);
        // THE FIRST COUNTER INSTANT: the repair body's own return.
        atTheRepairsReturn = listener.seen.length;
        return { ok: true, op: written.op };
      },
    };
  }));
  const record = kernelCommit(store, address, 'mem', 2);
  const outcome = captured(() => kernelRunAttempt(store, record));

  assert.equal(outcome.threw, false,
    `THE ATTEMPT RESOLVES ON THE PASS ARM (threw ${JSON.stringify(outcome.threw ? outcome.thrown.status : null)})`);
  assert.equal(repairs, 1, `THE REPAIR RAN ONCE: ${repairs}`);

  assert.equal(atTheRepairsReturn, 0,
    '**NO INVOCATION STANDS AT THE REPAIR BODY\'S RETURN** — the merged element is appended AFTER the body '
      + 'returned and the credit was confirmed (`§3.4`: *"AFTER THE CREDIT, BEFORE THE RE-RUN"*), so a body '
      + `counting at its own return reads \`0\`: read ${atTheRepairsReturn}`);
  assert.equal(atTheReRunsAsk, 0,
    '**AND NO INVOCATION STANDS INSIDE THE PASS** — the re-run\'s own ask counts `0`, so the delivery is not '
      + `one of the pass's own acts (\`A112\`; §6): read ${atTheReRunsAsk}`);
  assert.equal(listener.seen.length, 1,
    `**AND THE INVOCATION DOES HAPPEN — ONCE — AFTER BOTH INSTANTS**: ${listener.seen.length}`);
  assert.equal(readingAtTheInvocation.length === 1 && readingAtTheInvocation[0].reRan, true,
    '**THE ORDERING IS READ AT THE BODY ITSELF**: the listener read the mark the pair\'s RE-RUN ask set, so '
      + 'every constraint of the attempt had passed before the body was reached — *"every constraint of the '
      + `attempt has passed before any merged listener is invoked, by construction"* (§6): read `
      + `${JSON.stringify(readingAtTheInvocation)}`);
  assert.deepEqual(
    readingAtTheInvocation.length === 1
      ? [readingAtTheInvocation[0].repairedValue, readingAtTheInvocation[0].committedValue]
      : [],
    [3, 2],
    '**AND THE BODY SEES THE POST-RE-RUN STATE**: `read([\'rld4-b\'])` answers the repair\'s landed `3` and '
      + '`read([\'rld4-a\'])` the commit\'s own `2` — neither read is a pre-repair image, which is the '
      + 'failure an in-window invocation would produce — read '
      + `${JSON.stringify(readingAtTheInvocation)}`);

  t.diagnostic(`RLD-4 · THE SEAT: invocations at the repair body's return = ${atTheRepairsReturn}, at the `
    + `re-run's ask = ${atTheReRunsAsk}, at the end = ${listener.seen.length}; the body read `
    + `${JSON.stringify(readingAtTheInvocation)}; the repair's op address = `
    + `${JSON.stringify(listener.seen[0])}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-5` · `pending`'S RE-DERIVATION — the element type, the member's de-duplication, and `pending ⊄ triggered`
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLD-5 · `pending`\'S RE-DERIVATION — every element is the pair `{handle, address}`, the member keeps ONE element per handle across a repair\'s TWO writes, and `pending` is NOT a subset of `triggered`', (t) => {
  // THE DECLARATION'S OWN DRIVE (`§7.1`): *"at the commit's return `pending` carries the repair's listener's
  // element beside the residue's, **each element is the pair `{handle, address}`** (`TF-1`), and **`triggered`
  // is unmoved** (`pending ⊄ triggered` after a repair, `§4`)"*. THE FAILURES IT CATCHES: **a merge into
  // `triggered`**, or **a bare handle** (`TF-7`) — and, in the two-write body, **an append without the
  // member's de-duplication**.
  const store = make();
  const address = ['rld5-a'];
  const repairedAddress = ['rld5-b'];
  store.write(address, 'mem', 1);
  store.write(repairedAddress, 'mem', 1);
  const listener = bindListener(store, repairedAddress, 'rld5-b');
  listener.seen.length = 0;

  let repairs = 0;
  const writeSets = [];
  kernelRegister(store, address, 'rld5-c', shield((context) => {
    if (context.value !== 2) return true;
    return {
      message: 'the landed value contradicts the pair',
      repair: (repairContext) => {
        repairs += 1;
        // **TWO WRITES IN ONE REPAIR, BOTH FIRING THE SAME LISTENER** — the state the carrier must not lose
        // (`§3.2`: *"A REPAIR THAT MAKES TWO WRITES LOSES NOTHING"*) and the state the member's de-duplication
        // exists for (`§3.4`): the invocation's OWN leg list carries the handle twice.
        const first = store.write(repairedAddress, 'mem', 3, repairContext);
        writeSets.push(handlesOf(first.triggered));
        const second = store.write(repairedAddress, 'mem', 4, repairContext);
        writeSets.push(handlesOf(second.triggered));
        return { ok: true, op: second.op };
      },
    };
  }));
  const record = kernelCommit(store, address, 'mem', 2);
  const outcome = captured(() => kernelRunAttempt(store, record));
  assert.equal(outcome.threw, false,
    `THE ATTEMPT RESOLVES ON THE PASS ARM (threw ${JSON.stringify(outcome.threw ? outcome.thrown.status : null)})`);
  assert.equal(repairs, 1, `THE REPAIR RAN ONCE: ${repairs}`);
  assert.equal(writeSets.length === 2 && writeSets.every((set) => set.includes(listener.handle)), true,
    '**BOTH OF THE REPAIR\'S WRITES RETURNED THE LISTENER\'S HANDLE — so the leg list carried it TWICE**: read '
      + `${JSON.stringify(writeSets)}`);

  // ── (a) THE ELEMENT TYPE — the member's declared pair, read BEFORE the membership (`TF-1`) ─────────────
  assert.equal(record.pending.length >= 1, true,
    `\`pending\` must carry the repair's element (\`§4\`): read ${JSON.stringify(handlesOf(record.pending))}`);
  for (const entry of record.pending) {
    assert.deepEqual(Object.keys(entry).sort(), ['address', 'handle'],
      '**EVERY `pending` ELEMENT CARRIES EXACTLY THE PAIR\'S TWO MEMBERS** — *"the member keeps its element '
      + 'type `{handle, address}`"* (`§3.4`; `TF-1`; `trigger-and-pair.md §1`; `contract.md §2.5` item 2\'s '
      + `totality) — read ${JSON.stringify(Object.keys(entry).sort())}`);
    assert.equal(typeof entry.handle, 'string',
      'and the `handle` member is the caller-spelled identity, never a bare handle standing in the member '
      + `(\`TF-7\`): read ${JSON.stringify(typeof entry.handle)}`);
  }

  // ── (b) THE DE-DUPLICATION — ONE element for the doubly-returned handle. ──────────────────────────────
  assert.equal(record.pending.filter((entry) => entry.handle === listener.handle).length, 1,
    '**THE MEMBER KEEPS ONE ELEMENT PER HANDLE ACROSS A REPAIR\'S TWO WRITES** (`§3.4`: *"an element whose '
      + '`handle` already stands in `pending` is not appended"*) — the append is by `appendOwn` and the test is '
      + 'against the member\'s CURRENT handles: read '
      + `${JSON.stringify(handlesOf(record.pending))}`);
  assert.equal(listener.seen.length, 1,
    'and the DELIVERY answers the same reading — one invocation, because the array it is handed carries the '
      + `handle once (\`surface.md §2.4\` rule 3): ${listener.seen.length}`);

  // ── (c) `pending ⊄ triggered` — the asymmetry, declared and NOT repaired (`§4`). ──────────────────────
  const triggeredHandles = handlesOf(record.triggered);
  const pendingHandles = handlesOf(record.pending);
  assert.deepEqual(triggeredHandles, ['rld5-c'],
    '**`triggered` IS THE COMMIT\'S OWN WRITE\'S RETURNED SET, VERBATIM** (`§2` `B-6`) — the repair\'s handles '
      + `are NOT written into it: read ${JSON.stringify(triggeredHandles)}`);
  assert.equal(pendingHandles.every((handle) => triggeredHandles.includes(handle)), false,
    '**AND `pending` IS NOT A SUBSET OF `triggered` AFTER A REPAIR** — *"`triggered` stays the commit\'s own '
      + 'write\'s returned set and the merged elements are a second act\'s"* (`§4`; the asymmetry is DECLARED, '
      + `not repaired) — read pending ${JSON.stringify(pendingHandles)} of triggered `
      + `${JSON.stringify(triggeredHandles)}`);
  assert.deepEqual(pendingHandles, [listener.handle],
    'and the member\'s whole population on this commit is the repair\'s one listener element — the residue\'s '
      + `own pair left by its check-off: read ${JSON.stringify(pendingHandles)}`);

  t.diagnostic(`RLD-5 · \`pending\`'S RE-DERIVATION: the repair's two write sets read ${JSON.stringify(writeSets)}; `
    + `\`pending\` = ${JSON.stringify(record.pending.map((entry) => ({ handle: entry.handle, address: entry.address })))}; `
    + `\`triggered\` = ${JSON.stringify(triggeredHandles)}; invocations = ${listener.seen.length}; `
    + `\`pending ⊄ triggered\` = ${!pendingHandles.every((handle) => triggeredHandles.includes(handle))}`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-6` · THE REGISTRATION INSTANT IS UNMOVED — `G3-22`'s TWO ZEROS, RE-ASSERTED HERE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLD-6 · THE REGISTRATION INSTANT IS UNMOVED — a repair at `addConstraint`\'s evaluation delivers NOTHING: the watcher pair\'s ask-count and the listener\'s invocation-count both rise by ZERO, beside a live control', (t) => {
  // THE DECLARATION'S OWN DRIVE (`§7.1`): *"a repair at `addConstraint`'s evaluation delivers **nothing**
  // (`G3-22`'s zero, re-asserted in this file so the fix cannot widen quietly)"* — and `§3.6` cost 4 gives the
  // STRUCTURAL reason: **a registration's synthetic attempt carries no `record` member**, so the merge has no
  // member to write. THE FAILURE IT CATCHES: **a carrier that fires outside a commit's arm**.
  const store = make();
  const watchedAddress = ['rld6-b'];
  store.write(watchedAddress, 'mem', 1);
  // THE WATCHER PAIR stands at the exact address the repair's route-write will land at, and passes every value
  // but one sentinel, so its own registration stands (`§7.3` (b) state 1).
  let watcherAsks = 0;
  store.addConstraint({ address: watchedAddress, id: 'rld6-watch' }, (context) => {
    watcherAsks += 1;
    return context.value === 'never-this' ? { message: 'the watcher refuses a sentinel' } : true;
  });
  const listener = bindListener(store, watchedAddress, 'rld6-b');
  listener.seen.length = 0;
  const watcherBefore = watcherAsks;
  const listenerBefore = listener.seen.length;

  let repairs = 0;
  let routeReturned = null;
  let routeOp = null;
  const added = captured(() => store.addConstraint({ address: ['rld6-a'], id: 'rld6-a' }, (context) => {
    // THE PAIR IS ASKED AT ITS REGISTRATION WITH THE STORE'S CURRENT VALUE (`kernel-surface.md §2.3` item 1's
    // registration clause: `tier` and `op` both `null`, `value` READ and not landed) — the arm this drive needs.
    if (context.value !== undefined) return true;
    return {
      message: 'the address holds nothing',
      repair: (repairContext) => {
        repairs += 1;
        // **THE REGISTRATION'S OWN WRITE ROUTE — `D-91` (2)'s three positions, `PIN-6`:** the commit is the
        // registration's own and is NOT a position of it, so this is the only route a repair has at this
        // instant.
        const written = repairContext.write(watchedAddress, 'mem', 99);
        routeReturned = handlesOf(written.triggered);
        routeOp = written.op.opId;
        return { ok: true, op: written.op };
      },
    };
  }));
  const watcherDelta = watcherAsks - watcherBefore;
  const listenerDelta = listener.seen.length - listenerBefore;

  // ── (a) THE DRIVE REACHED ITS ARM. ────────────────────────────────────────────────────────────────────
  assert.equal(restoredShape(added), 'object',
    '**THE REGISTRATION MUST BE TAKEN** — the repair\'s landing answers the re-run, and no refusal is this '
      + `cell's subject: the call ${added.threw ? `threw ${JSON.stringify(added.thrown.status || added.thrown.constructor.name)}` : 'returned a value'}`);
  assert.equal(repairs, 1, `THE REPAIR MUST HAVE RUN AT THE REGISTRATION INSTANT: ${repairs}`);
  assert.equal(routeOp !== null && typeof routeOp === 'string', true,
    `and its route-write landed an op: ${JSON.stringify(routeOp)}`);
  assert.equal(Array.isArray(routeReturned) && routeReturned.includes(listener.handle), true,
    '**AND THAT WRITE RETURNED THE BOUND LISTENER\'S OWN HANDLE — so a set the delivery COULD have fired '
      + `EXISTED at this instant**: read ${JSON.stringify(routeReturned)}`);

  // ── (b) THE TWO ZEROS, RE-ASSERTED. ───────────────────────────────────────────────────────────────────
  assert.equal(watcherDelta, 0,
    '**THE WATCHER PAIR AT THE REPAIR\'S OWN ADDRESS IS ASKED ZERO TIMES ACROSS THE ROUTE-WRITE** — the route '
      + 'runs no pass of its own (`PIN-6` (v); `D-53`\'s join): the watcher\'s count rose by '
      + `${watcherDelta}, from ${watcherBefore} to ${watcherAsks}`);
  assert.equal(listenerDelta, 0,
    '**AND NO LISTENER FIRES ACROSS IT** (`PIN-6` (v): *"delivers no listener"*): the witness bound at the '
      + `register fired ${listenerDelta} time(s) across the repair's route-write — this is \`G3-22\`'s second `
      + 'zero, re-asserted because it is THE MECHANISM\'S STRUCTURAL CONSTRAINT: a registration\'s synthetic '
      + 'attempt carries no `record`, so the merge has no member to write (`§3.6` cost 4)');

  // ── (c) THE CONTROL — THE TWO ZEROS ARE LIVE ZEROS. ───────────────────────────────────────────────────
  const controlListenerBefore = listener.seen.length;
  const controlWatcherBefore = watcherAsks;
  const control = captured(() => store.write(watchedAddress, 'mem', 7));
  assert.equal(control.threw, false,
    '**THE CONTROL WRITE MUST LAND**, or the instruments above were never armed: '
      + `${JSON.stringify(control.threw ? control.thrown.status : null)}`);
  assert.equal(listener.seen.length - controlListenerBefore >= 1, true,
    '**AND AN ORDINARY WRITE AT THAT ADDRESS DOES FIRE THE LISTENER** — so the zero above is the route\'s '
      + `absence of a delivery and not a dead binding: the control fired it `
      + `${listener.seen.length - controlListenerBefore} time(s)`);
  assert.equal(watcherAsks - controlWatcherBefore >= 1, true,
    '**AND IT DOES ASK THE WATCHER PAIR** — so the other zero is a live zero too: the control raised the '
      + `watcher's count by ${watcherAsks - controlWatcherBefore}`);

  t.diagnostic(`RLD-6 · THE REGISTRATION INSTANT (G3-22's two zeros re-asserted): the repair's route-write at `
    + `${JSON.stringify(watchedAddress)} landed ${JSON.stringify(routeOp)} and returned `
    + `${JSON.stringify(routeReturned)}; the watcher moved by ${watcherDelta} and the listener by `
    + `${listenerDelta}; the control write moved them by `
    + `${JSON.stringify([listener.seen.length - controlListenerBefore, watcherAsks - controlWatcherBefore])}`);
});

/** The class of a captured answer, as a readable value (`object` for the registration's own pair record). */
function restoredShape(answer) {
  if (answer.threw) return 'threw';
  return answer.value === null ? 'null' : typeof answer.value;
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-7` · THE DELETE-SHAPED COMMIT — **HELD ON `Q-2`**: DRIVEN, COHERENT, AND ITS DELIVERY RECORDED
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLD-7 · THE DELETE-SHAPED COMMIT (HELD on `Q-2`) — a repair during a `delete`\'s pass runs and lands; its delivery is RECORDED and NOT asserted until the scope is confirmed or narrowed', (t) => {
  // **THE HOLD, STATED AT THE CELL.** `§2` `B-5`: *"the merge of §3 sits on `evaluate`'s repair arm, which both
  // attempt kinds share, so a repair during a delete's pass is delivered by the delete's own delivery with no
  // byte of that member moving"* — that is the fix's SCOPE CONSEQUENCE, and `§10` `Q-2` puts it to the
  // architect: **confirm it, or narrow it with a kind test at the merge.** So this cell asserts THE DRIVE'S OWN
  // COHERENCE — the pair asked at the delete's instant, the repair run once, its op landed, the store left where
  // the repair wrote it — and **RECORDS the invocation count it observed. WHAT WOULD BE ASSERTED WHEN `Q-2` IS
  // ANSWERED IN THE AFFIRMATIVE: that the repair's listener was invoked EXACTLY ONCE, by the delete's own
  // delivery, after the delete's pass — i.e. `listener.seen.length === 1` beside the four assertions this cell
  // already makes. Under a NARROWING answer the same reading is asserted as `0`, and the narrowing's price (a
  // kind test at the merge) is the declaration's to price, not this cell's.**
  const store = make();
  const address = ['rld7-a'];
  const repairedAddress = ['rld7-b'];
  store.write(address, 'mem', 5);
  store.write(repairedAddress, 'mem', 1);
  const listener = bindListener(store, repairedAddress, 'rld7-b');
  listener.seen.length = 0;

  let repairs = 0;
  let repairReturned = null;
  const asks = [];
  kernelRegister(store, address, 'rld7-c', shield((context) => {
    asks.push({ tier: context.tier === undefined ? null : context.tier, value: context.value });
    // THE PAIR CONFIRMS EVERY LANDING AND REFUSES ONLY THE STATE THE DELETE LEAVES — the absent value.
    if (context.value !== undefined) return true;
    return {
      message: 'the address holds nothing after the delete',
      repair: (repairContext) => {
        repairs += 1;
        const written = store.write(repairedAddress, 'mem', 9, repairContext);
        repairReturned = handlesOf(written.triggered);
        return { ok: true, op: written.op };
      },
    };
  }));
  const deletion = captured(() => store.delete(address, 'mem'));

  // ── (a) THE DRIVE'S COHERENCE — asserted, and it is not the held half. ────────────────────────────────
  assert.equal(deletion.threw, false,
    '**THE DELETE ITSELF MUST RUN** — `D-55` item 3 gave it an attempt and `commitRemoval` mints the same '
      + `record: the call threw ${JSON.stringify(deletion.threw ? deletion.thrown.status : null)}`);
  assert.deepEqual(Object.keys(deletion.value).sort(), ['address', 'op', 'tiers', 'triggered'],
    'and it answers its own four-member receipt — the delete\'s record\'s `discarded` member is '
      + `NON-ENUMERABLE and no enumerable member moves (\`D-49\`): read `
      + `${JSON.stringify(Object.keys(deletion.value).sort())}`);
  assert.equal(repairs, 1,
    '**AND THE PASS ASKED THE PAIR AND ITS REPAIR RAN ONCE** — the ask reached the pair at the delete\'s own '
      + `instant (\`D-55\` item 3's pass) and its repair was invoked: read ${repairs}`);
  assert.equal(repairReturned !== null && repairReturned.includes(listener.handle), true,
    'and the repair\'s write returned the bound listener\'s own handle, so the set the merge would carry '
      + `EXISTED on this arm: read ${JSON.stringify(repairReturned)}`);
  assert.deepEqual(read(store, repairedAddress), 9,
    'and the repair\'s landing stands in the store, which is the delete\'s commit having carried it: '
      + `\`read(['rld7-b'])\` = ${JSON.stringify(read(store, repairedAddress))}`);

  // ── (b) THE HELD HALF — RECORDED, NOT ASSERTED (`Q-2`). ──────────────────────────────────────────────
  t.diagnostic(`RLD-7 · THE DELETE-SHAPED COMMIT (**HELD on \`Q-2\`**): \`delete(['rld7-a'],'mem')\` answered `
    + `${JSON.stringify(Object.keys(deletion.value).sort())}; the pair was asked `
    + `${asks.length}× with ${JSON.stringify(asks)}; the repair ran ${repairs}× and its write returned `
    + `${JSON.stringify(repairReturned)}; \`read(['rld7-b'])\` = ${JSON.stringify(read(store, repairedAddress))}; `
    + `**RECORDED AND NOT ASSERTED — the invocation count on the delete's own delivery = `
    + `${listener.seen.length}** (with ${JSON.stringify(listener.seen)}). WHEN \`Q-2\` IS ANSWERED IN THE `
    + `AFFIRMATIVE this cell asserts \`listener.seen.length === 1\` — one invocation, by the delete's own `
    + `delivery, after its pass; under a narrowing answer it asserts \`0\``);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLD-8` · THE TWO-REPAIR COMMIT — both repair listeners invoked once each
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLD-8 · THE TWO-REPAIR COMMIT — two pairs violate in turn and two repairs land: BOTH repair listeners are invoked ONCE EACH', (t) => {
  // THE DECLARATION'S OWN DRIVE (`§7.1`): *"two pairs violate in turn and **two** repairs land (`P-SM-5`'s
  // shape, with listeners added): **both** listeners are invoked once"*. THE FAILURE IT CATCHES: **any
  // single-slot carrier** — the hazard `§3.6` (b) 2 prices (a `state.leg`-shaped slot erases the first
  // repair's set on exactly this fixture), which is why the carrier is the INVOCATION's own leg list.
  //
  // THE CHAIN IS `P-SM-5`'s OWN: pair `j` passes on a landed rank `>= j` and its repair lands the rank `j`, so
  // the pass walks `broken -> 0 -> 1` — ONE REPAIR WRITE PER PAIR — and each repair writes at ITS OWN listener's
  // address, so neither listener can be fired by the commit's own write.
  const store = make();
  const address = ['rld8-a'];
  const ranks = ['rld8-b', 'rld8-c'];
  const listeners = [];
  for (const rank of ranks) {
    store.write([rank], 'mem', 1);
    const bound = bindListener(store, [rank], rank);
    bound.seen.length = 0;
    listeners.push(bound);
  }

  let repairs = 0;
  for (let j = 0; j < 2; j += 1) {
    kernelRegister(store, address, `rld8-p${j}`, shield((context) => {
      if (typeof context.value === 'number' && context.value >= j) return true;
      return {
        message: `the landed value is below rank ${j}`,
        repair: (repairContext) => {
          repairs += 1;
          const written = store.write([ranks[j]], 'mem', j, repairContext);
          return { ok: true, op: written.op };
        },
      };
    }));
  }
  const record = kernelCommit(store, address, 'mem', 'broken');
  const outcome = captured(() => kernelRunAttempt(store, record));

  // ── (a) THE DRIVE REACHED ITS ARM: TWO REPAIRS LANDED. ────────────────────────────────────────────────
  assert.equal(outcome.threw, false,
    `THE ATTEMPT RESOLVES ON THE PASS ARM (threw ${JSON.stringify(outcome.threw ? outcome.thrown.status : null)})`);
  assert.equal(outcome.value.outcome, 'passed', `and on the pass arm — read ${JSON.stringify(outcome.value.outcome)}`);
  assert.equal(repairs, 2,
    '**TWO REPAIRS LANDED, IN TURN** — one per pair, the chain walking `broken -> 0 -> 1` (`P-SM-5`\'s own '
      + `shape): read ${repairs}`);
  assert.equal(outcome.value.ops.length, 1 + repairs,
    'and the commit\'s op set holds the write\'s own op and exactly one entry per repair write '
      + `(\`surface.md §2.11\` clause 6): read ${outcome.value.ops.length}`);

  // ── (b) THE SUBJECT: BOTH LISTENERS, ONCE EACH. ───────────────────────────────────────────────────────
  assert.deepEqual(listeners.map((bound) => bound.seen.length), [1, 1],
    '**BOTH REPAIR LISTENERS ARE INVOKED ONCE EACH** — the two sets stand in the INVOCATION\'s own leg list, '
      + 'not in a single slot, so neither erases the other (`§3.2`: *"A REPAIR THAT MAKES TWO WRITES LOSES '
      + `NOTHING"*, and the two-repair commit is the fixture that measures it): read `
      + `${JSON.stringify(listeners.map((bound) => bound.seen.length))}`);
  // **AND THE WHOLE DELIVERY IS HANDED ONE ADDRESS — `deliver` takes ONE `triggeringAddress` and `terminalArm`
  // reads it off the LEG's own op (`§2` `B-3`), so the two invocations carry THE SAME ONE.** **WHICH of the two
  // acts fired a handle is asserted by NO clause and NO cell** (`§6`; `DD-22`, `DD-37`, `AB-3`), and a
  // PER-HANDLE address is exactly the reading the surface's `PAR-JS-12` forbids — so this cell asserts the
  // ONE-address rule and records the address rather than pinning an attribution to either listener.
  assert.deepEqual(listeners.map((bound) => bound.seen[0]), [listeners[1].seen[0], listeners[1].seen[0]],
    '**THE WHOLE DELIVERED SET IS HANDED ONE ADDRESS** — the leg\'s own op address (`§2` `B-3`: *"ONE ADDRESS '
      + 'FOR THE WHOLE DELIVERY"*), which both invocations therefore carry: read '
      + `${JSON.stringify(listeners.map((bound) => bound.seen[0]))}`);

  // ── (c) THE MEMBER CARRIES BOTH ELEMENTS, AND THE COMMIT'S OWN SET NEITHER. ───────────────────────────
  assert.deepEqual([...handlesOf(record.pending)].sort(), [...listeners.map((bound) => bound.handle)].sort(),
    '**`pending` CARRIES BOTH REPAIR ELEMENTS AND NOTHING ELSE** — the two pairs left by their check-offs and '
      + `no pair's id was merged (\`§3.3\`): read ${JSON.stringify(handlesOf(record.pending))}`);
  assert.deepEqual([...handlesOf(record.triggered)].sort(), ['rld8-p0', 'rld8-p1'],
    '**AND `triggered` CARRIES NEITHER LISTENER — it is the commit\'s own write\'s returned set, VERBATIM** '
      + `(\`§2\` \`B-6\`): read ${JSON.stringify(handlesOf(record.triggered))}`);

  t.diagnostic(`RLD-8 · THE TWO-REPAIR COMMIT: repairs = ${repairs}, op set = ${outcome.value.ops.length}; the `
    + `listeners' invocation counts = ${JSON.stringify(listeners.map((bound) => bound.seen.length))} with `
    + `${JSON.stringify(listeners.map((bound) => bound.seen))}; \`pending\` = `
    + `${JSON.stringify(handlesOf(record.pending))} and \`triggered\` = `
    + `${JSON.stringify(handlesOf(record.triggered))}`);
});
