// tests/e2e/registration-own-members.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// GATE 3 — THE RED SET, THE DECLARED CONTROL AND THE CREDIT CONTROLS FOR `U-STOREROOM-REGISTRATION-OWN-MEMBERS`
// (`D-GP-SROM`), the unit the supervisor MINTED on `D-120`. Its contract directory is
// `docs/specs/storeroom-registration-own-members/`, and this file's statements are that directory's
// `verification.md §2` (`SROM-01`…`SROM-10`), written from `contract.md §2`'s **`PIN-3` — THE ARM TABLE** and
// from nothing else. The lawful form is `PIN-2`; the cell list is `PIN-7` (i)–(iii); the credit rule that this
// unit does NOT move is `PIN-4`.
//
// THE ENTRY IS REACHED BY PATH — `../../bindings/js/index.mjs`, this project's `O4` route (`D-6`) — and by
// nothing else: no kernel module is imported here, every reading is taken at a PUBLISHED member
// (`storeCreate` / `addConstraint` / `write` / `read` / `constraints`) or at the value a published call
// threw. Every cell prints its readings at its own `t.diagnostic`, and every red cell asserts its OWN DRIVE'S
// COHERENCE BEFORE its verdict.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE UNIT IN ONE SENTENCE, AND WHY FOUR OF THESE CELLS MUST BE RED TODAY
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// The registration instant reads a constraint's returned outcome through the PROTOTYPE CHAIN and credits a
// repair's returned `ok` through the PROTOTYPE CHAIN, while the write's own evaluation reads both by
// OWN-PROPERTY forms. The conversion of the two registration-instant reads to the own-member pair is this
// unit's whole subject, and `PIN-3`'s arm table states, arm by arm and instant by instant, what each arm
// answers BEFORE it and AFTER it. **`§2.1`'s four cells are the arms that TURN** — `PIN-3` (ii) at both
// registration routes and `PIN-3` (viii) at both registration routes — and they are written here to assert
// the AFTER column and to fail, today, on the BEFORE one.
//
// **AND THE ARM TABLE MARKS TWO MORE SHAPES AS TURNING THAT `§2.1`'s TABLE GAVE NO CELL.** `PIN-3` (iv) — own
// `message` with an INHERITED `repair` — and `PIN-3` (vi) — own `repair` as an own ACCESSOR answering a
// function — both read `YES` in the table's last column, and until this correction the red set drove neither.
// **`SROM-09` and `SROM-10`, at the end of this file, are their cells** (gate-4 finding `G4-9`): the same
// shape of drive, the same three readings, and the accessor's own invocation counter, which is the observable
// `PIN-3` (vi) turns on.
//
// THE BEFORE READINGS THESE CELLS WERE WRITTEN AGAINST are the intake's drives, quoted at
// `strata/research.md §15.3` at the same `HEAD` (`f3b35ea`, package `1.9.2`), and re-taken by this pass at
// THIS checkout's own bytes before a line of a cell was written (the drives' readings are printed in every
// cell's own `t.diagnostic`):
//
//   `K-1`  `addConstraint`, the inherited `message`/`repair` shape, its repair credited at `['b']`:
//          registration "stood" · the next write threw `ConstraintPassRefused` — *"the constraint p returned
//          a value outside the three declared outcome arms at a"* · `runs = 1`.
//   `K-2`  `storeCreate`'s batch, the same shape, the repair credited through the handed route at `['b']`:
//          construction "stood" · the first write threw the same status and sentence · `runs = 1` · the
//          pair `constraints()` names `[{address:[[a]], id:'p'}]`.
//   `K-4`  the second divergence — an INHERITED `ok` on the repair's return: registration "stood" · the
//          write threw `ConstraintPassRefused` — *"the repair p produced no op at a"*.
//
// SO `SROM-01`…`SROM-04` ARE RED TODAY FOR THE DIVERGENCE AND NOT FOR ANY OTHER REASON, and each one's first
// assertion carries the reading the drive actually took, so a failure names its own arm.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE THREE THINGS NO CELL IN THIS FILE MAY DO — `verification.md §2`'s closing sentence and `PIN-4` (iv)
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
//   1. NO CELL ASSERTS THAT THE TWO INSTANTS ANSWER THE SAME STATUS. `PIN-3`'s opening fixes the term: "the
//      two instants agree" means THEY ANSWER THE SAME MEMBERSHIP QUESTION, never the same status or the same
//      sentence — each instant has its own declared refusal form, and `PIN-3` (viii) answers a registration
//      refusal and a standing write-side answer for ONE shape. That asymmetry is `PIN-4`'s, not this file's.
//   2. NO CELL ASSERTS THAT THE TWO CREDIT RULES AGREE. The registration's credit stays OP-BASED — the
//      `{ok: true, op}` requirement at `bindings/js/src/entry/kernel-registration.mjs:677` (`PIN-4` (i)) — and
//      the write's credit is op-FREE since `D-105` (`PIN-4` (ii)). `docs/L1/op-free-repair-credit.md` `§8.3`'s
//      open `Q-1` is not this unit's (`PIN-4` (iii)).
//   3. NO CELL ASSERTS AN ARM THIS UNIT DOES NOT CONVERT. Arms (i), (iii), (v), (vii) and (ix) are
//      `UNCHANGED` at both instants and appear here only as the CONTROLS `§2.2`/`§2.3` declare.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// HOW THE DRIVES WERE TAKEN, AND THE THREE COHERENCE FACTS EVERY RED CELL ASSERTS FIRST
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **THE REGISTRATION INSTANT'S RE-RUN IS PART OF THE DRIVE AND NOT AN OBSTACLE TO IT.** After a credited
// repair the registration re-runs THE PAIR ITSELF against the op the repair landed
// (`bindings/js/src/entry/kernel-registration.mjs:729`-`:829`), and a non-`true` answer there refuses the
// registration for a reason that would be THE CELL'S OWN MAKING. So every body here returns the arm's shape
// for every evaluation EXCEPT the one the repair's own landing opens, which it passes by testing THE OP'S OWN
// ADDRESS — the same device the kept corpus's own reproduction uses
// (`docs/specs/storeroom-repair-arm-surface/contract.md` `§4` item 3). That is a property of the DRIVE, never
// of an expectation.
//
// **THE REPAIR'S WRITE TAKES A SUPPORTED ROUTE, AND THE ROUTE IS NAMED PER ARM.** At a registration the repair
// holds the SEVEN-member record whose seventh member is the lawful write route the sibling registration unit's
// `PIN-6` (ii) declares (`write`, three positions, naming the registration's own commit); at a write it holds
// the landing's six-member record and the commit is supplied at `write`'s FOURTH position (`D-103`'s supported
// route). A repair that runs at BOTH instants therefore takes the route the record hands it — `routeOf` below —
// and a repair that runs at the registration ALONE uses the handed route directly.
//
// **AND ONE PAIR OF CELLS READS THE CLOSE'S OWN ROLLBACK, SO IT SAYS WHAT IT READS FIRST** (`SROM-03`/
// `SROM-04`, `verification.md §2.1`'s caveat): the refusing close composes a rollback over EVERY OP THE ROUTE
// LANDED (`kernel-registration.mjs:888`-`:904`, the class's own docblock, with the composition at
// `bindings/js/src/entry/kernel-terminal.mjs:242`), and it is `registrationRoute`'s own `write` — not the bare
// store verb — that records an op in that list (`:519`-`:551`). **SO THE ARM-(viii) CELLS REACH THE LANDING
// THROUGH THE HANDED ROUTE AND ASSERT THE ROLLBACK OF A ROUTE LANDING, AND NO CELL HERE ASSERTS THE ROLLBACK
// OF A LANDING THE ROUTE DID NOT RECORD** — that reading is the close's, taken at its bytes, and it is printed
// in the cell's head rather than assumed.
//
// **AND THE BATCH ROUTE ANSWERS NO INSTANCE, SO `PIN-7` (i)'s PAIR-ROW AND LANDING LIMBS ARE UNREADABLE
// THERE** — stated here, once, so no cell asserts what it cannot read (gate-4 finding `G4-3`). A refused
// construction hands the caller the store's FORM instead of an instance, so there is no `constraints()` to ask
// whether the pair was carried and no store to read the repair's landing through — and `verification.md
// §2.1`'s caveat only ever licensed the landing as the CLOSE's reading at the HANDED route
// (`kernel-registration.mjs:888`-`:904`), which no refused construction hands back. **`SROM-02` and `SROM-04`
// therefore assert WHAT THE CONSTRUCTION ANSWERS — the exact rank-`19` status, the repair's invocation
// counter, and the `log` the refusal crosses with — and print the two unreadable limbs as readings
// (`"(no instance was returned)"`) rather than resting a verdict on them.** The pair row is asserted at the
// `addConstraint` route, where an instance IS returned (`SROM-01`, `SROM-09`, `SROM-10`), and so is the
// rollback (`SROM-03`). **A cell that read `readings.store === null` as "the pair was not carried" would be
// restating its own `construction.ok === false`; that assertion is gone and is NOT replaced by a second
// spelling of itself.**
//
// **`D-21`.** Every cell prints its readings, and a cell that cannot reach its arm says so at an assertion
// instead of reporting a verdict. **`D-17`.** No cell opens a document at runtime: every expectation is a
// literal written here and every clause is cited as a `path` + `§`/`PIN` in its own comment.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from "node:assert/strict";
import { test } from "node:test";

import { storeCreate } from "../../bindings/js/index.mjs";

/** A fresh `mem`-tier store per arm (`verification.md §2`: fresh store per arm, no `filePath`, no repository
 *  byte). */
const make = (extra = {}) => storeCreate({ journalLength: 256, listeners: [], ...extra });

/** The pair every arm registers: one address and one caller-chosen `id` (`D-24`). */
const ADDRESS = ["a"];
const PAIR_ID = "p";
/** The address the repairs land at — A DIFFERENT ADDRESS from the pair's, which is what keeps the repair's own
 *  landing observable while the pair's address stays in the state its body is judging. */
const LANDED_AT = ["b"];

/** Run `fn`; answer the thrown value as a value. Every call here is synchronous, so this is total — and it is
 *  used ONLY where a refusal is the SUBJECT of the cell. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The refusal a caller actually receives: this package's crossing answers `{status, message, log}` for a
 *  kernel refusal (`bindings/js/index.mjs`'s crossing; the store's own codes cross in their own form). */
function refusalOf(caught) {
  if (caught === null || typeof caught !== "object") {
    return { status: null, message: String(caught), log: null };
  }
  return {
    status: typeof caught.status === "string" ? caught.status : null,
    message: typeof caught.message === "string" ? caught.message : String(caught.message),
    log: Array.isArray(caught.log) ? caught.log : null,
  };
}

/** The `kind` of every entry the refusal carries, or `null` where it carries no list. The DISCRIMINATOR
 *  `PIN-7` (i) rests on is that `constraint-check` and `repair-run` are appended in STATE 3 ONLY
 *  (`kernel-registration.mjs:633`, `:635`, both inside `registrationAttempt`), so state 2's refusal carries
 *  neither and state 3's arm (d) carries both. */
function logKinds(refusal) {
  if (refusal.log === null) return null;
  return refusal.log.map((entry) => (entry !== null && typeof entry === "object"
    ? String(entry.kind)
    : String(entry)));
}

/** The addresses `constraints()` names, each read AS A SET (`bindings/js/index.d.ts`'s `ConstraintPair.address`
 *  is `Address | readonly Address[]`; the surface's encoding of a set of ONE is not printed by the declaration,
 *  so both spellings are read and the SET is what is asserted — the reading the sibling cells take too). */
function carriedAddresses(store) {
  return store.constraints().map((row) => {
    const members = Array.isArray(row.address) && Array.isArray(row.address[0]) ? row.address : [row.address];
    return members.map((member) => member.join("/")).sort();
  });
}

/** Whether `constraints()` carries the pair this file registers. */
function carriesThePair(store) {
  return store.constraints().some((row) => row.id === PAIR_ID
    && (Array.isArray(row.address) && Array.isArray(row.address[0])
      ? row.address.some((member) => member.join("/") === ADDRESS.join("/"))
      : row.address.join("/") === ADDRESS.join("/")));
}

/** **THE ONE DECISION THE DRIVES MAKE ABOUT A REPAIR'S RECORD, AND THE ONE THEY NEVER MAKE.** A repair that
 *  must run at BOTH instants takes the route the record hands it: `record.write` where the registration
 *  instant's seventh member stands (the sibling registration unit's `PIN-6` (ii)), and the store verb with the
 *  commit at its FOURTH position where the landing's six-member record stands (`D-103`'s supported route). A
 *  repair that runs at the registration alone calls `record.write` — the handed route — and nothing else. */
function routeOf(record, store) {
  if (record !== null && typeof record === "object" && typeof record.write === "function") {
    return {
      route: "the registration instant's handed route (`write`)",
      land: (tier, value) => record.write(LANDED_AT, tier, value),
    };
  }
  return {
    route: "the store verb with the commit at write's FOURTH position",
    land: (tier, value) => store.write(LANDED_AT, tier, value, record),
  };
}

/** **THE BODY EVERY TURNING ARM USES.** It answers its arm's own shape at every evaluation EXCEPT the one the
 *  repair's landing opens, where it passes by testing THE OP'S OWN ADDRESS — the registration instant's re-run
 *  (`kernel-registration.mjs:729`-`:829`) must pass, or the registration would refuse for a reason this file
 *  would have built. */
const bodyFor = (shape) => (context) => (context.op !== null
  && typeof context.op === "object"
  && Array.isArray(context.op.address)
  && context.op.address[0] === LANDED_AT[0]
  ? true
  : shape);

/** **THE INHERITED-`repair` SHAPE — `PIN-3` (ii) AND (iv).** `Object.create({ message, repair })`: BOTH members
 *  stand on the prototype and NEITHER is an own member. The repair records its own invocations and the route it
 *  was handed. */
function inheritedRepairShape(readings) {
  const proto = {
    message: "the constraint p refused (an INHERITED message)",
    repair: (repairContext) => {
      readings.runs += 1;
      const handed = routeOf(repairContext, readings.store);
      readings.route = handed.route;
      const landed = handed.land("mem", 7);
      return { ok: true, op: landed.op };
    },
  };
  return Object.create(proto);
}

/** **THE INHERITED-`ok` SHAPE — `PIN-3` (viii).** Own `message`, own `repair` (a function), and a repair whose
 *  return is `Object.assign(Object.create({ ok: true }), { op: <the op it landed> })`: the `ok` stands on the
 *  prototype and the `op` is an own member. */
function inheritedOkShape(readings) {
  return {
    message: "the constraint p refused (an OWN message)",
    repair: (repairContext) => {
      readings.runs += 1;
      const handed = routeOf(repairContext, readings.store);
      readings.route = handed.route;
      const landed = handed.land("mem", 11);
      return Object.assign(Object.create({ ok: true }), { op: landed.op });
    },
  };
}

/** The coherence `verification.md §2` requires of EVERY red cell's drive before its verdict: the shape carries
 *  its members where its arm says it does, and it does NOT carry them where its arm says it does not.
 *  `ownDescriptor` is the test's own reading of the shape's descriptors — the DRIVE's coherence, never a
 *  verdict about the tree. */
const ownDescriptor = (object, member) => Object.getOwnPropertyDescriptor(object, member);

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-01 — `addConstraint` × THE INHERITED-`repair` SHAPE (`PIN-3` (ii)). RED TODAY.
//   AFTER: the call THROWS `ConstraintRefusedAtRegistration`; the repair's invocation counter reads `0`;
//          `constraints()` does not name the pair; the refusal's `log` carries no `repair-run` entry.
//   TODAY (the BEFORE column of `PIN-3` (ii), and `K-1` at `strata/research.md §15.3`): the registration
//          STANDS and the repair runs ONCE.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("SROM-01 · addConstraint × an INHERITED message/repair (PIN-3 (ii)): the registration must THROW ConstraintRefusedAtRegistration, the repair must NOT run, the pair must NOT be carried and the log must carry no repair-run", (t) => {
  const store = make();
  const readings = { runs: 0, route: null, store };
  const shape = inheritedRepairShape(readings);

  // ── COHERENCE FIRST: the shape really is the inherited pair, and neither member is own. ────────────────
  assert.equal(ownDescriptor(shape, "message"), undefined,
    "**THE DRIVE'S COHERENCE — the shape's `message` MUST be inherited** (`PIN-3` (ii)'s shape column): "
      + `the drive found an OWN descriptor ${JSON.stringify(ownDescriptor(shape, "message"))}`);
  assert.equal(ownDescriptor(shape, "repair"), undefined,
    "and its `repair` MUST be inherited too, or the arm driven is `PIN-3` (iv) and not `PIN-3` (ii): "
      + `the drive found an OWN descriptor ${JSON.stringify(ownDescriptor(shape, "repair"))}`);
  assert.equal(typeof Object.getPrototypeOf(shape).repair, "function",
    "and the inherited `repair` MUST be a function, or no instant reads a repair off this shape at all: "
      + `the drive read ${typeof Object.getPrototypeOf(shape).repair}`);

  // ── THE DRIVE: the registration, then the next write at the pair's address. The write is taken BEFORE the
  //    verdict so its reading is in the failure message; it is a READING of the divergence and never an
  //    expectation of this cell (`verification.md §2.1` lists four AFTER facts, and the write is not one).
  const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(shape)));
  const runsAtRegistration = readings.runs;
  const landingAfterRegistration = attempt(() => store.read(LANDED_AT));
  const carriedAfterRegistration = carriesThePair(store);
  const nextWrite = attempt(() => store.write(ADDRESS, "mem", 1));

  const before = {
    registration: registration.ok === true
      ? "STOOD"
      : `threw ${refusalOf(registration.caught).status} with log ${JSON.stringify(logKinds(refusalOf(registration.caught)))}`,
    repairInvocations: runsAtRegistration,
    repairRoute: readings.route,
    pairCarried: carriedAfterRegistration,
    carriedAddresses: carriedAddresses(store),
    repairLanding: landingAfterRegistration.ok === true
      ? JSON.stringify(landingAfterRegistration.value)
      : refusalOf(landingAfterRegistration.caught).status,
    nextWriteAtThePairsAddress: nextWrite.ok === true
      ? "STOOD"
      : `${refusalOf(nextWrite.caught).status} — ${refusalOf(nextWrite.caught).message}`,
  };
  t.diagnostic(`SROM-01 BEFORE/AFTER reading, taken at this checkout: ${JSON.stringify(before)}`);

  // ── THE VERDICT — the AFTER column of `PIN-3` (ii), asserted in the order the divergence shows itself. ──
  assert.equal(registration.ok, false,
    "**SROM-01 — THE REGISTRATION MUST REFUSE (`PIN-3` (ii), the AFTER column: the registration now reads NO "
      + "repair and refuses `ConstraintRefusedAtRegistration`). It STOOD, which is the BEFORE reading `K-1` "
      + "records, so this cell is RED FOR THE DIVERGENCE AND NO OTHER REASON. The drive read: "
      + `${JSON.stringify(before)}**`);
  const refused = refusalOf(registration.caught);
  assert.equal(refused.status, "ConstraintRefusedAtRegistration",
    "**SROM-01 — THE STATUS IS THE STORE'S RANK-19 CODE AND NOTHING ELSE** (`PIN-7` (i): the EXACT refusal "
      + "status at the registration, rank 19; `PIN-10`): the drive caught " + `${JSON.stringify(refused)}`);
  assert.equal(runsAtRegistration, 0,
    "**SROM-01 — THE REPAIR MUST NOT RUN: an inherited `repair` is not a member the registration reads** "
      + "(`PIN-3` (ii); `PIN-7` (i): the repair's invocation counter is `0` where no repair should be read). "
      + `The drive counted ${runsAtRegistration} invocation(s)`);
  assert.equal(carriedAfterRegistration, false,
    "**SROM-01 — A REFUSED REGISTRATION CARRIES NO PAIR ROW** (`PIN-7` (i): the pair is NOT carried by "
      + "`constraints()` on a refused registration): the drive read "
      + `${JSON.stringify(carriedAddresses(store))}`);
  const kinds = logKinds(refused);
  assert.notEqual(kinds, null,
    "and the refusal carries a list for this reading to consult (`PIN-7` (i)): it read "
      + `${JSON.stringify(kinds)}`);
  assert.equal(kinds.includes("repair-run"), false,
    "**SROM-01 — THE REFUSAL IS STATE 2's AND NOT STATE 3's ARM (d): the `log` carries NO `repair-run` "
      + "entry** (`PIN-7` (i), the discriminator that keeps this red off the credit rule; `PIN-4` (iv)). It "
      + `read ${JSON.stringify(kinds)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-02 — `storeCreate`'s BATCH × THE SAME SHAPE (`PIN-3` (ii)). RED TODAY.
//   AFTER: the CONSTRUCTION throws rank `19` `ConstraintRefusedAtRegistration`, the repair's counter reads
//          `0`, and the refusal's `log` carries no `repair-run` entry.
//   TODAY (`K-2`): the construction STANDS, the pair row is carried and the repair has already run once.
//   **AND THE PAIR ROW AND THE LANDING ARE NOT READABLE THROUGH THIS ROUTE** (gate-4 finding `G4-3`, and the
//          file head above): a refused construction answers the store's FORM instead of an instance, so there
//          is no `constraints()` for a caller to ask and no store through which the repair's landing could be
//          read — and `verification.md §2.1`'s caveat licenses the landing as the CLOSE's reading at the
//          HANDED route only (`kernel-registration.mjs:888`-`:904`), which this route hands nothing back to
//          read. **So this cell asserts what the construction ANSWERS and nothing it cannot read**: the
//          status, the counter and the `log`. The pair row is asserted where an instance IS returned
//          (`SROM-01`, `SROM-09`, `SROM-10`) and the rollback where a store is (`SROM-03`). The two
//          unreadable limbs are printed in the diagnostic — `"(no instance was returned)"` — as readings.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("SROM-02 · storeCreate's batch × the INHERITED message/repair (PIN-3 (ii)): the CONSTRUCTION must THROW rank 19 ConstraintRefusedAtRegistration, the repair must NOT run, and the log must carry no repair-run — the pair row and the landing are NOT readable through this route", (t) => {
  const readings = { runs: 0, route: null, store: null };
  const shape = inheritedRepairShape(readings);

  // ── COHERENCE FIRST. ──────────────────────────────────────────────────────────────────────────────────
  assert.equal(ownDescriptor(shape, "message"), undefined,
    "**THE DRIVE'S COHERENCE — `message` MUST be inherited** (`PIN-3` (ii)): the drive found "
      + `${JSON.stringify(ownDescriptor(shape, "message"))}`);
  assert.equal(ownDescriptor(shape, "repair"), undefined,
    "and `repair` MUST be inherited too: the drive found "
      + `${JSON.stringify(ownDescriptor(shape, "repair"))}`);

  const construction = attempt(() => make({
    constraints: [{ address: ADDRESS, id: PAIR_ID, constraint: bodyFor(shape) }],
  }));
  readings.store = construction.ok === true ? construction.value : null;
  const runsAtConstruction = readings.runs;
  const built = readings.store;
  const landing = built === null ? null : attempt(() => built.read(LANDED_AT));
  const nextWrite = built === null ? null : attempt(() => built.write(ADDRESS, "mem", 1));

  const before = {
    construction: construction.ok === true
      ? "STOOD"
      : `threw ${refusalOf(construction.caught).status} with log ${JSON.stringify(logKinds(refusalOf(construction.caught)))}`,
    repairInvocations: runsAtConstruction,
    repairRoute: readings.route,
    carriedAddresses: built === null ? "(no instance was returned)" : carriedAddresses(built),
    repairLanding: landing === null
      ? "(no instance was returned)"
      : (landing.ok === true ? JSON.stringify(landing.value) : refusalOf(landing.caught).status),
    nextWriteAtThePairsAddress: nextWrite === null
      ? "(no instance was returned)"
      : (nextWrite.ok === true ? "STOOD" : refusalOf(nextWrite.caught).status),
  };
  t.diagnostic(`SROM-02 BEFORE/AFTER reading, taken at this checkout: ${JSON.stringify(before)}`);

  // ── THE VERDICT — the AFTER column, at the construction route (`PIN-7` (i)'s second limb), AND ONLY THE
  //    LIMBS THIS ROUTE CAN MEASURE (`G4-3`): what the construction crossed, the counter, and the `log`.
  assert.equal(construction.ok, false,
    "**SROM-02 — THE CONSTRUCTION MUST REFUSE (`PIN-3` (ii)'s AFTER column read at `storeCreate`'s batch; "
      + "`PIN-7` (i)'s second route). It STOOD, which is the BEFORE reading `K-2` records — the construction "
      + "stood, the pair row was carried and `runs = 1`. The drive read: " + `${JSON.stringify(before)}**`);
  const refused = refusalOf(construction.caught);
  assert.equal(refused.status, "ConstraintRefusedAtRegistration",
    "**SROM-02 — THE SAME RANK-19 CODE CROSSES FROM THE CONSTRUCTION** (`PIN-7` (i); `PIN-10`): the drive "
      + `caught ${JSON.stringify(refused)}`);
  assert.equal(runsAtConstruction, 0,
    "**SROM-02 — THE REPAIR MUST NOT RUN AT THE CONSTRUCTION EITHER** (`PIN-7` (i): a counter of `1` is the "
      + `failure): the drive counted ${runsAtConstruction} invocation(s)`);
  const kinds = logKinds(refused);
  assert.notEqual(kinds, null,
    "and the refusal carries a list for this reading to consult (`PIN-7` (i)): it read "
      + `${JSON.stringify(kinds)}`);
  assert.equal(kinds.includes("repair-run"), false,
    "**SROM-02 — NO `repair-run` ENTRY MAY CROSS** (`PIN-7` (i); `PIN-4` (iv)): the drive read "
      + `${JSON.stringify(kinds)}`);
  // ── AND THE TWO LIMBS THIS ROUTE CANNOT READ ARE *NOT ASSERTED HERE* — not even as `readings.store ===
  //    null`, which would only restate the `construction.ok === false` above. `SROM-02`'s own coherence: the
  //    drive found no instance (`built === null`) and therefore took its landing and next-write readings as
  //    `null`; those readings are in the diagnostic above, and the pair row is asserted where it is readable.
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-03 — `addConstraint` × THE INHERITED-`ok` SHAPE (`PIN-3` (viii)). RED TODAY.
//   AFTER: the call THROWS `ConstraintRefusedAtRegistration`; the repair's counter reads `1` (the arm MUST
//          have been reached); the refusal's `log` CARRIES a `repair-run` entry — so this is state 3's arm (d)
//          and NOT the no-repair arm — and the repair's landing does not stand afterwards.
//   TODAY (`K-4`): the registration STANDS — the inherited `ok` is CREDITED by the chain read at
//          `bindings/js/src/entry/kernel-registration.mjs:676`.
//   THE ROLLBACK READING, TAKEN AT ITS BYTES BEFORE IT IS ASSERTED (`verification.md §2.1`'s caveat, and the
//          file head above): the refusing close composes ONE rollback call per distinct address the ROUTE'S
//          LANDINGS touched (`kernel-registration.mjs:888`-`:904`), and only `registrationRoute`'s `write`
//          records an op in that list (`:519`-`:551`). So this cell reaches the landing through the handed
//          route, and asserts the rollback OF A ROUTE LANDING — never of a landing the route did not record.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("SROM-03 · addConstraint × an INHERITED ok on the repair's return (PIN-3 (viii)): the registration must THROW ConstraintRefusedAtRegistration after the repair has run ONCE, the log must carry repair-run (arm (d)) and the repair's landing must not stand", (t) => {
  const store = make();
  const readings = { runs: 0, route: null, store };
  const shape = inheritedOkShape(readings);

  // ── COHERENCE FIRST: own `message`, own `repair`; the `ok` this arm turns on is NOT own. ───────────────
  assert.notEqual(ownDescriptor(shape, "message"), undefined,
    "**THE DRIVE'S COHERENCE — this arm's `message` is an OWN member** (`PIN-3` (viii)'s shape column): the "
      + `drive found ${JSON.stringify(ownDescriptor(shape, "message"))}`);
  assert.equal(typeof ownDescriptor(shape, "repair").value, "function",
    "and its `repair` is an OWN function (`PIN-3` (viii)): the drive found "
      + `${JSON.stringify(ownDescriptor(shape, "repair"))}`);
  const probeReturn = Object.assign(Object.create({ ok: true }), { op: null });
  assert.equal(ownDescriptor(probeReturn, "ok"), undefined,
    "**AND THE RETURN'S `ok` STANDS ON THE PROTOTYPE — THIS IS THE ARM** (`PIN-3` (viii)): the drive built "
      + `${JSON.stringify(ownDescriptor(probeReturn, "ok"))}`);
  assert.notEqual(ownDescriptor(probeReturn, "op"), undefined,
    "while its `op` IS an own member, so the credit's membership ground has nothing else to blame (`PIN-4` "
      + `(i)): the drive built ${JSON.stringify(ownDescriptor(probeReturn, "op"))}`);

  const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(shape)));
  const runsAtRegistration = readings.runs;
  const landing = attempt(() => store.read(LANDED_AT));
  const carried = carriesThePair(store);

  const before = {
    registration: registration.ok === true
      ? "STOOD (the inherited `ok` was CREDITED)"
      : `threw ${refusalOf(registration.caught).status} with log ${JSON.stringify(logKinds(refusalOf(registration.caught)))}`,
    repairInvocations: runsAtRegistration,
    repairRoute: readings.route,
    pairCarried: carried,
    repairLandingStands: landing.ok === true
      ? `yes — ${JSON.stringify(landing.value)}`
      : `no — ${refusalOf(landing.caught).status}`,
  };
  t.diagnostic(`SROM-03 BEFORE/AFTER reading, taken at this checkout: ${JSON.stringify(before)}`);

  // ── THE VERDICT. ──────────────────────────────────────────────────────────────────────────────────────
  assert.equal(registration.ok, false,
    "**SROM-03 — THE REGISTRATION MUST REFUSE (`PIN-3` (viii), the AFTER column: registration reads no own "
      + "`ok` → no credit → arm (d) → `ConstraintRefusedAtRegistration`). It STOOD and CREDITED the inherited "
      + "`ok`, which is the BEFORE reading `K-4` records, so this cell is RED FOR THE DIVERGENCE AND NO OTHER "
      + `REASON. The drive read: ${JSON.stringify(before)}**`);
  const refused = refusalOf(registration.caught);
  assert.equal(refused.status, "ConstraintRefusedAtRegistration",
    "**SROM-03 — THE STATUS IS RANK 19** (`PIN-7` (i); `PIN-10`): the drive caught "
      + `${JSON.stringify(refused)}`);
  assert.equal(runsAtRegistration, 1,
    "**SROM-03 — THE REPAIR MUST HAVE RUN, EXACTLY ONCE** (`PIN-7` (i): a counter of `0` would mean the arm "
      + `was not reached; \`PIN-3\` (viii)): the drive counted ${runsAtRegistration} invocation(s)`);
  const kinds = logKinds(refused);
  assert.notEqual(kinds, null,
    "and the refusal carries a list (`PIN-7` (i)): it read " + `${JSON.stringify(kinds)}`);
  assert.equal(kinds.includes("repair-run"), true,
    "**SROM-03 — THE `log` MUST CARRY `repair-run`: THE ARM IS STATE 3's (d) AND NOT THE NO-REPAIR ARM** "
      + "(`PIN-7` (i): a log with no `repair-run` entry would make it the wrong arm): the drive read "
      + `${JSON.stringify(kinds)}`);
  const landingAfter = attempt(() => store.read(LANDED_AT));
  assert.equal(landingAfter.ok, false,
    "**SROM-03 — THE REPAIR'S LANDING MUST NOT STAND: the refusing close composes a rollback over every op "
      + "the ROUTE landed** (`kernel-registration.mjs:888`-`:904`, read at its bytes before this assertion; "
      + "`verification.md §2.1`'s caveat). The route this repair used is "
      + `${JSON.stringify(readings.route)}, and the reading after the refusal was `
      + `${landingAfter.ok === true ? JSON.stringify(landingAfter.value) : refusalOf(landingAfter.caught).status}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-04 — `storeCreate`'s BATCH × THE SAME INHERITED-`ok` SHAPE (`PIN-3` (viii)). RED TODAY.
//   AFTER: the CONSTRUCTION throws rank `19`, the counter reads `1` (the arm ran the repair and did not credit
//   it), and the `log` carries `repair-run` — arm (d) and not the no-repair arm.
//   TODAY (`K-4`'s own reading taken at `storeCreate`'s batch): the construction STANDS and the inherited `ok`
//   is credited.
//   **AND THE ROUTE LANDING IS NOT READABLE HERE** (gate-4 finding `G4-3`): the rollback of the repair's
//   landing is the CLOSE's own declared act — one rollback call per distinct address the route's landings
//   touched, at the HANDED route (`kernel-registration.mjs:888`-`:904`; `verification.md §2.1`'s caveat) — and
//   a refused construction answers the store's FORM instead of an instance, so this cell has no store to read
//   through. **`SROM-03` takes that reading where the store IS returned, and this cell asserts only what the
//   construction ANSWERS**: the status, the counter of `1`, and the `log`. The pair row and the landing stand
//   in the diagnostic as `"(no instance was returned)"`, which is a READING and not a verdict.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("SROM-04 · storeCreate's batch × the INHERITED ok (PIN-3 (viii)): the CONSTRUCTION must THROW rank 19 after the repair ran ONCE and its log must carry repair-run — the pair row and the route landing are NOT readable through this route", (t) => {
  const readings = { runs: 0, route: null, store: null };
  const shape = inheritedOkShape(readings);

  // ── COHERENCE FIRST. ──────────────────────────────────────────────────────────────────────────────────
  assert.notEqual(ownDescriptor(shape, "message"), undefined,
    "**THE DRIVE'S COHERENCE — own `message`** (`PIN-3` (viii)): the drive found "
      + `${JSON.stringify(ownDescriptor(shape, "message"))}`);
  assert.equal(typeof ownDescriptor(shape, "repair").value, "function",
    "and an own function `repair`: the drive found "
      + `${JSON.stringify(ownDescriptor(shape, "repair"))}`);
  assert.equal(ownDescriptor(Object.assign(Object.create({ ok: true }), { op: null }), "ok"), undefined,
    "**AND THE RETURN THIS ARM TURNS ON CARRIES ITS `ok` ON THE PROTOTYPE** (`PIN-3` (viii)): the drive built "
      + "an own `ok`, which is `SROM-06`'s shape and not this cell's");

  const construction = attempt(() => make({
    constraints: [{ address: ADDRESS, id: PAIR_ID, constraint: bodyFor(shape) }],
  }));
  readings.store = construction.ok === true ? construction.value : null;
  const runsAtConstruction = readings.runs;
  const built = readings.store;
  const landing = built === null ? null : attempt(() => built.read(LANDED_AT));

  const before = {
    construction: construction.ok === true
      ? "STOOD (the inherited `ok` was CREDITED)"
      : `threw ${refusalOf(construction.caught).status} with log ${JSON.stringify(logKinds(refusalOf(construction.caught)))}`,
    repairInvocations: runsAtConstruction,
    repairRoute: readings.route,
    carriedAddresses: built === null ? "(no instance was returned)" : carriedAddresses(built),
    repairLandingStands: landing === null
      ? "(no instance was returned)"
      : (landing.ok === true ? `yes — ${JSON.stringify(landing.value)}` : `no — ${refusalOf(landing.caught).status}`),
  };
  t.diagnostic(`SROM-04 BEFORE/AFTER reading, taken at this checkout: ${JSON.stringify(before)}`);

  // ── THE VERDICT. `PIN-7` (i)'s fourth limb, read as THE CONSTRUCTION'S OWN ANSWERS (`G4-3`): as `SROM-03`
  //    in status, counter and `log`, plus a construction that stands as the BEFORE reading. ────────────────
  assert.equal(construction.ok, false,
    "**SROM-04 — THE CONSTRUCTION MUST REFUSE (`PIN-3` (viii)'s AFTER column read at `storeCreate`'s batch; "
      + "`PIN-7` (i)'s fourth limb). It STOOD, which is the BEFORE reading `K-4` records taken at the batch "
      + `route, so this cell is RED FOR THE DIVERGENCE AND NO OTHER REASON. The drive read: ${JSON.stringify(before)}**`);
  const refused = refusalOf(construction.caught);
  assert.equal(refused.status, "ConstraintRefusedAtRegistration",
    "**SROM-04 — THE SAME RANK-19 CODE CROSSES FROM THE CONSTRUCTION** (`PIN-7` (i); `PIN-10`): the drive "
      + `caught ${JSON.stringify(refused)}`);
  assert.equal(runsAtConstruction, 1,
    "**SROM-04 — THE REPAIR MUST HAVE RUN ONCE: this arm refuses FOR WANT OF A CREDIT, NOT FOR WANT OF A "
      + `REPAIR** (\`PIN-7\` (i); \`PIN-3\` (viii)): the drive counted ${runsAtConstruction} invocation(s)`);
  const kinds = logKinds(refused);
  assert.notEqual(kinds, null,
    "and the refusal carries a list (`PIN-7` (i)): it read " + `${JSON.stringify(kinds)}`);
  assert.equal(kinds.includes("repair-run"), true,
    "**SROM-04 — THE `log` MUST CARRY `repair-run`, WHICH IS WHAT MAKES THIS ARM (d) AND NOT THE NO-REPAIR "
      + `ARM** (\`PIN-7\` (i)): the drive read ${JSON.stringify(kinds)}`);
  // ── AND THE TWO LIMBS THIS ROUTE CANNOT READ ARE *NOT ASSERTED HERE* (`G4-3`): the pair row would need a
  //    `constraints()` and the rollback would need a store, and a refused construction answers neither. The
  //    assertion that used to stand here (`readings.store === null`) restated `construction.ok === false` in a
  //    second spelling and is deliberately not replaced by a third: **`SROM-03` reads the rollback where the
  //    store IS returned, and `SROM-01`/`SROM-09`/`SROM-10` read the pair row at the `addConstraint` route.**
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-05 — THE DECLARED CONTROL, AND IT IS **NEVER A RED CELL** (`PIN-3` (iii); the gate-1 finding `G1-6`;
// `verification.md §2.2`). `Object.create({ message })` with NO repair anywhere: the registration refuses
// `ConstraintRefusedAtRegistration` with `log: []`, the pair is withdrawn, and a later write at the address
// stands. THE ARM IS INVARIANT — `PIN-3` (iii)'s BEFORE and AFTER columns are the same sentence — so this cell
// is GREEN TODAY AND GREEN AFTER, and its whole purpose is to be the shape a reader cannot mistake for a
// turning arm. The same shape is read at the SECOND registration route and AT A WRITE, each instant answering
// ITS OWN DECLARED FORM — and no clause here compares the two forms (`PIN-3`'s opening; `PIN-4` (iv)).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("SROM-05 · THE DECLARED CONTROL (never a red cell) · an INHERITED message ALONE (PIN-3 (iii)): the registration refuses rank 19 with log [], the pair is withdrawn, a later write at the address stands, and both further routes answer their own declared form", (t) => {
  const store = make();
  const shape = Object.create({ message: "the constraint p refused (an INHERITED message, and no repair anywhere)" });
  assert.equal(ownDescriptor(shape, "message"), undefined,
    "**THE DRIVE'S COHERENCE — `message` is inherited** (`PIN-3` (iii)'s shape): the drive found "
      + `${JSON.stringify(ownDescriptor(shape, "message"))}`);
  assert.equal("repair" in shape, false,
    "**AND THERE IS NO `repair` ANYWHERE ON THE SHAPE — THIS ARM IS `PIN-3` (iii) AND NOT (ii)** (`G1-6`): "
      + `the drive read \`"repair" in shape\` = ${JSON.stringify("repair" in shape)}`);

  const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(shape)));
  const refused = registration.ok === true ? null : refusalOf(registration.caught);
  const carriedAfter = carriesThePair(store);
  const laterWrite = attempt(() => store.write(ADDRESS, "mem", 1));

  // THE SAME SHAPE AT THE BATCH ROUTE — the same status, its own `log: []`.
  const batch = attempt(() => make({
    constraints: [{ address: ADDRESS, id: PAIR_ID, constraint: bodyFor(shape) }],
  }));
  const batchRefused = batch.ok === true ? null : refusalOf(batch.caught);

  // THE SAME SHAPE **AT A WRITE**: a second store whose pair passes at the registration and answers this
  // shape at a write. The write's membership reading is its own declared arm (`PIN-3` (iii)'s write column:
  // `ConstraintPassRefused`), and this cell asserts WHAT THE WRITE ANSWERED and never that the two instants
  // answer alike (`PIN-3`'s opening; `PIN-4` (iv)).
  const writeStore = make();
  let phase = "registration";
  const writeSideRegistration = attempt(() => writeStore.addConstraint({ address: ADDRESS, id: PAIR_ID },
    () => (phase === "registration" ? true : shape)));
  phase = "write";
  const writeSideAnswer = attempt(() => writeStore.write(ADDRESS, "mem", 2));

  const reading = {
    registration: registration.ok === true ? "STOOD (which would be a defect of the control)" : refused.status,
    registrationLogLength: refused === null || refused.log === null ? null : refused.log.length,
    pairCarriedAfterTheRefusal: carriedAfter,
    laterWriteAtTheAddress: laterWrite.ok === true ? "STOOD" : refusalOf(laterWrite.caught).status,
    batchRoute: batch.ok === true ? "STOOD (which would be a defect of the control)" : batchRefused.status,
    batchLogLength: batchRefused === null || batchRefused.log === null ? null : batchRefused.log.length,
    writeRoute: writeSideAnswer.ok === true ? "STOOD" : refusalOf(writeSideAnswer.caught).status,
    writeRouteSentence: writeSideAnswer.ok === true ? null : refusalOf(writeSideAnswer.caught).message,
  };
  t.diagnostic(`SROM-05 CONTROL reading, taken at this checkout: ${JSON.stringify(reading)}`);

  // ── THE VERDICT: the same three limbs, BEFORE and AFTER, because the arm is INVARIANT. ────────────────
  assert.equal(registration.ok, false,
    "**SROM-05 (CONTROL) — THE REGISTRATION REFUSES BEFORE THE FIX AND IDENTICALLY AFTER IT** (`PIN-3` (iii); "
      + "`G1-6`; `verification.md §2.2`): the drive read " + `${JSON.stringify(reading)}`);
  assert.equal(refused.status, "ConstraintRefusedAtRegistration",
    "**SROM-05 (CONTROL) — RANK 19, THE SAME CODE THE TURNING CELLS ASSERT, BECAUSE THE STATE IS STATE 2 IN "
      + `BOTH TREES** (\`PIN-3\` (iii)): the drive caught ${JSON.stringify(refused)}`);
  assert.equal(refused.log !== null && refused.log.length, 0,
    "**SROM-05 (CONTROL) — THE `log` IS EMPTY, WHICH IS THE WHOLE OF THE DISCRIMINATOR** "
      + "(`verification.md §2.2`: a non-empty log is the failure; `kernel-registration.mjs:633`/`:635` append "
      + `in state 3 only): the drive read ${JSON.stringify(refused.log)}`);
  assert.equal(carriedAfter, false,
    "**SROM-05 (CONTROL) — THE PAIR IS WITHDRAWN** (`PIN-7` (ii); `verification.md §2.2`): the drive read "
      + `${JSON.stringify(carriedAddresses(store))}`);
  assert.equal(laterWrite.ok, true,
    "**SROM-05 (CONTROL) — A LATER WRITE AT THE ADDRESS STANDS, because no pair was carried to ask** (`K-6`: "
      + "the write after the refusal stood): the drive read "
      + `${JSON.stringify(reading.laterWriteAtTheAddress)}`);
  // The second registration route, the same invariant.
  assert.equal(batch.ok, false,
    "**SROM-05 (CONTROL) — THE BATCH ROUTE REFUSES THE SAME SHAPE THE SAME WAY** (`PIN-3` (iii) is stated of "
      + "the registration instant and not of one route): the drive read "
      + `${JSON.stringify(reading.batchRoute)}`);
  assert.equal(batchRefused.status, "ConstraintRefusedAtRegistration",
    "and the status is the same rank-19 code: the drive caught " + `${JSON.stringify(batchRefused)}`);
  assert.equal(batchRefused.log !== null && batchRefused.log.length, 0,
    "and its `log` is empty too: the drive read " + `${JSON.stringify(batchRefused.log)}`);
  // The write instant, its own declared arm — asserted, never compared (`PIN-3`'s opening; `PIN-4` (iv)).
  assert.equal(writeSideRegistration.ok, true,
    "**SROM-05 (CONTROL) — the second store's pair must REGISTER for the write arm to be reachable at all** "
      + "(the drive's coherence): the registration read "
      + `${JSON.stringify(refusalOf(writeSideRegistration.caught))}`);
  assert.equal(writeSideAnswer.ok, false,
    "**SROM-05 (CONTROL) — AND AT A WRITE THE SAME SHAPE ANSWERS THE WRITE'S OWN DECLARED FORM: an inherited "
      + "`message` is no `message` there, so the kernel's `unrecognized` sentence is the arm** (`PIN-3` (iii)'s "
      + "write column reads `ConstraintPassRefused`; the write's read is already own-member). **THIS CELL "
      + "ASSERTS WHAT THE WRITE ANSWERED AND NEVER THAT THE TWO INSTANTS ANSWER ALIKE** (`PIN-3`'s opening). "
      + `The drive read ${JSON.stringify(reading.writeRoute)}`);
  assert.equal(refusalOf(writeSideAnswer.caught).status, "ConstraintPassRefused",
    "and its own rank-20 status, which is `PIN-10`'s non-mover: the drive caught "
      + `${JSON.stringify(refusalOf(writeSideAnswer.caught))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-06 — THE FIRST CREDIT CONTROL: OWN MEMBERS ON THE SUPPORTED FOURTH-POSITION ROUTE STAND AT BOTH
// INSTANTS (`K-5a`; `PIN-7` (iii); `PIN-3` (i), which does NOT turn). GREEN TODAY AND GREEN AFTER, and it
// exists so `SROM-01`…`SROM-04` cannot be read as a defect of the credit rule (`PIN-4` (iv)).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("SROM-06 · CREDIT CONTROL · own members on the SUPPORTED fourth-position route: the registration STANDS, the write STANDS, and the repair's counter reads 2 (K-5a; PIN-3 (i))", (t) => {
  const store = make();
  let runs = 0;
  let route = null;
  const shape = {
    message: "the constraint p refused (an OWN message)",
    repair: (repairContext) => {
      runs += 1;
      const handed = routeOf(repairContext, store);
      route = handed.route;
      const landed = handed.land("mem", 5);
      return { ok: true, op: landed.op };
    },
  };
  assert.notEqual(ownDescriptor(shape, "message"), undefined,
    "**THE DRIVE'S COHERENCE — own `message`** (`PIN-3` (i)): the drive found "
      + `${JSON.stringify(ownDescriptor(shape, "message"))}`);
  assert.equal(typeof ownDescriptor(shape, "repair").value, "function",
    "and own function `repair`: the drive found "
      + `${JSON.stringify(ownDescriptor(shape, "repair"))}`);

  const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(shape)));
  const runsAfterRegistration = runs;
  const write = attempt(() => store.write(ADDRESS, "mem", 1));
  const runsAfterWrite = runs;

  const reading = {
    registration: registration.ok === true
      ? "STOOD"
      : `${refusalOf(registration.caught).status} — ${refusalOf(registration.caught).message}`,
    repairInvocationsAfterRegistration: runsAfterRegistration,
    write: write.ok === true
      ? "STOOD"
      : `${refusalOf(write.caught).status} — ${refusalOf(write.caught).message}`,
    repairInvocationsAfterWrite: runsAfterWrite,
    repairRouteAtTheWrite: route,
    pairCarried: carriesThePair(store),
  };
  t.diagnostic(`SROM-06 CREDIT CONTROL reading, taken at this checkout: ${JSON.stringify(reading)}`);

  assert.equal(registration.ok, true,
    "**SROM-06 — THE REGISTRATION MUST STAND: every member is OWN and the repair names the commit at the "
      + "SUPPORTED position** (`PIN-3` (i), the UNCHANGED arm; `K-5a`: registration stood). A refusal here "
      + "means the conversion broke the arm it must not touch (`PIN-7` (iii)): the drive read "
      + `${JSON.stringify(reading)}`);
  assert.equal(runsAfterRegistration, 1,
    "and the repair ran once at the registration: the drive counted " + `${runsAfterRegistration}`);
  assert.equal(write.ok, true,
    "**SROM-06 — AND THE WRITE MUST STAND** (`K-5a`: write stood; `D-103`'s supported route): the drive read "
      + `${JSON.stringify(reading.write)}`);
  assert.equal(runsAfterWrite, 2,
    "**SROM-06 — THE COUNTER READS 2, ONE INVOCATION AT EACH INSTANT** (`PIN-7` (iii)): the drive counted "
      + `${runsAfterWrite}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-07 — THE SECOND CREDIT CONTROL: THE REPORT'S OWN SNIPPET REFUSES FOR A DIFFERENT REASON (`K-3`; the
// state-2/state-3 discriminator). Own members, and a repair that returns the STORE'S `WriteRecord` — no `ok`
// at all. The registration refuses rank 19 with a `log` of length 2 carrying `constraint-check` AND
// `repair-run` — state 3's arm (d), **the shape `SROM-01`…`SROM-04` must NOT answer**. GREEN TODAY.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("SROM-07 · CREDIT CONTROL · the report's own snippet: own members and a repair returning the store's WriteRecord — the registration refuses rank 19 with a log of length 2 carrying constraint-check and repair-run (K-3)", (t) => {
  const store = make();
  let runs = 0;
  const shape = {
    message: "the constraint p refused (an OWN message)",
    repair: (repairContext) => {
      runs += 1;
      // THE STORE'S OWN `WriteRecord` — `{op, watched, triggered}` — and NOT `{ok: true, op}`: the report's
      // own snippet, and the reason it never reaches the divergence (`strata/research.md §15.2` `C-5`).
      const handed = routeOf(repairContext, store);
      return handed.land("mem", 3);
    },
  };
  const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(shape)));
  const refused = registration.ok === true ? null : refusalOf(registration.caught);
  const kinds = refused === null ? null : logKinds(refused);
  const reading = {
    registration: registration.ok === true ? "STOOD (which would collapse the two discriminators)" : refused.status,
    logLength: refused === null || refused.log === null ? null : refused.log.length,
    logKinds: kinds,
    repairInvocations: runs,
    pairCarried: carriesThePair(store),
  };
  t.diagnostic(`SROM-07 CREDIT CONTROL reading, taken at this checkout: ${JSON.stringify(reading)}`);

  assert.equal(registration.ok, false,
    "**SROM-07 — THE REGISTRATION REFUSES, AND NOT BECAUSE OF THE MEMBERSHIP READ: the snippet's repair "
      + "returns the store's own record, which carries no `ok`** (`K-3`; `PIN-4` (i)'s credit rule). It STOOD: "
      + `${JSON.stringify(reading)}`);
  assert.equal(refused.status, "ConstraintRefusedAtRegistration",
    "**SROM-07 — RANK 19** (`PIN-7` (iii)): the drive caught " + `${JSON.stringify(refused)}`);
  assert.equal(runs, 1,
    "and the repair RAN, which is what puts this refusal in state 3 and not state 2: the drive counted "
      + `${runs}`);
  assert.equal(refused.log !== null && refused.log.length, 2,
    "**SROM-07 — THE `log` HAS LENGTH 2** (`verification.md §2.3`: a log of `[]` here would collapse the two "
      + `discriminators): the drive read ${JSON.stringify(refused.log)}`);
  assert.deepEqual(kinds, ["constraint-check", "repair-run"],
    "**SROM-07 — AND ITS TWO ENTRIES ARE `constraint-check` AND `repair-run`** "
      + "(`kernel-registration.mjs:633`/`:635`): the drive read " + `${JSON.stringify(kinds)}`);
  assert.equal(carriesThePair(store), false,
    "and the pair is withdrawn: the drive read " + `${JSON.stringify(carriedAddresses(store))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-08 — THE THIRD CREDIT CONTROL: THE WRITE'S OWN REFUSAL IS NOT THE REGISTRATION'S (`K-5`; `PIN-7`
// (iii)). Own members, and the repair's write on the THREE-POSITION spelling — `D-103`'s UNSUPPORTED route,
// which opens a commit of its own and lands no leg of this attempt. The registration STANDS; the WRITE refuses
// `ConstraintPassRefused` with the credit's own sentence (`kernel-attempt.mjs:1057`-`:1060`); the counter reads
// 2. GREEN TODAY, and it is what keeps `SROM-01`'s write-side reading from being attributed to a route.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("SROM-08 · CREDIT CONTROL · own members with the repair's write on the THREE-position spelling: the registration STANDS, the WRITE refuses ConstraintPassRefused with the credit's sentence, and the counter reads 2 (K-5)", (t) => {
  const store = make();
  let runs = 0;
  const shape = {
    message: "the constraint p refused (an OWN message)",
    repair: () => {
      runs += 1;
      // THE THREE-POSITION SPELLING, ON PURPOSE: no commit at the fourth position, so the write opens a commit
      // of its own and the repair lands no leg of this attempt (`D-103`'s unsupported route).
      const landed = store.write(LANDED_AT, "mem", 3);
      return { ok: true, op: landed.op };
    },
  };
  const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(shape)));
  const runsAfterRegistration = runs;
  const write = attempt(() => store.write(ADDRESS, "mem", 1));
  const writeRefusal = write.ok === true ? null : refusalOf(write.caught);
  const reading = {
    registration: registration.ok === true
      ? "STOOD"
      : `${refusalOf(registration.caught).status} — ${refusalOf(registration.caught).message}`,
    repairInvocationsAfterRegistration: runsAfterRegistration,
    write: write.ok === true
      ? "STOOD (which would be the unsupported route passing)"
      : `${writeRefusal.status} — ${writeRefusal.message}`,
    repairInvocationsAfterWrite: runs,
  };
  t.diagnostic(`SROM-08 CREDIT CONTROL reading, taken at this checkout: ${JSON.stringify(reading)}`);

  assert.equal(registration.ok, true,
    "**SROM-08 — THE REGISTRATION MUST STAND: this cell asserts the WRITE's own refusal and must not be "
      + "confused with the registration's** (`K-5`: registration stood; `PIN-7` (iii)): the drive read "
      + `${JSON.stringify(reading.registration)}`);
  assert.equal(write.ok, false,
    "**SROM-08 — THE WRITE REFUSES** (`K-5`; `D-103`): the drive read " + `${JSON.stringify(reading.write)}`);
  assert.equal(writeRefusal.status, "ConstraintPassRefused",
    "**SROM-08 — RANK 20, `ConstraintPassRefused`, AND NOT THE REGISTRATION'S RANK 19** (`PIN-10`): the drive "
      + `caught ${JSON.stringify(writeRefusal)}`);
  assert.equal(writeRefusal.message.includes("produced no op"), true,
    "**SROM-08 — AND IT CARRIES THE CREDIT'S OWN SENTENCE** (`kernel-attempt.mjs:1057`-`:1060`: the repair `<id>` "
      + "produced no op at `<address>`; `K-5`): the drive read "
      + `${JSON.stringify(writeRefusal.message)}`);
  assert.equal(runs, 2,
    "**SROM-08 — THE COUNTER READS 2: the repair ran at the registration and again at the write** (`K-5`: "
      + `\`runs = 2\`): the drive counted ${runs}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-09 — `addConstraint` × OWN `message` WITH THE REPAIR INHERITED (`PIN-3` (iv)). RED TODAY.
//   THIS IS THE ARM TABLE'S SECOND TURNING SHAPE, and `verification.md §2.1`'s table carried no cell for it
//   until the gate-4 correction (`G4-9`): `PIN-3` (iv) reads `YES` in the table's last column — "the second
//   turning shape" — and the red set drove only (ii) and (viii).
//   AFTER: the call THROWS `ConstraintRefusedAtRegistration` — an own `message` with NO own `repair` is the
//          same state 2 the tree already declares for a violation carrying no repair (`kernel-registration.mjs
//          :403`-`:405`, `PIN-2` (i)) — the inherited repair's counter reads `0`, `constraints()` names no pair,
//          and the `log` carries no `repair-run` entry.
//   TODAY (the BEFORE column of `PIN-3` (iv)): the registration reads the INHERITED repair, registers it and
//          RUNS it once — the shape differs from `SROM-01`'s in ONE member, the `message`'s placement, and that
//          is what makes this a second arm and not a second spelling of the first.
//   AND THE WRITE'S OWN ANSWER IS NOT THIS CELL'S `G4-3`-SCOPED SUBJECT: `PIN-3` (iv)'s write column is
//          UNCHANGED by this unit and carries the caller's OWN `message` as its crossed text; no assertion here
//          compares the two instants' statuses (`PIN-3`'s opening; `PIN-4` (iv)).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE OWN-`message`/INHERITED-`repair` SHAPE — `PIN-3` (iv).** The `message` is an OWN data member and the
 *  `repair` stands ONLY on the prototype: exactly `SROM-01`'s shape with the `message` moved off the prototype,
 *  which is the one member that makes this the table's (iv) and not its (ii). The repair records its own
 *  invocations and the route it was handed. */
function ownMessageInheritedRepairShape(readings) {
  const proto = {
    repair: (repairContext) => {
      readings.runs += 1;
      const handed = routeOf(repairContext, readings.store);
      readings.route = handed.route;
      const landed = handed.land("mem", 13);
      return { ok: true, op: landed.op };
    },
  };
  return Object.assign(Object.create(proto), {
    message: "the constraint p refused (an OWN message, its repair INHERITED)",
  });
}

test("SROM-09 · addConstraint × an OWN message with the repair INHERITED (PIN-3 (iv)): the registration must THROW ConstraintRefusedAtRegistration, the inherited repair must NOT run, the pair must NOT be carried and the log must carry no repair-run", (t) => {
  const store = make();
  const readings = { runs: 0, route: null, store };
  const shape = ownMessageInheritedRepairShape(readings);

  // ── COHERENCE FIRST: own `message`, an INHERITED `repair`, and the prototype's member is a function. ─────
  assert.notEqual(ownDescriptor(shape, "message"), undefined,
    "**THE DRIVE'S COHERENCE — this arm's `message` is an OWN data member** (`PIN-3` (iv)'s shape column): the "
      + `drive found ${JSON.stringify(ownDescriptor(shape, "message"))}`);
  assert.equal(ownDescriptor(shape, "repair"), undefined,
    "**AND ITS `repair` IS INHERITED — `'repair' in shape` IS TRUE AND `Object.hasOwn` IS FALSE, WHICH IS THE "
      + `ARM** (\`PIN-3\` (iv)): the drive found ${JSON.stringify(ownDescriptor(shape, "repair"))}`);
  assert.equal(typeof Object.getPrototypeOf(shape).repair, "function",
    "and the inherited `repair` MUST be a function, or no instant reads a repair off this shape at all: the "
      + `drive read ${typeof Object.getPrototypeOf(shape).repair}`);

  const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(shape)));
  const runsAtRegistration = readings.runs;
  const carriedAfterRegistration = carriesThePair(store);
  const nextWrite = attempt(() => store.write(ADDRESS, "mem", 1));

  const before = {
    registration: registration.ok === true
      ? "STOOD"
      : `threw ${refusalOf(registration.caught).status} with log ${JSON.stringify(logKinds(refusalOf(registration.caught)))}`,
    repairInvocations: runsAtRegistration,
    repairRoute: readings.route,
    pairCarried: carriedAfterRegistration,
    carriedAddresses: carriedAddresses(store),
    nextWriteAtThePairsAddress: nextWrite.ok === true
      ? "STOOD"
      : `${refusalOf(nextWrite.caught).status} — ${refusalOf(nextWrite.caught).message}`,
  };
  t.diagnostic(`SROM-09 BEFORE/AFTER reading, taken at this checkout: ${JSON.stringify(before)}`);

  // ── THE VERDICT — `PIN-3` (iv)'s AFTER column. ───────────────────────────────────────────────────────────
  assert.equal(registration.ok, false,
    "**SROM-09 — THE REGISTRATION MUST REFUSE (`PIN-3` (iv), the AFTER column: an own `message` with no own "
      + "`repair` is state 2 — the same arm the tree already declares for a violation carrying no repair). It "
      + "STOOD and RAN the inherited repair, which is the BEFORE reading the table's (iv) row records, so this "
      + `cell is RED FOR THE DIVERGENCE AND NO OTHER REASON. The drive read: ${JSON.stringify(before)}**`);
  const refused = refusalOf(registration.caught);
  assert.equal(refused.status, "ConstraintRefusedAtRegistration",
    "**SROM-09 — THE STATUS IS THE STORE'S RANK-19 CODE AND NOTHING ELSE** (`PIN-7` (i); `PIN-10`): the drive "
      + `caught ${JSON.stringify(refused)}`);
  assert.equal(runsAtRegistration, 0,
    "**SROM-09 — THE INHERITED REPAIR MUST NOT RUN: it is not a member the registration reads** (`PIN-3` (iv); "
      + "`PIN-7` (i): a counter of `1` here is the failure, and a counter of `2` would mean the arm was reached "
      + `twice): the drive counted ${runsAtRegistration} invocation(s)`);
  assert.equal(carriedAfterRegistration, false,
    "**SROM-09 — A REFUSED REGISTRATION CARRIES NO PAIR ROW** (`PIN-7` (i), read at a route that RETURNS an "
      + `instance): the drive read ${JSON.stringify(carriedAddresses(store))}`);
  const kinds = logKinds(refused);
  assert.notEqual(kinds, null,
    "and the refusal carries a list for this reading to consult (`PIN-7` (i)): it read "
      + `${JSON.stringify(kinds)}`);
  assert.equal(kinds.includes("repair-run"), false,
    "**SROM-09 — THE REFUSAL IS STATE 2's AND NOT STATE 3's ARM (d): the `log` carries NO `repair-run` ENTRY** "
      + "(`PIN-7` (i); `PIN-4` (iv)): it read " + `${JSON.stringify(kinds)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// SROM-10 — `addConstraint` × OWN `repair` AS AN OWN ACCESSOR (`PIN-3` (vi)). RED TODAY.
//   THE ARM TABLE'S THIRD TURNING SHAPE, and the one the gate-1 finding `G1-5` exists for: an own accessor is a
//   MEMBERSHIP-PRESENT member whose own-property VALUE is `undefined` — a descriptor read answers `undefined`
//   and runs no caller code, while the converted-away read (`'repair' in outcome` then `outcome.repair`, at
//   `bindings/js/src/entry/kernel-registration.mjs:399`-`:402`) runs the getter TWICE and then runs the repair
//   it answers. `verification.md §2.1`'s table carried no cell for it until the gate-4 correction (`G4-9`).
//   AFTER: the call THROWS `ConstraintRefusedAtRegistration`, the GETTER'S OWN INVOCATION COUNTER READS `0` at
//          the registration, the repair it would have answered is never run (`0`), and no pair is carried.
//   TODAY (the BEFORE column of `PIN-3` (vi)): the registration runs the getter twice — `:400`'s `typeof` and
//          `:401`'s selection — and runs the repair it answers.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE OWN-`repair`-AS-ACCESSOR SHAPE — `PIN-3` (vi).** Own data `message`, and `repair` an own GETTER
 *  answering a function. The getter counts its own runs, which is the observable this arm turns on, and the
 *  function it answers counts its invocations separately. */
function accessorRepairShape(readings) {
  const shape = { message: "the constraint p refused (an OWN message, its repair an own ACCESSOR)" };
  const answered = (repairContext) => {
    readings.runs += 1;
    const handed = routeOf(repairContext, readings.store);
    readings.route = handed.route;
    const landed = handed.land("mem", 17);
    return { ok: true, op: landed.op };
  };
  Object.defineProperty(shape, "repair", {
    enumerable: true,
    configurable: true,
    get() {
      readings.getterRuns += 1;
      return answered;
    },
  });
  return shape;
}

test("SROM-10 · addConstraint × an OWN repair as an own ACCESSOR answering a function (PIN-3 (vi)): the registration must THROW ConstraintRefusedAtRegistration, the getter's own counter must read 0, the repair must NOT run and no pair may be carried", (t) => {
  const store = make();
  const readings = { runs: 0, getterRuns: 0, route: null, store };
  const shape = accessorRepairShape(readings);

  // ── COHERENCE FIRST: `message` own data, `repair` an own ACCESSOR, and the accessor ANSWERS a function. The
  //    probe is a SECOND instance with its own counters, so the drive's getter counter stays untouched.
  assert.notEqual(ownDescriptor(shape, "message"), undefined,
    "**THE DRIVE'S COHERENCE — own data `message`** (`PIN-3` (vi)): the drive found "
      + `${JSON.stringify(ownDescriptor(shape, "message"))}`);
  const descriptor = ownDescriptor(shape, "repair");
  assert.notEqual(descriptor, undefined,
    "**AND `repair` IS AN OWN MEMBER — that is the whole of `PIN-3` (vi): membership-PRESENT, value ACCESSOR** "
      + `(\`PIN-2\` (i)'s own-member pair reads an accessor's value as \`undefined\`): the drive found ${JSON.stringify(descriptor)}`);
  assert.equal(descriptor.value, undefined,
    "and it carries NO `value` member, so `ownMember` answers `undefined` for it: the drive found "
      + `${JSON.stringify(descriptor.value)}`);
  assert.equal(typeof descriptor.get, "function",
    "and its `get` is a function, which is what a chain read would RUN: the drive found "
      + `${typeof descriptor.get}`);
  const probeReadings = { runs: 0, getterRuns: 0, route: null, store };
  const probe = accessorRepairShape(probeReadings);
  const answeredByTheAccessor = ownDescriptor(probe, "repair").get();
  assert.equal(typeof answeredByTheAccessor, "function",
    "**AND THE ACCESSOR ANSWERS A FUNCTION** — read ONCE, on a SECOND instance, so the drive's own counter is "
      + "not spent by the coherence check: the drive read " + `${typeof answeredByTheAccessor}`);
  assert.equal(probeReadings.getterRuns, 1,
    "and that probe ran the getter exactly once, which is what makes the counter an observable: the probe "
      + `counted ${probeReadings.getterRuns}`);
  assert.equal(readings.getterRuns, 0,
    "while the DRIVE's own counter is still `0` before the registration is attempted: it read "
      + `${readings.getterRuns}`);

  const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(shape)));
  const getterRunsAtRegistration = readings.getterRuns;
  const runsAtRegistration = readings.runs;
  const carriedAfterRegistration = carriesThePair(store);

  const before = {
    registration: registration.ok === true
      ? "STOOD"
      : `threw ${refusalOf(registration.caught).status} with log ${JSON.stringify(logKinds(refusalOf(registration.caught)))}`,
    getterRunsAtTheRegistration: getterRunsAtRegistration,
    repairInvocations: runsAtRegistration,
    repairRoute: readings.route,
    pairCarried: carriedAfterRegistration,
    carriedAddresses: carriedAddresses(store),
  };
  t.diagnostic(`SROM-10 BEFORE/AFTER reading, taken at this checkout: ${JSON.stringify(before)}`);

  // ── THE VERDICT — `PIN-3` (vi)'s AFTER column, the getter's counter FIRST because it is the arm. ────────
  assert.equal(getterRunsAtRegistration, 0,
    "**SROM-10 — THE REGISTRATION MUST RUN NO GETTER: an own accessor is a membership-present member whose "
      + "own-property VALUE is `undefined`, so the registration reads NO repair without executing caller code** "
      + "(`PIN-3` (vi); `PIN-2` (i); the gate-1 finding `G1-5`). The drive counted "
      + `${getterRunsAtRegistration} getter run(s) — TWO would be \`:400\`'s \`typeof\` and \`:401\`'s selection, `
      + `which is the BEFORE column. The drive read: ${JSON.stringify(before)}**`);
  assert.equal(registration.ok, false,
    "**SROM-10 — THE REGISTRATION MUST REFUSE (`PIN-3` (vi), the AFTER column: no getter, no repair → "
      + "`ConstraintRefusedAtRegistration`). It STOOD, so this cell is RED FOR THE DIVERGENCE AND NO OTHER "
      + `REASON. The drive read: ${JSON.stringify(before)}**`);
  const refused = refusalOf(registration.caught);
  assert.equal(refused.status, "ConstraintRefusedAtRegistration",
    "**SROM-10 — THE STATUS IS RANK 19** (`PIN-7` (i); `PIN-10`): the drive caught "
      + `${JSON.stringify(refused)}`);
  assert.equal(runsAtRegistration, 0,
    "**SROM-10 — AND THE REPAIR THE ACCESSOR WOULD HAVE ANSWERED IS NEVER RUN** (`PIN-3` (vi): the arm reads "
      + "NO repair, so nothing it answers is invoked — a counter of `1` is the BEFORE column's repair and a "
      + `counter of \`2\` would mean the getter answered twice): the drive counted ${runsAtRegistration} invocation(s)`);
  assert.equal(carriedAfterRegistration, false,
    "**SROM-10 — A REFUSED REGISTRATION CARRIES NO PAIR ROW** (`PIN-7` (i), read at a route that RETURNS an "
      + `instance): the drive read ${JSON.stringify(carriedAddresses(store))}`);
  const kinds = logKinds(refused);
  assert.notEqual(kinds, null,
    "and the refusal carries a list for this reading to consult (`PIN-7` (i)): it read "
      + `${JSON.stringify(kinds)}`);
  assert.equal(kinds.includes("repair-run"), false,
    "**SROM-10 — THE REFUSAL IS STATE 2's: the shape carries an OWN `message`, so the gate passes and the "
      + "refusal is the no-repair arm — the `log` carries NO `repair-run` entry, which is what tells this arm "
      + "from state 3's (d)** (`PIN-7` (i); `PIN-4` (iv)): it read " + `${JSON.stringify(kinds)}`);
});
