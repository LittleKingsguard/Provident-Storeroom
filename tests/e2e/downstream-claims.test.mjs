// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE DOWNSTREAM CLAIMS — six rows a consumer filed against the published package, each pinned with a cell
//
// **WHAT THIS FILE IS FOR.** An adjacent consumer's handoff (`../Provident-Electron/docs/HANDOFF.md`) catalogues
// open rows against `provident-storeroom@1.0.0`. This pass does not read that document to decide what is TRUE:
// each cell drives the BUILT ARTIFACT through its declared entry point — `storeCreate` from `bindings/js/index.mjs`
// and the product's own declared members — and compares what the artifact does against what the DECLARATION
// requires. **The expectation is a literal here and the citation is a comment (`D-17`: no `docs/**` path is
// opened at runtime).**
//
// **THE RULE THIS PASS IS RUN UNDER, AND THE REASON A RED HERE IS THE DELIVERABLE.** A cell that asserts the
// DECLARED behaviour goes RED where a downstream claim holds. **A red is the finding, not a broken cell: no cell
// below is weakened to make it green, and no byte of `src/**` or `bindings/js/**` is written by this pass.** Where
// a claim's premise is not what the declaration says, the cell says so at its own assertion message.
//
// **SIX ROWS, EACH AT ITS OWN CLAUSE HOME:**
//   M · the repair arm's outcome after a FAILING repair — `docs/specs/storeroom-constraints/parameter-semantics.md`
//       §2.8 (`PAR-C-8`, the repair's closed two-arm return) read with `composition-and-states.md` §2.6 item 2
//       (the composition's declared order: the repaired ops reversed first, the attempt's first write's op LAST)
//       and item 8 (iii) (the `checkpoint` arm); the write record's `op` member at
//       `docs/specs/storeroom-js/surface.md` §2.2.
//   S · a constraint body that THROWS — the body paths are named at
//       `docs/specs/storeroom-constraints/contract.md` §5.3 (`P-IM-3`'s `S7` scope) and §5.4 (`P-SM-4`), which
//       declare that the caller holds the BODY'S OWN THROWABLE and NOT a form of the kernel's shape; the
//       general clause a value that crosses this surface must satisfy is `docs/specs/storeroom-js/surface.md`
//       §2.5 items 1–4: ONE thrown plain object, `{status, message, log}`, never an `Error` subclass.
//   N · registration refusing a WELL-FORMED pair whose body answers non-`true` —
//       `docs/specs/storeroom-js/surface.md` §2.12 item 3 (the ADD route's three-state answer, state (ii) and
//       the `A135` (3) mark's state (β)) and item 4 (the one `TypeError`, its `status` ABSENT, at every outside
//       value); the shape code is the store's `ConstraintListInvalid`, `docs/specs/storeroom-native/contract.md`
//       §8.1–§8.2.
//   Q · a log entry's message losing a column — `docs/specs/storeroom-js/surface.md` §2.5 item 3 (`log` carries
//       the attempt's own entries VERBATIM) and `docs/specs/storeroom-constraints/kernel-surface.md` §2.5 item 1
//       (the entry's SIX members, `seq` · `kind` · `id` · `message` · `opId` · `state`, a CLOSED set).
//   R · `constraints()` ordering — `docs/specs/storeroom-js/surface.md` §2.4 item 9 (f)'s `constraints` clause,
//       item 6, whose *"the order is not declared"* is SUPERSEDED by `strata/decisions.md` § `D-39` (2026-10-26,
//       the architect, verbatim: *"add deterministic ordering"*): the declared order is REGISTRATION SEQUENCE.
//   F · the `filePath` probe at 1.0.0 — `docs/specs/storeroom-js/contract.md` §1.3's `FilePathArg` rows 4–6 (an
//       absent parent, a directory and an existing-but-not-writable path each answer `FilePathUnreachable` with
//       NO INSTANCE RETURNED) read with `docs/specs/storeroom-js/surface.md` §2.8.
//
// **D-21.** A cell that cannot run says so at its own `t.skip(...)` with the reason; no cell below prints a
// verdict it did not take. **D-35 / D-36.** No cell here is a client-scope hardening cell: receiver detection,
// `Array.prototype` vandalism and the crossing's prototype boundary are other files' subjects and are not driven.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { closeSync, existsSync, mkdtempSync, openSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
// **⟶ ADDED 2026-10-26 FOR `DEF-W (3)`, THE CELL THAT TELLS THE DISCRIMINATOR'S TWO WINDOWS APART.** The
// kernel's own entry is the declared caller-side route (`K-2`/`K-3`), and the cell reads BOTH of the
// discriminator's own sources at the instant it drives — `openCommits` (the store's in-flight verb windows,
// `state.mjs`'s exported accessor, which is the same index the symbol channel answers) and the kernel record's
// `live` map (the open attempts) — so the divergence between them is MEASURED here and not asserted from
// memory.
import { commit as kernelCommit, runAttempt as kernelRunAttempt } from '../../bindings/js/src/constraint-kernel.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';

// ---------------------------------------------------------------------------------------------
// THE DECLARED LITERALS THIS FILE ASSERTS AGAINST — and the clauses they rest on
// ---------------------------------------------------------------------------------------------

/** `surface.md §2.5` items 3–4: the ONE crossed form's member set, sorted ascending. */
const REFUSAL_MEMBERS = ['log', 'message', 'status'];

/** `kernel-surface.md §2.5` item 1 read through `strata/decisions.md` · `D-65` (2026-10-28): the log entry's
 *  FIVE members — `seq` is ABSENT, the array index is the position — and its CLOSED four-kind set. */
const LOG_MEMBERS = ['kind', 'id', 'message', 'opId', 'state'];
const LOG_KINDS = ['constraint-check', 'repair-run', 'commit', 'outcome'];

/**
 * **⟶ AND THE NO-ATTEMPT REVERSAL REFUSAL'S ENTRY CARRIES THE FIVE, `seq` ABSENT — `D-65`, 2026-10-28: THE
 * ARRAY INDEX IS THE POSITION.** `RCA-8(g)` ANNOTATE-BESIDE: **the re-derivation below stands as the reading of
 * its own date and is read THROUGH this one; what it settled (`seq` `1`) is RETIRED with the member.**
 * **THE RULING, THE ARCHITECT, ONE WORD: *"Drop it"*** (`strata/decisions.md` · `D-65`), on the question why an
 * entry carries `seq` at all — **`seq: log.length + 1` IS the index**, so the member was a second copy of a fact
 * the array encodes. The two copies this note's predecessor measured — `carryRestartRefusal` re-appending the
 * entry through `append` while the crossed list carried none — **can no longer disagree, because neither copy
 * carries a member at all**: one entry, ONE shape, and the position is `log[0]`'s own index.
 */
const NO_ATTEMPT_LOG_MEMBERS = ['kind', 'id', 'message', 'opId', 'state'];

/** The three values `DEF-M`'s drive must keep apart: the seed, the value the constraint REFUSES, and the value
 *  its repair writes. Three distinct sentinels, so the store's terminal reading names exactly one of them. */
const SEED = 5;
const REFUSED = 9;
const REPAIRED = 1;

const make = () => storeCreate({ journalLength: 8, listeners: [] });

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The shape facts a refusal is read off — never its text, except where a clause declares a subject. */
function shapeOf(value) {
  if (value === null || typeof value !== 'object') {
    return { kind: typeof value, isPlain: false, keys: null, proto: null, hasLog: false, hasStatus: false };
  }
  const proto = Object.getPrototypeOf(value);
  return {
    kind: Array.isArray(value) ? 'array' : 'object',
    isPlain: proto === Object.prototype,
    keys: Object.keys(value).sort(),
    proto: proto !== null && proto.constructor !== undefined ? proto.constructor.name : null,
    hasLog: Object.hasOwn(value, 'log'),
    hasStatus: Object.hasOwn(value, 'status'),
  };
}

/** The address a `constraints()` element spells, folded to one string so a comparison names the element. */
function pairKey(pair) {
  const address = Array.isArray(pair.address)
    ? pair.address.map((each) => (Array.isArray(each) ? each.join('/') : String(each))).join('&')
    : String(pair.address);
  return `${address}#${String(pair.id)}`;
}

/** The entry's own address rendering — `['a']` prints as `a`, the kernel's own `pairSpelling` join. */
function addressSpelling(address) {
  return Array.isArray(address) ? address.map((segment) => String(segment)).join('/') : String(address);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DEF-M — the repair arm's outcome after a FAILING repair
//
// **THE CLAIM, IN THREE PARTS, EACH DRIVEN BELOW:** (1) a write whose constraint refuses one value and supplies
// a repair ends, when the write FAILS, with the store holding the value the constraint REFUSED — the repair
// discarded; (2) a SUCCESSFUL repaired write returns an `op` whose `after` reads the REFUSING value while the
// store holds the repaired one; (3) the comparison arm: a repair that DECLINES (no edit lands) is the arm on
// which the store returns to its pre-write state.
//
// **THE DECLARED READING, AND WHERE IT RUNS OUT — SAID PLAINLY BECAUSE IT IS THE FINDING.** The composition's
// call order IS declared (`composition-and-states.md` §2.6 item 2: *"the repaired ops first, in REVERSE of the
// order they were created, and the attempt's first write's op LAST"*, read with item 8 (iii): where no landing
// left a valid state the `checkpoint` is `null` and the call list is the WHOLE list). **So the declared TARGET
// of a failed attempt is the state that stood before the attempt's first write — the last state every
// registered constraint approved.** **NO CLAUSE OF EITHER UNIT NAMES THE FAILING-REPAIR ARM'S TERMINAL STORE
// STATE AS AN OUTCOME**: `parameter-semantics.md` §2.8 declares the repair's closed two-arm RETURN and says
// nothing of the store, and `composition-and-states.md` §2.6 declares the ORDER and the floor, not the value
// left standing. **THE CELL ASSERTS THE DECLARED TARGET AND RECORDS THE OTHER TWO READINGS BESIDE IT** — which
// is why a red here names an undeclared arm and not only a wrong value.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

// ── **⟶ RE-DERIVED 2026-10-26 TO THE RULING AND NOT TO THE BYTES — `strata/decisions.md` · `D-40`
// (2026-10-26), the architect, VERBATIM: *"A failing repair triggers a rollback like a constraint
// rejection."* THE TITLE MOVED WITH THE ARM, AND THE DIRECTION IS THE POINT: it used to name the DEFECT this
// cell confirmed — *"leaves the store holding the REFUSED value"* and *"reports an `op.after` the store does
// not hold"* — and it now names the DECLARED behaviour the ruling requires: a failed attempt leaves the
// store exactly as it found it, and the record a passing repaired write returns describes the store the
// caller then reads. **THE CELL IS THE SAME DRIVE and it still fails on either arm**; what changed is the
// direction its expectation was derived in.
test('DEF-M · under `D-40` (2026-10-26) a repaired write that FAILS leaves the store exactly as it found it, and a repaired write that PASSES reports the `op.after` that `read` then hands back', (t) => {
  // ── THE THREE ARMS ARE ALL DRIVEN BEFORE ANY ASSERTION, so the cell reports every reading it took and a red
  // cannot hide the arm behind it. Each arm gets its own store, seeded at `SEED`, with pair `c1` refusing
  // `REFUSED` and supplying the arm's repair. The repair writes `REPAIRED` AT THE SAME ADDRESS through the
  // context the kernel hands it (`rc`, the repair's one argument — `kernel-surface.md §2.3` item 2: the repair is
  // passed the commit it is part of, and `write`'s fourth position takes it).
  const repairedWrite = (store) => (rc) => {
    const landed = store.write(rc.address, rc.tier, REPAIRED, rc);
    return { ok: true, op: landed.op };
  };

  // (1) THE FAILING ARM. Pair `c2` refuses `REPAIRED` and registers NO repair, which is what makes the write
  // fail AFTER the repair's edit has landed: arm (c) of `attempt-lifecycle.md §2.4` item 4 at the re-run.
  const failing = make();
  failing.write(['a'], 'mem', SEED);
  failing.addConstraint({ address: ['a'], id: 'c1' }, (context) => (context.value === REFUSED
    ? { message: 'the value must not be the refused one', repair: repairedWrite(failing) }
    : true));
  failing.addConstraint({ address: ['a'], id: 'c2' }, (context) => (context.value === REPAIRED
    ? { message: 'the repaired value is refused by the second pair' }
    : true));
  const failed = attempt(() => failing.write(['a'], 'mem', REFUSED));
  const afterFailure = failing.read(['a']);
  const failureLog = failed.caught !== null && typeof failed.caught === 'object' && Array.isArray(failed.caught.log)
    ? failed.caught.log
    : [];
  const outcomeEntry = failureLog.find((entry) => entry.kind === 'outcome');
  const repairEntry = failureLog.find((entry) => entry.kind === 'repair-run');

  // (2) THE DECLINING-REPAIR COMPARISON. The same shape with a repair that returns `{ok: false, message}`
  // (`§2.8`'s second arm): NO edit lands, so the composition has the write's op alone to reverse. This arm is
  // driven so the red on (1) is attributed to the LANDED-THEN-REVERSED repair op and not to "repairs and
  // failures in general".
  const declining = make();
  declining.write(['a'], 'mem', SEED);
  declining.addConstraint({ address: ['a'], id: 'c1' }, (context) => (context.value === REFUSED
    ? { message: 'the value must not be the refused one', repair: () => ({ ok: false, message: 'declined' }) }
    : true));
  const declined = attempt(() => declining.write(['a'], 'mem', REFUSED));
  const afterDecline = declining.read(['a']);

  // (3) THE PASSING ARM. The repair lands and RESOLVES the violation (arm (g)), so the write succeeds. The
  // returned record's `op` is the op the write landed (`§2.2`'s three-member write record); the store's state
  // after the repair is the repair's own edit.
  const passing = make();
  passing.write(['a'], 'mem', SEED);
  passing.addConstraint({ address: ['a'], id: 'c1' }, (context) => (context.value === REFUSED
    ? { message: 'the value must not be the refused one', repair: repairedWrite(passing) }
    : true));
  const passed = attempt(() => passing.write(['a'], 'mem', REFUSED));
  const handedBack = passing.read(['a']);
  const reportedAfter = passed.ok
    && passed.value.op !== null && typeof passed.value.op === 'object'
    && passed.value.op.after !== null && typeof passed.value.op.after === 'object'
    ? passed.value.op.after.value
    : undefined;

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual(
    [failed.ok, declined.ok, passed.ok],
    [false, false, true],
    `the drive's own three arms must answer FAIL, FAIL, PASS (arm (c) at the re-run; arm (d); arm (g)). THE `
      + `DRIVE OBSERVED failed.ok=${failed.ok}, declined.ok=${declined.ok}, passed.ok=${passed.ok}; the values `
      + `caught were ${JSON.stringify([failed.caught, declined.caught, passed.caught].map(shapeOf))}`);
  // And every refusal that crossed is the DECLARED form — `§2.5`'s one thrown plain object, three members.
  for (const [label, refused] of [['the failing arm', failed], ['the declining arm', declined]]) {
    assert.deepEqual(shapeOf(refused.caught).keys, REFUSAL_MEMBERS,
      `a failure crosses this surface as exactly ${JSON.stringify(REFUSAL_MEMBERS)}; ${label} caught `
        + `${JSON.stringify(shapeOf(refused.caught))}`);
  }

  // ── THE FINDINGS, EACH REPORTED WITH BOTH READINGS, SO NO RED HIDES THE ARM BESIDE IT. ──────
  const findings = [];
  // **THE COMPOSITION'S DECLARED TARGET** (`composition-and-states.md` §2.6 item 2 with item 8 (iii)): the seed
  // was a state every registered constraint approved and no landing of this attempt left one, so the call list
  // is the WHOLE list in item 2's order and the store must be back at the seed once the calls have run.
  if (afterFailure !== SEED) {
    findings.push({
      claim: 'DEF-M (1) — a FAILING repaired write leaves the store at the state that stood before it',
      declaredBy: 'strata/decisions.md · D-40 (2026-10-26): "A failing repair triggers a rollback like a '
        + 'constraint rejection" — a failed attempt leaves the store exactly as it found it, whether the '
        + 'constraint refused outright or its repair failed on the re-run',
      seed: SEED,
      refused: REFUSED,
      repaired: REPAIRED,
      observed: afterFailure,
      repairEntry: repairEntry === undefined ? null : repairEntry.message,
      outcomeState: outcomeEntry === undefined ? null : outcomeEntry.state,
    });
  }
  // **THE WRITE RECORD'S OWN `after`** — the handoff's `(g)` reading: the record the caller receives must
  // describe the store the caller then reads. `§2.2` declares the record's `op` as the op the write landed and
  // says NOTHING of a repair that lands after it.
  if (reportedAfter !== handedBack) {
    findings.push({
      claim: 'DEF-M (2) — a PASSING repaired write\'s returned `op.after` equals what `read` hands back',
      declaredBy: 'strata/decisions.md · D-40 (2026-10-26) with docs/specs/storeroom-js/surface.md §2.2 (the '
        + 'write record\'s `op`): the record must DESCRIBE THE STORE the caller then reads',
      reportedAfter,
      storeHolds: handedBack,
    });
  }
  // ── **THE FOUR READINGS THIS CELL PINS, PRINTED ON THE PASSING ARM AS WELL AS THE FAILING ONE** (`D-21`:
  // a cell owes what it read, and this pass must be able to show the values it re-derived against).
  t.diagnostic(`DEF-M · D-40 (2026-10-26) · failing arm read(['a']) = ${JSON.stringify(afterFailure)} `
    + `(the seed was ${JSON.stringify(SEED)}; the refused value was ${JSON.stringify(REFUSED)}; the repair `
    + `wrote ${JSON.stringify(REPAIRED)}; outcome.state = ${JSON.stringify(outcomeEntry === undefined ? null : outcomeEntry.state)})`);
  t.diagnostic(`DEF-M · D-40 (2026-10-26) · comparison arm (repair returning {ok: false}) read(['a']) = `
    + `${JSON.stringify(afterDecline)} (the seed was ${JSON.stringify(SEED)})`);
  t.diagnostic(`DEF-M · D-40 (2026-10-26) · passing arm reportedAfter = ${JSON.stringify(reportedAfter)}, `
    + `storeHolds = ${JSON.stringify(handedBack)}, equal = ${JSON.stringify(reportedAfter === handedBack)}`);
  assert.deepEqual(findings, [],
    `DEF-M's claim is CONFIRMED at ${findings.length} of its arms — every reading the drive took is printed `
      + `here, and the comparison arm (a repair that never lands) is reported beside them: `
      + `${JSON.stringify({
        findings,
        comparison: { arm: 'a repair that returns {ok: false}', seed: SEED, observed: afterDecline },
        passingArm: { reportedAfter, storeHolds: handedBack },
      })}`);
  // And the store really does hold the repaired value on the passing arm, so the red above cannot be read as a
  // store that failed to apply the repair.
  assert.equal(handedBack, REPAIRED,
    `the passing repair's own edit must stand; the store reads ${JSON.stringify(handedBack)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DEF-S — a constraint body that THROWS
//
// **THE CLAIM.** A body's throw crosses as the caller's own raw value — a raw `Error` with NO `log`, and a
// thrown STRING escaping as a string — so the one form a consumer switches on is absent exactly where the
// caller's own code failed.
//
// **IS THE ARM SILENT, OR DECLARED?** It is NAMED, and the naming is what makes the claim a finding rather than
// a gap: `docs/specs/storeroom-constraints/contract.md` §5.3's `S7` scope and §5.4's `S7` read the two body paths
// as reaching the caller as *"the BODY'S OWN THROWABLE"* and explicitly NOT as a form of the kernel's shape.
// **WHAT THAT LEAVES OPPOSED IS THE GENERAL CLAUSE THIS CELL ASSERTS:** `docs/specs/storeroom-js/surface.md`
// §2.5 items 1–4 declare ONE form for a failure that crosses THIS surface — a THROWN plain object of exactly
// `{status, message, log}`, never an `Error` subclass, never a `Promise` rejection — and §2.12 item 1's fail arm
// *"the caller receives the refusal"* is read through it. **A value that crosses to a caller is therefore owed
// that form, whatever layer named the path**, and the cell asserts the general clause.
//
// **THE DRIVE'S TWO SHAPES PER THROWABLE.** A body that throws UNCONDITIONALLY throws at REGISTRATION (the ADD
// route evaluates the body once — `§2.12` item 3's states (i)–(β)), so the raw value crosses from
// `addConstraint` and no write is reachable. A body that PASSES at registration and throws when the written
// value arrives lets the WRITE be driven. Both instants are driven and both are asserted against the one form.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DEF-S · a constraint body\'s throw crosses raw — an `Error` with no `log`, and a thrown string as a string — at the write AND at registration', () => {
  const cases = [
    { label: 'an `Error`', throwable: () => { throw new Error('boom'); } },
    { label: 'the string \'boom\'', throwable: () => { throw 'boom'; } },
  ];
  const observed = [];

  for (const one of cases) {
    // ── THE WRITE. The body passes at the registration instant and throws when it is handed `REFUSED`.
    const store = make();
    store.write(['a'], 'mem', SEED);
    const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'c1' }, (context) => {
      if (context.value === REFUSED) one.throwable();
      return true;
    }));

    const driven = attempt(() => store.write(['a'], 'mem', REFUSED));
    const shape = shapeOf(driven.caught);
    observed.push({
      instant: 'write',
      label: one.label,
      registrationPassed: registered.ok,
      writeFailed: driven.ok === false,
      kind: shape.kind,
      proto: shape.proto,
      keys: shape.keys,
      log: shape.hasLog,
      status: shape.hasStatus,
      value: typeof driven.caught === 'string' ? driven.caught : String(driven.caught),
    });
  }

  // ── THE REGISTRATION INSTANT. The same throwable from an unconditionally-throwing body.
  for (const one of cases) {
    const store = make();
    store.write(['a'], 'mem', SEED);
    const registered = attempt(() => store.addConstraint({ address: ['a'], id: 'c1' }, one.throwable));
    const shape = shapeOf(registered.caught);
    observed.push({
      instant: 'registration',
      label: one.label,
      refused: registered.ok === false,
      entryAfter: store.constraints().map(pairKey),
      kind: shape.kind,
      proto: shape.proto,
      keys: shape.keys,
      log: shape.hasLog,
      status: shape.hasStatus,
    });
  }

  // **THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT.**
  assert.equal(observed.length, 4,
    `the drive must reach four instants (two throwables × the write and the registration); it reached `
      + `${observed.length}: ${JSON.stringify(observed)}`);
  for (const one of observed.filter((each) => each.instant === 'write')) {
    assert.deepEqual([one.registrationPassed, one.writeFailed], [true, true],
      `the body must PASS at registration and the WRITE must then fail (${one.label}); the drive observed `
        + `${JSON.stringify(one)}`);
  }
  for (const one of observed.filter((each) => each.instant === 'registration')) {
    assert.equal(one.refused, true,
      `an unconditionally throwing body must be refused at registration (${one.label}): ${JSON.stringify(one)}`);
  }

  // **THE FINDING, AT BOTH INSTANTS — the general clause, at both halves of it.** `§2.5` item 3: THROWN, never
  // returned; item 4: a plain object whose prototype is the caller realm's `Object.prototype`, whose members are
  // exactly the three, with `log` PRESENT on EVERY arm.
  const offenders = observed.filter((one) => !(
    one.keys !== null
    && one.keys.length === REFUSAL_MEMBERS.length
    && one.keys.every((key, index) => key === REFUSAL_MEMBERS[index])
    && one.proto === 'Object'
    && one.log === true
  ));
  assert.deepEqual(offenders, [],
    `a value thrown by a caller's own constraint body must cross as exactly `
      + `${JSON.stringify(REFUSAL_MEMBERS)}, a plain object of the caller realm, with \`log\` present `
      + `(\`surface.md §2.5\` items 1–4 — the ONE form a value that crosses this surface is owed, and the `
      + `general clause the kernel unit's \`S7\` body-path scope leaves standing). THE DRIVE OBSERVED `
      + `${offenders.length} of 4 crossing values outside that form: ${JSON.stringify(offenders)}. THE WHOLE `
      + `SWEEP: ${JSON.stringify(observed)}.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DEF-N — registration refusing a WELL-FORMED pair whose body answers non-`true`, with a SHAPE code
//
// **THE CLAIM.** `addConstraint(pair, fn)` evaluates the body once at registration and, on a non-`true` answer,
// refuses a pair whose SHAPE is valid with the code that means the SHAPE is invalid (`ConstraintListInvalid`);
// and a re-enable at `constraintOn` can be refused the same way.
//
// **THE DECLARATION, READ ONE ARM AT A TIME — BECAUSE THE CLAIM IS ABOUT WHICH ARM ANSWERS, NOT WHETHER ONE DOES.**
// `docs/specs/storeroom-js/surface.md` §2.12 item 3's re-derived list declares the ADD route's answer in three
// states: **(i)** the state PASSES the body → the pair's opaque identity; **(ii)** the state VIOLATES it and no
// repair stands → *"the call THROWS the store's own `{status, message}`, `status` being
// `ConstraintListInvalid`"*; **(β)** a repair stands and fails → the same throw. **Item 4 declares the OTHER
// refusal: the JS `TypeError` with its `status` member ABSENT, at every outside value of `pair` or `constraint`.**
// **THE CONFLICT THE CELL PUTS ON THE RECORD IS THEREFORE DECLARED ON BOTH SIDES: the code `ConstraintListInvalid`
// is the STORE's malformed-ENTRY code (`docs/specs/storeroom-native/contract.md` §8.1–§8.2, whose generated sentence
// is *"… is not a valid constraint entry in 'constraints', a constraint entry is an address and an id, and the
// address is a segment array"*), and a pair that is `{address: ['a'], id: 'c1'}` IS all three of those.**
//
// **EVERY REFUSAL ARM THE CODE CAN REACH, ENUMERATED FROM THE CODE AND NOT FROM A DOCUMENT** (this list is a
// comment, `D-17`; it is the list the declaration's own arm count is checked against):
//   `a.addConstraint(pair, constraint)` — FIVE arms:
//     (1) `src/entry/constraints.mjs`'s `constraintDetached` — a detached call: `{status: 'AddressMalformed',
//         message, log: []}`, a plain object. **NO CLAUSE OF `§2.12` DECLARES THIS ARM**; it landed 2026-10-26 on
//         the architect's *"Run the fix by rejecting the detached functions."*
//     (2) `constraintArity` — fewer than two positions: `TypeError`, `status` ABSENT, `log: []`.
//     (3) `constraintRefuse` — `pair` not a plain object / no own `address` / `address` outside the segment-array
//         domain / `id` absent, not a string or empty / `constraint` not a function: `TypeError`, `status` ABSENT.
//     (4) `boundaryReject('AddressMalformed', …)` — the `id` equals a live LISTENER's handle (the `D-25` "vice
//         versa" arm): `{status: 'AddressMalformed', message, log}`.
//     (5) `registrationCrossing` — the registration evaluation refused (states (ii)/(β)): `{status:
//         'ConstraintListInvalid', message, log}`. **This is the arm the claim names.**
//   `a.constraintOn(pair, constraint)` — FIVE arms: (1), (2), (3) above; (4) `constraintUncarried` — a well-formed
//     pair the entry does not carry: `TypeError`, `status` ABSENT (`§2.12` item 3's second answer); and (5)
//     `registrationCrossing` in the enable arm's re-register loop — `{status: 'ConstraintListInvalid', …}`.
//   **SO THE DECLARATION'S CLAIMED SET (`§2.12` items 3 and 4: ONE `TypeError` with no `status`, plus the
//   `ConstraintListInvalid` throw at states (ii)/(β)) is TWO FORMS AND THE CODE REACHES THREE, the detached
//   `AddressMalformed` arm being undeclared at `§2.12`.** The arm the claim is about is declared at `§2.12`
//   item 3 — **and what is undeclared is WHY a well-formed pair answers a SHAPE code, which the code's own
//   registration refusal admits in its doc block.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DEF-N · a WELL-FORMED pair whose body answers non-`true` is refused with the SHAPE code `ConstraintListInvalid`, at `addConstraint` AND at a re-enable', () => {
  // ── EVERY ARM IS DRIVEN BEFORE ANY ASSERTION, so the cell reports all of them and a red cannot hide the arm
  // beside it. The four arms a drive can reach without touching the receiver question are: the ADD route at a
  // FRESH pair, the two toggles at a pair the entry does not carry, and the ENABLE route at a CARRIED pair.
  const added = make();
  added.write(['a'], 'mem', SEED);
  const refusedAdd = attempt(() => added.addConstraint({ address: ['a'], id: 'c1' }, () => false));
  const entryAfterRefusedAdd = added.constraints().map(pairKey);
  const offAtUncarried = attempt(() => added.constraintOff({ address: ['a'], id: 'c1' }, () => false));
  const onAtUncarried = attempt(() => added.constraintOn({ address: ['a'], id: 'c1' }, () => false));

  // The enable route at a pair that REGISTERED while the store passed it, was disabled, and is re-enabled with
  // the store's state moved to a value its own body refuses: the enable arm re-registers the entry's own function
  // through `K-1`, and `K-1` evaluates it at registration.
  const toggled = make();
  toggled.write(['a'], 'mem', SEED);
  const add = attempt(() => toggled.addConstraint({ address: ['a'], id: 'c1' },
    (context) => (context.value === REFUSED ? { message: 'the value must not be the refused one' } : true)));
  toggled.constraintOff({ address: ['a'], id: 'c1' }, () => true);
  toggled.write(['a'], 'mem', REFUSED); // the disabled pair is not evaluated
  const reEnabled = attempt(() => toggled.constraintOn({ address: ['a'], id: 'c1' }, () => true));
  const entryAfterRefusedEnable = toggled.constraints().map(pairKey);

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual([refusedAdd.ok, offAtUncarried.ok, onAtUncarried.ok, add.ok, reEnabled.ok],
    [false, false, false, true, false],
    `the drive's own arms must answer REFUSED, REFUSED, REFUSED, ACCEPTED, REFUSED. THE DRIVE OBSERVED `
      + `${JSON.stringify({
        addAtFreshPair: refusedAdd.ok,
        constraintOffAtUncarried: offAtUncarried.ok,
        constraintOnAtUncarried: onAtUncarried.ok,
        registrationBeforeTheToggle: add.ok,
        reEnable: reEnabled.ok,
      })}`);
  // Neither refused registration wrote a record (`§2.12` item 7 (ii), the enumeration's two exclusions), and the
  // refused re-enable left the pair's carriage as it stood (the enable arm's `restoreHeldPair` wake).
  assert.deepEqual(entryAfterRefusedAdd, [],
    `a refused registration must not appear in the enumeration; the entry carries `
      + `${JSON.stringify(entryAfterRefusedAdd)}`);
  assert.deepEqual(entryAfterRefusedEnable, ['a#c1'],
    `a refused re-enable must not change the entry's carriage; the enumeration reads `
      + `${JSON.stringify(entryAfterRefusedEnable)}`);

  // ── THE FINDING: A SHAPE CODE ON A WELL-FORMED PAIR. ────────────────────────────────────────
  // **A pair whose SHAPE is valid must never be refused with the code that names the SHAPE.** `ConstrainListInvalid`
  // is the STORE's malformed-ENTRY code (`docs/specs/storeroom-native/contract.md` §8.1–§8.2: *"… is not a valid
  // constraint entry in 'constraints', a constraint entry is an address and an id, and the address is a segment
  // array"*), and `{address: ['a'], id: 'c1'}` IS an address that is a segment array and an id that is a string.
  const shapeCoded = [
    { arm: 'addConstraint at a fresh well-formed pair', refused: refusedAdd },
    { arm: 'constraintOn at a re-enabled, well-formed, CARRIED pair', refused: reEnabled },
  ].filter(({ refused }) => refused.caught !== null && typeof refused.caught === 'object'
    && refused.caught.status === 'ConstraintListInvalid')
    .map(({ arm, refused }) => ({ arm, status: refused.caught.status, message: refused.caught.message,
      keys: shapeOf(refused.caught).keys }));
  assert.deepEqual(shapeCoded, [],
    `no pair whose SHAPE is valid may be refused with the MALFORMED-ENTRY code \`ConstraintListInvalid\` `
      + `(\`docs/specs/storeroom-js/surface.md\` §2.12 item 3 declares the ADD route's states (ii)/(β) as that `
      + `throw, and item 4 declares the ONE \`TypeError\` as the refusal of an outside value — so the arm is `
      + `declared and the CONFLICT it creates with the store's own §8.2 row is the finding). THE DRIVE OBSERVED `
      + `${shapeCoded.length} well-formed pair(s) refused with the shape code: ${JSON.stringify(shapeCoded)}.`);
  // ── AND THE TOGGLES' DECLARED REFUSAL IS THE ONE `TypeError`, ITS `status` ABSENT. ───────────
  for (const [label, refused] of [
    ['constraintOff at a pair the entry does not carry', offAtUncarried],
    ['constraintOn at a pair the entry does not carry', onAtUncarried],
  ]) {
    const shape = shapeOf(refused.caught);
    assert.deepEqual([shape.hasStatus, shape.proto], [false, 'TypeError'],
      `\`${label}\` throws the ONE \`TypeError\` with its \`status\` member ABSENT (\`§2.12\` item 3's second `
        + `answer, item 4). THE DRIVE OBSERVED ${JSON.stringify(shape)}.`);
  }
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DEF-Q — a log entry's message losing a column it still carries
//
// **THE CLAIM.** The `KC-3` log entry's message ends `... at undefined` while its `address` column is populated.
//
// **THE GENERAL RULE THIS CELL ASSERTS, AND WHY IT IS NOT A `KC-3` CELL.** `docs/specs/storeroom-js/surface.md`
// §2.5 item 3 carries the attempt's own `log` VERBATIM, and `docs/specs/storeroom-constraints/kernel-surface.md`
// §2.5 item 1 closes the entry's SIX members (`seq` · `kind` · `id` · `message` · `opId` · `state`). **So, for
// EVERY entry the attempt can produce: a message may not print `undefined` for a column the entry itself
// carries, and where the entry carries an `address` member that is SET, the message must render it.** The sweep
// runs over every kind the drive reaches — `constraint-check`, `repair-run`, `outcome`. (`commit` is not
// reachable: a SUCCESSFUL write's returned record carries `op`, `watched` and `triggered` and NO `log` member,
// so the success arm's `commit` entry is reached by no client call — recorded here so the omission is a finding
// and not a gap.)
//
// **AND THE CLAIM'S OWN PREMISE IS CORRECTED AT THE OBSERVATION, NOT ADOPTED:** the declared entry carries NO
// `address` member at all. The column the message loses is the ADDRESS SLOT of the sentence the kernel composes
// for the entry, and the drive records which member made it `undefined`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DEF-Q · no log entry\'s message prints `undefined` for a column the entry carries — swept over every kind the drive reaches', () => {
  const entries = [];
  const sweep = (label, log) => {
    assert.ok(Array.isArray(log), `the refusal's \`log\` must be an array on every arm (\`§2.5\` item 4); ${label} `
      + `carried ${JSON.stringify(log)}`);
    for (const entry of log) entries.push({ refusal: label, entry });
  };

  // (1) THE `KC-3` REFUSAL. A body that answers a value OUTSIDE the three declared outcome arms
  // (`PAR-C-5`) — the arm whose own sentence the kernel composes, and the one the claim names.
  const unrecognized = make();
  unrecognized.write(['a'], 'mem', SEED);
  unrecognized.addConstraint({ address: ['a'], id: 'c1' },
    (context) => (context.value === REFUSED ? false : true));
  const unrecognizedFailure = attempt(() => unrecognized.write(['a'], 'mem', REFUSED));
  assert.equal(unrecognizedFailure.ok, false,
    'a body answering a value outside the three arms must fail the write');
  sweep('an unrecognized answer (KC-3)', unrecognizedFailure.caught.log);

  // (2) A `constraint-check` PASSING entry and a `repair-run` entry, plus a second `outcome`: the repair lands
  // and resolves, so the write passes and NO log crosses (the success record carries none) — then the same
  // attempt's entries are read off a refusal that DOES cross, by making the repaired value violate a second
  // pair. This reaches the three kinds in one refusal.
  const repaired = make();
  repaired.write(['a'], 'mem', SEED);
  repaired.addConstraint({ address: ['a'], id: 'c1' }, (context) => (context.value === REFUSED
    ? {
        message: 'the value must not be the refused one',
        repair: (rc) => {
          const landed = repaired.write(rc.address, rc.tier, REPAIRED, rc);
          return { ok: true, op: landed.op };
        },
      }
    : true));
  repaired.addConstraint({ address: ['a'], id: 'c2' },
    (context) => (context.value === REPAIRED ? { message: 'the repaired value is refused' } : true));
  const repairedFailure = attempt(() => repaired.write(['a'], 'mem', REFUSED));
  assert.equal(repairedFailure.ok, false, 'the second pair must fail the repaired write');
  sweep('a landed repair whose re-run fails', repairedFailure.caught.log);

  // The sweep must have reached all three kinds, or it is not the sweep this cell claims.
  const kinds = [...new Set(entries.map(({ entry }) => entry.kind))].sort();
  assert.deepEqual(kinds, ['constraint-check', 'outcome', 'repair-run'],
    `the sweep must reach every kind a client call can produce — \`constraint-check\`, \`repair-run\`, `
      + `\`outcome\`, the three of \`kernel-surface.md §2.5\` item 1's CLOSED four minus the unreachable `
      + `\`commit\`. THE DRIVE REACHED ${JSON.stringify(kinds)}.`);

  const offenders = [];
  for (const { refusal, entry } of entries) {
    // Every entry carries the SIX declared members and no seventh (`kernel-surface.md §2.5` item 1, CLOSED).
    assert.deepEqual(Object.keys(entry).sort(), [...LOG_MEMBERS].sort(),
      `a log entry carries exactly ${JSON.stringify(LOG_MEMBERS)}; the drive read `
        + `${JSON.stringify(Object.keys(entry))} from ${refusal}`);
    assert.equal(LOG_KINDS.includes(entry.kind), true,
      `\`kind\` is one of ${JSON.stringify(LOG_KINDS)}; the drive read ${JSON.stringify(entry.kind)}`);
    // **THE GENERAL RULE, FIRST HALF: no `undefined` in a message.** A column the entry carries may not be
    // rendered as an absent value.
    if (entry.message.includes('undefined')) offenders.push({ refusal, entry });
    // **THE GENERAL RULE, SECOND HALF: an `address` member that is SET is rendered.** The declared entry has no
    // such member; the branch is kept so the rule is the one asserted and not the shape one build happens to
    // have.
    if (Object.hasOwn(entry, 'address') && entry.address !== undefined && entry.address !== null) {
      assert.equal(entry.message.includes(addressSpelling(entry.address)), true,
        `an entry whose \`address\` column is set must render it in its message: the entry reads `
          + `${JSON.stringify(entry)}, whose message is ${JSON.stringify(entry.message)}`);
    }
  }
  assert.deepEqual(offenders, [],
    `no log entry's message may print \`undefined\` for a column the entry itself carries. THE DRIVE FOUND `
      + `${offenders.length} offender(s): ${JSON.stringify(offenders.map(({ refusal, entry }) => ({
        refusal,
        kind: entry.kind,
        id: entry.id,
        opId: entry.opId,
        message: entry.message,
      })))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DEF-R — `constraints()` ordering — the architect has ORDERED the change
//
// **THE RULING.** `strata/decisions.md` § `D-39` (2026-10-26), verbatim: *"add deterministic ordering"*; and the
// same row's operative sentence: *"`constraints()` must emit in a DECLARED, deterministic order — registration
// sequence, which is the order the pairs were registered and the one a consumer can reason about … the order
// becomes part of what the method promises."* **THE DECLARED ORDER IS THEREFORE REGISTRATION SEQUENCE.**
// **THE DECLARATION THE RULING SUPERSEDES IS NAMED SO THE RED IS NOT MISTAKEN FOR A MISSING CLAUSE:**
// `docs/specs/storeroom-js/surface.md` §2.4 item 9 (f)'s `constraints` clause, item 6, currently reads *"THE ORDER
// OF THE RETURNED ARRAY IS NOT DECLARED, and this clause mints no order"* — **that exclusion is superseded by
// `D-39`, and this cell asserts the ruling. THE CELL IS RED UNTIL THE IMPLEMENTATION LANDS; it is not weakened,
// and no ordering is asserted anywhere else in this file.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DEF-R · five `constraints()` snapshots across a pass, a refusal, a toggle and a `rollback` are element-wise equal and in registration sequence', () => {
  const store = make();
  store.write(['a'], 'mem', SEED);
  const registered = [];
  const register = (address, id, body) => {
    store.addConstraint({ address, id }, body);
    registered.push(`${address.join('/')}#${id}`);
  };

  // Four registrations, deliberately NOT in address order, so an address sort cannot pass for the declared order.
  // **THE FOURTH PAIR IS THE REFUSING ONE, SO THE REFUSAL ACT ADDS NO MEMBER**: the claim's own observation is
  // that *"membership is identical and the ORDER moves"*, so membership is held constant across the five acts
  // and the only thing that can move is the sequence.
  register(['b'], 'c-b', () => true);
  register(['a'], 'c-a', () => true);
  register(['c'], 'c-c', () => true);
  register(['a'], 'c-r', (context) => (context.value === SEED + 2 ? { message: 'refused' } : true));
  const snapshots = [];
  snapshots.push({ act: 'after the registrations', list: store.constraints() });

  // a PASS
  store.write(['a'], 'mem', SEED + 1);
  snapshots.push({ act: 'after a passing write', list: store.constraints() });

  // a REFUSAL — by the fourth pair, so the entry's membership is unmoved by this act
  const refused = attempt(() => store.write(['a'], 'mem', SEED + 2));
  assert.equal(refused.ok, false, 'the fourth pair must refuse the write, or there is no refusal in the sweep');
  snapshots.push({ act: 'after a refusal', list: store.constraints() });

  // a TOGGLE
  store.constraintOff({ address: ['b'], id: 'c-b' }, () => true);
  store.constraintOn({ address: ['b'], id: 'c-b' }, () => true);
  snapshots.push({ act: 'after a constraintOff/constraintOn toggle', list: store.constraints() });

  // a ROLLBACK
  const written = store.write(['a'], 'mem', SEED + 3);
  store.rollback(written.op.opId);
  snapshots.push({ act: 'after a rollback', list: store.constraints() });

  const observed = snapshots.map(({ act, list }) => ({ act, elements: list.map(pairKey) }));
  const first = observed[0].elements;
  // **THE ASSERTION.** Element-wise equality across the five snapshots, in registration sequence.
  for (let index = 1; index < observed.length; index += 1) {
    assert.deepEqual(observed[index].elements, first,
      `\`constraints()\` must answer the SAME elements in the SAME order on every call across a pass, a `
        + `refusal, a toggle and a rollback (\`strata/decisions.md\` § \`D-39\`: *"add deterministic ordering"*). `
        + `THE FIVE SNAPSHOTS OBSERVED: ${JSON.stringify(observed)}; snapshot ${index} (`
        + `${JSON.stringify(observed[index].act)}) reads ${JSON.stringify(observed[index].elements)} where `
        + `snapshot 0 reads ${JSON.stringify(first)}.`);
  }
  // **AND THE ORDER IS THE REGISTRATION SEQUENCE** — the pairs' own order of registration, not an address sort.
  assert.deepEqual(first, registered,
    `the emitted order must equal the pairs' REGISTRATION SEQUENCE (\`D-39\`). THE DRIVE REGISTERED `
      + `${JSON.stringify(registered)} and the first snapshot reads ${JSON.stringify(first)}.`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DEF-W — THE REVERSAL IS JUDGED, at the state it leaves and never per unwinding step
//
// **THE RULING.** `strata/decisions.md` · `D-38` (2026-10-26), the architect, VERBATIM: *"Assert the
// constraints on rollback"*. **THE DECLARATION IS `docs/specs/storeroom-js/contract.md §2.6`'s clause of the
// same date** (`surface.md §2.12`'s clause (D) and `docs/guides/package-use.md §5.4` name the same member and
// the same rank): a reversal is judged AT THE TERMINAL STATE IT LEAVES — *"a per-step check is unsound: an
// unwinding composition passes through intermediate states no constraint would approve"*; a `rollback` whose
// terminal state violates a registered constraint FAILS, carrying the set's rank-`20` member
// `ConstraintPassRefused` in this surface's ONE plain form `{status, message, log}`; **and a LAWFUL reversal
// is unchanged — same record, same `undoneOps`, same `restoredTo`, no status and no throw.**
//
// **THE SEAM THIS CELL IS THE FIRST TO DRIVE, AND THE CELL THAT WOULD CATCH ITS ABSENCE.**
// `bindings/js/index.mjs`'s `rollback` member passed the reversal straight to the addon's entry
// (`Reflect.apply(entryOf().rollback, this, args)`) and consulted no constraint at all: **the declaration is
// `D-38`'s second owed cell — the refused-reversal arm — and this row is that cell.**
//
// **THE TWO ARMS, BOTH DRIVEN BEFORE ANY ASSERTION, SO A RED CANNOT HIDE THE ARM BESIDE IT:**
//   (1) REFUSED — the seed `SEED` is written, a second value `SECOND` is written and its `opId` KEPT, a pair is
//       registered over `['a']` that the FIRST value violates (it passes at registration, which evaluates
//       against the state then standing, `SECOND`), and the reversal of the second write is asked for. **The
//       terminal state is `SEED`, so the call must NOT answer a bare success object;**
//   (2) LAWFUL — the same shape with a pair that admits every value this reversal can leave: **the call answers
//       its success record and no `log`, byte for byte what it answered before `DEF-W` landed.**
//
// **AND THE ARM THIS ROW PINS FOR THE RECORD — THE SHAPE `(a)` THAT PASS MEASURED IS SUPERSEDED BY `DEF-W`'s
// OWN DISCHARGE, 2026-10-26.** The refusal is still answered AFTER the reversal has run — `(b)`, computing the
// terminal state WITHOUT applying it, is not computable from what the artefact publishes: its thirteen names
// carry no journal read and no candidate-set query, and the store's rollback scope is temporally floored at the
// named op's own `seq` and all-or-nothing at the compacted mark (`src/store.rs:2374–2430`), so a JS guess at it
// would be a second implementation of the store's own rule. **WHAT MOVES IS WHAT HAPPENS TO THE REVERSAL'S
// EFFECT: IT IS UNDONE.** Under the as-filed shape `(a)` the effect STOOD, so the store ended in the very state
// the judgement had refused — *"a refusal that reports the violation while leaving it is not a discharge"* — and
// the declaration now requires the pre-reversal standing back (`contract.md §2.6`'s clause of 2026-10-26,
// annotate-beside; `judgeReversal`'s `restoreReversal`). **THE STORE-STANDS-AT-`W_SECOND` READING — THE
// PRE-REVERSAL STANDING — IS THEREFORE THE ASSERTION HERE**, the refusal's `log` says the reversal was undone,
// and the restore is shown to ask no pair body and to deliver no listener.
//
// **THE OTHER THIRTEEN MEMBERS ARE NOT THIS CELL'S SUBJECT AND NO MEMBER BUT `rollback` MOVES.** The cells that
// would catch a change to any of them are named where they live, and they are the census and the sweeps:
//   * `tests/e2e/blind-entry-surface.test.mjs`'s `entry · contract.md §2.4 item 9 (the fourteen) · the instance
//     carries EXACTLY fourteen own members, by name` — the product's member set, member for member;
//   * `tests/unit/js-constraints/a126-constraint-methods.test.mjs`'s `FOURTEEN_MEMBERS` assertions — the same
//     set read again before every refusal cell in that file;
//   * `tests/e2e/receiver-detachment.test.mjs`'s `receiver_detachment_every_member_refuses_a_detached_call_in_the_one_plain_form`
//     and `receiver_detachment_the_whole_detached_sweep_moves_no_state` — **the detached sweep**, member by
//     member, with its bound control;
//   * `tests/e2e/addon-surface.test.mjs` — `P-SAS-1`/`V-1` and the arity/`F-3` drives over the artefact's
//     THIRTEEN declared names, so the addon's own export set is read on every run;
//   * `tests/e2e/addon-adoption.test.mjs`'s `ada_pada5_s_commit_open_the_walk_covers_thirteen_calls_five_bracketing_and_eight_not`
//     — the commit-opening walk over every call of the surface that can open one, which is where a member the
//     judgement had made open a commit would redden.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DEF-W · under `D-38` (2026-10-26) a `rollback` whose TERMINAL state a registered constraint refuses answers the one plain form with `status` `ConstraintPassRefused` and a `log` naming the constraint, while a lawful reversal answers its unchanged success record', (t) => {
  // **THE TWO VALUES THIS ROW KEEPS APART** — `W_FIRST` is the value that STANDS before the second write and is
  // what the reversal RESTORES (so it is the state the refusing pair rejects), and `W_SECOND` is what the second
  // write lands (so it is the state that pair must ADMIT at its own registration evaluation). They are this
  // file's own `SEED` and `REFUSED` sentinels under names this row can read.
  const W_FIRST = SEED;
  const W_SECOND = REFUSED;
  // ── (1) THE REFUSED ARM. The seed, then the second value whose `opId` is the reversal's argument, then the
  // pair. **THE PAIR IS REGISTERED AFTER THE W_SECOND WRITE AND PASSES AT REGISTRATION** — `K-1` evaluates the
  // body once, against the store's standing then (`surface.md §2.12` item 3's states (i)–(β)), which is
  // `W_SECOND` — and it is the state the reversal RESTORES that it refuses.
  const refusing = make();
  refusing.write(['a'], 'mem', W_FIRST);
  const second = refusing.write(['a'], 'mem', W_SECOND);
  // **THE DRIVE'S OWN INSTRUMENTS FOR THE RESTORE'S TWO FORBIDDEN ACTS** (`judgeReversal`'s `restoreReversal`):
  // a listener stands at `['a']` so a delivered invocation would be COUNTED, and the pair's every ask is
  // recorded so a second ask by the restore would be COUNTED. Both must stay at their lawful counts.
  const refusedDelivered = [];
  const refusedHandle = refusing.listen('blind-def-w-a', [['a']]);
  refusing.register(refusedHandle, (address) => { refusedDelivered.push(address); });
  const refusedAsked = [];
  const refusingPair = attempt(() => refusing.addConstraint({ address: ['a'], id: 'w1' },
    (context) => {
      refusedAsked.push(context.value);
      return context.value === W_SECOND
        ? true
        : { message: 'this pair admits the second value alone' };
    }));
  const refused = attempt(() => refusing.rollback(second.op.opId));
  // **WHAT THE STORE STANDS AT AFTERWARDS IS THE PRE-REVERSAL STANDING** — the reversal ran, the judgement
  // refused the state it left, and the refusal UNDID the reversal (`DEF-W`'s `(a)` discharged).
  const refusedStanding = refusing.read(['a']);
  const refusedShape = shapeOf(refused.caught);
  const refusedLog = refused.caught !== null && typeof refused.caught === 'object' && Array.isArray(refused.caught.log)
    ? refused.caught.log
    : [];

  // ── (2) THE LAWFUL ARM. The same seed and the same second write, with a pair that admits everything this
  // reversal can leave: the terminal state satisfies every registered pair, so the record is the declared one.
  const lawfulStore = make();
  lawfulStore.write(['a'], 'mem', W_FIRST);
  const lawfulSecond = lawfulStore.write(['a'], 'mem', W_SECOND);
  const lawfulPair = attempt(() => lawfulStore.addConstraint({ address: ['a'], id: 'w2' },
    (context) => (typeof context.value === 'number' && context.value >= W_FIRST
      ? true
      : { message: 'this pair admits no value below the seed' })));
  const lawful = attempt(() => lawfulStore.rollback(lawfulSecond.op.opId));
  const lawfulStanding = lawfulStore.read(['a']);
  const lawfulKeys = lawful.ok ? Object.keys(lawful.value).sort() : null;

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual([refusingPair.ok, lawfulPair.ok], [true, true],
    `both pairs must REGISTER (the body passes against the state standing at registration, \`W_SECOND\`), or the `
      + `two arms are not the arms this cell claims. THE DRIVE OBSERVED refusingPair=${JSON.stringify(shapeOf(refusingPair.caught))} `
      + `lawfulPair=${JSON.stringify(shapeOf(lawfulPair.caught))}`);
  assert.deepEqual([refused.ok, lawful.ok], [false, true],
    `the drive's own arms must answer REFUSED, ANSWERED. THE DRIVE OBSERVED refused.ok=${refused.ok} `
      + `(caught ${JSON.stringify(refusedShape)}) and lawful.ok=${lawful.ok} `
      + `(caught ${JSON.stringify(shapeOf(lawful.caught))})`);

  // ── THE FINDING, AT THE FORM AND AT THE STATUS. ──────────────────────────────────────────────
  // `§2.5` items 3–4: a THROWN plain object of exactly `{status, message, log}`, `log` present on every arm.
  assert.deepEqual(refusedShape.keys, REFUSAL_MEMBERS,
    `a refused reversal crosses this surface as exactly ${JSON.stringify(REFUSAL_MEMBERS)} — the ONE plain form `
      + `(\`docs/specs/storeroom-js/surface.md §2.5\` items 3–4). THE DRIVE CAUGHT ${JSON.stringify(refusedShape)}`);
  assert.equal(refused.caught.status, 'ConstraintPassRefused',
    `a refused reversal's \`status\` is the set's rank-\`20\` member \`ConstraintPassRefused\` (\`strata/decisions.md\` · `
      + `\`D-38\`; \`contract.md §2.6\`'s clause of 2026-10-26; \`src/error.rs\`'s \`CODES\`, \`[&str; 20]\`). THE DRIVE `
      + `READ ${JSON.stringify(refused.caught.status)} and message ${JSON.stringify(refused.caught.message)}`);
  // **AND THE REFUSAL IS NOT THE SAVE'S, AND CARRIES NO `KC` TOKEN** (`A120` (2): the token stays in the
  // kernel; `FileCommitFailed` is the SAVE's code alone — `D-38`'s `DEF-H` reading).
  assert.equal(refused.caught.status === 'FileCommitFailed' || refused.caught.status === 'ConstraintListInvalid',
    false,
    `a refused reversal is not the save's code and not the registration's: the drive read `
      + `${JSON.stringify(refused.caught.status)}`);
  assert.equal(JSON.stringify(refused.caught).includes('KC-'), false,
    `no \`KC\` spelling crosses this surface (\`A120\` (2)): the token stays in the kernel and the status names `
      + `the layer that refused. THE DRIVE CAUGHT ${JSON.stringify(refused.caught)}`);

  // ── AND THE `log` NAMES THE CONSTRAINT AND THE STATE IT REFUSED. ─────────────────────────────
  // `kernel-surface.md §2.5` item 1: the entry's CLOSED four-kind set — the same entry shape every other log
  // this surface carries has, so a consumer reads this `log` with the reader it already has — **AND AT THIS
  // NO-ATTEMPT ARM THE DECLARED FIVE, `seq` ABSENT** (`NO_ATTEMPT_LOG_MEMBERS` above, re-derived on
  // `D-65` 2026-10-28: the position is the entry's own index in the one-entry list it stands in, and no member
  // restates it).
  assert.ok(refusedLog.length > 0,
    `the refusal's \`log\` names the constraint and the state it refused, so it is not empty here: the drive `
      + `read ${JSON.stringify(refusedLog)}`);
  for (const [index, entry] of refusedLog.entries()) {
    assert.deepEqual(Object.keys(entry).sort(), [...NO_ATTEMPT_LOG_MEMBERS].sort(),
      `the no-attempt refusal's entry carries exactly ${JSON.stringify(NO_ATTEMPT_LOG_MEMBERS)} `
        + `(\`kernel-surface.md §2.5\` item 1, read through \`D-65\`); the drive `
        + `read ${JSON.stringify(Object.keys(entry))} from ${JSON.stringify(entry)}`);
    assert.equal(refusedLog[index], entry,
      `the entry's POSITION is the ARRAY INDEX — it IS the list's element at index ${index}, and no \`seq\` `
        + `member restates the place (\`D-65\`); the drive read `
        + `${JSON.stringify(Object.hasOwn(entry, 'seq'))} under a \`seq\` member`);
    assert.equal(Object.hasOwn(entry, 'seq'), false,
      `\`seq\` is ABSENT from this entry — the member is gone and the index is the only copy of the position `
        + `(\`D-65\`); the drive read ${JSON.stringify(Object.keys(entry))}`);
    assert.equal(LOG_KINDS.includes(entry.kind), true,
      `\`kind\` is one of ${JSON.stringify(LOG_KINDS)}; the drive read ${JSON.stringify(entry.kind)}`);
  }
  const naming = refusedLog.filter((entry) => entry.id === 'w1'
    && entry.message.includes('w1')
    && entry.message.includes(JSON.stringify(W_FIRST)));
  assert.equal(naming.length, refusedLog.length,
    `every entry of the refusal's \`log\` NAMES THE CONSTRAINT (\`id\` \`w1\`) AND THE STATE IT REFUSED `
      + `(${JSON.stringify(W_FIRST)}, the value the reversal restored). THE DRIVE READ ${JSON.stringify(refusedLog)}`);
  // **THE `message` IS THE STORE'S OWN GENERATED SENTENCE, AT THE PAIR'S `<SEGMENT>` SLOT, AND THIS CELL
  // ASSERTS THE SLOT AND NOT THE WORDING** (`§8.2`'s row for the rank-`20` member; `DD-52` forbids the package
  // authoring a second one). The address it prints is the one the reversal's judgement found the refusal at.
  assert.equal(typeof refused.caught.message === 'string'
    && refused.caught.message.length > 0
    && refused.caught.message.includes("'a'"), true,
    `the refusal's \`message\` is the store's generated sentence and renders the pair's own \`<SEGMENT>\` slot `
      + `(\`§8.2\`; \`DD-52\`). THE DRIVE READ ${JSON.stringify(refused.caught.message)}`);

  // ── THE LAWFUL SIDE: THE RECORD IS UNCHANGED, MEMBER FOR MEMBER, AND CARRIES NO `log`. ───────
  assert.deepEqual(lawfulKeys, ['opId', 'restoredTo', 'undoneOps'],
    `a LAWFUL reversal answers its declared record and NO new member (\`PAR-JS-9\`: \`{opId, undoneOps, `
      + `restoredTo}\`; \`D-38\`: *"a lawful reversal is unchanged"*). THE DRIVE READ ${JSON.stringify(lawfulKeys)}`);
  assert.equal(lawful.value.opId, lawfulSecond.op.opId,
    `the record's \`opId\` echoes the id the reversal named: the drive read `
      + `${JSON.stringify(lawful.value.opId)} against ${JSON.stringify(lawfulSecond.op.opId)}`);
  assert.deepEqual([...lawful.value.undoneOps], [lawfulSecond.op.opId],
    `\`undoneOps\` is the LIST of the ids the reversal undid; the drive read `
      + `${JSON.stringify(lawful.value.undoneOps)}`);
  assert.deepEqual(lawful.value.restoredTo, { present: true, value: W_FIRST },
    `\`restoredTo\` is the base state the address now stands at — the seed the reversal restored: `
      + `${JSON.stringify(lawful.value.restoredTo)}`);
  assert.equal(Object.hasOwn(lawful.value, 'log'), false,
    'a lawful reversal carries NO log: the judgement adds nothing to a record it did not refuse');
  assert.equal(lawfulStanding, W_FIRST,
    `and the store stands where the lawful reversal left it; the drive read ${JSON.stringify(lawfulStanding)}`);

  // ── THE REFUSAL UNDOES THE REVERSAL — `DEF-W`'s `(a)` DISCHARGED, 2026-10-26. ───────────────
  assert.equal(refusedStanding, W_SECOND,
    `THE REFUSED ARM'S STORE STATE — the refusal reports the violation AND puts the store back: the reversal `
      + `RAN, the judgement refused the state it left (${JSON.stringify(W_FIRST)}), and the pre-reversal `
      + `standing was restored. THE DRIVE READ ${JSON.stringify(refusedStanding)} where the pre-reversal `
      + `standing is ${JSON.stringify(W_SECOND)} and the refused state is ${JSON.stringify(W_FIRST)}`);
  // **AND THE LOG SAYS SO**, so a consumer that catches the refusal knows the store is back where it started
  // (the entry's `message` is this arm's own record; the crossed `message` stays the store's sentence,
  // `DD-52`). ONE ENTRY, SIX MEMBERS: no second log entry and no seventh member is minted for the undo.
  assert.equal(refusedLog.length, 1,
    `the refusal's \`log\` is ONE entry at this arm (\`contract.md §2.6\` item 4: the no-attempt refusal's arm `
      + `is a single kernel-shaped \`constraint-check\` entry). THE DRIVE READ ${JSON.stringify(refusedLog)}`);
  assert.equal(typeof refusedLog[0].message === 'string' && /undone/i.test(refusedLog[0].message), true,
    `the refusal's log entry says the reversal was UNDONE, or a consumer is left believing the store still `
      + `holds the state the judgement refused. THE DRIVE READ ${JSON.stringify(refusedLog[0]?.message)}`);
  // **AND THE RESTORE IS NOT JUDGED AND RECURSES INTO NOTHING** (`restoreReversal`): no listener was delivered
  // and no pair body was asked a second time. The pair's asks are its registration ask (`W_SECOND`) and the
  // judgement's ask (the post-reversal state); a third ask would be a member the restore had re-entered.
  assert.deepEqual(refusedDelivered, [],
    `the restoring act is a COMPENSATING ACT and not a consumer write: it delivers no listener. THE DRIVE `
      + `RECORDED ${JSON.stringify(refusedDelivered)} invocation(s)`);
  assert.deepEqual(refusedAsked, [W_SECOND, W_FIRST],
    `the pair is asked TWICE and no more — once at registration (${JSON.stringify(W_SECOND)}) and once by the `
      + `judgement (${JSON.stringify(W_FIRST)}); the restore asks nothing. THE DRIVE WAS ASKED AT `
      + `${JSON.stringify(refusedAsked)}`);

  // ── THE READINGS, PRINTED ON BOTH ARMS (`D-21`: a cell owes what it read). ───────────────────
  t.diagnostic(`DEF-W · D-38 (2026-10-26) · REFUSED reversal: rolled back op ${JSON.stringify(second.op.opId)} `
    + `to ${JSON.stringify(W_FIRST)} against pair 'w1'; status = ${JSON.stringify(refused.caught.status)}; `
    + `message = ${JSON.stringify(refused.caught.message)}; log = ${JSON.stringify(refusedLog)}; `
    + `store stands at ${JSON.stringify(refusedStanding)} (the pre-reversal standing; the refused state `
    + `${JSON.stringify(W_FIRST)} no longer stands); listener deliveries during the restore = `
    + `${JSON.stringify(refusedDelivered)}; pair asks = ${JSON.stringify(refusedAsked)}`);
  t.diagnostic(`DEF-W · D-38 (2026-10-26) · LAWFUL reversal: rolled back op `
    + `${JSON.stringify(lawfulSecond.op.opId)} to ${JSON.stringify(W_FIRST)} against pair 'w2'; `
    + `record = ${JSON.stringify(lawful.value)}; keys = ${JSON.stringify(lawfulKeys)}; `
    + `store stands at ${JSON.stringify(lawfulStanding)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DEF-W (2) — THE OTHER HALF OF THE DISCRIMINATOR: a reversal INSIDE an open attempt is a STEP, and is not judged
//
// **WHY THIS CELL EXISTS.** `DEF-W` above proves the TERMINAL half — a reversal at rest is judged. It does not
// prove the other half, and nothing else in the battery did: **a reversal performed INSIDE an open attempt must
// NOT be judged**, because the state it leaves is not the state that stands (the open window moves it again:
// the kernel's own failing-attempt floor call, a repair's landing, a continuing pass), because the judgement
// would invoke the very constraint body the attempt is already evaluating, and because `D-40`'s *"a failed
// attempt leaves the store exactly as it found it"* is the arm a careless judgement breaks. **The discriminator
// is `reversalAtRest` (`bindings/js/src/entry/constraints.mjs`) and it is a CONJUNCTION — NO OPEN COMMIT AND NO
// OPEN ATTEMPT ⇒ judge** (`openCommits(instance) === 0 && kernelFor(instance).live.size === 0`, its corrected
// form of 2026-10-26, pinned at `DEF-W (3)` below); **either one in flight ⇒ the watch answers `[]`, no read is
// taken and no body is invoked.**
//
// **THE TWO ARMS ARE THE SAME STORE SHAPE AND THE SAME PAIR BODY, AND ONLY THE REVERSAL'S INSTANT DIFFERS:**
//   (1) THE STEP — the pair's body, during a pass, calls `store.rollback(<an earlier op's id>)` itself. The
//       attempt is OPEN at that instant, so the reversal is a step: **it must answer its unchanged success
//       record**, and the body must never be asked again by a judgement (a judgement's ask would arrive with
//       `context.value` at the post-reversal state, which this body REFUSES — so a judged step is caught twice
//       over: the reversal call would throw `ConstraintPassRefused` and an extra invocation would be recorded);
//   (2) THE AT-REST CONTROL — the same seed, the same second write, the same reversal, asked at the surface.
//       No attempt is open, so the state it leaves is the state the caller then reads, and the pair that admits
//       the SECOND value and refuses the FIRST must refuse it: **`ConstraintPassRefused` and its log** — and,
//       from 2026-10-26 (`DEF-W`'s `(a)` discharged), the refusal puts the pre-reversal standing back and says so.
// **THE CONTROL IS WHAT MAKES ARM (1) A FINDING AND NOT A VACUOUS GREEN**: it proves the pair really does
// refuse the exact state the step's reversal left, so arm (1)'s success record can only be explained by the
// discriminator declining to judge a step.
//
// **⟶ AND ARM (1)'S OUTCOME IS RE-DERIVED 2026-10-27 — `strata/decisions.md` · `D-42`, THE ARCHITECT, VERBATIM:
// *"Actions inside of an open commit start the constraint check over again."*** `RCA-8(g)` ANNOTATE-BESIDE:
// **every byte above stands BYTE-FOR-BYTE and is read THROUGH this paragraph; the sentences above that say what
// ARM (1) ANSWERS are SUPERSEDED and are not restated.** **THE MEASURED DEFECT THAT MOVED IT** (`D-41` item
// `3`): this cell's green WAS the window being unjudged — *"zero judgement invocations inside a body, while the
// identical call one frame out is refused and restored"* — **so the conservative direction was the permissive
// one, and the in-commit reversal's violating effect STOOD.** **WHAT ARM (1) ANSWERS NOW, MEMBER FOR MEMBER:**
// the `rollback` call ITSELF still answers its declared record — the step is STILL not judged as a step,
// `D-40`'s gate stands and `reversalAtRest` keeps both conjuncts — **and THE TERMINAL CALL, the write that held
// the window, REFUSES**: the check the body's reversal invalidated is RESTARTED from its beginning at the state
// the reversal left, the pair is asked THERE, refuses, and the refusal crosses in the declared form
// `{status, message, log}` with the set's rank-`20` `ConstraintPassRefused` and the store restored to its
// pre-reversal standing. **THE CONTROL'S ARM IS UNTOUCHED.** **ITS MEASURED REACH IS THIS CELL AND
// `tests/e2e/in-commit-restart.test.mjs`'s five arms, the body arm among them.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DEF-W (2) · a reversal performed INSIDE an open attempt is a STEP and is still not judged AS A STEP — the `rollback` a constraint body issues answers its unchanged record — while `D-42` RESTARTS the check: the pair is asked at the state the reversal left and the TERMINAL WRITE refuses `ConstraintPassRefused`, where the same reversal at rest is refused as it always was', (t) => {
  // The step arm's third value, distinct from the seed and the second value so the store's reading names one.
  const W_STEP_THIRD = 7;

  // ── (1) THE STEP ARM. Seed, then the second value whose op the reversal names, then a pair at `['a']` that
  // ADMITS every value but the seed and, during a pass (an attempt is open — the context carries its reference),
  // issues the reversal ONCE. **THE BODY REFUSES THE SEED**, so a judgement taken during the step would throw.
  const step = make();
  step.write(['a'], 'mem', SEED);
  const stepSecond = step.write(['a'], 'mem', REFUSED);
  const inner = [];
  const asked = [];
  let issued = 0;
  const stepPair = attempt(() => step.addConstraint({ address: ['a'], id: 'w3' }, (context) => {
    asked.push(context.value);
    // THE JUDGEMENT'S ASK WOULD BE AT THE STATE THE REVERSAL LEFT — the seed — and is refused here.
    if (context.value === SEED) return { message: 'this pair admits every value but the seed' };
    // THE REVERSAL, ISSUED FROM INSIDE THE OPEN ATTEMPT, AND ONCE: `context.attempt` is non-null exactly where a
    // pass is evaluating this pair (it is `null` at registration and at a reversal's judgement).
    if (context.attempt !== null && issued === 0) {
      issued += 1;
      inner.push(attempt(() => step.rollback(stepSecond.op.opId)));
    }
    return true;
  }));
  const stepWrite = attempt(() => step.write(['a'], 'mem', W_STEP_THIRD));
  const stepStanding = step.read(['a']);
  // **THE TERMINAL CALL'S REFUSAL** — read as a list so both the form and the entry that names the pair are
  // asserted (`D-42`: the restart's refusal is the at-rest refusal's own form, member for member).
  const stepWriteLog = stepWrite.ok === false && stepWrite.caught !== null
    && typeof stepWrite.caught === 'object' && Array.isArray(stepWrite.caught.log)
    ? stepWrite.caught.log
    : [];

  // ── (2) THE AT-REST CONTROL ARM. The same shape with the reversal asked at the surface, where no attempt is
  // open: the pair admits `REFUSED` (the state standing at registration) and refuses `SEED` (the state the
  // reversal leaves), so the judgement must refuse it.
  const rest = make();
  rest.write(['a'], 'mem', SEED);
  const restSecond = rest.write(['a'], 'mem', REFUSED);
  const restPair = attempt(() => rest.addConstraint({ address: ['a'], id: 'w4' },
    (context) => (context.value === SEED
      ? { message: 'this pair admits every value but the seed' }
      : true)));
  const restRollback = attempt(() => rest.rollback(restSecond.op.opId));
  const restStanding = rest.read(['a']);
  const restLog = restRollback.ok === false && restRollback.caught !== null
    && typeof restRollback.caught === 'object' && Array.isArray(restRollback.caught.log)
    ? restRollback.caught.log
    : [];

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual([stepPair.ok, restPair.ok], [true, true],
    `both pairs must REGISTER (each passes against the state standing when it registered), or the two arms are `
      + `not the arms this cell claims: stepPair=${JSON.stringify(shapeOf(stepPair.caught))} `
      + `restPair=${JSON.stringify(shapeOf(restPair.caught))}`);
  assert.equal(inner.length, 1,
    `the body must have issued exactly ONE reversal inside the open attempt; the drive recorded ${inner.length}`);
  assert.deepEqual([restRollback.ok, restRollback.caught.status], [false, 'ConstraintPassRefused'],
    `the AT-REST control's reversal must be REFUSED with \`ConstraintPassRefused\` (\`D-38\`), or arm (1) is not `
      + `the discriminator's step arm: the control answered ok=${restRollback.ok} `
      + `caught=${JSON.stringify(shapeOf(restRollback.caught))}`);

  // ── THE STEP IS STILL NOT JUDGED AS A STEP — `D-40`'s gate stands (`D-42`). ──────────────────
  // The reversal's own answer is the declared record (`PAR-JS-9`) and NOT the one plain form: the action is not
  // judged AT ITS INSTANT, so nothing is thrown out of the body's frame and no body is invoked there.
  assert.equal(inner[0].ok, true,
    `a reversal performed INSIDE an open attempt is an UNWINDING STEP and must NOT be judged AT ITS INSTANT `
      + `(\`D-38\`'s own reasoning: the state it leaves is not the state that stands; \`D-42\` keeps that gate), `
      + `so the body's \`rollback\` call answers its record. THE DRIVE CAUGHT `
      + `${JSON.stringify(shapeOf(inner[0].caught))}`);
  assert.deepEqual(Object.keys(inner[0].value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    `a lawful reversal answers \`{opId, undoneOps, restoredTo}\` and no new member (\`PAR-JS-9\`); the drive read `
      + `${JSON.stringify(Object.keys(inner[0].value))}`);
  assert.deepEqual(inner[0].value.restoredTo, { present: true, value: SEED },
    `the step's reversal ran and restored the seed: ${JSON.stringify(inner[0].value.restoredTo)}`);

  // ── AND THE FINDING THAT REPLACED THE OLD ONE: THE CHECK RESTARTED AND THE TERMINAL WRITE REFUSED ──
  // **`D-42` (2026-10-27): the check the action invalidated is RE-RUN FROM ITS BEGINNING at the state the
  // action left, and the terminal call — the write that held the window — refuses in the declared form.**
  assert.equal(stepWrite.ok, false,
    `the violating effect must NOT stand: the terminal write refuses (\`D-42\`). THE DRIVE'S WRITE ANSWERED ok `
      + `while the store stood at ${JSON.stringify(stepStanding)}`);
  assert.deepEqual(Object.keys(stepWrite.caught).sort(), REFUSAL_MEMBERS,
    `the restart's refusal crosses this surface as ${JSON.stringify(REFUSAL_MEMBERS)} — ONE thrown plain object `
      + `(\`docs/specs/storeroom-js/surface.md §2.5\` items 3–4): the drive caught `
      + `${JSON.stringify(shapeOf(stepWrite.caught))}`);
  assert.equal(stepWrite.caught.status, 'ConstraintPassRefused',
    `the crossed status is the set's rank-\`20\` member, the SAME one the at-rest control crosses with: the `
      + `drive read ${JSON.stringify(stepWrite.caught.status)}`);
  assert.equal(stepWriteLog.some((entry) => entry.id === 'w3'), true,
    `the restart's \`log\` NAMES the pair that refused the state the reversal left: `
      + `${JSON.stringify(stepWriteLog)}`);
  // **AND THE PAIR WAS ASKED AT THE STATE THE REVERSAL LEFT — the restart's own ask, which the old arm forbade.**
  assert.deepEqual(asked, [REFUSED, W_STEP_THIRD, SEED],
    `the pair is asked at REGISTRATION (${REFUSED}), by the PASS (${W_STEP_THIRD}) and — from \`D-42\` — by the `
      + `RESTART at the state the reversal left (${SEED}). THE DRIVE WAS ASKED AT ${JSON.stringify(asked)}`);
  // **⟶ RE-DERIVED 2026-10-27 (`DEF-AE`'s FIX: *"Cache the restoreMark when opening a commit, based on the last valid
  // state/op of the journal."*) AND RE-DERIVED AGAIN 2026-10-28 — `D-63`, THE ARCHITECT, VERBATIM: *"After the
  // constraint sweep ends in a valid state, bump the restore mark. The passing constraint state marks the new next
  // valid state."*** **THE THREE READINGS, IN ORDER:** the journal's HEAD put the store at `${W_STEP_THIRD}` (the
  // defect this row was filed on — the head *happened* to be the write's landing); the commit's OPENING mark put it
  // at `${REFUSED}` (the state the attempt found); **and the LAST VALIDATED MARK puts it back at `${W_STEP_THIRD}`
  // for a DIFFERENT REASON — the write's sweep PASSED, so the state it left is the state the sweep approved, and a
  // validated edit STANDS against a later refusal.** The violating state the reversal left (`${SEED}`) is in
  // neither reading. `RCA-8(g)` ANNOTATE-BESIDE: this cell's subject — the step is not judged, the terminal write
  // refuses, the refusal restores — is unchanged; only the state restored to moves, and its reason with it.
  assert.equal(stepStanding, W_STEP_THIRD,
    `**A VALIDATED EDIT STANDS AGAINST A LATER REFUSAL** — the LAST VALIDATED MARK the commit holds `
      + `(${W_STEP_THIRD}, the state the passing sweep approved), and NOT the state the commit opened at `
      + `(${REFUSED}) and never the violating state the reversal left (${SEED}): the drive read `
      + `${JSON.stringify(stepStanding)}`);

  // ── AND THE CONTROL'S SHAPE: THE REFUSAL UNDOES THE REVERSAL IT REFUSED (`DEF-W`'s `(a)`, discharged
  // 2026-10-26): the pre-reversal standing is back, and the log says so.
  assert.deepEqual(Object.keys(restRollback.caught).sort(), REFUSAL_MEMBERS,
    `the control's refusal crosses this surface as ${JSON.stringify(REFUSAL_MEMBERS)}: the drive caught `
      + `${JSON.stringify(shapeOf(restRollback.caught))}`);
  assert.equal(restLog.some((entry) => entry.id === 'w4'), true,
    `the control's \`log\` names the pair that refused (\`kernel-surface.md §2.5\` item 1): `
      + `${JSON.stringify(restLog)}`);
  assert.equal(restStanding, REFUSED,
    `the control's reversal ran, the judgement refused the seed it left, and the refusal put the store back `
      + `at the pre-reversal standing it found: the store reads ${JSON.stringify(restStanding)} where the `
      + `pre-reversal standing is ${JSON.stringify(REFUSED)} and the refused state is ${JSON.stringify(SEED)}`);
  assert.equal(restLog.some((entry) => typeof entry.message === 'string' && /undone/i.test(entry.message)), true,
    `the control's refusal says the reversal was UNDONE, so a consumer knows the store is back where it `
      + `started: ${JSON.stringify(restLog.map((entry) => entry.message))}`);

  // ── THE READINGS, PRINTED ON BOTH ARMS (`D-21`: a cell owes what it read). ───────────────────
  t.diagnostic(`DEF-W (2) · D-38/D-40/D-42 (2026-10-26, 2026-10-27) · STEP arm: the pair 'w3' issued `
    + `rollback(${JSON.stringify(stepSecond.op.opId)}) from INSIDE an open attempt and the call ANSWERED `
    + `${JSON.stringify(inner[0].value)} — not judged as a step; the pair was asked at `
    + `${JSON.stringify(asked)} (the third ask is the RESTART's, at ${JSON.stringify(SEED)}); the TERMINAL WRITE `
    + `refused ${JSON.stringify(stepWrite.caught.status)} with log ${JSON.stringify(stepWriteLog)}; the store `
    + `stands at ${JSON.stringify(stepStanding)} — the validated landing standing, the reversal's effect gone`);
  t.diagnostic(`DEF-W (2) · D-38 (2026-10-26) · AT-REST control: the SAME reversal at the surface was REFUSED `
    + `with status ${JSON.stringify(restRollback.caught.status)}, log ${JSON.stringify(restLog)}; the store `
    + `stands at ${JSON.stringify(restStanding)} — the PRE-REVERSAL standing, restored by the refusal — so the `
    + `two arms refuse the SAME state and only the window differs`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DEF-W (3) — THE DISCRIMINATOR IS A CONJUNCTION: *AT REST* = NO OPEN COMMIT **AND** NO LIVE ATTEMPT
//
// **WHY THIS CELL EXISTS.** `reversalAtRest` decides whether a reversal is a terminal act (judged) or an
// unwinding step (not judged). It has read three things in its history: a symbol channel on the instance
// (`Symbol.for('provident-storeroom.attempt-count')`, the count of OPEN COMMITS); then, from 2026-10-26, the
// instance kernel's own map of open attempts (`kernelFor(instance).live.size`); and now — 2026-10-26, the
// correction this cell pins — **BOTH, CONJOINED**: `openCommits(instance) === 0 &&
// kernelFor(instance).live.size === 0`.
//
// **THE TWO STRUCTURES MEASURE DIFFERENT THINGS AND DIVERGE IN BOTH DIRECTIONS**:
//   * AN OPEN COMMIT IS A SCOPE — `state.mjs`'s `attemptIndex(store).open`, a DEPTH COUNTER over the store's
//     in-flight VERB WINDOWS (a verb that finds an extant commit JOINS it rather than opening a second, which
//     is what keeps the count exact under nesting);
//   * A LIVE ATTEMPT IS A RECORD — `kernel.live`, `live.set` at `K-2`, `live.delete` at `release`.
// A delivered listener body runs while the entry's own write window is open (`open` `1`) and the write's
// attempt is already released (`live` `0`); a pass driven through the kernel's own `K-2`/`K-3` runs with an
// attempt live (`live` `1`) and NO verb window open at all (`open` `0`). **NEITHER INSTANT IS AT REST**: each
// is a state the store will move again before the client sees anything.
//
// **AND THE CORRECTION'S GROUND IS THE CLAUSE'S, NOT THIS CODE'S.** `docs/specs/storeroom-js/contract.md §2.6`
// item 1 says the judgement is taken *"where the store owns no open commit"* and gives its REASON: judging a
// step *"would invoke bodies mid-attempt and break `D-40`'s 'leaves the store exactly as it found it'"*. **The
// `live`-only form was unfailable AND LOOSER than that**: it judged inside the caller's own verb window — the
// one thing the clause forbids — so arm (A) answered "judged". Reading the open-commit count ALONE would judge
// inside a kernel-driven pass, so arm (B) would answer "judged". **THE CONJUNCTION IS THE ONLY FORM THAT
// REFUSES BOTH**, and the two reverts of 2026-10-26 (each red in its own direction) are how that was measured.
//
// **THE THREE WINDOWS THIS CELL DRIVES, EACH MEASURED AT BOTH OF THE DISCRIMINATOR'S OWN SOURCES:**
//   (A) LISTENER-DELIVERY INSTANT — `open` `1`, `live` `0` ⇒ **NOT AT REST ⇒ NOT JUDGED**: the call answers its
//       unchanged record and the judgement invokes no body (the pair is never asked at the state the reversal
//       left). **THIS IS THE HALF THAT FLIPS**, and it flips because the clause's reason says so;
//   (B) KERNEL-DRIVEN PASS — `open` `0`, `live` `1` ⇒ **NOT AT REST ⇒ NOT JUDGED** — unchanged in outcome (the
//       `live`-only form already refused it) and now grounded TWICE OVER: the measurement is the live attempt,
//       and the clause's own reason is that the attempt is already evaluating the very bodies a judgement would
//       ask. The first conjunct is measured as `0` here, which is what shows this direction of the divergence;
//   (C) TERMINAL REVERSAL — `open` `0`, `live` `0` ⇒ **AT REST ⇒ JUDGED**, `ConstraintPassRefused` with its log.
//
// **THE CONTROL IS WHAT MAKES THE CELLS NON-VACUOUS**: the same pair at the surface, at rest, refuses the very
// state a reversal leaves — so arms (A)'s and (B)'s success records can only be explained by the discriminator
// declining to judge a window in flight, and not by a pair that would have admitted it.
//
// **⟶ AND ARM (A)'S READING MOVED 2026-10-27 — `strata/decisions.md` · `D-42`, THE ARCHITECT, VERBATIM:
// *"Actions inside of an open commit start the constraint check over again."*** `RCA-8(g)` ANNOTATE-BESIDE:
// **every byte above stands BYTE-FOR-BYTE and is read THROUGH this paragraph; the sentences above that say what
// arm (A) ANSWERS are SUPERSEDED and are not restated.** **THE WINDOW ITSELF IS UNMOVED AND THE DISCRIMINATOR
// IS UNMOVED** (`reversalAtRest` keeps both conjuncts; the restart is not a third conjunct): `open` `1` /
// `live` `0` is STILL not at rest, so **the reversal is still not judged AT ITS INSTANT** and its call still
// answers its unchanged record. **WHAT MOVES IS WHAT HAPPENS TO THE REQUEST AFTER THE WINDOW CLOSES**: the
// terminal write's check RESTARTS from its beginning against the state the reversal left, so **the pair IS
// asked at `W_FIRST` — by the restart, at the terminal call's own end, and not by a judgement taken inside the
// body's frame.** **ARM (A)'S PAIR ADMITS EVERY VALUE, so the restart PASSES and no refusal is produced: this
// is the LAWFUL in-commit arm, and `tests/e2e/in-commit-restart.test.mjs` (3) drives it beside the two
// violating arms.** **ARM (B) IS UNMOVED IN OUTCOME AND ITS GROUND IS NOW SAID EXACTLY** (`CONTRACT`, item 3 of
// `contract.md §2.6`'s annotate-beside of this date): a pass driven straight through `K-2`/`K-3` holds **no open
// commit**, so the ruling's own words do not reach it — it is the conjunction's second conjunct, it answers its
// record, and the request its body raises dies with its window (`constraints.mjs`'s epoch rule). **ARM (C) IS
// UNTOUCHED.**
//
// **⟶ AND ARM (B)'S WINDOW MOVED 2026-10-27 — `strata/decisions.md` · `D-44`, THE ARCHITECT, VERBATIM: *"There
// should be no state where a constraint is being checked without an open commit. Any action that would cause a
// constraint check should open a commit before beginning"*** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above
// stands BYTE-FOR-BYTE and is read THROUGH this paragraph; the sentences that print arm (B)'s window as
// `open` `0` / `live` `1` are SUPERSEDED and are not restated.** `D-44` names exactly that state — *"`D-42`'s
// window `4` (a pass driven by hand, `open=0`/`live=1`): **that state must not exist**"* — and makes `open
// commit` the PRECONDITION of the check, enforced WHERE THE CHECK RUNS: **the pass opens its own scope**
// (`state.mjs`'s `installAttemptSeam` installs the `Symbol.for('provident-storeroom.commit-scope')` channel;
// `kernel-attempt.mjs`'s `runAttempt` runs its pass inside it). **SO ARM (B)'S MEASUREMENT IS NOW `open` `1` /
// `live` `1`** — the direct drive's own commit, joined by nothing, opened by the pass — **and the divergence
// this cell was cut to show (`open` `1`/`live` `0` versus `open` `0`/`live` `1`) is now the ATTEMPT's alone.**
// **THE DISCRIMINATOR IS UNMOVED and answers exactly what it answered**: `live` `1` is still not at rest, so
// the reversal is still not judged at its instant, its call still answers its unchanged record. **WHAT MOVES
// IS THE INVARIANT, NOT THIS ARM'S INSTANT**: no check runs where no commit is open.
//
// **⟶ AND ARM (B)'S ANSWER MOVED, 2026-10-27 — `D-42`'S CONSUMER IS NOW THE PASS'S OWN COMMIT SCOPE.**
// `RCA-8(g)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE and is read THROUGH this paragraph; the
// sentences that say arm (B)'s request *"still has no consumer on this path"* are SUPERSEDED and are not
// restated.** `D-44` declared *"If every check has a commit, every request has a consumer, and the consumer
// stops being a property of one call site"*; the implementation had stopped halfway — the consumer was still
// `constraintWrite`'s frame. **So `kernel-attempt.mjs`'s `runAttempt` now drains, inside its own scope, the
// request its pass recorded** (`state.mjs`'s `restart-drain` channel → `constraints.mjs`'s
// `drainRestartRequests`), and a directly driven pass is no longer the exception: **the pair IS asked at the
// state the reversal left** (in this arm that is `W_FIRST`, the seed the pair REFUSES, so the restarted check
// REFUSES), **`K-3` still ANSWERS — a five-member report whose `outcome` is `'failed'` and whose log carries
// the refusal's entry** — and **the store is restored to the journal's head, the pass's own op `W_THIRD`,
// because the refusal undoes the reversal it refused.** **THE WINDOW AND `reversalAtRest` ARE UNMOVED** (the
// conjunction keeps both conjuncts; the restart is not a third conjunct), and **arm (C) is untouched.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DEF-W (3) · the discriminator is the CONJUNCTION: a reversal at a LISTENER-DELIVERY instant (open commit 1, live 0) is NOT judged AT ITS INSTANT — `D-42` restarts the check at the terminal call, which asks the pair at the state the reversal left and passes — a reversal inside a KERNEL-DRIVEN pass (open commit 1 — the pass opens it, `D-44` — live 1) is NOT judged, and a TERMINAL reversal (open 0, live 0) IS judged with `ConstraintPassRefused`', (t) => {
  const W_FIRST = SEED;      // 5 — the state the reversal restores, and the state a judgement's ask carries
  const W_SECOND = REFUSED;  // 9 — the value the reversal's op landed
  const W_THIRD = 7;         // 7 — arm (A)'s write, and arm (B)'s pass value
  // **THE DISCRIMINATOR'S TWO OWN SOURCES, READ AT ONE INSTANT**: `open` is `state.mjs`'s exported
  // `openCommits` (the index the channel answers) and `live` is the kernel record's own open-attempt map.
  const windowOf = (store) => ({ open: openCommits(store), live: kernelFor(store).live.size });

  // ── (A) THE LISTENER-DELIVERY INSTANT. Seed, second write (the reversal's target op), a listener at `['a']`,
  // then a pair that ADMITS every value — so where a judgement IS taken it cannot refuse this arm and the cell
  // reads the judgement's ASK (here: its absence) rather than a refusal. The write that follows delivers the
  // listener INSIDE its own commit window (`openCommit` at the member's first act, `closeCommit` at its
  // `finally`), and the write's attempt has already been released at the delivery instant
  // (`kernel-attempt.mjs`: `close`, then `settleArm`) — **so the instant is `open` `1`, `live` `0`.**
  const deliveryStore = make();
  deliveryStore.write(['a'], 'mem', W_FIRST);
  const deliverySecond = deliveryStore.write(['a'], 'mem', W_SECOND);
  const deliveryFacts = [];
  let deliveryRollback = null;
  const deliveryHandle = deliveryStore.listen('blind-def-w3-a', [['a']]);
  deliveryStore.register(deliveryHandle, () => {
    deliveryFacts.push(windowOf(deliveryStore));
    if (deliveryRollback === null) {
      deliveryRollback = attempt(() => deliveryStore.rollback(deliverySecond.op.opId));
    }
  });
  const deliveryAsked = [];
  deliveryStore.addConstraint({ address: ['a'], id: 'wa' }, (context) => {
    deliveryAsked.push(context.value);
    return true;
  });
  const deliveryWrite = attempt(() => deliveryStore.write(['a'], 'mem', W_THIRD));
  const deliveryStanding = deliveryStore.read(['a']);

  // ── (B) THE KERNEL-DRIVEN PASS. The same seed and second write, a pair that REFUSES the seed and, during a
  // pass (its context carries the attempt; a judgement's does not), issues the reversal ONCE. The drive opens
  // the attempt with the kernel's own `K-2` (`commit`) and runs it with `K-3` (`runAttempt`) — the two calls a
  // consumer's own kernel route makes — so no package member holds a commit window open across the pass.
  const passStore = make();
  passStore.write(['a'], 'mem', W_FIRST);
  const passSecond = passStore.write(['a'], 'mem', W_SECOND);
  const passFacts = [];
  let passRollback = null;
  const passAsked = [];
  passStore.addConstraint({ address: ['a'], id: 'wb' }, (context) => {
    passAsked.push(context.value);
    if (context.attempt !== null) {
      passFacts.push(windowOf(passStore));
    }
    if (context.attempt !== null && passRollback === null) {
      passRollback = attempt(() => passStore.rollback(passSecond.op.opId));
    }
    return context.value === W_FIRST ? { message: 'this pair admits every value but the seed' } : true;
  });
  const passRecord = kernelCommit(passStore, ['a'], 'mem', W_THIRD);
  const passRun = attempt(() => kernelRunAttempt(passStore, passRecord));
  const passStanding = passStore.read(['a']);

  // ── (C) THE TERMINAL REVERSAL — the same pair at the surface, at rest, refuses the state a reversal leaves.
  // **THE INSTANT IS MEASURED BEFORE THE CALL**, where no verb window and no attempt is in flight (`open` `0`,
  // `live` `0`): that is the ONE window in which the clause's words and its reason both hold, so the judgement
  // IS taken here.
  const controlStore = make();
  controlStore.write(['a'], 'mem', W_FIRST);
  const controlSecond = controlStore.write(['a'], 'mem', W_SECOND);
  controlStore.addConstraint({ address: ['a'], id: 'wc' },
    (context) => (context.value === W_FIRST ? { message: 'this pair admits every value but the seed' } : true));
  const controlFacts = [windowOf(controlStore)];
  const controlRollback = attempt(() => controlStore.rollback(controlSecond.op.opId));
  const controlLog = controlRollback.ok === false && controlRollback.caught !== null
    && typeof controlRollback.caught === 'object' && Array.isArray(controlRollback.caught.log)
    ? controlRollback.caught.log
    : [];
  const controlStanding = controlStore.read(['a']);

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.deepEqual(deliveryFacts, [{ open: 1, live: 0 }],
    `arm (A) must reach a delivery instant with ONE OPEN COMMIT and NO OPEN ATTEMPT — one direction of the `
      + `divergence, and NOT AT REST under the conjunction — or this cell is not driving it: the drive recorded `
      + `${JSON.stringify(deliveryFacts)}`);
  assert.deepEqual(passFacts, [{ open: 1, live: 1 }],
    `arm (B) must reach a pass instant with ONE OPEN COMMIT AND ONE OPEN ATTEMPT — the pass opens its own `
      + `commit scope (\`D-44\`: *"A pass opens a commit before it begins"*, wherever it was driven from) and `
      + `the attempt is the kernel's — or this cell is not driving it: the drive recorded `
      + `${JSON.stringify(passFacts)}. \`open\` \`0\` here was the window \`D-44\` closed: *"that state must not `
      + `exist"*`);
  assert.deepEqual(controlFacts, [{ open: 0, live: 0 }],
    `arm (C) must be measured at a TERMINAL instant — no open commit and no open attempt — or its judgement `
      + `would be the discriminator's accident and not its declaration: the drive recorded `
      + `${JSON.stringify(controlFacts)}`);
  assert.equal(deliveryWrite.ok, true,
    `arm (A)'s write must complete (its pair admits every value); it caught `
      + `${JSON.stringify(shapeOf(deliveryWrite.caught))}`);
  assert.equal(passRun.ok, true,
    `arm (B)'s pass must complete (a judgement over the step's reversal would throw out of the body's own `
      + `rollback call and fail it); the run caught ${JSON.stringify(shapeOf(passRun.caught))}`);
  assert.equal(deliveryRollback.ok, true,
    `arm (A)'s reversal must ANSWER: an open commit is a window in flight, so it is a STEP and is not judged — a `
      + `judgement would throw here only if the pair refused, and it admits every value, so a throw would be the `
      + `discriminator's own. The call caught ${JSON.stringify(shapeOf(deliveryRollback.caught))}`);
  assert.equal(passRollback.ok, true,
    `arm (B)'s reversal must answer its unchanged record: it is a STEP. The call caught `
      + `${JSON.stringify(shapeOf(passRollback.caught))}`);

  // ── THE DECLARED ANSWER, AT ALL THREE WINDOWS. ──────────────────────────────────────────────
  // (A) OPEN COMMIT 1, LIVE 0 ⇒ NOT AT REST ⇒ NOT JUDGED AT ITS INSTANT, **AND THE CHECK RESTARTS AT THE
  // TERMINAL CALL (`D-42`)** — the pair IS asked at the state the reversal left, by the restart, at the end of
  // the write; and because this pair admits every value the restart PASSES and the write ANSWERS.
  assert.deepEqual(deliveryAsked, [W_SECOND, W_THIRD, W_FIRST],
    `arm (A)'s pair is asked at REGISTRATION (${W_SECOND}), by the write's PASS (${W_THIRD}) and — from `
      + `\`D-42\` — by the RESTART at the state the reversal left (${W_FIRST}), at the terminal call's own end. `
      + `THE DRIVE WAS ASKED AT ${JSON.stringify(deliveryAsked)}`);
  assert.equal(deliveryWrite.ok, true,
    `and the restart is not a blanket fail: this pair admits every value, so the restart PASSES and the write `
      + `answers. The write caught ${JSON.stringify(shapeOf(deliveryWrite.caught))} and the store stands at `
      + `${JSON.stringify(deliveryStanding)}`);
  assert.deepEqual(Object.keys(deliveryRollback.value).sort(), ['opId', 'restoredTo', 'undoneOps'],
    `a reversal answered as a STEP answers its declared record (PAR-JS-9) and no new member: the drive read `
      + `${JSON.stringify(Object.keys(deliveryRollback.value))}`);
  assert.equal(deliveryStanding, W_FIRST,
    `the reversal's own effect is what it is: nothing refused it, so the value it restored STANDS — the drive `
      + `read ${JSON.stringify(deliveryStanding)}`);
  // (B) OPEN COMMIT 1 (the pass's own scope), LIVE 1 ⇒ NOT AT REST ⇒ NOT JUDGED — and from 2026-10-27 the
  // request the action raises IS CONSUMED by the pass's own commit scope, re-run from its beginning.
  assert.equal(passAsked.includes(W_FIRST), true,
    `**THE RESTART ASKS THE PAIR AT THE STATE THE REVERSAL LEFT** (\`D-42\`, consumed by the pass's own scope `
      + `since 2026-10-27): the pair is asked there and REFUSES the seed. THE DRIVE WAS ASKED AT `
      + `${JSON.stringify(passAsked)}`);
  assert.deepEqual(passAsked, [W_SECOND, W_THIRD, W_FIRST],
    `arm (B)'s pair is asked at REGISTRATION (${W_SECOND}), by the PASS (${W_THIRD}) and by THE RESTART `
      + `(${W_FIRST}) — never at a judgement's own instant, which is the instant this arm is about. THE DRIVE `
      + `WAS ASKED AT ${JSON.stringify(passAsked)}`);
  assert.equal(passRun.value.outcome, 'failed',
    `**AND THE REPORT CARRIES THE RESTARTED CHECK'S REFUSAL**: \`K-3\` answers (it does not throw — the pass it `
      + `ran passed) and its \`outcome\` is \`'failed'\`. THE DRIVE READ `
      + `${JSON.stringify(passRun.value.outcome)}`);
  assert.equal(passRun.value.log[passRun.value.log.length - 1].id, 'wb',
    `and the report's last entry NAMES the pair that refused the state the reversal left: `
      + `${JSON.stringify(passRun.value.log[passRun.value.log.length - 1])}`);
  assert.equal(passStanding, W_THIRD,
    `**AND THE VIOLATING EFFECT DOES NOT STAND**: the refusal's own compensating act undoes the reversal it `
      + `refused, so the store stands at the journal's head — the pass's own op ${JSON.stringify(W_THIRD)} — and `
      + `not at ${JSON.stringify(W_FIRST)}. THE DRIVE READ ${JSON.stringify(passStanding)}`);
  // (C) OPEN COMMIT 0, LIVE 0 ⇒ AT REST ⇒ JUDGED: the refused-reversal arm, with its log.
  assert.deepEqual([controlRollback.ok, controlRollback.caught?.status], [false, 'ConstraintPassRefused'],
    `the AT-REST reversal of the SAME shape must be JUDGED and REFUSED (\`D-38\`), or arms (A) and (B) are `
      + `vacuous: the control answered ok=${controlRollback.ok} `
      + `caught=${JSON.stringify(shapeOf(controlRollback.caught))}`);
  assert.deepEqual(Object.keys(controlRollback.caught).sort(), REFUSAL_MEMBERS,
    `a refused reversal crosses this surface as ${JSON.stringify(REFUSAL_MEMBERS)}: the control caught `
      + `${JSON.stringify(shapeOf(controlRollback.caught))}`);
  assert.equal(controlLog.length, 1,
    `the no-attempt refusal's \`log\` is ONE entry (\`contract.md §2.6\` item 4): the control read `
      + `${JSON.stringify(controlLog)}`);
  assert.equal(controlLog[0].kind, 'constraint-check',
    `the refusal's entry is a \`constraint-check\` of the kernel's own kind set: `
      + `${JSON.stringify(controlLog[0])}`);
  assert.equal(controlLog[0].id, 'wc',
    `the refusal's entry NAMES the pair that refused the state the reversal left: `
      + `${JSON.stringify(controlLog[0])}`);
  assert.deepEqual(Object.keys(controlLog[0]).sort(), NO_ATTEMPT_LOG_MEMBERS.slice().sort(),
    `the refusal's entry carries ${JSON.stringify(NO_ATTEMPT_LOG_MEMBERS)} and no sixth member — \`seq\` `
      + `ABSENT, its place stated by the array index (\`D-65\`): `
      + `${JSON.stringify(Object.keys(controlLog[0]))}`);
  // **⟶ AND THE POSITION IS RE-DERIVED TO THE INDEX (`D-65`).** These two limbs read
  // `controlLog[0].seq === 1` twice, which was *"the entry's own place in the one-entry list it stands in"*
  // stated by the member. **THE MEMBER IS GONE**, so the property — *this entry stands at the list's first
  // position* — is asserted where the position now lives: **`controlLog[0]` IS the list's element at index
  // `0`**, it stands at no other position, and no member restates the place.
  assert.equal(controlLog[0], controlLog[controlLog.length - 1],
    'the entry stands at the list\u2019s first position and it is the list\u2019s only entry — the index is '
      + 'the position (`D-65`)');
  assert.equal(controlLog.indexOf(controlLog[0]), 0,
    'and its position is index 0 of the one-entry list it stands in, read off the array and off no member '
      + '(`D-65`)');
  assert.equal(Object.hasOwn(controlLog[0], 'seq'), false,
    'and no `seq` member restates that position: the member is gone (`D-65`), so there is no second copy of it '
      + `to disagree with anything; the drive read ${JSON.stringify(Object.keys(controlLog[0]))}`);
  assert.equal(controlStanding, W_SECOND,
    `the refusal undid the reversal it refused (\`DEF-W\`'s \`(a)\`): the store stands again at `
      + `${JSON.stringify(W_SECOND)} where the drive read ${JSON.stringify(controlStanding)}`);

  // ── THE READINGS, PRINTED ON EVERY ARM (`D-21`: a cell owes what it read). ───────────────────
  t.diagnostic(`DEF-W (3) · D-38/D-42 (2026-10-26, 2026-10-27) · ARM A (listener delivery, inside the write's `
    + `window): open=${deliveryFacts[0].open} (open commit) live=${deliveryFacts[0].live} (open attempt) ⇒ NOT `
    + `AT REST ⇒ not judged AT ITS INSTANT; pair asked at ${JSON.stringify(deliveryAsked)} — the third ask is `
    + `THE RESTART'S, at ${JSON.stringify(W_FIRST)}, at the terminal call's own end; record = `
    + `${JSON.stringify(deliveryRollback.value)}; store stands at ${JSON.stringify(deliveryStanding)} — the `
    + `restart asked and PASSED, so no refusal was produced (the lawful in-commit arm)`);
  t.diagnostic(`DEF-W (3) · D-38/D-44 (2026-10-26, 2026-10-27) · ARM B (kernel-driven pass): `
    + `open=${passFacts[0].open} (open commit — the PASS's own scope, \`D-44\`) live=${passFacts[0].live} (open `
    + `attempt) ⇒ NOT AT REST ⇒ not judged at its instant; pair asked at ${JSON.stringify(passAsked)} — the `
    + `third ask is THE RESTART'S, taken by the pass's own commit scope (\`D-42\`'s consumer, moved there `
    + `2026-10-27); record = ${JSON.stringify(passRollback.value)}; the report's outcome is `
    + `${JSON.stringify(passRun.value.outcome)} and its last entry names `
    + `'${passRun.value.log[passRun.value.log.length - 1].id}'; store stands at `
    + `${JSON.stringify(passStanding)} — the reversal UNDONE, at the journal's head`);
  t.diagnostic(`DEF-W (3) · D-38 (2026-10-26) · ARM C (terminal reversal): open=${controlFacts[0].open} `
    + `(open commit) live=${controlFacts[0].live} (open attempt) ⇒ AT REST ⇒ JUDGED; status `
    + `${JSON.stringify(controlRollback.caught?.status)} with log ${JSON.stringify(controlLog)}; store stands `
    + `at ${JSON.stringify(controlStanding)} (the refusal undid the reversal it refused) — so arms A and B are `
    + `green because their windows are in flight, and not because the pair would have admitted the state`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// F · the `filePath` probe at 1.0.0 — the 0.1.x row never re-measured
//
// **THE CLAIM.** `storeCreate` with a `filePath` whose parent the process cannot write (`/usr/bin/…`,
// root-owned `0755`) must refuse AT CONSTRUCTION with `FilePathUnreachable`, and leave NO FILE BEHIND.
// **THE DECLARED ANSWER** is `docs/specs/storeroom-js/contract.md` §1.3's `FilePathArg` rows 4–6 — an absent
// parent, a directory, and an existing-but-not-writable path each answer `FilePathUnreachable` with NO INSTANCE
// RETURNED — read with `docs/specs/storeroom-js/surface.md` §2.8 (the two file-behaviour readings).
//
// **THE SKIP IS DECLARED AND LOUD.** The probe is only a measurement where `/usr/bin` is genuinely unwritable
// for this process: `D-21` requires a cell that did not run to say so, so the cell asks for uid `1000` AND a
// write test, and `t.skip` names which condition failed.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('F · a `filePath` whose parent the process cannot write is refused AT CONSTRUCTION with `FilePathUnreachable` and leaves no file behind', (t) => {
  const probe = '/usr/bin/psr012-probe.json';
  const parentIsUnwritable = (() => {
    try {
      const probeInParent = join('/usr/bin', `.psr-write-test-${process.pid}`);
      // The store's own instrument is an EXCLUSIVE CREATE (`create_new`), which is the question asked here: may
      // this process create a file in this parent at all?
      const fd = openSync(probeInParent, 'wx');
      closeSync(fd);
      rmSync(probeInParent, { force: true });
      return false;
    } catch {
      return true;
    }
  })();

  if (process.getuid === undefined || process.getuid() !== 1000) {
    t.skip(`the root-owned-\`0755\` probe is measured on uid 1000; this process is uid `
      + `${process.getuid === undefined ? 'unknown (not POSIX)' : process.getuid()}`);
    return;
  }
  if (parentIsUnwritable === false) {
    t.skip(`/usr/bin is WRITABLE for this process, so the parent the probe needs is not the parent it names; `
      + `no claim is measured`);
    return;
  }

  let scratch = null;
  try {
    // ── THE PROBE. ──────────────────────────────────────────────────────────────────────────
    const behindBefore = existsSync(probe);
    assert.equal(behindBefore, false,
      `the probe path must not exist before the drive, or "no file behind" measures nothing; `
        + `${JSON.stringify(probe)} already existed`);
    const driven = attempt(() => storeCreate({ journalLength: 8, listeners: [], filePath: probe }));
    assert.equal(driven.ok, false,
      `a \`filePath\` in a parent this process cannot write must be refused AT CONSTRUCTION `
        + `(\`docs/specs/storeroom-js/contract.md §1.3\`'s \`FilePathArg\` rows 4–6: no instance returned). THE `
        + `DRIVE OBSERVED an instance ${JSON.stringify(Object.keys(driven.value || {}))}`);
    assert.equal(driven.caught.status, 'FilePathUnreachable',
      `the refusal's status is \`FilePathUnreachable\`; the drive read `
        + `${JSON.stringify(driven.caught.status)} and message ${JSON.stringify(driven.caught.message)}`);
    assert.equal(existsSync(probe), false,
      `a refused construction must leave NO FILE BEHIND; the drive found ${JSON.stringify(probe)} behind ` +
      `the refused construction`);

    // ── THE THREE CONTROLS. ──────────────────────────────────────────────────────────────────
    scratch = mkdtempSync(join(tmpdir(), 'psr-downstream-file-'));
    const controls = [
      { label: 'an absent parent', filePath: join(scratch, 'absent-parent', 'x.json'), constructs: false },
      { label: 'a directory', filePath: scratch, constructs: false },
      { label: 'a writable parent and an absent file', filePath: join(scratch, 'ok.json'), constructs: true },
    ];
    for (const control of controls) {
      const existedBefore = existsSync(control.filePath);
      const answered = attempt(() => storeCreate({ journalLength: 8, listeners: [], filePath: control.filePath }));
      assert.equal(answered.ok, control.constructs,
        `${control.label} must ${control.constructs ? 'CONSTRUCT' : 'be REFUSED'} `
          + `(\`docs/specs/storeroom-js/contract.md §1.3\`'s \`FilePathArg\` rows 4–6); the drive `
          + `${answered.ok ? 'constructed an instance' : `caught ${JSON.stringify(answered.caught.status)}`}`);
      if (control.constructs === false) {
        assert.equal(answered.caught.status, 'FilePathUnreachable',
          `${control.label} must answer \`FilePathUnreachable\`; the drive read `
            + `${JSON.stringify(answered.caught.status)}`);
        // **"NO FILE BEHIND" IS A CLAIM ABOUT WHAT THE REFUSAL CREATED, NOT ABOUT PATHS THAT STOOD ALREADY** —
        // so the assertion is that the refusal left the path exactly as it found it (`false → false`, and a
        // directory that was a directory stays one).
        assert.equal(existsSync(control.filePath), existedBefore,
          `${control.label} must leave the path exactly as it found it (before the call it `
            + `${existedBefore ? 'stood' : 'did not stand'}); the drive found it `
            + `${existsSync(control.filePath) ? 'present' : 'absent'} afterwards: `
            + `${JSON.stringify(control.filePath)}`);
      } else {
        // THE HANDOFF'S OWN SUPERSEDED ASSERTION IS RECORDED, NOT ADOPTED: construction at a writable parent
        // CREATES the file (zero-length) — `storeCreate`'s probe is an exclusive create. The control asserts only
        // what the declaration requires (an instance), and prints what it found.
        assert.equal(existsSync(control.filePath), true,
          `the writable-parent control is expected to CREATE its file; the drive found none`);
        assert.equal(statSync(control.filePath).size, 0,
          `the file the construction creates is zero-length; the drive measured `
            + `${statSync(control.filePath).size}`);
      }
    }
  } finally {
    if (scratch !== null) rmSync(scratch, { recursive: true, force: true });
    rmSync(probe, { force: true });
  }
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// DEF-AB · ONE ADDRESS, ONE RENDERING — `strata/decisions.md` · `D-48`'s `DEF-AB` row
//
// **THE ROW, AS THE DOWNSTREAM FILED IT: *"one address printed two ways."*** **THE DEFECT CLASS `DEF-Q` WAS
// FILED UNDER, AT ANOTHER SITE** — and the `DEF-Q` cell above fixes one of its limbs (a message may not print
// `undefined` for a column its entry carries); this cell fixes the other.
//
// **THE MEASUREMENT, BEFORE THE FIX, TAKEN FROM ONE ATTEMPT'S OWN LOG.** The drive below makes a pair whose
// repair lands and whose re-run then refuses — the `KC-5` arm — so ONE log carries both sentences. On the tree
// before this pass those two sentences read:
//
//   [constraint-check]  the constraint x passed at ["a"]
//   [repair-run]        the repair x landed op-3
//   [constraint-check]  one is not admitted either
//   [outcome]           the pair a#x violated a re-run and its repair had already been applied
//
// **`["a"]` AND `a#x` ARE ONE ADDRESS, PRINTED TWO WAYS, IN ONE RECORD.** The kernel declares the rendering
// ONCE — `pairSpelling` (`bindings/js/src/entry/kernel-foundations.mjs`), whose own sentence spells the
// address's segments joined by `/` off `pair.addresses[0]` — and every other sentence in that file reached for
// `JSON.stringify(address)`, which is `["a"]`. **SO THE CELL ASSERTS THE DECLARED RENDERING AND NOT A FIGURE:**
// no log entry's message may spell an address as a JSON array, and where a message prints a pair token the
// token's `#id` half must agree with the entry's own `id` column.
//
// **`D-21`.** The cell prints every sentence it read, before and after, and it says so at its own diagnostic.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('DEF-AB · one address is rendered ONE way: no log entry message spells an address as a JSON array, and a pair token printed in a message agrees with its entry\'s own `id` column', (t) => {
  // ── THE DRIVE — a repair lands, the re-run refuses, and BOTH sentences stand in ONE log. ──────────────
  const store = storeCreate({ journalLength: 8, listeners: [] });
  store.write(['a'], 'mem', SEED);
  // A SECOND PAIR AT THE SAME ADDRESS THAT ALWAYS PASSES — so the log carries the *"passed at <address>"*
  // sentence beside the repeat arm's pair token. ONE address, TWO messages, and that is the row.
  store.addConstraint({ address: ['a'], id: 'y' }, (context) => (context.tier === null ? true : true));
  store.addConstraint({ address: ['a'], id: 'x' }, (context) => {
    if (context.tier === null) return true;
    if (context.value === SEED) return true;
    if (context.value === REFUSED) {
      return {
        message: 'nine is not admitted',
        repair: (repairContext) => ({
          ok: true,
          message: 'repaired',
          op: store.write(['a'], 'mem', REPAIRED, repairContext).op,
        }),
      };
    }
    // AN OUTSIDE VALUE ON THE RE-RUN'S OWN ASK — the `{message}` arm's sibling, whose sentence is the one
    // that prints the ADDRESS: `… outside the three declared outcome arms at a`.
    return undefined;
  });
  const refused = attempt(() => store.write(['a'], 'mem', REFUSED));
  assert.equal(refused.ok, false,
    `the drive must reach the refusal arm or there is nothing to read: the write answered `
      + `${JSON.stringify(refused.ok ? refused.value : refused.caught.status)}`);
  const log = Array.isArray(refused.caught.log) ? refused.caught.log : [];
  assert.ok(log.length > 0,
    `the refusal must carry a log, or the drive did not reach the pass: ${JSON.stringify(log)}`);

  // ── THE ONE DECLARED RENDERING, SPELLED HERE FROM THE DECLARATION AND NOT FROM THE IMPLEMENTATION. ────
  // `pairSpelling`: the address's segments joined by `/`, then `#`, then the id. On this drive the attempt's
  // address is the one-segment `['a']`, so the declared rendering of it is `a` and of the pair is `a#x`.
  const declaredAddress = 'a';
  const declaredToken = 'a#x';

  // ── THE CELL: EVERY MESSAGE, AT ITS OWN TWO FACTS. ───────────────────────────────────────────────────
  const printed = [];
  for (const entry of log) {
    const message = typeof entry.message === 'string' ? entry.message : '';
    printed.push(`[${entry.kind}] ${message}`);
    // (i) NO MESSAGE SPELLS AN ADDRESS AS A JSON ARRAY — the second rendering the row was filed against.
    assert.equal(/\["/.test(message), false,
      `no log entry's message may spell an address through \`JSON.stringify\`, which prints \`["a"]\`: the `
        + `kernel declares ONE rendering, the segments joined by \`/\` (\`DEF-AB\`). THE ENTRY READ `
        + `${JSON.stringify(entry)}`);
    assert.equal(message.includes('["a"]'), false,
      `and the drive's own address is the one that was double-spelled: ${JSON.stringify(message)}`);
    // (ii) MESSAGE/COLUMN AGREEMENT — a pair token the sentence prints must agree with the entry's `id`.
    const token = /(?:^|[^A-Za-z0-9_/])([A-Za-z0-9_/]+)#([A-Za-z0-9_-]+)/.exec(message);
    if (token !== null) {
      assert.equal(token[1], declaredAddress,
        `a pair token printed in a message spells the attempt's own address as the declared rendering: the `
          + `entry read ${JSON.stringify(token[1])} against ${JSON.stringify(declaredAddress)}`);
      // THE COLUMN AGREEMENT IS ASSERTED WHERE THE ENTRY CARRIES THE COLUMN (`constraint-check` and
      // `repair-run` carry the pair's bare `id`); the `outcome` and `commit` kinds declare `id` `null`
      // (`kernel-surface.md §2.5` item 1's kind table), so their sentences name the pair the log's own
      // `constraint-check` entry names — which is the second half of the same agreement.
      const named = log.map((one) => one.id).filter((id) => typeof id === 'string');
      if (typeof entry.id === 'string') {
        assert.equal(token[2], entry.id,
          `its \`#id\` half AGREES WITH THE ENTRY'S OWN \`id\` COLUMN — one entry, one pair, one id: the `
            + `message read ${JSON.stringify(token[2])} against the entry's id ${JSON.stringify(entry.id)}`);
      } else {
        assert.equal(named.includes(token[2]), true,
          `an entry whose \`id\` column is \`null\` by declaration (kind ${JSON.stringify(entry.kind)}) names `
            + `the pair its log's own \`constraint-check\` entry carries: the message read `
            + `${JSON.stringify(token[2])} against the log's ids ${JSON.stringify(named)}`);
      }
    }
    // (iii) THE ENTRY'S OWN COLUMNS ARE UNMOVED BY THE RENDERING.
    assert.deepEqual(Object.keys(entry).sort(), LOG_MEMBERS.slice().sort(),
      `the entry keeps the kernel's declared FIVE members, \`seq\` absent (\`D-65\`): ${JSON.stringify(Object.keys(entry))}`);
  }
  // (iv) THE RENDERING REALLY APPEARS, so this cell is not green on an empty sweep: the pair token the
  // declaration fixes is printed by the repeat arm's sentence, and the address is printed by a sibling's.
  const messages = log.map((entry) => (typeof entry.message === 'string' ? entry.message : ''));
  assert.equal(messages.some((one) => one.includes(declaredToken)), true,
    `the drive must print the declared pair token somewhere in the log, or the sweep proves nothing: `
      + `${JSON.stringify(messages)}`);
  assert.equal(messages.some((one) => one.includes(` at ${declaredAddress}`)), true,
    `and the drive must print the declared ADDRESS rendering in a sibling sentence — the two sentences the `
      + `row was filed against: ${JSON.stringify(messages)}`);

  t.diagnostic(`DEF-AB · D-48 (2026-10-28) · ONE ADDRESS, TWO RENDERINGS, RETIRED — the refusal's log, read `
    + `entry by entry: ${JSON.stringify(printed)}. BEFORE this pass the same drive printed `
    + `\`the constraint x passed at ["a"]\` beside \`the pair a#x violated a re-run …\`; AFTER it every message `
    + `spells the address the ONE declared way (\`${declaredAddress}\`) and the pair token (\`${declaredToken}\`) `
    + `agrees with its entry's own \`id\` column (${JSON.stringify(log.map((entry) => entry.id))})`);
});
