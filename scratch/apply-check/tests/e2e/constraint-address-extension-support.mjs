// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE ADDRESS SET EXTENDS — the drive, and **every expectation in it is FOLDED FROM THE ACTS THE DRIVE ITSELF
// MADE**, not transcribed
//
// **THE DEFECT THIS DRIVE EXISTS FOR.** `addConstraint` at a NEW address for an `id` the entry already holds is,
// by ruling, **an EXTENSION PLUS AN OVERWRITE**: the pair keeps the addresses it stood at and gains the one the
// call names (`strata/decisions.md` · `D-24`'s *"the handle becomes the id"* and `D-29` item 2's *"the pair's
// identity key is the `id`, outright"*, which make one `id` ONE pair over N addresses), and the FUNCTION is
// replaced, because the add route's held-pair arm is an overwrite. **The shipped bytes did the second half only**:
// `held.addresses = site.addresses` replaced the pair's address set with the CALL's set, so a pair extended from
// `['a']` to `['b']` **stopped existing at `['a']`** — its function was replaced as declared and its ADDRESSES
// were destroyed, which no clause declares. The kernel's row and the store's home entry lost `['a']` (the pair no
// longer evaluated there) and `constraints()` answered the call's set alone, because the read enumerates that
// same entry. It was fixed by hand with nothing guarding it; this is the guard.
//
// **THE DERIVATION.** The pair's address set is whatever the caller has supplied for that `id` across the pair's
// whole history: this drive records each `addConstraint` call's address as it makes the call, and folds the
// recorded sets into ONE union (`foldSuppliedSets` below). **No expected address, no expected count and no
// expected order is written down here** — change the drive's acts and the expectation moves with them. The three
// observables the drive then compares against that fold are the store's own:
//   · `a.constraints()` — the package's registered-pair read, one row per carried pair, `address` being the
//     pair's own SET (`surface.md §2.4` item 9 (f) as read with `contract.md §2.6` item 5 / `PAR-HL-13`);
//   · the `triggered` set the write RETURNS — **the store's home entry at that address, verbatim**, which is how
//     the store's own bookkeeping is observable through a declared surface at all;
//   · the caller's own function bodies, which record the address they were evaluated at.
//
// **NO `docs/**` PATH IS READ BY THIS MODULE OR BY THE CELL THAT USES IT**, and no byte of `src/**` or
// `bindings/js/**` is written: the drive reaches the built artifact through its declared entry
// (`storeCreate`) and nothing else.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';

/** A stable spelling of ONE address, for set comparison. Segments are `string | number`, so `JSON` is exact. */
function addressSpelling(address) {
  return JSON.stringify(address);
}

/** A stable spelling of an address SET: sorted, so an order the clauses do not declare is never asserted. */
function setSpelling(addresses) {
  return addresses.map(addressSpelling).sort().join(' | ');
}

/**
 * **THE FOLD.** One address set per `addConstraint` call the drive made, folded left into the pair's expected
 * address set — duplicates collapsed by spelling. The expectation is therefore the drive's own act log.
 */
function foldSuppliedSets(suppliedSets) {
  const union = new Map();
  for (const supplied of suppliedSets) {
    for (const address of supplied) union.set(addressSpelling(address), address);
  }
  return [...union.values()];
}

/** A caller-side constraint body: it PASSES every context and records the address it was evaluated at. */
function recordingBody(label) {
  const body = (context) => {
    body.calls.push(context);
    return true;
  };
  body.label = label;
  body.calls = [];
  return body;
}

/**
 * THE DRIVE. `storeCreate` is injected so the same assertions can be pointed at a MUTATED copy of the built
 * artifact — which is how this cell's failure against the pre-fix bytes was demonstrated (reported in the
 * envelope; the mutation is one line of `bindings/js/index.mjs` in a `/tmp` copy, and the workspace copy is
 * never touched).
 */
export function driveAddressExtension(storeCreate, { id = 'c1' } = {}) {
  const instance = storeCreate({ journalLength: 8, listeners: [] });
  const suppliedSets = [];
  const first = recordingBody('first');
  const second = recordingBody('second');

  const report = () => instance.constraints().filter((row) => row.id === id);

  // ── ACT 1: THE PAIR IS REGISTERED AT ONE ADDRESS ────────────────────────────────────────────────────────
  const firstAddress = ['a'];
  suppliedSets.push([firstAddress]);
  const firstIdentity = instance.addConstraint({ address: firstAddress, id }, first);
  // The registration instant evaluates the body once (`K-1`'s third step), so the WRITE-time record starts now.
  first.calls.length = 0;

  // **THE PRE-STATE, ASSERTED SO THE EXTENSION IS A DIFFERENCE AND NOT A COINCIDENCE.** The read reports the one
  // address supplied, and a write there MEETS the pair — so `['a']` was live before anything was extended.
  const before = report();
  assert.equal(before.length, 1,
    `after ONE \`addConstraint\` the store must carry exactly one row for the id '${id}'; \`constraints()\` `
      + `answered ${before.length}: ${JSON.stringify(before)}`);
  assert.equal(setSpelling(asAddressList(before[0].address)), setSpelling(foldSuppliedSets(suppliedSets)),
    `the read's address set must be the set the caller supplied; it answered `
      + `${JSON.stringify(before[0].address)} against the folded expectation `
      + `${JSON.stringify(foldSuppliedSets(suppliedSets))}`);

  const preWrite = instance.write(firstAddress, 'mem', 'before-the-extension');
  assert.equal(first.calls.length, 1,
    `the write at ${JSON.stringify(firstAddress)} must meet the pair the caller registered there: the body was `
      + `evaluated ${first.calls.length} time(s) (registration's own instant is cleared above, so a count of 0 `
      + 'means the pair evaluates nowhere and a count above 1 means it was evaluated more than once per write)');
  assert.deepEqual(first.calls[0].address, firstAddress,
    `the body must be evaluated AT THE WRITING ADDRESS ${JSON.stringify(firstAddress)}; it saw `
      + `${JSON.stringify(first.calls[0].address)}`);
  assertTriggered(preWrite, id, firstAddress, 'the pre-extension write');
  first.calls.length = 0;

  // ── ACT 2: THE SAME `id` IS ADDED AT A SECOND ADDRESS ───────────────────────────────────────────────────
  const secondAddress = ['b'];
  suppliedSets.push([secondAddress]);
  const secondIdentity = instance.addConstraint({ address: secondAddress, id }, second);
  // The re-add is `CHECK → PURGE → ADD`, and the ADD evaluates the supplied body once per address it walks
  // (`K-1`'s third step at every address of the extended set). That instant is cleared here: this cell's subject
  // is the pair's evaluation at a WRITE, and the registration instant is not the write path.
  first.calls.length = 0;
  second.calls.length = 0;

  // **THE ID IS THE HANDLE AND THE IDENTITY (`D-24`, `D-29` item 2): ONE `id` NAMES ONE PAIR, SO THE SECOND ACT IS
  // THE SAME PAIR AND NOT A SECOND ONE.** The identity the add route answers is the pair's, and it is the value
  // the first act returned.
  assert.equal(secondIdentity, firstIdentity,
    `the second \`addConstraint\` at the same id '${id}' is the SAME PAIR (D-24's overwrite, D-29's id-keyed `
      + 'pair), so it must answer the identity the first one did; it answered a different value, which means two '
      + 'pairs were minted for one handle');

  // **THE PAIR IS ONE PAIR** — one row, not one per address.
  const after = report();
  assert.equal(after.length, 1,
    `one \`id\` names ONE pair, so the read must answer exactly one row for '${id}' after the extension; it `
      + `answered ${after.length}: ${JSON.stringify(after)}`);

  // **AND IT REPORTS BOTH ADDRESSES** — the read is the pair's own set, folded from the drive's acts.
  const expectedSet = foldSuppliedSets(suppliedSets);
  const reportedSet = asAddressList(after[0].address);
  assert.equal(setSpelling(reportedSet), setSpelling(expectedSet),
    'THE READ REPORTED A REPLACED SET. The pair was registered at ' + JSON.stringify(firstAddress)
      + ` and extended at ${JSON.stringify(secondAddress)}, so \`constraints()\` must report BOTH: `
      + `${JSON.stringify(expectedSet)}. It reported ${JSON.stringify(reportedSet)}. A pair that stopped being `
      + 'reported at an address it still stands at is the read-model half of the defect this cell exists for');

  // ── ACT 3: THE PAIR EVALUATES AT BOTH ADDRESSES, AND THE FUNCTION IS THE SECOND ONE ─────────────────────
  // The writes are made in the drive's own order, so the expectation for each is the address it names.
  for (const writeAddress of [firstAddress, secondAddress]) {
    const record = instance.write(writeAddress, 'mem', `at-${writeAddress.join('')}`);
    assert.equal(second.calls.length, 1,
      `the write at ${JSON.stringify(writeAddress)} must meet the pair: the SECOND body was evaluated `
        + `${second.calls.length} time(s) in that write (registration's instant is cleared above)`
        + (first.calls.length > 0
          ? `, while the body the second \`addConstraint\` REPLACED was evaluated ${first.calls.length} time(s): the `
            + 'pair still stands where the extension put it, and the OVERWRITE half is what did not take'
          : first.calls.length === 0 && second.calls.length === 0
            ? ' and the replaced body was not evaluated either, so the pair does not stand at this address at all: '
              + 'the EXTENSION half is what did not take'
            : ''));
    assert.deepEqual(second.calls[0].address, writeAddress,
      `the body must be evaluated at ${JSON.stringify(writeAddress)}; it saw `
        + `${JSON.stringify(second.calls[0].address)}`);
    // **AND IT IS THE SECOND BODY, NOT THE FIRST**: the add route's held-pair arm is an OVERWRITE (`D-24`), so the
    // function the first act carried must not be evaluated at any address the pair stands at after the second.
    assert.equal(first.calls.length, 0,
      `the write at ${JSON.stringify(writeAddress)} evaluated the body the second \`addConstraint\` REPLACED `
        + `${first.calls.length} time(s): the address set extended but the function was never overwritten, which is `
        + 'the overwrite half of the act missing while the extension half took — `D-24` declares the replacement '
        + 'and nothing declares a merge');
    // **THE STORE'S OWN HOME ENTRY AT THAT ADDRESS NAMES THE ID** — the write's `triggered` set is the store's
    // record carried verbatim, so this is the home entry observed through a declared surface.
    assertTriggered(record, id, writeAddress, `the write at ${JSON.stringify(writeAddress)}`);
    second.calls.length = 0;
  }

  // **AND THE FIRST FUNCTION WAS OVERWRITTEN, NOT KEPT BESIDE THE SECOND** (`D-24`: a duplicate handle is an
  // overwrite; the add route is an overwrite and not a merge). The loop above asserted it after EVERY write —
  // every address the pair stands at has just been written, so a body still carried somewhere would have fired.

  return {
    id,
    identity: secondIdentity === firstIdentity,
    rows: after.length,
    reported: reportedSet,
    expected: expectedSet,
    addresses: suppliedSets.flat(),
  };
}

/**
 * THE READ'S `address` MEMBER, NORMALISED TO A SET OF ADDRESSES.
 *
 * The declaration types it `Address | readonly Address[]`: at the CREATION act the member is a single address and
 * on the READ it is the pair's SET (`ConstraintPair`'s own doc block in `bindings/js/index.d.ts`). **This drive
 * asserts the SET'S CONTENTS and never which of the two spellings the read chose**: a member whose elements are
 * segments IS one address and is wrapped, and a member whose elements are addresses is the set. Anything else is
 * not a set this cell can fold and is reported as the read's own shape fault.
 */
function asAddressList(addressMember) {
  assert.ok(Array.isArray(addressMember) && addressMember.length > 0,
    '`constraints()`\'s `address` member must be a non-empty address or list of addresses; it answered '
      + `${JSON.stringify(addressMember)}, which is not a shape a set can be folded from`);
  const isSegment = (value) => typeof value === 'string' || typeof value === 'number';
  if (addressMember.every(isSegment)) return [addressMember];
  for (const address of addressMember) {
    assert.ok(Array.isArray(address) && address.length > 0 && address.every(isSegment),
      '`constraints()`\'s `address` member is a list of addresses, and every element must itself be a non-empty '
        + `segment array; one element answered ${JSON.stringify(address)}`);
  }
  return addressMember;
}

/**
 * **THE STORE'S HOME ENTRY, READ OFF THE WRITE'S OWN RECORD.** `triggered` is the store's set of
 * `{handle, address}` pairs at this write's window; the id must name the writing address exactly once.
 */
function assertTriggered(record, id, writeAddress, subject) {
  assert.ok(Array.isArray(record.triggered),
    `${subject} answered no \`triggered\` array, so the store's home entry cannot be read: `
      + `${JSON.stringify(record.triggered)}`);
  const hits = record.triggered.filter((pair) => pair.handle === id);
  assert.equal(hits.length, 1,
    `${subject}: the store's triggered set at ${JSON.stringify(writeAddress)} must name the id '${id}' exactly `
      + `once, and it named it ${hits.length} time(s): ${JSON.stringify(record.triggered)}`);
  assert.deepEqual(hits[0].address, writeAddress,
    `${subject}: the id '${id}' must stand at the writing address ${JSON.stringify(writeAddress)} in the store's `
      + `home entry; the set named ${JSON.stringify(hits[0].address)}`);
}
