// =====================================================================================================
// **`construction-file-guard.test.mjs` — `A55`'s *"every construction that fails leaves nothing behind"*,
// AT THE ONE REFUSER THAT RUNS AFTER THE CREATE** (`SS-9`; `contract.md §10.4` part 5)
// =====================================================================================================
//
// **THE DEFECT THIS FILE DRIVES, MEASURED BEFORE THE FIX**: a construction over an ABSENT `filePath` whose
// **constraint body throws at its own registration** answers **`ConstraintBodyThrew`** — and the store's
// exclusive create at step 4b has ALREADY made its zero-length file, so the refusal left that file on disk.
// **The construction's own checks are placed BEFORE the create for exactly this reason** (`instance.mjs`'s
// step 2), and **the registration sweep is the only refuser that runs after it** — the store cannot undo a
// file the PACKAGE'S arming threw over, so the package must.
//
// **THE FIX IS A CHANNEL AND NOT AN IMPORT**: `instance.mjs` carries no `node:` specifier (`CW-4` asserts the
// arm's whole graph holds none), so the filesystem is reached through `state.mjs`'s
// `installConstructionFileGuard`, which the NODE entry installs and the injected arm leaves empty — right,
// because a path-less store refuses `filePath` outright and never creates a file to remove.
//
// **AND THE GUARD'S OWN BOUND IS THE OTHER HALF OF THE SUBJECT**: it removes a file **only where the
// construction made it**, so a caller's own file is never touched by a refusal.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

/** A construction at an absent path whose constraint body throws at its own registration. */
function refusedConstruction(filePath) {
  try {
    storeCreate({
      filePath,
      journalLength: 4,
      listeners: [],
      constraints: [{ address: ['a'], id: 'c', constraint: () => { throw new Error('the body refuses'); } }],
    });
    return null;
  } catch (refused) {
    return refused;
  }
}

test('CFG-1 · SS-9 — a construction refused AFTER its create leaves NO FILE behind', () => {
  const dir = mkdtempSync(join(tmpdir(), 'store-guard-'));
  const path = join(dir, 'store.str');
  const refused = refusedConstruction(path);
  assert.equal(refused?.status, 'ConstraintBodyThrew',
    'the construction is refused at the registration sweep, which runs AFTER the store\'s exclusive create: '
      + String(refused?.status));
  assert.equal(existsSync(path), false,
    'A55 / contract.md §10.4 part 5: every construction that fails leaves NOTHING behind — the zero-length file '
      + 'the create made is gone with the refusal. It read: '
      + (existsSync(path) ? statSync(path).size + ' bytes at the path' : 'absent'));
});

test('CFG-2 · SS-9 — the guard removes only the file the construction MADE, and never the caller\'s own', () => {
  const dir = mkdtempSync(join(tmpdir(), 'store-guard-'));
  const path = join(dir, 'mine.str');
  writeFileSync(path, '{"keep":"this"}');
  const refused = refusedConstruction(path);
  assert.equal(refused?.status, 'ConstraintBodyThrew', 'the same refusal, over a file the caller supplied');
  assert.equal(existsSync(path), true,
    'the guard\'s own bound: a file that existed BEFORE the call is not the construction\'s to remove, and a '
      + 'refusal never destroys a caller\'s data');
  assert.equal(readFileSync(path, 'utf8'), '{"keep":"this"}', 'and its bytes are unmoved');
});
