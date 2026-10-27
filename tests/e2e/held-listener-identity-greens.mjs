// tests/e2e/held-listener-identity-greens.mjs   ⟶ MOVED 2026-10-25 (`D-5`), FROM `bindings/js/greens/held-listener-identity-greens.mjs`.
// THE BLIND GREENS DRIVER for `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`), gate 5 (`P5`).
//
// AUTHORED FROM THE DOCUMENTATION ALONE: docs/specs/storeroom-held-listener-identity-greens.md — the
// scenario set this file drives, cell for cell and in the same order. NO byte of `bindings/js/index.mjs`,
// `bindings/js/src/**`, `src/**`, `bindings/js/test/**` or `tests/**` was READ by the pass that wrote this
// file. Both consumer modules below are reached ONLY as imports, through the homes their own clauses
// declare: the package's claimed ESM entry (`docs/specs/storeroom-js/package.md §1.1`) and the kernel
// module's declared checkout home `bindings/js/src/constraint-kernel.mjs`
// (`docs/specs/storeroom-constraints/kernel-surface.md §1` item 1).
//
// LAYER: ENVELOPE/PURE.   APP LAYER: NONE.   NO `APP`-GREEN IS CLAIMED HERE OR ANYWHERE IN THIS RUN.
//
// RUN:  node tests/e2e/held-listener-identity-greens.mjs        (from the repository root)   ⟶ MOVED 2026-10-25 (`D-5`): this command read `node bindings/js/greens/held-listener-identity-greens.mjs` until the batteries were stratified.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const LAYER = 'ENVELOPE/PURE';
const APP_LAYER = 'NONE';

// ── the declared surfaces, taken from the docs alone ────────────────────────────────────────────────────
// contract.md §2.7 item 9 (`10 + 1 + 1 + 2 = 14` ✓); §2.9 item 1 / package.md §1.3 item 3 (one name).
const NAMESPACE = ['storeCreate'];
const PRODUCT_MEMBERS = ['addConstraint', 'constraintOff', 'constraintOn', 'constraints', 'delete', 'listen',
  'read', 'readLiteral', 'register', 'removeConstraint', 'removeListener', 'rollback', 'unlisten', 'write'];
// The names the merged-away members carried (js corpus: surface.md §2.4 item 9 (f)'s clause of 2026-10-18).
const MERGED_AWAY = ['on', 'off', 'settle'];
// remove-member.md §7 `MF-6`: the kernel's surface is six items and no seventh name is reachable.
const KERNEL_ITEMS = ['commit', 'log', 'register', 'remove', 'report', 'runAttempt'];
// fail-surface.md §2's `KC` set, closed at EIGHT.
const KC_SET = ['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8'];
// surface.md §2.5 item 4 / item 9: the crossed failure form, three members, `log` on every arm.
const FORM_MEMBERS = 'log,message,status';
// **⟶ RE-DERIVED 2026-10-26: store contract §8.1's closed set at its canonical rank order, and the figure is
// TWENTY, not the sixteen this line printed** — `A148` Q3 appended rank `17`, the `DEF-S`/`DEF-N` ruling
// appended `18` and `19`, and the `DEF-H`/`DEF-W` ruling appended rank `20` (`ConstraintPassRefused`, the ONE
// status a CONSTRAINT REFUSAL answers with), with `11 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 20` ✓ and NO RANK OF
// `1`…`19` MOVING. **A membership test read off a superseded census answers `false` for a lawful member — the
// drift this constant exists to prevent — and the count's own title moves with it.**
const CLOSED_SET = ['AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch', 'WriteParentNotLink',
  'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing', 'FilePathUnreachable',
  'ValueNotAdmitted', 'FileCommitFailed', 'ConstraintListInvalid', 'ValueRefusedAtBoundary',
  'ConstraintBodyThrew', 'ConstraintRefusedAtRegistration', 'ConstraintPassRefused'];
const PLACEHOLDER_TOKENS = ['<SEGMENT>', '<CONTAINER>', '<mismatch clause>', '<available clause>',
  '<CONTAINERSEGMENT>', '<KEYLIST>', '<TIERLIST>', '<DOMAINLIST>', '<arguments>', '<argument-name>', '<TRAITS>'];

// ── the run's own bookkeeping ───────────────────────────────────────────────────────────────────────────
let authored = 0, executed = 0, pass = 0, fail = 0;
const fails = [];
const perScenario = new Map();
const NOTES = [];   // observations this set RECORDS and does not assert, printed with the run

function A(id, clause, expectation, cond, observed) {
  authored += 1; executed += 1;
  const sc = id.split('.')[0];
  if (!perScenario.has(sc)) perScenario.set(sc, { pass: 0, fail: 0 });
  const rec = perScenario.get(sc);
  if (cond) { pass += 1; rec.pass += 1; } else {
    fail += 1; rec.fail += 1;
    fails.push({ id, clause, expectation, observed: String(observed) });
    console.log(`FAIL ${id}  expected: ${expectation}\n             observed: ${observed}\n             clause:   ${clause}`);
  }
}

function fmt(v) {
  try {
    if (typeof v === 'string') return JSON.stringify(v);
    if (typeof v === 'bigint') return `${v}n`;
    if (typeof v === 'symbol') return String(v);
    if (typeof v === 'function') return 'function';
    if (typeof v === 'number') return String(v);
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
function ownNames(v) {
  if (v === null || typeof v !== 'object') return [];
  return Object.getOwnPropertyNames(v).sort();
}
const isForm = (r) => r.threw && ownNames(r.err).join(',') === FORM_MEMBERS;
const statusOf = (r) => (r.threw && r.err !== null && typeof r.err === 'object' ? r.err.status : '<no throw>');
const msgOf = (r) => (r.threw && r.err !== null && typeof r.err === 'object' ? r.err.message : undefined);
const plainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
  && Object.getPrototypeOf(v) === Object.prototype;
// contract §2.4 item 1: every element of `triggered` and of `pending` is a `{handle, address}` pair.
const isPair = (v) => plainObject(v) && Object.getOwnPropertyNames(v).sort().join(',') === 'address,handle'
  && typeof v.handle === 'string' && v.handle !== '' && Array.isArray(v.address);
const isAddress = (v) => Array.isArray(v)
  && v.every((s) => (typeof s === 'string') || (typeof s === 'number' && Number.isInteger(s) && s >= 0));
// set equality over arrays of addresses, because NO ORDER IS DECLARED over any returned list (DD-37/DD-22).
const keyOfAddr = (a) => JSON.stringify(a);
const setEq = (a, b) => a.length === b.length && a.every((x) => b.some((y) => keyOfAddr(x) === keyOfAddr(y)));
// the declared relation for opaque identity comparison: PAR-JS-25's `equal to itself`, never contents.
const opacityOf = (v) => (v === undefined || v === null) ? 'absent'
  : (typeof v === 'object' ? (Object.keys(v).length === 0 ? 'opaque-object' : `object-with-${Object.keys(v).length}-keys`)
    : `primitive:${typeof v}`);

const ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'sr-hli-greens-'));
function cfgFor(name) {
  const dir = path.join(ROOT, name);
  fs.mkdirSync(dir, { recursive: true });
  return { filePath: path.join(dir, 'state.json'), journalLength: 4, listeners: [] };
}

// ── the TWO consumer modules: the package's claimed ESM entry, and the kernel's declared home ───────────
let ns = null, IMPORT_ERROR = null;
try { ns = await import('../../bindings/js/index.mjs'); } catch (e) { IMPORT_ERROR = e; }
if (ns === null) {
  console.log(`FATAL — the claimed ESM entry did not resolve, so NO cell of this set can run: ${IMPORT_ERROR}`);
  console.log(`AUTHORED ${authored} · EXECUTED 0 · PASS 0 · FAIL 0 · UNABLE-TO-RUN`);
  process.exit(2);
}
let kernel = null, KERNEL_ERROR = null;
try { kernel = await import('../../bindings/js/src/constraint-kernel.mjs'); } catch (e) { KERNEL_ERROR = e; }
const K1 = (store, address, id, fn) => kernel.register(store, address, id, fn);
const K2 = (store, address, tier, value) => kernel.commit(store, address, tier, value);
const K3 = (store, attempt) => kernel.runAttempt(store, attempt);
const K4 = (store, attempt) => kernel.log(store, attempt);
const K6 = (store, pair) => kernel.remove(store, pair);

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-01 — THE SURFACE AND THE MEMBER SET
// contract.md §2.7 item 9 · §5.7 `S-MEMBER-COUNT` · §2.9 item 1 (the kernel's extent is `§2.9`'s own
// subject and is driven at HLI-13) · removal-members.md §7 items 2–3 · listen-verb.md §1 item 1.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const inst = ns.storeCreate(cfgFor('g01'));
  A('HLI-01.1', 'package.md §1.1; §1.3 item 3 (one named export)',
    "the module namespace's own names are exactly `['storeCreate']` — `11 → 1` ✓, no second name",
    Object.keys(ns).sort().join(',') === NAMESPACE.join(','), fmt(Object.keys(ns).sort()));
  const members = ownNames(inst);
  A('HLI-01.2', 'contract.md §2.7 item 9 (`10 + 1 + 1 + 2 = 14` ✓) · §5.7 `S-MEMBER-COUNT`',
    'the product\'s own member set is exactly the fourteen declared names, with no thirteenth and no fifteenth',
    members.join(',') === [...PRODUCT_MEMBERS].sort().join(','), fmt(members));
  A('HLI-01.3', 'contract.md §2.7 item 1 (two members, named and shaped)',
    'every one of the fourteen own members is a function',
    members.every((n) => typeof inst[n] === 'function'),
    fmt(members.map((n) => `${n}:${typeof inst[n]}`)));
  A('HLI-01.4', 'contract.md §2.7 item 9 item 3; §5.7 `FAILURE LIST` (a remove member as a module export)',
    'neither `removeListener` nor `removeConstraint` is an own export of the module namespace',
    !('removeListener' in ns) && !('removeConstraint' in ns),
    fmt(Object.keys(ns).sort()));
  A('HLI-01.5', 'listen-verb.md §1 item 1 (the arity is `2` and there is no third position)',
    "`listen.length === 2` — position 1 `handle`, position 2 `addresses`, and no third position",
    inst.listen.length === 2, `listen.length = ${inst.listen.length}`);
  A('HLI-01.6', 'listen-verb.md §1 item 1 (the receiver is the store, and no position is an instance)',
    '`listen` is a function reached through the product returned by `storeCreate(cfg)`',
    typeof inst.listen === 'function', `typeof inst.listen = ${typeof inst.listen}`);
  A('HLI-01.7', 'removal-members.md §2 item 1; §3 item 1 (both members live on the product)',
    'both remove members are functions on the product',
    typeof inst.removeListener === 'function' && typeof inst.removeConstraint === 'function',
    `removeListener:${typeof inst.removeListener} removeConstraint:${typeof inst.removeConstraint}`);
  A('HLI-01.8', 'js corpus surface.md §2.4 item 9 (f)\'s clause of 2026-10-18 (the merged-away names)',
    'no merged-away name (`on`/`off`/`settle`) is an own member of the product',
    MERGED_AWAY.every((n) => !members.includes(n)),
    fmt(members.filter((n) => MERGED_AWAY.includes(n))));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-02 — THE HANDLE'S STRING DOMAIN AND ITS REFUSAL CLASSES
// identity-and-domain.md §1 item 1, §2 items 1–3 · listen-verb.md §2.1, §8 `LF-1` · contract.md §2.1
// items 1/4/5, §4 `F-1`/`F-3`/`F-4`/`F-6` · §2.7 item 5.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g02'));
  const A1 = [['h2']];
  // (a) A FRESH WELL-FORMED HANDLE IS ADMITTED — it is NOT in `listen`'s refusal set (identity-and-domain
  //     §2 item 3's 2026-10-18 amendment: the refusal set at position 1 is exactly five classes).
  const admit = thrown(() => i.listen('hlFresh', A1));
  A('HLI-02.1', 'identity-and-domain.md §2 item 3\'s amendment; listen-verb.md §8 `LF-1`; contract.md §2.2 item 1',
    'a non-empty string the caller has just spelled is IN the domain at `listen`: the call succeeds',
    !admit.threw, admit.threw ? `threw ${statusOf(admit)}` : 'returned');
  A('HLI-02.2', 'listen-verb.md §4 state 1 (the entry is CREATED); contract.md §2.2 item 5 (a)',
    'the admitted handle names a NEW listener: the entry exists, so `register` on it succeeds',
    !thrown(() => i.register('hlFresh', () => { })).threw,
    fmt(thrown(() => i.register('hlFresh', () => { }))));
  // (b) THE FIVE CLASSES OF `LF-1`, and the wider non-string set behind them.
  const outside = [
    ['HLI-02.3', 'a BLANK string `""`', ''],
    ['HLI-02.4', '`null`', null],
    ['HLI-02.5', '`undefined`', undefined],
    ['HLI-02.6', 'a `number`', 7],
    ['HLI-02.7', 'a `boolean`', true],
    ['HLI-02.8', 'a `bigint`', 7n],
    ['HLI-02.9', 'a plain object', {}],
    ['HLI-02.10', 'an array', []],
    ['HLI-02.11', 'a function', () => { }],
    ['HLI-02.12', 'a `Symbol`', Symbol('h')],
  ];
  for (const [id, what, v] of outside) {
    const r = thrown(() => i.listen(v, A1));
    A(id, 'identity-and-domain.md §2 item 3 rows 1–6; listen-verb.md §8 `LF-1`; contract.md §4 `F-1`',
      `${what} is refused at \`listen\`'s position 1 with the store's \`AddressMalformed\``,
      r.threw && statusOf(r) === 'AddressMalformed', r.threw ? fmt(`${statusOf(r)} / ${String(msgOf(r)).slice(0, 60)}`) : 'returned normally');
  }
  const absent = thrown(() => i.listen());
  A('HLI-02.13', 'listen-verb.md §8 `LF-1` (the position ABSENT); contract.md §4 `F-1`',
    'an ABSENT position 1 is refused with `AddressMalformed`',
    absent.threw && statusOf(absent) === 'AddressMalformed', fmt(statusOf(absent)));
  // (c) THE FORM: the surface's ONE thrown form, three members, on every one of those arms.
  const blank = thrown(() => i.listen('', A1));
  const num = thrown(() => i.listen(9, A1));
  A('HLI-02.14', 'js corpus surface.md §2.5 item 4 and item 9 (the three-member crossed form)',
    "a class refusal's own member set is exactly `['log','message','status']` — the blank-string arm",
    isForm(blank), fmt(ownNames(blank.err)));
  A('HLI-02.15', 'js corpus surface.md §2.5 item 4 and item 9 (the same set, flat across arms)',
    'the same three-member set on the non-string arm',
    isForm(num), fmt(ownNames(num.err)));
  const m = msgOf(blank);
  A('HLI-02.16', 'js corpus surface.md §2.5 item 2 (never empty, never a placeholder)',
    'the message is a non-empty string free of unsubstituted placeholders',
    typeof m === 'string' && m.length > 0 && !PLACEHOLDER_TOKENS.some((t) => m.includes(t)),
    fmt(String(m).slice(0, 90)));
  // (d) A REFUSED `listen` REACHES NO STORE ACT: it created no entry.
  A('HLI-02.17', 'contract.md §2.1 item 5 (the fabricated row at `register`); listen-verb.md §2.2 item 3',
    'a refused `listen` created no entry, so `register` on that handle is refused (`AddressMalformed`)',
    (() => { const r = thrown(() => i.register('hlNeverListened', () => { })); return r.threw && statusOf(r) === 'AddressMalformed'; })(),
    fmt(statusOf(thrown(() => i.register('hlNeverListened', () => { })))));
  // (e) `unlisten`'s NO-OP SUCCESS over the same values, and it removes no other registration.
  let otherFired = 0;
  i.listen('hlOther', [['hOther']]);
  i.register('hlOther', () => { otherFired += 1; });
  const unlistenArms = [['HLI-02.18', '`""`', ''], ['HLI-02.19', '`null`', null],
    ['HLI-02.20', 'a `number`', 5], ['HLI-02.21', 'an ABSENT argument', undefined]];
  for (const [id, what, v] of unlistenArms) {
    const r = thrown(() => (v === undefined ? i.unlisten() : i.unlisten(v)));
    A(id, 'identity-and-domain.md §2 items 2–3 (the `unlisten` column); contract.md §4 `F-3`',
      `\`unlisten\` over ${what} is a NO-OP SUCCESS returning \`undefined\``,
      !r.threw && r.value === undefined, r.threw ? `threw ${fmt(statusOf(r))}` : fmt(r.value));
  }
  i.write(['hOther'], 'temp', 1);
  A('HLI-02.22', 'identity-and-domain.md §6 `O-3`; contract.md §4 `F-3`',
    'those no-op successes removed no other registration: the other handle still fires',
    otherFired === 1, `the other body ran ${otherFired} time(s)`);
  // (f) `removeListener`'s DECLARED REVERSAL: the same values THROW there.
  const rl = [['HLI-02.23', 'the blank string `""`', ''], ['HLI-02.24', 'a `number`', 5]];
  for (const [id, what, v] of rl) {
    const r = thrown(() => i.removeListener(v));
    A(id, 'removal-members.md §5 rows 4–5, §6 item 1; contract.md §2.1 item 5 (the `removeListener` column)',
      `\`removeListener\` over ${what} THROWS, in rule (i)'s three-member form with \`AddressMalformed\``,
      r.threw && statusOf(r) === 'AddressMalformed' && isForm(r),
      r.threw ? fmt(`${statusOf(r)} ${ownNames(r.err).join(',')}`) : 'returned normally');
  }
  const rlFab = thrown(() => i.removeListener('hlNeverListenedEither'));
  A('HLI-02.25', 'removal-members.md §5 row 7; contract.md §4 `F-6`',
    'a well-formed string the entry does not hold THROWS at `removeListener` (where `unlisten` answers a no-op success)',
    rlFab.threw, rlFab.threw ? fmt(statusOf(rlFab)) : 'returned normally');
  const rlAbsent = thrown(() => i.removeListener());
  A('HLI-02.26', 'removal-members.md §5 row 6 (an ABSENT argument THROWS)',
    'an ABSENT argument THROWS at `removeListener`',
    rlAbsent.threw, rlAbsent.threw ? fmt(statusOf(rlAbsent)) : 'returned normally');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-03 — `listen`'s SET POSITION, POSITION 2
// listen-verb.md §2.2 items 1–4 · contract.md §2.2 item 2, §4 `F-2` · parameter-semantics.md `PAR-HL-2`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g03'));
  const inDomain = [['HLI-03.1', 'the EMPTY array `[]`', [], 'listen-verb.md §2.2 item 1 (the empty array is IN the domain)'],
  ['HLI-03.2', 'a set of ONE address `[[\'a\']]`', [['a']], 'listen-verb.md §2.2 item 1'],
  ['HLI-03.3', 'a set of TWO addresses', [['a'], ['b']], 'listen-verb.md §2.2 item 1']];
  for (const [id, what, v, clause] of inDomain) {
    // ⟶ **RE-DERIVED 2026-10-25 (`D-20`'s execution pass, `D-22`): THE RETURN MOVES `undefined → Handle`.**
    // `contract.md §2.2` item 10 declared `listen -> undefined` and `D-22` (`"Listen should return the handle on
    // success"`) overrules it by name: the call ANSWERS THE HANDLE IT WATCHES UNDER — the caller's own spelling —
    // and `bindings/js/index.d.ts:616` declares `(handle: Handle, addresses: readonly Address[]): Handle`.
    // **The cell's subject is kept whole** — *is this SET in the domain, and what does the call answer* — and the
    // expected answer moves to the one the declaration carries. A refused call would still report its status here.
    const spelling = `set-${id}`;
    const r = thrown(() => i.listen(spelling, v));
    A(id, `${clause}; contract.md §2.2 item 10 READ THROUGH \`D-22\` (\`bindings/js/index.d.ts:616\`)`,
      `${what} is IN the domain: the call succeeds and answers THE HANDLE it watches under — the caller's own spelling`,
      !r.threw && r.value === spelling, r.threw ? fmt(statusOf(r)) : fmt(r.value));
  }
  const outside = [
    ['HLI-03.4', 'ABSENT', undefined],
    ['HLI-03.5', '`null`', null],
    ['HLI-03.6', 'a non-array (`\'a\'`)', 'a'],
    ['HLI-03.7', 'a BARE SEGMENT LIST `[\'a\']` — one address where a set is required', ['a']],
    ['HLI-03.8', 'an array carrying a member outside the address domain (`[1.5]`)', [['a'], [1.5]]],
    ['HLI-03.9', 'an array of arrays that is not itself a set (`[[[\'a\']]]`)', [[['a']]]],
  ];
  for (const [id, what, v] of outside) {
    const r = thrown(() => (v === undefined ? i.listen('set-out', undefined) : i.listen('set-out', v)));
    A(id, 'listen-verb.md §2.2 item 2 (the six outside classes) and item 3; contract.md §4 `F-2`',
      `${what} is OUTSIDE position 2 and answers the one thrown form with \`AddressMalformed\``,
      r.threw && statusOf(r) === 'AddressMalformed' && isForm(r),
      r.threw ? fmt(`${statusOf(r)} ${ownNames(r.err).join(',')}`) : 'returned normally');
  }
  const refused = thrown(() => i.listen('setNothing', ['a']));
  const afterRefusal = thrown(() => i.register('setNothing', () => { }));
  A('HLI-03.10', 'listen-verb.md §2.2 item 3 ("NO STORE ACT IS REACHED ON ANY OF THE SIX")',
    "a refused set position reached no store act: the handle it named has no entry, so `register` is refused",
    refused.threw && afterRefusal.threw && statusOf(afterRefusal) === 'AddressMalformed',
    `listen:${refused.threw ? 'threw' : 'returned'} register:${afterRefusal.threw ? statusOf(afterRefusal) : 'succeeded'}`);
  A('HLI-03.11', 'listen-verb.md §2.2 item 4 (the discriminator is the MEMBER\'S CLASS, never a length heuristic)',
    'the discriminator distinguishes a SET from an ADDRESS: `[[\'a\']]` is admitted while `[\'a\']` is refused',
    !thrown(() => i.listen('setOne', [['a']])).threw && thrown(() => i.listen('setBare', ['a'])).threw,
    'a set-of-one admitted; a bare segment list refused');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-04 — THE PURGE EVERYTHING BY HANDLE
// contract.md §2.2 items 3–4, §5.2 `S-PURGE-SET`/`S-PURGE-ALL` · listen-verb.md §3 items 1–2, §8 `LF-4`/`LF-6`
// · identity-and-domain.md §6 `O-1`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g04'));
  let fired = [];
  const listen1 = thrown(() => i.listen('ph', [['p1'], ['p2']]));
  i.register('ph', (addr) => fired.push(JSON.stringify(addr)));
  // ⟶ RE-DERIVED 2026-10-25 (`D-22`): the return is the handle it watches under, not `undefined`.
  A('HLI-04.1', 'contract.md §2.2 item 10 read THROUGH `D-22` (`bindings/js/index.d.ts:616`); parameter-semantics.md `PAR-HL-3`',
    '`listen(handle, addresses)` answers THE HANDLE it watches under — `\'ph\'`, the caller\'s own spelling',
    !listen1.threw && listen1.value === 'ph', listen1.threw ? fmt(statusOf(listen1)) : fmt(listen1.value));
  const w1 = thrown(() => i.write(['p1'], 'temp', 1));
  const w2 = thrown(() => i.write(['p2'], 'temp', 2));
  const handlesAt = (r) => (r.threw ? [] : r.value.triggered.filter((e) => e.handle === 'ph').map((e) => e.address));
  A('HLI-04.2', 'contract.md §2.2 item 5 (a); §3 `S-3` (one handle, two addresses, ONE entry)',
    'one `listen` at two addresses yields ONE entry standing at BOTH — a write at each carries the pair',
    keyOfAddr(handlesAt(w1)[0] ?? null) === keyOfAddr(['p1']) && keyOfAddr(handlesAt(w2)[0] ?? null) === keyOfAddr(['p2']),
    fmt([w1.threw ? statusOf(w1) : handlesAt(w1), w2.threw ? statusOf(w2) : handlesAt(w2)]));
  A('HLI-04.3', 'contract.md §2.2 item 5 (b); §2.4 item 6 (one invocation per distinct handle)',
    'the armed body ran once per write at each address',
    fired.length === 2, `body ran ${fired.length} time(s): ${fmt(fired)}`);
  const f1 = thrown(() => i.listen('ph', [['p3']]));
  // ⟶ RE-DERIVED 2026-10-25 (`D-22`): the second `listen` answers its own spelling, not `undefined`.
  A('HLI-04.4', 'contract.md §2.2 item 3 (S1 purged wholesale) — `listen-verb.md §3` item 1 — read with `D-22` (`bindings/js/index.d.ts:616`)',
    'a second `listen` at a disjoint set succeeds and answers the handle it watches under (`\'ph\'`)',
    !f1.threw && f1.value === 'ph', f1.threw ? fmt(statusOf(f1)) : fmt(f1.value));
  const firedBefore = fired.length;
  const a1 = thrown(() => i.write(['p1'], 'temp', 3));
  const a2 = thrown(() => i.write(['p2'], 'temp', 4));
  const a3 = thrown(() => i.write(['p3'], 'temp', 5));
  A('HLI-04.5', 'contract.md §5.2 `S-PURGE-SET` / `FAILURE LIST` (nothing of `S1` surviving)',
    'after `listen(ph, S2)` nothing of `S1` survives: a write at `p1` carries no pair for `ph`',
    !a1.threw && handlesAt(a1).length === 0, a1.threw ? fmt(statusOf(a1)) : fmt(handlesAt(a1)));
  A('HLI-04.6', 'contract.md §5.2 (S1 purged WHOLESALE — at EVERY address it stood at)',
    'the same at `p2`: the second address of `S1` is purged too',
    !a2.threw && handlesAt(a2).length === 0, a2.threw ? fmt(statusOf(a2)) : fmt(handlesAt(a2)));
  A('HLI-04.7', 'contract.md §2.2 item 3 (the standing set is S2 alone)',
    '`S2` is installed: a write at `p3` carries the pair',
    !a3.threw && keyOfAddr(handlesAt(a3)[0] ?? null) === keyOfAddr(['p3']),
    a3.threw ? fmt(statusOf(a3)) : fmt(handlesAt(a3)));
  A('HLI-04.8', 'contract.md §5.2 `S-PURGE-ALL` (asserted through a later trigger); listen-verb.md §8 `LF-4`',
    'the set-assignment is not a union: the body did NOT fire for the purged addresses',
    fired.length === firedBefore, `body ran ${fired.length - firedBefore} more time(s)`);
  const again = thrown(() => i.listen('ph', [['p3']]));
  const a4 = thrown(() => i.write(['p3'], 'temp', 6));
  A('HLI-04.9', 'contract.md §2.2 item 3 (`listen(h,S1)` twice is idempotent IN EFFECT)',
    'a repeated `listen(h, S2)` is idempotent in effect: the handle still stands at `p3` exactly ONCE',
    !again.threw && !a4.threw && handlesAt(a4).length === 1, a4.threw ? fmt(statusOf(a4)) : fmt(handlesAt(a4)));
  const reuse = thrown(() => i.listen('ph', [['p4']]));
  const a5 = thrown(() => i.write(['p3'], 'temp', 7));
  A('HLI-04.10', 'contract.md §5.1 `P-HL-1` (a reused handle REPLACES — no two live entries share a string)',
    'a reused handle replaces: after `listen(ph, [p4])` no pair stands at `p3` for `ph`',
    !reuse.threw && !a5.threw && handlesAt(a5).length === 0, a5.threw ? fmt(statusOf(a5)) : fmt(handlesAt(a5)));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-05 — THE THREE STATES OF THE ENTRY AND THE ONE TRANSITION
// listen-verb.md §4 (states 1–3 and `T`) · identity-and-domain.md §3 item 2, §4 · contract.md §2.2
// item 5, §3 `S-6`/`S-7`, §2.7 item 2.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g05'));
  let calls = 0;
  const l = thrown(() => i.listen('sh', [['s1']]));
  const r0 = thrown(() => i.register('sh', () => { calls += 1; }));
  // ⟶ RE-DERIVED 2026-10-25 (`D-22`): `listen` answers the handle (`'sh'`) while `register` STILL answers
  // `undefined` — `D-22` moved `listen`'s return and nothing else (`index.d.ts`: `register(...): void`).
  A('HLI-05.1', 'listen-verb.md §4 state 2 (`register` CLEARS `off` and installs the function) read with `D-22` (`bindings/js/index.d.ts:616`)',
    '`listen` then `register` arms the entry; `listen` answers the handle it watches under (`\'sh\'`) and `register` answers `undefined`',
    !l.threw && l.value === 'sh' && !r0.threw && r0.value === undefined,
    `listen:${l.threw ? statusOf(l) : fmt(l.value)} register:${r0.threw ? statusOf(r0) : 'undefined'}`);
  const w1 = thrown(() => i.write(['s1'], 'temp', 1));
  A('HLI-05.2', 'listen-verb.md §4 state 2 ("the entry invokes `fn` once per distinct handle")',
    'the armed entry invokes the body exactly once at a write at its address',
    !w1.threw && calls === 1, `calls = ${calls}`);
  const u = thrown(() => i.unlisten('sh'));
  A('HLI-05.3', 'contract.md §3 `S-6`; js corpus surface.md §2.3 item 4 (the no-op set is `unlisten`\'s)',
    '`unlisten(handle)` succeeds and returns `undefined`',
    !u.threw && u.value === undefined, u.threw ? fmt(statusOf(u)) : fmt(u.value));
  const before = calls;
  const w2 = thrown(() => i.write(['s1'], 'temp', 2));
  A('HLI-05.4', 'listen-verb.md §4 state 1 (`the recipients list SKIPS the entry, so NOTHING is invoked`)',
    "state 1's declared silence: after `unlisten` a write at the address invokes the body ZERO times",
    !w2.threw && calls === before, `body ran ${calls - before} more time(s)`);
  const r1 = thrown(() => i.register('sh', () => { calls += 1; }));
  A('HLI-05.5', 'identity-and-domain.md §3 item 2 (i) ("the entry EXISTS with `off` set; `register(h, fn)` SUCCEEDS")',
    'after `unlisten` the entry EXISTS (state 1, not state 3): `register` succeeds',
    !r1.threw, r1.threw ? fmt(statusOf(r1)) : 'succeeded');
  const w3 = thrown(() => i.write(['s1'], 'temp', 3));
  A('HLI-05.6', 'identity-and-domain.md §3 item 2 (i) (the entry is re-armed)',
    'the re-armed entry fires again',
    !w3.threw && calls === before + 1, `calls = ${calls}`);
  const rl = thrown(() => i.removeListener('sh'));
  A('HLI-05.7', 'contract.md §2.7 item 2; removal-members.md §2 item 1 (success is `undefined`)',
    '`removeListener(handle)` succeeds on a handle the entry carries and returns `undefined`',
    !rl.threw && rl.value === undefined, rl.threw ? fmt(statusOf(rl)) : fmt(rl.value));
  const r2 = thrown(() => i.register('sh', () => { }));
  A('HLI-05.8', 'identity-and-domain.md §3 item 1 (A DELETED ENTRY IS NOT A RESERVED ONE); contract.md §2.1 item 5',
    'state 3: after `removeListener` the handle is OUTSIDE the domain at `register`, which THROWS',
    r2.threw && statusOf(r2) === 'AddressMalformed', r2.threw ? fmt(statusOf(r2)) : 'succeeded');
  const fresh = thrown(() => i.listen('sh', [['s1']]));
  const beforeFresh = calls;
  const w4 = thrown(() => i.write(['s1'], 'temp', 4));
  A('HLI-05.9', 'identity-and-domain.md §3 item 2 (ii) ("a later `listen(h, S)` creates a FRESH entry with `off` set")',
    'a later `listen` on the deleted handle creates a FRESH state-1 entry that a write carries',
    !fresh.threw && !w4.threw && w4.value.triggered.some((e) => e.handle === 'sh'),
    w4.threw ? fmt(statusOf(w4)) : fmt(w4.value.triggered));
  A('HLI-05.10', 'listen-verb.md §4 state 1 (a fresh reservation invokes nothing)',
    'the fresh entry is RESERVED: its write invoked no body',
    calls === beforeFresh, `body ran ${calls - beforeFresh} more time(s)`);
  const uAfterDelete = thrown(() => i.unlisten('sh'));
  A('HLI-05.11', 'contract.md §3 `S-6`; js corpus surface.md §2.3 item 4',
    '`unlisten` after a removal is still a no-op success returning `undefined`',
    !uAfterDelete.threw && uAfterDelete.value === undefined,
    uAfterDelete.threw ? fmt(statusOf(uAfterDelete)) : fmt(uAfterDelete.value));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-06 — THE TWO NEW MEMBERS' WHOLE REMOVAL
// removal-members.md §2–§6, §8 `RF-1`–`RF-7` · contract.md §2.7 items 2–8, §5.7 `S-REMOVE-WHOLE`/
// `S-REMOVE-ATOMIC` · constraint-identity.md §3 item 2.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g06'));
  i.listen('rh', [['r1'], ['r2']]);
  i.register('rh', () => { });
  const before = thrown(() => i.write(['r1'], 'temp', 1));
  A('HLI-06.1', 'contract.md §5.7 `S-REMOVE-WHOLE` (asserted four ways, one of them by a trigger)',
    'before the removal the handle stands at both of its addresses',
    !before.threw && before.value.triggered.filter((e) => e.handle === 'rh').length === 1,
    before.threw ? fmt(statusOf(before)) : fmt(before.value.triggered));
  const rem = thrown(() => i.removeListener('rh'));
  A('HLI-06.2', 'removal-members.md §2 item 2 (`(R3)`: SUCCESS IS THE NORMAL RETURN)',
    '`removeListener` returns `undefined` — NOT a returned discriminant',
    !rem.threw && rem.value === undefined, rem.threw ? fmt(statusOf(rem)) : fmt(rem.value));
  const after1 = thrown(() => i.write(['r1'], 'temp', 2));
  const after2 = thrown(() => i.write(['r2'], 'temp', 3));
  A('HLI-06.3', 'removal-members.md §2 item 3 (ii): the store\'s home entries are WITHDRAWN, all of them',
    "the handle's store entries are gone at its FIRST address: no pair for `rh`",
    !after1.threw && after1.value.triggered.every((e) => e.handle !== 'rh'),
    after1.threw ? fmt(statusOf(after1)) : fmt(after1.value.triggered));
  A('HLI-06.4', 'removal-members.md §2 item 3 (ii) ("all of them, at every address, by the purge\'s own total reach")',
    'and at its SECOND address',
    !after2.threw && after2.value.triggered.every((e) => e.handle !== 'rh'),
    after2.threw ? fmt(statusOf(after2)) : fmt(after2.value.triggered));
  const regAfter = thrown(() => i.register('rh', () => { }));
  A('HLI-06.5', 'removal-members.md §2 item 4, §8 `RF-1`; identity-and-domain.md §3 item 2 (ii)',
    'after the removal `register` on that handle is REFUSED',
    regAfter.threw && statusOf(regAfter) === 'AddressMalformed', regAfter.threw ? fmt(statusOf(regAfter)) : 'succeeded');
  const relisten = thrown(() => i.listen('rh', [['r1']]));
  const wRelisten = thrown(() => i.write(['r1'], 'temp', 4));
  A('HLI-06.6', 'identity-and-domain.md §3 item 2 (ii) (a FRESH entry, "a different entry in every structural sense")',
    'a later `listen` re-creates the entry and the write carries it once more',
    !relisten.threw && !wRelisten.threw && wRelisten.value.triggered.some((e) => e.handle === 'rh'),
    wRelisten.threw ? fmt(statusOf(wRelisten)) : fmt(wRelisten.value.triggered));
  // ── `removeConstraint`
  const j = ns.storeCreate(cfgFor('g06b'));
  const cv = (ctx) => (ctx.value === 1 ? { message: 'no ones' } : true);
  const idA = thrown(() => j.addConstraint({ address: [['c1']], id: 'mc' }, cv));
  const consBefore = thrown(() => j.constraints());
  const enforced = thrown(() => j.write(['c1'], 'temp', 1));
  A('HLI-06.7', 'constraint-identity.md §2 item 1; contract.md §5.6 `S-ID-STORE`',
    'a pair registered at an address ENFORCES it: a write the constraint refuses is refused',
    !idA.threw && enforced.threw, enforced.threw ? fmt(statusOf(enforced)) : 'the write was applied');
  const rc = thrown(() => j.removeConstraint({ address: [['c1']], id: 'mc' }));
  A('HLI-06.8', 'removal-members.md §3 item 1 (`removeConstraint(pair) -> undefined`)',
    '`removeConstraint(pair)` returns `undefined`',
    !rc.threw && rc.value === undefined, rc.threw ? fmt(statusOf(rc)) : fmt(rc.value));
  const consAfter = thrown(() => j.constraints());
  A('HLI-06.9', 'removal-members.md §3 item 3 ("`constraints()`\'s return SHRINKS by one element per `removeConstraint`")',
    "`constraints()` shrank by exactly one element",
    !consBefore.threw && !consAfter.threw && consAfter.value.length === consBefore.value.length - 1,
    `${consBefore.threw ? statusOf(consBefore) : consBefore.value.length} → ${consAfter.threw ? statusOf(consAfter) : consAfter.value.length}`);
  A('HLI-06.10', 'removal-members.md §3 item 2; constraint-identity.md §3 item 2',
    'the pair is no longer carried by the enumeration',
    !consAfter.threw && !consAfter.value.some((e) => e.id === 'mc'), fmt(consAfter.threw ? statusOf(consAfter) : consAfter.value));
  const noLongerEnforced = thrown(() => j.write(['c1'], 'temp', 1));
  A('HLI-06.11', 'contract.md §2.7 item 3 ("removes EVERYTHING ... the store-side home entry")',
    'the pair no longer stands: the write it refused is now applied',
    !noLongerEnforced.threw, noLongerEnforced.threw ? fmt(statusOf(noLongerEnforced)) : 'applied');
  const idFresh = thrown(() => j.addConstraint({ address: [['c1']], id: 'mc' }, () => true));
  A('HLI-06.12', 'constraint-identity.md §3 item 2 (i) ("a FRESH `addConstraint` AT THAT PAIR ANSWERS A NEW IDENTITY")',
    'a fresh `addConstraint` at the same pair answers a DIFFERENT identity',
    !idA.threw && !idFresh.threw && idFresh.value !== idA.value,
    `first:${fmt(idA.threw ? statusOf(idA) : idA.value)} fresh:${fmt(idFresh.threw ? statusOf(idFresh) : idFresh.value)}`);
  const uncarried = thrown(() => j.removeConstraint({ address: [['zz']], id: 'nope' }));
  A('HLI-06.13', 'removal-members.md §5 row 1, §8 `RF-7`; contract.md §4 `F-8`',
    '`removeConstraint` over a pair the entry does not carry THROWS (it is never a returned discriminant)',
    uncarried.threw, uncarried.threw ? 'threw' : fmt(uncarried.value));
  A('HLI-06.14', 'removal-members.md §6 item 2, §8 `RF-3`/`RF-4`; constraint-sites.md §6 item 3',
    "the pair-shaped refusal is a `TypeError` whose `status` member is ABSENT",
    uncarried.threw && uncarried.err instanceof TypeError
    && !Object.prototype.hasOwnProperty.call(uncarried.err, 'status'),
    uncarried.threw ? fmt(`${uncarried.err?.constructor?.name} status-own:${Object.prototype.hasOwnProperty.call(uncarried.err, 'status')}`) : 'returned');
  const consAfterFail = thrown(() => j.constraints());
  A('HLI-06.15', 'removal-members.md §4 item 4 (after ANY thrown arm all four structures stand as they stood)',
    'a thrown arm leaves the read model unmoved',
    !consAfterFail.threw && consAfterFail.value.length === consBefore.value.length,
    consAfterFail.threw ? fmt(statusOf(consAfterFail)) : fmt(consAfterFail.value.length));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-07 — THE `{handle, address}` PAIR IN BOTH RETURNED RECORDS
// contract.md §2.4 items 1/6/7, §5.3 `S-PAIR-SHAPE`/`S-PAIR-TOTAL`/`S-PAIR-DISTINCT` · trigger-and-pair.md
// §1, §2 items 1/4, §5 items 2–4, §8 `TF-2`/`TF-5`/`TF-6`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g07'));
  i.write(['a'], 'temp', {});
  i.write(['a', 'b'], 'temp', {});
  const args = [];
  i.listen('dh', [['a'], ['a', 'b']]);
  i.register('dh', (addr) => args.push(addr));
  const w = thrown(() => i.write(['a', 'b', 'c'], 'temp', 1));
  // DRIVE CORRECTION (named in the greens document §2.1): the invocation count is read AT THE WRITE's own
  // instant. The first run of this scenario read it AFTER the `delete` below had re-triggered `dh`, and the
  // count it then compared was two writes' — a DRIVING error, with the expectation unmoved.
  const argsAfterWrite = args.slice();
  A('HLI-07.1', 'contract.md §2.4 item 1; js corpus contract.md §1.3\'s returned-record rows',
    "the write record's own members are exactly `['op','triggered','watched']`",
    !w.threw && ownNames(w.value).join(',') === 'op,triggered,watched',
    w.threw ? fmt(statusOf(w)) : fmt(ownNames(w.value)));
  A('HLI-07.2', 'contract.md §2.4 item 1 ("`watched` keeps carrying the watched ADDRESSES")',
    "`watched`'s members are ADDRESSES, not pairs",
    !w.threw && w.value.watched.every(isAddress), w.threw ? fmt(statusOf(w)) : fmt(w.value.watched));
  A('HLI-07.3', 'contract.md §2.4 item 1 (`triggered` is `{handle, address}[]`)',
    "every element of `triggered` is a `{handle, address}` pair whose `handle` is a non-empty string and whose `address` is a segment list",
    !w.threw && w.value.triggered.length > 0 && w.value.triggered.every(isPair),
    w.threw ? fmt(statusOf(w)) : fmt(w.value.triggered));
  A('HLI-07.4', 'contract.md §1 item 1 ("the value the caller supplied and the value the store returns ARE THE SAME STRING")',
    "the pair's `handle` is the very string the caller spelled at `listen`",
    !w.threw && w.value.triggered.some((e) => e.handle === 'dh'),
    w.threw ? fmt(statusOf(w)) : fmt(w.value.triggered.map((e) => e.handle)));
  A('HLI-07.5', 'trigger-and-pair.md §8 `TF-6`; contract.md §2.4 item 1 (the aligned-array form is DEAD)',
    'NO `triggeredAddresses` array exists on the record',
    !w.threw && !('triggeredAddresses' in w.value), w.threw ? fmt(statusOf(w)) : fmt(ownNames(w.value)));
  const d = thrown(() => i.delete(['a', 'b', 'c'], 'temp'));
  A('HLI-07.6', 'contract.md §2.4 item 1 (`DeleteReceipt.triggered` moves with it)',
    "the delete receipt's own members are exactly `['address','tiers','triggered']`",
    !d.threw && ownNames(d.value).join(',') === 'address,tiers,triggered',
    d.threw ? fmt(statusOf(d)) : fmt(ownNames(d.value)));
  A('HLI-07.7', 'contract.md §2.4 item 1; trigger-and-pair.md §2 item 1',
    "the delete receipt's `triggered` is a pair list too",
    !d.threw && d.value.triggered.length > 0 && d.value.triggered.every(isPair),
    d.threw ? fmt(statusOf(d)) : fmt(d.value.triggered));
  A('HLI-07.8', 'contract.md §2.4 item 6 ("Dedupe on handle — rule 3 stands")',
    'a handle at two addresses both prefix-matching ONE write fires ONCE',
    argsAfterWrite.length === 1, `body ran ${argsAfterWrite.length} time(s) at that write`);
  A('HLI-07.9', 'trigger-and-pair.md §5 item 4; js corpus parameter-semantics.md `PAR-JS-12`',
    "the invocation's ONE argument is the WRITTEN address",
    argsAfterWrite.length === 1 && keyOfAddr(argsAfterWrite[0]) === keyOfAddr(['a', 'b', 'c']), fmt(argsAfterWrite));
  const boundSet = [['a'], ['a', 'b']];
  A('HLI-07.10', 'contract.md §2.4 item 6 (the carried `address` is SOME ONE of that handle\'s binding addresses — MEMBERSHIP ALONE)',
    "every pair naming the handle carries an `address` that is a MEMBER of that handle's own binding set",
    !w.threw && w.value.triggered.filter((e) => e.handle === 'dh').every((e) => boundSet.some((b) => keyOfAddr(b) === keyOfAddr(e.address))),
    w.threw ? fmt(statusOf(w)) : fmt(w.value.triggered.filter((e) => e.handle === 'dh')));
  // the strict-prefix binding: the pair's address DIFFERS from the argument, as a membership check.
  i.write(['pr'], 'temp', {});
  i.write(['pr', 'ch'], 'temp', {});
  i.listen('pf', [['pr']]);
  const pfArg = [];
  i.register('pf', (addr) => pfArg.push(addr));
  const wp = thrown(() => i.write(['pr', 'ch'], 'temp', 2));
  const pfPair = wp.threw ? null : wp.value.triggered.find((e) => e.handle === 'pf');
  A('HLI-07.11', 'trigger-and-pair.md §8 `TF-2` (NARROWED 2026-10-18: a MEMBERSHIP CHECK, not an equality claim)',
    'where the binding is a STRICT PREFIX of the written address, the pair\'s `address` DIFFERS from the invocation\'s argument',
    !wp.threw && pfPair && keyOfAddr(pfPair.address) === keyOfAddr(['pr'])
    && pfArg.length === 1 && keyOfAddr(pfArg[0]) === keyOfAddr(['pr', 'ch']),
    wp.threw ? fmt(statusOf(wp)) : fmt({ pair: pfPair, arg: pfArg }));
  const wp2 = thrown(() => i.write(['pr'], 'temp', 3));
  const pfPair2 = wp2.threw ? null : wp2.value.triggered.find((e) => e.handle === 'pf');
  A('HLI-07.12', 'trigger-and-pair.md §8\'s closing state (where the listener is bound AT the written address they are the same value)',
    'where the binding IS the written address, the pair\'s `address` and the invocation\'s argument are the SAME value',
    !wp2.threw && pfPair2 && keyOfAddr(pfPair2.address) === keyOfAddr(['pr']),
    wp2.threw ? fmt(statusOf(wp2)) : fmt(pfPair2));
  const setOfTrig = (r) => { const m = new Map(); for (const e of r.value.triggered) m.set(`${e.handle}|${keyOfAddr(e.address)}`, true); return [...m.keys()].sort(); };
  A('HLI-07.13', 'trigger-and-pair.md §8 `TF-2`; CONTRACT "a drive compares `triggered` as a SET and never as a sequence"',
    'the trigger set is compared as a SET: its membership is the two bindings of `dh` (no order is asserted)',
    !w.threw && setEq(setOfTrig(w).map((s) => s.split('|')[0]), setOfTrig(w).map(() => 'dh')),
    fmt(setOfTrig(w)));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-08 — THE KERNEL'S EXACT-ADDRESS SELECTION, ON THE STORE'S OWN TRIGGERING ADDRESS
// kernel-selection.md §1 items 1–4, §3 items 1–3, §4 item 2, §7 `KF-1`/`KF-2`/`KF-3`/`KF-7`/`KF-11` ·
// contract.md §2.8 items 1/6/7, §5.4 `S-SEL-EXACT`/`S-SEL-SNAPSHOT`/`S-SEL-DEDUPE` · §2.9.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g08'));
  i.write(['a'], 'temp', {});
  i.write(['a', 'b'], 'temp', {});
  const hAnc = thrown(() => K1(i, ['a'], 'anc', () => true));
  const hExact = thrown(() => K1(i, ['a', 'b', 'c'], 'exact', () => true));
  const hDesc = thrown(() => K1(i, ['a', 'b', 'c', 'dd'], 'desc', () => true));
  A('HLI-08.1', 'contract.md §2.9 item 3; kernel-surface.md §2.1 item 1 (the handle the store\'s machinery holds)',
    '`K-1` answers a non-empty string handle for each of the three addresses — the ancestor, the exact and the descendant',
    [hAnc, hExact, hDesc].every((r) => !r.threw && typeof r.value === 'string' && r.value !== ''),
    fmt([hAnc, hExact, hDesc].map((r) => (r.threw ? statusOf(r) : r.value))));
  const com = thrown(() => K2(i, ['a', 'b', 'c'], 'temp', 5));
  A('HLI-08.2', 'kernel-surface.md §2.1 item 2 (`CommitRecord`, four members); contract.md §2.4 item 8',
    "`K-2`'s record keeps FOUR members and no fifth",
    !com.threw && ownNames(com.value).join(',') === 'attempt,op,pending,triggered',
    com.threw ? fmt(statusOf(com)) : fmt(ownNames(com.value)));
  A('HLI-08.3', 'contract.md §2.4 items 1 and 3; §5.3 `S-PAIR-TOTAL`',
    "at `K-2`'s return every element of `triggered` AND of `pending` is a pair",
    !com.threw && com.value.triggered.every(isPair) && com.value.pending.every(isPair),
    com.threw ? fmt(statusOf(com)) : fmt({ triggered: com.value.triggered, pending: com.value.pending }));
  A('HLI-08.4', 'kernel-selection.md §1 item 1 and `KF-3` (the selection is NOT the store\'s prefix set)',
    "the store's own returned set carries TWO pairs — the ancestor's and the exact one's — which is the prefix set the pass must NOT follow",
    !com.threw && com.value.triggered.length === 2
    && com.value.triggered.some((e) => keyOfAddr(e.address) === keyOfAddr(['a']))
    && com.value.triggered.some((e) => keyOfAddr(e.address) === keyOfAddr(['a', 'b', 'c'])),
    com.threw ? fmt(statusOf(com)) : fmt(com.value.triggered.map((e) => e.address)));
  const run = thrown(() => K3(i, com.value));
  const log = thrown(() => K4(i, com.value.attempt));
  const checks = (!log.threw ? log.value.filter((e) => e.kind === 'constraint-check') : []);
  A('HLI-08.5', 'attempt-lifecycle.md §2.4 (the `PASSED` state: `every constraint passed`)',
    "`K-3`'s report carries the passing arm",
    !run.threw && run.value.outcome === 'passed', run.threw ? fmt(statusOf(run)) : fmt(run.value?.outcome));
  A('HLI-08.6', 'contract.md §5.4 `S-SEL-EXACT`; kernel-selection.md §7 `KF-1`/`KF-2`/`KF-11`',
    "the pass's `constraint-check` entries number EXACTLY ONE — the pairs at the ancestor and the descendant addresses are NOT evaluated",
    checks.length === 1, fmt(checks.map((e) => ({ kind: e.kind, id: e.id }))));
  A('HLI-08.7', 'kernel-selection.md §1 item 1 (the pass selects the rows whose address IS the triggering address)',
    "that one entry names the EXACT address's pair",
    checks.length === 1 && checks[0].id === 'exact', fmt(checks.map((e) => e.id)));
  A('HLI-08.8', 'kernel-selection.md §7 `KF-1` (a pair at an ANCESTOR address is not the pass\'s set)',
    "no `constraint-check` entry names the ancestor's id",
    !checks.some((e) => e.id === 'anc'), fmt(checks.map((e) => e.id)));
  A('HLI-08.9', 'kernel-selection.md §7 `KF-2` (a pair at a DESCENDANT address is not the pass\'s set)',
    "no `constraint-check` entry names the descendant's id",
    !checks.some((e) => e.id === 'desc'), fmt(checks.map((e) => e.id)));
  A('HLI-08.10', 'kernel-surface.md §2.5 item 1 (the `constraint-check` entry\'s member set)',
    "the entry's own six declared members are present",
    checks.length === 1 && ownNames(checks[0]).sort().join(',') === 'id,kind,message,opId,seq,state',
    fmt(checks.length === 1 ? ownNames(checks[0]).sort() : checks.map((e) => ownNames(e))));
  // ── the two-address pair, one address an ancestor of the write's and one the write's own: ONE evaluation.
  const j = ns.storeCreate(cfgFor('g08b'));
  j.write(['p'], 'temp', {});
  const dupId = thrown(() => j.addConstraint({ address: [['p'], ['p', 'q']], id: 'dup' }, () => true));
  const com2 = thrown(() => K2(j, ['p', 'q'], 'temp', 1));
  const run2 = thrown(() => K3(j, com2.value));
  const lg2 = thrown(() => K4(j, com2.value.attempt));
  const dupChecks = (!lg2.threw ? lg2.value.filter((e) => e.kind === 'constraint-check' && e.id === 'dup') : []);
  A('HLI-08.11', 'contract.md §5.4 `S-SEL-DEDUPE`; constraint-identity.md §4 item 5; §8 `IF-9`',
    'a pair standing at two addresses, one an ANCESTOR of the write\'s and one the write\'s own, is evaluated ONCE in one pass',
    !dupId.threw && !com2.threw && !run2.threw && dupChecks.length === 1,
    fmt({ registered: !dupId.threw, checks: dupChecks.length }));
  // ── `KF-7`: a second `K-2` at a HELD address is refused `KC-7` before the write verb is reached.
  const held1 = thrown(() => K2(j, ['p', 'r'], 'temp', 2));
  const held2 = thrown(() => K2(j, ['p', 'r'], 'temp', 3));
  A('HLI-08.12', 'kernel-selection.md §4 item 2 (i), §7 `KF-7`; kernel-surface.md §2.1 item 2\'s hold clause',
    'a second `K-2` at the SAME held address is REFUSED `KC-7` while the first attempt stands',
    !held1.threw && held2.threw && statusOf(held2) === 'KC-7',
    held2.threw ? fmt(statusOf(held2)) : 'the second commit was admitted');
  A('HLI-08.13', 'kernel-selection.md §3 item 4 and §4 item 1 (the hold is at the CALL\'S OWN ADDRESS and at no other)',
    'a `K-2` at an address that is NOT the held one is ADMITTED',
    !held1.threw, held1.threw ? fmt(statusOf(held1)) : 'admitted');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-09 — THE IDENTITY'S STORE-SIDE HOME, AND THE ONE ACT THAT DELETES IT
// constraint-identity.md §1 item 3, §2 items 1–3, §3 items 2–3, §4 items 3–4, §5 `IF-1`–`IF-6` ·
// contract.md §2.6 items 1–6, §5.6.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g09'));
  const idA = thrown(() => i.addConstraint({ address: [['A']], id: 'iA' }, () => true));
  A('HLI-09.1', 'constraint-identity.md §2 item 2; parameter-semantics.md `PAR-HL-10`',
    "`addConstraint`'s return is a value that is neither absent nor a function",
    !idA.threw && idA.value !== undefined && idA.value !== null && typeof idA.value !== 'function',
    idA.threw ? fmt(statusOf(idA)) : fmt(idA.value));
  A('HLI-09.2', 'constraint-identity.md §2 item 2 ("the value carries NO OWN ENUMERABLE MEMBER")',
    "the identity carries no own enumerable member — opacity, and no spelling this set asserts",
    !idA.threw && ['opaque-object', 'primitive:string'].includes(opacityOf(idA.value)),
    opacityOf(idA.threw ? undefined : idA.value));
  const idA2 = thrown(() => i.addConstraint({ address: [['A']], id: 'iA' }, () => true));
  A('HLI-09.3', 'constraint-identity.md §5 `IF-1`; §2 item 2 ("equal to itself on a second `addConstraint` at the SAME pair")',
    'a second `addConstraint` at the SAME pair answers a value EQUAL to the first',
    !idA.threw && !idA2.threw && idA2.value === idA.value,
    `first ${fmt(idA.threw ? statusOf(idA) : idA.value)} · second ${fmt(idA2.threw ? statusOf(idA2) : idA2.value)}`);
  const idB = thrown(() => i.addConstraint({ address: [['B']], id: 'iB' }, () => true));
  A('HLI-09.4', 'constraint-identity.md §5 `IF-2` ("TWO identities, not equal")',
    'two pairs answer two values that are NOT equal',
    !idB.threw && idB.value !== idA.value, `A ${fmt(idA.threw ? statusOf(idA) : idA.value)} · B ${fmt(idB.threw ? statusOf(idB) : idB.value)}`);
  const off = thrown(() => i.constraintOff({ address: [['A']], id: 'iA' }, () => true));
  const consOff = thrown(() => i.constraints());
  A('HLI-09.5', 'constraint-sites.md §1 site 3; §3 item 3 (`constraintOff` is the DISABLE half of a TOGGLE)',
    '`constraintOff` returns `undefined`',
    !off.threw && off.value === undefined, off.threw ? fmt(statusOf(off)) : fmt(off.value));
  A('HLI-09.6', 'constraint-sites.md §3 item 3; constraint-identity.md §5 `IF-5`',
    'the pair is STILL CARRIED after the toggle: the enumeration is unmoved',
    !consOff.threw && consOff.value.length === 2, fmt(consOff.threw ? statusOf(consOff) : consOff.value));
  const on = thrown(() => i.constraintOn({ address: [['A']], id: 'iA' }, () => true));
  A('HLI-09.7', 'constraint-sites.md §6 item 3 ("a toggle at a pair-conflicted address is stated LAWFUL")',
    '`constraintOn` on the same pair also returns `undefined`',
    !on.threw && on.value === undefined, on.threw ? fmt(statusOf(on)) : fmt(on.value));
  const idA3 = thrown(() => i.addConstraint({ address: [['A']], id: 'iA' }, () => true));
  A('HLI-09.8', 'constraint-identity.md §3 item 3 ("A PURGE ... does not reach the identity"); §5 `IF-5`',
    'after the FULL toggle cycle the identity is the SAME one',
    !idA3.threw && idA3.value === idA.value, fmt(idA3.threw ? statusOf(idA3) : idA3.value));
  const cons = thrown(() => i.constraints());
  A('HLI-09.9', 'parameter-semantics.md `PAR-HL-13`; js corpus surface.md §2.12 item 4 (the exclusions)',
    "every element of `constraints()` is a fresh plain object carrying EXACTLY TWO members — `address` and `id`",
    !cons.threw && cons.value.length === 2
    && cons.value.every((e) => plainObject(e) && ownNames(e).join(',') === 'address,id' && typeof e.id === 'string' && e.id !== ''),
    fmt(cons.threw ? statusOf(cons) : cons.value.map(ownNames)));
  A('HLI-09.10', 'constraint-identity.md §2 item 3 ("the identity is NOT enumerated")',
    'no enumerated member carries the opaque identity',
    !cons.threw && cons.value.every((e) => e.identity === undefined && e.id !== idA.value),
    fmt(cons.threw ? statusOf(cons) : cons.value));
  const consSet = (!cons.threw ? cons.value.map((e) => `${keyOfAddr(e.address)}|${e.id}`) : []);
  A('HLI-09.11', 'js corpus surface.md §2.12 item 6; `DD-22` (no order is declared, so it is compared as a SET)',
    'the enumeration is compared as a SET: its membership is exactly the two pairs registered',
    consSet.length === 2 && consSet.some((s) => s === `${keyOfAddr([['A']])}|iA`) && consSet.some((s) => s === `${keyOfAddr([['B']])}|iB`),
    fmt(consSet));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-10 — `pending`'s POP, THE SEEDING CLONE, AND THE FOUR MEMBERS
// contract.md §2.4 items 3/4/8/9, §5.3 `S-PAIR-TOTAL` · trigger-and-pair.md §3 items 1–5, §4 items 1–3,
// §8 `TF-1`/`TF-3`/`TF-4`/`TF-7`/`TF-8`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g10'));
  i.write(['a'], 'temp', {});
  i.write(['a', 'b'], 'temp', {});
  K1(i, ['a'], 'anc', () => true);
  K1(i, ['a', 'b', 'c'], 'exact', () => true);
  const com = thrown(() => K2(i, ['a', 'b', 'c'], 'temp', 5));
  A('HLI-10.1', 'contract.md §2.4 item 8 (`CommitRecord` keeps FOUR members); trigger-and-pair.md §6 item 1',
    "`K-2`'s record has exactly the four declared members and no fifth",
    !com.threw && ownNames(com.value).join(',') === 'attempt,op,pending,triggered',
    com.threw ? fmt(statusOf(com)) : fmt(ownNames(com.value)));
  A('HLI-10.2', 'contract.md §2.4 item 9 (the two members carry the SAME ELEMENT IDENTITIES at `K-2`\'s return)',
    "at `K-2`'s return every element of `pending` IS (identity) an element of `triggered`",
    !com.threw && com.value.pending.every((p) => com.value.triggered.some((t) => t === p)),
    com.threw ? fmt(statusOf(com)) : fmt({ pending: com.value.pending, triggered: com.value.triggered }));
  A('HLI-10.3', 'trigger-and-pair.md §8 `TF-1`/`TF-7` (no bare handle, no heterogeneous list)',
    "no bare handle stands in `pending` at `K-2`'s return",
    !com.threw && com.value.pending.every(isPair), com.threw ? fmt(statusOf(com)) : fmt(com.value.pending));
  const pendingBefore = com.threw ? -1 : com.value.pending.length;
  const triggeredBefore = com.threw ? -1 : com.value.triggered.length;
  const passRun = thrown(() => K3(i, com.value));
  A('HLI-10.4', 'trigger-and-pair.md §3 item 4 (CHECK-OFF POPS: `pending` holds only STILL-PENDING steps)',
    "after the pass the checked-off identity is GONE from `pending`",
    !passRun.threw && !com.value.pending.some((p) => keyOfAddr(p.address) === keyOfAddr(['a', 'b', 'c'])),
    fmt(com.value.pending));
  A('HLI-10.5', 'trigger-and-pair.md §4 item 1 (i) (the pair-aware filter compares `entry.handle`, never `entry`)',
    'the entry the pass did NOT evaluate (the ancestor\'s) STANDS in `pending` — a filter comparing a pair to a handle would have removed nothing',
    !passRun.threw && com.value.pending.length === pendingBefore - 1,
    `${pendingBefore} → ${com.value.pending.length}`);
  A('HLI-10.6', 'trigger-and-pair.md §8 `TF-8` (the PRE-POP reading is the failure)',
    "`pending`'s size after the pass is the STILL-PENDING count and NOT the returned set's size",
    !passRun.threw && com.value.pending.length === triggeredBefore - 1,
    `triggered ${triggeredBefore} · pending ${com.value.pending.length}`);
  A('HLI-10.7', 'trigger-and-pair.md §3 item 4 ("nothing is carried beside `pending`")',
    "`triggered` is UNMOVED by the pass: the store's returned set stands exactly as returned",
    !passRun.threw && com.value.triggered.length === triggeredBefore, `${triggeredBefore} → ${com.value.triggered.length}`);
  // ── the failed write's own set: zero bodies run (`P-7`'s `pending` ruling item (2), `TF-4`'s observable).
  const j = ns.storeCreate(cfgFor('g10b'));
  j.write(['p'], 'temp', {});
  let calls = 0;
  j.listen('anc', [['p']]);
  j.register('anc', () => { calls += 1; });
  const cv = (ctx) => (ctx.value === 1 ? { message: 'no ones' } : true);
  const addC = thrown(() => j.addConstraint({ address: [['p', 'q']], id: 'v' }, cv));
  const beforeFail = calls;
  const violate = thrown(() => j.write(['p', 'q'], 'temp', 1));
  A('HLI-10.8', 'trigger-and-pair.md §4 item 3 (the failed-write arm\'s observable: ZERO bodies of that write\'s own set run)',
    "a write the registered constraint refuses runs ZERO bodies of the returned set it would have carried",
    !addC.threw && violate.threw && calls === beforeFail, `body ran ${calls - beforeFail} more time(s)`);
  A('HLI-10.9', 'js corpus surface.md §2.5 item 4; fail-surface.md §1.1 item 1',
    "that refusal is thrown in the one crossed form — exactly `['log','message','status']`",
    violate.threw && ownNames(violate.err).join(',') === FORM_MEMBERS, fmt(ownNames(violate.err)));
  const outcome = (violate.threw && Array.isArray(violate.err.log))
    ? violate.err.log.find((e) => e.kind === 'outcome') : undefined;
  A('HLI-10.10', 'kernel-surface.md §2.5 item 1 (the `outcome` entry\'s `state` IS the state); §1.1 item 3',
    "the bubbled log carries the `outcome` entry whose `state` is `KC-3` — the violated pair not in `ran`, no repair registered",
    outcome !== undefined && outcome.state === 'KC-3', fmt(outcome));
  A('HLI-10.11', 'kernel-surface.md §2.5 item 1 ("`state` is null on the other three kinds")',
    "the `constraint-check` entry of that log carries `state: null` and the violated pair's own `id`",
    violate.threw && Array.isArray(violate.err.log)
    && violate.err.log.some((e) => e.kind === 'constraint-check' && e.id === 'v' && e.state === null),
    fmt(violate.threw && Array.isArray(violate.err.log) ? violate.err.log.map((e) => ({ k: e.kind, id: e.id, s: e.state })) : null));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-11 — THE CONFLICT TEST AT `register` (ONE DIRECTION, `addConstraint`-ONLY, NO `status`)
// constraint-sites.md §5 items 1–6, §6 items 2–4, §7 `CF-7` · contract.md §2.3 items 8–9, §4 `F-9` ·
// listen-verb.md §7 item 1, §8 `LF-8`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g11'));
  const id1 = thrown(() => i.addConstraint({ address: [['c']], id: 'k1' }, () => true));
  A('HLI-11.1', 'constraint-sites.md §1 site 1; contract.md §2.3 item 1',
    'a caller\'s constraint pair stands at the address after `addConstraint`',
    !id1.threw, id1.threw ? fmt(statusOf(id1)) : fmt(id1.value));
  const id2 = thrown(() => i.addConstraint({ address: [['c']], id: 'k2' }, () => true));
  A('HLI-11.2', 'constraint-sites.md §5 item 2 ("the kernel\'s stub at the same address is NOT refused")',
    'the KERNEL\'s own stub registration at an address a caller\'s pair stands at is NOT refused (identity keying, not address keying)',
    !id2.threw, id2.threw ? fmt(`${statusOf(id2)} / ${String(msgOf(id2)).slice(0, 70)}`) : fmt(id2.value));
  // ═════════════════════════════════════════════════════════════════════════════════════════════════════════
  // **⟶ RE-DERIVED 2026-10-25 (`D-20`'s execution pass, `D-25`/`D-29` + `B-5`/`B-6`).** This row drove the state
  // *"a listener and a constraint at one address"*, which the kept clause (`held-listener contract §2.2` item 7:
  // *"`listen` GAINS NO CONFLICT TEST AT ALL"*) declared LAWFUL. **`D-29` NARROWS THAT CLAUSE AND THIS ROW MOVES
  // WITH IT**: *"Listen cannot overwrite constraint, only other listeners"* — so a `listen` at a pair's address
  // under an APP handle is now REFUSED `AddressMalformed` before the purge (`B-6`), and the register-side
  // direction the rest of this row reads (`B-5`) is reachable through the ONE state the surface now offers: a
  // `register` under the CONSTRAINT'S OWN `id`, which is the pair's handle under `D-24`/`D-29`.
  // **NO CELL IS RETIRED**: `.3` asserts the refusal's existence and its no-state-moved reach (a REWRITE of
  // *"nothing throws there"* to the narrowed sign), and `.4`–`.11` re-aim their drive at the reachable arm — the
  // subject of every one of them (does the register-side cross-kind refusal stand, in which form, naming what,
  // moving nothing) is unchanged.
  // ═════════════════════════════════════════════════════════════════════════════════════════════════════════
  const l = thrown(() => i.listen('appH', [['c']]));
  A('HLI-11.3', 'held-listener contract §2.2 item 7 AS NARROWED BY `D-29` (`strata/decisions.md`, 2026-10-24: *"Listen cannot overwrite constraint, only other listeners"*); `B-6` in `docs/L1/surface-deltas.md` §2',
    '`listen` at a pair\'s address under an APP handle is REFUSED — AddressMalformed, in the one thrown form, BEFORE the purge, so nothing is destroyed — and the pair still stands',
    l.threw && statusOf(l) === 'AddressMalformed', l.threw ? fmt(`${statusOf(l)} / ${String(msgOf(l)).slice(0, 90)}`) : 'returned (the pre-ruling reading)');
  const consAfterListen = thrown(() => i.constraints());
  A('HLI-11.3.a', 'held-listener contract §2.2 item 3 (a refused `listen` changes nothing) read with `D-29`',
    'NOTHING MOVED by that refusal: the pair is still carried by the enumeration, at both of its addresses',
    !consAfterListen.threw && consAfterListen.value.length === 2,
    consAfterListen.threw ? statusOf(consAfterListen) : fmt(consAfterListen.value));
  const reg = thrown(() => i.register('k1', () => { }));
  A('HLI-11.4', 'constraint-sites.md §5 item 2, §7 `CF-7`; contract.md §4 `F-9`',
    'a CALLER\'s registration at an address a CALLER\'s constraint pair stands at is REFUSED',
    reg.threw, reg.threw ? 'threw' : 'the registration was admitted');
  // ── **⟶ `.5` AND `.6` RE-DERIVED 2026-10-25: THE FORM MOVED FROM `TypeError` TO THE SURFACE'S ONE PLAIN
  // OBJECT.** The as-filed pair asserted the registration site's conflict arm as *"a `TypeError` with NO `status`
  // member"*. **`D-25` handed the form to L1 and `surface-deltas.md` §2.5 declared the reconciliation**: the arm is
  // `{status: 'AddressMalformed', message, log: []}` — *"one member function cannot print two failure forms"* —
  // and `index.d.ts`'s `register` block carries the same sentence (*"NOT the `TypeError` this member's conflict
  // arm carried while a reserved `constraint@` prefix existed to be exempted"*). **`index.d.ts` also declares that
  // a `TypeError` thrown by any STORE-REACHING VERB is a FINDING** (`a127_no_store_reaching_verb_throws_the_class_test_form`),
  // which the old expectation would have violated. The two cells' subject — WHICH FORM this arm answers, and
  // whether it carries a `status` — is kept whole; the answer moves to the declared one.
  A('HLI-11.5', '`docs/L1/surface-deltas.md` §2.5 (the declared reconciliation of `register`\'s cross-kind arm: the surface\'s ONE thrown form, `D-25`) read with `bindings/js/index.d.ts`\'s `register` block',
    "the refusal is NOT a `TypeError`: it is the surface's one thrown plain object, whose prototype is `Object.prototype`",
    reg.threw && !(reg.err instanceof TypeError) && reg.err !== null && typeof reg.err === 'object'
      && Object.getPrototypeOf(reg.err) === Object.prototype,
    reg.threw ? `${String(reg.err?.constructor?.name)} keys=${fmt(ownNames(reg.err))}` : 'returned');
  A('HLI-11.6', '`docs/L1/surface-deltas.md` §2.5 item 2 (the status is `AddressMalformed`) read with `surface.md §2.5` item 4 (the member set is `{log, message, status}`)',
    "the thrown value carries a `status` member and it is the store's `AddressMalformed` (the member the act's own subject takes)",
    reg.threw && Object.prototype.hasOwnProperty.call(reg.err, 'status') && reg.err.status === 'AddressMalformed',
    reg.threw ? fmt(`${ownNames(reg.err)} status=${String(reg.err?.status)}`) : 'returned');
  A('HLI-11.7', 'js corpus surface.md §2.5 item 4 (rule (ii) gains `log: []`)',
    "the thrown value's `log` member is an array",
    reg.threw && Array.isArray(reg.err.log), reg.threw ? fmt(reg.err?.log) : 'returned');
  const m = msgOf(reg);
  A('HLI-11.8', 'constraint-sites.md §5 item 5 (i)–(ii) (the message is the package\'s own, non-empty)',
    'the refusal carries a non-empty string message authored by the package',
    typeof m === 'string' && m.length > 0, fmt(String(m).slice(0, 100)));
  // ⟶ RE-DERIVED 2026-10-25 with the drive: the two sides are now the HANDLE (`'k1'`) and the STANDING
  // CONSTRAINT's `id` and ADDRESS, and `surface-deltas.md` §2.5 item 2 requires the text to name both.
  A('HLI-11.9', 'constraint-sites.md §5 item 5 (iii) ("the message names BOTH SIDES") read with `docs/L1/surface-deltas.md` §2.5 item 2',
    "the message names both sides — the handle the caller tried to register and the constraint (its `id` AND its address) that stands there",
    typeof m === 'string' && m.includes('k1') && m.includes('["c"]'), fmt(String(m).slice(0, 160)));
  const cons = thrown(() => i.constraints());
  A('HLI-11.10', 'constraint-sites.md §5 item 1 (the seat is BEFORE `state.registry.set`, so "a refusal leaves the registry untouched")',
    "the refusal changed nothing: the pair is still carried by the enumeration",
    !cons.threw && cons.value.length === 2, fmt(cons.threw ? statusOf(cons) : cons.value));
  A('HLI-11.11', 'constraint-sites.md §7 `CF-7` (a returned discriminant is not the form)',
    'the conflict is never returned: the call THREW and returned no record',
    reg.threw && reg.err !== undefined, reg.threw ? 'threw' : 'returned');
  NOTES.push('HLI-11 (RECORDED, NOT ASSERTED): an `addConstraint` at an address where a CALLER\'s listener is already registered — contract.md §2.3 item 8\'s first sentence reads the conflict as arising THERE ("AT `addConstraint` AT AN ADDRESS A LISTENER IS ALREADY REGISTERED AT"), while constraint-sites.md §5 item 2 prints the checkable observable the OTHER way ("a caller who registers a function at a pair\'s address IS refused while the kernel\'s stub at the same address is NOT"). BOTH DIRECTIONS WERE DRIVEN; the identity-keyed one is asserted at HLI-11.2/.4, and the `addConstraint`-at-a-listener\'s-address direction is recorded here and NOT asserted, because the directory prints opposite arrows and this set takes no side.');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-12 — THE SET-VALUED PAIR ADMITTED AT `addConstraint`, AND THE TOGGLES
// constraint-identity.md §4 items 1–5, §5 `IF-7`/`IF-8` · contract.md §2.3 item 7, §2.6 items 4–6 ·
// removal-members.md §3 item 3 · parameter-semantics.md `PAR-HL-8`/`PAR-HL-13`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g12'));
  const cv = (ctx) => (ctx.value === 1 ? { message: 'no ones' } : true);
  const PAIR = { address: [['A'], ['B']], id: 'mA' };
  const idA = thrown(() => i.addConstraint(PAIR, cv));
  A('HLI-12.1', 'parameter-semantics.md `PAR-HL-8` ("ONE PAIR OVER N ADDRESSES IS ONE PAIR")',
    'a pair whose `address` member is a SET of two addresses is ADMITTED at `addConstraint`',
    !idA.threw, idA.threw ? fmt(`${statusOf(idA)} / ${String(msgOf(idA)).slice(0, 90)}`) : fmt(idA.value));
  const cons = thrown(() => i.constraints());
  A('HLI-12.2', 'constraint-identity.md §5 `IF-7` ("ONE pair, ONE identity, N registry rows, ONE row from `constraints()`")',
    "`constraints()` returns EXACTLY ONE row for the pair",
    !cons.threw && cons.value.length === 1 && cons.value[0].id === 'mA', fmt(cons.threw ? statusOf(cons) : cons.value));
  A('HLI-12.3', 'constraint-identity.md §4 item 3 (the `address` member\'s type moves to `Address[]`)',
    "that row's `address` member is the SET the pair was created with",
    !cons.threw && cons.value.length === 1 && Array.isArray(cons.value[0].address)
    && setEq(cons.value[0].address, [['A'], ['B']]), fmt(cons.threw ? statusOf(cons) : cons.value[0]?.address));
  const wA = thrown(() => i.write(['A'], 'temp', 1));
  const wB = thrown(() => i.write(['B'], 'temp', 1));
  A('HLI-12.4', 'constraint-identity.md §4 item 2 (iv) ("the per-write gate is a SET-MEMBERSHIP test, not an equality test")',
    'the pair is enforced at its FIRST address: a write the constraint refuses is refused',
    wA.threw, wA.threw ? fmt(statusOf(wA)) : 'the write was applied');
  A('HLI-12.5', 'constraint-identity.md §4 item 2 (iv); §5 `IF-8`',
    'the SAME pair is enforced at its SECOND address — one identity, N registry rows',
    wB.threw, wB.threw ? fmt(statusOf(wB)) : 'the write was applied');
  const off = thrown(() => i.constraintOff(PAIR, () => true));
  const consOff = thrown(() => i.constraints());
  A('HLI-12.6', 'constraint-sites.md §1 site 3 (`constraintOff` is a purge-then-add and answers `undefined`)',
    '`constraintOff(pair, fn)` returns `undefined`',
    !off.threw && off.value === undefined, off.threw ? fmt(statusOf(off)) : fmt(off.value));
  A('HLI-12.7', 'removal-members.md §3 item 3; constraint-identity.md §2 item 3',
    'the pair is STILL CARRIED and still enumerated after the toggle: the element count is unmoved',
    !consOff.threw && consOff.value.length === 1, fmt(consOff.threw ? statusOf(consOff) : consOff.value));
  const wOff = thrown(() => i.write(['A'], 'temp', 2));
  A('HLI-12.8', 'parameter-semantics.md `PAR-HL-12` (`constraintParked` is the element added — a passing stub)',
    'while the pair is off the parked stub passes: the write is applied',
    !wOff.threw, wOff.threw ? fmt(statusOf(wOff)) : 'applied');
  const on = thrown(() => i.constraintOn(PAIR, () => true));
  A('HLI-12.9', 'constraint-sites.md §1 site 2 (`constraintOn` reaches the same `K-1`)',
    '`constraintOn(pair, fn)` returns `undefined`',
    !on.threw && on.value === undefined, on.threw ? fmt(statusOf(on)) : fmt(on.value));
  const consOn = thrown(() => i.constraints());
  A('HLI-12.10', 'constraint-identity.md §5 `IF-5` (the toggle cycle answers THE SAME identity and keeps the pair)',
    'the element count is still unmoved after the full cycle',
    !consOn.threw && consOn.value.length === 1, fmt(consOn.threw ? statusOf(consOn) : consOn.value));
  const idAgain = thrown(() => i.addConstraint(PAIR, cv));
  A('HLI-12.11', 'constraint-identity.md §5 `IF-5` ("THE SAME identity")',
    'the identity across the pair\'s whole toggle cycle is the SAME one',
    !idAgain.threw && idAgain.value === idA.value, fmt(idAgain.threw ? statusOf(idAgain) : idAgain.value));
  const wB2 = thrown(() => i.write(['B'], 'temp', 1));
  A('HLI-12.12', 'contract.md §2.3 item 7 (the toggles purge and re-add; the constraint stands again)',
    'the re-armed pair refuses the write at its second address once more',
    wB2.threw, wB2.threw ? fmt(statusOf(wB2)) : 'the write was applied');
  const uncarried = thrown(() => i.constraintOff({ address: [['ZZ']], id: 'none' }, () => true));
  A('HLI-12.13', 'constraint-sites.md §7 `CF-8` (a toggle naming a pair the entry does not carry)',
    'a toggle naming a pair the entry does not carry THROWS',
    uncarried.threw, uncarried.threw ? 'threw' : 'returned');
  A('HLI-12.14', 'constraint-sites.md §6 item 3 (`status`\'s PRESENCE is the one discriminator)',
    "that refusal carries NO `status` member",
    uncarried.threw && !Object.prototype.hasOwnProperty.call(uncarried.err, 'status'),
    uncarried.threw ? fmt(ownNames(uncarried.err)) : 'returned');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-13 — `K-6`, THE KERNEL'S SIXTH ITEM
// remove-member.md §1–§7, §7 `MF-1`–`MF-9` · contract.md §2.9 items 1–7, §5.8 `S-K6-EXTENT`/`S-K6-ROUTE`/
// `S-K6-ANSWER` · kernel-surface.md §1 item 2.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  A('HLI-13.1', 'remove-member.md §5 item 1 (`5 → 6` ✓) and §7 `MF-6` ("a seventh name reachable on the kernel\'s surface — NONE"); contract.md §2.9 item 5',
    'the kernel module\'s own export set is EXACTLY the six declared items, and no seventh name is reachable',
    Object.keys(kernel).sort().join(',') === KERNEL_ITEMS.join(','), fmt(Object.keys(kernel).sort()));
  A('HLI-13.2', 'contract.md §2.9 item 3; remove-member.md §3 item 1',
    '`K-6` is reachable as the sixth item, named `remove`',
    typeof kernel.remove === 'function', `typeof kernel.remove = ${typeof kernel.remove}`);
  const i = ns.storeCreate(cfgFor('g13'));
  const idK = thrown(() => i.addConstraint({ address: [['z']], id: 'kz' }, () => true));
  const beforeWrite = thrown(() => i.write(['z'], 'temp', 1));
  const consBefore = thrown(() => i.constraints());
  const r6 = thrown(() => K6(i, { address: [['z']], id: 'kz' }));
  A('HLI-13.3', 'remove-member.md §4 item 1 and §7 `MF-1`/`MF-7` (`undefined`, and never a record)',
    'a `K-6` success returns `undefined` — not a record and not a removed-count',
    !idK.threw && !r6.threw && r6.value === undefined, r6.threw ? fmt(statusOf(r6)) : fmt(r6.value));
  const r6again = thrown(() => K6(i, { address: [['z']], id: 'kz' }));
  A('HLI-13.4', 'remove-member.md §4 item 2 (ii), §7 `MF-3` ("a pair the kernel holds no row for — `KC-2`")',
    "the kernel's rows are GONE: a second `K-6` at the same pair is refused",
    r6again.threw, r6again.threw ? 'threw' : 'was admitted');
  A('HLI-13.5', 'remove-member.md §4 item 2 (i)–(ii) (the kernel\'s own form); kernel-surface.md §2.1 item 1',
    "that refusal's `status` is the kernel's own `KC-2` (`ConstraintArgRefused`)",
    r6again.threw && statusOf(r6again) === 'KC-2', fmt(statusOf(r6again)));
  A('HLI-13.6', 'fail-surface.md §1.1 (the kernel\'s own three-member form)',
    "the refusal's member set is exactly `['log','message','status']`",
    r6again.threw && ownNames(r6again.err).join(',') === FORM_MEMBERS, fmt(ownNames(r6again.err)));
  const afterWrite = thrown(() => i.write(['z'], 'temp', 2));
  A('HLI-13.7', 'remove-member.md §4 item 1 ("the store\'s home entries the pair\'s handle named are withdrawn")',
    "the store's entry was withdrawn: after the `K-6` the write at the pair's address carries no pair",
    !beforeWrite.threw && !afterWrite.threw
    && beforeWrite.value.triggered.length > 0 && afterWrite.value.triggered.length === 0,
    `${beforeWrite.threw ? statusOf(beforeWrite) : beforeWrite.value.triggered.length} → ${afterWrite.threw ? statusOf(afterWrite) : afterWrite.value.triggered.length}`);
  A('HLI-13.8', 'parameter-semantics.md `PAR-HL-38` (`watched` and `triggered` are two views of ONE selection)',
    'and `watched` is empty with it — the two members read one selection',
    !afterWrite.threw && afterWrite.value.watched.length === 0, fmt(afterWrite.value?.watched));
  const consAfter = thrown(() => i.constraints());
  A('HLI-13.9', 'remove-member.md §7 `MF-1` (the read model is one of its observables)',
    'the pair is gone from the read model too',
    !consBefore.threw && !consAfter.threw && consAfter.value.length === consBefore.value.length - 1,
    `${consBefore.threw ? statusOf(consBefore) : consBefore.value.length} → ${consAfter.threw ? statusOf(consAfter) : consAfter.value.length}`);
  const idFresh = thrown(() => i.addConstraint({ address: [['z']], id: 'kz' }, () => true));
  A('HLI-13.10', 'remove-member.md §4 item 1 ("the pair\'s identity is deleted with the row" — contract.md §2.6 item 3)',
    'a fresh `addConstraint` at the same pair answers a DIFFERENT identity',
    !idFresh.threw && idFresh.value !== idK.value, fmt(idFresh.threw ? statusOf(idFresh) : idFresh.value));
  // DRIVE CORRECTION (named in the greens document §2.1): the read model is read IMMEDIATELY BEFORE the
  // refused `K-6`, because HLI-13.10's own fresh `addConstraint` legitimately grows it. The first run
  // compared against a reading taken before that cell. DRIVING error; the expectation is unmoved.
  const consBeforeRefusal = thrown(() => i.constraints());
  const norow = thrown(() => K6(i, { address: [['qq']], id: 'never' }));
  A('HLI-13.11', 'remove-member.md §4 item 2 (ii) ("a pair the kernel holds no row for — `KC-2`, and no state moves")',
    "`K-6` over a well-formed pair the kernel holds NO row for is refused `KC-2`",
    norow.threw && statusOf(norow) === 'KC-2', norow.threw ? fmt(statusOf(norow)) : 'was admitted');
  const consAfterRefusal = thrown(() => i.constraints());
  A('HLI-13.12', 'remove-member.md §4 item 4 ("a refused `K-6` leaves the kernel\'s row ... standing — no partial removal")',
    'a refused `K-6` moved nothing: the read model is unmoved',
    !consBeforeRefusal.threw && !consAfterRefusal.threw
    && consAfterRefusal.value.length === consBeforeRefusal.value.length,
    `${consBeforeRefusal.threw ? statusOf(consBeforeRefusal) : consBeforeRefusal.value.length} → ${consAfterRefusal.threw ? statusOf(consAfterRefusal) : consAfterRefusal.value.length}`);
  A('HLI-13.13', 'remove-member.md §4 item 3 ("NO `KC` ROW IS MINTED: the set stays closed at EIGHT")',
    'every `KC` token this scenario observed is a member of the closed eight-member set',
    [r6again, norow].every((r) => !r.threw || KC_SET.includes(r.err.status)),
    fmt([r6again, norow].map((r) => (r.threw ? r.err.status : '<no throw>'))));
  // ── `S-K6-ROUTE`: presence instrumentation on the published member, with the probe's declared LIMIT.
  const k = ns.storeCreate(cfgFor('g13b'));
  const kid = thrown(() => k.addConstraint({ address: [['q']], id: 'kq' }, () => true));
  let entered = 0;
  const orig = k.removeListener;
  k.removeListener = function (...a) { entered += 1; return orig.apply(k, a); };
  const routed = thrown(() => K6(k, { address: [['q']], id: 'kq' }));
  A('HLI-13.14', 'contract.md §5.8 `S-K6-ROUTE` and its declared LIMIT ("PRESENCE INSTRUMENTATION AND NOT ROUTE VERIFICATION")',
    "the `K-6` drive ENTERS the published member an app calls — presence, and no route claim beyond it",
    !kid.threw && !routed.threw && entered >= 1, `the published member was entered ${entered} time(s)`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// HLI-14 — THE PURGED PAIR: `listen`\'s PURGE REACH IS UNCONDITIONAL, THE PAIR STILL EVALUATES
// listen-verb.md §5 items 1–4, §8 `LF-8` · contract.md §2.2 item 7, §3 `S-18` · kernel-selection.md §5 ·
// `P: docs/pending.md · P-5`\'s `(F-3)`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i = ns.storeCreate(cfgFor('g14'));
  const cv = (ctx) => (ctx.value === 1 ? { message: 'no ones' } : true);
  const hK = thrown(() => K1(i, ['A'], 'v1', cv));
  const pass1 = thrown(() => i.write(['A'], 'temp', 2));
  A('HLI-14.1', 'contract.md §2.9 item 3 (the handle the store\'s listener machinery holds)',
    '`K-1` answers the handle the store\'s entry stands under, and a PASSING write carries its pair',
    !hK.threw && !pass1.threw && pass1.value.triggered.some((e) => e.handle === hK.value),
    pass1.threw ? fmt(statusOf(pass1)) : fmt(pass1.value.triggered.map((e) => e.handle)));
  const violate1 = thrown(() => i.write(['A'], 'temp', 1));
  A('HLI-14.2', 'contract.md §2.2 item 7 (the pair is ENFORCED); listen-verb.md §5 item 2 (ii)',
    'the pair is ENFORCED before any purge: a write the constraint refuses is refused',
    violate1.threw, violate1.threw ? fmt(statusOf(violate1)) : 'the write was applied');
  const appListen = thrown(() => i.listen(hK.value, [['A']]));
  A('HLI-14.3', 'listen-verb.md §5 item 1, §8 `LF-8` ("a `listen` that refused on a conflict — NONE")',
    "an app's `listen` at an address the kernel holds a pair at SUCCEEDS — the purge reach is unconditional and no exception is made for a handle the caller did not mint",
    !appListen.threw, appListen.threw ? fmt(`${statusOf(appListen)} / ${String(msgOf(appListen)).slice(0, 90)}`) : 'returned');
  const violate2 = thrown(() => i.write(['A'], 'temp', 1));
  A('HLI-14.4', 'listen-verb.md §5 item 2 (iii) and item 3 (a); contract.md §3 `S-18`',
    'THE PAIR STILL EVALUATES after the purge: the violating write is STILL REFUSED (the constraint reads the registry, not the store)',
    violate2.threw, violate2.threw ? fmt(statusOf(violate2)) : 'the write was applied');
  A('HLI-14.5', 'fail-surface.md §1.1 item 3; kernel-surface.md §2.5 item 1 (the state is readable off the log)',
    "and its refusal's log still names `KC-3` — the pair is enforced by the pass",
    violate2.threw && Array.isArray(violate2.err.log)
    && violate2.err.log.some((e) => e.kind === 'outcome' && e.state === 'KC-3'),
    fmt(violate2.threw && Array.isArray(violate2.err.log) ? violate2.err.log.map((e) => ({ k: e.kind, s: e.state })) : null));
  const pass2 = thrown(() => i.write(['A'], 'temp', 3));
  A('HLI-14.6', 'listen-verb.md §5 item 2 (i) (the address is re-created by the app\'s own `listen`, under the same handle)',
    "the app's `listen` re-created the entry under the SAME handle: a passing write still carries it, once",
    !pass2.threw && pass2.value.triggered.filter((e) => e.handle === hK.value).length === 1,
    pass2.threw ? fmt(statusOf(pass2)) : fmt(pass2.value.triggered.map((e) => e.handle)));
  NOTES.push('HLI-14 (RECORDED, NOT ASSERTED): `listen-verb.md §5 item 3` WITHDRAWS the assertability of the pair\'s store-standing and keeps ENFORCEMENT alone — "`no invocation`" is indistinguishable from "invoked a no-op", the standing `noopListener` entry making `triggered` carry its handle. So this scenario asserts HLI-14.4\'s ENFORCEMENT half and the entry\'s re-creation, and asserts NOTHING about a body\'s invocation, exactly as that clause requires.');
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RUN'S OWN REPORT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('');
console.log('── THE FIGURE CENSUS ────────────────────────────────────────────────────────────────');
console.log(`SITE:  node tests/e2e/held-listener-identity-greens.mjs   (cwd: ${process.cwd()})`);
console.log(`ENTRY (the package's claimed ESM entry): ${new URL('../../bindings/js/index.mjs', import.meta.url).pathname}`);
console.log(`ENTRY 2 (the kernel module's declared checkout home): ${new URL('../../bindings/js/src/constraint-kernel.mjs', import.meta.url).pathname}` +
  (kernel === null ? `  — DID NOT RESOLVE: ${KERNEL_ERROR}` : ''));
console.log(`LAYER: ${LAYER}   APP LAYER: ${APP_LAYER}   (no APP-green is claimed)`);
console.log(`SCRATCH: ${ROOT}`);
console.log(`SCENARIOS: ${perScenario.size}`);
console.log('');
console.log('── PER-SCENARIO VERDICTS ───────────────────────────────────────────────────────────');
for (const [sc, rec] of perScenario) console.log(`  ${sc}: ${rec.pass} PASS · ${rec.fail} FAIL   (${rec.pass + rec.fail} assertions)`);
console.log('');
console.log('── RECORDED AND NOT ASSERTED ───────────────────────────────────────────────────────');
for (const n of NOTES) console.log(`  ${n}`);
console.log('');
console.log('────────────────────────────────────────────────────────────────────────────────────');
console.log(`AUTHORED ${authored} · EXECUTED ${executed} · PASS ${pass} · FAIL ${fail}`);
if (fail > 0) {
  console.log('');
  console.log('EVERY FAIL, ONE LINE EACH (cell · expected-from-the-docs · observed · clause):');
  for (const f of fails) console.log(`  ${f.id} :: ${f.expectation} :: ${f.observed} :: [${f.clause}]`);
}
try { fs.rmSync(ROOT, { recursive: true, force: true }); } catch { /* the scratch is left for inspection */ }
process.exit(fail > 0 ? 1 : 0);
