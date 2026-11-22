// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// U-STOREROOM-03 · U-STOREROOM-04 · U-STOREROOM-05 — THE SAVER AND THE SEED: TWELVE CELLS, ONE test() EACH, IN THE
// ORDER SS-1 ... SS-12.
//
// **THE THREE UNITS, ONE SENTENCE EACH.**
//   * U-STOREROOM-03 EXPORT AND VERDICTS — the store's own image text leaves the store (position-less, marking
//     nothing, refusing as the writer it replaces refuses), and the two verdict entries tell the store whether the
//     caller's saver kept it: saveSucceeded marks the record saved and writes no byte, saveFailed performs the
//     writer's failure arm exactly and writes no byte either.
//   * U-STOREROOM-04 SAVE-CALL — a caller-supplied saveCall REPLACES the store's own writer at the terminal arm of a
//     write: the saver is handed the store's own image at ONE position, answers { success: boolean, message:
//     string[] }, and a failed save is ROLLED BACK FIRST and answered SECOND at rank 15 FileCommitFailed, with the
//     caller's words riding as log entries of the fifth kind, 'save'.
//   * U-STOREROOM-05 SEED — cfg.initialImage is THE STORE'S OWN IMAGE TEXT, decoded by the store's own decoder tail
//     and installed at file tier at construction, inside the born floor, and it fires no save.
//
// **THE RULINGS THE CELLS DISCHARGE, NAMED IN PLAIN PROSE.**
//   * D-144 item 1 — the saver takes ONE position, the store's own image, and may answer synchronously or with a
//     thenable ("async optional"); the answer's verdict is the boolean and its reason is the array.
//   * D-144 item 2 — a non-function saveCall is BROKEN CONFIG: cfg's own outside form, refused at the class gate,
//     under AddressMalformed, before any filesystem act, with no code minted and no second failure form created
//     (SS-2).
//   * D-144 item 3 — a failed save ROLLS THE COMMIT BACK and the caller hears the failure AFTER that rollback
//     (SS-4, SS-5, SS-6's second arm).
//   * D-144 item 7 — filePath and saveCall are MUTUALLY EXCLUSIVE, refused at the same class gate and in the same
//     instant as item 2's arm, before any filesystem act (SS-1).
//   * D-145 item 1 — the failed save's seat is rank 15 FileCommitFailed, WIDENED and never minted; its message is
//     the store's generated sentence and never the caller's words (SS-4, SS-5, SS-6).
//   * D-145 item 2 read with D-153 item 1 — the caller's message[] rides in the log as ONE 'save'-kind entry per
//     string, in the commit's own list, and the kind set is widened rather than bent (SS-4, SS-6's second arm).
//   * D-146 items 1-2 — saveFailed is the mirror of saveSucceeded and NO VERDICT is carried on any entry's position;
//     the package is told twice and never asked to judge (SS-4).
//   * D-153 item 2 — the awaited save's settle is a THIRD arm: a failed save reaches the caller's answer as a
//     refusal, never as a rejection of the settle (SS-6's second arm, read as the one thrown form the tail can
//     still throw).
//   * D-137 item 2 — the export writes no byte and marks nothing (SS-3's saver text is the store's composition, not
//     a file's bytes).
//   * D-137 item 4 read with D-147 item 1 — initialImage is image text only, in domain on every arm (SS-7, SS-8).
//   * D-132 item 1 read with D-133 item 3 — a saveCall store with NO filePath is a file-tier register, and its
//     writer is never reached: the saver IS the save (SS-3, SS-12).
//   * D-135 item 1 and item 3 — the seed is the boot path with the text supplied instead of the path, decoded by the
//     store's own tail, and an unreadable image is rank 22 FileImageRefused (SS-7, SS-9).
//   * D-147 item 2 — a seeded construction fires NO save and stays SYNCHRONOUS (SS-8).
//   * D-147 item 4 — an empty-string seed is refused as broken config; absence alone means no seed (SS-10).
//   * D-147 item 1 of its settled, and the design's install order — the seed stands INSIDE the born floor, so no
//     rollback reaches behind it (SS-11).
//   * surface.md section 2.11 clause 2 — the save stands BEFORE the delivered set on both arms (SS-12).
//
// **THE FOUR RULES THAT BIND EVERY CELL BELOW, STATED ONCE.**
//
//   1. NO ORDER IS ASSERTED ANYWHERE, WITH ONE DECLARED EXCEPTION. Every collection is read as a SET (a
//      de-duplicating sort) or as a count, never as a sequence, because "a drive compares sets, never sequences".
//      The one exception is SS-12, where the clause itself is an ORDER (the save precedes the delivered set) and the
//      cell asserts that order through a counter read INSIDE a listener body and never through a timing.
//
//   2. THE EXPECTATION IS A LITERAL IN THIS FILE AND THE CITATION IS PROSE. No docs path is opened at runtime and no
//      clause is parsed: a cell that cannot reach its arm asserts the drive's own coherence first and says so,
//      rather than reporting a verdict about an arm it never stood in.
//
//   3. NO CELL PASSES VACUOUSLY. Every premise is proved where it is used: a "thenable" premise is read off the
//      answer BEFORE it is awaited; a "withheld" premise is a settlement flag read after one loop turn of a promise
//      this drive has NOT opened the gate on; a "the saver ran" premise is a counter; a "no file" premise is a
//      control construction over the same path; a "the caller's words are the log's" premise is the same refusal
//      taken a second time with NO words. A body that happened to stay synchronous cannot make a cell green.
//
//   4. NO TIMER IS ARMED ANYWHERE. The one loop turn any cell needs is setImmediate, which is a loop turn and not a
//      scheduler (a timer is a scheduler, and the contract forbids it). The one promise a cell holds unresolved is a
//      gate THIS DRIVE owns and opens itself.
//
// **THE INSTRUMENTS.** The entry is imported EXACTLY AS A CONSUMER DOES — ../../bindings/js/index.mjs — and
// storeCreate is the only product constructor used. Nothing internal is imported from the package: no module under
// bindings/js/src, no state slot, no kernel helper, no addon entry. journalLength is 8 on every cell; the tier is
// mem unless the cell's subject IS the file tier (SS-1, SS-3, SS-4, SS-5, SS-6, SS-12 write or construct at file
// tier, and each says so where it does); every filePath is under process.cwd() in a per-cell name and every file a
// cell creates is removed in a finally.
//
// **THE HELPERS ARE THIS FILE'S OWN.** None is imported from a sibling test and none lives outside this file; the
// helper set here is written for this subject and shares no name with any other file's.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE FILE-LOCAL HELPERS.
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────

/** THE ONE JOURNAL LENGTH THIS FILE USES. Small on purpose: no cell needs more than a handful of ops, and the
 *  figure is stated once so no cell invents its own. */
const JOURNALS = 8;

/** ONE STORE, constructed by the package's own call and by nothing else. The base cfg is the smallest lawful one and
 *  every cell adds exactly the key its subject is about; a key given as undefined is still PRESENT, because the
 *  construction tests membership (Object.hasOwn) and never truthiness. */
const storeOf = (over) => storeCreate({ journalLength: JOURNALS, listeners: [], ...over });

/** Run run; answer the thrown value as a value, so a throw is a READING and never a crash of the cell. Total. */
function captured(run) {
  try {
    return { ok: true, value: run() };
  } catch (thrown) {
    return { ok: false, caught: thrown };
  }
}

/** THE THROWN FORM OF A CAPTURED READING, or null where the call stood. A refusal is read and never rethrown. */
function formOf(reading) {
  if (reading === null || typeof reading !== 'object' || reading.ok !== false) return null;
  const thrown = reading.caught;
  return thrown !== null && typeof thrown === 'object' ? thrown : null;
}

/** THE REFUSAL'S status AS A STRING, or null where the call stood or answered a non-object. */
function statusOf(reading) {
  const form = formOf(reading);
  if (form === null) return null;
  return typeof form.status === 'string' ? form.status : null;
}

/** A SET READING AND NEVER A SEQUENCE: de-duplicate, then sort. Two collections are the same set iff these answers
 *  are equal, and no index of one is ever compared to an index of the other. */
const asSet = (list) => [...new Set(list)].sort();

/** IS THE VALUE A THENABLE — read as a typeof on the language's own assimilation slot, never as a guess. Read on an
 *  object and on a function, because a function may carry a then too. */
const isThenable = (value) => (
  value !== null
  && (typeof value === 'object' || typeof value === 'function')
  && typeof value.then === 'function'
);

/** THE LOG'S KINDS AS A SET, or an empty set where the member is not a list. */
const kindSet = (log) => (Array.isArray(log) ? asSet(log.map((entry) => entry.kind)) : []);

/** THE ENTRIES OF ONE KIND, in the list's own order — read as a count and as a set of their messages below, never
 *  as a sequence. */
const entriesOfKind = (log, kind) => (Array.isArray(log) ? log.filter((entry) => entry.kind === kind) : []);

/** One entry's message member, as a value: the store's generated sentence or the caller's own string. */
const messagesOf = (entries) => entries.map((entry) => entry.message);

/** **THE WORDS A SENTENCE IS MADE OF** — split on everything that is not a digit or a letter, drop the empties. A
 *  generated English sentence necessarily contains the LETTERS a and b; what D-145 item 2 forbids is the caller's
 *  WORDS being rendered into it, so a cell asks this list whether it carries a caller word as a WORD. */
const wordsOf = (text) => (
  typeof text === 'string' ? text.split(/[^0-9A-Za-z]+/).filter((word) => word.length > 0) : []
);

/** One turn of the event loop, and one that is NOT a timer: setImmediate. */
const drain = () => new Promise((resolve) => { setImmediate(resolve); });

/** **A GATE** — one promise plus the one function that opens it. A gate this drive never opens is a declared state
 *  (the answer is withheld, and that means withheld), so holding one is asserting a law and not leaking a timer. */
function latchOf() {
  const held = { open: null, promise: null };
  held.promise = new Promise((resolve) => { held.open = resolve; });
  return held;
}

/** A per-cell file path UNDER THE PROCESS'S OWN WORKING DIRECTORY, so the cell's artefact never leaves the tree the
 *  suite was started in. */
const at = (name) => join(process.cwd(), name);

/** THE FILE'S TEXT AT A PATH, or null where no file stands there. Total, and the one reading every "nothing was
 *  written" assertion is made from. */
const bytesAt = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);

/** REMOVE EVERY FILE A CELL MAY HAVE MADE. Called in a finally so a failed assertion leaves no artefact behind. */
function sweep(paths) {
  for (const path of paths) rmSync(path, { force: true });
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 1 OF 12 · SS-1 — BOTH KEYS IS BROKEN CONFIG, AND THE REFUSAL PRECEDES ANY FILESYSTEM ACT.
//
// THE RULINGS: D-144 item 7 (filePath and saveCall are mutually exclusive; the pair is refused at the same class gate
// and before any filesystem act) read with D-144 item 2 (the status is the one a bad cfg already answers, the package
// mints no code and creates no second failure form) and with the construction's own law that every check precedes its
// first filesystem act.
//
// THE OBSERVABLE: a cfg carrying BOTH a filePath and a FUNCTION saveCall is handed to storeCreate. The call must
// THROW the surface's one form with status AddressMalformed and an EMPTY log — no attempt is open and no instance
// exists — and the form's sentence must name BOTH keys, which is the only thing that tells this refusal from SS-2's
// per-key class gate. And NO FILE may stand at the path afterwards: the refusal is cfg's and not the store's, so the
// path is never touched.
//
// THE NON-VACUITY: the very same path accepts a LAWFUL construction immediately after (the control below), so the
// path was a live path, the store's own construction would happily act on it, and the absent file is the refusal's
// abstention and not a path the runtime could not reach.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-1 · BOTH KEYS IS BROKEN CONFIG — filePath with saveCall is AddressMalformed, before any filesystem act (D-144 item 7)', (t) => {
  const path = at('ss1-both-keys.image.json');
  sweep([path]);
  try {
    const refused = captured(() => storeOf({
      filePath: path,
      saveCall: () => ({ success: true, message: [] }),
    }));

    // ── THE REFUSAL ITSELF. ──────────────────────────────────────────────────────────────────────────────────
    assert.equal(refused.ok, false,
      '**A cfg CARRYING BOTH KEYS MUST BE REFUSED** and never construct (D-144 item 7): the call stood and answered '
        + (refused.ok ? typeof refused.value : 'nothing'));
    const form = formOf(refused);
    assert.equal(form !== null, true,
      'the refusal must be an object — the surface has ONE thrown form and it is a plain object (D-144 item 2)');
    assert.equal(statusOf(refused), 'AddressMalformed',
      '**THE STATUS MUST BE THE ONE A BAD cfg ALREADY ANSWERS** (AddressMalformed; D-144 items 2 and 7, and the '
        + 'package mints no code): read ' + String(statusOf(refused)));
    assert.deepEqual(form.log, [],
      '**THE REFUSAL MUST CARRY AN EMPTY LOG** — no attempt is open and no instance exists, so there is nothing to '
        + 'report: read ' + JSON.stringify(form.log));
    assert.deepEqual(asSet(Object.keys(form)), ['address', 'log', 'message', 'status'],
      'the thrown form must carry the surface\'s four members and no other: read '
        + JSON.stringify(Object.keys(form)));

    // ── THE SENTENCE NAMES BOTH KEYS, WHICH IS WHAT MAKES THIS THE CROSS-KEY REFUSAL. ────────────────────────
    t.diagnostic('SS-1 · the refusal\'s message = ' + JSON.stringify(form.message));
    assert.equal(typeof form.message, 'string',
      'the generated message must be a string: read ' + String(typeof form.message));
    assert.equal(form.message.includes('filePath'), true,
      '**THE SENTENCE MUST NAME filePath** — a cross-key rule has no per-key subject, so both keys are what a caller '
        + 'needs to see (D-144 item 7): read ' + JSON.stringify(form.message));
    assert.equal(form.message.includes('saveCall'), true,
      '**AND IT MUST NAME saveCall**: read ' + JSON.stringify(form.message));

    // ── AND NO FILESYSTEM ACT CAME BEFORE IT. ────────────────────────────────────────────────────────────────
    assert.equal(existsSync(path), false,
      '**NO FILE MAY STAND AT THE PATH AFTER THE REFUSAL** — the refusal precedes the construction\'s first '
        + 'filesystem act: read exists = ' + String(existsSync(path)));

    // ── THE PREMISE, DISCHARGED: THE PATH IS A LIVE PATH. ───────────────────────────────────────────────────
    const control = captured(() => storeOf({ filePath: path }));
    assert.equal(control.ok, true,
      'the control construction over the SAME path must stand, or the cell has said nothing about the refusal\'s '
        + 'abstention: status read = ' + String(statusOf(control)));
    t.diagnostic('SS-1 · the same path accepted a lawful construction afterwards: file present = '
      + String(existsSync(path)) + ', bytes = ' + JSON.stringify(bytesAt(path)));
  } finally {
    sweep([path]);
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 2 OF 12 · SS-2 — A NON-FUNCTION SAVER IS BROKEN CONFIG, AND NO INSTANCE IS EVER BUILT.
//
// THE RULING: D-144 item 2, verbatim in its substance — "Refuse non-function saveCall as broken config". It is not
// ignored as a key beyond the declared set and not a TypeError: it is cfg's own outside form, taken at the class
// gate, under the status a bad cfg already answers, with the package minting no code and creating no second failure
// form. Membership is Object.hasOwn, so a PRESENT null is the key's own outside form and is refused rather than read
// as absence.
//
// THE OBSERVABLE: three outside forms — a string, a number and null — are each handed to storeCreate. Each must throw
// AddressMalformed with an empty log, the message must name the key, and the thrown value must carry NO STORE MEMBER:
// the surface's one form is not an instance, so "one instance never built" is read off the refusal rather than
// asserted as a hope. The control proves the gate is the key's: the same cfg with the key OMITTED constructs an
// instance whose write is a function.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-2 · A NON-FUNCTION SAVER IS BROKEN CONFIG — AddressMalformed, and one instance never built (D-144 item 2)', (t) => {
  const outside = ['nope', 5, null];
  const spelled = [];

  for (const bad of outside) {
    const refused = captured(() => storeOf({ saveCall: bad }));
    assert.equal(refused.ok, false,
      '**A saveCall THAT IS NOT A FUNCTION MUST BE REFUSED** (D-144 item 2): the value ' + JSON.stringify(bad)
        + ' constructed an instance');
    const form = formOf(refused);
    assert.equal(form !== null, true,
      'the refusal must be the surface\'s one plain-object form: read ' + String(typeof refused.caught));
    assert.equal(statusOf(refused), 'AddressMalformed',
      '**THE STATUS IS THE ONE A BAD cfg ALREADY ANSWERS** (D-144 item 2): for ' + JSON.stringify(bad) + ' read '
        + String(statusOf(refused)));
    assert.deepEqual(form.log, [],
      'the refusal must carry an empty log: for ' + JSON.stringify(bad) + ' read ' + JSON.stringify(form.log));
    assert.equal(form.message.includes('saveCall'), true,
      'the generated sentence must name the key: for ' + JSON.stringify(bad) + ' read '
        + JSON.stringify(form.message));

    // ── ONE INSTANCE NEVER BUILT: THE THROWN FORM IS THE FORM AND NOT A STORE. ───────────────────────────────
    assert.equal(typeof form.read, 'undefined',
      '**THE THROWN VALUE MUST CARRY NO STORE MEMBER** — no instance was built, so there is no read verb on it: '
        + 'read ' + String(typeof form.read));
    assert.equal(typeof form.write, 'undefined',
      'and no write verb either: read ' + String(typeof form.write));
    spelled.push(form.message);
  }

  t.diagnostic('SS-2 · the three class spellings in the generated sentences (printed, not asserted) = '
    + JSON.stringify(spelled));

  // ── THE PREMISE, DISCHARGED: THE GATE IS THE KEY'S AND NOT THE cfg'S. ─────────────────────────────────────
  const control = captured(() => storeOf());
  assert.equal(control.ok, true,
    '**THE SAME cfg WITHOUT THE KEY MUST CONSTRUCT** — otherwise the three refusals above say nothing about saveCall: '
      + 'status read = ' + String(statusOf(control)));
  assert.equal(typeof control.value.write, 'function',
    'and the control must be a real instance, with the product\'s write verb on it: read '
      + String(typeof control.value.write));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 3 OF 12 · SS-3 — A PATH-LESS SAVING STORE IS A file-TIER REGISTER, AND THE SAVER IS HANDED THE IMAGE.
//
// THE RULINGS: D-132 item 1 (a saveCall store with no filePath is a file-tier register — "treat the file probe as
// successful") read with D-133 item 3 (the store's own writer is NOT USED on this arm) and D-137 item 2 (the export
// composes the store's own image, writes no byte and marks nothing).
//
// THE OBSERVABLE, AND IT IS THE ONE OBSERVABLE THE THIRD ENTRY CONDITION EXISTS FOR: a store constructed with a saver
// and NO filePath performs a file-tier write and READS IT BACK. The write's answer is a record and not a thenable
// (the saver answered in its own frame), the record's op carries tier 'file' (so the register really entered the
// file tier), the saver was called EXACTLY ONCE, and the one argument it received is a STRING that JSON-parses to
// the written state — the store's own composition and not a file's bytes, and not the caller's value wrapped in
// anything the package authored.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-3 · A PATH-LESS SAVING STORE IS file-TIER AND SAVES — the saver gets the store\'s own image (D-132 item 1; D-133 item 3)', (t) => {
  const handed = [];
  // THE CELL'S SUBJECT IS THE PATH-LESS ARM: no filePath is passed anywhere in this cell.
  const store = storeOf({
    saveCall: (image) => {
      handed.push(image);
      return { success: true, message: [] };
    },
  });

  const answer = captured(() => store.write(['a'], 'file', 1));
  assert.equal(answer.ok, true,
    '**THE file-TIER WRITE MUST STAND ON A REGISTER WITH NO PATH** (D-132 item 1): the call threw '
      + String(statusOf(answer)));
  assert.equal(isThenable(answer.value), false,
    'the saver answered in its own frame, so the write must answer the RECORD itself and never a thenable: '
      + 'thenable = ' + String(isThenable(answer.value)));

  // ── THE REGISTER IS file-TIER, AND THE OP SAYS SO. ────────────────────────────────────────────────────────
  assert.equal(answer.value !== null && typeof answer.value === 'object', true,
    'the answer must be a record: read ' + String(answer.value === null ? 'null' : typeof answer.value));
  assert.deepEqual(asSet(Object.keys(answer.value)), ['op', 'triggered', 'watched'],
    'the record\'s declared three members are unmoved: read ' + JSON.stringify(Object.keys(answer.value)));
  assert.equal(answer.value.op.tier, 'file',
    '**THE OP MUST BE A file-TIER OP** — that is the third entry condition, read off the store\'s own record: '
      + 'read ' + JSON.stringify(answer.value.op.tier));

  // ── THE SAVER WAS CALLED ONCE, WITH THE STORE'S OWN IMAGE. ────────────────────────────────────────────────
  assert.equal(handed.length, 1,
    '**THE SAVER MUST BE CALLED EXACTLY ONCE** for one passing file-tier write (D-144 item 1\'s one position, one '
      + 'act): read ' + String(handed.length) + ' call(s)');
  const image = handed[0];
  assert.equal(typeof image, 'string',
    '**THE ONE ARGUMENT MUST BE IMAGE TEXT** (D-137 item 2, D-133 item 3): read ' + String(typeof image));
  t.diagnostic('SS-3 · the saver was handed ' + String(image.length) + ' bytes of image text = '
    + JSON.stringify(image));
  let decoded = null;
  let parseError = null;
  try {
    decoded = JSON.parse(image);
  } catch (thrown) {
    parseError = thrown;
  }
  assert.equal(parseError, null,
    '**THE IMAGE MUST BE JSON THE STORE ITSELF COMPOSED** — the whole state and not a delta: parse error = '
      + String(parseError !== null && parseError !== undefined ? parseError.message : 'none'));
  assert.deepEqual(decoded, { a: 1 },
    '**THE IMAGE MUST CARRY THE WRITTEN STATE** — the register\'s file-tier composition, keyed by the written '
      + 'address: read ' + JSON.stringify(decoded));

  // ── AND THE WRITE READS BACK, WHICH IS THE WHOLE POINT OF THE THIRD ENTRY CONDITION. ──────────────────────
  const readBack = captured(() => store.read(['a']));
  assert.equal(readBack.ok, true,
    '**A file-TIER WRITE ON A PATH-LESS STORE MUST READ BACK** (D-132 item 1): the read threw '
      + String(statusOf(readBack)));
  assert.equal(readBack.value, 1,
    'the value must be the one written: read ' + JSON.stringify(readBack.value));
  const readFile = captured(() => store.read(['a'], 'file'));
  assert.equal(readFile.ok, true,
    'and the same address read AT file TIER must answer too: the read threw ' + String(statusOf(readFile)));
  assert.equal(readFile.value, 1,
    'with the same value: read ' + JSON.stringify(readFile.value));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 4 OF 12 · SS-4 — A FAILED SAVE ROLLS THE COMMIT BACK, AND THE CALLER'S WORDS RIDE THE LOG.
//
// THE RULINGS: D-144 item 3 (a failed save rolls the commit back) · D-145 item 1 (the seat is rank 15
// FileCommitFailed, widened, its message the store's generated sentence) · D-145 item 2 with D-153 item 1 (the
// caller's message[] rides in the log as ONE 'save'-kind entry per string) · D-146 items 1-2 (saveFailed is the
// mirror of saveSucceeded and no verdict travels on any entry's position).
//
// THE OBSERVABLE: a saver answering { success: false, message: ['a', 'b'] } makes the write THROW FileCommitFailed;
// the log carries exactly TWO 'save'-kind entries whose messages are the caller's two strings, and exactly one other
// entry — the kernel's single 'outcome' entry, at the save arm's own KC-9 · the refusal's message is the store's
// generated sentence, which names the act's address and renders neither caller word · and THE VALUE IS GONE
// afterwards, because the rollback precedes the answer.
//
// AND THE GENERATED SENTENCE IS PROVED GENERATED, NOT MERELY UNLIKELY: a SECOND failed write at the same address,
// whose saver supplies NO message array at all, answers the SAME message string byte for byte — so the sentence
// depends on the act and on nothing the caller said — while its log carries NO 'save' entry at all. That pair is the
// non-vacuity of the passthrough: the entries are the caller's array and the sentence is not.
//
// ON THE LETTERS. The store's generated English sentence necessarily contains the letters a and b; what the ruling
// forbids is the caller's WORDS being rendered into it. So the cell asserts the token reading (no WORD of the
// sentence is either caller string) beside the identity reading above.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-4 · A FAILED SAVE ROLLS THE COMMIT BACK — FileCommitFailed, the caller\'s words as save entries, the value gone (D-144 item 3; D-145 items 1-2)', (t) => {
  const calls = [];
  const store = storeOf({
    saveCall: () => {
      calls.push(calls.length + 1);
      // THE FIRST FAILED SAVE SPEAKS; THE SECOND ONE SAYS NOTHING AT ALL — the identity reading below needs it.
      return calls.length === 1
        ? { success: false, message: ['a', 'b'] }
        : { success: false };
    },
  });

  const refused = captured(() => store.write(['ss4key'], 'file', { x: 1 }));
  assert.equal(refused.ok, false,
    '**A SAVE THE CALLER REFUSED MUST REFUSE THE WRITE** (D-145 item 1): the call stood and answered '
      + JSON.stringify(refused.ok ? asSet(Object.keys(refused.value)) : []));
  const form = formOf(refused);
  assert.equal(form !== null, true, 'the refusal must be the surface\'s one plain-object form');
  assert.equal(statusOf(refused), 'FileCommitFailed',
    '**THE SEAT MUST BE RANK 15 FileCommitFailed** — widened and never minted (D-145 item 1): read '
      + String(statusOf(refused)));
  assert.deepEqual(asSet(Object.keys(form)), ['address', 'log', 'message', 'status'],
    'the failed save answers the surface\'s four-member form: read ' + JSON.stringify(Object.keys(form)));

  // ── THE LOG: TWO 'save' ENTRIES, THE CALLER'S WORDS, AND THE KERNEL'S ONE 'outcome' ENTRY. ──────────────────
  const saveEntries = entriesOfKind(form.log, 'save');
  t.diagnostic('SS-4 · the log\'s kinds in arrival order (printed, not asserted) = '
    + JSON.stringify(Array.isArray(form.log) ? form.log.map((entry) => entry.kind) : null)
    + '; the same kinds as a set = ' + JSON.stringify(kindSet(form.log)));
  assert.equal(Array.isArray(form.log), true,
    'the refusal must carry a log list: read ' + JSON.stringify(form.log));
  assert.deepEqual(kindSet(form.log), ['outcome', 'save'],
    '**THE FIFTH KIND IS THE LOG\'S ONLY NEW MEMBER** (D-153 item 1: the set moves four to five, kind save): read '
      + JSON.stringify(kindSet(form.log)));
  assert.equal(saveEntries.length, 2,
    '**ONE save ENTRY PER STRING THE CALLER SUPPLIED** (D-145 item 2; D-153 item 1): read '
      + String(saveEntries.length));
  assert.deepEqual(asSet(messagesOf(saveEntries)), ['a', 'b'],
    '**THE save ENTRIES\' MESSAGES ARE THE CALLER\'S OWN WORDS** — compared as a SET and never as a sequence: read '
      + JSON.stringify(messagesOf(saveEntries)));
  assert.equal(form.log.length, 3,
    'the log carries the caller\'s two entries and the kernel\'s single outcome entry and nothing else: read '
      + String(form.log.length));
  const outcome = entriesOfKind(form.log, 'outcome');
  assert.equal(outcome.length, 1,
    'exactly one outcome entry, appended once (D-53\'s arm token): read ' + String(outcome.length));
  assert.equal(outcome[0].state, 'KC-9',
    '**THE OUTCOME ENTRY\'S TOKEN MUST BE THE SAVE ARM\'S OWN** — the floor governs every arm but the save\'s '
      + '(D-53): read ' + JSON.stringify(outcome[0].state));

  // ── THE MESSAGE IS THE STORE'S GENERATED SENTENCE. ────────────────────────────────────────────────────────
  t.diagnostic('SS-4 · the refusal\'s message = ' + JSON.stringify(form.message));
  assert.equal(typeof form.message, 'string',
    'the generated message must be a string: read ' + String(typeof form.message));
  const words = wordsOf(form.message);
  assert.equal(words.includes('a'), false,
    '**THE CALLER\'S FIRST WORD MUST NOT BE RENDERED INTO THE STORE\'S SENTENCE** (D-145 item 1): the sentence\'s '
      + 'words read ' + JSON.stringify(words));
  assert.equal(words.includes('b'), false,
    'and neither must the second: the sentence\'s words read ' + JSON.stringify(words));
  assert.equal(form.message.includes("'a'"), false,
    'and no caller word is quoted into it either: read ' + JSON.stringify(form.message));

  // ── AND THE SENTENCE IS THE ACT'S, NOT THE CALLER'S: THE SAME REFUSAL WITH NO WORDS. ──────────────────────
  const again = captured(() => store.write(['ss4key'], 'file', { x: 1 }));
  assert.equal(again.ok, false,
    'the second failed write must refuse too, or the identity reading below has no second reading: it stood');
  const againForm = formOf(again);
  assert.equal(statusOf(again), 'FileCommitFailed',
    'the second refusal is the same seat: read ' + String(statusOf(again)));
  t.diagnostic('SS-4 · the second refusal\'s log kinds = ' + JSON.stringify(kindSet(againForm.log)));
  assert.equal(entriesOfKind(againForm.log, 'save').length, 0,
    '**A SAVER THAT SAID NOTHING CONTRIBUTES NO save ENTRY** — so the two entries above are the caller\'s array and '
      + 'not a rendering of the failure: read '
      + JSON.stringify(messagesOf(entriesOfKind(againForm.log, 'save'))));
  assert.equal(againForm.message, form.message,
    '**THE GENERATED SENTENCE MUST BE IDENTICAL WITH AND WITHOUT THE CALLER\'S WORDS** — the message is the '
      + 'store\'s, and it is about the act: with words = ' + JSON.stringify(form.message) + '; without = '
      + JSON.stringify(againForm.message));

  // ── THE ROLLBACK PRECEDES THE ANSWER: THE VALUE IS GONE. ──────────────────────────────────────────────────
  const readAfter = captured(() => store.read(['ss4key']));
  assert.equal(readAfter.ok, false,
    '**THE FAILED SAVE ROLLED THE COMMIT BACK** (D-144 item 3), so the value must be GONE: the read stood and '
      + 'answered ' + JSON.stringify(readAfter.value));
  assert.equal(statusOf(readAfter), 'AddressNotFound',
    'and it must refuse as an absent address: read ' + String(statusOf(readAfter)));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 5 OF 12 · SS-5 — A THROWING SAVER IS THE SAME FAILED ARM, AND ITS WORDS NEVER CROSS.
//
// THE RULINGS: D-144 item 1 (any answer that is not { success: true } is the failed arm — and the design's arm (b)
// puts a THROW there) · D-145 item 1 (the seat is FileCommitFailed, its message the store's generated sentence) ·
// D-144 item 3 (the rollback precedes the answer) · D-137 item 5's family rule that a body's or a saver's own reason
// is the caller's and is never rendered as though this package had authored it.
//
// THE OBSERVABLE: a saver that throws a sentinel throwable makes the write THROW FileCommitFailed; the sentinel's
// text appears in NEITHER the refusal's message NOR its log (the refusal is rendered whole and searched); the log
// carries the kernel's one outcome entry and NO 'save' entry at all, because a throw carries no message array; and
// the value is rolled back.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-5 · A THROWING SAVER IS THE FAILED ARM — FileCommitFailed, the sentinel rendered nowhere, the value rolled back (D-144 item 1; D-145 item 1)', (t) => {
  const SENTINEL = 'ss5-sentinel-throw-9c1';
  const store = storeOf({
    saveCall: () => { throw new Error(SENTINEL); },
  });

  const refused = captured(() => store.write(['ss5key'], 'file', 2));
  assert.equal(refused.ok, false,
    '**A THROWING SAVER MUST REFUSE THE WRITE** — the design\'s arm (b) is the failed arm (D-144 item 1): the call '
      + 'stood and answered ' + JSON.stringify(refused.ok ? asSet(Object.keys(refused.value)) : []));
  assert.equal(statusOf(refused), 'FileCommitFailed',
    '**THE SEAT IS THE SAME RANK 15 FORM** — a throw is one more way to fail the save, not a new seat (D-145 item 1): '
      + 'read ' + String(statusOf(refused)));
  const form = formOf(refused);
  assert.equal(form !== null, true, 'the refusal must be the surface\'s one plain-object form');

  // ── THE SENTINEL CROSSES NOWHERE. ─────────────────────────────────────────────────────────────────────────
  assert.equal(typeof form.message, 'string',
    'the refusal\'s message must be a string: read ' + String(typeof form.message));
  assert.equal(form.message.includes(SENTINEL), false,
    '**THE SAVER\'S OWN THROWABLE IS NEVER RENDERED AS A SENTENCE THIS PACKAGE AUTHORED** (D-137 item 5\'s family '
      + 'rule): read ' + JSON.stringify(form.message));
  assert.equal(JSON.stringify(form.log).includes(SENTINEL), false,
    '**AND IT CROSSES ON NO LOG ENTRY EITHER** — the log is searched whole, entry by entry: read '
      + JSON.stringify(form.log));
  assert.equal(JSON.stringify(form).includes(SENTINEL), false,
    'the refusal rendered whole must not carry the saver\'s text — no member is left out of this search: read '
      + JSON.stringify(form));

  // ── AND THE LOG HAS NO save ENTRY: A THROW CARRIES NO message[]. ───────────────────────────────────────────
  t.diagnostic('SS-5 · the throwing arm\'s log kinds = ' + JSON.stringify(kindSet(form.log))
    + '; entries = ' + String(Array.isArray(form.log) ? form.log.length : -1));
  assert.deepEqual(kindSet(form.log), ['outcome'],
    '**A THROW CONTRIBUTES NO save ENTRY** (there is no array to read) and the kernel\'s single outcome entry '
      + 'stands: read ' + JSON.stringify(kindSet(form.log)));

  // ── THE ROLLBACK, ON THE SAME ARM. ────────────────────────────────────────────────────────────────────────
  const readAfter = captured(() => store.read(['ss5key']));
  assert.equal(readAfter.ok, false,
    '**THE THROWING ARM ROLLS THE COMMIT BACK TOO** (D-144 item 3): the read stood and answered '
      + JSON.stringify(readAfter.value));
  assert.equal(statusOf(readAfter), 'AddressNotFound',
    'and it refuses as an absent address: read ' + String(statusOf(readAfter)));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 6 OF 12 · SS-6 — AN AWAITED SAVER WITHHOLDS THE ANSWER, AND ITS FAILURE REACHES THE CALLER.
//
// THE RULINGS: D-144 item 1 (a thenable answer is in domain) read with D-153 item 2 (the awaited arm is a THIRD arm
// of the settle: the refusal is a datum the settle resolves into — the settle never rejects — and it is the
// surface's ONE thrown form that crosses the caller's answer) and D-144 item 3's rollback-first order.
//
// THE FIRST ARM. A saver returns a promise resolved by a gate THIS DRIVE owns. The write's answer must be a THENABLE
// and must NOT have settled after one loop turn of the event loop, with the gate still closed; the saver must have
// been called (the act reached the save); then the drive opens the gate, the answer settles into the RECORD, and the
// value reads back. The withheld reading is a flag the drive's own handler sets and the drive's own turn reads, so a
// cell cannot be green because the promise happened to settle early.
//
// THE SECOND ARM. An awaited saver that FAILS: the answer must reach the caller as a refusal — read here as the one
// thrown form the tail can still throw, so the cell writes await answer inside a capture and asserts the THROWN
// value's status — with the caller's words still riding as 'save' entries, and the value rolled back. WHICH SHAPE THE
// LANDED CODE TAKES IS PRINTED: measured at this tree, the write's thenable REJECTS with the refusal, and the drive
// reports the log's kinds beside it because the awaited arm seals the commit's list before the pass closes.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-6 · AN AWAITED SAVER WITHHOLDS THE ANSWER — a thenable that settles into the record, and a failed one that refuses (D-144 item 1; D-153 item 2)', async (t) => {
  // ── ARM ONE: THE GATE THIS DRIVE OWNS. ───────────────────────────────────────────────────────────────────
  const latch = latchOf();
  const calls = { count: 0 };
  const store = storeOf({
    saveCall: () => {
      calls.count += 1;
      return latch.promise.then(() => ({ success: true, message: [] }));
    },
  });

  const answer = captured(() => store.write(['ss6key'], 'file', 7));
  assert.equal(answer.ok, true,
    '**THE WRITE ITSELF MUST STAND** — an awaited saver is not a refusal (D-144 item 1\'s async option): the call '
      + 'threw ' + String(statusOf(answer)));
  assert.equal(isThenable(answer.value), true,
    '**THE ANSWER MUST BE A THENABLE** where the saver answered one, or the awaited arm was never stood in: '
      + 'thenable = ' + String(isThenable(answer.value)));
  assert.equal(calls.count, 1,
    '**THE SAVER MUST HAVE BEEN CALLED** before the answer is read, or the cell is describing a save that never '
      + 'started: calls = ' + String(calls.count));

  // THE SETTLEMENT WATCH — a handler the drive attaches, and a flag only a settlement can move.
  const settled = { state: 'pending', value: undefined };
  const watched = answer.value.then(
    (value) => { settled.state = 'fulfilled'; settled.value = value; return value; },
    (thrown) => { settled.state = 'rejected'; settled.value = thrown; return thrown; },
  );
  await drain();
  assert.equal(settled.state, 'pending',
    '**THE ANSWER MUST BE WITHHELD WHILE THE GATE IS CLOSED** — the save has not answered, so the write has not '
      + 'answered (D-144 item 1 read with D-153 item 2): state = ' + settled.state);

  latch.open();
  const record = await watched;
  assert.equal(settled.state, 'fulfilled',
    '**THE ANSWER MUST SETTLE INTO THE RECORD, NOT INTO A REFUSAL** — the save succeeded: state = '
      + settled.state + ', value = ' + JSON.stringify(settled.value && typeof settled.value === 'object'
        ? asSet(Object.keys(settled.value)) : settled.value));
  assert.equal(record !== null && typeof record === 'object', true,
    'the settled answer must be the receipt itself: read ' + String(record === null ? 'null' : typeof record));
  assert.deepEqual(asSet(Object.keys(record)), ['op', 'triggered', 'watched'],
    'the record behind the await is the write\'s own three declared members: read '
      + JSON.stringify(Object.keys(record)));
  const readBack = captured(() => store.read(['ss6key']));
  assert.equal(readBack.ok, true,
    '**THE AWAITED SAVE\'S WRITE MUST READ BACK** — the save succeeded, so nothing was rolled back: the read threw '
      + String(statusOf(readBack)));
  assert.equal(readBack.value, 7,
    'with the value the caller wrote: read ' + JSON.stringify(readBack.value));

  // ── ARM TWO: AN AWAITED SAVE THAT FAILS REACHES THE CALLER. ──────────────────────────────────────────────
  const failing = storeOf({
    saveCall: () => Promise.resolve({ success: false, message: ['async-a', 'async-b'] }),
  });
  const pending = captured(() => failing.write(['ss6bkey'], 'file', 9));
  assert.equal(pending.ok, true,
    'the write must stand at the call and hand back a thenable, so the refusal crosses through the ANSWER and not '
      + 'through the call: it threw ' + String(statusOf(pending)));
  assert.equal(isThenable(pending.value), true,
    '**THE FAILED AWAITED SAVE MUST ALSO ARRIVE THROUGH THE ANSWER** (D-153 item 2): thenable = '
      + String(isThenable(pending.value)));

  let refusal = null;
  try {
    await pending.value;
  } catch (thrown) {
    refusal = thrown;
  }
  assert.equal(refusal !== null, true,
    '**AN AWAITED SAVE THAT FAILED MUST REACH THE CALLER** — the answer settled into nothing and the caller would '
      + 'never learn the save was refused (D-153 item 2 requires the reason to cross): the await answered a value');
  const refusalForm = refusal !== null && typeof refusal === 'object' ? refusal : null;
  assert.equal(refusalForm !== null, true,
    'the refusal must be the surface\'s one plain-object form: read ' + String(typeof refusal));
  assert.equal(typeof refusalForm.status === 'string' ? refusalForm.status : null, 'FileCommitFailed',
    '**THE SEAT IS RANK 15 FileCommitFailed** on this arm too (D-145 item 1, D-153 item 2): read '
      + JSON.stringify(refusalForm.status));
  t.diagnostic('SS-6 · the awaited failure\'s log kinds = ' + JSON.stringify(kindSet(refusalForm.log))
    + ' (the awaited arm seals the commit\'s list before the pass closes, so its entries ride a copy)');
  assert.deepEqual(asSet(messagesOf(entriesOfKind(refusalForm.log, 'save'))), ['async-a', 'async-b'],
    '**THE CALLER\'S WORDS MUST SURVIVE THE AWAIT** — the reason it wrote must not be lost on the async arm '
      + '(D-153 item 2): read ' + JSON.stringify(messagesOf(entriesOfKind(refusalForm.log, 'save'))));
  const readAfter = captured(() => failing.read(['ss6bkey']));
  assert.equal(readAfter.ok, false,
    '**THE AWAITED FAILED SAVE ROLLS THE COMMIT BACK** (D-144 item 3): the read stood and answered '
      + JSON.stringify(readAfter.value));
  assert.equal(statusOf(readAfter), 'AddressNotFound',
    'and it refuses as an absent address: read ' + String(statusOf(readAfter)));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 7 OF 12 · SS-7 — THE SEED IS THE ROUND TRIP: IMAGE TEXT OUT, IMAGE TEXT IN, THE STORE'S DECODER ON BOTH.
//
// THE RULINGS: D-137 item 4 (the seed is image text only; the saver and the seed speak the same currency) · D-135
// item 1 (an image-text seed is the boot path with the text supplied instead of the path, decoded by the store's own
// tail) · D-147 item 1 (in domain on every arm) · D-132 item 3 (a saveCall store saves and cannot load, so the image
// is its bootstrap).
//
// THE OBSERVABLE: a saveCall store holds a value and its saver receives the store's own image text; a FRESH store,
// constructed from that text through initialImage and with NO saver, READS THE SEEDED STATE — the same address, the
// same value, and the same shape the exporting store itself answered. The fresh store is constructed by the package's
// own call and its answer is an INSTANCE and not a thenable (the construction stays synchronous, D-147 item 2).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-7 · THE SEED IS THE ROUND TRIP — a saver\'s image seeds a fresh store that reads the exporting store\'s state (D-137 item 4; D-135 item 1)', (t) => {
  const exported = [];
  const exporter = storeOf({
    saveCall: (image) => {
      exported.push(image);
      return { success: true, message: [] };
    },
  });

  const landed = captured(() => exporter.write(['a'], 'file', { a: 1 }));
  assert.equal(landed.ok, true,
    'the exporting store\'s file-tier write must stand: the call threw ' + String(statusOf(landed)));
  assert.equal(exported.length, 1,
    '**THE EXPORT MUST HAVE HAPPENED** — one passing write, one image handed to the saver (D-133 item 3): calls = '
      + String(exported.length));
  const image = exported[0];
  assert.equal(typeof image, 'string',
    'the exported artefact must be image text: read ' + String(typeof image));

  // THE EXPORTING STORE'S OWN ANSWER — the shape the seeded store is compared against.
  const exporterRead = captured(() => exporter.read(['a']));
  assert.equal(exporterRead.ok, true,
    'the exporter must read its own value back: the read threw ' + String(statusOf(exporterRead)));
  assert.deepEqual(exporterRead.value, { a: 1 },
    'the exporting store holds the caller\'s object: read ' + JSON.stringify(exporterRead.value));
  t.diagnostic('SS-7 · the exported image = ' + JSON.stringify(image) + ' (' + String(image.length) + ' bytes)');

  // ── THE FRESH STORE, SEEDED AND WITHOUT A SAVER. ──────────────────────────────────────────────────────────
  const seeded = captured(() => storeOf({ initialImage: image }));
  assert.equal(seeded.ok, true,
    '**A STORE BUILT FROM THE STORE\'S OWN IMAGE MUST CONSTRUCT** (D-147 item 1 puts the seed in domain everywhere): '
      + 'the call threw ' + String(statusOf(seeded)));
  assert.equal(isThenable(seeded.value), false,
    '**THE SEEDED CONSTRUCTION MUST ANSWER AN INSTANCE AND NEVER A THENABLE** — a seed is not an act and fires no '
      + 'save, so nothing suspends (D-147 item 2): thenable = ' + String(isThenable(seeded.value)));
  assert.equal(typeof seeded.value.read, 'function',
    'and the answer must be a real instance: read ' + String(typeof seeded.value.read));

  const seededRead = captured(() => seeded.value.read(['a']));
  assert.equal(seededRead.ok, true,
    '**THE SEEDED STORE MUST READ THE SEEDED STATE** — the round trip the whole request was for (D-137 item 4; D-135 '
      + 'item 1): the read threw ' + String(statusOf(seededRead)));
  assert.deepEqual(seededRead.value, { a: 1 },
    '**THE SEEDED VALUE IS THE EXPORTING STORE\'S STATE**, byte for byte in the caller\'s own shape: read '
      + JSON.stringify(seededRead.value));
  assert.deepEqual(seededRead.value, exporterRead.value,
    'and it is the SAME shape the exporting store held, read through the same verb: exporter = '
      + JSON.stringify(exporterRead.value) + '; seeded = ' + JSON.stringify(seededRead.value));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 8 OF 12 · SS-8 — A SEEDED STORE OWES NO SAVE, AND ITS CONSTRUCTION STAYS SYNCHRONOUS.
//
// THE RULING: D-147 item 2, verbatim in its substance — "No immediate save". The eligibility is an act's DEPARTURE
// and a seed is not an act, so a seeded construction fires no saveCall; the consequences the row declares are that
// the mark has no subject and that the construction stays synchronous, which keeps the synchronous-commit law whole.
//
// THE OBSERVABLE: a store constructed with BOTH keys — the seed and a saver that counts its calls — leaves the count
// at ZERO after construction AND after one loop turn of the event loop (so no save was merely deferred), and its
// answer is an INSTANCE, never a thenable. The seed is nevertheless installed: the store reads the seeded value, so
// the zero count is the seed's silence and not a seed that failed to land.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-8 · A SEEDED STORE OWES NO SAVE — the count is zero and the construction answers an instance (D-147 item 2)', async (t) => {
  // THE IMAGE IS THE STORE'S OWN, taken from a saver rather than written down here, so the seed's premise cannot be
  // a text this file invented.
  const exported = [];
  const source = storeOf({
    saveCall: (image) => {
      exported.push(image);
      return { success: true, message: [] };
    },
  });
  const landed = captured(() => source.write(['a'], 'file', 1));
  assert.equal(landed.ok, true,
    'the source store\'s write must stand, or the seed below has no store text to carry: the call threw '
      + String(statusOf(landed)));
  assert.equal(exported.length, 1,
    'the source store must have exported exactly one image: calls = ' + String(exported.length));
  const image = exported[0];

  // ── THE SEEDED CONSTRUCTION, WITH A COUNTING SAVER. ───────────────────────────────────────────────────────
  const calls = { count: 0 };
  const built = captured(() => storeOf({
    initialImage: image,
    saveCall: () => {
      calls.count += 1;
      return { success: true, message: [] };
    },
  }));
  assert.equal(built.ok, true,
    '**A SEEDED STORE WITH A SAVER MUST CONSTRUCT** — the pair is in domain (D-145 item 4; D-147 item 1): the call '
      + 'threw ' + String(statusOf(built)));
  assert.equal(calls.count, 0,
    '**A SEEDED CONSTRUCTION MUST FIRE NO SAVE** (D-147 item 2: no immediate save): calls = ' + String(calls.count));
  assert.equal(isThenable(built.value), false,
    '**THE CONSTRUCTION\'S OWN ANSWER MUST BE AN INSTANCE, NEVER A THENABLE** — the seed suspends nothing and starts '
      + 'no save: thenable = ' + String(isThenable(built.value)));
  assert.equal(typeof built.value.write, 'function',
    'and the answer must be a real instance, carrying the product\'s write verb: read '
      + String(typeof built.value.write));

  // ── NO SAVE WAS MERELY DEFERRED. ──────────────────────────────────────────────────────────────────────────
  await drain();
  assert.equal(calls.count, 0,
    '**NO SAVE MAY ARRIVE ONE LOOP TURN LATER EITHER** — the construction starts no save at all, so the count is a '
      + 'count and not a race: calls = ' + String(calls.count));

  // ── AND THE SEED LANDED: THE ZERO IS THE SEED\'S SILENCE, NOT ITS FAILURE. ────────────────────────────────
  const seededRead = captured(() => built.value.read(['a']));
  assert.equal(seededRead.ok, true,
    '**THE SEED MUST BE INSTALLED** — otherwise the cell is reading the silence of a store that holds nothing: the '
      + 'read threw ' + String(statusOf(seededRead)));
  assert.equal(seededRead.value, 1,
    'the seeded value must be the source store\'s own: read ' + JSON.stringify(seededRead.value));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 9 OF 12 · SS-9 — AN UNREADABLE SEED IS RANK 22, AND NOTHING OF IT IS LEFT BEHIND.
//
// THE RULINGS: D-135 item 3 (an image the loader cannot accept is rank 22 FileImageRefused: the seed's failure arm
// mints no member and opens no rank question) · D-137 item 4 (decoded by the store's own tail: json decode filtered
// by the admission test) · D-147 item 1 (the seed is in domain on every arm, so the refusal is the IMAGE's and not
// the arm's).
//
// THE OBSERVABLE: three texts the store's own decode refuses — prose, a JSON array, and the JSON null — each make the
// construction THROW FileImageRefused, each answer no instance (the thrown form carries no store member and an empty
// log, so no attempt is open and nothing was installed), and the same refusal taken WITH a filePath leaves NO SEED
// BYTE at the path.
//
// THE MEASURED RESIDUAL THIS CELL PINS RATHER THAN PRETENDS. The store's own construction performs its file-tier
// entry probe (an exclusive create at an absent path) BEFORE the seed is decoded, so at this tree a 0-byte file
// stands at the path after the refusal — the probe's artefact and not the seed's. The cell therefore asserts the
// observable that can hold — the path holds NO TEXT AT ALL, neither the seed nor an image — and PRINTS which of the
// two shapes the tree takes. A cell asserting literal absence would be pinning the probe's behaviour to reach a
// conclusion the ruling does not actually require, and the rank-22 refusal's own claim is that nothing of the seed
// was installed.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-9 · AN UNREADABLE SEED IS RANK 22 — FileImageRefused, no instance, nothing of the seed left behind (D-135 item 3)', (t) => {
  const outside = ['not an image', '[1,2]', 'null'];
  const sentences = [];

  for (const bad of outside) {
    const refused = captured(() => storeOf({ initialImage: bad }));
    assert.equal(refused.ok, false,
      '**AN IMAGE THE STORE CANNOT READ MUST BE REFUSED** (D-135 item 3): the text ' + JSON.stringify(bad)
        + ' constructed a store');
    assert.equal(statusOf(refused), 'FileImageRefused',
      '**THE SEAT IS RANK 22 FileImageRefused** — the seed\'s failure arm mints no member (D-135 item 3): for '
        + JSON.stringify(bad) + ' read ' + String(statusOf(refused)));
    const form = formOf(refused);
    assert.equal(form !== null, true,
      'the refusal must be the surface\'s one plain-object form: read ' + String(typeof refused.caught));
    assert.deepEqual(form.log, [],
      'no attempt was open and no instance exists, so the refusal carries an empty log: for ' + JSON.stringify(bad)
        + ' read ' + JSON.stringify(form.log));
    assert.equal(typeof form.read, 'undefined',
      '**NO INSTANCE MAY BE ANSWERED** — the thrown value carries no store member: read ' + String(typeof form.read));
    sentences.push(form.message);
  }

  // ── THE SAME REFUSAL WITH A PATH: NOTHING OF THE SEED IS WRITTEN. ─────────────────────────────────────────
  const path = at('ss9-unreadable-seed.image.json');
  sweep([path]);
  try {
    const refused = captured(() => storeOf({ filePath: path, initialImage: 'not an image' }));
    assert.equal(refused.ok, false,
      'the seeded construction over a filePath must be refused too — the seed is in domain on every arm and the '
        + 'IMAGE is what failed (D-147 item 1; D-135 item 3)');
    assert.equal(statusOf(refused), 'FileImageRefused',
      '**THE SEAT MUST BE UNMOVED BY THE PATH** (D-135 item 3): read ' + String(statusOf(refused)));
    const form = formOf(refused);
    assert.deepEqual(form.log, [],
      'the refusal before any seed byte is installed carries an empty log: read ' + JSON.stringify(form.log));

    const bytes = bytesAt(path);
    t.diagnostic('SS-9 · the path after the refusal: a file stands = ' + String(bytes !== null)
      + '; its text = ' + JSON.stringify(bytes)
      + '; the refusal\'s message = ' + JSON.stringify(form.message));
    assert.equal(bytes === null || bytes === '', true,
      '**NO SEED BYTE AND NO IMAGE MAY STAND AT THE PATH** — the store refused at rank 22, so neither the caller\'s '
        + 'text nor an image of it was written: read '
        + (bytes === null ? 'no file at all' : JSON.stringify(bytes)));
  } finally {
    sweep([path]);
  }

  t.diagnostic('SS-9 · the three refusals\' messages (printed, not asserted) = ' + JSON.stringify(sentences));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 10 OF 12 · SS-10 — AN EMPTY OR NON-STRING SEED IS BROKEN CONFIG, AND ABSENCE IS THE ONLY NO-SEED.
//
// THE RULING: D-147 item 4, verbatim in its substance — "Refuse empty string - intentional emptiness is excluding
// param entirely, accepting empty string is an overwrite risk". So the EMPTY STRING is cfg's outside form, refused at
// the class gate under AddressMalformed, and it is refused RATHER THAN READ AS ABSENCE; a non-string seed is the same
// gate; and a PRESENT undefined is the key's own outside form, because membership is Object.hasOwn and never
// truthiness.
//
// THE OBSERVABLE: '', 5, null and a present undefined each make storeCreate THROW AddressMalformed with an empty log,
// the sentence naming the key, and no instance answered; and the CONTROL — the same cfg with the key OMITTED —
// constructs an instance. That pair is the ruling's whole content: absence means no seed, and every other spelling of
// "no seed" is a caller that computed a value instead of omitting one.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-10 · AN EMPTY OR NON-STRING SEED IS BROKEN CONFIG — AddressMalformed, and absence is the only no-seed (D-147 item 4)', (t) => {
  const outside = ['', 5, null, undefined];
  const sentences = [];

  for (const bad of outside) {
    const refused = captured(() => storeOf({ initialImage: bad }));
    assert.equal(refused.ok, false,
      '**EVERY OUTSIDE FORM OF initialImage MUST BE REFUSED** (D-147 item 4): the value ' + JSON.stringify(bad)
        + ' constructed a store');
    assert.equal(statusOf(refused), 'AddressMalformed',
      '**THE STATUS IS THE ONE A BAD cfg ALREADY ANSWERS**, on the precedent the tree sets for a neighbouring key '
        + '(D-147 item 4): for ' + JSON.stringify(bad) + ' read ' + String(statusOf(refused)));
    const form = formOf(refused);
    assert.equal(form !== null, true,
      'the refusal must be the surface\'s one plain-object form: read ' + String(typeof refused.caught));
    assert.deepEqual(form.log, [],
      'the refusal carries an empty log: for ' + JSON.stringify(bad) + ' read ' + JSON.stringify(form.log));
    assert.equal(form.message.includes('initialImage'), true,
      'the generated sentence must name the key: for ' + JSON.stringify(bad) + ' read '
        + JSON.stringify(form.message));
    assert.equal(typeof form.write, 'undefined',
      '**NO INSTANCE MAY BE ANSWERED** — the thrown value carries no store member: read '
        + String(typeof form.write));
    sentences.push(form.message);
  }

  // ── THE EMPTY STRING IS REFUSED RATHER THAN READ AS ABSENCE. ──────────────────────────────────────────────
  const empty = captured(() => storeOf({ initialImage: '' }));
  assert.equal(empty.ok, false,
    '**AN EMPTY STRING MUST NOT BE READ AS ABSENCE** — a caller that computed a value instead of omitting one is '
      + 'told so, because accepting it is an overwrite risk (D-147 item 4): the store constructed');

  // ── THE CONTROL: THE KEY OMITTED CONSTRUCTS. ─────────────────────────────────────────────────────────────
  const control = captured(() => storeOf());
  assert.equal(control.ok, true,
    '**THE SAME cfg WITH THE KEY OMITTED MUST CONSTRUCT** — absence alone means no seed, and it is lawful: the call '
      + 'threw ' + String(statusOf(control)));
  assert.equal(typeof control.value.write, 'function',
    'and the control must be a real instance: read ' + String(typeof control.value.write));

  t.diagnostic('SS-10 · the four refusals\' messages (printed, not asserted) = ' + JSON.stringify(sentences));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 11 OF 12 · SS-11 — THE SEED STANDS INSIDE THE BORN FLOOR: A ROLLBACK CANNOT REACH BEHIND IT.
//
// THE RULINGS: D-147 item 1 of its settled and the design's own install order — the register's tier is fixed before
// the seed, the seed is decoded and installed at file tier BEFORE the store's born floor is taken, and the born floor
// is the replay's floor and the regeneration's construction image. So the seeded state is not an ACT of the store:
// no journal op carries it, and no rollback reaches behind it.
//
// THE OBSERVABLE, AND IT IS WHAT "INSIDE THE BORN FLOOR" MEANS OBSERVABLY: a store is seeded, a value is written at
// the SAME address at mem tier so the act SHADOWS the seeded version (the read answers the written value, which is
// the proof the act moved the state and is not a no-op), and then that op is rolled back through the store's own
// rollback verb. After the rollback the read must answer THE SEEDED STATE again: the rollback undid the act and
// stopped at the floor the seed had already been installed beneath.
//
// THIS DOCBLOCK REPORTS THE READING. Measured at this tree, the seeded value STANDS after the rollback and the
// rollback's own record names the op it undid; the cell asserts that reading. Had the rollback removed the seeded
// value, the assertion at the foot of this cell would be the finding and the cell would report it as such rather
// than pass.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-11 · THE SEED IS INSIDE THE BORN FLOOR — a rollback of a later op leaves the seeded state standing (D-147 item 1 of its settled)', (t) => {
  // THE IMAGE IS THE STORE'S OWN, taken from a saver, so the seeded state is a state a store really composed.
  const exported = [];
  const source = storeOf({
    saveCall: (image) => {
      exported.push(image);
      return { success: true, message: [] };
    },
  });
  const landed = captured(() => source.write(['a'], 'file', { a: 1 }));
  assert.equal(landed.ok, true,
    'the source store\'s write must stand, or this cell seeds nothing: the call threw ' + String(statusOf(landed)));
  const image = exported[0];
  assert.equal(typeof image, 'string',
    'the source store must have exported image text: read ' + String(typeof image));

  const seeded = captured(() => storeOf({ initialImage: image }));
  assert.equal(seeded.ok, true,
    '**THE SEEDED STORE MUST CONSTRUCT** (D-147 item 1): the call threw ' + String(statusOf(seeded)));
  const store = seeded.value;
  const seedRead = captured(() => store.read(['a']));
  assert.equal(seedRead.ok, true,
    '**THE SEEDED STATE MUST STAND AT CONSTRUCTION** — the cell\'s floor is this reading: the read threw '
      + String(statusOf(seedRead)));
  assert.deepEqual(seedRead.value, { a: 1 },
    'the seeded value is the source store\'s own: read ' + JSON.stringify(seedRead.value));

  // ── THE ACT: A mem-TIER WRITE THAT SHADOWS THE SEEDED VERSION AT THE SAME ADDRESS. ────────────────────────
  const written = captured(() => store.write(['a'], 'mem', 2));
  assert.equal(written.ok, true,
    '**THE LATER ACT MUST LAND** — a cell that could not write has no op to roll back: the call threw '
      + String(statusOf(written)));
  const opId = written.value !== null && typeof written.value === 'object'
    && written.value.op !== null && typeof written.value.op === 'object'
    ? written.value.op.opId
    : null;
  assert.equal(typeof opId, 'string',
    '**THE ACT\'S OPERATION ID MUST BE A STRING THE CALLER CAN HAND BACK** (the rollback verb takes exactly one): '
      + 'read ' + JSON.stringify(opId));
  t.diagnostic('SS-11 · the op\'s own reading: id = ' + JSON.stringify(opId) + ', tier = '
    + JSON.stringify(written.value.op.tier) + ', kind = ' + JSON.stringify(written.value.op.kind));
  assert.equal(written.value.op.tier, 'mem',
    'the act is a mem-tier write, so the seeded file-tier version is SHADOWED and not replaced: read '
      + JSON.stringify(written.value.op.tier));
  const shadowed = captured(() => store.read(['a']));
  assert.equal(shadowed.ok, true,
    'the store must read after the act: the read threw ' + String(statusOf(shadowed)));
  assert.equal(shadowed.value, 2,
    '**THE WRITTEN VALUE MUST SHADOW THE SEEDED ONE** — otherwise the rollback below has nothing to undo and the '
      + 'cell would pass vacuously: read ' + JSON.stringify(shadowed.value));

  // ── THE ROLLBACK OF THAT OP. ──────────────────────────────────────────────────────────────────────────────
  const reversal = captured(() => store.rollback(opId));
  assert.equal(reversal.ok, true,
    '**THE OP MUST BE REVERSIBLE THROUGH THE STORE\'S OWN VERB** — the born floor is behind it, not in the way: the '
      + 'rollback threw ' + String(statusOf(reversal)));
  const reversalRecord = reversal.value;
  assert.equal(reversalRecord !== null && typeof reversalRecord === 'object', true,
    'the rollback must answer its record: read '
      + String(reversalRecord === null ? 'null' : typeof reversalRecord));
  t.diagnostic('SS-11 · the rollback\'s record = ' + JSON.stringify(reversalRecord));
  assert.deepEqual(asSet(reversalRecord.undoneOps), [opId],
    'the reversal must name the one op it undid: read ' + JSON.stringify(reversalRecord.undoneOps));

  // ── AND THE FLOOR: THE SEEDED STATE STANDS. ──────────────────────────────────────────────────────────────
  const after = captured(() => store.read(['a']));
  assert.equal(after.ok, true,
    '**THE SEEDED STATE MUST STAND AFTER THE ROLLBACK** — the seed is inside the born floor, so no rollback reaches '
      + 'behind it (the design\'s install order, D-147 item 1 of its settled): the read threw '
      + String(statusOf(after)) + '; the rollback\'s record = ' + JSON.stringify(reversalRecord));
  assert.deepEqual(after.value, { a: 1 },
    '**THE ROLLBACK MUST HAVE UNDONE THE ACT AND STOPPED AT THE SEEDED VERSION** — the observable of "inside the '
      + 'born floor": read ' + JSON.stringify(after.value));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// CELL 12 OF 12 · SS-12 — THE SAVE PRECEDES THE DELIVERED SET ON BOTH ARMS.
//
// THE CLAUSE: surface.md section 2.11 clause 2 — on the passing arm the terminal arm performs the save FIRST, before
// any body of the delivered set, and the saved artefact's own bytes are declared durable before any body runs. The
// package's save is the saver's call where the caller supplied one (D-133 item 3), so the clause's observable for
// this unit is: **no listener body at the written address may run before the saver has been called.**
//
// THE DECLARED ORDER, AND THE ONLY ORDER ASSERTED ANYWHERE IN THIS FILE. The mark is a counter read INSIDE the body —
// the drive's own saver increments it and the body appends the number it sees — so the assertion is about what the
// body OBSERVED and never about when anything ran. ARM (a): a synchronous saver; the body must observe 1. ARM (b): an
// awaited saver, held open by a gate this drive owns; while the save is unsettled the body must not have fired AT
// ALL, and once the drive opens the gate the body must observe 1. No timer is armed and no duration is measured.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

test('SS-12 · THE SAVE PRECEDES THE DELIVERED SET ON BOTH ARMS — the body observes the saver\'s call (surface.md section 2.11 clause 2)', async (t) => {
  // ── ARM (a): A SYNCHRONOUS SAVER. ────────────────────────────────────────────────────────────────────────
  const callsA = { count: 0 };
  const observedA = [];
  const storeA = storeOf({
    saveCall: () => {
      callsA.count += 1;
      return { success: true, message: [] };
    },
  });
  storeA.listen('ss12a', [['ss12a-key']]);
  storeA.register('ss12a', () => { observedA.push(callsA.count); });

  const answerA = captured(() => storeA.write(['ss12a-key'], 'file', 1));
  assert.equal(answerA.ok, true,
    'arm (a): the write must stand, or no body was delivered to be ordered: the call threw '
      + String(statusOf(answerA)));
  assert.equal(isThenable(answerA.value), false,
    'arm (a): a saver that answered in its own frame hands back a RECORD — the synchronous arm is the premise: '
      + 'thenable = ' + String(isThenable(answerA.value)));
  assert.equal(callsA.count, 1,
    'arm (a): **THE SAVER MUST HAVE BEEN CALLED BY THE ACT**: calls = ' + String(callsA.count));
  t.diagnostic('SS-12 · arm (a): the body observed calls = ' + JSON.stringify(observedA)
    + '; the saver\'s final count = ' + String(callsA.count));
  assert.equal(observedA.length, 1,
    '**THE LISTENER BODY AT THE WRITTEN ADDRESS MUST HAVE RUN** — otherwise nothing was ordered: observed = '
      + JSON.stringify(observedA));
  assert.equal(observedA[0], 1,
    '**THE BODY MUST OBSERVE THAT THE SAVER HAD ALREADY BEEN CALLED** — the save precedes the delivered set '
      + '(surface.md section 2.11 clause 2): the body observed ' + JSON.stringify(observedA[0]));

  // ── ARM (b): AN AWAITED SAVER, HELD BY A GATE THIS DRIVE OWNS. ───────────────────────────────────────────
  const latch = latchOf();
  const callsB = { count: 0 };
  const observedB = [];
  const storeB = storeOf({
    saveCall: () => {
      callsB.count += 1;
      return latch.promise.then(() => ({ success: true, message: [] }));
    },
  });
  storeB.listen('ss12b', [['ss12b-key']]);
  storeB.register('ss12b', () => { observedB.push(callsB.count); });

  const answerB = captured(() => storeB.write(['ss12b-key'], 'file', 1));
  assert.equal(answerB.ok, true,
    'arm (b): the write must stand and hand back the awaited save\'s thenable: the call threw '
      + String(statusOf(answerB)));
  assert.equal(isThenable(answerB.value), true,
    'arm (b): **THE ANSWER MUST BE A THENABLE** — the saver\'s answer was awaited, and that is the arm: thenable = '
      + String(isThenable(answerB.value)));
  assert.equal(callsB.count, 1,
    'arm (b): **THE SAVER MUST HAVE BEEN CALLED** while its answer is still unsettled: calls = ' + String(callsB.count));
  assert.equal(observedB.length, 0,
    '**NO BODY MAY HAVE RUN WHILE THE SAVE IS UNSETTLED** — the save precedes the delivered set on this arm too, '
      + 'and the settle starts the delivery only at its own tail (D-153 item 2): observed = '
      + JSON.stringify(observedB));

  latch.open();
  await answerB.value;
  t.diagnostic('SS-12 · arm (b): the body observed calls = ' + JSON.stringify(observedB)
    + '; the saver\'s final count = ' + String(callsB.count));
  assert.equal(observedB.length, 1,
    '**THE LISTENER BODY MUST HAVE RUN AFTER THE GATE OPENED** — otherwise the order was never stood in: observed = '
      + JSON.stringify(observedB));
  assert.equal(observedB[0], 1,
    '**THE BODY MUST OBSERVE THAT THE SAVER HAD ALREADY BEEN CALLED** on the awaited arm as well: the body observed '
      + JSON.stringify(observedB[0]));
});
