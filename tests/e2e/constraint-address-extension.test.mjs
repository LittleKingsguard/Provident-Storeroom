// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE ADDRESS SET EXTENDS, IT DOES NOT REPLACE — **the address-set defect, driven through the built artifact**
//
// **THE FACT THIS CELL ASSERTS.** A second `addConstraint` for an `id` the entry already holds is ONE PAIR that
// gains an address and OVERWRITES its function: `strata/decisions.md` · `D-24` (*"the handle becomes the id … a
// duplicate handle is an overwrite"*) read with `D-29` item 2 (*"the pair's identity key is the `id`, outright"*).
// The shipped arm replaced the pair's address set with the call's set — a pair extended from `['a']` to `['b']`
// **stopped existing at `['a']`**, the kernel's row and the store's home entry lost it, and `constraints()`
// reported the call's set alone. It was fixed by hand and **no cell guarded it**: this is that guard.
//
// **WHAT IS DRIVEN, AND THROUGH WHICH ENTRY POINT.** `storeCreate` from the package's declared ESM entry
// (`bindings/js/index.mjs`) — the consumer's only route — and then the instance's own declared verbs
// `addConstraint`, `write` and `constraints`. The addon is never imported directly and the kernel is never
// reached: this is a consumer driving a published surface, which is what an e2e cell is for.
//
// **THE EXPECTATION IS DERIVED, NOT TRANSCRIBED.** The address set the pair must stand at is folded from the
// `addConstraint` calls the drive itself made (`foldSuppliedSets` in the support module), the write addresses are
// the drive's own act list, and the id named in the store's triggered set is the id the drive used. **No
// `['a']`, no `['b']`, no count of `1` and no id is asserted as a fact about the store** — move an act and the
// expectation moves with it.
//
// **THE FOUR LIMBS**, and each has a lawful instrument through a declared surface:
//   1. the pair is ONE pair — `constraints()` answers one row for the id, and the second `addConstraint` returns
//      the same opaque identity the first did (the identity is compared, never read: `PAR-JS-25`);
//   2. the function is OVERWRITTEN — the first body is evaluated zero times at the addresses the pair stands at
//      after the second act, and the second body is the one that is evaluated;
//   3. it evaluates at BOTH addresses — a write at each folded address reaches the pair and the body is handed
//      that address;
//   4. `constraints()` reports BOTH addresses, and the store's own home entry carries the id at each — the
//      `triggered` set the write returns is the store's `{handle, address}` record carried verbatim
//      (`bindings/js/src/entry/state.mjs` · `crossTriggered`), so the home entry is observable without a
//      diagnostic hook.
//
// **NO `docs/**` PATH IS READ BY THIS CELL OR ITS SUPPORT MODULE**, and nothing under `src/**` or
// `bindings/js/**` is written. `D-31`: every limb above is observable through the published surface, so no limb
// is removed as untestable.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { driveAddressExtension } from './constraint-address-extension-support.mjs';

test('a second addConstraint at a NEW address EXTENDS the pair: one pair, both addresses, the function overwritten', () => {
  // **THE WHOLE DRIVE AND ALL FOUR LIMBS.** The support module folds its own expectation from the acts it makes;
  // a failure here names the limb that moved (see each assertion's message).
  const observation = driveAddressExtension(storeCreate);

  // **AND THE OBSERVATION IS NON-VACUOUS**, so a drive that made no second act (or a store that answered nothing
  // to compare) cannot read as agreement: the drive supplied at least two addresses, folded them to two, and the
  // store carried the pair under one row and one identity.
  assert.ok(observation.expected.length >= 2,
    `the drive must supply at least two addresses for the extension to be a fact at all; it folded `
      + `${JSON.stringify(observation.expected)}`);
  assert.equal(observation.rows, 1,
    `the read must answer one row for the id; it answered ${observation.rows}: ${JSON.stringify(observation)}`);
  assert.equal(observation.identity, true,
    'the two adds must answer ONE identity (`D-24`/`D-29`: the id is the handle and the identity); the drive '
      + `recorded ${JSON.stringify(observation.identity)}`);
});
