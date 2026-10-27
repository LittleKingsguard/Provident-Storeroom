// RED SET — THE `RCA-9` FILE-TIER-SAVE AMENDMENT, DRIVEN FROM THE PACKAGE'S OWN BOUNDARY.
//
// The change request is `docs/specs/storeroom-native-proposal-review.md §18.1`, ruled at `§19`–`§22`, and
// its plan region is `docs/specs/storeroom-native/implementation-plan.md §10`, whose TYPED PROPERTY
// REGISTER is `§10.9` (`8` rows: `P-IM-1` · `P-IM-2` · `P-SM-3` · `P-SM-4` · `P-SM-5` · `P-TP-6` · `P-TP-7` ·
// `P-TP-8`). EVERY DRIVE BELOW IS DERIVED FROM THE SPEC TEXT ALONE; every test group is NAMED BY ITS
// REGISTER ROW'S OWN STRATEGY ID.
//
// THE CLAUSES, AND WHAT EACH IS READ FOR:
//   · `storeroom-js/surface.md §2.11` CLAUSE 1 — the lift's scope: the `file` tier, the TERMINAL ARM and the
//     PASSING ARM alone; five named cells do NOT move.
//   · CLAUSE 2 — the act: on the passing arm, for a record whose own `op` carries a `file`-tier write, the
//     terminal arm performs the store's `commit_file` FIRST, before any body of the delivered set.
//   · CLAUSE 3 — the ordering law: (i) no body before the pass; (ii) no body before the save on the passing
//     arm — *"a body that observed the file's bytes and read the PRE-SAVE image is a FAILURE"*.
//   · CLAUSE 4 — the durability boundary: (i) a failing pass leaves the last passing image BYTE-IDENTICAL;
//     (ii) a passing pass's image is durable before any listener body, read from a FRESH instance.
//   · CLAUSE 5 — the refusal: the save IS a constraint, EVALUATED LAST; `ok === false`, the entry is a `KC`
//     token; the STORE rolls the write back and the CALL answers a message — ROLLBACK FIRST, MESSAGE SECOND.
//   · CLAUSE 6 — the join: a repair IS RETURNED BY the constraint that triggered it and IS PASSED THE COMMIT
//     IT IS PART OF, so its own write joins THAT commit as a NEW ENTRY (the op set grows by exactly one per
//     repair write), and no repair write opens a second commit.
//   · `storeroom-native/contract.md §7.2` ITEM 1 (amended 2026-10-15) — `Store::write` records, installs,
//     appends and RETURNS ITS `WriteResult` ON EVERY TIER and PERFORMS NO FILE I/O ON ANY OF ITS ARMS.
//   · `§7.2` ITEM 2 — the atomicity: a failed commit leaves the file's prior bytes INTACT (sibling + rename).
//   · `§8.1` #15 `FileCommitFailed` / #16 `ConstraintListInvalid`, and `§8.2` — the code, its trigger and its
//     generated message (`§8.2`'s worked example of the new member is reproduced by its own drive).
//   · `storeroom-js/parameter-semantics.md §2.20` — `commit`, write's FIFTH argument: domain, every outside
//     value and its answer; `§2.21` — `cfg.constraints`, the construction's FOURTH declared key.
//   · `storeroom-js/surface.md §2.2`'s dated clause of 2026-10-15 — the declared order
//     `write(instance, address, tier, value, commit?)`, `4` required + the optional one LAST — READ WITH ITS
//     CLAUSE 4 OF THE SAME DATE, which permits the package's ONE arity reading: THE CALL'S ARGUMENT COUNT FOR
//     THE FIFTH POSITION AND FOR NO OTHER POSITION. Clause 3's "THE PACKAGE PERFORMS NO ARITY CHECK OF ITS
//     OWN" stands byte-for-byte and is read THROUGH clause 4; `DD-46` is superseded at that one position.
//   · `storeroom-js/surface.md §2.4` item 9 (g) — the class test: an object position is a record position only
//     where it CARRIES A `pending` MEMBER whose value is present and not `undefined`.
//   · `storeroom-constraints/kernel-surface.md §1` item 4 / `§2.1` item 2 — `CommitRecord`, the FOUR-member
//     record the seam receives; `§2.3` items 1–2 — the constraint's three-arm outcome, the repair's context
//     and the repair's refusal (its `status` is NEVER a store member: `KC-4`).
//   · `storeroom-native/write-and-read.md §3.1` — `write(address, tier, value, commit?)`.
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// STATES ENUMERATED BEFORE THE DRIVES WERE AUTHORED (one drive per state unless a line says otherwise)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// ORDERING (`S-ORDER-SAVE`): a constraint body and a listener body at ONE address · two constraints and one
//   listener (no body while a constraint stands owed) · two listeners of one delivered set (the save
//   precedes EVERY body and not the first only).
// DURABILITY (`S-DURABLE-IMAGE`): the failing arm against a STANDING prior passing image · the passing arm
//   read from inside the first listener body AND from a fresh instance over an equal `cfg.filePath`.
// THE ARM TABLE (`S-ARM-SAVE`): (`file`, passing) · (`file`, failing) · (`mem`, passing) · (`temp`, passing) ·
//   (`mem`, failing) · (`temp`, failing) · a record whose own op is not a `file`-tier write's · the
//   modification state at three instants of ONE record (the verb's return, the terminal arm, a later read).
// REFUSAL (`S-REFUSAL`): a `file`-tier write whose terminal-arm commit is made to fail (the parent
//   directory removed between the construction and the write) · the rollback's observable · the answered
//   code and message · the absence of any repair return · a repair registered for the same address that the
//   save's own unrepairable violation must NOT reach.
// JOIN (`S-JOIN`): a repair returned by its constraint, driven through it with the record the caller holds ·
//   a repair whose own write is refused by the store (the repair's refusal arm, `KC-4`).
// THE FOURTH KEY (`S-CONSTRAINTS-KEY`): ABSENT · `[]` · one valid pair · two valid pairs · `null` ·
//   `undefined` · a non-array (number, string, boolean, object, function) · an array carrying an element
//   that is not a pair · a pair whose `address` lies outside the segment array · a pair whose `id` is absent
//   or not a string · the `§8.2` worked example, whose message is printed · the load-side instant (its
//   pass arm driven; its FAIL arm NOT DERIVABLE — see the `skip` and this file's finding block).
// THE FIFTH ARGUMENT (`S-ARG5`): the declared position read off the published typed signature · ABSENT (in
//   domain) · `null` · a non-object scalar (number, string, bigint, boolean, symbol) · a function · a Proxy
//   value carrying no `pending` member · `{}` and an object whose `pending` is absent or `undefined` · an
//   array · an ADOPTED record position (admitted, its write proceeding) · ABSENT AT POSITION `5` (in domain,
//   the write proceeding and opening or joining its commit) · `undefined` SUPPLIED AT POSITION `5` (REFUSED
//   by the arity gate) · and the PAIR of those two call shapes read as ONE discriminator (the refusal is
//   attributable to the argument COUNT and to no class test of the supplied value).
// CENSUS (`S-CENSUS`): the closed set's `16` members and the algebra's terms · the reachability of #16 ·
//   the non-widening of #1/#5/#14's own triggers · the construction's `4` keys with no fifth admitted ·
//   the store's namespace at `8`, the instance's member set at `4`, `PAR-JS` at `21`.
//
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// FINDINGS THIS FILE COULD NOT DERIVE FROM THE SPEC (each is reported to the supervisor, none is invented)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// F1. THE PERSISTED FORM OF `cfg.constraints`. `parameter-semantics.md §2.21` says the list is validated
//     "at CREATE and at LOAD" and `contract.md §8.1` #16 names the load-side failure, but NO CLAUSE declares
//     the shape the list takes inside the file at `cfg.filePath`, nor where in the image it stands. A drive
//     therefore cannot construct a file whose persisted list FAILS validation; the load-side FAIL arm is
//     `skip`ped with that reason, and its PASS arm is driven.
// F2. `undefined` AT THE FIFTH POSITION — CLOSED 2026-10-15, AND THE SKIP WITHDRAWN. The ground this finding
//     stated is SUPERSEDED, not reconciled: `surface.md §2.2` gains CLAUSE 4 of 2026-10-15, which permits the
//     package to read the CALL'S ARGUMENT COUNT for position `5` and for that position alone, so clause 3's
//     "THE PACKAGE PERFORMS NO ARITY CHECK OF ITS OWN" is read THROUGH it; `contract.md §0.2`'s `DD-46` is
//     superseded at that one position; and `parameter-semantics.md §2.20`'s outside-value cell is RE-SPELLED
//     so that ABSENT at position `5` is IN DOMAIN while `undefined` SUPPLIED at position `5` is REFUSED —
//     *"ITS GROUND IS THE ARITY GATE … AND NOT THE CLASS TEST"* (§2.20's own words). The two cells are driven
//     below as the pair the law now separates, and the attribution to the GATE rather than to a class test of
//     the supplied value is driven at `fts_S_ARG5_the_refusal_is_the_arity_gates_by_the_count_alone`.
// F3. THE FAILED SAVE'S `§`-CITATION. `surface.md §2.11` clause 5 cites `contract.md §8.1` **#16** for the
//     message "its code carries", while #16's own trigger column is exclusive to the CONSTRAINT LIST's
//     validation and the complement block declares *"a `file`-TIER WRITE'S COMMIT FAILURE ... answers
//     `FileCommitFailed`"* (#15). The drive asserts #15 (the operative ruling, `§20.4` `F-3`) and the
//     divergence is reported.
// F4. THE `S-CENSUS` `PAR-JS` FIGURE. `implementation-plan.md §10.9` row 8 prints `20` (`15+1+1+1+1+1`) while
//     `parameter-semantics.md §1` re-derives `21` (`…+1`, the two rows `§2.20` and `§2.21`) and
//     `surface.md §2.4` item 9 (g) item 3 reads the OPERATIVE count as `21`. The drive asserts `21`.
// F5. A PROXY CARRYING A `pending` MEMBER. `§2.20` lists "a `Proxy` value" among the outside values while
//     `§2.4` item 9 (g) item 1's class test refuses only on the `pending` member's presence. The drive uses
//     a Proxy that carries NO `pending` member, where both readings agree.
// F6. ABSENT `cfg.filePath`. `contract.md §7.1`'s table answers an ABSENT `filePath` with
//     `ConstructionArgumentMissing` (#12), while `kernel-surface.md §1` item 1's fixture clause reads
//     "`filePath` alone is optional". No drive here rests on that cell: the census drive reads #1 off a
//     PRESENT out-of-domain value instead, where the two homes agree.

import test from 'node:test';
import assert from 'node:assert/strict';
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { storeCreate } from '../../bindings/js/index.mjs';

/**
 * **⟶ THE LISTENER SPELLING, ADDED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY`
 * legacy tail). `listen(address)` MOVES TO `listen(handle, addresses)`, ARITY `1 → 2`, AND IT ANSWERS
 * `undefined`** (`contract.md §2.2` items 1 and 10; `listen-verb.md §1` item 1; `PAR-HL-3`). **THE AS-FILED
 * `(register(listen(addr), fn) || listen(addr))` IDIOM DEPENDED ON THE RETURN THE MINT RULING REMOVED** — it
 * took the handle `listen` answered, registered at it, and fell back to a second `listen` when the first
 * answered a falsy value. **Under the new declaration the handle is SPELLED by the caller, so the idiom is
 * replaced by the two acts it always meant: a `listen` that creates the RESERVED entry (`listen-verb.md
 * §4` state `1`), then a `register` that ARMS it.** **NO ASSERTION IS WEAKENED** — every cell reads the same
 * handle, the same call list and the same store-side entry.
 */
let listenerSpellingSeq = 0;
function listenAndRegister(store, address, listener) {
  listenerSpellingSeq += 1;
  const handle = `listener@${JSON.stringify(address)}#${listenerSpellingSeq}`;
  store.listen(handle, [address]);
  store.register(handle, listener);
  return handle;
}
function carriesHandle(set, handle) {
  return set.some((element) => element !== null && typeof element === 'object' && element.handle === handle);
}
function setHandles(set) {
  return set.map((element) => (element === null || typeof element !== 'object' ? element : element.handle));
}


// **⟶ ADDED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause): the combined `on(address,
// listener)` is MERGED AWAY, so a home entry is minted by `listen(address)` and its function placed by
// `register(handle, listener)`. This file takes both acts at the sites that need them and passes this
// no-op body wherever the listener body's own firing is NOT the site's subject.**
const noop = () => {};

// ── THE ONE KERNEL HOME, LOADED DYNAMICALLY SO THE RED SET ENUMERATES BY TEST NAME
// (`kernel-surface.md §1` item 1 declares the checkout home `bindings/js/src/constraint-kernel.mjs` and the
// import spelling a red set at `bindings/js/test/**` uses; the dynamic form is the red set's own harness
// and not a fallback — nothing under `src/` is created or edited here).
let KERNEL = null;
async function kernel() {
  if (KERNEL === null) KERNEL = await import('../../bindings/js/src/constraint-kernel.mjs');
  return KERNEL;
}

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(HERE, '..', '..', 'bindings', 'js'); // `bindings/js`

let UID = 0;
function tag(label) {
  UID += 1;
  return `${label}-${process.pid.toString(36)}-${UID}`;
}

/** ONE FRESH DIRECTORY PER DRIVE: the `file` tier's external location, and nothing else shared. */
function freshDir() {
  return mkdtempSync(join(tmpdir(), 'fts-'));
}

/**
 * THE FIXTURE, AT THE CONSTRUCTION'S OWN DECLARED KEYS (`surface.md §2.1`'s `cfg` block, 2026-10-15):
 * `filePath` · `journalLength` · `listeners` · `constraints`, of which `filePath` and `constraints` alone
 * are optional. `constraints` is set ONLY where a drive names it, so the ABSENT form is the default and is
 * never confused with an empty list.
 */
function cfgFor(over = {}) {
  const d = over.dir !== undefined ? over.dir : freshDir();
  const cfg = {
    filePath: over.filePath !== undefined ? over.filePath : join(d, 'store.json'),
    journalLength: over.journalLength !== undefined ? over.journalLength : 8,
    listeners: over.listeners !== undefined ? over.listeners : [],
  };
  if ('constraints' in over) cfg.constraints = over.constraints;
  if (over.extra !== undefined) Object.assign(cfg, over.extra);
  return { dir: d, filePath: cfg.filePath, cfg };
}

function newStore(over = {}) {
  const f = cfgFor(over);
  f.store = storeCreate(f.cfg);
  return f;
}

/** THE FILE'S OWN BYTES AT `cfg.filePath` — the observable every durability clause is read off. */
function bytesOf(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : null;
}

/** THE MODIFICATION STATE, read as an identity triple so "a save performed twice" is a recorded fact. */
function modState(filePath) {
  const s = statSync(filePath);
  return { ino: s.ino, size: s.size, mtimeMs: s.mtimeMs };
}

/**
 * THE SINGLE FAILURE FORM (`surface.md §2.5`, its clause of 2026-10-16): exactly `{status, message, log}`,
 * thrown — **the THREE-MEMBER SET AT `§2.5` ITEM 4** (*"`log` IS PRESENT ON EVERY FAILURE THIS SURFACE
 * THROWS, AND `[]` IS ITS DECLARED VALUE WHERE THE FAILURE'S CAUSE HAS NO ATTEMPT AT ALL … the
 * three-member member set is therefore FLAT ACROSS ARMS and not conditional"*) **READ WITH `§2.5` ITEM 9**
 * (*"`log` stands on the thrown object as an ORDINARY OWN ENUMERABLE DATA MEMBER … so `Object.keys(caught)`
 * reads exactly `["log","message","status"]` and `Object.keys(caught).length` is `3` on EVERY arm"*).
 * **EVERY ARM THIS HELPER GUARDS IS A `log: []` ARM** — the construction's own `cfg`-side refusals and a
 * store refusal with no attempt live are `§2.5` item 4's OWN enumeration — so the empty array is asserted
 * as the DECLARED VALUE and never as an absence: `[]` is IN the domain (`parameter-semantics.md §2.26`'s
 * `domain` cell), and a non-array here is a FINDING at the site that produced it. **NOTHING THE AS-FILED
 * HELPER ASSERTED IS WEAKENED** — the code, the string message and its non-emptiness stand word for word;
 * only the member-set limb moves, from two members to three.
 */
function storeFailure(code, extra) {
  return (err) => {
    assert.ok(err !== null && typeof err === 'object', `${extra}: the store's failure is a thrown object`);
    assert.deepEqual(Object.keys(err).sort(), ['log', 'message', 'status'],
      `${extra}: the store's form carries exactly {log, message, status} — the three-member set is FLAT `
      + 'across arms and not conditional (`surface.md §2.5` item 4; item 9)');
    assert.equal(Object.keys(err).length, 3,
      `${extra}: and the member set's length is \`3\` on EVERY arm (\`surface.md §2.5\` item 9)`);
    assert.ok(Array.isArray(err.log),
      `${extra}: \`log\` is an ARRAY on every arm — never absent, never \`null\`, never a non-array `
      + '(`surface.md §2.5` item 9; `parameter-semantics.md §2.26`\'s `domain` cell)');
    assert.deepEqual(err.log, [],
      `${extra}: and it is \`[]\` — this arm's cause has NO ATTEMPT AT ALL (\`surface.md §2.5\` item 4's `
      + 'own enumeration of the empty-array state), never a placeholder entry and never `null`');
    assert.equal('log' in err, true,
      `${extra}: \`log\` is PRESENT as an own enumerable data member (\`surface.md §2.5\` item 9)`);
    assert.equal(err.status, code, `${extra}: the code is ${code}`);
    assert.equal(typeof err.message, 'string', `${extra}: the message is a string`);
    assert.ok(err.message.length > 0, `${extra}: the message is never empty`);
    assert.equal(err instanceof Error, false, `${extra}: no \`Error\` subclass (DD-12)`);
    return true;
  };
}

/**
 * THE CLASS TEST'S REFUSAL AT `write`'s FOURTH POSITION (`surface.md §2.4` item 9 (b) and (g) item 1;
 * `parameter-semantics.md §2.20`): an instance of ONE class — `TypeError` — whose `status` member MUST BE
 * ABSENT, and a STRING `message` member REQUIRED whose content is undeclared.
 *
 * **⟶ THE DOC BLOCK'S OWN *"FIFTH POSITION"* WAS THE SUPERSEDED SPELLING AND IS CORRECTED HERE, 2026-10-26:**
 * `write(address, tier, value, commit?)` has FOUR positions and `commit` is the FOURTH — *"the position the
 * `instance`-leading spelling made FIVE"* (`bindings/js/index.d.ts`, the `write` member's own clause; `A124`;
 * `A127`'s receiver rule). **AND THE MESSAGE'S CONTENT GAINS ITS ONE DECLARED OBLIGATION, BECAUSE IT IS A
 * SHIPPED DIAGNOSTIC AND IT NAMED THE WRONG POSITION:** the content is undeclared EXCEPT that **it names the
 * position the parameter actually occupies — the FOURTH — and never a position it does not occupy.** The
 * message a caller reads is the only thing that tells them where to look, so an ordinal there is an
 * observable and this helper asserts it.
 */
function positionRefusal(where) {
  return (err) => {
    assert.ok(err instanceof TypeError, `${where}: the refusal is an instance of TypeError and of nothing else`);
    assert.equal('status' in err, false, `${where}: the refusal's status member MUST BE ABSENT`);
    assert.equal(typeof err.message, 'string', `${where}: a string message member is REQUIRED`);
    assert.match(err.message, /\bfourth argument\b/,
      `${where}: the message names the position the commit OCCUPIES — \`commit\` is \`write\`'s FOURTH `
      + 'position (`bindings/js/index.d.ts`, the `write` member; `A127`), and a message naming any other '
      + `ordinal tells a caller to look at a position the parameter is not at. Message read: ${JSON.stringify(err.message)}`);
    assert.doesNotMatch(err.message, /\bfifth argument\b/,
      `${where}: and it does NOT name a fifth argument — the fifth was the MODULE-era spelling's count `
      + '(`write(instance, address, tier, value, commit?)`) and this surface has no such position');
    return true;
  };
}

/** THE INVOCATION ORDINAL A BODY RECORDS AS IT IS ENTERED — never a clock, never a duration. */
function ordinals() {
  const log = [];
  return { log, mark: (what, extra) => { log.push(Object.assign({ seq: log.length + 1, what }, extra)); } };
}

/**
 * **THE REGISTRATION-INSTANT SHIELD FOR THIS FILE, ADDED 2026-10-17** (`A135` (3);
 * `docs/specs/storeroom-native/contract.md §7.3` (b) state 1).
 *
 * EVERY `S-ORDER-SAVE` CELL BELOW MARKS ITS CONSTRAINT BODY'S OWN ORDINAL AND READS THE FILE'S BYTES AT THAT
 * INSTANT — *"the drive separates them by ORDINAL and never by timing"* (`§10.9` row 1). `A135` (3) ADDS ONE
 * INVOCATION OF EVERY CONSTRAINT BODY AT ITS REGISTRATION, AND AT THAT INSTANT NO SAVE HAS RUN AND NO
 * ATTEMPT EXISTS — so without this shield a second `'constraint'` ordinal, carrying a PRE-SAVE image, opens
 * every one of those lists. **THE CELL'S SUBJECT IS THE ORDER OF THE WRITE'S OWN ACTS; THE PREMISE MOVES AND
 * THE SUBJECT DOES NOT: the registration's invocation is answered here and the LANDING's reaches the cell's
 * own body unchanged.** The instant is told by the two members `kernel-surface.md §2.3` item 1's registration
 * clause spells `null` (`tier`, `op`), which no landing's context carries together.
 */
function atLandingOnly(record) {
  return (context) => {
    if (context !== null && typeof context === 'object'
      && context.tier === null && context.op === null) {
      return true; // STATE 1 — the registration stands and the pair is carried
    }
    return record(context);
  };
}

/**
 * **THE SAME SHIELD WHERE THE CELL'S BODY VIOLATES**: the registration is answered `true` so the pair is
 * CARRIED (state 1), and the body's own refusal reaches the LANDING alone. A body left unshielded here would
 * refuse its own registration (`§7.3` (b) state 2) and the write's refusal — the state the cell drives —
 * would never be reached.
 */
function refusesAtLandingOnly(record) {
  return atLandingOnly(record);
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §10.9 ROW 1 — `P-IM-1` · STRATEGY `S-ORDER-SAVE` — THE ORDERING INVARIANT
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_S_ORDER_SAVE_the_constraint_body_reads_the_pre_save_image_and_the_listener_the_post_save_one', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('s-order');
  const ord = ordinals();
  const seen = { constraint: undefined, listener: undefined };
  const before = bytesOf(f.filePath);

  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THE REGISTRATION RUNS THIS BODY ONCE, and at that instant
  // no save has run — so an unshielded `ord.mark('constraint')` would open the list this cell orders, and the
  // PRE-SAVE image it records belongs to the registration and not to the pass. `atLandingOnly` answers the
  // registration `true` (the pair is CARRIED, state 1) and hands the LANDING's context to this body, so the
  // cell's own subject — constraint, then save, then listener, by ORDINAL — is exactly as filed.
  register(f.store, [key], 'ord-c1', atLandingOnly(() => {
    ord.mark('constraint');
    seen.constraint = bytesOf(f.filePath);
    return true;
  }));
  (listenAndRegister(f.store, [key], () => {
    ord.mark('listener');
    seen.listener = bytesOf(f.filePath);
  }));

  const record = commit(f.store, [key], 'file', 'ordered');
  runAttempt(f.store, record);

  assert.deepEqual(ord.log.map((e) => e.what), ['constraint', 'listener'],
    'S-ORDER-SAVE: the recorded ordinals read constraint first, then the save, then the listener — the drive '
    + 'separates them by ORDINAL and never by timing (`§10.9` row 1; `surface.md §2.11` clause 3)');
  assert.equal(seen.constraint, before,
    'S-ORDER-SAVE (ii): the constraint body ran while the save had not run, so the file still carries the '
    + 'PRE-SAVE image — "a body that observed the file\'s bytes and read the PRE-SAVE image is a FAILURE" '
    + 'reads here of the CONSTRAINT body, which runs inside the pass and after the verb returned '
    + '(`contract.md §7.2` item 1: the verb performs no file I/O on any of its arms)');
  assert.notEqual(seen.listener, before,
    'S-ORDER-SAVE: by the listener body\'s own instant the terminal arm\'s save has completed — the commit '
    + 'is the SECOND of the three acts (`surface.md §2.11` clause 2)');
  assert.ok(String(seen.listener).includes('ordered'),
    'S-ORDER-SAVE: the image the listener body read carries the version the write installed');
});

test('fts_S_ORDER_SAVE_no_listener_body_runs_while_a_constraint_of_the_same_write_stands_owed', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('s-order2');
  const ord = ordinals();

  // ⟶ `A135` (3) / `§7.3` (b) state 1: both registrations would otherwise contribute one `'constraint-*'`
  // ordinal each BEFORE the pass, and this cell counts exactly TWO of them between the head of the list and
  // the first listener body. The shield answers each registration `true`, so both pairs are CARRIED.
  register(f.store, [key], 'ord-a', atLandingOnly(() => { ord.mark('constraint-a'); return true; }));
  register(f.store, [key], 'ord-b', atLandingOnly(() => { ord.mark('constraint-b'); return true; }));
  (listenAndRegister(f.store, [key], () => { ord.mark('listener'); }) || f.store.listen([key]));

  const record = commit(f.store, [key], 'file', 1);
  runAttempt(f.store, record);

  const firstListener = ord.log.findIndex((e) => e.what === 'listener');
  assert.notEqual(firstListener, -1, 'S-ORDER-SAVE: the listener body of a passed write is reached');
  assert.equal(ord.log.slice(0, firstListener).filter((e) => e.what.startsWith('constraint')).length, 2,
    'S-ORDER-SAVE: NO listener body runs before EVERY constraint of that write\'s own triggered set has '
    + 'passed — the failing state is "a listener body that ran while any constraint of the same write stands '
    + 'owed" (`§10.9` row 1; `surface.md §2.11` clause 3 (i); `§2.7` item 6)');
});

test('fts_S_ORDER_SAVE_the_save_precedes_every_body_of_the_delivered_set_and_not_the_first_only', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  // TWO DISTINCT ADDRESSES, because `on` at an address whose home entry ALREADY STANDS replaces the
  // registry's function slot for that identity and drops the earlier function (`surface.md §2.4` item 8
  // (a)) — so two bodies of ONE delivered set stand at two addresses, both prefixes of the operation's.
  const watch = tag('s-order3-w');
  const key = tag('s-order3-o');
  const order = [];
  const seen = [];

  // THE PARENT STANDS AT THE `file` TIER because the operation's own `file`-tier anchor may not outrank its
  // parent's (`contract.md §8.1` #6), and the two bodies stand at two prefixes of the operation's address.
  f.store.write([watch], 'file', { [tag('s-order3-link')]: 1 });
  // ⟶ `A135` (3) / `§7.3` (b) state 1: the shield keeps the registration's own invocation out of `order`, whose
  // length this cell reads as *"one constraint body and two listener bodies"* — the bodies of the WRITE.
  register(f.store, [watch, key], 'ord-c', atLandingOnly(() => { order.push('constraint'); return true; }));
  listenAndRegister(f.store, [watch], () => { order.push('listener-a'); seen.push(bytesOf(f.filePath)); });
  listenAndRegister(f.store, [watch, key], () => { order.push('listener-b'); seen.push(bytesOf(f.filePath)); });

  const record = commit(f.store, [watch, key], 'file', 'both');
  runAttempt(f.store, record);

  assert.equal(order[0], 'constraint', 'S-ORDER-SAVE: the constraint body precedes every listener body');
  assert.equal(order.length, 3, 'S-ORDER-SAVE: one constraint body and two listener bodies ran');
  for (const [i, image] of seen.entries()) {
    assert.ok(String(image).includes('both'),
      `S-ORDER-SAVE: listener body ${i} reads the POST-SAVE image — the save precedes the invocation of `
      + 'EVERY body of the delivered set (`surface.md §2.11` clause 3 (ii))');
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §10.9 ROW 2 — `P-IM-2` · STRATEGY `S-DURABLE-IMAGE` — THE DURABILITY BOUNDARY
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_S_DURABLE_IMAGE_a_failing_pass_leaves_the_last_passing_image_byte_identical', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const kept = tag('keep');
  const gone = tag('gone');

  // A STANDING PRIOR PASSING IMAGE, landed by the passing arm of an earlier `file`-tier write.
  runAttempt(f.store, commit(f.store, [kept], 'file', 'K'));
  const before = bytesOf(f.filePath);
  assert.ok(String(before).includes('K'), 'S-DURABLE-IMAGE: the fixture stands on a passing image');

  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: this body REFUSES, so it is shielded or its own
  // registration is refused there (`ConstraintListInvalid`, state 2) and the failing pass this cell reads is
  // never reached. THE SUBJECT IS UNMOVED: the body still refuses every LANDING, so `KC-3` and the
  // byte-identical image are exactly as filed.
  register(f.store, [gone], 'dur-fail', refusesAtLandingOnly(() => ({ message: 'the pass refuses this landing' })));
  const record = commit(f.store, [gone], 'file', 'G');
  assert.throws(() => runAttempt(f.store, record), (err) => err.status === 'KC-3',
    'S-DURABLE-IMAGE: the pass fails on its constraint (`§2.11` clause 5: ok === false, a KC token)');

  assert.equal(bytesOf(f.filePath), before,
    'S-DURABLE-IMAGE (i): a pass that fails on constraints performs NO save, so the bytes at `cfg.filePath` '
    + 'after it are BYTE-IDENTICAL to the bytes that stood there before the write (`surface.md §2.11` '
    + 'clause 4 (i); `contract.md §7.2` item 2\'s sibling-and-rename observable). FAIL-STATE: a truncated or '
    + 'partially rewritten file after a failing pass');
  const image = JSON.parse(bytesOf(f.filePath));
  assert.equal(gone in image, false, 'S-DURABLE-IMAGE: the refused version is NOT durable');
  assert.equal(image[kept], 'K', 'S-DURABLE-IMAGE: the last passing image survives whole');
});

test('fts_S_DURABLE_IMAGE_a_passing_passs_image_is_durable_before_the_first_listener_body', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('win');
  const observed = { insideBody: undefined, freshInstance: undefined };

  register(f.store, [key], 'dur-pass', () => true);
  (listenAndRegister(f.store, [key], () => {
    observed.insideBody = bytesOf(f.filePath);
    // THE FRESH INSTANCE OVER AN EQUAL `cfg.filePath` — the clause's own declared observable (`§2.11`
    // clause 4 (ii); `contract.md §7.2` item 6's boot).
    const fresh = storeCreate({ filePath: f.filePath, journalLength: 8, listeners: [] });
    observed.freshInstance = fresh.read([key], 'file');
  }));

  runAttempt(f.store, commit(f.store, [key], 'file', 'durable'));

  assert.ok(String(observed.insideBody).includes('durable'),
    'S-DURABLE-IMAGE (ii): the version the write installed is present at the file when the FIRST body of the '
    + 'delivered set runs. FAIL-STATE: a passing pass whose image is ABSENT when the first body runs');
  assert.equal(observed.freshInstance, 'durable',
    'S-DURABLE-IMAGE (ii): a FRESH instance over an equal `cfg.filePath` re-reads the installed version — '
    + 'the durability is a fact of the file and not of the live instance\'s memory');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §10.9 ROW 3 — `P-SM-3` · STRATEGY `S-ARM-SAVE` — THE SAVE'S ARM TABLE, CLOSED AND TOTAL
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_S_ARM_SAVE_the_file_tier_passing_arm_commits_once_and_only_at_the_terminal_arm', async () => {
  const { commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('arm-file');

  const before = bytesOf(f.filePath);
  const stateBefore = modState(f.filePath);
  const record = commit(f.store, [key], 'file', 'landed');
  const afterVerb = bytesOf(f.filePath);
  const stateAfterVerb = modState(f.filePath);
  runAttempt(f.store, record);
  const afterArm = bytesOf(f.filePath);
  const stateAfterArm = modState(f.filePath);
  f.store.read([key], 'file');
  const afterRead = modState(f.filePath);

  assert.equal(afterVerb, before,
    'S-ARM-SAVE (file, passing): the VERB performs no file I/O — it records the journal entry, installs the '
    + 'node, appends the entry and returns its `WriteResult` ON EVERY TIER (`contract.md §7.2` item 1 as '
    + 'amended 2026-10-15)');
  assert.deepEqual(stateAfterVerb, stateBefore,
    'S-ARM-SAVE: the modification state at the verb\'s return is unmoved, read off the identity triple');
  assert.notEqual(afterArm, before,
    'S-ARM-SAVE: the terminal arm\'s own act lands the image on the PASSING arm of a `file`-tier write');
  assert.notDeepEqual(stateAfterArm, stateBefore,
    'S-ARM-SAVE: the image\'s own modification state moved once, at the terminal arm');
  assert.equal(Object.keys(JSON.parse(afterArm)).length, 1,
    'S-ARM-SAVE: a save performed TWICE for one record FAILS the row — one record, one entry (the sibling '
    + 'write and the rename land one whole image)');
  assert.equal(JSON.parse(afterArm)[key], 'landed', 'S-ARM-SAVE: the durable image carries the version');
  assert.deepEqual(afterRead, stateAfterArm,
    'S-ARM-SAVE: no later act of the same record commits again — the arm is `file`-tier and terminal-arm and '
    + 'there is no second arm of it (`surface.md §2.11` clause 2)');
});

test('fts_S_ARM_SAVE_the_file_tier_failing_arm_commits_nothing', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const kept = tag('keep2');
  const refused = tag('refused');
  runAttempt(f.store, commit(f.store, [kept], 'file', 'P'));
  const before = bytesOf(f.filePath);
  const stateBefore = modState(f.filePath);

  // ⟶ `A135` (3) / `§7.3` (b) state 1: shielded, so the registration stands and the FAILING ARM this cell
  // reads is the write's own.
  register(f.store, [refused], 'arm-fail', refusesAtLandingOnly(() => ({ message: 'refused' })));
  assert.throws(() => runAttempt(f.store, commit(f.store, [refused], 'file', 'R')),
    (err) => err.status === 'KC-3', 'S-ARM-SAVE: the pass fails on its constraint');

  assert.equal(bytesOf(f.filePath), before,
    'S-ARM-SAVE (file, failing): "a `file`-tier write on the failing arm commits nothing" — FAIL-STATE: a '
    + 'failing-arm write that commits (`§10.9` row 3)');
  assert.deepEqual(modState(f.filePath), stateBefore,
    'S-ARM-SAVE: the file\'s modification state is unmoved on the failing arm');
});

test('fts_S_ARM_SAVE_a_mem_tier_write_commits_nothing_on_either_arm', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('arm-mem');
  const before = bytesOf(f.filePath);
  runAttempt(f.store, commit(f.store, [key], 'mem', 'M'));
  assert.equal(bytesOf(f.filePath), before,
    'S-ARM-SAVE (mem, passing): a `mem`-tier write commits nothing — FAIL-STATE: "a `mem`-tier write that '
    + 'touches the file" (`§10.9` row 3; `contract.md §7.2` item 5: `file`-tier durability is produced by a '
    + 'successful `file`-tier write ONLY)');

  const other = tag('arm-mem-f');
  // ⟶ `A135` (3) / `§7.3` (b) state 1: shielded — the arm table this cell reads is the WRITE's.
  register(f.store, [other], 'arm-mem-f', refusesAtLandingOnly(() => ({ message: 'refused' })));
  assert.throws(() => runAttempt(f.store, commit(f.store, [other], 'mem', 'M2')),
    (err) => err.status === 'KC-3', 'S-ARM-SAVE: the `mem` failing arm\'s pass fails');
  assert.equal(bytesOf(f.filePath), before,
    'S-ARM-SAVE (mem, failing): nothing is committed on this arm either');
});

test('fts_S_ARM_SAVE_a_temp_tier_write_commits_nothing_on_either_arm', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('arm-temp');
  const before = bytesOf(f.filePath);
  runAttempt(f.store, commit(f.store, [key], 'temp', 'T'));
  assert.equal(bytesOf(f.filePath), before,
    'S-ARM-SAVE (temp, passing): a `temp`-tier write commits nothing');

  const other = tag('arm-temp-f');
  // ⟶ `A135` (3) / `§7.3` (b) state 1: shielded — the arm table this cell reads is the WRITE's.
  register(f.store, [other], 'arm-temp-f', refusesAtLandingOnly(() => ({ message: 'refused' })));
  assert.throws(() => runAttempt(f.store, commit(f.store, [other], 'temp', 'T2')),
    (err) => err.status === 'KC-3', 'S-ARM-SAVE: the `temp` failing arm\'s pass fails');
  assert.equal(bytesOf(f.filePath), before,
    'S-ARM-SAVE (temp, failing): nothing is committed on this arm either');
});

test('fts_S_ARM_SAVE_a_record_whose_op_is_not_a_file_tier_writes_commits_nothing', async () => {
  const { commit, runAttempt } = await kernel();
  const f = newStore();
  const first = tag('arm-a');
  const second = tag('arm-b');
  runAttempt(f.store, commit(f.store, [first], 'file', 'F'));
  const before = bytesOf(f.filePath);
  const stateBefore = modState(f.filePath);

  // A record whose own op is a `mem`-tier write's: "a record whose own `op` is not a `file`-tier write's
  // performs none" (`contract.md §7.2` item 2).
  const record = commit(f.store, [second], 'mem', 'M');
  runAttempt(f.store, record);
  assert.equal(bytesOf(f.filePath), before,
    'S-ARM-SAVE: a record whose own `op` is not a `file`-tier write\'s commits nothing — the act is '
    + '`file`-tier and terminal-arm, and there is no second arm of it');
  assert.deepEqual(modState(f.filePath), stateBefore,
    'S-ARM-SAVE: and its modification state is unmoved');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §10.9 ROW 4 — `P-SM-4` · STRATEGY `S-REFUSAL` — UNREPAIRABLE, ROLLBACK FIRST, MESSAGE SECOND
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE ONE WAY A DRIVE FORCES THE TERMINAL ARM'S COMMIT TO FAIL WITHOUT CONTRADICTING THE CONSTRUCTION'S OWN
 * REACHABILITY CLAUSE (`contract.md §7.1` step 3-bis; `§10.13` item (b): the reachability predicate is the
 * KERNEL's own and a `0o555`-style mode-bit reading is NOT the drive's ground): the path's parent directory
 * STANDS at the construction — so the construction passes on the kernel's own predicate — and is REMOVED
 * before the write, so the sibling write and the rename have no directory to land in.
 */
function unwritableFixture() {
  const f = newStore();
  rmSync(f.dir, { recursive: true, force: true });
  return f;
}

test('fts_S_REFUSAL_a_failed_save_rolls_the_write_back_first_and_answers_the_caller_after_it', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = unwritableFixture();
  const key = tag('refuse');
  let listenerRuns = 0;
  register(f.store, [key], 'refuse-pass', () => true);
  (listenAndRegister(f.store, [key], () => { listenerRuns += 1; }) || f.store.listen([key]));

  // THE VERB RETURNS: a `file`-tier write performs no file I/O, so the commit failure cannot stand here.
  let record = null;
  try {
    record = commit(f.store, [key], 'file', 'never-durable');
  } catch (err) {
    assert.fail('S-REFUSAL: the write verb records, installs, appends and RETURNS ITS `WriteResult` ON EVERY '
      + 'TIER AND PERFORMS NO FILE I/O ON ANY OF ITS ARMS, so the commit failure cannot stand at the verb — '
      + `caught ${err && err.status} at the verb call (\`contract.md §7.2\` item 1)`);
  }
  assert.equal(typeof record.op.opId, 'string',
    'S-REFUSAL: the write verb returned its own `WriteResult` — the failure is the TERMINAL ARM\'s and is '
    + 'answered after the write landed (`contract.md §7.2` item 1; `surface.md §2.11` clause 5)');

  let caught = null;
  try {
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }
  assert.ok(caught !== null, 'S-REFUSAL: the caller is ANSWERED with the failure and never handed the '
    + 'rolled-back state');
  assert.ok(caught && typeof caught === 'object', 'S-REFUSAL: the answer is one of the flow\'s own forms');
  assert.equal(typeof caught.status, 'string', 'S-REFUSAL: the answer carries a status');
  assert.ok(caught.message && String(caught.message).length > 0,
    'S-REFUSAL: a message that is EMPTY FAILS the row');
  assert.equal(/[<>]/.test(String(caught.message)), false,
    'S-REFUSAL: a message that is PLACEHOLDER-BEARING or hand-authored FAILS the row — every message is '
    + 'generated from its code and the failing trigger\'s arguments (`contract.md §8.1`; `§8.2`)');
  assert.equal(caught.repair, undefined,
    'S-REFUSAL: NO REPAIR FUNCTION IS RETURNED BY THE SAVE\'S OWN CONSTRAINT, so no repair can reverse it');
  assert.equal(Object.values(caught).some((v) => typeof v === 'function'), false,
    'S-REFUSAL: and the answer carries no function-valued member at all');
  assert.equal(listenerRuns, 0,
    'S-REFUSAL: the save IS a constraint, EVALUATED LAST, so a failed save is a constraint violation and the '
    + 'discard reaches that write\'s bodies — no body of the delivered set ran');
  assert.throws(() => f.store.read([key], 'file'),
    (err) => err.status === 'AddressNotFound',
    'S-REFUSAL: the rollback happened FIRST and the message was answered AFTER it — the caller never '
    + 'receives the rolled-back state, and a read answers the store\'s own `AddressNotFound` over the '
    + 'reversed landing (`contract.md §7.2` item 3 read at this arm)');
});

test('fts_S_REFUSAL_the_failed_saves_code_is_FileCommitFailed_and_its_message_carries_the_path', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = unwritableFixture();
  const key = tag('refuse-code');
  register(f.store, [key], 'refuse-pass2', () => true);
  let record = null;
  try {
    record = commit(f.store, [key], 'file', 'never-durable');
  } catch (err) {
    assert.fail('S-REFUSAL: the commit failure cannot stand at the verb — the verb performs no file I/O on '
      + `any of its arms — caught ${err && err.status} (\`contract.md §7.2\` item 1)`);
  }

  let caught = null;
  try {
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }
  assert.ok(caught !== null, 'S-REFUSAL: the failed save is answered');

  // THE CODE, F3 OF THIS FILE'S FINDING BLOCK: `contract.md §8.1` #15's trigger is "a `file`-TIER WRITE'S
  // FAILURE PATH" and the complement block prints *"a `file`-TIER WRITE'S COMMIT FAILURE IS A FAILURE and
  // answers `FileCommitFailed`"*; #16's own trigger column is EXCLUSIVE to the constraint list's validation
  // and no clause widens it. `proposal-review.md §20.4` `F-3` rules `FileCommitFailed` operative ("its reuse
  // with its trigger column widened"). `surface.md §2.11` clause 5 cites #16 at this cell — see F3.
  assert.equal(caught.status, 'FileCommitFailed',
    'S-REFUSAL: the failed save answers the store\'s own code for a `file`-tier write\'s commit failure');
  // `contract.md §8.2`'s `FileCommitFailed` row: <mismatch clause> "could not be committed to",
  // <available clause> "the file write failed at '<PATH>'" (the row's own `MessageArgs.path` slot).
  assert.ok(String(caught.message).includes('could not be committed to'),
    'S-REFUSAL: the generated message carries the row\'s own <mismatch clause>');
  assert.ok(String(caught.message).includes(`the file write failed at '${f.filePath}'`),
    'S-REFUSAL: and its <available clause>, with the `path` argument the trigger supplies');
});

test('fts_S_REFUSAL_the_save_is_evaluated_last_after_every_constraint_of_its_set_has_passed', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = unwritableFixture();
  const key = tag('refuse-last');
  const ord = ordinals();
  let listenerRuns = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1: the save-is-last cell reads the ORDER of the write's own acts, so
  // neither registration's invocation may mark an ordinal here. Both shields answer the registration `true`.
  register(f.store, [key], 'refuse-last-a', atLandingOnly(() => { ord.mark('constraint-a'); return true; }));
  register(f.store, [key], 'refuse-last-b', atLandingOnly(() => { ord.mark('constraint-b'); return true; }));
  (listenAndRegister(f.store, [key], () => { listenerRuns += 1; }) || f.store.listen([key]));
  let record = null;
  try {
    record = commit(f.store, [key], 'file', 'never-durable');
  } catch (err) {
    assert.fail('S-REFUSAL: the commit failure cannot stand at the verb — the verb performs no file I/O on '
      + `any of its arms — caught ${err && err.status} (\`contract.md §7.2\` item 1)`);
  }

  let caught = null;
  try {
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }

  assert.deepEqual(ord.log.map((e) => e.what), ['constraint-a', 'constraint-b'],
    'S-REFUSAL: every constraint of the write\'s own triggered set was EVALUATED AND PASSED before the save '
    + 'ran — the save IS a constraint, EVALUATED LAST, so its failure is reached on the PASSING arm and '
    + 'after the whole set (`surface.md §2.11` clause 5; `§10.9` row 4)');
  assert.ok(caught !== null,
    'S-REFUSAL: and that last constraint\'s failure is the caller\'s answer — the caller receives the '
    + 'failure and NEVER the rolled-back state');
  assert.equal(listenerRuns, 0,
    'S-REFUSAL: the discard reaches that write\'s bodies, so a save that fails runs no listener body');
  assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
    'S-REFUSAL: the rollback stands BEFORE the message and the write left no readable version');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §10.9 ROW 5 — `P-SM-5` · STRATEGY `S-JOIN` — A REPAIR'S WRITE IS A NEW ENTRY IN THE SAME COMMIT
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_S_JOIN_a_repairs_write_joins_the_same_commit_and_the_op_set_grows_by_exactly_one', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('join');
  // THE RECORD THE CALLER ITSELF HOLDS for the write in flight (`parameter-semantics.md §2.20`'s domain:
  // "the object `commit` returned for the write in flight ... or the identity a caller holds for a record it
  // is itself building"). The repair is RETURNED BY the constraint that triggered it and carries the commit
  // it is part of; the constraint's own scope is where the caller's record stands.
  let held = null;
  let repairs = 0;

  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1 — AND `3-bis` MAKES THE SHIELD MANDATORY HERE: this body
  // carries a `repair`, so an unshielded registration ATTEMPTS it immediately, `repairs` gains a run that
  // belongs to no write, and the commit this cell measures its op set against is the registration's own.
  register(f.store, [key], 'join-c1', atLandingOnly((ctx) => {
    if (ctx.value === 'fixed') return true;
    return {
      message: 'the landed value contradicts the shape this pair confirms',
      repair: () => {
        repairs += 1;
        const w = f.store.write([key], 'file', 'fixed', held);
        return { ok: true, op: w.op };
      },
    };
  }));

  const record = commit(f.store, [key], 'file', 'broken');
  held = record;
  const report = runAttempt(f.store, record);

  // ⟶ DATA CHECK, `surface.md §2.11` clause 6 read through `§10.9` row 5 (`P-SM-5`, `S-JOIN`): *"the
  // commit's op set grew by EXACTLY ONE per repair write"* — the write's own op first, the repair's own
  // op beside it, both in the SAME commit. The count (`2`) IS the contract's own arithmetic (`1 + 1`) and is
  // KEPT; what the count could not say is WHICH two ops the commit holds and that they are two DIFFERENT
  // entries of one commit, so the data check reads `ops` as identities and reads each op's own address.
  assert.equal(repairs, 1, 'S-JOIN: the repair returned by the constraint that triggered it ran once');
  assert.equal(report.ops.length, 2,
    'S-JOIN: the commit\'s op set grew by EXACTLY ONE per repair write — the write\'s own op first, the '
    + 'repair\'s own op beside it, both in the SAME commit. FAIL-STATE: "an op set that grew by zero or by '
    + 'more than one" (`§10.9` row 5; `surface.md §2.11` clause 6)');
  assert.equal(report.ops[0].opId, record.op.opId,
    'S-JOIN: the first op of the commit is the write\'s own, VERBATIM (`kernel-surface.md §2.1` item 2)');
  assert.notEqual(report.ops[1].opId, record.op.opId,
    'S-JOIN: and the repair\'s op is a DIFFERENT op from the write\'s — the data the uniqueness clause '
    + '(`ops.length === new Set(opIds).size`) was standing in for, now read as the pair\'s own two ids');
  assert.equal(new Set(report.ops.map((o) => o.opId)).size, report.ops.length,
    'S-JOIN: the repair\'s write is a NEW ENTRY and not a second record identity (`§2.11` clause 6)');
  assert.deepEqual(report.ops[1].address, report.ops[0].address,
    'and both ops stand at the SAME address — the same commit, one address, two entries');
  assert.equal(report.outcome, 'passed',
    'S-JOIN: the repaired pair passes on the re-run, so no second commit and no repeat arm was reached');
  // ⟶ AND THE RCA'S JUDGEMENT, ALREADY PRESENT IN THIS CELL'S BODY AND NOW READ AS DATA: the body above
  // judges `ctx.value === 'fixed'`, so the store standing at `'fixed'` is a value THIS constraint accepted
  // (`rca-def-m-passing-repair.md` §"THE ACTUAL GAP"); asserting it makes the cell's green a
  // discrimination over the landed value rather than a statement about the op set alone.
  assert.equal(f.store.read([key], 'file'), 'fixed',
    'S-JOIN: THE LANDED VALUE IS THE ONE THE CONSTRAINT ACCEPTS — the judgement `rca-def-m-passing-repair.md` '
    + 'names, read off the store after the attempt resolved (`surface.md §2.11` clause 6 read with the RCA\'s '
    + 'class)');
});

test('fts_S_JOIN_a_repairs_write_is_an_ordinary_write_and_its_refusal_is_the_kernels_KC_4', async () => {
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('join-refused');
  let held = null;

  // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` makes it mandatory: unshielded, the registration
  // ATTEMPTS this repair and the store's own refusal (`ValueNotAdmitted`) surfaces THERE, at a call this cell
  // does not drive, instead of at the write's attempt.
  register(f.store, [key], 'join-c2', atLandingOnly(() => ({
    message: 'repair this landing',
    // THE REPAIR IS AN ORDINARY WRITE OF THIS SURFACE: it carries the commit it is part of at the FIFTH
    // position, and `undefined` is outside the value's admitted set — so the STORE refuses the verb at the
    // call (`contract.md §8.1` #14) and the refusal is the REPAIR's own arm.
    repair: () => {
      const w = f.store.write([key], 'file', undefined, held);
      return { ok: true, op: w.op };
    },
  })));

  const record = commit(f.store, [key], 'file', 'v');
  held = record;

  let caught = null;
  try {
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }
  assert.ok(caught !== null, 'S-JOIN: the repair\'s refused write fails the attempt');
  assert.equal(caught.status, 'KC-4',
    'S-JOIN: "THE CALLER\'S CHANNEL IS THE KERNEL\'S — `runAttempt` does not let the store\'s code stand as '
    + 'its own answer: the attempt moves to `FAILING` with `KC-4` ... and the thrown form\'s `status` is '
    + 'NEVER a store member" (`kernel-surface.md §2.3` item 2 (iii); `fail-surface.md §2`\'s `KC-4`)');
});

test('fts_S_JOIN_a_repair_refused_as_WriteParentNotLink_answers_the_callers_KC_4', async () => {
  // **⟶ ADDED 2026-10-15 — `DEF-2026-10-15-O`'s OWED COVERAGE CELL, AND THE SIBLING OF THE
  // `ValueNotAdmitted` CELL ABOVE.** The `WriteParentNotLink` TRIGGER is driven at
  // `constraint-kernel-rollback.test.mjs`'s own window, and that drive asserts the ENTRY'S message and the
  // OUTCOME entry's `state` — **it NEVER asserts the CALLER'S THROWN STATUS.** **THE "ONE HOST BUG AT TWO
  // SITES" CLAIM IS CONFIRMED AT THE BYTES AS ONE CODE PATH** (`bindings/js/src/constraint-kernel.mjs`'s
  // repair-body catch), **so the same one-cell gap is closed here: `caught.status` is `KC-4` for THIS
  // refusal too, and the store's own token is carried into the message and NOT into the status.**
  const { register, commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('join-refused-parent');
  // THE ATTEMPT'S ADDRESS HOLDS A LEAF, so a write INTO it is the store's `WriteParentNotLink` (`§8.1` #9).
  f.store.write([key], 'mem', 7);
  let held = null;
  let reached = false;
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — and `3-bis` makes it mandatory for the same reason as `join-c2`: the
  // repair's own store refusal must be the ATTEMPT's, which is the call this cell drives.
  register(f.store, [key], 'join-c3', atLandingOnly(() => ({
    message: 'repair this landing',
    // THE REPAIR'S OWN EDIT, REFUSED BY THE STORE BEFORE ANY OP EXISTS: a segment remains under a leaf.
    repair: () => {
      reached = true;
      const w = f.store.write([key, 'child'], 'mem', 9, held);
      return { ok: true, op: w.op };
    },
  })));

  const record = commit(f.store, [key], 'mem', 1);
  held = record;

  let caught = null;
  try {
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }
  assert.equal(reached, true, 'S-JOIN: the repair body WAS invoked and the store refused its own edit');
  assert.ok(caught !== null, 'S-JOIN: the caller is answered and never handed the rolled-back state');
  assert.equal(caught.status, 'KC-4',
    'S-JOIN: THE CALLER\'S STATUS IS THE KERNEL\'S — the attempt moves to `FAILING` with `KC-4` and the '
    + 'thrown form\'s `status` is NEVER the store\'s own member (`kernel-surface.md §2.3` item 2 (iii); '
    + '`fail-surface.md §2`\'s `KC-4`) — read ' + JSON.stringify(caught.status));
  assert.equal(caught.status === 'WriteParentNotLink', false,
    'S-JOIN: and the store\'s token did NOT stand as the caller\'s answer');
  assert.ok(String(caught.message).includes('WriteParentNotLink'),
    'S-JOIN: the store\'s own token is carried in the MESSAGE where the store refused the repair — read '
    + JSON.stringify(String(caught.message)));
  assert.equal(typeof commit, 'function', 'S-JOIN: the kernel\'s second item is untouched by this cell');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §10.9 ROW 6 — `P-TP-6` · STRATEGY `S-CONSTRAINTS-KEY` — THE FOURTH KEY AND ITS TWO INSTANTS
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_S_CONSTRAINTS_KEY_an_absent_key_is_in_domain_and_is_never_read_as_an_empty_list', async () => {
  const { commit, runAttempt, report } = await kernel();
  const f = newStore();
  const key = tag('ck-absent');
  assert.equal(f.cfg.constraints, undefined, 'S-CONSTRAINTS-KEY: the fixture carries NO `constraints` key');
  assert.equal(typeof f.store, 'object',
    'S-CONSTRAINTS-KEY: an ABSENT `constraints` is the ordinary no-constraint store — NO `constraints` '
    + 'default is declared and no list is fabricated (`parameter-semantics.md §2.21`; `surface.md §2.1`). '
    + 'FAIL-STATE: "an absent list producing a code"');
  runAttempt(f.store, commit(f.store, [key], 'file', 'A'));
  assert.equal(bytesOf(f.filePath).includes('A'), true, 'S-CONSTRAINTS-KEY: the store works without it');
  assert.equal(typeof report, 'function', 'S-CONSTRAINTS-KEY: the kernel\'s fifth item is untouched');
});

test('fts_S_CONSTRAINTS_KEY_an_empty_array_is_a_legal_list_and_is_not_the_absent_key', async () => {
  const f = newStore({ constraints: [] });
  assert.equal(typeof f.store, 'object',
    'S-CONSTRAINTS-KEY: an EMPTY ARRAY is an ARRAY OF PAIRS with no element — in domain, and an instance is '
    + 'returned (`parameter-semantics.md §2.21`)');
});

test('fts_S_CONSTRAINTS_KEY_one_well_formed_pair_constructs_and_the_pass_evaluates_it', async () => {
  const { register, commit, runAttempt } = await kernel();
  const key = tag('ck-one');
  // **⟶ AMENDED 2026-10-24 (`D-26` item 1, verbatim: *"The batch in cfg.constraints must supply functions"*):
  // THE ELEMENT IS THREE MEMBERS AND THE FUNCTION IS REQUIRED.** The bytes named `{ address, id }` only —
  // the element `D-26` calls *"a DEFECT and not a design"* — so the drive now supplies its substance, which
  // is what makes the declaration's second sentence (*"the pass then evaluates it"*) reachable at all.
  const f = newStore({ constraints: [{ address: [key], id: 'pair-1', constraint: () => true }] });
  assert.equal(typeof f.store, 'object', 'S-CONSTRAINTS-KEY: one well-formed pair constructs');
  // The pair is registered through the kernel's own `K-1` (`kernel-surface.md §2.1` item 1) and evaluated by
  // the pass at its own address — the observable `§2.21` pins ("a store constructed with a well-formed list,
  // which the kernel's pass then evaluates").
  let evaluated = 0;
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THIS CELL'S SUBJECT IS LITERALLY *"the pass evaluated the
  // declared pair ONCE"*, and `A135` (3) adds one invocation at the registration — so the shield answers the
  // registration here and `evaluated` counts the PASS's own evaluations alone, which is what the sentence
  // reads. The registration STANDS (state 1) and the pair is carried.
  register(f.store, [key], 'pair-1', atLandingOnly(() => { evaluated += 1; return true; }));
  runAttempt(f.store, commit(f.store, [key], 'file', 'P'));
  assert.equal(evaluated, 1, 'S-CONSTRAINTS-KEY: the pass evaluated the declared pair once');
});

test('fts_S_CONSTRAINTS_KEY_two_well_formed_pairs_construct', async () => {
  const a = tag('ck-two-a');
  const b = tag('ck-two-b');
  // **⟶ AMENDED 2026-10-24 (`D-26`): each element carries its own function — the element is three members.**
  const f = newStore({
    constraints: [
      { address: [a], id: 'pair-a', constraint: () => true },
      { address: [b], id: 'pair-b', constraint: () => true },
    ],
  });
  assert.equal(typeof f.store, 'object',
    'S-CONSTRAINTS-KEY: the key\'s unit is the COUNT OF PAIRS — two pairs are two elements and construct');
});

test('fts_S_CONSTRAINTS_KEY_null_and_undefined_are_outside_the_domain_and_no_instance_returns', () => {
  for (const value of [null, undefined]) {
    const { cfg } = cfgFor({ constraints: value });
    assert.throws(() => storeCreate(cfg), storeFailure('ConstraintListInvalid', `constraints: ${String(value)}`),
      'S-CONSTRAINTS-KEY: a PRESENT key whose value is shape-less is OUTSIDE the key\'s domain — the answer '
      + 'is the store\'s own `ConstraintListInvalid` and NO instance is returned. FAIL-STATE: "a present '
      + 'invalid list returning an instance" (`parameter-semantics.md §2.21`; `contract.md §8.1` #16)');
  }
});

test('fts_S_CONSTRAINTS_KEY_a_non_array_is_outside_the_domain', () => {
  const forms = [1, 'a constraint list', true, { address: ['a'], id: 'c' }, () => []];
  for (const value of forms) {
    const { cfg } = cfgFor({ constraints: value });
    assert.throws(() => storeCreate(cfg), storeFailure('ConstraintListInvalid', `constraints: ${String(value)}`),
      'S-CONSTRAINTS-KEY: a non-array (a number, a string, a boolean, an object, a function) is outside the '
      + 'key\'s domain — "a non-array" is ONE form and no `constraints` default is fabricated for it');
  }
});

test('fts_S_CONSTRAINTS_KEY_the_worked_example_answers_its_own_generated_message_verbatim', () => {
  // `contract.md §8.2`'s ADDED 2026-10-15 clause prints this drive and its answer, reproducible from the
  // generator's rule: the FAILING entry is the second, whose `address` is the STRING 'a' and so is not a
  // segment array; `<SEGMENT>` is that entry's `address` spelling, `<CONTAINER>` is the key `constraints`,
  // and the degenerate arm of <CONTAINERSEGMENT> applies.
  // **⟶ AMENDED 2026-10-24 (`D-26`): the FIRST element carries its function, so the refusal the worked
  // example prints is still the SECOND element's own (a `B-1` fault at position `0` would shadow it, and
  // `docs/L1/surface-deltas.md` §3.2 keeps the store's arm first for an element the ENCODER refused).**
  const { cfg } = cfgFor({ constraints: [
    { address: ['a'], id: 'c1', constraint: () => true },
    { address: 'a', id: 'c2' },
  ] });
  const expected = "'a' is not a valid constraint entry in 'constraints', a constraint entry is an address "
    + 'and an id, and the address is a segment array';
  assert.throws(() => storeCreate(cfg), (err) => {
    assert.equal(err.status, 'ConstraintListInvalid',
      'S-CONSTRAINTS-KEY: the worked example\'s status, VERBATIM');
    assert.equal(err.message, expected,
      'S-CONSTRAINTS-KEY: the worked example\'s message, VERBATIM — a message is never hand-authored at a '
      + 'call site (`contract.md §8.2`)');
    return true;
  }, 'S-CONSTRAINTS-KEY: `storeCreate` with the §8.2 worked example\'s list answers the printed pair');
});

test('fts_S_CONSTRAINTS_KEY_an_array_carrying_an_element_that_is_not_a_pair', () => {
  const forms = [
    ['a'],
    [{}],
    [{ address: ['a'] }],
    [{ id: 'c' }],
    [null],
    [{ address: ['a'], id: 'c1' }, 7],
  ];
  for (const list of forms) {
    const { cfg } = cfgFor({ constraints: list });
    assert.throws(() => storeCreate(cfg), storeFailure('ConstraintListInvalid', JSON.stringify(list)),
      'S-CONSTRAINTS-KEY: "an array carrying an element that is not a pair" is outside the domain — the '
      + 'validation runs at CREATE as well as at LOAD (`§2.21`; `contract.md §8.1` #16)');
  }
});

test('fts_S_CONSTRAINTS_KEY_a_pair_whose_address_lies_outside_the_segment_array', () => {
  const forms = [
    [{ address: 'a', id: 'c' }],
    [{ address: [{}], id: 'c' }],
    [{ address: [-1], id: 'c' }],
    [{ address: [1.5], id: 'c' }],
    [{ address: null, id: 'c' }],
  ];
  for (const list of forms) {
    const { cfg } = cfgFor({ constraints: list });
    assert.throws(() => storeCreate(cfg), storeFailure('ConstraintListInvalid', JSON.stringify(list)),
      'S-CONSTRAINTS-KEY: a pair whose `address` lies outside `§1.5`\'s segment array is outside the domain');
  }
});

test('fts_S_CONSTRAINTS_KEY_a_pair_whose_id_is_absent_or_not_a_string', () => {
  const forms = [
    [{ address: ['a'] }],
    [{ address: ['a'], id: 3 }],
    [{ address: ['a'], id: null }],
  ];
  for (const list of forms) {
    const { cfg } = cfgFor({ constraints: list });
    assert.throws(() => storeCreate(cfg), storeFailure('ConstraintListInvalid', JSON.stringify(list)),
      'S-CONSTRAINTS-KEY: a pair whose `id` is absent or not a string is outside the domain');
  }
});

test('fts_S_CONSTRAINTS_KEY_no_package_side_code_and_no_package_side_message_is_minted_for_any_outside_form', () => {
  const { cfg } = cfgFor({ constraints: 'not a list' });
  assert.throws(() => storeCreate(cfg), (err) => {
    assert.equal(err instanceof TypeError, false,
      'S-CONSTRAINTS-KEY: the answer is THE STORE\'S OWN CODE, NEVER A PACKAGE CODE — the class test\'s '
      + '`TypeError` is the FIFTH ARGUMENT\'s refusal and not this key\'s (`§2.21`\'s declared answer cell; '
      + '`surface.md §2.5`\'s single form carries `{status, message, log}`)');
    assert.equal(err.status, 'ConstraintListInvalid', 'S-CONSTRAINTS-KEY: the store\'s sixteenth member');
    // **RE-DERIVED TO THE THREE-MEMBER FORM 2026-10-16** — the `cfg`-side refusal is `surface.md §2.5`
    // item 4's OWN enumerated `log: []` arm (*"the construction's own refusals (`cfg`-side) … all carry
    // `log: []`"*), read with item 9's own-enumerable-descriptor clause.
    assert.deepEqual(Object.keys(err).sort(), ['log', 'message', 'status'],
      'S-CONSTRAINTS-KEY: in the surface\'s three-member form — FLAT across arms (`surface.md §2.5` item 4), '
      + 'the set sorted ascending and length `3` (item 9)');
    assert.equal(Object.keys(err).length, 3,
      'S-CONSTRAINTS-KEY: `Object.keys(caught).length` is `3` on this arm too (`surface.md §2.5` item 9)');
    assert.ok(Array.isArray(err.log),
      'S-CONSTRAINTS-KEY: `log` is an ARRAY — never absent, never `null`, never a non-array '
      + '(`surface.md §2.5` item 9; `parameter-semantics.md §2.26`\'s `domain` cell)');
    assert.deepEqual(err.log, [],
      'S-CONSTRAINTS-KEY: and this construction refusal has NO ATTEMPT AT ALL, so its DECLARED value is '
      + '`[]` — the empty array and never a placeholder entry (`surface.md §2.5` item 4)');
    return true;
  }, 'S-CONSTRAINTS-KEY: no package-side code and no package-side message is minted');
});

test('fts_S_CONSTRAINTS_KEY_the_load_side_validates_the_persisted_list_and_a_valid_one_boots', async () => {
  const { commit, runAttempt } = await kernel();
  const key = tag('ck-load');
  const d = freshDir();
  const filePath = join(d, 'store.json');
  const first = storeCreate({ filePath, journalLength: 8, listeners: [], constraints: [{ address: [key], id: 'load-1', constraint: () => true }] });
  runAttempt(first, commit(first, [key], 'file', 'booted'));
  const image = bytesOf(filePath);
  assert.ok(String(image).includes('booted'), 'S-CONSTRAINTS-KEY: the fixture stands on a durable image');

  // THE LOAD INSTANT'S PASS ARM: a second construction over an EQUAL `cfg.filePath`, carrying a well-formed
  // list, returns its instance and answers no code (`§2.21`: "the list's validation at the construction and
  // its validation at the load").
  const second = storeCreate({ filePath, journalLength: 8, listeners: [], constraints: [{ address: [key], id: 'load-1', constraint: () => true }] });
  assert.equal(typeof second, 'object', 'S-CONSTRAINTS-KEY: a valid persisted list boots');
  assert.equal(second.read([key], 'file'), 'booted',
    'S-CONSTRAINTS-KEY: "the register\'s own keys after a boot" — the observable `§10.9` row 6 pins');
});

test('fts_S_CONSTRAINTS_KEY_the_load_side_failure_answers_ConstraintListInvalid_and_no_instance', async () => {
  // **⟶ THE `F1` SKIP IS REPLACED BY THIS DRIVE, 2026-10-15 (`D-GP-SVM-4`; `DEF-2026-10-15-AA`).** The
  // as-filed ground — *"the persisted form of `cfg.constraints` is undeclared, so no file whose list fails
  // validation can be constructed"* — **is SUPERSEDED AND WAS NEVER THE CLAUSE'S SUBJECT:**
  // `contract.md §7.2` item 5 (added 2026-10-15) rules, on the architect's own words, *"The list is not
  // persisted, the importing application will provide the constraints on startup from its own
  // information"* — so **`cfg.constraints` is a CONSTRUCTION-TIME PARAMETER, the store writes no byte of
  // it, and the LOAD instant validates the LOADED STATE AGAINST THE SUPPLIED LIST** (`§7.2` item 5;
  // `parameter-semantics.md §2.21`'s `evaluator` and `observable` cells; `surface.md §2.1`'s dated clause).
  // **THE FIXTURE IS THEREFORE THE PASS-ARM CELL'S OWN** (immediately above), **differing in ONE
  // coordinate: the supplied list names an address the loaded register does not hold.**
  const { commit, runAttempt } = await kernel();
  const key = tag('ck-load-fail');
  const d = freshDir();
  const filePath = join(d, 'store.json');
  const first = storeCreate({ filePath, journalLength: 8, listeners: [], constraints: [{ address: [key], id: 'load-1', constraint: () => true }] });
  runAttempt(first, commit(first, [key], 'file', 'booted'));
  const image = bytesOf(filePath);
  assert.ok(String(image).includes('booted'), 'S-CONSTRAINTS-KEY: the fixture stands on a durable image');
  assert.ok(String(image).includes(key), 'S-CONSTRAINTS-KEY: and the loaded register holds the key the list names');

  // THE LOAD INSTANT'S FAIL ARM: a well-formed SUPPLIED list is not itself invalid — its SECOND member
  // names an address this file's loaded state does not satisfy — and the answer is the store's own
  // sixteenth member with NO INSTANCE RETURNED.
  const absent = tag('ck-load-absent');
  const expected = `'${absent}' is not a valid constraint entry in 'constraints', a constraint entry is an `
    + 'address and an id, and the address is a segment array';
  assert.throws(() => storeCreate({
    filePath, journalLength: 8, listeners: [], constraints: [
      { address: [key], id: 'load-1', constraint: () => true },
      { address: [absent], id: 'load-2', constraint: () => true },
    ],
  }), (err) => {
    // **RE-DERIVED TO THE THREE-MEMBER FORM 2026-10-16**: the LOAD-side refusal is likewise a
    // construction `cfg`-side refusal — `surface.md §2.5` item 4's own enumerated `log: []` arm — so the
    // set is three members and the empty array is the DECLARED value, not an absence.
    assert.deepEqual(Object.keys(err).sort(), ['log', 'message', 'status'],
      'S-CONSTRAINTS-KEY: the load-side answer is the surface\'s THREE-member form, FLAT across arms '
      + '(`surface.md §2.5` item 4), sorted ascending with length `3` (item 9)');
    assert.equal(Object.keys(err).length, 3,
      'S-CONSTRAINTS-KEY: `Object.keys(caught).length` is `3` on the load-side instant as on every arm '
      + '(`surface.md §2.5` item 9)');
    assert.ok(Array.isArray(err.log),
      'S-CONSTRAINTS-KEY: `log` is an ARRAY and not `null`, not absent and not a non-array '
      + '(`surface.md §2.5` item 9; `parameter-semantics.md §2.26`\'s `domain` cell)');
    assert.deepEqual(err.log, [],
      'S-CONSTRAINTS-KEY: and no attempt is live at a boot that returns no instance, so the DECLARED value '
      + 'is `[]` — never a placeholder entry (`surface.md §2.5` item 4)');
    assert.equal(err.status, 'ConstraintListInvalid',
      'S-CONSTRAINTS-KEY: the LOAD-side instant answers the set\'s sixteenth member and no other code '
      + '(`contract.md §8.1` #16; `§7.2` item 5; the FAIL-STATE "a load-side failure answered with a '
      + 'different code" — `§10.9` row 6)');
    assert.equal(err.message, expected,
      'S-CONSTRAINTS-KEY: and its message is `§8.2`\'s own row for the member, VERBATIM — the failing '
      + 'ENTRY\'s address spelling in the `<SEGMENT>` slot, the list\'s own key `constraints` in the '
      + '`<CONTAINER>` slot at the degenerate arm, and no unsubstituted placeholder');
    return true;
  }, 'S-CONSTRAINTS-KEY: an EXISTING FILE whose loaded state no longer satisfies the SUPPLIED list '
    + 'answers `ConstraintListInvalid` and returns NO instance');

  // THE IMAGE IS UNMOVED BY THE REFUSED CONSTRUCTION, and the SAME file boots once the supplied list
  // names what the register actually holds — the discriminator that makes the arm single-valued.
  assert.equal(bytesOf(filePath), image,
    'S-CONSTRAINTS-KEY: the refused LOAD construction writes no byte at `cfg.filePath`');
  const third = storeCreate({ filePath, journalLength: 8, listeners: [], constraints: [{ address: [key], id: 'load-1', constraint: () => true }] });
  assert.equal(typeof third, 'object', 'S-CONSTRAINTS-KEY: the same file boots under a satisfied list');
  assert.equal(third.read([key], 'file'), 'booted',
    'S-CONSTRAINTS-KEY: and the version it carried is the one the boot reads');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §10.9 ROW 7 — `P-TP-7` · STRATEGY `S-ARG5` — THE FIFTH ARGUMENT'S POSITION AND ITS OUTSIDE VALUES
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_S_ARG5_the_declared_position_is_the_fifth_and_the_last_and_it_is_optional', () => {
  const dts = readFileSync(join(PACKAGE_DIR, 'index.d.ts'), 'utf8');
  // **⟶ RESHAPED 2026-10-16 (`surface.md §2.4` item 9 (f)'s `A127` clause; `§2.12` item 2 (a)'s `A127`
  // clause; `parameter-semantics.md §2.23`'s VACATED row).** **`write` IS A MEMBER OF THE PUBLISHED
  // `StoreInstance` INTERFACE NOW AND NOT A NAMED EXPORT, and the `instance` POSITION IS DROPPED — *"the
  // receiver IS the instance, so the position has no subject"* — so the declared order is read at the
  // interface member and the FIVE positions become FOUR.**
  assert.equal(/export function write\(/.test(dts), false,
    'S-ARG5: `write` is NOT a named function of the published declaration (`11 → 1`; `§2.9` item 1\'s `A127` clause)');
  const iface = dts.slice(dts.indexOf('export interface StoreInstance'));
  const decl = iface.match(/^\s*write\(([\s\S]*?)\):/m);
  assert.ok(decl !== null,
    'S-ARG5: the published typed surface declares `write` as a member of `StoreInstance` (`surface.md §2.4` '
    + 'item 9 (f) names the published declaration file as the implementer\'s wall)');
  const params = decl[1].split(',').map((p) => p.trim()).filter((p) => p.length > 0);
  assert.equal(params.length, 4,
    'S-ARG5: the declared order is `write(address, tier, value, commit?)` — THREE REQUIRED ARGUMENTS AND '
    + 'THE OPTIONAL ONE AT POSITION FOUR, the `instance` position having NO SUBJECT from 2026-10-16 '
    + '(`surface.md §2.2`\'s `A127` clause; `parameter-semantics.md §2.23`\'s VACATED row). FAIL-STATE: '
    + '"a call whose position is read off the flow"');
  assert.deepEqual(params.slice(0, 3).map((p) => p.split(/[?:]/)[0].trim()),
    ['address', 'tier', 'value'],
    'S-ARG5: the three required arguments stand in their declared order and none of them moved');
  assert.match(params[3], /^commit\??:/,
    'S-ARG5: the fourth is `commit` and it is OPTIONAL (`commit?:`) — a REQUIRED `commit` is a refused '
    + 'alternative (`parameter-semantics.md §2.20`\'s `alt` cell)');
});

test('fts_S_ARG5_an_absent_commit_is_in_domain_and_the_write_proceeds', async () => {
  const { commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('arg-absent');
  // FOUR arguments: the optional one is absent, and "THE WRITE OPENS OR JOINS A COMMIT ALL THE SAME".
  const record = commit(f.store, [key], 'file', 'no-commit');
  assert.equal(typeof record.op.opId, 'string', 'S-ARG5: the write returned its own record');
  runAttempt(f.store, record);
  assert.equal(f.store.read([key], 'file'), 'no-commit',
    'S-ARG5: an ABSENT `commit` is IN DOMAIN and is not an outside value, and NO default record is '
    + 'fabricated for it. FAIL-STATE: "a defaulted `commit`"');
});

test('fts_S_ARG5_an_adopted_record_position_is_accepted_and_the_write_proceeds', async () => {
  const { commit, runAttempt } = await kernel();
  const f = newStore();
  const key = tag('arg-adopted');
  const record = commit(f.store, [key], 'file', 'joined');
  // THE CLASS TEST'S ADMITTED FORM (`surface.md §2.4` item 9 (g) item 1 (iii)): an object carrying `pending`
  // is admitted by the class test, refused by it for nothing, and adopted as a first call.
  const w = f.store.write([key], 'mem', 'joined-again', record);
  assert.equal(typeof w.op.opId, 'string',
    'S-ARG5: a record position is accepted at the fifth position and the write proceeds ("a write carrying '
    + 'it and a write carrying nothing are ONE verb with ONE return shape", `write-and-read.md §3.1`)');
  runAttempt(f.store, record);
});

test('fts_S_ARG5_null_is_refused_by_the_class_test_and_the_write_does_not_proceed', async () => {
  const { commit } = await kernel();
  const f = newStore();
  const key = tag('arg-null');
  const before = bytesOf(f.filePath);
  assert.throws(() => f.store.write([key], 'file', 'never', null), positionRefusal('commit: null'),
    'S-ARG5: `null` is outside the fifth position\'s domain (`parameter-semantics.md §2.20`)');
  assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
    'S-ARG5: THE WRITE DOES NOT PROCEED past a refused `commit` — no landing, so no version to read');
  assert.equal(bytesOf(f.filePath), before, 'S-ARG5: and no durable byte moved');
  assert.equal(typeof commit, 'function', 'S-ARG5: the kernel\'s second item is untouched by this cell');
});

test('fts_S_ARG5_a_non_object_scalar_is_refused_and_the_write_does_not_proceed', async () => {
  const f = newStore();
  const scalars = [1, 'a commit', 7n, true, Symbol('commit')];
  for (const [i, value] of scalars.entries()) {
    const key = tag(`arg-scalar-${i}`);
    assert.throws(() => f.store.write([key], 'file', 'never', value),
      positionRefusal(`commit: a non-object scalar (${typeof value})`),
      'S-ARG5: a non-object scalar (number, string, bigint, boolean, symbol) is outside the domain');
    assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
      'S-ARG5: and the refused write did not proceed');
  }
});

test('fts_S_ARG5_a_function_is_refused_and_the_write_does_not_proceed', async () => {
  const f = newStore();
  const key = tag('arg-fn');
  assert.throws(() => f.store.write([key], 'file', 'never', () => ({ pending: [] })),
    positionRefusal('commit: a function'),
    'S-ARG5: a `function` is outside the fifth position\'s domain');
  assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
    'S-ARG5: and the refused write did not proceed');
});

test('fts_S_ARG5_a_proxy_value_carrying_no_pending_member_is_refused', async () => {
  const f = newStore();
  const key = tag('arg-proxy');
  assert.throws(() => f.store.write([key], 'file', 'never', new Proxy({}, {})),
    positionRefusal('commit: a Proxy value'),
    'S-ARG5: a `Proxy` value is outside the fifth position\'s domain, and this one carries no `pending` '
    + 'member, so the class test and the row agree (this file\'s finding F5)');
  assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
    'S-ARG5: and the refused write did not proceed');
});

test('fts_S_ARG5_the_object_and_any_object_whose_pending_is_absent_or_undefined_is_refused', async () => {
  const f = newStore();
  const forms = [
    {},
    { pending: undefined },
    { attempt: {}, op: {}, triggered: [] },
    { attempt: {}, op: {}, triggered: [], pending: undefined },
  ];
  for (const [i, value] of forms.entries()) {
    const key = tag(`arg-object-${i}`);
    assert.throws(() => f.store.write([key], 'file', 'never', value),
      positionRefusal(`commit: object form ${i}`),
      'S-ARG5: "the object `{}` and any object whose `pending` member is ABSENT or `undefined`" is outside '
      + 'the domain — the discriminator the boundary reads is the `pending` member\'s presence and never an '
      + 'identity\'s history (`surface.md §2.4` item 9 (g) item 1)');
    assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
      'S-ARG5: and the refused write did not proceed');
  }
});

test('fts_S_ARG5_an_array_is_refused_and_the_write_does_not_proceed', async () => {
  const f = newStore();
  const key = tag('arg-array');
  assert.throws(() => f.store.write([key], 'file', 'never', []), positionRefusal('commit: an array'),
    'S-ARG5: an array is outside the fifth position\'s domain');
  assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
    'S-ARG5: and the refused write did not proceed');
});

test('fts_S_ARG5_an_absent_fifth_argument_opens_or_joins_its_commit_and_the_write_proceeds', async () => {
  const { runAttempt } = await kernel();
  const f = newStore();
  const key = tag('arg5-absent');
  const before = bytesOf(f.filePath);
  // FOUR ARGUMENTS — THE POSITION ABSENT. `§2.2` clause 4: "where it was NOT SUPPLIED, the write proceeds
  // with the fourth position's own arity exactly as clauses 1–2 declare it, and NO DEFAULT IS FABRICATED
  // FOR THE ABSENT POSITION"; clause 1: "absent, THE WRITE OPENS OR JOINS A COMMIT ALL THE SAME".
  const record = f.store.write([key], 'file', 'absent-carried');
  assert.equal(typeof record.op.opId, 'string',
    'S-ARG5: an ABSENT fifth argument is IN DOMAIN and the write happened — "the write opens or joins its '
    + 'commit all the same" (`parameter-semantics.md §2.20`\'s domain cell as RE-SPELLED 2026-10-15; '
    + '`surface.md §2.2` clause 4)');
  assert.deepEqual(Object.keys(record).sort(), ['op', 'triggered', 'watched'],
    'S-ARG5: and the return is the declared three-member record (`PAR-JS-13`; `write-and-read.md §3.1` — "a '
    + 'write carrying it and a write carrying nothing are ONE verb with ONE return shape")');
  // THE COMMIT ITS OWN FLOW OPENED, read as the two observables the declaration names: the write LANDED (its
  // address answers with its own value) and its own record IS the write's record — so the commit that carries
  // it is the flow's own and no default stands in for the absent position.
  assert.equal(f.store.read([key], 'file'), 'absent-carried',
    'S-ARG5: the version the write carried is the version the address now reads');
  assert.equal('status' in record, false, 'S-ARG5: the admitted shape is a RECORD and never a failure form');
  // AND THE POSITION IS ABSENT IN ERGONOMY AS WELL AS IN LAW: the same write through the kernel's own route
  // — a `commit` the kernel holds — is the same verb with the same return shape, so the absent position is
  // neither substituted nor required.
  assert.equal(typeof runAttempt, 'function',
    'S-ARG5: the flow that owns the opened commit is the kernel\'s own (the terminal arm reads it at '
    + '`surface.md §2.11` clause 2)');
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // THE AS-FILED ASSERTION REQUIRED THE FILE TO BE BYTE-IDENTICAL AFTER THE WRITE, AND THAT IS SUPERSEDED BY
  // THE UNIT'S OWN ROUTING AMENDMENT.** `§2.12` item 1's AMENDED ROUTE makes the entry→kernel edge
  // UNCONDITIONAL — the architect's ruling, verbatim: *"Always route to the kernel, because the JS code does
  // not decide whether constraints trigger"* — **so a four-position write is a KERNEL-DRIVEN write, its pass
  // completes at the terminal arm, and THE SAVE IS PERFORMED.** **THE CLAIM THE LINE EXISTS FOR — *"an ABSENT
  // fifth argument is IN DOMAIN and nothing is fabricated for it"* — IS UNMOVED AND IS THIS CELL'S OWN
  // SUBJECT: the three-member record, the `op.opId` and the read-back above all still assert it.** What the
  // line must now read is the amended route's own observable: **the write landed AND the flow completed**,
  // with no synthesized commit.
  assert.equal(
    bytesOf(f.filePath),
    JSON.stringify({ [key]: 'absent-carried' }),
    'S-ARG5: the four-position write IS a kernel-driven write (`§2.12` item 1\'s amended route), so its flow '
    + 'reaches the terminal arm and the save is performed — the file carries the version the write landed '
    + 'under the address it landed at, and NO DEFAULT was fabricated for the absent position '
    + '(`contract.md §7.2` item 1, amended 2026-10-15)',
  );
  assert.notEqual(bytesOf(f.filePath), before,
    '...and the line\'s own subject is stated as the CONTRAST it now is: the file moved, because the amended '
    + 'route made this write kernel-governed where the as-filed reading had it bare');
});

test('fts_S_ARG5_a_supplied_undefined_at_the_fifth_position_is_refused_and_the_write_does_not_proceed', async () => {
  const f = newStore();
  const key = tag('arg5-supplied-undefined');
  const before = bytesOf(f.filePath);
  // FIVE ARGUMENTS — THE POSITION SUPPLIED WITH `undefined`. `parameter-semantics.md §2.20`'s outside-value
  // cell RE-SPELLED 2026-10-15: "`undefined` SUPPLIED AT POSITION `5` IS OUTSIDE THE DOMAIN AND REFUSED, AND
  // ITS GROUND IS THE ARITY GATE". The refusal's own form is that cell's declared answer: "an instance of
  // ONE class, its `status` member ABSENT, a STRING `message` member REQUIRED and its content undeclared".
  assert.throws(() => f.store.write([key], 'file', 'never', undefined),
    positionRefusal('commit: undefined supplied at position 5 (the arity gate)'),
    'S-ARG5: `address.write(tier, value, undefined)` — the fifth position SUPPLIED with `undefined` — IS '
    + 'REFUSED (`surface.md §2.2` clause 4; `parameter-semantics.md §2.20`)');
  // AND THE WRITE DOES NOT PROCEED — the refusal is taken before the walk and before the verb, so nothing
  // landed and no byte moved.
  assert.throws(() => f.store.read([key], 'file'), (err) => err.status === 'AddressNotFound',
    'S-ARG5: no landing was taken, so there is no version to read (`surface.md §2.4` item 9 (g) item 1: the '
    + 'class test "IS TAKEN BEFORE THE WALK AND BEFORE THE VERB")');
  assert.equal(bytesOf(f.filePath), before, 'S-ARG5: and no durable byte moved');
});

test('fts_S_ARG5_the_refusal_is_the_arity_gates_by_the_count_alone', async () => {
  const { runAttempt } = await kernel();
  const f = newStore();
  const key = tag('arg5-discriminator');
  // THE DISCRIMINATOR THE GATE-4 AUDIT ASKED FOR (`docs/defects.md`'s `DEF-2026-10-15-AA` `F2`; `P-TP-7`'s
  // coverage cell in `implementation-plan.md §10.9` row 7). The two calls below are constructed so the only
  // difference between them is the CALL'S ARGUMENT COUNT at the fifth position: the first passes four
  // arguments and the second passes the fifth as `undefined`. A class test of a SUPPLIED VALUE cannot
  // separate them, because the value the second supplies is `undefined` — indistinguishable from absence by
  // ANY MEMBER READ. So the split in outcomes IS the attribution: the position's arity half reads the count
  // and the class half reads the value standing there (`surface.md §2.2` clause 4: "where the fifth position
  // was SUPPLIED, the class test of clause 3 is taken on the value standing there; where it was NOT
  // SUPPLIED, the write proceeds …").
  const absent = f.store.write([key], 'file', 'by-count-absent');
  assert.equal(typeof absent.op.opId, 'string', 'S-ARG5: the ABSENT shape PROCEEDS (IN DOMAIN)');

  const suppliedKey = tag('arg5-discriminator-supplied');
  let refusal = null;
  try {
    f.store.write([suppliedKey], 'file', 'by-count-supplied', undefined);
  } catch (err) {
    refusal = err;
  }
  assert.ok(refusal !== null,
    'S-ARG5: the SUPPLIED-`undefined` shape is REFUSED — the ONE cell that makes the arity gate observable '
    + 'from outside (`surface.md §2.2` clause 4; `parameter-semantics.md §2.20`\'s re-spelled cell)');
  assert.ok(refusal instanceof TypeError && 'status' in refusal === false
    && typeof refusal.message === 'string' && refusal.message.length > 0,
    'S-ARG5: and the gate\'s refusal takes the position\'s declared form — ONE class, `status` ABSENT, a '
    + 'STRING `message` REQUIRED (`surface.md §2.4` item 9 (b); `parameter-semantics.md §2.20`\'s answer '
    + 'cell; `contract.md §0.2`\'s `DD-46` amendment of 2026-10-15: "the refusal is an instance of `TypeError` '
    + 'whose `status` member is ABSENT and whose string `message` member is required")');
  assert.throws(() => f.store.read([suppliedKey], 'file'), (err) => err.status === 'AddressNotFound',
    'S-ARG5: the refused shape left no landing, so the two outcomes are read at ONE address each');

  // THE PAIR, READ AS A PAIR: the SAME absence of a value, TWO call shapes, TWO outcomes — and the two
  // outcomes are read on the same instance, at two addresses, so nothing but the count separates them.
  assert.notEqual(f.store.read([key], 'file'), undefined,
    'S-ARG5: four arguments — the write happened');
  assert.throws(() => f.store.read([suppliedKey], 'file'), (err) => err.status === 'AddressNotFound',
    'S-ARG5: five arguments with `undefined` at the position — the write did not happen. FAIL-STATE: "a '
    + 'refused `undefined` indistinguishable from the admitted absence"');
  assert.equal(typeof runAttempt, 'function',
    'S-ARG5: the kernel\'s extent is untouched by this cell (`kernel-surface.md §1` item 1)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// §10.9 ROW 8 — `P-TP-8` · STRATEGY `S-CENSUS` — THE ALGEBRA CLOSED, NO EXISTING MEMBER MOVING
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

/** `contract.md §8.1`'s CLOSED SET at its amended heading and rows, ranks `1`…`20` in order.
 *
 *  **⟶ RE-DERIVED 2026-10-26 TO THE ARCHITECT'S RULING AND NOT TO THE BYTES** (`DEF-S` and `DEF-N`; the
 *  architect, verbatim: *"Expand the returned error set for both S/N"*). **THE SET IS NINETEEN MEMBERS RANKED
 *  `1`…`19`: ranks `1`…`17` stand EXACTLY as they were — no rank moves and `ConstraintListInvalid` keeps rank
 *  `16` — and the two appended terms are `ConstraintBodyThrew` at rank `18` (a constraint BODY's throw, which
 *  the crossing converts in the one failure form) and `ConstraintRefusedAtRegistration` at rank `19` (a
 *  REGISTRATION VERDICT, so a WELL-FORMED pair is never refused with the SHAPE code).** The count this array
 *  carries had to move with the ruling: a census that kept `17` would be asserting the superseded set.
 *
 *  **⟶ AND RE-DERIVED AGAIN 2026-10-26, TO THE RULING AND NOT TO THE BYTES** (`DEF-H` and `DEF-W`; the
 *  architect, verbatim: *"Expand the returned fail-state list to include the refusal"* and *"Assert the
 *  constraints on rollback"*). **THE SET IS TWENTY MEMBERS RANKED `1`…`20`: NO RANK OF `1`…`19` MOVES —
 *  `FileCommitFailed` keeps `15` and is the SAVE's code alone — and the appended term is
 *  `ConstraintPassRefused` at rank `20`, THE ONE STATUS A CONSTRAINT REFUSAL ANSWERS WITH, at the write's
 *  attempt and at a reversal whose terminal state a registered constraint refuses.** A census that kept `19`
 *  would be asserting the superseded set, and this one is the `P-TP-8` algebra's own list. */
const STORE_CLOSED_SET = [
  'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch',
  'WriteParentNotLink', 'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing',
  'FilePathUnreachable', 'ValueNotAdmitted', 'FileCommitFailed', 'ConstraintListInvalid',
  'ValueRefusedAtBoundary',
  // ⟶ APPENDED 2026-10-26 (`DEF-S`, `DEF-N`; the architect's ruling on the downstream claims).
  'ConstraintBodyThrew', 'ConstraintRefusedAtRegistration',
  // ⟶ APPENDED 2026-10-26 (`DEF-H`, `DEF-W`; the architect's ruling on the refusal and the reversal).
  'ConstraintPassRefused',
];

test('fts_S_CENSUS_the_sixteenth_member_is_reachable_and_the_terms_of_the_algebra_stand', () => {
  // THE TERMS, READ OFF THE TABLE'S OWN ROWS AND NOT ASSERTED AS A TOTAL ALONE: `11` (§8.1 #1–#11) `+ 2`
  // (the construction group #12/#13) `+ 1` (#14) `+ 1` (#15) `+ 1` (#16) `= 16` ✓.
  // **⟶ RE-DERIVED 2026-10-26 (`DEF-S`/`DEF-N`; the architect, verbatim: *"Expand the returned error set for
  // both S/N"*): THE OPERATIVE SET IS NINETEEN, `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 = 19` ✓ — the six terms this
  // cell printed stand exactly as filed and the two appended terms are the body-throw arm (rank `18`) and the
  // registration-verdict arm (rank `19`). NO RANK OF `1`…`17` MOVES.** The superseded figures (`15`, `16`,
  // `17`) are the figures of their own dated clauses and are read through this one.
  // **⟶ AND RE-DERIVED AGAIN 2026-10-26 (`DEF-H`/`DEF-W`; *"Expand the returned fail-state list to include
  // the refusal"*, *"Assert the constraints on rollback"*): THE OPERATIVE SET IS TWENTY,
  // `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓ — the eight terms this cell printed stand exactly as filed and
  // the appended term is the constraint pass's refusal at rank `20`. NO RANK OF `1`…`19` MOVES.**
  assert.equal(STORE_CLOSED_SET.length, 20, 'S-CENSUS: the closed set is TWENTY members. FAIL-STATE: "a set '
    + 'of `15` or `17`" (`contract.md §8.1`, amended heading; `implementation-plan.md §10.9` row 8), read from '
    + '2026-10-26 through the rulings that append ranks `18`, `19` and `20`');
  assert.equal(11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1, 20, 'S-CENSUS: and its own terms sum it');
  assert.deepEqual(STORE_CLOSED_SET.slice(11, 13), ['ConstructionArgumentMissing', 'FilePathUnreachable'],
    'S-CENSUS: the construction group\'s TWO members hold ranks 12 and 13');
  assert.equal(STORE_CLOSED_SET[15], 'ConstraintListInvalid',
    'S-CENSUS: rank `16` is `ConstraintListInvalid`, after `FileCommitFailed` (`proposal-review.md §22.2`) — '
    + 'and from 2026-10-26 it is NO LONGER the last: `ConstraintBodyThrew` and '
    + '`ConstraintRefusedAtRegistration` are appended at `18` and `19` (`DEF-S`/`DEF-N`)');
  assert.deepEqual(STORE_CLOSED_SET.slice(17, 19), ['ConstraintBodyThrew', 'ConstraintRefusedAtRegistration'],
    'S-CENSUS: THE TWO APPENDED TERMS ARE THE RULING\'S OWN ARMS — the body-throw arm at `18` and the '
    + 'registration-verdict arm at `19` (`DEF-S`, `DEF-N`; *"Expand the returned error set for both S/N"*), '
    + 'and neither takes `ConstraintListInvalid`\'s rank, which keeps its own trigger');
  assert.equal(STORE_CLOSED_SET[19], 'ConstraintPassRefused',
    'S-CENSUS: rank `20` is `ConstraintPassRefused` — the ONE status a CONSTRAINT REFUSAL answers with, at a '
    + 'write\'s attempt (`DEF-H`) and at a reversal whose terminal state a registered constraint refuses '
    + '(`DEF-W`), appended LAST and taking no existing rank (`FileCommitFailed` keeps `15` and is the SAVE\'s '
    + 'code alone)');

  // AND THE NEW MEMBER IS REACHABLE THROUGH A TRIGGER THE SPEC DECLARES: the create-side validation failure.
  const { cfg } = cfgFor({ constraints: [{ address: 'a', id: 'c' }] });
  assert.throws(() => storeCreate(cfg), (err) => err.status === STORE_CLOSED_SET[15],
    'S-CENSUS: rank 16 is reachable and answers its own name — "no rank of `1`…`15` moves" is only readable '
    + 'of a set whose sixteenth member EXISTS');
});

test('fts_S_CENSUS_no_existing_trigger_is_widened_to_reach_the_new_member', async () => {
  const { commit, runAttempt } = await kernel();
  const f = newStore();
  // #1's own trigger: an argument of the wrong shape at the construction, and an absent required argument.
  assert.throws(() => storeCreate({ filePath: null, journalLength: 4, listeners: [] }),
    storeFailure('AddressMalformed', '#1 filePath: null'),
    'S-CENSUS: `AddressMalformed` still answers a shape-less construction argument and is NOT reused for '
    + 'the list\'s validation');
  assert.throws(() => storeCreate({ filePath: '', journalLength: 4, listeners: [] }),
    storeFailure('AddressMalformed', '#1 filePath: the empty string'),
    'S-CENSUS: a construction argument PRESENT and outside its domain answers `AddressMalformed` and not '
    + 'the set\'s sixteenth member — the two triggers do not overlap (`contract.md §7.1`\'s exact line: '
    + 'ABSENCE answers #12, PRESENCE with a value outside the domain answers #1)');
  // #5's own trigger, and #14's.
  const key = tag('census');
  assert.throws(() => f.store.write([key], 'disk', 1), storeFailure('OutOfDomainTier', '#5 tier'),
    'S-CENSUS: `OutOfDomainTier` is not widened and does not move');
  assert.throws(() => f.store.write([key], 'mem', undefined), storeFailure('ValueRefusedAtBoundary', '#17 value'),
    'S-CENSUS: the boundary refusal is the new last member and no existing member is widened');
  assert.equal(typeof commit, 'function', 'S-CENSUS: the kernel\'s extent stays FIVE');
  runAttempt(f.store, commit(f.store, [key], 'mem', 'ok'));
});

test('fts_S_CENSUS_the_construction_declares_four_keys_and_no_fifth_is_added', async () => {
  const f = newStore({ filePath: join(freshDir(), 'named.json'), journalLength: 4, listeners: [] });
  assert.equal(existsSync(f.cfg.filePath), true,
    'S-CENSUS: key `1` `filePath` passes THROUGH to the store without a rename — the file tier\'s own '
    + 'external location is the path the caller named');
  assert.equal(f.cfg.journalLength, 4, 'S-CENSUS: key `2` `journalLength` passes through');
  assert.deepEqual(f.cfg.listeners, [], 'S-CENSUS: key `3` `listeners` passes through');
  const withList = cfgFor({ constraints: [] });
  assert.equal(typeof storeCreate(withList.cfg), 'object',
    'S-CENSUS: key `4` `constraints` is DECLARED — the set\'s declared arity is `4` (`surface.md §2.1`\'s '
    + 'dated clause of 2026-10-15 and its `cfg` block; `parameter-semantics.md §2.21`)');
  const fifth = cfgFor({ constraints: [], extra: { constraintList: [] } });
  assert.equal(typeof storeCreate(fifth.cfg), 'object',
    'S-CENSUS: a key BEYOND the four is ignored and produces no code (`contract.md §8.1`\'s complement: "an '
    + 'unknown third key on the construction config" is not a failure) and the package adds no default, no '
    + 'rename and no fifth key of its own (`DD-36`)');
});

test('fts_S_CENSUS_no_rank_moves_and_no_second_register', async () => {
  const namespace = await import('../../bindings/js/index.mjs');
  const exported = Object.keys(namespace).sort();
  // **⟶ RE-DERIVED 2026-10-16 (`surface.md §2.9` item 1's `A127` clause; `§2.4` item 9 (f)'s `A127` clause;
  // `§2.12` item 2 (a)'s `A127` clause).** **THE NAMESPACE IS AT ONE NAME (`11 → 1`) AND EVERY STORE-REACHING
  // VERB IS A METHOD OF THE PRODUCT, so the census's subject is unmoved and its figures move with the ruling.**
  assert.equal(exported.length, 1,
    'S-CENSUS: the module namespace is at its ONE declared name — `storeCreate` (`§2.9` item 1\'s `A127` '
    + 'clause of 2026-10-16; `surface.md §2.11` clause 7)`');
  for (const name of ['settle', 'addConstraint', 'constraintOn', 'constraintOff', 'read', 'write', 'listen',
    'unlisten', 'rollback', 'readLiteral', 'delete']) {
    assert.equal(exported.includes(name), false,
      `S-CENSUS: \`${name}\` is NOT a name of the entry — it is reached through \`storeCreate\`'s own `
      + 'product alone (`§2.9` item 1\'s `A127` clause; `10 → 0` named, `11 → 1` total)');
  }
  const f = newStore();
  // ── **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE SET MOVES `13 → 12`, `10 + 1 + 1 = 12` ✓, ON THE
  // ARCHITECT'S RULING VERBATIM *"Settle is redundant because the kernel is always in the loop."***
  // (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s clause of that date, whose twelve-name set is
  // `{ read, readLiteral, write, delete, rollback, listen, unlisten, addConstraint, constraintOn, constraintOff,
  // register, constraints }` — the two singles NAMED, `register` first and `constraints` second). **The cell's
  // own subject — the
  // instance's own-property set is METHODS ONLY and carries no store data — is unmoved; `settle` alone leaves
  // and no method, no refusal, no arity, no position and no return moves with it.**
  // **⟶ RE-DERIVED 2026-10-18 AGAIN (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy
  // tail): `12 → 14`, `10 + 1 + 1 + 2 = 14` ✓**, the `2` being `removeListener` and `removeConstraint`
  // (`docs/specs/storeroom-held-listener-identity/contract.md §2.7` item 9; `removal-members.md §2`), read
  // through the clause of 2026-10-18 that moved `13 → 12`. **The row's own subject — the member set is
  // METHODS ONLY — is unmoved and `settle` is still absent.**
  assert.deepEqual(Object.getOwnPropertyNames(f.store).sort(),
    ['addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen', 'read',
      'readLiteral', 'register', 'removeConstraint', 'removeListener', 'rollback', 'unlisten', 'write'],
    'S-CENSUS: the instance\'s member set is the TEN store-reaching methods plus `register`, `constraints`, '
    + '`removeListener` and `removeConstraint` — FOURTEEN own members, `10 + 1 + 1 + 2 = 14` ✓, and '
    + 'nothing else (`docs/specs/storeroom-held-listener-identity/contract.md` §2.7 item 9); `settle` '
    + 'leaves the set at `§2.4` item 9\'s `REMOVED-WHOLE` pointer and no other member moves with it');
  for (const merged of ['on', 'off']) {
    assert.equal(Object.getOwnPropertyNames(f.store).includes(merged), false,
      `S-CENSUS: \`${merged}\` is a member of NO product — its home entry is minted by \`listen\`, its `
      + 'function placed by `register`, and `unlisten` is the withdrawal (`§2.4` item 9 (f)\'s `A127` clause)');
  }

  // **⟶ RE-DERIVED 2026-10-24 (`strata/decisions.md` `D-17`, verbatim: *"Rewrite or retire the tests that
  // point at docs. Tests are for code."*) — THE TWO DOCUMENTARY CENSUSES ARE GONE AND THE CODE CENSUS THAT
  // REPLACES THEM IS THE STORE'S OWN CLOSED STATUS SET.**
  //
  // **WHAT STOOD HERE, NAMED SO ITS ABSENCE IS LEGIBLE — TWO reads, both at documents this branch's archival
  // MOVED, which is why this cell was RED with `ENOENT`:**
  //   1. `docs/specs/storeroom-native/implementation-plan.md §10.9`'s TYPED PROPERTY REGISTER, parsed for its
  //      eight `P-IM-*`/`P-SM-*`/`P-TP-*` row ids, asserted to be exactly
  //      `['P-IM-1','P-IM-2','P-SM-3','P-SM-4','P-SM-5','P-TP-6','P-TP-7','P-TP-8']` and no ninth row.
  //   2. `docs/specs/storeroom-js/parameter-semantics.md §1`, parsed for its `PAR-JS-*` index rows, asserted
  //      to be `27` (`23 + 4`), to end at `PAR-JS-27`, and to carry no renumbering.
  // **BOTH SUBJECTS ARE A DOCUMENT'S TABLE.** A register's row count and an index's row count are carried by
  // NO observable behaviour — no getter, no record member, no thrown form, no return (`D-31`'s UNTESTABLE
  // arm) — and a cell's expectation must come from CODE (`D-17`). **THEY ARE RETIRED, NOT REWRITTEN**, and
  // what replaces them is the census this cell's own name already carries the other half of: **NO RANK
  // MOVES**, read at the store's own set.
  const errorRs = readFileSync(join(PACKAGE_DIR, '..', '..', 'src', 'error.rs'), 'utf8');
  const codesRow = /pub const CODES: \[&str; (\d+)\] = \[([\s\S]*?)\];/.exec(errorRs);
  assert.ok(codesRow !== null,
    'S-CENSUS: the store declares its closed status set as one array at `src/error.rs` — a `pub const CODES`');
  const codes = [...codesRow[2].matchAll(/"([A-Za-z]+)"/g)].map((m) => m[1]);
  assert.equal(Number(codesRow[1]), codes.length,
    'S-CENSUS: the array\'s declared arity IS the number of members it carries — a set whose length and '
    + 'whose literal disagree is a set that prints two counts');
  // **⟶ RE-DERIVED 2026-10-26 (`DEF-S`/`DEF-N`; the architect's ruling, verbatim: *"Expand the returned error
  // set for both S/N"*): THE OPERATIVE SET IS NINETEEN AND THE TWO APPENDED TERMS ARE THE BODY-THROW ARM AT
  // RANK `18` AND THE REGISTRATION-VERDICT ARM AT RANK `19`.** `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 = 19` ✓, and
  // **NO RANK OF `1`…`17` MOVES** — `ValueRefusedAtBoundary` keeps rank `17` and `ConstraintListInvalid`
  // keeps rank `16` with its own malformed-entry trigger.
  // **⟶ AND RE-DERIVED AGAIN 2026-10-26 (`DEF-H`/`DEF-W`; the architect, verbatim: *"Expand the returned
  // fail-state list to include the refusal"* and *"Assert the constraints on rollback"*): THE OPERATIVE SET IS
  // TWENTY AND THE APPENDED TERM IS `ConstraintPassRefused` AT RANK `20`.** `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1
  // = 20` ✓ and **NO RANK OF `1`…`19` MOVES** — `FileCommitFailed` keeps rank `15` and is the SAVE's code
  // alone, `ConstraintListInvalid` keeps rank `16` with its own malformed-entry trigger.
  assert.equal(codes.length, 20,
    'S-CENSUS: THE OPERATIVE SET IS TWENTY (`contract.md §8.1`\'s 2026-10-23 amendment, `A148` Q3, read '
    + 'through the 2026-10-26 rulings that append ranks `18`/`19` — *"Expand the returned error set for both '
    + 'S/N"* — and rank `20` — *"Expand the returned fail-state list to include the refusal"*); read '
    + `${JSON.stringify(codes)}`);
  assert.deepEqual(codes, [
    'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
    'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch',
    'WriteParentNotLink', 'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing',
    'FilePathUnreachable', 'ValueNotAdmitted', 'FileCommitFailed', 'ConstraintListInvalid',
    'ValueRefusedAtBoundary', 'ConstraintBodyThrew', 'ConstraintRefusedAtRegistration',
    'ConstraintPassRefused',
  ], 'S-CENSUS: NO RANK OF `1`…`19` MOVED AND THE NEW TERMS ARE APPENDED LAST — '
    + '`ValueRefusedAtBoundary` at rank `17`, `ConstraintBodyThrew` at `18`, '
    + '`ConstraintRefusedAtRegistration` at `19` and `ConstraintPassRefused` at `20`, '
    + '`11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓ (`DEF-S`/`DEF-N` and `DEF-H`/`DEF-W`, 2026-10-26), and '
    + '`ValueNotAdmitted` STAYS at rank `14` and `FileCommitFailed` at `15` — neither is a rename of any of them');
  assert.equal(new Set(codes).size, codes.length, 'S-CENSUS: every rank is distinct — the set is a set');

  assert.equal(typeof (await kernel()).register, 'function', 'S-CENSUS: no second register exists');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// ⟶ RED SET, ADDED 2026-10-15 — THE TWO `CONFLICT` CELLS AND THE ONE `FAIL` CELL OF THE GATE-5 BLIND SET
// (`tests/e2e/file-tier-save/file-tier-save-greens.md` §1's table, §5 items (i)–(iii); both paths below read
// `bindings/js/greens/file-tier-save/...` until `D-5`, 2026-10-25); its runner `tests/e2e/file-tier-save/scenarios.mjs`'s cells `FTS-04.9`, `FTS-09.5`/`FTS-09.6`, `FTS-11.5`).
// THESE DRIVES PIN THE CLAUSES AS WRITTEN AND ARE EXPECTED TO BE RED: nothing here is a re-statement of the
// blind set's own observation — each cell is DERIVED FROM ITS CLAUSE and asserts the clause's own observable.
//
//   · DRIVE 1/2 (`FTS-04.9`) — `surface.md §2.11` clause `5`: the save IS a constraint, EVALUATED LAST, so a
//     failed save is a constraint violation whose `outcome` entry carries a `KC` token and whose pass REPORTS
//     the failure; `kernel-surface.md §2.1` item `3`'s THROWS clause: a thrown failure's log carries exactly
//     ONE entry the open record did not — the `outcome` entry, whose `state` is the token the form's `status`
//     carries; item `4` (`K-4`): for a CLOSED attempt `log` returns the closed record's FINAL log, which is
//     the same list the thrown form carries; item `5` (`K-5`): `report` returns that same FINAL record.
//     BOTH INDEPENDENT ROUTES TO A FAILING SAVE ARE DRIVEN, one per drive: the path's PARENT REMOVED (§7.2
//     item 2's sibling-and-rename arm, the route this file's `S-REFUSAL` cells already use) and the parent's
//     ACCESS WITHDRAWN (`0o555`), which the blind set's `FTS-04` used and which is driven here only where the
//     host actually denies the write (a root session skips it, and the skip is reported).
//   · DRIVE 3 (`FTS-11.5`) — `surface.md §2.11` clause `6`: the repair IS PASSED THE COMMIT IT IS PART OF, and
//     a repair's write IS AN ORDINARY WRITE carrying that commit AT THE FIFTH POSITION, joining THAT commit
//     as a new entry, so the op set grows by EXACTLY ONE. The architect's ruling of 2026-10-15 is the route's
//     own declaration of how the repair obtains it: *"Repair functions are returned by the constraint that
//     they are triggered by. As externally-provided code, they should be using the package surface functions,
//     which means they will need to be passed the commit they are part of so that they can make their own
//     write call use that commit."*
//   · DRIVE 4 (`FTS-09.5` / `FTS-09.6`) — `seams-and-lifecycle.md §7.2` item `6`'s zero-length clause (a
//     zero-byte file's content is the empty text, `0` register keys load, NO code is produced) against
//     `parameter-semantics.md §2.21`'s load-side observable (a boot over an EXISTING `cfg.filePath` whose
//     loaded state no longer satisfies the SUPPLIED list answers `ConstraintListInvalid` and returns NO
//     instance) and `contract.md §8.1` #`16`'s load-side trigger. THE TWO CLAUSES ARE STILL IN CONFLICT AT
//     THE BYTES THIS PASS READ: neither text carries a reconciliation of the zero-byte case, so the drive
//     PINS the behaviour the blind set established at the bytes (zero-byte → instance, no code; a `2`-byte
//     `{}` image → `#16`, no instance, image untouched) and REPORTS the contradiction as a `D-GP-SVM-4`
//     bubble in this file's own run note rather than choosing between them here.
//   · DRIVE 5 (`FTS-04.10`, ADDED 2026-10-16, the regression drive for `DEF-2026-10-16-B`) — THE `LogKind`
//     TABLE'S OWN LAW: `kernel-surface.md §2.1` item `3`'s table declares `commit` *"the attempt's SUCCESS
//     arm, appended once"* and `outcome` *"the attempt's FAILURE arm, appended once"*, read with
//     `composition-and-states.md §2.7` items `5` and `7` (the PASSED arm's own entry sequence: the
//     `constraint-check` entries, THEN the `commit` entry, `outcome: 'passed'`, `rollback: []`) and with
//     `kernel-surface.md §2.1` item `4` (ii) (the failed save's log gains its ONE `outcome` entry — one and
//     never two — and `report()` no longer claims the passing arm). SO ONE ATTEMPT'S LOG CARRIES ONE OF THE
//     TWO ONE-SHOT ARMS AND NEVER BOTH: the failing arm carries NO `commit` entry, the PASSING arm carries it
//     exactly once, and the drive is not tied to a single trigger — the FAILING route is driven twice, once
//     per independent fixture (the path's parent REMOVED, and the parent's ACCESS WITHDRAWN `0o555`), the
//     same two routes `FTS-04.9` drives. The states enumerated for this row: (a) the failing save's log
//     (route 1) · (b) the failing save's log (route 2, where the host denies the write) · (c) the succeeding
//     save's log (the discriminate) — each read through `K-4`'s return, `K-5`'s report and the report's own
//     `log` member. THIS DRIVE IS DERIVED FROM THE CLAUSES ABOVE AND IS EXPECTED TO BE RED AT THE BYTES OF
//     2026-10-16: the run carries the entry whose own text reads *"every constraint registered at … passed;
//     the commit stands"* on an attempt whose report reads `failed`.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

/** THE KERNEL'S OWN CLOSED STATE SET'S SPELLING, READ AS `fail-surface.md §1.1` item 1 spells it. */
const KC_TOKEN = /^KC-[1-8]$/;

/** THE ONE ENTRY A THROWN FAILURE'S LOG GAINS ON THE CONSTRAINT-BODY PATH (`kernel-surface.md §2.1` item 3). */
function outcomeEntryOf(entries) {
  return entries.filter((e) => e.kind === 'outcome');
}

/**
 * THE `commit` KIND'S OWN ENTRIES — the OTHER one-shot arm. `kernel-surface.md §2.1` item 3's `LogKind`
 * table declares `commit` *"the attempt's SUCCESS arm, appended once"*, read with
 * `composition-and-states.md §2.7` items 5 and 7, where the entry stands in the PASSED arm's own sequence:
 * a reader that counts these entries reads the table's law and nothing else.
 */
function commitEntryOf(entries) {
  return entries.filter((e) => e.kind === 'commit');
}

/**
 * THE SAME FIXTURE THIS FILE'S `S-REFUSAL` ROW USES: a construction that PASSED on the kernel's own
 * reachability predicate whose parent directory is then REMOVED, so the terminal arm's sibling write and
 * rename have no directory to land in (`contract.md §7.2` item 2; `implementation-plan.md §10.13` item (b)).
 */
function removedParentFixture(label) {
  const f = newStore();
  rmSync(f.dir, { recursive: true, force: true });
  return { f, key: tag(label) };
}

test('fts_FTS_04_9_the_failed_saves_own_log_carries_the_outcome_entry_and_the_report_does_not_claim_the_passing_arm', async () => {
  const { register, commit, runAttempt, log, report } = await kernel();
  const { f, key } = removedParentFixture('fts049-removed');
  register(f.store, [key], 'fts049-c1', () => true);

  let record = null;
  try {
    record = commit(f.store, [key], 'file', 222);
  } catch (err) {
    assert.fail('FTS-04.9: the commit failure cannot stand at the verb — the verb records, installs, '
      + 'appends and RETURNS its own `WriteResult` on every tier and performs no file I/O on any of its arms '
      + `(\`contract.md §7.2\` item 1) — caught ${err && err.status} at the verb call`);
  }

  let caught = null;
  try {
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }
  assert.equal(caught && caught.status, 'FileCommitFailed',
    'FTS-04.9: THE FIXTURE\'S PREMISE — the save failed at the terminal arm and the caller met the store\'s '
    + 'own #15 answer (`contract.md §8.1` rank #15; `surface.md §2.11` clause 5)');

  // ── THE LOG: `§2.11` clause 5 read with `kernel-surface.md §2.1` item 3's THROWS clause and item 4's
  //    CLOSED-attempt arm. The failed save IS a constraint, EVALUATED LAST, so the pass reports it as it
  //    reports any other: the closed record's final log carries the `outcome` entry, and that entry's
  //    `state` is a `KC` token of the kernel's own set — the SAME token the thrown form's `status` carries.
  const entries = log(f.store, record.attempt);
  const outcome = outcomeEntryOf(entries);
  const kinds = entries.map((e) => [e.kind, e.state]);
  assert.equal(outcome.length, 1,
    'FTS-04.9: the closed attempt\'s FINAL log carries EXACTLY ONE `outcome` entry — `K-4` returns, for a '
    + 'CLOSED attempt, the closed record\'s final log, which is the same list the failure\'s thrown form '
    + 'carries (`kernel-surface.md §2.1` item 4), and a thrown failure\'s log carries exactly one entry the '
    + `open record did not: the \`outcome\` entry (item 3) — read ${JSON.stringify(kinds)}`);
  assert.ok(KC_TOKEN.test(String(outcome.length === 1 ? outcome[0].state : '')),
    'FTS-04.9: and that entry\'s `state` member carries a `KC` token of the kernel\'s own set — the save is a '
    + 'constraint EVALUATED LAST, so its failure is a constraint violation whose entry is a `KC` token, and '
    + 'the state is the same token the form\'s `status` carries (`surface.md §2.11` clause 5; '
    + '`kernel-surface.md §2.1` item 3; `fail-surface.md §1.1` items 1 and 3) — read '
    + `${JSON.stringify(outcome.map((e) => e.state))}`);

  // ── THE REPORT: the terminal answer reflects the FAILURE, and never the passing arm.
  const final = report(f.store, record.attempt);
  assert.notEqual(final.outcome, 'passed',
    'FTS-04.9: the pass reports the save\'s failure — `K-5` returns the closed attempt\'s FINAL record, and '
    + '`AttemptReport.outcome`\'s one passing value is the arm where EVERY constraint passed, the save being '
    + 'the last of them (`surface.md §2.11` clause 5; `kernel-surface.md §2.1` item 5) — read '
    + `outcome=${JSON.stringify(final.outcome)}`);

  // ── THE ROLLBACK: the report's `rollback` is the rollback that HAPPENED. The store rolled the write back
  //    on this same call — the caller met it — so a report whose only claim is the passing arm's empty list
  //    contradicts both the caller and the store's own state (`§2.11` clause 5's rollback-first half).
  assert.ok(Array.isArray(final.rollback) && final.rollback.length > 0,
    'FTS-04.9: the report carries the rollback the store PERFORMED — the failed save\'s arm is the store\'s '
    + 'own §7.2 item 3 arm, the caller met the failure inside a store already rolled back, and `rollback` is '
    + 'the member that carries what the composition did, one entry per per-op `rollback` call, `[]` on the '
    + 'SUCCESS arm alone (`surface.md §2.11` clause 5; `kernel-surface.md §2.1` item 3\'s `rollback` clause; '
    + `composition-and-states.md §2.6 item 3) — read rollback=${JSON.stringify(final.rollback)}`);
});

test('fts_FTS_04_9_the_same_failure_by_the_second_route_the_parents_access_withdrawn_reports_the_same_record_side_failure', async (t) => {
  const { register, commit, runAttempt, log, report } = await kernel();
  // THE SECOND INDEPENDENT ROUTE THE BLIND SET USED (`FTS-04`'s own start point): the parent directory's
  // ACCESS changes (`0o555`) between the construction and the save. The environment's denial is verified
  // FIRST — a direct write into that directory must fail — and a host that does not deny it (a root session)
  // SKIPS this drive rather than driving it, so the skip is a reported reason and never a silent green.
  const f = newStore();
  const key = tag('fts049-chmod');
  register(f.store, [key], 'fts049-c2', () => true);
  chmodSync(f.dir, 0o555);
  let denied = false;
  try {
    const probe = join(f.dir, '.fts049-probe');
    writeFileSync(probe, 'x');
    unlinkSync(probe);
  } catch (err) {
    denied = err && (err.code === 'EACCES' || err.code === 'EPERM');
  }
  if (!denied) {
    chmodSync(f.dir, 0o755);
    t.skip('FTS-04.9 (route 2): this host does not deny a write into a 0o555 directory (`id -u` is likely 0), '
      + 'so the second route to a failing save cannot be produced here; the removed-parent route is driven by '
      + 'the sibling cell above.');
    return;
  }

  let record = null;
  let caught = null;
  try {
    record = commit(f.store, [key], 'file', 333);
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }
  chmodSync(f.dir, 0o755);

  assert.equal(caught && caught.status, 'FileCommitFailed',
    'FTS-04.9 (route 2): the withdrawn access produced the failing save and the caller met #15 — read '
    + `${caught && caught.status}`);

  const entries = log(f.store, record.attempt);
  const outcome = outcomeEntryOf(entries);
  assert.equal(outcome.length, 1,
    'FTS-04.9 (route 2): the closed attempt\'s final log carries the `outcome` entry on THIS route too — the '
    + 'record-side failure is the pass\'s own and not the fixture\'s (`surface.md §2.11` clause 5; '
    + `kernel-surface.md §2.1 items 3–4) — read ${JSON.stringify(entries.map((e) => [e.kind, e.state]))}`);
  assert.ok(KC_TOKEN.test(String(outcome.length === 1 ? outcome[0].state : '')),
    'FTS-04.9 (route 2): and its `state` is a `KC` token of the kernel\'s own set');
  assert.notEqual(report(f.store, record.attempt).outcome, 'passed',
    'FTS-04.9 (route 2): and the terminal answer does not claim the passing arm');
});

test('fts_FTS_04_9_THE_DISCRIMINATE_a_succeeding_save_still_reports_passed_with_an_empty_rollback', async () => {
  // THE DRIVE CANNOT PASS BY INVERTING THE ANSWER WHOLESALE: the SAME call shape with a SUCCEEDING save must
  // still answer `outcome="passed"` and `rollback=[]`, and its closed log must carry NO `outcome` entry —
  // `§2.11` clause 2's passing arm and `kernel-surface.md §2.1` item 3's `rollback` clause (`[]` on the
  // success arm, an empty list and never an absent member).
  const { register, commit, runAttempt, log, report } = await kernel();
  const f = newStore();
  const key = tag('fts049-green');
  register(f.store, [key], 'fts049-c3', () => true);
  const record = commit(f.store, [key], 'file', 7);
  const ran = runAttempt(f.store, record);

  assert.equal(ran.outcome, 'passed',
    'FTS-04.9: THE DISCRIMINATE — a passing `file`-tier save reports the passing arm (`surface.md §2.11` '
    + `clause 2) — read ${JSON.stringify(ran.outcome)}`);
  assert.deepEqual(ran.rollback, [],
    'FTS-04.9: THE DISCRIMINATE — and its `rollback` is the empty list, never an absent member '
    + `(\`kernel-surface.md §2.1\` item 3) — read ${JSON.stringify(ran.rollback)}`);
  const final = report(f.store, record.attempt);
  assert.equal(final.outcome, 'passed',
    'FTS-04.9: THE DISCRIMINATE — the terminal answer over the same closed attempt is the same record and '
    + 'still the passing arm (`kernel-surface.md §2.1` item 5)');
  assert.deepEqual(final.rollback, [], 'FTS-04.9: THE DISCRIMINATE — with the empty rollback');
  assert.equal(outcomeEntryOf(log(f.store, record.attempt)).length, 0,
    'FTS-04.9: THE DISCRIMINATE — a log that gained an `outcome` entry on the PASSING arm would be a '
    + 'failure too: the entry is the thrown arm\'s alone (`kernel-surface.md §2.1` item 3)');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// ⟶ RED SET, ADDED 2026-10-16 — `FTS-04.10`: THE TWO ONE-SHOT ARMS DO NOT COEXIST IN ONE ATTEMPT'S LOG
// (`DEF-2026-10-16-B`; `tests/e2e/file-tier-save/file-tier-save-greens.md`'s `FTS-04.10` — that path read `bindings/js/greens/file-tier-save/file-tier-save-greens.md` until `D-5`, 2026-10-25)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('fts_FTS_04_10_a_failing_saves_log_carries_the_outcome_entry_and_no_commit_entry', async () => {
  // THE `LogKind` TABLE READ AT ITS OWN ROW (`kernel-surface.md §2.1` item 3, verbatim):
  //   `commit`  = "the attempt's SUCCESS arm, appended once"  (`id` `null` · `opId` the attempt's last op ·
  //                                                            `state` `null`)
  //   `outcome` = "the attempt's FAILURE arm, appended once"  (`id` `null` · `opId` the attempt's last op ·
  //                                                            `state` the kernel's own `KC` token)
  // READ WITH `composition-and-states.md §2.7` ITEM 5 — *"one `constraint-check` entry per registered pair is
  // appended, THEN the `commit` entry; the registry entry is REMOVED ... an `AttemptReport` with
  // `outcome: 'passed'` and `rollback: []` is RETURNED"* — and ITEM 7, whose repaired pass carries *"a
  // `commit` entry, and `rollback: []`"*: THE `commit` ENTRY IS THE PASSED ARM'S ENTRY, APPENDED ONCE, AND IT
  // STANDS IN NO OTHER ARM'S LOG. AND THE FAILED SAVE'S OWN CLAUSE, CITED SO THE READING IS DERIVED AND NOT
  // INVENTED: `kernel-surface.md §2.1` item 4 (ii) — *"THE ATTEMPT'S LOG GAINS ITS ONE `outcome` ENTRY — ONE
  // AND NEVER TWO — AND THAT ENTRY IS THE TERMINAL ANSWER"* — with `K-4` and `K-5` reading that one closed
  // record (`§2.1` items 4–5; `attempt-lifecycle.md §2.4` item 7's five-member closed `AttemptReport`).
  // SO ONE ATTEMPT'S LOG CARRIES ONE OF THE TWO ONE-SHOT ARMS AND NEVER BOTH; a `commit` entry on this arm
  // contradicts THE ENTRY'S OWN DECLARED TEXT, and the drive's red is the run.
  const { register, commit, runAttempt, log, report } = await kernel();
  const { f, key } = removedParentFixture('fts0410-removed');
  register(f.store, [key], 'fts0410-c1', () => true);

  let record = null;
  try {
    record = commit(f.store, [key], 'file', 222);
  } catch (err) {
    assert.fail('FTS-04.10: the save failure cannot stand at the verb — `Store::write` records, installs, '
      + 'appends and RETURNS its `WriteResult` on every tier and performs no file I/O on any of its arms '
      + `(\`storeroom-native/contract.md §7.2\` item 1) — caught ${err && err.status} at the verb call`);
  }

  let caught = null;
  try {
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }
  assert.equal(caught && caught.status, 'FileCommitFailed',
    'FTS-04.10: THE FIXTURE\'S PREMISE — the save failed at the terminal arm and the caller met the store\'s '
    + 'own #15 answer (`storeroom-native/contract.md §8.1` rank #15; `surface.md §2.11` clause 5) — read '
    + `${caught && caught.status}`);

  // ── THE PIN: an attempt whose save did NOT stand appends the FAILURE arm's entry and NO `commit` entry.
  const entries = log(f.store, record.attempt);
  assert.equal(commitEntryOf(entries).length, 0,
    'FTS-04.10: NO `commit` ENTRY STANDS IN THE LOG OF AN ATTEMPT WHOSE SAVE DID NOT STAND — the `LogKind` '
    + 'table declares `commit` the attempt\'s SUCCESS arm, appended once, and `outcome` the attempt\'s FAILURE '
    + 'arm, appended once, so the two one-shot arms never stand in one log; the `commit` entry belongs to the '
    + 'PASSED arm\'s own sequence and to no other (`kernel-surface.md §2.1` item 3\'s `LogKind` table read with '
    + '`composition-and-states.md §2.7` items 5 and 7, and with `kernel-surface.md §2.1` item 4 (ii)\'s ONE '
    + '`outcome` entry — one and never two — as this arm\'s terminal answer) — read '
    + JSON.stringify(entries.map((e) => [e.kind, e.state, e.message])));

  // ── AND THE CELL CANNOT PASS BY EMPTYING THE LOG OR BY DROPPING THE FAILURE ARM'S OWN ENTRY.
  assert.equal(entries.filter((e) => e.kind === 'constraint-check').length, 1,
    'FTS-04.10: AND THE PASS\'S OWN EVALUATED PREFIX STANDS — the one registered pair appended its '
    + '`constraint-check` entry, one per registered pair (`composition-and-states.md §2.7` item 5 read with '
    + 'item 12 (i), the evaluated-prefix rule) — read ' + JSON.stringify(entries.map((e) => e.kind)));
  const outcome = outcomeEntryOf(entries);
  assert.equal(outcome.length, 1,
    'FTS-04.10: AND THE FAILURE ARM\'S OWN ENTRY IS THERE, EXACTLY ONCE — `kernel-surface.md §2.1` item 4 '
    + '(ii), verbatim: the attempt\'s log gains its ONE `outcome` entry, one and never two — read '
    + JSON.stringify(entries.map((e) => [e.kind, e.state])));
  assert.ok(KC_TOKEN.test(String(outcome.length === 1 ? outcome[0].state : '')),
    'FTS-04.10: and that entry\'s `state` carries a `KC` token of the kernel\'s own set '
    + '(`kernel-surface.md §2.1` item 3\'s `outcome` row; `fail-surface.md §1.1` item 1) — read '
    + `${JSON.stringify(outcome.map((e) => e.state))}`);

  // ── THE RECORD-SIDE READERS, UNDISTURBED: `K-5`'s report and the `log` member it carries are the same
  //    FAILED arm the caller met, and neither claims the passing arm.
  const final = report(f.store, record.attempt);
  assert.equal(final.outcome, 'failed',
    'FTS-04.10: THE CORRECT READING IS NOT DISTURBED — the closed attempt\'s record reads the FAILED arm and '
    + 'never the passing one (`kernel-surface.md §2.1` item 4 (ii) and item 5; `attempt-lifecycle.md §2.4` '
    + `item 7) — read ${JSON.stringify(final.outcome)}`);
  assert.ok(Array.isArray(final.rollback) && final.rollback.length > 0,
    'FTS-04.10: and its `rollback` is the rollback the composition PERFORMED — `[]` is the success arm\'s '
    + 'alone (`kernel-surface.md §2.1` item 3\'s `rollback` clause; `composition-and-states.md §2.6` item 3) — '
    + `read rollback=${JSON.stringify(final.rollback)}`);
  assert.equal(commitEntryOf(final.log).length, 0,
    'FTS-04.10: and the report\'s OWN `log` member is that same list — `K-5` returns the closed record whose '
    + '`log` member is the one `K-4` returns for a closed attempt (`kernel-surface.md §2.1` items 4 and 5) — '
    + 'read ' + JSON.stringify(final.log.map((e) => [e.kind, e.state])));
});

test('fts_FTS_04_10_THE_SECOND_ROUTE_the_withdrawn_access_leaves_no_commit_entry_either', async (t) => {
  // THE SAME LAW, DRIVEN ON THE SECOND INDEPENDENT ROUTE TO A FAILING SAVE (`FTS-04.9`'s own route 2): the
  // parent directory's ACCESS changes (`0o555`) between the construction and the save, so the drive is not
  // tied to a single trigger. The environment's denial is verified FIRST and a host that does not deny the
  // write (a root session) SKIPS this drive rather than driving it, so the skip is a reported reason and
  // never a silent green.
  const { register, commit, runAttempt, log, report } = await kernel();
  const f = newStore();
  const key = tag('fts0410-chmod');
  register(f.store, [key], 'fts0410-c2', () => true);
  chmodSync(f.dir, 0o555);
  let denied = false;
  try {
    const probe = join(f.dir, '.fts0410-probe');
    writeFileSync(probe, 'x');
    unlinkSync(probe);
  } catch (err) {
    denied = err && (err.code === 'EACCES' || err.code === 'EPERM');
  }
  if (!denied) {
    chmodSync(f.dir, 0o755);
    t.skip('FTS-04.10 (route 2): this host does not deny a write into a 0o555 directory (`id -u` is likely 0), '
      + 'so the second route to a failing save cannot be produced here; the removed-parent route is driven by '
      + 'the sibling cell above.');
    return;
  }

  let record = null;
  let caught = null;
  try {
    record = commit(f.store, [key], 'file', 333);
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }
  chmodSync(f.dir, 0o755);

  assert.equal(caught && caught.status, 'FileCommitFailed',
    'FTS-04.10 (route 2): the withdrawn access produced the failing save and the caller met #15 — read '
    + `${caught && caught.status}`);

  const entries = log(f.store, record.attempt);
  assert.equal(commitEntryOf(entries).length, 0,
    'FTS-04.10 (route 2): NO `commit` ENTRY STANDS ON THIS ROUTE EITHER — the residue is not an artefact of '
    + 'the removed-parent fixture, and the `LogKind` table binds every arm that reaches the failing save '
    + '(`kernel-surface.md §2.1` item 3 read with `composition-and-states.md §2.7` items 5 and 7) — read '
    + JSON.stringify(entries.map((e) => [e.kind, e.state, e.message])));
  assert.equal(outcomeEntryOf(entries).length, 1,
    'FTS-04.10 (route 2): and the FAILURE arm\'s own entry is the attempt\'s single `outcome` entry — one and '
    + 'never two (`kernel-surface.md §2.1` item 4 (ii)) — read '
    + JSON.stringify(entries.map((e) => [e.kind, e.state])));
  assert.equal(report(f.store, record.attempt).outcome, 'failed',
    'FTS-04.10 (route 2): and the terminal answer does not claim the passing arm (`kernel-surface.md §2.1` '
    + 'item 5)');
});

test('fts_FTS_04_10_THE_DISCRIMINATE_a_succeeding_saves_log_carries_the_commit_entry_once_and_last', async () => {
  // THE OTHER HALF OF THE SAME LAW, SO THE CELL CANNOT PASS BY REMOVING THE ENTRY WHOLESALE: on a save that
  // DID stand, the `LogKind` table's `commit` row is produced — the entry IS appended, EXACTLY ONCE, as the
  // PASSED arm's LAST entry (`composition-and-states.md §2.7` item 5: *"one `constraint-check` entry per
  // registered pair is appended, THEN the `commit` entry"*; item 7's repaired pass carries it too), and its
  // three declared columns are the table's own: `id` `null`, `opId` the attempt's last op, `state` `null`.
  const { register, commit, runAttempt, log, report } = await kernel();
  const f = newStore();
  const key = tag('fts0410-green');
  register(f.store, [key], 'fts0410-c3', () => true);
  const record = commit(f.store, [key], 'file', 7);
  const ran = runAttempt(f.store, record);
  const final = report(f.store, record.attempt);
  const entries = log(f.store, record.attempt);
  const commits = commitEntryOf(entries);

  assert.equal(commits.length, 1,
    'FTS-04.10: THE DISCRIMINATE — a save that stood appends the `commit` entry, APPENDED ONCE: neither `0` '
    + '(the entry removed wholesale) nor `2` (a second append) is the table\'s law (`kernel-surface.md §2.1` '
    + 'item 3\'s `commit` row; `composition-and-states.md §2.7` item 5) — read '
    + JSON.stringify(entries.map((e) => [e.kind, e.state])));
  assert.equal(entries[entries.length - 1].kind, 'commit',
    'FTS-04.10: THE DISCRIMINATE — and it is the PASSED arm\'s LAST entry, appended AFTER the pass\'s '
    + '`constraint-check` entries (`composition-and-states.md §2.7` item 5: *"then the `commit` entry"*) — read '
    + JSON.stringify(entries.map((e) => e.kind)));
  assert.equal(commits[0].id, null,
    'FTS-04.10: THE DISCRIMINATE — and its declared columns are the table\'s own: `id` `null` '
    + '(`kernel-surface.md §2.1` item 3\'s `commit` row) — read ' + JSON.stringify(commits[0].id));
  assert.equal(commits[0].opId, final.ops[final.ops.length - 1].opId,
    'FTS-04.10: THE DISCRIMINATE — and its `opId` is THE ATTEMPT\'S LAST OP, the same value the report\'s '
    + '`ops` carries last (`kernel-surface.md §2.1` item 3\'s `commit` row and item 3\'s `ops` clause: every op '
    + 'the attempt created, in CREATION order) — read '
    + `${JSON.stringify(commits[0].opId)} against ${JSON.stringify(final.ops.map((o) => o.opId))}`);
  assert.equal(commits[0].state, null,
    'FTS-04.10: THE DISCRIMINATE — and its `state` is `null`: the `KC` token belongs to the `outcome` row '
    + 'alone (`kernel-surface.md §2.1` item 3\'s two rows) — read ' + JSON.stringify(commits[0].state));
  assert.equal(outcomeEntryOf(entries).length, 0,
    'FTS-04.10: THE DISCRIMINATE — and the FAILURE arm\'s entry stands in no passing log, so the two one-shot '
    + 'arms do not coexist here either (`kernel-surface.md §2.1` item 3) — read '
    + JSON.stringify(entries.map((e) => [e.kind, e.state])));
  assert.equal(final.outcome, 'passed',
    'FTS-04.10: THE DISCRIMINATE — the terminal answer over the same closed attempt is the passing arm '
    + '(`composition-and-states.md §2.7` item 5; `kernel-surface.md §2.1` item 5)');
  assert.deepEqual(final.rollback, [],
    'FTS-04.10: THE DISCRIMINATE — with the success arm\'s empty `rollback`, an empty list and never an '
    + 'absent member (`kernel-surface.md §2.1` item 3\'s `rollback` clause)');
  assert.equal(ran.outcome, 'passed',
    'FTS-04.10: THE DISCRIMINATE — and `K-3`\'s own return reads the same arm (`kernel-surface.md §2.1` '
    + 'item 3; `surface.md §2.11` clause 2)');
});

test('fts_FTS_11_5_a_repairs_write_carries_the_commit_it_is_part_of_at_the_fifth_position_and_joins_that_commit', async () => {
  // `surface.md §2.11` clause 6, verbatim: *"A repair function IS RETURNED BY THE CONSTRAINT THAT TRIGGERED
  // IT and IS PASSED THE COMMIT IT IS PART OF, so ITS OWN WRITE JOINS THAT COMMIT AS A NEW ENTRY and the
  // commit's op set grows by exactly one per repair write."* **"A REPAIR'S WRITE IS AN ORDINARY WRITE OF THIS
  // SURFACE SUBJECT TO EVERY CLAUSE ABOVE: it carries the commit the constraint passed it, at the fifth
  // position this section's §2.2 fixes, and its own save is its own terminal arm's act."**
  //
  // THE ROUTE, AS THE ARCHITECT DECLARED IT (2026-10-15, quoted at `docs/decisions.md` and in the blind set's
  // §5 item (iii)): *"Repair functions are returned by the constraint that they are triggered by. As
  // externally-provided code, they should be using the package surface functions, which means they will need
  // to be passed the commit they are part of so that they can make their own write call use that commit."*
  //
  // SO THE DRIVE PINS THE ROUTE AS REACHABLE AND NOT A POSITION-ABSENT SUBSTITUTE: the repair takes the one
  // object the KERNEL hands it and passes it at the fifth position of its own `write`, and the clause's own
  // arithmetic is read beside it (the op set grows by exactly one, and no second commit opens).
  const { register, commit, runAttempt, report } = await kernel();
  const f = newStore();
  const key = tag('fts115-route');
  let repairs = 0;
  let refusal = null;
  let repairWrite = null;

  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1 — AND `3-bis` MAKES IT MANDATORY: this body carries a
  // `repair`, so an unshielded registration ATTEMPTS it and `repairs`/`repairWrite`/`refusal` are all set by a
  // call that belongs to the registration, while this cell's own `repairs === 1` speaks of the WRITE's repair.
  register(f.store, [key], 'fts115-c1', atLandingOnly((ctx) => {
    if (ctx.value === 'repaired') return true;
    return {
      message: 'the landed value contradicts the shape this pair confirms',
      // THE REPAIR: one argument, the context the kernel hands it — and NO OTHER VALUE IS IN SCOPE FOR THE
      // COMMIT POSITION, because the commit it is part of is exactly what clause 6 says it was passed.
      repair: (rc) => {
        repairs += 1;
        let w = null;
        try {
          w = f.store.write([key], 'file', 'repaired', rc);
        } catch (err) {
          refusal = err;
          return { ok: false, message: 'the repair could not carry its own commit' };
        }
        repairWrite = w;
        return { ok: true, op: w.op };
      },
    };
  }));

  const record = commit(f.store, [key], 'file', 'broken');
  let caught = null;
  try {
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }

  assert.equal(repairs, 1, 'FTS-11.5: the repair returned by the constraint that triggered it ran once');
  assert.equal(caught, null,
    'FTS-11.5: THE ROUTE IS REACHABLE — a repair that passes its own context at the fifth position performs '
    + 'its own write, and the attempt does not refuse it: the context the kernel hands a repair carries (or '
    + 'carried, in this drive\'s own variable `rc`) the commit that repair is part of — `surface.md §2.11` '
    + 'clause 6 read with `kernel-surface.md §2.1` item 1\'s dated fifth-position clause, whose words are *"THE '
    + 'FIFTH POSITION CARRYING THE `CommitRecord` THE CALLER\'S OWN `K-2` RETURNED, WHICH IS EXACTLY THE COMMIT '
    + 'THE REPAIR A CONSTRAINT RETURNED IS PASSED"*. Where it does not, the clause\'s own route is unreachable: '
    + `the repair's write was refused ${refusal && refusal.constructor && refusal.constructor.name}: `
    + `${refusal && refusal.message}`);
  assert.ok(repairWrite !== null,
    'FTS-11.5: and the store answered the repair\'s write with its own `WriteResult` — a repair\'s write is an '
    + 'ORDINARY write of this surface (`contract.md §7.2` item 1; `kernel-surface.md §2.3` item 2)');

  const final = report(f.store, record.attempt);
  assert.equal(final.ops.length, 2,
    'FTS-11.5: THE CLAUSE\'S OWN ARITHMETIC — the repair\'s write JOINS THAT COMMIT AS A NEW ENTRY and the '
    + 'commit\'s op set grows by EXACTLY ONE: the write\'s own op first, the repair\'s op beside it, both in '
    + 'the SAME commit (`surface.md §2.11` clause 6; `kernel-surface.md §2.1` items 2–3) — read '
    + `ops=${final.ops.length}`);
  assert.equal(new Set(final.ops.map((o) => o.opId)).size, 2,
    'FTS-11.5: the repair\'s write is a NEW ENTRY and not a second identity for the first op');
  assert.equal(final.outcome, 'passed',
    'FTS-11.5: and the repaired pair passes on the re-run, so the repair\'s own save is its own terminal arm\'s '
    + 'act and no second commit was opened (`surface.md §2.11` clause 6)');
});

test('fts_FTS_09_zero_byte_file_boots_an_instance_while_a_two_byte_empty_image_is_validated_and_refused', async () => {
  // THE TWO HALVES, EACH CITED. HALF ONE: `seams-and-lifecycle.md §7.2` item 6's zero-length clause — *"a
  // `storeCreate` over a PROVIDED, ABSENT path now REACHES THIS ITEM WITH A FILE THAT EXISTS AND CARRIES `0`
  // BYTES — so item 6's "loaded if the file exists" is read on a ZERO-LENGTH FILE: the content is the empty
  // text, `0` register keys load, `0` registrations load, and NO code is produced"* (`contract.md §7.1` step
  // `4`-bis/`4`b; `contract.md §10.4` part 3; `DD-28`'s amended cell). HALF TWO (the DISCRIMINATOR): the
  // exemption is keyed on the FILE's BYTES and not on the loaded state — a `2`-byte `{}` image against the
  // SAME supplied list IS validated and answers `ConstraintListInvalid`, the closed set's sixteenth member,
  // with NO instance and the image untouched (`parameter-semantics.md §2.21`'s load-side observable;
  // `contract.md §7.2` item 6 as amended; `§8.1` #`16`).
  //
  // THE TWO CLAUSES ARE STILL IN CONFLICT ON HALF ONE'S INPUT CLASS AT THE BYTES THIS PASS READ — §7.2 item
  // 6's zero-length clause exempts the zero-length file, while §2.21's load-side observable, whose trigger
  // `§8.1` #16 repeats as the validation "of the LOADED STATE against that supplied list at load", declares
  // that such a boot answers `ConstraintListInvalid` and returns NO instance — and NEITHER TEXT CARRIES A
  // RECONCILIATION OF THE ZERO-BYTE CASE. THIS DRIVE THEREFORE PINS BOTH HALVES AT THEIR BYTES AND REPORTS THE
  // CONTRADICTION AS A `D-GP-SVM-4` BUBBLE; the reconciliation is the specification's to land, and no clause
  // of either part may be read as settling it here.
  const { report } = await kernel();
  const key = tag('fts09-list');
  // **⟶ AMENDED 2026-10-24 (`D-26` item 1: *"The batch in cfg.constraints must supply functions"*): the
  // supplied element carries its own function, because the element is THREE members and a functionless one is
  // refused `ConstraintListInvalid` BEFORE ANY FILESYSTEM ACT — which would make both halves of this drive
  // into `B-1`'s refusal and retire the load-side question they exist to pin.**
  const supplied = [{ address: [key], id: 'fts09-c1', constraint: () => true }];

  // HALF ONE: the construction's own exclusive create leaves a ZERO-BYTE file over a fresh path, and a second
  // construction over it — same `cfg.filePath`, a NON-EMPTY supplied list — is driven.
  const d1 = freshDir();
  const zeroPath = join(d1, 'zero.json');
  const first = storeCreate({ filePath: zeroPath, journalLength: 8, listeners: [] });
  assert.equal(statSync(zeroPath).size, 0,
    'FTS-09.5: THE FIXTURE\'S PREMISE — a successful exclusive create produces an EMPTY FILE AND NO BYTE, the '
    + 'file\'s length being `0` (`contract.md §7.1` step `4`b; `§10.4` part 3)');
  assert.equal(typeof first, 'object', 'FTS-09.5: and that construction returned its instance');

  let second = null;
  let secondRefused = null;
  try {
    second = storeCreate({ filePath: zeroPath, journalLength: 8, listeners: [], constraints: supplied });
  } catch (err) {
    secondRefused = err;
  }
  assert.equal(secondRefused, null,
    'FTS-09.5: HALF ONE — a boot over the ZERO-LENGTH file answers NO CODE: "the content is the empty text, '
    + '`0` register keys load, `0` registrations load, and NO code is produced", an instance state-identical '
    + 'to the one a construction over an absent file produced (`seams-and-lifecycle.md §7.2` item 6\'s '
    + 'zero-length clause; `contract.md §7.1` step `4`b; `DD-38`). WHERE THIS FAILS, THE OTHER LIVE CLAUSE '
    + 'GOVERNS AND THE TWO READ APART: `parameter-semantics.md §2.21`\'s load-side observable, whose trigger '
    + '`contract.md §8.1` #`16` repeats, declares that a boot over an EXISTING `cfg.filePath` whose loaded '
    + 'state no longer satisfies the SUPPLIED list answers `ConstraintListInvalid` and returns NO instance — '
    + 'and the zero-byte file\'s loaded state satisfies no non-empty list. NO CLAUSE RECONCILES THE TWO, so '
    + 'this cell is a `D-GP-SVM-4` bubble and not a drive against the package — read '
    + `${secondRefused && secondRefused.status} :: ${secondRefused && secondRefused.message}`);
  assert.equal(typeof second, 'object', 'FTS-09.5: HALF ONE — the instance is returned');
  assert.deepEqual(second.read([], 'file'), {},
    'FTS-09.5: HALF ONE — and its register carries `0` register keys, the loaded empty text\'s own reading');
  assert.equal(bytesOf(zeroPath), '',
    'FTS-09.5: HALF ONE — the boot is a read: the zero-byte file is still zero bytes');

  // HALF TWO, THE DISCRIMINATOR: the SAME supplied list against a NON-zero-length image carrying an empty
  // state (`{}`) — `2` bytes — IS validated and refused, so the exemption cannot be read as "an empty state
  // is exempt".
  const d2 = freshDir();
  const twoPath = join(d2, 'two.json');
  writeFileSync(twoPath, '{}');
  assert.equal(statSync(twoPath).size, 2, 'FTS-09.6: the discriminator\'s image is `2` bytes and not zero');
  let refused = null;
  let instance = null;
  try {
    instance = storeCreate({ filePath: twoPath, journalLength: 8, listeners: [], constraints: supplied });
  } catch (err) {
    refused = err;
  }
  assert.equal(instance, null, 'FTS-09.6: no instance is returned for the `{}` image');
  assert.equal(refused && refused.status, 'ConstraintListInvalid',
    'FTS-09.6: the `2`-byte `{}` image against the same supplied list IS validated and answers the closed '
    + 'set\'s sixteenth member (`contract.md §8.1` #`16`; `parameter-semantics.md §2.21`; `§7.2` item 6 as '
    + `amended) — read ${refused && refused.status}`);
  // **RE-DERIVED TO THE THREE-MEMBER FORM 2026-10-16** — the discriminated `{}`-image refusal is the same
  // `cfg`-side class of construction refusal, so `surface.md §2.5` item 4's own `log: []` enumeration
  // governs it. **THE CELL'S OTHER LIMB IS UNMOVED**: no package-side code and no package-side message is
  // minted for this arm, which is asserted by the code and message limbs around this one.
  assert.deepEqual(Object.keys(refused || {}).sort(), ['log', 'message', 'status'],
    'FTS-09.6: in the surface\'s THREE-member form — FLAT across arms, sorted ascending (surface.md §2.5 '
    + 'item 4; item 9) — and never a package-side code or message '
    + '(`surface.md §2.5`; `parameter-semantics.md §2.21`\'s declared-answer cell)');
  assert.equal(Object.keys(refused || {}).length, 3,
    'FTS-09.6: and the member set\'s length is `3` on this refused boot as on every arm '
    + '(`surface.md §2.5` item 9)');
  assert.ok(Array.isArray(refused && refused.log),
    'FTS-09.6: `log` is an ARRAY on the load-side refusal too — never absent, never `null`, never a '
    + 'non-array (`surface.md §2.5` item 9; `parameter-semantics.md §2.26`\'s `domain` cell)');
  assert.deepEqual(refused && refused.log, [],
    'FTS-09.6: and the refused boot returns NO instance and opens NO attempt, so the DECLARED value is '
    + '`[]` — never a placeholder entry (`surface.md §2.5` item 4)');
  assert.equal(bytesOf(twoPath), '{}',
    'FTS-09.6: and the refused boot is a read — the image is BYTE-IDENTICAL (`contract.md §7.2` item 2)');
  assert.equal(typeof report, 'function', 'FTS-09.6: the kernel\'s fifth item is untouched by this cell');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// ⟶ RED SET, ADDED 2026-10-16 — THE TWO COVERAGE GAPS THE READ-ONLY WITNESS NAMED IN THIS SUITE, EACH
// DRIVEN AT ITS OWN `§` AND NEITHER DERIVED FROM A BUILD.
//
//   · GAP 1 (`S-REPAIR-CTX`) — `kernel-surface.md §2.3` ITEM 2, the member added 2026-10-15 in the shape
//     block it prints: `pending: Handle[]`, *"THE COMMIT'S OWN `CommitRecord.pending`, THE COMMIT THE REPAIR
//     IS PART OF, HANDED AS A FRESH LIST"*, read with the same item's provenance clause — *"the value handed
//     is THE COMMIT'S OWN `pending` ... read VERBATIM AND HANDED AS A FRESH LIST (`slice()`), so the record's
//     own member is NOT ALIASED and a repair that mutated its context's list would move nothing on the
//     commit"* — with `§1` item 4's `6`-member census (`5 + 1 = 6` ✓), `§2.3` item 5 (no other shape's count
//     moves), and item 2's own class-test bullet (`§2.3` item 2, *"the position reads THIS member and not the
//     record"*; `docs/specs/storeroom-js/surface.md §2.4` item 9 (g) item 1; `PAR-JS-20`). THE GREENS LAYER
//     PRINTS THIS SHAPE AND ASSERTS NONE OF IT (`file-tier-save-greens.md`'s `FTS-11.1`, whose `rc.pending` is
//     read as an OBJECT and whose member NAMES alone are pinned), which is exactly the gap `§2.3` item 4 (d)
//     records as OWED to `role_test_writer`. THE STATES THIS GROUP DRIVES: the member set read by name
//     (`6` ✓, closed) · the member's declared TYPE read as an array · the member read on a second state of
//     the SAME repair (`pending.length` at the instant of the copy read twice) · the member's PROVENANCE read
//     as a fresh list (`!==` the record's own member) · THE MUTATION the provenance clause names · and the
//     repair's write read as JOINING that commit (`surface.md §2.11` clause 6).
//   · GAP 2 (`S-UNREPAIRABLE`) — `docs/specs/storeroom-js/surface.md §2.11` CLAUSE 5, *"THE SAVE IS EVALUATED
//     AS THE LAST CONSTRAINT OF THE WRITE, SO A SAVE THAT FAILS IS A CONSTRAINT VIOLATION AND IS NOT
//     REPAIRABLE BY ANY REPAIR FUNCTION"*, read with the dated clause that follows clause 7 and names this
//     cell's own revisit condition — *"a driven state in which a repair IS registered for the save's own pair
//     and the save fails notwithstanding — the repair body never running for that arm, so the observable is a
//     repair-invocation count of `0` on the failing save"* — and with `kernel-surface.md §2.1` item 3's
//     `outcome` member and item 5's `K-5` (the FINAL record of the arm that TERMINATED the attempt), item 3's
//     THROWS clause (the `outcome` entry carries the `KC` token the form's `status` carries) and item 3's
//     instant (b) (the failing arm's seam reaches ZERO handles, *"so the failing arm's seam reaches ZERO
//     handles and reports nothing"*). THE WORD *"UNREPAIRABLE"* IS THEREFORE OBSERVABLE AS THE DATED CLAUSE
//     PINNED IT: an increment attributable to the save's own failure NEVER appears, and the attempt's terminal
//     answer is the failure arm's own `outcome` entry and report.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * THE ONE REPAIR FIXTURE BOTH CELLS OF THE FIRST GROUP READ (`kernel-surface.md §2.3` item 2). The constraint
 * is registered for ONE pair of the write's own set and returns the repair function only where the landed
 * value is not the one it confirms — so the repair is RETURNED BY THE CONSTRAINT THAT TRIGGERED IT
 * (`docs/specs/storeroom-js/surface.md §2.11` clause 6) and its own write carries the ONE object the kernel
 * hands it at the fifth position of this surface's `write` (`§2.2`'s dated clause of 2026-10-15).
 *
 * `beforeSave` is the fixture's own act between `K-2`'s return and the terminal arm, which is where the two
 * independent routes to a failing save stand (`contract.md §7.2` item 1: the verb performs no file I/O on any
 * of its arms, so the save's failure cannot stand at the verb).
 */
function repairContextFixture(k, label, beforeSave) {
  const { register, commit, runAttempt } = k;
  const f = newStore();
  const key = tag(label);
  const seen = {
    invoked: false, ctx: null, ctxMembers: null, pendingIsArray: null, pendingEntries: null,
    pendingLenAtCopy: null, pendingIsTheRecordsOwnList: null, recordPendingAtCopy: null,
    recordPendingLenAtCopy: null, sentinelMovedNothing: null,
    pendingAtRepair: null, recordPendingAfterRepair: null, afterRepairLen: null,
    repairOrder: -1, write: null, refusal: null, strippedRefusal: null, order: [],
  };
  let record = null;
  const SENTINEL = tag('s-repair-ctx-sentinel');

  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1 — and `3-bis` makes the shield mandatory: every member this
  // fixture records is recorded FROM THE REPAIR THE ATTEMPT'S OWN WRITE TRIGGERED, and an unshielded
  // registration would ATTEMPT the repair first and fill `seen` from the registration's synthetic attempt.
  register(f.store, [key], `${label}-c1`, atLandingOnly((ctx) => {
    if (ctx.value === 'repaired') { seen.order.push('re-run:passed'); return true; }
    return {
      message: 'the landed value contradicts the shape this pair confirms',
      repair: (rc) => {
        seen.invoked = true;
        seen.ctx = rc;
        seen.ctxMembers = Object.keys(rc).sort();
        seen.pendingIsArray = Array.isArray(rc.pending);
        seen.pendingEntries = Array.isArray(rc.pending) ? rc.pending.map((h) => typeof h) : null;
        seen.pendingLenAtCopy = Array.isArray(rc.pending) ? rc.pending.length : null;
        // THE RECORD'S OWN MEMBER, READ AT THE SAME INSTANT AND AS THE SAME OBJECT: `commit`'s return is the
        // record this call's `K-2` built (`§2.1` item 2), and `attempt.record` names it.
        seen.recordPendingAtCopy = record === null ? null : record.pending;
        seen.recordPendingLenAtCopy = Array.isArray(seen.recordPendingAtCopy)
          ? seen.recordPendingAtCopy.length : null;
        seen.pendingIsTheRecordsOwnList = rc.pending === seen.recordPendingAtCopy;
        // THE MUTATION THE PROVENANCE CLAUSE NAMES, TAKEN BEFORE THE REPAIR'S OWN WRITE.
        if (Array.isArray(rc.pending)) rc.pending.push(SENTINEL);
        seen.sentinelMovedNothing = Array.isArray(seen.recordPendingAtCopy)
          ? seen.recordPendingAtCopy.includes(SENTINEL) === false : null;
        seen.pendingAtRepair = Array.isArray(rc.pending) ? rc.pending.slice() : null;
        try {
          seen.write = f.store.write([key], 'file', 'repaired', rc);
          seen.repairOrder = seen.order.length;
          seen.order.push('repair:write-landed');
          seen.afterRepairLen = Array.isArray(record.pending) ? record.pending.length : null;
          seen.recordPendingAfterRepair = Array.isArray(record.pending) ? record.pending.slice() : null;
          return { ok: true, op: seen.write.op };
        } catch (err) {
          seen.refusal = err;
          return { ok: false, message: 'the repair could not carry its own commit' };
        }
      },
    };
  }));

  record = commit(f.store, [key], 'file', 'broken');
  if (beforeSave) beforeSave(f);
  let report_ = null;
  let caught = null;
  try {
    report_ = runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }
  return { f, key, record, report: report_, caught, seen, SENTINEL };
}

test('fts_S_REPAIR_CTX_the_context_the_kernel_hands_a_repair_carries_exactly_the_six_declared_members_and_pending_is_an_array', async () => {
  // `kernel-surface.md §2.3` item 2's shape block: the declared order is `op` · `address` · `id` · `value` ·
  // `tier` · `pending`, the sixth being the member added 2026-10-15 (`§1` item 4's `5 + 1 = 6` ✓, `§2.3`
  // item 5: `AttemptContext` stays at `5` and NO OTHER SHAPE'S COUNT MOVES). This part's head closes every
  // record at its printed member set — *"a sixth member of `AttemptContext` ... is not a variation, it is a
  // different shape"* — so a seventh member of `RepairContext` is a different shape too and the census is
  // read in BOTH directions below.
  const K = await kernel();
  const { register, commit, runAttempt } = K;
  const h = repairContextFixture(K, 's-repair-ctx-shape');
  assert.equal(h.seen.invoked, true,
    'S-REPAIR-CTX: THE FIXTURE\'S PREMISE — the repair returned by the constraint that triggered it was '
    + 'invoked, so a context was handed (`surface.md §2.11` clause 6; `kernel-surface.md §2.3` item 2)');

  assert.deepEqual(h.seen.ctxMembers,
    ['address', 'id', 'op', 'pending', 'tier', 'value'],
    'S-REPAIR-CTX: the repair context is a record whose member set is EXACTLY the SIX the shape block declares '
    + '— `op` · `address` · `id` · `value` · `tier` · `pending` — five of the declared five unmoved and the '
    + 'commit carried BESIDE THEM (`kernel-surface.md §2.3` item 2; `§2.3` item 5; `parameter-semantics.md '
    + '§2.16`\'s re-derived `domain` cell) — read ' + JSON.stringify(h.seen.ctxMembers));
  assert.equal(Object.keys(h.seen.ctx).length, 6,
    'S-REPAIR-CTX: and no SEVENTH member stands beside them — the record is closed at its printed member set '
    + '(`kernel-surface.md` head: *"a sixth member of `AttemptContext` ... is not a variation, it is a '
    + 'different shape"*, read over this record\'s own `6`)');

  assert.equal(h.seen.pendingIsArray, true,
    'S-REPAIR-CTX: THE DECLARED TYPE — `pending: Handle[]` — is an ARRAY, and this is the assertion the '
    + 'greens layer prints and never drives (`file-tier-save-greens.md`\'s `FTS-11.1` reads the member NAMES '
    + 'and reads `rc.pending` as an OBJECT; `kernel-surface.md §2.3` item 4 (d) names this cell OWED to '
    + '`role_test_writer`) — read ' + JSON.stringify(h.seen.pendingIsArray));
  assert.equal(h.seen.pendingLenAtCopy > 0, true,
    'S-REPAIR-CTX: and the list is POPULATED at this instant — the repair runs for a pair of the write\'s own '
    + 'triggered set, so the commit\'s residue carries that write\'s own handle (`§2.1` item 2\'s `pending` '
    + 'clause; `§2.3` item 2) — read ' + JSON.stringify(h.seen.pendingLenAtCopy));
  assert.deepEqual([...new Set(h.seen.pendingEntries)], ['object'],
    'S-REPAIR-CTX: and every element is a HANDLE — the store\'s own opaque returned value, an object and '
    + 'never a string token (`kernel-surface.md §2.3` item 2\'s `Handle[]`; `§2.2` item 2: the handles a '
    + 'per-landing pass runs over are *"the set the store\'s own return carries"*) — read '
    + JSON.stringify(h.seen.pendingEntries));
});

test('fts_S_REPAIR_CTX_the_handed_list_is_a_fresh_copy_so_the_repairs_own_mutation_moves_nothing_on_the_commit', async () => {
  // `kernel-surface.md §2.3` item 2, verbatim: *"the value handed is THE COMMIT'S OWN `pending` — the member
  // `§2.1` item 2 declares on the `CommitRecord` this call's `K-2` built and returned, the very record the
  // attempt's own `record` names — read VERBATIM AND HANDED AS A FRESH LIST (`slice()`), so the record's own
  // member is NOT ALIASED and a repair that mutated its context's list would move nothing on the commit."*
  // THE SAME ITEM PRICES THE ALTERNATIVE AND REFUSES IT — *"(iii) THE MEMBER CARRYING THE RECORD'S OWN LIST BY
  // REFERENCE — REFUSED, because the repair is external code and a shared list is a write the caller never
  // declared."* THE DRIVE: one sentinel is pushed into the list the repair was handed, and the write is made
  // through the SAME CONTEXT so the join is read on the same call.
  const K = await kernel();
  const { report } = K;
  const h = repairContextFixture(K, 's-repair-ctx-copy');

  assert.equal(h.seen.pendingIsTheRecordsOwnList, false,
    'S-REPAIR-CTX: THE PROVENANCE — the fresh list is not the record\'s own list by identity, so the two are '
    + 'read as two arrays and not as one (`kernel-surface.md §2.3` item 2\'s provenance clause and its priced '
    + 'alternative (iii), REFUSED)');
  assert.equal(h.seen.sentinelMovedNothing, true,
    'S-REPAIR-CTX: THE MUTATION — the repair pushed one sentinel into the list it was handed and the record\'s '
    + 'own residue does NOT carry it: "a repair that mutated its context\'s list would move nothing on the '
    + 'commit" (`kernel-surface.md §2.3` item 2). FAIL-STATE: a commit whose residue is reachable by a mutation '
    + 'of what the repair was handed');
  assert.equal(Array.isArray(h.seen.recordPendingAfterRepair), true,
    'S-REPAIR-CTX: and the record\'s own member still STANDS after that mutation — the member is the kernel\'s '
    + 'and not the repair\'s (`§2.1` item 2)');
  assert.equal(h.seen.recordPendingAfterRepair.includes(h.SENTINEL), false,
    'S-REPAIR-CTX: THE RECORDED CONSEQUENCE, read the second time and off the record itself — the commit\'s '
    + `residue reads ${JSON.stringify(h.seen.recordPendingAfterRepair.map(String))}`);

  assert.equal(h.seen.refusal, null,
    'S-REPAIR-CTX: THE JOINT ROUTE — the repair\'s own write carried the very context it was handed at the '
    + 'fifth position and the position accepted it, so the write joined the commit it is part of '
    + '(`surface.md §2.11` clause 6; `kernel-surface.md §2.1` item 1\'s dated fifth-position clause) — the '
    + `refusal read ${h.seen.refusal && h.seen.refusal.constructor && h.seen.refusal.constructor.name}: `
    + `${h.seen.refusal && h.seen.refusal.message}`);
  assert.ok(h.seen.write !== null && typeof h.seen.write.op.opId === 'string',
    'S-REPAIR-CTX: and the store answered that write with its own `WriteResult` — a repair\'s write is an '
    + 'ORDINARY write of this surface (`kernel-surface.md §2.3` item 2 (i); `contract.md §7.2` item 1)');
  assert.equal(h.report === null, false,
    'S-REPAIR-CTX: and the attempt reached its passing arm — the landed edit satisfies the pair on the re-run '
    + 'and no arm refuses this call (`kernel-surface.md §2.1` item 3)');
  assert.equal(h.report.ops.length, 2,
    'S-REPAIR-CTX: THE JOIN, READ ON THE SAME CALL — the repair\'s write JOINS THAT COMMIT AS A NEW ENTRY and '
    + `the commit's op set grows by EXACTLY ONE (\`surface.md §2.11\` clause 6) — read ops=${h.report.ops.length}`);
  assert.equal(new Set(h.report.ops.map((o) => o.opId)).size, 2,
    'S-REPAIR-CTX: the repair\'s write is a NEW ENTRY and not a second identity for the first op — the commit '
    + 'it joined is the one the context carried (`kernel-surface.md §2.1` items 2–3)');
});

test('fts_S_REPAIR_CTX_the_fifth_position_accepts_the_context_only_because_it_carries_that_member', async () => {
  // `kernel-surface.md §2.3` item 2's own class-test bullet, verbatim: *"THE WRITE SURFACE'S FIFTH POSITION
  // ADMITS EXACTLY THIS OBJECT: its class test is \"an object position is a record position only where it
  // CARRIES A `pending` MEMBER whose value is present and not `undefined`\", and it is A CLASS TEST AND NEVER
  // AN IDENTITY TEST* — *"SO WITHOUT THIS MEMBER `§2.11` CLAUSE 6's ROUTE IS UNREACHABLE"* (`docs/specs/
  // storeroom-js/surface.md §2.4` item 9 (g) item 1; `PAR-JS-20`). THE TWO HALVES ARE DRIVEN IN THE SAME
  // INSTANT ON THE SAME REPAIR: the declared context is handed, and the SAME object's member-less twin is
  // handed beside it. The second refusal is recorded INSIDE the repair body — the body does not throw, so
  // the attempt reaches the caller and the arm below is the CALLER'S OWN (`§2.3` item 1's throw-pattern
  // clause: a throwing body is not a kernel state).
  const K = await kernel();
  const { register, commit, runAttempt } = K;
  const f = newStore();
  const key = tag('s-repair-ctx-position');
  const seen = { ctxMembers: null, stripped: null, strippedRefusal: null, accepted: false, acceptedWrite: null };
  let record = null;

  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1 — and `3-bis` makes it mandatory: this body carries a
  // `repair`, so an unshielded registration ATTEMPTS it and the two halves this cell drives (the declared
  // context and its member-less twin) are driven at the REGISTRATION instead of at the write's attempt.
  register(f.store, [key], 's-repair-ctx-position-c1', atLandingOnly((ctx) => {
    if (ctx.value === 'repaired') return true;
    return {
      message: 'the landed value contradicts the shape this pair confirms',
      repair: (rc) => {
        // HALF ONE — THE SAME OBJECT WITH THAT ONE MEMBER TAKEN OFF IT. The class test is taken BEFORE the
        // walk and BEFORE the verb (`surface.md §2.4` item 9 (g) item 1), so this refusal leaves no landing.
        seen.ctxMembers = Object.keys(rc).sort();
        const { pending, ...withoutPending } = rc;
        seen.stripped = Object.keys(withoutPending).sort();
        try {
          f.store.write([key], 'file', 'repaired', withoutPending);
        } catch (err) {
          seen.strippedRefusal = err;
        }
        // HALF TWO — THE CONTEXT ITSELF, THE ONE OBJECT THE KERNEL HANDS IT (`§2.3` item 2's own bullet: the
        // position's class test reads THIS member; "WITHOUT THIS MEMBER `§2.11` CLAUSE 6's ROUTE IS
        // UNREACHABLE", and with it the route is whole). THE SAME BODY, THE SAME WINDOW, THE SAME ADDRESS.
        try {
          seen.acceptedWrite = f.store.write([key], 'file', 'repaired', rc);
          seen.accepted = true;
        } catch (err) {
          seen.strippedRefusal = err;
        }
        return seen.accepted
          ? { ok: true, op: seen.acceptedWrite.op }
          : { ok: false, message: 'neither half reached the commit position' };
      },
    };
  }));

  record = commit(f.store, [key], 'file', 'broken');
  let caught = null;
  try {
    runAttempt(f.store, record);
  } catch (err) {
    caught = err;
  }

  assert.equal(seen.accepted, true,
    'S-REPAIR-CTX: HALF TWO — and the CONTEXT ITSELF is ACCEPTED at the same position, in the same window and '
    + 'from the same body: the position\'s reading is this one member\'s PRESENCE and nothing else, so the '
    + 'repair\'s write proceeds and the clause\'s own route is whole (`kernel-surface.md §2.3` item 2; '
    + '`surface.md §2.11` clause 6)');
  assert.ok(seen.acceptedWrite !== null && typeof seen.acceptedWrite.op.opId === 'string',
    'S-REPAIR-CTX: and the accepted write was answered by the store\'s own `WriteResult` (`contract.md §7.2` '
    + 'item 1)');
  assert.deepEqual(seen.ctxMembers, ['address', 'id', 'op', 'pending', 'tier', 'value'],
    'S-REPAIR-CTX: THE FIXTURE\'S PREMISE — the object this body halves is the context the kernel hands it, '
    + `carrying the declared six (\`kernel-surface.md §2.3\` item 2) — read ${JSON.stringify(seen.ctxMembers)}`);
  assert.deepEqual(seen.stripped, ['address', 'id', 'op', 'tier', 'value'],
    'S-REPAIR-CTX: and its member-less twin carries the declared FIVE and not the sixth — the one member the '
    + 'position\'s class test reads is the one taken off it (`kernel-surface.md §2.3` item 2)');
  const refusal = seen.strippedRefusal;
  assert.ok(refusal instanceof TypeError,
    'S-REPAIR-CTX: HALF ONE — with that one member off it the position REFUSES the object: *"the position '
    + 'reads THIS member and not the record"*, and *"WITHOUT THIS MEMBER `§2.11` CLAUSE 6\'s ROUTE IS '
    + 'UNREACHABLE"* (`kernel-surface.md §2.3` item 2; `surface.md §2.4` item 9 (g) item 1) — read '
    + `${refusal && refusal.constructor && refusal.constructor.name}`);
  assert.equal('status' in refusal, false,
    'S-REPAIR-CTX: and the refusal is the position\'s own and never a store member or a `KC` token '
    + '(`§2.4` item 9 (b)\'s class and `§2.5`\'s single form — a `KC` token is never named as a store code, '
    + 'and this refusal is neither)');
  assert.equal(caught, null,
    'S-REPAIR-CTX: and no body threw, so the attempt reached the caller on the repair\'s own `{ok: true, op}` '
    + 'arm and the refusals read above are the POSITION\'s own (`kernel-surface.md §2.3` item 1\'s '
    + 'throw-pattern clause)');
});

test('fts_S_UNREPAIRABLE_a_repair_registered_for_the_writes_own_set_is_never_delivered_the_saves_failure', async () => {
  // `docs/specs/storeroom-js/surface.md §2.11` CLAUSE 5, verbatim: *"THE SAVE IS EVALUATED AS THE LAST
  // CONSTRAINT OF THE WRITE, SO A SAVE THAT FAILS IS A CONSTRAINT VIOLATION AND IS NOT REPAIRABLE BY ANY
  // REPAIR FUNCTION: `ok === false`, the entry is a `KC` token of the kernel's own set, and the pass reports
  // the failure as it reports any other."* THE DATED CLAUSE THAT FOLLOWS CLAUSE 7 NAMES THIS CELL'S OWN
  // REVISIT CONDITION: *"a driven state in which a repair IS registered for the save's own pair and the save
  // fails notwithstanding — the repair body never running for that arm, so the observable is a
  // repair-invocation count of `0` on the failing save."*
  //
  // THE FIXTURE, AND WHY ITS TWO ACTS ARE ORDERED AS THEY ARE: the path's parent directory is STANDS THROUGH
  // `K-2` AND THROUGH THE CONSTRAINT PASS — the write verb performs no file I/O on any of its arms
  // (`contract.md §7.2` item 1), so the pass and the repair run on a lawful path while the save does not.
  // The repair IS REGISTERED FOR THE WRITE'S OWN PAIR: it is RETURNED BY the constraint of that pair, which
  // is the one carrier `surface.md §2.11` clause 6 declares, so the pair's repair stands reachable at the
  // terminal arm's own instant. THE COUNT THIS CELL READS IS THE ONLY INCREMENT THE FIXTURE CAN ATTRIBUTE:
  // the pass's own repair transition is accounted for below, so any further invocation would be the SAVE'S
  // OWN — and the arm's own answer is the terminal arm's record.
  const K = await kernel();
  const { report, log } = K;
  // THE ONE FIXTURE ACT: the parent directory is removed between `K-2`'s return and `runAttempt`, so the pass
  // and the repair run on a lawful path — the save does not (`contract.md §7.2` item 1: the verb performs no
  // file I/O on any of its arms, so this failure cannot stand at the verb).
  const h = repairContextFixture(K, 's-unrepairable', (f) => {
    rmSync(f.dir, { recursive: true, force: true });
  });

  assert.equal(h.caught && h.caught.status, 'FileCommitFailed',
    'S-UNREPAIRABLE: THE FIXTURE\'S PREMISE — the save failed at the terminal arm and the caller met the '
    + 'store\'s own #15 answer (`contract.md §8.1` rank #15; `surface.md §2.11` clause 5) — read '
    + `${h.caught && h.caught.status}`);
  assert.equal(h.report, null,
    'S-UNREPAIRABLE: and `K-3` did not return, because the failed save is the attempt\'s own terminal answer');

  // ── THE NEGATIVE ITSELF: THE SAVE'S OWN FAILURE REACHES NO REPAIR BODY, AND THE ONE BODY THIS FIXTURE
  //    CARRIES IS ACCOUNTED FOR BY THE PASS.
  assert.equal(h.seen.order.filter((e) => e === 'repair:write-landed').length, 1,
    'S-UNREPAIRABLE: A REPAIR REGISTERED FOR THE WRITE\'S OWN SET IS NOT DELIVERED THE SAVE\'S FAILURE AS A '
    + 'REPAIRABLE ONE, AND THE COUNT THE DATED CLAUSE NAMES IS `0` ON THE FAILING SAVE: the ONE invocation '
    + 'this fixture records is the CONSTRAINT VIOLATION\'s own — the violation the attempt had already found '
    + 'before the save act — and NO SECOND invocation follows it, so nothing is attributable to the save '
    + '(`surface.md §2.11` clause 5 and the dated clause that follows clause 7, whose revisit condition this '
    + 'cell IS; `attempt-lifecycle.md §2.4` item 4\'s repair transition) — read '
    + `${JSON.stringify(h.seen.order)}`);
  assert.equal(h.seen.refusal, null,
    'S-UNREPAIRABLE: and that one repair body ran during the PASS and made its own lawful write — the save\'s '
    + 'failure did not reach it as a second invocation and did not reach it as a refusal '
    + `(${h.seen.refusal && h.seen.refusal.message})`);

  // ── THE TWO ARMS THE DATED CLAUSE NAMES BESIDE THAT COUNT ("the attempt ends at the failure arm with its
  //    `outcome` entry, the report reads `failed`").
  const entries = log(h.f.store, h.record.attempt);
  const outcome = outcomeEntryOf(entries);
  assert.equal(outcome.length, 1,
    'S-UNREPAIRABLE: the attempt ends at the failure arm with ITS ONE `outcome` entry — the save is a '
    + 'constraint EVALUATED LAST, so its failure is a constraint violation and the pass reports it as it '
    + 'reports any other, one entry and never two (`surface.md §2.11` clause 5; `kernel-surface.md §2.1` '
    + `item 3\'s THROWS clause and item 4) — read ${JSON.stringify(entries.map((e) => [e.kind, e.state]))}`);
  assert.ok(KC_TOKEN.test(String(outcome.length === 1 ? outcome[0].state : '')),
    'S-UNREPAIRABLE: and that entry\'s `state` is a `KC` token of the kernel\'s own set — the same token the '
    + 'thrown form\'s `status` carries (`kernel-surface.md §2.1` item 3; `fail-surface.md §1.1` items 1 and 3) '
    + `— read ${JSON.stringify(outcome.map((e) => e.state))}`);
  const final = report(h.f.store, h.record.attempt);
  assert.notEqual(final.outcome, 'passed',
    'S-UNREPAIRABLE: and the report reads the failure and never the passing arm — `K-5` returns the attempt\'s '
    + 'FINAL record, the closed record of the arm that actually TERMINATED the attempt (`kernel-surface.md '
    + '§2.1` item 5) — read ' + JSON.stringify(final.outcome));
  assert.deepEqual(entries.filter((e) => e.kind === 'repair-run').length, 1,
    'S-UNREPAIRABLE: THE LOG CARRIES THE SAME ARITHMETIC — exactly ONE `repair-run` entry, and it is the '
    + 'PASS\'s own (`kernel-surface.md §2.5` item 1\'s `repair-run` row; `attempt-lifecycle.md §2.4` item 4\'s '
    + 'repair transition), so the save\'s own failure appended no second attempt at a repair and answered '
    + `its own arm instead — read ${JSON.stringify(entries.map((e) => e.kind))}`);
});
