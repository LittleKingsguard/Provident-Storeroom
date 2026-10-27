// `tests/e2e/delete-reversal.test.mjs` — **`D-43` ITEM 3 AT THE PACKAGE SURFACE: A DELETE IS JOURNALED,
// NAMED ON ITS OWN RECORD, AND REVERSIBLE.**
//
// **THE RULING** (`strata/decisions.md` · `D-43`, the architect, verbatim): *"Delete should be journaled and
// reversible"*. **THE MEASURED OBSTACLE IT ANSWERS**: a delete's op id was not exposed — `delete` answered
// `{address, tiers, triggered}` — **so a delete could not be NAMED, and an act that cannot be named cannot be
// reversed**, which is why the kernel's unwinding could not reach a delete's effect at all.
//
// **THE MEASUREMENT THAT SCOPED THIS PASS, TAKEN BEFORE ANY BYTE MOVED** (a probe drive run against the
// shipped tree, printed in the pass's report): the delete WAS already appended to the store's journal — one
// entry, carrying the address, the per-tier before-state and an op id — and `rollback` ALREADY accepted that
// id and restored every removed value at its own tier; a second reversal already answered
// `RollbackCompacted`. **The gap was EXPOSURE, not journaling.** This file drives the surface a CONSUMER
// holds: the record a `delete` answers carries the identity, and the reversal takes it from THERE.
//
// EVERY EXPECTATION BELOW IS THE DECLARATION'S (`bindings/js/index.d.ts` `DeleteRecord`; `WriteRecord`; the
// store's `§4.4`/`§6.3`–`§6.4` through the package's own spellings) — no cell reaches into the store, and
// **no cell reads the identity off anything but the returned record**: that is the point of the ruling.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../../bindings/js/index.mjs';

/** A store whose register stands at `file` (`surface.md §2.1`: the two REQUIRED keys alone). */
const make = (extra = {}) => storeCreate({ journalLength: 8, listeners: [], ...extra });

/** A path-backed store, for the cells that must not leave an image behind in the tree. */
const withPath = () => {
  const directory = mkdtempSync(join(tmpdir(), 'sr-delete-reversal-'));
  return make({ filePath: join(directory, 'store.json') });
};

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// `D-43` ITEM 3 · A DELETE IS REVERSIBLE THROUGH THE OP ITS OWN RECORD CARRIES
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('d43_3_a_delete_is_reversible_from_the_op_its_own_record_carries_and_every_value_returns_to_its_own_tier', () => {
  const instance = withPath();
  // TWO VERSIONS AT ONE ADDRESS. The `file` write comes FIRST: a write PURGES by the monotonic clause
  // (`§5.4`'s `temp` → `mem` → `file` chain), so a `file` write removes what stands at or below it while a
  // `mem` write purges only `temp` and leaves `file` standing.
  instance.write(['d43'], 'file', 'file-value');
  instance.write(['d43'], 'mem', 'mem-value');
  assert.equal(instance.read(['d43'], 'file'), 'file-value');
  assert.equal(instance.read(['d43'], 'mem'), 'mem-value');

  const receipt = instance.delete(['d43']);
  // THE RECORD NAMES ITS OWN ACT (`index.d.ts` `DeleteRecord.op`): the store's own eight-member journal op,
  // the member `WriteRecord` carries at the same name and the same type.
  assert.deepEqual(Object.keys(receipt.op).sort(), [
    'address',
    'after',
    'before',
    'compacted',
    'kind',
    'opId',
    'seq',
    'tier',
  ]);
  assert.equal(receipt.op.kind, 'delete', 'the op the record carries is the DELETE\'s own');
  assert.deepEqual(receipt.op.address, ['d43']);
  assert.equal(receipt.op.after.present, false, 'and its after-state is the absence the delete left');
  assert.equal(receipt.op.before.present, true, 'and its before-state is what the delete removed');
  assert.deepEqual(receipt.tiers, ['file', 'mem'], 'both versions, in §5.1\'s canonical order');

  // NOTHING STANDS AT EITHER TIER — the delete removed every version of the address.
  for (const tier of ['file', 'mem', 'temp']) {
    const absent = (() => {
      try {
        instance.read(['d43'], tier);
        return null;
      } catch (thrown) {
        return thrown;
      }
    })();
    assert.notEqual(absent, null, `the ${tier} tier still answers after the delete`);
    // THE ADDRESS ITSELF IS GONE (`§4.4` `D-2`: every version, and all downstream of each), so the read
    // answers the store's own `AddressNotFound` at every tier and not a per-tier absence.
    assert.equal(absent.status, 'AddressNotFound', `the ${tier} tier answers the store's own absence`);
  }

  // **THE REVERSAL IS NAMED BY THE RECORD AND BY NOTHING ELSE.**
  const undone = instance.rollback(receipt.op.opId);
  assert.equal(undone.opId, receipt.op.opId, '`rollback` echoes the id the record carried');
  assert.deepEqual(undone.undoneOps, [receipt.op.opId], 'and undid exactly that op — the delete\'s entry');

  // **THE VALUES AND THEIR TIERS, PRINTED PER ADDRESS AND PER TIER.**
  const standing = [];
  for (const tier of ['file', 'mem', 'temp']) {
    let value;
    try {
      value = instance.read(['d43'], tier);
    } catch (thrown) {
      value = `<none: ${thrown.status}>`;
    }
    standing.push([tier, value]);
    console.log(`  D-43 item 3 · [${JSON.stringify(['d43'])}] @ ${tier} = ${JSON.stringify(value)}`);
  }
  assert.deepEqual(standing[0], ['file', 'file-value'], 'the `file` version is back AT THE `file` TIER');
  assert.deepEqual(standing[1], ['mem', 'mem-value'], 'and the `mem` version AT THE `mem` TIER');
  assert.deepEqual(standing[2], ['temp', '<none: TierNotFound>'],
    'and no version the delete never removed has appeared');
  // AND THE UNQUALIFIED READ ANSWERS THE WHOLE ASSEMBLED VALUE AGAIN.
  assert.equal(instance.read(['d43']), 'mem-value',
    'the unqualified read selects the lowest-persistence standing version, as it did before the delete');
});

test('d43_3_the_identity_the_record_carries_is_the_one_a_reversal_accepts_for_a_whole_subtree', () => {
  // A `file`-register store, so a `file`-tier version may stand at a register key at all (`§1.6` item 4 (d):
  // a path-less instance's register is FIXED at `mem` and the `file` tier is unreachable below it).
  const instance = withPath();
  // A STRUCTURED TARGET WITH A MIXED-DEPTH SHADOW: a `file` version holding two members and a `mem` version
  // holding one, so the reversal must reach the descendant versions at the tiers they stood at.
  instance.write(['root'], 'file', { a: 'file-a', b: 'file-b' });
  instance.write(['root'], 'mem', { a: 'mem-a' });
  const receipt = instance.delete(['root']);
  assert.deepEqual(receipt.tiers, ['file', 'mem'], 'the target stood at two tiers and both were removed');

  const undone = instance.rollback(receipt.op.opId);
  assert.deepEqual(undone.undoneOps, [receipt.op.opId],
    'the id off the RECORD is the id the reversal found in the journal');

  const table = {};
  for (const path of [['root'], ['root', 'a'], ['root', 'b']]) {
    table[JSON.stringify(path)] = {};
    for (const tier of ['file', 'mem', 'temp']) {
      try {
        table[JSON.stringify(path)][tier] = instance.read(path, tier);
      } catch (thrown) {
        table[JSON.stringify(path)][tier] = `<none: ${thrown.status}>`;
      }
      console.log(`  D-43 item 3 subtree · [${JSON.stringify(path)}] @ ${tier} = `
        + `${JSON.stringify(table[JSON.stringify(path)][tier])}`);
    }
  }
  assert.deepEqual(table[JSON.stringify(['root'])], {
    file: { a: 'file-a', b: 'file-b' },
    mem: { a: 'mem-a' },
    temp: '<none: TierNotFound>',
  }, 'the addressed pair is back at BOTH its tiers');
  assert.deepEqual(table[JSON.stringify(['root', 'a'])], {
    file: 'file-a',
    mem: 'mem-a',
    temp: '<none: TierNotFound>',
  }, 'and the descendant each version held is back, each at ITS OWN tier');
  assert.deepEqual(table[JSON.stringify(['root', 'b'])], {
    file: 'file-b',
    // the `mem` version of `root` never held a `b`, so at that tier the address does not resolve at all
    // (`L-3` `AddressNotFound`, not `L-TIER`'s per-tier absence) — the store's own distinction, unmoved.
    mem: '<none: AddressNotFound>',
    temp: '<none: TierNotFound>',
  }, 'and the member only the `file` version held is back at `file` alone');
});

test('d43_3_a_reversed_delete_is_refused_on_a_second_reversal_exactly_as_any_compacted_op_is', () => {
  const instance = withPath();
  instance.write(['once'], 'file', 'kept');
  const receipt = instance.delete(['once']);
  instance.rollback(receipt.op.opId);
  assert.equal(instance.read(['once'], 'file'), 'kept', 'the first reversal put the value back');

  const second = (() => {
    try {
      instance.rollback(receipt.op.opId);
      return null;
    } catch (thrown) {
      return thrown;
    }
  })();
  assert.notEqual(second, null, 'the second reversal returned; the declared surface says it THROWS');
  console.log(`  D-43 item 3 · second reversal of ${receipt.op.opId} = ${second.status}`);
  assert.equal(second.status, 'RollbackCompacted',
    '§6.3 `M-6` / §8.1: the SAME rule a write\'s reversed op answers — a delete\'s op is a name, not a '
    + 'licence to reverse twice');
  // AND THE REFUSAL CHANGED NOTHING: the floor undoes nothing.
  assert.equal(instance.read(['once'], 'file'), 'kept',
    'the refused walk left the restored state standing');
});

test('d43_3_a_delete_that_removed_nothing_names_no_op_and_that_is_the_declared_null_arm', () => {
  const instance = make();
  instance.write(['there'], 'mem', 1);
  const nothing = instance.delete(['there'], 'temp');
  assert.deepEqual(nothing.tiers, [], '§4.4 arm `D-3`: removing nothing is a SUCCESS with `tiers: []`');
  assert.equal(nothing.op, null,
    'and the record names no op: the act appended no entry, so there is no identity to carry — '
    + '`DeleteRecord.op` is `JournalOp | null` and this is its `null` arm (`D-43` item 3)');
});
