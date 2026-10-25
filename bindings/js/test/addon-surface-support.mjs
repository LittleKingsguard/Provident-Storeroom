// `addon-surface-support.mjs` — **THE RED SET'S SHARED HARNESS FOR `U-STOREROOM-ADDON-SURFACE`**, authored
// from `docs/specs/storeroom-addon-surface/**` ALONE. **NOTHING IN THIS FILE IMPLEMENTS THE UNIT.**
//
// It carries the three declarations the drives of `addon-surface.test.mjs` and
// `addon-surface-properties.test.mjs` must READ RATHER THAN RESTATE — so that a figure lives in ONE place
// per file-set and a reader can check it against the clause it cites:
//
//   1. **`DECLARED_SURFACE`** — the thirteen entries and their arities, `export-set-and-dispatch.md §1`.
//   2. **`THE_THREE_THAT_ARE_NOT_ENTRIES`** — `call` · `commit` · `constraints`, `§2`.
//   3. **`OPEN_OWED`** — the two `OWED` items `contract.md §7` carries, with the SHAPE each one decides and
//      the STRUCTURE each one does not. **A cell reads this list and asserts the shape; no cell anywhere in
//      this file-set asserts a token, a message text or a table type.**
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────────
// ## 0. WHAT THIS FILE IS NOT, STATED SO IT IS NOT READ AS AN IMPLEMENTATION
//
// `bindings/js/test/addon-adoption-support.mjs` — the sibling unit's support module — carries the same
// warning for the same reason, and this file inherits it: **THIS FILE HOLDS NO STORE, DRIVES NO CALL, MUTATES
// NO TABLE AND STANDS IN FOR NO PART OF THE UNIT.** It declares figures and nothing else; every drive of the
// red set reaches the artefact or the package directly, and no cell of either test file can go green by
// editing this file.
//
// **AND THE IMPORT MECHANICS ARE THIS FILE-SET'S ONLY CONCESSION TO THE IMPLEMENTATION.** `contract.md §1`
// item 1 is explicit that a consumer of the package cannot observe this change *"except in one named case"*,
// so the artefact is reached the one way a test can reach it — `require` of the built `.node` — and the
// package is reached by its declared name. **Neither route decides what any cell ASSERTS**: the assertions
// are taken from the clauses named at each cell, and the artefact is read only to learn what it EXPORTS.

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const HERE = dirname(fileURLToPath(import.meta.url));
export const PKG_DIR = dirname(HERE); // `bindings/js`
export const REPO_ROOT = dirname(dirname(PKG_DIR));
export const PACKAGE_ENTRY = join(PKG_DIR, 'index.mjs');
export const ADDON_ARTEFACT = join(PKG_DIR, 'build', 'Release', 'storeroom_js_binding.node');

export const require_ = createRequire(import.meta.url);

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// 1. THE SET, CLOSED — `export-set-and-dispatch.md §1`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THE ADDON'S EXPORT SET MOVES `5 → 13`: `4` STANDING PLUS `9` PER-VERB — `4 + 9 = 13` ✓.**
//
// **THE FOUR THAT STAND, UNMOVED IN NAME AND ARITY** (`§1`'s first table) and **THE NINE THE SPLIT ADDS,
// ONE PER DISPATCHER ARM** (`§1`'s second table) are declared below in the clause's own two groups, each
// name with the arity the clause prints BESIDE it. **THE ARITY FIGURES COUNT ONLY THE ARGUMENTS A CALLER
// SUPPLIES** (`§4`) — they are the verb's declared positions and no instance position among them.
export const STANDING_FOUR = [
  { name: 'version', arity: 0, clause: 'export-set-and-dispatch.md §1 — "the artefact\'s own version string"' },
  { name: 'errorMessage', arity: 2, arityMax: 3, clause: 'export-set-and-dispatch.md §1 — the arity `2`–`3`' },
  { name: 'storeCreate', arity: 1, clause: 'export-set-and-dispatch.md §1 — "the construction"' },
  { name: 'register', arity: 2, clause: 'export-set-and-dispatch.md §1 — "the listener-registration site"' },
];

export const PER_VERB_NINE = [
  { name: 'read', arity: 3, clause: 'export-set-and-dispatch.md §1 — "the read"' },
  { name: 'readLiteral', arity: 3, clause: 'export-set-and-dispatch.md §1 — "the literal read"' },
  { name: 'write', arity: 5, clause: 'export-set-and-dispatch.md §1 — "the write — it carries a fifth position the others do not"' },
  { name: 'delete', arity: 3, clause: 'export-set-and-dispatch.md §1 — "the version removal"' },
  { name: 'rollback', arity: 2, clause: 'export-set-and-dispatch.md §1 — "the journal rollback"' },
  { name: 'listen', arity: 3, clause: 'export-set-and-dispatch.md §1 — "the listener registration verb"' },
  { name: 'unlisten', arity: 2, clause: 'export-set-and-dispatch.md §1 — "the withdrawal"' },
  { name: 'removeListener', arity: 2, clause: 'export-set-and-dispatch.md §1 — "the whole removal"' },
  { name: 'commitFile', arity: 2, clause: 'export-set-and-dispatch.md §1 — "the file-tier save"' },
];

/** **THE THIRTEEN, AS ONE SET** — `9 + 4 = 13 ✓` (`§1`'s own `[CENSUS]`). */
export const DECLARED_SURFACE = [...STANDING_FOUR, ...PER_VERB_NINE];

/** The thirteen NAMES, sorted — the form `S-EXPORT-SET` asserts against, *"assert equality with the declared
 *  set, sorted"* (`contract.md §5`, `P-SAS-1`). */
export const DECLARED_SURFACE_NAMES_SORTED = DECLARED_SURFACE.map((e) => e.name).sort();

/**
 * **THE ARITIES, READ OFF THE JAVASCRIPT FUNCTION'S OWN `length`** — the count of declared positions, with
 * `length`'s own two caveats stated because they are the reason every cell also asserts a CALL rather than
 * the property alone (`P-SAS-2`'s `S-ARITY` drives *"each entry at its declared arity and at ±1"* and does
 * not stop at `length`):
 *
 *   * a function whose LAST declared position is optional reports `length` one BELOW its full set, and
 *     `errorMessage`'s clause prints the range `2`–`3` for exactly that reason;
 *   * a declared parameter named `...rest` reports only the positions before it, so `length` is a LOWER
 *     bound for any entry a landing spells with a rest position.
 *
 * **SO THE CELL THAT READS `length` ASSERTS `arity ≤ length ≤ arityMax` AND THE CELL THAT DRIVES THE CALL
 * ASSERTS THE ANSWER.** Neither limb is weakened by this note; the note is what makes the pair honest.
 */
export function declaredArityOf(name) {
  const entry = DECLARED_SURFACE.find((e) => e.name === name);
  return entry === undefined ? null : entry;
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// 2. THE THREE NAMES THAT ARE NOT ENTRIES — `export-set-and-dispatch.md §2`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`§2` IS HEADED *"THE THREE NAMES THAT ARE NOT ENTRIES, EACH NAMED SO ITS ABSENCE IS NOT READ AS AN
// OMISSION"*** and it states each with its reason, *"BECAUSE A READER COMPARING THE OLD TABLE TO THE NEW
// WILL LOOK FOR THEM."* **A DRIVE THAT ASSERTED ONLY *"the key set is thirteen"* could be satisfied by a set
// that dropped `call` and gained some other name**, so each of the three is asserted SEPARATELY below and in
// the cells — the two that must be ABSENT from the key set, and the one that is absent for a reason that is
// about a different layer entirely.
export const THE_THREE_THAT_ARE_NOT_ENTRIES = [
  {
    name: 'call',
    mustBeAbsentFromKeySet: true,
    clause: 'export-set-and-dispatch.md §2 — "`call` IS DELETED. It was the dispatcher: one entry taking '
      + '(instance, verb, args) and matching the verb across nine arms. The split is precisely its '
      + 'replacement, so it does not survive."',
    failure: 'F-1 — "`call` survives as an export"',
  },
  {
    name: 'commit',
    mustBeAbsentFromKeySet: true,
    clause: 'export-set-and-dispatch.md §2 — "`commit` IS NOT AN ENTRY AND NEVER WAS AN ARM. It is `write`\'s '
      + 'FOURTH POSITION — the record a kernel-driven write carries — and it has no exported name at all."',
    failure: 'F-2 — "an undeclared name appears"',
  },
  {
    name: 'constraints',
    mustBeAbsentFromKeySet: true,
    clause: 'export-set-and-dispatch.md §2 — "`constraints` IS NOT AN ADDON ENTRY. It is a product member the '
      + 'package answers from its own read model; the addon is never reached for it."',
    failure: 'F-2 — "an undeclared name appears"',
    note: 'AND THE NAME IS NOT IDLE AT ANOTHER LAYER: `docs/specs/storeroom-addon-adoption/contract.md §4` '
      + 'item 5 names `constraints` as a PACKAGE-SURFACE CALL in the kernel\'s commit-bracketing walk — '
      + '*"the same count, a different set"* — so the two statements are both true and this row asserts only '
      + 'the layer it is about: THE ADDON\'S OWN KEY SET.',
  },
];

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// 3. THE TWO `OWED` ITEMS — `contract.md §7`
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`§7` CARRIES THREE `OWED` BULLETS; THE THIRD — THE FREEZE — IS `DISCHARGED`, so the two that remain are
// the ones this file-set must route around.** Each is declared below with the split the spec itself makes:
// **THE SHAPE IS DECIDED AND DRIVES ARE AUTHORABLE; THE STRUCTURE IS NOT.**
//
// **`test-cases.md §4` STATES THE BOUND FOR `D-4` IN THE SPEC'S OWN WORDS** — *"`D-4` asserts the key set,
// the member count, non-`Error`-ness — and NOTHING about which token stands in `status`."* **AND
// `failure-form.md §3` STATES IT AS A PROHIBITION** — *"A DRIVE MUST NOT ASSERT THE ARM'S `status` TOKEN OR
// ITS `message` WHILE THEY ARE `OWED`"* — *"BECAUSE IT IS THE MISTAKE THE DEFERRAL INVITES."*
//
// **SO THE LIST BELOW IS READ BY THE CELLS AS A GATE AND NEVER AS A VALUE.** No token, no message text and
// no table type appears anywhere in this file-set; where a cell would need one, the cell asserts the SHAPE
// and carries the gap in its own message, and the gap is reported in the red set's digest.
export const OPEN_OWED = [
  {
    id: 'OWED-1',
    subject: 'the refusal arm\'s `status` token and its `message`',
    shapeDecided: 'the form — three members `{status, message, log}`, never an `Error`, the key set and the '
      + 'member count; the arm — one observable, covering a detached call and a collected store',
    structureOwed: 'which member of the store\'s closed status set the arm answers, and the arm\'s `message` text',
    clause: 'contract.md §7 · failure-form.md §2 — "THE MEMBER WHOSE VALUE IS `OWED` HERE IS THE REFUSAL '
      + 'ARM\'S `status` TOKEN AND ITS `message`."',
    revisit: 'contract.md §7 — "this unit\'s arm is authored and names a member of the store\'s closed status '
      + 'set — the choice is taken here and this bullet is discharged by it."',
    prohibits: 'failure-form.md §3 — "A DRIVE MUST NOT ASSERT THE ARM\'S `status` TOKEN OR ITS `message` '
      + 'WHILE THEY ARE `OWED`. Such a cell would pin a value that does not exist, and it would fail the '
      + 'moment the value is chosen — for a reason that is not a defect."',
  },
  {
    id: 'OWED-2',
    subject: 'the receiver table\'s form and its retirement mechanism',
    shapeDecided: 'the REQUIREMENT — the table holds the store, gains a retirement path, and the retirement '
      + 'removes EXACTLY ONE ENTRY, the freed instance\'s own, and NEVER THE TABLE',
    structureOwed: 'the table\'s form and its retirement mechanism',
    clause: 'contract.md §7 · receiver-and-refusal.md §6 — "THE TABLE\'S FORM AND ITS RETIREMENT MECHANISM '
      + 'ARE `OWED` … the requirement is decided and is driven by `P-SAS-5`."',
    revisit: 'contract.md §7 — "the retirement path is landed and `P-SAS-5` drives it green — a retirement '
      + 'that removes a second store\'s entry is the failure the row exists to catch."',
    prohibits: 'NOTHING ASSERTS A TABLE TYPE. `P-SAS-5` is read at its own observable — a freed store whose '
      + 'entry is gone, and a second store whose entry survives — and no cell of this file-set names a `Map`, '
      + 'a `WeakMap`, a `Vec`, an index or a channel. `receiver-and-refusal.md §5` withdraws the `WeakMap` as '
      + 'a design, which is not the same act as forbidding a read of one.',
  },
];

/** **THE THIRD `OWED` BULLET IS DISCHARGED AND IS NAMED SO ITS ABSENCE FROM `OPEN_OWED` IS NOT READ AS AN
 *  OMISSION** — `docs/specs/storeroom-addon-adoption/contract.md §7`: *"`DISCHARGED 2026-10-21` — the
 *  freeze's three figures, TAKEN."* **`U-STOREROOM-ADDON-SURFACE` CONSUMES THOSE THREE AS DECLARED INPUTS
 *  (`contract.md §1` item 3; `implementation-plan.md §1`) and re-derives none of them, so no cell of this
 *  file-set re-measures the `.node`'s `sha256`, re-counts `facade.rs`'s bytes, or pins the five-name set as
 *  a requirement of THIS unit.**
 *
 *  **AND THE FIVE-NAME SET IS NAMED HERE BECAUSE THE SPLIT MOVES AGAINST IT.** The freeze records the
 *  artefact's export set as `["call","errorMessage","register","storeCreate","version"]` — *"the `5` names
 *  as they stand BEFORE this unit's split"*. **THE SPLIT IS A CHANGE AGAINST THAT KNOWN ABI, and the
 *  before-and-after pair is what makes `F-1` a real failure rather than a preference: the artefact exports
 *  `call` TODAY, and after this unit it must not.** */
export const THE_FROZEN_FIVE = ['call', 'errorMessage', 'register', 'storeCreate', 'version'];

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// 3-bis. THE `OWED` DISCIPLINE'S OWN INSTRUMENTS, HELD HERE SO THE SCAN CANNOT FIND ITSELF
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`sas_the_two_owed_items_are_asserted_at_their_shape_and_never_at_their_structure` CHECKS THAT THE CELLS
// OF THE MAIN FILE STAYED INSIDE THE TWO `OWED` BOUNDS — AND THAT CHECK IS A TEXT READ OF THAT FILE.** **The
// tokens it searches for therefore CANNOT LIVE IN THE FILE IT SEARCHES**, or the check would find its own
// list and report a violation that is the instrument itself. They live here, in the module the scanned file
// imports, which is the reason this block exists and is not a stylistic choice.
//
// **AND THE SAME TRAP IS RECORDED AT ITS OWN PRECEDENT**: `addon-adoption-support.mjs`'s header states it
// from the other side — *"A cell that fails against this file can never go green without the implementer
// editing THIS FILE"* — and the `§4.2` reconciliation of 2026-10-20 struck a seam from that file for exactly
// this reason. **THE DIRECTION IS REVERSED HERE AND THE HAZARD IS THE SAME CLASS: an instrument placed where
// it measures itself is not measuring.**

/** **A TABLE TYPE, AN INDEX OR A CHANNEL** — `OWED-2`'s subject. `receiver-and-refusal.md §6` leaves *"THE
 *  TABLE'S FORM AND ITS RETIREMENT MECHANISM"* to `role_implementer`, so a cell naming one would fail the
 *  moment another lawful form landed — which is the failure `failure-form.md §3` describes at `OWED` values
 *  generally: *"it would fail the moment the value is chosen — for a reason that is not a defect."*
 *  **`receiver-and-refusal.md §5` withdraws the `WeakMap` as a DESIGN, and a withdrawal is not a prohibition
 *  on reading one — which is a second reason the cells stay at the observable.** */
export const OWED_STRUCTURE_TOKENS = ['WeakMap', 'new Map(', 'Vec<', 'Symbol.for('];

/** **AN ASSERTION ON THE RECEIVER ARM'S OWN THROWN VALUE** — `OWED-1`'s subject, matched as SHAPES rather
 *  than as strings so a MENTION of a token in prose is not reported as a breach while a genuine assertion is.
 *  **`failure-form.md §3`: *"A DRIVE MUST NOT ASSERT THE ARM'S `status` TOKEN OR ITS `message` WHILE THEY ARE
 *  `OWED`."*** The shapes below are the ones such an assertion would take at the receiver arm's own thrown
 *  value. **THE CODES THE CLAUSES THEMSELVES NAME ARE NOT THE RECEIVER ARM'S** (`ValueNotAdmitted` is the
 *  walk's own code carried by the store, `PAR-SAS-5`), which is why the `D-8` group's assertion is not a
 *  breach — and the main file enumerates that assignment so a third site cannot appear unreported.
 *
 *  **AND THE SHAPES DELIBERATELY DO NOT MATCH A SHAPE ASSERTION.** `assert.equal(typeof thrownValue.status,
 *  'string')` — which `sas_d4_s_refuse_keys_*` makes — IS WHAT `P-SAS-4` PERMITS and is the whole of what the
 *  row's `S-REFUSE-KEYS` declares; a pattern loose enough to catch it would fail on a CORRECT cell. **The
 *  breach `OWED-1` describes is an assertion of a SPECIFIC TOKEN**, so the pattern demands a status-shaped
 *  literal (`CamelCase`, the store's own closed-set spelling) and never the word `string`. */
export const OWED1_TOKEN_ASSERTION_SHAPES = [
  /(thrownValue|detached\.thrown|onCollected\.thrown)\.status\s*,\s*'[A-Z][A-Za-z]+'/g,
];

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// 4. THE FOUR SMALL READS EVERY DRIVE OF BOTH FILES USES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE ARTEFACT'S OWN KEY SET** — the ONE read `S-EXPORT-SET` declares: *"read the addon's own key set"*
 *  (`contract.md §5`, `P-SAS-1`). The artefact is `require`d rather than imported because it is a Node-API
 *  addon and not an ES module, and `Object.keys` is read in the ARTEFACT's own spelling and never sorted
 *  here: the ORDER is the artefact's and `Object.keys` is the clause's own instrument. */
export function addonKeySet() {
  return Object.keys(require_(ADDON_ARTEFACT));
}

/** **THE PACKAGE'S OWN MESSAGE RENDERER, REACHED AS A STANDING ENTRY** (`export-set-and-dispatch.md §1`:
 *  *"the one message renderer the package calls"*). It is the route by which `js-unwrap.md §3`'s re-render is
 *  composed, and a drive that reads it is reading the generator's own bytes and not re-spelling them. */
export function generated(status, subject, container) {
  const addon = require_(ADDON_ARTEFACT);
  return container === undefined
    ? addon.errorMessage(status, subject)
    : addon.errorMessage(status, subject, container);
}

/** **THE PATH THE GOLDEN COMPARES THE PACKAGE'S OWN BYTES AT** — `contract.md §6` item 3: the case
 *  identity *"is the harness's own `test('<id> — …')` literal"*, and `js-unwrap.md §1`'s two wrappers live in
 *  this file. **THE FILE IS READ AS TEXT AND NEVER IMPORTED BY THE PROPERTY LAYER'S SITE DRIVES**, so a
 *  grep-shaped property (`S-UNWRAP-SITES`, `S-STATE-ID-GONE`) reads the declaration rather than executing it. */
export const DELETED_WRAPPER_NAMES = ['call', 'writeCall'];

/**
 * **A LIVE SITE OF A DELETED WRAPPER NAME, READ OVER THE MODULE'S OWN CLOSED SET.**
 *
 * **⟶ WHY THIS HELPER EXISTS AT ALL (2026-10-24, `strata/decisions.md`'s FINDING class (3)).** The two cells
 * that assert `S-UNWRAP-SITES` used to read `bindings/js/index.mjs` — which WAS the whole module. After the
 * entry's cut the hub is 1,409 lines of the module's 6,350, so a scan of it alone answers *"no live site"*
 * because it no longer carries the code the clause is about: **a green that is really a scan of the wrong
 * file.** The subject is therefore the module's own closed set — the hub, the GLOB of `src/entry/*.mjs` and the
 * barrel — read through `module-set.mjs`, which is the same set every staged tree carries.
 *
 * **AND THE SHAPE IS SHARPENED BY ONE DOCUMENTED LIMB, BECAUSE A NAME IS NOT A BINDING.** `js-unwrap.md §1`
 * deletes two WRAPPERS — `call(state, verb, args)` and `writeCall(state, args, fault)`, both 3-ary, whose
 * thirteen call sites each passed the store's state and the verb. **A call with NO ARGUMENTS cannot be one of
 * them**, and this module has such a call: `src/entry/state.mjs`'s `carryRefusal(call, args)` calls its own
 * CALLBACK PARAMETER as `return call();`. A predicate that could not tell a parameter from the deleted wrapper
 * would go red on a correct landing the moment its subject widened — so an occurrence is a LIVE SITE only where
 * the parenthesised argument list that follows the name is NON-EMPTY. **Nothing is forgiven beyond that**: a
 * one-argument call still counts, every argument shape the wrappers ever took counts, and the assertion the
 * cells make stays *"zero live sites"*.
 */
export function deletedWrapperCallSites(codeFiles, names) {
  const live = [];
  for (const file of codeFiles) {
    const text = file.text;
    for (const name of names) {
      const pattern = new RegExp(`(^|[^.\\w$])${name}\\s*\\(`, 'g');
      let match = null;
      while ((match = pattern.exec(text)) !== null) {
        const open = match.index + match[0].length - 1; // the `(` itself
        let depth = 0;
        let close = open;
        for (let i = open; i < text.length; i += 1) {
          if (text[i] === '(') depth += 1;
          else if (text[i] === ')') {
            depth -= 1;
            if (depth === 0) { close = i; break; }
          }
        }
        const args = text.slice(open + 1, close).trim();
        if (args.length === 0) continue; // a no-argument call names some OTHER binding (a callback parameter)
        const line = text.slice(0, match.index).split('\n').length;
        live.push(`${file.relativePath}:${line} ${name}(${args.split('\n')[0].trim()}`);
      }
    }
  }
  return live;
}


// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// 5. THE FORM, READ AT ITS OWN SHAPE — and WHY NO TOKEN IS ASSERTED HERE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **`failure-form.md §1`: *"A refusal crossing the boundary is never an `Error`. … EVERY ONE OF THE THIRTEEN
// ENTRIES REFUSES IN THE SAME FORM."*** The form's members are the sibling unit's (`docs/specs/
// storeroom-addon-adoption/failure-form.md §1`): exactly `{status, message, log}`, thrown, never an `Error`,
// **and `stack` is NOT part of the form and is NOT forbidden** (`§2` item 4 of the surface contract, whose
// `P-ADA-3`-family exclusion reads *"`stack` is not part of the form and is not forbidden"*).
//
// **SO THE PREDICATE BELOW ASSERTS EXACTLY WHAT `P-SAS-4`'s `S-REFUSE-KEYS` DECLARES AND NOT ONE MEMBER
// MORE** — *"the thrown value carries the three members and is not an `Error`"* — with the failure list's
// own caveat: *"a throw carrying a member beyond the three other than `stack`, which is not part of the form
// and is not forbidden."* **THE `stack` EXCLUSION IS THEREFORE READ AS THE SPEC WRITES IT: an extra `stack`
// PASSES, and any OTHER extra member fails.**
//
// **AND NOT ONE BYTE OF THIS PREDICATE READS `status`.** That is `OWED-1`'s half: the token is asserted
// nowhere, and a predicate that read it would make every `P-SAS-4` cell fail the moment the arm's author
// chose — *"for a reason that is not a defect"* (`failure-form.md §3`).
export const FORM_MEMBERS = ['log', 'message', 'status'];

/** ═════════════════════════════════════════════════════════════════════════════════════════════════════
 *  **THE FORM IS SPLIT BY LAYER, BECAUSE `log` HAS EXACTLY ONE HOME AND IT IS THE JS BOUNDARY.**
 *
 *  `docs/specs/storeroom-addon-adoption/failure-form.md` states the three members at `§1` — *"A refusal
 *  crossing this boundary is a THROWN PLAIN OBJECT carrying exactly three members — `status`, `message`,
 *  `log` — and nothing else"* — **AND IT STATES WHERE THE THIRD IS BUILT IN THE SAME PART**:
 *
 *    · `§1`: *"**the third, `log`, is built at the JS boundary and never in Rust.**"*
 *    · `§4`: *"**the `log` member is attached at the JS boundary and not in Rust.** A boundary that
 *      produced it in Rust would be a SECOND HOME for it."*
 *
 *  **SO THE MEMBER COUNT IS A STATEMENT ABOUT THE LAYER THAT CROSSES TO THE CONSUMER, AND `log` IS ADDED
 *  ALONG THE WAY.** The RAW ARTEFACT — the `.node` read directly, as `ADDON_ARTEFACT` reads it — throws
 *  `{status, message}` and NO `log`, **because Rust is where `log` must NOT be built.** The PACKAGE — what
 *  `provident-storeroom`'s entry hands a consumer — carries all three.
 *
 *  **A CELL THAT DEMANDED `log` OF THE RAW ARTEFACT WOULD BE RED ON A CORRECT LANDING, AND GREEN ONLY IF
 *  THE ARTEFACT HAD GROWN THE SECOND HOME `§4` FORBIDS.** That is the same failure mode `failure-form.md
 *  §3` warns about at `OWED` values: a cell that pins a value the layer does not hold. **THE PREDICATES ARE
 *  THEREFORE ONE PER LAYER AND EACH CELL NAMES THE LAYER IT DRIVES.**
 *
 *  **THE COVERAGE IS NOT WEAKENED**: `isTheDeclaredForm` is UNCHANGED and still asserts the full three at
 *  the package layer, where `log` is built; `isTheArtefactForm` asserts the TWO the artefact layer owns
 *  and **still refuses an `Error`, a non-object, an array, a missing/empty `status` or `message`, and any
 *  member beyond the two other than `stack`** — so the one failure form is asserted at BOTH layers and
 *  neither layer may breach it.
 *  ═════════════════════════════════════════════════════════════════════════════════════════════════════ */
export const ARTEFACT_FORM_MEMBERS = ['message', 'status'];

/** **THE FORM AT THE RAW ARTEFACT LAYER** — the two members Rust owns. `log` is NOT asserted here: it is
 *  built at the JS boundary (`failure-form.md §1`/`§4`) and demanding it of the artefact would be the
 *  second home those clauses forbid. **EVERY OTHER LIMB OF THE FORM IS ASSERTED IDENTICALLY TO THE
 *  PACKAGE-LAYER PREDICATE BELOW**, so the artefact may not answer an `Error`, a partial record, or an
 *  undeclared member either. */
export function isTheArtefactForm(thrown) {
  if (thrown === null || typeof thrown !== 'object') return false;
  if (Array.isArray(thrown)) return false;
  if (thrown instanceof Error) return false;
  const keys = Object.keys(thrown);
  if (!ARTEFACT_FORM_MEMBERS.every((member) => keys.includes(member))) return false;
  // `log` may lawfully be PRESENT if a future landing routes the artefact call through the boundary's own
  // unwrap, but it is NOT DEMANDED and NOT REQUIRED to be absent — what is forbidden is a member beyond the
  // declared three, with `stack` the one lawful extra (`failure-form.md §2`'s caveat).
  const extra = keys.filter((member) => !FORM_MEMBERS.includes(member));
  if (extra.some((member) => member !== 'stack')) return false;
  return typeof thrown.status === 'string'
    && thrown.status.length > 0
    && typeof thrown.message === 'string';
}

/** **THE FORM AT THE PACKAGE LAYER — WHERE `log` IS BUILT.** `failure-form.md §1`'s three members, thrown,
 *  never an `Error`, `stack` excluded from the prohibition (`§2` item 4). **UNCHANGED BY THE LAYER SPLIT:
 *  this is the predicate every cell driving `provident-storeroom`'s own surface uses.** */
export function isTheDeclaredForm(thrown) {
  if (thrown === null || typeof thrown !== 'object') return false;
  if (Array.isArray(thrown)) return false;
  if (thrown instanceof Error) return false;
  const keys = Object.keys(thrown);
  if (keys.length < 3) return false;
  if (!FORM_MEMBERS.every((member) => keys.includes(member))) return false;
  const extra = keys.filter((member) => !FORM_MEMBERS.includes(member));
  // `stack` alone is lawful and is NOT asserted either way (`failure-form.md §2`'s caveat).
  if (extra.some((member) => member !== 'stack')) return false;
  return typeof thrown.status === 'string'
    && thrown.status.length > 0
    && typeof thrown.message === 'string'
    && Array.isArray(thrown.log);
}

/** **THE ARITY A CALL PRODUCES** — the answer/refusal pair `S-ARITY` drives: *"call each entry at its declared
 *  arity and at ±1; the declared arity answers, the others refuse"* (`contract.md §5`, `P-SAS-2`). **A cell
 *  reads BOTH halves**, so an entry that quietly tolerated a wrong arity cannot pass by answering. */
export function callAndClassify(entry, args) {
  try {
    return { refused: false, answer: entry(...args) };
  } catch (thrown) {
    return { refused: true, thrown };
  }
}
