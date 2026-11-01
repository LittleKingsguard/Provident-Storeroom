// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE PAIR-APPLICATION RULE AT EVERY INSTANT THAT WOULD APPLY A PAIR — `U-STOREROOM-CONSTRAINT-REGISTRATION-
// INSTANT`'s SUBJECT ONE, its gate-3 cells `G3-01`…`G3-13` (`verification.md §2.1`), written from
// `docs/specs/storeroom-constraint-registration-instant/contract.md` `§2`'s `PIN-2`, `PIN-3`, `PIN-4`, `PIN-5`
// and `PIN-9` and from NOTHING ELSE. **NO CELL HERE IS WRITTEN FROM THE IMPLEMENTATION**: each states what the
// contract REQUIRES and fails against this tree wherever the tree does not yet do it.
//
// **THE RULING THE PINS CARRY** (`strata/decisions.md` · `D-90`, the architect, verbatim):
//   * *"Constraints that would be applied to an address that can't be walked to yet should be skipped (ex.
//     ['window', 'tabs'], where 'window' does not yet exist)."*
//   * *"A constraint that can be walked to but doesn't exist (ex. ['window'], where 'window' doesn't exist)
//     should be applied."*
//   * *"This is a global rule, not a batch-only one."*
//
// **⟶ AND `D-96` (2026-11-02) READS THAT ROW'S FIRST SENTENCE THROUGH ITS OWN THRESHOLD — ABSENCE, AND NOT *"NOT A
// CONTAINER"***: *"Reject this, the constraint being there implicitly expects `'x'` to be a container"*, and on the
// re-run, *"See above"*. **A LEAF parent APPLIES its pair** (`D-96` (1)–(4)), so the skip survives on the ABSENT
// parent alone; **the cells this row moves are THIS FILE'S `G3-08`'s leaf half and `G3-13`'s skip half**, and each
// was re-derived to the APPLY and the refusal respectively (`D-96` (6)).
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE RULE, AS THE PINS STATE IT — the five facts every cell below rests on
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **1 · THE DISCRIMINATOR IS THE ADDRESS'S PARENT, AND THE SKIP'S THRESHOLD IS ABSENCE ALONE** (`PIN-2`
// (i)–(iii) AS RE-DERIVED BY `D-96`, 2026-11-02). A pair's ADDRESS is the array it was registered at, its KEY is
// that array's LAST segment, its PARENT is the array MINUS that segment. A pair is **SKIPPED** exactly when its
// PARENT DOES NOT RESOLVE and **APPLICABLE** exactly when the walk reaches it at all; **THE EMPTY PARENT IS THE
// REGISTER, WHICH ALWAYS RESOLVES**, so `['window']` on a store with no `window` is APPLIED and
// `['window','tabs']` on the same store is SKIPPED. **⟶ A PAIR WHOSE PARENT RESOLVES TO A LEAF IS APPLIED TOO,
// AND THE SENTENCE THAT STOOD HERE — *"a pair whose parent resolves to a leaf is SKIPPED"* — IS WITHDRAWN**
// (`D-96` (1)–(3), the architect verbatim: *"Reject this, the constraint being there implicitly expects `'x'` to
// be a container"*): the pair's own presence declares its parent a container, so a leaf there is the state the
// pair JUDGES — its body is asked with `context.value === undefined` and a refusing body refuses the registration
// at rank `19`. **AND THE LINE IS DRAWN BY THE NODE AND NOT BY THE VALUE'S CLASS**: an EMPTY OBJECT written at the
// parent makes it a BRANCH and a PRIMITIVE written there makes a LEAF — **both APPLY the pair** (`D-96` (3)).
// `G3-08` drives both arms, on two stores, because the line is two different acts.
//
// **2 · THE RULE IS READ AT EVERY INSTANT THAT WOULD APPLY A PAIR, AND NOWHERE IS IT A REGISTRATION'S
// PROPERTY** (`PIN-2` (v), `PIN-4` (iv)): CONSTRUCTION · A BOOT OVER AN EXISTING `filePath` · `addConstraint` ·
// A RE-ARM (`constraintOn`) · THE PASS over a `write`, a `delete` or a `rollback` — and the registration's own
// RE-RUN is an instant that reads it too (`D-94`, `D-96` (4), `G3-13`). Each cell below names the instant it
// drives.
//
// **3 · A SKIP IS NOT A REFUSAL** (`PIN-3`): a skipped pair is not asked, not refused for, not repaired for,
// not counted as a judgement, and **NOTHING CROSSES FOR IT** — no `status`, no `message`, no `log` entry, no
// `constraint-check` entry, no `repair-run` entry, no commit frame, no attempt. **The closed three-arm outcome
// set for a body is untouched**, because a skipped pair's body never runs.
//
// **4 · A SKIPPED PAIR IS CARRIED, AND IT APPLIES AT THE FIRST INSTANT ITS PARENT STANDS** (`PIN-4`):
// `K-1` completes, `store.constraints()` NAMES THE PAIR, and **registration does not fail for it**
// (`D-90` (3): *"registration does not fail for it"*). `G3-01`, `G3-03`, `G3-06` and `G3-10` assert `carried`
// by the two observables the pin declares: `constraints()` names the pair, and the body's ask-count is `0`.
// **THE PARENT'S STANDING IS NOT AN INVITATION TO ASK THE PAIR**: an act that makes the parent a container
// reaches the pair only where that act's own touched set names the pair's address or a descendant of it — so
// `G3-08`'s empty-object write has an ask-delta of `0` and `G3-09`'s write *whose written value contains the
// pair's key* has `+1`.
//
// **5 · `D-90` (5): THE BOOT'S LIST-WIDE REFUSAL IS SUPERSEDED** (`PIN-5`). `src/store.rs`'s boot walk that
// refused the whole list `ConstraintListInvalid` when one pair's address did not resolve is DELETED; what
// remains of `ConstraintListInvalid` at those instants is **the malformed list and nothing else**. `G3-04` and
// `G3-05` are the two arms: the well-formed pair that does not resolve must STAND, the malformed element must
// still draw the one generated sentence with `log: []`.
//
// **AND `PIN-9`'s CONSEQUENCE IS `G3-13`'s NEIGHBOUR AND `G3-27`'S SUBJECT** (the other file): a pair whose
// parent is absent is never asked, so **nothing runs to create the parent** — `['window','tabs']` with no
// `window` cannot be rescued by its own repair.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE INSTRUMENTS, AND THE ARMS `sites.md §3` MEASURED
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **`D-17`.** The expectation is a literal here and the citation is a comment: NO CELL OPENS A DOCUMENT AT
// RUNTIME. **The instruments are the declaration's own**: `storeCreate` from the entry (`../../bindings/js/
// index.mjs`, this project's `O4` route) and the instance's own members — `write` · `delete` · `rollback` ·
// `read` · `readLiteral` · `addConstraint` · `constraintOff` · `constraintOn` · `constraints` · `listen` ·
// `register` — which are the instruments `tests/e2e/registration-repair-existence.test.mjs` and
// `tests/e2e/repair-in-commit.test.mjs` already use. **NO second instrument is minted**: the rule is observed
// through ask-counts the cells own, through `constraints()`, through the store's own refusal codes and through
// `readLiteral`'s three answers, and through nothing else.
//
// **THE ARMS ARE THE ONES `sites.md §3` MEASURED, EACH AT ITS OWN ROW**: the `mem` store with no `['window']`
// (the LEAF-ABSENT arm, which must be APPLIED, rows `1`/`12` and `§3.1` items 1 and 3) · `['window','tabs']`
// with no `window` (the PARENT-ABSENT arm, which must be SKIPPED, row `12`) · `['x','deep']` with `'x'` a LEAF
// (APPLIED and refusing — `D-96` (1)–(3) inverts the arm this row `§3.1` item 6 measured) · the empty parent, the
// register, always applicable · a BOOT over a real `filePath` seeded by a `file`-tier write (rows `5`, `10`, `11`,
// `§3.1` item 4) · an ancestor `delete` (`PIN-4` (iii)) · a `rollback` whose reversal removes the parent
// (`PIN-4` (iv)) · and `D-94`'s re-run arm, read through `D-96` (4) (`G3-13`).
//
// **D-21.** Every cell prints the readings it took at its own `t.diagnostic`, **and asserts its own drive's
// coherence BEFORE it reports a verdict**: where an act the contract says must pass refuses, the cell fails at
// that act and prints the refusal's `status`, its `log` census and the store's state — it never reports a
// verdict about an arm it did not reach. **A cell is never written to pass vacuously**: there is no `skip`, no
// `try`/`catch` around an assertion, and no assertion on a value the cell itself constructed. The `attempt()`
// helper below wraps an ACT whose outcome IS the subject and hands back the thrown value as a value — the shape
// both sibling files already use — and every assertion is made on what the act answered.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { test } from 'node:test';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

/** The store's own closed status set, at the four members these cells read (`src/error.rs:113`-`:134`; the set
 *  is TWENTY ranked `1`…`20` and `PIN-10` mints none of them): rank `19` is the registration's refusal, rank
 *  `20` the pass's, rank `16` the malformed list's, rank `8` `readLiteral`'s branch narrowing and rank `2` the
 *  walk's absence. */
const REGISTRATION_REFUSED = 'ConstraintRefusedAtRegistration';
const PASS_REFUSED = 'ConstraintPassRefused';
const LIST_INVALID = 'ConstraintListInvalid';
const READ_TARGET_IS_BRANCH = 'ReadTargetIsBranch';
const ADDRESS_NOT_FOUND = 'AddressNotFound';

/** **THE BODY'S FIVE-MEMBER EVALUATION CONTEXT, SORTED** (`kernel-registration.mjs:345`-`:356`) — asserted on
 *  every reading a cell takes inside a body, because `PIN-8` (iii) (a) and `D-92` (1) leave it UNMOVED while
 *  the repair's record gains its seventh member. */
const CONTEXT_MEMBERS = ['address', 'attempt', 'op', 'tier', 'value'];
/** `constraints()`'s declared two members (`index.d.ts:1118`-`:1126`), sorted: the pairs' own SETS and `id`. */
const PAIR_MEMBERS = ['address', 'id'];

/** A store at the two REQUIRED `cfg` keys (`surface.md §2.1`), with `constraints` supplied where a cell seats
 *  its pair at the CONSTRUCTION instant. */
const make = (extra = {}) => storeCreate({ journalLength: 256, listeners: [], ...extra });

/** Run `fn`; answer the thrown value as a value. Every drive in this file is synchronous, so this is total —
 *  and it is used ONLY where the OUTCOME of an act is the subject, never around an assertion. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** A refusal's `status` and `message` as a reading, or `null` where the act returned. */
const shapeOf = (caught) => (caught === null || caught === undefined
  ? { status: null, message: 'the act RETURNED' }
  : {
      status: caught !== null && typeof caught === 'object' ? caught.status ?? null : null,
      message: caught !== null && typeof caught === 'object' && typeof caught.message === 'string'
        ? caught.message
        : String(caught),
    });

/** **THE `log` CENSUS A REFUSAL CROSSES WITH** (`PIN-3`: nothing crosses for a skipped pair, and `PIN-6` (v):
 *  the route appends no entry) — the KINDS, in order, or `null` where the refusal carries no `log` at all. */
const logKinds = (caught) => (caught !== null && typeof caught === 'object' && Array.isArray(caught.log)
  ? caught.log.map((entry) => (entry !== null && typeof entry === 'object' ? entry.kind : entry))
  : null);

/** **A PAIR'S ADDRESS, READ AS A SET AND NEVER AS A SEQUENCE** — `index.d.ts`'s `ConstraintPair.address` is
 *  `Address | readonly Address[]` and the surface's encoding of a set of ONE is not printed by the declaration,
 *  so both are read and the SET is what a cell asserts (the reading `tests/e2e/registration-repair-existence.
 *  test.mjs` and `tests/e2e/blind-constraints-surface.test.mjs` both take of the same member). */
const addressSet = (address) => {
  const members = Array.isArray(address) && Array.isArray(address[0]) ? address : [address];
  return members.map((member) => member.join('/')).sort();
};

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-01` · THE SKIP AT CONSTRUCTION
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-01 · THE SKIP AT CONSTRUCTION: a `cfg.constraints` element at `[\'window\',\'tabs\']` on a fresh `mem` store — its parent cannot be walked to — leaves the construction RETURNING AN INSTANCE, the body asked `0` times, and `store.constraints()` NAMING the pair', (t) => {
  // **THE INSTANT** (`PIN-4` (iv), construction) and **THE ARM** (`PIN-2` (iv): `['window','tabs']` with no
  // `window` ⇒ parent `['window']` does not resolve ⇒ SKIPPED). **AND THE PAIR IS CARRIED** (`PIN-4` (i),
  // `D-90` (3): *"registration does not fail for it"*): `K-1`'s two channels complete and `constraints()`
  // answers the pair. **THE TWO OBSERVABLES ARE THE PIN'S OWN**: `constraints()` names the pair, and the
  // body's ask-count at that instant is `0`.
  const readings = [];
  let asks = 0;
  const construction = attempt(() => make({
    constraints: [{
      address: ['window', 'tabs'],
      id: 'w1',
      constraint: (context) => {
        asks += 1;
        readings.push({ members: Object.keys(context).sort(), value: context.value });
        // **A REFUSAL, SO THAT AN ASK THE RULE SHOULD HAVE SKIPPED IS ITSELF A FAILURE** — a passing body
        // asked at an instant that should have skipped it would leave the registration standing and be
        // invisible; this body makes the wrong ask refuse, which the construction assertion below catches.
        return { message: 'the pair at `window/tabs` refuses: its parent stands and its key is absent' };
      },
    }],
  }));
  const shape = shapeOf(construction.ok === true ? null : construction.caught);
  const rows = construction.ok === true ? construction.value.constraints() : [];
  const rest = construction.ok === true ? construction.value.read([]) : null;

  // ── (a) THE CONSTRUCTION STANDS — the whole claim of the cell, and `D-90` (3) in one line. ────────────
  assert.equal(construction.ok, true,
    `**A PAIR WHOSE PARENT CANNOT BE WALKED TO MUST NOT FAIL THE REGISTRATION** (\`D-90\` (3), verbatim: `
      + `*"registration does not fail for it"*; carried as the CONDITION \`PIN-4\` (i)): the construction `
      + `answered ${JSON.stringify(shape.status)} with log ${JSON.stringify(logKinds(construction.caught))} `
      + `and message ${JSON.stringify(shape.message)}. **THE CONSTRUCTION ROUTE IS \`storeCreate\`, AND `
      + `\`PIN-4\` (iv) NAMES IT AS ONE OF THE FIVE INSTANTS THE RULE REACHES**`);
  assert.equal(typeof construction.value, 'object',
    `and what it answers is the INSTANCE: it answered a ${typeof construction.value}`);

  // ── (b) THE BODY WAS ASKED ZERO TIMES — `PIN-3`'s first clause, and `PIN-4` (i)'s declared observable. ─
  assert.equal(asks, 0,
    `**A SKIPPED PAIR IS NOT ASKED** (\`PIN-3\`: *"not asked, not refused for, not repaired for and not counted `
      + `as a judgement"*): the drive's body was entered ${asks} time(s), with the readings `
      + `${JSON.stringify(readings)}. **THE PARENT \`['window']\` DOES NOT RESOLVE ON A FRESH \`mem\` STORE, SO `
      + `THE PREDICATE'S SECOND ARM IS THE ONE THIS DRIVE TAKES** (\`PIN-2\` (ii): \`AddressNotFound\` ⇒ SKIPPED)`);

  // ── (c) THE PAIR IS CARRIED AND NAMED — `PIN-4` (i). ──────────────────────────────────────────────────
  assert.equal(rows.length, 1,
    `**THE PAIR IS CARRIED ANYWAY AND \`constraints()\` NAMES IT** (\`PIN-4\` (i): *"the entry's read model `
      + `carries it, \`constraints()\` names it"*): the drive read ${JSON.stringify(rows)}`);
  assert.deepEqual(Object.keys(rows[0]).sort(), PAIR_MEMBERS,
    `and a row carries exactly the two declared members (\`ConstraintPair\`: *"exactly these TWO members and no `
      + `third"*): the drive read ${JSON.stringify(Object.keys(rows[0]))}`);
  assert.equal(rows[0].id, 'w1',
    `and its \`id\` is the caller's own spelling: ${JSON.stringify(rows[0].id)}`);
  assert.deepEqual(addressSet(rows[0].address), ['window/tabs'],
    `**AND ITS ADDRESS IS THE ONE THE PAIR WAS REGISTERED AT**, read as a SET: the drive read `
      + `${JSON.stringify(rows[0].address)} → ${JSON.stringify(addressSet(rows[0].address))}`);

  // ── (d) AND THE STORE IS EMPTY: THE SKIP CHANGED NO STORE SEMANTIC (`D-90` (6), `PIN-10`). ─────────────
  assert.deepEqual(rest, {},
    `and the skip installed nothing anywhere — the register answers \`{}\` because the pair is a `
      + `REGISTRATION and not a state: the drive read ${JSON.stringify(rest)}`);

  t.diagnostic(`G3-01 · THE SKIP AT CONSTRUCTION: \`storeCreate({constraints: [{address: ['window','tabs'], id: `
    + `'w1'}]})\` answered ${JSON.stringify(shape.status)} (the instance stands: `
    + `${String(construction.ok)}); the body was asked ${asks}×; \`constraints()\` answers `
    + `${JSON.stringify(rows.map((row) => ({ address: addressSet(row.address), id: row.id })))}; \`read([])\` `
    + `answers ${JSON.stringify(rest)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-02` · THE LEAF-ABSENT ARM IS APPLIED AT CONSTRUCTION (a `PIN-9`/`PIN-2` (iv) pin: this arm must NOT move)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-02 · THE LEAF-ABSENT ARM IS APPLIED AT CONSTRUCTION: a `cfg.constraints` element at `[\'window\']` with no `window` — its parent is the REGISTER — has a PASSING body and the pair stands, and a REFUSING body with NO repair refuses rank `19` with `log: []`; the two arms together are what proves the pair was ASKED', (t) => {
  // **THE OTHER OF THE RULING'S TWO EXAMPLES** (`D-90` (1), verbatim: *"A constraint that can be walked to but
  // doesn't exist (ex. ['window'], where 'window' doesn't exist) should be applied"*) and **`PIN-2` (iv)'s
  // second sentence**: the parent is `[]`, **THE REGISTER, WHICH ALWAYS RESOLVES TO A CONTAINER**, so the
  // absence of the pair's OWN key is the state it judges and not a reason to skip it. **`PIN-9` says the same
  // thing from the other side**: a pair whose own key is absent is APPLIED and may repair itself.
  // **THE TWO ARMS ARE ONE DRIVE BECAUSE NEITHER ALONE PROVES AN ASK**: a construction that returned an
  // instance and never asked would satisfy the passing arm vacuously, and a refusal that came from anywhere
  // but the body would satisfy the refusing arm; the PAIR of readings is what fixes both.
  let passingAsks = 0;
  const passing = attempt(() => make({
    constraints: [{
      address: ['window'],
      id: 'leaf-pass',
      constraint: () => {
        passingAsks += 1;
        return true;
      },
    }],
  }));

  let refusingAsks = 0;
  const refusingReadings = [];
  const refusing = attempt(() => make({
    constraints: [{
      address: ['window'],
      id: 'leaf-refuse',
      constraint: (context) => {
        refusingAsks += 1;
        refusingReadings.push({ members: Object.keys(context).sort(), value: context.value });
        // **NO REPAIR**: `PAR-C-5`'s `{message}` arm alone, so the registration has nothing to run and the
        // refusal is the one `PIN-4`/`PIN-3` leave it — rank `19`, with `log: []` (the census `sites.md §3.1`
        // item 1 re-measured for the arm with no repair).
        return { message: 'the register must hold `window` and it does not' };
      },
    }],
  }));
  const refusingShape = shapeOf(refusing.ok === true ? null : refusing.caught);

  // ── (a) THE PASSING ARM: THE PAIR IS APPLIED AND STANDS. ────────────────────────────────────────────────
  assert.equal(passing.ok, true,
    `**A PASSING BODY AT \`['window']\` ON A STORE WITH NO \`window\` MUST CONSTRUCT** — the register is the `
      + `parent and the register is always a container (\`PIN-2\` (i), \`D-90\` (1)): the construction answered `
      + `${JSON.stringify(shapeOf(passing.ok === true ? null : passing.caught))}`);
  assert.equal(passingAsks, 1,
    `**AND IT WAS ASKED ONCE — WHICH IS THE ASK THE RULE PERMITS** (\`PIN-2\` (iv): APPLICABLE): the body was `
      + `entered ${passingAsks} time(s)`);
  assert.equal(passing.value.constraints().length, 1,
    `and the pair stands registered: \`constraints()\` answers ${JSON.stringify(passing.value.constraints())}`);

  // ── (b) THE REFUSING ARM: RANK `19`, `log: []`, AND ONE ASK. ───────────────────────────────────────────
  assert.equal(refusing.ok, false,
    `**A REFUSING BODY WITH NO REPAIR MUST REFUSE THE REGISTRATION** (\`PIN-3\`: a skip is not a refusal, so `
      + `the reverse holds too — an APPLIED pair's refusal is the registration's): the construction RETURNED `
      + `an instance, which is the failure this assertion exists to catch`);
  assert.equal(refusingShape.status, REGISTRATION_REFUSED,
    `and its status is the registration instant's own, rank \`19\`: the drive caught `
      + `${JSON.stringify(refusingShape.status)} (message ${JSON.stringify(refusingShape.message)})`);
  assert.deepEqual(logKinds(refusing.caught), [],
    `**AND ITS \`log\` IS EMPTY — the arm \`sites.md §3.1\` item 1 re-measured for a pair with NO repair** `
      + `(\`PIN-3\`'s census: a skipped pair crosses nothing, and this pair was not skipped): the drive read `
      + `${JSON.stringify(logKinds(refusing.caught))}`);
  assert.equal(refusingAsks, 1,
    `**AND THE BODY WAS ASKED EXACTLY ONCE** — the reading that proves the refusal came from the body and `
      + `from nowhere else: the drive recorded ${refusingAsks} entr(y/ies)`);
  assert.deepEqual(refusingReadings[0].members, CONTEXT_MEMBERS,
    `and the body was handed the five-member evaluation context, UNMOVED (\`PIN-8\` (iii) (a); \`D-92\` (1)): `
      + `${JSON.stringify(refusingReadings[0].members)}`);
  assert.equal(refusingReadings[0].value, undefined,
    `and its \`value\` is \`undefined\` — the pair's OWN key is what is absent (\`D-90\` (1): *"with the absence `
      + `of its own key as the state it judges"*): ${JSON.stringify(refusingReadings[0].value)}`);

  t.diagnostic(`G3-02 · THE LEAF-ABSENT ARM IS APPLIED: the PASSING body constructed after ${passingAsks} ask `
    + `and the pair stands (${JSON.stringify(passing.value.constraints().map((row) => row.id))}); the REFUSING `
    + `body with no repair answered ${JSON.stringify(refusingShape.status)} after ${refusingAsks} ask, with `
    + `\`log\` ${JSON.stringify(logKinds(refusing.caught))} and \`value\` `
    + `${JSON.stringify(refusingReadings[0] === undefined ? null : refusingReadings[0].value)} — the pair at `
    + `\`['window']\` is APPLIED on a store that holds no \`window\``);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-03` · THE SKIP AT A BOOT OVER AN EXISTING `filePath`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

/** A real `filePath` carrying one `file`-tier key — the seeded file the three boot cells drive. The seed is a
 *  `file`-tier write, which is the ONLY thing that produces `file`-tier durability (`DD-28`), so the file the
 *  boot loads is a file the store itself wrote. */
function seededFile(label) {
  const directory = mkdtempSync(join(tmpdir(), `sr-g3-${label}-`));
  const filePath = join(directory, 'store.json');
  const seeder = make({ filePath });
  const seeded = seeder.write(['x'], 'file', { ok: 0 });
  return { filePath, seeded, seeder };
}

test('G3-03 · THE SKIP AT A BOOT OVER AN EXISTING `filePath`: a file carrying `[\'x\']` booted with a list naming `[\'win\',\'tabs\']` where `win` is absent — the parent cannot be walked to — RETURNS AN INSTANCE, asks the body `0` times, and `constraints()` names the pair', (t) => {
  // **THE INSTANT** is `PIN-4` (iv)'s second: *"a boot over an existing `filePath`"*, the same batch walk run
  // against the state the load left. **THE ARM**: `['win','tabs']` with `win` absent ⇒ SKIPPED. **AND THIS IS
  // THE ROUTE `D-90` (5) OPENS**: today the boot's list-wide walk refuses the whole list `ConstraintListInvalid`
  // (`sites.md §3` row 5, re-taken at `§3.1` item 4: *"`['win','tabs']` with the parent absent from the file
  // → `ConstraintListInvalid`"*); under the rule the pair is skipped and carried and no list-wide refusal
  // stands for it.
  const { filePath, seeded, seeder } = seededFile('boot-skip');
  // The premise is ASSERTED, not assumed: the seed reached the file, proved by a boot over the same path.
  const control = attempt(() => make({ filePath }).read(['x']));
  let asks = 0;
  const readings = [];
  const boot = attempt(() => make({
    filePath,
    constraints: [{
      address: ['win', 'tabs'],
      id: 'boot-pair',
      constraint: (context) => {
        asks += 1;
        readings.push({ members: Object.keys(context).sort(), value: context.value });
        return { message: 'the pair at `win/tabs` refuses' };
      },
    }],
  }));
  const shape = shapeOf(boot.ok === true ? null : boot.caught);
  const rows = boot.ok === true ? boot.value.constraints() : [];
  const loaded = boot.ok === true ? attempt(() => boot.value.read(['x'])) : null;

  // ── (a) THE DRIVE REACHED ITS ARM: THE FILE IS A FILE. ────────────────────────────────────────────────
  assert.equal(control.ok, true,
    `**THE SEED MUST HAVE REACHED THE FILE** or this cell boots nothing: a second boot over the same path `
      + `answered ${JSON.stringify(shapeOf(control.ok === true ? null : control.caught))} at \`['x']\``);
  assert.equal(seeded.op.tier, 'file',
    `and the seed is the file tier's own op: ${JSON.stringify(seeded.op.opId)} at `
      + `${JSON.stringify(seeded.op.tier)}`);
  assert.deepEqual(seeder.read([]), { x: { ok: 0 } },
    `and the seeding instance's own register carries the key it wrote, at the tier the seed named: the drive `
      + `read ${JSON.stringify(seeder.read([]))}`);

  // ── (b) THE BOOT STANDS — the list-wide refusal is SUPERSEDED (`PIN-5`, `D-90` (5)). ──────────────────
  assert.equal(boot.ok, true,
    `**A WELL-FORMED PAIR WHOSE PARENT DOES NOT RESOLVE MUST NOT REFUSE THE LIST** (\`PIN-5\` (i)-(ii); `
      + `\`D-90\` (5): *"What remains of \`ConstraintListInvalid\` at those instants is the malformed list and `
      + `nothing else"*): the boot answered ${JSON.stringify(shape.status)} with log `
      + `${JSON.stringify(logKinds(boot.caught))} and message ${JSON.stringify(shape.message)}`);

  // ── (c) THE BODY WAS ASKED ZERO TIMES AND THE PAIR IS CARRIED. ──────────────────────────────────────────
  assert.equal(asks, 0,
    `**A SKIPPED PAIR IS NOT ASKED AT A BOOT EITHER** (\`PIN-3\`; the rule is global, \`D-90\` (4)): the body `
      + `was entered ${asks} time(s): ${JSON.stringify(readings)}`);
  assert.equal(rows.length, 1,
    `**AND THE PAIR IS CARRIED AND NAMED** (\`PIN-4\` (i)): \`constraints()\` answers ${JSON.stringify(rows)}`);
  assert.equal(rows[0].id, 'boot-pair',
    `under the caller's own \`id\`: ${JSON.stringify(rows[0].id)}`);
  assert.deepEqual(addressSet(rows[0].address), ['win/tabs'],
    `at the address the list named: ${JSON.stringify(addressSet(rows[0].address))}`);
  assert.equal(loaded.ok, true,
    `**AND THE LOAD ITSELF STANDS** — the skip is the pair's and not the file's: \`read(['x'])\` answers `
      + `${JSON.stringify(loaded.ok === true ? loaded.value : shapeOf(loaded.caught))}`);

  t.diagnostic(`G3-03 · THE SKIP AT A BOOT: the file carries \`['x']\` ${JSON.stringify(control.value)}; the boot `
    + `with the list naming \`['win','tabs']\` answered ${JSON.stringify(shape.status)}, asked the body ${asks}× `
    + `and \`constraints()\` names ${JSON.stringify(rows.map((row) => ({ address: addressSet(row.address), id: row.id })))}; `
    + `the loaded state reads \`['x']\` ${JSON.stringify(boot.ok === true ? loaded.value : null)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-04` · THE LEAF-ABSENT ARM AT A BOOT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-04 · THE LEAF-ABSENT ARM AT A BOOT: the same file booted with `{address: [\'must\'], id: \'p\', constraint: () => true}` — SHAPE-VALID, absent from the file, parent = the REGISTER — RETURNS AN INSTANCE, and `read([\'must\'])` throws `AddressNotFound`', (t) => {
  // **THE SAME ELEMENT `sites.md §3` ROW 5 MEASURED AS THE ONE THE BOOT REFUSES** (*"`{address: ['must'], id:
  // 'p', constraint: () => true}` on that file"* → `ConstraintListInvalid`), and **the same shape `G3-02`
  // proves APPLIED at a `mem` construction**. **THE TWO ROUTES MUST AGREE** (`D-90` (5)'s own finding: the two
  // routes answer one input with two statuses, and the pin leaves one).
  const { filePath } = seededFile('boot-applied');
  let asks = 0;
  const boot = attempt(() => make({
    filePath,
    constraints: [{
      address: ['must'],
      id: 'p',
      constraint: () => {
        asks += 1;
        return true;
      },
    }],
  }));
  const shape = shapeOf(boot.ok === true ? null : boot.caught);
  const standing = boot.ok === true ? attempt(() => boot.value.read(['must'])) : null;
  const standingShape = standing === null ? { status: null, message: 'the boot refused' } : shapeOf(standing.ok === true ? null : standing.caught);
  const rows = boot.ok === true ? boot.value.constraints() : [];

  // ── (a) THE BOOT STANDS. ──────────────────────────────────────────────────────────────────────────────
  assert.equal(boot.ok, true,
    `**A SHAPE-VALID ELEMENT WHOSE PARENT IS THE REGISTER MUST BOOT** — the register always resolves to a `
      + `container (\`PIN-2\` (i)) and the pair is APPLIED (\`D-90\` (1)): the boot answered `
      + `${JSON.stringify(shape.status)} with message ${JSON.stringify(shape.message)}. **THIS IS THE `
      + `ROUTE-DISAGREEMENT \`PIN-5\` REMOVES**: the same element CONSTRUCTS on \`mem\` and was REFUSED at a `
      + `boot (\`sites.md §3\` row 5)`);

  // ── (b) IT WAS ASKED ONCE AND IT PASSED. ──────────────────────────────────────────────────────────────
  assert.equal(asks, 1,
    `**AND THE PAIR IS APPLIED AT THE BOOT, SO ITS BODY IS ASKED ONCE** — exactly as at a \`mem\` `
      + `construction (\`G3-02\`): the drive's body was entered ${asks} time(s)`);
  assert.equal(rows.length, 1,
    `and the pair stands: \`constraints()\` answers ${JSON.stringify(rows)}`);

  // ── (c) AND THE ADDRESS HOLDS NOTHING — THE PAIR JUDGED AN ABSENCE AND NOTHING WAS CREATED. ──────────
  assert.equal(standing.ok, false,
    `**THE ADDRESS THE PAIR OWNS IS STILL ABSENT AFTERWARDS**: the store is \`['x']\` alone and a `
      + `registration is not a write — \`read(['must'])\` answered ${JSON.stringify(standingShape.message)}`);
  assert.equal(standingShape.status, ADDRESS_NOT_FOUND,
    `and it refuses with the store's own absence code (\`src/error.rs\`, rank \`2\`): the drive caught `
      + `${JSON.stringify(standingShape.status)}`);

  t.diagnostic(`G3-04 · THE LEAF-ABSENT ARM AT A BOOT: \`{address: ['must']}\` over the seeded file answered `
    + `${JSON.stringify(shape.status)} after ${asks} ask(s), \`constraints()\` = `
    + `${JSON.stringify(rows.map((row) => ({ address: addressSet(row.address), id: row.id })))} and `
    + `\`read(['must'])\` threw ${JSON.stringify(standingShape.status)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-05` · THE BOOT'S LIST REFUSAL IS GONE AND THE SHAPE ARM IS INTACT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-05 · THE BOOT\'S LIST REFUSAL IS GONE AND THE SHAPE ARM IS INTACT: the same boot with `address: \'must\'` (a STRING) answers `ConstraintListInvalid` with the BYTE-IDENTICAL generated message and `log: []` — and the WELL-FORMED element of `G3-04` does NOT draw it', (t) => {
  // **`PIN-5` (ii): what remains of `ConstraintListInvalid` is THE MALFORMED LIST AND NOTHING ELSE** — an element
  // whose address is not a segment array, an empty `id`, the list's own outside forms. **AND `PIN-5` (iii)**:
  // `ConstraintListInvalid` keeps its rank (`16`), **its sentence** and its own triggers, so the sentence is
  // asserted here as BYTE-IDENTICAL between the two routes that answer it (the boot and the construction), and
  // nothing about its spelling is invented by this cell.
  const { filePath } = seededFile('boot-shape');
  const MALFORMED = { address: 'must', id: 'p', constraint: () => true };
  const bootMalformed = attempt(() => make({ filePath, constraints: [{ ...MALFORMED }] }));
  const bootShape = shapeOf(bootMalformed.ok === true ? null : bootMalformed.caught);
  // **THE SECOND ROUTE THE SENTENCE SERVES** — the same malformed element at a `mem` CONSTRUCTION, which is
  // the shape instant `sites.md §3.1` item 4 measured as answering the byte-identical sentence.
  const memMalformed = attempt(() => make({ constraints: [{ ...MALFORMED }] }));
  const memShape = shapeOf(memMalformed.ok === true ? null : memMalformed.caught);
  // **AND THE ARM THAT MUST NOT DRAW IT**: `G3-04`'s well-formed element on the same file.
  const wellFormed = attempt(() => make({
    filePath,
    constraints: [{ address: ['must'], id: 'p', constraint: () => true }],
  }));
  const wellFormedShape = shapeOf(wellFormed.ok === true ? null : wellFormed.caught);

  // ── (a) THE MALFORMED ELEMENT STILL DRAWS THE LIST'S OWN REFUSAL. ─────────────────────────────────────
  assert.equal(bootMalformed.ok, false,
    `**A MALFORMED ELEMENT MUST STILL REFUSE THE LIST** (\`PIN-5\` (ii): *"the malformed LIST and nothing `
      + `else"* — the arm SURVIVES): the boot RETURNED an instance, so the shape arm has been lost`);
  assert.equal(bootShape.status, LIST_INVALID,
    `and it answers \`ConstraintListInvalid\`, rank \`16\` (\`PIN-5\` (iii)): the drive caught `
      + `${JSON.stringify(bootShape.status)} with message ${JSON.stringify(bootShape.message)}`);
  assert.deepEqual(logKinds(bootMalformed.caught), [],
    `**WITH \`log: []\`** — the shape instants answer no judgement (\`PIN-5\` (ii); the census \`sites.md §3\` `
      + `row 10 re-measured): the drive read ${JSON.stringify(bootShape.message === 'the act RETURNED' ? null : logKinds(bootMalformed.caught))}`);

  // ── (b) THE SENTENCE IS ONE SENTENCE, BYTE-IDENTICAL ACROSS THE TWO ROUTES. ───────────────────────────
  assert.equal(memMalformed.ok, false,
    `and the same element at a \`mem\` CONSTRUCTION refuses too (\`sites.md §3.1\` item 4: *"a genuinely `
      + `shape-invalid \`address: 'must'\` draws the byte-identical message on both routes"*): it answered `
      + `${JSON.stringify(memShape.status)}`);
  assert.equal(memShape.status, LIST_INVALID,
    `with the same status: ${JSON.stringify(memShape.status)}`);
  assert.equal(bootShape.message, memShape.message,
    `**AND THE TWO MESSAGES ARE BYTE-IDENTICAL — ONE TEXT SERVES THE TWO FINDINGS** (\`PIN-5\` (iii): the `
      + `generated sentence keeps its own bytes): the boot answered ${JSON.stringify(bootShape.message)} and `
      + `the construction ${JSON.stringify(memShape.message)}`);
  assert.equal(bootShape.message.includes(`'must' is not a valid constraint entry in 'constraints'`), true,
    `and the sentence is the generated one, naming the entry and the key: `
      + `${JSON.stringify(bootShape.message)}`);

  // ── (c) AND THE WELL-FORMED ELEMENT DOES NOT DRAW IT — `PIN-5`'s own division. ────────────────────────
  assert.equal(wellFormedShape.status === LIST_INVALID, false,
    `**A WELL-FORMED PAIR IS NEVER ANSWERED BY THE SHAPE ARM** (\`PIN-5\` (ii), quoting `
      + `\`docs/specs/storeroom-native/contract.md:4335\`: *"a well-formed pair is never answered by the shape `
      + `arm"* — the sentence \`D-90\` (5) MAKES TRUE rather than amends): \`['must']\` over the seeded file `
      + `answered ${JSON.stringify(wellFormedShape.status)} with message `
      + `${JSON.stringify(wellFormedShape.message)}. **THE SHAPE ARM ANSWERS THE MALFORMED LIST AND NOT THE `
      + `UNRESOLVABLE ADDRESS**`);

  t.diagnostic(`G3-05 · THE SHAPE ARM IS INTACT AND IS NARROW: \`address: 'must'\` at the boot answered `
    + `${JSON.stringify(bootShape.status)} /\`log\` ${JSON.stringify(logKinds(bootMalformed.caught))} and at a `
    + `\`mem\` construction ${JSON.stringify(memShape.status)}; the two messages are `
    + `${bootShape.message === memShape.message ? 'BYTE-IDENTICAL' : 'DIFFERENT'} `
    + `(${JSON.stringify(bootShape.message)}); the WELL-FORMED \`['must']\` answered `
    + `${JSON.stringify(wellFormedShape.status)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-06` · THE SKIP AT `addConstraint`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-06 · THE SKIP AT `addConstraint`: `store.addConstraint({address: [\'window\',\'tabs\'], id: \'w2\'}, body)` on a store with NO `window` RETURNS AN IDENTITY and does not throw, the body is asked `0` times, and `constraints()` names the pair', (t) => {
  // **THE INSTANT** (`PIN-4` (iv): `addConstraint`) and **THE ARM** the ruling's first example names. **THE
  // ROUTE'S OWN READING TODAY** (`sites.md §3` row 12, re-taken at `§3.1` item 3): *"`addConstraint` behaves
  // identically at both example addresses"* — it asks the body once with `undefined` and refuses rank `19`.
  // **THE POST-CREATION ADD IS THE ROUTE THE WORKAROUND USES** (`tests/e2e/registration-repair-existence.
  // test.mjs`'s four green cells), and this cell does not move them: it adds a pair whose parent is ABSENT.
  const store = make();
  let asks = 0;
  const readings = [];
  const add = attempt(() => store.addConstraint({ address: ['window', 'tabs'], id: 'w2' }, (context) => {
    asks += 1;
    readings.push({ members: Object.keys(context).sort(), value: context.value });
    return { message: 'the pair at `window/tabs` refuses' };
  }));
  const shape = shapeOf(add.ok === true ? null : add.caught);
  const rows = store.constraints();

  // ── (a) THE CALL PASSES — directly, so the throw escapes to the assertion below and not to a `catch`. ──
  assert.equal(add.ok, true,
    `**THE CALL MUST RETURN AN IDENTITY AND MUST NOT THROW** (\`PIN-4\` (i): *"registration does not fail for `
      + `it"*; the identity is \`surface.md §2.12\` item 2 (a)'s opaque answer): the call answered `
      + `${JSON.stringify(shape.status)} with log ${JSON.stringify(logKinds(add.caught))} and message `
      + `${JSON.stringify(shape.message)}`);
  assert.equal(typeof add.value, 'object',
    `and what it answers is the pair's opaque IDENTITY: it answered a ${typeof add.value}`);
  assert.notEqual(add.value, null,
    `and not \`null\`: ${JSON.stringify(add.value)}`);

  // ── (b) ZERO ASKS, ONE CARRIED PAIR. ─────────────────────────────────────────────────────────────────
  assert.equal(asks, 0,
    `**A SKIPPED PAIR IS NOT ASKED AT \`addConstraint\`** (\`PIN-3\`; \`PIN-4\` (i)'s declared observable: *"the `
      + `body's ask-count at that instant is \`0\`"*): the body was entered ${asks} time(s), with the readings `
      + `${JSON.stringify(readings)}`);
  assert.equal(rows.length, 1,
    `**AND THE PAIR IS CARRIED AND NAMED** (\`PIN-4\` (i)): \`constraints()\` answers ${JSON.stringify(rows)}`);
  assert.equal(rows[0].id, 'w2',
    `under the caller's own \`id\`: ${JSON.stringify(rows[0].id)}`);
  assert.deepEqual(addressSet(rows[0].address), ['window/tabs'],
    `at the address it was registered at: ${JSON.stringify(addressSet(rows[0].address))}`);
  assert.deepEqual(Object.keys(rows[0]).sort(), PAIR_MEMBERS,
    `and the row carries the two declared members and no third: ${JSON.stringify(Object.keys(rows[0]))}`);

  t.diagnostic(`G3-06 · THE SKIP AT \`addConstraint\`: the call answered `
    + `${JSON.stringify(shape.status)} with an identity of class ${typeof add.value}; the body was asked `
    + `${asks}×; \`constraints()\` = ${JSON.stringify(rows.map((row) => ({ address: addressSet(row.address), id: row.id })))}; `
    + `the store's register reads ${JSON.stringify(attempt(() => store.read([])))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-07` · THE LEAF-ABSENT ARM AT `addConstraint` (the arm row `6` measured: `PIN-11` (c)'s own subject)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-07 · THE LEAF-ABSENT ARM AT `addConstraint`: `[\'window\']` on a store with no `window`, with a REFUSING body and NO repair, refuses rank `19` with `log: []` — the arm `sites.md §3` row `6` measured and `PIN-11` (c) is about', (t) => {
  // **THE ARM THAT MUST SURVIVE THE RULE UNCHANGED**: the register is the parent, so the pair is APPLIED and its
  // own key's absence is the state it judges. **AND THE `log` CENSUS IS THE SUBJECT OF A GUIDE CORRECTION**
  // (`PIN-11` (c): the guide's `§8.0a:1385`-`:1387` sentence is true of ONE state of two — *"No repair →
  // `log: []`; a carried repair that declines → `log` of length `2`"*, `sites.md §3.1` item 5 — and this cell
  // records the first state at the ADD route, which is where the guide's sentence is read).
  const store = make();
  let asks = 0;
  const add = attempt(() => store.addConstraint({ address: ['window'], id: 'w1' }, (context) => {
    asks += 1;
    return context.value === undefined
      ? { message: 'the register must hold `window` and it does not' }
      : true;
  }));
  const shape = shapeOf(add.ok === true ? null : add.caught);

  // ── (a) IT REFUSES, AT RANK `19`, AND NOT FOR A SKIP. ────────────────────────────────────────────────
  assert.equal(add.ok, false,
    `**AN APPLIED PAIR'S REFUSAL IS THE REGISTRATION'S** (\`PIN-3\`: the skip is the other arm, and this is `
      + `not it — the register is a container): the call RETURNED ${JSON.stringify(add.ok === true ? add.value : null)}`);
  assert.equal(shape.status, REGISTRATION_REFUSED,
    `and it answers rank \`19\`, the registration instant's own: the drive caught `
      + `${JSON.stringify(shape.status)} with message ${JSON.stringify(shape.message)}`);
  assert.deepEqual(logKinds(add.caught), [],
    `**AND \`log: []\` — THE CENSUS OF THE ARM WITH NO REPAIR** (\`sites.md §3.1\` item 5: *"No repair → `
      + `\`log: []\`"*; \`PIN-11\` (c)'s first state): the drive read `
      + `${JSON.stringify(logKinds(add.caught))}`);
  assert.equal(asks, 1,
    `and the body was asked exactly once — the reading that proves the pair was APPLIED and not skipped: `
      + `${asks}`);
  assert.deepEqual(store.constraints(), [],
    `and a REFUSED registration carries no pair — \`PIN-3\`'s own limit and not a contradiction of it `
      + `(\`sites.md §3.1\` item 3: *"the pair is NOT carried on a refusal"*): \`constraints()\` answers `
      + `${JSON.stringify(store.constraints())}`);

  t.diagnostic(`G3-07 · THE LEAF-ABSENT ARM AT \`addConstraint\`: the call answered `
    + `${JSON.stringify(shape.status)}, \`log\` ${JSON.stringify(logKinds(add.caught))}, after ${asks} ask; `
    + `\`constraints()\` = ${JSON.stringify(store.constraints())} — the arm the guide's \`§8.0a\` sentence `
    + `describes in one of its two states`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-08` · THE PARENT-IS-A-LEAF ARM IS **APPLIED**, AND THE LINE IS DRAWN BY THE NODE AND NOT BY THE VALUE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **⟶ RE-DERIVED 2026-11-02 ON `D-96` (1)–(3), (6), AND THE GROUND IS THE ARCHITECT'S, VERBATIM: *"Reject this,
// the constraint being there implicitly expects `'x'` to be a container"*** (`strata/decisions.md` · `D-96`).
// Under `D-96` (1) **the skip threshold is ABSENCE ALONE** — a pair is skipped exactly when its PARENT DOES NOT
// RESOLVE — and **a parent that RESOLVES AS A LEAF APPLIES its pair**, because a pair registered at
// `['x','deep']` DECLARES that `['x']` is a container: *"a leaf standing at `['x']` is therefore the state the
// pair is there to judge, not a state to look away from"* (`D-96` (2)). `D-90` (1)'s phrase *"the parent resolves
// to a container"* is READ THROUGH that row, and `D-96` (6) names this very cell's leaf half among the artifacts
// the withdrawal moves: **"cell `G3-08`'s leaf arm … must now assert the APPLY and the refusal"**.
//
// **WHAT THIS CELL PINNED BEFORE THE RE-DERIVATION, NAMED SO THE WITHDRAWAL IS VISIBLE AND NOT SILENT:** the leaf
// half asserted the PRE-`D-96` reading — the pair CARRIED, the ask-delta `0`, `constraints()` naming it — i.e. the
// *"not a container ⇒ skip"* reading `D-96` (6) withdraws by name. **THE CELL IS NOT LIGHTER FOR IT**: the
// skipped-registration limb is replaced by FOUR limbs the old reading cannot satisfy — the rank-`19` refusal, the
// ask with `context.value === undefined`, the PASSING registration that STANDS (so the arm is an APPLY and not a
// refusal-only curiosity), and the store's own `WriteParentNotLink` where the leaf's own key is written, which is
// the state the body judged. **WHAT MAKES IT RED NOW:** any return of the leaf-as-skip reading (the call
// answering an identity with an ask-delta of `0`), a body handed a resolved `value`, a rank other than `19`, a
// `log` that is no longer `[]` on the repairless refusal, a `constraints()` row left behind by a refused
// registration, or a `['x','deep']` write that LANDS under a leaf parent. **THE BRANCH HALF (ii) IS UNCHANGED IN
// SUBSTANCE**: an EMPTY OBJECT mints a `Kind::Map` branch, so the same pair is APPLICABLE there — the NODE, and
// never the value's class, is what decides (`D-96` (3)).

test('G3-08 · THE LINE IS THE NODE AND NOT THE VALUE — TWO STORES, BECAUSE THE LINE IS TWO DIFFERENT ACTS: (i) a PRIMITIVE at `[\'x\']` makes a LEAF and the pair at `[\'x\',\'deep\']` is APPLIED there — the constraint\'s presence implies `[\'x\']` is a container, so the body is asked with `context.value === undefined` and a REFUSING body refuses the registration at rank `19` (`ConstraintRefusedAtRegistration`), while a PASSING body\'s registration STANDS and `readLiteral([\'x\'])` answers `5`; (ii) an EMPTY OBJECT at `[\'window\']` makes a BRANCH, `readLiteral` answers `ReadTargetIsBranch`, and the SAME pair is APPLICABLE there — the `addConstraint` ITSELF asks it (`+1`), and a following write at the pair asks it once more (`+1`)', (t) => {
  // **`D-96` (1)–(3) IS THE WHOLE SUBJECT OF THE LEAF HALF, AND THE ARCHITECT'S SENTENCE IS ITS GROUND**: *"the
  // constraint being there implicitly expects `'x'` to be a container"* — so a leaf under it is the state the pair
  // JUDGES and not a reason to skip it. **THE LINE `D-96` (3) DRAWS IS THE NODE'S**: *"an EMPTY OBJECT written at
  // the parent makes the parent a BRANCH … so a pair under it is APPLICABLE; a PRIMITIVE written there makes a
  // LEAF and the pair is APPLICABLE TOO"* — the two stores are two different ACTS, and a value-class guess about
  // `{}` gets them wrong in opposite directions. **EVERY ASK-COUNT IS READ AS A PER-ACT DELTA**, so no figure here
  // is the sum of two instants.

  // ══ (i) THE LEAF ARM — a PRIMITIVE at `['x']`. ═══════════════════════════════════════════════════════════
  const leaf = make();
  const primitive = attempt(() => leaf.write(['x'], 'mem', 5));
  const literalUnderPrimitive = attempt(() => leaf.readLiteral(['x']));
  // (i-a) **A REFUSING BODY**: the pair is ASKED — the arm `D-96` (4) reads the same way at every instant — and
  // its refusal is the registration's, rank `19` (`D-96` (2): *"the body may refuse"*).
  const leafRefusalReadings = [];
  const leafRefuse = attempt(() => leaf.addConstraint({ address: ['x', 'deep'], id: 'leaf-refuses' }, (context) => {
    leafRefusalReadings.push({ members: Object.keys(context).sort(), value: context.value });
    return { message: 'the pair under a LEAF parent refuses the state its own presence declares a container' };
  }));
  const leafRefuseShape = shapeOf(leafRefuse.ok === true ? null : leafRefuse.caught);
  const leafRefuseAsks = leafRefusalReadings.length;
  const leafAfterRefusal = leaf.constraints();
  // (i-b) **A PASSING BODY AT THE SAME ADDRESS — THE ARM THAT PROVES AN APPLY AND NOT ONLY A REFUSAL**: a body
  // that admits the absence the leaf produces leaves the registration STANDING.
  const leafPassAsks = [];
  const leafPass = attempt(() => leaf.addConstraint({ address: ['x', 'deep'], id: 'leaf-passes' }, (context) => {
    leafPassAsks.push({ members: Object.keys(context).sort(), value: context.value });
    return context.value === undefined ? true : { message: 'this pair admits the leaf parent\'s absence alone' };
  }));
  const leafPassShape = shapeOf(leafPass.ok === true ? null : leafPass.caught);
  const leafRows = leaf.constraints();
  // **AND THE STORE'S OWN ANSWER WHERE THE LEAF'S KEY IS WRITTEN**: a leaf never holds a structured value, so the
  // write the pair's address names answers `WriteParentNotLink` and lands nothing — the very fact the body judged
  // as `undefined` (`D-96` (2)).
  const leafKeyWrite = attempt(() => leaf.write(['x', 'deep'], 'mem', 1));
  const leafDeltaAtKeyWrite = leafPassAsks.length - 1;
  // **AND THE PASS'S REACH IS UNCHANGED AND IS NOT THE GROUND HERE** (`D-56`/`D-66`): a write AT the leaf parent
  // names no address the pair stands at or beneath, so the delta around it is `0` — **not because the pair is
  // skipped** (`D-96` (1) retired that reason) but because the act's `triggered` set never names it.
  const leafBefore = leafPassAsks.length;
  const rewrite = attempt(() => leaf.write(['x'], 'mem', 7));
  const leafDeltaAtPass = leafPassAsks.length - leafBefore;

  // ══ (ii) THE BRANCH ARM — an EMPTY OBJECT at `['window']`, on a SECOND store. ════════════════════════════
  const branch = make();
  const branchAsks = [];
  const carried = attempt(() => branch.addConstraint({ address: ['window', 'tabs'], id: 'branch-pair' }, (context) => {
    branchAsks.push({ at: 'carried-registration', value: context.value });
    return context.value === undefined ? { message: 'the pair refuses an absent subtree' } : true;
  }));
  const carriedShape = shapeOf(carried.ok === true ? null : carried.caught);
  const carriedDelta = branchAsks.length;
  const emptyObject = attempt(() => branch.write(['window'], 'mem', {}));
  const literalUnderEmptyObject = attempt(() => branch.readLiteral(['window']));
  const emptyDelta = branchAsks.length - carriedDelta;
  // **THE APPLICABLE INSTANT, SEATED AT \`addConstraint\` ITSELF** — the same pair, re-registered (the verb's
  // declared OVERWRITE: *"acts are separate in time, so a later one replaces the earlier"*), now that its parent
  // is a container.
  const applied = attempt(() => branch.addConstraint({ address: ['window', 'tabs'], id: 'branch-pair' }, () => {
    branchAsks.push({ at: 'applied-registration', value: null });
    return true;
  }));
  const appliedShape = shapeOf(applied.ok === true ? null : applied.caught);
  const appliedDelta = branchAsks.length - carriedDelta - emptyDelta;
  const touched = attempt(() => branch.write(['window', 'tabs'], 'mem', 1));
  const touchedShape = shapeOf(touched.ok === true ? null : touched.caught);
  const touchedDelta = branchAsks.length - carriedDelta - emptyDelta - appliedDelta;
  const appliedReadings = branchAsks.slice(carriedDelta + emptyDelta);

  // ── (a) THE LEAF ARM: THE PAIR IS **APPLIED**, AND ITS REFUSAL IS THE REGISTRATION'S. ──────────────────
  assert.equal(primitive.ok, true,
    `**THE DRIVE MUST BE ABLE TO PUT A PRIMITIVE AT \`['x']\`** or it does not reach the leaf arm: the write `
      + `answered ${JSON.stringify(shapeOf(primitive.ok === true ? null : primitive.caught))}`);
  assert.equal(literalUnderPrimitive.ok, true,
    `**AND \`readLiteral(['x'])\` ANSWERS THE VALUE — the third of the predicate's three answers, AND UNDER `
      + `\`D-96\` (3) THAT ANSWER IS \`APPLICABLE\`** (*"ANY VALUE ANSWERED ⇒ the parent is a LEAF ⇒ APPLICABLE"*; `
      + `the pre-\`D-96\` reading made it \`SKIPPED\` and is withdrawn): the drive caught `
      + `${JSON.stringify(shapeOf(literalUnderPrimitive.ok === true ? null : literalUnderPrimitive.caught))}`);
  assert.equal(literalUnderPrimitive.value, 5,
    `and the value it answers is the primitive written: ${JSON.stringify(literalUnderPrimitive.value)}`);
  assert.equal(leafRefuse.ok, false,
    `**A REFUSING BODY UNDER A LEAF PARENT REFUSES THE REGISTRATION — THE ARM \`D-96\` (2) INVERTS**: *"the `
      + `constraint being there implicitly expects \`'x'\` to be a container"*, so the leaf is the state the pair `
      + `judges and its refusal is the registration's. **THE CALL RETURNED AN IDENTITY, WHICH IS THE PRE-\`D-96\` `
      + `SKIP READING RETURNING** (\`D-96\` (6): *"cell \`G3-08\`'s leaf arm … must now assert the APPLY and the `
      + `refusal"*): the drive answered ${JSON.stringify(leafRefuse.ok === true ? typeof leafRefuse.value : null)}`);
  assert.equal(leafRefuseShape.status, REGISTRATION_REFUSED,
    `and it refuses at rank \`19\`, the registration instant's own member — NOT the shape arm, which \`D-90\` (5) `
      + `reserves for the MALFORMED list: the drive caught ${JSON.stringify(leafRefuseShape.status)} with message `
      + `${JSON.stringify(leafRefuseShape.message)}`);
  assert.equal(leafRefuseAsks, 1,
    `**AND THE BODY WAS ASKED EXACTLY ONCE — THE READING THAT SEPARATES AN APPLY FROM A SKIP** (\`D-96\` (1): `
      + `*"a parent that RESOLVES applies the pair"*; \`PIN-3\`'s skip is absence alone): the body was entered `
      + `${leafRefuseAsks} time(s): ${JSON.stringify(leafRefusalReadings)}`);
  assert.deepEqual(leafRefusalReadings[0].members, CONTEXT_MEMBERS,
    `and it was handed the body's FIVE-member evaluation context, UNMOVED (\`PIN-8\` (iii) (a); \`D-92\` (1)): `
      + `${JSON.stringify(leafRefusalReadings[0].members)}`);
  assert.equal(leafRefusalReadings[0].value, undefined,
    `**AND \`context.value\` IS \`undefined\` — \`D-96\` (2) VERBATIM: *"its address cannot be read, so the `
      + `registration instant hands the body \`context.value === undefined\`"*** (the read of \`['x','deep']\` `
      + `cannot walk through a leaf): ${JSON.stringify(leafRefusalReadings[0].value)}`);
  assert.deepEqual(logKinds(leafRefuse.caught), [],
    `**AND THE REFUSAL CARRIES \`log: []\` — NO REPAIR WAS REGISTERED FOR THIS PAIR**, so nothing was attempted `
      + `and nothing crossed (\`D-90\` (2): a skip is not a refusal; the converse — an applied pair's refusal IS the `
      + `registration's — is what this arm reads): ${JSON.stringify(logKinds(leafRefuse.caught))}`);
  assert.deepEqual(leafAfterRefusal, [],
    `**AND THE REFUSED REGISTRATION LEAVES NO ROW BEHIND** — the pair is CARRIED only where the registration `
      + `COMPLETES (\`PIN-4\` (i)), and this one refused: \`constraints()\` answers `
      + `${JSON.stringify(leafAfterRefusal)}`);
  assert.equal(leafPass.ok, true,
    `**AND THE SAME PAIR UNDER THE SAME LEAF PARENT IS AN APPLY FOR A PASSING BODY TOO — THE LIMB THAT MAKES THIS `
      + `ARM AN APPLY AND NOT A REFUSAL-ONLY CURIOSITY** (\`D-96\` (1)–(2)): the call answered `
      + `${JSON.stringify(leafPassShape.status)} with message ${JSON.stringify(leafPassShape.message)}`);
  assert.equal(leafPassAsks.length, 1,
    `and that registration asked the body once: ${JSON.stringify(leafPassAsks)}`);
  assert.deepEqual(addressSet(leafRows[0].address), ['x/deep'],
    `and \`constraints()\` now names it (\`PIN-4\` (i)): ${JSON.stringify(leafRows.map((row) => addressSet(row.address)))}`);
  assert.equal(leafKeyWrite.ok, false,
    `**AND THE STORE'S OWN ANSWER WHERE THE LEAF'S KEY IS WRITTEN IS \`WriteParentNotLink\`** — a leaf never holds `
      + `a structured value, which is the state the body judged as \`undefined\` (\`D-96\` (2)): the write answered `
      + `${JSON.stringify(leafKeyWrite.ok === true ? leafKeyWrite.value : null)}`);
  assert.equal(shapeOf(leafKeyWrite.caught).status, 'WriteParentNotLink',
    `with the store's own code and no minted one (\`PIN-10\`; \`D-92\` (3): no status is minted): `
      + `${JSON.stringify(shapeOf(leafKeyWrite.caught).status)}`);
  assert.equal(leafDeltaAtKeyWrite, 0,
    `and a write that CANNOT LAND asks nothing — the pair is not reached by an act it refuses at the walk: the `
      + `delta around \`write(['x','deep'],'mem',1)\` is ${leafDeltaAtKeyWrite}`);
  assert.equal(rewrite.ok, true,
    `and the later write at the parent lands: ${JSON.stringify(shapeOf(rewrite.ok === true ? null : rewrite.caught))}`);
  assert.equal(leafDeltaAtPass, 0,
    `**AND THAT DELTA IS \`0\` FOR THE PASS'S OWN REASON AND NOT FOR THE WITHDRAWN ONE**: \`D-56\`/\`D-66\`'s reach `
      + `is what is read — a write AT the leaf parent names no address the pair stands at or beneath — **the skip `
      + `is no longer the ground, and \`D-96\` (1) retired it**: the delta around \`write(['x'],'mem',7)\` is `
      + `${leafDeltaAtPass}`);

  // ── (b) THE BRANCH ARM: THE SAME PAIR IS APPLICABLE THERE. ─────────────────────────────────────────────
  assert.equal(carried.ok, true,
    `**THE SECOND STORE'S PAIR IS CARRIED WHILE ITS PARENT IS ABSENT** (\`PIN-4\` (i)): the call answered `
      + `${JSON.stringify(carriedShape.status)} with message ${JSON.stringify(carriedShape.message)}`);
  assert.equal(carriedDelta, 0,
    `and asked \`0\` times there: ${JSON.stringify(branchAsks)}`);
  assert.equal(emptyObject.ok, true,
    `**THE EMPTY-OBJECT WRITE LANDS** (\`PIN-2\` (iii): an \`Object\` value mints a \`Kind::Map\` branch): `
      + `${JSON.stringify(shapeOf(emptyObject.ok === true ? null : emptyObject.caught))}`);
  assert.equal(literalUnderEmptyObject.ok, false,
    `**AND \`readLiteral(['window'])\` ANSWERS \`ReadTargetIsBranch\` — THE PARENT IS A BRANCH, NOT A LEAF, AND `
      + `THE VALUE'S CLASS IS WHAT DECIDED IT** (\`PIN-2\` (iii): *"measured — \`readLiteral\` at that parent `
      + `answers \`ReadTargetIsBranch\` while \`read\` answers \`{}\`"*): the drive answered `
      + `${JSON.stringify(literalUnderEmptyObject.ok === true ? literalUnderEmptyObject.value : null)}`);
  assert.equal(shapeOf(literalUnderEmptyObject.caught).status, READ_TARGET_IS_BRANCH,
    `with the store's own rank-\`8\` narrowing and no minted status: the drive caught `
      + `${JSON.stringify(shapeOf(literalUnderEmptyObject.caught).status)}`);
  assert.equal(emptyDelta, 0,
    `**AND THE EMPTY-OBJECT WRITE'S OWN ASK-DELTA IS \`0\`** — the act's touched set names the parent and `
      + `nothing below it (\`PIN-4\` (ii): *"a write that merely makes the parent a container without touching `
      + `the pair's address asks nothing"*; \`D-56\`/\`D-66\` unchanged): the delta around `
      + `\`write(['window'],'mem',{})\` is ${emptyDelta}, with the pair carried since ${carriedDelta} ask(s)`);
  assert.equal(applied.ok, true,
    `**THE APPLICABLE INSTANT IS THE \`addConstraint\` ITSELF AND IT PASSES** (\`PIN-2\` (iv): the parent is now `
      + `a container): the call answered ${JSON.stringify(appliedShape.status)} with message `
      + `${JSON.stringify(appliedShape.message)}`);
  assert.equal(appliedDelta, 1,
    `**AND IT IS THE \`addConstraint\` THAT ASKS THE PAIR, SO ITS OWN DELTA IS \`+1\`** (\`PIN-2\` (v): the rule `
      + `is re-read at every instant that would apply the pair): the delta is ${appliedDelta}, the readings `
      + `${JSON.stringify(appliedReadings)}`);
  assert.equal(touched.ok, true,
    `and the write at the pair's own address lands: ${JSON.stringify(touchedShape)}`);
  assert.equal(touchedDelta, 1,
    `**AND IT ASKS THE PAIR ONCE MORE — the pass reaches the pair by its own address** (\`D-56\`/\`D-66\`'s `
      + `reach, unchanged): the delta around \`write(['window','tabs'],'mem',1)\` is ${touchedDelta}`);

  t.diagnostic(`G3-08 · THE LINE IS THE NODE: LEAF ARM — \`write(['x'],'mem',5)\` → \`readLiteral(['x'])\` `
    + `${JSON.stringify(literalUnderPrimitive.value)}; the REFUSING \`addConstraint(['x','deep'])\` answered `
    + `${JSON.stringify(leafRefuseShape.status)} with \`log\` ${JSON.stringify(logKinds(leafRefuse.caught))} at an `
    + `ask of ${leafRefuseAsks} with \`value\` ${JSON.stringify(leafRefusalReadings[0] === undefined ? null : leafRefusalReadings[0].value)}`
    + ` and left ${JSON.stringify(leafAfterRefusal)}; the PASSING \`addConstraint\` at the same pair answered `
    + `${JSON.stringify(leafPassShape.status)} at an ask of ${leafPassAsks.length} and \`constraints()\` names `
    + `${JSON.stringify(leafRows.map((row) => ({ address: addressSet(row.address), id: row.id })))}; `
    + `\`write(['x','deep'],'mem',1)\` threw ${JSON.stringify(shapeOf(leafKeyWrite.caught).status)} at a delta of `
    + `${leafDeltaAtKeyWrite}, and the later write at the parent's was ${leafDeltaAtPass}. BRANCH ARM — `
    + `\`write(['window'],'mem',{})\` → \`readLiteral(['window'])\` `
    + `${JSON.stringify(shapeOf(literalUnderEmptyObject.caught).status)}; the carried pair's delta was `
    + `${carriedDelta}, the empty-object write's ${emptyDelta}, the re-registration's ${appliedDelta} and the `
    + `write at the pair's address ${touchedDelta}. **\`{}\` IS A BRANCH AND \`5\` IS A LEAF, AND A LEAF PARENT `
    + `APPLIES TOO — THE PAIR'S PRESENCE DECLARES ITS PARENT A CONTAINER (\`D-96\`) AND THE PREDICATE FOLLOWS THE `
    + `NODE**`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-09` · THE SKIP AFTER AN ANCESTOR `delete`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-09 · THE SKIP AFTER AN ANCESTOR `delete`: a pair at `[\'window\',\'tabs\']` whose body passes only when `context.value` is not `undefined` is CARRIED while `window` is absent; `write([\'window\'],\'mem\',{tabs:1})` — its value CONTAINS the pair\'s key — reaches it and asks it ONCE with the op\'s own landed value and it PASSES; then `delete([\'window\'])` is reached by its own subtree and the pair is SKIPPED, so the delete LANDS, the ask-count is unmoved and `read([])` answers `{}`', (t) => {
  // **`PIN-4` (iii) IN ONE SENTENCE**: *"a pair at `['window','tabs']` is SKIPPED after a `delete` of
  // `['window']` and APPLIES again when `window` stands as a container and an act touches `['window','tabs']`"*
  // — *"A `delete` of `['window']` reaches the pair's home entry … so the pair is IN the act's `triggered` set
  // and, under this pin, is skipped there rather than asked; the delete therefore SUCCEEDS on a state the pair
  // would have refused."* **AND `PIN-4` (ii) DECIDES WHICH WRITE ASKS IT**: *"the declared observable is a
  // write whose written value contains the pair's key"*, so the landing is `{tabs: 1}` and not `{}`. **THE BODY
  // MUST NOT REFUSE THE FIRST WRITE**: a refused write is rolled back and would leave the parent absent by
  // accident, which would make the `delete` arm prove nothing.
  const store = make();
  const asks = [];
  const body = (context) => {
    asks.push({ members: Object.keys(context).sort(), value: context.value });
    return context.value === undefined
      ? { message: 'the pair refuses an absent subtree' }
      : true;
  };
  const add = attempt(() => store.addConstraint({ address: ['window', 'tabs'], id: 'w' }, body));
  const addShape = shapeOf(add.ok === true ? null : add.caught);
  const addDelta = asks.length;
  const write = attempt(() => store.write(['window'], 'mem', { tabs: 1 }));
  const writeShape = shapeOf(write.ok === true ? null : write.caught);
  const writeDelta = asks.length - addDelta;
  const writeReading = asks[addDelta];
  const beforeDelete = asks.length;
  const del = attempt(() => store.delete(['window']));
  const deleteShape = shapeOf(del.ok === true ? null : del.caught);
  const deleteDelta = asks.length - beforeDelete;
  const register = attempt(() => store.read([]));

  // ── (a) THE PAIR IS CARRIED WHILE ITS PARENT IS ABSENT. ───────────────────────────────────────────────
  assert.equal(add.ok, true,
    `**THE PAIR MUST BE CARRIED** (\`PIN-4\` (i)), or no later instant has a pair to reach: the call `
      + `answered ${JSON.stringify(addShape.status)} with message ${JSON.stringify(addShape.message)}`);
  assert.equal(addDelta, 0,
    `and it is skipped at its own registration (\`PIN-3\`): the delta is ${addDelta}`);
  // ── (b) THE WRITE WHOSE VALUE CONTAINS THE KEY ASKS IT ONCE, WITH THE OP'S OWN LANDED VALUE. ──────────
  assert.equal(write.ok, true,
    `**THE FIRST WRITE MUST LAND — A REFUSED WRITE IS ROLLED BACK** (\`PIN-4\` (ii)'s declared observable; the `
      + `cell's own warning: a refusal here would leave the parent absent by accident and make the \`delete\` `
      + `arm prove nothing): it answered ${JSON.stringify(writeShape.status)} with message `
      + `${JSON.stringify(writeShape.message)}`);
  assert.equal(writeDelta, 1,
    `**AND IT ASKS THE PAIR ONCE — the written value CONTAINS the pair's key, so the act's own touched set `
      + `names the pair's address** (\`D-56\`/\`D-66\`, unchanged; \`PIN-4\` (ii)): the delta around `
      + `\`write(['window'],'mem',{tabs:1})\` is ${writeDelta}`);
  assert.deepEqual(writeReading.value, { tabs: 1 },
    `**AND IT IS ASKED WITH THE OP'S OWN LANDED VALUE** — the state the act left, not the pair's address's own `
      + `sub-value: the reading is ${JSON.stringify(writeReading.value)}`);
  assert.deepEqual(writeReading.members, CONTEXT_MEMBERS,
    `and with the five-member context, unmoved: ${JSON.stringify(writeReading.members)}`);

  // ── (c) THE DELETE IS REACHED, SKIPPED, AND LANDS. ────────────────────────────────────────────────────
  assert.equal(del.ok, true,
    `**THE DELETE MUST LAND — THE PAIR IS SKIPPED THERE RATHER THAN ASKED** (\`PIN-4\` (iii): *"the delete `
      + `therefore SUCCEEDS on a state the pair would have refused"*): it answered `
      + `${JSON.stringify(deleteShape.status)} with log ${JSON.stringify(logKinds(del.caught))} and message `
      + `${JSON.stringify(deleteShape.message)}. **A REFUSAL HERE IS THE RULE NOT BEING READ AT THE PASS**`);
  assert.equal(deleteDelta, 0,
    `**AND THE ASK-COUNT IS UNMOVED ACROSS IT** (\`PIN-3\`: a skipped pair is not asked): the delta around `
      + `\`delete(['window'])\` is ${deleteDelta}`);
  assert.equal(register.ok, true,
    `and the register is readable afterwards: ${JSON.stringify(shapeOf(register.ok === true ? null : register.caught))}`);
  assert.deepEqual(register.value, {},
    `**AND IT ANSWERS \`{}\` — THE ANCESTOR REMOVAL LANDED** (\`PIN-4\` (iii)): the drive read `
      + `${JSON.stringify(register.value)}`);

  t.diagnostic(`G3-09 · THE SKIP AFTER AN ANCESTOR \`delete\`: the pair was CARRIED at an ask-delta of `
    + `${addDelta}; \`write(['window'],'mem',{tabs:1})\` answered ${JSON.stringify(writeShape.status)} with a `
    + `delta of ${writeDelta} and the value ${JSON.stringify(writeReading === undefined ? null : writeReading.value)}; `
    + `\`delete(['window'])\` answered ${JSON.stringify(deleteShape.status)} with a delta of ${deleteDelta}; `
    + `\`read([])\` = ${JSON.stringify(register.value)}; the ask ledger is `
    + `${JSON.stringify(asks.map((reading) => reading.value))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-10` · THE SKIP AT A RE-ARM
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-10 · THE SKIP AT A RE-ARM: a pair at `[\'window\',\'tabs\']` CARRIED while `window` is absent — `constraintOff(pair)` then `constraintOn(pair)` — the re-enable does NOT throw, the body is asked `0` times, and `constraints()` still names the pair', (t) => {
  // **`PIN-4` (iv)'s FOURTH INSTANT** is *"a re-arm — `constraintOn`'s enable arm and `restoreHeldPair`'s wake"*,
  // and **`D-90` (4)** names *"the toggles that re-arm a held pair"*. **THE RE-ENABLE REACHES THE SAME `K-1`**,
  // so it is the same registration evaluation and the same rule; a pair that is held while its parent is absent
  // must go back in without a refusal.
  const store = make();
  const asks = [];
  const body = (context) => {
    asks.push({ members: Object.keys(context).sort(), value: context.value });
    return context.value === undefined
      ? { message: 'the pair refuses an absent subtree' }
      : true;
  };
  const pair = { address: ['window', 'tabs'], id: 't' };
  const add = attempt(() => store.addConstraint(pair, body));
  const addShape = shapeOf(add.ok === true ? null : add.caught);
  const addDelta = asks.length;
  const off = attempt(() => store.constraintOff(pair, body));
  const offShape = shapeOf(off.ok === true ? null : off.caught);
  const beforeOn = asks.length;
  const on = attempt(() => store.constraintOn(pair, body));
  const onShape = shapeOf(on.ok === true ? null : on.caught);
  const onDelta = asks.length - beforeOn;
  const rows = store.constraints();

  // ── (a) THE PAIR IS HELD FIRST — the arm this cell re-arms. ───────────────────────────────────────────
  assert.equal(add.ok, true,
    `**THE PAIR MUST BE CARRIED BEFORE A RE-ARM HAS A SUBJECT** (\`PIN-4\` (i)): the call answered `
      + `${JSON.stringify(addShape.status)} with message ${JSON.stringify(addShape.message)}`);
  assert.equal(addDelta, 0,
    `and its own registration asked nothing: the delta is ${addDelta}`);
  assert.equal(off.ok, true,
    `and the disable half answers nothing and throws nothing (\`§2.12\` item 2 (a)): `
      + `${JSON.stringify(offShape.status)}`);

  // ── (b) THE RE-ENABLE DOES NOT THROW AND ASKS NOTHING. ────────────────────────────────────────────────
  assert.equal(on.ok, true,
    `**THE RE-ENABLE MUST NOT THROW — THE RE-ARM REACHES THE SAME \`K-1\`** (\`PIN-4\` (iv); \`D-90\` (4)): `
      + `\`constraintOn\` answered ${JSON.stringify(onShape.status)} with message `
      + `${JSON.stringify(onShape.message)}`);
  assert.equal(onDelta, 0,
    `**AND THE BODY IS ASKED \`0\` TIMES THERE** (\`PIN-3\`; \`PIN-4\` (i)'s declared observable): the delta `
      + `around \`constraintOn\` is ${onDelta}, with the readings ${JSON.stringify(asks)}`);
  assert.equal(rows.length, 1,
    `**AND \`constraints()\` STILL NAMES THE PAIR** (\`PIN-4\` (i): *"the entry's read model carries it"*): `
      + `the drive read ${JSON.stringify(rows)}`);
  assert.equal(rows[0].id, 't',
    `under the caller's own \`id\`: ${JSON.stringify(rows[0].id)}`);
  assert.deepEqual(addressSet(rows[0].address), ['window/tabs'],
    `at the pair's own address: ${JSON.stringify(addressSet(rows[0].address))}`);

  t.diagnostic(`G3-10 · THE SKIP AT A RE-ARM: the pair was carried at a delta of ${addDelta}; `
    + `\`constraintOff\` answered ${JSON.stringify(offShape.status)}; \`constraintOn\` answered `
    + `${JSON.stringify(onShape.status)} at a delta of ${onDelta}; \`constraints()\` = `
    + `${JSON.stringify(rows.map((row) => ({ address: addressSet(row.address), id: row.id })))}; the ask ledger `
    + `is ${JSON.stringify(asks.map((reading) => reading.value))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-11` · THE PASS'S SKIP ON A `rollback`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-11 · THE PASS\'S SKIP ON A `rollback`: a pair whose parent STANDS and whose body refuses an absent subtree; then a `rollback` of the op that made the parent stand — the pair is REACHED by the reversal\'s own set and is NOT ASKED, and the rollback LANDS', (t) => {
  // **`PIN-4` (iv)'s FIFTH INSTANT** is *"THE PASS over a `write`, a `delete` or a `rollback`"*, and the reversal
  // is the act whose own set is the one that removes the parent: **the reversal names the op the parent's write
  // landed** (`rollback(opId)` — *"Roll the journal back to \`opId\`"*), and the state it restores is the state
  // before that write, in which the parent does not stand. **SO THE PAIR IS IN THE ACT'S REACH AND ITS PARENT IS
  // NOT A CONTAINER AT THE INSTANT THE ACT WOULD APPLY IT** — `PIN-2` (ii)'s second arm — and under the rule the
  // pair is SKIPPED, which is what lets the reversal land.
  const store = make();
  const windowWrite = attempt(() => store.write(['window'], 'mem', { tabs: 1 }));
  const windowOp = windowWrite.ok === true ? windowWrite.value.op : null;
  const asks = [];
  const add = attempt(() => store.addConstraint({ address: ['window', 'tabs'], id: 'w' }, (context) => {
    asks.push({ members: Object.keys(context).sort(), value: context.value });
    return context.value === undefined
      ? { message: 'the pair refuses an absent subtree' }
      : true;
  }));
  const addShape = shapeOf(add.ok === true ? null : add.caught);
  const addDelta = asks.length;
  const beforeRollback = asks.length;
  const rollback = attempt(() => store.rollback(windowOp === null ? null : windowOp.opId));
  const rollbackShape = shapeOf(rollback.ok === true ? null : rollback.caught);
  const rollbackDelta = asks.length - beforeRollback;
  const gone = attempt(() => store.read(['window']));

  // ── (a) THE DRIVE REACHED ITS ARM: THE PARENT STANDS AND THE PAIR IS APPLICABLE THERE. ────────────────
  assert.equal(windowWrite.ok, true,
    `**THE WRITE THAT MAKES THE PARENT STAND MUST LAND** — it is the mark the rollback names: it answered `
      + `${JSON.stringify(shapeOf(windowWrite.ok === true ? null : windowWrite.caught))}`);
  assert.notEqual(windowOp, null,
    `and it answered an op, which is the MARK: ${JSON.stringify(windowOp)}`);
  assert.equal(typeof windowOp.opId, 'string',
    `with the \`opId\` \`rollback\` takes (\`PAR-JS-9\`: *"the \`JournalOp.opId\` string"*): `
      + `${JSON.stringify(windowOp.opId)}`);
  assert.equal(add.ok, true,
    `and the pair registers while the parent stands: ${JSON.stringify(addShape.status)} / `
      + `${JSON.stringify(addShape.message)}`);
  assert.equal(addDelta, 1,
    `**AND IT IS APPLIED THERE — the registration asks it once** (\`PIN-2\` (iv)): the delta is ${addDelta}, `
      + `the readings ${JSON.stringify(asks)}`);
  assert.equal(asks[0].value, 1,
    `with the value standing at the pair's own address: ${JSON.stringify(asks[0].value)}`);

  // ── (b) THE REVERSAL LANDS BECAUSE THE PAIR IS SKIPPED IN ITS OWN SET. ────────────────────────────────
  assert.equal(rollback.ok, true,
    `**THE ROLLBACK MUST LAND** — the pair is reached by the reversal's own set and is SKIPPED there rather `
      + `than asked (\`PIN-4\` (iv), \`PIN-3\`): it answered ${JSON.stringify(rollbackShape.status)} with log `
      + `${JSON.stringify(logKinds(rollback.caught))} and message ${JSON.stringify(rollbackShape.message)}. `
      + `**A \`ConstraintPassRefused\` HERE IS THE PASS ASKING A PAIR THE RULE SKIPS**`);
  assert.equal(rollbackDelta, 0,
    `**AND THE PAIR IS NOT ASKED — the whole ask-count is unmoved across the reversal** (\`PIN-3\`: *"not `
      + `asked, not refused for, not repaired for"*): the delta is ${rollbackDelta}, the readings `
      + `${JSON.stringify(asks.map((reading) => reading.value))}`);
  assert.deepEqual(rollback.value.undoneOps, [windowOp.opId],
    `and the reversal names the op it undid — the mark the parent's own write left (\`RollbackRecord\`: `
      + `\`undoneOps\` is a LIST OF IDS): ${JSON.stringify(rollback.value.undoneOps)}`);
  assert.equal(gone.ok, false,
    `**AND THE PARENT IS GONE AFTERWARDS** — the reversal restored the state the mark names: `
      + `\`read(['window'])\` answered ${JSON.stringify(gone.ok === true ? gone.value : null)}`);
  assert.equal(shapeOf(gone.caught).status, ADDRESS_NOT_FOUND,
    `with the store's own absence code: ${JSON.stringify(shapeOf(gone.caught).status)}`);

  t.diagnostic(`G3-11 · THE PASS'S SKIP ON A \`rollback\`: the parent's write was `
    + `${JSON.stringify(windowOp === null ? null : windowOp.opId)}; the pair registered at a delta of ${addDelta} with `
    + `\`value\` ${JSON.stringify(asks[0] === undefined ? null : asks[0].value)}; the rollback of that op `
    + `answered ${JSON.stringify(rollbackShape.status)} with \`undoneOps\` `
    + `${JSON.stringify(rollback.value === undefined ? null : rollback.value.undoneOps)} and an ask-delta of `
    + `${rollbackDelta}; \`read(['window'])\` threw ${JSON.stringify(shapeOf(gone.caught).status)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-12` · NO READ DISTINGUISHES THE TWO EXAMPLES, AND THE WALK DOES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('G3-12 · NO READ DISTINGUISHES THE TWO EXAMPLES, AND THE WALK DOES: `read([\'window\'])` and `read([\'window\',\'tabs\'])` each throw `AddressNotFound` and `read([])` answers `{}`; `readLiteral([])` answers `ReadTargetIsBranch`, `readLiteral([\'window\'])` on an absent parent answers `AddressNotFound`, and on a LEAF parent answers a value — three arms, three answers, NO STATUS MINTED', (t) => {
  // **`PIN-2` (ii)'s GROUND, DRIVEN AS A MEASUREMENT**: the predicate's discriminator is the store's own node
  // kind, and **no read the store already offers distinguishes the ruling's two examples** — `['window']` and
  // `['window','tabs']` both refuse `AddressNotFound` on a store with no `window`. **SO THE RULE'S
  // DISCRIMINATOR CANNOT HAVE BEEN TAKEN FROM A READ OF THE PAIR'S OWN ADDRESS**, and this cell is the reading
  // that says so. **AND THE THREE ARMS OF THE WALK IT READS ARE THE ONES `sites.md §3.1` item 6 re-took**:
  // `[]` → `ReadTargetIsBranch` · an absent address → `AddressNotFound` · a leaf → the value.
  // **`JSG-10.9` ALREADY PINS THE BRANCH ARM AT A SUPPLIED TIER** (`tests/e2e/greens.mjs`); **what this cell
  // adds is the TIER-OMITTED form of all three arms** (`PIN-2` (ii): *"the tier argument is omitted because the
  // zero-tier call selects every tier"*), which no committed cell pairs today.
  const empty = make();
  const readKey = attempt(() => empty.read(['window']));
  const readBelowKey = attempt(() => empty.read(['window', 'tabs']));
  const readRegister = attempt(() => empty.read([]));
  const literalRegister = attempt(() => empty.readLiteral([]));
  const literalAbsentParent = attempt(() => empty.readLiteral(['window']));
  const literalBelowAbsent = attempt(() => empty.readLiteral(['window', 'tabs']));

  const leaf = make();
  leaf.write(['window'], 'mem', 5);
  const literalLeaf = attempt(() => leaf.readLiteral(['window']));
  const readLeaf = attempt(() => leaf.read(['window']));

  // ── (a) THE TWO EXAMPLES ARE INDISTINGUISHABLE TO `read`. ─────────────────────────────────────────────
  assert.equal(readKey.ok, false,
    `**\`read(['window'])\` THROWS ON A STORE WITH NO \`window\`**: it answered `
      + `${JSON.stringify(readKey.ok === true ? readKey.value : null)}`);
  assert.equal(shapeOf(readKey.caught).status, ADDRESS_NOT_FOUND,
    `with the walk's own absence code: ${JSON.stringify(shapeOf(readKey.caught).status)}`);
  assert.equal(readBelowKey.ok, false,
    `**AND SO DOES \`read(['window','tabs'])\` — THE SAME ANSWER FOR THE OTHER EXAMPLE**: it answered `
      + `${JSON.stringify(readBelowKey.ok === true ? readBelowKey.value : null)}`);
  assert.equal(shapeOf(readBelowKey.caught).status, shapeOf(readKey.caught).status,
    `**NO READ DISTINGUISHES THEM** (\`PIN-2\` (ii)'s ground: *"no existing status supplies it"*): the two `
      + `reads answered ${JSON.stringify([shapeOf(readKey.caught).status, shapeOf(readBelowKey.caught).status])}`);
  assert.equal(readRegister.ok, true,
    `and the register reads: ${JSON.stringify(shapeOf(readRegister.ok === true ? null : readRegister.caught))}`);
  assert.deepEqual(readRegister.value, {},
    `**AND IT ANSWERS \`{}\` — the register resolves and holds nothing** (\`PIN-2\` (i): the empty parent is the `
      + `register): ${JSON.stringify(readRegister.value)}`);

  // ── (b) THE WALK'S THREE ARMS, TIER OMITTED. ──────────────────────────────────────────────────────────
  assert.equal(literalRegister.ok, false,
    `**THE REGISTER IS A BRANCH: \`readLiteral([])\` REFUSES** (\`PIN-2\` (ii)'s first arm): it answered `
      + `${JSON.stringify(literalRegister.ok === true ? literalRegister.value : null)}`);
  assert.equal(shapeOf(literalRegister.caught).status, READ_TARGET_IS_BRANCH,
    `with the store's own rank-\`8\` narrowing — NO STATUS MINTED (\`PIN-2\` (ii), \`PIN-10\`): `
      + `${JSON.stringify(shapeOf(literalRegister.caught).status)}`);
  assert.equal(literalAbsentParent.ok, false,
    `**AN ABSENT ADDRESS IS THE SECOND ARM: it refuses** — the predicate's \`AddressNotFound\` ⇒ SKIPPED: it `
      + `answered ${JSON.stringify(literalAbsentParent.ok === true ? literalAbsentParent.value : null)}`);
  assert.equal(shapeOf(literalAbsentParent.caught).status, ADDRESS_NOT_FOUND,
    `with the walk's own code: ${JSON.stringify(shapeOf(literalAbsentParent.caught).status)}`);
  assert.equal(literalBelowAbsent.ok, false,
    `and the same for an address under an absent parent: `
      + `${JSON.stringify(shapeOf(literalBelowAbsent.caught).status)}`);
  assert.equal(literalLeaf.ok, true,
    `**A LEAF ANSWERS A VALUE — THE THIRD ARM** (\`PIN-2\` (ii): *"A VALUE ANSWERED ⇒ THE PARENT IS A LEAF ⇒ `
      + `SKIPPED"*): \`readLiteral(['window'])\` on a leaf threw `
      + `${JSON.stringify(shapeOf(literalLeaf.caught))}`);
  assert.equal(literalLeaf.value, 5,
    `and the value it answers is the leaf's own: ${JSON.stringify(literalLeaf.value)}`);
  assert.equal(readLeaf.ok, true,
    `and \`read(['window'])\` answers the same value at a leaf — the two forms are indistinguishable there: `
      + `${JSON.stringify(readLeaf.value)}`);
  assert.equal(readLeaf.value, literalLeaf.value,
    `**SO THE THREE ARMS ARE THREE DIFFERENT ANSWERS AND NO FOURTH WAS MINTED**: branch `
      + `${JSON.stringify(READ_TARGET_IS_BRANCH)}, absent ${JSON.stringify(ADDRESS_NOT_FOUND)}, leaf `
      + `${JSON.stringify(literalLeaf.value)}`);

  t.diagnostic(`G3-12 · THE WALK AND THE READ: \`read(['window'])\` → ${JSON.stringify(shapeOf(readKey.caught).status)}, `
    + `\`read(['window','tabs'])\` → ${JSON.stringify(shapeOf(readBelowKey.caught).status)}, \`read([])\` → `
    + `${JSON.stringify(readRegister.value)}; \`readLiteral([])\` → `
    + `${JSON.stringify(shapeOf(literalRegister.caught).status)}, \`readLiteral(['window'])\` absent → `
    + `${JSON.stringify(shapeOf(literalAbsentParent.caught).status)}, at the leaf \`5\` → `
    + `${JSON.stringify(literalLeaf.value)}, at \`[]\` under an absent parent → `
    + `${JSON.stringify(shapeOf(literalBelowAbsent.caught).status)}. **THE TWO EXAMPLES ARE ONE READING AND THE `
    + `WALK IS THREE**`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `G3-13` · THE RE-RUN IS AN INSTANT THAT READS THE RULE — AND UNDER `D-96` (4) IT ASKS THE PAIR
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **⟶ RE-DERIVED 2026-11-02 ON `D-96` (4), WHOSE GROUND IS THE ARCHITECT'S *"See above"* — the re-run is read the
// same way as the LEAF arm**: *"A repair that writes a leaf over its own pair's parent does NOT skip its pair at
// the re-run: the re-run asks it, the body meets `undefined`-as-its-own-address's-state, and a body that refuses
// refuses the registration — rank `19` `ConstraintRefusedAtRegistration`, `KC-5` where the refusing pair is the
// repaired one."* **`D-94`'s UNCONDITIONAL RE-RUN IS UNMOVED** (`D-96` (4)'s last sentence): this cell reads WHO
// the re-run asks, and it reads it through `D-94` (2)'s own instant.
//
// **WHAT THIS CELL PINNED BEFORE THE RE-DERIVATION, NAMED SO THE WITHDRAWAL IS VISIBLE AND NOT SILENT:** the call
// STANDING on the repair's landing because *"the pair is skipped at the re-run"* — i.e. the `D-94` (2) reading
// that `D-96` (6) withdraws by name (*"cell `G3-13`'s skip arm … must now assert the APPLY and the refusal
// respectively"*). **`D-96` (5) NARROWS `D-94` (4)'s INERT-PAIR HAZARD TO THE DELETED PARENT AND TO NOTHING ELSE**,
// so a repair that FLATTENS its own pair's parent no longer completes over an inert pair: it meets a pair that
// refuses. **WHAT MAKES IT RED NOW:** the call answering an identity (the withdrawn skip returning), a body that is
// not asked a second time, a rank other than `19`, a `log` census other than the two entries the repaired
// refusal carries (or a \`repair-run\` entry whose `opId` is not the op the repair landed — the membership that
// selects `KC-5` over `KC-6`), the repair's landing rolled back, or a `constraints()` row left by a refused
// registration.
//
// **THE WRITE THIS CELL DRIVES IS THE VEHICLE `sites.md §3.1` ITEM 8 MEASURED** — the registration record carried
// at the store's `write` FOURTH POSITION — **and not the route's seventh member**: this cell's subject is the
// RE-RUN's rule, the route is `G3-20`…`G3-27`'s, and the two land ONE op by the kernel's own name (`PIN-7` (i):
// *"The write the route performs NAMES the REGISTRATION'S OWN \`CommitRecord\`"* — which is what the fourth
// position does and all it does). **A CELL THAT DROVE THE ROUTE HERE WOULD GO RED FOR THE ROUTE'S ABSENCE AND
// WOULD SAY NOTHING ABOUT THE RE-RUN.**

test('G3-13 · THE RE-RUN IS AN INSTANT THAT READS THE RULE, AND UNDER `D-96` (4) IT **ASKS**: a pair at `[\'window\',\'tabs\']` APPLIED while `window` is a branch, whose body refuses and whose repair writes a LEAF at `[\'window\']` and returns `{ok: true, op: <the op it landed>}` — the re-run finds the parent a LEAF and, because a pair\'s presence implicitly expects `[\'window\']` to be a container, ASKS the pair again and its refusal REFUSES the registration at rank `19` (`ConstraintRefusedAtRegistration`) on the `KC-5` terminal arm, the refusing pair being the REPAIRED one', (t) => {
  // **`PIN-4` (iv)'s LAST SENTENCE AND `D-94` (i) YES READ THROUGH `D-96` (4)**: *"the registration\'s own re-run
  // is an instant that would apply a pair and therefore reads the rule too"* — and **`D-96` (4)'s *"See above"*
  // fixes what that reading ANSWERS here**: a leaf parent is the state the pair declares and judges, so the pair is
  // ASKED and its refusal is the registration\'s. **`D-94` (1) STANDS UNMOVED: THE RE-RUN IS UNCONDITIONAL**, and
  // this cell\'s second ask is the re-run happening rather than being short-circuited.
  const store = make();
  const seeded = attempt(() => store.write(['window'], 'mem', { tabs: 1 }));
  const asks = [];
  let repairs = 0;
  let landedOpId = null;
  let landedAfter = null;
  const add = attempt(() => store.addConstraint({ address: ['window', 'tabs'], id: 'w' }, (context) => {
    asks.push({ members: Object.keys(context).sort(), op: context.op === null ? null : context.op.opId, value: context.value });
    if (context.value === undefined) return true;
    return {
      message: 'the pair refuses, and its repair flattens its own parent',
      repair: (repairContext) => {
        repairs += 1;
        // **THE LEAF**: a PRIMITIVE at the parent — `D-96` (4)'s own arm, *"a repair that writes a leaf over its
        // own pair's parent"* (`sites.md §3.1` item 6: a finite number is a `Kind::Leaf`).
        const landed = store.write(['window'], 'mem', 5, repairContext);
        landedOpId = landed.op.opId;
        landedAfter = landed.op.after;
        return { ok: true, op: landed.op };
      },
    };
  }));
  const addShape = shapeOf(add.ok === true ? null : add.caught);
  const literalAfter = attempt(() => store.readLiteral(['window']));
  const standing = attempt(() => store.read(['window']));
  const rows = store.constraints();
  const log = Array.isArray(add.caught !== null && typeof add.caught === 'object' ? add.caught.log : null)
    ? add.caught.log
    : null;
  const repairRun = log === null ? null : log.find((entry) => entry.kind === 'repair-run');

  // ── (a) THE DRIVE REACHED ITS ARM: THE PARENT STOOD AND THE PAIR WAS APPLIED. ─────────────────────────
  assert.equal(seeded.ok, true,
    `**\`window\` MUST STAND AS A BRANCH FOR THE PAIR TO BE APPLIED** (\`D-96\` (3)'s first arm): the seed `
      + `answered ${JSON.stringify(shapeOf(seeded.ok === true ? null : seeded.caught))}`);
  assert.equal(asks.length >= 1, true,
    `and the pair must have been asked at the registration: ${JSON.stringify(asks.map((reading) => reading.value))}`);
  assert.deepEqual(asks[0].value, 1,
    `with the value standing at its own address: ${JSON.stringify(asks[0].value)}`);
  assert.equal(repairs, 1,
    `**AND THE REPAIR MUST HAVE RUN ONCE — otherwise no op was landed and there is no re-run to judge** `
      + `(\`PIN-7\` (iii)): the drive entered it ${repairs} time(s)`);

  // ── (b) THE RE-RUN ASKED IT — TWO ASKS, AND THE SECOND IS THE REPAIR'S OWN INSTANT. ──────────────────
  assert.equal(asks.length, 2,
    `**THE PAIR IS ASKED TWICE — THE REGISTRATION\'S EVALUATION AND THE RE-RUN — BECAUSE A LEAF PARENT APPLIES `
      + `(\`D-96\` (4), verbatim: *"the re-run asks it"*; the withdrawn arm asked it once)**: the drive recorded `
      + `${asks.length} ask(s), ${JSON.stringify(asks.map((reading) => reading.value))}`);
  assert.deepEqual(asks[1].value, 5,
    `**AND THE RE-RUN\'S \`value\` IS THE OP\'S OWN LANDED VALUE — \`D-95\` (4)**: *"the re-run\'s context is where `
      + `the pair meets the repair\'s state — its \`value\` is \`produced.after.value\`"*: the drive read `
      + `${JSON.stringify(asks[1].value)} against the repair\'s landing ${JSON.stringify(landedAfter)}`);
  assert.deepEqual(asks[1].members, CONTEXT_MEMBERS,
    `and the re-run is handed the SAME five-member body context, UNMOVED (\`PIN-8\` (iii) (a); \`D-92\` (1)): `
      + `${JSON.stringify(asks[1].members)}`);

  // ── (c) THE REFUSAL — RANK `19`, AND THE TERMINAL ARM `KC-5`. ───────────────────────────────────────
  assert.equal(add.ok, false,
    `**A REFUSING PAIR AT THE RE-RUN REFUSES THE REGISTRATION** (\`D-96\` (4): *"a body that refuses refuses the `
      + `registration — rank \`19\` \`ConstraintRefusedAtRegistration\`, \`KC-5\` where the refusing pair is the `
      + `repaired one"*). **THE CALL ANSWERED AN IDENTITY, WHICH IS THE WITHDRAWN SKIP READING RETURNING** `
      + `(\`D-96\` (6): *"cell \`G3-13\`\'s skip arm … must now assert the APPLY and the refusal"*): `
      + `${JSON.stringify(add.ok === true ? typeof add.value : null)}`);
  assert.equal(addShape.status, REGISTRATION_REFUSED,
    `and the code is the registration instant\'s own rank-\`19\` member — not the pass\'s (\`20\`) and not the shape `
      + `arm\'s (\`16\`, which \`D-90\` (5) reserves for the MALFORMED list): the drive caught `
      + `${JSON.stringify(addShape.status)} with message ${JSON.stringify(addShape.message)}`);
  assert.deepEqual(logKinds(add.caught), ['constraint-check', 'repair-run'],
    `**AND THE REFUSAL CARRIES THE TWO ENTRIES THE REPAIRED ARM APPENDS, IN ORDER — THE CENSUS THAT MAKES THE `
      + `TERMINAL ARM \`KC-5\` RATHER THAN A REPAIRLESS REFUSAL (whose \`log\` is \`[]\`, \`G3-02\`'s arm)**: the `
      + `drive read ${JSON.stringify(logKinds(add.caught))}`);
  assert.equal(log.length, 2,
    `and exactly two — no third entry for the judgement that refused: ${JSON.stringify(log)}`);
  assert.equal(repairRun === null ? null : repairRun.opId, landedOpId,
    `**AND THE \`repair-run\` ENTRY NAMES THE OP THE REPAIR LANDED — THE CREDIT \`landedOp\` GAVE IT, WHICH IS WHAT `
      + `PUTS THE PAIR IN \`appliedRepairs\` AND SELECTS \`KC-5\` OVER \`KC-6\`** (\`D-96\` (4); `
      + `\`kernel-attempt.mjs\`\'s item-4 arms (e)/(f)): the entry reads `
      + `${JSON.stringify(repairRun === null ? null : repairRun.opId)} against ${JSON.stringify(landedOpId)}`);
  assert.equal(log[0].id, 'w',
    `and the \`constraint-check\` entry names THE PAIR THAT REFUSED — the repaired one: `
      + `${JSON.stringify(log[0].id)}`);
  // **`KC-5` ITSELF IS NOT A MEMBER OF ANYTHING THE CALLER IS HANDED**: \`kernel-registration.mjs\`\'s own clause
  // reads *"the synthetic attempt\'s `KC-4`/`KC-5`/`KC-6` stays inside this module and reaches no caller"*, so the
  // cell pins the RECORD THAT SELECTS the arm — the two entries above, the credited op among them — and declares
  // that it cannot pin the token\'s spelling. **A PASS THAT MOVED THE TOKEN ALONE WOULD BE INVISIBLE HERE, AND THAT
  // IS SAID RATHER THAN IMPLIED.**

  // ── (d) AND THE STORE STANDS WHERE THE REPAIR\'S WRITE LEFT IT (`PIN-7` (iv)). ───────────────────────
  assert.equal(literalAfter.ok, true,
    `and \`readLiteral([\'window\'])\` answers the VALUE the repair wrote — the parent IS a leaf: it threw `
      + `${JSON.stringify(shapeOf(literalAfter.caught))}`);
  assert.equal(literalAfter.value, 5,
    `with the repair\'s own value: ${JSON.stringify(literalAfter.value)}`);
  assert.equal(standing.ok, true,
    `and \`read([\'window\'])\` answers it too: ${JSON.stringify(standing.value)}`);
  assert.notEqual(landedOpId, null,
    `and the repair landed an op, which is what the credit rule judged (\`landedOp\`): `
      + `${JSON.stringify(landedOpId)}`);
  assert.deepEqual(rows, [],
    `**AND THE PAIR IS NOT CARRIED — THE REGISTRATION REFUSED, SO NO ROW STANDS** (the withdrawn arm asserted a `
      + `carried pair here, which only a STANDING registration can leave; \`PIN-4\` (i)'s \`carried\` applies to a `
      + `SKIP and never to a refusal): \`constraints()\` answers ${JSON.stringify(rows)}`);

  t.diagnostic(`G3-13 · THE RE-RUN ASKS THE PAIR (\`D-96\` (4)): the pair was asked ${asks.length}× at `
    + `${JSON.stringify(asks.map((reading) => reading.value))} (the second with \`op\` `
    + `${JSON.stringify(asks[1].op === undefined ? null : asks[1].op)}), the repair ran ${repairs}× and landed `
    + `${JSON.stringify(landedOpId)} writing a LEAF \`5\` at \`[\'window\']\`; the registration answered `
    + `${JSON.stringify(addShape.status)} with \`log\` ${JSON.stringify(logKinds(add.caught))} (the `
    + `\`repair-run\` entry\'s \`opId\` ${JSON.stringify(repairRun === null ? null : repairRun.opId)}); `
    + `\`readLiteral([\'window\'])\` → `
    + `${JSON.stringify(literalAfter.ok === true ? literalAfter.value : shapeOf(literalAfter.caught))}; `
    + `\`read([\'window\'])\` → ${JSON.stringify(standing.value)}; \`constraints()\` = `
    + `${JSON.stringify(rows.map((row) => ({ address: addressSet(row.address), id: row.id })))} — **THE TERMINAL `
    + `ARM IS \`KC-5\`: the pair was IN \`ran\` (the \`constraint-check\` entry) AND IN \`appliedRepairs\` (the `
    + `credited op the \`repair-run\` entry names), and it refused again**`);
});
