// tests/e2e/file-save-coverage-properties.test.mjs
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// GATE 11 — THE PROPERTY REGISTER FOR `U-STOREROOM-FILE-SAVE-COVERAGE` (`D-GP-SFSC`).
//
// **WHAT THIS FILE IS.** `docs/specs/storeroom-file-save-coverage/verification.md §4` declares FOUR rows —
// `P-FSC-1`, `P-FSC-2`, `P-FSC-3`, `P-FSC-4` — over GENERATED input, and `sites.md §4.1` item 2 declares this
// path as their one home. Until this file, `P-FSC-1`–`P-FSC-3` had NO HOME AT ALL, and `P-FSC-4` was reached
// only inside a DIFFERENT unit's `P-IM-2` message (`tests/integration/store-core/properties.rs:962`) — which
// `verification.md`'s own disposition paragraph names as a neighbour's assertion and NOT a register.
// **`ZERO-ROW` IS UNAVAILABLE**: the predicates are executable and the inputs are generable, so an unpopulated
// register is not this unit's lawful answer (`strata/walkthrough.md §2`, gate 11; `verification.md §4`).
//
// **EACH ROW IS CARRIED AS A UNIVERSALLY QUANTIFIED PROPERTY, AND EACH NAMES THREE THINGS IN ITS OWN CELL:**
//   · the PROPERTY, quoted from its own row of `verification.md §4`;
//   · its GENERATOR — the drawn dimensions, the pinned seed, and the case budget;
//   · its FALSIFIER — the observation that fails it.
// **AND EVERY FALSIFIER IS MADE REACHABLE, WHICH IS ASSERTED AND NOT CLAIMED**: each property rotates its
// decisive dimension DETERMINISTICALLY across its budget and then CLOSES on an assertion that every arm of
// that dimension occurred. An arm that never occurred would leave its own falsifier unable to fire, and the
// closing assertion turns that silence into a failure instead of a pass.
//
// ── PROVENANCE, STATED SO A READER CAN TELL WHAT EACH EXPECTATION IS DERIVED FROM ────────────────────────
//
// Every expectation below is derived from `docs/specs/storeroom-file-save-coverage/` (`verification.md §4`'s
// four rows and `§3.2-bis`'s three must-turn rows; `carrier.md §5`'s reversal cells) and from the rulings those
// rows carry: `strata/decisions.md` · `D-106` (the rule and its three measured arms), `D-107` (a refusal rolls
// back; a reversal reverts before it saves), `D-108` (the compaction arm REGENERATES), `D-109`
// (`RollbackCompacted` NARROWED to a present, non-empty image the loader cannot read — READ THROUGH `D-118`
// item 1, which reads that image as NO image at all, so **the token is `DECLARED, NO PRODUCER`**, `D-118` item 2),
// `D-110` (one reader), `D-111` (a compensation does not save), `D-112` (the reversal's save is after the
// judgement), `D-116` (the save is the store's existing STATE-KEYED write) and `D-117` (the reversal delivers).
// **No cell asserts a sentence**: each drives acts through the package's declared entry and asserts the BYTES
// at `cfg.filePath`, the acting instance's own file-tier projection, and — where the boot's own answer is the
// claim — a FRESH INSTANCE's answer over the same path.
//
// **THE LAYER IS `ENVELOPE/PURE`** — the row `tests/e2e/file-tier-save.test.mjs`'s own header carries and that
// `verification.md §5` prints: the assembled package over the built addon, no registry install and no
// installed-from-the-package tree. The `bytesOf` and `modState` devices below are RE-DECLARED here rather than
// imported across a scope, exactly as `tests/e2e/file-save-coverage.test.mjs` re-declares them; they are that
// file's two instruments, spelled the same way. `bindings/js/index.mjs` is the only entry reached, and neither
// a document nor a `src/**` byte is read at runtime.
//
// ── `§3.2-BIS`'S MUST-TURN ROWS: DECLARED HERE, AND NOT DUPLICATED ───────────────────────────────────────
//
// `verification.md §3.2-bis` re-cut the site map for three cells that turned in files `sites.md §2` forbade, and
// it declared them rows of THIS unit's evidence with named owners. **THIS REGISTER DECLARES THEM AND WRITES NO
// CELL FOR ANY OF THE THREE**: a second cell asserting a neighbour's predicate is a duplicate and not a row.
//
//   | row   | its landed home (read 2026-11-02)                                    | owner                 |
//   |-------|----------------------------------------------------------------------|-----------------------|
//   | `MT-1`| `tests/e2e/restore-file-save.test.mjs:174`–`:212`, CELL 1's control   | `role_l1_test_writer` |
//   | `MT-2`| `tests/integration/binding-crossing/surface_verbs.rs:899`             | `role_l2_test_writer` |
//   | `MT-3`| `tests/integration/binding-crossing/surface_verbs.rs:957`             | `role_l2_test_writer` |
//
// **`MT-1` IS IN THIS ROLE'S OWN SCOPE AND IS LANDED AND GREEN**, and its instrument is that file's own cell,
// read by the suite run and not re-written here. **`MT-2` AND `MT-3` ARE `role_l2_test_writer`'s**, reach the
// crate through `binding-crossing/support/mod.rs`, and are outside this role's write scope. **A pass that adds
// a cell for any of the three has left this file's subject.**
//
// ── THE LIMITS THIS FILE DECLARES RATHER THAN DISCOVERS ───────────────────────────────────────────────────
//
// (1) **`P-FSC-2`'s "MORE THAN ONCE" HALF IS `NOT-FALSIFIABLE` AT THIS SCOPE, AND IT IS RECORDED AS AN
//     EXEMPTION AND NOT DEFAULTED.** The row's falsifier is *"any act whose modification-state move count
//     exceeds `1`"*, and a second serialization of an image the path already holds writes IDENTICAL BYTES to a
//     FRESH inode: once the act has returned, the only instrument this scope has (`inode:size:mtime`) reads the
//     LAST write and cannot count the ones before it. **So this row is driven in the two halves that ARE
//     observable** — (a) an act that moves no `file`-tier version performs NO serialization at all, and (b) a
//     second identical reversal writes nothing — **and the count above one is left to the crate's own scope,
//     where `N3` (the op-keyed marker), `N9` (the factored helper's unchanged-projection no-op) and `N14` (the
//     delta guard across the regeneration) read the writer directly** (`verification.md §2.2`). **Why it cannot
//     be moved here**: the entry's save channel is `Symbol.for`-keyed and `enumerable: false`, so a package drive
//     cannot name it, and no instance member re-drives a record. **The owner of the count is that battery and
//     not this file.**
// (2) **THE PATH-LESS STORE IS NOT GENERATED**, because it has no bytes to project (`verification.md §4`'s own
//     closing paragraph; `FSC-RULE-NOOP`/`FSC-ARM4-NOPATH` drive that boundary deterministically). **And a
//     `file`-tier write on a path-less store is REFUSED by the store itself** — `ParentAnchorMonotonicityViolation`,
//     measured 2026-11-02 — so a generated path-less case cannot even build the state such a property is about.
// (3) **TWO REFUSAL ROUTES OUTSIDE THE ROWS' DECLARED GENERATORS ARE RECORDED AT `P-FSC-3` AND ASSERTED ONLY
//     WHERE THE OBSERVATION IS STABLE.** See that cell's boundary block: they are FINDINGS against the rows' own
//     universal quantifiers (`strata/walkthrough.md §3` item 8), printed rather than defaulted, and they are not
//     passes of the rows.
// (4) **THE TIER-PARAMETER READ IS AN ASSEMBLY AND NOT A VERSION LOOKUP, SO IT IS NOT A UNIVERSAL INSTRUMENT.**
//     `read(address, 'file')` assembles the subtree over the tier set, so a node whose SHAPE was minted at a lower
//     tier answers `TierNotFound` at the `file` tier even where a `file`-tier version's value stands beneath it —
//     the state `docs/specs/storeroom-native/contract.md`'s `DD-31` and `§5.6`'s `3 × 3` census exist to make
//     reachable. **So `P-FSC-1`'s silent arms write at addresses that hold NO more-persistent version** (which is
//     what a control IS: `FSC-ARM1-MEM`/`FSC-ARM3-NEG`'s own shape), and the boundary block reads a purge with the
//     store's own `delete` receipt rather than with a tier read. **Where a generated case's shape puts a lower-tier
//     container over a `file` leaf, this read is not the projection and the row does not claim it is.**
//
// **`un-run` IS A FAILURE**: every row below is driven here, and a row whose cases all break FAILS this file.
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE INSTRUMENTS
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

/** THE FILE'S OWN BYTES AT `cfg.filePath`, read AS BYTES — every durability limb is read off this. */
function bytesOf(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : null;
}

/** THE MODIFICATION STATE, read as an identity triple, so "a save happened" is a recorded fact. */
function modState(filePath) {
  const s = statSync(filePath);
  return { ino: s.ino, size: s.size, mtimeMs: s.mtimeMs };
}

const moved = (before, after) => before.ino !== after.ino || before.size !== after.size || before.mtimeMs !== after.mtimeMs;

/** A scratch directory and the one path inside it a case's stores are constructed at. */
function scratch(tag) {
  const dir = mkdtempSync(join(tmpdir(), `fsc-prop-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
}

/** A store at the two REQUIRED `cfg` keys alone (`index.d.ts`, `StoreConfig`), plus the case's own keys. */
const make = (extra = {}) => storeCreate({ journalLength: 8, listeners: [], ...extra });

/** Run `fn`, capturing the thrown value instead of propagating it. Neither arm is a pass by itself. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (thrown) {
    return { ok: false, caught: thrown };
  }
}

// The two codes that mean "nothing stands at that address here", read apart from every other refusal: a TIER
// projection answers `TierNotFound` where the address stands at another tier, and `AddressNotFound` where
// nothing stands at all (a fresh boot's own answer is always the second).
const ABSENT_CODES = new Set(['AddressNotFound', 'TierNotFound']);

/**
 * WHAT ONE INSTANCE ANSWERS AT ONE ADDRESS — read at its DEFAULT tier (a boot's own reading) or at the named
 * tier (the acting instance's own FILE-TIER PROJECTION). Three arms and no fourth: a value, absent, or a
 * refusal code this register does not expect at a probe address.
 */
function answer(instance, address, tier) {
  const read = attempt(() => (tier === undefined ? instance.read(address) : instance.read(address, tier)));
  if (read.ok) return { present: true, value: read.value };
  if (ABSENT_CODES.has(read.caught.status)) return { present: false };
  return { present: false, refused: read.caught.status };
}

function describeAnswer(a) {
  if (a.present === true) return `value ${JSON.stringify(a.value)}`;
  if (a.refused !== undefined) return `refusal ${JSON.stringify(a.refused)}`;
  return 'absent';
}

/** Structural equality of two drawn values, ANSWERING rather than throwing, so a case can report its input. */
function same(a, b) {
  try {
    assert.deepEqual(a, b);
    return true;
  } catch {
    return false;
  }
}

/**
 * **`P-FSC-1`'s COMPARISON, AND THE WHOLE OF THAT ROW**: the store's own FILE-TIER PROJECTION at an address
 * against what a FRESH STORE over the same path answers there. Two answers agree when both are absent, or when
 * both carry the same value. **A projection that carries a value a boot cannot read back is `D-106` item 1's
 * measured defect**, and that is exactly what this function reports.
 */
function agrees(projection, boot) {
  if (projection.present !== boot.present) return false;
  if (projection.present === true) return same(projection.value, boot.value);
  // Both are absent, and the ONLY disagreement left is a code one side reads as absence and the other does
  // not: an assembled read may answer `LeafHasNoDownstream` where a boot answers it too, and a code on one side
  // alone is a divergence this register reports rather than normalises.
  return projection.refused === boot.refused;
}

/** Every probe address's answer, as a comparable census a refusal's BEFORE/AFTER comparison reads. */
function census(instance, addresses) {
  return addresses.map((address) => ({ address, answer: describeAnswer(answer(instance, address)) }));
}

// ── THE DETERMINISTIC PINNED SEEDS — ONE PER ROW, A LITERAL EACH ───────────────────────────────────────────
//
// `mulberry32` is a pure function of the seed: no clock, no `Math.random`, no host entropy. Every run draws the
// same values in the same order, so a reported failure is reproducible from `(seed, attempt)` alone.
const SEEDS = {
  'P-FSC-1': 0x5F1C01,
  'P-FSC-2': 0x5F1C02,
  'P-FSC-3': 0x5F1C03,
  'P-FSC-4': 0x5F1C04,
};

const MAX_FAILURES_PER_PROPERTY = 5;

/** THE ROW BUDGET — the attempts each row runs, printed at its own cell and checked by this file's census. */
const CASES = {
  'P-FSC-1': 27, //  9 act classes x 3 rounds
  'P-FSC-2': 28, //  7 act classes x 4 rounds
  'P-FSC-3': 24, //  3 refusal arms x 4 journal lengths x 2 landing shapes
  'P-FSC-4': 12, //  4 journal lengths x 3 rounds
};
const ATTEMPTS_TOTAL = Object.values(CASES).reduce((total, n) => total + n, 0);

/** THE ROWS THAT ACTUALLY RAN — a row that did not run is the failure the closing census reports. */
const ROW_RUNS = [];

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
 * THE PROPERTY RUNNER: at most `cases` generated cases, stopping after `MAX_FAILURES_PER_PROPERTY` failures,
 * carrying the generated input of every case out with its verdict. `draw` is the case's own record of what it
 * drew — it is what a failing case PRINTS, so a failure names its own input and not a category.
 */
function runProperty({ row, seed, cases, body }) {
  const rng = rngFor(seed);
  const failures = [];
  const arms = Object.create(null);
  let ran = 0;
  for (let i = 0; i < cases && failures.length < MAX_FAILURES_PER_PROPERTY; i += 1) {
    const draw = { attempt: i };
    ran += 1;
    try {
      body(rng, i, draw, arms);
    } catch (err) {
      failures.push({ attempt: i, input: draw, message: err && err.message ? err.message : String(err) });
    }
  }
  ROW_RUNS.push({ row, seed, cases: ran, failures: failures.length });
  return { row, seed, cases: ran, failures, arms };
}
const tally = (arms, name) => {
  arms[name] = (arms[name] || 0) + 1;
};

// ── THE GENERATORS' DOMAINS ───────────────────────────────────────────────────────────────────────────────

/** The depth-1 keys a shape is built from; `mm`, `zz`, `r`, `p`, `n`, `m`, `e` are the drives' own. */
const SHAPE_KEYS = ['a', 'b', 'c', 'd'];

/** The admitted tree's leaf classes, each drawn FRESH so no case shares a value object with another. */
const LEAF_KINDS = ['number', 'string', 'boolean', 'array', 'object'];

function freshValue(kind) {
  if (kind === 'number') return 7;
  if (kind === 'string') return 'leaf';
  if (kind === 'boolean') return true;
  if (kind === 'array') return [1, 2];
  if (kind === 'object') return { k: 1 };
  throw new Error(`no value of kind ${kind}`);
}

/** `n` DISTINCT depth-1 keys, in draw order, so a shape's addresses never collide. */
function drawKeys(next, n) {
  const pool = SHAPE_KEYS.slice();
  const drawn = [];
  for (let index = 0; index < n; index += 1) {
    const at = Math.floor(next() * pool.length) % pool.length;
    drawn.push(pool.splice(at, 1)[0]);
  }
  return drawn;
}

/**
 * SEED A SHAPE AT THE `file` TIER: each drawn key holds a leaf value, or a CONTAINER whose one child holds a
 * leaf — the two classes the projection has to answer for. A child is written only after its parent stands,
 * because a write under an ABSENT parent is `AddressNotFound` and a write under a LEAF is `WriteParentNotLink`
 * (both measured on this tree).
 */
function seedShape(store, next, keys) {
  const kindOf = Object.create(null);
  const addresses = [];
  for (const key of keys) {
    const kind = pick(next, [...LEAF_KINDS, 'container']);
    if (kind === 'container') {
      store.write([key], 'file', {});
      store.write([key, 'x'], 'file', freshValue(pick(next, LEAF_KINDS)));
      addresses.push([key], [key, 'x']);
      kindOf[key] = 'container';
    } else {
      store.write([key], 'file', freshValue(kind));
      addresses.push([key]);
      kindOf[key] = kind;
    }
  }
  return { kindOf, addresses };
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-FSC-1` — THE FILE-TIER IMAGE EQUALS THE STORE'S OWN DURABLE PROJECTION
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('fsc_prop_P_FSC_1_the_image_at_file_path_equals_the_stores_own_file_tier_projection', (t) => {
  // **PROPERTY (`verification.md §4`, `P-FSC-1`, quoted).** *"THE RULE, AS A UNIVERSALLY QUANTIFIED PREDICATE:
  // for any act of the three measured classes, the bytes at `filePath` agree with the acting instance's own
  // file-tier projection once the act has returned"* — i.e. a fresh `storeCreate` over the same path answers,
  // at every generated address, what the acting instance answers. **The row's other half is its negative**: the
  // same predicate holds *"after none of the silent arms"* — an act that moved no `file`-tier version leaves the
  // bytes BYTE-IDENTICAL, so the agreement it had before it is the agreement it has after it (`D-106` item 4;
  // `D-111` item 1).
  //
  // **GENERATOR.** `9` act classes x `3` rounds = `27` cases under seed `0x5F1C01`: the three classes the row
  // names — a `file`-tier write a registration's repair lands, a whole-target `delete`, a successful
  // `rollback` — each at the `file` tier AND at each of its two SILENT counterparts (`mem`, `temp`); a shape of
  // `1`–`3` distinct depth-1 keys, each holding a leaf of the admitted pool or a container with one child; and,
  // at every case, addresses that stand at no tier at all. **Every case asserts its own PRECONDITION FIRST** —
  // the projection and the image agreed BEFORE the act — so no case can pass on a seeding that had diverged.
  //
  // **FALSIFIER.** Any generated case where the boot's answer differs from the acting instance's, REPORTED WITH
  // ITS SEED AND ITS DRAWN INPUT; **and, on a silent arm, any byte or inode moved.** Before this unit the
  // registration-instant arm answered `AddressNotFound` at the repaired address — `D-106` item 1's measured
  // signature — and that is the case this row's engine catches rather than enumerates.
  const ACT_CLASSES = [
    { id: 'registration-file', shape: 'registration', tier: 'file', silent: false },
    { id: 'registration-mem', shape: 'registration', tier: 'mem', silent: true },
    { id: 'registration-temp', shape: 'registration', tier: 'temp', silent: true },
    { id: 'delete-whole', shape: 'delete', tier: null, silent: false },
    { id: 'delete-mem-only', shape: 'delete-mem', tier: null, silent: true },
    { id: 'delete-temp-only', shape: 'delete-temp', tier: null, silent: true },
    { id: 'rollback-file', shape: 'rollback', tier: 'file', silent: false },
    { id: 'rollback-mem', shape: 'rollback', tier: 'mem', silent: true },
    { id: 'rollback-temp', shape: 'rollback', tier: 'temp', silent: true },
  ];

  const result = runProperty({
    row: 'verification.md §4 · P-FSC-1',
    seed: SEEDS['P-FSC-1'],
    cases: CASES['P-FSC-1'],
    body: (next, i, draw, arms) => {
      const cls = ACT_CLASSES[i % ACT_CLASSES.length];
      const { dir, filePath } = scratch(`p1-${i}`);
      const store = make({ filePath });
      const keys = drawKeys(next, intBetween(next, 1, 3));
      const { kindOf, addresses } = seedShape(store, next, keys);
      Object.assign(draw, { actClass: cls.id, shapeKeys: keys, shapeKinds: kindOf });

      // ── THE DRIVE'S OWN PREPARATION, TAKEN BEFORE THE ACT IS MEASURED ────────────────────────────────────
      // A whole-target delete of a MEMORY-ONLY address needs one to exist; a reversal needs two writes at one
      // address. Both are the drive's, so the modification state counted below is the ACT's alone.
      let actedOn = null;
      let reversed = null;
      if (cls.shape === 'delete-mem' || cls.shape === 'delete-temp') {
        actedOn = ['mm'];
        store.write(actedOn, cls.shape === 'delete-mem' ? 'mem' : 'temp', 5);
      } else if (cls.shape === 'delete') {
        actedOn = [pick(next, keys)];
      } else if (cls.shape === 'rollback') {
        actedOn = ['r'];
        store.write(actedOn, cls.tier, 0);
        reversed = store.write(actedOn, cls.tier, 1);
      } else if (cls.silent) {
        // **THE SILENT ARMS' OWN PREMISE, STATED SO THE CONTROL IS A CONTROL**: a `mem`/`temp`-tier write at an
        // address holding NO more-persistent version moves no `file`-tier datum — the shape `FSC-ARM1-MEM` drives.
        // **A write at an address that DOES hold a more-persistent version is NOT such an act, and its two cases
        // are read at this cell's boundary block and not here**: a CONTAINER value PURGES the `file`-tier version
        // (`D-106` item 2's rule reaches it and `PIN-4` (i)'s ground as spelled does not), while a SCALAR merely
        // shadows it. **The row's silent arms are the ones that owe nothing; a control that owes a save is not a
        // control** (this file's head, limit 4).
        actedOn = ['sm'];
      } else {
        actedOn = [pick(next, keys)];
      }
      Object.assign(draw, { actedOn });

      const probes = [...addresses, actedOn, ['zz'], ['mm'], ['r'], ['zz', 'w']];

      // ── THE PRECONDITION: THE IMAGE AND THE PROJECTION AGREED BEFORE THE ACT. ─────────────────────────────
      {
        const boot = make({ filePath });
        for (const address of probes) {
          const projection = answer(store, address, 'file');
          const bootAnswer = answer(boot, address);
          assert.equal(agrees(projection, bootAnswer), true,
            `P-FSC-1 ${JSON.stringify(draw)}: THE DRIVE MUST START FROM AN IMAGE THAT AGREES WITH THE PROJECTION — at `
              + `${JSON.stringify(address)} the projection answers ${describeAnswer(projection)} and a fresh boot answers `
              + `${describeAnswer(bootAnswer)}`);
        }
      }

      const before = bytesOf(filePath);
      const mods = modState(filePath);

      // ── THE ACT — ONE OF THE NINE CLASSES ─────────────────────────────────────────────────────────────────
      if (cls.shape === 'registration') {
        const value = freshValue(pick(next, LEAF_KINDS));
        Object.assign(draw, { repairedWith: { at: actedOn, tier: cls.tier, value } });
        const added = attempt(() => store.addConstraint({ address: ['zz'], id: `p1-${i}` }, (context) => {
          if (context.value !== undefined) return true;
          return {
            message: '`["zz"]` is absent',
            repair: (record) => ({ ok: true, op: record.write(actedOn, cls.tier, value).op }),
          };
        }));
        assert.equal(added.ok, true,
          `P-FSC-1 ${JSON.stringify(draw)}: a registration whose repair landed and was re-run must PASS `
            + `(\`D-106\` item 3, arm 1): it threw ${JSON.stringify(added.caught?.status)}`);
      } else if (cls.shape === 'rollback') {
        const reversal = attempt(() => store.rollback(reversed.op.opId));
        assert.equal(reversal.ok, true,
          `P-FSC-1 ${JSON.stringify(draw)}: the reversal must succeed: it threw ${JSON.stringify(reversal.caught?.status)}`);
      } else {
        const receipt = attempt(() => store.delete(actedOn));
        assert.equal(receipt.ok, true,
          `P-FSC-1 ${JSON.stringify(draw)}: the whole-target delete must land: it threw ${JSON.stringify(receipt.caught?.status)}`);
        assert.equal(receipt.value.op.tier, null,
          `P-FSC-1 ${JSON.stringify(draw)}: a whole-target delete names NO tier (\`index.d.ts:628\`–\`:635\`)`);
      }

      // ── (1) THE PROPERTY: THE IMAGE EQUALS THE PROJECTION AT EVERY GENERATED ADDRESS. ────────────────────
      const fresh = make({ filePath });
      for (const address of probes) {
        const projection = answer(store, address, 'file');
        const bootAnswer = answer(fresh, address);
        assert.equal(agrees(projection, bootAnswer), true,
          `P-FSC-1 ${JSON.stringify(draw)}: THE BYTES MUST AGREE WITH THE STORE'S OWN FILE-TIER PROJECTION once the act `
            + `has returned (\`D-106\` item 2's rule) — at ${JSON.stringify(address)} the acting instance's projection answers `
            + `${describeAnswer(projection)} and a fresh boot over the same path answers ${describeAnswer(bootAnswer)}; `
            + `the image is ${JSON.stringify(bytesOf(filePath))}`);
      }

      // ── (2) THE SILENT ARMS: A BYTE MOVE OR AN INODE MOVE IS THE FALSIFIER. ───────────────────────────────
      if (cls.silent) {
        assert.equal(bytesOf(filePath), before,
          `P-FSC-1 ${JSON.stringify(draw)}: AN ACT THAT MOVED NO \`file\`-TIER VERSION OWES NOTHING (\`D-106\` item 4) — the `
            + `bytes read ${JSON.stringify(bytesOf(filePath))} where the drive left ${JSON.stringify(before)}`);
        assert.equal(moved(mods, modState(filePath)), false,
          `P-FSC-1 ${JSON.stringify(draw)}: and the modification state is unmoved — a silent arm serializes nothing `
            + `(\`D-111\` item 1; \`D-116\` item 3)`);
        tally(arms, `${cls.id} · silent`);
      } else {
        assert.equal(moved(mods, modState(filePath)), true,
          `P-FSC-1 ${JSON.stringify(draw)}: a SAVING arm must reach a save — the modification state did not move `
            + `(\`D-106\` items 1–3)`);
        tally(arms, `${cls.id} · saving`);
      }
      rmSync(dir, { recursive: true, force: true });
    },
  });

  if (result.failures.length > 0) {
    t.diagnostic(`P-FSC-1 · THE GENERATED INPUTS THAT FAILED:\n${JSON.stringify(result.failures, null, 2)}`);
  }
  // **THE FALSIFIER IS REACHABLE, AND THIS IS HOW IT IS KNOWN**: every act class occurred, so an inversion of any
  // one of the nine — a silent arm that starts saving, or a saving arm that stops — fails a case in this run.
  for (const cls of ACT_CLASSES) {
    assert.ok(result.arms[`${cls.id} · ${cls.silent ? 'silent' : 'saving'}`] > 0,
      `P-FSC-1: the generator must reach the \`${cls.id}\` arm — an arm never reached is a falsifier that could not fire `
        + `(read ${JSON.stringify(result.arms)})`);
  }
  assert.deepEqual(result.failures, [],
    `P-FSC-1 held over ${result.cases} generated cases (seed 0x${(result.seed >>> 0).toString(16)})`);

  // ── THE BOUNDARY BLOCK — RECORDED AND NOT DEFAULTED (this file's head, limit 3) ───────────────────────────
  //
  // **⟶ RE-DERIVED 2026-11-02 (`D-106` item 2 with `PIN-17` (γ); `strata/envelope.md` §5's shadow). THE
  // MOVEMENT IS RECORDED BECAUSE THIS BLOCK'S TWO HALVES NOW READ THE OTHER WAY ROUND.** As filed, this block
  // measured *"a lower-persistence write of a CONTAINER value at an address that holds a `file`-tier version
  // PURGES it and SAVES NOTHING"*, and it printed that as a FINDING against `PIN-4` (i)'s eligibility ground.
  // **The landing closes it: `Store::save_owed` reads the second disjunct as a DEPARTURE, so an op whose act
  // made a `file`-tier version LEAVE the register is eligible like any `file`-tier write** — a lower-tier
  // CONTAINER write at an address holding a `file` leaf **purges it and SAVES**, while a lower-tier SCALAR at
  // the same address **shadows** it, leaves it standing, and **moves no byte**. **The two arms are the two
  // halves of one rule and both are asserted here**, because a rule that saved on the scalar arm would be the
  // count this ground replaced and a rule that wrote nothing on the container arm would be the defect
  // `D-106` item 2 exists to catch.
  {
    const { dir, filePath } = scratch('p1-boundary');
    // (1) THE SCALAR ARM: BOTH VERSIONS STAND, SO NO `file`-TIER DATUM MOVED AND NOTHING IS SAVED.
    const scalar = make({ filePath });
    scalar.write(['scalar'], 'file', 'leaf');
    const scalarImage = bytesOf(filePath);
    const scalarMods = modState(filePath);
    const scalarWrite = scalar.write(['scalar'], 'mem', 'shadow');
    // THE THREE READINGS THE SHADOW OWES ARE TAKEN **BEFORE** THE RECEIPT'S OWN DELETE, because that delete is a
    // DIFFERENT act and it saves (`D-106` arm 2's first disjunct): a cell that read them after it would measure
    // the delete and not the shadow.
    const scalarAfter = { image: bytesOf(filePath), mods: modState(filePath) };
    const scalarTier = answer(scalar, ['scalar'], 'file');
    const scalarReceipt = attempt(() => scalar.delete(['scalar'], 'file'));
    assert.equal(scalarWrite.op.tier, 'mem', 'P-FSC-1 boundary: the write itself names `mem`');
    assert.deepEqual(scalarReceipt.value?.tiers, ['file'],
      `P-FSC-1 boundary: a lower-tier SCALAR write leaves the \`file\`-tier version standing — the store's own delete `
        + `receipt names ${JSON.stringify(scalarReceipt.value?.tiers)} (\`DD-9\`)`);
    assert.deepEqual(answer(scalar, ['scalar']), { present: true, value: 'shadow' },
      'P-FSC-1 boundary: and the address answers the shadowing scalar');
    assert.deepEqual(scalarTier, { present: true, value: 'leaf' },
      `P-FSC-1 boundary: **AND THE DURABLE VERSION STILL ANSWERS AT ITS OWN TIER** — a shadow is not a purge: `
        + `${describeAnswer(scalarTier)}`);
    assert.equal(moved(scalarMods, scalarAfter.mods), false,
      'P-FSC-1 boundary: **A LOWER-TIER SCALAR WRITE MOVES NO BYTE** — no version at `Tier::File` left the '
        + 'register, so no save is owed (`D-106` item 4; `PIN-17` (γ) read as a departure and not a count)');
    assert.equal(scalarAfter.image, scalarImage,
      `P-FSC-1 boundary: and the image is BYTE-IDENTICAL to the one the \`file\` version wrote: `
        + `${JSON.stringify([scalarImage, scalarAfter.image])}`);

    // (2) THE CONTAINER ARM: THE `file`-TIER VERSION IS PURGED **AND THE PURGE SAVES**.
    const purge = make({ filePath });
    purge.write(['container'], 'file', 'leaf');
    const purgeImage = bytesOf(filePath);
    const purgeMods = modState(filePath);
    purge.write(['container'], 'mem', { k: 1 });
    const purgeMoved = moved(purgeMods, modState(filePath));
    const containerReceipt = attempt(() => purge.delete(['container'], 'file'));
    assert.deepEqual(containerReceipt.value?.tiers, [],
      `P-FSC-1 boundary: **A LOWER-TIER CONTAINER WRITE PURGES THE \`file\`-TIER VERSION** — the store's own delete `
        + `receipt names ${JSON.stringify(containerReceipt.value?.tiers)} and not ["file"] (\`A19\`'s purge)`);
    assert.deepEqual(answer(purge, ['container']), { present: true, value: { k: 1 } },
      'P-FSC-1 boundary: the address answers the container the write minted');
    assert.equal(purgeMoved, true,
      'P-FSC-1 boundary: **AND THE PURGE MOVES THE MODIFICATION STATE — IT SAVES** (`D-106` item 2 with `PIN-17` '
        + '(γ): a version at `Tier::File` LEFT the register during the act, and that departure is the '
        + 'eligibility ground)');
    assert.notEqual(bytesOf(filePath), purgeImage,
      `P-FSC-1 boundary: **NO BYTE WAS WRITTEN** is FALSE of this arm — the image moved from `
        + `${JSON.stringify(purgeImage)} to ${JSON.stringify(bytesOf(filePath))}`);
    assert.deepEqual(JSON.parse(bytesOf(filePath)), {},
      `P-FSC-1 boundary: and the image the save wrote is the register's own \`file\` projection — the purged `
        + `version is NOT in it: ${JSON.stringify(bytesOf(filePath))}`);
    assert.deepEqual(answer(make({ filePath }), ['container']), { present: false },
      `P-FSC-1 boundary: **SO A FRESH BOOT DOES NOT RESURRECT THE PURGED VERSION** — it answers `
        + `${JSON.stringify(describeAnswer(answer(make({ filePath }), ['container'])))} where the same boot over the `
        + `un-saved image would have read \`"leaf"\``);

    t.diagnostic(`FSC-P1 · FINDING CLOSED AND RE-DERIVED (boundary) — the two halves of \`PIN-17\` (γ)'s shadow, `
      + `measured 2026-11-02 at the landed bytes. A lower-persistence write of a CONTAINER value at ["container"], `
      + `where a \`file\`-tier version stood, PURGES that version and SAVES: the store's own `
      + `\`delete(["container"], "file")\` receipt answers ${JSON.stringify(containerReceipt.value?.tiers)}, the image `
      + `moved from ${JSON.stringify(purgeImage)} to ${JSON.stringify(bytesOf(filePath))}, and a fresh boot reads `
      + `${JSON.stringify(describeAnswer(answer(make({ filePath }), ['container'])))} there. The SCALAR arm reads the `
      + `other way (receipt ${JSON.stringify(scalarReceipt.value?.tiers)}, image ${JSON.stringify(scalarImage)} `
      + `byte-identical and its inode unmoved), so the purge is the CONTAINER's minting and not "any lower-tier `
      + `write". **\`PIN-4\` (i)'s eligibility ground as SPELLED — the op's own tier word, else a tier-less op — no `
      + `longer describes the store: \`Store::save_owed\` reads the second disjunct as a DEPARTURE.** The finding `
      + `this block filed is therefore CLOSED by the landing and the block stays as its own regression (a rule that `
      + `wrote nothing here would be \`D-106\` item 2's defect).`);
    rmSync(dir, { recursive: true, force: true });
  }

  t.diagnostic(`FSC-P1 · P-FSC-1 held over ${result.cases} generated cases, seed 0x${(result.seed >>> 0).toString(16)}: `
    + `arms ${JSON.stringify(result.arms)}. The comparison is the acting instance's \`read(address, 'file')\` against a `
    + `fresh \`storeCreate({filePath})\`'s default \`read(address)\`; the two "absent" codes (\`TierNotFound\`, `
    + `\`AddressNotFound\`) are read as one absent and every other code is REPORTED rather than normalised `
    + `(verification.md §4 P-FSC-1; D-106 items 2 and 4).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-FSC-2` — AT MOST ONE SERIALIZATION PER ACT, AND A SECOND IDENTICAL ACT WRITES NOTHING
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('fsc_prop_P_FSC_2_no_act_serializes_the_image_twice_and_a_second_identical_act_writes_nothing', (t) => {
  // **PROPERTY (`verification.md §4`, `P-FSC-2`, quoted).** *"THE ONCE-PER-RECORD LAW'S CONTRAPOSITIVE: no act of
  // the FIVE classes serializes the file's image more than ONCE"* — *"with the regenerating reversal added to the
  // four the earlier draft's row named"* — read with `D-113` item 4's guard, which *"is also what makes a second
  // identical reversal write nothing"*, and with `D-116` item 3: *"the store writes where the image the path holds
  // is not the state it stands at"*.
  //
  // **THE OBSERVABLE HALF IS THE HALF THIS FILE CARRIES, AND ITS LIMIT IS THE FILE'S OWN LIMIT (1)**: a second
  // serialization of an image the path already holds writes IDENTICAL BYTES, so `inode:size:mtime` after the act
  // reads the LAST write and cannot count the ones before it. **So the row is driven as (a) `0` on every silent
  // arm and a move on every saving arm, and (b) `0` on a SECOND IDENTICAL act** — the countable half, and the one
  // that turns if the projection guard is replaced by a record-keyed re-drive. The count above one is
  // `N3`/`N9`/`N14`'s at the crate's own scope.
  //
  // **GENERATOR.** `7` act classes x `4` rounds = `28` cases under seed `0x5F1C02`: a registration whose repair
  // lands `0`, `1` and `2`–`4` `file`-tier versions (repairs split across tiers and across distinct addresses,
  // one pair and several); a whole-target delete; a reversal over `1`–`3` undone ops; **a REFUSING registration**
  // whose route landed `1`–`3` ops at `file`/`mem`; and **a REVERSAL THAT REGENERATES over `journalLength`
  // `1`–`4`** so the window is the producer. **Every reversal case is then driven a SECOND time with the
  // identical argument.**
  //
  // **FALSIFIER.** A silent arm that moves the state at all; a saving arm that moves nothing; **and any second
  // identical reversal that writes a byte, moves an inode, or answers a refusal.**
  const ACT_CLASSES = [
    'registration-no-file-repair',
    'registration-one-file-repair',
    'registration-several-file-repairs',
    'delete-whole',
    'rollback-multi',
    'refusing-registration',
    'regenerating-reversal',
  ];

  /** One registration whose repair lands `writes.length` versions at the drawn tiers; answers its landings. */
  function registerLanding(store, id, writes, tiers) {
    const landed = [];
    const added = attempt(() => store.addConstraint({ address: [id], id }, (context) => {
      if (context.value !== undefined) return true;
      return {
        message: `\`${JSON.stringify([id])}\` is absent`,
        repair: (record) => {
          let op = null;
          for (let w = 0; w < writes.length; w += 1) {
            op = record.write([`${id}-w${w}`], tiers[w % tiers.length], writes[w]).op;
            landed.push(op);
          }
          return { ok: true, op };
        },
      };
    }));
    assert.equal(added.ok, true,
      `the registration must PASS (\`D-106\` item 3): it threw ${JSON.stringify(added.caught?.status)}`);
    return landed;
  }

  const result = runProperty({
    row: 'verification.md §4 · P-FSC-2',
    seed: SEEDS['P-FSC-2'],
    cases: CASES['P-FSC-2'],
    body: (next, i, draw, arms) => {
      const cls = ACT_CLASSES[i % ACT_CLASSES.length];
      const { dir, filePath } = scratch(`p2-${i}`);
      const window = cls === 'regenerating-reversal' ? 1 + (i % 4) : 8;
      const store = make({ filePath, journalLength: window });
      Object.assign(draw, { actClass: cls, journalLength: window });

      // `expect` is the OBSERVABLE reading this class's arm owes, and `either` is where the row's own
      // comparison is the guard rather than the class (the regenerating reversal and a refusal can both write
      // nothing at all when the image already holds the state — `D-116` item 3).
      let expect = 'moved';
      let prepare = null;
      let act = null;
      let repeat = null;
      let refusalArm = false;

      if (cls === 'registration-no-file-repair') {
        expect = 'unmoved';
        act = () => registerLanding(store, `n${i}`, [1, 2], ['mem', 'temp']);
      } else if (cls === 'registration-one-file-repair') {
        act = () => registerLanding(store, `o${i}`, [1, 2], ['file', 'mem']);
      } else if (cls === 'registration-several-file-repairs') {
        const writes = Array.from({ length: intBetween(next, 2, 4) }, (_, k) => k + 1);
        Object.assign(draw, { fileRepairs: writes.length });
        act = () => registerLanding(store, `s${i}`, writes, ['file']);
      } else if (cls === 'delete-whole') {
        prepare = () => {
          store.write(['k'], 'file', { x: 1 });
        };
        act = () => {
          const receipt = store.delete(['k']);
          assert.equal(receipt.op.tier, null, 'the drive must be the WHOLE-TARGET delete (`D-106` arm 2)');
        };
      } else if (cls === 'rollback-multi') {
        const undone = intBetween(next, 1, 3);
        Object.assign(draw, { undone });
        prepare = () => {
          store.write(['r'], 'file', 0);
          const target = store.write(['r'], 'file', 1);
          for (let k = 2; k <= undone; k += 1) store.write(['r'], 'file', k);
          return target.op.opId;
        };
      } else if (cls === 'refusing-registration') {
        const landings = intBetween(next, 1, 3);
        const tiers = [pick(next, ['file', 'mem']), pick(next, ['file', 'mem'])];
        Object.assign(draw, { landings, tiers });
        refusalArm = true;
        expect = 'either';
        act = () => {
          const refused = attempt(() => store.addConstraint({ address: [`z${i}`], id: `z${i}` }, (context) => {
            if (context.value !== undefined) return true;
            return {
              message: 'absent',
              repair: (record) => {
                for (let w = 0; w < landings; w += 1) record.write([`z${i}-p${w}`], tiers[w % tiers.length], w + 1);
                return { ok: false, message: 'declines after its landings' };
              },
            };
          }));
          assert.equal(refused.ok, false, 'the drive must be a REFUSING registration (`D-107` item 1)');
          assert.equal(refused.caught.status, 'ConstraintRefusedAtRegistration',
            `the refusal keeps rank 19 (\`D-107\` item 5): ${JSON.stringify(refused.caught.status)}`);
        };
      } else {
        // THE REGENERATING REVERSAL: the window is the producer, and the marking reversal runs before the count.
        expect = 'either';
        prepare = () => {
          store.write(['a'], 'file', 1);
          const reversed = store.write(['a'], 'file', 2);
          store.write(['x'], 'file', 9);
          const marking = attempt(() => store.rollback(reversed.op.opId));
          assert.equal(marking.ok, true,
            `the marking reversal must land before the regenerating one: ${JSON.stringify(marking.caught?.status)}`);
          return reversed.op.opId;
        };
      }

      // The reversal classes need the id their preparation answers, so the act is bound after `prepare` runs.
      const reversalId = typeof prepare === 'function' ? prepare() : null;
      if (cls === 'rollback-multi' || cls === 'regenerating-reversal') {
        repeat = reversalId;
        act = () => {
          const reversed = attempt(() => store.rollback(reversalId));
          assert.equal(reversed.ok, true,
            `the reversal must land (${cls}): it threw ${JSON.stringify(reversed.caught?.status)}`);
        };
      }

      const before = bytesOf(filePath);
      const mods = modState(filePath);
      act();
      const afterAct = modState(filePath);

      // ── (a) THE OBSERVABLE HALF: `0` ON A SILENT ARM, A MOVE ON A SAVING ONE, AND THE GUARD'S OWN ANSWER. ──
      if (expect === 'moved') {
        assert.equal(moved(mods, afterAct), true,
          `P-FSC-2 ${JSON.stringify(draw)}: a saving act must reach a save — the modification state did not move `
            + `(\`D-106\` items 1–3)`);
      } else if (expect === 'unmoved') {
        assert.equal(moved(mods, afterAct), false,
          `P-FSC-2 ${JSON.stringify(draw)}: an act that moved no \`file\`-tier version serializes NOTHING (\`D-106\` item 4)`);
        assert.equal(bytesOf(filePath), before,
          `P-FSC-2 ${JSON.stringify(draw)}: and the bytes are byte-identical (${JSON.stringify(bytesOf(filePath))})`);
      } else if (refusalArm) {
        // **A REFUSAL'S OWN READING, AND NOT A BYTE-IDENTITY CLAIM**: a refusal on a FRESH path starts from the
        // constructor's zero-length file, and the composition's one call writes the pre-call image back — so the
        // image may become `{}` where it was `""` and both describe the same empty register. What the row owes is
        // the agreement: no landing stands, and the bytes answer what the store answers (`D-107` item 2).
        for (let w = 0; w < draw.landings; w += 1) {
          assert.equal(answer(store, [`z${i}-p${w}`]).present, false,
            `P-FSC-2 ${JSON.stringify(draw)}: a refusal leaves NO landing standing (\`D-107\` item 1)`);
        }
        assert.equal(againstTheProjection(store, filePath, [[`z${i}-p0`]]), true,
          `P-FSC-2 ${JSON.stringify(draw)}: and the bytes answer what the store answers (\`D-107\` item 2)`);
      } else {
        assert.equal(againstTheProjection(store, filePath, [['a'], ['x']]), true,
          `P-FSC-2 ${JSON.stringify(draw)}: the regenerating arm's image must be the state the store stands at `
            + `(\`D-116\` item 3) — ${JSON.stringify(bytesOf(filePath))}`);
      }
      tally(arms, `${cls} · ${moved(mods, afterAct) ? 'moved' : 'unmoved'}`);

      // ── (b) THE ONCE-PER-STATE LIMB: A SECOND IDENTICAL ACT WRITES NOTHING. ───────────────────────────────
      if (repeat !== null) {
        const imageAfterTheFirst = bytesOf(filePath);
        const stateAfterTheFirst = modState(filePath);
        const again = attempt(() => store.rollback(repeat));
        assert.equal(again.ok, true,
          `P-FSC-2 ${JSON.stringify(draw)}: the second identical reversal must not refuse — it threw `
            + `${JSON.stringify(again.caught?.status)} (\`D-113\` item 4; \`D-116\` item 3)`);
        assert.equal(bytesOf(filePath), imageAfterTheFirst,
          `P-FSC-2 ${JSON.stringify(draw)}: **A SECOND IDENTICAL REVERSAL WRITES NOTHING** — the image moved from `
            + `${JSON.stringify(imageAfterTheFirst)} to ${JSON.stringify(bytesOf(filePath))}`);
        assert.equal(moved(stateAfterTheFirst, modState(filePath)), false,
          `P-FSC-2 ${JSON.stringify(draw)}: **AND NOTHING IS SERIALIZED** — inode:size:mtime reads `
            + `${JSON.stringify(stateAfterTheFirst)} then ${JSON.stringify(modState(filePath))}`);
        tally(arms, `${cls} · once-per-state`);
      }
      rmSync(dir, { recursive: true, force: true });
    },
  });

  /** The image on the path against a fresh boot's answers at the addresses a class moves. */
  function againstTheProjection(store, filePath, addresses) {
    const fresh = make({ filePath });
    for (const address of addresses) {
      if (!agrees(answer(store, address, 'file'), answer(fresh, address))) return false;
    }
    return true;
  }

  if (result.failures.length > 0) {
    t.diagnostic(`P-FSC-2 · THE GENERATED INPUTS THAT FAILED:\n${JSON.stringify(result.failures, null, 2)}`);
  }
  for (const cls of ACT_CLASSES) {
    assert.ok((result.arms[`${cls} · moved`] || 0) + (result.arms[`${cls} · unmoved`] || 0) > 0,
      `P-FSC-2: the generator must reach the \`${cls}\` arm (read ${JSON.stringify(result.arms)})`);
  }
  assert.ok(result.arms['rollback-multi · once-per-state'] > 0 && result.arms['regenerating-reversal · once-per-state'] > 0,
    `P-FSC-2: the once-per-state limb must be reached on BOTH reversal arms — an unreached arm is a falsifier that `
      + `could not fire (read ${JSON.stringify(result.arms)})`);
  assert.deepEqual(result.failures, [],
    `P-FSC-2 held over ${result.cases} generated cases (seed 0x${(result.seed >>> 0).toString(16)})`);

  t.diagnostic(`FSC-P2 · P-FSC-2 held over ${result.cases} generated cases, seed 0x${(result.seed >>> 0).toString(16)}: `
    + `arms ${JSON.stringify(result.arms)}. **THE COUNT ABOVE ONE IS NOT MEASURED HERE AND IS DECLARED SO AT THE FILE'S `
    + `HEAD (limit 1)**: a second serialization of an image the path already holds writes identical bytes to a fresh `
    + `inode, so inode:size:mtime reads the last write and cannot count the earlier ones. The countable halves — zero on `
    + `every silent arm, and ZERO on a second identical reversal — were driven on every case (verification.md §4 P-FSC-2; `
    + `D-113 item 4; D-116 item 3; verification.md §2.2's N3/N9/N14 own the count at the crate's scope).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-FSC-3` — NO LANDED EDIT SURVIVES A REFUSAL
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('fsc_prop_P_FSC_3_no_landed_edit_survives_a_refusal', (t) => {
  // **PROPERTY (`verification.md §4`, `P-FSC-3`, quoted).** *"THE REFUSAL'S OWN PREDICATE (`D-107` item 1): for
  // any refusing registration whose route landed ops, the store's state after the call equals its state before
  // it, at every generated address"* — the same predicate read for the bytes: they are BYTE-IDENTICAL, because
  // the reversal's save writes the pre-call image back. **`D-108` item 2 removes the floor's exception from that
  // sentence**: *"NO LANDED EDIT SURVIVES A REFUSAL, ON ANY ARM, AND THAT IS NOW UNCONDITIONAL."*
  //
  // **GENERATOR.** `24` cases under seed `0x5F1C03`: `3` refusal arms x `4` journal lengths (`1`–`4`, so SOME
  // cases meet a compacted candidate set and the predicate is read across the fourth arm too) x `2` landing
  // shapes — **one whose landings sit at DIFFERENT depth-1 keys and one whose landings sit at a descendant of
  // another**; `1`–`3` landings per case, at tiers drawn from `{file, mem}`. **The three refusal arms are the
  // three `closeRegistrationAttempt` composes over** (`kernel-registration.mjs`'s own clause): the repair's body
  // threw, the repair credited no op, and the re-run refused the repair's own landing.
  //
  // **FALSIFIER.** Any case where a `read` differs before and after, or where a byte moved, or where a pair was
  // carried afterwards, or where the refusal left rank `19`.
  const ARMS = ['repair-body-threw', 'repair-credited-no-op', 'rerun-refused'];

  /** The landings a case drives: `1`–`3` writes, at the shape's addresses and tiers. */
  function landingsFor(next, shapeIndex, count) {
    const landed = [];
    if (shapeIndex === 0) {
      const keys = drawKeys(next, Math.min(count, SHAPE_KEYS.length));
      for (const key of keys) landed.push({ address: [key], tier: pick(next, ['file', 'mem']) });
    } else {
      // THE DESCENDANT SHAPE: the ancestor lands a CONTAINER first, because a child cannot hang under a leaf.
      landed.push({ address: ['p'], tier: 'file', value: {} });
      for (let k = 1; k < count; k += 1) landed.push({ address: ['p', `q${k}`], tier: pick(next, ['file', 'mem']) });
    }
    return landed;
  }

  const result = runProperty({
    row: 'verification.md §4 · P-FSC-3',
    seed: SEEDS['P-FSC-3'],
    cases: CASES['P-FSC-3'],
    body: (next, i, draw, arms) => {
      const arm = ARMS[i % ARMS.length];
      const journalLength = 1 + (Math.floor(i / ARMS.length) % 4);
      const shapeIndex = Math.floor(i / 12); // the second half of the budget takes the other shape
      const count = intBetween(next, 1, 3);
      const landings = landingsFor(next, shapeIndex, count);
      const { dir, filePath } = scratch(`p3-${i}`);
      const store = make({ filePath, journalLength });
      store.write(['seed'], 'file', 'seed');
      Object.assign(draw, { arm, journalLength, shape: shapeIndex === 0 ? 'different' : 'descendant', landings });

      const probes = [...landings.map((l) => l.address), ['p'], ['zz'], ['un'], ['un', 'w']];
      const beforeBytes = bytesOf(filePath);
      const beforeCensus = census(store, probes);
      const mods = modState(filePath);

      let asked = 0;
      const refused = attempt(() => store.addConstraint({ address: ['zz'], id: `p3-${i}` }, (context) => {
        asked += 1;
        if (asked > 1) {
          // THE RE-RUN ARMS: this pair refuses the state its own repair left, or admits it.
          return arm === 'rerun-refused'
            ? { message: 'the re-run refuses the state its repair left' }
            : true;
        }
        return {
          message: '`["zz"]` is absent',
          repair: (record) => {
            let op = null;
            for (const landing of landings) {
              const written = record.write(landing.address, landing.tier, landing.value ?? 1);
              op = written.op;
              if (arm === 'repair-body-threw') {
                // THE BODY THROWS AFTER ITS LANDINGS: the arm `closeRegistrationAttempt` composes over.
                throw new Error('the repair body throws after its landings');
              }
            }
            // THE CREDITED-OP ARM RETURNS A WELL-FORMED `ok` WITH NO OP (`3-bis` (d)'s fourth arm).
            return arm === 'repair-credited-no-op' ? { ok: true } : { ok: true, op };
          },
        };
      }));

      // (1) THE REFUSAL IS THIS REGISTRATION'S OWN RANK `19` AND ITS OWN PLAIN FORM. ────────────────────────
      assert.equal(refused.ok, false,
        `P-FSC-3 ${JSON.stringify(draw)}: the registration must REFUSE on every arm (\`D-107\` item 1)`);
      assert.equal(refused.caught.status, 'ConstraintRefusedAtRegistration',
        `P-FSC-3 ${JSON.stringify(draw)}: the refusal keeps rank 19 and mints no token (\`D-107\` item 5): `
          + `${JSON.stringify(refused.caught.status)}`);
      assert.deepEqual(Object.keys(refused.caught).sort(), ['address', 'log', 'message', 'status'],
        `P-FSC-3 ${JSON.stringify(draw)}: the thrown form is the surface's plain one (\`guide §8\`; \`D-77\`)`);
      assert.equal(Array.isArray(refused.caught.log), true,
        `P-FSC-3 ${JSON.stringify(draw)}: the log is never absent, never null and never a non-array`);

      // (2) **THE PROPERTY: THE STORE IS WHERE THE CALL FOUND IT, AT EVERY GENERATED ADDRESS.** ─────────────
      const afterCensus = census(store, probes);
      for (let at = 0; at < probes.length; at += 1) {
        assert.equal(afterCensus[at].answer, beforeCensus[at].answer,
          `P-FSC-3 ${JSON.stringify(draw)}: **NO LANDED EDIT SURVIVES THE REFUSAL** (\`D-107\` item 1; \`D-108\` item 2) — `
            + `at ${JSON.stringify(probes[at])} the store answered ${beforeCensus[at].answer} before the call and `
            + `${afterCensus[at].answer} after it`);
      }
      // (3) THE BYTES ARE BYTE-IDENTICAL, AND NO PAIR IS CARRIED. ──────────────────────────────────────────
      assert.equal(bytesOf(filePath), beforeBytes,
        `P-FSC-3 ${JSON.stringify(draw)}: the bytes are BYTE-IDENTICAL to the pre-call bytes — the reversal's own `
          + `state-keyed save writes the pre-call image back (\`D-107\` item 2): ${JSON.stringify(bytesOf(filePath))}`);
      assert.deepEqual(store.constraints(), [],
        `P-FSC-3 ${JSON.stringify(draw)}: and no pair is carried on a refusal`);

      tally(arms, `${arm} · L${journalLength} · ${shapeIndex === 0 ? 'different' : 'descendant'}`);
      tally(arms, moved(mods, modState(filePath)) ? 'serialized' : 'not-serialized');
      rmSync(dir, { recursive: true, force: true });
    },
  });

  if (result.failures.length > 0) {
    t.diagnostic(`P-FSC-3 · THE GENERATED INPUTS THAT FAILED:\n${JSON.stringify(result.failures, null, 2)}`);
  }
  // **THE FALSIFIER IS REACHABLE, AND THIS IS HOW IT IS KNOWN**: all three refusal arms occurred, all four
  // journal lengths occurred, and BOTH landing shapes occurred on every arm — so an edition that leaves ONE
  // arm's landings standing (or one journal window's) fails this run.
  for (const arm of ARMS) {
    for (const window of [1, 2, 3, 4]) {
      assert.ok(result.arms[`${arm} · L${window} · different`] > 0 && result.arms[`${arm} · L${window} · descendant`] > 0,
        `P-FSC-3: both landing shapes must be reached on the \`${arm}\` arm at \`journalLength: ${window}\` `
          + `(read ${JSON.stringify(result.arms)})`);
    }
  }
  assert.deepEqual(result.failures, [],
    `P-FSC-3 held over ${result.cases} generated cases (seed 0x${(result.seed >>> 0).toString(16)})`);

  // ── THE BOUNDARY BLOCK — RECORDED AND NOT DEFAULTED (this file's head, limit 3) ───────────────────────────
  //
  // **⟶ RE-DERIVED 2026-11-02, BOTH ROUTES, AND THE MOVEMENT IS RECORDED BECAUSE BOTH FINDINGS THIS BLOCK FILED
  // ARE NOW CLOSED.** As filed, it measured two refusal routes on which a route's landings STAND:
  //
  //   (alpha) **THE RE-RUN'S BODY THROWS.** It answered rank 18 `ConstraintBodyThrew` and composed NOTHING.
  //           **The landing's arm `α` makes that arm compose the registration's rollback, close its attempt and
  //           withdraw its row** — so the landing is WITHDRAWN, the bytes are the pre-call image and the store is
  //           where the call found it. **`D-107` item 1's *"without exception"* now carries this arm.**
  //   (beta)  **THE COMPOSITION MEETS THE CORRUPT IMAGE OVER A MARKED CANDIDATE SET.** It answered the store's
  //           `RollbackCompacted` inside the composition, and its log carried ONE `outcome` entry naming the code.
  //           **`D-118` item 1 removes that arm: the regeneration takes the CREATION STATE, proceeds, and its save
  //           writes a readable image over the corrupt file — so the floor's branch does not fire and the log
  //           carries NO `outcome` entry at all** (`PIN-10` (iv) read THROUGH `D-118`).
  //
  // **WHAT IS ASSERTED IS WHAT IS STABLE, AND ONE PRICE IS PRINTED RATHER THAN ENCODED.** The two statuses, the
  // log's entry count and kinds, the landings' withdrawal and the bytes' agreement with the store are asserted on
  // every arm. **The one thing this file does NOT assert as behaviour is `D-118` item 4's own price**: where the
  // compaction window has taken the ONLY record of a pre-call `file`-tier version AND the file is unreadable,
  // the creation-state base cannot reach it, so the version does not survive the refusal. That is printed at the
  // beta block with the window that shows it, because the row's own quantifier does not carry the exception and
  // the exception is the architect's (`D-118` item 4), not this file's.
  {
    const { dir, filePath } = scratch('p3-alpha');
    const store = make({ filePath });
    store.write(['seed'], 'file', 'seed');
    const beforeBytes = bytesOf(filePath);
    let asked = 0;
    const refused = attempt(() => store.addConstraint({ address: ['zz'], id: 'alpha' }, (context) => {
      asked += 1;
      if (asked > 1) throw new Error('the re-run body throws');
      return {
        message: 'absent',
        repair: (record) => ({ ok: true, op: record.write(['alpha'], 'file', 1).op }),
      };
    }));
    assert.equal(refused.ok, false, '(alpha) the registration refuses');
    assert.equal(refused.caught.status, 'ConstraintBodyThrew',
      `(alpha) a body that throws at the re-run answers the surface's rank 18 form: ${JSON.stringify(refused.caught.status)}`);
    // **THE LANDING'S ARM `α`: THE ROLLBACK IS COMPOSED ON THIS ARM AND THE ROW IS WITHDRAWN.**
    assert.deepEqual(answer(store, ['alpha']), { present: false },
      `(alpha) **NO LANDED EDIT SURVIVES THE REFUSAL ON THIS ARM** — the route's landing at ["alpha"] reads `
        + `${describeAnswer(answer(store, ['alpha']))} after the refusal (\`D-107\` item 1; the landing's arm \`α\`)`);
    assert.equal(bytesOf(filePath), beforeBytes,
      `(alpha) and the bytes are BYTE-IDENTICAL to the pre-call image: ${JSON.stringify(bytesOf(filePath))}`);
    assert.deepEqual(answer(store, ['seed']), { present: true, value: 'seed' },
      '(alpha) and the pre-call version stands where it stood');
    assert.deepEqual(refused.caught.log.map((entry) => entry.kind), ['constraint-check', 'repair-run'],
      `(alpha) the log is the attempt's own two entries and carries NO \`outcome\` entry — the floor's branch does `
        + `not fire on this arm either (\`PIN-10\` (iv)): `
        + `${JSON.stringify(refused.caught.log.map((entry) => entry.kind))}`);
    t.diagnostic(`FSC-P3 · FINDING (alpha) CLOSED — the re-run's body-throw arm (rank 18) COMPOSES the `
      + `registration's rollback: the route's landing at ["alpha"] reads ${describeAnswer(answer(store, ['alpha']))} `
      + `after the refusal, the bytes still read ${JSON.stringify(bytesOf(filePath))} and the pre-call version `
      + `stands. The row's quantifier ("for any refusing registration whose route landed ops") therefore HOLDS on `
      + `this arm, and \`D-107\` item 1's "without exception" carries it. Re-derived, not deleted.`);
    rmSync(dir, { recursive: true, force: true });
  }
  {
    // **THE CORRUPT-IMAGE ARM, DRIVEN AT TWO JOURNAL WINDOWS** — the window decides whether the pre-call
    // `file`-tier version's ONLY record survives the compaction, which is the one place `D-118` item 4's price
    // shows (`M-8`'s totality read at the base's own reach, `D-108` item 3).
    const drive = (journalLength) => {
      const { dir, filePath } = scratch(`p3-beta-${journalLength}`);
      const store = make({ filePath, journalLength });
      store.write(['seed'], 'file', 'seed');
      const beforeBytes = bytesOf(filePath);
      writeFileSync(filePath, 'this is not the register\'s image');
      const refused = attempt(() => store.addConstraint({ address: ['zz'], id: 'beta' }, (context) => (context.value !== undefined
        ? true
        : {
          message: 'absent',
          repair: (record) => {
            record.write(['beta'], 'file', 1);
            record.write(['beta'], 'file', 2);
            return { ok: false, message: 'declines after its landings' };
          },
        })));
      return {
        dir,
        filePath,
        beforeBytes,
        refused,
        seed: describeAnswer(answer(store, ['seed'])),
        beta: describeAnswer(answer(store, ['beta'])),
        bytes: bytesOf(filePath),
        freshSeed: describeAnswer(answer(make({ filePath }), ['seed'])),
        freshBeta: describeAnswer(answer(make({ filePath }), ['beta'])),
      };
    };

    const wide = drive(8);
    assert.equal(wide.refused.ok, false, '(beta) the registration refuses');
    assert.equal(wide.refused.caught.status, 'ConstraintRefusedAtRegistration',
      '(beta) and its status is still rank 19 — the floor mints no token (`D-107` item 5)');
    // **THE ENTRY COUNT THE LANDED CODE PRODUCES**: none. The floor's branch no longer fires, so no `outcome`
    // entry names `RollbackCompacted` — the log is exactly the attempt's own two entries.
    assert.deepEqual(wide.refused.caught.log.map((entry) => entry.kind), ['constraint-check', 'repair-run'],
      `(beta) **NO \`outcome\` ENTRY IS APPENDED ON THIS ARM** (\`PIN-10\` (iv) read through \`D-118\`; \`D-108\` item 2): `
        + `${JSON.stringify(wide.refused.caught.log.map((entry) => entry.kind))}`);
    assert.equal(wide.refused.caught.log.filter((entry) => entry.kind === 'outcome').length, 0,
      '(beta) and no entry carries a `state` at all, so no token rides this log');
    assert.deepEqual(answer(make({ filePath: wide.filePath }), ['beta']), { present: false },
      '(beta) the route\'s landings are WITHDRAWN — nothing of them is durable');
    // **THE QUANTIFIER HOLDS WHOLE WHERE THE WINDOW DOES NOT TAKE THE PRE-CALL RECORD.**
    assert.deepEqual(answer(make({ filePath: wide.filePath }), ['seed']), { present: true, value: 'seed' },
      '(beta) **AND THE PRE-CALL VERSION SURVIVES THE REFUSAL** — the creation-state base plus the surviving '
        + 'journal reaches it, and the save that follows puts it back');
    assert.equal(wide.bytes, wide.beforeBytes,
      `(beta) so the bytes are BYTE-IDENTICAL to the pre-call image (\`D-107\` item 2): `
        + `${JSON.stringify([wide.beforeBytes, wide.bytes])}`);

    // **AND `D-118` ITEM 4'S PRICE, MEASURED AT THE WINDOW THAT SHOWS IT AND PRINTED, NOT ENCODED.**
    const narrow = drive(1);
    assert.equal(narrow.refused.caught.status, 'ConstraintRefusedAtRegistration',
      '(beta-L1) the status is rank 19 on this window too');
    assert.equal(narrow.refused.caught.log.filter((entry) => entry.kind === 'outcome').length, 0,
      '(beta-L1) and no `outcome` entry is appended on this window either');
    assert.deepEqual(narrow.beta, 'absent', '(beta-L1) the route\'s landings are withdrawn');
    // The bytes answer what the store answers on this arm — the reading `P-FSC-3` owes and that no window moves.
    assert.deepEqual(JSON.parse(narrow.bytes), {},
      `(beta-L1) **THE BYTES ANSWER THE STORE'S OWN STATE ON THIS ARM TOO** — the creation-state base leaves `
        + `the register empty and the save writes it: ${JSON.stringify(narrow.bytes)}`);
    assert.deepEqual(answer(make({ filePath: narrow.filePath }), []), { present: true, value: {} },
      '(beta-L1) and a fresh boot reads the same empty register');
    t.diagnostic(`FSC-P3 · FINDING (beta) RE-DERIVED AND ITS TWO CONSEQUENCES SPLIT. **The refusal's log carries NO `
      + `\`outcome\` entry on this arm** — the floor's branch does not fire, because \`D-118\` item 1 reads the `
      + `unreadable image as NO image at all and the regeneration takes the CREATION STATE — so \`PIN-14\` (ii)'s `
      + `"the only code that can reach here is \`JournalOpUnknown\`" is TRUE again, and the route's landings do NOT `
      + `stand (\`D-108\` item 2 holds). **AND THE ONE PRICE, PRINTED AND NOT ASSERTED AS BEHAVIOUR**: at `
      + `\`journalLength: 1\` the window has taken the ONLY record of the pre-call ["seed"] version, so the `
      + `creation-state base cannot reach it — measured, ["seed"] reads ${narrow.seed} after the call where it read `
      + `value "seed" before it, and the bytes read ${JSON.stringify(narrow.bytes)}. That is \`D-118\` item 4's named `
      + `cost (*"a store whose file was replaced by something that is not its image loses whatever the file held and `
      + `rebuilds from its creation state"*), and the row's quantifier does not carry the exception — the owner of `
      + `the sentence is the unit's declaration and not this file. At \`journalLength: 8\` the same arm keeps the `
      + `version and the whole predicate holds (bytes ${JSON.stringify(wide.bytes)}).`);
    rmSync(wide.dir, { recursive: true, force: true });
    rmSync(narrow.dir, { recursive: true, force: true });
  }

  t.diagnostic(`FSC-P3 · P-FSC-3 held over ${result.cases} generated cases, seed 0x${(result.seed >>> 0).toString(16)}: `
    + `arms ${JSON.stringify(result.arms)}. Every case read a BEFORE/AFTER census at its own landing addresses, at `
    + `their parents, and at addresses that stand at no tier; the refusal's own rank 19, its four-member plain form `
    + `and a byte-identical image are asserted at each (verification.md §4 P-FSC-3; D-107 items 1, 2 and 5; `
    + `D-108 item 2).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-FSC-4` — THE FOURTH ARM: THE REGENERATING REVERSAL RETURNS, AND THE FLOOR'S TOKEN HAS NO PRODUCER
// (`D-109` item 1's narrowing READ THROUGH `D-118` item 2 — the title's *"the narrowed floor is exact"* is
// re-derived with the limb it named, and the row's own identity `P-FSC-4` is unchanged)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('fsc_prop_P_FSC_4_the_regenerating_reversal_and_the_unreachable_floor', (t) => {
  // **PROPERTY (`verification.md §4`, `P-FSC-4`, quoted).** *"THE FOURTH ARM'S OWN PREDICATE (`D-108` item 1 and
  // `PIN-12` (iii)): for any reversal whose candidate set meets a compacted entry, after the call (a) the call
  // has RETURNED, (b) `read` at every address OUTSIDE the reversal's scope answers what it answered before
  // UNLESS the only record of that version is a marked entry, and (c) `read` at every address INSIDE the scope
  // answers the state the un-marked surviving entries describe from the creation floor"*. **And the row's second
  // limb is `D-109` item 1's narrowing READ THROUGH `D-118`**: the token's narrowed subject — *"a temporally-bounded
  // candidate set holding a compacted entry AND a `filePath` whose image cannot be read as an object"* — is the
  // arm `D-118` item 1 REMOVES, so what this cell reads is no longer an EXACTNESS claim about one producer but the
  // fact that `RollbackCompacted` has NO producer left (`D-118` item 2) and that an unreadable image is
  // **TREATED AS NO IMAGE AT ALL** — the same base as the zero-length file, and the same answer.
  //
  // **GENERATOR.** `12` cases under seed `0x5F1C04`: `journalLength` `1`–`4`; a reversed `file`-tier write at
  // `['a']`; `1`–`4` DISJOINT depth-1 keys whose `file`-tier versions are durable and outside the scope; **one
  // `mem`-tier version whose ONLY record the window marks** (`['n']`, written FIRST, with at least
  // `journalLength + 1` appends after it — the window marks the OLDEST unmarked entry per append, so the first
  // entry is marked once `journalLength + 1` entries have been appended over it); and **one `mem`-tier version
  // whose record stays un-marked** (`['m']`, appended last, which the window never marks because it marks the
  // oldest). **Limb (ii) enumerates EIGHT image states** — garbage, `null`, `5`, `[]`, `true`, `{}`, `{"a":1}` and
  // the zero-length file — each driven twice: over a candidate set holding a compacted entry, and over one that
  // does not.
  //
  // **FALSIFIER.** Any case where the call throws, where an out-of-scope durable version is ABSENT afterwards,
  // where an out-of-scope `mem` version with an un-marked record is absent, or where a version whose only record
  // a mark is (the swallowed `mem` version) is PRESENT — *"the cell that a pass that helpfully restored
  // everything would fail"*; and, for limb (ii), **any image state where the call does not RETURN, any arm on
  // which a token is answered at all, and any unreadable image whose answer differs from the zero-length file's**
  // (`D-118` item 1 reads the two as one state).
  const result = runProperty({
    row: 'verification.md §4 · P-FSC-4',
    seed: SEEDS['P-FSC-4'],
    cases: CASES['P-FSC-4'],
    body: (next, i, draw, arms) => {
      const journalLength = 1 + (i % 4);
      // AT LEAST `journalLength + 1` APPENDS AFTER THE SWALLOWED VERSION, so the window MUST have marked it.
      const outOfScope = Math.max(1, journalLength - 1) + (i % 2);
      const { dir, filePath } = scratch(`p4-${i}`);
      const store = make({ filePath, journalLength });
      Object.assign(draw, {
        journalLength,
        outOfScope,
        disjoint: Array.from({ length: outOfScope }, (_, k) => `d${k}`),
      });

      // ── THE JOURNAL THE REGENERATION MEETS, BUILT IN APPEND ORDER ────────────────────────────────────────
      store.write(['n'], 'mem', 'swallowed'); // THE SWALLOWED MEMORY-ONLY VERSION: the journal's FIRST entry
      store.write(['a'], 'file', 1);
      const reversed = store.write(['a'], 'file', 2);
      for (let k = 0; k < outOfScope; k += 1) store.write([`d${k}`], 'file', 10 + k);
      const appendsAfterTheSwallowed = 2 + outOfScope; // ['a']'s two writes and the disjoint keys
      assert.ok(appendsAfterTheSwallowed >= journalLength + 1,
        `P-FSC-4 ${JSON.stringify(draw)}: the drive must put the swallowed version beyond the window — `
          + `${appendsAfterTheSwallowed} appends follow it and the window is ${journalLength}`);
      const appendsBeforeTheReversal = 4 + outOfScope; // the three above, the disjoint keys, and ['m']

      const marking = attempt(() => store.rollback(reversed.op.opId)); // the plain walk, which MARKS its candidates
      assert.equal(marking.ok, true,
        `P-FSC-4 ${JSON.stringify(draw)}: the marking reversal must land: ${JSON.stringify(marking.caught?.status)}`);
      store.write(['m'], 'mem', 'kept'); // THE UN-MARKED MEMORY VERSION, out of scope: the window marks the OLDEST

      const probes = [['a'], ['n'], ['m'], ...Array.from({ length: outOfScope }, (_, k) => [`d${k}`])];
      const beforeCensus = census(store, probes);
      const mods = modState(filePath);

      // ── (a) THE CALL RETURNS, AND IT ANSWERS THE THREE DECLARED MEMBERS. ─────────────────────────────────
      const regenerating = attempt(() => store.rollback(reversed.op.opId));
      assert.equal(regenerating.ok, true,
        `P-FSC-4 ${JSON.stringify(draw)}: **THE CALL RETURNS AND DOES NOT THROW** — it answered \`RollbackCompacted\` `
          + `before this unit (\`D-108\` item 1): ${JSON.stringify(regenerating.caught?.status)}`);
      assert.deepEqual(Object.keys(regenerating.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
        `P-FSC-4 ${JSON.stringify(draw)}: the record is the three declared members; the regeneration mints no fourth `
          + `(\`PIN-13\` (iv))`);
      assert.deepEqual(regenerating.value.undoneOps, [reversed.op.opId],
        `P-FSC-4 ${JSON.stringify(draw)}: \`undoneOps\` names the reversed op`);

      // ── (b) OUTSIDE THE SCOPE: THE DURABLE VERSIONS STAND, THE SWALLOWED ONE IS LOST, THE UN-MARKED ONE STAYS.
      const fresh = make({ filePath });
      for (let k = 0; k < outOfScope; k += 1) {
        const address = [`d${k}`];
        const after = describeAnswer(answer(store, address));
        const before = beforeCensus.find((entry) => JSON.stringify(entry.address) === JSON.stringify(address)).answer;
        assert.equal(after, before,
          `P-FSC-4 ${JSON.stringify(draw)}: an OUT-OF-SCOPE DURABLE version answers what it answered before the `
            + `regeneration (\`PIN-12\` (ii); \`M-5\`/\`M-7\` unmoved) — at ${JSON.stringify(address)} it answered ${before} `
            + `before and ${after} after`);
        assert.deepEqual(answer(fresh, address), { present: true, value: 10 + k },
          `P-FSC-4 ${JSON.stringify(draw)}: and it still stands in the BYTES — a regeneration from the durable floor `
            + `ALONE would have dropped it`);
      }
      assert.deepEqual(answer(store, ['n']), { present: false },
        `P-FSC-4 ${JSON.stringify(draw)}: **THE SWALLOWED MEMORY-ONLY VERSION IS LOST** — its only record is a marked `
          + `entry, which \`PIN-12\` (iii) (b) excludes from the replay: read ${describeAnswer(answer(store, ['n']))}`);
      assert.deepEqual(answer(fresh, ['n']), { present: false },
        `P-FSC-4 ${JSON.stringify(draw)}: the bytes never carried it and a fresh boot does not read it`);
      assert.equal(bytesOf(filePath).includes('"n"'), false,
        `P-FSC-4 ${JSON.stringify(draw)}: and it is nowhere in the image: ${JSON.stringify(bytesOf(filePath))}`);
      assert.deepEqual(answer(store, ['m']), { present: true, value: 'kept' },
        `P-FSC-4 ${JSON.stringify(draw)}: **AN OUT-OF-SCOPE \`mem\` VERSION WHOSE RECORD IS UN-MARKED SURVIVES THE `
          + `REGENERATION** (\`PIN-12\` (ii); \`FSC-ARM4-REGEN-MEM\`) — the journal's own \`after\` re-instated it although `
          + `no file image ever carried it: read ${describeAnswer(answer(store, ['m']))}`);
      assert.deepEqual(answer(fresh, ['m']), { present: false },
        `P-FSC-4 ${JSON.stringify(draw)}: and the file does NOT gain it — a \`mem\`-tier version is never durable`);
      assert.equal(answer(store, ['m'], 'file').present, false,
        `P-FSC-4 ${JSON.stringify(draw)}: the store's own \`file\`-tier projection does not carry it either`);

      // ── (c) INSIDE THE SCOPE: THE REVERSED SUBTREE ANSWERS THE STATE ITS UN-MARKED SURVIVORS DESCRIBE. ─────
      assert.deepEqual(answer(store, ['a']), { present: true, value: 1 },
        `P-FSC-4 ${JSON.stringify(draw)}: the addressed subtree answers the last valid state — the state the reversed `
          + `op's own pre-state left (\`D-108\` item 1; \`FSC-ARM4-REGEN-FILE\`)`);
      assert.deepEqual(answer(fresh, ['a']), { present: true, value: 1 },
        `P-FSC-4 ${JSON.stringify(draw)}: and the save that follows the judgement carries it (a fresh boot reads it)`);

      // ── THE RECORD: NO ENTRY IS APPENDED AND NO `seq` IS STEPPED (`M-9`; `DD-30`). ────────────────────────
      const nextWrite = store.write(['e'], 'file', 7);
      assert.equal(nextWrite.op.seq, appendsBeforeTheReversal + 1,
        `P-FSC-4 ${JSON.stringify(draw)}: **NO JOURNAL ENTRY IS APPENDED** — the next write's \`seq\` must be exactly `
          + `${appendsBeforeTheReversal + 1}: the appends the drive made (the swallowed version, the two writes at `
          + `[a], the disjoint keys and [m]) plus one. It is ${nextWrite.op.seq}`);

      const serialized = moved(mods, modState(filePath));
      draw.serialized = serialized;
      tally(arms, `L${journalLength} · ${serialized ? 'serialized' : 'not-serialized'}`);
      rmSync(dir, { recursive: true, force: true });
    },
  });

  if (result.failures.length > 0) {
    t.diagnostic(`P-FSC-4 · THE GENERATED INPUTS THAT FAILED:\n${JSON.stringify(result.failures, null, 2)}`);
  }
  for (const window of [1, 2, 3, 4]) {
    assert.ok(Object.keys(result.arms).some((name) => name.startsWith(`L${window} `)),
      `P-FSC-4: the generator must reach \`journalLength: ${window}\` (read ${JSON.stringify(result.arms)})`);
  }
  assert.deepEqual(result.failures, [],
    `P-FSC-4 held over ${result.cases} generated cases (seed 0x${(result.seed >>> 0).toString(16)})`);

  // ── LIMB (ii) — **THE TOKEN IS UNREACHABLE ON EVERY STATE OF THE PATH, AND AN UNREADABLE IMAGE IS THE
  // CREATION STATE** (`D-118` items 1–2). ────────────────────────────────────────────────────────────────────
  //
  // **⟶ RE-DERIVED 2026-11-02. THE ARM CHANGED SIDES AND THE FAMILY DID NOT SHRINK.** `D-109` item 1 narrowed the
  // token to *"a temporally-bounded candidate set holding a compacted entry AND a `filePath` whose image cannot be
  // read as an object"*, and this limb measured that boundary from both sides. **`D-118` item 1 removes it**: the
  // unreadable image is *"treated as no image at all"* and the regeneration takes `Store::born`, exactly where no
  // path, no file or a zero-length file stands — **so the whole family is driven again, and what is asserted is
  // that (a) the call RETURNS on every member of it, (b) NO member answers a token at all,
  // `RollbackCompacted` or any other, and (c) the five unreadable images answer EXACTLY what the zero-length file
  // answers** — the *"as no image at all"* clause read as an equality of answers and not as a claim about code.
  // **The family keeps both of its old sides**: an unreachable token is shown unreachable over the five states
  // that used to fire, and the two readable images and the zero-length file stand beside them as they did.
  const IMAGE_STATES = [
    { bytes: 'this is not the register\'s image', readable: false },
    { bytes: 'null', readable: false },
    { bytes: '5', readable: false },
    { bytes: '[]', readable: false },
    { bytes: 'true', readable: false },
    { bytes: '{}', readable: true },
    { bytes: '{"a":1}', readable: true },
    { bytes: '', readable: 'empty' },
  ];
  const PROBES = [['a'], ['x'], ['y'], []];

  /** A store whose reversal's candidate set holds a compacted entry, plus a later op whose scope holds none. */
  function windowed(tag, journalLength, imageBytes) {
    const { dir, filePath } = scratch(tag);
    const store = make({ filePath, journalLength });
    store.write(['a'], 'file', 1);
    const reversed = store.write(['a'], 'file', 2);
    store.write(['x'], 'file', 9);
    const marking = attempt(() => store.rollback(reversed.op.opId));
    assert.equal(marking.ok, true, `the marking reversal must land: ${JSON.stringify(marking.caught?.status)}`);
    const later = store.write(['y'], 'file', 7);
    if (imageBytes !== null) writeFileSync(filePath, imageBytes);
    return { dir, filePath, store, reversed: reversed.op.opId, later: later.op.opId };
  }

  const readings = [];
  for (let at = 0; at < IMAGE_STATES.length; at += 1) {
    const state = IMAGE_STATES[at];
    const floored = windowed(`p4-narrow-${at}`, 2, state.bytes);
    const answerOnTheFloored = attempt(() => floored.store.rollback(floored.reversed));
    const plain = windowed(`p4-plain-${at}`, 2, state.bytes);
    const answerOnThePlain = attempt(() => plain.store.rollback(plain.later));
    const reading = {
      image: state.bytes,
      readable: state.readable,
      floored: answerOnTheFloored.ok ? 'returned' : answerOnTheFloored.caught.status,
      plain: answerOnThePlain.ok ? 'returned' : answerOnThePlain.caught.status,
      // **THE ANSWER ITSELF, READ AT THE SAME PROBES ON BOTH INSTANCES** — the acting store's memory, the bytes
      // the save left at the path, and a FRESH BOOT's answers over that path.
      memory: PROBES.map((address) => describeAnswer(answer(floored.store, address))),
      bytes: bytesOf(floored.filePath),
      boot: PROBES.map((address) => describeAnswer(answer(make({ filePath: floored.filePath }), address))),
    };
    readings.push(reading);

    // (1) **THE FLOORED CALL RETURNS ON EVERY STATE, AND THE TOKEN IS ANSWERED ON NONE.**
    assert.equal(answerOnTheFloored.ok, true,
      `P-FSC-4 (ii): **THE COMPACTED CANDIDATE SET RETURNS ON EVERY IMAGE STATE** (\`D-118\` item 1) — with the `
        + `image ${JSON.stringify(state.bytes)} the call answered `
        + `${JSON.stringify(answerOnTheFloored.caught?.status)}`);
    assert.deepEqual(Object.keys(answerOnTheFloored.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
      'P-FSC-4 (ii): and answers the three-member record');
    assert.deepEqual(answerOnTheFloored.value.undoneOps, [floored.reversed],
      'P-FSC-4 (ii): **AND THE REVERSAL IS PERFORMED** — `M-6`/`M-9` are unmoved: the walk undoes the op it was '
        + 'asked for, on every arm');
    assert.deepEqual(answerOnTheFloored.value.restoredTo, { present: true, value: 1 },
      'P-FSC-4 (ii): and it answers the reversed op\'s own pre-state');
    assert.notEqual(answerOnTheFloored.ok === false && answerOnTheFloored.caught.status === 'RollbackCompacted', true,
      `P-FSC-4 (ii): **\`RollbackCompacted\` HAS NO PRODUCER LEFT** (\`D-118\` item 2) — not on the image `
        + `${JSON.stringify(state.bytes)} over a candidate set that HOLDS a compacted entry, which is the one `
        + `state \`D-109\` item 1 left it`);

    // (2) **THE CORRUPT-IMAGE REBUILD IS NOT A LOSS THE STORE COULD HAVE AVOIDED, AND IS NOT AN ANSWER OF ITS
    // OWN**: the bytes are made READABLE by the save that follows, and a fresh boot reads what the store answers.
    if (state.bytes !== '') {
      assert.equal(reading.bytes.includes(state.bytes), false,
        `P-FSC-4 (ii): the fixture bytes ${JSON.stringify(state.bytes)} are not what stands at the path after the `
          + `call — the save that follows the judgement writes the store's own state `
          + `(${JSON.stringify(reading.bytes)})`);
    }
    assert.deepEqual(reading.boot, reading.memory,
      `P-FSC-4 (ii): **AND A FRESH BOOT OVER THAT PATH READS WHAT THE STORE STANDS AT** — `
        + `${JSON.stringify(reading.boot)} against the store's ${JSON.stringify(reading.memory)} `
        + `(\`D-118\` item 1's save; \`D-116\` item 3)`);

    // (3) THE CONTROL ARM: NO COMPACTED ENTRY IN THE CANDIDATE SET ⇒ NO IMAGE IS READ ⇒ THE CALL RETURNS.
    assert.equal(answerOnThePlain.ok, true,
      `P-FSC-4 (ii): a reversal whose candidate set holds NO compacted entry reads no image and must RETURN on every `
        + `state — with the image ${JSON.stringify(state.bytes)} it answered `
        + `${JSON.stringify(answerOnThePlain.caught?.status)}`);
    assert.notEqual(answerOnThePlain.value, null, 'P-FSC-4 (ii): and it answers its record');
    rmSync(floored.dir, { recursive: true, force: true });
    rmSync(plain.dir, { recursive: true, force: true });
  }

  // **THE WHOLE FAMILY, AS ONE READ** — every member returns, and no member answers a token:
  assert.deepEqual(readings.map((r) => r.floored),
    ['returned', 'returned', 'returned', 'returned', 'returned', 'returned', 'returned', 'returned'],
    `P-FSC-4 (ii): **THE TOKEN IS UNREACHABLE ON ALL EIGHT STATES OF THE PATH** (\`D-118\` item 2): ${JSON.stringify(readings.map((r) => [r.image, r.floored]))}`);
  assert.equal(readings.every((r) => r.plain === 'returned'), true,
    `P-FSC-4 (ii): and the control arm returned on every state: ${JSON.stringify(readings.map((r) => [r.image, r.plain]))}`);
  // **AND `D-118` ITEM 1's CLAUSE AS AN EQUALITY**: an unreadable image and a zero-length file are ONE state, so
  // the five unreadable arms answer EXACTLY what the zero-length arm answers — memory, bytes and boot alike.
  const emptyArm = readings.find((r) => r.readable === 'empty');
  for (const unreadable of readings.filter((r) => r.readable === false)) {
    assert.deepEqual({ memory: unreadable.memory, bytes: unreadable.bytes, boot: unreadable.boot },
      { memory: emptyArm.memory, bytes: emptyArm.bytes, boot: emptyArm.boot },
      `P-FSC-4 (ii): **A PRESENT IMAGE THE LOADER CANNOT READ IS TREATED AS NO IMAGE AT ALL** (\`D-118\` item 1) — `
        + `the image ${JSON.stringify(unreadable.image)} must answer what the zero-length file answers `
        + `(${JSON.stringify({ memory: emptyArm.memory, bytes: emptyArm.bytes })}), not `
        + `${JSON.stringify({ memory: unreadable.memory, bytes: unreadable.bytes })}`);
  }

  t.diagnostic(`FSC-P4 · P-FSC-4 held over ${result.cases} generated cases, seed 0x${(result.seed >>> 0).toString(16)}: `
    + `arms ${JSON.stringify(result.arms)}. The regenerating reversal RETURNED a three-member record, the disjoint `
    + `durable versions stood in memory AND in the bytes, the swallowed \`mem\` version stayed lost, the un-marked one `
    + `survived in memory alone, no entry was appended, and the \`seq\` the next write named was the appends' own `
    + `(verification.md §4 P-FSC-4; D-108 items 1–3; PIN-12 (ii)/(iii); PIN-13 (i)–(v)). Limb (ii), RE-DERIVED by `
    + `D-118: ${JSON.stringify(readings.map((r) => [r.image, r.floored, r.plain]))} — **every state of the path `
    + `RETURNS and NO state answers \`RollbackCompacted\`**, and the five unreadable images answer exactly what the `
    + `zero-length file answers (memory ${JSON.stringify(emptyArm.memory)}, bytes ${JSON.stringify(emptyArm.bytes)}), `
    + `which is \`D-118\` item 1's *"treated as no image at all"* measured as an equality.`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE REGISTER'S OWN CENSUS — A ROW THAT DID NOT RUN IS A FAILURE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════

test('fsc_register_census · four rows ran, each at its declared budget and under its pinned seed', () => {
  // **`un-run` IS A FAILURE** (`acceptance.md §4.4`'s rule, read at the register layer's own precedent): this cell
  // is the register's closure and it reads the four rows' own records, so a row deleted, renamed or skipped fails
  // here rather than leaving a row owed without a word.
  assert.deepEqual(ROW_RUNS.map((run) => run.row).sort(), [
    'verification.md §4 · P-FSC-1',
    'verification.md §4 · P-FSC-2',
    'verification.md §4 · P-FSC-3',
    'verification.md §4 · P-FSC-4',
  ], `the register carries exactly its four declared rows: ${JSON.stringify(ROW_RUNS)}`);
  assert.equal(ROW_RUNS.length, 4, 'and no row is run twice under one name');
  for (const run of ROW_RUNS) {
    const declared = Object.entries(CASES).find(([row]) => run.row.endsWith(row));
    assert.ok(declared, `the row's budget must be declared: ${run.row}`);
    assert.equal(run.cases, declared[1],
      `${run.row} must run its whole budget (${declared[1]}) — it ran ${run.cases}`);
    assert.equal(run.seed, SEEDS[declared[0]],
      `${run.row} must run under its pinned literal seed 0x${SEEDS[declared[0]].toString(16)}`);
    assert.equal(run.failures, 0, `${run.row} must hold over its whole budget`);
  }
  assert.equal(ATTEMPTS_TOTAL, 27 + 28 + 24 + 12,
    'the register\'s attempt total is the four rows\' budgets: 27 + 28 + 24 + 12 = 91');
});
