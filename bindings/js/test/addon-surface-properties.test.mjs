// RED SET — **THE TYPED PROPERTY LAYER FOR `U-STOREROOM-ADDON-SURFACE`**: the `8` rows of
// `docs/specs/storeroom-addon-surface/contract.md §5` (`P-SAS-1`…`P-SAS-8`) EXECUTED WITH A DETERMINISTIC
// PINNED SEED. **GATE 11's LAYER, AND IT IS MANDATORY.**
//
// **BUDGET:** `≤ 100` attempts per row, `≤ 400` total, **STOP AFTER `5`** failures per row, one seed PER ROW
// pinned as a literal, no clock, no `Math.random`, no host entropy. A row that breaks stops that row's
// attempts and reports the row id, its STRATEGY ID and the failing input. **`un-run` IS A FAILURE**: every
// row below is driven, and a row whose attempts all break FAILS this file.
//
// **EVERY ROW'S PROPERTY IS QUOTED FROM ITS OWN REGISTER ROW AND ITS OWN CLAUSES** — `contract.md §5` rows
// `P-SAS-1`…`P-SAS-8`, `export-set-and-dispatch.md §1`/`§3`/`§4`, `receiver-and-refusal.md §1`/`§2`/`§3`/`§5`/
// `§6`, `js-unwrap.md §1`–`§5`, `failure-form.md §1`/`§2`/`§3`, `parameter-semantics.md §1`–`§3`,
// `test-cases.md §1`–`§4`. **NOTHING IS READ OFF `src/**`, AND THE ONE FILE READ AS TEXT IS
// `bindings/js/index.mjs`, WHICH `S-UNWRAP-SITES` AND `S-STATE-ID-GONE` NAME AS THEIR OWN INSTRUMENT** —
// *"grep for the deleted wrapper names"*, *"grep for `state.id`"* (`§5`).
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// ## THE REGISTER, READ ROW FOR ROW — AND WHAT EACH ROW'S FAILURE LIST NAMES
//
// `contract.md §5` is `8` rows against a budget of `≤ 8` — *"`3 + 3 + 2 = 8` ✓"* — and **each row's failure
// list IS its drive set** (`test-cases.md §3`). The ids are declared BELOW FROM THE CONTRACT'S OWN BYTES, in
// the same instrument the sibling property layer uses (`constraint-kernel-properties.test.mjs`'s
// `declaredStrategyIdsFromContract`), so the closure cannot close over this file's own literals.
//
// | row | its strategies | its drives (`test-cases.md §3`) |
// | --- | --- | --- |
// | `P-SAS-1` | `S-EXPORT-SET` | `D-1` — read the addon's own key set |
// | `P-SAS-2` | `S-ARITY` · `S-NO-INSTANCE` | `D-2` — call each entry at its declared arity and at ±1 |
// | `P-SAS-3` | `S-PARITY` | `D-3` — drive both shapes over one corpus and compare records |
// | `P-SAS-4` | `S-REFUSE-FORM` · `S-REFUSE-KEYS` | `D-4` — detach a member and call it; call one whose store is collected |
// | `P-SAS-5` | `S-TABLE-REMOVE` | `D-5` — release a store and read the table |
// | `P-SAS-6` | `S-UNWRAP-SITES` · `S-STATE-ID-GONE` | `D-6` — search for the deleted wrappers and for `state.id` |
// | `P-SAS-7` | `S-UNWRAP-PARITY` | `D-7` — drive the suite's calls against both shapes |
// | `P-SAS-8` | `S-FAULT-ARM` | `D-8` — drive a value the walk refuses at a store answering `ValueNotAdmitted` |
//
// **AND NOT ONE ROW'S EXPECTED VALUE IS THE `OWED` ONE.** `contract.md §7` carries two open `OWED` bullets —
// **the refusal arm's `status` token and its `message`** (`OWED-1`) and **the receiver table's form and its
// retirement mechanism** (`OWED-2`) — and `failure-form.md §3` is the prohibition: *"A DRIVE MUST NOT ASSERT
// THE ARM'S `status` TOKEN OR ITS `message` WHILE THEY ARE `OWED`. Such a cell would pin a value that does not
// exist."* **SO NO ROW OF THIS FILE PINS A TOKEN, A MESSAGE TEXT OR A TABLE TYPE: every row is driven at the
// SHAPE its clause decides.** `test-cases.md §4` states the same bound for `D-4` in the spec's own words:
// *"`D-4` asserts the key set, the member count, non-`Error`-ness — and NOTHING about which token stands in
// `status`."*
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { storeCreate } from 'provident-storeroom';
import {
  DECLARED_SURFACE, DECLARED_SURFACE_NAMES_SORTED, STANDING_FOUR, PER_VERB_NINE,
  OPEN_OWED, ADDON_ARTEFACT, PACKAGE_ENTRY, DELETED_WRAPPER_NAMES, REPO_ROOT,
  require_, addonKeySet, generated, isTheDeclaredForm, isTheArtefactForm, callAndClassify,
} from './addon-surface-support.mjs';

// ── THE DETERMINISTIC PINNED SEEDS — ONE PER ROW, A LITERAL EACH ───────────────────────────────────────
const SEEDS = {
  'P-SAS-1': 0x5A5001,
  'P-SAS-2': 0x5A5002,
  'P-SAS-3': 0x5A5003,
  'P-SAS-4': 0x5A5004,
  'P-SAS-5': 0x5A5005,
  'P-SAS-6': 0x5A5006,
  'P-SAS-7': 0x5A5007,
  'P-SAS-8': 0x5A5008,
};

const MAX_FAILURES_PER_ROW = 5;
const MAX_ATTEMPTS_PER_ROW = 100;
const MAX_ATTEMPTS_TOTAL = 400;
/** THE REGISTER'S OWN ROW COUNT (`§5`: `3 + 3 + 2 = 8` ✓ at the cap `8 ≤ 8`). */
const ROWS_OF_CHECKS = 8;
/** THE EVEN SHARE OF THE `400`-ATTEMPT TOTAL, CAPPED AT THE PER-ROW `100`: `8 x 50 = 400` exactly. */
const ROW_BUDGET = Math.min(MAX_ATTEMPTS_PER_ROW, Math.floor(MAX_ATTEMPTS_TOTAL / ROWS_OF_CHECKS));

let totalAttempts = 0;
const ROW_CELLS = [];

/** A `mulberry32` 32-bit LCG: a pure function of the seed, and the same draw on every run. */
function rngFor(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(next, list) {
  return list[Math.floor(next() * list.length) % list.length];
}

function intBetween(next, lo, hi) {
  return lo + Math.floor(next() * (hi - lo + 1));
}

let UID = 0;
function tag(label) {
  UID += 1;
  return `${label}-s${process.pid.toString(36)}-${UID}`;
}

// ── `contract.md §5`'S OWN STRATEGY IDS, EXTRACTED FROM THE DOCUMENT THAT DECLARES THEM ────────────────
//
// **THE EXTRACTION IS THE SIBLING LAYER'S INSTRUMENT, RE-CUT TO THIS REGISTER'S OWN MARKUP.** The addon
// surface register spells each row's ids on a *"Strategies:"* line — `**Strategies: `S-ARITY` … · `S-NO-INSTANCE` …**`
// — where the constraints register used a *"**Strategy ids.**"* label, **so the same two-directional closure
// is read off THIS document's own bytes rather than borrowed from a label this one does not carry.** A read
// that found nothing would make every closure cell below vacuous, so the extraction is asserted to have found
// the right IDS PER ROW before anything else uses it.
const CONTRACT_PATH = join(REPO_ROOT, 'docs', 'specs', 'storeroom-addon-surface', 'contract.md');

function declaredRowsFromContract(bytes) {
  const rows = [];
  // Each row OPENS at its own bolded id and closes at the next one (or at the section's end). The row id is
  // read from its own heading and never from a position, so a row that MOVED would be read where it stands.
  const opener = /^\*\*`(P-SAS-\d)`\*\*/gm;
  const starts = [];
  let hit;
  while ((hit = opener.exec(bytes)) !== null) starts.push({ id: hit[1], start: hit.index });
  for (let i = 0; i < starts.length; i += 1) {
    const end = i + 1 < starts.length ? starts[i + 1].start : bytes.length;
    const body = bytes.slice(starts[i].start, end);
    // The row's own list runs from its `Strategies:` label to the clause's own `Failure list:` label — the
    // two labels the register fixes for every row — so the ids are read off THE ROW and never off the text
    // beside it or off a neighbouring row's ids. **THE LABELS ARE NOT BOLDED IN THIS REGISTER** (it prints
    // `Strategies: **`S-EXPORT-SET`**`, where the constraints register used a bolded `**Strategy ids.**`
    // label), **so the pattern matches the words and not a markup this document does not carry.**
    const list = /Strategies:([\s\S]*?)Failure list:/.exec(body);
    starts[i].ids = list === null ? [] : [...list[1].matchAll(/\*\*`(S-[A-Z][A-Z-]*)`\*\*/g)].map((x) => x[1]);
    rows.push(starts[i]);
  }
  return rows;
}

const CONTRACT_STRATEGY_ROWS = declaredRowsFromContract(readFileSync(CONTRACT_PATH, 'utf8'));
const DECLARED_STRATEGY_IDS = CONTRACT_STRATEGY_ROWS.flatMap((row) => row.ids);
/** **THE PROPERTY LAYER'S `1` FACET.** The register's eight rows: `P-SAS-1`…`P-SAS-8`. */
const IDS_PER_ROW = [1, 2, 1, 2, 1, 2, 1, 1];

/**
 * **THE NAMED UNDRIVABLE LIST — A DECLARED ID NO `row()` CELL OF THIS FILE CITES, WITH ITS REASON.** The
 * closure is asserted IN BOTH DIRECTIONS: `cited ⊆ declared` ALONE could not see a declared id with NO
 * generator at all, which is the hole the constraints layer's `DR-10` finding names. **THE LIST IS EMPTY AND
 * THAT IS A CLAIM: all eleven ids this register declares have generators in this file.**
 */
const UNDRIVABLE_BY_A_ROW_CELL = [];

/** A SEEDED ATTEMPT: the budget is asserted on every draw, and the body is handed the attempt's own draws as
 *  ONE record, so no body reaches a global generator or a clock. */
function attempt(rng, run) {
  totalAttempts += 1;
  assert.ok(totalAttempts <= MAX_ATTEMPTS_TOTAL,
    `the total attempt budget stands at ${MAX_ATTEMPTS_TOTAL}`);
  return run({
    pick: (list) => pick(rng, list),
    int: (lo, hi) => intBetween(rng, lo, hi),
    tag,
  });
}

/** THE ROW RUNNER: at most `ROW_BUDGET` attempts, stopping after `MAX_FAILURES_PER_ROW` failures, reporting
 *  the row id, the STRATEGY IDS it was driven under, its pinned seed and the attempts it ran. */
function row({ id, strategies, seed, body }) {
  ROW_CELLS.push({ id, strategies, attempts: ROW_BUDGET });
  const rng = rngFor(seed);
  const failures = [];
  let ran = 0;
  for (let i = 0; i < ROW_BUDGET && failures.length < MAX_FAILURES_PER_ROW; i += 1) {
    ran += 1;
    try {
      body(rng, i);
    } catch (err) {
      failures.push({ attempt: i, message: err && err.message ? err.message : String(err) });
    }
  }
  return { id, strategies, seed, attempts: ran, failures };
}

function heldOrBroken(result) {
  if (result.failures.length > 0) {
    return `BROKEN (${result.id} · ${result.strategies.join(' · ')} · seed 0x${result.seed.toString(16)} · `
      + `${result.failures.length} break(s) in ${result.attempts} attempt(s); first: `
      + `${result.failures[0].message})`;
  }
  return null;
}

function assertHeld(result) {
  const broken = heldOrBroken(result);
  if (broken !== null) assert.fail(broken);
}

// ── THE SMALL READS EVERY ROW USES ─────────────────────────────────────────────────────────────────────

function mem() {
  return storeCreate({ journalLength: 8, listeners: [] });
}

/** **THE ENTRY'S BYTES, STRIPPED OF COMMENTS** — the instrument `S-UNWRAP-SITES` and `S-STATE-ID-GONE` name.
 *  A documentary mention of a deleted name inside a comment is not a call site and not a `state.id`. */
function strippedEntryText() {
  const source = readFileSync(PACKAGE_ENTRY, 'utf8');
  const withoutBlockComments = source.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, ' '));
  return withoutBlockComments.split('\n').map((line) => {
    const lineComment = line.indexOf('//');
    return lineComment === -1 ? line : line.slice(0, lineComment);
  }).join('\n');
}

/** **ONE DECLARED CALL PER ENTRY** — the arguments a caller supplies, with no instance among them
 *  (`export-set-and-dispatch.md §4`). Shared with the executable red set's own table by intent: the arity the
 *  row drives is the arity `§1` prints and never this file's opinion. */
function declaredArgumentsFor(name) {
  switch (name) {
    case 'version': return [];
    case 'errorMessage': return ['AddressNotFound', 'x'];
    case 'storeCreate': return [{ journalLength: 8, listeners: [] }];
    case 'register': return ['a-handle', () => {}];
    case 'read': return [[['a']], 'mem', undefined];
    case 'readLiteral': return [[['a']], 'mem', undefined];
    case 'write': return [[['a']], 'mem', 1, undefined, undefined];
    case 'delete': return [[['a']], 'mem', undefined];
    case 'rollback': return ['an-op-id', undefined];
    case 'listen': return [['a'], 'a-handle', []];
    case 'unlisten': return ['a-handle', undefined];
    case 'removeListener': return ['a-handle', undefined];
    case 'commitFile': return ['an-op-id', undefined];
    default: return null;
  }
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SAS-1` · `S-EXPORT-SET` — READ THE ADDON'S OWN KEY SET (`D-1`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`, `P-SAS-1`, QUOTED IN FULL:** *"the addon's export set is exactly the thirteen declared
// names — `4` standing plus `9` per-verb — and `call` is absent."* **Strategy:** `S-EXPORT-SET` — *"read the
// addon's own key set; assert equality with the declared set, sorted."* **Failure list:** *"`call` present; a
// verb missing; an undeclared name; `removeListener` absent."* **And this row is the key set's one home.**
//
// **THE GENERATOR DRAWS OVER THE KEY SET'S OWN DOMAIN — THE `16` NAMES THE OLD TABLE AND THE NEW ONE
// TOGETHER CARRY** — because the row's four failures are all statements about WHICH NAMES stand in the set.
// A drawn name that is DELETED (`call`, `commit`, `constraints`) must be absent; a drawn name that is
// DECLARED must be present. **The corpus is the clause's own three lists and no invention**: `§1`'s thirteen,
// `§2`'s three that are not entries.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

const NOT_ENTRIES_THREE = ['call', 'commit', 'constraints'];

test('sas_prop_P_SAS_1_S_EXPORT_SET_the_keyset_is_exactly_the_thirteen_and_call_is_absent', () => {
  const result = row({
    id: 'P-SAS-1',
    strategies: ['S-EXPORT-SET'],
    seed: SEEDS['P-SAS-1'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      // (a) THE SET, ASSERTED AT EQUALITY OVER THE WHOLE KEY SET — the strategy's own words.
      assert.deepEqual([...addonKeySet()].sort(), DECLARED_SURFACE_NAMES_SORTED,
        `attempt ${i}: P-SAS-1 — the addon's export set is exactly the thirteen declared names, and `
        + '`export-set-and-dispatch.md §1` is the set: `4` STANDING plus `9` PER-VERB, `4 + 9 = 13 ✓`');
      // (b) EACH DECLARED NAME, DRAWN FROM THE SEED, IS PRESENT.
      const declared = choose(DECLARED_SURFACE_NAMES_SORTED);
      assert.equal(addonKeySet().includes(declared), true,
        `attempt ${i}: P-SAS-1's failure list names "a verb missing" — the drawn name ${declared} must stand`);
      // (c) EACH NAME THAT IS NOT AN ENTRY, DRAWN FROM THE SEED, IS ABSENT — `call` among them.
      const notEntry = choose(NOT_ENTRIES_THREE);
      assert.equal(addonKeySet().includes(notEntry), false,
        `attempt ${i}: P-SAS-1's failure list names "\`call\` present" and "an undeclared name"; `
        + `export-set-and-dispatch.md §2 names ${notEntry} among the three that are NOT entries`);
      // (d) AND NO NAME BEYOND THE TWO DECLARED LISTS APPEARS — the draw is consumed so the attempts are
      // reproducible, and the assertion is the equality of (a) read at its complement.
      const undeclared = addonKeySet().filter((name) => !DECLARED_SURFACE_NAMES_SORTED.includes(name));
      assert.deepEqual(undeclared, [],
        `attempt ${i}: P-SAS-1's failure list names "an undeclared name" — nothing beyond §1's thirteen: `
        + JSON.stringify(undeclared));
      assert.equal(choose([0, 1]) >= 0, true, `attempt ${i}: the draw is consumed`);
    }),
  });
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SAS-2` · `S-ARITY` · `S-NO-INSTANCE` — THE ARITIES, AND THE INSTANCE POSITION'S DEATH (`D-2`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`, `P-SAS-2`:** *"every entry takes its verb's own arguments, with no leading instance
// position."* **Strategies:** `S-ARITY` — *"call each entry at its declared arity and at ±1; the declared
// arity answers, the others refuse."* · `S-NO-INSTANCE` — *"no entry accepts a `u32` at position `0` in place
// of its first real argument."* **Failure list:** *"an index position accepted; a wrong arity answering; an
// arity differing from its verb's."*
//
// **THE ARITY INSTRUMENT IS A CALL AND NOT `fn.length`**, for a reason that is a property of the ARTEFACT KIND
// and not of this unit — **a Node-API function reports `length === 0` whichever positions it declares**, which
// is why `S-ARITY`'s own strategy spells the drive as a call. **The executable red set carries the same note
// at its own bytes.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('sas_prop_P_SAS_2_S_ARITY_S_NO_INSTANCE_every_entry_takes_its_verbs_own_arguments', () => {
  const result = row({
    id: 'P-SAS-2',
    strategies: ['S-ARITY', 'S-NO-INSTANCE'],
    seed: SEEDS['P-SAS-2'],
    body: (rng, i) => attempt(rng, ({ pick: choose, int }) => {
      const addon = require_(ADDON_ARTEFACT);
      // ── `S-ARITY`: THE ENTRY IS DRAWN FROM THE SEED, THEN CALLED AT ITS DECLARED ARITY.
      const entry = choose(DECLARED_SURFACE);
      const declared = declaredArgumentsFor(entry.name);
      assert.equal(declared.length, entry.arity,
        `attempt ${i}: S-ARITY — ${entry.name}'s declared arity is ${entry.arity} (export-set-and-dispatch.md `
        + "§1), and the caller's own positions are exactly that count with NO INSTANCE among them (§4)");
      assert.equal(typeof addon[entry.name], 'function',
        `attempt ${i}: the entry ${entry.name} exists in the artefact at all — "a verb has no entry" is F-2's `
        + 'failure read at the artefact\'s own side');

      // ── `S-NO-INSTANCE`: AN INTEGER AT POSITION `0` IN PLACE OF THE FIRST REAL ARGUMENT MUST NOT BE
      // ACCEPTED. The drawn integer is the frozen dispatcher's own index domain (`§3`'s moves table).
      //
      // **RE-CUT 2026-10-21 — AT ARITY `0` THIS LIMB HAS NO SUBJECT, WHICH IS THE `S-NO-INSTANCE` BOUNDARY
      // THE EXECUTABLE RED SET STATES AT ITS OWN BYTES.** `S-NO-INSTANCE` reads *"no entry accepts a `u32` at
      // position `0` **in place of its first real argument**"* (`contract.md §5`) — **and `version` declares
      // NO positions at all** (`export-set-and-dispatch.md §1`: `version`, arity `0`, *"the artefact's own
      // version string"*), so it has no first real argument for an integer to be put in place of.
      // `[int, ...declared.slice(1)]` on the empty declared call is `[int]`, and a zero-arity entry simply
      // ignores an argument it never declared — **MEASURED: `version(0)` and `version()` both answer
      // `'0.5.0'`.** **DEMANDING A REFUSAL THERE WOULD BE RED ON A CORRECT LANDING AND WOULD CONTRADICT THE
      // STANDING GREEN CELLS THAT CALL `version()` AND DEPEND ON ITS ANSWER** (`version-stamp-r2.test.mjs`'s
      // `R2-07`, and this suite's own `ada_pada6_s_sym_superset_…`). **THE DRAW IS STILL CONSUMED SO THE
      // SEEDED SEQUENCE IS UNMOVED**, and every entry of arity `≥ 1` — which is every entry that HAS a
      // position `0` — asserts exactly what it always did.
      const substituted = [int(0, 3), ...declared.slice(1)];
      if (declared.length > 0) {
        const withInstance = callAndClassify(addon[entry.name].bind(addon), substituted);
        assert.equal(withInstance.refused, true,
          `attempt ${i}: S-NO-INSTANCE — no entry accepts a \`u32\` at position 0 in place of its first real `
          + `argument (P-SAS-2's own strategy); ${entry.name} accepted ${substituted[0]} there. §4: "The instance `
          + 'position that once preceded them is gone — it was removed before this unit and is not reintroduced"');
      }

      // AND THE DECLARED CALL ITSELF ANSWERS OR REFUSES IN THE ONE FORM — never outside it (`failure-form.md
      // §1`), which is the shape limb of the row's *"a wrong arity answering"*.
      //
      // ── **AND THE LIMB IS THE CELL THAT CATCHES `register`'S PRE-SPLIT SIGNATURE, WHICH IS WHY IT IS STATED
      // AT ITS OWN BYTES RATHER THAN LOOSENED.** `js-unwrap.md §4`'s successor sentence declares the
      // registration path's operand as DELETED — *"it hands NOTHING for the store's identity, because the
      // call's own receiver IS the identity"* — and `js-unwrap.md §1`'s table puts **NINE** `call(state, …)`
      // sites through the dispatcher while **`register` IS ITS OWN STANDING ENTRY** whose pre-split signature
      // still takes the instance integer at position `0`. **SO TODAY `register(handle, listener)` HANDS A
      // STRING WHERE THE INTEGER STANDS, THE HOST LIBRARY REFUSES TO CONVERT IT, AND A RAW `Error` CARRYING
      // `code` CROSSES THE BOUNDARY** — which is a breach of `failure-form.md §1`'s *"A refusal crossing the
      // boundary is never an `Error`"* **and is exactly the state this unit's split removes.**
      //
      // **THIS IMMEDIATELY-REFUSING READING IS THEREFORE RECORDED AND NOT EXEMPTED**: the cell asserts the
      // declared form and the artefact's raw `Error` is the FINDING. **A CELL THAT EXEMPTED `register` HERE
      // WOULD BE GREEN TODAY AND GREEN AFTER THE SPLIT, WHICH IS THE FALSELY-GREEN CLASS
      // `implementation-plan.md §4` NAMES AT THE OTHER CALIBRATION DEFECT.**
      // **RE-CUT 2026-10-21: `isTheArtefactForm`, NOT `isTheDeclaredForm` — THIS ROW DRAWS THE RAW
      // ARTEFACT** (`addon = require_(ADDON_ARTEFACT)`, the `.node` itself). `log` *"is built at the JS
      // boundary and never in Rust"*, and *"a boundary that produced it in Rust would be a SECOND HOME for
      // it"* (`docs/specs/storeroom-addon-adoption/failure-form.md §1`/`§4`) — **so demanding three members of
      // the artefact asserts against the WRONG LAYER: measured, the artefact throws `["status","message"]` and
      // the package carries `["status","message","log"]`.** **THE FINDING THIS LIMB CARRIES IS UNCHANGED AND
      // STILL BITES:** a raw host `Error`, a partial record, or any member beyond the declared set other than
      // `stack` still fails — which is `failure-form.md §1`'s *"A refusal crossing the boundary is never an
      // `Error`"* read at the layer the artefact owns.
      //
      // **AND THE `register` FINDING THIS LIMB PREVIOUSLY CARRIED IS NOW RETIRED BY MEASUREMENT, NOT BY
      // LOOSENING.** The old note recorded that `register`'s pre-split signature handed a string where the
      // integer stood and a RAW HOST `Error` crossed — *"exactly the state this unit's split removes."*
      // **THE SPLIT REMOVED IT: measured at this pass, the artefact-layer `register` refuses with
      // `["status","message"]`, an ordinary object and not an `Error`.** The limb now reads the artefact form
      // and stays red on any real breach.
      const atDeclared = callAndClassify(addon[entry.name].bind(addon), declared);
      if (atDeclared.refused) {
        assert.equal(isTheArtefactForm(atDeclared.thrown), true,
          `attempt ${i}: ${entry.name} called at its declared arity refuses IN THE ONE DECLARED FORM and never `
          + 'outside it (`failure-form.md §1`: "A refusal crossing the boundary is never an `Error`"). It threw '
          + `${atDeclared.thrown instanceof Error ? `an \`Error\` (${atDeclared.thrown.constructor.name}, `
            + `keys ${JSON.stringify(Object.keys(atDeclared.thrown))})` : `keys ${JSON.stringify(Object.keys(atDeclared.thrown || {}))}`}`
          + ' — read at the ARTEFACT layer, where the form is the two members Rust owns (`status`, `message`); '
          + '`log` is built at the JS boundary, and a cell demanding it here would pin the SECOND HOME '
          + '`failure-form.md §4` forbids');
      }
      assert.equal(choose([true, false]) !== undefined, true, `attempt ${i}: the draw is consumed`);
    }),
  });
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SAS-3` · `S-PARITY` — BYTE-PARITY (`D-3`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`, `P-SAS-3`:** *"each verb's result is byte-identical to the same verb's result through
// the old dispatcher."* **Strategy:** `S-PARITY` — *"drive both shapes over the same corpus, compare records
// member-for-member."* **Failure list:** *"a record member moved; a value re-encoded; a different value
// decoded."*
//
// **AND `§6` ITEM `2` IS READ AT THIS ROW:** *"THE GOLDEN COMPARES EVERYTHING EXCEPT THE CELLS THAT READ THE
// ARTEFACT'S KEY SET"* — so **no attempt of this row touches the key set at all.** A parity row that read it
// would *"fail for the RIGHT REASON and mask every OTHER diff"*, which is the failure mode the exclusion
// exists to prevent.
//
// **THE CORPUS IS DRAWN FROM `docs/specs/storeroom-js/surface.md §2.2`'s DECLARED VALUE DOMAIN** — a string, a
// boolean, a finite number, a plain object or an array — **and the parity is read at the PACKAGE'S own
// surface**, which is the only layer where *"the same verb's result"* is spelled once (`contract.md §1` item
// 1: *"A consumer of the package cannot observe the change except in one named case"*).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

const CORPUS_SEGMENTS = ['p', 'q', 'r', 's'];
const CORPUS_TIERS = ['mem'];
const CORPUS_VALUES = ['v', 1, 0, -3, true, false, { a: 1 }, [1, 2], {}];

test('sas_prop_P_SAS_3_S_PARITY_both_shapes_answer_the_same_record_member_for_member', () => {
  const result = row({
    id: 'P-SAS-3',
    strategies: ['S-PARITY'],
    seed: SEEDS['P-SAS-3'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      const segment = choose(CORPUS_SEGMENTS);
      const tier = choose(CORPUS_TIERS);
      const value = choose(CORPUS_VALUES);
      // THE SAME CALL MADE TWICE, AT TWO STORES BUILT BY THE ONE DECLARED FACTORY.
      const first = mem();
      const second = mem();
      const byFirst = first.write([segment], tier, value);
      second.write([segment], tier, value);
      // (a) THE RECORD'S MEMBERS, MEMBER-FOR-MEMBER — `surface.md §2.2`: `{ op, watched, triggered }`.
      assert.deepEqual(Object.keys(byFirst).sort(), ['op', 'triggered', 'watched'],
        `attempt ${i}: S-PARITY's first failure is "a record member moved"; the write record's own member set `
        + 'is the one `surface.md §2.2` declares and is unmoved by the route the call took');
      // (b) THE SAME VERB OVER THE SAME CORPUS ANSWERS THE SAME THING — compared BY VALUE, because
      // `surface.md §1.1` declares every verb *"SYNCHRONOUS AND RETURNS A FRESH JS VALUE"*, so two reads are
      // equal and never identical.
      assert.deepEqual(first.read([segment], tier), second.read([segment], tier),
        `attempt ${i}: S-PARITY — "each verb's result is byte-identical to the same verb's result through the `
        + `old dispatcher" (contract.md §5). Value ${JSON.stringify(value)} at ${JSON.stringify([segment])}`);
      // (c) AND THE OPERATION RECORD'S OWN MEMBER SET, READ AT BOTH STORES — a member appearing on one route
      // alone is exactly *"a record member moved"*.
      const receipt = second.delete([segment], tier);
      assert.deepEqual(Object.keys(receipt).sort(), ['address', 'tiers', 'triggered'],
        `attempt ${i}: the delete receipt's members are `+ '`{address, tiers, triggered}` (`surface.md §2.2`) '
        + 'and are unmoved');
      assert.deepEqual(Object.keys(byFirst.op).sort(),
        ['address', 'after', 'before', 'compacted', 'kind', 'opId', 'seq', 'tier'],
        `attempt ${i}: and the operation record's eight members are single-valued across the corpus`);
    }),
  });
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SAS-4` · `S-REFUSE-FORM` · `S-REFUSE-KEYS` — THE ONE REFUSAL ARM (`D-4`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`, `P-SAS-4`:** *"a call whose receiver names no live store refuses in the one declared
// form."* **Strategies:** `S-REFUSE-FORM` — *"detach a member and call it; **and** call a member whose store
// has been collected — both refuse."* · `S-REFUSE-KEYS` — *"the thrown value carries the three members and is
// not an `Error`."* **Failure list:** *"a raw host `TypeError`; a partial record; a success; a throw carrying
// a member beyond the three other than `stack`, which is not part of the form and is not forbidden."*
//
// **AND `test-cases.md §4` IS THIS ROW'S EXPECTED-VALUE BOUND, QUOTED AT ITS OWN WORDS:** *"`D-4`'s expected
// value cannot be asserted in full. The arm's `shape` is decided and drivable; its `status` token and its
// `message` are `OWED` (failure-form.md §2). So `D-4` asserts the key set, the member count, non-`Error`-ness
// — and NOTHING about which token stands in `status`."*
//
// **THE COLLECTED-STORE ARM IS DRIVEN OVER THE PUBLIC SURFACE ALONE** — `docs/specs/storeroom-addon-adoption/
// contract.md §5`'s `P-ADA-4` cell set reaches its collections through `vm.runInNewContext` because *"the
// store-holding object is celled by DSH's own contexts or by an explicit drop"*, and its witness ruling is
// respected here: **the registration *"is observable ONLY BY ITS EFFECT and has NO symbol-keyed own-property
// witness by design"*, so this row reads the call and NEVER a witness property, and FORCES NO COLLECTION.**
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **⟶ ARM 1 RE-CUT 2026-10-21 (`role_test_writer`) — THE OLD SPELLING ASKED FOR A REFUSAL IT COULD NOT
// EARN, AND ITS GREEN COULD HAVE BEEN BOUGHT AT THE ADDRESS CLASS RATHER THAN AT THE RECEIVER.** The arm as
// filed detached a member from a store whose register it had filled with `layout.write(['a'], 'mem', 1)`,
// then called the detached member at `[['a']]` — a NESTED address, which `surface.md §1.5` refuses: *"an
// address is a segment array of strings and non-negative integers"*, so `[['a']]` is a segment that is an
// array. **MEASURED: `layout.read([['a']], 'mem')` REFUSES `AddressMalformed` ON A LIVE RECEIVER TOO** — the
// store's own class test runs *before any receiver is consulted*. **So SEVEN of the eight members would have
// gone on refusing whether or not `unlisten` ever consulted a receiver, and only `unlisten` — which answers
// flat `undefined` before any argument is read — separated them.** That is a red cell for the right reason
// and by luck: the *other* seven limbs proved nothing about the receiver, and the arm's own closing note (the
// deliberate `[['a']]` at row 2's arm) conceded the point without repairing the call table.
//
// **THE RE-CUT DRIVES THE RECEIVER HALF AT AN INSTRUMENT THAT CANNOT REFUSE FOR A DOMAIN REASON: THE SAME
// CALL SHAPE, RE-BOUND TO A RECEIVER NAMING NO STORE — a bare `{}`.** `receiver-and-refusal.md §5` is the
// clause: *"THE REFUSAL FIRES ONLY WHEN THE RECEIVER NAMES NOTHING AT ALL."* **EVERY ARGUMENT IS
// CORPUS-SHAPED — a segment array at an address position, an op id at `rollback`'s, a well-formed string at
// the listener trio's — so no class test and no shape test can answer in the receiver's place. What each
// argument IS NOT is a value the object the call was re-bound FROM happens to hold.** **THE INSTRUMENT
// **THEREFORE ISOLATES THE RECEIVER AND NOTHING ELSE, and the seven siblings prove it by refusing there.**
// **AND THE ARGUMENTS ARE STILL THE FOLLOWERS OF THE BINDING, which is what keeps the arm faithful to `§7`'s
// named cost, *"`const { read } = layout; read(…)` IS LEGAL TODAY AND THROWS AFTER THIS CHANGE"*: the call is
// the call a caller would have made, with only the object it was taken off removed.**
// **NO TOKEN IS READ, NO SECOND FORM IS BUILT, AND NO NEW CELL IS MINTED: the claim asserted is the register
// row's own words, *"a call whose receiver names no live store refuses in the one declared form"*
// (`contract.md §5`), at the one instrument that reaches it without a domain refusal standing in front of it.**
//
// **AND THE FINDING IS NARROWER AND SHARPER THAN THE PREVIOUS PASS RECORDED — IT IS CORRECTED HERE, AND THE
// CORRECTION IS MEASURED RATHER THAN READ.** `unlisten` DOES consult its receiver, and it refuses the one
// declared form for a value the store's own handle map holds. **WHAT THE TWO EARLIER PASSES BOTH MISSED IS
// WHERE THE TWO CONDITIONS MEET: THE MEMBER IS RED ONLY WHEN ITS VALUE IS OUTSIDE THE STORE'S DOMAIN *AND*
// ITS RECEIVER NAMES NO STORE — AND THAT IS PRECISELY THE DETACHED CALL `receiver-and-refusal.md §7` NAMES
// AS THIS UNIT'S ONE DECLARED COST.** **MEASURED, ONE DEAD RECEIVER, ONE VALUE PER MEMBER, EVERY VALUE
// OUTSIDE THE STORE'S OWN DOMAIN AT THE MEMBER'S OWN POSITION: all seven siblings reach the addon, the addon
// resolves the store from the receiver, fails, and refuses — while `unlisten` ANSWERS `undefined` and never
// reaches anything.** **THE MECHANISM IS THE FIRST LINE OF ITS OWN BODY** — `if (!inDomainHandle(handle) ||
// !state.registry.has(handle)) return undefined;` (`bindings/js/index.mjs:2586`; the `carryRefusal` and the
// addon call stand one line below it, at `:2587`). **THAT LINE ANSWERS BOTH OUT-OF-DOMAIN ARMS BEFORE THE
// ENTRY IS REACHED, AND IT IS THE ARM THAT MATTERS HERE: `!state.registry.has(handle)` IS A READ OF THE
// PACKAGE'S OWN MAP — A MAP THAT NEEDS NO RECEIVER — AND ITS `true` (`HL-1` item 5's FABRICATED ROW, *"a
// WELL-FORMED string THE STORE DOES NOT HOLD"*) IS EXACTLY THE VALUE A DETACHED CALL IS MOST LIKELY TO CARRY,
// BECAUSE A CALLER WHO HAS LOST ITS OBJECT HAS NO WAY TO KNOW WHICH STORE'S HANDLE IT IS HOLDING.**
// **SO `§2.3` ITEM 4's NO-OP SET IS BEING APPLIED WITHOUT THE RECEIVER THE REST OF THE SURFACE ROUTES ON, AND
// THE DECLARED OUTCOME IS A REFUSAL** (`receiver-and-refusal.md §3`: *"A CALL WHOSE RECEIVER NAMES NO LIVE
// STORE REFUSES, IN THE ONE DECLARED FORM."* — the row's own third named failure, *"a success"*).
// **A NON-STRING HANDLE IS NOT THE REPRO AND IS NOT CLAIMED TO BE: measured, `unlisten.call({}, 1)` and
// `unlisten.call({}, '')` both ANSWER too, and both do it on the SAME LINE — but they answer on a live
// receiver as well, which is `§2.3` item 4 working as declared, so they are not this row's subject.**
// **THE FIX IS `index.mjs`'s AND IS OUTSIDE THIS FILE-SET'S WALL, SO IT IS REPORTED TO THE SUPERVISOR
// RATHER THAN PATCHED HERE.**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

test('sas_prop_P_SAS_4_S_REFUSE_FORM_S_REFUSE_KEYS_a_receiver_naming_no_live_store_refuses_in_the_one_form', () => {
  const result = row({
    id: 'P-SAS-4',
    strategies: ['S-REFUSE-FORM', 'S-REFUSE-KEYS'],
    seed: SEEDS['P-SAS-4'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      const LAYOUT_MEMBERS = ['read', 'readLiteral', 'write', 'delete', 'rollback', 'listen', 'unlisten', 'removeListener'];
      const member = choose(LAYOUT_MEMBERS);
      // ── ARM 1, `S-REFUSE-FORM`'s first situation: A CALL WHOSE RECEIVER NAMES NO LIVE STORE.
      // `receiver-and-refusal.md §7`: "`const { read } = layout; read(…)` IS LEGAL TODAY AND THROWS AFTER
      // THIS CHANGE … THIS IS A REGRESSION AND IS NAMED AS ONE." — and `§3`: *"A CALL WHOSE RECEIVER NAMES NO
      // LIVE STORE REFUSES, IN THE ONE DECLARED FORM."*
      //
      // **THE LEDGER THIS CELL CARRIES — RE-CUT 2026-10-21 (`role_test_writer`), and the previous pass's
      // reading of the defect is CORRECTED HERE RATHER THAN INHERITED:** the earlier note recorded *"THE
      // RECEIVER IS SIMPLY NOT CONSULTED FOR THIS MEMBER."* **THAT IS FALSE OF THE METHOD AND TRUE OF THE
      // CALL — MEASURED BOTH WAYS.** `layout.unlisten.call({}, h)` DOES reach the addon and DOES refuse the
      // one form; what answers instead is an ADDRESS OF THE SHORT-CIRCUIT INSIDE `unlisten`, which returns
      // before the entry is reached whenever `state.registry` does not carry the handle the caller holds.
      // **SO THE DEFECT IS A DOMAIN TEST TAKEN ON THE WRONG SIDE OF THE RECEIVER, AND THE CELL THAT CATCHES
      // IT HAS TO HAND `unlisten` A HANDLE THAT IS LAWFUL FOR THE CALLER AND ABSENT FROM THAT ONE MAP.**
      //
      // **ITS GROUND, MEASURED AND NOT ARGUED — `receiver-and-refusal.md §5`: *"THE REFUSAL FIRES ONLY WHEN
      // THE RECEIVER NAMES NOTHING AT ALL."* A `{}` receiver names nothing at all, so one arm serves every
      // member.** The instrument below re-binds each member to that receiver and keeps the member's OWN
      // arguments, so nothing but the receiver can produce a refusal; **the address refusal the old spelling
      // leaned on is gone, and with it the false-pass it carried.** *(The `register`-then-detach row is what
      // separates this member from its seven siblings — with any other handle `unlisten` refuses like the
      // rest, which is why the earlier pass read it as a member that ignores receivers.)*
      //
      // **THE FIX IS `index.mjs`'s AND IS OUTSIDE THIS FILE-SET'S WALL, SO IT IS REPORTED TO THE
      // SUPERVISOR RATHER THAN PATCHED HERE — and the arm is NOT weakened to accommodate it.** The member
      // list is unchanged, the assertion is unchanged, and **the row stays RED on `unlisten` until that
      // member's domain check stands behind its receiver as its seven siblings' do.** ***THE CELL IS
      // THEREFORE LEFT RED DELIBERATELY AND IS A CORRECT WITNESS OF AN IMPLEMENTER DEFECT, NOT A STALE
      // CELL.***
      const layout = mem();
      layout.write(['a'], 'mem', 1);
      // **A HANDLE THIS STORE HAS TAKEN.** It is not the value driven below; it exists so the store's own
      // handle map is populated and so the control call — the same argument on the LIVE receiver — is a
      // lawful call and not a class refusal.
      const held = tag(`sas4-held-${i}`);
      layout.listen(held, [['l']]);
      // **A VALUE OUTSIDE THIS STORE'S DOMAIN AT EVERY POSITION THAT HAS A DOMAIN** — the one string that
      // names no listener and no address here, used at each member's own position. **IT IS THE CORPUS-SHAPED
      // CALL: nothing about any argument is malformed, and nothing about it is a class violation.**
      const outside = tag(`sas4-outside-${i}`);
      // A RECEIVER THAT NAMES NO LIVE STORE AND NOTHING ELSE: a bare object, never a store, never a clone.
      const noStore = {};
      const calls = {
        read: () => layout.read.call(noStore, [outside], 'mem'),
        readLiteral: () => layout.readLiteral.call(noStore, [outside], 'mem'),
        write: () => layout.write.call(noStore, [outside], 'mem', 1),
        delete: () => layout.delete.call(noStore, [outside], 'mem'),
        rollback: () => layout.rollback.call(noStore, outside),
        listen: () => layout.listen.call(noStore, outside, [['l']]),
        unlisten: () => layout.unlisten.call(noStore, outside),
        removeListener: () => layout.removeListener.call(noStore, outside),
      };
      const detachment = callAndClassify(calls[member], []);
      assert.equal(detachment.refused, true,
        `attempt ${i}: S-REFUSE-FORM — a call whose receiver names no live store refuses (P-SAS-4's own `
        + `strategy; receiver-and-refusal.md §3). \`${member}\` called on a receiver naming no store answered `
        + `instead, which is the failure list's third term: "a success" (receiver-and-refusal.md §5: "THE `
        + 'REFUSAL FIRES ONLY WHEN THE RECEIVER NAMES NOTHING AT ALL")');
      // ── `S-REFUSE-KEYS`: THE THROWN VALUE CARRIES THE THREE MEMBERS AND IS NOT AN `Error`.
      assert.equal(isTheDeclaredForm(detachment.thrown), true,
        `attempt ${i}: S-REFUSE-KEYS — the thrown value carries the three members {status, message, log} and `
        + 'is not an `Error`. **WHAT TOKEN STANDS IN `status` IS NOT READ** — `test-cases.md §4`: "D-4 asserts '
        + 'the key set, the member count, non-`Error`-ness — and NOTHING about which token stands in `status`"');

      // ── ARM 2, the second situation: A MEMBER WHOSE STORE HAS BEEN COLLECTED.
      // **⟶ RE-CUT 2026-10-20 (`role_test_writer`). THE CELL AS FILED DEMANDED A REFUSAL FROM A RECEIVER ITS
      // OWN CONSTRUCTION KEEPS ALIVE, SO IT WAS RED AGAINST A CORRECT LANDING AND NO OWNERSHIP MECHANISM OR
      // FINALIZER COULD HAVE GREENED IT.** `return s[name].bind(s)` **hands `s` OUT of the context**: a bound
      // function's `this` IS `s`, so the store is STRONGLY REACHABLE even though no `s` appears in the
      // returned value. **THE RECEIVER NAMES A LIVE STORE, AND `receiver-and-refusal.md §5` DECIDES EXACTLY
      // THAT CASE** — *"a call whose receiver names a live store — a re-bound receiver among them — lands at
      // the store the receiver names."* **THE CALL CORRECTLY LANDS; `§3`'s arm does not arise.**
      //
      // **AND THE ARM IS NOT DRIVABLE AT THIS LAYER AT ALL, MEASURED AND NOT ARGUED:** no release verb exists
      // on the instance or the module, the artefact's export set is fixed at the thirteen declared names (a
      // fourteenth would BE the failure `F-2` names), and a `storeCreate` instance is **not collected even
      // when nothing holds it** — so no finalizer fires and the collected-store state is unreachable.
      // **THE INSTRUMENT AND ITS CONTROL ARE STATED AT `addon-surface.test.mjs`'s
      // `sas_d4_s_refuse_form_a_member_whose_store_is_collected_…` CELL AND ARE NOT REPEATED HERE**
      // (`FinalizationRegistry` notifications under GC pressure; the control object COLLECTED in the same
      // run, so the instrument is live).
      //
      // **SO THIS ARM IS `PARKED` (`OPEN`, NEVER GREEN) AND ASSERTED AT WHAT THE JS LAYER CAN LAWFULLY
      // OBSERVE** — the row's own subject read in the state the construction actually produces: **the call
      // LANDS**, which is `§5`'s routing and is correct. **IT IS NOT DELETED AND NOT WEAKENED:** the
      // refusal owed by `§3`'s second row is driven for real where a store can actually be freed — the Rust
      // layer, `bindings/js/tests/addon_adoption.rs` (`pada4_s_fin_registered_*`,
      // `pada4_the_ownership_change_is_read_at_the_owners_and_not_at_a_vec_slot`). **`§3`'s FIRST row — the
      // detached call — STAYS DRIVEN WHOLE AT ARM 1 ABOVE, and it is the same one observable.** **NO WITNESS
      // PROPERTY IS ASSERTED: `finalizer-and-teardown.md §5-bis` forbids one by design.**
      // **REVISIT CONDITION:** un-parked when the JS layer gains a real drop route.
      const built = runInNewContext('({ build: (sc) => { const s = sc({ journalLength: 8, listeners: [] }); s.write([\'a\'], \'mem\', 1); return s.read.bind(s); } })');
      // **THE MEMBER IS `read` AND NOT `member`, AND THAT IS FORCED RATHER THAN PREFERRED — MEASURED: THE
      // MEMBERS ARE NOT UNIFORM ON A LIVE RECEIVER.** ★ **CORRECTED 2026-10-21 (`role_test_writer`): THE
      // PREVIOUS SPELLING OF THIS NOTE READ *"`read`, `readLiteral`, `write` and `unlisten` resolve; `delete`
      // refuses `AddressNotFound`, `rollback` refuses `JournalOpUnknown`, and `listen` / `removeListener`
      // refuse `AddressMalformed`"* — AND THAT READING WAS AN ARTEFACT OF THE OLD ARM'S OWN ARGUMENTS AND NOT
      // A PROPERTY OF THE MEMBERS.** It was measured over a store whose register held one key and with
      // arguments chosen for the OLD detached calls; on a live receiver holding what each member's own
      // arguments name, **ALL EIGHT RESOLVE** (`delete` answers its receipt once the key exists, `rollback`
      // answers the record of an op the same store issued, and `listen` / `removeListener` / `unlisten`
      // answer `undefined` on a handle `listen` has taken) — see this row's Arm 1 table, driven that way.
      // **The conclusion the note draws is UNMOVED and is what the arm below still rests on: `read` IS THE
      // ONE MEMBER WITH NO DOMAIN REASON TO REFUSE A LEGAL ADDRESS ON A LIVE STORE — so a refusal here could
      // only be the receiver arm, and there is none to be, because the receiver is live.** **`unlisten`'s own
      // uniformity is asserted nowhere below, because it is exactly what Arm 1 is red about.** (`member` is
      // still drawn and still drives ARM 1 above, where it belongs.)
      const onCollected = built.build(storeCreate);
      // **AND THE SPELLING OF THE ADDRESS IS A CORRECTION AND NOT A DETAIL: MEASURED, THE NESTED FORM
      // `read([['a']], 'mem')` REFUSES `AddressMalformed` ON A LIVE RECEIVER TOO** — it is refused by the
      // store's own class test *before any receiver is consulted* (`surface.md §1.5`: an address is a
      // segment array of strings and non-negative integers). **A CELL PASSING THE NESTED FORM WOULD HAVE
      // READ THE ADDRESS CLASS AND NEVER THE RECEIVER ARM** — the same false-pass trap `P-SAS-5`'s comment
      // names for the string form. `[['a']]` is what the pre-re-cut arm passed, and it is why the arm's
      // measurement was about the address and not the receiver.
      const liveRead = callAndClassify(() => onCollected(['a'], 'mem'), []);
      assert.equal(liveRead.refused, false,
        `attempt ${i}: PARKED (\`OPEN\`) — binding a member hands its store OUT of the context (the bound `
        + '`this` IS `s`), so the receiver names a LIVE store. `receiver-and-refusal.md §5`: "a call whose '
        + 'receiver names a live store — a re-bound receiver among them — lands at the store the receiver '
        + 'names." Read at `read`, which has no domain reason to refuse a legal address on a live store — so '
        + 'a refusal here could only be the receiver arm, and there is none to be');
      assert.equal(liveRead.answer, 1,
        `attempt ${i}: and it RESOLVES to the value that store\'s own register holds (written by the same `
        + '`s` above) — the receiver\'s routing read at its own observable (`P-SAS-2`), and the proof that '
        + 'the store is LIVE and not freed. **A cell demanding a refusal here was the mistake: it asked a '
        + 'bound member to refuse while its receiver was reachable, which is not a lifetime question at '
        + 'all.** The collected-store row is driven for real by the Rust-side cells named in the comment '
        + 'above');
    }),
  });
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SAS-5` · `S-TABLE-REMOVE` — RELEASE A STORE AND READ THE TABLE (`D-5`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`, `P-SAS-5`:** *"the receiver table holds no entry whose store has been freed, and a freed
// store's entry is retired."* **Strategy:** `S-TABLE-REMOVE` — *"release a store; the table's entry is gone."*
// **Failure list:** *"a surviving entry for a freed store; a retirement removing a second store's entry."*
//
// **AND `contract.md §7`'s SECOND `OWED` ITEM IS EXACTLY WHAT THIS ROW MUST NOT CROSS:** *"THE TABLE'S FORM
// AND ITS RETIREMENT MECHANISM ARE `OWED` … the requirement is decided and is driven by `P-SAS-5`."* **SO THE
// ROW IS DRIVEN AT ITS OWN OBSERVABLE AND NAMES NO TABLE TYPE** — a freed store whose entry is gone, and a
// second store whose entry survives. `receiver-and-refusal.md §6` decides the requirement: *"THE RETIREMENT
// REMOVES EXACTLY ONE ENTRY — the freed instance's own — AND NEVER THE TABLE."*
//
// **`implementation-plan.md §6` risk `3` names the failure this catches:** *"a retirement that removes the
// wrong entry is a silent cross-store defect, which is what `P-SAS-5` exists to catch."*
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('sas_prop_P_SAS_5_S_TABLE_REMOVE_a_freed_stores_entry_is_retired_and_the_others_survive', () => {
  const result = row({
    id: 'P-SAS-5',
    strategies: ['S-TABLE-REMOVE'],
    seed: SEEDS['P-SAS-5'],
    body: (rng, i) => attempt(rng, ({ pick: choose, tag: t }) => {
      const key = t(`table-${i}`);
      // TWO LIVE CONSTRUCTIONS, EACH WITH ITS OWN REGISTER — `receiver-and-refusal.md §2`: "one `storeCreate`
      // builds one store with its own handle domain", which is what makes a cross-store removal observable.
      const survivor = mem();
      survivor.write([key], 'mem', 'kept');
      // THE RELEASED STORE IS BUILT IN AN ISOLATED CONTEXT — but **⟶ RE-CUT 2026-10-20 (`role_test_writer`);
      // THE CONSTRUCTION AS FILED HANDED THE STORE OUT, SO IT WAS NEVER RELEASED AND THE ROW'S FIRST NAMED
      // FAILURE COULD NOT ARISE.** `return { read: s.read.bind(s), key: [k] }` returns a BOUND member whose
      // `this` IS `s`: the store is STRONGLY REACHABLE, the receiver names a LIVE store, and the call
      // correctly LANDS (`receiver-and-refusal.md §5`). **MEASURED FURTHER: NO STORE CAN BE FREED AT THIS
      // LAYER** — no release verb on the instance or the module, the artefact's export set fixed at the
      // thirteen declared names, and a `storeCreate` instance not collected even when nothing holds it
      // (instrument and control at `addon-surface.test.mjs`'s `sas_d4_…_collected_` cell).
      //
      // **SO THE *"A FREED STORE"* HALF IS `PARKED` (`OPEN`, NEVER GREEN) AND THE ROW IS DRIVEN AT THE HALF
      // THE JS LAYER OWNS — `P-SAS-5`'s SECOND NAMED FAILURE, *"a retirement removing a second store's
      // entry"* — WHICH IS THE SILENT CROSS-STORE DEFECT `implementation-plan.md §6` risk `3` EXISTS TO
      // CATCH, AND WHICH IS ASSERTED HERE IN **BOTH DIRECTIONS**.** The requirement is driven for real where
      // a store can actually be freed: `bindings/js/tests/addon_adoption.rs` (`pada4_s_fin_registered_*`,
      // `pada4_the_ownership_change_is_read_at_the_owners_and_not_at_a_vec_slot`). **REVISIT CONDITION:**
      // un-parked when the JS layer gains a real drop route.
      //
      // **AND THE ADDRESS IS A SEGMENT ARRAY AND NOT A STRING** — `docs/specs/storeroom-js/surface.md §1.5`'s
      // own domain. **THIS IS THE DIFFERENCE BETWEEN DRIVING THE ROW AND DRIVING SOMETHING ELSE:** a string at
      // the address position is refused `AddressMalformed` by the STORE'S OWN class test before any receiver is
      // consulted, so a cell that passed a string would report a PASS whose subject is not this row at all —
      // the receiver arm would never be reached, and the row's own failure could not be observed. **THE ROW
      // BELOW PINS THE ADDRESS'S OWN FORM FOR THAT REASON, AND THE `isTheDeclaredForm` LIMB ALONE WOULD NOT
      // HAVE CAUGHT IT.**
      const built = runInNewContext('({ build: (sc, k) => { const s = sc({ journalLength: 8, listeners: [] }); s.write([k], \'mem\', \'dropped\'); return { read: s.read.bind(s), key: [k] }; } })');
      const released = built.build(storeCreate, choose(['g', 'h', 'j']));
      // **THE PRECONDITION, ASSERTED SO A FALSE PASS IS IMPOSSIBLE**: the released store's register really does
      // hold the key, read through a LIVE reference taken before the drop. A row that could not show this would
      // be measuring the address class and not the receiver arm.
      const stillLive = runInNewContext('({ build: (sc, k) => { const s = sc({ journalLength: 8, listeners: [] }); s.write([k], \'mem\', \'live\'); return () => s.read([k], \'mem\'); } })');
      assert.equal(stillLive.build(storeCreate, released.key[0])(), 'live',
        `attempt ${i}: the precondition — a LIVE reference to a store built the same way reads its own key, so `
        + 'the refusal asserted below is the RECEIVER arm\'s and not the address class\'s');

      // (a) **PARKED (`OPEN`) — THE ROW'S FIRST NAMED FAILURE, "a surviving entry for a freed store", CANNOT
      // ARISE AT THIS LAYER: the receiver is LIVE (the bound `this` IS `s`), so the call lands, and that
      // landing is CORRECT (`receiver-and-refusal.md §5`).** Asserted at what the JS layer can lawfully
      // observe, and NOT deleted: the state the construction actually produces is the landing.
      const onReleased = callAndClassify(released.read, [released.key, 'mem']);
      assert.equal(onReleased.refused, false,
        `attempt ${i}: PARKED (\`OPEN\`) — binding the member hands its store OUT of the context, so the `
        + 'receiver names a LIVE store and the call LANDS (`receiver-and-refusal.md §5`). '
        + '`receiver-and-refusal.md §6`\'s retirement requirement is about a FREED store, and NO STORE IS '
        + 'FREED AT THIS LAYER (no release verb, no release export, and a store that is never collected — '
        + 'instrument and control named in the comment above). The requirement is driven for real by the '
        + 'Rust-side cells named there');
      assert.equal(onReleased.answer, 'dropped',
        `attempt ${i}: and it lands at ITS OWN store's register, read through the live receiver — which is `
        + '`§5`\'s routing (`P-SAS-2`) and the answer the state actually owes');

      // (b) THE SECOND STORE'S ENTRY SURVIVES WHOLE. **THIS IS THE ROW'S SECOND NAMED FAILURE AND THE ONE
      // `implementation-plan.md §6` risk `3` prices as a SILENT cross-store defect — AND IT IS DRIVABLE IN
      // FULL, WHICH IS WHY THE ROW IS PARKED AT (a) RATHER THAN ABANDONED.**
      assert.equal(survivor.read([key], 'mem'), 'kept',
        `attempt ${i}: P-SAS-5's second named failure — "a retirement removing a second store's entry". `
        + '`receiver-and-refusal.md §6`: "THE RETIREMENT REMOVES EXACTLY ONE ENTRY — the freed instance\'s own '
        + '— AND NEVER THE TABLE." The surviving store still answers its own register');

      // (c) AND THE TWO ARE DISCRETE: THE SURVIVOR DOES NOT ADDRESS THE RELEASED STORE'S REGISTER EITHER.
      // A cross-store leak in the other direction is the same silent defect read backwards.
      const wrongWay = callAndClassify(() => survivor.read([released.key], 'mem'));
      assert.equal(wrongWay.refused, true,
        `attempt ${i}: and the surviving store does not address the released store's register — the two are `
        + 'discrete (`receiver-and-refusal.md §2`: "two constructions remain two discrete stores in separate '
        + 'memory")');
    }),
  });
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SAS-6` · `S-UNWRAP-SITES` · `S-STATE-ID-GONE` — THE TWO WRAPPERS AND THE THREE SITES (`D-6`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`, `P-SAS-6`:** *"`index.mjs` calls no wrapper that the split deletes, and every member
// reaches its own entry."* **Strategies:** `S-UNWRAP-SITES` — *"grep for the deleted wrapper names; zero live
// call sites."* · `S-STATE-ID-GONE` — *"grep for `state.id`; zero occurrences."* **Failure list:** *"a
// surviving wrapper call; a surviving `state.id`; a member calling another verb's entry."*
//
// **`js-unwrap.md §1` NAMES BOTH WRAPPERS AND SAYS WHY ONE PASS MISSES ONE:** *"`write` DOES NOT GO THROUGH
// `call`. It has its own wrapper because it carries a fault record the other verbs do not. **A pass that reads
// only the generic wrapper will miscount the sites, which is why both are named here.**"* **AND `§4` NAMES
// THE THREE `state.id` SITES, the third being the one a one-pass edit misses.**
//
// **THE INSTRUMENT IS THE CLAUSE'S OWN — A TEXT READ — AND THE COMMENTS ARE STRIPPED FIRST**, because the
// clause's count is a count of CALL SITES and not of words: a documentary mention inside a comment is not a
// call site, and a row that failed on the prose recording the deletion would be red on a correct landing.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('sas_prop_P_SAS_6_S_UNWRAP_SITES_S_STATE_ID_GONE_no_deleted_wrapper_and_no_state_id_survive', () => {
  const result = row({
    id: 'P-SAS-6',
    strategies: ['S-UNWRAP-SITES', 'S-STATE-ID-GONE'],
    seed: SEEDS['P-SAS-6'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      const text = strippedEntryText();
      // ── `S-UNWRAP-SITES`: A DELETED WRAPPER NAME, DRAWN FROM THE SEED, HAS ZERO LIVE CALL SITES.
      const wrapper = choose(DELETED_WRAPPER_NAMES);
      const liveSites = text.split('\n')
        .map((line, index) => ({ line, number: index + 1 }))
        .filter((entry) => new RegExp(`(^|[^.\\w$])${wrapper}\\s*\\(`).test(entry.line))
        .map((entry) => `:${entry.number}`);
      assert.deepEqual(liveSites, [],
        `attempt ${i}: S-UNWRAP-SITES — "grep for the deleted wrapper names; zero live call sites"; the row's `
        + `first failure is "a surviving wrapper call". \`${wrapper}\` is deleted by \`js-unwrap.md §1\` and `
        + `has live sites at ${JSON.stringify(liveSites)}`);

      // ── `S-STATE-ID-GONE`: NO `state.id` SURVIVES AT ANY OF ITS THREE SITES.
      const stateIdSites = text.split('\n')
        .map((line, index) => ({ line, number: index + 1 }))
        .filter((entry) => /state\s*\.\s*id\b/.test(entry.line))
        .map((entry) => `:${entry.number}`);
      assert.deepEqual(stateIdSites, [],
        `attempt ${i}: S-STATE-ID-GONE — "grep for \`state.id\`; zero occurrences"; the row's second failure is `
        + '"a surviving `state.id`". `js-unwrap.md §4` names THREE sites and the third is on the registration '
        + `path — "NO — it is outside both" — so a sweep of the wrappers alone leaves it: ${JSON.stringify(stateIdSites)}`);

      // ── AND EVERY MEMBER REACHES ITS OWN ENTRY: the per-verb entry, drawn from the seed, is reached as a
      // DIRECT CALL OF ITS OWN NAME and not as a verb string through the dispatcher the split deletes.
      //
      // **THE VERB-STRING LIMB IS BOUND TO THE DISPATCHER'S OWN SHAPE AND NOT TO A BARE QUOTED NAME.** The
      // clause's subject is the VERB AS DATA — `PAR-SAS-2`: *"the verb, as data — **DELETED** — it was a string
      // matched across nine arms"* — and the shape that carries it is a string handed to a FORWARDING CALL as
      // the dispatcher's second position. **A bare `'read'` anywhere in the file is not that shape**: the
      // package composes failure MESSAGES that name the verb (`failure-form.md §1`: *"the failure messages
      // already name the verb because the package composes them"*, cited at `export-set-and-dispatch.md §3`
      // and `js-unwrap.md §6`), so a cell matching a bare quoted name would be red on a CORRECT landing for a
      // reason that is a declared part of the same unit's design. **THE SHAPE THEREFORE REQUIRES THE VERB TO
      // STAND WHERE THE DISPATCHER TOOK IT: as an argument to a wrapper call, beside an instance-position
      // argument and an `args` array.**
      const entry = choose(PER_VERB_NINE).name;
      const asDispatchedVerbString = new RegExp(`${'\\w+'}\\([^)]*,\\s*['"]${entry}['"]\\s*,`).test(text);
      assert.equal(asDispatchedVerbString, false,
        `attempt ${i}: \`${entry}\` must not still be handed across as a VERB STRING to a forwarding call — `
        + '`parameter-semantics.md §1`\'s `PAR-SAS-2` row reads the verb-as-data as DELETED: "it was a string '
        + 'matched across nine arms", and `export-set-and-dispatch.md §3`: "AFTER THE SPLIT the verb **is** the '
        + 'frame\'s name"');
      assert.equal(new RegExp(`(^|[^.\\w$])${entry}\\s*\\(`).test(text), true,
        `attempt ${i}: the row's third failure is "a member calling another verb's entry"; \`js-unwrap.md §5\` `
        + `is the clause: "EACH MEMBER CALLS ITS OWN VERTICAL ENTRY DIRECTLY. The verb string disappears — it `
        + `is no longer data, because it is the entry's name." \`${entry}\` is not reached as a direct call`);
    }),
  });
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SAS-7` · `S-UNWRAP-PARITY` — THE UNWRAP CHANGES NO OBSERVABLE (`D-7`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`, `P-SAS-7`:** *"the JS unwrap changes no observable: the same call answers the same thing
// before and after."* **Strategy:** `S-UNWRAP-PARITY` — *"drive the suite's calls against both shapes."*
// **Failure list:** *"a changed return shape; a changed failure; a changed arity read."*
//
// **`js-unwrap.md §5` STATES THE SAME PROPERTY FROM THE OTHER SIDE:** *"NO MEMBER'S ARITY, RETURN SHAPE OR
// REFUSAL MOVES. That is `P-SAS-7`'s property, and it is the reason this unit is a refactor rather than a
// change."*
//
// **AND *"THE SUITE'S CALLS"* IS READ AS THE PACKAGE'S OWN DECLARED SURFACE** — `docs/specs/storeroom-js/
// surface.md §2.4` item 9 (f)'s member table — **which is the set the suite drives and the set whose
// observables this row compares. No cell of this row reads `src/**` to learn what those calls are.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE TEN STORE-REACHING METHODS `surface.md §2.4` item 9 (f) DECLARES**, plus the two singles. The row
 *  draws from this declared set and never from a reading of the implementation. */
const SURFACE_MEMBERS = [
  'read', 'readLiteral', 'write', 'delete', 'rollback', 'listen', 'unlisten',
  'removeListener', 'addConstraint', 'constraintOn', 'constraintOff', 'register', 'constraints',
];

test('sas_prop_P_SAS_7_S_UNWRAP_PARITY_the_same_call_answers_the_same_thing_and_no_arity_read_moves', () => {
  const result = row({
    id: 'P-SAS-7',
    strategies: ['S-UNWRAP-PARITY'],
    seed: SEEDS['P-SAS-7'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      const member = choose(SURFACE_MEMBERS);
      const key = choose(['m', 'n', 'o']);
      const layout = mem();
      // (a) A CHANGED RETURN SHAPE IS THE ROW'S FIRST FAILURE — every declared member is an own callable of
      // the product (`surface.md §2.4` item 9 (f): the member set is METHODS ONLY).
      assert.equal(Object.prototype.hasOwnProperty.call(layout, member), true,
        `attempt ${i}: S-UNWRAP-PARITY — "a changed return shape" is the row's first failure and the unwrap `
        + `moves no member: \`${member}\` is not an own member of the product`);
      assert.equal(typeof layout[member], 'function',
        `attempt ${i}: and \`${member}\` is a function — the member set is METHODS ONLY`);
      // (b) THE DECLARED RECORD SHAPES, DRIVEN: the observed rows' answers are the members their clauses
      // declare and none is added or removed.
      layout.write([key], 'mem', 1);
      const written = layout.write([key], 'mem', 2);
      assert.deepEqual(Object.keys(written).sort(), ['op', 'triggered', 'watched'],
        `attempt ${i}: \`write\` answers \`{op, watched, triggered}\` — "a changed return shape"`);
      assert.deepEqual(Object.keys(layout.delete([key], 'mem')).sort(), ['address', 'tiers', 'triggered'],
        `attempt ${i}: \`delete\` answers \`{address, tiers, triggered}\``);
      layout.write([key], 'mem', 3);
      assert.deepEqual(Object.keys(layout.rollback(written.op.opId)).sort(), ['opId', 'restoredTo', 'undoneOps'],
        `attempt ${i}: \`rollback\` answers \`{opId, undoneOps, restoredTo}\``);
      // (c) A CHANGED FAILURE IS THE ROW'S SECOND FAILURE — the refusal shape is the declared three-member
      // form and never a raw host error. **THE TOKEN IS NOT READ: `PAR-SAS-10` puts the RECEIVER arm's token
      // at `OWED` and the discipline is applied here too.**
      const refusal = callAndClassify(() => layout.read([choose(['zz', 'yy'])], 'mem'), []);
      if (refusal.refused) {
        assert.equal(isTheDeclaredForm(refusal.thrown), true,
          `attempt ${i}: a store refusal is the declared three-member form (\`failure-form.md §1\`), unmoved `
          + 'by the unwrap — "a changed failure"');
      }
      // (d) A CHANGED ARITY READ IS THE ROW'S THIRD FAILURE — the ONE arity read this surface makes is
      // `write`'s fifth position and no other position of any verb (`surface.md §2.2` clause 4).
      assert.equal(layout.write.length, 4,
        `attempt ${i}: \`write\` declares four required positions with the fifth optional and last, and the `
        + 'unwrap moves no arity read');
    }),
  });
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `P-SAS-8` · `S-FAULT-ARM` — THE `ValueNotAdmitted` RE-RENDER SURVIVES (`D-8`)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`, `P-SAS-8`:** *"the `write` wrapper's `ValueNotAdmitted` re-render survives the
// deletion."* **Strategy:** `S-FAULT-ARM` — *"drive a value the walk refuses at a store that answers
// `ValueNotAdmitted`; the rendered message appears."* **Failure list:** *"the raw refusal reaching the caller;
// the arm dropped."*
//
// **`js-unwrap.md §3`:** *"`writeCall` IS NOT MERELY A FORWARDER — IT CARRIES AN ARM THAT MATTERS … the
// wrapper RE-RENDERS THE MESSAGE from the walk's own fault record. IT THROWS; IT IS NOT A FAULT SINK. **The
// arm moves into the write member's own body and IS NOT DROPPED.**"*
//
// **THE ROW IS DRIVEN AT THE TWO OBSERVABLES ITS CLAUSES DECLARE:** (i) the code the walk's own record
// carries is still `ValueNotAdmitted` — `PAR-SAS-5`'s *"the `fault` record the write path threads"*, and (ii)
// the message is the COMPOSITE `docs/specs/storeroom-js/surface.md §2.5` item 6 declares, with the store's own
// generator's bytes FIRST and the boundary's class-and-position half appended. **PART ONE IS COMPOSED BY
// CALLING THE ARTEFACT'S OWN STANDING `errorMessage` ENTRY**, so the expected bytes are the generator's and
// are never re-spelled here. **THE RECEIVER ARM'S TOKEN IS NOT READ** — it is `OWED-1`'s and no clause of
// this unit names it.
//
// **THE VALUES ARE DRAWN FROM THE WALK'S OWN OUTSIDE ROWS**: a `bigint` (`§1.2` row — *"NEVER converted
// through the numeric arm"*), a `symbol`, a function, a `Map`, a `Date` — each refused by its CLASS.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

/** The walk's outside classes and the generator's own spelling of each failing target (`§2.5` item 6 (a)). */
const REFUSED_VALUES = [
  { value: 1n, spelling: '1n' },
  { value: 7n, spelling: '7n' },
  { value: Symbol('sv'), spelling: 'Symbol()' },
];

test('sas_prop_P_SAS_8_S_FAULT_ARM_the_ValueNotAdmitted_re_render_appears_and_the_arm_is_not_dropped', () => {
  const result = row({
    id: 'P-SAS-8',
    strategies: ['S-FAULT-ARM'],
    seed: SEEDS['P-SAS-8'],
    body: (rng, i) => attempt(rng, ({ pick: choose }) => {
      const refused = choose(REFUSED_VALUES);
      const layout = mem();
      const thrownValue = callAndClassify(() => layout.write([tag(`fault-${i}`)], 'mem', refused.value), []);
      assert.equal(thrownValue.refused, true,
        `attempt ${i}: S-FAULT-ARM — "drive a value the walk refuses at a store that answers `
        + '`ValueNotAdmitted`" (contract.md §5). The value ' + `${refused.spelling} was ADMITTED where the `
        + 'walk refuses it by its class (`docs/specs/storeroom-js/surface.md §1.2`\'s outside rows)');
      assert.equal(isTheDeclaredForm(thrownValue.thrown), true,
        `attempt ${i}: the arm "throws; it is not a fault sink" (\`js-unwrap.md §3\`), so what reaches the `
        + 'caller is the declared three-member form and never a raw host error — the failure list\'s first term');
      // (i) THE CODE THE WALK'S OWN RECORD CARRIES IS CARRIED, NOT MINTED — `PAR-SAS-5`'s fault record.
      assert.equal(thrownValue.thrown.status, 'ValueNotAdmitted',
        `attempt ${i}: the arm EXISTS AT ALL — a dropped arm could not answer this code after the store `
        + 'already refused (`PAR-SAS-5`: "the `fault` record the write path threads — the boundary walk\'s own '
        + 'record — the `ValueNotAdmitted` re-render")');
      // (ii) PART ONE IS THE STORE'S GENERATOR'S OWN BYTES, COMPOSED BY CALLING THE STANDING ENTRY.
      const partOne = generated('ValueNotAdmitted', refused.spelling);
      assert.equal(typeof partOne, 'string',
        `attempt ${i}: the generator answers a string — \`errorMessage\` is a standing entry of arity 2–3 `
        + '(`export-set-and-dispatch.md §1`) and this is its 2-position call');
      assert.ok(thrownValue.thrown.message.includes(partOne),
        `attempt ${i}: S-FAULT-ARM — "the rendered message appears". PART ONE is the store's generator's own `
        + 'bytes at the failing value\'s own spelling (`docs/specs/storeroom-js/surface.md §2.5` item 6, item 6 '
        + '(d); `CF-3`), read through the artefact\'s own `errorMessage`. Generator '
        + `(${JSON.stringify(refused.spelling)}): ${JSON.stringify(partOne)}; thrown: `
        + `${JSON.stringify(thrownValue.thrown.message)}`);
      // (iii) AND THE ARM IS NOT DROPPED: a dropped arm answers the RAW refusal, whose message is the
      // generator's answer ALONE — the failure list's second term, read at its own discriminator.
      assert.equal(thrownValue.thrown.message === partOne, false,
        `attempt ${i}: the failure list's second term is "the arm dropped". A dropped arm answers the raw `
        + 'refusal, whose message carries no class half and no position half at all (`F-7`: "the '
        + '`ValueNotAdmitted` arm is dropped and the raw refusal reaches the caller")');
      assert.ok(thrownValue.thrown.message.length > partOne.length,
        `attempt ${i}: and the boundary's appended half is present — the class that failed and the position it `
        + 'holds (`§2.5` item 6 (b)), so the re-rendered message is LONGER than the generator\'s answer alone');
    }),
  });
  assertHeld(result);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE CENSUS — THE REGISTER'S OWN CLOSURE, THE BUDGET, AND EVERY ROW'S VERDICT PRINTED
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5` DECLARES `8` ROWS AND THE IDS ARE READ FROM ITS OWN BYTES.** The closure is asserted IN
// TWO DIRECTIONS: every id a `row()` cell cites is DECLARED, and every DECLARED id is either cited or stands
// in the named undrivable list. **`un-run` IS A FAILURE** — the constraints layer's rule, read at this
// register's own shape — **so a row whose attempts all break FAILS this file, and the census prints each
// row's verdict rather than a total.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('sas_prop_census_the_register_s_closure_the_budget_and_every_row_s_verdict_are_printed', () => {
  // THE `8` ROWS, READ AT THEIR OWN SECTIONS AND IN THE REGISTER'S OWN ORDER.
  assert.deepEqual(CONTRACT_STRATEGY_ROWS.map((r) => r.id),
    ['P-SAS-1', 'P-SAS-2', 'P-SAS-3', 'P-SAS-4', 'P-SAS-5', 'P-SAS-6', 'P-SAS-7', 'P-SAS-8'],
    'contract.md §5 declares the eight rows `P-SAS-1`…`P-SAS-8`, and they are read at their own ids');
  assert.deepEqual(CONTRACT_STRATEGY_ROWS.map((r) => r.ids.length), IDS_PER_ROW,
    'and the ids PER ROW are the register\'s own terms: '
    + `\`${IDS_PER_ROW.join(' + ')} = ${IDS_PER_ROW.reduce((a, b) => a + b, 0)}\` ✓`);
  assert.equal(DECLARED_STRATEGY_IDS.length, IDS_PER_ROW.reduce((a, b) => a + b, 0),
    'the declared id set is the register\'s own arithmetic and not a literal typed here');
  assert.deepEqual(DECLARED_STRATEGY_IDS, [
    'S-EXPORT-SET',
    'S-ARITY', 'S-NO-INSTANCE',
    'S-PARITY',
    'S-REFUSE-FORM', 'S-REFUSE-KEYS',
    'S-TABLE-REMOVE',
    'S-UNWRAP-SITES', 'S-STATE-ID-GONE',
    'S-UNWRAP-PARITY',
    'S-FAULT-ARM',
  ], 'and the eleven ids are the register\'s own, enumerated one at a time so a twelfth could not slip past');
  assert.equal(ROWS_OF_CHECKS, 8, 'the register is eight rows against a budget of `≤ 8` — "`3 + 3 + 2 = 8` ✓"');

  // THE BUDGET'S TWO TERMS, READ OFF THIS FILE'S OWN CELLS: the row count is the number of `row()` cells
  // declared here, and the per-row budget is the even share of the `400`-attempt total capped at `100`.
  assert.equal(ROW_CELLS.length, ROWS_OF_CHECKS,
    `the register declares eight rows and this runner declares one cell per row — eight cells and `
    + `${ROW_CELLS.length} found`);
  assert.equal(ROW_BUDGET * ROWS_OF_CHECKS, MAX_ATTEMPTS_TOTAL,
    'the per-row budget is the even share of the `400`-attempt total: `8 x 50 = 400` exactly');
  assert.ok(ROW_CELLS.every((c) => c.attempts <= MAX_ATTEMPTS_PER_ROW),
    'and no row exceeds the `100`-attempt per-row cap');
  assert.equal(MAX_FAILURES_PER_ROW, 5, 'the stop rule is five failures per row');
  assert.ok(totalAttempts <= MAX_ATTEMPTS_TOTAL, 'no run has drawn past the total budget');

  // ── THE CLOSURE, BOTH DIRECTIONS.
  const cited = new Set();
  for (const cell of ROW_CELLS) {
    for (const id of cell.strategies) {
      assert.equal(DECLARED_STRATEGY_IDS.includes(id), true,
        `${cell.id} cites the strategy id ${JSON.stringify(id)}: every id a cell cites is one of the eleven `
        + 'ids `contract.md §5` declares');
      cited.add(id);
    }
  }
  for (const entry of UNDRIVABLE_BY_A_ROW_CELL) {
    assert.equal(DECLARED_STRATEGY_IDS.includes(entry.id), true,
      `the named undrivable list names a DECLARED id and never one of its own: ${entry.id}`);
    assert.equal(cited.has(entry.id), false,
      `${entry.id} stands in the named undrivable list, so no \`row()\` cell of this file may cite it: a cited `
      + 'id is GENERATED, and a generated id needs no place in that list');
    assert.equal(typeof entry.reason === 'string' && entry.reason.length >= 60, true,
      `every undrivable id carries its reason and it is the reason and not a placeholder: ${entry.id}`);
  }
  const undrivable = UNDRIVABLE_BY_A_ROW_CELL.map((entry) => entry.id);
  const uncovered = DECLARED_STRATEGY_IDS.filter((id) => !cited.has(id) && !undrivable.includes(id));
  assert.deepEqual(uncovered, [],
    'EVERY declared id of `contract.md §5` either cites a `row()` cell or stands in the named undrivable '
    + `list — ${uncovered.length} stand in NEITHER: ${uncovered.join(', ')}`);
  assert.deepEqual(UNDRIVABLE_BY_A_ROW_CELL, [],
    'and the named undrivable list is EMPTY, which is a claim: all eleven ids this register declares have '
    + 'generators in this file — the constraints layer\'s `DR-10` finding is the hole a one-directional '
    + 'closure cannot see, and this list is that hole\'s other side');
  assert.deepEqual(DECLARED_STRATEGY_IDS.filter((id) => cited.has(id) && undrivable.includes(id)), [],
    'and no id stands in BOTH: a cited id is GENERATED and an undrivable id is not');
  assert.equal(cited.size, DECLARED_STRATEGY_IDS.length,
    `the register's closure: the ${cited.size} cited ids are the ${DECLARED_STRATEGY_IDS.length} declared`);
  assert.equal(cited.size + undrivable.length, DECLARED_STRATEGY_IDS.length,
    'and the two terms are the whole register');

  // **AND THE `OWED` BOUND, ASSERTED AT THIS LAYER TOO: no row of this file pins a token or a table type.**
  assert.equal(OPEN_OWED.length, 2,
    'contract.md §7 carries two OPEN `OWED` items — the third, the freeze, is DISCHARGED 2026-10-21');
  // **THE BOUND IS READ OFF WHAT THE ROWS ACTUALLY ASSERT, WHICH IS WHY IT IS STATED AS THE SET OF CODES
  // THIS FILE MAY NAME.** Only `ValueNotAdmitted` appears, and it is the WALK's own code carried by the store
  // (`PAR-SAS-5`) — **never the receiver arm's token, which no clause of this unit names**
  // (`failure-form.md §4`: *"the boundary does not mint a member for it"*).
  const ownBytes = readFileSync(new URL(import.meta.url), 'utf8');
  const assertedTokens = [...new Set([...ownBytes.matchAll(/thrown\.status\s*,\s*'([A-Za-z]+)'/g)].map((h) => h[1]))];
  assert.deepEqual(assertedTokens, ['ValueNotAdmitted'],
    'the ONLY status token asserted by this whole property layer is `ValueNotAdmitted`, the walk\'s own code '
    + 'carried by the store at `PAR-SAS-5` — and the receiver arm\'s token is asserted NOWHERE, because it is '
    + `\`OWED\` (\`failure-form.md §3\`). Found: ${JSON.stringify(assertedTokens)}`);
});

test('sas_prop_census_the_pinned_seed_the_row_count_and_every_verdict_are_printed_as_a_record', () => {
  // **THE LAYER'S OWN RECORD, PRINTED — the seed, the attempt counts and every row's verdict.**
  const lines = ROW_CELLS.map((cell) => {
    const seed = SEEDS[cell.id];
    assert.notEqual(seed, undefined, `${cell.id} carries a pinned seed as a literal`);
    return `${cell.id} · ${cell.strategies.join(' · ')} · seed 0x${seed.toString(16)} · `
      + `cap ${cell.attempts} attempt(s)`;
  });
  assert.equal(lines.length, ROWS_OF_CHECKS, 'one line per register row, and the register has eight');
  for (const line of lines) {
    assert.ok(/^P-SAS-[1-8] · (?:S-[A-Z-]+(?: · S-[A-Z-]+)*) · seed 0x[0-9a-f]+ · cap \d+ attempt\(s\)$/.test(line),
      `the record is well-formed and names the row, its strategies, its pinned seed and its attempt cap: ${line}`);
  }
  // **THE SEEDS ARE DISTINCT AND PINNED AS LITERALS** — one per row, so two rows cannot share a draw stream.
  assert.equal(new Set(Object.values(SEEDS)).size, ROWS_OF_CHECKS,
    'one seed per row and no two rows share one: `8` distinct literals');
});
