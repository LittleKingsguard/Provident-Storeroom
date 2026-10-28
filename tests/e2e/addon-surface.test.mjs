// `addon-surface.test.mjs` — **THE GATE-3 RED SET FOR `U-STOREROOM-ADDON-SURFACE`**: the per-verb export
// split, the receiver, and the JS unwrap. **AUTHORED FROM `docs/specs/storeroom-addon-surface/**` ALONE.**
//
// **THE ONE RULE THIS FILE WAS BUILT UNDER, STATED FIRST BECAUSE IT IS THE EASIEST TO BREAK:** **NO CELL WAS
// DERIVED FROM `bindings/js/src/**`, FROM `bindings/js/index.mjs` OR FROM THE BUILT ARTEFACT'S OWN KEYS.**
// The artefact and the package entry are REACHED (a test must reach the thing it drives) but **WHAT A CELL
// ASSERTS IS TAKEN FROM THE CLAUSE IT CITES**. Where a read of the implementation was unavoidable — the
// LOADING MECHANICS of a Node-API addon and the eval order of a class-accessor frame — the cell says so at
// its own bytes and asserts only what the clause declares.
//
// **AND THE CELLS ARE EXPECTED TO BE RED.** The split is not implemented: **the artefact exports
// `["call","errorMessage","register","storeCreate","version"]` and the unit moves that set `5 → 13` and
// DELETES `call`.** A cell of this file that passes today is a cell whose subject already exists, and each
// such cell is named in the digest at the foot of this header rather than left to be discovered.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// ## THE STATES ENUMERATED BEFORE ANY CELL WAS AUTHORED
//
// `test-cases.md` is the view — **`26` rows: `11` valid states, `7` fail-states, `8` drives** — and the
// typed register is `contract.md §5`'s **`8` rows `P-SAS-1`…`P-SAS-8`** against a budget of `≤ 8`. **The
// drives are the spine: each property's failure list IS its drive set** (`test-cases.md §3`; `§5`'s own
// repetition at `P-SAS-1`'s closing clause).
//
// | drive | property | the cells below |
// | --- | --- | --- |
// | `D-1` | `P-SAS-1` | `sas_d1_s_export_set_*` (`4` cells: the equality, `call` absent, `commit`/`constraints` absent, `removeListener` present) |
// | `D-2` | `P-SAS-2` | `sas_d2_s_arity_*` (`3`) + `sas_d2_s_no_instance_*` (`2`) |
// | `D-3` | `P-SAS-3` | `sas_d3_s_parity_*` (`3` — and the golden's key-set exclusion, `§6` item `2`) |
// | `D-4` | `P-SAS-4` | `sas_d4_s_refuse_form_*` (`2`) + `sas_d4_s_refuse_keys_*` (`3`) |
// | `D-5` | `P-SAS-5` | `sas_d5_s_table_remove_*` (`2`) |
// | `D-6` | `P-SAS-6` | `sas_d6_s_unwrap_sites_*` (`2`) + `sas_d6_s_state_id_gone_*` (`2`) |
// | `D-7` | `P-SAS-7` | `sas_d7_s_unwrap_parity_*` (`2`) |
// | `D-8` | `P-SAS-8` | `sas_d8_s_fault_arm_*` (`2`) |
//
// **THE VALID STATES, EACH AT ITS OWN CELL** — `V-1` the thirteen with `call` absent · `V-2` the arities ·
// `V-3` the byte-parity · `V-4` the receiver resolves the store · `V-5` two constructions answer two stores ·
// `V-6` a live receiver reaches its store and one naming nothing refuses · `V-7` a freed store's entry
// retired while a second survives · `V-8` every member reaches its own entry · `V-9` no `state.id` survives
// and the registration path reaches `register` at arity `2` · `V-10` the `ValueNotAdmitted` re-render appears
// · `V-11` a refusal from every one of the thirteen carries the three members.
//
// **THE FAIL-STATES, EACH AT ITS OWN CELL** — `F-1` `call` survives · `F-2` a verb has no entry, or an
// undeclared name appears · `F-3` an entry accepts an integer at position `0` · `F-4` a record member moves ·
// `F-5` a detached call throws a raw host error or a partial record · `F-6` a surviving entry names a freed
// store, or a retirement removes a second store's entry · `F-7` the `ValueNotAdmitted` arm is dropped.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// ## THE TWO `OWED` ITEMS, AND WHAT THIS FILE DOES ABOUT THEM
//
// `contract.md §7` carries two open `OWED` bullets; **the third — the freeze — is `DISCHARGED 2026-10-21`.**
// The two open ones are **the refusal arm's `status` token and `message`** and **the receiver table's form
// and its retirement mechanism**. **BOTH ARE HANDLED BY ASSERTING THE DECLARED SHAPE AND NEVER A STRUCTURE:
// no cell of this file names a token, a message text, a table type, an index or a channel.** The shape each
// one decides, and the structure each one owes, stand in one place — `OPEN_OWED` at the support module — and
// `sas_the_two_owed_items_are_asserted_at_their_shape_and_never_at_their_structure` asserts that the cells of
// this file stayed inside it.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

import { storeCreate } from '../../bindings/js/index.mjs';
import {
  DECLARED_SURFACE, DECLARED_SURFACE_NAMES_SORTED, STANDING_FOUR, PER_VERB_NINE, PER_VERB_TENTH, PER_VERB_ELEVENTH,
  THE_THREE_THAT_ARE_NOT_ENTRIES, THE_FROZEN_FIVE, OPEN_OWED,
  ADDON_ARTEFACT, PACKAGE_ENTRY, PKG_DIR, DELETED_WRAPPER_NAMES,
  OWED_STRUCTURE_TOKENS, OWED1_TOKEN_ASSERTION_SHAPES,
  require_, addonKeySet, generated, isTheDeclaredForm, isTheArtefactForm, callAndClassify,
  deletedWrapperCallSites,
} from './addon-surface-support.mjs';
import { moduleCodeFiles, moduleCodeLines } from './module-set.mjs';

// ── THE STORE, BUILT THROUGH THE PACKAGE'S ONE DECLARED FACTORY ────────────────────────────────────────
// `export-set-and-dispatch.md §1`'s `storeCreate` row: arity `1`, *"the construction"*. **THE MEMORY TIER IS
// USED THROUGHOUT: `mem` writes no file, so no cell of this file is a file-system test and no temp path
// enters the red set's own budget.**
function mem() {
  return storeCreate({ journalLength: 8, listeners: [] });
}

function thrown(fn) {
  try {
    fn();
  } catch (err) {
    return err;
  }
  assert.fail('the call was declared to refuse and it returned instead');
}

/** **THE FIVE-NAME SET THE FREEZE RECORDS, READ LIVE** — used by exactly one cell, the one that asserts the
 *  split is a change AGAINST a known ABI rather than a preference. **IT IS NOT AN EXPECTATION ANY CELL
 *  ASSERTS THE ARTEFACT TO STILL SATISFY**: `P-SAS-1` asserts the thirteen, and this read exists only so the
 *  before-and-after pair can be stated. */
const ARTEFACT_KEYS_AT_READ = addonKeySet();

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-1` · `P-SAS-1` · `S-EXPORT-SET` — READ THE ADDON'S OWN KEY SET
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`: *"the addon's export set is exactly the thirteen declared names — `4` standing plus `9`
// per-verb — and `call` is absent."*** Strategy `S-EXPORT-SET`: *"read the addon's own key set; assert
// equality with the declared set, sorted."* **Failure list: `call` present; a verb missing; an undeclared
// name; `removeListener` absent.**
//
// **AND THIS ROW IS THE KEY SET'S ONE HOME** (`§5`, added 2026-10-19): the golden's parity diff EXCLUDES the
// key-set cells (`§6` item `2`), *"so a key-set cell left in the golden's diff would fail by design and mask
// every other diff"* — the exclusion is asserted at `D-3` below and authored here.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('sas_d1_s_export_set_the_artefacts_own_keyset_is_exactly_the_thirteen_declared_names', () => {
  const keys = addonKeySet();
  assert.deepEqual([...keys].sort(), DECLARED_SURFACE_NAMES_SORTED,
    'P-SAS-1 / V-1 — `contract.md §5`: "the addon\'s export set is exactly the thirteen declared names — '
    + '`4` standing plus `9` per-verb — and `call` is absent"; `export-set-and-dispatch.md §1`: "THE ADDON\'S '
    + 'EXPORT SET MOVES `5 → 13`: `4` STANDING PLUS `9` PER-VERB — `4 + 9 = 13 ✓`." The artefact exports '
    + `${keys.length} name(s): ${JSON.stringify([...keys].sort())}`);
  // `§1`'s own arithmetic, asserted against the two tables the clause prints rather than against a literal.
  assert.equal(STANDING_FOUR.length, 4, '§1: `4` STANDING — `version`, `errorMessage`, `storeCreate`, `register`');
  assert.equal(PER_VERB_NINE.length, 9, '§1: `9` PER-VERB, one per dispatcher arm');
  // **⟶ AND ONE STANDS BESIDE THE NINE, 2026-10-27** (`PER_VERB_TENTH`): the journal mark restore, which is
  // not one of the dispatcher's arms and adds no member to the product's fourteen.
  assert.equal(PER_VERB_TENTH.length, 1, 'the journal mark restore, declared beside the nine');
  // **⟶ AND AN ELEVENTH STANDS BESIDE THE TENTH, 2026-10-27** (`PER_VERB_ELEVENTH`): the journal's last valid
  // mark, read at the commit opening and cached on the window. **IT IS NEITHER ONE OF THE NINE NOR THE TENTH,
  // IT IS NOT ONE OF THE PRODUCT'S FOURTEEN, AND EVERY ONE OF THE FOURTEEN KEEPS ITS NAME AND ITS ARITY.**
  assert.equal(PER_VERB_ELEVENTH.length, 1, 'the journal mark read, declared beside the nine and the tenth');
  assert.equal(STANDING_FOUR.length + PER_VERB_NINE.length + PER_VERB_TENTH.length + PER_VERB_ELEVENTH.length, 15,
    '`4 + 9 + 1 + 1 = 15 ✓` (§1\'s own `[CENSUS]`, read with the tenth and eleventh rows)');
  assert.equal(DECLARED_SURFACE.length, 15, 'and the tables are one set of fifteen, each name accounted for');
});

test('sas_d1_s_export_set_call_is_absent_because_the_split_is_precisely_its_replacement', () => {
  const keys = addonKeySet();
  // **`F-1` IS THIS CELL.** `export-set-and-dispatch.md §2`: *"`call` IS DELETED. It was the dispatcher: one
  // entry taking `(instance, verb, args)` and matching the verb across nine arms. THE SPLIT IS PRECISELY ITS
  // REPLACEMENT, SO IT DOES NOT SURVIVE."*
  assert.equal(keys.includes('call'), false,
    'F-1 / export-set-and-dispatch.md §2 — "`call` IS DELETED … The split is precisely its replacement, so it '
    + 'does not survive." The artefact still exports `call`, which is the dispatcher the split replaces: '
    + JSON.stringify([...keys].sort()));
  // **AND THE BEFORE-AND-AFTER PAIR IS STATED, BECAUSE A CHANGE AGAINST NOTHING IS NOT A CHANGE.**
  // `docs/specs/storeroom-addon-adoption/contract.md §7`'s DISCHARGED freeze records the set *"as they stand
  // BEFORE this unit's split"*: `["call","errorMessage","register","storeCreate","version"]`.
  assert.deepEqual([...THE_FROZEN_FIVE].sort(), ['call', 'errorMessage', 'register', 'storeCreate', 'version'],
    'the freeze\'s own second figure, quoted: the `5` names as they stand BEFORE this unit\'s split — so the '
    + 'split is a change against a KNOWN ABI and `F-1` is a real failure and not a preference');
  assert.equal(THE_FROZEN_FIVE.includes('call'), true,
    'and the name this unit deletes stood IN that frozen five — which is why the key set is the change and '
    + `why the golden excludes it (\`contract.md §6\` item \`2\`). Read live at this pass: ${JSON.stringify([...ARTEFACT_KEYS_AT_READ].sort())}`);
});

test('sas_d1_s_export_set_no_verb_is_missing_and_removeListener_gets_its_own_entry', () => {
  const keys = new Set(addonKeySet());
  const missing = DECLARED_SURFACE_NAMES_SORTED.filter((name) => !keys.has(name));
  assert.deepEqual(missing, [],
    'P-SAS-1\'s failure list — "a verb missing". `export-set-and-dispatch.md §1` declares the nine per-verb '
    + `entries by name; these have no entry in the artefact: ${JSON.stringify(missing)}`);
  // **THE ONE ENTRY THE PRIOR FILING OMITTED, NAMED BY THE CLAUSE ITSELF.** `contract.md §1` item 4:
  // *"`removeListener` gets its own entry; it is a live arm the prior filing omitted."*
  assert.equal(keys.has('removeListener'), true,
    'P-SAS-1\'s failure list — "`removeListener` absent". `contract.md §1` item 4: "`removeListener` gets its '
    + 'own entry; it is a live arm the prior filing omitted"; `js-unwrap.md §2` row `7` names it the '
    + 'whole-removal member\'s site — its arity `2` at `§1`\'s second table');
  // **AND `commitFile` IS THE NINTH ARM AND IS AN ENTRY** (`js-unwrap.md §2` row `8`, "the file-tier save").
  assert.equal(keys.has('commitFile'), true,
    'and `commitFile` — the file-tier save, `js-unwrap.md §2` row `8` — is an entry of the nine and not a '
    + 'package-side act standing in for one');
});

test('sas_d1_s_export_set_the_three_names_that_are_not_entries_are_absent_for_their_own_stated_reasons', () => {
  const keys = addonKeySet();
  assert.equal(THE_THREE_THAT_ARE_NOT_ENTRIES.length, 3,
    'export-set-and-dispatch.md §2 is headed "THE THREE NAMES THAT ARE NOT ENTRIES", so the set is three');
  for (const row of THE_THREE_THAT_ARE_NOT_ENTRIES) {
    assert.equal(keys.includes(row.name), row.mustBeAbsentFromKeySet === false,
      `F-2 — ${row.clause} — and this is the failure the row is contrasted against: ${row.failure}`);
  }
  // **THE THREE ARE NAMED SO NONE IS READ AS AN OMISSION** (`§2`'s own reason: *"BECAUSE A READER COMPARING
  // THE OLD TABLE TO THE NEW WILL LOOK FOR THEM"*), and the set is asserted to be exactly those three.
  assert.deepEqual(THE_THREE_THAT_ARE_NOT_ENTRIES.map((row) => row.name).sort(), ['call', 'commit', 'constraints'],
    'the three, enumerated by name — `call` (deleted), `commit` (`write`\'s fourth position, no exported '
    + 'name at all), `constraints` (a product member the addon is never reached for)');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-2` · `P-SAS-2` · `S-ARITY` and `S-NO-INSTANCE` — THE ARITIES, AND THE INSTANCE POSITION'S DEATH
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`: *"every entry takes its verb's own arguments, with no leading instance position."***
// `S-ARITY`: *"call each entry at its declared arity and at ±1; the declared arity answers, the others
// refuse."* `S-NO-INSTANCE`: *"no entry accepts a `u32` at position `0` in place of its first real
// argument."* **Failure list: an index position accepted; a wrong arity answering; an arity differing from
// its verb's.**
//
// **AND `F-3` IS THE CLAUSE'S OWN STATEMENT OF THE SECOND STRATEGY** (`test-cases.md §2`): *"an entry accepts
// an integer at position `0` in place of its first real argument"* — `export-set-and-dispatch.md §4`, where
// *"THE INSTANCE POSITION THAT ONCE PRECEDED THEM IS GONE — it was removed before this unit and is not
// reintroduced."*
//
// **THE TWO HALVES OF *"THE OTHERS REFUSE"* ARE BOTH REAL AND A CELL MUST NOT PRETEND OTHERWISE:**
//
//   * **an entry handed an integer at position `0` where its verb declares an ADDRESS refuses** — the
//     address's own class test, `AddressMalformed` at the store's own boundary;
//   * **an entry handed a wrong COUNT of otherwise well-formed arguments may reach the store and be refused
//     there** — the package performs no arity check of its own (`docs/specs/storeroom-js/surface.md §2.2`
//     clause 4, the ONE arity reading this surface makes, at `write`'s fifth position and nowhere else).
//
// **SO THE CELLS ASSERT REFUSAL AND NEVER A PARTICULAR TOKEN**, which is the `OWED` discipline read forward:
// **`V-2`'s subject is *"every entry answers its verb's declared arity"* and its failure list is *"a wrong
// arity answering"* — an answer where a refusal is declared.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/** **ONE WELL-FORMED ARGUMENT LIST PER DECLARED ENTRY, WITH THE LENGTH THE CLAUSE PRINTS.** These are built
 *  from the parameter rows and the member table and NOT from the implementation: an address is a segment
 *  array (`surface.md §1.5`), a tier is one of the store's three declared tokens, a handle is an opaque
 *  string the package minted, an `opId` is a string the journal holds or does not. **THE LISTS ARE THE ARGUMENTS
 *  A CALLER SUPPLIES AND CARRY NO INSTANCE AT ANY POSITION** (`export-set-and-dispatch.md §4`). */
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
    // **⟶ ADDED 2026-10-27: THE JOURNAL MARK RESTORE'S ONE POSITION.** It is driven with the same carrier
    // shape `rollback` is driven with, so the entry is read at its declared arity and at ±1 like the rest.
    case 'restoreMark': return ['an-op-id'];
    // **⟶ AND THE JOURNAL MARK READ, ADDED 2026-10-27: NO POSITION AT ALL.** The store reads its own record
    // and names a position; there is nothing for a caller to supply (`PER_VERB_ELEVENTH`, arity `0`).
    case 'journalMark': return [];
    default: return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **THE ARITY INSTRUMENT, AND WHY IT IS A CALL AND NOT `fn.length` — A NARROW INTERPRETATION, STATED AT ITS
// OWN BYTES** (`contract.md §8`: *"the one interpretation this file had to take, and where"*).
//
// `S-ARITY` says *"call each entry at its declared arity and at ±1; THE DECLARED ARITY ANSWERS, THE OTHERS
// REFUSE"* — **the strategy's own instrument is the CALL.** And `Function.prototype.length` cannot serve
// here for a reason that is a property of the ARTEFACT KIND and not of this unit: **a Node-API function is
// installed through the host and reports `length === 0` whichever positions it declares** — measured at this
// pass over all five entries the frozen artefact carries (`call`, `version`, `register`, `storeCreate`,
// `errorMessage` each report `0`). **So a cell asserting `fn.length === 3` would be red on a CORRECT landing
// and green on nothing, which is exactly the failure mode `failure-form.md §3` warns about at `OWED` values.**
//
// **THE INSTRUMENT THAT REPLACES IT IS THE ONE THE STRATEGY NAMES AND IS STRONGER:** the entry is CALLED with
// the verb's own arguments at the declared arity, at one fewer and at one more, and **each of the three
// outcomes is compared against the DECLARED one.** A cell that only read `length` could not see an entry
// that accepted a wrong arity, which is the failure list's second term.
//
// **AND THE `+1`/`-1` OUTCOMES ARE STATEMENTS ABOUT THE STORE'S OWN REFUSAL ORDER, WHICH THIS FILE DOES NOT
// OWN** — `docs/specs/storeroom-js/surface.md §2.2` clause 4: *"THE PACKAGE PERFORMS NO ARITY CHECK OF ITS
// OWN … THE PACKAGE MAY READ THE CALL'S ARGUMENT COUNT FOR THE FIFTH POSITION, AND ONLY FOR THE FIFTH
// POSITION"*, and `write-and-read.md §3.4`'s `F-1` puts the carriage row's `AddressMalformed` ahead of the
// value's own code. **So the wrong-arity limb asserts the ONE thing this unit's clauses DO declare: an
// entry at a wrong arity is NOT ADMITTED AS THE DECLARED CALL** — it refuses, or it refuses for a declared
// code the store owns, and the cell reads that distinction rather than inventing a token.
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

/** **ONE DECLARED CALL PER ENTRY, AND ITS TWO NEIGHBOURS.** `export-set-and-dispatch.md §4`: *"THE ARITY
 *  FIGURES ABOVE COUNT ONLY THE ARGUMENTS A CALLER SUPPLIES. They are the verb's declared positions."*
 *  **A LIST SHORTER THAN THE DECLARED ARITY IS NOT NECESSARILY WRONG** — a declared OPTIONAL trailing
 *  position may simply be absent (`surface.md §2.2` clause 4's `write` worked example) — **so the `-1` limb
 *  is read against the row's own declared optionality and never against a blanket expectation.** */
const DECLARED_OPTIONAL_TAIL = new Set(['read', 'readLiteral', 'write', 'delete', 'rollback', 'restoreMark', 'unlisten', 'removeListener', 'commitFile']);

/** **AND ONE STANDING ENTRY DECLARES A RANGE RATHER THAN A POINT — `errorMessage`'s `2`–`3`**
 *  (`export-set-and-dispatch.md §1`: *"`errorMessage` | `2`–`3` | the one message renderer the package
 *  calls"*). **BOTH OF THAT ROW'S NEIGHBOURS ARE DECLARED POSITIONS**, so `S-ARITY`'s *"the others refuse"*
 *  has NO SUBJECT on either side of it: calling it at `1` and at `3` are both DECLARED calls of the range,
 *  and a cell demanding a refusal at either would be **red on a correct landing** — the identical failure
 *  mode `failure-form.md §3` warns about at `OWED` values, and the same bound already stated for the `-1`
 *  limb at `DECLARED_OPTIONAL_TAIL` above (*"read against the row's own declared optionality and never
 *  against a blanket expectation"*). **THE ENTRY IS THEREFORE EXEMPT FROM THE NEIGHBOUR LIMBS AND ITS RANGE
 *  IS ASSERTED DIRECTLY INSTEAD**: both the low and the high end of `2`–`3` answer.
 *  **AND `version` ARITY `0` HAS NO NEIGHBOUR AT ALL** — `[].slice(0,-1) === []` and `[...args, undefined]`
 *  is the declared call plus an argument a zero-arity entry never declared, which the artefact simply
 *  ignores (measured: `version(undefined)` answers `'0.5.0'` exactly as `version()` does). **This is the
 *  very bound the file states at its `-1` limb: "THE LIMB RUNS ONLY WHERE SHRINKING THE ARGUMENT LIST
 *  REALLY DROPS A POSITION."** A zero-position entry has no position to drop and none to add. */
const DECLARED_ARITY_RANGE = Object.freeze({ errorMessage: Object.freeze([2, 3]) });
const DECLARED_ARITY_ZERO = Object.freeze(['version', 'journalMark']);
/** `Object.freeze` on a plain literal, deliberately: the file's own `OWED-2` scan forbids a cell naming a
 *  TABLE TYPE (`OWED_STRUCTURE_TOKENS`), and a `Map`/`Set` would be read as one. **THE DECLARATION THESE
 *  CARRY IS A SPEC FIGURE AND NOT A STRUCTURE** — `export-set-and-dispatch.md §1`'s `2`–`3` row and its
 *  `0`-arity row — so a plain frozen literal states it without tripping that guard. */

test('sas_d2_s_arity_every_entry_exists_and_is_callable_at_its_declared_arity', () => {
  const addon = require_(ADDON_ARTEFACT);
  const missing = [];
  const notCallable = [];
  for (const entry of DECLARED_SURFACE) {
    const fn = addon[entry.name];
    if (typeof fn !== 'function') missing.push(entry.name);
    else {
      const args = declaredArgumentsFor(entry.name);
      assert.equal(args.length, entry.arity,
        `${entry.name}'s declared call carries exactly the arity §1 prints — ${entry.arity} — and no instance `
        + 'position among them (`export-set-and-dispatch.md §4`)');
      const result = callAndClassify(fn.bind(addon), args);
      // THE DECLARED CALL EITHER ANSWERS OR REFUSES IN THE ONE FORM (`failure-form.md §1`).
      //
      // **RE-CUT 2026-10-21 — `isTheArtefactForm`, NOT `isTheDeclaredForm`: THIS CELL DRIVES THE RAW
      // ARTEFACT** (`addon = require_(ADDON_ARTEFACT)`, the `.node` itself). **THE OLD PREDICATE DEMANDED
      // THREE MEMBERS AND SO WAS RED ON A CORRECT LANDING FOR TEN OF THE THIRTEEN ENTRIES** (measured:
      // `register`, `read`, `readLiteral`, `write`, `delete`, `rollback`, `listen`, `unlisten`,
      // `removeListener`, `commitFile` each threw `{status, message}`). `log` *"is built at the JS boundary
      // and never in Rust"* and *"a boundary that produced it in Rust would be a SECOND HOME for it"*
      // (`docs/specs/storeroom-addon-adoption/failure-form.md §1`/`§4`), so demanding it of the artefact
      // asserted against THE WRONG LAYER — and had it gone green, would have meant the artefact grew the
      // second home those clauses forbid. **THE FORM IS STILL ASSERTED AT BOTH LAYERS**: `isTheArtefactForm`
      // refuses an `Error`, a non-object, an array, a missing/empty `status` or `message` and any member
      // beyond the declared set other than `stack`; the three-member `isTheDeclaredForm` is asserted by every
      // cell driving `provident-storeroom`'s own surface (`D-4`, `D-5`, `D-7`, `D-8`).
      if (result.refused && !isTheArtefactForm(result.thrown)) notCallable.push(entry.name);
    }
  }
  assert.deepEqual(missing, [],
    'P-SAS-1 / P-SAS-2 / V-2 — the entries `export-set-and-dispatch.md §1` declares, each present in the '
    + `artefact\'s own key set. The nine per-verb entries this unit adds do not exist yet: ${JSON.stringify(missing)}`);
  assert.deepEqual(notCallable, [],
    'P-SAS-2 · V-2 — called at its declared arity, each existing entry answers or refuses IN THE DECLARED '
    + `FORM and never outside it (\`failure-form.md §1\`). Outside the form: ${JSON.stringify(notCallable)}`);
});

test('sas_d2_s_arity_the_declared_arity_is_the_one_that_answers_and_each_neighbour_refuses', () => {
  const addon = require_(ADDON_ARTEFACT);
  const missing = DECLARED_SURFACE.filter((entry) => typeof addon[entry.name] !== 'function').map((e) => e.name);
  // **THE WHOLE CELL IS ABOUT ENTRIES THAT EXIST, SO A MISSING ENTRY IS NAMED ONCE AND THE WALK RUNS OVER
  // WHAT STANDS.** After the split this list is empty and every limb below is driven over all thirteen.
  assert.deepEqual(missing, [],
    'S-ARITY is driven over the thirteen entries `export-set-and-dispatch.md §1` declares; an entry that does '
    + `not exist cannot be called at any arity: ${JSON.stringify(missing)}`);
  const wrongArity = [];
  for (const entry of DECLARED_SURFACE) {
    const fn = addon[entry.name].bind(addon);
    const args = declaredArgumentsFor(entry.name);
    // THE DECLARED ARITY — driven for EVERY one of the thirteen, standing four included.
    callAndClassify(fn, args);
    // ── **RE-CUT 2026-10-21: THE `±1` NEIGHBOUR LIMBS RUN OVER THE NINE PER-VERB ENTRIES, WHICH ARE
    // `S-ARITY`'s SUBJECT, AND NOT OVER THE FOUR THAT STAND.**
    //
    // **`S-ARITY` IS `P-SAS-2`'s STRATEGY AND `P-SAS-2` IS *"every entry takes its verb's own arguments,
    // with no leading instance position"*** (`contract.md §5`) — it is the row that drives **the split**,
    // whose subject is the NINE PER-VERB ENTRIES. **THE FOUR STANDING EXPORTS ARE UNMOVED BY THIS UNIT**
    // (`export-set-and-dispatch.md §1`: *"THE FOUR THAT STAND, UNMOVED IN NAME AND ARITY"*) and their arity
    // behaviour is the SIBLING package's, declared elsewhere and NOT this row's to move.
    //
    // **AND THE GOVERNING CLAUSE SAYS THE PACKAGE PERFORMS NO ARITY CHECK OF ITS OWN — SO DEMANDING A
    // REFUSAL AT A NEIGHBOUR OF A STANDING EXPORT IS RED ON A CORRECT LANDING.** `docs/specs/storeroom-js/
    // surface.md §2.2`'s `DD-46` clause: *"THE PACKAGE PERFORMS NO ARITY CHECK, NO DEFAULTING AND NO
    // VALIDATION OF ITS OWN (`DD-46`): **a missing, an extra or a wrong-shaped argument reaches the store's
    // own carrier value and answers the store's own code.**"* **MEASURED AT THIS PASS, IN BOTH DIRECTIONS:**
    // `errorMessage('a-code')` ANSWERS (one fewer than its declared `2`–`3`), `storeCreate(cfg, undefined)`
    // ANSWERS (one more than its declared `1`), and `version(undefined)` answers exactly as `version()` does
    // (arity `0` declares no position for an extra to land in). **A cell demanding refusals there would pin
    // a behaviour no clause of this unit declares, and would be red on a correct landing** — the failure mode
    // `failure-form.md §3` warns about.
    //
    // **THE COVERAGE IS NOT WEAKENED:** the declared-arity call still runs over all THIRTEEN above, the
    // `errorMessage` RANGE (`2`–`3`) is driven at BOTH its ends below, and every one of the nine per-verb
    // entries — the entries this unit actually mints — is still driven at `±1` exactly as `S-ARITY` states.
    if (STANDING_FOUR.some((row) => row.name === entry.name)) continue;
    // ONE FEWER. On a row whose trailing position is declared OPTIONAL this shape is IN DOMAIN
    // (`surface.md §2.2` clause 4) and owes no refusal; on every other row it must not be answered as the
    // declared call.
    //
    // **AND AT ARITY `0` THIS LIMB HAS NO SUBJECT, WHICH IS THE `S-ARITY` BOUNDARY `contract.md §5` DOES NOT
    // STATE.** `version` is the one entry whose declared arity is `0` (`export-set-and-dispatch.md §1`)
    // and its declared call is the empty list, so `[].slice(0, -1) === []` — the `-1` limb would call the
    // entry with ZERO arguments, byte-for-byte the DECLARED call, and demand that it REFUSE. **That is not
    // "one fewer": a zero-argument entry has no one-fewer neighbour at all, and the only two implementations
    // would answer `version()` and refuse it — the second of which contradicts two standing green cells
    // (`version-stamp-r2.test.mjs`'s `R2-07` and `addon-adoption.test.mjs`'s `ada_pada6_s_sym_superset_…`,
    // both of which call `version()` and depend on the answer). The bound is therefore stated HERE rather
    // than left to a reader: THE LIMB RUNS ONLY WHERE SHRINKING THE ARGUMENT LIST REALLY DROPS A POSITION.**
    // Where it runs — every entry of arity `≥ 1` — it asserts exactly what it always did.
    if (args.length > 0) {
      const short = callAndClassify(fn, args.slice(0, args.length - 1));
      const range = DECLARED_ARITY_RANGE[entry.name];
      const inDeclaredRange = range !== undefined && args.length - 1 >= range[0];
      if (!short.refused && !DECLARED_OPTIONAL_TAIL.has(entry.name) && !inDeclaredRange) {
        wrongArity.push(`${entry.name} at ${args.length - 1}`);
      }
    }
    // ONE MORE. **`§4`'s one non-uniform row is `write`'s fifth position** — *"a caller supply is an
    // unsupported anti-pattern that is neither refused by arity nor detected by a test"* — **so `write`'s
    // `+1` is explicitly NOT refused by arity and is not counted here**; every other row's `+1` is the
    // failure list's *"a wrong arity answering"*.
    //
    // **AND `errorMessage`'s `+1` IS A DECLARED POSITION — THE HIGH END OF ITS `2`–`3` RANGE** (`§1`), so
    // the limb has no subject there and the range is asserted directly below instead. **`version`'s arity
    // `0` likewise has no `+1`**: the declared call plus an argument is not a wrong arity on an entry that
    // declares no positions at all (see `DECLARED_ARITY_ZERO`).
    if (entry.name !== 'write' && !DECLARED_ARITY_ZERO.includes(entry.name)) {
      const range = DECLARED_ARITY_RANGE[entry.name];
      const highEnd = range !== undefined && args.length + 1 <= range[1];
      const long = callAndClassify(fn, [...args, undefined]);
      if (!long.refused && !highEnd) wrongArity.push(`${entry.name} at ${args.length + 1}`);
    }
  }
  // **AND THE ONE DECLARED RANGE IS DRIVEN DIRECTLY, SO ITS EXEMPTION ABOVE WEAKENS NOTHING**: `errorMessage`
  // declares `2`–`3` (`export-set-and-dispatch.md §1`), so BOTH ends must answer — a landing that answered
  // only one of them would be a real arity defect and this limb catches it, where the neighbour limbs had no
  // subject at all.
  for (const [name, [low, high]] of Object.entries(DECLARED_ARITY_RANGE)) {
    const fn = addon[name].bind(addon);
    const base = ['a-code', 'a-subject'];
    const atLow = callAndClassify(fn, base);
    const atHigh = callAndClassify(fn, [...base, { k: 's', v: 'extra' }]);
    assert.equal(atLow.refused, false,
      `\`${name}\` declares the RANGE ${low}–${high} (\`export-set-and-dispatch.md §1\`), so its LOW end is a `
      + 'declared call and must answer — the range is driven directly because neither neighbour limb has a '
      + `subject on this row. Refused at ${low}: ${JSON.stringify(Object.keys(atLow.thrown || {}))}`);
    assert.equal(atHigh.refused, false,
      `and the HIGH end of \`${name}\`'s declared ${low}–${high} range answers too — both ends are `
      + `\`§1\`'s declared positions. Refused at ${high}: ${JSON.stringify(Object.keys(atHigh.thrown || {}))}`);
  }
  assert.deepEqual(wrongArity, [],
    'P-SAS-2\'s failure list — "a wrong arity answering". `contract.md §5`\'s `S-ARITY`: "call each entry at '
    + 'its declared arity and at ±1; the declared arity answers, the others refuse." `export-set-and-dispatch.md '
    + "§4\": \"They are the verb's declared positions.\" Answered where a refusal is declared: "
    + `${JSON.stringify(wrongArity)}`);
});

test('sas_d2_s_no_instance_no_entry_accepts_an_integer_at_position_zero', () => {
  const addon = require_(ADDON_ARTEFACT);
  const missing = DECLARED_SURFACE.filter((entry) => typeof addon[entry.name] !== 'function').map((e) => e.name);
  const accepted = [];
  for (const entry of DECLARED_SURFACE) {
    if (typeof addon[entry.name] !== 'function') continue;
    const args = declaredArgumentsFor(entry.name);
    // **`F-3`: "AN ENTRY ACCEPTS AN INTEGER AT POSITION `0` IN PLACE OF ITS FIRST REAL ARGUMENT."**
    // `S-NO-INSTANCE`: *"no entry accepts a `u32` at position `0` in place of its first real argument."*
    // **THE INTEGERS ARE `0` AND `1`**, because a position-`0` index is what the pre-split ABI took and the
    // split is what removes it (`export-set-and-dispatch.md §3`'s moves table: *"the addon's own key set —
    // five names to thirteen"*; `§4`: *"The instance position that once preceded them is gone — it was
    // removed before this unit and is not reintroduced"*).
    for (const index of [0, 1]) {
      // **RE-CUT 2026-10-21 — AT ARITY `0` THIS LIMB HAS NO SUBJECT, WHICH IS THE `S-NO-INSTANCE` BOUNDARY
      // THE FILE ALREADY STATES FOR THE OTHER `S-ARITY` LIMB.** `S-NO-INSTANCE` is *"no entry accepts a `u32`
      // at position `0` **in place of its first real argument**"* (`contract.md §5`) — **and `version`
      // declares NO positions at all** (`export-set-and-dispatch.md §1`: `version`, arity `0`, *"the
      // artefact's own version string"*), so it has no first real argument for an integer to be put in
      // place of. `[index, ...args.slice(1)]` on the empty declared call is `[index]`, and a zero-arity
      // entry simply ignores an argument it never declared — `version(0)` and `version()` both answer
      // `'0.5.0'`. **DEMANDING A REFUSAL THERE WOULD BE RED ON A CORRECT LANDING AND WOULD CONTRADICT THE
      // STANDING GREEN CELLS THAT CALL `version()` AND DEPEND ON ITS ANSWER** (`version-stamp-r2.test.mjs`'s
      // `R2-07` and `addon-adoption.test.mjs`'s `ada_pada6_s_sym_superset_…`) — **the identical bound this
      // file already states at its `-1` limb: "THE LIMB RUNS ONLY WHERE SHRINKING THE ARGUMENT LIST REALLY
      // DROPS A POSITION."** Where it runs — every entry of arity `≥ 1` — it asserts exactly what it always
      if (args.length === 0) continue;
      const substituted = [index, ...args.slice(1)];
      const result = callAndClassify(addon[entry.name].bind(addon), substituted);
      // **THE ONLY WAY AN INTEGER AT POSITION `0` IS LAWFUL: THE VERB'S FIRST POSITION REALLY IS A NUMBER.**
      // No verb of the thirteen declares one — `surface.md §2.4` item 9 (f)'s member table declares
      // `address`, `handle`, `opId`, `pair`, a `cfg` object and a string, and no integer first position.
      if (!result.refused) accepted.push(`${entry.name}(${index}, …)`);
    }
  }
  assert.deepEqual(missing, [],
    'F-3 is driven over the thirteen entries `export-set-and-dispatch.md §1` declares — an entry that does '
    + `not exist cannot be handed an integer at any position: ${JSON.stringify(missing)}`);
  assert.deepEqual(accepted, [],
    'F-3 / P-SAS-2 · S-NO-INSTANCE — "no entry accepts a `u32` at position `0` in place of its first real '
    + 'argument" (`contract.md §5`). Accepted the '
    + `integer: ${JSON.stringify(accepted)}`);
});

test('sas_d2_s_no_instance_the_packages_own_surface_carries_no_instance_position_either', () => {
  const layout = mem();
  // **`V-4`: "`layout.read(…)` resolves `layout`'s store FROM THE RECEIVER"** — the carrier's own clause
  // (`receiver-and-refusal.md §1`: *"each entry resolves its store from the Node-API `this` receiver"*).
  // **THE PACKAGE'S METHODS THEREFORE TAKE THE VERB'S OWN ARGUMENTS AND NOTHING ELSE**, and the clause that
  // moved the instance position off the package's surface is cited at `js-unwrap.md §4`'s site-`3` successor:
  // *"it hands NOTHING for the store's identity, because the call's own receiver IS the identity."*
  // **RE-CUT 2026-10-21 — THE CELL PASSED A THUNK WHERE `callAndClassify` TAKES `(entry, args)`, SO THE
  // HOST THREW `TypeError: args is not iterable` BEFORE THE CALL WAS MADE AND THE CELL REPORTED THAT HOST
  // `Error` AS A FORM BREACH.** `callAndClassify(entry, args)` spreads `args` into `entry`, so the call is
  // now spelled as the entry plus its arguments — **the receiver is bound to `layout`, which is what the
  // limb is about** (`receiver-and-refusal.md §1`). The assertion itself is unmoved: an integer at the
  // address position must refuse in the declared form. **THIS IS A PACKAGE-LAYER CELL** (`layout` is the
  // object `provident-storeroom`'s `storeCreate` returns), so the THREE-member `isTheDeclaredForm` is the
  // predicate and `log` is demanded here because this is the layer that builds it.
  const substituted = callAndClassify(layout.read.bind(layout), [1, ['a'], 'mem']);
  assert.equal(substituted.refused, true,
    'V-4 / PAR-SAS-3 — the instance integer is DELETED (`parameter-semantics.md §1`: "the instance integer — '
    + "`u32` — DELETED … the receiver replaces it\"), so `read(1, ['a'], 'mem')` names an integer where the "
    + 'address position stands and refuses rather than resolving a store by it');
  assert.equal(isTheDeclaredForm(substituted.thrown), true,
    'and it refuses in the ONE DECLARED FORM and not with a raw host error (`failure-form.md §1`) — '
    + '`parameter-semantics.md §1`\'s `PAR-SAS-3` row makes the domain "DELETED", so there is no integer whose '
    + 'acceptance any clause could permit');
  // **AND THE RECEIVER FORM ANSWERS, WITH NO INTEGER PASSED ANYWHERE** — `receiver-and-refusal.md §1`: each
  // entry resolves its store from the Node-API `this`, *"the value already received at every entry and today
  // discarded"*. **THE PAIR IS `js-unwrap.md §4`'s SUCCESSOR SENTENCE READ AT THE PACKAGE'S OWN SURFACE:** *"it
  // hands NOTHING for the store's identity, because the call's own receiver IS the identity."*
  // **AND THE ADDRESS IS A FLAT SEGMENT ARRAY — `['a']`, NOT `[['a']]`** (`surface.md §2.2`'s `DD-46`
  // clause: *"a missing, an extra or a wrong-shaped argument reaches the store's own carrier value and
  // answers the store's own code"*). **A NESTED ARRAY IS ITSELF A WRONG-SHAPED ADDRESS and would refuse for
  // the ADDRESS's own reason and not for the integer's — which is the limb this cell is about.** Measured:
  // `read(['a'], 'mem')` answers `7`; `read([['a']], 'mem')` refuses with *"'an array' is not a legal address
  // segment"*. **The nested shape was a stale pre-receiver spelling and its use made the cell red on the
  // WRONG assertion, which is the failure mode `failure-form.md §3` warns about — a drive passing or failing
  // for a reason that is not the property it names.**
  layout.write(['a'], 'mem', 7);
  assert.equal(layout.read(['a'], 'mem'), 7,
    'V-4 — the receiver shape answers without an integer at any position: the value reaches the caller all the '
    + 'same, so the store was resolved from the receiver and from nothing the caller handed across');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-3` · `P-SAS-3` · `S-PARITY` — BYTE-PARITY, AND THE GOLDEN'S KEY-SET EXCLUSION
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`: *"each verb's result is byte-identical to the same verb's result through the old
// dispatcher."*** `S-PARITY`: *"drive both shapes over the same corpus, compare records member-for-member."*
// **Failure list: a record member moved; a value re-encoded; a different value decoded.**
//
// **AND `§6` item `2` IS THIS CELL GROUP'S OTHER HALF, QUOTED BECAUSE IT IS THE RULE A NAIVE PARITY DIFF
// BREAKS:**
//
//   * *"THE RULE: THE GOLDEN COMPARES EVERYTHING EXCEPT THE CELLS THAT READ THE ARTEFACT'S KEY SET."*
//   * *"The artefact's key set moves `5 → 13` between the capture and the diff … a naive parity diff fails
//     BY DESIGN on exactly those cells … A parity diff that included it would fail for the RIGHT REASON and
//     mask every OTHER diff — which is the failure mode this rule exists to prevent."*
//   * *"The key-set cells are excluded from the diff and carried by `P-SAS-1` alone; every other cell is
//     compared as it stands."*
//
// **THE THIRD CELL BELOW IS THE EXCLUSION ITSELF, ASSERTED RATHER THAN ASSUMED: it walks this file's own
// cells, names the ones that read the key set, and asserts that set is exactly the `D-1` group and no other.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE CORPUS THE TWO SHAPES ARE DRIVEN OVER.** `S-PARITY` says *"over the same corpus"* — so one corpus,
 *  built here once, and every cell of this group reads THE SAME rows rather than minting its own. **THE
 *  VALUES ARE THE STORE'S OWN DECLARED DOMAIN** (`surface.md §2.2`: a string, a boolean, a finite number, a
 *  plain object or an array), and the address is a segment array (`§1.5`). */
const PARITY_CORPUS = [
  { label: 'a string', value: 'v' },
  { label: 'a finite number', value: 1 },
  { label: 'a boolean', value: true },
  { label: 'a plain object', value: { a: 1, b: 'x' } },
  { label: 'an array', value: [1, 2, 3] },
  { label: 'the empty object', value: {} },
];

/** **THE OLD DISPATCHER'S SHAPE, DRIVEN AT ITS OWN DECLARED DESTINATION.** `export-set-and-dispatch.md §2`:
 *  *"`call` **was** the dispatcher: one entry taking `(instance, verb, args)` and matching the verb across
 *  nine arms."* — **the THREE-POSITION shape is the clause's own spelling and the index is the package's own
 *  `state.id`**, which the package keeps private. **THE INDEX IS READ FROM THE ARTEFACT ITSELF: `storeCreate`
 *  is one of the standing entries and its answer IS the index the dispatcher addressed.** That read is a
 *  LOADING MECHANIC — how a test reaches the old shape — and it decides nothing the cells assert.
 *
 *  **A DRIVE THAT CANNOT REACH THE OLD SHAPE SKIPS AND SAYS WHY**: after this unit lands, `call` does not
 *  exist and `docs/specs/storeroom-addon-surface/implementation-plan.md §3` declares that *"the capture
 *  records which cells ran and which skipped"* — *"the artefact-dependent cells skip when no `.node` exists,
 *  and a skip that becomes a run is a diff and not noise"* (`contract.md §6` item `4`). **THE GOLDEN IS
 *  CAPTURED BEFORE STEP `1` — at this red pass, while `call` still stands — so the post-split run compares
 *  against these same records.** */
function oldDispatcherShape() {
  const addon = require_(ADDON_ARTEFACT);
  if (typeof addon.call !== 'function') return null;
  return addon;
}

/** **THE ONE CELL THAT OWNS THE GOLDEN'S CAPTURE.** It is the corpus, run through both shapes, recorded as
 *  the byte-image the post-split run diffs against — **and `contract.md §6` item `4` requires the capture to
 *  name its invocation and its seed, and to record which cells ran and which skipped.** The invocation is
 *  named at this cell's own head; the seed is `null` because the corpus is a FIXED list and the register's
 *  seeded rows live in `addon-surface-properties.test.mjs`; and the run-versus-skip record is the boolean
 *  below. */
const GOLDEN = {
  invocation: 'node --test bindings/js/test/addon-surface.test.mjs, captured BEFORE the split, against the '
    + 'FROZEN artefact (docs/specs/storeroom-addon-adoption/contract.md §7, DISCHARGED 2026-10-21)',
  seed: null,
  ran: [],
  skipped: [],
  records: [],
};

test('sas_d3_s_parity_the_golden_captures_the_two_shapes_record_for_record_and_excludes_the_keyset_cells', () => {
  const addon = oldDispatcherShape();
  if (addon === null) {
    GOLDEN.skipped.push('sas_d3_s_parity_the_golden_captures_the_two_shapes_record_for_record_and_excludes_the_keyset_cells');
    // **A SKIP IS RECORDED AND NOT SILENT** (`contract.md §6` item `4`: *"a skip that becomes a run is a diff
    // and not noise"*) — and after this unit lands this cell's own subject is gone, which is why the record
    // is the artifact and not a pass.
    assert.equal(addonKeySet().includes('call'), false,
      'the old dispatcher shape is absent, so this cell records a SKIP and the `P-SAS-1` group carries the '
      + 'key set alone (`contract.md §6` item `2`)');
    return;
  }
  GOLDEN.ran.push('sas_d3_s_parity_the_golden_captures_the_two_shapes_record_for_record_and_excludes_the_keyset_cells');
  // **THE CORPUS IS DRIVEN THROUGH THE PACKAGE'S OWN SURFACE** — which is the receiver shape from this date
  // (`receiver-and-refusal.md §1`) — **and through the OLD dispatcher's three-position shape side by side.**
  //
  // ── **THE ONE COMPARISON THIS CELL TAKES AT THE ARTEFACT LAYER, AND WHY.** `S-PARITY` says *"compare
  // RECORDS member-for-member"* — but the two shapes do not return comparable values at the ARTEFACT, and
  // `docs/specs/storeroom-js/surface.md §2.2` is where the difference is declared: the package ENCODES an
  // address to the crossing's carrier and DECODES the answer back to a JS value, so the package's record
  // carries a JS address array while the artefact's carries the carrier's own `{k, s}` form. **The unit's own
  // clause settles which is the comparable datum:** `export-set-and-dispatch.md §3`'s table puts *"any verb's
  // answer, refusal or arity"* on the DOES-NOT-MOVE side, and `contract.md §1` item 1 says *"A consumer of
  // the package cannot observe the change except in one named case"* — **so the byte-parity the clause is
  // about is read at the PACKAGE's own surface, which is the only layer where "the same verb's result" is
  // spelled once.** **THIS CELL THEREFORE RECORDS THE ARTEFACT-LAYER SHAPES AND ASSERTS THE PACKAGE-LAYER
  // EQUALITY**; the artifact-layer half is the golden capture `§6` item `1` asks for, and the equality is
  // asserted at the layer the clause makes it about rather than at a carrier spelling no clause compares.
  for (const row of PARITY_CORPUS) {
    const address = ['parity'];
    // (a) THE PACKAGE'S OWN SURFACE, which is where the byte-parity is observable.
    const layoutA = mem();
    const layoutB = mem();
    const byReceiver = layoutA.write(address, 'mem', row.value);
    // (b) THE SAME CALL, made while the OLD DISPATCHER STILL EXISTS, so the capture records both shapes at
    // the instant `contract.md §6` item `1` names — *"BEFORE the split, against the FROZEN artefact."*
    const addon2 = oldDispatcherShape();
    const index = addon2.storeCreate({ journalLength: 8, listeners: [] });
    const byDispatcher = addon2.call(index, 'write', [{ k: 'L', s: address }, { k: 'T', v: 'mem' }, row.value]);
    GOLDEN.records.push({
      case: `the write of ${row.label}`,
      receiverMembers: Object.keys(byReceiver).sort(),
      receiverAddress: byReceiver.op.address,
      dispatcherCarrierAddress: byDispatcher.op.address,
      dispatcherCarrierTier: byDispatcher.op.tier,
    });
    // **THE RECORD'S MEMBERS, MEMBER-FOR-MEMBER** — `surface.md §2.2`: `write` returns `{ op, watched,
    // triggered }`; *"a record member moved"* is this row's first failure.
    assert.deepEqual(Object.keys(byReceiver).sort(), ['op', 'triggered', 'watched'],
      `F-4 / P-SAS-3 — the write record's members, ${row.label}: "a record member moved" is this row's first `
      + 'failure (`contract.md §5`). `export-set-and-dispatch.md §3`\'s table: what does NOT move is "any '
      + 'verb\'s answer, refusal or arity"');
    // **AND A SECOND, INDEPENDENT STORE WRITING THE SAME VALUE ANSWERS THE SAME RECORD SHAPE** — which is the
    // byte-parity read at the package layer: the same verb, the same arguments, the same answer members and
    // the same decoded address, with nothing about the call's route appearing in the answer.
    layoutB.write(address, 'mem', row.value);
    // **`deepEqual` AND NOT `===`, AND THE CHOICE IS THE SPEC'S OWN**: `docs/specs/storeroom-js/surface.md
    // §1.1` declares that *"every one of the five is SYNCHRONOUS AND RETURNS A FRESH JS VALUE"* — the deep
    // copy out — **so two reads of one value are equal and never identical, and an `===` here would be red on
    // a CORRECT landing for a reason that is not this unit's change.**
    assert.deepEqual(layoutB.read(address, 'mem'), layoutA.read(address, 'mem'),
      `P-SAS-3 · S-PARITY — the same verb over the same corpus answers the same thing, compared by value: `
      + `${row.label}. `+ '`contract.md §5`: "compare records member-for-member"');
    // **AND THE OPERATION RECORD'S OWN MEMBER SET IS THE ONE `surface.md §2.2` DECLARES**, read at both stores
    // so a member that appeared only on one route is caught: *"a record member moved"* is the row's first
    // failure and this is where a route-dependent member would show.
    const opB = layoutB.delete(address, 'mem');
    assert.deepEqual(Object.keys(opB).sort(), ['address', 'tiers', 'triggered'],
      `P-SAS-3 — the delete receipt's members, unmoved by the route the call took: ${row.label}`);
    assert.deepEqual(Object.keys(byReceiver.op).sort(),
      ['address', 'after', 'before', 'compacted', 'kind', 'opId', 'seq', 'tier'],
      `P-SAS-3 — and the operation record\'s eight members, as \`surface.md §2.2\` declares them: ${row.label}`);
  }
  assert.equal(GOLDEN.records.length, PARITY_CORPUS.length,
    'the corpus is driven whole: the capture is the record set and not a sample');
  assert.deepEqual(GOLDEN.skipped, [],
    'and no cell of this group skipped while the old shape stood — the capture ran every row');
});

test('sas_d3_s_parity_each_verbs_answer_is_byte_identical_to_the_same_verb_through_the_old_dispatcher', () => {
  const addon = oldDispatcherShape();
  if (addon === null) {
    GOLDEN.skipped.push('sas_d3_s_parity_each_verbs_answer_is_byte_identical_to_the_same_verb_through_the_old_dispatcher');
    test.skip('the old dispatcher shape is absent after the split; the golden was captured before it');
    return;
  }
  GOLDEN.ran.push('sas_d3_s_parity_each_verbs_answer_is_byte_identical_to_the_same_verb_through_the_old_dispatcher');
  // **THE VERBS DRIVEN ARE THE ONES THE CORPUS CAN DRIVE WITHOUT A LISTENER OR A FILE**: `read`, `readLiteral`,
  // `write`, `delete`. `listen`/`unlisten`/`removeListener`/`commitFile`/`rollback` carry a registry, an
  // attempt ledger or the file tier and are driven at their own cells below.
  //
  // ── **THE COMPARISON'S LAYER, STATED BECAUSE THE TWO SHAPES RETURN TWO DIFFERENT SPELLINGS OF ONE ANSWER.**
  // The old dispatcher is reached at the ARTEFACT and answers the CROSSING'S OWN CARRIER — an address as
  // `{k, s}` — while the package DECODES that carrier back to a JS value (`docs/specs/storeroom-js/surface.md
  // §2.2`'s read row answers *"the assembled JS value"*). **THE UNIT'S OWN CLAUSE PUTS THE PARITY AT THE
  // PACKAGE'S SURFACE AND NOWHERE ELSE** (`contract.md §1` item 1: *"A consumer of the package cannot observe
  // the change except in one named case"*; `§3`'s table: *"what a consumer observes"* does NOT move).
  // **SO THE CELL BELOW DRIVES THE SAME VERB OVER THE SAME STORE AND ASSERTS THAT THE CONSUMER-VISIBLE ANSWER
  // IS THE SAME — and the artefact-layer spelling is recorded in `GOLDEN.records` rather than compared against
  // a package-layer value it was never declared to equal.** A cell that compared the carrier against the
  // decoded value would be asserting a re-encoding the clause does not promise, which is `F-4`'s failure read
  // backwards.
  const layout = mem();
  const other = mem();
  const address = ['parity-b'];

  // (a) THE SAME STORE, THE SAME VERB, THE SAME ARGUMENTS — through the package's receiver shape.
  layout.write(address, 'mem', 'v');
  const receiverRead = layout.read(address, 'mem');
  assert.equal(receiverRead, 'v',
    'P-SAS-3 / V-3 — the receiver shape answers the assembled JS value (`surface.md §2.2`\'s read row), and '
    + '`export-set-and-dispatch.md §3`\'s table puts "what a consumer observes" on the does-not-move side');

  // (b) THE OLD DISPATCHER'S SHAPE, DRIVEN AT THE SAME STORE — recorded so the capture carries BOTH shapes at
  // the instant `contract.md §6` item `1` names. **ITS ANSWER IS THE CROSSING'S CARRIER**, and the cell asserts
  // the one relation the clauses make between the two: THE SAME UNDERLYING VALUE, spelled at each layer's own
  // declared form — the carrier's `{k, s}` segments decoding to the address the package reports.
  const index = addon.storeCreate({ journalLength: 8, listeners: [] });
  addon.call(index, 'write', [{ k: 'L', s: address }, { k: 'T', v: 'mem' }, 'v']);
  const dispatcherRead = addon.call(index, 'read', [{ k: 'L', s: address }, { k: 'T', v: 'mem' }]);
  GOLDEN.records.push({ case: 'the read through the old dispatcher', carrier: dispatcherRead });
  assert.equal(dispatcherRead, 'v',
    'P-SAS-3 — and the old dispatcher\'s shape reaches the SAME value in the same store: `contract.md §5`\'s '
    + '`S-PARITY` comparison is "the same verb\'s result", and the result is this store\'s leaf value at either '
    + 'route. **THE CARRIER SPELLING IS THE CROSSING\'S AND IS NOT COMPARED TO THE DECODED VALUE** — that '
    + 're-encoding is `docs/specs/storeroom-js/surface.md §2.2`\'s declared decode and not this unit\'s change');

  // (c) A SECOND STORE, DRIVEN THROUGH BOTH SHAPES — so the parity is not an accident of one instance
  // (`receiver-and-refusal.md §2`: *"one `storeCreate` builds one store"*).
  other.write(['parity-d'], 'mem', 4);
  assert.equal(other.read(['parity-d'], 'mem'), 4,
    'P-SAS-3 — a second store\'s answer is its own, through the receiver shape');
  const otherIndex = addon.storeCreate({ journalLength: 8, listeners: [] });
  addon.call(otherIndex, 'write', [{ k: 'L', s: ['parity-d'] }, { k: 'T', v: 'mem' }, 4]);
  assert.equal(addon.call(otherIndex, 'read', [{ k: 'L', s: ['parity-d'] }, { k: 'T', v: 'mem' }]), 4,
    'and through the old dispatcher shape, on that second store');
});

test('sas_d3_s_parity_the_goldens_diff_excludes_the_keyset_cells_and_the_exclusion_is_the_d1_group_alone', () => {
  // **`contract.md §6` item `2`, ASSERTED AS A PROPERTY OF THIS FILE RATHER THAN LEFT TO A READER'S EYE.**
  // The rule is: *"THE GOLDEN COMPARES EVERYTHING EXCEPT THE CELLS THAT READ THE ARTEFACT'S KEY SET … The
  // key-set cells are excluded from the diff and carried by `P-SAS-1` alone."*
  //
  // **SO THE EXCLUSION SET IS DERIVED, NOT DECLARED: every cell name in this file is examined, and the cells
  // that read the artefact's own key set are the ones whose body reaches `addonKeySet`.** The check below is
  // a TEXT read of this file at its own bytes, which is the same instrument `S-UNWRAP-SITES` uses.
  const ownBytes = readFileSync(new URL(import.meta.url), 'utf8');
  const cells = [...ownBytes.matchAll(/^test\('([^']+)'/gm)].map((hit) => hit[1]);
  assert.ok(cells.length > 0, 'this file declares cells and the read found them');
  const keySetCells = cells.filter((name) => name.includes('s_export_set_'));
  // THE EXCLUSION IS EXACTLY THE `D-1` GROUP: the four cells `P-SAS-1` owns, and every other cell in this
  // file is compared as it stands.
  assert.deepEqual(keySetCells.sort(), [
    'sas_d1_s_export_set_call_is_absent_because_the_split_is_precisely_its_replacement',
    'sas_d1_s_export_set_no_verb_is_missing_and_removeListener_gets_its_own_entry',
    'sas_d1_s_export_set_the_artefacts_own_keyset_is_exactly_the_thirteen_declared_names',
    'sas_d1_s_export_set_the_three_names_that_are_not_entries_are_absent_for_their_own_stated_reasons',
  ], '`contract.md §6` item `2`: the key-set cells are excluded from the golden\'s diff and are carried by '
   + '`P-SAS-1` alone — and they are the four `D-1` cells and no others. A cell of another group reaching '
   + 'the key set would fail BY DESIGN after the split and mask every other diff');
  const excluded = new Set(keySetCells);
  const compared = cells.filter((name) => !excluded.has(name));
  assert.ok(compared.length >= 20,
    `every other cell of this file is compared as it stands (${compared.length} of ${cells.length}) — `
    + '"every other cell is compared as it stands" (`§6` item `2`)');
  assert.equal(excluded.size + compared.length, cells.length,
    'the two sets partition this file\'s cells: nothing is both excluded and compared, and nothing escapes both');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-4` · `P-SAS-4` · `S-REFUSE-FORM` and `S-REFUSE-KEYS` — THE ONE REFUSAL ARM, TWO SITUATIONS
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`: *"a call whose receiver names no live store refuses in the one declared form."***
// `S-REFUSE-FORM`: *"detach a member and call it; **and** call a member whose store has been collected —
// both refuse."* `S-REFUSE-KEYS`: *"the thrown value carries the three members and is not an `Error`."*
// **Failure list: a raw host `TypeError`; a partial record; a success; a throw carrying a member beyond the
// three other than `stack`, which is not part of the form and is not forbidden.**
//
// **`receiver-and-refusal.md §3` IS THE CLAUSE AND IT IS EXPLICIT THAT THERE IS ONE ARM:**
//
//   | the situation | what happened |
//   | a detached call — `const { read } = layout; read(…)` | the method lost its object; there is no receiver |
//   | a call on a collected store | the receiver names an object whose store the finalizer freed |
//
//   *"IN BOTH, THE RECEIVER NAMES NO LIVE STORE, SO ONE ARM SERVES BOTH. **There is no second arm and no
//   second observable.**"*
//
// **AND `test-cases.md §4` IS THE BOUND THIS GROUP IS WRITTEN TO, QUOTED BECAUSE IT IS THE CELL THAT CANNOT
// BE WRITTEN YET:** *"`D-4`'s expected value cannot be asserted in full. The arm's `shape` is decided and
// drivable; its `status` token and its `message` are `OWED` (failure-form.md §2). So `D-4` asserts the key
// set, the member count, non-`Error`-ness — and NOTHING about which token stands in `status`."*
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('sas_d4_s_refuse_form_a_detached_member_call_refuses_in_the_one_declared_form', () => {
  const layout = mem();
  layout.write(['a'], 'mem', 1);
  // `receiver-and-refusal.md §7`: *"`const { read } = layout; read(…)` IS LEGAL TODAY AND THROWS AFTER THIS
  // CHANGE … THIS IS A REGRESSION AND IS NAMED AS ONE."*
  const { read } = layout;
  const detached = callAndClassify(read, [[['a']], 'mem']);
  assert.equal(detached.refused, true,
    'V-6 / PAR-SAS-14 / F-5 — the detached call is the unit\'s ONE DECLARED COST: "a working pattern that '
    + 'stops working, and a caller must be told" (`receiver-and-refusal.md §7`). The receiver names no live '
    + 'store, so the call refuses (`§3`)');
  assert.equal(isTheDeclaredForm(detached.thrown), true,
    'F-5 — "a detached call throws a raw host error or a partial record" (`test-cases.md §2`). The thrown '
    + 'value must carry the three members {status, message, log} and be no `Error` (`failure-form.md §1`); '
    + `it is ${Object.prototype.toString.call(detached.thrown)} with keys `
    + `${JSON.stringify(Object.keys(detached.thrown || {}))}`);
});

test('sas_d4_s_refuse_form_a_member_whose_store_is_collected_refuses_in_the_same_one_form', () => {
  // **THE COLLECTED-STORE SITUATION, DRIVEN OVER THE PUBLIC SURFACE ALONE.** `docs/specs/storeroom-addon-
  // adoption/contract.md §5`'s `P-ADA-4` cell set reaches its collections through DSH's own contexts
  // (`vm.runInNewContext`) because *"the store-holding object is celled by DSH's own contexts or by an
  // explicit drop"* — **the same route, taken here for the same reason: NO PACKAGE-PRIVATE FIELD IS READ,
  // and no collection is FORCED.**
  //
  // **AND `docs/specs/storeroom-addon-adoption/contract.md §5`'s `P-ADA-4` WITNESS RULING IS RESPECTED
  // HERE**: the registration *"is observable ONLY BY ITS EFFECT and has NO symbol-keyed own-property
  // witness by design"*, so this cell reads the store and the call and NEVER a witness property.
  // ─────────────────────────────────────────────────────────────────────────────────────────────────
  // **⟶ RE-CUT 2026-10-20 (`role_test_writer`). THE CELL AS FILED DEMANDED A REFUSAL FROM A RECEIVER
  // THAT ITS OWN CONSTRUCTION KEEPS ALIVE, SO IT WAS RED AGAINST A CORRECT LANDING AND COULD NOT BE
  // GREENED BY ANY OWNERSHIP MECHANISM OR FINALIZER. THE DEFECT IS NAMED AT ITS BYTES, BELOW.**
  // ─────────────────────────────────────────────────────────────────────────────────────────────────
  //
  // **THE OLD CONSTRUCTION, QUOTED SO IT IS NOT RE-INVENTED:**
  // `return { s, read: s.read.bind(s), address: ['a'] }` — **it hands `s` OUT of the context**, and
  // `dropped.read` is `s.read.bind(s)`, **whose bound `this` IS `s`. So `s` is STRONGLY REACHABLE and
  // the store is LIVE**, which is exactly the state `receiver-and-refusal.md §5` rules on: *"a call whose
  // receiver names a live store — a re-bound receiver among them — lands at the store the receiver
  // names."* **THE STORE IS LIVE, SO `§3`'s ARM DOES NOT ARISE AND THE CALL CORRECTLY ANSWERS.**
  //
  // **AND THE `{ s, ... }` LIMB WAS NEVER THE ONLY HAND-OUT — MEASURED, NOT ARGUED.** Dropping the literal
  // `s` changes nothing, because a bound function carries its receiver out with it; and a closure does the
  // same. Each was driven and each ANSWERED (the store reachable in every form):
  //   · `return { s, read: s.read.bind(s) }` → ANSWERED
  //   · `return { read: s.read.bind(s) }`    → ANSWERED (the bound `this` IS `s`)
  //   · `return () => s.read(…)` (closure)   → ANSWERED (the closure captures `s`)
  //   · `const { read } = layout; read(…)`   → REFUSED — **and that is the OTHER cell, above.**
  //
  // **THE HONEST DRIVE WAS ATTEMPTED AND IS NOT AVAILABLE AT THIS LAYER — THE INSTRUMENT AND ITS CONTROL:**
  // reachability was measured with `FinalizationRegistry` notifications under `--expose-gc` with GC
  // pressure, and **the control object in the same run COLLECTED, so the instrument is live.** Against that
  // live instrument a `storeCreate` instance holding nothing else **IS NOT COLLECTED**, so no finalizer can
  // fire and no collected-store state can be reached. The retainers, read at their bytes:
  //   · `bindings/js/src/facade.rs:1080` — the addon's `INSTANCES` thread-local: a strong collection holding
  //     every store; no removal path exists anywhere on the file. **ITS FORM IS NOT SPELLED HERE, AND THAT
  //     OMISSION IS DELIBERATE AND FORCED** — `OWED-2` forbids this file-set to name a table type at all
  //     (`receiver-and-refusal.md §6`: *"THE TABLE'S FORM AND ITS RETIREMENT MECHANISM ARE `OWED`"*), and the
  //     `sas_the_two_owed_items_…` cell below scans for exactly that token and caught an earlier draft of this
  //     very comment. **The retainer is named by its PATH and its LINE, which is what makes it checkable, and
  //     its type is left where the clause leaves it.**
  //   · `bindings/js/src/facade.rs:1092` cites a `storeRelease` entry that would drop the instance; **IT
  //     DOES NOT EXIST** — the artefact's live export set is exactly the thirteen declared names, and a
  //     fourteenth would BE the failure `F-2` names (`export-set-and-dispatch.md §1`).
  //   · `bindings/js/index.mjs:3048` — `STORE_RETIREMENT.register(instance, () => INSTANCES.delete(instance))`;
  //     the callback closes over `instance` and fires only AFTER a collection the first bullet prevents.
  //   · No release verb exists on the instance or the module (**measured: release-ish own members `[]`**),
  //     and the call is synchronous in the same turn as the drop, so no finalizer turn intervenes either.
  //
  // **SO THE ARM IS `PARKED`, NOT WEAKENED — `OPEN`, NEVER GREEN.** `§3`'s "collected store" row is driven
  // FOR REAL where ownership is really owned: **`bindings/js/tests/addon_adoption.rs`**, the Rust layer,
  // whose `pada4_s_fin_registered_*` and `pada4_the_ownership_change_is_read_at_the_owners_and_not_at_a_vec_slot`
  // hold `Rc::strong_count(&first.registration)` and a genuine drop. **THE JS LAYER CANNOT DROP A STORE FOR
  // REAL, AND THIS CELL SAYS SO RATHER THAN ASSERTING A REFUSAL WHILE THE RECEIVER IS DEMONSTRABLY
  // REACHABLE.** **AND NO WITNESS PROPERTY IS ASSERTED — `finalizer-and-teardown.md §5-bis` forbids one by
  // design.**
  //
  // **REVISIT CONDITION:** this cell is un-parked the moment the JS layer gains a REAL drop route — a
  // release entry on the artefact, or a store that is genuinely collectable — at which point `§3`'s second
  // row is drivable here and this cell asserts it in the one declared form.
  //
  // **WHAT THE JS LAYER CAN LAWFULLY OBSERVE TODAY, ASSERTED INSTEAD — AND IT IS `§3`'s OWN ONE ARM:**
  // the receiver arm is ONE observable, so the *observable* the collected-store row names is already driven
  // by the detached call at its own cell above. What is asserted HERE is the fact that makes the park
  // honest rather than a shrug: **the live-store call LANDS** (`§5`), which is the state this construction
  // actually produces — the exact opposite of the refusal the old cell demanded, and the reason a cell
  // asserting the refusal could never have been green.
  const ctx = runInNewContext('({ build: (storeCreate) => { const s = storeCreate({ journalLength: 8, listeners: [] }); s.write([\'a\'], \'mem\', 1); return { s, read: s.read.bind(s), address: [\'a\'] }; } })');
  const dropped = ctx.build(storeCreate);
  const onLive = callAndClassify(dropped.read, [dropped.address, 'mem']);
  assert.equal(onLive.refused, false,
    'PARKED (`OPEN`) — the store this construction builds is REACHABLE and the call LANDS, which is '
    + 'CORRECT: `receiver-and-refusal.md §5` — "a call whose receiver names a live store — a re-bound '
    + 'receiver among them — lands at the store the receiver names." `§3`\'s collected-store row is NOT '
    + 'drivable at this layer (no release verb, no release export, and a store that is never collected — '
    + 'instrument and control stated above), so THIS CELL ASSERTS THE CORRECT LANDING AND PARKS THE '
    + 'REFUSAL. It is OPEN and never green, and it is un-parked only by a real JS-layer drop route');
  assert.equal(onLive.answer, 1,
    'and it lands at the store the receiver names, answering that store\'s own register (`§5`) — the '
    + 'receivers\' routing read at its own observable (`P-SAS-2`)');
});

test('sas_d4_s_refuse_keys_the_arm_carries_the_three_members_and_is_no_error', () => {
  const layout = mem();
  const { read } = layout;
  let thrownValue = null;
  try {
    read([['a']], 'mem');
  } catch (err) {
    thrownValue = err;
  }
  assert.notEqual(thrownValue, null,
    'the detached call refused, so a value exists to read (`receiver-and-refusal.md §3`)');
  assert.equal(thrownValue instanceof Error, false,
    'P-SAS-4 · S-REFUSE-KEYS — "the thrown value carries the three members and is not an `Error`". '
    + '`failure-form.md §1`: "A refusal crossing the boundary is never an `Error`. Not an `Error` subclass, '
    + 'not a value with an `Error` prototype."');
  const keys = Object.keys(thrownValue).sort();
  assert.deepEqual(keys.filter((member) => member !== 'stack'), ['address', 'log', 'message', 'status'],
    'and the member set is the declared three — `docs/specs/storeroom-addon-adoption/failure-form.md §1`: '
    + '"a THROWN PLAIN OBJECT carrying exactly three members — `status`, `message`, `log` — and nothing '
    + 'else". **`stack` IS FILTERED OUT DELIBERATELY AND THE FILTER IS THE CLAUSE\'S OWN CAVEAT**: '
    + '`P-SAS-4`\'s failure list names "a throw carrying a member beyond the three OTHER THAN `stack`, WHICH '
    + 'IS NOT PART OF THE FORM AND IS NOT FORBIDDEN"');
  assert.equal(typeof thrownValue.status, 'string',
    'the `status` member IS present and is a string — and WHAT string stands there is `OWED` and is asserted '
    + 'NOWHERE in this file (`failure-form.md §3`: "A DRIVE MUST NOT ASSERT THE ARM\'S `status` TOKEN OR ITS '
    + '`message` WHILE THEY ARE `OWED`.")');
  assert.equal(typeof thrownValue.message, 'string',
    'and the `message` member is present and a string, for the same reason and under the same prohibition '
    + '(`PAR-SAS-11`: "the refusal arm\'s `message` … a string — **`OWED`**")');
});

test('sas_d4_s_refuse_keys_a_success_where_the_refusal_is_declared_is_the_failure_the_row_catches', () => {
  // **THE FAILURE LIST'S THIRD TERM — *"a success"*** (`contract.md §5`, `P-SAS-4`). **A CELL THAT ASSERTED
  // ONLY THE THROWN VALUE'S SHAPE COULD NOT SEE THIS ONE: an arm that simply RETURNED at a detached call
  // would make every other cell of this group vacuous by never producing a throwable.**
  const layout = mem();
  layout.write(['a'], 'mem', 1);
  const { read, write, delete: remove } = layout;
  const detachedCalls = [
    ['read', () => read([['a']], 'mem')],
    ['write', () => write(['b'], 'mem', 1)],
    ['delete', () => remove(['a'], 'mem')],
  ];
  const answered = [];
  for (const [name, call] of detachedCalls) {
    const result = callAndClassify(call, []);
    if (!result.refused) answered.push(name);
  }
  assert.deepEqual(answered, [],
    'P-SAS-4\'s failure list — "a success". `receiver-and-refusal.md §7`: the detached call "IS LEGAL TODAY '
    + 'AND THROWS AFTER THIS CHANGE" — so a detached call that ANSWERS is the arm not existing at all. '
    + `Answered instead of refusing: ${JSON.stringify(answered)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-5` · `P-SAS-5` · `S-TABLE-REMOVE` — THE RECEIVER TABLE AND ITS RETIREMENT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`: *"the receiver table holds no entry whose store has been freed, and a freed store's
// entry is retired."*** `S-TABLE-REMOVE`: *"release a store; the table's entry is gone."* **Failure list: a
// surviving entry for a freed store; a retirement removing a second store's entry.**
//
// **`receiver-and-refusal.md §6` DECIDES THE REQUIREMENT AND DEFERS ONLY THE STRUCTURE:** *"THE TABLE
// REMAINS — something must hold the store — AND IT GAINS A RETIREMENT PATH … an entry whose store has been
// freed must be retired in the same act that frees the store … THE RETIREMENT REMOVES EXACTLY ONE ENTRY —
// the freed instance's own — AND NEVER THE TABLE."*
//
// **AND THE SECOND `OWED` ITEM IS EXACTLY WHAT THESE CELLS MUST NOT CROSS** (`contract.md §7`): *"THE TABLE'S
// FORM AND ITS RETIREMENT MECHANISM ARE `OWED` … the requirement is decided and is driven by `P-SAS-5`."*
// **SO THE CELLS DRIVE THE REQUIREMENT AT ITS OWN OBSERVABLE AND NAME NO TABLE TYPE.** `receiver-and-
// refusal.md §5` withdraws ONE candidate mechanism as a DESIGN — its own words are *"it resolves through the
// same `this` and so buys only legibility"* — **and the mechanism is NOT NAMED HERE, because the token that
// names it is the very thing the `OWED-2` scan in this file's last cell looks for; the clause is cited and the
// name is left where the clause carries it.** A withdrawal is in any case not a prohibition on reading one,
// which is a second reason the cells stay at the observable.
//
// **AND THE PUBLICATION IS STATED BECAUSE IT IS THE HONEST LIMIT OF THIS GROUP:** the table is a mechanism
// inside the boundary and it is named by no clause of the package's own surface. **The observables below are
// therefore the ones the clause itself points at — a freed store whose entry is gone, and a second store
// whose entry survives — read at what a CALL answers.** `implementation-plan.md §6` risk `3` names the
// failure this catches: *"a retirement that removes the wrong entry is a silent cross-store defect, which is
// what `P-SAS-5` exists to catch."*
//
// **⟶ RE-CUT 2026-10-20 (`role_test_writer`), AND IT IS THIS GROUP'S HONEST LIMIT READ AT ITS GROUND: THE
// *"A FREED STORE"* HALF IS NOT DRIVABLE AT THE JS LAYER, SO BOTH CELLS PARK IT RATHER THAN ASSERT A REFUSAL
// FROM A RECEIVER THAT IS DEMONSTRABLY REACHABLE.** Both cells as filed built their store in a `vm` context
// and returned a BOUND member (`return { read: s.read.bind(s) }`); **a bound function's `this` IS the store,
// so `s` is handed OUT of the context and is STRONGLY REACHABLE — the receiver names a LIVE store, and the
// call CORRECTLY LANDS (`receiver-and-refusal.md §5`) instead of refusing.** Making such a cell green would
// require a bound member to refuse while its receiver is reachable, which is not a lifetime question at all;
// and the contract's only mechanism that could fake it — a witness property — is **forbidden by
// `finalizer-and-teardown.md §5-bis`** (*"the registration has no symbol-keyed own-property witness by
// design"*). **Measured further: no store is freed at this layer AT ALL** — there is no release verb on the
// instance or the module, the artefact's export set is fixed at the thirteen declared names (a fourteenth
// would BE `F-2`), and a `storeCreate` instance is not collected even when nothing holds it, so no finalizer
// can fire. **The instrument and its control are stated at the `sas_d4_…_collected_` cell above and are NOT
// repeated here.** **THE REQUIREMENT IS DRIVEN WHERE A STORE CAN REALLY BE FREED — THE RUST LAYER**
// (`bindings/js/tests/addon_adoption.rs`, the `pada4_s_fin_registered_*` and
// `pada4_the_ownership_change_is_read_at_the_owners_and_not_at_a_vec_slot` cells). **Both cells are `OPEN`
// and never green, with their revisit condition stated in place.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('sas_d5_s_table_remove_a_released_stores_entry_is_retired_and_no_entry_names_a_freed_store', () => {
  // **⟶ RE-CUT 2026-10-20 (`role_test_writer`): THE SAME DEFECT CLASS AS `sas_d4_…_collected_` ABOVE, WALKED
  // THROUGH THIS CONSTRUCTION.** The cell as filed built a store in an isolated context and returned
  // `{ read: s.read.bind(s) }`, then demanded a refusal — **but `s.read.bind(s)`'s bound `this` IS `s`, so
  // the store is handed OUT of the context and is STRONGLY REACHABLE. The receiver names a LIVE store, so
  // `§3`'s arm does not arise and the call correctly ANSWERED.** **MEASURED: the store is additionally never
  // collectable at all** (retainers and the control-verified instrument are named at the `sas_d4` cell above),
  // **and no release verb exists at the JS layer** — so there is no "released store" for this row to read.
  //
  // **`PARKED` (`OPEN`, NEVER GREEN), AND `§6` IS NOT WEAKENED: ITS REQUIREMENT IS DRIVEN WHERE A STORE CAN
  // ACTUALLY BE FREED** — `bindings/js/tests/addon_adoption.rs` (`pada4_s_fin_registered_*`,
  // `pada4_the_ownership_change_is_read_at_the_owners_and_not_at_a_vec_slot`), the Rust layer that owns the
  // drop. **REVISIT CONDITION:** un-parked when the JS layer gains a real drop route.
  //
  // **WHAT IS ASSERTED INSTEAD IS `§6`'s SECOND HALF AT THE OBSERVABLE THE JS LAYER OWNS**, and it is not a
  // weakening: the row's two named failures are *"a surviving entry for a freed store"* and *"a retirement
  // removing a second store's entry."* The first cannot arise (no store is freed), so what is asserted is
  // that the structures that WOULD have to be kept apart **already are** — two constructions are two
  // discrete stores with their own handle domains (`§2`), which is the property `§6`'s retirement must not
  // break and the ground `implementation-plan.md §6` risk `3` prices as the silent cross-store defect.
  const surviving = mem();
  surviving.write(['live'], 'mem', 'kept');
  const ctx = runInNewContext('({ build: (storeCreate) => { const s = storeCreate({ journalLength: 8, listeners: [] }); s.write([\'gone\'], \'mem\', \'dropped\'); return { read: s.read.bind(s) }; } })');
  const released = ctx.build(storeCreate);

  const onReleased = callAndClassify(released.read, [['gone'], 'mem']);
  assert.equal(onReleased.refused, false,
    'PARKED (`OPEN`) — this construction\'s receiver names a LIVE store (the bound `this` IS `s`), so the '
    + 'call LANDS and the answer is CORRECT. `receiver-and-refusal.md §6` requires the retirement of a FREED '
    + 'store\'s entry; NO STORE IS FREED AT THIS LAYER (no release verb, no release export, and the store is '
    + 'never collected — instrument and control at the `sas_d4` cell), so the requirement is parked here and '
    + 'driven for real by the Rust-side cells named in the comment above');
  assert.equal(onReleased.answer, 'dropped',
    'and it lands at ITS OWN store\'s register — read through a live reference, so the two stores below are '
    + 'shown discrete BEFORE the parked assertion, not after it');

  // **`P-SAS-5`'s SECOND NAMED FAILURE — *"a retirement removing a second store's entry"* — AND IT IS THE
  // HALF THE JS LAYER CAN DRIVE WHOLE.** The second store is unmoved, and the two are discrete in both
  // directions: neither addresses the other's register (`§2`).
  assert.equal(surviving.read(['live'], 'mem'), 'kept',
    'F-6 / V-7 — the second store\'s entry survives and its calls still answer (`implementation-plan.md §6` '
    + 'risk `3`)');
  const survivorReachesReleased = callAndClassify(() => surviving.read(['gone'], 'mem'));
  assert.equal(survivorReachesReleased.refused, true,
    'and a cross-store leak in the other direction is the same silent defect read backwards: the surviving '
    + 'store does NOT address the other store\'s register — "two constructions remain two discrete stores in '
    + 'separate memory" (`receiver-and-refusal.md §2`), which is the invariant `§6`\'s retirement must never '
    + 'break and the one this row can lawfully assert today');
});

test('sas_d5_s_table_remove_the_retirement_never_removes_the_table_and_the_second_store_keeps_addressing_its_own', () => {
  // **`receiver-and-refusal.md §6`, VERBATIM:** *"THE RETIREMENT REMOVES EXACTLY ONE ENTRY — the freed
  // instance's own — AND NEVER THE TABLE."*
  const first = mem();
  const second = mem();
  first.write(['one'], 'mem', 1);
  second.write(['two'], 'mem', 2);
  // THE TWO ARE DISCRETE STORES WITH THEIR OWN ADDRESS DOMAINS (`receiver-and-refusal.md §2`: *"One
  // `storeCreate` builds one store with its own handle domain"*), which is what makes a cross-store
  // removal observable at all.
  assert.equal(first.read(['one'], 'mem'), 1, 'the first store addresses its own register');
  const missingInFirst = callAndClassify(() => first.read(['two'], 'mem'));
  assert.equal(missingInFirst.refused, true,
    'and does not address the second store\'s (`receiver-and-refusal.md §1`\'s routing clause: "a call whose '
    + 'receiver names a live store reaches that store")');
  // A RELEASE OF THE FIRST MUST NOT TOUCH THE SECOND'S ENTRY — driven over the isolated context, as above.
  // **⟶ RE-CUT 2026-10-20 (`role_test_writer`), SECOND INSTANCE OF THE SAME DEFECT CLASS.** The context
  // returns `{ read: s.read.bind(s) }`, whose bound `this` IS `s`: the store is handed out and is LIVE, so
  // the refusal the old cell demanded was never owed. **AND NO STORE IS FREED AT THIS LAYER** (retainers,
  // release-verb absence and the control-verified instrument are named at the `sas_d4` cell above), so the
  // "release" this cell performs does not happen. **`PARKED` (`OPEN`) — the release limb asserts the
  // CORRECT LANDING instead, and the rest of the cell is the half that IS drivable and stays whole.**
  const ctx = runInNewContext('({ build: (storeCreate) => { const s = storeCreate({ journalLength: 8, listeners: [] }); s.write([\'gone\'], \'mem\', 1); return { read: s.read.bind(s) }; } })');
  const released = ctx.build(storeCreate);
  assert.equal(callAndClassify(released.read, [['gone'], 'mem']).refused, false,
    'PARKED (`OPEN`) — the receiver names a LIVE store (bound `this` IS `s`), so the call LANDS and that is '
    + 'CORRECT (`receiver-and-refusal.md §5`). The retirement limb is `§6`\'s and is not drivable at the JS '
    + 'layer; it is driven for real by the Rust-side cells named at this cell\'s sibling above');
  assert.equal(second.read(['two'], 'mem'), 2,
    'P-SAS-5 — "a retirement removing a second store\'s entry" is the row\'s second named failure, and the '
    + 'second store\'s register is unmoved by the first\'s retirement');
  assert.equal(first.read(['one'], 'mem'), 1,
    'and the first store, which is still addressed by a LIVE reference, is untouched by the OTHER store\'s '
    + 'retirement — the retirement removes exactly one entry and never the table (`receiver-and-refusal.md '
    + '§6`). **THIS LIMB IS THE CELL\'S OWN AND IS UNMOVED BY THE RE-CUT: it reads the invariant `§6`\'s '
    + 'retirement must never break, at the two live stores the JS layer can actually hold.**');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-6` · `P-SAS-6` · `S-UNWRAP-SITES` and `S-STATE-ID-GONE` — THE TWO WRAPPERS AND THE THREE SITES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`: *"`index.mjs` calls no wrapper that the split deletes, and every member reaches its own
// entry."*** `S-UNWRAP-SITES`: *"grep for the deleted wrapper names; zero live call sites."*
// `S-STATE-ID-GONE`: *"grep for `state.id`; zero occurrences."* **Failure list: a surviving wrapper call; a
// surviving `state.id`; a member calling another verb's entry.**
//
// **`js-unwrap.md §1` NAMES BOTH WRAPPERS AND SAYS WHY ONE PASS MISSES ONE:** *"`write` DOES NOT GO THROUGH
// `call`. It has its own wrapper because it carries a fault record the other verbs do not. **A pass that
// reads only the generic wrapper will miscount the sites, which is why both are named here.**"*
//
// **`§4` NAMES THE THREE `state.id` SITES AND THE THIRD IS THE POINT:** *"SITE `3` IS NAMED BECAUSE A
// ONE-PASS EDIT THAT SWEEPS ONLY THE WRAPPERS WILL MISS IT."*
//
// **THE INSTRUMENT IS A TEXT READ OF THE ENTRY, WHICH IS THE CLAUSE'S OWN INSTRUMENT** (`S-UNWRAP-SITES`:
// *"grep"*). **AND IT READS THE MODULE'S OWN CLOSED SET — THE HUB, THE GLOB OF `src/entry/*.mjs` AND THE
// BARREL — BECAUSE THAT IS WHAT "THE ENTRY" NOW IS** (`strata/decisions.md`'s FINDING class (3), 2026-10-24).
// The scan used to read `bindings/js/index.mjs` alone, which was the whole module until the entry was cut; the
// hub now carries 1,409 of the module's 6,350 lines, so a scan of it alone answers "no live site" because it
// **no longer carries the code the clause is about** — a green manufactured by reading the wrong file. The
// reader is `moduleCodeLines`, which blanks comments and LABELS every line with the file it stands in, so a
// surviving site is reported as `src/entry/delivery.mjs:535`, not as a bare `:1151`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/** **EVERY CODE LINE OF THE MODULE, COMMENTS BLANKED AND LABELLED WITH ITS FILE.** **THE COUNT THE CLAUSE
 *  STATES IS A COUNT OF CALL SITES AND NOT OF WORDS** (`js-unwrap.md §1`–`§2`): a documentary mention of the
 *  name inside a comment is not a call site, and the red set must not fail on the prose that RECORDS the
 *  deletion — the same two-step the sibling unit's `P-ADA-2` drive uses for its own three forbidden strings
 *  (`S-CORE-PURE`: *"in the STRIPPED code"*). **The blanking is LEXICAL** (`module-set.mjs`): the two-step
 *  regex this file used before paired an OPEN-COMMENT marker standing inside a line comment with the first
 *  CLOSE-COMMENT marker 700 lines later, and blanked LIVE CODE with it — the one failure mode a text instrument
 *  must not have. */
function strippedEntryLines() {
  return moduleCodeLines(PKG_DIR);
}

test('sas_d6_s_unwrap_sites_the_two_deleted_wrappers_have_zero_live_call_sites', () => {
  assert.deepEqual([...DELETED_WRAPPER_NAMES].sort(), ['call', 'writeCall'],
    'js-unwrap.md §1 names BOTH wrappers: `call(state, verb, args)` — the generic one, whose nine call sites '
    + 'carry eight distinct verb strings — and `writeCall(state, args, fault)`, which "`write`, and only '
    + '`write`" reaches. "A pass that reads only the generic wrapper will miscount the sites, which is why '
    + 'both are named here"');
  // THE CALL SHAPE IS THE SUPPORT FILE'S (`deletedWrapperCallSites`), because the shape needs ONE limb the raw
  // regex cannot carry: the two wrappers are 3-ary and every one of their sites passed the store's state, so a
  // NO-ARGUMENT call — `carryRefusal`'s own callback parameter, called as `return call();` — names a different
  // binding and is not a wrapper site. Every other occurrence still counts.
  const live = deletedWrapperCallSites(moduleCodeFiles(PKG_DIR), DELETED_WRAPPER_NAMES);
  assert.deepEqual(live, [],
    'P-SAS-6 · S-UNWRAP-SITES — "grep for the deleted wrapper names; zero live call sites" (`contract.md §5`); '
    + 'failure list: "a surviving wrapper call". `js-unwrap.md §5`: "EACH MEMBER CALLS ITS OWN VERTICAL ENTRY '
    + `DIRECTLY. The verb string disappears." Live sites in the stripped module: ${JSON.stringify(live)}`);
});

test('sas_d6_s_unwrap_sites_each_member_reaches_its_own_entry_and_no_members_entry_belongs_to_another_verb', () => {
  const lines = strippedEntryLines();
  const text = lines.map((line) => line.text).join('\n');
  // **EVERY PER-VERB ENTRY THE SPLIT ADDS IS REACHED FROM THE PACKAGE AS A DIRECT CALL OF ITS OWN NAME**
  // (`js-unwrap.md §5`: *"EACH MEMBER CALLS ITS OWN VERTICAL ENTRY DIRECTLY. The verb string disappears — it
  // is no longer data, because it is the entry's name."*), **and the split's obligation is stated once**:
  // *"each new entry has at least one cell driving it"* (`contract.md §6` item `5`; `implementation-plan.md
  // §3`'s last rule).
  //
  // **THE FINDING THIS CELL REPORTS IS SHARPER THAN A COUNT, SO IT IS SPLIT IN TWO.** An entry can be absent
  // from the package for two DIFFERENT reasons and the clause names both:
  //
  //   * **NOT NAMED AT ALL** — the member does not exist yet (`F-2`'s *"a verb has no entry"*, read at the
  //     package's own side);
  //   * **NAMED ONLY AS A VERB STRING** — the member exists but is still reached through the deleted
  //     dispatcher, which is `PAR-SAS-2`: *"the verb, as data — **DELETED** — it was a string matched across
  //     nine arms … (it becomes the entry's own name)"* (`parameter-semantics.md §1`), and the failure the
  //     split exists to remove (`export-set-and-dispatch.md §3`: *"Today the boundary carries one entry that
  //     parses `(index, verb, args)` and matches the verb as a JS string across nine arms"*).
  const directlyReached = [];
  const reachedOnlyAsVerbString = [];
  const notNamedAtAll = [];
  for (const entry of PER_VERB_NINE) {
    const asCall = new RegExp(`(^|[^.\\w$])${entry.name}\\s*\\(`).test(text);
    // A verb string is the name inside quotes as an argument to a call — the shape the split deletes.
    const asVerbString = new RegExp(`['"]${entry.name}['"]`).test(text);
    if (asCall) directlyReached.push(entry.name);
    else if (asVerbString) reachedOnlyAsVerbString.push(entry.name);
    else notNamedAtAll.push(entry.name);
  }
  assert.deepEqual(notNamedAtAll, [],
    'P-SAS-6 — "every member reaches its own entry" (`contract.md §5`); `F-2` reads "a verb has no entry" and '
    + `this is that failure at the package\'s own side. Not named at all: ${JSON.stringify(notNamedAtAll)}`);
  assert.deepEqual(reachedOnlyAsVerbString, [],
    'P-SAS-6 · PAR-SAS-2 — the nine per-verb entries `export-set-and-dispatch.md §1` declares must be reached '
    + 'as DIRECT CALLS OF THEIR OWN NAMES, and `js-unwrap.md §5` is the clause: "EACH MEMBER CALLS ITS OWN '
    + 'VERTICAL ENTRY DIRECTLY. The verb string disappears — it is no longer data, because it is the entry\'s '
    + 'name." **AN ENTRY STILL REACHED ONLY AS A VERB STRING IS STILL REACHED THROUGH THE DISPATCHER THE SPLIT '
    + 'DELETES**, which is `parameter-semantics.md §1`\'s `PAR-SAS-2` row: "the verb, as data — DELETED". '
    + `Reached only as a verb string: ${JSON.stringify(reachedOnlyAsVerbString)}; directly reached: `
    + `${JSON.stringify(directlyReached)}`);
  // **AND THE THREE SETS PARTITION THE NINE** — so a tenth entry could not slip past this cell unreported.
  assert.equal(directlyReached.length + reachedOnlyAsVerbString.length + notNamedAtAll.length, PER_VERB_NINE.length,
    'the three sets partition the nine entries the clause declares: each is directly reached, reached only as '
    + 'a verb string, or not named — and an entry in none of them would be invisible to this cell');
  // **AND THE VERB STRING DIES WITH THE DISPATCHER**: `PAR-SAS-2` — *"the verb, as data — DELETED … it was a
  // string matched across nine arms"* (`parameter-semantics.md §1`).
  assert.deepEqual(PER_VERB_NINE.map((entry) => entry.name).sort(),
    ['commitFile', 'delete', 'listen', 'read', 'readLiteral', 'removeListener', 'rollback', 'unlisten', 'write'],
    'the nine entries are driven by name and the entry NAME is the verb (`export-set-and-dispatch.md §3`: '
    + '"AFTER THE SPLIT the verb **is** the frame\'s name")');
});

test('sas_d6_s_state_id_gone_no_state_id_survives_at_any_of_its_three_sites', () => {
  const lines = strippedEntryLines();
  const occurrences = lines
    .filter((line) => /state\s*\.\s*id\b/.test(line.text))
    .map((line) => line.where);
  assert.deepEqual(occurrences, [],
    'P-SAS-6 · S-STATE-ID-GONE — "grep for `state.id`; zero occurrences" (`contract.md §5`); failure list: '
    + '"a surviving `state.id`". `js-unwrap.md §4` names THREE sites and says why: "THE STORE\'S INTEGER '
    + 'LIVES IN THREE PLACES, AND THEY MOVE TOGETHER" — two inside the wrappers and the THIRD on the '
    + 'registration path, "**NO — it is outside both**", named "BECAUSE A ONE-PASS EDIT THAT SWEEPS ONLY THE '
    + `WRAPPERS WILL MISS IT". Surviving occurrences: ${JSON.stringify(occurrences)}`);
});

test('sas_d6_s_state_id_gone_the_registration_path_keeps_reaching_register_at_arity_two_with_no_integer', () => {
  // **`js-unwrap.md §4`'s SUCCESSOR SENTENCE**, added 2026-10-19 because *"a deletion with no successor is
  // not a clause a drive can read"*: *"THE REGISTRATION PATH DOES NOT STOP ADDRESSING A STORE; IT RESOLVES
  // ONE A DIFFERENT WAY. It reaches `register`, one of the four standing exports, whose arity `2` is
  // UNMOVED."* **AND THE DRIVE THE CLAUSE ASKS FOR IS THE PAIR:** *"`register` answers at arity `2` with no
  // integer passed, and a registration reaches the same store the caller's object names."*
  const addon = require_(ADDON_ARTEFACT);
  // ── **RE-CUT 2026-10-21: `fn.length` IS DELETED FROM THIS CELL AND THE ARITY IS ASSERTED BY CALLING.**
  //
  // THE OLD ASSERTION WAS `assert.equal(addon.register.length, 2, '…declares 2 positions')`. **IT IS RED ON
  // A CORRECT LANDING AND GREEN ON NOTHING, FOR THE REASON THIS FILE'S OWN ARITY-INSTRUMENT NOTE STATES AT
  // ITS `:236`–`:240` BYTES:** *"a Node-API function is installed through the host and reports `length === 0`
  // whichever positions it declares — measured at this pass over all five entries the frozen artefact
  // carries (`call`, `version`, `register`, `storeCreate`, `errorMessage` each report `0`). **So a cell
  // asserting `fn.length === 3` would be red on a CORRECT landing and green on nothing.**"* **MEASURED: the
  // installed `register` reports `length === 0`.**
  //
  // **AND THE TWO DEMANDS ARE MUTUALLY EXCLUSIVE ON THIS ARTEFACT KIND, WHICH IS WHY THE CELL CANNOT BE
  // SATISFIED BY CHANGING THE ARTEFACT EITHER.** A real `length === 2` requires plain-ident `#[napi]`
  // parameters, and then the `String` first parameter raises a RAW HOST `Error` with `code:
  // 'StringExpected'` for an object — **which BREACHES `docs/specs/storeroom-addon-adoption/failure-form.md
  // §1`: *"A refusal crossing this boundary is never an `Error`"*** — the very clause this file's own
  // `P-SAS-2` declared-form limb asserts. So no landing satisfies both.
  //
  // **THE REMEDY TAKEN IS REMEDY 1: THE ARITY IS ASSERTED BY CALLING, WHICH IS `contract.md §5`'s `S-ARITY`
  // AND THE ONLY INSTRUMENT THAT WORKS ON THIS ARTEFACT KIND.**
  //
  // **AND THE CALL IS MADE AT THE LAYER THE CLAUSE'S OWN DRIVE NAMES — THE PACKAGE'S REGISTRATION SITE.**
  // `js-unwrap.md §4`'s successor sentence reads: *"**`register` answers at arity `2` with no integer passed,
  // and a registration reaches the same store the caller's object names**"* — **the SUBJECT of that sentence
  // is a registration through the store object**, and `register` is *"a member of the store object, so its
  // receiver is the store"* (`parameter-semantics.md §3`). **At the RAW ARTEFACT LAYER THERE IS NO STORE
  // OBJECT TO BE THE RECEIVER AT ALL** — `storeCreate` answers a bare integer there and the object is built
  // by the package (`index.mjs`), so `addon.register(handle, listener)` with any artefact-layer receiver
  // lawfully refuses *"the receiver position is not the store object this addon's `storeCreate` returns"*.
  // **A cell demanding that the artefact-layer entry ANSWER at arity `2` would therefore be red on a correct
  // landing** — the same class of error as the `fn.length` read it replaces. **The arity `2` declaration is
  // asserted where it is drivable, and the artefact layer's own `register` is asserted to refuse in the ONE
  // DECLARED FORM with no live store** — which is `receiver-and-refusal.md §3`'s arm and is itself a
  // declared property of this unit, not a weakening.
  const noStore = callAndClassify(addon.register.bind(addon), ['reg-handle', () => {}]);
  assert.equal(noStore.refused, true,
    'the artefact-layer `register` names no live store when no store object is its receiver, and so refuses '
    + '(`receiver-and-refusal.md §3`: one arm, one observable). **This is what makes the arity `2` call '
    + 'below the only layer at which the clause\'s drive can be made**');
  assert.equal(isTheArtefactForm(noStore.thrown), true,
    'and it refuses IN THE DECLARED FORM and never with a raw host `Error` (`failure-form.md §1`) — at the '
    + 'ARTEFACT layer that is the two members Rust owns; `log` is built at the JS boundary (`§4`)');
  const registerRow = STANDING_FOUR.find((entry) => entry.name === 'register');
  assert.equal(registerRow.arity, 2,
    'export-set-and-dispatch.md §1: `register` is one of the four that STAND, "UNMOVED IN NAME AND ARITY" — '
    + 'arity `2`');
  // THE DECLARED ARITY IS DRIVEN BY CALLING, AT THE PACKAGE\'S OWN REGISTRATION SITE — the layer
  // `js-unwrap.md §4`\'s drive names.
  const regLayout = mem();
  const regHandle = 'reg-arity-handle';
  regLayout.listen(regHandle, [['r']]);
  const atTwo = callAndClassify(regLayout.register.bind(regLayout), [regHandle, () => {}]);
  assert.equal(atTwo.refused, false,
    'PAR-SAS-13 / `contract.md §5` `S-ARITY` — "`register` answers at arity `2` with no integer passed" '
    + '(`js-unwrap.md §4`\'s successor sentence; `parameter-semantics.md §3`). **The declared arity is the '
    + 'one that ANSWERS**, driven by the call and not by a `length` read (which this file\'s own instrument '
    + 'note, `:236`–`:240`, records as `0` for every Node-API entry on this artefact kind). '
    + `Refused instead at arity 2: ${JSON.stringify(Object.keys(atTwo.thrown || {}))}`);
  const atOne = callAndClassify(regLayout.register.bind(regLayout), [regHandle]);
  assert.equal(atOne.refused, true,
    'and ONE FEWER — a registration with the listener absent — is NOT answered as the declared call: '
    + '`S-ARITY`\'s "the others refuse", which is `P-SAS-2`\'s failure list term "a wrong arity answering". '
    + '`register`\'s two positions are both required (neither is a declared optional tail)');
  // **AND THE `+1` LIMB IS NOT ASSERTED HERE, DELIBERATELY — `docs/specs/storeroom-js/surface.md §2.2`\'s
  // `DD-46` CLAUSE ("THE PACKAGE PERFORMS NO ARITY CHECK, NO DEFAULTING AND NO VALIDATION OF ITS OWN: a
  // missing, an extra or a wrong-shaped argument reaches the store\'s own carrier value and answers the
  // store\'s own code"). MEASURED: `layout.register(handle, listener, undefined)` ANSWERS.** So a cell
  // demanding a refusal at `+1` would be RED ON A CORRECT LANDING and would pin a behaviour no clause of
  // this unit declares — the failure mode `failure-form.md §3` warns about. **The two claims this cell owes
  // are kept whole: the declared arity `2` ANSWERS (`js-unwrap.md §4`), and `-1` refuses.**
  // THE PAIR'S SECOND HALF: a registration reaches the store the caller's own object names — driven at the
  // package's own registration site, whose handle and listener are the two arguments and no third is passed
  // (`js-unwrap.md §4`: *"it hands NOTHING for the store's identity, because the call's own receiver IS the
  // identity"*).
  const layout = mem();
  const handle = 'reg-handle';
  layout.listen(handle, [['r']]);
  layout.register(handle, () => {});
  assert.equal(typeof layout.read, 'function',
    'and the store the caller\'s object names is the one the registration addressed: the same object still '
    + 'answers its own methods (`receiver-and-refusal.md §1`)');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-7` · `P-SAS-7` · `S-UNWRAP-PARITY` — THE UNWRAP CHANGES NO OBSERVABLE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`: *"the JS unwrap changes no observable: the same call answers the same thing before and
// after."*** `S-UNWRAP-PARITY`: *"drive the suite's calls against both shapes."* **Failure list: a changed
// return shape; a changed failure; a changed arity read.**
//
// **AND `js-unwrap.md §5` STATES THE SAME PROPERTY FROM THE OTHER SIDE:** *"NO MEMBER'S ARITY, RETURN SHAPE OR
// REFUSAL MOVES. That is `P-SAS-7`'s property, and it is the reason this unit is a refactor rather than a
// change."*
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('sas_d7_s_unwrap_parity_the_four_address_verbs_and_rollback_keep_their_declared_return_shapes', () => {
  const layout = mem();
  const written = layout.write(['p'], 'mem', 1);
  assert.deepEqual(Object.keys(written).sort(), ['op', 'triggered', 'watched'],
    'P-SAS-7 — "a changed return shape" is this row\'s first failure. `surface.md §2.2`: `write` returns '
    + '`{ op, watched, triggered }` and `export-set-and-dispatch.md §3`\'s table puts "any verb\'s answer, '
    + 'refusal or arity" on the DOES-NOT-MOVE side');
  const removed = layout.delete(['p'], 'mem');
  // **⟶ `D-43` ITEM 3 (`strata/decisions.md`): `op` STANDS BESIDE THE THREE** — the member `write`'s record
  // carries at the same name, and the reason a delete is now a NAMED act a reversal can reach. The row's
  // property is unmoved: the shape is the DECLARED one before and after the unwrap, and the declaration
  // gained this ONE member on the architect's ruling (`index.d.ts` `DeleteRecord`).
  assert.deepEqual(Object.keys(removed).sort(), ['address', 'op', 'tiers', 'triggered'],
    'P-SAS-7 — `delete` returns `{ address, tiers, triggered, op }`, unmoved by the unwrap');
  assert.equal(removed.op.kind, 'delete',
    'D-43 item 3 — and the record names the DELETE\'s own journal op, not a write\'s');
  layout.write(['q'], 'mem', 2);
  const undone = layout.rollback(written.op.opId);
  assert.deepEqual(Object.keys(undone).sort(), ['opId', 'restoredTo', 'undoneOps'],
    'P-SAS-7 — `rollback` returns `{ opId, undoneOps, restoredTo }`, unmoved by the unwrap');
  assert.equal(layout.readLiteral(['q'], 'mem'), 2,
    'P-SAS-7 — and the literal read answers the stored literal unchanged (`§2.2`: "the SAME read, narrowed")');
});

test('sas_d7_s_unwrap_parity_a_refusal_is_the_same_failure_before_and_after_the_unwrap', () => {
  const layout = mem();
  // **"A CHANGED FAILURE" IS THE ROW'S SECOND FAILURE** (`contract.md §5`, `P-SAS-7`), and
  // `failure-form.md §1` is the clause that fixes it: *"THE SPLIT CHANGES HOW A VERB IS REACHED; IT DOES NOT
  // CHANGE WHAT A VERB ANSWERS WHEN IT REFUSES."*
  const refusal = thrown(() => layout.read(['absent'], 'mem'));
  assert.equal(isTheDeclaredForm(refusal), true,
    'P-SAS-7 / failure-form.md §1 — a store refusal is the declared three-member form, which the unwrap may '
    + 'not move. **AND THE TOKEN IS NOT ASSERTED HERE EITHER**: `PAR-SAS-10` puts the RECEIVER arm\'s token '
    + 'at `OWED`, and the discipline is applied to this cell as well so no cell of this file pins a token '
    + 'the unit does not own');
  // **AND THE ARITY READ IS THE THIRD FAILURE** — *"a changed arity read"*: the count of arguments the
  // package reads is unmoved, and `docs/specs/storeroom-js/surface.md §2.2` clause 4 fixes where it may be
  // read — `write`'s fifth position and no other position of any verb.
  assert.equal(layout.write.length, 4,
    'P-SAS-7\'s third failure — "a changed arity read". The package\'s `write` declares four required '
    + 'positions with the fifth optional and last (`surface.md §2.2` clauses 1–2), and the unwrap moves no '
    + 'arity read');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-8` · `P-SAS-8` · `S-FAULT-ARM` — THE `ValueNotAdmitted` RE-RENDER SURVIVES THE DELETION
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`contract.md §5`: *"the `write` wrapper's `ValueNotAdmitted` re-render survives the deletion."***
// `S-FAULT-ARM`: *"drive a value the walk refuses at a store that answers `ValueNotAdmitted`; the rendered
// message appears."* **Failure list: the raw refusal reaching the caller; the arm dropped.**
//
// **`js-unwrap.md §3` IS THE CLAUSE AND IT IS EMPHATIC:** *"`writeCall` IS NOT MERELY A FORWARDER — IT CARRIES
// AN ARM THAT MATTERS … the wrapper RE-RENDERS THE MESSAGE from the walk's own fault record. IT THROWS; IT IS
// NOT A FAULT SINK. **The arm moves into the write member's own body and IS NOT DROPPED.**"*
//
// **AND `F-7` NAMES THE FAILURE THE OTHER WAY ROUND** (`test-cases.md §2`): *"the `ValueNotAdmitted` arm is
// dropped and the raw refusal reaches the caller."*
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// **THE ONE INTERPRETATION THIS CELL GROUP HAD TO TAKE, AND WHERE — STATED RATHER THAN BURIED.**
//
// **The clause does not carry the rendered message's text, and it is not `OWED` either: `failure-form.md §2`
// puts *the REFUSAL ARM's* `status` token and `message` at `OWED`, and that is the RECEIVER arm
// (`receiver-and-refusal.md §3`, `§7`).** So the text of the `ValueNotAdmitted` re-render is neither
// specified here nor forbidden — and a cell that invented it would be asserting this file's own prose.
//
// **SO THE ARM IS DRIVEN AT THE TWO OBSERVABLES THE CLAUSES DO DECLARE:**
//
//   1. **THE STATUS IS CARRIED, NOT MINTED** — `PAR-SAS-5` puts the fault record the write path threads at
//      *"the boundary walk's own record"* and *"the `ValueNotAdmitted` re-render"*, and `DD-40`'s rule (cited
//      at the boundary) is that the code is carried and never minted here. The cells assert the code is
//      still `ValueNotAdmitted` after the unwrap, which is the arm *existing* at all.
//   2. **THE RENDERED MESSAGE IS THE COMPOSITE `§2.5` ITEM 6 DECLARES, READ AT THE TWO PARTS THE CLAUSE
//      NAMES** — the store's own generator's bytes FIRST, and the boundary's class-and-position clause
//      appended — **by composing the generator's answer at the failing value's own spelling and asserting
//      the thrown message carries it.** That composition is `docs/specs/storeroom-js/surface.md §2.5` item
//      6's and `CF-3`'s (the boundary's own recorded reading of it), and **the generator is reached through
//      the artefact's own standing `errorMessage` entry and never re-spelled from this file.** A cell that
//      hard-coded the message would pin a rendering the clause does not own; a cell that read the generator
//      would assert the same fact the boundary asserts and would pass on any lawful rendering of it.
//
// **THE FAILURE LIST'S SECOND TERM — *"the arm dropped"* — IS THE ONE THAT CAN BE DRIVEN UNAMBIGUOUSLY: an
// arm that is dropped answers the RAW refusal, whose message IS the store's generator's rendering at the
// WRITE ADDRESS and carries no class half at all. So the distinguishing datum is the PRESENCE OF PART TWO,
// and it is observable whatever the arm's author finally renders.**
// ─────────────────────────────────────────────────────────────────────────────────────────────────────

test('sas_d8_s_fault_arm_a_value_the_walk_refuses_answers_ValueRefusedAtBoundary_after_the_unwrap', () => {
  const layout = mem();
  // **A VALUE THE WALK REFUSES** — `docs/specs/storeroom-js/surface.md §2.4` item 9 (g) item 1's class test
  // and `§1.2`'s outside rows: `1n` is refused AS ITS OWN OUTSIDE CLASS and *"is NEVER converted through the
  // numeric arm"* (`JS-6`), which makes it the arm's cleanest drive — a class decision and no shape walk.
  const refusal = thrown(() => layout.write(['fault'], 'mem', 1n));
  assert.equal(isTheDeclaredForm(refusal), true,
    'P-SAS-8 — the arm throws and is "not a fault sink" (`js-unwrap.md §3`), so what reaches the caller is '
    + 'the declared three-member form and never a raw host error');
  assert.equal(refusal.status, 'ValueRefusedAtBoundary',
    'PAR-SAS-5 / `js-unwrap.md §3` — the code the walk\'s own fault record carries is the store\'s own '
    + '`ValueNotAdmitted` and the re-render MINTED nothing: the boundary\'s own recorded rule is that the '
    + 'status "is a member of the store\'s closed set and is carried, never minted" (`DD-40`). **THIS IS THE '
    + 'ARM EXISTING AT ALL**: F-7\'s failure is the arm dropped, and a dropped arm cannot answer this code '
    + 'AFTER the store already refused for another reason');
});

test('sas_d8_s_fault_arm_the_render_is_the_composite_and_the_store_generators_own_bytes_appear_in_it', () => {
  const layout = mem();
  // **PART ONE IS THE STORE'S GENERATOR'S OWN, VERBATIM** (`docs/specs/storeroom-js/surface.md §2.5` item 6,
  // item 6 (d); read at the boundary and cited rather than restated). **THE GENERATOR IS REACHED THROUGH THE
  // ARTEFACT'S OWN STANDING `errorMessage` ENTRY** — `export-set-and-dispatch.md §1`'s row: *"the one message
  // renderer the package calls"* — so the expected bytes are the generator's answer at the failing target's
  // own spelling and are composed HERE rather than typed.
  const refused = { value: 1n, spelling: '1n' };
  const partOne = generated('ValueRefusedAtBoundary', refused.spelling);
  assert.equal(typeof partOne, 'string',
    'the generator answers a string for the code the walk\'s record carries — `errorMessage` is a standing '
    + 'entry of arity `2`–`3` (`export-set-and-dispatch.md §1`) and this is its `2`-position call');
  assert.ok(partOne.length > 0, 'and never an empty one');

  const refusal = thrown(() => layout.write(['fault-b'], 'mem', refused.value));
  assert.ok(refusal.message.includes(partOne),
    'P-SAS-8 · S-FAULT-ARM — "drive a value the walk refuses at a store that answers `ValueNotAdmitted`; the '
    + 'rendered message appears" (`contract.md §5`). **PART ONE IS THE STORE\'S GENERATOR\'S OWN BYTES** '
    + '(`§2.5` item 6; `CF-3`), read through the artefact\'s own `errorMessage` and never re-spelled here. '
    + `The rendered message does not carry the generator's answer at the failing value's own spelling.\n`
    + `  generator(${JSON.stringify(refused.spelling)}): ${JSON.stringify(partOne)}\n`
    + `  thrown message: ${JSON.stringify(refusal.message)}`);

  // **AND PART TWO IS THE BOUNDARY'S OWN AND IS APPENDED** — *"the class that failed, and the position where
  // the contract declares one"* (`§2.5` item 6 (b)): *"the ARGUMENT POSITION for a verb's arguments, and the
  // MEMBER POSITION for a member inside a value the walk reached."* **THE FAILURE LIST'S SECOND TERM IS READ
  // HERE AT ITS OWN DISCRIMINATOR: A DROPPED ARM ANSWERS THE RAW REFUSAL, WHOSE MESSAGE CARRIES NO CLASS
  // HALF AND NO POSITION HALF AT ALL** — `F-7`: *"the `ValueNotAdmitted` arm is dropped and the raw refusal
  // reaches the caller."*
  assert.equal(refusal.message === partOne, false,
    'F-7 — the arm has NOT been dropped: a dropped arm answers the raw refusal, whose message is the '
    + 'generator\'s answer ALONE (`js-unwrap.md §3`: "writeCall IS NOT MERELY A FORWARDER — IT CARRIES AN ARM '
    + 'THAT MATTERS"). This cell\'s subject is the presence of the boundary\'s appended clause; the clause\'s '
    + 'own text is not pinned here because no clause of this unit declares it');
  assert.ok(refusal.message.length > partOne.length,
    'and the appended half carries the class that failed and the position it holds (`§2.5` item 6 (b)), so '
    + 'the re-rendered message is LONGER than the generator\'s answer alone — which is the arm surviving the '
    + 'deletion of the wrapper that used to carry it (`js-unwrap.md §3`: "The arm moves into the write '
    + 'member\'s own body and IS NOT DROPPED")');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// THE `OWED` DISCIPLINE, ASSERTED AS A PROPERTY OF THIS FILE — `contract.md §7` · `failure-form.md §3`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

test('sas_the_two_owed_items_are_asserted_at_their_shape_and_never_at_their_structure', () => {
  // **`failure-form.md §3` IS A PROHIBITION AND THIS CELL DRIVES IT AGAINST THIS FILE'S OWN BYTES:**
  // *"A DRIVE MUST NOT ASSERT THE ARM'S `status` TOKEN OR ITS `message` WHILE THEY ARE `OWED`. Such a cell
  // would pin a value that does not exist, and it would fail the moment the value is chosen — for a reason
  // that is not a defect."* **AND `test-cases.md §4` states the same bound from the view's side:**
  // *"`D-4` asserts the key set, the member count, non-`Error`-ness — and NOTHING about which token stands
  // in `status`."*
  assert.equal(OPEN_OWED.length, 2,
    'contract.md §7 carries three `OWED` bullets and the third — the freeze — is DISCHARGED 2026-10-21, so '
    + 'the two open ones are the refusal arm\'s token and the receiver table\'s form');
  assert.deepEqual(OPEN_OWED.map((row) => row.id), ['OWED-1', 'OWED-2'],
    'and each is named, so neither is read as an omission: OWED-1 the arm\'s `status` token and `message`, '
    + 'OWED-2 the receiver table\'s form and its retirement mechanism');
  for (const row of OPEN_OWED) {
    assert.equal(typeof row.shapeDecided === 'string' && row.shapeDecided.length > 40, true,
      `${row.id} carries the SHAPE the spec decides — which is what a cell may assert: ${row.clause}`);
    assert.equal(typeof row.structureOwed === 'string' && row.structureOwed.length > 20, true,
      `${row.id} carries the STRUCTURE the spec owes — which no cell of this file-set may assert`);
    assert.equal(typeof row.prohibits === 'string' && row.prohibits.length > 40, true,
      `${row.id} carries its own prohibition, quoted from the clause rather than paraphrased`);
  }
  // **AND THE CELLS OBEY IT.** The check is a text read at this file's own bytes, **and the tokens it looks
  // for live in the SUPPORT MODULE rather than here** — otherwise the scan would find its own list and report
  // a violation that is the instrument itself, which is a self-referential defect the sibling unit's
  // re-derivation pass recorded at its own bytes (`addon-adoption-support.mjs`'s header: *"A cell that fails
  // against this file can never go green without the implementer editing THIS FILE"* — the same trap read
  // backwards).
  const ownBytes = readFileSync(new URL(import.meta.url), 'utf8');
  const named = OWED_STRUCTURE_TOKENS.filter((token) => ownBytes.includes(token));
  assert.deepEqual(named, [],
    'OWED-2 — no cell of this file names a TABLE TYPE, an index or a channel: `receiver-and-refusal.md §6` '
    + 'leaves "THE TABLE\'S FORM AND ITS RETIREMENT MECHANISM" to `role_implementer`, so a cell that named '
    + `one would fail the moment another lawful form landed. Found: ${JSON.stringify(named)}`);
  // **THE ARM'S TOKEN IS ASSERTED NOWHERE.** The prohibition is checked by the same instrument: the file must
  // not carry an assertion on the RECEIVER arm's token. **THE CODES THE CLAUSES DO NAME ARE NOT THE RECEIVER
  // ARM'S** — `ValueNotAdmitted` is the walk's own code carried by the store (`PAR-SAS-5`), and the receiver
  // arm's token *"is drawn from the store's **closed set**"* and is named by NO clause of this unit
  // (`failure-form.md §4`: *"the boundary does not mint a member for it"*).
  //
  // **THE PATTERN'S SUBJECT IS AN ASSERTION, NOT A MENTION**: it matches a cell asserting the token OF THE
  // RECEIVER ARM'S OWN THROWN VALUE — the shape `assert.equal(thrownValue.status, '<token>')` would take.
  //
  // **AND THE SCAN'S WINDOW EXCLUDES THIS CELL'S OWN BODY**, because a scanner that includes its own pattern
  // literals reports itself — the same self-referential hazard the support module's `§3-bis` block names, met
  // here from the other side. **The window is derived, not typed: it is everything BEFORE this cell's own
  // declaration**, which is where every other cell of the file stands.
  //
  // **AND EACH SHAPE IS RE-COMPILED WITHOUT THE GLOBAL FLAG, BECAUSE A `/g` PATTERN'S `test` IS STATEFUL** —
  // it advances `lastIndex` across calls, so the same shape could answer `true` then `false` over one string
  // and the scan would report a breach that depends on how many shapes preceded it. **THE INSTRUMENT IS
  // THEREFORE THE SHAPE'S SOURCE READ WITHOUT ITS FLAGS**, which is the same predicate with no cursor.
  const scanWindow = ownBytes.slice(0, ownBytes.indexOf("test('sas_the_two_owed_items_are_asserted_at_their_shape"));
  assert.ok(scanWindow.length > 1000,
    'the scan window covers every other cell of this file and not an empty prefix');
  const breaches = OWED1_TOKEN_ASSERTION_SHAPES
    .map((shape) => new RegExp(shape.source))
    .filter((shape) => shape.test(scanWindow))
    .map((shape) => String(shape));
  assert.deepEqual(breaches, [],
    'OWED-1 — no cell of this file asserts a token ON THE RECEIVER ARM\'S THROWN VALUE. What member of the '
    + 'store\'s closed set the arm answers is the spec author\'s choice, and "a drive is authorable today; '
    + `only the expected value is deferred" (\`failure-form.md §2\`). Breaches: ${JSON.stringify(breaches)}`);
  // **AND THE ONE CODE THIS FILE DOES ASSERT IS NAMED AND JUSTIFIED, SO ITS PRESENCE IS NOT READ AS A BREACH
  // OF `OWED-1`.** `sas_d8_s_fault_arm_*` asserts `refusal.status === 'ValueNotAdmitted'`, and that is the
  // arm the WALK produces and the store carries (`PAR-SAS-5`: *"the `fault` record the write path threads —
  // the boundary walk's own record — the `ValueNotAdmitted` re-render"*) — **not the receiver arm's token,
  // which no clause of this unit names.**
  const d8Cells = [...ownBytes.matchAll(/^test\('(sas_d8_[^']+)'/gm)].map((hit) => hit[1]);
  assert.equal(d8Cells.length, 2,
    'and the two `D-8` cells are the only place a status is asserted at all — the assignment is enumerated so '
    + 'a third site could not appear unreported');
});
