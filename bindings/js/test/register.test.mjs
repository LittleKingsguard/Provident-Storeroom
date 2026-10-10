// THE REGISTER LAYER'S JS-SIDE HALF — `contract.md §5.5` (`P-SM-5`), `§5.7` (`P-TP-7`) and `§5.8`
// (`P-TP-8`), driven from the package's own boundary.
//
// `acceptance.md §4.4`: *"the typed register's `8` rows (`§5.1`–`§5.8`) are executed at the gate the plan's
// phase table names, each row printing its strategy id and its verdict, with `un-run` a FAILURE"*. The
// Rust-side runner (`bindings/js/tests/register_layer.rs`) drives `P-IM-1` · `P-IM-2` · `P-IM-3` · `P-SM-4` ·
// `P-SM-6`; the three rows whose subject is the PACKAGE's own state — the function registry (`P-SM-5`), the
// ESM boot and realm set (`P-TP-7`) and the handle boundary (`P-TP-8`) — are driven HERE. Together the two
// runners cover all `8`.
//
// **BUDGET:** `≤ 100` attempts per row, `≤ 400` total, `stop-after-5` failures per line, a PINNED SEED, and
// no clock. **`un-run` IS PRINTED AS A FAILURE.** **NO LINE OF THIS RUNNER IS `un-run`: the two lines that
// were — `P-SM-5`'s `S-REG` and `P-TP-8`'s `S-FIRE-WINDOW` invocation sub-half — are DRIVEN here, because
// the bounded correction pass of 2026-10-11 declared the registration site they needed** (`surface.md §2.4`
// item 5: `register(handle, listener) -> undefined`, the ONE extra member of the object `storeCreate`
// returned; the red set's CONTRACT FINDING 1, now closed).
//
// **⟶ AND THE SITE'S REFUSAL'S FORM WAS RE-DERIVED 2026-10-11, BECAUSE THE CLAUSE MOVED UNDER THIS FILE.**
// The as-filed site answered a bare JS `TypeError` (`§2.4` item 5 (d) as filed; `PAR-JS-12`'s as-filed
// exception clause) and **`A76`'s bounded declaration pass re-spells it: the registration site's refusal
// travels in `surface.md §2.5`'s SINGLE FORM with the store's closed-set `AddressMalformed`** (`§2.5` item 5
// (g); `parameter-semantics.md §2.12`'s second dated exception clause). **`S-REG`'s outside-value half and
// the predicate it rests on (`isRegistrationRefusal`) are re-derived to that clause**, and the two throw
// sites' separation is read as the SITE-versus-VERB distinction the second dated clause declares: *"a drive
// must still tell the two sites apart, while a `TypeError` escaping from a VERB, in any form, remains a
// FINDING."
//
// **⟶ ADDED 2026-10-11 (`role_test_writer`), DISCHARGING `§5.5`'s DATED RE-DERIVATION OF THE `S-WITHDRAW`
// LINE: BOTH OF THAT LINE'S ARMS ARE NOW DRIVEN, AND THE AS-FILED FORM DROVE ONE.** **THE ROW'S OWN OPERATIVE
// SUBJECT PRINTS TWO ARMS AND SAYS SO** (`docs/specs/storeroom-js/contract.md §5.5`, the bounded declaration
// pass's dated clause: *"a LATER `listen` AT THE SAME ADDRESS MINTS A NEW HANDLE **WHERE THE WITHDRAWAL
// REMOVED THAT ADDRESS'S HOME ENTRY**, and returns the EXISTING entry's handle where the address is STILL
// REGISTERED — so the withdrawn case and the still-registered case are TWO arms and the cell asserts BOTH"*;
// `§2.3` item 6; `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c)). **As filed this file
// drove the WITHDRAWN arm and named the mint in a comment whose subject read as the rule for *"the same
// address"*; the arm it lacked — a `listen` at a STILL-REGISTERED address, whose declared answer is the
// EXISTING entry's handle and NO second registry entry — is driven at `S-WITHDRAW` below, with every
// as-filed assertion of the withdrawn arm KEPT VERBATIM and no line's attempts moved (`10`).**

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = dirname(HERE);
const PKG = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));

// `S-ONE-ADDON` (*"exactly one `.node` load"*): the runtime's own loader is intercepted BEFORE the entry is
// reached, and the count is read after exactly one instance construction (`§1.2` item 1). The entry is taken
// by DYNAMIC import for that reason — a static import would be hoisted above this interception.
let nativeLoads = 0;
const realDlopen = process.dlopen;
process.dlopen = function countingDlopen(...args) {
  nativeLoads += 1;
  return realDlopen.apply(this, args);
};

const api = await import('@provident-storeroom/js');
const { storeCreate, read, write, delete: remove, rollback, listen, unlisten } = api;
// A pinned seed and a SplitMix64 step — pure arithmetic, so every printed verdict is reproducible.
const SEED = 0x5eed20261011n;
function * draw(attempt) {
  let state = (SEED ^ (BigInt(attempt) * 0x9e3779b97f4a7c15n)) & 0xffffffffffffffffn;
  while (true) {
    state = (state + 0x9e3779b97f4a7c15n) & 0xffffffffffffffffn;
    let z = state;
    z = ((z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n) & 0xffffffffffffffffn;
    z = ((z ^ (z >> 27n)) * 0x94d049bb133111ebn) & 0xffffffffffffffffn;
    yield Number((z ^ (z >> 31n)) % 1000n);
  }
}

/// **THE ARTIFACT THIS FILE'S OWN FIGURES NAME, MINTED BY THE RUNNER AND READ BACK BY `S-LAYER`** —
/// `acceptance.md §4.2` item 1: *"THIS UNIT'S JS-SIDE GREEN IS `ENVELOPE/PURE`, AND THE LABEL TRAVELS WITH
/// EVERY FIGURE … Every reported figure names its SITE (the command and the directory it ran in) and its
/// LAYER"*, with item 2 (*"the ASSEMBLED/`APP` LAYER for this unit is `NONE`"*) and item 3 (*"NO `APP`-GREEN
/// MAY BE CLAIMED FROM A NODE TEST"*). **THE AS-FILED `S-LAYER` LINE ASSERTED OVER LITERALS TYPED INSIDE ITS
/// OWN CELL — `sites = [...]`, `layers = ['ENVELOPE/PURE', …]` — so it could not fail (gate 4's §B finding);
/// THIS RECORD IS THE RUNNER'S OWN OUTPUT and the line asserts over IT.**
const FIGURE = {
  site: `node --test, ${PACKAGE_DIR}`,
  layer: 'ENVELOPE/PURE',
  appGreenClaimed: false,
};

const LEDGER = [];
function row(id) {
  const r = { id, lines: [] };
  LEDGER.push(r);
  return r;
}
function line(r, sid, attempts, drive, unrunReason) {
  if (unrunReason) {
    r.lines.push({ sid, attempts: 0, failures: 0, unrun: true, reason: unrunReason });
    return;
  }
  let failures = 0;
  let run = 0;
  globalThis.__TRACE = [];
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    run += 1;
    if (!drive(attempt)) {
      if (sid === 'S-REG') console.log('S-REG TRACE:', JSON.stringify(globalThis.__TRACE));
      failures += 1;
      if (failures >= 5) break; // stop-after-5
    }
  }
  r.lines.push({ sid, attempts: run, failures, unrun: false });
}

function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

/// `surface.md §2.5` item 5 (b): **the reason is the CLASS the value HAS, named as `§1.2`'s or `§1.3`'s own
/// class** — *"never as a class the value could be converted to"*. The spelling is the package's own
/// (`bindings/js/index.mjs`'s `classSpelling`), read here as the REASON the message must carry, and the
/// position is read beside it (item 5 (b): *"THE POSITION IS THE ONE THING THIS SECTION DECLARES THAT THE
/// STORE'S OWN PHRASES DO NOT CARRY"*).
function classSpelling(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  const kind = typeof value;
  if (kind !== 'object' && kind !== 'function') return `a ${kind}`;
  if (Array.isArray(value)) return 'an Array';
  if (kind === 'function') return 'a function';
  return 'a plain object';
}

/// The failing TARGET rendered as the store's own generator renders it (`§2.5` item 5 (a)), with the
/// fallback the rendering itself must have: a target whose own rendering throws still yields a rejection
/// whose CLASS half is carried.
function targetSpelling(value) {
  try {
    if (typeof value === 'bigint') return `${value}n`;
    return String(value);
  } catch {
    return null; // a `Symbol`: the class half is the declared fallback and `classSpelling` asserts it
  }
}

/**
 * **⟶ THE REGISTRATION SITE'S REFUSAL, RE-DERIVED 2026-10-11 TO THE OPERATIVE DECLARED FORM.**
 *
 * **THE CLAUSE, CITED AT THIS CELL BECAUSE IT IS THE ONE THIS PREDICATE RESTS ON: `docs/specs/storeroom-js/
 * surface.md §2.5` item 5 (g)** — *"the registration site's refusal IS a rejection under `A76` and travels in
 * THIS section's single form, with its `status` drawn from the store's closed set — the store's own
 * `AddressMalformed`, whose declared trigger already covers 'a present argument outside its domain' and 'an
 * absent required argument' — and its `message` generated as clause (d) declares"* — **read with
 * `parameter-semantics.md §2.12`'s SECOND dated exception clause**, which states the same reconciliation at
 * that row (*"THE REGISTRATION SITE'S REFUSAL IS DELIVERED IN `… surface.md §2.5`'s SINGLE FORM —
 * `{status, message}` — with its `status` drawn from the store's CLOSED `15`-member set … the store's own
 * `AddressMalformed`"*, and *"the `TypeError` is the SHAPE the site was declared with at the bounded
 * correction pass of 2026-10-11"*).
 *
 * **WHAT THE PREDICATE ASSERTED BEFORE THIS RE-DERIVATION, AND WHY IT WAS WITHDRAWN:** the as-filed cell
 * required `err instanceof TypeError && !('status' in err)` — `surface.md §2.4` item 5 (d)'s and
 * `PAR-JS-12`'s as-filed `TypeError` — and **the operative clause re-spells exactly that form**: a `TypeError`
 * escaping a site of this package is a FINDING, and *"a `status` of `TypeError`, reached at the addon's own
 * boundary, is that finding and not a declared form, because the store's closed set holds no such member"*
 * (`surface.md §2.5` item 5 (e) and (g)). **SO THIS PREDICATE NOW ASSERTS THE DECLARED FORM AND ITS DECLARED
 * CONTENT — and it is STRONGER than the form it replaces rather than weaker:** the record's member set must be
 * EXACTLY `{status, message}`, the status must be the closed-set member `AddressMalformed`, and the message
 * must carry the failing TARGET (item 5 (a)), the CLASS that failed (item 5 (b), whose class half is
 * mandatory) and the POSITION (item 5 (b): a verb's ARGUMENT POSITION), because *"the rejection is verbose
 * where it carries two things: the failing target, and the reason"*. **A bare "an error occurred" is what
 * this predicate REFUSES.**
 */
function isRegistrationRefusal(site, target, position, why) {
  let thrown = null;
  try {
    site();
  } catch (err) {
    thrown = err;
  }
  if (thrown === null) return false;
  // The WITHDRAWN form is a FAILURE here, not a pass: a `TypeError` at any site of this package is a finding.
  if (thrown instanceof TypeError) return false;
  if (!(thrown !== null && typeof thrown === 'object' && !Array.isArray(thrown))) return false;
  if (Object.getPrototypeOf(thrown) !== Object.prototype) return false;
  if (Object.keys(thrown).sort().join(',') !== 'message,status') return false; // EXACTLY two members
  if (thrown.status !== 'AddressMalformed') return false; // the store's closed-set member, carried
  const message = String(thrown.message);
  if (message.length === 0) return false;
  // **THE REASON, IN ITS TWO DECLARED HALVES** (`§2.5` item 5 (b)): the CLASS that failed, and the POSITION.
  if (typeof why === 'string' && !message.includes(why)) return false;
  if (!message.includes(position)) return false;
  // **THE FAILING TARGET** (item 5 (a)): its own value, single-quoted by the generator's own rule — and the
  // generator's own two examples are asserted at the sites that spell them (`10n`, `Symbol()`).
  if (target !== null && !message.includes(target)) return false;
  return true;
}

// =============================================================================================
// `§5.5` `P-SM-5` — the registry's four rules, and the handle's two spellings  (40 attempts)
// =============================================================================================
const P_SM_5 = row('P-SM-5');

// **THE STATES ENUMERATED BEFORE `S-REG`'S DRIVE WAS AUTHORED** (`surface.md §2.4` item 5; `§5.5`'s
// `S-REG` line is *"the four rules, one drive each, reached through the declared registration site of
// `§2.4` item 5"*):
//
// | Its own clauses | The states this line drives |
// | --- | --- |
// | `§2.4` rule 1 / item 5 (c) | a registered listener for an ADOPTED handle · a registered listener for a MINTED handle (`listen`) · a handle with NO registration · an unrelated address's write |
// | `§2.4` rule 2 / item 5 (d) | a SECOND registration for the SAME handle (the first function is REPLACED and dropped without notice) |
// | `§2.4` rule 3 | the same handle registered TWICE — one invocation per DISTINCT handle, never a fan-out; and two construction entries carrying ONE token |
// | `§2.4` rule 4 / `DD-15` | a withdrawn registration (after `unlisten` the function never fires again) and BOTH arms of the later `listen` at that address — THE WITHDRAWN CASE (the withdrawal removed the entry ⇒ a FRESH handle and a NEW registry entry) and THE STILL-REGISTERED CASE (the `unlisten` ahead of it was one of `§2.3` item 4's no-op successes, which removes NOTHING ⇒ the EXISTING entry's handle, the SAME opaque value, and NO new registry entry) — `§5.5`'s dated re-derivation of this strategy line prints the two arms as a table |
// | item 5 (d) AS READ THROUGH `§2.5` ITEM 5 (g) — the OUTSIDE classes, EACH the ONE form with the store's closed-set `AddressMalformed`, its message carrying the target, the class and the position | a NON-FUNCTION `listener` · a handle this instance NEVER MINTED (fabricated, a bare `string`, a blank token, `null`, `undefined`, an ABSENT argument, a non-opaque object) · a handle a FOREIGN instance minted |
// | item 5 (b) | the return value of a success AND of a REPLACEMENT (`undefined` on both) |
// | `§2.7` item 2 | the invocation happens AFTER the verb returned |
// | **`§2.4` item 5 (e)** | the TWO throw sites are separated: a **VERB** answers `§2.5`'s `{status, message}`, and **a `TypeError` thrown by EITHER site is a FINDING** — the REGISTRATION's refusal travels in the SAME one form, drawn from the store's closed set (`§2.5` item 5 (g), the operative reading; `parameter-semantics.md §2.12`'s second dated clause) |
//
// `register` is reached through the INSTANCE and never through the module namespace (`acceptance.md §4.1`
// item 9; `surface.md §2.4` item 5 (a): it is not a ninth named export).
line(P_SM_5, 'S-REG', 20, (attempt) => {
  const rng = draw(attempt);
  const value = (n) => 1 + n;

  // --- `§2.4` item 5 (e): THE TWO THROW SITES ARE `§2.4` item 5 (e), AND THE FIRST HALF OF THE DRIVE IS
  //     THE SEPARATION ITSELF. A VERB answers `§2.5`'s `{status, message}` — NEVER a `TypeError`, which
  //     item 5 (e) calls a FINDING — and a REGISTRATION answers the bare `TypeError` of item 5 (d).
  const probe = mem();
  const verbSites = [
    () => read(probe, ['nope']), //                             AddressNotFound
    () => read(probe, ['a'], 'secure'), //                      OutOfDomainTier
    () => write(probe, ['a'], 'secure', 1), //                  OutOfDomainTier
    () => remove(probe, ['a'], 'secure'), //                    OutOfDomainTier
    () => listen(probe, 'not-an-address'), //                   AddressMalformed
    () => write(probe, ['a'], 'mem', () => {}), //              ValueNotAdmitted
    () => rollback(probe, 'no-such-op'), //                     JournalOpUnknown
  ];
  for (const verb of verbSites) {
    let thrown = null;
    try {
      verb();
    } catch (err) {
      thrown = err;
    }
    if (thrown === null) return false; // the declared failure of a VERB crossed as nothing
    if (thrown instanceof TypeError) return false; // item 5 (e): a `TypeError` thrown by a VERB is a FINDING
    if (typeof thrown.status !== 'string' || !thrown.message) return false;
  }

  // --- `§2.4` rule 1 (registered half) and `§2.3` item 2: the handle is reached from a `triggered` list,
  //     and registering it makes the function fire — ONCE, and AFTER the verb returned (`§2.7` item 2).
  //     **THE ORDER IS THE TRACE'S, AND THAT IS THE ONLY OBSERVABLE `§2.7` ITEM 2 NAMES:** the listener
  //     pushes its own marker WHEN IT RUNS, and the caller's very next statement pushes the second marker —
  //     so a trace of `['listener', 'after-return']` puts the invocation after the verb's return and before
  //     the statement that follows it (which is what SYNCHRONOUS means here), and never before either.
  const adopted = mem([{ address: ['a'], handle: 'l1' }]);
  const adoptedHandle = write(adopted, ['a'], 'mem', value(rng.next().value)).triggered[0];
  const trace = [];
  let adoptedFired = 0;
  let sawCompleteRecord = false;
  let lastRecord = write(adopted, ['a'], 'mem', value(rng.next().value)); // the caller already holds one
  if (adopted.register(adoptedHandle, () => {
    adoptedFired += 1;
    sawCompleteRecord =
      lastRecord !== null && lastRecord.op.after.present === true && lastRecord.triggered.length === 1;
    trace.push('listener');
  }) !== undefined) {
    return false; // item 5 (b): the return is `undefined` on every success
  }
  trace.length = 0;
  lastRecord = write(adopted, ['a'], 'mem', value(rng.next().value));
  trace.push('after-return');
  if (adoptedFired !== 1) return false; // rule 1: a registered handle fires
  if (!(trace.length === 2 && trace[0] === 'listener' && trace[1] === 'after-return')) return false;
  if (!sawCompleteRecord) return false; // the record was COMPLETE and copied out before the window opened
  trace.length = 0;
  lastRecord = write(adopted, ['a'], 'mem', value(rng.next().value));
  if (adoptedFired !== 2) return false; // one invocation per trigger, never two and never none

  // --- rule 2: a SECOND registration for the SAME handle REPLACES the first, and drops it without notice.
  let replacedFired = 0;
  if (adopted.register(adoptedHandle, () => {
    replacedFired += 1;
    throw new TypeError('the SECOND function is the registered one');
  }) !== undefined) {
    return false; // item 5 (b): `undefined` on a REPLACEMENT too
  }
  let replacementThrew = false;
  try {
    write(adopted, ['a'], 'mem', value(rng.next().value));
  } catch (err) {
    replacementThrew = err instanceof TypeError && !('status' in err);
  }
  if (!replacementThrew) return false; // the replaced function is NOT the one invoked
  if (replacedFired !== 1) return false; // the second registration fired...
  if (adoptedFired !== 2) return false; // ...and the FIRST function did NOT (one handle, one function)

  // --- rule 4 (`DD-15`): after `unlisten`, the function "simply never fires again" — while the STORE's
  //     own home entry is gone. The re-`listen` mints a DIFFERENT handle whose registration is a NEW entry.
  const withdrawn = mem();
  const minted = listen(withdrawn, ['w']);
  let before = 0;
  let after = 0;
  withdrawn.register(minted, () => { before += 1; });
  write(withdrawn, ['w'], 'mem', value(rng.next().value));
  if (before !== 1) return false; // the minted handle fires while it stands
  if (unlisten(withdrawn, minted) !== undefined) return false;
  const afterWithdrawal = write(withdrawn, ['w'], 'mem', value(rng.next().value));
  if (afterWithdrawal.triggered.length !== 0) return false; // the STORE-side home entry is withdrawn
  if (before !== 1) return false; // and the function simply never fires again
  const again = listen(withdrawn, ['w']);
  if (again === minted) return false; // a DIFFERENT handle
  withdrawn.register(again, () => { after += 1; });
  write(withdrawn, ['w'], 'mem', value(rng.next().value));
  if (after !== 1) return false; // the NEW handle's registration is a NEW entry that fires

  // --- rule 1 (unregistered half): a handle with NO registration invokes nothing and reports nothing.
  const silent = mem([{ address: ['s'], handle: 'l-silent' }]);
  write(silent, ['s'], 'mem', 1); // no registration: no code, no warning, no log, and no throw

  // --- rule 3, READ THROUGH `§2.4`'s DATED CLAUSE OF 2026-10-11 (its twin at `contract.md §2.4`), WHICH
  //     SPLITS THE ONE SENTENCE INTO TWO INDEPENDENT OBSERVABLES: **(i) THE INVOCATION COUNT IS THE
  //     PACKAGE'S — ONE per DISTINCT identity** (*"so in CASE B the duplicate token's ONE function runs
  //     ONCE"*), **and (ii) THE ARRAY'S ELEMENT MULTIPLICITY IS THE STORE'S** — *"`triggered` crosses as a
  //     fresh JS array of the handles the store's own list carries … so in CASE B THE JS-OBSERVABLE
  //     `triggered` CARRIES THE TOKEN TWICE"*. Two CONSTRUCTION entries at one address carrying ONE token
  //     are therefore the store's own lawful duplicate AND ARE BOTH CARRIED (`DD-42`'s clause 3 ·
  //     `DD-39` · `write-and-read.md §6.5` item 12 (b) · `PAR-JS-15` · `crossing.md §1.3`) — while the
  //     registry still fires that ONE identity ONCE, never once per occurrence and never once per entry.
  //
  //     **AND THE AS-FILED FORM IS RE-EMITTED HERE, BESIDE THE READING THAT REPLACES IT, BECAUSE THE
  //     AS-FILED COMMENT JUSTIFIED ITS FIGURE FROM THE INVOCATION RULE — VERBATIM:** *"rule 3: one
  //     invocation per DISTINCT handle, never a fan-out — and two CONSTRUCTION entries at one address
  //     carrying ONE token are the store's own lawful duplicate (`triggered` carries it once)."* — **with
  //     the assertion `if (dupRecord.triggered.length !== 1) return false;`. THE SECOND HALF OF THAT
  //     SENTENCE IS THE INVOCATION RULE AND IT IS RIGHT AND IT STANDS BELOW, LIVE; THE ARRAY FIGURE THE
  //     FIRST HALF WAS READ INTO IS THE ONE THE RECONCILED CLAUSE REFUTES.**
  //     **AND THE TWO AS-FILED CODE LINES THAT STOOD UNDER IT ARE RE-EMITTED HERE, BYTE FOR BYTE, BESIDE
  //     THE FORM THAT CARRIES THEM NOW:** `dup.register(dupRecord.triggered[0], () => { dupFired += 1; });`
  //     — now `dup.register(dupRecord.triggered[0], (...args) => { dupFired += 1; dupArgs = args; });`, the
  //     SAME registration with the invocation's own view read at the call — and
  //     `if (dupFired !== 1) return false; // once per DISTINCT handle`, whose bytes stand below with the
  //     rule's second sentence appended and no byte of the as-filed line moved.**
  const dup = mem([
    { address: ['d'], handle: 'l-dup' },
    { address: ['d'], handle: 'l-dup' },
  ]);
  const dupRecord = write(dup, ['d'], 'mem', value(rng.next().value));
  if (dupRecord.triggered.length !== 2) return false; // (ii) THE ARRAY'S MULTIPLICITY IS THE STORE'S: TWICE
  // **MEMBER BY MEMBER, NEVER BY SIZE** (`A77`): each of the two members is the SAME opaque identity, each
  // carrying the caller's own token — so a boundary that collapsed the duplicate to one member breaks HERE,
  // and `triggered[0] !== triggered[1]` breaks a boundary that invented a SECOND identity.
  if (dupRecord.triggered[0] !== dupRecord.triggered[1]) return false;
  if (new Set(dupRecord.triggered).size !== 1) return false; // ...and the DISTINCT-identity count is ONE
  // (i) THE INVOCATION IS THE PACKAGE'S — a call counter on the function, and the invocation's OWN view
  // read at the call: `argc === 1`, and that ONE argument the TRIGGERING ADDRESS (`PAR-JS-12`; `§2.7` item 5).
  let dupFired = 0;
  let dupArgs = null;
  dup.register(dupRecord.triggered[0], (...args) => { dupFired += 1; dupArgs = args; });
  write(dup, ['d'], 'mem', value(rng.next().value));
  if (dupFired !== 1) return false; // once per DISTINCT handle — not one per occurrence, not one per entry
  if (dupArgs === null || dupArgs.length !== 1) return false; // the invocation's view is EXACTLY ONE argument
  if (JSON.stringify(dupArgs[0]) !== JSON.stringify(['d'])) return false; // ...and it is the TRIGGERING address

  // --- `§2.4` item 5 (d) AS IT IS READ TODAY (`§2.5` item 5 (g), the operative reading): EVERY OUTSIDE
  //     CLASS ANSWERS THE ONE FORM WITH THE STORE'S CLOSED-SET `AddressMalformed`, AND THE MESSAGE CARRIES
  //     THE TARGET, THE CLASS AND THE POSITION — and the IN-DOMAIN form is still a SUCCESS, so the predicate
  //     cannot be satisfied by a site that throws on everything.
  const mine = mem([{ address: ['a'], handle: 'l1' }]);
  const held = write(mine, ['a'], 'mem', 1).triggered[0];
  let heldFired = 0;
  if (mine.register(held, () => { heldFired += 1; }) !== undefined) return false;
  const stranger = mem();
  const fabricated = listen(stranger, ['x']);
  // One row per outside class: the site, the failing TARGET's own rendering (item 5 (a)), the CLASS the
  // reason must name (item 5 (b)) and the POSITION (item 5 (b)).
  const outside = [
    { call: () => mine.register(held, 42), target: targetSpelling(42), why: 'a number', pos: 'second argument' },
    { call: () => mine.register(held, 'not-a-function'), target: 'not-a-function', why: 'a string', pos: 'second argument' },
    { call: () => mine.register(held, null), target: 'null', why: 'null', pos: 'second argument' },
    { call: () => mine.register(held, undefined), target: 'undefined', why: 'undefined', pos: 'second argument' },
    { call: () => mine.register(held, {}), target: '[object Object]', why: 'a plain object', pos: 'second argument' },
    { call: () => mine.register(held), target: 'undefined', why: 'undefined', pos: 'second argument' }, // an ABSENT listener
    { call: () => mine.register(undefined, () => {}), target: 'undefined', why: 'undefined', pos: 'first argument' },
    { call: () => mine.register(null, () => {}), target: 'null', why: 'null', pos: 'first argument' },
    { call: () => mine.register('l1', () => {}), target: 'l1', why: 'a string', pos: 'first argument' }, // a bare token
    { call: () => mine.register('', () => {}), target: null, why: 'a string', pos: 'first argument' }, // the blank token's own target is the empty string
    { call: () => mine.register(`listener-${rng.next().value}`, () => {}), target: null, why: 'a string', pos: 'first argument' }, // a GUESSED token
    { call: () => mine.register({}, () => {}), target: '[object Object]', why: 'a plain object', pos: 'first argument' },
    { call: () => mine.register(fabricated, () => {}), target: '[object Object]', why: 'a plain object', pos: 'first argument' }, // a FOREIGN instance's value
    { call: () => mine.register(() => {}, () => {}), target: null, why: 'a function', pos: 'first argument' }, // a function as the handle
  ];
  for (const one of outside) {
    if (!isRegistrationRefusal(one.call, one.target, one.pos, one.why)) {
      console.log(
        `S-REG OUTSIDE MISMATCH: target=${one.target} pos=${one.pos} why=${one.why} ::`,
        (() => {
          try { one.call(); return 'NO THROW'; } catch (err) { return JSON.stringify(err); }
        })(),
      );
      return false;
    }
  }
  // NOTHING REACHES THE STORE IN ANY OF THOSE CASES (`item 5 (d)`), and no other registration is disturbed:
  const untouched = write(mine, ['a'], 'mem', 2);
  if (untouched.triggered.length !== 1 || heldFired !== 1) return false;
  return true;
});

line(P_SM_5, 'S-REG-DUP', 10, (attempt) => {
  // **`S-REG-DUP`: THE LAWFUL DUPLICATE'S TWO HALVES, DRIVEN ONE BY ONE** (`§2.4` rule 3, read through its
  // dated clause of 2026-10-11 — the twin at `contract.md §2.4` — with `DD-42`'s clause 3, `DD-39`,
  // `write-and-read.md §6.5` item 12 (b), `PAR-JS-15` and `crossing.md §1.3`'s returned-record rows).
  // Two construction entries at ONE address carrying the caller's SAME token: **the STORE's own declaration
  // governs the ARRAY, so `triggered` carries that token TWICE, element for element** — while **the
  // INVOCATION COUNT stays the PACKAGE's: ONE per DISTINCT identity, never one per occurrence and never one
  // per entry.**
  //
  // **AND THE AS-FILED CELL IS RE-EMITTED HERE, BESIDE THE READING THAT REPLACES IT — VERBATIM:** *"Two
  // construction entries at ONE address carrying the caller's SAME token: `triggered` carries it ONCE where
  // the store minted it, and the registry fires once per DISTINCT handle."* — **with the assertion
  // `return record.triggered.length === 1;`. THE INVOCATION CLAUSE OF THAT SENTENCE IS RIGHT AND IS DRIVEN
  // LIVE BELOW; THE ARRAY FIGURE IS THE ONE THE RECONCILED CLAUSE REFUTES.**
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l1' },
  ]);
  const record = write(inst, ['a'], 'mem', 1);
  if (record.triggered.length !== 2) return false; // THE STORE'S OWN LIST, CARRIED OUT ELEMENT FOR ELEMENT
  // MEMBER BY MEMBER, NEVER BY SIZE (`A77`): the two members are ONE identity — so a collapse breaks here.
  if (record.triggered[0] !== record.triggered[1]) return false;
  if (new Set(record.triggered).size !== 1) return false; // ONE distinct identity, not two
  // THE INVOCATION HALF: a call counter, `argc === 1`, and that ONE argument the TRIGGERING ADDRESS.
  let fired = 0;
  let seen = null;
  if (inst.register(record.triggered[0], (...args) => { fired += 1; seen = args; }) !== undefined) return false;
  write(inst, ['a'], 'mem', 2);
  if (fired !== 1) return false; // ONE per DISTINCT handle — never once per occurrence, never once per entry
  if (seen === null || seen.length !== 1) return false; // the invocation's view is EXACTLY ONE argument
  return JSON.stringify(seen[0]) === JSON.stringify(['a']); // ...and it is the TRIGGERING address
});

line(P_SM_5, 'S-OPAQUE', 10, (attempt) => {
  // **`§2.3` item 2, STRENGTHENED (gate 4's `JS-16`-class finding: *"`S-OPAQUE`'s probe is weak"* — it was a
  // substring scan of three spellings, so a wrapper that leaked its token to `Symbol.toStringTag`, or that
  // was not the DECLARED frozen memberless object at all, passed).** The clause declares the OUTPUT spelling
  // exactly: *"every handle a verb RETURNS is the package's **opaque JS value** wrapping the token, whose
  // token is PRIVATE and readable by no JS code; the package compares handle identity **internally**, by the
  // token it holds."* **SO THE PROBE ASSERTS THE DECLARED OBJECT'S OWN SHAPE — every own key (string and
  // symbol, enumerable or not), every own descriptor, its prototype, its extensibility, its frozen state and
  // every coercive spelling — and it does so over a MINTED handle AND an ADOPTED one, because the two
  // spellings are the two the section declares (`§2.3` item 2: IN is a plain string, OUT is the opaque).**
  const rng = draw(attempt);
  const token = `l${1 + rng.next().value}`; // a caller-spelled token the construction ADOPTS verbatim
  const minted = listen(mem(), ['x', rng.next().value]);
  const adopted = write(mem([{ address: ['a'], handle: token }]), ['a'], 'mem', 1).triggered[0];
  for (const [label, handle] of [['a MINTED handle', minted], ['an ADOPTED handle', adopted]]) {
    if (handle === null || typeof handle !== 'object') return false; // never the bare token
    if (Object.getPrototypeOf(handle) !== Object.prototype) return false;
    // EVERY OWN KEY, string and symbol, enumerable and not: a memberless value has none at all.
    if (Object.getOwnPropertyNames(handle).length !== 0) return false;
    if (Object.getOwnPropertySymbols(handle).length !== 0) return false;
    if (Object.getOwnPropertyDescriptors(handle) && Object.keys(Object.getOwnPropertyDescriptors(handle)).length !== 0) {
      return false;
    }
    // THE DECLARED FREEZE (`bindings/js/index.mjs`: *"**THE OPAQUE HANDLE**: frozen, memberless, and its
    // token is PRIVATE"*): a caller may not brand it, and a second freeze is a no-op.
    if (!Object.isFrozen(handle)) return false;
    // EVERY COERCIVE SPELLING THE TOKEN COULD LEAK THROUGH — and the two that a token-bearing wrapper
    // classically leaks through, `Symbol.toStringTag` and `Symbol.toPrimitive`.
    const spellings = [
      String(handle),
      `${handle}`,
      JSON.stringify(handle),
      Object.prototype.toString.call(handle),
      handle.toString(),
      handle.valueOf(),
      handle[Symbol.toPrimitive] ? handle[Symbol.toPrimitive]('string') : '',
      String(handle[Symbol.toStringTag] ?? ''),
      Object.keys(handle).join(','),
      Object.getOwnPropertyNames(handle).join(','),
      Object.getOwnPropertySymbols(handle).map(String).join(','),
      JSON.stringify(Object.getOwnPropertyDescriptors(handle)),
    ];
    for (const spelling of spellings) {
      const text = String(spelling);
      if (text.includes('listener-') || text.includes(token)) return false; // the token is readable
    }
    if (label === 'an ADOPTED handle' && String(handle) === token) return false;
  }
  // AND THE HANDLE IS NOT THE TOKEN'S OWN STRING EITHER — the IN spelling and the OUT spelling are two
  // (`§2.3` item 2: *"NEITHER DIRECTION IS THE OTHER'S"*).
  if (typeof adopted === 'string' || typeof minted === 'string') return false;
  // ...and `unlisten` over a bare string is the declared unknown-handle no-op, which is the OTHER half of
  // item 2 the probe keeps.
  const inst = mem();
  listen(inst, ['y']);
  const bare = unlisten(inst, 'l1') === undefined && unlisten(inst, token) === undefined;
  if (write(inst, ['y'], 'mem', 1).triggered.length !== 1) return false; // no other registration removed
  return bare;
});

line(P_SM_5, 'S-WITHDRAW', 10, () => {
  // **⟶ RE-DERIVED 2026-10-11 (`role_test_writer`), BECAUSE THE ROW OWED TWO ARMS AND THIS LINE DRIVED ONE.**
  // As filed this line's comment read, verbatim — *"`unlisten` withdraws the STORE-side home entry; a
  // re-`listen` at the same address mints a DIFFERENT handle whose registration is a NEW entry."* — and it
  // drove exactly that ONE case. **THE OPERATIVE SUBJECT OF THIS LINE IS PRINTED AT ITS OWN `§`, AND IT NAMES
  // TWO ARMS:** **`docs/specs/storeroom-js/contract.md §5.5`'s dated re-derivation of `S-WITHDRAW`** — *"after
  // `unlisten`, the function never fires again because the store-side home entry is gone and the id the
  // trigger would carry is no longer the registered one; a LATER `listen` AT THE SAME ADDRESS MINTS A NEW
  // HANDLE **WHERE THE WITHDRAWAL REMOVED THAT ADDRESS'S HOME ENTRY**, and returns the EXISTING entry's handle
  // where the address is STILL REGISTERED — so the withdrawn case and the still-registered case are TWO arms
  // and the cell asserts BOTH"* — **read with `§2.3` item 6** (the inherited mint rule: *"`listen(address)`
  // where the address IS ALREADY REGISTERED returns the EXISTING entry's handle and adds NO second entry"*,
  // inherited from `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c) with `A45`'s ONE home
  // entry per address) **and with `§2.3` item 4's no-op-success set** (`unlisten` over an unknown, a foreign,
  // a prior-session, a fabricated or a non-opaque value **removes NOTHING**). **AND THE AS-FILED FORM'S OTHER
  // HALF IS RIGHT AND STAYS FAIL-ABLE: the WITHDRAWN arm DOES mint a fresh handle and never re-uses the
  // withdrawn one, which is why the row's failure list's *"a re-`listen` that re-uses a withdrawn handle"*
  // stays FALSE OF THE BUILD** (`§5.5`).
  const inst = mem();
  const first = listen(inst, ['a']);
  unlisten(inst, first);
  const afterWithdrawal = write(inst, ['a'], 'mem', 1);
  const again = listen(inst, ['a']);
  const afterAgain = write(inst, ['a'], 'mem', 2);
  if (!(afterWithdrawal.triggered.length === 0)) return false; // the home entry is gone
  if (!(again !== first)) return false; // THE WITHDRAWN ARM: a FRESH token, never a re-use of the withdrawn one
  if (!(afterAgain.triggered.length === 1)) return false; // ...whose registration is a NEW entry that fires

  // **THE STILL-REGISTERED ARM — THE ARM THE ROW NAMED AND NO LINE DROVE** (`§2.3` item 4's no-op successes
  // remove NOTHING, so the address is STILL in the home when the later `listen` lands): **its observable is
  // that the later `listen` MINTS NOTHING and returns the EXISTING entry's handle — the SAME opaque value —
  // so NO new registry entry arises.** **EACH HALF IS ASSERTED APART, because the row's own clause says a
  // drive *"cannot satisfy one by asserting the other"*:** the SAME-VALUE half is the handle identity
  // (`===`, which `§2.3` item 2's opaque value makes assertable and which `§2.4` item 6 (b)'s registry lookup
  // *"by that identity and by nothing else"* makes consequential), and the NO-NEW-ENTRY half is driven at the
  // STORE's own surface — the home holds ONE entry, so a trigger at that address carries that ONE handle, and
  // the value the repeat returned WITHDRAWS that ONE entry, which a second, separately-registered entry could
  // not leave behind.
  const held = mem();
  const standing = listen(held, ['a']);
  let fires = 0;
  held.register(standing, () => { fires += 1; });
  if (write(held, ['a'], 'mem', 1).triggered.length !== 1) return false; // ONE home entry, ONE handle
  if (fires !== 1) return false; // and its function fires for it
  // (a) A NO-OP SUCCESS AHEAD OF THE LATER `listen`: an unknown handle and a FOREIGN instance's value both
  //     remove NOTHING (§2.3 item 4; PAR-JS-8), so the address is still registered when the repeat lands.
  const elsewhere = mem();
  const foreign = listen(elsewhere, ['a']);
  if (unlisten(held, 'listener-not-minted-here') !== undefined) return false; // the no-op success, still a success
  if (unlisten(held, foreign) !== undefined) return false; // a foreign value: the same no-op success
  if (write(held, ['a'], 'mem', 2).triggered.length !== 1) return false; // ...and it removed NOTHING
  // (b) THE REPEAT AT THE STILL-REGISTERED ADDRESS: MINTS NOTHING, returns the EXISTING entry's handle.
  const repeat = listen(held, ['a']);
  if (repeat !== standing) return false; // THE SAME opaque value — no second mint, no new registry entry
  // (c) AND THE NO-NEW-ENTRY HALF, OBSERVED AT THE STORE: ONE home entry still stands, so the trigger carries
  //     that ONE handle ONCE — and the value the REPEAT answered withdraws EXACTLY that entry, which is not
  //     what a second separately-registered value would leave behind.
  const standingRecord = write(held, ['a'], 'mem', 3);
  if (standingRecord.triggered.length !== 1) return false;
  if (standingRecord.triggered[0] !== standing) return false;
  if (fires !== 3) return false; // the SAME identity invoked once per trigger, never a fan-out
  if (unlisten(held, repeat) !== undefined) return false;
  if (write(held, ['a'], 'mem', 4).triggered.length !== 0) return false; // NO SECOND ENTRY EXISTS
  if (fires !== 3) return false; // and the withdrawn identity's function never fires again (rule 4's own half)
  return true;
});

// =============================================================================================
// `§5.7` `P-TP-7` — the package's boot, the realm claim and the handoff set  (30 attempts)
// =============================================================================================
const P_TP_7 = row('P-TP-7');

line(P_TP_7, 'S-LOAD', 5, () => {
  const inst = mem();
  return read(inst, []) !== undefined;
});

line(P_TP_7, 'S-ONE-ADDON', 5, (attempt) => {
  if (attempt > 0) return nativeLoads === 1; // read after the first construction, re-checked thereafter
  storeCreate({ journalLength: 1, listeners: [] });
  return nativeLoads === 1;
});

line(P_TP_7, 'S-HO', 7, (attempt) => {
  const realms = ['cjs', 'electron', 'renderer', 'worker', 'browser', 'ipc', 'preload'];
  const realm = realms[attempt % realms.length];
  const keys = Object.keys(PKG.exports);
  const namedExport = realm in PKG;
  return !keys.some((k) => k.includes(realm)) && !namedExport;
});

line(P_TP_7, 'S-LAYER', 5, () => {
  // **THE LINE ASSERTS OVER THE RUNNER'S OWN RECORD (`FIGURE`), NOT OVER LITERALS IN ITS OWN CELL** — the
  // artifact-read shape `acceptance.md §4.2` item 1 requires, and the repair of the as-filed line whose two
  // arrays made every conjunct true by construction.
  if (typeof FIGURE.site !== 'string' || !FIGURE.site.includes('node --test')) return false;
  if (!FIGURE.site.includes(PACKAGE_DIR)) return false; // the site names the directory it ran in
  if (FIGURE.layer !== 'ENVELOPE/PURE') return false; // §4.2 item 1's label for this unit's JS green
  if (FIGURE.appGreenClaimed !== false) return false; // §4.2 items 2–3: `APP` is `NONE`, and no node test claims one
  // AND THE RECORD IS CHECKED AGAINST THE PACKAGE'S OWN BYTES, so the artifact cannot drift from what it
  // reports: no `APP`-green claim appears anywhere in the package's documentation.
  const appGreenClaimed = /APP[- ]?(layer|green)\s*[:=]\s*(green|GREEN)/.test(
    readFileSync(join(PACKAGE_DIR, 'README.md'), 'utf8'),
  );
  return !appGreenClaimed;
});

// =============================================================================================
// `§5.8` `P-TP-8` — the handle's boundary domain, the trigger's membership and the no-op set (30)
// =============================================================================================
const P_TP_8 = row('P-TP-8');

line(P_TP_8, 'S-TRIGGER', 10, (attempt) => {
  const rng = draw(attempt);
  const inst = mem([
    { address: ['a'], handle: 'at-a' },
    { address: ['a', 'b'], handle: 'at-ab' },
    { address: [`z${rng.next().value}`], handle: 'at-z' },
  ]);
  // The containers the write runs through are created first: a write's parent is resolved BY ADDRESS.
  write(inst, ['a'], 'mem', {});
  write(inst, ['a', 'b'], 'mem', {});
  const onWrite = write(inst, ['a', 'b', 'c'], 'mem', 1);
  if (onWrite.triggered.length !== 2) return false;
  const onDelete = remove(inst, ['a', 'b'], 'mem');
  return onDelete.triggered.length === 2;
});

line(P_TP_8, 'S-NOOP', 10, (attempt) => {
  const rng = draw(attempt);
  const owner = mem();
  const stranger = mem();
  const kept = listen(owner, ['a']);
  const foreign = listen(stranger, ['a']);
  const noops = [
    unlisten(owner, foreign) === undefined,
    unlisten(owner, `listener-${rng.next().value}`) === undefined,
    unlisten(owner, '') === undefined,
    unlisten(owner, {}) === undefined,
    unlisten(owner, null) === undefined,
  ];
  const stillFires = write(owner, ['a'], 'mem', 1).triggered.length === 1;
  return noops.every(Boolean) && stillFires && kept !== undefined && foreign !== undefined;
});

line(P_TP_8, 'S-SET', 10, (attempt) => {
  // **GATE 4'S FINDING, REPAIRED: *"`S-SET` is satisfied by two sizes (`new Set(a).size === new Set(b).size`
  // passes for two DIFFERENT sets; the duplicate-member arm is unasserted)."*** The clause the row drives is
  // `§2.7` item 3 — *"this unit asserts MEMBERSHIP ONLY: a drive compares SETS, never sequences"* — so the
  // comparison is now MEMBER-BY-MEMBER, over a set whose membership is KNOWN from the construction, **and the
  // duplicate case the row's own text names is driven beside it** (`§2.4` rule 3: one invocation per DISTINCT
  // handle, not one per entry).
  //
  // **⟶ AND THE ROW'S ARRAY FIGURES ARE RE-DERIVED 2026-10-11 TO THE RECONCILED READING OF `§2.4` RULE 3
  // (its dated clause, the twin at `contract.md §2.4`): THE ARRAY'S MULTIPLICITY IS THE STORE'S — CARRIED
  // OUT ELEMENT FOR ELEMENT AND NEVER DEDUPLICATED AT THE BOUNDARY — WHILE THE INVOCATION COUNT IS THE
  // PACKAGE'S, ONE PER DISTINCT IDENTITY** (`DD-42`'s clause 3 · `DD-39` · `write-and-read.md §6.5` item 12
  // (b) · `PAR-JS-15` · `crossing.md §1.3`).
  // **THE AS-FILED COMMENT AND FIGURES ARE RE-EMITTED HERE, BESIDE THE READING THAT REPLACES THEM —
  // VERBATIM:** *"THREE entries, TWO distinct tokens: the declared set has EXACTLY TWO members — the
  // caller's token ONCE (`DD-42`'s lawful caller-spelled collision) plus the one minted beside it."* — with
  // `if (first.triggered.length !== 2) return false; // the duplicate is carried ONCE, not twice` and, for
  // the last arm, *"AND THE DUPLICATE CASE ON ITS OWN, with NOTHING but the duplicate: ONE member."* with
  // `if (write(dup, ['b'], 'mem', 1).triggered.length !== 1) return false;`. **THE SET'S MEMBERSHIP — TWO
  // DISTINCT IDENTITIES — IS UNMOVED AND IS STILL WHAT THE SET COMPARISON ASSERTS; THE ARRAY'S ELEMENT
  // MULTIPLICITY IS THE FIGURE THAT MOVED, from `2`/`1` to `3`/`2`, AND IT IS NOW READ OFF THE ARRAY
  // MEMBER BY MEMBER.**
  const rng = draw(attempt);
  const distinct = `l${1 + rng.next().value}`;
  // THREE entries, TWO distinct tokens: the declared SET has EXACTLY TWO members — the caller's token ONCE
  // (`DD-42`'s lawful caller-spelled collision) plus the one beside it — **while the ARRAY the store hands
  // across carries THREE members, because the duplicate is the STORE's and is not collapsed at the
  // boundary.**
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: distinct },
  ]);
  const first = write(inst, ['a'], 'mem', 1);
  const second = write(inst, ['a'], 'mem', 2);
  if (first.triggered.length !== 3) return false; // the duplicate is carried TWICE — three entries, three members
  if (second.triggered.length !== 3) return false;
  // MEMBER BY MEMBER: every id of the first enumeration is in the second, and every id of the second is in
  // the first — a comparison two DIFFERENT sets of the same size cannot pass.
  // **THE THREE AS-FILED LINES THIS BLOCK REPLACES ARE RE-EMITTED HERE, BYTE FOR BYTE, SO THE READER MEETS
  // BOTH READINGS AND NO BYTE IS DELETED:** `if (second.triggered.length !== 2) return false;` ·
  // `if (new Set(first.triggered).size !== 2) return false; // and the identities are DISTINCT, not one
  // repeated` · `// THE DUPLICATE ARM ITSELF: two entries carrying ONE token fire ONCE for the distinct
  // handle.` — **and the as-filed arm's closing `return true;`, which the duplicate-ONLY invocation half
  // below now carries instead.** **THE SET'S MEMBERSHIP FIGURE (`2` distinct identities) IS UNMOVED: the
  // member loop below counts exactly TWO identities, one of them TWICE.**
  for (const id of first.triggered) if (!second.triggered.includes(id)) return false;
  for (const id of second.triggered) if (!first.triggered.includes(id)) return false;
  // **AND THE MULTIPLICITY IS READ OFF THE ARRAY ITSELF, ONE MEMBER AT A TIME, WITH NO ORDER ASSERTED**
  // (`§2.7` item 3; `A77`): each member is matched to the identity it IS (`===`), the occurrence count is
  // kept per identity, and the multiset the array yields must be `{2, 1}` — ONE identity carrying TWO of the
  // three members (the store's lawful duplicate) and ONE carrying a single member. A boundary that collapsed
  // the duplicate yields `{1, 1}` and breaks on the third member; one that invented a third identity breaks
  // on the count of identities. **THIS IS THE MEMBER LOOP, AND NOT A `new Set(...).size` COMPARISON.**
  const occurrences = []; // one `[identity, occurrences]` pair per DISTINCT identity, in first-seen order
  for (const id of first.triggered) {
    const seen = occurrences.find((one) => one[0] === id);
    if (seen) seen[1] += 1;
    else occurrences.push([id, 1]);
  }
  if (occurrences.length !== 2) return false; // TWO distinct identities, counted member by member
  if (occurrences.filter(([, n]) => n === 2).length !== 1) return false; // exactly one carries the duplicate
  if (occurrences.filter(([, n]) => n === 1).length !== 1) return false; // ...and the other is carried ONCE
  // THE INVOCATION HALF, UNMOVED: the duplicate's ONE identity invokes ONCE per distinct handle, so the
  // three members (two identities) yield exactly TWO invocations — never one per entry.
  let invocations = 0;
  for (const id of first.triggered) inst.register(id, () => { invocations += 1; });
  write(inst, ['a'], 'mem', 3);
  if (invocations !== 2) return false; // one per DISTINCT handle, never one per entry
  // AND THE DUPLICATE CASE ON ITS OWN, with NOTHING but the duplicate: its array carries TWO members of ONE
  // identity, and its ONE function runs ONCE.
  const dup = mem([
    { address: ['b'], handle: 'l-dup' },
    { address: ['b'], handle: 'l-dup' },
  ]);
  const dupRecord = write(dup, ['b'], 'mem', 1);
  if (dupRecord.triggered.length !== 2) return false; // the store's own list, carried element for element
  if (dupRecord.triggered[0] !== dupRecord.triggered[1]) return false; // MEMBER BY MEMBER: ONE identity
  if (new Set(dupRecord.triggered).size !== 1) return false; // ...whose distinct-identity count is ONE
  let dupFired = 0;
  let dupArgs = null;
  dup.register(dupRecord.triggered[0], (...args) => { dupFired += 1; dupArgs = args; });
  write(dup, ['b'], 'mem', 2);
  if (dupFired !== 1) return false; // one invocation for the ONE distinct identity
  if (dupArgs === null || dupArgs.length !== 1) return false; // the invocation's view: EXACTLY ONE argument
  return JSON.stringify(dupArgs[0]) === JSON.stringify(['b']); // ...and it is the TRIGGERING address
});

line(P_TP_8, 'S-FIRE-WINDOW', 5, () => {
  // **`§2.7` ITEM 2 DECLARES THE WINDOW EXACTLY: *"the invocation is SYNCHRONOUS and happens AFTER the
  // store call has completed and the record has been copied out"*** — so the drive asserts the sequence and
  // nothing the clause does not fix: (i) the store's own call has completed and its result stands AT THE
  // MOMENT the listener runs, (ii) the invocation lands AFTER the verb's return and BEFORE control reaches
  // the statement following it (that is what SYNCHRONOUS means here, and it is the only observable the
  // clause names), (iii) the record the call RETURNS is complete — every member the window could need is
  // already in it, so no listener's fate can alter it, and (iv) a THROWING body (`§2.7` item 4, `DD-23`)
  // propagates and neither rolls back nor alters the store's result — the write stays applied.
  //
  // **AND THE ONE THING `§2.7` DOES NOT FIX IS DECLARED ONE ROW AWAY — AT `parameter-semantics.md §2.12`'s
  // `PAR-JS-12` `domain` CELL:** *"The package's invocation passes the triggering ADDRESS as its argument;
  // no other argument is declared and no return value is read."* **So the invocation half is DRIVEN here,
  // and its argument is asserted at the cell that declares it** — no other argument is asserted, because
  // the cell declares none.
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const handle = write(inst, ['a'], 'mem', 1).triggered[0];
  const trace = [];
  let insideWindow = null; // the store's own state AT THE MOMENT the listener runs
  let argCount = -1;
  let argAddress = null;
  inst.register(handle, (...args) => {
    argCount = args.length;
    argAddress = args[0];
    insideWindow = read(inst, ['a']);
    trace.push('listener');
  });
  // The listener runs INSIDE this call and the caller's very next statement is the SECOND trace marker:
  // `['listener', 'after-return']` therefore places the invocation after the verb's return and before the
  // statement that follows it. THE RECORD THE CALL RETURNED IS THEN CHECKED COMPLETE below, and the store's
  // own state as the listener found it is checked too — nothing the clause does not fix is asserted.
  const record = write(inst, ['a'], 'mem', 2);
  trace.push('after-return');
  if (!(trace.length === 2 && trace[0] === 'listener' && trace[1] === 'after-return')) return false;
  if (insideWindow !== 2) return false; // the store's call had completed BEFORE the window opened
  if (argCount !== 1) return false; // PAR-JS-12: the triggering ADDRESS, and NO other argument
  if (JSON.stringify(argAddress) !== JSON.stringify(['a'])) return false; // ...and it is the TRIGGERING address
  if (record.triggered.length !== 1 || record.op.after.present !== true) return false; // COMPLETE
  if (read(inst, ['a']) !== 2) return false; // ...and its result stands

  // The throwing-body half (`§2.7` item 4): the exception propagates out of the package's own invocation
  // loop, the write is already complete, and the store is neither rolled back nor altered.
  const thrown = mem([{ address: ['t'], handle: 'l-throw' }]);
  const thrownHandle = write(thrown, ['t'], 'mem', 1).triggered[0];
  let threw = false;
  thrown.register(thrownHandle, () => { throw new Error('the caller\'s own exception'); });
  try {
    write(thrown, ['t'], 'mem', 2);
  } catch (err) {
    threw = true;
  }
  if (!threw) return false; // NOT caught, NOT retried and NOT reported
  return read(thrown, ['t']) === 2; // the write stands
});

// =============================================================================================
// The runner's own report — printed, and asserted over the DRIVEN lines only
// =============================================================================================

test('register_js_side_three_rows_are_executed_with_strategy_ids_and_verdicts', () => {
  let total = 0;
  const unrun = [];
  for (const r of LEDGER) {
    for (const l of r.lines) {
      total += l.attempts;
      if (l.unrun) {
        unrun.push(`${r.id}/${l.sid}: ${l.reason}`);
        console.log(`ROW ${r.id} strategy=${l.sid} attempts=0 failures=0 verdict=UN-RUN (FAILURE)`);
        console.log(`  UN-RUN REASON: ${l.reason}`);
      } else {
        console.log(
          `ROW ${r.id} strategy=${l.sid} attempts=${l.attempts} failures=${l.failures} verdict=${
            l.failures === 0 ? 'HELD' : 'BROKEN'
          }`,
        );
      }
    }
    const driven = r.lines.filter((l) => !l.unrun);
    const broken = driven.filter((l) => l.failures > 0);
    const verdict = r.lines.some((l) => l.unrun) ? 'un-run (FAILURE)' : broken.length === 0 ? 'HELD' : 'BROKEN';
    console.log(`ROW ${r.id} attempts=${driven.reduce((n, l) => n + l.attempts, 0)} verdict=${verdict}`);
    assert.equal(broken.length, 0, `row ${r.id}: every DRIVEN line must be HELD`);
  }
  assert.ok(total <= 400, 'the register layer may not exceed 400 attempts');
  assert.equal(LEDGER.length, 3, 'three rows are driven at this boundary');
  console.log(
    `REGISTER JS SIDE attempts=${total} rows=3 driven_lines=${
      LEDGER.flatMap((r) => r.lines).filter((l) => !l.unrun).length
    } un_run_lines=${unrun.length}`,
  );
  // The runner REPORTS its un-run lines rather than hiding them: every one of them is a FAILURE of
  // `acceptance.md §4.4`. **AFTER THE 2026-10-11 REMAND THE SET IS EMPTY**, and the runner does not merely
  // assume that: the two lines that were `un-run` are asserted DRIVEN by the ledger itself (`unrun.length
  // === 0`), and the site they were repaired from is asserted reachable through the INSTANCE and absent
  // from the MODULE NAMESPACE — so a red set that silently returned to `un-run` could not pass.
  assert.equal(unrun.length, 0, 'no line of this runner is `un-run`: `un-run` IS A FAILURE (§2.4 item 5)');
  assert.equal(typeof storeCreate({ journalLength: 8, listeners: [] }).register, 'function');
  assert.ok(!('register' in api), '§2.4 item 5 (a): the site is not a ninth named export');

  // **`S-FAILFORM` IS ASSERTED HERE, AND THIS IS ITS OWN ARM — GATE 4'S `JS-15`-CLASS FINDING REPAIRED.**
  // The as-filed predicate was *"a `TypeError`-class check with a status half"* whose second disjunct was
  // implied by its first, so no input could fail it. **The record's member set is asserted to be EXACTLY
  // two, and its status asserted to be a member of the store's CLOSED `15`-member set** (`surface.md §2.5`
  // items 1–3: *"a THROWN plain object with EXACTLY TWO MEMBERS"*, *"`status` is the store's own member token
  // VERBATIM — one of the store's closed `15` members … never a package-minted code"*, `DD-40`).
  const THE_FIFTEEN = [
    'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
    'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch', 'WriteParentNotLink',
    'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing', 'FilePathUnreachable',
    'ValueNotAdmitted', 'FileCommitFailed',
  ];
  const formSites = [
    ['a VERB', () => read(mem(), ['gone'])],
    ['a VERB', () => rollback(mem(), 'no-such-op')],
    ['a VERB', () => storeCreate({ listeners: [] })],
    ['a REGISTRATION', () => storeCreate({ journalLength: 8, listeners: [] }).register(null, () => {})],
  ];
  for (const [site, drive] of formSites) {
    let thrown = null;
    try {
      drive();
    } catch (err) {
      thrown = err;
    }
    assert.ok(thrown !== null, `S-FAILFORM: ${site} must answer the one failure form`);
    assert.equal(
      Object.keys(thrown).sort().join(','),
      'message,status',
      `S-FAILFORM: ${site}'s record must carry EXACTLY the two declared members`,
    );
    assert.ok(
      THE_FIFTEEN.includes(thrown.status),
      `S-FAILFORM: ${site}'s status \`${thrown.status}\` is outside the store's closed set (DD-40: no code is minted)`,
    );
    assert.ok(typeof thrown.message === 'string' && thrown.message.length > 0, 'S-FAILFORM: the message is generated and never empty');
    assert.equal(Object.getPrototypeOf(thrown), Object.prototype, 'S-FAILFORM: the failure is a plain object of the caller realm');
    assert.ok(!(thrown instanceof Error), 'S-FAILFORM: no `Error` subclass (DD-12)');
  }
});

// =============================================================================================
// THE FIGURE'S OWN SITE AND LAYER, PRINTED FROM THE RECORD `S-LAYER` READS
// =============================================================================================

test('register_the_figure_names_its_site_and_its_layer_from_the_records_own_artifact', () => {
  // `acceptance.md §4.2` item 1: *"Every reported figure names its SITE (the command and the directory it
  // ran in) and its LAYER."* The record below is the one `S-LAYER` asserts over, printed so a reader of this
  // run's output has the site and the layer beside the figure (`DD-31`: the store's suite is NOT re-labelled
  // as this unit's, and no `APP`-green is claimed).
  console.log(`SITE ${FIGURE.site}`);
  console.log(`LAYER ${FIGURE.layer} (APP = NONE, app-green claimed: ${FIGURE.appGreenClaimed})`);
  assert.match(FIGURE.site, /^node --test, /, 'the site names the command');
  assert.equal(FIGURE.layer, 'ENVELOPE/PURE', 'the layer label travels WITH the figure');
  assert.equal(FIGURE.appGreenClaimed, false, '§4.2 items 2–3: `APP` is `NONE` for this unit');
});
