// tests/e2e/creation-sweep-frozen.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `U-STOREROOM-CREATION-SWEEP` — GATE 3, THE DIAGNOSIS, `D-90`'S SKIP, THE FROZEN SHAPES, AND THE TWO
// CONTROLS THE WIDENING OWES: `CSW-11`, `CSW-13`, `CSW-14`, `CSW-15`, `CSW-25`. **EVERY CELL HERE IS `e`.**
//
// **`CSW-14` AND `CSW-25` ARE THE TWO CONTROLS `§4` AND `§1` NAME, AND THEY ARE GREEN ON THE UNTOUCHED TREE BY
// DESIGN**: `CSW-25` is `F-4`'s control — *"this cell is what proves the carve did not widen"* — and `CSW-14`
// is `PIN-14`'s *"six arms frozen by name"*, read at the three the widening could plausibly disturb. **A PASS
// HERE IS NOT A GAP AND A FAILURE HERE IS A FINDING, NOT A RED.** `CSW-11` and `CSW-13` are the same kind of
// arm where their pins preserve a shipped behaviour, and `CSW-15` is the census that says the unit minted
// nothing — its one RED limb is the `PIN-8` admission the unit has not landed yet.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE PINS
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// · **`CSW-11`** — `PIN-11` **REDRAWN `2026-11-06` BY `D-126` ITEM 2**: *"THE DIAGNOSIS IS CARRIED BY THE CODE'S
//   PRESENCE AND SUBJECT: AN INCOMPATIBLE LIST CROSSES A CODE WHOSE SUBJECT IS THE CONSTRAINTS (`19` or `20`),
//   AND A CORRUPT IMAGE CROSSES THE MINTED RANK `22` `FileImageRefused`, WHOSE SUBJECT IS THE STORE'S OWN
//   IMAGE."* **THE SUPERSEDED PIN'S *"CORRUPT FILE DATA CROSSES NONE"* IS RETIRED AND THIS CELL PROVES THE
//   OPPOSITE OF IT**; what it left true — rank `16`'s load arm stays `DECLARED, NO PRODUCER` — is not this
//   cell's subject (`D-123` item 4's diagnosis, real now in BOTH directions).
// · **`CSW-13`** — `D-90`'s skip read THROUGH `D-123` item 1: *"a pair whose parent does not resolve is still
//   SKIPPED (`D-90` (1)–(3), `D-96`), because the skip is a rule about what can be asked at all and not a
//   scope"* — and `PIN-14` (ii) freezes `kernel-registration.mjs:360` by name.
// · **`CSW-14`** — `PIN-14`'s frozen arms and `PIN-2`'s scope: **a caller's write still delivers at its terminal
//   arm** (`delivery.mjs:880`), **a repair's write's listeners are still delivered at the LANDING** (`D-104`),
//   and **`D-117`'s reversal still delivers after its save** (`constraints.mjs:3009`–`:3037`).
// · **`CSW-15`** — `PIN-14`: **no instance member (the set stays `15`), no addon export (`16`)**, the store's
//   listener record two-membered, **and `instance.listen`/`register` deliver nothing** (`PIN-14` (ii): *"`\`instance.listen\`/\`register\`'s
//   own surface … is the LISTENER surface and not a repair's write"*).
// · **`CSW-25`** — `F-4`'s control and the identity promise `§2 A.7`'s carve is scoped AROUND: `surface.md:1665`–`:1667`
//   (*"A THROWING LISTENER BODY IS NOT CAUGHT, NOT RETRIED AND NOT REPORTED"*) and `contract.md:4299`
//   (*"A LISTENER BODY'S THROW IS ANSWERED AS ITSELF — `caught === thrown`, the caller's own object back,
//   IDENTITY PRESERVED … Measured, and it holds."*).
//
// **`D-17`** and **`D-21`** as this unit's other files state them: the expectation is a literal, the citation is
// a comment, and every cell prints what it read.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

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

/** The two ranks whose SUBJECT IS THE CONSTRAINTS (`PIN-11`; `contract.md:4289`, `:4652`). */
const CONSTRAINTS_SUBJECT_CODES = ['ConstraintRefusedAtRegistration', 'ConstraintPassRefused'];

/** **THE CORRUPT IMAGE'S OWN MEMBER — MINTED AT RANK `22`** (`D-126` item 2; `§3` `PIN-11` redrawn): its
 *  subject is the STORE'S OWN IMAGE and not the constraint list, so a corrupt file and an incompatible list are
 *  two different diagnoses for two different repairs (`D-123` item 4). */
const FILE_IMAGE_REFUSED = 'FileImageRefused';

const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), `cswf-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
};
const bytesOf = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);
const standing = (instance, address) => {
  const read = attempt(() => instance.read(address));
  return read.ok ? { present: true, value: read.value } : { present: false, refused: statusOf(read.caught) };
};
const addressSet = (address) => {
  const members = Array.isArray(address) && Array.isArray(address[0]) ? address : [address];
  return members.map((member) => member.join('/')).sort();
};
const shield = (body) => (context) => (context !== null && typeof context === 'object'
  && context.tier === null && context.op === null
  ? true
  : body(context));

/** Bind a listener at `address` and answer its invocation record. */
function bindWatching(store, handle, address) {
  const calls = [];
  const bound = store.listen(handle, [address]);
  store.register(bound, function listener(...args) { calls.push({ argCount: args.length, address: args[0] }); });
  return { handle: bound, calls };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-11` · THE DIAGNOSIS — TWO STATES THE APPLICATION MUST TELL APART
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-11 · THE DIAGNOSIS (`PIN-11` redrawn; `D-126` item 2; `D-123` item 4) — BOTH states now REFUSE, and they are TWO DIFFERENT MEMBERS: a CORRUPT image crosses the minted rank `22` `FileImageRefused`, whose SUBJECT IS THE STORE\'S OWN IMAGE (the path), while an INCOMPATIBLE list over a readable image crosses a code whose SUBJECT IS THE CONSTRAINTS (rank `19` or `20`), whose subject is a constraint\'s address', (t) => {
  // **`PIN-11` REDRAWN 2026-11-06 BY `D-126` ITEM 2**: *"THE DIAGNOSIS IS CARRIED BY THE CODE'S PRESENCE AND
  // SUBJECT: AN INCOMPATIBLE LIST CROSSES A CODE WHOSE SUBJECT IS THE CONSTRAINTS (`19` or `20`), AND A CORRUPT
  // IMAGE CROSSES THE MINTED RANK `22` `FileImageRefused`, WHOSE SUBJECT IS THE STORE'S OWN IMAGE."* **THE
  // SILENCE THE SUPERSEDED PIN CARRIED IS RETIRED, AND THIS CELL PROVES THE OPPOSITE OF IT**: the retired
  // sentence read *"CORRUPT FILE DATA CROSSES NONE, BECAUSE THE STORE READS AN IMAGE ITS LOADER CANNOT READ AS
  // NO IMAGE"*, and `D-126` item 2 replaced it because *"an application that must check if file data is
  // corrupt … cannot while corruption returns an instance indistinguishable from an empty path"*. **WHAT THE
  // OLD PIN LEFT TRUE AND THIS ONE KEEPS — rank `16`'s LOAD arm stays `DECLARED, NO PRODUCER` — is not this
  // cell's subject. THE ARCHITECT'S REQUIREMENT** (`D-123` item 4, his words): *"Application needs to check if
  // file data is corrupt or if constraints are incompatible"* — **a requirement ON THE REFUSAL, and the
  // refusal must let a caller tell them apart: both refuse, and the telling-apart is the MEMBER.**
  const { dir, filePath: corruptPath } = scratch('csw11-corrupt');
  writeFileSync(corruptPath, '{ this is not an image any loader can read');
  const corrupt = attempt(() => make({ filePath: corruptPath }));
  const corruptStatus = corrupt.ok ? 'returned' : statusOf(corrupt.caught);

  const { dir: dir2, filePath: loadedPath } = scratch('csw11-loaded');
  writeFileSync(loadedPath, JSON.stringify({ a: 'bad' }));
  const incompatible = attempt(() => make({
    filePath: loadedPath,
    constraints: [{
      address: ['a'],
      id: 'rejects-bad',
      constraint: (context) => (context.value !== 'bad' ? true : { message: '`["a"]` must not be "bad"' }),
    }],
  }));
  const incompatibleStatus = incompatible.ok ? 'returned' : statusOf(incompatible.caught);
  rmSync(dir, { recursive: true, force: true });
  rmSync(dir2, { recursive: true, force: true });

  // ── (a) A CORRUPT IMAGE CROSSES THE MINTED RANK `22` `FileImageRefused`. ──────────────────────────────
  assert.equal(corrupt.ok, false,
    `**A CORRUPT IMAGE REFUSES THE CONSTRUCTION** — **THE CALL RETURNED AN INSTANCE**, which is the silence `
      + `\`PIN-11\` pinned and \`D-126\` item 2 RETIRED (*"a corrupt image refuses the construction"*): an `
      + `instance indistinguishable from an empty path cannot be diagnosed by the application at all`);
  assert.equal(corruptStatus, FILE_IMAGE_REFUSED,
    `**AND THE MEMBER IT CROSSES AT IS THE MINTED RANK \`22\` \`FileImageRefused\`** — the member whose `
      + `subject is the STORE'S OWN IMAGE and not the constraint list (\`PIN-11\` redrawn; \`D-126\` item 2: `
      + `*"Mint/revive a code: a corrupt image refuses the construction"*): the construction answered `
      + `${JSON.stringify(corruptStatus)} with message ${JSON.stringify(messageOf(corrupt.caught))}`);
  assert.equal(CONSTRAINTS_SUBJECT_CODES.includes(corruptStatus), false,
    `**AND NO CODE IN THIS ARM NAMES THE OTHER ARM'S SUBJECT** (\`PIN-11\`: the two states are told apart by `
      + `the member and by NOTHING ELSE): the corrupt arm answered ${JSON.stringify(corruptStatus)}, which is `
      + `not one of the constraints-subject members ${JSON.stringify(CONSTRAINTS_SUBJECT_CODES)}`);

  // ── (b) AN INCOMPATIBLE LIST CROSSES A CONSTRAINTS-SUBJECT CODE. ──────────────────────────────────────
  assert.equal(incompatible.ok, false,
    `**AN INCOMPATIBLE LOADED STATE REFUSES** (\`D-123\` item 1: *"The construction must ask the pairs it `
      + `carries and cannot return an instance whose register still violates one of them"*): it answerd `
      + `${JSON.stringify(incompatibleStatus)}`);
  assert.equal(CONSTRAINTS_SUBJECT_CODES.includes(incompatibleStatus), true,
    `**AND THE CODE'S SUBJECT IS THE CONSTRAINTS — RANK \`19\` OR RANK \`20\`** (\`PIN-11\`: *"AN INCOMPATIBLE `
      + `LIST CROSSES A CODE WHOSE SUBJECT IS THE CONSTRAINTS (\`19\` or \`20\`)"*): it answered `
      + `${JSON.stringify(incompatibleStatus)} with message ${JSON.stringify(messageOf(incompatible.caught))}`);

  // ── (c) AND THE TWO ARE DISTINGUISHABLE — WHICH IS THE REQUIREMENT: TWO DIFFERENT MEMBERS. ────────────
  assert.notEqual(corruptStatus, incompatibleStatus,
    `**THE APPLICATION CAN TELL THE TWO STATES APART — AND IT IS THE MEMBER THAT TELLS IT, NOT THE `
      + `PRESENCE OF ONE** \`D-123\` item 4; \`PIN-11\` redrawn: *"TWO DIFFERENT DIAGNOSES FOR TWO DIFFERENT `
      + `REPAIRS"*: the corrupt image answered ${JSON.stringify(corruptStatus)} and the incompatible list `
      + `answered ${JSON.stringify(incompatibleStatus)} — **one member, two states, and neither status is `
      + `produced by the other's state**`);

  // ── (d) THE SUBJECTS, WHICH THE PIN NAMES AND NOT ONLY THE STRINGS: THE IMAGE IS THE PATH. ────────────
  assert.equal(messageOf(corrupt.caught).includes(corruptPath), true,
    `**THE \`22\` ARM'S SUBJECT IS THE PATH** — a corrupt image is not an act at an address, so its refusal `
      + `names the image it refused (\`PIN-11\`: *"the \`22\` arm's subject is the path"*; the message reads `
      + `${JSON.stringify(messageOf(corrupt.caught))} and the path is ${JSON.stringify(corruptPath)})`);
  assert.equal((corrupt.caught !== null && typeof corrupt.caught === 'object' ? corrupt.caught.address ?? null : null), null,
    `**AND ITS \`address\` IS \`null\`** — the refusal is the LOAD'S and not the caller's argument's, so it `
      + `carries no address to repair: it read `
      + `${JSON.stringify(corrupt.caught !== null && typeof corrupt.caught === 'object' ? corrupt.caught.address : undefined)}`);
  assert.equal(messageOf(incompatible.caught).includes(loadedPath), false,
    `**AND THE \`19\`/\`20\` ARMS' SUBJECT IS A CONSTRAINT'S ADDRESS AND NOT THE IMAGE** — a state in which `
      + `nothing is wrong with the image cannot answer a member that names it: the incompatible arm's message `
      + `reads ${JSON.stringify(messageOf(incompatible.caught))} and the image's path is `
      + `${JSON.stringify(loadedPath)}`);
  assert.deepEqual(incompatible.caught !== null && typeof incompatible.caught === 'object' ? incompatible.caught.address : undefined,
    ['a'],
    `**AND THE ADDRESS IT NAMES IS THE CONSTRAINT'S** — the pair this cell registered stands at `
      + `\`["a"]\`, so the application reads WHICH constraint refused: it read `
      + `${JSON.stringify(incompatible.caught !== null && typeof incompatible.caught === 'object' ? incompatible.caught.address : undefined)}`);

  t.diagnostic(`CSW-11 · THE DIAGNOSIS: the corrupt image answered ${JSON.stringify(corruptStatus)} `
    + `(address ${JSON.stringify(corrupt.caught !== null && typeof corrupt.caught === 'object' ? corrupt.caught.address : undefined)}, `
    + `message ${JSON.stringify(messageOf(corrupt.caught))}); the incompatible loaded state answered `
    + `${JSON.stringify(incompatibleStatus)} (address `
    + `${JSON.stringify(incompatible.caught !== null && typeof incompatible.caught === 'object' ? incompatible.caught.address : undefined)}, `
    + `message ${JSON.stringify(messageOf(incompatible.caught))}). Two members and two subjects: the image's `
    + `is the path, the constraints' is the pair's address`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-13` · `D-90`'S SKIP SURVIVES THE SWEEP
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-13 · `D-90`\'S SKIP STAYS (`D-123` item 1; `PIN-14` (ii)) — a pair whose parent does NOT resolve is SKIPPED at the sweep, is NOT a refusal, is NOT fired for, and `constraints()` still names it — while the sweep\'s rounds run beside it', (t) => {
  // **`D-123` item 1 reads `D-90` THROUGH the widening and not around it**: *"a pair whose parent does not
  // resolve is still SKIPPED (`D-90` (1)–(3), `D-96`), because the skip is a rule about what can be asked at
  // all and not a scope."* **THE CELL DRIVES THE SKIP BESIDE A SWEEP THAT RUNS**, because *"skipped at the
  // sweep"* is not a claim a one-round construction can carry: pair `swept` repairs, so a further round runs,
  // and the skipped pair is not asked in it either.
  let skippedAsks = 0;
  const sweptAsks = [];
  const construction = attempt(() => make({
    constraints: [
      {
        address: ['absent-parent', 'x'],
        id: 'never-resolves',
        constraint: () => { skippedAsks += 1; return true; },
      },
      {
        address: ['swept'],
        id: 'swept',
        constraint: (context) => {
          sweptAsks.push(context.value);
          if (context.value !== undefined) return true;
          return {
            message: '`["swept"]` must exist',
            repair: (record) => ({ ok: true, op: record.write(['swept'], 'mem', 'seeded').op }),
          };
        },
      },
    ],
  }));
  const status = construction.ok ? null : statusOf(construction.caught);

  assert.equal(construction.ok, true,
    `**THE SKIP IS NOT A REFUSAL** (\`D-90\` (2); \`D-123\` item 1 reads it through the sweep): the construction `
      + `answered ${JSON.stringify(status)} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}`);
  assert.equal(skippedAsks, 0,
    `**AND THE PAIR WHOSE PARENT DOES NOT RESOLVE IS ASKED ZERO TIMES** (\`D-90\` (1)–(3); \`D-96\`; `
      + `\`PIN-14\` (ii) freezes \`kernel-registration.mjs:360\` by name): it was asked ${skippedAsks} time(s)`);
  assert.equal(sweptAsks.length >= 3, true,
    `**AND THE SWEEP'S ROUNDS RAN BESIDE IT — the skip survives the sweep and is not the sweep's absence** `
      + `(\`PIN-4\` (iv): the sweep ends on the first round that lands no repair): pair \`swept\` was asked `
      + `${sweptAsks.length}× with ${JSON.stringify(sweptAsks)} — **TODAY NO ROUND RUNS AFTER THE REGISTRATION `
      + `INSTANT'S OWN RE-RUN, so the skip is a skip of ONE ask and never of the sweep**`);
  assert.deepEqual(construction.ok ? construction.value.constraints().map((row) => addressSet(row.address)).sort() : null,
    [['absent-parent/x'], ['swept']],
    `**AND \`constraints()\` STILL NAMES THE SKIPPED PAIR** (\`§4\` \`CSW-13\`): it read `
      + `${JSON.stringify(construction.ok ? construction.value.constraints() : null)}`);
  t.diagnostic(`CSW-13 · THE SKIP: the skipped pair was asked ${skippedAsks}×; pair \`swept\` was asked `
    + `${sweptAsks.length}× with ${JSON.stringify(sweptAsks)}; \`constraints()\` = `
    + `${JSON.stringify(construction.ok ? construction.value.constraints() : null)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-14` · THE THREE ARMS THAT MUST NOT MOVE — **GREEN ON THE UNTOUCHED TREE BY DESIGN**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-14 · THE ARMS THAT MUST NOT MOVE (`PIN-14`; `PIN-2`) — a caller\'s `write` still delivers at its TERMINAL ARM, a repair\'s write\'s listeners are still delivered at the LANDING (`D-104`), and `D-117`\'s reversal still delivers AFTER ITS SAVE', (t) => {
  const rows = [];

  // ── (a) A CALLER'S `write` DELIVERS AT ITS TERMINAL ARM (`delivery.mjs:880`). ────────────────────────────
  {
    const store = make();
    const watched = bindWatching(store, 'W', ['b']);
    const written = attempt(() => store.write(['b'], 'mem', 1));
    rows.push({ arm: 'a · the caller\'s write', status: written.ok ? 'returned' : statusOf(written.caught), fires: watched.calls.length });
    assert.equal(written.ok, true,
      `the caller's write must land: ${JSON.stringify(written.ok ? null : statusOf(written.caught))}`);
    assert.deepEqual(watched.calls, [{ argCount: 1, address: ['b'] }],
      `**A CALLER'S \`write\` STILL DELIVERS AT ITS TERMINAL ARM — ONE INVOCATION, ONE ARGUMENT, THE ACT'S `
        + `ADDRESS** (\`PIN-14\`: \`delivery.mjs:880\`'s caller-write delivery is frozen; \`PAR-JS-12\`): the `
        + `listener read ${JSON.stringify(watched.calls)}`);
  }

  // ── (b) A REPAIR'S WRITE'S LISTENERS ARE DELIVERED AT THE LANDING (`D-104`). ─────────────────────────────
  {
    const store = make();
    store.write(['a'], 'mem', 1);
    store.write(['b'], 'mem', 1);
    const watched = bindWatching(store, 'W', ['b']);
    watched.calls.length = 0;
    let repairs = 0;
    store.addConstraint({ address: ['a'], id: 'a-pair' }, shield((context) => {
      if (context.value !== 2) return true;
      return {
        message: '`["a"]` must not be 2',
        repair: (record) => {
          repairs += 1;
          // **THE SUPPORTED ROUTE (`D-46`, `D-103`)**: the write NAMES the attempt's commit at its fourth
          // position, so it JOINS it and its `triggered` set rides the commit's delivery.
          return { ok: true, op: store.write(['b'], 'mem', 3, record).op };
        },
      };
    }));
    watched.calls.length = 0;
    const written = attempt(() => store.write(['a'], 'mem', 2));
    rows.push({ arm: 'b · the landing delivery', status: written.ok ? 'returned' : statusOf(written.caught), fires: watched.calls.length, repairs });
    assert.equal(written.ok, true,
      `the caller's write must land while its pair repairs: `
        + `${JSON.stringify(written.ok ? null : statusOf(written.caught))}`);
    assert.equal(repairs, 1,
      `and the repair must have run: ${repairs}`);
    assert.deepEqual(watched.calls, [{ argCount: 1, address: ['b'] }],
      `**A REPAIR'S WRITE'S LISTENERS ARE STILL DELIVERED AT THE LANDING** (\`D-104\` item 2: *"The repair's `
        + `write's listeners ARE delivered — in the COMMIT's delivery, after the pass, with the other `
        + `listeners"*; \`PIN-14\` freezes it): the listener read ${JSON.stringify(watched.calls)}`);
  }

  // ── (c) `D-117`'S REVERSAL STILL DELIVERS AFTER ITS SAVE. ────────────────────────────────────────────────
  {
    const { dir, filePath } = scratch('csw14c');
    const store = make({ filePath });
    store.write(['t'], 'file', { w: 'seed' });
    const reversed = store.write(['x'], 'file', 1);
    const watched = bindWatching(store, 'W', ['t']);
    let runs = 0;
    store.addConstraint({ address: ['x'], id: 'x-pair' }, (context) => {
      if (context.value !== undefined) return true;
      return {
        message: '`["x"]` must exist',
        repair: (record) => {
          runs += 1;
          store.write(['x'], 'file', 'restored-by-repair', record);
          store.write(['t', 'w'], 'file', 'repaired', record);
          return { ok: true };
        },
      };
    });
    watched.calls.length = 0;
    const rollback = attempt(() => store.rollback(reversed.op.opId));
    const bytes = bytesOf(filePath);
    rmSync(dir, { recursive: true, force: true });
    rows.push({ arm: 'c · the reversal\'s delivery', status: rollback.ok ? 'returned' : statusOf(rollback.caught), fires: watched.calls.length, runs });
    assert.equal(rollback.ok, true,
      `the reversal must pass its judgement: ${JSON.stringify(rollback.ok ? null : statusOf(rollback.caught))}`);
    assert.equal(runs, 1,
      `and the judgement's repair must have run: ${runs}`);
    assert.deepEqual(watched.calls, [{ argCount: 1, address: ['t', 'w'] }],
      `**\`D-117\`'S REVERSAL STILL DELIVERS AFTER ITS SAVE — ONE INVOCATION, THE REPAIR'S WRITE'S OWN ADDRESS** `
        + `(\`D-117\` item 1; \`PIN-14\` freezes \`constraints.mjs:3009\`–\`:3037\`): the listener read `
        + `${JSON.stringify(watched.calls)}`);
    assert.equal(String(bytes).includes('repaired'), true,
      `and the save preceded it: the file read ${JSON.stringify(bytes)}`);
  }

  t.diagnostic(`CSW-14 · THE THREE ARMS: ${JSON.stringify(rows)} — **ALL THREE ARE GREEN ON THE UNTOUCHED `
    + `TREE BY DESIGN**, and a red here is a finding and not a cell of this unit`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-25` · THE CONTROL `F-4` OWES — **GREEN ON THE UNTOUCHED TREE BY DESIGN**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-25 · THE CONTROL (`F-4`; `surface.md:1665`–`:1667`; `contract.md:4299`) — a listener body that throws at a caller\'s `write`, at a `delete`, and inside a `rollback`\'s judgement still crosses AS ITSELF, `caught === thrown`, identity preserved — **the carve at `§2 A.7` is scoped to the four registration instants and to nothing else**', (t) => {
  // **`F-4`, QUOTED AT THE DECLARATION**: the corpus declares a listener body's throw twice as an IDENTITY
  // promise — *"A THROWING LISTENER BODY IS NOT CAUGHT, NOT RETRIED AND NOT REPORTED … the throw neither rolls
  // back nor alters anything the store did"* (`surface.md:1665`–`:1667`) and *"A LISTENER BODY'S THROW IS
  // ANSWERED AS ITSELF — `caught === thrown`, the caller's own object back, IDENTITY PRESERVED … Measured, and
  // it holds"* (`contract.md:4299`). **At the four registration instants the throw DOES answer for the act —
  // which is why `§2 A.7` carves three sites — and this cell is what proves the carve did not widen.**
  const rows = [];

  // ── (a) A CALLER'S `write`. ────────────────────────────────────────────────────────────────────────────
  {
    const store = make();
    const thrown = new Error('the write listener throws');
    const bound = store.listen('W', [['q']]);
    store.register(bound, () => { throw thrown; });
    const written = attempt(() => store.write(['q'], 'mem', 1));
    rows.push({ arm: 'write', ok: written.ok, identity: written.ok ? null : written.caught === thrown, status: written.ok ? null : statusOf(written.caught) });
    assert.equal(written.ok, false, 'the throw crosses out of the write — it is not swallowed');
    assert.equal(written.caught === thrown, true,
      `**THE CALLER'S OWN OBJECT COMES BACK — \`caught === thrown\`** (\`contract.md:4299\`; \`D-73\`: the throw `
        + `PROPAGATES at a caller's write because the caller is the only party who can log it): the drive read `
        + `identity ${JSON.stringify(written.caught === thrown)}`);
    assert.equal(statusOf(written.caught), null,
      `and it is NOT the surface's refusal form — it carries no \`status\` member (\`surface.md §2.5\` item 5 `
        + `(e): *"a rejection is NEVER A RAW HOST ERROR"*, and a listener's throwable is *"NOT a kernel state and `
        + `NOT a store state"*): the crossed value's status read ${JSON.stringify(statusOf(written.caught))}`);
  }

  // ── (b) A `delete`. ────────────────────────────────────────────────────────────────────────────────────
  {
    const store = make();
    store.write(['q'], 'mem', 1);
    const thrown = new Error('the delete listener throws');
    const bound = store.listen('W', [['q']]);
    store.register(bound, () => { throw thrown; });
    const deleted = attempt(() => store.delete(['q']));
    rows.push({ arm: 'delete', ok: deleted.ok, identity: deleted.ok ? null : deleted.caught === thrown, status: deleted.ok ? null : statusOf(deleted.caught) });
    assert.equal(deleted.ok, false, 'the throw crosses out of the delete — it is not swallowed');
    assert.equal(deleted.caught === thrown, true,
      `**AND AT A \`delete\` IT IS THE SAME OBJECT** (\`surface.md:1665\`–\`:1667\`): the drive read identity `
        + `${JSON.stringify(deleted.caught === thrown)}`);
    assert.equal(statusOf(deleted.caught), null,
      `and no \`status\` member was minted on it: ${JSON.stringify(statusOf(deleted.caught))}`);
  }

  // ── (c) INSIDE A `rollback`'S JUDGEMENT. ───────────────────────────────────────────────────────────────
  {
    const { dir, filePath } = scratch('csw25c');
    const store = make({ filePath });
    const thrown = new Error('the reversal listener throws');
    store.write(['t'], 'file', { w: 'seed' });
    const reversed = store.write(['x'], 'file', 1);
    const bound = store.listen('W', [['t']]);
    store.register(bound, () => { throw thrown; });
    let runs = 0;
    store.addConstraint({ address: ['x'], id: 'x-pair' }, (context) => {
      if (context.value !== undefined) return true;
      return {
        message: '`["x"]` must exist',
        repair: (record) => {
          runs += 1;
          store.write(['x'], 'file', 'restored-by-repair', record);
          store.write(['t', 'w'], 'file', 'repaired', record);
          return { ok: true };
        },
      };
    });
    const rollback = attempt(() => store.rollback(reversed.op.opId));
    rmSync(dir, { recursive: true, force: true });
    rows.push({ arm: 'rollback', ok: rollback.ok, identity: rollback.ok ? null : rollback.caught === thrown, status: rollback.ok ? null : statusOf(rollback.caught), runs });
    assert.equal(runs, 1,
      `the judgement's repair must have run, or the delivery was never reached: ${runs}`);
    assert.equal(rollback.ok, false, 'the throw crosses out of the rollback — it is not swallowed');
    assert.equal(rollback.caught === thrown, true,
      `**AND INSIDE A \`rollback\`'S JUDGEMENT IT IS STILL THE CALLER'S OWN OBJECT** (\`contract.md:4299\`; `
        + `\`D-117\` item 1's delivery, whose body's throw is the same body's): the drive read identity `
        + `${JSON.stringify(rollback.caught === thrown)}`);
    assert.equal(statusOf(rollback.caught), null,
      `and no code was minted for it — the carve at \`§2 A.7\` is scoped to the four REGISTRATION instants: `
        + `${JSON.stringify(statusOf(rollback.caught))}`);
  }

  t.diagnostic(`CSW-25 · THE CONTROL: ${JSON.stringify(rows)} — **GREEN ON THE UNTOUCHED TREE BY DESIGN**: the `
    + `identity promise stands at the caller's write, at a delete and inside a reversal's judgement, and the `
    + `carve \`§2 A.7\` owes reaches none of them`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-15` · FROZEN SHAPES — AND THE ONE ADMISSION THE UNIT HAS NOT LANDED
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-15 · FROZEN SHAPES (`PIN-14`) — the instance\'s own member set is FIFTEEN, the addon\'s export set is SIXTEEN, the store\'s listener record still answers `{address, handle}`, and `instance.listen`/`register` deliver NOTHING … **and the `PIN-8` admission is this cell\'s one RED limb**', (t) => {
  // **`PIN-14`**: *"NOTHING ELSE MOVES. No instance member (the set stays `15`), no addon export (`16`), no
  // \`K-2\`, no \`D-\` attempt machinery, no \`DD\` row … and **six arms are frozen by name**"* — amended in three
  // clauses by `D-124` item 1 and `D-125` items 1, 3, of which the one this cell reads is (ii): **`instance.listen`/
  // `register`'s own surface is the LISTENER surface and not a repair's write.**
  const DECLARED_MEMBERS = [
    'addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen', 'read',
    'readLiteral', 'readTiered', 'register', 'removeConstraint', 'removeListener', 'rollback', 'unlisten', 'write',
  ];
  const DECLARED_EXPORTS = [
    'commitFile', 'delete', 'errorMessage', 'journalMark', 'listen', 'read', 'readLiteral', 'readTiered',
    'register', 'removeListener', 'restoreMark', 'rollback', 'storeCreate', 'unlisten', 'version', 'write',
  ];

  // ── (a) THE INSTANCE'S OWN MEMBER SET IS FIFTEEN. ─────────────────────────────────────────────────────
  const store = make();
  assert.deepEqual(Object.keys(store).sort(), DECLARED_MEMBERS,
    `**THE INSTANCE'S OWN MEMBER SET IS UNMOVED AT FIFTEEN** (\`PIN-14\`: *"No instance member (the set stays `
      + `\`15\`)"*; \`§6\` item 4: *"The member-set census is unmoved at \`15\`"*): it read `
      + `${JSON.stringify(Object.keys(store).sort())}`);

  // ── (b) THE ADDON'S EXPORT SET IS SIXTEEN. ────────────────────────────────────────────────────────────
  const require_ = createRequire(import.meta.url);
  const addon = require_(join(import.meta.dirname, '..', '..', 'bindings', 'js', 'build', 'Release', 'storeroom_js_binding.node'));
  const addonNames = Object.keys(addon).filter((name) => typeof addon[name] === 'function').sort();
  assert.deepEqual(addonNames, DECLARED_EXPORTS,
    `**THE ADDON'S EXPORT SET IS UNMOVED AT SIXTEEN** (\`PIN-14\`: *"no addon export (\`16\`)"*; \`§6\` item 4: `
      + `*"the addon's at \`16\` — a cell asserting either has moved is false"*): it read `
      + `${JSON.stringify(addonNames)}`);

  // ── (c) THE STORE'S LISTENER RECORD IS STILL TWO MEMBERS. ─────────────────────────────────────────────
  const watched = bindWatching(store, 'W', ['r']);
  const written = attempt(() => store.write(['r'], 'mem', 1));
  const triggerMembers = written.ok
    ? Object.keys(written.value.triggered.find((element) => element.handle === 'W') ?? {}).sort()
    : null;
  assert.deepEqual(triggerMembers, ['address', 'handle'],
    `**THE STORE'S LISTENER RECORD ANSWERS THE CLOSED TWO-MEMBER SET AND A FUNCTION CROSSES AT NO DEPTH** `
      + `(\`PIN-14\` freezes \`src/store.rs:748\`–\`:754\`, \`src/args.rs:302\`, \`src/records.rs:253\`–\`:260\` and `
      + `\`contract.md:908\`/\`:910\`; \`D-123\` item 2: *"a JavaScript function crosses at no depth"*): the `
      + `trigger element read ${JSON.stringify(triggerMembers)}`);
  assert.equal(watched.calls.length, 1,
    `and the listener fires at a caller's write (the liveness half): ${watched.calls.length}`);

  // ── (d) `listen`/`register` THEMSELVES DELIVER NOTHING. ───────────────────────────────────────────────
  {
    const quiet = make();
    let fires = 0;
    const before = fires;
    const bound = quiet.listen('Q', [['z']]);
    quiet.register(bound, () => { fires += 1; });
    assert.equal(fires - before, 0,
      `**\`instance.listen\`/\`register\` DELIVER NOTHING — THEY ARE THE LISTENER SURFACE AND NOT A REPAIR'S `
      + `WRITE** (\`PIN-14\` (ii): *"\`instance.listen\`/\`register\` deliver nothing (\`delivery.mjs\`'s `
      + `\`listenOn\` and \`index.mjs:943\`–\`:945\`'s re-arm of a handle's addresses are the listener surface's, `
      + `not a repair's write)"*): the two acts fired ${fires - before} time(s)`);
    quiet.write(['z'], 'mem', 1);
    assert.equal(fires, 1,
      `and the handle does fire at a write, so the zero above is the two acts' own: ${fires}`);
  }

  // ── (e) THE ONE RED LIMB: THE `PIN-8` ADMISSION, WHICH THE UNIT HAS NOT LANDED. ────────────────────────
  const admitted = attempt(() => make({
    listeners: [{
      address: ['a'],
      handle: 'L',
      listener: function listener() {},
    }],
  }));
  assert.equal(admitted.ok, true,
    `**THE THIRD MEMBER IS ADMITTED AND DOES NOT CROSS — \`PIN-8\`'s ONE MOVE, AND THIS CELL'S ONE RED LIMB** `
      + `(\`PIN-8\`: *"the \`cfg.listeners[]\` element gains a third member, \`listener: Listener\`, IT IS `
      + `REQUIRED, AND IT NEVER CROSSES"*; \`D-123\` item 2's *"THE ELEMENT'S THIRD MEMBER IS DROPPED HERE AND `
      + `ONLY HERE"*): the construction answered `
      + `${JSON.stringify(admitted.ok ? 'an instance' : statusOf(admitted.caught))} with message `
      + `${JSON.stringify(admitted.ok ? null : messageOf(admitted.caught))}`);

  t.diagnostic(`CSW-15 · FROZEN SHAPES: instance members ${DECLARED_MEMBERS.length}, addon exports `
    + `${addonNames.length}, trigger element members ${JSON.stringify(triggerMembers)}, `
    + `\`listen\`+\`register\` fires 0, and the \`PIN-8\` admission answered `
    + `${JSON.stringify(admitted.ok ? 'an instance' : statusOf(admitted.caught))}`);
});
