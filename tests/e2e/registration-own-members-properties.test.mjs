// tests/e2e/registration-own-members-properties.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// GATE 11 — THE PROPERTY ROWS FOR `U-STOREROOM-REGISTRATION-OWN-MEMBERS` (`D-GP-SROM`, minted on `D-120`).
// The rows are `docs/specs/storeroom-registration-own-members/verification.md §3` (`P-SROM-1`, `P-SROM-2`,
// `P-SROM-3`), and their source is `contract.md §2`'s **`PIN-3` — THE ARM TABLE** — the arms are enumerated
// there and the generator below samples them BY CONSTRUCTION (`verification.md §3`: *"`PIN-3`'s TABLE IS THE
// GENERATOR'S SOURCE"*). The property itself is `PIN-8`'s, quoted from
// `docs/specs/storeroom-constraint-outcome-proposal-review.md:147`.
//
// THE ENTRY IS REACHED BY PATH — `../../bindings/js/index.mjs`, this project's `O4` route (`D-6`) — and nothing
// else is imported: no kernel module, no harness, no dependency added. Every cell prints its readings at its own
// `t.diagnostic`.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE `§9` PROPERTY, IN ITS OWN WORDS (`PIN-8`; `docs/specs/storeroom-constraint-outcome-proposal-review.md:147`)
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
//   *"at BOTH evaluation instants the same returned outcome answers the same membership question — what
//   `addConstraint` decides a shape CARRIES (a `message`, a `repair`) is what the write's own evaluation READS of
//   that shape, both decided by own-property forms — so a generated inherited-member shape can neither register
//   a repair that the write then refuses to read, nor carry a sentence at one instant that the other answers
//   with `unrecognized`."*
//
// **AND THE TREE HAS THREE INSTANTS, NOT TWO (`G1-8`).** The third is the REVERSAL's judgement, which already
// reads the same closed outcome by the same own-property rule
// (`bindings/js/src/entry/constraints.mjs:2810`-`:2813`, `:3592`, the helper at `:3515`). **IT IS STATED IN THIS
// FILE AS CONFORMING AND IS NOT QUANTIFIED** (`PIN-8` (iii); `§8`'s `Q-2` default taken): no byte of that module
// is in this unit's write set, so a row over it would be a row over a site this unit does not move (`P-SROM-2`).
// **AND IT IS NO LONGER MERELY DECLARED: `P-SROM-2` DRIVES IT AT THE PUBLIC SURFACE** — `rollback` of an op
// whose reversal reaches a carried pair makes the judgement ask that pair, and the cell reads the judgement's
// own outcome read there (gate-4 finding `G4-8`: a row asserted over the cell's own literal lists was
// declaration, not measurement). **The quantifier stays the two converted instants; the third is a driven
// witness, and it is not folded in.**
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE GENERATOR — SMALL, DETERMINISTIC, AND ENUMERATED RATHER THAN SAMPLED
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// The generated space is the PRODUCT the contract names: **twelve outcome shapes** × **six repair returns**,
// taken exhaustively and in a fixed order — no random source, no seed, no dependency, and the same list in every
// run (`verification.md §3`: the predicate is universally quantified over generated outcomes and generated repair
// returns, and its falsifier is the two failures the property sentence names). The twelve outcomes carry the
// membership variation the row requires — OWN · INHERITED · ABSENT · ACCESSOR · NON-FUNCTION — and the six
// returns carry the `ok` variation the credit half of the property needs.
//
// **WHAT "READS" MEANS HERE, AND WHY EACH MEMBERSHIP HAS THE OBSERVABLE IT HAS.** The membership question is not
// a status (`PIN-3`'s opening), so no cell below compares statuses across instants. It is read as:
//   · a `repair` the instant READS  → the repair was INVOKED (its own counter), and, for an own ACCESSOR, the
//     GETTER was run (an own counter): both are caller code the instant executed;
//   · a `message` the instant READS → nothing is composed from it at the registration (`PIN-3` (v): the instant
//     takes no sentence from `message`), so it has no observable of its own and no cell below asserts one. What
//     the message's membership decides is WHICH ARM the instant takes, and that arm is observable exactly as the
//     repair counter is;
//   · a repair return's `ok` the instant CREDITS → the registration's own verdict, whose two grounds are the own
//     `ok` and an own `op` (`PIN-4` (i)); and at the write, the DECLARED FAILED ARM (`ok` own `false` with an own
//     non-empty `message`) versus the credited arm (`kernel-attempt.mjs:1028`-`:1037`).
//
// **AND THE TWO CREDIT RULES ARE NEVER COMPARED** (`PIN-4` (iv)): the registration's credit is op-based and the
// write's is op-free since `D-105`, `docs/L1/op-free-repair-credit.md` `§8.3`'s `Q-1` is open, and no cell here
// asserts that they agree — the `ok` half compares MEMBERSHIP, never a credit rule.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from "node:assert/strict";
import { test } from "node:test";

import { storeCreate } from "../../bindings/js/index.mjs";

const make = () => storeCreate({ journalLength: 256, listeners: [] });

const ADDRESS = ["a"];
const PAIR_ID = "p";
const LANDED_AT = ["b"];

function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

const statusOf = (answer) => (answer.ok === true
  ? "STOOD"
  : (answer.caught !== null && typeof answer.caught === "object" && typeof answer.caught.status === "string"
    ? answer.caught.status
    : String(answer.caught)));

const messageOf = (answer) => (answer.ok === true
  ? null
  : (answer.caught !== null && typeof answer.caught === "object" && typeof answer.caught.message === "string"
    ? answer.caught.message
    : String(answer.caught)));

/** **THE OWN-PROPERTY FORM THE PROPERTY IS STATED IN**, written here as the TEST'S OWN reader: the descriptor's
 *  own `value` where the member is a data member, and `undefined` where it is absent OR is an accessor — the
 *  form `ownMember` holds at `bindings/js/src/entry/kernel-foundations.mjs:882`-`:886`, restated here because a
 *  property cell must read its own expectation and not borrow the tree's reader. */
const ownMember = (object, member) => {
  if (object === null || (typeof object !== "object" && typeof object !== "function")) return undefined;
  const descriptor = Object.getOwnPropertyDescriptor(object, member);
  if (descriptor === undefined) return undefined;
  return Object.prototype.hasOwnProperty.call(descriptor, "value") ? descriptor.value : undefined;
};

/** **THE CLASS GUARD, WHICH NO ARM MOVES** (`PIN-3` (ix): *"`typeof === 'object'` is the same guard at both"*).
 *  It is part of the GATE and not of the membership question, and a label that left it out would claim a
 *  callable outcome carries a repair — which neither instant reads. */
const isObjectOutcome = (shape) => shape !== null && typeof shape === "object";

/** **THE CHAIN FORM** — the read the registration instant holds BEFORE the conversion (`PIN-3`'s BEFORE column;
 *  `bindings/js/src/entry/kernel-registration.mjs:399`-`:402`, whose `typeof outcome === 'object'` guard is part
 *  of it). It is computed here ONLY as a generator LABEL (`P-SROM-3`'s narrowing set) and never as a drive: it
 *  RUNS an accessor, which is the very arm `PIN-3` (vi) turns on, so it is computed on a FRESH shape with a
 *  throwaway counter. */
const chainCarries = (shape) => {
  if (!isObjectOutcome(shape)) return false;
  if (!("message" in shape)) return false;
  if (!("repair" in shape)) return false;
  return typeof shape.repair === "function";
};

/** **THE OWN FORM** — the read the conversion gives BOTH converted instants (`PIN-2` (i)), with the same class
 *  guard above it: the gate is the MEMBERSHIP of `message` (`Object.hasOwn`), and the repair is the value of an
 *  own `repair` member that IS a function. */
const ownCarriesRepair = (shape) => isObjectOutcome(shape)
  && Object.hasOwn(shape, "message")
  && typeof ownMember(shape, "repair") === "function";

const ownCarriesTrueOk = (returned) => ownMember(returned, "ok") === true;

/** The route a repair takes, chosen by the record it is handed: the registration's lawful route where the record
 *  carries one, and the store verb with the commit at `write`'s FOURTH position otherwise (`D-103`). */
function routeOf(record, store) {
  if (record !== null && typeof record === "object" && typeof record.write === "function") {
    return (tier, value) => record.write(LANDED_AT, tier, value);
  }
  return (tier, value) => store.write(LANDED_AT, tier, value, record);
}

/** The body every generated outcome is returned from: the outcome at every evaluation EXCEPT the one a repair's
 *  own landing opens, which passes — a property of the DRIVE, so that no generated shape is refused for a reason
 *  the generator built. */
const bodyFor = (outcome) => (context) => (context.op !== null
  && typeof context.op === "object"
  && Array.isArray(context.op.address)
  && context.op.address[0] === LANDED_AT[0]
  ? true
  : outcome);

/** **THE TWELVE GENERATED OUTCOME SHAPES** — the arm table's shapes, enumerated (`PIN-3` (i)–(ix);
 *  `verification.md §3`'s list). Each builder answers a FRESH shape and records, in `state`, the two caller-code
 *  observables: `runs` (the repair's invocations) and `getterRuns` (an own accessor's `get`). */
const OUTCOMES = [
  {
    arm: "PIN-3 (ix) · the PASS arm",
    name: "true",
    build: () => true,
  },
  {
    arm: "PIN-3 (i) · OWN + OWN, CREDITED",
    name: "own message + own repair",
    build: (state) => ({
      message: "the generated own message",
      repair: (record) => {
        state.runs += 1;
        return { ok: true, op: routeOf(record, state.store)("mem", 1).op };
      },
    }),
  },
  {
    arm: "PIN-3 (i)/(ii) · OWN message ALONE",
    name: "own message, no repair",
    build: () => ({ message: "the generated own message" }),
  },
  {
    arm: "PIN-3 (ii) · INHERITED + INHERITED",
    name: "inherited message + inherited repair",
    build: (state) => Object.create({
      message: "the generated inherited message",
      repair: (record) => {
        state.runs += 1;
        return { ok: true, op: routeOf(record, state.store)("mem", 2).op };
      },
    }),
  },
  {
    arm: "PIN-3 (iv) · OWN message + INHERITED repair",
    name: "own message + inherited repair",
    build: (state) => Object.assign(Object.create({
      repair: (record) => {
        state.runs += 1;
        return { ok: true, op: routeOf(record, state.store)("mem", 3).op };
      },
    }), { message: "the generated own message" }),
  },
  {
    arm: "PIN-3 (iii) · INHERITED message alone",
    name: "inherited message alone",
    build: () => Object.create({ message: "the generated inherited message" }),
  },
  {
    arm: "PIN-3 (v) · OWN non-string message + own repair",
    name: "own non-string message (0) + own repair",
    build: (state) => ({
      message: 0,
      repair: (record) => {
        state.runs += 1;
        return { ok: true, op: routeOf(record, state.store)("mem", 4).op };
      },
    }),
  },
  {
    arm: "PIN-3 (vi) · OWN repair as an own ACCESSOR",
    name: "own repair as an own accessor",
    build: (state) => {
      const outcome = { message: "the generated own message" };
      Object.defineProperty(outcome, "repair", {
        enumerable: true,
        configurable: true,
        get() {
          state.getterRuns += 1;
          return (record) => {
            state.runs += 1;
            return { ok: true, op: routeOf(record, state.store)("mem", 5).op };
          };
        },
      });
      return outcome;
    },
  },
  {
    arm: "PIN-3 (vii) · OWN repair PRESENT AND NOT A FUNCTION",
    name: "own repair not a function ('no')",
    build: () => ({ message: "the generated own message", repair: "no" }),
  },
  {
    arm: "PIN-3 (ix) · a CALLABLE carrying own members",
    name: "callable carrying own message + own repair",
    build: (state) => {
      const callable = () => true;
      callable.message = "the generated own message";
      callable.repair = (record) => {
        state.runs += 1;
        return { ok: true, op: routeOf(record, state.store)("mem", 6).op };
      };
      return callable;
    },
  },
  {
    arm: "PIN-3 (ix) · a NON-OBJECT outcome",
    name: "a non-object outcome (42)",
    build: () => 42,
  },
  {
    arm: "PIN-3 (i)/(ii) · NO members at all",
    name: "no members at all (a plain object)",
    build: () => ({}),
  },
];

/** **THE SIX GENERATED REPAIR RETURNS** (`verification.md §3`'s list). `carriesOwnOp` is not a label but a
 *  reading: the return's own `op` is the op the route landed, which is what makes the credit's op ground TRUE
 *  for that shape and FALSE for the others (`PIN-4` (i)). */
const RETURNS = [
  {
    name: "own ok + own op",
    build: (record, state) => {
      const landed = routeOf(record, state.store)("mem", 11);
      return { ok: true, op: landed.op };
    },
  },
  {
    name: "INHERITED ok + own op",
    build: (record, state) => {
      const landed = routeOf(record, state.store)("mem", 12);
      return Object.assign(Object.create({ ok: true }), { op: landed.op });
    },
  },
  {
    name: "own ok only (no op)",
    build: (record, state) => {
      routeOf(record, state.store)("mem", 13);
      return { ok: true };
    },
  },
  {
    name: "undefined",
    build: (record, state) => {
      routeOf(record, state.store)("mem", 14);
      return undefined;
    },
  },
  {
    name: "own ok:false + own message",
    build: (record, state) => {
      routeOf(record, state.store)("mem", 15);
      return { ok: false, message: "the generated repair declined" };
    },
  },
  {
    name: "own ok as an ACCESSOR",
    build: (record, state) => {
      const landed = routeOf(record, state.store)("mem", 16);
      const returned = { op: landed.op };
      Object.defineProperty(returned, "ok", {
        enumerable: true,
        configurable: true,
        get() {
          state.okGetterRuns += 1;
          return true;
        },
      });
      return returned;
    },
  },
];

/** Drive ONE generated outcome shape at both instants and answer its readings. `writeValue` is the value the
 *  write carries, so a shape whose body judges the value can be driven at both. */
function driveOutcome(spec) {
  const store = make();
  const state = { runs: 0, getterRuns: 0, store };
  const outcome = spec.build(state);
  const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(outcome)));
  const afterRegistration = { runs: state.runs, getterRuns: state.getterRuns };
  const pairCarried = store.constraints().some((row) => row.id === PAIR_ID);
  const write = attempt(() => store.write(ADDRESS, "mem", 1));
  return {
    arm: spec.arm,
    name: spec.name,
    registration: statusOf(registration),
    registrationLogLength: registration.ok === true
      ? null
      : (Array.isArray(registration.caught.log) ? registration.caught.log.length : null),
    pairCarried,
    repairRunsAtTheRegistration: afterRegistration.runs,
    getterRunsAtTheRegistration: afterRegistration.getterRuns,
    write: statusOf(write),
    writeMessage: messageOf(write),
    repairRunsAtTheWrite: state.runs - afterRegistration.runs,
    getterRunsAtTheWrite: state.getterRuns - afterRegistration.getterRuns,
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// P-SROM-1 — THE `§9` PROPERTY. For every generated outcome shape `O` and every generated repair return `R`:
// the members the registration reads off `O` are the members the write's evaluation reads off `O`, and the
// member the registration credits off `R` is the member the write reads off `R` — BOTH BY OWN-PROPERTY FORMS.
// FALSIFIER (`verification.md §3`): a repair invoked at one instant and not read at the other; a member read at
// one instant and absent at the other; a getter run at one instant and not the other. RED TODAY at the
// inherited-`repair`, own-`repair`-accessor and inherited-`ok` shapes.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE TWO WRITE-SIDE ASSERTIONS THIS OUTCOME TABLE MAY NOT TAKE ACROSS A PAIR THE WRITE NEVER REACHES
// (the gate-4 re-read of this row; the same form `G4-4` removed from the blind cell)
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// **A SHAPE WHOSE REGISTRATION REFUSES LEAVES NO ROW IN `constraints()`** (`driveOutcome`'s `pairCarried`), so
// the write's sweep never asks it: its repair and getter counters are `0` **BY NON-CARRIAGE**, and comparing
// them with the registration's counters is `0 = 0` — green on every tree, including one that reads the shape
// completely differently at the registration. The row's first form did exactly that on `:360`, and asserted
// `getterRunsAtTheWrite === 0` on `:371` where the ONE accessor shape is itself the refused one. **BOTH ARE NOW
// RE-DERIVED, NOT SOFTENED:** the table is PARTITIONED by the drive's own reach (carried / not carried), the
// partition is asserted total, and the two arms are asserted on different observables —
//   · **CARRIED** (the pair the write DOES ask): the two run counts are the same membership question asked
//     twice, and their AGREEMENT is the assertion (`PIN-8`; `PIN-3`'s opening);
//   · **NOT CARRIED**: the write is never asked, which is asserted as its OWN answer (it STANDS, with no pair to
//     refuse it) and never as a comparison; the falsifier there is the REGISTRATION's own counter, taken where
//     that instant is genuinely reached — the chain form runs the inherited repair and the accessor's getter,
//     the own form does neither.
// **AND THE GETTER FALSIFIER'S WRITE-SIDE HALF HAS NO ROW TO BE MEASURED ON**, which is now STATED: no shape
// the write reaches carries an accessor, and the accessor's pair is never carried. Its falsifier is the
// REGISTRATION's getter counter, asserted for every row; its write side is the absence of its pair, asserted.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("P-SROM-1 · THE §9 PROPERTY · the same generated shape answers the same membership question at both evaluation instants, by own-property forms — over twelve generated outcomes × six generated repair returns (PIN-8; PIN-3's table is the generator's source)", (t) => {
  // ── THE OUTCOME HALF — the `message`/`repair` membership, read at both instants. ──────────────────────
  const rows = OUTCOMES.map((spec) => driveOutcome(spec));
  t.diagnostic(`P-SROM-1 the outcome table, taken at this checkout: ${JSON.stringify(rows)}`);

  // ── THE PARTITION THE WRITE'S REACH MAKES, COMPUTED AND ASSERTED TOTAL BEFORE ANY VERDICT IS READ. ─────
  // A refusal leaves no row in `constraints()`, so the write's sweep never asks that shape and the row's
  // write-side counters are `0` BY NON-CARRIAGE. The partition is what keeps that zero out of every comparison.
  const carriedRows = rows.filter((row) => row.pairCarried === true);
  const unreachedRows = rows.filter((row) => row.pairCarried === false);
  t.diagnostic(`P-SROM-1 the partition the write's reach makes, taken at this checkout: CARRIED (the write's `
    + `sweep asks the shape) = ${JSON.stringify(carriedRows.map((row) => row.name))} · NOT CARRIED (the write `
    + `never asks it, so its counters are 0 BY NON-CARRIAGE and are compared with nothing) = `
    + `${JSON.stringify(unreachedRows.map((row) => row.name))}`);
  assert.equal(carriedRows.length + unreachedRows.length, rows.length,
    "**P-SROM-1 — THE PARTITION'S COHERENCE: every generated row must land in exactly one arm of this row's "
      + "assertions, or a row whose `pairCarried` is neither `true` nor `false` would be asserted NOWHERE and "
      + `the table would shrink silently: the drive read `
      + `${JSON.stringify(rows.map((row) => ({ name: row.name, pairCarried: row.pairCarried })))}**`);
  assert.equal(carriedRows.length > 0, true,
    "**P-SROM-1 — THE PARTITION'S COHERENCE: at least one generated shape must leave a pair the write is asked, "
      + "or the cross-instant arm below asserts nothing at all — and the property would be measured only where "
      + `its two instants cannot both be reached: the drive read ${JSON.stringify(rows)}**`);

  // (1) **WHERE THE WRITE IS REACHED — THE SAME QUESTION, ASKED AT BOTH INSTANTS, ANSWERED THE SAME.** This is
  //     the only place in this row where the two run counts are compared, and it is restricted to pairs the
  //     write's sweep actually asks: a disagreement here is a real change of one instant's read. On the PASS arm
  //     the shared reading is "neither instant reads a repair off it" (`PIN-3` (ix)); on `PIN-3` (i)/(v) it is
  //     one invocation at each instant.
  for (const row of carriedRows) {
    assert.equal(row.repairRunsAtTheRegistration, row.repairRunsAtTheWrite,
      `**P-SROM-1 — THE GENERATED SHAPE "${row.name}" (${row.arm}) IS READ DIFFERENTLY AT THE TWO INSTANTS: the `
        + "pair IS carried, so this is a genuine cross-instant reading — the repair the registration read is one "
        + "the write's own evaluation must read, with the SAME invocation count, or what `addConstraint` decided "
        + `a shape CARRIES is not what the write READS of it (\`PIN-8\`; \`PIN-3\`'s opening). THE DRIVE READ: `
        + `registration ${row.registration}, repair invocations ${row.repairRunsAtTheRegistration}; write `
        + `${row.write}, repair invocations ${row.repairRunsAtTheWrite}. THE WHOLE TABLE: ${JSON.stringify(rows)}**`);
  }

  // (2) **WHERE IT IS NOT — THE ABSENCE OF A PAIR, STATED, AND THE REGISTRATION'S OWN READ AS THE FALSIFIER.**
  //     Nothing here compares a write-side count with a registration-side one: the write never asked the shape.
  for (const row of unreachedRows) {
    assert.equal(row.write, "STOOD",
      `**P-SROM-1 — THE WRITE IS NEVER ASKED THIS SHAPE, AND ITS OWN ANSWER SAYS SO: "${row.name}" (${row.arm}) `
        + "left NO row in `constraints()`, so the write at the pair's own address has nothing to evaluate and "
        + "must STAND. **THIS IS THE WRITE'S ANSWER IN THE ABSENCE OF A PAIR AND NEVER A COMPARISON WITH THE "
        + `REGISTRATION'S ANSWER** (\`PIN-3\`'s opening; \`PIN-4\` (iv)). The drive read ${JSON.stringify(row)}; `
        + `the whole table is ${JSON.stringify(rows)}**`);
    assert.equal(row.repairRunsAtTheRegistration, 0,
      `**P-SROM-1 — AND THE REGISTRATION READ NO REPAIR OFF "${row.name}" EITHER — WHICH IS THIS ROW'S ACTUAL `
        + "FALSIFIER, taken at the instant that IS reached: an inherited or accessor `repair` is a member NEITHER "
        + `instant reads (\`PIN-3\` (ii)/(iv)/(vi)), so the registration must not run it, and **a tree that read `
        + "the CHAIN form runs it once here** (the BEFORE column of `PIN-3`'s table). The registration ran it "
        + `${row.repairRunsAtTheRegistration} time(s). THE WRITE'S COUNTER FOR THIS ROW `
        + `(${row.repairRunsAtTheWrite}) IS 0 BY NON-CARRIAGE AND IS COMPARED WITH NOTHING. THE WHOLE TABLE: `
        + `${JSON.stringify(rows)}**`);
  }

  // (3) **THE THIRD FALSIFIER — THE GETTER — AT THE INSTANT THAT IS REACHED FOR ALL TWELVE SHAPES.** The
  //     registration is where the chain form runs caller code the own form must not: the accessor's getter, and
  //     the inherited repairs. This is the reading that carries the accessor arm; the write side of that arm has
  //     no pair to be reached through, and (4) below states that as the absence it is.
  for (const row of rows) {
    assert.equal(row.getterRunsAtTheRegistration, 0,
      `**P-SROM-1 — AN OWN ACCESSOR IS NOT A MEMBER EITHER INSTANT READS, SO NO INSTANT MAY RUN ITS GETTER: `
        + `"${row.name}" (\`PIN-3\` (vi); the property's third falsifier). The registration ran it `
        + `${row.getterRunsAtTheRegistration} time(s). THE WHOLE TABLE: ${JSON.stringify(rows)}**`);
  }

  // (4) **THE GETTER FALSIFIER'S WRITE-SIDE HALF, STATED AS UNMEASURABLE RATHER THAN ASSERTED AS A ZERO.** The
  //     one shape carrying an own ACCESSOR `repair` is REFUSED at the registration, so its pair is never carried
  //     and the write's sweep never asks it; and every shape the write DOES reach carries no accessor at all.
  //     `getterRunsAtTheWrite` is therefore `0` on every row — by non-carriage on nine and by the absence of an
  //     accessor on the three the write reaches — so an assertion of that zero would be green on every tree.
  //     **THE ACCESSOR'S FALSIFIER IS THE REGISTRATION'S OWN GETTER COUNTER** (asserted in (3) for every row: the
  //     chain form runs the getter, the descriptor read does not), and its write side is the ABSENCE OF ITS PAIR,
  //     asserted here as a fact of the drive.
  const accessorRows = rows.filter((row) => row.arm.startsWith("PIN-3 (vi)"));
  assert.equal(accessorRows.length, 1,
    "**P-SROM-1 — THE ACCESSOR ARM MUST STAND IN THE GENERATED TABLE EXACTLY ONCE** or the falsifier this row "
      + `carries for \`PIN-3\` (vi) has no subject: the drive read `
      + `${JSON.stringify(rows.map((row) => row.arm))}**`);
  assert.equal(accessorRows[0].pairCarried, false,
    `**P-SROM-1 — THE ACCESSOR ROW'S WRITE SIDE IS NOT REACHED BECAUSE ITS PAIR IS NOT CARRIED, and that absence `
      + "is what this row asserts instead of a write-side getter count: a registration that read the accessor "
      + `would have run its getter, taken a function and CARRIED the pair (\`PIN-3\` (vi)'s BEFORE column). The `
      + `drive read ${JSON.stringify(accessorRows[0])}; the whole table is ${JSON.stringify(rows)}**`);
  const accessorReading = accessorRows.map((row) => ({
    name: row.name,
    pairCarried: row.pairCarried,
    write: row.write,
    repairRunsAtTheWrite: row.repairRunsAtTheWrite,
    getterRunsAtTheWrite: row.getterRunsAtTheWrite,
  }));
  t.diagnostic(`P-SROM-1 the accessor row's write side, taken at this checkout (NOT REACHED — no assertion `
    + `reads its write-side counters as evidence): ${JSON.stringify(accessorReading)}`);

  // ── THE REPAIR-RETURN HALF — the `ok` membership, read at the registration's credit and at the write. ──
  const returnRows = RETURNS.map((spec) => {
    const store = make();
    const state = { runs: 0, getterRuns: 0, okGetterRuns: 0, store };
    const outcome = {
      message: "the generated own message",
      repair: (record) => {
        state.runs += 1;
        return spec.build(record, state);
      },
    };
    const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(outcome)));
    // The return the repair actually answered, built ONCE MORE against a fresh route so the membership is read
    // off the same generator call's output and not off a landed value that no longer exists:
    const returned = (() => {
      // A throwaway route that answers a well-formed WriteRecord for shapes that do not need a real landing.
      const landed = { op: { opId: `probe-${spec.name}` } };
      return spec.build({ write: () => landed }, { store, okGetterRuns: 0 });
    })();
    return {
      name: spec.name,
      registration: statusOf(registration),
      repairInvocations: state.runs,
      ownCarriesTrueOk: ownCarriesTrueOk(returned),
      ownCarriesAnOp: (() => {
        const op = ownMember(returned, "op");
        return op !== null && typeof op === "object" && typeof ownMember(op, "opId") === "string"
          && ownMember(op, "opId").length > 0;
      })(),
      okGetterRuns: state.okGetterRuns,
    };
  });
  t.diagnostic(`P-SROM-1 the repair-return table, taken at this checkout: ${JSON.stringify(returnRows)}`);

  for (const row of returnRows) {
    const expectedCredit = row.ownCarriesTrueOk === true && row.ownCarriesAnOp === true;
    assert.equal(row.registration === "STOOD", expectedCredit,
      `**P-SROM-1 — THE REGISTRATION'S CREDIT READS \`ok\` BY A DIFFERENT RULE FROM THE ONE THE WRITE'S `
      + `EVALUATION HOLDS: the generated return "${row.name}" `
      + `(${row.ownCarriesTrueOk ? "carries an OWN ok:true" : "does NOT carry an own ok:true"}, `
      + `${row.ownCarriesAnOp ? "carries an own op" : "carries no own op"}). THE PROPERTY is stated over the `
      + "MEMBERSHIP of `ok` and of `op` and NEVER over a credit rule (`PIN-4` (iv)): the registration is "
      + `expected to credit exactly the returns the own-property form says carry \`ok: true\` AND an own \`op\`. `
      + `THE DRIVE READ: ${row.registration}, with ${row.repairInvocations} repair invocation(s). THE WHOLE `
      + `TABLE: ${JSON.stringify(returnRows)}**`);
  }
  for (const row of returnRows) {
    assert.equal(row.okGetterRuns, 0,
      `**P-SROM-1 — AN \`ok\` ACCESSOR IS NOT RUN BY THE CREDIT EITHER: "${row.name}"** (\`PIN-3\` (viii); the `
        + `property's third falsifier): the registration ran the return's getter ${row.okGetterRuns} time(s). `
        + `THE WHOLE TABLE: ${JSON.stringify(returnRows)}**`);
  }

  // ── AND THE WRITE'S HALF OF THE `ok` MEMBERSHIP — the member the write READS, stated as its own declared
  //    arms (`kernel-attempt.mjs:1028`-`:1037`). The two returns below differ in ONE thing: whether `ok` is an
  //    own member. The write is expected to read the OWN one and to be blind to the inherited one. This is a
  //    statement about the WRITE's read alone and it asserts nothing about the two credit rules agreeing.
  const writeHalf = [false, true].map((inherited) => {
    const store = make();
    let phase = "registration";
    const outcome = {
      message: "the generated own message",
      repair: (record) => {
        const landed = routeOf(record, store)("mem", 21);
        if (phase === "registration") return { ok: true, op: landed.op };
        const declined = { message: "the generated repair declined at the write", op: landed.op };
        if (inherited === true) Object.setPrototypeOf(declined, { ok: false });
        else declined.ok = false;
        return declined;
      },
    };
    const registration = attempt(() => store.addConstraint({ address: ADDRESS, id: PAIR_ID }, bodyFor(outcome)));
    phase = "write";
    const write = attempt(() => store.write(ADDRESS, "mem", 1));
    return {
      okWhere: inherited === true ? "INHERITED ok:false + own message" : "OWN ok:false + own message",
      registration: statusOf(registration),
      write: statusOf(write),
      writeMessage: messageOf(write),
    };
  });
  t.diagnostic(`P-SROM-1 the write's own-` + `ok reading, taken at this checkout: ${JSON.stringify(writeHalf)}`);

  const ownOkRow = writeHalf.find((row) => row.okWhere.startsWith("OWN"));
  const inheritedOkRow = writeHalf.find((row) => row.okWhere.startsWith("INHERITED"));
  assert.equal(ownOkRow.registration, "STOOD",
    "the write-arm drives need their pair registered first (the drive's coherence): the registration read "
      + `${JSON.stringify(ownOkRow)}`);
  assert.equal(inheritedOkRow.registration, "STOOD",
    "and the second drive too: the registration read " + `${JSON.stringify(inheritedOkRow)}`);
  assert.equal(ownOkRow.write, "ConstraintPassRefused",
    "**P-SROM-1 — THE WRITE READS AN OWN `ok: false` WITH AN OWN MESSAGE AS ITS DECLARED FAILED ARM** "
      + `(\`kernel-attempt.mjs:1028\`-:\`1037\`; \`PIN-3\` (ix)'s write column): the drive read `
      + `${JSON.stringify(ownOkRow)}`);
  assert.equal(ownOkRow.writeMessage.includes("the generated repair declined at the write"), true,
    "and the sentence is THE CALLER'S OWN, which is what proves the return's `message` was read: the drive "
      + `read ${JSON.stringify(ownOkRow.writeMessage)}`);
  assert.equal(inheritedOkRow.write, "STOOD",
    "**P-SROM-1 — AND THE SAME RETURN WITH AN INHERITED `ok: false` IS NOT THE FAILED ARM: the write reads no "
      + "`ok` off the prototype, so it credits its own landing and STANDS** (the write's own-member read, which "
      + `this unit leaves UNCHANGED; \`PIN-3\` (viii)'s write column): the drive read `
      + `${JSON.stringify(inheritedOkRow)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// P-SROM-2 — THE THIRD INSTANT IS CONFORMING, IS NOT IN THE QUANTIFIER, AND IS NOW DRIVEN (`G1-8`; `PIN-8`
// (iii); `§8`'s `Q-2` default taken). The reversal's judgement already reads the same closed outcome by the
// same own-property rule (`bindings/js/src/entry/constraints.mjs:2810`-`:2813` `Object.hasOwn(outcome,
// 'message')` with `ownDataMember(outcome, 'repair')`, and `:3592`'s `ownDataMember(outcome, 'message')`), **no
// byte of that module is in this unit's write set, and THE ROW ASSERTS NO CHANGE AT THAT SITE.**
//
// **AND THE ROW'S FIRST FORM WAS DECLARATION AND NOT MEASUREMENT** (gate-4 finding `G4-8`): it asserted over
// two of its own literal lists (`QUANTIFIED.length === 2`), so "the third instant is conforming" was DECLARED,
// and the cell could only fail by editing its own constants. **THIS PASS CHOSE THE FIRST OF `G4-8`'s TWO
// ARMS — MAKE IT EXECUTABLE — because the reversal IS reachable from this package's PUBLIC surface**, and it
// was reached and measured before this head was written: `store.rollback(opId)` over an op that landed the
// state a CARRIED pair refuses reaches the reversal's judgement, which ASKS the pair through
// `reversalOutcome` and reads its answer by the own-property rule.
//
// **THE JUDGEMENT'S OWN OUTCOME READ IS OBSERVABLE AT THE SURFACE, and this cell reads it there:**
//   · a closed outcome's OWN string `message` is CROSSED into the refusal's `constraint-check` entry
//     (`reversalSaid`'s `said` slot, `:3592`'s call site), while an INHERITED `message` is not read at all, so
//     the entry's sentence is the store's generated one with no caller text;
//   · an own DATA `repair` IS read and RUN at the judgement — the entry then carries the credit's own sentence
//     — while an INHERITED `repair` and an own ACCESSOR `repair` are read by NO instant and run NOTHING (the
//     accessor's getter does not run either: a descriptor read answers `undefined`).
// **SO EACH ROW BELOW IS A FALSIFIABLE READING OF THE THIRD INSTANT'S READ**, and a tree whose reversal read by
// the chain form would cross the INHERITED sentence and run the INHERITED repair.
//
// **THE QUANTIFIER IS STILL THE TWO CONVERTED INSTANTS** (`P-SROM-1`), and this cell FOLDS NOTHING INTO IT: it
// drives the reversal as a CONFORMING WITNESS over the same shape set's membership variation, asserts NO change
// there, and exists so a later pass cannot silently fold the third instant into the two
// (`verification.md §3`: *"the row is stated so a later pass cannot silently fold the third instant into the
// two"*); a row quantified over the reversal would be a row over a site this unit does not move
// (`PIN-8` (iii); `Q-2`'s default).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

/** The address the reversal restores and the pair stands at: TWO landings, and the second is the op undone. */
const REVERSED_AT = ["a"];

/** The `constraint-check` entry's sentence — the judgement's own composed text (`reversalRefusal`'s `spelled`),
 *  which is where the outcome's OWN `message` is crossed where the judgement reads one. */
function judgementSaid(caught) {
  if (caught === null || typeof caught !== "object" || !Array.isArray(caught.log) || caught.log.length === 0) {
    return null;
  }
  const entry = caught.log[0];
  return entry !== null && typeof entry === "object" && typeof entry.message === "string" ? entry.message : null;
}

/** **THE MEMBERSHIP CASES THE THIRD INSTANT IS DRIVEN OVER** — the same shape space's membership variation the
 *  row's generator names (`verification.md §3`: `P-SROM-2`'s generator is the same shape set), cut to the
 *  members the judgement reads. Each `expect` is the READING the own-property rule makes necessary; none of them
 *  is read off this cell's own literals, each is a value the judgement produced. */
const REVERSAL_CASES = [
  {
    name: "own message alone, no repair",
    sentence: "SENTENCE-OWN-REVERSAL-A",
    build: (state) => ({ message: "SENTENCE-OWN-REVERSAL-A" }),
    expect: { messageCrossed: true, repairRuns: 0, getterRuns: 0 },
  },
  {
    name: "INHERITED message alone, no repair",
    sentence: "SENTENCE-INHERITED-REVERSAL-B",
    build: () => Object.create({ message: "SENTENCE-INHERITED-REVERSAL-B" }),
    expect: { messageCrossed: false, repairRuns: 0, getterRuns: 0 },
  },
  {
    name: "own message + INHERITED repair",
    sentence: "SENTENCE-OWN-REVERSAL-C",
    build: (state) => Object.assign(Object.create({
      repair: () => {
        state.runs += 1;
        return { ok: false };
      },
    }), { message: "SENTENCE-OWN-REVERSAL-C" }),
    expect: { messageCrossed: true, repairRuns: 0, getterRuns: 0 },
  },
  {
    name: "own message + own ACCESSOR repair",
    sentence: "SENTENCE-OWN-REVERSAL-D",
    build: (state) => {
      const outcome = { message: "SENTENCE-OWN-REVERSAL-D" };
      Object.defineProperty(outcome, "repair", {
        enumerable: true,
        configurable: true,
        get() {
          state.getterRuns += 1;
          return () => {
            state.runs += 1;
            return { ok: false };
          };
        },
      });
      return outcome;
    },
    expect: { messageCrossed: true, repairRuns: 0, getterRuns: 0 },
  },
  {
    name: "own message + own DATA repair (the judgement READS it — the positive control)",
    sentence: "SENTENCE-OWN-REVERSAL-E",
    build: (state) => ({
      message: "SENTENCE-OWN-REVERSAL-E",
      repair: () => {
        state.runs += 1;
        return { ok: false };
      },
    }),
    // The judgement READS this repair and RUNS it, and the entry then carries the credit's own sentence rather
    // than the outcome's message — which is why `messageCrossed` is `false` here even though `message` is own.
    expect: { messageCrossed: false, repairRuns: 1, getterRuns: 0, creditSentence: true },
  },
  {
    name: "the PASS arm (`true` — nothing to judge, so the rollback LANDS)",
    sentence: null,
    build: () => true,
    expect: { passArm: true },
  },
];

/** **DRIVE ONE MEMBERSHIP CASE AT THE REVERSAL'S JUDGEMENT.** Two landings at `REVERSED_AT`; the pair is
 *  registered while the state passes (so it is CARRIED); then `rollback` of the SECOND landing's op drives the
 *  reversal, whose set is the address it restores and whose judgement asks the pair there. `asked` is the
 *  coherence fact that the reversal really did ask it — a drive that refuses without asking would make every
 *  reading below vacuous. */
function driveReversal(caseSpec) {
  const store = make();
  const state = { runs: 0, getterRuns: 0 };
  const outcome = caseSpec.build(state);
  const firstLanding = attempt(() => store.write(REVERSED_AT, "mem", 1));
  const secondLanding = attempt(() => store.write(REVERSED_AT, "mem", 2));
  let phase = "registration";
  let asked = 0;
  const registration = attempt(() => store.addConstraint({ address: REVERSED_AT, id: PAIR_ID }, () => {
    asked += 1;
    return phase === "registration" ? true : outcome;
  }));
  phase = "reversal";
  const askedBeforeTheAct = asked;
  const opId = secondLanding.ok === true && secondLanding.value !== null
    && typeof secondLanding.value.op === "object" && secondLanding.value.op !== null
    ? secondLanding.value.op.opId
    : null;
  const rollback = attempt(() => store.rollback(opId));
  const said = rollback.ok === true ? null : judgementSaid(rollback.caught);
  return {
    case: caseSpec.name,
    registration: statusOf(registration),
    pairCarried: store.constraints().some((row) => row.id === PAIR_ID),
    firstLanding: statusOf(firstLanding),
    secondLanding: statusOf(secondLanding),
    askedAtTheReversal: asked - askedBeforeTheAct,
    rollback: statusOf(rollback),
    undoneOps: rollback.ok === true && rollback.value !== null ? rollback.value.undoneOps : null,
    crossedTheCasesOwnSentence: said === null ? false : said.includes(caseSpec.sentence),
    entrySaid: said,
    repairRunsAtTheJudgement: state.runs,
    getterRunsAtTheJudgement: state.getterRuns,
  };
}

test("P-SROM-2 · THE THIRD INSTANT IS CONFORMING AND NOT QUANTIFIED (G1-8; PIN-8 (iii)): the reversal's judgement is DRIVEN at the public surface — a `rollback` over a state a carried pair refuses — and it reads the closed outcome by the own-property rule, crossing an OWN `message`, crossing NO inherited one, running an own data `repair` and reading no inherited or accessor one", (t) => {
  const rows = REVERSAL_CASES.map((caseSpec) => driveReversal(caseSpec));
  t.diagnostic(`P-SROM-2 · the third instant, DRIVEN row by row: ${JSON.stringify(rows)}`);

  // ── THE DRIVE'S COHERENCE, ASSERTED BEFORE ANY VERDICT: every row really reached the judgement. ─────────
  for (const row of rows) {
    assert.equal(row.firstLanding, "STOOD",
      `**P-SROM-2 · THE DRIVE'S COHERENCE — the first landing at the pair's address must stand** (\`PIN-8\` `
        + `(iii): the judgement's subject is the CHANGE the reversal made): the drive read ${JSON.stringify(row)}`);
    assert.equal(row.secondLanding, "STOOD",
      "and the second landing too — it is the op the rollback names and the state the reversal restores: the "
        + `drive read ${JSON.stringify(row)}`);
    assert.equal(row.registration, "STOOD",
      "and the pair must be CARRIED, which is what puts it in the reversal's own set (`pairAppliesAt`): the "
        + `drive read ${JSON.stringify(row)}`);
    assert.equal(row.pairCarried, true,
      "with its row standing in `constraints()`: the drive read " + `${JSON.stringify(row)}`);
    assert.equal(row.askedAtTheReversal, 1,
      `**P-SROM-2 · THE DRIVE'S COHERENCE — THE REVERSAL MUST ASK THE PAIR EXACTLY ONCE for the row "${row.case}"** `
        + "(`bindings/js/src/entry/constraints.mjs:2810`-`:2813`: the judgement's walk asks each reached pair, and "
        + `\`reversalOutcome\` is the only site that evaluates a closed outcome there): the drive counted `
        + `${row.askedAtTheReversal} ask(s). **A ROW THAT NEVER REACHED THE JUDGEMENT MEASURES NOTHING** — the `
        + `drive read ${JSON.stringify(row)}`);
  }

  // ── THE JUDGEMENT'S OWN OUTCOME READ, CASE BY CASE: the `message` membership. ───────────────────────────
  for (const row of rows) {
    const spec = REVERSAL_CASES.find((caseSpec) => caseSpec.name === row.case);
    if (spec.expect.passArm === true) continue;
    assert.equal(row.crossedTheCasesOwnSentence, spec.expect.messageCrossed,
      `**P-SROM-2 · THE THIRD INSTANT'S \`message\` READ — the row "${row.case}"**`
        + "(bindings/js/src/entry/constraints.mjs:2810, :3592: `Object.hasOwn(outcome, 'message')` gates the violation arm and "
        + `\`ownDataMember(outcome, 'message')\` supplies the sentence, so an OWN string \`message\` is crossed and `
        + "an INHERITED one is not). "
        + (spec.expect.messageCrossed
          ? `**THE JUDGEMENT DID NOT CROSS THE CALLER'S OWN SENTENCE, which the own-property rule requires it to do.** `
          : `**THE JUDGEMENT CROSSED THE CALLER'S INHERITED SENTENCE, which the own-property rule forbids: it read a `
            + "member it must not read — the chain read `PIN-2` converts away at the two other instants.** ")
        + `The entry said ${JSON.stringify(row.entrySaid)}; the whole table is ${JSON.stringify(rows)}`);
  }

  // ── THE JUDGEMENT'S OWN `repair` READ: own DATA read and run, inherited and accessor read by neither. ──
  for (const row of rows) {
    const spec = REVERSAL_CASES.find((caseSpec) => caseSpec.name === row.case);
    if (spec.expect.passArm === true) continue;
    assert.equal(row.repairRunsAtTheJudgement, spec.expect.repairRuns,
      `**P-SROM-2 · THE THIRD INSTANT'S \`repair\` READ — the row "${row.case}"** `
        + "(`bindings/js/src/entry/constraints.mjs:2811`: the repair comes off "
        + "`ownDataMember(outcome, 'repair')` and that answer must be a function, so an own DATA repair is read "
        + "and RUN, while an inherited one and an own ACCESSOR one are read by NO instant). "
        + `The judgement ran the repair ${row.repairRunsAtTheJudgement} time(s); the whole table is `
        + `${JSON.stringify(rows)}`);
    assert.equal(row.getterRunsAtTheJudgement, spec.expect.getterRuns,
      `**P-SROM-2 · THE THIRD INSTANT RUNS NO GETTER — the row "${row.case}"** (a descriptor read answers an `
        + "accessor's value as `undefined` and executes no caller code, which is the same form the two converted "
        + `instants hold; \`PIN-2\` (i)): it ran the getter ${row.getterRunsAtTheJudgement} time(s)`);
  }

  // ── AND THE POSITIVE CONTROL: the judgement's credit sentence is the one its own rule requires. ─────────
  const ownRepairRow = rows.find((row) => row.case === REVERSAL_CASES[4].name);
  assert.equal(ownRepairRow.rollback, "ConstraintPassRefused",
    "**P-SROM-2 — THE JUDGEMENT THAT READ AN OWN REPAIR AND RECEIVED NO OP REFUSES AT RANK 20** "
      + "(`bindings/js/src/entry/constraints.mjs:1057`'s credit sent by the judgement's own composer): the drive "
      + `read ${JSON.stringify(ownRepairRow)}`);
  assert.equal(typeof ownRepairRow.entrySaid === "string" && ownRepairRow.entrySaid.includes("produced no op"), true,
    "**AND ITS ENTRY CARRIES THE CREDIT'S OWN SENTENCE — the observable that says the repair WAS READ** "
      + `(\`kernel-attempt.mjs:1057\`-:\`1060\`): the drive read ${JSON.stringify(ownRepairRow.entrySaid)}`);

  // ── AND THE PASS ARM: where the pair answers `true` at the judgement there is nothing to refuse. ────────
  const passRow = rows.find((row) => row.case === REVERSAL_CASES[5].name);
  assert.equal(passRow.rollback, "STOOD",
    "**P-SROM-2 — THE PASS ARM AT THE JUDGEMENT MUST LET THE ROLLBACK LAND: the drive has a third instant that "
      + "can PASS, which is what makes its refusals above attributable to the shapes and not to the act** "
      + `(\`PIN-3\` (ix); \`verification.md §3\`): the drive read ${JSON.stringify(passRow)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// P-SROM-3 — THE CONVERSION IS A NARROWING AND NEVER A WIDENING (`verification.md §3`). For every generated
// outcome shape: the set of shapes the registration reads a repair off AFTER the conversion is a SUBSET of the
// set it read one off BEFORE, and the set of shapes on which an own-property form answers "carries" EQUALS the
// set the gate passes. FALSIFIER: a shape that newly registers a repair.
//
// **THE THREE SETS, EACH READ WHERE IT LIVES.** `BEFORE` and `AFTER` are computed here as the two forms
// (`chainCarries`, `ownCarriesRepair`) over FRESH instances; the OBSERVED set is what the tree's registration
// actually did — the repair's own invocations. Today `OBSERVED = BEFORE` and `AFTER ⊊ BEFORE`, so the property
// fails; after the conversion `OBSERVED = AFTER` and the narrowing holds.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
test("P-SROM-3 · THE CONVERSION IS A NARROWING, NEVER A WIDENING (PIN-3; PIN-7 (i)): the set of generated shapes the registration reads a repair off equals the own-property form's set and is a SUBSET of the chain form's set", (t) => {
  const table = OUTCOMES.map((spec) => {
    // FRESH instances for the two labels: the chain form RUNS an accessor, so it must never touch the instance
    // the observed drive reads.
    const labelState = { runs: 0, getterRuns: 0, store: null };
    const beforeShape = spec.build(labelState);
    const afterState = { runs: 0, getterRuns: 0, store: null };
    const afterShape = spec.build(afterState);
    const observed = driveOutcome(spec);
    return {
      name: spec.name,
      arm: spec.arm,
      beforeTheConversion: chainCarries(beforeShape),
      afterTheConversion: ownCarriesRepair(afterShape),
      observed: observed.repairRunsAtTheRegistration > 0,
      registration: observed.registration,
    };
  });
  t.diagnostic(`P-SROM-3 the three sets, shape by shape, taken at this checkout: ${JSON.stringify(table)}`);

  const names = (predicate) => table.filter(predicate).map((row) => row.name).sort();
  const beforeSet = names((row) => row.beforeTheConversion);
  const afterSet = names((row) => row.afterTheConversion);
  const observedSet = names((row) => row.observed);
  t.diagnostic(`P-SROM-3 BEFORE = ${JSON.stringify(beforeSet)}`);
  t.diagnostic(`P-SROM-3 AFTER (the own-property form) = ${JSON.stringify(afterSet)}`);
  t.diagnostic(`P-SROM-3 OBSERVED at this checkout = ${JSON.stringify(observedSet)}`);

  // (a) THE NARROWING ITSELF, which no tree can defeat: every shape the own form calls CARRIES is one the chain
  //     form called CARRIES, so the conversion can only remove shapes from the set and never add one.
  for (const member of afterSet) {
    assert.equal(beforeSet.includes(member), true,
      `**P-SROM-3 — THE CONVERSION MUST NOT WIDEN: "${member}" is read by the own-property form AFTER and was `
        + `NOT read by the chain form BEFORE** (\`verification.md §3\`'s falsifier: a shape that newly registers a `
        + `repair). THE THREE SETS: BEFORE ${JSON.stringify(beforeSet)} · AFTER `
        + `${JSON.stringify(afterSet)} · OBSERVED ${JSON.stringify(observedSet)}**`);
  }
  // (b) THE SET THE GATE PASSES EQUALS THE SET THE OWN-PROPERTY FORM NAMES.
  assert.deepEqual(observedSet, afterSet,
    "**P-SROM-3 — THE SET OF SHAPES THE REGISTRATION READS A REPAIR OFF MUST BE THE SET THE OWN-PROPERTY FORM "
      + "ANSWERS \"CARRIES\" FOR** (`verification.md §3`: *the set of shapes on which an own-property form "
      + "answers \"carries\" equals the set the gate passes*). It is not, so the registration's gate and its "
      + "value read are the chain's and not the own form's — RED FOR THE DIVERGENCE. THE THREE SETS: BEFORE "
      + `${JSON.stringify(beforeSet)} · AFTER ${JSON.stringify(afterSet)} · OBSERVED `
      + `${JSON.stringify(observedSet)} · SHAPE BY SHAPE: ${JSON.stringify(table)}**`);
  // (c) AND THE OBSERVED SET NEVER EXCEEDS THE CHAIN FORM'S — the subset relation the row states over the two
  //     trees, read here over the two forms.
  for (const member of observedSet) {
    assert.equal(beforeSet.includes(member), true,
      `**P-SROM-3 — the registration read a repair off "${member}", which the chain form does not call CARRIES `
        + `either: the generator and the tree disagree about the shape, and that is a defect of this cell. THE `
        + `THREE SETS: ${JSON.stringify({ beforeSet, afterSet, observedSet })}**`);
  }
});
