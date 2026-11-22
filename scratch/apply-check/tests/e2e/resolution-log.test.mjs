// tests/e2e/resolution-log.test.mjs — `RSL-1`–`RSL-9`: `D-119`'s cells, at the e2e scope (`D-5`).
//
// **THE RULING** (`strata/decisions.md` · `D-119`, 2026-11-02, `main`, landed at `5325526`), the architect, verbatim:
//
//   *"Cache the log and pass to the surface on resolution, same as on failure. This is needed so that manual data
//   changes can check what additional data changed downstream of their request"*
//
// **THE OPERATIVE DEMAND IN ONE SENTENCE, SO EVERY CELL BELOW IS CHECKED AGAINST IT: a call that PASSES answers
// with the entries its commit appended, exactly as a refusal does — same list, same objects, same `LogEntry`
// shape, same order.** **The declaration is `docs/specs/storeroom-file-save-coverage/resolution-log.md`: `§6` is
// the cell set this file is (`RSL-1`–`RSL-9`), `§4` is what the list holds and in what order, `§5` is the
// stability rule, and `§7` is the prose.**
//
// **THE FORM THE TREE CARRIES, MEASURED BEFORE ANY CELL ASSERTS IT** (`§1.1`): a `Symbol`-FREE, STRING-keyed,
// NON-ENUMERABLE own ACCESSOR at the name `log` — the device `discarded` already uses — present on all three
// record answers a passing call makes (`write`'s record, `delete`'s receipt, `rollback`'s record). **So it is
// `Object.keys` and every deep-equality that are UNMOVED, and `Object.getOwnPropertyNames` that gains ONE name
// on a receipt** (that census is `surface.test.mjs`'s and `HLI-07.6`'s, re-derived at `§6.2`, and no cell here
// repeats it).
//
// **WHAT EACH CELL OWNS, AND WHAT IT DELIBERATELY DOES NOT.**
//   * `RSL-1` the passing write's list — a pair refuses, its repair lands at another address, and the list holds
//     the `constraint-check`, the `repair-run` and the closing `commit` entry **in append order**, the position
//     read as the ARRAY INDEX (`D-65`: no `seq` member);
//   * `RSL-2` **THE RULING'S OWN GROUND DRIVEN**: the `repair-run` entry's `opId` names the repair's op and a
//     `read` at the repair's address equals what that repair wrote — *the audit a manual data change is now able
//     to take*;
//   * `RSL-3` **a passing write over a store carrying NO pair answers ONE entry, `kind === 'commit'`** — the arm
//     `§4.3` corrects, asserted as the tree produces it (`[]` is a value this tree cannot produce there);
//   * `RSL-4` the JOINED arm: a constraint body's nested `write` answers `[]` (`§4.2`) **and the enclosing write's
//     answer carries the nested write's own entries** (`DW-09.2`'s shape, read for the log);
//   * `RSL-5` a passing `delete`: its list ends with `commit`, **and `receipt.log === receipt.commit`'s own
//     `COMMIT_LOG` array BY IDENTITY** (`§3.2`: one list, two names on it); the `D-3` delete answers `[]`;
//   * `RSL-6` a passing `rollback` whose judgement runs a repair carries the `repair-run` entry; a `rollback` that
//     appended nothing answers `[]`; the member is PRESENT on both (`§3.3`, `§4.3`);
//   * `RSL-7` the refusal is UNMOVED: a `ConstraintPassRefused`'s `log` still reads the commit's list,
//     `Object.keys(caught)` still `["status","message","log","address"]`, **and the entries are the very objects a
//     passing answer about the same commit carries — by identity, which is `D-119` item 4's own sentence**;
//   * `RSL-8` the stability rule (`§5`): `record.log === record.log`, frozen, a `push` THROWS, the descriptor reads
//     `enumerable: false` / `configurable: true` / a getter — **and the fact that decides the carry moves no
//     census of the sealed report**;
//   * `RSL-9` the non-carriage arms (`§3.4`, `§3.5`): `'log' in addConstraint(…)` is `false` and the identity's own
//     names are unmoved; `constraintOn` answers `undefined`; a `storeCreate` carrying `cfg.constraints` answers
//     an instance whose `Object.getOwnPropertyNames` still reads FOURTEEN.
//
// **LAYER: ENVELOPE/PURE. APP LAYER: NONE.** **RUN: `node --test tests/e2e/resolution-log.test.mjs`** (from the
// repository root), or with the whole battery: `node --test "tests/**/*.test.mjs"`.
//
// **`D-17`**: the expectation is a literal in the cell and the citation is a comment — no `docs/**` path is opened
// at runtime. **`D-21`**: every cell prints the readings it took at its own `t.diagnostic`, and a cell that cannot
// reach its arm asserts the DRIVE's coherence FIRST and says so instead of reporting a verdict. **`D-5`**: this
// file sits in `tests/e2e/`, the battery the assembled package is driven through its declared entry in. **`D-6`/
// `D-7`**: the entry is reached BY PATH — no cell here claims the packaged resolution.
//
// **AND ONE NOTE ABOUT THE FOLD — `§6.1` DECLARES TWO PATHS, AND THIS PASS WROTE ONE.** `resolution-log.md §6.1`
// row 2 places the accessor's SHAPE census at `tests/unit/js-constraints/resolution-log.test.mjs`; **this pass's
// write scope is `tests/e2e/` only**, so that row's SUBSTANCE — the getter, `enumerable: false`,
// `configurable: true`, the presence on every `[]` arm, `Object.keys` reading three/four/three, every
// deep-equality unmoved, and the sealed report's census unmoved by `COMMIT_LOG_SHARED` — is asserted here, at
// `RSL-8`, and the unit-scope HOME for it is owed and named as owed rather than silently skipped.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { COMMIT_LOG } from '../../bindings/js/src/entry/state.mjs';
import { COMMIT_LOG_SHARED, sealHandoff } from '../../bindings/js/src/entry/kernel-foundations.mjs';

/** `D-119`'s member is an ACCESSOR on a record whose DECLARED members are unmoved, so these three lists are the
 *  enumerable censuses a consumer reads and none of them gains a name (`A117` (D6); `§1.1`). */
const WRITE_RECORD_MEMBERS = ['op', 'triggered', 'watched'];
const DELETE_RECEIPT_MEMBERS = ['address', 'op', 'tiers', 'triggered'];
const ROLLBACK_RECORD_MEMBERS = ['opId', 'restoredTo', 'undoneOps'];
/** The kernel's FIVE-member `LogEntry` (`index.d.ts:421`–`:427`) — the same objects a refusal crosses with, and
 *  no sixth member: `seq` is gone and the ARRAY INDEX is the position (`D-65`). */
const LOG_ENTRY_MEMBERS = ['id', 'kind', 'message', 'opId', 'state'];
/** The kernel's CLOSED four kinds (`§4.1`). */
const LOG_KINDS = ['constraint-check', 'repair-run', 'commit', 'outcome'];

const SEED = 5;      // the state the pair ADMITS
const REFUSED = 9;   // the outer write's value — the state the pair REFUSES
const REPAIRED = 11; // the value the repair lands, at the beside address

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

/** The store's own `read`, read as a VALUE so an absent address is a reading and not a crash. */
function standing(store, address) {
  const answer = captured(() => store.read(address));
  return answer.ok ? answer.value : `<${answer.caught.status}>`;
}

/** A failure's two columns, so a red reports them instead of a `TypeError` inside the message builder. */
const shapeOf = (caught) => ({
  status: caught !== null && typeof caught === 'object' ? caught.status ?? null : null,
  message: caught !== null && typeof caught === 'object' && typeof caught.message === 'string'
    ? caught.message
    : String(caught),
});

/**
 * **THE REGISTRATION-INSTANT SHIELD — `A135` (3) / `contract.md §7.3` (b) state 1, THE HOUSE DEVICE.** A body that
 * carries a `repair` is ATTEMPTED at its own registration, so an unshielded fixture would spend its repair (and
 * its op, and its `repair-run` entry) at the registration instead of at the pass the cell drives. **THE
 * DISCRIMINATOR IS THE PAIR OF MEMBERS A LANDING'S CONTEXT NEVER CARRIES TOGETHER — `tier` and `op` BOTH
 * `null`** — which is the one shape this tree's registration instant answers with, and it is used ONLY where a
 * cell registers a body carrying a repair. Every other body in this file is written so that its REGISTRATION
 * ask passes on the state standing then, and needs no shield.
 */
const shield = (body) => (context) => (
  context !== null && typeof context === 'object' && context.tier === null && context.op === null
    ? true
    : body(context)
);

/** The `kind` of every entry, in append order — the reading most of these cells are decided on. */
const kindsOf = (list) => list.map((entry) => entry.kind);

/** **THE ONE CENSUS EVERY ENTRY OWES**: the five declared members, no `seq`, and the element IS the list's
 *  element at its own index (`D-65`'s ordinal). */
function assertEntryCensus(list, label) {
  for (let index = 0; index < list.length; index += 1) {
    const entry = list[index];
    assert.deepEqual(Object.keys(entry).sort(), [...LOG_ENTRY_MEMBERS].sort(),
      `${label}: every entry of the list carries exactly ${JSON.stringify(LOG_ENTRY_MEMBERS)} — the kernel's `
        + `five-member \`LogEntry\` (\`§4.1\`). THE DRIVE READ ${JSON.stringify(Object.keys(entry))} at index `
        + `${index}: ${JSON.stringify(entry)}`);
    assert.equal(Object.hasOwn(entry, 'seq'), false,
      `${label}: the POSITION is the ARRAY INDEX and no member restates it (\`D-65\`). THE DRIVE READ a \`seq\` `
        + `member at index ${index}: ${JSON.stringify(entry)}`);
    assert.equal(LOG_KINDS.includes(entry.kind), true,
      `${label}: \`kind\` is one of the kernel's closed four ${JSON.stringify(LOG_KINDS)}. THE DRIVE READ `
        + `${JSON.stringify(entry.kind)} at index ${index}`);
    assert.equal(list[index], entry,
      `${label}: the entry at index ${index} IS the list's element there — one list, no copy-out`);
  }
}

/**
 * **THE REPAIR DRIVE `RSL-1`, `RSL-2` AND `RSL-7` EACH BUILD FOR THEMSELVES** (`§6.1` row 1's own fixture): a pair
 * at `['<label>-a']` admits `SEED` and refuses `REFUSED`, and its repair lands `REPAIRED` at the BESIDE address
 * `['<label>-z']`, naming its commit at `write`'s FOURTH position — the supported route (`D-46`, `D-103`), so the
 * repair's write JOINS the attempt's commit and opens no second one.
 */
function repairDrive(label) {
  const store = make();
  const address = [`${label}-a`];
  const beside = [`${label}-z`];
  store.write(address, 'mem', SEED);
  const asked = [];
  let repairs = 0;
  let repairRecord = null;
  const registered = captured(() => store.addConstraint({ address, id: label }, shield((context) => {
    asked.push(context.value);
    if (context.value !== REFUSED) return true;
    return {
      message: 'the landed value is not one this pair admits',
      repair: (repairContext) => {
        repairs += 1;
        const landed = captured(() => store.write(beside, 'mem', REPAIRED, repairContext));
        assert.equal(landed.ok, true,
          `the repair's own write must LAND — it caught ${JSON.stringify(shapeOf(landed.caught))}, and a red `
            + `below would be this drive's and not the carrier's`);
        repairRecord = landed.value;
        return { ok: true, op: landed.value.op };
      },
    };
  })));
  const written = captured(() => store.write(address, 'mem', REFUSED));
  return { store, address, beside, asked, registered, written, repairs: () => repairs, repairRecord: () => repairRecord };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RSL-1` · THE PASSING WRITE'S LIST — the three entries the ruling names, in APPEND ORDER
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RSL-1 · A PASSING WRITE ANSWERS WITH ITS COMMIT\'S OWN LIST: the refusing pair\'s `constraint-check`, the `repair-run` that landed an edit at another address, and the `commit` entry that closes the arm — in APPEND ORDER, the position read as the array index', (t) => {
  const drive = repairDrive('rsl1');
  const { store, address, beside, asked, registered, written } = drive;

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(registered.ok, true,
    `the pair must REGISTER (it admits ${SEED} and refuses only ${REFUSED}): the call caught `
      + `${JSON.stringify(shapeOf(registered.caught))}`);
  assert.equal(written.ok, true,
    `the write must COMPLETE — the repair lands a value its own re-run admits, so the PASSING arm is the one `
      + `this cell reads: it caught ${JSON.stringify(shapeOf(written.caught))}`);
  assert.equal(drive.repairs(), 1,
    `the repair must have RUN ONCE, or the \`repair-run\` entry this cell reads is not the one it claims: the `
      + `drive counted ${drive.repairs()}`);

  const record = written.value;
  const list = record.log;

  // ── (a) THE MEMBER IS PRESENT, IT IS THE COMMIT'S LIST, AND IT IS A LIST. ───────────────────
  assert.equal(Object.hasOwn(record, 'log'), true,
    'a PASSING `write` carries `log` (`D-119` item 1: *"same as on failure"*) — the member is PRESENT on the '
      + 'passing arm, `[]` included (`D-77`/`D-78`), and it is never absent and never `undefined`');
  assert.equal(Array.isArray(list), true,
    `the member answers a LIST and not a value of another class: the drive read ${JSON.stringify(list)}`);
  assert.equal(list.length > 0, true,
    'and on a commit that asked a pair, ran its repair and closed its arm the list is NOT empty: '
      + `${JSON.stringify(list)}`);

  // ── (b) THE THREE ENTRIES, IN THE ORDER THE COMMIT APPENDED THEM (`§4.1`). ──────────────────
  const kinds = kindsOf(list);
  assert.equal(list[0].kind, 'constraint-check',
    `the list OPENS with the pass's first ask — the \`constraint-check\` entry for the pair that refused: the `
      + `drive read ${JSON.stringify(kinds)} and the first entry is ${JSON.stringify(list[0])}`);
  assert.equal(list[0].id, 'rsl1',
    `and it NAMES the pair that refused, at the entry's own \`id\` column: `
      + `${JSON.stringify(list[0].id)}`);
  const repairRuns = list.filter((entry) => entry.kind === 'repair-run');
  assert.equal(repairRuns.length, 1,
    `exactly ONE \`repair-run\` entry stands in the list — one repair ran, and the entry is appended once `
      + `(\`§4.1\`): the drive read ${JSON.stringify(kinds)}`);
  const repairIndex = list.indexOf(repairRuns[0]);
  assert.equal(repairIndex > 0 && repairIndex < list.length - 1, true,
    `and it stands BETWEEN the ask that refused and the entry that closes the arm — append order, not `
      + `re-ordering: the drive read index ${repairIndex} of ${list.length}`);
  const closing = list[list.length - 1];
  assert.equal(closing.kind, 'commit',
    `THE LIST ENDS WITH THE PASSING ARM'S \`commit\` ENTRY\` (\`§4.1\`: the kernel appends it AFTER the save and `
      + `AFTER the delivery, once, and nothing appends after it): the drive read ${JSON.stringify(kinds)}`);
  assert.equal(closing.id, null,
    `and its \`id\` is \`null\` — no pair names a commit entry: ${JSON.stringify(closing)}`);
  assert.equal(closing.state, null,
    `and its \`state\` is \`null\` — a passing arm mints no status: ${JSON.stringify(closing)}`);
  assert.deepEqual(kinds, ['constraint-check', 'repair-run', 'constraint-check', 'commit'],
    `THE TREE'S OWN APPEND ORDER AT THIS DRIVE, PRINTED AS THE LIST ITSELF: the ask that refused, the repair `
      + `that landed, the RE-RUN's ask that passed, and the commit that closes the arm. A different sequence is `
      + `a different commit and not a different reading of this one. THE DRIVE READ ${JSON.stringify(kinds)}`);

  // ── (c) THE ORDINAL IS THE ARRAY INDEX, AND EVERY ENTRY IS THE KERNEL'S FIVE. ────────────────
  assertEntryCensus(list, 'RSL-1');
  assert.equal(closing.opId, drive.repairRecord().op.opId,
    `and the closing entry names the attempt's LAST op — the repair's, because the repair is the landing that `
      + `left the state the commit stands at: the drive read ${JSON.stringify(closing.opId)} against `
      + `${JSON.stringify(drive.repairRecord().op.opId)}`);
  assert.equal(standing(store, beside), REPAIRED,
    `and the repair's own op stands at the beside address it wrote: ${JSON.stringify(standing(store, beside))}`);
  assert.equal(standing(store, address), REFUSED,
    `and the value the attempt wrote stands at its own address — the repair moved a BESIDE state: `
      + `${JSON.stringify(standing(store, address))}`);
  assert.deepEqual(asked, [REFUSED, REPAIRED],
    `and the pair was asked by the PASS at the refused value and by the RE-RUN at the repaired one (the house `
      + `shield answers the registration ask itself, so the body sees neither): ${JSON.stringify(asked)}`);

  t.diagnostic(`RSL-1 · THE PASSING WRITE'S LIST (${list.length} entries): `
    + `${JSON.stringify(list.map((entry) => ({ kind: entry.kind, id: entry.id, opId: entry.opId })))} — the pair `
    + `was asked ${JSON.stringify(asked)}, the repair landed ${JSON.stringify(drive.repairRecord().op.opId)} at `
    + `${JSON.stringify(beside)}, and the enclosing record's ENUMERABLE members are `
    + `${JSON.stringify(Object.keys(record).sort())}.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RSL-2` · THE RULING'S OWN GROUND DRIVEN — the audit a manual data change can now take
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RSL-2 · THE AUDIT THE RULING EXISTS FOR: the `repair-run` entry\'s `opId` names the op the repair landed, and a `read` at the address that op moved answers what the repair wrote — the downstream change is READABLE off the answer the caller already holds', (t) => {
  // **THE ARCHITECT'S GROUND, VERBATIM** (`D-119`): *"This is needed so that manual data changes can check what
  // additional data changed downstream of their request"*. **THE RULING IS SATISFIED BY A READING AND NOT BY A
  // CONVENTION**: the entry the passing answer carries names the repair's op, and that op's address answers the
  // repair's value in the STATECRAFT the caller already has — no second call, no `read` sweep and no diff.
  const drive = repairDrive('rsl2');
  const { store, address, beside, registered, written } = drive;
  assert.equal(registered.ok, true,
    `the pair must REGISTER, or there is no repair to audit: it caught ${JSON.stringify(shapeOf(registered.caught))}`);
  assert.equal(written.ok, true,
    `the write must PASS, because a refusal crosses a log of its own and this cell's subject is the PASSING `
      + `answer: it caught ${JSON.stringify(shapeOf(written.caught))}`);

  const list = written.value.log;
  const repairRuns = list.filter((entry) => entry.kind === 'repair-run');
  assert.equal(repairRuns.length, 1,
    `the audit has ONE repair to read on this drive: the list read ${JSON.stringify(kindsOf(list))}`);
  const entry = repairRuns[0];
  const landedOpId = drive.repairRecord().op.opId;

  // ── (a) THE ENTRY NAMES THE OP THE REPAIR LANDED. ────────────────────────────────────────────
  assert.equal(typeof entry.opId, 'string',
    `the \`repair-run\` entry's \`opId\` is the op's own id and not a placeholder: `
      + `${JSON.stringify(entry)}`);
  assert.equal(entry.opId, landedOpId,
    `**AND IT IS THE REPAIR'S OWN OP** — the id the repair body's write answered at its own \`op.opId\`: the `
      + `drive read ${JSON.stringify(entry.opId)} against ${JSON.stringify(landedOpId)}`);
  assert.equal(entry.id, 'rsl2',
    `and the entry names the pair whose repair it was: ${JSON.stringify(entry.id)}`);
  assert.equal(entry.message.includes(landedOpId), true,
    `and the entry's own sentence names that op, so a consumer reading the message alone is not left to guess `
      + `which landing the entry is about: ${JSON.stringify(entry.message)}`);

  // ── (b) AND A `read` AT THE ADDRESS THE REPAIR MOVED ANSWERS WHAT IT WROTE. ──────────────────
  assert.notDeepEqual(beside, address,
    `the drive must land its repair at an address OTHER than the write's own, or the "downstream" change is the `
      + `caller's own act and not a repair's: ${JSON.stringify({ address, beside })}`);
  assert.equal(standing(store, beside), REPAIRED,
    `**THE EDIT THE CALLER DID NOT ASK FOR IS READABLE**: the repair wrote ${JSON.stringify(REPAIRED)} at `
      + `${JSON.stringify(beside)} and the store answers ${JSON.stringify(standing(store, beside))} there`);
  assert.equal(standing(store, address), REFUSED,
    `and the caller's OWN act left its own address at the value it wrote — the repair is a change BESIDE it, `
      + `which is exactly the downstream datum \`D-119\` makes readable: `
      + `${JSON.stringify(standing(store, address))}`);

  t.diagnostic(`RSL-2 · THE AUDIT: the passing answer names ${JSON.stringify(entry.opId)} at its `
    + `\`repair-run\` entry; \`read(${JSON.stringify(beside)})\` answers ${JSON.stringify(standing(store, beside))} `
    + `and \`read(${JSON.stringify(address)})\` answers ${JSON.stringify(standing(store, address))}. The entry `
    + `reads ${JSON.stringify(entry)}.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RSL-3` · A PASSING WRITE WITH NO PAIR ANSWERS ONE ENTRY — the arm `§4.3` CORRECTS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RSL-3 · A PASSING WRITE OVER A STORE CARRYING NO PAIR ANSWERS ONE ENTRY, `kind === \'commit\'` — NOT `[]`: the passing arm appends its `commit` entry unconditionally, so `[]` is a value this tree cannot produce on that arm', (t) => {
  // **THE CORRECTION `§4.3` MAKES, ASSERTED AS THE TREE PRODUCES IT.** A cell that asserted `[]` here would assert
  // a value the tree cannot produce: the passing arm appends its `commit` entry **unconditionally**
  // (`kernel-attempt.mjs:487`–`:503`), and it is reached with a `list` of ZERO pairs exactly as with `N`.
  const store = make();
  const address = ['rsl3-a'];
  store.write(address, 'mem', SEED);
  const record = store.write(address, 'mem', SEED + 1);

  assert.deepEqual(store.constraints(), [],
    `the drive must carry NO pair at any address, or this is \`RSL-1\`'s arm and not this one: the instance `
      + `reported ${JSON.stringify(store.constraints())}`);
  const list = record.log;
  assert.equal(Array.isArray(list), true,
    `the member is present and is a list: ${JSON.stringify(list)}`);
  assert.equal(list.length, 1,
    `**ONE ENTRY AND NOT ZERO**: the passing arm appends its \`commit\` entry unconditionally, so this arm's `
      + `honest list is \`[commit]\`. THE DRIVE READ ${JSON.stringify(list)}`);
  assert.equal(list[0].kind, 'commit',
    `and that one entry's \`kind\` is \`commit\`: ${JSON.stringify(list[0])}`);
  assert.equal(list[0].opId, record.op.opId,
    `and it names the attempt's own op: ${JSON.stringify(list[0].opId)} against `
      + `${JSON.stringify(record.op.opId)}`);
  assert.equal(list.some((entry) => entry.kind === 'constraint-check'), false,
    `and no \`constraint-check\` entry stands in it — no pair was asked: ${JSON.stringify(kindsOf(list))}`);
  assertEntryCensus(list, 'RSL-3');

  t.diagnostic(`RSL-3 · THE NO-PAIR ARM: the passing record's log is ${JSON.stringify(list)} — `
    + `${list.length} entr(y/ies), kinds ${JSON.stringify(kindsOf(list))}; the instance carries `
    + `${store.constraints().length} pair(s).`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RSL-4` · THE JOINED ARM — `[]` ON THE NESTED CALL, AND THE ENCLOSING ANSWER CARRIES ITS ENTRIES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RSL-4 · THE JOINED ARM: a constraint body\'s nested `write` answers `[]` — the commit it joined has not crossed — AND the enclosing write\'s answer carries the nested write\'s own entries, so the act that owns the commit reports them', (t) => {
  // **`§4.2`'S SENTENCE, READ FOR THE LOG** (`index.mjs:632`–`:637`; `DW-09.2`): *"A JOINED DELETE THEREFORE ANSWERS
  // `[]` AND MEANS IT ABOUT ITS OWN WINDOW — the raises its delivery made are in the enclosing window, and the act
  // that owns that window is the one that reports them."* **A FROZEN PREFIX COPY IS REFUSED BY `D-119` ITEM 4**: a
  // copy taken at the nested crossing necessarily holds fewer entries than the enclosing commit's later answer,
  // and the two would disagree. **One list, one crossing, one answer.**
  const store = make();
  const outerAddress = ['rsl4-a'];
  const nestedAddress = ['rsl4-n'];
  store.write(outerAddress, 'mem', 1);
  store.write(nestedAddress, 'mem', 1);
  const innerAsks = [];
  const innerPair = captured(() => store.addConstraint({ address: nestedAddress, id: 'rsl4-n' },
    (context) => { innerAsks.push(context.value); return true; }));
  let nested = null;
  const outerPair = captured(() => store.addConstraint({ address: outerAddress, id: 'rsl4-a' },
    () => {
      // **THE NESTED CALL IS A BODY'S THREE-POSITION `write`** — it names no commit (`D-46`: a repair names one, a
      // constraint body has none in hand), so it JOINS the enclosing commit (`D-53`).
      nested = captured(() => store.write(nestedAddress, 'mem', 7));
      return true;
    }));
  const written = captured(() => store.write(outerAddress, 'mem', 2));

  // ── THE DRIVE IS COHERENT. ──────────────────────────────────────────────────────────────────
  assert.equal(innerPair.ok, true,
    `the pair at the nested address must REGISTER: it caught ${JSON.stringify(shapeOf(innerPair.caught))}`);
  assert.equal(outerPair.ok, true,
    `the pair at the outer address must REGISTER: it caught ${JSON.stringify(shapeOf(outerPair.caught))}`);
  assert.equal(written.ok, true,
    `the enclosing write must PASS, or this is a refusal's arm: it caught ${JSON.stringify(shapeOf(written.caught))}`);
  assert.notEqual(nested, null, 'the body must have made its nested write');
  assert.equal(nested.ok, true,
    `and that nested write must LAND — it joins the enclosing commit and opens no second one: it caught `
      + `${JSON.stringify(shapeOf(nested.caught))}`);

  const nestedRecord = nested.value;
  const outerList = written.value.log;
  const nestedList = nestedRecord.log;

  // ── (a) THE NESTED ANSWER IS `[]`, IS PRESENT, AND IS NOT THE ENCLOSING LIST. ────────────────
  assert.equal(Object.hasOwn(nestedRecord, 'log'), true,
    'the nested pass carries the member too — PRESENT on every passing answer (`D-77`/`D-78`)');
  assert.equal(Array.isArray(nestedList), true,
    `and it answers a LIST: ${JSON.stringify(nestedList)}`);
  assert.deepEqual([...nestedList], [],
    `**\`[]\` IS THIS CALL'S HONEST VALUE**: it joined an enclosing commit whose list has NOT crossed, so it has no `
      + `list of its own to hand over and it takes no frozen prefix copy (\`§4.2\`). THE DRIVE READ `
      + `${JSON.stringify(nestedList)}`);
  assert.notEqual(nestedList, outerList,
    'and it is NOT the enclosing commit\'s list — one list, one crossing, one answer, and this call is not the '
      + 'one that owns the crossing');
  assert.equal(nestedRecord.op.opId !== null && typeof nestedRecord.op.opId === 'string', true,
    `and the nested write DID land, with its own op — the empty list says *"nothing it can report"* and never `
      + `*"nothing happened"* (\`D-78\`): ${JSON.stringify(nestedRecord.op.opId)}`);

  // ── (b) AND THE ENCLOSING ANSWER CARRIES THE NESTED WRITE'S OWN ENTRIES. ─────────────────────
  const nestedOpId = nestedRecord.op.opId;
  const carrying = outerList.filter((entry) => entry.opId === nestedOpId);
  assert.equal(carrying.length > 0, true,
    `**THE ENCLOSING ANSWER CARRIES THE NESTED CALL'S ENTRIES**: the nested write's op is `
      + `${JSON.stringify(nestedOpId)} and the outer list is `
      + `${JSON.stringify(outerList.map((entry) => ({ kind: entry.kind, id: entry.id, opId: entry.opId })))}`);
  assert.equal(carrying.some((entry) => entry.kind === 'constraint-check' && entry.id === 'rsl4-n'), true,
    `and the pair asked AT THE NESTED ADDRESS is one of them: ${JSON.stringify(carrying)}`);
  assert.equal(carrying.some((entry) => entry.kind === 'commit'), true,
    `and so is the nested attempt's own \`commit\` entry — the joined arm's closing entry, in the enclosing list `
      + `because there is ONE list (\`D-53\`): ${JSON.stringify(carrying)}`);
  assert.equal(outerList[outerList.length - 1].kind, 'commit',
    `and the list still ENDS with the enclosing arm's own \`commit\` entry, in append order: `
      + `${JSON.stringify(kindsOf(outerList))}`);
  assertEntryCensus(outerList, 'RSL-4');
  assert.deepEqual(Object.keys(nestedRecord).sort(), WRITE_RECORD_MEMBERS,
    `and the nested answer's DECLARED members are unmoved by the member it now carries `
      + `(${JSON.stringify(Object.keys(nestedRecord).sort())})`);
  assert.deepEqual(innerAsks.includes(7), true,
    `and the pair at the nested address was asked the nested write's value: ${JSON.stringify(innerAsks)}`);

  t.diagnostic(`RSL-4 · THE JOINED ARM: the nested write answered log ${JSON.stringify(nestedList)} and its own op `
    + `${JSON.stringify(nestedOpId)}; the enclosing answer's log is `
    + `${JSON.stringify(outerList.map((entry) => ({ kind: entry.kind, id: entry.id, opId: entry.opId })))} — `
    + `${carrying.length} of its entries name the nested op. The pair at the nested address was asked `
    + `${JSON.stringify(innerAsks)}.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RSL-5` · A PASSING `delete` — the list ends with `commit`, and the member IS the commit's own array
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RSL-5 · A PASSING `delete` CARRIES ITS COMMIT\'S LIST AND `receipt.log` IS `receipt.commit`\'s OWN `COMMIT_LOG` ARRAY BY IDENTITY — one list, two names on it — and the `D-3` delete, which removed nothing, answers `[]`', (t) => {
  const store = make();
  const address = ['rsl5-a'];
  store.write(address, 'mem', SEED);
  const removed = captured(() => store.delete(address, 'mem'));
  assert.equal(removed.ok, true,
    `the delete must PASS, or this is a refusal's arm: it caught ${JSON.stringify(shapeOf(removed.caught))}`);
  const receipt = removed.value;
  const list = receipt.log;

  // ── (a) THE RECEIPT'S LIST ENDS WITH ITS OWN `commit` ENTRY. ────────────────────────────────
  assert.equal(Object.hasOwn(receipt, 'log'), true,
    'a passing `delete` carries `log` — the same member at the same name as the `write`\'s record');
  assert.equal(Array.isArray(list), true, `and it answers a LIST: ${JSON.stringify(list)}`);
  assert.equal(list.length > 0, true, `and this arm appended: ${JSON.stringify(list)}`);
  assert.equal(list[list.length - 1].kind, 'commit',
    `and the list ENDS with the deleted attempt's \`commit\` entry (\`§4.1\`): the drive read `
      + `${JSON.stringify(kindsOf(list))}`);
  assertEntryCensus(list, 'RSL-5');

  // ── (b) ★ `receipt.log` AND `receipt.commit[COMMIT_LOG]` ARE THE SAME ARRAY — BY IDENTITY. ───
  assert.notEqual(receipt.commit, null,
    `the passing delete ADOPTS the \`CommitRecord\` the act minted (\`D-55\`), so there is a commit to read: `
      + `${JSON.stringify(receipt.commit === null)}`);
  const symbol = COMMIT_LOG;
  assert.equal(strictIdentityOf(receipt.commit),
    true,
    'the \`CommitRecord\` carries the commit\'s list under the tree\'s own `Symbol.for` key '
      + '(`provident-storeroom.commit-log`), and the drive must be able to read it');
  assert.equal(list === receipt.commit[symbol], true,
    `**ONE LIST AND TWO NAMES ON IT** (\`§3.2\`): \`receipt.log\` IS \`receipt.commit[COMMIT_LOG]\` — the SAME `
      + `array, not an equal one, so the \`log\` name is where the consumer should read and no second route to one `
      + `list is built. THE DRIVE READ identity ${String(list === receipt.commit[symbol])}`);
  assert.equal(Object.isFrozen(list), true,
    `and that one array is the one the seal froze at the crossing, so the two names cannot disagree later: `
      + `${JSON.stringify(Object.isFrozen(list))}`);

  // ── (c) AND THE `D-3` DELETE — an act that removed nothing — ANSWERS `[]`, PRESENT. ─────────
  const nothing = make();
  nothing.write(['rsl5-b'], 'mem', SEED);
  const d3 = captured(() => nothing.delete(['rsl5-b'], 'file'));
  assert.equal(d3.ok, true,
    `the \`D-3\` drive's delete must answer a receipt — nothing stands at \`file\`, so nothing is removed and no `
      + `attempt opens: it caught ${JSON.stringify(shapeOf(d3.caught))}`);
  assert.equal(d3.value.commit, null,
    `and that receipt's \`commit\` is \`null\` — no attempt, no record (\`D-21\`): `
      + `${JSON.stringify(d3.value.commit)}`);
  assert.equal(Object.hasOwn(d3.value, 'log'), true,
    '**AND THE MEMBER IS PRESENT ON THAT ARM TOO** — `[]` is never absent and never `undefined` '
      + '(`D-77`/`D-78` read for a third member)');
  assert.deepEqual([...d3.value.log], [],
    `and its honest value is \`[]\`: no attempt was opened, no pass ran and no entry was appended `
      + `(\`§4.3\`'s second shape). THE DRIVE READ ${JSON.stringify(d3.value.log)}`);
  assert.equal(Object.isFrozen(d3.value.log), true,
    'and that `[]` is a frozen list, so no consumer can grow a list this act owns no crossing for');
  assert.equal(standing(nothing, ['rsl5-b']), SEED,
    `and the value still stands at \`mem\` — a \`file\`-tier delete removed nothing: `
      + `${JSON.stringify(standing(nothing, ['rsl5-b']))}`);

  t.diagnostic(`RSL-5 · THE DELETE: the passing receipt's log is ${JSON.stringify(list)}; `
    + `\`receipt.log === receipt.commit[COMMIT_LOG]\` reads ${String(list === receipt.commit[symbol])}; the D-3 `
    + `delete's receipt carries commit ${JSON.stringify(d3.value.commit)} and log `
    + `${JSON.stringify(d3.value.log)}, and its own member names read `
    + `${JSON.stringify(Object.getOwnPropertyNames(d3.value))}.`);
});

/** Does the record carry the tree's own `Symbol.for` commit-log key at all? A receipt whose commit is `null` has
 *  no such record, and a drive that assumed one would report a `TypeError` instead of a reading. */
function strictIdentityOf(record) {
  return record !== null && typeof record === 'object' && Array.isArray(record[COMMIT_LOG]);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RSL-6` · A PASSING `rollback` CARRIES ITS JUDGEMENT'S LIST
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RSL-6 · A PASSING `rollback` CARRIES ITS JUDGEMENT\'S LIST: a judgement that ran a repair answers the `repair-run` entry, a `rollback` that appended nothing answers `[]`, and the member is PRESENT on both', (t) => {
  // **THE ARM `D-119`'S GROUND APPLIES TO MOST SHARPLY** (`§3.3`): `D-113` item 3 makes a reversal's judgement run
  // the caller's pairs' repairs, so **a `rollback` can land an edit the caller did not ask for** — and that edit's
  // `repair-run` entry is what this member makes readable. **THE LIST IS THE JUDGEMENT'S OWN `judgementLog`,
  // frozen in place at that frame's end and answered, and NOT a copy of it.**
  const store = make();
  const address = ['rsl6-a'];
  store.write(address, 'mem', 1);
  const second = store.write(address, 'mem', 5);
  const asked = [];
  let repairs = 0;
  let repairOpId = null;
  const registered = captured(() => store.addConstraint({ address, id: 'rsl6' }, (context) => {
    asked.push(context.value);
    // **THIS BODY NEEDS NO SHIELD AND IS DELIBERATELY WRITTEN WITHOUT ONE**: its registration ask sees `5`, which
    // it admits — **and the member pair this tree hands a judgement's ask carries `tier` and `op` BOTH `null`,
    // exactly as the registration instant does**, so the house `shield` would answer `true` here and the repair
    // would never run. The value is the discriminator, and it is the honest one.
    if (context.value !== 1) return true;
    return {
      message: 'the state the reversal restored is not one this pair admits',
      repair: (repairContext) => {
        repairs += 1;
        const landed = captured(() => store.write(address, 'mem', 5, repairContext));
        assert.equal(landed.ok, true,
          `the judgement's repair must LAND — it caught ${JSON.stringify(shapeOf(landed.caught))}`);
        repairOpId = landed.value.op.opId;
        return { ok: true, op: landed.value.op };
      },
    };
  }));
  const reversed = captured(() => store.rollback(second.op.opId));

  assert.equal(registered.ok, true,
    `the pair must REGISTER (it admits 5 and refuses only 1): it caught ${JSON.stringify(shapeOf(registered.caught))}`);
  assert.equal(reversed.ok, true,
    `**THE REVERSAL MUST PASS** — the repair lands the value the pair admits, so the judgement closes on its `
      + `passing arm: it caught ${JSON.stringify(shapeOf(reversed.caught))}`);
  assert.equal(repairs, 1, `and the judgement must have RUN the repair once: it counted ${repairs}`);

  const record = reversed.value;
  const list = record.log;

  // ── (a) THE JUDGEMENT'S LIST, WITH THE `repair-run` ENTRY THE REPAIR LEFT IN IT. ─────────────
  assert.equal(Object.hasOwn(record, 'log'), true,
    '**THE MEMBER IS PRESENT ON A PASSING REVERSAL** (`§3.3`): every passing `rollback` answer carries it');
  assert.equal(Array.isArray(list), true, `and it answers a LIST: ${JSON.stringify(list)}`);
  const repairRuns = list.filter((entry) => entry.kind === 'repair-run');
  assert.equal(repairRuns.length, 1,
    `**THE JUDGEMENT'S LIST CARRIES THE \`repair-run\` ENTRY** — one repair ran, and its entry is appended to the `
      + `list this frame answers. THE DRIVE READ ${JSON.stringify(kindsOf(list))}`);
  assert.equal(repairRuns[0].opId, repairOpId,
    `and that entry names the op the repair landed: ${JSON.stringify(repairRuns[0].opId)} against `
      + `${JSON.stringify(repairOpId)}`);
  assert.equal(list.some((entry) => entry.kind === 'commit'), false,
    `**AND NO \`commit\` ENTRY EXISTS AND NONE IS INVENTED** — a reversal mints no attempt, so no passing arm runs `
      + `for it (\`§4.1\`): ${JSON.stringify(kindsOf(list))}`);
  assertEntryCensus(list, 'RSL-6');
  assert.deepEqual(Object.keys(record).sort(), ROLLBACK_RECORD_MEMBERS,
    `and the record's DECLARED members are unmoved (${JSON.stringify(Object.keys(record).sort())})`);
  assert.equal(standing(store, address), 5,
    `**AND THE REPAIR'S EDIT IS WHAT STANDS** — the reversal restored 1, the pair refused it, and the repair put `
      + `5 back, so reading the store afterwards answers the downstream change the entry names: `
      + `${JSON.stringify(standing(store, address))}`);

  // ── (b) AND A `rollback` THAT APPENDED NOTHING ANSWERS `[]` — AND IS PRESENT. ────────────────
  const bare = make();
  bare.write(['rsl6-b'], 'mem', 3);
  const third = bare.write(['rsl6-b'], 'mem', 4);
  const atRest = captured(() => bare.rollback(third.op.opId));
  assert.equal(atRest.ok, true,
    `the no-pair store's reversal must PASS — nothing refuses a state no pair stands over: it caught `
      + `${JSON.stringify(shapeOf(atRest.caught))}`);
  assert.equal(Object.hasOwn(atRest.value, 'log'), true,
    '**AND THE MEMBER IS PRESENT ON THE EMPTY ARM TOO** — the at-rest judgement over an empty watch appended '
      + 'nothing, and `[]` says so rather than the member being absent (`§4.3`\'s third shape)');
  assert.deepEqual([...atRest.value.log], [],
    `THE DRIVE READ ${JSON.stringify(atRest.value.log)} — and \`[]\` here means *"this act appended nothing it can `
      + `report"* and never *"nothing happened"*`);
  assert.deepEqual(Object.keys(atRest.value).sort(), ROLLBACK_RECORD_MEMBERS,
    `and that arm's declared members are unmoved too: ${JSON.stringify(Object.keys(atRest.value).sort())}`);

  t.diagnostic(`RSL-6 · THE REVERSAL: the passing judgement's log is `
    + `${JSON.stringify(list.map((entry) => ({ kind: entry.kind, id: entry.id, opId: entry.opId })))}; the pair `
    + `was asked ${JSON.stringify(asked)} and the store stands at ${JSON.stringify(standing(store, address))}. `
    + `The at-rest arm's log is ${JSON.stringify(atRest.value.log)} (present: `
    + `${String(Object.hasOwn(atRest.value, 'log'))}).`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RSL-7` · THE REFUSAL IS UNMOVED — and the entries are the objects the passing answer carries
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RSL-7 · THE REFUSAL IS UNMOVED: `ConstraintPassRefused` still answers the one four-member form with the commit\'s list at `log`, and on ONE commit the refusal\'s list and the passing answer\'s are the SAME ARRAY — a pass and a later refusal can never disagree', (t) => {
  // ── (a) THE DECLARED FORM, AT A CONSUMER'S WRITE. ────────────────────────────────────────────
  const plain = make();
  plain.write(['rsl7-a'], 'mem', SEED);
  plain.addConstraint({ address: ['rsl7-a'], id: 'rsl7' },
    (context) => (context.value === REFUSED ? false : true));
  const refused = captured(() => plain.write(['rsl7-a'], 'mem', REFUSED));
  assert.equal(refused.ok, false, 'the pair must REFUSE this write, or there is no failure arm to read');
  const caught = refused.caught;
  assert.deepEqual(Object.keys(caught), ['status', 'message', 'log', 'address'],
    `**THE ONE THROWN FORM IS THE DECLARED FOUR, MEMBER FOR MEMBER** (\`§2.5\` item 4): status, message, log, `
      + `address — and \`D-119\` moves no byte of it. THE DRIVE READ ${JSON.stringify(Object.keys(caught))}`);
  assert.equal(caught.status, 'ConstraintPassRefused',
    `and its status is the set's rank-20 member: ${JSON.stringify(caught.status)}`);
  assert.equal(Array.isArray(caught.log), true,
    `and \`log\` is a LIST on the failure arm, as it always was: ${JSON.stringify(caught.log)}`);
  assert.equal(Object.isFrozen(caught.log), true,
    'and it is the list the seal froze at the crossing, so a refusal is as stable as a passing answer');
  assert.equal(caught.log.length > 0, true, `and this arm appended: ${JSON.stringify(kindsOf(caught.log))}`);
  assertEntryCensus(caught.log, 'RSL-7 (the refusal)');

  // ── (b) ★ THE PASS AND THE REFUSAL CARRY THE SAME ARRAY, ON ONE COMMIT (`D-119` ITEM 4). ──────
  // A constraint body's nested write is REFUSED while the commit runs; the body catches it and passes. `D-53`
  // makes the nested refusal cross the ENCLOSING commit's list, and the enclosing PASSING answer carries that
  // same list — so the identity below is `D-119` item 4's *"a call that passes and a later refusal on the same
  // commit can never disagree"*, measured and not assumed.
  const joined = make();
  const outerAddress = ['rsl7-o'];
  const innerAddress = ['rsl7-i'];
  joined.write(outerAddress, 'mem', 1);
  joined.write(innerAddress, 'mem', 1);
  joined.addConstraint({ address: innerAddress, id: 'rsl7-i' },
    (context) => (context.value !== 7 ? true : { message: 'the nested value is refused by this pair' }));
  let inner = null;
  let innerCaught = null;
  joined.addConstraint({ address: outerAddress, id: 'rsl7-o' }, () => {
    inner = captured(() => joined.write(innerAddress, 'mem', 7));
    innerCaught = inner.ok ? null : inner.caught;
    return true;
  });
  const passing = captured(() => joined.write(outerAddress, 'mem', 2));
  assert.equal(passing.ok, true,
    `the enclosing write must PASS — its body caught the nested refusal and answered true: it caught `
      + `${JSON.stringify(shapeOf(passing.caught))}`);
  assert.notEqual(innerCaught, null,
    `the nested write must have been REFUSED, or there is no refusal to compare against: the drive caught `
      + `${JSON.stringify(inner.ok ? null : shapeOf(innerCaught))}`);
  assert.equal(innerCaught.status, 'ConstraintPassRefused',
    `and it is the same declared status at a nested crossing: ${JSON.stringify(innerCaught.status)}`);
  assert.deepEqual(Object.keys(innerCaught), ['status', 'message', 'log', 'address'],
    `and the nested failure form is the same four members: ${JSON.stringify(Object.keys(innerCaught))}`);
  const passingList = passing.value.log;
  assert.equal(innerCaught.log === passingList, true,
    `**THE SAME ARRAY, BY IDENTITY** — the nested refusal crosses the ENCLOSING commit's list, and that list is `
      + `what the passing answer carries at \`record.log\`, so the two cannot disagree about a single entry or a `
      + `single position (\`D-119\` item 4; \`D-53\`'s *"the crossed report IS that list"*). THE DRIVE READ `
      + `identity ${String(innerCaught.log === passingList)}`);
  assert.equal(innerCaught.log.length, passingList.length,
    `and the two lengths agree because they are one list: ${innerCaught.log.length} against `
      + `${passingList.length}`);
  for (let index = 0; index < passingList.length; index += 1) {
    assert.equal(innerCaught.log[index], passingList[index],
      `and the entry at index ${index} IS the same object at both names — no copy-out, no re-authoring, no `
        + `renumbering (\`§5.3\`)`);
  }
  assert.equal(passingList.some((entry) => entry.kind === 'outcome'), true,
    `and the nested refusal's own \`outcome\` entry stands in the list the passing answer carries: `
      + `${JSON.stringify(kindsOf(passingList))}`);
  assertEntryCensus(passingList, 'RSL-7 (the passing answer about the same commit)');

  t.diagnostic(`RSL-7 · THE REFUSAL: the consumer's refusal carries `
    + `${JSON.stringify(caught.log.map((entry) => ({ kind: entry.kind, id: entry.id, opId: entry.opId })))} under `
    + `keys ${JSON.stringify(Object.keys(caught))}; on the joined drive the nested refusal's log and the passing `
    + `answer's are the same array (identity ${String(innerCaught.log === passingList)}) of `
    + `${passingList.length} entries: `
    + `${JSON.stringify(kindsOf(passingList))}.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RSL-8` · THE STABILITY RULE AND THE DESCRIPTOR — plus the fact that decides the carry moves no census
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RSL-8 · THE STABILITY RULE: `record.log === record.log`, frozen, a `push` THROWS, and the descriptor reads `enumerable: false` · `configurable: true` · a getter — on all three records — while `Object.keys`, deep-equality and the sealed report\'s own census move by NOTHING', (t) => {
  const store = make();
  const address = ['rsl8-a'];
  store.write(address, 'mem', SEED);
  store.addConstraint({ address, id: 'rsl8' }, (context) => (context.value !== REFUSED));
  const record = store.write(address, 'mem', SEED + 1);
  const receipt = store.delete(address, 'mem');
  const reversal = store.rollback(record.op.opId);

  assert.deepEqual(kindsOf(record.log), ['constraint-check', 'commit'],
    `the drive must carry a non-trivial list, or the freeze below is read off an empty one: `
      + `${JSON.stringify(kindsOf(record.log))}`);

  // ── (a) THE STABILITY RULE, MEMBER BY MEMBER (`§5` items 1–2). ───────────────────────────────
  assert.equal(record.log === record.log, true,
    '**IT IS NOT A LIVE VIEW**: the accessor answers ONE captured reference, so two reads are the same array '
      + '(`§5.4`: no getter derives anything at the read)');
  assert.equal(Object.isFrozen(record.log), true,
    `and the array the crossing froze is frozen, so nothing the package holds can append to it afterwards: `
      + `${JSON.stringify(Object.isFrozen(record.log))}`);
  assert.throws(() => { record.log.push({ kind: 'commit' }); }, TypeError,
    'and a consumer that tries to grow its own copy changes nothing the package holds — the array is frozen, so '
      + 'the write throws under strict mode (`§5.2`), on the same terms as every refusal\'s `log` since `D-55`');
  const descriptor = Object.getOwnPropertyDescriptor(record, 'log');
  assert.equal(descriptor !== undefined, true,
    'the member is an OWN property of the record, so a descriptor is readable off it');
  assert.equal(typeof descriptor.get, 'function',
    `**IT IS AN ACCESSOR AND NOT A DATA PROPERTY** — the device \`discarded\` already uses: `
      + `${JSON.stringify(typeof descriptor.get)}`);
  assert.equal(descriptor.enumerable, false,
    `**AND IT IS NON-ENUMERABLE**, which is the whole of why \`Object.keys\` and every deep-equality are unmoved `
      + `(\`A117\` (D6); \`§1.1\`): ${JSON.stringify(descriptor.enumerable)}`);
  assert.equal(descriptor.configurable, true,
    `and \`configurable\`, the third byte \`§3.2\` declares for it: ${JSON.stringify(descriptor.configurable)}`);
  for (const [label, answer] of [['the write\'s record', record], ['the delete\'s receipt', receipt],
    ['the reversal\'s record', reversal]]) {
    const one = Object.getOwnPropertyDescriptor(answer, 'log');
    const read = one === undefined
      ? null
      : { get: typeof one.get, enumerable: one.enumerable, configurable: one.configurable };
    assert.equal(one !== undefined && typeof one.get === 'function' && one.enumerable === false
      && one.configurable === true, true,
    `${label} carries the SAME accessor — one helper, one shape, at all three records: the drive read `
      + `${JSON.stringify(read)}`);
  }

  // ── (b) AND THE DECLARED CENSUSES AND DEEP-EQUALITIES ARE UNMOVED. ───────────────────────────
  assert.deepEqual(Object.keys(record).sort(), WRITE_RECORD_MEMBERS,
    `**THE WRITE RECORD'S ENUMERABLE MEMBERS ARE THE THREE** \`index.d.ts\` declares: `
      + `${JSON.stringify(Object.keys(record).sort())}`);
  assert.deepEqual(Object.keys(receipt).sort(), DELETE_RECEIPT_MEMBERS,
    `and the receipt's are the FOUR it declares: ${JSON.stringify(Object.keys(receipt).sort())}`);
  assert.deepEqual(Object.keys(reversal).sort(), ROLLBACK_RECORD_MEMBERS,
    `and the reversal's are the THREE it declares: ${JSON.stringify(Object.keys(reversal).sort())}`);
  assert.deepEqual(record, { op: record.op, watched: record.watched, triggered: record.triggered },
    '**AND EVERY DEEP-EQUALITY A CONSUMER WRITES OVER `{op, watched, triggered}` IS UNAFFECTED** — a '
      + 'non-enumerable own accessor is invisible to `deepEqual`, which reads the own ENUMERABLE members');
  assert.deepEqual(Object.keys({ ...record }).sort(), WRITE_RECORD_MEMBERS,
    'and a spread loses it exactly as it loses `discarded` and `commit`, which is what `§1.1` item 3 declares: '
      + `${JSON.stringify(Object.keys({ ...record }).sort())}`);

  // ── (c) ★ AND THE FACT THAT DECIDES THE CARRY MOVES NO CENSUS OF THE SEALED REPORT. ──────────
  // **`sealHandoff` is handed the ownership discriminator as its second position and now KEEPS it** — one
  // non-enumerable own data property under `Symbol.for('provident-storeroom.commit-log-shared')`, placed BEFORE
  // the freeze. **The drive calls the real seal on a report of the report's own five members**, because the
  // sealed report is the entry's frame-local and crosses to no client call (`D-58`).
  const owning = [];
  const owningReport = sealHandoff({ attempt: null, log: owning, ops: [], outcome: 'passed', rollback: null },
    false);
  assert.deepEqual(Object.getOwnPropertyNames(owningReport).sort(),
    ['attempt', 'log', 'ops', 'outcome', 'rollback'],
    `**THE REPORT'S OWN NAMES ARE ITS FIVE AND THE FACT ADDS NO SIXTH** — a \`Symbol.for\` key is invisible to `
      + `\`Object.getOwnPropertyNames\` AND to \`Object.keys\`: `
      + `${JSON.stringify(Object.getOwnPropertyNames(owningReport))}`);
  assert.equal(Object.getOwnPropertySymbols(owningReport).includes(COMMIT_LOG_SHARED), true,
    `and the fact IS there, under the tree's own cross-side spelling \`COMMIT_LOG_SHARED\`: `
      + `${JSON.stringify(Object.getOwnPropertySymbols(owningReport).map(String))}`);
  assert.equal(owningReport[COMMIT_LOG_SHARED], false,
    `and it reads \`false\` where the call OWNS its commit — this answer takes the commit's own list: `
      + `${JSON.stringify(owningReport[COMMIT_LOG_SHARED])}`);
  assert.equal(Object.isFrozen(owning), true,
    `and the list this arm owns IS frozen at the seal (\`§5.1\`): ${JSON.stringify(Object.isFrozen(owning))}`);
  const shared = [];
  const sharedReport = sealHandoff({ attempt: null, log: shared, ops: [], outcome: 'passed', rollback: null },
    true);
  assert.equal(sharedReport[COMMIT_LOG_SHARED], true,
    `and \`true\` where the call JOINED an enclosing commit, which is the arm that answers \`[]\`: `
      + `${JSON.stringify(sharedReport[COMMIT_LOG_SHARED])}`);
  assert.equal(Object.isFrozen(shared), false,
    `**AND THE SHARED LIST IS NOT FROZEN** — freezing it at a nested crossing would stop the enclosing attempt's `
      + `own append and turn a lawful write into a raw host \`TypeError\`: `
      + `${JSON.stringify(Object.isFrozen(shared))}`);
  assert.deepEqual(Object.getOwnPropertyNames(sharedReport).sort(),
    ['attempt', 'log', 'ops', 'outcome', 'rollback'],
    `and that arm's census is the same five: ${JSON.stringify(Object.getOwnPropertyNames(sharedReport))}`);

  const shape = { get: typeof descriptor.get, enumerable: descriptor.enumerable,
    configurable: descriptor.configurable };
  t.diagnostic(`RSL-8 · THE SHAPE: descriptor ${JSON.stringify(shape)} on all three records; `
    + `\`Object.keys\` reads ${JSON.stringify(Object.keys(record).sort())} / `
    + `${JSON.stringify(Object.keys(receipt).sort())} / ${JSON.stringify(Object.keys(reversal).sort())}; the `
    + `sealed report's own names read ${JSON.stringify(Object.getOwnPropertyNames(owningReport))} with the `
    + `ownership fact under ${String(COMMIT_LOG_SHARED)} reading `
    + `${JSON.stringify([owningReport[COMMIT_LOG_SHARED], sharedReport[COMMIT_LOG_SHARED]])}.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `RSL-9` · THE NON-CARRIAGE ARMS — DECLARED WITHOUT A CARRIER, AND ASSERTED SO
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('RSL-9 · THE THREE ANSWERS THAT CARRY NOTHING: `\'log\' in addConstraint(…)` is `false` with the identity\'s own names unmoved, `constraintOn` answers `undefined` (no object exists to carry a member), and a `storeCreate` carrying `cfg.constraints` answers an instance whose own names still read FIFTEEN', (t) => {
  // ── (a) THE IDENTITY IS NOT A RECORD (`§3.4` items 1–2). ────────────────────────────────────
  const store = make();
  store.write(['rsl9-a'], 'mem', SEED);
  const pair = { address: ['rsl9-a'], id: 'rsl9' };
  const body = () => true;
  const identity = captured(() => store.addConstraint(pair, body));
  assert.equal(identity.ok, true,
    `the pair must REGISTER, or there is no identity to census: it caught ${JSON.stringify(shapeOf(identity.caught))}`);
  const held = identity.value;
  assert.equal('log' in held, false,
    `**THE IDENTITY CARRIES NO \`log\`** — it is minted ONCE PER PAIR and handed back again on a second add, so a `
      + `member on it would be a slot every call at that pair shares (\`§3.4\` item 1). THE DRIVE READ `
      + `${JSON.stringify('log' in held)}`);
  assert.deepEqual(Object.getOwnPropertyNames(held), [],
    `and its own names are UNMOVED — the tree's reading at this date, printed so a later pass that gives an `
      + `identity a member reports it here: ${JSON.stringify(Object.getOwnPropertyNames(held))}`);

  // ── (b) THE TOGGLES ANSWER `undefined` — THERE IS NO OBJECT TO CARRY A MEMBER. ───────────────
  assert.equal(store.constraintOff(pair, body), undefined,
    `\`constraintOff\` answers \`undefined\` (\`index.d.ts:1073\`): `
      + `${JSON.stringify(store.constraintOff(pair, body))}`);
  assert.equal(store.constraintOn(pair, body), undefined,
    `**AND SO DOES \`constraintOn\`** (\`index.d.ts:1068\`): there is no object to carry a member and none is `
      + `minted (\`§3.4\`)`);

  // ── (c) THE BATCH A `storeCreate` CARRIES ANSWERS AN INSTANCE, AND THE FOURTEEN DO NOT MOVE. ──
  const batch = captured(() => make({ constraints: [{ address: ['rsl9-b'], id: 'rsl9-b', constraint: () => true }] }));
  assert.equal(batch.ok, true,
    `the batch must REGISTER, or this arm measures nothing: it caught ${JSON.stringify(shapeOf(batch.caught))}`);
  const names = Object.getOwnPropertyNames(batch.value);
  assert.equal(names.length, 15,
    `**THE INSTANCE'S OWN MEMBERS ARE THE FIFTEEN** and the ruling moves none of them (\`A117\` (D6); \`§3.5\`). THE `
      + `DRIVE READ ${names.length}: ${JSON.stringify(names)}`);
  assert.equal('log' in batch.value, false,
    `and no \`log\` channel stands on the instance — a batch log cached there would be a CLOSED commit's log `
      + `retained inside the instance, which \`D-58\`'s own bound forbids in as many words (\`§3.5\`)`);
  assert.deepEqual(batch.value.constraints().map((row) => row.id), ['rsl9-b'],
    `and the batch's own registration LANDED, so the empty carrier is a decision and not an empty store: `
      + `${JSON.stringify(batch.value.constraints().map((row) => row.id))}`);
  const afterBatch = captured(() => batch.value.write(['rsl9-b'], 'mem', SEED));
  assert.equal(afterBatch.ok, true,
    `and a later passing write on that instance answers its own commit's list as on any other instance: it `
      + `caught ${JSON.stringify(shapeOf(afterBatch.caught))}`);
  assert.deepEqual(kindsOf(afterBatch.value.log), ['constraint-check', 'commit'],
    `**THE BATCH'S ENTRIES CROSS TO NOBODY, AND A LATER CALL'S OWN ENTRIES DO** — the two arms are different `
      + `calls and their lists are different lists: ${JSON.stringify(kindsOf(afterBatch.value.log))}`);
  assertEntryCensus(afterBatch.value.log, 'RSL-9');

  t.diagnostic(`RSL-9 · THE NON-CARRIAGE ARMS: the identity's own names read `
    + `${JSON.stringify(Object.getOwnPropertyNames(held))} with \`'log' in\` ${String('log' in held)}; both `
    + `toggles answer \`undefined\`; the instance a \`cfg.constraints\` batch answers carries `
    + `${names.length} own names (${JSON.stringify(names)}), and a later passing write on it answers `
    + `${JSON.stringify(kindsOf(afterBatch.value.log))}.`);
});
