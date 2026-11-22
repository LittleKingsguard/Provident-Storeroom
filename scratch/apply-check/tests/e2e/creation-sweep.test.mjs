// tests/e2e/creation-sweep.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `U-STOREROOM-CREATION-SWEEP` — GATE 3, THE SWEEP AND ITS TERMINATOR: `CSW-01`, `CSW-02`, `CSW-03`,
// `CSW-20`, `CSW-22` and the property row `P-CSW-1`. **EVERY CELL HERE IS `e` (e2e): `storeCreate` at the
// package's own surface, with a `filePath` where a save is the subject.** THE DECLARATION IS
// `docs/L1/creation-sweep.md` `§2`'s pins and `§4`'s statements, read THROUGH `strata/decisions.md` `D-124`
// and `D-125` — the two rows that superseded `PIN-4`'s round cap and re-placed the repeat arm.
//
// **THE RULING THE CELLS CARRY, IN THE ARCHITECT'S WORDS.** `D-123` item 1: *"A sweep of the whole register,
// refusing an inconsistent result"*. `D-124` item 1: *"This should already follow cycle detection, the same
// constraint should not attempt a repair twice"* — **THE ROUND CAP (`1` = retired)**, and *"A pair may land AT
// MOST ONE REPAIR in a construction."* `D-125` item 4: *"Refuse the construction at rank 20 — a cycle is an
// inconsistent result"* and *"A pair asked again after its own repair and PASSING is not a cycle — asking is
// not repairing."*
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE FIVE FACTS EVERY CELL BELOW RESTS ON, EACH AT ITS PIN
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **1 · THE SWEEP IS `CARRY → REPEAT A ROUND UNTIL A ROUND LANDS NO REPAIR`** (`PIN-4` (iv): *"THE SWEEP ENDS
// ON THE FIRST ROUND THAT LANDS NO REPAIR, and it needs no number to end"*). **A round asks every admitted
// pair at most once** (`PIN-4` (i), (ii)), **and a pair asked again in a later round is asked through the
// registration route's own `carryConstraint`, so it is asked exactly as it was asked the first time.**
//
// **2 · A PAIR MAY REPAIR AT MOST ONCE, AND A SECOND REPAIR IS THE CYCLE** (`D-124` item 1; `D-125` item 4).
// The detector's mark is ONE APPLIED-REPAIR BIT PER ADMITTED PAIR and nothing else (`PIN-4`'s marker clause;
// `PIN-14` (i): *"THE SWEEP INHERITS THE MARKER AND NOT THE BUDGET"*). **NO ROUND COUNT IS ASSERTED ANYWHERE
// IN THIS FILE** — `§4` `CSW-02`: *"a cell that prints `3` asserts a cap the ruling retired"* — so every cell
// that counts repairs counts them against the ADMITTED PAIRS and never against a round.
//
// **3 · AN INCONSISTENT RESULT THROWS INSTEAD OF RETURNING AN INSTANCE** (`D-123` item 1; `PIN-5`: **rank
// `20` `ConstraintPassRefused` CARRIES BOTH THE CYCLE AND THE POST-ROUND INCONSISTENCY**, its trigger
// arm-neutral by its own row — *"the state this act would leave is not one the registered constraints
// admit"*, `contract.md:4652`)**, and the form is the one the construction already crosses: *"a caller of
// `storeCreate` receives it INSTEAD OF an instance"* (`kernel-registration.mjs:989`–`:990`).
//
// **4 · A PAIR ASKED AGAIN AND PASSING IS NOT A CYCLE** (`D-125` item 4). It is the ask that makes an
// inconsistent result decidable at all, and `CSW-22` is the cell that keeps `CSW-19`'s detector from being
// read as "a second ask is a cycle".
//
// **5 · A REFUSED CREATION LEAVES THE STORE'S OWN CREATED FILE AND EVERY EARLIER SIBLING REGISTRATION'S
// ALREADY-SAVED LANDING STANDING, AND NO REMOVAL ARM IS DECLARED** (`PIN-12`; `D-107`'s rollback is per
// route), so `CSW-20` reads the bytes a fresh instance over the same `filePath` finds.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE INSTRUMENTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **`D-17`.** No cell opens a document at runtime: the expectation is a literal here and the citation is a
// comment. **`D-21`.** Every cell prints the readings it took at its own `t.diagnostic`, drives its arm
// through `attempt()` (the outcome of an act handed back as a value, never an assertion), and **where a cell
// cannot reach its arm it fails at the act and prints the refusal it caught** rather than passing vacuously.
// The only imports are the entry by path (this project's `O4` route) and `node:`'s own modules.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

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
const logKinds = (caught) => (caught !== null && typeof caught === 'object' && Array.isArray(caught.log)
  ? caught.log.map((entry) => (entry !== null && typeof entry === 'object' ? entry.kind : entry))
  : null);

/** **THE CLOSED SET THE REFUSAL'S `log` ENTRIES COME FROM** (`index.d.ts`, `LogEntry.kind`) — `PIN-14`: the
 *  sweep mints no log kind of its own, so an entry outside these four is a finding. */
const LOG_KINDS = ['constraint-check', 'repair-run', 'commit', 'outcome'];

/** The store's own closed status at the two members the sweep's refusals cross with (`index.d.ts`, rank `20`
 *  the pass's own and rank `19` the registration instant's — `PIN-5`, and `Q-11`'s carried reading). */
const CONSTRAINT_PASS_REFUSED = 'ConstraintPassRefused';
const CONSTRAINT_REFUSED_AT_REGISTRATION = 'ConstraintRefusedAtRegistration';

const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), `csw-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
};
const bytesOf = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);
const standing = (instance, address) => {
  const read = attempt(() => instance.read(address));
  return read.ok ? { present: true, value: read.value } : { present: false, refused: statusOf(read.caught) };
};

/** **A PAIR'S ADDRESS READ AS A SET AND NEVER AS A SEQUENCE** — `constraints()` answers the store's own
 *  set-of-one encoding (`{address: [[...]]}`), which this reads back to a comparable form. */
const addressSet = (address) => {
  const members = Array.isArray(address) && Array.isArray(address[0]) ? address : [address];
  return members.map((member) => member.join('/')).sort();
};

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-01` · THE CONVERGENCE — the `C-13` DEFECT CLOSED
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-01 · THE CONVERGENCE (`PIN-4` (iii), (iv); `D-123` item 1) — a construction carrying pair `1` and pair `3`, where pair `3`\'s repair rewrites the very address pair `1` answered over: pair `1` is ASKED AGAIN IN THE NEXT ROUND and PASSES rather than repairing, and the returned instance\'s register satisfies BOTH pairs', (t) => {
  // **THE `C-13` DEFECT, IN ONE SENTENCE**: every pair the construction carries is asked once, at its own
  // registration, and never again — so a repair pair `3` lands can leave the register in a state pair `1`
  // would refuse, and the instance is returned anyway. **`D-123` item 1 supersedes the instant's own
  // *"THAT ONE PAIR and no other"* scope at the creation**, and `PIN-4` (iv) ends the sweep on the first round
  // that lands no repair — so after pair `3`'s repair lands, pair `1` is asked again, and it is asked against
  // the state the repair left.
  const asks = [];
  let repairsOfPair1 = 0;
  let repairsOfPair3 = 0;
  const construction = attempt(() => make({
    constraints: [
      {
        address: ['a'],
        id: 'pair-1',
        constraint: (context) => {
          asks.push({ id: 'pair-1', value: context.value });
          // **PAIR 1 ADMITS AN ABSENT NODE AND THE VALUE PAIR 3'S REPAIR WILL LAND** — so its own
          // registration passes and its re-ask can only be a PASS (`PIN-4` (iii)).
          if (context.value === undefined || context.value === 'ok') return true;
          return {
            message: 'pair 1 requires `["a"]` to be absent or "ok"',
            repair: (record) => {
              repairsOfPair1 += 1;
              return { ok: true, op: record.write(['a'], 'mem', 'ok').op };
            },
          };
        },
      },
      {
        address: ['b'],
        id: 'pair-3',
        constraint: (context) => {
          asks.push({ id: 'pair-3', value: context.value });
          if (context.value !== undefined) return true;
          return {
            message: 'pair 3 requires `["b"]` to exist',
            repair: (record) => {
              repairsOfPair3 += 1;
              // **THE ONE ACT THIS CELL IS ABOUT**: the repair seeds `["b"]` AND rewrites `["a"]`, which is the
              // state pair 1 answered over. The register it leaves is consistent — which is exactly what makes
              // this a CONVERGENCE and not the cycle `CSW-02` drives.
              const landed = record.write(['b'], 'mem', 'seeded').op;
              record.write(['a'], 'mem', 'ok');
              return { ok: true, op: landed };
            },
          };
        },
      },
    ],
  }));
  const constructionStatus = construction.ok ? null : statusOf(construction.caught);
  const pair1Asks = asks.filter((ask) => ask.id === 'pair-1');
  const registerA = construction.ok ? standing(construction.value, ['a']) : null;
  const registerB = construction.ok ? standing(construction.value, ['b']) : null;

  // ── (a) THE DRIVE REACHED ITS ARM. ────────────────────────────────────────────────────────────────────
  assert.equal(construction.ok, true,
    `**THE CONSTRUCTION MUST RETURN AN INSTANCE — the register pair 3\'s repair leaves is one BOTH pairs `
      + `admit** (\`D-123\` item 1: the act refuses an INCONSISTENT result and this one is consistent): the `
      + `call answered ${JSON.stringify(constructionStatus)} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))} and log `
      + `${JSON.stringify(construction.ok ? null : logKinds(construction.caught))}`);
  assert.equal(repairsOfPair3, 1,
    `**PAIR 3 MUST HAVE REPAIRED ONCE** — the repair that rewrites \`["a"]\` is this cell\'s whole premise: `
      + `it ran ${repairsOfPair3} time(s)`);

  // ── (b) THE SUBJECT: PAIR 1 IS ASKED AGAIN IN THE NEXT ROUND, AND ITS OWN REPAIR NEVER RUNS. ──────────
  assert.equal(pair1Asks.length >= 2, true,
    `**PAIR 1 IS ASKED AGAIN IN THE NEXT ROUND** (\`PIN-4\` (iv): the sweep ends on the first round that lands `
      + `no repair, so a round that landed pair 3\'s repair is followed by another; \`D-123\` item 1: the creation `
      + `sweeps the whole register and not one pair): the drive recorded ${pair1Asks.length} ask(s) of pair 1, `
      + `with ${JSON.stringify(pair1Asks.map((ask) => ask.value))} — **TODAY THE TREE ASKS EVERY CARRIED PAIR `
      + `EXACTLY ONCE, AT ITS OWN REGISTRATION, AND NEVER AGAIN**`);
  assert.equal(pair1Asks[pair1Asks.length - 1].value, 'ok',
    `**AND THE RE-ASK IS AGAINST THE STATE THE REPAIR LEFT** (\`PIN-4\` (iv); \`D-123\` item 1): the last ask `
      + `read ${JSON.stringify(pair1Asks[pair1Asks.length - 1].value)} where the repair had written \`"ok"\``);
  assert.equal(repairsOfPair1, 0,
    `**AND THAT ASK PASSES RATHER THAN REPAIRING — *"asking is not repairing"*** (\`D-125\` item 4; \`PIN-4\` `
      + `(iii)): pair 1\'s repair ran ${repairsOfPair1} time(s), and a run here would be the cell asserting the `
      + `wrong convergence`);

  // ── (c) THE REGISTER SATISFIES BOTH PAIRS AT THE ANSWER. ──────────────────────────────────────────────
  assert.deepEqual(registerA, { present: true, value: 'ok' },
    `**THE RETURNED INSTANCE\'S REGISTER SATISFIES PAIR 1** (\`D-123\` item 1: *"cannot return an instance `
      + `whose register still violates one of them"*): \`read(["a"])\` = ${JSON.stringify(registerA)}`);
  assert.deepEqual(registerB, { present: true, value: 'seeded' },
    `and it satisfies pair 3: \`read(["b"])\` = ${JSON.stringify(registerB)}`);
  assert.deepEqual(construction.value.constraints().map((row) => addressSet(row.address)).sort(),
    [['a'], ['b']],
    `and both pairs are named by \`constraints()\` (\`PIN-3\`: the sweep\'s subject is the register): `
      + `${JSON.stringify(construction.value.constraints())}`);

  t.diagnostic(`CSW-01 · THE CONVERGENCE: pair 1 was asked ${pair1Asks.length}× with `
    + `${JSON.stringify(pair1Asks.map((ask) => ask.value))} and its repair ran ${repairsOfPair1}×; pair 3 `
    + `repair ran ${repairsOfPair3}×; the register reads ${JSON.stringify({ a: registerA, b: registerB })}; `
    + `\`constraints()\` = ${JSON.stringify(construction.value.constraints())}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-02` · THE CYCLE, RESTATED — THE CONSTRUCTION REFUSES, AND NO ROUND COUNT IS ASSERTED
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-02 · THE CYCLE (`PIN-4` (i), (ii); `PIN-5`; `D-124` item 1; `D-125` item 4) — two pairs whose repairs break each other: the construction is REFUSED, no instance is returned, the refusal carries rank `20` `ConstraintPassRefused`, **each pair repaired AT MOST ONCE**, and NO ROUND COUNT IS ASSERTED ANYWHERE', (t) => {
  // **THE TERMINATOR IS THE APPLIED-REPAIR RULE AND NOT A ROUND CAP** (`D-124` item 1, verbatim: *"THE SWEEP\'S
  // TERMINATOR IS THE APPLIED-REPAIR RULE, NOT A ROUND CAP — AND `PIN-4`\'s \'capped at three\' IS SUPERSEDED"*;
  // *"THE ROUND CAP (`1` = retired)"*). **So this cell counts REPAIRS AGAINST THE ADMITTED PAIRS and prints no
  // round counter**: `§4` `CSW-02` forbids a cell that prints `3`, because printing it would assert the cap the
  // ruling retired. **THE DETECTION IS WHAT THE REFUSAL PROVES**, and the two `≤ 1` readings below are what
  // prove the sweep did not simply loop until a budget ran out.
  let repairsA = 0;
  let repairsB = 0;
  const construction = attempt(() => make({
    constraints: [
      {
        address: ['a'],
        id: 'mutual-a',
        constraint: (context) => {
          if (context.value === 'ok') return true;
          return {
            message: 'mutual-a requires `["b"]` to be "ok"',
            repair: (record) => {
              repairsA += 1;
              const landed = record.write(['b'], 'mem', 'ok').op;
              // **AND IT BREAKS THE OTHER PAIR IN THE SAME WRITE**, so the round it lands in cannot be the last.
              record.write(['a'], 'mem', 'bad');
              return { ok: true, op: landed };
            },
          };
        },
      },
      {
        address: ['b'],
        id: 'mutual-b',
        constraint: (context) => {
          if (context.value === 'ok') return true;
          return {
            message: 'mutual-b requires `["a"]` to be "ok"',
            repair: (record) => {
              repairsB += 1;
              const landed = record.write(['a'], 'mem', 'ok').op;
              record.write(['b'], 'mem', 'bad');
              return { ok: true, op: landed };
            },
          };
        },
      },
    ],
  }));
  const refused = construction.ok === false;
  const refusalStatus = refused ? statusOf(construction.caught) : null;
  const refusalLog = refused ? logKinds(construction.caught) : null;

  // ── (a) THE CYCLE REFUSES. ────────────────────────────────────────────────────────────────────────────
  assert.equal(refused, true,
    `**THE CONSTRUCTION MUST BE REFUSED — a second repair attempt is an inconsistent result** `
      + `(\`D-125\` item 4: *"Refuse the construction at rank 20 — a cycle is an inconsistent result"*; `
      + `\`D-124\` item 1: *"A pair may land AT MOST ONE REPAIR in a construction"*): **THE CALL RETURNED AN `
      + `INSTANCE**, with \`constraints()\` = `
      + `${JSON.stringify(construction.ok ? construction.value.constraints() : null)} — TODAY\'S TREE HAS NO `
      + `DETECTOR AND NO SWEEP, so the mutual break is simply never noticed`);

  // ── (b) THE REFUSAL CARRIES `PIN-5`'S MEMBER. ─────────────────────────────────────────────────────────
  assert.equal(refusalStatus, CONSTRAINT_PASS_REFUSED,
    `**AND IT CARRIES RANK \`20\` \`ConstraintPassRefused\`** (\`PIN-5\`: *"RANK \`20\` CARRIES BOTH THE CYCLE `
      + `AND THE POST-ROUND INCONSISTENCY; at the creation and the boot it refuses the construction"*; its `
      + `trigger is arm-neutral by its own row — \`contract.md:4652\`): the refusal answered `
      + `${JSON.stringify(refusalStatus)} with message ${JSON.stringify(refused ? messageOf(construction.caught) : null)}`);
  assert.equal(Array.isArray(refusalLog), true,
    `and it crosses with the surface\'s four-member form, whose \`log\` is never absent (\`index.d.ts\`, `
      + `\`StoreRefusal\`): ${JSON.stringify(refusalLog)}`);

  // ── (c) THE TERMINATOR WAS THE MARKER, NOT A BUDGET — AND NO ROUND COUNT IS PRINTED. ──────────────────
  assert.equal(repairsA <= 1, true,
    `**PAIR A REPAIRED AT MOST ONCE** (\`PIN-4\` (i): *"A pair may land AT MOST ONE REPAIR in a construction"*; `
      + `\`D-124\` item 1): it repaired ${repairsA} time(s) — a second run is the very attempt the detector exists `
      + `to refuse`);
  assert.equal(repairsB <= 1, true,
    `and pair B repared at most once: it repaired ${repairsB} time(s)`);
  assert.equal(repairsA + repairsB <= 2, true,
    `**AND THE CONSTRUCTION\'S REPAIRS NUMBER AT MOST THE ADMITTED PAIRS, WHICH IS THE ARITHMETIC THAT `
      + `REPLACED THE CAP** (\`D-124\` item 1: *"every round that continues the sweep lands at least one repair, `
      + `no pair repairs twice, so the repairs number at most the admitted pairs"*): ${repairsA + repairsB} `
      + `repair(s) over 2 admitted pairs — **and NO ROUND COUNT IS ASSERTED HERE, because a cell that printed `
      + `\`3\` would assert the cap \`D-124\` retired** (\`§4\` \`CSW-02\`)`);
  for (const kind of refusalLog ?? []) {
    assert.equal(LOG_KINDS.includes(kind), true,
      `**THE REFUSAL MINTS NO LOG KIND** (\`PIN-14\`: the sweep inherits the marker and nothing else): the `
        + `crossed entry \`${JSON.stringify(kind)}\` is outside the kernel\'s closed four `
        + `${JSON.stringify(LOG_KINDS)}`);
  }

  t.diagnostic(`CSW-02 · THE CYCLE: the construction answered ${JSON.stringify(refusalStatus)} with log `
    + `${JSON.stringify(refusalLog)} and message `
    + `${JSON.stringify(refused ? messageOf(construction.caught) : null)}; pair A repaired ${repairsA}× and `
    + `pair B ${repairsB}× over 2 admitted pairs. **NO ROUND COUNT IS ASSERTED** — \`D-124\` item 1 retired the `
    + `cap and \`PIN-4\`\'s \`THREE\` with it`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-03` · THE INCONSISTENT RESULT — THE CONSTRUCTION THROWS INSTEAD OF RETURNING AN INSTANCE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-03 · THE INCONSISTENT RESULT (`D-123` item 1; `PIN-5`) — a register that STILL VIOLATES a pair once the rounds end: the construction THROWS at rank `20` `ConstraintPassRefused` instead of returning an instance', (t) => {
  // **THE OTHER HALF OF `PIN-5`**: the cycle refuses the act, and so does a register the rounds ended on still
  // in violation — **one member for both, and no new one** (`PIN-5`: *"ONE MEMBER FOR BOTH THE SWEEP\'S
  // POST-ROUND INCONSISTENCY AND THE EXHAUSTION ARM"*, read through `D-125` item 4, which has no subject for
  // the exhaustion half any more). **THE DRIVE**: pair 1 passes on an absent node and REFUSES the value pair
  // 3\'s repair lands — **and carries NO repair**, so the round that finds it lands no repair, the sweep ends
  // (`PIN-4` (iv)), and the register is still in violation.
  const asks = [];
  const construction = attempt(() => make({
    constraints: [
      {
        address: ['a'],
        id: 'stale-1',
        constraint: (context) => {
          asks.push({ id: 'stale-1', value: context.value });
          if (context.value === 'broken') {
            return { message: 'stale-1 refuses the value `stale-3`\'s repair landed at `["a"]`' };
          }
          return true;
        },
      },
      {
        address: ['b'],
        id: 'stale-3',
        constraint: (context) => {
          asks.push({ id: 'stale-3', value: context.value });
          if (context.value !== undefined) return true;
          return {
            message: 'stale-3 requires `["b"]` to exist',
            repair: (record) => {
              const landed = record.write(['b'], 'mem', 'seeded').op;
              record.write(['a'], 'mem', 'broken');
              return { ok: true, op: landed };
            },
          };
        },
      },
    ],
  }));
  const staleAsks = asks.filter((ask) => ask.id === 'stale-1');

  // ── (a) THE CONSTRUCTION THROWS. ──────────────────────────────────────────────────────────────────────
  assert.equal(construction.ok, false,
    `**THE CONSTRUCTION MUST THROW — the shape \`kernel-registration.mjs:989\`–\`:990\` declares, a caller `
      + `receiving the refusal INSTEAD OF an instance** (\`D-123\` item 1: the act *"cannot return an instance `
      + `whose register still violates one of them"*): **THE CALL RETURNED AN INSTANCE**, whose register reads `
      + `\`["a"]\` = ${JSON.stringify(construction.ok ? standing(construction.value, ['a']) : null)} while `
      + `\`stale-1\` refuses exactly that value — the pair was asked `
      + `${staleAsks.length}× with ${JSON.stringify(staleAsks.map((ask) => ask.value))}, and a register in `
      + `violation was returned`);
  assert.equal(statusOf(construction.caught), CONSTRAINT_PASS_REFUSED,
    `**AND THE MEMBER IS RANK \`20\` \`ConstraintPassRefused\` — the same one the cycle crosses** (\`PIN-5\`: `
      + `*"ONE MEMBER FOR BOTH THE SWEEP\'S POST-ROUND INCONSISTENCY AND THE EXHAUSTION ARM"*): the refusal `
      + `answered ${JSON.stringify(statusOf(construction.caught))} with message `
      + `${JSON.stringify(messageOf(construction.caught))}`);
  assert.deepEqual(Object.keys(construction.caught).sort(), ['address', 'log', 'message', 'status'],
    `**AND IT IS THE SURFACE\'S PLAIN FOUR-MEMBER FORM AND NOT AN \`Error\`** (\`index.d.ts\`, \`StoreRefusal\`; `
      + `\`D-77\`): \`Object.keys\` read ${JSON.stringify(Object.keys(construction.caught).sort())}`);
  assert.equal(Array.isArray(construction.caught.log), true,
    `and its \`log\` is never absent: ${JSON.stringify(logKinds(construction.caught))}`);
  t.diagnostic(`CSW-03 · THE INCONSISTENT RESULT: the construction answered `
    + `${JSON.stringify(construction.ok ? 'AN INSTANCE' : statusOf(construction.caught))} with message `
    + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}; \`stale-1\` was asked `
    + `${staleAsks.length}× with ${JSON.stringify(staleAsks.map((ask) => ask.value))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-20` · THE CYCLE AT THE CREATION — NO INSTANCE, RANK `20`, AND NOTHING THE REFUSED ROUND LANDED
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-20 · THE CYCLE AT THE CREATION (`PIN-4` (i), (ii); `PIN-5`; `PIN-12`; `D-125` item 4) — a construction whose second round would repair an ALREADY-REPAIRED pair returns NO instance, the throw carries rank `20` `ConstraintPassRefused`, and a fresh instance over the same `filePath` reads the bytes the LAST PASSING SAVE wrote — the refused round\'s landing is not observable', (t) => {
  // **`§4` `CSW-20`, VERBATIM**: *"a construction whose second round would repair an already-repaired pair:
  // **no instance is returned**, the throw carries rank `20` \`ConstraintPassRefused\` (\`PIN-5\`), and **nothing
  // the refused round landed is observable** — a fresh instance over the same \`filePath\` reads the bytes the
  // last passing save wrote."* **THE DRIVE IS SEQUENCED SO THE SECOND REPAIR IS REACHED AND NOT MERELY
  // THREATENED**: pair A repairs `["a"]` to the value it admits; pair B\'s repair then rewrites `["a"]` below
  // what A admits — so the round that follows pair B\'s repair asks A again and A would repair a second time.
  // **THE SECOND REPAIR WRITES A DISTINGUISHABLE VALUE**, so its landing is readable in the bytes if it ever
  // reached them.
  const { dir, filePath } = scratch('csw20');
  let repairsOfA = 0;
  let repairsOfB = 0;
  let secondRepairRan = false;
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
              if (repairsOfA > 1) secondRepairRan = true;
              const landed = record.write(['a'], 'file', repairsOfA > 1 ? 'settled-again' : 'settled').op;
              return { ok: true, op: landed };
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
              const landed = record.write(['b'], 'file', 'seeded').op;
              // **THE BREAK** — `["a"]` is rewritten below what `cycle-a` admits, so `cycle-a` is asked again
              // in the next round and would repair a SECOND time (`PIN-4` (i), (ii)).
              record.write(['a'], 'file', 'raw');
              return { ok: true, op: landed };
            },
          };
        },
      },
    ],
  }));
  const fresh = construction.ok ? null : attempt(() => make({ filePath }));
  const freshA = fresh !== null && fresh.ok ? standing(fresh.value, ['a']) : null;
  const freshB = fresh !== null && fresh.ok ? standing(fresh.value, ['b']) : null;
  const bytes = bytesOf(filePath);
  rmSync(dir, { recursive: true, force: true });

  // ── (a) NO INSTANCE IS RETURNED, AND THE THROW CARRIES `PIN-5`'S MEMBER. ───────────────────────────────
  assert.equal(construction.ok, false,
    `**NO INSTANCE IS RETURNED — the construction is REFUSED at its second repair attempt** (\`D-125\` item 4; `
      + `\`PIN-4\` (ii): *"A PAIR ASKED AGAIN THAT WOULD REPAIR AGAIN IS THE CYCLE, AND THE ACT REFUSES"*): **THE `
      + `CALL RETURNED AN INSTANCE**, so no cycle was detected at all; the repair counts read `
      + `A=${repairsOfA} B=${repairsOfB} and the second repair `
      + `${secondRepairRan ? 'RAN' : 'was never reached'}`);
  assert.equal(statusOf(construction.caught), CONSTRAINT_PASS_REFUSED,
    `**AND THE THROW CARRIES RANK \`20\` \`ConstraintPassRefused\`** (\`PIN-5\`; \`D-125\` item 4: *"Refuse the `
      + `construction at rank 20"*): it answered ${JSON.stringify(statusOf(construction.caught))} with message `
      + `${JSON.stringify(messageOf(construction.caught))}`);
  assert.equal(repairsOfA <= 1,
    true,
    `**AND PAIR A NEVER LANDED A SECOND REPAIR** (\`PIN-4\` (i)): A repaired ${repairsOfA} time(s), B `
      + `${repairsOfB}`);

  // ── (b) NOTHING THE REFUSED ROUND LANDED IS OBSERVABLE — THE BYTES ARE THE LAST PASSING SAVE'S. ────────
  assert.equal(bytes !== null, true,
    `**THE REFUSED CREATION LEAVES THE STORE\'S OWN FILE STANDING** (\`PIN-12\`: *"A REFUSED CREATION LEAVES `
      + `THE STORE\'S OWN CREATED FILE AND EVERY EARLIER SIBLING REGISTRATION\'S ALREADY-SAVED \`file\` LANDING `
      + `STANDING"*): the path holds ${JSON.stringify(bytes)}`);
  assert.equal(bytes.includes('settled-again'), false,
    `**AND THE SECOND REPAIR\'S LANDING IS NOT IN THE BYTES** — the refused round wrote nothing that a fresh `
      + `instance can read (\`§4\` \`CSW-20\`: *"nothing the refused round landed is observable"*): the bytes `
      + `read ${JSON.stringify(bytes)}`);
  assert.equal(fresh !== null && fresh.ok, true,
    `and a fresh instance over the same \`filePath\` must construct: it answered `
      + `${JSON.stringify(fresh === null ? null : (fresh.ok ? 'an instance' : statusOf(fresh.caught)))}`);
  assert.deepEqual(freshB, { present: true, value: 'seeded' },
    `**AND IT READS THE BYTES THE LAST PASSING SAVE WROTE** (\`PIN-12\`; \`D-106\` item 2 read at the refusing `
      + `arm): \`read(["b"])\` on the fresh instance = ${JSON.stringify(freshB)}`);
  assert.deepEqual(freshA, { present: true, value: 'raw' },
    `and \`read(["a"])\` is the value \`cycle-b\`\'s PASSING registration saved, never the second repair\'s: `
      + `${JSON.stringify(freshA)}`);

  t.diagnostic(`CSW-20 · THE CYCLE AT THE CREATION: the construction answered `
    + `${JSON.stringify(construction.ok ? 'AN INSTANCE' : statusOf(construction.caught))}; A repaired `
    + `${repairsOfA}× (second repair ${secondRepairRan ? 'ran' : 'never reached'}), B ${repairsOfB}×; the bytes `
    + `read ${JSON.stringify(bytes)}; a fresh instance reads a=${JSON.stringify(freshA)} `
    + `b=${JSON.stringify(freshB)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-22` · ASKED AGAIN AND PASSING IS NOT A CYCLE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-22 · ASKED AGAIN AND PASSING IS NOT A CYCLE (`PIN-4` (iii), (iv); `D-125` item 4) — a pair asked in a second round AFTER ITS OWN REPAIR and answering `true`: NO refusal at all, the sweep ends on that round as a round that landed no repair, and the returned instance\'s register satisfies the pair', (t) => {
  // **THE CELL THAT KEEPS `CSW-19`\'S DETECTOR FROM BEING READ AS *"a second ask is a cycle"*** (`§4`
  // `CSW-22`). `D-125` item 4, verbatim: ***"A pair asked again after its own repair and PASSING is not a
  // cycle — asking is not repairing"*** — *"and that ask is what makes an inconsistent result decidable at
  // all"*. **THE DRIVE NEEDS A SECOND PAIR**: a sweep only runs a further round when a round LANDED a repair,
  // so pair `settle` repairs, pair `other` repairs after it, and only then is `settle` asked again — which is
  // the ask under test.
  const asksOfSettle = [];
  const asksOfOther = [];
  let repairsOfSettle = 0;
  let repairsOfOther = 0;
  const construction = attempt(() => make({
    constraints: [
      {
        address: ['a'],
        id: 'settle',
        constraint: (context) => {
          asksOfSettle.push(context.value);
          if (context.value === 'settled') return true;
          return {
            message: 'settle requires `["a"]` to be "settled"',
            repair: (record) => {
              repairsOfSettle += 1;
              return { ok: true, op: record.write(['a'], 'mem', 'settled').op };
            },
          };
        },
      },
      {
        address: ['b'],
        id: 'other',
        constraint: (context) => {
          asksOfOther.push(context.value);
          if (context.value !== undefined) return true;
          return {
            message: 'other requires `["b"]` to exist',
            repair: (record) => {
              repairsOfOther += 1;
              return { ok: true, op: record.write(['b'], 'mem', 'seeded').op };
            },
          };
        },
      },
    ],
  }));

  // ── (a) NO REFUSAL AT ALL. ────────────────────────────────────────────────────────────────────────────
  assert.equal(construction.ok, true,
    `**NO REFUSAL AT ALL — a second ask is NOT a cycle** (\`D-125\` item 4: *"asking is not repairing"*; `
      + `\`PIN-4\` (iii)): the construction answered `
      + `${JSON.stringify(construction.ok ? 'an instance' : statusOf(construction.caught))} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))} — a tree that refused `
      + `here has shipped a detector that refuses CONVERGENCE (\`§6\` item 2)`);
  assert.equal(repairsOfSettle, 1,
    `and its repair ran exactly once: ${repairsOfSettle}`);
  assert.equal(repairsOfOther, 1,
    `and the other pair\'s repair ran once, which is what makes a further round run at all: `
      + `${repairsOfOther}`);

  // ── (b) THE PAIR IS ASKED AGAIN, AFTER ITS OWN REPAIR, AND PASSES. ────────────────────────────────────
  // **THE THREE ASKS, NAMED, SO THE COUNT IS NOT A ROUND CAP WEARING A NUMBER**: (1) the pair's own
  // registration; (2) that registration's RE-RUN over the op its repair landed (`D-94` item 1, unconditional);
  // (3) **THE NEXT ROUND'S ASK — the one this cell is about** — which runs because pair `other`'s repair kept
  // the sweep going (`PIN-4` (iv): a round is one carry per register row, and the rounds ask every admitted
  // pair once). A pair cannot be detected as a cycle without exactly this ask, which is why the count is the
  // sweep's own and not a budget's.
  assert.equal(asksOfSettle.length >= 3, true,
    `**THE PAIR IS ASKED AGAIN IN A LATER ROUND AFTER ITS OWN REPAIR** (\`PIN-4\` (iii), (iv); \`D-125\` item 4: `
      + `*"A pair asked again after its own repair and PASSING is not a cycle — asking is not repairing"*): the `
      + `drive reads the registration's ask, that registration's re-run, AND the next round's ask — **and `
      + `\`settle\` was asked ${asksOfSettle.length}× with ${JSON.stringify(asksOfSettle)}** while pair \`other\` `
      + `was asked ${asksOfOther.length}×. **TODAY'S TREE ASKS EACH PAIR AT ITS REGISTRATION AND AT THAT `
      + `REGISTRATION'S RE-RUN AND NEVER IN A LATER ROUND**`);
  assert.equal(asksOfSettle.filter((value) => value === 'settled').length >= 2, true,
    `**AND MORE THAN THE RE-RUN'S ONE ASK IS AGAINST THE STATE ITS OWN REPAIR LANDED — ONE OF THEM IS THE `
      + `NEXT ROUND'S, AND IT PASSES** (\`D-125\` item 4): the asks read ${JSON.stringify(asksOfSettle)}`);
  assert.equal(asksOfSettle[asksOfSettle.length - 1], 'settled',
    `and the LAST ask is the passing one the sweep ended on (\`PIN-4\` (iv)): `
      + `${JSON.stringify(asksOfSettle[asksOfSettle.length - 1])}`);

  // ── (c) THE REGISTER SATISFIES THE PAIR. ──────────────────────────────────────────────────────────────
  assert.deepEqual(construction.ok ? standing(construction.value, ['a']) : null,
    { present: true, value: 'settled' },
    `**THE RETURNED INSTANCE\'S REGISTER SATISFIES THE PAIR** (\`§4\` \`CSW-22\`): `
      + `${JSON.stringify(construction.ok ? standing(construction.value, ['a']) : null)}`);

  t.diagnostic(`CSW-22 · ASKED AGAIN AND PASSING: \`settle\` was asked ${asksOfSettle.length}× with `
    + `${JSON.stringify(asksOfSettle)}, its repair ran ${repairsOfSettle}×, pair \`other\` repaired `
    + `${repairsOfOther}×, the construction `
    + `${construction.ok ? 'returned an instance' : 'refused at ' + statusOf(construction.caught)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-CSW-1` · THE CONSISTENT-REGISTER INVARIANT — THE PROPERTY ROW (`e`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('csw_prop_P_CSW_1_a_returned_instance_s_register_satisfies_every_carried_pair', (t) => {
  // **PROPERTY.** `∀` generated construction whose repairs TERMINATE: **either the construction REFUSES at one
  // of the two constraint-subject members and returns no instance, or the instance it returns satisfies EVERY
  // pair the call carried.** (`D-123` item 1: *"The construction must ask the pairs it carries and cannot
  // return an instance whose register still violates one of them"*; `§4` `P-CSW-1`, *"the invariant `C-13`
  // measured missing"*; `PIN-5` for the refusing arm.)
  //
  // **GENERATOR.** `1`–`3` ordinary pairs at distinct addresses with a generated threshold, each carrying a
  // MONOTONE repair (it writes its own threshold at its own address, so the ordinary half always terminates),
  // crossed with a BREAKER pair that is either absent or present: when present its repair writes a
  // generated VICTIM pair's address BELOW that victim's threshold — **which is the one shape that makes the
  // register inconsistent without making any pair refuse at its own registration**. 40 cases, one pinned
  // literal seed, the breaker arm rotated so it occurs.
  //
  // **FALSIFIER.** A RETURNED INSTANCE WHOSE REGISTER VIOLATES A CARRIED PAIR — the `C-13` defect exactly, and
  // the arm a tree without a sweep reaches on every breaker case.
  const SEED = 0x5C5701;
  const ADDRESSES = [['alpha'], ['beta'], ['gamma']];
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
  for (let i = 0; i < 40 && failures.length < MAX_FAILURES; i += 1) {
    ran += 1;
    const draw = { attempt: i };
    try {
      const n = intBetween(1, 3);
      const thresholds = [];
      const elements = [];
      for (let k = 0; k < n; k += 1) {
        const threshold = intBetween(1, 3);
        thresholds.push(threshold);
        elements.push({
          address: ADDRESSES[k],
          id: `ordinary-${k}`,
          constraint: (context) => {
            if (typeof context.value === 'number' && context.value >= threshold) return true;
            return {
              message: `ordinary-${k} requires a number at or above ${threshold}`,
              repair: (record) => ({ ok: true, op: record.write(ADDRESSES[k], 'mem', threshold).op }),
            };
          },
        });
      }
      const breaker = i % 2 === 1;
      let victim = 0;
      if (breaker) {
        victim = intBetween(0, n - 1);
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
                // **THE BREAK** — the victim's address is written BELOW the value the victim admits.
                record.write(ADDRESSES[victim], 'mem', below);
                return { ok: true, op: landed };
              },
            };
          },
        });
      }
      Object.assign(draw, { pairs: n, thresholds, breaker, victim: breaker ? victim : null });

      const construction = attempt(() => make({ constraints: elements }));
      if (!construction.ok) {
        const status = statusOf(construction.caught);
        draw.status = status;
        assert.equal([CONSTRAINT_PASS_REFUSED, CONSTRAINT_REFUSED_AT_REGISTRATION].includes(status), true,
          `P-CSW-1 ${JSON.stringify(draw)}: a refused construction crosses a code whose SUBJECT IS THE `
            + `CONSTRAINTS — rank 20 or the registration instant's own 19 (PIN-5; PIN-11: *"AN INCOMPATIBLE `
            + `LIST CROSSES A CODE WHOSE SUBJECT IS THE CONSTRAINTS"*), and it answered ${JSON.stringify(status)}`);
        assert.deepEqual(Object.keys(construction.caught).sort(), ['address', 'log', 'message', 'status'],
          `P-CSW-1 ${JSON.stringify(draw)}: and the refusal is the surface's plain four-member form `
            + `(index.d.ts, StoreRefusal; D-77)`);
        arms.refused = (arms.refused || 0) + 1;
        return;
      }
      arms.returned = (arms.returned || 0) + 1;
      // **THE INVARIANT, READ AT EVERY CARRIED PAIR'S OWN ADDRESS.**
      for (let k = 0; k < n; k += 1) {
        const read = attempt(() => construction.value.read(ADDRESSES[k]));
        const value = read.ok ? read.value : `<${statusOf(read.caught)}>`;
        draw[`ordinary-${k}`] = value;
        assert.equal(typeof value === 'number' && value >= thresholds[k], true,
          `P-CSW-1 ${JSON.stringify(draw)}: **THE RETURNED INSTANCE'S REGISTER MUST SATISFY EVERY CARRIED `
            + `PAIR** — \`ordinary-${k}\` requires a number at or above ${thresholds[k]} and reads `
            + `${JSON.stringify(value)} (D-123 item 1; the invariant C-13 measured missing)`);
      }
      assert.deepEqual(construction.value.constraints().length, elements.length,
        `P-CSW-1 ${JSON.stringify(draw)}: and every carried pair is named by \`constraints()\` (PIN-3)`);
      if (breaker) arms.brokenReturned = (arms.brokenReturned || 0) + 1;
      else arms.cleanReturned = (arms.cleanReturned || 0) + 1;
    } catch (err) {
      failures.push({ attempt: i, input: draw, message: err && err.message ? err.message : String(err) });
    }
  }

  if (failures.length > 0) t.diagnostic('P-CSW-1 · THE GENERATED INPUTS THAT FAILED:\n' + JSON.stringify(failures, null, 2));
  assert.ok((arms.refused || 0) + (arms.returned || 0) > 0,
    `P-CSW-1: the generator must reach a construction — read ${JSON.stringify(arms)}`);
  assert.ok((arms.returned || 0) > 0,
    `P-CSW-1: the generator must reach the RETURNED arm, or the invariant is never read — ${JSON.stringify(arms)}`);
  assert.deepEqual(failures, [],
    `P-CSW-1 held over ${ran} generated cases (seed 0x${(SEED >>> 0).toString(16)}): every returned instance's `
      + `register satisfies every carried pair, and every refusal carries a constraints-subject code`);

  t.diagnostic(`P-CSW-1 held over ${ran} generated cases, seed 0x${(SEED >>> 0).toString(16)}: arms `
    + `${JSON.stringify(arms)}. The invariant is read at each carried pair's own address on every RETURNED `
    + `arm; the refusing arms are read for the constraints-subject code and the four-member form. **THE `
    + `BREAKER ARM IS THE FALSIFIER**: a returned instance whose victim pair reads below its threshold is the `
    + `C-13 defect and fails here`);
});
