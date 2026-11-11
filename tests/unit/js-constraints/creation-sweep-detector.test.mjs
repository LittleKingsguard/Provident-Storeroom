// tests/unit/js-constraints/creation-sweep-detector.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `U-STOREROOM-CREATION-SWEEP` AT THE PRESET'S `tests/unit/js-constraints/` SCOPE (`D-5`): `CSW-19` (the
// cycle's DETECTOR, `u`) and `P-CSW-3` (the sweep's STATE, `u`, a property row).
//
// WHAT THIS SCOPE IS FOR, AND WHY THESE TWO CELLS ARE NOT IN `tests/e2e/`. `§4` labels both `u` — *"a unit cell
// (one module's own act, no store, no filesystem)"* in the taxonomy's words — and the house files this scope
// beside (`tests/unit/js-constraints/registration-save-seam.test.mjs`) exist for the CENSUS and MECHANISM
// consequences of a unit rather than for its end-to-end behaviour. **So `CSW-19` reads the detector at the two
// observables that say what it is — the repair's own entry count and the journal's own appends — and `P-CSW-3`
// reads the sweep's STATE as a universal: one applied-repair bit per admitted pair, no pair's bit set twice,
// and the repairs' number bounded by the admitted pairs.** `CSW-19` takes a `filePath` for one limb only —
// *"no save is reached"* is a claim about a save, and a save needs a path — which is the same latitude this
// scope's sibling already takes (`registration-save-seam.test.mjs`'s `scratch()`).
//
// **THE PINS.** `PIN-4` (i), (ii), read through `D-124` item 1 (*"A pair may land AT MOST ONE REPAIR in a
// construction"*; *"the same constraint should not attempt a repair twice"*) and `D-125` item 4 (*"Refuse the
// construction at rank 20 — a cycle is an inconsistent result"*), with `PIN-14` (i): **the sweep inherits the
// MARKER and not the BUDGET** — *"no attempt, no budget member, no `AttemptRef`, no `D-` row, no `DD` row"* —
// and `D-124` item 1's arithmetic: *"every round that continues the sweep lands at least one repair, no pair
// repairs twice, so the repairs number at most the admitted pairs."*
//
// **`D-17`**: no document is opened at runtime. **`D-21`**: every cell prints its readings; a cell that cannot
// reach its arm fails AT THE ACT and prints what it caught. The instrument beyond the entry is the two the
// house's registration cells already use — `openCommits` (`state.mjs`) and `kernelFor`
// (`kernel-foundations.mjs`) — and nothing else.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../../bindings/js/index.mjs';
import { kernelFor } from '../../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../../bindings/js/src/entry/state.mjs';

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

/** The two constraint-subject members the sweep's refusals may cross with (`PIN-5`; `Q-11`'s carry). */
const CONSTRAINT_CODES = ['ConstraintPassRefused', 'ConstraintRefusedAtRegistration'];

const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), `cswu-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
};
const bytesOf = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-19` · THE CYCLE'S DETECTOR, AT THE MODULE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-19 · THE CYCLE\'S DETECTOR (`u`) — a pair carrying a repair, asked again and answering `{message, repair}` a second time: the detector reports a CYCLE and lands NO SECOND REPAIR — the repair\'s write is not performed, so NO `JournalOp` is appended and NO SAVE is reached', (t) => {
  // **`PIN-4` (i), (ii) as `D-124` item 1 redrew them**: a pair may land at most ONE repair, and *"a pair asked
  // again that would repair again is the cycle, and the act refuses"*. **THE FOUR READINGS, EACH AT A
  // DIFFERENT OBSERVABLE**:
  //   (a) THE DETECTOR REPORTED — the construction throws instead of returning an instance (`D-125` item 4);
  //   (b) NO SECOND REPAIR WAS LANDED — the repair body was entered ONCE, so the write it would have performed
  //       was never performed (`PIN-4` (i));
  //   (c) NO `JournalOp` WAS APPENDED BY IT — the repair's own `write` answered exactly ONE record, and that
  //       record carries one op identity (`DD-39`: `write` answers the store's own op);
  //   (d) NO SAVE WAS REACHED — the second repair's distinguishable value is in no byte at `filePath`
  //       (`PIN-12`: the last passing save's bytes stand).
  const { dir, filePath } = scratch('csw19');
  let entriesOfA = 0;
  const opIdsOfA = [];
  const opIdsOfB = [];
  const construction = attempt(() => make({
    filePath,
    constraints: [
      {
        address: ['a'],
        id: 'detector-a',
        constraint: (context) => {
          if (context.value === 'settled') return true;
          return {
            message: 'detector-a requires `["a"]` to be "settled"',
            repair: (record) => {
              entriesOfA += 1;
              // **THE SECOND REPAIR'S LANDING IS SPELLED DIFFERENTLY**, so a save it reached is readable in
              // the bytes and an op it minted is readable in the ids.
              const landed = record.write(['a'], 'file', entriesOfA > 1 ? 'settled-a-second-time' : 'settled');
              opIdsOfA.push(landed.op.opId);
              return { ok: true, op: landed.op };
            },
          };
        },
      },
      {
        address: ['b'],
        id: 'detector-b',
        constraint: (context) => {
          if (context.value !== undefined) return true;
          return {
            message: 'detector-b requires `["b"]` to exist',
            repair: (record) => {
              const seeded = record.write(['b'], 'file', 'seeded');
              opIdsOfB.push(seeded.op.opId);
              // **THE BREAK** — `["a"]` is rewritten to a value `detector-a` refuses, so the next round asks
              // `detector-a` again and it WOULD repair a second time.
              record.write(['a'], 'file', 'raw');
              return { ok: true, op: seeded.op };
            },
          };
        },
      },
    ],
  }));
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  // ── (a) THE DETECTOR REPORTED A CYCLE. ────────────────────────────────────────────────────────────────
  assert.equal(construction.ok, false,
    `**THE DETECTOR REPORTS THE CYCLE — the construction is REFUSED and no instance is returned** `
      + `(\`D-125\` item 4: *"Refuse the construction at rank 20 — a cycle is an inconsistent result"*; `
      + `\`PIN-4\` (ii): *"A PAIR ASKED AGAIN THAT WOULD REPAIR AGAIN IS THE CYCLE, AND THE ACT REFUSES"*): the `
      + `call answered ${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))} with `
      + `message ${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}`);
  assert.equal(CONSTRAINT_CODES.includes(statusOf(construction.caught)), true,
    `and the code's subject is the CONSTRAINTS — rank \`20\` \`ConstraintPassRefused\` (\`PIN-5\`; \`D-125\` item `
      + `4), rank \`19\` the carried reading at the single-pair instants only (\`Q-11\`): it answered `
      + `${JSON.stringify(statusOf(construction.caught))}`);

  // ── (b) AND NO SECOND REPAIR WAS LANDED. ──────────────────────────────────────────────────────────────
  assert.equal(entriesOfA, 1,
    `**THE REPAIR'S WRITE IS NOT PERFORMED A SECOND TIME — the body was entered EXACTLY ONCE, though the pair `
      + `was asked again** (\`PIN-4\` (i): *"A pair may land AT MOST ONE REPAIR in a construction"*; \`D-124\` `
      + `item 1: *"the same constraint should not attempt a repair twice"*): it was entered ${entriesOfA} `
      + `time(s)`);
  assert.equal(opIdsOfA.length, 1,
    `**AND NO SECOND \`JournalOp\` WAS APPENDED BY IT — the repair's own \`write\` answered exactly ONE record** `
      + `(\`DD-39\`: \`write\` answers the store's own \`{opId, …}\`; the op is the store's own append): the ids `
      + `it minted read ${JSON.stringify(opIdsOfA)}`);
  assert.equal(opIdsOfB.length, 1,
    `and the breaking pair landed its own single op: ${JSON.stringify(opIdsOfB)}`);
  assert.deepEqual(opIdsOfA.concat(opIdsOfB).length, 2,
    `**SO THE CONSTRUCTION'S REPAIRS NUMBER TWO OVER TWO ADMITTED PAIRS — THE ARITHMETIC THAT REPLACED THE `
      + `CAP** (\`D-124\` item 1): ${JSON.stringify([...opIdsOfA, ...opIdsOfB])}`);

  // ── (c) AND NO SAVE WAS REACHED BY IT. ────────────────────────────────────────────────────────────────
  assert.equal(bytes !== null, true,
    `the store's own file must stand, since a passing registration saved into it (\`PIN-12\`): `
      + `${JSON.stringify(bytes)}`);
  assert.equal(String(bytes).includes('settled-a-second-time'), false,
    `**NO SAVE WAS REACHED — the second repair's distinguishable value is in no byte at \`filePath\`** `
      + `(\`PIN-12\`: *"a fresh instance over the same \`filePath\` reads the bytes the last passing save `
      + `wrote"*; \`D-106\` item 2's save is per passing close): the file read ${JSON.stringify(bytes)}`);

  t.diagnostic(`CSW-19 · THE DETECTOR: the construction answered `
    + `${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))}; \`detector-a\`'s `
    + `repair was entered ${entriesOfA}× and minted ${JSON.stringify(opIdsOfA)}; \`detector-b\`'s minted `
    + `${JSON.stringify(opIdsOfB)}; the file read ${JSON.stringify(bytes)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-CSW-3` · THE SWEEP'S STATE IS ONE APPLIED-REPAIR BIT AND NOTHING ELSE — THE PROPERTY ROW (`u`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('csw_prop_P_CSW_3_the_sweeps_state_is_one_applied_repair_bit_per_admitted_pair', (t) => {
  // **PROPERTY** (`§4` `P-CSW-3`, restated on `D-124` item 1). `∀` generated construction: **(i)** NO PAIR
  // LANDS TWO REPAIRS — the applied-repair bit is set at most once per admitted pair; **(ii)** THE NUMBER OF
  // REPAIRS THE CONSTRUCTION LANDS IS `≤` THE NUMBER OF ADMITTED PAIRS — *"the arithmetic bound that replaced
  // the cap"*; **(iii)** NO INSTRUMENT IS MINTED — the instance's own member set is the declared fifteen, no
  // commit window stands and no attempt is left open at the return (`PIN-14` (i): *"no attempt, no budget
  // member, no \`AttemptRef\`, no \`D-\` row, no \`DD\` row"*); and **(iv)** the act answers a refusal at one of
  // the two constraint-subject members or an instance, and never a third thing.
  //
  // **GENERATOR.** `1`–`4` admitted pairs at distinct addresses, each with a MONOTONE repair (it writes its
  // own threshold at its own address), crossed with a BREAKER whose repair writes a generated victim BELOW its
  // threshold — the one shape that makes the rounds continue past the first. 32 cases, one pinned literal
  // seed, the breaker arm rotated so it occurs.
  //
  // **FALSIFIER.** A pair whose repair count is above one (a detector that let a second repair land), a
  // construction whose repairs outnumber its admitted pairs, or an instance carrying a member outside the
  // declared fifteen.
  const SEED = 0x5C5703;
  const MEMBERS = [
    'addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen', 'read',
    'readLiteral', 'readTiered', 'register', 'removeConstraint', 'removeListener', 'rollback', 'unlisten', 'write',
  ];
  const ADDRESSES = [['alpha'], ['beta'], ['gamma'], ['delta']];
  const MAX_FAILURES = 5;
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

  for (let i = 0; i < 32 && failures.length < MAX_FAILURES; i += 1) {
    ran += 1;
    const pairs = intBetween(1, 4);
    const breaker = i % 2 === 1;
    const thresholds = [];
    const repairs = [];
    const asks = [];
    const elements = [];
    const draw = { attempt: i, pairs, breaker };
    // **THE ARM IS TALLIED WHEN THE GENERATOR DRAWS IT**, so the reachability check is about the generator and
    // never about the tree's behaviour.
    arms[breaker ? 'breaker' : 'clean'] = (arms[breaker ? 'breaker' : 'clean'] || 0) + 1;
    try {
      for (let k = 0; k < pairs; k += 1) {
        const threshold = intBetween(1, 3);
        thresholds.push(threshold);
        repairs.push(0);
        asks.push(0);
        const index = k;
        elements.push({
          address: ADDRESSES[index],
          id: `bit-${index}`,
          constraint: (context) => {
            asks[index] += 1;
            if (typeof context.value === 'number' && context.value >= threshold) return true;
            return {
              message: `bit-${index} requires a number at or above ${threshold}`,
              repair: (record) => {
                repairs[index] += 1;
                return { ok: true, op: record.write(ADDRESSES[index], 'mem', threshold).op };
              },
            };
          },
        });
      }
      if (breaker) {
        const victim = intBetween(0, pairs - 1);
        draw.victim = victim;
        const below = Math.max(0, thresholds[victim] - 1);
        elements.push({
          address: ['breaker'],
          id: 'breaker',
          constraint: (context) => {
            if (context.value !== undefined) return true;
            return {
              message: 'breaker requires `["breaker"]` to exist',
              repair: (record) => {
                const landed = record.write(['breaker'], 'mem', 1).op;
                // **THE BREAK** — BELOW the victim's threshold, so the rounds continue.
                record.write(ADDRESSES[victim], 'mem', below);
                return { ok: true, op: landed };
              },
            };
          },
        });
      }
      draw.thresholds = thresholds;

      const construction = attempt(() => make({ constraints: elements }));
      const admitted = elements.length;
      draw.repairs = repairs.slice();
      draw.asks = asks.slice();
      draw.status = construction.ok ? 'returned' : statusOf(construction.caught);

      // ── (i) NO PAIR LANDS TWO REPAIRS. ────────────────────────────────────────────────────────────────
      for (let k = 0; k < pairs; k += 1) {
        assert.equal(repairs[k] <= 1, true,
          `P-CSW-3 ${JSON.stringify(draw)}: **THE PAIR AT ${JSON.stringify(ADDRESSES[k])} LANDED AT MOST ONE `
            + `REPAIR — the applied-repair bit is set once** (D-124 item 1: *"A pair may land AT MOST ONE `
            + `REPAIR in a construction"*): it repaired ${repairs[k]} time(s)`);
      }

      // ── (ii) THE REPAIRS NUMBER AT MOST THE ADMITTED PAIRS. ───────────────────────────────────────────
      const landed = repairs.reduce((sum, count) => sum + count, 0);
      assert.equal(landed <= admitted, true,
        `P-CSW-3 ${JSON.stringify(draw)}: **THE REPAIRS NUMBER AT MOST THE ADMITTED PAIRS, WHICH IS THE `
          + `ARITHMETIC THAT REPLACED THE CAP** (D-124 item 1: *"the repairs number at most the admitted `
          + `pairs"*): ${landed} repair(s) over ${admitted} admitted pair(s)`);

      // ── (v) THE BIT IS CONSULTED — THE SWEEP'S STATE IS IN USE. ───────────────────────────────────────
      // **THE APPLIED-REPAIR BIT IS ONLY A STATE IF A PAIR IS ASKED AFTER ITS OWN REPAIR**: the registration's
      // ask, that registration's RE-RUN over the landed op (`D-94` item 1), and **the next round's ask** — the
      // one `PIN-4` (iii) (*"a pair asked again after its own repair and PASSING is not a cycle"*) and `PIN-4`
      // (ii) (*"a pair asked again that would repair again is the cycle"*) both presuppose. **A tree with no
      // next round never consults a bit at all**, which is why this limb is the property's red arm.
      for (let k = 0; k < pairs; k += 1) {
        assert.equal(asks[k] >= 2, true,
          `P-CSW-3 ${JSON.stringify(draw)}: the pair at ${JSON.stringify(ADDRESSES[k])} is asked at its own `
            + `registration and at that registration's re-run — TWO asks (D-94 item 1; PIN-4 (iii)): it was `
            + `asked ${asks[k]} time(s)`);
      }
      if (breaker) {
        assert.equal(asks[draw.victim] >= 3, true,
          `P-CSW-3 ${JSON.stringify(draw)}: **THE BROKEN PAIR IS ASKED AGAIN IN A LATER ROUND AFTER ITS OWN `
            + `REPAIR — THE APPLIED-REPAIR BIT IS CONSULTED, WHICH IS WHAT MAKES IT A STATE AND NOT A `
            + `DECORATION** (PIN-4 (ii), (iii); D-124 item 1: *"THE SWEEP INHERITS THE MARKER AND NOT THE `
            + `BUDGET"*): the pair at ${JSON.stringify(ADDRESSES[draw.victim])} was asked ${asks[draw.victim]} `
            + `time(s) with ${JSON.stringify(draw.asks)} — **TODAY NO ROUND RUNS AFTER THE REGISTRATION `
            + `INSTANT'S OWN RE-RUN, so the marker is never consulted**`);
      }

      // ── (iv) THE ANSWER IS ONE OF TWO THINGS AND NO THIRD. ────────────────────────────────────────────
      if (construction.ok) {
        // ── (iii) AND NO INSTRUMENT IS MINTED. ──────────────────────────────────────────────────────────
        assert.deepEqual(Object.keys(construction.value).sort(), MEMBERS,
          `P-CSW-3 ${JSON.stringify(draw)}: **THE INSTANCE'S OWN MEMBER SET IS THE DECLARED FIFTEEN — the `
            + `sweep's state mints NO member** (PIN-14 (i); section 6 item 4: *"The member-set census is `
            + `unmoved at 15"*): it read ${JSON.stringify(Object.keys(construction.value).sort())}`);
        assert.equal(openCommits(construction.value), 0,
          `P-CSW-3 ${JSON.stringify(draw)}: **and no commit window stands at the return** (PIN-14 (i): no `
            + `attempt, no budget member, no AttemptRef): the count read `
            + `${openCommits(construction.value)}`);
        assert.equal(kernelFor(construction.value).live.size, 0,
          `P-CSW-3 ${JSON.stringify(draw)}: **and no attempt is left open** — \`kernel.live\` is unmoved at the `
            + `return (section 4 P-CSW-3: *"\`kernel.live\`/\`kernel.closed\` are unmoved at the return"*): it read `
            + `${kernelFor(construction.value).live.size}`);
        arms.returned = (arms.returned || 0) + 1;
      } else {
        assert.equal(CONSTRAINT_CODES.includes(statusOf(construction.caught)), true,
          `P-CSW-3 ${JSON.stringify(draw)}: a refused construction crosses a code whose SUBJECT IS THE `
            + `CONSTRAINTS (PIN-5; PIN-11): it answered ${JSON.stringify(statusOf(construction.caught))}`);
        assert.deepEqual(Object.keys(construction.caught).sort(), ['address', 'log', 'message', 'status'],
          `P-CSW-3 ${JSON.stringify(draw)}: and it is the surface's plain four-member form (index.d.ts, `
            + `StoreRefusal; D-77)`);
        arms.refused = (arms.refused || 0) + 1;
      }
    } catch (err) {
      failures.push({ attempt: i, input: draw, message: err && err.message ? err.message : String(err) });
    }
  }

  if (failures.length > 0) t.diagnostic('P-CSW-3 · THE GENERATED INPUTS THAT FAILED:\n' + JSON.stringify(failures, null, 2));
  for (const arm of ['clean', 'breaker']) {
    assert.ok((arms[arm] || 0) > 0,
      `P-CSW-3: the generator must reach the \`${arm}\` arm — an arm never reached is a falsifier that could `
        + `not fire (read ${JSON.stringify(arms)})`);
  }
  assert.ok((arms.returned || 0) + (arms.refused || 0) > 0,
    `P-CSW-3: the generator must reach a construction — read ${JSON.stringify(arms)}`);
  assert.deepEqual(failures, [],
    `P-CSW-3 held over ${ran} generated cases (seed 0x${(SEED >>> 0).toString(16)}): no pair lands two `
      + `repairs, the repairs number at most the admitted pairs, and the returned instance carries the declared `
      + `fifteen members and no instrument`);

  t.diagnostic(`P-CSW-3 held over ${ran} generated cases, seed 0x${(SEED >>> 0).toString(16)}: arms `
    + `${JSON.stringify(arms)}. The sweep's state is read as the arithmetic — one applied-repair bit per `
    + `admitted pair, no bit set twice, and \`repairs <= admitted pairs\` — and the instance's own member set `
    + `and the two rests are read on every returned arm`);
});
