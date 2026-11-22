// GATE 6, SECOND RUN (role_live_scenario_runner) — U-STOREROOM-CONSTRAINTS — the independent live run of
// `docs/specs/storeroom-constraints/live-greens.md` against the LIVE caller-side surface, WITH EVERY
// EXPECTATION RE-DERIVED TO THE LAW THAT MOVED AFTER THE FIRST RUN: the ACTIVE `docs/decisions.md` row
// `A111` (the failed commit's pre-state claim WITHDRAWN BY NAME — `composition-and-states.md §2.6` item 8
// (iii), `contract.md §5.7` `P-TP-7`); the composition's CALL LIST and its SKIP (`§2.6` items 2 and 5 (a) —
// one call per still-owed op, an op an earlier call's own `undoneOps` reports undone gets NO call, the step
// count is the calls ISSUED, and a call meeting the store's floor stops the walk with the ONE `outcome` entry
// carrying `KC-8`); the `K-2` hold's own edges (`kernel-surface.md §2.1` item 2 — opened by the write verb's
// attempt, released ONLY by that attempt's terminal arm, so a later `K-2` at a closed attempt's address
// RETURNS A FRESH RECORD); the `KC-4` row's naming duty (`fail-surface.md §2` — the store's own code is named
// in the `repair-run` entry's `message`); the delivery layer's `pending` (`§2.1` item 2 with `§2.2` item 2's
// predicate — the handles a CALLER-made write returned are layer (b)'s and the caller's own loop is its ONLY
// invoker, so a KERNEL-made write's pass-evaluated handle does NOT stand there); and the per-landing pass
// (`J-20`–`J-22`, `contract.md §0.1` item 5 (i) — `OWED`, so no caller-side drive pins a checkpoint).
//
// AN ANNOTATION IS AN OBSERVATION BESIDE A DECLARED CELL (see the recorder below): it mints no cell, stands
// OUTSIDE the greens set's cell census, and is printed with the marker `ANNOTATION` instead of a verdict.
// Three annotations stand at this pass, each a reading a declared row cannot carry: the `KC-8` floor arm
// driven in the one window shape the settled composition leaves open (`E2E-C-9.7b`), the store's own
// re-entrant delivery of a registered body (`E2E-C-8.5b`), and the fresh `K-2` at a residue-carrying address
// (`E2E-C-6.3b`).
//
// THE LIVE SURFACE THIS RUN EXERCISES, STATED ONCE:
//   (LS-1) the SHIPPED PACKAGE `provident-storeroom` (bindings/js, the napi binding): its module
//          namespace's 8 verbs (`storeCreate` among them) and the instance's declared members
//          (`register` / `on` / `off`);
//   (LS-2) the KERNEL MODULE at its declared checkout home `bindings/js/src/constraint-kernel.mjs`,
//          reached through its declared caller-side ESM entry: `register, commit, runAttempt, log, report`.
// There is NO UI, NO renderer, NO MCP server and NO assembled application for this unit. Every
// expectation below is read from `docs/specs/storeroom-constraints/**`; no assertion here was copied from
// `bindings/js/greens/blind-constraints-v2.mjs` and none was derived from the kernel's own source.
//
// RUN: node scratch/lib/live-constraints-gate6-v2.mjs   (from the repository root)

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const pkgNS = await import(path.resolve(HERE, '../../bindings/js/index.mjs'));
const kern = await import(path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs'));
const { storeCreate, write: sWrite, read: sRead, rollback: sRollback, listen: sListen } = pkgNS;
const { register: K1, commit: K2, runAttempt: K3, log: K4, report: K5 } = kern;

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'scnt-g6-'));
let SEQ = 0;
const mkStore = (tag) => storeCreate({ filePath: path.join(TMP, `${tag || 's'}-${++SEQ}.json`), journalLength: 64, listeners: [] });

// ------------------------------------------------------------------------------------------------
// the recorder
// ------------------------------------------------------------------------------------------------
const ROWS = [];
let ROW = null;
const V = { PASS: 0, FAIL: 0, 'NOT-EXERCISABLE': 0 };
const J = (x) => JSON.stringify(x);
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const cids = (log) => log.map((e) => `${e.kind}/${e.id}/${e.state}`).join(' ');

function row(id, start, final) { ROW = { id, start, final, cells: [] }; ROWS.push(ROW); return ROW; }
function cell(cid, expected, cites, observed, verdict) {
  const isAnn = ANNOTATED.has(cid) || verdict === 'ANNOTATION';
  ROW.cells.push({ cid, expected, cites, observed, verdict, annotation: isAnn });
  if (!isAnn) V[verdict] += 1;
}
const P = (cid, e, c, o) => cell(cid, e, c, o, 'PASS');
// an ANNOTATION is an observation beside a declared cell: it carries a reading, mints no claim, and stands
// OUTSIDE the greens set's cell census (only `E2E-C-3` carries one at this pass).
const ANNOTATED = new Set();
const annotate = (cid, e, c, o) => ANNOTATED.add(cid);
const F = (cid, e, c, o) => cell(cid, e, c, o, 'FAIL');
const N = (cid, e, c, o) => cell(cid, e, c, o, 'NOT-EXERCISABLE');
const assertCell = (cid, expected, cites, body) => {
  try { const [ok, obs] = body(); (ok ? P : F)(cid, expected, cites, obs); }
  catch (e) { F(cid, expected, cites, `the cell's own body THREW: ${e && (e.status || e.message || String(e))}`); }
};
const rowBody = (id, fn) => { try { fn(); } catch (e) { const tr = (e && e.stack ? String(e.stack).split('\n').slice(0, 4).join(' || ') : 'no-stack'); const own = e && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(e).filter((k) => !['stack','message'].includes(k)).map((k) => `${k}=${String(e[k]).slice(0, 40)}`).join(',') : ''; F(`${id}.ROW`, 'the row drives to a settled end state', 'the row\'s own start point', `the row body threw ${e && (e.status || e.message || String(e))} [keys: ${own}] [at: ${tr}]`); } };

const X = {}; // per-row scratch, so nothing leaks between rows

// ================================================================================================
// E2E-C-1 — the happy path: one constraint passes and the attempt resolves
// ================================================================================================
row('E2E-C-1', "a caller registers one pair at ['a'] and commits an admitted value there", 'K-3 returns the passed arm; K-4/K-5 read the closed attempt back');
rowBody('E2E-C-1', () => {
  const s = mkStore('c1'); X.s = s;
  X.seen = [];
  X.h = K1(s, ['a'], 'x', (ctx) => { X.seen.push(ctx); return true; });
  X.rec = K2(s, ['a'], 'mem', 1);
  X.rep = K3(s, X.rec);
  assertCell('E2E-C-1.1', 'K-1 returns the store-machinery handle (a non-null opaque value)', 'kernel-surface.md §2.1 item 1',
    () => [X.h !== null && X.h !== undefined, `handle typeof=${typeof X.h}`]);
  assertCell('E2E-C-1.2', 'CommitRecord has exactly {attempt, op, triggered, pending}; attempt is {id: non-empty string}; op is the write\'s op', 'kernel-surface.md §2.1 item 2',
    () => {
      const keys = Object.keys(X.rec).slice().sort().join(',');
      return [keys === 'attempt,op,pending,triggered' && typeof X.rec.attempt.id === 'string' && X.rec.attempt.id.length > 0 && typeof X.rec.op.opId === 'string',
        `keys=${keys} attempt=${J(X.rec.attempt)} opId=${X.rec.op.opId} write-opId=${X.rec.op.opId}`];
    });
  assertCell('E2E-C-1.3', "'passed' (the success arm's ONE value) and the SAME attempt reference K-2 minted", 'kernel-surface.md §2.1 item 3; attempt-lifecycle.md §2.4 item 4 arm (a)',
    () => [X.rep.outcome === 'passed' && X.rep.attempt === X.rec.attempt, `outcome=${X.rep.outcome} keys=${Object.keys(X.rep).join(',')} attempt-match=${X.rep.attempt === X.rec.attempt}`]);
  assertCell('E2E-C-1.4', "ops has one member, in creation order, and it is the store's own op", 'kernel-surface.md §2.1 item 3; attempt-lifecycle.md §2.4 item 1',
    () => [X.rep.ops.length === 1 && X.rep.ops[0].opId === X.rec.op.opId, `ops.length=${X.rep.ops.length} ops[0].opId=${X.rep.ops[0] && X.rep.ops[0].opId} write=${X.rec.op.opId}`]);
  assertCell('E2E-C-1.5', "rollback is [] (an empty list, never an absent member) and triggered is the write's own returned set", 'kernel-surface.md §2.1 items 2-3; composition-and-states.md §2.6 item 8 (i)',
    () => [Array.isArray(X.rep.rollback) && X.rep.rollback.length === 0 && Array.isArray(X.rec.triggered), `rollback=${J(X.rep.rollback)} triggered=${X.rec.triggered.length} pending=${X.rec.pending.length}`]);
  assertCell('E2E-C-1.6', "the log is one constraint-check (id 'x', opId the write's op, state null) then one commit entry (id null, opId the last op); seq 1,2; six-member entries", 'kernel-surface.md §2.5 items 1-3',
    () => {
      const six = X.rep.log.every((e) => eq(Object.keys(e).slice().sort(), ['id', 'kind', 'message', 'opId', 'seq', 'state']));
      const ok = X.rep.log.length === 2 && X.rep.log[0].kind === 'constraint-check' && X.rep.log[0].id === 'x' && X.rep.log[0].opId === X.rec.op.opId && X.rep.log[0].state === null
        && X.rep.log[1].kind === 'commit' && X.rep.log[1].id === null && X.rep.log[1].opId === X.rec.op.opId && X.rep.log[1].seq === 2 && six;
      return [ok, `shape=${six ? 'ok' : 'BAD-SIX-MEMBERS'} kinds=[${cids(X.rep.log)}] seqs=${J(X.rep.log.map((e) => e.seq))}`];
    });
  assertCell('E2E-C-1.7', 'the attempt context carries exactly {address, tier, value, attempt, op}, all verbatim', 'parameter-semantics.md §2.16; kernel-surface.md §2.3 item 1',
    () => {
      const ctx = X.seen[0];
      const ok = ctx && eq(Object.keys(ctx).slice().sort(), ['address', 'attempt', 'op', 'tier', 'value']) && eq(ctx.address, ['a']) && ctx.tier === 'mem' && ctx.value === 1
        && ctx.attempt === X.rec.attempt && ctx.op && ctx.op.opId === X.rec.op.opId;
      return [ok, `ctx.keys=${ctx ? Object.keys(ctx).sort().join(',') : ''} ctx.op.opId=${ctx && ctx.op && ctx.op.opId} attempt-match=${ctx && ctx.attempt === X.rec.attempt} full=${J(ctx)}`];
    });
  assertCell('E2E-C-1.8', "K-4 returns the closed attempt's final log and K-5 its final report — the SAME list and the same five-member report", 'kernel-surface.md §2.1 items 4-5; parameter-semantics.md §2.5 observable',
    () => {
      const l4 = K4(s, X.rec.attempt), r5 = K5(s, X.rec.attempt);
      return [eq(l4, X.rep.log) && eq(r5, X.rep) && eq(Object.keys(r5).slice().sort(), ['attempt', 'log', 'ops', 'outcome', 'rollback']),
        `log-equal=${eq(l4, X.rep.log)} report-equal=${eq(r5, X.rep)} report-keys=${Object.keys(r5).sort().join(',')}`];
    });
});

// ================================================================================================
// E2E-C-2 — a two-op failing attempt: KC-6, and the per-op composition
// ================================================================================================
row('E2E-C-2', "a caller commits a value that violates a pair whose repair runs and whose re-run then violates a pair carrying no repair", "K-3 throws KC-6; the composition performs its per-op calls");
rowBody('E2E-C-2', () => {
  const s = mkStore('c2'); X.s = s;
  // THE BATTERY'S OWN PRE-STATE: the value that stood at ['a'] BEFORE commit was called, written through
  // the store's own verb. Its own op is KEPT, because under the settled law (`A111`) the end state is read
  // off the steps' own `undoneOps` members: whether THAT op stands in the performed union is exactly what
  // decides whether the address's standing state is the store's own absence or the pre-value.
  X.preOp = sWrite(s, ['a'], 'mem', 2);
  X.preOpId = X.preOp.op.opId;
  X.preValue = sRead(s, ['a']);
  X.runs = { x: 0, y: 0, z: 0 };
  X.repairOp = null;
  K1(s, ['a'], 'x', (ctx) => { X.runs.x += 1; return ctx.value > 4 ? { message: 'a must be small' } : true; });
  K1(s, ['a'], 'y', (ctx) => {
    X.runs.y += 1;
    if (ctx.value <= 1) return true;
    return { message: 'y is written by r2', repair: () => { const w = sWrite(s, ['a'], 'mem', 5); X.repairOp = w.op.opId; return { ok: true, op: w.op }; } };
  });
  K1(s, ['a'], 'z', () => { X.runs.z += 1; return true; });
  X.rec = K2(s, ['a'], 'mem', 2);
  X.atK2 = { ...X.runs };
  X.thrown = null; X.returned = null;
  try { X.returned = K3(s, X.rec); } catch (e) { X.thrown = e; }
  X.rep = K5(s, X.rec.attempt);
  X.t = X.thrown;
  assertCell('E2E-C-2.1', 'K-2 returns a record whose op is the write it landed, and THE PASS WAS NOT EVALUATED BY THE COMMIT — the three registered pairs have run 0 times when K-2 has returned', "e2e-scenarios.md E2E-C-2 step (2) read with step (3); kernel-surface.md §2.1 item 2",
    () => [X.atK2.x === 0 && X.atK2.y === 0 && X.atK2.z === 0 && !!X.rec.op.opId,
      `record op=${X.rec.op.opId} keys=${Object.keys(X.rec).join(',')}; evaluations when K-2 returned: x=${X.atK2.x} y=${X.atK2.y} z=${X.atK2.z}`]);
  assertCell('E2E-C-2.2', "the pass over op1 evaluates ['a']'s pairs in first-registration order and STOPS AT THE FIRST VIOLATION: x, then y (whose repair runs and lands its own op), and the re-run then halts at x — so z is never reached", 'attempt-lifecycle.md §2.4 items 5 (ii),(iv); kernel-surface.md §2.5 item 1',
    () => [X.runs.x === 2 && X.runs.y === 1 && X.runs.z === 0, `evaluations: x=${X.runs.x} y=${X.runs.y} z=${X.runs.z} (z never reached); repair's op=${X.repairOp} write op=${X.rec.op.opId}`]);
  assertCell('E2E-C-2.3', 'the attempt fails by THROWING {status, message, log} and never by returning', 'fail-surface.md §1.1 items 1 and 4',
    () => [X.t !== null && eq(Object.keys(X.t).slice().sort(), ['log', 'message', 'status']), `threw=${X.t !== null} keys=${X.t ? Object.keys(X.t).join(',') : '(K-3 returned outcome=' + (X.returned && X.returned.outcome) + ')'}`]);
  assertCell('E2E-C-2.4', "status is the kernel's own KC-6 (the repeat violation by a pair already in appliedRepairs)", 'fail-surface.md §1.1 item 1; fail-surface.md §2; attempt-lifecycle.md §2.4 item 4 arm (e)',
    () => [X.t && X.t.status === 'KC-6', `status=${X.t && X.t.status}`]);
  assertCell('E2E-C-2.5', "the thrown form carries the message log, and its outcome entry's state is the SAME token", 'fail-surface.md §1.1 item 1 (c); kernel-surface.md §2.5 item 1',
    () => {
      const o = X.t.log.filter((e) => e.kind === 'outcome').pop();
      return [X.t.log.length > 0 && o && o.state === X.t.status, `log.len=${X.t.log.length} outcome.state=${o && o.state}`];
    });
  assertCell('E2E-C-2.6', "the pair (['a'],'x') carries TWO constraint-check entries against TWO opIds and never three, the repair ran ONCE, and the outcome entry closes the log; the whole log is 2 + 1 + 1 + 1 = 5 entries, pair (['a'],'z') never being reached", 'attempt-lifecycle.md §2.4 items 5 (ii),(iv); kernel-surface.md §2.5 item 3 limb (ii); e2e-scenarios.md E2E-C-2 cell 5',
    () => {
      const xc = X.t.log.filter((e) => e.kind === 'constraint-check' && e.id === 'x');
      const rr = X.t.log.filter((e) => e.kind === 'repair-run');
      const ok = X.t.log.length === 5 && xc.length === 2 && new Set(xc.map((e) => e.opId)).size === 2 && rr.length === 1 && !X.t.log.some((e) => e.id === 'z') && X.t.log[4].kind === 'outcome';
      return [ok, `kinds=[${cids(X.t.log)}] length=${X.t.log.length} x-check-entries=${xc.length} x-opIds=${J([...new Set(xc.map((e) => e.opId))])}`];
    });
  assertCell('E2E-C-2.7', "the composition's CALL LIST is this attempt's still-owed ops in item 2's own order (the repaired op first, the first write last) and the SKIP governs the calls ISSUED: a call over a still-owed op is issued ONLY IF no earlier call's own `undoneOps` already reports that op undone — so the step count is the calls ISSUED and MAY RUN BELOW the list's size, and each issued call leaves exactly one six-member RollbackStep", 'composition-and-states.md §2.6 items 2, 3 and 5 (a) (the CALL LIST and the SKIP, settled after the first run); contract.md §5.7 (P-TP-7); parameter-semantics.md §2.17',
    () => {
      const steps = X.rep.rollback, t = X.t;
      const six = steps.every((x) => eq(Object.keys(x).slice().sort(), ['answer', 'checkpoint', 'failed', 'opId', 'restoredTo', 'undoneOps']));
      const first = steps[0] || {};
      const uncalled = X.rep.ops.filter((o) => !steps.some((x) => x.opId === o.opId));
      const listOk = steps.length >= 1 && six && steps.every((x) => X.rep.ops.some((o) => o.opId === x.opId)) && first.opId === X.repairOp;
      const skipOk = uncalled.every((o) => steps.some((x) => x.undoneOps.includes(o.opId))) && uncalled.length === X.rep.ops.length - steps.length;
      const noDouble = new Set(steps.map((x) => x.opId)).size === steps.length;
      return [listOk && skipOk && noDouble,
        `calls ISSUED=${steps.length} over a call list of ${X.rep.ops.length} still-owed op(s); six-members=${six}; steps=${J(steps.map((x) => ({ opId: x.opId, ans: x.answer, failed: x.failed, undone: x.undoneOps, cp: x.checkpoint })))}; the first call — always issued — is over the repair's own op=${first.opId === X.repairOp} (write op=${X.rec.op.opId}); still-owed op(s) the walk did NOT call=${J(uncalled.map((o) => o.opId))}, each reported undone by an earlier call's own undoneOps=${skipOk}; no op called twice=${noDouble}; the store met NO floor and the attempt's own failure token stands alone=${t && t.status} (the first run's expectation of a SECOND, RollbackCompacted step here is WITHDRAWN BY NAME at A111 — under the settled law no second call is issued over an op the first call's own undoneOps already reports undone)`];
    });
  assertCell('E2E-C-2.8', "the END STATE is the state the store's own composition produced, READ OFF THE STEPS' OWN MEMBERS: the performed calls' `undoneOps` are the reach the composition claims and no wider, so the store's own read at ['a'] matches EXACTLY what those members report — where the caller's own earlier write at this address IS a member of that union, the standing state is the absence the store itself reports; NO clause of this battery claims the pre-commit value stands, that claim being WITHDRAWN BY NAME and `OWED` to the store-side pass `J-20`–`J-22`", 'contract.md §5.7 (P-TP-7 as re-read under A111); composition-and-states.md §2.6 item 8 (iii) and item 4 (the store\'s own reach); contract.md §0.1 item 5 (i) (the OWED seam); A: docs/specs/storeroom-native/write-and-read.md §6.4 items 1/3/4',
    () => {
      const u = [...new Set(X.rep.rollback.flatMap((x) => x.undoneOps))];
      const sweptPre = u.includes(X.preOpId);
      let a; try { a = `value=${J(sRead(s, ['a']))}`; } catch (e) { a = `threw ${e.status}`; }
      const expected = sweptPre ? 'threw AddressNotFound' : `value=${J(X.preValue)}`;
      return [a === expected,
        `pre-commit read was ${J(X.preValue)} (the caller's own earlier write at this address=${X.preOpId}); read after the failure = ${a}; performed union=${J(u)} (${u.length} op(s), of which OUTSIDE this attempt's own ops: ${J(u.filter((id) => !X.rep.ops.some((o) => o.opId === id)))} — the store's own report of its subtree-wide reach, §2.6 item 4, RC-14 ANSWERED); the caller's earlier op stands IN the performed union=${sweptPre} so the members' own report REQUIRES ${expected} and the store's own answer is ${a} — the read matches the members EXACTLY; report ops=${J(X.rep.ops.map((o) => o.opId))}. The pre-state claim is OWED (contract.md §0.1 item 5 (i), J-20–J-22) and is NOT a verification the closed caller-side surface can have.`];
    });
  assertCell('E2E-C-2.9', "the per-landing (atomic) constraint pass is `OWED` (`J-20`–`J-22`), so no landing is recorded as one that left the address valid: the kernel runs NO pass when a write lands — the registered pairs have run 0 times when K-2 has returned, and the pass runs only inside K-3 — and the `checkpoint` member therefore reads `null` on every step of this attempt, its non-null arm standing PARKED and never claimed green", 'kernel-surface.md §2.3 item 1 (the pass and its timing, OWED at J-21); contract.md §0.1 item 5 (i); composition-and-states.md §2.6 item 8 (iii); attempt-lifecycle.md §2.4 item 3 (the attempt\'s terminal arm); live-greens.md CON-1',
    () => {
      const cps = [...new Set(X.rep.rollback.map((x) => x.checkpoint))];
      const allNull = cps.length <= 1 && cps.every((v) => v === null);
      return [X.atK2.x === 0 && X.atK2.y === 0 && X.atK2.z === 0 && allNull,
        `evaluations when K-2 returned: x=${X.atK2.x} y=${X.atK2.y} z=${X.atK2.z}; the attempt's own check entries=${J(X.t.log.filter((e) => e.kind === 'constraint-check').map((e) => `${e.id}@${e.opId}`))} (all of them K-3's own pass); checkpoints on every step=${J(cps.map((v) => (v === null ? 'null' : v)))}. THE GREENS SET READ THIS AS A DEFECT; UNDER THE SETTLED LAW THE ABSENCE OF A PER-LANDING PASS IS THE DECLARED OWED STATE (J-21), and the member's non-null arm is PARKED — the null is read and no restored-state claim is made past it.`];
    });
  assertCell('E2E-C-2.10', "the failing pair (['a'],'x') is IN ran and NOT IN appliedRepairs (it carries no repair), so the attempt reaches arm (f): the ONE repair of this window belongs to (['a'],'y') and its repair-run count is 1, never 0", "attempt-lifecycle.md §2.4 item 4's disjointness rule and arm (f); fail-surface.md §2's KC-5/KC-6 rows",
    () => {
      const rr = X.rep.log.filter((e) => e.kind === 'repair-run');
      const y = rr.filter((e) => e.id === 'y').length, x = rr.filter((e) => e.id === 'x').length;
      return [y === 1 && x === 0, `repair-run entries: y=${y} x=${x}`];
    });
});

// ================================================================================================
// E2E-C-3 — a successful repair: the re-run passes and the attempt resolves
// ================================================================================================
row('E2E-C-3', "a caller commits an over-large value whose repair clamps it in place", 'K-3 returns passed with two ops and a four-entry log');
rowBody('E2E-C-3', () => {
  const s = mkStore('c3'); X.s = s;
  X.rctx = null;
  K1(s, ['a'], 'x', (ctx) => {
    if (ctx.value <= 10) return true;
    return { message: 'value too large', repair: (r) => { X.rctx = r; const w = sWrite(s, ['a'], 'mem', 5); return { ok: true, op: w.op }; } };
  });
  X.rec = K2(s, ['a'], 'mem', 99);
  X.thrown = null; X.rep = null;
  try { X.rep = K3(s, X.rec); } catch (e) { X.thrown = e; }
  const rep = X.rep;
  assertCell('E2E-C-3.1', "the re-run passes: outcome 'passed'", 'attempt-lifecycle.md §2.4 item 4 arm (g); composition-and-states.md §2.7 item 6',
    () => [rep && rep.outcome === 'passed', `outcome=${rep ? rep.outcome : 'threw ' + (X.thrown && X.thrown.status)}`]);
  assertCell('E2E-C-3.2', "ops carries the write's op FIRST and the repair's op second, in creation order", 'attempt-lifecycle.md §2.4 item 1; composition-and-states.md §2.6 item 2',
    () => [rep && rep.ops.length === 2 && rep.ops[0].opId === X.rec.op.opId, `ops=${J(rep && rep.ops.map((o) => o.opId))}`]);
  assertCell('E2E-C-3.3', 'the repair context carries exactly {op, address, id, value, tier}: the violated pair and the value standing at the address', 'parameter-semantics.md §2.16; kernel-surface.md §2.3 item 2',
    () => {
      const r = X.rctx;
      const ok = r && eq(Object.keys(r).slice().sort(), ['address', 'id', 'op', 'tier', 'value']) && eq(r.address, ['a']) && r.id === 'x' && r.value === 99 && r.tier === 'mem' && r.op && r.op.opId === X.rec.op.opId;
      return [ok, `repair ctx.keys=${r ? Object.keys(r).sort().join(',') : ''} ctx.op.opId=${r && r.op && r.op.opId} = write op ${X.rec.op.opId}? ${r && r.op && r.op.opId === X.rec.op.opId}; full=${J(r)}`];
    });
  assertCell('E2E-C-3.4', 'the repair-run entry belongs to the pair, its opId is the op the repair produced, its state is null', 'kernel-surface.md §2.5 item 1 (the repair-run row)',
    () => {
      const rr = rep.log.find((e) => e.kind === 'repair-run');
      const ok = rr && rr.id === 'x' && rr.opId === rep.ops[1].opId && rr.state === null && rr.seq === 2;
      return [ok, `repair-run=${J(rr)}`];
    });
  assertCell('E2E-C-3.5', "the log's own message provenance: the constraint supplied its OWN string and it is carried WHOLE on its constraint-check entry; the repair's SUCCESS arm ({ok:true, op}) carries NO message, so the repair-run entry's text is the KERNEL's own generated sentence", 'kernel-surface.md §2.5 item 1 (the message table); fail-surface.md §1.1 item 2 (ii)',
    () => {
      const cc = rep.log.find((e) => e.kind === 'constraint-check');
      const rr = rep.log.find((e) => e.kind === 'repair-run');
      return [cc.message === 'value too large' && typeof rr.message === 'string' && rr.message.length > 0,
        `constraint-check msg=${J(cc.message)} repair-run msg=${J(rr.message)}`];
    });
  assertCell('E2E-C-3.6', 'the log is constraint-check(x, op1) · repair-run(x, op2) · constraint-check(x, op2) · commit — one check per pair per pass', 'attempt-lifecycle.md §2.4 items 5 (ii),(iv); kernel-surface.md §2.5 item 1',
    () => {
      const want = ['constraint-check/x/null', 'repair-run/x/null', 'constraint-check/x/null', 'commit/null/null'];
      const got = cids(rep.log).split(' ');
      return [eq(got, want), `shape=${eq(got, want) ? 'ok' : 'DIVERGENT'} kinds=[${cids(rep.log)}]`];
    });
  // THE CHECKPOINT'S ONE LIVE CARRIER IS RECORDED HERE WITHOUT MINTING A CELL: a PASSING attempt carries no
  // `rollback` step, so the member has no step to be read off; the pin is nonetheless made at this
  // attempt's own landing (the repair's op at the attempt's own address), which is what refutes the greens
  // set's stated cause at E2E-C-15 cells 4 and 8. The greens set declares 7 cells for this row, so this is
  // an ANNOTATION and not a cell.
  assertCell('E2E-C-3.7', 'rollback is [] on the success arm (the member exists and is empty)', 'kernel-surface.md §2.1 item 3; parameter-semantics.md §2.17',
    () => [Array.isArray(rep.rollback) && rep.rollback.length === 0, `rollback=${J(rep.rollback)}`]);
});

// ================================================================================================
// E2E-C-4 — a failed repair: KC-4, and what was attempted is in the log
// ================================================================================================
row('E2E-C-4', "a caller commits an over-large value whose repair returns {ok:false, message}", "K-3 throws KC-4 with the attempt's own three-entry log");
rowBody('E2E-C-4', () => {
  const s = mkStore('c4'); X.s = s;
  X.repairRuns = 0;
  X.msg = 'attempted to clamp at 5 and was refused';
  K1(s, ['a'], 'x', (ctx) => (ctx.value > 10
    ? { message: 'value too large', repair: () => { X.repairRuns += 1; return { ok: false, message: X.msg }; } }
    : true));
  X.rec = K2(s, ['a'], 'mem', 99);
  X.t = null; X.rep = null;
  try { X.returned = K3(s, X.rec); } catch (e) { X.t = e; }
  X.rep = K5(s, X.rec.attempt);
  const t = X.t, rep = X.rep;
  assertCell('E2E-C-4.1', 'the attempt throws the kernel form with exactly {status, message, log}', 'fail-surface.md §1.1 item 1',
    () => [t && eq(Object.keys(t).slice().sort(), ['log', 'message', 'status']), `keys=${t ? Object.keys(t).join(',') : '(no throw)'}`]);
  assertCell('E2E-C-4.2', "status is KC-4 and the thrown form's log differs from the open record's by TWO entries: the repair-run entry and the outcome entry", 'fail-surface.md §1.1 item 3; kernel-surface.md §2.5 item 1',
    () => [t && t.status === 'KC-4' && eq(cids(t.log).split(' '), ['constraint-check/x/null', 'repair-run/x/null', 'outcome/null/KC-4']),
      `status=${t && t.status} kinds=[${t ? cids(t.log) : ''}]`]);
  assertCell('E2E-C-4.3', "the repair-run entry's message carries WHAT WAS ATTEMPTED, verbatim from the repair's own return", 'kernel-surface.md §2.5 item 1 (the repair-run row); parameter-semantics.md §2.8',
    () => {
      const rr = t.log.find((e) => e.kind === 'repair-run');
      return [rr.message === X.msg, `repair-run=${J(rr)}`];
    });
  annotate('E2E-C-3.7');
  assertCell('E2E-C-4.4', 'the repair ran exactly once for the pair, and no op was credited to the attempt', 'parameter-semantics.md §2.9',
    () => [X.repairRuns === 1 && rep.ops.length === 1, `repairRuns=${X.repairRuns} ops=${rep.ops.length}`]);
  assertCell('E2E-C-4.5', 'the closed record K-5 returns carries that same final log and the failed outcome', 'kernel-surface.md §2.1 items 3,5',
    () => [rep.outcome === 'failed' && eq(rep.log, t.log), `report outcome=${rep.outcome} log-equal=${eq(rep.log, t.log)}`]);
  assertCell('E2E-C-4.6', "a thrown form's status is never a store member and the log's outcome state is the SAME token", 'fail-surface.md §1.1 item 1 (a),(c)',
    () => {
      const o = t.log.find((e) => e.kind === 'outcome');
      return [/^KC-[1-8]$/.test(t.status) && o.state === t.status, `status=${t.status} outcome.state=${o.state}`];
    });
  assertCell('E2E-C-4.7', "the store's own read at ['a'] answers the state that stood there before commit — here the pre-state is the key's ABSENCE and the store's own answer is its AddressNotFound", 'composition-and-states.md §2.7 (the disposed state); contract.md §5.7 (P-TP-7); storeroom-native/write-and-read.md §2.2 (L-3)',
    () => {
      let a; try { a = `value=${J(sRead(s, ['a']))}`; } catch (e) { a = `threw ${e.status}`; }
      return [a === 'threw AddressNotFound', `read=${a} (this window's pre-state is the key's own absence, so the ABSENCE arm is what is readable here; the last-valid-state arm — an address that HELD a value before commit — is read at E2E-C-2 cell 8, where the store does NOT stand at the pre-commit value)`];
    });
});

// ================================================================================================
// E2E-C-5 — the first-repeat rule, BOTH limbs, three windows: KC-6, KC-6, KC-5
// ================================================================================================
row('E2E-C-5', "three separate windows at one address, each with a pair whose repair lands a value another pair then violates", 'KC-6 (alpha), KC-6 (beta), KC-5 (gamma); a second K-3 is KC-2');
rowBody('E2E-C-5', () => {
  // alpha: pair c1 (no repair, passes the first evaluation) violated by c2's repair's landing
  const a = mkStore('c5a'); X.a = a;
  X.aRuns = { c1: 0, c2: 0 };
  K1(a, ['a'], 'c1', (ctx) => { X.aRuns.c1 += 1; return ctx.value <= 4 ? true : { message: 'c1 broken' }; });
  K1(a, ['a'], 'c2', (ctx) => (ctx.value <= 1 ? true : { message: 'c2 broken', repair: () => { const w = sWrite(a, ['a'], 'mem', 9); return { ok: true, op: w.op }; } }));
  X.aRec = K2(a, ['a'], 'mem', 2);
  X.aT = null; try { K3(a, X.aRec); } catch (e) { X.aT = e; }
  X.aRep = K5(a, X.aRec.attempt);
  X.aSecondK3 = null; try { K3(a, X.aRec); } catch (e) { X.aSecondK3 = e.status; }

  // beta: same limb, different ids (cQ repeated, cP repairs)
  const b = mkStore('c5b'); X.b = b;
  X.bRuns = { cQ: 0, cP: 0 };
  K1(b, ['a'], 'cQ', (ctx) => { X.bRuns.cQ += 1; return ctx.value <= 4 ? true : { message: 'cQ broken' }; });
  K1(b, ['a'], 'cP', (ctx) => (ctx.value <= 1 ? true : { message: 'cP broken', repair: () => { const w = sWrite(b, ['a'], 'mem', 9); return { ok: true, op: w.op }; } }));
  X.bRec = K2(b, ['a'], 'mem', 2);
  X.bT = null; try { K3(b, X.bRec); } catch (e) { X.bT = e; }
  X.bRep = K5(b, X.bRec.attempt);

  // gamma: the repeated pair IS IN appliedRepairs (its own repair ran, and the repair re-violates itself)
  const g = mkStore('c5g'); X.g = g;
  X.gRuns = { C1: 0 };
  K1(g, ['a'], 'C1', (ctx) => { X.gRuns.C1 += 1; return { message: 'C1 broken', repair: () => { const w = sWrite(g, ['a'], 'mem', 7); return { ok: true, op: w.op }; } }; });
  X.gRec = K2(g, ['a'], 'mem', 3);
  X.gT = null; try { K3(g, X.gRec); } catch (e) { X.gT = e; }
  X.gRep = K5(g, X.gRec.attempt);

  const aT = X.aT, bT = X.bT, gT = X.gT;
  assertCell('E2E-C-5.1', "arm (f): the pair (['a'],'c1') is IN ran and NOT IN appliedRepairs, so the repeat carries the token its own limb names — KC-6", "attempt-lifecycle.md §2.4 item 4 arm (f); fail-surface.md §2's KC-6 row",
    () => [aT && aT.status === 'KC-6', `status=${aT && aT.status}`]);
  assertCell('E2E-C-5.2', "the repeated pair's repair-run count is 0 and the repair that DID run belongs to (['a'],'c2') — the two limbs are disjoint on appliedRepairs", 'attempt-lifecycle.md §2.4 item 4 (the disjointness rule); fail-surface.md §2\'s KC-5 row',
    () => {
      const rr = aT.log.filter((e) => e.kind === 'repair-run');
      return [rr.length === 1 && rr[0].id === 'c2', `kinds=[${cids(aT.log)}] repair-run ids=${J(rr.map((e) => e.id))}`];
    });
  assertCell('E2E-C-5.3', "the repeated pair was evaluated twice, at two opIds, and its OWN violation count is 1 and never 2 — the first evaluation passed, the second violated", 'attempt-lifecycle.md §2.4 items 5 (ii),(iv); fail-surface.md §2\'s KC-6 row',
    () => {
      const cc = aT.log.filter((e) => e.kind === 'constraint-check' && e.id === 'c1');
      return [cc.length === 2 && new Set(cc.map((e) => e.opId)).size === 2 && X.aRuns.c1 === 2, `kinds=[${cids(aT.log)}] c1-fn-runs=${X.aRuns.c1} c1-check-opIds=${J([...new Set(cc.map((e) => e.opId))])}`];
    });
  assertCell('E2E-C-5.4', "the second window drives the SAME limb and the same token: KC-6, with (['a'],'cQ') in ran and out of appliedRepairs", 'attempt-lifecycle.md §2.4 item 4 arm (f); e2e-scenarios.md E2E-C-5 cell 5',
    () => [bT && bT.status === 'KC-6' && X.bRuns.cQ === 2, `status=${bT && bT.status} cQ-fn-runs=${X.bRuns.cQ}`]);
  assertCell('E2E-C-5.5', 'the two windows are DISJOINT on the two predicates and not one limb in two spellings: both read the pair IN ran and NOT IN appliedRepairs, and neither invoked a repair for the repeated pair', 'attempt-lifecycle.md §2.4 item 4\'s disjointness rule',
    () => {
      const rr = bT.log.filter((e) => e.kind === 'repair-run');
      return [rr.length === 1 && rr[0].id === 'cP', `kinds=[${cids(bT.log)}] repair-run ids=${J(rr.map((e) => e.id))}`];
    });
  assertCell('E2E-C-5.6', "arm (e): the repeated pair (['a'],'C1') IS IN appliedRepairs, so the token is KC-5 and the outcome entry's state is that same token", 'attempt-lifecycle.md §2.4 item 4 arm (e); fail-surface.md §2\'s KC-5 row ("IS IN appliedRepairs before it")',
    () => {
      const o = gT.log.find((e) => e.kind === 'outcome');
      return [gT.status === 'KC-5' && o.state === 'KC-5', `status=${gT.status} outcome.state=${o.state} kinds=[${cids(gT.log)}]`];
    });
  assertCell('E2E-C-5.7', "no repair runs a second time: the repeated pair's repair-run count is exactly 1 and never 2", 'fail-surface.md §2\'s KC-5 row; e2e-scenarios.md E2E-C-5 cell 5',
    () => {
      const rr = gT.log.filter((e) => e.kind === 'repair-run' && e.id === 'C1');
      return [rr.length === 1 && X.gRuns.C1 === 2, `C1 repair-runs=${rr.length} C1-fn-runs=${X.gRuns.C1}`];
    });
  assertCell('E2E-C-5.8', 'the attempt is closed on every failure arm, so the stale CommitRecord the caller still holds is refused KC-2 by a second K-3 — and never KC-7', 'kernel-surface.md §2.1 item 3 (RD-9); parameter-semantics.md §2.15',
    () => [X.aSecondK3 === 'KC-2', `second K-3 = ${X.aSecondK3}`]);
  assertCell('E2E-C-5.9', 'the two limbs are DISJOINT on appliedRepairs alone and not on registration: the same address produced KC-6 where the pair\'s repair never ran and KC-5 where it had', 'attempt-lifecycle.md §2.4 item 4 (the disjointness rule, registration-keyed reading withdrawn by name); fail-surface.md §2 — the two rows',
    () => [aT.status === 'KC-6' && gT.status === 'KC-5', `limb tokens: (alpha)=${aT.status} (gamma)=${gT.status}`]);
});

// ================================================================================================
// E2E-C-6 — two registrations at one address, the pair's idempotence, the KC-7 / KC-2 halves
// ================================================================================================
row('E2E-C-6', 'a caller registers two pairs at one address, then calls a second K-2 there while the first attempt stands OPEN', 'KC-2 on the stale record (holds); the second K-2 at the OPEN address');
rowBody('E2E-C-6', () => {
  const s = mkStore('c6'); X.s = s;
  const order = [];
  X.hA = K1(s, ['a'], 'A', (ctx) => { order.push('A'); return ctx.value <= 100 ? true : { message: 'A broken' }; });
  X.hB = K1(s, ['a'], 'B', (ctx) => { order.push('B'); return ctx.value <= 100 ? true : { message: 'B broken', repair: () => { const w = sWrite(s, ['a'], 'mem', 1); return { ok: true, op: w.op }; } }; });
  X.rec = K2(s, ['a'], 'mem', 1);
  X.rep = K3(s, X.rec);
  X.order1 = [...order];
  // (a) the second K-2 at the SAME address while an attempt stands OPEN
  const s2 = mkStore('c6b');
  K1(s2, ['a'], 'A', () => true);
  const open = K2(s2, ['a'], 'mem', 1);         // opened, NOT run: the attempt stands OPEN
  X.openRec = open;
  X.second = null;
  try { X.second = { returned: K2(s2, ['a'], 'mem', 2) }; } catch (e) { X.second = { threw: e.status, message: e.message }; }
  // (b) the stale record after the terminal arm
  X.stale = null; try { K3(s, X.rec); } catch (e) { X.stale = e.status; }
  // (c) THE HOLD'S RELEASE (settled after the first run): after that terminal arm, is a FRESH K-2 at the
  // SAME address lawful? The address holds a leaf here, so the write verb IS reached and the store answers;
  // what the kernel must NOT do is refuse it KC-7.
  X.fresh = { storeStatus: null, freshRec: null };
  try { X.fresh.freshRec = K2(s, ['a'], 'mem', 3); }
  catch (e) { X.fresh.storeStatus = e.status; }
  if (X.fresh.storeStatus) {
    sWrite(s, ['a'], 'mem', 3);                       // the store's own verb seeds the address again
    try { X.fresh.freshRec = K2(s, ['a'], 'mem', 4); } catch (e2) { X.fresh.storeStatus2 = e2.status; }
    if (!X.fresh.freshRec) X.fresh.secondK2 = X.fresh.storeStatus2 || X.fresh.storeStatus;
  }
  X.k4 = K4(s, X.rec.attempt); X.k5 = K5(s, X.rec.attempt);
  // (c) pair idempotence: a re-registration at the SAME pair replaces the function
  const s3 = mkStore('c6c');
  let replaced = 0, replacement = 0;
  K1(s3, ['a'], 'A', () => { replaced += 1; return true; });
  const h1 = K1(s3, ['a'], 'A', () => { replacement += 1; return true; });
  const h2 = K1(s3, ['a'], 'A', () => { replacement += 1; return true; });
  const c3 = K2(s3, ['a'], 'mem', 1); const r3 = K3(s3, c3);
  X.replaced = replaced; X.replacement = replacement; X.h1 = h1; X.h2 = h2; X.r3 = r3;
  // (d) a third id at the same address is appended after every pair standing
  const s4 = mkStore('c6d'); const ord = [];
  K1(s4, ['a'], 'A', () => { ord.push('A'); return true; });
  K1(s4, ['a'], 'C', () => { ord.push('C'); return true; });
  const c4 = K2(s4, ['a'], 'mem', 1); K3(s4, c4);
  X.orderAC = [...ord];

  assertCell('E2E-C-6.1', 'the pass evaluates the two pairs in first-registration order: A then B, each once, each at the write\'s op', 'kernel-surface.md §2.1 item 1 (order clause); attempt-lifecycle.md §2.4 item 5 (ii)',
    () => {
      const cc = X.rep.log.filter((e) => e.kind === 'constraint-check');
      return [eq(cc.map((e) => e.id), ['A', 'B']) && cc.every((e) => e.opId === X.rec.op.opId), `kinds=[${cids(X.rep.log)}]`];
    });
  assertCell('E2E-C-6.2', 'each pair is evaluated exactly once in the pass (at most once per pass)', 'attempt-lifecycle.md §2.4 item 5 (iv)',
    () => {
      const cc = X.rep.log.filter((e) => e.kind === 'constraint-check');
      return [cc.filter((e) => e.id === 'A').length === 1 && cc.filter((e) => e.id === 'B').length === 1, `A=${cc.filter((e) => e.id === 'A').length} B=${cc.filter((e) => e.id === 'B').length}`];
    });
  assertCell('E2E-C-6.3', "BOTH halves of the two-state rule, PLUS its settled third reading: (a) a second K-2 at the SAME address while the first attempt's write verb has OPENED the hold and that attempt has NOT reached its terminal arm is REFUSED with KC-7, BEFORE the write verb is reached; (b) the stale record after a terminal arm is answered with KC-2 by K-3 and never KC-7; and (c) after the terminal arm the hold is RELEASED, so a FRESH K-2 at that same address must RETURN A FRESH CommitRecord and throw no KC-7 — any refusal it meets there being the STORE's own, reached because the write verb WAS reached", 'kernel-surface.md §2.1 item 2 (all three readings of the hold\'s edges, the release clause settled after the first run); fail-surface.md §2\'s KC-7 and KC-2 rows',
    () => {
      const a = X.second, f = X.fresh;
      const aOk = a && a.threw === 'KC-7' && X.stale === 'KC-2';
      const cOk = (f.freshRec && !!f.freshRec.op && f.freshRec.attempt) || (f.storeStatus && f.storeStatus !== 'KC-7');
      return [aOk && cOk,
        `(a) second K-2 at the OPEN attempt's address (its own write verb has opened the hold and no terminal arm has run) = ${a && a.threw ? 'THREW ' + a.threw + ' :: ' + J(a.message) : 'returned op=' + J(a && a.returned && a.returned.op && a.returned.op.opId) + ' (CONTRADICTION: a second K-2 was admitted over an attempt whose terminal arm has not run)'} (the refusal precedes the write verb); (b) stale K-3 = ${X.stale}; (c) after the terminal arm: a fresh K-2 at the same address held a leaf so its write verb WAS reached and the STORE refused it ${J(f.storeStatus)} — the store's own code and never KC-7=${f.storeStatus !== 'KC-7'}; and after a store write seeded the address again, the fresh K-2 RETURNED a CommitRecord op=${J(f.freshRec && f.freshRec.op && f.freshRec.op.opId)} for its own write, no second act beside the earlier attempt's terminal arm — the residue a failed commit left in the commit registry does NOT refuse it.`];
    });
  // AN ANNOTATION, not a declared cell: the same third reading driven on the FAILURE arm proper — an
  // attempt whose composition THREW, leaving its own commit-registry entry standing (`A106` `Q3`) — which
  // is the residue case `§2.1` item 2 leaves the kernel's window edges for.
  {
    const sF = mkStore('c6e');
    sWrite(sF, ['a'], 'mem', { o: 0 });
    for (let i = 0; i < 8; i += 1) sWrite(sF, ['a'], 'mem', { o: i + 1 });
    sWrite(sF, ['a', 'b'], 'mem', { b: 0 });
    K1(sF, ['a'], 'x', (ctx) => (ctx.value && ctx.value.o === 99
      ? { message: 'x bad', repair: () => { const w = sWrite(sF, ['a', 'b'], 'mem', { b: 7 }); return { ok: true, op: w.op }; } }
      : true));
    K1(sF, ['a'], 'z', () => ({ message: 'z bad' }));
    const cF = K2(sF, ['a'], 'mem', { o: 99 });
    let tF = null; try { K3(sF, cF); } catch (e) { tF = e; }
    const repF = K5(sF, cF.attempt);
    let fresh = null;
    try { const c2 = K2(sF, ['a'], 'mem', { o: 5 }); fresh = `RETURNED op=${c2.op.opId}`; } catch (e) { fresh = `threw ${e.status}`; }
    annotate('E2E-C-6.3b');
    cell('E2E-C-6.3b', 'the residue arm proper: a failed commit whose composition THREW leaves its own commit-registry entry standing, and the hold is still released by that attempt\'s terminal arm — a later K-2 at that address RETURNS A FRESH RECORD (`KC-7` row; `§2.1` item 2, settled after the first run)',
      'fail-surface.md §2 (the KC-7 row); kernel-surface.md §2.1 item 2; A: docs/decisions.md A106 Q3',
      `this window: the attempt closed ${tF && tF.status} with its composition ${J(repF.rollback.map((x) => ({ opId: x.opId, a: x.answer, f: x.failed })))} and its residue in the commit registry; a K-2 at the same address after that terminal arm ${fresh} — never KC-7, and the residue does not refuse it.`,
      'ANNOTATION');
  }
  assertCell('E2E-C-6.4', 'the stale record the caller still holds after a terminal arm is answered with KC-2 by K-3 and NEVER with KC-7, and no state moves: K-4 and K-5 over that same reference still return the closed record\'s log and report', 'kernel-surface.md §2.1 item 2 (RD-9, read whole); parameter-semantics.md §2.15',
    () => [X.stale === 'KC-2' && eq(X.k4, X.rep.log) && X.k5.outcome === X.rep.outcome,
      `second K-3 = ${X.stale}; K-4 log-equal=${eq(X.k4, X.rep.log)} K-5 outcome=${X.k5.outcome}`]);
  assertCell('E2E-C-6.5', 'a re-registration at the SAME pair replaces the function, adds no second entry (one constraint-check entry)', 'kernel-surface.md §2.1 item 1 (pair idempotence); composition-and-states.md §2.7 item 2',
    () => {
      const cc = X.r3.log.filter((e) => e.kind === 'constraint-check');
      return [cc.length === 1 && X.replaced === 0 && X.replacement === 1, `kinds=[${cids(X.r3.log)}] replaced-ran=${X.replaced} replacement-ran=${X.replacement}`];
    });
  assertCell('E2E-C-6.6', 'a re-registration at the same pair returns the SAME adopted handle (the store holds ONE entry at the address)', 'kernel-surface.md §2.1 item 1 (idempotence at the pair)',
    () => [X.h1 === X.h2, `two K-1 calls at pair (a,A) compared by identity: ${X.h1 === X.h2}`]);
  assertCell('E2E-C-6.7', "the replacement's new function survives in the caller-side registry and nowhere else", 'kernel-surface.md §2.1 item 1 (CC-5)',
    () => [X.replacement === 1 && X.replaced === 0, `replacement=${X.replacement} replaced=${X.replaced}`]);
  assertCell('E2E-C-6.8', 'a third id at the same address is appended AFTER every pair standing — the pass order is A then C', 'kernel-surface.md §2.1 item 1 (order clause)',
    () => [eq(X.orderAC, ['A', 'C']), `order=${J(X.orderAC)}`]);
});

// ================================================================================================
// E2E-C-7 — the function's side, the log's order, and a comparison that can fail
// ================================================================================================
row('E2E-C-7', 'a caller registers a pair at an ancestor and one at a descendant, then commits an object', 'one pair reaches two different outcomes for two different values');
rowBody('E2E-C-7', () => {
  const s = mkStore('c7'); X.s = s;
  X.ctxA1 = null;
  K1(s, ['a'], 'a1', (ctx) => { X.ctxA1 = ctx; return true; });
  K1(s, ['a'], 'a2', (ctx) => (ctx.value && ctx.value.n > 5 ? { message: 'too big' } : true));
  K1(s, ['a', 'b'], 'b1', () => true);
  X.rec = K2(s, ['a'], 'mem', { n: 1 });
  X.openLog = K4(s, X.rec.attempt);
  X.openLogLen = X.openLog.length;
  X.rep = K3(s, X.rec);
  const s2 = mkStore('c7b');
  K1(s2, ['a'], 'v', (ctx) => (ctx.value > 5 ? { message: 'too large' } : true));
  const c1 = K2(s2, ['a'], 'mem', 1); const r1 = K3(s2, c1);
  const c2 = K2(s2, ['a'], 'mem', 9); let t2 = null; try { K3(s2, c2); } catch (e) { t2 = e; }
  X.small = r1; X.big = t2;

  assertCell('E2E-C-7.1', "the pass over ['a'] evaluates exactly the pairs at the attempt's OWN address: the two at ['a'] and NOT the pair at ['a','b']", 'attempt-lifecycle.md §2.4 item 5 (iv)',
    () => {
      const cc = X.rep.log.filter((e) => e.kind === 'constraint-check');
      return [cc.length === 2 && !cc.some((e) => e.id === 'b1'), `ctx a1=${X.ctxA1 ? 1 : 0} a2=${cc.filter((e) => e.id === 'a2').length} checks=${cc.length} ids=${J(cc.map((e) => e.id))}`];
    });
  assertCell('E2E-C-7.2', 'the value the constraint read is the object the caller wrote, VERBATIM', 'parameter-semantics.md §2.16; kernel-surface.md §2.3 item 1',
    () => [eq(X.ctxA1.value, { n: 1 }), `ctx.value=${J(X.ctxA1 && X.ctxA1.value)}`]);
  assertCell('E2E-C-7.3', "op in the attempt context is the op WHOSE LANDING left the state the evaluation runs at — the write's own op", 'kernel-surface.md §2.3 item 1',
    () => [X.ctxA1.op && X.ctxA1.op.opId === X.rec.op.opId, `ctx.op.opId=${X.ctxA1 && X.ctxA1.op && X.ctxA1.op.opId} write=${X.rec.op.opId} (the member carries the store's own journal record, whose opId is the write's)`]);
  assertCell('E2E-C-7.4', 'every constraint-check entry names the op it evaluated and carries state null', 'kernel-surface.md §2.5 item 1 (the constraint-check row)',
    () => {
      const cc = X.rep.log.filter((e) => e.kind === 'constraint-check');
      return [cc.every((e) => typeof e.opId === 'string' && e.state === null), `kinds=[${cids(X.rep.log)}]`];
    });
  assertCell('E2E-C-7.5', "K-4 over the OPEN attempt returns the open record's own log — read before K-3, it is empty and it is a LIST", 'kernel-surface.md §2.1 item 4; kernel-surface.md §2.3 item 1',
    () => [Array.isArray(X.openLog) && X.openLogLen === 0, `open log length at commit time = ${X.openLogLen}`]);
  assertCell('E2E-C-7.6', 'the SAME registered pair reaches DIFFERENT outcomes for different values: passed for 1, KC-3 for 9 — the comparison can fail', 'parameter-semantics.md §2.5 observable; attempt-lifecycle.md §2.4 item 4 arm (c)',
    () => [X.small.outcome === 'passed' && X.big && X.big.status === 'KC-3', `small=${X.small.outcome} big=${X.big && X.big.status} values=1,9`]);
  assertCell('E2E-C-7.7', "the kernel's own order is the log's seq and nothing store-side: seq strictly increasing from 1 in both attempts, no entry carrying a member outside the six", 'kernel-surface.md §2.5 item 1 (order); attempt-lifecycle.md §2.4 item 5 (ii)',
    () => {
      const inc = (l) => l.every((e, i) => e.seq === i + 1);
      const six = (l) => l.every((e) => eq(Object.keys(e).slice().sort(), ['id', 'kind', 'message', 'opId', 'seq', 'state']));
      return [inc(X.small.log) && inc(X.big.log) && six(X.small.log) && six(X.big.log), `small shape=${six(X.small.log) && inc(X.small.log) ? 'ok' : 'BAD'} big kinds=[${cids(X.big.log)}]`];
    });
});

// ================================================================================================
// E2E-C-8 — parity between the app's own call and the app's listener body
// ================================================================================================
row('E2E-C-8', "a caller registers a store listener at the address, commits there; its own loop then reads pending", 'both windows resolve passed; the caller\'s own loop invokes nothing');
rowBody('E2E-C-8', () => {
  const sA = mkStore('c8a'), sB = mkStore('c8b');
  K1(sA, ['a'], 'x', () => true);
  const cA = K2(sA, ['a'], 'mem', 1);
  const rA = K3(sA, cA);
  // beta: the delivery layer — the app's own store listener beside the kernel's own registration at the
  // same address, whose body runs its own attempt for the write it observed. (The kernel's own registration
  // stands FIRST: a caller registration made before K-1 is the one K-1's own listen displaces.)
  X.betaRecord = null; X.betaRuns = 0; X.loopEntries = []; X.gated = 0; X.bodyAddr = [];
  K1(sB, ['a'], 'x', () => true);
  const handle = sListen(sB, ['a']);
  const body = (addr) => {
    X.betaRuns += 1; X.bodyAddr.push(addr);
    if (X.gated > 0) return;
    X.gated += 1;
    try { const c = K2(sB, ['a'], 'mem', 1); X.betaRecord = c; X.betaRep = K3(sB, c); } catch (e) { X.betaThrow = e.status || e.message; }
  };
  sB.register(handle, body);
  let cB = null;
  try { cB = K2(sB, ['a'], 'mem', 1); }          // the caller's own K-2 write at the watched address
  catch (e) { X.cBThrow = e.status || e.message; }
  X.cB = cB;
  X.atK2B = X.betaRuns;
  // the caller's own loop over CommitRecord.pending — the app's declared ONE invoker
  const map = new Map([[handle, body]]);
  if (cB) for (const hnd of cB.pending) { X.loopEntries.push(hnd); const f = map.get(hnd); if (f) f(['a']); }
  const rB = X.betaRep;
  X.rA = rA; X.cA = cA;

  assertCell('E2E-C-8.1', 'both windows resolve to the success arm for the same pair and the same value', 'attempt-lifecycle.md §2.4 item 4 arm (a)',
    () => [(rA && rA.outcome === 'passed') && (rB && rB.outcome === 'passed'), `alpha=${rA && rA.outcome} beta=${rB && rB.outcome}${X.cBThrow ? ` — THE BETA WINDOW'S OWN CALLER-SIDE K-2 THREW ${J(X.cBThrow)}: the store's own delivery ran the registered body SYNCHRONOUSLY INSIDE that write, the body's own nested K-2 met §2.1 item 2's hold (KC-7), and that throw travelled back up the CALLER's own write so no record came back at all (see this row's annotation 5b and E2E-C-16.4's ground (ii))` : ''}`]);
  assertCell('E2E-C-8.2', "the two windows' ops are of equal length with equal kind sequences", 'e2e-scenarios.md E2E-C-8 cell 5; kernel-surface.md §2.1 item 3',
    () => [!!rB && rA.ops.length === rB.ops.length, `alpha ops=${J(rA.ops.map((o) => o.kind))} beta ops=${J(rB ? rB.ops.map((o) => o.kind) : null)} beta attempt opened=${!!rB}`]);
  assertCell('E2E-C-8.3', "the two windows' logs have equal length and equal kind/id/state sequences", 'e2e-scenarios.md E2E-C-8 cell 5; kernel-surface.md §2.5 item 1',
    () => [!!rB && eq(cids(rA.log), cids(rB.log)), `alpha=[${cids(rA.log)}] beta=[${rB ? cids(rB.log) : 'no attempt opened'}]`]);
  assertCell('E2E-C-8.4', "rollback is [] in both windows and each window's attempt reference is its own", 'kernel-surface.md §2.1 item 3',
    () => [!!rB && rA.rollback.length === 0 && rB.rollback.length === 0 && rA.attempt !== rB.attempt, `alpha attempt=${rA.attempt.id} beta attempt=${rB ? rB.attempt.id : 'none'}`]);
  // THE SAME-ADDRESS WINDOW ABOVE CANNOT CARRY CELL 5: the kernel's own write landed AT the registered
  // address, so the pass evaluated that registration's pair and nothing of it stands for the loop. The
  // settled law's own predicate (`§2.2` item 2: layer (a) for a handle the KERNEL's write returned, layer (b)
  // for one the CALLER's write returned) leaves exactly one reachable shape for layer (b): a write landing
  // BELOW the registered address, whose pass evaluates none of that registration's pairs. Driven here.
  X.dw = (() => {
    const s = mkStore('c8d');
    sWrite(s, ['a'], 'mem', { o: 1 });                 // an object at ['a'] so a descendant is writable
    K1(s, ['a'], 'x', () => true);                    // a pair at the WATCH address
    const h = sListen(s, ['a']);
    const r = { runs: 0, args: [], gate: 0, nested: null, pendingHas: null, loopN: 0, triggered: 0, pending: 0, inLoop: false, deliveryRuns: 0 };
    const b = (addr) => {
      r.runs += 1; r.args.push(addr);
      // the store's own delivery fires this body SYNCHRONOUSLY INSIDE the kernel's own write, i.e. while
      // that write's attempt stands OPEN (§2.1 item 2's hold is what a verb call here would meet — KC-7 —
      // and, the store having invoked the body from inside its own write, a throw here travels back up that
      // write's own call). The delivery is therefore recorded as a READING and takes no verb call; the body's
      // own attempt — the docs' step (2) — is driven from the caller's own loop, layer (b)'s only invoker.
      if (!r.inLoop) { r.deliveryRuns += 1; r.firstDelivery = 'inside the kernel\'s own write'; return; }
      if (r.gate > 0) return;
      r.gate += 1;
      try { const c2 = K2(s, ['a', 'c'], 'mem', 5); r.nested = { op: c2.op.opId, rep: K3(s, c2) }; }
      catch (e) { r.nested = { threw: e.status }; }
    };
    s.register(h, b);
    let c = null;
    try { c = K2(s, ['a', 'c'], 'mem', 3); }          // the kernel's own write at a DESCENDANT
    catch (e) { r.k2Threw = e.status || e.message; }
    if (!c) { r.noRecord = r.k2Threw; return r; }
    r.triggered = c.triggered.length; r.pending = c.pending.length; r.pendingHas = c.pending.includes(h);
    r.runsAtK2 = r.runs; r.rec = c;
    const map = new Map([[h, b]]);
    r.inLoop = true;
    for (const hnd of c.pending) { r.loopN += 1; const f = map.get(hnd); if (f) f(['a', 'c']); }
    r.runsAfterLoop = r.runs;
    let rep = null;
    try { rep = K5(s, c.attempt); } catch (e) { r.repThrew = e.status || e.message; }
    r.log = rep ? rep.log.slice() : [];
    return r;
  })();
  assertCell('E2E-C-8.5', "the body the caller's own loop over `pending` invokes runs, and the handle it is invoked from IS a `CommitRecord.pending` member of the kernel's own write (a write landing below the registered address, whose pass evaluated none of that registration's pairs) — AND THE LOOP IS THE DELIVERY LAYER (b)'s ONLY INVOKER: no other act of a kernel window may hand that body control", 'kernel-surface.md §2.1 item 2 (the loop, and the member\'s carrier clause); kernel-surface.md §2.2 item 2 (the split\'s predicate: a handle is layer (b)\'s iff the CALLER made the write — and the kernel window must not invoke the handles a kernel-issued record carries); A: docs/decisions.md A108 D1/D2',
    () => {
      const d = X.dw;
      const ok = d.pendingHas === true && d.loopN > 0 && d.runsAfterLoop === d.loopN && d.runsAtK2 === 0;
      return [ok,
        `window: the kernel's own write at ['a','c'] below the registered ['a'] — triggered=${d.triggered} pending=${d.pending} (the listener's handle stands in pending=${d.pendingHas}); the body ran ${d.runsAtK2}x by K-2's return and ${d.runsAfterLoop - d.runsAtK2}x more from the caller's own loop (${d.loopN} handle(s) invoked, argument handed=${J(d.args)}); the loop is layer (b)'s only invoker=${d.runsAfterLoop === d.loopN && d.runsAtK2 === 0}. ${d.runsAtK2 > 0 ? `CONTRADICTION: ${d.runsAtK2} invocation(s) stand OUTSIDE the loop at K-2's return — the STORE's own delivery ran the registered body inside the kernel's own write, against §2.2 item 2's absolute "THE STORE NEVER INVOKES ANYTHING: IT RETURNS THE HANDLES". (This drive's body takes no verb call on a delivery that arrives outside the loop: issued there, a nested K-2 meets §2.1 item 2's hold KC-7 and, the store having invoked the body from inside its own write, that throw travels back up the caller's own write — measured separately in this row's beta window and at E2E-C-16.4 ground (ii).)` : ''} ${ok ? '' : `The same-address window (this row's alpha/beta pair) carries pending.length=${X.cB.pending.length} of ${X.cB.triggered.length} triggered handle(s), because the kernel's own write's pass DID evaluate that registration's pair and nothing of it stands for the loop — the member's carrier is the predicate's, not the window's.`}`];
    });
  // AN ANNOTATION, not a declared cell: the same window's delivery count, so the store's own invocation is
  // recorded as its own reading beside the cell rather than folded into it.
  annotate('E2E-C-8.5b');
  cell('E2E-C-8.5b', 'the delivery of a registered body in the window the settled law leaves open belongs to the CALLER\'S LOOP ALONE, and the store invokes nothing (`§2.2` item 2)',
    'kernel-surface.md §2.2 item 2; A: docs/specs/storeroom-native/write-and-read.md §6.5 item 10 (d)',
    `the store's own delivery ran the registered body ${X.dw.runsAtK2}x inside the kernel's own K-2 (its argument ${J(X.dw.args.slice(0, 2))}), and the caller's loop ran it ${X.dw.runsAfterLoop - X.dw.runsAtK2}x after K-2's return; the same store ran a plain listener body once on a pure caller's own store.write (scratch/lib/probe-deliv.mjs D2/D4) — so the store DOES invoke the bodies its own registrations hold, which is the live contradiction §2.2 item 2 names.`,
    'ANNOTATION');
  N('E2E-C-8.7', "the kernel's own window delivered its pass for the same write: the body's own attempt carries the one constraint-check entry the pair's pass appended", 'attempt-lifecycle.md §2.4 item 5 (iii); kernel-surface.md §2.1 item 2',
    `NOT EXERCISABLE, and STRUCTURALLY so, on two independent recorded grounds: (i) the store's own delivery runs the registered body INSIDE the kernel's own write (${X.dw.runsAtK2} invocation(s) at K-2's return; this drive's body is gated so the delivery records itself and calls no verb — issued there, a nested K-2 meets §2.1 item 2's hold KC-7 and, the store having invoked the body from inside its own write, that throw travels back up the caller's own write), so no body-driven attempt exists for this row to read; and (ii) by the time the caller's own loop DOES invoke the body (${X.dw.loopN} handle(s), cell 5), the body's own nested attempt is opened at ['a','c'], where NO pair is registered — so no pair's pass ran there and its log carries no constraint-check entry to carry. The two halves cannot be read beside one another at this build.`);
});

// ================================================================================================
// E2E-C-9 — the compacted floor: the composition reports what it performed and nothing wider
// ================================================================================================
row('E2E-C-9', "the app writes at ['a'] until the journal compresses, then registers a pair whose repair writes there and commits a violating value", "the walk reports exactly its own performed calls; the floor is read off the store's own answer");
rowBody('E2E-C-9', () => {
  const s = mkStore('c9'); X.s = s;
  // step (1): the app's repeated writes through the store's own verb, so the journal's own compression has
  // something to mark — with the address left NON-EMPTY, which is what the pre-state claim reads.
  for (let i = 0; i < 6; i += 1) sWrite(s, ['a'], 'mem', i + 1);
  X.preState = sRead(s, ['a']);
  // a pair whose FIRST evaluation violates and whose repair writes at the same address; the re-run then
  // violates it AGAIN (its repair is in appliedRepairs) — arm (e), KC-5
  K1(s, ['a'], 'x', (ctx) => (ctx.value > 5
    ? { message: 'too large', repair: () => { const w = sWrite(s, ['a'], 'mem', 100); return { ok: true, op: w.op }; } }
    : { message: 'still too large' }));
  const c = K2(s, ['a'], 'mem', 9);
  X.commit = c;
  X.thrown = null; X.rep = null;
  try { K3(s, c); } catch (e) { X.thrown = e; }
  X.rep = K5(s, c.attempt);
  X.postState = (() => { try { return `value=${J(sRead(s, ['a']))}`; } catch (e) { return `threw ${e.status}`; } })();
  const rep = X.rep, t = X.thrown;
  assertCell('E2E-C-9.1', "the composition is per-op over the attempt's OWN ops and reports exactly the calls it PERFORMED, each step six members, in performed order", 'composition-and-states.md §2.6 item 1; parameter-semantics.md §2.17',
    () => {
      const steps = rep.rollback;
      const six = steps.every((x) => eq(Object.keys(x).slice().sort(), ['answer', 'checkpoint', 'failed', 'opId', 'restoredTo', 'undoneOps']));
      const inOps = steps.every((x) => rep.ops.some((o) => o.opId === x.opId));
      return [six && inOps, `outcome=${rep.outcome} status=${t && t.status} steps=${J(steps.map((x) => x.opId))} ops=${J(rep.ops.map((o) => o.opId))} six=${six}`];
    });
  assertCell('E2E-C-9.2', "the union of the steps' undoneOps is the reach the composition actually had and no wider — and the store's read at ['a'] matches EXACTLY what those members report, never a state past the compacted base: where the performed call's own store report swept this address's earlier writes, the state standing there is the store's own absence", 'parameter-semantics.md §2.17 observable; e2e-scenarios-b.md E2E-C-9 cell 5; composition-and-states.md §2.6 item 4 (the store\'s own reach); contract.md §5.7 (P-TP-7, as re-read under A111)',
    () => {
      const u = [...new Set(rep.rollback.flatMap((x) => x.undoneOps))];
      // the declared reading: the members claim nothing the store did not report, and the store's own read
      // at ['a'] matches what those members report. The earlier writes this window made are members of the
      // performed union, so the absence the store reports IS what the members require; a union NOT covering
      // them would require the pre-state value to stand and this cell would be red.
      const coversPre = u.length > 0;
      const matches = coversPre ? X.postState === 'threw AddressNotFound' : X.postState.includes(String(X.preState));
      const wider = u.filter((id) => !rep.ops.some((o) => o.opId === id));
      const falsifier = "the store's own read at ['a'] matches exactly what those members report";
      return [matches, `union=${J(u)} (${u.length} op(s), ${wider.length} of them outside this attempt's own ops ${J(wider)} — the store's own report of its subtree-wide reach, the lawful reach at composition-and-states.md §2.6 item 4 · contract.md §5.7, RC-14 ANSWERED) ops=${J(rep.ops.map((o) => o.opId))} store read after=${X.postState} (the state this address stood at before the attempt was ${J(X.preState)}): ${falsifier}=${matches}. The pre-state claim is WITHDRAWN BY NAME (A111) and OWED to J-20–J-22: what is asserted here is ONLY that the store's own answer agrees with the members the store itself reported.`];
    });
  assertCell('E2E-C-9.3', 'the SKIP leaves no op called twice and no step for an op the walk never issued a call over — a still-owed op an earlier call\'s own undoneOps already reports undone is NOT called — and where a call DID meet the floor the walk stops there, so no step follows it', 'composition-and-states.md §2.6 item 5 (a) (the SKIP) and item 5 (b) (the floor stops the walk); parameter-semantics.md §2.17',
    () => {
      const performed = rep.rollback.map((x) => x.opId);
      const firstFail = rep.rollback.findIndex((x) => x.failed);
      const stops = firstFail === -1 || firstFail === rep.rollback.length - 1;
      const uncalled = rep.ops.filter((o) => !performed.includes(o.opId));
      const skipped = uncalled.every((o) => rep.rollback.some((x) => x.undoneOps.includes(o.opId)));
      return [new Set(performed).size === performed.length && stops && skipped,
        `calls issued=${J(performed)} distinct=${new Set(performed).size === performed.length} last-element-failing=${stops}; the still-owed op(s) the walk did NOT call=${J(uncalled.map((o) => o.opId))}, each reported undone by an earlier call's own undoneOps=${skipped} — under the settled law (A111 / §2.6 item 5 (a)) this is the SKIP and not a missing call; had a call met the floor, this window would show a LAST step with failed true (it does not: the composition succeeded over every still-owed op it owed)`];
    });
  assertCell('E2E-C-9.4', "each step carries the store's own undoneOps/restoredTo VERBATIM where the call returned, with failed false and answer 'ok'; the failing call's own answer is the store's code", 'parameter-semantics.md §2.17; composition-and-states.md §2.6 item 3',
    () => {
      const ok = rep.rollback.every((x) => (x.failed
        ? typeof x.answer === 'string' && x.answer !== 'ok' && Array.isArray(x.undoneOps) && x.undoneOps.length === 0 && x.restoredTo && typeof x.restoredTo === 'object'
        : x.answer === 'ok' && Array.isArray(x.undoneOps) && x.restoredTo && typeof x.restoredTo === 'object'));
      return [ok, `steps=${J(rep.rollback.map((x) => ({ opId: x.opId, a: x.answer, f: x.failed, undone: x.undoneOps, restoredTo: x.restoredTo })))}`];
    });
  assertCell('E2E-C-9.5', "all steps of one attempt carry IDENTICALLY the attempt's one checkpoint value (one op or null on every step)", 'parameter-semantics.md §2.17; composition-and-states.md §2.6 item 8',
    () => {
      const cps = [...new Set(rep.rollback.map((x) => x.checkpoint))];
      return [cps.length <= 1, `checkpoints=${J(cps.map((v) => v === null ? 'null' : v))}`];
    });
  assertCell('E2E-C-9.6', "this window's attempt passes NO checkpoint: every step's checkpoint member is null and no other member carries a boundary — a LANDING-PINNED checkpoint being `OWED` to the per-landing pass (J-20–J-22), so the `null` is read as the declared state and never as a restored-state claim", 'composition-and-states.md §2.6 item 8 (iv) (A102, D3) and item 8 (iii); contract.md §0.1 item 5 (i) (the OWED seam); parameter-semantics.md §2.17',
    () => {
      const cps = [...new Set(rep.rollback.map((x) => x.checkpoint))];
      const allNull = cps.length === 1 && cps[0] === null;
      return [allNull, `checkpoints=${J(cps.map((v) => v === null ? 'null' : v))} (the first pass violated at its first evaluation and the re-run repeated the violation, so no landing ever left a valid state — and no caller-side landing CAN pin the member at this build, the per-landing pass being OWED to J-20–J-22); steps' own boundary members=${J(rep.rollback.map((x) => ({ opId: x.opId, failed: x.failed, answer: x.answer })))}`];
    });
  N('E2E-C-9.7', "the arm that MEETS the floor: a still-owed op's call whose store verb answers RollbackCompacted, giving failed true, that store code as answer, undoneOps [], and the kernel's own KC-8 on the ONE `outcome` entry", 'fail-surface.md §2 (the KC-8 row, its floor sentence); composition-and-states.md §2.6 item 5 (b) and item 6 (a)',
    `NOT EXERCISABLE IN THIS ROW'S OWN WINDOW, and the reason is the settled composition itself: this window's still-owed ops are BOTH at ['a'] (the write and the repair), so the FIRST call — always issued, and issued over the repair's own op — reports the write's op in its own store-reported undoneOps (${J(rep.rollback[0] && rep.rollback[0].undoneOps)}), and under §2.6 item 5 (a)'s SKIP no second call is issued over it: the composition meets NO floor here (the first run read a second, RollbackCompacted step because it expected a call per op — that reading is WITHDRAWN BY NAME at A111). The floor's own arm IS reachable live, but only in a window shape this row does not declare — two still-owed ops in DIFFERENT subtrees, so the newest call's sweep does not swallow the older op — and it is driven there at this row's own annotation ${'E2E-C-9.7b'} below. THIS CELL IS OPEN (parked), NOT GREEN.`);
  // AN ANNOTATION, not a declared cell: the floor's own arm driven in the one window shape the settled
  // composition leaves open (recorded here because the battery's own cell 7 asks for this arm).
  {
    const sF = mkStore('c9f');
    for (let i = 0; i < 4; i += 1) sWrite(sF, ['a'], 'mem', { n: i });        // an object at ['a'] ...
    sWrite(sF, ['a', 'b'], 'mem', { b: 0 });                                   // ... and a subtree below it
    K1(sF, ['a'], 'x', (ctx) => (ctx.value && ctx.value.n === 99
      ? { message: 'x bad', repair: () => { const w = sWrite(sF, ['a', 'b'], 'mem', { b: 7 }); return { ok: true, op: w.op }; } }
      : true));
    K1(sF, ['a'], 'z', () => ({ message: 'z bad' }));                         // no repair: the re-run halts here
    const cF = K2(sF, ['a'], 'mem', { n: 99 });
    let tF = null; try { K3(sF, cF); } catch (e) { tF = e; }
    const repF = K5(sF, cF.attempt);
    const failing = repF.rollback.filter((x) => x.failed);
    const outcomeEntries = (tF ? tF.log : []).filter((e) => e.kind === 'outcome');
    annotate('E2E-C-9.7b');
    cell('E2E-C-9.7b', 'the floor met by a still-owed op\'s call in a multi-address composition: `status: KC-8`, its ONE `outcome` entry reading `state: KC-8`, the failing step `failed: true` with `undoneOps: []` and the store\'s own code as `answer`, the walk stopping there, and every step `checkpoint: null`',
      'fail-surface.md §2 (KC-8 row: the ONE outcome entry, KC-8 carrying it whatever the pass\'s own arm was); composition-and-states.md §2.6 item 5 (b) and item 6 (a); e2e-scenarios-b.md E2E-C-9 cell 5; contract.md §5.7 (P-TP-7)',
      `window (two still-owed ops in different subtrees — the repair's own write at ['a','b'] and the attempt's write at ['a']): status=${tF && tF.status}; message=${J(tF && tF.message)}; op(s) carried by the outcome entry=${J(outcomeEntries.map((e) => e.opId))}; outcome entries=${outcomeEntries.length} (ONE, reading state=${J(outcomeEntries.map((e) => e.state))}); steps=${J(repF.rollback.map((x) => ({ opId: x.opId, a: x.answer, f: x.failed, undone: x.undoneOps, cp: x.checkpoint })))}; the failing call's own store code=${J(failing.map((x) => x.answer))} with undoneOps ${J(failing.map((x) => x.undoneOps.length))} and its restoredTo the addressed subtree's own state=${J(failing.map((x) => x.restoredTo))}; ops of the attempt=${J(repF.ops.map((o) => [o.opId, o.address]))}. NOTE: the message names the op whose call met the floor and it DOES name the store\'s own code (${J(failing.map((x) => x.answer))}) — read together with the step, not as a second token.`,
      'ANNOTATION');
  }
});

// ================================================================================================
// E2E-C-10 — the same attempt, delivered two ways: parity on every member
// ================================================================================================
row('E2E-C-10', "one window drives the caller's own call, the other the delivery layer, on the same pair and value", "alpha and beta compared member for member");
rowBody('E2E-C-10', () => {
  // alpha: the caller's own call, with a pair that FAILS (no repair)
  const sA = mkStore('c10a');
  K1(sA, ['a'], 'x', (ctx) => (ctx.value > 5 ? { message: 'too large' } : true));
  const cA = K2(sA, ['a'], 'mem', 9);
  X.alpha = null; try { K3(sA, cA); } catch (e) { X.alpha = e; }
  // beta: the delivery layer — a store listener whose body runs its own attempt on the same pair and value.
  // THE BODY IS GATED SO THE STORE'S OWN INVOCATION DOES NOT RE-ENTER ITSELF WITHOUT BOUND: at this build
  // the store's delivery runs the body SYNCHRONOUSLY inside the K-2 that this very body issues, so an
  // ungated body recurses (that re-entrancy is itself the reason the documented `pending` loop cannot be
  // the invoker — see the row's last cell). The gate lets exactly ONE delivery-layer invocation through.
  const sB = mkStore('c10b');
  K1(sB, ['a'], 'x', (ctx) => (ctx.value > 5 ? { message: 'too large' } : true));
  X.beta = null; X.betaRuns = 0; X.loopEntries = []; X.gated = 0;
  const body = () => {
    X.betaRuns += 1;
    if (X.gated > 0) return;                 // the re-entrant invocation the store's own delivery makes
    X.gated += 1;
    try { const c = K2(sB, ['a'], 'mem', 9); X.betaRec = c; K3(sB, c); } catch (e) { X.beta = e && e.status ? e : { status: undefined, message: String(e) }; }
  };
  const h = sListen(sB, ['a']); sB.register(h, body);
  const cB = K2(sB, ['a'], 'mem', 9);
  X.cB = cB;
  const map = new Map([[h, body]]);
  for (const hnd of cB.pending) { X.loopEntries.push(hnd); const f = map.get(hnd); if (f) f(); }
  const a = X.alpha, b = X.beta;
  assertCell('E2E-C-10.1', 'both windows fail on the same arm: the same status token, read off the form each caller caught', 'fail-surface.md §1.1 item 1 (c)',
    () => {
      const ok = a && b && a.status === b.status;
      return [ok, `alpha=${a && a.status} beta=${b && b.status}; the beta body ran ${X.betaRuns}x, of which the gated re-entrant invocations (the STORE's own delivery firing inside the beta body's own K-2) are ${X.betaRuns - 1}; the caller's own loop over pending invoked ${X.loopEntries.length}`];
    });
  const bRep = X.betaRec ? K5(sB, X.betaRec.attempt) : null;
  const aRep = K5(sA, cA.attempt);
  assertCell('E2E-C-10.2', 'outcome equal, and ops of equal LENGTH with equal kind sequences', 'e2e-scenarios-b.md E2E-C-10; kernel-surface.md §2.1 item 3',
    () => [!!bRep && aRep.outcome === bRep.outcome && aRep.ops.length === bRep.ops.length && eq(aRep.ops.map((o) => o.kind), bRep.ops.map((o) => o.kind)),
      `alpha outcome=${aRep.outcome} ops=${J(aRep.ops.map((o) => o.kind))} | beta outcome=${bRep ? bRep.outcome : 'none'} ops=${J(bRep ? bRep.ops.map((o) => o.kind) : null)}`]);
  assertCell('E2E-C-10.3', 'log of equal length with equal kind/id/state sequences', 'e2e-scenarios-b.md E2E-C-10; kernel-surface.md §2.5 item 1',
    () => [bRep && eq(cids(aRep.log), cids(bRep.log)), `alpha=[${cids(aRep.log)}] beta=[${bRep ? cids(bRep.log) : ''}]`]);
  assertCell('E2E-C-10.4', 'rollback of equal length, each step six members with equal answer/failed readings in performed order', 'parameter-semantics.md §2.17; e2e-scenarios-b.md E2E-C-10',
    () => [bRep && eq(bRep.rollback.map((x) => [x.answer, x.failed]), aRep.rollback.map((x) => [x.answer, x.failed])),
      `alpha steps=${J(aRep.rollback.map((x) => [x.answer, x.failed]))} beta steps=${J(bRep && bRep.rollback.map((x) => [x.answer, x.failed]))}`]);
  assertCell('E2E-C-10.5', "the instrument each window read is NAMED: both are the kernel's own five-member record read through K-5, not a store structure", 'kernel-surface.md §2.1 item 5; fail-surface.md §1.2 item 4',
    () => [bRep && eq(Object.keys(aRep).slice().sort(), ['attempt', 'log', 'ops', 'outcome', 'rollback']) && eq(Object.keys(bRep).slice().sort(), ['attempt', 'log', 'ops', 'outcome', 'rollback']),
      `alpha instrument keys=${Object.keys(aRep).sort().join(',')} beta instrument keys=${bRep ? Object.keys(bRep).sort().join(',') : ''}`]);
  assertCell('E2E-C-10.6', "message strings are EXCLUDED from the equality and both windows' own are non-empty kernel sentences naming their trigger", 'e2e-scenarios-b.md E2E-C-10 cell 5; fail-surface.md §1.1 item 2 (i)',
    () => [typeof a.message === 'string' && a.message.length > 0 && typeof b.message === 'string' && b.message.length > 0,
      `alpha msg=${J(a.message)} beta msg=${J(b.message)}`]);
  // the beta window's delivery route, driven in the shape the settled law leaves open for layer (b): a
  // write landing BELOW the registered address, whose pass evaluates none of that registration's pairs.
  X.dw10 = (() => {
    const s = mkStore('c10d');
    sWrite(s, ['a'], 'mem', { o: 1 });
    const h = sListen(s, ['a']);
    const r = { runs: 0, gate: 0, loopN: 0, pendingHas: null, pending: 0, triggered: 0 };
    const b = (addr) => { r.runs += 1; if (r.gate > 0) return; r.gate += 1; };
    s.register(h, b);
    const c = K2(s, ['a', 'c'], 'mem', 9);
    r.triggered = c.triggered.length; r.pending = c.pending.length; r.pendingHas = c.pending.includes(h);
    r.runsAtK2 = r.runs;
    const map = new Map([[h, b]]);
    for (const hnd of c.pending) { r.loopN += 1; const f = map.get(hnd); if (f) f(['a', 'c']); }
    r.runsAfterLoop = r.runs;
    return r;
  })();
  assertCell('E2E-C-10.7', "the delivery of the app's own body is THE CALLER'S OWN LOOP over `pending` AND BY NO OTHER INVOKER — measured in the one window shape the split's predicate leaves open (a write below the registered address, whose pass evaluates none of that registration's pairs) — and the two windows' answers are one token", "kernel-surface.md §2.1 item 2 (the loop is layer (b)'s only invoker) read with §2.2 item 2's predicate; A: docs/decisions.md A108 D1/D2",
    () => {
      const d = X.dw10;
      const loopOnly = d.pendingHas === true && d.loopN > 0 && d.runsAfterLoop === d.loopN && d.runsAtK2 === 0;
      return [loopOnly,
        `the settled-shape window: triggered=${d.triggered}, pending=${d.pending} (the listener's handle in pending=${d.pendingHas}), the caller's own loop invoked ${d.loopN} handle(s) and the body ran ${d.runsAtK2}x by K-2's return against ${d.runsAfterLoop} after the loop — the loop is the only invoker=${loopOnly}. THE BETA WINDOW ITSELF (the same-address shape) delivers its body by the STORE's own act: ${X.betaRuns} invocation(s) of which ${X.betaRuns - 1} re-entrant inside the beta body's own K-2 — a re-entrancy no caller-side loop has, and exactly the "the store invokes nothing" reading §2.2 item 2 states — while its own pending holds ${X.cB.pending.length} of ${X.cB.triggered.length} triggered handle(s). THE STATUS TOKENS DO AGREE on the same arm: alpha=${a.status} beta=${b.status}, and the members of cells 2–6 above are equal.`];
    });
});

// ================================================================================================
// E2E-C-11 — the marker is per-attempt: a second attempt runs the same repair again
// ================================================================================================
row('E2E-C-11', 'two separate commits at one address, each over a pair whose repair runs', 'both attempts resolve passed, each with its own repair-run entry');
rowBody('E2E-C-11', () => {
  const s = mkStore('c11'); X.s = s;
  K1(s, ['a'], 'A', (ctx) => (ctx.value > 1 ? { message: 'too large', repair: () => { const w = sWrite(s, ['a'], 'mem', 1); return { ok: true, op: w.op }; } } : true));
  const c1 = K2(s, ['a'], 'mem', 9); const r1 = K3(s, c1);
  const c2 = K2(s, ['a'], 'mem', 9); const r2 = K3(s, c2);
  X.r1 = r1; X.r2 = r2; X.c1 = c1; X.c2 = c2;
  X.k4a = K4(s, c1.attempt); X.k4b = K4(s, c2.attempt);
  assertCell('E2E-C-11.1', "the FIRST attempt resolves passed with its own repair-run entry", 'attempt-lifecycle.md §2.4 item 4 arm (g)',
    () => [r1.outcome === 'passed' && r1.log.filter((e) => e.kind === 'repair-run').length === 1, `attempt1=${r1.outcome} repair-runs=${r1.log.filter((e) => e.kind === 'repair-run').length}`]);
  assertCell('E2E-C-11.2', 'the SECOND, separate attempt at the same address runs the SAME repair AGAIN — its marker started empty, so its own repair-run entry exists', 'parameter-semantics.md §2.9 observable; contract.md §5.8 (P-TP-8)',
    () => [r2.outcome === 'passed' && r2.log.filter((e) => e.kind === 'repair-run').length === 1, `attempt2=${r2.outcome} repair-runs=${r2.log.filter((e) => e.kind === 'repair-run').length}`]);
  assertCell('E2E-C-11.3', "the marker did not survive attempt 1: attempt 2's ops carry its own repair op, distinct from attempt 1's", 'kernel-surface.md §2.5 item 2 (lifetime)',
    () => [r1.ops[1] && r2.ops[1] && r1.ops[1].opId !== r2.ops[1].opId, `attempt1 op2=${r1.ops[1] && r1.ops[1].opId} attempt2 op2=${r2.ops[1] && r2.ops[1].opId}`]);
  assertCell('E2E-C-11.4', 'NO closed record carries the marker: the closed AttemptReport has exactly five members and no appliedRepairs member', 'kernel-surface.md §2.1 item 3; kernel-surface.md §2.5 item 2',
    () => {
      const keys = Object.keys(r1).sort().join(',');
      return [keys === 'attempt,log,ops,outcome,rollback', `keys=${keys}`];
    });
  assertCell('E2E-C-11.5', 'nor does any closed record carry ran/open/checkpoint/ref/commit: the open shape\'s nine members are read off an OPEN attempt only', 'attempt-lifecycle.md §2.4 item 1',
    () => {
      const keys = Object.keys(r2);
      return [keys.every((k) => !['ran', 'open', 'checkpoint', 'ref', 'commit', 'appliedRepairs'].includes(k)), `keys=${keys.sort().join(',')}`];
    });
  assertCell('E2E-C-11.6', "the two attempts' logs are each their own list: the seq ordinals restart at 1 and the witnesses name different opIds", 'kernel-surface.md §2.5 item 1 (append-only within one attempt)',
    () => [r1.log[0].seq === 1 && r2.log[0].seq === 1 && r1.log[1].opId !== r2.log[1].opId,
      `attempt1=[${cids(r1.log)}] attempt2=[${cids(r2.log)}] distinct repair opIds=${r1.log[1].opId !== r2.log[1].opId}`]);
  assertCell('E2E-C-11.7', "K-4 over each closed attempt returns that attempt's own log — two distinct lists, each equal to its own report's", 'kernel-surface.md §2.1 item 4',
    () => [eq(X.k4a, r1.log) && eq(X.k4b, r2.log) && X.k4a !== X.k4b, `both closed logs read back by K-4; distinct=${X.k4a !== X.k4b}`]);
});

// ================================================================================================
// E2E-C-12 — refusals at K-1: the kernel's own channel, and a registry that does not move
// ================================================================================================
row('E2E-C-12', 'a caller calls K-1 with an out-of-domain address, an empty id and a non-function', "three refusals, all the kernel's own tokens, registry unmoved");
rowBody('E2E-C-12', () => {
  const s = mkStore('c12'); X.s = s;
  const grab = (fn) => { try { fn(); return null; } catch (e) { return e; } };
  X.e1 = grab(() => K1(s, 'not-an-address', 'x', () => true));
  X.e2 = grab(() => K1(s, ['a'], '', () => true));
  X.e3 = grab(() => K1(s, ['a'], 'x', 'not-a-function'));
  X.lawful = K1(s, ['a'], 'lawful', () => true);
  const c = K2(s, ['a'], 'mem', 1); X.rep = K3(s, c);
  X.again = K1(s, ['a'], 'lawful', () => true);
  assertCell('E2E-C-12.1', "the kernel refuses an address shape outside its domain BEFORE the store's listen is called: KC-1, in the kernel's own form, with an empty log", 'kernel-surface.md §2.1 item 1 channel (i); fail-surface.md §1.1 item 1',
    () => [X.e1 && X.e1.status === 'KC-1' && eq(Object.keys(X.e1).slice().sort(), ['log', 'message', 'status']) && X.e1.log.length === 0, `status=${X.e1 && X.e1.status} keys=${X.e1 ? Object.keys(X.e1).join(',') : ''} log.len=${X.e1 && X.e1.log.length}`]);
  assertCell('E2E-C-12.2', "an id that is not a non-empty string is KC-2 (the kernel's own channel)", 'kernel-surface.md §2.1 item 1 channel (i); parameter-semantics.md §2.2',
    () => [X.e2 && X.e2.status === 'KC-2', `status=${X.e2 && X.e2.status}`]);
  assertCell('E2E-C-12.3', 'a constraint that is not a function is KC-2', 'kernel-surface.md §2.1 item 1 channel (i)',
    () => [X.e3 && X.e3.status === 'KC-2', `status=${X.e3 && X.e3.status}`]);
  assertCell('E2E-C-12.4', "NO store member appears as a refused registration's status: all three are the kernel's own closed tokens", 'fail-surface.md §1.2 item 1 (i); contract.md §5.3 (P-IM-3)',
    () => {
      const st = [X.e1.status, X.e2.status, X.e3.status];
      return [st.every((x) => /^KC-[1-8]$/.test(x)), `statuses=${st.join(',')}`];
    });
  assertCell('E2E-C-12.5', 'a refused registration leaves the registry exactly as it stood: the lawful registration after the three refusals stands and the pass evaluates ONE pair', 'kernel-surface.md §2.1 item 1 (no entry added on either channel)',
    () => [X.lawful !== null && X.lawful !== undefined && X.rep.log.filter((e) => e.kind === 'constraint-check').length === 1, `lawful K-1 ok=${X.lawful !== null && X.lawful !== undefined}`]);
  assertCell('E2E-C-12.6', "nothing was added by the refusals: the pass's constraint-check entries name the ONE lawfully registered pair", 'e2e-scenarios-b.md E2E-C-12; kernel-surface.md §2.5 item 1',
    () => {
      const idsSeen = X.rep.log.filter((e) => e.kind === 'constraint-check').map((e) => e.id);
      return [eq(idsSeen, ['lawful']), `entry ids=[${idsSeen.join(',')}]`];
    });
  assertCell('E2E-C-12.7', "the store's own machinery was not reached by a refused call: a fourth K-1 at the lawful pair still returns the adopted handle", 'kernel-surface.md §2.1 item 1 (listen throws ⇒ it created nothing)',
    () => [X.again !== null && X.again !== undefined, `a further K-1 at the lawful pair returned the adopted handle=${X.again !== null && X.again !== undefined}`]);
});

// ================================================================================================
// E2E-C-13 — two store codes at the caller's own verb calls, and the asymmetry
// ================================================================================================
row('E2E-C-13', "a caller commits an out-of-domain tier, and a repair whose own write lands under a leaf", "the store's own codes at the verb calls; KC-4 from the kernel");
rowBody('E2E-C-13', () => {
  const s = mkStore('c13'); X.s = s;
  const grab = (fn) => { try { fn(); return null; } catch (e) { return e; } };
  K1(s, ['a'], 'x', () => true);
  X.t1 = grab(() => K2(s, ['a'], 'not-a-tier', 1));
  X.t2 = grab(() => K2(s, ['a'], 'not-a-tier', 2));
  // the repair's own write under a leaf
  const s2 = mkStore('c13b');
  X.bodyThrown = null; X.repairCalls = 0; X.repairRunEntry = null; X.thrown = null;
  K1(s2, ['a'], 'x', (ctx) => (ctx.value > 10
    ? { message: 'too large', repair: () => {
      X.repairCalls += 1;
      try { sWrite(s2, ['a', 'b'], 'mem', 1); return { ok: true }; }
      catch (e) { X.bodyThrown = e; throw e; }
    } }
    : true));
  const c = K2(s2, ['a'], 'mem', 99);
  try { K3(s2, c); } catch (e) { X.thrown = e; }
  const rep = K5(s2, c.attempt);
  X.rep = rep;
  assertCell('E2E-C-13.1', "a tier the store refuses throws the STORE's own code OutOfDomainTier at the verb call, in the store's own two-member form (no log member)", 'kernel-surface.md §2.1 item 2 (the tier refusal); fail-surface.md §3 item 2; fail-surface.md §1.2 item 2',
    () => [X.t1 && X.t1.status === 'OutOfDomainTier' && eq(Object.keys(X.t1).slice().sort(), ['message', 'status']), `status=${X.t1 && X.t1.status} keys=${X.t1 ? Object.keys(X.t1).join(',') : ''}`]);
  assertCell('E2E-C-13.2', 'it opens NO attempt: a second refused commit at the same address is refused the same way and never KC-7', 'kernel-surface.md §2.1 item 2 (the tier refusal); parameter-semantics.md §2.11 (ii)',
    () => [X.t2 && X.t2.status === 'OutOfDomainTier', `second refusal = ${X.t2 && X.t2.status}`]);
  assertCell('E2E-C-13.3', "the repair's own write at an address whose ancestor is a leaf is refused by the store with the store's own code", 'fail-surface.md §3 item 2 (the write path\'s own codes); parameter-semantics.md §2.7',
    () => [X.bodyThrown && X.bodyThrown.status === 'WriteParentNotLink' && typeof X.bodyThrown.message === 'string',
      `repair write status=${X.bodyThrown && X.bodyThrown.status} keys=${X.bodyThrown ? Object.keys(X.bodyThrown).join(',') : ''} message=${J(X.bodyThrown && X.bodyThrown.message)}`]);
  assertCell('E2E-C-13.4', "the repair body THREW, so the caller holds the BODY'S OWN THROWABLE unchanged — the SAME object the body threw (identity), with no `log` member added and the store's code still the only `status` on it", 'parameter-semantics.md §2.16 (a throwing repair body); attempt-lifecycle.md §2.4 item 8 (i); fail-surface.md §1.2 item 1 (no conversion)',
    () => [X.thrown === X.bodyThrown && !('log' in X.thrown) && X.thrown.status === 'WriteParentNotLink',
      `identity=${X.thrown === X.bodyThrown} status=${X.thrown && X.thrown.status} keys=${X.thrown ? Object.keys(X.thrown).join(',') : ''}`]);
  assertCell('E2E-C-13.5', "the attempt is closed as failed and its own outcome entry carries KC-4's token", 'fail-surface.md §1.1 item 3; composition-and-states.md §2.7 item 13; fail-surface.md §2\'s KC-4 row',
    () => {
      const o = rep.log.find((e) => e.kind === 'outcome');
      return [rep.outcome === 'failed' && o && o.state === 'KC-4', `report outcome=${rep.outcome} report log=[${cids(rep.log)}]`];
    });
  assertCell('E2E-C-13.6', "the store's code is NAMED inside the repair-run entry's message as the store's own answer, and the entry's state stays null", 'kernel-surface.md §2.5 item 1 (the message table); fail-surface.md §1.2 item 3 (the asymmetry\'s own carrier clause)',
    () => {
      const rr = rep.log.find((e) => e.kind === 'repair-run');
      X.repairRunEntry = rr;
      return [typeof rr.message === 'string' && rr.message.includes('WriteParentNotLink') && rr.state === null,
        `repair-run=${J(rr)} — the store's own token is named in the entry's own message=${typeof rr.message === 'string' && rr.message.includes('WriteParentNotLink')}`];
    });
  assertCell('E2E-C-13.7', 'the two channels are not converted into one another: the store code reached the repair body UNCHANGED at the verb call, no store code is ever a kernel state, and the kernel answers the caller on its own channel', 'fail-surface.md §1.2 item 1 (no conversion), items 2 and 4',
    () => [X.bodyThrown.status === 'WriteParentNotLink' && /^KC-[1-8]$/.test(X.rep.log.find((e) => e.kind === 'outcome').state) && X.repairCalls === 1,
      `store code at K-2=${X.t1.status}; store code at the repair's own call=${X.bodyThrown.status} (the body held the store's own object unchanged=true); kernel state=${X.rep.log.find((e) => e.kind === 'outcome').state}; repair calls=${X.repairCalls}`]);
});

// ================================================================================================
// E2E-C-14 — an unknown attempt reference, and the refusal that is not KC-7
// ================================================================================================
row('E2E-C-14', 'a caller reads K-4/K-5 over a closed, an unknown and three outside references', 'KC-2 from the readers, never KC-7');
rowBody('E2E-C-14', () => {
  const s = mkStore('c14'); X.s = s;
  K1(s, ['a'], 'x', () => true);
  const c = K2(s, ['a'], 'mem', 1); const rep = K3(s, c);
  const grab = (fn) => { try { fn(); return null; } catch (e) { return e; } };
  X.k5closed = K5(s, c.attempt); X.k4closed = K4(s, c.attempt);
  X.k4bare = K4(s, c.attempt.id); X.k5bare = K5(s, c.attempt.id);
  X.unknownK4 = grab(() => K4(s, 'attempt-does-not-exist'));
  X.unknownK5 = grab(() => K5(s, 'attempt-does-not-exist'));
  X.outside = [grab(() => K5(s, null)), grab(() => K5(s, undefined)), grab(() => K5(s, { id: '' }))];
  X.staleK3 = grab(() => K3(s, c));
  X.k4after = K4(s, c.attempt);
  X.rep = rep; X.c = c;
  assertCell('E2E-C-14.1', 'K-5 over a CLOSED attempt returns the final report, and K-4 its final log', 'kernel-surface.md §2.1 items 4-5',
    () => [X.k5closed.outcome === 'passed' && eq(X.k4closed, rep.log), `report=${X.k5closed.outcome} log=${X.k4closed.length}`]);
  assertCell('E2E-C-14.2', 'K-4 and K-5 accept the bare id string as the SAME argument (the AttemptRef or its id, nothing else)', 'parameter-semantics.md §2.15 domain',
    () => [eq(X.k4bare, X.k4closed) && eq(X.k5bare, X.k5closed), `bare-id reads compared member for member: K-4 equal=${eq(X.k4bare, X.k4closed)} K-5 equal=${eq(X.k5bare, X.k5closed)}`]);
  assertCell('E2E-C-14.3', 'an id the kernel holds no attempt for is KC-2 from BOTH readers', 'parameter-semantics.md §2.15 outside values; kernel-surface.md §2.1 items 4-5',
    () => [X.unknownK4 && X.unknownK4.status === 'KC-2' && X.unknownK5 && X.unknownK5.status === 'KC-2', `K-4=${X.unknownK4 && X.unknownK4.status} K-5=${X.unknownK5 && X.unknownK5.status}`]);
  assertCell('E2E-C-14.4', 'null, undefined and an empty-id AttemptRef are each KC-2 (the closed outside-value set)', 'parameter-semantics.md §2.15 outside values',
    () => [X.outside.every((e) => e && e.status === 'KC-2'), `three outside values over K-5: ${X.outside.map((e) => e && e.status).join(',')}`]);
  assertCell('E2E-C-14.5', 'K-3 over the SAME stale record (its attempt already disposed of) is KC-2 and NOT KC-7', 'kernel-surface.md §2.1 item 3 (RD-9); parameter-semantics.md §2.15 observable',
    () => [X.staleK3 && X.staleK3.status === 'KC-2', `K-3 again = ${X.staleK3 && X.staleK3.status}`]);
  assertCell('E2E-C-14.6', 'no state moved and no entry was appended: the closed record and its log are untouched by the refusals', 'kernel-surface.md §2.1 item 3 (no entry appended)',
    () => [eq(X.k4after, rep.log), `log after the refusals compared member for member: equal=${eq(X.k4after, rep.log)}`]);
  assertCell('E2E-C-14.7', 'the reference K-3 minted is the same one K-5 accepts — the commit\'s member, the report\'s and the record\'s are one reference', 'kernel-surface.md §2.1 items 2-5',
    () => [X.c.attempt === rep.attempt && X.k5closed.attempt === rep.attempt, `refs=${X.c.attempt.id}/${rep.attempt.id}/${X.k5closed.attempt.id}`]);
});

// ================================================================================================
// E2E-C-15 — a nested processing: the second top-level attempt at a DESCENDANT address
// ================================================================================================
row('E2E-C-15', "an outer processing at ['a'] and an inner one at ['a','b'], the latter opened and driven FIRST through the same store", 'the inner attempt fails on its own address; the outer then fails on its own');
rowBody('E2E-C-15', () => {
  const s = mkStore('c15'); X.s = s;
  // the docs' declared drive order: the descendant acts FIRST (a structured seed at ['a'] so a child may stand)
  sWrite(s, ['a'], 'mem', { seed: true });
  K1(s, ['a'], 'a1', () => true);
  K1(s, ['a', 'b'], 'b1', () => true);
  K1(s, ['a', 'b'], 'b2', (ctx) => (ctx.value > 1 ? { message: 'b is bad' } : true));
  const innerC = K2(s, ['a', 'b'], 'mem', 2);
  X.innerRec = innerC;
  X.innerThrown = null; try { K3(s, innerC); } catch (e) { X.innerThrown = e; }
  X.innerRep = K5(s, innerC.attempt);
  const outerC = K2(s, ['a'], 'mem', 5);
  X.outerRec = outerC;
  X.outerThrown = null; try { K3(s, outerC); } catch (e) { X.outerThrown = e; }
  X.outerRep = K5(s, outerC.attempt);
  X.outerBodyWrite = null;
  assertCell('E2E-C-15.1', 'the nested K-2 at a descendant address is NOT refused: the record is returned (KC-7 refuses only at the ONE address of the live attempt)', 'attempt-lifecycle.md §2.4 item 8 (ii); contract.md §0.1 item 5 (v) RC-18',
    () => [innerC && innerC.attempt && innerC.op, `inner attempt=${innerC.attempt.id} inner commit=returned op=${innerC.op.opId}`]);
  assertCell('E2E-C-15.2', "the inner attempt fails on its OWN address's pair and its failure is composed per-op over its OWN ops", 'composition-and-states.md §2.6 item 1',
    () => [X.innerThrown && X.innerThrown.status === 'KC-3' && X.innerRep.rollback.every((x) => X.innerRep.ops.some((o) => o.opId === x.opId)),
      `inner=${X.innerThrown && X.innerThrown.status} steps=${X.innerRep.rollback.length} inner ops=${J(X.innerRep.ops.map((o) => o.opId))}`]);
  assertCell('E2E-C-15.3', "the inner composition's performed set is its own — no step of it names the OUTER attempt's first write", 'composition-and-states.md §2.6 item 1',
    () => {
      const u = [...new Set(X.innerRep.rollback.flatMap((x) => x.undoneOps))];
      return [u.every((id) => X.innerRep.ops.some((o) => o.opId === id)), `inner undone union=${J(u)} inner ops=${J(X.innerRep.ops.map((o) => o.opId))} outer write=${X.outerRec.op.opId}`];
    });
  N('E2E-C-15.4', "the inner walk stops AT an op the inner attempt's own address was last left valid at (A104: the store's last valid state, whoseever landing established it)", 'composition-and-states.md §2.6 item 8 (i) and (iii) (A104); contract.md §0.1 item 5 (i) (the OWED seam); parameter-semantics.md §2.17',
    `NOT EXERCISABLE IN THIS WINDOW, and the reason is the settled law's own OWED seam: a member naming an OP is pinned only where a landing is recorded as one that left the address valid, and THAT record is the per-landing (atomic) constraint pass — which is OWED to the store side at J-20–J-22 (contract.md §0.1 item 5 (i); kernel-surface.md §2.3 item 1). This run reads ${J([...new Set(X.innerRep.rollback.map((x) => x.checkpoint))].map((v) => (v === null ? 'null' : v)))} on the inner composition's every step, and NO caller-side window of this battery carries a non-null member — the kernel runs no pass at a landing anywhere (this row's sibling E2E-C-3 reads null on its own passing-repair step, and E2E-C-2/E2E-C-9 read null too), so the member's non-null arm, INCLUDING the case where another processing's landing established the state, is OPEN (parked) and NOT GREEN. THE GREENS SET ATTRIBUTED THE null TO A MISSING SEAM AND READ A SIBLING WINDOW AS PINNING THE MEMBER ITSELF — that sibling reading is null at this build and the attribution is corrected here: the seam is the OWED one, and its non-null arm is what stands parked.`);
  assertCell('E2E-C-15.5', 'no step passed the checkpoint op to the store verb (a walk rolling back its own stop op would sweep the last valid state)', 'composition-and-states.md §2.6 item 4; parameter-semantics.md §2.17 outside values',
    () => {
      const cps = [...new Set(X.innerRep.rollback.map((x) => x.checkpoint))];
      const ok = cps.every((v) => v === null || !X.innerRep.rollback.some((x) => x.opId === v));
      return [ok, `performed opIds=${J(X.innerRep.rollback.map((x) => x.opId))} checkpoint=${J(cps.map((v) => (v === null ? 'null' : v)))} — vacuously true at this build (every member is null), so this cell reads the rule and claims no non-null stop op`];
    });
  assertCell('E2E-C-15.6', 'the inner pass never evaluated the ancestor pair: no entry of the inner attempt\'s log carries the ancestor id', 'attempt-lifecycle.md §2.4 item 5 (iv)',
    () => {
      const idsSeen = X.innerRep.log.map((e) => e.id);
      return [!idsSeen.includes('a1'), `inner log ids=${J(idsSeen)}`];
    });
  assertCell('E2E-C-15.7', "the OUTER attempt reached its own terminal act and its record carries the outer body's own write — each commit this drive opened has its own resolution, and the inner attempt's failure did not resolve the outer one", 'composition-and-states.md §2.7 (the valid states)',
    () => {
      const own = X.outerRep.ops.some((o) => o.opId === X.outerRec.op.opId);
      return [own && X.outerRep.attempt === X.outerRec.attempt,
        `outer attempt resolved ${X.outerRep.outcome} (not the inner attempt's ${X.innerThrown && X.innerThrown.status}): the outer record carries its own write ${X.outerRec.op.opId}=${own} and its own reference; its rollback is ${J(X.outerRep.rollback)}. NOTE: this window's outer pair passes on every value, so there is no outer terminal FAILURE to read here, and the docs' own outer failure depends on a listener body's re-entrant verb call the delivery layer cannot hand a caller (see E2E-C-16.4).`];
    });
  N('E2E-C-15.8', "the checkpoint's own home: the member is the opId of the LAST LANDING THAT LEFT EVERY REGISTERED PAIR AT THE ATTEMPT'S ADDRESS PASSING, and a landing that failed its own pass leaves the member UNMOVED", 'composition-and-states.md §2.6 item 8 (i) and (iii); contract.md §0.1 item 5 (i); parameter-semantics.md §2.17',
    `NOT EXERCISABLE on the readings this window can produce: the inner composition reads ${J([...new Set(X.innerRep.rollback.map((x) => x.checkpoint))].map((v) => (v === null ? 'null' : v)))} and the outer's rollback is ${J(X.outerRep.rollback)} (a passing attempt carries no step, so the member has no carrier there). The member's non-null arm is OWED to the per-landing pass at J-20–J-22 and is OPEN — NO caller-side window of this battery carries it (every step of every failing attempt in this run reads null), so neither the "last landing" clause nor the "unmoved" clause is exercised here.`);
});

// ================================================================================================
// E2E-C-16 — the delivery layer, and the caller's own loop as its one invoker
// ================================================================================================
row('E2E-C-16', "a caller registers a plain store listener, commits there, and its own loop reads pending", 'the record\'s `pending` carries the listener\'s handle in the descendant-shaped window and is empty in the same-address one; the loop is layer (b)\'s only invoker');
rowBody('E2E-C-16', () => {
  const s = mkStore('c16'); X.s = s;
  X.plainRuns = 0; X.loopInvoked = 0; X.plainArgs = [];
  K1(s, ['a'], 'cA', (ctx) => (ctx.value > 5 ? { message: 'a is bad' } : true));
  const handle = sListen(s, ['a']);
  const body = (a) => { X.plainRuns += 1; X.plainArgs.push(a); };
  s.register(handle, body);
  const c = K2(s, ['a'], 'mem', 9);
  X.c = c;
  X.atK2 = X.plainRuns;
  X.atK2Args = [...X.plainArgs];
  const map = new Map([[handle, body]]);
  for (const hnd of c.pending) { X.loopInvoked += 1; const f = map.get(hnd); if (f) f(['a']); }
  X.thrown = null; try { K3(s, c); } catch (e) { X.thrown = e; }
  X.atK3 = X.plainRuns;
  // the act the AMENDED docs name as the one that leaves a handle standing in `pending`: the caller's own
  // `store.write` under a registration (kernel-surface.md §2.1 item 2, its dated clause at this build)
  X.probe = (() => {
    const sX = mkStore('c16b');
    let runs = 0; const seen = [];
    const hOn = sX.on(['a'], (a) => { runs += 1; seen.push(a); });
    const hL = sListen(sX, ['a']);
    const w = sWrite(sX, ['a'], 'mem', 1);
    return { runs, seen, triggered: w.triggered.length, keys: Object.keys(w), hOnInTriggered: w.triggered.includes(hOn), hLInTriggered: w.triggered.includes(hL) };
  })();
  assertCell('E2E-C-16.1', "the kernel's own record carries `pending` as the subset of `triggered` the kernel's own act leaves standing for the caller's loop: where the write's pass DID evaluate this registration's pair — the write landing at the registered address — `pending` is the EMPTY subset and the handle stands only in `triggered`", 'kernel-surface.md §2.1 item 2 (the member and its carrier clause); kernel-surface.md §2.2 item 2 (the split\'s predicate: a kernel-made write\'s handle whose pair the pass ran is layer (a)\'s and does not stand for the loop)',
    () => [X.c.pending.length === 0 && X.loopInvoked === 0 && X.c.triggered.length >= 1,
      `pending.length=${X.c.pending.length} of triggered.length=${X.c.triggered.length}; the caller's own loop over pending invoked ${X.loopInvoked} handle(s); the body ran ${X.atK2}x by K-2's return with the STORE's own argument ${J(X.atK2Args)} — the write landed AT the registered address, so the pass evaluated that pair and nothing of it stands in the member the loop walks. THE BODY'S RUNS ARE NOT THE LOOP'S: the invocation came from the STORE's own delivery inside the kernel's write (§2.2 item 2 states the store invokes nothing — see this row's cell 3 and 4, and E2E-C-10.1). The member IS non-empty in the descendant-shaped window (this row's cell 8, E2E-C-10.7).`]);
  // THE DESCENDANT-SHAPED WINDOW: the one shape the split's predicate leaves for layer (b) at this build —
  // the kernel's own write landing BELOW the registered address, so its pass evaluates none of that
  // registration's pairs and the handle stands in `pending` at K-2's return.
  X.dw16 = (() => {
    const sD = mkStore('c16d');
    sWrite(sD, ['a'], 'mem', { o: 1 });
    K1(sD, ['a'], 'cA', (ctx) => (ctx.value > 5 ? { message: 'a is bad' } : true));
    const h = sListen(sD, ['a']);
    const r = { runs: 0, gate: 0, loopInvoked: 0, loopArgs: [], runsAtK2: 0, pending: 0, triggered: 0, pendingHas: false, nested: null };
    const b = (addr) => { r.runs += 1; if (r.gate > 0) return; r.gate += 1; };
    sD.register(h, b);
    const cD = K2(sD, ['a', 'c'], 'mem', 3);
    r.pending = cD.pending.length; r.triggered = cD.triggered.length; r.pendingHas = cD.pending.includes(h);
    r.runsAtK2 = r.runs;
    const map = new Map([[h, b]]);
    for (const hnd of cD.pending) { r.loopInvoked += 1; r.loopArgs.push(['a', 'c']); const f = map.get(hnd); if (f) f(['a', 'c']); }
    return r;
  })();
  assertCell('E2E-C-16.2', 'the two members differ in EXTENT and not in order: `triggered` carries every handle the write returned, `pending` the subset the kernel has not already invoked', 'kernel-surface.md §2.1 item 2',
    () => [Array.isArray(X.c.triggered) && Array.isArray(X.c.pending) && X.c.pending.length <= X.c.triggered.length, `triggered=${X.c.triggered.length} pending=${X.c.pending.length}`]);
  assertCell('E2E-C-16.3', "the listener body ran from the CALLER'S OWN LOOP and was handed THE TRIGGERING ADDRESS — the operation's own address, never the watch address", 'kernel-surface.md §2.1 item 2 (ii); storeroom-native/write-and-read.md §6.5 item 3',
    () => {
      const d = X.dw16;
      const separated = d.loopArgs.length > 0 && eq(d.loopArgs[d.loopArgs.length - 1], ['a', 'c']);
      return [d.loopInvoked > 0 && separated && d.runsAtK2 === 0,
        `the descendant-shaped window (the kernel's own write at ['a','c'] below the registered ['a']): the caller's own loop invoked ${d.loopInvoked} entr(ies) off pending (pending.length=${d.pending}, the listener's handle in pending=${d.pendingHas}) and the argument handed to the body was ${J(d.loopArgs)} — THE OPERATION'S OWN ADDRESS ['a','c'], not the watch address ['a']=${separated}; the body ran ${d.runsAtK2}x by K-2's return. In THIS row's same-address window the loop invokes nothing and the body did not run at all (runs=${X.atK2}), because the write's pass evaluated that pair. ${d.runsAtK2 > 0 ? `CONTRADICTION: ${d.runsAtK2} invocation(s) preceded the loop — the STORE's own delivery ran the registered body inside the kernel's own write.` : ''}`];
    });
  X.c164 = `NOT EXERCISABLE, and STRUCTURALLY so, on three independent grounds each recorded here: ` +
      `(i) the docs' step (1b) reads the caller's own store.write AT LAYER (b) — 'its handle comes from rA's own write at that address' (e2e-scenarios-b.md E2E-C-16 step (2)) — and this build's store returns {op, watched, triggered} for a caller's own verb call, carrying NO \`pending\` member and NO CommitRecord (measured: keys=${J(Object.keys(X.probe.keys))}); the kernel declares no reader over that verb and §2.2 item 2 forbids it reaching in, so no record of a caller-made write exists from which the loop could read a handle; ` +
      `(ii) the same body is delivered by the STORE's own act instead: the caller's own write at ['a'] under a registration ran the body ${X.probe.runs}x with the STORE's own argument ${J(X.probe.seen)} (the store invokes what §2.2 item 2 says it never invokes) and a kernel-made write below a registered address ran it ${X.dw16.runsAtK2}x INSIDE K-2, so the nested verb call of the docs' step (2) lands inside a LIVE attempt and §2.1 item 2's hold refuses any second K-2 there KC-7 (measured in this run's E2E-C-8 window: the body's nested K-2 = ${J((X.dw && X.dw.nested) || null)}) — there is no instant at which the documented nested call is lawful; and ` +
      `(iii) where the caller's own loop DOES invoke the body (the descendant-shaped window, cell 8), its own attempt is opened at ['a','c'], an address whose registrations no pass of that write evaluated, so the members the docs' step (2) reads back (a nested CommitRecord crossing back through \`pending\`) exist nowhere on this surface. ` +
      `The K-1 registration's own handle stands in triggered (${X.probe.hOnInTriggered || X.probe.hLInTriggered}) and is run by the store. ${runNote(s, X)}`;
  N('E2E-C-16.4', "the listener body opened the SECOND top-level attempt at the other address (a nested processing takes its OWN registry entry, so no KC-7) and its CommitRecord crossed back", 'attempt-lifecycle.md §2.4 item 8 (ii); contract.md §5.7 (A106 Q4)', X.c164);
  assertCell('E2E-C-16.5', "the K-1 pair's own pass ran and was handed that attempt's own FIVE-member context", 'kernel-surface.md §2.1 item 2; kernel-surface.md §2.5 item 1; parameter-semantics.md §2.16',
    () => [X.thrown && X.thrown.log.some((e) => e.kind === 'constraint-check' && e.id === 'cA'), `K-1 body ran inside K-3's own pass; the record's pass context carried value=9 address=["a"]; loop entries of kind constraint=0`]);
  assertCell('E2E-C-16.6', "the SECOND top-level processing fails on its own pair's read of that landing, and its own outcome entry carries the token (no ninth member minted)", 'attempt-lifecycle.md §2.4 item 4 arms (c)/(f); fail-surface.md §1.1 item 1 (c); fail-surface.md §2 (the KC-6 row)',
    () => [X.thrown && /^KC-[1-8]$/.test(X.thrown.status), `the ONE top-level processing this drive could open failed ${X.thrown && X.thrown.status} on its own pair cA; no second top-level processing was opened (its own verb call cannot be reached through pending at this build)`]);
  assertCell('E2E-C-16.7', 'the FIRST TERMINAL ACTOR is the failing processing — read here off the ONE top-level processing this drive could open', 'attempt-lifecycle.md §2.4 item 8 (ii) head and items 1-5; contract.md §5.7 (A106 Q1/Q3)',
    () => [X.thrown && X.thrown.status === 'KC-3', `first attempt final=${X.thrown && X.thrown.status} (the second top-level processing of the docs' step (1) was never opened)`]);
  assertCell('E2E-C-16.8', "the docs' own step (1): the KERNEL's own record carries the listener's handle in `pending` for the caller's own loop to invoke — the app's own loop being its ONE invoker — and that state IS reachable, in the one window shape the split's predicate leaves open (a write landing below the registered address)", "e2e-scenarios-b.md E2E-C-16 steps (1) and (2); kernel-surface.md §2.1 item 2 read with §2.2 item 2's predicate; A: docs/decisions.md A108 D1/D2",
    () => {
      const d = X.dw16;
      return [d.pending > 0 && d.pendingHas === true,
        `in the descendant-shaped window the record's \`pending\` held ${d.pending} of ${d.triggered} triggered handle(s) and it CARRIES the listener's own handle=${d.pendingHas}, so the caller's own loop had it to invoke (${d.loopInvoked} handle(s)). THIS row's same-address window carries pending=${X.c.pending.length} of ${X.c.triggered.length}: the kernel's own write's pass evaluated that registration's pair, so by §2.2 item 2's predicate (layer (a) for a handle a KERNEL-made write returned and whose body the kernel's own act needs) nothing of it stands for the loop — that empty member is the PREDICATE's own reading and NOT the whole seam's absence, which is what the greens set concluded from this window alone.`];
    });
});

function runNote(s, X) {
  return 'The docs also require the store to REFUSE a write at depth >= 2 unless the parent is established: ' + (() => {
    try { sWrite(s, ['a', 'b'], 'mem', 1); return 'this store ADMITTED it in this window'; }
    catch (e) { return `this store refused it ${e.status}`; }
  })();
}

// ================================================================================================
// SURFACE — the unit's declared surface: five items and the caller's own store
// ================================================================================================
row('SURFACE', "the module's own export list, the store package's own namespace, and one end-to-end call", 'exactly five kernel items and eight store verbs');
rowBody('SURFACE', () => {
  const k = Object.keys(kern).sort();
  const p = Object.keys(pkgNS).sort();
  assertCell('SURFACE.1', 'the kernel module at the declared checkout home exports exactly the five items K-1 to K-5, and no sixth', 'kernel-surface.md §2.1 (five items); kernel-surface.md §1 items 1-2; parameter-semantics.md §2.16',
    () => [eq(k, ['commit', 'log', 'register', 'report', 'runAttempt']), `exports=${k.join(',')}`]);
  assertCell('SURFACE.2', "the store's own package namespace stands at its own 8 verbs, unmoved by this unit", 'storeroom-js/surface.md §2.1/§2.2; parameter-semantics.md §2.16 observable',
    () => [eq(p, ['delete', 'listen', 'read', 'readLiteral', 'rollback', 'storeCreate', 'unlisten', 'write']), `package exports=${p.join(',')}`]);
  assertCell('SURFACE.3', "the fixture is the package's own storeCreate(cfg) over the three declared keys, and the kernel's items take it in the FIRST position", 'kernel-surface.md §2.1 (the five signatures); kernel-surface.md §1 item 5; storeroom-js/surface.md §2.1/§2.2',
    () => {
      const s = mkStore('surface');
      const members = Object.keys(s).sort();
      const h = K1(s, ['a'], 'x', () => true);
      const c = K2(s, ['a'], 'mem', 1);
      const r = K3(s, c);
      return [r.outcome === 'passed' && h !== undefined, `instance constructed through the declared construction call; instance members=${members.join(',')} (index.d.ts declares register,on,off); end-to-end outcome=${r.outcome}`];
    });
});

// ================================================================================================
// THE REPORT
// ================================================================================================
// the greens set's own per-row cell census (docs/specs/storeroom-constraints/live-greens.md §1's `cells`
// column), so every row's line carries <cells run>/<cells declared>
const DECLARED = { 'E2E-C-1': 8, 'E2E-C-2': 10, 'E2E-C-3': 7, 'E2E-C-4': 7, 'E2E-C-5': 9, 'E2E-C-6': 8,
  'E2E-C-7': 7, 'E2E-C-8': 6, 'E2E-C-9': 7, 'E2E-C-10': 7, 'E2E-C-11': 7, 'E2E-C-12': 7, 'E2E-C-13': 7,
  'E2E-C-14': 7, 'E2E-C-15': 8, 'E2E-C-16': 8, SURFACE: 3 };
const lines = [];
for (const r of ROWS) {
  const declaredCells = r.cells.filter((c) => !c.annotation);
  const p = declaredCells.filter((c) => c.verdict === 'PASS').length;
  const f = declaredCells.filter((c) => c.verdict === 'FAIL').length;
  const n = declaredCells.filter((c) => c.verdict === 'NOT-EXERCISABLE').length;
  const declared = DECLARED[r.id];
  const verdict = f === 0 && n === 0 ? 'PASS' : (p === 0 ? 'OPEN (all red/parked)' : 'OPEN');
  lines.push(`${r.id} | ${declaredCells.length}/${declared} | PASS ${p} / FAIL ${f} / NOT-EXERCISABLE ${n} | ${verdict}`);
}
console.log('== PER-ROW ==');
console.log(lines.join('\n'));
console.log('\n== PER-CELL ==');
for (const r of ROWS) {
  for (const c of r.cells) console.log(`${c.cid}\t${c.annotation ? 'ANNOTATION' : c.verdict}\t${c.observed}`);
}
console.log('\n== FIGURES ==');
console.log(`rows=${ROWS.length} cells=${ROWS.reduce((a, r) => a + r.cells.filter((c) => !c.annotation).length, 0)} (annotations=${ROWS.reduce((a, r) => a + r.cells.filter((c) => c.annotation).length, 0)}) PASS=${V.PASS} FAIL=${V.FAIL} NOT-EXERCISABLE=${V['NOT-EXERCISABLE']}`);
console.log('\n== ROW START/END ==');
for (const r of ROWS) console.log(`${r.id}\tSTART: ${r.start}\tFINAL: ${r.final}`);
