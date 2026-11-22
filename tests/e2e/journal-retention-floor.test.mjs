// journal-retention-floor.test.mjs — **`D-178`: THE REPLAY STARTS FROM THE COMPACTED FLOOR'S STATE AND NOT FROM
// `born`, AND THESE FOUR CELLS ARE THE RULING'S OWN DRIVE.**
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
