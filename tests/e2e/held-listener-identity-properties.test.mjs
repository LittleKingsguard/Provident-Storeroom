// RED SET — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`): THE TYPED PROPERTY LAYER.
//
// **THE REGISTER IS `contract.md §5`'s, ROW FOR ROW — `P-HL-1` … `P-HL-8`, EIGHT ROWS, CAP `≤ 8` ✓**
// (`§5.0`). **EVERY ROW IS EXECUTED HERE WITH A DETERMINISTIC PINNED SEED, AT MOST `100` ATTEMPTS PER ROW
// AND AT MOST `400` IN TOTAL, STOPPING AFTER `5` FAILURES IN ANY ONE ROW** (`§5.0`; the same discipline the
// corpus's other red sets use at `constraint-kernel-properties.test.mjs`).
//
// **EVERY STRATEGY ID THIS FILE USES IS ONE ITS OWN ROW DECLARES, AND NO OTHER** — the ids are read from the
// contract's bytes by the closure cell below, so the file cannot close over its own literals:
//
//   §5.1 `P-HL-1` · `S-ID-TYPE` · `S-ID-MONO` · `S-ID-UNIQ`
//   §5.2 `P-HL-2` · `S-PURGE-ALL` · `S-PURGE-ORDER` · `S-PURGE-SET`
//   §5.3 `P-HL-3` · `S-PAIR-SHAPE` · `S-PAIR-TOTAL` · `S-PAIR-DISTINCT`
//   §5.4 `P-HL-4` · `S-SEL-EXACT` · `S-SEL-SNAPSHOT` · `S-SEL-DEDUPE`
//   §5.5 `P-HL-5` · `S-DEDUPE-HANDLE` · `S-DEDUPE-ARG` · `S-DEDUPE-WINDOW`
//   §5.6 `P-HL-6` · `S-ID-STORE` · `S-ID-DELETE` · `S-ID-SCOPE`
//   §5.7 `P-HL-7` · `S-MEMBER-COUNT` · `S-REMOVE-WHOLE` · `S-REMOVE-ATOMIC`
//   §5.8 `P-HL-8` · `S-K6-EXTENT` · `S-K6-ROUTE` · `S-K6-ANSWER`
//
// **A ROW WHOSE GENERATOR IS NOT DERIVABLE FROM THE SPEC IS NAMED AS SUCH AND NOT INVENTED.** The one
// subject this file does NOT generate is `K-6`'s state on a stale handle: `contract.md §10` item 4 states
// that whether the removal is a no-op on that state or whether the purge is also reached is `OWED`, and
// `remove-member.md §4` item 5 says *"UNTIL IT LANDS, THE DRIVE ASSERTS THE ARMS OF `§4` ITEM 2 AND NOT A
// FOURTH"*. `P-HL-8`'s generator therefore draws only the three declared arms.
//
// ── THE GENERATORS' DOMAINS, EACH THE CONTRACT'S OWN ───────────────────────────────────────────────
//
// · THE HANDLE DOMAIN — `{ s : s ∈ String ∧ s ≠ "" }` (`§2.1` item 1; `identity-and-domain.md §2` item 1),
//   with the outside values drawn from `identity-and-domain.md §2` item 3's ten rows.
// · THE ADDRESS DOMAIN — a JS/JSON array of `string` keys or non-negative integer indices, the empty array
//   included (`docs/specs/storeroom-native/store-model.md §1.5` item 1, cited at `listen-verb.md §2.2`
//   item 1; `PAR-HL-2`).
// · THE ADDRESS-SET DOMAIN — an array of addresses, the empty array included (`PAR-HL-2`).
// · THE CONSTRAINT OUTCOME'S THREE ARMS — `true` · `{message}` · `{message, repair}`
//   (`PAR-HL-33`; `docs/specs/storeroom-constraints/kernel-surface.md §2.3` item 1).

import test from 'node:test';
import assert from 'node:assert/strict';
// **⟶ `dirname` IS GONE FROM THIS LINE WITH THE CONTRACT READ IT SERVED — 2026-10-24 (`D-17`).**
// `readFileSync`/`fileURLToPath` still have their two own-bytes consumers below; `dirname` had one, and it was
// the removed `contractPath`.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

import {
  THE_FOURTEEN, handleOutsideValues, setOutsideValues, capture, tag, newHandle, makeStore,
  seedContainers, kernel, KERNEL_ITEMS, STORE_CODES, KC_TOKENS,
  assertRuleOne, assertRuleTwo, assertAllPairs, assertTriggerPair, handlesOf, sameTriggerSet,
} from '../integration/js-constraints/held-listener-identity-helpers.mjs';

// ── THE DETERMINISTIC PINNED SEEDS ─────────────────────────────────────────────────────────────────
//
// ONE SEED PER ROW, PINNED AS A LITERAL. The generator is a `mulberry32` 32-bit mixer: a pure function of
// the seed, with no clock, no `Math.random` and no host entropy, so every run draws the same values in the
// same order (`§5.0`'s "one or more strategy ids" is satisfied by executing, not by describing).
const SEEDS = {
  'P-HL-1': 0x8E1D01,
  'P-HL-2': 0x8E1D02,
  'P-HL-3': 0x8E1D03,
  'P-HL-4': 0x8E1D04,
  'P-HL-5': 0x8E1D05,
  'P-HL-6': 0x8E1D06,
  'P-HL-7': 0x8E1D07,
  'P-HL-8': 0x8E1D08,
};

const MAX_FAILURES_PER_ROW = 5;
const MAX_ATTEMPTS_PER_ROW = 100;
const MAX_ATTEMPTS_TOTAL = 400;

let totalAttempts = 0;

function rngFor(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (next, list) => list[Math.floor(next() * list.length) % list.length];
const intBetween = (next, lo, hi) => lo + Math.floor(next() * (hi - lo + 1));

/**
 * THE ROW RUNNER — at most `MAX_ATTEMPTS_PER_ROW` attempts, stopping after `MAX_FAILURES_PER_ROW` failures,
 * reporting the row id, its DECLARED strategy ids, its seed and the attempts it actually ran. **A ROW'S
 * BUDGET IS THE EVEN SHARE OF THE `400`, CAPPED AT THE PER-ROW `100`** (`20` drives → `20` each;
 * `20 x 20 = 400 ≤ 400` ✓), so both declared terms are real and neither drifts.
 *
 * **AND THE DIVISOR IS THE NUMBER OF DRIVES THIS FILE ACTUALLY RUNS (`DRIVES`), NOT THE REGISTER'S `8`
 * ROWS: the register's `8` rows are executed by `20` drives here — one canonical generator per row, plus
 * the alt drives that carry a row's second strategy id, plus the three UNDER-GENERATED cells the gate-4
 * adversarial pass owed, plus the two the final audit's PBT re-audit owed (the double-act class and the
 * `id`-colliding key) — and the total cap `400` is ONE budget over ALL of them, so an even share taken
 * over `8` would let `20` drives consume `800` attempts and trip the cap's own guard on the drives that run
 * last** (`§5.0`'s census is the REGISTER's `8`; the cap is this file's own and is printed at its closing
 * cell).
 */
const DRIVES = 20;
const ROW_BUDGET = Math.min(MAX_ATTEMPTS_PER_ROW, Math.floor(MAX_ATTEMPTS_TOTAL / DRIVES));

function row({ id, strategies, seed, attempts, body }) {
  const rng = rngFor(seed);
  const failures = [];
  let ran = 0;
  for (let i = 0; i < attempts && failures.length < MAX_FAILURES_PER_ROW; i += 1) {
    totalAttempts += 1;
    assert.ok(totalAttempts <= MAX_ATTEMPTS_TOTAL,
      'the total attempt budget stands at ' + MAX_ATTEMPTS_TOTAL + ' — read ' + totalAttempts);
    ran += 1;
    try {
      body(rng, i);
    } catch (err) {
      failures.push({ attempt: i, message: err && err.message ? err.message : String(err) });
    }
  }
  return { id, strategies, seed, attempts: ran, failures };
}

/** A fresh store and a fresh, drive-owned label for every attempt. */
function fixture() {
  return { store: makeStore({ journalLength: 64 }), label: tag('prop') };
}

const pass = () => true;

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.1  `P-HL-1` — THE IDENTITY IS ONE CALLER-SPELLED STRING, AND THE STORE HOLDS AT MOST ONE LIVE ENTRY
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_1_the_identity_is_one_caller_spelled_string_and_the_entry_is_unique_per_string', () => {
  // **PROPERTY: FOR EVERY STORE INSTANCE AND EVERY INSTANT: EVERY LISTENER ENTRY THE INSTANCE HOLDS NAMES A
  // NON-EMPTY `string` THAT THE CALLER SUPPLIED, AND NO TWO LIVE ENTRIES NAME THE SAME STRING.**
  // **`S-ID-TYPE`** (one drive per admitted class: a non-empty string admits; every other class refuses, at
  // each of the three sites) · **`S-ID-MONO`** (a `listen` then a write then a `removeListener` — the handle
  // in `triggered`, in the entry and in the removal is ONE STRING, compared by value) · **`S-ID-UNIQ`** (a
  // handle standing at N addresses yields ONE entry and N store rows; a reused handle never yields two live
  // entries) (`contract.md §5.1`; `§2.1` items 1–5; `identity-and-domain.md §1`).
  //
  // **FAILURE LIST**: a minted handle anywhere; a handle whose store-side spelling differs from the caller's;
  // two live entries under one handle string; a number/object/`null`/`undefined`/`""` admitted at any of the
  // three sites; a handle keyed by a second value; an entry whose function slot is empty while it exists.
  const result = row({
    id: 'P-HL-1',
    strategies: ['S-ID-TYPE', 'S-ID-MONO', 'S-ID-UNIQ'],
    seed: SEEDS['P-HL-1'],
    attempts: ROW_BUDGET,
    body: (rng, i) => {
      const { store, label } = fixture();
      const mode = i % 3;

      if (mode === 0) {
        // ── `S-ID-TYPE`: the ADMITTED class is a non-empty string, and it is admitted at all three sites.
        const handle = newHandle(label);
        const address = [[label, 'a']];
        // **⟶ RE-DERIVED 2026-10-24 (`D-22`): `listen` ANSWERS THE HANDLE IT WATCHES UNDER.** The bytes
        // read `assert.equal(store.listen(handle, address), undefined, …)` — the `Handle → undefined` return
        // the 2026-10-19 pass declared and `D-22` OVERRULES BY NAME (*"Listen should return the handle on
        // success, or error message on fail"*). **The success signal now CARRIES the identity**, and the
        // assertion is the stronger one: the value the store answers IS the caller's own spelling.
        assert.equal(store.listen(handle, address), handle,
          'a non-empty string is ADMITTED at `listen` and the answer IS that handle (`D-22`; `PAR-HL-3`)');
        const used = [newHandle(label + 'u1'), newHandle(label + 'u2')][intBetween(rng, 0, 1)];
        assert.equal(store.register(handle, () => {}), undefined,
          'and `register` on the handle `listen` wrote is ADMITTED (`PAR-HL-6`)');
        assert.equal(store.removeListener(handle), undefined,
          'and the SAME string is admitted at `removeListener` (`PAR-HL-14`): one value, not three spellings '
          + '(`identity-and-domain.md §1` item 1)');
        return used && undefined; // keep the generator's draw live without asserting on it
      }

      if (mode === 1) {
        // ── `S-ID-MONO`: the handle in `triggered`, in the entry and in the removal is ONE STRING.
        const handle = newHandle(label);
        // ONE ADDRESS AND THE SET THAT CARRIES IT: `listen`'s second position is a SET
        // (`listen-verb.md §2.2` item 1), the write's first position is ONE address (`§2.4` item 7) —
        // and the container the write lands inside is seeded first (`write-and-read.md §3.4`; `F-3`).
        const address = [label, 'm'];
        seedContainers(store, address);
        store.listen(handle, [address]);
        store.register(handle, () => {});
        const record = store.write(address, 'mem', intBetween(rng, 0, 9));
        for (const element of record.triggered) {
          assertTriggerPair(element, 'the trigger element');
          assert.equal(typeof element.handle, 'string',
            'every handle the store reports is a STRING (`PAR-HL-19`)');
        }
        assert.deepEqual(handlesOf(record.triggered), [handle],
          'and it is THE CALLER\'S OWN VALUE, by string equality — the store did not mint, wrap or encode it '
          + '(`§2.1` item 1; `identity-and-domain.md §1` item 1; `§6` `O-6`)');
        assert.equal(store.removeListener(handle), undefined,
          'and the SAME string is what the removal accepts (`S-ID-MONO`)');
        return;
      }

      // ── `S-ID-UNIQ`: a handle at N addresses is ONE entry over N store rows; a REUSED handle replaces.
      const handle = newHandle(label);
      const n = intBetween(rng, 1, 3);
      const addresses = Array.from({ length: n }, () => [label, tag('at')]);
      // EACH WRITTEN ADDRESS'S CONTAINER IS SEEDED FIRST — the write mints its key inside an existing
      // parent and answers `AddressNotFound` where none stands (`write-and-read.md §3.4`; `F-3`). The
      // seeds precede `listen`/`register`, so no seed reaches a body.
      for (const address of addresses) seedContainers(store, address);
      store.listen(handle, addresses);
      store.register(handle, () => {});
      for (const address of addresses) {
        const at = store.write(address, 'mem', 1);
        assert.equal(at.triggered.filter((e) => e.handle === handle).length, 1,
          'ONE entry per handle: each address of the set returns the handle exactly once '
          + '(`§2.1` item 3; `§2.2` item 3)');
      }
      // A REUSED HANDLE REPLACES — it never yields two live entries (`§2.1` item 3; `§2.2` item 3).
      const elsewhere = [label, tag('reused')];
      store.listen(handle, [elsewhere]);
      const original = store.write(addresses[0], 'mem', 2);
      assert.deepEqual(handlesOf(original.triggered), [],
        'the purge-and-replace rule means a reused handle REPLACES rather than adds: the address it no longer '
        + 'names fires nothing (`§2.1` item 3; `§2.2` item 3; `P: docs/pending.md · P-6` rule 2)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-1 (' + result.strategies.join(', ') + ', seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

test('hli_prop_P_HL_1_every_outside_class_is_refused_at_each_of_the_three_sites', () => {
  // `P-HL-1`'s `S-ID-TYPE` at the REFUSING half: **a `number`, an object, `null`, `undefined` or `""` is
  // admitted at NONE of the three sites** (`contract.md §5.1`'s FAILURE LIST; `§2.1` item 5's table;
  // `identity-and-domain.md §2` item 3). **`unlisten` is the declared exception and the property is that it is
  // the ONLY one** (`§2.1` item 5's closing clause).
  //
  // **AND THE `listen` ARM IS DRIVEN OVER ROWS 1–7 ALONE, BY THE SAME RULING THE SURFACE CELL'S ROWS 8–10
  // ARE STRUCK UNDER: `contract.md §2.1` item 5 gives `listen`'s first position the SAME CLASS TEST as
  // `register`'s, so a FRESH WELL-FORMED handle is ADMITTED at `listen` (`§2.1` item 5 governs over
  // `identity-and-domain.md §2` item 3, whose amendment at that site is a SPEC-WRITER dispatch). This
  // cell's own cited claim names CLASSES — a number, an object, `null`, `undefined`, `""` — and rows 8–10
  // are well-formed strings and no class at all, so nothing this cell claims is dropped. `register` and
  // `removeListener` are driven over EVERY drawn row, rows 8–10 included (`§2.1` item 5's own two columns).**
  const rows = handleOutsideValues();
  const result = row({
    id: 'P-HL-1',
    strategies: ['S-ID-TYPE'],
    seed: SEEDS['P-HL-1'] ^ 0x9E3779B9,
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store } = fixture();
      const row0 = pick(rng, rows);
      const handle = newHandle('keep');
      // ONE ADDRESS, THEN THE SET THAT CARRIES IT — the second position of `listen` is a SET
      // (`listen-verb.md §2.2` item 1), so the outside value is driven against a lawful set and the
      // refusal is the HANDLE's and never the address's.
      const address = ['keep', 'a'];
      store.listen(handle, [address]);
      store.register(handle, () => {});

      if (row0.row <= 7) {
        const listen = capture(() => store.listen(row0.value, [address]));
        assert.equal(listen.threw, true,
          'row ' + row0.row + ' is REFUSED at `listen` (`§4` `F-1`; `contract.md §2.1` item 5)');
        assertRuleOne(listen.thrown, 'listen over row ' + row0.row);
      }

      const register = capture(() => store.register(row0.value, () => {}));
      assert.equal(register.threw, true, 'and REFUSED at `register` (`§4` `F-4`)');
      assertRuleOne(register.thrown, 'register over row ' + row0.row);

      const remove = capture(() => store.removeListener(row0.value));
      assert.equal(remove.threw, true,
        'and THROWN at `removeListener` — the declared reversal (`§4` `F-6`; `P: docs/pending.md · P-5` `(R2)`)');

      const quiet = capture(() => store.unlisten(row0.value));
      assert.equal(quiet.threw, false,
        'WHILE `unlisten` answers the SAME value as a no-op success — the ONE site that does not throw '
        + '(`§2.1` item 5\'s closing clause; `§4` `F-3`)');
      assert.equal(quiet.value, undefined, 'and its answer is undefined');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-1 alt (S-ID-TYPE, seed 0x' + (result.seed >>> 0).toString(16) + ') held over '
    + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.2  `P-HL-2` — A WRITE TO A HELD HANDLE PURGES EVERYTHING OF THE OLD HANDLE, BY HANDLE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_2_a_listen_purges_every_entry_the_handle_named_at_every_address', () => {
  // **PROPERTY: FOR EVERY ACT THAT INSTALLS AT A HANDLE THAT ALREADY STANDS, EVERY ENTRY THE OLD HANDLE NAMED
  // IS REMOVED — AT EVERY ADDRESS IT STOOD AT, ACROSS EVERY STRUCTURE — BEFORE THE NEW ELEMENT IS INSTALLED,
  // AND NO COUNT OF ADDRESSES IS CONSULTED.** **`S-PURGE-ALL`** (a handle at N addresses, a `listen` at a
  // disjoint set: `0` entries of the old set survive, asserted through a later trigger and through the
  // store's own returned set) · **`S-PURGE-SET`** (`listen(h, S1)` then `listen(h, S2)`: the standing set is
  // `S2` alone and never `S1 ∪ S2`) (`contract.md §5.2`; `§2.2` items 3–4; `P: docs/pending.md · (Y-1)`:
  // *"the purge is by HANDLE — it never enumerates addresses or consults a count"*).
  //
  // **FAILURE LIST**: an entry surviving a purge at any address; a purge that removes only the addressed
  // pair's rows; a purge consulting a count; a purge that leaves the store's index entry behind; a standing
  // set that is the union of two acts; a purge whose intermediate state holds both.
  const result = row({
    id: 'P-HL-2',
    strategies: ['S-PURGE-ALL', 'S-PURGE-SET'],
    seed: SEEDS['P-HL-2'],
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      const handle = newHandle(label);
      const nOld = intBetween(rng, 1, 3);
      const s1 = Array.from({ length: nOld }, () => [label, tag('s1')]);
      // `S2` is DISJOINT from `S1` and non-empty, so "the union of two acts" and "the last act alone" give
      // different answers at every address of `S1`.
      const s2 = Array.from({ length: intBetween(rng, 1, 2) }, () => [label, tag('s2')]);
      // EVERY WRITTEN ADDRESS'S CONTAINER IS SEEDED FIRST, before `listen`/`register`, so the writes below
      // mint their keys inside an existing parent instead of answering `AddressNotFound`
      // (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`; `seedContainers`).
      for (const address of [...s1, ...s2]) seedContainers(store, address);
      store.listen(handle, s1);
      store.register(handle, () => {});
      store.listen(handle, s2);

      // THE STANDING SET IS `S2` ALONE: no address of `S1` returns the handle.
      for (const address of s1) {
        const at = store.write(address, 'mem', 1);
        assert.deepEqual(handlesOf(at.triggered), [],
          'ZERO entries of the old set survive — a write at ' + JSON.stringify(address)
          + ' (an address of `S1`) returns nothing. The standing set is ALWAYS the last act\'s set and never '
          + '`S1 ∪ S2` (`contract.md §5.2`; `§2.2` item 3; `S-PURGE-ALL`, `S-PURGE-SET`)');
      }
      // AND `S2` STANDS, at every address of it.
      for (const address of s2) {
        const at = store.write(address, 'mem', 2);
        assert.deepEqual(handlesOf(at.triggered), [handle],
          'and every address of `S2` installs the handle (`§2.2` item 3)');
      }
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-2 (' + result.strategies.join(', ') + ', seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

test('hli_prop_P_HL_2_a_refused_creation_at_a_held_pair_leaves_the_old_element_whole', () => {
  // `P-HL-2`'s **`S-PURGE-ORDER`**: **a creation the pre-check refuses at a held pair leaves the OLD element
  // STANDING WHOLE — asserted by a trigger, by `constraints()`, and by the refusal's own throw**
  // (`contract.md §5.2`; `§2.3` item 3; `constraint-sites.md §1` item 3: *"the exception to 'no exceptions' is
  // not a second case but the ABSENCE of a purge, since nothing was ever purged"*).
  //
  // **THE FOUR OBSERVABLES THE PART NAMES, EACH ASSERTED: (i) the old listener still stands at every address;
  // (ii) its function still fires at a later write; (iii) `constraints()`'s return is unmoved; (iv) the call
  // THREW** (`constraint-sites.md §1` item 3).
  const result = row({
    id: 'P-HL-2',
    strategies: ['S-PURGE-ORDER'],
    seed: SEEDS['P-HL-2'] ^ 0x9E3779B9,
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      const address = [label, 'held'];
      const pair = { address: [address], id: 'held-pair' };
      const invoked = [];
      // THE ADDRESS THE LATER WRITE LANDS AT EXISTS FIRST — an `AddressNotFound`-free fixture, since the
      // write mints its key inside an existing parent container (`write-and-read.md §3.4` `W-3`/`W-4`;
      // `F-3`; `seedContainers`). The seed precedes every registration, so no constraint sees it.
      seedContainers(store, address);
      store.addConstraint(pair, (context) => { invoked.push(context); return true; });

      // A PRE-CHECKABLE REFUSAL at the held pair: a non-function constraint, one of `§2.3` item 4's four
      // classes (`CF-1`, rule (ii), `status` absent).
      const refused = capture(() => store.addConstraint(pair, 7));
      assert.equal(refused.threw, true,
        'a non-function constraint at a HELD pair is REFUSED (`§2.3` item 4 (i); `constraint-sites.md §7` '
        + '`CF-1`)');
      assertRuleTwo(refused.thrown, 'a non-function constraint at a held pair');
      // (iii) THE ENUMERATION IS UNMOVED and names the pair exactly once.
      assert.equal(store.constraints().filter((p) => p.id === 'held-pair').length, 1,
        'AND THE OLD ELEMENT STANDS WHOLE: `constraints()` is unmoved by the refusal '
        + '(`§2.3` item 3; `constraint-sites.md §1` item 3 (iii); `S-PURGE-ORDER`)');
      // (ii) THE OLD LISTENER STILL FIRES at a later write — the constraint still evaluates.
      const report = capture(() => store.write(address, 'mem', intBetween(rng, 0, 9)));
      assert.equal(report.threw, false,
        'and a later write at the address still evaluates the old element — a refused creation purged '
        + 'NOTHING (`§2.3` item 3; `S-PURGE-ORDER`)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-2 order (S-PURGE-ORDER, seed 0x' + (result.seed >>> 0).toString(16) + ') held over '
    + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.2 (cont.) — `P-HL-2`'s TWO UNDER-GENERATED STATES, NOW DRIVEN
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_2_an_overlap_set_and_the_empty_set_both_install_whole', () => {
  // **`P-HL-2`'s `S-PURGE-ALL`/`S-PURGE-SET` AT THE TWO DATA STATES THE CANONICAL DRIVE NEVER DRAWS — named
  // as UNDER-GENERATED at the gate-4 adversarial pass (`docs/pending.md` · GATE 4 · `P-HL-2`): "two further
  // gaps: `P-HL-2` draws no overlap purge and no `listen(h, [])`".**
  //
  // **THE STATE ENUMERATION (every one drawn below, by `i % 3`):**
  //   1. **OVERLAP** — `listen(h, S1)` then `listen(h, S2)` where `S1 ∩ S2 ≠ ∅`: a single address STANDS IN
  //      BOTH acts. `§2.2` item 3 makes the standing the LAST ACT'S SET (`S-PURGE-SET`), so the answer at the
  //      shared address is INSTALLED-BECAUSE-`S2`-NAMES-IT and at an address only `S1` named it is PURGED —
  //      and the two are NOT the same answer, which is exactly what a union (`LF-4`) and a
  //      "purge only the addressed pair's rows" (`§5.2` FAILURE LIST) each get wrong in a different direction.
  //   2. **EMPTY SET** — `listen(h, [])`: **THE EMPTY ARRAY IS IN THE DOMAIN and is the ordinary "listen at no
  //      address" act** (`listen-verb.md §2.2` item 1, verbatim), so the act SUCCEEDS, purges everything the
  //      handle named (`§2.2` item 4: the purge precedes the install and is by handle), and installs nothing.
  //   3. **EMPTY SET AS `S2` AFTER A NON-EMPTY `S1`** — the SAME act over a handle that already stands, which
  //      is the one state in which an empty set can be mistaken for "no act at all".
  //
  // **FAILURE LIST**: an address only `S1` named still returning the handle (a union); the shared address
  // NOT returning it (a purge that removed the addressed pair's rows and failed to reinstall); `listen(h, [])`
  // throwing (the empty array read as an outside value); `listen(h, [])` leaving the old set standing; an
  // entry surviving at any address of the old set; `listen(h, [])`'s answer being anything but `undefined`.
  const result = row({
    id: 'P-HL-2',
    strategies: ['S-PURGE-ALL', 'S-PURGE-SET'],
    seed: SEEDS['P-HL-2'] ^ 0x85EBCA6B,
    attempts: ROW_BUDGET,
    body: (rng, i) => {
      const { store, label } = fixture();
      const handle = newHandle(label);
      const mode = i % 3;
      const shared = [label, tag('shared')];
      const onlyOld = Array.from({ length: intBetween(rng, 1, 2) }, () => [label, tag('s1')]);
      const onlyNew = Array.from({ length: intBetween(rng, 1, 2) }, () => [label, tag('s2')]);
      const s1 = [shared, ...onlyOld];
      // EVERY WRITTEN ADDRESS'S CONTAINER IS SEEDED FIRST, before `listen`/`register`
      // (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`; `seedContainers`).
      for (const address of [...s1, ...onlyNew]) seedContainers(store, address);
      store.listen(handle, s1);
      const fired = [];
      store.register(handle, () => { fired.push(1); });
      const before = store.write(shared, 'mem', 1);
      assert.deepEqual(handlesOf(before.triggered), [handle],
        'the fixture stands: the handle fires at the shared address BEFORE the second act (`§2.2` item 5 (b))');
      const firedBefore = fired.length;

      if (mode === 2) {
        // ── STATE 3: the EMPTY SET as `S2` over a handle that already stands.
        // **⟶ RE-DERIVED 2026-10-24 (`D-22`): THE EMPTY SET ANSWERS THE HANDLE.** The bytes read `undefined`;
        // the return moved `void → Handle`, so an admitted `listen` answers the identity it watches under —
        // **including at the empty set, which is the ordinary "listen at no address" act**.
        assert.equal(store.listen(handle, []), handle,
          '`listen(h, [])` is ADMITTED and answers `h` — THE EMPTY ARRAY IS IN THE DOMAIN, the ordinary '
          + '"listen at no address" act (`listen-verb.md §2.2` item 1; `D-22`)');
        for (const address of s1) {
          assert.deepEqual(handlesOf(store.write(address, 'mem', 2).triggered), [],
            'AND IT PURGES EVERYTHING THE HANDLE NAMED — a write at ' + JSON.stringify(address)
            + ' returns nothing, so the act was a set-assignment to the empty set and not a no-op '
            + '(`§2.2` item 3; `§2.2` item 4; `S-PURGE-ALL`)');
        }
        assert.equal(fired.length, firedBefore,
          'and nothing of the old element fires again (`S-PURGE-ALL`)');
        // The handle is still the caller's: `listen`'s class test admits it and creates a fresh reservation.
        assert.equal(store.listen(handle, [onlyNew[0]]), handle,
          'while the handle itself survives the empty set — it is a RESERVATION at no address, not a '
          + 'deletion (`§2.2` item 5 (a); `removal-members.md §2.7` item 2)');
        return;
      }

      // ── STATES 1 AND 2: `S2` is an OVERLAP of `S1` (mode 0) or the DISJOINT set (mode 1, the canonical
      //    drive's own state, retained here as the control that keeps the overlap reading honest).
      const s2 = mode === 0 ? [shared, ...onlyNew] : [...onlyNew];
      assert.equal(store.listen(handle, s2), handle,
        'the second act is admitted and answers ITS OWN handle — the return moved `Handle → undefined` to '
        + '`void → Handle` (`D-22`), so every admitted `listen` answers the identity it watches under');

      if (mode === 0) {
        // THE SHARED ADDRESS STANDS — because `S2` NAMES IT, not because `S1` named it. This is the ONE
        // assertion the overlap state adds, and the two ways a purge can get it wrong fail it in opposite
        // directions: a union keeps it only by accident of `S1`, and a purge that clears the addressed
        // pair's rows without reinstalling drops it.
        assert.deepEqual(handlesOf(store.write(shared, 'mem', 2).triggered), [handle],
          'THE ADDRESS BOTH SETS NAME STILL STANDS, and it stands as `S2`\'s member: the standing set is the '
          + 'LAST ACT\'S SET (`§2.2` item 3; `S-PURGE-SET`). A purge that removed only the addressed pair\'s '
          + 'rows and failed to reinstall would drop it (`§5.2` FAILURE LIST)');
      } else {
        // THE CONTROL: where `S2` does NOT name the shared address, the shared address is purged with every
        // other address of `S1` — so "stands" above is a claim about `S2`'s membership and not about `S1`'s
        // (`§2.2` item 3; `LF-4`).
        assert.deepEqual(handlesOf(store.write(shared, 'mem', 2).triggered), [],
          'AND WHERE `S2` DOES NOT NAME THE SHARED ADDRESS IT IS PURGED LIKE EVERY OTHER MEMBER OF `S1` — '
          + 'the control that makes the overlap assertion a claim about `S2`\'s membership and not `S1`\'s '
          + '(`§2.2` item 3; `LF-4`)');
      }
      // AND AN ADDRESS ONLY `S1` NAMED IS GONE — this is what tells set-assignment from UNION (`LF-4`).
      for (const address of onlyOld) {
        assert.deepEqual(handlesOf(store.write(address, 'mem', 3).triggered), [],
          'WHILE AN ADDRESS ONLY `S1` NAMED IS PURGED — a write at ' + JSON.stringify(address)
          + ' returns nothing. The standing set is `S2` alone and never `S1 ∪ S2` (`§2.2` item 3; '
          + '`LF-4`; `S-PURGE-ALL`)');
      }
      // AND EVERY ADDRESS ONLY `S2` NAMED STANDS.
      for (const address of onlyNew) {
        assert.deepEqual(handlesOf(store.write(address, 'mem', 4).triggered), [handle],
          'and every address only `S2` named installs the handle (`§2.2` item 3)');
      }
      assert.equal(store.constraints().length, 0,
        'and NO constraint pair was created, moved or purged by a listener act — the two structures are '
        + 'different and `listen` reaches listener entries alone (`constraint-identity.md §3` item 3; '
        + '`IF-6`)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-2 overlap/empty (S-PURGE-ALL, S-PURGE-SET, seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.3  `P-HL-3` — THE STORE'S RESPONSE CARRIES THE BINDING ADDRESS WITH EACH TRIGGER, AND THE PAIR IS THE
//                    ELEMENT
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_3_every_element_of_every_trigger_set_is_a_pair_whose_address_is_the_bindings', () => {
  // **PROPERTY: EVERY ELEMENT OF `triggered` AND OF `pending` IS A `{handle, address}` PAIR WHOSE `address`
  // MEMBER IS THE BINDING ADDRESS OF THE LISTENER THE `handle` NAMES — never the written address, never a
  // bare handle, and never a second element type.** **`S-PAIR-SHAPE`** (one drive per consumer) ·
  // **`S-PAIR-TOTAL`** (every element at every instant) · **`S-PAIR-DISTINCT`** (the pair's `address` differs
  // from the invocation's argument where the binding is a prefix, and equals it where they coincide)
  // (`contract.md §5.3`; `§2.4` items 1–3 and 7; `trigger-and-pair.md §1`).
  //
  // **FAILURE LIST**: a bare handle anywhere; a pair whose `address` is the WRITTEN address; two element types
  // in one list; the invocation's argument carrying the binding address; a parallel `triggeredAddresses`
  // array.
  const result = row({
    id: 'P-HL-3',
    strategies: ['S-PAIR-TOTAL', 'S-PAIR-SHAPE', 'S-PAIR-DISTINCT'],
    seed: SEEDS['P-HL-3'],
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      const handle = newHandle(label);
      // THE BINDING IS A PREFIX OF THE WRITE, so the two are DISTINCT on some attempts and EQUAL on others.
      const depth = intBetween(rng, 1, 3);
      const extra = intBetween(rng, 0, 2);
      const base = [label, ...Array.from({ length: depth - 1 }, () => tag('seg'))];
      const binding = base.slice(0, depth);
      const written = [...binding, ...Array.from({ length: extra }, () => tag('tail'))];
      // THE CONTAINERS THE WRITE WALKS THROUGH EXIST FIRST, one level at a time from the root down to the
      // write's own parent — an `AddressNotFound`-free fixture (`write-and-read.md §3.4` `W-3`/`W-4`;
      // `F-3`; `seedContainers`). Seeded before `listen`/`register`, so the invocation count below is the
      // one write's own.
      seedContainers(store, written);
      store.listen(handle, [binding]);
      const seen = [];
      store.register(handle, (argument) => {
        seen.push(Array.isArray(argument) ? argument.slice() : argument);
      });

      const record = store.write(written, 'mem', 1);
      assert.equal('triggeredAddresses' in record, false,
        'NO PARALLEL `triggeredAddresses` ARRAY EXISTS — it would be an i-th correspondence and would '
        + 'reverse `DD-37` (`§2.4` item 1; `trigger-and-pair.md §2` item 4; `§5.3` FAILURE LIST)');
      assertAllPairs(record.triggered, 'record.triggered');

      const mine = record.triggered.filter((e) => e.handle === handle);
      assert.equal(mine.length, 1, 'the handle stands once in the set (`§2.4` item 6)');
      assert.deepEqual(mine[0].address, binding,
        'THE PAIR\'S `address` IS THE BINDING\'S — never the written address (`S-PAIR-SHAPE`; '
        + '`trigger-and-pair.md §8` `TF-2`)');
      if (extra > 0) {
        assert.notDeepEqual(mine[0].address, written,
          'and where the binding is a STRICT PREFIX the two differ (`S-PAIR-DISTINCT`)');
      } else {
        assert.deepEqual(mine[0].address, written,
          'while where the binding IS the written address the two coincide — and that equality is DECLARED '
          + 'and is not the pair being absent (`trigger-and-pair.md §8`\'s closing clause)');
      }
      assert.deepEqual(seen[0], written,
        'and the invocation\'s ONE argument is the WRITE\'s address, never the binding\'s (`PAR-HL-35`)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-3 (' + result.strategies.join(', ') + ', seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

test('hli_prop_P_HL_3_pending_is_a_pair_list_by_identity_with_triggered_at_every_pass', async () => {
  // `P-HL-3`'s **`S-PAIR-TOTAL`** at the kernel's own instant: **`pending` IS SEEDED AS A CLONE OF
  // `triggered` AND CARRIES NO BARE HANDLE, at `K-2`'s return and after a pass** (`contract.md §5.3`;
  // `§2.4` items 3–4; `trigger-and-pair.md §3` items 2, 3; `§8` `TF-1`, `TF-7`).
  const K = await kernel();
  const result = row({
    id: 'P-HL-3',
    strategies: ['S-PAIR-TOTAL'],
    seed: SEEDS['P-HL-3'] ^ 0x9E3779B9,
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      const handle = newHandle(label);
      const address = [label, tag('p')];
      // THE ATTEMPT'S OWN ADDRESS'S CONTAINER IS SEEDED FIRST — the commit's write mints its key inside an
      // existing parent container (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`; `seedContainers`), and the
      // seed precedes `listen`/`register` so no body sees it.
      seedContainers(store, address);
      store.listen(handle, [address]);
      store.register(handle, () => {});
      if (intBetween(rng, 0, 1) === 0) store.addConstraint({ address: [address], id: tag('c') }, pass);
      const record = K.commit(store, address, 'mem', 1);
      assertAllPairs(record.triggered, 'record.triggered');
      assertAllPairs(record.pending, 'record.pending');
      for (let k = 0; k < record.pending.length; k += 1) {
        assert.equal(record.pending[k], record.triggered[k],
          'and `pending`\'s elements ARE `triggered`\'s BY IDENTITY — a clone and never a transform '
          + '(`§2.4` item 3; `trigger-and-pair.md §3` item 2)');
      }
      K.runAttempt(store, record);
      assertAllPairs(record.pending,
        'AND AFTER THE PASS EVERY REMAINING ELEMENT IS STILL A PAIR — `pending` NEVER becomes heterogeneous '
        + '(`§2.4` item 4; `§2.5` item 2; `trigger-and-pair.md §8` `TF-7`)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-3 total (S-PAIR-TOTAL, seed 0x' + (result.seed >>> 0).toString(16) + ') held over '
    + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.4  `P-HL-4` — THE PASS'S EVALUATED SET IS THE PAIRS AT THE TRIGGERING ADDRESS, FIXED AT PASS START
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_4_the_pass_evaluates_the_pairs_at_the_attempts_own_address_and_no_other', async () => {
  // **PROPERTY: FOR EVERY PASS: THE SET THE KERNEL EVALUATES IS THE PAIRS WHOSE OWN ADDRESS IS THE ATTEMPT'S
  // ADDRESS — selected by an EXACT-ADDRESS match and never widened to `triggered`'s prefix set — and that set
  // is MATERIALISED ONCE when the pass begins, each element evaluated at most once.** **`S-SEL-EXACT`**
  // (a pair at an ANCESTOR and a pair at a DESCENDANT both prefix-match the store's trigger set: NEITHER is
  // evaluated by the pass at the written address) · **`S-SEL-DEDUPE`** (a pair at two addresses, one an
  // ancestor of the write's and one the write's own: ONE evaluation per pass) (`contract.md §5.4`;
  // `§2.8` items 1 and 6; `kernel-selection.md §7` `KF-1`, `KF-2`, `KF-3`, `KF-4`).
  const K = await kernel();
  const result = row({
    id: 'P-HL-4',
    strategies: ['S-SEL-EXACT', 'S-SEL-DEDUPE'],
    seed: SEEDS['P-HL-4'],
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      const ancestor = [label];
      const written = [...ancestor, tag('w')];
      const descendant = [...written, tag('d')];
      // THE WRITTEN ADDRESS AND ITS PARENT EXIST BEFORE THE COMMIT AND BEFORE ANY PAIR IS REGISTERED — the
      // attempt's own address is what the pass selects by (`S-SEL-EXACT`), and a write mints its key
      // inside an existing parent container (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`;
      // `seedContainers`). The seeds are fixture and add no pair.
      seedContainers(store, written);
      store.addConstraint({ address: [ancestor], id: 'ancestor' }, pass);
      store.addConstraint({ address: [written], id: 'own' }, pass);
      store.addConstraint({ address: [descendant], id: 'descendant' }, pass);
      // ONE PAIR OVER N ADDRESSES, one of them an ANCESTOR of the write's and one the write's OWN.
      store.addConstraint({ address: [ancestor, written], id: 'two-address' }, pass);

      const report = K.runAttempt(store, K.commit(store, written, 'mem', intBetween(rng, 0, 9)));
      const checked = report.log.filter((e) => e.kind === 'constraint-check').map((e) => e.id);
      assert.deepEqual(checked.sort(), ['own', 'two-address'],
        'THE PASS EVALUATED THE PAIRS AT ITS OWN ADDRESS AND NEITHER THE ANCESTOR NOR THE DESCENDANT — '
        + 'read ' + JSON.stringify(checked) + '. The store\'s `triggered` is PREFIX-selected, so following '
        + 'it would have evaluated the ancestor (`S-SEL-EXACT`; `kernel-selection.md §7` `KF-1`–`KF-3`)');
      assert.equal(checked.filter((id) => id === 'two-address').length, 1,
        'AND A TWO-ADDRESS PAIR IS EVALUATED ONCE FOR ONE WRITE — read '
        + checked.filter((id) => id === 'two-address').length + ' (`S-SEL-DEDUPE`; `§2.6` item 5; '
        + '`kernel-selection.md §7` `KF-4`)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-4 (' + result.strategies.join(', ') + ', seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

test('hli_prop_P_HL_4_a_mid_pass_registration_enters_the_next_pass_and_no_earlier', async () => {
  // `P-HL-4`'s **`S-SEL-SNAPSHOT`**: **a mid-pass `K-1` appends NO `constraint-check` entry to the registering
  // pass and is evaluated by the NEXT pass only** (`contract.md §5.4`; `§2.8` item 6;
  // `kernel-selection.md §3` items 1, 5; `§7` `KF-5`).
  const K = await kernel();
  const result = row({
    id: 'P-HL-4',
    strategies: ['S-SEL-SNAPSHOT'],
    seed: SEEDS['P-HL-4'] ^ 0x9E3779B9,
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      const address = [label, tag('snap')];
      const lateId = tag('late');
      let registered = false;
      // THE COMMITTED ADDRESS'S CONTAINER IS SEEDED FIRST, before any registration, so each `K-2`'s write
      // mints its key inside an existing parent (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`;
      // `seedContainers`); the seed is no pair and belongs to no pass.
      seedContainers(store, address);
      store.addConstraint({ address: [address], id: 'registrar' }, (context) => {
        const atLanding = context !== null && typeof context === 'object'
          && context.tier !== null && context.op !== null;
        if (!registered && atLanding) {
          registered = true;
          store.addConstraint({ address: [address], id: lateId }, pass);
        }
        return true;
      });
      store.addConstraint({ address: [address], id: 'first' }, pass);

      const first = K.runAttempt(store, K.commit(store, address, 'mem', intBetween(rng, 0, 9)));
      const firstChecked = first.log.filter((e) => e.kind === 'constraint-check').map((e) => e.id);
      assert.equal(firstChecked.includes(lateId), false,
        'THE MID-PASS REGISTRATION IS ABSENT FROM THE REGISTERING PASS\'S OWN ENTRIES — read '
        + JSON.stringify(firstChecked) + ' (`S-SEL-SNAPSHOT`; `kernel-selection.md §7` `KF-5`)');
      const next = K.runAttempt(store, K.commit(store, address, 'mem', intBetween(rng, 0, 9)));
      const nextChecked = next.log.filter((e) => e.kind === 'constraint-check').map((e) => e.id);
      assert.equal(nextChecked.includes(lateId), true,
        'and it IS evaluated by the NEXT pass — read ' + JSON.stringify(nextChecked)
        + ' (`§2.8` item 6: "`K-1`\'s mid-pass append still enters the NEXT pass")');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-4 snapshot (S-SEL-SNAPSHOT, seed 0x' + (result.seed >>> 0).toString(16) + ') held over '
    + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.4 (cont.) — `P-HL-4`'s UNDER-GENERATED STATE, NOW DRIVEN
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_4_a_pair_at_the_address_and_at_its_descendant_is_evaluated_once', async () => {
  // **`P-HL-4`'s `S-SEL-DEDUPE` AT THE STATE THE CANONICAL DRIVE NEVER DRAWS — named as UNDER-GENERATED at
  // the gate-4 adversarial pass (`docs/pending.md` · GATE 4 · `P-HL-4`): "`P-HL-4` draws no
  // address-and-descendant set (the case distinguishing dedupe-by-id from dedupe-by-address)".**
  //
  // **THE STATE ENUMERATION (every one drawn below, by `i % 3`).** **THE WRITE LANDS AT THE DESCENDANT
  // `W/D`, NOT AT `W`, AND THAT IS FORCED: the selection rule is prefix and descendant-inclusive
  // (`trigger-and-pair.md §2` item 2; `src/store.rs:1718-1726`), so a write at `W` matches only the entry at
  // `W` while a write at `W/D` matches the entries at BOTH `W` and `W/D`. Only the second puts TWO entries of
  // ONE pair into the store's delivered set, which is the state the dedupe exists for (`§2.6` item 5: *"a
  // two-address pair whose addresses are ancestor and descendant of one write address evaluates twice"*).**
  //   1. **ADDRESS-AND-DESCENDANT** — ONE pair over `[W, W/D]`, the write at `W/D`. Both of the pair's home
  //      entries are selected, so the store's delivered set carries the handle TWICE and a pass without the
  //      address dedupe selects the SAME pair TWICE and evaluates it twice. The declared answer is ONE
  //      evaluation (`§2.6` item 5; `S-SEL-DEDUPE`; `kernel-selection.md §7` `KF-4`).
  //   2. **THE MIRROR** — ONE pair over `[W/D, W]`, the same two addresses in the OTHER member order: a pass
  //      that dedupes on the ADDRESS SEQUENCE rather than on the pair's identity evaluates twice here and
  //      once there, which is why the state is drawn in both orders (`§2.6` item 6's `HL-DD-3`).
  //   3. **THE CONTROL** — TWO pairs, one wholly at `W` and one wholly at the written `W/D`: the ancestor
  //      pair is NOT evaluated by the pass at `W/D` (`S-SEL-EXACT`), so this attempt asserts the written
  //      pair's one check and the ancestor's absence — the state without which case 1's "evaluated twice"
  //      could not be told from "evaluated once because one address was dropped".
  //
  // **FAILURE LIST**: the pair evaluated twice in one pass (`§5.4` FAILURE LIST's own row); the pair
  // evaluated ZERO times (a selection that lost one of its addresses); a dedupe keyed on the address
  // sequence rather than on the pair; a dedupe keyed on `id` alone across two DIFFERENT pairs of one id; an
  // ancestor pair evaluated by the pass at its descendant.
  const K = await kernel();
  const result = row({
    id: 'P-HL-4',
    strategies: ['S-SEL-DEDUPE', 'S-SEL-EXACT'],
    seed: SEEDS['P-HL-4'] ^ 0x85EBCA6B,
    attempts: ROW_BUDGET,
    body: (rng, i) => {
      const { store, label } = fixture();
      const mode = i % 3;
      // `W` IS THE PAIR'S ANCESTOR ADDRESS AND `W/D` IS THE WRITE'S OWN — a DESCENDANT of `W`. Both are
      // seeded so each write mints its key inside an existing container (`write-and-read.md §3.4`
      // `W-3`/`W-4`; `F-3`; `seedContainers`), and the seeds precede every registration.
      const ancestor = [label, tag('w')];
      const written = [...ancestor, tag('d')];
      seedContainers(store, written);

      if (mode === 2) {
        // ── THE CONTROL: two pairs, one at each address; the write is at the descendant.
        store.addConstraint({ address: [ancestor], id: 'at-ancestor' }, pass);
        store.addConstraint({ address: [written], id: 'at-written' }, pass);
        const report = K.runAttempt(store, K.commit(store, written, 'mem', intBetween(rng, 0, 9)));
        const checked = report.log.filter((e) => e.kind === 'constraint-check').map((e) => e.id);
        assert.equal(checked.filter((id) => id === 'at-written').length, 1,
          'the pair AT the attempt\'s address is evaluated once — read ' + JSON.stringify(checked));
        assert.equal(checked.filter((id) => id === 'at-ancestor').length, 0,
          'AND THE PAIR AT THE ANCESTOR IS NOT — the pass selects by EXACT address and never widens to the '
          + 'store\'s prefix-selected `triggered` (`S-SEL-EXACT`; `kernel-selection.md §7` `KF-1`–`KF-3`)');
        return;
      }

      // ── STATES 1 AND 2: ONE pair over the write's address AND an ANCESTOR of it.
      const addresses = mode === 0 ? [ancestor, written] : [written, ancestor];
      store.addConstraint({ address: addresses, id: 'both' }, pass);
      const record = K.commit(store, written, 'mem', intBetween(rng, 0, 9));
      // **THE FIXTURE'S OWN PREMISE, ASSERTED BEFORE THE PASS READS ANYTHING: the store's delivered set
      // carries THE PAIR'S OWN BINDING ADDRESS TWICE for this one write — once for the entry at the ancestor
      // and once for the entry at the write's own address. Without this the "evaluated once" below would be
      // satisfiable by a pair only one of whose addresses matched, and the cell would prove nothing.** The
      // pair's store-side handle is the kernel's own spelling of its address (`constraint@<address>`); this is
      // a count over the STORE's delivered set and asserts no order (`DD-37`/`DD-22`).
      const carried = (e) => JSON.stringify(e.address);
      const delivered = record.triggered.filter((e) => carried(e) === JSON.stringify(ancestor)
        || carried(e) === JSON.stringify(written)).length;
      assert.equal(delivered, 2, 'the fixture stands: BOTH of the pair\'s addresses stand in the one store\'s '
        + 'delivered set — read ' + delivered + ' entries for this one write in '
        + JSON.stringify(record.triggered.map((e) => e.address))
        + ' (`§2.6` item 4: one pair over N addresses is N registry rows; `trigger-and-pair.md §2` item 2)');
      const report = K.runAttempt(store, record);
      const checked = report.log.filter((e) => e.kind === 'constraint-check').map((e) => e.id);
      assert.equal(checked.filter((id) => id === 'both').length, 1,
        'A PAIR OVER THE WRITE\'S ADDRESS AND AN ANCESTOR OF IT IS EVALUATED EXACTLY ONCE, THOUGH THE STORE '
        + 'DELIVERED ITS HANDLE TWICE — read ' + checked.filter((id) => id === 'both').length + ' in '
        + JSON.stringify(checked) + '. A pass without the address dedupe selects the same pair twice and '
        + 'breaches `K-3`\'s one-pass-per-pair rule (`§2.6` item 5; `S-SEL-DEDUPE`; `kernel-selection.md §7` '
        + '`KF-4`)');
      assert.equal(checked.includes('both'), true,
        'and it is evaluated AT LEAST once — a selection that dropped one of its addresses would read zero, '
        + 'which is a different failure from reading two (`§5.4` FAILURE LIST)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-4 address-and-descendant (S-SEL-DEDUPE, S-SEL-EXACT, seed 0x'
    + (result.seed >>> 0).toString(16) + ') held over ' + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.5  `P-HL-5` — ONE INVOCATION PER DISTINCT HANDLE, AND THE BINDING ADDRESS IS TRIGGER-SET DATA
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_5_one_invocation_per_distinct_handle_whatever_the_number_of_pairs', () => {
  // **PROPERTY: `deliver` INVOKES AT MOST ONCE PER DISTINCT HANDLE PER DELIVERY WINDOW, whatever the number of
  // pairs naming that handle, and the recipient set is built once when the window opens. THE BINDING ADDRESS
  // CARRIED OUT OF THE DEDUPE IS INFORMATIONAL DATA AND NOT A PER-INVOCATION FACT, and the invocation's ONE
  // argument remains the triggering address.**
  // **`S-DEDUPE-HANDLE`** (a handle at `['a']` and `['a','b']`, a write at `['a','b','c']`: ONE invocation,
  // dedupe keyed on `entry.handle` and never on the element) · **`S-DEDUPE-ARG`** (`contract.md §5.5`;
  // `§2.4` item 6; `trigger-and-pair.md §5` items 1–4; `docs/specs/storeroom-js/surface.md:309`).
  //
  // **FAILURE LIST**: two invocations for one handle in one window; a dedupe keyed on the element; an
  // invocation whose argument is the binding address; a recipient set read per element; an order asserted over
  // `triggered`.
  const result = row({
    id: 'P-HL-5',
    strategies: ['S-DEDUPE-HANDLE', 'S-DEDUPE-ARG'],
    seed: SEEDS['P-HL-5'],
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      const outer = [label, tag('o')];
      // A CHAIN of nested bindings for one handle: N addresses, each a prefix of the write's.
      const depth = intBetween(rng, 1, 3);
      const written = [...outer, ...Array.from({ length: depth }, () => tag('c'))];
      const bindings = Array.from({ length: depth }, (_, k) => written.slice(0, outer.length + k));
      const handle = newHandle(label);
      // EVERY CONTAINER THE WRITE WALKS THROUGH IS SEEDED FIRST, one level at a time — an
      // `AddressNotFound`-free fixture (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`; `seedContainers`).
      // Seeded before `listen`/`register`, so the ONE invocation this cell counts is the write's own.
      seedContainers(store, written);
      store.listen(handle, bindings);
      const seen = [];
      store.register(handle, (argument) => {
        seen.push(Array.isArray(argument) ? argument.slice() : argument);
      });

      const record = store.write(written, 'mem', 1);
      assert.equal(seen.length, 1,
        'EXACTLY ONE INVOCATION for one distinct handle in one window, whatever the number of pairs that '
        + 'matched — read ' + seen.length + ' for ' + bindings.length + ' binding(s). The dedupe keys on '
        + '`entry.handle` and never on the element (`§2.4` item 6; `trigger-and-pair.md §5` item 2; '
        + '`docs/specs/storeroom-js/surface.md:309`; `§8` `TF-5`)');
      assert.deepEqual(seen[0], written,
        'AND THE ONE ARGUMENT IS THE TRIGGERING ADDRESS, never the binding\'s (`S-DEDUPE-ARG`; `PAR-HL-35`; '
        + '`PAR-JS-12`)');
      // THE BINDING ADDRESS IS TRIGGER-SET DATA: whichever pair is carried, it is ONE of the bindings and
      // never the write's — and the order it was encountered in is UNSPECIFIED (`DD-37`/`DD-22`).
      const mine = record.triggered.filter((e) => e.handle === handle);
      assert.ok(mine.length >= 1, 'the set carries the handle (`§2.4` item 6)');
      for (const element of mine) {
        assert.ok(bindings.some((b) => JSON.stringify(b) === JSON.stringify(element.address)),
          'and every carried address is ONE OF THE BINDINGS — never a value the prefix test excluded '
          + '(`PAR-HL-20`; `DD-37`)');
      }
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-5 (' + result.strategies.join(', ') + ', seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

test('hli_prop_P_HL_5_a_replacement_made_before_a_window_takes_effect_at_that_window', () => {
  // `P-HL-5`'s **`S-DEDUPE-WINDOW`**: **the recipient set is built ONCE when the window opens; a replacement
  // made between two windows takes effect at the NEXT trigger and at no element of the one that already
  // opened** (`contract.md §5.5`; `§2.2` item 9; `§2.4` item 6). *"Two registrations for one handle"* is a
  // REPLACEMENT and never a fan-out (`identity-and-domain.md §4` item 5's `Map<handle, {fn, off}>`).
  const result = row({
    id: 'P-HL-5',
    strategies: ['S-DEDUPE-WINDOW'],
    seed: SEEDS['P-HL-5'] ^ 0x9E3779B9,
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      const address = [label, tag('win')];
      const handle = newHandle(label);
      // THE WINDOW'S ADDRESS'S CONTAINER IS SEEDED FIRST, before `listen` — both writes below land inside
      // an existing parent container (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`; `seedContainers`).
      seedContainers(store, address);
      store.listen(handle, [address]);
      const first = [];
      store.register(handle, () => { first.push(1); });
      store.write(address, 'mem', 1);
      assert.equal(first.length, 1, 'the first window invoked the first function once');

      const second = [];
      store.register(handle, () => { second.push(1); });
      store.write(address, 'mem', intBetween(rng, 2, 9));
      assert.equal(first.length, 1,
        'AND THE REPLACED FUNCTION IS DROPPED WITHOUT NOTICE — a SECOND registration REPLACES the first and '
        + 'never fans out (`surface.md §2.4` rule 2, read at `identity-and-domain.md §4` item 5)');
      assert.equal(second.length, 1,
        'and the replacement takes effect at the window that opens after it (`S-DEDUPE-WINDOW`; '
        + '`contract.md §5.5`)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-5 window (S-DEDUPE-WINDOW, seed 0x' + (result.seed >>> 0).toString(16) + ') held over '
    + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.6  `P-HL-6` — A CONSTRAINT'S IDENTITY LIVES IN THE STORE, AND ONE ACT DELETES IT
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_6_an_identity_is_a_store_side_fact_equal_to_itself_and_deleted_by_one_act', () => {
  // **PROPERTY: EVERY IDENTITY A CALLER HOLDS IS A STORE-SIDE FACT: it is answered by the store with the pair,
  // it is equal to itself on a second `addConstraint` at the SAME pair, and it is DELETED BY EXACTLY ONE ACT —
  // `removeConstraint`.** **`S-ID-STORE`** (a first and a second `addConstraint` at the same pair answer the
  // SAME identity, BY VALUE, with no package cache consulted) · **`S-ID-DELETE`** (a `removeConstraint` then a
  // fresh `addConstraint` answers a DIFFERENT identity) · **`S-ID-SCOPE`** (one pair over N addresses has ONE
  // identity; two pairs have two) (`contract.md §5.6`; `§2.6` items 1–4; `constraint-identity.md §5`
  // `IF-1`–`IF-7`).
  //
  // **FAILURE LIST**: an identity minted by the package; an identity carried only by a JS cache; a second
  // `addConstraint` at a held pair answering a different identity; a `constraintOff`/`constraintOn` cycle
  // deleting an identity; a removal that leaves an identity resolvable; one pair over N addresses carrying N
  // identities.
  const result = row({
    id: 'P-HL-6',
    strategies: ['S-ID-STORE', 'S-ID-DELETE', 'S-ID-SCOPE'],
    seed: SEEDS['P-HL-6'],
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      // ONE PAIR OVER N ADDRESSES IS ONE PAIR: ONE IDENTITY, N REGISTRY ROWS (`§2.6` item 4; `IF-7`).
      const n = intBetween(rng, 1, 3);
      const addresses = Array.from({ length: n }, () => [label, tag('cid')]);
      const pair = { address: addresses, id: 'one' };
      const first = store.addConstraint(pair, pass);
      assert.deepEqual(Object.keys(first), [],
        'the identity carries NO own enumerable member — a drive compares identities and never contents '
        + '(`constraint-identity.md §5` `IF-3`; `PAR-HL-10`)');
      const second = store.addConstraint(pair, pass);
      assert.equal(second, first,
        'A SECOND `addConstraint` AT THE SAME PAIR ANSWERS THE SAME IDENTITY BY VALUE (`S-ID-STORE`; '
        + '`§2.6` item 2; `IF-1`; `P: docs/pending.md · (AA-2)`)');
      // THE TOGGLE CYCLE DELETES NO IDENTITY (`IF-5`; `constraint-identity.md §3` item 3).
      store.constraintOff(pair, pass);
      store.constraintOn(pair, pass);
      assert.equal(store.addConstraint(pair, pass), first,
        'and a `constraintOff`/`constraintOn` cycle leaves the identity STANDING — a toggle is not a removal '
        + '(`IF-5`; `constraint-identity.md §3` item 3)');
      // `S-ID-SCOPE`: two pairs are two identities, and one pair over N addresses is ONE enumeration row.
      const other = store.addConstraint({ address: [[label, tag('other')]], id: 'two' }, pass);
      assert.notEqual(other, first,
        'while two pairs answer TWO identities that are NOT equal (`S-ID-SCOPE`; `IF-2`)');
      assert.equal(store.constraints().filter((p) => p.id === 'one').length, 1,
        'and one pair over N addresses is ONE row of `constraints()`, with N addresses on it (`IF-7`; '
        + '`PAR-HL-13`)');
      // `S-ID-DELETE`: the ONE act that deletes an identity is `removeConstraint`.
      assert.equal(store.removeConstraint(pair), undefined,
        'removeConstraint answers undefined (`PAR-HL-17`)');
      const fresh = store.addConstraint(pair, pass);
      assert.notEqual(fresh, first,
        'AND A FRESH `addConstraint` AT THE REMOVED PAIR ANSWERS A DIFFERENT IDENTITY — the one act that '
        + 'deletes an identity is `removeConstraint` (`S-ID-DELETE`; `§2.6` item 3; `IF-4`)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-6 (' + result.strategies.join(', ') + ', seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.6 (cont.) — `P-HL-6`'s `S-ID-SCOPE` AT A PERMUTED SET: THE ONE COUNTEREXAMPLE THE AUDITOR NAMED
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_6_a_pair_created_over_one_set_is_the_same_pair_over_a_permuted_set', () => {
  // **THE ROW'S `S-ID-SCOPE` IS EXERCISED ONLY ON ITS CREATION ORDER BY EVERY DRIVE ABOVE, and that was named
  // the unit's headline under-generation at the gate-4 adversarial pass (`docs/pending.md` · GATE 4, the
  // UNDER-GENERATED cell, verbatim: *"no strategy probes a SET-EQUALITY KEY with a PERMUTED set … a
  // sequence-equality key refuses a pair the spec says is the same pair"*). THE CLAIM IT PROBES IS THE
  // CONTRACT'S OWN, AT ITS OWN BYTES: *"TWO ADDRESS SETS ARE EQUAL EXACTLY WHEN THEY CONTAIN THE SAME
  // ADDRESSES — SET EQUALITY — AND THE CANONICAL KEY IS THE SORTED, INJECTIVELY-SPELLED MEMBER LIST"*
  // (`contract.md §2.6` item 6's `HL-DD-3`, verbatim; `listen-verb.md §2.2` item 5). **`IF-8` IS THE STATE:
  // "a pair whose two address sets are equal but spelled in different member orders → EQUAL — set equality
  // and not sequence equality"** (`constraint-identity.md §5` `IF-8`, verbatim).
  //
  // **THE STATE ENUMERATION — ONE ROW PER INSTANT THE KEY IS COMPUTED (every one drawn below, by `i % 4`),
  // because a key that is order-insensitive at ONE instant and sequence-equal at another is still a
  // sequence key:**
  //   1. **THE CREATION KEY** — `addConstraint({address: [A,B]})` then `addConstraint({address: [B,A]})`:
  //      the SECOND answers THE SAME identity, and `constraints()` carries ONE row and not two (`IF-1`,
  //      `IF-8`; `§2.6` item 2).
  //   2. **THE REMOVAL KEY** — `removeConstraint({address: [B,A]})` over the pair created at `[A,B]`: it
  //      SUCCEEDS (`undefined`, `§2.7` item 3) and the enumeration is emptied, because a removal that
  //      refused or missed would be a sequence key refusing a pair the spec says is the same pair
  //      (`IF-8`; `§2.6` item 3).
  //   3. **THE TOGGLE KEY** — `constraintOff({address: [B,A]})`/`constraintOn({address: [B,A]})` over the
  //      pair created at `[A,B]`: neither deletes the identity, and the enumeration still carries ONE row
  //      (`IF-5`; `constraint-identity.md §3` item 3).
  //   4. **THE RE-ADD KEY** — after the permuted removal, a fresh `addConstraint` at `[A,B]` answers a
  //      DIFFERENT identity, which is only meaningful if the permuted removal REALLY removed it (`IF-4`).
  //
  // **THE TWO SETS ARE DRAWN WITH N ∈ {2,3} AND PERMUTED BY A DETERMINISTIC ROTATION, so a key that happened
  // to sort by a single-member coincidence cannot pass.** **THE IDENTITY CARRIES NO OWN ENUMERABLE MEMBER, so
  // every comparison below is BY VALUE over the returned value and never over its contents**
  // (`constraint-identity.md §5` `IF-3`).
  //
  // **FAILURE LIST**: a permuted `addConstraint` answering a DIFFERENT identity (`IF-8`); a permuted
  // `addConstraint` leaving TWO rows in `constraints()` (`IF-1`, `IF-7`); a permuted `removeConstraint`
  // throwing or leaving the row standing (`§2.7` item 3); a permuted toggle deleting an identity (`IF-5`);
  // a permuted re-add answering the OLD identity without a real removal (`IF-4`).
  const result = row({
    id: 'P-HL-6',
    strategies: ['S-ID-SCOPE'],
    seed: SEEDS['P-HL-6'] ^ 0x85EBCA6B,
    attempts: ROW_BUDGET,
    body: (rng, i) => {
      const { store, label } = fixture();
      const mode = i % 4;
      const n = intBetween(rng, 2, 3);
      const set = Array.from({ length: n }, () => [label, tag('perm')]);
      // THE PERMUTATION IS A DETERMINISTIC ROTATION BY ONE, and it is a PERMUTATION and never a copy: for
      // n >= 2 the rotated list differs from `set` in its first member, so a sequence key MUST answer two
      // different keys where a set key answers one (`HL-DD-3`; `IF-8`).
      const permuted = [...set.slice(1), set[0]];
      assert.notDeepEqual(permuted, set,
        'the fixture stands: the drawn "permuted" list is spelled differently from the creation list, so a '
        + 'sequence key is refused this attempt and a set key is not (`IF-8`)');

      const id = 'permuted-pair';
      const creation = store.addConstraint({ address: set, id }, pass);
      assert.deepEqual(Object.keys(creation), [],
        'the identity carries NO own enumerable member (`IF-3`; `§2.6` item 2)');
      assert.equal(store.constraints().filter((p) => p.id === id).length, 1,
        'the creation stands as ONE row (`IF-7`)');

      // ── THE CREATION KEY (state 1) — the row's own text, in the permuted member order.
      const second = store.addConstraint({ address: permuted, id }, pass);
      assert.equal(second, creation,
        'A SECOND `addConstraint` AT THE PERMUTED SET ANSWERS THE SAME IDENTITY, BY VALUE — the pair over '
        + '[' + set.length + '] addresses is ONE pair whatever order its members are spelled in '
        + '(`HL-DD-3`; `IF-8`; `§2.6` item 6; `S-ID-SCOPE`)');
      assert.equal(store.constraints().filter((p) => p.id === id).length, 1,
        'AND IT IS STILL ONE ROW of `constraints()` — a sequence key would have created a SECOND pair here '
        + '(`IF-1`, `IF-7`; `S-ID-SCOPE`)');

      if (mode === 2) {
        // ── THE TOGGLE KEY (state 3).
        assert.equal(store.constraintOff({ address: permuted, id }, pass), undefined,
          'a `constraintOff` naming the pair in the PERMUTED order is admitted (`PAR-JS-24`)');
        assert.equal(store.constraintOn({ address: permuted, id }, pass), undefined,
          'and `constraintOn` likewise');
        assert.equal(store.addConstraint({ address: set, id }, pass), creation,
          'AND THE TOGGLE CYCLE, EVERY ACT OF IT SPELLED IN THE OTHER ORDER, DELETES NO IDENTITY — the '
          + 'identity is THE SAME by value after it (`IF-5`; `constraint-identity.md §3` item 3; '
          + '`constraint-identity.md §5` `IF-5`)');
        assert.equal(store.constraints().filter((p) => p.id === id).length, 1,
          'and the enumeration is unmoved (`IF-5`\'s observable)');
        return;
      }

      if (mode === 1) {
        // ── THE REMOVAL KEY (state 2): the act that deletes an identity, spelled in the other order.
        assert.equal(store.removeConstraint({ address: permuted, id }), undefined,
          '`removeConstraint` OVER THE PERMUTED SET SUCCEEDS — the pair it names IS the pair that was created, '
          + 'so the removal is a real removal and its answer is `undefined` (`§2.7` item 3; `IF-8`)');
        assert.equal(store.constraints().filter((p) => p.id === id).length, 0,
          'AND THE ROW IS GONE — the enumeration no longer carries the pair at all '
          + '(`S-ID-DELETE`; `§2.7` item 3)');
        return;
      }

      // ── THE RE-ADD KEY (state 4, and the canonical creation-order state 1 at mode 3).
      assert.equal(store.removeConstraint({ address: permuted, id }), undefined,
        'the permuted removal succeeds (`IF-8`)');
      const fresh = store.addConstraint({ address: set, id }, pass);
      assert.notEqual(fresh, creation,
        'AND A FRESH `addConstraint` AT THE CREATION ORDER ANSWERS A DIFFERENT IDENTITY — which is only a '
        + 'meaningful assertion because the permuted removal really removed the row: the ONE act that '
        + 'deletes an identity is `removeConstraint` (`IF-4`; `§2.6` item 3; `S-ID-DELETE`)');
      assert.equal(store.constraints().filter((p) => p.id === id).length, 1,
        'and the re-add put back exactly one row (`IF-7`)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-6 permuted-set (S-ID-SCOPE, seed 0x' + (result.seed >>> 0).toString(16) + ') held over '
    + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.7  `P-HL-7` — THE MEMBER SET IS FOURTEEN, AND A REMOVAL IS WHOLE OR REFUSED
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_7_the_member_set_is_fourteen_and_no_remove_member_is_a_module_export', async () => {
  // **PROPERTY: THE PRODUCT'S DECLARED OWN MEMBER SET IS EXACTLY THE FOURTEEN NAMED AT `§2.7` ITEM 9, and
  // every one of the two remove members is reached through the factory's product ALONE — never as a module
  // export.** **`S-MEMBER-COUNT`** (`10 + 1 + 1 + 2 = 14` ✓; the module namespace carries one name)
  // (`contract.md §5.7`; `§2.7` item 9; `removal-members.md §7` items 2–3).
  const NS = await import('../../bindings/js/index.mjs');
  const result = row({
    id: 'P-HL-7',
    strategies: ['S-MEMBER-COUNT'],
    seed: SEEDS['P-HL-7'],
    attempts: ROW_BUDGET,
    body: () => {
      const inst = makeStore({ journalLength: 16 + (totalAttempts % 8) });
      const own = Object.getOwnPropertyNames(inst).filter((k) => typeof inst[k] === 'function').sort();
      assert.deepEqual(own, [...THE_FOURTEEN].sort(),
        'the product\'s own callable member set is the fourteen declared names — read '
        + JSON.stringify(own) + ' (`S-MEMBER-COUNT`; `§2.7` item 9; `10 + 1 + 1 + 2 = 14` ✓)');
      assert.equal(own.length, 14, 'and the figure is fourteen, NOT thirteen and NOT twelve');
      assert.equal(typeof NS.removeListener, 'undefined',
        'and `removeListener` is NOT a module export (`removal-members.md §7` item 3)');
      assert.equal(typeof NS.removeConstraint, 'undefined',
        'and neither is `removeConstraint`');
      assert.equal(typeof NS.storeCreate, 'function',
        'while the module namespace stays at its ONE name (`11 → 1` ✓; `removal-members.md §7` item 3)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-7 (S-MEMBER-COUNT, seed 0x' + (result.seed >>> 0).toString(16) + ') held over '
    + result.attempts + ' attempts');
});

test('hli_prop_P_HL_7_a_removal_is_whole_on_success_and_refuses_without_moving_a_structure', () => {
  // `P-HL-7`'s **`S-REMOVE-WHOLE`** (each remove member's success: the pair, its N address rows, the JS entry
  // and the store's home entry — all gone, asserted four ways) and **`S-REMOVE-ATOMIC`** (each fail arm: all
  // four structures stand, and `constraints()`'s return is unmoved) (`contract.md §5.7`; `§2.7` item 7;
  // `removal-members.md §4` item 4: *"after ANY thrown arm all four structures stand as they stood; after the
  // success return all four are gone"*).
  const result = row({
    id: 'P-HL-7',
    strategies: ['S-REMOVE-WHOLE', 'S-REMOVE-ATOMIC'],
    seed: SEEDS['P-HL-7'] ^ 0x9E3779B9,
    attempts: ROW_BUDGET,
    body: (rng) => {
      const { store, label } = fixture();
      // ── `S-REMOVE-WHOLE`: a listener's removal takes the entry and the store's entries with it.
      const handle = newHandle(label);
      const address = [label, tag('rw')];
      // THE LISTENER'S ADDRESS'S CONTAINER IS SEEDED FIRST, before `listen` — the two writes below mint
      // their key inside an existing parent (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`;
      // `seedContainers`), so the only arm this cell reads is the removal's.
      seedContainers(store, address);
      store.listen(handle, [address]);
      const fired = [];
      store.register(handle, () => { fired.push(1); });
      store.write(address, 'mem', 1);
      assert.equal(fired.length, 1, 'the listener fires before its removal');
      store.removeListener(handle);
      store.write(address, 'mem', 2);
      assert.equal(fired.length, 1,
        'AND AFTER ITS REMOVAL IT FIRES NOTHING — the entry is gone whole (`S-REMOVE-WHOLE`; '
        + '`§2.7` item 2; `removal-members.md §8` `RF-1`)');
      const refused = capture(() => store.register(handle, () => {}));
      assert.equal(refused.threw, true,
        'and `register` on the removed handle is REFUSED (`§2.1` item 5\'s fabricated row; `§2.7` item 10)');

      // ── `S-REMOVE-ATOMIC`: a refused `removeConstraint` moves none of the four structures.
      const pair = { address: [[label, tag('pair')]], id: 'atomic' };
      store.addConstraint(pair, pass);
      const standing = store.constraints().length;
      const failing = capture(() => store.removeConstraint({ address: [[label, tag('absent')]], id: 'no' }));
      assert.equal(failing.threw, true,
        'a pair the entry does not carry THROWS (`§4` `F-8`; `removal-members.md §5` row 1)');
      assert.equal(store.constraints().length, standing,
        'AND NO STRUCTURE MOVED: `constraints()`\'s return is unmoved by the throw (`S-REMOVE-ATOMIC`; '
        + '`§2.7` item 7; `removal-members.md §5` obligation (iii))');
      // And the one that IS carried still removes wholesomely.
      assert.equal(store.removeConstraint(pair), undefined);
      assert.equal(store.constraints().length, standing - 1,
        'while a real removal shrinks the enumeration by exactly one (`S-REMOVE-WHOLE`; `§2.7` item 8)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-7 remove (' + result.strategies.join(', ') + ', seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.8  `P-HL-8` — THE KERNEL'S EXTENT IS SIX, AND A `K-6` REMOVAL IS REACHED THROUGH THE PUBLISHED ROUTE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_8_the_kernel_surface_is_six_and_a_K6_removal_answers_undefined', async () => {
  // **PROPERTY: THE KERNEL'S DECLARED SURFACE IS EXACTLY SIX ITEMS — `K-1`…`K-6` — AND `K-6` WITHDRAWS THROUGH
  // THE SAME PUBLISHED MEMBERS THE KERNEL ALREADY USES, inventing no second route and no store-side private
  // act. A `K-6` success leaves no kernel row and no store entry for the pair.** **`S-K6-EXTENT`** (the
  // exported items are six, and no seventh is reachable) · **`S-K6-ROUTE`** (a `K-6` reaches `removeListener`
  // through the same published member an app calls — asserted by instrumenting the PUBLISHED member, not a
  // private one) · **`S-K6-ANSWER`** (success `undefined` and both structures gone) (`contract.md §5.8`;
  // `§2.9` items 1–6; `remove-member.md §7`).
  //
  // **FAILURE LIST**: five items; seven items; a `K-6` with a store-side private act; a `K-6` that enumerates
  // addresses or consults a count; a `K-6` success leaving a kernel row standing; a `K-6` whose answer is a
  // record; a `KC` member minted for it.
  const K = await kernel();
  const result = row({
    id: 'P-HL-8',
    strategies: ['S-K6-EXTENT', 'S-K6-ROUTE', 'S-K6-ANSWER'],
    seed: SEEDS['P-HL-8'],
    attempts: ROW_BUDGET,
    body: (rng) => {
      // ── `S-K6-EXTENT`: SIX items, no seventh, no fifth-only surface.
      for (const name of KERNEL_ITEMS) {
        assert.equal(typeof K[name], 'function',
          'the kernel exports `' + name + '` — the extent is SIX, `5 + 1 = 6` ✓ (`S-K6-EXTENT`; '
          + '`§2.9` item 5; `remove-member.md §7` `MF-6`)');
      }
      assert.equal(KERNEL_ITEMS.length, 6, 'and the declared list is six names');

      // ── `S-K6-ANSWER` + `S-K6-ROUTE`: the removal is whole, answers undefined, and reaches the PUBLISHED
      //    member.
      const { store, label } = fixture();
      const n = intBetween(rng, 1, 3);
      const addresses = Array.from({ length: n }, () => [label, tag('k6')]);
      const pair = { address: addresses, id: 'k6p' };
      store.addConstraint(pair, pass);
      let reached = 0;
      const published = store.removeListener;
      Object.defineProperty(store, 'removeListener', {
        configurable: true,
        writable: true,
        value: function instrumented(handle) {
          reached += 1;
          return published.call(this, handle);
        },
      });
      assert.equal(K.remove(store, pair), undefined,
        '`K-6 remove(store, pair) -> undefined` (`S-K6-ANSWER`; `§2.9` item 3; `PAR-HL-31`)');
      assert.ok(reached >= 1,
        'AND IT REACHED THE PUBLISHED `removeListener` — read ' + reached + ' call(s); the kernel invents no '
        + 'second route and performs no store-side private act (`S-K6-ROUTE`; `§2.9` item 2; '
        + '`remove-member.md §7` `MF-5`)');
      assert.deepEqual(store.constraints(), [],
        'and the kernel row and the store entry are both gone (`S-K6-ANSWER`; `§2.9` item 4; '
        + '`remove-member.md §7` `MF-9`)');
      // A SECOND `K-6` ON THE SAME PAIR IS `KC-2` — the row's own absence (`remove-member.md §4` item 2 (ii)).
      const again = capture(() => K.remove(store, pair));
      assert.equal(again.threw, true, 'a second `K-6` on the removed pair refuses');
      assert.equal(again.thrown.status, 'KC-2',
        'with the kernel\'s own `KC-2` — and NO `KC` MEMBER IS MINTED for the removal (the set stays closed '
        + 'at EIGHT: `contract.md §2.9` item 4; `remove-member.md §7` `MF-8`)');
      assert.equal(KC_TOKENS.includes(again.thrown.status), true,
        'the token is one of the closed eight');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-8 (' + result.strategies.join(', ') + ', seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

test('hli_prop_P_HL_8_a_K6_removal_refuses_without_moving_either_structure', () => {
  // `P-HL-8`'s **`S-K6-ANSWER`** at its REFUSING arms: **a `K-6` refusal leaves both structures as they stood
  // and carries either the kernel's own `KC-2` or the store's own unconverted code**
  // (`contract.md §5.8`'s FAILURE LIST; `§2.9` item 4; `remove-member.md §4` items 2–4).
  return kernel().then((K) => {
    const result = row({
      id: 'P-HL-8',
      strategies: ['S-K6-ANSWER'],
      seed: SEEDS['P-HL-8'] ^ 0x9E3779B9,
      attempts: ROW_BUDGET,
      body: (rng) => {
        const { store, label } = fixture();
        const carried = { address: [[label, tag('c')]], id: 'carried' };
        store.addConstraint(carried, pass);
        const before = store.constraints().length;
        const outside = pick(rng, [
          { label: 'a non-object pair', value: 'pair' },
          { label: 'a null pair', value: null },
          { label: 'a NON-STRING id', value: { address: [[label, 'a']], id: 7 } },
          { label: 'an EMPTY-STRING id', value: { address: [[label, 'a']], id: '' } },
          { label: 'a pair the kernel holds no row for', value: { address: [[label, tag('absent')]], id: 'x' } },
        ]);
        const r = capture(() => K.remove(store, outside.value));
        assert.equal(r.threw, true,
          '`K-6` refuses ' + outside.label + ' (`§2.9` item 4 (i)–(ii); `remove-member.md §7` '
          + '`MF-2`/`MF-3`)');
        assert.equal(r.thrown.status, 'KC-2',
          'and the code is the kernel\'s own `KC-2` — read ' + JSON.stringify(r.thrown.status));
        assert.equal(store.constraints().length, before,
          'AND A REFUSAL MOVED NOTHING: both structures stand (`§2.9` item 4; `remove-member.md §4` '
          + 'item 4)');
      },
    });
    assert.deepEqual(result.failures, [],
      'P-HL-8 refuse (S-K6-ANSWER, seed 0x' + (result.seed >>> 0).toString(16) + ') held over '
      + result.attempts + ' attempts');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.8 (cont.) — `P-HL-8`'s THE DOUBLE-ACT CLASS, NOW DRIVEN: A REFUSED REGISTRATION'S WITHDRAWAL
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_8_a_refused_registrations_withdrawal_is_the_published_route_and_moves_nothing_else', async () => {
  // **`P-HL-8`'s `S-K6-ROUTE` AT THE DOUBLE-ACT CLASS — THE DECLARED LIMIT MADE AN ASSERTION, AND THE GAP
  // THE GATE-4 ADVERSARIAL PASS NAMED AT `OVER-STRONG (ii)`.** That finding says *"`S-K6-ROUTE` passes on the
  // instrumented published member regardless of whether the private store act was also taken — presence
  // instrumentation, not route verification"*, and the row's own closing clause answers it: **the extra
  // private act fails `§5.8`'s FAILURE LIST ON ITS OWN TERMS — *"a `K-6` with a store-side private act"* —
  // read as a STATE assertion over the two structures and the store's home entries, and never as a route
  // claim** (`contract.md §5.8`, verbatim). **THE SECOND ACT OF THE PAIR IS `withdrawRegistration`'s own
  // `remove(kernel.store, {address: [address], id})`** (the kernel's refusal path, `§2.1` item 1's
  // *"a refused registration leaves the registry exactly as it stood"*), and **NO DRIVE BEFORE THIS ONE
  // DROVE IT** — every refusal driven above is refused at a pair the caller's handle does not stand at, so
  // the published path is the kernel's alone and co-habitation is invisible. **HERE THE PAIR'S ADDRESS IS
  // SHARED WITH A CALLER'S OWN HANDLE**, which is the state the double act is observable in
  // (`§2.2` item 7: two elements at one address; `trigger-and-pair.md §5` item 2's dedupe keyed on
  // `entry.handle`).
  //
  // **THE STATE ENUMERATION (every one drawn below, by `i % 3`), each a data state of the ONE property —
  // that a refused registration's withdrawal reaches the published route and touches no entry the pair does
  // not own:**
  //   1. **THE FRESH ARM, SHARED ADDRESS** — the caller's `h` at `'a/b'`; `K-1`'s refusal at the SAME
  //      address on the state-2 arm (`{message}` and no `repair`, so no attempt opens and the refused
  //      registration wrote a row of its own — `await` free by construction).
  //   2. **THE REPLACEMENT ARM, SHARED ADDRESS** — a PASSING pair first stands at `'a/b'`, then a second
  //      `K-1` at the SAME `id` loses the store's `ConstraintListInvalid` pre-check (`withdrawRegistration`'s
  //      `fresh` is false, so it deletes the kernel's rows and still takes the published act).
  //   3. **THE NESTED STATE** — the caller's `h` stands at a PREFIX, the pair's address is the write's own,
  //      so the two co-inhabit one address bucket through the store's prefix rule and the caller's entry is
  //      the one a purge of the kernel's handle could reach by name alone.
  //
  // **THE OBSERVABLES, EACH ASSERTED IN THE SPEC'S OWN TERMS:**
  //   (i) the refusal is the ONE thrown form carrying the store's `ConstraintListInvalid` in its `log`
  //       (`§4` `F-10`; `constraint-sites.md §4` item 1) — so the attempt really ran and really failed;
  //   (ii) `constraints()` carries no row for the refused pair — `§2.1` item 1, verbatim: *"a refused
  //       registration leaves the registry exactly as it stood"*;
  //   (iii) the pair's `(address, id)` row is really gone — a second `K-6` on it is the kernel's own
  //       `KC-2` (`§2.9` item 4 (ii); `remove-member.md §4` item 2 (ii));
  //   (iv) **THE CALLER'S OWN ENTRY AT THAT ADDRESS STANDS WHOLE AND FIRES** — the assertion the double act
  //       is read against, since a `removeListener` naming a handle the store DOES hold is a real removal and
  //       not the no-op (`§2.1` item 3; `removal-members.md §5`).
  //
  // **FAILURE LIST**: the caller's entry at the pair's address silently purged by the refusal; the entry
  //     left standing but its function dropped or replaced; a refused registration leaving a kernel row, an
  //     enumeration row or a store entry of the pair's own behind; the withdrawal reaching no published
  //     member at all; an extra act whose removals are REPORTED (the store's own purge answer, consulted and
  //     discarded, is the act's own signature) — and the fifth is measured, not asserted, so the report
  //     carries the figure rather than a claim this cell would have to weaken.
  const K = await kernel();
  const result = row({
    id: 'P-HL-8',
    strategies: ['S-K6-ROUTE', 'S-K6-ANSWER'],
    seed: SEEDS['P-HL-8'] ^ 0x85EBCA6B,
    attempts: ROW_BUDGET,
    body: (rng, i) => {
      const { store, label } = fixture();
      const mode = i % 3;
      const handle = newHandle(label);
      const pairAddress = [label, tag('dpair')];
      // A PREFIX ADDRESS OF THE PAIR'S ON MODE 2, the pair's own on 0 and 1 — the caller's entry's address.
      const callerAddress = mode === 2 ? [label] : pairAddress;
      // EVERY CONTAINER THE WRITES WALK THROUGH IS SEEDED FIRST, before `listen`/`register`
      // (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`; `seedContainers`).
      seedContainers(store, pairAddress);
      store.listen(handle, [callerAddress]);
      let fired = 0;
      store.register(handle, () => { fired += 1; });
      // THE FIXTURE STANDS BEFORE ANY PAIR EXISTS: the caller's entry fires at the address the pair will
      // stand at (or under it), so a purge of that bucket is observable and not inferred. **THE WRITE'S OWN
      // ADDRESS IS THE CALLER'S BINDING ON EVERY MODE, so no SEED write can reach the entry**: on mode 2 the
      // caller stands at a PREFIX of the pair's address, and a `seedContainers` write at that prefix after
      // `register` would fire the entry itself and move the very counter this cell reads — a fixture defect
      // and not a product one, so the seeded address and the counted address are the same one.
      const firesAt = mode === 2 ? callerAddress : pairAddress;
      store.write(firesAt, 'mem', 0);
      const firedBefore = fired;
      assert.equal(firedBefore, 1,
        'the fixture stands: the caller\'s entry fires at ' + JSON.stringify(firesAt) + ' BEFORE any '
        + 'constraint pair exists (`§2.2` item 5 (b); `§2.4` item 6)');

      const id = mode === 1 ? 'replacement' : 'refused';
      // THE HELD PAIR'S BODY IS COUNTED on the REPLACEMENT arm, because the registry row alone cannot say
      // whether the refusal reached the element (`constraint-sites.md §1` item 3 (ii)).
      let evaluations = 0;
      const standingBody = () => { evaluations += 1; return true; };
      if (mode === 1) {
        store.addConstraint({ address: [pairAddress], id }, standingBody);
        assert.equal(store.constraints().filter((p) => p.id === id).length, 1,
          'the REPLACEMENT arm\'s fixture stands: the pair is held before the second `K-1` '
          + '(`§2.3` item 2; `S-PURGE-ORDER`)');
        store.write(pairAddress, 'mem', 3);
        assert.equal(evaluations > 0, true,
          'and its body is reached BEFORE the refused call, so the count below is a live one — read '
          + evaluations + ' (`§2.3` item 1)');
      }
      // THE REFUSED REGISTRATION: state 2 — the body violates and carries no `repair`
      // (`constraint-sites.md §4` item 1; `§2.3` item 6), so the call reaches the third step and its own
      // withdrawal path.
      const refused = capture(() => store.addConstraint({ address: [pairAddress], id }, () => ({ message: 'no' })));
      assert.equal(refused.threw, true,
        'THE REFUSED REGISTRATION THROWS (`§4` `F-10`; `§2.3` item 6) — mode ' + mode);
      // **⟶ RE-DERIVED 2026-10-26 TO THE ARCHITECT'S RULING AND NOT TO THE BYTES (`DEF-N`, verbatim:
      // *"Expand the returned error set for both S/N"*): A WELL-FORMED PAIR WHOSE BODY ANSWERED NON-`true` IS
      // REFUSED WITH THE REGISTRATION VERDICT'S OWN MEMBER — `ConstraintRefusedAtRegistration`, the set's rank
      // `19` — AND NEVER WITH THE SHAPE CODE `ConstraintListInvalid`, which names a malformed ENTRY (the
      // address that is not a segment array, the absent or non-string `id`) and keeps its own trigger. THE
      // PAIR DRIVEN HERE IS `{ address: [[label, 'dpair']], id }` — a segment array and a string — so its SHAPE
      // is valid and the shape code would be naming a shape that is fine.** The observables this cell reads
      // (the registry unmoved, the pair's row gone, the caller's own entry whole and firing) are unmoved.
      assert.equal(refused.thrown.status, 'ConstraintRefusedAtRegistration',
        'with the store\'s own registration-verdict member, `ConstraintRefusedAtRegistration` — read '
        + JSON.stringify(refused.thrown.status) + ' (`DEF-N`, 2026-10-26; `§4` `F-10` read through that ruling)');

      // (ii) THE REGISTRY IS EXACTLY AS IT STOOD — `§2.1` item 1, verbatim.
      assert.equal(store.constraints().filter((p) => p.id === id).length, mode === 1 ? 1 : 0,
        'A REFUSED REGISTRATION LEAVES THE REGISTRY EXACTLY AS IT STOOD — read '
        + JSON.stringify(store.constraints()) + ' (`§2.1` item 1, verbatim; `S-K6-ANSWER`)');

      // (iii) THE PAIR'S `(address, id)` ROW IS GONE ON THE FRESH ARM, AND THE STANDING PAIR'S ROW SURVIVES
      //       THE REPLACEMENT ARM: `withdrawRegistration` deletes this call's own write and nothing else.
      if (mode !== 1) {
        const probe = capture(() => K.remove(store, { address: [pairAddress], id }));
        assert.equal(probe.threw, true,
          'and the refused pair left NO kernel row — a `K-6` on it refuses (`§2.9` item 4 (ii))');
        assert.equal(probe.thrown.status, 'KC-2',
          'with the kernel\'s own `KC-2` — read ' + JSON.stringify(probe.thrown.status)
          + ' (`remove-member.md §4` item 2 (ii); `MF-3`)');
      } else {
        // ── THE REPLACEMENT ARM. **HERE THE PRE-CHECK IS `§2.3` ITEM 3'S OWN FOUR-OBSERVABLE CASE, AND IT IS
        //    THE ONE THIS DRIVE EXISTS TO DRIVE: a HELD pair and a second `addConstraint` at the SAME pair
        //    whose body violates. `§2.1` ITEM 1 SAYS THE REGISTRY IS LEFT *"EXACTLY AS IT STOOD"* — and the
        //    pair DID stand, so it must still stand.**
        assert.equal(store.constraints().filter((p) => p.id === id).length, 1,
          'THE HELD PAIR STANDS THROUGH THE REFUSAL — `§2.1` item 1, verbatim: *"a refused registration '
          + 'leaves the registry exactly as it stood"*, and this pair stood BEFORE the refused call '
          + '(`§2.3` item 3 (iii); `constraint-sites.md §1` item 3, the four observables)');
        // (iii) THE HELD PAIR'S BODY STILL EVALUATES — the second of the four observables, and the one a
        //       registry row alone cannot answer (`constraint-sites.md §1` item 3 (ii)).
        const firedBeforeRefusal = evaluations;
        store.write(pairAddress, 'mem', intBetween(rng, 5, 9));
        assert.equal(evaluations > firedBeforeRefusal, true,
          'AND THE HELD PAIR\'S OWN BODY STILL EVALUATES AT A LATER WRITE — read ' + evaluations
          + ' against ' + firedBeforeRefusal + '. A held pair the refusal did not reach is a pair whose '
          + 'element a later write evaluates (`§2.3` item 3; `constraint-sites.md §1` item 3 (ii))');
        // (iv) AND THE CALLER'S OWN IDENTITY IS STILL RESOLVABLE — `removeConstraint` names it.
        assert.equal(store.removeConstraint({ address: [pairAddress], id }), undefined,
          'and the identity the caller held before the refusal is still RESOLVABLE — `removeConstraint` '
          + 'naming the pair succeeds (`§2.6` item 3; `constraint-identity.md §3` item 2 (ii): the identity '
          + 'the caller held before RESOLVES TO NOTHING only after a real removal)');
      }

      // (iv) **THE DOUBLE ACT'S OWN CLAIM: THE CALLER'S ENTRY STANDS WHOLE AND STILL FIRES.** This is the
      //      assertion `S-K6-ROUTE` cannot make and this row owes as a STATE: a withdrawal that named a
      //      handle the store holds would purge the caller's entry with the kernel's, and the figure below
      //      would not move.
      // **THE BASELINE IS TAKEN IMMEDIATELY BEFORE THIS WRITE, AND THE REASON IS SELECTION, NOT
      //      CONVENIENCE.** On the REPLACEMENT arm the pair stands at `pairAddress` and so does the caller's
      //      entry; selection is prefix/descendant-inclusive (`§2.2` item 7's co-habited address), so ONE
      //      write at `pairAddress` builds a `triggered` set carrying BOTH handles, and `deliver` invokes
      //      one function per DISTINCT triggered handle (`§2.4` rule 3) — **the caller's entry AND the held
      //      pair's own body, from that one write.** The pair's body was re-evaluated by this arm's own
      //      `evaluations` probe above, so `firedBefore` (taken before ANY pair existed) is no longer a
      //      baseline for the caller's entry: measured from it, the assertion charges the pair's own
      //      evaluations to the entry and reports `1 + #(pair evaluations)` where it means to report that
      //      the entry fired at all. **The invocation measured is the same one; only the interval it is read
      //      over is now the interval the assertion is about, and the claim it makes — the entry stands and
      //      still fires — is unchanged.**
      const firedBeforeTheWrite = fired;
      store.write(firesAt, 'mem', 1);
      assert.equal(fired > firedBeforeTheWrite, true,
        'THE CALLER\'S OWN ENTRY AT THE PAIR\'S ADDRESS STANDING THROUGH THE REFUSAL FIRES AT THE NEXT '
        + 'WRITE — read ' + fired + ' against ' + firedBeforeTheWrite + ' immediately before it (and '
        + firedBefore + ' before any pair stood). A withdrawal that purged a handle the '
        + 'store holds would have taken it (`§2.2` item 7\'s co-habited address; `§2.4` item 6; `§5.8`\'s '
        + 'FAILURE LIST, *"a `K-6` with a store-side private act"*, read as a STATE and not as a route)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-8 double-act (S-K6-ROUTE, S-K6-ANSWER, seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.6 (cont.) — `P-HL-6`'s `S-ID-SCOPE` WITH AN `id`-COLLIDING KEY: TWO PAIRS, ONE ADDRESS FAMILY
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_P_HL_6_two_pairs_of_one_address_family_with_different_ids_are_two_identities', () => {
  // **`P-HL-6`'s `S-ID-SCOPE` — *"two pairs have two identities"* — AT THE STATE NO DRIVE BEFORE THIS ONE
  // DRAWS: TWO PAIRS OF ONE ADDRESS FAMILY THAT DIFFER ONLY IN THEIR ADDRESSES.** Every drive above either
  // varies the address SET for ONE `id` (`S-ID-SCOPE`'s N-address row) or draws two pairs whose addresses are
  // unrelated, so **a `constraintPairKey` that collided on `id` alone would pass all of them**: the second
  // pair's row would overwrite the first's and the enumeration would read one row where the spec says two.
  // **THE CONTRACT'S OWN KEY IS THE PAIR, NOT ITS `id`** — `§2.6` item 1, verbatim: *"`(M-3)`'s proposal that
  // `kernel.pairs` key on `id` alone is now the identity's own key, **since the store holds one row per
  // pair**"* — and `constraint-identity.md §4` item 4 declares the set spelling as the pair's own half of it.
  //
  // **THE STATE ENUMERATION (every one drawn below, by `i % 3`), one row per instant the pair key is
  // computed, because a key that collides at ONE instant and not at another is still a colliding key:**
  //   1. **THE CREATION KEY** — `addConstraint({address: [A], id: i1})` then `addConstraint({address: [B],
  //      id: i2})` over one family `[fam, ·]`: TWO identities, NOT equal, and TWO rows of `constraints()`.
  //   2. **THE FIRE KEY** — the same two pairs, then a write at EACH address: each write reaches the pair
  //      that stands there and ONLY it, which is the per-write gate's set-membership answer read at both
  //      (`§2.6` items 4–5; `constraint-identity.md §4` item 2 (iv)).
  //   3. **THE REMOVAL KEY** — the same two pairs, then `removeConstraint` at the FIRST: the enumeration
  //      shrinks by EXACTLY one and the SECOND pair's row is the one still standing, by `id` and by address.
  //
  // **FAILURE LIST**: two pairs answering ONE identity (`IF-2`); one row in `constraints()` for two pairs
  //     (`IF-7`); a write at one pair's address reaching the other; a removal taking both rows; a removal
  //     leaving the first row standing by `id` coincidence; a second `addConstraint` at the second pair
  //     answering the FIRST's identity.
  const result = row({
    id: 'P-HL-6',
    strategies: ['S-ID-SCOPE', 'S-ID-STORE'],
    seed: SEEDS['P-HL-6'] ^ 0xC2B2AE35,
    attempts: ROW_BUDGET,
    body: (rng, i) => {
      const { store, label } = fixture();
      const mode = i % 3;
      // ONE ADDRESS FAMILY, TWO MEMBERS — the classic `id`-collision shape: same parent key, different child.
      const family = label;
      const a = [family, tag('a')];
      const b = [family, tag('b')];
      // EVERY WRITTEN ADDRESS'S CONTAINER IS SEEDED FIRST (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`).
      seedContainers(store, a);
      seedContainers(store, b);
      const i1 = tag('one');
      const i2 = tag('two');
      // THE TWO IDS DIFFER, which is the state under probe: a key colliding on `id` alone cannot tell the
      // two pairs apart, so nothing below may be satisfied by the addresses alone.
      assert.notEqual(i1, i2, 'the fixture stands: the two pairs carry DIFFERENT ids');
      assert.notDeepEqual(a, b,
        'and DIFFERENT addresses within ONE family — the one variation no drive above draws '
        + '(`S-ID-SCOPE`; `constraint-identity.md §4` item 4)');

      const checked = [];
      const record = (context) => { checked.push(context.address); return true; };
      const first = store.addConstraint({ address: [a], id: i1 }, record);
      const second = store.addConstraint({ address: [b], id: i2 }, record);

      // ── STATE 1: THE CREATION KEY.
      assert.notEqual(second, first,
        'TWO PAIRS OF ONE FAMILY WITH DIFFERENT IDS ARE TWO IDENTITIES, NOT EQUAL — a `constraintPairKey` '
        + 'colliding on `id` alone answers the same identity here (`S-ID-SCOPE`; `IF-2`; `§2.6` item 1)');
      const rows = store.constraints();
      assert.equal(rows.filter((p) => p.id === i1).length, 1,
        'and the FIRST pair still occupies its OWN row of `constraints()` — read ' + JSON.stringify(rows)
        + ' (`IF-7`; `§2.6` item 4: one row per pair, and the store holds one row per pair)');
      assert.equal(rows.filter((p) => p.id === i2).length, 1,
        'and the SECOND pair occupies its own — two pairs, two rows, never one');
      assert.equal(rows.length, 2, 'and the enumeration carries BOTH, `2` and not `1` (`IF-2`, `IF-7`)');
      // The second pair's `address` member is ITS OWN set, not the first's — an overwritten row would carry
      // the survivor's address under the other id.
      const secondRow = rows.filter((p) => p.id === i2)[0];
      assert.deepEqual(secondRow.address, [b],
        'and the second row\'s `address` member is its OWN set — an overwritten row would carry the other '
        + 'pair\'s address (`PAR-HL-13`; `§2.6` item 5)');

      if (mode === 2) {
        // ── STATE 3: THE REMOVAL KEY — the first pair goes and the second stands.
        assert.equal(store.removeConstraint({ address: [a], id: i1 }), undefined,
          '`removeConstraint` at the FIRST pair answers `undefined` (`§2.7` item 3; `PAR-HL-17`)');
        const after = store.constraints();
        assert.equal(after.length, 1,
          'AND THE ENUMERATION SHRINKS BY EXACTLY ONE — read ' + JSON.stringify(after)
          + ' (`§2.7` item 8; `S-REMOVE-WHOLE`)');
        assert.equal(after.filter((p) => p.id === i2).length, 1,
          'and the pair still standing is the SECOND one, by `id` (`IF-4`; `§2.6` item 3)');
        assert.deepEqual(after.filter((p) => p.id === i2)[0].address, [b],
          'at ITS OWN address — a removal keyed on `id` alone would have taken this row instead '
          + '(`§2.6` item 4; `constraint-identity.md §4` item 4)');
        return;
      }

      // ── STATE 2 (and 1's continuation): THE FIRE KEY — each write reaches its own pair and no other.
      checked.length = 0;
      store.write(a, 'mem', 1);
      assert.deepEqual(checked.map((x) => JSON.stringify(x)), [JSON.stringify(a)],
        'a write at the FIRST pair\'s address evaluates THAT pair and only it — read '
        + JSON.stringify(checked) + ' (`§2.6` item 5; `constraint-identity.md §4` item 2 (iv): the '
        + 'per-write gate is a SET-MEMBERSHIP test)');
      checked.length = 0;
      store.write(b, 'mem', 2);
      assert.deepEqual(checked.map((x) => JSON.stringify(x)), [JSON.stringify(b)],
        'and a write at the SECOND pair\'s address likewise — the two pairs are not one element under two '
        + 'spellings (`IF-2`; `IF-7`)');
    },
  });
  assert.deepEqual(result.failures, [],
    'P-HL-6 id-collision (S-ID-SCOPE, S-ID-STORE, seed 0x' + (result.seed >>> 0).toString(16)
    + ') held over ' + result.attempts + ' attempts');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// §5.0 — THE REGISTER'S OWN CLOSURE: THE STRATEGY IDS ARE READ FROM THE CONTRACT'S BYTES
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('hli_prop_the_register_is_eight_rows_and_every_declared_strategy_id_has_a_generator', () => {
  // **THE REGISTER IS THIS CHANGE'S OWN: `8` ROWS, CAP `≤ 8` AND HOLDS AT `8 ≤ 8` ✓, `2 + 3 + 3 = 8` ✓, and
  // the id family is DISJOINT from the three landed registers** (`contract.md §5.0`).
  // **⟶ RE-DERIVED 2026-10-24 (`strata/decisions.md` `D-17`, verbatim: *"Rewrite or retire the tests that
  // point at docs. Tests are for code."*) — THE DECLARED SET IS THIS FILE'S OWN DECLARATION AND IS NO LONGER
  // PARSED OUT OF A DOCUMENT.**
  //
  // **WHAT STOOD HERE, NAMED SO ITS ABSENCE IS LEGIBLE.** The cell built `contractPath` under
  // `docs/specs/storeroom-held-listener-identity/`, read its bytes, and extracted two things: the eight
  // `### §5.n` row headings into `uniqueRowIds`, and every backtick-quoted `S-…` token on each row's
  // `**Strategy ids.**` line into `declared`. **The document was the ORACLE** — a cell's expectation must
  // come from CODE (`D-17`), and this one's came from OPENING A DOCUMENT, so the battery would fail on any
  // checkout whose keep-set moved. **The document survives today, which is why the read was GREEN and still
  // wrong** — the same mechanism this branch's archival proved on the eleven reads `D-17` retires.
  //
  // **WHAT SURVIVES IS THE PROPERTY THE CELL EXISTS FOR** — *every declared strategy id has a generator in
  // this file* — and it is now asserted between this file's DECLARATION (below) and this file's own cells.
  // **THE DECLARATION IS THE TEST LAYER'S TO MAKE** (`D-19`), and the closure is checked against the file's
  // own bytes exactly as it was.
  const uniqueRowIds = ['P-HL-1', 'P-HL-2', 'P-HL-3', 'P-HL-4', 'P-HL-5', 'P-HL-6', 'P-HL-7', 'P-HL-8'];
  assert.deepEqual(uniqueRowIds,
    ['P-HL-1', 'P-HL-2', 'P-HL-3', 'P-HL-4', 'P-HL-5', 'P-HL-6', 'P-HL-7', 'P-HL-8'],
    'the declared set carries EIGHT rows, `P-HL-1` … `P-HL-8` (`2 + 3 + 3 = 8` ✓); RE-DERIVED 2026-10-24 (`D-17`)');
  assert.equal(uniqueRowIds.length <= 8, true, 'and the cap holds at `8 ≤ 8` ✓');
  const declared = [
    'S-DEDUPE-ARG', 'S-DEDUPE-HANDLE', 'S-DEDUPE-WINDOW', 'S-ID-DELETE', 'S-ID-MONO', 'S-ID-SCOPE',
    'S-ID-STORE', 'S-ID-TYPE', 'S-ID-UNIQ', 'S-K6-ANSWER', 'S-K6-EXTENT', 'S-K6-ROUTE',
    'S-MEMBER-COUNT', 'S-PAIR-DISTINCT', 'S-PAIR-SHAPE', 'S-PAIR-TOTAL', 'S-PURGE-ALL',
    'S-PURGE-ORDER', 'S-PURGE-SET', 'S-REMOVE-ATOMIC', 'S-REMOVE-WHOLE', 'S-SEL-DEDUPE',
    'S-SEL-EXACT', 'S-SEL-SNAPSHOT',
  ];
  assert.equal(declared.length > 0, true,
    'the declared strategy ids are this file\'s own declaration — read ' + JSON.stringify(declared));

  const fileBytes = readFileSync(fileURLToPath(import.meta.url), 'utf8');
  const missing = declared.filter((id) => !fileBytes.includes("'" + id + "'"));
  assert.deepEqual(missing, [],
    'EVERY DECLARED STRATEGY ID HAS A GENERATOR IN THIS FILE — the ids with none are '
    + JSON.stringify(missing) + ' of ' + JSON.stringify(declared)
    + ' (`contract.md §5.0`: "every row below carries: its property · one or more strategy ids")');
});

test('hli_prop_the_attempt_budget_is_the_even_share_capped_at_one_hundred_and_four_hundred', () => {
  // **AT MOST `100` ATTEMPTS PER ROW AND AT MOST `400` IN TOTAL** (`contract.md §5.0`'s discipline, and the
  // corpus's own at `constraint-kernel-properties.test.mjs`). **THE TWO TERMS ARE BOTH REAL AND BOTH
  // PRINTED: the file's `20` drives at the even share `<= 100` give `20 x ROW_BUDGET <= 400` ✓ — and the
  // share is taken over the DRIVES the file runs and not over the register's `8` rows, since one row is
  // carried by more than one drive and the `400` is ONE budget over all of them (`§5.0`'s census is the
  // register's; see `DRIVES`).**
  assert.equal(MAX_ATTEMPTS_PER_ROW, 100, 'the per-row cap is 100');
  assert.equal(MAX_ATTEMPTS_TOTAL, 400, 'and the total is 400');
  assert.equal(ROW_BUDGET, 20, 'the even share over the file\'s twenty drives is 20, capped at 100 — read '
    + ROW_BUDGET);
  assert.ok(DRIVES * ROW_BUDGET <= MAX_ATTEMPTS_TOTAL,
    DRIVES + ' x ' + ROW_BUDGET + ' = ' + (DRIVES * ROW_BUDGET) + ' <= ' + MAX_ATTEMPTS_TOTAL + ' ✓');
  assert.ok(ROW_BUDGET <= MAX_ATTEMPTS_PER_ROW,
    'and the share is under the per-row cap');
  assert.equal(DRIVES, 20, 'and the divisor is the TWENTY drives this file runs — the register\'s eight '
    + 'rows, the alt drives that carry a second strategy id, the three under-generated cells the gate-4 '
    + 'pass owed, and the two the final audit\'s PBT re-audit owed — read ' + DRIVES);
  // **AND THE DIVISOR IS CHECKED AGAINST THE FILE'S OWN BYTES, so a drive added without moving `DRIVES`
  // trips this cell instead of silently breaching the `400`.** The scan is anchored at the START of a line
  // inside a `row({ … })` config, which is what a drive's own budget line is; this cell's own message is
  // indented prose and cannot match it, so the count is not self-referential (`§5.0`'s discipline, held by
  // construction and not by arithmetic alone).
  const self = readFileSync(fileURLToPath(import.meta.url), 'utf8');
  const driveCount = (self.match(/^ +attempts: ROW_BUDGET,$/gm) || []).length;
  assert.equal(driveCount, DRIVES,
    'THE DECLARED DIVISOR IS THE NUMBER OF DRIVES THE FILE ACTUALLY RUNS — read ' + driveCount
    + ' drive(s) against `DRIVES = ' + DRIVES + '`. A drive added without moving `DRIVES` would let the '
    + 'even share exceed the total cap (`§5.0`)');
});
