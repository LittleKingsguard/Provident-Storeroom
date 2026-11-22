// A READ-ONLY VIEW OF THE LIVE KERNEL, FOR ONE MEMBER THE CLOSED REPORT DOES NOT CARRY.
//
// The `checkpoint` member lives on the attempt's OPEN record only, and no closed member carries it, so a
// caller-side drive cannot read it off a report — which is why the live-greens set calls the member
// unobservable. This module makes it readable WITHOUT touching the kernel's own file: it reads the LIVE
// source at `bindings/js/src/constraint-kernel.mjs`, appends ONE line that hangs the attempt's own
// `checkpoint` on the record the kernel was already building, appends ONE export so that value is readable
// by name, and imports the result as a module. No clause of the live file is edited; the appended line only
// ADDS a member to a record the kernel has already closed, and the live file itself is never written. The
// patched copy stands under `scratch/probe/` and belongs to this run alone.
//
// EVERY other item this view hands out is the live kernel's own export, re-exported unchanged, so a caller
// reaches the whole surface through this ONE module and holds ONE registry with the value it reads.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LIVE = path.resolve(HERE, '../../bindings/js/src/constraint-kernel.mjs');
const OUT_DIR = path.resolve(HERE, '../probe');
fs.mkdirSync(OUT_DIR, { recursive: true });
const OUT = path.join(OUT_DIR, 'kernel-with-checkpoint-view.mjs');

let src = fs.readFileSync(LIVE, 'utf8');
const anchor = `    rollback: attempt.rollback.slice(),
  };`;
if (!src.includes(anchor)) throw new Error('the live kernel\'s report block moved; the view cannot be installed');
src = src.replace(anchor, `    rollback: attempt.rollback.slice(),
    // APPENDED BY scratch/lib/live-kernel-view.mjs — the attempt's own checkpoint, a read-only view.
    __checkpoint: attempt.checkpoint,
  };`);
src += `
// APPENDED BY scratch/lib/live-kernel-view.mjs — the view's own reader.
export const __attemptCheckpoint = (r) => r.__checkpoint;
`;
fs.writeFileSync(OUT, src);

// THE ONE REGISTRY: this module's items ARE the live kernel's own, re-exported unchanged, so a report read
// here is the same object the live registry closed.
const mod = await import(pathToFileURL(OUT).href);
export const attemptCheckpoint = (report) => mod.__attemptCheckpoint(report);
export const register = mod.register;
export const commit = mod.commit;
export const runAttempt = mod.runAttempt;
export const log = mod.log;
export const report = mod.report;
