// bindings/js/greens/live-drive.mjs
// GATE 6 — THE LIVE DRIVER for `U-STOREROOM-JS` (`D-GP-SRJS`), authored by `role_live_scenario_runner`.
//
// WHAT THIS FILE IS. The unit's live surface is THE BUILT ARTEFACT reached through the package's claimed
// ESM entry in a REAL Node process doing REAL file-tier I/O at a REAL caller-spelled `cfg.filePath`.
// This driver exercises that surface as a CALLER: it constructs at a real path, registers REAL FUNCTIONS,
// writes and reads values, SEES THE RETURNED IDS, invokes the matched functions, deletes, boots a FRESH
// instance on the same path (and a REAL CHILD PROCESS) and reads the durable state back, rolls back with a
// real op id, and is REFUSED with a real verbose failure. It ALSO drives the layer the gate-5 set cannot:
// the SAME PACKAGE in a scratch copy with the addon artifact ABSENT (the declared `FilePathUnreachable`
// arm, with no fallback).
//
// LAYER: this run is a LIVE run of the ASSEMBLED PACKAGE — the real artifact, a real process, real file
// I/O, a real caller. It is ADDITIVE to the gate-5 `ENVELOPE/PURE` set: it retires no envelope row and no
// node row, and NO `APP`-GREEN IS CLAIMED (the unit delivers a LIBRARY; `APP` layer = NONE, `DD-20`).
//
// RUN:  node bindings/js/greens/live-drive.mjs        (from the repository root)

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ENTRY = path.resolve(HERE, '..', 'index.mjs');
const ADDON = path.resolve(HERE, '..', 'build', 'Release', 'storeroom_js_binding.node');
const ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'sr-js-live-'));

let authored = 0, executed = 0, pass = 0, fail = 0;
const fails = [];
const perScenario = new Map();

function A(id, clause, expectation, cond, observed) {
  authored += 1; executed += 1;
  const sc = id.split('.')[0];
  if (!perScenario.has(sc)) perScenario.set(sc, { pass: 0, fail: 0, start: '', end: '' });
  const rec = perScenario.get(sc);
  if (cond) { pass += 1; rec.pass += 1; } else {
    fail += 1; rec.fail += 1;
    fails.push({ id, clause, expectation, observed: String(observed) });
    console.log(`FAIL ${id}  expected: ${expectation}\n             observed: ${observed}\n             clause:   ${clause}`);
  }
}
function start(sc, s) { if (!perScenario.has(sc)) perScenario.set(sc, { pass: 0, fail: 0, start: '', end: '' }); perScenario.get(sc).start = s; }
function end(s, v) { perScenario.get(s).end = v; }

// THE §1.5 RELATION: member-SET equality for objects, array index order significant, Object.is for numbers.
function rel(a, b) {
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
function thrown(fn) { try { return { threw: false, value: fn() }; } catch (e) { return { threw: true, err: e }; } }
function isSingleForm(e) {
  if (e === null || typeof e !== 'object' || e instanceof Error) return false;
  if (Object.getPrototypeOf(e) !== Object.prototype) return false;
  const k = Object.getOwnPropertyNames(e).sort().join(',');
  return k === 'message,status' && typeof e.status === 'string' && e.status.length > 0
    && typeof e.message === 'string' && e.message.length > 0;
}
function statusOf(r) { return r.threw ? (r.err && r.err.status) : 'ok'; }
function fsPath(name) { return path.join(ROOT, name); }

const V = { name: 'alpha', flag: true, count: 3, ratio: 0.5, nest: { z: 1, arr: [1, 2, 3] }, list: ['p', { q: false }], '10': 'ten', '2': 'two' };

// the artifact facts, measured at the driver's own start (the RUN's own report)
const addonStat = fs.statSync(ADDON);
const addonSha = crypto.createHash('sha256').update(fs.readFileSync(ADDON)).digest('hex');

const ns = await import(ENTRY);

console.log('═════════════════════════════════════════════════════════════════════════════════════');
console.log('GATE 6 · U-STOREROOM-JS · THE LIVE RUN against the BUILT ARTEFACT');
console.log('═════════════════════════════════════════════════════════════════════════════════════');
console.log(`node           ${process.version}   (execPath ${process.execPath})`);
console.log(`entry          ${ENTRY}`);
console.log(`artifact       ${ADDON}`);
console.log(`               ${addonStat.size} bytes · mtime ${addonStat.mtime.toISOString()} · sha256 ${addonSha}`);
console.log(`scratch        ${ROOT}`);
console.log(`layer          LIVE / ASSEMBLED PACKAGE (real artifact, real process, real file I/O, real caller) — APP layer NONE`);

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-1 — CONSTRUCT AT A REAL PATH, IN A REAL NODE PROCESS                     (the start point)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-1';
  const filePath = fsPath('live1/state.json');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  start(sc, `a caller supplies cfg { filePath: '${filePath}', journalLength: 4, listeners: [] } and calls storeCreate`);
  A(`${sc}.1`, 'package.md §1.1; §3.1', 'the claimed ESM entry resolves and its namespace carries the eight verbs',
    Object.keys(ns).sort().join(',') === 'delete,listen,read,readLiteral,rollback,storeCreate,unlisten,write', Object.keys(ns).sort().join(','));
  const cfg = { filePath, journalLength: 4, listeners: [] };
  const c = thrown(() => ns.storeCreate(cfg));
  A(`${sc}.2`, '§2.1', 'storeCreate returns a non-null object and does not throw', !c.threw && c.value !== null && typeof c.value === 'object', c.threw ? `threw ${JSON.stringify(c.err)}` : String(c.value));
  const inst = c.threw ? null : c.value;
  A(`${sc}.3`, '§2.4 item 5 (a)', "the instance's own member set is exactly ['register']",
    inst !== null && Object.getOwnPropertyNames(inst).sort().join(',') === 'register', inst ? Object.getOwnPropertyNames(inst).sort().join(',') : 'no instance');
  A(`${sc}.4`, '§1.3 FilePathArg row 1', "the caller's filePath is a REAL path: its parent directory exists on disk",
    fs.existsSync(path.dirname(filePath)) && fs.statSync(path.dirname(filePath)).isDirectory(), path.dirname(filePath));
  A(`${sc}.5`, 'the declared build step (bindings/js/README.md)', 'the addon artifact is present at the declared path with non-zero size',
    fs.existsSync(ADDON) && addonStat.size > 0, fs.existsSync(ADDON) ? `${addonStat.size} bytes` : 'ABSENT');
  end(sc, `an instance stands over the file register '${path.basename(path.dirname(filePath))}/state.json'; own members ['register']; the artifact ${addonStat.size} bytes sha256 ${addonSha.slice(0, 12)}…`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-2 — A REAL FUNCTION, A REAL HANDLE, A REAL ADDRESS, A REAL ID            (ids seen, function invoked)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-2';
  const filePath = fsPath('live2/state.json');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const inst = ns.storeCreate({ filePath, journalLength: 4, listeners: [] });
  start(sc, 'a caller mints the branch [\'ev\'], calls listen(inst,[\'ev\']), registers a REAL function closure at that handle, and writes under [\'ev\',\'child\']');
  ns.write(inst, ['ev'], 'temp', {});
  const h = ns.listen(inst, ['ev']);
  A(`${sc}.1`, '§2.3 item 2; DD-14', "listen returns the package's opaque value: typeof 'object', not a string, and it spells no token",
    typeof h === 'object' && typeof h !== 'string' && !JSON.stringify(h).includes('listener-'), `${typeof h} ${JSON.stringify(h)}`);
  // DRIVING CORRECTION D-1 (the gate-5 correction, honoured here): `register(handle, listener)` is the
  // INSTANCE's own one member (`§2.4` item 5 (a)) and NOT a module-level verb of the entry.
  A(`${sc}.2`, '§2.4 item 5 (b)', 'register(handle, fn) answers undefined on success', inst.register(h, () => {}) === undefined, 'undefined');
  const calls = [];
  const fn = function (...args) { calls.push(args); };
  inst.register(h, fn);
  const w = ns.write(inst, ['ev', 'child'], 'temp', { n: 1 });
  A(`${sc}.3`, '§2.7 item 1; A77', "the returned record's triggered carries the id REGISTRATION was given",
    Array.isArray(w.triggered) && w.triggered.includes(h), JSON.stringify(w.triggered?.length));
  A(`${sc}.4`, '§2.4 rule 3', 'the registered function runs exactly once', calls.length === 1, `${calls.length} invocations`);
  A(`${sc}.5`, '§2.7 item 5', "the invocation carries exactly ONE argument", calls[0] && calls[0].length === 1, `${calls[0] ? calls[0].length : 'n/a'}`);
  A(`${sc}.6`, '§2.7 item 5; parameter-semantics.md §2.12', "that argument is the TRIGGERING ADDRESS ['ev','child'] and not the id",
    calls[0] && rel(calls[0][0], ['ev', 'child']) && calls[0][0] !== h, calls[0] ? JSON.stringify(calls[0][0]) : 'n/a');
  A(`${sc}.7`, '§2.2; store §3.6', "the write's returned record carries a real opId the caller sees",
    typeof w.op === 'object' && typeof w.op.opId === 'string' && w.op.opId.length > 0, String(w.op?.opId));
  const h2 = ns.listen(inst, ['ev']);
  A(`${sc}.8`, '§2.3 item 6', 'a repeat listen at a REGISTERED address mints nothing: the same opaque value comes back',
    h2 === h, h2 === h ? 'same handle' : 'a different handle');
  end(sc, `handle ${JSON.stringify(h)} registered with a real closure; the write answered opId ${String(w.op?.opId)} (seq ${String(w.op?.seq)}) and the closure ran ${calls.length}× with the triggering address ${calls[0] ? JSON.stringify(calls[0][0]) : 'n/a'}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-3 — THE WRITE, THE TIER-QUALIFIED READ, AND THE DELETE'S OWN RECEIPT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-3';
  const filePath = fsPath('live3/state.json');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const inst = ns.storeCreate({ filePath, journalLength: 4, listeners: [] });
  start(sc, "a caller writes the mixed value V at ['store1'] at the file tier, reads it, shadows it at temp, and deletes the temp version");
  const w = ns.write(inst, ['store1'], 'file', V);
  A(`${sc}.1`, '§2.2; store §3.6', "the write's returned record's own member set is exactly {op, watched, triggered}",
    Object.keys(w).sort().join(',') === 'op,triggered,watched', Object.keys(w).sort().join(','));
  A(`${sc}.2`, '§2.2; store §6.2', "the op carries tier 'file' and its after value EQ V under §1.5",
    w.op.tier === 'file' && w.op.after.present === true && rel(w.op.after.value, V), `tier=${w.op.tier} after.present=${w.op.after?.present}`);
  const r = ns.read(inst, ['store1']);
  A(`${sc}.3`, '§4.3; §1.5', 'read answers V EQUAL under §1.5 (member-SET, array index order, Object.is)', rel(r, V), 'relation');
  A(`${sc}.4`, '§1.1 item 2', 'the read is a FRESH JS-owned value, not the object the caller passed', r !== V && r.nest !== V.nest, r === V ? 'identical' : 'fresh');
  const rt = ns.read(inst, ['store1'], 'file');
  A(`${sc}.5`, '§2.2; store §4.2 R-4', 'the tier-qualified read answers the file version', rel(rt, V), 'relation');
  const w2 = ns.write(inst, ['store1'], 'temp', 2);
  A(`${sc}.6`, 'store §5.3 item 2; A11', 'the less persistent write IS the shadowing one and the unqualified read selects it',
    ns.read(inst, ['store1']) === 2, String(ns.read(inst, ['store1'])));
  const d = ns.delete(inst, ['store1'], 'temp');
  A(`${sc}.7`, 'store §4.4 D-1; §4.3', "the delete receipt names exactly ['temp'] and its own member set is {address, tiers, triggered}",
    Array.isArray(d.tiers) && d.tiers.join(',') === 'temp' && Object.keys(d).sort().join(',') === 'address,tiers,triggered', `tiers=${JSON.stringify(d.tiers)}`);
  A(`${sc}.8`, 'store §4.2 R-4', 'the file version STANDS after the temp version is removed', rel(ns.read(inst, ['store1']), V), 'relation');
  end(sc, `['store1'] holds the file version V again after the temp shadow was deleted (receipt tiers ${JSON.stringify(d.tiers)}); the journal advanced to seq ${String(w2.op?.seq)}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-4 — REAL FILE I/O ON DISK, AND A FRESH INSTANCE BOOTED OVER THE SAME PATH
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-4';
  const dir = fsPath('live4');
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'state.json');
  const cfg = { filePath, journalLength: 4, listeners: [] };
  const A_ = ns.storeCreate(cfg);
  start(sc, `a caller writes V at ['durable'] at the file tier over '${filePath}', writes a mem-tier value beside it, then constructs a FRESH instance over the SAME cfg`);
  ns.write(A_, ['durable'], 'file', V);
  A(`${sc}.1`, 'store §7.2 item 5; the README\'s file-behaviour reading', 'the store wrote a REAL file at the caller-spelled path',
    fs.existsSync(filePath), fs.existsSync(filePath) ? 'file exists' : 'ABSENT');
  const st = fs.existsSync(filePath) ? fs.statSync(filePath) : { size: 0 };
  A(`${sc}.2`, 'store §7.2 item 5 (existence and size ONLY; DD-5 forbids a JS-side byte/spelling read)',
    'the file carries bytes', st.size > 0, `${st.size} bytes`);
  ns.write(A_, ['memonly'], 'mem', 7);
  const B = ns.storeCreate(cfg);
  A(`${sc}.3`, 'store §7.2 item 6', 'a FRESH instance over the same path returns an instance (the boot runs)',
    B !== null && typeof B === 'object' && B !== A_, 'instance');
  const rb = ns.read(B, ['durable']);
  A(`${sc}.4`, '§4.3; store §7.2 item 6', 'the booted instance RE-LOADS the committed value: B.read([\'durable\']) EQ V under §1.5',
    rel(rb, V), 'relation');
  A(`${sc}.5`, '§1.1; §2.2', 'the booted read is a FRESH object and not a shared reference', rb !== V && rb.nest !== V.nest, 'fresh');
  const whole = ns.read(B, []);
  A(`${sc}.6`, 'store §4.1 R-5; A25', "the empty address answers the WHOLE register and it contains 'durable'",
    whole !== null && typeof whole === 'object' && Object.prototype.hasOwnProperty.call(whole, 'durable'), Object.keys(whole || {}).join(','));
  const memAfterBoot = thrown(() => ns.read(B, ['memonly']));
  A(`${sc}.7`, 'store §7.2 item 6; seams-and-lifecycle.md (mem is lost on process exit)', 'the mem-tier value is NOT durable: after the boot it does not resolve',
    memAfterBoot.threw && statusOf(memAfterBoot) === 'AddressNotFound', statusOf(memAfterBoot));
  end(sc, `the file at ${filePath} stands (${st.size} bytes); the booted instance read ['durable'] back EQ to the caller's V and its whole register holds ${JSON.stringify(Object.keys(whole || {}))}; ['memonly'] (mem) answered ${statusOf(memAfterBoot)}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-5 — A REAL CHILD PROCESS BOOTS THE SAME PATH AND READS THE DURABLE STATE BACK
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-5';
  const dir = fsPath('live5');
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'state.json');
  const cfg = { filePath, journalLength: 4, listeners: [] };
  const PARENT_V = { deep: { arr: [1, 2, { z: 'z' }] }, n: -1, ok: true, '7': 'seven' };
  const inst = ns.storeCreate(cfg);
  const w = ns.write(inst, ['crossproc'], 'file', PARENT_V);
  const childFile = path.join(dir, 'boot-child.mjs');
  fs.writeFileSync(childFile, `
import { storeCreate, read } from ${JSON.stringify(ENTRY)};
const i = storeCreate({ filePath: ${JSON.stringify(filePath)}, journalLength: 4, listeners: [] });
console.log(JSON.stringify({ pid: process.pid, value: read(i, ${JSON.stringify(['crossproc'])}), whole: Object.keys(read(i, [])) }));
`);
  start(sc, `the PARENT (pid ${process.pid}) writes the value at ['crossproc'] at the file tier and a SEPARATE, freshly spawned Node process boots the same filePath through the same claimed entry`);
  const out = thrown(() => execFileSync(process.execPath, [childFile], { encoding: 'utf8' }));
  A(`${sc}.1`, 'the live surface: a real process, real file I/O', 'the child process exits 0 and prints its own reading', !out.threw, out.threw ? String(out.err).slice(0, 200) : out.value.trim().slice(0, 120));
  const child = out.threw ? null : JSON.parse(out.value.trim());
  A(`${sc}.2`, 'store §7.2 item 6; §4.3', "the CHILD process's read of the address EQ the parent's written value under §1.5",
    child !== null && rel(child.value, PARENT_V), child ? 'relation' : 'no child reading');
  A(`${sc}.3`, 'store §4.1 R-5', "the child's whole register carries the parent's key",
    child !== null && child.whole.includes('crossproc'), child ? JSON.stringify(child.whole) : 'n/a');
  A(`${sc}.4`, 'the live surface: a real process boundary', "the child is a DIFFERENT process from the writer",
    child !== null && child.pid !== process.pid, child ? `child pid ${child.pid} vs parent pid ${process.pid}` : 'n/a');
  end(sc, `the parent (pid ${process.pid}) wrote opId ${String(w.op?.opId)} at the file tier; the child process (pid ${child ? child.pid : 'n/a'}) booted the same path and read the value and the register back at their final resolved state`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-6 — A ROLLBACK DRIVEN BY THE REAL OP ID THE CALLER WAS GIVEN
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-6';
  const filePath = fsPath('live6/state.json');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const inst = ns.storeCreate({ filePath, journalLength: 4, listeners: [] });
  const w = ns.write(inst, ['rolled'], 'mem', { k: 1 });
  start(sc, `a caller takes the opId the write returned (${String(w.op.opId)}) and calls rollback(inst, that id)`);
  const rb = ns.rollback(inst, w.op.opId);
  A(`${sc}.1`, 'store §6.3', "the rollback record's own member set is exactly {opId, undoneOps, restoredTo}",
    Object.keys(rb).sort().join(',') === 'opId,restoredTo,undoneOps', Object.keys(rb).sort().join(','));
  A(`${sc}.2`, 'store §6.3', 'the id the caller passed is ECHOED', rb.opId === w.op.opId, String(rb.opId));
  A(`${sc}.3`, 'store §6.3; §6.4 M-7', "undoneOps contains the op whose reversal the store performed",
    Array.isArray(rb.undoneOps) && rb.undoneOps.includes(w.op.opId), JSON.stringify(rb.undoneOps));
  A(`${sc}.4`, 'store §6.3; §6.4 M-5/M-8', 'restoredTo is the absent state {present: false}', rb.restoredTo && rb.restoredTo.present === false, JSON.stringify(rb.restoredTo));
  const after = thrown(() => ns.read(inst, ['rolled']));
  A(`${sc}.5`, 'store §6.4 M-8', 'the address no longer resolves: the write that installed it was undone',
    after.threw && statusOf(after) === 'AddressNotFound', statusOf(after));
  const bad = thrown(() => ns.rollback(inst, 'no-such-op'));
  A(`${sc}.6`, 'store §8.1 #10; §6.4 M-11', 'an unknown id is REFUSED with JournalOpUnknown in the single form',
    bad.threw && statusOf(bad) === 'JournalOpUnknown' && isSingleForm(bad.err), statusOf(bad));
  end(sc, `the real op ${String(w.op.opId)} was reversed: undoneOps ${JSON.stringify(rb.undoneOps)}, restoredTo ${JSON.stringify(rb.restoredTo)}, and ['rolled'] answers ${statusOf(after)} at its final resolved state`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-7 — A REAL VERBOSE REFUSAL, AT ITS OWN BYTES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-7';
  const filePath = fsPath('live7/state.json');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const inst = ns.storeCreate({ filePath, journalLength: 4, listeners: [] });
  start(sc, 'a caller offers a bigint at a value position, a class instance at a value position, and reads an address that does not exist — every refusal is caught and printed verbatim');
  const b = thrown(() => ns.write(inst, ['v'], 'temp', 10n));
  A(`${sc}.1`, '§2.5 items 1-3; §1.2 row 10', 'the bigint is refused as ValueNotAdmitted in the ONE thrown form',
    b.threw && statusOf(b) === 'ValueNotAdmitted' && isSingleForm(b.err), statusOf(b));
  A(`${sc}.2`, "surface.md §2.5 item 6 (a); the gate-5 finding JSG-04.1.v", "the refusal's message carries the failing target's own spelling 10n",
    b.threw && typeof b.err.message === 'string' && b.err.message.includes('10n'), b.threw ? b.err.message : 'no throw');
  const c = thrown(() => ns.write(inst, ['v'], 'temp', new (class Foo {})()));
  A(`${sc}.3`, 'surface.md §2.5 item 6 (b); the gate-5 finding JSG-04.4.v', "the class refusal's message carries the class — 'prototype-carrying non-plain object'",
    c.threw && typeof c.err.message === 'string' && c.err.message.includes('prototype-carrying non-plain object'), c.threw ? c.err.message : 'no throw');
  const n = thrown(() => ns.read(inst, ['nothing-here']));
  A(`${sc}.4`, 'store §8.1 #2; §8.2 property (c)', 'an absent address is refused AddressNotFound with the store\'s own generated message, no placeholder',
    n.threw && statusOf(n) === 'AddressNotFound' && typeof n.err.message === 'string' && !/<[A-Za-z-]+>/.test(n.err.message), n.threw ? n.err.message : 'no throw');
  const all = [b, c, n];
  A(`${sc}.5`, 'surface.md §2.5 item 5 (e); A76', 'not one refusal is a raw host Error, and every one is exactly {message, status}',
    all.every((x) => x.threw && isSingleForm(x.err)), all.map(statusOf).join(','));
  end(sc, `three refusals, each thrown in the single form; verbatim messages — ValueNotAdmitted: "${b.threw ? b.err.message : ''}" · ValueNotAdmitted(class): "${c.threw ? c.err.message : ''}" · AddressNotFound: "${n.threw ? n.err.message : ''}"`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-9 — THE GATE-5 FINDING 1, RE-MEASURED LIVE: the fourteen refused value classes' messages
// (the gate-5 record filed ONE finding with three cells — JSG-04.1.v · .2.v · .4.v — whose observed state
// was FOURTEEN BYTE-IDENTICAL messages carrying the address and no class. This scenario prints the bytes
// the CURRENT artifact answers, so the finding's live status is measured rather than assumed.)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-9';
  const filePath = fsPath('live9/state.json');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const inst = ns.storeCreate({ filePath, journalLength: 4, listeners: [] });
  start(sc, 'a caller offers each of the fourteen refused value classes at the SAME value position [\'v\'] of a write, and every caught message is printed verbatim');
  const cyc = { n: 1 }; cyc.self = cyc;
  const mk = {
    bigint: () => 10n,
    symbol: () => Symbol(),
    symbolKey: () => ({ [Symbol('s')]: 1 }),
    classInstance: () => new (class Foo {})(),
    arraySubclass: () => new (class Bar extends Array {})(),
    sparse: () => [1, , 3],
    undefinedMember: () => ({ a: undefined }),
    proxy: () => new Proxy({ a: 1 }, {}),
    accessor: () => ({ get a() { return 1; } }),
    map: () => new Map([[1, 1]]),
    date: () => new Date(0),
    func: () => function f() {},
    nan: () => NaN,
    cycle: () => cyc,
  };
  const seen = {};
  for (const [name, make] of Object.entries(mk)) {
    const r = thrown(() => ns.write(inst, ['v'], 'temp', make()));
    seen[name] = { threw: r.threw, status: statusOf(r), message: r.threw ? r.err.message : '<no throw>', form: r.threw ? isSingleForm(r.err) : false };
  }
  A(`${sc}.1`, 'surface.md §2.5 item 6 (a); crossing.md §1.7 (b) 1 — the gate-5 cell JSG-04.1.v', "the bigint refusal carries the failing target's OWN spelling 10n and its class",
    seen.bigint.message.includes('10n') && seen.bigint.message.includes('bigint'), seen.bigint.message);
  A(`${sc}.2`, 'surface.md §2.5 item 6 (a) — the gate-5 cell JSG-04.2.v', 'the symbol refusal carries Symbol() and its class',
    seen.symbol.message.includes('Symbol()') && seen.symbol.message.includes('symbol'), seen.symbol.message);
  A(`${sc}.3`, 'surface.md §2.5 item 6 (b); crossing.md §1.8 dated clause 3 — the gate-5 cell JSG-04.4.v', "the class refusal carries the class — 'prototype-carrying non-plain object' read verbatim",
    seen.classInstance.message.includes('prototype-carrying non-plain object'), seen.classInstance.message);
  A(`${sc}.4`, 'the gate-5 finding\'s core observation (fourteen answers, ONE message byte for byte)',
    'the fourteen refusals no longer answer one byte-identical message: the message set has more than one member',
    new Set(Object.values(seen).map((x) => x.message)).size > 1, `${new Set(Object.values(seen).map((x) => x.message)).size} distinct messages of 14`);
  A(`${sc}.5`, 'surface.md §2.5 item 6 (b): the argument POSITION travels beside the class', "every one of the fourteen carries the argument position of the failure",
    Object.values(seen).every((x) => /argument/.test(x.message)), Object.entries(seen).filter(([, x]) => !/argument/.test(x.message)).map(([k]) => k).join(',') || 'all 14');
  A(`${sc}.6`, '§2.5 items 1-3; §1.2 rows 4-13', 'every one of the fourteen is refused in the ONE thrown form with status ValueNotAdmitted',
    Object.values(seen).every((x) => x.threw && x.status === 'ValueNotAdmitted' && x.form), Object.entries(seen).filter(([, x]) => !(x.threw && x.status === 'ValueNotAdmitted' && x.form)).map(([k]) => k).join(',') || 'all 14');
  end(sc, `the fourteen classes at a value position: ${new Set(Object.values(seen).map((x) => x.message)).size} distinct messages, all ValueNotAdmitted, all in the single form; e.g. bigint → "${seen.bigint.message}" · symbol → "${seen.symbol.message}" · class → "${seen.classInstance.message}"`);
}


// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-8 — THE LAYER THE GATE-5 SET CANNOT DRIVE: THE ADDON ABSENT, IN A SCRATCH COPY OF THE PACKAGE
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-8';
  const absentDir = path.join(ROOT, 'absent-pkg');
  fs.mkdirSync(absentDir, { recursive: true });
  const pkgDir = path.resolve(HERE, '..');
  fs.copyFileSync(path.join(pkgDir, 'index.mjs'), path.join(absentDir, 'index.mjs'));
  fs.copyFileSync(path.join(pkgDir, 'package.json'), path.join(absentDir, 'package.json'));
  const absentAddon = path.join(absentDir, 'build', 'Release', 'storeroom_js_binding.node');
  start(sc, `the package is copied to '${absentDir}' WITHOUT its build/Release directory, so the addon is ABSENT at the copy's own declared path; a caller then imports the copy's entry and calls storeCreate with a legal cfg`);
  A(`${sc}.1`, 'the declared build step; §7.1', 'the scratch copy is a faithful copy of the package with the addon ABSENT',
    fs.existsSync(path.join(absentDir, 'index.mjs')) && fs.existsSync(path.join(absentDir, 'package.json')) && !fs.existsSync(absentAddon), `addon present? ${fs.existsSync(absentAddon)}`);
  const imp = await (async () => { try { return { threw: false, ns: await import(path.join(absentDir, 'index.mjs')) }; } catch (e) { return { threw: true, err: e }; } })();
  A(`${sc}.2`, "the README's absent-addon clause", 'the copy\'s entry still resolves (the addon is reached INTERNALLY and lazily, so the absence surfaces at storeCreate)',
    !imp.threw, imp.threw ? `import threw ${String(imp.err && imp.err.message).slice(0, 120)}` : 'resolved');
  const cfgAbsent = { filePath: path.join(absentDir, 'state.json'), journalLength: 1, listeners: [] };
  const a1 = thrown(() => imp.ns.storeCreate(cfgAbsent));
  A(`${sc}.3`, "the README's absent-addon clause; store §8.1 #13", 'storeCreate answers the single failure form with status FilePathUnreachable and NO instance',
    a1.threw && isSingleForm(a1.err) && a1.err.status === 'FilePathUnreachable', a1.threw ? `${statusOf(a1)} :: ${a1.err && a1.err.message}` : 'no throw — an instance was returned');
  A(`${sc}.4`, "the README's clause; JS-3 (closed)", "the message names the ABSENT addon's own path and carries no unsubstituted placeholder",
    a1.threw && typeof a1.err.message === 'string' && a1.err.message.includes(absentAddon) && !/<[A-Za-z-]+>/.test(a1.err.message), a1.threw ? a1.err.message : 'n/a');
  const a2 = thrown(() => imp.ns.storeCreate(cfgAbsent));
  A(`${sc}.5`, "A75: *there is no fallback and no JS-side store*", 'there is NO fallback: a second construction answers the same failure and writes nothing',
    a2.threw && statusOf(a2) === 'FilePathUnreachable' && !fs.existsSync(path.join(absentDir, 'state.json')), a2.threw ? `${statusOf(a2)}; scratch state file exists? ${fs.existsSync(path.join(absentDir, 'state.json'))}` : 'no throw');
  // the positive control's own start point is a REAL directory (the driving correction D-L1 below: the
  // scratch directory must exist, or the control drives the CONSTRUCTION's own unreachable-parent arm).
  fs.mkdirSync(fsPath('live8'), { recursive: true });
  const ctrl = thrown(() => { const i = ns.storeCreate({ filePath: fsPath('live8/state.json'), journalLength: 1, listeners: [] }); ns.write(i, ['ctrl'], 'temp', 1); return ns.read(i, ['ctrl']); });
  A(`${sc}.6`, 'the positive control', 'at the same moment the REAL package (real addon) still constructs and round-trips — the arm measures ABSENCE and not a broken run',
    !ctrl.threw && ctrl.value === 1, ctrl.threw ? `threw ${statusOf(ctrl)}` : String(ctrl.value));
  A(`${sc}.7`, "the README's ABSENT-ADDON clause; JS-3 (closed); the store's §8.2 generator", 'the refusal reproduces the generator\'s own rendering BYTE-FOR-BYTE at the absent artefact\'s own path',
    a1.threw && a1.err.message === `'${absentAddon}' is not reachable at construction, the path must exist or the application must be able to write it`, a1.threw ? a1.err.message : 'n/a');
  end(sc, `with the addon absent at ${absentAddon} the package answers ${a1.threw ? a1.err.status : 'n/a'} — "${a1.threw ? a1.err.message : ''}" — returns no instance, falls back to nothing, and writes nothing; the real package beside it is unaffected`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-10 — THE CLAUSE NO CELL OF THE GATE-5 SET DRIVES: THE CROSS-REALM ACCEPTANCE
// (the gate-5 record's own `§4` closing row records it *"STILL OPEN as a drive — recorded, not claimed"*.
// §1.2 row 4, §1.4 item 4 (e) and `AddressArg` row 13 declare a cross-realm plain object and a cross-realm
// array ACCEPTED. This drives them through the claimed entry, in a real `vm` realm, at a real instance.)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-10';
  const filePath = fsPath('live10/state.json');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const inst = ns.storeCreate({ filePath, journalLength: 4, listeners: [] });
  start(sc, 'a caller builds values in ANOTHER realm (`node:vm`) — a plain object, an array, a class instance — and offers them at a value position and at an address position');
  const xPlain = vm.runInNewContext('({a: 1, nest: {b: 2}})');
  const xArr = vm.runInNewContext('[1, 2, 3]');
  const xClass = vm.runInNewContext('new (class Foo {})()');
  const nullProto = Object.create(null); nullProto.a = 1;
  const wPlain = thrown(() => ns.write(inst, ['cr-plain'], 'temp', xPlain));
  A(`${sc}.1`, '§1.2 row 4; §1.4 item 4 (e); DD-7', 'a cross-realm PLAIN object is ACCEPTED at a value position',
    !wPlain.threw, wPlain.threw ? `refused ${statusOf(wPlain)} :: ${wPlain.err.message}` : 'accepted');
  const rPlain = wPlain.threw ? null : thrown(() => ns.read(inst, ['cr-plain']));
  A(`${sc}.2`, '§1.2 row 4; §1.5', 'it round-trips EQUAL under §1.5 (the realm-agnostic prototype test, not a realm-identity test)',
    rPlain !== null && !rPlain.threw && rel(rPlain.value, { a: 1, nest: { b: 2 } }), rPlain && !rPlain.threw ? 'relation' : 'no relation');
  const wNull = thrown(() => ns.write(inst, ['cr-null'], 'temp', nullProto));
  A(`${sc}.3`, '§1.4 item 4 (e); package.md §4.5 item 2 (the `Null` prototype class)', 'an `Object.create(null)` value is ACCEPTED and round-trips',
    !wNull.threw && rel(ns.read(inst, ['cr-null']), { a: 1 }), wNull.threw ? `refused ${statusOf(wNull)}` : 'accepted');
  const wArr = thrown(() => ns.write(inst, ['cr-arr'], 'temp', xArr));
  A(`${sc}.4`, 'crossing.md §1.2 row 5; §1.3 AddressArg row 13', 'a cross-realm ARRAY is ACCEPTED at a value position and round-trips in index order',
    !wArr.threw && rel(ns.read(inst, ['cr-arr']), [1, 2, 3]), wArr.threw ? `refused ${statusOf(wArr)}` : 'accepted');
  const addr = thrown(() => ns.write(inst, xArr, 'temp', 1));
  A(`${sc}.5`, '§1.3 AddressArg row 13 (a cross-realm array IS an address)', "a cross-realm array at the ADDRESS position is answered by the WALK's own code, never as a malformed SHAPE",
    addr.threw && statusOf(addr) === 'AddressNotFound', addr.threw ? statusOf(addr) : 'accepted silently');
  const wClass = thrown(() => ns.write(inst, ['cr-class'], 'temp', xClass));
  A(`${sc}.6`, '§1.4 item 4 (f); §1.2 row 4 (f)', 'a cross-realm CLASS instance is REFUSED — the class decision is realm-agnostic too',
    wClass.threw && statusOf(wClass) === 'ValueNotAdmitted', statusOf(wClass));
  A(`${sc}.7`, '§1.2 row 4 (the control)', 'a same-realm plain object is still accepted beside them',
    !thrown(() => ns.write(inst, ['cr-same'], 'temp', { a: 1 })).threw, 'accepted');
  end(sc, `cross-realm plain object ${wPlain.threw ? 'REFUSED' : 'ACCEPTED and round-tripped'}; Object.create(null) ${wNull.threw ? 'REFUSED' : 'ACCEPTED'}; cross-realm array ${wArr.threw ? 'REFUSED' : 'ACCEPTED'}; cross-realm class instance ${statusOf(wClass)}; a cross-realm array as an address answered ${statusOf(addr)}`);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-11 — THE UNCLAIMED REALMS, MEASURED LIVE: DOES THE PACKAGE EXPOSE AN ENTRY FOR ANY `HO-` ROW?
// (`acceptance.md §4.1` item 5: *one test per `HO-` row — the last asserting only that the package EXPOSES
// NO entry for that realm*. The realms themselves are not present in this repository; the EXPOSURE is.
// This measures the exposure live, at the manifest and at a real CJS resolver.)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-11';
  const pkgDir = path.resolve(HERE, '..');
  const manifest = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));
  const ex = manifest.exports || {};
  const dot = ex['.'] || {};
  start(sc, `a consumer asks, live, whether the shipped manifest exposes an entry for any unclaimed realm (HO-1 … HO-7), and a real CJS resolver is asked the same question`);
  A(`${sc}.1`, 'package.md §1.3 item 1; DD-24; §3.2 HO-1', 'the `exports[\'.\']` arms carry NO `require` arm — no CJS entry is published',
    !Object.prototype.hasOwnProperty.call(dot, 'require'), Object.keys(dot).join(','));
  A(`${sc}.2`, 'package.md §1.3 items 1-2; DD-24; §3.2 HO-1', 'the manifest carries NO `main` field — no second, arms-bearing CJS entry',
    !Object.prototype.hasOwnProperty.call(manifest, 'main'), String(manifest.main));
  A(`${sc}.3`, 'package.md §2; §3.2 HO-4/HO-5/HO-6', 'no realm-specific field or export key (browser / worker / electron) is declared',
    !['browser', 'worker', 'electron'].some((k) => Object.prototype.hasOwnProperty.call(manifest, k))
      && !Object.keys(ex).some((k) => /browser|worker|electron/i.test(k)), Object.keys(ex).join(','));
  A(`${sc}.4`, 'package.md §1.2 items 1-3; DD-4; §3.2 HO-2/HO-3/HO-4', 'no export key names the addon artifact — no realm reaches the `.node` as an entry',
    !Object.keys(ex).some((k) => k.includes('.node')) && !JSON.stringify(ex).includes('.node'), JSON.stringify(ex));
  const req = createRequire(import.meta.url);
  const cjsDir = thrown(() => req(pkgDir));
  A(`${sc}.5`, "package.md §3.2 HO-1 (*the package publishes NO CJS arm and NO require entry*)",
    "a real CJS `require` of the package DIRECTORY is refused by the resolver — HO-1's non-exposure, measured in a CJS resolver",
    cjsDir.threw && cjsDir.err.code === 'MODULE_NOT_FOUND', cjsDir.threw ? `${cjsDir.err.code}` : 'the resolver returned a module');
  const cjsEntry = thrown(() => req(path.join(pkgDir, 'index.mjs')));
  A(`${sc}.6`, "package.md §3.2 HO-1 (*a CJS consumer is served by the consumer's own ESM interop*)",
    "`require()` of the ESM entry succeeds through NODE'S OWN `require(esm)` interop and yields the same eight verbs — the consumer's side, not a second published arm",
    !cjsEntry.threw && Object.keys(cjsEntry.value).sort().join(',') === 'delete,listen,read,readLiteral,rollback,storeCreate,unlisten,write',
    cjsEntry.threw ? `${cjsEntry.err.code}` : Object.keys(cjsEntry.value).sort().join(','));
  end(sc, `the manifest exposes ${JSON.stringify(ex)} and no \`main\`, no \`browser\`, no worker key and no \`.node\` subpath; a CJS \`require\` of the directory answers ${cjsDir.threw ? cjsDir.err.code : 'a module'}, while \`require()\` of the ESM entry resolves through Node's own interop (${cjsEntry.threw ? cjsEntry.err.code : 'the eight verbs'})`);
}


// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-12 — THE FILE-TIER DELETE'S DECLARED READING: NO FILE I/O, SO THE REMOVED VERSION STANDS AGAIN
// (`bindings/js/README.md`: *"A `delete` and a `rollback` perform no file I/O, so a consumer that deletes a
// `file`-tier version and then constructs a fresh instance over an equal `filePath` sees the removed
// version STAND AGAIN — that re-boot is the store's own declared boot and not a defect."*)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
{
  const sc = 'LIVE-12';
  const dir = fsPath('live12');
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'state.json');
  const cfg = { filePath, journalLength: 4, listeners: [] };
  const inst = ns.storeCreate(cfg);
  start(sc, `a caller writes at ['dd'] at the file tier, deletes the file-tier version, and then boots a FRESH instance over the SAME '${filePath}'`);
  ns.write(inst, ['dd'], 'file', 'durable-dd');
  const del = ns.delete(inst, ['dd'], 'file');
  A(`${sc}.1`, 'store §4.4 D-1; store §4.3', 'the file-tier delete succeeds and names that tier in its receipt',
    Array.isArray(del.tiers) && del.tiers.length === 1 && del.tiers[0] === 'file', JSON.stringify(del.tiers));
  const gone = thrown(() => ns.read(inst, ['dd']));
  A(`${sc}.2`, 'store §4.3', 'in the SAME instance the address no longer resolves', gone.threw && statusOf(gone) === 'AddressNotFound', statusOf(gone));
  const fresh = ns.storeCreate(cfg);
  const back = thrown(() => ns.read(fresh, ['dd']));
  A(`${sc}.3`, "the README's file-behaviour reading; store §7.2 item 6 (a delete and a rollback perform no file I/O)",
    'the booted instance sees the removed version STAND AGAIN — the store\'s own declared boot, not a defect',
    !back.threw && back.value === 'durable-dd', back.threw ? statusOf(back) : String(back.value));
  end(sc, `the file-tier delete answered tiers ${JSON.stringify(del.tiers)} and ['dd'] answered ${statusOf(gone)} in that instance, while the booted instance read the removed version back as ${back.threw ? statusOf(back) : JSON.stringify(back.value)} — the declared non-durability of the delete`);
}


// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE LIVE RUN'S OWN REPORT
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
console.log('');
console.log('── THE LIVE SCENARIOS, EACH WITH ITS START POINT AND ITS FINAL RESOLVED STATE ─────');
for (const [sc, rec] of perScenario) {
  console.log(`${sc}: ${rec.pass} PASS · ${rec.fail} FAIL   (${rec.pass + rec.fail} assertions)`);
  console.log(`   START: ${rec.start}`);
  console.log(`   END:   ${rec.end}`);
}
console.log('────────────────────────────────────────────────────────────────────────────────────');
console.log(`AUTHORED ${authored} · EXECUTED ${executed} · PASS ${pass} · FAIL ${fail}`);
console.log('LAYER: LIVE / ASSEMBLED PACKAGE (real artifact, real process, real file I/O, real caller) — APP layer NONE, no APP-green claimed');
if (fail > 0) {
  console.log('');
  console.log('EVERY FAIL, ONE LINE EACH (scenario · expected-from-the-docs · observed · clause):');
  for (const f of fails) console.log(`  ${f.id} :: ${f.expectation} :: ${f.observed} :: [${f.clause}]`);
}
try { fs.rmSync(ROOT, { recursive: true, force: true }); } catch { /* the scratch is left for inspection */ }
process.exit(fail > 0 ? 1 : 0);
