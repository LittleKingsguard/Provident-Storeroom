// journal-retention-floor.test.mjs — **`D-178`: THE REPLAY STARTS FROM THE COMPACTED FLOOR'S STATE AND NOT FROM
// `born`, AND THESE FOUR CELLS ARE THE RULING'S OWN DRIVE.** **⟶ A FIFTH IS LANDED BESIDE THEM, 2026-11-22, ON
// `D-179` ITEM 6's OWN OWING: `RF-5` drives THE SHAPE THE IMPLEMENTATION'S `under` RE-DERIVATION EXISTS FOR, and
// the four below cannot — `RF-1`'s drive is ALL TOP-LEVEL ADDRESSES, so every one of them stays green with that
// re-derivation REMOVED (`D-179` item 2, measured by the implementing pass).**
//
// **THE RULING, THE ARCHITECT, VERBATIM:** *"Replay should start over from the compacted floor instead of
// 'born'"* (`strata/decisions.md` · `D-178`). **THE SUBJECT IS `D-160`'s DROP**: compaction REMOVES the oldest
// entries whole, so the effects of every entry it took are absent from `born` — the state the boot's construction
// captured, which journals no entry for itself (`§7.2` item 6) — and a replay that begins there answers a state
// the journal's own record never described. **The state at a retained mark is the state the RETAINED entries were
// appended onto, and that state is the floor the compaction compressed to.**
//
// ── PROVENANCE, SAID AT THE HEAD BECAUSE `D-163` REQUIRES IT ─────────────────────────────────────────────────
//
// **THESE CELLS WERE WRITTEN BY THE PASS WHOSE RULING CHANGED THE BEHAVIOUR, AND THEY ARE THEREFORE WEAKER EVIDENCE
// THAN A BLIND PASS'S** (`D-163`'s discipline, applied to the pass that wrote them and not only to the ones it
// reads): a pass can write a cell that measures the change it made rather than the behaviour the ruling requires.
// **WHAT OPPOSES THAT HERE IS A PRE-FIX READING FOR EACH CELL, TAKEN ON THIS TREE BEFORE THE CHANGE WITH THE
// STORED PRE-FIX ARTEFACT** (`scratch/d178-prefix-probe.mjs` — the same drive, the same stores, the same calls) and
// **printed in each cell's own message beside what it measures now**:
//
//   * `RF-1` — pre-fix: `a = AddressNotFound`, `b = "B"`, `c = AddressNotFound`, with the store answering
//     *returned* from the restoral. **The state at that mark held `a = "A"`.** The cell fails on the pre-fix
//     tree by construction, which is the strongest thing a cell written by its own pass can offer.
//   * `RF-2` — pre-fix: `a = "A"`, `b = "B"`, `c` absent, and `a = "A"` with `b` absent at the earlier mark — **the
//     same answers this tree gives**, which is what makes the floor a change of base and not a change of replay.
//   * `RF-3` — pre-fix: `JournalOpUnknown`, the state unmoved. **Unchanged, and asserted so that it stays.**
//   * `RF-4` — pre-fix: the floor read `a = AddressNotFound` (the creation state, which holds nothing) where the
//     floor of this record holds `a = "A"`.
//   * `RF-5` — **pre-fix: NO TREE WAS EVER RUN, AND THAT IS EXACTLY WHY IT WAS OWED** (`D-179` item 6): the drive
//     that reaches the nested shape did not exist, so there was no red to record. **Its opposition is taken on
//     THIS tree instead** — the enclosing-version re-derivation REMOVED from `advance_floor` and the crate rebuilt
//     — **and that reading is printed in the cell's own assertion messages**, which is the only form of *"the
//     pre-fix reading"* a cell written for a behaviour that already landed can carry.
//
// **AND IT CARRIES ITS PROVENANCE ON `D-163`'s TERMS, STATED RATHER THAN IMPLIED: IT WAS WRITTEN BY A PASS WHOSE
// OWN RULING IS UNDER TEST.** A cell written by a pass to measure the change it made can measure the change instead
// of the behaviour — **and the weakness here is worse than that**: the implementing pass MEASURED that removing the
// re-derivation reddened NOTHING, every cell green because every one of their addresses is TOP-LEVEL (`D-179`
// items 2 and 6). **WHAT OPPOSES THE WEAKNESS IS THE RE-DERIVATION-REMOVED READING PRINTED IN THIS CELL'S OWN
// MESSAGES**: `src/store.rs`'s `advance_floor` had the `enclosing` block and its use removed, the crate was
// rebuilt, and **`RF-5` went RED with the nested version ABSENT** — so this cell distinguishes the two trees, which
// is the one property `D-179` item 6 says the missing cell lacked.
//
// ── WHY THIS FILE AND NOT `kernel-attempt-window.test.mjs` ───────────────────────────────────────────────────
//
// **That file's subject is the WINDOW a commit opens and the instants at which its cached mark moves** (`D-63`,
// `DEF-AE`: `openCommit`, `bumpWindowMark`, `windowMark`). **This file's subject is a STATE THE STORE HOLDS and the
// base a replay begins from** — `Store::floor_state` and `Store::replayMark` — **which no window, no kernel pass
// and no delivery instant reaches.** The two subjects touch at exactly one point: the mark carrier a window may
// cache. **That one point is driven here at the store's own entry (`RF-4`), not at a commit**, so the window's
// cells keep their own subject and this file does not borrow it.
//
// **AND THE INSTRUMENT IS THE PACKAGE'S OWN.** `restoreMark` is not a member of the instance's surface — its
// fifteen are `addConstraint`…`write` (`D-178` item 3's correction measured three drives that called `undefined`
// and read the `TypeError` as the verb's answer). **Every call below is `Reflect.apply(withAddon().restoreMark,
// store, [mark])`, which is `constraints.mjs`'s own invocation**, and every mark is the store's own carrier from
// `Reflect.apply(withAddon().journalMark, store, [])`. **NO POSITION IS COMPOSED IN THIS FILE.**

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';
import { withAddon } from '../../bindings/js/src/entry/addon-slot.mjs';

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The store's own `journalMark` answer, reached at the addon's entry exactly as the package reaches it. **THE
 *  ANSWER IS THE STORE'S CARRIER RECORD AND NOT A BARE STRING** (`bindings/js/src/codec.rs`): the op-id spelling
 *  with the head's id where the journal holds an entry, and the FLOOR's spelling where it holds none. */
function storeMark(store) {
  return Reflect.apply(withAddon().journalMark, store, []);
}

/** The op id a mark carrier names, or `null` for the FLOOR's carrier and for an answer that is no carrier. */
function markedOp(mark) {
  if (mark === null || typeof mark !== 'object') return null;
  return mark.k === 's' && typeof mark.v === 'string' ? mark.v : null;
}

/** **THE STORE'S OWN FLOOR CARRIER, TAKEN FROM THE STORE'S OWN READ AND NEVER SPELLED HERE.** A store whose journal
 *  holds no entry answers the FLOOR's carrier, **and that value is exactly what a commit opened on an empty journal
 *  caches and hands back** (`bindings/js/src/entry/state.mjs`'s `journalMarkAtOpening`; `constraints.mjs`'s
 *  `restoreReversal`). **The record itself is not written as a literal in this file**: the test tree's own census
 *  (`json-crossing.test.mjs`'s `JC-TC-44`) reads a written tag literal as a finding, and the store's own answer is
 *  the honest instrument anyway. */
function floorCarrier() {
  return storeMark(storeCreate({ journalLength: 2, listeners: [] }));
}

/** The status a call answered, or `null` where it returned — so a cell never prints `undefined`. */
function refusalStatus(outcome) {
  if (outcome.ok) return null;
  return typeof outcome.caught.status === 'string' ? outcome.caught.status : 'no status on the thrown value';
}

/** One address's answer, as a value: the standing register at it, kept apart from a refusal so that a cell can
 *  assert on both and print either. **No column prints `undefined`** (`DEF-Q`'s rule for a print). */
function standingAt(store, address) {
  const read = attempt(() => store.read(address));
  if (read.ok) return { ok: true, value: read.value };
  return {
    ok: false,
    status: typeof read.caught.status === 'string' ? read.caught.status : 'no status on the thrown value',
  };
}

/** A standing printed for a message: the value as JSON, or the code that refused it. */
function printed(standing) {
  return standing.ok ? JSON.stringify(standing.value) : `refused ${standing.status}`;
}

// =============================================================================================================
// `RF-1` — THE RULING'S OWN DRIVE: A RESTORAL TO A RETAINED MARK WHOSE PREDECESSOR WAS DROPPED
// =============================================================================================================

test('RF-1 · D-178 — a restoral to a RETAINED mark whose predecessor the compaction DROPPED keeps the dropped version\'s value: `a` stands at "A", `b` stands, `c` is gone (the pre-fix tree measured a = AddressNotFound)', (t) => {
  // **THE DRIVE IS THE ONE THE SUPERVISOR MEASURED (`strata/decisions.md` · `D-178` item 3)**: a `mem` store at
  // `journalLength: 2`, three writes at three addresses, so **the third append DROPS the first write's entry**
  // (`D-160` item 1) — and then a restoral to the mark the SECOND write left, which the journal still holds.
  // **THE STATE AT THAT MARK HELD `a`**: the write that set it is the entry the cap took, and its effect is in the
  // state the retained entries were appended onto, i.e. in the compacted floor — and nowhere in `born`.
  const store = storeCreate({ journalLength: 2, listeners: [] });
  store.write(['a'], 'mem', 'A');
  const markAfterA = storeMark(store);
  store.write(['b'], 'mem', 'B');
  const markAfterB = storeMark(store);
  store.write(['c'], 'mem', 'C');
  // **THE DRIVE'S COHERENCE, ASSERTED BEFORE ITS VERDICT** (`D-21`): two distinct op-id carriers, and the live
  // register holding all three values — a cell that restored from a store which never had `a` would prove nothing.
  assert.equal(markAfterB.k === 's' && typeof markAfterB.v === 'string', true,
    'the drive must hold an op-id carrier at the retained mark; it held ' + JSON.stringify(markAfterB));
  assert.notEqual(markedOp(markAfterA), markedOp(markAfterB),
    'the drive must hold two distinct marks, one per retained write: '
      + JSON.stringify([markedOp(markAfterA), markedOp(markAfterB)]));
  assert.equal(standingAt(store, ['a']).value, 'A',
    'the drive must stand `a` before the restoral, or the third write dropped nothing: '
      + printed(standingAt(store, ['a'])));
  assert.equal(standingAt(store, ['c']).value, 'C',
    'and `c` must stand, or the cap did not compress this journal: ' + printed(standingAt(store, ['c'])));

  // **THE ACT, AT THE PACKAGE'S OWN INVOCATION.** The mark is the one the second write's append left — RETAINED,
  // so the store owes a restoration and not a refusal (`M-11`).
  const restoredNow = attempt(() => Reflect.apply(withAddon().restoreMark, store, [markAfterB]));
  assert.equal(refusalStatus(restoredNow), null,
    'a RETAINED mark must restore and must answer for it; this store answered '
      + JSON.stringify(refusalStatus(restoredNow)));

  // **THE THREE READINGS THE RULING IS ABOUT** — and each message carries what the PRE-FIX tree measured here.
  const a = standingAt(store, ['a']);
  const b = standingAt(store, ['b']);
  const c = standingAt(store, ['c']);
  t.diagnostic('RF-1 measured at ' + markedOp(markAfterB) + ', after the restoral: a=' + printed(a)
    + ' b=' + printed(b) + ' c=' + printed(c)
    + ' — the pre-fix tree measured a=refused AddressNotFound b="B" c=refused AddressNotFound');
  assert.equal(a.ok && a.value === 'A', true,
    'the state the mark names HELD a="A" — the entry that set it is the one `journalLength: 2` dropped, and its '
      + 'effect belongs in the replay\'s base (the compacted floor). This tree answered a=' + printed(a)
      + '; the pre-fix tree answered a=refused AddressNotFound');
  assert.equal(b.ok && b.value === 'B', true,
    'and the retained write\'s own value stands, which the pre-fix tree also measured: b=' + printed(b));
  assert.deepEqual(c, { ok: false, status: 'AddressNotFound' },
    'and the write ABOVE the mark is gone, because the replay stops at the mark: c=' + printed(c));
  // **AND NOTHING ELSE CAME BACK WITH IT.** The floor is not a licence to keep what stood after the mark: exactly
  // the dropped write's version is restored, and no address the record never held at that position answers.
  assert.deepEqual(standingAt(store, ['d']), { ok: false, status: 'AddressNotFound' },
    'a restoral invents no address: d=' + printed(standingAt(store, ['d'])));
});

// =============================================================================================================
// `RF-2` — THE UNCOMPACTED CONTROL: THE SAME STORE WITH NOTHING DROPPED RESTORES EXACTLY AS BEFORE
// =============================================================================================================

test('RF-2 · D-178 — the uncompacted control: with `journalLength` large enough that nothing is dropped, the same three writes restore to the same two marks exactly as they did before the floor existed, so the change adds a base and moves nothing else', (t) => {
  // **THE CONTROL'S SUBJECT IS THE SECOND RULE THAT MUST NOT EXIST.** `Store::floor_state` begins EQUAL to `born`
  // and is advanced only by a drop, so **a store nothing has been dropped from has a floor equal to the creation
  // state and one code path serves both cases**. **A cell for the uncompacted case is the only thing that can say
  // so**: the floor's own cell (`RF-1`) would pass just as well if the replay had grown a second, conditional rule.
  const store = storeCreate({ journalLength: 8, listeners: [] });
  store.write(['a'], 'mem', 'A');
  const markAfterA = storeMark(store);
  store.write(['b'], 'mem', 'B');
  const markAfterB = storeMark(store);
  store.write(['c'], 'mem', 'C');
  assert.equal(markedOp(markAfterB).length > 0, true,
    'the drive must hold a mark after the second write: ' + JSON.stringify(markAfterB));

  // **(1) THE HEAD MARK REPLAYS ALL THREE WRITES' STATE UP TO IT.**
  const atSecond = attempt(() => Reflect.apply(withAddon().restoreMark, store, [markAfterB]));
  assert.equal(refusalStatus(atSecond), null,
    'a retained mark restores on an uncompacted store: ' + JSON.stringify(refusalStatus(atSecond)));
  assert.equal(standingAt(store, ['a']).value, 'A',
    'the first write stands at the second mark: ' + printed(standingAt(store, ['a'])));
  assert.equal(standingAt(store, ['b']).value, 'B',
    'and so does the second: ' + printed(standingAt(store, ['b'])));
  assert.deepEqual(standingAt(store, ['c']), { ok: false, status: 'AddressNotFound' },
    'and the write above the mark is gone: ' + printed(standingAt(store, ['c'])));

  // **(2) THE EARLIER MARK REPLAYS ONE WRITE AND NOT TWO** — the same shape one position down, so the control
  // covers a mark that is not the journal's head as well.
  const atFirst = attempt(() => Reflect.apply(withAddon().restoreMark, store, [markAfterA]));
  assert.equal(refusalStatus(atFirst), null,
    'the earlier retained mark restores: ' + JSON.stringify(refusalStatus(atFirst)));
  assert.equal(standingAt(store, ['a']).value, 'A',
    'the first write stands at its own mark: ' + printed(standingAt(store, ['a'])));
  assert.deepEqual(standingAt(store, ['b']), { ok: false, status: 'AddressNotFound' },
    'and the write above it is gone: ' + printed(standingAt(store, ['b'])));
  // **AND THE HEAD MARK STILL REPLAYS AFTER THAT**, which is what makes the floor a BASE and not a truncation:
  // nothing the restoral did removed an entry (`restoreMark` appends none and removes none), so a second restoral
  // to the newer mark answers the newer state again.
  const atSecondAgain = attempt(() => Reflect.apply(withAddon().restoreMark, store, [markAfterB]));
  assert.equal(refusalStatus(atSecondAgain), null,
    'and the newer mark replays again from the same record: ' + JSON.stringify(refusalStatus(atSecondAgain)));
  assert.equal(standingAt(store, ['b']).value, 'B',
    'the second write comes back: ' + printed(standingAt(store, ['b'])));
  t.diagnostic('RF-2 measured on an uncompacted store: a="A" b="B" c=refused AddressNotFound at the head mark, '
    + 'a="A" b=refused AddressNotFound at the earlier one — unchanged from the pre-fix tree');
});

// =============================================================================================================
// `RF-3` — THE DROPPED MARK STILL ANSWERS `JournalOpUnknown`: THE DECLARED ANSWER, NOT A RESTORE
// =============================================================================================================

test('RF-3 · D-178 — a mark the compaction DROPPED still answers JournalOpUnknown and the store keeps the state it holds: the floor gives the replay a base and gives a dropped id no restoration', (t) => {
  // **THE CELL EXISTS BECAUSE THE FLOOR MAKES THE WRONG BEHAVIOUR AVAILABLE.** `journalLength: 2` and three writes
  // leave the FIRST write's entry dropped, and the state at its mark is now a state the store can compute — the
  // floor is one entry's advance away from it. **`D-160` item 3 and `M-11` are unmoved: an id the journal does not
  // hold is not a mark this primitive names**, whatever the store could reconstruct, and the answer is the code
  // (`JournalOpUnknown`) with the state UNCHANGED — the mark is resolved before the replay begins, so nothing is
  // half-replayed.
  const store = storeCreate({ journalLength: 2, listeners: [] });
  store.write(['a'], 'mem', 'A');
  const droppedMark = storeMark(store);
  store.write(['b'], 'mem', 'B');
  const retainedMark = storeMark(store);
  store.write(['c'], 'mem', 'C');
  assert.notEqual(markedOp(droppedMark), markedOp(retainedMark),
    'the drive must hold a DROPPED mark and a RETAINED one: '
      + JSON.stringify([markedOp(droppedMark), markedOp(retainedMark)]));

  const onDropped = attempt(() => Reflect.apply(withAddon().restoreMark, store, [droppedMark]));
  assert.equal(onDropped.ok, false,
    'a DROPPED mark must REFUSE, and it answered ' + JSON.stringify(refusalStatus(onDropped)));
  assert.equal(onDropped.caught.status, 'JournalOpUnknown',
    'the declared code for an id the journal does not hold (`M-11`): ' + JSON.stringify(onDropped.caught.status));
  // **AND THE REFUSAL MOVED NOTHING** — the three writes stand as the third one left them, so the floor did not
  // quietly become a restoral of a dropped position.
  const a = standingAt(store, ['a']);
  const b = standingAt(store, ['b']);
  const c = standingAt(store, ['c']);
  t.diagnostic('RF-3 measured after the refused restoral: a=' + printed(a) + ' b=' + printed(b) + ' c=' + printed(c)
    + ' — unchanged from the pre-fix tree');
  assert.deepEqual(a, { ok: true, value: 'A' },
    'the refusal left `a` where the third write found it: ' + printed(a));
  assert.deepEqual(b, { ok: true, value: 'B' }, 'and `b`: ' + printed(b));
  assert.deepEqual(c, { ok: true, value: 'C' }, 'and `c`: ' + printed(c));
  // **AND THE RETAINED MARK STILL RESTORES AFTER THE REFUSAL**, so the refusal left the record usable — which is
  // the difference between *"this position is not nameable"* and *"this store cannot be restored"*.
  const onRetained = attempt(() => Reflect.apply(withAddon().restoreMark, store, [retainedMark]));
  assert.equal(refusalStatus(onRetained), null,
    'and a retained mark still restores after the refusal: ' + JSON.stringify(refusalStatus(onRetained)));
});

// =============================================================================================================
// `RF-4` — `restoreFloor()` NAMES THE CURRENT FLOOR, WHICH IS NOW THE COMPACTED FLOOR
// =============================================================================================================

test('RF-4 · D-178 — the floor names the CURRENT floor: on a store the compaction has dropped from it holds the dropped predecessor\'s version (`a = "A"`), where the creation state holds nothing (the pre-fix tree measured a = AddressNotFound)', (t) => {
  // **THE FLOOR IS REACHED THROUGH ITS OWN ARM AND NOT THROUGH `restoreMark`'s ABSENT CARRIER**: an absent position
  // names the journal's HEAD (`§6.6` item 1), so the floor is the CARRIER's floor row, which the store's crossing
  // folds to its own `restoreFloor` (`bindings/js/src/crossing.rs`: the floor row is `Store::restoreFloor`). **The
  // carrier is the store's own answer** (`floorCarrier`), taken from a store whose journal held no entry.
  const store = storeCreate({ journalLength: 2, listeners: [] });
  store.write(['a'], 'mem', 'A');
  store.write(['b'], 'mem', 'B');
  store.write(['c'], 'mem', 'C');
  const floor = floorCarrier();
  assert.equal(floor !== null && typeof floor === 'object' && floor.k === 'F', true,
    'the drive must hold the store\'s FLOOR carrier; it held ' + JSON.stringify(floor));
  assert.equal(standingAt(store, ['a']).value, 'A',
    'the drive must stand `a` before the restoral: ' + printed(standingAt(store, ['a'])));

  const onFloor = attempt(() => Reflect.apply(withAddon().restoreMark, store, [floor]));
  assert.equal(refusalStatus(onFloor), null,
    'the floor is a position the store answers for: ' + JSON.stringify(refusalStatus(onFloor)));
  const a = standingAt(store, ['a']);
  const b = standingAt(store, ['b']);
  const c = standingAt(store, ['c']);
  t.diagnostic('RF-4 measured at the floor after one drop: a=' + printed(a) + ' b=' + printed(b) + ' c=' + printed(c)
    + ' — the pre-fix tree measured a=refused AddressNotFound b=refused AddressNotFound c=refused AddressNotFound');
  // **THE WHOLE SUBJECT IN ONE READING**: the entry `journalLength: 2` dropped set `a`, so the floor the retained
  // entries replay onto HOLDS `a` — and `born`, which is the state before the journal's first entry, does not.
  assert.equal(a.ok && a.value === 'A', true,
    'the floor is the state immediately after the entry the cap dropped, so the dropped write\'s own version '
      + 'STANDS there: a=' + printed(a) + '; the creation state has nothing, which is what the pre-fix tree '
      + 'answered (a=refused AddressNotFound)');
  // **AND THE FLOOR IS NOT THE HEAD**: every entry the journal still holds is ABOVE the floor, so the rest of the
  // register is gone — a floor that answered `b` or `c` would be the head wearing the floor's name.
  assert.deepEqual(b, { ok: false, status: 'AddressNotFound' },
    'and the floor is BELOW every retained entry, so `b` is gone: ' + printed(b));
  assert.deepEqual(c, { ok: false, status: 'AddressNotFound' },
    'and `c` with it: ' + printed(c));
  // **AND THE FLOOR DID NOT COMPACT ANYTHING**: `restoreFloor` appends no entry and removes none, so the journal's
  // own mark still names the last write and still replays it.
  const retained = storeMark(store);
  const onRetained = attempt(() => Reflect.apply(withAddon().restoreMark, store, [retained]));
  assert.equal(refusalStatus(onRetained), null,
    'the record is unmoved by the floor, so the head mark still restores: ' + JSON.stringify(refusalStatus(onRetained)));
  assert.equal(standingAt(store, ['c']).value, 'C',
    'and the head still re-states the write above the floor: ' + printed(standingAt(store, ['c'])));
});

// =============================================================================================================
// `RF-5` — THE SHAPE THE `under` RE-DERIVATION EXISTS FOR: THE DROPPED ENTRY'S OWN ADDRESS IS NESTED
// =============================================================================================================

/**
 * **⟶ ADDED 2026-11-22 — `RF-5`'s DRIVE, WHICH IS THE CELL `D-179` ITEM 6 NAMED AS OWED: FOUR APPENDS, ONE
 * STORE, AND THE STORE'S OWN MARK AFTER EACH.** **EVERY STEP IS LOAD-BEARING AND NONE IS SCENERY:**
 *
 *   * **`p` IS WRITTEN FIRST AND AT THE TOP LEVEL.** Its version is the ENCLOSING one a version below it hangs
 *     under, **and its own entry is the first the compaction takes** — a `journalLength` cap drops the OLDEST
 *     append — **so its `after` is the capture that puts `p` into the floor.** That is the version `walk`'s
 *     lowest-persistence rule (`§2.3`, `A28`) resolves, i.e. the ground the re-derivation is read over.
 *   * **`p/q` IS THE SUBJECT.** A write BELOW that pair, whose own `after` capture is RELATIVE to a NESTED
 *     address: **its own version carries `under: None`, which is TRUE at the addressed pair and FALSE one level
 *     down** (`Captured::under`; `D-179` item 2) — re-based onto the floor's absolute path, `None` places it
 *     under no parent version at all and `rebuild` skips it.
 *   * **`s` IS THE RETAINED MARK THE CELL RESTORES TO.** It is appended ABOVE the nested entry, so the state it
 *     names holds the nested write **and the replay reaches that state only through the floor**.
 *   * **`t` FORCES THE NESTED ENTRY'S DROP** — one append more than the cap keeps.
 *
 * **THE MARKS ARE THE STORE'S OWN ANSWERS AND NEVER A COMPOSED POSITION** (`storeMark`): the test-tree census
 * (`json-crossing.test.mjs`'s `JC-TC-44`) refuses a spelled carrier, and the store's own record is the honest
 * instrument anyway.
 */
function nestedFloorDrive(cfg, tier) {
  const store = storeCreate(cfg);
  store.write(['p'], tier, { q: 'seed' });
  const afterParent = storeMark(store);
  store.write(['p', 'q'], tier, 'Q');
  const afterNested = storeMark(store);
  store.write(['s'], tier, 'S');
  const afterKept = storeMark(store);
  store.write(['t'], tier, 'T');
  const afterHead = storeMark(store);
  return { store, afterParent, afterNested, afterKept, afterHead };
}

/** **THE FOUR READS `RF-5` ASSERTS, TAKEN IN ONE PLACE SO EVERY ARM READS THE SAME REGISTER** — `p` (the
 *  enclosing pair's assembled value), `p/q` (the nested version), `s` (the retained write's own) and `t` (the
 *  write above the restoral's mark). */
function nestedReadings(store) {
  return {
    p: standingAt(store, ['p']),
    pq: standingAt(store, ['p', 'q']),
    s: standingAt(store, ['s']),
    t: standingAt(store, ['t']),
  };
}

/** The four readings as one print, so a message carries the whole register and not a fragment. */
function printNested(readings) {
  return 'p=' + printed(readings.p) + ' p/q=' + printed(readings.pq)
    + ' s=' + printed(readings.s) + ' t=' + printed(readings.t);
}

/** **THE IMAGE AT THE PATH, AS THE STATE IT SPELLS** — parsed and re-serialized so whitespace is not a reading,
 *  `the path is absent` where nothing stands there. **IT IS THE `file` TIER'S OWN ANSWER**: the store's one
 *  serializer wrote it and this reads it back, adding no rule of its own (`D-110`). */
function imageState(filePath) {
  if (!existsSync(filePath)) return 'the path is absent';
  const read = attempt(() => readFileSync(filePath, 'utf8'));
  if (!read.ok) return 'the path could not be read';
  const parsed = attempt(() => JSON.parse(read.value));
  return parsed.ok ? JSON.stringify(parsed.value) : 'the image is not JSON';
}

test('RF-5 · D-179 item 6 — a restoral to a RETAINED mark above a drop whose own address was NESTED keeps the version that entry wrote: `p/q` stands at "Q" and `p` assembles it on `mem` and on `file` (the tree with the enclosing-version re-derivation REMOVED answered `p/q = "seed"`, the value the FIRST, also-dropped write left)', (t) => {
  // **THE READING THE TREE WITHOUT THE RE-DERIVATION GAVE — MEASURED BY RUNNING THIS CELL ON THAT TREE, AND NOT
  // ASSUMED.** `src/store.rs`'s `advance_floor` had its `enclosing` block and its use removed, the crate was
  // rebuilt (`CARGO_HOME=$PWD/.cargo-home`), and this same drive was run: **the nested version is not rebuilt at
  // all**, so `p/q` falls back to the value the FIRST write's own capture left inside `p`'s captured value.
  // **IT IS PRINTED IN EVERY ASSERTION THE REMOVAL MOVES**, so a regression is caught by reading one line rather
  // than by re-running a second tree.
  const WITHOUT_REDERIVATION = 'p={"q":"seed"} p/q="seed" s="S" t=refused AddressNotFound, and on `file` '
    + '{"p":{"q":"seed"},"s":"S"}';

  // ── (1) THE COMPACTED ARM, ON `mem` ─────────────────────────────────────────────────────────────────────────
  // **`journalLength: 2`, the cap `RF-1` uses, and four appends**: the third append takes the parent's entry and
  // the fourth takes the NESTED one — so the floor has advanced by the nested entry before the restoral begins.
  const compacted = nestedFloorDrive({ journalLength: 2, listeners: [] }, 'mem');
  const store = compacted.store;

  // **THE DRIVE'S COHERENCE, ASSERTED BEFORE ITS VERDICT** (`D-21`): four distinct op-id carriers, the live
  // register holding the nested version, and — the store's own membership instrument, never the cap re-derived
  // here — the two marks the compaction took REFUSING (`D-160` item 3).
  const ops = [compacted.afterParent, compacted.afterNested, compacted.afterKept, compacted.afterHead].map(markedOp);
  assert.equal(ops.every((op) => typeof op === 'string' && op.length > 0), true,
    'the drive must hold one op-id carrier per append: ' + JSON.stringify(ops));
  assert.equal(new Set(ops).size, 4,
    'and four DISTINCT marks, one per append: ' + JSON.stringify(ops));
  assert.equal(standingAt(store, ['p', 'q']).value, 'Q',
    'the nested write must STAND before the restoral, or the drive never reached the shape: '
      + printed(standingAt(store, ['p', 'q'])));
  const onParent = attempt(() => Reflect.apply(withAddon().restoreMark, store, [compacted.afterParent]));
  const onNested = attempt(() => Reflect.apply(withAddon().restoreMark, store, [compacted.afterNested]));
  assert.equal(refusalStatus(onParent), 'JournalOpUnknown',
    'the TOP-LEVEL entry must be the one the cap took first — it is what puts `p` in the floor: '
      + JSON.stringify(refusalStatus(onParent)));
  assert.equal(refusalStatus(onNested), 'JournalOpUnknown',
    'and the NESTED entry must be DROPPED TOO, which is this cell\'s whole premise: '
      + JSON.stringify(refusalStatus(onNested)));
  assert.equal(standingAt(store, ['p', 'q']).value, 'Q',
    'and the two refusals left the register where the fourth write found it: '
      + printed(standingAt(store, ['p', 'q'])));

  // **THE ACT, AT THE PACKAGE'S OWN INVOCATION** (`constraints.mjs`'s `Reflect.apply(withAddon().restoreMark,
  // store, [mark])`, `:3354`): the RETAINED mark that stands ABOVE the drop.
  const onKept = attempt(() => Reflect.apply(withAddon().restoreMark, store, [compacted.afterKept]));
  assert.equal(refusalStatus(onKept), null,
    'a RETAINED mark must restore and must answer for it; this store answered '
      + JSON.stringify(refusalStatus(onKept)));

  const atKept = nestedReadings(store);
  t.diagnostic('RF-5 measured on the compacted `mem` store at ' + markedOp(compacted.afterKept) + ': '
    + printNested(atKept) + ' — with the enclosing-version re-derivation REMOVED the same drive read '
    + WITHOUT_REDERIVATION);
  // **THE SUBJECT'S OWN ASSERTION COMES FIRST**, so the one line a regression prints is the nested version's
  // reading and not a reading the absence also moves (the enclosing pair's assembly).
  assert.equal(atKept.pq.ok && atKept.pq.value === 'Q', true,
    'THE WHOLE SUBJECT IN ONE READING: the nested version was written by the entry `journalLength: 2` DROPPED, '
      + 'its capture carries `under: None` because it is relative to its own address, and re-based one level '
      + 'down that places it under NO parent version at all — so it stands only if the enclosing version is '
      + 're-derived from the floor (`D-179` item 2). This tree answered p/q=' + printed(atKept.pq)
      + '; the tree with the re-derivation REMOVED read ' + WITHOUT_REDERIVATION);
  assert.equal(printed(atKept.p), '{"q":"Q"}',
    'and the enclosing pair is the floor\'s own version of `p` WITH the nested version rebuilt under it, so its '
      + 'assembled value holds "Q": p=' + printed(atKept.p) + '; the tree with the enclosing-version '
      + 're-derivation REMOVED read ' + WITHOUT_REDERIVATION);
  assert.equal(atKept.s.ok && atKept.s.value === 'S', true,
    'and the retained write above the drop still replays, which every tree has measured: s=' + printed(atKept.s));
  assert.deepEqual(atKept.t, { ok: false, status: 'AddressNotFound' },
    'and the write ABOVE the restoral\'s mark is gone, because the replay stops at the mark: t='
      + printed(atKept.t));

  // ── (2) THE CONTROL: THE SAME DRIVE WITH NOTHING DROPPED ───────────────────────────────────────────────────
  // **THE CONTROL'S SUBJECT IS THE DIFFERENCE THIS CELL CLAIMS.** The compacted arm's reading is the state at a
  // retained mark; **a store that dropped nothing answers the SAME state at the SAME mark with the SAME four
  // appends and the SAME restoral**, so what moved in (1) is the COMPACTION and not the restoral. **AND THE CAP
  // IS THE ONLY DIFFERENCE, ASSERTED AT THE STORE'S OWN ANSWER**: the nested entry's OWN mark — which the
  // compacted arm saw refuse — RESTORES on this one.
  const control = nestedFloorDrive({ journalLength: 8, listeners: [] }, 'mem');
  const onNestedControl = attempt(() => Reflect.apply(withAddon().restoreMark, control.store, [control.afterNested]));
  assert.equal(refusalStatus(onNestedControl), null,
    'with nothing dropped the nested entry\'s own mark must still restore — which is what makes the compacted '
      + 'arm\'s refusal the DROP and not the address: ' + JSON.stringify(refusalStatus(onNestedControl)));
  const controlAtNested = nestedReadings(control.store);
  assert.equal(controlAtNested.pq.ok && controlAtNested.pq.value === 'Q', true,
    'and at its own mark the nested write stands, with no floor in the path: ' + printNested(controlAtNested));
  assert.deepEqual(controlAtNested.s, { ok: false, status: 'AddressNotFound' },
    'and the write above that mark is gone: s=' + printed(controlAtNested.s));

  const onKeptControl = attempt(() => Reflect.apply(withAddon().restoreMark, control.store, [control.afterKept]));
  assert.equal(refusalStatus(onKeptControl), null,
    'the same retained mark restores on the uncompacted store: ' + JSON.stringify(refusalStatus(onKeptControl)));
  const controlAtKept = nestedReadings(control.store);
  t.diagnostic('RF-5 control measured on the uncompacted `mem` store at ' + markedOp(control.afterKept) + ': '
    + printNested(controlAtKept) + ' — IDENTICAL to the compacted arm\'s reading, so the difference between the two'
    + ' arms is the COMPACTION and not the restoral');
  assert.equal(printed(controlAtKept.p), '{"q":"Q"}', 'control p=' + printed(controlAtKept.p));
  assert.equal(controlAtKept.pq.ok && controlAtKept.pq.value === 'Q', true,
    'THE CONTROL\'S READING IS THE COMPACTED ARM\'S — p/q=' + printed(controlAtKept.pq) + ', which needs no '
      + 'floor at all — so the arm above is the drop and not the restoral');
  assert.equal(controlAtKept.s.ok && controlAtKept.s.value === 'S', true,
    'and its retained write: s=' + printed(controlAtKept.s));
  assert.deepEqual(controlAtKept.t, { ok: false, status: 'AddressNotFound' },
    'and the write above the mark is gone here too: t=' + printed(controlAtKept.t));

  // ── (3) THE `file` TIER: THE RESTORED STATE MUST REACH THE IMAGE ──────────────────────────────────────────
  // **THE SAME FOUR APPENDS AT `file`, WITH EVERY MARK THE STORE'S OWN**, so the restored state is also the state
  // the path holds — `replayMark`'s last act is that save (`M-12`), and a floor answer that never reached the
  // bytes would be half the ruling.
  const dir = mkdtempSync(join(tmpdir(), 'rf5-floor-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const filePath = join(dir, 'store.json');
  const filed = nestedFloorDrive({ journalLength: 2, listeners: [], filePath }, 'file');
  assert.equal(standingAt(filed.store, ['p', 'q']).value, 'Q',
    'the `file` drive must stand the nested version before the restoral: '
      + printed(standingAt(filed.store, ['p', 'q'])));
  assert.equal(imageState(filePath), '{"p":{"q":"Q"},"s":"S","t":"T"}',
    'and the live image must hold every write, or the drive wrote nothing durable: ' + imageState(filePath));
  const onFileNested = attempt(() => Reflect.apply(withAddon().restoreMark, filed.store, [filed.afterNested]));
  assert.equal(refusalStatus(onFileNested), 'JournalOpUnknown',
    'the `file` drive\'s nested entry must be dropped too, at the store\'s own answer: '
      + JSON.stringify(refusalStatus(onFileNested)));
  const onFileKept = attempt(() => Reflect.apply(withAddon().restoreMark, filed.store, [filed.afterKept]));
  assert.equal(refusalStatus(onFileKept), null,
    'and its retained mark must restore: ' + JSON.stringify(refusalStatus(onFileKept)));

  const atFileKept = nestedReadings(filed.store);
  const image = imageState(filePath);
  t.diagnostic('RF-5 measured on the compacted `file` store at ' + markedOp(filed.afterKept) + ': '
    + printNested(atFileKept) + ' and the image at the path reads ' + image
    + ' — with the enclosing-version re-derivation REMOVED the image read {"p":{"q":"seed"},"s":"S"}');
  assert.equal(atFileKept.pq.ok && atFileKept.pq.value === 'Q', true,
    'the `file` tier answers the nested version from the floor as the `mem` tier does: p/q='
      + printed(atFileKept.pq) + '; the tree with the re-derivation REMOVED read ' + WITHOUT_REDERIVATION);
  assert.deepEqual(atFileKept.t, { ok: false, status: 'AddressNotFound' },
    'and the write above the mark is gone from the register: t=' + printed(atFileKept.t));
  assert.equal(image, '{"p":{"q":"Q"},"s":"S"}',
    'THE `file` TIER\'S HALF — THE RESTORED STATE REACHES THE IMAGE: the nested version is in the bytes at the '
      + 'path, and the write above the mark is not. The image read ' + image + '; the tree with the '
      + 'enclosing-version re-derivation REMOVED wrote ' + WITHOUT_REDERIVATION);
});
