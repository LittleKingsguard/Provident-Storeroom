// tests/unit/js-constraints/resolution-log.test.mjs — the UNIT-scope home of `D-119`'s member:
// `docs/specs/storeroom-file-save-coverage/resolution-log.md` `§6.1` ROW 2, at the preset's `tests/unit/js-constraints/`
// scope (`D-5`), beside `registration-save-seam.test.mjs` and in its idiom.
//
// **THE RULING** (`strata/decisions.md` · `D-119`, 2026-11-02, `main`, landed at `5325526`), the architect, verbatim:
//
//   *"Cache the log and pass to the surface on resolution, same as on failure. This is needed so that manual data
//   changes can check what additional data changed downstream of their request"*
//
// **WHAT THIS SCOPE IS FOR, AND WHAT IT DELIBERATELY DOES NOT DO.** `§6.1` row 1 puts the BEHAVIOUR in
// `tests/e2e/resolution-log.test.mjs` (`RSL-1`–`RSL-9`): what the list HOLDS, in what ORDER, which arms answer an
// empty list, the refusal's unmoved form, and that a delete receipt's member is the commit's own array by identity.
// **THIS FILE IS ROW 2: THE DECLARED DEVICE AND ITS GUARDRAILS** — the accessor's own bytes, read on the three
// records a passing call answers (`§1.1` item 2, `§5` items 1, 2 and 4). **The split is stated so no cell here is read
// as a copy of another:** a shape census at this scope, a content census at that one.
//
// **THE THREE LIMBS THE TWO PATHS SHARE, AND WHY NONE OF THEM IS A COPY.** `§6.1` row 2 names the getter,
// `enumerable: false` and `configurable: true` at this scope, and `RSL-8` reads the same three bytes because the
// unit home was OWED when that file was written (its own head says so). **What is asserted ONLY HERE is the rest of
// the descriptor** — that it is an ACCESSOR and not a data property (`set` absent, no `value`, no `writable`); that
// the member is invisible to `Object.keys` and visible to `Object.getOwnPropertyNames`; that the getter answers ONE
// cached reference shared by repeated reads and NOT extended by a later act, while a second answer's list is a
// different array; that no `Symbol` spelling was minted; that the `discarded` witness on the same record carries the
// same three bytes, so this is no new KIND of member; and that a spread or an `Object.assign` copy loses the member
// while the record keeps it. **The DECLARED key sets are asserted IN INSTALL ORDER here and sorted at the e2e scope.**
//
// **Layer: `ENVELOPE/PURE`. APP LAYER: `NONE`.** No `APP`-green is claimed here: these cells read a record's
// descriptors, which is a package-level observable and needs no `.node` beyond the one the entry already loads.
//
// **AND ONE LIMB OF `§6.1` ROW 2 IS NOT CLAIMED HERE, WITH ITS REASON.** Row 2 also names *"the sealed report's own
// member census unmoved by `COMMIT_LOG_SHARED`"*. **A `Symbol.for`-keyed channel is not reachable through the
// package's declared surface, and reading the source to reach one is not this scope's instrument** — the same
// provenance note `registration-save-seam.test.mjs` carries at its own head, applied unchanged. That census is
// `RSL-8`'s at the e2e scope, where the seal is imported by name; what stands here is the ACCESSOR, which is what a
// consumer meets.
//
// **`D-17`**: every expectation is a literal in the cell and every citation is a comment — no `docs/**` path is
// opened at runtime. **`D-21`**: each cell prints the readings it took at its own `t.diagnostic`, and a cell that
// cannot reach its arm asserts the DRIVE's coherence FIRST instead of reporting a verdict about an answer it never
// held. **`D-6`/`D-7`**: the entry is reached BY PATH — no cell here claims the packaged resolution.

import test from 'node:test';
import assert from 'node:assert/strict';

import { storeCreate } from '../../../bindings/js/index.mjs';

/** One store per drive, constructed by the package's own call and by nothing else. */
const make = (extra = {}) => storeCreate({ journalLength: 256, listeners: [], ...extra });

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function captured(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** A failure's two columns, so a red reports them instead of a `TypeError` inside the message builder. */
const shapeOf = (caught) => ({
  status: caught !== null && typeof caught === 'object' ? caught.status ?? null : null,
  message: caught !== null && typeof caught === 'object' && typeof caught.message === 'string'
    ? caught.message
    : String(caught),
});

/** **THE THREE DECLARED ENUMERABLE SETS, IN THE ORDER THE TREE INSTALLS THEM** — `index.d.ts`'s `WriteRecord`
 *  (`:544`), `DeleteRecord` (`:629`) and `RollbackRecord` (`:772`), each read at its own `export interface` line in
 *  the tree this file stands in. **The ORDER is asserted here and not at the e2e scope**, which sorts: a member
 *  appended to a record's DECLARED set is a finding at this scope however it is appended, and `log` must appear in
 *  neither list. */
const WRITE_KEYS = ['op', 'watched', 'triggered'];
const RECEIPT_KEYS = ['address', 'tiers', 'triggered', 'op'];
const REVERSAL_KEYS = ['opId', 'undoneOps', 'restoredTo'];

/** **THE BYTES `§1.1` ITEM 2 DECLARES FOR THE DEVICE** — one helper, a getter, non-enumerable and `configurable` —
 *  read off any answer this file is handed. A DATA property answers `value`/`writable` and no getter, so the two
 *  readings cannot be confused. */
function accessorShape(answer, member) {
  const descriptor = Object.getOwnPropertyDescriptor(answer, member);
  if (descriptor === undefined) return { present: false };
  return {
    present: true,
    get: typeof descriptor.get,
    set: descriptor.set,
    hasValue: 'value' in descriptor,
    hasWritable: 'writable' in descriptor,
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
  };
}

/** One PASSING answer of each of the three records, so every cell below censuses the same three. */
function drive() {
  const store = make();
  store.write(['rlu-a'], 'mem', 5);
  store.addConstraint({ address: ['rlu-a'], id: 'rlu' }, (context) => context.value !== 9);
  const record = captured(() => store.write(['rlu-a'], 'mem', 6));
  const receipt = captured(() => store.delete(['rlu-a'], 'mem'));
  const reversal = record.ok ? captured(() => store.rollback(record.value.op.opId)) : { ok: false, caught: null };
  return { store, record, receipt, reversal };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLU-1` · THE DEVICE'S SHAPE ON THE THREE RECORDS A PASSING CALL ANSWERS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLU-1 · the member at the name `log` is an OWN, NON-ENUMERABLE, `configurable` ACCESSOR on all three records a PASSING call answers — a getter with NO setter, no `value` and no `writable`, answering an ARRAY on every one — and it is invisible to `Object.keys` while it IS one of the record\'s own names', (t) => {
  const { record, receipt, reversal } = drive();
  assert.equal(record.ok, true,
    `the write must PASS, or there is no record to census: it caught ${JSON.stringify(shapeOf(record.caught))}`);
  assert.equal(receipt.ok, true,
    `the delete must PASS: it caught ${JSON.stringify(shapeOf(receipt.caught))}`);
  assert.equal(reversal.ok, true,
    `the reversal must PASS: it caught ${JSON.stringify(shapeOf(reversal.caught))}`);

  const answers = [
    ['the write\'s record', record.value, WRITE_KEYS],
    ['the delete\'s receipt', receipt.value, RECEIPT_KEYS],
    ['the reversal\'s record', reversal.value, REVERSAL_KEYS],
  ];
  for (const [label, answer, keys] of answers) {
    const shape = accessorShape(answer, 'log');
    assert.equal(shape.present, true,
      `**THE MEMBER IS PRESENT ON ${label.toUpperCase()}** — the rule "present on every passing answer" read for a `
        + `third record (\`D-77\`/\`D-78\`): ${JSON.stringify(shape)}`);
    assert.equal(Object.hasOwn(answer, 'log'), true,
      `and it is an OWN property of the answer (\`§1.1\` item 2): `
        + `${JSON.stringify(Object.hasOwn(answer, 'log'))}`);
    assert.equal(shape.get, 'function',
      `**IT IS AN ACCESSOR: a getter answers it** — the device \`discarded\` already uses: `
        + `${JSON.stringify(shape.get)}`);
    assert.equal(shape.set, undefined,
      `**AND THERE IS NO SETTER** — so no consumer can REPLACE the list through the member, and the assignment is `
        + `refused by the engine rather than obeyed (\`§5\` item 2's terms, read for the device): `
        + `${JSON.stringify(shape.set)}`);
    assert.equal(shape.hasValue, false,
      `**IT IS NOT A DATA PROPERTY** — a descriptor carrying \`value\` would sit in every census a consumer writes: `
        + `${JSON.stringify(shape.hasValue)}`);
    assert.equal(shape.hasWritable, false,
      `and it carries no \`writable\` either: ${JSON.stringify(shape.hasWritable)}`);
    assert.equal(shape.enumerable, false,
      `**NON-ENUMERABLE — the whole of why Object.keys and every deep-equality are unmoved** (\`A117\` (D6); `
        + `\`§1.1\`): ${JSON.stringify(shape.enumerable)}`);
    assert.equal(shape.configurable, true,
      `and \`configurable\`, the third byte \`§1.1\` item 2 declares for it: `
        + `${JSON.stringify(shape.configurable)}`);
    assert.equal(Array.isArray(answer.log), true,
      `and the getter answers an ARRAY on this arm, never a non-array and never \`undefined\`: `
        + `${JSON.stringify(answer.log)}`);
    assert.deepEqual(Object.keys(answer), keys,
      `**THE DECLARED CENSUS IS UNMOVED AND ITS ORDER IS THE INSTALLED ONE** — \`log\` is in NEITHER list and at no `
        + `index: ${JSON.stringify(Object.keys(answer))}`);
    assert.equal(Object.getOwnPropertyNames(answer).includes('log'), true,
      `**AND THE ONE CENSUS A STRING-KEYED MEMBER CANNOT HIDE FROM DOES CARRY IT** — invisible where a consumer `
        + `reads, visible where the tree audits (\`§1.1\`): `
        + `${JSON.stringify(Object.getOwnPropertyNames(answer))}`);
  }

  t.diagnostic(`RLU-1 · THE SHAPE: ${answers.map(([label, answer]) => `${label} `
    + `${JSON.stringify(accessorShape(answer, 'log'))} with Object.keys reading `
    + `${JSON.stringify(Object.keys(answer))} and the own names `
    + `${JSON.stringify(Object.getOwnPropertyNames(answer))}`).join(' · ')}.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLU-2` · ONE CACHED REFERENCE PER ANSWER — SHARED BY REPEATED READS, NOT DERIVED, NOT MODULE-WIDE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLU-2 · the getter answers ONE CACHED REFERENCE — repeated reads are the SAME array, a later passing act on the same store extends NEITHER that array nor its length, a second answer\'s list is a DIFFERENT array, and no setter means a consumer cannot replace it', (t) => {
  const { store, record } = drive();
  assert.equal(record.ok, true,
    `the write must PASS, or there is no reference to hold: it caught ${JSON.stringify(shapeOf(record.caught))}`);
  const held = record.value;

  // ── (a) REPEATED READS ARE ONE ARRAY — `§5` item 4: *"No getter derives anything at the read"*. ──
  assert.equal(held.log === held.log, true,
    '**IT IS NOT A LIVE VIEW AND NOT A FRESH COPY**: the accessor hands back the one reference the crossing '
      + 'froze, so two reads are the same array rather than two equal ones');
  const first = held.log;
  const lengthAtTheCrossing = first.length;
  assert.equal(lengthAtTheCrossing > 0, true,
    `and this arm must have appended, or "stable" is read off an empty list: ${JSON.stringify(first)}`);

  // ── (b) AND A LATER PASSING ACT DOES NOT MOVE IT — `§5` item 1: *"stable after it"*. ────────────────
  const later = captured(() => store.write(['rlu-c'], 'mem', 7));
  assert.equal(later.ok, true,
    `the later act must PASS, or nothing is measured: it caught ${JSON.stringify(shapeOf(later.caught))}`);
  assert.equal(held.log === first, true,
    '**THE SAME ARRAY AT EVERY READ, BEFORE AND AFTER A SUBSEQUENT PASSING ACT** — a reader that re-derived at the '
      + `read would answer the store's newest list here: ${String(held.log === first)}`);
  assert.equal(held.log.length, lengthAtTheCrossing,
    'and its LENGTH is where the crossing left it: the array is that act\'s own, and a later act appends to its own '
      + `list (${JSON.stringify(held.log)} against ${lengthAtTheCrossing})`);

  // ── (c) AND ONE ANSWER'S LIST IS NOT ANOTHER'S — no module-level cache is minted (`§2.1`). ─────────────
  assert.equal(later.value.log === first, false,
    '**TWO ANSWERS ARE TWO LISTS** — a module-level slot would hand the same array to both, and a new structure is '
      + `the one thing \`§2.1\` forbids: identity ${String(later.value.log === first)}`);
  assert.equal(Array.isArray(later.value.log), true,
    `and the second answer's own list is an array of its own: ${JSON.stringify(later.value.log)}`);

  // ── (d) AND NO SETTER: THE MEMBER IS NOT REPLACEABLE FROM A CONSUMER'S SIDE. ─────────────────────────
  assert.throws(() => { held.log = []; }, TypeError,
    'the accessor carries no setter, so an assignment to the member throws under a module\'s strict mode rather '
      + 'than replacing the list the package holds');
  assert.equal(held.log === first, true,
    `and the reference is unmoved by the refused assignment: ${String(held.log === first)}`);

  t.diagnostic(`RLU-2 · THE REFERENCE: the crossing's length was ${lengthAtTheCrossing} and it is `
    + `${held.log.length} after a later passing write; repeated reads are the same array `
    + `(${String(held.log === held.log)}); the later answer's list IS the earlier answer's — `
    + `${String(later.value.log === first)}, which must be false — and the assignment to the member threw `
    + `\`TypeError\`.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RLU-3` · THE NAME IS A STRING, THE DEVICE IS `discarded`'s, AND A COPY LOSES IT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RLU-3 · the device mints NO new KIND of member — the name is the STRING `log` with no `Symbol` spelling, the `discarded` witness on the SAME record carries the SAME three bytes, and a spread or an `Object.assign` copy loses the member while the record keeps it', (t) => {
  const { record, receipt } = drive();
  assert.equal(record.ok, true,
    `the write must PASS, or there is no record to census: it caught ${JSON.stringify(shapeOf(record.caught))}`);
  assert.equal(receipt.ok, true,
    `the delete must PASS: it caught ${JSON.stringify(shapeOf(receipt.caught))}`);
  const answer = record.value;

  // ── (a) THE NAME IS A STRING, AND NO `Symbol` SPELLING WAS MINTED (`§1.1` item 1's refusal). ──────────
  const symbols = Object.getOwnPropertySymbols(answer);
  assert.equal(symbols.some((symbol) => String(symbol).includes('log')), false,
    '**NO SYMBOL-KEYED SPELLING OF THE LOG STANDS ON THE RECORD** — a private channel would put a magic string in '
      + 'every consumer\'s source, which is the reason `§1.1` item 1 gives for the string name: '
      + `${JSON.stringify(symbols.map(String))}`);
  assert.equal(Object.hasOwn(answer, 'log'), true,
    'and the string name is the name that answers: `log`, the very name the refusal form uses '
      + '(the refusal\'s third declared member, `StoreRefusal.log`)');

  // ── (b) THE SAME BYTES AS THE WITNESS BESIDE IT — NO NEW KIND OF MEMBER (`§1.1` item 2). ─────────────
  const logShape = accessorShape(answer, 'log');
  const witnessShape = accessorShape(answer, 'discarded');
  assert.equal(witnessShape.present, true,
    'the witness `discarded` rides the same record, which is what makes this a SECOND USE of one device and not a '
      + `second device (\`D-75\`): ${JSON.stringify(witnessShape)}`);
  for (const byte of ['get', 'enumerable', 'configurable']) {
    assert.equal(logShape[byte], witnessShape[byte],
      `**THE TWO MEMBERS' \`${byte}\` READ THE SAME BYTE** — one helper, one shape, so a consumer who has read the `
        + `witness has already read this: log ${JSON.stringify(logShape[byte])} against witness `
        + `${JSON.stringify(witnessShape[byte])}`);
  }

  // ── (c) AND A COPY LOSES IT WHILE THE RECORD KEEPS IT (`§1.1` item 3's declared consequence). ────────
  assert.equal('log' in { ...answer }, false,
    '**A SPREAD LOSES THE MEMBER**, exactly as it loses `discarded` and `commit` — the declared consequence of a '
      + `non-enumerable own accessor, and not a defect: `
      + `${JSON.stringify(Object.getOwnPropertyNames({ ...answer }))}`);
  assert.equal('log' in Object.assign({}, answer), false,
    `and so does \`Object.assign\`: ${JSON.stringify(Object.getOwnPropertyNames(Object.assign({}, answer)))}`);
  assert.equal(Object.hasOwn(answer, 'log'), true,
    'while the record it was defined on still carries it — the loss is the COPY\'s and not the record\'s');
  assert.equal(Object.hasOwn(receipt.value, 'log'), true,
    'and the same holds on the receipt, the record whose own-name census `§1.1` names as the one that moves: '
      + `${JSON.stringify(accessorShape(receipt.value, 'log'))}`);

  t.diagnostic(`RLU-3 · THE DEVICE: symbols ${JSON.stringify(symbols.map(String))}; \`log\` `
    + `${JSON.stringify(logShape)} against \`discarded\` ${JSON.stringify(witnessShape)}; a spread reads `
    + `${JSON.stringify(Object.getOwnPropertyNames({ ...answer }))} and an \`Object.assign\` copy `
    + `${JSON.stringify(Object.getOwnPropertyNames(Object.assign({}, answer)))}, while the record reads `
    + `${JSON.stringify(Object.getOwnPropertyNames(answer))}.`);
});
