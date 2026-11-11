// tests/e2e/blind-creation-sweep.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-B1` — THE BLIND CELL FOR `U-STOREROOM-CREATION-SWEEP`, WRITTEN BEFORE THE CHANGE EXISTS: one
// construction, one EXISTING and one ABSENT watched address, driven from the PUBLISHED SURFACE ALONE.
//
// **THE STATEMENT** (`docs/L1/creation-sweep.md` `§4` `CSW-B1`, verbatim): *"one construction, one existing and
// one absent watched address: the existing one fires once with its own address, the absent one never fires,
// and the returned instance's register satisfies every pair the call carried."* **ITS AUTHORITY IS `D-123`
// ITEMS 1, 2 AND 3 AND `D-125` ITEM 1, AND IT IS NOTHING ELSE** — the sweep and the consistency of the register
// (item 1), the entry that carries its function (`item 2`), *"all ones with an EXISTING address"* (item 3),
// and the delivery's reach after the repairs (item 1).
//
// ── THE DISCIPLINE, AND IT IS THE WHOLE POINT OF THIS FILE ──────────────────────────────────────────────
//
// **NO BYTE OF `bindings/js/src/entry/**`, OF `bindings/js/index.mjs`'S OWN BODY, OR OF `src/**` WAS READ TO
// AUTHOR THIS FILE, AND NONE IS IMPORTED.** The entry reached here is `bindings/js/index.mjs` by PATH — this
// project's `O4` route — and NOTHING ELSE is imported: no kernel module, no `state.mjs`, no
// `constraint-kernel.mjs`, no `Symbol` channel **and no instrumentation at all**. Every reading is taken at a
// PUBLISHED member (`storeCreate`, `read`, `write`, `constraints`) or at the value a published call threw, and
// the only non-published imports are `node:`'s own.
//
// **A CELL THAT NEEDED AN INTERNAL ENTRY WOULD BE THE FINDING THIS FILE EXISTS TO PREVENT.** So the sweep is
// read at the only two surfaces it can move — **the pairs' own ask counts** (the bodies the call itself
// carries) and **the register the instance answers for** — and the delivery is read at the listener the entry
// carries, whose only observable is that it ran and what it was handed. **No cell here asserts a round count,
// an attempt, an `AttemptRef`, a `pending` residue or any kernel member**: `PIN-14` mints none of them at this
// unit, and a blind cell may not assume one into existence.
//
// **`D-17`**: no document is opened at runtime. **`D-21`**: the expectation is a literal, the citation is a
// comment, and where the drive cannot reach its arm the cell fails AT THE ACT and prints what it caught.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

const statusOf = (caught) => (caught !== null && typeof caught === 'object' ? caught.status ?? null : null);
const messageOf = (caught) => (caught !== null && typeof caught === 'object' && typeof caught.message === 'string'
  ? caught.message
  : String(caught));

function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

const standing = (instance, address) => {
  const read = attempt(() => instance.read(address));
  return read.ok ? { present: true, value: read.value } : { present: false, refused: statusOf(read.caught) };
};

test('CSW-B1 · BLIND (`§4` `CSW-B1`; `D-123` items 1–3; `D-125` item 1) — ONE CONSTRUCTION, one EXISTING and one ABSENT watched address: the existing one fires ONCE WITH ITS OWN ADDRESS, the absent one NEVER FIRES, and the returned instance\'s register SATISFIES EVERY PAIR the call carried — driven at the published surface alone', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'csw-b1-'));
  const filePath = join(dir, 'store.json');
  // **THE ONE EXISTING ADDRESS IS LAID BY A PRIOR INSTANCE'S OWN ACT**, so the drive depends on no byte of the
  // implementation and on no file-shaped assumption: the second construction loads it (`DD-38` loads no
  // REGISTRATION and the `file` tier's DATA is the store's own).
  const seed = storeCreate({ filePath, journalLength: 32, listeners: [] });
  seed.write(['here'], 'file', 'present');

  const hereCalls = [];
  const elsewhereCalls = [];
  const pairAsks = [];
  const construction = attempt(() => storeCreate({
    filePath,
    journalLength: 32,
    // **THE ENTRY CARRIES ITS FUNCTION** (`D-123` item 2: an entry that carries none is refused) — and one of
    // the two watched addresses exists while the other does not (`D-123` item 3: *"all ones with an EXISTING
    // address"*).
    listeners: [
      {
        address: ['here'],
        handle: 'HERE',
        listener: function listener(...args) { hereCalls.push({ argCount: args.length, address: args[0] }); },
      },
      {
        address: ['elsewhere'],
        handle: 'ELSEWHERE',
        listener: function listener(...args) { elsewhereCalls.push({ argCount: args.length, address: args[0] }); },
      },
    ],
    constraints: [
      {
        address: ['here'],
        id: 'here-must-exist',
        constraint: (context) => {
          pairAsks.push(context.value);
          return true;
        },
      },
      {
        address: ['carried'],
        id: 'carried-must-exist',
        constraint: (context) => (context.value !== undefined
          ? true
          : {
              message: '`["carried"]` must exist',
              repair: (record) => ({ ok: true, op: record.write(['carried'], 'file', 'carried-by-the-repair').op }),
            }),
      },
    ],
  }));
  const constructionStatus = construction.ok ? null : statusOf(construction.caught);
  const hereStanding = construction.ok ? standing(construction.value, ['here']) : null;
  const carriedStanding = construction.ok ? standing(construction.value, ['carried']) : null;
  const rows = construction.ok ? construction.value.constraints() : null;
  rmSync(dir, { recursive: true, force: true });

  // ── (a) THE CONSTRUCTION STANDS — THE ABSENT ADDRESS IS NOT A REFUSAL. ────────────────────────────────
  assert.equal(construction.ok, true,
    `**ONE CONSTRUCTION, ONE EXISTING AND ONE ABSENT WATCHED ADDRESS, AND IT RETURNS ITS INSTANCE** `
      + `(\`D-123\` item 3: *"a listener whose watched address does not resolve in the register is not fired"* — `
      + `and that is NOT a refusal; \`§4\` \`CSW-B1\`): the call answered ${JSON.stringify(constructionStatus)} `
      + `with message ${JSON.stringify(construction.ok ? null : messageOf(construction.caught))}`);

  // ── (b) THE EXISTING ADDRESS FIRES ONCE, WITH ITS OWN ADDRESS. ────────────────────────────────────────
  assert.equal(hereCalls.length, 1,
    `**THE EXISTING ONE FIRES ONCE** (\`D-123\` item 2: *"after the constraints pass, every adopted listener `
      + `whose watched address exists is fired"*; \`D-125\` item 1's reach): it fired `
      + `${hereCalls.length} time(s) — **TODAY NO CREATION-FIRED LISTENER RUNS AT ALL**`);
  assert.equal(hereCalls[0]?.argCount, 1,
    `**AND ITS ONE ARGUMENT IS ITS OWN WATCHED ADDRESS** (\`§4\` \`CSW-B1\`: *"the existing one fires once with `
      + `its own address"*; \`Q-3\`'s default; \`PIN-6\` (iv)): the body was handed `
      + `${JSON.stringify(hereCalls[0]?.address)} and \`arguments.length\` read `
      + `${JSON.stringify(hereCalls[0]?.argCount)}`);
  assert.deepEqual(hereCalls[0]?.address, ['here'],
    `and the address is the watched one: ${JSON.stringify(hereCalls[0]?.address)}`);

  // ── (c) THE ABSENT ADDRESS NEVER FIRES. ───────────────────────────────────────────────────────────────
  assert.equal(elsewhereCalls.length, 0,
    `**THE ABSENT ONE NEVER FIRES** (\`D-123\` item 3; \`PIN-7\`): it fired ${elsewhereCalls.length} time(s), `
      + `with ${JSON.stringify(elsewhereCalls)}`);

  // ── (d) AND THE REGISTER SATISFIES EVERY PAIR THE CALL CARRIED. ───────────────────────────────────────
  assert.deepEqual(hereStanding, { present: true, value: 'present' },
    `**THE RETURNED INSTANCE'S REGISTER SATISFIES THE PAIR WHOSE ADDRESS THE LOAD CARRIED** (\`D-123\` item 1): `
      + `\`read(["here"])\` = ${JSON.stringify(hereStanding)}`);
  assert.deepEqual(carriedStanding, { present: true, value: 'carried-by-the-repair' },
    `**AND THE PAIR THE SWEEP REPAIRED IS SATISFIED TOO — the answer cannot be an instance whose register `
      + `still violates one of its pairs** (\`D-123\` item 1: *"cannot return an instance whose register still `
      + `violates one of them"*): \`read(["carried"])\` = ${JSON.stringify(carriedStanding)}`);
  assert.deepEqual(rows === null ? null : rows.map((row) => row.id).sort(),
    ['carried-must-exist', 'here-must-exist'],
    `and \`constraints()\` names both pairs the call carried (\`PIN-3\`: the sweep's subject is the register): `
      + `${JSON.stringify(rows)}`);
  assert.equal(pairAsks.length >= 2, true,
    `**AND THE PAIRS WERE ASKED AT ALL — THE BLIND ARM'S OWN COHERENCE** (a construction asks every pair it `
      + `carries, \`D-123\` item 1): the drive counted ${pairAsks.length} ask(s)`);

  t.diagnostic(`CSW-B1 · BLIND: the construction answered ${JSON.stringify(constructionStatus)}; the here-call `
    + `\`["here"]\` fired ${hereCalls.length}× with ${JSON.stringify(hereCalls)}; the absent address fired `
    + `${elsewhereCalls.length}×; \`read(["here"])\` = ${JSON.stringify(hereStanding)}; `
    + `\`read(["carried"])\` = ${JSON.stringify(carriedStanding)}; \`constraints()\` = `
    + `${JSON.stringify(rows === null ? null : rows.map((row) => row.id))}; the pairs were asked `
    + `${pairAsks.length}× with ${JSON.stringify(pairAsks)}`);
});
