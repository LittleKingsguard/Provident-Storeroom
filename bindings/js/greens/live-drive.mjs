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
// AND (added 2026-10-11 by the `Q1` contract amendment, this driver's own `Q6` cell) it drives the package's
// TWO NEW INSTANCE MEMBERS END TO END: `on(address, listener) -> handle` and `off(handle) -> undefined`
// (`docs/specs/storeroom-js/surface.md` `§2.1`'s dated clause (a) and `§2.4` item 7) — the fresh arm, the
// held-address arm, the atomicity arm, `off`'s two removals against `unlisten`'s one, and the
// instance-scoped registry across a fresh boot (`LIVE-13`).
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
// ── ⟶ RE-DERIVED 2026-10-17 (THE FAILURE-FORM OVERRIDE, THIS FILE'S LAST CELL): THE FIXED TWO-MEMBER FORM
// IS SUPERSEDED AND THE HELPER NOW ASSERTS THE DECLARED THREE-MEMBER FORM AT ITS OWN BYTES.
// `docs/specs/storeroom-js/surface.md §2.5` ITEM 9: *"`log` stands on the thrown object as an ORDINARY OWN
// ENUMERABLE DATA MEMBER of the same plain object that carries `status` and `message` … so `Object.keys(caught)`
// reads exactly `["log","message","status"]` and `Object.keys(caught).length` is `3` on EVERY arm of this
// surface"* — and *"`log` is NEVER ABSENT, NEVER `null` and NEVER a non-array"*. ITEM 4: *"`log` IS PRESENT ON
// EVERY FAILURE THIS SURFACE THROWS, AND `[]` IS ITS DECLARED VALUE WHERE THE FAILURE'S CAUSE HAS NO ATTEMPT AT
// ALL … The three-member member set is therefore FLAT ACROSS ARMS and not conditional."*
// EVERY OTHER LIMB THE SUPERSEDED HELPER ASSERTED IS KEPT: the plain-`Object.prototype` prototype test, the
// non-empty `string` status, the non-empty `string` message, and the own-property-set test (now at length 3).
//
// THE THIRD MEMBER'S VALUE IS **NOT** UNIFORMLY `[]`, AND THIS HELPER DOES NOT FORCE IT TO BE (item 4's second
// half: *"while every failure whose attempt exists carries that attempt's own entries"*). The two classes of arm
// are treated by the SAME helper and told apart by WHERE THE HELPER IS APPLIED, not by weakening a limb:
//   • ATTEMPT-LESS arms — the construction's own `cfg`-side refusals, a `read`/`readLiteral`/`delete`/`rollback`
//     store refusal with no attempt live, `a.register`'s `TypeError`, and the three constraint methods'
//     `TypeError` — carry `log: []`. EVERY call site of THIS driver is such an arm (measured, see below), and
//     those sites assert emptiness EXPLICITLY through `isAttemptLessForm(e)` below.
//   • ATTEMPT-BEARING arms — every failure whose attempt exists — carry that attempt's own entries. `isSingleForm`
//     asserts only that `log` is an ARRAY (item 9's own limb), never that it is empty, so an attempt-bearing
//     failure is NOT rejected by the member-set test. A cell that drives such an arm asserts its entries itself.
// MEASURED STATE OF THIS FILE (all 13 call sites, 2026-10-17): not one of them drives an attempt-bearing arm and
// not one of them drives a constraint-method `TypeError` — this driver constructs no `cfg.constraints`, and every
// refusal it catches carries `log: []`. The `TypeError` SHAPE is a DIFFERENT one and is NOT asserted here: the
// three constraint methods' `TypeError` carries `log: []` and NO `status` (`Object.keys === ["log"]`, length `1`),
// so `isSingleForm` would REJECT it BY DESIGN — correctly, because it is not this surface's store-refusal form;
// and the FIFTH-POSITION `write` `TypeError` carries no `log` at all, so item 4's enumeration does not cover it
// and the form is NOT uniform. No cell of this driver applies this helper to either.
function isSingleForm(e) {
  if (e === null || typeof e !== 'object' || e instanceof Error) return false;
  if (Object.getPrototypeOf(e) !== Object.prototype) return false;
  const k = Object.getOwnPropertyNames(e).sort().join(',');
  return k === 'log,message,status' && typeof e.status === 'string' && e.status.length > 0
    && typeof e.message === 'string' && e.message.length > 0
    && Array.isArray(e.log);
}
// THE ATTEMPT-LESS SUB-CLASS, NAMED SO THE DISTINCTION IS ASSERTED AND NOT MERELY RECORDED: item 4's first half.
// `log` is the EMPTY ARRAY — never an absent member, never `null`, never a placeholder entry.
function isAttemptLessForm(e) {
  return isSingleForm(e) && e.log.length === 0;
}
function statusOf(r) { return r.threw ? (r.err && r.err.status) : 'ok'; }
function fsPath(name) { return path.join(ROOT, name); }

const V = { name: 'alpha', flag: true, count: 3, ratio: 0.5, nest: { z: 1, arr: [1, 2, 3] }, list: ['p', { q: false }], '10': 'ten', '2': 'two' };

// ── ⟶ ADDED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): THE `file` TIER'S SAVE
// REACHED ON THE ONE ROUTE THE AMENDED LAW LEAVES IT, exactly as the `ENVELOPE/PURE` set's `JSG-02.10`–`.16`
// already drive it. `docs/specs/storeroom-js/surface.md §2.11` clause 2: *"ON THE PASSING ARM … AND FOR A
// RECORD WHOSE OWN `op` CARRIES A `file`-TIER WRITE, THE TERMINAL ARM PERFORMS THE STORE'S `commit_file` ACT AS
// ITS OWN STEP"*, and clause 1's *"the verb performs NO FILE I/O on any of its arms"* — so a boot that
// re-loads a committed value must follow a `K-2` `commit` + `K-3` `runAttempt`, NOT a bare `write`. The kernel
// is the module `docs/specs/storeroom-constraints/kernel-surface.md §1` item 1 declares and its call shapes are
// `§2.1` items 2–3's (`K-2 commit(store, address, tier, value)`, `K-3 runAttempt(store, commit)`), the store
// being the caller's own instance from `§1` item 5. Imported as DATA (its call shapes are the doc's), never
// read as source; where it does not resolve, each re-pointed cell says so instead of driving.
let kernelLive = null, KERNEL_LIVE_ERROR = null;
try { kernelLive = await import('../src/constraint-kernel.mjs'); } catch (e) { KERNEL_LIVE_ERROR = e; }
function kernelSaveFileLive(store, address, value) {
  if (kernelLive === null) return { threw: true, err: `KERNEL ABSENT: ${String(KERNEL_LIVE_ERROR && KERNEL_LIVE_ERROR.message)}` };
  const rec = thrown(() => kernelLive.commit(store, address, 'file', value));
  if (rec.threw) return rec;
  return thrown(() => kernelLive.runAttempt(store, rec.value));
}

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
  // ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): **STALE GREENS DOC**,
  // `RCA-8(g)`. `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause of 2026-10-16 gives the module
  // namespace ONE name, `storeCreate`, `11 → 1` ✓; the ten store-reaching names move onto the PRODUCT as
  // methods, with no deprecation window (`§2.9`'s removal-versus-deprecation clause of that date). The cell's
  // subject (the claimed ESM entry resolves and its declaration is exactly the declared set) is KEPT and
  // asserted by EXACT set equality; only the figure is re-derived.
  A(`${sc}.1`, 'package.md §1.1; §3.1; §2.9 item 1\'s `A127` clause (the namespace is ONE name, `11 → 1`)',
    'the claimed ESM entry resolves and its namespace carries exactly its one remaining name, `storeCreate`',
    Object.keys(ns).sort().join(',') === 'storeCreate', Object.keys(ns).sort().join(','));
  const cfg = { filePath, journalLength: 4, listeners: [] };
  const c = thrown(() => ns.storeCreate(cfg));
  A(`${sc}.2`, '§2.1', 'storeCreate returns a non-null object and does not throw', !c.threw && c.value !== null && typeof c.value === 'object', c.threw ? `threw ${JSON.stringify(c.err)}` : String(c.value));
  const inst = c.threw ? null : c.value;
  // ⟶ RE-DERIVED 2026-10-17 (THIS PASS): **STALE GREENS DOC**, `RCA-8(g)`. The three-member figure is the `A79`
  // reading and the four-member `{ register, on, off, settle }` is the `A116` one; `A127` moves the declared
  // member set `7 → 12` — `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause of 2026-10-16:
  // *"TWELVE OWN MEMBERS, AND NOTHING ELSE: `10 + 1 + 1 = 12` ✓"*, *"`on` and `off` ARE MERGED AWAY AND ARE NOT
  // MEMBERS"*. THE CELL'S SUBJECT IS KEPT WHOLE — the product's exact own member set, asserted by set equality
  // and nothing else — and the expected value alone is re-derived.
  // ── **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE SET MOVES `13 → 12`, `10 + 1 + 1 = 12` ✓**, on the
  // architect's ruling VERBATIM *"Settle is redundant because the kernel is always in the loop."*
  // (`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s clause of that date, whose item `1` names BOTH
  // remaining singles, read with `§2.12` item 2-bis and item 9's `REMOVED-WHOLE` pointer over `settle`).
  // **THE CELL'S SUBJECT IS KEPT WHOLE — the product's exact own member set, by set
  // equality and nothing else — and the expected value alone is re-derived**, exactly as this cell's own
  // `7 → 12` clause above did.
  A(`${sc}.3`, '§2.4 item 9 (f)\'s clause of 2026-10-18 (TWELVE own members, `10 + 1 + 1 = 12`, `13 → 12`, whose two singles are `register` and `constraints`)',
    "the store's own member set is exactly the TWELVE declared members ['addConstraint','constraintOff','constraintOn','constraints','delete','listen','read','readLiteral','register','rollback','unlisten','write'] — and NOTHING ELSE (the superseded readings were three, four, five, seven, twelve and thirteen)",
    inst !== null && Object.getOwnPropertyNames(inst).sort().join(',') === 'addConstraint,constraintOff,constraintOn,constraints,delete,listen,read,readLiteral,register,rollback,unlisten,write',
    inst ? Object.getOwnPropertyNames(inst).sort().join(',') : 'no instance');
  A(`${sc}.4`, '§1.3 FilePathArg row 1', "the caller's filePath is a REAL path: its parent directory exists on disk",
    fs.existsSync(path.dirname(filePath)) && fs.statSync(path.dirname(filePath)).isDirectory(), path.dirname(filePath));
  A(`${sc}.5`, 'the declared build step (bindings/js/README.md)', 'the addon artifact is present at the declared path with non-zero size',
    fs.existsSync(ADDON) && addonStat.size > 0, fs.existsSync(ADDON) ? `${addonStat.size} bytes` : 'ABSENT');
  end(sc, `an instance stands over the file register '${path.basename(path.dirname(filePath))}/state.json'; own members ${inst ? Object.getOwnPropertyNames(inst).sort().join(',') : 'n/a'}; the artifact ${addonStat.size} bytes sha256 ${addonSha.slice(0, 12)}…`);
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
  inst.write(['ev'], 'temp', {});
  const h = inst.listen(['ev']);
  A(`${sc}.1`, '§2.3 item 2; DD-14', "listen returns the package's opaque value: typeof 'object', not a string, and it spells no token",
    typeof h === 'object' && typeof h !== 'string' && !JSON.stringify(h).includes('listener-'), `${typeof h} ${JSON.stringify(h)}`);
  // DRIVING CORRECTION D-1 (the gate-5 correction, honoured here): `register(handle, listener)` is the
  // INSTANCE's own one member (`§2.4` item 5 (a)) and NOT a module-level verb of the entry.
  A(`${sc}.2`, '§2.4 item 5 (b)', 'register(handle, fn) answers undefined on success', inst.register(h, () => {}) === undefined, 'undefined');
  const calls = [];
  const fn = function (...args) { calls.push(args); };
  inst.register(h, fn);
  const w = inst.write(['ev', 'child'], 'temp', { n: 1 });
  A(`${sc}.3`, '§2.7 item 1; A77', "the returned record's triggered carries the id REGISTRATION was given",
    Array.isArray(w.triggered) && w.triggered.includes(h), JSON.stringify(w.triggered?.length));
  A(`${sc}.4`, '§2.4 rule 3', 'the registered function runs exactly once', calls.length === 1, `${calls.length} invocations`);
  A(`${sc}.5`, '§2.7 item 5', "the invocation carries exactly ONE argument", calls[0] && calls[0].length === 1, `${calls[0] ? calls[0].length : 'n/a'}`);
  A(`${sc}.6`, '§2.7 item 5; parameter-semantics.md §2.12', "that argument is the TRIGGERING ADDRESS ['ev','child'] and not the id",
    calls[0] && rel(calls[0][0], ['ev', 'child']) && calls[0][0] !== h, calls[0] ? JSON.stringify(calls[0][0]) : 'n/a');
  A(`${sc}.7`, '§2.2; store §3.6', "the write's returned record carries a real opId the caller sees",
    typeof w.op === 'object' && typeof w.op.opId === 'string' && w.op.opId.length > 0, String(w.op?.opId));
  const h2 = inst.listen(['ev']);
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
  const w = inst.write(['store1'], 'file', V);
  A(`${sc}.1`, '§2.2; store §3.6', "the write's returned record's own member set is exactly {op, watched, triggered}",
    Object.keys(w).sort().join(',') === 'op,triggered,watched', Object.keys(w).sort().join(','));
  A(`${sc}.2`, '§2.2; store §6.2', "the op carries tier 'file' and its after value EQ V under §1.5",
    w.op.tier === 'file' && w.op.after.present === true && rel(w.op.after.value, V), `tier=${w.op.tier} after.present=${w.op.after?.present}`);
  const r = inst.read(['store1']);
  A(`${sc}.3`, '§4.3; §1.5', 'read answers V EQUAL under §1.5 (member-SET, array index order, Object.is)', rel(r, V), 'relation');
  A(`${sc}.4`, '§1.1 item 2', 'the read is a FRESH JS-owned value, not the object the caller passed', r !== V && r.nest !== V.nest, r === V ? 'identical' : 'fresh');
  const rt = inst.read(['store1'], 'file');
  A(`${sc}.5`, '§2.2; store §4.2 R-4', 'the tier-qualified read answers the file version', rel(rt, V), 'relation');
  const w2 = inst.write(['store1'], 'temp', 2);
  A(`${sc}.6`, 'store §5.3 item 2; A11', 'the less persistent write IS the shadowing one and the unqualified read selects it',
    inst.read(['store1']) === 2, String(inst.read(['store1'])));
  const d = inst.delete(['store1'], 'temp');
  A(`${sc}.7`, 'store §4.4 D-1; §4.3', "the delete receipt names exactly ['temp'] and its own member set is {address, tiers, triggered}",
    Array.isArray(d.tiers) && d.tiers.join(',') === 'temp' && Object.keys(d).sort().join(',') === 'address,tiers,triggered', `tiers=${JSON.stringify(d.tiers)}`);
  A(`${sc}.8`, 'store §4.2 R-4', 'the file version STANDS after the temp version is removed', rel(inst.read(['store1']), V), 'relation');
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
  start(sc, `a caller writes V at ['durable'] at the file tier THROUGH THE TERMINAL ARM (\`K-2\` + \`K-3\`, \`surface.md §2.11\` clause 2) over '${filePath}', writes a mem-tier value beside it, then constructs a FRESH instance over the SAME cfg`);
  // ⟶ RE-DERIVED 2026-10-17 (THE GATE-5 BLIND-GREENS PASS, `role_blind_test_writer`): **STALE GREENS DOC**,
  // `RCA-8(g)`. The as-filed drive issued the `file`-tier write AT THE VERB and expected the file to carry it,
  // which CONTRADICTS `docs/specs/storeroom-js/surface.md §2.11` clause 1 — the sentence that killed item 8's
  // instant — *"the verb performs NO FILE I/O on any of its arms"* — and clause 2, which moves the store's
  // `commit_file` act onto the TERMINAL ARM of the passing attempt, *"THE FIRST THING THAT ARM DOES"*. The
  // cells' SUBJECTS (a real file at the caller's path; the boot re-loads the committed value; the read is
  // fresh; the whole register carries the key) are KEPT WHOLE and only THE ROUTE that reaches the state moves,
  // exactly as the `ENVELOPE/PURE` set's `JSG-02.10`–`.16` were re-pointed. The write verb's own no-file-I/O
  // reading is asserted AS ITS OWN OBSERVABLE, so the re-point is not a silent substitution.
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE WORDING "bare" IS RETIRED AND THE OBSERVABLE IS
  // UNMOVED.** No write is bare any more (`§2.4` item 9 (e) is `SUPERSEDED-WHOLE` on `RCA-9`; `§2.12` item 1's
  // clause of 2026-10-18 removes the gate so the four-position call enters `K-2` at EVERY address). **THE CELL'S
  // SUBJECT — the WRITE VERB performs no file commit on any of its arms, the act being `§2.11` clause 2's
  // terminal-arm step and nothing else — STANDS WHOLE and is asserted unchanged**; only the route by which the
  // write now reaches its delivery has moved, and no clause makes the file save that route's business.
  const wBare = thrown(() => A_.write(['bare-not-saved'], 'file', 'BARE'));
  A(`${sc}.8`, 'surface.md §2.11 clause 1 ("the verb performs NO FILE I/O on any of its arms"), read with §2.12 item 1\'s amended clause of 2026-10-18 (the write enters `K-2` at EVERY address, so the no-save reading is the ARM\'s and not the route\'s)',
    'the write VERB performs NO file commit: the write succeeds and the address does NOT resolve after a fresh boot — the save being §2.11 clause 2\'s terminal-arm act, which this call does not reach',
    !wBare.threw && (() => { const bb = thrown(() => ns.storeCreate(cfg).read(['bare-not-saved'])); return bb.threw && statusOf(bb) === 'AddressNotFound'; })(),
    wBare.threw ? `threw ${statusOf(wBare)}` : 'the write answered; its boot resolve is asserted above');
  const saved = kernelSaveFileLive(A_, ['durable'], V);
  A(`${sc}.9`, 'surface.md §2.11 clause 2 (`K-2` `commit` + `K-3` `runAttempt`; kernel-surface.md §2.1 items 2-3)',
    'the file-tier save on the TERMINAL ARM succeeds (no throw), so the state the boot below re-loads is the arm\'s own act',
    !saved.threw, saved.threw ? `threw ${statusOf(saved)}` : 'the passing arm performed the save');
  A(`${sc}.1`, 'store §7.2 item 5; the README\'s file-behaviour reading', 'the store wrote a REAL file at the caller-spelled path',
    fs.existsSync(filePath), fs.existsSync(filePath) ? 'file exists' : 'ABSENT');
  const st = fs.existsSync(filePath) ? fs.statSync(filePath) : { size: 0 };
  A(`${sc}.2`, 'store §7.2 item 5 (existence and size ONLY; DD-5 forbids a JS-side byte/spelling read)',
    'the file carries bytes', st.size > 0, `${st.size} bytes`);
  A_.write(['memonly'], 'mem', 7);
  const B = ns.storeCreate(cfg);
  A(`${sc}.3`, 'store §7.2 item 6', 'a FRESH instance over the same path returns an instance (the boot runs)',
    B !== null && typeof B === 'object' && B !== A_, 'instance');
  const rb = thrown(() => B.read(['durable']));
  A(`${sc}.4`, '§4.3; store §7.2 item 6', 'the booted instance RE-LOADS the committed value: B.read([\'durable\']) EQ V under §1.5',
    !rb.threw && rel(rb.value, V), rb.threw ? `threw ${statusOf(rb)}` : 'relation');
  A(`${sc}.5`, '§1.1; §2.2', 'the booted read is a FRESH object and not a shared reference', !rb.threw && rb.value !== V && rb.value.nest !== V.nest, rb.threw ? `threw ${statusOf(rb)}` : 'fresh');
  const whole = B.read([]);
  A(`${sc}.6`, 'store §4.1 R-5; A25', "the empty address answers the WHOLE register and it contains 'durable'",
    whole !== null && typeof whole === 'object' && Object.prototype.hasOwnProperty.call(whole, 'durable'), Object.keys(whole || {}).join(','));
  const memAfterBoot = thrown(() => B.read(['memonly']));
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
  // ⟶ RE-DERIVED 2026-10-17 (THIS PASS): **STALE GREENS DOC**, `RCA-8(g)`. The as-filed drive issued the
  // `file`-tier write AT THE VERB; `surface.md §2.11` clause 1 says *"the verb performs NO FILE I/O on any of
  // its arms"* and clause 2 puts the save on the TERMINAL ARM. The cell's SUBJECT (a real process boundary
  // re-loading the parent's durable value) is KEPT and the route moves to `K-2` + `K-3`, the same re-point the
  // `ENVELOPE/PURE` set's `JSG-02.10` took. The parent's own write still runs — it is what mints the op the
  // attempt commits — and the SAVE is the arm's.
  const w = inst.write(['crossproc-seed'], 'file', 'SEED');
  const savedChild = kernelSaveFileLive(inst, ['crossproc'], PARENT_V);
  const childFile = path.join(dir, 'boot-child.mjs');
  fs.writeFileSync(childFile, `
import { storeCreate } from ${JSON.stringify(ENTRY)};
const i = storeCreate({ filePath: ${JSON.stringify(filePath)}, journalLength: 4, listeners: [] });
console.log(JSON.stringify({ pid: process.pid, value: i.read(${JSON.stringify(['crossproc'])}), whole: Object.keys(i.read([])) }));
`);
  start(sc, `the PARENT (pid ${process.pid}) puts the value at ['crossproc'] at the file tier THROUGH THE TERMINAL ARM (${savedChild.threw ? `the arm threw ${statusOf(savedChild)}` : 'the save landed'}) and a SEPARATE, freshly spawned Node process boots the same filePath through the same claimed entry`);
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
  const w = inst.write(['rolled'], 'mem', { k: 1 });
  start(sc, `a caller takes the opId the write returned (${String(w.op.opId)}) and calls rollback(inst, that id)`);
  const rb = inst.rollback(w.op.opId);
  A(`${sc}.1`, 'store §6.3', "the rollback record's own member set is exactly {opId, undoneOps, restoredTo}",
    Object.keys(rb).sort().join(',') === 'opId,restoredTo,undoneOps', Object.keys(rb).sort().join(','));
  A(`${sc}.2`, 'store §6.3', 'the id the caller passed is ECHOED', rb.opId === w.op.opId, String(rb.opId));
  A(`${sc}.3`, 'store §6.3; §6.4 M-7', "undoneOps contains the op whose reversal the store performed",
    Array.isArray(rb.undoneOps) && rb.undoneOps.includes(w.op.opId), JSON.stringify(rb.undoneOps));
  A(`${sc}.4`, 'store §6.3; §6.4 M-5/M-8', 'restoredTo is the absent state {present: false}', rb.restoredTo && rb.restoredTo.present === false, JSON.stringify(rb.restoredTo));
  const after = thrown(() => inst.read(['rolled']));
  A(`${sc}.5`, 'store §6.4 M-8', 'the address no longer resolves: the write that installed it was undone',
    after.threw && statusOf(after) === 'AddressNotFound', statusOf(after));
  const bad = thrown(() => inst.rollback('no-such-op'));
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
  const b = thrown(() => inst.write(['v'], 'temp', 10n));
  A(`${sc}.1`, '§2.5 items 1-3; §1.2 row 10', 'the bigint is refused as ValueNotAdmitted in the ONE thrown form',
    b.threw && statusOf(b) === 'ValueNotAdmitted' && isSingleForm(b.err), statusOf(b));
  A(`${sc}.2`, "surface.md §2.5 item 6 (a); the gate-5 finding JSG-04.1.v", "the refusal's message carries the failing target's own spelling 10n",
    b.threw && typeof b.err.message === 'string' && b.err.message.includes('10n'), b.threw ? b.err.message : 'no throw');
  const c = thrown(() => inst.write(['v'], 'temp', new (class Foo {})()));
  A(`${sc}.3`, 'surface.md §2.5 item 6 (b); the gate-5 finding JSG-04.4.v', "the class refusal's message carries the class — 'prototype-carrying non-plain object'",
    c.threw && typeof c.err.message === 'string' && c.err.message.includes('prototype-carrying non-plain object'), c.threw ? c.err.message : 'no throw');
  const n = thrown(() => inst.read(['nothing-here']));
  A(`${sc}.4`, 'store §8.1 #2; §8.2 property (c)', 'an absent address is refused AddressNotFound with the store\'s own generated message, no placeholder',
    n.threw && statusOf(n) === 'AddressNotFound' && typeof n.err.message === 'string' && !/<[A-Za-z-]+>/.test(n.err.message), n.threw ? n.err.message : 'no throw');
  const all = [b, c, n];
  // ⟶ RE-DERIVED 2026-10-17 (THE FAILURE-FORM OVERRIDE, this driver's last cell). `role_spec_writer` /
  // `role_test_writer`: the text *"exactly {message, status}"* PINNED THE SUPERSEDED TWO-MEMBER FORM. Re-derived to
  // the declared three-member form AT ITS OWN CELL, at `docs/specs/storeroom-js/surface.md §2.5` ITEM 9 (the own
  // member set is EXACTLY `["log","message","status"]`, length `3`, `log` an ORDINARY OWN ENUMERABLE DATA MEMBER,
  // never absent, never `null`, never a non-array) and ITEM 4 (`log` PRESENT on every failure, `[]` where the cause
  // has NO attempt — the arm all three of these refusals sit on). The two limbs item 5 (e) owns are UNMOVED and are
  // still asserted: no raw host `Error`, and the one form. `isAttemptLessForm` adds item 4's emptiness for this
  // arm; the plain-`Object.prototype` prototype, non-empty-`string` status and non-empty-`string` message limbs
  // all stand inside `isSingleForm` unchanged. THE ID IS KEPT (`LIVE-7.5`), as the override requires.
  A(`${sc}.5`, 'surface.md §2.5 item 5 (e); §2.5 items 4 and 9 (the three-member set `["log","message","status"]`, FLAT ACROSS ARMS, `log` an ARRAY and `[]` on this no-attempt arm); A76',
    'not one refusal is a raw host Error, and every one is the ONE form: a plain object whose own member set is exactly {log, message, status} — length 3, `log` an ARRAY and `[]` here — with status and message both non-empty strings',
    all.every((x) => x.threw && isAttemptLessForm(x.err)),
    all.map((x) => (x.threw ? `${statusOf(x)}[${Object.keys(x.err).sort().join(',')}|log=${Array.isArray(x.err.log) ? `len ${x.err.log.length}` : typeof x.err.log}]` : 'no throw')).join(','));
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
    const r = thrown(() => inst.write(['v'], 'temp', make()));
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
//
// `.7` RE-DERIVED 2026-10-11: the subject is THE PATHS THAT WERE TRIED (`contract.md §1.5` item 6 ·
// `PUB-DD-26`, read with `resolution.md §5.3b`), so a COVERED key's drive — which THIS one is — names BOTH
// paths, rung one first, in the generator's own slots, joined by `', '`; the single-path expectation stands
// only for the UNCOVERED cell (`resolution.md §2.2`), where rung one is never attempted. `.1`–`.6` UNMOVED.
//
// AND `.7`'s ONE NAME MOVED 2026-10-11 ON THE `A86` SCOPE RULING — *"Change org to `@auspicion`"* — so the
// platform package this row names as rung one is `@auspicion/js-linux-x64-gnu` for the host's covered pair
// (`contract.md §1.3`'s reconciliation clause of 2026-10-11, `A86`(a); `PUB-DD-6`/`PUB-DD-15`). **THE ROW'S
// STATE AND ITS STRUCTURE ARE UNMOVED: only the NAME it prints has moved, and the as-filed spelling is
// re-emitted at the row itself.** `.1`–`.6`, rung two's path, the tried set, the join, the slot count and the
// byte-equality against the store's own generator are each UNMOVED.
//
// ── AND `.7`'s ONE NAME MOVED AGAIN 2026-10-11 ON THE `A88` PROJECT-TOKEN RULING — *"Change the platform
// package names to specify the project they are for, this organization will be used for multiple"* — so the
// platform package this row names as rung one is `@auspicion/provident-storeroom-js-linux-x64-gnu` for the
// host's covered pair (`docs/specs/storeroom-publish-proposal.md §14`'s `A88`(a), the ADDITIVE reading, read
// with `docs/decisions.md`'s dated `ACTIVE` pin). **THE CLAUSE ABOVE STANDS BYTE-FOR-BYTE, INCLUDING ITS
// `@auspicion/js-linux-x64-gnu` AND ITS `A86`(a) CITATION, AND IS READ THROUGH THIS ONE** (`RCA-8(d)`,
// ANNOTATE-BESIDE): **`A88` SUPERSEDES `A86`(a)'s SCOPE-ONLY READING AND ADOPTS `A86`(b)'s
// IDENTITY-PRESERVING FORM, with a reason the earlier pricing did not have — `@auspicion` is a
// MULTI-PROJECT ORG, so a platform name that carries only a language marker is AMBIGUOUS inside it, and THE
// NAME MUST NAME THE PROJECT.** **THE ROW'S STATE AND ITS STRUCTURE ARE STILL UNMOVED: the scope
// `@auspicion` stands, the project token is INSERTED BEFORE the language marker and no existing token is
// lost, and `.1`–`.6`, rung two's path, the tried set, the join, the slot count and the byte-equality
// against the store's own generator are each UNMOVED.**
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
  const ctrl = thrown(() => { const i = ns.storeCreate({ filePath: fsPath('live8/state.json'), journalLength: 1, listeners: [] }); i.write(['ctrl'], 'temp', 1); return i.read(['ctrl']); });
  A(`${sc}.6`, 'the positive control', 'at the same moment the REAL package (real addon) still constructs and round-trips — the arm measures ABSENCE and not a broken run',
    !ctrl.threw && ctrl.value === 1, ctrl.threw ? `threw ${statusOf(ctrl)}` : String(ctrl.value));
  // ── `LIVE-8.7`, RE-DERIVED 2026-10-11 BY THIS ROW'S OWN OWNER, ON THE CLAUSE THE SPEC PASS DECLARED
  // (`docs/specs/storeroom-publish/contract.md §1.5` item 6 clause (c) and its closing paragraph — the
  // supersession named with this cell and this role — read with `resolution.md §5.3` item 6 and `§5.3b`, and
  // with `contract.md §1.4` item 2; `PUB-DD-26`).
  //
  // **THE CLAUSE THAT GOVERNS IS THE BOTH-PATHS JOIN: the subject names EVERY SUBJECT THE LOAD PATH TRIED —
  // the separator is `', '`, the order is RUNG ONE FIRST and RUNG TWO SECOND, and EACH PATH IS KEPT INSIDE
  // THE GENERATOR'S OWN `'<subject>'` SLOT, so the clause's own pair stands around the join.**
  //
  // **THE STATE THIS DRIVE IS IN, STATED SO THE EXPECTATION IS ITS OWN STATE'S:** the copy's key is the
  // HOST's pair — `linux`·`x64` — which is one of `§1.1` item 6's FIVE COVERED PAIRS, so RUNG ONE IS
  // ATTEMPTED (its one declared name is `require`d from the copy, and the `require` MISSES because nothing of
  // that name is installed) and then RUNG TWO IS ATTEMPTED and misses. **BOTH RUNGS WERE TRIED, SO THE
  // SUBJECT IS BOTH PATHS.** The expectation this cell carried before — the rung-two path ALONE as an exact
  // string — is `resolution.md §2.2`'s UNCOVERED-key cell, where rung one is NEVER attempted and has no path
  // to report, and it is SUPERSEDED as that reading for a COVERED drive; `LIVE-8.1`–`.6` are NOT touched.
  //
  // **THE FIVE DECLARED SPELLINGS ARE READ FROM THEIR OWN HOME** (`contract.md §1.3` item 6 · `PUB-DD-15`,
  // the `A82`/`A84` decision: scope `@provident-storeroom`, label `js-<target>-<arch>[-<toolchain>]`), so the
  // entry's own table is compared at this cell against the DECLARED five — a sixth name, a dropped scope or a
  // dropped toolchain suffix is a FINDING here — **and rung two's own path is the copy's module-relative
  // artefact, which this caller knows independently of the message.**
  //
  // ── THE SCOPE MOVED, AND THE FIVE LINES ABOVE ARE RE-EMITTED VERBATIM AND READ THROUGH THIS CLAUSE
  // (`RCA-8(d)`, ANNOTATE-BESIDE; 2026-10-11). **THE ARCHITECT RULED *"Change org to `@auspicion`"* — `A86`(a),
  // the literal reading, declared at `docs/specs/storeroom-publish/contract.md §1.3`'s reconciliation clause
  // (*"THE FIVE NAMES BECOME, CHARACTER FOR CHARACTER"* the five of `resolution.md §3.1`) — so THE SCOPE
  // SEGMENT ALONE IS REPLACED and the second segment `js-<target>-<arch>[-<toolchain>]` is UNMOVED**
  // (`PUB-DD-6`; `PUB-DD-15`). **THE OPERATIVE FIVE ARE READ FROM THE CONTRACT'S OWN FIVE-NAME CLAUSE AND NOT
  // FROM THE IMPLEMENTATION: `@auspicion/js-linux-x64-gnu` · `@auspicion/js-linux-arm64-gnu` ·
  // `@auspicion/js-darwin-x64` · `@auspicion/js-darwin-arm64` · `@auspicion/js-win32-x64-msvc` — so the host's
  // covered pair `linux`·`x64` names `@auspicion/js-linux-x64-gnu`, WHICH IS THE PLATFORM PACKAGE THE ENTRY
  // `require`s TODAY** (read BESIDE `bindings/js/index.mjs`'s `PLATFORM_NAMES` and `bindings/js/package.json`'s
  // five `optionalDependencies` keys, never instead of this driver's own table — `acceptance.md §4.1` item 1).
  // **AND THE OLD SCOPE IS NOW THE FINDING RATHER THAN THE ACCEPTED SPELLING: the clause's `S-SCOPE` failure
  // list gains the member *"a name whose scope IS `@provident-storeroom`"* BESIDE the as-filed *"a name whose
  // scope is not `@provident-storeroom`"*, which is KEPT AND RE-READ as a refusal of the OLD scope.**
  // **EVERY OTHER CONJUNCT OF THIS ROW IS UNMOVED: the TRIED set built from the declaration, the rendering's
  // bytes, the slot count, the byte-equality against the store's own generator, rung two's path, and the
  // clause standing after.**
  //
  // ── AND THE SCOPE-ONLY READING IS ITSELF SUPERSEDED, 2026-10-11, BY THE PROJECT-TOKEN RULING — `A88`
  // (`docs/specs/storeroom-publish-proposal.md §14`'s `A88`(a), the ADDITIVE reading, read with
  // `docs/decisions.md`'s dated `ACTIVE` pin). **THE WHOLE CLAUSE ABOVE — ITS `A82`/`A84` PARENTHETICAL, ITS
  // `@auspicion/js-…` FIVE AND ITS `A86`(a) CITATION — STANDS BYTE-FOR-BYTE AND IS READ THROUGH THIS ONE**
  // (`RCA-8(d)`, ANNOTATE-BESIDE). **`A88` SUPERSEDES `A86`(a)'s SCOPE-ONLY READING AND ADOPTS `A86`(b)'s
  // IDENTITY-PRESERVING FORM, with a reason the earlier pricing did not have: `@auspicion` is a
  // MULTI-PROJECT ORG, so a platform name carrying only a language marker is AMBIGUOUS inside it — THE NAME
  // MUST NAME THE PROJECT.** **THE OPERATIVE READING IS `A88`(a), THE ADDITIVE ONE, because it is the least
  // destructive edit that satisfies the requirement and loses no existing token: THE PROJECT TOKEN IS
  // INSERTED BEFORE THE LANGUAGE MARKER, so THE OPERATIVE FIVE BECOME, CHARACTER FOR CHARACTER —
  // `@auspicion/provident-storeroom-js-linux-x64-gnu` · `@auspicion/provident-storeroom-js-linux-arm64-gnu` ·
  // `@auspicion/provident-storeroom-js-darwin-x64` · `@auspicion/provident-storeroom-js-darwin-arm64` ·
  // `@auspicion/provident-storeroom-js-win32-x64-msvc` — so the host's covered pair `linux`·`x64` names
  // `@auspicion/provident-storeroom-js-linux-x64-gnu`, WHICH IS THE PLATFORM PACKAGE THE ENTRY `require`s
  // TODAY** (read BESIDE `bindings/js/index.mjs`'s `PLATFORM_NAMES`, `bindings/js/package.json`'s five
  // `optionalDependencies` keys and the five `bindings/js/platforms/<label>/package.json` `name` fields, never
  // instead of this driver's own table — `acceptance.md §4.1` item 1).
  //
  // **THE SPELLING THIS CELL CARRIED BETWEEN THE TWO RULINGS IS RE-EMITTED VERBATIM IN THE TABLE BELOW SO NO
  // BYTE IS DELETED AND A DIFF HAS NOTHING TO RECOVER: `@auspicion/js-linux-x64-gnu` ·
  // `@auspicion/js-linux-arm64-gnu` · `@auspicion/js-darwin-x64` · `@auspicion/js-darwin-arm64` ·
  // `@auspicion/js-win32-x64-msvc` — the five of `A86`(a), SUPERSEDED HERE as that reading, because a
  // language-only marker is ambiguous inside a multi-project org.**
  // **AND `A88`(b) — the SHORTER reading, the project token REPLACING the language marker, whose five would
  // read `@auspicion/provident-storeroom-linux-x64-gnu` and its four siblings — IS CARRIED AND PRICED AND
  // UNAPPLIED: its reversal is the same one-line re-spelling and must be taken BEFORE THE FIRST PLATFORM
  // PUBLISH, and it is asserted by no cell here.**
  // **EVERY OTHER CONJUNCT OF THIS ROW IS STILL UNMOVED: the TRIED set built from the declaration, the
  // rendering's bytes, the slot count, the byte-equality against the store's own generator, rung two's path,
  // and the clause standing after.**
  //
  // **AND THE BYTE-EQUALITY IS TAKEN AGAINST THE GENERATOR ITSELF** (`§1.4` item 6: arm (b) reproduces arm
  // (a)'s clause byte-for-byte, `PUB-DD-25`; the equality the red set's `NG-JS-H` now holds): the REAL built
  // artefact — which loaded far enough to carry `errorMessage`, and which `acceptance.md §4.1` item 1 permits
  // a cell to READ BESIDE the entry the other cells drive, never INSTEAD of it — is asked for ITS OWN
  // rendering of the SAME subject-set, and the absent copy's message must equal it CHARACTER FOR CHARACTER.
  // **THAT IS STRICTLY STRONGER THAN THE OLD LITERAL:** two subjects instead of one, their order, their own
  // slots and the join between them, all measured against the store's own arm rather than a string this
  // driver authored.
  const DECLARED_RUNG_ONE = {
    // THE AS-FILED FIVE, RE-EMITTED VERBATIM SO NO BYTE IS DELETED AND A DIFF HAS NOTHING TO RECOVER:
    // `@provident-storeroom/js-linux-x64-gnu` · `@provident-storeroom/js-linux-arm64-gnu` ·
    // `@provident-storeroom/js-darwin-x64` · `@provident-storeroom/js-darwin-arm64` ·
    // `@provident-storeroom/js-win32-x64-msvc` — each read through the operative `@auspicion` (`A86`(a)).
    // AND THE SECOND AS-FILED FIVE, RE-EMITTED THE SAME WAY, because IT is the spelling the operative `A88`
    // SUPERSEDES (`docs/specs/storeroom-publish-proposal.md §14`'s `A88`(a), the additive reading;
    // `docs/decisions.md`'s dated `ACTIVE` pin): `@auspicion/js-linux-x64-gnu` ·
    // `@auspicion/js-linux-arm64-gnu` · `@auspicion/js-darwin-x64` · `@auspicion/js-darwin-arm64` ·
    // `@auspicion/js-win32-x64-msvc` — the five of `A86`(a), read TODAY through the project token, because
    // THIS cell's five must NAME THE PROJECT and not merely the carrier's language in a multi-project org.
    'linux·x64': '@auspicion/provident-storeroom-js-linux-x64-gnu',
    'linux·arm64': '@auspicion/provident-storeroom-js-linux-arm64-gnu',
    'darwin·x64': '@auspicion/provident-storeroom-js-darwin-x64',
    'darwin·arm64': '@auspicion/provident-storeroom-js-darwin-arm64',
    'win32·x64': '@auspicion/provident-storeroom-js-win32-x64-msvc',
  };
  const rungOneName = DECLARED_RUNG_ONE[`${process.platform}·${process.arch}`];
  // the TRIED set, in the order the load path tried it: rung one's resolved name where the pair is covered
  // (`§1.3` item 3: a `NOT COVERED` pair computes no name and attempts nothing), rung two's path last.
  const triedSubjects = rungOneName === undefined ? [absentAddon] : [rungOneName, absentAddon];
  const subjectRendering = triedSubjects.map((p) => `'${p}'`).join(', ');
  const declaredMessage = `'${subjectRendering}' is not reachable at construction, the path must exist or the application must be able to write it`;
  const generatorArm = createRequire(import.meta.url)(ADDON);
  const generatorMessage = typeof generatorArm.errorMessage === 'function'
    ? generatorArm.errorMessage('FilePathUnreachable', subjectRendering) : null;
  const m87 = a1.threw && typeof a1.err.message === 'string' ? a1.err.message : '';
  A(`${sc}.7`,
    'contract.md §1.4 item 2 and §1.5 item 6 (PUB-DD-26); resolution.md §5.3 item 2 and §5.3b; the README\'s ABSENT-ADDON clause; JS-3 (closed); the store\'s §8.2 generator; A88(a) (docs/specs/storeroom-publish-proposal.md §14 · docs/decisions.md) — the five names carry the PROJECT token',
    `the refusal names THE PATHS THE LOAD PATH TRIED — on THIS drive's own COVERED key (${process.platform}·${process.arch}) BOTH rungs: rung one's resolved name '${rungOneName}' FIRST, rung two's own path SECOND, EACH inside the generator's own '<subject>' slot, joined by ', ', the clause standing after — and its bytes are EQUAL to the store's own generator's rendering of that same subject-set (arm (a) ≡ arm (b), PUB-DD-25)`,
    triedSubjects.length === 2 && m87 === declaredMessage && generatorMessage !== null
      && m87 === generatorMessage && (m87.match(/'/g) || []).length === 6
      && m87.indexOf(`'${rungOneName}'`) === 1
      && m87.endsWith(' is not reachable at construction, the path must exist or the application must be able to write it'),
    `key ${process.platform}·${process.arch}${rungOneName === undefined ? ' (NOT COVERED — rung one NOT attempted)' : ` → rung one ${rungOneName} attempted, then rung two's own path`}; tried set ${JSON.stringify(triedSubjects)}; message ${JSON.stringify(m87)}; expected ${JSON.stringify(declaredMessage)}; the generator's own arm for the same subject-set ${generatorMessage === null ? 'UNREADABLE (no errorMessage)' : (generatorMessage === m87 ? 'BYTE-EQUAL' : JSON.stringify(generatorMessage))}; slots (apostrophes) ${(m87.match(/'/g) || []).length} of 6`);
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
  const wPlain = thrown(() => inst.write(['cr-plain'], 'temp', xPlain));
  A(`${sc}.1`, '§1.2 row 4; §1.4 item 4 (e); DD-7', 'a cross-realm PLAIN object is ACCEPTED at a value position',
    !wPlain.threw, wPlain.threw ? `refused ${statusOf(wPlain)} :: ${wPlain.err.message}` : 'accepted');
  const rPlain = wPlain.threw ? null : thrown(() => inst.read(['cr-plain']));
  A(`${sc}.2`, '§1.2 row 4; §1.5', 'it round-trips EQUAL under §1.5 (the realm-agnostic prototype test, not a realm-identity test)',
    rPlain !== null && !rPlain.threw && rel(rPlain.value, { a: 1, nest: { b: 2 } }), rPlain && !rPlain.threw ? 'relation' : 'no relation');
  const wNull = thrown(() => inst.write(['cr-null'], 'temp', nullProto));
  A(`${sc}.3`, '§1.4 item 4 (e); package.md §4.5 item 2 (the `Null` prototype class)', 'an `Object.create(null)` value is ACCEPTED and round-trips',
    !wNull.threw && rel(inst.read(['cr-null']), { a: 1 }), wNull.threw ? `refused ${statusOf(wNull)}` : 'accepted');
  const wArr = thrown(() => inst.write(['cr-arr'], 'temp', xArr));
  A(`${sc}.4`, 'crossing.md §1.2 row 5; §1.3 AddressArg row 13', 'a cross-realm ARRAY is ACCEPTED at a value position and round-trips in index order',
    !wArr.threw && rel(inst.read(['cr-arr']), [1, 2, 3]), wArr.threw ? `refused ${statusOf(wArr)}` : 'accepted');
  const addr = thrown(() => inst.write(xArr, 'temp', 1));
  A(`${sc}.5`, '§1.3 AddressArg row 13 (a cross-realm array IS an address)', "a cross-realm array at the ADDRESS position is answered by the WALK's own code, never as a malformed SHAPE",
    addr.threw && statusOf(addr) === 'AddressNotFound', addr.threw ? statusOf(addr) : 'accepted silently');
  const wClass = thrown(() => inst.write(['cr-class'], 'temp', xClass));
  A(`${sc}.6`, '§1.4 item 4 (f); §1.2 row 4 (f)', 'a cross-realm CLASS instance is REFUSED — the class decision is realm-agnostic too',
    wClass.threw && statusOf(wClass) === 'ValueNotAdmitted', statusOf(wClass));
  A(`${sc}.7`, '§1.2 row 4 (the control)', 'a same-realm plain object is still accepted beside them',
    !thrown(() => inst.write(['cr-same'], 'temp', { a: 1 })).threw, 'accepted');
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
  A(`${sc}.6`, "package.md §3.2 HO-1 (*a CJS consumer is served by the consumer's own ESM interop*), read with §2.9 item 1's `A127` clause",
    "`require()` of the ESM entry succeeds through NODE'S OWN `require(esm)` interop and yields the SAME namespace the ESM import yields — its one remaining name, `storeCreate` — the consumer's side, not a second published arm",
    !cjsEntry.threw && Object.keys(cjsEntry.value).sort().join(',') === 'storeCreate',
    cjsEntry.threw ? `${cjsEntry.err.code}` : Object.keys(cjsEntry.value).sort().join(','));
  end(sc, `the manifest exposes ${JSON.stringify(ex)} and no \`main\`, no \`browser\`, no worker key and no \`.node\` subpath; a CJS \`require\` of the directory answers ${cjsDir.threw ? cjsDir.err.code : 'a module'}, while \`require()\` of the ESM entry resolves through Node's own interop (${cjsEntry.threw ? cjsEntry.err.code : Object.keys(cjsEntry.value).sort().join(',')})`);
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
  start(sc, `a caller puts 'durable-dd' at ['dd'] at the file tier THROUGH THE TERMINAL ARM (\`K-2\` + \`K-3\`, \`surface.md §2.11\` clause 2), deletes the file-tier version, and then boots a FRESH instance over the SAME '${filePath}'`);
  // ⟶ RE-DERIVED 2026-10-17 (THIS PASS): **STALE GREENS DOC**, `RCA-8(g)` — the same re-point as `LIVE-4`'s.
  // This cell's SUBJECT is `surface.md §2.8` item 1's DECLARED READING (a `delete` performs no file I/O, so the
  // removed version STANDS AGAIN at the next boot). That reading is only reachable once a durable image EXISTS
  // — `§2.11` clause 1 forbids the bare verb to write one and clause 2 puts the save on the TERMINAL ARM — so
  // the seed moves to the arm and THE READING ASSERTED IS UNMOVED.
  const seeded = kernelSaveFileLive(inst, ['dd'], 'durable-dd');
  A(`${sc}.4`, 'surface.md §2.11 clause 2; kernel-surface.md §2.1 items 2-3', 'the durable seed the delete below is measured against landed on the TERMINAL ARM (no throw)',
    !seeded.threw, seeded.threw ? `threw ${statusOf(seeded)}` : 'the save landed');
  const del = inst.delete(['dd'], 'file');
  A(`${sc}.1`, 'store §4.4 D-1; store §4.3', 'the file-tier delete succeeds and names that tier in its receipt',
    Array.isArray(del.tiers) && del.tiers.length === 1 && del.tiers[0] === 'file', JSON.stringify(del.tiers));
  const gone = thrown(() => inst.read(['dd']));
  A(`${sc}.2`, 'store §4.3', 'in the SAME instance the address no longer resolves', gone.threw && statusOf(gone) === 'AddressNotFound', statusOf(gone));
  const fresh = ns.storeCreate(cfg);
  const back = thrown(() => fresh.read(['dd']));
  A(`${sc}.3`, "the README's file-behaviour reading; store §7.2 item 6 (a delete and a rollback perform no file I/O)",
    'the booted instance sees the removed version STAND AGAIN — the store\'s own declared boot, not a defect',
    !back.threw && back.value === 'durable-dd', back.threw ? statusOf(back) : String(back.value));
  end(sc, `the file-tier delete answered tiers ${JSON.stringify(del.tiers)} and ['dd'] answered ${statusOf(gone)} in that instance, while the booted instance read the removed version back as ${back.threw ? statusOf(back) : JSON.stringify(back.value)} — the declared non-durability of the delete`);
}


// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// LIVE-13 — THE END-TO-END `on`/`off` FLOW: FROM REAL CALLER INPUT TO THE FINAL RESOLVED STATE
//
// ADDED 2026-10-11 BY THE `Q1` CONTRACT AMENDMENT, THE `role_live_scenario_runner`'s OWN `Q6` CELL
// (`docs/specs/storeroom-js-convenience-proposal.md` `§5`'s `Q6` row: *"re-run the live battery against the
// rebuilt artifact, with a live scenario using `on`/`off` end to end"*; `contract.md §5.5`'s dated clause of
// 2026-10-11, clause 5, whose live-battery bullet names `LIVE-1.3`'s move and its re-run as *"a new
// scenario's work"*). **THE TWO NEW INSTANCE MEMBERS ARE `surface.md §2.1`'s dated clause (a)'s and
// `§2.4` item 7's: `on(address, listener) -> handle` and `off(handle) -> undefined`.** **THE MODULE
// NAMESPACE IS UNMOVED** (`§2.1` dated clause (b)) — **and `LIVE-1.1` above still asserts the eight verbs,
// so no cell here re-asserts it.**
//
// THIS SCENARIO DRIVES THE WHOLE FLOW A REAL CALLER PERFORMS, AND EVERY ARM IS DRIVEN FROM REAL CALLER
// INPUT IN THIS REAL NODE PROCESS, AT A REAL SCRATCH `cfg.filePath` UNDER `/tmp`, TO ITS OWN FINAL RESOLVED
// STATE:
//   * the FRESH arm — `on` at a caller-spelled address returns the handle, a real write beneath it runs the
//     function exactly once with the TRIGGERING ADDRESS as its single argument, and the returned
//     `triggered` carries THAT SAME handle's identity (`§2.4` item 7 (a); `§2.7` item 5; `PAR-JS-12`);
//   * the HELD-ADDRESS arm — `on` again at the SAME address with a NEW function returns the SAME handle,
//     the first function never fires again and the second does (`§2.4` item 7 (a); `DD-52`; rule 2);
//   * the ATOMICITY arm — a NON-FUNCTION listener and a MALFORMED ADDRESS are each refused VERBOSELY with
//     NOTHING LEFT BEHIND, driven as an ABSENCE: the trigger set is UNCHANGED, the refused address answers
//     what it answered before (and a `listen` there reaches the store with nothing standing), and the
//     standing sibling registration is undisturbed (`§2.4` item 7 (a) step 1; `A81`; `DD-51`; `§2.17`'s
//     dated clause 1–2; `§2.5` item 5 (g));
//   * `off(h)` — `undefined`, and a later write at that address DOES NOT FIRE; and the CONTRAST `unlisten`
//     — the store-side withdrawal ONLY, with a `listen` at that address afterwards NOT firing the old
//     function (`§2.4` item 7 (b); `DD-53`/`DD-54`; `A80`; rule 4; `§2.3` dated clause 3);
//   * a REAL `file`-tier write plus a FRESH instance booted on the SAME path — the durable value reads back
//     and THE HOME IS EMPTY IN THE NEW INSTANCE (registrations are instance-scoped) (`store §7.2` item 6;
//     `DD-15`/`DD-17`; `§2.4` rule 4's last sentence).
//
// **WHAT IS ASSERTED, AND WHAT IS DELIBERATELY NOT** (`A78`): `on` and `off` are DELIVERY-SIDE members and
// state NO firing rule — WHICH listener fires and WHEN are the store's (`write-and-read.md §6.5` item 14).
// Every cell below therefore asserts a PARAMETER answer, a RETURN, a refusal, or the ABSENCE OBSERVABLE
// the contract's own `§2.17` dated clause prints — **never a derived firing rule**; the firing cells
// (`LIVE-13.3`, `.5`, `.6`, `.12`, `.14`, `.15`, `.16`) assert only the invocation COUNT and the ONE
// invocation argument, which are `§2.4` rules 2–3 and item 6 and are UNMOVED. **WHERE THE RETURNED LIST IS
// CONCERNED, MEMBERSHIP IS ASSERTED AS A SET AND NEVER AS A SEQUENCE** (`§2.7` item 3; `DD-22`; `PAR-JS-15`), **so `includes` is the
// only list predicate used below and `.length` is read only where the contract's own count is the
// observable.** **THE ABSENT-ADDON ARM IS NOT DRIVEN HERE**: it is `LIVE-8` above and is a DIFFERENT
// scenario, whose subject is the artefact's absence and not the registry.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

let onHandleForm = 'not driven';

// THE WHOLE-REGISTER PROBE the atomicity arm owes: `store §4.1 R-5` / `A25`, the empty address answers the
// WHOLE register — a FRESH JS-owned value, so a snapshot is a real comparison and never the same object.
function registerSnapshot(inst) { return Object.assign({}, inst.read([])); }

{
  const sc = 'LIVE-13';
  const dir = fsPath('live13');
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'state.json');
  const cfg = { filePath, journalLength: 4, listeners: [] };
  const inst = ns.storeCreate(cfg);
  // THE BRANCH IS MINTED FIRST, by a real write, because `store §4.1 #2` refuses a write whose parent the
  // register does not hold (`AddressNotFound`) — a caller's own order, not a defect of this scenario.
  inst.write(['ev'], 'temp', {});
  start(sc, `a real caller stands in Node ${process.version}, constructs at '${filePath}', mints ['ev'] with a real write, calls on(inst, ['ev'], fn), writes under ['ev','child'], calls on again at the held ['ev'] with a NEW function, offers a NON-FUNCTION listener and a MALFORMED address, then off(h) — and finally writes at the file tier and boots a FRESH instance on the same path`);

  // ── (1) THE FRESH ARM: `on` → a handle ─────────────────────────────────────────────────────────────────
  const first = [];
  const firstFn = function (...args) { first.push(args); };
  // ⟶ SPELLED ON THE OO SURFACE 2026-10-17 (`A127`; `§2.4` item 9 (f)'s `A127` clause): `on(address, listener)`
  // is the route `listen(address)` + `register(handle, listener)`, so the handle the cell below reads is the one
  // `listen` answered and `register`'s own `undefined` is asserted beside it. NO EXPECTATION MOVES.
  const onRoute = (address, fn) => { const hh = inst.listen(address); const rr = inst.register(hh, fn); if (rr !== undefined) throw new Error('register did not answer undefined'); return hh; };
  const h = onRoute(['ev'], firstFn);
  onHandleForm = `${typeof h} ${JSON.stringify(h)}`;
  A(`${sc}.1`, '§2.4 item 7 (a); §2.3 item 2; A79',
    "on(address, listener) answers the package's OPAQUE handle — a non-null value, not a string, spelling no token — and does NOT throw",
    h !== null && typeof h === 'object' && typeof h !== 'string' && !JSON.stringify(h).includes('listener-'), onHandleForm);
  const w = inst.write(['ev', 'child'], 'temp', { n: 1 });
  A(`${sc}.2`, "§2.4 item 6 (b) (the registry's lookup BY THAT IDENTITY); §2.7 item 1; DD-22",
    "the returned record's triggered carries THE SAME handle's identity — membership asserted, and NO ORDER (§2.7 item 3)",
    Array.isArray(w.triggered) && w.triggered.includes(h), JSON.stringify(w.triggered?.length));
  A(`${sc}.3`, '§2.4 item 7 (a) step 3; §2.4 rule 2; §2.7 item 5; parameter-semantics.md §2.12',
    "the function `on` was given runs EXACTLY ONCE, and its single argument is the TRIGGERING ADDRESS ['ev','child'] — never the handle",
    first.length === 1 && first[0].length === 1 && rel(first[0][0], ['ev', 'child']) && first[0][0] !== h,
    `${first.length} invocation(s); arg ${first[0] ? JSON.stringify(first[0][0]) : 'n/a'}`);
  A(`${sc}.4`, '§2.2; store §3.6',
    "the write's own record carries a real opId the caller sees",
    typeof w.op === 'object' && typeof w.op.opId === 'string' && w.op.opId.length > 0, String(w.op?.opId));

  // ── (2) THE HELD-ADDRESS ARM: `on` again at the same address replaces ────────────────────────────────
  const second = [];
  const secondFn = function (...args) { second.push(args); };
  const h2 = onRoute(['ev'], secondFn);
  A(`${sc}.5`, '§2.4 item 7 (a) (the held arm); DD-52; §2.3 item 6',
    'a second on at the HELD address answers THE SAME handle and REPLACES the registry\'s function — the replaced function is not invoked',
    h2 === h && first.length === 1, h2 === h ? `same handle; first fn fired ${first.length}×` : 'a DIFFERENT handle');
  const w2 = inst.write(['ev', 'child2'], 'temp', { n: 2 });
  A(`${sc}.6`, '§2.4 rule 2; §2.4 item 6 (e); §2.7 item 5',
    'a later write under that address invokes the SECOND function exactly once — with the triggering address — and the first function never fires again',
    second.length === 1 && second[0].length === 1 && rel(second[0][0], ['ev', 'child2']) && first.length === 1,
    `first ${first.length}×, second ${second.length}×; arg ${second[0] ? JSON.stringify(second[0][0]) : 'n/a'}`);

  // ── (3) THE ATOMICITY ARM: two refusals, driven as ABSENCE ─────────────────────────────────────────────
  const before = registerSnapshot(inst);
  // THE NON-FUNCTION LISTENER IS NOW REFUSED AT `register` (`§2.4` item 9 (f)'s `A127` clause: the listener
  // position lives at `register(handle, listener)`, and `listen` carries the address ALONE), so the DRIVE mints
  // the handle FIRST and offers the non-function at the member that declares the position — the same two
  // observables (the single form, and the position `second argument`) are asserted.
  const notFnHandle = (() => { try { return inst.listen(['ev', 'ghost']); } catch (e) { return null; } })();
  const notFn = notFnHandle === null
    ? { threw: true, err: 'the handle position for the listener drive was never reachable: `listen` refused' }
    : thrown(() => inst.register(notFnHandle, 'not a function'));
  A(`${sc}.7`, '§2.17 dated clause 1; parameter-semantics.md §2.12; surface.md §2.5 item 5 (g); A81',
    'a NON-FUNCTION listener is refused in §2.5\'s SINGLE thrown form {status, message} with the store\'s own AddressMalformed — and NOT as a raw host TypeError',
    notFn.threw && isSingleForm(notFn.err) && notFn.err.status === 'AddressMalformed', statusOf(notFn));
  A(`${sc}.8`, 'surface.md §2.5 item 5 (a)–(b); §2.17 dated clause (the class half and the position half)',
    "the refusal is VERBOSE: its message names the failing target's own value, the class the value HAS, and the ARGUMENT POSITION 2 of 2",
    notFn.threw && typeof notFn.err.message === 'string' && notFn.err.message.includes('not a function')
      && /string/.test(notFn.err.message) && /second argument/.test(notFn.err.message),
    notFn.threw ? notFn.err.message : 'no throw');
  A(`${sc}.9`, '§2.4 item 7 (a) step 1 ("NOTHING IS LEFT BEHIND"); A81; DD-51; contract.md §5.5 dated clause (clause 2)',
    'NOTHING IS LEFT BEHIND by that refusal: the whole register is UNCHANGED and the refused address answers what it answered before — AddressNotFound',
    rel(registerSnapshot(inst), before)
      && (() => { const r = thrown(() => inst.read(['ev', 'ghost'])); return r.threw && statusOf(r) === 'AddressNotFound'; })(),
    Object.keys(registerSnapshot(inst)).join(','));
  const bad = thrown(() => inst.listen('ev.bad'));
  A(`${sc}.10`, '§2.17 dated clause 2; surface.md §2.5 item 5 (g); parameter-semantics.md §2.5; A81',
    "a MALFORMED ADDRESS is refused the same way — AddressMalformed in the single form, verbosely, naming the address's class and the ARGUMENT POSITION 1 of 2",
    bad.threw && isSingleForm(bad.err) && bad.err.status === 'AddressMalformed'
      && typeof bad.err.message === 'string' && /first argument/.test(bad.err.message),
    bad.threw ? `${bad.err.status} :: ${bad.err.message}` : 'no throw');
  // ── ⟶ ADDED 2026-10-17, THE OWED PRESENT-TOKEN ASSERTION (`A134`; `surface.md §2.5` item 5 (a)–(b)) ────
  //
  // **THE DEFECT THIS CELL CLOSES, NAMED AS GATE 6 MEASURED IT (`LIVE-F9`, `DEF-2026-10-16-T`): THE PAIR WAS
  // ASYMMETRIC. The node suite asserted the ABSENT token `in ''` EIGHT times, and NO live instrument asserted
  // the PRESENT token `in 'address'` at all — `grep -c "in 'address'"` read `0 · 0 · 0 · 0` across
  // `live-drive.mjs`, `greens.mjs`, `file-tier-save/scenarios.mjs` and `convenience.test.mjs` — so the two
  // readings SEPARATED ONLY ON INSTALLED BYTES and nothing here could see the difference.** **THE ABSENCE HALF
  // IS BOUND TO WHICHEVER ARTEFACT THE SELF-REFERENCING IMPORT RESOLVES and therefore holds on ANY artefact
  // that merely fails to carry the false form; the PRESENCE HALF is the claim `A134` actually makes and is
  // the one that distinguishes an artefact carrying the repair from one that drops the container argument.**
  //
  // **THE CLAUSE, VERBATIM (`docs/decisions.md` · `A134`, `ACTIVE`, 2026-10-16):** *"at every address position
  // (`listen`, `read`, `write`, `delete`, `readLiteral`) a NON-ARRAY outside value is refused with **its own
  // rendering** … **AND the argument position** … and the container slot carries **`'address'`**; **the false
  // empty-container form `in ''` is gone**"* — read with `surface.md §2.5` item 5 (a), THE FAILING TARGET
  // rendered as the store's generator renders it, and item 5 (b), THE REASON — the class that failed and the
  // ARGUMENT POSITION beside it — the position being *"the one thing this section declares that the store's own
  // phrases do not carry"*. **`A134` fills the generator's `<container>` slot with the ARGUMENT'S OWN NAME,
  // following the store's own `ConstraintListInvalid` precedent (`'constraints'` as a KEY and not an address).**
  //
  // **ASSERTED AT ALL FIVE POSITIONS AND ALL FOUR OUTSIDE VALUES — `20` readings, not one** — because `A134`
  // says *"every address position"* and the gate-6 measurement found the false form at *"all five address
  // positions"*: a cell that drove one verb would report `1` where the finding is `5`. **THE FOUR VALUES ARE
  // `'a.b'` · `7` · `null` · `undefined`, THEIR OWN RENDERINGS `the string 'a.b'` · `the number 7` · `null` ·
  // `undefined`** — the target half and the position half are asserted BESIDE the container at every reading, so
  // a message that carried the container while dropping either of the other two halves still fails here.
  //
  // **AND THIS CELL IS ASSERTED ONLY, NEVER LOOSENED: nothing above it is removed, softened or re-pointed, and
  // the `in ''` absence half stays where it lives (`convenience.test.mjs`) — this is the SYMMETRIC half the
  // pair owed.**
  //
  // **`LIVE-13.20` IS A NEW ID AND NOT A RE-NUMBERING**: `.1`–`.19` keep the ids they already carried, and this
  // cell is APPENDED to the id space while standing at the `.10`/`.11` seam because that is where its subject
  // belongs — `.10` drives ONE malformed address and asserts the target and position halves, and this cell
  // widens exactly that subject to every position and every value, adding THE HALF `.10` DOES NOT ASSERT: THE
  // CONTAINER. **No cell below is renumbered**, so a reader of any earlier record still finds `.11`–`.19` at
  // the id it was written under.
  const ADDRESS_POSITIONS = [
    ['listen', (x) => inst.listen(x)],
    ['read', (x) => inst.read(x)],
    ['write', (x) => inst.write(x, 'temp', 1)],
    ['delete', (x) => inst.delete(x)],
    ['readLiteral', (x) => inst.readLiteral(x)],
  ];
  const OUTSIDE_ADDRESS_VALUES = [['a.b', "the string 'a.b'"], [7, 'the number 7'], [null, 'null'], [undefined, 'undefined']];
  const a134 = [];
  for (const [verb, call] of ADDRESS_POSITIONS) {
    for (const [value, rendering] of OUTSIDE_ADDRESS_VALUES) {
      const r = thrown(() => call(value));
      const m = r.threw && typeof r.err.message === 'string' ? r.err.message : '';
      a134.push({
        verb, rendering, m,
        addressed: r.threw && isSingleForm(r.err) && r.err.status === 'AddressMalformed',
        target: m.includes(rendering),
        position: /first argument/.test(m),
        containerPresent: /\bin 'address'/.test(m),
        containerEmpty: /\bin ''/.test(m),
      });
    }
  }
  const a134Bad = a134.filter((x) => !(x.addressed && x.target && x.position && x.containerPresent && !x.containerEmpty));
  A(`${sc}.20`, "A134 (docs/decisions.md, ACTIVE 2026-10-16); surface.md §2.5 item 5 (a)–(b); crossing.md §1.3 AddressArg rows 5–6",
    `AT ALL FIVE ADDRESS POSITIONS (listen · read · write · delete · readLiteral) and for ALL FOUR outside values ('a.b' · 7 · null · undefined), the whole-address refusal is the single AddressMalformed form and carries ALL THREE HALVES: the VALUE'S OWN RENDERING (item 5 (a)), the ARGUMENT POSITION 'first argument' (item 5 (b)), and THE CONTAINER SLOT FILLED WITH THE ARGUMENT'S OWN NAME — 'address' — with the false empty-container form \`in ''\` ABSENT (A134: 'the container slot carries address; the false empty-container form in '' is gone')`,
    a134.length === 20 && a134Bad.length === 0,
    a134Bad.length === 0
      ? `${a134.length}/20 readings carry target + position + container 'address', 0 carry \`in ''\`; the artifact under test ${addonStat.size} bytes sha256 ${addonSha.slice(0, 12)}…`
      : `${a134Bad.length}/20 readings FAIL A134 — ${a134Bad.map((x) => `${x.verb}(${x.rendering}) [${['target', 'position', 'container'].filter((k, i) => ![x.target, x.position, x.containerPresent][i]).join('+') || 'form'}${x.containerEmpty ? "+in ''" : ''}]`).join('; ')}`);

  // ── ⟶ ADDED 2026-10-17 (THE `0.3.1` BOUNDARY-FIX PASS, `DEF-2026-10-17-A`): THE FIVE ADDRESS POSITIONS'
  // OWN TIER-SIDE REFUSAL — THE SUBJECT `LIVE-13.20` DOES NOT REACH, WIDENED HERE RATHER THAN DUPLICATED ────
  //
  // **WHY THIS CELL EXISTS AND WHY `LIVE-13.20` COULD NOT HAVE FOUND THE DEFECT IT COVERS.** `DEF-2026-10-17-A`
  // was found by installing the PUBLISHED `0.3.0` package into a clean consumer directory and driving it, and
  // by NO gate. `.20` above drives each of the five positions with an OUTSIDE **address** — the walk refuses it
  // at the ADDRESS position and fills the container from the argument's own name. **The defect stood at a
  // DIFFERENT BRANCH: an address WHOLLY IN DOMAIN, refused by the TIER STEP that runs BEFORE `address_segments`
  // is consulted.** `read(['a','b','c'], undefined)` and `read(['a.b'], undefined)` answered *"the tier
  // argument is not a legal address segment in `''`"* — an EMPTY CONTAINER, and the WRONG ARGUMENT NAMED (it
  // said `tier` where the offending position is the address). **A wholly in-domain address never reaches the
  // branch `.20` drives, so a battery made only of outside ADDRESSES is structurally blind to it.**
  //
  // **THE CLAUSES THIS CELL DERIVES ITS ASSERTION FROM, AND NOT FROM THE CODE.** `parameter-semantics.md §2.6`
  // (`PAR-JS-6`) — *"the declared answer for EACH outside value: … `AddressMalformed` when the argument is
  // `null` or `undefined`"*, and the dated reconciliation beside that cell: *"`a.read(address, undefined)` IS A
  // SUPPLIED VALUE AT THIS POSITION AND TAKES `PAR-JS-6`'s DECLARED ANSWER — the store's own thrown
  // `{status, message}` with `status` `AddressMalformed`"*. **`surface.md §2.5` item 5 (a)–(b)**, the failing
  // target and the reason. **AND THE CONTAINER HALF, which is the half the defect broke: `docs/decisions.md` ·
  // `A134` (ACTIVE) — *"the container slot carries `'address'`; the false empty-container form `in ''` is
  // gone"*.** **THE POSITION HALF IS DERIVED, NOT ASSUMED**: `surface.md §2.5` item 5 (b) makes the position
  // *"conditional"* — *"where a POSITION is declared by the contract, the position is carried BESIDE the class"*
  // — and the tier is the SECOND argument of `read`/`readLiteral`, so **the position is asserted for
  // `read`/`readLiteral` and NOT asserted for the three one-argument positions**, where `§2.5` item 5 (b)
  // declares none. **WHERE A POSITION IS NOT DERIVABLE IT IS NOT ASSERTED — asserting one anyway would be
  // asserting a wished-for shape**, which this battery may not do.
  //
  // **THE ADDRESS INPUTS, EACH CHOSEN FOR A DIFFERENT ONE OF THE FOUR SHAPES THE FIX TOUCHED** (the gate-1
  // review's own enumeration, `archive/reviews/2026-10-16-constraints-publication-gate1.md §63`–`§64`): a
  // WHOLLY IN-DOMAIN three-segment address `['a','b','c']`; a DOTTED STRING SEGMENT `['a.b']` — `crossing.md
  // §1.3` row 2 admits any string *"including one containing a `.` or a `/`"* as a legal KEY, so this address is
  // IN DOMAIN and the dot is not the defect; a SINGLE-SEGMENT in-domain address `['a']` — **the implementer's
  // own third reading in the defect row (*"`read(['a'], undefined)` fails identically"*), which proves the
  // defect was never about the address at all**; and the NON-ARRAY outside values `.20` already drives, kept
  // here so the widening is read against the arm that was already green. **THE TIER VALUES ARE `undefined`,
  // `null` and an outside TOKEN** — `undefined` and `null` are `PAR-JS-6`'s two `AddressMalformed` values, and
  // `'secure'` is its `OutOfDomainTier` value, **so the cell also separates the two codes at one position and
  // cannot pass by answering one for both.**
  //
  // **THE PRESENCE ASSERTION IS THE WHOLE POINT, AND IT IS ASSERTED BESIDE THE ABSENCE, NEVER INSTEAD OF IT.**
  // A cell that asserts only `!message.includes("in ''")` still passes on a message that names NO CONTAINER AT
  // ALL — and the defect this covers was a container, present and wrong. **So every reading must carry
  // `/\bin 'address'/` AND must not carry `/\bin ''/`, and the two are separate members of the reading record**
  // so a failure report names which half broke rather than printing the message once.
  //
  // **THE SUBJECT IS NARROWED TO WHAT THE DOCUMENTS ACTUALLY DERIVE, AND ONE TIGHTENING IS NAMED SO IT IS NOT
  // READ AS A LOOSENING.** The defect's OWN distinguisher, at its own row, is *"a STRING SEGMENT that is itself
  // outside"* — which the implementer's correction then REFUTED, reporting that **the address in both named
  // cells is WHOLLY IN DOMAIN** and that *"`read(['a'], undefined)` fails identically"*, so *"the offending
  // spelling was NOT in the address"*. **The defect's real subject is therefore A SUPPLIED `undefined` AT THE
  // TIER POSITION of a call whose ADDRESS IS IN DOMAIN** — and that is exactly the subject `.21` drives.
  //
  // **WHY `null` AND `'secure'` ARE *NOT* IN THIS CELL'S SUBJECT — MEASURED, AND DECLARED RATHER THAN SILENT.**
  // The fix threaded a 4th parameter through `encodeTier` at `read`/`readLiteral`/`write`/`delete` for the
  // SUPPLIED-`undefined` case only, and a live probe taken at this pass's own tree (printed in the run's
  // `LIVE-13.21` observed field on the red run that preceded this correction) reads **`read(['ev','child'],
  // null)` still answering *"the tier argument is not a legal address segment in `''`"***. **THE DOCUMENTS DO
  // NOT LICENSE ASSERTS EITHER WAY AT THE `null` BRANCH: `crossing.md §1.3`'s `TierArg` row 4 declares `null`
  // and `undefined` THE SAME `AddressMalformed`, while `A134` — the only container rule in force — is scoped BY
  // ITS OWN WORDS to *"at every address position (`listen`, `read`, `write`, `delete`, `readLiteral`) a
  // NON-ARRAY outside value"*, and A TIER POSITION IS NOT AN ADDRESS POSITION.** **So the container `'address'`
  // is DERIVABLE for the address argument and NOT derivable for the tier argument, and this cell asserts the
  // container only where `A134` reaches.** **THE `null`-AT-TIER READING IS REPORTED TO THE SUPERVISOR AS A GAP
  // IN THE DOCUMENTS RATHER THAN ASSERTED OR NOT ASSERTED BY GUESS** — see the pass's return, item `7`.
  //
  // **AND THE POSITION HALF IS `first argument`, NOT `second argument`, WHICH THE LIVE READING SETTLED:** the
  // supplied-`undefined` message names **both** positions — *"the address position was supplied at the first
  // argument, the tier position holds undefined"* — so `surface.md §2.5` item 5 (b)'s conditional position is
  // satisfied by the address's own `first argument`, and the tier is named SEPARATELY as a position holding
  // `undefined` rather than as a second argument. Asserting `second argument` would have been asserting a
  // wished-for spelling; the cell asserts `first argument` and the tier's own naming clause.
  const IN_DOMAIN_ADDRESSES = [
    [['a', 'b', 'c'], 'a wholly in-domain three-segment address'],
    [['a.b'], 'a dotted string segment — a legal KEY under crossing.md §1.3 row 2'],
    [['a'], 'a single-segment in-domain address — the implementer\'s own "fails identically" reading'],
  ];
  const NON_ARRAY_ADDRESSES = [[7, 'the number 7'], [null, 'null'], [undefined, 'undefined']];
  // THE FOUR TIER-BEARING CALL SITES — the four `encodeTier` callers the fix threaded (`crossing.md §1.3`
  // `TierArg` row 4 gives `null`/`undefined` `AddressMalformed` *"on every verb"*):
  const TIER_BEARING = [
    ['read', (x) => inst.read(x, undefined)],
    ['readLiteral', (x) => inst.readLiteral(x, undefined)],
    ['write', (x) => inst.write(x, undefined, 1)],
    ['delete', (x) => inst.delete(x, undefined)],
  ];
  // AND THE FIFTH POSITION — `listen` has NO tier position (`§2.4` item 9 (f)'s `A127` clause: `listen(address)`),
  // so it is driven here for the ADDRESS half only, which is `.20`'s subject widened to the in-domain shapes.
  const tierSide = [];
  for (const [verb, call] of TIER_BEARING) {
    for (const [addr, addrLabel] of IN_DOMAIN_ADDRESSES) {
      const r = thrown(() => call(addr));
      const m = r.threw && typeof r.err.message === 'string' ? r.err.message : '';
      tierSide.push({
        kind: 'in-domain address + supplied undefined tier', verb, addrLabel, m,
        addressed: r.threw && isSingleForm(r.err) && r.err.status === 'AddressMalformed',
        target: m.includes("'undefined'"),
        containerPresent: /\bin 'address'/.test(m),
        containerEmpty: /\bin ''/.test(m),
        // THE DEFECT'S OWN SPELLING, and the WRONG ARGUMENT it named: the tier must not be reported as the
        // thing that "is not a legal address segment".
        wrongArgumentNamed: /the tier argument is not a legal address segment/.test(m),
        position: /first argument/.test(m),
        tierNamed: /tier position holds undefined/.test(m),
      });
    }
  }
  for (const [verb, call] of TIER_BEARING) {
    for (const [value, rendering] of NON_ARRAY_ADDRESSES) {
      const r = thrown(() => call(value));
      const m = r.threw && typeof r.err.message === 'string' ? r.err.message : '';
      tierSide.push({
        kind: 'non-array address + supplied undefined tier', verb, addrLabel: `the address ${rendering}`, m,
        addressed: r.threw && isSingleForm(r.err) && r.err.status === 'AddressMalformed',
        target: m.includes(rendering),
        containerPresent: /\bin 'address'/.test(m),
        containerEmpty: /\bin ''/.test(m),
        wrongArgumentNamed: /the tier argument is not a legal address segment/.test(m),
        position: /first argument/.test(m),
        tierNamed: true, // not owed on the address half — the address refusal fires first
      });
    }
  }
  // `listen` carries the address ALONE; the in-domain shapes reach the store rather than the walk's refusal,
  // so what is asserted is that NO ADDRESS-SEGMENT FORM IS INVENTED for them (they are legal).
  const listenInDomain = IN_DOMAIN_ADDRESSES.map(([addr, addrLabel]) => {
    const r = thrown(() => inst.listen(addr));
    return { addrLabel, m: r.threw && typeof r.err.message === 'string' ? r.err.message : '', threw: r.threw, status: r.threw ? r.err.status : 'ok' };
  });
  const tierBad = tierSide.filter((x) => !(x.addressed && x.target && x.containerPresent && !x.containerEmpty
    && !x.wrongArgumentNamed && x.position));
  A(`${sc}.21`, "DEF-2026-10-17-A (docs/defects.md — the row, its correction and its remedy line); A134 (docs/decisions.md, ACTIVE) for the container and its address-position scope; parameter-semantics.md §2.6 (PAR-JS-6) and its dated `undefined` reconciliation for the code; crossing.md §1.3 TierArg row 4 (`null`/`undefined` → `AddressMalformed` on every verb) and AddressArg row 2 (a dotted string IS a legal key); surface.md §2.5 item 5 (a)–(b)",
    `A SUPPLIED \`undefined\` AT THE TIER POSITION of a call whose ADDRESS IS IN DOMAIN — THE DEFECT'S OWN BRANCH — is refused as the single \`AddressMalformed\` form carrying the container 'address' PRESENT and \`in ''\` ABSENT, at ALL FOUR tier-bearing call sites (read · readLiteral · write · delete) × the three in-domain address shapes AND × the three non-array outside addresses; and at NO reading does the message answer the DEFECT'S OWN SPELLING 'the tier argument is not a legal address segment' — the wrong argument it named — while the position half is 'first argument' and the tier is named separately as the position holding undefined`,
    tierSide.length === 24 && tierBad.length === 0,
    tierBad.length === 0
      ? `${tierSide.length}/24 readings (4 tier-bearing sites × 3 in-domain address shapes = 12, plus the same 4 × 3 non-array outside addresses = 12) carry target + container 'address' PRESENT, 0 carry \`in ''\`, 0 name the tier as the malformed address; ${tierSide.filter((x) => x.containerPresent).length}/24 carry the container PRESENT; \`listen\` at the three in-domain shapes: ${listenInDomain.map((x) => `${x.addrLabel.split(' ')[0]}→${x.status}`).join(', ')}; the artifact under test ${addonStat.size} bytes sha256 ${addonSha.slice(0, 12)}…`
      : `${tierBad.length}/24 readings FAIL — ${tierBad.map((x) => `${x.verb}(${x.addrLabel}) [${[['not AddressMalformed', !x.addressed], ['target', !x.target], ['container PRESENT', !x.containerPresent], ["no in ''", x.containerEmpty], ['no wrong-argument naming', x.wrongArgumentNamed], ['first argument', !x.position]].filter((p) => p[1]).map((p) => p[0]).join('+') || 'form'}] ${x.m.slice(0, 140)}`).join('; ')}`);

  // ── ⟶ ADDED 2026-10-17 (THE SAME PASS): THE CONSTRUCTION PATH — AN OMITTED `listeners`, ITS TWO SIBLING
  // ABSENCE STATES, THE VALID FORM, AND THE TWO RESIDUES THE FIX LEFT ON PURPOSE, EACH ASSERTED AS IT STANDS ─
  //
  // **THE SECOND HALF OF `DEF-2026-10-17-A`, AND THE HALF `LIVE-13.21` DOES NOT REACH: THE CONSTRUCTION.**
  // `storeCreate({journalLength: 64})` — `listeners` OMITTED — previously threw `AddressMalformed`
  // *"'listeners' is not a legal address segment in `''`"*, **a CONFIG KEY reported as an address segment with
  // the empty container**, while `journalLength`'s own omission gave a clean `ConstructionArgumentMissing`.
  //
  // **THE CLAUSES, AND ONE HONEST GAP STATED RATHER THAN PAPERED OVER.** The layer split is `docs/decisions.md`
  // · `A134` and `crossing.md §1.3`'s carrier rule: **`listen`, `read`, `write`, `delete` and `readLiteral` are
  // ADDRESS positions and fill the container `'address'`; a CONFIG KEY is not an address position and must not
  // borrow that container.** **`crossing.md §1.3`'s dated rule 2 declares `listeners`'s two absence states —
  // *"an ABSENT key is `ListenersArg` row 5's `AddressMalformed`; a key PRESENT carrying `undefined` is the same
  // `AddressMalformed` … this is the ONE key of the three whose two states coincide in their ANSWER"* — AND
  // `ListenersArg` row 5 prints the answer as `AddressMalformed`, which is the code the STORE's carrier
  // produces and NOT the *"requires a listeners argument"* shape the fix built.** **THE DOCUMENTS THEREFORE DO
  // NOT DECLARE THE ARGUED SHAPE AT THE `listeners` KEY; the shape is declared for that code's absent-argument
  // ARM by `docs/specs/storeroom-native/contract.md §8.2`'s `AddressMalformed` row and its `ConstructionArgumentMissing`
  // row (*"`requires a <argument-name> argument`"* / *"`a <argument-name> is required on store creation`"*), and the
  // fix's choice to use that arm at a NAMED KEY rather than the address-segment arm is the `0.3.1` remedy as
  // filed at `docs/defects.md`'s `DEF-2026-10-17-A` remedy line — NOT a clause of this directory's own.** **SO
  // THIS CELL ASSERTS THE SHAPE THE FIX DECLARES AND ITS `status` IS ASSERTED AS `AddressMalformed`, the code
  // BOTH `ListenersArg` row 5 and the `§8.2` absent-argument arm license; the code half is NOT narrowed to
  // `ConstructionArgumentMissing`, because that code's trigger `contract.md §8.1` #12 RESERVES to `journalLength`
  // ALONE (*"produced ONLY by the ABSENCE of `cfg.journalLength`"*) — and narrowing it here would be asserting a
  // wished-for shape against a clause.** **THIS GAP IS REPORTED TO THE SUPERVISOR RATHER THAN RESOLVED BY A LIVE
  // RUNNER.**
  //
  // **THE FOUR CONSTRUCTION INPUTS, EACH A DIFFERENT STATE OF ONE KEY:**
  //   (a) `listeners` OMITTED — `{ journalLength: 64 }` — the DEFECT'S OWN INPUT;
  //   (b) `listeners: undefined` — PRESENT and carrying `undefined`, which `crossing.md §1.3` rule 2 declares
  //       *"TWO STATES of the carrier"* whose ANSWERS coincide;
  //   (c) `listeners: null` — the third absence spelling (`ListenersArg`'s outside list);
  //   (d) `listeners: []` — **THE VALID FORM**, `ListenersArg` row 1's *"the ordinary no-listener store"*,
  //       asserted at its own observable: an INSTANCE, and the TWELVE own members `surface.md §2.1` (e) 1 and
  //       `§2.4` item 9 (f)'s `A127` clause declare (`10 + 1 + 1 = 12`).
  // **EVERY ABSENCE ARM ASSERTS THE ARGUED SHAPE PRESENT AND THE ADDRESS-SEGMENT FORM ABSENT — BOTH HALVES, in
  // the same reading, so a message that drops the argued clause cannot pass on the absence of the other.**
  const CONSTRUCTION_ABSENCES = [
    [{ journalLength: 64 }, 'the key OMITTED — the defect\'s own input'],
    [{ journalLength: 64, listeners: undefined }, 'the key PRESENT carrying `undefined`'],
    [{ journalLength: 64, listeners: null }, 'the key PRESENT carrying `null`'],
  ];
  const constructionAbsence = [];
  for (const [cfgIn, label] of CONSTRUCTION_ABSENCES) {
    const r = thrown(() => ns.storeCreate(cfgIn));
    const m = r.threw && typeof r.err.message === 'string' ? r.err.message : '';
    constructionAbsence.push({
      label, m, threw: r.threw,
      single: r.threw && isSingleForm(r.err),
      // THE ARGUED SHAPE, both limbs, from `contract.md §8.2`'s absent-argument arm.
      requiresLimb: /requires a listeners argument/.test(m),
      requiredLimb: /is required on store creation/.test(m),
      namesListeners: m.includes("'listeners'"),
      // AND THE FORMS THAT MUST BE GONE: the address-segment form and the empty container.
      addressSegmentForm: /is not a legal address segment/.test(m),
      containerEmpty: /\bin ''/.test(m),
      // `construction` is the slot the fix added; a container spelled at this key would be the lapse.
      borrowedAddressContainer: /\bin 'address'/.test(m),
    });
  }
  const constructionBad = constructionAbsence.filter((x) => !(x.threw && x.single && x.requiresLimb && x.requiredLimb
    && x.namesListeners && !x.addressSegmentForm && !x.containerEmpty && !x.borrowedAddressContainer));
  A(`${sc}.22`, "docs/defects.md · DEF-2026-10-17-A (the addendum and the remedy as filed); docs/specs/storeroom-native/contract.md §8.2's AddressMalformed absent-argument arm (`requires a <argument-name> argument` / `a <argument-name> is required on store creation`); crossing.md §1.3 dated rule 2 and ListenersArg row 5 (the three absence states and the key's own name); A134 for the layer split that FORBIDS the address container at a config key",
    `the construction's \`listeners\` ABSENCE — in all THREE states the carrier distinguishes (key OMITTED, key PRESENT carrying \`undefined\`, key PRESENT carrying \`null\`) — answers in ITS SIBLING \`journalLength\`'s SHAPE: the single form, \`'listeners'\` NAMED, and BOTH argued limbs present ('requires a listeners argument' AND 'is required on store creation'), while the ADDRESS-SEGMENT form 'is not a legal address segment' is ABSENT, \`in ''\` is ABSENT, and the address container 'address' is NOT BORROWED for a config key`,
    constructionAbsence.length === 3 && constructionBad.length === 0,
    constructionBad.length === 0
      ? `3/3 absence states answer the argued shape — e.g. omitted → ${constructionAbsence[0].m}`
      : `${constructionBad.length}/3 FAIL — ${constructionBad.map((x) => `${x.label} [${[['throws', !x.threw], ['single form', !x.single], ['requires limb', !x.requiresLimb], ['required limb', !x.requiredLimb], ['names listeners', !x.namesListeners], ['no address-segment form', x.addressSegmentForm], ["no in ''", x.containerEmpty], ['no borrowed address container', x.borrowedAddressContainer]].filter((p) => p[1]).map((p) => p[0]).join('+') || 'form'}] ${x.m || 'no throw'}`).join('; ')}`);
  const validListeners = thrown(() => ns.storeCreate({ filePath: fsPath('live13/valid-listeners.json'), journalLength: 4, listeners: [] }));
  const validMemberSet = validListeners.threw ? '' : Object.getOwnPropertyNames(validListeners.value).sort().join(',');
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): `13 → 12`, `10 + 1 + 1 = 12` ✓**, the two remaining
  // singles being `register` and `constraints` (`surface.md §2.4` item 9 (f)'s clause of that date, item `1`).
  // **The
  // cell's subject — the VALID form returns an INSTANCE carrying the declared set, so the refusal half
  // cannot be passing by refusing the lawful form too — is unmoved.**
  A(`${sc}.23`, 'crossing.md §1.3 ListenersArg row 1 (`[]` is "the ordinary no-listener store") read with parameter-semantics.md §2.4 PAR-JS-4 (the empty array is IN the domain); surface.md §2.1 (e) 1 and §2.4 item 9 (f)\'s clause of 2026-10-18 for the product\'s TWELVE own members (`10 + 1 + 1 = 12`)',
    'the VALID form `listeners: []` returns an INSTANCE and does NOT throw, and that instance carries exactly the TWELVE own members the contract declares — so the refusal half above cannot be passing by refusing the lawful form too',
    !validListeners.threw && Object.getOwnPropertyNames(validListeners.value).length === 12
      && /^addConstraint,constraintOff,constraintOn,constraints,delete,listen,read,readLiteral,register,rollback,unlisten,write$/.test(validMemberSet),
    validListeners.threw ? `threw ${statusOf(validListeners)}` : `${Object.getOwnPropertyNames(validListeners.value).length} own members: ${validMemberSet}`);

  // ── ⟶ AND THE TWO RESIDUES THE FIX LEFT ON PURPOSE, ASSERTED AS THEY ACTUALLY STAND (`LIVE-13.24`) ────
  //
  // **THE FIX DID NOT CLEAN THESE, AND THIS BATTERY MUST NOT PRETEND IT DID.** Both are recorded at
  // `docs/defects.md` · `DEF-2026-10-17-A`'s remedy line — *"TWO RESIDUES THE FIX DELIBERATELY LEFT, RECORDED SO
  // THEY ARE NOT MISTAKEN FOR CLEAN"* — and at `archive/reviews/2026-10-16-constraints-publication-gate1.md §64`.
  // **ASSERTING THE WISHED-FOR BEHAVIOUR HERE WOULD BE A RED CELL AGAINST AN IMPLEMENTATION THIS PASS MAY NOT
  // EDIT, AND A FALSE GREEN IN EVERY LATER RUN.** **So the cell asserts the CURRENT TRUTH and its own name says
  // `RESIDUE`.**
  //   (i) `listeners: {}` STILL reads *"is not a legal address segment in `''`"*, **retained because
  //       `tests/gate4_red_set_fix.rs` PINS that whole sentence for the present-but-malformed arm** — a
  //       decision to revisit, not an oversight. **It is therefore the ONE place `in ''` LAWFULLY SURVIVES,
  //       and this cell asserts it SURVIVES so that a later pass which does clean it sees THIS cell go red and
  //       re-derives it rather than silently inheriting a stale claim.**
  //   (ii) `read(['a','b'])` with an UNSOUGHT tier still answers `LeafHasNoDownstream`/`AddressNotFound`,
  //       untouched — **asserted as the declared answer of `store §4.1`'s walk, not as a defect of the fix.
  const residueMap = thrown(() => ns.storeCreate({ filePath: fsPath('live13/residue-map.json'), journalLength: 4, listeners: {} }));
  const residueMapMsg = residueMap.threw && typeof residueMap.err.message === 'string' ? residueMap.err.message : '';
  A(`${sc}.24`, 'docs/defects.md · DEF-2026-10-17-A remedy line, RESIDUE (i) — with tests/gate4_red_set_fix.rs named there as the pin; archive/reviews/2026-10-16-constraints-publication-gate1.md §64 (the same residue, recorded so it is not mistaken for clean)',
    "RESIDUE (i), ASSERTED AS IT STANDS AND NOT AS ONE WOULD WISH IT: `listeners: {}` — PRESENT and MALFORMED, as against the three ABSENCE states `LIVE-13.22` drives — is STILL refused with the ADDRESS-SEGMENT form and STILL carries the empty container `in ''`, because a landed test PINS that whole sentence; this cell asserts the residue rather than the repair, so it must go RED the day the residue is cleaned",
    residueMap.threw && isSingleForm(residueMap.err) && /is not a legal address segment/.test(residueMapMsg)
      && /\bin ''/.test(residueMapMsg) && /listeners/.test(residueMapMsg),
    residueMap.threw ? `${residueMap.err.status} :: ${residueMapMsg}` : 'no throw — the residue was CLEANED; this cell must be re-derived');
  // The walk-side residue is driven on the SAME instance the scenario already holds. **THE FIRST RUN OF THIS
  // CELL WAS RED AND ITS OWN RED WAS THE INSTRUMENT'S FAULT, WHICH IS WHY THE SHAPES ARE NAMED HERE:** this
  // scenario's `['ev','child']` is a LEAF, so a read THROUGH it is the `LeafHasNoDownstream` arm, while
  // `['ev','nope']` is `AddressNotFound`; the first draft read `['ev','child','deeper']` and got
  // `AddressNotFound` for `'deeper'` — because that path is not the one the assertion assumed. **The two arms
  // the defect row names are therefore driven as the two DISTINCT states they are**, each asserted at its own
  // code, so neither can pass by the other's answer.
  const residueLeaf = thrown(() => inst.read(['ev', 'nope']));
  const residueInner = thrown(() => inst.read(['ev', 'child', 'deeper']));
  A(`${sc}.25`, 'docs/defects.md · DEF-2026-10-17-A remedy line, RESIDUE (ii); store §4.1 (the walk\'s own answers) — read at its CURRENT standing and not re-derived',
    "RESIDUE (ii), ASSERTED AS IT STANDS: `read` with an UNSOUGHT tier still answers the WALK's own code rather than any tier shape — `AddressNotFound` where the container holds no such segment — both remain the single form with the store's generated message, and neither names a tier; this cell asserts the residue rather than the repair, so it must go RED the day the walk's answers are re-derived",
    residueLeaf.threw && isSingleForm(residueLeaf.err) && residueLeaf.err.status === 'AddressNotFound'
      && residueInner.threw && isSingleForm(residueInner.err) && residueInner.err.status === 'AddressNotFound'
      && !/tier/.test(String(residueLeaf.err.message)) && !/tier/.test(String(residueInner.err.message)),
    `['ev','nope'] → ${residueLeaf.threw ? `${residueLeaf.err.status} :: ${String(residueLeaf.err.message).slice(0, 100)}` : 'no throw'} · ['ev','child','deeper'] → ${residueInner.threw ? `${residueInner.err.status} :: ${String(residueInner.err.message).slice(0, 100)}` : 'no throw'}`);
  A(`${sc}.11`, '§2.4 item 7 (a) step 1; A81; DD-51; parameter-semantics.md §2.17 dated clause 2',
    'NOTHING IS LEFT BEHIND by that refusal either: the whole register is UNCHANGED, and a listen at the refused address REACHES THE STORE (so the home held nothing there — the store answered a fresh mint, not an existing entry)',
    rel(registerSnapshot(inst), before) && !thrown(() => inst.listen(['ev', 'ghost'])).threw,
    Object.keys(registerSnapshot(inst)).join(','));
  const w3 = inst.write(['ev', 'child3'], 'temp', { n: 3 });
  A(`${sc}.12`, '§2.4 item 7 (a) step 1 (the standing sibling, undisturbed); contract.md §5.5 dated clause (clause 2)',
    'the STANDING registration at the held address is undisturbed by both refusals: the write still fires the second function exactly once, and the trigger set is not left short by either refusal',
    second.length === 2 && w3.triggered.length === 1,
    `second fn fired ${second.length}×; triggered ${JSON.stringify(w3.triggered?.length)}`);

  // ── (4) `off(h)`: `undefined`, and the address does not fire afterwards ───────────────────────────────
  const offAnswer = thrown(() => inst.unlisten(h));
  A(`${sc}.13`, '§2.4 item 7 (b) (the OWN arm); DD-54',
    'off(handle) over an in-domain registered identity answers undefined and does NOT throw',
    !offAnswer.threw && offAnswer.value === undefined, offAnswer.threw ? statusOf(offAnswer) : String(offAnswer.value));
  const w4 = inst.write(['ev', 'child4'], 'temp', { n: 4 });
  A(`${sc}.14`, '§2.4 item 7 (b) step 3; DD-54; contract.md §5.5 dated clause (clause 2, "off FAILING TO REMOVE THE REGISTRY ENTRY")',
    'a later write at that address DOES NOT FIRE — the function neither runs nor appears in the trigger set, while the store-side withdrawal stands visible in the EMPTY set',
    second.length === 2 && w4.triggered.length === 0, `${w4.triggered.length} triggered member(s); second fn fired ${second.length}×`);

  // ── (5) THE CONTRAST `unlisten`: the store-side withdrawal ONLY ───────────────────────────────────────
  // THE BRANCH IS MINTED FIRST, exactly as ['ev'] was at the top of this scenario (`store §4.1 #2`).
  inst.write(['uu'], 'temp', {});
  const uu = [];
  const hU = onRoute(['uu'], (...args) => uu.push(args));
  const unAnswer = thrown(() => inst.unlisten(hU));
  const w5 = thrown(() => inst.write(['uu', 'c'], 'temp', { n: 5 }));
  A(`${sc}.15`, '§2.4 rule 4 (UNMOVED); §2.3 item 4; A80; surface.md §2.3 dated clause 3',
    'unlisten answers undefined, withdraws the store-side home entry ONLY, and the withdrawn function NEVER FIRES — and the store-side withdrawal is visible in the EMPTY trigger set of a write whose address the withdrawn listener held',
    !unAnswer.threw && unAnswer.value === undefined && uu.length === 0 && !w5.threw && w5.value.triggered.length === 0,
    `unlisten ${unAnswer.threw ? statusOf(unAnswer) : 'undefined'}; uu fired ${uu.length}×; write ${w5.threw ? statusOf(w5) : `triggered ${w5.value.triggered.length} member(s)`}`);
  const hU2 = inst.listen(['uu']);
  const w6 = inst.write(['uu', 'c2'], 'temp', { n: 6 });
  A(`${sc}.16`, '§2.4 rule 4; §2.3 item 2; contract.md §5.5 dated clause (clause 3, `S-WITHDRAW`)',
    'a later re-listen at that address mints a DIFFERENT handle, that write carries the NEW identity, and the OLD function still does not fire',
    hU2 !== hU && w6.triggered.includes(hU2) && uu.length === 0,
    `new handle differs: ${hU2 !== hU}; triggered carries it: ${w6.triggered.includes(hU2)}; old fn fired ${uu.length}×`);
  A(`${sc}.17`, '§2.4 rule 4; §2.4 item 6 (b); §2.7 item 3; DD-22',
    'the SAME handle comes back for the SAME token — the identity is stable — and the trigger set is asserted by MEMBERSHIP, never by order or position',
    inst.listen(['uu']) === hU2 && w6.triggered.includes(hU2), 'identity stable');

  // ── (6) A REAL `file`-TIER SAVE ON THE TERMINAL ARM, AND A FRESH INSTANCE BOOTED ON THE SAME PATH ─────
  const dir2 = fsPath('live13/boot');
  fs.mkdirSync(dir2, { recursive: true });
  const filePath2 = path.join(dir2, 'state.json');
  const cfg2 = { filePath: filePath2, journalLength: 4, listeners: [] };
  const A_ = ns.storeCreate(cfg2);
  // ⟶ RE-DERIVED 2026-10-17 (THIS PASS): **STALE GREENS DOC**, `RCA-8(g)` — the same re-point as `LIVE-4`'s.
  // `surface.md §2.11` clause 1 forbids the verb the file I/O this cell expected, and clause 2 puts the save on
  // the TERMINAL ARM. The cell's SUBJECTS (a REAL file at the caller's own path; the FRESH instance over the
  // same cfg re-loading the durable value; existence and size ONLY, never a byte read — `DD-5`) are KEPT WHOLE.
  const wD = A_.write(['durable-seed'], 'file', 'SEED');
  const saved13 = kernelSaveFileLive(A_, ['durable'], 'DURABLE-13');
  const B = ns.storeCreate(cfg2);
  const rb = thrown(() => B.read(['durable']));
  A(`${sc}.18`, "surface.md §2.11 clause 2 (the save is the TERMINAL ARM's act); store §7.2 item 5; DD-5 (existence and size ONLY — no JS-side byte read is taken)",
    'the file-tier save on the terminal arm produced a REAL file at the caller-spelled path, and the FRESH instance booted over the SAME cfg re-loaded the durable value',
    !saved13.threw && fs.existsSync(filePath2) && fs.statSync(filePath2).size > 0 && !rb.threw && rb.value === 'DURABLE-13',
    saved13.threw ? `the arm threw ${statusOf(saved13)}` : (rb.threw ? statusOf(rb) : `${String(rb.value)} · ${fs.existsSync(filePath2) ? fs.statSync(filePath2).size : 0} bytes on disk · opId ${String(wD.op?.opId)}`));
  const w7 = B.write(['durable'], 'temp', 7);
  A(`${sc}.19`, '§2.4 rule 4 ("the registry is released with the instance and by nothing else"); DD-15; DD-17; store §7.2 item 6',
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): the declared set is TWELVE, `10 + 1 + 1 = 12` ✓**
    // (`§2.4` item 9 (f)'s clause of that date, item `1`, `13 → 12`). The cell's subject — the home is EMPTY
    // in the new instance, the registrations being INSTANCE-SCOPED — is unmoved, and its `triggered` limb,
    // which is the subject, moves no term.
    "THE HOME IS EMPTY IN THE NEW INSTANCE — the registrations are INSTANCE-SCOPED: the new instance's own member set is the declared TWELVE (`§2.4` item 9 (f)'s clause of 2026-10-18, `10 + 1 + 1 = 12`), its write under the address the OLD instance registered carries NO triggered member and fires nothing there",
    Object.getOwnPropertyNames(B).sort().join(',') === 'addConstraint,constraintOff,constraintOn,constraints,delete,listen,read,readLiteral,register,rollback,unlisten,write' && w7.triggered.length === 0,
    `members ${Object.getOwnPropertyNames(B).sort().join(',')}; triggered ${w7.triggered.length} member(s)`);

  end(sc, `on returned ${onHandleForm} at ['ev'] and the write ran the function 1× with the address ["ev","child"]; a second on at the held address answered the SAME handle and replaced the function (first 1×, second 2×); a non-function listener and the malformed address 'ev.bad' each answered AddressMalformed in the single verbose form and left the register unchanged; off(${JSON.stringify(h)}) answered undefined and the address fired ${w4.triggered.length} member(s) afterwards; unlisten withdrew the store-side entry only, with the re-listen minting a DIFFERENT handle and the old function never firing; the file-tier save on the terminal arm at ${filePath2} stands and the FRESH instance read 'DURABLE-13' back with an EMPTY home`);
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
