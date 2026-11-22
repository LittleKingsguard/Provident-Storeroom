// tests/e2e/creation-sweep-gate4.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `U-STOREROOM-CREATION-SWEEP` — GATE 4's FOUR CELLS: `CSW-27`, `CSW-28`, `CSW-29` and `CSW-30`.
//
// **THESE FOUR ARE WRITTEN TO THE INTENDED BEHAVIOUR AND NOT TO THE TREE.** The first two pin the two code
// defects gate 4 found in `bindings/js/**` and the two other two pin the two arms the rulings owe that no cell
// of `§4` could see. **EACH IS RED ON ITS ASSERTION AGAINST THE PRE-FIX BYTES**; none is red on an error.
//
// **`CSW-27` (e) · `PIN-16` — THE SUPPRESSION MUST NOT OUTLIVE THE CONSTRUCTION.** The sweep's one applied-repair
// bit is LOCAL TO THE CONSTRUCTION (`PIN-4`: *"the applied-repair bit per admitted pair is the sweep's whole new
// state"*), so a pair that repaired during the sweep is an ordinary pair once the instance answers. **THE DEFECT**
// is the wrapper the sweep installs being REGISTERED WITH THE KERNEL, where it outlives the frame that made it: it
// carried a frozen `suppress === true`, so the pair's next refusal at a caller's ordinary `write` handed the
// kernel a violation with its `repair` STRIPPED, the repair never ran and the write refused at rank `20`. **No
// cell of the unit could see it, because every cell of the unit drives the construction and stops there.**
//
// **`CSW-28` (e) · `PIN-17` — AN OUTCOME OUTSIDE THE THREE ARMS DOES NOT REPAIR, AT ANY INSTANT.** `PAR-C-5`'s
// closed set is `true` · `{message}` · `{message, repair}`: **a return carrying only `repair` is the arm outside
// the three** (`VA-11`) and the kernel reads its `repair` ONLY where `message` is an OWN member, so it registers
// no repair at the write's evaluation and at a registration alike. **THE DEFECT** was the sweep's guard REBUILDING
// that outcome as `{message: undefined, repair}` — an own-`message` outcome carrying a repair — so **one body's one
// outcome read one way at a creation and the other way at `addConstraint`, on the same bytes.**
//
// **`CSW-29` (e) · THE MIGRATION ARM — `PIN-8`.** The `cfg.listeners[]` element's third member `listener:
// Listener` is REQUIRED (`D-26`'s move one key over), so an entry carrying only `{address, handle}` is refused at
// step 2, **before any filesystem act**, in the encoder's existing `AddressMalformed`/`listeners` form (`PIN-9`).
// **THE MESSAGE'S FIRST SENTENCE IS `PIN-9`'s KNOWN DEFECT AND IS NOT PINNED HERE** — this cell reads the status,
// the member the message names and the absence of any created file, and nothing else.
//
// **`CSW-30` (e) · THE CORRUPT IMAGE — `D-126` ITEM 2.** *"A corrupt image refuses the construction"*: the silence
// `PIN-11` pinned is RETIRED, because an application that must *"check if file data is corrupt"* cannot while
// corruption returns an instance indistinguishable from an empty path — and the next save would write a readable
// image over the corrupt bytes, destroying the only evidence. **WHICH MEMBER CARRIES IT IS NOT DECIDED YET**
// (`D-126`: *"L1 pins it; no pass may implement a corrupt arm against a member it chose for itself"*), so this
// cell reads the member FROM THE REFUSAL, asserts it is a member of the closed set and that it is not the shape
// code — **and names no member of its own.** The pin names it later; nothing below moves when it does.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE INSTRUMENTS — `D-17`, `D-21`, and this file's own two rules
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **`D-17`.** No DOCUMENT is opened at runtime: the expectation is a literal here and the citation is a comment.
// **THE ONE SOURCE FILE THIS FILE READS IS `src/error.rs`** — for `CSW-30`'s membership test only, at the model
// `tests/e2e/file-tier-save.test.mjs` already uses: a corrupt arm's member is UNPINNED, so the closed set must be
// READ from the code's one home rather than copied into this file, or the cell would be choosing the member it is
// forbidden to choose. **`D-21`.** Every cell prints the readings it took at its own `t.diagnostic`, drives its arm
// through `attempt()` (an outcome handed back as a value, never an assertion) and, where it cannot reach its arm,
// fails at the act and prints the refusal it caught rather than passing vacuously. The only imports are the entry
// by path (this project's `O4` route) and `node:`'s own modules.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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

/** The registration instant's own verdict for a pair whose body did not answer `true` (`§8.1` rank `19`). */
const CONSTRAINT_REFUSED_AT_REGISTRATION = 'ConstraintRefusedAtRegistration';
/** `§8.1` rank `1` — the encoder's own code for the `listeners` position (`PIN-9`). */
const ADDRESS_MALFORMED = 'AddressMalformed';

const scratch = (tag) => {
  const dir = mkdtempSync(join(tmpdir(), `csw-g4-${tag}-`));
  return { dir, filePath: join(dir, 'store.json') };
};
const bytesOf = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);
const standing = (instance, address) => {
  const read = attempt(() => instance.read(address));
  return read.ok ? { present: true, value: read.value } : { present: false, refused: statusOf(read.caught) };
};

/** **THE CLOSED SET, READ FROM ITS ONE HOME — `src/error.rs`'s `pub const CODES`** — for `CSW-30` only, whose
 *  member is UNPINNED (`D-126` item 2: *"L1 pins it"*). The same reader `tests/e2e/file-tier-save.test.mjs`
 *  uses, so the member is never one this file chose. */
function codesFromSource() {
  const errorRs = readFileSync(new URL('../../src/error.rs', import.meta.url), 'utf8');
  const row = /pub const CODES: \[&str; (\d+)\] = \[([\s\S]*?)\];/.exec(errorRs);
  if (row === null) return { declaredArity: null, members: [] };
  return {
    declaredArity: Number(row[1]),
    members: [...row[2].matchAll(/"([A-Za-z]+)"/g)].map((match) => match[1]),
  };
}
const CODES_SOURCE = codesFromSource();

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-27` · `PIN-16` — THE SUPPRESSION DOES NOT OUTLIVE THE CONSTRUCTION
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-27 · THE SUPPRESSION MUST NOT OUTLIVE THE CONSTRUCTION (`PIN-16`; `PIN-4`\'s "local to this construction and gone when it answers"; `D-124` item 1; `D-125` item 4) — a pair that repaired DURING the sweep is an ORDINARY pair once the instance answers: an ordinary `write` that makes it refuse again runs ITS REPAIR, and the state left is the repair\'s', (t) => {
  // **THE DEFECT IN ONE SENTENCE**: the wrapper the sweep installs is REGISTERED WITH THE KERNEL, so it outlives
  // the frame that made it — **and it froze `suppress` at `true` for every pair that had already repaired** — so
  // the instance's register held a body that answered the caller's later refusals with its `repair` STRIPPED.
  // **THE DRIVE IS THE SMALLEST ONE THAT REACHES IT**: one pair, one repair (landed at the construction's carry,
  // which is what freezes the bit), the sweep's next round passing it (which is what registers the frozen wrapper
  // and ends the sweep), and then an ordinary `write` that lands a value the pair refuses.
  let live = null;
  const asks = [];
  let repairs = 0;
  const construction = attempt(() => make({
    constraints: [{
      address: ['a'],
      id: 'settle-a',
      constraint: (context) => {
        asks.push({ from: 'ask', value: context.value });
        // **THE PAIR ADMITS BOTH OF ITS OWN REPAIRS' LANDINGS** — which is what keeps a second run from being a
        // cycle (`D-125` item 4: asking is not repairing) while leaving the TWO RUNS' states DISTINGUISHABLE.
        if (context.value === 'settled' || context.value === 'settled-again') return true;
        return {
          message: '`["a"]` must read "settled"',
          repair: (record) => {
            repairs += 1;
            // **THE SECOND RUN LANDS ITS OWN VALUE** — `"settled-again"` is a state no other act of this drive can
            // produce, so the register after the ordinary write says WHICH run's state stands.
            const value = repairs > 1 ? 'settled-again' : 'settled';
            const written = typeof record.write === 'function'
              ? record.write(['a'], 'mem', value)
              : live.write(['a'], 'mem', value, record);
            return { ok: true, op: written.op };
          },
        };
      },
    }],
  }));
  const constructionStatus = construction.ok ? null : statusOf(construction.caught);

  // ── (a) THE PREMISE: THE CONSTRUCTION RETURNED AN INSTANCE AND ITS SWEEP LANDED THE ONE REPAIR. ───────
  assert.equal(construction.ok, true,
    `**THE CONSTRUCTION MUST RETURN AN INSTANCE** — a pair that repairs once during the sweep and passes on the `
      + `round after it is a CONSISTENT result (\`D-123\` item 1; \`D-125\` item 4: *"asking is not repairing"*): `
      + `the call answered ${JSON.stringify(constructionStatus)} with message `
      + `${JSON.stringify(construction.ok ? null : messageOf(construction.caught))} and log `
      + `${JSON.stringify(construction.ok ? null : logKinds(construction.caught))}`);
  live = construction.value;
  assert.equal(repairs, 1,
    `**AND THE SWEEP LANDED EXACTLY ONE REPAIR** — that repair is what sets the applied-repair bit, and the bit `
      + `is the whole premise of this cell: it ran ${repairs} time(s)`);
  assert.deepEqual(standing(live, ['a']), { present: true, value: 'settled' },
    `and the register it left is the repair's: \`read(['a'])\` = ${JSON.stringify(standing(live, ['a']))}`);
  assert.deepEqual(live.constraints().map((row) => row.id), ['settle-a'],
    `and the pair stands registered (\`PIN-3\`: the sweep's membership is the register): `
      + `${JSON.stringify(live.constraints())}`);

  // ── (b) THE ORDINARY ACT THAT MAKES THE PAIR REFUSE AGAIN — AT A CALLER'S WRITE, NOT AT THE SWEEP. ────
  const asksBefore = asks.length;
  const write = attempt(() => live.write(['a'], 'mem', 'broken'));
  const writeStatus = write.ok ? null : statusOf(write.caught);

  // ── (c) THE SUBJECT: THE REPAIR RUNS, AND THE STATE LEFT IS THE REPAIR'S. ─────────────────────────────
  assert.equal(write.ok, true,
    `**THE ORDINARY WRITE MUST RETURN** — the pair's refusal at a caller's \`write\` carries its own \`repair\`, `
      + `and a repair the outcome carries IS RUN by the pass (\`D-104\`; the write's own arm). **THE SUPPRESSION IS `
      + `THE SWEEP'S AND THE SWEEP HAS ANSWERED** (\`PIN-16\`; \`PIN-4\`: the bit is *"local to this construction `
      + `and gone when it answers"*): the write answered ${JSON.stringify(writeStatus)} with message `
      + `${JSON.stringify(write.ok ? null : messageOf(write.caught))} — **a body whose \`repair\` is stripped hands `
      + `the kernel a violation with nothing to run, which is the defect this cell exists for**`);
  assert.equal(repairs, 2,
    `**AND THE PAIR'S REPAIR RAN AT THE ORDINARY WRITE** — once at the construction's sweep and once here (\`PIN-4\` `
      + `(i) bounds a pair to ONE REPAIR **IN A CONSTRUCTION**, and the construction is over): it has run `
      + `${repairs} time(s)`);
  assert.deepEqual(standing(live, ['a']), { present: true, value: 'settled-again' },
    `**AND THE STATE IT LEAVES IS THE SECOND REPAIR'S OWN** — the caller landed \`"broken"\` and the second run `
      + `replaced it with the value only that run writes: \`read(['a'])\` = `
      + `${JSON.stringify(standing(live, ['a']))}`);
  assert.equal(asks.length - asksBefore >= 1, true,
    `and the pair was ASKED at the write (\`D-90\`'s rule read at a landing): the body's ask-count rose by `
      + `${asks.length - asksBefore}`);
  assert.deepEqual(live.constraints().map((row) => row.id), ['settle-a'],
    `**AND THE PAIR IS STILL THE ORDINARY REGISTERED PAIR** — nothing was withdrawn, swapped or re-minted on the `
      + `instance: ${JSON.stringify(live.constraints())}`);

  t.diagnostic(`CSW-27 · THE SUPPRESSION'S SCOPE: the construction landed 1 repair and answered an instance; `
    + `the ordinary write at \`["a"]\` answered ${JSON.stringify(write.ok ? 'a record' : writeStatus)} `
    + `with the pair's repair run ${repairs} time(s) over the whole drive; the register reads `
    + `${JSON.stringify({ a: standing(live, ['a']) })}; the body was asked `
    + `${asks.length} time(s) with ${JSON.stringify(asks.map((ask) => ask.value))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-28` · `PIN-17` — AN OUTCOME OUTSIDE THE THREE ARMS DOES NOT REPAIR, AT ANY INSTANT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-28 · AN OUTCOME OUTSIDE THE THREE ARMS DOES NOT REPAIR AT ANY INSTANT (`PIN-17`; `PAR-C-5`; `VA-11`) — a body answering `{repair}` with NO `message`: at a CREATION the construction refuses and the address the repair would have written is UNTOUCHED, and at `addConstraint` the SAME reading answers, so one outcome does not read two ways by instant', (t) => {
  // **THE OUTSIDE-FORM ARM (`VA-11`), VERBATIM FROM THE SURFACE**: *"a return carrying only `repair` is the arm
  // outside the three and ITS REPAIR IS NEVER SEEN"* (`docs/guides/package-use.md:1111`), because the kernel reads
  // `repair` only where `message` is an OWN member. **THE DEFECT THE CELL IS WRITTEN AGAINST**: the sweep's guard
  // rebuilt that outcome as `{message: undefined, repair}` — **it INVENTED the member the kernel gates on** — so the
  // repair ran at the creation and ran nothing at the registration: **one body's one outcome, two readings, on the
  // same bytes.** **THE TWO HALVES BELOW DRIVE THE SAME BODY AT THE TWO INSTANTS AND ASSERT THE SAME THREE THINGS**
  // — the refusal, the member it crosses as, and the address the repair would have written.
  const writtenWouldBe = ['x'];
  const outsideForm = (onRepair) => () => ({
    // **NO `message` MEMBER, AND NO PROTOTYPE CARRYING ONE** — the literal has exactly one member.
    repair: onRepair,
  });

  // ── (a) AT THE CREATION. ───────────────────────────────────────────────────────────────────────────────
  const creation = (() => {
    const { dir, filePath } = scratch('csw28');
    let runs = 0;
    const construction = attempt(() => make({
      filePath,
      constraints: [{
        address: ['a'],
        id: 'outside-form',
        constraint: outsideForm((record) => {
          runs += 1;
          record.write(writtenWouldBe, 'file', 'written-by-a-repair');
          return { ok: true, op: 0 };
        }),
      }],
    }));
    const bytes = bytesOf(filePath);
    // **THE ADDRESS THE REPAIR WOULD HAVE WRITTEN, READ AT THE SEAT THE REFUSAL LEAVES STANDING**: `PIN-12`
    // keeps the created file and every already-saved landing, so a fresh instance over the same `filePath` is the
    // reading — and the value the repair would have written is one no other act of this drive could produce.
    const fresh = attempt(() => make({ filePath }));
    const at = fresh.ok ? standing(fresh.value, writtenWouldBe) : null;
    rmSync(dir, { recursive: true, force: true });
    return { construction, runs, bytes, fresh, at };
  })();

  assert.equal(creation.construction.ok, false,
    `**THE CONSTRUCTION MUST REFUSE** — a pair whose body answered outside the three arms registered NO repair, `
      + `so the state still violates it and \`D-123\` item 1 forbids an instance: **THE CALL RETURNED AN `
      + `INSTANCE**, whose \`read(['x'])\` is ${JSON.stringify(creation.at)} — the repair ran `
      + `${creation.runs} time(s) and the construction answered with the state it left`);
  assert.equal(statusOf(creation.construction.caught), CONSTRAINT_REFUSED_AT_REGISTRATION,
    `**AND IT REFUSES AT THE REGISTRATION INSTANT'S OWN VERDICT, RANK \`19\`** — the arm the shipped tree already `
      + `answers for a pair whose body answered non-\`true\` (\`§8.1\` #19): the refusal answered `
      + `${JSON.stringify(statusOf(creation.construction.caught))} with message `
      + `${JSON.stringify(messageOf(creation.construction.caught))}`);
  assert.equal(creation.runs, 0,
    `**AND THE REPAIR THE OUTCOME CARRIES DID NOT RUN** — \`VA-11\`: *"the arm outside the three and its repair is `
      + `NEVER SEEN"*; a repair that is never handed to the kernel is never invoked (\`PIN-17\`): it ran `
      + `${creation.runs} time(s) across the construction`);
  assert.equal(creation.at !== null && creation.at.present, false,
    `**AND THE ADDRESS THE REPAIR WOULD HAVE WRITTEN IS UNTOUCHED** — the fresh instance over the refused `
      + `construction's own file (\`PIN-12\`) reads ${JSON.stringify(creation.at)} where the repair would have `
      + `landed \`"written-by-a-repair"\`; the file stood at ${JSON.stringify(creation.bytes)}`);

  // ── (b) AT `addConstraint` — THE SAME OUTCOME, THE SAME THREE READINGS. ───────────────────────────────
  const added = (() => {
    const store = make();
    let runs = 0;
    const add = attempt(() => store.addConstraint(
      { address: ['a'], id: 'outside-form' },
      outsideForm((record) => {
        runs += 1;
        record.write(writtenWouldBe, 'mem', 'written-by-a-repair');
        return { ok: true, op: 0 };
      }),
    ));
    return { add, runs, store, at: standing(store, writtenWouldBe), carried: store.constraints() };
  })();

  assert.equal(added.add.ok, false,
    `**THE SAME BODY AT \`addConstraint\` MUST REFUSE TOO** — the registration instant's own evaluation reads the `
      + `same closed outcome: the call answered ${JSON.stringify(added.add.ok ? added.add.value : null)}`);
  assert.equal(statusOf(added.add.caught), statusOf(creation.construction.caught),
    `**AND AT THE SAME MEMBER — *"one outcome does not read two ways by instant"* IS THE PIN'S WHOLE SUBJECT** `
      + `(\`PIN-17\`): the creation answered ${JSON.stringify(statusOf(creation.construction.caught))} and `
      + `\`addConstraint\` answered ${JSON.stringify(statusOf(added.add.caught))}`);
  assert.equal(added.runs, 0,
    `**AND ITS REPAIR DID NOT RUN HERE EITHER**: it ran ${added.runs} time(s) across the add route`);
  assert.deepEqual(added.at, { present: false, refused: 'AddressNotFound' },
    `**AND THE ADDRESS THE REPAIR WOULD HAVE WRITTEN IS UNTOUCHED** — the instance stands and answers for it: `
      + `\`read(['x'])\` = ${JSON.stringify(added.at)}`);
  assert.deepEqual(added.carried, [],
    `and no pair is carried on a refusal (\`sites.md §3.1\` item 3): \`constraints()\` = `
      + `${JSON.stringify(added.carried)}`);

  t.diagnostic(`CSW-28 · THE OUTSIDE-FORM ARM: the creation answered `
    + `${JSON.stringify(statusOf(creation.construction.caught))} with the repair run ${creation.runs} time(s), `
    + `the file ${JSON.stringify(creation.bytes)} and a fresh boot reading ${JSON.stringify(creation.at)}; `
    + `\`addConstraint\` answered ${JSON.stringify(statusOf(added.add.caught))} with the repair run ${added.runs} `
    + `time(s), \`read(['x'])\` = ${JSON.stringify(added.at)} and \`constraints()\` = `
    + `${JSON.stringify(added.carried)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-29` · THE MIGRATION ARM — A `listeners[]` ENTRY WITH NO `listener` IS REFUSED BEFORE ANY FILESYSTEM ACT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-29 · THE MIGRATION ARM (`PIN-8`; `PIN-9`; `D-26`\'s element) — a `cfg.listeners[]` entry carrying only `{address, handle}` is REFUSED: `storeCreate` throws rank `1` `AddressMalformed`, the message NAMES the missing `listener`, and NO FILE IS CREATED at `filePath`', (t) => {
  // **THE ELEMENT'S THIRD MEMBER IS REQUIRED** (`PIN-8`: `listener: Listener`, *"required, stripped at the
  // crossing"*), and **the refusal stands at STEP 2, BEFORE ANY FILESYSTEM ACT** (`PIN-9`): so the created file
  // the construction would otherwise leave at `filePath` — the exclusive create of `§7.1` step 4-bis — must NOT
  // exist when the call answers. **THE MESSAGE'S FIRST SENTENCE IS `PIN-9`'s KNOWN DEFECT** (*"'listeners' is not
  // a legal address segment …"*, which is false) **AND IS NOT PINNED HERE**: what this cell reads is that the
  // message NAMES the missing `listener`, which is the sentence the caller acts on.
  const { dir, filePath } = scratch('csw29');
  const migration = attempt(() => make({
    filePath,
    listeners: [{ address: ['a'], handle: 'migrated-handle' }],
  }));
  const created = existsSync(filePath);
  const status = statusOf(migration.caught);
  const message = migration.ok ? null : messageOf(migration.caught);
  const form = migration.caught !== null && typeof migration.caught === 'object'
    ? Object.keys(migration.caught).sort()
    : null;

  assert.equal(migration.ok, false,
    `**THE CONSTRUCTION MUST REFUSE** — a function-less entry is the one entry the amended \`listeners[]\` does `
      + `not admit (\`PIN-8\`; \`D-26\`'s element): the call answered ${JSON.stringify(migration.ok ? 'AN INSTANCE' : null)} `
      + `and left the file ${JSON.stringify(created)}`);
  assert.equal(status, ADDRESS_MALFORMED,
    `**AND THE MEMBER IS RANK \`1\` \`AddressMalformed\` — THE ENCODER'S OWN FORM, WITH NO CODE MINTED FOR THE `
      + `MIGRATION** (\`PIN-9\`: *"a function-less entry is refused at step 2, before any filesystem act, in the `
      + `encoder's existing \`AddressMalformed\`/\`listeners\` form, no code minted"*): the refusal answered `
      + `${JSON.stringify(status)} with message ${JSON.stringify(message)}`);
  assert.deepEqual(form, ['address', 'log', 'message', 'status'],
    `and it crosses in the surface's one four-member form (\`index.d.ts\`, \`StoreRefusal\`; \`D-77\`): `
      + `\`Object.keys(caught)\` = ${JSON.stringify(form)}`);
  assert.equal(typeof message === 'string' && message.includes('listener'), true,
    `**AND THE MESSAGE NAMES THE MISSING \`listener\`** — the member the caller has to add (\`PIN-8\`; `
      + `\`D-125\` item 2's element): it read ${JSON.stringify(message)}. **THE FIRST SENTENCE IS \`PIN-9\`'s KNOWN `
      + `DEFECT AND NO ASSERTION HERE READS IT**`);
  assert.equal(created, false,
    `**AND NO FILE IS CREATED — THE REFUSAL STANDS BEFORE ANY FILESYSTEM ACT** (\`PIN-9\`; \`§7.1\` step 4-bis's `
      + `exclusive create): \`existsSync(filePath)\` = ${created} for ${JSON.stringify(filePath)}`);

  t.diagnostic(`CSW-29 · THE MIGRATION ARM: the entry carried ${JSON.stringify({ address: ['a'], handle: 'migrated-handle' })} `
    + `and the construction answered ${JSON.stringify(status)} in the form ${JSON.stringify(form)} with message `
    + `${JSON.stringify(message)}; the file at \`filePath\` exists = ${created}`);
  rmSync(dir, { recursive: true, force: true });
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-30` · THE CORRUPT IMAGE — THE CONSTRUCTION REFUSES AND THE CORRUPT BYTES STAND
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-30 · THE CORRUPT IMAGE (`D-126` item 2: *"a corrupt image refuses the construction"*) — a `filePath` whose bytes are not an image: the construction REFUSES at a member of the closed set that is NOT `AddressMalformed`, and the CORRUPT BYTES STAND UNCHANGED — the evidence the next save would have destroyed', (t) => {
  // **`D-126` ITEM 2 RETIRES `PIN-11`'s SILENCE**: *"an application that must check if file data is corrupt or if
  // constraints are incompatible cannot do it while corruption returns an instance indistinguishable from an empty
  // path — and the next save would then write a readable image over the corrupt bytes, which destroys the only
  // evidence."* **THE MEMBER IS UNPINNED BY THAT ROW** (*"which member is not chosen here … L1 pins it; no pass may
  // implement a corrupt arm against a member it chose for itself"*), **SO THIS CELL NAMES NO MEMBER**: it reads the
  // status FROM THE REFUSAL and asserts two things of it — that it is IN the closed set (read from `src/error.rs`,
  // the set's one home) and that it is NOT `AddressMalformed`. **WHEN THE ARCHITECT'S PIN NAMES THE MEMBER, THE
  // NAMING CELL IS ADDED BESIDE THIS ONE AND NOTHING BELOW MOVES.**
  const corrupt = '{ this is not an image: "unterminated';
  const { dir, filePath } = scratch('csw30');
  writeFileSync(filePath, corrupt);
  const before = readFileSync(filePath);
  const construction = attempt(() => make({ filePath }));
  const after = readFileSync(filePath);
  const status = statusOf(construction.caught);
  const message = construction.ok ? null : messageOf(construction.caught);

  assert.notEqual(CODES_SOURCE.declaredArity, null,
    'the closed set must be READABLE at its home (`src/error.rs`\'s `pub const CODES`) or this cell cannot say '
    + 'whether the refusal\'s member is in it');
  assert.equal(CODES_SOURCE.declaredArity, CODES_SOURCE.members.length,
    'and the arity it declares is the number of members it carries: '
    + JSON.stringify({ declaredArity: CODES_SOURCE.declaredArity, members: CODES_SOURCE.members.length }));

  assert.equal(construction.ok, false,
    `**THE CONSTRUCTION MUST REFUSE** — *"a corrupt image refuses the construction"* (\`D-126\` item 2): **THE `
      + `CALL RETURNED AN INSTANCE**, whose \`read([])\` = ${JSON.stringify(construction.ok ? standing(construction.value, []) : null)} `
      + `— the silence \`PIN-11\` pinned, which is the defect this cell exists for`);
  assert.equal(CODES_SOURCE.members.includes(status), true,
    `**AND THE MEMBER IT CROSSES AT IS ONE OF THE CLOSED SET** (\`§8.1\`; read from \`src/error.rs\`, not copied): `
      + `the refusal answered ${JSON.stringify(status)} with message ${JSON.stringify(message)} — `
      + `**WHICH MEMBER IS THE ARCHITECT'S TO NAME** (\`D-126\` item 2's own residual: *"which member carries the `
      + `corrupt image … L1 pins it"*) and this cell reads it FROM THE REFUSAL rather than choosing it`);
  assert.notEqual(status, ADDRESS_MALFORMED,
    `**AND IT IS NOT THE SHAPE CODE** — \`AddressMalformed\` is the crossing's own rank-\`1\` member for a `
      + `malformed ARGUMENT, and a corrupt IMAGE is the load's failure and not the caller's argument's `
      + `(\`D-126\` item 2: the refusal is what lets a caller tell corruption from an empty path): the refusal `
      + `answered ${JSON.stringify(status)}`);
  assert.deepEqual(after, before,
    `**AND THE CORRUPT BYTES STAND UNCHANGED** — the evidence matters, and it is why corruption may not answer `
      + `an instance that the next save would overwrite (\`D-126\` item 2): before `
      + `${JSON.stringify(before.toString('utf8'))}, after ${JSON.stringify(after.toString('utf8'))}`);

  t.diagnostic(`CSW-30 · THE CORRUPT IMAGE: ${JSON.stringify(corrupt)} was written to \`filePath\`; the `
    + `construction answered ${JSON.stringify(status)} with message ${JSON.stringify(message)}; the bytes read `
    + `${JSON.stringify(after.toString('utf8'))} and are byte-identical to what they were `
    + `(${after.equals(before)}); the member is in the closed set `
    + `(${CODES_SOURCE.members.includes(status)} of ${CODES_SOURCE.members.length}) and is not `
    + `\`AddressMalformed\` (${status !== ADDRESS_MALFORMED})`);
  rmSync(dir, { recursive: true, force: true });
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CSW-31` · THE TWO NO-IMAGE CLASSES ARE UNMOVED — THE CONTROL `CSW-30` OWES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('CSW-31 · THE CONTROL (`PIN-11` redrawn, its exemption clause; `§10.4` part 3; `DD-38`) — a ZERO-LENGTH file and an ABSENT path are STILL `NoImage`: both return an instance, both load NOTHING, and both cross NO code; a `file`-tier write after either saves and reads back, and a fresh instance over the equal path loads no registration', (t) => {
  // **THE CONTROL THE CORRUPT ARM OWES, WRITTEN TO `§4`'s OWN STATEMENT.** `D-126` item 2 minted rank `22`
  // for *"a present, non-empty image the loader REFUSES"* (`src/store.rs`'s `FileImage::Refused`), and the pin
  // says in the same breath: **"AND WHAT IT DOES NOT TOUCH: a ZERO-LENGTH file and an ABSENT file are still NO
  // IMAGE and still LOAD NOTHING"** — `FileImage::NoImage` (`:928`–`:930`, `:1696`–`:1701`), `§10.4` part `3`
  // (*"A successful exclusive create produces AN EMPTY FILE AND NO BYTE"*) and `DD-38` (`contract.md:563`).
  // **A CELL THAT REFUSES EITHER HAS WIDENED THE CORRUPT ARM INTO THE EMPTY ONE**, and that is exactly what
  // this cell exists to catch — so it is GREEN ON THE LANDED TREE BY DESIGN, and a red here is a FINDING.
  const EMPTY = {}; // **the register an image with no members loads** — a fresh store's own `read([])`.
  const arm = (tag, prepare) => {
    const { dir, filePath } = scratch(`csw31-${tag}`);
    prepare(filePath);
    const construction = attempt(() => make({ filePath }));
    const status = construction.ok ? null : statusOf(construction.caught);
    const loaded = construction.ok ? standing(construction.value, []) : null;
    const created = existsSync(filePath);
    const before = bytesOf(filePath);
    // **A `file`-TIER WRITE AFTER EITHER SAVES AND READS BACK** — the tier the construction fixed at `file`
    // is the one this act commits through, so the write is the cell's own second observable and not a new
    // drive: the same instance, the same path.
    const write = construction.ok
      ? attempt(() => construction.value.write(['k'], 'file', `saved-${tag}`))
      : { ok: false, caught: construction.caught };
    const bytes = bytesOf(filePath);
    // **A FRESH INSTANCE OVER THE EQUAL PATH LOADS NO REGISTRATION** (`DD-38`: a construction loads `0`
    // registrations, so at a construction the register IS the admitted batch) — and it reads the saved value.
    const fresh = attempt(() => make({ filePath }));
    const back = fresh.ok ? standing(fresh.value, ['k']) : null;
    const carried = fresh.ok ? fresh.value.constraints() : null;
    rmSync(dir, { recursive: true, force: true });
    return { construction, status, loaded, created, before, write, bytes, fresh, back, carried };
  };

  const zeroLength = arm('zero', (filePath) => writeFileSync(filePath, ''));
  const absent = arm('absent', () => {});

  // ── (a) BOTH RETURN AN INSTANCE AND CROSS NO CODE. ────────────────────────────────────────────────────
  for (const [name, reading, lengthBefore] of [
    ['ZERO-LENGTH', zeroLength, 0],
    ['ABSENT', absent, null],
  ]) {
    assert.equal(reading.construction.ok, true,
      `**A ${name} FILE IS STILL \`NoImage\` — THE CONSTRUCTION RETURNS AN INSTANCE AND CROSSES NO CODE** — `
        + `the refusal is the CORRUPT class's alone (\`PIN-11\`: *"a ZERO-LENGTH file and an ABSENT file are `
        + `still NO IMAGE and still LOAD NOTHING"*; \`§10.4\` part 3; \`DD-38\`): the call answered `
        + `${JSON.stringify(reading.status)} with message `
        + `${JSON.stringify(reading.construction.ok ? null : messageOf(reading.construction.caught))} — `
        + `**a construction that refuses here has widened rank \`22\` into the empty class**`);
    assert.deepEqual(reading.loaded, { present: true, value: EMPTY },
      `**AND IT LOADS NOTHING** — the register begins empty, as it does for every store with no image `
        + `members (\`§7.2\` item 7 (f); \`DD-38\`): \`read([])\` = ${JSON.stringify(reading.loaded)}`);
    assert.equal(reading.created, true,
      `and the path EXISTS after the construction (\`§10.4\` parts 2–3): `
        + `\`existsSync(filePath)\` = ${reading.created}`);
    assert.equal(Buffer.byteLength(reading.before ?? '', 'utf8'), lengthBefore === null ? 0 : lengthBefore,
      `**AND THE CONSTRUCTION WROTE NOTHING AT IT** — *"AN EMPTY FILE AND NO BYTE"* (\`§10.4\` part 3): the `
        + `bytes read ${JSON.stringify(reading.before)}`);
  }

  // ── (b) A `file`-TIER WRITE AFTER EITHER SAVES AND READS BACK. ────────────────────────────────────────
  for (const [name, reading] of [['ZERO-LENGTH', zeroLength], ['ABSENT', absent]]) {
    assert.equal(reading.write.ok, true,
      `**A \`file\`-TIER WRITE AFTER THE ${name} ARM SAVES AND RETURNS** (\`surface.md §2.11\` clause 2: the `
        + `commit is the terminal arm's own act): it answered `
        + `${JSON.stringify(reading.write.ok ? 'a record' : statusOf(reading.write.caught))}`);
    assert.equal(typeof reading.bytes === 'string' && reading.bytes.includes('saved-'),
      true,
      `**AND THE BYTES AT THE PATH ARE THE SAVED IMAGE** (\`§7.2\` item 2): the file now reads `
        + `${JSON.stringify(reading.bytes)}`);
  }

  // ── (c) AND A FRESH INSTANCE OVER THE EQUAL PATH LOADS NO REGISTRATION (`DD-38`). ──────────────────────
  for (const [name, reading] of [['ZERO-LENGTH', zeroLength], ['ABSENT', absent]]) {
    assert.equal(reading.fresh.ok, true,
      `**A SECOND CONSTRUCTION OVER THE EQUAL PATH RETURNS AN INSTANCE** — the image the write saved LOADS `
        + `(\`§7.2\` item 6): the fresh call answered `
        + `${JSON.stringify(reading.fresh.ok ? 'an instance' : statusOf(reading.fresh.caught))}`);
    assert.equal(reading.back !== null && reading.back.present, true,
      `**AND THE VALUE READS BACK** (\`§7.2\` item 6's round trip): \`read(['k'])\` = `
        + `${JSON.stringify(reading.back)}`);
    assert.deepEqual(reading.carried, [],
      `**AND IT LOADS NO REGISTRATION** — \`DD-38\`: a construction loads \`0\` registrations, which is why at `
        + `a construction the register IS the admitted batch (\`PIN-2\`): \`constraints()\` = `
        + `${JSON.stringify(reading.carried)}`);
  }

  t.diagnostic(`CSW-31 · THE TWO NO-IMAGE CLASSES: the ZERO-LENGTH arm answered `
    + `${JSON.stringify(zeroLength.status ?? 'an instance')} with \`read([])\` = `
    + `${JSON.stringify(zeroLength.loaded)} and its \`file\` write landing ${JSON.stringify(zeroLength.bytes)}; `
    + `the ABSENT arm answered ${JSON.stringify(absent.status ?? 'an instance')} with \`read([])\` = `
    + `${JSON.stringify(absent.loaded)}, its path created = ${absent.created} and its \`file\` write landing `
    + `${JSON.stringify(absent.bytes)}; the fresh instances over the equal paths read `
    + `${JSON.stringify({ zero: zeroLength.back, absent: absent.back })} and carried `
    + `${JSON.stringify({ zero: zeroLength.carried, absent: absent.carried })}. **NEITHER CROSSES A CODE, `
    + `WHICH IS THE CONTROL RANK \`22\` OWES**`);
});
