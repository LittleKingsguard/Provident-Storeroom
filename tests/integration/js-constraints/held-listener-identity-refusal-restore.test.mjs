// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// THE PURGE ORDER'S WAKE, AT THE TWO SITES THE PROPERTY DRIVE `P-HL-8` DOES NOT REACH
//
// **THE DEFECT THESE CELLS DRIVE.** A write to a held pair is `CHECK → PURGE → ADD`
// (`contract.md §2.3` items 2–4; `P: docs/pending.md · (O-4)` item (iii)), and the PURGE is `K-6`, whose
// `FORGET_PAIR` channel is UNCONDITIONAL and takes the pair's READ-MODEL row with the kernel's own
// (`contract.md §2.9` item 3; `§2.7` item 7). **THE CHECK CANNOT REACH THE REGISTRATION-TIME EVALUATION**
// (`contract.md §2.3` item 4's own split), so a state-2 refusal at a held pair purges first and refuses
// after — and if nothing puts the two rows back, the STANDING PAIR IS DESTROYED: `constraints()` reads
// `[]`, its body never evaluates again, and `removeConstraint` throws.
//
// **WHAT THE CONTRACT DECLARES ABOUT THAT RESIDUE IS TWO FACTS, AND ONLY THE SECOND IS THIS SET'S TO
// KEEP** (`constraint-sites.md §4` item 2, verbatim): *"the pair's REGISTRY standing and its STORE standing
// are two facts, and only the registry one is the kernel's to keep; the pair STILL EVALUATES"* — so
// `§2.1` item 1's *"a refused registration leaves the registry exactly as it stood"* is the assertion here,
// and the STORE-side loss is the declared residue and is NOT asserted (`contract.md §2.3` item 6).
//
// **THE STATE THIS FILE SUPPLIES AND THE DRIVE DOES NOT.** `constraintOn` re-registers `entry.fn`
// (`index.mjs`'s toggle; `constraint-sites.md §1` rows 2–3), so a refusal at that site needs the pair's OWN
// element to refuse at the CURRENT state. The pair's element is admitted at registration and every kernel
// write re-evaluates it, so the state is reached the one way it can be: **the element reads a SECOND
// address and a write at THAT address moves the value it reads** — a write the pair does not stand under,
// so the pair is not evaluated by it and the write is admitted.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

import test from 'node:test';
import assert from 'node:assert/strict';
import { makeStore, tag, seedContainers, capture } from './held-listener-identity-helpers.mjs';

test('hli_regression_a_refused_constraintOn_leaves_the_standing_pair_exactly_as_it_stood', () => {
  const inst = makeStore({ journalLength: 64 });
  const label = tag('restore');
  const pairAddress = [label, tag('pair')];
  const sibling = [label, tag('sibling')];
  // EVERY ADDRESS WRITTEN IS SEEDED FIRST (`write-and-read.md §3.4` `W-3`/`W-4`; `F-3`).
  seedContainers(inst, pairAddress);
  seedContainers(inst, sibling);
  inst.write(sibling, 'mem', 0);

  const pair = { address: [pairAddress], id: tag('restore-t') };
  // THE ELEMENT READS THE SIBLING ADDRESS, so the state it answers to is movable at an address it does not
  // stand under — and the pair is therefore NOT evaluated by the write that moves it.
  const body = () => (inst.read(sibling) === 0 ? true : { message: 'the sibling moved' });
  inst.addConstraint(pair, body);
  assert.equal(inst.constraints().filter((p) => p.id === pair.id).length, 1,
    'the fixture stands: the pair is held before the toggle (`§2.3` item 2)');

  // MOVE THE STATE, AT AN ADDRESS THE PAIR DOES NOT STAND UNDER — so this write is admitted and the pair
  // is not evaluated by it (`kernel-selection.md §3`; the pass reads the pairs at the attempt's address).
  const moved = capture(() => inst.write(sibling, 'mem', 1));
  assert.equal(moved.threw, false,
    'the fixture stands: a write at an address the pair does not stand under is ADMITTED, so the state the '
    + 'element reads is now one it refuses');
  assert.equal(inst.constraintOff(pair, () => {}), undefined,
    'and the pair is DISABLED — the toggle is idempotent in effect and answers `undefined` (`§2.12` item 3)');

  // ── THE TOGGLE'S OWN PURGE ORDER, AT ITS OWN SITE. `constraintOn` purges the pair's rows through `K-6`
  //    and THEN re-registers `entry.fn`, which refuses at the state just moved (`constraint-sites.md §1`
  //    rows 2–3; `§2` item 2's not-pre-checkable set).
  const refused = capture(() => inst.constraintOn(pair, () => {}));
  assert.equal(refused.threw, true,
    'THE RE-REGISTRATION REFUSES (`§4` `F-10`; `constraint-sites.md §4` item 1)');
  assert.equal(refused.thrown.status, 'ConstraintListInvalid',
    'with the store\'s own `ConstraintListInvalid` — read ' + JSON.stringify(refused.thrown.status)
    + ' (`§4` `F-10`)');

  // (i) THE REGISTRY IS EXACTLY AS IT STOOD — `§2.1` item 1, verbatim.
  assert.equal(inst.constraints().filter((p) => p.id === pair.id).length, 1,
    'THE HELD PAIR STANDS THROUGH THE REFUSAL — `§2.1` item 1, verbatim: *"a refused registration leaves the '
    + 'registry exactly as it stood"*, and this pair stood BEFORE the refused toggle (`§2.3` item 3 (iii); '
    + '`constraint-sites.md §1` item 3\'s four observables) — read ' + JSON.stringify(inst.constraints()));

  // (ii) THE ELEMENT PUT BACK IS THE ONE THE PAIR ACTUALLY STOOD UNDER — `constraintParked`, because the
  //      pair was DISABLED when the refused toggle reached it. A restore that re-registered `entry.fn` would
  //      leave the pair ENABLED with an element the state refuses, and the write below would be refused.
  const later = capture(() => inst.write(pairAddress, 'mem', 5));
  assert.equal(later.threw, false,
    'AND THE PAIR STANDS DISABLED AS IT STOOD: the parked stub passes, so a later write at the pair\'s own '
    + 'address is ADMITTED — a pair re-enabled by the restore with `entry.fn` would REFUSE it ('
    + '`§2.12` item 3\'s `constraintOn` row: *"it is the element the entry carried at that pair"*)');

  // (iii) AND THE IDENTITY IS STILL RESOLVABLE — `removeConstraint` names it (`§2.6` item 3).
  assert.equal(inst.removeConstraint(pair), undefined,
    'and the pair the caller held before the refusal is still RESOLVABLE — `removeConstraint` naming it '
    + 'succeeds (`§2.7` item 3; `constraint-identity.md §3` item 2 (ii))');
  assert.equal(inst.constraints().length, 0,
    'and the removal is the ONE act that deletes it, so the enumeration is now empty (`§2.7` item 8)');
});

test('hli_regression_a_refused_addConstraint_at_a_held_pair_leaves_the_standing_pair_alone', () => {
  const inst = makeStore({ journalLength: 64 });
  const address = [tag('restore-overwrite')];
  seedContainers(inst, address);
  const pair = { address: [address], id: tag('restore-o') };
  let evaluations = 0;
  const held = () => { evaluations += 1; return true; };
  const identity = inst.addConstraint(pair, held);
  assert.equal(inst.constraints().filter((p) => p.id === pair.id).length, 1,
    'the fixture stands: the pair is held before the second `K-1` (`§2.3` item 2)');

  const refused = capture(() => inst.addConstraint(pair, () => ({ message: 'no' })));
  assert.equal(refused.threw, true, 'THE SECOND ADD REFUSES (`§4` `F-10`)');
  assert.equal(refused.thrown.status, 'ConstraintListInvalid', 'with the store\'s `ConstraintListInvalid`');

  assert.equal(inst.constraints().filter((p) => p.id === pair.id).length, 1,
    'A REFUSED REGISTRATION LEAVES THE REGISTRY EXACTLY AS IT STOOD (`§2.1` item 1, verbatim) — read '
    + JSON.stringify(inst.constraints()));

  const before = evaluations;
  const later = capture(() => inst.write(address, 'mem', 7));
  assert.equal(later.threw, false,
    'AND THE HELD PAIR\'S OWN BODY STILL EVALUATES AT A LATER WRITE — and it PASSES, so the write is '
    + 'admitted (`§2.3` item 3; `constraint-sites.md §1` item 3 (ii))');
  assert.equal(evaluations > before, true,
    'and the element the pair stood under is the one evaluated — read ' + evaluations + ' against ' + before);

  assert.equal(inst.removeConstraint(pair), undefined,
    'and the identity the caller held before the refusal still resolves (`§2.6` item 3)');
  assert.notEqual(identity, undefined, 'and the ADD route answered the pair\'s identity (`PAR-JS-25`)');
});
