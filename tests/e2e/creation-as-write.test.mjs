// tests/e2e/creation-as-write.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `U-STOREROOM-CREATION-AS-WRITE` — `P-2`'S OWN CELLS: `CAW-1` … `CAW-8`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THE UNIT IS TWO REPAIRS AND THEIR CELLS, AND NOT A BUILD ORDER.** `D-191`'s four steps — build the store,
// check every constraint with its repair flow, save, then fire the listeners — are **the SHIPPED order** since
// `1.11.0` (`D-197` item 1; `docs/L3/creation-as-write/design.md` §0), so nothing here asks for them. What the
// reading found is two LIVE DEFECTS in them, and each is answered by one ruling:
//
// **`D-198` ITEM 1 — THE FILE RULE IS ONE RULE.** *"The file a construction CREATED is removed on EVERY refusal
// the construction reaches after the create, and ONLY that file."* The ground is `A55` read at *"what the
// construction CAUSES"*: the file's existence is caused by this call, the refusal is this call's answer, and no
// caller data is in it. **`D-198` item 1 also re-spells `PIN-12`'s first clause as the PRE-EXISTING-FILE arm** —
// a file the construction did not create is never touched, and one it created never survives a refusal — and
// that re-spelling is why `CAW-3` is the bound this rule keeps rather than an exception to it.
//
// **`D-198` ITEM 2 — THE WALK'S ABSENCE CLASSES ARE THE CREATION'S.** `AddressNotFound` **and**
// `LeafHasNoDownstream` are **absence**; `ReadTargetIsBranch` and a value are **presence**. *"Any other code
// means present"* is the defect and not its shape.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT EACH CELL READS, ONE LINE PER CELL (`docs/L3/creation-as-write/design.md` §6)
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// · `CAW-1` — a rank-`20` refusal over an ABSENT path leaves **no** file (`D-198` item 1). **RED ON THE BYTES
//   THIS UNIT REPLACES**: the post-round conversion threw from a line above the guard's `undo()`, so the created
//   file stood (`CSW-20`, `CSW-19` measured it).
// · `CAW-2` — a rank-`21` refusal over an ABSENT path leaves **no** file. **RED ON THE BYTES THIS UNIT
//   REPLACES**: the delivery seat reached no guard at all (`CSW-10` measured the file standing).
// · `CAW-3` — the guard's bound at the later arms: a PRE-EXISTING file's bytes are unmoved at **both** arms.
//   **GREEN BEFORE AND AFTER**, because a caller's file is never touched — the bound `D-173` bought and
//   `D-198` item 1 keeps.
// · `CAW-4` — a boot carrying NO constraints still fires its adopted listener ONCE (`PIN-6` (i); `D-191` item
//   4(2)). Its reddening change is option (D): route the creation's set through `registration_triggered` and it
//   delivers nothing.
// · `CAW-5` — a scalar above the watched address is SILENT (`D-198` item 2; `D-123` item 3; `PIN-7`). **RED ON
//   THE BYTES THIS UNIT REPLACES**: `registerHolds` read absence as `AddressNotFound` alone, so the
//   `LeafHasNoDownstream` class counted as PRESENT and the listener fired.
// · `CAW-6` — the save count: a `mem` repair leaves the created file at `0` bytes. Its reddening change is the
//   refused `save_state()` at the construction's end (design §4: priced and refused).
// · `CAW-7` — the creation's attempts are UNNAMEABLE: a count crosses and no name does (`D-176`'s `WeakMap`).
//   Its reddening change is any strong holder of the ref.
// · `CAW-8` — the two sets at one instant: a repair landing the STANDING literal fires nothing at that write
//   **and** the adopted listener fires once (`PIN-6` (i) against (ii); `D-195`). Its reddening change is
//   unifying the two, in either direction.
//
// **THE INSTRUMENTS ARE THE HOUSE'S** (`D-17`: the expectation is a literal here and the citation is a
// comment; `D-21`: every cell prints the readings it took and a cell that cannot reach its arm fails AT THE
// ACT). The entry is reached BY PATH (`O4`); the kernel readers `log`/`report` are the barrel's own and
// `kernelFor` is `kernel-foundations.mjs`'s, exactly as this tree's other kernel cells take them. **NO CELL
// ASSERTS AN ORDER WITHIN A STORE'S RETURNED SET** (`DD-22`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { storeCreate } from '../../bindings/js/index.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { log as kernelLog, report as kernelReport } from '../../bindings/js/src/constraint-kernel.mjs';

/** A store at the two REQUIRED `cfg` keys alone (`index.d.ts`, `StoreConfig`), plus the case's own keys. */
const make = (extra = {}) => storeCreate({ journalLength: 32, listeners: [], ...extra });

/** Run `fn`; answer the outcome as a value. Every drive here is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** **THE SURFACE'S ONE THROWN FORM** (`index.d.ts`, `StoreRefusal`: `{status, message, log, address}`). */
const statusOf = (caught) => (caught !== null && typeof caught === 'object' ? caught.status ?? null : null);
const messageOf = (caught) => (caught !== null && typeof caught === 'object' && typeof caught.message === 'string'
  ? caught.message
  : String(caught));

const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), `caw-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
};
const bytesOf = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);
const sizeOf = (path) => (existsSync(path) ? statSync(path).size : null);
const standing = (instance, address) => {
  const read = attempt(() => instance.read(address));
  return read.ok ? { present: true, value: read.value } : { present: false, refused: statusOf(read.caught) };
};

/** **`PIN-8`'s ELEMENT** — the store's own `{address, handle}` record plus the one member this unit's
 *  predecessor added, spelled for its own type (`{address, handle, listener}`). */
const adopted = (address, handle, listener) => ({ address, handle, listener });

/** A body that records its own invocations and the one argument each was handed. */
function watching(label) {
  const calls = [];
  const listener = function listener(...args) {
    calls.push({ label, argCount: args.length, address: args[0] });
  };
  return { listener, calls };
}

/** **THE TWO MEMBERS THIS UNIT'S RANK-`20` AND RANK-`21` ARMS CROSS WITH** (`PIN-5`; `PIN-10`; `D-124` item 2). */
const CONSTRAINT_PASS_REFUSED = 'ConstraintPassRefused';
const LISTENER_BODY_THREW = 'ListenerBodyThrew';
/** **THE WALK'S SECOND ABSENT CLASS** (`src/store.rs:1424`–`:1430`, propagated unconverted at `:2755`–`:2762`;
 *  `D-198` item 2). */
const LEAF_HAS_NO_DOWNSTREAM = 'LeafHasNoDownstream';

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CAW-1` · THE FILE RULE AT RANK `20` — THE ARM THE GUARD'S `undo()` WAS DEAD CODE ON
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CAW-1 · THE FILE RULE AT RANK `20` (`D-198` item 1; `A55`; `D-197` item 2) — a construction whose later round re-carries an already-repaired pair is REFUSED at rank `20` `ConstraintPassRefused`, and the file its exclusive create made is GONE', (t) => {
  // **THE ARM, AT THE BYTES THIS UNIT REPLACES**: the sweep's `catch` converted a later round's rank-`19`
  // verdict into rank `20` by calling `boundaryReject`, **which throws FROM A LINE ABOVE `fileGuard.undo()`**,
  // so that `undo()` was DEAD CODE on this arm and the created file STOOD. **`D-198` item 1 ends that state**:
  // the file a construction created is removed on every refusal it reaches after the create.
  //
  // **THE REPAIRS ARE `mem`-TIER ON PURPOSE**: nothing is saved before the refusal, so the only file this drive
  // can be looking at is the store's own zero-length artefact from step 4b — and `CAW-6` is the control that
  // says the same shape DOES leave that file on a passing arm.
  const { dir, filePath } = scratch('caw1');
  let repairsOfA = 0;
  let repairsOfB = 0;
  const construction = attempt(() => make({
    filePath,
    constraints: [
      {
        address: ['a'],
        id: 'cycle-a',
        constraint: (context) => {
          if (context.value === 'settled') return true;
          return {
            message: 'cycle-a requires `["a"]` to be "settled"',
            repair: (record) => {
              repairsOfA += 1;
              const landed = record.write(['a'], 'mem', repairsOfA > 1 ? 'settled-again' : 'settled');
              return { ok: true, op: landed.op };
            },
          };
        },
      },
      {
        address: ['b'],
        id: 'cycle-b',
        constraint: (context) => {
          if (context.value !== undefined) return true;
          return {
            message: 'cycle-b requires `["b"]` to exist',
            repair: (record) => {
              repairsOfB += 1;
              const landed = record.write(['b'], 'mem', 'seeded');
              // **THE BREAK** — `["a"]` is rewritten below what `cycle-a` admits, so the next round asks
              // `cycle-a` again and it would repair a SECOND time (`PIN-4` (i), (ii)).
              record.write(['a'], 'mem', 'raw');
              return { ok: true, op: landed.op };
            },
          };
        },
      },
    ],
  }));
  const stands = existsSync(filePath);
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  assert.equal(construction.ok, false,
    `**THE DRIVE MUST REACH THE REFUSING ARM** — a construction whose second round would repair an `
      + `already-repaired pair returns NO instance (\`D-125\` item 4): the call answered `
      + `${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))} with A=${repairsOfA} `
      + `B=${repairsOfB} repair(s)`);
  assert.equal(statusOf(construction.caught), CONSTRAINT_PASS_REFUSED,
    `**AND IT IS RANK \`20\` \`ConstraintPassRefused\`** (\`PIN-5\`; \`D-125\` item 4: *"a cycle is an `
      + `inconsistent result"*): the refusal answered ${JSON.stringify(statusOf(construction.caught))} with `
      + `message ${JSON.stringify(messageOf(construction.caught))}`);
  assert.equal(stands, false,
    `**★ AND THE FILE THE CONSTRUCTION CREATED IS GONE** (\`D-198\` item 1: *"the file a construction CREATED is `
      + `removed on EVERY refusal the construction reaches after the create, and ONLY that file"*; \`A55\`: `
      + `*"every construction that fails leaves nothing behind"*): it `
      + `${stands ? `STANDS with ${sizeOf(filePath) === null ? '?' : JSON.stringify(sizeOf(filePath))}` + ' bytes' : 'is absent'}`
      + ` — on the bytes this unit replaces, this arm was the one the guard's \`undo()\` was dead code on, `
      + `because the post-round conversion threw from a line above it`);
  assert.equal(bytes === null, true,
    `and nothing is readable at the path — no image, no partial image, no byte: it read ${JSON.stringify(bytes)}`);

  t.diagnostic(`CAW-1 · THE FILE RULE AT RANK 20: the construction answered `
    + `${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))}; A repaired `
    + `${repairsOfA}× and B ${repairsOfB}×; the path afterwards reads ${JSON.stringify(bytes)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CAW-2` · THE FILE RULE AT RANK `21` — THE ARM THAT REACHED NO GUARD AT ALL
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CAW-2 · THE FILE RULE AT RANK `21` (`D-198` item 1; `PIN-10`; `D-124` item 2) — a creation-fired body that throws REFUSES the construction at `ListenerBodyThrew`, and the file the create made is GONE', (t) => {
  // **THE ARM, AT THE BYTES THIS UNIT REPLACES**: the delivery seat sits AFTER every save and after the
  // listeners are armed, and **it reached no guard at all** — a rank-`21` throw left the created file standing
  // (`CSW-10` measured it). **`D-198` item 1 makes the delivery seat's throw one more refusal the construction
  // reaches after the create**, so it removes the file the create made, and no seat has to remember to say so.
  //
  // **THE SIBLING'S REPAIR IS `mem`-TIER AND THAT IS THE DRIVE'S DESIGN**: it must make the watched address
  // RESOLVE so the body is fired at all (`PIN-6` (i)'s *"the addresses that RESOLVE"*), and it must save
  // nothing, so the only file in the reading is the create's own.
  const { dir, filePath } = scratch('caw2');
  const thrownBody = new Error('the creation-fired listener throws');
  let repairs = 0;
  const construction = attempt(() => make({
    filePath,
    listeners: [adopted(['k'], 'L', () => { throw thrownBody; })],
    constraints: [{
      address: ['k'],
      id: 'passing-sibling',
      constraint: (context) => (context.value !== undefined
        ? true
        : {
          message: '`["k"]` must exist',
          repair: (record) => {
            repairs += 1;
            return { ok: true, op: record.write(['k'], 'mem', 'seeded-by-sibling').op };
          },
        }),
    }],
  }));
  const stands = existsSync(filePath);
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  assert.equal(repairs, 1,
    `**THE DRIVE MUST REACH THE DELIVERY SEAT** — the sibling's one repair is what makes \`['k']\` resolve: it `
      + `repaired ${repairs}×`);
  assert.equal(construction.ok, false,
    `**AND THE BODY'S THROWABLE REFUSES THE ACT** (\`PIN-10\`; \`D-124\` item 2: *"at a creation the caller is `
      + `not yet holding an instance, so the throw refuses the call"*): the call `
      + `${construction.ok ? 'RETURNED AN INSTANCE' : 'refused'}`);
  assert.equal(statusOf(construction.caught), LISTENER_BODY_THREW,
    `**AT THE MINTED RANK \`21\` \`ListenerBodyThrew\`** (\`D-124\` item 2; the closed fail set moved `
      + `\`20 → 21\`): it answered ${JSON.stringify(statusOf(construction.caught))} with message `
      + `${JSON.stringify(messageOf(construction.caught))}`);
  assert.equal(stands, false,
    `**★ AND THE FILE THE CONSTRUCTION CREATED IS GONE** (\`D-198\` item 1; \`A55\`): it `
      + `${stands ? 'STANDS' : 'is absent'} — this is the arm that reached no guard at all on the bytes this unit `
      + `replaces, and \`PIN-10\`'s *"NO ROLLBACK COMPOSES"* is not read as *"nothing is owed"*`);
  assert.equal(bytes === null, true,
    `and nothing is readable at the path: ${JSON.stringify(bytes)}`);

  t.diagnostic(`CAW-2 · THE FILE RULE AT RANK 21: the construction answered `
    + `${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))}; the sibling repaired `
    + `${repairs}×; the path afterwards reads ${JSON.stringify(bytes)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CAW-3` · THE GUARD'S BOUND AT THE LATER ARMS — A CALLER'S FILE IS NEVER TOUCHED (GREEN BEFORE AND AFTER)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CAW-3 · THE GUARD\'S BOUND AT THE LATER ARMS (`D-198` item 1\'s PRE-EXISTING-FILE arm; `D-173`; `CFG-2`) — over a file that was there BEFORE the call, BOTH of the arms this unit newly covers leave the file and its bytes exactly as they stood', (t) => {
  // **THIS CELL IS THE RULE'S BOUND AND IT MUST BE GREEN ON BOTH SIDES OF THE REPAIR** (`D-198` item 3): the
  // guard removes **only** a file this construction created (`state.mjs`'s `existed` test), so a caller's own
  // file is never touched by a refusal — **and that is what `D-198` item 1 re-spelt `PIN-12`'s first clause
  // AS**. The two arms are the ones the rule newly reaches: the rank-`20` conversion, `undo()` was dead code
  // on, and the rank-`21` delivery seat, which reached no guard at all.
  //
  // **BOTH DRIVES KEEP EVERY REPAIR AT THE `mem` TIER**, so no sibling's save writes into the caller's file and
  // *"unmoved"* is a claim about the guard and about nothing else. **`CFG-2` is the same bound one arm over**
  // (a rank-`18` body throw, `SS-9`'s original subject) and this cell is its later-arm sibling.
  const { dir, filePath } = scratch('caw3');
  const seed = make({ filePath });
  seed.write(['a'], 'file', 'the-callers-own');
  seed.write(['k'], 'file', 'the-callers-own-k');
  const before = bytesOf(filePath);

  let repairsOfA = 0;
  const cyclic = attempt(() => make({
    filePath,
    constraints: [
      {
        address: ['a'],
        id: 'cycle-a',
        constraint: (context) => {
          if (context.value === 'settled') return true;
          return {
            message: 'cycle-a requires `["a"]` to be "settled"',
            repair: (record) => {
              repairsOfA += 1;
              return { ok: true, op: record.write(['a'], 'mem', repairsOfA > 1 ? 'settled-again' : 'settled').op };
            },
          };
        },
      },
      {
        address: ['b'],
        id: 'cycle-b',
        constraint: (context) => (context.value !== undefined
          ? true
          : {
            message: 'cycle-b requires `["b"]` to exist',
            repair: (record) => {
              const landed = record.write(['b'], 'mem', 'seeded');
              record.write(['a'], 'mem', 'raw');
              return { ok: true, op: landed.op };
            },
          }),
      },
    ],
  }));
  const afterRank20 = bytesOf(filePath);

  const thrown = attempt(() => make({
    filePath,
    listeners: [adopted(['k'], 'L', () => { throw new Error('the creation-fired listener throws'); })],
    constraints: [{
      address: ['z'],
      id: 'sibling',
      constraint: (context) => (context.value !== undefined
        ? true
        : { message: '`["z"]` must exist', repair: (record) => ({ ok: true, op: record.write(['z'], 'mem', 'mem-only').op }) }),
    }],
  }));
  const afterRank21 = bytesOf(filePath);
  const stands = existsSync(filePath);
  rmSync(dir, { recursive: true, force: true });

  assert.equal(statusOf(cyclic.caught), CONSTRAINT_PASS_REFUSED,
    `**THE FIRST ARM MUST BE THE RANK-\`20\` REFUSAL** (\`PIN-5\`): it answered `
      + `${JSON.stringify(statusOf(cyclic.caught))} with A repaired ${repairsOfA}×`);
  assert.equal(afterRank20 === before, true,
    `**★ AND THE CALLER'S FILE IS UNMOVED BY IT — BYTES AND EXISTENCE** (\`D-198\` item 1: *"a file the `
      + `construction did not create is never touched"*; \`state.mjs\`'s \`existed\` test): before `
      + `${JSON.stringify(before)}, after ${JSON.stringify(afterRank20)}`);
  assert.equal(statusOf(thrown.caught), LISTENER_BODY_THREW,
    `**THE SECOND ARM MUST BE THE RANK-\`21\` REFUSAL** (\`PIN-10\`; \`D-124\` item 2): it answered `
      + `${JSON.stringify(statusOf(thrown.caught))} with message ${JSON.stringify(messageOf(thrown.caught))}`);
  assert.equal(afterRank21 === before, true,
    `**★ AND THE CALLER'S FILE IS UNMOVED BY THAT ONE TOO** — the bound is the RULE's and not an arm's: before `
      + `${JSON.stringify(before)}, after ${JSON.stringify(afterRank21)}`);
  assert.equal(stands, true,
    `and the path still STANDS after both refusals — the file is the caller's and no arm removes it: `
      + `${stands}`);

  t.diagnostic(`CAW-3 · THE GUARD'S BOUND: before ${JSON.stringify(before)}; after the rank-20 arm `
    + `${JSON.stringify(afterRank20)}; after the rank-21 arm ${JSON.stringify(afterRank21)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CAW-4` · A BOOT WITH NO CONSTRAINTS STILL FIRES ONCE — THE CONFORMANCE PIN, NOT THE ARRIVAL
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CAW-4 · A BOOT WITH NO CONSTRAINTS STILL FIRES ONCE (`docs/L3/creation-as-write/design.md` §3 option (B); `PIN-6` (i); `D-191` item 4(2)) — a construction over an EXISTING `filePath`, carrying NO constraints at all, delivers its adopted listener ONCE at the address that resolves, and delivers nothing at one that does not', (t) => {
  // **`D-191` item 4(2)'s question is answered by the SHIPPED SET and by no new rule**: *"a listener fires when
  // the value at its own address is present"*, and the set is `adopted ∩ resolving` (`PIN-6` (i); `D-123` item
  // 3; `D-125` item 1's measured correction). **A boot carrying NO constraints is the drive that says so with
  // nothing else in the frame**: there is no repair, so no `triggered` set exists to fire anything, and a
  // creation that delivered nothing here would deliver nothing on every construction whose register already
  // stands.
  //
  // **THE REDDENING CHANGE IS OPTION (D)** (design §3's table): re-express the delivered set through
  // `registration_triggered`/`triggered_for` — a rule about what a REPAIR moved — and this construction
  // delivers `0`, which is the cell's red. **THE TWO-ADDRESS ARM IS THE CONTROL**: the absent address is silent,
  // so the `1` is not *"fires everything"*.
  const { dir, filePath } = scratch('caw4');
  const seed = make({ filePath });
  seed.write(['a'], 'file', 'standing');
  const present = watching('caw4-present');
  const absent = watching('caw4-absent');
  const construction = attempt(() => make({
    filePath,
    listeners: [
      adopted(['a'], 'PRESENT', present.listener),
      adopted(['nowhere'], 'ABSENT', absent.listener),
    ],
  }));
  rmSync(dir, { recursive: true, force: true });

  assert.equal(construction.ok, true,
    `**THE BOOT MUST RETURN ITS INSTANCE — there is nothing to refuse** (\`D-123\` item 1): it answered `
      + `${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}`);
  assert.equal(present.calls.length, 1,
    `**★ AND THE ADOPTED LISTENER AT THE RESOLVING ADDRESS FIRED EXACTLY ONCE** (\`PIN-6\` (i): the adopted set `
      + `∩ the addresses that RESOLVE; \`D-191\` item 4(2)): it ran ${present.calls.length} time(s) with `
      + `${JSON.stringify(present.calls.map((call) => call.address))} — a creation that fires nothing here is `
      + `option (D)'s failure, measured`);
  assert.equal(present.calls[0]?.argCount, 1,
    `and the invocation takes its ONE argument (\`PIN-6\` (iv)): ${JSON.stringify(present.calls[0]?.argCount)}`);
  assert.deepEqual(present.calls[0]?.address, ['a'],
    `**AND THE ONE ARGUMENT IS THE LISTENER'S OWN WATCHED ADDRESS** (\`PIN-6\` (iv); \`Q-3\`'s default): `
      + `${JSON.stringify(present.calls[0]?.address)}`);
  assert.equal(absent.calls.length, 0,
    `**AND THE ADDRESS THAT DOES NOT RESOLVE IS SILENT** (\`PIN-7\`; \`D-123\` item 3): the listener adopted at `
      + `\`['nowhere']\` ran ${absent.calls.length} time(s)`);

  t.diagnostic(`CAW-4 · THE BOOT WITH NO CONSTRAINTS: the construction `
    + `${construction.ok ? 'returned its instance' : 'refused'}; the resolving address fired `
    + `${present.calls.length}× with ${JSON.stringify(present.calls.map((call) => call.address))}; the absent `
    + `one fired ${absent.calls.length}×`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CAW-5` · A SCALAR ABOVE THE WATCHED ADDRESS IS SILENT — THE WALK'S SECOND ABSENT CLASS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CAW-5 · A SCALAR ABOVE THE WATCHED ADDRESS IS SILENT (`D-198` item 2; `D-197` item 3; `D-123` item 3; `PIN-7`) — a construction over an image standing a SCALAR at `["a"]` delivers NOTHING to a listener adopted at `["a","b"]`, whose own read answers `LeafHasNoDownstream`, and still delivers ONCE at `["a"]`', (t) => {
  // **THE DEFECT THIS CELL IS THE REPAIR OF, AT THE BYTES**: `registerHolds` read absence as
  // `status === 'AddressNotFound'` **and nothing else**, so every other refusing answer counted as PRESENT —
  // and the walk has a THIRD class that is also an absence: **a leaf with segments remaining fails
  // `leaf_has_no_downstream`** (`src/store.rs:1424`–`:1430`), whose status is `LeafHasNoDownstream`, propagated
  // by `read` **unconverted** (`:2755`–`:2762`). **So a creation fired a listener at an address that does not
  // resolve within a scalar** — contradicting `D-123` item 3 (*"No listener is asked to fire for a node that is
  // not there"*), `PIN-7`, and `D-191`'s own ground at once.
  //
  // **`D-198` item 2's sentence is the whole repair**: `AddressNotFound` **and** `LeafHasNoDownstream` are
  // absence; `ReadTargetIsBranch` and a value are presence. **AND THE WITNESS AT `["a"]` IS THE CONTROL**: the
  // zero above is the absent class's zero and not a dead drive's.
  const { dir, filePath } = scratch('caw5');
  const seed = make({ filePath });
  // A SCALAR at `['a']` — from here `['a','b']` can only fail `leaf_has_no_downstream`.
  seed.write(['a'], 'file', 5);
  const leaf = attempt(() => seed.read(['a', 'b']));
  const silent = watching('caw5-scalar-above');
  const witness = watching('caw5-scalar-itself');
  const construction = attempt(() => make({
    filePath,
    listeners: [
      adopted(['a', 'b'], 'BELOW-A-SCALAR', silent.listener),
      adopted(['a'], 'THE-SCALAR', witness.listener),
    ],
  }));
  const stands = construction.ok ? attempt(() => construction.value.read(['a', 'b'])) : null;
  rmSync(dir, { recursive: true, force: true });

  assert.equal(statusOf(leaf.caught), LEAF_HAS_NO_DOWNSTREAM,
    `**THE DRIVE'S PREMISE, MEASURED AT THE STORE'S OWN READ** — \`read(['a','b'])\` over a scalar at `
      + `\`['a']\` answers \`LeafHasNoDownstream\` (\`src/store.rs:1424\`–\`:1430\`; \`L-4\`): it answered `
      + `${JSON.stringify(leaf.ok ? leaf.value : statusOf(leaf.caught))}`);
  assert.equal(construction.ok, true,
    `**THE CONSTRUCTION MUST RETURN ITS INSTANCE — an absent watched address is SILENT and is NOT A REFUSAL** `
      + `(\`PIN-7\`; \`D-123\` item 3): it answered `
      + `${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))}`);
  assert.equal(silent.calls.length, 0,
    `**★ AND THE ADDRESS THAT DOES NOT RESOLVE WITHIN A SCALAR IS SILENT** (\`D-198\` item 2: \`AddressNotFound\` `
      + `AND \`LeafHasNoDownstream\` are ABSENCE; \`D-123\` item 3: *"No listener is asked to fire for a node that `
      + `is not there"*; \`PIN-7\`): the listener adopted at \`['a','b']\` ran ${silent.calls.length} time(s) with `
      + `${JSON.stringify(silent.calls.map((call) => call.address))} — **on the bytes this unit replaces it ran `
      + `ONCE**, because the class counted as PRESENT`);
  assert.equal(witness.calls.length, 1,
    `**AND THE CONTROL FIRES ONCE AT \`['a']\`** — the scalar is a VALUE and a value is PRESENCE (\`D-198\` item `
      + `2): it ran ${witness.calls.length} time(s) with ${JSON.stringify(witness.calls.map((call) => call.address))}`);
  assert.equal(statusOf(stands === null ? null : stands.caught), LEAF_HAS_NO_DOWNSTREAM,
    `and the returned instance's own read of \`['a','b']\` answers the same class the silence was read at: `
      + `${JSON.stringify(stands === null ? null : (stands.ok ? stands.value : statusOf(stands.caught)))}`);

  t.diagnostic(`CAW-5 · THE SCALAR ABOVE: \`read(['a','b'])\` answered `
    + `${JSON.stringify(leaf.ok ? leaf.value : statusOf(leaf.caught))}; the listener at \`['a','b']\` ran `
    + `${silent.calls.length}×; the one at \`['a']\` ran ${witness.calls.length}×`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CAW-6` · THE SAVE COUNT — A `mem` REPAIR LEAVES THE CREATED FILE AT `0` BYTES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CAW-6 · THE SAVE COUNT (`D-198` item 1 against the refused `save_state()`; `D-106` item 3; design §4) — a construction over an ABSENT `filePath` whose one repair writes at the `mem` tier RETURNS its instance, leaves the created file at `0` bytes, and a fresh boot over that path reads nothing there', (t) => {
  // **THE DOUBLING THE DESIGN PRICED AND REFUSED, HELD OUT BY MEASUREMENT**: a whole-register `save_state()`
  // added at the construction's end would write the image on a construction that moved no durable datum, and
  // the corpus's own inert boot arm shows what that costs (design §4; `D-106` arm 2 has no subject at the
  // creation's own act). **SO THE CELL'S REDDENING CHANGE IS THAT LINE** — add `save_state()` anywhere in the
  // construction and this file stops being empty, because the `file` tier's image is the whole register's.
  //
  // **AND THE SECOND LIMB IS THE SAVE'S ELIGIBILITY**: a `mem` landing is not a `file` landing, so the
  // registration's close owes no save (`kernel-registration.mjs:1098`–`:1116`) — and the value, being memory's,
  // is in no byte a later boot can read.
  const { dir, filePath } = scratch('caw6');
  let repairs = 0;
  const construction = attempt(() => make({
    filePath,
    constraints: [{
      address: ['a'],
      id: 'memory-only',
      constraint: (context) => (context.value !== undefined
        ? true
        : {
          message: '`["a"]` must exist',
          repair: (record) => {
            repairs += 1;
            return { ok: true, op: record.write(['a'], 'mem', 'mem-only').op };
          },
        }),
    }],
  }));
  const size = sizeOf(filePath);
  const bytes = bytesOf(filePath);
  const stillStands = construction.ok ? standing(construction.value, ['a']) : null;
  const fresh = attempt(() => make({ filePath }));
  const freshReads = fresh.ok ? standing(fresh.value, ['a']) : null;
  rmSync(dir, { recursive: true, force: true });

  assert.equal(construction.ok, true,
    `**THE CONSTRUCTION MUST RETURN ITS INSTANCE — the repair satisfies its own pair** (\`D-123\` item 1; `
      + `\`PIN-4\` (iii)): it answered `
      + `${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}`);
  assert.equal(repairs, 1,
    `and its pair repaired exactly once: ${repairs}`);
  assert.deepEqual(stillStands, { present: true, value: 'mem-only' },
    `**THE REPAIRED VALUE IS IN THE RETURNED REGISTER** (\`D-123\` item 1): \`read(['a'])\` on it answered `
      + `${JSON.stringify(stillStands)}`);
  assert.equal(size, 0,
    `**★ AND THE CREATED FILE IS \`0\` BYTES — the exclusive create's own artefact and NO SAVE** `
      + `(\`D-106\` item 3: one save per registration that moved \`file\`-tier data; \`contract.md §10.4\` part 3: `
      + `*"a successful exclusive create produces AN EMPTY FILE AND NO BYTE"*): it read `
      + `${JSON.stringify(size)} byte(s), ${JSON.stringify(bytes)}`);
  assert.deepEqual(freshReads, { present: false, refused: 'AddressNotFound' },
    `**AND A FRESH BOOT OVER THAT PATH READS NOTHING THERE — a \`mem\` landing is in no byte** `
      + `(\`FileImage::NoImage\`; \`DD-38\`): it answered ${JSON.stringify(freshReads)}`);

  t.diagnostic(`CAW-6 · THE SAVE COUNT: the construction returned its instance after ${repairs} repair(s); the `
    + `created file reads ${JSON.stringify(size)} byte(s) (${JSON.stringify(bytes)}); a fresh boot reads `
    + `${JSON.stringify(freshReads)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CAW-7` · THE CREATION'S ATTEMPTS ARE UNNAMEABLE — A COUNT CROSSES AND NO NAME DOES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

/// **THE PROBE IS ITS OWN FILE, AND THIS CELL READS WHAT IT PRINTED.** `D-176`'s two forms are
/// reachability's: `kernel.closed` is a **`WeakMap` keyed by the ref OBJECT**, and the id form reaches a ref only
/// through a **`WeakRef`** — so *"the report is gone when the ref is"* can only be OBSERVED once a collector has
/// run, and `npm test` passes no `--expose-gc`. **The device is `KAW-3`'s** (`tests/e2e/kernel-attempt-window.test.mjs`:
/// one child, one flag), and the probe lives in `creation-as-write-support.mjs` rather than in this file because
/// **a probe branch inside a file that also registers `test()` cells yields at its first `await` and the runner
/// then runs those cells in the child** — the file's own reason, stated there.
const CAW7 = JSON.parse(execFileSync(process.execPath, [
  '--expose-gc',
  fileURLToPath(new URL('./creation-as-write-support.mjs', import.meta.url)),
  '--caw7-probe',
], {
  encoding: 'utf8',
  timeout: 120000,
  maxBuffer: 4 * 1024 * 1024,
}).trim().split('\n').pop());

test('CAW-7 · THE CREATION\'S ATTEMPTS ARE UNNAMEABLE (`D-197` item 4; `D-58` item 2; `D-175`/`D-176`) — the construction opens attempts and NOTHING NAMES ONE: the count crosses, the id form answers a closed attempt only while its ref lives, and after the frame pops both `log` and `report` answer `KC-2`', (t) => {
  // **`D-197` item 4, VERBATIM**: *"a creation's attempts are UNNAMEABLE — `kernel.closed` is a `WeakMap` keyed
  // by the ref object, the attempt frame is its only strong holder, so `log`/`report` on `attempt-<n>` answer
  // `KC-2` after the frame pops."* **The id is guessable and the id is not a name**: `attempt-<n>` is a STRING
  // any caller can spell, and what it reaches is a `WeakRef` — so the only observable a caller has of a
  // creation's attempts is the COUNT'S INCREMENT.
  //
  // **THE REDDENING CHANGE IS ANY STRONG HOLDER OF THE REF** — a receipt carried out on the instance, a strong
  // `Map` in place of `closedIds`, or a report handed to the caller: each keeps the ref (and with it the report)
  // alive past the frame, and the `KC-2` limb below turns into a closed attempt's answer.
  assert.equal(CAW7.gc, true,
    `the probe must run under --expose-gc, or the reading below is not about reachability at all: ${JSON.stringify(CAW7)}`);
  assert.equal(CAW7.attempts >= 1, true,
    `**★ THE ATTEMPTS EXIST — THAT IS THE COUNT** (\`D-58\` item 2's bound read forward; \`PIN-14\` (i): no `
      + `\`AttemptRef\` is minted for a caller): the probe read ${JSON.stringify(CAW7.attempts)}`);
  assert.equal(CAW7.live, 0,
    `**AND NO ATTEMPT IS LEFT OPEN AT THE ANSWER** — the construction's attempts closed with it (\`P-CSW-3\``
      + `(iii)'s own observation): the live map held ${JSON.stringify(CAW7.live)}`);
  assert.equal(CAW7.before, 'closed-empty',
    `**THE STRING FORM ANSWERS WHILE ITS REF LIVES, WITH THE CLOSED ATTEMPT'S EMPTY LOG** (\`D-58\`: the log `
      + `crossed with the report; \`parameter-semantics.md §2.15\`'s two forms): it answered `
      + `${JSON.stringify(CAW7.before)}`);
  assert.equal(CAW7.logAfter, 'KC-2',
    `**★ AND AFTER THE FRAME POPS AND THE REF IS COLLECTED, \`log\` ANSWERS \`KC-2\`** (\`D-175\`; \`D-176\`;`
      + `\`fail-surface.md §2\`'s \`KC-2\` row — the same refusal a PRUNED id meets): it answered `
      + `${JSON.stringify(CAW7.logAfter)}`);
  assert.equal(CAW7.reportAfter, 'KC-2',
    `**AND SO DOES \`report\` — THE TWO FORMS CAN NEVER DISAGREE ABOUT WHETHER THE ATTEMPT IS STILL ANSWERABLE**`
      + ` (\`D-175\`: one lifetime, reachability's): it answered ${JSON.stringify(CAW7.reportAfter)}`);
  assert.equal(CAW7.again, 'KC-2',
    `and a second collect round reads the same, so the answer is the state and not the collector's mood: `
      + `${JSON.stringify(CAW7.again)}`);

  t.diagnostic(`CAW-7 · UNNAMEABLE: the construction opened ${JSON.stringify(CAW7.attempts)} attempt(s) with `
    + `${JSON.stringify(CAW7.live)} left live; \`attempt-1\` answered ${JSON.stringify(CAW7.before)} before the `
    + `collect and ${JSON.stringify([CAW7.logAfter, CAW7.reportAfter])} after it`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CAW-8` · THE TWO SETS AT ONE INSTANT — THE REPAIR'S WRITE AND THE CREATION'S SEAT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CAW-8 · THE TWO SETS AT ONE INSTANT (`PIN-6` (i) against (ii); `D-193`/`D-195`; `D-198` item 2) — in ONE construction a repair that lands the literal `["a"]` already answers fires NOTHING at that write, and the adopted listener at `["a"]` fires ONCE, from the creation\'s own seat', (t) => {
  // **TWO SETS, TWO INSTANTS, ONE ORDER, AND THE TWO MUST NOT BE READ AS ONE.** `PIN-6` (i) is the creation's
  // seat: `adopted ∩ resolving`, computed from the REGISTER and not from any write. `PIN-6` (ii) is a repair's
  // own `triggered` — *"the store's own `triggered`"* — and `P-3`'s rule (`D-193` item 1: *"the comparison is on
  // ONE LITERAL"*) makes a write that lands the literal the address ALREADY answers fire nothing at it.
  //
  // **SO THE CELL DRIVES BOTH AT ONCE AND PRINTS THEM**: the repair lands `["a"] = "V"` where `"V"` already
  // stands — its own returned record reads `watched: []` and `triggered: []` — while the adopted listener at
  // `["a"]` is delivered ONCE by the creation's seat. **THE REDDENING CHANGE IS THE UNIFICATION, IN EITHER
  // DIRECTION** (design §9 item 8): express the creation's set as the repairs' `triggered` and the `1` becomes
  // `0`; hand the repair's set the creation's seat and a repair that changes the literal would fire the same
  // address twice.
  const { dir, filePath } = scratch('caw8');
  const seed = make({ filePath });
  seed.write(['a'], 'file', 'V');
  const witness = watching('caw8-adopted');
  let repairWrite = null;
  const construction = attempt(() => make({
    filePath,
    listeners: [adopted(['a'], 'ADOPTED', witness.listener)],
    constraints: [{
      address: ['b'],
      id: 'standing-literal',
      constraint: (context) => (context.value !== undefined
        ? true
        : {
          message: '`["b"]` must exist',
          repair: (record) => {
            // **THE WRITE UNDER TEST**: the literal `["a"]` already answers, at the tier it stands at.
            const landed = record.write(['a'], 'file', 'V');
            repairWrite = {
              watched: landed.watched,
              triggered: landed.triggered,
              value: landed.op?.after?.value,
            };
            // **AND THE PAIR'S OWN ADDRESS IS SATISFIED**, so the repair is the pair's ONLY one (`PIN-4` (iii)).
            return { ok: true, op: record.write(['b'], 'file', 'seeded').op };
          },
        }),
    }],
  }));
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  assert.equal(construction.ok, true,
    `**THE CONSTRUCTION MUST RETURN ITS INSTANCE** (\`D-123\` item 1): it answered `
      + `${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}`);
  assert.deepEqual(repairWrite?.watched, [],
    `**★ THE REPAIR'S WRITE NAMED NO WATCHED ADDRESS — it landed the literal \`["a"]\` already answered** `
      + `(\`D-193\` item 1; \`D-195\`'s narrowed pass; \`P-TP-8\` (a)/(e)'s one predicate): the record read `
      + `${JSON.stringify(repairWrite)}`);
  assert.deepEqual(repairWrite?.triggered, [],
    `**AND IT TRIGGERED NOTHING AT THAT WRITE** (\`PIN-6\` (ii): the set is the store's own returned `
      + `\`triggered\`): ${JSON.stringify(repairWrite)}`);
  assert.equal(witness.calls.length, 1,
    `**★ AND THE ADOPTED LISTENER AT \`["a"]\` FIRED EXACTLY ONCE — FROM THE CREATION'S SEAT** (\`PIN-6\` (i): `
      + `the adopted set ∩ the addresses that RESOLVE; \`D-123\` item 3): it ran ${witness.calls.length} time(s) `
      + `with ${JSON.stringify(witness.calls.map((call) => call.address))} — **the repair's empty set and this `
      + `seat's one delivery are TWO SETS and the cell is the pair of readings, not one of them**`);
  assert.deepEqual(witness.calls[0]?.address, ['a'],
    `and its ONE argument is its own watched address (\`PIN-6\` (iv)): `
      + `${JSON.stringify(witness.calls[0]?.address)}`);
  assert.equal(witness.calls[0]?.argCount, 1,
    `and it carries exactly one argument: ${JSON.stringify(witness.calls[0]?.argCount)}`);
  assert.equal(String(bytes).includes('"b":"seeded"'), true,
    `and both landings stand in the image — the pair's own address and the standing literal, one save `
      + `(\`D-106\` item 3): the file read ${JSON.stringify(bytes)}`);

  t.diagnostic(`CAW-8 · TWO SETS AT ONE INSTANT: the repair's write read `
    + `${JSON.stringify(repairWrite)}; the adopted listener ran ${witness.calls.length}× with `
    + `${JSON.stringify(witness.calls.map((call) => call.address))}; the bytes read ${JSON.stringify(bytes)}`);
});
