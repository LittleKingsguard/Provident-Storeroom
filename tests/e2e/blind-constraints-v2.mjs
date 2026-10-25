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
//   run:  node bindings/js/greens/blind-constraints-v2.mjs   (from the repository root)
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
// is bypassed. It is the same convention `bindings/js/greens/file-tier-save/scenarios.mjs`'s `atLandingOnly`
// carries for the same instant and the same reason, and it is recorded here rather than left as a silent drop.
// **WHAT IT COSTS, STATED SO IT IS NOT READ AS COVERAGE:** this file then never drives `§7.3` (b) states 2 and 3
// (a registration refused by its own evaluation) — every body passes at that instant — and the report says so.
const atLanding = (ctx) => ctx !== null && typeof ctx === 'object' && ctx.tier === null && ctx.op === null;
const landingOnly = (body) => (ctx) => (atLanding(ctx) ? true : body(ctx));
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

// the caller's own map: handle -> { kind, fn } — the ONE resolution carrier a `pending` handle is read in
function callerMap() {
  const m = new Map();
  return {
    add: (h, kind, fn) => m.set(h, { kind, fn }),
    run: (pending, addrForPlain) => {
      const out = [];
      for (const h of pending ?? []) {
        const e = m.get(h);
        if (!e) { out.push({ h, unresolved: true }); continue; }
        const r = tryCall(() => (e.kind === 'constraint' ? e.fn(e.ctx) : e.fn(addrForPlain)));
        out.push({ h, kind: e.kind, ...r });
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
const KC = new Set(['KC-1', 'KC-2', 'KC-3', 'KC-4', 'KC-5', 'KC-6', 'KC-7', 'KC-8']);
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
  cell(1, 'K-1 returns the handle the pair stands under — the caller\'s own `id`, adopted from `store.listen` and never minted by the kernel (`D-22`, `D-24`)',
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
  cell(8, "K-4 returns the closed attempt's final log and K-5 its final report — the SAME list and the same five-member report",
    `${C.ks21} items 4–5; ${C.ps25} observable`,
    JSON.stringify(log(store, c.attempt)) === JSON.stringify(r.log)
      && JSON.stringify(report(store, c.attempt)) === JSON.stringify(r),
    `log-equal=${JSON.stringify(log(store, c.attempt)) === JSON.stringify(r.log)} report-equal=${JSON.stringify(report(store, c.attempt)) === JSON.stringify(r)}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-2 — a two-op failing attempt: the unrepaired violation fails it and the composition rolls both ops back
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-2', 'a two-op failing attempt: the unrepaired violation fails it and the composition rolls both ops back');
scenario(() => {
  const store = newStore();
  let opRepair = null;
  const evalAt = { x: 0, y: 0, z: 0 };
  register(store, ['a'], 'x', (ctx) => { evalAt.x += 1; return ctx.value <= 10 ? true : { message: 'x must be small' }; });
  register(store, ['a'], 'y', () => {
    evalAt.y += 1;
    return {
      repair: (rc) => { const w = store.write(rc.address, rc.tier, 50, rc); opRepair = w.op?.opId; return { ok: true, message: 'y repaired', op: w.op }; },
      message: 'y is written by r2',
    };
  });
  register(store, ['a'], 'z', () => { evalAt.z += 1; return true; });

  // THE CALLER'S OWN EARLIER WRITE AT THE ATTEMPT'S OWN ADDRESS, made before the attempt: A111's standing
  // limit is the state this window is read against — a failed commit at an address the caller already wrote
  // to UNDOES the caller's own earlier write there (composition-and-states.md §2.6 item 8 (iii)).
  const earlier = store.write(['a'], 'mem', 7);

  const cFirst = commit(store, ['a'], 'mem', 1);
  const evalAtCommit = { ...evalAt };
  const run1 = tryCall(() => runAttempt(store, cFirst));
  const f = run1.err ?? {};

  cell(1, 'K-2 returns a record whose op is the write it landed, and THE PASS WAS NOT EVALUATED BY THE COMMIT — the three registered pairs have run 0 times when K-2 has returned',
    `e2e-scenarios.md E2E-C-2 step (2) read with step (3); ${C.ks21} item 2`,
    typeof cFirst.op?.opId === 'string' && keysOf(cFirst) === 'attempt,op,pending,triggered',
    `record op=${cFirst.op?.opId} keys=${keysOf(cFirst)}; evaluations when K-2 returned: x=${evalAtCommit.x} y=${evalAtCommit.y} z=${evalAtCommit.z}`);
  cell(2, "the pass over op1 evaluates ['a']'s pairs in first-registration order and STOPS AT THE FIRST VIOLATION: x, then y (whose repair runs and lands its own op), and the re-run then halts at x — so z, registered last, is never reached",
    `${C.al24} items 5 (ii),(iv); ${C.ks25} item 1`,
    evalAt.x === 2 && evalAt.y === 1 && evalAt.z === 0
      && typeof opRepair === 'string' && opRepair !== cFirst.op.opId,
    `evaluations: x=${evalAt.x} y=${evalAt.y} z=${evalAt.z} (z never reached); repair's op=${opRepair} write op=${cFirst.op.opId}`);
  cell(3, 'the attempt fails by THROWING {status, message, log} and never by returning',
    `${C.fs11} items 1 and 4`, !run1.ok && keysOf(f) === 'log,message,status',
    `threw=${!run1.ok} keys=${keysOf(f)}`);
  cell(4, "status is the kernel's own KC-6 (the repeat violation by a pair already in appliedRepairs)",
    `${C.fs11} item 1; ${C.fs2}; ${C.al24} item 4 arm (e)`,
    f.status === 'KC-6' && typeof f.message === 'string' && f.message.length > 0, `status=${f.status}`);
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
  cell(8, "THE STANDING LIMIT (A111, the failed commit's pre-state claim WITHDRAWN BY NAME): the composition's own calls reach the store's own reach, so the address stands where THE STORE'S OWN ANSWER left it — the read answers AddressNotFound where the CALLER'S OWN EARLIER value stood, and no step's undoneOps and no clause of this directory claims the caller's earlier write left standing",
    `${C.cs26} item 8 (iii) (the withdrawal, the limit and A111); contract.md §5.7 (P-TP-7); docs/specs/storeroom-native/write-and-read.md §6.4 items 1/3/4 (M-5/M-7/M-8)`,
    (() => {
      const v = readVal(store, ['a']);
      const thrown = typeof v === 'symbol';
      const union = new Set(st.flatMap((s) => s.undoneOps ?? []));
      const outsideTheAttempt = union.has(earlier.op.opId) && !rr.ops.some((o) => o.opId === earlier.op.opId);
      return (thrown || v === null || v === '') && outsideTheAttempt;
    })(),
    `read after failure = ${readOr(store, ['a'])} (the caller's earlier write at ['a'] was ${JSON.stringify(7)}, op ${earlier.op.opId}); report ops=${JSON.stringify(rr.ops.map((o) => o.opId))}; undone union=${JSON.stringify([...new Set(st.flatMap((s) => s.undoneOps ?? []))])} — THE STANDING LIMIT READ OFF THE STORE'S OWN ANSWER: the attempt's first performed call swept op ${earlier.op.opId}, an op THIS ATTEMPT NEVER CREATED, so the address's pre-existing write is deleted and read answers AddressNotFound where the caller's own earlier value stood`);
  cell(9, "the docs' own step (2) premise: `op1`'s landing VIOLATED `['a']`'s pair y AT ITS OWN LANDING — a write is checked atomically as it lands, which is what makes the checkpoint clause of step (7) and the whole checkpoint member meaningful — A STORE-SIDE OBLIGATION THIS CELL CANNOT OBSERVE AND MUST NOT READ AS SATISFIED",
    `${C.cs26} item 8 (i)–(iii); ${C.ps217}; contract.md §0.1 item 5 (i); e2e-scenarios.md E2E-C-2 step (7)`,
    evalAtCommit.x > 0 || evalAtCommit.y > 0,
    `OWED (the per-landing pass is the store-side pass J-20–J-22 declare; owner the architect, positive revisit condition an ACTIVE decisions row fixing the store-side evaluation seam): the live K-2 for this very window returned with the registered pairs evaluated x=${evalAtCommit.x} y=${evalAtCommit.y} z=${evalAtCommit.z} times — the kernel runs NO constraint pass when a write lands, and every constraint-check entry of this attempt appears only at K-3's own pass. The landing that step (7) says VIOLATED pair y was never checked, so no landing of any attempt this drive opens can be recorded as one that "left every registered pair passing", and the null this window's checkpoint reads is the arm a caller-side drive reaches either way`);
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
  cell(3, 'the repair context carries exactly {op, address, id, value, tier}: the violated pair and the value standing at the address',
    `${C.ps216}; ${C.ks23} item 2`,
    keysOf(rctxSeen[0]) === 'address,id,op,tier,value' && rctxSeen[0].id === 'x'
      && JSON.stringify(rctxSeen[0].address) === '["a"]' && rctxSeen[0].value === 99 && rctxSeen[0].tier === 'mem',
    `repair ctx=${JSON.stringify(rctxSeen[0], (k, v) => (k === 'op' ? v?.opId : v))}`);
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
    (() => { const rr = report(store, c.attempt); return rr.outcome === 'failed' && JSON.stringify(rr.log) === JSON.stringify(f.log); })(),
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
group('E2E-C-5', 'the first-repeat rule, driven on BOTH limbs in three windows: KC-6, KC-6 and KC-5');
scenario(() => {
  // window (α): the violated pair's repair is NOT recorded as applied → KC-6
  const sA = newStore();
  let runsA = 0;
  register(sA, ['a'], 'c1', (ctx) => { runsA += 1; return ctx.value <= 10 ? true : { message: 'c1 violated' }; });
  register(sA, ['a'], 'c2', () => ({
    repair: (rc) => { const w = sA.write(rc.address, rc.tier, 50, rc); return { ok: true, message: 'c2 repaired', op: w.op }; },
    message: 'c2 needs fixing',
  }));
  const cA = commit(sA, ['a'], 'mem', 1);
  const fA = tryCall(() => runAttempt(sA, cA)).err ?? {};
  cell(1, "arm (f): the pair (['a'],'c1') is IN ran and NOT IN appliedRepairs, so the repeat carries the token its own limb names — KC-6",
    `${C.al24} item 4 arm (f); ${C.fs2}'s KC-6 row ("is NOT IN appliedRepairs ... NO repair is registered for it")`,
    fA.status === 'KC-6', `status=${fA.status}`);
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
  cell(4, "the second window drives the SAME limb and the same token: KC-6, with (['a'],'cQ') in ran and out of appliedRepairs",
    `${C.al24} item 4 arm (f); e2e-scenarios.md E2E-C-5 cell 5 ((β)/() half)`,
    fB.status === 'KC-6' && qRuns === 2, `status=${fB.status} cQ-fn-runs=${qRuns}`);
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
  cell(6, "arm (e): the repeated pair (['a'],'C1') IS IN appliedRepairs, so the token is KC-5 and the outcome entry's state is that same token",
    `${C.al24} item 4 arm (e); ${C.fs2}'s KC-5 row ("IS IN appliedRepairs before it")`,
    fG.status === 'KC-5' && outcomeOf(fG.log)?.state === fG.status,
    `status=${fG.status} outcome.state=${outcomeOf(fG.log)?.state} kinds=[${kinds(fG.log)}]`);
  cell(7, "no repair runs a second time: the repeated pair's repair-run count is exactly 1 and never 2",
    `${C.fs2}'s KC-5 row (its observable); e2e-scenarios.md E2E-C-5 cell 5`,
    (fG.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'C1').length === 1 && c1runs === 2,
    `C1 repair-runs=${(fG.log ?? []).filter((e) => e.kind === 'repair-run' && e.id === 'C1').length} C1-fn-runs=${c1runs}`);
  cell(8, 'the attempt is closed on every failure arm, so the stale CommitRecord the caller still holds is refused KC-2 by a second K-3 — and never KC-7',
    `${C.ks21} item 3 (RD-9); ${C.ps215}`,
    (() => { const again = tryCall(() => runAttempt(sG, cG)); return !again.ok && again.err?.status === 'KC-2'; })(),
    `second K-3 = ${status(tryCall(() => runAttempt(sG, cG)))}`);
  cell(9, "the two limbs are DISJOINT on appliedRepairs alone and not on registration: the same address produced KC-6 where the pair's repair never ran and KC-5 where it had",
    `${C.al24} item 4 (the disjointness rule, registration-keyed reading withdrawn by name); ${C.fs2} — the two rows`,
    fA.status === 'KC-6' && fG.status === 'KC-5',
    `limb tokens: (alpha)=${fA.status} (gamma)=${fG.status}`);
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
  cell(2, 'each pair is evaluated exactly once in ONE pass (at most once per pass) — read off the FIRST attempt\'s own pass, before the second attempt\'s pass moves the counters',
    `${C.al24} item 5 (iv)`, afterFirst.A === 1 && afterFirst.B === 1,
    `after the first attempt's own pass: A=${afterFirst.A} B=${afterFirst.B}; totals after the second attempt's own pass: A=${ctxA.length} B=${ctxB.length}`);
  cell(3, "BOTH halves of the two-state rule: (a) a second K-2 at the SAME address while the first attempt stands OPEN — the hold opening with K-2's own write verb and released only by the attempt's own terminal arm — is REFUSED with KC-7 BEFORE the write verb is reached; (b) a second K-2 at that address ONCE THE EARLIER ATTEMPT HAS REACHED ITS TERMINAL ARM is LAWFUL WHENEVER IT IS ISSUED and RETURNS A FRESH CommitRecord, no second act being needed beside the terminal arm",
    `${C.ks21} item 2 (the hold's timing and both halves of the rule, read whole: the KC-7 refusal and the fresh record); ${C.fs2}'s KC-7 row; ${C.fs2}'s KC-2 row`,
    heldK2.ok === false && heldK2.err?.status === 'KC-7' && keysOf(heldK2.err) === 'log,message,status'
      && freshK2.ok === true && keysOf(freshK2.value) === 'attempt,op,pending,triggered'
      && freshK2.value.attempt.id !== c1.attempt.id
      && staleK3.ok === false && staleK3.err?.status === 'KC-2',
    `second K-2 while the attempt stood OPEN = ${status(heldK2)}; second K-2 after the terminal arm = ${freshK2.ok ? `returned a fresh record (attempt ${freshK2.value.attempt.id} against ${c1.attempt.id})` : `threw ${freshK2.err?.status}`}; its own K-3 = ${freshRun ? status(freshRun) : 'not issued'}; stale K-3 = ${status(staleK3)}`);
  cell(4, "the stale record the caller still holds after a terminal arm is answered with KC-2 by K-3 and NEVER with KC-7, and no state moves: K-4 and K-5 over that same reference still return the closed record's log and report",
    `${C.ks21} item 2 (RD-9, read whole); ${C.ps215}`,
    !staleK3.ok && staleK3.err?.status === 'KC-2'
      && JSON.stringify(log(store, c1.attempt)) === JSON.stringify(r1.log)
      && JSON.stringify(report(store, c1.attempt).log) === JSON.stringify(r1.log),
    `second K-3 = ${status(staleK3)}; K-4 and K-5 over the same reference returned the attempt's own final log`);

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
  const openLenAtCommit = log(store, c.attempt).length;
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
  cell(5, "K-4 over the OPEN attempt returns the open record's own log — read before K-3, it is empty and it is a LIST",
    `${C.ks21} item 4; ${C.ks23} item 1`, openLenAtCommit === 0,
    `open log length at commit time = ${openLenAtCommit}`);

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

  // the body the store's delivery reaches: it re-enters the kernel, so this window carries a once-only guard —
  // the caller's own act, and not a kernel state; without it the body's own write would re-enter delivery.
  const sB = newStore();
  const mapB = callerMap();
  const heard = [];
  let rBinner = null, inBody = false;
  const body = (addr) => {
    heard.push({ addr });
    if (inBody) return;
    inBody = true;
    try { const rec = commit(sB, ['a'], 'mem', 1); rBinner = runAttempt(sB, rec); }
    finally { inBody = false; }
  };
  register(sB, ['a'], 'x', (ctx) => (ctx.value === 1 ? true : { message: 'bad' }));
  // ⟶ RE-SPELLED 2026-10-25: `listen(handle, addresses)` — the caller spells the handle and the call ANSWERS it
  // (`D-22`), and the address travels as the one-member SET. The handle is the identity every line below reads.
  const hB = sB.listen('blind-c8-at-a', [['a']]);
  sB.register(hB, body);
  mapB.add(hB, 'plain', body);
  const cB = commit(sB, ['a'], 'mem', 1);
  const loopB = mapB.run(cB.pending, ['a']);

  cell(1, 'both windows resolve to the success arm for the same pair and the same value',
    `${C.al24} item 4 arm (a)`, rA.outcome === 'passed' && rBinner?.outcome === 'passed',
    `alpha=${rA.outcome} beta=${rBinner?.outcome}`);
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
  cell(5, "the body the caller's own loop over `pending` invokes ran once, and the handle it was invoked from is a `CommitRecord.pending` member of the caller's own write — THE LOOP IS THE DELIVERY LAYER (b)'s ONLY INVOKER",
    `${C.ks21} item 2 (the loop, the member's populated state and its declared extent); kernel-surface.md §2.2 item 2`,
    loopB.length >= 1 && loopB.every((x) => x.ok === true && x.kind === 'plain')
      && cB.pending.includes(hB) && heard.length === 1,
    `OWED (the pending member's POPULATED state is a DECLARED DUTY OF THE KERNEL and NOT the store-side pass J-20–J-22's; owner role_kernel_writer per kernel-surface.md §2.1 item 2, whose positive revisit condition is this very step, E2E-C-8 step (2)): loop entries=${JSON.stringify(loopB.map((x) => ({ kind: x.kind, ok: x.ok })))} — the caller's own loop invoked NOTHING; triggered carries the listener=${cB.triggered.includes(hB)} but pending.length=${cB.pending.length}; the body ran ${heard.length}x in total`);
  nd(7, "the kernel's own window delivered its pass for the same write: the body's own attempt carries the one constraint-check entry the pair's pass appended",
    `${C.al24} item 5 (iii); ${C.ks21} item 2`,
    `the body was not handed control by the caller's own loop (cell 5 is the OWED reading named there): pending was empty (triggered.length=${cB.triggered.length}) and no invocation came from the loop, so the cell's two halves cannot be read beside one another as the docs read them`);
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
  register(floor, ['a'], 'x', (ctx) => (ctx.value <= 2 ? true : {
    repair: (rc) => { floorRepairRuns += 1; const w = floor.write(['b'], 'mem', 1, rc); floorRepairOp = w.op?.opId; return { ok: true, message: 'clamped', op: w.op }; },
    message: 'x is too large',
  }));
  // the attempt's OWN address holds no valid state at every landing: the compacted pair at ['a'] is
  // registered LAST, but the re-run over the repair's own op violates it — so the attempt fails (its
  // `checkpoint` is null address-wide) and the composition runs over the attempt's own call list.
  register(floor, ['a'], 'y', (ctx) => (ctx.value === 0 ? true : { message: 'y unrepaired' }));
  const cF = commit(floor, ['a'], 'mem', 9);
  const runF = tryCall(() => runAttempt(floor, cF));
  const fF = runF.err ?? {};
  const rF = report(floor, cF.attempt);
  const stF = rF.rollback ?? [];
  const declaredF = declaredCallList(rF.ops, stF[0]?.checkpoint ?? null);
  const outcomeF = outcomeOf(fF.log);

  cell(1, "the floor is met BY THE COMPOSITION'S OWN ACT on a still-owed op — the STORE'S own `journalLength` being the app's declared control over the journal's compression, repeated writes at ['a'] put a compacted entry inside the attempt's own call's reach — the store answers RollbackCompacted, the kernel reports KC-8, and NOTHING is restored",
    `${C.cs26} item 5 (b) and item 8 (iv) (the floor's precedence); ${C.fs2} (KC-8); ${C.ps217}`,
    fF.status === 'KC-8' && outcomeF?.state === 'KC-8' && stF.length > 0
      && stF[stF.length - 1].failed === true && stF[stF.length - 1].answer === 'RollbackCompacted',
    `status=${fF.status} repairRuns=${floorRepairRuns} repairOp=${floorRepairOp} commitOp=${cF.op.opId} steps=${JSON.stringify(stF)}`);
  cell(2, "the failing call's step carries the store's own code as its `answer`, its `undoneOps` is an EMPTY list (the floor is ALL-OR-NOTHING and never partial), its `restoredTo` is the state the addressed subtree stood at, and THE WALK STOPS AT IT — every step after the failing one is absent, so the `rollback` member's LAST element is that failing call's step",
    `${C.fs2}'s KC-8 row; ${C.ps217}; storeroom-native/write-and-read.md §6.4 items 2 (M-6) and 5`,
    stF.every(stepShape) && (() => {
      const last = stF[stF.length - 1];
      return last.failed === true && last.answer !== 'ok' && Array.isArray(last.undoneOps)
        && last.undoneOps.length === 0 && last.restoredTo !== undefined
        && stF.slice(0, -1).every((s) => s.failed === false && s.answer === 'ok');
    })(),
    `steps=${JSON.stringify(stF)}`);
  cell(3, 'the attempt has ONE `outcome` entry, it carries KC-8, and the floor appends NO second one',
    `${C.cs26} item 6 (a); ${C.fs2}'s KC-8 row; attempt-lifecycle.md §2.4 item 8 (ii)`,
    (fF.log ?? []).filter((e) => e.kind === 'outcome').length === 1
      && outcomeOf(fF.log)?.state === 'KC-8' && stF[stF.length - 1].failed === true,
    `log=[${kinds(fF.log)}] outcomeEntries=${(fF.log ?? []).filter((e) => e.kind === 'outcome').length} failingStep=${JSON.stringify(stF[stF.length - 1])}`);
  cell(4, 'the floor meets the STILL-OWED op\'s call and never the checkpoint op: the checkpoint member is null on every step of this attempt (no landing left the address valid), so no call of this walk stands over a stop op',
    `${C.cs26} item 8 (iv) and (iii); ${C.ps217}`,
    rF.rollback.every((s) => s.checkpoint === null) && declaredF.includes(stF[0].opId),
    `checkpoints=${JSON.stringify([...new Set(stF.map((s) => s.checkpoint))])} declaredList=${JSON.stringify(declaredF)} performed=${JSON.stringify(stF.map((s) => s.opId))}`);

  // ── (B) THE SAME SHAPE WHERE THE CALLS RETURN: what the composition performed, and nothing wider.
  const store2 = newStore();
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
  cell(6, "the union of the steps' undoneOps is the reach the composition actually had, and no wider: it names every op the attempt OWED — the ones it performed AND the ones an earlier call's own undoneOps already reported undone (item 5 (a)'s skip and its member-based test)",
    `${C.ps217} observable; ${C.cs26} item 5 (a)`,
    (() => {
      const union = new Set(st2.flatMap((s) => s.undoneOps ?? []));
      return declared2.every((id) => union.has(id) || st2.some((s) => s.opId === id))
        && st2.every((s) => (s.undoneOps ?? []).length > 0 || s.failed === true);
    })(),
    `union=${JSON.stringify([...new Set(st2.flatMap((s) => s.undoneOps ?? []))])} declaredList=${JSON.stringify(declared2)} ops=${JSON.stringify(rr2.ops.map((o) => o.opId))}`);
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
  // (α) the caller's own call
  const sA = newStore();
  register(sA, ['a'], 'x', (ctx) => (ctx.value <= 1 ? true : { message: 'too large' }));
  const cA = commit(sA, ['a'], 'mem', 9);
  const fA = tryCall(() => runAttempt(sA, cA)).err ?? {};   // alpha reaches its terminal act FIRST: a
                                                            // second K-2 at a LIVE address is refused KC-7

  // (β) the same attempt read through the delivery layer (b)
  const sB = newStore();
  const mapB = callerMap();
  // the delivery layer's target address must be seeded, and must not be the watch address: a fresh store
  // holds no keys, so a write at depth >= 2 is no address's first write (see E2E-C-15 cell 2).
  sB.write(['a'], 'mem', { b: {} });
  let fB = null, fBInner = null, inBody = false, runsB = 0;
  const body = () => {
    runsB += 1;
    if (inBody) return;
    inBody = true;
    try {
      const rec = tryCall(() => commit(sB, ['a', 'b'], 'mem', 9));
      if (!rec.ok) { fBInner = rec.err; return; }
      fB = tryCall(() => runAttempt(sB, rec.value)).err ?? null;
    } finally { inBody = false; }
  };
  register(sB, ['a'], 'x', (ctx) => (ctx.value <= 1 ? true : { message: 'too large' }));
  register(sB, ['a', 'b'], 'y', (ctx) => (ctx.value <= 1 ? true : { message: 'too large' }));
  // ⟶ RE-SPELLED 2026-10-25: `listen(handle, addresses)`, the caller's own spelling, the answer being that spelling.
  const hB = sB.listen('blind-c10-at-a', [['a']]);
  sB.register(hB, body);
  mapB.add(hB, 'plain', body);
  const cB = tryCall(() => commit(sB, ['a'], 'mem', 9));
  if (!cB.ok) throw cB.err;
  const cBv = cB.value;
  const loopB = mapB.run(cBv.pending, ['a']);
  // the beta window's own report cannot even be read: a still-open attempt's report is refused KC-7
  // (fail-surface.md §2's KC-7 row, its K-5 site), so the two windows' records have no common reader here.
  const rBProbe = tryCall(() => report(sB, cBv.attempt));
  const rBReport = rBProbe.ok ? rBProbe.value
    : { attempt: cBv.attempt, log: [], ops: [], outcome: 'failed', rollback: [] };

  cell(1, 'both windows fail on the same arm: the same status token, read off the form each caller caught',
    `${C.fs11} item 1 (c)`,
    !!fA && !!fB && fA.status === fB.status,
    `alpha=${fA.status} beta=${fB?.status} (the beta window's own report is refused ${rBProbe.ok ? '- read' : rBProbe.err?.status}: see cell 7) — the two windows diverge because the beta window's own delivery layer never ran the constraint pass: pending.length=${cBv.pending.length} against triggered.length=${cBv.triggered.length}`);
  nd(2, 'outcome equal, ops of equal LENGTH with equal kind sequences',
    `e2e-scenarios-b.md E2E-C-10; ${C.ks21} item 3`,
    `the beta window has no record to compare against: its own report was refused ${rBProbe.ok ? '- read' : rBProbe.err?.status} because the attempt never reached a terminal act of its own (cell 7), so this member pair cannot be read beside alpha's`);
  nd(3, 'log of equal length with equal kind/id/state sequences',
    `e2e-scenarios-b.md E2E-C-10; ${C.ks25} item 1`,
    `the beta window has no log to compare: its own report was refused ${rBProbe.ok ? '- read' : rBProbe.err?.status} (cell 7). alpha's own log reads [${kinds(fA.log)}]`);
  nd(4, 'rollback of equal length, each step six members with equal answer/failed and the same undoneOps membership',
    `${C.ps217}; e2e-scenarios-b.md E2E-C-10`,
    `the beta window has no composition to compare (cell 7): its own report was refused ${rBProbe.ok ? '- read' : rBProbe.err?.status}`);
  nd(5, 'the instrument each window read is NAMED: both are the kernel\'s own five-member record read through K-5, not a store structure',
    `${C.ks21} item 5; ${C.fs12} item 4`,
    `the beta window's record was never returned: K-5 over that still-open attempt threw ${rBProbe.ok ? 'nothing' : rBProbe.err?.status}, so no five-member record of the beta window exists to name (cell 7)`);
  nd(6, "message strings may differ where the kernel's own text names the trigger's arguments — and both are non-empty kernel sentences",
    `e2e-scenarios.md E2E-C-8 cell 5; ${C.fs11} item 2 (i)`,
    `the beta window produced no thrown form of its own: its attempt never reached a terminal act (cell 7). alpha's own sentence reads ${JSON.stringify(fA.message)}, non-empty and the kernel's own`);
  nd(7, "the beta window's store delivery came through the caller's own loop, and the two windows' answers are one token",
    `${C.ks21} item 2 (the loop is layer (b)'s only invoker)`,
    `the caller's own loop over pending invoked ${loopB.length} handle(s) at this build (pending.length=${cBv.pending.length}, triggered.length=${cBv.triggered.length}), so the beta window's delivery is not reachable from the documented seam; and the beta attempt never reached a terminal act of its own, so its own report is refused ${rBProbe.ok ? '- read' : rBProbe.err?.status} and the two windows' answers cannot be compared as the docs compare them. Observed: alpha=${fA.status} (through the constraint pass), beta=${fB?.status} (through the un-reached delivery); the two are not one token at this build`);
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
  cell(7, "K-4 over each closed attempt returns that attempt's own log — two distinct lists, each equal to its own report's",
    `${C.ks21} item 4`,
    JSON.stringify(log(store, c1.attempt)) === JSON.stringify(r1.log)
      && JSON.stringify(log(store, c2.attempt)) === JSON.stringify(r2.log)
      && JSON.stringify(log(store, c1.attempt)) !== JSON.stringify(log(store, c2.attempt)),
    'both closed logs read back by K-4');
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// E2E-C-12 — refusals at K-1: the kernel's own channel, and a registry that does not move
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
group('E2E-C-12', 'refusals at K-1: the kernel\'s own channel, and a registry that does not move');
scenario(() => {
  const store = newStore();
  const r1 = tryCall(() => register(store, 'not-an-address', 'x', () => true));
  const r2 = tryCall(() => register(store, ['a'], '', () => true));
  const r3 = tryCall(() => register(store, ['a'], 'x', 'not-a-function'));
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

  cell(3, "the repair's own write at an address whose ancestor is a leaf is refused by the store with the store's own code",
    `${C.fs3} item 2 (the write path's own codes); ${C.ps27}`,
    !bodyThrow.ok && bodyThrow.err?.status === 'WriteParentNotLink' && keysOf(bodyThrow.err) === 'message,status',
    `repair write status=${status(bodyThrow)} keys=${keysOf(bodyThrow.err)} message=${JSON.stringify(bodyThrow.err?.message)}`);
  const thrown = run1.ok ? undefined : run1.err;
  const heldByCaller = run1.ok ? null : run1.err;
  cell(4, "the repair body THREW, so the caller holds the BODY'S OWN THROWABLE unchanged — the SAME object the body threw (identity), with no `log` member added and the store's code still the only `status` on it",
    `${C.ps216} (a throwing repair body); ${C.al24} item 8 (i); ${C.fs12} item 1 (no conversion)`,
    caught !== null && keysOf(caught) === 'message,status' && caught.status === 'WriteParentNotLink'
      && f === caught && !('log' in caught) && caught === run1.err,
    `the object the body threw is the object K-3 threw back: identity=${f === caught} status=${caught?.status} keys=${keysOf(caught)} (no log member); the store's own refusal at the caller's own verb call reached the caller as ${status(bodyThrow)}`);
  cell(5, "the attempt is closed as failed and its own outcome entry carries KC-4's token — the kernel's own state for a repair that threw, on the kernel's own channel",
    `${C.fs11} item 3; ${C.cs27} item 13; ${C.fs2}'s KC-4 row (the carrier named: where the repair body throws before it returns, the carrier IS the attempt's own message log — its ONE outcome entry, read off the log the caller holds after the throw)`,
    outcomeOf(rr.log)?.state === 'KC-4' && rr.outcome === 'failed'
      && rr.log.filter((e) => e.kind === 'outcome').length === 1,
    `report outcome=${rr.outcome} report log=[${kinds(rr.log)}]`);
  cell(6, "the store's code is NAMED inside the repair-run entry's message as the store's own answer, and the entry's state stays null",
    `${C.ks25} item 1 (the message table); ${C.fs12} item 3 (the asymmetry's own carrier clause: the store's code is NAMED INSIDE the repair-run entry's message)`,
    (() => { const e = (rr.log ?? []).find((x) => x.kind === 'repair-run'); return !!e && e.state === null && typeof e.message === 'string' && e.message.includes('WriteParentNotLink'); })(),
    `repair-run=${JSON.stringify((rr.log ?? []).find((e) => e.kind === 'repair-run'))} — the store's own code the repair's verb call threw (${caught?.status}) IS named inside this entry's message (the message table's own carrier clause, kernel-surface.md §2.5 item 1) and the entry's state stays null`);
  cell(7, 'the two channels are not converted into one another: the store code reached the repair body UNCHANGED at the verb call, no store code is ever a kernel state, and the kernel answers the caller on its own channel',
    `${C.fs12} item 1 (no conversion), items 2 and 4`,
    caught === thrown && heldByCaller === caught && KC.has(outcomeOf(rr.log)?.state) && repairCalls === 1
      && (rr.log ?? []).every((e) => !String(e.state ?? '').includes('WriteParentNotLink')),
    `store code at K-2=${status(tierRefusal)}; store code at the repair's own call=${caught?.status} (the body held the store's own object unchanged=${thrown === caught}); kernel state=${outcomeOf(rr.log)?.state}; repair calls=${repairCalls}`);
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

  cell(1, 'K-5 over a CLOSED attempt returns the final report, and K-4 its final log',
    `${C.ks21} items 4–5`, rr.outcome === 'passed' && ll.length === 2, `report=${rr.outcome} log=${ll.length}`);
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
  cell(4, "the inner walk stops AT its checkpoint: every step carries the OP whose landing left that address last valid — an op ANOTHER attempt landed (A104) — A NON-NULL `checkpoint` READING IS `OWED` AND IS NEVER A DRIVE'S DEMAND: the `null` arm reaches a caller-side surface either way, and NO DRIVE MAY READ A NON-NULL `checkpoint` AS A FAILURE OF THE KERNEL",
    `${C.cs26} item 8 (iii) (A104); ${C.ps217} (the non-null arm is OBSERVABLE ONLY WHILE THE PER-LANDING PASS IS OWED); contract.md §0.1 item 5 (i); e2e-scenarios-b.md E2E-C-15 step (5)`,
    (() => {
      // this cell is RED as an OWED reading: the per-landing pass that could record such a landing is the
      // store-side pass J-20–J-22 declare, so the non-null value cannot be established caller-side
      const cps = (innerR?.rollback ?? []).map((s) => s.checkpoint);
      return cps.length > 0 && cps.every((v) => v !== null);
    })(),
    `OWED (the store-side pass J-20–J-22 declare; owner the architect, positive revisit condition an ACTIVE decisions row fixing the store-side evaluation seam): the inner attempt's own address ['a','b'] was left valid by the outer body's landing ${outerBodyWrite} — the pair at that address PASSES on ${outerBodyWrite}'s value — yet every step of the inner composition carries checkpoint=null (${JSON.stringify([...new Set((innerR?.rollback ?? []).map((s) => s.checkpoint))])}), the address-wide null arm. Root cause: the kernel runs NO constraint pass when a write lands (see E2E-C-2 cell 9, the OWED reading named there), so no landing is ever recorded as one that left the address valid`);
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
  cell(8, "the checkpoint's own home: the member is the opId of the LAST LANDING THAT LEFT EVERY REGISTERED PAIR AT THE ATTEMPT'S ADDRESS PASSING — an op of ANOTHER attempt included — and a landing that failed its own pass leaves the member UNMOVED; A NON-NULL READING IS `OWED` (the per-landing pass), and the `null` arm it reaches instead IS the arm a caller-side drive reaches either way",
    `${C.cs26} item 8 (i) and (iii); ${C.ps217} (both arms of the member, and which one a caller-side drive can reach)`,
    (() => {
      const inner = (innerR?.rollback ?? []).map((s) => s.checkpoint);
      const outer = (outerR.rollback ?? []).map((s) => s.checkpoint);
      return inner.length > 0 && inner.every((v) => v !== null)
        && outer.length > 0 && outer.every((v) => v !== null);
    })(),
    `OWED (the same store-side pass J-20–J-22 as cell 4; owner the architect, positive revisit condition an ACTIVE decisions row fixing the store-side evaluation seam): checkpoint read off the inner composition = ${JSON.stringify([...new Set((innerR?.rollback ?? []).map((s) => s.checkpoint))])} while the outer body's own write landed ${outerBodyWrite}, and off the outer = ${JSON.stringify([...new Set((outerR.rollback ?? []).map((s) => s.checkpoint))])} while its own write landed ${cOuter.op.opId} and its declared call list is ${JSON.stringify(declaredOuter)}: the docs' member cannot be observed at this build, because the kernel runs NO constraint pass when a write lands (see E2E-C-2 cell 9), so no landing of any attempt is ever recorded as having left the address valid`);
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
  let secondRec = null, secondErr = null, inBody = false;
  // the listener's body is FUNCTION DATA: it hears the address it was handed, then — as the docs' drive has it,
  // step (1) — opens the SECOND top-level processing at the other address.
  const body = (addr) => {
    heard.push({ addr });
    if (inBody) return;
    inBody = true;
    try {
      const r = tryCall(() => commit(store, ['a', 'c'], 'mem', 9));
      if (r.ok) secondRec = r.value; else secondErr = r.err;
    } finally { inBody = false; }
  };
  const cB = register(store, ['a', 'c'], 'cB', (ctx) => (ctx.value >= 5 ? { message: 'c is bad' } : true));
  const cA = register(store, ['a', 'b'], 'cA', (ctx) => (ctx.value >= 5 ? { message: 'a is bad' } : true));
  const hWatch = store.listen('blind-c16-watch', [['a']]);
  store.register(hWatch, body);
  map.add(hWatch, 'plain', body);

  const c = commit(store, ['a', 'b'], 'mem', 9);
  const cPending = [...(c.pending ?? [])];
  const runsDuringDelivery = heard.length;
  // THE CALLER'S OWN LOOP: the only invoker layer (b) has — it resolves each handle in the CALLER'S OWN MAP
  // and hands the resolved function THE TRIGGERING ADDRESS, which the member's own clause fixes as THE
  // WRITE'S OWN ADDRESS, i.e. the address this call's own op landed at.
  const triggerAddr = c.op.address;
  const loop = map.run(cPending, triggerAddr);
  const runsAfterLoop = heard.length;
  const thrown = tryCall(() => runAttempt(store, c));
  const rr = report(store, c.attempt);

  cell(1, "the caller's own write's record carries `pending` as the subset of `triggered` the kernel has NOT already invoked — and THE ONE REACHABLE ACT that leaves a handle in it is THE CALLER'S OWN `store.write` MADE UNDER A REGISTRATION, so the handle the write returns for a body its own pass did not run STANDS in this member at K-2's return",
    `${C.ks21} item 2 (the member's populated state, the one reachable act, and the loop as layer (b)'s only invoker)`,
    Array.isArray(c.pending) && c.pending.includes(hWatch) && c.pending.length < c.triggered.length,
    `pending.length=${c.pending.length} triggered.length=${c.triggered.length} watched handle in pending=${c.pending.includes(hWatch)}; the body ran ${runsDuringDelivery}x during the store's own delivery and ${runsAfterLoop - runsDuringDelivery}x more when the caller's loop ran`);
  cell(2, 'the two members differ in EXTENT and not in order: `triggered` carries every handle the write returned, `pending` the subset the kernel has not already invoked (the caller\'s own loop\'s work)',
    `${C.ks21} item 2 (the two members' declared states)`,
    Array.isArray(c.pending) && Array.isArray(c.triggered)
      && c.triggered.length >= 2 && c.pending.length >= 1 && c.pending.length < c.triggered.length
      && c.triggered.includes(hWatch),
    `triggered=${c.triggered.length} pending=${c.pending.length}`);
  cell(3, "the listener body ran from the CALLER'S OWN LOOP and was handed THE TRIGGERING ADDRESS — the operation's own address, never the watch address (`Listener = (address: Address) => void`)",
    `${C.ks21} item 2 (the two kinds' call shapes and the referent of the triggering address); storeroom-native/write-and-read.md §6.5 item 3`,
    (() => {
      // this cell is RED: the loop must be the body's ONLY invoker, and the drive reads one invocation at the
      // triggering address plus the store's own delivery's earlier ones
      const fromLoop = heard.slice(runsDuringDelivery);
      return runsDuringDelivery === 0 && fromLoop.length === 1 && loop.length === 1
        && JSON.stringify(fromLoop[0].addr) === JSON.stringify(triggerAddr)
        && JSON.stringify(fromLoop[0].addr) !== JSON.stringify(['a']);
    })(),
    `loop entries=${loop.length}; the loop's own invocation was handed ${JSON.stringify((heard.slice(runsDuringDelivery)[0] ?? {}).addr)} against the watch address ['a'] and the operation's own address ${JSON.stringify(triggerAddr)}; the store's own delivery had already reached the body ${runsDuringDelivery}x inside K-2`);
  nd(4, 'the listener body opened the SECOND top-level attempt at the other address — a nested processing takes its OWN registry entry, so the record crosses back — and its own `CommitRecord` is a record of its own attempt',
    `${C.al24} item 8 (ii); contract.md §5.7 (the registry's keying rule, A106 Q4)`,
    `no second top-level attempt is opened: the body's own K-2 at ['a','c'] threw ${secondErr?.status} at this build, so no record of a second processing crosses back. The handle the caller's own loop invoked WAS handed the triggering address (cell 3), so the body's own act is reachable — the refusal is the finding, and it is the KC-7 arm the docs read at a SECOND K-2 at a HELD address (kernel-surface.md §2.1 item 2) whose hold is RELEASED only by the attempt's own terminal arm`);
  cell(5, "the K-1 pair's own pass ran — the first attempt's own log carries its `constraint-check` entry and its one `outcome` entry reads KC-3",
    `${C.ks21} item 2 (the loop's call shape, both kinds); ${C.ks25} item 1; ${C.ps216}`,
    rr.log.some((e) => e.kind === 'constraint-check' && e.id === 'cA')
      && outcomeOf(rr.log)?.state === 'KC-3' && loop.every((x) => x.kind !== 'constraint'),
    `first attempt final=${outcomeOf(rr.log)?.state} log=[${kinds(rr.log)}]; loop entries of kind constraint=${loop.filter((x) => x.kind === 'constraint').length}`);
  nd(6, "the SECOND top-level processing is driven to ITS OWN terminal arm, fails on its OWN address's pair, and its own `outcome` entry carries the token — no ninth member minted",
    `${C.al24} item 4; ${C.fs11} item 1 (c); ${C.fs2} (the KC-3 row)`,
    `the second top-level processing does not exist at this drive: the body's own K-2 at ['a','c'] was refused ${secondErr?.status} (cell 4), so no second processing's log exists to read. The FIRST processing's own log, whose pair entry and one outcome token ARE readable, is [${kinds(rr.log)}] with outcome ${outcomeOf(rr.log)?.state}`);
  nd(7, "the FIRST TERMINAL ACTOR: the SECOND top-level processing's own K-2 return precedes the first processing's own K-3 return, so the failing processing this window reads is the SECOND one — the winner named by the earlier RETURN and never by depth",
    `${C.al24} item 8 (ii) head and items 1-5; contract.md §5.7 (A106 Q1/Q3)`,
    `the second top-level processing does not exist at this drive (cell 4): its own K-2 was refused, so the order of the two processes' returns — the whole subject of this cell — cannot be read beside the first processing's own K-3 return`);
  cell(8, "the docs' own step (1): the store's delivery puts the CALLER's write's handle in `pending` for the caller's own loop to invoke — the app's own loop being its ONE invoker",
    `e2e-scenarios-b.md E2E-C-16 steps (1) and (2); ${C.ks21} item 2`,
    c.pending.includes(hWatch) && loop.some((x) => x.kind === 'plain' && x.ok === true),
    `at K-2's return pending held ${c.pending.length} of ${c.triggered.length} triggered handle(s) (listener in pending=${c.pending.includes(hWatch)}); the caller's own loop invoked it ${loop.length}x — the populating member is the OWED duty E2E-C-16 step (1) names, and the loop's own call is this cell's reading`);
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
      return h !== null && runAttempt(s, c).outcome === 'passed' && log(s, c.attempt).length === 2;
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
