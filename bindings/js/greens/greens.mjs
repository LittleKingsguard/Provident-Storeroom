// bindings/js/greens/greens.mjs
// THE BLIND GREENS DRIVER for `U-STOREROOM-JS` (`D-GP-SRJS`), gate 5 (`P5`).
//
// AUTHORED FROM THE DOCUMENTATION ALONE: docs/specs/storeroom-js-greens.md — the scenario set this file
// drives, cell for cell and in the same order. NO byte of bindings/js/src/**, bindings/js/index.mjs,
// bindings/js/test/**, bindings/js/tests/**, src/** or tests/** was read by the pass that wrote this file.
// The package is reached ONLY as a consumer, through its CLAIMED ESM ENTRY (the one import below).
//
// LAYER: ENVELOPE/PURE.   APP LAYER: NONE.   NO `APP`-GREEN IS CLAIMED HERE OR ANYWHERE IN THIS RUN.
//
// RUN:  node bindings/js/greens/greens.mjs        (from the repository root)
//
// ⟶ RE-DERIVED 2026-10-15 — THE `A116` ORDERING-SEAM RE-DERIVATION PASS (`role_blind_test_writer`), ON THE
// RE-SPELLED CLAUSES: `JSG-14.4`, `JSG-14.5` and `JSG-15.1` are re-derived against the clauses as they now
// read — `§2.4` item 9 (b) (the seam's refusal: `TypeError` and nothing else, `status` ABSENT, a STRING
// `message` REQUIRED and NOT FORBIDDEN — where the pre-re-spelling cells asserted "NO `message` member", the
// reading item 5 (d) carries at the REGISTRATION site) and `§2.7` item 2 (the instant measured from the STORE
// call's completion and the record's copy-out, the package's verb NOT yet returned — where the
// pre-re-spelling cell asserted the opposite sign of the same flag). Each cell keeps its subject and its
// drive, and the observable it asserts is the clause's own. `JSG-16.1` NOW TAKES ITS ASSERTION: THE ARCHITECT'S
// RULING HAS LANDED (2026-10-15) AND IT IS RULED, NOT SPLIT — `§2.7` item 6 GOVERNS THE FIRING (the write's
// triggered constraints run first and THE OTHER LISTENERS ARE REACHED ONCE EVERY CONSTRAINT HAS PASSED), while
// `§2.4` item 8 (c) is a REGISTRATION-side statement whose NON-DELIVERY DERIVATIONS ARE SUPERSEDED; A SPLIT
// ONCE STOOD AT THIS CELL (2026-10-15, `docs/next-steps.md` · `N7` item 1, `250`/`247`/`3`), and it is
// superseded by that ruling. The cell's one observable, driven through the kernel route the ruling names: the
// app's registration at the pair-adopted address fires EXACTLY ONCE, AFTER THE PASS — after the store call has
// completed and the write's own record is readable — WITH THE TRIGGERING ADDRESS AS ITS SINGLE ARGUMENT; its
// sibling control at the PROPER PREFIX fires once too, and a third registration at a BARE address (no pair
// there) is the instrument control that shows this drive's registrations and findings work where no pass is in
// play. ⟶ THE FIGURE THIS CELL ONCE PRINTED IS SUPERSEDED, DATED 2026-10-17 (`RCA-8(g)`; `DEF-2026-10-17-C`):
// *"THE SET IS `253` AUTHORED · `253` EXECUTED OVER `16` SCENARIOS"* IS THIS PASS'S OWN PRE-RULING READING, AND
// THE OPERATIVE ONE IS THE `255` · `255` · `0` SET THE `DEF-2026-10-16-A` BLOCK BELOW CARRIES — the one new
// assertion that block added is the difference. THE PRE-RULING READING AT THIS SITE WAS `250` · `250` · `0`,
// and the assertion that was then expected RED has since landed: nothing here is reported as awaiting a fix.
//
// ⟶ RE-DERIVED 2026-10-16 — THE `DEF-2026-10-16-A` PASS (`role_blind_test_writer`). THE SUITE STOOD AT
// `243`/`253`: TEN CELLS ASSERTED LAW THIS CHANGE MOVED, IN TWO CLASSES, AND EVERY ONE IS SUPERSEDED AND NOT
// BROKEN — (i) the load-side zero-byte / `ConstraintListInvalid` cells and (ii) the cells that drove the file
// commit AT THE VERB. The law that moved: `storeroom-js/surface.md §2.11` clause 2 (the `file`-tier save is the
// `settle` seam's TERMINAL ARM's act; *"the verb performs NO FILE I/O on any of its arms"*) and the ruled load
// side, `docs/decisions.md` · `A119` (2026-10-16, `ACTIVE`: the exemption is the FILE'S emptiness — a zero-byte
// file boots an INSTANCE, a present short image is validated and refused). EACH OF THE TEN IS RE-DERIVED, NONE
// IS RETIRED, AND EACH CARRIES ITS DATED NOTE AT ITS OWN CELL: `JSG-02.10`, `.11`, `.14`, `.15`, `.16` are
// RE-POINTED to the terminal arm (their property still exists there) and two cells are ADDED at `.17`/`.18`
// pinning the ruled load side at this scenario's own fixture; `JSG-10.16`–`.20` are RE-POINTED to the same
// route, `.19`'s census WIDENED from the superseded fifteen to the sixteen of `store §8.1`'s dated clause of
// 2026-10-15. THE SET IS `255` AUTHORED · `255` EXECUTED OVER `16` SCENARIOS, `255` PASS · `0` FAIL — a
// RETIRED CELL WOULD OWE A NOTE NAMING ITS SUPERSEDING CLAUSE, AND NO CELL HERE IS RETIRED.
//
// ⟶ RE-DERIVED 2026-10-17 — THE FAILURE-FORM OVERRIDE PASS (`role_test_writer`), ON THE ARCHITECT'S RULING
// *"Override the failure form limit"* READ WITH HIS EARLIER *"Bubble the message log to the client on failure,
// override any clauses that forbid this."* THE SUITE STOOD AT `235`/`20`. TWENTY CELLS ASSERTED THE SUPERSEDED
// `DD-12` / `Refusal` LIMIT (*"EXACTLY two members, no third"*) AND EVERY ONE IS RE-DERIVED, NONE RETIRED:
// `JSG-04.1.iii`–`04.14.iii` (`:14` cells through the `refusal` helper), `04.16`, `05.3`, `06.5`, `06.6`,
// `09.6` and `10.18` — EACH NOW ASSERTS THE DECLARED THREE-MEMBER SET `["log","message","status"]`, SORTED,
// LENGTH `3`, WITH `log` AN ARRAY, from `docs/specs/storeroom-js/surface.md §2.5` ITEM 4 (the set is FLAT ACROSS
// ARMS; `[]` is the declared value where the cause has no attempt) READ WITH ITEM 9 (`log` an ORDINARY OWN
// ENUMERABLE DATA MEMBER). `10.18`'s authority WAS `DD-12` EXPLICITLY and its citation now records that override.
// ONLY THE MEMBER-SET LIMB MOVED: every cell keeps its other limbs — which refusal, which code, which non-empty
// message, that nothing was left behind. ONE CELL IS ADDED AND TAKES A NEW ID (`JSG-09.13`, the `log: []` limb on
// the three constraint methods' `TypeError`, which item 4 names BY NAME and which no cell of this set pinned).
// `const LAYER` AND `const APP_LAYER` ABOVE, THE HEAD COMMENT AND THE PRINT ARE BYTE-IDENTICAL: a cell of
// `bindings/js/test/register.test.mjs` reads them, and a change there would manufacture a false green.
// THE SET IS NOW `256` AUTHORED · `256` EXECUTED OVER `16` SCENARIOS, `256` PASS · `0` FAIL.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const LAYER = 'ENVELOPE/PURE';
const APP_LAYER = 'NONE';

// ── the declared surface, from the docs alone ──────────────────────────────────────────────────────────
// ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): THE `8`-NAME
// `MODULE_VERBS` READING IS THE `Q1` PASS'S AND IS **STALE AS A NAMESPACE FIGURE**, `RCA-8(g)`:
// `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause of 2026-10-16 gives the module namespace ONE
// name, `storeCreate`, and moves those ten store-reaching names — `read` · `readLiteral` · `write` · `delete` ·
// `rollback` · `listen` · `unlisten` · `addConstraint` · `constraintOn` · `constraintOff` — onto the PRODUCT as
// methods (`§2.9`'s removal-versus-deprecation clause of that date, no deprecation window). The two constants
// below are the operative declared sets; no cell reads them for a figure another clause now fixes, and the
// superseded `8`-verb array is not re-spelled as if it were still a namespace figure.
// **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): `PRODUCT_MEMBERS` MOVES `13 → 12`, `10 + 1 + 1 = 12` ✓** —
// the ten methods plus the TWO remaining singles `register` and `constraints`, `settle` leaving at
// `surface.md §2.4` item 9's `REMOVED-WHOLE` pointer of that date. **THIS CONSTANT HAS NO READER** (measured:
// one occurrence in the file), so the move is a census duty and not a live expectation — it is corrected here
// so the declared set printed at the head of this driver is not stale beside the cells that assert it.
const NAMESPACE = ['storeCreate'];
const PRODUCT_MEMBERS = ['addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen',
  'read', 'readLiteral', 'register', 'rollback', 'unlisten', 'write'];
const CLOSED_SET = [
  'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch', 'WriteParentNotLink',
  'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing', 'FilePathUnreachable',
  'ValueNotAdmitted', 'FileCommitFailed',
  // ⟶ WIDENED 2026-10-16 (`DEF-2026-10-16-A` re-derivation pass, `role_blind_test_writer`): the sixteenth
  // member, appended at rank `16` by `store §8.1`'s dated clause of 2026-10-15. The census this array feeds is
  // `JSG-10.19`'s, and the count it printed was the SUPERSEDED FIFTEEN (`DEF-2026-10-15-Y`'s class).
  'ConstraintListInvalid',
];
const INTERNAL_FIVE = ['version', 'errorMessage', 'storeCreate', 'call', 'register'];
const PLACEHOLDER_TOKENS = ['<SEGMENT>', '<CONTAINER>', '<mismatch clause>', '<available clause>',
  '<CONTAINERSEGMENT>', '<KEYLIST>', '<TIERLIST>', '<DOMAINLIST>', '<arguments>', '<argument-name>', '<TRAITS>'];

// ── the run's own bookkeeping ───────────────────────────────────────────────────────────────────────────
let authored = 0, executed = 0, pass = 0, fail = 0;
const fails = [];
// ⟶ ADDED 2026-10-16: the observables of the ten cells re-derived by this pass plus the two it adds, printed
// in the report so each re-derived verdict is readable AT ITS BYTES and not only as a PASS count.
const REDERIVED = [];
const perScenario = new Map();

function A(id, clause, expectation, cond, observed) {
  authored += 1; executed += 1;
  const sc = id.split('.')[0];
  if (!perScenario.has(sc)) perScenario.set(sc, { pass: 0, fail: 0 });
  const rec = perScenario.get(sc);
  if (cond) { pass += 1; rec.pass += 1; }
  else {
    fail += 1; rec.fail += 1;
    fails.push({ id, clause, expectation, observed: String(observed) });
    console.log(`FAIL ${id}  expected: ${expectation}\n             observed: ${observed}\n             clause:   ${clause}`);
  }
}

// ── the §1.5 relation, and the form checks ──────────────────────────────────────────────────────────────
const ABSENT = Symbol('ABSENT');   // crossing.md §1.3's dated rule: an ABSENT trailing position is driven by CALL ARITY
function rel(a, b) {
  // member-SET equality for objects; array index order significant; Object.is for numbers (§1.5).
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => rel(v, b[i]));
  }
  if (typeof a === 'object') {
    const ka = Object.keys(a).sort(), kb = Object.keys(b).sort();
    if (ka.length !== kb.length || ka.some((k, i) => k !== kb[i])) return false;
    return ka.every((k) => rel(a[k], b[k]));
  }
  return false;
}
function fmt(v) {
  try {
    if (typeof v === 'string') return JSON.stringify(v);
    if (typeof v === 'bigint') return `${v}n`;
    if (typeof v === 'symbol') return String(v);
    if (typeof v === 'function') return 'function';
    if (typeof v === 'number') return Object.is(v, -0) ? '-0' : String(v);
    if (Array.isArray(v)) return `[${v.map(fmt).join(',')}]`;
    if (v !== null && typeof v === 'object') {
      const p = Object.getPrototypeOf(v);
      if (p !== Object.prototype && p !== null) return `${v.constructor?.name ?? 'object'}{}`;
      return `{${Object.keys(v).sort().map((k) => `${k}:${fmt(v[k])}`).join(',')}}`;
    }
    return String(v);
  } catch { return '<unprintable>'; }
}
function thrown(fn) { try { return { threw: false, value: fn() }; } catch (e) { return { threw: true, err: e }; } }
function formOf(e) {
  if (e === null || typeof e !== 'object') return { obj: false, members: [], proto: 'n/a', errorish: false };
  return {
    obj: true,
    members: Object.getOwnPropertyNames(e).sort(),
    proto: Object.getPrototypeOf(e) === Object.prototype ? 'Object.prototype' : 'other',
    errorish: e instanceof Error || Object.prototype.toString.call(e) === '[object Error]',
  };
}
function membersAre(r, want) { return r.members.join(',') === want; }
// ⟶ ADDED 2026-10-17 (THE FAILURE-FORM OVERRIDE RE-DERIVATION PASS, `role_test_writer`): THE DECLARED CROSSED
// FORM'S OWN TWO HELPERS, so no cell below re-spells the member set by hand. `surface.md §2.5` item 4 fixes the
// THREE-member set FLAT ACROSS ARMS (`log` PRESENT on every failure, `[]` where the cause has no attempt at all)
// and item 9 declares `log` an ORDINARY OWN ENUMERABLE DATA MEMBER, never absent, never `null`, never a non-array.
const FORM_MEMBERS = 'log,message,status';   // sorted, §2.5 item 9
const formIsThree = (r) => r.members.join(',') === FORM_MEMBERS;   // the member set, by NAME
const logIsDeclared = (v) => Array.isArray(v);                       // item 9: NEVER a non-array
// §2.5 item 4's own discrimination, STATED WHERE EVERY CELL BELOW CAN READ IT: an arm whose cause has no attempt
// at all carries `log: []` — the construction's `cfg`-side refusals, a `read`/`readLiteral`/`delete`/`rollback`
// store refusal with no attempt live, `a.register`'s `TypeError` and the three constraint methods' `TypeError`.
const logIsEmpty = (v) => Array.isArray(v) && v.length === 0;        // item 4's `[]` arms
function statusOf(r) { return r.threw ? (r.err && typeof r.err === 'object' ? r.err.status : undefined) : '<no throw>'; }
function msgOf(r) { return r.threw && r.err && typeof r.err === 'object' ? r.err.message : undefined; }

// ── ⟶ ADDED 2026-10-24 (`D-19`/`D-20`, THE CRASH FIX, `role_l1_test_writer`): THE LISTENER-HANDLE SPELLING,
// RE-DERIVED AT ITS DRIVES TO THE CODE'S CURRENT SHAPE — AND THE PAIR READ THAT GOES BESIDE IT.
//
// **THE CRASH THIS PASS FIXES, STATED AT ITS CAUSE.** Every listener drive in this run called the SUPERSEDED
// `listen(address)` — arity `1`, an ADDRESS at position `1` — and the code now refuses that call with a thrown
// `AddressMalformed`, because the handle MOVED INTO position `1` and the addresses into position `2`
// (`bindings/js/index.d.ts`: `listen(handle: Handle, addresses: readonly Address[]): void`, `Handle = string`,
// `listen` answering `undefined`). `JSG-08.1`'s drive was a BARE call, so the refusal was UNCAUGHT and the
// process died before `live-drive.mjs` and `file-tier-save/scenarios.mjs` ran at all.
//
// **WHY THIS IS A RE-DERIVATION AND NOT A SWALLOW** (`D-17`). No `try`/`catch` was wrapped around a throw and no
// cell was retired or softened: the handle is now SPELLED by the drive (the same identity each cell already
// read), the address is passed as the ONE-MEMBER SET the declaration takes, and `triggered`'s element — a PAIR
// `{handle, address}` in the code as it stands — is read by its `handle` member, which is the same identity the
// as-filed `triggered.includes(handle)` meant. `bindings/js/test/constraint-kernel-deliverymodel.test.mjs`
// carries the same re-derivation for the same change (2026-10-18), and this file follows it rather than
// inventing a second convention. **CELLS WHOSE SUBJECT IS THE *MINTED* OPAQUE HANDLE HAVE NO SUBJECT ANY MORE**
// — nothing is minted, `listen` answers `undefined` — and they are LEFT RED AND REPORTED, never made green by a
// vacuous comparison: each carries the type precondition its own words already presupposed.
const listenSpelling = (tagged) => `greens-handle-${tagged}`;
function carriesHandle(set, handle) {
  return Array.isArray(set) && set.some((e) => e !== null && typeof e === 'object' && e.handle === handle);
}
const distinctHandles = (set) => [...new Set((Array.isArray(set) ? set : [])
  .map((e) => (e !== null && typeof e === 'object' ? e.handle : e)))];

// ── the scratch area (OUTSIDE the repository's tracked tree) ─────────────────────────────────────────────
const ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'sr-js-greens-'));
function cfgFor(name, extra = {}) {
  const dir = path.join(ROOT, name);
  fs.mkdirSync(dir, { recursive: true });
  return { c: { filePath: path.join(dir, 'state.json'), journalLength: 4, listeners: [] }, dir };
}
const mk = (name, extra = {}) => ({ ...cfgFor(name).c, ...extra });

// ── the claimed ESM entry: THE ONE import of this run ───────────────────────────────────────────────────
let ns = null, IMPORT_ERROR = null;
try { ns = await import('../index.mjs'); } catch (e) { IMPORT_ERROR = e; }

if (ns === null) {
  console.log(`FATAL — the claimed ESM entry did not resolve, so NO cell of this set can run: ${IMPORT_ERROR}`);
  console.log(`AUTHORED ${authored} · EXECUTED 0 · PASS 0 · FAIL 0 · UNABLE-TO-RUN`);
  process.exit(2);
}

// ── the SECOND consumer module, reached ONLY by the one cell the ruling sends through it (`JSG-16.1`): the
// kernel whose two items carry the pass's own instants, `constraint-kernel`, at the ONE checkout home the
// kernel's own clause declares (`docs/specs/storeroom-constraints/kernel-surface.md §1` item 1 — the ESM
// source file `bindings/js/src/constraint-kernel.mjs`, whose build scope that clause declares and whose
// `K-1`–`K-5` signatures `§2.1` prints). The ruling re-derives the pair-adopted address's firing "after the
// pass", and a pass is reached ONLY through this module: NO clause of `docs/specs/storeroom-js/**` puts a
// pass on the package's own surface. Imported as DATA (its call shapes are the doc's), never read as source;
// where it does not resolve, `JSG-16.1` says so and drives nothing else differently.
let kernel = null, KERNEL_ERROR = null;
try { kernel = await import('../src/constraint-kernel.mjs'); } catch (e) { KERNEL_ERROR = e; }
function K1(store, address, id, fn) { return kernel.register(store, address, id, fn); }
function K2(store, address, tier, value) { return kernel.commit(store, address, tier, value); }
function K3(store, attempt) { return kernel.runAttempt(store, attempt); }

// ── ⟶ ADDED 2026-10-16 (THE `DEF-2026-10-16-A` RE-DERIVATION PASS, `role_blind_test_writer`): THE `file` TIER'S
// SAVE REACHED ON THE ONE ROUTE THE AMENDED LAW LEAVES IT. `docs/specs/storeroom-js/surface.md §2.11` clause 2
// moved the `file`-tier durable commit OFF the write verb and onto the `settle` seam's TERMINAL ARM — the act
// is *"the FIRST thing that arm does, before any body of the delivered set is invoked"* — so the store's file
// write is performed by `K-3`'s terminal arm and by NOTHING else: a bare `write` performs NO file I/O on any
// of its arms. Every cell of this set that once drove the file commit AT THE VERB is re-pointed through this
// helper (`K-2` `commit` then `K-3` `runAttempt`; `docs/specs/storeroom-constraints/kernel-surface.md §2.1`
// items 2–3), its subject unchanged. Imported as DATA and driven, never read as source.
function kernelSaveFile(store, address, value) {
  if (kernel === null) return { threw: true, err: `KERNEL ABSENT: ${fmt(String(KERNEL_ERROR))}` };
  const rec = thrown(() => K2(store, address, 'file', value));
  if (rec.threw) return rec;
  return thrown(() => K3(store, rec.value));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-01 — THE SURFACE                                                      17 assertions
// ⟶ RE-DERIVED 2026-10-11 (THE `Q1` CONTRACT AMENDMENT, `A79`): the instance's own member set is now the
// THREE members `{ register, on, off }`, fixed by `docs/specs/storeroom-js/surface.md` §2.1's dated clause
// 1 (a) and carried at that document's §2.4 item 7; the OLD value — the set `{ register }` — was §2.4
// item 5 (a)'s PRE-AMENDMENT declaration, superseded AS A MEMBER-SET FIGURE by §2.1's dated clause 1 (a)
// (contract.md §5.5's dated clause, clause 5, names this header and `JSG-01.9` as the two cells that move).
// ⟶ THIS PARAGRAPH'S THREE-MEMBER FIGURE IS ITS PASS'S OWN READING (2026-10-11) AND IS SUPERSEDED AS A
// MEMBER-SET FIGURE BY THE `A116` SEAM: `{ register, on, off, settle }`, FOUR OWN MEMBERS — see the cell below.
// The MODULE NAMESPACE is UNMOVED at the eight declared verbs (§2.1's dated clause 1 (b)): `JSG-01.2`,
// `.7`, `.11` and `.12` stand as filed. The four cells `.14`–`.17` are this scenario's own coverage of the
// two new members: their function class, their absence from the module namespace, and their two DECLARED
// RETURN types (`on` -> the opaque handle; `off` -> `undefined`). NO FIRING RULE IS STATED OR ASSERTED BY
// ANY CELL HERE (`A78`): what fires, when, and what a trigger returns is the store's, not this set's.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i1 = ns.storeCreate(mk('g01'));
  const names = Object.keys(ns).sort();
  const C1 = '§2.9 item 1; package.md §1.3 item 3';
  A('JSG-01.1', C1, 'the entry resolves to a non-null namespace object', ns && typeof ns === 'object', fmt(ns));
  // ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): THE `8` NAMES THIS
  // CELL AND ITS SIBLING BELOW ASSERTED ARE THE `Q1` PASS'S READING AND ARE **STALE GREENS DOC**, `RCA-8(g)`:
  // `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause of 2026-10-16 moves the MODULE NAMESPACE
  // to ONE name, `storeCreate` ALONE, `11 → 1` ✓ — *"`storeCreate` IS NOT A MEMBER OF ITS OWN PRODUCT: it is
  // the MODULE NAMESPACE'S one remaining name and the factory that returns the product"* — and `§2.9`'s
  // removal-versus-deprecation clause of the same date declares the ten store-reaching names' removal WITH NO
  // DEPRECATION WINDOW: `read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` ·
  // `addConstraint` · `constraintOn` · `constraintOff`. EACH CELL KEEPS ITS SUBJECT (the namespace's exact
  // name set; each name's function class), ITS DRIVE AND ITS EXACTNESS — the set is asserted by SET EQUALITY
  // and each member by its own class test — AND NOTHING IS LOOSENED. The ten names' NEW home is the product's
  // own method set, and their arity and refusal are `§2.4` item 9 (f)'s `A127` table; `.11` below asserts
  // their presence AS METHODS, which is this cell's counterpart and not a retirement of it.
  A('JSG-01.2', `${C1}; §2.9 item 1's \`A127\` clause (the namespace falls \`11 → 1\`)`, "the namespace's own named exports are exactly the ONE remaining name, `storeCreate` — and no other name (`11 → 1`)",
    names.join(',') === 'storeCreate', names.join(','));
  A('JSG-01.3', `${C1}; §2.9 item 1's \`A127\` clause; §2.9's removal-versus-deprecation clause of 2026-10-16`, "the one exported name is a function, and none of the ten store-reaching names is a module-level name any longer",
    typeof ns.storeCreate === 'function' && Object.keys(ns).every((v) => typeof ns[v] === 'function'), Object.keys(ns).map((v) => `${v}:${typeof ns[v]}`).join(','));
  A('JSG-01.4', '§2.9 item 1', 'findAddress is NOT an own export', !Object.prototype.hasOwnProperty.call(ns, 'findAddress'), `own=${Object.prototype.hasOwnProperty.call(ns, 'findAddress')}`);
  A('JSG-01.5', '§2.9 item 3', 'exists is NOT an own export (no exists() verb, no shim)', !Object.prototype.hasOwnProperty.call(ns, 'exists'), `own=${Object.prototype.hasOwnProperty.call(ns, 'exists')}`);
  A('JSG-01.6', '§3.5; A74', 'neither dispose nor close is an own export', !('dispose' in ns) && !('close' in ns), `dispose=${'dispose' in ns} close=${'close' in ns}`);
  A('JSG-01.7', '§2.4 item 5 (a)', 'register is NOT an own export of the module namespace', !Object.prototype.hasOwnProperty.call(ns, 'register'), `own=${Object.prototype.hasOwnProperty.call(ns, 'register')}`);
  A('JSG-01.8', '§2.1', 'storeCreate(cfg) returns a non-null object that is neither a function nor an array', i1 !== null && typeof i1 === 'object' && typeof i1 !== 'function' && !Array.isArray(i1), fmt(i1));
  // §2.1's dated clause 1 (a) FIXES THE NEW VALUE AT THIS PASS'S OWN DATE (2026-10-11): the instance's member
  // set is `{ register, on, off }` — THE PRE-SEAM READING, superseded as a member-set figure by the clause below.
  // The OLD value this cell asserted — the exact set `['register']`, "one own member and NOTHING ELSE" —
  // was §2.4 item 5 (a)'s PRE-AMENDMENT declaration, superseded as a member-set figure by that clause;
  // `contract.md §5.5`'s dated clause (clause 5) names THIS cell as one of the two that must move.
  // ⟶ RE-DERIVED 2026-10-15 (THE `A116` ORDERING-SEAM PASS), FROM THE CLAUSES AND FROM NOTHING ELSE: §2.1's
  // dated clause 1 (a) carries the seam's own read-through — "THE INSTANCE'S MEMBER SET IS NOW
  // `{ register, on, off, settle }` — FOUR OWN MEMBERS, AND NOTHING ELSE" — and §2.4 item 9 mints the fourth
  // member, `settle(record) -> undefined`. §2.4 item 5 (a) and §2.7 item 8's citation of the three-member
  // figure are each re-read THROUGH that sentence at their own `§`, so the OLD value this cell asserted —
  // `['off','on','register']` — is the pre-seam reading and is NOT the operative member set. The MODULE
  // NAMESPACE does NOT move with it (§2.1 dated clause 1 (b), read through item 9: "`settle` is NOT a ninth
  // named export — the module namespace stays at the `8` declared verbs"), which `JSG-01.2`/`.15` and the new
  // `JSG-14.2` each keep at eight names.
  // ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): **STALE GREENS DOC**,
  // `RCA-8(g)`. The `['off','on','register','settle']` figure is the `A116` pass's reading; `A127` moves the
  // declared member set `7 → 12` — `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause of
  // 2026-10-16: *"THE OPERATIVE DECLARED MEMBER SET IS `{ read, readLiteral, write, delete, rollback, listen,
  // unlisten, addConstraint, constraintOn, constraintOff, register, settle }` — TWELVE OWN MEMBERS, AND NOTHING
  // ELSE: `10 + 1 + 1 = 12` ✓"*, and *"`on` and `off` ARE MERGED AWAY AND ARE NOT MEMBERS"*. THE CELL'S SUBJECT
  // (the product's exact own member set, set equality, nothing else) IS KEPT WHOLE and the expected value alone
  // is re-derived. `.14` and `.15` remain the cells that assert `on`/`off`'s absence and its reason.
  // ── **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE SET MOVES `13 → 12`, `10 + 1 + 1 = 12` ✓**, on
  // the architect's ruling VERBATIM *"Settle is redundant because the kernel is always in the loop."*
  // (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s clause of that date, whose twelve-name set is
  // `{ read, readLiteral, write, delete, rollback, listen, unlisten, addConstraint, constraintOn, constraintOff,
  // register, constraints }` — **THE TWO REMAINING SINGLES ARE NAMED, `register` FIRST AND `constraints`
  // SECOND**, because item `1` of that clause says *"a lone `+1` would not [compute]"*), read with `§2.12`
  // item 2-bis and with `§2.9` item 1's ONE-name namespace, which is UNMOVED — the read took no
  // module-namespace name, and `settle` was never one.
  // **THE CELL'S SUBJECT IS KEPT WHOLE — the product's exact own member set, by set equality, and NOTHING
  // ELSE — and the expected value alone is re-derived**, exactly as this cell's own `20 → 12` clause above
  // did. `.14` and `.15` remain the cells that assert `on`/`off`'s absence and its reason.
  A('JSG-01.9', '§2.4 item 9 (f)\'s clause of 2026-10-18 (the twelve, `10 + 1 + 1 = 12`, `13 → 12`), read with §2.12 item 2-bis and §2.1\'s `A127` clause', "the store's own member set is exactly the TWELVE declared members ['addConstraint','constraintOff','constraintOn','constraints','delete','listen','read','readLiteral','register','rollback','unlisten','write'] — `10 + 1 + 1 = 12`, and NOTHING ELSE (the superseded readings were four, five, seven, twelve and thirteen own members)", membersAre(formOf(i1), 'addConstraint,constraintOff,constraintOn,constraints,delete,listen,read,readLiteral,register,rollback,unlisten,write'), formOf(i1).members.join(','));
  A('JSG-01.10', '§2.4 item 5', 'the one member is a function', typeof i1.register === 'function', typeof i1.register);
  // ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): **STALE GREENS DOC**,
  // `RCA-8(g)`. The `8 → 1` figure is the `Q1` pass's; `docs/specs/storeroom-js/surface.md §2.9` item 1's
  // `A127` clause of 2026-10-16 moves the module namespace to ONE name and `§2.9`'s removal-versus-deprecation
  // clause of that date names the TEN names removed with no deprecation window — `read` · `readLiteral` ·
  // `write` · `delete` · `rollback` · `listen` · `unlisten` · `addConstraint` · `constraintOn` ·
  // `constraintOff` — so THEIR EXPOSURE AS PRODUCT METHODS IS LAWFUL AND `.11`'s OLD EXPECTATION IS ITSELF THE
  // SUPERSEDED READING. THE CELL'S SUBJECT IS KEPT: which names the product's members are NOT. The store-side
  // non-exposures this cell was written to protect are asserted unchanged — `findAddress` is never exposed
  // (`§2.9` item 1, which `A127` does not move), no `exists` shim exists (`§2.9` item 3), and `storeCreate` is
  // the namespace's name and NOT a member of its own product (`§2.4` item 9 (f)'s `A127` clause).
  A('JSG-01.11', '§2.9 item 1 (findAddress unexposed); §2.9 item 3 (no exists shim); §2.4 item 9 (f)\'s `A127` clause (`storeCreate` is not a member of its own product)', "the store-side non-exposures stand through the product: `findAddress`, `exists`, `dispose`, `close` and `storeCreate` itself are members of NO product, and the ten store-reaching names ARE its methods (`A127`)", [...['findAddress', 'exists', 'dispose', 'close', 'storeCreate']].every((v) => i1[v] === undefined), [...['findAddress', 'exists', 'dispose', 'close', 'storeCreate']].filter((v) => i1[v] !== undefined).join(',') || 'none');
  A('JSG-01.12', 'package.md §1.3 item 4; §3.1 dated clause', 'none of the internal addon\'s five names is an own export of the entry', ['version', 'errorMessage', 'call'].every((v) => !Object.prototype.hasOwnProperty.call(ns, v)), ['version', 'errorMessage', 'call'].filter((v) => v in ns).join(',') || 'none');
  A('JSG-01.13', '§2.6; A73', 'no constraint verb and no repair verb is an own export', !('addConstraint' in ns) && !('repair' in ns) && !('constraint' in ns), ['addConstraint', 'repair', 'constraint'].filter((v) => v in ns).join(',') || 'none');

  // ── ⟶ RE-DERIVED 2026-10-17 (THE `A127` GREENS RE-POINTING PASS, `role_test_writer`): THE TWO MEMBERS THIS
  // BLOCK ONCE NAMED — `on` AND `off` — ARE **MERGED AWAY AND ARE NOT MEMBERS** (`A127`; `§2.4` item 9 (f)'s
  // `A127` clause, verbatim: *"`on` and `off` ARE MERGED AWAY AND ARE NOT MEMBERS"* — the listener
  // registration route is `listen` + `register`, its withdrawal `unlisten`). **THE MIGRATION TO THE OO
  // SURFACE IS AFFORDED HERE AND BY NOTHING ELSE: each cell's SUBJECT, DRIVE and ASSERTION are KEPT and only
  // the SPELLING of the route moves** — `on(__, fn)` → `listen(__)` then `register(handle, fn)`, `off(h)` →
  // `unlisten(h)`; the leading `instance` position is dropped throughout the file by the same pass.
  // **NO CELL OF THIS SCENARIO IS WEAKENED AND NONE IS RETIRED, AND NO EXPECTATION WAS RE-SPELLED TO FIT A
  // MEASUREMENT.** The reds this scenario reports are NOT this pass's spelling changes where their subject is
  // a figure `A127` moved: `.9` (the member-set figure), `.11` (the ten names are now METHOD names) and `.14`
  // (`on`/`off`'s own existence) are SUPERSEEDED-AND-REPORTED below; `.2`/`.3`/`.15` read a MODULE NAMESPACE
  // figure `A127` moved from `8 → 1` (`§2.9` item 1's `A127` clause), reported as measured and owed to the
  // supervisor — the OO migration of the HARNESS changes neither figure and closes none of them.
  A('JSG-01.14', '§2.1\'s dated clause read through A127; §2.4 item 9 (f)\'s `A127` clause; §2.12 item 1\'s twelve-member product (`10 + 1 + 1`)', 'the two members this scenario once found beside `register` are MERGED AWAY by `A127`: `on` and `off` are NOT members of the product, and their route is carried by `listen` + `register` and by `unlisten`', i1.on === undefined && i1.off === undefined, `on:${typeof i1.on} off:${typeof i1.off}`);
  A('JSG-01.15', '§2.1\'s dated clause 1 (b) read through A127; §2.9 item 1\'s `A127` clause; package.md §1.3 item 3', 'neither on nor off is an own named export of the entry: the module namespace stays CLOSED at the `A127` figure, where the ONE remaining name is `storeCreate`', !Object.prototype.hasOwnProperty.call(ns, 'on') && !Object.prototype.hasOwnProperty.call(ns, 'off'), `own on=${Object.prototype.hasOwnProperty.call(ns, 'on')} own off=${Object.prototype.hasOwnProperty.call(ns, 'off')}`);
  const fnOn = () => {};
  const wOn = thrown(() => i1.write(['surf-on'], 'temp', {}));
  const wLs = thrown(() => i1.write(['surf-ls'], 'temp', {}));
  // ⟶ DRIVE RE-DERIVED 2026-10-24 (THE `D-19` CRASH FIX): `listen(handle, addresses)` — the caller spells the
  // handle and the call answers `undefined`, so `onH`/`lsH` below are WHAT `listen` ANSWERED and `H_ON`/`H_LS`
  // are the CALLER'S OWN spelling. NO EXPECTATION MOVES: `.16` still asserts the opaque-return half it always
  // asserted, and reads it off what the code actually returns.
  const H_ON = listenSpelling('g01-surf-on');
  const H_LS = listenSpelling('g01-surf-ls');
  const rOn = wOn.threw ? { threw: true, err: wOn.err } : thrown(() => { const h = i1.listen(H_ON, [['surf-on']]); return i1.register(H_ON, fnOn) === undefined ? h : { bad: 'register did not answer undefined' }; });
  const rLs = wLs.threw ? { threw: true, err: wLs.err } : thrown(() => i1.listen(H_LS, [['surf-ls']]));
  const onH = rOn.threw ? undefined : rOn.value;
  const lsH = rLs.threw ? undefined : rLs.value;
  A('JSG-01.16', '§2.4 item 9 (f)\'s `A127` clause (the route is `listen` + `register`); §2.3 dated clause 1; §2.3 item 2', "the combined route `listen(address)` then `register(handle, listener)` answers the package's OPAQUE handle from `listen` — a non-null object, neither a function nor an array — and it is the SAME output spelling the bare `listen` returns, with `register` answering `undefined`: the two-spelling rule gains NO third", !rOn.threw && onH !== null && typeof onH === 'object' && !Array.isArray(onH) && !rLs.threw && lsH !== null && typeof lsH === 'object' && !Array.isArray(lsH), rOn.threw ? `the combined route threw ${fmt(rOn.err)}` : `register:${fmt(onH)} listen:${rLs.threw ? `listen threw ${fmt(rLs.err)}` : fmt(lsH)}`);
  // ⟶ DRIVE RE-DERIVED 2026-10-24 (THE `D-19` CRASH FIX): the withdrawal is driven over THE CALLER'S OWN
  // HANDLE — which is the in-domain handle the code carries — instead of over an object `listen` no longer
  // returns. The cell's subject (a withdrawal answering `undefined`) is unchanged.
  const rOff = thrown(() => i1.unlisten(H_LS));
  A('JSG-01.17', '§2.4 item 9 (f)\'s `A127` clause (the withdrawal is `unlisten`); parameter-semantics.md §2.8 dated clause', 'unlisten(handle) returns undefined on every success, driven over the in-domain handle `listen` returned', !rOff.threw && rOff.value === undefined, rOff.threw ? `threw ${fmt(rOff.err)}` : fmt(rOff.value));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-02 — THE ROUND TRIP, END TO END, THE BOOT, THE TWO NORMALIZATIONS   18 assertions (16 until 2026-10-16)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const cfg = mk('g02');
  const A2 = ns.storeCreate(cfg);
  const V = { name: 'alpha', flag: true, count: 3, ratio: 0.5, nest: { z: 1, arr: [1, 2, 3] }, list: ['p', { q: false }], '10': 'ten', '2': 'two' };
  const w = thrown(() => A2.write(['rt'], 'file', V));
  A('JSG-02.1', '§2.2; §4.3', 'the file-tier write returns a record and does not throw', !w.threw && w.value !== undefined, w.threw ? `threw ${fmt(w.err)}` : fmt(w.value));
  const r = w.threw ? null : thrown(() => A2.read(['rt']));
  A('JSG-02.2', '§4.3; §5.2 P-IM-1; crossing.md §1.5', 'the read is EQUAL to the written value under §1.5', r && !r.threw && rel(r.value, V), r && r.threw ? `threw ${fmt(r.err)}` : fmt(r && r.value));
  const kv = r && !r.threw && r.value && typeof r.value === 'object' ? Object.keys(r.value).sort() : [];
  A('JSG-02.3', '§1.5 item 1; DD-9', "the read's member key set equals the written key set as SETS (sorted)", kv.join(',') === Object.keys(V).sort().join(','), kv.join(','));
  const arrOk = r && !r.threw && Array.isArray(r.value?.nest?.arr) && r.value.nest.arr.length === 3 && r.value.nest.arr[0] === 1 && r.value.nest.arr[1] === 2 && r.value.nest.arr[2] === 3;
  A('JSG-02.4', '§1.5 item 2; DD-9', 'the nested array is dense, of equal length and equal member-by-member by INDEX', !!arrOk, fmt(r && r.value && r.value.nest && r.value.nest.arr));
  A('JSG-02.5', '§1.5 items 1-2', 'a nested object inside an array keeps its member value (list[1].q === false)', r && !r.threw && r.value?.list?.[1]?.q === false, fmt(r && r.value && r.value.list));
  const r2 = thrown(() => A2.read(['rt']));
  A('JSG-02.6', '§1.1 item 2', 'the returned value is NOT the caller\'s own object', r && !r.threw && r.value !== V, `same=${r && r.value === V}`);
  A('JSG-02.7', '§1.1; §2.2', 'two reads of one address are not the same object (a FRESH JS value each call)', r && r2 && !r.threw && !r2.threw && r.value !== r2.value, `same=${r && r2 && r.value === r2.value}`);
  const rm = thrown(() => { A2.write(['negmem'], 'mem', { neg: -0 }); return A2.read(['negmem']); });
  A('JSG-02.8', '§1.5 item 3; store §7.2 item 7 (c)', 'a mem-tier -0 member reads back Object.is -0', rm && !rm.threw && Object.is(rm.value?.neg, -0), rm && rm.threw ? `threw ${fmt(rm.err)}` : `neg=${fmt(rm && rm.value && rm.value.neg)}`);
  const whole = thrown(() => A2.read([]));
  A('JSG-02.9', 'store §4.1; §4.2 R-5; A25', 'the empty address answers the whole register: an object whose key set contains the written key', whole && !whole.threw && whole.value && typeof whole.value === 'object' && !Array.isArray(whole.value) && Object.prototype.hasOwnProperty.call(whole.value, 'rt'), whole && whole.threw ? `threw ${fmt(whole.err)}` : fmt(whole && whole.value));
  // ⟶ RE-DERIVED 2026-10-16 (THE `DEF-2026-10-16-A` PASS, `role_blind_test_writer`) — THE FIVE CELLS `.10`,
  // `.11`, `.14`, `.15`, `.16`, AND THE TWO ADDED AT `.17`/`.18`. TWO GROUNDS, EACH NAMED BY ITS CLAUSE:
  // (ii) `docs/specs/storeroom-js/surface.md §2.11` CLAUSE 2 — the `file`-tier durable commit is the `settle`
  // seam's TERMINAL ARM's act and *"the verb performs NO FILE I/O on any of its arms"* — so the bare `write`
  // these cells once drove leaves the construction's own ZERO-BYTE image standing, and a boot over it loads
  // NOTHING; (i) `docs/decisions.md` · `A119` (2026-10-16, ACTIVE) — the load-side exemption keys on the FILE'S
  // BYTES, so a zero-byte file BOOTS AN INSTANCE carrying `0` register keys. The PROPERTY the five cells pin (a
  // `file`-tier write is durable and reloads across a boot, and the file image moves the `-0` only) STILL
  // EXISTS on the amended route, so each is RE-POINTED to it — `K-2` + `K-3`, via `kernelSaveFile` — and NOT
  // retired. The two cells the same pass ADDS pin the ruled load-side law the re-pointed drives no longer
  // exercise; no cell of this scenario is retired, so none owes a retirement note.
  const wSave = kernelSaveFile(A2, ['rt'], V); // the terminal arm's own save, driven through the kernel route
  const B = thrown(() => ns.storeCreate(cfg));
  const rb = (B && !B.threw) ? thrown(() => B.value.read(['rt'])) : { threw: true, err: B.err };
  A('JSG-02.10', 'store §7.2 item 6 (the boot) read through surface.md §2.11 clause 2 as amended 2026-10-15 (the save is the terminal arm\'s act) — RE-POINTED 2026-10-16', 'a FRESH instance over the same cfg.filePath re-loads the committed value: the boot read equals the written value under §1.5', rb && !rb.threw && rel(rb.value, V), `${wSave.threw ? `the terminal arm's save FAILED: ${fmt(wSave.err)} ; ` : ''}${rb && rb.threw ? `threw ${fmt(rb.err)}` : fmt(rb && rb.value)}`);
  const kb = rb && !rb.threw && rb.value && typeof rb.value === 'object' ? Object.keys(rb.value).sort() : [];
  A('JSG-02.11', '§1.5 item 1; store §7.2 item 6 — RE-POINTED 2026-10-16 (same ground as `.10`)', "the booted value's member set is the written one", kb.join(',') === Object.keys(V).sort().join(','), kb.join(','));
  const wMem = thrown(() => A2.write(['neg-mem'], 'mem', -0));
  const rMem = wMem.threw ? wMem : thrown(() => A2.read(['neg-mem']));
  A('JSG-02.12', 'store §7.2 item 7 (c)', 'a mem-tier -0 reads back Object.is -0', !rMem.threw && Object.is(rMem.value, -0), rMem.threw ? `threw ${fmt(rMem.err)}` : fmt(rMem.value));
  const wTmp = thrown(() => A2.write(['neg-temp'], 'temp', -0));
  const rTmp = wTmp.threw ? wTmp : thrown(() => A2.read(['neg-temp']));
  A('JSG-02.13', 'store §7.2 item 7 (c)', 'a temp-tier -0 reads back Object.is -0', !rTmp.threw && Object.is(rTmp.value, -0), rTmp.threw ? `threw ${fmt(rTmp.err)}` : fmt(rTmp.value));
  // ⟶ RE-POINTED 2026-10-16 for the same two grounds as `.10`: the `-0` at the `file` tier is committed by
  // the terminal arm (`surface.md §2.11` clause 2) and read back from a boot over the file's own bytes.
  const wFile = kernelSaveFile(A2, ['neg-file'], -0);
  const C = wFile.threw ? { threw: true, err: wFile.err } : thrown(() => ns.storeCreate(cfg));
  const rFile = (C && !C.threw) ? thrown(() => C.value.read(['neg-file'])) : { threw: true, err: C.err };
  A('JSG-02.14', 'store §7.2 item 7 (c); §4.3 exclusion (i) — RE-POINTED 2026-10-16 (surface.md §2.11 clause 2)', 'after a boot the committed -0 reads back as 0 (Object.is 0 is true)', rFile && !rFile.threw && Object.is(rFile.value, 0), rFile && rFile.threw ? `threw ${fmt(rFile.err)}` : fmt(rFile && rFile.value));
  A('JSG-02.15', 'store §7.2 item 7 (c); §4.3 exclusion (i) — RE-POINTED 2026-10-16 (surface.md §2.11 clause 2)', 'and Object.is(v,-0) is false: the ONE declared number normalization', rFile && !rFile.threw && !Object.is(rFile.value, -0), rFile && rFile.threw ? `threw ${fmt(rFile.err)}` : fmt(rFile && rFile.value));
  const rC = (C && !C.threw) ? thrown(() => C.value.read(['rt'])) : { threw: true, err: C.err };
  A('JSG-02.16', 'store §7.2 item 7 (a)-(c); §1.5 — RE-POINTED 2026-10-16 (surface.md §2.11 clause 2)', 'the booted mixed value is still EQUAL to V under §1.5 (the file image moves the -0 only)', rC && !rC.threw && rel(rC.value, V), rC && rC.threw ? `threw ${fmt(rC.err)}` : fmt(rC && rC.value));
  // ⟶ ADDED 2026-10-16 (the `DEF-2026-10-16-A` pass): THE RULED LOAD-SIDE LAW, DRIVEN AT THIS SCENARIO'S OWN
  // FIXTURE. The five re-pointed cells above no longer exercise the input class their reds came from, and the
  // class is the one the defect names: `docs/decisions.md` · `A119` (2026-10-16, ACTIVE) — *"the exemption is
  // the FILE'S EMPTINESS, never the loaded state's smallness"* — ruling `store §7.2` item 6's zero-length clause
  // against `parameter-semantics.md §2.21` with `§8.1` #16. Both halves are driven here, at the file's bytes.
  const zeroCfg = cfgFor('g02zero');
  ns.storeCreate(zeroCfg.c); // the construction's own exclusive create leaves the file at 0 bytes
  const zeroBytes = fs.statSync(zeroCfg.c.filePath).size;
  const zb = thrown(() => ns.storeCreate({ ...zeroCfg.c, constraints: [{ address: ['rt'], id: 'c1' }] }));
  const zbRead = zb.threw ? null : thrown(() => zb.value.read([]));
  A('JSG-02.17', 'A: docs/decisions.md · A119 (2026-10-16); store §7.2 item 6 (the zero-length clause, dated 2026-10-16); surface.md §2.1 (dated: "the loaded state is validated against the supplied list")',
    'a ZERO-BYTE file boots an INSTANCE under a supplied NON-EMPTY list — the exemption keys on the FILE\'s bytes — and its register reads ZERO keys, the file standing at 0 bytes after the boot',
    !zb.threw && zeroBytes === 0 && fs.statSync(zeroCfg.c.filePath).size === 0 && !!zbRead && !zbRead.threw && Object.keys(zbRead.value ?? {}).length === 0,
    `image is ${zeroBytes} bytes ; boot -> ${zb.threw ? fmt(zb.err) : 'INSTANCE'} ; read([]) -> ${zbRead ? (zbRead.threw ? fmt(zbRead.err) : fmt(zbRead.value)) : '-'}`);
  const shortCfg = cfgFor('g02short');
  const shortPath = shortCfg.c.filePath;
  fs.writeFileSync(shortPath, '{}'); // a PRESENT two-byte image: the state is empty, the FILE is not
  const sh = thrown(() => ns.storeCreate({ ...shortCfg.c, constraints: [{ address: ['rt'], id: 'c1' }] }));
  A('JSG-02.18', 'A: docs/decisions.md · A119 (2026-10-16); store §7.1 step 4-bis; §8.1 #16; §7.2 item 6 as amended 2026-10-15',
    'a PRESENT short image whose loaded state satisfies no supplied pair is VALIDATED and refused with ConstraintListInvalid, no instance returned, the image byte-identical',
    sh.threw && sh.err && sh.err.status === 'ConstraintListInvalid' && fs.readFileSync(shortPath, 'utf8') === '{}',
    `${sh.threw ? `${fmt(sh.err.status)} :: ${fmt(sh.err.message)}` : 'AN INSTANCE WAS RETURNED'} ; image=${fmt(fs.readFileSync(shortPath, 'utf8'))}`);
  REDERIVED.push(`JSG-02.10 :: terminal-arm save ${wSave.threw ? `FAILED ${fmt(wSave.err)}` : 'landed'} ; boot read -> ${rb && !rb.threw ? fmt(rb.value) : fmt(rb && rb.err)}`);
  REDERIVED.push(`JSG-02.11 :: booted member set=[${kb.join(',')}]`);
  REDERIVED.push(`JSG-02.14/.15 :: booted 'neg-file' -> ${rFile && !rFile.threw ? fmt(rFile.value) : fmt(rFile && rFile.err)} ; Object.is(v,-0)=${rFile && !rFile.threw ? !Object.is(rFile.value, -0) : 'n/a'}`);
  REDERIVED.push(`JSG-02.16 :: booted 'rt' EQUAL to V under §1.5 = ${rC && !rC.threw ? rel(rC.value, V) : fmt(rC && rC.err)}`);
  REDERIVED.push(`JSG-02.17 :: zero-byte image ${zeroBytes} bytes -> ${zb.threw ? fmt(zb.err) : 'INSTANCE'} ; read([]) -> ${zbRead ? (zbRead.threw ? fmt(zbRead.err) : fmt(zbRead.value)) : '-'}`);
  REDERIVED.push(`JSG-02.18 :: present two-byte {} image -> ${sh.threw ? `${fmt(sh.err.status)} :: ${fmt(sh.err.message)}` : 'AN INSTANCE WAS RETURNED'} ; image=${fmt(fs.readFileSync(shortPath, 'utf8'))}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-03 — THE DEEP-COPY DISCIPLINE, BOTH DIRECTIONS                        5 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i3 = ns.storeCreate(mk('g03'));
  const arg = { a: { b: [1, 2] } };
  const w = thrown(() => i3.write(['cp'], 'temp', arg));
  arg.a.b.push(3);
  arg.x = 'later';
  const r = w.threw ? w : thrown(() => i3.read(['cp']));
  A('JSG-03.1', '§1.1 items 1 & 4; §5.2 S-COPY-IN', 'mutating the argument after the call is invisible: a.b is still [1,2]', !r.threw && rel(r.value?.a?.b, [1, 2]), r.threw ? `threw ${fmt(r.err)}` : fmt(r.value));
  A('JSG-03.2', '§1.1 items 1 & 4', 'a member added to the argument after the call is not in the store', !r.threw && r.value && !Object.prototype.hasOwnProperty.call(r.value, 'x'), r.threw ? `threw ${fmt(r.err)}` : fmt(r.value));
  if (!r.threw && r.value) { r.value.a.b.push(9); r.value.a = 'nope'; }
  const r2 = thrown(() => i3.read(['cp']));
  A('JSG-03.3', '§1.1 items 2-3; §5.2 S-COPY-OUT', 'mutating the read-back does not reach the store: a.b is still [1,2]', !r2.threw && rel(r2.value?.a?.b, [1, 2]), r2.threw ? `threw ${fmt(r2.err)}` : fmt(r2.value));
  A('JSG-03.4', '§1.1 items 2-3', 'a replaced member of the read-back is not the store\'s value', !r2.threw && r2.value?.a && typeof r2.value.a === 'object', r2.threw ? `threw ${fmt(r2.err)}` : fmt(r2.value?.a));
  A('JSG-03.5', '§1.1 item 3; A65', 'the read-back\'s nested object is not the caller\'s own nested object', !r.threw && r.value?.a !== arg.a, `same=${r.value?.a === arg.a}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-04 — THE VALIDATION ORDER AND THE VERBOSE REJECTION                 67 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
const g04 = { caught: [], readAfter: [] };
{
  const i4 = ns.storeCreate(mk('g04'));
  const C4V = '§1.2 rows 4-13; §1.4 items 1-4; §2.5 items 1-3; surface.md §2.5 item 5';
  const refusal = (id, clause, label, makeValue, extra) => {
    const w = thrown(() => i4.write(['v'], 'temp', makeValue()));
    const form = formOf(w.err);
    A(`${id}.i`, clause, `the write of ${label} is REFUSED (a value is thrown)`, w.threw, w.threw ? 'threw' : `returned ${fmt(w.value)}`);
    A(`${id}.ii`, clause, `the status is exactly 'ValueNotAdmitted'`, statusOf(w) === 'ValueNotAdmitted', String(statusOf(w)));
    // ⟶ RE-DERIVED 2026-10-17 (THE FAILURE-FORM OVERRIDE RE-DERIVATION PASS, `role_test_writer`), ON THE
    // ARCHITECT'S RULING *"Override the failure form limit"* READ WITH HIS EARLIER *"Bubble the message log to the
    // client on failure, override any clauses that forbid this."*: THIS CELL'S FORM LIMB WAS THE SUPERSEDED
    // `DD-12` / `Refusal` DECLARATION (*"EXACTLY two members, no third"*), and the AMENDED CLAUSE IS `surface.md
    // §2.5` item 4 (the member set is THREE and FLAT ACROSS ARMS, `log` PRESENT with `[]` where the cause has no
    // attempt — a `write` value refusal mints no attempt, so `[]` is ITS declared value) read with item 9 (`log`
    // an ORDINARY OWN ENUMERABLE DATA MEMBER; `Object.keys(caught)` reads `["log","message","status"]`, length
    // `3`). THE SUBJECT IS KEPT — the ONE form, `status` `ValueNotAdmitted` and a non-empty `message` — and the
    // member-set limb alone moves; the drive, the label and the `[]`-arm's own emptiness are all asserted.
    A(`${id}.iii`, `${clause}; surface.md §2.5 items 4 and 9 (the three-member set, FLAT ACROSS ARMS: \`log\` PRESENT and \`[]\` where the cause has no attempt — this value refusal's own arm)`, 'the ONE form: a plain object, own member set exactly {log, message, status} with `log` an ARRAY — `[]` on this arm — both status and message non-empty strings',
      w.threw && form.obj && form.proto === 'Object.prototype' && formIsThree(form) && logIsEmpty(w.err.log) && typeof w.err.status === 'string' && w.err.status.length > 0 && typeof w.err.message === 'string' && w.err.message.length > 0,
      `members=[${form.members.join(',')}] proto=${form.proto} errorish=${form.errorish} log=${fmt(w.err?.log)} status=${fmt(w.err?.status)}`);
    A(`${id}.iv`, clause, "the message carries the store's own mismatch clause 'is not an admitted value'",
      typeof msgOf(w) === 'string' && msgOf(w).includes('is not an admitted value'), fmt(msgOf(w)));
    if (extra) extra(id, clause, w, label);
    g04.caught.push({ id, label, w });
    const rd = thrown(() => i4.read(['v']));
    g04.readAfter.push({ id, status: statusOf(rd), threw: rd.threw });
  };

  refusal('JSG-04.1', '§1.2 row 10; §1.7 (b) 1; surface.md §2.5 item 6 (a)', 'a bigint (10n)', () => 10n, (id, clause, w) => {
    A(`${id}.v`, clause, "the message carries the failing target's own spelling 10n and not a numeric arm's 0", typeof msgOf(w) === 'string' && msgOf(w).includes('10n'), fmt(msgOf(w)));
  });
  refusal('JSG-04.2', '§1.2 row 9; §1.7 (b) 2; surface.md §2.5 item 6 (a)', 'a Symbol (Symbol())', () => Symbol('s'), (id, clause, w) => {
    A(`${id}.v`, clause, 'the message carries the target spelling Symbol()', typeof msgOf(w) === 'string' && msgOf(w).includes('Symbol()'), fmt(msgOf(w)));
  });
  refusal('JSG-04.3', '§1.4 item 1; DD-8', 'an object with a Symbol-keyed own property', () => ({ [Symbol('k')]: 1 }), null);
  refusal('JSG-04.4', '§1.2 row 4 (f); §1.8 dated clause 4', 'a class instance', () => new (class Foo { constructor() { this.a = 1; } })(), (id, clause, w) => {
    A(`${id}.v`, clause, 'the message carries the class: a prototype-carrying non-plain object', typeof msgOf(w) === 'string' && msgOf(w).includes('prototype-carrying non-plain object'), fmt(msgOf(w)));
  });
  let arraySubclass = null;
  refusal('JSG-04.5', '§1.2 row 5; §1.7 (b) 3', 'a class extending Array', () => { arraySubclass = new (class V extends Array {})(); arraySubclass.push(1); return arraySubclass; }, null);
  refusal('JSG-04.6', '§1.4 item 2; DD-8', 'a sparse array [1,,3]', () => [1, , 3], null);
  refusal('JSG-04.7', '§1.4 item 3; §1.2 row 7', 'an {a: undefined} member', () => ({ a: undefined }), null);
  refusal('JSG-04.8', '§1.4 item 4 (g); DD-34', 'a Proxy over a plain object', () => new Proxy({ a: 1 }, {}), null);
  refusal('JSG-04.9', '§1.4 item 4 (c)', 'an object with an own accessor property', () => ({ get a() { return 1; } }), null);
  refusal('JSG-04.10', '§1.2 rows 4/13', 'a Map', () => new Map([['a', 1]]), null);
  refusal('JSG-04.11', '§1.2 row 13', 'a Date', () => new Date(0), null);
  refusal('JSG-04.12', '§1.2 row 8', 'a function', () => (() => 1), null);
  refusal('JSG-04.13', '§1.2 row 11 (NonFinite)', 'NaN', () => NaN, null);
  refusal('JSG-04.14', '§1.2 row 12; §1.4 item 6; DD-11', 'a cycle', () => { const c = { n: 1 }; c.self = c; return c; }, null);

  const clean = g04.readAfter.filter((x) => x.status === 'AddressNotFound').length;
  A('JSG-04.15', "§1.2's closing clause", `after EVERY refusal, read(['v']) answers AddressNotFound (no node minted, no anchor installed, no container changed, no journal entry appended)`,
    clean === 14, `${clean}/14 answered AddressNotFound; statuses=${g04.readAfter.map((x) => x.status).join(',')}`);
  const errorish = g04.caught.filter((x) => formOf(x.w.err).errorish).length;
  const badForm = g04.caught.filter((x) => !formIsThree(formOf(x.w.err)) || !logIsDeclared(x.w.err?.log)).length;
  // ⟶ RE-DERIVED 2026-10-17 (THE FAILURE-FORM OVERRIDE RE-DERIVATION PASS, `role_test_writer`): the *"exactly
  // {message, status}"* limb is the SUPERSEDED `DD-12`/`Refusal` limit; `surface.md §2.5` item 4 makes the set
  // THREE and item 9 makes `log` a member a census can see. `.16`'s SUBJECT IS KEPT WHOLE — not one refusal is an
  // `Error` instance (no raw host error is a rejection), which is `item 5 (e)` and `A76`'s reach clause — and the
  // form limb alone moves, now also asserting item 9's *"never a non-array"*.
  A('JSG-04.16', "surface.md §2.5 item 5 (e) and item 9; A76's reach clause; the Architect's *\"Override the failure form limit\"*", 'not one refusal is an Error instance, and every thrown value has exactly {log, message, status} with `log` an ARRAY (no raw host error is a rejection)',
    errorish === 0 && badForm === 0, `errorish=${errorish} wrongForm=${badForm} of 14; members=${g04.caught.map((x) => `[${formOf(x.w.err).members.join(',')}]`).join(' ')}`);
  A('JSG-04.17', '§1.7 (a); §1.7 (b) 3 dated clause', 'Array.isArray is TRUE for the Array subclass and the value is nonetheless refused: the class decision is not short-circuited by a shape test',
    Array.isArray(arraySubclass) === true && statusOf(g04.caught.find((x) => x.id === 'JSG-04.5')?.w ?? {}) === 'ValueNotAdmitted',
    `Array.isArray=${Array.isArray(arraySubclass)} status=${statusOf(g04.caught.find((x) => x.id === 'JSG-04.5')?.w ?? {})}`);
  const addrSub = thrown(() => i4.read(new (class V extends Array {})()));
  A('JSG-04.18', '§1.7 (b) 3; §1.3 AddressArg row 11; §1.8 dated clause', 'a class extending Array at the ADDRESS position answers AddressMalformed (the code moves with the position)',
    statusOf(addrSub) === 'AddressMalformed', String(statusOf(addrSub)));
  const addrProxy = thrown(() => i4.read(new Proxy(['a'], {})));
  A('JSG-04.19', '§1.3 AddressArg row 12; DD-34', 'a Proxy over an array at the ADDRESS position answers AddressMalformed',
    statusOf(addrProxy) === 'AddressMalformed', String(statusOf(addrProxy)));
  const addrStr = thrown(() => i4.read('a.b'));
  A('JSG-04.20', '§1.3 AddressArg row 6', "a bare string address answers AddressMalformed ('a.b' is not a delimited address)",
    statusOf(addrStr) === 'AddressMalformed', String(statusOf(addrStr)));
  const dir = cfgFor('g04c').dir;
  const badCfg = new (class Cfg {
    constructor() { this.filePath = path.join(dir, 'x.json'); this.listeners = []; }
    get journalLength() { return 2; }
  })();
  const cr = thrown(() => ns.storeCreate(badCfg));
  A('JSG-04.21', '§1.7 (b) 4; §1.8 dated clause 4; parameter-semantics.md §2.1', 'a cfg that is a class instance (a prototype getter carries journalLength) answers AddressMalformed',
    statusOf(cr) === 'AddressMalformed', String(statusOf(cr)));
  A('JSG-04.22', '§1.8 dated clause 4', 'and that refusal\'s message carries the class (a cfg whose message does not carry its class is a FINDING)',
    typeof msgOf(cr) === 'string' && msgOf(cr).includes('prototype-carrying non-plain object'), fmt(msgOf(cr)));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-05 — THE ABSENT-VERSUS-undefined READING                             14 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const cfgA = mk('g05a');
  const A5 = thrown(() => ns.storeCreate(cfgA));
  A('JSG-05.1', '§2.1; §1.3 JournalLengthArg row 1', 'the legal cfg with a real filePath, journalLength 1 and an empty listeners array returns an instance',
    !A5.threw && A5.value != null, A5.threw ? `threw ${fmt(A5.err)}` : 'instance');
  const i5 = A5.value ?? { read: () => { throw new Error('no instance'); }, write: () => { throw new Error('no instance'); }, delete: () => { throw new Error('no instance'); } };
  thrown(() => i5.write(['ab'], 'mem', 1));
  const rAbsent = thrown(() => i5.read(['ab']));
  A('JSG-05.2', "crossing.md §1.3 dated rule 1; §1.3 TierArg row 3", 'an UNSET trailing tier on read is the absent state and is IN DOMAIN: the read succeeds and answers 1',
    !rAbsent.threw && rAbsent.value === 1, rAbsent.threw ? `threw ${fmt(rAbsent.err)}` : fmt(rAbsent.value));
  // ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): **STALE GREENS DOC**,
  // `RCA-8(g)`, ON THE `PAR-JS-6` ADJUDICATION MADE IN WRITING AT TWO HOMES: `docs/specs/storeroom-js/
  // parameter-semantics.md §2.6` (*"`a.read(address, undefined)` IS A SUPPLIED VALUE AT THIS POSITION AND TAKES
  // `PAR-JS-6`'s DECLARED ANSWER — the store's own thrown `{status, message}` with `status` `AddressMalformed`
  // — while THE ONE CALL THAT FOLDS TO THE ABSENT ROW IS `a.read(address)`"*) and `docs/specs/storeroom-js/
  // acceptance.md §4.1` item 7's own dated clause (the same reading, with the reason: *"`PAR-JS-6` is the
  // OPERATIVE DECLARATION of this parameter's domain and of its outside values … where the two answer one call
  // differently the inventory is read through the parameter row and never the row through the inventory"*).
  // THE CELL'S SUBJECT IS KEPT — the supplied `undefined` at the `tier` position, driven as a SUPPLIED value —
  // and the expectation alone is re-derived: the THREE STATES `a.read(a)` / `a.read(a, undefined)` /
  // `a.read(a, null)` stand as three states, and `.2` above is the one that drives the ABSENT row.
  const rUndef = thrown(() => i5.read(['ab'], undefined));
  // ⟶ RE-DERIVED 2026-10-17 (THE FAILURE-FORM OVERRIDE RE-DERIVATION PASS, `role_test_writer`): THE MEMBER-SET
  // LIMB ALONE MOVES — the {message, status} figure is the superseded `DD-12`/`Refusal` limit — and the cell now
  // derives it from `surface.md §2.5` item 4 read with item 9: THREE members, `log` PRESENT as an ARRAY. `A SUPPLIED
  // undefined` mints NO attempt, and item 4 names *"a `read`/`readLiteral`/`delete`/`rollback` store refusal with no
  // attempt live"* BY NAME among its `log: []` arms, so `[]` is this arm's declared value. THE SUBJECT IS KEPT WHOLE:
  // a SUPPLIED `undefined` is PRESENT and is not the absent row, and the answer is the store's own AddressMalformed;
  // its `PAR-JS-6` authority is unmoved.
  A('JSG-05.3', 'parameter-semantics.md §2.6 (`PAR-JS-6`), adjudicated 2026-10-16 and carried at acceptance.md §4.1 item 7\'s dated clause; surface.md §2.5 item 4 (a `read` refusal with NO attempt live is a `log: []` arm) and item 9', 'a SUPPLIED undefined at the tier position is PRESENT and is not the absent row: the call answers the store\'s own thrown {log, message, status} — `log` an ARRAY, `[]` on this no-attempt arm — with status AddressMalformed (only the OMITTED call, .2 above, folds to the absent row)',
    rUndef.threw && statusOf(rUndef) === 'AddressMalformed'
      && formOf(rUndef.err).obj && formOf(rUndef.err).proto === 'Object.prototype' && formIsThree(formOf(rUndef.err)) && logIsEmpty(rUndef.err.log)
      && typeof rUndef.err.message === 'string' && rUndef.err.message.length > 0,
    rUndef.threw ? `${fmt(rUndef.err)} form={${formOf(rUndef.err).members.join(',')}} log=${fmt(rUndef.err.log)}` : `did not throw: ${fmt(rUndef.value)}`);
  const rNull = thrown(() => i5.read(['ab'], null));
  A('JSG-05.4', '§1.3 TierArg row 4', 'read(i,a,null) is PRESENT and its shape is not a tier\'s: AddressMalformed',
    statusOf(rNull) === 'AddressMalformed', String(statusOf(rNull)));
  const rEmpty = thrown(() => i5.read(['ab'], []));
  A('JSG-05.5', 'store-model.md §2.3 zero-tier bullet; §1.3 TierArg row 2', 'a 0-token set is the zero-tier arm: the read succeeds and answers 1 (the lowest-persistence selection)',
    !rEmpty.threw && rEmpty.value === 1, rEmpty.threw ? `threw ${fmt(rEmpty.err)}` : fmt(rEmpty.value));
  thrown(() => i5.write(['abt'], 'mem', 1));
  const dAbsent = thrown(() => i5.delete(['abt']));
  A('JSG-05.6', '§1.3 TierArg row 3 (delete); store §4.4 D-2', "delete with the tier position UNSET succeeds and its receipt's tiers is ['mem']",
    !dAbsent.threw && Array.isArray(dAbsent.value?.tiers) && dAbsent.value.tiers.join(',') === 'mem', dAbsent.threw ? `threw ${fmt(dAbsent.err)}` : fmt(dAbsent.value));
  const wNoTier = thrown(() => i5.write(['x']));
  A('JSG-05.7', '§1.3 TierArg row 3 (write); write-and-read.md §3.4 F-1', 'a write with the tier position UNSET answers AddressMalformed (a required argument is missing)',
    statusOf(wNoTier) === 'AddressMalformed', String(statusOf(wNoTier)));
  const noPath = thrown(() => ns.storeCreate({ journalLength: 1, listeners: [] }));
  A('JSG-05.8', '§1.3 FilePathArg row 2', 'an ABSENT filePath key is IN DOMAIN: an instance IS returned',
    !noPath.threw && noPath.value != null, noPath.threw ? `threw ${fmt(noPath.err)}` : 'instance');
  const fileAtRegister = noPath.threw ? { threw: true } : thrown(() => noPath.value.write(['x2'], 'file', 1));
  A('JSG-05.9', 'store-model.md §1.6 item 4 (d)(ii); §8.1 #6', 'on a mem-register store a file-tier write at a register key answers ParentAnchorMonotonicityViolation',
    statusOf(fileAtRegister) === 'ParentAnchorMonotonicityViolation', String(statusOf(fileAtRegister)));
  const pathUndef = thrown(() => ns.storeCreate({ filePath: undefined, journalLength: 1, listeners: [] }));
  A('JSG-05.10', '§1.3 FilePathArg row 3; crossing.md §1.3 dated rule 2', 'a filePath key PRESENT carrying undefined answers AddressMalformed',
    statusOf(pathUndef) === 'AddressMalformed', String(statusOf(pathUndef)));
  const jlAbsent = thrown(() => ns.storeCreate({ filePath: mk('g05b').filePath, listeners: [] }));
  A('JSG-05.11', '§1.3 JournalLengthArg row 2; store §8.1 #12 reconciled', 'an ABSENT journalLength answers ConstructionArgumentMissing (the ONE absence the amended construction still refuses)',
    statusOf(jlAbsent) === 'ConstructionArgumentMissing', String(statusOf(jlAbsent)));
  const jlUndef = thrown(() => ns.storeCreate({ filePath: mk('g05c').filePath, journalLength: undefined, listeners: [] }));
  A('JSG-05.12', '§1.3 JournalLengthArg row 9; crossing.md §1.3 dated rule 2', 'a journalLength key PRESENT carrying undefined answers AddressMalformed (the two states are told apart by their ANSWER)',
    statusOf(jlUndef) === 'AddressMalformed', String(statusOf(jlUndef)));
  const lsAbsent = thrown(() => ns.storeCreate({ filePath: mk('g05d').filePath, journalLength: 1 }));
  A('JSG-05.13', '§1.3 ListenersArg row 5', 'an ABSENT listeners key answers AddressMalformed (the ONE absence the construction does not admit)',
    statusOf(lsAbsent) === 'AddressMalformed', String(statusOf(lsAbsent)));
  const lsUndef = thrown(() => ns.storeCreate({ filePath: mk('g05e').filePath, journalLength: 1, listeners: undefined }));
  A('JSG-05.14', '§1.3 ListenersArg row 5', 'a listeners key PRESENT carrying undefined answers AddressMalformed (the same ANSWER, still TWO states)',
    statusOf(lsUndef) === 'AddressMalformed', String(statusOf(lsUndef)));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-06 — THE CEILING'S ARMS AND THE ANCESTOR-STACK GUARD                  7 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i6 = ns.storeCreate(mk('g06'));
  const nest = (k) => { let v = [0]; for (let n = 1; n < k; n += 1) v = [v]; return v; };
  const w63 = thrown(() => i6.write(['d63'], 'temp', nest(63)));
  const r63 = w63.threw ? w63 : thrown(() => i6.read(['d63']));
  A('JSG-06.1', 'crossing.md §1.4 item 5 dated two-arm table', 'a value of nesting depth 63 is ADMITTED: the write succeeds and the value round-trips',
    !w63.threw && !r63.threw && rel(r63.value, nest(63)), w63.threw ? `threw ${fmt(w63.err)}` : `roundtrip=${!r63.threw && rel(r63.value, nest(63))}`);
  const w64 = thrown(() => i6.write(['d64'], 'temp', nest(64)));
  const r64 = w64.threw ? w64 : thrown(() => i6.read(['d64']));
  A('JSG-06.2', 'crossing.md §1.4 item 5 dated two-arm table', 'a value of nesting depth 64 is ADMITTED: the write succeeds and the value round-trips',
    !w64.threw && !r64.threw && rel(r64.value, nest(64)), w64.threw ? `threw ${fmt(w64.err)}` : `roundtrip=${!r64.threw && rel(r64.value, nest(64))}`);
  const w65 = thrown(() => i6.write(['d65'], 'temp', nest(65)));
  A('JSG-06.3', 'crossing.md §1.4 item 5 dated two-arm table; DD-10', 'a value of nesting depth 65 is REFUSED ValueNotAdmitted (the conversion core\'s own bound)',
    statusOf(w65) === 'ValueNotAdmitted', w65.threw ? String(statusOf(w65)) : `returned ${fmt(w65.value)}`);
  const w66 = thrown(() => i6.write(['d66'], 'temp', nest(66)));
  A('JSG-06.4', 'crossing.md §1.4 item 5 dated two-arm table; DD-10', 'a value of nesting depth 66 is REFUSED ValueNotAdmitted (the boundary encoder\'s own bound)',
    statusOf(w66) === 'ValueNotAdmitted', w66.threw ? String(statusOf(w66)) : `returned ${fmt(w66.value)}`);
  const f65 = formOf(w65.err);
  // ⟶ RE-DERIVED 2026-10-17 (THE FAILURE-FORM OVERRIDE RE-DERIVATION PASS, `role_test_writer`): the *"exactly
  // {message, status}"* limb is the SUPERSEDED `DD-12`/`Refusal` limit; re-derived to `surface.md §2.5` item 4 read
  // with item 9 — THREE members, `log` an ARRAY, and `[]` because a depth refusal mints NO attempt. The subject and
  // the `ValueNotAdmitted` code limb are unmoved.
  A('JSG-06.5', '§2.5 items 1-3 and item 4 (no attempt on this arm, so `log: []`) and item 9; §1.7 (d); the Architect\'s *"Override the failure form limit"*', 'the 65 refusal carries the ONE form: a plain object whose member set is exactly {log, message, status} with `log` an ARRAY (`[]` here), status ValueNotAdmitted, message non-empty',
    w65.threw && f65.obj && f65.proto === 'Object.prototype' && formIsThree(f65) && logIsEmpty(w65.err.log) && w65.err.status === 'ValueNotAdmitted' && typeof w65.err.message === 'string' && w65.err.message.length > 0,
    `members=[${f65.members.join(',')}] proto=${f65.proto} log=${fmt(w65.err?.log)} status=${fmt(w65.err?.status)}`);
  const f66 = formOf(w66.err);
  // ⟶ RE-DERIVED 2026-10-17 — the same clause pair as `.5`'s (`surface.md §2.5` items 4 and 9). `.6`'s SUBJECT is
  // that the two depth arms answer ONE answer; both limbs of that subject stand (the form and the code), and the
  // form limb is now the three-member one. `membersOf` (the file's own duplicate at `:589`) is left as it stands and
  // is not used here: the form check is the shared `formIsThree`, so no third spelling of the set can drift.
  A('JSG-06.6', '§2.5 items 1-3 and item 4 (`log: []`, no attempt on this arm) and item 9; §1.7 (d); the Architect\'s *"Override the failure form limit"*', 'the 66 refusal carries the SAME form and the SAME code — the two arms answer ONE answer',
    w66.threw && f66.obj && formIsThree(f66) && logIsEmpty(w66.err.log) && w66.err.status === 'ValueNotAdmitted' && typeof w66.err.message === 'string' && w66.err.message.length > 0,
    `members=[${f66.members.join(',')}] proto=${f66.proto} log=${fmt(w66.err?.log)} status=${fmt(w66.err?.status)}`);
  const d = { n: 1 };
  const wDia = thrown(() => i6.write(['dia'], 'temp', { x: d, y: d }));
  const rDia = wDia.threw ? wDia : thrown(() => i6.read(['dia']));
  A('JSG-06.7', '§1.4 item 6; DD-11', 'a DIAMOND (one value reachable by two paths but acyclic) is ADMITTED and round-trips: the guard is the walk\'s own ancestor stack, never a WeakSet of visited objects',
    !wDia.threw && !rDia.threw && rel(rDia.value, { x: { n: 1 }, y: { n: 1 } }), wDia.threw ? `threw ${fmt(wDia.err)}` : fmt(rDia.value));
}
function membersOf(r, want) { return r.members.join(',') === want; }

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-07 — THE TIERS AND THE PURGE, AND THE DELETE'S OWN TIER SCOPE        15 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i7 = ns.storeCreate(mk('g07'));
  thrown(() => i7.write(['p'], 'file', 100));
  const q1 = thrown(() => i7.read(['p']));
  A('JSG-07.1', 'store §4.1; R-1', 'the only version at the key answers 100', !q1.threw && q1.value === 100, q1.threw ? `threw ${fmt(q1.err)}` : fmt(q1.value));
  thrown(() => i7.write(['p'], 'temp', 1));
  const q2 = thrown(() => i7.read(['p']));
  A('JSG-07.2', 'store-model.md §2.3 zero-tier arm; store §5.3 item 2; A11', 'after a LESS persistent write the unqualified read selects the SHADOW: 1',
    !q2.threw && q2.value === 1, q2.threw ? `threw ${fmt(q2.err)}` : fmt(q2.value));
  const q3 = thrown(() => i7.read(['p'], 'file'));
  A('JSG-07.3', 'write-and-read.md §3.4 W-5', 'the shadowed more-persistent version SURVIVES: the file-tier read answers 100',
    !q3.threw && q3.value === 100, q3.threw ? `threw ${fmt(q3.err)}` : fmt(q3.value));
  const q4 = thrown(() => i7.read(['p'], 'temp'));
  A('JSG-07.4', '§2.2; store §4.2 R-4', 'the temp-tier read answers 1', !q4.threw && q4.value === 1, q4.threw ? `threw ${fmt(q4.err)}` : fmt(q4.value));
  thrown(() => i7.write(['p'], 'mem', 2));
  const q5 = thrown(() => i7.read(['p']));
  A('JSG-07.5', 'store §5.4 purge chain; write-and-read.md §3.4 W-6', 'the mem write purged the temp version (rank <= 1): the unqualified read answers 2',
    !q5.threw && q5.value === 2, q5.threw ? `threw ${fmt(q5.err)}` : fmt(q5.value));
  const q6 = thrown(() => i7.read(['p'], 'file'));
  A('JSG-07.6', "store §5.4 purge chain column (file left standing, rank 2 > 1)", 'the file version stands: 100', !q6.threw && q6.value === 100, q6.threw ? `threw ${fmt(q6.err)}` : fmt(q6.value));
  const q7 = thrown(() => i7.read(['p'], 'temp'));
  A('JSG-07.7', 'store-model.md §2.3; store §8.1 #4', 'the temp version is gone: the key exists and the tier does not — TierNotFound', statusOf(q7) === 'TierNotFound', String(statusOf(q7)));
  thrown(() => i7.write(['p'], 'file', 300));
  const q8 = thrown(() => i7.read(['p']));
  A('JSG-07.8', 'store §5.4 purge chain; W-6', 'the file write purged file, mem and temp (rank <= 2): the unqualified read answers 300',
    !q8.threw && q8.value === 300, q8.threw ? `threw ${fmt(q8.err)}` : fmt(q8.value));
  const q9 = thrown(() => i7.read(['p'], 'mem'));
  A('JSG-07.9', 'store §5.4 purge chain; §8.1 #4', 'no mem version stands: TierNotFound', statusOf(q9) === 'TierNotFound', String(statusOf(q9)));
  i7.write(['set'], 'file', 8);
  i7.write(['set'], 'temp', 7);
  const q10 = thrown(() => i7.read(['set'], ['file', 'temp']));
  A('JSG-07.10', 'store-model.md §2.3; store §4.2 R-4; DD-37', 'a tier-qualified SET read answers the lowest-persistence member of the matched subset: 7',
    !q10.threw && q10.value === 7, q10.threw ? `threw ${fmt(q10.err)}` : fmt(q10.value));
  const q11 = thrown(() => i7.read(['set'], ['temp', 'temp']));
  A('JSG-07.11', '§1.3 TierArg row 2', 'duplicates in the set are in domain and change nothing: the same answer 7',
    !q11.threw && q11.value === 7, q11.threw ? `threw ${fmt(q11.err)}` : fmt(q11.value));
  const wArr = thrown(() => i7.write(['pa'], ['temp'], [1]));
  A('JSG-07.12', '§1.3 TierArg row 2; §5.4 P-SM-4', 'an ARRAY tier on a WRITE answers OutOfDomainTier (the array spelling is the reader\'s arity)',
    statusOf(wArr) === 'OutOfDomainTier', String(statusOf(wArr)));
  thrown(() => i7.write(['d1'], 'file', 2));
  thrown(() => i7.write(['d1'], 'temp', 1));
  const d1 = thrown(() => i7.delete(['d1'], 'temp'));
  const d1r = d1.threw ? d1 : thrown(() => i7.read(['d1']));
  A('JSG-07.13', 'store §4.4 D-1; §4.3', "a one-tier delete removes only the named tier's version: tiers is ['temp'] and the file version still reads 2",
    !d1.threw && d1.value.tiers.join(',') === 'temp' && !d1r.threw && d1r.value === 2,
    d1.threw ? `threw ${fmt(d1.err)}` : `tiers=[${d1.value.tiers}] read=${fmt(d1r.value)}`);
  const d2 = thrown(() => i7.delete(['d1']));
  const d2r = d2.threw ? d2 : thrown(() => i7.read(['d1']));
  A('JSG-07.14', 'store §4.4 D-2', "an unqualified delete removes every version: tiers is ['file'] and the address no longer resolves",
    !d2.threw && d2.value.tiers.join(',') === 'file' && statusOf(d2r) === 'AddressNotFound',
    d2.threw ? `threw ${fmt(d2.err)}` : `tiers=[${d2.value.tiers}] read.status=${statusOf(d2r)}`);
  thrown(() => i7.write(['d3'], 'mem', 1));
  const d3 = thrown(() => i7.delete(['d3'], 'file'));
  A('JSG-07.15', 'store §4.4 D-3; DD-9', "a delete at a tier the target does not hold is a SUCCESS carrying tiers: [] and no code is produced",
    !d3.threw && Array.isArray(d3.value.tiers) && d3.value.tiers.length === 0, d3.threw ? `threw ${fmt(d3.err)}` : fmt(d3.value));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-08 — THE HANDLE AND THE TRIGGERED IDS                               22 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i8 = ns.storeCreate(mk('g08'));
  // A listener binds to an ADDRESS, and a write that fails its walk fires NOTHING, so the addressed branch
  // is minted before the listener is registered there (a DRIVING step, named in the run's record).
  i8.write(['ev'], 'temp', {});
  // ⟶ DRIVE RE-DERIVED 2026-10-24 (THE `D-19` CRASH FIX — THIS IS THE CALL THAT KILLED THE RUN): the handle is
  // SPELLED by the drive and passed at position `1`, the address travels as the one-member SET position `2`
  // takes, and `h1` is WHAT `listen` ANSWERED. `.1`–`.3` read that answer and stay RED on the code as it now
  // stands, because nothing is minted and the answer is `undefined` — their subject is gone and they are
  // reported rather than retired. `.4`–`.22` read the handle the CALLER spelled, which is the same identity.
  const H1 = listenSpelling('g08-ev');
  const h1 = i8.listen(H1, [['ev']]);
  A('JSG-08.1', '§2.3 item 2; DD-14', "listen returns an opaque JS value and NOT a string", typeof h1 === 'object' && h1 !== null && typeof h1 !== 'string', `${typeof h1} ${fmt(h1)}`);
  A('JSG-08.2', '§2.3 item 2; DD-28', 'the token is PRIVATE: no own enumerable member carries it', typeof h1 === 'object' && h1 !== null && Object.keys(h1).length === 0, `${fmt(h1)} keys=${typeof h1 === 'object' && h1 !== null ? Object.keys(h1).join(',') || 'none' : 'n/a'}`);
  const spelled = `${String(h1)}|${(() => { try { return JSON.stringify(h1); } catch { return ''; } })()}`;
  A('JSG-08.3', '§2.3 item 3 (ii); DD-28', 'neither String() nor JSON.stringify() spells a token (no listener- fragment)', typeof h1 === 'object' && h1 !== null && !spelled.includes('listener-'), spelled.slice(0, 120));
  const calls = [];
  const fn = (...args) => { calls.push(args); };
  const reg1 = thrown(() => i8.register(H1, fn));
  A('JSG-08.4', '§2.4 item 5 (b)', 'register(handle, listener) returns undefined on success', !reg1.threw && reg1.value === undefined, reg1.threw ? `threw ${fmt(reg1.err)}` : fmt(reg1.value));
  const w1 = thrown(() => i8.write(['ev', 'child'], 'temp', 5));
  const trig1 = w1.threw ? [] : w1.value?.triggered;
  A('JSG-08.5', '§2.7 item 1; §2.4 item 6 (a); A77', "the record's triggered carries the id REGISTRATION was given (the caller's handle)", carriesHandle(trig1, H1), fmt(trig1));
  A('JSG-08.6', '§2.4 rule 3 and item 6 (b)', 'the registered function is invoked exactly ONCE for that write', calls.length === 1, `calls=${calls.length}`);
  const arg1 = calls[0];
  A('JSG-08.7', '§2.7 item 5', "the invocation's arguments.length is exactly 1", !!arg1 && arg1.length === 1, arg1 ? `${arg1.length}` : 'not invoked');
  A('JSG-08.8', '§2.7 item 5; parameter-semantics.md §2.12 dated producer clause', "the single argument is the TRIGGERING ADDRESS ['ev','child'], index-equal",
    !!arg1 && rel(arg1[0], ['ev', 'child']), arg1 ? fmt(arg1[0]) : 'not invoked');
  A('JSG-08.9', 'surface.md §2.4 item 6 (d); parameter-semantics.md §2.15 dated clause', 'the argument is NOT the id that selected the function', !!arg1 && arg1[0] !== H1, arg1 ? `same=${arg1[0] === H1}` : 'not invoked');
  const w2 = thrown(() => i8.write(['ev', 'child2'], 'temp', 6));
  A('JSG-08.10', '§2.3 item 5; store §6.5 item 3', 'the prefix test is descendant-inclusive: a write at a DESCENDANT address triggers the listener bound at ["ev"]',
    !w2.threw && carriesHandle(w2.value?.triggered, H1), w2.threw ? `threw ${fmt(w2.err)}` : fmt(w2.value?.triggered));
  const H2 = listenSpelling('g08-no');
  i8.listen(H2, [['no']]);
  i8.write(['no'], 'temp', {});
  const before = calls.length;
  const logged = [];
  const orig = { log: console.log, warn: console.warn, error: console.error, info: console.info, debug: console.debug };
  console.log = (...a) => logged.push(['log', ...a]); console.warn = (...a) => logged.push(['warn', ...a]);
  console.error = (...a) => logged.push(['error', ...a]); console.info = (...a) => logged.push(['info', ...a]); console.debug = (...a) => logged.push(['debug', ...a]);
  let w3 = null;
  try { w3 = thrown(() => i8.write(['no', 'x'], 'temp', 4)); } finally {
    console.log = orig.log; console.warn = orig.warn; console.error = orig.error; console.info = orig.info; console.debug = orig.debug;
  }
  A('JSG-08.11', 'store §6.5 item 10 (c)', "an id the package holds no function for is still returned in triggered", !w3.threw && carriesHandle(w3.value?.triggered, H2), w3.threw ? `threw ${fmt(w3.err)}` : fmt(w3.value?.triggered));
  A('JSG-08.12', '§2.4 rule 1; surface.md §2.4 item 6 (c)', 'an unregistered handle invokes NOTHING: the call count is unchanged', calls.length === before, `calls ${before} -> ${calls.length}`);
  A('JSG-08.13', '§2.4 rule 1; surface.md §2.4 item 6 (c)', 'and reports NOTHING: no console output of any level', logged.length === 0, fmt(logged.map((l) => l[0])));
  A('JSG-08.14', 'surface.md §2.4 item 6 (c)', 'and the write neither throws nor answers a code: the silence is an assertable observable', !w3.threw, w3.threw ? `threw ${fmt(w3.err)}` : 'no throw');
  const un1 = thrown(() => i8.unlisten(H1));
  A('JSG-08.15', '§2.10', 'unlisten returns undefined', !un1.threw && un1.value === undefined, un1.threw ? `threw ${fmt(un1.err)}` : fmt(un1.value));
  const afterUn = calls.length;
  const w4 = thrown(() => i8.write(['ev', 'child3'], 'temp', 3));
  A('JSG-08.16', '§2.4 rule 4; §2.3 item 6', "after unlisten the store-side home entry is gone: the record's triggered no longer contains the caller's handle",
    !w4.threw && !carriesHandle(w4.value?.triggered, H1), w4.threw ? `threw ${fmt(w4.err)}` : fmt(w4.value?.triggered));
  A('JSG-08.17', '§2.4 rule 4; DD-15', 'and the function never fires again: the call count is unchanged', calls.length === afterUn, `calls ${afterUn} -> ${calls.length}`);
  i8.write(['keep'], 'temp', {});
  // ⟶ THE TWO REPEAT-LISTEN CELLS (`.18`, `.20`) READ WHAT `listen` ANSWERS, WHICH IS `undefined` NOW: their
  // subject is the MINTED opaque handle and it is gone. THEY STAY RED — and each carries the object
  // precondition its own words state ("the SAME opaque value", "MINTS A FRESH handle"), so neither can pass on
  // `undefined === undefined`.
  const H_KEEP = listenSpelling('g08-keep');
  const ka = i8.listen(H_KEEP, [['keep']]);
  const kb = i8.listen(H_KEEP, [['keep']]);
  A('JSG-08.18', '§2.3 item 6 (the STILL-REGISTERED arm); surface.md §2.3 dated pointer', 'a repeat listen at an ALREADY-REGISTERED address mints nothing and returns the SAME opaque value',
    typeof ka === 'object' && ka !== null && ka === kb, `same=${ka === kb} ka=${fmt(ka)}`);
  const w5 = thrown(() => i8.write(['keep', 'x'], 'temp', 2));
  const distinct5 = w5.threw ? [] : distinctHandles(w5.value.triggered);
  A('JSG-08.19', 'store §6.5 item 2; §2.4 rule 3', "the record's DISTINCT-handle set for that address has ONE member", distinct5.length === 1, `${distinct5.length} distinct of [${fmt(w5.value?.triggered)}]`);
  i8.write(['wit'], 'temp', {});
  const H_WIT = listenSpelling('g08-wit');
  const wa = i8.listen(H_WIT, [['wit']]);
  i8.unlisten(H_WIT);
  const wb = i8.listen(H_WIT, [['wit']]);
  A('JSG-08.20', '§2.3 item 6 (the WITHDRAWN arm)', 'after the withdrawal removed that address\'s home entry, a later listen MINTS A FRESH handle (a !== b)',
    typeof wa === 'object' && wa !== null && typeof wb === 'object' && wb !== null && wa !== wb, `same=${wa === wb} a=${fmt(wa)} b=${fmt(wb)}`);
  const dupCfg = { ...mk('g08dup'), listeners: [{ address: ['dup'], handle: 'tok' }, { address: ['dup'], handle: 'tok' }] };
  const iDup = thrown(() => ns.storeCreate(dupCfg));
  if (!iDup.threw) iDup.value.write(['dup'], 'temp', {});
  const hDup = iDup.threw ? null : thrown(() => iDup.value.listen('tok', [['dup']]));
  const dupCalls = [];
  if (!iDup.threw && !hDup.threw) iDup.value.register('tok', () => { dupCalls.push(1); });
  const wDup = (!iDup.threw && !hDup.threw) ? thrown(() => iDup.value.write(['dup', 'x'], 'temp', 1)) : { threw: true };
  A('JSG-08.21', '§2.4 rule 3; store DD-42 caller-spelled clause', 'two construction entries at ONE address carrying the SAME caller-spelled token fire the registry ONCE (one invocation per DISTINCT handle)',
    !wDup.threw && dupCalls.length === 1, wDup.threw ? `threw ${fmt(wDup.err)}` : `invocations=${dupCalls.length}`);
  const dupDistinct = wDup.threw ? [] : distinctHandles(wDup.value.triggered);
  A('JSG-08.22', 'parameter-semantics.md §2.15; §2.7 item 3', "that record's DISTINCT-handle set has ONE member (a SET, never a sequence)", dupDistinct.length === 1, `${dupDistinct.length} distinct of [${fmt(wDup.value?.triggered)}]`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-09 — THE REGISTRATION SITE'S DOMAIN AND ITS REFUSAL FORM            13 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i9 = ns.storeCreate(mk('g09'));
  i9.write(['site'], 'temp', {});
  // ⟶ DRIVE RE-DERIVED 2026-10-24 (THE `D-19` CRASH FIX): the handle is the caller's spelling, passed at
  // position `1`, and the address travels as the one-member SET. The in-domain handle the cells below register
  // at is therefore `H_IN`. NO EXPECTATION MOVES: every cell still drives `register` and reads its answer.
  const H_IN = listenSpelling('g09-site');
  i9.listen(H_IN, [['site']]);
  const f1c = [], f2c = [];
  const f1 = () => { f1c.push(1); }, f2 = () => { f2c.push(1); };
  const r1 = thrown(() => i9.register(H_IN, f1));
  A('JSG-09.1', '§2.4 item 5 (b)', 'register(handle, listener) returns undefined for an in-domain pair', !r1.threw && r1.value === undefined, r1.threw ? `threw ${fmt(r1.err)}` : fmt(r1.value));
  const r2 = thrown(() => i9.register(H_IN, f2));
  A('JSG-09.2', '§2.4 item 5 (b) & rule 2', 'a RE-registration returns undefined (a success on every success, including a replacement)', !r2.threw && r2.value === undefined, r2.threw ? `threw ${fmt(r2.err)}` : fmt(r2.value));
  const w9 = thrown(() => i9.write(['site', 'x'], 'temp', 1));
  A('JSG-09.3', '§2.4 rule 2', 'the replacement took effect: f2 fired and f1 did NOT', !w9.threw && f2c.length === 1 && f1c.length === 0, `f1=${f1c.length} f2=${f2c.length}`);
  const bare = thrown(() => i9.register('a-bare-string', f1));
  A('JSG-09.4', '§2.4 item 5 (d); surface.md §2.5 item 5 (g)', 'a bare string at the handle position is REFUSED (a value is thrown)', bare.threw, bare.threw ? 'threw' : `returned ${fmt(bare.value)}`);
  A('JSG-09.5', 'surface.md §2.5 item 5 (g); SW-1 final clause item 1; DD-40', "the refusal's status is the store's own AddressMalformed, minted by nothing", statusOf(bare) === 'AddressMalformed', String(statusOf(bare)));
  const fb = formOf(bare.err);
  // ⟶ RE-DERIVED 2026-10-17 (THE FAILURE-FORM OVERRIDE RE-DERIVATION PASS, `role_test_writer`): the *"exactly
  // {message, status}"* limb is the SUPERSEDED `DD-12`/`Refusal` limit. THIS arm is the store's own
  // `AddressMalformed` (item 5 (g)) and mints NO attempt, so `surface.md §2.5` item 4's second named family —
  // *"a `read`/`readLiteral`/`delete`/`rollback` store refusal with no attempt live"*, read at ITS OWN subject as
  // the store-refusal-no-attempt family — fixes `log: []` here, and item 9 makes that member visible to a census.
  // The set is THREE. The subject — the refusal's form, its status and its non-empty message — is kept; only the
  // member-set limb moved.
  A('JSG-09.6', 'surface.md §2.5 items 1-3 and item 4 (`log: []` — a `register` refusal mints no attempt) and item 9; the Architect\'s *"Override the failure form limit"*', 'the refusal travels in the single form: a plain object, own member set exactly {log, message, status} with `log` an ARRAY (`[]` here), status and message both non-empty strings',
    bare.threw && fb.obj && fb.proto === 'Object.prototype' && formIsThree(fb) && logIsEmpty(bare.err.log) && typeof bare.err.status === 'string' && bare.err.status.length > 0 && typeof bare.err.message === 'string' && bare.err.message.length > 0,
    `members=[${fb.members.join(',')}] proto=${fb.proto} errorish=${fb.errorish} log=${fmt(bare.err?.log)} status=${fmt(bare.err?.status)}`);
  const fab = thrown(() => i9.register({}, f1));
  A('JSG-09.7', '§2.4 item 5 (d)', 'a fabricated non-opaque value at the handle position answers the same form and the same status', statusOf(fab) === 'AddressMalformed', String(statusOf(fab)));
  const nul = thrown(() => i9.register(null, f1));
  A('JSG-09.8', '§2.4 item 5 (d)', 'null at the handle position answers the same form and the same status', statusOf(nul) === 'AddressMalformed', String(statusOf(nul)));
  const noListener = thrown(() => i9.register(H_IN));
  A('JSG-09.9', '§2.4 item 5 (c)-(d)', 'an ABSENT listener position is refused: listener must be a function', statusOf(noListener) === 'AddressMalformed', String(statusOf(noListener)));
  const nothing = thrown(() => i9.register());
  A('JSG-09.10', '§2.4 item 5 (d)', 'both positions absent answers the same form and status', statusOf(nothing) === 'AddressMalformed', String(statusOf(nothing)));
  const f2Before = f2c.length;
  const w9b = thrown(() => i9.write(['site', 'y'], 'temp', 2));
  A('JSG-09.11', '§2.4 item 5 (d) ("nothing reaches the store ... changes no node")', 'no standing registration is disturbed by a refusal: the pre-refusal registration still fires',
    !w9b.threw && f2c.length === f2Before + 1, `f2 ${f2Before} -> ${f2c.length}`);
  const msgs = [bare, fab, nul, noListener, nothing].map((x) => msgOf(x));
  const hasPlaceholder = msgs.some((m) => typeof m !== 'string' || m.length === 0 || PLACEHOLDER_TOKENS.some((t) => m.includes(t)));
  A('JSG-09.12', 'surface.md §2.5 item 5 (a) & (e); store §8.2 property (c)', 'every refusal message is a non-empty string carrying no unsubstituted <...> placeholder', !hasPlaceholder, fmt(msgs));
  // ⟶ ADDED 2026-10-17 (THE FAILURE-FORM OVERRIDE RE-DERIVATION PASS, `role_test_writer`) — A NEW CELL TAKES A
  // NEW ID. THE LIMB NO CELL OF THIS SET PINNED: `surface.md §2.5` item 4 NAMES *"the three constraint methods'
  // `TypeError`"* **BY NAME** among its `log: []` arms, and item 9 makes that member visible to a census — so this
  // arm's `log` is `[]` BY DECLARATION and not by accident. `§2.4` item 9 (f)'s rule (ii) is kept WHOLE and is what
  // the `status`-ABSENT half asserts: the `TypeError` carries NO `status` member and no `message` member of this
  // unit's own, and it is NO member of the store's closed `16`. THE ID IS NEW (`JSG-09.13`) AND NO EXISTING ID MOVES.
  const ci9 = ns.storeCreate(mk('g09c'));
  const constraintArms = [
    ['addConstraint', () => ci9.addConstraint(null, 'c1', () => true)],
    ['constraintOn', () => ci9.constraintOn(null, 'c1')],
    ['constraintOff', () => ci9.constraintOff(null, 'c1')],
  ].map(([name, drive]) => [name, thrown(drive)]);
  const cArmDetail = constraintArms.map(([n, r]) => (r.threw
    ? `${n}:class=${(r.err && r.err.constructor && r.err.constructor.name) || typeof r.err}/keys=[${(r.err && typeof r.err === 'object' ? Object.keys(r.err).sort() : []).join(',')}]/log=${fmt(r.err && r.err.log)}/statusAbsent=${!(r.err && typeof r.err === 'object' && 'status' in r.err)}`
    : `${n}:NO THROW (${fmt(r.value)})`)).join(' ');
  A('JSG-09.13', 'surface.md §2.5 item 4 (naming *"the three constraint methods\' `TypeError`"* BY NAME among its `log: []` arms) and item 9 (`log` an ordinary own enumerable data member, never absent, never `null`, never a non-array) read with §2.4 item 9 (f)\'s rule (ii) and §2.12 item 4',
    'each of the three constraint methods\' out-of-domain refusal is a `TypeError` whose `status` member is ABSENT (rule (ii), unmoved) AND which carries `log: []` by declaration — the EMPTY ARRAY, so `Object.keys` reads exactly `["log"]` and the member is PRESENT on this arm as on every arm',
    constraintArms.every(([, r]) => r.threw && r.err instanceof TypeError && r.err.constructor === TypeError
      && !('status' in r.err) && logIsEmpty(r.err.log) && Object.keys(r.err).sort().join(',') === 'log'),
    cArmDetail);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-10 — THE CLOSED FAIL SET                                            24 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
const g10 = { all: [] };
{
  const one = (id, clause, label, want, drive) => {
    const r = thrown(drive);
    g10.all.push({ id, label, r });
    A(id, clause, `${label} answers ${want}`, statusOf(r) === want, String(statusOf(r)));
  };
  const i10 = ns.storeCreate(mk('g10'));
  one('JSG-10.1', '§1.3 AddressArg row 6; store §8.1 #1', 'read(inst, "a.b")', 'AddressMalformed', () => i10.read('a.b'));
  one('JSG-10.2', '§1.3 TierArg row 3; store §8.1 #1 / F-1', 'a write with the tier position absent', 'AddressMalformed', () => i10.write(['x']));
  one('JSG-10.3', 'store §8.1 #2 (L-3)', 'read at an unoccupied address', 'AddressNotFound', () => i10.read(['nothing-here']));
  thrown(() => i10.write(['lf'], 'temp', 1));
  one('JSG-10.4', 'store §8.1 #3 (L-4)', 'a read that must walk THROUGH a leaf', 'LeafHasNoDownstream', () => i10.read(['lf', 'down']));
  thrown(() => i10.write(['tt'], 'mem', 1));
  one('JSG-10.5', 'store §8.1 #4 (L-TIER)', 'a read at a tier the key does not hold', 'TierNotFound', () => i10.read(['tt'], 'temp'));
  one('JSG-10.6', 'store §8.1 #5; A29', 'a tier token outside {file, mem, temp}', 'OutOfDomainTier', () => i10.read(['tt'], 'secure'));
  const iMem = thrown(() => ns.storeCreate({ journalLength: 2, listeners: [] }));
  const iM = iMem.threw ? i10 : iMem.value;
  thrown(() => iM.write(['m'], 'mem', {}));
  one('JSG-10.7', 'store §8.1 #6 (F-6); store-model.md §1.6 item 4 (d)(ii)', 'a write whose tier outranks its parent anchor\'s tier (mem register)', 'ParentAnchorMonotonicityViolation', () => iM.write(['m', 'k'], 'file', 1));
  thrown(() => i10.write(['cc'], 'mem', {}));
  one('JSG-10.8', 'store §8.1 #7 (F-4)', 'a write whose value kind contradicts the target container kind', 'ContainerKindConflict', () => i10.write(['cc'], 'mem', [1]));
  thrown(() => i10.write(['rb'], 'temp', {}));
  one('JSG-10.9', 'store §8.1 #8; write-and-read.md §4.1.1 item 3', 'readLiteral at a BRANCH target', 'ReadTargetIsBranch', () => i10.readLiteral(['rb']));
  thrown(() => i10.write(['wp'], 'temp', 1));
  one('JSG-10.10', 'store §8.1 #9 (F-5)', 'a write whose resolved PARENT is a leaf', 'WriteParentNotLink', () => i10.write(['wp', 'down'], 'temp', 2));
  one('JSG-10.11', 'store §8.1 #10 (M-11)', 'rollback with a well-shaped but unknown op id', 'JournalOpUnknown', () => i10.rollback('no-such-op'));
  const iJ = ns.storeCreate({ ...mk('g10j'), journalLength: 1 });
  const jw1 = thrown(() => iJ.write(['rc1'], 'temp', 1));
  thrown(() => iJ.write(['rc2'], 'temp', 1));
  one('JSG-10.12', 'store §8.1 #11; §6.1 item 5; §6.4 M-6', 'a rollback whose candidate set includes the entry the append compressed', 'RollbackCompacted', () => iJ.rollback(jw1.value.op.opId));
  one('JSG-10.13', 'store §8.1 #12; §7.1', 'storeCreate with an ABSENT journalLength', 'ConstructionArgumentMissing', () => ns.storeCreate({ filePath: mk('g10b').filePath, listeners: [] }));
  one('JSG-10.14', 'store §8.1 #13; §7.1; §1.3 FilePathArg row 4', 'storeCreate with a provided path whose parent directory does not exist', 'FilePathUnreachable', () => ns.storeCreate({ filePath: path.join(ROOT, 'no-such-dir-xyz', 'state.json'), journalLength: 1, listeners: [] }));
  one('JSG-10.15', 'store §8.1 #14; §1.2 row 11', 'a write whose value is NaN', 'ValueNotAdmitted', () => i10.write(['nv'], 'temp', NaN));
  // ⟶ RE-DERIVED 2026-10-16 (THE `DEF-2026-10-16-A` PASS, `role_blind_test_writer`) — CLASS (ii): THIS CELL AND
  // THE FOUR BELOW IT DROVE THE `file` COMMIT **AT THE VERB**, A ROUTE `docs/specs/storeroom-js/surface.md §2.11`
  // CLAUSE 2 SUPERSEDES (*"the act is the FIRST thing that arm does, before any body of the delivered set is
  // invoked"*; *"the verb performs NO FILE I/O on any of its arms"*). `NS.WRITE` UNDER THIS FIXTURE CANNOT FAIL
  // ANY LONGER, so the `<no throw>` these cells printed was THE SUPERSEDED LAW ANSWERING AND NOT A REGRESSION.
  // The subject is unmoved — a `file`-tier save whose path became unwritable after construction fails, the
  // store rolls the write back, and the caller meets the store's own single form — so the drive is RE-POINTED
  // to the terminal arm (`K-2` + `K-3`, `storeroom-constraints/kernel-surface.md §2.1` items 2–3) and no cell is
  // retired. SAME FIXTURE, SAME FAILING ENVIRONMENT, ONE ROUTE MOVED.
  const cfgFC = cfgFor('g10fc');
  const iFC = ns.storeCreate(cfgFC.c);
  fs.rmSync(cfgFC.dir, { recursive: true, force: true });
  fs.writeFileSync(cfgFC.dir, 'not a directory');
  const wFC = kernelSaveFile(iFC, ['fc'], 1);
  g10.all.push({ id: 'JSG-10.16', label: 'a file-tier write whose path became unwritable after construction', r: wFC });
  A('JSG-10.16', 'store §8.1 #15; §7.2 items 3-4; surface.md §2.11 clause 2 as amended 2026-10-15 (the failing save is the TERMINAL ARM\'s, its refusal reaching the caller) — RE-POINTED 2026-10-16', 'a file-tier write whose commit path fails answers FileCommitFailed and delivers it to the caller',
    statusOf(wFC) === 'FileCommitFailed', String(statusOf(wFC)));
  // ⟶ RE-DERIVED 2026-10-16: the SAME failing save, read one act later. Its observable is unmoved (the store's
  // own rollback is `§7.2` item 3's arm and runs before the caller is answered) — and on the re-pointed route
  // it is the state the store actually reaches.
  const rFC = thrown(() => iFC.read(['fc']));
  g10.all.push({ id: 'JSG-10.17', label: 'the state after the failed commit', r: rFC });
  A('JSG-10.17', 'store §6.4 item 8; §7.2 item 3 (i) — RE-POINTED 2026-10-16 (same ground as `.16`)', "after the failed commit A16's automatic journal rollback has run: the pre-write state stands (the address does not resolve)",
    statusOf(rFC) === 'AddressNotFound', String(statusOf(rFC)));

  const thrownSet = g10.all.filter((x) => !x.r.threw);
  const forms = g10.all.map((x) => formOf(x.r.err));
  // ⟶ RE-DERIVED 2026-10-17 (THE FAILURE-FORM OVERRIDE RE-DERIVATION PASS, `role_test_writer`). THIS CELL'S
  // AUTHORITY WAS `DD-12` AND THE `Refusal` STRUCT, WHICH DECLARED *"EXACTLY two members, no third"* — AND THE
  // ARCHITECT HAS OVERRIDDEN BOTH (*"Override the failure form limit"*, read with *"Bubble the message log to the
  // client on failure, override any clauses that forbid this"*). EVERY OTHER LIMB IS KEPT: `thrownSet.length === 0`
  // (every driven failure arrives as a THROWN value), the plain-object class and the `Object.prototype` prototype.
  // The member-set limb alone moves, to `surface.md §2.5` item 4 (THREE members, FLAT ACROSS ARMS, `log` an ARRAY
  // and `[]` where the cause has no attempt) read with item 9 (`log` never absent, never `null`, never a non-array).
  // THE CENSUS IS ALSO WIDENED BY ONE LIMB THE SUPERSEDED LIMIT COULD NOT CARRY: `log`'s array-ness is asserted for
  // EVERY driven failure, which is item 9's *"a failure whose `log` is not an array is a FINDING"*.
  const badLog = g10.all.filter((x) => !logIsDeclared(x.r.err?.log)).length;
  A('JSG-10.18', '§2.5 item 4 (THREE members, FLAT ACROSS ARMS) and item 9 (`log` an ordinary own enumerable data member, never a non-array); the Architect\'s *"Override the failure form limit"* — the member-set limb this cell took from `DD-12` is superseded', 'every one of the driven failures arrives as ONE form: a plain object whose own member set is exactly {log, message, status}, `log` an ARRAY on every one, and status and message both non-empty strings',
    thrownSet.length === 0 && badLog === 0 && forms.every((f) => f.obj && f.proto === 'Object.prototype' && formIsThree(f)),
    `${thrownSet.length} did not throw; non-array logs=${badLog}; forms=${forms.map((f) => `[${f.members.join(',')}]/${f.proto}`).join(' ')}`);
  const codes = g10.all.map((x) => statusOf(x.r));
  const outside = codes.filter((c) => !CLOSED_SET.includes(c));
  A('JSG-10.19', "§2.5 item 1; DD-40; store §8.1's dated clause of 2026-10-15 (the closed set is 16, ConstraintListInvalid appended at rank 16) — CENSUS WIDENED 2026-10-16", "every status is a member of the store's closed 16-member set — no code outside the set and none minted by the package",
    outside.length === 0, `outside=[${outside.join(',')}] observed=[${codes.join(',')}]`);
  const msgs10 = g10.all.map((x) => msgOf(x.r));
  const withPlaceholder = msgs10.filter((m) => typeof m !== 'string' || m.length === 0 || PLACEHOLDER_TOKENS.some((t) => m.includes(t)));
  A('JSG-10.20', 'store §8.2 property (c)', 'every message is non-empty and carries no unsubstituted placeholder token of the generator\'s own form',
    withPlaceholder.length === 0, fmt(withPlaceholder));
  REDERIVED.push(`JSG-10.16 :: the terminal arm's save, at the failing path -> ${statusOf(wFC)} :: ${fmt(msgOf(wFC))}`);
  REDERIVED.push(`JSG-10.17 :: read(['fc']) after that failure -> ${statusOf(rFC)}`);
  REDERIVED.push(`JSG-10.18/.19/.20 :: ${g10.all.length} driven failures ; did-not-throw=${thrownSet.length} ; outside-the-16=[${outside.join(',') || 'none'}] ; empty-or-placeholder messages=${withPlaceholder.length}`);
  const i21 = ns.storeCreate(mk('g10w21'));
  thrown(() => i21.write(['window'], 'mem', {}));
  const r21 = thrown(() => i21.read(['window', 'empty']));
  const want21 = "'empty' does not exist in 'window', it holds no keys";
  A('JSG-10.21', "store §8.2 worked example (2) and its degenerate arm", `read(['window','empty']) over an empty MAP answers AddressNotFound with EXACTLY ${want21}`,
    statusOf(r21) === 'AddressNotFound' && msgOf(r21) === want21, `${statusOf(r21)} :: ${fmt(msgOf(r21))}`);
  const i22 = ns.storeCreate(mk('g10w22'));
  i22.write(['window'], 'mem', {});
  thrown(() => i22.write(['window', 'tabs'], 'mem', { doc1: 1, searchbar: 2 }));
  const r22 = thrown(() => i22.read(['window', 'tabs', 'LandingPage']));
  const want22 = "'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'";
  A('JSG-10.22', "store §8.2 worked example (1) and its <CONTAINERSEGMENT> reconciliation", `read(['window','tabs','LandingPage']) answers AddressNotFound with EXACTLY ${want22}`,
    statusOf(r22) === 'AddressNotFound' && msgOf(r22) === want22, `${statusOf(r22)} :: ${fmt(msgOf(r22))}`);
  const r23 = thrown(() => i22.write(['window', 'tabs'], 'mem', [1, 2]));
  const want23 = "does not match the container kind of 'window.tabs', it holds a map, keys are 'doc1', 'searchbar'";
  A('JSG-10.23', 'store §8.2 worked example (3)', 'writing an array where a MAP stands answers ContainerKindConflict carrying the store\'s own kind clause',
    statusOf(r23) === 'ContainerKindConflict' && typeof msgOf(r23) === 'string' && msgOf(r23).includes(want23),
    `${statusOf(r23)} :: ${fmt(msgOf(r23))}`);
  const storeProduced = [r21, r22, r23].every((x) => typeof msgOf(x) === 'string' && msgOf(x).length > 0);
  A('JSG-10.24', '§2.5 item 2; surface.md §2.5 item 6 (d) and its CF-3 clause 1/4', "for a failure the STORE produces, the store's own generated string travels verbatim in the message (never hand-authored by the package)",
    storeProduced, [r21, r22, r23].map((x) => fmt(msgOf(x))).join(' | '));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-11 — THE JOURNAL AND THE ROLLBACK                                   18 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i11 = ns.storeCreate(mk('g11'));
  const V11 = { n: 1, s: 'x', arr: [1, 2] };
  const w = thrown(() => i11.write(['j'], 'mem', V11));
  const rec = w.threw ? null : w.value;
  A('JSG-11.1', '§2.2; store §3.6; DD-35', "the write's returned record has exactly the member set {op, watched, triggered}",
    !w.threw && rec && membersAre(formOf(rec), 'op,triggered,watched'), rec ? formOf(rec).members.join(',') : `threw ${fmt(w.err)}`);
  const op = rec?.op;
  A('JSG-11.2', 'parameter-semantics.md §2.13; store §6.2', "the op has exactly the store's own eight members {address, after, before, compacted, kind, opId, seq, tier}",
    op && membersAre(formOf(op), 'address,after,before,compacted,kind,opId,seq,tier'), op ? formOf(op).members.join(',') : 'no op');
  A('JSG-11.3', 'store §6.2 property 3', 'opId is a non-empty string', typeof op?.opId === 'string' && op.opId.length > 0, fmt(op?.opId));
  A('JSG-11.4', 'store §6.2 property 4', "kind is exactly 'write'", op?.kind === 'write', fmt(op?.kind));
  A('JSG-11.5', 'store §6.2', 'address is the address the verb was called with, VERBATIM and in order', rel(op?.address, ['j']), fmt(op?.address));
  A('JSG-11.6', 'DD-39; store §6.2', "tier crosses as the string token 'mem'", op?.tier === 'mem', fmt(op?.tier));
  A('JSG-11.7', 'store §6.2', 'seq is a number >= 1 (strictly increasing from 1)', typeof op?.seq === 'number' && op.seq >= 1, fmt(op?.seq));
  A('JSG-11.8', 'store §6.2; §6.4 M-9', 'a fresh entry is not compacted', op?.compacted === false, fmt(op?.compacted));
  A('JSG-11.9', 'store §6.2 (BaseState)', 'before.present is false at an address whose pre-state was absent', op?.before?.present === false, fmt(op?.before));
  A('JSG-11.10', 'store §6.2 property 2', 'after.present is true and its value is EQUAL to the written value under §1.5', op?.after?.present === true && rel(op.after.value, V11), fmt(op?.after));
  A('JSG-11.11', 'parameter-semantics.md §2.14; store §3.6', 'watched is an array (possibly empty) and never undefined', Array.isArray(rec?.watched), fmt(rec?.watched));
  const rb = thrown(() => i11.rollback(op.opId));
  A('JSG-11.12', 'store §6.3', "the rollback's record has exactly the member set {opId, undoneOps, restoredTo}",
    !rb.threw && membersAre(formOf(rb.value), 'opId,restoredTo,undoneOps'), rb.threw ? `threw ${fmt(rb.err)}` : formOf(rb.value).members.join(','));
  A('JSG-11.13', 'store §6.3', 'the id the caller passed is echoed', !rb.threw && rb.value.opId === op.opId, rb.threw ? `threw ${fmt(rb.err)}` : fmt(rb.value?.opId));
  A('JSG-11.14', 'store §6.3; §6.4 M-7 (i)', 'undoneOps contains the id whose reversal the store actually performed', !rb.threw && Array.isArray(rb.value.undoneOps) && rb.value.undoneOps.includes(op.opId), rb.threw ? `threw ${fmt(rb.err)}` : fmt(rb.value?.undoneOps));
  A('JSG-11.15', 'store §6.3; §6.4 M-5/M-8', 'restoredTo reports the state the addressed subtree now stands at: {present: false}', !rb.threw && rb.value.restoredTo?.present === false, rb.threw ? `threw ${fmt(rb.err)}` : fmt(rb.value?.restoredTo));
  const after11 = thrown(() => i11.read(['j']));
  A('JSG-11.16', 'store §6.4 M-5/M-8', 'the write that installed the node was undone: the address no longer resolves', statusOf(after11) === 'AddressNotFound', String(statusOf(after11)));
  const unknown = thrown(() => i11.rollback('no-such-op'));
  A('JSG-11.17', 'store §8.1 #10; §6.4 M-11; §1.3 OpIdArg row 2', 'a made-up op id answers JournalOpUnknown in the single form', statusOf(unknown) === 'JournalOpUnknown', String(statusOf(unknown)));
  const w2 = thrown(() => i11.write(['j2'], 'mem', 1));
  A('JSG-11.18', 'store §6.4 M-9 (iv); §6.1 item 1', 'a rollback appends NO journal entry: the next write\'s seq is 2, as though the rollback had not happened',
    !w2.threw && w2.value?.op?.seq === 2, w2.threw ? `threw ${fmt(w2.err)}` : fmt(w2.value?.op?.seq));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-12 — THE PACKAGE AND THE LAYER                                     18 assertions
// ⟶ RE-DERIVED 2026-10-11 (U-STOREROOM-PUBLISH, `A82` + `A84`'s `A-1`): ONE identity cell moves to the
// value THIS unit declares — `JSG-12.10`, the main package's `name`, fixed by `PAR-PUB-1` as exactly
// `provident-storeroom` (UNSCOPED); the OLD value `'@provident-storeroom/js'` was `package.md §3.3`
// item 1's and `DD-26`'s PRE-RENAME declaration. ONE row is CHECKED AND STANDS UNMOVED — `JSG-12.12`,
// the five scoped platform names, which `PUB-DD-15`/`PUB-DD-6` fix character for character as the
// spellings already asserted. ONE row is ADDED — `JSG-12.18`, the `files` allowlist (`PUB-DD-1`;
// `PAR-PUB-3`), a value this unit declares for the first time, with NO pre-rename counterpart. The
// rename reaches NOTHING ELSE here: the eight module names (`JSG-12.1`, `.2`), the instance's
// `{ register, on, off, settle }` (`JSG-01.9`), the realm claim (Node ESM alone — `JSG-12.4`, `.5`) and the
// `HO-` handoff row (`JSG-12.5`'s `§3.2 HO-1`) are all UNCHANGED, checked and unmoved. NO ASSERTION IN
// THIS FILE IS WEAKENED BY THIS PASS, AND NO `APP`-GREEN IS CLAIMED.
// ⟶ SUPERSEDED 2026-10-11 BY THE `A88` PARAGRAPH BELOW, AND RE-EMITTED HERE BYTE-FOR-BYTE SO ITS SITE IS NOT
// LOST: THIS PARAGRAPH'S READING OF `JSG-12.12` IS THE `A86`(a) READING — THE SPELLING THE `A88` PROJECT-TOKEN
// RULING MOVES — AND IT IS READ FROM THIS DATE ONLY AS THE STATE THAT RULING MOVED (`RCA-8(d)` ANNOTATE-BESIDE;
// `docs/specs/storeroom-publish-proposal.md §14`).
// ⟶ RE-DERIVED AGAIN 2026-10-11 (BOUNDED RE-DERIVATION, `A86`(a) — THE OPERATIVE READING of the architect's
// ruling; `docs/specs/storeroom-publish-proposal.md §12`): the clause above is SUPERSEDED IN ONE PLACE AND
// IN ONE PLACE ONLY. ONE cell moves — `JSG-12.12`, the five platform names, whose SCOPE SEGMENT the ruling
// moved from `@provident-storeroom` to `@auspicion`; the five ARTEFACTS, their LABELS (`js-<target>-<arch>`),
// their second segments and their toolchain suffixes (`-gnu` twice, `-msvc` once, none twice) are UNMOVED,
// and the arithmetic is unmoved at `5` = `3 + 2`. `JSG-12.10` — the main package's UNSCOPED `name`, fixed by
// `PAR-PUB-1` as exactly `provident-storeroom` — IS CHECKED AND DOES NOT MOVE: the platform names' re-scope
// is not the main package's identity and leaves it alone. THE OLD SCOPE `@provident-storeroom` IS NAMED IN
// THE MOVED CELL ITSELF as the spelling the ruling moved, and it is REFUSED by that cell's own assertion.
// `A86`(b) — `@auspicion/storeroom-js-<label>` — is CARRIED AND UNAPPLIED and is asserted by NO cell here.
// NOTHING ELSE IN THIS SCENARIO OR THIS FILE MOVES: the eight module names (`JSG-12.1`, `.2`), the
// instance's `{ register, on, off, settle }` (`JSG-01.9`), the realm claim (Node ESM alone — `JSG-12.4`, `.5`), the
// `HO-` handoff row (`JSG-12.5`'s `§3.2 HO-1`), the count `5` (`JSG-12.11`) and the `files` allowlist
// (`JSG-12.18`) are all CHECKED AND STAND UNMOVED. THE ASSERTION CENSUS OF THIS SET IS UNMOVED BY THIS PASS
// (no cell is added and none is removed), AND NO ASSERTION IN THIS FILE IS WEAKENED BY IT — the moved cell
// is asserted EXACTLY and in a form STRICTLY TIGHTER than the one it replaces.
// ⟶ RE-DERIVED AGAIN 2026-10-11 (BOUNDED RE-DERIVATION, `A88`(a) — THE OPERATIVE READING of the architect's
// PROJECT-TOKEN ruling; `docs/specs/storeroom-publish-proposal.md §14`): the clause above is SUPERSEDED IN ONE
// PLACE AND IN ONE PLACE ONLY. ONE cell moves — `JSG-12.12`, THE FIVE PLATFORM NAMES, which GAIN THE PROJECT
// TOKEN: the names must NAME THE PROJECT they are for, because `@auspicion` is a MULTI-PROJECT org. The SCOPE
// stays `@auspicion`; the five ARTEFACTS, their labels, their second segments and their toolchain suffixes
// (`-gnu` twice, `-msvc` once, none twice) are UNMOVED, and the arithmetic is unmoved at `5` = `3 + 2`.
// THE SPELLING THIS RULING MOVES IS WRITTEN IN THE MOVED CELL ITSELF: `@auspicion/js-<label>` — the `A86`(a)
// reading — and it is REFUSED by that cell's own assertion; THE OLD SCOPE `@provident-storeroom/…` is REFUSED
// exactly as the `A86` pass refused it. `A88`(b) — `@auspicion/provident-storeroom-<label>` — is CARRIED AND
// UNAPPLIED and is asserted by NO cell here, and `A86`(b) — `@auspicion/storeroom-js-<label>` — is superseded
// by the ruling and is asserted by no cell either. THE MAIN PACKAGE'S IDENTITY DOES NOT MOVE: `JSG-12.10` —
// `provident-storeroom`, UNSCOPED, fixed by `PAR-PUB-1` — IS CHECKED AND DOES NOT MOVE, because a clause about
// the PLATFORM names contains no term about the main package's own name (`A82`). NOTHING ELSE IN THIS SCENARIO
// OR THIS FILE MOVES: the eight module names (`JSG-12.1`, `.2`), the instance's `{ register, on, off, settle }`
// (`JSG-01.9`), the realm claim (Node ESM alone — `JSG-12.4`, `.5`), the `HO-` handoff row (`JSG-12.5`'s
// `§3.2 HO-1`), the count `5` (`JSG-12.11`) and the `files` allowlist (`JSG-12.18`) are all CHECKED AND STAND
// UNMOVED. THE ASSERTION CENSUS OF THIS SET IS UNMOVED BY THIS PASS (no cell is added and none is removed),
// AND NO ASSERTION IN THIS FILE IS WEAKENED BY IT — the moved cell is asserted EXACTLY at the `A88`(a)
// spellings and in a form STRICTLY TIGHTER than the one it replaces.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  // ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): **STALE GREENS DOC**,
  // `RCA-8(g)`, for the SAME single clause as `JSG-01.2`/`.3` — `docs/specs/storeroom-js/surface.md §2.9`
  // item 1's `A127` clause of 2026-10-16 gives the module namespace ONE name, `storeCreate`, `11 → 1` ✓ — with
  // one subject this scenario adds of its own and which is UNMOVED: THE CLAIMED ESM ENTRY RESOLVES. Each cell
  // keeps its subject, its drive (the ONE import the runner performed) and its exact set-equality form.
  const names = Object.keys(ns).sort();
  A('JSG-12.1', '§3.1; A70; package.md §1.1; §2.9 item 1\'s `A127` clause (the namespace is ONE name, `11 → 1`)', 'the ONE import of the claimed ESM entry resolved and the namespace carries its one remaining name, `storeCreate`',
    names.join(',') === 'storeCreate', names.join(','));
  A('JSG-12.2', 'package.md §1.3 item 3; §2.9 item 1\'s `A127` clause; §2.9\'s removal-versus-deprecation clause of 2026-10-16', "the entry's named exports are exactly `storeCreate` and NOTHING ELSE — the ten store-reaching names are the product's methods, not module names",
    Object.keys(ns).length === 1 && Object.prototype.hasOwnProperty.call(ns, 'storeCreate') && typeof ns.storeCreate === 'function', Object.keys(ns).join(','));
  let pkg = null, pkgErr = null;
  try { pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8')); } catch (e) { pkgErr = e; }
  const ex = (pkg && pkg.exports) || {};
  A('JSG-12.3', 'package.md §1.3 item 1; DD-24', 'the exports map publishes exactly ONE arms-bearing entry (the "." key)', Object.keys(ex).length === 1 && Object.prototype.hasOwnProperty.call(ex, '.'), pkgErr ? `manifest unreadable: ${pkgErr.message}` : Object.keys(ex).join(','));
  const arm = ex['.'];
  const armEsrn = typeof arm === 'string' ? arm : (arm && (arm.import ?? arm.default));
  A('JSG-12.4', 'package.md §1.3 item 1; DD-4', "the one entry's arm is an ESM arm naming a .mjs file",
    typeof armEsrn === 'string' && armEsrn.endsWith('.mjs'), fmt(arm));
  A('JSG-12.5', 'package.md §1.3 item 1; DD-24; §3.2 HO-1', 'no require arm is published: CJS is an UNCLAIMED realm',
    !(arm && typeof arm === 'object' && ('require' in arm)) && !JSON.stringify(ex).includes('.cjs'), fmt(arm));
  A('JSG-12.6', 'package.md §1.3 item 2', "no wildcard './*' export exists (it would expose the .node path)", !Object.prototype.hasOwnProperty.call(ex, './*'), Object.keys(ex).join(','));
  A('JSG-12.7', 'package.md §1.3 items 1-2; DD-24', 'the manifest declares no main field (no second, arms-bearing CJS entry)', pkg != null && !Object.prototype.hasOwnProperty.call(pkg, 'main'), pkg ? fmt(pkg.main) : 'no manifest');
  A('JSG-12.8', 'package.md §1.4 item 1; DD-38', "engines.node is '>=18.0.0'", pkg?.engines?.node === '>=18.0.0', fmt(pkg?.engines));
  A('JSG-12.9', 'package.md §3.4 item 6; DD-43', "license is 'AGPL-3.0'", pkg?.license === 'AGPL-3.0', fmt(pkg?.license));
  // ⟶ RE-DERIVED 2026-10-11 (U-STOREROOM-PUBLISH, `A82`; the blind role's `Q3-6`/`Q5` duty): `PAR-PUB-1`
  // (`docs/specs/storeroom-publish/parameter-semantics.md §2.1`) FIXES the main package's `name` as EXACTLY
  // `provident-storeroom` — UNSCOPED — carried at `docs/specs/storeroom-publish/distribution.md §6.1`
  // item 1 and at `docs/specs/storeroom-publish/contract.md §2.1` (the `A82`/`A83` decision row's
  // *"public at provident-storeroom:0.1.0"*). The OLD value this cell asserted — `'@provident-storeroom/js'`,
  // `package.md §3.3` item 1's and `DD-26`'s PRE-RENAME declaration — is the identity the amendment moves,
  // and `PAR-PUB-1`'s outside-values cell REFUSES it. The assertion is EXACT and NO LOOSER FORM.
  A('JSG-12.10', 'PAR-PUB-1; A82; distribution.md §6.1 item 1 (pre-rename: package.md §3.3 item 1; DD-26)', "the registry identity is 'provident-storeroom', UNSCOPED (the pre-rename declaration was '@provident-storeroom/js')", pkg?.name === 'provident-storeroom', fmt(pkg?.name));
  const opts = Object.keys(pkg?.optionalDependencies || {});
  A('JSG-12.11', 'package.md §3.2 item 2; DD-25', 'the prebuild matrix declares 5 targets', opts.length === 5, `${opts.length}: ${opts.join(',')}`);
  // ⟶ THE CONSTANT THIS PASS MOVES, RE-EMITTED VERBATIM SO ITS SITE IS NOT LOST — it read
  //   '@auspicion/js-linux-x64-gnu', '@auspicion/js-linux-arm64-gnu',
  //   '@auspicion/js-darwin-x64', '@auspicion/js-darwin-arm64',
  //   '@auspicion/js-win32-x64-msvc'
  // — the `A86`(a) reading, WHICH IS THE SPELLING THE `A88` PROJECT-TOKEN RULING MOVES
  // (`docs/specs/storeroom-publish-proposal.md §14`; the ruling's words: "Change the platform package names to
  // specify the project they are for, this organization will be used for multiple").
  const wantOpts = [
    '@auspicion/provident-storeroom-js-linux-x64-gnu', '@auspicion/provident-storeroom-js-linux-arm64-gnu',
    '@auspicion/provident-storeroom-js-darwin-x64', '@auspicion/provident-storeroom-js-darwin-arm64',
    '@auspicion/provident-storeroom-js-win32-x64-msvc',
  ];
  // ⟶ SUPERSEDED 2026-10-11 BY THE `A88` COMMENT BLOCK UNDER IT, AND RE-EMITTED HERE BYTE-FOR-BYTE SO ITS SITE
  // IS NOT LOST: THIS BLOCK'S CLAUSE IS THE `A86`(a) READING, WHOSE SPELLING THE `A88` PROJECT-TOKEN RULING
  // MOVES, AND IT IS READ FROM THIS DATE ONLY AS THE STATE THAT RULING MOVED (`RCA-8(d)` ANNOTATE-BESIDE).
  // ⟶ RE-DERIVED 2026-10-11 (BOUNDED, `A86`(a) — THE OPERATIVE READING): THE FIVE PLATFORM NAMES' SCOPE
  // SEGMENT MOVES. The clause is `docs/specs/storeroom-publish/resolution.md §3.1`'s table, which carries
  // each name as the scope `@auspicion`, a separator `/`, and the label `js-<target>-<arch>[-<toolchain>]`;
  // the SAME five operative spellings are printed at `docs/specs/storeroom-publish/contract.md §1.3`'s
  // five-name clause (`1. **`@auspicion/js-linux-x64-gnu`** · 2. … 5. **`@auspicion/js-win32-x64-msvc`.**`)
  // and as the OPERATIVE domain of `docs/specs/storeroom-publish/parameter-semantics.md §3.1`
  // (`PAR-PUB-17`, a platform artefact's `name`: "The five operative values are
  // `@auspicion/js-linux-x64-gnu` · … · `@auspicion/js-win32-x64-msvc`"). `PUB-DD-15`'s AS-FILED PIN —
  // the scope `@provident-storeroom` — is RE-EMITTED
  // VERBATIM at `docs/specs/storeroom-publish/contract.md §0.3`'s row for that decision and is superseded
  // here AS A SCOPE; `PUB-DD-6`'s own sentence ("the scope the five names already spell") is superseded by
  // the ruling in the same place. THE FIVE ARTEFACTS, THEIR LABELS, THEIR SECOND SEGMENTS AND THEIR
  // TOOLCHAIN SUFFIXES ARE UNMOVED, and the arithmetic is unmoved: `5` names = `3` with a suffix (`-gnu`
  // twice, `-msvc` once) + `2` without. `A86`(b) — `@auspicion/storeroom-js-<label>` — is CARRIED AND
  // UNAPPLIED. THE ASSERTION IS EXACT: set equality with the five declared spellings, the OLD scope
  // `@provident-storeroom` named in the cell as the spelling the ruling moved and REFUSED by name, with no
  // substring test, no prefix test and no looser form of any kind. (The exact-equality form is `JSG-12.11`'s
  // count `5` conjoined with this row's as-filed containment test, so it adds no claim the set did not
  // already carry and it cannot pass on an old-scope name or on a sixth one.)
  // ⟶ RE-DERIVED AGAIN 2026-10-11 (BOUNDED, `A88`(a) — THE OPERATIVE READING OF THE ARCHITECT'S PROJECT-TOKEN
  // RULING; `docs/specs/storeroom-publish-proposal.md §14`): THE FIVE PLATFORM NAMES GAIN THE PROJECT TOKEN.
  // The clause, at its own bytes: *"`A88`(a) — THE ADDITIVE READING (the operative default, because it is the
  // least destructive edit that satisfies the requirement and loses no existing token): the project token is
  // INSERTED before the language marker, so the five become `@auspicion/provident-storeroom-js-linux-x64-gnu` ·
  // `…-js-linux-arm64-gnu` · `…-js-darwin-x64` · `…-js-darwin-arm64` · `…-js-win32-x64-msvc`"*, and the reason
  // it is operative rather than priced: *"`@auspicion` is a MULTI-PROJECT org, so a platform name that carries
  // only a language marker is ambiguous inside it"*, the ruling requiring that the name *"NAME THE PROJECT"*.
  // THE SPELLING THIS RULING MOVES, NAMED IN THE CELL ITSELF: `@auspicion/js-<label>` — THE `A86`(a) READING,
  // WHICH IS WHAT `resolution.md §3.1`, `contract.md §1.3`, `parameter-semantics.md §3.1` (`PAR-PUB-17`) AND
  // `PUB-DD-15`'s row STILL PRINT AT THEIR OWN BYTES TODAY (see this row's clause cell: it is a DRIFT this pass
  // NAMES and does not edit, its edit scope being this file and its record only); and, behind it,
  // `PUB-DD-15`'s AS-FILED OLD SCOPE `@provident-storeroom`, which the `A86` pass already superseded AS A SCOPE
  // and which this cell REFUSES exactly as that pass did. THE SCOPE IS UNMOVED AT `@auspicion`; THE FIVE
  // ARTEFACTS, THEIR LABELS, THEIR SECOND SEGMENTS AND THEIR TOOLCHAIN SUFFIXES ARE UNMOVED, and the arithmetic
  // is unmoved: `5` names = `3` with a suffix (`-gnu` twice, `-msvc` once) + `2` without. `A88`(b) —
  // `@auspicion/provident-storeroom-<label>` — is CARRIED AND UNAPPLIED, and `A86`(b) —
  // `@auspicion/storeroom-js-<label>` — is superseded by this ruling; neither is asserted by any cell here. THE
  // MAIN PACKAGE'S IDENTITY IS UNTOUCHED BY THE RULING IN ITS OWN WORDS: *"THE MAIN PACKAGE'S IDENTITY DOES NOT
  // MOVE: `A82`'s unscoped `provident-storeroom` stands"* (`JSG-12.10`, checked and unmoved). THE ASSERTION IS
  // EXACT AND NO LOOSER FORM IS TAKEN: set equality with the five declared spellings, with NO substring test,
  // NO prefix test, NO case-fold and no "one of two spellings" tolerance — and the row additionally REFUSES the
  // superseded `@auspicion/js-` shape AND the old scope `@provident-storeroom/` BY NAME. THE FORM IS
  // `JSG-12.11`'s count `5` conjoined with this row's containment test, so it adds NO claim the set did not
  // already carry, and the `@auspicion/js-` conjunct is a STRENGTHENING of this row and never a loosening of
  // it. THE PREDICATE WAS CHECKED OFF-LINE FOR VACUITY, on five inputs: the five `A88`(a) names → `true`; the
  // five SUPERSEDED `@auspicion/js-` names → `false`; the five OLD-scope `@provident-storeroom/` names →
  // `false`; the five new plus a sixth (`@auspicion/provident-storeroom-js-freebsd-x64`) → `false`; the five
  // new, REVERSED (order-insensitivity) → `true`.
  A('JSG-12.12', 'A88(a) — the project token INSERTED before the language marker, the names made to NAME THE PROJECT (docs/specs/storeroom-publish-proposal.md §14); resolution.md §3.1; contract.md §1.3 (the five operative names); parameter-semantics.md §3.1 / PAR-PUB-17 (the artefact-name domain) — the last four STILL PRINTING the superseded `@auspicion/js-<label>` spelling at their own cells and NAMED here rather than edited; PUB-DD-15 as filed = the old scope `@provident-storeroom` the earlier ruling moved (package.md §3.2 items 2 & 5; §3.3 item 5; DD-26)', 'the five artefact names are EXACTLY @auspicion/provident-storeroom-js-linux-x64-gnu, @auspicion/provident-storeroom-js-linux-arm64-gnu, @auspicion/provident-storeroom-js-darwin-x64, @auspicion/provident-storeroom-js-darwin-arm64 and @auspicion/provident-storeroom-js-win32-x64-msvc — the label-to-artefact map with its project token and its toolchain suffixes (the SUPERSEDED spelling this ruling moved was @auspicion/js-linux-x64-gnu and its four siblings, and the old scope @provident-storeroom/… before that; this cell REFUSES both)',
    wantOpts.length === opts.length
      && [...wantOpts].sort().join(',') === [...opts].sort().join(',')
      && opts.every((n) => !n.startsWith('@auspicion/js-'))
      && opts.every((n) => !n.startsWith('@provident-storeroom/')),
    opts.join(','));
  A('JSG-12.13', 'package.md §1.3 items 3-4; §1.2 items 1-2; A70', "the four internal-only names (version, errorMessage, call, the ADDON's register) are absent from the module graph, and storeCreate is the ENTRY's own factory",
    ['version', 'errorMessage', 'call', 'register'].every((n) => !Object.prototype.hasOwnProperty.call(ns, n)) && typeof ns.storeCreate === 'function',
    ['version', 'errorMessage', 'call', 'register'].filter((n) => n in ns).join(',') || 'none');
  const exposedAddon = Object.keys(ex).filter((k) => k.includes('.node')) ;
  A('JSG-12.14', 'package.md §1.2 items 1-3; DD-4', 'the addon artefact is exposed by NO subpath of the exports map: the reach is INTERNAL and is not a second realm',
    exposedAddon.length === 0, exposedAddon.join(',') || 'none');
  A('JSG-12.15', '§4.2 items 1-2; DD-18; DD-20', "this set's own layer is ENVELOPE/PURE and the label travels with every figure of this run", LAYER === 'ENVELOPE/PURE', LAYER);
  A('JSG-12.16', '§4.2 items 2-3; DD-20', "this set's APP layer is NONE: the unit delivers a LIBRARY and no APP-green is claimed here, in the driver or in the run's record", APP_LAYER === 'NONE', APP_LAYER);
  const deps = Object.keys(pkg?.dependencies || {});
  // CHECKED AND UNMOVED 2026-10-11 (BOUNDED, `A86`(a)), AND THE COUPLING IS NAMED RATHER THAN LEFT TO BE
  // DISCOVERED: this row's own expected observable prints NO scoped-name byte — its subject is the
  // `optionalDependencies`-versus-`dependencies` split, and its clause is `package.md §3.2` item 2 ·
  // `§3.3` item 2 · `DD-25` — so the row does NOT move. Its check does, however, consume the SAME
  // five-name constant the moved row above asserts, because its subject IS those five ARTEFACTS; the
  // artefacts are the same five before and after the ruling, so the set the negative ranges over follows
  // `JSG-12.12` automatically and the row's declared value is unmoved either way. This is a COUPLING and
  // not a move: no expectation of this cell changes, and nothing here is loosened.
  // ⟶ RE-READ 2026-10-11 UNDER `A88`(a) AND STILL UNMOVED, WITH THE SAME COUPLING: the ruling replaces the
  // five names' SCOPE AND SECOND SEGMENT SPELLING and leaves the ARTEFACT SET at the same five, so this row's
  // negative ranges over the same five names `JSG-12.12` now asserts and NO BYTE OF THIS ROW'S EXPECTATION
  // MOVES. The `A86`(a) reading above stands as the state that ruling moved and is read THROUGH this line.
  A('JSG-12.17', 'package.md §3.2 item 2; §3.3 item 2; DD-25', 'the five prebuild artefacts are OPTIONAL per-target dependencies and not required dependencies (no fallback build-on-install as the primary route)',
    wantOpts.every((n) => !deps.includes(n)), `dependencies=[${deps.join(',')}]`);
  // ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): **STALE GREENS DOC**,
  // `RCA-8(g)`. The three-entry allowlist is the `A85`(1)/`PUB-DD-1` reading; `docs/specs/storeroom-publish/
  // distribution.md §2.1` ITEM 6, LANDED 2026-10-16 on `A121`/`A122`, adds the FOURTH entry — *"THE CONSTRAINT
  // KERNEL'S OWN MODULE IS THE MAIN PACKAGE'S `files` ALLOWLIST's FOURTH ENTRY … the THREE of item `1` above —
  // `index.mjs` · `README.md` · `index.d.ts` — PLUS THE KERNEL'S OWN PACKAGE-ROOT-RELATIVE PATH
  // `src/constraint-kernel.mjs`: FOUR ENTRIES, AND NOTHING BESIDE THEM"* — and item `1` of that part stands
  // BYTE-FOR-BYTE, read THROUGH item 6. THE CELL'S SUBJECTS ARE KEPT WHOLE: the allowlist asserted by EXACT
  // SET EQUALITY, `build/Release` excluded, and no `.node` at any entry. NO LOOSER FORM IS TAKEN: the fourth
  // path is asserted BY NAME, and the row additionally refuses a fifth entry and a `LICENSE` row (item 5's
  // standing prohibition: *"a `LICENSE` ROW ADDED TO THE MAIN PACKAGE'S `files` ARRAY IS A FINDING"*).
  const FILES = ['index.mjs', 'README.md', 'index.d.ts', 'src/constraint-kernel.mjs'];
  const filesList = Array.isArray(pkg?.files) ? pkg.files : null;
  const filesSorted = filesList ? [...filesList].sort() : null;
  const filesBinaryFree = filesList
    ? filesList.every((f) => typeof f !== 'string' || (!f.includes('build/Release') && !f.endsWith('.node')))
    : false;
  A('JSG-12.18', 'distribution.md §2.1 ITEM 6, LANDED 2026-10-16 on A121/A122 (the allowlist\'s FOURTH entry), read with item 1 (unmoved) and item 5 (the licence-row prohibition); PUB-DD-1; A85(1); PAR-PUB-3; contract.md §2.1 item 1; distribution.md §6.1 item 8', "the manifest's files allowlist is EXACTLY ['src/constraint-kernel.mjs','README.md','index.d.ts','index.mjs'] — the kernel's own module as the FOURTH entry, a fifth entry refused, no LICENSE row, no build/Release path and no .node entry",
    filesSorted !== null && filesSorted.join(',') === [...FILES].sort().join(',') && filesBinaryFree
      && !filesList.some((f) => typeof f === 'string' && /(^|\/)LICEN[CS]E$/i.test(f)),
    filesList ? `${filesList.join(',')} (binary-free: ${filesBinaryFree})` : 'no files array');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-13 — THE SCALING CLAIM THE DOCS NOW MAKE                             6 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i13 = ns.storeCreate(mk('g13'));
  const N = 3000;
  const bigMap = {};
  for (let i = 0; i < N; i += 1) bigMap[`k${i}`] = i;
  const bigVec = [];
  for (let i = 0; i < N; i += 1) bigVec.push(i);
  const bigNest = {};
  for (let i = 0; i < 50; i += 1) { const inner = {}; for (let j = 0; j < 60; j += 1) inner[`j${j}`] = j; bigNest[`i${i}`] = inner; }
  const wm = thrown(() => i13.write(['big-map'], 'temp', bigMap));
  A('JSG-13.1', 'RCA §1, §4, §5-bis', `a ${N}-member object completes its write without throwing`, !wm.threw, wm.threw ? `threw ${fmt(wm.err)}` : 'returned a record');
  const rm = wm.threw ? wm : thrown(() => i13.read(['big-map']));
  A('JSG-13.2', 'RCA §6 item 1; store §4.2 R-2', `the read answers an object with ${N} members`, !rm.threw && rm.value && Object.keys(rm.value).length === N, rm.threw ? `threw ${fmt(rm.err)}` : `members=${rm.value ? Object.keys(rm.value).length : 'n/a'}`);
  A('JSG-13.3', '§1.5 item 1', 'its member key set is equal to the written one as a SET', !rm.threw && rel(rm.value, bigMap), 'see JSG-13.2');
  const wv = thrown(() => i13.write(['big-vec'], 'temp', bigVec));
  const rv = wv.threw ? wv : thrown(() => i13.read(['big-vec']));
  A('JSG-13.4', '§1.5 item 2; store §4.2 R-3', `a ${N}-member array round-trips dense, in index order, equal member-by-member`,
    !wv.threw && !rv.threw && rel(rv.value, bigVec), wv.threw ? `threw ${fmt(wv.err)}` : (rv.threw ? `read threw ${fmt(rv.err)}` : `len=${rv.value && rv.value.length}`));
  const wn = thrown(() => i13.write(['big-nest'], 'temp', bigNest));
  const rn = wn.threw ? wn : thrown(() => i13.read(['big-nest']));
  A('JSG-13.5', '§1.5; RCA §6 item 3', 'a nested 50 x 60 structure round-trips with every nested member set equal',
    !wn.threw && !rn.threw && rel(rn.value, bigNest), wn.threw ? `threw ${fmt(wn.err)}` : (rn.threw ? `read threw ${fmt(rn.err)}` : 'round trip'));
  A('JSG-13.6', 'RCA §1, §6 item 1; §1.4 item 5', 'none of the three writes produces a failure code: the declared bound is not reached at this size',
    !wm.threw && !wv.threw && !wn.threw, [wm, wv, wn].map((x) => (x.threw ? String(statusOf(x)) : 'ok')).join(','));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-14 — THE SEAM'S MEMBER IS REMOVED WHOLE: THE NAMESPACE ABSENCE STANDS, AND THE ONE CLASS TEST IT CARRIED
//          MOVES TO THE POSITION THAT STILL CARRIES IT                                  5 assertions (1-5)
//
// ⟶ RE-DERIVED WHOLE, 2026-10-18 (`role_test_writer`). The block this header held drove `<instance>.settle(…)`
// at five cells. **THE MEMBER IS `REMOVED-WHOLE`** (`surface.md §2.4` item 9's pointer of that date: *"NO DRIVE
// MAY ASSERT A CALL OF `settle` FROM THIS DATE, ON ANY INSTANCE, FOR ANY ARGUMENT"*), so the block is
// **RE-DERIVED AND NOT DELETED**, and the disposition is the one the spec itself records, cell by cell:
//
//   · **`JSG-14.2` IS MEASURED UNMOVED AND KEPT BYTE-FOR-BYTE.** Its subject is that `settle` is NOT a name of
//     the module namespace — which stays true and is now true for a SECOND reason (the member left the
//     product too). **THE SPEC PASS NAMED THIS CELL AS ONE OF ITS TWO UNMOVED AND THE MEASUREMENT AGREES.**
//   · **`JSG-14.4` AND `JSG-14.5`'s SUBJECT — the ONE CLASS TEST over the declared out-of-domain RECORD
//     POSITIONS — IS NOT LOST WITH THE MEMBER.** `parameter-semantics.md §2.19`'s clause of 2026-10-18 states
//     exactly where it lives now: *"the CLASS TEST the `domain` and outside-value cells declare is `surface.md
//     §2.4` item 9 (g) item 1's and STANDS AT THE WRITE'S FIFTH POSITION (`PAR-JS-20`), where it is the
//     record-position test and not a route into an adoption."* **SO THE TWO CELLS MOVE TO `write`'s FIFTH
//     POSITION AND ASSERT THE SAME FORM THERE** — `TypeError` and nothing else, `status` member ABSENT, a
//     STRING `message` member REQUIRED and NOT FORBIDDEN (`§2.4` item 9 (b) as re-spelled 2026-10-15). Every
//     outside value the old cells drove is driven again; **NOTHING IS WEAKENED and no position is invented.**
//   · **`JSG-14.1` AND `JSG-14.3`'s SHAPE DUTY MOVES TO `constraints`, THE SECOND OF THE TWO SINGLES** the
//     clause of 2026-10-18 names — so the "a product member exists, is a function, and declares exactly the
//     arity the clause prints" reading is kept, one member over (`§2.12` item 2: arity `0`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i14 = ns.storeCreate(mk('g14'));
  const hasStatus = (e) => e !== null && typeof e === 'object' && 'status' in e;
  const clsName = (e) => (e && e.constructor && e.constructor.name) || typeof e;
  A('JSG-14.1', '§2.4 item 9 (f)\'s clause of 2026-10-18 — the TWELVE own members, `10 + 1 + 1 = 12` ✓, whose two singles are `register` and `constraints`; §2.12 item 2 (arity `0`)', "the SECOND of the two remaining singles, `constraints`, exists and is a function on the instance — and `settle`, the member the removal takes, is NOT one",
    typeof i14.constraints === 'function' && i14.constraints.length === 0
      && !Object.prototype.hasOwnProperty.call(i14, 'settle'),
    `constraints:${typeof i14.constraints}/len=${i14.constraints && i14.constraints.length}/settle=${Object.prototype.hasOwnProperty.call(i14, 'settle')}`);
  A('JSG-14.2', '§2.4 item 9\'s non-exposure sentence ("`settle` is NOT a ninth named export"), READ THROUGH A127 — its `8`-verb figure is superseded by §2.9 item 1\'s `A127` clause (ONE name, `storeCreate`, `11 → 1`) while the sentence\'s own point STANDS; parameter-semantics.md §2.19 (`PAR-JS-19`)', "settle is NOT a name of the module namespace — it is the product's own twelfth member and no consumer route — and the namespace is exactly its one remaining name, `storeCreate`, with no second name beside it",
    !Object.prototype.hasOwnProperty.call(ns, 'settle') && Object.keys(ns).sort().join(',') === 'storeCreate',
    `own settle=${Object.prototype.hasOwnProperty.call(ns, 'settle')} namespace=[${Object.keys(ns).sort().join(',')}]`);
  A('JSG-14.3', '§2.4 item 9 (f)\'s clause of 2026-10-18 (the twelve, the two singles NAMED) read with §2.12 item 2 — "the call takes NO argument at all (arity `0`)"', 'the registered-constraint read declares exactly ZERO parameter positions, and returns a FRESH array',
    typeof i14.constraints === 'function' && i14.constraints.length === 0
      && Array.isArray(i14.constraints()) && i14.constraints() !== i14.constraints(),
    `constraints.length=${i14.constraints && i14.constraints.length}/fresh=${(() => { try { return i14.constraints() !== i14.constraints(); } catch { return 'threw'; } })()}`);
  // ── THE ONE CLASS TEST, DRIVEN AT THE POSITION THAT STILL CARRIES IT (`PAR-JS-20`; `§2.4` item 9 (g) item 1)
  //    — the SAME seven outside values the old `JSG-14.4` drove at the removed seam, at `write`'s fifth.
  const sRow = (value) => {
    const inst = ns.storeCreate(mk('g14-' + String(Math.random()).slice(2, 8)));
    inst.write(['g14-seed'], 'mem', 0);
    return value === ABSENT ? thrown(() => inst.write(['g14-pos'], 'mem', 1))
      : thrown(() => inst.write(['g14-pos'], 'mem', 1, value));
  };
  const sRows = [sRow(null), sRow('str'), sRow(1), sRow(1n), sRow(true), sRow(Symbol('s')), sRow(() => {})];
  const sForm = [];
  const sBad = [];
  const sStatus = [];
  const sMsg = [];
  for (const [k, r] of sRows.entries()) {
    const f = formOf(r.err);
    const isTypeError = r.threw && r.err instanceof TypeError && r.err.constructor === TypeError;
    const msgIsString = r.threw && typeof r.err.message === 'string';
    sForm.push(`#${k}:{${f.members.join(',')}}/class=${r.threw ? clsName(r.err) : 'no throw'}${isTypeError ? '' : '/NOT-TypeError-and-nothing-else'}${msgIsString ? ` msg=${fmt(r.err.message)}` : '/NO-STRING-MESSAGE'}`);
    if (!isTypeError) sBad.push(`#${k}:${r.threw ? `${clsName(r.err)} (not the declared TypeError-and-nothing-else)` : `returned ${fmt(r.value)}`}`);
    if (r.threw && hasStatus(r.err)) sStatus.push(`#${k}:{${f.members.join(',')}}`);
    if (!msgIsString) sMsg.push(`#${k}:${r.threw ? typeof r.err.message : 'no throw'}`);
  }
  // RE-AIMED 2026-10-18: THE CLAUSE CITED IS `§2.4` ITEM 9 (b) AS RE-SPELLED 2026-10-15, READ AT THE POSITION
  // `parameter-semantics.md §2.19`'s clause of 2026-10-18 NAMES AS ITS SURVIVING HOME. The subject — every
  // declared out-of-domain RECORD POSITION, one form, one class — is UNCHANGED.
  A('JSG-14.4', '§2.4 item 9 (b) AS RE-SPELLED 2026-10-15, read at §2.4 item 9 (g) item 1\'s record-position test and `parameter-semantics.md §2.19`\'s clause of 2026-10-18 (the class test STANDS AT THE WRITE\'S FIFTH POSITION, `PAR-JS-20`) — "the error class is `TypeError` (an instance of it, and of nothing else), its `status` member MUST BE ABSENT … and a STRING `message` member is REQUIRED and NOT FORBIDDEN"',
    'every declared out-of-domain RECORD POSITION at `write`\'s FIFTH POSITION (`null`, each primitive, a function) is refused in the ONE form 9 (b) declares: an instance of `TypeError` and of nothing else, with its `status` member ABSENT and a STRING `message` member present — one form, one class',
    sRows.length === 7 && sBad.length === 0 && sStatus.length === 0 && sMsg.length === 0,
    `outside=[${sBad.join(' | ')}] carryingStatus=[${sStatus.join(' | ')}] messageNotAString=[${sMsg.join(' | ')}] forms=${sForm.join(' ')}`);
  const rProxy = (() => { const inst = ns.storeCreate(mk('g14-proxy')); return thrown(() => inst.write(['p'], 'mem', 1, new Proxy({}, {}))); })();
  const rAbsentRow = sRow(ABSENT);
  const rUndefRow = sRow(undefined);
  const f9b = (r) => r.threw && r.err instanceof TypeError && r.err.constructor === TypeError
    && !hasStatus(r.err) && typeof r.err.message === 'string';
  const d9b = (r) => (r.threw
    ? `{${formOf(r.err).members.join(',')}}/class=${clsName(r.err)}/msg=${typeof r.err.message === 'string' ? fmt(r.err.message) : typeof r.err.message}`
    : `returned ${fmt(r.value)}`);
  // RE-AIMED 2026-10-18 — the same re-aiming as `JSG-14.4`'s, and the SAME three readings: the `Proxy` row,
  // the ABSENT position driven by CALL ARITY, and an explicit `undefined`. `§2.4` item 9 (a)'s table still
  // carries all three rows; only the position they are read at has moved.
  A('JSG-14.5', '§2.4 item 9 (a)\'s `Proxy` row and its ABSENT/`undefined` row, read with 9 (b) AS RE-SPELLED 2026-10-15, AT `write`\'s FIFTH POSITION where `parameter-semantics.md §2.19`\'s clause of 2026-10-18 puts the surviving class test (`PAR-JS-20`): `TypeError` and nothing else, `status` member ABSENT, a STRING `message` member REQUIRED and NOT FORBIDDEN; §2.2 clause 4 (the fifth position\'s own arity law)',
    'a `Proxy` value and an explicit `undefined` are refused in the SAME form 9 (b) declares — an instance of `TypeError` and of nothing else, with no `status` member and a string `message` — while the ABSENT position is IN DOMAIN at this position and NOT refused at all (`§2.2` clause 4: *"the position ABSENT — OPENS OR JOINS ITS COMMIT AND PROCEEDS WHETHER OR NOT A COMMIT WAS SUPPLIED (IN DOMAIN)"*), so the refusal\'s subject is the POSITION and never an identity\'s adoption history',
    f9b(rProxy) && f9b(rUndefRow) && rAbsentRow.threw === false,
    `proxy:${d9b(rProxy)} undefined:${d9b(rUndefRow)} absent:${rAbsentRow.threw ? `THREW ${d9b(rAbsentRow)}` : `returned ${fmt(rAbsentRow.value)} (IN DOMAIN, as §2.2 clause 4 declares)`}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-15 — THE BARE CALLER-MADE WRITE: ITS INSTANT (THE STORE CALL'S, NOT THE VERB'S RETURN)   3 assertions
//                                                                    (CELLS ADDED 6-8 — all package-observable)
// ── ⟶ RE-DERIVED WHOLE, 2026-10-18 (`role_test_writer`). THE PREMISE THE HEADER ABOVE STATED IS DEAD ON TWO
// RULINGS, AND THE CELLS MOVE WITH IT RATHER THAN GOING RED:
//   (i) **`§2.4` item 9 (e) CARRIES `SUPERSEDED-WHOLE` DATED 2026-10-15** on `RCA-9`: *"EVERY WRITE, WITH OR
//       WITHOUT A SUPPLIED `commit`, OPENS OR JOINS A COMMIT AND PROCEEDS THROUGH THE FLOW, SO NO WRITE IS A
//       `BARE CALLER-MADE WRITE`"* — so the class this block is named for DOES NOT EXIST.
//  (ii) **`§2.12` item 1's clause of 2026-10-18 REMOVES THE ENTRY'S `carriesConstraintAt` GATE**, so the
//       four-position call *"enters `K-2` at EVERY address"* and *"the registry's own emptiness is no longer a
//       branch of the write path"*.
// **WHAT SURVIVES IS THE OBSERVABLE EACH CELL ALREADY READ, AND IT IS THE SAME OBSERVABLE**: the write still
// delivers its listeners, ONCE PER RETURNED HANDLE, with the triggering address as the single argument — and
// `§2.12` item 1's amended clause names exactly that as the reading: *"the observable a drive reads is the
// INVOCATION COUNT of that write's own listeners — not whether the kernel was consulted"*. **THE INSTANT MOVES
// TOO, ON `§2.7`'s CLAUSE OF 2026-10-18, ITEM `2`, WHICH IS SINGLE-VALUED ABOUT IT**: item 2's window *"IS READ
// FROM THIS DATE AS THE WINDOW BETWEEN THE STORE CALL'S COMPLETION AND `K-2`'S RETURN … AND IS NO LONGER READ AS
// AN INVOCATION INSTANT OF ITS OWN, because item `7` supplies the invocation instant and the two are one
// instant and not two"*. **SO `verb-returned=false` IS STILL THE RIGHT SIGN — the body runs before the package
// verb returns — and the clause that fixes it is `§2.7`'s 2026-10-18 clause, item `2`, read with `§2.12` item
// 1's amended clause of the same date.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i15 = ns.storeCreate(mk('g15'));
  const bareCalls = [];
  let bareWriteReturned = false;
  thrown(() => i15.write(['bare-a'], 'temp', {}));
  // ⟶ DRIVE RE-DERIVED 2026-10-24 (THE `D-19` CRASH FIX): three caller-spelled handles, each passed at
  // position `1` with its address as the one-member SET at position `2`, and `register` at the same spelling.
  // The cells below read INVOCATION COUNTS, so their subject is untouched and they measure the same behaviour.
  const H_BARE_A = listenSpelling('g15-bare-a');
  const H_BARE_K = listenSpelling('g15-bare-a-k');
  const H_BARE_OFF = listenSpelling('g15-bare-off');
  i15.listen(H_BARE_A, [['bare-a']]);
  i15.listen(H_BARE_K, [['bare-a', 'k']]);
  i15.listen(H_BARE_OFF, [['bare-off']]);
  const WRITTEN_BARE = ['bare-a', 'k'];
  const bareBody = (tag) => (addr) => {
    // THE BODY'S OWN FINDING, THE ONE OBSERVABLE ITEM 2 NAMES: the store call has COMPLETED (the address the
    // write was made at already answers the written value, so its record is what the invocation reads) and the
    // package's verb has NOT yet returned to the caller.
    const rr = thrown(() => i15.read(WRITTEN_BARE));
    bareCalls.push(`${tag}:verb-returned=${bareWriteReturned}:read=${rr.threw ? `threw ${String(statusOf(rr))}` : fmt(rr.value)}:arg=${Array.isArray(addr) ? `[${addr.map(fmt).join(',')}]` : fmt(addr)}`);
  };
  i15.register(H_BARE_A, bareBody('a'));
  i15.register(H_BARE_K, bareBody('k'));
  i15.register(H_BARE_OFF, bareBody('off'));
  const wBare = thrown(() => { const r = i15.write(WRITTEN_BARE, 'temp', 1); bareWriteReturned = true; return r; });
  // RE-AIMED 2026-10-15 — `§2.7` item 2 AS RE-SPELLED measures this instant from THE STORE CALL's completion
  // and the record's copy-out and NOT from the package verb's return; the pre-re-spelling cell asserted the
  // opposite sign of the same flag. The cell is RE-DERIVED and not weakened: its subject (the bare write's
  // delivery instant), its drive and its two returned handles are unchanged, and the observable asserted is now
  // item 2's own — each body's finding of the record copied out AND of the package's verb not yet returned.
  A('JSG-15.1', '§2.7\'s clause of 2026-10-18, item `2` (item 2\'s window is READ AS THE WINDOW BETWEEN THE STORE CALL\'S COMPLETION AND `K-2`\'S RETURN, and IS NO LONGER READ AS AN INVOCATION INSTANT OF ITS OWN — item `7` supplies the invocation instant), read with §2.12 item 1\'s amended clause of the same date, item `2` (ii) ("the observable a drive reads is the INVOCATION COUNT of that write\'s own listeners — not whether the kernel was consulted") and §2.7 item `5` (the single argument)',
    'a write at an address carrying NO pair STILL DELIVERS ITS LISTENERS — the removed gate does not bypass the kernel and the uniform path does not lose the delivery: each of the two bodies of the returned set ran with the written value ALREADY READABLE (the store call complete) and with the package\'s verb NOT yet returned, which is the window §2.7\'s 2026-10-18 clause declares — no body of the returned handles ran at an instant that clause does not declare',
    !wBare.threw && bareCalls.length === 2
      && bareCalls.every((c) => c.includes('verb-returned=false') && c.includes(`read=${fmt(1)}`)),
    `${bareCalls.join(' | ') || 'no invocation'} (caller-spelled handles: ${[fmt(H_BARE_A), fmt(H_BARE_K)]})`);
  const bareBefore = bareCalls.length;
  const wBare2 = thrown(() => i15.write(['bare-a', 'k'], 'temp', 2));
  A('JSG-15.2', '§2.7\'s clause of 2026-10-18, item `1` ("THE DELIVERY OF THAT WRITE\'S TRIGGERED HANDLES IS THE PASS\'S TERMINAL ARM\'s") read with item `7` (a) ("each ONCE, with the triggering address as its single argument") and §2.12 item 1\'s amended clause of the same date, item `2` (ii)',
    'NO WRITE WITHHOLDS ANYTHING ANY MORE, and the count proves it: the two registered bodies for the returned handles each run exactly once, on every write and by every route — the entry no longer makes a delivery decision at all (§2.7\'s 2026-10-18 clause, item `1`: "it cannot withhold them, because a withholding is a choice about a delivery the entry no longer makes")',
    !wBare2.threw && bareCalls.length - bareBefore === 2, `invocations=${bareCalls.length - bareBefore}`);
  const i15f = ns.storeCreate(mk('g15f'));
  const failedCalls = [];
  const discarded = {};
  thrown(() => i15f.write(['bare-cc'], 'mem', {}));
  const H_DISCARD = listenSpelling('g15-bare-cc');
  i15f.listen(H_DISCARD, [['bare-cc']]);
  i15f.register(H_DISCARD, () => { failedCalls.push('kind-conflict'); });
  discarded.w = thrown(() => i15f.write(['bare-cc'], 'mem', [1]));   // kind-conflict: it must not fire
  const i15g = ns.storeCreate(mk('g15g'));
  const earlyCalls = [];
  thrown(() => i15g.write(['bare-lf'], 'temp', 1));
  const H_EARLY = listenSpelling('g15-bare-lf-down');
  i15g.listen(H_EARLY, [['bare-lf', 'down']]);
  i15g.register(H_EARLY, () => { earlyCalls.push(1); });
  const wEarly = thrown(() => i15g.write(['bare-lf', 'down'], 'temp', 2));   // no event fires
  A('JSG-15.3', '§2.7 item 6 (the discard: "not delivered, and not left pending for a later deliverer"); §2.7 item 7 (d) ("A BODY OF THAT FAILED WRITE\'S OWN TRIGGERED SET THAT RAN … IS A FAILURE"); §2.4 item 9 (d); store §8.1 #7 (F-4)',
    'a write that does not succeed delivers ZERO to a body registered at its address — on the kind-conflict failure and on the failure that resolves no event at all — and no body of either write ran',
    discarded.w.threw && failedCalls.length === 0 && wEarly.threw && earlyCalls.length === 0,
    `kind-conflict: threw=${discarded.w.threw} status=${String(statusOf(discarded.w))} invocations=${failedCalls.length} | no-event: threw=${wEarly.threw} invocations=${earlyCalls.length}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-16 — THE FIRING AT THE PAIR-ADOPTED ADDRESS: THE CELL THE ARCHITECT'S RULING RE-DERIVED FROM A SPLIT
// ⟶ A SPLIT ONCE STOOD AT THIS CELL (2026-10-15: `§2.7` item 6 against `§2.4` item 8 (c) as amended on
// `A115` (D2), both readings printed, no side taken; `docs/next-steps.md` · `N7` item 1, the `250` · `247` ·
// `3` tree) — AND THE ARCHITECT'S RULING HAS LANDED: `§2.7` item 6 GOVERNS THE FIRING ("FOR A WRITE, THE
// SURFACE RUNS THE WRITE'S TRIGGERED CONSTRAINTS FIRST, AND THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY
// CONSTRAINT HAS PASSED"), WHILE `§2.4` item 8 (c) IS A REGISTRATION-side statement — which identity the
// app's `on` holds at an address the home entry already carries, which slot it replaced, which function the
// pass evaluates — AND IT OVERREACHED BY DERIVING NON-DELIVERY FROM THAT BOOKKEEPING FACT: THOSE
// DERIVATIONS ARE SUPERSEDED. SO AT AN ADDRESS A CONSTRAINT PAIR HOLDS, A LISTENER REGISTERED THERE IS OWED
// ONE FIRING, AFTER THE PASS — NOT ZERO.
// (CITED TEXT: the re-scoping remand has NOT landed in `docs/specs/storeroom-js/surface.md` at this pass —
// `§2.4` item 8 (c) still stands as amended 2026-10-15 and `§2.7` item 6 still stands as landed 2026-10-15 —
// so this cell cites BOTH CLAUSES AS THEY STAND PLUS THE RULING `A116`/`A114` (D1): A114's own words are
// "Constraints pass flows to the listeners (which are discarded if write fails on constraints)"; `A112`.)
// ⟶ THE RULED OBSERVABLE, AND ITS SIBLING CONTROL: at the pair-adopted address the app's own registration is
// INVOKED EXACTLY ONCE, AFTER THE PASS — never inside the store verb's WINDOW — WITH THE TRIGGERING ADDRESS AS
// ITS SINGLE ARGUMENT; and the SAME registration spelled at the PROPER PREFIX fires EXACTLY ONCE on the same
// terms. The pass is reached ONLY through the kernel the ruling names (`kernel-surface.md §1` item 1's
// `constraint-kernel`: `K-1` `register(store, address, id, constraint)`, `K-2` `commit(store, address, tier,
// value)` and `K-3` `runAttempt(store, commit)` — `§2.1` items 1–3), which is why this cell, unlike the rest
// of this set, reaches a second module.
// ⟶ AND THE CELL'S EXPECTATION IS THE RULED ONE EVEN WHERE THE BUILD IS NOT: THIS ASSERTION IS EXPECTED RED
// UNTIL THE IMPLEMENTER'S FIX LANDS — it is REPORTED, and NO green of this set is weakened to carry it.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
const RULED_FIRING = [];   // the printed record of the ruled observable: one line per drive, PASS or RED
{
  const i16 = ns.storeCreate(mk('g16'));
  const ADOPTED = ['split'];
  const PREFIX = [];                       // the PROPER PREFIX of ADOPTED, at the root tier
  const fAdopted = [], fPrefix = [];       // the app's OWN bodies: one per address, each recording its firing
  let storeCallReturned = false;           // `K-2`'s own return: the store call the write's record is copied out of
  const body = (bag, tag) => (...inc) => {                 // the app's OWN body, its ARITY read off its own rest list
    const rr = thrown(() => i16.read(ADOPTED));
    // THE BODY'S OWN FINDING, the observable `§2.7` item 2 names: the store call has COMPLETED — the address the
    // write was made at already answers the written value, so the write's own record is what the body reads.
    bag.push({ tag, arg: inc[0], args: inc.length, storeCallReturned,
      read: rr.threw ? `threw:${String(statusOf(rr))}` : fmt(rr.value) });
  };
  let hPair = null, K_ERR = KERNEL_ERROR;
  if (kernel !== null) {
    const rK1 = thrown(() => K1(i16, ADOPTED, 'pair-of-jsg-16', () => true));   // `true` IS `ConstraintOutcome`'s PASS arm — the ONLY pass value (`kernel-surface.md §2.3` item 1)
    hPair = rK1.threw ? null : rK1.value; K_ERR = rK1.threw ? rK1.err : KERNEL_ERROR;
  } else { K_ERR = KERNEL_ERROR; }
  // ⟶ DRIVE RE-DERIVED 2026-10-24 (THE `D-19` CRASH FIX): `listen(handle, addresses)` — the caller spells the
  // handle at position `1` and the address travels as the one-member SET at position `2`; the route answers the
  // caller's own spelling, which is the identity `register` is given and the identity the delivery cells read.
  // `JSG-16.2`'s own comparison against K-1's handle is left as filed and is reported below: it read the OPAQUE
  // value `listen` used to answer, which the code no longer returns.
  const onRoute = (addr, fn) => {
    const h = listenSpelling(`g16-${addr.join('.')}`);
    const l = i16.listen(h, [addr]);
    if (l !== undefined) return { bad: 'listen did not answer undefined' };
    const r = i16.register(h, fn);
    if (r !== undefined) return { bad: 'register did not answer undefined' };
    return h;
  };
  const rOnSame = thrown(() => onRoute(ADOPTED, body(fAdopted, 'on at the pair-adopted address')));
  const rOnPrefix = thrown(() => onRoute(PREFIX, body(fPrefix, 'on at the proper prefix')));
  const rK2 = thrown(() => K2(i16, ADOPTED, 'temp', 1));       // the write whose constraints run FIRST
  storeCallReturned = !rK2.threw;
  const rK3 = rK2.threw ? { threw: true, err: rK2.err } : thrown(() => K3(i16, rK2.value));
  if (rK3.threw) RULED_FIRING.push(`THE DRIVE DID NOT COMPLETE — K3 threw ${String(rK3.err && rK3.err.status || '')}: ${String(rK3.err && rK3.err.message || rK3.err)}`);
  const drive = (kernel === null ? 'KERNEL ABSENT' : rK3.threw ? `K3 threw ${fmt(rK3.err)}`
    : rOnSame.threw ? `on(the address) threw ${fmt(rOnSame.err)}`
    : rOnPrefix.threw ? `on(the prefix) threw ${fmt(rOnPrefix.err)}`
    : rK2.threw ? `K2 threw ${fmt(rK2.err)}` : 'driven');
  const fired = (bag, want) => bag.length === 1 && rel(bag[0].arg, want) && bag[0].args === 1
    && bag[0].storeCallReturned === true && bag[0].read === fmt(1);
  const asSeen = (bag) => bag.length === 0 ? 'NO FIRING AT ALL'
    : bag.map((r) => `${r.tag}: count=${bag.length} arg=${fmt(r.arg)} args=${r.args} store-call-returned=${r.storeCallReturned} read=${r.read}`).join(' | ');
  A('JSG-16.1', 'RULED 2026-10-15 — `§2.7` item 6 ("FOR A WRITE, THE SURFACE RUNS THE WRITE\'S TRIGGERED CONSTRAINTS FIRST, AND THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY CONSTRAINT HAS PASSED") GOVERNS THE FIRING, its force being `docs/decisions.md` · `A114` (D1) ("Constraints pass flows to the listeners …") read with `A112`; `§2.4` item 8 (c) as amended 2026-10-15 (on `A115` (D2)) IS A REGISTRATION-side statement whose NON-DELIVERY DERIVATIONS THE RULING SUPERSEDES — it stands as the clause that fixes WHICH identity an `on` holds at a held address, which slot it replaced and which function the pass evaluates, and it is CITED HERE AS IT STILL READS (the re-scoping remand has not landed at this pass)',
    'AT THE PAIR-ADOPTED ADDRESS, ON A PASSING WRITE, THE APP\'S OWN REGISTRATION IS INVOKED EXACTLY ONCE, AFTER THE PASS — after the store call has completed and the write\'s own record is readable, never at a pre-pass instant — WITH THE TRIGGERING ADDRESS AS ITS SINGLE ARGUMENT, and NOT the pre-ruling 0 the superseded derivation owed',
    drive === 'driven' && fired(fAdopted, ADOPTED),
    `${drive} · the pair-adopted address ${fmt(ADOPTED)} — ${asSeen(fAdopted)} · the pair\'s handle=${hPair === null ? 'none' : (rOnSame.value === hPair ? 'the SAME identity on returned' : 'a DIFFERENT identity')}${K_ERR === null ? '' : ` · ${String(K_ERR)}`}`);
  A('JSG-16.1.c', 'the SAME ruling and the SAME clause — `§2.7` item 6 (the other listeners ARE reached once every constraint has passed), with `§2.7` item 3\'s prefix rule and the store\'s own descendant-inclusive trigger (`docs/specs/storeroom-native/write-and-read.md §6.5` item 3) read together: a registration at a PROPER PREFIX is one of the "other listeners", so the ruling owes it its firing too',
    'THE SIBLING CONTROL: the SAME app registration, spelled at the PROPER PREFIX of the pair-adopted address, is likewise invoked EXACTLY ONCE on a passing write — after the store call completed, with the TRIGGERING ADDRESS (the operation\'s own address, not the watched prefix) as its single argument',
    drive === 'driven' && fired(fPrefix, ADOPTED),
    `${drive} · the proper prefix ${fmt(PREFIX)} — ${asSeen(fPrefix)}`);
  RULED_FIRING.push(`JSG-16.1  · the pair-adopted address ${fmt(ADOPTED)} — ${asSeen(fAdopted)}`);
  RULED_FIRING.push(`JSG-16.1.c· the proper prefix ${fmt(PREFIX)} — ${asSeen(fPrefix)}`);
  // ── AN INSTRUMENT CONTROL, SO THE PAIR-ADOPTED ADDRESS'S `0` IS READ AS A DELIVERY-RESIDUE RESULT AND NOT AS A
  //    BROKEN REGISTRATION OR A BROKEN DRIVE: a THIRD registration, made the same way (`on`), at an address that
  //    no constraint pair holds, written through the package's own write verb. **⟶ RE-DERIVED 2026-10-18: the
  //    route this comment called "bare" is not a route any more** (`§2.4` item 9 (e) is `SUPERSEDED-WHOLE` on
  //    `RCA-9`; `§2.12` item 1's clause of 2026-10-18 removes the gate so every write enters the kernel).
  //    **WHAT THE CONTROL STILL FIXES, AND IT IS ALL IT EVER NEEDED TO: that THIS drive's registration, its
  //    argument shape and its store-call instrument each work AT AN ADDRESS NO PAIR HOLDS** — so the
  //    pair-adopted address's count is a delivery result and not a dead fixture. It still carries NO ruling on
  //    the pair-adopted address and takes NO side.
  const BARE = ['bare'];
  const fBare = [];
  const rOnBare = thrown(() => onRoute(BARE, body(fBare, 'on at a bare address')));
  const wBare = thrown(() => i16.write(BARE, 'temp', 2));
  const control = (kernel === null ? 'KERNEL ABSENT' : !drive.startsWith('driven') ? `MAIN DRIVE NOT CLEAN (${drive})`
    : rOnBare.threw ? `on(the bare address) threw ${fmt(rOnBare.err)}` : wBare.threw ? `write threw ${fmt(wBare.err)}` : 'driven');
  A('JSG-16.3', 'the instrument control — NO ruling and no side: `§2.12` item 1\'s amended clause of 2026-10-18, item `2` (ii) (an address carrying no pair STILL enters the kernel and the kernel\'s pass "evaluates NOTHING and PASSES, so the write proceeds to the terminal arm\'s delivery"), read with `§2.7` items `6`–`7` and item `5` (the single argument is the triggering address)',
    'A REGISTRATION MADE THE SAME WAY, at an address NO constraint pair holds, IS REACHED BY THE DELIVERER: the app\'s body fires EXACTLY ONCE on a write at its own address — after the store call returned and the write\'s own record is readable — with the TRIGGERING ADDRESS as its single argument, so the pair-adopted address\'s firing count in `JSG-16.1` is a delivery result and NOT a dead registration or a dead instrument',
    control === 'driven' && fired(fBare, BARE),
    `${control} · the bare address ${fmt(BARE)} — ${asSeen(fBare)}`);
  RULED_FIRING.push(`JSG-16.3  · INSTRUMENT CONTROL (no ruling, no side) — the bare address ${fmt(BARE)} — ${asSeen(fBare)}`);
  A('JSG-16.2', '`§2.4` item 8 (a) ("the store\'s `listen` mints nothing, the entry\'s own handle is returned unchanged") and 8 (b) ("the second `on` call RETURNS THE SAME OPAQUE IDENTITY THE FIRST RETURNED") — read as the REGISTRATION-side statement the ruling leaves standing; `kernel-surface.md §2.1` item 1 (K-1\'s adoption clause)',
    'the ruled firing\'s own PRECONDITION, and the registration-side fact item 8 (c) is scoped to: `on` at an address whose home entry already stands returns the SAME handle (`===`) — so the app\'s body and the evaluated pair share ONE identity, which is the bookkeeping item 8 (c) states and from which the ruling derives NO non-delivery',
    !rOnSame.threw && !rOnPrefix.threw && rOnSame.value === hPair && rOnPrefix.value !== hPair,
    `on(at the pair-adopted address)===K-1\'s handle:${rOnSame.threw ? `threw ${fmt(rOnSame.err)}` : rOnSame.value === hPair} on(at the proper prefix)===that handle:${rOnPrefix.threw ? `threw ${fmt(rOnPrefix.err)}` : rOnPrefix.value === hPair}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RUN'S OWN REPORT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('');
console.log('── THE FIRING AT THE PAIR-ADOPTED ADDRESS: THE RULED READING (ONE SIDE, NOT TWO) ──');
console.log('  THE RULING, AND WHAT IT MOVED: a SPLIT once stood here (2026-10-15, `§2.7` item 6 against `§2.4` item 8 (c) as amended, both readings printed, no side taken; `docs/next-steps.md` · `N7` item 1).');
console.log('  THE ARCHITECT HAS RULED, AND IT IS ASSERTED HERE: `§2.7` item 6 GOVERNS THE FIRING — for a write the triggered constraints run first and THE OTHER LISTENERS ARE REACHED ONCE EVERY CONSTRAINT HAS PASSED (its force: `docs/decisions.md` · `A114` (D1) with `A112`).');
console.log('  `§2.4` item 8 (c) IS A REGISTRATION-side STATEMENT — which identity the app\'s `on` holds at an address the home entry already carries, which slot it replaced, which function the pass evaluates — and ITS NON-DELIVERY DERIVATIONS ARE SUPERSEDED: at that address a registered listener is owed ONE firing, after the pass, not ZERO.');
console.log('  THE CLAUSE TEXT THIS CELL CITES: `§2.4` item 8 (c) as amended 2026-10-15 and `§2.7` item 6 as landed 2026-10-15 BOTH STAND AS PRINTED — the re-scoping remand had NOT landed in `docs/specs/storeroom-js/surface.md` when this cell was written, so the clauses are cited as they stand, WITH the ruling.');
for (const line of RULED_FIRING) console.log(`  ${line}`);
console.log('  DRIVE: the kernel route the ruling names — `K-1` register(store, address, id, constraint) · `K-2` commit(store, address, tier, value) · `K-3` runAttempt(store, commit) (`kernel-surface.md §1` item 1, `§2.1` items 1–3) — on the instance the package\'s own `storeCreate` returned.');
console.log('  OWED, AND NOT CLAIMED HERE: the seam\'s two instants as observables — the in-window invocation set EMPTY at instant (a) (`§2.4` item 9 (a)) and the residue delivered at instant (b) — remain the kernel\'s own two calls at the kernel\'s own boundary (§3 item 9 of the greens document); this cell drives the pass and reads the PACKAGE\'s deliverer.');
console.log('');
console.log('── THE TEN CELLS RE-DERIVED ON 2026-10-16 (`DEF-2026-10-16-A`), PLUS THE TWO THIS PASS ADDS, WITH THE VALUES THEY PRODUCED ──');
console.log('  `JSG-02.10`/`.11`/`.14`/`.15`/`.16` — RE-POINTED to the `settle` seam\'s terminal arm: `surface.md §2.11` clause 2 moved the file-tier save off the verb, and `A119` ruled the load side.');
console.log('  `JSG-10.16`–`.20` — RE-POINTED to the same route (class (ii)); `.19`\'s census WIDENED to the sixteen of `store §8.1`\'s dated clause of 2026-10-15; `.18`/`.19`/`.20` are the aggregates over that re-pointed set.');
for (const line of REDERIVED) console.log(`  ${line}`);
console.log('');
console.log('── THE RUN ─────────────────────────────────────────────────────────────────────────');
console.log(`SITE:  node bindings/js/greens/greens.mjs   (cwd: ${process.cwd()})`);
console.log(`ENTRY: ${new URL('../index.mjs', import.meta.url).pathname}`);
console.log(`ENTRY 2 (JSG-16.1 only): ${new URL('../src/constraint-kernel.mjs', import.meta.url).pathname}`);
console.log(`LAYER: ${LAYER}   APP LAYER: ${APP_LAYER}   (no APP-green is claimed)`);
console.log(`SCRATCH: ${ROOT}`);
for (const [sc, rec] of perScenario) console.log(`  ${sc}: ${rec.pass} PASS · ${rec.fail} FAIL   (${rec.pass + rec.fail} assertions)`);
console.log('────────────────────────────────────────────────────────────────────────────────────');
console.log(`AUTHORED ${authored} · EXECUTED ${executed} · PASS ${pass} · FAIL ${fail}`);
if (fail > 0) {
  console.log('');
  console.log('EVERY FAIL, ONE LINE EACH (scenario · expected-from-the-docs · observed · clause):');
  for (const f of fails) console.log(`  ${f.id} :: ${f.expectation} :: ${f.observed} :: [${f.clause}]`);
}
try { fs.rmSync(ROOT, { recursive: true, force: true }); } catch { /* the scratch is left for inspection */ }
process.exit(fail > 0 ? 1 : 0);
