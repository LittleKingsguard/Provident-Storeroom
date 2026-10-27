// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RESTORE'S OWN SAVE — A RESTORE THAT TOUCHES `file`-TIER NODES UPDATES THE STORE'S FILE
//
// **THE ARCHITECT'S RULING, VERBATIM: *"Update file after a restore that touches file-tier nodes."***
//
// **THE DEFECT THE RULING CLOSES, MEASURED WHERE IT IS OBSERVABLE.** The refused reversal's restore
// (`bindings/js/src/entry/constraints.mjs`'s `restoreReversal`) is the store's own journal mark restore
// (`src/store.rs`'s `restoreMark`). It re-states what the journal records — and it performed no file I/O — so
// **a restore that re-stated a `file`-tier version left the bytes at `cfg.filePath` describing the
// PRE-restore state, and a re-boot READS THEM.** A consumer that refused a reversal, was told every address
// stood again, and then opened a fresh store over the same path met a state the journal no longer described.
//
// **THE THREE CELLS, AND WHAT EACH DECIDES — ONE PER ARM THE RULING OWES:**
//   * **CELL 1 — THE RE-BOOT.** After a refused reversal that moved `file`-tier nodes, a SECOND STORE opened
//     on the same `filePath` must read the restored state, and both instances' values are printed. **The cell
//     also measures `rollback` itself**: the same reversal without a restore is shown to leave the file's bytes
//     where they were — the act the restore undoes persists nothing, and the ruling is about the restore.
//   * **CELL 2 — THE NO-MOVE PAIR.** A restore that moves NO `file`-tier node leaves the file byte-identical —
//     and leaves the path's OWN IDENTITY untouched (the commit is a sibling write plus a rename, so a save that
//     ran would replace the inode and move the mtime). **The no-I/O property is ASSERTED, not promised.**
//   * **CELL 3 — THE FAILED SAVE.** A save that cannot land is REPORTED, not swallowed: the refusal's log says
//     the in-memory state was restored AND the bytes were not, carries the store's own `FileCommitFailed` and
//     its generated message, and the in-memory state demonstrably stands.
//
// **HOW THE STORE DETECTS "A `file`-TIER NODE MOVED" — THE CLAUSE THIS SET HOLDS THE STORE TO.** It is not a
// guess about which operation ran: the `file` tier's image is taken from the versions themselves — each
// register key's version standing at `Tier::File`, assembled at that tier, exactly the image the store's own
// `write_file` encodes and the boot loads — BEFORE the replay and again after it. **Equal images ⇒ no
// `file`-tier version moved ⇒ no byte is touched.** Cell 2 is the observable that separates this from "save on
// every restore": a save on that arm would move the inode even though the bytes were equal.
//
// **D-21.** Every cell prints its readings at `t.diagnostic`, including both sides of each arm, so a red
// reports the readings and not a verdict. No cell here is skipped: each drive is reachable on this tree. **The
// cells drive the PRODUCT's own members** (`storeCreate`, `write`, `delete`, `read`, `addConstraint`,
// `rollback`) — the refused-reversal route is the consumer's, and the store's save is observed through the
// file the consumer configured and the re-boot the consumer performs.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The store's standing at one address, spelled for a diagnostic: the value, or the refusal's own status. */
function standing(store, address) {
  const read = attempt(() => store.read(address));
  return read.ok ? { present: true, value: read.value } : { present: false, refused: read.caught.status };
}

/** The standing as one printable token — `undefined` never reaches a sentence (`DEF-Q`). */
function describe(sample) {
  return sample.present ? JSON.stringify(sample.value) : `<${sample.refused}>`;
}

/** The bytes at a path, or `null` where there are none — a missing image is a reading and not a throw. */
function bytesAt(path) {
  try {
    return readFileSync(path);
  } catch (caught) {
    return null;
  }
}

/** The sha256 of the bytes at a path, or a token saying there are none. */
function hashAt(path) {
  const bytes = bytesAt(path);
  return bytes === null ? 'NO FILE' : createHash('sha256').update(bytes).digest('hex');
}

/** A fresh directory per drive, so no path is shared and every arm is its own. */
function scratch(tag) {
  return mkdtempSync(join(tmpdir(), `psr-restore-file-${tag}-`));
}

/** A `file`-register store over `<dir>/store.json` — the provided path fixes the register's tier at `file`. */
function fileStoreAt(directory) {
  return storeCreate({ journalLength: 16, listeners: [], filePath: join(directory, 'store.json') });
}

/** The `filePath` a store over `directory` was constructed with — the re-boot's own argument. */
function pathIn(directory) {
  return join(directory, 'store.json');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 1 — THE RE-BOOT: A FRESH STORE ON THE SAME `filePath` READS THE RESTORED STATE
//
// **THE DRIVE, AND WHY IT PUTS A DIFFERENCE BETWEEN THE MEMORY AND THE BYTES.** Two `file` values are written
// and each is committed (`DD-28`/`D-32`: a bare `file` write persists), so the bytes describe `{a:1,b:1}`; a
// `delete` then removes `a` in memory and commits NOTHING (the declared `DD-28` behaviour), so the bytes still
// describe the pre-delete state. A pair registered at `['b']` refuses the ABSENT standing; the reversal of
// the `b` write removes `b` from the `file` tier and is refused; and the restore re-states the head — the state
// the delete left. **THE RESTORED STATE AND THE BYTES NOW DISAGREE ON `a`**, which is the state the ruling is
// about: without the save a fresh boot reads the pre-restore `a`, and with it the fresh boot reads what the
// first instance holds.
//
// **`rollback`'s OWN PERSISTENCE IS MEASURED IN THE SAME CELL** (the control arm at its end): the same reversal
// taken without a refusal leaves the file's bytes unmoved and a fresh boot reading the last committed write —
// the act the restore undoes persists nothing, and the two answers are printed side by side.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('the ruling · after a refused reversal that moved `file`-tier nodes, a FRESH store on the same `filePath` reads the restored state — and `rollback` alone is measured beside it', (t) => {
  const directory = scratch('reboot');
  const path = pathIn(directory);
  const store = fileStoreAt(directory);
  const writeB = attempt(() => store.write(['b'], 'file', 1));
  const writeA = attempt(() => store.write(['a'], 'file', 1));
  const removed = attempt(() => store.delete(['a']));
  const bytesBeforeReversal = bytesAt(path);
  const pair = attempt(() => store.addConstraint({ address: ['b'], id: 'admits-present' },
    (context) => (context.value === undefined
      ? { message: 'this pair admits the present value alone' }
      : true)));
  const rollback = attempt(() => store.rollback(writeB.ok ? writeB.value.op.opId : 'no-op'));
  const firstA = standing(store, ['a']);
  const firstB = standing(store, ['b']);
  const bytesAfterRefusal = bytesAt(path);

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual([writeB.ok, writeA.ok, removed.ok, pair.ok], [true, true, true, true],
    `the drive's two writes, its delete and its pair must all land, or nothing below is measured: b=`
      + `${JSON.stringify(writeB.caught)} a=${JSON.stringify(writeA.caught)} `
      + `delete=${JSON.stringify(removed.caught)} pair=${JSON.stringify(pair.caught)}`);
  assert.equal(rollback.ok, false,
    `the reversal must be REFUSED — it removes the \`file\`-tier \`b\` and the pair refuses the absent `
      + `standing: the call answered ${JSON.stringify(rollback.value)}`);
  assert.equal(rollback.caught.status, 'ConstraintPassRefused',
    `the refusal is the judgement's own rank-20 member: THE DRIVE READ ${JSON.stringify(rollback.caught.status)}`);
  assert.equal(bytesBeforeReversal === null ? null : bytesBeforeReversal.toString('utf8'),
    '{"a":1,"b":1}',
    'the drive must stand the PRE-restore bytes the ruling is about — both committed writes, with the delete '
      + 'in memory only (DD-28): THE DRIVE READ '
      + `${bytesBeforeReversal === null ? 'NO FILE' : JSON.stringify(bytesBeforeReversal.toString('utf8'))}`);

  // ── (1) THE FIRST INSTANCE HOLDS THE RESTORED STATE. ────────────────────────────────────────
  assert.deepEqual(firstB, { present: true, value: 1 },
    `the refusal restored \`b\` in memory: THE DRIVE READ ${describe(firstB)}`);
  assert.deepEqual(firstA, { present: false, refused: 'AddressNotFound' },
    `and \`a\` is absent — the state the journal's head describes: THE DRIVE READ ${describe(firstA)}`);

  // ── (2) **THE RE-BOOT: A SECOND INSTANCE, A SECOND BOOT, AND THE RESTORED STATE.** ──────────
  const fresh = attempt(() => storeCreate({ journalLength: 16, listeners: [], filePath: path }));
  assert.equal(fresh.ok, true,
    `the second construction must return an instance over the same path: it caught ${JSON.stringify(fresh.caught)}`);
  const freshA = standing(fresh.value, ['a']);
  const freshB = standing(fresh.value, ['b']);
  assert.deepEqual(freshB, firstB,
    `THE FINDING — the fresh boot reads what the first instance holds at \`['b']\`: first=${describe(firstB)} `
      + `fresh=${describe(freshB)}`);
  assert.deepEqual(freshA, firstA,
    `THE FINDING — and at \`['a']\` too: the fresh boot must NOT read the pre-restore \`a\` the un-updated `
      + `bytes carried. THE FRESH INSTANCE READ ${describe(freshA)} while the first holds ${describe(firstA)}`);

  // ── (3) `rollback` ITSELF, MEASURED BESIDE IT — ITS EFFECT IS NOT PERSISTED. ─────────────────
  const controlDir = scratch('rollback');
  const controlPath = pathIn(controlDir);
  const control = fileStoreAt(controlDir);
  const first = attempt(() => control.write(['a'], 'file', 1));
  const second = attempt(() => control.write(['a'], 'file', 2));
  const controlBefore = bytesAt(controlPath);
  const reverted = attempt(() => control.rollback(second.ok ? second.value.op.opId : 'no-op'));
  const controlAfter = bytesAt(controlPath);
  const controlMemory = standing(control, ['a']);
  const controlFresh = attempt(() => storeCreate({ journalLength: 16, listeners: [], filePath: controlPath }));
  const controlBoot = controlFresh.ok ? standing(controlFresh.value, ['a']) : { present: false, refused: 'NO INSTANCE' };
  assert.deepEqual([first.ok, second.ok, reverted.ok], [true, true, true],
    `the control's two writes and its reversal must land: ${JSON.stringify([first.caught, second.caught, reverted.caught])}`);
  assert.deepEqual(controlMemory, { present: true, value: 1 },
    `the reversal restored the pre-write value in memory: THE CONTROL READ ${describe(controlMemory)}`);
  assert.deepEqual(controlAfter, controlBefore,
    '`rollback` performs NO file I/O — the bytes are the ones the last committed write left '
      + `(DD-28): before=${controlBefore === null ? 'NO FILE' : JSON.stringify(controlBefore.toString('utf8'))} `
      + `after=${controlAfter === null ? 'NO FILE' : JSON.stringify(controlAfter.toString('utf8'))}`);
  assert.deepEqual(controlBoot, { present: true, value: 2 },
    `MEASURED: a reversal's effect is NOT persisted by the reversal — a fresh store over the same path reads `
      + `the last committed write's value, not the restored one. THE FRESH CONTROL INSTANCE READ ${describe(controlBoot)}`);

  // ── THE READINGS, PRINTED (`D-21`). ─────────────────────────────────────────────────────────
  t.diagnostic(`THE RE-BOOT CELL: before the reversal the bytes were `
    + `'${bytesBeforeReversal === null ? 'NO FILE' : bytesBeforeReversal.toString('utf8')}'; after the refused `
    + `reversal the FIRST instance holds ['a']=${describe(firstA)} ['b']=${describe(firstB)}; the file now holds `
    + `'${bytesAfterRefusal === null ? 'NO FILE' : bytesAfterRefusal.toString('utf8')}'; a SECOND store opened on `
    + `the same path reads ['a']=${describe(freshA)} ['b']=${describe(freshB)}. `
    + `\`rollback\` ALONE: memory ['a']=${describe(controlMemory)}, bytes unmoved=`
    + `${controlAfter === null || controlBefore === null ? 'NO FILE' : controlAfter.equals(controlBefore)}, fresh `
    + `boot ['a']=${describe(controlBoot)} — a reversal persists NOTHING; the restore's save is what writes.`);
  rmSync(directory, { recursive: true, force: true });
  rmSync(controlDir, { recursive: true, force: true });
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 2 — THE PAIR: A RESTORE THAT MOVES NO `file`-TIER NODE LEAVES THE FILE BYTE-IDENTICAL
//
// **THE DRIVE.** A `file` value at `b` is committed; `a` is written twice at `mem`; the pair at `['a']` refuses
// the first value; the reversal of the second write moves only a `mem` version, is refused, and the restore
// re-states the head. **NO `file`-TIER VERSION MOVED ANYWHERE IN THAT CHAIN.**
//
// **THE TWO READINGS THAT MAKE THE NO-I/O PROPERTY AN ASSERTION RATHER THAN A PROMISE**: the bytes' SHA-256
// and length (identical before and after), and the path's own identity — `ino` and `mtime` (identical). **A
// save that ran would have renamed a sibling over the path (`§7.2` `M-12`/`DD-2`), so it would replace the
// inode even when the bytes it wrote were equal.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('the pair · a restore that moves NO `file`-tier node leaves the file byte-identical — the no-file-I/O property is asserted, not promised', (t) => {
  const directory = scratch('nomove');
  const path = pathIn(directory);
  const store = fileStoreAt(directory);
  const kept = attempt(() => store.write(['b'], 'file', 'durable'));
  const firstA = attempt(() => store.write(['a'], 'mem', 1));
  const secondA = attempt(() => store.write(['a'], 'mem', 2));
  const hashBefore = hashAt(path);
  const bytesBefore = bytesAt(path);
  const metaBefore = statSync(path);
  const pair = attempt(() => store.addConstraint({ address: ['a'], id: 'admits-two' },
    (context) => (context.value === 1
      ? { message: 'this pair admits the second value alone' }
      : true)));
  const rollback = attempt(() => store.rollback(secondA.ok ? secondA.value.op.opId : 'no-op'));
  const afterA = standing(store, ['a']);
  const afterB = standing(store, ['b']);
  const hashAfter = hashAt(path);
  const bytesAfter = bytesAt(path);
  const metaAfter = statSync(path);

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual([kept.ok, firstA.ok, secondA.ok, pair.ok], [true, true, true, true],
    `the drive's committed \`file\` write, its two \`mem\` writes and its pair must all land: `
      + `${JSON.stringify([kept.caught, firstA.caught, secondA.caught, pair.caught])}`);
  assert.equal(rollback.ok, false,
    `the reversal must be REFUSED — it restores the \`mem\` 1 the pair refuses: the call answered `
      + `${JSON.stringify(rollback.value)}`);
  assert.equal(rollback.caught.status, 'ConstraintPassRefused',
    `and the refusal is the judgement's: THE DRIVE READ ${JSON.stringify(rollback.caught.status)}`);
  assert.deepEqual(afterA, { present: true, value: 2 },
    `the restore put the \`mem\` 2 back: THE DRIVE READ ${describe(afterA)}`);
  assert.deepEqual(afterB, { present: true, value: 'durable' },
    `and the \`file\` value is the one it was: THE DRIVE READ ${describe(afterB)}`);

  // ── THE FINDING: THE BYTES AND THE PATH'S IDENTITY ARE BOTH UNMOVED. ────────────────────────
  assert.deepEqual(bytesAfter, bytesBefore,
    `THE FINDING — no \`file\`-tier node moved, so the restore performed NO file I/O: the bytes must be `
      + `byte-identical. before=${hashBefore} after=${hashAfter}`);
  assert.equal(hashAfter, hashBefore,
    `the bytes' SHA-256 is unmoved: before=${hashBefore} after=${hashAfter}`);
  assert.equal(metaAfter.size, metaBefore.size,
    `the length is unmoved: before=${metaBefore.size} after=${metaAfter.size}`);
  assert.equal(metaAfter.ino, metaBefore.ino,
    'and the INODE is unmoved — a save that ran would have renamed a sibling over the path, which replaces the '
      + `inode even where the bytes are equal: before=${metaBefore.ino} after=${metaAfter.ino}`);
  assert.equal(metaAfter.mtimeMs, metaBefore.mtimeMs,
    `and the mtime is unmoved: before=${metaBefore.mtimeMs} after=${metaAfter.mtimeMs}`);

  // ── THE READINGS, PRINTED (`D-21`). ─────────────────────────────────────────────────────────
  t.diagnostic(`THE NO-MOVE CELL: bytes ${bytesBefore === null ? 'NO FILE' : `len=${bytesBefore.length} `
    + `sha256=${hashBefore}`} before and ${bytesAfter === null ? 'NO FILE' : `len=${bytesAfter.length} `
    + `sha256=${hashAfter}`} after; inode ${metaBefore.ino} → ${metaAfter.ino}; mtime `
    + `${metaBefore.mtimeMs} → ${metaAfter.mtimeMs}; the refusal held ['a']=${describe(afterA)} `
    + `['b']=${describe(afterB)} — the restore moved no \`file\`-tier node, so nothing at the path was touched.`);
  rmSync(directory, { recursive: true, force: true });
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 3 — A SAVE THAT FAILS IS REPORTED, NOT SWALLOWED
//
// **THE DRIVE.** The same shape as cell 1, and the directory the store's path stands in is REMOVED between the
// committed writes and the reversal — so the restore's save cannot land. **WHAT THE CALLER MUST LEARN, AND
// BOTH HALVES ARE ASSERTED:** the store restored its own state to the journal mark **in memory** (the first
// instance's readings are the restored state) **and its file was NOT updated** (the sentence carries the
// store's own `FileCommitFailed` and its generated message, which names the path). **The refusal's `status`
// stays the judgement's rank-20 member** — the store's save status is carried in the sentence and no status is
// minted at this boundary (`DD-40`), and no new member enters the closed set.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('the failed save · the restore reports that the in-memory state was restored and the bytes were not — with the store\'s own `FileCommitFailed` and its generated message', (t) => {
  const directory = scratch('savefail');
  const path = pathIn(directory);
  const store = fileStoreAt(directory);
  const writeB = attempt(() => store.write(['b'], 'file', 1));
  const writeA = attempt(() => store.write(['a'], 'file', 1));
  const removed = attempt(() => store.delete(['a']));
  const pair = attempt(() => store.addConstraint({ address: ['b'], id: 'admits-present' },
    (context) => (context.value === undefined
      ? { message: 'this pair admits the present value alone' }
      : true)));
  // THE SAVE'S TARGET BECOMES UNREACHABLE — the path's directory is gone, so no sibling can be written or
  // renamed over it. The writes above already landed; the in-memory store is untouched by the removal.
  rmSync(directory, { recursive: true, force: true });
  const rollback = attempt(() => store.rollback(writeB.ok ? writeB.value.op.opId : 'no-op'));
  const afterA = standing(store, ['a']);
  const afterB = standing(store, ['b']);
  const log = rollback.ok === false && rollback.caught !== null && typeof rollback.caught === 'object'
    && Array.isArray(rollback.caught.log) ? rollback.caught.log : [];
  const sentence = log.length === 1 && typeof log[0].message === 'string' ? log[0].message : '';

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual([writeB.ok, writeA.ok, removed.ok, pair.ok], [true, true, true, true],
    `the drive's two writes, its delete and its pair must all land BEFORE the directory is removed: `
      + `${JSON.stringify([writeB.caught, writeA.caught, removed.caught, pair.caught])}`);
  assert.equal(rollback.ok, false,
    `the reversal must be REFUSED — the same refusal cell 1 takes: the call answered `
      + `${JSON.stringify(rollback.value)}`);
  assert.equal(rollback.caught.status, 'ConstraintPassRefused',
    `and the refusal's status is the judgement's rank-20 member — the save's own status is CARRIED, never `
      + `minted here (DD-40): THE DRIVE READ ${JSON.stringify(rollback.caught.status)}`);
  assert.equal(log.length, 1,
    `the refusal carries ONE \`constraint-check\` entry: THE DRIVE READ ${JSON.stringify(log)}`);

  // ── THE FINDING: THE SENTENCE SAYS BOTH FACTS, IN THE STORE'S OWN WORDS. ────────────────────
  assert.match(sentence, /IN MEMORY/,
    `THE FINDING — the sentence says the store's state was restored IN MEMORY: THE DRIVE READ ${JSON.stringify(sentence)}`);
  assert.match(sentence, /FILE WAS NOT UPDATED/,
    `THE FINDING — and that the file was NOT updated: THE DRIVE READ ${JSON.stringify(sentence)}`);
  assert.match(sentence, /FileCommitFailed/,
    `the store's own save status is named: THE DRIVE READ ${JSON.stringify(sentence)}`);
  assert.ok(sentence.includes(path),
    `the store's generated message names the failing path, so a consumer learns WHICH file was not written: `
      + `THE DRIVE READ ${JSON.stringify(sentence)}`);
  assert.match(sentence, /UNDONE/,
    `and the in-memory half is claimed only where the verification measured it: THE DRIVE READ ${JSON.stringify(sentence)}`);

  // ── AND THE MEMORY IT CLAIMS IS THE MEMORY THAT STANDS. ────────────────────────────────────
  assert.deepEqual(afterB, { present: true, value: 1 },
    `the caller is not told a restoration happened that did not: ['b'] is the restored value. THE DRIVE READ `
      + `${describe(afterB)}`);
  assert.deepEqual(afterA, { present: false, refused: 'AddressNotFound' },
    `and ['a'] is the restored absence: THE DRIVE READ ${describe(afterA)}`);
  assert.equal(rollback.caught.message,
    "'b' was refused by a constraint pass, the state this act would leave is not one the registered constraints admit",
    'the refusal\'s own message is the store\'s generated sentence for the judgement, unmoved by the save failure '
      + `(DD-52): THE DRIVE READ ${JSON.stringify(rollback.caught.message)}`);

  // ── THE READINGS, PRINTED (`D-21`). ─────────────────────────────────────────────────────────
  t.diagnostic(`THE FAILED-SAVE CELL: the path '${path}' and its directory were removed before the reversal; `
    + `the refusal reads ['a']=${describe(afterA)} ['b']=${describe(afterB)}; the log sentence says `
    + `${JSON.stringify(sentence)}`);
});
