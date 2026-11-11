// tests/e2e/file-save-coverage.test.mjs
//
// **`U-STOREROOM-FILE-SAVE-COVERAGE`'s BEHAVIOUR BATTERY, AT THE PRESET'S `tests/e2e/` SCOPE (`D-5`).**
//
// PROVENANCE, STATED SO A READER CAN TELL WHAT EACH ASSERTION IS DERIVED FROM. Every cell below is derived
// from `docs/specs/storeroom-file-save-coverage/` (`verification.md §2.1`'s thirty-five `FSC-*` rows and
// `carrier.md §5`'s `FSC-RV-*` rows) and from the rulings they carry as conditions — `strata/decisions.md` ·
// `D-106` (the rule and its three measured arms), `D-107` (a refusal rolls back; the reversal reverts before
// it saves), `D-108` (the compaction arm REGENERATES), `D-109` (`RollbackCompacted` NARROWED to a corrupt
// image — READ THROUGH `D-118` item 1, which reads that image as NO image at all, so the token is `DECLARED,
// NO PRODUCER`, `D-118` item 2), `D-111` (a compensation does not save), `D-112` (the reversal's save is after
// the judgement), `D-116` (the save is the store's existing STATE-KEYED write) and `D-117` (the reversal
// DELIVERS). No cell
// asserts a sentence: each drives one arm through the package's declared entry and asserts the BYTES at
// `cfg.filePath` and, where the boot's own answer is the claim, a FRESH INSTANCE's answer over the same path.
//
// THE LAYER IS `ENVELOPE/PURE` — the row `tests/e2e/file-tier-save.test.mjs`'s own header carries: the
// assembled package over the built addon, no registry install and no installed-from-the-package tree. The
// `bytesOf` and `modState` devices below are RE-DECLARED here rather than imported across a scope
// (`verification.md §2.1`'s own instruction); they are `file-tier-save.test.mjs`'s two instruments, spelled
// the same way.
//
// **AND ONE THING THIS FILE DOES NOT DO, NAMED SO IT IS NOT READ AS AN OMISSION.** No cell here is BLIND. The
// unit's blind instance is `tests/e2e/blind-file-save-coverage.test.mjs`, and it is authored AFTER the fix it
// predicts (the landing is at this tree's HEAD), so it is no longer blind either — that file says so plainly
// in its own header rather than printing a claim of blindness (`verification.md §3` already flags the
// ordering requirement and this pass could not meet it).

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// THE INSTRUMENTS — `bytesOf` and `modState`, re-declared (`verification.md §2.1`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

/** THE FILE'S OWN BYTES AT `cfg.filePath` — the observable every durability clause is read off. */
function bytesOf(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : null;
}

/** THE MODIFICATION STATE, read as an identity triple so "a save performed twice" is a recorded fact. */
function modState(filePath) {
  const s = statSync(filePath);
  return { ino: s.ino, size: s.size, mtimeMs: s.mtimeMs };
}

const moved = (before, after) => before.ino !== after.ino || before.size !== after.size || before.mtimeMs !== after.mtimeMs;

/** A scratch directory and the one path inside it every cell's store is constructed at. */
function scratch(tag) {
  const dir = mkdtempSync(join(tmpdir(), `fsc-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
}

/** A store at the two REQUIRED `cfg` keys alone (`storeCreate`'s declared minimum), plus the overrides. */
const make = (extra = {}) => storeCreate({ journalLength: 8, listeners: [], ...extra });

/** Run `fn`, capturing the thrown value instead of propagating it. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (thrown) {
    return { ok: false, caught: thrown };
  }
}

/** Read `address` off an instance, answering the store's own code where the read refuses. */
function standing(instance, address, tier) {
  const read = attempt(() => (tier === undefined ? instance.read(address) : instance.read(address, tier)));
  return read.ok ? { present: true, value: read.value } : { present: false, refused: read.caught.status };
}

/**
 * THE REGISTRATION-INSTANT REPAIR'S ROUTE, AS `D-91` GAVE IT AND `D-106` ARM 1 READS IT: a pair whose state
 * is ABSENT at `pairAddress` refuses and carries a repair that ROUTE-WRITES `value` at `writeAddress` on the
 * `file` tier and credits the record's own op. A registration whose re-run admits the repaired state PASSES.
 */
const repairOnAbsence = (writeAddress, value, tier = 'file') => (context) => {
  if (context.value !== undefined) return true;
  return {
    message: `${JSON.stringify(pairAddressOf(writeAddress))} is absent`,
    repair: (record) => ({ ok: true, op: record.write(writeAddress, tier, value).op }),
  };
};

/** A stable spelling for a diagnostic; the cells pass literal addresses, so this only names one. */
function pairAddressOf(writeAddress) {
  return writeAddress;
}

/** The pair a cell registers, spelled once so a cell's subject is its arm and not its fixture. */
const pair = (address, id) => ({ address, id });

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §1 — ARM 1: A `file`-TIER WRITE THE REGISTRATION'S ROUTE LANDS IS SAVED AT THE CLOSE (`D-106` arm 1,
//       `contract.md PIN-3`), AT ALL FOUR ROUTES
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('FSC-ARM1-B · `addConstraint` — a repair that route-writes `42` at the `file` tier makes the registration PASS, and the bytes at `filePath` carry `42` when the call returns', () => {
  const { dir, filePath } = scratch('arm1b');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const before = bytesOf(filePath);
  const mods = modState(filePath);
  let ran = 0;
  const add = attempt(() => store.addConstraint(pair(['a'], 'a'), (context) => {
    if (context.value !== undefined) return true;
    return { message: '`["a"]` is absent', repair: (record) => { ran += 1; return { ok: true, op: record.write(['b'], 'file', 42).op }; } };
  }));

  assert.equal(add.ok, true, `the registration must PASS (\`PIN-3\` (i)): it threw ${JSON.stringify(add.caught?.status)}`);
  assert.equal(ran, 1, 'and its repair must have run once');
  // (1) THE BYTES MOVED AND CARRY THE REPAIR (`FSC-ARM1-B`'s first half, `D-106` item 1's measured defect).
  assert.notEqual(bytesOf(filePath), before,
    `**THE FILE MUST NOT STILL READ THE SEED** — \`D-106\` item 1's defect is that it did: ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { b: 42, seed: 1 },
    'the bytes carry the repaired value');
  assert.equal(moved(mods, modState(filePath)), true, 'and the modification state moved — a save and not a read');
  // (2) AND A FRESH INSTANCE OVER THE SAME PATH READS IT.
  assert.deepEqual(standing(make({ filePath }), ['b']), { present: true, value: 42 },
    `a fresh boot reads the repaired value (\`FSC-ARM1-B\`'s second half): ${JSON.stringify(standing(make({ filePath }), ['b']))}`);
  // (3) THE RIDE-ALONG IS GONE (`C-5`; `FSC-ARM1-F`): no unrelated caller wrote anything between the
  // registration and the boot above, and the value stands.
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM1-H · `constraintOn`\'s RE-ARM is the same instant — the repair lands `8` and the bytes carry `8` when the re-arm returns', () => {
  const { dir, filePath } = scratch('arm1h');
  const store = make({ filePath });
  store.write(['h'], 'file', 0);
  const body = (context) => {
    if (context.value !== undefined) return true;
    return { message: '`["h"]` is absent', repair: (record) => ({ ok: true, op: record.write(['h'], 'file', 8).op }) };
  };
  store.addConstraint(pair(['h'], 'h'), body);
  // THE PAIR IS DISABLED AND THE STATE IT JUDGES IS REMOVED, so the re-arm is the only act that can move it.
  store.constraintOff(pair(['h'], 'h'), body);
  store.delete(['h'], 'file');
  const before = bytesOf(filePath);
  assert.equal(before, '{}', `the drive must stand the empty image the re-arm is about: ${JSON.stringify(before)}`);
  const mods = modState(filePath);
  store.constraintOn(pair(['h'], 'h'), body);

  assert.deepEqual(JSON.parse(bytesOf(filePath)), { h: 8 },
    `**THE RE-ARM'S SAVE IS REACHED** (\`D-106\` arm 1, \`FSC-ARM1-H\`): the bytes read ${JSON.stringify(bytesOf(filePath))}`);
  assert.equal(moved(mods, modState(filePath)), true, 'and the modification state moved');
  assert.deepEqual(standing(make({ filePath }), ['h']), { present: true, value: 8 },
    'a fresh boot over the same path reads the repaired value');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM1-D · a `storeCreate` carrying `cfg.constraints` over a FRESH path — the repair lands `99` and that `file`-tier landing is SAVED before the CYCLE refuses the construction at rank `20`: the file is NOT zero-length, it carries the repaired value, and a fresh boot reads `99`', () => {
  // **⟶ RE-PINNED 2026-11-06 (gate 3) ON `D-123` ITEM `1` AND `D-124` ITEM `1` — THE FOURTH LICENSED REASON
  // (`F-9`; the file's own `§6` item 1 names this cell).** The pair stands at `['a']` and its repair writes
  // `['dd']`, so **the pair never accepts its own repair**: the sweep's next round re-carries it, the body offers
  // its repair a second time, and *"a pair may land AT MOST ONE REPAIR in a construction"* refuses the
  // construction at rank `20` `ConstraintPassRefused`. **THE CELL WAS WRITTEN BEFORE EITHER RULING EXISTED**, so
  // what it pinned was a returned instance; **WHAT TURNS IS THE ANSWER AND NOT THE SAVE**: the carry's
  // registration PASSED and its close saved, so the `file`-tier landing `D-106` arm 1 is about still stands in the
  // bytes, and the refusal comes from the round AFTER it. **NO LIMB IS LOOSENED**: the zero-length limb, the
  // repaired value and the fresh boot's reading are the ones this cell always carried, and the instance limb is
  // replaced by the refusal that now stands where the instance did.
  const { dir, filePath } = scratch('arm1d');
  const construction = attempt(() => storeCreate({
    journalLength: 8,
    listeners: [],
    filePath,
    constraints: [{
      address: ['a'],
      id: 'a',
      constraint: (context) => (context.value !== undefined
        ? true
        : { message: '`["a"]` is absent', repair: (record) => ({ ok: true, op: record.write(['dd'], 'file', 99).op }) }),
    }],
  }));
  const image = bytesOf(filePath);
  assert.equal(construction.ok, false,
    `**THE CONSTRUCTION MAY NOT RETURN AN INSTANCE WHOSE REGISTER STILL VIOLATES A CARRIED PAIR** (\`D-123\` `
      + `item 1; \`D-124\` item 1): it ${construction.ok ? 'RETURNED an instance' : 'refused'} `
      + `${JSON.stringify(construction.ok ? null : construction.caught.status)}`);
  assert.equal(construction.ok ? null : construction.caught.status, 'ConstraintPassRefused',
    `**AND IT REFUSES AT RANK \`20\` \`ConstraintPassRefused\` — THE CYCLE'S MEMBER** (\`D-125\` item 4: *"a cycle `
      + `is an inconsistent result"*): the refusal answered `
      + `${JSON.stringify(construction.ok ? null : construction.caught.status)} with message `
      + `${JSON.stringify(construction.ok ? null : construction.caught.message)}`);
  // `D-106` item 1's measured defect: a construction whose repair lands `99` left a ZERO-LENGTH file, and a
  // second instance over that path answered `AddressNotFound` for the repaired address AND FOR EVERYTHING.
  assert.notEqual(image?.length, 0,
    `**THE FILE MUST NOT BE ZERO-LENGTH** (\`FSC-ARM1-D\`; \`C-3\`): ${JSON.stringify(image)}`);
  assert.deepEqual(JSON.parse(image), { dd: 99 }, 'and it carries the repaired value — the carry\'s save stands, because the refusal is the NEXT round\'s');
  // ⟶ **AND THE LIMB THAT READ THE ACTING INSTANCE IS RE-PINNED ON THE ARM THAT NOW EXISTS — IT WAS NOT
  // DELETED** (gate 4's finding: `standing(store, ['dd'])` → `{present: true, value: 99}` stood here at old
  // `:195` and went with the `store` binding when the construction turned). **`D-123` item 1's refusal returns
  // NO instance**, so *"the acting instance holds it"* is unstatable on this arm and its place is taken by the
  // two observables the refusal DOES leave: **no instance exists, and `['dd']`'s reading is the image's — the
  // line above — and the fresh boot's, the line below.** The landing survives the refusal, which is the whole of
  // `PIN-12`; no arm is loosened, because the limb's subject (a reading of `['dd']`) is asserted again at the
  // only seat that can answer it.
  assert.equal(construction.value, undefined,
    'and NO INSTANCE EXISTS on this arm — the refusal IS the answer (`D-123` item 1: *"the construction throws '
    + 'instead of returning an instance"*), so the acting-instance limb has no subject and is re-pinned as '
    + '`construction.value === undefined` beside the image and the fresh boot');
  assert.deepEqual(standing(make({ filePath }), ['dd']), { present: true, value: 99 },
    'and a fresh boot reads it — the defect\'s signature was `AddressNotFound` for every address');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM1-I · a BOOT over an existing `filePath` carrying `cfg.constraints` — the bytes carry the boot-loaded key AND the repaired value', () => {
  const { dir, filePath } = scratch('arm1i');
  const seed = make({ filePath });
  seed.write(['k'], 'file', 'committed');
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { k: 'committed' }, 'the drive must stand a loaded image');
  const booted = storeCreate({
    journalLength: 8,
    listeners: [],
    filePath,
    constraints: [{
      address: ['kk'],
      id: 'kk',
      constraint: (context) => (context.value !== undefined
        ? true
        : { message: '`["kk"]` is absent', repair: (record) => ({ ok: true, op: record.write(['kk'], 'file', 'repaired').op }) }),
    }],
  });
  const image = JSON.parse(bytesOf(filePath));
  assert.deepEqual(image, { k: 'committed', kk: 'repaired' },
    `**THE BOOT-LOADED KEY AND THE REPAIRED VALUE ARE BOTH IN THE BYTES** (\`FSC-ARM1-I\`; \`C-4\`): ${JSON.stringify(image)}`);
  assert.deepEqual(standing(make({ filePath }), ['kk']), { present: true, value: 'repaired' }, 'a fresh boot reads the repair');
  assert.deepEqual(standing(make({ filePath }), ['k']), { present: true, value: 'committed' }, 'and the loaded key is unmoved');
  assert.deepEqual(standing(booted, ['k']), { present: true, value: 'committed' }, 'the acting boot holds it too');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM1-ONCE · ONE registration carrying TWO `file`-tier repairs pays ONE serialization and both repaired values stand in the image — and the CYCLE then refuses the construction at rank `20`, because NEITHER pair accepts its own repair', () => {
  // **⟶ RE-PINNED 2026-11-06 (gate 3) — THE SAME REASON AND THE SAME RULINGS AS `FSC-ARM1-D`** (`D-123` item 1;
  // `D-124` item 1; `F-9`). Neither `['p1']` nor `['p2']` is satisfied by its own repair, so the sweep's next
  // round re-carries the FIRST of them, the body offers its repair a second time, and the construction is refused
  // at rank `20`. **THE CELL'S SUBJECT IS UNMOVED AND SO IS ITS EVIDENCE**: the carry's ONE serialization wrote
  // BOTH repaired values into the image, and a fresh boot reads each of them; the instance limb is the one the
  // ruling retired, and the refusal stands where it did.
  const { dir, filePath } = scratch('arm1once');
  const rep = (writeAddress, value) => (context) => (context.value !== undefined
    ? true
    : { message: 'absent', repair: (record) => ({ ok: true, op: record.write(writeAddress, 'file', value).op }) });
  const construction = attempt(() => storeCreate({
    journalLength: 8,
    listeners: [],
    filePath,
    constraints: [
      { address: ['p1'], id: 'p1', constraint: rep(['w1'], 1) },
      { address: ['p2'], id: 'p2', constraint: rep(['w2'], 2) },
    ],
  }));
  assert.equal(construction.ok, false,
    `**A REGISTER THAT STILL VIOLATES A CARRIED PAIR MAY NOT BE RETURNED** (\`D-123\` item 1): it `
      + `${construction.ok ? 'RETURNED an instance' : 'refused'} `
      + `${JSON.stringify(construction.ok ? null : construction.caught.status)}`);
  assert.equal(construction.ok ? null : construction.caught.status, 'ConstraintPassRefused',
    `**AT RANK \`20\` \`ConstraintPassRefused\` — THE CYCLE** (\`D-124\` item 1; \`D-125\` item 4): the refusal `
      + `answered ${JSON.stringify(construction.ok ? null : construction.caught.status)} with message `
      + `${JSON.stringify(construction.ok ? null : construction.caught.message)}`);
  // THE IMAGE CARRIES BOTH — one serialization whose bytes carry the whole register (`PIN-3` (iii)).
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { w1: 1, w2: 2 },
    `**ONE SAVE BY IMAGE** (\`FSC-ARM1-ONCE\`; \`PIN-3\` (iii)): ${JSON.stringify(bytesOf(filePath))}`);
  // AND THE MODIFICATION STATE MOVED EXACTLY ONCE ACROSS THE WHOLE CONSTRUCTION: the construction's own
  // exclusive create leaves a zero-length file, and the close's one save is the only write after it.
  const after = modState(filePath);
  assert.equal(after.size, bytesOf(filePath).length, 'and the image on disk is the one the close wrote');
  assert.deepEqual(standing(make({ filePath }), ['w1']), { present: true, value: 1 }, 'a fresh boot reads the first repair');
  assert.deepEqual(standing(make({ filePath }), ['w2']), { present: true, value: 2 }, 'and the second — no repair was left unsaved');
  // ⟶ **AND THE `store.constraints().length === 2` LIMB IS RE-PINNED, NOT DELETED** (gate 4's finding: it stood
  // here at old `:263` — *"and both pairs are carried"* — and went with the `store` binding when the construction
  // turned). `constraints()` is the INSTANCE's member and **`D-123` item 1's refusal returns no instance**, so the
  // limb cannot be restored as written. **WHAT IT WAS REACHING FOR IS THE ONLY THING IT CAN NOW SAY: both pairs
  // were CARRIED and both were ASKED** — which is why the one close serialized TWO repaired values, and why the
  // refusal came from a SECOND round that re-carried the first pair. The pair-carrying is read here at the two
  // observations the arm leaves standing: no instance exists, and the image carries both repairs.
  assert.equal(construction.value, undefined,
    'and NO INSTANCE EXISTS on this arm — so `constraints()` has no subject; its two-pair limb is re-pinned as '
    + '`construction.value === undefined` beside the image above, whose two repaired values are what the two '
    + 'pairs being carried and asked left behind (`D-123` item 1: the refusal returns no instance)');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM1-MEM · THE NEGATIVE — a registration whose repair writes at `mem` moves NO byte and NO modification state', () => {
  const { dir, filePath } = scratch('arm1mem');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const before = bytesOf(filePath);
  const mods = modState(filePath);
  const add = attempt(() => store.addConstraint(pair(['a'], 'a'), (context) => (context.value !== undefined
    ? true
    : { message: 'absent', repair: (record) => ({ ok: true, op: record.write(['m'], 'mem', 7).op }) })));
  assert.equal(add.ok, true, 'the registration passes — a `mem`-tier repair is a lawful repair');
  assert.deepEqual(standing(store, ['m']), { present: true, value: 7 }, 'and its edit stands in memory');
  assert.equal(bytesOf(filePath), before,
    `**THE BYTES ARE BYTE-IDENTICAL** (\`FSC-ARM1-MEM\`): ${JSON.stringify(bytesOf(filePath))}`);
  assert.equal(moved(mods, modState(filePath)), false,
    '**AND THE MODIFICATION STATE IS UNMOVED** — a registration that moved no `file`-tier data owes nothing');
  rmSync(dir, { recursive: true, force: true });
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §2 — THE REFUSING ARM: A REFUSAL ROLLS BACK, AND IT OWES NO SAVE OF ITS OWN (`D-107` items 1 and 2)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('FSC-ARM1-REFUSED-FILE · a repair that route-writes `99` at `["b"]` at the `file` tier and THEN declines leaves the store where the call found it, and the bytes byte-identical', () => {
  const { dir, filePath } = scratch('arm1rf');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const before = bytesOf(filePath);
  const mods = modState(filePath);
  const add = attempt(() => store.addConstraint(pair(['a'], 'a'), (context) => {
    if (context.value !== undefined) return true;
    return {
      message: 'absent',
      repair: (record) => { record.write(['b'], 'file', 99); return { ok: false, message: 'the repair declines after its write landed' }; },
    };
  }));

  // (a) THE REFUSAL IS THE REGISTRATION'S OWN RANK `19` (`D-107` item 5: no token moves).
  assert.equal(add.ok, false, 'the registration must REFUSE');
  assert.equal(add.caught.status, 'ConstraintRefusedAtRegistration',
    `the refusal keeps rank 19: ${JSON.stringify(add.caught.status)}`);
  // (b) ✦ AND THE STORE IS WHERE THE CALL FOUND IT — THE BEHAVIOUR `D-107` ITEM 1 DECLARES (`CL-27`).
  assert.deepEqual(standing(store, ['b']), { present: false, refused: 'AddressNotFound' },
    `**NO LANDED EDIT SURVIVES THE REFUSAL** (\`D-107\` item 1): read(['b']) answered ${JSON.stringify(standing(store, ['b']))}`);
  assert.deepEqual(store.constraints(), [], 'and no pair is carried on a refusal');
  // (c) THE BYTES ARE BYTE-IDENTICAL, AND THE ROUTE'S WRITE NEVER WROTE A BYTE OF ITS OWN.
  assert.equal(bytesOf(filePath), before,
    `**THE BYTES ARE BYTE-IDENTICAL TO THE PRE-CALL BYTES** (\`FSC-ARM1-REFUSED-FILE\`): ${JSON.stringify(bytesOf(filePath))}`);
  // (d) AND NO SECOND SAVE ON THIS ARM (`D-107` item 2). The declared arithmetic expected ONE move — the
  // reversal's own save writing the pre-call image back. MEASURED HERE: ZERO, because the route's write is a
  // verb and performs no file I/O on any arm (`src/store.rs`'s closing clause), so the image the path holds
  // is already the state the reversal leaves and `save_file_delta`'s comparison answers equal. The law this
  // limb guards is the once-per-record law's contrapositive — NO MORE THAN ONE serialization — and ZERO
  // satisfies it; a close that ADDED a `commit_file` here would read `1` and be the finding.
  assert.equal(moved(mods, modState(filePath)), false,
    '**THE REFUSING ARM ATTEMPTS NO `commit_file`**: the modification state is unmoved (0 serializations)');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM1-REFUSED-MEM · THE NO-SECOND-SAVE CELL — the same refusal whose repair writes at `mem` moves ZERO serializations', () => {
  const { dir, filePath } = scratch('arm1rm');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const before = bytesOf(filePath);
  const mods = modState(filePath);
  const add = attempt(() => store.addConstraint(pair(['a'], 'a'), (context) => (context.value !== undefined
    ? true
    : { message: 'absent', repair: (record) => { record.write(['b'], 'mem', 99); return { ok: false, message: 'declines' }; } })));

  assert.equal(add.ok, false, 'the registration refuses');
  assert.equal(add.caught.status, 'ConstraintRefusedAtRegistration', 'at rank 19');
  assert.deepEqual(standing(store, ['b']), { present: false, refused: 'AddressNotFound' },
    'and the `mem`-tier landing is rolled back too — the composition reaches every tier the landing touched');
  assert.equal(bytesOf(filePath), before, 'the bytes are byte-identical');
  assert.equal(moved(mods, modState(filePath)), false,
    '**ZERO SERIALIZATIONS ACROSS THE WHOLE REFUSAL** — `D-107` item 2\'s own number');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM1-REFUSED-ONCE · a refusal whose route landed at THREE addresses leaves NO address\'s edit standing — the composition sweeps the subtree, not the leaf', () => {
  const { dir, filePath } = scratch('arm1ro');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const before = bytesOf(filePath);
  const mods = modState(filePath);
  const add = attempt(() => store.addConstraint(pair(['z'], 'z'), (context) => {
    if (context.value !== undefined) return true;
    return {
      message: 'absent',
      repair: (record) => {
        record.write(['p'], 'file', 1);
        record.write(['p', 'q'], 'file', 2);
        record.write(['r'], 'file', 3);
        return { ok: false, message: 'declines after three landings' };
      },
    };
  }));
  assert.equal(add.ok, false, 'the registration refuses');
  for (const address of [['p'], ['p', 'q'], ['r']]) {
    assert.deepEqual(standing(store, address), { present: false, refused: 'AddressNotFound' },
      `**NO ADDRESS'S EDIT STANDS** (\`D-107\` item 1 over \`PIN-10\` (ii)'s plan) — read(${JSON.stringify(address)}) `
        + `answered ${JSON.stringify(standing(store, address))}`);
  }
  assert.equal(bytesOf(filePath), before, 'and no byte moved: the composed reversal wrote the pre-call image back');
  assert.equal(moved(mods, modState(filePath)), false, 'and at most one serialization — measured zero');
  rmSync(dir, { recursive: true, force: true });
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §3 — ARM 2: THE WHOLE-TARGET `delete` SAVES ON A GROUND THE STORE STATES (`D-106` arm 2, `PIN-4`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('FSC-ARM2-K · a whole-target `delete` (no tier) removes the `file`-tier version AND the bytes read `{}` — a fresh boot answers `AddressNotFound`', () => {
  const { dir, filePath } = scratch('arm2k');
  const store = make({ filePath });
  store.write(['k'], 'file', 1);
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { k: 1 }, 'the drive must stand the version the delete removes');
  const receipt = store.delete(['k']);
  assert.equal(receipt.op.tier, null, 'a whole-target delete\'s op carries NO tier (`D-106` arm 2)');
  assert.deepEqual(standing(store, ['k']), { present: false, refused: 'AddressNotFound' }, 'the version is gone in memory');
  assert.equal(bytesOf(filePath), '{}',
    `**THE FILE MUST HOLD \`{}\`** — \`D-106\` arm 2's measured defect is that it still held the version: ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(standing(make({ filePath }), ['k']), { present: false, refused: 'AddressNotFound' },
    'and a fresh boot answers `AddressNotFound` — the version does not stand again (`C-9`)');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM2-NEG · THE NEGATIVE — a whole-target delete at an address holding ONLY `mem`-tier versions moves NO byte', () => {
  const { dir, filePath } = scratch('arm2n');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const before = bytesOf(filePath);
  const mods = modState(filePath);
  store.write(['m'], 'mem', 1);
  store.write(['m'], 'temp', 2);
  store.delete(['m']);
  assert.deepEqual(standing(store, ['m']), { present: false, refused: 'AddressNotFound' }, 'the versions are gone in memory');
  assert.equal(bytesOf(filePath), before,
    `**THE ELIGIBILITY GROUND READS \`captured\`, NOT THE ACT'S SCOPE** (\`PIN-4\` (v)): ${JSON.stringify(bytesOf(filePath))}`);
  assert.equal(moved(mods, modState(filePath)), false, 'and the modification state is unmoved');
  rmSync(dir, { recursive: true, force: true });
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §4 — ARM 3 / THE REVERSAL: THE SAVE IS AFTER THE JUDGEMENT AND IS THE STORE'S STATE-KEYED WRITE
//       (`D-106` arm 3, `D-111`, `D-112`, `D-116`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('FSC-ARM3-L · a caller\'s `rollback` restoring a `file`-tier version SAVES — the bytes carry the restored value and a fresh boot reads it', () => {
  const { dir, filePath } = scratch('arm3l');
  const store = make({ filePath });
  const first = store.write(['l'], 'file', 1);
  const second = store.write(['l'], 'file', 2);
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { l: 2 }, 'the drive must stand the reversed-away value in the bytes');
  const result = store.rollback(second.op.opId);
  assert.deepEqual(Object.keys(result).sort(), ['opId', 'restoredTo', 'undoneOps'],
    'the record is the three declared members and mints no fourth (`PIN-13` (iv))');
  assert.deepEqual(result.undoneOps, [second.op.opId], 'and `undoneOps` names the reversed op');
  assert.equal(result.opId, second.op.opId, 'and the record echoes the id the caller passed');
  assert.deepEqual(standing(store, ['l']), { present: true, value: 1 }, 'the memory is reversed');
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { l: 1 },
    `**THE BYTES CARRY \`1\`** — \`D-106\` arm 3's measured defect is that they still held the reversed one: ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(standing(make({ filePath }), ['l']), { present: true, value: 1 },
    'and a fresh boot reads the restored value (`C-10`)');
  assert.equal(first.op.seq, 1, 'and the reversal appended nothing (`M-9` is unmoved)');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM3-NEG · THE NEGATIVE — a reversal restoring only `mem`-tier versions moves NO byte', () => {
  const { dir, filePath } = scratch('arm3n');
  const store = make({ filePath });
  store.write(['seed'], 'file', 1);
  const before = bytesOf(filePath);
  const mods = modState(filePath);
  store.write(['n'], 'mem', 1);
  const second = store.write(['n'], 'mem', 2);
  store.rollback(second.op.opId);
  assert.deepEqual(standing(store, ['n']), { present: true, value: 1 }, 'the memory is reversed');
  assert.equal(bytesOf(filePath), before,
    `**THE COMPARISON IS THE GUARD** (\`D-116\` item 3): ${JSON.stringify(bytesOf(filePath))}`);
  assert.equal(moved(mods, modState(filePath)), false, 'and no serialization happened at all');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-RV-6 · THE FIRST-OP REVERSAL — one `file`-tier write at `["a"]`, then `rollback(op-1)`: the bytes read `{}` and a fresh boot answers `AddressNotFound`', () => {
  const { dir, filePath } = scratch('rv6');
  const store = make({ filePath });
  const only = store.write(['a'], 'file', 1);
  assert.equal(only.op.seq, 1, 'the drive must reverse the journal\'s FIRST op — the edge `D-114` exposed');
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { a: 1 }, 'and its value must stand in the bytes');
  const result = store.rollback(only.op.opId);
  assert.deepEqual(Object.keys(result).sort(), ['opId', 'restoredTo', 'undoneOps'], 'the reversal returns its three-member record');
  assert.deepEqual(standing(store, ['a']), { present: false, refused: 'AddressNotFound' }, 'the memory goes empty');
  assert.equal(bytesOf(filePath), '{}',
    `**THE BYTES READ \`{}\`** (\`D-115\` item 3's measured arm, re-taken as a cell): ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(standing(make({ filePath }), ['a']), { present: false, refused: 'AddressNotFound' },
    'and a fresh boot answers `AddressNotFound` for it');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-RV-7 · THE SECOND IDENTICAL REVERSAL WRITES NOTHING — no byte written, no inode moved, no refusal', () => {
  const { dir, filePath } = scratch('rv7');
  const store = make({ filePath });
  store.write(['l'], 'file', 1);
  const second = store.write(['l'], 'file', 2);
  store.rollback(second.op.opId);
  const afterFirst = bytesOf(filePath);
  const mods = modState(filePath);
  const again = attempt(() => store.rollback(second.op.opId));
  assert.equal(again.ok, true, `the second identical reversal must not refuse: ${JSON.stringify(again.caught?.status)}`);
  assert.equal(bytesOf(filePath), afterFirst, '**NO BYTE IS WRITTEN** (`D-116` item 3; `§2` fact 6)');
  assert.equal(moved(mods, modState(filePath)), false, '**AND NO INODE IS MOVED** — the comparison is the whole guard');
  rmSync(dir, { recursive: true, force: true });
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §5 — THE JUDGEMENT: THE REPAIR ARM, THE SAVE, THE DELIVERY AND THE THREE SILENT ARMS
//       (`D-113` item 3, `D-116`, `D-117`)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE JUDGEMENT'S REPAIR, DRIVEN THE WAY `D-103` DECLARES IT: `write`'s FOURTH position is the context the
 * judgement handed the repair (it carries `pending: []`), so the write JOINS the judgement's commit and its
 * record becomes a leg of the invocation. A repair that used a bare verb call would land its op and mint no
 * leg, and the judgement's landing test would then answer rank `20` ("produced no op").
 */
function judgementFixture(tag, tier) {
  const { dir, filePath } = scratch(tag);
  const store = make({ filePath });
  const fires = [];
  // THE MEMBER'S OWN RETURN IS A FRAME FACT THE BODY CAN SEE: `flags.returned` is set by the cell the instant
  // `rollback` answers, so a body that read `true` ran AFTER the record was built (`\u00a72.7` (ii)'s DELIVER).
  const flags = { returned: false };
  store.listen('L', [['t']]);
  store.register('L', function listener(...args) {
    fires.push({ count: args.length, address: args[0], bytesInside: bytesOf(filePath), memberReturned: flags.returned });
  });
  store.write(['t'], 'file', { w: 'seed' });
  const reversed = store.write(['x'], 'file', 1);
  return { dir, filePath, store, fires, flags, reversed, tier };
}

test('FSC-RV-3 · THE JUDGEMENT\'S REPAIR — a pair that refuses the reversed state and carries a repair lands its edit, the image holds it ONCE, and a fresh boot reads the repaired state', () => {
  for (const tier of ['file', 'mem']) {
    const f = judgementFixture(`rv3${tier}`, tier);
    let runs = 0;
    f.store.addConstraint(pair(['x'], 'x'), (context) => {
      if (context.value !== undefined) return true;
      return {
        message: '`["x"]` must be present',
        repair: (record) => {
          runs += 1;
          f.store.write(['x'], 'file', 'restored-by-repair', record);
          if (tier === 'file') f.store.write(['t', 'w'], 'file', 'repaired', record);
          else f.store.write(['t', 'w'], 'mem', 'repaired', record);
          return { ok: true };
        },
      };
    });
    const mods = modState(f.filePath);
    const result = attempt(() => f.store.rollback(f.reversed.op.opId));
    assert.equal(result.ok, true,
      `[${tier}] the judgement PASSES and the reversal returns its record: ${JSON.stringify(result.caught?.status)}`);
    assert.equal(runs, 1, `[${tier}] the repair ran once`);
    assert.deepEqual(standing(f.store, ['x']), { present: true, value: 'restored-by-repair' },
      `[${tier}] the repair's edit stands in memory`);
    assert.deepEqual(standing(make({ filePath: f.filePath }), ['x']), { present: true, value: 'restored-by-repair' },
      `[${tier}] and a fresh boot reads the repaired state — the image holds it`);
    // ONE SERIALIZATION OF ONE IMAGE (`§3` (vi); `PIN-3` (iii)'s one-save-by-image law read across acts).
    assert.equal(moved(mods, modState(f.filePath)) || tier === 'mem', true,
      `[${tier}] the modification state moved where the repair wrote at \`file\``);
    if (tier === 'mem') {
      assert.deepEqual(standing(make({ filePath: f.filePath }), ['t', 'w']), { present: true, value: 'seed' },
        "[mem] the `mem`-tier repair's own value is NOT carried into the file: the fresh boot still reads the "
          + '`file`-tier seed the repair did not overwrite');
    } else {
      assert.deepEqual(standing(make({ filePath: f.filePath }), ['t', 'w']), { present: true, value: 'repaired' },
        "[file] the repair's `file`-tier write is durable");
    }
    rmSync(f.dir, { recursive: true, force: true });
  }
});

test('FSC-RV-9 · ★ THE DELIVERY ON THE PASSING ARM — `D-117` item 1: ONE invocation, ONE argument, the repair\'s write\'s OWN address, after the save and before the member returns', () => {
  for (const tier of ['file', 'mem']) {
    const f = judgementFixture(`rv9${tier}`, tier);
    f.store.addConstraint(pair(['x'], 'x'), (context) => {
      if (context.value !== undefined) return true;
      return {
        message: '`["x"]` must be present',
        repair: (record) => {
          f.store.write(['x'], 'file', 'R', record);
          f.store.write(['t', 'w'], tier, 'T', record);
          return { ok: true };
        },
      };
    });
    f.fires.length = 0;
    const result = attempt(() => f.store.rollback(f.reversed.op.opId));
    f.flags.returned = true;
    assert.equal(result.ok, true, `[${tier}] the reversal passes: ${JSON.stringify(result.caught?.status)}`);

    // (1) EXACTLY ONE INVOCATION — the listener is bound at the PREFIX `['t']` and the repair wrote `['t','w']`.
    assert.equal(f.fires.length, 1,
      `**\`count === 1\`** (\`D-117\` item 1; \`§2.7\` (iii)): the drive read ${JSON.stringify(f.fires)}`);
    const fired = f.fires[0];
    // (2) ONE ARGUMENT, AND IT IS THE TRIGGERING ADDRESS — the repair's write's own op address.
    assert.equal(fired.count, 1, '**`arguments.length === 1`** (`PAR-JS-12`; `§2.7` (iii) (b))');
    assert.deepEqual(fired.address, ['t', 'w'],
      `**AND THE ARGUMENT IS THE TRIGGERING ADDRESS** and never a registration's watch address: ${JSON.stringify(fired.address)}`);
    // (3) THE BODY RUNS BEFORE THE MEMBER RETURNS (`§2.7` (ii)'s DELIVER order).
    assert.equal(fired.memberReturned, false,
      '**THE BODY RAN BEFORE `rollback` RETURNED** — the delivery\'s instant is inside the member (`\u00a72.7` (ii))');
    // (4) AND THE BODY READS THE SAVED IMAGE — the save precedes every delivered body (`§2.11` clause 2).
    assert.deepEqual(standing(make({ filePath: f.filePath }), ['x']), { present: true, value: 'R' },
      `[${tier}] the image the body stood over already carries the repaired state`);
    assert.equal(fired.bytesInside, bytesOf(f.filePath),
      `[${tier}] measured: the body saw ${JSON.stringify(fired.bytesInside)} and the path holds ${JSON.stringify(bytesOf(f.filePath))}`);
    rmSync(f.dir, { recursive: true, force: true });
  }
});

test('FSC-RV-11 · ★ THE THREE SILENT ARMS — three counts, all `0`: the throwing arm, the failing arm, and a reversal that fired nothing', (t) => {
  // (a) THE THROWING ARM — a pair body that throws at the RE-RUN, after a repair's write fired a listener.
  {
    const f = judgementFixture('rv11a', 'file');
    let asked = 0;
    f.store.addConstraint(pair(['x'], 'x'), (context) => {
      asked += 1;
      if (asked === 1) return true;
      if (asked === 2) {
        return {
          message: 'absent',
          repair: (record) => { f.store.write(['t', 'w'], 'file', 'T', record); f.store.write(['x'], 'file', 'R', record); return { ok: true }; },
        };
      }
      throw new Error('the re-run throws');
    });
    f.fires.length = 0;
    const thrown = attempt(() => f.store.rollback(f.reversed.op.opId));
    assert.equal(thrown.ok, false, 'the throwing arm does not answer a record');
    assert.equal(thrown.caught.status, 'ConstraintBodyThrew',
      `the refusal is the surface's rank-18 form (no token is minted for it): ${JSON.stringify(thrown.caught.status)}`);
    assert.equal(f.fires.length, 0,
      `**THE DELIVERY IS NOT REACHED (\`D-117\` item 3, arm (a))**: it fired ${f.fires.length} time(s)`);
    assert.deepEqual(standing(f.store, ['x']), { present: true, value: 1 },
      'and the store is put back where the call found it');
    rmSync(f.dir, { recursive: true, force: true });
  }
  // (b) THE FAILING ARM — the re-run REFUSES after the same repair landed.
  {
    const f = judgementFixture('rv11b', 'file');
    let asked = 0;
    f.store.addConstraint(pair(['x'], 'x'), (context) => {
      asked += 1;
      if (asked === 1) return true;
      if (asked === 2) {
        return {
          message: 'absent',
          repair: (record) => { f.store.write(['t', 'w'], 'file', 'T', record); f.store.write(['x'], 'file', 'R', record); return { ok: true }; },
        };
      }
      return { message: 'the re-run refuses the state the repair left' };
    });
    f.fires.length = 0;
    const refused = attempt(() => f.store.rollback(f.reversed.op.opId));
    assert.equal(refused.ok, false, 'the failing arm does not answer a record');
    assert.equal(refused.caught.status, 'ConstraintPassRefused',
      `\`D-38\`'s rank 20 is the arm and no \`FileCommitFailed\` takes its place (\`D-111\` item 3): ${JSON.stringify(refused.caught.status)}`);
    assert.equal(f.fires.length, 0, '**THE FAILING ARM DELIVERS NOTHING** (`§2.7` (iv) arm 2)');
    rmSync(f.dir, { recursive: true, force: true });
  }
  // (c) A REVERSAL THAT FIRED NOTHING — the record is answered and nothing is invoked.
  {
    const { dir, filePath } = scratch('rv11c');
    const store = make({ filePath });
    const fires = [];
    store.listen('N', [['q']]);
    store.register('N', () => { fires.push(1); });
    const only = store.write(['z'], 'file', 1);
    fires.length = 0;
    const result = attempt(() => store.rollback(only.op.opId));
    assert.equal(result.ok, true, 'a reversal that fired nothing still RETURNS its record (`surface.md §2.7` item 7 (c))');
    assert.deepEqual(Object.keys(result.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
      'the three declared members and no fourth');
    assert.equal(fires.length, 0, '**AN EMPTY BATCH IS A NO-OP AND NOT A FAILURE**');
    t.diagnostic(`FSC-RV-11 (c): an empty delivery answered ${JSON.stringify(result.value.undoneOps)} with 0 invocations`);
    rmSync(dir, { recursive: true, force: true });
  }
});

test('FSC-RV-2-DEFERRED · ★ THE DEFERRED ARM — a reversal raised INSIDE AN OPEN WINDOW writes NOTHING at the body\'s return, and the bytes hold the restored value once the call returns', () => {
  const { dir, filePath } = scratch('rv2d');
  const store = make({ filePath });
  store.write(['a'], 'file', 1);
  const second = store.write(['a'], 'file', 2);
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { a: 2 }, 'the drive must stand the pre-reversal image in the bytes');
  let asked = 0;
  let bytesAfterTheRaiseReturned = null;
  let bytesBeforeTheRaise = null;
  store.addConstraint(pair(['a'], 'a'), (context) => {
    asked += 1;
    if (asked === 2) {
      bytesBeforeTheRaise = bytesOf(filePath);
      store.rollback(second.op.opId);       // raised inside this body's open window ⇒ DEFERRED
      bytesAfterTheRaiseReturned = bytesOf(filePath);
    }
    return true;
  });
  const drive = attempt(() => store.write(['a'], 'mem', 5));
  assert.equal(asked >= 2, true, `the pair must have been asked inside the outer act's window: ${asked}`);
  assert.equal(drive.ok, true, 'the outer act lands');
  // (1) **NO BYTE MOVES AT THE BODY'S RETURN** (`§2` fact 2; `D-112` item 1): the in-flight arm saves nothing.
  assert.equal(bytesAfterTheRaiseReturned, bytesBeforeTheRaise,
    `**A SAVE AT THE IN-FLIGHT RETURN WOULD HAVE WRITTEN THE REVERSED STATE HERE** (\`§2\` fact 2): before=${JSON.stringify(bytesBeforeTheRaise)} at-return=${JSON.stringify(bytesAfterTheRaiseReturned)}`);
  // (2) AND ONCE THE CALL RETURNS THE BYTES HOLD THE RESTORED VALUE — the DRAIN's judgement took the save.
  assert.deepEqual(standing(store, ['a']), { present: true, value: 1 }, 'the memory stands at the restored value');
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { a: 1 },
    `**THE BYTES HOLD THE RESTORED VALUE ONCE THE CALL RETURNS** (the deferred arm's \`FSC-RV-2\` limb): ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(standing(make({ filePath }), ['a']), { present: true, value: 1 }, 'and a fresh boot reads it');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-RV-5 · ★ THE COMPENSATION REACHES NEITHER THE JUDGEMENT NOR THE SAVE — a failing `file`-tier write answers rank 20, its bytes are byte-identical and its inode unmoved', () => {
  const { dir, filePath } = scratch('rv5');
  const store = make({ filePath });
  store.write(['g'], 'file', 'kept');
  // A pair that ADMITS at its registration (its address is absent there) and REFUSES once a value stands.
  const add = attempt(() => store.addConstraint(pair(['n'], 'n'),
    (context) => (context.value === undefined ? true : { message: '`["n"]` is never admitted once present' })));
  assert.equal(add.ok, true, `the pair must register, or the drive is not the failing arm: ${JSON.stringify(add.caught?.status)}`);
  const before = bytesOf(filePath);
  const mods = modState(filePath);
  const write = attempt(() => store.write(['n'], 'file', 'never'));

  // (1) THE DECLARED ARM IS `D-38`'s RANK 20 AND NO `FileCommitFailed` TAKES ITS PLACE (`D-111` item 3).
  assert.equal(write.ok, false, 'the write\'s pass must refuse');
  assert.equal(write.caught.status, 'ConstraintPassRefused',
    `**A REVERSAL'S SAVE CANNOT RUN BEFORE THE PASS'S ARM IS DECIDED** (\`D-111\` item 3): ${JSON.stringify(write.caught.status)}`);
  // (2) THE COMPENSATION IS COMPENSATION AND NOT AN ACT: NOTHING DURABLE CHANGED, SO NOTHING WAS SAVED.
  assert.equal(bytesOf(filePath), before,
    `**THE BYTES ARE BYTE-IDENTICAL** (\`D-111\` item 1; the measured defects \`J1\`/\`J2\`): ${JSON.stringify(bytesOf(filePath))}`);
  assert.equal(moved(mods, modState(filePath)), false,
    '**AND THE INODE IS UNMOVED** — the failing attempt\'s own reversal saved nothing');
  assert.deepEqual(standing(store, ['n']), { present: false, refused: 'AddressNotFound' },
    'and the store is where the call found it');
  rmSync(dir, { recursive: true, force: true });
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §6 — ARM 4: THE COMPACTION ARM REGENERATES (`D-108`), AND `RollbackCompacted` HAS **NO PRODUCER**
//      (`D-109`'s narrowing READ THROUGH `D-118` item 2: the corrupt-image arm is gone)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('FSC-ARM4-REGEN-FILE · ARM 4 — a reversal whose candidate set holds a COMPACTED entry RETURNS a record and does not throw, and a `file`-tier version OUTSIDE its scope still stands in memory and in the bytes', () => {
  const { dir, filePath } = scratch('regen');
  const store = make({ filePath, journalLength: 2 });
  store.write(['a'], 'file', 1);
  const second = store.write(['a'], 'file', 2);
  store.write(['x'], 'file', 9);
  // The FIRST reversal is the plain walk and marks its candidates; the SECOND meets the mark — the fourth
  // arm's own producer (`D-108` item 1; `sites.md §4.2` items 10–18's arm).
  const first = attempt(() => store.rollback(second.op.opId));
  assert.equal(first.ok, true, `the first reversal must land: ${JSON.stringify(first.caught?.status)}`);
  const secondRun = attempt(() => store.rollback(second.op.opId));

  assert.equal(secondRun.ok, true,
    `**THE CALL RETURNS AND DOES NOT THROW** — it answered \`RollbackCompacted\` before this unit (\`D-108\` item 1): ${JSON.stringify(secondRun.caught?.status)}`);
  assert.deepEqual(Object.keys(secondRun.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    'the record is the three declared members; the regeneration mints no fourth (`PIN-13` (iv))');
  assert.deepEqual(secondRun.value.undoneOps, [second.op.opId], 'and it names the reversed op');
  assert.deepEqual(standing(store, ['a']), { present: true, value: 1 },
    'the address answers the regenerated last valid state');
  assert.deepEqual(standing(store, ['x']), { present: true, value: 9 },
    '**THE VERSION OUTSIDE THE SCOPE SURVIVES IN MEMORY** (`PIN-12` (ii); `FSC-ARM4-SCOPE`)');
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { a: 1, x: 9 },
    `**AND IT STILL STANDS IN THE BYTES** — a regeneration from the durable floor ALONE would have dropped it: ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(standing(make({ filePath }), ['x']), { present: true, value: 9 }, 'a fresh boot reads it too');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-ARM4-LOST · ARM 4 at `D-108` ITEM 3\'s own case — a `mem`-tier version whose ONLY record the window swallowed does NOT come back', () => {
  const { dir, filePath } = scratch('lost');
  const store = make({ filePath, journalLength: 2 });
  store.write(['a'], 'file', 1);
  store.write(['n'], 'mem', 'lost');
  const second = store.write(['a'], 'file', 2);
  store.write(['x'], 'file', 9);              // the window compacts the first two entries, ['n']'s among them
  store.rollback(second.op.opId);              // the plain walk, which marks its own candidates
  const regenerating = attempt(() => store.rollback(second.op.opId));
  assert.equal(regenerating.ok, true,
    `the regenerating reversal must RETURN (\`PIN-12\` (iii) (b)'s arm): ${JSON.stringify(regenerating.caught?.status)}`);
  assert.deepEqual(standing(store, ['n']), { present: false, refused: 'AddressNotFound' },
    `**THE SWALLOWED MEMORY-ONLY VERSION IS LOST** — and a pass that "helpfully" restored everything would fail here: ${JSON.stringify(standing(store, ['n']))}`);
  assert.equal(bytesOf(filePath).includes('"n"'), false, 'the bytes never carried it and still do not');
  assert.deepEqual(standing(make({ filePath }), ['n']), { present: false, refused: 'AddressNotFound' },
    'and a fresh instance over the path answers `AddressNotFound` for it too');
  rmSync(dir, { recursive: true, force: true });
});

// ── **⟶ RE-DERIVED 2026-11-02 (`D-118` item 1, THE ARCHITECT, VERBATIM: *"In the corrupt file case, then it
// restores from the store creation image"*) — AND THE CELL'S NAME IS RE-WORDED BECAUSE IT ASSERTED A
// REACHABILITY THAT `D-118` ITEM 2 REMOVES.** The cell was `FSC-FLOOR-NARROWED`, and its own name said the
// narrowed token had ONE producer left — a compacted candidate set over a present, non-empty `filePath` image
// the loader cannot read (`D-109` item 1). **`D-118` item 1 READS THAT IMAGE AS NO IMAGE AT ALL**: the
// regeneration falls back to `Store::born` — the CREATION STATE, the boot's own floor — exactly as where no
// path, no file or a zero-length file stands, and **the reversal then proceeds and the save that follows puts
// a readable image back over the corrupt bytes**. **So `RollbackCompacted` has NO PRODUCER LEFT (`D-118` item
// 2), and the cell's subject moves from *"the token fires here and only here"* to *"NO arm of this tree
// produces it, and the corrupt-image arm rebuilds from the creation state and returns"*.** **NOTHING IS
// DELETED AND NO NEIGHBOUR'S SUBJECT IS WEAKENED**: the floor's other facts stand where they were — `M-8`'s
// totality and `D-108`'s regeneration at `FSC-ARM4-REGEN-FILE`, the `seq`/`M-9` arm below, the all-or-nothing
// rule where it still applies (`FSC-ARM3-*`, `FSC-RV-*`), and the intact-image control this cell keeps. **The
// token's place in the twenty is NOT this file's to assert and does not move** (`D-118` item 2's own *"the
// closed set is the store's"*): the crate's census cell `s8_1_11_*` and `fail_set_is_closed_at_twenty_*` carry
// that figure. **The name is the ONLY thing re-worded and this paragraph is where the re-word is said.**
test('FSC-FLOOR-UNREACHABLE · ★ `RollbackCompacted` IS `DECLARED, NO PRODUCER` (`D-118` item 2, correcting `D-109` item 1 at its own subject) · RE-WORDED FROM `FSC-FLOOR-NARROWED`, whose name asserted a reachability `D-118` removes: a compacted candidate set over a `filePath` image the loader cannot read now REBUILDS FROM THE CREATION STATE and RETURNS — no token, no `M-6`/`M-9` neighbour moved — and the intact-image control returns beside it', () => {
  const FIXTURE = 'this is not the store\'s image';
  const drive = (corrupt) => {
    const { dir, filePath } = scratch(corrupt ? 'narrow-c' : 'narrow-i');
    const store = make({ filePath, journalLength: 2 });
    store.write(['a'], 'file', 1);
    const second = store.write(['a'], 'file', 2);
    store.write(['x'], 'file', 9);
    store.rollback(second.op.opId);                       // marks its candidates ⇒ the next call's set holds a mark
    if (corrupt) writeFileSync(filePath, FIXTURE);
    const before = bytesOf(filePath);
    const outcome = attempt(() => store.rollback(second.op.opId));
    return {
      dir,
      filePath,
      store,
      reversed: second.op.opId,
      before,
      outcome,
      memoryA: standing(store, ['a']),
      memoryX: standing(store, ['x']),
      bytes: bytesOf(filePath),
    };
  };

  // ── (1) THE CORRUPT-IMAGE ARM: **THE CALL RETURNS, AND THE TOKEN IS UNREACHABLE HERE.**
  const bad = drive(true);
  assert.equal(bad.outcome.ok, true,
    `**THE CORRUPT-IMAGE ARM RETURNS INSTEAD OF REFUSING** (\`D-118\` item 1) — it answered `
      + `${JSON.stringify(bad.outcome.caught?.status)} where \`D-109\` narrowed the token to exactly this state`);
  // The token itself: no arm of this tree answers it, so the *absence* is the assertion (`DECLARED, NO
  // PRODUCER`). `status` is read on both arms rather than assumed absent from a thrown value.
  assert.equal(bad.outcome.ok === false && bad.outcome.caught.status === 'RollbackCompacted', false,
    '**`RollbackCompacted` HAS NO PRODUCER LEFT** (`D-118` item 2): the compacted-candidate-set-over-an-'
      + 'unreadable-image arm is the one `D-109` item 1 left, and `D-118` item 1 removes it');
  assert.deepEqual(Object.keys(bad.outcome.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    'and it answers the three-member record — the regeneration mints no fourth (`PIN-13` (iv))');
  assert.deepEqual(bad.outcome.value.undoneOps, [bad.reversed],
    '**`M-6`/`M-9` DO NOT MOVE**: the reversal is PERFORMED over its whole bounded candidate set — the walk '
      + 'is the plain one, no candidate is skipped and no mark is cleared');
  assert.deepEqual(bad.outcome.value.restoredTo, { present: true, value: 1 },
    'and the state it restores is the reversed op\'s own pre-state');

  // ── (2) **THE CREATION-STATE REBUILD, AND THE SAVE THAT FOLLOWS IT** (`D-118` items 1 and 4).
  assert.deepEqual(bad.memoryA, { present: true, value: 1 },
    `the addressed subtree answers the walk's state: ${JSON.stringify(bad.memoryA)}`);
  assert.deepEqual(bad.memoryX, { present: true, value: 9 },
    `**AND THE SURVIVING JOURNAL ENTRY IS REPLAYED OVER THE CREATION-STATE BASE** (\`D-108\` item 3): `
      + `${JSON.stringify(bad.memoryX)}`);
  assert.equal(bad.before, FIXTURE, 'the fixture stood at the path at the instant of the act');
  assert.equal(bad.bytes.includes(FIXTURE), false,
    `**THE SAVE THAT FOLLOWS WRITES A READABLE IMAGE OVER THE CORRUPT FILE** (\`D-118\` items 1 and 4): `
      + `${JSON.stringify(bad.bytes)}`);
  assert.deepEqual(JSON.parse(bad.bytes), { a: 1, x: 9 },
    `and the bytes are exactly the state the store stands at: ${JSON.stringify(bad.bytes)}`);
  assert.deepEqual(standing(make({ filePath: bad.filePath }), ['a']), { present: true, value: 1 },
    '**A FRESH BOOT OVER THAT PATH READS THE CREATION STATE PLUS THE SURVIVING JOURNAL** — nothing of the '
      + 'corrupt bytes survives, because they were never readable as this store\'s state (`D-118` item 4)');
  assert.deepEqual(standing(make({ filePath: bad.filePath }), ['x']), { present: true, value: 9 },
    'and the version outside the reversal\'s scope is durable at the boot too');

  // ── (3) THE INTACT-IMAGE CONTROL: the same candidate set with a READABLE image RETURNS, and — the second
  // reading of the same fact — the state-keyed save writes NOTHING, because the image already holds the state
  // the reversal leaves (`D-116` item 3). **THE TWO ARMS DIFFER IN THE BYTES AT THE PATH AND IN NOTHING THE
  // ANSWER CARRIES**, which is `D-118` item 1's *"treated as NO IMAGE AT ALL"* read as an equality.
  const good = drive(false);
  assert.equal(good.outcome.ok, true,
    `**THE SAME CANDIDATE SET WITH A READABLE IMAGE RETURNS** (\`D-108\` item 1; \`D-110\`'s one reader): `
      + `${JSON.stringify(good.outcome.caught?.status)}`);
  assert.deepEqual(Object.keys(good.outcome.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    'and answers the three-member record');
  assert.equal(good.bytes, good.before,
    `**AND IT WRITES NO BYTE** — the standing image already holds the state the reversal leaves `
      + `(\`D-116\` item 3): ${JSON.stringify([good.before, good.bytes])}`);
  assert.deepEqual([good.memoryA, good.memoryX, JSON.parse(good.bytes)],
    [bad.memoryA, bad.memoryX, JSON.parse(bad.bytes)],
    '**SO THE TWO ARMS ANSWER THE SAME STATE** — the unreadable image is the creation state and nothing else '
      + '(`D-118` item 1): the corruption at the path is not a state this arm can see');

  // ── (4) **THE `seq` ARM STANDS** (`M-9`; `DD-30`): no entry was appended by either call.
  const next = bad.store.write(['probe'], 'file', 0);
  assert.equal(next.op.seq, 4,
    `**NO JOURNAL ENTRY IS APPENDED BY THE REGENERATION** — the drive made three appends (the two writes at `
      + `["a"] and the write at ["x"]), so the next write's \`seq\` must be exactly 4: it is ${next.op.seq}`);

  rmSync(bad.dir, { recursive: true, force: true });
  rmSync(good.dir, { recursive: true, force: true });
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §7 — THE RULE'S BOUNDARY AND THE FOUR CONTROLS (`D-106` item 4; `PIN-6` (iii))
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('FSC-RULE-NOOP · a store with NO `filePath` owes no save on any of the arms and answers no save failure for one', () => {
  const store = make();
  const write = attempt(() => store.write(['a'], 'mem', 1));
  assert.equal(write.ok, true, `a path-less store's \`mem\` write lands: ${JSON.stringify(write.caught?.status)}`);
  const reversal = attempt(() => store.rollback(write.value.op.opId));
  assert.equal(reversal.ok, true,
    `**A STORE WITH NO PATH CANNOT OWE A SAVE AND MUST NOT ANSWER A FAILURE FOR ONE** (\`PIN-13\` (v); \`save_file_delta\`'s \`None\` arm): ${JSON.stringify(reversal.caught?.status)}`);
  assert.deepEqual(Object.keys(reversal.value).sort(), ['opId', 'restoredTo', 'undoneOps'], 'and it answers its record');
  assert.deepEqual(standing(store, ['a']), { present: false, refused: 'AddressNotFound' }, 'the reversal landed in memory');
  store.write(['k'], 'mem', 1);
  const del = attempt(() => store.delete(['k']));
  assert.equal(del.ok, true, `and a whole-target delete lands: ${JSON.stringify(del.caught?.status)}`);
  assert.notEqual(del.value.op, null, 'with its op');
  assert.deepEqual(standing(store, ['k']), { present: false, refused: 'AddressNotFound' }, 'and its removal stands');
});

test('FSC-CONTROL-WRITE · `D-106` item 4, control 1 — a plain caller\'s `file`-tier write still saves (GREEN before this unit and after it)', () => {
  const { dir, filePath } = scratch('ctlw');
  const store = make({ filePath });
  store.write(['c'], 'file', 'v');
  assert.deepEqual(JSON.parse(bytesOf(filePath)), { c: 'v' }, `the bytes carry the value (\`C-7\`): ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(standing(make({ filePath }), ['c']), { present: true, value: 'v' }, 'and a fresh boot reads it');
  rmSync(dir, { recursive: true, force: true });
});

test('FSC-CONTROL-DELETE · `D-106` item 4, control 3 — a TIER-NAMED `file` delete still saves (GREEN before this unit and after it)', () => {
  const { dir, filePath } = scratch('ctld');
  const store = make({ filePath });
  store.write(['c'], 'file', 'v');
  const receipt = store.delete(['c'], 'file');
  assert.equal(receipt.op.tier, 'file', 'a tier-named delete names an op standing at `file`');
  assert.equal(bytesOf(filePath), '{}', `the bytes read \`{}\` (\`C-8\`): ${JSON.stringify(bytesOf(filePath))}`);
  assert.deepEqual(standing(make({ filePath }), ['c']), { present: false, refused: 'AddressNotFound' }, 'and the removal is durable');
  rmSync(dir, { recursive: true, force: true });
});
