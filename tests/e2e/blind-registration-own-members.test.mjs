// tests/e2e/blind-registration-own-members.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE BLIND INSTANCE — `SROM-B1` — FOR `U-STOREROOM-REGISTRATION-OWN-MEMBERS` (`D-GP-SROM`, minted on `D-120`).
//
// **THIS FILE IS THE ONE BLIND CELL THE UNIT OWES** (`contract.md §3`'s gate-5 line: *"`OWED`, AND THE BATTERY
// CAN TURN"*; `PIN-7` (iv); `verification.md §2.4`), and it is written BEFORE the fix, against the arms as they
// stand. Its contract home is `docs/specs/storeroom-registration-own-members/`.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE STATEMENT THIS CELL IS — ONE SENTENCE, AND IT IS THE CONTRACT'S, NOT A TRANSCRIPT OF A LINE
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **ONE RETURNED SHAPE ANSWERS THE SAME MEMBERSHIP QUESTION AT EVERY INSTANT THAT READS IT.** *What the
// registration decides the shape CARRIES is what the write's own evaluation READS of that shape* — so NO SHAPE
// MAY REGISTER A REPAIR THAT THE WRITE THEN REFUSES TO READ, and AN INHERITED MEMBER IS A MEMBER NEITHER
// INSTANT READS (`PIN-3`'s opening term, which defines "the two instants agree" as the MEMBERSHIP QUESTION and
// never as a status or a sentence; `PIN-7` (iv); `verification.md §2.4`).
//
// **AND WHAT THIS CELL DOES NOT ASSERT, NAMED SO A GREEN IS NOT BOUGHT CHEAPLY** (`verification.md §2`'s
// closing, `PIN-4` (iv), `§8`'s `Q-3` default taken): it does NOT assert that the two instants answer the SAME
// STATUS — each instant has its own declared refusal form, and the inherited-`ok` arm answers a registration
// refusal and a standing write-side answer for one shape — and it does NOT assert that the two CREDIT RULES
// agree, the registration's being op-based and the write's op-free since `D-105`.
//
// **THE BODIES HERE PASS AT THE ONE EVALUATION A REPAIR'S OWN LANDING OPENS.** The registration re-runs the
// pair against the op its repair landed; a body that returned its arm there would refuse the registration for a
// reason of this file's own making. So every body answers its arm's shape EXCEPT at the evaluation whose `op`
// carries the landing's own address, which it passes — a property of the DRIVE and never of an expectation.
//
// **THE SHAPE SET IS THE CONTRACT'S LISTED ONE** (`verification.md §2.4`): own+own · inherited+inherited · own
// `message`+inherited `repair` · inherited `message` alone · own non-string `message`+own repair · own `repair`
// as an own ACCESSOR. Six shapes, six fresh `mem` stores, one registration route (`addConstraint`) and one
// write at the pair's address each.
//
// **AND IT IS RED TODAY AT THE INHERITED-`repair` AND OWN-`repair`-ACCESSOR SHAPES, AND GREEN ONLY AFTER THE
// CONVERSION LANDS** (`PIN-3` (ii), (iv) and (vi)): today an inherited `repair` is REGISTERED and RUN at the
// registration while the write reads none, and an own `repair` ACCESSOR is RUN TWICE at the registration
// (`kernel-registration.mjs:399`-`:402`'s `typeof outcome.repair` and its `? outcome.repair`) while the write
// reads no repair at all. Those are the disagreements this cell exists to catch, and a pass that comes from an
// assertion outside the membership question is a defective cell (`verification.md §2.4`).
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE FOUR LIMBS, AND WHY THIS CELL WAS REDESIGNED (gate-4 finding `G4-4`)
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **THE FORM THIS CELL FIRST WORE WAS UNFALSIFIABLE, AND THE FINDING SAID SO.** It compared
// `repairRunsAtTheRegistration > 0` with `repairRunsAtTheWrite > 0` for every listed shape. Before the
// conversion those differ — which is what made the cell red — but AFTER it, on a shape whose registration
// REFUSES, the pair is not carried, the write evaluates nothing and invokes nothing: the comparison is `0 = 0`
// and it is green BY ABSENCE, not by measurement. **So every limb below is now stated over an observable that
// can differ, and each names itself in its own failure message:**
//
//   **LIMB A — THE REGISTRATION'S VERDICT.** For each shape whose `repair` stands where no instant reads one
//   (inherited, or an own ACCESSOR): after the conversion the registration REFUSES rank `19` with an EMPTY
//   `log` (state 2), runs the repair `0` times, and runs no getter. **BEFORE the conversion this limb FAILS on
//   the inherited shapes (the registration STANDS and runs the repair once, `runs = 1`) and on the accessor
//   (it stands, runs the getter twice and runs the repair it answers)** — so this is the limb that is RED
//   today, and it is RED ON A MEASUREMENT (`PIN-3` (ii), (iv), (vi)).
//
//   **LIMB B — THE MEMBERSHIP AGREEMENT, WHERE THE WRITE CAN EVALUATE IT.** `PIN-3` (i)'s own+own arm: a
//   control pair whose registration STANDS and whose write then READS exactly the members the registration
//   decided it carries — the repair runs once at each instant, and the write's crossed text is the shape's OWN
//   `message`. **This is the property's own sentence measured at both instants, and it is what keeps LIMB A's
//   refusals from being bought by "nothing registers anywhere".**
//
//   **LIMB C — THE INHERITED SHAPE'S WRITE LIMB, STATED AS THE ABSENCE OF A PAIR.** A refused registration
//   carries NO pair row, so the write at the pair's own address has nothing to evaluate: it STANDS and runs no
//   repair. **The run-count is stated as its own fact and NEVER as a comparison with the registration's count**
//   — that comparison is exactly the `0 = 0` this cell may no longer rest on (`G4-4`).
//
//   **LIMB D — THE DECLARED INVARIANT CONTROL** (`PIN-3` (iii); `G1-6`): the inherited-`message`-alone shape is
//   refused at the registration BEFORE the conversion and IDENTICALLY after it, with an empty `log` and no pair
//   carried — the row that makes the other five readable.
//
// **AND THE GATE-5 STANDING IS UNCHANGED: this instance is written BEFORE the fix, against the arms as they
// stand, and it is `OWED` and not `SKIPPED` (`contract.md §3`; `PIN-7` (iv)).** The correction above changed
// WHAT it asserts, never WHEN it was written: its expectations are `PIN-3`'s sentences, and the whole point of
// the redesign is that they now fail on the tree that stands rather than pass on it.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE DISCIPLINE: WHAT THIS FILE READS, AND WHAT IT DOES NOT
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **THE ENTRY IS REACHED BY PATH AND NOTHING ELSE IS IMPORTED** — `../../bindings/js/index.mjs`, this project's
// `O4` route (`D-6`) — and every reading below is taken at a PUBLISHED member (`storeCreate`, `addConstraint`,
// `write`, `read`, `constraints`) or at the value a published call threw. No kernel module, no `state.mjs`, no
// `Symbol` channel, no harness. **No cell opens a document at runtime** (`D-17`): every expectation is a
// literal written here and every clause it rests on is cited as `path §section` / `PIN` in this comment.
//
// **AND THE HONEST LIMIT OF THIS CELL'S BLINDNESS, SAID RATHER THAN IMPLIED**: the pass that authored this file
// also authored the RED SET beside it and therefore read `bindings/js/src/entry/kernel-registration.mjs`'s two
// divergent reads at their bytes. **Every EXPECTATION below is a sentence of `PIN-3`'s arm table and of nothing
// else**; what the code was read for is the DRIVE (which route a repair's record hands it, which position the
// commit takes, what a registration re-runs), and that is stated wherever it is used. A reader who wants a cell
// authored with no code byte read has the corpus's own gate-5 precedent; what is claimed here is narrower and
// true: **the expectations are the contract's statements, and a failure below is a finding about the two
// instants and never about a malformed drive.**
//
// **`D-21`.** The cell prints its whole table at its own `t.diagnostic` and asserts its drive's coherence — each
// shape's members stand where the shape's label says they stand — before it reports a verdict.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from "node:assert/strict";
import { test } from "node:test";

import { storeCreate } from "../../bindings/js/index.mjs";

/** A fresh `mem`-tier store per shape: fresh store per arm, no `filePath`, no repository byte. */
const make = () => storeCreate({ journalLength: 256, listeners: [] });

const ADDRESS = ["a"];
const PAIR_ID = "p";
/** The address every repair lands at — a DIFFERENT address from the pair's, so the landing is observable while
 *  the pair's own address is left in the state the body is judging. */
const LANDED_AT = ["b"];

function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

const refusalOf = (caught) => (caught !== null && typeof caught === "object"
  ? {
    status: typeof caught.status === "string" ? caught.status : null,
    message: typeof caught.message === "string" ? caught.message : String(caught.message),
    logLength: Array.isArray(caught.log) ? caught.log.length : null,
  }
  : { status: null, message: String(caught), logLength: null });

/** **THE ROUTE A REPAIR TAKES, CHOSEN BY THE RECORD IT IS HANDED AND BY NOTHING ELSE.** At a registration the
 *  record carries the lawful write route (`docs/guides/package-use.md` `§7.2`'s registration-instant clause; the
 *  sibling registration unit's `PIN-6` (ii)); at a write it does not, and the commit is supplied at `write`'s
 *  FOURTH position (`docs/guides/package-use.md` `§7.6`; `D-103`). A repair that must be callable at BOTH
 *  instants therefore takes the route its record hands it. */
function routeOf(record, store) {
  if (record !== null && typeof record === "object" && typeof record.write === "function") {
    return (tier, value) => record.write(LANDED_AT, tier, value);
  }
  return (tier, value) => store.write(LANDED_AT, tier, value, record);
}

/** The body every shape is returned from: the shape at every evaluation EXCEPT the one the repair's own landing
 *  opens, which passes (see the file head). */
const bodyFor = (shape) => (context) => (context.op !== null
  && typeof context.op === "object"
  && Array.isArray(context.op.address)
  && context.op.address[0] === LANDED_AT[0]
  ? true
  : shape);

/**
 * **THE SIX LISTED SHAPES** (`verification.md §2.4`), each with the label its members are asserted against and a
 * builder that answers a FRESH shape on every call — a fresh shape matters, because an own accessor's `get`
 * increments the shape's own counter and a reused shape would carry one instant's reads into the next.
 *
 *   `messageWhere` / `repairWhere` — `own` · `inherited` · `absent` · `accessor` (an own ACCESSOR, which is a
 *   membership-present member the write's evaluation deliberately answers `undefined` for) · `nonstring` (an own
 *   `message` whose value is not a non-empty string, which `PIN-3` (v) declares UNCHANGED at both instants).
 */
const SHAPES = [
  {
    name: "own message + own repair",
    messageWhere: "own",
    repairWhere: "own",
    build: (state) => ({
      message: "the constraint p refused (an OWN message)",
      repair: (record) => {
        state.runs += 1;
        return { ok: true, op: routeOf(record, state.store)("mem", 3).op };
      },
    }),
  },
  {
    name: "inherited message + inherited repair",
    messageWhere: "inherited",
    repairWhere: "inherited",
    build: (state) => Object.create({
      message: "the constraint p refused (an INHERITED message)",
      repair: (record) => {
        state.runs += 1;
        return { ok: true, op: routeOf(record, state.store)("mem", 4).op };
      },
    }),
  },
  {
    name: "own message + inherited repair",
    messageWhere: "own",
    repairWhere: "inherited",
    build: (state) => Object.assign(Object.create({
      repair: (record) => {
        state.runs += 1;
        return { ok: true, op: routeOf(record, state.store)("mem", 5).op };
      },
    }), { message: "the constraint p refused (an OWN message)" }),
  },
  {
    name: "inherited message alone — NO repair anywhere",
    messageWhere: "inherited",
    repairWhere: "absent",
    build: () => Object.create({ message: "the constraint p refused (an INHERITED message)" }),
  },
  {
    name: "own non-string message + own repair",
    messageWhere: "nonstring",
    repairWhere: "own",
    build: (state) => ({
      message: 0,
      repair: (record) => {
        state.runs += 1;
        return { ok: true, op: routeOf(record, state.store)("mem", 6).op };
      },
    }),
  },
  {
    name: "own repair as an own ACCESSOR",
    messageWhere: "own",
    repairWhere: "accessor",
    build: (state) => {
      const shape = { message: "the constraint p refused (an OWN message)" };
      Object.defineProperty(shape, "repair", {
        enumerable: true,
        configurable: true,
        get() {
          state.getterRuns += 1;
          return (record) => {
            state.runs += 1;
            return { ok: true, op: routeOf(record, state.store)("mem", 7).op };
          };
        },
      });
      return shape;
    },
  },
];

/** Whether the shape's `repair` is an own ACCESSOR rather than an own data member — read from the descriptors,
 *  which is the drive's own coherence check and never a verdict about the tree. */
const isAccessor = (object, member) => {
  const descriptor = Object.getOwnPropertyDescriptor(object, member);
  return descriptor !== undefined && typeof descriptor.get === "function";
};

test("SROM-B1 · THE BLIND INSTANCE · one returned shape answers the SAME MEMBERSHIP QUESTION at the registration and at the write: no shape may register a repair the write then refuses to read, and an inherited or accessor member is a member neither instant reads", (t) => {
  const rows = [];

  for (const spec of SHAPES) {
    const store = make();
    const state = { runs: 0, getterRuns: 0, store };
    const shape = spec.build(state);

    // ── THE DRIVE'S COHERENCE, ASSERTED PER SHAPE BEFORE ANY VERDICT: the members stand where the label says.
    if (spec.messageWhere === "own") {
      assert.notEqual(Object.getOwnPropertyDescriptor(shape, "message"), undefined,
        `**THE DRIVE'S COHERENCE — the shape "${spec.name}" must carry an OWN \`message\`**: the drive found `
          + `${JSON.stringify(Object.getOwnPropertyDescriptor(shape, "message"))}`);
    }
    if (spec.messageWhere === "inherited") {
      assert.equal(Object.getOwnPropertyDescriptor(shape, "message"), undefined,
        `**THE DRIVE'S COHERENCE — the shape "${spec.name}" must carry its \`message\` on the PROTOTYPE**: the `
          + `drive found an own descriptor ${JSON.stringify(Object.getOwnPropertyDescriptor(shape, "message"))}`);
      assert.equal(typeof Object.getPrototypeOf(shape).message, "string",
        `and the prototype must carry a string there: the drive read `
          + `${typeof Object.getPrototypeOf(shape).message}`);
    }
    if (spec.messageWhere === "nonstring") {
      assert.equal(typeof Object.getOwnPropertyDescriptor(shape, "message").value, "number",
        `**THE DRIVE'S COHERENCE — the shape "${spec.name}" must carry an OWN \`message\` that is NOT a non-empty `
          + `string** (\`PIN-3\` (v)): the drive built `
          + `${JSON.stringify(Object.getOwnPropertyDescriptor(shape, "message"))}`);
    }
    if (spec.repairWhere === "own") {
      assert.equal(typeof Object.getOwnPropertyDescriptor(shape, "repair").value, "function",
        `**THE DRIVE'S COHERENCE — the shape "${spec.name}" must carry an OWN function \`repair\`**: the drive `
          + `found ${JSON.stringify(Object.getOwnPropertyDescriptor(shape, "repair"))}`);
    }
    if (spec.repairWhere === "inherited") {
      assert.equal(Object.getOwnPropertyDescriptor(shape, "repair"), undefined,
        `**THE DRIVE'S COHERENCE — the shape "${spec.name}" must carry its \`repair\` on the PROTOTYPE**: the `
          + `drive found an own descriptor ${JSON.stringify(Object.getOwnPropertyDescriptor(shape, "repair"))}`);
      assert.equal(typeof Object.getPrototypeOf(shape).repair, "function",
        "and the prototype must carry a function there: the drive read "
          + `${typeof Object.getPrototypeOf(shape).repair}`);
    }
    if (spec.repairWhere === "accessor") {
      assert.equal(isAccessor(shape, "repair"), true,
        `**THE DRIVE'S COHERENCE — the shape "${spec.name}" must carry its \`repair\` as an own ACCESSOR**: the `
          + `drive found ${JSON.stringify(Object.getOwnPropertyDescriptor(shape, "repair"))}`);
    }
    if (spec.repairWhere === "absent") {
      assert.equal("repair" in shape, false,
        `**THE DRIVE'S COHERENCE — the shape "${spec.name}" must carry NO repair anywhere**: the drive read `
          + `\`"repair" in shape\` = ${JSON.stringify("repair" in shape)}`);
    }

    // ── INSTANT ONE — THE REGISTRATION.
    const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(shape)));
    const afterRegistration = { runs: state.runs, getterRuns: state.getterRuns };
    const pairCarried = store.constraints().some((row) => row.id === PAIR_ID);
    const registrationRefusal = registration.ok === true ? null : refusalOf(registration.caught);

    // ── INSTANT TWO — ONE WRITE AT THE PAIR'S ADDRESS.
    const write = attempt(() => store.write(ADDRESS, "mem", 1));
    const afterWrite = { runs: state.runs, getterRuns: state.getterRuns };
    const writeRefusal = write.ok === true ? null : refusalOf(write.caught);

    rows.push({
      shape: spec.name,
      messageWhere: spec.messageWhere,
      repairWhere: spec.repairWhere,
      registration: registration.ok === true ? "STOOD" : registrationRefusal.status,
      registrationLogLength: registrationRefusal === null ? null : registrationRefusal.logLength,
      pairCarried,
      repairRunsAtTheRegistration: afterRegistration.runs,
      getterRunsAtTheRegistration: afterRegistration.getterRuns,
      write: write.ok === true ? "STOOD" : writeRefusal.status,
      writeMessage: writeRefusal === null ? null : writeRefusal.message,
      repairRunsAtTheWrite: afterWrite.runs - afterRegistration.runs,
      getterRunsAtTheWrite: afterWrite.getterRuns - afterRegistration.getterRuns,
    });
  }

  t.diagnostic(`SROM-B1 the whole table, taken at this checkout: ${JSON.stringify(rows, null, 0)}`);

  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════
  // THE FOUR LIMBS (`G4-4`). Each names itself in its own failure message, each is stated over an observable
  // that CAN differ, and NO limb compares one instant's run-count with the other's.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════

  // ── LIMB A — THE REGISTRATION'S VERDICT ON EVERY SHAPE WHOSE `repair` STANDS WHERE NO INSTANT READS ONE. ──
  // After the conversion the membership question has ONE answer for these shapes: NOT CARRIED, therefore NOT
  // RUN — and for the accessor, the getter itself does not run (`PIN-3` (vi), the arm `G1-5` exists for: a
  // descriptor read answers `undefined` for an accessor and executes no caller code). **BEFORE the conversion
  // this limb FAILS on every row below**: the registration STANDS, the inherited repair RUNS once, the getter
  // runs twice and the repair it answers runs once.
  t.diagnostic("SROM-B1 — LIMB A: the registration's verdict on every shape whose `repair` stands where no instant reads one (red before the conversion, green after).");
  const unreachableRepairRows = rows.filter((row) => row.repairWhere === "inherited" || row.repairWhere === "accessor");
  assert.equal(unreachableRepairRows.length, 3,
    "**SROM-B1 — LIMB A's DRIVE COHERENCE: the listed set must contain EXACTLY the three shapes whose `repair` "
      + "stands on the prototype or is an own accessor** (`PIN-3` (ii), (iv), (vi)): the drive found "
      + `${JSON.stringify(unreachableRepairRows)} of the six listed shapes`);
  for (const row of unreachableRepairRows) {
    assert.equal(row.registration, "ConstraintRefusedAtRegistration",
      `**SROM-B1 — LIMB A FAILED: the shape "${row.shape}" REGISTERED, and a registration that stands has "
        + "decided the shape CARRIES a repair it will be asked to run, while the write's own evaluation reads no "
        + "repair off it. \`PIN-3\` (ii)/(iv)/(vi): after the conversion the registration refuses rank \`19\` at "
        + "the no-repair arm. **BEFORE the conversion this is exactly today's answer** — the registration STANDS "
        + "and the repair runs once. The row read: ${JSON.stringify(row)}. THE WHOLE TABLE: `
        + `${JSON.stringify(rows)}**`);
    assert.equal(row.registrationLogLength, 0,
      `**SROM-B1 — LIMB A FAILED: the shape "${row.shape}" was refused OUTSIDE state 2's form** (\`PIN-3\` (ii): `
        + "a violation carrying no readable repair is the SAME state 2 the tree already declares; `PIN-4` (iv): a "
        + "non-empty `log` would carry this arm into state 3's (d) and make the reading unattributable to the "
        + "membership question). The row read: " + `${JSON.stringify(row)}**`);
    assert.equal(row.repairRunsAtTheRegistration, 0,
      `**SROM-B1 — LIMB A FAILED: the shape "${row.shape}" CARRIED its repair into the registration, and no `
        + "instant may read one there — an inherited or accessor `repair` is a member NEITHER instant reads "
        + `(\`PIN-3\` (ii)/(iv)/(vi)). The registration RAN it ${row.repairRunsAtTheRegistration} time(s), which `
        + `is the disagreement this cell exists to catch. The row read: ${JSON.stringify(row)}**`);
    assert.equal(row.getterRunsAtTheRegistration, 0,
      `**SROM-B1 — LIMB A FAILED: AN OWN ACCESSOR WAS RUN AT THE REGISTRATION: the shape "${row.shape}"** `
        + "(`PIN-3` (vi): a descriptor read answers an accessor's value as `undefined` and runs NO caller code; "
        + "`PIN-2`'s own-member pair). The drive counted "
        + `${row.getterRunsAtTheRegistration} getter run(s). The row read: ${JSON.stringify(row)}**`);
  }

  // ── LIMB B — THE MEMBERSHIP AGREEMENT, MEASURED OVER A SHAPE THE WRITE CAN EVALUATE. ─────────────────────
  // `PIN-3` (i)'s arm: own `message` and own `repair`. The registration CREDITS the repair — an own `ok: true`
  // set beside the op the handed route landed — so the pair is CARRIED. The write then evaluates THE SAME
  // shape and DECLINES: an own `ok: false` with an own `message`. **WHAT THE REGISTRATION DECIDED THE SHAPE
  // CARRIES IS WHAT THE WRITE READS OF IT** — the repair runs once at each instant, and the write's crossed
  // text is the shape's own `message`, which is the member a chain read and an own read would not share.
  t.diagnostic("SROM-B1 — LIMB B: a control pair the write CAN evaluate — the registration carries an own `message` and an own `repair`, and the write reads exactly those members.");
  const OWN_SENTENCE = "the pair declines at the write (an OWN message, read by the write)";
  const controlStore = make();
  const control = { runs: 0 };
  let controlPhase = "registration";
  const controlShape = {
    message: "the constraint p refused (an OWN message, read by the registration)",
    repair: (record) => {
      control.runs += 1;
      const landed = routeOf(record, controlStore)("mem", 9);
      // THE REGISTRATION MUST CREDIT THIS RETURN (`PIN-4` (i): an own `ok: true` AND an own `op`), or the pair
      // would not be carried and this limb would have no write to measure. The write's return is the DECLINED
      // arm, whose own `message` is the caller's.
      return controlPhase === "registration" ? { ok: true, op: landed.op } : { ok: false, message: OWN_SENTENCE };
    },
  };
  const controlRegistration = attempt(() => controlStore.addConstraint({ address: ADDRESS, id: PAIR_ID },
    bodyFor(controlShape)));
  const controlRunsAtRegistration = control.runs;
  controlPhase = "write";
  const controlWrite = attempt(() => controlStore.write(ADDRESS, "mem", 1));
  const controlRunsAtWrite = control.runs - controlRunsAtRegistration;
  const controlWriteRefusal = controlWrite.ok === true ? null : refusalOf(controlWrite.caught);
  const controlReading = {
    registration: controlRegistration.ok === true ? "STOOD" : refusalOf(controlRegistration.caught).status,
    repairRunsAtTheRegistration: controlRunsAtRegistration,
    pairCarried: controlStore.constraints().some((row) => row.id === PAIR_ID),
    write: controlWrite.ok === true ? "STOOD" : controlWriteRefusal.status,
    writeMessage: controlWriteRefusal === null ? null : controlWriteRefusal.message,
    repairRunsAtTheWrite: controlRunsAtWrite,
  };
  t.diagnostic(`SROM-B1 — LIMB B reading, taken at this checkout: ${JSON.stringify(controlReading)}`);
  assert.equal(controlRegistration.ok, true,
    "**SROM-B1 — LIMB B's DRIVE COHERENCE: the control pair must REGISTER, or this limb has no write to measure "
      + "the membership question at** (`PIN-3` (i): the own+own arm is UNCHANGED by the conversion): the drive "
      + `read ${JSON.stringify(controlReading)}`);
  assert.equal(controlRunsAtRegistration, 1,
    "**SROM-B1 — LIMB B FAILED: the control pair's repair must run ONCE at the registration it was credited at** "
      + `(\`PIN-3\` (i); \`PIN-7\` (iii)): the drive counted ${controlRunsAtRegistration}`);
  assert.equal(controlReading.pairCarried, true,
    "and the registration must have CARRIED the pair — the write can only read what was carried: the drive read "
      + `${JSON.stringify(controlReading.pairCarried)}`);
  assert.equal(controlWrite.ok, false,
    "**SROM-B1 — LIMB B FAILED: the write must EVALUATE the carried pair and REFUSE it, which is what makes the "
      + "membership question observable at the write at all** (`PIN-3` (i)'s own+own arm evaluated at a write; "
      + "(kernel-attempt.mjs:1028-:1037): the drive read " + `${JSON.stringify(controlReading.write)}`);
  assert.equal(controlWriteRefusal === null ? null : controlWriteRefusal.status, "ConstraintPassRefused",
    "and its refusal is the write's own declared form (`PIN-3`'s opening: each instant has its own, and this "
      + `limb compares NO status across instants): the drive read ${JSON.stringify(controlReading)}`);
  assert.equal(controlRunsAtWrite, 1,
    "**SROM-B1 — LIMB B FAILED: THE WRITE MUST READ THE REPAIR THE REGISTRATION CARRIED** — one invocation at "
      + "the write, on the same returned shape the registration read one off (`PIN-3`'s opening term: the two "
      + "instants answer the SAME MEMBERSHIP QUESTION): the drive counted " + `${controlRunsAtWrite}`);
  assert.equal(controlWriteRefusal !== null && controlWriteRefusal.message.includes(OWN_SENTENCE), true,
    "**SROM-B1 — LIMB B FAILED: THE WRITE MUST READ THE SHAPE'S OWN `message` AND CROSS IT** — the sentence the "
      + "write threw with is the caller's own, which is the member an own-property read answers and a chain read "
      + "of the OTHER arms would not (PIN-8's property; kernel-attempt.mjs:1028-:1037): the drive read "
      + `${JSON.stringify(controlReading.writeMessage)}`);

  // ── LIMB C — THE INHERITED SHAPE'S WRITE LIMB, STATED AS THE ABSENCE OF A PAIR. ───────────────────────────
  // A refused registration carries NO pair row, so the write at the pair's own address has NOTHING to evaluate:
  // it stands, and it runs no repair. **The zero is stated as its own fact and NEVER as a comparison with the
  // registration's count** — `0 = 0` is what this cell used to assert and what it may not rest on (`G4-4`).
  t.diagnostic("SROM-B1 — LIMB C: the inherited shapes' write limb, stated as the ABSENCE OF A PAIR and never as a run-count comparison.");
  for (const row of unreachableRepairRows) {
    assert.equal(row.pairCarried, false,
      `**SROM-B1 — LIMB C FAILED: the shape "${row.shape}" LEFT A PAIR ROW BEHIND for a registration that `
        + "refused it — the write would then be asked a shape no registration carried (`PIN-7` (i)'s third limb; "
        + `\`PIN-3\` (ii)'s BEFORE column is this row's today reading: the pair IS carried). The row read: `
        + `${JSON.stringify(row)}**`);
    assert.equal(row.write, "STOOD",
      `**SROM-B1 — LIMB C FAILED: with NO pair carried, the write at the pair's own address has nothing to `
        + `evaluate, so it must STAND — the shape "${row.shape}" answered ${JSON.stringify(row.write)} instead. `
        + "**THIS IS NOT A COMPARISON WITH THE REGISTRATION'S ANSWER** (`PIN-3`'s opening; `PIN-4` (iv)): it is "
        + `the write's answer in the absence of a pair. The row read: ${JSON.stringify(row)}**`);
    assert.equal(row.repairRunsAtTheWrite, 0,
      `**SROM-B1 — LIMB C: AND THE WRITE RUNS NO REPAIR — its own fact, never a comparison with the `
        + `registration's count: the shape "${row.shape}"** (\`PIN-3\` (ii): an inherited repair is read by no `
        + `instant, and with no pair carried there is no evaluation to read one from). The write ran it `
        + `${row.repairRunsAtTheWrite} time(s). The row read: ${JSON.stringify(row)}**`);
  }

  // ── LIMB D — THE DECLARED INVARIANT CONTROL (`PIN-3` (iii); `G1-6`). ─────────────────────────────────────
  // An inherited `message` ALONE is refused at the registration BEFORE the fix and IDENTICALLY after it, with an
  // EMPTY log: no repair was ever in question, so the refusal is state 2 in both trees and this row is what
  // makes the other five readable. **IT IS A CONTROL AND NOT A TURNING CELL** (`verification.md §2.2`).
  const control2 = rows.find((row) => row.repairWhere === "absent");
  assert.notEqual(control2, undefined,
    "the listed set must contain the inherited-`message`-alone row, or this cell's limb D is missing");
  t.diagnostic(`SROM-B1 — LIMB D, the invariant row: ${JSON.stringify(control2)}`);
  assert.equal(control2.registration, "ConstraintRefusedAtRegistration",
    "**SROM-B1 — LIMB D FAILED: THE INHERITED-`message`-ALONE SHAPE MUST BE REFUSED AT THE REGISTRATION IN BOTH "
      + `TREES** (\`PIN-3\` (iii); \`G1-6\`): the drive read ${JSON.stringify(control2)}`);
  assert.equal(control2.registrationLogLength, 0,
    "**SROM-B1 — LIMB D FAILED: its refusal must carry an EMPTY log — no repair was ever in question** "
      + `(\`PIN-3\` (iii); \`verification.md §2.2\`): the drive read ${JSON.stringify(control2.registrationLogLength)}`);
  assert.equal(control2.pairCarried, false,
    "and the pair is withdrawn, so the later write asks nothing: the drive read "
      + `${JSON.stringify(control2.pairCarried)}`);
  assert.equal(control2.repairRunsAtTheWrite, 0,
    "and the write runs no repair, there being none anywhere on the shape: the drive read "
      + `${JSON.stringify(control2.repairRunsAtTheWrite)}`);
});
