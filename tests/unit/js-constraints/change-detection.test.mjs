// tests/unit/js-constraints/change-detection.test.mjs
//
// **`P-3`, CHANGE DETECTION ON WRITES — THE PACKAGE-SIDE CELLS OF `docs/L3/change-detection/design.md` §6, AT THE
// SCOPE `D-5` DECLARES FOR THEM.** `CD-1`…`CD-13` and `CD-15` are UNIT cells on `store-core` and stand at
// `tests/unit/store-core/change_detection.rs`; **`CD-14` and `CD-16` are PACKAGE facts and belong to
// `js-constraints`** (the design's own §6.2, last paragraph), **and two of the Rust file's cells name a
// package-side half that only the kernel's own members can observe — `CD-12`'s `record.log` and `CD-13`'s receipt
// census — which are driven here BESIDE the store-side half rather than folded into it.**
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE RULING THESE CELLS REST ON, AND WHY THEY ARE NOT FIRING COUNTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **`strata/decisions.md` · `D-193`, the architect, VERBATIM: *"P-3 checks literal equivalence, not reference
// equality"***, and **`D-195`: *"Take the default on the blocker and proceed"***. **The store answers a no-change
// write with `triggered: []` and `watched: []`, and every package site is narrowed BY CONSEQUENCE rather than by
// an edit** (`D-69`: one predicate, in the store, where the per-tier versions live): the kernel's pass evaluates
// `record.triggered` (the kernel's own set), the registration instants deliver the store's answered sets, and the
// record's declared members are unmoved. **So each cell below drives ONE of those consequences and names the
// control arm that proves its instrument is live** — a cell that only asserted silence would be asserting its own
// instrument's silence.
//
// **AND NO CELL HERE DRIVES A `write`'s FIRING COUNT DIRECTLY: that is `store-core`'s scope and its cells are at
// the Rust file above.** What is asserted here is what a JS consumer can see that the store's own record cannot:
// the `constraint-check` entries of `record.log`, the receipt's own member census, an `addConstraint` delivery,
// and the invocation count of a listener that writes at the address it was delivered for.

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../../bindings/js/index.mjs';

const make = (extra = {}) => storeCreate({ journalLength: 32, listeners: [], ...extra });
const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), 'cd-unit-' + tag + '-'));
  return { dir, filePath: join(dir, 'store.json') };
};
const bytesOf = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);
const attempt = (fn) => {
  try {
    return { ok: true, value: fn() };
  } catch (thrown) {
    return { ok: false, caught: thrown };
  }
};
const statusOf = (caught) => (caught !== null && typeof caught === 'object' ? caught.status ?? null : null);
const logKinds = (record) => (Array.isArray(record && record.log) ? record.log.map((entry) => entry.kind) : null);

/** Bind a listener at one address and answer the record of its invocations. */
function bindWatching(instance, handle, address) {
  const calls = [];
  const answered = instance.listen(handle, [address]);
  instance.register(answered, function listener(...args) {
    calls.push({ argCount: args.length, address: args[0] });
  });
  return { handle: answered, calls };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CD-12` · THE PASS IS SILENCED WITH THE FIRING (`Q-5`'s default)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CD-12 · THE PASS IS SILENCED WITH THE FIRING (D-193 item 5 Q-5) — a pair at [\'a\'] that REFUSES 1 is not asked at all when 1 already stands, so the no-change write PASSES: record.log carries NO constraint-check entry and ONE commit entry, while the CONTROL arm (the same pair, a write of 2) IS asked and its log names the check beside the commit', () => {
  // **`Q-5`'s default, in the architect's own terms** (`D-193` item 5): **the suppression REACHES THE
  // CONSTRAINTS** — they are one predicate with the listeners (`D-69`) — **and a write a pair would have refused
  // on must not become admissible because its value was equal**. **THE MECHANISM IS ONE LINE OF THE KERNEL'S,
  // READ HERE AS THE CELL'S OBSERVABLE**: the pass evaluates `record.triggered`, which the kernel's commit took
  // verbatim from the store's answer — **so an empty set is an empty pass, and `log`'s entry list is the pass's
  // own record of what it asked.**
  //
  // **STATES ENUMERATED BEFORE THE DRIVE WAS AUTHORED:** (1) `1` stands at `['a']` and a pair registered AFTER it
  // refuses `1` → a write of `1` is a NO-CHANGE write, the pair is not asked, `log` is `[commit]`, and the write
  // PASSES; (2) the CONTROL — the same pair, a write of `2`, which the body admits → the pair IS asked and `log`
  // is `[constraint-check, commit]`; (3) `CD-12b`'s arm — a pair that refuses everything at another address →
  // the write is refused at rank `20` with the pair's own check in its `log`. **THE FAILURE THIS CELL EXISTS TO
  // CATCH: a pass that keeps asking because its set is computed somewhere else** — which would refuse a write the
  // store had already ruled a no-change write.
  const store = make();
  store.write(['a'], 'mem', 1);

  const asks = [];
  const registered = store.addConstraint({ address: ['a'], id: 'cd-12-a' }, (context) => {
    asks.push({ value: context.value, atRegistration: context.op === null && context.tier === null });
    // **THE REGISTRATION ASK IS NOT A WRITE'S PASS AND IT REFUSES NOTHING** — `op` and `tier` BOTH `null` is the
    // instant's own discriminator (`D-125` item 3 keeps the add route's single-pair scope): a body that refused
    // there would be refused AT REGISTRATION and never reach the arm this cell drives
    // (`ConstraintRefusedAtRegistration`, measured on the first fixture).
    if (context.op === null) return true;
    if (context.value === 1) return { message: '1 is refused at ["a"]' };
    return true;
  });
  assert.notEqual(registered, undefined, 'CD-12: the pair stands registered and answers its identity');
  assert.deepEqual(store.constraints().map((row) => row.id), ['cd-12-a'],
    'CD-12: the registry names the one pair this cell drives');

  // ── ARM 1: THE NO-CHANGE WRITE. ─────────────────────────────────────────────────────────────────────
  asks.length = 0;
  const noChange = attempt(() => store.write(['a'], 'mem', 1));
  assert.equal(noChange.ok, true,
    '**CD-12 — THE WRITE PASSES**: nothing was asked, so nothing could be refused. It answered '
    + `${JSON.stringify(noChange.ok ? 'a record' : statusOf(noChange.caught))}`);
  assert.deepEqual(asks, [],
    '**THE PAIR WAS NOT ASKED — Q-5\'S WHOLE SUBJECT** (D-193 item 5: the suppression REACHES THE CONSTRAINTS): '
    + `the body ran ${asks.length} time(s) over ${JSON.stringify(asks)}`);
  assert.deepEqual(logKinds(noChange.value), ['commit'],
    '**AND log CARRIES NO constraint-check ENTRY AND ONE commit** (the declaration: an empty array is never that '
    + 'arm\'s answer, and the suppression may not empty log): the record\'s kinds read '
    + `${JSON.stringify(logKinds(noChange.value))}`);
  assert.equal(noChange.value.log.length, 1,
    'CD-12: one entry, and it is the commit\'s: ' + JSON.stringify(noChange.value.log));
  assert.deepEqual(noChange.value.triggered, [],
    'CD-12: the store answered an empty set, which is the whole of why the pass asked nothing');

  // ── ARM 2: THE CONTROL, WHICH PROVES THE INSTRUMENT IS LIVE. ────────────────────────────────────────
  // **THE BODY REFUSES `1` AND ADMITS ANYTHING ELSE**, so the control is a write whose landed value the pair
  // does not refuse — **and its whole subject is that the pair WAS ASKED**: the pass ran, took the pair's own
  // `constraint-check` entry, and admitted the write. **A pass that asked nothing would answer `[commit]` here
  // as it does above, and this arm is what tells the two apart.**
  asks.length = 0;
  const changed = attempt(() => store.write(['a'], 'mem', 2));
  assert.equal(changed.ok, true,
    'CD-12 control: the pair admits 2, so the changing write STANDS; it answered '
    + `${JSON.stringify(changed.ok ? 'a record' : statusOf(changed.caught))}`);
  assert.deepEqual(asks.map((ask) => ask.value), [2],
    '**AND THE PAIR WAS ASKED ON THE CHANGING ARM** — the instrument is live and the empty list above is a '
    + `measurement, not a silent body: ${JSON.stringify(asks)}`);
  assert.deepEqual(logKinds(changed.value), ['constraint-check', 'commit'],
    'CD-12: the changing arm\'s log names the pair\'s own check beside the commit: '
    + `${JSON.stringify(logKinds(changed.value))}`);
});

test('CD-12b · THE PASS\'S REFUSAL ARM IS UNMOVED — where the pair IS asked and refuses, the write is refused at rank 20 WITH its own log, so the silence above is the empty set and not a weakened pass', () => {
  // **THIS CELL EXISTS BECAUSE `CD-12`'S REFUSING STATE CANNOT BE REACHED AT ITS OWN ADDRESS UNDER `P-3`**: the
  // pair refuses `1`, and a write LANDING `1` at that address is a no-change write once `1` stands — so the pass
  // that would have refused it is never asked. **THE REFUSING ARM IS THEREFORE DRIVEN AT A DIFFERENT ADDRESS,
  // where no such silence applies**, and the caller receives rank `20` `ConstraintPassRefused` with the pair's own
  // entry in `log`. **THE SUBJECT IS THE PASS'S OWN LOSS, NOT A FIRING COUNT.**
  const store = make();
  store.write(['b'], 'mem', 1);
  // THE REGISTRATION ASK PASSES; EVERY WRITE'S PASS REFUSES (`op !== null` is the pass's own discriminator).
  store.addConstraint({ address: ['b'], id: 'cd-12-b' }, (context) => (context.op === null
    ? true
    : { message: 'refused at ["b"]' }));
  const refused = attempt(() => store.write(['b'], 'mem', 2));
  assert.equal(refused.ok, false,
    '**THE REFUSING ARM STANDS**: a pair that refuses refuses, and `P-3` weakens no pass');
  assert.equal(statusOf(refused.caught), 'ConstraintPassRefused',
    `CD-12b: the refusal is the declared rank 20 member, read as ${JSON.stringify(statusOf(refused.caught))}`);
  assert.equal(logKinds(refused.caught)[0], 'constraint-check',
    'CD-12b: and the refusal\'s own log OPENS with the pair\'s check — the loss `P-3` makes is the SET\'s, never '
    + `the pass's machinery: ${JSON.stringify(logKinds(refused.caught))}`);
  assert.equal(refused.caught.log[0] && refused.caught.log[0].id, 'cd-12-b',
    'CD-12b: the check entry names the refusing pair\'s own id — '
    + `${JSON.stringify(refused.caught.log[0])}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CD-13` · THE RECEIPT'S CENSUS — the package-side half
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CD-13 · THE RECEIPT\'S CENSUS, THE PACKAGE\'S HALF — one ordinary write, one no-change write and one delete: Object.keys is the declared set and getOwnPropertyNames reads SEVEN on both write arms and NINE on the delete, the no-change arm\'s log[0].kind is commit, discarded is empty, and bodyFailures / returnedValues are each THE ONE SHARED FROZEN EMPTY MAP — the SAME object across all three records', () => {
  // **`O-4`'s default (i), taken by `D-195` item 2**: **a `changed` member was PRICED AND DECLINED**, so this unit
  // mints NO name. **THE CENSUS IS THE OBSERVABLE AND IT IS UNMOVED**: `Object.keys` still reads the declared
  // members, **and the own-property census reads the declared members plus the non-enumerable accessors the
  // receipt has carried since `D-75`/`D-119`** — `discarded`, `log`, `bodyFailures`, `returnedValues` on the write,
  // and those four beside `commit` on the delete — **none of which this unit adds to, renames or removes.**
  //
  // **THE TWO NAMES THE SUPPRESSION CANNOT MAKE AMBIGUOUS ARE THE FROZEN MAPS** (`docs/L3/change-detection/
  // design.md` §3 row 10): *"the same fact whether no settle ran at all or a settle found none"* (`D-150` item 2)
  // — so the no-change arm answers the same frozen empty map an ordinary write does, **and it is the SAME
  // OBJECT**, which is the strong form of that sentence and is asserted here.
  //
  // **THE ONE-LINE CHANGE THAT REDDENS IT: assert `log` is empty, or mint an eighth own name, or make
  // `bodyFailures` absent on the no-change arm.**
  const store = make();
  const h = bindWatching(store, 'cd-13', ['a']);
  const ordinary = store.write(['a'], 'mem', 1);
  const afterOrdinary = h.calls.length;
  const noChange = store.write(['a'], 'mem', 1);
  const afterNoChange = h.calls.length;
  const deleted = store.delete(['a'], 'mem');
  const afterDelete = h.calls.length;

  for (const [name, record, declaredKeys, ownCount] of [
    ['the ordinary write', ordinary, ['op', 'watched', 'triggered'], 7],
    ['the no-change write', noChange, ['op', 'watched', 'triggered'], 7],
    ['the delete', deleted, ['address', 'tiers', 'triggered', 'op'], 9],
  ]) {
    assert.deepEqual(Object.keys(record), declaredKeys,
      `CD-13: ${name}'s ENUMERABLE member set is its declared one — ${JSON.stringify(Object.keys(record))}`);
    assert.equal(Object.getOwnPropertyNames(record).length, ownCount,
      `CD-13: and ${name}'s own-property census reads ${ownCount} — no member is added by this unit: `
      + `${JSON.stringify(Object.getOwnPropertyNames(record))}`);
  }

  // THE NO-CHANGE ARM'S OWN FACTS.
  assert.deepEqual(noChange.triggered, [], 'CD-13: the no-change arm fired nothing');
  assert.deepEqual(noChange.watched, [], 'CD-13: and its watch set is empty with it (D-195 item 1)');
  assert.equal(noChange.log[0].kind, 'commit',
    '**THE SUPPRESSION CANNOT EMPTY log** — an empty array is never that arm\'s answer: it reads '
    + `${JSON.stringify(noChange.log)}`);
  assert.equal(noChange.log.length, 1,
    `CD-13: ONE entry on the no-change arm, and it is the commit's: ${JSON.stringify(logKinds(noChange))}`);
  assert.deepEqual(noChange.discarded, [],
    '**AND THE DISCARDED WITNESS IS EMPTY BECAUSE NO BODY RAN AND THEREFORE NO RAISE WAS BORN**, not because a '
    + `raise was lost (D-170): it reads ${JSON.stringify(noChange.discarded)}`);
  assert.equal(afterOrdinary, 1,
    `CD-13: the ordinary write fires the registration once — it ran ${afterOrdinary} time(s)`);
  assert.equal(afterNoChange, afterOrdinary,
    '**CD-13 — THE NO-CHANGE WRITE INVOKED NOBODY**: the count stands at ' + afterNoChange + ' after it, where '
    + `it was ${afterOrdinary} after the changing write`);
  assert.equal(afterDelete, afterOrdinary + 1,
    `CD-13: and the DELETE is still the second firing act — the count reads ${afterDelete}, so this unit narrows `
    + 'the write\'s arm and not the delete\'s');

  // THE TWO FROZEN MAPS, IN THE STRONG FORM: THE SAME OBJECT ON ALL THREE RECORDS.
  for (const member of ['bodyFailures', 'returnedValues']) {
    assert.deepEqual(noChange[member], {},
      `CD-13: ${member} is the empty map on the no-change arm: ${JSON.stringify(noChange[member])}`);
    assert.equal(Object.isFrozen(noChange[member]), true,
      `CD-13: and it is FROZEN — a caller cannot write into the store's own report (${member})`);
    assert.equal(noChange[member], ordinary[member],
      `**CD-13 — ${member} IS THE ONE SHARED FROZEN EMPTY MAP**: the no-change and the ordinary arms answer the `
      + 'SAME object, which is `D-150` item 2\'s sentence in its strong form');
    assert.equal(noChange[member], deleted[member],
      `CD-13: and the delete's receipt answers the same object again (${member})`);
  }
  assert.notEqual(noChange.bodyFailures, noChange.returnedValues,
    'CD-13: the two members are two shared empties and not one — each is its own member\'s shared value');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CD-14` · `D-152`'s REGISTRATION INSTANT NARROWS (`O-7`'s default)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CD-14 · D-152\'s REGISTRATION INSTANT IS NARROWED BY CONSEQUENCE (O-7\'s default, taken by D-195 item 2) — an addConstraint whose repair lands the literal already standing delivers NOTHING: the repair runs once, the identity is answered, the pair stands, the bytes carry the repair, and the listener bound at that address is NOT invoked — while the CONTROL (the same shape landing a DIFFERENT literal) is delivered once', () => {
  // **`D-125` item 1 widens the delivery to `addConstraint`, and `PIN-6` (ii) makes the delivered set THE
  // STORE'S OWN `triggered`** — so **`O-7`'s default arrives without a package edit**: *"a repair's own write is
  // the same verb, so mechanically it obeys"* (`D-195` item 2). **THE CONSEQUENCE, NAMED PLAINLY AS THE ACCEPTED
  // ONE: `D-104`/`D-152`'s delivered union LOSES A MEMBER wherever a repair lands the literal already standing.**
  // **THE CELL DRIVES THAT ARM AND ITS CONTROL, so a later pass cannot read the silence as a broken delivery.**
  //
  // **THE ONE-LINE CHANGE THAT REDDENS IT: assert one delivery** — which is the pre-`P-3` behaviour and not this
  // unit's.

  const drive = (landed) => {
    const { dir, filePath } = scratch('cd-14');
    const store = make({ filePath });
    store.write(['w'], 'file', 'by-repair');
    const watched = bindWatching(store, 'cd14-w', ['w']);
    let repairs = 0;
    const asks = [];
    const identity = attempt(() => store.addConstraint({ address: ['a'], id: 'cd14-a' }, (context) => {
      asks.push({ opIsNull: context.op === null, tierIsNull: context.tier === null, value: context.value });
      // THE REGISTRATION ASK ALONE: `op` and `tier` BOTH `null`.
      if (context.op !== null) return true;
      return {
        message: '["a"] must exist',
        repair: (record) => {
          repairs += 1;
          return { ok: true, op: record.write(['w'], 'file', landed).op };
        },
      };
    }));
    const bytes = bytesOf(filePath);
    const rows = store.constraints();
    rmSync(dir, { recursive: true, force: true });
    return { identity, repairs, asks, calls: watched.calls, bytes, rows };
  };

  // ── THE ARM: THE REPAIR LANDS THE LITERAL ALREADY STANDING. ──────────────────────────────────────────
  const narrowed = drive('by-repair');
  assert.equal(narrowed.repairs, 1,
    '**THE REPAIR RAN EXACTLY ONCE — WHICH IS WHAT SAYS THE SEAT WAS REACHED AT ALL** (D-125 item 1; PIN-6 '
    + `(ii)): it ran ${narrowed.repairs} time(s) over ${JSON.stringify(narrowed.asks)}`);
  assert.equal(narrowed.identity.ok, true,
    '**THE REGISTRATION MUST STAND** (PIN-7 (iii) — the re-run over the landed op admits it): it answered '
    + `${JSON.stringify(narrowed.identity.ok ? 'an identity' : statusOf(narrowed.identity.caught))}`);
  assert.deepEqual(narrowed.rows.map((row) => row.id), ['cd14-a'],
    'CD-14: and the pair is carried — constraints() names it');
  assert.equal(String(narrowed.bytes).includes('by-repair'), true,
    '**AND THE SAVE STANDS** (D-125 item 1: after the constraints pass, after the save): the bytes read '
    + `${JSON.stringify(narrowed.bytes)}`);
  assert.deepEqual(narrowed.calls, [],
    '**CD-14 — NOTHING IS DELIVERED**: the repair\'s write landed the literal ["w"] already answered, so its '
    + 'answered set is EMPTY and the instant\'s union is empty (D-195 item 2\'s O-7). A red here is a pass that '
    + 'delivered from a repair\'s ACT rather than from the store\'s returned SET; the listener ran '
    + `${narrowed.calls.length} time(s) with ${JSON.stringify(narrowed.calls)}`);

  // ── THE CONTROL: THE SAME SHAPE LANDING A DIFFERENT LITERAL IS DELIVERED ONCE. ────────────────────────
  const control = drive('a-different-literal');
  assert.equal(control.repairs, 1,
    `CD-14 control: the repair ran once — ${control.repairs} over ${JSON.stringify(control.asks)}`);
  assert.equal(control.calls.length, 1,
    '**THE CONTROL PROVES THE INSTRUMENT IS LIVE**: the same route, the same instant and the same binding, with '
    + 'a repair that lands a DIFFERENT literal, delivers ONCE — it delivered '
    + `${control.calls.length} time(s)`);
  assert.equal(control.calls[0] && control.calls[0].argCount, 1,
    'CD-14 control: and the one argument is the repair\'s own op address (PIN-6 (iv)): '
    + `${JSON.stringify(control.calls[0] && control.calls[0].argCount)}`);
  assert.deepEqual(control.calls[0] && control.calls[0].address, ['w'],
    `CD-14 control: read as ${JSON.stringify(control.calls[0] && control.calls[0].address)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CD-16` · THE RE-ENTRANCY SENTENCE, NOW CONDITIONAL ON A VALUE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CD-16 · THE RE-ENTRANCY SENTENCE IS CONDITIONAL ON A VALUE (docs/specs/storeroom-js/contract.md item 3 (iii), re-spelled in the same pass) — a listener at [\'a\'] whose body writes 1 after 1 stands runs ONCE, not twice; and the CONTROL, the same body writing a DIFFERENT literal, runs TWICE', () => {
  // **THE DECLARED SENTENCE, QUOTED BEFORE THE READING**: *"(iii) RE-ENTRANCY IS UNAVOIDABLY OPEN: a listener that
  // writes at the address it was delivered for fires itself again, because the store's trigger set is computed
  // per act; nothing detects it and nothing is meant to."* **IT IS NOW CONDITIONAL ON A VALUE** — a listener that
  // writes **A DIFFERENT LITERAL** fires itself again and nothing detects it; **a listener that writes THE LITERAL
  // ALREADY STANDING fires nothing, itself included** — **and this cell is the drive that sentence owes**, since
  // `P-3` is the thing that now detects one form of it. **NO DEPTH COUNTER, NO GUARD AND NO CAP IS ADDED**: the
  // item's other half is unmoved, and the control arm proves the recursion is still real.
  //
  // **THE ONE-LINE CHANGE THAT REDDENS IT: assert two invocations** — the pre-`P-3` reading.

  // ── THE ARM: THE BODY REWRITES THE LITERAL ALREADY STANDING. ─────────────────────────────────────────
  const store = make();
  let invocations = 0;
  const h = store.listen('cd16-self', [['a']]);
  store.register(h, () => {
    invocations += 1;
    // **THE BODY WRITES THE ADDRESS IT WAS DELIVERED FOR, WITH THE LITERAL THAT ALREADY STANDS** — the exact
    // shape the clause's (iii) names.
    store.write(['a'], 'mem', 1);
  });
  const record = store.write(['a'], 'mem', 1);
  assert.deepEqual(record.triggered.map((pair) => pair.handle), ['cd16-self'],
    'CD-16: the FIRST write fires the registration, so the body is reached at all');
  assert.equal(invocations, 1,
    '**CD-16 — THE BODY RUNS ONCE, NOT TWICE**: its own write landed the literal 1 that already stood, so the '
    + 'store\'s answered set for it is empty and it is not redelivered. It ran '
    + `${invocations} time(s); a red here is the pre-P-3 reading of the sentence this release re-spells`);

  // ── THE CONTROL: THE SAME SHAPE WRITING A DIFFERENT LITERAL RUNS TWICE. ──────────────────────────────
  const controlStore = make();
  let controlInvocations = 0;
  const ch = controlStore.listen('cd16-control', [['a']]);
  controlStore.register(ch, () => {
    controlInvocations += 1;
    if (controlInvocations === 1) controlStore.write(['a'], 'mem', 2);
  });
  const controlRecord = controlStore.write(['a'], 'mem', 1);
  assert.deepEqual(controlRecord.triggered.map((pair) => pair.handle), ['cd16-control'],
    'CD-16 control: the first write fires the registration');
  assert.equal(controlInvocations, 2,
    '**THE CONTROL PROVES THE RECURSION IS STILL REAL**: a body that writes a DIFFERENT literal fires itself '
    + `again and nothing detects it — it ran ${controlInvocations} time(s). A red here is a guard this unit may `
    + 'not add');
  assert.equal(controlStore.read(['a']), 2,
    'CD-16 control: and the nested write landed — the value reads 2, which is why it fired');
});
