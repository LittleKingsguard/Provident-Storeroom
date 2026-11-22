// RED SET — `U-STOREROOM-CONSTRAINTS`, THE GATE-4 `A112` DELTA FINDINGS `F1`–`F4`
// (`U-STOREROOM-CONSTRAINTS`): THE FAILING ARM'S DISCARD EXTENT, THE NESTED `K-2` FROM THE BODY THE
// PASS REACHES WHILE THE OUTER ATTEMPT'S ADDRESS IS HELD (THE FINDING `F2` WAS FILED AS "FROM A LISTENER
// BODY INSIDE THE OUTER WRITE'S WINDOW", AND THAT HALF IS WITHDRAWN BY `A115` (D2) / `A116` (D1) (a) —
// named at `ck_neg_dm_03_*`), AND THE TWO INSTANTS A CALLER MAY READ `CommitRecord.pending`.
//
// DERIVED FROM THE RECONCILED CLAUSES ALONE, AND FROM NO IMPLEMENTATION:
//   · `F1` — the failing arm's discard extent. `attempt-lifecycle.md §2.4` item 8 (i) (5)'s own
//     one-valued reading at the `A112` reconciliation pass of 2026-10-13: "THE FAILING ARM READS
//     `triggered` AS THE STORE'S RETURNED SET VERBATIM AND REMOVES FROM `pending` EXACTLY THE HANDLES OF
//     THE WRITE THAT FAILED … THE DISCARD ACTS ON THE BLOCKED WRITE'S OWN RETURNED SET … AND REMOVES
//     EVERY HANDLE OF IT, WHILE AN ENTRY FOR A HANDLE OF ANY OTHER WRITE — an EARLIER caller write at a
//     prefix address, whose pair NO pass of this attempt evaluated — STANDS IN THE MEMBER AFTER THE
//     ARM, because the blanket clear is the SECOND, UNLAWFUL REMOVAL this pass withdraws by name" — read
//     with `attempt-lifecycle.md §3` item 8, whose surviving law is "THE DISCARD ACTS ON THAT WRITE'S OWN
//     RETURNED SET AND REACHES EVERY HANDLE OF IT — so every entry of that write leaves the member by the
//     DISCARD, no handle of that write being invoked by either layer — WHILE AN ENTRY FOR A HANDLE OF ANY
//     OTHER WRITE STANDS"; `kernel-surface.md §2.1` item 2's throwing-arm clause ("the entries the
//     discard reaches LEAVE THE MEMBER BY THAT DISCARD — its ground being the WRITE THAT FAILED, and
//     never a check-off, NO pass having run for its pairs, and never a clear of the whole member") and
//     its member's own clause ("the member is never cleared as a whole, an entry for a handle of an
//     EARLIER caller write stands after the arm"); `kernel-surface.md §2.4` item 5 (i)'s reading "`WHOLE`
//     READS THAT WRITE'S OWN RETURNED SET, WHOSE EVERY HANDLE IS A NOT-YET-INVOKED TRIGGER WHEN THE ARM
//     TAKES IT — NO PASS CHECKING ANY OF ITS PAIRS OFF — WHILE THE MEMBER ITSELF IS NOT CLEARED".
//   · `F2` — `attempt-lifecycle.md §2.4` item 8 (ii) (g), whose admission is single-valued with its two
//     terms: "(1) `K-2` OPENS THE ATTEMPT'S ADDRESS HOLD AT ITS OWN ACT AND BEFORE IT REACHES THE
//     STORE'S WRITE VERB — the store invokes nothing, so the only invocation window that can stand
//     inside `K-2` is the SURFACE's, and a listener body's own `K-2` while `K-2` stands is inside
//     `K-2`'s window", read with `kernel-surface.md §2.1` item 2's refusal clause ("a commit at an
//     address that ALREADY HOLDS an OPEN attempt is REFUSED with `KC-7` … and the refusal happens
//     BEFORE the write verb is reached, so the store sees no write at all") and §2.4 §3 item 9, whose
//     observable is "a drive observes the admission by reading a nested attempt's own `CommitRecord`
//     crossing back from the body, its own `K-3` admissible, with the OUTER attempt's hold still open".
//     THE SECOND TERM OF `(g)` — the surface's invocation layer running after `K-2`'s return — is the
//     JS surface unit's OPEN row `docs/next-steps.md` `N7`, and no cell here drives it.
//     ⟶ AND TERM (1)'S INVOCATION WINDOW IS WITHDRAWN FOR A KERNEL EVALUATION SET (`A115` (D2);
//     `A116` (D1) (a); `surface.md §2.7` item 7): NO listener body stands inside `K-2`'s window at this
//     surface, and the nested `K-2` this unit drives is raised from THE PAIR BODY THE PASS ITSELF
//     INVOKES, while the attempt stands and its address is held — `ck_neg_dm_03_*`.
//   · `F3`/`F4` — `attempt-lifecycle.md §3` items 10 and 11: the caller's FIRST read of
//     `record.pending` is `K-2`'s own return, where no pass has run and the member IS the whole set;
//     after the pass it is the checked-off residue; "NO MID-WINDOW TRANSITION IS A CALLER-OBSERVABLE
//     READING OF ANY RECORD THIS SURFACE RETURNS"; and on a throwing arm "THE FAILED WRITE'S OWN ENTRIES
//     ARE REMOVED BY THE DISCARD AND NEVER BY A CHECK-OFF — no pass having run for its pairs — and the
//     caller's loop performs NO invocation because it meets a THROW instead of a return, WHATEVER the
//     member carries", read with `kernel-surface.md §2.1` item 2's `SIFT` definition ("A `SIFT` IS A
//     SUBTRACTION OF AN ENTRY FROM `pending` NOT TIED TO THAT ENTRY'S OWN PASS … A SIFT IS UNLAWFUL").
//
// ── THE STATES ENUMERATED BEFORE THE CELLS (one valid drive per reasonable state) ────────────────
//
// S1  A WRITE RETURNING A HANDLE *OF ITS OWN* WHOSE PAIR NO PASS EVALUATES. A `K-1` pair standing at
//     the write's own address, registered AFTER the attempt's earlier pairs, whose pair the pass never
//     reaches because the attempt transitions at an earlier pair's violation (`§2.4` item 5 (ii)'s
//     sequencing rule: "a pair the pass never reaches is NOT evaluated in that pass and appends NO
//     entry"). Its handle IS a member of the failed write's own returned set.
// S2  A WRITE RETURNING A HANDLE OF *AN EARLIER CALLER WRITE* WHOSE PAIR NO PASS EVALUATES. A plain
//     store registration at a watched PROPER PREFIX of the write's address; the ANCILLARY caller write
//     that landed its home entry returned its handle, and the write under test returns it again by the
//     store's own descendant-inclusive prefix test — while the pass's set is the address-scoped one
//     (`kernel-surface.md §2.3` item 1; `§2.1` item 2's layer-(a) extent clause, "the pairs registered
//     at the landing's own address and NOT THOSE OF ANY ANCESTOR ADDRESS").
// S3  A FAILING/THROWING ARM. The write failed the registered constraints at its landing and could not
//     be repaired; the caller's channel is the thrown three-member form and it takes NO loop.
// S4  A PASSING ARM. Every registered pair at the attempt's address returns the pass arm; the log closes
//     on a `commit` entry and the report reads `outcome: 'passed'`.
// S5  A PASS THAT EXITS AT A REPAIR. The first-violating pair transitions the attempt to `REPAIRING`,
//     the repair's op is added, and the pass returns to `EVALUATING` over that op's landing
//     (`§2.4` item 4's arm (b)) — a pass that ends at its SECOND evaluation rather than at its first.
// S6  A NESTED `K-2` ISSUED FROM THE PAIR BODY THE PASS ITSELF INVOKES WHILE THE OUTER ATTEMPT STANDS
//     (INSIDE THE ATTEMPT'S OWN WINDOW, THE HOLD OPEN — `§2.4` item 8 (ii) (e)/(g) term (1)), AT A
//     DESCENDANT ADDRESS OF THE LIVE ATTEMPT (ADMITTED), BESIDE THE SAME CALL AT THE HELD ADDRESS
//     ITSELF (REFUSED `KC-7`, BEFORE THE WRITE VERB, SO THE STORE HOLDS THE FIRST ATTEMPT'S VALUE
//     STILL). THE EARLIER SPELLING OF THIS STATE — A LISTENER BODY INSIDE `K-2`'S OWN WINDOW — IS
//     WITHDRAWN BY NAME AT `A115` (D2) / `A116` (D1) (a) AND IS ASSERTED NOWHERE IN THIS FILE.
// S7  THE TWO INSTANTS A CALLER MAY READ A RECORD: `K-2`'s own return, and the record's state after
//     `K-3`'s pass. No third, mid-window reading is driven by any cell of this file.
//
// ── THE FIXTURE AND SURFACE RULES (cited, not re-declared) ───────────────────────────────────────
// Every store is the package's own `storeCreate(cfg)`, through the shared helper and no other way
// (`kernel-surface.md §1` item 1). Every kernel item is reached through the module the helper loads at
// its one declared home. A store holds ONE function per address, so a plain registration and a kernel
// pair at the SAME address are ONE entry and the later registration replaces the other's body
// (`attempt-lifecycle.md §2.4` item 5 (iii)): every fixture below therefore stands its plain
// registrations at an address the kernel registers NO pair at, and registers its pairs BEFORE its
// plain listeners at the one address it uses for both.
//
// ── THE ONE ROW THIS FILE CANNOT DRIVE, MARKED AND NOT INVENTED ──────────────────────────────────
// `F2`'s SECOND TERM — "THE SURFACE'S INVOCATION LAYER RUNS AFTER `K-2`'S OWN RETURN" — is the JS
// surface unit's OPEN row `docs/next-steps.md` `N7` (the ordering gate is enforced nowhere in the
// delivered surface; the entry cannot learn whether a constraint stands owed and importing the kernel
// into the entry collides with the publish allow-list). NO CELL OF THIS FILE ASSERTS IT:
// `NOT-EXERCISABLE-BY-THIS-UNIT` — `N7`. The DESCENDANT-ADDRESS ADMISSION of `F2` is checkable now and
// is driven at `ck_neg_dm_03_*`.
//
// ── ⟶ RE-DERIVED 2026-10-15 ON `A117` (`docs/decisions.md`, ACTIVE): TWO CELLS OF THIS FILE PINNED THE
// READING THE ARCHITECT HAS JUST REPLACED, AND BOTH ARE RE-DERIVED HERE WITH THE SUPERSEDED EXPECTATION
// NAMED AT ITS OWN CELL — `ck_neg_dm_06_*`'s assertion that the app's body at the attempt's own address is
// reached ZERO times, and `ck_neg_dm_08_*`'s assertion that the residue carries NO occurrence of the
// evaluated identity and that the terminal arm invokes no body for it. **THE LAW THAT MOVED IS `A117`
// (D3)/(D4)/(D5): `§2.4` item 8 (c)'s DERIVED NON-DELIVERY is SUPERSEDED AND DELETED; A LISTENER
// REGISTERED AT A PAIR-ADOPTED ADDRESS IS OWED ONE FIRING, AT THE PASS'S TERMINAL ARM, WITH THE
// TRIGGERING ADDRESS AS ITS SINGLE ARGUMENT, EXACTLY AS ITS SIBLING AT THE PROPER PREFIX IS; AND THE
// CHECK-OFF CONSUMES THE EVALUATED IDENTITY'S ENTRY — ONE `pending` ENTRY PER ADDRESS, `A117` (D6).**
// THE FIRING LAW IS `surface.md §2.7` item 6, the residue is `item 7 (a)`'s "`triggered` MINUS the
// checked-off entries, AND MINUS NOTHING ELSE", and `§2.4` item 8 (c) is read AT ITS OWN SITE as
// re-scoped to its registration subject. **WHERE THE OWED FIRING LIVES — THE RE-DERIVATION THIS PASS
// CORRECTS ITSELF ON:** the identities a check-off consumed are recorded on the attempt's own books and
// delivered at the PASSING arm's terminal arm **through THE SAME REGISTRY LOOKUP THE RESIDUE USES, AND
// NOT BY A SECOND `pending` OCCURRENCE** — the carrier holds ONE `pending` entry PER ADDRESS (one home
// entry per address; `CommitRecord`'s four members, no member added), so a second `pending` entry for
// one address is impossible without a store or record change, which `A117` (D6) forbids. An identity the
// registry holds a function for is therefore FIRED ONCE with the triggering address as its single
// argument; an identity it holds none for fires NOTHING, SILENTLY; AND THE FAILING ARM DELIVERS ZERO.
// SO THE TWO CELLS AGREE ON ONE KEYING: after the check-off the residue holds the entries of the
// identities the pass did NOT evaluate and that identity's own entry is GONE, while the app's body is
// reached ONCE AT THE TERMINAL ARM through the registry's resolution of it. The one reading this
// supersedes in turn — this file's own first re-derivation, that the registration's owed firing "is left
// STANDING in the residue" — is named at `ck_neg_dm_06_*`'s `pending` assertion and at
// `ck_neg_dm_08_*`'s, because it asserted a `pending` shape the carrier cannot hold. NOTHING ELSE MOVES:
// the check-off is still the only lawful removal on a passing write and the discard the only one on a
// failing write (zero deliveries there), `commit`'s whole-set write at `K-2` stands, a `SIFT` is still
// unlawful, the bare caller-made write's own instant is untouched, and this file's own census cell,
// `ck_neg_dm_03_*`, the member-set cells, the delivery-instant cells and `ck_neg_dm_10_*` are NOT touched
// by this pass — `ck_neg_dm_10_*` being the cell that PINS the ruling, now GREEN.

import test from 'node:test';
import assert from 'node:assert/strict';

// ⟶ RESHAPED: the package namespace carries ONE name (`surface.md §2.9` item 1's `A127` clause; `11 → 1`).

import {
  kernel, makeStore, tag, KC,
  assertKernelForm, assertLogEntry, assertSeqIncreasesFromOne,
  capture, entries, countingListener, checkIds, noop,
  passAtRegistration, atLandingOnly,
  listenAndRegister, carriesHandle, setHandles, setAddresses, } from './constraint-kernel-helpers.mjs';

// ── `NEG-DM-05`'s OWN READING AID, SO THE FAILURE PRINTS THE HANDLE AND NOT A COUNT ─────────────
// The entries of the failed write's returned set that are STILL STANDING in `pending` after the arm,
// each named by the registration the store returned it for. Empty is the whole of the arm's obligation
// (`attempt-lifecycle.md §2.4` item 8 (i) (5)). The names are the CELL's own two registrations, passed
// in by identity: a handle is OPAQUE (`kernel-surface.md §2.1` item 2), so a drive learns what a handle
// names by holding the registration that answered with it and by nothing else.
function leakedEntries(record, named) {
  const names = new Map(named.map(([name, handle]) => [handle, name]));
  return record.triggered
    .filter((h) => carriesHandle(record.pending, h))
    .map((h) => names.get(h) ?? 'a handle this cell holds no registration for');
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `NEG-DM-01` — THE THROWING ARM'S DISCARD EXTENT: THE FAILED WRITE'S OWN SET LEAVES WHOLE
//
// ⟶ RE-DERIVED AT THIS BY-SET PASS. The premise this cell's header once carried — that a PREFIX
// registration stands after the arm because an EARLIER caller write registered it — IS WITHDRAWN BY
// NAME, and the cell now asserts the law the clauses actually carry: EVERY HANDLE OF THE FAILED WRITE'S
// OWN RETURNED SET LEAVES, AND AN ENTRY THAT WRITE DID NOT RETURN STANDS (`attempt-lifecycle.md §2.4`
// item 8 (i) (5); `§3` item 8; `kernel-surface.md §2.1` item 2). Its fixture puts the prefix handle
// INSIDE the failing write's returned set, so the prefix entry LEAVES, and the arm is read as the SET
// RELATION (`pending ∩ triggered` empty) with the member empty by that relation — never as a clear of
// the whole member, which is a different rule and is asserted as such. THE CLAUSE'S OTHER HALF — AN
// ENTRY OF ANOTHER WRITE STANDING — IS UNREACHABLE IN THIS UNIT'S FIXTURES, and the finding stands at
// the file's census cell (`ck_neg_dm_census_*`) rather than as an invented survivor.
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_neg_dm_01_throwing_arm_prefix_listener_discard_extent', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const ancestor = [tag('dm01a')];
  const own = [...ancestor, tag('dm01o')];
  store.write(ancestor, 'mem', { seed: 'the ancestor home entry stands' });
  const root = countingListener();
  const ancestorHandle = listenAndRegister(store, ancestor, root);
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: this body violates at its registration, so it is shielded
  // or the pair is REFUSED there (`ConstraintListInvalid`, state 2) and the failing arm this cell reads is
  // never reached. The body still violates every LANDING — the cell's subject is unmoved.
  register(store, own, 'x', passAtRegistration(() => ({ message: 'x is invalid and registers no repair' })));
  // THE REGISTRATION STANDS AFTER `K-1` AT THE WRITE'S OWN ADDRESS, because the store holds ONE function
  // per address and a pair registered there would displace it (`§2.4` item 5 (iii)).
  const ownListener = countingListener();
  const ownHandle = listenAndRegister(store, own, ownListener);

  const record = commit(store, own, 'mem', 'v');

  assert.equal(carriesHandle(record.triggered, ancestorHandle), true,
    'the failed write\'s returned set carries the earlier caller write\'s handle — the registration '
    + 'at the watched PROPER PREFIX is triggered by the operation at its descendant address '
    + '(`§2.1` item 2\'s prefix-test citation)');
  assert.equal(carriesHandle(record.triggered, ownHandle), true,
    'and it carries this write\'s own registration\'s handle beside it');
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // THE SET IS THREE AND ITS THIRD MEMBER IS THE KERNEL'S OWN PAIR ENTRY.** The as-filed `2` was the count the
  // OLD identity model produced, where `K-1`'s registration and a later `store.on` at one address answered
  // ONE adopted handle, so the pair's entry and the caller's entry were ONE row. **Under the caller-spelled
  // identity each registration is its OWN handle** (`contract.md §2.1` item 1 and `(AA-5)`; `identity-and-
  // domain.md §1` item 4: uniqueness is PER HANDLE STRING, so two different strings are two entries), and
  // the kernel's own pair entry (\`noopHandleFor\`, the \`constraint@\` spelling of `isKernelHandle`) STANDS BESIDE
  // the caller's at the same address. **THE CELL'S SUBJECT — *"the set is exactly the registrations the store's
  // prefix test answers with"* — IS UNMOVED AND IS NOW ASSERTED AT ALL THREE MEMBERS BY IDENTITY, which is
  // stronger than a bare count.**
  assert.equal(record.triggered.length, 3,
    'the store answered this write with THREE entries — the ancestor registration, this write\'s own '
    + 'address\'s caller registration, and the kernel\'s own pair entry at that address — read '
    + `${record.triggered.length}`);
  // **⟶ RE-DERIVED 2026-10-24 (`strata/decisions.md` `D-22`, verbatim: *"Discard the noop prefix"*; `D-23`:
  // *"it has nothing left to name"*): THE THIRD MEMBER IS STILL A PAIR ENTRY, AND IT IS SPELLED WITH THE
  // CALLER'S OWN `id`.**
  //
  // **WHAT STOOD HERE.** `assert.ok(triggeredHandles.some((h) => h.startsWith('constraint@')), 'the third
  // member IS the kernel\'s own pair entry, spelled `constraint@…`')` — **no `constraint@` spelling exists any
  // more**: `D-22` discards the prefix, `noopHandleFor` and `noopListener`, and `D-23`/`D-24` make the pair's
  // `id` its handle. **The CELL'S SUBJECT — the set is exactly the registrations the store's prefix test
  // answers with, and the pair's own entry stands BESIDE the caller's at that address — is unmoved**, and it
  // is now asserted at the pair's own `id`, which is the identity a caller can read.
  const triggeredHandles = setHandles(record.triggered);
  assert.equal(triggeredHandles.includes('x'), true,
    'the third member IS the kernel\'s own pair entry, and its handle is THE PAIR\'S OWN `id` (`D-23`, '
    + '`D-24`; `docs/L1/surface-deltas.md` §4.2: *"the caller\'s own word IS the handle"*). A pass that '
    + 'searches this set for a `constraint@` spelling has lost its subject (`D-22`)');
  assert.equal(
    triggeredHandles.some((h) => typeof h === 'string' && h.startsWith('constraint@')), false,
    'and NO `constraint@` spelling exists anywhere — the noop prefix is DISCARDED, not moved (`D-22`; `D-23`: '
    + '*"There is no kernel-authored identity left to reserve"*)',
  );
  assert.equal(triggeredHandles.filter((h) => h === ancestorHandle).length, 1,
    '...and the ancestor registration appears EXACTLY once, never once per address it prefixes');
  assert.equal(carriesHandle(record.pending, ancestorHandle), true,
    'AND AT `K-2`\'S OWN RETURN THE MEMBER IS THE WHOLE RETURNED SET: "THE CALLER\'S FIRST READING OF '
    + '`record.pending` IS `K-2`\'S OWN RETURN, WHERE NO PASS HAS RUN, AND THERE THE MEMBER IS THE WHOLE '
    + 'RETURNED SET" (`attempt-lifecycle.md §3` item 10), so the earlier write\'s entry is NOT sifted '
    + 'out — a `SIFT` is a subtraction not tied to that entry\'s own pass and is UNLAWFUL '
    + '(`§2.1` item 2)');
  assert.equal(carriesHandle(record.pending, ownHandle), true,
    'and the member carries THIS write\'s own registration\'s handle too — written with the whole '
    + 'returned set and leaving it only by a removal the clauses name');
  assert.deepEqual(setHandles(record.pending), setHandles(record.triggered),
    'the two members are read together AT THE ONE INSTANT THE CALLER HAS: K-2\'s return, where no pass '
    + 'has run for any pair of this attempt — read `pending` ' + JSON.stringify(record.pending.length)
    + ' of `triggered` ' + JSON.stringify(record.triggered.length));
  assert.equal(ancestorHandle === ownHandle, false,
    'the fixture\'s two registrations are TWO store entries at two addresses and never one — the '
    + 'address-level idempotence the one-address pairs share does not reach across addresses '
    + '(`§2.1` item 1)');
  // ── ⟶ RE-DERIVED AT THE `A116` ORDERING-SEAM PASS (2026-10-15) AT THE INSTANT THAT MOVED AND AT THE
  //    PREMISE THAT WITHDREW. TWO CELLS ARE RETIRED HERE AND ONE IS NAMED AS A FINDING.
  //    (1) THE DELIVERY INSTANT (`surface.md §2.4` item 9's instant (a); `A116` (D1)–(D2); `§2.7`
  //    item 7): this write is KERNEL-DRIVEN, so the entry withheld its in-window invocation BEFORE the
  //    store's verb was called and NO handle of it is reached inside that window. The cell now asserts
  //    the empty in-window set where it once asserted a body running inside it.
  //    (2) THE PREMISE THIS CELL ONCE CARRIED: "its body ran once, for the write that LANDED its own
  //    home entry". THE MEASUREMENT REFUTES IT AS A PROPERTY OF THIS FIXTURE AND OF EVERY FIXTURE OF
  //    THIS SHAPE: a registration placed AFTER the write that landed its own home entry cannot be
  //    reached by that write, because the store's returned set is read from the entries standing when
  //    the write runs, and this registration was placed after it — the write's own returned set here
  //    is EMPTY (read at line 141's `triggered` for the commit, and measured for this minting write at
  //    `root.seen.length === 0`). A DELIVERY A REGISTRATION CANNOT SEE IS NOT A DELIVERY THE CLAUSES
  //    OWE IT, and no body of this fixture is reached by anything below; so the two calls this cell once
  //    asserted are asserted NOWHERE here, and the finding stands in the returned digest: the premise is
  //    unreachable at this drive, NOT a defect of the seam.
  assert.equal(root.seen.length, 0,
    'AND THE EARLIER WRITE\'S REGISTRATION IS LIVE BUT WAS NEVER REACHED BY THAT WRITE: `store.on` was '
    + 'called AFTER `storeWrite`, so the write\'s own returned set carries no entry for it and the '
    + 'store\'s own delivery has nothing to invoke (`§2.1` item 2 (ii): a registration\'s body is reached '
    + 'by ITS OWN address\'s write) — read ' + `${root.seen.length} call(s). FAIL-STATE DISTINGUISHED: a `
    + 'fixture in which this registration is reached by this write, which no drive of this shape can '
    + 'produce and which this cell therefore does not assert');
  assert.equal(ownListener.seen.length, 0,
    'AND THIS WRITE\'S OWN REGISTRATION\'S BODY DID NOT RUN INSIDE THE VERB\'S WINDOW EITHER — the '
    + 'instant `A116` (D1) moved, read as the EMPTY IN-WINDOW INVOCATION SET that `PAR-JS-19` (`§2.19`) '
    + 'declares as instant (a)\'s own observable: the write was adopted before the store\'s verb was '
    + 'called, so the package\'s post-verb invocation reaches no handle of it (`surface.md §2.4` item 9\'s '
    + 'instant (a); `§2.2` item 2). FAIL-STATE DISTINGUISHED: a delivery still made inside the verb\'s '
    + 'window — read ' + `${ownListener.seen.length} call(s)`);

  const outcome = capture(() => runAttempt(store, record));
  assert.equal(outcome.threw, true, 'the attempt fails: `x` registers no repair for its violation');
  assertKernelForm(outcome.thrown, 'NEG-DM-01 failing arm');
  assert.equal(outcome.thrown.status, KC[3],
    'and the arm it fails on is the first-violation arm (c) read with the outside-form rule — read '
    + JSON.stringify(outcome.thrown.status));
  for (const e of outcome.thrown.log) assertLogEntry(e, 'NEG-DM-01\'s thrown log');
  assertSeqIncreasesFromOne(outcome.thrown.log, 'NEG-DM-01\'s thrown log');
  assert.deepEqual(checkIds(outcome.thrown.log), ['x'],
    'the pass evaluated THIS attempt\'s own pair and no ancestor pair — "a pair registered at an '
    + 'ANCESTOR of the attempt\'s address is NOT evaluated by this attempt" (`§2.4` item 5 (iv); '
    + '`§2.3` item 1)');

  // ── THE ARM'S OWN OBSERVABLE, READ AFTER THE PASS AT THE ONLY INSTANT A CALLER HAS ───────────────
  // ── RE-DERIVED AT THIS BY-SET PASS, ON THE PREMISE THIS CELL ONCE RESTED ON ─────────────────────
  // WHAT IT RESTED ON: that a registration at a watched PROPER PREFIX stands after the arm because an
  // EARLIER caller write — never this write — is what registered it. THE LAW CARRIES NO SUCH
  // DISCRIMINATOR. The discard's extent is the FAILED WRITE'S OWN RETURNED SET — `attempt-lifecycle.md
  // §2.4` item 8 (i) (5): "THE DISCARD ACTS ON THE BLOCKED WRITE'S OWN RETURNED SET … and removes EVERY
  // handle of it, WHILE AN ENTRY FOR A HANDLE OF ANY OTHER WRITE … STANDS"; `§3` item 8: "every entry of
  // that write leaves the member by the DISCARD … WHILE AN ENTRY FOR A HANDLE OF ANY OTHER WRITE
  // STANDS" — and `kernel-surface.md §2.1` item 2's member clause: "the entries the discard reaches
  // LEAVE THE MEMBER BY THAT DISCARD — its ground being the WRITE THAT FAILED … and never a clear of the
  // whole member", the clear being "the second, unlawful removal". SO "AN ENTRY OF AN EARLIER CALLER
  // WRITE STANDS" IS TRUE OF AN ENTRY THAT WRITE DID NOT RETURN, AND OF THAT ENTRY ALONE; A PREFIX
  // REGISTRATION'S HANDLE THE FAILING WRITE'S OWN RETURN CARRIES IS PART OF THAT WRITE'S RETURNED SET
  // (asserted at `:131` above and at the by-set premise below) AND THEREFORE LEAVES ON THE ARM. No
  // fixture of this unit reaches an entry the failing write did not return: a handle reaches `pending`
  // only by being returned for a write, every write that fails is the one whose set `pending` carries,
  // and a COMPOSITION'S own write carries no `CommitRecord` to this surface (`kernel-surface.md §2.1`
  // item 2's two further sources) — recorded below as the clause's reachability finding.
  assert.equal(carriesHandle(record.pending, ancestorHandle), false,
    'AND THE PREFIX REGISTRATION\'S ENTRY LEAVES THE MEMBER TOO, BECAUSE THE FAILING WRITE\'S OWN '
    + 'RETURNED SET CARRIES IT: this handle is in `triggered` for THIS write (asserted at `:131` above), '
    + 'so the discard "acts on that write\'s own returned set and removes EVERY handle of it" '
    + '(`attempt-lifecycle.md §2.4` item 8 (i) (5); `§3` item 8: "every entry of that write leaves the '
    + 'member by the DISCARD, no handle of that write being invoked by either layer"; `kernel-surface.md '
    + '§2.1` item 2: "EVERY HANDLE OF THAT WRITE LEAVES THE MEMBER BY THE DISCARD") — and the earlier '
    + 'cell\'s premise, *who registered it*, is WITHDRAWN BY NAME: what fixes an entry\'s fate is WHICH '
    + 'SET THE HANDLE CAME BACK IN, and `§2.1` item 2 names "filtering by the write\'s author" a `SIFT`, '
    + 'which is UNLAWFUL. FAIL-STATE DISTINGUISHED: a discard scoped to the pairs the pass evaluated, to '
    + 'the attempt address\'s home handle, or by the registration\'s author — each leaves THIS entry '
    + 'standing — read `pending` ' + JSON.stringify(record.pending.map(String)));
  assert.deepEqual(record.pending.slice(), [],
    'AND THE ONE REMOVAL THIS ARM OWES LEAVES THE MEMBER EMPTY, ENTRY FOR ENTRY: `pending` after the arm '
    + 'is the returned set minus the handles of the write that failed (`attempt-lifecycle.md §2.4` item 8 '
    + '(i) (5): "THE DISCARD removes the failed write\'s own returned set and nothing beside it"; `§3` '
    + 'item 8: "the failing arm reads `triggered` as the store\'s returned set VERBATIM"), and EVERY entry '
    + 'this member carries is a handle THIS write returned — the member "IS the whole set" at `K-2`\'s own '
    + 'return (`kernel-surface.md §2.1` item 2; `§3` item 10) and the only write whose set it carries is '
    + 'the one that failed — so no entry of the member is one this arm leaves standing. FAIL-STATE '
    + 'DISTINGUISHED: a member cleared whole, `record.pending = []`, which is WITHDRAWN BY NAME as the '
    + 'SECOND, UNLAWFUL REMOVAL — it is the same reading here and NOT the same rule, which is why this '
    + 'assertion is read off the SET RELATION above and never off the emptiness — read `pending` '
    + JSON.stringify(record.pending.length) + ' of `triggered` ' + record.triggered.length);
  assert.equal(carriesHandle(record.pending, ownHandle), false,
    'AND EVERY HANDLE OF THE FAILED WRITE\'S OWN RETURNED SET LEAVES THE MEMBER: the discard "acts on '
    + 'that write\'s own returned set and reaches EVERY handle of it — so every entry of that write '
    + 'leaves the member by the DISCARD, no handle of that write being invoked by either layer" — and '
    + 'this registration\'s handle is such a handle, returned by THIS write even though no pass of this '
    + 'attempt evaluates its pair, so the discard reaches it and NOTHING may leave it standing — read '
    + `\`pending\` ${record.pending.length}`);
  // ── AND THE "EXACTLY ONE REMOVAL PER ARM" READING IS CARRIED BY THE SET RELATION ABOVE, IN BOTH ───
  //    DIRECTIONS, AND NOT BY A TRAILING EXPRESSION THAT ASSUMED A SURVIVOR: the member's own entries
  //    are asserted to be of the failed write's returned set (every handle of it gone, `:208`–`:238`),
  //    and the relation is read over the stored set — "THE DISCARD removes the failed write's own
  //    returned set and nothing beside it" (`§2.4` item 8 (i) (5)) — so a member from which an entry of
  //    ANOTHER write had been subtracted is caught by THAT relation. A `record.triggered.filter((h) =>
  //    h !== ownHandle)` residue — the withdrawn premise's own spelling, a member keeping `ancestorHandle`
  //    STANDING — is not re-derivable here: it contradicts this cell's re-derived assertions two lines
  //    above, this fixture's two handles being distinct (`:163`) and no pass reaching the ancestor pair
  //    (`:185`), so it asserted the very withdrawal the by-set law withdraws. REMOVED AT THIS CELL-REPAIR
  //    PASS AND NOT RE-SPELLED — no weaker replacement stands in its place.
  // **⟶ RE-DERIVED 2026-10-18: THE SET IS THREE (see the cell above), READ AS A SET AND NEVER AS A SEQUENCE**
  // (`DD-22`; `§2.7` item 3). **THE CLAIM — *"the failing arm reads `triggered` as the store's returned set
  // VERBATIM"* (`attempt-lifecycle.md §2.4` item 8 (i) (5)) — IS UNMOVED, and it is asserted as a
  // MEMBERSHIP at every identity the store answered with, which is stronger than a positional equality.**
  // **⟶ AND THE THIRD MEMBER IS NAMED BY THE PAIR'S OWN `id` 2026-10-24 (`D-22`/`D-23`/`D-24`), not by a
  // `constraint@` spelling — the prefix is DISCARDED and the handle the kernel occupies with is the
  // caller's own `id`.** A `find((h) => h.startsWith('constraint@'))` answers `undefined` on this tree, and
  // `undefined` in a sorted equality is exactly the vacuous survivor the cell's own comment forbids.
  assert.deepEqual(setHandles(record.triggered).slice().sort(), [ancestorHandle, ownHandle, 'x'].sort(),
    'AND `triggered` STANDS AS THE STORE\'S OWN RETURNED SET, VERBATIM: "the failing arm reads '
    + '`triggered` as the store\'s returned set VERBATIM" (`§2.4` item 8 (i) (5)) — the discard empties '
    + 'the OTHER member and moves nothing of this one');
  assert.equal(root.seen.length, 0,
    'AND THE EARLIER WRITE\'S BODY WAS REACHED BY NOTHING ACROSS THIS WHOLE DRIVE — NOT BY ANY LAYER '
    + 'THE KERNEL RUNS AND NOT BY THE STORE\'S OWN DELIVERY EITHER: no pass of this attempt evaluates a '
    + 'pair at an ancestor address (`§2.4` item 5 (iv); `kernel-surface.md §2.3` item 1), so this count '
    + 'is a store-delivery reading alone; the registration was placed AFTER the write that landed its '
    + 'own home entry and that write\'s returned set therefore carries no entry for it (asserted at '
    + '`:167` above), and THIS write — the kernel-driven one — delivered nothing in its window (instant '
    + '(a); `A116` (D1)) and then FAILED, so its residue reached no handle by the discard '
    + '(`attempt-lifecycle.md §2.4` item 8 (i) (5): "no handle of that write being invoked by either '
    + 'layer"). FAIL-STATE DISTINGUISHED: a kernel act that ran this body — read '
    + `${root.seen.length} call${root.seen.length === 1 ? '' : 's'} across the whole drive — and the `
    + 'arm\'s own discard, whose extent is the failed write\'s returned set, is read ABOVE and never off '
    + 'this count');

  let loopInvocations = 0;
  for (const _handle of record.pending) loopInvocations += 1;
  assert.equal(loopInvocations, 0,
    'AND THE CALLER MEETS A THROW INSTEAD OF A RETURN, SO ITS LOOP TAKES NO INVOCATION OF ITS OWN: '
    + '"ON A THROWING ARM THE CALLER\'S LOOP PERFORMS NO INVOCATION FOR ANY HANDLE THIS MEMBER CARRIES" '
    + '(`§2.1` item 2; `§3` item 11: "the caller\'s loop performs NO invocation because it meets a THROW '
    + 'instead of a return, WHATEVER the member carries") — read `pending` '
    + JSON.stringify(record.pending.length) + '. AND THE TWO OBSERVABLES ARE DISTINCT HERE AND ARE READ '
    + 'APART: the count above is the THROW\'s and this member is empty by the DISCARD\'s extent, so the '
    + 'arm is emptied "by the DISCARD and never by a check-off" and never by an arm reaching the loop with '
    + 'nothing left (`§2.1` item 2\'s throwing-arm clause). FAIL-STATE DISTINGUISHED: an arm whose discard '
    + 'reached only the pairs its pass evaluated, leaving a member a caller would read as work still owed');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `NEG-DM-02` — THE PASS THAT EXITS AT A REPAIR: THE UNEVALUATED HANDLE *OF THE FAILED WRITE* IS
//              REACHED BY THE DISCARD, AND SO IS THE PREFIX HANDLE THAT WRITE RETURNED
//
// ⟶ RE-DERIVED AT THIS BY-SET PASS, ON THE SAME PREMISE AS `NEG-DM-01` ABOVE: the prefix registration's
// handle is one the FAILING WRITE'S OWN RETURNED SET CARRIES (its `triggered` holds it for this write),
// so it LEAVES with every other handle of that set (`attempt-lifecycle.md §2.4` item 8 (i) (5); `§3`
// item 8). The earlier cell's premise — the registration's AUTHOR — is no discriminator the law carries:
// `kernel-surface.md §2.1` item 2 names "filtering by the write's author" a `SIFT` and declares it
// UNLAWFUL. What this cell still distinguishes, and what no other cell of this file drives, is the
// PASS-vs-DISCARD edge: the pair whose pass was interrupted at its terminal arm has no check-off at all,
// while the pair the pass DID evaluate and pass on its second evaluation left by its own check-off
// (`:310` below) — both edges read off the same fixture's own log.
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_neg_dm_02_pass_exits_at_repair_unevaluated_handle', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const ancestor = [tag('dm02a')];
  const own = [...ancestor, tag('dm02o')];
  store.write(ancestor, 'mem', { seed: 'the ancestor home entry stands' });

  let p1Runs = 0;
  let p2Runs = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1 — AND `3-bis` MAKES IT MANDATORY: this body carries a `repair`, so an
  // unshielded registration ATTEMPTS it and consumes `p1Runs === 1`, which is the state this cell's own one
  // repair-window reads.
  register(store, own, 'p1', passAtRegistration(() => {
    p1Runs += 1;
    if (p1Runs === 1) {
      return {
        // **⟶ THE FIFTH POSITION, 2026-10-18** — *"A repair function IS RETURNED BY THE CONSTRAINT THAT
        // TRIGGERED IT and IS PASSED THE COMMIT IT IS PART OF, so ITS OWN WRITE JOINS THAT COMMIT AS A NEW
        // ENTRY"* (`docs/specs/storeroom-js/surface.md §2.11` clause 6; `PAR-C-7`, `A110`). **The as-filed
        // four-position call opened a SECOND attempt at an address this one holds and was refused.**
        repair: (rctx) => ({
          ok: true,
          message: 'p1 was repaired at the attempt\'s own address',
          op: store.write(own, 'mem', 'fixed', rctx).op,
        }),
        message: 'p1 is invalid on the committed value',
      };
    }
    return true;
  }));
  register(store, own, 'p2', passAtRegistration(() => { p2Runs += 1; return { message: 'p2 is invalid and registers no repair' }; }));

  const root = countingListener();
  const ancestorHandle = listenAndRegister(store, ancestor, root);
  const ownListener = countingListener();
  const ownHandle = listenAndRegister(store, own, ownListener);
  const ownBeforeCommit = ownListener.seen.length;

  const record = commit(store, own, 'mem', 'v');
  assert.equal(carriesHandle(record.triggered, ancestorHandle), true,
    'the write\'s returned set carries the earlier write\'s handle');
  assert.equal(carriesHandle(record.triggered, ownHandle), true,
    'and this write\'s own registration\'s handle — the one whose pair the pass may never reach');
  assert.equal(carriesHandle(record.pending, ancestorHandle), true,
    'and at `K-2`\'s return the member is the whole returned set, sift-free');
  assert.equal(carriesHandle(record.pending, ownHandle), true,
    'with this write\'s own registration\'s handle standing in it beside the earlier write\'s');
  assert.equal(p1Runs, 0, 'no pair body has run at `K-2`\'s return: the pass is `K-3`\'s');
  assert.equal(p2Runs, 0, 'and neither has the pair standing behind this write\'s own registration');
  // ── ⟶ RE-DERIVED AT THE `A116` ORDERING-SEAM PASS (2026-10-15) AT THE INSTANT THAT MOVED: this
  //    commit is KERNEL-DRIVEN, so instant (a) withheld its in-window invocation BEFORE the store's
  //    verb was called (`surface.md §2.4` item 9; `A116` (D1)–(D2); `§2.7` item 7) — the two counts
  //    below are read at the window's own close and are the EMPTY IN-WINDOW SET `PAR-JS-19` declares.
  //    THE ARM'S OWN LATER INVOCATION — the REPAIR'S write, which is the caller's own code running a
  //    store verb — is measured where it stands, below `runAttempt`. ────────────────────────────────
  assert.equal(ownListener.seen.length - ownBeforeCommit, 0,
    'AND THE PLAIN REGISTRATION\'S IN-WINDOW INVOCATION SET IS EMPTY: the write this `K-2` issued was '
    + 'adopted at instant (a) before the store\'s write verb was called, so the package\'s post-verb '
    + 'invocation reaches NO handle of that write and NO layer of the kernel\'s ran this body either '
    + '(`surface.md §2.4` item 9\'s instant (a); `kernel-surface.md §2.1` item 2 (ii); `§2.2` item 2) — '
    + `read ${ownListener.seen.length - ownBeforeCommit} in-window invocation(s). FAIL-STATE `
    + 'DISTINGUISHED: a delivery still made inside the verb\'s window');
  assert.equal(root.seen.length, 0,
    'and the earlier write\'s registration is reached by nothing in that window either — for the same '
    + 'instant, and because no pass of this attempt evaluates a pair at an ancestor address (`§2.4` item '
    + `5 (iv)) — read ${root.seen.length}`);

  const outcome = capture(() => runAttempt(store, record));
  assert.equal(outcome.threw, true,
    'the attempt fails: `p2`\'s first evaluation meets a violation with no repair registered for its '
    + 'pair (arm (c)); `p1`\'s repair landed and `p1` passed on the re-run');
  // ── **⟶ RE-DERIVED 2026-10-16 (`role_test_writer`) FOR THE TEMPORAL STOP: THE TOKEN MOVES `KC-3` →
  // `KC-8`; THE CELL'S OWN SUBJECT IS KEPT.** The pass's own exit is UNMOVED and is read at the check
  // list below (it still exits twice and still reaches `p2` only on its second evaluation), and the pair
  // counts below are unchanged. **What moved is which clause governs the CALLER'S token: the composition
  // now MEETS the store's floor**, because the first per-op call reverses only the newer op and leaves it
  // compacted, so the second call over the still-owed older op fails `M-6` all-or-nothing —
  // `write-and-read.md §6.4` item 1's `M-5` amendment (a) (ii) and item 3's `M-7` amendment, both
  // 2026-10-16. **`composition-and-states.md §2.6` item 6 (a) rules the precedence once and by name:
  // "THE FLOOR GOVERNS — this clause's rule is applied to EVERY path on which the attempt's own
  // composition meets the floor", and "the attempt has ONE `outcome` ENTRY, ITS `state` IS THIS ITEM'S
  // `KC-8` ... and NO SECOND ENTRY IS APPENDED".**
  // ── **⟶ RE-DERIVED 2026-10-26 TO THE RULING AND NOT TO THE BYTES — `strata/decisions.md` · `D-40`
  // (2026-10-26), VERBATIM: *"A failing repair triggers a rollback like a constraint rejection."* THE
  // DIRECTION THIS EXPECTATION MOVED: `KC-3` → `KC-8` on 2026-10-16 (the two-call walk met the floor), and
  // `KC-8` → `KC-3` here, because `D-40`'s composition is ONE call over the attempt's first op: the floor is
  // NOT met, and the caller's token is the arm the pass itself exited on — arm (c).**
  assert.equal(outcome.thrown.status, KC[3],
    'the pass exits at arm (c) — asserted at the check list below, which is unmoved — and the CARRIER '
    + 'reads that arm\'s own token, the composition\'s one floor call having performed the reversal '
    + '(`D-40`, 2026-10-26): read ' + JSON.stringify(outcome.thrown.status));
  // **AND THE FLOOR STATE BESIDE THE TOKEN**: the attempt leaves its own address exactly as it found it.
  let dm02Floor;
  try {
    dm02Floor = { present: true, value: store.read(own) };
  } catch (refused) {
    dm02Floor = { present: false, code: refused.status };
  }
  assert.equal(dm02Floor.present, false,
    'AND THE STORE ANSWERS THE STATE THAT STOOD BEFORE THE ATTEMPT (`D-40`, 2026-10-26: *"a failed attempt '
    + 'leaves the store exactly as it found it"*) — nothing stood at this address before the attempt, so '
    + 'the store\'s own `AddressNotFound` is the answer — read ' + JSON.stringify(dm02Floor));
  assert.equal(dm02Floor.code, 'AddressNotFound',
    'and names that absence with its own code (`§2.6` item 8 (iii)) — read ' + JSON.stringify(dm02Floor.code));
  assert.deepEqual(checkIds(outcome.thrown.log), ['p1', 'p1', 'p2'],
    'THE PASS EXITED TWICE AND REACHED `p2` ONLY ON ITS SECOND EVALUATION: `p1` was evaluated once on the '
    + 'committed op, its repair landed, and the pass returned to `EVALUATING` over that op\'s landing, '
    + 'where `p1` was evaluated again and `p2` was reached and violated (`§2.4` item 4\'s arms (b)–(c); '
    + 'item 5 (ii)\'s sequencing rule) — read ' + JSON.stringify(checkIds(outcome.thrown.log)));
  assert.equal(p2Runs, 1,
    'so the pair standing behind this write\'s own registration\'s handle RAN — once, in the pass, which '
    + 'is NOT a check-off of that handle: "ONE DELIVERY PER EVALUATED PAIR, EACH CARRYING THAT PAIR\'S '
    + 'OWN FUNCTION" (`§2.1` item 2), whose pass then reaches a terminal arm');
  // ⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE REPAIR'S OWN LANDING IS *DISCARDED*, SO IT DELIVERS
  // NOTHING — THE AS-FILED `1` COUNTED A DELIVERY THE `A112` DISCARD WITHHOLDS. The clause at its own bytes:
  // *"the failing arm reads `triggered` as the store's returned set VERBATIM"* and *"no handle of that write
  // being invoked by either layer"* (`attempt-lifecycle.md §2.4` item 8 (i) (5), the discard rule's one home;
  // `§2.2` item 2). **THE CELL'S SUBJECT IS UNMOVED** and is now asserted at the answer the discard gives it;
  // **the as-filed `1` would have been GREEN against a build that delivered a discarded set. AND THE STRONGER
  // HALF STANDS BESIDE IT: the repair's write DID land its op — `p1` passes on the re-run at `p2Runs === 1`
  // above — so this zero is the DISCARD's act and not an absence of any write.**
  assert.equal(ownListener.seen.length - ownBeforeCommit, 0,
    'AND THE FAILING ARM DELIVERED NO INVOCATION: the committed write\'s window delivered nothing (instant '
    + '(a)), the repair\'s own write LANDED its op, and the residue that write triggered LEAVES BY THE '
    + 'DISCARD and is delivered by nothing (`attempt-lifecycle.md §2.4` item 8 (i) (5): "no handle of that '
    + 'write being invoked by either layer"; `§2.2` item 2) — read '
    + `${ownListener.seen.length - ownBeforeCommit} call(s) of ${0} owed on a failing arm`);
  // **⟶ RE-DERIVED 2026-10-18 WITH THE LINE ABOVE** — the ancestor registration is read at NO delivered
  // call on this arm, for the same DISCARD reason. **THE CLAUSE THE LINE CITES IS UNMOVED AND IS THE STRONGER
  // READING:** no pair at an ancestor address enters any pass (`§2.4` item 5 (iv)), and the ancestor's
  // handle additionally leaves by the discard, so the two readings agree rather than compete.
  assert.equal(root.seen.length, 0,
    'and the earlier write\'s registration is read at NO delivered call: no pair at an ancestor address '
    + 'enters any pass (`§2.4` item 5 (iv)), and the handle that write returned leaves by the DISCARD '
    + '(`§2.4` item 8 (i) (5)) — read ' + `${root.seen.length}`);

  // ── THE ARM'S OWN EXTENT, ON THE ONE FIXTURE THE TWO KINDS SHARE ─────────────────────────────────
  assert.equal(carriesHandle(record.pending, ownHandle), false,
    'A HANDLE OF THE FAILED WRITE\'S OWN RETURNED SET LEAVES THE MEMBER ON THIS ARM: this '
    + 'registration\'s handle was returned by the write that FAILED, so `§2.4` item 8 (i) (5)\'s discard '
    + '"acts on that write\'s own returned set and reaches EVERY handle of it" — the discard is NOT '
    + 'scoped to the handles no pass evaluated, and it is NOT scoped to the pairs the pass checked off: '
    + 'it is scoped BY THE WRITE THAT RETURNED EACH HANDLE — read `pending` '
    + JSON.stringify(record.pending.map(String)));
  assert.equal(carriesHandle(record.pending, ancestorHandle), false,
    'AND THE PREFIX REGISTRATION\'S HANDLE LEAVES TOO, ON THE ONE DISCRIMINATOR THE LAW CARRIES: it is a '
    + 'member of THIS write\'s returned set (`triggered` holds it — asserted at `:261` above), so the '
    + 'discard "acts on that write\'s own returned set and reaches EVERY handle of it" '
    + '(`attempt-lifecycle.md §2.4` item 8 (i) (5); `§3` item 8: "every entry of that write leaves the '
    + 'member by the DISCARD"; `kernel-surface.md §2.1` item 2: "EVERY HANDLE OF THAT WRITE LEAVES THE '
    + 'MEMBER BY THE DISCARD … AND NO HANDLE OF THAT WRITE IS DELIVERED"). WHAT THE CLAUSE MEANS BY "AN '
    + 'ENTRY FOR A HANDLE OF ANY OTHER WRITE STANDS" IS THEREFORE AN ENTRY THE FAILED WRITE DID NOT '
    + 'RETURN — the prefix handle was returned by the earlier write too, and THAT is no reason for it to '
    + 'stand, the law fixing an entry\'s fate by THE SET IT CAME BACK IN and never by the registration\'s '
    + 'author (`kernel-surface.md §2.1` item 2 declares the author-filtered reading a `SIFT`, UNLAWFUL) — '
    + 'read `pending` ' + record.pending.length);
  assert.deepEqual(record.pending.filter((h) => carriesHandle(record.triggered, h)), [],
    'AND THE ARM\'S EXTENT IS READ AS THE SET RELATION AND NOT AS A COUNT OF REMOVALS: NO HANDLE OF THE '
    + 'FAILED WRITE\'S OWN RETURNED SET SURVIVES IT — `pending` after the arm is the returned set minus '
    + 'the handles of the write that failed and nothing beside it (`attempt-lifecycle.md §2.4` item 8 (i) '
    + '(5): "THE DISCARD removes the failed write\'s own returned set and nothing beside it"; `§3` item 8: '
    + '"the failing arm reads `triggered` as the store\'s returned set VERBATIM") — so the entries of '
    + '`triggered` still standing in `pending` are NONE, read '
    + JSON.stringify(record.triggered.filter((h) => carriesHandle(record.pending, h)).length) + '. FAIL-STATE '
    + 'DISTINGUISHED: a member cleared whole (a different rule over the same reading, WITHDRAWN BY NAME '
    + 'as the SECOND, UNLAWFUL REMOVAL) and a subtraction scoped by the pass, by the pair, or by the '
    + 'registration\'s AUTHOR rather than by the write that returned the handle');
  // **⟶ RE-DERIVED 2026-10-18: THE SET IS THREE (see the cell above), READ AS A SET AND NEVER AS A SEQUENCE**
  // (`DD-22`; `§2.7` item 3). **THE CLAIM — *"the failing arm reads `triggered` as the store's returned set
  // VERBATIM"* (`attempt-lifecycle.md §2.4` item 8 (i) (5)) — IS UNMOVED, and it is asserted as a
  // MEMBERSHIP at every identity the store answered with, which is stronger than a positional equality.**
  // **⟶ AND THE THIRD MEMBER IS NAMED BY THE PAIR'S OWN `id` 2026-10-24 (`D-22`/`D-23`/`D-24`), not by a
  // `constraint@` spelling — the prefix is DISCARDED and the handle the kernel occupies with is the
  // caller's own `id`.** A `find((h) => h.startsWith('constraint@'))` answers `undefined` on this tree, and
  // `undefined` in a sorted equality is exactly the vacuous survivor the cell's own comment forbids.
  // **⟶ AND THE PAIR ENTRIES ARE THE `id`s THIS FIXTURE REGISTERED — `p1` AND `p2` — NOT A `constraint@`
  // SPELLING, 2026-10-24 (`D-22`/`D-23`/`D-24`).** The cell registers TWO pairs at the write's own address, so
  // the returned set carries TWO pair entries beside the two caller-spelled listener entries: `D-24`'s
  // instance-scoped handle means one `id` per pair, and the prefix's per-address spelling — which made the two
  // pairs ONE entry — is DISCARDED.
  assert.deepEqual(setHandles(record.triggered).slice().sort(), [ancestorHandle, ownHandle, 'p1', 'p2'].sort(),
    'and `triggered` stands as the store\'s returned set VERBATIM — the discard does not reach it');
  // ⟶ RE-DERIVED 2026-10-18 (`role_test_writer`): THE REPAIR'S OWN LANDING IS *DISCARDED*, SO IT DELIVERS
  // NOTHING — THE AS-FILED `1` COUNTED A DELIVERY THE `A112` DISCARD WITHHOLDS (`attempt-lifecycle.md §2.4`
  // item 8 (i) (5): *"no handle of that write being invoked by either layer"*; `§2.2` item 2). **THE CELL'S
  // SUBJECT IS UNMOVED** and is now asserted at the answer the discard gives it — **the as-filed `1` would have
  // been GREEN against a build that delivered a discarded set, which is exactly the failure that clause
  // forbids. AND THE STRONGER HALF STANDS BESIDE IT: the repair's write DID land its op, so this zero is the
  // DISCARD's act and not an absence of any write.**
  assert.equal(ownListener.seen.length - ownBeforeCommit, 0,
    'AND THE FAILING ARM DELIVERED NO INVOCATION: the committed write\'s window delivered nothing (instant '
    + '(a)), the repair\'s own write LANDED its op, and the residue that write triggered LEAVES BY THE '
    + 'DISCARD and is delivered by nothing (`attempt-lifecycle.md §2.4` item 8 (i) (5); `§2.2` item 2) — '
    + `read ${ownListener.seen.length - ownBeforeCommit} call(s) of ${0} owed on a failing arm`);
  // **⟶ RE-DERIVED 2026-10-18 WITH THE LINE ABOVE** — the ancestor registration is read at NO delivered
  // call on this arm, for the same DISCARD reason. **THE CLAUSE THE LINE CITES IS UNMOVED AND IS THE STRONGER
  // READING:** no pair at an ancestor address enters any pass (`§2.4` item 5 (iv)), and the ancestor's
  // handle additionally leaves by the discard, so the two readings agree rather than compete.
  assert.equal(root.seen.length, 0,
    'and the earlier write\'s registration is read at NO delivered call: no pair at an ancestor address '
    + 'enters any pass (`§2.4` item 5 (iv)), and the handle that write returned leaves by the DISCARD '
    + '(`§2.4` item 8 (i) (5)) — read ' + `${root.seen.length}`);
  // ⟶ RE-DERIVED 2026-10-18 WITH THE TWO LINES ABOVE: BOTH bodies are read at their snapshot, because the
  // repair's own landing leaves by the DISCARD and invokes neither (`attempt-lifecycle.md §2.4` item 8 (i) (5)).
  assert.equal(ownListener.seen.length, ownBeforeCommit,
    'and the two registrations\' counts agree: NEITHER body was invoked after that snapshot, the caller\'s '
    + 'own repair write having landed an op whose triggered set the DISCARD withholds from both layers');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `NEG-DM-03` — THE NESTED `K-2` FROM A BODY THE PASS REACHES: THE HELD ADDRESS REFUSES `KC-7` AND A
//              DESCENDANT ADDRESS IS ADMITTED, BOTH READ WHILE THE OUTER ATTEMPT STANDS
// ═══════════════════════════════════════════════════════════════════════════════════════════════
//
// ▸ RE-DERIVED AT THIS PASS ON TWO PROOFS, BOTH CHECKABLE AT THIS CELL. THE CELL'S SUBJECT IS UNMOVED —
//   THE HELD ADDRESS'S NESTED-WRITE ADMISSION — AND THE INSTANT IT IS READ AT MOVES, BECAUSE THE INSTANT
//   THIS CELL WAS ONCE WRITTEN AT NO LONGER EXISTS AT THIS SURFACE.
//
//   (1) THE WITHDRAWN HALF, NAMED AND NOT RE-ASSERTED: this cell's premise once was "A LISTENER BODY
//       STOOD INSIDE `K-2`'S OWN WINDOW". `A115` (D2) WITHDRAWS THE ENTRY'S IN-WINDOW INVOCATION for the
//       handles a kernel evaluation set carries ("`bindings/js/index.mjs`'s `write`/`delete` no longer
//       invokes registered bodies inside the store verb's window"), and `A116` (D1) (a) re-pins the arm
//       that carries it ("BEFORE the store's write verb is called … the entry … WITHHOLDS its in-window
//       invocation"): `surface.md §2.7` item 7 states the replacement — THE PACKAGE'S DELIVERY "DOES
//       **NOT** OCCUR INSIDE THE STORE VERB'S WINDOW: IT FOLLOWS THE PASS, AND ITS INSTANT IS THE PASS'S
//       TERMINAL ARM". A LISTENER BODY THEREFORE CANNOT STAND INSIDE `K-2`'S WINDOW AT ALL, AND NO DRIVE
//       OF THIS SURFACE CAN PRODUCE ONE. THE IMPLEMENTER'S FOUR-CELL MEASUREMENT IS REPRODUCED AT THE
//       CELL BELOW AND NOT TAKEN ON REPORT: `bodyCalls` reads `0` when the outer `commit` returns, with
//       the write's returned set standing WHOLE in `pending` and its bodies returned. THE OLD PREMISE IS
//       WITHDRAWN BY NAME — NOT WEAKENED, NOT SILENTLY DROPPED, AND NOT RE-ASSERTED.
//
//   (2) THE SUBJECT'S OWN INSTANT, AT A BODY THE LAW DOES REACH: `A113` (D2) pins the hold at `K-2`'S OWN
//       ACT AND BEFORE THE STORE'S WRITE VERB, and `kernel-surface.md §2.1` item 2 releases it ONLY by
//       "THE ATTEMPT THAT CALL OPENED REACHES ITS TERMINAL ARM" — SO THE HOLD IS OPEN FOR THE WHOLE PASS.
//       What stands inside that window is A BODY THE PASS ITSELF INVOKES: the constraint body of the pair
//       registered at the attempt's own address, reached by the kernel's own layer (a) evaluation
//       (`attempt-lifecycle.md §2.4` item 8 (ii) (e) and (g) term (1) — "the only invocation window that
//       can stand inside `K-2` is the SURFACE's", that window here being THE ATTEMPT'S OWN, whose hold is
//       taken at `K-2`'s act; `kernel-surface.md §2.3` item 1's atomic landing evaluation). THE NESTED
//       `K-2`s ARE RAISED FROM THAT BODY, and the falsifier's two limbs are read AT THAT INSTANT: THE
//       HELD ADDRESS REFUSES `KC-7`, A DESCENDANT ADDRESS IS ADMITTED. THE ASYMMETRY IS NOT WEAKENED:
//       both limbs are read at ONE instant of the outer attempt's live window, and the held address's
//       refusal is taken AGAIN after the nested attempt has opened, run and resolved — so the descendant's
//       admission is read as the law's own asymmetry and never as a hold that lapsed under it.
//
//   THE INSTANTS THE LAW DOES NOT REACH, NAMED SO NONE IS CHASED: (i) `K-2`'S OWN WINDOW reaches no
//   listener body (the withdrawal above); and (ii) THE PASS'S TERMINAL ARM — the seam's own delivery
//   instant — CARRIES NO ASYMMETRY: that arm is the attempt's own disposal, the hold is released before
//   the seam is called (`src/constraint-kernel.mjs`: `close`'s `release` precedes `settleArm`; `§2.1`
//   item 2: the hold "IS RELEASED BY THE ATTEMPT'S OWN TERMINAL ARM AND BY NO OTHER ACT"), so BOTH nested
//   calls are admitted there and the second one's write LANDS. THE HOLD'S OWN INSTANT IS NOT THE CAUSE
//   AND IS NOT MOVED: it governs only WHICH nested write is admitted, which is exactly what this cell
//   reads.
test('ck_neg_dm_03_nested_K2_from_a_body_the_pass_reaches_held_address_refused_and_descendant_admitted', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const rootAddress = [tag('dm03r')];
  const outerAddress = [...rootAddress, tag('dm03o')];
  const descendantAddress = [...outerAddress, tag('dm03d')];
  store.write(rootAddress, 'mem', { seed: { container: 'the root home entry stands as a container' } });

  // ── THE WITHDRAWAL'S OWN OBSERVER — A PLAIN BODY AT A PROPER PREFIX OF THE WRITE UNDER TEST ──────
  // Its handle IS a member of that write's returned set (the store's trigger selection is
  // prefix-inclusive), so this is exactly the registration the cell's WITHDRAWN premise once placed
  // inside `K-2`'s window. IT IS KEPT AS THE WITHDRAWAL'S OWN MEASUREMENT — never as an assertion that
  // it stands in the window, which is the half `A115` (D2) / `A116` (D1) (a) withdraw.
  let bodyCalls = 0;
  const listenerHandle = listenAndRegister(store, rootAddress, () => { bodyCalls += 1; });

  // ── THE BODY THE PASS ITSELF REACHES: THE CONSTRAINT BODY OF THE PAIR AT THE HELD ADDRESS ───────
  // It is invoked by the kernel's own layer (a) evaluation, inside the pass, while the attempt stands
  // and its address is held (`attempt-lifecycle.md §2.4` item 8 (ii) (e)/(g) term (1);
  // `kernel-surface.md §2.3` item 1) — THE ONE BODY THAT STANDS INSIDE THIS ATTEMPT'S OWN WINDOW.
  let pairRuns = 0;
  let heldAgain = null;
  let heldAfter = null;
  let nested = null;
  let nestedThrow = null;
  let nestedReport = null;
  let nestedPendingAtReturn = null;
  let bodyCallsAtNestedReturn = null;
  // ⟶ `A135` (3) / `§7.3` (b) state 1: THIS CELL'S GUARD READS *"a later evaluation of this pair is not this
  // cell's subject"* OFF `pairRuns`, AND THE REGISTRATION IS AN EVALUATION THE CELL DID NOT DRIVE — so
  // unshielded it would consume run 1, the nested `commit` this body issues would never execute, and the
  // asymmetry the cell reads would be measured at the registration. The shield answers the registration
  // `true` (state 1) and lets every LANDING reach this body, so run 1 is the OUTER pass's own first (run 2 is
  // the nested attempt's pass at the descendant, `D-56` — see the asks asserted below).
  // **⟶ AND THE ASKS THIS PAIR RECEIVES ARE RECORDED BY THE ADDRESS EACH ONE WAS HANDED, 2026-10-29 (`D-56`).**
  // The pass at the outer address asks it, AND the NESTED attempt's own pass at the DESCENDANT asks it too —
  // the ancestor is at or above that act's address — so the list below is the cell's own measurement of the
  // widening rather than an assumption about it.
  const pairAsks = [];
  register(store, outerAddress, 'a', atLandingOnly((context) => {
    pairRuns += 1;
    pairAsks.push(context.address.slice());
    // THE GUARD IS THE FIXTURE'S AND NOT THE CLAUSE'S: a later evaluation of this pair is not this
    // cell's subject, and the drive reads the FIRST pass's own acts alone.
    if (pairRuns > 1) return true;
    // LIMB ONE — THE HELD ADDRESS, FROM THIS BODY, WHILE THE OUTER ATTEMPT STANDS.
    heldAgain = capture(() => commit(store, outerAddress, 'mem', { seed: 'the second commit at the held address' }));
    // LIMB TWO — A DESCENDANT ADDRESS OF THE HELD ONE, AT THE SAME INSTANT.
    const attempt = capture(() => commit(store, descendantAddress, 'mem', 'the nested write'));
    if (attempt.threw) nestedThrow = attempt.thrown; else nested = attempt.value;
    bodyCallsAtNestedReturn = bodyCalls;
    if (nested !== null) {
      nestedPendingAtReturn = nested.pending.slice();
      nestedReport = capture(() => runAttempt(store, nested));
    }
    // LIMB ONE AGAIN, AFTER THE NESTED ATTEMPT HAS OPENED, RUN AND RESOLVED — so the asymmetry is read
    // as the law's own and not as a hold that lapsed under the nested acts.
    heldAfter = capture(() => commit(store, outerAddress, 'mem', { seed: 'a third commit at the held address' }));
    return true;
  }));
  register(store, descendantAddress, 'b', () => true); // passes every context, the registration's included

  const outer = capture(() => commit(store, outerAddress, 'mem', { seed: 'the outer write' }));
  // THE OUTER WRITE'S OWN VALUE AT THE HELD ADDRESS, read back through the store's own verb: the baseline
  // the refused call's landing would have moved (`§2.1` item 2's "the store sees no write at all").
  const heldValueBefore = store.read(outerAddress);
  assert.equal(heldValueBefore.seed, 'the outer write',
    'the fixture\'s own write landed at the held address, so the address the live attempt holds carries '
    + 'THIS WRITE\'S value and no other at that member — read ' + JSON.stringify(heldValueBefore.seed));

  // ── THE WITHDRAWN HALF, NAMED AND MEASURED AT THIS CELL — ITS OLD ASSERTION STOOD HERE AND IS GONE ─
  assert.equal(outer.threw, false,
    'the outer `K-2` returned: the fixture\'s own acts inside its window do not fail it');
  assert.equal(bodyCalls, 0,
    'NO LISTENER BODY STOOD INSIDE THIS WRITE\'S WINDOW, AND THAT HALF IS WITHDRAWN BY NAME: `A115` (D2) '
    + 'withdraws THE ENTRY\'S IN-WINDOW INVOCATION for the handles a kernel evaluation set carries and '
    + '`A116` (D1) (a) re-pins it, `surface.md §2.7` item 7 stating the replacement — the package\'s '
    + 'delivery "DOES **NOT** OCCUR INSIDE THE STORE VERB\'S WINDOW: IT FOLLOWS THE PASS, AND ITS INSTANT '
    + 'IS THE PASS\'S TERMINAL ARM" — so the registration standing at a PROPER PREFIX of this write was NOT '
    + 'reached before the verb call returned. THE IMPLEMENTER\'S FOUR-CELL MEASUREMENT IS REPRODUCED HERE: '
    + `read ${bodyCalls} body call${bodyCalls === 1 ? '' : 's'} at this write's return`);
  assert.deepEqual(Object.keys(outer.value).sort(), ['attempt', 'op', 'pending', 'triggered'],
    'and the record the write answered with is the kernel\'s own FOUR-member `CommitRecord` (`§2.1` item 2)');
  assert.equal(carriesHandle(outer.value.triggered, listenerHandle), true,
    'AND THE WRITE RETURNED THE PREFIX REGISTRATION\'S HANDLE: the body EXISTS and was returned FOR this '
    + 'write, which is what makes its silence in-window a WITHDRAWAL and not an empty set (`§2.1` item 2\'s '
    + 'prefix-test citation — the store\'s own trigger selection is prefix-inclusive)');
  assert.deepEqual(outer.value.pending, outer.value.triggered,
    'and at `K-2`\'s return the member IS the whole returned set — no pass has run (`A113` (D3); `§3` item '
    + '10) — so nothing was subtracted in place of the withheld invocation');

  // ── THE PASS RUNS THE NESTED ACTS: THE BODY THE SURFACE DOES REACH, WHILE THE HOLD IS OPEN ───────
  const outerReport = capture(() => runAttempt(store, outer.value));
  // **⟶ RE-DERIVED 2026-10-29 — THE COUNT IS TWO AND THE TWO ARE NAMED BY THEIR OWN ADDRESSES (`D-56`).**
  // **WHAT STOOD HERE** read *"THE PASS INVOKED THE PAIR'S OWN BODY — ONCE, in the pass … read `pairRuns` pass
  // invocation"* — and it was TRUE while the pass's set was the pairs at the attempt's address ALONE. **THE
  // ARCHITECT SUPERSEDED THAT SET**: *"A listener/constraint should fire when the descendants of its targeted
  // address node change, because the descendants become part of the object that is read from that address"*,
  // so the pair at `outerAddress` is asked by BOTH passes this drive owns: **the outer pass at `outerAddress`
  // (the pair's own address) AND the NESTED attempt's pass at `descendantAddress`, whose act stands BELOW
  // it.** **THE CELL'S SUBJECT IS UNMOVED**: the first invocation — the one whose body issues the two nested
  // calls — is the OUTER pass's, and the assertions below still read the acts taken there. Nothing was
  // weakened; the count is the widening.
  assert.deepEqual(pairAsks.map((one) => one.join('/')), [outerAddress.join('/'), descendantAddress.join('/')],
    'THE PAIR AT THE OUTER ADDRESS IS ASKED BY THE OUTER PASS AND BY THE NESTED PASS AT ITS DESCENDANT, in '
    + 'that order and by no third ask — read ' + JSON.stringify(pairAsks) + '. The first is the pass at the '
    + 'pair\'s OWN address (equality is a prefix); the second is the ancestor arm `D-56` adds; the descendant '
    + 'pair `b` is asked only by the nested pass, its own attempt\'s address');
  assert.equal(pairRuns, 2,
    'THE PASS INVOKED THE PAIR\'S OWN BODY TWICE FOR TWO ATTEMPTS — once for the outer pass ("ONE DELIVERY '
    + 'PER EVALUATED PAIR, EACH CARRYING THAT PAIR\'S OWN FUNCTION", `§2.1` item 2) and once for the nested '
    + 'attempt\'s own pass at the descendant (`D-56`) — and the FIRST of the two is the invocation the two '
    + 'nested calls in this cell are ISSUED FROM, INSIDE THE ATTEMPT\'S OWN WINDOW AND WHILE ITS ADDRESS WAS '
    + 'HELD (`attempt-lifecycle.md §2.4` item 8 (ii) (e)/(g); `kernel-surface.md §2.3` item 1) — read '
    + `${pairRuns} pass invocation${pairRuns === 1 ? '' : 's'}`);

  // ── LIMB ONE: THE HELD ADDRESS REFUSES, FROM THAT BODY, WHILE THE OUTER ATTEMPT STANDS ──────────
  assert.equal(heldAgain !== null && heldAgain.threw, true,
    'A NESTED `K-2` AT THE ADDRESS THAT ALREADY HOLDS THE LIVE ATTEMPT IS REFUSED, ISSUED FROM A BODY '
    + 'STANDING INSIDE THAT ATTEMPT\'S OWN WINDOW: "a `commit` at an address that ALREADY HOLDS an OPEN '
    + 'attempt is REFUSED with `KC-7` … and the refusal happens BEFORE the write verb is reached, so the '
    + 'store sees no write at all" (`§2.1` item 2; `attempt-lifecycle.md §2.4` item 8 (ii) (a)) — read '
    + (heldAgain && heldAgain.threw ? JSON.stringify(heldAgain.thrown.status) : 'it returned a record'));
  const heldValueAfter = store.read(outerAddress);
  // THE HELD ADDRESS'S OWN VALUE IS READ THROUGH THE MEMBER THE OUTER WRITE SET, AND NOT THROUGH THE
  // ASSEMBLED BRANCH: `read` returns "the assembled JSON of a branch" (`storeroom-native/contract.md
  // §8.1` #8), and the ADMITTED limb's own write landed UNDER this address — so the child the
  // descendant's landing put there stands BESIDE the held value and is not a write at the held address.
  assert.equal(heldValueAfter.seed, heldValueBefore.seed,
    'AND THE REFUSED CALL LANDED NO WRITE: "the refusal happens BEFORE the write verb is reached, so the '
    + 'store sees no write at all" (`§2.1` item 2) — so the address the live attempt holds still holds THE '
    + 'OUTER WRITE\'S OWN VALUE after both refusals, read back through the store\'s own verb before and '
    + 'after; the second commit\'s own value carried a DIFFERENT body at the same member, so a landing would '
    + 'have shown it here. FAIL-STATE DISTINGUISHED: a hold taken after the store write returns, where the '
    + 'second call\'s write LANDS and silently overwrites the live attempt\'s value — read '
    + JSON.stringify(heldValueAfter.seed));
  if (heldAgain !== null && heldAgain.threw) {
    assertKernelForm(heldAgain.thrown, 'NEG-DM-03 held-address refusal');
    assert.equal(heldAgain.thrown.status, KC[7],
      'and the member is `KC-7`, the closed set\'s own attempt-open token — NO ninth member is minted '
      + 'for this call (`§2.4` item 8 (ii) (g): "the set stays CLOSED at `8`")');
  }
  assert.equal(heldValueAfter[descendantAddress[descendantAddress.length - 1]], 'the nested write',
    'AND THE ADMITTED LIMB\'S ADDRESS IS A GENUINE DESCENDANT OF THE HELD ONE: the nested write landed AS A '
    + 'CHILD OF THE ADDRESS THE LIVE ATTEMPT HOLDS — read off the held address\'s own assembled branch, the '
    + 'same read that carries the held value above (`storeroom-native/contract.md §8.1` #8) — so the '
    + 'asymmetry is read as A HELD ADDRESS REFUSING WHILE AN ADDRESS INSIDE ITS OWN SUBTREE IS ADMITTED AND '
    + 'ITS WRITE LANDS UNDER IT (`§2.1` item 2: "the HOLD IS TAKEN AT THE CALL\'S OWN ADDRESS AND AT NO '
    + 'OTHER") — read ' + JSON.stringify(heldValueAfter[descendantAddress[descendantAddress.length - 1]]));

  // ── LIMB TWO: A DESCENDANT ADDRESS OF THE HELD ONE IS ADMITTED, AT THAT SAME INSTANT ────────────
  assert.equal(nestedThrow, null,
    'AND A NESTED `K-2` AT A DESCENDANT ADDRESS OF THE LIVE ATTEMPT IS ADMITTED: "`KC-7`\'s `K-2` half '
    + 'is refused ONLY AT THE ADDRESS THAT ALREADY HOLDS THE LIVE ATTEMPT and NO clause of this unit '
    + 'refuses a DESCENDANT address" (`§2.4` item 8 (ii) (g); `§3` item 9; `§2.1` item 2: "a `K-2` at an '
    + 'address that is NOT the held one — a DESCENDANT of it included — is ADMITTED, because the HOLD IS '
    + 'TAKEN AT THE CALL\'S OWN ADDRESS AND AT NO OTHER") — read '
    + (nestedThrow === null ? 'admitted' : JSON.stringify(nestedThrow.status)));
  assert.notEqual(nested, null, 'and its own `CommitRecord` crossed back from the body');
  assert.deepEqual(Object.keys(nested).sort(), ['attempt', 'op', 'pending', 'triggered'],
    'the record the body received is the kernel\'s own FOUR-member `CommitRecord` and never the store\'s '
    + '`WriteResult` (`§2.1` item 2)');
  assert.equal(nested.attempt.id === outer.value.attempt.id, false,
    'and it names the NESTED attempt\'s own identity, not the outer one\'s — clause (g) OPENS ITS OWN '
    + 'ATTEMPT at the address that is not held');
  assert.deepEqual(nestedPendingAtReturn, nested.triggered,
    'with its own write\'s returned set written as `pending`, whole AT THAT INSTANT — no pass has run at '
    + '`K-2`\'s return (`§2.1` item 2; `A113` (D3)) — read '
    + JSON.stringify(nested.pending.map(String)));
  assert.equal(carriesHandle(outer.value.triggered, listenerHandle), true,
    'and the outer record\'s own returned set carries the registration at the prefix address (`§2.1` '
    + 'item 2\'s prefix-test citation)');
  assert.equal(bodyCallsAtNestedReturn, 0,
    'AND THE NESTED WRITE\'S OWN WINDOW DELIVERED NOTHING EITHER: the withholding is the surface\'s rule '
    + 'for EVERY write a kernel evaluation set carries and not a property of the outer call alone '
    + '(`A115` (D2); `surface.md §2.7` item 7) — read '
    + `${bodyCallsAtNestedReturn} body call${bodyCallsAtNestedReturn === 1 ? '' : 's'} at the nested write's return`);
  assert.equal(nestedReport !== null && nestedReport.threw, false,
    'AND ITS OWN `K-3` IS ADMISSIBLE while the outer attempt stands: nothing of this unit refuses a '
    + 'second address (`§2.4` item 8 (ii) (g); `§3` item 9: "its own `K-3` admissible, with the OUTER '
    + 'attempt\'s hold still open") — read '
    + (nestedReport !== null && nestedReport.threw ? JSON.stringify(nestedReport.thrown.status) : 'admitted'));
  assert.equal(nestedReport !== null && !nestedReport.threw ? nestedReport.value.outcome : null, 'passed',
    'and the nested attempt resolved on its own pass');

  // ── THE ASYMMETRY IS THE LAW'S AND NOT A LAPSE OF THE HOLD ──────────────────────────────────────
  assert.equal(heldAfter !== null && heldAfter.threw, true,
    'THE HELD ADDRESS REFUSED AGAIN AFTER THE NESTED ATTEMPT HAD OPENED, RUN AND RESOLVED — so BOTH LIMBS '
    + 'ARE READ AT ONE INSTANT OF THE OUTER ATTEMPT\'S LIVE WINDOW, and the descendant\'s admission is not '
    + 'the hold releasing under the nested acts (`§2.1` item 2: the hold "IS RELEASED BY THE ATTEMPT\'S OWN '
    + 'TERMINAL ARM AND BY NO OTHER ACT … a delivery of the write\'s handles releases nothing") — read '
    + (heldAfter && heldAfter.threw ? JSON.stringify(heldAfter.thrown.status) : 'it returned a record'));
  if (heldAfter !== null && heldAfter.threw) {
    assertKernelForm(heldAfter.thrown, 'NEG-DM-03 held-address refusal after the nested attempt');
    assert.equal(heldAfter.thrown.status, KC[7],
      'and it is the same EXISTING member, at the same trigger — the set stays CLOSED at `8` '
      + '(`attempt-lifecycle.md §2.4` item 8 (ii) (g))');
  }

  // ── THE OUTER ATTEMPT AT ITS OWN TERMINAL ARM, AFTER THE NESTED ACTS ────────────────────────────
  assert.equal(outerReport.threw, false, 'and the outer attempt resolved at its own `K-3`');
  assert.equal(outerReport.threw ? null : outerReport.value.outcome, 'passed',
    'with the outer hold open throughout the nested acts — read '
    + (outerReport.threw ? JSON.stringify(outerReport.thrown.status) : outerReport.value.outcome));
  // ── **⟶ AND THESE TWO LIMBS MOVE ON 2026-10-28 — `D-53`'s FIRST INVARIANT, AND THE SENTENCE THEY REPLACED IS
  // NAMED BY ITS OWN WORDS.** They read *"the outer log carries ONE `constraint-check` and it is the pair AT THE
  // OUTER ATTEMPT'S OWN ADDRESS: the pass is ADDRESS-SCOPED … so the nested attempt's own evaluation stands in the
  // nested report and in no entry of this one"*, and *"the pass's own `commit` entry … one"* — true only while
  // `attempt.log` was the ATTEMPT's. **THE RULING: *"If it's part of the same commit, then it uses the same message
  // log … Constraints/Repairs should always use the same commit"*** (`strata/decisions.md` · `D-53`). **THE NESTED
  // WRITE IS PART OF THIS COMMIT — it was made from inside this attempt's body — so its entries ARE this log's
  // entries, and `K-4`/`K-5` answer THE COMMIT'S log.**
  // **WHAT IS UNMOVED, AND IT IS THE CELL'S SUBJECT: each pass's `constraint-check` entries name the pairs THAT
  // PASS asked, and each entry still names the iteration it speaks about** (`D-53`'s first ruling), **which is
  // what keeps the two readable apart.**
  //
  // **⟶ AND THE SET EACH PASS ASKS IS NOW A PREFIX SET — `D-56`, 2026-10-29, WHICH SUPERSEDES THE
  // ADDRESS-SCOPED SENTENCE ABOVE.** **The architect, verbatim:** *"A listener/constraint should fire when the
  // descendants of its targeted address node change, because the descendants become part of the object that is
  // read from that address"*. **SO THE NESTED PASS AT `descendantAddress` ASKS THE PAIR AT `outerAddress` — an
  // ANCESTOR of its own attempt's address — as well as the pair AT its own**, and the one list carries THREE
  // `constraint-check` entries: the outer pass's `a`, then the nested pass's `a`, then the nested pass's `b`.
  // **THE ANCESTOR ASK IS THE ONE `D-56` ADDS AND IT IS THE SECOND ENTRY; THE FIRST IS THE OUTER PASS'S OWN AND
  // THE THIRD IS THE NESTED PASS'S OWN ADDRESS — equalities are members too.**
  assert.deepEqual(checkIds(outerReport.value.log), ['a', 'a', 'b'],
    'and the ONE commit\'s log carries BOTH passes\' `constraint-check` entries, in the order the two attempts '
    + 'appended them — the outer attempt\'s pair at `a`, then the nested attempt\'s TWO (the same pair at the '
    + 'ancestor `a` by `D-56`, and the pair at its own address `b`) — which is what one list per commit means '
    + '(`D-53`); read ' + JSON.stringify(checkIds(outerReport.value.log)));
  assert.equal(entries(outerReport.value.log, 'commit').length, 2,
    'with EACH attempt\'s own `commit` entry in that same list — the nested attempt\'s, appended where its pass '
    + 'resolved inside the body, then the outer pass\'s own closing the log AFTER the nested acts '
    + '(`§2.4` item 4\'s arm (a); `D-53`)');
  assert.equal(bodyCalls >= 1, true,
    'AND THE WITHHELD BODIES ARE REACHED ONLY AFTER A PASS\'S TERMINAL ARM — the delivery "FOLLOWS THE '
    + 'PASS, AND ITS INSTANT IS THE PASS\'S TERMINAL ARM" (`surface.md §2.7` item 7; `A116` (D1) (b)) — so '
    + 'the silence read at this write\'s return above is a WITHHOLDING and not a body that was dropped — '
    + `read ${bodyCalls} body call${bodyCalls === 1 ? '' : 's'} after the arms`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `NEG-DM-04` — THE SIFT AND THE LAWFUL CHECK-OFF: THE DISCRIMINATOR THE CLAUSES DO GIVE
// ═══════════════════════════════════════════════════════════════════════════════════════════════

test('ck_neg_dm_04_sift_and_checkoff_indistinguishable_to_the_caller', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const address = [tag('dm04')];
  let bodyRuns = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1: `bodyRuns` is this cell's count of the PASS's own runs (`K-3`'s act),
  // so the registration's own invocation is answered by the shield and not counted.
  const handle = register(store, address, 'x', atLandingOnly(() => { bodyRuns += 1; return true; }));

  const record = commit(store, address, 'mem', 1);
  assert.equal(carriesHandle(record.triggered, handle), true,
    'the handle is this write\'s own returned set\'s member');
  assert.equal(carriesHandle(record.pending, handle), true,
    'INSTANT ONE — AT `K-2`\'S RETURN THE MEMBER IS THE WHOLE SET AND CARRIES THE HANDLE: '
    + '"`pending.includes(handle) === true`" is the reading `§3` item 10 pins at this instant, where NO '
    + 'pass has run and the member is the whole returned set');
  assert.equal(bodyRuns, 0,
    'and no pass has run for its pair at that instant — the pass is `K-3`\'s (`§2.4` item 5 (iv))');
  assert.deepEqual(setHandles(record.pending), setHandles(record.triggered),
    'so a SIFT IS EXCLUDED AT INSTANT ONE, BY THE MECHANISM: an entry subtracted BEFORE its own pass ran '
    + 'is exactly "A SUBTRACTION OF AN ENTRY FROM `pending` NOT TIED TO THAT ENTRY\'S OWN PASS" '
    + '(`§2.1` item 2), and such a member would not equal `triggered` here — this is the clause pair '
    + '(sift-absent ⇔ present at `K-2`\'s return, absent only after the pass) that closes the '
    + 'discriminator');

  const report = runAttempt(store, record);
  assert.equal(report.outcome, 'passed', 'the pass resolved the attempt on the pass arm');
  assert.equal(bodyRuns, 1,
    'INSTANT TWO PREMISE — THE PASS RAN THAT PAIR\'S BODY ONCE: "ONE DELIVERY PER EVALUATED PAIR, EACH '
    + 'CARRYING THAT PAIR\'S OWN FUNCTION — AND FOR NO OTHER" (`§2.1` item 2), read '
    + `${bodyRuns} run${bodyRuns === 1 ? '' : 's'}`);
  assert.equal(carriesHandle(record.pending, handle), false,
    'INSTANT TWO — AFTER THE PASS THE ENTRY IS GONE: "AFTER the pass the member holds the set MINUS the '
    + 'entries checked off as they passed" (`§3` item 10); "AN ENTRY LEAVES IT ONLY BY BEING CHECKED OFF '
    + 'AS IT PASSES" (`§2.1` item 2) — read `pending` '
    + JSON.stringify(record.pending.map(String)));
  assert.deepEqual(checkIds(report.log), ['x'],
    'AND THE ARM WHICH LEFT THE ENTRY STANDING IS THE LAW\'S OWN AND IS NAMED AT THE RECORD: the pass '
    + 'evaluated the pair standing behind that handle — ONE `constraint-check` entry for it — so its '
    + 'pass ran and the removal is that pass\'s check-off and not a subtraction taken before any pass');
  assert.equal(entries(report.log, 'constraint-check').length, 1,
    'and it is exactly ONE entry: the member\'s own loss is accounted for pair for pair — read '
    + `${entries(report.log, 'constraint-check').length}`);
  assert.equal(report.log[report.log.length - 1].kind, 'commit',
    'with the pass\'s own `commit` entry closing the log (`§2.4` item 4\'s arms (a))');

  // ── THE ONE LIMB NO DRIVE OF THIS FILE MAY TAKE, MARKED AND NOT INVENTED ─────────────────────────
  // `NOT-EXERCISABLE-BY-THIS-UNIT` — `N7`: "NO MID-WINDOW TRANSITION IS A CALLER-OBSERVABLE READING OF
  // ANY RECORD THIS SURFACE RETURNS" (`§3` item 10). Whether a body of another kind — the other
  // listeners' own layer — ran inside the verb call's window while a constraint stood owed is the JS
  // surface unit's OPEN row `docs/next-steps.md` `N7`, and this file takes no reading BETWEEN instant
  // one and instant two: the record is read at `K-2`\'s return and again after `K-3`, and nowhere else.
  assert.equal(carriesHandle(record.pending, handle), false,
    'AND THE SAME READING IS TAKEN AGAIN AFTER THE CLOSED RECORD IS AVAILABLE, AS THE ONE INSTANT TWO '
    + 'THE CLAUSE PINS (`§3` item 10: "a drive reads `carriesHandle(record.pending, handle) === true` at '
    + '`K-2`\'s return and the checked-off residue after `K-3`\'s pass, and NO drive reads the member '
    + 'between the two instants") — read `pending` ' + JSON.stringify(record.pending.map(String)));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════
// `NEG-DM-05` / `NEG-DM-06` — THE DISCARD'S EXTENT READ AS A SET RELATION ON THE FAILED WRITE'S OWN
//              RETURNED SET: NO ENTRY OF `triggered` MAY SURVIVE THE ARM, AND THE CHECK-OFF EDGE IS
//              THE ONE REMOVAL THAT REACHES AN ENTRY THE DISCARD DOES NOT
// ═══════════════════════════════════════════════════════════════════════════════════════════════
//
// DERIVED FROM THE CLAUSES AND FROM NO IMPLEMENTATION — the ground, verbatim, in the three places it
// stands, each read at its own scope:
//   · `attempt-lifecycle.md §2.4` item 8 (i) (5)'s one-valued reading at the `A112` reconciliation
//     pass: "THE FAILING ARM READS `triggered` AS THE STORE'S RETURNED SET VERBATIM AND REMOVES FROM
//     `pending` EXACTLY THE HANDLES OF THE WRITE THAT FAILED … THE DISCARD ACTS ON THE BLOCKED WRITE'S
//     OWN RETURNED SET … and removes EVERY handle of it, WHILE AN ENTRY FOR A HANDLE OF ANY OTHER WRITE
//     … STANDS IN THE MEMBER AFTER THE ARM … so the kernel owes ONE REMOVAL PER ARM AND NEVER TWO IN
//     ONE WINDOW: a CHECK-OFF removes an evaluated pair's own entry as it passes (a pass reaching no
//     terminal arm), and THE DISCARD removes the failed write's own returned set and nothing beside it".
//   · `attempt-lifecycle.md §3` item 8 (`F1`) — "THE DISCARD ACTS ON THAT WRITE'S OWN RETURNED SET AND
//     REACHES EVERY HANDLE OF IT — so every entry of that write leaves the member by the DISCARD … WHILE
//     AN ENTRY FOR A HANDLE OF ANY OTHER WRITE STANDS" — read with `§3` item 11 (`F4`): "THE OBSERVABLE:
//     on a throwing arm the caller takes NO loop at all — zero loop invocations — with every handle of
//     the failed write gone and any earlier write's entry still standing."
//   · `kernel-surface.md §2.1` item 2 — "EVERY HANDLE OF THAT WRITE LEAVES THE MEMBER BY THE DISCARD
//     … AND NO HANDLE OF THAT WRITE IS DELIVERED … THE ENTRY BELONGING TO AN EARLIER CALLER WRITE …
//     STANDS" — with `§2.4` item 5 (i), whose subject is the same set: "`WHOLE` READS THAT WRITE'S OWN
//     RETURNED SET, WHOSE EVERY HANDLE IS A NOT-YET-INVOKED TRIGGER WHEN THE ARM TAKES IT".
//
// WHAT THE TWO CELLS READ AND WHY THEY ARE NOT A COUNT — THE MECHANISM, NAMED BEFORE THE CELLS:
// `Triggered` IS THE STORE'S OWN RETURNED SET FOR THIS WRITE, VERBATIM, AND THE DISCARD'S EXTENT IS
// THAT SET. So the arm's own obligation is a SET RELATION ON THE RECORD'S OWN TWO MEMBERS: after the
// arm, `triggered` and `pending` are DISJOINT — no handle this write returned survives — while the
// PASSING arm's removals are the CHECK-OFFS ALONE, so the two rules part exactly where the pass's
// evaluated set parts from the write's returned set: the pair registered at the attempt's OWN address
// is evaluated by the pass and its entry leaves by its own check-off on BOTH arms, while the handle the
// store returns for a registration at a watched PROPER PREFIX of the write's address is in the write's
// returned set and in NO evaluated pair (the pass is ADDRESS-SCOPED: `kernel-surface.md §2.3` item 1;
// `§2.1` item 2), so NO check-off can reach it — on a PASSING arm it stands (the discard discards
// nothing there), and on a FAILING arm it is an entry of THE FAILED WRITE'S OWN RETURNED SET and the
// discard must reach it. THE TWO CELLS ARE THEREFORE DISTINGUISHED BY WHICH REMOVAL REACHED THE ENTRY
// AND BY THE SET THE ENTRY BELONGS TO, never by how many entries the member carries.
//
// ── THE STATES ENUMERATED BEFORE THE CELLS ───────────────────────────────────────────────────────
// S1  A WRITE WHOSE RETURNED SET CARRIES A HANDLE OF AN EARLIER CALLER WRITE: a registration at a
//     watched PROPER PREFIX `P` of the write's address `W` — its own earlier caller write landed `P`'s
//     home entry and returned that handle — and the write at `W` returns it again by the store's own
//     descendant-inclusive prefix test.
// S2  A HANDLE IN THAT SAME RETURNED SET WHOSE PAIR THE PASS DOES EVALUATE: the `K-1` pair at `W`
//     itself, whose handle is the store's own home handle for `W`.
// S3  A FAILING ARM: `W`'s pair violates at its landing and registers no repair; the caller's channel is
//     the thrown three-member form and it takes NO loop.
// S4  A PASSING ARM on the same fixture: `W`'s pair returns the pass arm, the log closes on `commit`,
//     the report reads `outcome: 'passed'`, and the arm discards nothing.
//
// ── THE TWO HALVES THIS FILE CROSS-CITES AND DOES NOT RE-DERIVE A THIRD WAY ──────────────────────
// (i) AN EARLIER CALLER WRITE'S ENTRY STANDING AFTER THE ARM — the clause's other half — IS
// UNREACHABLE IN THIS UNIT'S FIXTURES, RE-DERIVED AT THIS BY-SET PASS: a handle reaches the member only
// by being returned FOR A WRITE, every write that FAILS is the one whose returned set the member carries,
// and this fixture's prefix handle IS one the failing write returned, so it LEAVES. The two cells that
// once asserted it standing (`ck_neg_dm_01_*` / `ck_neg_dm_02_*`) now assert the SET RELATION, and
// whether the blanket clear is unlawful is asserted where it is still real: the passing arm of
// `ck_neg_dm_06_*` (`:715`, "THE ARM DISCARDS NOTHING") and `ck_neg_dm_04_*`'s instant-two reading —
// never by an arm no fixture here can produce. THE FINDING, NAMED WITH ITS CLAUSE AND ITS DRIVE: the
// clause "an entry for a handle of any other write stands" (`attempt-lifecycle.md §2.4` item 8 (i) (5);
// `§3` item 8; `kernel-surface.md §2.1` item 2) HAS NO REACHABLE DRIVE IN A SINGLE-COMMIT FIXTURE, the
// only other sources of a member handle being a KERNEL-COMPOSED write's own set — which no
// `CommitRecord` returned by this surface carries (`kernel-surface.md §2.1` item 2's two further
// sources (i)/(ii), declared there as NOT READABLE OFF THIS SURFACE'S OWN RECORD).
// (ii) `triggered` STANDING AS THE STORE'S RETURNED SET VERBATIM is asserted in this file at `:247`,
// `:397`, and at `ck_dm_a_rolled_back_writes_triggered_set_is_discarded_rather_than_carried`
// (`constraint-kernel-deliverymodel.test.mjs:559`, the `triggered`-stands-verbatim assertion of that cell).
// A THIRD HALF — A HANDLE OF THE FAILED WRITE'S RETURNED SET LEAVING THE MEMBER — is asserted above at
// `:208`/`:220` (`ck_neg_dm_01_*`), at `:375`/`:382` (`ck_neg_dm_02_*`) and at `:439`/`:446` of
// `constraint-kernel-deliverymodel.test.mjs`; those fixtures read the handle whose pair the pass
// evaluated and the prefix handle, and NONE of them reads the relation these two cells read: THE
// RETURNED SET AGAINST THE MEMBER, OVER EVERY HANDLE OF THAT SET — which is why `ck_neg_dm_05_*` stands
// RED and is the cell the fix must turn green.

test('ck_neg_dm_05_the_failing_arms_discard_reaches_every_handle_of_the_failed_writes_returned_set', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const prefix = [tag('dm05p')];
  const own = [...prefix, tag('dm05o')];
  // S1's OWN EARLIER CALLER WRITE: it lands the prefix address's home entry and carries back the handle
  // this write returns again — its body being the store's own delivery and never a pass's
  // (`kernel-surface.md §2.1` item 2 (ii)).
  store.write(prefix, 'mem', { seed: 'the prefix registration\'s own earlier caller write' });
  const prefixBody = countingListener();
  const prefixHandle = listenAndRegister(store, prefix, prefixBody);
  const prefixRunsAtTheEarlierWrite = prefixBody.seen.length;
  // S2: the pair at the write's own address. Its handle is the store's own home handle for that address
  // and is a member of the same returned set.
  let pairRuns = 0;
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: shielded, so the pair is CARRIED and the failing arm this
  // cell reads is the WRITE's own. `pairRuns` counts the LANDING's evaluations alone.
  const pairHandle = register(store, own, 'x', atLandingOnly(() => {
    pairRuns += 1;
    return { message: 'x is invalid at this landing and registers no repair' };
  }));
  const ownBody = countingListener();
  const ownHandle = listenAndRegister(store, own, ownBody);
  const ownRunsAtCommit = ownBody.seen.length;

  const record = commit(store, own, 'mem', 'v');

  // ── THE INSTANT BEFORE THE PASS, READ FIRST SO THE ARM'S OWN READING HAS A PREMISE ────────────────
  assert.equal(carriesHandle(record.pending, prefixHandle), true,
    'S1 STANDS: the store\'s own trigger selection returns the handle of the registration at the watched '
    + `PROPER PREFIX ${JSON.stringify(prefix)} for this write at ${JSON.stringify(own)} — the `
    + 'descendant-inclusive prefix test (`kernel-surface.md §2.1` item 2\'s prefix-test citation) — so '
    + 'that handle IS A MEMBER OF THE FAILED WRITE\'S OWN RETURNED SET, which is the set the discard '
    + 'reaches (`attempt-lifecycle.md §2.4` item 8 (i) (5))');
  assert.equal(carriesHandle(record.triggered, pairHandle), true,
    'and S2 stands beside it: the handle of the pair the pass DOES evaluate is in that same returned set '
    + '(read `triggered` ' + JSON.stringify(record.triggered.map(String)) + ')');
  assert.deepEqual(setHandles(record.pending), setHandles(record.triggered),
    'AND AT `K-2`\'S RETURN THE MEMBER IS THE WHOLE RETURNED SET — the caller\'s own first reading '
    + '(`attempt-lifecycle.md §3` item 10; `kernel-surface.md §2.1` item 2) — so both members below are '
    + 'read over the SAME set, entry for entry');
  assert.equal(pairRuns, 0, 'and no pass has run at that instant: the pass is `K-3`\'s');
  assert.equal(prefixBody.seen.length - prefixRunsAtTheEarlierWrite, 0,
    'AND THIS WRITE\'S OWN VERB CALL IS WHAT PUTS THAT HANDLE IN THE RETURNED SET, WHILE ITS OWN WINDOW '
    + 'INVOKES NOTHING: the handle stands in the returned set because the store\'s descendant-inclusive '
    + 'trigger selection returned it for this write, and the body is NOT reached inside the verb\'s window '
    + 'because this write is KERNEL-DRIVEN and instant (a) withheld its in-window invocation before the '
    + 'verb was called (`surface.md §2.4` item 9\'s instant (a); `A116` (D1)–(D2); `PAR-JS-19`) — and no '
    + 'pass of this attempt could reach it either, whose evaluated set is address-scoped '
    + '(`kernel-surface.md §2.3` item 1; `§2.1` item 2\'s prefix-test citation) — read '
    + `${prefixBody.seen.length - prefixRunsAtTheEarlierWrite} call beyond its own earlier write. `
    + 'FAIL-STATE DISTINGUISHED: a delivery still made inside this verb\'s window');

  const outcome = capture(() => runAttempt(store, record));
  assert.equal(outcome.threw, true, 'S3: the attempt takes the failing arm');
  assertKernelForm(outcome.thrown, 'NEG-DM-05 failing arm');
  assert.equal(outcome.thrown.status, KC[3],
    'and the arm is the first-violation arm (c) — read ' + JSON.stringify(outcome.thrown.status));
  assert.deepEqual(checkIds(outcome.thrown.log), ['x'],
    'and the pass\'s own evaluated set is the pair at the write\'s OWN address alone: the prefix '
    + 'registration stands at an ancestor address and NO pass of this attempt reaches it '
    + '(`kernel-surface.md §2.3` item 1; `§2.1` item 2\'s address-scoped pass) — read '
    + JSON.stringify(checkIds(outcome.thrown.log)));
  assert.equal(pairRuns, 1,
    'so ONE pair was evaluated and its body ran once inside this window, and THAT pair\'s own pass is '
    + 'the only check-off this arm performs (`attempt-lifecycle.md §2.4` item 8 (i) (5): "a CHECK-OFF '
    + 'removes an evaluated pair\'s own entry as it passes")');

  // ── THE ARM'S OWN OBSERVABLE — THE SET RELATION, AND NOT A COUNT ──────────────────────────────────
  assert.deepEqual(record.triggered.filter((h) => carriesHandle(record.pending, h)), [],
    'AND NO HANDLE OF THE FAILED WRITE\'S OWN RETURNED SET SURVIVES THE ARM: the discard "acts on that '
    + 'write\'s own returned set and removes EVERY handle of it" (`attempt-lifecycle.md §2.4` item 8 (i) '
    + '(5)) — so the entries of `triggered` still standing in `pending` after the arm are NONE, read the '
    + `entries of \`triggered\` still standing in \`pending\`: ${JSON.stringify(leakedEntries(record, [['the handle of the registration at the watched PREFIX address', prefixHandle], ['the handle of the pair at the write\'s own address', pairHandle]]))}`);
  assert.equal(carriesHandle(record.pending, prefixHandle), false,
    'AND THE PREFIX ENTRY IS READ BY ITS OWN NAME, SO THE FAILURE NAMES THE HANDLE AND NOT A COUNT: the '
    + 'store returned this handle FOR THIS WRITE (`triggered` carries it, asserted above), its pair is '
    + 'one NO pass of this attempt evaluates, and NO check-off can therefore reach it — so what must '
    + 'remove it is the DISCARD, which reaches "EVERY handle of that write\'s own returned set" '
    + '(`attempt-lifecycle.md §3` item 8: "every entry of that write leaves the member by the DISCARD, no '
    + 'handle of that write being invoked by either layer"; `attempt-lifecycle.md §2.4` item 8 (i) (5): '
    + '"an entry for a handle of any OTHER write" is the entry that stands — this one is not of another '
    + 'write, THIS WRITE RETURNED IT); `kernel-surface.md §2.4` item 5 (i): "`WHOLE` READS THAT WRITE\'S '
    + 'OWN RETURNED SET, WHOSE EVERY HANDLE IS A NOT-YET-INVOKED TRIGGER WHEN THE ARM TAKES IT". AN '
    + 'IMPLEMENTATION THAT REMOVES ONLY THE ATTEMPT-ADDRESS HOME HANDLE FROM ITS OWN `homes` MAP LEAVES '
    + 'THIS ENTRY STANDING — read `pending` ' + JSON.stringify(record.pending.map(String)));
  assert.equal(carriesHandle(record.pending, pairHandle), false,
    'while the evaluated pair\'s own entry has left by ITS OWN pass\'s check-off — the one lawful '
    + 'removal beside the discard (`§2.4` item 8 (i) (5); the same removal asserted at `:232` '
    + '(`ck_neg_dm_01_*`) and at `:366` (`ck_neg_dm_02_*)`)');
  // THE CALLER'S OWN LOOP, TAKEN OFF THE MEMBER THE ARM LEFT — `§2.4` item 8 (i) (5)'s "the caller's own
  // loop being ONE INVOKER of them", read here so the SECOND DELIVERY the leak causes is the run's own.
  let loopInvocations = 0;
  for (const _handle of record.pending) loopInvocations += 1;
  assert.equal(loopInvocations, 0,
    'AND THE CALLER\'S LOOP OVER THIS MEMBER PERFORMS NO INVOCATION ON A THROWING ARM: "ON A THROWING '
    + 'ARM THE CALLER\'S LOOP PERFORMS NO INVOCATION FOR ANY HANDLE THIS MEMBER CARRIES … WHATEVER the '
    + 'member carries" (`kernel-surface.md §2.1` item 2; `attempt-lifecycle.md §3` item 11) — so a member '
    + 'that still carries an entry of the failed write is not merely an unused entry: IT IS THE SECOND '
    + 'DELIVERY THAT LOOP WOULD MAKE, and the clause\'s own `FAIL-STATE` is "a member from which an '
    + 'earlier write\'s entry is read where the failed write returned it" — read '
    + `${loopInvocations} handle${loopInvocations === 1 ? '' : 's'} left for that loop. CROSS-CITED: the `
    + 'loop\'s own invocation count on a throwing arm is driven at '
    + '`ck_dm_on_a_throwing_arm_the_callers_loop_performs_no_invocation_for_a_handle_the_set_carries` '
    + '(`constraint-kernel-deliverymodel.test.mjs:266`)');
});

test('ck_neg_dm_06_the_passing_arms_entry_leaves_by_its_own_checkoff_and_the_discard_reaches_nothing', async () => {
  const { register, commit, runAttempt } = await kernel();
  const store = makeStore({ journalLength: 16 });
  const prefix = [tag('dm06p')];
  const own = [...prefix, tag('dm06o')];
  store.write(prefix, 'mem', { seed: 'the prefix registration\'s own earlier caller write' });
  const prefixBody = countingListener();
  const prefixHandle = listenAndRegister(store, prefix, prefixBody);
  const prefixRunsAtTheEarlierWrite = prefixBody.seen.length;
  let pairRuns = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1: `pairRuns` is this cell's count of the PASS's own runs, so the
  // registration's invocation is answered by the shield and not counted; the pair is CARRIED (state 1).
  const pairHandle = register(store, own, 'x', atLandingOnly(() => { pairRuns += 1; return true; }));
  const ownBody = countingListener();
  const ownHandle = listenAndRegister(store, own, ownBody);
  const ownRunsAtCommit = ownBody.seen.length;

  const record = commit(store, own, 'mem', 'v');
  // ── ⟶ RE-DERIVED AT THE `A116` ORDERING-SEAM PASS (2026-10-15) AT THE INSTANT THAT MOVED: the two
  //    snapshots below are taken WHEN THIS WRITE'S WINDOW CLOSES, so the in-window invocation set is
  //    read empty at instant (a)'s own observable (`surface.md §2.4` item 9; `A116` (D1)–(D2);
  //    `PAR-JS-19`) and the residue's delivery is measured at the pass's TERMINAL ARM, below. ───────
  const prefixAtTheCommitsClose = prefixBody.seen.length - prefixRunsAtTheEarlierWrite;
  const ownAtTheCommitsClose = ownBody.seen.length - ownRunsAtCommit;
  assert.deepEqual(setHandles(record.pending), setHandles(record.triggered),
    'THE SAME FIXTURE, THE OTHER ARM: at `K-2`\'s return the member is the whole returned set '
    + '(`attempt-lifecycle.md §3` item 10)');

  const report = runAttempt(store, record);
  assert.equal(report.outcome, 'passed',
    'S4: every registered pair at the attempt\'s address returned the pass arm');
  assert.equal(pairRuns, 1, 'and the pass ran that one pair\'s body once, as its own delivery');
  // ── THE CHECK-OFF EDGE, READ OFF THE PASS'S OWN RECORD AND NOT OFF THE MEMBER'S SIZE ─────────────
  assert.deepEqual(checkIds(report.log), ['x'],
    'AND THE ENTRY THAT LEFT THE MEMBER LEFT BY A PASS THAT READ ITS OWN PAIR: the record names the '
    + 'pair the pass evaluated — ONE `constraint-check` entry, `x` — so a removed entry here is a '
    + 'CHECK-OFF of an entry the pass reached, and never a subtraction taken beside it '
    + '(`attempt-lifecycle.md §2.4` item 8 (i) (5): "a CHECK-OFF removes an evaluated pair\'s own entry '
    + 'as it passes (a pass reaching no terminal arm)")');
  assert.equal(entries(report.log, 'constraint-check').length, 1,
    'and it is exactly one entry — read ' + `${entries(report.log, 'constraint-check').length}`);
  assert.equal(report.log[report.log.length - 1].kind, 'commit',
    'with the pass\'s own `commit` entry closing the log');
  assert.equal(carriesHandle(record.pending, pairHandle), false,
    'SO THE EVALUATED PAIR\'S OWN ENTRY IS GONE AFTER ITS PASS: "AN ENTRY LEAVES IT ONLY BY BEING '
    + 'CHECKED OFF AS IT PASSES" (`kernel-surface.md §2.1` item 2; `attempt-lifecycle.md §3` item 10, '
    + 'whose reading is "the checked-off residue after `K-3`\'s pass")');
  // ── THE DISCRIMINATOR: THE SAME FIXTURE, THE OTHER ARM — AND THE ENTRY NO REMOVAL REACHED ────────
  // **⟶ RE-DERIVED 2026-10-18: THE COMPARISON IS TAKEN AT THE PAIRS' `handle` MEMBERS ON BOTH SIDES**
  // (`trigger-and-pair.md §4` item 1: *"both filters become PAIR-AWARE — they compare `entry.handle`, never
  // `entry`"*; `§3` item 3: the element type is the pair, with no union). **The as-filed
  // `record.triggered.filter((h) => h !== pairHandle)` compared a PAIR to a HANDLE and could never remove
  // anything, which is `TF-3`/`TF-4` read from the reader's side. THE CLAIM IS UNMOVED.**
  assert.deepEqual(setHandles(record.pending), setHandles(record.triggered).filter((h) => h !== pairHandle),
    'AND ON THIS ARM THE MEMBER IS THE RETURNED SET MINUS THE EVALUATED PAIRS\' CHECKED-OFF ENTRIES, '
    + 'ENTRY FOR ENTRY (`attempt-lifecycle.md §3` item 8: "a passing arm\'s `pending` as `triggered` '
    + 'MINUS the evaluated pairs\' checked-off entries"): THE ARM DISCARDS NOTHING — "the discard acts on '
    + 'the blocked write\'s own returned set", and on this arm NO write was blocked (`§2.4` item 8 (i) '
    + '(5)). FAIL-STATE DISTINGUISHED: a passing arm that subtracted an entry no pass evaluated, which is '
    + 'the `SIFT` `kernel-surface.md §2.1` item 2 declares UNLAWFUL — read `pending` '
    + JSON.stringify(record.pending.map(String)) + ' of `triggered` '
    + JSON.stringify(record.triggered.map(String)));
  // **⟶ RE-DERIVED 2026-10-18: THE RESIDUE IS READ AT ITS `handle` MEMBERS, AND ITS MEMBERSHIP MOVED WITH
  // THE IDENTITY MODEL.** The as-filed `[prefixHandle]` rested on `pairHandle === ownHandle` — one adopted
  // handle per address, so `K-1`'s pair entry and the app's later registration at the same address were ONE
  // entry (`A117` (D6)'s one-`pending`-entry-per-address reading). **Under the caller-spelled identity they are
  // TWO entries** (`identity-and-domain.md §1` item 4: uniqueness is PER HANDLE STRING), **so the residue is the
  // returned set minus the evaluated pair's own entry, read as a SET of identities** (`trigger-and-pair.md §4`
  // item 1; `§3` item 5: `pending`'s size is the still-pending count and never the returned set's size after a
  // pass). **THE CLAIM — *"the entries no check-off reached STAND, and the evaluated one does not"* — IS
  // UNMOVED AND IS NOW ASSERTED IDENTITY BY IDENTITY, which distinguishes a per-entry check-off from a
  // wholesale clear far better than the as-filed single-element list could.**
  assert.deepEqual(
    setHandles(record.pending).slice().sort(),
    setHandles(record.triggered).filter((h) => h !== pairHandle).slice().sort(),
    'AND THE ENTRIES THAT STAND ARE THE SIBLINGS\' — THE OWED FIRING NO CHECK-OFF COULD REACH: the '
    + 'handle the store returned for the registration at the watched PROPER PREFIX is in the write\'s '
    + 'returned set and in NO evaluated pair (the pass is ADDRESS-SCOPED — `kernel-surface.md §2.3` '
    + 'item 1; `§2.1` item 2), so on THIS arm it leaves by nothing and stands. THE APP\'S REGISTRATION\'S '
    + 'OWN HANDLE IS NOT BESIDE IT, AND THAT IS THE MECHANISM AND NOT A NON-DELIVERY: the store holds ONE '
    + '`pending` entry PER ADDRESS (`kernel-surface.md §2.1` item 2; `CommitRecord`\'s four members, none '
    + 'added — `A117` (D6)), so `pairHandle === ownHandle` (asserted below) makes the evaluated pair\'s own '
    + 'entry and this later registration\'s entry ONE ENTRY, and the check-off leaves the residue by '
    + 'removing THAT IDENTITY\'S ENTRY — `pending` = `triggered` MINUS that identity\'s entry, AND MINUS '
    + 'NOTHING ELSE (`§2.7` item 7 (a)). The firing that registration is owed IS NOT CARRIED BY A SECOND '
    + '`pending` OCCURRENCE — THE CARRIER CANNOT HOLD ONE, `A117` (D6) forbidding the store or record '
    + 'change that alone could make a second entry for one address possible: it is carried by THE '
    + 'REGISTRY\'S RESOLUTION OF THAT IDENTITY, which is what the terminal arm looks the identity up '
    + 'through and reaches ONCE (asserted below as the body\'s ONE invocation, and at `ck_neg_dm_08_*` as '
    + 'the terminal-arm count) — `A117` (D4)/(D5) read through `§2.7` item 6\'s firing law and item 7\'s '
    + 'registry lookup. THE SUPERSEDED EXPECTATION, NAMED: THIS LINE ONCE READ `[prefixHandle, ownHandle]` '
    + 'and claimed the app\'s registration\'s owed firing *"is left STANDING in the residue"* — a second '
    + '`pending` entry for one address, which the carrier cannot hold; the reading it replaced, '
    + '`[prefixHandle]` ALONE under `§2.4` item 8 (c)\'s derived non-delivery (*"no entry for it stands in '
    + '`pending` for the residue to reach"*), names the same member count but denies a firing `A117` (D3)/'
    + '(D4) declares — and BOTH are superseded, the first by (D5)\'s keying read through (D6)\'s carrier, '
    + 'the second by (D3)\'s deletion. This is what parts this arm\'s rule from the '
    + 'failing arm\'s: THERE, '
    + 'the same entry is an entry of THE FAILED WRITE\'S RETURNED SET and the discard reaches it '
    + '(`ck_neg_dm_05_*`); HERE the arm removes nothing and only the pair\'s own check-off moved the '
    + 'member. CROSS-CITED: the prefix entry\'s standing after a PASS is asserted at '
    + '`ck_dm_a_checked_off_entry_leaves_pending_and_a_failing_entry_stands_until_it_passes` '
    + '(`constraint-kernel-deliverymodel.test.mjs:645`)');
  assert.equal(prefixBody.seen.length - prefixRunsAtTheEarlierWrite, 1,
    'AND THE PREFIX REGISTRATION\'S WHOLE COUNT IS ITS OWN EARLIER WRITE\'S ONE BODY CALL AND THIS '
    + 'WRITE\'S OWN TERMINAL-ARM DELIVERY, AND NOTHING OF THE PASS\'S: no layer of the kernel ran this '
    + 'body — "THE STORE RETURNS THE HANDLES AND INVOKES NOTHING ON EITHER LAYER\'S BEHALF", the kernel\'s '
    + 'own window running the TRIGGERED CONSTRAINTS and no other listener (`§2.2` item 2), and this '
    + 'attempt\'s pass evaluating no pair at an ancestor address (`§2.4` item 5 (iv)) — while the '
    + 'CHECK-OFF of the pair\'s entry invoked nothing here (`kernel-surface.md §2.1` item 2: "invoked by '
    + 'NEITHER that check-off nor that discard"); what reached it once is THIS write\'s own residue '
    + 'delivered at the pass\'s TERMINAL ARM, after the last constraint was evaluated (`surface.md §2.7` '
    + 'item 7; `§2.4` item 9\'s instant (b); `A116` (D1)–(D2)) — read '
    + `${prefixBody.seen.length - prefixRunsAtTheEarlierWrite} call`
    + `${prefixBody.seen.length - prefixRunsAtTheEarlierWrite === 1 ? '' : 's'} beyond that earlier write, `
    + `of which ${prefixBody.seen.length - prefixAtTheCommitsClose} stood inside this write's window`);
  // ── ⟶ RE-DERIVED 2026-10-15 ON `A117` (D3)/(D4)/(D5), AND THE SUPERSEDED EXPECTATION IS NAMED HERE SO
  //    NO LAW IS SILENTLY RE-SPUN AND NONE IS DELETED: THIS ASSERTION ONCE READ `0` AND CLAIMED *"THE BODY
  //    REGISTERED AT THE ATTEMPT'S OWN ADDRESS IS REACHED BY NOTHING ON THIS WHOLE DRIVE"*, resting on
  //    `surface.md §2.4` item 8 (c)'s derived non-delivery (*"IS NOT DELIVERED AT THAT INSTANT"*, *"no
  //    entry for it stands in `pending` for the residue to reach"*). **THAT DERIVATION IS SUPERSEDED AND
  //    DELETED BY `A117` (D3): a registration-identity fact cannot withdraw a firing the law declares, and
  //    a listener turned on at that address IS NOT A LISTENER THAT NEVER FIRES.** The body's ONE firing is
  //    owed at the pass's TERMINAL ARM with the TRIGGERING ADDRESS as its single argument (`A117` (D4);
  //    `§2.7` item 6 — the other listeners are reached ONCE EVERY CONSTRAINT HAS PASSED — with item 7's
  //    instant), and the check-off removes THE EVALUATED IDENTITY'S OWN ENTRY — the member losing that
  //    entry and minus nothing else (`§2.7` item 7 (a)), the carrier holding ONE `pending` entry PER
  //    ADDRESS (`A117` (D6)) — so THIS registration's owed firing STANDS and the terminal arm reaches it
  //    THROUGH THE REGISTRY'S RESOLUTION OF THAT IDENTITY AND NOT THROUGH A `pending` OCCURRENCE (`A117`
  //    (D4)/(D5) read through (D6); `§2.4` item 8 (c) AS CORRECTED at its own site, whose re-scoped
  //    reading this cell's own text above carries) — the residue assertion immediately below reads that
  //    member, and this assertion reads the one invocation. ─────
  assert.equal(ownBody.seen.length - ownRunsAtCommit, 1,
    'AND THE BODY REGISTERED AT THE ATTEMPT\'S OWN ADDRESS IS REACHED EXACTLY ONCE ON THIS WHOLE DRIVE — '
    + 'NOT in this write\'s verb window, whose in-window invocation set is empty (instant (a); `A116` '
    + '(D1)), and ONCE AT THE PASS\'S TERMINAL ARM, WHERE THIS CELL MEASURES IT AND REPORTS IT: the handle '
    + 'this registration answers with is the SAME identity the pair\'s own `K-1` registration answered with '
    + '(`pairHandle === ownHandle`, asserted below), so the firing owed at this address is the app\'s '
    + 'registration\'s own and the terminal arm invokes the function the registry holds for that identity — '
    + '`A117` (D4): *"a listener registered at a pair-adopted address is owed ONE firing … exactly as its '
    + 'sibling at the proper prefix is"* — read '
    + `${ownBody.seen.length - ownRunsAtCommit} call(s) beyond that register call, of which `
    + `${ownAtTheCommitsClose} stood inside this write's window. THE SUPERSEDED EXPECTATION, NAMED: this `
    + 'line asserted `0` and read the body as reached by nothing, under `§2.4` item 8 (c)\'s derived '
    + 'non-delivery — WITHDRAWN by `A117` (D3), the check-off keyed by (D5), the firing by (D4). FAIL-STATE '
    + 'DISTINGUISHED: a kernel layer that ran this body INSIDE the pass or inside the verb\'s window (a '
    + 'failure of `§2.7` items 6–7 and of instant (a)\'s withholding), and a terminal arm that reaches it '
    + 'TWICE — the second delivery `§2.7` item 7\'s residue permits no more than the first');
  assert.equal(ownBody.seen[ownBody.seen.length - 1].address.slice().join('/'),
    own.slice().join('/'),
    'AND THAT ONE INVOCATION\'S SINGLE ARGUMENT IS THE TRIGGERING ADDRESS — the address the trigger\'s own '
    + 'op landed at, and never the registration\'s watch address (`§2.7` item 5: the invocation\'s '
    + 'length-and-arguments view is ONE argument; `kernel-surface.md §2.1` item 2 (ii)\'s referent clause; '
    + '`A117` (D4): *"with the triggering address as its single argument"*) — this drive registers the body '
    + 'at the written address itself, so the referent is read here against the registration\'s own address '
    + 'and is not separable from it at this fixture: the separable reading is driven at `ck_neg_dm_10_*` '
    + '(the sibling at the proper prefix carries the same address), and the fail-state this line names is a '
    + 'call carrying the HANDLE, carrying the id, or carrying NO argument — read '
    + JSON.stringify(ownBody.seen[ownBody.seen.length - 1].address));
  // **⟶ RE-DERIVED 2026-10-18: THE TWO REGISTRATIONS ARE TWO ENTRIES, SO THE AS-FILED EQUALITY HAS NO
  // SUBJECT.** It rested on *"the store holds one function per address and the later registration replaces
  // the other's body"* (`attempt-lifecycle.md §2.4` item 5 (iii)) — a statement of the OLD identity
  // model, in which `K-1`'s entry and a later `store.on` at one address were answered ONE adopted handle.
  // **Under the caller-spelled identity each registration is its own handle and its own row**
  // (`identity-and-domain.md §1` item 4; `contract.md §2.1` item 1; `(AA-5)`).
  //
  // **THE CLAIM THE LINE EXISTS FOR — *"the two registrations are read apart by WHAT THEY ARE, and the
  // assertions above part them by what each is OWED"* — IS UNMOVED AND IS THE STRONGER READING: the pair's
  // own entry is the one the pass checks off and the caller's body is a DIFFERENT identity the check-off does
  // not consume (`A117` (D5)), which is exactly what the residue assertions above now read entry for entry.**
  assert.notEqual(pairHandle, ownHandle,
    'the kernel\'s own `K-1` entry and this cell\'s later registration at the SAME address are TWO '
    + 'caller-spelled identities and therefore TWO store rows (`identity-and-domain.md §1` item 4) — so the '
    + 'assertions above part them by WHAT EACH IS OWED and by no shared identity');
  assert.equal(typeof pairHandle, 'string', 'and both are strings (`contract.md §2.1` item 1; `(AA-5)`)');
  assert.equal(carriesHandle(record.triggered, prefixHandle), true,
    'AND THE ENTRY THAT STANDS IS ONE THIS WRITE RETURNED: the store\'s own prefix selection carried the '
    + 'prefix registration into `triggered` for this write (`kernel-surface.md §2.1` item 2\'s prefix-test '
    + 'citation) — so the two arms are read over the SAME returned set and the difference between them is '
    + 'the ARM and its own removal rule, not the set the store answered with');
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// `NEG-DM-07` — THE STALE ADOPTION: AN ADOPTION WHOSE WRITE NEVER RAN MUST NOT WITHHOLD THE NEXT
// BARE CALLER-MADE WRITE'S WINDOW
//
// ⟶ RE-SCOPED TO THE AMENDED CLAUSE, AND ONE EXPECTATION WITHDRAWN BY NAME. This cell's route (i)
// once asserted that a caller's own `settle` call with a caller-made object carrying `pending` answers
// THE REGISTRATION SITE'S OWN `TypeError`. **THAT EXPECTATION IS WITHDRAWN BY `surface.md §2.4` item 9
// (a) AS AMENDED — *"THE ADOPTION HAPPENS AT THE FIRST CALL AND IS NOT REQUIRED BEFORE IT — that call
// IS the adoption … so an identity is IN-DOMAIN FROM THE FIRST CALL ON IT, and A FIRST CALL IS NEVER
// REFUSED: no class test and no marker test can refuse one, because the adoption is what that call
// performs"* — and by `PAR-JS-19`'s own domain cell at `§2.19`, which is THAT SAME LAW (*"the adoption
// happens AT the first call and is not required before it … the first call on this instance for a given
// identity IS the adoption"*), whose outside-value row reaches the record POSITIONS alone — *"the
// RECORD POSITIONS and the never-handed identity below, AND NEVER AN IDENTITY'S ADOPTION HISTORY"*.
// Route (i) therefore asserts the DECLARED OBSERVABLE of a caller-called seam and not a refusal: a
// caller's FIRST call with an object identity ADOPTS — it throws nothing, it returns `undefined`, and
// it takes the adoption marker — and a caller's LATER call for that identity delivers that identity's
// `pending` residue silently; WHICH CALLER'S first call landed is NOT OBSERVABLE at this boundary.
// The withdrawn `TypeError` expectation is named HERE and at the route itself, and is NOT re-asserted
// and NOT silently dropped.
//
// THE DEFECT THIS CELL PINS, REPORTED BY THE IMPLEMENTER AND UNFIXED AT THIS TREE: an ADOPTION whose
// own write never ran — a caller-made first call whose write never follows, or a `commit` the store
// refused between instant (a) and the verb — LEAVES AN ADOPTED IDENTITY STANDING, and THE NEXT BARE
// WRITE ON THAT SAME INSTANCE CONSUMES IT — so THAT write's own in-window invocation is WITHHELD for a
// write no kernel act ever issued. `§2.4` item 9 (e) fixes the subject of that withholding exactly:
// *"A BARE CALLER-MADE WRITE IS NOT THIS MEMBER'S SUBJECT … THIS ITEM MOVES NEITHER THAT INSTANT NOR
// ITS DECLARED HOLE"*, read with `§2.7` item 8.
//
// AND ONE RESIDUAL UNREACHABILITY IS RECORDED HERE AS A FINDING AND ASSERTED NOWHERE IN THIS CELL:
// for the ONE outside-value class *"an object identity this instance was never handed by the KERNEL —
// another instance's record included"* (`§2.4` item 9 (a)'s own table row; `PAR-JS-19`'s outside-value
// row) THIS BOUNDARY HAS NO DETECTION GROUND — the kernel's own instant-(a) record and a caller-made
// one print THE SAME KEY SET AND THE SAME EMPTINESS PER MEMBER (`§2.4` item 9 (a)), so an object
// identity is not refused for never having been handed over, and that row's `TypeError` is UNREACHABLE
// AS PRINTED while the amended domain cell stands. **THE CONTRADICTION STANDS ONE ROW OVER AND IS
// REPORTED, NOT SETTLED: the spec writer could not single-value it without a ruling the architect now
// holds.** No assertion here turns on it — the outside-value class is neither driven nor relied on —
// and the class decision this boundary does take (absent / `undefined` / `null` / a primitive / a
// `function` / a `Proxy`) is declared by `§2.4` item 9 (a)'s table and is not this cell's subject.
//
// DERIVED FROM THE CLAUSES ALONE, EACH AT ITS OWN BYTES:
//   · `surface.md §2.4` item 9's instant (a) — the seam's ONE marker is "the record identity the
//     instance adopted at instant (a)" and the write it withholds is THAT identity's own write: the
//     entry's own `write` "withholds the package's own delivery FOR IT". An adoption is therefore
//     keyed to ONE write; it is never a queue an unrelated write may draw from.
//   · `surface.md §2.4` item 9 (e) with `§2.7` item 8 — DECLARED AS LAW AND NOT AS A HEDGE: "a write
//     a caller made through the store's own write verb and no `commit`" has ITEM 2's post-verb
//     instant, which "this clause does not move". A bare caller-made write's window is never withheld,
//     whatever adoption stands on the instance.
//   · `surface.md §2.4` item 9 (a)'s amended domain cell with `PAR-JS-19`'s domain cell: the domain is
//     "the identity the KERNEL passed to this member's FIRST call on this instance" and A FIRST CALL IS
//     NEVER REFUSED — it IS the adoption — so a caller's first call with an identity is the lawful
//     adoption route (i) drives, and no `TypeError` is owed at that position.
//   · `A116` (D1)/(D2) — the seam is the KERNEL'S arm at the two instants of a KERNEL-DRIVEN write:
//     "THE KERNEL CALLS IT, THE ENTRY IMPLEMENTS IT".
//
// TWO ROUTES REACH IT AND BOTH ARE DRIVEN, EACH IN ITS OWN BLOCK, EACH WITH THE NEXT BARE WRITE'S OWN
// OBSERVABLE:
//   (i)  A CALLER THAT CALLS `settle(record)` ITSELF — an object this cell builds, carrying the four
//        record members (`surface.md §2.4` item 9 (a): the record positions are admitted as they are),
//        whose write never follows. The first call ADOPTS (the declared observable: `undefined`, no
//        throw, the marker taken), and the leak's real content is that the adopted identity is then
//        consumed by the next bare write — which must not withhold that write's window.
//   (ii) A `commit` THAT THROWS BETWEEN INSTANT (a) AND THE VERB — the store's own refusal on an
//        absent `value` (`kernel-surface.md §2.1` item 2: the store's own code at the verb call). Its
//        adoption was lawful and its write never ran, so the abandoned adoption must not survive into
//        the next bare write.
//
// THE DECLARED OBSERVABLE (`§2.19`'s own evaluator row, read as COUNTS): "invocations per identity, and
// invocations before the store verb's return". A bare write's body runs IN ITS OWN WINDOW, ONCE — and
// the fail-state this cell pins is the empty in-window invocation set, which is instant (a)'s own
// declared observable and reaches a write no kernel act issued.
//
// WHAT IS ASSERTED BESIDE IT, SO NO ARM IS WEAKENED INTO A VACUOUS ONE: a SECOND bare write on the same
// instance delivers again, so the emptiness of the first in-window set is read AGAINST a live
// registration and not against a fixture that can never deliver; and the CONTROL ROUTE — the same bare
// write with NO prior adoption — delivers once in its own window, which is `§2.7` item 8's own
// post-verb instant driven twice in this cell.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// `NEG-DM-07` — THE UNIFORM WRITE PATH: NO WRITE IS "BARE" ANY MORE, AND NO ADOPTION OUTLIVES ITS WRITE
//
// ── ⟶ RE-DERIVED WHOLE, 2026-10-18 (`role_test_writer`). THE CELL THIS LINE HELD DROVE THE **ADOPTION
//    MACHINERY** AND ITS PREMISE WAS THE **BARE CALLER-MADE WRITE** — AND BOTH SUBJECTS ARE DEAD ON THE
//    SAME ARCHITECT'S RULINGS, SO THE CELL IS RE-DERIVED AND NOT DELETED, WEAKENED OR SILENTLY DROPPED.
//    ITS OLD TITLE — `ck_neg_dm_07_the_stale_adoption_of_a_write_that_never_ran_withholds_the_next_bare_
//    writes_window` — NAMED TWO SUBJECTS THAT NO CLAUSE NOW CARRIES, and each is disposed of here by name:
//
//    · **THE ADOPTION MACHINERY IS GONE.** `settle` is `REMOVED-WHOLE` from the declared surface
//      (`surface.md §2.4` item 9's pointer of 2026-10-18) and the machinery that existed only to serve the
//      bare write — *"the withhold, the adoption ledger and the delivery-at-instant-(b) marshalling"* — goes
//      with it (`§2.4` item 9's adoption-machinery clause of that date: *"RULINGS `(2)` AND `(3)` LEAVE ONE
//      ACTOR: the kernel drives every write … so there is nothing to marshal, and the machinery has no state
//      to hold"*). **THE `DEFECT` THIS CELL PINNED — an abandoned adoption consumed by the next write — IS
//      DISPOSED OF WITH ITS SUBSTRATE AND NOT WITH ITS SYMPTOM**, which is what the removal's own clause
//      claims and what this cell now reads at the boundary.
//
//    · **THE BARE-WRITE DISTINCTION IS DEAD.** `§2.4` item 9 (e) carries `SUPERSEDED-WHOLE` dated
//      2026-10-15 on `RCA-9` (*"EVERY WRITE, WITH OR WITHOUT A SUPPLIED `commit`, OPENS OR JOINS A COMMIT
//      AND PROCEEDS THROUGH THE FLOW, SO NO WRITE IS A `BARE CALLER-MADE WRITE`"*), and `§2.12` item 1's
//      clause of 2026-10-18 removes the entry's `carriesConstraintAt` gate so that **the four-position call
//      enters `K-2` AT EVERY ADDRESS** (`§2.12` item 1's amended clause, items `2` (i)–(iii): *"THE ENTRY'S
//      `carriesConstraintAt` GATE IS REMOVED … an instance constructed with NO `cfg.constraints` element, and
//      an instance constructed WITH them at OTHER addresses, each reach the kernel on every four-position
//      write"*).
//
// ── WHAT SURVIVES, AND IT IS WHAT THIS CELL NOW ASSERTS — THREE OBSERVABLES, EACH ITS OWN:
//    (1) **A WRITE AT AN ADDRESS CARRYING NO PAIR STILL ENTERS THE KERNEL AND STILL DELIVERS ITS LISTENERS
//        EXACTLY ONCE**, with the triggering address as the single argument — the observable the spec
//        declares for this state is *"the INVOCATION COUNT of that write's own listeners — not whether the
//        kernel was consulted"* (`§2.12` item 1's amended clause, item `2` (ii) VERBATIM).
//    (2) **A `commit` THE STORE REFUSED BEFORE ITS VERB LEAVES NO WRITE AND THEREFORE NO DELIVERY** — the
//        refusal is the STORE's own on the STORE's own channel (`kernel-surface.md §2.1` item 2), and no
//        residue exists for any terminal arm to reach. **This route is UNMOVED by the rulings: it never
//        needed the seam, and its `OWED`/floor disposition is the kernel's own.**
//    (3) **THE WRITE THAT FOLLOWS A REFUSED `commit` DELIVERS AT THE PASS'S TERMINAL ARM, ONCE** — and it
//        reaches that delivery as EVERY write now does, through the kernel, not through a bypass
//        (`§2.7`'s clause of 2026-10-18, item `1`: *"THE DELIVERY OF THAT WRITE'S TRIGGERED HANDLES IS THE
//        PASS'S TERMINAL ARM's — `§2.7` ITEM 7's INSTANT"*).
//
// ── THE SINGLE ACTOR, STATED SO THE CELL CANNOT BE READ AS ASSERTING A BYPASS: the kernel is in the middle
//    of every write (ruling `(3)`: *"Any occasion where the write path is not governed by the kernel is a
//    hallucination"*), so NO arm below asserts a delivery reached *outside* the kernel. **WHAT THE COUNT
//    READS IS THE DELIVERY'S OWN ARITY FROM THE CALLER'S SIDE** (`§2.7` item `7` (a): the delivered set,
//    each identity ONCE, the triggering address as its single argument), which is the ONE observable both
//    the old and the new law agree a drive may read.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_neg_dm_07_every_write_enters_the_kernel_and_delivers_its_listeners_once_including_after_a_refused_commit', async () => {
  const { commit } = await kernel();

  // ── (1) THE ADDRESS CARRYING NO PAIR — `§2.12` item 1's amended clause, item `2` (ii). THIS ARM IS THE
  //    ONE THE REMOVED GATE USED TO BYPASS, and its observable is UNCHANGED by the removal: the listener
  //    body runs ONCE, carrying the triggering address.
  {
    const store = makeStore();
    const address = [tag('dm07c')];
    const calls = [];
    listenAndRegister(store, address, (a) => { calls.push(a); });
    store.write(address, 'mem', 'the control write');
    assert.deepEqual(calls, [address],
      'AN ADDRESS CARRYING NO PAIR STILL DELIVERS ITS LISTENER, ONCE, WITH THE TRIGGERING ADDRESS — '
      + '`§2.12` item 1\'s amended clause of 2026-10-18, item `2` (ii): the write reaches the kernel at '
      + 'EVERY address and the kernel\'s pass over an address with no registered pair "evaluates NOTHING '
      + 'and PASSES, so the write proceeds to the terminal arm\'s delivery exactly as `§2.7` items 6–7 '
      + 'declare, and the observable a drive reads is the INVOCATION COUNT of that write\'s own listeners '
      + '— not whether the kernel was consulted". One invocation per distinct handle (`§2.4` rule 3), '
      + 'carrying the triggering address as its ONE argument (`§2.7` item 5) — read '
      + `${JSON.stringify(calls.length)} call(s). FAIL-STATE DISTINGUISHED: a surface that delivers `
      + 'nothing here, or that delivers twice — the first would be the removed gate still bypassing the '
      + 'kernel, the second a double delivery `§2.7` item 7 (a) forbids by "each ONCE"');
  }

  // ── (2) A `commit` THE STORE REFUSED BETWEEN THE RECORD AND THE VERB — THIS ARM IS UNMOVED BY THE
  //    RULINGS AND ITS OBSERVABLE IS STILL THE STORE'S OWN REFUSAL WITH NO DELIVERY.
  {
    const store = makeStore();
    const address = [tag('dm07b')];
    const calls = [];
    listenAndRegister(store, address, (a) => { calls.push(a); });
    const refused = capture(() => commit(store, address, 'mem'));
    assert.equal(refused.threw, true,
      'THE REFUSED CALL IS THE STORE\'S OWN AND ITS WRITE NEVER RAN: an absent `value` is answered by the '
      + 'STORE\'S OWN code ON THE STORE\'S OWN CHANNEL at the verb call, and the kernel mints no `KC-2` '
      + 'for it (`kernel-surface.md §2.1` item 2; `parameter-semantics.md §2.14`) — read '
      + (refused.threw ? `the store's own refusal (${JSON.stringify(refused.thrown && refused.thrown.status)})`
        : 'a return, so this route drove no refusal at all'));
    assert.equal(calls.length, 0,
      'and the refused call delivered nothing: ITS WRITE NEVER RAN, so no residue exists for any terminal '
      + 'arm to reach (`§2.7` item 7\'s instant is the PASS\'s terminal arm, and no pass exists for a '
      + 'refused write) — read ' + `${calls.length} invocation(s)`);

    // ── (3) THE NEXT WRITE DELIVERS THROUGH THE UNIFORM PATH — NOT "AT ITS POST-VERB INSTANT" AS A
    //    BYPASS, because no such instant survives (`§2.7`'s clause of 2026-10-18, item `2`: *"ITEM 2'S
    //    WINDOW … IS NO LONGER READ AS AN INVOCATION INSTANT OF ITS OWN, because item `7` supplies the
    //    invocation instant"*). **THE OLD CELL'S FAIL-STATE — an adoption outliving its write and being
    //    consumed by the next one — IS ASSERTED HERE AS THE OUTCOME IT IS NOW GUARANTEED NOT TO HAVE:**
    //    one delivery, once, and no state carried across the refusal.
    const beforeNext = calls.length;
    store.write(address, 'mem', 'the write after the refused commit');
    assert.equal(calls.length - beforeNext, 1,
      'AND THE WRITE THAT FOLLOWS THE REFUSED `commit` DELIVERS ONCE AND ONLY ONCE — the refusal left no '
      + 'write for any residue to belong to, and the uniform path carries no state across it: the kernel '
      + 'drives this write as it drives every write (ruling `(3)`: *"Any occasion where the write path is '
      + 'not governed by the kernel is a hallucination"*), and its delivery is `§2.7` item `7`\'s '
      + 'terminal-arm act, ONE invocation per identity (`§2.7` item `7` (a)) — read '
      + `${calls.length - beforeNext} invocation(s) of ${1} owed. FAIL-STATE DISTINGUISHED: an abandoned `
      + 'state outliving the refused write and consuming the next write\'s delivery — the defect the '
      + 'removed machinery\'s own substrate made possible, now asserted absent at the boundary that can '
      + 'see it');
    assert.deepEqual(calls, [address],
      'and the one invocation carries THIS WRITE\'S OWN TRIGGERING ADDRESS as its single argument '
      + '(`§2.7` item 5) — so the count above is the whole of the reading and not a delivery made to the '
      + 'wrong body, nor a residue of the refused call replayed at this one');
  }
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// `NEG-DM-08` — THE CHECK-OFF REMOVES ONE OCCURRENCE AND THE RESIDUE DELIVERS THE REST
//
// ── THE TITLE'S OWN TERMS, RE-STATED SO THE CELL AND THE MECHANISM READ APART: "ONE OCCURRENCE" IS THE
//    `filter`-VERSUS-`indexOf`-AND-`splice` ASYMMETRY THIS CELL EXISTS TO DRIVE — a write whose
//    `triggered` lawfully carries the same handle TWICE loses ONE `pending` ENTRY to the check-off while
//    the DISCARD, read on the failing arm below, is a `filter` over the member and removes EVERY
//    occurrence of the failed write's returned set — and "THE RESIDUE DELIVERS THE REST" IS THE OWED
//    FIRING THE CHECK-OFF DID NOT WITHDRAW: it is delivered at the terminal arm THROUGH THE REGISTRY'S
//    RESOLUTION OF THE IDENTITY, NOT AS A SURVIVING `pending` OCCURRENCE (`A117` (D4)/(D5) read through
//    (D6), the carrier holding one `pending` entry per address). THE CELL'S SUBJECT IS UNMOVED; THE
//    CARRIER THE TITLE READS IT IN IS NAMED AT EVERY ASSERTION BELOW. ────────────────────────────────
//
// ── ⟶ RE-DERIVED 2026-10-15 ON `A117` (D3)/(D4)/(D5) — `docs/decisions.md`, ACTIVE. **TWO EXPECTATIONS OF
// THIS CELL PINNED THE READING THE ARCHITECT HAS JUST REPLACED AND ARE RE-DERIVED HERE, EACH NAMED AT ITS
// OWN ASSERTION BELOW: (1) "THE RESIDUE CARRIES NO OCCURRENCE OF THE EVALUATED IDENTITY", which rested on
// `§2.4` item 8 (c)'s *"no entry for it stands in `pending` for the residue to reach"* — **SUPERSEDED AND
// DELETED BY `A117` (D3)**; and (2) "THE REGISTRY-SIDE INVOCATION COUNT AT THE TERMINAL ARM IS ZERO FOR
// THE EVALUATED IDENTITY", which read that same derived non-delivery as a delivery rule — **AND THE FIRING
// LAW IS NOT THAT CLAUSE: `§2.7` ITEM 6 SAYS THE OTHER LISTENERS ARE REACHED ONCE EVERY CONSTRAINT HAS
// PASSED (`A117` (D1)), SO A LISTENER REGISTERED AT A PAIR-ADOPTED ADDRESS IS OWED ONE FIRING AT THE
// PASS'S TERMINAL ARM WITH THE TRIGGERING ADDRESS AS ITS SINGLE ARGUMENT (`A117` (D4)) AND THE CHECK-OFF
// CONSUMES THE EVALUATED PAIR'S OWN OWED DELIVERY OF THAT IDENTITY AND NOT THAT IDENTITY'S WHOLE OWED
// DELIVERY (`A117` (D5); `§2.7` item 7's keying clause of 2026-10-15, read with item 7 (a) and with
// `§2.4` item 8 (c) AS CORRECTED at its own site).** The cell's SUBJECT IS UNMOVED and is re-stated under
// that keying: the check-off's OCCURRENCE EXTENT on a write whose `triggered` lawfully carries the same
// handle twice (the `filter`-versus-`indexOf`-and-`splice` asymmetry the discard and the check-off are
// read apart by), and the discard's BY-SET extent on the failing arm. What moves is WHOSE firing the
// residue's member carries — and the carrier CANNOT carry the registration's owed firing at all: it
// holds ONE `pending` ENTRY PER ADDRESS (`A117` (D6)), so the check-off's removal of the evaluated
// identity's entry leaves that identity with NO occurrence in the residue while the registration is
// still owed its ONE firing, which the PASSING arm's terminal arm delivers through the SAME REGISTRY
// LOOKUP the residue uses (`A117` (D4) — an identity the registry holds a function for fires once with
// the triggering address as its single argument; one it holds none for fires nothing silently; and the
// FAILING arm delivers ZERO). THIS CELL AND `ck_neg_dm_06_*` STATE THE SAME KEYING, with the same clause
// citation: `A117` (D3)/(D4)/(D5) read through (D6), both naming the first re-derivation's *"left
// standing in the residue"* reading as superseded.
//
// THE FALSIFICATION, WITH ITS CLAUSES. `surface.md §2.4` item 8 (c) declares that a finding that body run
// at the delivery instant has found a failure of `§2.7` item 7 — and item 7 (a)'s residue is "the whole
// triggered set MINUS the entries the pass checked off as they passed, MINUS the failed write's own
// returned set, AND MINUS NOTHING ELSE". THE LAWFUL STATE THAT PARTS THE TWO REMOVALS: a caller-spelled
// duplicate is a LAWFUL case (`§2.4` rule 3; `DD-42` clause 3; `DD-39`) in which the store returns ONE
// identity TWICE in a write's `triggered`, the boundary carries the list ELEMENT FOR ELEMENT
// (`§2.4`'s dated clause (ii); `§2.7` item 1 — the registry family drives that shape at
// `registry.test.mjs:404-409, 463-469`, and its handles are wrapped at `index.mjs`'s `wrapHandles`), and
// `K-2` writes `record.pending = written.triggered.slice()` so TWO occurrences stand in the member.
//
// THE ASYMMETRY IS THE TELL: THE DISCARD REMOVES EVERY OCCURRENCE — `attempt-lifecycle.md §3` item 8
// fixes it as "the member filtered against the handles that write returned", i.e. a `filter` over the
// member — WHILE THE CHECK-OFF REMOVES ONE, an `indexOf`-and-`splice` per evaluated pair's handle. So on
// ONE evaluated pair whose identity the write returned twice, exactly `1` occurrence SURVIVES the pass,
// and the terminal arm reaches that identity ONCE MORE by iteration over the residue: **A CHECKED-OFF
// ENTRY IS DELIVERED.**
//
// ── THE STATES ENUMERATED BEFORE THIS CELL WAS AUTHORED ──────────────────────────────────────────
// S1  A LAWFUL DUPLICATE ON THE PASSING ARM — the state this cell drives: two construction `listeners[]`
//     entries at one address carrying ONE caller-spelled token (so the store's returned set carries the
//     resolved handle TWICE, element for element), `K-1` a pair at that same address (so that one identity
//     IS the evaluated pair's own handle: the store's home entry is idempotent at the address,
//     `write-and-read.md §6.5` item 12 (c)), and a `K-3` whose only pair returns the pass arm.
// S2  THE SINGLE-OCCURRENCE CONTROL — the same fixture with ONE construction entry AND NO registration at
//     the pair's address: the store's own returned set is the pair's one handle, the check-off removes that
//     identity's own entry (the only `pending` entry the carrier holds for that address, `A117` (D6)), and
//     THE TERMINAL ARM FIRES NOTHING — not because the ruling withholds a firing, but because the identity
//     the registry resolves a function for AT THAT ADDRESS IS THE PAIR'S OWN, and the pass already ran it
//     as its own evaluation: an identity the registry holds a function for fires once with the triggering
//     address as its single argument, and this one's once is the pass's (`A117` (D4)/(D5); `§2.7` item 6;
//     item 7 (c), driven for its own sake at `ordering.test.mjs`'s
//     `ord_an_ordered_write_whose_every_entry_was_checked_off_*`). NOT RE-DRIVEN HERE; no
//     assertion of this cell depends on it. (The superseded reading of THIS state — that the pair's
//     identity can never owe anything at its own address — is withdrawn by `A117` (D3)/(D4).)
// S3  THE NON-EVALUATED ENTRY BESIDE THE EVALUATED ONE — the watched-prefix registration of the passing
//     arm (`ck_neg_dm_06_*`): it stands in the residue and is delivered once, which is what tells a
//     CHECK-OFF apart from a clear of the member. NOT RE-DRIVEN HERE.
//
// ── THE OBSERVABLES, AND THE FAIL-STATE EACH ONE NAMES ──────────────────────────────────────────
// E1  THE RESIDUE CARRIES NO OCCURRENCE OF THE EVALUATED IDENTITY AND REACHES IT ANYWAY — read as an
//     OCCURRENCE COUNT and then by the SET RELATION: the check-off removes THE EVALUATED IDENTITY'S OWN
//     ENTRY, the carrier holding ONE `pending` entry PER ADDRESS (`A117` (D6); one home entry per
//     address), so of the TWO occurrences the store returned for that identity exactly `0` survive —
//     `pending.filter(evaluated).length` is `0` while `triggered.filter(evaluated).length` is still `2`
//     — AND THE REGISTRATION IS STILL OWED ITS ONE FIRING, WHICH THE TERMINAL ARM DELIVERS THROUGH THE
//     REGISTRY'S RESOLUTION OF THAT IDENTITY AND NEVER BY A SECOND `pending` OCCURRENCE (`A117` (D4)/
//     (D5), read with (D6)). THE SUPERSEDED EXPECTATIONS, NAMED, AND BOTH ARE: THE FIRST RE-DERIVATION of
//     this cell read `1` surviving occurrence and called it *"the owed firing the check-off left
//     standing"* — a SECOND `pending` ENTRY FOR ONE ADDRESS, WHICH THE CARRIER CANNOT HOLD; and the
//     reading before the ruling derived non-delivery from `§2.4` item 8 (c)'s *"no entry for it stands
//     in `pending` for the residue to reach"*, which `A117` (D3) SUPERSEDES AND DELETES. The member
//     count either reading produced is the same; what parted them from the mechanism is WHERE THE OWED
//     FIRING LIVES — in the REGISTRY'S RESOLUTION, not in a `pending` occurrence.
//     FAIL-STATE: a check-off that left an occurrence of that identity standing (a member carrying the
//     evaluated identity, which the carrier's one-entry-per-address shape cannot lawfully produce), a
//     residue that lost a NON-evaluated identity's entry, and a terminal arm that fires for an identity
//     the registry holds no function for (`§2.7` item 6; `§2.4` item 8 (c) AS CORRECTED at its own site).
// E2  `triggered` STANDS VERBATIM — still the TWO occurrences the store returned, before and after the
//     pass. FAIL-STATE: a removal reaching `triggered`, which item 7 (a)'s "MINUS NOTHING ELSE" forbids
//     and which `ck_neg_dm_06_*` also reads.
// E3  THE REGISTRY-SIDE INVOCATION COUNT AT THE TERMINAL ARM IS ONE for the evaluated identity's
//     registration, read at the app registration's own body record, WITH ITS ONE ARGUMENT THE TRIGGERING
//     ADDRESS (`A117` (D4); `§2.7` items 6, 7 and 7 (b); item 5's one-argument view). THE SUPERSEDED
//     EXPECTATION, NAMED: this observable once read ZERO invocations, and read that zero as the clause's
//     own law. FAIL-STATE: a body invoked inside the store verb's window (instant (a)'s withholding), a
//     body invoked twice, or an invocation whose argument view is not the triggering address.
//
// ── WHAT THIS CELL DOES NOT ASSERT ──────────────────────────────────────────────────────────────
// It asserts NO count of the pass's own layer-(a) invocation of the pair body beyond "the pair was
// evaluated once" — the pair's body is the kernel's own window and is not this cell's subject — and it
// asserts nothing about `runAttempt`'s report beyond the arm this fixture reaches.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_neg_dm_08_the_check_off_removes_one_occurrence_and_the_residue_delivers_the_rest', async () => {
  const { register, commit, runAttempt } = await kernel();

  // ── THE FIXTURE: ONE CALLER-SPELLED TOKEN, TWO CONSTRUCTION ENTRIES, AND `K-1`'s PAIR AT THE SAME
  //    ADDRESS ───────────────────────────────────────────────────────────────────────────────────
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
  // FIXTURE'S CALLER-SPELLED DUPLICATE IS RETIRED AND RE-DERIVED TO THE STATE THE UNIT PUTS IN ITS PLACE.**
  //
  // **THE RULING, AT ITS OWN BYTES — `docs/specs/storeroom-held-listener-identity/contract.md §2.1` item 3:**
  // *"The CALLER-SPELLED DUPLICATE STATE — `cfg.listeners` "duplicates KEPT" (`docs/specs/storeroom-js/
  // surface.md:161`), the `DD-39` adoption rule and `surface.md:798-812`'s two duplicate cases — DOES NOT
  // SURVIVE IN THAT FORM: a handle names ONE listener, standing at the addresses ONE `listen` gave it"*
  // (`P: docs/pending.md · P-6`'s rule 3). **The boot route sends `cfg.listeners` through
  // `listen(handle, addresses)` and ACCUMULATES one handle's N elements into ONE set** (`§2.2` item 8;
  // `listen-verb.md §6` item 1; `bindings/js/index.mjs:2226-2232`), so two elements naming ONE handle at ONE
  // address collapse to ONE entry and the duplicate never reaches the store.
  //
  // **WHAT SURVIVES OF THIS CELL IS DRIVEN, NOT DROPPED — ITS SUBJECT IS *"the check-off removes the
  // EVALUATED PAIR'S OC...ENTRY and leaves the other handle's residue standing"*, and the state that
  // produces TWO handles at ONE address under the new declaration is `K-1`'s pair beside a CALLER's
  // registration, which the fixture below builds exactly.** The `§5` `S-8` state (one handle at N addresses)
  // is driven in `convenience.test.mjs`'s boot cell; THIS cell needs two DIFFERENT handles at ONE address, so
  // the store's own `listen` spells them.
  const address = [tag('dm08a')];
  const token = tag('dm08t');
  const store = makeStore();
  // **THE CALLER'S OWN REGISTRATION AT THE ATTEMPT'S ADDRESS** — one handle, one address, spelled by the caller
  // (`contract.md §2.1` item 1; `(AA-5)`).
  store.listen(token, [address]);
  let pairRuns = 0;
  // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: `pairRuns` is this cell's count of the PASS's own runs
  // (`K-3`'s act), so the registration's invocation is answered by the shield; the pair is CARRIED (state 1).
  const pairHandle = register(store, address, 'x', atLandingOnly(() => { pairRuns += 1; return true; }));
  const appRuns = [];
  let appArgs = null;
  const appHandle = listenAndRegister(store, address, (...view) => {
    appArgs = view;
    appRuns.push(view.length);
  });
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
  // THE TWO REGISTRATIONS ARE TWO ENTRIES, SO THE AS-FILED `appHandle === pairHandle` HAS NO SUBJECT.** It
  // rested on *"the store holds ONE home entry per address"* — TRUE of the ADDRESS in the old identity
  // model, where `K-1`'s registration and a later `store.on` at one address were answered the SAME adopted
  // handle. **Under the caller-spelled identity the uniqueness rule is per HANDLE STRING and not per address**
  // (`identity-and-domain.md §1` item 4: *"The store holds AT MOST ONE LIVE ENTRY PER HANDLE STRING … a reused
  // handle REPLACES"*; `contract.md §2.1` item 1; `(AA-5)`), so the pair's \`constraint@\` entry and the app's
  // own registration are TWO rows.
  //
  // **THE CELL'S SUBJECT IS UNMOVED AND IS NOW ASSERTED AT THE OBSERVABLE IT EXISTS FOR: the identity the PASS
  // EVALUATES is the kernel's own, and the app's registration is a DIFFERENT identity the pass does not
  // evaluate and the check-off does not reach.** That is the stronger reading — the as-filed equality would
  // have been GREEN on a build that collapsed two callers' registrations into one row.
  assert.notEqual(appHandle, pairHandle,
    'the app\'s own registration and the kernel\'s pair are TWO caller-spelled identities and therefore TWO '
    + 'store entries (`identity-and-domain.md §1` item 4: uniqueness is PER HANDLE STRING, so two different '
    + 'strings are two rows over one address)');
  assert.equal(typeof appHandle, 'string', 'and both are strings the callers spelled (`contract.md §2.1` item 1)');
  assert.equal(typeof pairHandle, 'string', '...likewise the kernel\'s own (`remove-member.md`; `§2.1` item 1)');
  const record = commit(store, address, 'mem', 1);
  const evaluated = (h) => h === pairHandle;

  // ── THE LAWFUL DUPLICATE, AT `K-2`'s RETURN ────────────────────────────────────────────────────
  assert.equal(pairRuns, 0,
    'S1 pre-condition: NO PAIR BODY RAN INSIDE THE STORE VERB\'S WINDOW — the pass is `K-3`\'s act '
    + '(`surface.md §2.4` item 9\'s instant (a); `A116` (D1)) — read ' + pairRuns + ' call(s)');
  assert.equal(appRuns.length, 0,
    'and no handle body of this write was reached in that window either: the record identity stands '
    + 'adopted, so the package\'s post-verb invocation set for this write is EMPTY (`§2.4` item 9\'s '
    + 'table row (a))');
  // **⟶ RE-DERIVED 2026-10-18 WITH THE FIXTURE: THE SET IS TWO PAIRS, EACH CARRYING ONE DISTINCT HANDLE** —
  // the caller's own registration and the kernel's pair at the attempt's address — **and the DEDUPE ON HANDLE
  // is what makes the figure two** (`trigger-and-pair.md §5` items 1–2: *"Dedupe on handle — rule 3
  // stands"*; `docs/specs/storeroom-js/surface.md:309`). **THE AS-FILED `2` COUNTED ONE IDENTITY TWICE; the
  // cell's subject — *"the check-off removes the EVALUATED identity's entry and leaves the OTHER handle
  // standing"* — is only assertable at TWO DISTINCT identities, so this is the stronger shape and not a
  // weakened one.**
  // **`THREE` ENTRIES AT ONE ADDRESS, ONE PER CALLER-SPELLED IDENTITY** — the store's own `listen` for the
  // app's registration, the kernel's pair, and this cell's own `listenAndRegister` for the app body —
  // **and the count is read as a SET of distinct handles and never as a sequence** (`DD-22`).
  assert.equal(record.triggered.length, 3,
    'the store answered this write with THREE pairs, one per caller-spelled identity at the attempt\'s '
    + 'address — read ' + record.triggered.length);
  assert.equal(new Set(setHandles(record.triggered)).size, 3,
    'and they are THREE DISTINCT handles, never one carried twice (`trigger-and-pair.md §5` item 1)');
  assert.equal(setHandles(record.triggered).filter(evaluated).length, 1,
    'and EXACTLY ONE of them is the identity the pair\'s own registration answered with — read '
    + JSON.stringify(setHandles(record.triggered).filter(evaluated)));
  assert.deepEqual(setHandles(record.pending), setHandles(record.triggered),
    'AND AT `K-2`\'S RETURN THE MEMBER IS THE WHOLE RETURNED SET, entry for entry '
    + '(`attempt-lifecycle.md §3` item 10; `kernel-surface.md §2.1` item 2) — read '
    + record.pending.length + ' of ' + record.triggered.length);

  // ── THE PASS, AND THE RESIDUE IT LEAVES ────────────────────────────────────────────────────────
  const report = runAttempt(store, record);
  assert.equal(report.outcome, 'passed',
    'S1: every registered pair at the attempt\'s address returned the pass arm (`§2.7` item 7\'s '
    + 'terminal arm) — read ' + JSON.stringify(report.outcome));
  assert.equal(pairRuns, 1,
    'the pass evaluated that one pair, once, in its own window (`§2.7` item 6; `kernel-surface.md '
    + '§2.1` item 2) — read ' + pairRuns + ' call(s)');

  // E1 — AS AN OCCURRENCE COUNT, AND THEN BY THE SET RELATION. THE ORDER OF THESE TWO ASSERTIONS IS THE
  // POINT: the count of surviving occurrences is read BEFORE the relation, so a residue that carried BOTH
  // occurrences cannot be read as "the relation holds because the member is small", and the count is read
  // as THE ENTRIES LEFT BY ONE CHECK-OFF and not as a raw multiplicity.
  assert.equal(record.pending.filter(evaluated).length, 0,
    'THE RESIDUE CARRIES NO OCCURRENCE OF THE EVALUATED IDENTITY — AND THE REGISTRATION IS STILL OWED ITS '
    + 'ONE FIRING, WHICH IS NOT CARRIED BY A `pending` OCCURRENCE AT ALL: the pass\'s check-off removes '
    + 'THE EVALUATED IDENTITY\'S OWN ENTRY (`A117` (D5); `§2.7` item 7 (a): the member is the returned set '
    + 'MINUS the entries the pass checked off as they passed, "AND MINUS NOTHING ELSE"), and THE CARRIER '
    + 'HOLDS ONE `pending` ENTRY PER ADDRESS (`A117` (D6); `kernel-surface.md §2.1` item 2; `CommitRecord`\'s '
    + 'four members, none added) — so where the store returned that identity TWICE, both occurrences being '
    + 'the ONE home handle for that one address, the check-off of that entry leaves `0` occurrences of it '
    + 'standing, and a SECOND occurrence CANNOT lawfully be there: a second `pending` entry for one address '
    + 'is impossible without a store or record change, which (D6) forbids. What the registration is owed is '
    + 'delivered by THE REGISTRY\'S RESOLUTION OF THAT IDENTITY at the passing arm\'s terminal arm — the '
    + 'same lookup the residue uses (`A117` (D4)/(D5); `§2.7` item 6) — and that is asserted below as the '
    + 'one invocation, never by this member. THE SUPERSEDED EXPECTATIONS, NAMED, AND BOTH ARE: THIS LINE '
    + 'LAST READ `1` and called that surviving occurrence *"the owed firing the check-off left standing"* — '
    + 'A SECOND `pending` ENTRY FOR ONE ADDRESS, WHICH THE CARRIER CANNOT HOLD, and the reading this file\'s '
    + 'own first re-derivation introduced — and BEFORE THAT it read `0` under `§2.4` item 8 (c)\'s derived '
    + 'non-delivery (*"no entry for it stands in `pending` for the residue to reach"*), which `A117` (D3) '
    + 'SUPERSEDES AND DELETES as a non-delivery: the two readings differ on WHY the member is empty, and '
    + 'the mechanism is that the identity\'s entry left by its own check-off while its firing stands owed in '
    + 'the registry. FAIL-STATE: a check-off that left an occurrence of that identity standing (a member '
    + 'carrying the evaluated identity, a shape this carrier cannot lawfully produce on this fixture) and, '
    + 'on the other side, a check-off that reached NOTHING (a residue still carrying both occurrences, '
    + 'which leaves the pair\'s own evaluation owing) — read '
    + record.pending.filter(evaluated).length + ' surviving occurrence(s) of the evaluated identity, and '
    + record.pending.length + ' member(s) standing in the residue');
  // **⟶ RE-DERIVED 2026-10-18: THE RESIDUE IS THE RETURNED SET MINUS THE ONE EVALUATED ENTRY, EXACTLY**
  // (`attempt-lifecycle.md §3` item 8 / `§2.4` item 7 (a): the member is the returned set MINUS the entries the
  // pass checked off as they passed, *"AND MINUS NOTHING ELSE"*). **Three pairs were returned and ONE was
  // checked off, so TWO stand** — and the two that stand are BY IDENTITY the two the pass did not evaluate,
  // which is a stronger reading than the as-filed emptiness could make: it distinguishes a per-ENTRY check-off
  // from a wholesale clear of the member.
  assert.equal(record.pending.length, 2,
    'the residue is the returned set MINUS the one checked-off entry — read ' + record.pending.length
    + ' member(s) of ' + record.triggered.length + ' returned');
  assert.deepEqual(setHandles(record.pending), setHandles(record.triggered).filter((h) => h !== pairHandle),
    'AND THE TWO STANDING ENTRIES ARE, BY IDENTITY, EXACTLY THE TWO THE PASS DID NOT EVALUATE — '
    + '`A117` (D5) and `§2.4` item 7 (a)\'s *"AND MINUS NOTHING ELSE"*, read entry for entry and never by a '
    + 'count');
  assert.equal(setHandles(record.pending).filter(evaluated).length, 0,
    'THE RESIDUE CARRIES NO ENTRY OF THE EVALUATED IDENTITY — THE CHECK-OFF REMOVED IT BY ITS OWN ENTRY '
    + '(`A117` (D5); `§2.7` item 7 (a)) — read '
    + setHandles(record.pending).filter(evaluated).length + ' surviving entry(ies)');
  assert.equal(record.pending.length, record.triggered.length - 1,
    'WHICH IS ALSO THE SET RELATION ITEM 7 (a) FIXES, READ AT ITS OWN EXTENT: ONE returned entry left by the '
    + 'pass\'s own check-off and NOTHING ELSE subtracted — the DISCARD\'s by-set extent is read apart from this '
    + 'on the failing arm below (`§3` item 8) — read ' + record.pending.length + ' member(s) against '
    + record.triggered.length + ' returned');

  // E3 — THE REGISTRY-SIDE COUNT AT THE TERMINAL ARM, READ AT THE BODY'S OWN RECORD, AND THE FIRING THE
  //      RULING OWES IT (`A117` (D4)).
  assert.equal(appRuns.length, 1,
    'AND THE TERMINAL ARM INVOKES THE APP\'S OWN BODY EXACTLY ONCE — THE ONE FIRING THAT REGISTRATION IS '
    + 'OWED: `§2.7` item 6 is the law of FIRING — *"THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY '
    + 'CONSTRAINT HAS PASSED"* (`A117` (D1)) — so a listener registered at the address a constraint pair '
    + 'holds IS OWED ITS FIRING AFTER THE PASS (`A117` (D3)/(D4): *"a listener registered at a '
    + 'pair-adopted address is owed ONE firing — after the pass, at the pass\'s terminal arm, never inside '
    + 'the store verb\'s window"*), and the check-off of THE EVALUATED IDENTITY\'S OWN ENTRY leaves that '
    + 'identity with no `pending` occurrence while its firing stands owed in THE REGISTRY\'S RESOLUTION OF '
    + 'IT — the same lookup the residue uses (`A117` (D5) read through (D6), the carrier holding one '
    + '`pending` entry per address; `§2.7` item 7 (a); `§2.4` item 8 (c) AS CORRECTED at its own site). THE '
    + 'SUPERSEDED EXPECTATION, NAMED: THIS LINE ONCE READ `0` — *"THE TERMINAL ARM INVOKES NO BODY FOR '
    + 'THE CHECKED-OFF IDENTITY"* — which read `§2.4` item 8 (c)\'s derived non-delivery as a delivery '
    + 'rule; `A117` (D3) DELETES that derivation and (D4) declares the firing, so the expectation is '
    + 're-derived here and NOT deleted. FAIL-STATE: the measured defect — ZERO invocations of ONE owed '
    + '(`A117` (D7): *"the app\'s body was invoked ZERO times of ONE owed"*); ALSO a body run INSIDE the '
    + 'store verb\'s window, whose in-window invocation set is empty (instant (a)\'s withholding STANDS — '
    + '`§2.7` item 7, `A117` (D6)), and a body run TWICE, whose second delivery no owed firing carries — '
    + 'read ' + appRuns.length + ' invocation(s) of the app body on this whole drive');
  assert.deepEqual(appArgs, [address],
    'AND THAT ONE INVOCATION CARRIES THE TRIGGERING ADDRESS AS ITS SINGLE ARGUMENT — the address the '
    + 'write\'s own op landed at, and never the id that selected the function (`A117` (D4): *"with the '
    + 'triggering address as its single argument"*; `§2.7` item 5\'s one-argument referent; '
    + '`kernel-surface.md §2.1` item 2 (ii)). THE SUPERSEDED EXPECTATION, NAMED: this line once read '
    + '`appArgs === null` — *"no invocation\'s argument view was ever produced for it"* — the absence of '
    + 'the call standing as the observable, which `A117` (D3)/(D4) supersedes WITH the call. FAIL-STATE: a '
    + 'call carrying the handle, carrying the id, or carrying no argument at all — read '
    + JSON.stringify(appArgs) + ' of ' + JSON.stringify([address]));

  // E2 — `triggered` STANDS VERBATIM, STILL CARRYING THE DUPLICATE THE STORE RETURNED.
  // ⟶ RE-DERIVED 2026-10-18 WITH THE FIXTURE: `triggered` STANDS VERBATIM AT ITS THREE ENTRIES, ONE PER
  // CALLER-SPELLED IDENTITY AT THE ATTEMPT'S ADDRESS (`§2.7` item 7 (a)'s *"MINUS NOTHING ELSE"* — the
  // check-off moves the member and never the store's own list). **The as-filed `2` counted one identity twice;
  // the claim — *"no removal reaches `triggered`"* — is UNMOVED and is now read at three distinct handles,
  // so a build that mutated the store's own list on a check-off fails here.**
  assert.equal(record.triggered.length, 3,
    'AND `triggered` STANDS VERBATIM: no removal reaches it, so all THREE entries the store returned are '
    + 'still there after the pass — read ' + record.triggered.length + ' entry(ies)');
  assert.equal(setHandles(record.triggered).filter(evaluated).length, 1,
    '...and the evaluated identity is still ONE of them, unmoved by its own check-off — read '
    + JSON.stringify(setHandles(record.triggered).filter(evaluated)));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// `NEG-DM-09` — THE ABANDONED ATTEMPT: `commit` SUCCEEDS AND THE CALLER NEVER CALLS `runAttempt`
//
// THE CLAUSE THAT DECIDES THIS HOLE, AT ITS OWN BYTES — `attempt-lifecycle.md §2.4` item 8 (iv), whose
// subject IS this state: **"AND THE ONE WAY AN ATTEMPT'S LIVE WINDOW OUTLASTS THE CALL: AN APP THAT
// NEVER CALLS `K-3`. NO KERNEL ACT DISPOSES OF AN ATTEMPT WHOSE RUN THE CALLER NEVER ISSUED, AND THE
// KERNEL DECLARES NO WITHDRAWAL: `K-3` is the ONLY disposer there is … SO AN ATTEMPT WHOSE `K-3` THE APP
// NEVER CALLS STANDS `OPEN`, ITS ADDRESS STANDS HELD, AND A `K-2` THERE MEETS `KC-7` — DECLARED, AND
// NOT A GAP."** Read with `fail-surface.md §2`'s `KC-7` row (the `K-2` site refuses a second call at
// that address "ONLY WHILE THE ATTEMPT IS GENUINELY LIVE", and the hold "is released by the attempt's
// own TERMINAL ARM AND BY NO OTHER ACT"), with `kernel-surface.md §2.1` item 2's refusal clause (a
// second `K-2` at a held address is refused "BEFORE THE WRITE VERB IS REACHED"), with
// `composition-and-states.md §2.7` item 12 (ii) (a fresh `K-2` that RETURNS is the declared OBSERVATION
// of the attempt-record entry's removal, and one that throws `KC-7` shows it STANDING because the
// attempt is still live), and with `surface.md §2.4` item 9 (b) (the terminal arm empties the residue).
//
// ── WHAT A PASS OVER THIS HOLE OWED, AND WHAT IT FOUND AT THE FOUR OBSERVABLES ──────────────────
// (1) THE STRANDED RECORD'S OWN STATE — DECIDED: `OPEN` (item 8 (iv)), held at its address.
// (2) THE NEXT WRITE'S INSTANT — DECIDED: a `K-2` AT THAT ADDRESS MEETS `KC-7`, refused before the
//     write verb, so no write of that call lands.
// (3) WHETHER A LATER `runAttempt` STILL DELIVERS — DECIDED FOR THE TERMINAL ARM: the residue leaves
//     the member by its own check-off at that arm (`§2.7` item 7 (a); `surface.md §2.4` item 9 (b)),
//     read here as the member's emptiness after the late attempt.
// (4) WHETHER THE ABANDONMENT WITHHOLDS ANYTHING — NOT DECIDED. THE FINDING IS (B) BELOW, RECORDED
//     AND NOT INVENTED.
//
// ── THE STATES ENUMERATED BEFORE THE CELL ────────────────────────────────────────────────────────
// T1  THE ABANDONED ATTEMPT — `K-2` returns, its write landed, its adoption drained, and no `K-3`.
// T2  ITS TERMINAL ARM, DRIVEN LATE — the same record's `K-3`, reachable from the caller's own side
//     (item 8 (iv): "the caller holding its `AttemptRef` can run that attempt at any later call").
// T3  THE ADDRESS LEFT FREE BY THAT ARM — a fresh `K-2` there afterwards.
//
// ── THE FAIL-STATES THIS CELL PINS ──────────────────────────────────────────────────────────────
// F-a A `K-2` at the abandoned attempt's own address that RETURNS a record instead of throwing
//     `KC-7` — the live attempt's hold gone by an act that is not its terminal arm.
// F-b A `K-2` at that address that throws a form other than the kernel's own `{status, message, log}`
//     or a token other than `KC-7`.
// F-c A fresh `K-2` at that address THROWING `KC-7` AFTER the terminal arm — a hold outliving its
//     attempt.
// F-d The late attempt's terminal arm that leaves a residue standing.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_neg_dm_09_the_abandoned_attempt_stands_open_holds_its_address_and_is_disposed_of_by_its_own_late_terminal_arm', async () => {
  const { register, commit, runAttempt } = await kernel();

  const held = [tag('dm09h')];
  const fresh = [...held, tag('dm09f')];
  const store = makeStore({ journalLength: 16 });
  store.write(held, 'mem', { seed: 'the abandoned attempt\'s own address holds a link' });

  let pairRuns = 0;
  // ⟶ `A135` (3) / `§7.3` (b) state 1: same shield — the pair's own run count is the ATTEMPT's, and the
  // registration's own invocation belongs to neither the window nor the residue this cell reads.
  const pairHandle = register(store, held, 'x', atLandingOnly(() => { pairRuns += 1; return true; }));
  const appRuns = [];
  let appArgs = null;
  const appHandle = listenAndRegister(store, held, (...view) => {
    appArgs = view;
    appRuns.push(view.length);
  });
  // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail): THE
  // TWO IDENTITIES ARE TWO, NOT ONE.** The as-filed equality rested on *"the fixture's one registration at
  // this address answers with ONE identity"* — the OLD identity model's one-adopted-handle-per-address
  // reading. **Under the caller-spelled identity each registration is its own handle and its own row**
  // (`identity-and-domain.md §1` item 4; `contract.md §2.1` item 1; `(AA-5)`). **THE CELL'S SUBJECT — *"the
  // residue this cell reads after the late arm is the identity's whose pair the pass evaluates"* — IS
  // UNMOVED and is read at the pair's own handle throughout below; the distinction is now STATED rather than
  // assumed, and the residue assertions that follow name the pair's handle explicitly.**
  assert.notEqual(appHandle, pairHandle,
    'the app\'s own registration and the kernel\'s pair at this address are TWO caller-spelled identities '
    + 'and therefore TWO store rows (`identity-and-domain.md §1` item 4)');
  assert.equal(typeof pairHandle, 'string',
    'and the pair\'s own handle is a string the kernel spelled (`contract.md §2.1` item 1; `(AA-5)`) \u2014 it '
    + 'is the identity the pass evaluates and the check-off reaches');
  // ── T1 — THE ABANDONMENT ITSELF: `K-2` RETURNS, THE WRITE LANDED, AND NO `K-3` IS ISSUED ────────
  const record = commit(store, held, 'mem', 1);
  assert.equal(pairRuns, 0,
    'no pair body ran in the write verb\'s own window — the pass is `K-3`\'s act and none was issued '
    + '(`surface.md §2.4` item 9\'s instant (a); `A116` (D1)) — read ' + pairRuns + ' call(s)');
  assert.equal(appRuns.length, 0,
    'and the package\'s post-verb invocation set for this write is EMPTY: its identity stands adopted, '
    + 'so the in-window delivery is withheld BEFORE the verb is reached (`§2.4` item 9\'s table row (a)) '
    + '— read ' + appRuns.length + ' invocation(s)');
  assert.deepEqual(record.pending.slice(), record.triggered,
    'and the record the caller holds carries its own residue at `K-2`\'s return — the WHOLE returned '
    + 'set, no pass having run (`attempt-lifecycle.md §3` item 10; `kernel-surface.md §2.1` item 2) — '
    + 'read ' + record.pending.length + ' member(s) of ' + record.triggered.length);

  // ── (1) AND (2) — THE STRANDED RECORD'S STATE, READ BY ITS OWN DECLARED OBSERVATION ─────────────
  // There is no reader over the kernel's live registry, so the state `OPEN` is read exactly as
  // `composition-and-states.md §2.7` item 12 (ii) declares it: through a fresh `K-2` at that address.
  let refused = null;
  try {
    commit(store, held, 'mem', 2);
  } catch (thrown) {
    refused = thrown;
  }
  assert.notEqual(refused, null,
    'F-a: A SECOND `K-2` AT THE ABANDONED ATTEMPT\'S OWN ADDRESS IS REFUSED — `attempt-lifecycle.md '
    + '§2.4` item 8 (iv): "an attempt whose `K-3` the app never calls stands `OPEN`, its address stands '
    + 'held, and a `K-2` there meets `KC-7` — DECLARED, AND NOT A GAP" — read a call that RETURNED a '
    + 'record, which would show the hold gone by an act that is not the attempt\'s terminal arm');
  assertKernelForm(refused, 'the refused second commit at the held address');
  assert.equal(refused.status, KC[7],
    'F-b: and it is the kernel\'s own existing token for that state — `KC-7` at its `K-2` half, refused '
    + 'BEFORE the write verb is reached, so no write of that call landed (`fail-surface.md §2`\'s `KC-7` '
    + 'row; `kernel-surface.md §2.1` item 2) — read ' + JSON.stringify(refused.status));
  assert.deepEqual(refused.log, [],
    'and the refusal opened no attempt and appends nothing: an empty log is the token\'s own declared '
    + 'shape at this site (`kernel-surface.md §2.1` item 2) — read ' + JSON.stringify(refused.log));

  // ── (3) — THE LATE TERMINAL ARM, AND THE RESIDUE IT EMPTIES ────────────────────────────────────
  // BEFORE the late attempt, one fact is recorded rather than asserted, because NO CLAUSE DECIDES IT
  // (finding (B) below): the abandoned write's registered body has NOT been reached at this instant.
  const appRunsBeforeTheLateArm = appRuns.length;
  const pairRunsBeforeTheLateArm = pairRuns;

  let late = null;
  let lateRefusal = null;
  try {
    late = runAttempt(store, record);
  } catch (thrown) {
    lateRefusal = thrown;
  }
  assert.equal(lateRefusal, null,
    'T2: THE RECORD IS STILL RUNNABLE FROM THE CALLER\'S OWN SIDE — no clause bars a `K-3` whose `K-2` '
    + 'was issued long ago, and the record identity the caller holds is the one the arm reads '
    + '(`attempt-lifecycle.md §2.4` item 8 (iv): "the caller holding its `AttemptRef` can run that '
    + 'attempt at any later call") — read a terminal arm answered '
    + (lateRefusal === null ? JSON.stringify(late.outcome) : JSON.stringify(lateRefusal.status)));
  assert.equal(late.outcome, 'passed',
    'and this fixture\'s only pair returns the pass arm, so the attempt reaches item 4\'s arm `(a)` '
    + '(`attempt-lifecycle.md §2.4` item 4; `§2.7` item 7\'s terminal arm) — read '
    + JSON.stringify(late.outcome));
  // **⟶ RE-DERIVED 2026-10-18: *"THE RESIDUE IS EMPTY"* WAS THE OLD MODEL'S FIGURE, WHERE THE PAIR'S ENTRY
  // AND THE APP'S REGISTRATION AT ONE ADDRESS WERE ONE ROW.** Under the caller-spelled identity the residue
  // after the late arm is the returned set MINUS the one entry the check-off removed, and **THE CLAIM — *"the
  // evaluated pair's entry leaves the member BY ITS CHECK-OFF AS IT PASSED"* — IS UNMOVED and is now read
  // BY IDENTITY, which is the only reading that can tell a check-off from a wholesale clear.**
  assert.equal(carriesHandle(record.pending, pairHandle), false,
    'F-d: AND THE TERMINAL ARM TAKES THE EVALUATED PAIR\'S OWN ENTRY OUT OF THE RESIDUE — it leaves the '
    + 'member BY ITS CHECK-OFF AS IT PASSED (`§2.7` item 7 (a); `surface.md §2.4` item 9 (b), the member the '
    + 'kernel calls and the entry implements) — read '
    + JSON.stringify(setHandles(record.pending)) + ' standing after the arm');
  assert.deepEqual(setHandles(record.pending), setHandles(record.triggered).filter((h) => h !== pairHandle),
    'and the residue is EXACTLY the returned set minus that one entry and nothing else '
    + '(`attempt-lifecycle.md §3` item 8; `trigger-and-pair.md §3` item 5) — read '
    + JSON.stringify(setHandles(record.pending)));
  assert.equal(pairRuns - pairRunsBeforeTheLateArm, 1,
    'and the pass evaluated that pair IN THE LATE ARM\'S OWN WINDOW — exactly once, so the arm is a '
    + 'terminal arm and not a no-op (`§2.7` item 6; `kernel-surface.md §2.1` item 2) — read '
    + (pairRuns - pairRunsBeforeTheLateArm) + ' call(s)');

  // ── T3 — THE ADDRESS THE ABANDONMENT HELD IS FREE AFTER THAT ARM, AND ONLY AFTER IT ─────────────
  let freshRecord = null;
  let freshRefusal = null;
  try {
    freshRecord = commit(store, held, 'mem', 3);
  } catch (thrown) {
    freshRefusal = thrown;
  }
  assert.equal(freshRefusal, null,
    'F-c: A FRESH `K-2` AT THAT ADDRESS AFTER THE TERMINAL ARM RETURNS — the hold is released by the '
    + 'attempt\'s own terminal arm and by no other act (`fail-surface.md §2`\'s `KC-7` row; '
    + '`composition-and-states.md §2.7` item 12 (ii): a fresh `K-2` that RETURNS is the declared '
    + 'observation of the attempt-record entry\'s removal) — read a call refused '
    + (freshRefusal === null ? 'nothing' : JSON.stringify(freshRefusal.status)));
  assert.equal(typeof freshRecord, 'object',
    'and it answers a record rather than a refusal — read ' + (freshRecord === null ? 'null' : 'a record'));
  runAttempt(store, freshRecord);

  // ── (4) THE HALF NO CLAUSE DECIDES — THE FINDING, RECORDED WITH ITS CLAUSES, ITS DRIVE AND WHAT
  //    ACTUALLY HAPPENS. NOTHING ABOVE AND NOTHING BELOW ASSERTS AN EXPECTATION FOR IT. ─────────────
  // FINDING (B) — THE DELIVERY INSTANT OF A RECORD WHOSE PASS NEVER RUNS. THE CLAUSES SEARCHED:
  // `attempt-lifecycle.md §2.4` item 8 (iv) (which disposes of the attempt's OPEN state, its held
  // address and its `KC-7`, and names no delivery instant); `surface.md §2.4` item 9's table, whose two
  // instants are BOTH kernel acts — (a) from `commit`, (b) from `runAttempt`'s terminal arm — and whose
  // row (a) withholds the in-window set for the write in flight while naming no arm for a write whose
  // pass is never driven; `§2.4` item 9 (c)–(e) and `§2.7` items 7 (c)–(d) and 8 (all of which are read
  // at a terminal arm or at the bare caller-made write's post-verb instant, and none of which reaches a
  // record whose terminal arm is not taken); and `RC-3`, whose own clause reads "the residue a failure
  // leaves and what a later attempt at that address reads off the standing commit-registry entry is the
  // parked row `RC-3` — NOTHING IS INVENTED HERE". WHAT ACTUALLY HAPPENS AT THIS TREE, AT THIS DRIVE:
  // between `K-2`'s return and the late terminal arm the abandoned write's registered body is reached
  // ZERO times (read before the late arm: app body ` + appRunsBeforeTheLateArm + ` invocation(s)) — so
  // the abandonment WITHHOLDS the delivery rather than delivering it at the verb's own window — and the
  // late terminal arm is the one act that reaches it. THE CLAUSE THAT WOULD DECIDE IT IS THE ONE THIS
  // PASS DID NOT FIND: neither "the withheld set is delivered when the record is next settled" nor "an
  // abandoned record's handles are delivered at the next write's instant" is declared anywhere, and
  // `§2.4` item 9 (e) fixes only the BARE caller-made write's instant. THIS CELL ASSERTS NO EXPECTATION
  // FOR THE ABANDONED RECORD'S OWN DELIVERY INSTANT AND DOES NOT WEAKEN THE POINT INTO A PASSING FORM.
  assert.equal(appRunsBeforeTheLateArm, 0,
    'AND WHAT IS ASSERTED HERE IS THE OBSERVATION AND NOT AN EXPECTATION: at this drive the abandoned '
    + 'write\'s body was reached ' + appRunsBeforeTheLateArm + ' time(s) before its late terminal arm — '
    + 'recorded as the finding above, the clause that would decide it being absent from the directory, '
    + 'rather than asserted as a delivery rule (`§2.4` item 9 (e) moves "NEITHER THAT INSTANT NOR ITS '
    + 'DECLARED HOLE" for the bare route, and no clause states one for this route)');
  // ── ⟶ RE-DERIVED 2026-10-15 ON `A117` (D4), AT THE ASSERTION THAT MOVED: THE LATE TERMINAL ARM IS A
  //    TERMINAL ARM, so the registration this fixture stands at the abandoned write's own address is OWED
  //    ITS FIRING LIKE ANY OTHER PAIR-ADOPTED ADDRESS'S REGISTRATION — AT THAT ARM, WITH THE TRIGGERING
  //    ADDRESS AS ITS SINGLE ARGUMENT (`§2.7` item 6, the law of FIRING; `A117` (D1)/(D4)). The fixture
  //    below therefore IS affected, and the measurement is this drive's own: `pairHandle === appHandle`
  //    (asserted at the cell's head) — ONE home entry per address, so the identity the check-off removed
  //    from the residue IS the identity the registry resolves a function for — and the arm reaches this
  //    body ONCE with the held address, read here. **THE SUPERSEDED EXPECTATION, NAMED: THIS LINE ONCE READ
  //    `null`** — *"no invocation's argument view stands beside it — the absence of a call is the whole of
  //    what this drive records here"* — which read the check-off's emptying of the residue as the
  //    withdrawal of a firing; `A117` (D3) DELETES that derived non-delivery, and the firing is (D4)'s.
  //    THE FINDING (B) ABOVE IS UNAFFECTED AND IS WHY THIS ASSERTION IS CHECKABLE: no clause decides the
  //    instant of a record whose pass never runs, so this drive records that the abandonment WITHHOLDS the
  //    delivery (zero before the arm) and that the LATE TERMINAL ARM is the one act that performs it —
  //    which is exactly (D4)'s instant, "after the pass, at the pass's terminal arm, never inside the store
  //    verb's window". FAIL-STATE: a body reached before that arm (the withholding gone), a body reached
  //    twice, or a call whose argument view is not the triggering address.
  assert.equal(JSON.stringify(appArgs), JSON.stringify([held]),
    'AND THE LATE TERMINAL ARM REACHES THAT BODY ONCE WITH THE HELD ADDRESS AS ITS SINGLE ARGUMENT '
    + '(`A117` (D4); `\u00a72.7` item 6) \u2014 read ' + JSON.stringify(appArgs) + ' of ' + JSON.stringify([held]));
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════

// `NEG-DM-10` — THE ARCHITECT'S SECOND CORRECTION: A LISTENER REGISTERED AT THE ADDRESS A CONSTRAINT
// PAIR HOLDS IS OWED ITS FIRING ONCE EVERY CONSTRAINT HAS PASSED
//
// TEXT CITED, NAMED BECAUSE THE REMAND HAS NOT LANDED: the clauses read here are the ones standing at
// this tree — docs/specs/storeroom-js/surface.md section 2.4 item 8's opening clause with (a)–(c) (its
// (c) still printing "IS NOT DELIVERED AT THAT INSTANT" and "no entry for it stands in pending for
// the residue to reach", at surface.md:794), section 2.7 items 5–7 with 7 (a)–(d) (surface.md:1268,
// :1285, :1287–:1291), section 2.4 item 9's table rows (a)/(b) (surface.md:831–:832), and
// docs/specs/storeroom-constraints/kernel-surface.md section 2.1 items 2–3 (pending's check-off
// clause at kernel-surface.md:244–:245; the terminal arm's seam call site at :325). A re-scoped
// section 2.4 item 8 (c) keyed into section 2.7 item 7 was dispatched in parallel and had NOT landed
// when this cell was written, so (c)'s superseded half is cited at its own bytes beside the ruling.
//
// THE ARCHITECT'S RULING, IN EFFECT THE AUTHORITY THIS CELL IS DERIVED FROM (docs/decisions.md, the
// correction of 2026-10-15): section 2.7 item 6 governs FIRING — "for a write, the surface runs the
// write's TRIGGERED CONSTRAINTS FIRST, and THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY CONSTRAINT
// HAS PASSED" — while section 2.4 item 8 (c) is a REGISTRATION-side statement (which identity the app's
// on holds at an address the home entry already carries, and which function the pass evaluates) and
// it OVERREACHED by deriving non-delivery from that bookkeeping fact; "IS NOT DELIVERED AT THAT INSTANT"
// and "no entry for it stands in pending for the residue to reach" are SUPERSEDED. A listener turned
// on at that address is NOT a listener that never fires. Section 2.4 item 8 (c)'s REGISTRATION/EVALUATION
// half — the pair's own body runs ONCE inside the pass, the function that runs once at that address being
// the one THE PASS EVALUATES — is LAW AND UNMOVED, and is asserted here beside the firing.
//
// THE DEFECT THE CELL PINS (live-measured at scratch/n7-ordering-demo-gate6b-out-b1.json q2 and
// scratch/n7-ordering-demo-gate6-out-run1.json limbs 1/3/7 — read for the shape of the drive, not
// edited): at EXACTLY the pair's address the store holds ONE home entry per address (Reading (K),
// section 2.4 item 8's opening clause with (a)), so on(ADDR, appFn) returns THE SAME HANDLE the pair's
// registration holds (strict equality true); on a PASSING write the pass checks that identity off, the
// residue the terminal arm reads is EMPTY, and the app's body is invoked ZERO times of ONE owed —
// pending@arm=0 of triggered=1. Its sibling at the PROPER PREFIX is delivered once, at the terminal arm,
// with the triggering address as its single argument. Both routes reach that address: on(ADDR, fn) and
// register(adoptedHandle, fn).
//
// ── THE STATES ENUMERATED BEFORE THE CELL ──────────────────────────────────────────────────────────
// S1  A PASSING KERNEL-DRIVEN WRITE AT A ONE-PAIR ADDRESS, WITH A LIVE LISTENER REGISTERED AT THAT SAME
//     ADDRESS AFTER THE PAIR — the on route (leg A) and the register(adoptedHandle, ·) route (leg B):
//     the SAME drive on two stores, so no second cell is added for the second route.
// S2  THE SAME WRITE WITH THE SAME LISTENER REGISTERED AT THE PROPER PREFIX INSTEAD — a second identity
//     the pass never evaluates (the sibling control, leg C).
// S3  THE FAILING WRITE AT THE SAME ADDRESS WITH THE SAME LIVE LISTENER — the existing law's other arm,
//     whose zero deliveries STAY ZERO (section 2.7 item 7 (d); section 2.4 item 9 (d)); carried in the
//     same cell so the correction is not read as widening the failing arm.
// The check-off as the only lawful removal of an entry, and the residue's by-set extent, are read at S1.
//
// ── THE FAIL-STATES COVERED ────────────────────────────────────────────────────────────────────────
// F-a  the app's body invoked ZERO times on a passing write at the pair's address (the measured defect:
//      0 of 1 owed) — asserted as an exact count;
// F-b  the same body delivered anywhere OTHER than the pass's terminal arm — read off a frame trail whose
//      frames are this cell's own ("outside the pass" for anything in the store verb's window, and a call
//      standing after the pass returned);
// F-c  the invocation's argument being anything but the triggering address, or its argument view being
//      other than ONE (section 2.7 item 5);
// F-d  a second delivery of a body on a passing write at the sibling identity — the sibling's count is
//      pinned to ONE, so the correction cannot be satisfied by over-delivering elsewhere;
// F-e  the pair's own body NOT running once inside the pass (the unmoved registration/evaluation half);
// F-f  the passing write's residue not being the returned set minus the checked-off pair's own entry (the
//      check-off as the ONLY lawful removal — any other surviving entry is the SIFT the clauses declare
//      unlawful) — and, under the ruling, the residue REACHING the listener's identity;
// F-g  a delivery on the FAILING arm's record: zero of the failed write's own triggered set, and zero for
//      the live listener, in whose window and after it.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_neg_dm_10_a_listener_registered_at_the_address_a_pair_holds_is_reached_once_every_constraint_has_passed', async () => {
  const { register, commit, runAttempt } = await kernel();

  // ── ONE DRIVE, TWO REGISTRATION ROUTES: the ONE term that varies between leg A and leg B is how the
  //    app's registration reaches the pair's own identity — through on(ADDR, fn) or through
  //    register(adoptedHandle, fn). No second cell is added for the second route. ───────────────────
  function driveFiring(route) {
    const store = makeStore({ journalLength: 16 });
    const prefix = [tag('dm10p')];
    const own = [...prefix, tag('dm10o')];
    const eventLog = [];

    // ── THE PASS'S OWN FRAMES, SO A CALL IS TIMED AND NOT GUESSED. inPass is true only while
    //    runAttempt stands on the stack; passReturned is set when it returns. A body's call is
    //    therefore timed exactly: inside the store verb's window (the pass not yet entered), inside the
    //    pass, or after the pass returned (section 2.7 items 2 and 7's two instants; section 2.4 item 9's
    //    table rows (a)/(b)). ─────────────────────────────────────────────────────────────────────────
    let inPass = false;
    let passReturned = false;
    const frameOf = () => {
      if (inPass) return 'the pass window';
      if (passReturned) return 'after the pass returned';
      return 'outside the pass (the write verb\'s own window)';
    };
    const passLog = (kind, extra) => {
      eventLog.push(Object.assign({ index: eventLog.length, kind, where: frameOf() }, extra));
    };

    const pass = runAttempt;
    const runAttemptTimed = (s, record) => {
      passLog('pass-enter', {});
      inPass = true;
      try {
        return pass(s, record);
      } finally {
        inPass = false;
        passReturned = true;
        passLog('pass-return', {});
      }
    };

    // ── THE SEAM, WRAPPED ON THE INSTANCE THIS DRIVE ITSELF CREATED, FOR THE TRAIL ALONE. The wrapper
    //    records the reach and the pending length it receives and then calls the instance's own
    //    member with the same receiver and the same argument. Nothing under src/, nothing of the package
    //    and no existing record is touched. ───────────────────────────────────────────────────────────
    const originalSettle = store.settle;
    const settleReaches = [];
    store.settle = function recordedSettle(record) {
      const pending = Array.isArray(record && record.pending) ? record.pending : null;
      settleReaches.push({
        where: frameOf(),
        pendingLength: pending === null ? null : pending.length,
      });
      return originalSettle.call(this, record);
    };

    // ── THE FIXTURE. A home entry stands at the prefix, so the write's own trigger selection carries
    //    BOTH addresses' registrations (the store's descendant-inclusive prefix test). ───────────────
    store.write(prefix, 'mem', { seed: 'the prefix home entry stands' });
    let pairRuns = 0;
    // ⟶ `A135` (3) / `contract.md §7.3` (b) state 1: THIS CELL READS THE PAIR'S BODY *"INSIDE THE PASS"* AND
    // THE RUN COUNT AT THE WINDOW'S CLOSE, so the registration's own invocation — an act of neither the window
    // nor the pass — is answered by the shield, and the pair is CARRIED (state 1). The event log this cell
    // filters by `where` would otherwise carry one `'pair-body'` event from outside every window.
    const pairHandle = register(store, own, 'x', atLandingOnly(() => {
      pairRuns += 1;
      passLog('pair-body', { runs: pairRuns });
      return true;
    }));

    // THE SIBLING: a registration at the PROPER PREFIX — a SECOND identity the pass never evaluates
    // (kernel-surface.md section 2.3 item 1: the pass's set is the address-scoped one).
    const siblingSeen = [];
    const siblingHandle = listenAndRegister(store, prefix, (address) => {
      siblingSeen.push(address);
      passLog('sibling-body', { address });
    });
    const siblingsBeforeThisWrite = siblingSeen.length;

    // ── THE APP'S OWN BODY AT THE ADDRESS THE PAIR HOLDS ─────────────────────────────────────────────
    const appSeen = [];
    const appBody = function appBody(address) {
      appSeen.push({ address, argumentCount: arguments.length });
      passLog('app-body', { address });
    };
    const onRoute = route === 'on-at-the-adopted-address';
    const appHandle = onRoute ? listenAndRegister(store, own, appBody) : pairHandle;
    if (!onRoute) store.register(pairHandle, appBody);
    // BOTH ROUTES REACH ONE IDENTITY, so the register(adoptedHandle, ·) route is covered here and no
    // second cell is added for it (section 2.4 item 8 (b)'s held-arm observable: "the second on call
    // RETURNS THE SAME OPAQUE IDENTITY"; Reading (K) at the section's opening clause).
    // READ ON THE \u0001on\u0001 ROUTE ONLY: \u0001register\u0001 answers \u0001undefined\u0001 (section 2.4 item 5), so the handle it
    // writes for IS the argument it was handed, and this drive's leg B reads that identity by
    // construction rather than off a return value.
    const appHandleIsTheAdoptedHandle = onRoute ? appHandle === pairHandle : null;

    // ── THE PASSING WRITE ─────────────────────────────────────────────────────────────────────────────
    const record = commit(store, own, 'mem', 'v');
    const pendingAtTheCommitsReturn = record.pending.slice();
    const appRunsWhenTheWindowClosed = appSeen.length;
    const pairRunsWhenTheWindowClosed = pairRuns;
    const siblingRunsWhenTheWindowClosed = siblingSeen.length - siblingsBeforeThisWrite;

    const report = runAttemptTimed(store, record);

    const appCalls = eventLog.filter((e) => e.kind === 'app-body');
    const pairCalls = eventLog.filter((e) => e.kind === 'pair-body');
    const siblingCalls = eventLog.filter((e) => e.kind === 'sibling-body');
    const appCallsInThePass = appCalls.filter((e) => e.where === 'the pass window');
    const appCallsOutsideThePass = appCalls.filter((e) => e.where !== 'the pass window');
    const siblingCallsInThePass = siblingCalls.filter((e) => e.where === 'the pass window');
    const passEntry = eventLog.find((e) => e.kind === 'pass-enter');
    const passExit = eventLog.find((e) => e.kind === 'pass-return');
    const between = (index) => index > passEntry.index && index < passExit.index;
    const pendingAtTheTerminalArm = settleReaches
      .filter((r) => r.where === 'the pass window')
      .map((r) => r.pendingLength);

    return {
      appSeen, appCalls, appCallsInThePass, appCallsOutsideThePass,
      appHandle, appHandleIsTheAdoptedHandle, appRunsWhenTheWindowClosed, between,
      pairCalls, pairHandle, pairRuns, pairRunsWhenTheWindowClosed,
      passEntry, passExit, pendingAtTheCommitsReturn, pendingAtTheTerminalArm,
      record, report, runAttemptTimed, settleReaches,
      siblingCalls, siblingCallsInThePass, siblingHandle, siblingRunsWhenTheWindowClosed,
      siblingSeen, siblingsBeforeThisWrite, route, store, own,
    };
  }

  for (const route of ['on-at-the-adopted-address', 'register-at-the-adopted-handle']) {
    const d = driveFiring(route);
    const where = 'NEG-DM-10 leg ' + route;

    // ── S1: THE PASSING WRITE'S OWN ARM, AND THE IDENTITY THE TWO ROUTES REACH ─────────────────────
    assert.equal(d.report.outcome, 'passed',
      where + ': the pair returns the pass arm and the write lands — read '
      + JSON.stringify(d.report.outcome));
    if (d.appHandleIsTheAdoptedHandle === null) {
      assert.equal(d.route, 'register-at-the-adopted-handle',
        where + ': the identity is read BY CONSTRUCTION on the register route — the handle the app\'s '
        + 'registration writes for IS the argument it was handed, which is the pair\'s own handle, '
        + 'because `section 2.4 item 5` answers this member with `undefined` and returns no handle');
    } else {
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
    // THE AS-FILED EQUALITY RESTED ON *"one home entry per address"*, WHICH WAS THE OLD IDENTITY MODEL'S
    // READING.** Under the caller-spelled identity each registration is its own handle and its own row
    // (`identity-and-domain.md §1` item 4; `contract.md §2.1` item 1; `(AA-5)`), so the app's registration at
    // the pair's own ADDRESS is a DIFFERENT identity from the pair's and NOT the same value. **THE CLAIM THE
    // LINE EXISTS FOR — *"the firing below is read at the ADDRESS the pair itself stands at and at no
    // other"* — IS UNMOVED AND IS THE STRONGER READING: the address is asserted directly, and the two
    // identities are asserted DISTINCT so a build that collapsed two callers' registrations into one row
    // fails here.**
    assert.equal(typeof d.appHandle, 'string',
      where + ': the app\'s registration answers a caller-spelled handle (`contract.md §2.1` item 1)');
    assert.notEqual(d.appHandle, d.pairHandle,
      where + ': AND THE APP\'S REGISTRATION AT THE PAIR\'S OWN ADDRESS IS A DIFFERENT IDENTITY from the '
      + 'pair\'s — two caller-spelled strings are two store rows over one address '
      + '(`identity-and-domain.md §1` item 4) — so the firing below is read at the ADDRESS the pair itself '
      + 'stands at and at no other');
    assert.equal(carriesHandle(d.record.triggered, d.pairHandle), true,
      where + ': the write\'s returned set carries the pair\'s own home handle — read '
      + JSON.stringify(d.record.triggered.length) + ' handle(s)');
    assert.equal(carriesHandle(d.record.triggered, d.siblingHandle), true,
      where + ': and the sibling registration at the PROPER PREFIX, a second identity — so the two '
      + 'identities of this drive are read apart from the first assertion onward');
    assert.deepEqual(d.pendingAtTheCommitsReturn.slice(), d.record.triggered.slice(),
      where + ': AT K-2\'S OWN RETURN THE RESIDUE IS THE WHOLE RETURNED SET — no pass has yet run '
      + '(kernel-surface.md section 2.1 item 2; attempt-lifecycle.md section 3 item 10)');
    assert.equal(d.appRunsWhenTheWindowClosed, 0,
      where + ': AND THE APP\'S BODY DID NOT RUN INSIDE THE STORE VERB\'S WINDOW — instant (a)\'s '
      + 'WITHHOLDING STANDS (section 2.4 item 9 row (a): the in-window invocation set is EMPTY; '
      + 'section 2.7 item 7) — read ' + d.appRunsWhenTheWindowClosed + ' call(s) at the window\'s close');
    assert.equal(d.pairRunsWhenTheWindowClosed, 0,
      where + ': and neither did the pair\'s own body — the pass is a LATER act (section 2.7 item 6: the '
      + 'constraints run FIRST, and the pass is the kernel\'s own act at K-3)');
    assert.equal(d.siblingRunsWhenTheWindowClosed, 0,
      where + ': nor the sibling\'s body at the prefix — read '
      + d.siblingRunsWhenTheWindowClosed + ' call(s)');

    // ── THE FIRING THE RULING OWES (the red half of this cell) ─────────────────────────────────────
    assert.equal(d.appSeen.length, 1,
      where + ': THE APP\'S OWN BODY IS INVOKED EXACTLY ONCE ON THIS PASSING WRITE — the architect\'s '
      + 'ruling: section 2.7 item 6, "THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY CONSTRAINT HAS '
      + 'PASSED", governs FIRING, and a listener registered at the address a constraint pair holds IS '
      + 'OWED ITS FIRING after the pass; section 2.4 item 8 (c)\'s "IS NOT DELIVERED AT THAT INSTANT" is '
      + 'a REGISTRATION-side statement that OVERREACHED by deriving non-delivery from the identity the '
      + 'pass checked off, and is SUPERSEDED. FAIL-STATE F-a: the measured defect — ZERO of ONE owed, '
      + 'because the one identity the pass checked off left the residue empty — read '
      + d.appSeen.length + ' call(s) of 1 owed. THE RUN\'S OWN VALUE: pending@arm='
      + JSON.stringify(d.pendingAtTheTerminalArm) + ' of triggered='
      + JSON.stringify(d.record.triggered.length)
      + ' — and the single entry standing in that residue is the SIBLING\'s identity (does the app\'s '
      + 'own identity stand in it: ' + carriesHandle(d.record.pending, d.appHandle) + '), so the ONE owed '
      + 'delivery is exactly the one the terminal arm does not perform');
    assert.equal(d.appCallsInThePass.length, 1,
      where + ': and that ONE invocation stands at THE PASS\'S TERMINAL ARM — after the last constraint '
      + 'of the attempt has been evaluated and before runAttempt returns to the calling process '
      + '(section 2.7 item 7; section 2.4 item 9\'s table row (b), "AT THE PASS\'S TERMINAL ARM") — read '
      + d.appCallsInThePass.length + ' invocation(s) in the pass\'s own frame and '
      + d.appCallsOutsideThePass.length + ' outside it. FAIL-STATE F-b: a delivery made anywhere but the '
      + 'terminal arm — inside the store verb\'s window it contradicts instant (a)\'s withholding, which '
      + 'STANDS (section 2.4 item 9 row (a); section 2.7 item 7: the delivery "DOES NOT OCCUR INSIDE THE '
      + 'STORE VERB\'S WINDOW")');
    assert.deepEqual(d.appCallsOutsideThePass.map((e) => e.where), [],
      where + ': with NOTHING delivered in the write verb\'s window and NOTHING after the pass returned '
      + '— read ' + JSON.stringify(d.appCallsOutsideThePass.map((e) => e.where)));
    assert.deepEqual(d.appCalls.map((e) => d.between(e.index)), [true],
      where + ': AND THE ONE CALL\'S APPEND ORDINAL STANDS BETWEEN THE PASS\'S ENTRY AND ITS RETURN — '
      + 'the frame trail\'s own reading and not a frame name alone (entry ' + d.passEntry.index
      + ', call ' + JSON.stringify(d.appCalls.map((e) => e.index)) + ', return ' + d.passExit.index + ')');
    assert.equal(d.appSeen[0].argumentCount, 1,
      where + ': THE INVOCATION\'S ARGUMENT VIEW IS ONE ARGUMENT (section 2.7 item 5: "the function\'s '
      + 'length-and-arguments view is ONE argument") — read '
      + (d.appSeen[0] && d.appSeen[0].argumentCount)
      + '. FAIL-STATE F-c: a call carrying the id, a context, or no argument at all');
    assert.deepEqual(d.appSeen[0].address, d.own,
      where + ': AND THAT ONE ARGUMENT IS THE TRIGGERING ADDRESS — the write\'s own address and never '
      + 'the registration\'s watch address, and never the id that selected the function (section 2.7 '
      + 'item 5; kernel-surface.md section 2.1 item 2\'s referent clause) — read '
      + JSON.stringify(d.appSeen[0] && d.appSeen[0].address) + ' of ' + JSON.stringify(d.own)
      + '. FAIL-STATE F-c: an argument that is the handle, a prefix, or absent');

    // ── THE UNMOVED HALF: THE PAIR'S OWN BODY, AND THE CHECK-OFF AS THE ONLY LAWFUL REMOVAL ────────
    assert.equal(d.pairRuns, 1,
      where + ': AND THE PAIR\'S OWN BODY RAN ONCE INSIDE THE PASS — section 2.4 item 8 (c)\'s '
      + 'REGISTRATION/EVALUATION half is LAW AND UNMOVED: "the constraint\'s body runs ONCE inside the '
      + 'pass — the function that runs once at that address is the one THE PASS EVALUATES, the evaluated '
      + 'pair\'s own function" — read ' + d.pairRuns + ' call(s). FAIL-STATE F-e: a pass that evaluated '
      + 'no pair, or evaluated it twice');
    assert.equal(d.pairCalls.every((e) => e.where === 'the pass window'), true,
      where + ': the pass\'s own evaluation stands in the pass\'s frame and nowhere else — read '
      + JSON.stringify(d.pairCalls.map((e) => e.where)));
    assert.equal(carriesHandle(d.record.pending, d.pairHandle), false,
      where + ': AND THE PAIR\'S OWN ENTRY LEFT THE RESIDUE BY ITS CHECK-OFF AS IT PASSED — the one '
      + 'lawful removal for an entry the pass reached (kernel-surface.md section 2.1 item 2: "AN '
      + 'ENTRY\'S OWN CHECK-OFF AS IT PASSES IS THE ONLY LAWFUL REMOVAL — a SIFT is UNLAWFUL"; '
      + 'attempt-lifecycle.md section 3 item 10: the checked-off residue after the pass)');
    // **⟶ RE-DERIVED 2026-10-18: THE COMPARISON IS TAKEN AT THE PAIRS' `handle` MEMBERS ON BOTH SIDES**
    // (`trigger-and-pair.md §4` item 1: *"they compare `entry.handle`, never `entry`"*). **The as-filed
    // `d.record.triggered.filter((h) => h !== d.pairHandle)` compared a PAIR to a HANDLE and could never
    // subtract anything — `TF-3`/`TF-4` read from the reader's side. THE CLAIM IS UNMOVED.**
    assert.deepEqual(setHandles(d.record.pending).slice().sort(),
      setHandles(d.record.triggered).filter((h) => h !== d.pairHandle).slice().sort(),
      where + ': SO THE RESIDUE IS THE RETURNED SET MINUS THE EVALUATED PAIR\'S OWN CHECKED-OFF ENTRY '
      + 'AND MINUS NOTHING ELSE (section 2.7 item 7 (a): "the whole triggered set MINUS the entries the '
      + 'pass checked off as they passed ... and MINUS nothing else"), the discard reaching nothing on a '
      + 'passing arm — read ' + JSON.stringify(d.record.pending.length) + ' of '
      + JSON.stringify(d.record.triggered.length) + '. FAIL-STATE F-f: a member from which an entry no '
      + 'pass evaluated was subtracted');
    // **⟶ RE-DERIVED 2026-10-18 (`role_test_writer`, the `U-STOREROOM-HELD-LISTENER-IDENTITY` legacy tail):
    // THE ASSERTION'S DIRECTION IS UNMOVED AND ITS REASON MOVED WITH THE IDENTITY MODEL — WHICH IS THE
    // STRONGER FORM.** The as-filed reason was *"the carrier holds ONE `pending` entry per address, so
    // `appHandle === pairHandle` makes the listener's identity and the pair's ONE ENTRY"*. **Under the
    // caller-spelled identity the two are TWO entries, and the residue's exclusion of `appHandle` is the
    // CHECK-OFF'S OWN EXTENT read at the two identities:** `setHandles(pending) === setHandles(triggered)
    // minus {pairHandle}` (asserted directly above), and `appHandle` is NOT a member of that set — not
    // because a carrier could not hold it, but because the write's returned set never carried it at all.
    //
    // **AND THE TWO FACTS ARE PARTED HERE SO NEITHER IS READ FOR THE OTHER:** the residue's exclusion of
    // `appHandle` follows from the two identities being DISTINCT (`assert.notEqual(d.appHandle,
    // d.pairHandle)` at this cell's head), and the firing this cell pins is delivered by THE REGISTRY'S
    // RESOLUTION OF THAT IDENTITY at the terminal arm — asserted above as the one invocation, at its
    // instant, with the triggering address as its single argument (`A117` (D4)/(D5); `section 2.7` item 7
    // (b)). **FAIL-STATE F-f: a residue the arm reads that STILL CARRIES the evaluated pair's entry — a
    // removal that did not happen.**
    assert.equal(carriesHandle(d.record.pending, d.pairHandle), false,
      where + ': AND THE RESIDUE THE TERMINAL ARM READS DOES NOT CARRY THE EVALUATED PAIR\'S IDENTITY — '
      + 'the check-off took that identity\'s own entry as it passed (asserted directly above), and the '
      + 'residue is the returned set minus exactly that entry and MINUS NOTHING ELSE (`A117` (D5); '
      + 'section 2.7 item 7 (a)). The one owed firing is delivered by THE REGISTRY\'S RESOLUTION OF THAT '
      + 'IDENTITY at the terminal arm, through the SAME lookup item 7 (b) names — asserted above as the '
      + 'one invocation, at its instant, with the triggering address as its single argument '
      + '(`A117` (D4)/(D5)) — and NEVER by a `pending` occurrence. FAIL-STATE F-f: a residue the arm '
      + 'reads that still carries the checked-off entry (a removal that did not happen) — read '
      + 'pending@arm=' + JSON.stringify(d.pendingAtTheTerminalArm) + ' with the pair\'s identity '
      + 'standing in it: ' + JSON.stringify(carriesHandle(d.record.pending, d.pairHandle)));
    // ...and the OTHER identity is excluded for a DIFFERENT reason, asserted separately so the two are
    // never read as one: `appHandle` was never an entry the residue could carry, because the write's own
    // returned set did not carry it (the two identities are distinct — asserted at this cell's head).
    // **⟶ AND THE APP'S OWN IDENTITY STANDS IN THE RESIDUE — THE REVERSAL OF WHAT THE AS-FILED LINE READ, AND
    // ITS DECLARED GROUND.** Under the caller-spelled identity the app's registration is its OWN handle
    // (`identity-and-domain.md §1` item 4), the store's prefix test returned it for this write (a pair at the
    // attempt's own address is matched), and **NO PASS OF THIS ATTEMPT EVALUATES IT — the pass's own set is
    // the PAIRS at the attempt's address (`kernel-surface.md §2.3` item 1) — so nothing checks it off and it
    // STANDS** (`attempt-lifecycle.md §3` item 8; `§2.1` item 2: *"an entry leaves it only by being checked
    // off as it passes"*). **THE AS-FILED `false` WAS THE OLD ONE-ENTRY-PER-ADDRESS MODEL'S ANSWER AND IS
    // RE-DERIVED, NOT WEAKENED: the cell now reads the check-off as ADDRESS-AND-PAIR-SCOPED, which is
    // exactly the discrimination the member exists for. AND THE FIRING THIS CELL PINS IS TOLD APART FROM
    // IT, as the sentence below says: the residue carrying the identity is NOT how the owed firing is
    // delivered.**
    assert.equal(carriesHandle(d.record.pending, d.appHandle), true,
      where + ': AND THE APP\'S OWN IDENTITY STANDS IN THE RESIDUE, because the store returned it for this '
      + 'write and NO PASS OF THIS ATTEMPT EVALUATED IT — the pass is PAIR-SCOPED (`kernel-surface.md '
      + '\u00a72.3` item 1) and only an entry an evaluated pair carries is checked off (`A117` (D5); '
      + '`attempt-lifecycle.md \u00a73` item 8) — read pending@arm='
      + JSON.stringify(d.pendingAtTheTerminalArm) + ' with the app\'s identity standing in it: '
      + JSON.stringify(carriesHandle(d.record.pending, d.appHandle)));
    // **AND THE FIRING IS NOT DELIVERED BY THAT OCCURRENCE, WHICH IS THE TWO FACTS PARTED:** the app's body
    // is reached by the terminal arm's registry resolution of its identity and with the triggering address
    // as its single argument (asserted above), and the residue's carrying the identity is a separate,
    // independent observable.
    assert.equal(carriesHandle(d.record.pending, d.pairHandle), false,
      where + ': while the EVALUATED PAIR\'S own entry does NOT — the check-off took exactly it as it '
      + 'passed (`A117` (D5))');

    // ── S2: THE SIBLING CONTROL, SO THE ADDRESS'S IDENTITY IS PARTED FROM THE DELIVERY LAW ─────────
    assert.equal(d.siblingSeen.length - d.siblingsBeforeThisWrite, 1,
      where + ': AND THE SIBLING AT THE PROPER PREFIX IS DELIVERED EXACTLY ONCE TOO — the measured '
      + 'asymmetry the ruling removes, read as a symmetry — read '
      + (d.siblingSeen.length - d.siblingsBeforeThisWrite) + ' call(s) of 1 owed. FAIL-STATE F-d: a '
      + 'correction that over-delivers at a second identity, or a control that is not live');
    assert.equal(d.siblingCallsInThePass.length, 1,
      where + ': at the terminal arm, as the listener layer\'s one instant (section 2.7 items 6–7) — '
      + 'read ' + d.siblingCallsInThePass.length + ' in the pass\'s frame');
    assert.deepEqual(d.siblingSeen[d.siblingSeen.length - 1], d.own,
      where + ': and the triggering address is that invocation\'s single argument too — read '
      + JSON.stringify(d.siblingSeen[d.siblingSeen.length - 1]) + ' of ' + JSON.stringify(d.own));

    // ── S3: A SECOND TERMINAL ARM OVER THE SAME (SPENT) RECORD DELIVERS NOTHING NEW ────────────────
    const deliveriesBeforeTheSecondArm = d.appSeen.length;
    const secondArm = capture(() => d.runAttemptTimed(d.store, d.record));
    assert.equal(secondArm.threw, true,
      where + ': a second pass over the SAME record is refused — the attempt is closed, so the call '
      + 'answers KC-2 and its terminal arm reaches nothing new (kernel-surface.md section 2.1 item 3)');
    if (secondArm.threw) assertKernelForm(secondArm.thrown, where + ' second terminal arm');
    assert.equal(d.appSeen.length - deliveriesBeforeTheSecondArm, 0,
      where + ': AND THAT REFUSED ARM\'S ZERO STANDS — no delivery this cell did not already count '
      + '(read ' + (d.appSeen.length - deliveriesBeforeTheSecondArm) + ' call(s) across it)');
    }
  }

  // ── THE FAILING WRITE AT THE SAME ADDRESS: THE CORRECTION DOES NOT WIDEN THIS ARM ────────────────
  {
    const store = makeStore({ journalLength: 16 });
    const prefix = [tag('dm10fp')];
    const own = [...prefix, tag('dm10fo')];
    store.write(prefix, 'mem', { seed: 'the prefix home entry stands' });
    let pairRuns = 0;
    // ⟶ `A135` (3) / `§7.3` (b) state 1: shielded, so the pair is CARRIED and its own run count is the
    // PASS's — `pairRuns === 1` is the run this cell asserts, and the failing arm's zero deliveries are read
    // against a pass that ran.
    const pairHandle = register(store, own, 'x', atLandingOnly(() => {
      pairRuns += 1;
      return { message: 'x is invalid and registers no repair' };
    }));
    const appSeen = [];
    const appHandle = listenAndRegister(store, own, (address) => appSeen.push(address));
    const siblingSeen = [];
    const siblingHandle = listenAndRegister(store, prefix, (address) => siblingSeen.push(address));
    const siblingsBeforeThisWrite = siblingSeen.length;

    const record = commit(store, own, 'mem', 'v');
    const pendingAtTheCommitsReturn = record.pending.slice();
    const failure = capture(() => runAttempt(store, record));

    assert.equal(failure.threw, true,
      'NEG-DM-10 failing leg: the pair registers no repair, so the attempt fails on constraints');
    assert.equal(pairRuns, 1,
      'and the pair\'s own body still ran once inside the pass — the failing arm\'s zero deliveries are '
      + 'not a pass that ran nothing');
    assert.equal(appSeen.length, 0,
      'AND THE FAILING ARM DELIVERS ZERO OF THE FAILED WRITE\'S OWN TRIGGERED SET — the DISCARD took '
      + 'it, and the law\'s requirement is that their bodies were NEVER RUN (section 2.7 item 7 (d); '
      + 'section 2.4 item 9 (d)) — read ' + appSeen.length + ' call(s). FAIL-STATE F-g: a body of the '
      + 'failed write\'s own returned set that ran, which "IS A FAILURE OF THIS ITEM BECAUSE A BODY '
      + 'ALREADY RUN IS NEVER UN-RUN"');
    assert.equal(siblingSeen.length - siblingsBeforeThisWrite, 0,
      'and the sibling at the prefix is delivered zero times on this arm too — read '
      + (siblingSeen.length - siblingsBeforeThisWrite) + ' call(s)');
    assert.equal(carriesHandle(record.triggered, appHandle), true,
      'AND THIS ZERO IS A BY-SET ZERO AND NOT A REGISTRATION THAT NEVER EXISTED: the listener\'s own '
      + 'handle IS a member of the failed write\'s returned set, so the discard is what reached it');
    assert.equal(carriesHandle(record.triggered, siblingHandle), true,
      'and the sibling\'s handle is in that set as well');
    assert.equal(carriesHandle(record.triggered, pairHandle), true,
      'and so is the pair\'s own, whose body the pass ran before its violation was read');
    assert.deepEqual(setHandles(pendingAtTheCommitsReturn).slice().sort(), setHandles(record.triggered).slice().sort(),
      'at K-2\'s return the residue is still the whole returned set — the discard is the arm\'s act and '
      + 'not the commit\'s (kernel-surface.md section 2.1 item 2)');
    assert.deepEqual(setHandles(record.pending), [],
      'and after the arm every handle of that write left by the DISCARD — "THE DISCARD REMOVES THE '
      + 'FAILED WRITE\'S OWN RETURNED SET AND NOTHING BESIDE IT" (attempt-lifecycle.md section 2.4 item '
      + '8 (i) (5); section 3 item 8) — read ' + JSON.stringify(record.pending.length));
  }
});

// THE FILE'S OWN CENSUS — so a run reports what it drove and what it could not
// ═══════════════════════════════════════════════════════════════════════════════════════════════════

test('ck_neg_dm_census_the_four_delta_cells_and_the_one_limb_this_unit_cannot_drive', async () => {
  const { register, commit, runAttempt } = await kernel();
  assert.equal(typeof register, 'function');
  assert.equal(typeof commit, 'function');
  assert.equal(typeof runAttempt, 'function');
  // THE FOUR CELLS ABOVE AND THE ONE ROW THEY CANNOT REACH, PRINTED SO THE DIGEST'S TERMS ARE THE RUN'S
  // OWN: `NEG-DM-01` (F1, the red cell), `NEG-DM-02` (F1's extent against an unevaluated handle of the
  // failed write), `NEG-DM-03` (F2's descendant-admission half, whose falsifier is the held address's
  // own `KC-7` — RE-DERIVED at the `A116` pass: the nested `K-2` is raised from THE PAIR BODY THE PASS
  // ITSELF INVOKES, the "listener body inside `K-2`'s window" half being WITHDRAWN BY `A115` (D2) /
  // `A116` (D1) (a) and read there as the withdrawal's own measurement), `NEG-DM-04` (F3/F4's two
  // instants), and `F2`'s second term — the surface's own
  // invocation layer after `K-2`'s return — marked `NOT-EXERCISABLE-BY-THIS-UNIT`, naming `N7`.
  // AND THE FOUR CELLS THIS FILE CARRIES BESIDE THEM, ADDED AT THE GATE-3 RED PASS OF 2026-10-15 AND AT
  // THE ADVERSARIAL PASS THAT FOLLOWED IT: `NEG-DM-08` (THE CHECK-OFF REMOVES ONE OCCURRENCE AND THE
  // RESIDUE DELIVERS THE REST — the caller-spelled duplicate's TWO occurrences at `K-2`'s return, one
  // check-off, and the residue read BY OCCURRENCE against `§2.7` item 7 (a)'s "MINUS NOTHING ELSE",
  // which at this carrier is the evaluated identity's ONE `pending` entry removed from a member that
  // carried it and minus nothing else, the owed firing delivered at the terminal arm through the
  // registry's resolution of the identity and never as a surviving occurrence (`A117` (D4)–(D6)),
  // beside `NEG-DM-09` (THE ABANDONED ATTEMPT — `commit` returns and no `runAttempt` is issued: the
  // attempt stands `OPEN`, its address stands held and a second `K-2` there meets `KC-7` by
  // `attempt-lifecycle.md §2.4` item 8 (iv), its late terminal arm empties the residue, and the delivery
  // instant of a record whose pass never runs is recorded as a FINDING with its clauses, no clause of
  // the directory deciding it). AND THE TWO OLDER ONES: `NEG-DM-05` (the FAILING arm's discard read as a SET RELATION
  // — no handle of the failed write's returned set survives, the watched-prefix registration's handle
  // among them) and `NEG-DM-06` (the PASSING arm's check-off edge, the same fixture, where the arm
  // discards nothing and only the evaluated pair's entry moves).
  // AND THE ONE CLAUSE THIS PASS FINDS UNREACHABLE, NAMED HERE WITH ITS CLAUSE AND ITS DRIVE RATHER
  // THAN ASSERTED ANYWHERE ABOVE: `attempt-lifecycle.md §2.4` item 8 (i) (5)'s other half — "WHILE AN
  // ENTRY FOR A HANDLE OF ANY OTHER WRITE … STANDS IN THE MEMBER AFTER THE ARM" (`§3` item 8; `§2.1`
  // item 2's member clause) — HAS NO REACHABLE DRIVE IN THIS UNIT. THE DRIVE THAT FAILS: the nearest
  // fixture is the watched-PROPER-PREFIX registration (`ck_neg_dm_01_*`/`_02_*`/`_05_*`/`_06_*`), and
  // its handle IS a member of the FAILING WRITE'S own `triggered` set — the store's descendant-inclusive
  // prefix test returns it for the write that fails — so the by-set law REMOVES it and no survivor is
  // produced. A survivor would have to be an entry the failing write did not return, and a handle
  // reaches `pending` only by being returned for a write; the two other sources `kernel-surface.md §2.1`
  // item 2 names — a KERNEL-COMPOSED write (a repair's verb) and a kernel invocation inside `K-2`'s own
  // window — are declared there as NOT READABLE OFF THIS SURFACE'S OWN RECORD, no `CommitRecord` being
  // returned for any write but `K-2`'s own. THE FINDING: the clause's survivor half is checkable only
  // on a member a drive can read beside a failing arm, and this unit's fixtures reach none; the blanket
  // clear's unlawfulness is therefore asserted where it is still real — the passing arm
  // (`ck_neg_dm_06_*`'s "THE ARM DISCARDS NOTHING") and the check-off edge (`ck_neg_dm_04_*`) — and
  // never by an invented survivor. `ck_p_neg_14_the_failed_writes_own_set_leaves_pending_and_the_
  // ancestor_entry_stands_on_both_arms` — RE-DERIVED SINCE AND NOW ID'D
  // `ck_p_neg_14_the_discard_reaches_a_handle_by_the_set_it_came_back_in_and_not_by_the_ancestry_of_
  // its_registration` (`constraint-kernel-negatives.test.mjs:136`) — DOES NOT READ THIS WITHDRAWN
  // PREMISE ON ITS FAILING ARM ANY LONGER: ITS FAILING-ARM BLOCK IS TAKEN BY THE SET RELATION (its
  // member `[]`, the discard reaching every handle that write returned, the ancestry of a registration
  // carrying NO discriminator), so the finding this census filed at that earlier pass is DISCHARGED.
  assert.equal(true, true);
});
