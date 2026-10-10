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

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const LAYER = 'ENVELOPE/PURE';
const APP_LAYER = 'NONE';

// ── the declared surface, from the docs alone ──────────────────────────────────────────────────────────
const VERBS = ['delete', 'listen', 'read', 'readLiteral', 'rollback', 'storeCreate', 'unlisten', 'write'];
const CLOSED_SET = [
  'AddressMalformed', 'AddressNotFound', 'LeafHasNoDownstream', 'TierNotFound', 'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation', 'ContainerKindConflict', 'ReadTargetIsBranch', 'WriteParentNotLink',
  'JournalOpUnknown', 'RollbackCompacted', 'ConstructionArgumentMissing', 'FilePathUnreachable',
  'ValueNotAdmitted', 'FileCommitFailed',
];
const INTERNAL_FIVE = ['version', 'errorMessage', 'storeCreate', 'call', 'register'];
const PLACEHOLDER_TOKENS = ['<SEGMENT>', '<CONTAINER>', '<mismatch clause>', '<available clause>',
  '<CONTAINERSEGMENT>', '<KEYLIST>', '<TIERLIST>', '<DOMAINLIST>', '<arguments>', '<argument-name>', '<TRAITS>'];

// ── the run's own bookkeeping ───────────────────────────────────────────────────────────────────────────
let authored = 0, executed = 0, pass = 0, fail = 0;
const fails = [];
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
function statusOf(r) { return r.threw ? (r.err && typeof r.err === 'object' ? r.err.status : undefined) : '<no throw>'; }
function msgOf(r) { return r.threw && r.err && typeof r.err === 'object' ? r.err.message : undefined; }

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

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-01 — THE SURFACE                                                      17 assertions
// ⟶ RE-DERIVED 2026-10-11 (THE `Q1` CONTRACT AMENDMENT, `A79`): the instance's own member set is now the
// THREE members `{ register, on, off }`, fixed by `docs/specs/storeroom-js/surface.md` §2.1's dated clause
// 1 (a) and carried at that document's §2.4 item 7; the OLD value — the set `{ register }` — was §2.4
// item 5 (a)'s PRE-AMENDMENT declaration, superseded AS A MEMBER-SET FIGURE by §2.1's dated clause 1 (a)
// (contract.md §5.5's dated clause, clause 5, names this header and `JSG-01.9` as the two cells that move).
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
  A('JSG-01.2', C1, "the namespace's own named exports are exactly the 8 verbs", names.join(',') === VERBS.join(','), names.join(','));
  A('JSG-01.3', C1, "each of the 8 is a function", VERBS.every((v) => typeof ns[v] === 'function'), VERBS.map((v) => `${v}:${typeof ns[v]}`).join(','));
  A('JSG-01.4', '§2.9 item 1', 'findAddress is NOT an own export', !Object.prototype.hasOwnProperty.call(ns, 'findAddress'), `own=${Object.prototype.hasOwnProperty.call(ns, 'findAddress')}`);
  A('JSG-01.5', '§2.9 item 3', 'exists is NOT an own export (no exists() verb, no shim)', !Object.prototype.hasOwnProperty.call(ns, 'exists'), `own=${Object.prototype.hasOwnProperty.call(ns, 'exists')}`);
  A('JSG-01.6', '§3.5; A74', 'neither dispose nor close is an own export', !('dispose' in ns) && !('close' in ns), `dispose=${'dispose' in ns} close=${'close' in ns}`);
  A('JSG-01.7', '§2.4 item 5 (a)', 'register is NOT an own export of the module namespace', !Object.prototype.hasOwnProperty.call(ns, 'register'), `own=${Object.prototype.hasOwnProperty.call(ns, 'register')}`);
  A('JSG-01.8', '§2.1', 'storeCreate(cfg) returns a non-null object that is neither a function nor an array', i1 !== null && typeof i1 === 'object' && typeof i1 !== 'function' && !Array.isArray(i1), fmt(i1));
  // §2.1's dated clause 1 (a) FIXES THE NEW VALUE: the instance's member set is `{ register, on, off }`.
  // The OLD value this cell asserted — the exact set `['register']`, "one own member and NOTHING ELSE" —
  // was §2.4 item 5 (a)'s PRE-AMENDMENT declaration, superseded as a member-set figure by that clause;
  // `contract.md §5.5`'s dated clause (clause 5) names THIS cell as one of the two that must move.
  A('JSG-01.9', '§2.1 dated clause 1 (a); A79; §2.4 item 7', "the instance's own member set is exactly ['off','on','register'] — the three declared members, and NOTHING ELSE (the pre-amendment declaration was ['register'])", membersAre(formOf(i1), 'off,on,register'), formOf(i1).members.join(','));
  A('JSG-01.10', '§2.4 item 5', 'the one member is a function', typeof i1.register === 'function', typeof i1.register);
  A('JSG-01.11', '§2.1 dated clause; §2.4 item 5 (a)', "the store's own verbs and findAddress are exposed through NO member of the handle", [...VERBS, 'findAddress'].every((v) => i1[v] === undefined), [...VERBS, 'findAddress'].filter((v) => i1[v] !== undefined).join(',') || 'none');
  A('JSG-01.12', 'package.md §1.3 item 4; §3.1 dated clause', 'none of the internal addon\'s five names is an own export of the entry', ['version', 'errorMessage', 'call'].every((v) => !Object.prototype.hasOwnProperty.call(ns, v)), ['version', 'errorMessage', 'call'].filter((v) => v in ns).join(',') || 'none');
  A('JSG-01.13', '§2.6; A73', 'no constraint verb and no repair verb is an own export', !('addConstraint' in ns) && !('repair' in ns) && !('constraint' in ns), ['addConstraint', 'repair', 'constraint'].filter((v) => v in ns).join(',') || 'none');

  // ── THE TWO NEW MEMBERS `A79` ADDS BESIDE `register`: THEIR FUNCTION CLASS, THE NAMESPACE THEY DO NOT
  // ENTER, AND THE TWO RETURN TYPES `§2.4` ITEM 7 DECLARES. Each cell cites its own clause; nothing of any
  // firing rule is stated (`A78`), and the address is MINTED FIRST only so the declared positions are
  // reachable (a DRIVING step, as at JSG-08 and JSG-09).
  A('JSG-01.14', '§2.1 dated clause 1 (a); §2.4 item 7', 'the two members the amendment adds are functions on the instance, beside register', typeof i1.on === 'function' && typeof i1.off === 'function', `on:${typeof i1.on} off:${typeof i1.off}`);
  A('JSG-01.15', '§2.1 dated clause 1 (b); §2.4 item 7; package.md §1.3 item 3', 'neither on nor off is an own named export of the entry: the module namespace stays at the EIGHT declared verbs', !Object.prototype.hasOwnProperty.call(ns, 'on') && !Object.prototype.hasOwnProperty.call(ns, 'off'), `own on=${Object.prototype.hasOwnProperty.call(ns, 'on')} own off=${Object.prototype.hasOwnProperty.call(ns, 'off')}`);
  const fnOn = () => {};
  const wOn = thrown(() => ns.write(i1, ['surf-on'], 'temp', {}));
  const wLs = thrown(() => ns.write(i1, ['surf-ls'], 'temp', {}));
  const rOn = wOn.threw ? { threw: true, err: wOn.err } : thrown(() => i1.on(['surf-on'], fnOn));
  const rLs = wLs.threw ? { threw: true, err: wLs.err } : thrown(() => ns.listen(i1, ['surf-ls']));
  const onH = rOn.threw ? undefined : rOn.value;
  const lsH = rLs.threw ? undefined : rLs.value;
  A('JSG-01.16', '§2.4 item 7 (a); §2.3 dated clause 1; §2.3 item 2', "on(address, listener) returns the package's OPAQUE handle — a non-null object, neither a function nor an array — and it is the SAME output spelling listen returns: the two-spelling rule gains NO third", !rOn.threw && onH !== null && typeof onH === 'object' && !Array.isArray(onH) && !rLs.threw && lsH !== null && typeof lsH === 'object' && !Array.isArray(lsH), rOn.threw ? `on threw ${fmt(rOn.err)}` : `on:${fmt(onH)} listen:${rLs.threw ? `listen threw ${fmt(rLs.err)}` : fmt(lsH)}`);
  const rOff = rOn.threw
    ? { threw: true, err: `off's handle position was never reachable: on refused (${fmt(rOn.err)})` }
    : thrown(() => i1.off(onH));
  A('JSG-01.17', '§2.4 item 7 (b); parameter-semantics.md §2.8 dated clause', 'off(handle) returns undefined on every success, driven over the in-domain handle on returned', !rOff.threw && rOff.value === undefined, rOff.threw ? `threw ${fmt(rOff.err)}` : fmt(rOff.value));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-02 — THE ROUND TRIP, END TO END, THE BOOT, THE TWO NORMALIZATIONS   16 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const cfg = mk('g02');
  const A2 = ns.storeCreate(cfg);
  const V = { name: 'alpha', flag: true, count: 3, ratio: 0.5, nest: { z: 1, arr: [1, 2, 3] }, list: ['p', { q: false }], '10': 'ten', '2': 'two' };
  const w = thrown(() => ns.write(A2, ['rt'], 'file', V));
  A('JSG-02.1', '§2.2; §4.3', 'the file-tier write returns a record and does not throw', !w.threw && w.value !== undefined, w.threw ? `threw ${fmt(w.err)}` : fmt(w.value));
  const r = w.threw ? null : thrown(() => ns.read(A2, ['rt']));
  A('JSG-02.2', '§4.3; §5.2 P-IM-1; crossing.md §1.5', 'the read is EQUAL to the written value under §1.5', r && !r.threw && rel(r.value, V), r && r.threw ? `threw ${fmt(r.err)}` : fmt(r && r.value));
  const kv = r && !r.threw && r.value && typeof r.value === 'object' ? Object.keys(r.value).sort() : [];
  A('JSG-02.3', '§1.5 item 1; DD-9', "the read's member key set equals the written key set as SETS (sorted)", kv.join(',') === Object.keys(V).sort().join(','), kv.join(','));
  const arrOk = r && !r.threw && Array.isArray(r.value?.nest?.arr) && r.value.nest.arr.length === 3 && r.value.nest.arr[0] === 1 && r.value.nest.arr[1] === 2 && r.value.nest.arr[2] === 3;
  A('JSG-02.4', '§1.5 item 2; DD-9', 'the nested array is dense, of equal length and equal member-by-member by INDEX', !!arrOk, fmt(r && r.value && r.value.nest && r.value.nest.arr));
  A('JSG-02.5', '§1.5 items 1-2', 'a nested object inside an array keeps its member value (list[1].q === false)', r && !r.threw && r.value?.list?.[1]?.q === false, fmt(r && r.value && r.value.list));
  const r2 = thrown(() => ns.read(A2, ['rt']));
  A('JSG-02.6', '§1.1 item 2', 'the returned value is NOT the caller\'s own object', r && !r.threw && r.value !== V, `same=${r && r.value === V}`);
  A('JSG-02.7', '§1.1; §2.2', 'two reads of one address are not the same object (a FRESH JS value each call)', r && r2 && !r.threw && !r2.threw && r.value !== r2.value, `same=${r && r2 && r.value === r2.value}`);
  const rm = thrown(() => { ns.write(A2, ['negmem'], 'mem', { neg: -0 }); return ns.read(A2, ['negmem']); });
  A('JSG-02.8', '§1.5 item 3; store §7.2 item 7 (c)', 'a mem-tier -0 member reads back Object.is -0', rm && !rm.threw && Object.is(rm.value?.neg, -0), rm && rm.threw ? `threw ${fmt(rm.err)}` : `neg=${fmt(rm && rm.value && rm.value.neg)}`);
  const whole = thrown(() => ns.read(A2, []));
  A('JSG-02.9', 'store §4.1; §4.2 R-5; A25', 'the empty address answers the whole register: an object whose key set contains the written key', whole && !whole.threw && whole.value && typeof whole.value === 'object' && !Array.isArray(whole.value) && Object.prototype.hasOwnProperty.call(whole.value, 'rt'), whole && whole.threw ? `threw ${fmt(whole.err)}` : fmt(whole && whole.value));
  const B = thrown(() => ns.storeCreate(cfg));
  const rb = (B && !B.threw) ? thrown(() => ns.read(B.value, ['rt'])) : { threw: true, err: B.err };
  A('JSG-02.10', 'store §7.2 item 6', 'a FRESH instance over the same cfg.filePath re-loads the committed value: the boot read equals the written value under §1.5', rb && !rb.threw && rel(rb.value, V), rb && rb.threw ? `threw ${fmt(rb.err)}` : fmt(rb && rb.value));
  const kb = rb && !rb.threw && rb.value && typeof rb.value === 'object' ? Object.keys(rb.value).sort() : [];
  A('JSG-02.11', '§1.5 item 1; store §7.2 item 6', "the booted value's member set is the written one", kb.join(',') === Object.keys(V).sort().join(','), kb.join(','));
  const wMem = thrown(() => ns.write(A2, ['neg-mem'], 'mem', -0));
  const rMem = wMem.threw ? wMem : thrown(() => ns.read(A2, ['neg-mem']));
  A('JSG-02.12', 'store §7.2 item 7 (c)', 'a mem-tier -0 reads back Object.is -0', !rMem.threw && Object.is(rMem.value, -0), rMem.threw ? `threw ${fmt(rMem.err)}` : fmt(rMem.value));
  const wTmp = thrown(() => ns.write(A2, ['neg-temp'], 'temp', -0));
  const rTmp = wTmp.threw ? wTmp : thrown(() => ns.read(A2, ['neg-temp']));
  A('JSG-02.13', 'store §7.2 item 7 (c)', 'a temp-tier -0 reads back Object.is -0', !rTmp.threw && Object.is(rTmp.value, -0), rTmp.threw ? `threw ${fmt(rTmp.err)}` : fmt(rTmp.value));
  const wFile = thrown(() => ns.write(A2, ['neg-file'], 'file', -0));
  const C = wFile.threw ? { threw: true, err: wFile.err } : thrown(() => ns.storeCreate(cfg));
  const rFile = (C && !C.threw) ? thrown(() => ns.read(C.value, ['neg-file'])) : { threw: true, err: C.err };
  A('JSG-02.14', 'store §7.2 item 7 (c); §4.3 exclusion (i)', 'after a boot the committed -0 reads back as 0 (Object.is 0 is true)', rFile && !rFile.threw && Object.is(rFile.value, 0), rFile && rFile.threw ? `threw ${fmt(rFile.err)}` : fmt(rFile && rFile.value));
  A('JSG-02.15', 'store §7.2 item 7 (c); §4.3 exclusion (i)', 'and Object.is(v,-0) is false: the ONE declared number normalization', rFile && !rFile.threw && !Object.is(rFile.value, -0), rFile && rFile.threw ? `threw ${fmt(rFile.err)}` : fmt(rFile && rFile.value));
  const rC = (C && !C.threw) ? thrown(() => ns.read(C.value, ['rt'])) : { threw: true, err: C.err };
  A('JSG-02.16', 'store §7.2 item 7 (a)-(c); §1.5', 'the booted mixed value is still EQUAL to V under §1.5 (the file image moves the -0 only)', rC && !rC.threw && rel(rC.value, V), rC && rC.threw ? `threw ${fmt(rC.err)}` : fmt(rC && rC.value));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-03 — THE DEEP-COPY DISCIPLINE, BOTH DIRECTIONS                        5 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i3 = ns.storeCreate(mk('g03'));
  const arg = { a: { b: [1, 2] } };
  const w = thrown(() => ns.write(i3, ['cp'], 'temp', arg));
  arg.a.b.push(3);
  arg.x = 'later';
  const r = w.threw ? w : thrown(() => ns.read(i3, ['cp']));
  A('JSG-03.1', '§1.1 items 1 & 4; §5.2 S-COPY-IN', 'mutating the argument after the call is invisible: a.b is still [1,2]', !r.threw && rel(r.value?.a?.b, [1, 2]), r.threw ? `threw ${fmt(r.err)}` : fmt(r.value));
  A('JSG-03.2', '§1.1 items 1 & 4', 'a member added to the argument after the call is not in the store', !r.threw && r.value && !Object.prototype.hasOwnProperty.call(r.value, 'x'), r.threw ? `threw ${fmt(r.err)}` : fmt(r.value));
  if (!r.threw && r.value) { r.value.a.b.push(9); r.value.a = 'nope'; }
  const r2 = thrown(() => ns.read(i3, ['cp']));
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
    const w = thrown(() => ns.write(i4, ['v'], 'temp', makeValue()));
    const form = formOf(w.err);
    A(`${id}.i`, clause, `the write of ${label} is REFUSED (a value is thrown)`, w.threw, w.threw ? 'threw' : `returned ${fmt(w.value)}`);
    A(`${id}.ii`, clause, `the status is exactly 'ValueNotAdmitted'`, statusOf(w) === 'ValueNotAdmitted', String(statusOf(w)));
    A(`${id}.iii`, clause, 'the ONE form: a plain object, own member set exactly {message, status}, both non-empty strings',
      w.threw && form.obj && form.proto === 'Object.prototype' && membersAre(form, 'message,status') && typeof w.err.status === 'string' && w.err.status.length > 0 && typeof w.err.message === 'string' && w.err.message.length > 0,
      `members=[${form.members.join(',')}] proto=${form.proto} errorish=${form.errorish} status=${fmt(w.err?.status)}`);
    A(`${id}.iv`, clause, "the message carries the store's own mismatch clause 'is not an admitted value'",
      typeof msgOf(w) === 'string' && msgOf(w).includes('is not an admitted value'), fmt(msgOf(w)));
    if (extra) extra(id, clause, w, label);
    g04.caught.push({ id, label, w });
    const rd = thrown(() => ns.read(i4, ['v']));
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
  const badForm = g04.caught.filter((x) => !membersAre(formOf(x.w.err), 'message,status')).length;
  A('JSG-04.16', "surface.md §2.5 item 5 (e); A76's reach clause", 'not one refusal is an Error instance, and every thrown value has exactly {message, status} (no raw host error is a rejection)',
    errorish === 0 && badForm === 0, `errorish=${errorish} wrongForm=${badForm} of 14`);
  A('JSG-04.17', '§1.7 (a); §1.7 (b) 3 dated clause', 'Array.isArray is TRUE for the Array subclass and the value is nonetheless refused: the class decision is not short-circuited by a shape test',
    Array.isArray(arraySubclass) === true && statusOf(g04.caught.find((x) => x.id === 'JSG-04.5')?.w ?? {}) === 'ValueNotAdmitted',
    `Array.isArray=${Array.isArray(arraySubclass)} status=${statusOf(g04.caught.find((x) => x.id === 'JSG-04.5')?.w ?? {})}`);
  const addrSub = thrown(() => ns.read(i4, new (class V extends Array {})()));
  A('JSG-04.18', '§1.7 (b) 3; §1.3 AddressArg row 11; §1.8 dated clause', 'a class extending Array at the ADDRESS position answers AddressMalformed (the code moves with the position)',
    statusOf(addrSub) === 'AddressMalformed', String(statusOf(addrSub)));
  const addrProxy = thrown(() => ns.read(i4, new Proxy(['a'], {})));
  A('JSG-04.19', '§1.3 AddressArg row 12; DD-34', 'a Proxy over an array at the ADDRESS position answers AddressMalformed',
    statusOf(addrProxy) === 'AddressMalformed', String(statusOf(addrProxy)));
  const addrStr = thrown(() => ns.read(i4, 'a.b'));
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
  thrown(() => ns.write(i5, ['ab'], 'mem', 1));
  const rAbsent = thrown(() => ns.read(i5, ['ab']));
  A('JSG-05.2', "crossing.md §1.3 dated rule 1; §1.3 TierArg row 3", 'an UNSET trailing tier on read is the absent state and is IN DOMAIN: the read succeeds and answers 1',
    !rAbsent.threw && rAbsent.value === 1, rAbsent.threw ? `threw ${fmt(rAbsent.err)}` : fmt(rAbsent.value));
  const rUndef = thrown(() => ns.read(i5, ['ab'], undefined));
  A('JSG-05.3', 'crossing.md §1.3 dated rule 1', 'read(i,a,undefined) folds to the SAME state as absent: the read succeeds and answers 1',
    !rUndef.threw && rUndef.value === 1, rUndef.threw ? `threw ${fmt(rUndef.err)}` : fmt(rUndef.value));
  const rNull = thrown(() => ns.read(i5, ['ab'], null));
  A('JSG-05.4', '§1.3 TierArg row 4', 'read(i,a,null) is PRESENT and its shape is not a tier\'s: AddressMalformed',
    statusOf(rNull) === 'AddressMalformed', String(statusOf(rNull)));
  const rEmpty = thrown(() => ns.read(i5, ['ab'], []));
  A('JSG-05.5', 'store-model.md §2.3 zero-tier bullet; §1.3 TierArg row 2', 'a 0-token set is the zero-tier arm: the read succeeds and answers 1 (the lowest-persistence selection)',
    !rEmpty.threw && rEmpty.value === 1, rEmpty.threw ? `threw ${fmt(rEmpty.err)}` : fmt(rEmpty.value));
  thrown(() => ns.write(i5, ['abt'], 'mem', 1));
  const dAbsent = thrown(() => ns.delete(i5, ['abt']));
  A('JSG-05.6', '§1.3 TierArg row 3 (delete); store §4.4 D-2', "delete with the tier position UNSET succeeds and its receipt's tiers is ['mem']",
    !dAbsent.threw && Array.isArray(dAbsent.value?.tiers) && dAbsent.value.tiers.join(',') === 'mem', dAbsent.threw ? `threw ${fmt(dAbsent.err)}` : fmt(dAbsent.value));
  const wNoTier = thrown(() => ns.write(i5, ['x']));
  A('JSG-05.7', '§1.3 TierArg row 3 (write); write-and-read.md §3.4 F-1', 'a write with the tier position UNSET answers AddressMalformed (a required argument is missing)',
    statusOf(wNoTier) === 'AddressMalformed', String(statusOf(wNoTier)));
  const noPath = thrown(() => ns.storeCreate({ journalLength: 1, listeners: [] }));
  A('JSG-05.8', '§1.3 FilePathArg row 2', 'an ABSENT filePath key is IN DOMAIN: an instance IS returned',
    !noPath.threw && noPath.value != null, noPath.threw ? `threw ${fmt(noPath.err)}` : 'instance');
  const fileAtRegister = noPath.threw ? { threw: true } : thrown(() => ns.write(noPath.value, ['x2'], 'file', 1));
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
  const w63 = thrown(() => ns.write(i6, ['d63'], 'temp', nest(63)));
  const r63 = w63.threw ? w63 : thrown(() => ns.read(i6, ['d63']));
  A('JSG-06.1', 'crossing.md §1.4 item 5 dated two-arm table', 'a value of nesting depth 63 is ADMITTED: the write succeeds and the value round-trips',
    !w63.threw && !r63.threw && rel(r63.value, nest(63)), w63.threw ? `threw ${fmt(w63.err)}` : `roundtrip=${!r63.threw && rel(r63.value, nest(63))}`);
  const w64 = thrown(() => ns.write(i6, ['d64'], 'temp', nest(64)));
  const r64 = w64.threw ? w64 : thrown(() => ns.read(i6, ['d64']));
  A('JSG-06.2', 'crossing.md §1.4 item 5 dated two-arm table', 'a value of nesting depth 64 is ADMITTED: the write succeeds and the value round-trips',
    !w64.threw && !r64.threw && rel(r64.value, nest(64)), w64.threw ? `threw ${fmt(w64.err)}` : `roundtrip=${!r64.threw && rel(r64.value, nest(64))}`);
  const w65 = thrown(() => ns.write(i6, ['d65'], 'temp', nest(65)));
  A('JSG-06.3', 'crossing.md §1.4 item 5 dated two-arm table; DD-10', 'a value of nesting depth 65 is REFUSED ValueNotAdmitted (the conversion core\'s own bound)',
    statusOf(w65) === 'ValueNotAdmitted', w65.threw ? String(statusOf(w65)) : `returned ${fmt(w65.value)}`);
  const w66 = thrown(() => ns.write(i6, ['d66'], 'temp', nest(66)));
  A('JSG-06.4', 'crossing.md §1.4 item 5 dated two-arm table; DD-10', 'a value of nesting depth 66 is REFUSED ValueNotAdmitted (the boundary encoder\'s own bound)',
    statusOf(w66) === 'ValueNotAdmitted', w66.threw ? String(statusOf(w66)) : `returned ${fmt(w66.value)}`);
  const f65 = formOf(w65.err);
  A('JSG-06.5', '§2.5 items 1-3; §1.7 (d)', 'the 65 refusal carries the ONE form: a plain object whose member set is exactly {message, status}, status ValueNotAdmitted, message non-empty',
    w65.threw && f65.obj && f65.proto === 'Object.prototype' && membersAre(f65, 'message,status') && w65.err.status === 'ValueNotAdmitted' && typeof w65.err.message === 'string' && w65.err.message.length > 0,
    `members=[${f65.members.join(',')}] proto=${f65.proto} status=${fmt(w65.err?.status)}`);
  const f66 = formOf(w66.err);
  A('JSG-06.6', '§2.5 items 1-3; §1.7 (d)', 'the 66 refusal carries the SAME form and the SAME code — the two arms answer ONE answer',
    w66.threw && f66.obj && membersOf(f66, 'message,status') && w66.err.status === 'ValueNotAdmitted' && typeof w66.err.message === 'string' && w66.err.message.length > 0,
    `members=[${f66.members.join(',')}] proto=${f66.proto} status=${fmt(w66.err?.status)}`);
  const d = { n: 1 };
  const wDia = thrown(() => ns.write(i6, ['dia'], 'temp', { x: d, y: d }));
  const rDia = wDia.threw ? wDia : thrown(() => ns.read(i6, ['dia']));
  A('JSG-06.7', '§1.4 item 6; DD-11', 'a DIAMOND (one value reachable by two paths but acyclic) is ADMITTED and round-trips: the guard is the walk\'s own ancestor stack, never a WeakSet of visited objects',
    !wDia.threw && !rDia.threw && rel(rDia.value, { x: { n: 1 }, y: { n: 1 } }), wDia.threw ? `threw ${fmt(wDia.err)}` : fmt(rDia.value));
}
function membersOf(r, want) { return r.members.join(',') === want; }

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-07 — THE TIERS AND THE PURGE, AND THE DELETE'S OWN TIER SCOPE        15 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i7 = ns.storeCreate(mk('g07'));
  thrown(() => ns.write(i7, ['p'], 'file', 100));
  const q1 = thrown(() => ns.read(i7, ['p']));
  A('JSG-07.1', 'store §4.1; R-1', 'the only version at the key answers 100', !q1.threw && q1.value === 100, q1.threw ? `threw ${fmt(q1.err)}` : fmt(q1.value));
  thrown(() => ns.write(i7, ['p'], 'temp', 1));
  const q2 = thrown(() => ns.read(i7, ['p']));
  A('JSG-07.2', 'store-model.md §2.3 zero-tier arm; store §5.3 item 2; A11', 'after a LESS persistent write the unqualified read selects the SHADOW: 1',
    !q2.threw && q2.value === 1, q2.threw ? `threw ${fmt(q2.err)}` : fmt(q2.value));
  const q3 = thrown(() => ns.read(i7, ['p'], 'file'));
  A('JSG-07.3', 'write-and-read.md §3.4 W-5', 'the shadowed more-persistent version SURVIVES: the file-tier read answers 100',
    !q3.threw && q3.value === 100, q3.threw ? `threw ${fmt(q3.err)}` : fmt(q3.value));
  const q4 = thrown(() => ns.read(i7, ['p'], 'temp'));
  A('JSG-07.4', '§2.2; store §4.2 R-4', 'the temp-tier read answers 1', !q4.threw && q4.value === 1, q4.threw ? `threw ${fmt(q4.err)}` : fmt(q4.value));
  thrown(() => ns.write(i7, ['p'], 'mem', 2));
  const q5 = thrown(() => ns.read(i7, ['p']));
  A('JSG-07.5', 'store §5.4 purge chain; write-and-read.md §3.4 W-6', 'the mem write purged the temp version (rank <= 1): the unqualified read answers 2',
    !q5.threw && q5.value === 2, q5.threw ? `threw ${fmt(q5.err)}` : fmt(q5.value));
  const q6 = thrown(() => ns.read(i7, ['p'], 'file'));
  A('JSG-07.6', "store §5.4 purge chain column (file left standing, rank 2 > 1)", 'the file version stands: 100', !q6.threw && q6.value === 100, q6.threw ? `threw ${fmt(q6.err)}` : fmt(q6.value));
  const q7 = thrown(() => ns.read(i7, ['p'], 'temp'));
  A('JSG-07.7', 'store-model.md §2.3; store §8.1 #4', 'the temp version is gone: the key exists and the tier does not — TierNotFound', statusOf(q7) === 'TierNotFound', String(statusOf(q7)));
  thrown(() => ns.write(i7, ['p'], 'file', 300));
  const q8 = thrown(() => ns.read(i7, ['p']));
  A('JSG-07.8', 'store §5.4 purge chain; W-6', 'the file write purged file, mem and temp (rank <= 2): the unqualified read answers 300',
    !q8.threw && q8.value === 300, q8.threw ? `threw ${fmt(q8.err)}` : fmt(q8.value));
  const q9 = thrown(() => ns.read(i7, ['p'], 'mem'));
  A('JSG-07.9', 'store §5.4 purge chain; §8.1 #4', 'no mem version stands: TierNotFound', statusOf(q9) === 'TierNotFound', String(statusOf(q9)));
  ns.write(i7, ['set'], 'file', 8);
  ns.write(i7, ['set'], 'temp', 7);
  const q10 = thrown(() => ns.read(i7, ['set'], ['file', 'temp']));
  A('JSG-07.10', 'store-model.md §2.3; store §4.2 R-4; DD-37', 'a tier-qualified SET read answers the lowest-persistence member of the matched subset: 7',
    !q10.threw && q10.value === 7, q10.threw ? `threw ${fmt(q10.err)}` : fmt(q10.value));
  const q11 = thrown(() => ns.read(i7, ['set'], ['temp', 'temp']));
  A('JSG-07.11', '§1.3 TierArg row 2', 'duplicates in the set are in domain and change nothing: the same answer 7',
    !q11.threw && q11.value === 7, q11.threw ? `threw ${fmt(q11.err)}` : fmt(q11.value));
  const wArr = thrown(() => ns.write(i7, ['pa'], ['temp'], [1]));
  A('JSG-07.12', '§1.3 TierArg row 2; §5.4 P-SM-4', 'an ARRAY tier on a WRITE answers OutOfDomainTier (the array spelling is the reader\'s arity)',
    statusOf(wArr) === 'OutOfDomainTier', String(statusOf(wArr)));
  thrown(() => ns.write(i7, ['d1'], 'file', 2));
  thrown(() => ns.write(i7, ['d1'], 'temp', 1));
  const d1 = thrown(() => ns.delete(i7, ['d1'], 'temp'));
  const d1r = d1.threw ? d1 : thrown(() => ns.read(i7, ['d1']));
  A('JSG-07.13', 'store §4.4 D-1; §4.3', "a one-tier delete removes only the named tier's version: tiers is ['temp'] and the file version still reads 2",
    !d1.threw && d1.value.tiers.join(',') === 'temp' && !d1r.threw && d1r.value === 2,
    d1.threw ? `threw ${fmt(d1.err)}` : `tiers=[${d1.value.tiers}] read=${fmt(d1r.value)}`);
  const d2 = thrown(() => ns.delete(i7, ['d1']));
  const d2r = d2.threw ? d2 : thrown(() => ns.read(i7, ['d1']));
  A('JSG-07.14', 'store §4.4 D-2', "an unqualified delete removes every version: tiers is ['file'] and the address no longer resolves",
    !d2.threw && d2.value.tiers.join(',') === 'file' && statusOf(d2r) === 'AddressNotFound',
    d2.threw ? `threw ${fmt(d2.err)}` : `tiers=[${d2.value.tiers}] read.status=${statusOf(d2r)}`);
  thrown(() => ns.write(i7, ['d3'], 'mem', 1));
  const d3 = thrown(() => ns.delete(i7, ['d3'], 'file'));
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
  ns.write(i8, ['ev'], 'temp', {});
  const h1 = ns.listen(i8, ['ev']);
  A('JSG-08.1', '§2.3 item 2; DD-14', "listen returns an opaque JS value and NOT a string", typeof h1 === 'object' && h1 !== null && typeof h1 !== 'string', `${typeof h1} ${fmt(h1)}`);
  A('JSG-08.2', '§2.3 item 2; DD-28', 'the token is PRIVATE: no own enumerable member carries it', Object.keys(h1).length === 0, Object.keys(h1).join(',') || 'none');
  const spelled = `${String(h1)}|${(() => { try { return JSON.stringify(h1); } catch { return ''; } })()}`;
  A('JSG-08.3', '§2.3 item 3 (ii); DD-28', 'neither String() nor JSON.stringify() spells a token (no listener- fragment)', !spelled.includes('listener-'), spelled.slice(0, 120));
  const calls = [];
  const fn = (...args) => { calls.push(args); };
  const reg1 = thrown(() => i8.register(h1, fn));
  A('JSG-08.4', '§2.4 item 5 (b)', 'register(handle, listener) returns undefined on success', !reg1.threw && reg1.value === undefined, reg1.threw ? `threw ${fmt(reg1.err)}` : fmt(reg1.value));
  const w1 = thrown(() => ns.write(i8, ['ev', 'child'], 'temp', 5));
  const trig1 = w1.threw ? [] : w1.value?.triggered;
  A('JSG-08.5', '§2.7 item 1; §2.4 item 6 (a); A77', "the record's triggered carries the id REGISTRATION was given (h1)", Array.isArray(trig1) && trig1.includes(h1), fmt(trig1));
  A('JSG-08.6', '§2.4 rule 3 and item 6 (b)', 'the registered function is invoked exactly ONCE for that write', calls.length === 1, `calls=${calls.length}`);
  const arg1 = calls[0];
  A('JSG-08.7', '§2.7 item 5', "the invocation's arguments.length is exactly 1", !!arg1 && arg1.length === 1, arg1 ? `${arg1.length}` : 'not invoked');
  A('JSG-08.8', '§2.7 item 5; parameter-semantics.md §2.12 dated producer clause', "the single argument is the TRIGGERING ADDRESS ['ev','child'], index-equal",
    !!arg1 && rel(arg1[0], ['ev', 'child']), arg1 ? fmt(arg1[0]) : 'not invoked');
  A('JSG-08.9', 'surface.md §2.4 item 6 (d); parameter-semantics.md §2.15 dated clause', 'the argument is NOT the id that selected the function', !!arg1 && arg1[0] !== h1, arg1 ? `same=${arg1[0] === h1}` : 'not invoked');
  const w2 = thrown(() => ns.write(i8, ['ev', 'child2'], 'temp', 6));
  A('JSG-08.10', '§2.3 item 5; store §6.5 item 3', 'the prefix test is descendant-inclusive: a write at a DESCENDANT address triggers the listener bound at ["ev"]',
    !w2.threw && Array.isArray(w2.value?.triggered) && w2.value.triggered.includes(h1), w2.threw ? `threw ${fmt(w2.err)}` : fmt(w2.value?.triggered));
  const h2 = ns.listen(i8, ['no']);
  ns.write(i8, ['no'], 'temp', {});
  const before = calls.length;
  const logged = [];
  const orig = { log: console.log, warn: console.warn, error: console.error, info: console.info, debug: console.debug };
  console.log = (...a) => logged.push(['log', ...a]); console.warn = (...a) => logged.push(['warn', ...a]);
  console.error = (...a) => logged.push(['error', ...a]); console.info = (...a) => logged.push(['info', ...a]); console.debug = (...a) => logged.push(['debug', ...a]);
  let w3 = null;
  try { w3 = thrown(() => ns.write(i8, ['no', 'x'], 'temp', 4)); } finally {
    console.log = orig.log; console.warn = orig.warn; console.error = orig.error; console.info = orig.info; console.debug = orig.debug;
  }
  A('JSG-08.11', 'store §6.5 item 10 (c)', "an id the package holds no function for is still returned in triggered", !w3.threw && Array.isArray(w3.value?.triggered) && w3.value.triggered.includes(h2), w3.threw ? `threw ${fmt(w3.err)}` : fmt(w3.value?.triggered));
  A('JSG-08.12', '§2.4 rule 1; surface.md §2.4 item 6 (c)', 'an unregistered handle invokes NOTHING: the call count is unchanged', calls.length === before, `calls ${before} -> ${calls.length}`);
  A('JSG-08.13', '§2.4 rule 1; surface.md §2.4 item 6 (c)', 'and reports NOTHING: no console output of any level', logged.length === 0, fmt(logged.map((l) => l[0])));
  A('JSG-08.14', 'surface.md §2.4 item 6 (c)', 'and the write neither throws nor answers a code: the silence is an assertable observable', !w3.threw, w3.threw ? `threw ${fmt(w3.err)}` : 'no throw');
  const un1 = thrown(() => ns.unlisten(i8, h1));
  A('JSG-08.15', '§2.10', 'unlisten returns undefined', !un1.threw && un1.value === undefined, un1.threw ? `threw ${fmt(un1.err)}` : fmt(un1.value));
  const afterUn = calls.length;
  const w4 = thrown(() => ns.write(i8, ['ev', 'child3'], 'temp', 3));
  A('JSG-08.16', '§2.4 rule 4; §2.3 item 6', "after unlisten the store-side home entry is gone: the record's triggered no longer contains h1",
    !w4.threw && Array.isArray(w4.value?.triggered) && !w4.value.triggered.includes(h1), w4.threw ? `threw ${fmt(w4.err)}` : fmt(w4.value?.triggered));
  A('JSG-08.17', '§2.4 rule 4; DD-15', 'and the function never fires again: the call count is unchanged', calls.length === afterUn, `calls ${afterUn} -> ${calls.length}`);
  ns.write(i8, ['keep'], 'temp', {});
  const ka = ns.listen(i8, ['keep']);
  const kb = ns.listen(i8, ['keep']);
  A('JSG-08.18', '§2.3 item 6 (the STILL-REGISTERED arm); surface.md §2.3 dated pointer', 'a repeat listen at an ALREADY-REGISTERED address mints nothing and returns the SAME opaque value',
    ka === kb, `same=${ka === kb}`);
  const w5 = thrown(() => ns.write(i8, ['keep', 'x'], 'temp', 2));
  const distinct5 = w5.threw ? [] : [...new Set(w5.value.triggered)];
  A('JSG-08.19', 'store §6.5 item 2; §2.4 rule 3', "the record's DISTINCT-handle set for that address has ONE member", distinct5.length === 1, `${distinct5.length} distinct of [${fmt(w5.value?.triggered)}]`);
  ns.write(i8, ['wit'], 'temp', {});
  const wa = ns.listen(i8, ['wit']);
  ns.unlisten(i8, wa);
  const wb = ns.listen(i8, ['wit']);
  A('JSG-08.20', '§2.3 item 6 (the WITHDRAWN arm)', 'after the withdrawal removed that address\'s home entry, a later listen MINTS A FRESH handle (a !== b)',
    wa !== wb, `same=${wa === wb}`);
  const dupCfg = { ...mk('g08dup'), listeners: [{ address: ['dup'], handle: 'tok' }, { address: ['dup'], handle: 'tok' }] };
  const iDup = thrown(() => ns.storeCreate(dupCfg));
  if (!iDup.threw) ns.write(iDup.value, ['dup'], 'temp', {});
  const hDup = iDup.threw ? null : thrown(() => ns.listen(iDup.value, ['dup']));
  const dupCalls = [];
  if (!iDup.threw && !hDup.threw) iDup.value.register(hDup.value, () => { dupCalls.push(1); });
  const wDup = (!iDup.threw && !hDup.threw) ? thrown(() => ns.write(iDup.value, ['dup', 'x'], 'temp', 1)) : { threw: true };
  A('JSG-08.21', '§2.4 rule 3; store DD-42 caller-spelled clause', 'two construction entries at ONE address carrying the SAME caller-spelled token fire the registry ONCE (one invocation per DISTINCT handle)',
    !wDup.threw && dupCalls.length === 1, wDup.threw ? `threw ${fmt(wDup.err)}` : `invocations=${dupCalls.length}`);
  const dupDistinct = wDup.threw ? [] : [...new Set(wDup.value.triggered)];
  A('JSG-08.22', 'parameter-semantics.md §2.15; §2.7 item 3', "that record's DISTINCT-handle set has ONE member (a SET, never a sequence)", dupDistinct.length === 1, `${dupDistinct.length} distinct of [${fmt(wDup.value?.triggered)}]`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// JSG-09 — THE REGISTRATION SITE'S DOMAIN AND ITS REFUSAL FORM            12 assertions
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const i9 = ns.storeCreate(mk('g09'));
  ns.write(i9, ['site'], 'temp', {});
  const hIn = ns.listen(i9, ['site']);
  const f1c = [], f2c = [];
  const f1 = () => { f1c.push(1); }, f2 = () => { f2c.push(1); };
  const r1 = thrown(() => i9.register(hIn, f1));
  A('JSG-09.1', '§2.4 item 5 (b)', 'register(handle, listener) returns undefined for an in-domain pair', !r1.threw && r1.value === undefined, r1.threw ? `threw ${fmt(r1.err)}` : fmt(r1.value));
  const r2 = thrown(() => i9.register(hIn, f2));
  A('JSG-09.2', '§2.4 item 5 (b) & rule 2', 'a RE-registration returns undefined (a success on every success, including a replacement)', !r2.threw && r2.value === undefined, r2.threw ? `threw ${fmt(r2.err)}` : fmt(r2.value));
  const w9 = thrown(() => ns.write(i9, ['site', 'x'], 'temp', 1));
  A('JSG-09.3', '§2.4 rule 2', 'the replacement took effect: f2 fired and f1 did NOT', !w9.threw && f2c.length === 1 && f1c.length === 0, `f1=${f1c.length} f2=${f2c.length}`);
  const bare = thrown(() => i9.register('a-bare-string', f1));
  A('JSG-09.4', '§2.4 item 5 (d); surface.md §2.5 item 5 (g)', 'a bare string at the handle position is REFUSED (a value is thrown)', bare.threw, bare.threw ? 'threw' : `returned ${fmt(bare.value)}`);
  A('JSG-09.5', 'surface.md §2.5 item 5 (g); SW-1 final clause item 1; DD-40', "the refusal's status is the store's own AddressMalformed, minted by nothing", statusOf(bare) === 'AddressMalformed', String(statusOf(bare)));
  const fb = formOf(bare.err);
  A('JSG-09.6', 'surface.md §2.5 items 1-3 and item 5 (e)', 'the refusal travels in the single form: a plain object, own member set exactly {message, status}, both non-empty strings',
    bare.threw && fb.obj && fb.proto === 'Object.prototype' && membersAre(fb, 'message,status') && typeof bare.err.status === 'string' && bare.err.status.length > 0 && typeof bare.err.message === 'string' && bare.err.message.length > 0,
    `members=[${fb.members.join(',')}] proto=${fb.proto} errorish=${fb.errorish} status=${fmt(bare.err?.status)}`);
  const fab = thrown(() => i9.register({}, f1));
  A('JSG-09.7', '§2.4 item 5 (d)', 'a fabricated non-opaque value at the handle position answers the same form and the same status', statusOf(fab) === 'AddressMalformed', String(statusOf(fab)));
  const nul = thrown(() => i9.register(null, f1));
  A('JSG-09.8', '§2.4 item 5 (d)', 'null at the handle position answers the same form and the same status', statusOf(nul) === 'AddressMalformed', String(statusOf(nul)));
  const noListener = thrown(() => i9.register(hIn));
  A('JSG-09.9', '§2.4 item 5 (c)-(d)', 'an ABSENT listener position is refused: listener must be a function', statusOf(noListener) === 'AddressMalformed', String(statusOf(noListener)));
  const nothing = thrown(() => i9.register());
  A('JSG-09.10', '§2.4 item 5 (d)', 'both positions absent answers the same form and status', statusOf(nothing) === 'AddressMalformed', String(statusOf(nothing)));
  const f2Before = f2c.length;
  const w9b = thrown(() => ns.write(i9, ['site', 'y'], 'temp', 2));
  A('JSG-09.11', '§2.4 item 5 (d) ("nothing reaches the store ... changes no node")', 'no standing registration is disturbed by a refusal: the pre-refusal registration still fires',
    !w9b.threw && f2c.length === f2Before + 1, `f2 ${f2Before} -> ${f2c.length}`);
  const msgs = [bare, fab, nul, noListener, nothing].map((x) => msgOf(x));
  const hasPlaceholder = msgs.some((m) => typeof m !== 'string' || m.length === 0 || PLACEHOLDER_TOKENS.some((t) => m.includes(t)));
  A('JSG-09.12', 'surface.md §2.5 item 5 (a) & (e); store §8.2 property (c)', 'every refusal message is a non-empty string carrying no unsubstituted <...> placeholder', !hasPlaceholder, fmt(msgs));
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
  one('JSG-10.1', '§1.3 AddressArg row 6; store §8.1 #1', 'read(inst, "a.b")', 'AddressMalformed', () => ns.read(i10, 'a.b'));
  one('JSG-10.2', '§1.3 TierArg row 3; store §8.1 #1 / F-1', 'a write with the tier position absent', 'AddressMalformed', () => ns.write(i10, ['x']));
  one('JSG-10.3', 'store §8.1 #2 (L-3)', 'read at an unoccupied address', 'AddressNotFound', () => ns.read(i10, ['nothing-here']));
  thrown(() => ns.write(i10, ['lf'], 'temp', 1));
  one('JSG-10.4', 'store §8.1 #3 (L-4)', 'a read that must walk THROUGH a leaf', 'LeafHasNoDownstream', () => ns.read(i10, ['lf', 'down']));
  thrown(() => ns.write(i10, ['tt'], 'mem', 1));
  one('JSG-10.5', 'store §8.1 #4 (L-TIER)', 'a read at a tier the key does not hold', 'TierNotFound', () => ns.read(i10, ['tt'], 'temp'));
  one('JSG-10.6', 'store §8.1 #5; A29', 'a tier token outside {file, mem, temp}', 'OutOfDomainTier', () => ns.read(i10, ['tt'], 'secure'));
  const iMem = thrown(() => ns.storeCreate({ journalLength: 2, listeners: [] }));
  const iM = iMem.threw ? i10 : iMem.value;
  thrown(() => ns.write(iM, ['m'], 'mem', {}));
  one('JSG-10.7', 'store §8.1 #6 (F-6); store-model.md §1.6 item 4 (d)(ii)', 'a write whose tier outranks its parent anchor\'s tier (mem register)', 'ParentAnchorMonotonicityViolation', () => ns.write(iM, ['m', 'k'], 'file', 1));
  thrown(() => ns.write(i10, ['cc'], 'mem', {}));
  one('JSG-10.8', 'store §8.1 #7 (F-4)', 'a write whose value kind contradicts the target container kind', 'ContainerKindConflict', () => ns.write(i10, ['cc'], 'mem', [1]));
  thrown(() => ns.write(i10, ['rb'], 'temp', {}));
  one('JSG-10.9', 'store §8.1 #8; write-and-read.md §4.1.1 item 3', 'readLiteral at a BRANCH target', 'ReadTargetIsBranch', () => ns.readLiteral(i10, ['rb']));
  thrown(() => ns.write(i10, ['wp'], 'temp', 1));
  one('JSG-10.10', 'store §8.1 #9 (F-5)', 'a write whose resolved PARENT is a leaf', 'WriteParentNotLink', () => ns.write(i10, ['wp', 'down'], 'temp', 2));
  one('JSG-10.11', 'store §8.1 #10 (M-11)', 'rollback with a well-shaped but unknown op id', 'JournalOpUnknown', () => ns.rollback(i10, 'no-such-op'));
  const iJ = ns.storeCreate({ ...mk('g10j'), journalLength: 1 });
  const jw1 = thrown(() => ns.write(iJ, ['rc1'], 'temp', 1));
  thrown(() => ns.write(iJ, ['rc2'], 'temp', 1));
  one('JSG-10.12', 'store §8.1 #11; §6.1 item 5; §6.4 M-6', 'a rollback whose candidate set includes the entry the append compressed', 'RollbackCompacted', () => ns.rollback(iJ, jw1.value.op.opId));
  one('JSG-10.13', 'store §8.1 #12; §7.1', 'storeCreate with an ABSENT journalLength', 'ConstructionArgumentMissing', () => ns.storeCreate({ filePath: mk('g10b').filePath, listeners: [] }));
  one('JSG-10.14', 'store §8.1 #13; §7.1; §1.3 FilePathArg row 4', 'storeCreate with a provided path whose parent directory does not exist', 'FilePathUnreachable', () => ns.storeCreate({ filePath: path.join(ROOT, 'no-such-dir-xyz', 'state.json'), journalLength: 1, listeners: [] }));
  one('JSG-10.15', 'store §8.1 #14; §1.2 row 11', 'a write whose value is NaN', 'ValueNotAdmitted', () => ns.write(i10, ['nv'], 'temp', NaN));
  const cfgFC = cfgFor('g10fc');
  const iFC = ns.storeCreate(cfgFC.c);
  fs.rmSync(cfgFC.dir, { recursive: true, force: true });
  fs.writeFileSync(cfgFC.dir, 'not a directory');
  const wFC = thrown(() => ns.write(iFC, ['fc'], 'file', 1));
  g10.all.push({ id: 'JSG-10.16', label: 'a file-tier write whose path became unwritable after construction', r: wFC });
  A('JSG-10.16', 'store §8.1 #15; §7.2 items 3-4', 'a file-tier write whose commit path fails answers FileCommitFailed and delivers it to the caller',
    statusOf(wFC) === 'FileCommitFailed', String(statusOf(wFC)));
  const rFC = thrown(() => ns.read(iFC, ['fc']));
  g10.all.push({ id: 'JSG-10.17', label: 'the state after the failed commit', r: rFC });
  A('JSG-10.17', 'store §6.4 item 8; §7.2 item 3 (i)', "after the failed commit A16's automatic journal rollback has run: the pre-write state stands (the address does not resolve)",
    statusOf(rFC) === 'AddressNotFound', String(statusOf(rFC)));

  const thrownSet = g10.all.filter((x) => !x.r.threw);
  const forms = g10.all.map((x) => formOf(x.r.err));
  A('JSG-10.18', '§2.5 items 1-3; DD-12', 'every one of the driven failures arrives as ONE form: a plain object whose own member set is exactly {message, status}, both non-empty strings',
    thrownSet.length === 0 && forms.every((f) => f.obj && f.proto === 'Object.prototype' && membersAre(f, 'message,status')),
    `${thrownSet.length} did not throw; forms=${forms.map((f) => `[${f.members.join(',')}]/${f.proto}`).join(' ')}`);
  const codes = g10.all.map((x) => statusOf(x.r));
  const outside = codes.filter((c) => !CLOSED_SET.includes(c));
  A('JSG-10.19', "§2.5 item 1; DD-40", "every status is a member of the store's closed 15-member set — no code outside the set and none minted by the package",
    outside.length === 0, `outside=[${outside.join(',')}] observed=[${codes.join(',')}]`);
  const msgs10 = g10.all.map((x) => msgOf(x.r));
  const withPlaceholder = msgs10.filter((m) => typeof m !== 'string' || m.length === 0 || PLACEHOLDER_TOKENS.some((t) => m.includes(t)));
  A('JSG-10.20', 'store §8.2 property (c)', 'every message is non-empty and carries no unsubstituted placeholder token of the generator\'s own form',
    withPlaceholder.length === 0, fmt(withPlaceholder));
  const i21 = ns.storeCreate(mk('g10w21'));
  thrown(() => ns.write(i21, ['window'], 'mem', {}));
  const r21 = thrown(() => ns.read(i21, ['window', 'empty']));
  const want21 = "'empty' does not exist in 'window', it holds no keys";
  A('JSG-10.21', "store §8.2 worked example (2) and its degenerate arm", `read(['window','empty']) over an empty MAP answers AddressNotFound with EXACTLY ${want21}`,
    statusOf(r21) === 'AddressNotFound' && msgOf(r21) === want21, `${statusOf(r21)} :: ${fmt(msgOf(r21))}`);
  const i22 = ns.storeCreate(mk('g10w22'));
  ns.write(i22, ['window'], 'mem', {});
  thrown(() => ns.write(i22, ['window', 'tabs'], 'mem', { doc1: 1, searchbar: 2 }));
  const r22 = thrown(() => ns.read(i22, ['window', 'tabs', 'LandingPage']));
  const want22 = "'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'";
  A('JSG-10.22', "store §8.2 worked example (1) and its <CONTAINERSEGMENT> reconciliation", `read(['window','tabs','LandingPage']) answers AddressNotFound with EXACTLY ${want22}`,
    statusOf(r22) === 'AddressNotFound' && msgOf(r22) === want22, `${statusOf(r22)} :: ${fmt(msgOf(r22))}`);
  const r23 = thrown(() => ns.write(i22, ['window', 'tabs'], 'mem', [1, 2]));
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
  const w = thrown(() => ns.write(i11, ['j'], 'mem', V11));
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
  const rb = thrown(() => ns.rollback(i11, op.opId));
  A('JSG-11.12', 'store §6.3', "the rollback's record has exactly the member set {opId, undoneOps, restoredTo}",
    !rb.threw && membersAre(formOf(rb.value), 'opId,restoredTo,undoneOps'), rb.threw ? `threw ${fmt(rb.err)}` : formOf(rb.value).members.join(','));
  A('JSG-11.13', 'store §6.3', 'the id the caller passed is echoed', !rb.threw && rb.value.opId === op.opId, rb.threw ? `threw ${fmt(rb.err)}` : fmt(rb.value?.opId));
  A('JSG-11.14', 'store §6.3; §6.4 M-7 (i)', 'undoneOps contains the id whose reversal the store actually performed', !rb.threw && Array.isArray(rb.value.undoneOps) && rb.value.undoneOps.includes(op.opId), rb.threw ? `threw ${fmt(rb.err)}` : fmt(rb.value?.undoneOps));
  A('JSG-11.15', 'store §6.3; §6.4 M-5/M-8', 'restoredTo reports the state the addressed subtree now stands at: {present: false}', !rb.threw && rb.value.restoredTo?.present === false, rb.threw ? `threw ${fmt(rb.err)}` : fmt(rb.value?.restoredTo));
  const after11 = thrown(() => ns.read(i11, ['j']));
  A('JSG-11.16', 'store §6.4 M-5/M-8', 'the write that installed the node was undone: the address no longer resolves', statusOf(after11) === 'AddressNotFound', String(statusOf(after11)));
  const unknown = thrown(() => ns.rollback(i11, 'no-such-op'));
  A('JSG-11.17', 'store §8.1 #10; §6.4 M-11; §1.3 OpIdArg row 2', 'a made-up op id answers JournalOpUnknown in the single form', statusOf(unknown) === 'JournalOpUnknown', String(statusOf(unknown)));
  const w2 = thrown(() => ns.write(i11, ['j2'], 'mem', 1));
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
// `{ register, on, off }` (`JSG-01.9`), the realm claim (Node ESM alone — `JSG-12.4`, `.5`) and the
// `HO-` handoff row (`JSG-12.5`'s `§3.2 HO-1`) are all UNCHANGED, checked and unmoved. NO ASSERTION IN
// THIS FILE IS WEAKENED BY THIS PASS, AND NO `APP`-GREEN IS CLAIMED.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const names = Object.keys(ns).sort();
  A('JSG-12.1', '§3.1; A70; package.md §1.1', 'the ONE import of the claimed ESM entry resolved and the namespace carries the 8 verbs',
    names.join(',') === VERBS.join(','), names.join(','));
  A('JSG-12.2', 'package.md §1.3 item 3; §2.9 item 1', "the entry's named exports are exactly the 8 verbs and NOTHING ELSE",
    Object.keys(ns).length === 8 && VERBS.every((v) => v in ns), Object.keys(ns).join(','));
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
  const wantOpts = [
    '@provident-storeroom/js-linux-x64-gnu', '@provident-storeroom/js-linux-arm64-gnu',
    '@provident-storeroom/js-darwin-x64', '@provident-storeroom/js-darwin-arm64',
    '@provident-storeroom/js-win32-x64-msvc',
  ];
  // CHECKED AND UNMOVED 2026-10-11 (U-STOREROOM-PUBLISH): the rename does NOT reach these five names.
  // `PUB-DD-15` and `PUB-DD-6` (their home: `docs/specs/storeroom-publish/resolution.md §3.1`'s table;
  // `PAR-PUB-17`) fix each name as the scope `@provident-storeroom`, a `/`, and the label
  // `js-<target>-<arch>[-<toolchain>]` — character for character the five the cell below already
  // asserts. The main package's move to an UNSCOPED identity does not move them (`A84`'s `A-1` decides
  // the spelling once; `A82` leaves the platform scope alone), so NO expected value here moves and no
  // assertion of this cell is loosened.
  A('JSG-12.12', 'package.md §3.2 items 2 & 5; §3.3 item 5; DD-26; PUB-DD-15; PUB-DD-6; resolution.md §3.1', 'the five artefact names are the label-to-artefact map with its toolchain suffixes',
    wantOpts.every((n) => opts.includes(n)), opts.join(','));
  A('JSG-12.13', 'package.md §1.3 items 3-4; §1.2 items 1-2; A70', "the four internal-only names (version, errorMessage, call, the ADDON's register) are absent from the module graph, and storeCreate is the ENTRY's own factory",
    ['version', 'errorMessage', 'call', 'register'].every((n) => !Object.prototype.hasOwnProperty.call(ns, n)) && typeof ns.storeCreate === 'function',
    ['version', 'errorMessage', 'call', 'register'].filter((n) => n in ns).join(',') || 'none');
  const exposedAddon = Object.keys(ex).filter((k) => k.includes('.node')) ;
  A('JSG-12.14', 'package.md §1.2 items 1-3; DD-4', 'the addon artefact is exposed by NO subpath of the exports map: the reach is INTERNAL and is not a second realm',
    exposedAddon.length === 0, exposedAddon.join(',') || 'none');
  A('JSG-12.15', '§4.2 items 1-2; DD-18; DD-20', "this set's own layer is ENVELOPE/PURE and the label travels with every figure of this run", LAYER === 'ENVELOPE/PURE', LAYER);
  A('JSG-12.16', '§4.2 items 2-3; DD-20', "this set's APP layer is NONE: the unit delivers a LIBRARY and no APP-green is claimed here, in the driver or in the run's record", APP_LAYER === 'NONE', APP_LAYER);
  const deps = Object.keys(pkg?.dependencies || {});
  A('JSG-12.17', 'package.md §3.2 item 2; §3.3 item 2; DD-25', 'the five prebuild artefacts are OPTIONAL per-target dependencies and not required dependencies (no fallback build-on-install as the primary route)',
    wantOpts.every((n) => !deps.includes(n)), `dependencies=[${deps.join(',')}]`);
  // ⟶ ADDED 2026-10-11 (U-STOREROOM-PUBLISH, `PUB-DD-1`; `A85`(1)): the manifest's `files` allowlist is
  // declared by THIS unit for the FIRST time — the sibling unit's `package.md` and `contract.md` declare
  // no `files` cell — so this row has NO pre-rename counterpart and is an ADDITION rather than a
  // re-derivation. `PAR-PUB-3` fixes the domain as exactly `index.mjs` · `README.md` · `index.d.ts`, and
  // `contract.md §2.1` item 1 / `distribution.md §6.1` item 8 carry it: "NO binary ships, at any key, on
  // any target". Asserted EXACTLY — set equality with the three declared paths, no `build/Release` path
  // and no `.node` entry anywhere in the allowlist — and NO LOOSER FORM.
  const FILES = ['index.mjs', 'README.md', 'index.d.ts'];
  const filesList = Array.isArray(pkg?.files) ? pkg.files : null;
  const filesSorted = filesList ? [...filesList].sort() : null;
  const filesBinaryFree = filesList
    ? filesList.every((f) => typeof f !== 'string' || (!f.includes('build/Release') && !f.endsWith('.node')))
    : false;
  A('JSG-12.18', 'PUB-DD-1; A85(1); PAR-PUB-3; contract.md §2.1 item 1; distribution.md §6.1 item 8', "the manifest's files allowlist is EXACTLY ['README.md','index.d.ts','index.mjs'] — and no build/Release path and no .node entry ships",
    filesSorted !== null && filesSorted.join(',') === [...FILES].sort().join(',') && filesBinaryFree,
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
  const wm = thrown(() => ns.write(i13, ['big-map'], 'temp', bigMap));
  A('JSG-13.1', 'RCA §1, §4, §5-bis', `a ${N}-member object completes its write without throwing`, !wm.threw, wm.threw ? `threw ${fmt(wm.err)}` : 'returned a record');
  const rm = wm.threw ? wm : thrown(() => ns.read(i13, ['big-map']));
  A('JSG-13.2', 'RCA §6 item 1; store §4.2 R-2', `the read answers an object with ${N} members`, !rm.threw && rm.value && Object.keys(rm.value).length === N, rm.threw ? `threw ${fmt(rm.err)}` : `members=${rm.value ? Object.keys(rm.value).length : 'n/a'}`);
  A('JSG-13.3', '§1.5 item 1', 'its member key set is equal to the written one as a SET', !rm.threw && rel(rm.value, bigMap), 'see JSG-13.2');
  const wv = thrown(() => ns.write(i13, ['big-vec'], 'temp', bigVec));
  const rv = wv.threw ? wv : thrown(() => ns.read(i13, ['big-vec']));
  A('JSG-13.4', '§1.5 item 2; store §4.2 R-3', `a ${N}-member array round-trips dense, in index order, equal member-by-member`,
    !wv.threw && !rv.threw && rel(rv.value, bigVec), wv.threw ? `threw ${fmt(wv.err)}` : (rv.threw ? `read threw ${fmt(rv.err)}` : `len=${rv.value && rv.value.length}`));
  const wn = thrown(() => ns.write(i13, ['big-nest'], 'temp', bigNest));
  const rn = wn.threw ? wn : thrown(() => ns.read(i13, ['big-nest']));
  A('JSG-13.5', '§1.5; RCA §6 item 3', 'a nested 50 x 60 structure round-trips with every nested member set equal',
    !wn.threw && !rn.threw && rel(rn.value, bigNest), wn.threw ? `threw ${fmt(wn.err)}` : (rn.threw ? `read threw ${fmt(rn.err)}` : 'round trip'));
  A('JSG-13.6', 'RCA §1, §6 item 1; §1.4 item 5', 'none of the three writes produces a failure code: the declared bound is not reached at this size',
    !wm.threw && !wv.threw && !wn.threw, [wm, wv, wn].map((x) => (x.threw ? String(statusOf(x)) : 'ok')).join(','));
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RUN'S OWN REPORT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('');
console.log('── THE RUN ─────────────────────────────────────────────────────────────────────────');
console.log(`SITE:  node bindings/js/greens/greens.mjs   (cwd: ${process.cwd()})`);
console.log(`ENTRY: ${new URL('../index.mjs', import.meta.url).pathname}`);
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
