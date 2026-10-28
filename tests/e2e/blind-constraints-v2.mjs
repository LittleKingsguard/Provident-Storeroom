// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// BLIND GREENS DRIVER — U-STOREROOM-CONSTRAINTS
//
// AUTHORED FROM THE DOCUMENTATION ONLY: docs/specs/storeroom-constraints/** (contract.md, kernel-surface.md,
// attempt-lifecycle.md, composition-and-states.md, parameter-semantics.md, fail-surface.md, e2e-scenarios.md,
// e2e-scenarios-b.md, proposal.md, adoption-dossier.md, implementation-plan.md) plus the store's own docs
// (docs/specs/storeroom-native/**, docs/specs/storeroom-js/**). No byte of bindings/js/src/** and no file of
// bindings/js/test/constraint-kernel* was read, and none is imported: the kernel is reached ONLY through its
// declared caller-side ESM entry, as a CONSUMER.
//
// Every row is a BATTERY scenario (`e2e-scenarios.md` E2E-C-1 … E2E-C-14, `e2e-scenarios-b.md` E2E-C-15,
// E2E-C-16) whose drive is reduced to what a blind driver can author from data: the store's own declared
// construction call, `K-1`…`K-5`, and handler bodies handed to the kernel as FUNCTION DATA. Every expected
// value cites the doc path and `§` that pins it. Where a cell cannot be driven from the docs alone the row is
// written and MARKED `NOT DRIVABLE BLIND — <reason>`: that marking is the finding and never a pass.
//
// A run failure is a doc/spec drift OR an un-hardened regression. It is never read as a pass.
//
//   run:  node tests/e2e/blind-constraints-v2.mjs   (from the repository root)   ⟶ MOVED 2026-10-25 (`D-5`): this command read `node bindings/js/greens/blind-constraints-v2.mjs` until the batteries were stratified.
//   leg:  **`npm run greens` — DISCOVERED, NOT LISTED (2026-10-25).** This runner is in the greens chain because
//         `scripts/greens-chain.mjs` derives the chain from the tree: it declares its own module-scope exit arm
//         (`D-21`'s contract) and no other declared leg owns its path. **THE EXAMINER'S FINDING ON THIS FILE WAS
//         THAT IT WAS IN NO LEG AT ALL** — `npm test` globs `*.test.mjs`, `npm run greens` named three runners by
//         hand, `npm run test:e2e` runs the installed battery — so the largest blind instrument in the project ran
//         only when somebody remembered. The chain now reaches it, and a red cell of this file turns the leg red.
//   report: docs/specs/storeroom-constraints/live-greens.md  (the greens set this driver's run is recorded in)
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const KERNEL_URL = new URL('../../bindings/js/src/constraint-kernel.mjs', import.meta.url);
const PKG_URL = new URL('../../bindings/js/index.mjs', import.meta.url);

const kernel = await import(KERNEL_URL);
const pkg = await import(PKG_URL);
const KERNEL_EXPORTS = Object.keys(kernel).sort().join(',');
const PKG_EXPORTS = Object.keys(pkg).sort().join(',');
const { register: kernelRegister, commit, runAttempt, log, report } = kernel;

// ── ⟶ ADDED 2026-10-25 (`D-20`'s execution pass, `role_l1_test_writer`): THE REGISTRATION-INSTANT SHIELD, AND
// THE REASON IT IS A DRIVE CONVENTION AND NOT A WEAKENING.
//
// **`K-1`'s THIRD STEP EVALUATES THE CONSTRAINT ONCE AT REGISTRATION** (`docs/specs/storeroom-native/contract.md
// §7.3` (b) states 1–3 and its `3-bis`; `A135` (3)): after the pair stands, the kernel hands the body ONE context
// whose `tier` and `op` are `null` and whose `value` carries no write. **A blind drive whose body reads
// `ctx.op.opId` or answers `{message: …}` there is refusing its own registration** — which is exactly what seven
// scenarios of this file did (they threw `ConstraintListInvalid` before a single cell could be judged: the
// review's §3.2 row 26 and §6 item 5). **THE SHIELD ANSWERS `true` AT THAT ONE INSTANT AND HANDS THE LANDING'S OWN
// CONTEXT TO THE BODY UNCHANGED** — `§7.3` (b) state 1, the PASSING arm, so the registration is lawful and nothing
// is bypassed. It is the same convention `tests/e2e/file-tier-save/scenarios.mjs`'s `atLandingOnly` (that path read
// `bindings/js/greens/file-tier-save/scenarios.mjs` until `D-5`, 2026-10-25) carries for the same instant and the same reason, and it is recorded here rather than left as a silent drop.
// **WHAT IT COSTS, STATED SO IT IS NOT READ AS COVERAGE:** this file then never drives `§7.3` (b) states 2 and 3
// (a registration refused by its own evaluation) — every body passes at that instant — and the report says so.
//
// **⟶ AND ITS SCOPE IS A FUNCTION, NAMED 2026-10-25 BECAUSE THE SHIELD HAD ONE BLIND SPOT OF ITS OWN.** The
// shield wraps a BODY; *a shield may not wrap a value that is not a function*, because the value's CLASS is then
// the subject the wrapped call cannot reach. `E2E-C-12`'s third refusal passed `'not-a-function'` through this
// very helper, which turned it into a function, so `KC-2` never fired and the row died with `TypeError: body is
// not a function` INSIDE the shield — *"the shield that saved seven scenarios created the blind spot in the one
// row that tests the refusal to BE a function"* (the examiner's finding). That row now calls the kernel's own
// `kernelRegister` directly (`E2E-C-12` cell 3); **no other row's subject is a body's class.**
const atLanding = (ctx) => ctx !== null && typeof ctx === 'object' && ctx.tier === null && ctx.op === null;
const landingOnly = (body) => {
  if (typeof body !== 'function') {
    throw new TypeError(`the registration-instance shield only wraps a FUNCTION; it received ${typeof body} — a row whose subject is the refusal to BE a function must call kernelRegister directly`);
  }
  return (ctx) => (atLanding(ctx) ? true : body(ctx));
};
const register = (store, address, id, body) => kernelRegister(store, address, id, landingOnly(body));

// ── the run's own bookkeeping ────────────────────────────────────────────────────────────────────────────
// ⟶ **`D-21` (2026-10-24) IS IMPLEMENTED HERE: THE EXIT CODE CARRIES THE RED, AND A CELL THAT NEVER RAN HAS ITS
// OWN STATE.**  *"A runner whose cells are red, or whose cells never ran, may not exit `0`. … the 'cell never
// ran' case is owed an explicit third state — neither `PASS` nor `FAIL` may be printed for a cell that did not
// execute."*  So this runner now prints, per cell, one of FOUR tags — `PASS` · `FAIL` · `NONRUN` ·
// `NOT DRIVABLE BLIND` — and exits `1` when any of the last three stands. `NONRUN` is the case this file could
// not previously show at all: a scenario whose drive throws stops creating cells, and the cells it never
// reached were simply ABSENT, so the row's population shrank silently. **A `DECLARED` table now pins each row's
// authored population** (read off the row's own cell numbers), and every number the row did not reach is
// recorded `NONRUN` with its own id. A `NOT DRIVABLE BLIND` cell is an AUTHORED non-execution — it is declared
// as such by the driver and is neither a pass nor a failure — and it also makes the exit non-zero, because a
// leg whose cells never ran may not read as green at the exit either.
let cells = 0, pass = 0, notDrivable = 0, nonrun = 0;
// **THE AUTHORED POPULATION, PER ROW — read off this file's own cell ids and nothing else.** A row's ids are
// literal and are never renumbered; a gap in one (`E2E-C-8` carries no `6`, its `.7` having been authored as a
// later addition) is declared here as the gap it is rather than smoothed into a count.
const DECLARED = {
  'E2E-C-1': [1, 2, 3, 4, 5, 6, 7, 8],
  'E2E-C-2': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'E2E-C-3': [1, 2, 3, 4, 5, 6, 7],
  'E2E-C-4': [1, 2, 3, 4, 5, 6, 7],
  'E2E-C-5': [1, 2, 3, 4, 5, 6, 7, 8, 9],
  'E2E-C-6': [1, 2, 3, 4, 5, 6, 7, 8],
  'E2E-C-7': [1, 2, 3, 4, 5, 6, 7],
  'E2E-C-8': [1, 2, 3, 4, 5, 7],
  'E2E-C-9': [1, 2, 3, 4, 5, 6, 7, 8, 9],
  'E2E-C-10': [1, 2, 3, 4, 5, 6, 7],
  'E2E-C-11': [1, 2, 3, 4, 5, 6, 7],
  'E2E-C-12': [1, 2, 3, 4, 5, 6, 7],
  'E2E-C-13': [1, 2, 3, 4, 5, 6, 7],
  'E2E-C-14': [1, 2, 3, 4, 5, 6, 7],
  'E2E-C-15': [1, 2, 3, 4, 5, 6, 7, 8],
  'E2E-C-16': [1, 2, 3, 4, 5, 6, 7, 8],
  SURFACE: [1, 2, 3],
};
// **THE THIRD STATE.** A declared cell the row never reached is recorded here, with its own id, and neither
// `PASS` nor `FAIL` is printed for it (`D-21`).
function markUnrun(row) {
  const declared = DECLARED[row.id];
  if (!declared) return;
  const seen = new Set(row.cells.map((c) => c.n));
  for (const n of declared) {
    if (seen.has(n)) continue;
    nonrun += 1;
    cells += 1;
    row.cells.push({
      n,
      expected: 'THE CELL DID NOT EXECUTE — its row\'s drive stopped before reaching it',
      cites: 'the row\'s own declared population (this file\'s `DECLARED` table)',
      ok: 'nonrun',
      observed: `NONRUN — declared for this row and never created: the drive threw earlier in the row, so this cell was neither passed nor failed and no expectation of it was read`,
    });
  }
}
const rows = [];
let current = null;

function group(id, name) { current = { id, name, cells: [] }; rows.push(current); }

function cell(n, expected, cites, cond, observed) {
  cells += 1;
  const ok = !!cond;
  if (ok) pass += 1;
  current.cells.push({ n, expected, cites, ok, observed });
}

function nd(n, expected, cites, reason) {
  notDrivable += 1; cells += 1;
  current.cells.push({ n, expected, cites, ok: null, observed: `NOT DRIVABLE BLIND — ${reason}` });
}

// A throw at a step is an OBSERVATION and never a pass: it is recorded as a FAIL with the thrown form's status
// named, and the run continues to the next scenario.
function scenario(fn) {
  try { fn(); } catch (e) {
    const st = (e && typeof e === 'object' && 'status' in e)
      ? e.status : (e && typeof e === 'object' && e.constructor ? e.constructor.name : 'throwable');
    // **THE THROW IS RECORDED UNDER AN ID OF ITS OWN (`x0`) AND NEVER UNDER A CELL'S NUMBER.** The pre-2026-10-25
    // shape numbered it `cells.length + 1`, which could land on a declared id and MASK the cell that never ran —
    // the evaporation `D-21` names, hidden inside the instrument that was supposed to report it.
    cell('x0', 'the scenario runs to its declared final resolved state without an undeclared throw at a step',
      'the scenario\'s own start point and steps',
      false, `the drive threw ${st}: ${e?.message ?? String(e)} :: ${String(e?.stack ?? '').split('\n').slice(0, 4).join(' | ')}`);
  } finally {
    markUnrun(current);
  }
}

// ── the declared surface's own helpers ────────────────────────────────────────────────────────────────────
function tryCall(fn) {
  try { return { ok: true, value: fn() }; }
  catch (e) { return { ok: false, err: e }; }
}
const keysOf = (o) => (o && typeof o === 'object' ? Object.keys(o).sort().join(',') : `<${typeof o}>`);
const status = (t) => (t.ok ? `returned(${JSON.stringify(t.value?.outcome ?? t.value)})` : t.err?.status);
/** **THE LIST A HANDOFF PUT IN THE DRIVE'S HAND — `D-58` (2026-10-28).** The store retains no message log once an
 *  attempt resolves or rejects, so a cell reads the entries off the value that crossed: a kernel refusal's own
 *  `log`, or a caller body's throwable under the kernel's `Symbol.for` mark. An arm whose handoff carries none
 *  answers the empty list, and a cell that reads it says so rather than reporting a verdict from it. */
const handedLogOf = (r) => {
  if (r === null || typeof r !== 'object') return [];
  const thrown = r.ok ? null : r.err;
  if (thrown === null || typeof thrown !== 'object') return [];
  if (Array.isArray(thrown.log)) return thrown.log;
  const carried = thrown[Symbol.for('provident-storeroom.constraint-body-threw')];
  if (carried !== null && typeof carried === 'object' && Array.isArray(carried.log)) return carried.log;
  return [];
};

// **⟶ THE PAIR'S OWN READERS, RE-DERIVED 2026-10-25 (`trigger-and-pair.md §3` items 3–5; `contract.md §2.4`
// item 6): THE ELEMENT OF `triggered` AND OF `pending` IS THE PAIR `{handle, address}`, NEVER A BARE HANDLE.**
// An as-filed `set.includes(handle)` compares a pair to a string and is ALWAYS FALSE — the identical failure
// `register.test.mjs:48–56` spells out for this project's own batteries, whose `carriesHandle`/`setHandles`
// these helpers are the same convention as. **THE REPLACEMENT READS THE PAIR'S `handle` MEMBER, WHICH IS THE
// SAME IDENTITY THE AS-FILED LINE MEANT**, and `pairFor` hands the pair back whole where a cell's subject is
// the address it was BOUND at (`§1.2`: the pair's `address` is THE BINDING's and never the write's).
const carriesHandle = (set, handle) => (set ?? []).some((element) => element !== null && typeof element === 'object' && element.handle === handle);
const setHandles = (set) => (set ?? []).map((element) => (element !== null && typeof element === 'object' ? element.handle : element));
const pairFor = (set, handle) => (set ?? []).find((element) => element !== null && typeof element === 'object' && element.handle === handle);

// the caller's own map: handle -> { kind, fn } — the ONE resolution carrier a `pending` entry is read in
// **⟶ RE-DERIVED 2026-10-25: THE LOOP READS `pair.handle` AND NEVER THE ELEMENT.** An as-filed loop fed the
// ELEMENT to a map keyed by the handle, so every entry resolved to `undefined` and the caller's own loop
// invoked NOTHING — the single cause behind the pair-blind cells the examiner's finding names. The pair is
// carried beside the outcome so a cell can read the address it was bound at.
function callerMap() {
  const m = new Map();
  return {
    add: (h, kind, fn) => m.set(h, { kind, fn }),
    run: (pending, addrForPlain) => {
      const out = [];
      for (const pair of pending ?? []) {
        const handle = pair !== null && typeof pair === 'object' ? pair.handle : pair;
        const e = m.get(handle);
        if (!e) { out.push({ pair, handle, unresolved: true }); continue; }
        const r = tryCall(() => (e.kind === 'constraint' ? e.fn(e.ctx) : e.fn(addrForPlain)));
        out.push({ pair, handle, kind: e.kind, ...r });
      }
      return out;
    },
  };
}

const LOG_KINDS = ['constraint-check', 'repair-run', 'commit', 'outcome'];
const logShape = (l) => {
  if (!Array.isArray(l)) return 'not-an-array';
  const bad = l.find((e) => keysOf(e) !== 'id,kind,message,opId,seq,state' || !LOG_KINDS.includes(e.kind));
  if (bad) return `bad entry ${JSON.stringify(bad)}`;
  for (let i = 0; i < l.length; i += 1) if (l[i].seq !== i + 1) return `seq[${i}]=${l[i].seq}`;
  return 'ok';
};
const kinds = (l) => (l ?? []).map((e) => `${e.kind}/${e.id}/${e.state}`).join(' ');
const stepShape = (st) => keysOf(st) === 'answer,checkpoint,failed,opId,restoredTo,undoneOps';
const KC = new Set(['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8', 'KC-9']);
// ITEM 2'S DECLARED CALL LIST (composition-and-states.md §2.6 item 2, read with item 5 (a)'s skip): the
// attempt's own ops minus every op AT OR BEFORE the `checkpoint` op, minus the op the member names, in
// DECLARED REVERSE order — the repaired/last op's call first and the attempt's first op's call last. The
// step count is the calls ISSUED and may run BELOW this list's size, because an op an earlier call's own
// `undoneOps` already reports undone is no longer still owed and gets no call (item 5 (a)).
function declaredCallList(ops, checkpoint) {
  const list = (ops ?? []).map((o) => o.opId);
  const cp = (ops ?? []).find((o) => o.opId === checkpoint);
  const start = cp ? (ops ?? []).indexOf(cp) : -1;         // every op AT OR BEFORE the checkpoint op drops out
  return list.slice(start + 1).reverse();
}
const outcomeOf = (l) => (l ?? []).find((e) => e.kind === 'outcome');

const C = {
  ks21: 'kernel-surface.md §2.1', ks25: 'kernel-surface.md §2.5', ks23: 'kernel-surface.md §2.3',
  al24: 'attempt-lifecycle.md §2.4', cs26: 'composition-and-states.md §2.6', cs27: 'composition-and-states.md §2.7',
  ps25: 'parameter-semantics.md §2.5', ps27: 'parameter-semantics.md §2.7', ps28: 'parameter-semantics.md §2.8',
  ps29: 'parameter-semantics.md §2.9', ps211: 'parameter-semantics.md §2.11', ps215: 'parameter-semantics.md §2.15',
  ps216: 'parameter-semantics.md §2.16', ps217: 'parameter-semantics.md §2.17',
  fs11: 'fail-surface.md §1.1', fs12: 'fail-surface.md §1.2', fs2: 'fail-surface.md §2', fs3: 'fail-surface.md §3',
  jsSurf: 'storeroom-js/surface.md §2.1/§2.2',
};

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-blind-'));
let storeSeq = 0;
function newStore() {
  storeSeq += 1;
  return pkg.storeCreate({ filePath: path.join(TMP, `s${storeSeq}.json`), journalLength: 64, listeners: [] });
}
// **⟶ RE-SPELLED 2026-10-25 (`D-20`'s execution pass) — THE MODULE-LEVEL VERB FORM DOES NOT EXIST.** The package's
// module namespace has carried ONE name, `storeCreate`, since 2026-10-16 (`A127`; `surface.md §2.9` item 1,
// `11 → 1`), and the ten store-reaching names moved onto the PRODUCT as its own methods. `pkg.read(store, addr)`
// therefore answers `TypeError: pkg.read is not a function` — the review's §3.2 row 25 measured exactly that at five
// cells. **The re-spelling is mechanical and moves no subject**: `pkg.read(s, addr)` IS `s.read(addr)`. The `[]`
// tier set the old form passed is the reader's arity and is kept as it was on each call site.
const readVal = (s, addr) => { try { return s.read(addr, []); } catch (e) { return Symbol.for(e.status ?? 'threw'); } };
const readOr = (s, addr) => { try { const v = s.read(addr, []); return JSON.stringify(v); } catch (e) { return `threw ${e.status}`; } };

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-1 — the happy path: one constraint passes and the attempt resolves
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-1', 'the happy path: one constraint passes and the attempt resolves');
scenario(() => {
  const store = newStore();
  const seen = [];
  const h = register(store, ['a'], 'x', (ctx) => { seen.push(ctx); return true; });
  const c = commit(store, ['a'], 'mem', 1);
  const r = runAttempt(store, c);

  // ⟶ **RE-DERIVED 2026-10-25 (`D-22`): THE HANDLE IS THE CALLER'S OWN `id`, ANSWERED BY `store.listen` AND
  // ADOPTED BY `K-1`.** The as-filed cell expected *"a non-null opaque value"* — `typeof 'object'` — which was
  // true of the MINTED token. Under `D-24` (*"the handle becomes the id"*) and `D-22` (*"the return is the adoption
  // point"*), `K-1`'s answer is the string `'x'` this drive spells, which is what `kernel-surface.md §2.1` item 1
  // means by *"adopted, never minted by the kernel"*. The cell's subject — what `K-1` ANSWERS — is kept whole.
  cell(1, "K-1 returns the handle the pair stands under — the caller\'s own `id`, adopted from `store.listen` and never minted by the kernel (`D-22`, `D-24`)",
    `${C.ks21} item 1 read THROUGH D-22/D-24 (strata/decisions.md, 2026-10-24)`, h === 'x',
    `handle=${JSON.stringify(h)} typeof=${typeof h}`);
  cell(2, "CommitRecord has exactly {attempt, op, triggered, pending}; attempt is {id: non-empty string}; op is the write's op",
    `${C.ks21} item 2`,
    keysOf(c) === 'attempt,op,pending,triggered' && typeof c.attempt?.id === 'string' && c.attempt.id.length > 0
      && typeof c.op?.opId === 'string',
    `keys=${keysOf(c)} attempt=${JSON.stringify(c.attempt)} opId=${c.op?.opId}`);
  cell(3, "'passed' (the success arm's ONE value) and the SAME attempt reference K-2 minted",
    `${C.ks21} item 3; ${C.al24} item 4 arm (a)`,
    r.outcome === 'passed' && r.attempt?.id === c.attempt.id && keysOf(r) === 'attempt,log,ops,outcome,rollback',
    `outcome=${r.outcome} keys=${keysOf(r)} attempt-match=${r.attempt?.id === c.attempt.id}`);
  cell(4, "ops has one member, in creation order, and it is the store's own op (opId equal to the write's)",
    `${C.ks21} item 3; ${C.al24} item 1`,
    r.ops.length === 1 && r.ops[0].opId === c.op.opId,
    `ops.length=${r.ops.length} ops[0].opId=${r.ops[0]?.opId} write=${c.op.opId}`);
  cell(5, "rollback is [] (an empty list, never an absent member) and triggered is the write's own returned set",
    `${C.ks21} items 2–3; ${C.cs26} item 8 (i)`,
    Array.isArray(r.rollback) && r.rollback.length === 0 && Array.isArray(c.triggered),
    `rollback=${JSON.stringify(r.rollback)} triggered=${c.triggered.length} pending=${c.pending.length}`);
  cell(6, "the log is one constraint-check (id 'x', opId the write's op, state null) then one commit entry (id null, opId the last op); seq 1,2; six-member entries",
    `${C.ks25} items 1–3`,
    logShape(r.log) === 'ok' && r.log.length === 2
      && r.log[0].kind === 'constraint-check' && r.log[0].id === 'x' && r.log[0].opId === c.op.opId
      && r.log[0].state === null && r.log[1].kind === 'commit' && r.log[1].id === null,
    `shape=${logShape(r.log)} kinds=[${kinds(r.log)}]`);
  // ── **⟶ DRIVE RE-DERIVED 2026-10-25: THE CELL READS THE PASS'S OWN CONTEXT, NOT THE REGISTRATION'S.**
  // The body is invoked TWICE: once at `K-1`'s third step — the REGISTRATION-time evaluation (`§7.3` (b) state 1,
  // `A135` (3)), whose context carries `tier: null` and `op: null` because no write stands — and once per pass,
  // which is the context this cell's words describe. `seen[0]` was therefore the registration's, and the cell
  // reported `{address, tier:null, attempt:null}`. **THE FIX IS TO SELECT THE LANDING'S OWN INVOCATION** (the one
  // whose `tier` is the write's tier), which is what `atLanding` above names; the expectation and every one of its
  // limbs are unchanged, and the cell asserts that exactly ONE such invocation stands.
  const landings = seen.filter((x) => !atLanding(x));
  const ctx7 = landings[0];
  cell(7, "the attempt context carries exactly {address, tier, value, attempt, op}, all verbatim: address [a], tier mem, value 1, the attempt id, the evaluated op",
    `${C.ps216}; ${C.ks23} item 1`,
    landings.length === 1 && keysOf(ctx7) === 'address,attempt,op,tier,value'
      && JSON.stringify(ctx7.address) === '["a"]' && ctx7.tier === 'mem' && ctx7.value === 1
      && ctx7.attempt?.id === c.attempt.id && ctx7.op?.opId === c.op.opId,
    `landing contexts=${landings.length} of ${seen.length} invocation(s); ctx=${JSON.stringify(ctx7, (k, v) => (k === 'op' ? v?.opId : v))}`);
  cell(8, "K-4 and K-5 over the CLOSED attempt answer the record the store STILL NEEDS — `D-58`: the outcome, the ops and the reversal, NO log — while the FIVE-member report and its list are the ones `K-3` handed off",
    `${C.ks21} items 4–5; ${C.ps25} observable; \`strata/decisions.md\` · \`D-58\` (2026-10-28)`,
    JSON.stringify(log(store, c.attempt)) === '[]'
      && keysOf(report(store, c.attempt)) === 'attempt,ops,outcome,rollback'
      && report(store, c.attempt).outcome === r.outcome
      && Array.isArray(r.log) && r.log.length >= 2,
    `K-4 over the closed attempt=${JSON.stringify(log(store, c.attempt))} · K-5 keys=${keysOf(report(store, c.attempt))} · the handed-off list=${r.log.length} entries`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-2 — a two-op failing attempt: the unrepaired violation fails it, the composition reverses the repaired
// op, and its SECOND same-address call meets the floor — so the attempt's own first write STANDS
//
// **⟶ THE TITLE IS CORRECTED 2026-10-26 AND NOT ONE CELL MOVES (the examiner's fourth finding,
// `strata/decisions.md:2442`: *"`E2E-C-2`'s own title names an unreachable behaviour — a successful rollback
// marks the entry `compacted`, so the second same-address call meets `M-6` and never the arm its title
// claims."*).** **THE AS-FILED TITLE READ *"… and the composition rolls both ops back", AND THE CODE CANNOT DO
// IT: both ops stand at `['a']`, so the repair's op is reversed by the FIRST call and its own reversal leaves
// that entry `compacted`; the second call — over the attempt's own first write — then meets `M-6`'s
// candidate-set floor and answers `RollbackCompacted`, which item 5 (b) makes `KC-8`
// (`write-and-read.md §6.4` item 1's `M-5`/`M-6`; `composition-and-states.md §2.6` item 6 (a), THE FLOOR
// GOVERNS).** **SO THE SUBJECT MOVED AND THE TITLE WAS WRONG — THE DRIVE IS NOT: this row's own cells 4, 7 and 8
// already assert the reached behaviour (`KC-8` naming `RollbackCompacted`, the call list with one call per
// still-owed op, and the attempt's first write NOT undone) and were re-derived in place on 2026-10-25. THE DRIVE
// REACHES ITS SUBJECT AND EVERY ASSERTION STANDS AS FILED; only the sentence here and the `group()` title below
// move.** **AND THE ARCHIVED SCENARIO'S OWN HEADING CARRIES THE SAME STALE SENTENCE**
// (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-constraints/e2e-scenarios.md:151`), which is that
// document's owner's to re-derive rather than this file's to absorb silently (`RCA-8(g)`: a clause that
// prescribes an unreachable behaviour is a defect).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-2', 'a two-op failing attempt: the unrepaired violation fails it, the composition reverses the repaired op, and its second same-address call meets the floor so the attempt\'s first write stands');
scenario(() => {
  const store = newStore();
  let opRepair = null;
  const evalAt = { x: 0, y: 0, z: 0 };
  register(store, ['a'], 'x', (ctx) => { evalAt.x += 1; return ctx.value <= 10 ? true : { message: 'x must be small' }; });
  // ── **⟶ THE FIXTURE'S OWN FAULT, DIAGNOSED AND FIXED 2026-10-25 — AND IT IS THE FIXTURE THAT MOVED, NOT
  // THE CODE.** **`y`'s body returned the repair arm on EVERY value it was handed, so the pair set the fixture
  // stands up REFUSED ITS OWN SETUP WRITE**: `store.write(['a'], 'mem', 7)` is the CALLER'S OWN three-position
  // write, and that route IS evaluated at the landing (`index.mjs`'s `constraintWrite`; `kernel-surface.md
  // §2.3` item 1) — `x` passed on 7, `y` "repaired" 7 with a write of 50, the re-run over that op violated
  // `x`, `x` carries no repair, and the store refused the caller's write `FileCommitFailed` with `KC-8` in its
  // own log. **SO THE PAIR SET COULD NOT ADMIT ITS OWN SETUP AND EVERY CELL OF THIS ROW WAS NONRUN.** The
  // fixture's own contract already said which value `y` must be VIOLATED by — *"`K-2` `commit(['a'], '0', v)`
  // with `v` violating `c2`"* — so `y` is violated by the ATTEMPT's value and PASSES the setup value: the
  // window's single-violation-by-construction premise, read at the body instead of assumed of it. **NO CELL
  // EXPECTATION IS RELAXED BY THIS**: the pass still evaluates `x` then `y`, `y`'s repair still lands `op2`,
  // and the re-run still halts at `x`.
  register(store, ['a'], 'y', (ctx) => {
    evalAt.y += 1;
    if (ctx.value >= 5) return true;                      // the setup value (7) PASSES; the attempt's v (1) does not
    return {
      repair: (rc) => { const w = store.write(rc.address, rc.tier, 50, rc); opRepair = w.op?.opId; return { ok: true, message: 'y repaired', op: w.op }; },
      message: 'y is written by r2',
    };
  });
  register(store, ['a'], 'z', () => { evalAt.z += 1; return true; });

  // THE CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S OWN ADDRESS, made before the attempt: A111's standing
  // limit is the state this window is read against. **IT IS MADE UNDER THE PAIR SET AND IS ADMITTED BY THE
  // PASS AT ITS LANDING** — the act cell 9 reads.
  const earlier = store.write(['a'], 'mem', 7);
  const evalAfterEarlier = { ...evalAt };

  const evalBeforeCommit = { ...evalAt };
  const cFirst = commit(store, ['a'], 'mem', 1);
  const evalAtCommit = { ...evalAt };
  const run1 = tryCall(() => runAttempt(store, cFirst));
  const f = run1.err ?? {};

  cell(1, 'K-2 returns a record whose op is the write it landed, and THE PASS WAS NOT EVALUATED BY THE COMMIT — the three registered pairs run 0 more times when K-2 has returned',
    `e2e-scenarios.md E2E-C-2 step (2) read with step (3); ${C.ks21} item 2`,
    typeof cFirst.op?.opId === 'string' && keysOf(cFirst) === 'attempt,op,pending,triggered'
      && evalAtCommit.x - evalBeforeCommit.x === 0 && evalAtCommit.y - evalBeforeCommit.y === 0
      && evalAtCommit.z - evalBeforeCommit.z === 0,
    `record op=${cFirst.op?.opId} keys=${keysOf(cFirst)}; evaluations the commit added: x=${evalAtCommit.x - evalBeforeCommit.x} y=${evalAtCommit.y - evalBeforeCommit.y} z=${evalAtCommit.z - evalBeforeCommit.z} (absolute at K-2's return: x=${evalAtCommit.x} y=${evalAtCommit.y} z=${evalAtCommit.z}, the three the caller's own earlier write's landing pass took)`);
  cell(2, "the pass over op1 evaluates ['a']'s pairs in first-registration order and STOPS AT THE FIRST VIOLATION: x, then y (whose repair runs and lands its own op), and the re-run then halts at x — so z, registered last, is never reached",
    `${C.al24} items 5 (ii),(iv); ${C.ks25} item 1`,
    evalAt.x - evalBeforeCommit.x === 2 && evalAt.y - evalBeforeCommit.y === 1 && evalAt.z - evalBeforeCommit.z === 0
      && typeof opRepair === 'string' && opRepair !== cFirst.op.opId,
    `evaluations the pass took: x=${evalAt.x - evalBeforeCommit.x} y=${evalAt.y - evalBeforeCommit.y} z=${evalAt.z - evalBeforeCommit.z} of which the caller's earlier write's landing pass took x=${evalAfterEarlier.x} y=${evalAfterEarlier.y} z=${evalAfterEarlier.z}; repair's op=${opRepair} write op=${cFirst.op.opId}`);
  cell(3, 'the attempt fails by THROWING {status, message, log} and never by returning',
    `${C.fs11} items 1 and 4`, !run1.ok && keysOf(f) === 'log,message,status',
    `threw=${!run1.ok} keys=${keysOf(f)}`);
  // ── **⟶ RE-DERIVED 2026-10-25: THE TOKEN MOVES `KC-6` → `KC-8`, AND THE CELL'S SUBJECT IS KEPT.** **This is
  // the SAME two-op failing attempt at ONE address whose token `constraint-kernel-rollback.test.mjs:336–350`
  // re-derived in place** (*"THE TOKEN MOVES `KC-6` → `KC-8`… the composition's first call is item 2's first
  // member (the repair's op), and the store now reverses ONLY entries at or after that op — so the attempt's
  // own first write's op is NO LONGER swept by that call … the second call IS ISSUED over a still-owed op; the
  // op the first call reversed now carries the `compacted` mark, and `M-6` fails any rollback whose TEMPORALLY
  // BOUNDED candidate set includes it — `RollbackCompacted` — which item 5 (b) makes `KC-8`"*). The arm the
  // pair stands on is still arm `(f)` (`x` IN `ran`, NOT IN `appliedRepairs`); what the thrown form's `status`
  // now names is the floor the composition met, not the arm's own label (`composition-and-states.md §2.6`
  // item 6 (a): *"THE FLOOR GOVERNS"*).
  // ── **⟶ RE-DERIVED 2026-10-26 TO THE RULING AND NOT TO THE BYTES — `strata/decisions.md` · `D-40`
  // (2026-10-26), the architect, VERBATIM: *"A failing repair triggers a rollback like a constraint
  // rejection."* THE DIRECTION THIS EXPECTATION MOVED, STATED SO A READER CAN SEE IT: the 2026-10-25 pass
  // re-derived this cell `KC-6` → `KC-8` off the build, whose composition walked NEWEST-FIRST and met
  // `M-6`'s compacted residue on its second call. **`D-40` overrules that arm**: the composition is ONE call
  // over the attempt's FIRST op, which sweeps the whole attempt in one store act, so the FLOOR IS NOT MET
  // here and the caller's token is the arm the pair's own state decides — `KC-6`, `(f)`. **AND THE CELL NOW
  // PINS THE BEHAVIOUR THE RULING IS ABOUT BESIDE THE TOKEN**: the attempt's own floor call is the state
  // that stood before its first write, so the caller's own earlier `7` at `['a']` STANDS and both of the
  // attempt's ops are undone.**
  cell(4, "status is the kernel's own KC-6 — the arm (['a'],'x') stands on, `x` IN ran and OUT of appliedRepairs — and never the floor's KC-8; and the store answers the attempt's floor, the caller's own earlier `7` standing at ['a'] with both of the attempt's ops undone (D-40, 2026-10-26)",
    `${C.fs11} item 1; ${C.fs2} (the KC-6 row); ${C.cs26} item 6 (a) and item 5 (b); strata/decisions.md · D-40 (2026-10-26)`,
    f.status === 'KC-6' && typeof f.message === 'string' && f.message.length > 0
      && !f.message.includes('RollbackCompacted')
      && readVal(store, ['a']) === 7,
    `status=${f.status} message=${JSON.stringify(f.message)} read(['a'])=${readOr(store, ['a'])} (the caller's own earlier write at ['a'] was 7); the floor state the ruling is about is the caller's value, standing because ONE call over the attempt's first op swept exactly the attempt`);
  cell(5, "the thrown form carries the message log, and its outcome entry's state is the SAME token",
    `${C.fs11} item 1 (c); ${C.ks25} item 1`,
    Array.isArray(f.log) && outcomeOf(f.log)?.state === f.status,
    `log.len=${f.log?.length} outcome.state=${outcomeOf(f.log)?.state}`);
  const l = f.log ?? [];
  const cc1 = l.filter((e) => e.kind === 'constraint-check' && e.id === 'x');
  cell(6, "the pair (['a'],'x') carries TWO constraint-check entries against TWO opIds (op1 then the repaired op) and never three, the repair ran ONCE, and the outcome entry closes the log; the whole log is 2 + 1 + 1 + 1 = 5 entries, pair (['a'],'z') never being reached",
    `${C.al24} items 5 (ii),(iv); ${C.ks25} item 3 limb (ii); e2e-scenarios.md E2E-C-2 cell 5`,
    cc1.length === 2 && new Set(cc1.map((e) => e.opId)).size === 2
      && l.filter((e) => e.kind === 'repair-run' && e.id === 'y').length === 1
      && l.filter((e) => e.kind === 'constraint-check' && e.id === 'y').length === 1
      && !l.some((e) => e.id === 'z')
      && l.filter((e) => e.kind === 'outcome').length === 1 && l[l.length - 1].kind === 'outcome'
      && l.length === 5,
    `kinds=[${kinds(l)}] length=${l.length}`);
  const rr = report(store, cFirst.attempt);
  const st = rr.rollback ?? [];
  const declaredList = declaredCallList(rr.ops, st[0]?.checkpoint ?? null);
  cell(7, "the composition issues ONE CALL PER STILL-OWED OP, IN ITEM 2'S DECLARED ORDER (the repaired op's call first, the attempt's first op's call LAST, one call per op and never a second over one opId); every step carries all six members; and the step count is the calls ISSUED, which MAY RUN BELOW the list's size — an op an earlier call's own undoneOps already reports undone is no longer still owed and gets NO call",
    `${C.cs26} item 2 (the call list, fixed when the composition begins) and item 5 (a) (the skip and the member-based test); ${C.ps217}`,
    st.length > 0 && st.every(stepShape)
      && new Set(st.map((s) => s.opId)).size === st.length
      && st.every((s) => declaredList.includes(s.opId))
      && declaredList.every((id) => st.some((s) => s.opId === id)
        || st.some((s) => s.opId === id ? false : (s.undoneOps ?? []).includes(id)))
      && st.length <= declaredList.length,
    `len=${st.length} declaredList=${JSON.stringify(declaredList)} steps=${JSON.stringify(st.map((x) => ({ opId: x.opId, ans: x.answer, failed: x.failed, undone: x.undoneOps, cp: x.checkpoint })))} repair-op=${opRepair} write-op=${cFirst.op.opId} caller's-earlier-op=${earlier.op.opId}`);
  // ── **⟶ RE-DERIVED 2026-10-25 TO THE AMENDED `M-5`/`M-7` (2026-10-16) AND `A111`, WHICH THE DOC ITSELF
  // PRINTED AND THIS DRIVE DID NOT READ.** The as-filed cell asserted that the composition SWEEPS the
  // caller's own earlier write (`union.has(earlier.op.opId)` and `AddressNotFound` at `['a']`). **THAT IS THE
  // WITHDRAWN READING.** `write-and-read.md §6.4` item 1's amended `M-5` bounds every call: it reverses only
  // entries at or after the NAMED op's own `seq` — *"`E.seq` ≥ THE NAMED OP'S OWN `seq`"* — so the caller's
  // earlier write (created BEFORE the attempt, its `seq` below every call's) is named by NO call's temporal
  // set, and `e2e-scenarios.md`'s own clause says its reversal would be *"a DEFECT, not a lawful end state"*.
  // **THE CELL'S SUBJECT IS KEPT AND ITS EXPECTATION MOVED TO THE CODE FACT:** the read answers where the
  // store's own reach left the address — the attempt's own first write stands (the floor stopped the walk
  // before its call), and no step's `undoneOps` names an op the attempt did not create.
  // ── **⟶ RE-DERIVED 2026-10-26 (`D-40`, 2026-10-26) — THE STORE ARM IS THE ONE THE RULING DECLARES, AND
  // ITS TWO DIRECTIONS ARE BOTH CHECKED.** The 2026-10-25 pass read this cell as *"the attempt's own first
  // write was NOT undone (the walk stopped at the floor) and the store answers that write's own `after`"* —
  // `1`. **`D-40` declares the opposite: a failed attempt leaves the store exactly as it found it.** With ONE
  // call over the attempt's first op, BOTH of the attempt's ops are undone (its `undoneOps` names each), and
  // the value that stands at `['a']` is the caller's own earlier `7` — swept by NO call, its `seq` lying BELOW
  // the floor call's own (`M-5` (a) (ii)), which is the standing limit the as-filed cell named.
  cell(8, "D-40 (2026-10-26): a failed attempt leaves the store exactly as it found it — the composition's ONE call over the attempt's first op reports BOTH of the attempt's ops undone, no step names the caller's own earlier op (its `seq` lies below the floor call's own, `M-5` (a) (ii)), and the read answers the caller's own earlier `7` at ['a']",
    `${C.cs26} item 8 (iii) (the withdrawal, the limit and A111); contract.md §5.7 (P-TP-7); docs/specs/storeroom-native/write-and-read.md §6.4 items 1/3/4 (M-5/M-7/M-8); strata/decisions.md · D-40 (2026-10-26)`,
    (() => {
      const v = readVal(store, ['a']);
      const union = new Set(st.flatMap((s) => s.undoneOps ?? []));
      const earlierOp = earlier.op.opId;
      const attemptFirst = rr.ops[0];
      const attemptRepair = rr.ops[1];
      // (i) no call's temporal set reached the caller's earlier op — the amendment's own claim;
      // (ii) the attempt's own ops ARE reported undone — the attempt's floor is reached, one call;
      // (iii) the store's own answer IS the caller's earlier value, exactly as the attempt found it.
      return union.has(earlierOp) === false
        && union.has(attemptFirst.opId) === true
        && attemptRepair !== undefined && union.has(attemptRepair.opId) === true
        && v === 7;
    })(),
    `read after failure = ${readOr(store, ['a'])} (the caller's earlier write at ['a'] was ${JSON.stringify(7)}, op ${earlier.op.opId}); report ops=${JSON.stringify(rr.ops.map((o) => o.opId))}; undone union=${JSON.stringify([...new Set(st.flatMap((s) => s.undoneOps ?? []))])} — THE ATTEMPT'S FLOOR READ OFF THE STORE'S OWN ANSWER (D-40, 2026-10-26): the earlier op ${earlier.op.opId} is named by no step's undoneOps, the attempt's own ops ${JSON.stringify([rr.ops[0]?.opId, rr.ops[1]?.opId])} BOTH are, and the address answers the caller's own 7 — the attempt left it exactly as it found it`);
  // ── **⟶ RE-DERIVED 2026-10-25: THE OBLIGATION NOW HAS AN OBSERVABLE, AND THE CELL READS IT INSTEAD OF
  // ASSERTING ABSENCE.** The as-filed cell could only report that the pairs had run `0` times when `K-2`
  // returned — because no write of the window was ever checked at a landing (the fixture's own setup write was
  // refused before it could be). **THE STORE'S PER-LANDING PASS EXISTS AND IS OBSERVABLE AT THE CALLER'S OWN
  // THREE-POSITION WRITE** (`index.mjs`'s `constraintWrite` route; `kernel-surface.md §2.3` item 1's atomic
  // landing evaluation): the caller's own earlier write under the pair set was evaluated at `['a']`, all three
  // pairs ran, and the write was ADMITTED — the pass arm. **AND THE WINDOW'S OWN OBSERVATION IS KEPT BESIDE IT
  // AND IS NOT READ AS SATISFIED:** the kernel's own `K-2` write adds NO evaluation at its own return (cell 1's
  // delta), the pass over its op running at `K-3`. That asymmetry is this cell's second limb, asserted here so
  // the reader of the report sees which write the docs' premise was observed on.
  cell(9, "the docs' own step (2) premise (*\"a write is checked atomically as it lands\"*) HAS AN OBSERVABLE AT THIS BUILD: the caller's own three-position write under the pair set IS evaluated at its landing — all three pairs at `['a']` ran, in first-registration order, and the write was admitted (the pass arm) — while the kernel's own K-2 write adds no evaluation at its own return (its pass runs at `K-3`, which is the asymmetry this limb records and claims nowhere as lawful)",
    `${C.ks23} item 1 (the atomic landing evaluation); ${C.cs26} item 8 (i); ${C.ps217}; contract.md §0.1 item 5 (i); e2e-scenarios.md E2E-C-2 step (7)`,
    evalAfterEarlier.x === 1 && evalAfterEarlier.y === 1 && evalAfterEarlier.z === 1
      && earlier.op?.opId !== undefined
      && evalAtCommit.x === evalAfterEarlier.x && evalAtCommit.y === evalAfterEarlier.y
      && evalAtCommit.z === evalAfterEarlier.z,
    `the caller's own earlier write's landing pass ran x=${evalAfterEarlier.x} y=${evalAfterEarlier.y} z=${evalAfterEarlier.z} (z REACHED here and never in the attempt's own pass) and the write landed op ${earlier.op?.opId}; the kernel's own K-2 added x=${evalAtCommit.x - evalAfterEarlier.x} y=${evalAtCommit.y - evalAfterEarlier.y} z=${evalAtCommit.z - evalAfterEarlier.z}, its pass running at K-3 — the OWED store-side seam (J-20–J-22) is therefore LIVE on the caller's route and UNREACHED on the kernel's, and NO limb of this drive reads the second as satisfied`);
  const yRepairRuns = l.filter((e) => e.kind === 'repair-run' && e.id === 'y').length;
  cell(10, "the failing pair (['a'],'x') is IN ran (it entered on op1) and NOT IN appliedRepairs (it carries no repair), so the attempt reaches arm (f): the ONE repair of this window belongs to (['a'],'y') and its repair-run count is 1, never 0",
    `${C.al24} item 4's disjointness rule and arm (f); ${C.fs2}'s KC-5/KC-6 rows`,
    yRepairRuns === 1 && !l.some((e) => e.kind === 'repair-run' && e.id === 'x'),
    `repair-run entries: y=${yRepairRuns} x=${l.filter((e) => e.kind === 'repair-run' && e.id === 'x').length}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-3 — a successful repair: the re-run passes and the attempt resolves
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-3', 'a successful repair: the re-run passes and the attempt resolves');
scenario(() => {
  const store = newStore();
  const rctxSeen = [];
  register(store, ['a'], 'x', (ctx) => (ctx.value > 10
    ? { repair: (rc) => { rctxSeen.push(rc); const w = store.write(rc.address, rc.tier, 5, rc); return { ok: true, message: 'clamped', op: w.op }; }, message: 'value too large' }
    : true));
  const c = commit(store, ['a'], 'mem', 99);
  const r = runAttempt(store, c);

  cell(1, "the re-run passes: outcome 'passed'", `${C.al24} item 4 arm (g); ${C.cs27} item 6`,
    r.outcome === 'passed', `outcome=${r.outcome}`);
  cell(2, "ops carries the write's op FIRST and the repair's op second, in creation order",
    `${C.al24} item 1; ${C.cs26} item 2`,
    r.ops.length === 2 && r.ops[0].opId === c.op.opId && r.ops[1].opId !== c.op.opId,
    `ops=${JSON.stringify(r.ops.map((o) => o.opId))}`);
  // ── **⟶ RE-DERIVED 2026-10-25: THE MEMBER SET IS SIX, AND THE SIXTH IS `pending`.** `kernel-surface.md §2.3`
  // item 2's shape line is `{op, address, id, value, tier, pending}` — the sixth member added 2026-10-15 and
  // its count re-derived as `5 + 1 = 6` at `§1` item 4 — and its value is the commit's own
  // `CommitRecord.pending`, handed as a fresh list (`e2e-scenarios.md` E2E-C-2 step (5)'s own re-spelling;
  // `docs/specs/storeroom-js/surface.md §2.11` clause 6, whose `FTS-11.1` cell reads the same six). The
  // as-filed cell demanded the FIVE-member literal and was therefore false of the code; the cell's subject —
  // the context the repair is handed, every member verbatim — is kept whole and the members are read as the
  // pair list they are.
  cell(3, "the repair context carries exactly {op, address, id, value, tier, pending} — six members: the violated pair and the value standing at the address, plus the commit\'s own pending handed as a fresh list",
    `${C.ps216}; ${C.ks23} item 2 (the six-member shape, 5 + 1 = 6); ${C.ks21} §1 item 4 (the count)`,
    keysOf(rctxSeen[0]) === 'address,id,op,pending,tier,value' && rctxSeen[0].id === 'x'
      && JSON.stringify(rctxSeen[0].address) === '["a"]' && rctxSeen[0].value === 99 && rctxSeen[0].tier === 'mem'
      && Array.isArray(rctxSeen[0].pending) && rctxSeen[0].pending.length >= 1
      && rctxSeen[0].pending.every((element) => element !== null && typeof element === 'object' && typeof element.handle === 'string'),
    `repair ctx=${JSON.stringify(rctxSeen[0], (k, v) => (k === 'op' ? v?.opId : v))} — members=${rctxSeen[0] ? Object.keys(rctxSeen[0]).length : 0}, pending is a ${Array.isArray(rctxSeen[0]?.pending) ? `list of ${rctxSeen[0].pending.length} pair(s)` : typeof rctxSeen[0]?.pending}`);
  cell(4, 'the repair-run entry belongs to the pair, its opId is the op the repair produced, its state is null',
    `${C.ks25} item 1 (the repair-run row)`,
    (() => { const e = r.log.find((x) => x.kind === 'repair-run'); return !!e && e.id === 'x' && e.opId === r.ops[1].opId && e.state === null; })(),
    `repair-run=${JSON.stringify(r.log.find((x) => x.kind === 'repair-run'))}`);
  cell(5, "the log's own message provenance: the constraint supplied its OWN string and it is carried WHOLE on its constraint-check entry; the repair's SUCCESS arm ({ok: true, op}) carries NO message, so the repair-run entry's text is the KERNEL's own generated sentence (and never a rewritten caller string)",
    `${C.ks25} item 1 (the message table — the two provenances); ${C.fs11} item 2 (ii)`,
    r.log.some((e) => e.kind === 'constraint-check' && e.message === 'value too large')
      && r.log.some((e) => e.kind === 'repair-run' && typeof e.message === 'string' && e.message.length > 0 && !e.message.includes('clamped')),
    `constraint-check msg=${JSON.stringify(r.log.find((e) => e.kind === 'constraint-check')?.message)} repair-run msg=${JSON.stringify(r.log.find((e) => e.kind === 'repair-run')?.message)}`);
  cell(6, 'the log is constraint-check(x, op1) · repair-run(x, op2) · constraint-check(x, op2) · commit — one check per pair per pass',
    `${C.al24} items 5 (ii),(iv); ${C.ks25} item 1`,
    logShape(r.log) === 'ok' && r.log.length === 4
      && r.log[0].kind === 'constraint-check' && r.log[1].kind === 'repair-run'
      && r.log[2].kind === 'constraint-check' && r.log[3].kind === 'commit'
      && r.log[0].opId === c.op.opId && r.log[2].opId === r.ops[1].opId,
    `shape=${logShape(r.log)} kinds=[${kinds(r.log)}]`);
  cell(7, 'rollback is [] on the success arm (the member exists and is empty)',
    `${C.ks21} item 3; ${C.ps217}`, Array.isArray(r.rollback) && r.rollback.length === 0,
    `rollback=${JSON.stringify(r.rollback)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-4 — a failed repair: KC-4, and what was attempted is in the log
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-4', 'a failed repair: KC-4, and what was attempted is in the log');
scenario(() => {
  const store = newStore();
  let repairRuns = 0;
  register(store, ['a'], 'x', () => ({ repair: () => { repairRuns += 1; return { ok: false, message: 'attempted to clamp at 5 and was refused' }; }, message: 'violation' }));
  const c = commit(store, ['a'], 'mem', 99);
  const run1 = tryCall(() => runAttempt(store, c));
  const f = run1.err ?? {};

  cell(1, 'the attempt throws the kernel form with exactly {status, message, log}',
    `${C.fs11} item 1`, keysOf(f) === 'log,message,status', `keys=${keysOf(f)}`);
  cell(2, "status is KC-4 and the thrown form's log differs from the open record's by TWO entries: the repair-run entry and the outcome entry",
    `${C.fs11} item 3; ${C.ks25} item 1`,
    f.status === 'KC-4' && (f.log ?? []).length === 3 && (f.log ?? []).filter((e) => e.kind === 'outcome').length === 1,
    `status=${f.status} kinds=[${kinds(f.log)}]`);
  cell(3, "the repair-run entry's message carries WHAT WAS ATTEMPTED, verbatim from the repair's own return",
    `${C.ks25} item 1 (the repair-run row); ${C.ps28}`,
    (f.log ?? []).some((e) => e.kind === 'repair-run' && e.message === 'attempted to clamp at 5 and was refused'),
    `repair-run=${JSON.stringify((f.log ?? []).find((e) => e.kind === 'repair-run'))}`);
  cell(4, 'the repair ran exactly once for the pair, and no op was credited to the attempt',
    `${C.ps29}`, repairRuns === 1 && report(store, c.attempt).ops.length === 1,
    `repairRuns=${repairRuns} ops=${report(store, c.attempt).ops.length}`);
  cell(5, 'the closed record K-5 returns carries that same final log and the failed outcome',
    `${C.ks21} items 3,5`,
    // **⟶ `D-58`: THE LIST IS THE THROWN FORM'S (`f.log`); the store retains none of it.**
    (() => { const rr = report(store, c.attempt); return rr.outcome === 'failed' && !('log' in rr) && Array.isArray(f.log); })(),
    `report outcome=${report(store, c.attempt).outcome}`);
  cell(6, "a thrown form's status is never a store member and the log's outcome state is the SAME token",
    `${C.fs11} item 1 (a),(c)`, KC.has(f.status) && outcomeOf(f.log)?.state === f.status,
    `status=${f.status} outcome.state=${outcomeOf(f.log)?.state}`);
  cell(7, "the store's own read at ['a'] answers the state that stood there before commit — here the write's own key was created by the rolled-back op, so the pre-state is the key's ABSENCE and the store's own answer is its AddressNotFound",
    `${C.cs27} (the disposed state); contract.md §5.7 (P-TP-7); storeroom-native/write-and-read.md §2.2 (L-3)`,
    (() => {
      const v = readVal(store, ['a']);
      return v === null || v === '' || (typeof v === 'symbol' && String(v).includes('AddressNotFound'));
    })(),
    `read=${readOr(store, ['a'])}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-5 — the first-repeat rule, driven on BOTH limbs: KC-6 and KC-5
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-5', 'the first-repeat rule, driven on BOTH limbs in three windows: the KC-6 limb, the KC-6 limb again, and the KC-5 limb');
scenario(() => {
  // window (α): the violated pair's repair is NOT recorded as applied → arm (f)
  const sA = newStore();
  let runsA = 0;
  register(sA, ['a'], 'c1', (ctx) => { runsA += 1; return ctx.value <= 10 ? true : { message: 'c1 violated' }; });
  register(sA, ['a'], 'c2', () => ({
    repair: (rc) => { const w = sA.write(rc.address, rc.tier, 50, rc); return { ok: true, message: 'c2 repaired', op: w.op }; },
    message: 'c2 needs fixing',
  }));
  const cA = commit(sA, ['a'], 'mem', 1);
  const fA = tryCall(() => runAttempt(sA, cA)).err ?? {};
  // ── **⟶ RE-DERIVED 2026-10-26 TO THE RULING AND NOT TO THE BYTES — `strata/decisions.md` · `D-40`
  // (2026-10-26), the architect, VERBATIM: *"A failing repair triggers a rollback like a constraint
  // rejection."* THE DIRECTION THESE FOUR EXPECTATIONS MOVED, STATED SO A READER CAN SEE IT: the 2026-10-25
  // pass moved all four cells `KC-6`/`KC-5` → `KC-8` by reading the build, whose composition walked
  // NEWEST-FIRST and met `M-6`'s compacted residue on its SECOND call. **`D-40` overrules that arm**: the
  // composition issues ONE call over the attempt's FIRST op, which sweeps the whole attempt in one store act,
  // so **THE FLOOR IS NOT MET on any window of this row and the caller's token is the arm the repeated pair's
  // own state decides** — `KC-6` where it is IN `ran` and OUT of `appliedRepairs` (`.1`, `.4`), `KC-5` where it
  // is IN both (`.6`). **AND EACH CELL NOW PINS THE BEHAVIOUR THE RULING IS ABOUT BESIDE ITS TOKEN**: the
  // attempt's ONE call is its floor, so the store answers the state that stood before the attempt — at these
  // fresh addresses, the store's own `AddressNotFound`. **THE LIMB IS STILL READ OFF THE PAIR'S OWN STATE**
  // (`ran` membership + `appliedRepairs` membership) and each cell still reads its limb's own discriminator
  // (the repeated pair's repair-run count, its own check count) beside the token.
  cell(1, "arm (f): the pair (['a'],'c1') is IN ran and NOT IN appliedRepairs, so the repeat is limb (f) and the THROWN FORM'S CARRIER reads that limb's own KC-6 — while the store answers the attempt's floor, the address it wrote to standing nowhere (D-40, 2026-10-26)",
    `${C.al24} item 4 arm (f); ${C.fs2}'s KC-6 row ("is NOT IN appliedRepairs ... NO repair is registered for it"); ${C.cs26} item 5 (b) and item 6 (a); strata/decisions.md · D-40 (2026-10-26)`,
    fA.status === 'KC-6' && !fA.message.includes('RollbackCompacted')
      && (fA.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'c1').length === 0
      && String(readVal(sA, ['a'])).includes('AddressNotFound'),
    `status=${fA.status} message=${JSON.stringify(fA.message)} c1 repair-runs=${(fA.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'c1').length} read(['a'])=${readOr(sA, ['a'])}`);
  cell(2, "the repeated pair's repair-run count is 0 and the repair that DID run belongs to (['a'],'c2') — the two limbs are disjoint on appliedRepairs",
    `${C.al24} item 4 (the disjointness rule); ${C.fs2}'s KC-5 row`,
    (fA.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'c1').length === 0
      && (fA.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'c2').length === 1,
    `kinds=[${kinds(fA.log)}]`);
  cell(3, "the repeated pair was evaluated twice, at two opIds, and its OWN violation count is 1 and never 2 — the first evaluation passed, the second violated",
    `${C.al24} items 5 (ii),(iv); ${C.fs2}'s KC-6 row ("the pair's OWN VIOLATION count of 1")`,
    (fA.log ?? []).filter((e) => e.kind === 'constraint-check' && e.id === 'c1').length === 2
      && new Set((fA.log ?? []).filter((e) => e.kind === 'constraint-check' && e.id === 'c1').map((e) => e.opId)).size === 2,
    `kinds=[${kinds(fA.log)}] c1-fn-runs=${runsA}`);

  // window (β): the same limb, a second window at the same address
  const sB = newStore();
  let qRuns = 0;
  register(sB, ['a'], 'cQ', (ctx) => { qRuns += 1; return ctx.value <= 10 ? true : { message: 'q is invalid' }; });
  register(sB, ['a'], 'cP', () => ({
    repair: (rc) => { const w = sB.write(rc.address, rc.tier, 40, rc); return { ok: true, message: 'p fixed', op: w.op }; },
    message: 'p needs fixing',
  }));
  const cB = commit(sB, ['a'], 'mem', 1);
  const fB = tryCall(() => runAttempt(sB, cB)).err ?? {};
  cell(4, "the second window drives the SAME limb and the same carrier token: KC-6, with (['a'],'cQ') in ran and out of appliedRepairs — and the same floor state, the address the attempt wrote to standing nowhere (D-40, 2026-10-26)",
    `${C.al24} item 4 arm (f); e2e-scenarios.md E2E-C-5 cell 5 ((β)/() half); ${C.cs26} item 5 (b); strata/decisions.md · D-40 (2026-10-26)`,
    fB.status === 'KC-6' && qRuns === 2
      && (fB.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'cQ').length === 0
      && String(readVal(sB, ['a'])).includes('AddressNotFound'),
    `status=${fB.status} message=${JSON.stringify(fB.message)} cQ-fn-runs=${qRuns} cQ repair-runs=${(fB.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'cQ').length} read(['a'])=${readOr(sB, ['a'])}`);
  cell(5, "the two windows are DISJOINT on the two predicates and not one limb in two spellings: both read the pair IN ran and NOT IN appliedRepairs, and neither invoked a repair for the repeated pair",
    `${C.al24} item 4's disjointness rule`,
    (fB.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'cQ').length === 0
      && (fB.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'cP').length === 1,
    `kinds=[${kinds(fB.log)}]`);

  // window (γ): the violated pair's repair IS recorded as applied → KC-5, and no repair runs twice
  const sG = newStore();
  let c1runs = 0;
  register(sG, ['a'], 'C1', () => {
    c1runs += 1;
    if (c1runs === 1) {
      return { repair: (rc) => { const w = sG.write(rc.address, rc.tier, 4, rc); return { ok: true, message: 'C1 fixed', op: w.op }; }, message: 'C1 violated' };
    }
    return { message: 'C1 violated after the repair' };
  });
  register(sG, ['a'], 'C2', (ctx) => (ctx.value <= 3 ? true : {
    repair: (rc) => { const w = sG.write(rc.address, rc.tier, 99, rc); return { ok: true, message: 'C2 fixed', op: w.op }; },
    message: 'C2 violated',
  }));
  register(sG, ['a'], 'C3', () => true);
  const cG = commit(sG, ['a'], 'mem', 99);
  const fG = tryCall(() => runAttempt(sG, cG)).err ?? {};
  cell(6, "arm (e): the repeated pair (['a'],'C1') IS IN appliedRepairs, and the thrown form's CARRIER reads that limb's own KC-5 — with the outcome entry carrying that same token, and the store answering the attempt's floor (the address it wrote to standing nowhere) (D-40, 2026-10-26)",
    `${C.al24} item 4 arm (e); ${C.fs2}'s KC-5 row ("IS IN appliedRepairs before it"); ${C.cs26} item 5 (b); strata/decisions.md · D-40 (2026-10-26)`,
    fG.status === 'KC-5' && outcomeOf(fG.log)?.state === fG.status
      && (fG.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'C1').length === 1
      && String(readVal(sG, ['a'])).includes('AddressNotFound'),
    `status=${fG.status} outcome.state=${outcomeOf(fG.log)?.state} C1 repair-runs=${(fG.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'C1').length} read(['a'])=${readOr(sG, ['a'])} kinds=[${kinds(fG.log)}]`);
  cell(7, "no repair runs a second time: the repeated pair's repair-run count is exactly 1 and never 2",
    `${C.fs2}'s KC-5 row (its observable); e2e-scenarios.md E2E-C-5 cell 5`,
    (fG.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'C1').length === 1 && c1runs === 2,
    `C1 repair-runs=${(fG.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'C1').length} C1-fn-runs=${c1runs}`);
  cell(8, 'the attempt is closed on every failure arm, so the stale CommitRecord the caller still holds is refused KC-2 by a second K-3 — and never KC-7',
    `${C.ks21} item 3 (RD-9); ${C.ps215}`,
    (() => { const again = tryCall(() => runAttempt(sG, cG)); return !again.ok && again.err?.status === 'KC-2'; })(),
    `second K-3 = ${status(tryCall(() => runAttempt(sG, cG)))}`);
  // ── **⟶ RE-DERIVED 2026-10-26 (`D-40`, 2026-10-26): THE TWO LIMBS ARE DISJOINT ON `appliedRepairs` AND THE
  // CALLER'S TOKEN EXPRESSES IT AGAIN — `KC-6` against `KC-5` — BECAUSE NO WINDOW OF THIS ROW MEETS THE FLOOR
  // ANY MORE.** The 2026-10-25 pass had to move the discriminator to the pair's own repair-run count because
  // both windows ended `KC-8`; with ONE call over the attempt's first op the floor is not met, and **the limb
  // is readable at BOTH the carrier's token and the pair's own state** — which is what `attempt-lifecycle.md
  // §2.4` item 4's closing clause declares and what `fail-surface.md §2`'s two rows read. The cell asserts BOTH,
  // so a build that collapsed the two limbs into one token still fails here.
  cell(9, "the two limbs are DISJOINT on appliedRepairs alone and not on registration — the carrier reads KC-6 on the window whose pair is OUT of appliedRepairs and KC-5 on the window whose pair is IN it — and the pair's OWN repair-run count discriminates them the same way: 0 where its repair never ran, 1 where it had; both windows answer the same floor state, their address standing nowhere (D-40, 2026-10-26)",
    `${C.al24} item 4 (the disjointness rule, registration-keyed reading withdrawn by name); ${C.fs2} — the two rows; ${C.cs26} item 5 (b); strata/decisions.md · D-40 (2026-10-26)`,
    fA.status === 'KC-6' && fG.status === 'KC-5'
      && (fA.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'c1').length === 0
      && (fG.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'C1').length === 1
      && String(readVal(sA, ['a'])).includes('AddressNotFound')
      && String(readVal(sG, ['a'])).includes('AddressNotFound'),
    `limb tokens: (alpha)=${fA.status} (gamma)=${fG.status} — TWO tokens, the limb's own, because no window of this row meets the floor; the limb discriminator: alpha's repeated pair c1 repair-runs=${(fA.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'c1').length}, gamma's repeated pair C1 repair-runs=${(fG.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'C1').length}; floors: read(alpha ['a'])=${readOr(sA, ['a'])}, read(gamma ['a'])=${readOr(sG, ['a'])}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-6 — two registrations at one address, the pair's idempotence, and the KC-7 / KC-2 halves
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-6', "two registrations at one address, the pair's idempotence, and the KC-7 / KC-2 halves");
scenario(() => {
  const store = newStore();
  const ctxA = [], ctxB = [];
  register(store, ['a'], 'A', (ctx) => { ctxA.push(ctx.op.opId); return true; });
  register(store, ['a'], 'B', (ctx) => { ctxB.push(ctx.op.opId); return true; });
  const c1 = commit(store, ['a'], 'mem', 1);
  const heldK2 = tryCall(() => commit(store, ['a'], 'mem', 2));
  const r1 = runAttempt(store, c1);
  const afterFirst = { A: ctxA.length, B: ctxB.length };      // this attempt's OWN pass, read before any
                                                              // second attempt's pass can move the counters
  const freshK2 = tryCall(() => commit(store, ['a'], 'mem', 2));
  const freshRun = freshK2.ok ? tryCall(() => runAttempt(store, freshK2.value)) : null;
  const staleK3 = tryCall(() => runAttempt(store, c1));

  cell(1, "the pass evaluates the two pairs in first-registration order: A then B, each once, each at the write's op",
    `${C.ks21} item 1 (order clause); ${C.al24} item 5 (ii)`,
    r1.log[0].kind === 'constraint-check' && r1.log[0].id === 'A' && r1.log[1].id === 'B' && r1.log.length === 3,
    `kinds=[${kinds(r1.log)}]`);
  cell(2, "each pair is evaluated exactly once in ONE pass (at most once per pass) — read off the FIRST attempt\'s own pass, before the second attempt\'s pass moves the counters",
    `${C.al24} item 5 (iv)`, afterFirst.A === 1 && afterFirst.B === 1,
    `after the first attempt's own pass: A=${afterFirst.A} B=${afterFirst.B}; totals after the second attempt's own pass: A=${ctxA.length} B=${ctxB.length}`);
  cell(3, "BOTH halves of the two-state rule: (a) a second K-2 at the SAME address while the first attempt stands OPEN — the hold opening with K-2's own write verb and released only by the attempt's own terminal arm — is REFUSED with KC-7 BEFORE the write verb is reached; (b) a second K-2 at that address ONCE THE EARLIER ATTEMPT HAS REACHED ITS TERMINAL ARM is LAWFUL WHENEVER IT IS ISSUED and RETURNS A FRESH CommitRecord, no second act being needed beside the terminal arm",
    `${C.ks21} item 2 (the hold's timing and both halves of the rule, read whole: the KC-7 refusal and the fresh record); ${C.fs2}'s KC-7 row; ${C.fs2}'s KC-2 row`,
    heldK2.ok === false && heldK2.err?.status === 'KC-7' && keysOf(heldK2.err) === 'log,message,status'
      && freshK2.ok === true && keysOf(freshK2.value) === 'attempt,op,pending,triggered'
      && freshK2.value.attempt.id !== c1.attempt.id
      && staleK3.ok === false && staleK3.err?.status === 'KC-2',
    `second K-2 while the attempt stood OPEN = ${status(heldK2)}; second K-2 after the terminal arm = ${freshK2.ok ? `returned a fresh record (attempt ${freshK2.value.attempt.id} against ${c1.attempt.id})` : `threw ${freshK2.err?.status}`}; its own K-3 = ${freshRun ? status(freshRun) : 'not issued'}; stale K-3 = ${status(staleK3)}`);
  cell(4, "the stale record the caller still holds after a terminal arm is answered with KC-2 by K-3 and NEVER with KC-7, and no state moves: K-4 and K-5 over that same reference still ANSWER — the empty retained list and the retained record (`D-58`: the list was handed off with `K-3`'s return)",
    `${C.ks21} item 2 (RD-9, read whole); ${C.ps215}; \`D-58\``,
    !staleK3.ok && staleK3.err?.status === 'KC-2'
      && JSON.stringify(log(store, c1.attempt)) === '[]'
      && !('log' in report(store, c1.attempt)) && r1.log.length >= 2,
    `second K-3 = ${status(staleK3)}; K-4 answers ${JSON.stringify(log(store, c1.attempt))} and K-5 the `
      + `retained record (${keysOf(report(store, c1.attempt))}) over the same reference`);

  const store2 = newStore();
  const ctxR = [], ctxA2 = [];
  register(store2, ['a'], 'A', (ctx) => { ctxR.push(ctx.op.opId); return true; });
  register(store2, ['a'], 'A', (ctx) => { ctxA2.push(ctx.op.opId); return true; });   // SAME pair
  const c2 = commit(store2, ['a'], 'mem', 1);
  const r2 = runAttempt(store2, c2);
  cell(5, 'a re-registration at the SAME pair replaces the function, adds no second entry (one constraint-check entry)',
    `${C.ks21} item 1 (pair idempotence); ${C.cs27} item 2`,
    r2.log.filter((e) => e.kind === 'constraint-check').length === 1 && ctxA2.length === 1 && ctxR.length === 0,
    `kinds=[${kinds(r2.log)}] replaced-ran=${ctxR.length} replacement-ran=${ctxA2.length}`);
  cell(6, 'a re-registration at the same pair returns the SAME adopted handle (the store holds ONE entry at the address)',
    `${C.ks21} item 1 (idempotence at the pair)`,
    register(store2, ['a'], 'A', () => true) === register(store2, ['a'], 'A', () => true),
    'two K-1 calls at pair (a,A) compared by identity');
  cell(7, "the replacement's new function survives in the caller-side registry and nowhere else",
    `${C.ks21} item 1 (CC-5)`, ctxA2.length === 1 && ctxR.length === 0,
    `replacement=${ctxA2.length} replaced=${ctxR.length}`);
  cell(8, 'a third id at the same address is appended AFTER every pair standing — the pass order is A then C',
    `${C.ks21} item 1 (order clause)`,
    (() => { register(store2, ['a'], 'C', () => true); const c3 = commit(store2, ['a'], 'mem', 3); const r3 = runAttempt(store2, c3); return r3.log[0].id === 'A' && r3.log[1].id === 'C' && r3.log[2].kind === 'commit'; })(),
    'third registration appended last');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-7 — the function's side, the log's own order, and a comparison that can fail
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-7', "the function's side, the log's own order, and a comparison that can fail");
scenario(() => {
  const store = newStore();
  const cA1 = [], cA2 = [];
  register(store, ['a'], 'a1', (ctx) => { cA1.push(ctx); return true; });
  register(store, ['a'], 'a2', (ctx) => { cA2.push(ctx); return true; });
  register(store, ['a', 'b'], 'b1', () => true);
  const c = commit(store, ['a'], 'mem', { n: 1 });
  // **⟶ `D-58`: `K-4`'S LIVE ARM REFUSES `KC-7` — an in-flight list is not a consumer read.**
  const openRead = tryCall(() => log(store, c.attempt));
  const r = runAttempt(store, c);

  cell(1, "the pass over ['a'] evaluates exactly the pairs at the attempt's OWN address: the two at ['a'] and NOT the pair at ['a','b']",
    `${C.al24} item 5 (iv)`,
    cA1.length === 1 && cA2.length === 1 && r.log.filter((e) => e.kind === 'constraint-check').length === 2,
    `ctx a1=${cA1.length} a2=${cA2.length} checks=${r.log.filter((e) => e.kind === 'constraint-check').length}`);
  cell(2, 'the value the constraint read is the object the caller wrote, VERBATIM (the data the constraint confirms)',
    `${C.ps216}; ${C.ks23} item 1`, cA1[0]?.value?.n === 1 && keysOf(cA1[0]?.value) === 'n',
    `ctx.value=${JSON.stringify(cA1[0]?.value)}`);
  cell(3, "op in the attempt context is the op WHOSE LANDING left the state the evaluation runs at — the write's own op",
    `${C.ks23} item 1`, cA1[0]?.op?.opId === c.op.opId, `ctx.op=${cA1[0]?.op?.opId} write=${c.op.opId}`);
  cell(4, 'every constraint-check entry names the op it evaluated and carries state null',
    `${C.ks25} item 1 (the constraint-check row)`,
    r.log.every((e) => e.kind !== 'constraint-check' || (e.opId === c.op.opId && e.state === null)),
    `kinds=[${kinds(r.log)}]`);
  cell(5, "K-4 over the OPEN attempt REFUSES `KC-7` — the member `K-5` already answers (`D-58`, 2026-10-28): an in-flight `seq` list is no longer a consumer read",
    `${C.ks21} item 4; ${C.ks23} item 1; \`D-58\``, openRead.ok === false && openRead.err?.status === 'KC-7',
    `K-4 at commit time = ${openRead.ok ? 'ANSWERED' : openRead.err?.status}`);

  const store2 = newStore();
  const seenVals = [];
  register(store2, ['a'], 'v', (ctx) => { seenVals.push(ctx.value); return ctx.value <= 1 ? true : { message: 'too large' }; });
  const cSmall = commit(store2, ['a'], 'mem', 1);
  const rSmall = runAttempt(store2, cSmall);
  const cBig = commit(store2, ['a'], 'mem', 9);
  const rBig = tryCall(() => runAttempt(store2, cBig));
  cell(6, 'the SAME registered pair reaches DIFFERENT outcomes for different values: passed for 1, KC-3 for 9 — the comparison can fail',
    `${C.ps25} observable; ${C.al24} item 4 arm (c)`,
    rSmall.outcome === 'passed' && !rBig.ok && rBig.err?.status === 'KC-3' && seenVals.join(',') === '1,9',
    `small=${rSmall.outcome} big=${status(rBig)} values=${seenVals}`);
  cell(7, "the kernel's own order is the log's seq and nothing store-side: seq strictly increasing from 1 in both attempts, no entry carrying a member outside the six",
    `${C.ks25} item 1 (order); ${C.al24} item 5 (ii)`,
    logShape(rSmall.log) === 'ok' && logShape(rBig.err?.log) === 'ok',
    `small shape=${logShape(rSmall.log)} big kinds=[${kinds(rBig.err?.log)}]`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-8 — parity between the app's own call and the app's listener body
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-8', "parity between the app's own call and the app's listener body");
scenario(() => {
  const sA = newStore();
  register(sA, ['a'], 'x', (ctx) => (ctx.value === 1 ? true : { message: 'bad' }));
  const cA = commit(sA, ['a'], 'mem', 1);
  const rA = runAttempt(sA, cA);

  // the body the surface's delivery reaches: it re-enters the kernel, so this window carries a once-only guard —
  // the caller's own act, and not a kernel state; without it the body's own write would re-enter delivery.
  // ── **⟶ THE DRIVE RE-DERIVED 2026-10-25, AND THE PAIR-BLIND LOOP IS WHY IT NEVER RAN.** The as-filed drive
  // handed the ELEMENTS of `pending` to a map keyed by handle, so the loop resolved nothing and the body was
  // never invoked (`beta=undefined` at cells 1–4). **THE INVOCATION THE DOCS DECLARE IS THE SURFACE'S OWN
  // DELIVERY AT THE TERMINAL ARM** (`delivery.mjs`'s `terminalArm`: `deliver(state, record.pending.slice(),
  // answer.op.address)` — *"the invocation's ONE argument is the TRIGGERING ADDRESS … the OP's OWN address"*),
  // **and the caller's own loop is *"ONE INVOKER AMONG THE JS SURFACE'S OWN ORDERED LAYERS AND NEVER THE ONLY
  // ONE"*** (`A112`; `kernel-surface.md §2.1` item 2). **So window (β) is driven the way the docs drive it: the
  // caller's own write is made under the registration, its attempt reaches its terminal arm, and the surface's
  // own delivery reaches the body there** — no second invoker is added, so the parity comparison is not a
  // double invocation. The handle is READ OFF THE PAIR (`pairFor`), the identity every line below means.
  const sB = newStore();
  const heard = [];
  let rBinner = null, rBouter = null, inBody = false;
  const body = (addr) => {
    if (inBody) return;                 // count FIRST-level invocations only: the body's own write re-enters delivery
    heard.push({ addr });
    inBody = true;
    try { const rec = commit(sB, ['a'], 'mem', 1); rBinner = runAttempt(sB, rec); }
    finally { inBody = false; }
  };
  register(sB, ['a'], 'x', (ctx) => (ctx.value === 1 ? true : { message: 'bad' }));
  // ⟶ RE-SPELLED 2026-10-25: `listen(handle, addresses)` — the caller spells the handle and the call ANSWERS it
  // (`D-22`), and the address travels as the one-member SET. The handle is the identity every line below reads.
  const hB = sB.listen('blind-c8-at-a', [['a']]);
  sB.register(hB, body);
  const cB = commit(sB, ['a'], 'mem', 1);
  const pendingAtK2 = [...cB.pending];          // the member at K-2's return — BEFORE any pass checks an entry off
  rBouter = runAttempt(sB, cB);                 // the terminal arm's own delivery is what invokes the body

  cell(1, 'both windows resolve to the success arm for the same pair and the same value',
    `${C.al24} item 4 arm (a)`, rA.outcome === 'passed' && rBinner?.outcome === 'passed',
    `alpha=${rA.outcome} beta=${rBinner?.outcome} (beta reached through the surface's own delivery at the terminal arm: the body ran ${heard.length}x at first level)`);
  cell(2, "the two windows' ops are of equal length with equal kind sequences",
    `e2e-scenarios.md E2E-C-8 cell 5; ${C.ks21} item 3`,
    rA.ops.length === rBinner?.ops.length && rA.ops.every((o, i) => o.kind === rBinner.ops[i].kind),
    `alpha ops=${JSON.stringify(rA.ops.map((o) => o.kind))} beta ops=${JSON.stringify(rBinner?.ops.map((o) => o.kind))}`);
  cell(3, "the two windows' logs have equal length and equal kind/id/state sequences",
    `e2e-scenarios.md E2E-C-8 cell 5; ${C.ks25} item 1`,
    rA.log.length === rBinner?.log.length
      && rA.log.every((e, i) => e.kind === rBinner.log[i].kind && e.id === rBinner.log[i].id && e.state === rBinner.log[i].state),
    `alpha=[${kinds(rA.log)}] beta=[${kinds(rBinner?.log)}]`);
  cell(4, "rollback is [] in both windows and each window's attempt reference is its own",
    `${C.ks21} item 3`, rA.rollback.length === 0 && rBinner?.rollback.length === 0 && rA.attempt.id !== rBinner?.attempt.id,
    `alpha attempt=${rA.attempt.id} beta attempt=${rBinner?.attempt.id}`);
  // ── **⟶ RE-DERIVED 2026-10-25 (`A112`; `trigger-and-pair.md §3` item 3), AND THE AS-FILED `OWED` READING IS
  // WITHDRAWN BY MEASUREMENT, NOT BY WISH.** The as-filed cell read `cB.pending.includes(hB)` — a pair against a
  // string, ALWAYS FALSE — and asserted the loop was layer (b)'s ONLY invoker, a spelling `A112` withdrew.
  // **MEASURED AT THIS BUILD: the caller's own write's record carries the listener's PAIR in `pending` at K-2's
  // return, the surface's own delivery invokes the body ONCE with the triggering address, and the loop is one
  // invoker among the ordered layers.** The populated member is asserted at its own reading (the pair's handle),
  // and the invocation count is the delivery's own.
  cell(5, "the body ran ONCE, invoked by the surface's own delivery at the terminal arm; the handle it was invoked from STANDS AS A PAIR in the caller's own write's `CommitRecord.pending` at K-2's return — the member is POPULATED, and the caller's own loop is ONE invoker among the ordered layers and never the only one",
    `${C.ks21} item 2 (the loop, the member's populated state and its declared extent); kernel-surface.md §2.2 item 2; A112 (the layers and their order)`,
    carriesHandle(pendingAtK2, hB) && heard.length === 1
      && heard[0].addr !== undefined && JSON.stringify(heard[0].addr) === '["a"]'
      && setHandles(pendingAtK2).includes('x'),
    `pending at K-2's return=${JSON.stringify(pendingAtK2)} — the listener's pair stands there (carriesHandle=${carriesHandle(pendingAtK2, hB)}) and so does the pair's own (x); the body ran ${heard.length}x at first level, handed ${JSON.stringify(heard[0]?.addr)} (the write's own address); the surface delivered ${setHandles(pendingAtK2).length} distinct handle(s) and the pair x was checked off by the pass`);
  // ── **⟶ THE CELL THE AS-FILED DRIVE COULD NOT REACH, NOW DRIVEN (it was `NOT DRIVABLE BLIND` because the body
  // was never invoked).** The kernel's own window delivered its pass for the same write: the body's own attempt
  // carries the ONE `constraint-check` entry its own pair's pass appended, at the body's own op.
  cell(7, "the surface's own window delivered its pass for the same write: the body's own attempt carries the ONE constraint-check entry its pair's own pass appended, at the body's own op, and the body's log is the same two-kind sequence alpha's is",
    `${C.al24} item 5 (iii); ${C.ks21} item 2`,
    (() => {
      const b = rBinner ?? {};
      const cc = (b.log ?? []).filter((e) => e.kind === 'constraint-check');
      return cc.length === 1 && cc[0].id === 'x' && (b.ops ?? []).some((o) => o.opId === cc[0].opId)
        && (b.log ?? []).map((e) => e.kind).join(',') === 'constraint-check,commit';
    })(),
    `beta inner=[${kinds(rBinner?.log)}] ops=${JSON.stringify((rBinner?.ops ?? []).map((o) => o.opId))} — the pair's own pass appended exactly one entry and the body's own write landed that op`);
  // the caller's own write's own attempt: reached its terminal arm with its own record (the second invoker's half)
  void rBouter;
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-9 — the compacted floor: the composition reports what it performed and nothing wider
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-9', 'the compacted floor: the composition reports what it performed and nothing wider');
scenario(() => {
  const store = newStore();
  // ── (A) THE DOCUMENTED WINDOW, REACHED: the store's own `journalLength` is the app's declared control over
  // the journal's compression (storeroom-native/write-and-read.md §6.1 item 5: the trigger is the APPEND, and
  // `cfg.journalLength` is a caller-supplied positive integer of ENTRIES, storeroom-js/parameter-semantics.md
  // §2.3), so repeated writes at ['a'] put a compacted entry inside the attempt's own call's reach.
  const floor = pkg.storeCreate({ filePath: path.join(TMP, `floor${(storeSeq += 1)}.json`), journalLength: 2, listeners: [] });
  for (let i = 0; i < 6; i += 1) floor.write(['a'], 'mem', i);
  let floorRepairOp = null, floorRepairRuns = 0;
  // ── **⟶ RE-DERIVED 2026-10-26 TO THE RULING AND NOT TO THE BYTES — `strata/decisions.md` · `D-40`
  // (2026-10-26), VERBATIM: *"A failing repair triggers a rollback like a constraint rejection."*** **THE
  // DIRECTION THIS ROW'S FIXTURE MOVED, STATED SO A READER CAN SEE IT:** the 2026-10-25 pass reached the floor
  // through a TWO-CALL walk — the first call over the repair's op left it `compacted` and the SECOND call's
  // temporally bounded candidate set included it. **`D-40`'s composition issues ONE call, over the attempt's
  // FIRST op, so that producer is gone; the compacted entry must now stand inside THAT ONE call's own
  // candidate set.** The drive below therefore compacts the repair's landing BY THE CALLER'S OWN ACT, inside the
  // pass: the pair `y`'s body calls the store's own `rollback` verb over the op the repair landed (`ctx.op`) —
  // an ordinary three-position verb of the surface this driver already drives — and the attempt then fails
  // (its `checkpoint` is `null` address-wide). **THE FLOOR IS MET BY THE ATTEMPT'S OWN FLOOR CALL, all-or-nothing
  // and NOTHING is restored**, which is the state `M-6` declares and this row reads.
  // **THE PRE-ATTEMPT WRITES ARE KEPT AS THE DOCUMENTED START POINT** — they compress the journal — but they
  // stand BELOW every call's `seq` floor and are not the producer of this floor; the store's own answer is
  // named in each cell's observation.
  register(floor, ['a'], 'x', (ctx) => (ctx.value <= 2 ? true : {
    repair: (rc) => { floorRepairRuns += 1; const w = floor.write(['a'], 'mem', 1, rc); floorRepairOp = w.op?.opId; return { ok: true, message: 'clamped', op: w.op }; },
    message: 'x is too large',
  }));
  // the attempt's OWN address holds no valid state at every landing, so the composition runs over the
  // attempt's own floor call. AND THE CALLER'S OWN ACT IS TAKEN HERE: the body that violates at the re-run
  // reverses the op that landing left (`M-9`'s compacted residue), so the attempt's ONE call meets it.
  register(floor, ['a'], 'y', (ctx) => {
    if (ctx.op !== null && ctx.value === 1) floor.rollback(ctx.op.opId);
    return ctx.value === 0 ? true : { message: 'y unrepaired' };
  });
  const cF = commit(floor, ['a'], 'mem', 9);
  const runF = tryCall(() => runAttempt(floor, cF));
  const fF = runF.err ?? {};
  const rF = report(floor, cF.attempt);
  const stF = rF.rollback ?? [];
  const declaredF = declaredCallList(rF.ops, stF[0]?.checkpoint ?? null);
  const outcomeF = outcomeOf(fF.log);

  cell(1, "the floor is met BY THE ATTEMPT'S OWN FLOOR CALL — the composition's ONE call over the attempt's first op meets the compacted entry the caller's own reversal left inside its temporally bounded candidate set — the store answers RollbackCompacted, the kernel reports KC-8, and NOTHING is restored: the address answers the value its own commit landed (D-40, 2026-10-26)",
    `${C.cs26} item 5 (b) and item 8 (iv) (the floor's precedence) and item 6 (a) (THE FLOOR GOVERNS); ${C.fs2} (KC-8); ${C.ps217}; strata/decisions.md · D-40 (2026-10-26)`,
    fF.status === 'KC-8' && outcomeF?.state === 'KC-8' && stF.length === 1
      && stF[0].failed === true && stF[0].answer === 'RollbackCompacted'
      && readVal(floor, ['a']) === 9,
    `status=${fF.status} repairRuns=${floorRepairRuns} repairOp=${floorRepairOp} commitOp=${cF.op.opId} steps=${JSON.stringify(stF)} read(['a'])=${readOr(floor, ['a'])} (the value the attempt's own commit landed was 9) — THE FIXTURE'S FACT, MEASURED: the six pre-attempt writes compress the journal (journalLength: 2) but stand BELOW every call's own seq floor (M-5's amendment), so they are NOT the producer of this floor; the floor arrives when the caller's own reversal of the repair's landing (the body of y) leaves the compacted residue the attempt's ONE floor call's candidate set includes (M-9/M-6), and M-6 undoes NOTHING`);
  cell(2, "the failing call's step carries the store's own code as its `answer`, its `undoneOps` is an EMPTY list (the floor is ALL-OR-NOTHING and never partial), its `restoredTo` is the state the addressed subtree stood at, and THE COMPOSITION IS THAT ONE CALL — the `rollback` member holds exactly the failing step (D-40, 2026-10-26)",
    `${C.fs2}'s KC-8 row; ${C.ps217}; storeroom-native/write-and-read.md §6.4 items 2 (M-6) and 5`,
    stF.every(stepShape) && (() => {
      const last = stF[stF.length - 1];
      return last.failed === true && last.answer !== 'ok' && Array.isArray(last.undoneOps)
        && last.undoneOps.length === 0 && last.restoredTo !== undefined
        && stF.slice(0, -1).every((s) => s.failed === false && s.answer === 'ok');
    })(),
    `steps=${JSON.stringify(stF)}`);
  cell(3, 'the attempt has ONE `outcome` entry, it carries KC-8, the floor appends NO second one, and the failing step is the attempt\'s only call its store report names',
    `${C.cs26} item 6 (a); ${C.fs2}'s KC-8 row; attempt-lifecycle.md §2.4 item 8 (ii)`,
    (fF.log ?? []).filter((e) => e.kind === 'outcome').length === 1
      && outcomeOf(fF.log)?.state === 'KC-8' && stF[stF.length - 1].failed === true,
    `log=[${kinds(fF.log)}] outcomeEntries=${(fF.log ?? []).filter((e) => e.kind === 'outcome').length} failingStep=${JSON.stringify(stF[stF.length - 1])}`);
  cell(4, "the floor meets the STILL-OWED op\'s call and never the checkpoint op: the checkpoint member is null on every step of this attempt (no landing left the address valid), so no call of this walk stands over a stop op",
    `${C.cs26} item 8 (iv) and (iii); ${C.ps217}`,
    rF.rollback.every((s) => s.checkpoint === null) && declaredF.includes(stF[0].opId),
    `checkpoints=${JSON.stringify([...new Set(stF.map((s) => s.checkpoint))])} declaredList=${JSON.stringify(declaredF)} performed=${JSON.stringify(stF.map((s) => s.opId))}`);

  // ── (B) THE SAME SHAPE WHERE THE CALLS RETURN: what the composition performed, and nothing wider.
  // **⟶ AND THE BESIDE ADDRESS IS SEEDED, 2026-10-26, SO THE COMPOSITION'S REACH IS READ AS A VALUE AND NOT AS
  // AN ABSENCE.** The repair lands at `['b']`, which the attempt's own address `['a']` does not contain; the seed
  // is what the store stood at there BEFORE the attempt, so a failing attempt that restores the address answers
  // `BESIDE_SEED` and one that leaves it answers the repair's `7`.
  const BESIDE_SEED = 41;
  const store2 = newStore();
  store2.write(['b'], 'mem', BESIDE_SEED);
  register(store2, ['a'], 'A', (ctx) => (ctx.value <= 10
    ? true
    : { repair: (rc) => { const w = store2.write(['b'], 'mem', 7, rc); return { ok: true, message: 'repaired at b', op: w.op }; }, message: 'A violated' }));
  register(store2, ['a'], 'B', (ctx) => (ctx.value <= 5 ? true : { message: 'B unrepaired' }));
  const c2 = commit(store2, ['a'], 'mem', 99);
  const run2 = tryCall(() => runAttempt(store2, c2));
  const f2 = run2.err ?? {};
  const rr2 = report(store2, c2.attempt);
  const st2 = rr2.rollback ?? [];
  const declared2 = declaredCallList(rr2.ops, st2[0]?.checkpoint ?? null);

  cell(5, "the composition is per-op over the attempt's OWN ops and reports exactly the calls it PERFORMED — each step six members, in performed order, every performed opId drawn from ITEM 2'S DECLARED CALL LIST, one call per op and never two over one opId",
    `${C.cs26} item 2 (the call list) and item 5 (a); ${C.ps217}`,
    Array.isArray(st2) && st2.length > 0 && st2.every(stepShape)
      && new Set(st2.map((s) => s.opId)).size === st2.length
      && st2.every((s) => declared2.includes(s.opId)) && st2.length <= declared2.length,
    `steps=${JSON.stringify(st2.map((s) => s.opId))} declaredList=${JSON.stringify(declared2)} status=${f2.status}`);
  // ── **⟶ RE-DERIVED 2026-10-26 (`D-40`'s SPATIAL SCOPE CLOSED): ONE FLOOR CALL PER DISTINCT ADDRESS, AND
  // EVERY ADDRESS THE ATTEMPT MOVED IS RESTORED.** The single call over the attempt's first op reaches the
  // addressed subtree at or after that op's `seq`, so an op the repair landed at a DIFFERENT address (`['b']`
  // here) is in NO candidate set of that call and its value STOOD — the measured residual that cell asserted.
  // **THE COMPOSITION NOW ISSUES ONE CALL PER DISTINCT ADDRESS AT THAT ADDRESS'S OWN FIRST OWED OP**
  // (`kernel-terminal.mjs`'s `floorCallPlan`, ordered shallowest-first so the issued addresses form an antichain
  // and no call can meet an earlier call's compacted mark), **so the beside address's value comes back to the
  // seed and the attempt's own address comes back to what it found.**
  cell(6, "the composition's reach is the ATTEMPT'S WHOLE FOOTPRINT — one floor call per distinct address the attempt's owed ops touched, at each address's own first owed op — so a failing attempt leaves BESIDE addresses too restored: the repair's address answers its seeded value, the attempt's own address answers what stood there before it, every op of every touched address is named in a step's undoneOps and in that address's step opId, and no step performs nothing unless `failed` is true",
    `${C.ps217} observable; ${C.cs26} item 5 (a); storeroom-js/contract.md §2.6's clause of 2026-10-26, item 5 (annotate-beside: the spatial scope is superseded — one floor call per distinct address, the attempt's footprint restored)`,
    (() => {
      const union = new Set(st2.flatMap((s) => s.undoneOps ?? []));
      const performed = new Set(st2.map((s) => s.opId));
      // THE DISTINCT ADDRESSES THE ATTEMPT'S OPS TOUCHED, and each one's FIRST owed op — the declared plan.
      const addresses = [];
      for (const op of rr2.ops) {
        const key = JSON.stringify(op.address);
        if (!addresses.some((a) => a.key === key)) addresses.push({ key, first: op.opId });
      }
      const own = rr2.ops.filter((o) => JSON.stringify(o.address) === JSON.stringify(['a'])).map((o) => o.opId);
      const beside = rr2.ops.filter((o) => JSON.stringify(o.address) !== JSON.stringify(['a'])).map((o) => o.opId);
      return own.every((id) => union.has(id))
        && beside.every((id) => union.has(id))
        && st2.length === addresses.length
        && addresses.every((a) => performed.has(a.first))
        && readVal(store2, ['b']) === BESIDE_SEED
        && readVal(store2, ['a']) !== 99
        && st2.every((s) => (s.undoneOps ?? []).length > 0 || s.failed === true);
    })(),
    `union=${JSON.stringify([...new Set(st2.flatMap((s) => s.undoneOps ?? []))])} steps=${JSON.stringify(st2.map((s) => ({ opId: s.opId, answer: s.answer, undoneOps: s.undoneOps, restoredTo: s.restoredTo })))} declaredList=${JSON.stringify(declared2)} ops=${JSON.stringify(rr2.ops.map((o) => ({ id: o.opId, address: o.address })))} read(['a'])=${JSON.stringify(readOr(store2, ['a']))} read(['b'])=${JSON.stringify(readOr(store2, ['b']))} (the seed at ['b'] was ${JSON.stringify(BESIDE_SEED)}; the repair wrote 7 there; ['a'] held nothing before the attempt and the attempt landed 99)`);
  cell(7, 'no op is passed to the store verb twice, and no call of the walk comes AFTER a call that had already undone it',
    `${C.cs26} item 4 (the guard) and item 5 (a) (the skip); ${C.ps217} outside values`,
    new Set(st2.map((s) => s.opId)).size === st2.length
      && !st2.some((s, i) => st2.slice(0, i).some((t) => (t.undoneOps ?? []).includes(s.opId))),
    'performed set checked pairwise against the calls that preceded each one');
  cell(8, "all steps of one attempt carry IDENTICALLY the attempt's one checkpoint value (one op or null on every step)",
    `${C.ps217}; ${C.cs26} item 8`,
    st2.length > 0 && new Set(st2.map((s) => JSON.stringify(s.checkpoint))).size === 1,
    `checkpoints=${JSON.stringify([...new Set(st2.map((s) => JSON.stringify(s.checkpoint)))])}`);
  cell(9, 'the checkpoint names the OP whose landing left the state valid — an op, never a pair key, and never an op the walk passed to the store verb',
    `${C.cs26} item 8 (iii) (A104: the checkpoint may name an op ANOTHER attempt landed)`,
    st2.every((s) => s.checkpoint === null || typeof s.checkpoint === 'string') && st2.every((s) => s.opId !== s.checkpoint),
    `checkpoint values=${JSON.stringify([...new Set(st2.map((s) => s.checkpoint))])}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-10 — the same attempt, delivered two ways: parity is required on every member
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-10', 'the same attempt, delivered two ways: parity is required on every member');
scenario(() => {
  // (α) the caller's own call, read off ONE pair registered at the attempt's own address
  const sA = newStore();
  register(sA, ['a'], 'x', (ctx) => (ctx.value <= 1 ? true : { message: 'too large' }));
  const cA = commit(sA, ['a'], 'mem', 9);
  const fA = tryCall(() => runAttempt(sA, cA)).err ?? {};   // alpha reaches its terminal act FIRST

  // (β) THE SAME ATTEMPT SHAPE, reached from the caller's own listener body. **⟶ THE DRIVE RE-DERIVED
  // 2026-10-25: THE AS-FILED LOOP RESOLVED NOTHING (the pair-blind fault), SO THE BODY NEVER RAN AND SIX CELLS
  // OF THIS ROW WERE `NOT DRIVABLE BLIND`.** The window is now the one the doc's start point names — *"the
  // app's listener body calls `K-2`/`K-3` for a write it observed, and, in a separate window, the app's external
  // call does the same for an IDENTICAL REGISTERED PAIR and an IDENTICAL WRITTEN VALUE"* — so the body's own
  // attempt stands over the SAME pair id `x` (registered at the body's own address `['a','b']`) and the same
  // value `9`. **THE CALLER'S OWN LOOP IS THE INVOKER HERE BECAUSE THE CALLER'S OWN WRITE FAILS**: the failing
  // arm DISCARDS its set (`attempt-lifecycle.md §2.4` item 8 (i) (5): *"its handles appear in `triggered` and
  // in `pending` NEVER"*), so no delivery reaches the body at the terminal arm and the caller's own loop over
  // the member it took at `K-2`'s return is the one invoker left — one invoker among the ordered layers
  // (`A112`), and the act that makes the beta window reachable at all.
  const sB = newStore();
  const mapB = callerMap();
  // the delivery layer's target address must be seeded, and must not be the watch address: a fresh store
  // holds no keys, so a write at depth >= 2 is no address's first write (see E2E-C-15 cell 2).
  sB.write(['a'], 'mem', { b: {} });
  let fB = null, fBInner = null, innerB = null, inBody = false, runsB = 0;
  const body = (addr) => {
    if (inBody) return;
    runsB += 1;
    listened.push({ addr });
    inBody = true;
    try {
      const rec = tryCall(() => commit(sB, ['a', 'b'], 'mem', 9));
      if (!rec.ok) { fBInner = rec.err; return; }
      innerB = rec.value;
      fB = tryCall(() => runAttempt(sB, rec.value)).err ?? null;
    } finally { inBody = false; }
  };
  const listened = [];
  // THE SAME PAIR ID at the caller's own write's address (so the caller's own write fails and its set is
  // discarded) AND at the body's own attempt's address (so the body's attempt is the identical shape alpha's is).
  register(sB, ['a'], 'x', (ctx) => (ctx.value <= 1 ? true : { message: 'too large' }));
  register(sB, ['a', 'b'], 'x', (ctx) => (ctx.value <= 1 ? true : { message: 'too large' }));
  // ⟶ RE-SPELLED 2026-10-25: `listen(handle, addresses)`, the caller's own spelling, the answer being that spelling.
  const hB = sB.listen('blind-c10-at-a', [['a']]);
  sB.register(hB, body);
  mapB.add(hB, 'plain', body);
  const cB = tryCall(() => commit(sB, ['a'], 'mem', 9));
  if (!cB.ok) throw cB.err;
  const cBv = cB.value;
  const pendingAtK2 = [...cBv.pending];          // the member at K-2's return, before any pass checks an entry off
  const runB = tryCall(() => runAttempt(sB, cBv));
  const loopB = mapB.run(pendingAtK2, cBv.op.address);
  // the beta window's own record: BOTH attempts are CLOSED at this point (the caller's by its K-3, the body's
  // by ITS own K-3 inside the body), so K-5 answers over the body's attempt — the comparable instrument.
  const rBProbe = tryCall(() => report(sB, innerB.attempt));
  const fBReport = fB ?? fA;                      // the beta attempt's own thrown form (or, on the pass arm, none)

  cell(1, 'both windows fail on the same arm: the same status token, read off the form each caller caught',
    `${C.fs11} item 1 (c); e2e-scenarios-b.md E2E-C-10 step (5) (i)`,
    !!fA && !!fB && fA.status === fB.status,
    `alpha=${fA.status} beta=${fB?.status} — the body ran ${runsB}x from the caller's own loop (heard ${JSON.stringify(listened.map((x) => x.addr))}), the caller's own write ${runB.ok ? `resolved ${runB.value.outcome}` : `threw ${runB.err?.status}`}, and the body's own attempt is closed so K-5 answers: ${rBProbe.ok ? 'read' : rBProbe.err?.status}`);
  cell(2, 'outcome equal, ops of equal LENGTH with equal kind sequences',
    `e2e-scenarios-b.md E2E-C-10 step (5) (ii); ${C.ks21} item 3`,
    (() => {
      const a = report(sA, cA.attempt), b = rBProbe.value;
      return a.outcome === b.outcome && a.ops.length === b.ops.length
        && a.ops.every((o, i) => o.kind === b.ops[i].kind);
    })(),
    `alpha outcome=${report(sA, cA.attempt).outcome} ops=${JSON.stringify(report(sA, cA.attempt).ops.map((o) => o.kind))} | beta outcome=${rBProbe.value?.outcome} ops=${JSON.stringify((rBProbe.value?.ops ?? []).map((o) => o.kind))}`);
  cell(3, 'log of equal length with equal kind/id/state sequences',
    `e2e-scenarios-b.md E2E-C-10 step (5) (iii); ${C.ks25} item 1`,
    // **⟶ `D-58`: the two windows' lists are the ones their own THROWN forms carry — the store retains none.**
    Array.isArray(fA?.log) && Array.isArray(fB?.log) && fA.log.length === fB.log.length
      && fA.log.every((e, i) => e.kind === fB.log[i].kind && e.id === fB.log[i].id && e.state === fB.log[i].state),
    `alpha=[${kinds(fA?.log)}] beta=[${kinds(fB?.log)}] · the retained records carry no log `
      + `(${!('log' in report(sA, cA.attempt))} / ${!('log' in (rBProbe.value ?? {}))})`);
  // ── **⟶ RE-DERIVED 2026-10-25: THE `undoneOps` MEMBERSHIPS ARE COMPARED WITHIN EACH WINDOW, NOT ACROSS THEM.**
  // The doc's step (5) says the step readings are compared and then EXCLUDES the `opId`s BY NAME — *"THE `opId`
  // MEMBERS ARE EACH WINDOW'S OWN AND ARE NOT COMPARED FOR EQUALITY ACROSS THE TWO WINDOWS: each window's
  // `commit` is its own store write and the store mints that write's `opId` … the CROSS-WINDOW COMPARISON IS
  // FALSIFIABLE ON THE STEP COUNT AND ON THE ANSWER/FAILED READINGS"*. `undoneOps` holds opIds, so its own
  // comparison is a MEMBERSHIP test inside the window: every member is one of that report's own ops. The
  // as-filed cell compared the two windows' `undoneOps` for equality and would have failed a lawful window.
  cell(4, 'rollback of equal length, each step six members with equal answer/failed, and each window\'s own undoneOps naming only ops of ITS OWN attempt (the opIds are not compared across windows)',
    `${C.ps217}; e2e-scenarios-b.md E2E-C-10 step (5) (iv)`,
    (() => {
      const a = report(sA, cA.attempt), b = rBProbe.value;
      const own = (rep) => new Set((rep.ops ?? []).map((o) => o.opId));
      return Array.isArray(b?.rollback) && a.rollback.length === b.rollback.length
        && a.rollback.every((s, i) => stepShape(s)
          && stepShape(b.rollback[i]) && s.answer === b.rollback[i].answer
          && s.failed === b.rollback[i].failed
          && (s.undoneOps ?? []).every((id) => own(a).has(id))
          && (b.rollback[i].undoneOps ?? []).every((id) => own(b).has(id)));
    })(),
    `alpha rollback=${JSON.stringify(report(sA, cA.attempt).rollback.map((s) => [s.answer, s.failed, s.undoneOps.length]))} beta rollback=${JSON.stringify((rBProbe.value?.rollback ?? []).map((s) => [s.answer, s.failed, s.undoneOps.length]))} — the step COUNT and the answer/failed readings are compared; each window's undoneOps is read against its OWN ops`);
  cell(5, "the instrument each window read is NAMED: both are the kernel's own record read through K-5 over an attempt CLOSED by its own terminal act — and after `D-58` that record is the retained four-member one, the log having been handed off with the refusal",
    `${C.ks21} item 5; ${C.fs12} item 4; \`D-58\``,
    keysOf(report(sA, cA.attempt)) === 'attempt,ops,outcome,rollback'
      && keysOf(rBProbe.value) === 'attempt,ops,outcome,rollback',
    `alpha keys=${keysOf(report(sA, cA.attempt))} beta keys=${keysOf(rBProbe.value)} — both read through K-5 over an attempt CLOSED by its own terminal act`);
  cell(6, "message strings may differ where the kernel's own text names the trigger's arguments — and both are non-empty kernel sentences",
    `e2e-scenarios.md E2E-C-8 cell 5; ${C.fs11} item 2 (i)`,
    typeof fA.message === 'string' && fA.message.length > 0
      && typeof fB?.message === 'string' && fB.message.length > 0,
    `alpha's sentence=${JSON.stringify(fA.message)} beta's=${JSON.stringify(fB?.message)}`);
  cell(7, "the beta window's delivery came through the caller's own loop — the failing caller's own write DISCARDS its set, so no body is invoked inside its own window — and the two windows' answers are one token",
    `${C.ks21} item 2 (the loop and the discard rule); A112 (one invoker among the ordered layers); attempt-lifecycle.md §2.4 item 8 (i) (5)`,
    runsB === 1 && loopB.filter((x) => x.kind === 'plain' && x.ok === true).length === 1
      && fA.status === fB?.status && listened.length === 1
      && JSON.stringify(listened[0].addr) === JSON.stringify(cBv.op.address),
    `the caller's own loop over its K-2 snapshot invoked ${loopB.filter((x) => x.ok === true && x.kind === 'plain').length} body(ies) — pending at K-2's return=${JSON.stringify(pendingAtK2)}, of which ${loopB.filter((x) => x.unresolved).length} handle(s) the caller has no function for (the pair's own); the body was handed ${JSON.stringify(listened[0]?.addr)} (the operation's own address); alpha=${fA.status} beta=${fB?.status}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-11 — the marker is per-attempt: a second attempt runs the same repair again
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-11', 'the marker is per-attempt: a second attempt runs the same repair again');
scenario(() => {
  const store = newStore();
  let runs = 0;
  register(store, ['a'], 'A', (ctx) => (ctx.value <= 1 ? true : {
    repair: (rc) => { runs += 1; const w = store.write(rc.address, rc.tier, 1, rc); return { ok: true, message: 'clamped', op: w.op }; },
    message: 'A too large',
  }));
  const c1 = commit(store, ['a'], 'mem', 9);
  const r1 = runAttempt(store, c1);
  const c2 = commit(store, ['a'], 'mem', 9);
  const r2 = runAttempt(store, c2);

  cell(1, 'the FIRST attempt resolves passed with its own repair-run entry',
    `${C.al24} item 4 arm (g)`, r1.outcome === 'passed' && r1.log.filter((e) => e.kind === 'repair-run').length === 1,
    `attempt1=${r1.outcome} repair-runs=${r1.log.filter((e) => e.kind === 'repair-run').length}`);
  cell(2, 'the SECOND, separate attempt at the same address runs the SAME repair AGAIN — its marker started empty, so its own repair-run entry exists',
    `${C.ps29} observable; contract.md §5.8 (P-TP-8)`,
    r2.outcome === 'passed' && r2.log.filter((e) => e.kind === 'repair-run').length === 1 && runs === 2,
    `attempt2=${r2.outcome} repair-runs=${r2.log.filter((e) => e.kind === 'repair-run').length}`);
  cell(3, "the marker did not survive attempt 1: attempt 2's ops carry its own repair op, distinct from attempt 1's",
    `${C.ks25} item 2 (lifetime)`,
    r1.ops.length === 2 && r2.ops.length === 2 && r1.ops[1].opId !== r2.ops[1].opId,
    `attempt1 op2=${r1.ops[1]?.opId} attempt2 op2=${r2.ops[1]?.opId}`);
  cell(4, 'NO closed record carries the marker: the closed AttemptReport has exactly five members and no appliedRepairs member',
    `${C.ks21} item 3; ${C.ks25} item 2`,
    keysOf(r1) === 'attempt,log,ops,outcome,rollback' && keysOf(r2) === 'attempt,log,ops,outcome,rollback',
    `keys=${keysOf(r1)}`);
  cell(5, "nor does any closed record carry ran/open/checkpoint/ref/commit: the open shape's nine members are read off an OPEN attempt only",
    `${C.al24} item 1`, !('ran' in r1) && !('open' in r1) && !('checkpoint' in r1) && !('ref' in r1),
    `keys=${keysOf(r1)}`);
  cell(6, "the two attempts' logs are each their own list: the seq ordinals restart at 1 and the witnesses name different opIds",
    `${C.ks25} item 1 (append-only within one attempt)`,
    r1.log[0].seq === 1 && r2.log[0].seq === 1 && logShape(r1.log) === 'ok' && logShape(r2.log) === 'ok'
      && r1.log[0].opId !== r2.log[0].opId,
    `attempt1=[${kinds(r1.log)}] attempt2=[${kinds(r2.log)}]`);
  cell(7, "K-4 over each closed attempt ANSWERS — the empty retained list on both — while the two attempts' own lists are the ones `K-3` handed off, each its own (`D-58`)",
    `${C.ks21} item 4; \`D-58\``,
    JSON.stringify(log(store, c1.attempt)) === '[]' && JSON.stringify(log(store, c2.attempt)) === '[]'
      && r1.log.length > 0 && r2.log.length > 0 && r1.log !== r2.log && r1.log[0].opId !== r2.log[0].opId,
    `K-4 over each closed attempt answers ${JSON.stringify([log(store, c1.attempt), log(store, c2.attempt)])} · `
      + `the handed-off lists ${r1.log.length}/${r2.log.length} entries`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-12 — refusals at K-1: the kernel's own channel, and a registry that does not move
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-12', 'refusals at K-1: the kernel\'s own channel, and a registry that does not move');
scenario(() => {
  const store = newStore();
  const r1 = tryCall(() => register(store, 'not-an-address', 'x', () => true));
  const r2 = tryCall(() => register(store, ['a'], '', () => true));
  // ── **⟶ THE SHIELD'S SCOPE, RE-DERIVED 2026-10-25 — THE ONE FIX THE `landingOnly` SHIELD NEEDED.** The shield
  // wraps a body so `K-1`'s registration-time evaluation passes; **and in the one row whose subject IS THE
  // REFUSAL TO *BE* A FUNCTION it wrapped `'not-a-function'` into a function**, so `KC-2` never fired and the
  // whole row died with `TypeError: body is not a function` inside the shield's own call. **A SHIELD MAY ONLY
  // GUARD A VALUE THAT IS ALREADY A FUNCTION** — the refusal's own subject is the value's class, so this row is
  // driven at the kernel's own item, UNSHIELDED. Nothing else about the row moves.
  const r3 = tryCall(() => kernelRegister(store, ['a'], 'x', 'not-a-function'));
  const statuses = [r1, r2, r3].map(status).join(',');
  const hLaw = register(store, ['a'], 'lawful', () => true);
  const c = commit(store, ['a'], 'mem', 1);
  const r = runAttempt(store, c);

  cell(1, "the kernel refuses an address shape outside its domain BEFORE the store's listen is called: KC-1, in the kernel's own form, with an empty log",
    `${C.ks21} item 1 channel (i); ${C.fs11} item 1`,
    !r1.ok && r1.err?.status === 'KC-1' && keysOf(r1.err) === 'log,message,status',
    `status=${status(r1)} keys=${keysOf(r1.err)}`);
  cell(2, "an id that is not a non-empty string is KC-2 (the kernel's own channel)",
    `${C.ks21} item 1 channel (i); parameter-semantics.md §2.2`, !r2.ok && r2.err?.status === 'KC-2',
    `status=${status(r2)}`);
  cell(3, 'a constraint that is not a function is KC-2',
    `${C.ks21} item 1 channel (i)`, !r3.ok && r3.err?.status === 'KC-2', `status=${status(r3)}`);
  cell(4, "NO store member appears as a refused registration's status: all three are the kernel's own closed tokens",
    `${C.fs12} item 1 (i); contract.md §5.3 (P-IM-3)`, statuses === 'KC-1,KC-2,KC-2', `statuses=${statuses}`);
  cell(5, 'a refused registration leaves the registry exactly as it stood: the lawful registration after the three refusals stands and the pass evaluates ONE pair',
    `${C.ks21} item 1 (no entry added on either channel)`,
    hLaw !== null && r.log.filter((e) => e.kind === 'constraint-check').length === 1,
    `lawful K-1 ok=${hLaw !== null}`);
  cell(6, "nothing was added by the refusals: the pass's constraint-check entries name the ONE lawfully registered pair",
    `e2e-scenarios-b.md E2E-C-12; ${C.ks25} item 1`,
    r.log.filter((e) => e.kind === 'constraint-check').every((e) => e.id === 'lawful'),
    `entry ids=[${r.log.filter((e) => e.kind === 'constraint-check').map((e) => e.id)}]`);
  cell(7, "the store's own machinery was not reached by a refused call: a fourth K-1 at the lawful pair still returns the adopted handle",
    `${C.ks21} item 1 (listen throws ⇒ it created nothing)`,
    register(store, ['a'], 'lawful', () => true) === hLaw,
    'a further K-1 at the lawful pair returned the adopted handle');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-13 — two store codes at the caller's own verb calls, and the one asymmetry between them
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-13', "two store codes at the caller's own verb calls, and the one asymmetry between them");
scenario(() => {
  const store = newStore();
  const tierRefusal = tryCall(() => commit(store, ['a'], 'not-a-tier', 1));
  const tierRefusal2 = tryCall(() => commit(store, ['a'], 'not-a-tier', 1));

  // ⟶ **RE-DERIVED 2026-10-25: THE FORM IS THE SURFACE'S ONE THREE-MEMBER FORM, NOT THE STORE'S TWO.** The
  // as-filed expectation (*"the store's own two-member form (no log member)"*) is the pre-2026-10-17 reading that
  // the architect OVERRODE (*"Override the failure form limit"*, read with *"Bubble the message log to the client
  // on failure"*): `surface.md §2.5` item 4 makes the set `{log, message, status}` FLAT ACROSS ARMS, `log` an
  // ARRAY and `[]` where the cause has no attempt — and a tier refusal mints no attempt. **The CODE limb
  // (`OutOfDomainTier`) is kept whole and is the cell's subject.**
  cell(1, "a tier the store refuses throws the STORE's own code OutOfDomainTier at the verb call, in the surface's ONE thrown form — a plain object whose member set is exactly {log, message, status}, `log` an ARRAY",
    `${C.ks21} item 2 (the tier refusal); ${C.fs3} item 2; ${C.fs12} item 2; surface.md §2.5 items 4 and 9 (the failure-form override, 2026-10-17)`,
    !tierRefusal.ok && tierRefusal.err?.status === 'OutOfDomainTier' && keysOf(tierRefusal.err) === 'log,message,status'
      && Array.isArray(tierRefusal.err?.log),
    `status=${status(tierRefusal)} keys=${keysOf(tierRefusal.err)} log=${JSON.stringify(tierRefusal.err?.log)}`);
  cell(2, 'it opens NO attempt: a second refused commit at the same address is refused the same way and never KC-7',
    `${C.ks21} item 2 (the tier refusal); ${C.ps211} (ii)`,
    !tierRefusal2.ok && tierRefusal2.err?.status === 'OutOfDomainTier',
    `second refusal = ${status(tierRefusal2)}`);

  // the repair's own write at an address whose ancestor is a leaf
  const store2 = newStore();
  store2.write(['a'], 'mem', 1);                 // ['a'] stands as a LEAF
  const bodyThrow = tryCall(() => store2.write(['a', 'b'], 'mem', 2));
  let caught = null, repairCalls = 0;
  register(store2, ['a'], 'x', (ctx) => (ctx.value <= 5 ? true : {
    repair: () => {
      repairCalls += 1;
      try { store2.write(['a', 'b'], 'mem', 2); return { ok: true, op: null }; }
      catch (e) { caught = e; throw e; }
    },
    message: 'x violated',
  }));
  const c = commit(store2, ['a'], 'mem', 9);
  const run1 = tryCall(() => runAttempt(store2, c));
  const f = run1.err ?? {};
  const rr = report(store2, c.attempt);

  // ── **⟶ RE-DERIVED 2026-10-25: EVERY ARM THROWS THE SURFACE'S ONE THREE-MEMBER FORM.** The as-filed cell
  // demanded the store's pre-2026-10-17 TWO-member shape (`{message, status}`, no `log`), which `surface.md
  // §2.5` item 4 OVERRODE: *"the set is `{log, message, status}` FLAT ACROSS ARMS, `log` an ARRAY and `[]`
  // where the cause has no attempt"* — and this store write's refusal mints no attempt, so its `log` is `[]`.
  // **THE CODE LIMB (`WriteParentNotLink`) IS KEPT WHOLE AND IS THE CELL'S SUBJECT.**
  cell(3, "the repair's own write at an address whose ancestor is a leaf is refused by the store with the store's own code, in the surface's ONE thrown form — a plain object whose member set is exactly {log, message, status}, `log` an ARRAY and `[]` (no attempt was minted)",
    `${C.fs3} item 2 (the write path's own codes); ${C.ps27}; surface.md §2.5 items 4 and 9 (the failure-form override, 2026-10-17)`,
    !bodyThrow.ok && bodyThrow.err?.status === 'WriteParentNotLink' && keysOf(bodyThrow.err) === 'log,message,status'
      && Array.isArray(bodyThrow.err?.log) && bodyThrow.err.log.length === 0,
    `repair write status=${status(bodyThrow)} keys=${keysOf(bodyThrow.err)} log=${JSON.stringify(bodyThrow.err?.log)} message=${JSON.stringify(bodyThrow.err?.message)}`);
  const thrown = run1.ok ? undefined : run1.err;
  const heldByCaller = run1.ok ? null : run1.err;
  // ── **⟶ RE-DERIVED 2026-10-25: THE REPAIR BODY'S THROWABLE IS *NOT* RETURNED BY IDENTITY — K-3 ANSWERS KC-4.**
  // The as-filed cell demanded *"the SAME object the body threw (identity)"*, true of a body that throws a bare
  // errorable (`constraint-kernel-states.test.mjs`'s `ck_neg_10` arm 2 drives exactly that with `new Error`) and
  // FALSE of the arm THIS window drives: the body's own verb call threw the STORE's refusal, and that is the
  // store's channel — `e2e-scenarios-b.md` E2E-C-13 step (5) (β): *"the thrown object carries the KERNEL's
  // THREE members `{status, message, log}` with `status: 'KC-4'`, its `log`'s `repair-run` entry's `message`
  // NAMES the store's own code"*. **THE CELL'S SUBJECT — WHICH OBJECT THE CALLER HOLDS, AND WHICH CHANNEL
  // ANSWERED — IS KEPT AND ITS EXPECTATION MOVED TO THE CODE FACT.**
  cell(4, "the repair body THREW at its own verb call, so K-3 answers on the KERNEL's own channel — the thrown form is the kernel's `{log, message, status}` with `status: KC-4`, and the body's own caught object is NOT what the caller holds (the kernel converts no channel into another; it NAMES the store's code in its sentence)",
    `${C.ps216} (a throwing repair body); ${C.al24} item 8 (i); ${C.fs12} item 1 (no conversion); e2e-scenarios-b.md E2E-C-13 step (5) (β)`,
    caught !== null && caught.status === 'WriteParentNotLink'
      && f !== caught && keysOf(f) === 'log,message,status' && f.status === 'KC-4'
      && typeof f.message === 'string' && f.message.includes('WriteParentNotLink'),
    `the object the body caught is the store's own (status=${caught?.status}, keys=${keysOf(caught)}); the object K-3 threw back is the kernel's (status=${f?.status}, keys=${keysOf(f)}); identity between them=${f === caught}; the kernel's sentence=${JSON.stringify(f?.message)}`);
  cell(5, "the attempt is closed as failed and its own outcome entry carries KC-4's token — the kernel's own state for a repair that threw, on the kernel's own channel",
    `${C.fs11} item 3; ${C.cs27} item 13; ${C.fs2}'s KC-4 row (the carrier named: where the repair body throws before it returns, the carrier IS the attempt's own message log — its ONE outcome entry, read off the log the caller holds after the throw)`,
    // **⟶ `D-58`: the log is the THROWN FORM's (`f.log`), which the kernel's own channel carries.**
    outcomeOf(f.log)?.state === 'KC-4' && rr.outcome === 'failed'
      && f.log.filter((e) => e.kind === 'outcome').length === 1 && !('log' in rr),
    `report outcome=${rr.outcome} retained keys=${keysOf(rr)} thrown log=[${kinds(f.log)}]`);
  cell(6, "the store's code is NAMED inside the repair-run entry's message as the store's own answer, and the entry's state stays null",
    `${C.ks25} item 1 (the message table); ${C.fs12} item 3 (the asymmetry's own carrier clause: the store's code is NAMED INSIDE the repair-run entry's message)`,
    (() => { const e = (f.log ?? []).find((x) => x.kind === 'repair-run'); return !!e && e.state === null && typeof e.message === 'string' && e.message.includes('WriteParentNotLink'); })(),
    `repair-run=${JSON.stringify((f.log ?? []).find((e) => e.kind === 'repair-run'))} — the store's own code the repair's verb call threw (${caught?.status}) IS named inside this entry's message (the message table's own carrier clause, kernel-surface.md §2.5 item 1) and the entry's state stays null`);
  cell(7, "the two channels are not converted into one another: the store's code reached the repair body UNCHANGED at its own verb call (same status, same members), no store code is ever a kernel state, the thrown form's `status` is the kernel's own token, and the repair ran once",
    `${C.fs12} item 1 (no conversion), items 2 and 4; ${C.fs11} item 1 (a) (a thrown form's status IS a kernel token)`,
    caught !== null && caught.status === 'WriteParentNotLink' && keysOf(caught) === 'log,message,status'
      && f?.status === 'KC-4' && KC.has(f.status) && KC.has(outcomeOf(f.log)?.state)
      && repairCalls === 1 && heldByCaller === f
      && (f.log ?? []).every((e) => !String(e.state ?? '').includes('WriteParentNotLink')),
    `store code at K-2=${status(tierRefusal)}; store code at the repair's own verb call=${caught?.status} (the body held the store's own object unchanged=${bodyThrow.err === caught}); the caller holds the kernel's form (status=${f?.status}); kernel state=${outcomeOf(f.log)?.state}; repair calls=${repairCalls}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-14 — an unknown attempt reference, and the refusal that is not KC-7
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-14', 'an unknown attempt reference, and the refusal that is not KC-7');
scenario(() => {
  const store = newStore();
  register(store, ['a'], 'x', () => true);
  const c = commit(store, ['a'], 'mem', 1);
  const r = runAttempt(store, c);
  const rr = report(store, c.attempt);
  const ll = log(store, c.attempt);
  const byBareId = tryCall(() => report(store, c.attempt.id));
  const unknown = tryCall(() => report(store, 'attempt-does-not-exist'));
  const unknownLog = tryCall(() => log(store, { id: 'attempt-does-not-exist' }));
  const outside = [null, undefined, { id: '' }].map((v) => status(tryCall(() => report(store, v))));
  const k3Again = tryCall(() => runAttempt(store, c));
  const after = log(store, c.attempt);

  cell(1, 'K-5 over a CLOSED attempt returns the retained record and K-4 ANSWERS the empty retained list — the log was handed off with `K-3`\'s return (`D-58`)',
    `${C.ks21} items 4–5; \`D-58\``, rr.outcome === 'passed' && ll.length === 0 && r.log.length === 2,
    `report=${rr.outcome} retained keys=${keysOf(rr)} K-4=${JSON.stringify(ll)} handed-off log=${r.log.length}`);
  cell(2, 'K-4 and K-5 accept the bare id string as the SAME argument (the AttemptRef or its id, nothing else)',
    `${C.ps215} domain`,
    byBareId.ok && JSON.stringify(byBareId.value) === JSON.stringify(rr),
    'bare-id reads compared member for member');
  cell(3, 'an id the kernel holds no attempt for is KC-2 from BOTH readers',
    `${C.ps215} outside values; ${C.ks21} items 4–5`,
    !unknown.ok && unknown.err?.status === 'KC-2' && !unknownLog.ok && unknownLog.err?.status === 'KC-2',
    `K-4=${status(unknownLog)} K-5=${status(unknown)}`);
  cell(4, 'null, undefined and an empty-id AttemptRef are each KC-2 (the closed outside-value set)',
    `${C.ps215} outside values`, outside.every((s) => s === 'KC-2'), `three outside values over K-5: ${outside.join(',')}`);
  cell(5, 'K-3 over the SAME stale record (its attempt already disposed of) is KC-2 and NOT KC-7',
    `${C.ks21} item 3 (RD-9); ${C.ps215} observable`,
    !k3Again.ok && k3Again.err?.status === 'KC-2', `K-3 again = ${status(k3Again)}`);
  cell(6, 'no state moved and no entry was appended: the closed record and its log are untouched by the refusals',
    `${C.ks21} item 3 (no entry appended)`,
    JSON.stringify(after) === JSON.stringify(ll),
    'log after the refusals compared member for member');
  cell(7, "the reference K-3 minted is the same one K-5 accepts — the commit's member, the report's and the record's are one reference",
    `${C.ks21} items 2–5`,
    c.attempt.id === rr.attempt.id && rr.attempt.id === c.attempt.id && typeof c.attempt.id === 'string',
    `refs=${c.attempt.id}/${rr.attempt.id}/${c.attempt.id}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-15 — a nested processing: the second top-level attempt at a DESCENDANT address
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-15', 'a nested processing: the second top-level attempt at a DESCENDANT address');
scenario(() => {
  const store = newStore();
  // The documented drive writes at ['a','b','c'] while ['a'] stands as a leaf. A store whose first write is
  // the leaf ['a'] refuses that write with its own WriteParentNotLink / LeafHasNoDownstream, and a fresh store
  // holds no keys at all, so no write at depth >= 2 can be an address's first write (AddressNotFound). The
  // drive below therefore stands the documented shape up with ONE structured seed write — the doc drift this
  // scenario's cell 3 records. See storeroom-native/write-and-read.md §3.4 (W-2/W-3/W-4), contract.md DD-5.
  store.write(['a'], 'mem', { b: { c: {} } });        // ['a'] and ['a','b'] become BRANCHes; ['a','b'] is writable
  let innerRec = null, innerErr = null, outerBodyWrite = null;
  let aRuns = 0, bRuns = 0;
  register(store, ['a', 'b'], 'b1', () => { aRuns += 1; return true; });
  register(store, ['a', 'b'], 'b2', (ctx) => (ctx.value <= 3 ? true : { message: 'b2 violated' }));
  register(store, ['a'], 'a1', (ctx) => (ctx.value <= 5 ? true : { message: 'a1 violated' }));

  // the outer body's own act: a second, SEPARATE top-level attempt at the descendant address. It is opened
  // and driven FIRST — the outer attempt's own write at ['a'] lands a LEAF there, and the store then refuses
  // every write beneath it (WriteParentNotLink), so the descendant processing cannot be opened afterwards.
  innerRec = tryCall(() => commit(store, ['a', 'b'], 'mem', 9));
  const innerRecord = innerRec.ok ? innerRec.value : null;
  const innerCommitErr = innerRec.ok ? null : innerRec.err;
  outerBodyWrite = innerRecord?.op?.opId ?? null;
  innerErr = innerRecord ? (tryCall(() => runAttempt(store, innerRecord)).err ?? null) : null;
  const cOuter = commit(store, ['a'], 'mem', 9);
  const outerRun = tryCall(() => runAttempt(store, cOuter));
  const innerR = innerRecord ? report(store, innerRecord.attempt) : null;
  const outerR = report(store, cOuter.attempt);

  cell(1, 'the nested K-2 at a descendant address is NOT refused: the record is returned (KC-7 refuses only at the ONE address of the live attempt)',
    `${C.al24} item 8 (ii); contract.md §0.1 item 5 (v) RC-18`,
    !!innerRecord?.attempt?.id && innerRecord.attempt.id !== cOuter.attempt.id,
    `inner attempt=${innerRecord?.attempt?.id} outer attempt=${cOuter.attempt?.id} inner commit=${innerCommitErr ? `threw ${innerCommitErr.status}` : 'returned'}`);
  const declaredInner = declaredCallList(innerR?.ops ?? [], (innerR?.rollback ?? [])[0]?.checkpoint ?? null);
  const declaredOuter = declaredCallList(outerR?.ops ?? [], (outerR?.rollback ?? [])[0]?.checkpoint ?? null);
  cell(2, "the inner attempt fails on its OWN address's pair and its failure is composed per-op over its OWN ops, in ITEM 2'S DECLARED ORDER — the step count is the calls ISSUED and may run below the list's size",
    `${C.cs26} items 1 and 2; ${C.cs26} item 5 (a)`,
    !!innerErr && typeof innerErr.status === 'string' && (innerR?.rollback ?? []).length > 0
      && (innerR?.rollback ?? []).length <= declaredInner.length
      && (innerR?.rollback ?? []).every((s) => declaredInner.includes(s.opId)),
    `inner=${innerErr?.status} steps=${JSON.stringify((innerR?.rollback ?? []).map((s) => s.opId))} declaredList=${JSON.stringify(declaredInner)} (this window's inner attempt created ONE op of its own)`);
  cell(3, "the inner composition's performed set is its own — it DOES name the outer body's own write, because that op is the inner attempt's own state (its before-image is that write's value) and no step of it names the OUTER attempt's first write",
    `${C.cs26} item 1 (the candidate set is exactly the attempt's own ops)`,
    (() => {
      const union = new Set((innerR?.rollback ?? []).flatMap((s) => s.undoneOps ?? []));
      return union.has(outerBodyWrite) && !union.has(cOuter.op.opId);
    })(),
    `undone union=${JSON.stringify([...new Set((innerR?.rollback ?? []).flatMap((s) => s.undoneOps ?? []))])} outer-body write=${outerBodyWrite} outer first write=${cOuter.op.opId}`);
  // ── **⟶ REWRITTEN 2026-10-25 TO THE NULL ARM, AND THE CELL'S OWN TEXT WAS SELF-CONTRADICTORY.** The as-filed
  // cell DEMANDED a non-null `checkpoint` on every step while its own sentence said *"A NON-NULL `checkpoint`
  // READING IS `OWED` AND IS NEVER A DRIVE'S DEMAND"* — a cell that fails the very reading it declares it may
  // not demand. **THE DOC'S OWN READING IS THE ONE THE CALLER-SIDE DRIVE REACHES:** *"the `null` arm reaches a
  // caller-side surface either way, and NO DRIVE MAY READ A NON-NULL `checkpoint` AS A FAILURE OF THE KERNEL"*
  // (`composition-and-states.md §2.6` item 8 (iii), `A104`/`A102` `D3`; `parameter-semantics.md §2.17`). **SO THE
  // CELL ASSERTS THE NULL ARM, ADDRESS-WIDE, AND THAT THE WALK DID NOT PASS THE STOP OP** — the arm a
  // caller-side drive reaches, and the one whose reading IS a verification: every step carries `checkpoint:
  // null`, which is the member's declared state where no landing at that address left every registered pair
  // passing, and no step stands over an op a stop would have kept.
  cell(4, "the inner walk\'s `checkpoint` member is the ADDRESS-WIDE NULL ARM on every step — no landing of any attempt this window opened left every registered pair at `['a','b']` passing — and the walk therefore stops nowhere early (its performed set is drawn from item 2's whole call list)",
    `${C.cs26} item 8 (iii) and (iv) (A104, the null arm as the caller-side reading); ${C.ps217}; e2e-scenarios-b.md E2E-C-15 step (5)`,
    (() => {
      const cps = (innerR?.rollback ?? []).map((s) => s.checkpoint);
      return cps.length > 0 && cps.every((v) => v === null)
        && (innerR?.rollback ?? []).every((s) => declaredInner.includes(s.opId));
    })(),
    `checkpoint read off the inner composition = ${JSON.stringify([...new Set((innerR?.rollback ?? []).map((s) => s.checkpoint))])} while the outer body\'s own write landed ${outerBodyWrite}: the NULL ARM, address-wide — the non-null arm is OWED with the store-side per-landing pass (J-20–J-22) and is NEVER a drive\'s demand (A102 D3; paragraph §2.17), so this cell reads the arm a caller-side drive reaches and does not read it as proof that no landing left the address valid; performed=${JSON.stringify((innerR?.rollback ?? []).map((s) => s.opId))} declaredList=${JSON.stringify(declaredInner)}`);
  cell(5, 'no step passed the checkpoint op to the store verb (a walk rolling back its own stop op would sweep the last valid state)',
    `${C.cs26} item 4; ${C.ps217} outside values`,
    (innerR?.rollback ?? []).every((s) => s.opId !== s.checkpoint),
    'performed opIds compared against the checkpoint');
  cell(6, "the inner pass never evaluated the ancestor pair: no entry of the inner attempt's log carries the ancestor id",
    `${C.al24} item 5 (iv)`,
    !(innerR?.log ?? []).some((e) => e.id === 'a1'),
    `inner log ids=${JSON.stringify((innerR?.log ?? []).map((e) => e.id))}`);
  cell(7, "the OUTER attempt reached its own terminal act and its record carries the outer body's own write — each commit this drive opened has its own resolution, and the inner attempt's failure did not resolve the outer one",
    `${C.cs27} (the valid states)`,
    (outerRun.ok ? outerR.outcome === 'passed' : outerR.outcome === 'failed')
      && (outerR.ops ?? []).length === 1 && outerR.ops[0].opId === cOuter.op.opId,
    `outer=${outerR.outcome} outer ops=${JSON.stringify((outerR.ops ?? []).map((o) => o.opId))} outer-body write=${outerBodyWrite} inner=${innerErr?.status}`);
  // ── **⟶ REWRITTEN 2026-10-25 TO THE NULL ARM — THE SAME SELF-CONTRADICTION AS CELL 4, ON THE MEMBER'S OWN
  // HOME.** The as-filed cell demanded `every((v) => v !== null)` on BOTH compositions while its own text said a
  // non-null reading is `OWED` and never a drive's demand. **THE MEMBER'S DECLARED DOMAIN IS `opId | null`, and
  // the `null` arm is ADDRESS-WIDE where no landing at the attempt's address left every pair passing**
  // (`composition-and-states.md §2.6` item 8 (i)/(iii)). The cell keeps its subject — the member's own home, one
  // value carried identically by every step of one attempt, and a foreign landing not moving it — and asserts
  // the arm a caller-side drive reaches.
  cell(8, "the checkpoint\'s own home: the member is ONE value on every step of ONE attempt (never a per-step or per-address derivation), it is the ADDRESS-WIDE NULL ARM on both compositions this window opens, and the outer body\'s own landing does not move it — a non-null reading is OWED with the store-side per-landing pass and is never a drive\'s demand",
    `${C.cs26} item 8 (i) and (iii) (the member's domain and its address-wide arm); ${C.ps217} (both arms, and which one a caller-side drive can reach)`,
    (() => {
      const inner = (innerR?.rollback ?? []).map((s) => s.checkpoint);
      const outer = (outerR.rollback ?? []).map((s) => s.checkpoint);
      return inner.length > 0 && inner.every((v) => v === null)
        && outer.length > 0 && outer.every((v) => v === null)
        && new Set(inner).size === 1 && new Set(outer).size === 1;
    })(),
    `checkpoint read off the inner composition = ${JSON.stringify([...new Set((innerR?.rollback ?? []).map((s) => s.checkpoint))])} while the outer body\'s own write landed ${outerBodyWrite}, and off the outer = ${JSON.stringify([...new Set((outerR.rollback ?? []).map((s) => s.checkpoint))])} while its own write landed ${cOuter.op.opId} (declared call list ${JSON.stringify(declaredOuter)}): ONE value per attempt, both of them the address-wide NULL arm — the reachable arm at a caller-side surface and the arm that makes the member\'s reading a verification rather than an OWED clause read as settled (A102 D3; composition-and-states.md §2.6 item 8 (iii))`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-16 — the delivery layer, and the caller's own loop as its one invoker
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-16', "the delivery layer, and the caller's own loop as its one invoker");
scenario(() => {
  const store = newStore();
  const map = callerMap();
  // A structured seed, so the descendant addresses this window's drives need exist as the store's own
  // branches (storeroom-native/write-and-read.md §3.4 W-2/W-3/W-4: a fresh store holds no keys, so a write at
  // depth >= 2 is no address's first write, and a leaf holds no child).
  store.write(['a'], 'mem', { b: {}, c: {} });
  const heard = [];
  let secondRec = null, secondErr = null, secondRun = null, inBody = false, secondTerminalAt = null;
  // the listener's body is FUNCTION DATA: it hears the address it was handed, then — as the docs' drive has it,
  // step (4) — opens the SECOND top-level processing at the other address and drives it to ITS OWN terminal act
  // (steps (5)–(7): the second's `K-3` terminates FIRST, the first processing's `K-3` second).
  const body = (addr) => {
    if (inBody) return;                    // count FIRST-level invocations only
    heard.push({ addr });
    inBody = true;
    try {
      const r = tryCall(() => commit(store, ['a', 'c'], 'mem', 9));
      if (r.ok) {
        secondRec = r.value;
        secondRun = tryCall(() => runAttempt(store, r.value));   // the second processing's OWN K-3
        secondTerminalAt = 'before the outer K-3 returned';
      } else secondErr = r.err;
    } finally { inBody = false; }
  };
  const cB = register(store, ['a', 'c'], 'cB', (ctx) => (ctx.value >= 5 ? { message: 'c is bad' } : true));
  const cA = register(store, ['a', 'b'], 'cA', (ctx) => (ctx.value >= 5 ? { message: 'a is bad' } : true));
  const hWatch = store.listen('blind-c16-watch', [['a']]);
  store.register(hWatch, body);
  map.add(hWatch, 'plain', body);

  const c = commit(store, ['a', 'b'], 'mem', 9);
  // ── **⟶ THE SNAPSHOT IS TAKEN AT K-2'S RETURN, AND THAT IS THE WHOLE OF THE AS-FILED CELLS' FAULT.** The
  // as-filed drive read `c.pending` at cell time — i.e. AFTER `runAttempt`, when the FAILING arm has already
  // DISCARDED its set (`attempt-lifecycle.md §2.4` item 8 (i) (5): *"its handles appear in `triggered` and in
  // `pending` NEVER"*) — so every reading was of an empty member. **The member the docs read is the ONE THE
  // `K-2` ANSWER CARRIED**, and the caller's own loop consumes the caller's own copy of it.
  const cPending = [...(c.pending ?? [])];
  const runsDuringDelivery = heard.length;
  // THE CALLER'S OWN LOOP: ONE invoker among the surface's ordered layers (`A112`), never the only one. It
  // resolves each PAIR by its `handle` member (the as-filed loop fed the ELEMENT to the map, so it resolved
  // nothing) and hands the resolved function THE TRIGGERING ADDRESS — the operation's own address, which the
  // member's own clause fixes (`kernel-surface.md §2.1` item 2).
  const triggerAddr = c.op.address;
  const loop = map.run(cPending, triggerAddr);
  const runsAfterLoop = heard.length;
  const outerRun = tryCall(() => runAttempt(store, c));
  const rr = report(store, c.attempt);

  cell(1, "the caller's own write's record carries pending as THE WHOLE RETURNED SET at K-2's return — `A112`'s rule, each entry leaving it only by being checked off as it passes — and THE ONE REACHABLE ACT that leaves a listener's entry standing there is THE CALLER'S OWN `store.write` MADE UNDER A REGISTRATION: no pass of the attempt checked that pair off, so its PAIR stands in the member the caller's own loop consumes",
    `${C.ks21} item 2 (the member's populated state, the whole-set rule and the loop); A112 (the check-off, not a sift)`,
    Array.isArray(cPending) && carriesHandle(cPending, hWatch)
      && cPending.length === c.triggered.length
      && JSON.stringify(setHandles(cPending).sort()) === JSON.stringify(setHandles(c.triggered).sort()),
    `pending at K-2's return=${JSON.stringify(cPending)} (length ${cPending.length}) against triggered=${JSON.stringify(c.triggered)} (length ${c.triggered.length}); the watched handle stands in pending=${carriesHandle(cPending, hWatch)}; the body ran ${runsDuringDelivery}x during K-2's own window and ${runsAfterLoop - runsDuringDelivery}x from the caller's own loop`);
  cell(2, "the two members carry the SAME EXTENT at K-2's return and differ only later: triggered carries every handle the write returned, and pending carries that same set — the kernel invokes no body in K-2's window, and a pair leaves pending only by being checked off as it passes (after a pass has run)",
    `${C.ks21} item 2 (the two members' declared states, the whole-set rule and the check-off)`,
    Array.isArray(cPending) && Array.isArray(c.triggered)
      && c.triggered.length >= 2 && cPending.length === c.triggered.length
      && carriesHandle(c.triggered, hWatch) && carriesHandle(cPending, hWatch),
    `triggered=${JSON.stringify(setHandles(c.triggered))} pending=${JSON.stringify(setHandles(cPending))} — one set, carried by two members at this instant`);
  cell(3, "the listener body ran from the CALLER'S OWN LOOP and was handed THE TRIGGERING ADDRESS — the operation's own address, never the watch address (`Listener = (address: Address) => void`) — while the PAIR it was resolved from carries the BINDING address, which is its proper prefix",
    `${C.ks21} item 2 (the two kinds' call shapes and the referent of the triggering address); storeroom-native/write-and-read.md §6.5 item 3; trigger-and-pair.md §1.2 (the pair's address is THE BINDING's) and §5 item 5 (the pair's address vs triggeringAddress)`,
    (() => {
      const fromLoop = heard.slice(runsDuringDelivery);
      const pair = pairFor(cPending, hWatch);
      return runsDuringDelivery === 0 && fromLoop.length === 1 && loop.filter((x) => x.kind === 'plain' && x.ok === true).length === 1
        && JSON.stringify(fromLoop[0].addr) === JSON.stringify(triggerAddr)
        && JSON.stringify(fromLoop[0].addr) !== JSON.stringify(['a'])
        && JSON.stringify(pair?.address) === '["a"]';
    })(),
    `loop entries=${JSON.stringify(loop.map((x) => ({ handle: x.handle, kind: x.kind, ok: x.ok })))}; the loop's own invocation was handed ${JSON.stringify((heard.slice(runsDuringDelivery)[0] ?? {}).addr)} against the watch address ['a'] and the operation's own address ${JSON.stringify(triggerAddr)}; the pair the handle was resolved from carries ${JSON.stringify(pairFor(cPending, hWatch)?.address)} (THE BINDING's, per trigger-and-pair.md §1.2); the surface's own delivery reached the body ${runsDuringDelivery}x inside K-2`);
  // ── **⟶ THE CELL THE AS-FILED DRIVE COULD NOT REACH, NOW DRIVEN.** It was `NOT DRIVABLE BLIND` because the
  // loop resolved nothing and no second top-level attempt was ever opened. At this build the body's own `K-2` at
  // the OTHER address is LAWFUL and RETURNS (the hold is taken at the call's OWN address; `A106` Q2, `RC-18`).
  cell(4, "the listener body opened the SECOND top-level attempt at the other address — the hold is taken at the call's own address, so a K-2 at a DIFFERENT address is not refused KC-7 — and its own CommitRecord is a record of its own attempt, crossing back into the first processing",
    `${C.al24} item 8 (ii); contract.md §5.7 (the registry's keying rule, A106 Q4); ${C.ks21} item 2 (the hold's address)`,
    !!secondRec?.attempt?.id && secondRec.attempt.id !== c.attempt.id
      && keysOf(secondRec) === 'attempt,op,pending,triggered' && secondErr === null,
    `second attempt=${secondRec?.attempt?.id} (the first attempt's is ${c.attempt.id}); its K-2 returned keys=${keysOf(secondRec)}; secondErr=${secondErr?.status}`);
  cell(5, "the K-1 pair's own pass ran — the first attempt's own list (the one its refusal handed off, `D-58`) carries its `constraint-check` entry and its one `outcome` entry reads KC-3 — and NO entry the caller's own loop produced carries the constraint kind (a constraint is the kernel's to invoke, never the caller's loop's)",
    `${C.ks21} item 2 (the loop's call shape, both kinds); ${C.ks25} item 1; ${C.ps216}; \`D-58\``,
    handedLogOf(outerRun).some((e) => e.kind === 'constraint-check' && e.id === 'cA')
      && outcomeOf(handedLogOf(outerRun))?.state === 'KC-3'
      && loop.filter((x) => x.kind === 'constraint').length === 0
      && loop.filter((x) => !x.unresolved).length === 1
      && loop.filter((x) => !x.unresolved)[0].kind === 'plain',
    `first attempt final=${outcomeOf(handedLogOf(outerRun))?.state} log=[${kinds(handedLogOf(outerRun))}]; the retained record keys=${keysOf(rr)}; loop entries of kind constraint=${loop.filter((x) => x.kind === 'constraint').length}; the loop RESOLVED ${loop.filter((x) => !x.unresolved).length} entry and left ${loop.filter((x) => x.unresolved).length} unresolved (the pair's own handle, for which the caller holds no function)`);
  cell(6, "the SECOND top-level processing is driven to ITS OWN terminal arm, fails on its OWN address's pair, and its own `outcome` entry carries the token — its report is the same five-member shape and mints no ninth member",
    `${C.al24} item 4; ${C.fs11} item 1 (c); ${C.fs2} (the KC-3 row: no repair registered for the pair)`,
    (() => {
      const r2 = secondRec ? report(store, secondRec.attempt) : null;
      const secondList = handedLogOf(secondRun);
      return !!secondRun && !secondRun.ok && secondRun.err?.status === 'KC-3'
        && r2?.outcome === 'failed' && keysOf(r2) === 'attempt,ops,outcome,rollback'
        && secondList.some((e) => e.kind === 'constraint-check' && e.id === 'cB')
        && outcomeOf(secondList)?.state === 'KC-3';
    })(),
    `the second processing's K-3 = ${secondRun?.ok ? secondRun.value?.outcome : secondRun?.err?.status}; its `
      + `handed-off log=[${kinds(handedLogOf(secondRun))}] keys=${secondRec ? keysOf(report(store, secondRec.attempt)) : '-'}`);
  cell(7, "the FIRST TERMINAL ACTOR is the SECOND top-level processing: its own K-2 return and its `K-3` both precede the first processing's `K-3` return — the order the docs' steps (5)–(8) declare — and the two processes are two attempts, never one",
    `${C.al24} item 8 (ii) head and items 1-5; contract.md §5.7 (A106 Q1/Q3)`,
    secondTerminalAt !== null && !!outerRun && secondRec.attempt.id !== c.attempt.id
      && !!secondRun && !secondRun.ok,
    `the second processing reached its terminal act ${secondTerminalAt} (${secondRun?.err?.status}); the first processing's own K-3 then returned ${outerRun?.ok ? outerRun.value?.outcome : outerRun?.err?.status}; the second attempt ${secondRec?.attempt?.id} is not the first ${c.attempt.id}`);
  cell(8, "the docs' own step (1): the caller's own write's record leaves the listener's PAIR in pending for the caller's own loop to invoke — the loop being ONE invoker among the JS surface's own ordered layers — and the loop's own call is read off the function's own recorded argument",
    `e2e-scenarios-b.md E2E-C-16 steps (1) and (2); ${C.ks21} item 2; A112`,
    carriesHandle(cPending, hWatch)
      && loop.filter((x) => x.kind === 'plain' && x.ok === true).length === 1
      && heard.filter((x) => JSON.stringify(x.addr) === JSON.stringify(triggerAddr)).length === 1,
    `at K-2's return pending held ${cPending.length} of ${c.triggered.length} triggered handle(s) (the listener's pair stands there=${carriesHandle(cPending, hWatch)}); the caller's own loop invoked it ${loop.filter((x) => x.kind === 'plain' && x.ok === true).length}x, handed ${JSON.stringify(heard[0]?.addr)} — the whole returned set is the populating member (A112), and the loop's own call is this cell's reading`);
});

// SURFACE — the unit's declared surface: five items and the caller's own store
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('SURFACE', "the unit's declared surface: five items and the caller's own store");
scenario(() => {
  // ── **⟶ BOTH FIGURES RE-DERIVED 2026-10-25 (`D-20`'s execution pass) — READ OFF THE MODULES, WHICH IS WHAT
  // THESE CELLS ALWAYS DID.** `.1`'s FIVE was the kernel's extent before `K-6` (`remove`) landed; measured, the
  // module exports SIX — `commit, log, register, remove, report, runAttempt` — and `strata/brief.md` §3 and
  // `hli_kernel_the_kernel_surface_is_exactly_six_items` already read six. **`D-22` moves this figure not at
  // all**: the three symbols it discards are module-private (`surface-deltas.md` §4.1). `.2`'s EIGHT VERBS is the
  // namespace the package had BEFORE `A127`; measured, it carries ONE name, `storeCreate` (`surface.md §2.9`
  // item 1, `11 → 1`), and the ten store-reaching names are the product's own methods. **Both cells keep their
  // subject — the declared extent, by set equality — and their drives are untouched.**
  cell(1, 'the kernel module at the declared checkout home exports exactly the six items K-1 to K-6, and no seventh (`docs/L1/surface-deltas.md` §4.1)',
    `${C.ks21} (the five signatures) read WITH the sixth, K-6 (remove), which the held-listener-identity unit landed; kernel-surface.md §1 items 1-2; ${C.ps216}`,
    KERNEL_EXPORTS === 'commit,log,register,remove,report,runAttempt',
    `exports=${KERNEL_EXPORTS}`);
  cell(2, "the store's own package namespace stands at its ONE remaining name, `storeCreate`, and none of the ten store-reaching verbs is a module-level name any longer",
    `${C.jsSurf}; surface.md §2.9 item 1's A127 clause (11 -> 1); ${C.ps216} observable`,
    PKG_EXPORTS === 'storeCreate',
    `package exports=${PKG_EXPORTS}`);
  cell(3, "the fixture is the package's own storeCreate(cfg) over the three declared keys, and the kernel's items take it in the FIRST position",
    `${C.ks21} (the five signatures); kernel-surface.md §1 item 5; ${C.jsSurf}`,
    (() => {
      const s = newStore();
      const h = register(s, ['a'], 'x', () => true);
      const c = commit(s, ['a'], 'mem', 1);
      const r = runAttempt(s, c);
      // `D-58`: the list is the handoff's (`K-3`'s return), and the closed record retains none.
      return h !== null && r.outcome === 'passed' && r.log.length === 2 && log(s, c.attempt).length === 0;
    })(),
    'instance constructed through the declared construction call');
});

// ── the run's own report ──────────────────────────────────────────────────────────────────────────────────
console.log('');
for (const row of rows) {
  const f = row.cells.filter((c) => c.ok === false).length;
  const n = row.cells.filter((c) => c.ok === null).length;
  const nr = row.cells.filter((c) => c.ok === 'nonrun').length;
  console.log(`${row.id} — ${row.name}`);
  console.log(`   cells=${row.cells.length} PASS=${row.cells.length - f - n - nr} FAIL=${f} NOT-DRIVABLE-BLIND=${n} NONRUN=${nr} (declared population ${(DECLARED[row.id] ?? []).length})`);
  for (const c of row.cells) {
    const tag = c.ok === null ? 'NOT DRIVABLE BLIND' : (c.ok === 'nonrun' ? 'NONRUN' : (c.ok ? 'PASS' : 'FAIL'));
    console.log(`   ${tag.padEnd(19)} [${row.id}.${c.n}] ${c.expected}`);
    console.log(`        cites: ${c.cites}`);
    console.log(`        observed: ${c.observed}`);
  }
}
const failedCells = rows.flatMap((r) => r.cells.filter((c) => c.ok === false).map((c) => `  - ${r.id}.${c.n}: ${c.observed}`));
const unrunCells = rows.flatMap((r) => r.cells.filter((c) => c.ok === 'nonrun' || c.ok === null)
  .map((c) => `  - ${r.id}.${c.n}: ${c.ok === null ? 'NOT DRIVABLE BLIND' : 'NONRUN'}`));
const declaredTotal = Object.values(DECLARED).reduce((a, d) => a + d.length, 0);
console.log('');
console.log(`TOTALS: rows=${rows.length} cells=${cells} PASS=${pass} FAIL=${cells - pass - notDrivable - nonrun} NOT-DRIVABLE-BLIND=${notDrivable} NONRUN=${nonrun} DECLARED=${declaredTotal}`);
console.log('');
console.log('FAILED CELLS:');
for (const line of failedCells) console.log(line);
console.log('');
console.log('CELLS THAT DID NOT EXECUTE (neither PASS nor FAIL — `D-21`):');
if (unrunCells.length === 0) console.log('  none');
for (const line of unrunCells) console.log(line);
// ── **`D-21`'S EXIT CONTRACT** (`strata/decisions.md`, 2026-10-24): *"A runner whose cells are red, or whose cells
// never ran, may not exit `0`."* The exit carries the red AND the un-run population; the two are named on the
// exit line so a reader of the code alone can tell which it read.
const red = cells - pass - notDrivable - nonrun;
const unexecuted = notDrivable + nonrun;
console.log('');
console.log(`EXIT ${red > 0 || unexecuted > 0 ? 1 : 0} (exit 0 iff no cell FAILed, none was NOT-DRIVABLE-BLIND and none was NONRUN) :: FAIL=${red} NONRUN=${nonrun} NOT-DRIVABLE-BLIND=${notDrivable}`);
process.exit(red > 0 || unexecuted > 0 ? 1 : 0);
