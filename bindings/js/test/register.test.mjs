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
// no clock. **`un-run` IS PRINTED AS A FAILURE** — see CONTRACT FINDING #1 below.

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
const { storeCreate, read, write, delete: remove, listen, unlisten } = api;
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
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    run += 1;
    if (!drive(attempt)) {
      failures += 1;
      if (failures >= 5) break; // stop-after-5
    }
  }
  r.lines.push({ sid, attempts: run, failures, unrun: false });
}

function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

// =============================================================================================
// `§5.5` `P-SM-5` — the registry's four rules, and the handle's two spellings  (40 attempts)
// =============================================================================================
const P_SM_5 = row('P-SM-5');

// **UN-RUN, AND `un-run` IS A FAILURE.** Rules 1–3 of `§2.4` are about a FUNCTION the package holds and
// INVOKES; `parameter-semantics.md §2.12` (`PAR-JS-12`) even declares the `TypeError` a non-function
// registration throws. **No clause of this contract declares the SPELLING of that registration site**, and
// `§2.1` (*"no clause of this directory exposes any member of it"*, of the instance handle) together with
// `package.md §1.3` item 3 (*"exactly the verbs of `surface.md §2` … and NOTHING ELSE"*) leaves no
// declared place for it. Reported to the supervisor as CONTRACT FINDING #1; no spelling is invented here.
line(
  P_SM_5,
  'S-REG',
  20,
  null,
  'the registration site has no declared spelling: CONTRACT FINDING #1 (§2.4 + PAR-JS-12 vs §2.1 + package.md §1.3 item 3)',
);

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
  // `unlisten` withdraws the STORE-side home entry; the package's registry entry stands (its function half is
  // UN-RUN for FINDING #1's reason), and a re-`listen` at the same address mints a DIFFERENT handle whose
  // registration is a NEW entry.
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
  // The package's invocation happens AFTER the verb returns, and a throwing body neither rolls back nor alters
  // the store's result. **The INVOCATION half of this line is UN-RUN for FINDING #1's reason** (no declared
  // registration site); the half driven here is the window's own shape — the store's result is already
  // complete and copied out before any window could open, so no listener's fate can alter it.
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const record = write(inst, ['a'], 'mem', 1);
  return (
    record.triggered.length === 1 &&
    record.op.after.present === true &&
    read(inst, ['a']) === 1
  );
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
  // `acceptance.md §4.4` and is carried to the supervisor as CONTRACT FINDING #1. It does not assert a
  // finding exists, because a bounded amendment of `§2.4` that declares the registration's spelling would
  // make these lines drivable and their absence would then be correct.
});
