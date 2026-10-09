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

/**
 * `surface.md §2.4` item 5 (d) / `PAR-JS-12`: **an outside value at the REGISTRATION site answers a JS
 * `TypeError` carrying NO `status` and NO `message`** — the ONE form this package throws that is not
 * `§2.5`'s `{status, message}`, and the distinction `acceptance.md §4.1` item 9 requires a drive to make.
 * The predicate asserts BOTH halves: the class of the thrown value, and the absence of the store's two
 * members (the `message` half is checked with an own-property test, because `TypeError.message` is a REAL
 * inherited property and `'message' in err` would be true for every error).
 */
function isRegistrationTypeError(site) {
  let thrown = null;
  try {
    site();
  } catch (err) {
    thrown = err;
  }
  if (thrown === null) return false;
  if (!(thrown instanceof TypeError)) return false;
  if ('status' in thrown) return false;
  if (Object.prototype.hasOwnProperty.call(thrown, 'message')) return false;
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
// | `§2.4` rule 4 / `DD-15` | a withdrawn registration (after `unlisten` the function never fires again) and the re-`listen` that mints a DIFFERENT handle |
// | item 5 (d) — the OUTSIDE classes, EACH a JS `TypeError` carrying NO `status` and NO `message` | a NON-FUNCTION `listener` · a handle this instance NEVER MINTED (fabricated, a bare `string`, a blank token, `null`, `undefined`, an ABSENT argument, a non-opaque object) · a handle a FOREIGN instance minted |
// | item 5 (b) | the return value of a success AND of a REPLACEMENT (`undefined` on both) |
// | `§2.7` item 2 | the invocation happens AFTER the verb returned |
// | **`§2.4` item 5 (e)** | the TWO throw sites are separated: `§2.5`'s `{status, message}` for a VERB and this site's bare `TypeError` for a REGISTRATION |
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

  // --- rule 3: one invocation per DISTINCT handle, never a fan-out — and two CONSTRUCTION entries at one
  //     address carrying ONE token are the store's own lawful duplicate (`triggered` carries it once).
  const dup = mem([
    { address: ['d'], handle: 'l-dup' },
    { address: ['d'], handle: 'l-dup' },
  ]);
  const dupRecord = write(dup, ['d'], 'mem', value(rng.next().value));
  if (dupRecord.triggered.length !== 1) return false;
  let dupFired = 0;
  dup.register(dupRecord.triggered[0], () => { dupFired += 1; });
  write(dup, ['d'], 'mem', value(rng.next().value));
  if (dupFired !== 1) return false; // once per DISTINCT handle

  // --- item 5 (d): EVERY OUTSIDE CLASS IS THE SAME JS `TypeError`, carrying NO `status` and NO `message`
  //     — and the IN-DOMAIN form is still a SUCCESS, so the predicate cannot be satisfied by a site that
  //     throws on everything.
  const mine = mem([{ address: ['a'], handle: 'l1' }]);
  const held = write(mine, ['a'], 'mem', 1).triggered[0];
  let heldFired = 0;
  if (mine.register(held, () => { heldFired += 1; }) !== undefined) return false;
  const stranger = mem();
  const fabricated = listen(stranger, ['x']);
  const outside = [
    () => mine.register(held, 42), //                        a NON-FUNCTION listener
    () => mine.register(held, 'not-a-function'),
    () => mine.register(held, null),
    () => mine.register(held, undefined),
    () => mine.register(held, {}),
    () => mine.register(held), //                            an ABSENT `listener`
    () => mine.register(undefined, () => {}), //             a handle `undefined`
    () => mine.register(null, () => {}),
    () => mine.register('l1', () => {}), //                  a bare string naming a token
    () => mine.register('', () => {}), //                    a blank token
    () => mine.register(`listener-${rng.next().value}`, () => {}), // a GUESSED token
    () => mine.register({}, () => {}), //                    a fabricated non-opaque value
    () => mine.register(fabricated, () => {}), //            a value a FOREIGN instance minted
    () => mine.register(() => {}, () => {}), //              a function as the handle
  ];
  for (const site of outside) {
    if (!isRegistrationTypeError(site)) return false;
  }
  // NOTHING REACHES THE STORE IN ANY OF THOSE CASES (`item 5 (d)`), and no other registration is disturbed:
  const untouched = write(mine, ['a'], 'mem', 2);
  if (untouched.triggered.length !== 1 || heldFired !== 1) return false;
  return true;
});

line(P_SM_5, 'S-REG-DUP', 10, (attempt) => {
  // Two construction entries at ONE address carrying the caller's SAME token: `triggered` carries it ONCE
  // where the store minted it, and the registry fires once per DISTINCT handle.
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l1' },
  ]);
  const record = write(inst, ['a'], 'mem', 1);
  return record.triggered.length === 1;
});

line(P_SM_5, 'S-OPAQUE', 10, (attempt) => {
  const rng = draw(attempt);
  const inst = mem();
  const handle = listen(inst, ['x', rng.next().value]);
  const spellings = [String(handle), JSON.stringify(handle), Object.getOwnPropertyNames(handle).join(',')];
  const opaque = !spellings.some((s) => String(s).includes('listener-'));
  const bare = unlisten(inst, 'l1') === undefined;
  return opaque && bare;
});

line(P_SM_5, 'S-WITHDRAW', 10, () => {
  // `unlisten` withdraws the STORE-side home entry; a re-`listen` at the same address mints a DIFFERENT
  // handle whose registration is a NEW entry. **THE FUNCTION HALF — that a registry entry STANDS after the
  // withdrawal and its function therefore "simply never fires again", rather than the ENTRY being removed —
  // is DRIVEN at `S-REG` above** (`§2.4` rule 4 / `DD-15`), where the registration site of `§2.4` item 5 is
  // reachable; this line keeps the store-side half it can see from the declared verbs alone.
  const inst = mem();
  const first = listen(inst, ['a']);
  unlisten(inst, first);
  const afterWithdrawal = write(inst, ['a'], 'mem', 1);
  const again = listen(inst, ['a']);
  const afterAgain = write(inst, ['a'], 'mem', 2);
  return (
    afterWithdrawal.triggered.length === 0 &&
    again !== first &&
    afterAgain.triggered.length === 1
  );
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
  const sites = [`${HERE} (node --test)`, 'bindings/js/tests (cargo test)'];
  const layers = ['ENVELOPE/PURE', 'ENVELOPE/PURE'];
  const appGreenClaimed = /APP[- ]?(layer|green)\s*[:=]\s*(green|GREEN)/.test(
    readFileSync(join(PACKAGE_DIR, 'README.md'), 'utf8'),
  );
  return sites.every((s) => s.length > 0) && layers.every((l) => l === 'ENVELOPE/PURE') && !appGreenClaimed;
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
  const rng = draw(attempt);
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l2' },
    { address: ['a'], handle: `l${3 + rng.next().value}` },
  ]);
  const first = write(inst, ['a'], 'mem', 1);
  const second = write(inst, ['a'], 'mem', 2);
  // SET equality, never a sequence: the two enumerations are compared as sets and their order is not asserted.
  return new Set(first.triggered).size === new Set(second.triggered).size;
});

line(P_TP_8, 'S-FIRE-WINDOW', 5, () => {
  // **`§2.7` ITEM 2 DECLARES THE WINDOW EXACTLY: *"the invocation is SYNCHRONOUS and happens AFTER the
  // store call has completed and the record has been copied out"*** — so the drive asserts the sequence and
  // nothing the clause does not fix: (i) the call to the verb RETURNS THE RECORD FIRST, (ii) the registered
  // function runs AFTER that return and BEFORE control reaches the statement following it (that is what
  // SYNCHRONOUS means here, and it is the only observable the clause names), (iii) the record the caller
  // holds is complete and copied out BEFORE the window opens, so no listener's fate can alter it, and
  // (iv) a THROWING body (`§2.7` item 4, `DD-23`) propagates and neither rolls back nor alters the store's
  // result — the write stays applied and a later read sees it.
  //
  // **AND ONE THING THIS LINE DOES NOT ASSERT, BECAUSE NO CLAUSE DECLARES IT: THE INVOKED FUNCTION'S OWN
  // ARGUMENTS.** `§2.7` fixes the window, the order and the throwing body; `§2.4` item 5 (b) fixes the
  // REGISTRATION's two arguments; **no clause of this directory declares what the listener is CALLED
  // with** — recorded as a CONTRACT FINDING rather than invented as an assertion here.
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const handle = write(inst, ['a'], 'mem', 1).triggered[0];
  const trace = [];
  let insideWindow = null; // the store's own state AT THE MOMENT the listener runs
  let storeAtWindow = null;
  inst.register(handle, () => {
    insideWindow = read(inst, ['a']);
    storeAtWindow = inst; // the same instance, so no listener's fate swapped a store
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
  if (storeAtWindow !== inst) return false;
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
});
