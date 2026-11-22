// tests/e2e/creation-as-write-support.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `CAW-7`'S ONE INSTRUMENT — THE CREATION'S ATTEMPTS ARE UNNAMEABLE, READ ONCE A COLLECTOR HAS RUN
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **WHY THIS IS A CHILD AND WHY IT IS ITS OWN FILE.** `D-176`'s two forms are reachability's: `kernel.closed` is
// a **`WeakMap` keyed by the ref OBJECT**, and the id form reaches a ref only through a **`WeakRef`** — so
// *"the report is gone when the ref is"* can only be OBSERVED once a collector has run, and `npm test` passes no
// `--expose-gc`. **The device is `KAW-3`'s** (`tests/e2e/kernel-attempt-window.test.mjs`: one child, the same
// file, one flag) **with one difference that is the whole of this file's reason to exist**: the probe cannot
// live in a file that also registers `test()` cells, because a top-level `await` inside a probe branch yields
// and the runner then runs those cells in the child, whose output would land in the JSON this file prints.
//
// **IT REGISTERS NOTHING AND ASSERTS NOTHING.** It takes readings and prints them; the cell that judges them is
// `CAW-7` in `creation-as-write.test.mjs`, so the expectation stays a literal there (`D-17`) and every reading
// is printed (`D-21`).
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { log as kernelLog, report as kernelReport } from '../../bindings/js/src/constraint-kernel.mjs';

/** The one flag this file answers: absent, it prints nothing and exits zero. */
export const PROBE_FLAG = '--caw7-probe';

/** **A TURN, THEN TWO COLLECTS, THEN A TURN** — the turn releases the previous job's `KeepDuringJob` pins on a
 *  target a `deref()` touched, and the second collect is what turns a weakly-held target into a `WeakRef` that
 *  dereferences to nothing. */
const turn = () => new Promise((resolve) => setTimeout(resolve, 0));
async function settle() {
  await turn();
  globalThis.gc();
  globalThis.gc();
  await turn();
}

/** **THE ONE ANSWER A NAME MEETS**, read as a token rather than as a throw: `'closed-empty'` where the string
 *  form resolved to a CLOSED attempt (whose log crossed with its report, `D-58`), `'closed-report'` where it
 *  answered a sealed report, and the refusal's own status otherwise (`KC-2` is the one this unit reads). */
function nameAnswer(read) {
  try {
    const value = read();
    return Array.isArray(value) ? 'closed-empty' : 'closed-report';
  } catch (refused) {
    return String(refused !== null && typeof refused === 'object' ? refused.status ?? null : refused);
  }
}

if (process.argv.includes(PROBE_FLAG)) {
  const dir = mkdtempSync(join(tmpdir(), 'caw7-'));
  const filePath = join(dir, 'store.json');
  const instance = storeCreate({
    journalLength: 32,
    listeners: [],
    filePath,
    // **ONE PAIR THAT REPAIRS**, so the construction opens an attempt at all and the count below is not zero
    // for want of a registration.
    constraints: [{
      address: ['a'],
      id: 'probe',
      constraint: (context) => (context.value !== undefined
        ? true
        : {
          message: '`["a"]` must exist',
          repair: (record) => ({ ok: true, op: record.write(['a'], 'mem', 1).op }),
        }),
    }],
  });
  const kernel = kernelFor(instance);
  // **BEFORE ANY COLLECT — AND `log` ONLY.** The id form resolves through `kernel.closedIds`'s `WeakRef` while
  // the ref lives, so a closed attempt's empty log is the answer; **`report` is NOT read here on purpose**,
  // because the sealed report it answers is a STRONG holder of the ref and would keep that ref alive for the
  // reading below — which is the very thing this probe exists to measure.
  const before = nameAnswer(() => kernelLog(instance, 'attempt-1'));
  await settle();
  const logAfter = nameAnswer(() => kernelLog(instance, 'attempt-1'));
  const reportAfter = nameAnswer(() => kernelReport(instance, 'attempt-1'));
  await settle();
  const again = nameAnswer(() => kernelLog(instance, 'attempt-1'));
  process.stdout.write(`${JSON.stringify({
    gc: typeof globalThis.gc === 'function',
    attempts: kernel.attempts,
    live: kernel.live.size,
    before,
    logAfter,
    reportAfter,
    again,
  })}\n`);
  rmSync(dir, { recursive: true, force: true });
  process.exit(0);
}
