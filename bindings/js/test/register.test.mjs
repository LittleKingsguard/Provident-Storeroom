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

/**
 * **⟶ THE PAIR'S OWN READER AND THE LISTENER SPELLING, ADDED 2026-10-18 (`role_test_writer`, the
 * `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail).** `triggered` and `pending`'s element moved from a BARE
 * HANDLE to the pair `{handle, address}` (`trigger-and-pair.md §2` item 1, `§3` item 3, `§1` item 1), so an
 * as-filed `triggered.includes(handle)` compares a pair to a string and is ALWAYS FALSE — **`TF-1`'s exact
 * failure, *"a BARE HANDLE in `triggered` or in `pending`"*, read from the other side.** **The replacement
 * reads the pair's `handle` member, which is the SAME identity the as-filed line meant** (`§4` item 1:
 * *"both filters become PAIR-AWARE — they compare `entry.handle`, never `entry`"*). **AND `listen(address)` MOVES
 * TO `listen(handle, addresses)`, ARITY `1 → 2`, ANSWERING `undefined`** (`contract.md §2.2` items 1 and 10;
 * `PAR-HL-3`), so the `(register(listen(addr), fn) || listen(addr))` idiom is replaced by the two acts it
 * meant, with the handle the caller spells.
 */
let listenerSpellingSeq = 0;
function listenAndRegister(store, address, listener) {
  listenerSpellingSeq += 1;
  const handle = `listener@${JSON.stringify(address)}#${listenerSpellingSeq}`;
  store.listen(handle, [address]);
  store.register(handle, listener);
  return handle;
}
function carriesHandle(set, handle) {
  return set.some((element) => element !== null && typeof element === 'object' && element.handle === handle);
}
function setHandles(set) {
  return set.map((element) => (element === null || typeof element !== 'object' ? element : element.handle));
}
function setAddresses(set) {
  return set.map((element) => (element === null || typeof element !== 'object' ? undefined : element.address));
}


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

const api = await import('provident-storeroom');
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

/// **THE ARTIFACT THIS FILE'S OWN FIGURES NAME, AND THE LAYER LABEL `S-LAYER` READS OFF THE RUNNER THAT
/// CARRIES IT** — `acceptance.md §4.2` item 1: *"THIS UNIT'S JS-SIDE GREEN IS `ENVELOPE/PURE`, AND THE LABEL
/// TRAVELS WITH EVERY FIGURE … Every reported figure names its SITE (the command and the directory it ran in)
/// and its LAYER"*, with item 2 (*"the ASSEMBLED/`APP` LAYER for this unit is `NONE`"*) and item 3 (*"NO
/// `APP`-GREEN MAY BE CLAIMED FROM A NODE TEST"*).
///
/// **⟶ CORRECTED 2026-10-17 (`role_test_writer`, GATE 4's ADVERSARIAL PASS): THE AS-FILED REPAIR THAT MOVED
/// THE LABEL FROM THE CELL'S OWN ARRAY TO THIS MODULE-SCOPE RECORD MOVED A LITERAL AND NOT A READING, SO
/// `S-LAYER` STILL COMPARED A CONSTANT TO ITSELF AND COULD NOT FAIL.** The two literals it needs are TYPED
/// NOWHERE IN THIS FILE: they are EXTRACTED FROM `bindings/js/greens/greens.mjs` — the battery artifact this
/// unit's figures come from, which is the file that must carry the label for the figure to travel with it —
/// and the two homes the artifact itself prints (its `const` declaration and its head comment) are read
/// against each other, so a reader who meets either one first meets the same label. **THE FALSIFIER: change
/// the label the artifact carries — `greens/greens.mjs`'s `const LAYER = 'ENVELOPE/PURE'` and the `LAYER:`
/// line of its head comment → `ASSEMBLED/RENDERER` — and `S-LAYER` FAILS at the extraction (its label is no
/// longer the `ENVELOPE/PURE` `§4.2` item 1 declares for this unit) and at the two homes' equality; delete
/// the artifact and it FAILS rather than passing over a literal.**
const FIGURE = {
  site: `node --test, ${PACKAGE_DIR}`,
  appGreenClaimed: false,
};
/// The battery artifact that carries the layer label (`acceptance.md §4.2` item 1; `DD-31`/`DD-33`: this
/// unit's green is `ENVELOPE/PURE` and the store's own suite is not re-labelled as this unit's).
const LAYER_ARTIFACT = join(PACKAGE_DIR, 'greens', 'greens.mjs');
/// The artifact's own two homes of the label, read as bytes: its `const LAYER = '<label>'` declaration and
/// the `LAYER: <label>` line of its head comment. `null` where a home is absent, so a missing home is a
/// FAILURE of the line rather than a reading that quietly disappears.
function layerLabelHomes() {
  const bytes = readFileSync(LAYER_ARTIFACT, 'utf8');
  const declared = /\bconst\s+LAYER\s*=\s*'([^']+)'/.exec(bytes);
  const commented = /LAYER:\s*([A-Z][A-Z/]*)/.exec(bytes);
  // **AND THE `APP` LAYER IS EXTRACTED BY THE SAME READING, SO `§4.2` ITEM 2 IS ASSERTED AND NOT ASSUMED:**
  // the artifact's head comment reads `APP LAYER: NONE.` and its own constant is `const APP_LAYER = 'NONE'`,
  // and a claim of any other `APP` layer is a FAILURE of the line (`§4.2` items 2–3; `DD-20`). The pattern
  // reads a BARE label, never `NONE`-with-a-suffix, so the two spellings the artifact prints are not read as
  // one.
  const appLayer = /APP LAYER:\s*(?!NONE\b)([A-Z][A-Z/]*)/.exec(bytes);
  return {
    declared: declared === null ? null : declared[1],
    commented: commented === null ? null : commented[1],
    appLayer: appLayer === null ? null : appLayer[1],
  };
}

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
    // **A DRIVE THAT RAISES IS A BROKEN LINE AND NOT AN UNCAUGHT FRAME** — the same reading `un-run` gives
    // at the ledger (`§2.4` item 5; `acceptance.md §4.4`): a label the artifact does not carry, or an
    // artifact that is not there, must make its LINE fail rather than abort the run at a stack.
    let held = false;
    try {
      held = drive(attempt);
    } catch {
      held = false;
    }
    if (!held) {
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
 * EXACTLY `{log, message, status}`, the status must be the closed-set member `AddressMalformed`, and the message
 * must carry the failing TARGET (item 5 (a)), the CLASS that failed (item 5 (b), whose class half is
 * mandatory) and the POSITION (item 5 (b): a verb's ARGUMENT POSITION), because *"the rejection is verbose
 * where it carries two things: the failing target, and the reason"*. **A bare "an error occurred" is what
 * this predicate REFUSES.**
 * **⟶ THE MEMBER-SET LIMB MOVES `2 → 3` ON THE 2026-10-16 CLAUSE** (`surface.md §2.5` item 4: *"the
 * three-member member set is therefore FLAT ACROSS ARMS and not conditional"*; item 9: *"`Object.keys(caught)`
 * reads exactly `["log","message","status"]` … `log` is NEVER ABSENT, NEVER `null` and NEVER a non-array"*).
 * **THE `register` `TypeError` IS ITEM 4'S OWN ENUMERATED `log: []` ARM** — *"`a.register`'s `TypeError` …
 * carry `log: []` — the EMPTY ARRAY, never an absent member, never `null`, and never a placeholder entry"* —
 * so the array's TYPE is asserted here and its emptiness at each arm this predicate drives.
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
  if (Object.keys(thrown).sort().join(',') !== 'log,message,status') return false; // EXACTLY three members
  if (Object.keys(thrown).length !== 3) return false;
  if (!Array.isArray(thrown.log)) return false; // `log` is an ARRAY on every arm, never absent or `null`
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
  globalThis.__TRACE = globalThis.__TRACE || [];
  const rng = draw(attempt);
  const value = (n) => 1 + n;

  // --- `§2.4` item 5 (e): THE TWO THROW SITES ARE `§2.4` item 5 (e), AND THE FIRST HALF OF THE DRIVE IS
  //     THE SEPARATION ITSELF. A VERB answers `§2.5`'s `{status, message}` — NEVER a `TypeError`, which
  //     item 5 (e) calls a FINDING — and a REGISTRATION answers the bare `TypeError` of item 5 (d).
  const probe = mem();
  const verbSites = [
    () => probe.read(['nope']), //                             AddressNotFound
    () => probe.read(['a'], 'secure'), //                      OutOfDomainTier
    () => probe.write(['a'], 'secure', 1), //                  OutOfDomainTier
    () => probe.delete(['a'], 'secure'), //                    OutOfDomainTier
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy
    // tail): THE ARITY MOVES `1 → 2`, SO THE ADDRESS STANDS INSIDE THE SET** (`contract.md §2.2` items 1
    // and 2; `listen-verb.md §1` item 1). **THE PROBE'S SUBJECT — a VERB's declared failure crosses as the
    // surface's `{status, message}` form and NEVER as a `TypeError` — IS UNMOVED**, and the set position's
    // own class test answers exactly that form (`listen-verb.md` §2.2 item 3).
    () => probe.listen('probe-handle', ['not-an-address']), //   AddressMalformed
    () => probe.write(['a'], 'mem', () => {}), //              ValueNotAdmitted
    () => probe.rollback('no-such-op'), //                     JournalOpUnknown
  ];
  for (const verb of verbSites) {
    let thrown = null;
    try {
      verb();
    } catch (err) {
      thrown = err;
    }
    if (thrown === null) { globalThis.__TRACE.push('S-REG:1'); return false; } // the declared failure of a VERB crossed as nothing
    if (thrown instanceof TypeError) { globalThis.__TRACE.push('S-REG:2'); return false; } // item 5 (e): a `TypeError` thrown by a VERB is a FINDING
    if (typeof thrown.status !== 'string' || !thrown.message) { globalThis.__TRACE.push('S-REG:3'); return false; }
  }

  // --- `§2.4` rule 1 (registered half) and `§2.3` item 2: the handle is reached from a `triggered` list,
  //     and registering it makes the function fire — ONCE, and AFTER the verb returned (`§2.7` item 2).
  //     **THE ORDER IS THE TRACE'S, AND THAT IS THE ONLY OBSERVABLE `§2.7` ITEM 2 NAMES:** the listener
  //     pushes its own marker WHEN IT RUNS, and the caller's very next statement pushes the second marker —
  //     so a trace of `['listener', 'after-return']` puts the invocation after the verb's return and before
  //     the statement that follows it (which is what SYNCHRONOUS means here), and never before either.
  const adopted = mem([{ address: ['a'], handle: 'l1' }]);
  // **⟶ RE-DERIVED 2026-10-18: the element is the PAIR, so the handle is its `handle` member**
  // (`trigger-and-pair.md §1` item 1; `§4` item 1). The construction ADOPTED `'l1'`, and the member is
  // that same string (`contract.md §2.1` item 1; `(AA-5)`).
  const adoptedHandle = adopted.write(['a'], 'mem', value(rng.next().value)).triggered[0].handle;
  const trace = [];
  let adoptedFired = 0;
  let sawCompleteRecord = false;
  let lastRecord = adopted.write(['a'], 'mem', value(rng.next().value)); // the caller already holds one
  if (adopted.register(adoptedHandle, () => {
    adoptedFired += 1;
    sawCompleteRecord =
      lastRecord !== null && lastRecord.op.after.present === true && lastRecord.triggered.length === 1;
    trace.push('listener');
  }) !== undefined) {
    { globalThis.__TRACE.push('S-REG:4'); return false; } // item 5 (b): the return is `undefined` on every success
  }
  trace.length = 0;
  lastRecord = adopted.write(['a'], 'mem', value(rng.next().value));
  trace.push('after-return');
  if (adoptedFired !== 1) { globalThis.__TRACE.push('S-REG:5'); return false; } // rule 1: a registered handle fires
  if (!(trace.length === 2 && trace[0] === 'listener' && trace[1] === 'after-return')) { globalThis.__TRACE.push('S-REG:6'); return false; }
  if (!sawCompleteRecord) { globalThis.__TRACE.push('S-REG:7'); return false; } // the record was COMPLETE and copied out before the window opened
  trace.length = 0;
  lastRecord = adopted.write(['a'], 'mem', value(rng.next().value));
  if (adoptedFired !== 2) { globalThis.__TRACE.push('S-REG:8'); return false; } // one invocation per trigger, never two and never none

  // --- rule 2: a SECOND registration for the SAME handle REPLACES the first, and drops it without notice.
  let replacedFired = 0;
  if (adopted.register(adoptedHandle, () => {
    replacedFired += 1;
    throw new TypeError('the SECOND function is the registered one');
  }) !== undefined) {
    { globalThis.__TRACE.push('S-REG:9'); return false; } // item 5 (b): `undefined` on a REPLACEMENT too
  }
  let replacementThrew = false;
  try {
    adopted.write(['a'], 'mem', value(rng.next().value));
  } catch (err) {
    replacementThrew = err instanceof TypeError && !('status' in err);
  }
  if (!replacementThrew) { globalThis.__TRACE.push('S-REG:10'); return false; } // the replaced function is NOT the one invoked
  if (replacedFired !== 1) { globalThis.__TRACE.push('S-REG:11'); return false; } // the second registration fired...
  if (adoptedFired !== 2) { globalThis.__TRACE.push('S-REG:12'); return false; } // ...and the FIRST function did NOT (one handle, one function)

  // --- rule 4 (`DD-15`): after `unlisten`, the function "simply never fires again" — while the STORE's
  //     own home entry is gone. The re-`listen` mints a DIFFERENT handle whose registration is a NEW entry.
  const withdrawn = mem();
  // **⟶ and the handle is SPELLED, `listen` answering the unit** (`contract.md §2.2` item 10; `PAR-HL-3`).
  const minted = 'withdrawn-identity';
  withdrawn.listen(minted, [['w']]);
  let before = 0;
  let after = 0;
  withdrawn.register(minted, () => { before += 1; });
  withdrawn.write(['w'], 'mem', value(rng.next().value));
  if (before !== 1) { globalThis.__TRACE.push('S-REG:13'); return false; } // the minted handle fires while it stands
  if (withdrawn.unlisten(minted) !== undefined) { globalThis.__TRACE.push('S-REG:14'); return false; }
  const afterWithdrawal = withdrawn.write(['w'], 'mem', value(rng.next().value));
  if (afterWithdrawal.triggered.length !== 0) { globalThis.__TRACE.push('S-REG:15'); return false; } // the STORE-side home entry is withdrawn
  if (before !== 1) { globalThis.__TRACE.push('S-REG:16'); return false; } // and the function simply never fires again
  // **⟶ RE-DERIVED 2026-10-18: “a re-`listen` MINTS A DIFFERENT handle” IS A CLAIM ABOUT A MINT THE UNIT
  // RETIRES; what the line's own subject needs is a FRESH registration at that address, so the arm spells a
  // SECOND identity and asserts it is reached** (`contract.md §2.1` item 1; `(AB-5)`'s ground:
  // `identity-and-domain.md §1` item 4).
  const again = 'reinstalled-identity';
  if (again === minted) { globalThis.__TRACE.push('S-REG:17'); return false; } // TWO identities, never one reused
  withdrawn.listen(again, [['w']]);
  withdrawn.register(again, () => { after += 1; });
  withdrawn.write(['w'], 'mem', value(rng.next().value));
  if (after !== 1) { globalThis.__TRACE.push('S-REG:18'); return false; } // the NEW handle's registration is a NEW entry that fires

  // --- rule 1 (unregistered half): a handle with NO registration invokes nothing and reports nothing.
  const silent = mem([{ address: ['s'], handle: 'l-silent' }]);
  silent.write(['s'], 'mem', 1); // no registration: no code, no warning, no log, and no throw

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
  //     the assertion `if (dupRecord.triggered.length !== 1) { globalThis.__TRACE.push('S-REG:19'); return false; }`. THE SECOND HALF OF THAT
  //     SENTENCE IS THE INVOCATION RULE AND IT IS RIGHT AND IT STANDS BELOW, LIVE; THE ARRAY FIGURE THE
  //     FIRST HALF WAS READ INTO IS THE ONE THE RECONCILED CLAUSE REFUTES.**
  //     **AND THE TWO AS-FILED CODE LINES THAT STOOD UNDER IT ARE RE-EMITTED HERE, BYTE FOR BYTE, BESIDE
  //     THE FORM THAT CARRIES THEM NOW:** `dup.register(dupRecord.triggered[0].handle, () => { dupFired += 1; });`
  //     — now `dup.register(dupRecord.triggered[0].handle, (...args) => { dupFired += 1; dupArgs = args; });`, the
  //     SAME registration with the invocation's own view read at the call — and
  //     `if (dupFired !== 1) { globalThis.__TRACE.push('S-REG:20'); return false; } // once per DISTINCT handle`, whose bytes stand below with the
  //     rule's second sentence appended and no byte of the as-filed line moved.**
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // THE CALLER-SPELLED DUPLICATE STATE IS RETIRED AND THE ARM IS RE-DERIVED TO THE STATE THAT CARRIES THE
  // SAME OBSERVABLE — ONE HANDLE AT SEVERAL ADDRESSES**, which is the counterexample
  // `trigger-and-pair.md §5` item 2 names. **THE RULING: `docs/specs/storeroom-held-listener-identity/
  // contract.md §2.1` item 3** — *"The CALLER-SPELLED DUPLICATE STATE … DOES NOT SURVIVE IN THAT FORM: a
  // handle names ONE listener, standing at the addresses ONE `listen` gave it"* (`P: docs/pending.md ·
  // P-6`'s rule 3). **THE ARM'S SUBJECT — the ARRAY's multiplicity is the STORE's while the INVOCATION's
  // count is the PACKAGE's, and the dedupe keys on `entry.handle` — IS UNMOVED.**
  const dup = mem();
  dup.listen('l-dup', [['d'], ['d', 'deep']]);
  dup.write(['d'], 'mem', {});
  const dupRecord = dup.write(['d', 'deep'], 'mem', value(rng.next().value));
  if (dupRecord.triggered.length !== 2) { globalThis.__TRACE.push('S-REG:21'); return false; } // (ii) THE ARRAY CARRIES ONE PAIR PER MATCHED BINDING
  // **MEMBER BY MEMBER, NEVER BY SIZE** (`A77`): both members are the SAME identity — so a boundary whose
  // dedupe keyed on the ELEMENT (`TF-5`) breaks HERE, and one that invented a SECOND identity breaks on the
  // distinct-identity count.
  if (dupRecord.triggered[0].handle !== dupRecord.triggered[1].handle) { globalThis.__TRACE.push('S-REG:22'); return false; }
  if (new Set(setHandles(dupRecord.triggered)).size !== 1) { globalThis.__TRACE.push('S-REG:23'); return false; } // ...the DISTINCT-identity count is ONE
  // (i) THE INVOCATION IS THE PACKAGE'S — a call counter on the function, and the invocation's OWN view
  // read at the call: `argc === 1`, and that ONE argument the TRIGGERING ADDRESS (`PAR-JS-12`; `§2.7` item 5).
  let dupFired = 0;
  let dupArgs = null;
  dup.register(dupRecord.triggered[0].handle, (...args) => { dupFired += 1; dupArgs = args; });
  dup.write(['d'], 'mem', value(rng.next().value));
  if (dupFired !== 1) { globalThis.__TRACE.push('S-REG:24'); return false; } // once per DISTINCT handle — not one per occurrence, not one per entry
  if (dupArgs === null || dupArgs.length !== 1) { globalThis.__TRACE.push('S-REG:25'); return false; } // the invocation's view is EXACTLY ONE argument
  if (JSON.stringify(dupArgs[0]) !== JSON.stringify(['d'])) { globalThis.__TRACE.push('S-REG:26'); return false; } // ...and it is the TRIGGERING address

  // --- `§2.4` item 5 (d) AS IT IS READ TODAY (`§2.5` item 5 (g), the operative reading): EVERY OUTSIDE
  //     CLASS ANSWERS THE ONE FORM WITH THE STORE'S CLOSED-SET `AddressMalformed`, AND THE MESSAGE CARRIES
  //     THE TARGET, THE CLASS AND THE POSITION — and the IN-DOMAIN form is still a SUCCESS, so the predicate
  //     cannot be satisfied by a site that throws on everything.
  const mine = mem([{ address: ['a'], handle: 'l1' }]);
  const held = mine.write(['a'], 'mem', 1).triggered[0].handle;
  let heldFired = 0;
  if (mine.register(held, () => { heldFired += 1; }) !== undefined) { globalThis.__TRACE.push('S-REG:27'); return false; }
  const stranger = mem();
  // **⟶ and the foreign handle is a string THIS instance never held** (`contract.md §2.1` item 1; `(AA-5)`).
  const fabricated = 'foreign-fabricated';
  stranger.listen(fabricated, [['x']]);
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
    { call: () => mine.register('', () => {}), target: null, why: 'a string', pos: 'first argument' }, // the blank token's own target is the empty string
    // **⟶ and the GUESSED token is row `10` — a well-formed string this instance never held — so its
    // message carries the VALUE and the REASON and no class** (`identity-and-domain.md` §2 item 3 row `10`;
    // `§2` item 4's recorded acceptance for a handle refusal).
    { call: () => mine.register(`listener-${rng.next().value}`, () => {}), target: null,
      why: 'this instance holds no listener entry for it', pos: 'first argument' }, // a PRIOR SESSION's / a GUESSED spelling
    { call: () => mine.register({}, () => {}), target: '[object Object]', why: 'a plain object', pos: 'first argument' },
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE WELL-FORMED-STRING ROWS ARE RE-SPELLED TO THE
    // DECLARATION.** `'l1'` was the OLD OPAQUE TOKEN's spelling and is now a handle THIS INSTANCE *HOLDS*, so
    // `register` ANSWERS `undefined` for it — it is IN domain (`identity-and-domain.md §2` item 1: the
    // domain is a non-empty string; `§2` item 3's table governs OUTSIDE values alone). **THE ROWS THAT ARE
    // STILL OUTSIDE ARE RE-SPELLED BESIDE IT (a PRIOR-SESSION spelling and a FABRICATED one — `§2` item 3
    // rows `9` and `10`), and the HELD row's own success is driven below**, so both dispositions are read.
    // **THE ROW IS TAKEN AT THE SAME COUNTER THE DRIVE ALREADY PLACED, so this in-domain success is a
    // RE-ARM and not a replacement of the function the last assertion counts** (`§2.4` rule 2).
    { call: () => mine.register('l1', () => { heldFired += 1; }), target: null, why: null, pos: null, inDomain: true },
    // **⟶ and the two remaining string rows are OUTSIDE by PROVENANCE and not by class** — rows `9`/`10`
    // of `identity-and-domain.md` §2 item 3, whose message carries the REASON (`§2` item 4's recorded
    // acceptance) rather than a class the generator does not produce for a well-formed string.
    { call: () => mine.register(fabricated, () => {}), target: fabricated,
      why: 'this instance holds no listener entry for it', pos: 'first argument' }, // a well-formed string this instance never held
    { call: () => mine.register(() => {}, () => {}), target: null, why: 'a function', pos: 'first argument' }, // a function as the handle
  ];
  for (const one of outside) {
    // **⟶ AND THE IN-DOMAIN ROW IS ITS OWN DECLARED ANSWER, DRIVEN BESIDE THE REFUSALS** (`identity-and-
    // domain.md §2` item 2's table: `register` ANSWERS `undefined` where this instance holds the handle).
    if (one.inDomain === true) {
      if (one.call() !== undefined) {
        { globalThis.__TRACE.push('S-REG:27'); return false; }
      }
      continue;
    }
    if (!isRegistrationRefusal(one.call, one.target, one.pos, one.why)) {
      console.log(
        `S-REG OUTSIDE MISMATCH: target=${one.target} pos=${one.pos} why=${one.why} ::`,
        (() => {
          try { one.call(); return 'NO THROW'; } catch (err) { return JSON.stringify(err); }
        })(),
      );
      { globalThis.__TRACE.push('S-REG:28'); return false; }
    }
  }
  // NOTHING REACHES THE STORE IN ANY OF THOSE CASES (`item 5 (d)`), and no other registration is disturbed:
  // **⟶ AND `triggered.length` IS READ AT ITS PAIRS WHILE `heldFired` IS THE BODY'S OWN COUNT** — the two
  // figures are the store's and the package's (`§2.4` rule 3; `trigger-and-pair.md` §5 item 4). **THE CLAIM
  // — *"nothing reaches the store in any of those cases, and no other registration is disturbed"* — IS
  // UNMOVED**: ONE registration at this address, ONE invocation of the body registered for it, and the
  // refusals added nothing.
  // **⟶ AND `triggered`'s MEMBER COUNT IS THE STORE'S WHILE `heldFired` IS THE BODY'S OWN COUNT** — the
  // two figures are the store's and the package's (`§2.4` rule 3; `trigger-and-pair.md` §5 item 4). **THE CLAIM
  // — *"nothing reaches the store in any of those cases, and no other registration is disturbed"* — IS
  // UNMOVED**, and it is read at the PAIR COUNT and at the invocation count together: the single pair the
  // write returned is the one entry the one registration stands as, and the body registered for it ran once.
  // ...and the body's own firing is DRIVEN, so the figure below is measured and not assumed: the FIRST of
  // these two writes is the registration's own firing and the SECOND is the probe the refusal loop must
  // leave undisturbed (`§2.7` item 2; `§2.4` rule 3).
  mine.write(['a'], 'mem', 3);
  const untouched = mine.write(['a'], 'mem', 2);
  // **⟶ AND THE FIGURES ARE READ AS A DIAGNOSABLE PAIR, so the red this driver reports names WHICH half
  // failed rather than a bare conjunction** (the instrument is the drive's own; the assertion is unmoved).
  if (untouched.triggered.length !== 1) { globalThis.__TRACE.push('S-REG:29a'); return false; }
  if (heldFired !== 2) { globalThis.__TRACE.push('S-REG:29b'); return false; }
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
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // THE CALLER-SPELLED DUPLICATE STATE IS RETIRED AND THE LINE IS RE-DERIVED TO THE STATE THAT CARRIES THE
  // SAME TWO HALVES — ONE HANDLE AT TWO ADDRESSES** (`contract.md §2.1` item 3; `P: docs/pending.md · P-6`'s
  // rule 3; `trigger-and-pair.md §5` item 2's own counterexample). **The invocation half — ONE per DISTINCT
  // handle — is UNMOVED; the array's figure moves with the state, not with the claim.**
  const inst = mem();
  inst.listen('l1', [['a'], ['a', 'b']]);
  inst.write(['a'], 'mem', {});
  const record = inst.write(['a', 'b'], 'mem', 1);
  if (record.triggered.length !== 2) return false; // THE STORE'S OWN LIST, CARRIED OUT ONE PAIR PER BINDING
  // MEMBER BY MEMBER, NEVER BY SIZE (`A77`): the two members are ONE identity — so a collapse breaks here.
  if (record.triggered[0].handle !== record.triggered[1].handle) return false;
  if (new Set(setHandles(record.triggered)).size !== 1) return false; // ONE distinct identity, not two
  // THE INVOCATION HALF: a call counter, `argc === 1`, and that ONE argument the TRIGGERING ADDRESS.
  let fired = 0;
  let seen = null;
  if (inst.register(record.triggered[0].handle, (...args) => { fired += 1; seen = args; }) !== undefined) return false;
  inst.write(['a', 'b'], 'mem', 2);
  if (fired !== 1) return false; // ONE per DISTINCT handle — never once per occurrence, never once per entry
  if (seen === null || seen.length !== 1) return false; // the invocation's view is EXACTLY ONE argument
  // **⟶ and the TRIGGERING ADDRESS is the WRITE's own, which here is the descendant — never the binding's
  // (`trigger-and-pair.md` §5 item 4; `PAR-JS-12`).**
  return JSON.stringify(seen[0]) === JSON.stringify(['a', 'b']);
});

line(P_SM_5, 'S-OPAQUE', 10, (attempt) => {
  globalThis.__TRACE = globalThis.__TRACE || [];
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // THE LINE'S WHOLE SUBJECT — *"every handle a verb RETURNS is the package's opaque JS value wrapping the
  // token, whose token is PRIVATE and readable by no JS code"* (`§2.3` item 2) — IS SUPERSEDED WHOLE BY THE
  // MINTING RULING, AND THE LINE IS RE-DERIVED TO THE DECLARATION THAT REPLACED IT.**
  //
  // **THE RULING, AT ITS OWN BYTES — `docs/specs/storeroom-held-listener-identity/contract.md §2.1` item 1 and
  // `(AA-5)`, with `identity-and-domain.md §1` item 1** verbatim: *"The caller spells it, holds it and passes it
  // back; nothing mints it. The value the store reports in `triggered`, the value the entry's map keys on, the
  // value `unlisten` accepts, the value `register` accepts and the value `removeListener` accepts ARE ONE VALUE
  // AND NOT FIVE SPELLINGS OF ONE"* (`P: docs/pending.md · P-6`: *"You don't need to mint anything. The handle
  // is already a unique identifier."*). **AND `identity-and-domain.md §1` item 2 NAMES THE THREE FABRICATIONS
  // THIS LINE PROBED, EACH AS *DELETED, NOT REWRITTEN*: `Object.freeze({})` (`:1757`), `state.tokens` (`:1984`)
  // and `wrapHandles` (`:1746-1780`).**
  //
  // **SO THE LINE'S ASSERTIONS ARE RE-DERIVED ONE BY ONE, NOT WEAKENED, AND THE FIRST IS THE STRONGEST OF
  // THEM:** the handle IS the caller's own string, and the value a verb returns and the value the caller holds
  // are THE SAME VALUE — asserted by `===` at the address the store was told about. **The "no leak" halves are
  // re-derived to what the declaration makes assertable: there is no wrapper to leak through, because there is
  // no wrapper.**
  const rng = draw(attempt);
  const token = `l${1 + rng.next().value}`; // a caller-spelled handle the construction ADOPTS verbatim
  // **NO MINT: a fresh `listen` answers the unit** (`contract.md §2.2` item 10; `PAR-HL-3`).
  const fresh = mem();
  // **THE BRANCH THE NESTED ADDRESS RESOLVES THROUGH IS WRITTEN FIRST, AS A CONTAINER AND NOT AS A LEAF**
  // (`write-and-read.md` §3.2 item 2's PARENT RULE; `DD-5`): the store mints no parent, and a leaf there would
  // refuse the descendant with `WriteParentNotLink`. This pre-write is an ordinary caller write.
  const freshAddress = ['x', 0];
  fresh.write(['x'], 'mem', [{}]);
  if (fresh.listen('minted?', [freshAddress]) !== undefined) { globalThis.__TRACE.push('OPQ:1'); return false; }
  if (fresh.register('minted?', () => {}) !== undefined) { globalThis.__TRACE.push('OPQ:2'); return false; }
  const minted = fresh.write(freshAddress, 'mem', 1).triggered[0].handle;
  const adopted = mem([{ address: ['a'], handle: token }]).write(['a'], 'mem', 1).triggered[0].handle;
  for (const [label, handle] of [['a FRESHLY LISTENED handle', minted], ['an ADOPTED handle', adopted]]) {
    // **THE DECLARED SPELLING IS A `string`, AND THE IN SPELLING AND THE OUT SPELLING ARE ONE** (`§2.1`
    // item 1: *"ARE ONE VALUE AND NOT FIVE SPELLINGS OF ONE"*; `identity-and-domain.md §6` `O-6`).
    if (typeof handle !== 'string') { globalThis.__TRACE.push('OPQ:3'); return false; }
    if (handle.length === 0) { globalThis.__TRACE.push('OPQ:4'); return false; } // a non-empty string (`identity-and-domain.md` §2 item 1)
    if (String(handle) !== handle) { globalThis.__TRACE.push('OPQ:5'); return false; } // the value IS its own spelling: nothing wraps it
    // ...and every coercive spelling a wrapper once leaked through now returns the SAME string, so the
    // "no leak" claim is not weaker but VACUOUS — there is no second value to leak from.
    const spellings = [String(handle), `${handle}`, JSON.stringify(handle), handle.toString(), handle.valueOf()];
    for (const spelling of spellings) {
      if (String(spelling) !== handle && String(spelling) !== JSON.stringify(handle)) { globalThis.__TRACE.push('OPQ:6'); return false; }
    }
    if (label === 'an ADOPTED handle' && handle !== token) { globalThis.__TRACE.push('OPQ:7'); return false; } // ADOPTED VERBATIM
  }
  if (minted !== 'minted?') { globalThis.__TRACE.push('OPQ:8'); return false; } // the caller's own spelling comes back unchanged
  // ...and `unlisten` over a string the map does not carry is the declared unknown-handle no-op, which is
  // the half of item 4 this line keeps (`identity-and-domain.md` §2 item 2's table).
  const inst = mem();
  inst.listen('y-handle', [['y']]);
  const bare = inst.unlisten('l1') === undefined && inst.unlisten(token) === undefined;
  if (inst.write(['y'], 'mem', 1).triggered.length !== 1) { globalThis.__TRACE.push('OPQ:9'); return false; } // no other registration removed
  return bare;
});

line(P_SM_5, 'S-WITHDRAW', 10, () => {
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // BOTH ARMS ARE KEPT AND BOTH ARE RE-SPELLED, BECAUSE THE MINT RULING REMOVES THE TERM THEY WERE COMPARED
  // BY — AND THE ROW'S OWN SUBJECT SURVIVES AT A DIFFERENT OBSERVABLE.**
  //
  // **WHAT IS SUPERSEDED, NAMED:** `docs/specs/storeroom-js/contract.md §5.5`'s dated clause drives its two
  // arms with *"a LATER `listen` AT THE SAME ADDRESS **MINTS A NEW HANDLE** where the withdrawal removed that
  // address's home entry, and returns the EXISTING entry's handle where the address is STILL REGISTERED"*.
  // **`listen` MINTS NOTHING FROM 2026-10-18 AND ANSWERS THE UNIT** (`docs/specs/storeroom-held-listener-
  // identity/contract.md §2.1` item 1 and `§2.2` item 10; `(AA-5)`; `PAR-HL-3`), so *"mints a new handle"*
  // and *"returns the existing entry's handle"* are BOTH claims about a return that no longer exists.
  //
  // **WHAT SURVIVES, AND IT IS THE ROW'S REAL CONTENT — THE TWO ARMS ARE STILL TWO OBSERVABLE STATES, EACH
  // READ AT THE STORE'S OWN `triggered` SET:**
  //   **ARM 1, THE WITHDRAWN ADDRESS:** after `unlisten`, the address carries NOTHING; and a `listen` there
  //   re-installs an entry that FIRES AGAIN under the caller's own spelling (`identity-and-domain.md §3`
  //   item 2 (i); `§2.4` rule 4's *"a function whose handle is withdrawn simply never fires again"* is scoped
  //   to the WITHDRAWN window).
  //   **ARM 2, THE STILL-REGISTERED ADDRESS:** a no-op success ahead of the later `listen` removes NOTHING,
  //   so the entry STANDS and the address keeps carrying it — asserted at the store, which is what the
  //   as-filed equality was really reading.
  // **THE ONE CLAIM STATED APART, BECAUSE THE ROW'S OWN CLAUSE SAYS A DRIVE *"cannot satisfy one by asserting
  // the other"*: the SAME-VALUE half is now the CALLER'S OWN SPELLING (`§2.1` item 1: the value the caller
  // holds and the value the store reports ARE ONE), and the NO-SECOND-ENTRY half is driven at the STORE's own
  // surface — the address carries ONE pair, and it runs the ONE function registered for it.**
  const inst = mem();
  inst.listen('withdraw-arm', [['a']]);
  inst.register('withdraw-arm', () => {});
  inst.unlisten('withdraw-arm');
  const afterWithdrawal = inst.write(['a'], 'mem', 1);
  if (afterWithdrawal.triggered.length !== 0) { globalThis.__TRACE.push('WD:1'); return false; } // ARM 1: the home entry is gone
  // ...and a re-`listen` there re-installs an entry that FIRES, under the SAME caller-spelled handle.
  inst.listen('withdraw-arm', [['a']]);
  inst.register('withdraw-arm', () => {});
  if (inst.write(['a'], 'mem', 2).triggered.length !== 1) { globalThis.__TRACE.push('WD:2'); return false; } // ...whose entry is a NEW one that fires
  if (inst.write(['a'], 'mem', 5).triggered[0].handle !== 'withdraw-arm') { globalThis.__TRACE.push('WD:3'); return false; } // ...the caller's own spelling

  // **ARM 2 — THE STILL-REGISTERED ADDRESS.** A no-op success ahead of the later `listen` removes NOTHING
  // (`§2.3` item 4; `PAR-JS-8`), so the address is still registered when the repeat lands.
  const held = mem();
  const standing = 'standing-identity';
  held.listen(standing, [['a']]);
  let fires = 0;
  held.register(standing, () => { fires += 1; });
  if (held.write(['a'], 'mem', 1).triggered.length !== 1) { globalThis.__TRACE.push('WD:4'); return false; } // ONE home entry, ONE handle
  if (fires !== 1) { globalThis.__TRACE.push('WD:5'); return false; } // and its function fires for it
  const elsewhere = mem();
  const foreign = 'foreign-identity';
  elsewhere.listen(foreign, [['a']]);
  // (a) A NO-OP SUCCESS AHEAD OF THE LATER `listen`: an unknown handle and a FOREIGN instance's value both
  //     remove NOTHING, so the address is still registered when the repeat lands.
  if (held.unlisten('listener-not-minted-here') !== undefined) { globalThis.__TRACE.push('WD:6'); return false; } // the no-op success, still a success
  if (held.unlisten(foreign) !== undefined) { globalThis.__TRACE.push('WD:7'); return false; } // a foreign value: the same no-op success
  if (held.write(['a'], 'mem', 2).triggered.length !== 1) { globalThis.__TRACE.push('WD:8'); return false; } // ...and it removed NOTHING
  // (b) **THE REPEAT AT THE STILL-REGISTERED ADDRESS: IT ANSWERS THE UNIT, AND IT IS A PURGE THEN A FRESH
  //     RESERVATION** — `listen-verb.md` §4's transition table: *"`1 → 1` and `2 → 1` by `listen` (a purge
  //     then a fresh reservation)"*, and `§2.2` item 3's *"`listen(h, S2)` AFTER `listen(h, S1)` IS
  //     SET-ASSIGNMENT, NOT UNION"*. **THE AS-FILED ARM READ A REPEAT THAT RETURNED THE EXISTING ENTRY AND LEFT
  //     ITS FUNCTION PLACED — the OLD `on`'s observable, retired with the mint** (`§2.1` item 1; `(AA-5)`).
  //     **THE ROW'S OWN TWO ARMS ARE KEPT AND BOTH ARE STILL READ AT THE STORE:** the ENTRY the repeat names is
  //     unmoved (one home row, one identity), while its FUNCTION is the caller's to place again — which is
  //     exactly what `register` is for (`§2.2` item 5 (a)).
  if (held.listen(standing, [['a']]) !== undefined) { globalThis.__TRACE.push('WD:9'); return false; } // `PAR-HL-3`: the answer is `undefined`
  if (held.register(standing, () => { fires += 1; }) !== undefined) { globalThis.__TRACE.push('WD:9b'); return false; }
  // (c) AND THE NO-SECOND-ENTRY HALF, OBSERVED AT THE STORE: ONE home entry still stands, so the trigger
  //     carries that ONE handle ONCE.
  const standingRecord = held.write(['a'], 'mem', 3);
  if (standingRecord.triggered.length !== 1) { globalThis.__TRACE.push('WD:10'); return false; }
  if (standingRecord.triggered[0].handle !== standing) { globalThis.__TRACE.push('WD:11'); return false; }
  if (fires !== 3) { globalThis.__TRACE.push('WD:12'); return false; } // the SAME identity invoked once per trigger, never a fan-out
  if (held.unlisten(standing) !== undefined) { globalThis.__TRACE.push('WD:13'); return false; }
  if (held.write(['a'], 'mem', 4).triggered.length !== 0) { globalThis.__TRACE.push('WD:14'); return false; } // NO SECOND ENTRY EXISTS
  if (fires !== 3) { globalThis.__TRACE.push('WD:15'); return false; } // and the withdrawn identity's function never fires again (rule 4's own half)
  return true;
});


// =============================================================================================
// `§5.7` `P-TP-7` — the package's boot, the realm claim and the handoff set  (30 attempts)
// =============================================================================================
const P_TP_7 = row('P-TP-7');

line(P_TP_7, 'S-LOAD', 5, () => {
  const inst = mem();
  return inst.read([]) !== undefined;
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
  // **⟶ CORRECTED 2026-10-17 (`role_test_writer`), AND THE LINE NOW READS THE LABEL IT CLAIMS TO READ.**
  // **THE DEFECT, NAMED: the as-filed line compared `FIGURE.layer` — a literal typed in THIS file at module
  // scope — to the literal `'ENVELOPE/PURE'`, so `RCA-12`'s `ENVELOPE`-versus-`APP` LAYER SPLIT carried here
  // as a COMMENT and not as a READING (gate 4's adversarial pass: *"a label asserted against its own literal
  // cannot state WHICH LAYER a verification covers"*).** **THE REPAIR IS THE SUBJECT: the two labels are
  // extracted from the battery artifact that CARRIES them (`greens/greens.mjs`), and the three readings
  // below are read against each other — the artifact's declaration, the artifact's head comment, and the
  // label `acceptance.md §4.2` item 1 declares for this unit's JS green — so the split is asserted over the
  // bytes that own it and no conjunct is true by construction.
  const homes = layerLabelHomes();
  if (typeof FIGURE.site !== 'string' || !FIGURE.site.includes('node --test')) { globalThis.__TRACE.push('WD:16'); return false; }
  if (!FIGURE.site.includes(PACKAGE_DIR)) { globalThis.__TRACE.push('WD:17'); return false; } // the site names the directory it ran in
  if (homes.declared !== 'ENVELOPE/PURE') { globalThis.__TRACE.push('WD:18'); return false; } // §4.2 item 1's label, READ OFF THE ARTIFACT
  if (homes.commented !== homes.declared) { globalThis.__TRACE.push('WD:19'); return false; } // the artifact's two homes of the label agree
  if (FIGURE.appGreenClaimed !== false) { globalThis.__TRACE.push('WD:20'); return false; } // §4.2 items 2–3: `APP` is `NONE`, and no node test claims one
  // AND THE RECORD IS CHECKED AGAINST THE PACKAGE'S OWN BYTES, so the artifact cannot drift from what it
  // reports: no `APP`-green claim appears anywhere in the package's documentation, and no `APP` layer label
  // is claimed by the battery that carries this unit's figures.
  const appGreenClaimed = /APP[- ]?(layer|green)\s*[:=]\s*(green|GREEN)/.test(
    readFileSync(join(PACKAGE_DIR, 'README.md'), 'utf8'),
  );
  if (appGreenClaimed) { globalThis.__TRACE.push('WD:21'); return false; }
  if (homes.appLayer !== null) { globalThis.__TRACE.push('WD:22'); return false; } // §4.2 item 2: the artifact claims NO `APP` layer but `NONE`
  return true;
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
  inst.write(['a'], 'mem', {});
  inst.write(['a', 'b'], 'mem', {});
  const onWrite = inst.write(['a', 'b', 'c'], 'mem', 1);
  if (onWrite.triggered.length !== 2) { globalThis.__TRACE.push('WD:23'); return false; }
  const onDelete = inst.delete(['a', 'b'], 'mem');
  return onDelete.triggered.length === 2;
});

line(P_TP_8, 'S-NOOP', 10, (attempt) => {
  const rng = draw(attempt);
  const owner = mem();
  const stranger = mem();
  // **⟶ RE-DERIVED 2026-10-18: `listen` SPELLS the handle and answers the UNIT** (`contract.md §2.2` items 1
  // and 10; `PAR-HL-3`). **THE LINE'S SUBJECT — every outside value at `unlisten` is a NO-OP SUCCESS that
  // removes NO OTHER REGISTRATION — IS UNMOVED.**
  const kept = 'kept-identity';
  const foreign = 'foreign-identity';
  if (owner.listen(kept, [['a']]) !== undefined) return false;
  if (stranger.listen(foreign, [['a']]) !== undefined) return false;
  const noops = [
    owner.unlisten(foreign) === undefined,
    owner.unlisten(`listener-${rng.next().value}`) === undefined,
    owner.unlisten('') === undefined,
    owner.unlisten({}) === undefined,
    owner.unlisten(null) === undefined,
  ];
  const stillFires = owner.write(['a'], 'mem', 1).triggered.length === 1;
  return noops.every(Boolean) && stillFires && kept !== foreign;
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
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // THE CALLER-SPELLED DUPLICATE STATE IS RETIRED AND THE LINE IS RE-DERIVED TO THE STATE THAT CARRIES THE
  // SAME MULTISET — ONE HANDLE AT TWO ADDRESSES BESIDE A SECOND HANDLE** (`contract.md §2.1` item 3;
  // `P: docs/pending.md · P-6`'s rule 3; `trigger-and-pair.md §5` item 2). **THE LINE'S SUBJECT — *"this unit
  // asserts MEMBERSHIP ONLY: a drive compares SETS, never sequences"* (`§2.7` item 3) over a multiset whose
  // membership is KNOWN — IS UNMOVED**, and the multiset the store yields is still `{2, 1}`: one identity
  // carrying TWO members and one carrying a single one.
  const inst = mem([{ address: ['a'], handle: 'l1' }, { address: ['a'], handle: distinct }]);
  // The FIRST identity stands at TWO addresses the write below matches; the second at one.
  inst.listen('l1', [['a'], ['a', 'deep']]);
  inst.write(['a'], 'mem', {});
  const first = inst.write(['a', 'deep'], 'mem', 1);
  const second = inst.write(['a', 'deep'], 'mem', 2);
  if (first.triggered.length !== 3) { globalThis.__TRACE.push('WD:26'); return false; } // one pair per matched BINDING: the two-address identity TWICE and the sibling ONCE
  if (second.triggered.length !== 3) { globalThis.__TRACE.push('WD:27'); return false; }
  // MEMBER BY MEMBER: every id of the first enumeration is in the second, and every id of the second is in
  // the first — a comparison two DIFFERENT sets of the same size cannot pass.
  // **THE THREE AS-FILED LINES THIS BLOCK REPLACES ARE RE-EMITTED HERE, BYTE FOR BYTE, SO THE READER MEETS
  // BOTH READINGS AND NO BYTE IS DELETED:** `if (second.triggered.length !== 2) { globalThis.__TRACE.push('WD:28'); return false; }` ·
  // `if (new Set(first.triggered).size !== 2) { globalThis.__TRACE.push('WD:29'); return false; } // and the identities are DISTINCT, not one
  // repeated` · `// THE DUPLICATE ARM ITSELF: two entries carrying ONE token fire ONCE for the distinct
  // handle.` — **and the as-filed arm's closing `return true;`, which the duplicate-ONLY invocation half
  // below now carries instead.** **THE SET'S MEMBERSHIP FIGURE (`2` distinct identities) IS UNMOVED: the
  // member loop below counts exactly TWO identities, one of them TWICE.**
  for (const id of setHandles(first.triggered)) if (!carriesHandle(second.triggered, id)) { globalThis.__TRACE.push('WD:30'); return false; }
  for (const id of setHandles(second.triggered)) if (!carriesHandle(first.triggered, id)) { globalThis.__TRACE.push('WD:31'); return false; }
  // **AND THE MULTIPLICITY IS READ OFF THE ARRAY ITSELF, ONE MEMBER AT A TIME, WITH NO ORDER ASSERTED**
  // (`§2.7` item 3; `A77`): each member is matched to the identity it IS (`===`), the occurrence count is
  // kept per identity, and the multiset the array yields must be `{2, 1}` — ONE identity carrying TWO of the
  // three members (the store's lawful duplicate) and ONE carrying a single member. A boundary that collapsed
  // the duplicate yields `{1, 1}` and breaks on the third member; one that invented a third identity breaks
  // on the count of identities. **THIS IS THE MEMBER LOOP, AND NOT A `new Set(...).size` COMPARISON.**
  const occurrences = []; // one `[identity, occurrences]` pair per DISTINCT identity, in first-seen order
  for (const id of setHandles(first.triggered)) {
    const seen = occurrences.find((one) => one[0] === id);
    if (seen) seen[1] += 1;
    else occurrences.push([id, 1]);
  }
  if (occurrences.length !== 2) { globalThis.__TRACE.push('WD:32'); return false; } // TWO distinct identities, counted member by member
  if (occurrences.filter(([, n]) => n === 2).length !== 1) { globalThis.__TRACE.push('WD:33'); return false; } // exactly one carries the duplicate
  if (occurrences.filter(([, n]) => n === 1).length !== 1) { globalThis.__TRACE.push('WD:34'); return false; } // ...and the other is carried ONCE
  // THE INVOCATION HALF, UNMOVED: the duplicate's ONE identity invokes ONCE per distinct handle, so the
  // three members (two identities) yield exactly TWO invocations — never one per entry.
  let invocations = 0;
  for (const id of setHandles(first.triggered)) inst.register(id, () => { invocations += 1; });
  inst.write(['a'], 'mem', 3);
  if (invocations !== 2) { globalThis.__TRACE.push('WD:35'); return false; } // one per DISTINCT handle, never one per entry
  // AND THE DUPLICATE CASE ON ITS OWN, with NOTHING but the duplicate: its array carries TWO members of ONE
  // identity, and its ONE function runs ONCE.
  // **⟶ and the duplicate-ONLY arm is re-derived to the same state** (`contract.md §2.1` item 3).
  const dup = mem();
  dup.listen('l-dup', [['b'], ['b', 'deep']]);
  dup.write(['b'], 'mem', {});
  const dupRecord = dup.write(['b', 'deep'], 'mem', 1);
  if (dupRecord.triggered.length !== 2) { globalThis.__TRACE.push('WD:36'); return false; } // one pair per matched BINDING
  if (dupRecord.triggered[0].handle !== dupRecord.triggered[1].handle) { globalThis.__TRACE.push('WD:37'); return false; } // MEMBER BY MEMBER: ONE identity
  if (new Set(setHandles(dupRecord.triggered)).size !== 1) { globalThis.__TRACE.push('WD:38'); return false; } // ...whose distinct-identity count is ONE
  let dupFired = 0;
  let dupArgs = null;
  dup.register(dupRecord.triggered[0].handle, (...args) => { dupFired += 1; dupArgs = args; });
  dup.write(['b'], 'mem', 2);
  if (dupFired !== 1) { globalThis.__TRACE.push('WD:39'); return false; } // one invocation for the ONE distinct identity
  if (dupArgs === null || dupArgs.length !== 1) { globalThis.__TRACE.push('WD:40'); return false; } // the invocation's view: EXACTLY ONE argument
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
  const handle = inst.write(['a'], 'mem', 1).triggered[0].handle;
  const trace = [];
  let insideWindow = null; // the store's own state AT THE MOMENT the listener runs
  let argCount = -1;
  let argAddress = null;
  inst.register(handle, (...args) => {
    argCount = args.length;
    argAddress = args[0];
    insideWindow = inst.read(['a']);
    trace.push('listener');
  });
  // The listener runs INSIDE this call and the caller's very next statement is the SECOND trace marker:
  // `['listener', 'after-return']` therefore places the invocation after the verb's return and before the
  // statement that follows it. THE RECORD THE CALL RETURNED IS THEN CHECKED COMPLETE below, and the store's
  // own state as the listener found it is checked too — nothing the clause does not fix is asserted.
  const record = inst.write(['a'], 'mem', 2);
  trace.push('after-return');
  if (!(trace.length === 2 && trace[0] === 'listener' && trace[1] === 'after-return')) { globalThis.__TRACE.push('WD:41'); return false; }
  if (insideWindow !== 2) { globalThis.__TRACE.push('WD:42'); return false; } // the store's call had completed BEFORE the window opened
  if (argCount !== 1) { globalThis.__TRACE.push('WD:43'); return false; } // PAR-JS-12: the triggering ADDRESS, and NO other argument
  if (JSON.stringify(argAddress) !== JSON.stringify(['a'])) { globalThis.__TRACE.push('WD:44'); return false; } // ...and it is the TRIGGERING address
  if (record.triggered.length !== 1 || record.op.after.present !== true) { globalThis.__TRACE.push('WD:45'); return false; } // COMPLETE
  if (inst.read(['a']) !== 2) { globalThis.__TRACE.push('WD:46'); return false; } // ...and its result stands

  // The throwing-body half (`§2.7` item 4): the exception propagates out of the package's own invocation
  // loop, the write is already complete, and the store is neither rolled back nor altered.
  const thrown = mem([{ address: ['t'], handle: 'l-throw' }]);
  const thrownHandle = thrown.write(['t'], 'mem', 1).triggered[0].handle;
  let threw = false;
  thrown.register(thrownHandle, () => { throw new Error('the caller\'s own exception'); });
  try {
    thrown.write(['t'], 'mem', 2);
  } catch (err) {
    threw = true;
  }
  if (!threw) { globalThis.__TRACE.push('WD:47'); return false; } // NOT caught, NOT retried and NOT reported
  return thrown.read(['t']) === 2; // the write stands
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
  // implied by its first, so no input could fail it. **The record's member set is asserted against the
  // declared set, and its status asserted to be a member of the store's CLOSED `16`-member set** (`surface.md
  // §2.5: *"`status` is the store's own member token VERBATIM — one of the store's closed members … never a
  // package-minted code"*, `DD-40`).
  // **⟶ THE FIGURE MOVES `15 → 16` 2026-10-15 (`DEF-2026-10-15-Y`): the as-filed `15` was superseded by
  // `contract.md §8.1`'s amended heading (`11 + 2 + 1 + 1 + 1 = 16` ✓), and the list here is widened with
  // it — the predicate's own work is unchanged and no assertion is weakened.**
  // **⟶ AND THE MEMBER-SET FIGURE MOVES `2 → 3` 2026-10-16** (`surface.md §2.5` item 4: *"the three-member
  // member set is therefore FLAT ACROSS ARMS and not conditional"*; item 9: *"`Object.keys(caught)` reads
  // exactly `["log","message","status"]` … `log` is NEVER ABSENT, NEVER `null` and NEVER a non-array"*).
  // **ALL FOUR ARMS THIS DRIVE REACHES CARRY `log: []` BY ITEM 4'S OWN ENUMERATION** — a `read` and a
  // `rollback` with no attempt live, the construction's `cfg`-side refusal, and `register`'s `TypeError` —
  // so the empty array is asserted as the DECLARED VALUE and not as an absence (`parameter-semantics.md
  // §2.26`). **The four arms, their statuses and the no-mint limb are UNMOVED.**
  const THE_SIXTEEN = [
    'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
    'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch', 'WriteParentNotLink',
    'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing', 'FilePathUnreachable',
    'ValueNotAdmitted', 'FileCommitFailed', 'ConstraintListInvalid',
  'ValueRefusedAtBoundary',
  ];
  const formSites = [
    ['a VERB', () => mem().read(['gone'])],
    ['a VERB', () => mem().rollback('no-such-op')],
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
      'log,message,status',
      `S-FAILFORM: ${site}'s record must carry EXACTLY the three declared members — FLAT across arms and `
      + 'not conditional (`surface.md §2.5` item 4)',
    );
    assert.equal(
      Object.keys(thrown).length,
      3,
      `S-FAILFORM: ${site}'s member-set length must be \`3\` (\`surface.md §2.5\` item 9)`,
    );
    assert.ok(
      Array.isArray(thrown.log),
      `S-FAILFORM: ${site}'s \`log\` must be an ARRAY — never absent, never \`null\`, never a non-array `
      + '(`surface.md §2.5` item 9; `parameter-semantics.md §2.26`\'s `domain` cell)',
    );
    assert.equal(
      thrown.log.length,
      0,
      `S-FAILFORM: ${site} reaches no attempt at all, so its DECLARED \`log\` is \`[]\` — the empty array `
      + 'and never a placeholder entry (`surface.md §2.5` item 4)',
    );
    assert.ok(
      THE_SIXTEEN.includes(thrown.status),
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
  //
  // **⟶ AND THIS CELL IS THE SECOND OF THE TWO THE ADVERSARIAL PASS FOUND ASSERTING ONLY OVER A LITERAL
  // TYPED IN THIS FILE.** It no longer holds one: the label it prints and asserts is EXTRACTED FROM THE
  // BATTERY ARTIFACT THAT CARRIES IT (`greens/greens.mjs`), and the three readings — the artifact's
  // declaration, the artifact's head comment, and `acceptance.md §4.2` item 1's label for this unit — are
  // asserted against EACH OTHER. **THE FALSIFIER: move the artifact's label to `ASSEMBLED/RENDERER` and this
  // cell fails at `homes.declared` and at `homes.commented === homes.declared`; delete the artifact and it
  // fails on the read.**
  const homes = layerLabelHomes();
  console.log(`SITE ${FIGURE.site}`);
  console.log(`LAYER ${homes.declared} (APP = NONE, app-green claimed: ${FIGURE.appGreenClaimed})`);
  assert.match(FIGURE.site, /^node --test, /, 'the site names the command');
  assert.equal(homes.commented, homes.declared,
    'the artifact that carries the label carries it in BOTH of its homes — the head comment and the constant');
  assert.equal(homes.declared, 'ENVELOPE/PURE',
    '§4.2 item 1: the layer label READ OFF the artifact is this unit\'s JS-side green, and it travels WITH the figure');
  assert.equal(FIGURE.appGreenClaimed, false, '§4.2 items 2–3: `APP` is `NONE` for this unit');
});
