// tests/e2e/blind-registration-instant.test.mjs
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// GATE 5 — THE BLIND INSTANCE FOR `U-STOREROOM-CONSTRAINT-REGISTRATION-INSTANT` (`D-GP-SCRI`).
//
// THE TWO SUBJECTS THIS FILE DRIVES FROM THE OUTSIDE, DRIVING THE PUBLISHED ENTRY ALONE:
//   · SUBJECT ONE — THE PAIR-APPLICATION RULE AT EVERY INSTANT THAT WOULD APPLY A PAIR (`D-90` read through
//     `D-96`: the skip is ABSENCE ALONE, and a resolving LEAF parent APPLIES its pair).
//   · SUBJECT TWO — THE WRITE ROUTE A REPAIR MAY TAKE AT A REGISTRATION INSTANT (`D-91`; the carrier,
//     spelling, positions, join and credit of `PIN-6` and `PIN-7`).
//
// ── THE DISCIPLINE, AND IT IS THE WHOLE POINT OF THIS FILE ──────────────────────────────────────────────
//
// EVERY EXPECTATION BELOW WAS AUTHORISED FROM THE DECLARATION AND FROM NOTHING ELSE. The declaration read
// for this file is:
//   · `docs/specs/storeroom-constraint-registration-instant/contract.md` — `PIN-1`…`PIN-11`, each read with
//     its dated 2026-11-02 blocks (`D-96`'s inverting amendment at `:42`, `PIN-2` (ii)'s three arms, `PIN-3`,
//     `PIN-4` (i)–(iv), `PIN-5`, `PIN-6` (i)–(vi), `PIN-7` (i)–(iv), `PIN-8`, `PIN-9`, `PIN-10`, `PIN-11`),
//     and the four questions of `§8` with their rulings (`Q1` = `D-92`, `Q2` = `D-95`, `Q3` = `D-94`)
//   · `docs/specs/storeroom-constraint-registration-instant/sites.md` — the write set, the forbidden set and
//     the site ledger with its re-take (`§3.1`'s arms 1–9, read as measurements of a date)
//   · `docs/specs/storeroom-constraint-registration-instant/clause-context.md` — the ONE re-derived
//     declaration (`§1.1` the body's five members and the two `null` spellings; `§1.2` the repair's six at a
//     landing and seven at a registration; `§2` the seventh member's own shape, positions and refusal)
//   · `docs/specs/storeroom-constraint-registration-instant/verification.md` — `§3`'s property rows (driven by
//     the sibling file) and the `V` ladder's failing arms
//   · `strata/decisions.md` `D-90`…`D-97`
//   · THE PUBLISHED SURFACE — `bindings/js/index.d.ts` (`StoreStatus`, `StoreRefusal`, `LogEntry`,
//     `WriteRecord`, `DeleteRecord`, `CommitRecord`, `StoreInstance`, `ConstraintPair`, `Constraint`,
//     `StoreConfig`) and `docs/guides/package-use.md` `§7.1`–`§8` (with `§7.2`'s 2026-11-02 corrections at
//     `:894`–`:904`, `§7.4`, `§7.6`, `§7.7`, `§8`, `§8.0a`'s 2026-11-02 scoping at `:1401`, `§8.1`)
//
// **AND NO BYTE OF `bindings/js/src/entry/**` OR OF `src/**` WAS READ TO AUTHOR THIS FILE, AND NONE IS
// IMPORTED.** That is not a formality: a blind set exists to catch a DECLARATION that does not match its
// implementation, and it can only do that if it has not read the implementation. The entry reached here is
// `bindings/js/index.mjs` by PATH — the route this project's `O4` route declares — and nothing else is
// imported: no kernel module, no `state.mjs`, no `constraint-kernel.mjs`, no `Symbol` channel. Every reading
// below is taken at a PUBLISHED member (`storeCreate`, `read`, `readLiteral`, `write`, `delete`,
// `constraints`, `addConstraint`, `constraintOff`, `constraintOn`, `listen`, `register`) or at the value a
// published call threw.
//
// **NO CELL OPENS A DOCUMENT AT RUNTIME** (`D-17`): every expectation is a literal written here, and every
// clause a cell rests on is cited as `path §section` in its own comment.
//
// ── WHAT WAS AND WAS NOT READ, NAMED SO THE BLINDNESS IS AUDITABLE ─────────────────────────────────────
//
// **NOT READ, AT ANY POINT IN THIS PASS: `bindings/js/index.mjs`, `bindings/js/src/entry/**`, `src/**`, and the
// two gate-3 batteries this unit landed — `tests/e2e/pair-application-rule.test.mjs` and
// `tests/e2e/registration-write-route.test.mjs`.** **READ BESIDE THE DECLARATION, AND SAID HERE RATHER THAN
// LEFT IMPLICIT: the opening lines of two existing runners (`tests/e2e/blind-removal-surface.test.mjs` and
// `tests/e2e/blind-constraints-v2.mjs`) for this project's own file conventions, and
// `tests/e2e/held-listener-identity-properties.test.mjs`'s shape for the sibling property file — no cell of
// any of them is re-authored here and no expectation of theirs was read.** **AND THE DRIVES WERE EXERCISED
// AGAINST THE PUBLISHED ENTRY AS A CONSUMER BEFORE THEY WERE WRITTEN**, exactly as `sites.md §3`'s measurements
// were taken, so that no cell can go red on a malformed drive of this file's own making: what that exercise
// fixed was the DRIVE (which published member takes which position, what a leaf parent answers), never an
// EXPECTATION — every expectation below cites the clause it was written from, and the one place where the
// exercise and a published row disagree is carried as a FINDING in cell 10 and in the report.
//
// **A RUN FAILURE IS A FINDING ABOUT THE DECLARATION AND IS NEVER READ AS A PASS, AND NO CELL WAS ADJUSTED TO
// THE TREE.** Each cell prints the readings it took at its own `t.diagnostic` and asserts its drive's
// coherence (the instance exists, the body's own count, the refusal's own form) before it reports a verdict.
//
// ── WHAT EACH CELL PROVES, AND THE DECLARATION EACH WAS WRITTEN FROM ─────────────────────────────────────
//
//   01  the skip's ABSENT-PARENT arm: carried, asked zero times, `constraints()` names it
//       — `PIN-2` (i)(ii)(iv), `PIN-3`, `PIN-4` (i); `D-90` (1)(3); `guide §7.2` (2)
//   02  the RESOLVING-PARENT arms: the register and a written container both ASK the pair
//       — `PIN-2` (ii)(iv), `clause-context §1.1`; `D-96` (1)(3); `guide §7.2` (2)
//   03  the LEAF-PARENT arm is NOT a skip: the pair is ASKED, and a refusing body refuses at rank `19`
//       — `D-96` (1)–(3), `PIN-11` (a-2); `verification.md §2.1` `G3-08` (i) as re-derived
//   04  a skip CROSSES NOTHING AND WRITES NO LOG ENTRY
//       — `PIN-3`; `PIN-11` (c); `guide §8.0a` (its 2026-11-02 scoping at `:1401`)
//   05  the pair STAYS NAMED BY `constraints()` across a disable and a re-arm, and the re-arm asks nothing
//       — `PIN-4` (i); `guide §7.4`; `verification.md §2.1` `G3-10`
//   06  the BATCH and the ADD ROUTE both arm at their own instant, and answer the same evaluation
//       — `PIN-4` (iv); `guide §7.2` (1)(2); `verification.md §2.1` `G3-06`, `G3-07`
//   07  the REPAIR RECORD'S ROUTE: its positions, its answer's shape, and the FOURTH-POSITION refusal's form
//       — `PIN-6` (ii)(iii)(iv); `clause-context §2`; `guide §7.2` (4)
//   08  the route's write RUNS NO PASS OF ITS OWN and delivers no listener
//       — `PIN-6` (v); `guide §7.2` (4)
//   09  the op the route landed IS the op the re-run reads — the join, at its declared observable
//       — `PIN-7` (i)(iii); `D-95` (4); `guide §7.6`
//   10  THE CREDIT IS THE EXISTING RULE: the repairable arm is credited and the re-run decides; a return
//       that is not that arm is not credited and the pair is not re-run
//       — `PIN-7` (ii); `D-94` (1); `guide §7.6`'s closed two-arm set; `verification.md §2.2` `G3-23`
//   11  the LOAD instant does not validate the supplied list for resolvability
//       — `PIN-5` (i); `D-90` (5); `guide §7.2` (5); `verification.md §2.1` `G3-03`, `G3-04`
//   12  the MALFORMED LIST is still the shape arm, on both routes, with ONE sentence
//       — `PIN-5` (ii)(iii); `guide §7.2` (5); `§8.1`'s rank `16`; `sites §3` row 10
//   13  `value` IS READ ONCE: the in-flight record is a datum and not a window
//       — `D-95` (1)(2)(4), `Q2`'s default; `D-92`; `guide §7.2` (4)
//   14  THE RE-RUN IS AN INSTANT THE RULE REACHES, AND IT RUNS ON A CREDITED REPAIR
//       — `D-94` (1)–(3), `D-96` (4); `PIN-4` (iv); `PIN-7` (iv)
//   15  `PIN-9`: a skipped pair cannot be rescued by its own repair, and a pair at its OWN absent key can
//       — `PIN-9`; `D-91` (iv); `guide §7.2` (3)
//   16  the skip INSIDE A PASS, where the act's own subtree reaches the pair
//       — `PIN-4` (iii); `D-90` (4); `D-96` (5)
//
// ── THE DRIVE'S OWN CONVENTIONS, NAMED SO NOTHING IS IMPLICIT ───────────────────────────────────────────
//
// · An ASK-COUNT is a counter the CELL owns, incremented inside the caller-supplied body. It is the one
//   instrument this file uses to observe "asked" without reaching the kernel.
// · A body that must refuse only at a LANDING instant reads `context.op === null` — `clause-context §1.1`
//   spells the registration instant's `op` absent and `null` — and never a private channel.
// · `make()` builds a store at the two required `cfg` keys plus whatever the cell declares; nothing else.
// · A refusal is read with `plainRefusal`, which asserts the ONE form `guide §8` declares: exactly
//   `{status, message, log, address}`, `log` an array, never an `Error`.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { storeCreate } from '../../bindings/js/index.mjs';

/** A store at the two REQUIRED `cfg` keys alone (`index.d.ts`, `StoreConfig`), plus the cell's own keys. */
const make = (extra = {}) => storeCreate({ journalLength: 64, listeners: [], ...extra });

/**
 * THE ONE THROWN FORM (`guide §8`; `index.d.ts`, `StoreRefusal`): a plain object literal carrying EXACTLY
 * `{status, message, log, address}` — never an `Error` subclass, never a tagged union — with `log` a plain
 * array (`[]` where the failure's cause has no attempt at all) and `address` present on every arm
 * (`null` where nothing is nameable). This helper asserts the form and answers the value.
 */
function plainRefusal(value, label) {
  assert.equal(value instanceof Error, false, `${label}: the surface's failure form is a PLAIN object, never an Error`);
  assert.deepEqual(Object.keys(value).sort(), ['address', 'log', 'message', 'status'],
    `${label}: Object.keys(caught) reads exactly ["status","message","log","address"] on EVERY arm (§8)`);
  assert.equal(typeof value.status, 'string', `${label}: status is a string from the store's own closed set`);
  assert.equal(typeof value.message, 'string', `${label}: message is the store's own generated sentence`);
  assert.ok(value.message.length > 0, `${label}: a refusal names itself (§8)`);
  assert.equal(Array.isArray(value.log), true, `${label}: log is never absent, never null and never a non-array (§8)`);
  assert.ok('address' in value, `${label}: the fourth member is present on every arm (D-77)`);
  return value;
}

/** Run `fn`, answering `{threw, value}`. A call that RETURNS is not a refusal; neither arm is a pass here. */
function attempt(fn) {
  try {
    return { threw: false, value: fn() };
  } catch (err) {
    return { threw: true, value: err };
  }
}

/** The census a crossed log is read by: `kind` and `id` of every entry, in append order (`index.d.ts`, `LogEntry`). */
const census = (log) => log.map((entry) => `${entry.kind}:${entry.id === null ? 'null' : entry.id}`);

/** The pairs an instance names, as a set of `address`+`id` projections (`guide §7.1`, `§7.4`). */
const named = (store) => store.constraints().map((pair) => ({ address: pair.address, id: pair.id }));

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 01 — THE SKIP'S ABSENT-PARENT ARM: CARRIED, ASKED ZERO TIMES, NAMED BY `constraints()`
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_01_a_pair_whose_parent_does_not_resolve_is_carried_and_asked_zero_times', (t) => {
  // **THE DECLARATION.** A pair's KEY is its address's LAST SEGMENT and its PARENT is the array MINUS that
  // segment (`PIN-2` (i)). A pair is APPLICABLE exactly when its parent RESOLVES and SKIPPED exactly when it
  // does not; `AddressNotFound` at the parent is the skip's ONE arm (`PIN-2` (ii) with `D-96` (1): "the skip
  // is ABSENCE and only absence"). A skipped pair is NOT ASKED, NOT REFUSED FOR and NOT REPAIRED FOR
  // (`PIN-3`), it is REGISTERED AND CARRIED ANYWAY — registration does not fail for it and `constraints()`
  // names it (`PIN-4` (i); `D-90` (3)) — and it touches no node (`PIN-3`: "no commit frame is entered").
  // `guide §7.2` (2) says the same in the consumer's own words.
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** a thrown `ConstraintRefusedAtRegistration`; an ask-count of
  // `1`; a pair absent from `constraints()`; a node created where the pair stands.
  let asked = 0;
  let handed = null;
  const store = make({
    constraints: [
      { address: ['window', 'tabs'], id: 'skipped-at-construction', constraint: (context) => { asked += 1; handed = context; return { message: 'this body must never be asked here' }; } },
    ],
  });

  // **THE INSTANCE EXISTS** — `storeCreate` RETURNED and nothing crossed. A skip is not a refusal (`PIN-3`).
  assert.equal(typeof store.write, 'function', 'the construction RETURNED AN INSTANCE: a skip is not a refusal (`PIN-3`; `D-90` (2))');
  assert.equal(asked, 0, 'a pair whose parent does not resolve is ASKED ZERO TIMES (`PIN-2` (ii); `PIN-4` (i))');
  assert.equal(handed, null, 'no context was ever built for the skipped pair: its body never ran (`PIN-3`)');

  // **AND IT IS CARRIED.** `constraints()` names the pair; the element is the pair's own address as a
  // one-member SET plus its bare `id`, and carries no third member (`guide §7.1`'s measurement; `§7.4`).
  assert.deepEqual(named(store), [{ address: [['window', 'tabs']], id: 'skipped-at-construction' }],
    'a skipped pair is REGISTERED AND CARRIED and `constraints()` names it (`PIN-4` (i); `D-90` (3))');

  // **AND IT TOUCHED NOTHING.** A skip enters no commit frame and moves no node (`PIN-3`): the register is
  // still empty and neither the pair's address nor its parent stands.
  assert.deepEqual(store.read([]), {}, 'the skip wrote no node: the register is empty (`PIN-3`)');
  const parent = attempt(() => store.read(['window']));
  assert.equal(parent.threw, true, 'the parent does not resolve, which is WHY the pair is skipped (`PIN-2` (ii))');
  assert.equal(plainRefusal(parent.value, 'read(["window"])').status, 'AddressNotFound',
    'the skip\'s ONE arm is `AddressNotFound` at the parent (`PIN-2` (ii), third line)');

  t.diagnostic(`SCREG-01 · THE SKIP AT CONSTRUCTION: the pair at ["window","tabs"] on a fresh store — `
    + `asked ${asked} time(s), constraints() = ${JSON.stringify(named(store))}, read([]) = ${JSON.stringify(store.read([]))}, `
    + `read(["window"]) = ${parent.value.status}. A skip is carried, names itself in the read, crosses nothing and is not a refusal `
    + `(PIN-2 (ii), PIN-3, PIN-4 (i); D-90 (1)-(3); guide §7.2 (2)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 02 — THE RESOLVING-PARENT ARMS: THE REGISTER AND A WRITTEN CONTAINER BOTH ASK THE PAIR
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_02_a_parent_that_resolves_asks_its_pair_the_register_and_a_written_container', (t) => {
  // **THE DECLARATION.** `ReadTargetIsBranch` at the parent ⇒ the parent is a container ⇒ APPLICABLE
  // (`PIN-2` (ii)), and THE EMPTY PARENT IS THE REGISTER, WHICH ALWAYS RESOLVES TO A CONTAINER (`PIN-2` (i))
  // — so a pair at `['window']` on a store holding no `window` is APPLIED with the absence of its own key as
  // the state it judges (`PIN-2` (iv); `D-90` (1); `guide §7.2` (3)). The registration instant hands that body
  // `context.value === undefined`, because its own address cannot be read (`D-96` (2); `clause-context §1.1`).
  // **AND THE BODY'S OWN RECORD CARRIES NO ROUTE** (`D-92`: the route is the repair's alone).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** either arm refusing at registration, or either arm's body
  // not being asked exactly once, or a `write` member standing on the body's five-member context.
  const seen = [];
  const registerArm = make({
    constraints: [
      { address: ['window'], id: 'own-key-absent', constraint: (context) => { seen.push({ arm: 'register', value: context.value, tier: context.tier, op: context.op, hasWrite: typeof context.write }); return true; } },
    ],
  });

  const container = make();
  container.write(['box'], 'mem', {});   // an EMPTY OBJECT written at the parent mints a `Kind::Map` branch (`PIN-2` (ii), `install`)
  const branches = attempt(() => container.readLiteral(['box']));
  assert.equal(branches.threw, true, 'an empty object written at the parent makes it a BRANCH, so `readLiteral` refuses with the branch answer (`PIN-2` (ii))');
  assert.equal(plainRefusal(branches.value, 'readLiteral(["box"])').status, 'ReadTargetIsBranch',
    '`readLiteral` on a container answers `ReadTargetIsBranch` — the discriminator\'s branch arm (`PIN-2` (ii))');
  const boxSeen = [];
  const identity = attempt(() => container.addConstraint(
    { address: ['box', 'tabs'], id: 'container-parent' },
    (context) => { boxSeen.push({ arm: 'container', value: context.value, tier: context.tier, op: context.op, hasWrite: typeof context.write }); return true; },
  ));

  // **BOTH ARMS ARE ASKED EXACTLY ONCE, AT THE INSTANT THAT POPULATES THE PAIR** (`PIN-4` (iv): the batch at
  // construction, `addConstraint`; `D-90` (4): the rule is global, and both examples are applicable).
  assert.equal(seen.length, 1, 'the register-parent pair is ASKED exactly once, at the construction (`PIN-2` (i)(ii); `D-90` (1))');
  assert.equal(boxSeen.length, 1, 'the written-container pair is ASKED exactly once, at `addConstraint` (`PIN-2` (ii); `D-96` (1))');
  assert.equal(identity.threw, false, '`addConstraint` RETURNS an identity for an applicable pair (`index.d.ts`, `addConstraint`)');
  assert.equal(typeof identity.value, 'object', 'the identity is one opaque value the package owns (`index.d.ts`, `ConstraintIdentity`)');
  assert.notEqual(identity.value, null, 'the identity is an object and not a null');

  // **WHAT THE BODY IS HANDED AT A REGISTRATION INSTANT.** The pair's own key does not stand, so the value is
  // `undefined`; the two absences are spelled `null`; and NO ROUTE STANDS ON THIS RECORD (`D-92`).
  assert.equal(seen[0].value, undefined, 'the register-parent pair judges the ABSENCE OF ITS OWN KEY (`PIN-2` (iv); `D-96` (2))');
  assert.equal(seen[0].tier, null, 'the registration instant\'s `tier` is ABSENT and spelled `null` (`clause-context §1.1`)');
  assert.equal(seen[0].op, null, 'the registration instant\'s `op` is ABSENT and spelled `null` (`clause-context §1.1`)');
  assert.equal(seen[0].hasWrite, 'undefined', 'THE CONSTRAINT BODY\'S OWN CONTEXT CARRIES NO ROUTE (`D-92`; `clause-context §1.1`)');
  assert.equal(boxSeen[0].value, undefined, 'a pair whose own address cannot be read is handed `context.value === undefined` (`D-96` (2))');
  assert.equal(boxSeen[0].hasWrite, 'undefined', 'the body\'s context carries no `write` at any instant (`D-92` (1))');

  assert.deepEqual(named(registerArm), [{ address: [['window']], id: 'own-key-absent' }], 'the applicable pair is carried (`index.d.ts`, `constraints()`\'s coverage clause)');
  assert.deepEqual(named(container), [{ address: [['box', 'tabs']], id: 'container-parent' }], 'and so is the one at a written container');

  t.diagnostic(`SCREG-02 · THE TWO RESOLVING ARMS: register parent asked ${seen.length} time(s) with value === undefined, `
    + `tier ${JSON.stringify(seen[0].tier)}, op ${JSON.stringify(seen[0].op)}, write ${seen[0].hasWrite}; `
    + `written-container parent asked ${boxSeen.length} time(s) with value === undefined; readLiteral(["box"]) = ${branches.value.status}. `
    + `A resolving parent APPLIES its pair — as the register or as a container (PIN-2 (i)(ii); D-96 (1); guide §7.2 (2)(3)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 03 — THE LEAF-PARENT ARM INVERTS: A LEAF AT THE PARENT APPLIES ITS PAIR
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_03_a_leaf_standing_at_the_parent_applies_its_pair_and_a_refusing_body_refuses_at_rank_19', (t) => {
  // **THE DECLARATION, AND THE ARM IT INVERTS.** `PIN-2` (iii) first printed the leaf arm as a SKIP; the
  // architect rejected that threshold verbatim — *"Reject this, the constraint being there implicitly expects
  // `'x'` to be a container"* — so `D-96` (1)–(3) INVERT it: `readLiteral(parent)` answering ANY VALUE ⇒ the
  // parent is a LEAF ⇒ **APPLICABLE**. The pair's presence declares its parent a container, so a leaf there is
  // the state the pair is asked to judge, and the registration instant hands the body
  // `context.value === undefined` (`D-96` (2)). **AND A BODY THAT REFUSES A STATE IT MEETS AT A RESOLVING
  // PARENT REFUSES THE REGISTRATION AT RANK `19`** (`PIN-11` (a-2); `D-96` (4)).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** the pair carried and SKIPPED under the primitive — the
  // withdrawn reading — which shows as an ask-count of `0` and a construction that stands with a refusing
  // body. That single reading is the one this cell exists to catch.
  const passing = make();
  passing.write(['window'], 'mem', 5);          // a PRIMITIVE at the parent: a leaf, and `install` never gives a leaf a structured value
  const leaf = attempt(() => passing.readLiteral(['window']));
  assert.equal(leaf.threw, false, '`readLiteral` on a leaf ANSWERS A VALUE and does not refuse (`PIN-2` (ii), third arm)');
  assert.equal(leaf.value, 5, 'the leaf-parent arm is the one that ANSWERS: the value read there is the discriminator\'s third answer');
  const ownAddress = attempt(() => passing.read(['window', 'tabs']));
  assert.equal(ownAddress.threw, true, 'the pair\'s OWN address cannot be read under a leaf parent — the state it is asked to judge (`D-96` (2))');

  let passingAsked = 0;
  let handed = null;
  const passingArm = attempt(() => passing.addConstraint(
    { address: ['window', 'tabs'], id: 'leaf-passing' },
    (context) => { passingAsked += 1; handed = context; return true; },
  ));
  assert.equal(passingArm.threw, false, 'a PASSING body at a leaf parent lets the registration STAND (`D-96` (1)-(3))');
  assert.equal(passingAsked, 1, 'A LEAF PARENT APPLIES ITS PAIR: the add route ASKS it once (`D-96` (1)(3))');
  assert.equal(handed.value, undefined, 'the body meets `context.value === undefined` at a resolving leaf parent (`D-96` (2))');

  const refusing = make();
  refusing.write(['window'], 'mem', 5);
  let refusingAsked = 0;
  const refusal = attempt(() => refusing.addConstraint(
    { address: ['window', 'tabs'], id: 'leaf-refusing' },
    () => { refusingAsked += 1; return { message: 'a leaf is not the container this pair declares' }; },
  ));
  assert.equal(refusal.threw, true, 'a body that REFUSES a state it meets at a resolving parent REFUSES THE REGISTRATION (`PIN-11` (a-2); `D-96` (4))');
  const caught = plainRefusal(refusal.value, 'the leaf-parent registration refusal');
  assert.equal(caught.status, 'ConstraintRefusedAtRegistration',
    'the refusal is the registration verdict at rank `19` (`guide §8.1`\'s rank-19 row; `D-96` (4))');
  assert.equal(refusingAsked, 1, 'and the body that refused was the one ASKED at the add route (`D-96` (1)(3))');
  assert.deepEqual(caught.log, [], 'a registration refusal whose element carried NO repair carries `log: []` (that element appended no entry) (`guide §8.0a`; `PIN-11` (c))');
  assert.deepEqual(named(refusing), [], 'a REFUSED registration leaves the entry exactly as it stood and does not appear (`index.d.ts`, `constraints()`\'s coverage clause)');

  t.diagnostic(`SCREG-03 · THE LEAF-PARENT ARM: readLiteral(["window"]) = ${JSON.stringify(leaf.value)} (a leaf, NOT a skip); `
    + `read(["window","tabs"]) = ${ownAddress.value.status}; the passing body was asked ${passingAsked} time(s) and the registration STOOD; `
    + `the refusing body was asked ${refusingAsked} time(s) and the registration REFUSED ${caught.status} with log ${JSON.stringify(caught.log)}. `
    + `The threshold is ABSENCE ALONE (D-96 (1)-(3); PIN-2 (iii) as amended; guide §7.2 (2)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 04 — A SKIP CROSSES NOTHING AND WRITES NO LOG ENTRY
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_04_a_skip_crosses_nothing_and_writes_no_log_entry', (t) => {
  // **THE DECLARATION.** Nothing crosses to the caller for a skipped pair — no `status`, no `message`, no
  // `log` entry, no `constraint-check` entry, no `repair-run` entry — and no attempt is opened for it
  // (`PIN-3`). **The `log` a refusal crosses with is the COMMIT's one list**, so a refused construction whose
  // element carried a repair carries THAT element's two entries — `constraint-check` and `repair-run`
  // (`PIN-11` (c); `guide §8.0a`'s 2026-11-02 scoping at `:1401`; `sites §3.1` item 5) — **and the census
  // therefore splits on the element you supplied and on nothing else.**
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** an entry naming the skipped pair's `id` in the crossed list; a
  // third entry; a `log: []` on the repairing arm; an ask of the skipped body.
  let skippedAsked = 0;
  let refusingAsked = 0;
  const refusal = attempt(() => make({
    constraints: [
      { address: ['window', 'tabs'], id: 'skipped-element', constraint: () => { skippedAsked += 1; return { message: 'never runs' }; } },
      { address: ['a'], id: 'refusing-element', constraint: () => { refusingAsked += 1; return { message: 'the register parent has no value this pair admits', repair: () => ({ ok: false, message: 'declined' }) }; } },
    ],
  }));

  assert.equal(refusal.threw, true, 'the applied element refuses its own registration (`guide §7.2` (2); rank `19`)');
  const caught = plainRefusal(refusal.value, 'the mixed-list construction refusal');
  assert.equal(caught.status, 'ConstraintRefusedAtRegistration', 'the registration verdict is rank `19` (`guide §8.1`)');
  assert.equal(skippedAsked, 0, 'a skipped pair is NOT ASKED, so its body never runs (`PIN-3`; `D-90` (2))');
  assert.equal(refusingAsked, 1, 'the applied element IS asked once, and that is the refusal the caller meets (`PIN-2` (i)(ii))');

  assert.deepEqual(census(caught.log), ['constraint-check:refusing-element', 'repair-run:refusing-element'],
    'the crossed list carries THAT element\'s own two entries and NO entry for the skipped pair (`PIN-3`; `PIN-11` (c); `guide §8.0a` :1401)');
  for (const entry of caught.log) {
    assert.notEqual(entry.id, 'skipped-element', 'no log entry names the skipped pair: a skip writes no entry (`PIN-3`)');
    assert.equal(entry.state, null, 'a non-`outcome` entry carries `state: null` (`index.d.ts`, `LogEntry`)');
  }
  assert.equal(caught.log.some((entry) => entry.kind === 'outcome'), false, 'no terminal arm was reached for the skipped pair (`PIN-3`)');

  t.diagnostic(`SCREG-04 · A SKIP IN A LIST THAT REFUSED: the skipped pair was asked ${skippedAsked} time(s) and the refusing one `
    + `${refusingAsked}; the crossed log read ${JSON.stringify(census(caught.log))}. Nothing of the skip is in it, and the `
    + `census is the refusing element's own two entries (PIN-3; PIN-11 (c); guide §8.0a :1401).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 05 — THE PAIR STAYS NAMED BY `constraints()` ACROSS A DISABLE AND A RE-ARM
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_05_a_skipped_pair_stays_named_across_a_disable_and_a_re_arm', (t) => {
  // **THE DECLARATION.** A pair skipped at a re-arm is REGISTERED AND CARRIED ANYWAY and `constraints()`
  // names it (`PIN-4` (i); `D-90` (3)); a DISABLED pair still appears, and there is no `enabled` member on an
  // element (`guide §7.4`, exclusion 4); the re-arm is `constraintOn`'s enable arm, idempotent on success, and
  // the `constraint` position is REQUIRED and a no-op (`guide §7.4`; `PIN-4` (iv)'s fourth instant).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** a throw at the re-arm; an ask of the skipped body; a pair that
  // vanishes from the read; an `enabled` member appearing on an element.
  let asked = 0;
  const pair = { address: ['win', 'tabs'], id: 'carried-through-a-re-arm' };
  const store = make({
    constraints: [{ address: pair.address, id: pair.id, constraint: () => { asked += 1; return true; } }],
  });

  assert.equal(asked, 0, 'the pair is skipped at construction — its parent does not resolve (`PIN-2` (ii))');
  assert.deepEqual(named(store), [{ address: [['win', 'tabs']], id: 'carried-through-a-re-arm' }], 'the skipped pair is carried and named (`PIN-4` (i))');

  const off = attempt(() => store.constraintOff(pair, () => true));
  assert.equal(off.threw, false, '`constraintOff` is a toggle and not a removal: it answers `undefined` on success (`guide §7.4`)');
  assert.equal(off.value, undefined, 'the disable half answers `undefined` (`index.d.ts`, `constraintOff`)');
  assert.deepEqual(named(store), [{ address: [['win', 'tabs']], id: 'carried-through-a-re-arm' }], 'a DISABLED pair still appears in the read (`guide §7.4`, exclusion 4)');

  const on = attempt(() => store.constraintOn(pair, () => true));
  assert.equal(on.threw, false, 'the re-arm does not throw for a skipped pair: it reaches the same `K-1` and a skip is not a refusal (`PIN-4` (i); `D-90` (3))');
  assert.equal(asked, 0, 'the re-arm ASKS NOTHING: the pair\'s parent still does not resolve (`PIN-2` (ii); `PIN-4` (iv))');
  assert.deepEqual(named(store), [{ address: [['win', 'tabs']], id: 'carried-through-a-re-arm' }], 'and it is still named after the re-arm (`PIN-4` (i))');

  for (const element of store.constraints()) {
    assert.deepEqual(Object.keys(element).sort(), ['address', 'id'],
      'an element carries exactly `address` and `id` — there is NO `enabled` member (`guide §7.4`, exclusions 1-4)');
  }

  t.diagnostic(`SCREG-05 · THE RE-ARM: the skipped pair was asked ${asked} time(s) across the disable and the re-enable; `
    + `constraints() read ${JSON.stringify(named(store))} before, between and after. A toggle is not a removal and a `
    + `skip is not a refusal (PIN-4 (i); guide §7.4; D-90 (3)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 06 — THE BATCH AND THE ADD ROUTE BOTH ARM AT THEIR INSTANT
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_06_the_batch_and_the_add_route_both_arm_at_their_own_instant', (t) => {
  // **THE DECLARATION.** THE FIVE INSTANTS ARE CONSTRUCTION · A BOOT · `addConstraint` · A RE-ARM · THE PASS
  // (`PIN-4` (iv); `D-90` (4)), and the rule is read at each of them because it is GLOBAL and not batch-only.
  // **THE BATCH AND THE ADD ROUTE TAKE THE SAME ACT** and answer the same evaluation (`guide §7.2` (1)) —
  // with the one declared asymmetry: the batch's act is taken while the caller holds NO handle, so what a
  // function it arms has is the record it is handed (`guide §7.2` (1); `PIN-6` (i)).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** a batch element that is validated and DEFERRED rather than
  // armed (ask-count `0` at construction); an add route that arms nothing (ask-count `0` at the call); the two
  // routes handing the body different readings for the same input.
  let batchAsked = 0;
  const batchSeen = [];
  const batch = make({
    constraints: [
      { address: ['late'], id: 'batch-armed', constraint: (context) => { batchAsked += 1; batchSeen.push({ value: context.value, op: context.op }); return true; } },
    ],
  });
  assert.equal(batchAsked, 1, 'THE BATCH ARMS THE FUNCTION AT CONSTRUCTION — not merely validates it and defers (`D-27`; `guide §7.2`)');

  let addAsked = 0;
  const addSeen = [];
  const store = make();
  const identity = attempt(() => store.addConstraint(
    { address: ['late'], id: 'add-armed' },
    (context) => { addAsked += 1; addSeen.push({ value: context.value, op: context.op }); return true; },
  ));
  assert.equal(addAsked, 1, 'THE ADD ROUTE PERFORMS THE SAME ACT AT ITS OWN INSTANT (`guide §7.2` (1); `PIN-4` (iv))');
  assert.equal(identity.threw, false, 'the add route answers an identity for a well-formed pair (`index.d.ts`)');

  // **THE SAME EVALUATION, AT THE SAME INPUT.** Both pairs stand at a register parent with no value of their
  // own, so both bodies are handed the absence of their own key and the same two `null` spellings.
  assert.deepEqual(batchSeen, [{ value: undefined, op: null }], 'the batch\'s body judged the absence of its own key at construction (`PIN-2` (iv))');
  assert.deepEqual(addSeen, [{ value: undefined, op: null }], 'and the add route\'s body judged the same state at its own instant (`guide §7.2` (1)(3))');

  // **AND BOTH ARE CARRIED.** The read covers both population routes on one footing (`index.d.ts`, `constraints()`'s coverage clause).
  assert.deepEqual(named(batch), [{ address: [['late']], id: 'batch-armed' }], 'a batch-registered pair appears in the read');
  assert.deepEqual(named(store), [{ address: [['late']], id: 'add-armed' }], 'a pair the add route registered appears alike');

  t.diagnostic(`SCREG-06 · BOTH POPULATION ROUTES: the batch's body was asked ${batchAsked} time(s) at construction and the `
    + `add route's ${addAsked} time(s) at its own call, each handed ${JSON.stringify({ value: 'undefined', op: null })}. `
    + `The rule is read at every instant that would apply a pair (PIN-4 (iv); D-90 (4); guide §7.2 (1)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 07 — THE REPAIR'S ROUTE: ITS POSITIONS, ITS ANSWER, AND ITS ONE CLASS REFUSAL
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_07_the_repair_record_carries_write_its_answer_is_the_store_record_and_a_fourth_position_is_refused', (t) => {
  // **THE DECLARATION.** The registration instant's repair record gains ONE member (`PIN-6` (i)); its
  // spelling is `write` and its value is a FUNCTION (`PIN-6` (ii)); its POSITIONS are exactly the store's
  // `write`'s first three — `(address, tier, value)` — **THE COMMIT IS NOT A POSITION, AND A SUPPLIED FOURTH
  // IS REFUSED** (`PIN-6` (iii)), **of ANY class, a lawful `CommitRecord` INCLUDED**, because the commit
  // position's own test ACCEPTS any object carrying an own present `pending` — which is exactly the record a
  // repair holds. The refusal's FORM is the entry's class refusal: **a `TypeError` whose `status` member is
  // ABSENT and which carries NO `log` member**, thrown unwrapped (`PIN-6` (iii); `clause-context §2`), and
  // **NOTHING LANDS ON A REFUSED CALL**. The answer is the STORE'S OWN `WriteRecord` — `{op, watched,
  // triggered}` — and it has exactly two arms: that record, or a refusal crossing unconverted
  // (`PIN-6` (iv); `clause-context §2`; `guide §7.2` (4)).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** the lawful `CommitRecord` being ACCEPTED (which is what the
  // store's own commit-position test does and what `PIN-6` (iii) forbids here); a `status` or a `log` member on
  // the class refusal; a converted store status; a landed byte on a refused call; an answer carrying `ok`.
  const store = make();
  store.write(['d'], 'mem', 1);
  const receipt = store.delete(['d']);
  const lawfulCommit = receipt.commit;   // the four-member `CommitRecord` this delete minted (index.d.ts, DeleteRecord.commit)
  assert.equal(typeof lawfulCommit, 'object', 'the delete receipt carries the commit record this act minted (`D-55` item 3)');
  assert.ok(lawfulCommit !== null, 'a delete that removed a version names a record');
  assert.ok(Object.prototype.hasOwnProperty.call(lawfulCommit, 'pending'),
    'the lawful CommitRecord carries an own present `pending` — which is why re-using the commit position\'s test would ACCEPT it (`PIN-6` (iii))');

  const positions = [];
  let inner = null;
  let answered = null;
  let recordKeys = null;
  const drive = attempt(() => store.addConstraint({ address: ['q'], id: 'route-positions' }, (context) => {
    if (context.op !== null) return true;
    return {
      message: 'the pair judges the absence of its own key',
      repair: (repairRecord) => {
        recordKeys = Object.keys(repairRecord).sort();
        // the route's answer, at its three declared positions
        answered = repairRecord.write(['landed'], 'mem', 11);
        // and the FOURTH POSITION, five classes of it, each of which must be refused before any store act
        const tries = [
          ['the record\'s own pending', () => repairRecord.write(['no-1'], 'mem', 1, repairRecord.pending)],
          ['a lawful CommitRecord', () => repairRecord.write(['no-2'], 'mem', 1, lawfulCommit)],
          ['the repair record itself', () => repairRecord.write(['no-3'], 'mem', 1, repairRecord)],
          ['null', () => repairRecord.write(['no-4'], 'mem', 1, null)],
          ['an explicitly supplied undefined', () => repairRecord.write(['no-5'], 'mem', 1, undefined)],
        ];
        for (const [label, call] of tries) {
          try { call(); positions.push({ label, refused: false }); } catch (err) { inner = inner || {}; inner[label] = err; positions.push({ label, refused: true }); }
        }
        return { ok: true, op: answered.op };
      },
    };
  }));

  // **THE RECORD CARRIES THE ROUTE.** `clause-context §1.2`'s seventh member, at a registration instant only.
  assert.equal(drive.threw, false, 'the route\'s write landed the state its own body admits, so the registration STANDS (`PIN-7` (iii))');
  assert.ok(recordKeys.includes('write'), 'the registration instant\'s repair record carries `write` (`PIN-6` (i)(ii); `clause-context §1.2`)');
  assert.equal(typeof answered, 'object', 'the route ANSWERS the store\'s own record (`PIN-6` (iv))');
  assert.deepEqual(Object.keys(answered).sort(), ['op', 'triggered', 'watched'],
    'THE ANSWER IS THE STORE\'S OWN `WriteRecord` — `{op, watched, triggered}` — and carries no `ok` member (`PIN-6` (iv); `clause-context §2`)');
  assert.equal(typeof answered.op.opId, 'string', 'the op is the store\'s own journal record and names itself by a string (`index.d.ts`, `JournalOp`)');
  assert.equal(answered.op.after.present, true, 'and it describes the landing it made (`index.d.ts`, `JournalOp.after`)');

  // **EVERY FOURTH POSITION IS REFUSED, AND THE FORM IS THE CLASS REFUSAL'S.**
  assert.equal(positions.length, 5, 'five classes were supplied at the fourth position');
  for (const tried of positions) {
    assert.equal(tried.refused, true, `a SUPPLIED FOURTH POSITION is REFUSED whatever its class — ${tried.label} was accepted, and that is the reading PIN-6 (iii) forbids`);
    const thrown = inner[tried.label];
    assert.equal(thrown instanceof TypeError, true, `the refusal is a \`TypeError\` (${tried.label})`);
    assert.equal('status' in thrown, false, `the class refusal carries NO \`status\` member (${tried.label}) — PIN-6 (iii)`);
    assert.equal('log' in thrown, false, `the class refusal carries NO \`log\` member (${tried.label}) — PIN-6 (iii); clause-context §2`);
    assert.equal(typeof thrown.message, 'string', `its sentence is REQUIRED and names the arity and the reason (${tried.label})`);
    assert.ok(thrown.message.length > 0, `and it is not empty (${tried.label})`);
    // **AND NOTHING LANDS ON A REFUSED CALL.**
    const landed = attempt(() => store.read(['no-' + ['1', '2', '3', '4', '5'][positions.indexOf(tried)] ]));
    assert.equal(landed.threw, true, `nothing lands on a refused call (${tried.label}) — PIN-6 (iii), clause-context §2`);
  }
  assert.deepEqual(store.read(['landed']), 11, 'the three-position call DID land, and its value is the store\'s (`PIN-6` (iv))');

  t.diagnostic(`SCREG-07 · THE ROUTE'S POSITIONS: the repair record carried ${JSON.stringify(recordKeys)}; the route's answer read `
    + `${JSON.stringify(Object.keys(answered).sort())} with opId ${JSON.stringify(answered.op.opId)}; all ${positions.length} fourth-position `
    + `classes were refused as ${inner[positions[0].label].name} with status absent and no log member; read(["landed"]) = ${JSON.stringify(store.read(['landed']))}. `
    + `The commit is the registration's own and cannot be named (PIN-6 (ii)-(iv); clause-context §2).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 08 — THE ROUTE'S WRITE RUNS NO PASS OF ITS OWN AND DELIVERS NO LISTENER
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_08_the_route_write_runs_no_pass_of_its_own_and_delivers_no_listener', (t) => {
  // **THE DECLARATION.** The write the route performs **APPENDS NO `constraint-check` ENTRY, NO `outcome`
  // ENTRY AND NO TERMINAL ACT**, **delivers no listener**, and **is judged by the registration's own re-run
  // over the op it landed** (`PIN-6` (v)). So a pair standing at the address the route writes is NOT asked by
  // that write, and a listener bound at an address the route writes is NOT delivered.
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** a second ask of the watcher pair; a listener fired; a pass
  // entered for the route's write.
  const store = make();
  store.write(['b'], 'mem', 0);
  let watcherAsked = 0;
  store.addConstraint({ address: ['b'], id: 'watcher' }, () => { watcherAsked += 1; return true; });
  let fired = 0;
  store.listen('listener-at-c', [['c']]);
  store.register('listener-at-c', () => { fired += 1; });
  const watcherBefore = watcherAsked;

  const drive = attempt(() => store.addConstraint({ address: ['a2'], id: 'route-pair' }, (context) => {
    if (context.op !== null) return true;
    return {
      message: 'the pair judges the absence of its own key',
      repair: (repairRecord) => {
        const atB = repairRecord.write(['b'], 'mem', 5);
        repairRecord.write(['c'], 'mem', 9);
        return { ok: true, op: atB.op };
      },
    };
  }));

  assert.equal(drive.threw, false, 'the registration STANDS on the op its repair returned (`PIN-7` (iii))');
  assert.equal(watcherAsked, watcherBefore, 'the route\'s write at ["b"] ASKED NO PAIR standing there: it runs no pass of its own (`PIN-6` (v))');
  assert.equal(watcherBefore, 1, 'the watcher\'s ONE ask was its own registration\'s (`PIN-4` (iv))');
  assert.equal(fired, 0, 'and it DELIVERED NO LISTENER for the write it landed (`PIN-6` (v))');
  assert.deepEqual(store.read(['b']), 5, 'the route\'s write DID land at ["b"] (`PIN-6` (iv))');
  assert.deepEqual(store.read(['c']), 9, 'and at ["c"], where the listener stands unmoved (`D-53`: the commit is the registration\'s)');
  assert.deepEqual(named(store).sort((x, y) => (x.id < y.id ? -1 : 1)), [{ address: [['a2']], id: 'route-pair' }, { address: [['b']], id: 'watcher' }],
    'both pairs are carried after the route\'s write');

  t.diagnostic(`SCREG-08 · NO PASS OF ITS OWN: the watcher at ["b"] was asked ${watcherBefore} -> ${watcherAsked} across a route-write `
    + `at its own address; the listener at ["c"] fired ${fired} time(s) across a route-write at its own address; read(["b"]) = `
    + `${JSON.stringify(store.read(['b']))}, read(["c"]) = ${JSON.stringify(store.read(['c']))}. The pair is judged by the `
    + `registration's own re-run and by nothing else (PIN-6 (v); guide §7.2 (4)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 09 — THE OP THE ROUTE LANDED IS THE OP THE RE-RUN READS (THE JOIN, AT ITS DECLARED OBSERVABLE)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_09_the_op_the_route_landed_is_the_op_the_re_run_reads', (t) => {
  // **THE DECLARATION.** The write the route performs NAMES THE REGISTRATION'S OWN `CommitRecord`, and the
  // caller cannot name another — which is what `PIN-6` (iii)'s arity refusal secures (`PIN-7` (i)). On a
  // CREDITED op the synthetic attempt appends it, records the pair as applied, and **evaluates the pair ONCE
  // against that op in the ordinary re-run**, so a repair that lands the state its own body admits makes the
  // registration STAND (`PIN-7` (iii)). **AND THE RE-RUN'S CONTEXT IS WHERE THE PAIR MEETS THE REPAIR'S
  // STATE: its `value` is `produced.after.value`** (`D-95` (4); `guide §7.6`: *"the re-run hands your body the
  // value that op landed"*).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** a registration that refuses although the body admits the state
  // the op landed; a re-run that does not ask the pair again; a re-run handed some value other than the one
  // the op landed; a landed value that is not the store's.
  const asks = [];
  const store = make();
  const drive = attempt(() => store.addConstraint({ address: ['q'], id: 'joined' }, (context) => {
    asks.push({ opIsNull: context.op === null, value: context.value === undefined ? 'undefined' : JSON.stringify(context.value) });
    if (context.op === null) {
      return {
        message: 'the pair judges the absence of its own key, and its repair lands one',
        repair: (repairRecord) => {
          const landed = repairRecord.write(['q'], 'mem', 7);
          return { ok: true, op: landed.op };
        },
      };
    }
    return true;
  }));

  assert.equal(drive.threw, false, 'a repair that lands the state its own body admits makes the registration STAND (`PIN-7` (iii))');
  assert.equal(asks.length, 2, 'the pair is asked at the registration and ONCE MORE by the re-run over the op the route landed (`PIN-7` (iii); `D-94` (1))');
  assert.deepEqual(asks[0], { opIsNull: true, value: 'undefined' }, 'the registration ask judged the absence of its own key (`PIN-2` (iv); `clause-context §1.1`)');
  assert.deepEqual(asks[1], { opIsNull: false, value: '7' }, 'and the re-run was handed the value THAT op landed — the join, at its declared observable (`D-95` (4); `guide §7.6`)');
  assert.deepEqual(store.read(['q']), 7, 'the value the route landed is what the store holds (`PIN-6` (iv))');
  assert.deepEqual(named(store), [{ address: [['q']], id: 'joined' }], 'and the pair stands carried (`PIN-4` (i))');

  t.diagnostic(`SCREG-09 · THE JOIN: the pair was asked ${asks.length} time(s); the two contexts read `
    + `${JSON.stringify(asks)}; read(["q"]) = ${JSON.stringify(store.read(['q']))}. The op the route landed is the op the re-run `
    + `is driven by, and the re-run's value is that op's own landing (PIN-7 (i)(iii); D-95 (4)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 10 — THE CREDIT IS THE EXISTING RULE, AND AT A REGISTRATION IT IS THE MEMBERSHIP GROUND ALONE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_10_the_credit_is_the_existing_rule_pointed_at_and_the_re_run_is_what_decides', (t) => {
  // **THE DECLARATION.** A repair's route-write is credited **iff the repair RETURNS `{ok: true, op: <the
  // record's own `op`>}` and that op is not already held by the attempt** — the credit check runs with the
  // invoked-for op `null`, because a registration lands nothing before the repair, **so THE ORDINAL GROUND
  // IS NOT APPLIED AND THE MEMBERSHIP GROUND STANDS ALONE** (`PIN-7` (ii)). The repair's own return is a
  // closed two-arm set — `{ok: true, op}` and `{ok: false, message}` — and *"at the write's own evaluation a
  // return carrying any other identity fails `KC-4`"* (`guide §7.6`; `index.d.ts`, `Constraint`'s clause).
  //
  // **⟶ AND THE CONSEQUENCE AT A REGISTRATION, WHICH THIS CELL ASSERTS AND WHICH NEITHER THE GUIDE'S WORD
  // *"op"* NOR `verification.md §2.2`'s `G3-23` ROW SPELLS OUT — THE DIVERGENCE THIS CELL CARRIES AND
  // REPORTS RATHER THAN ENCODES: that row's forged-op arm reads *"returning `{ok: true, op: {opId:
  // 'not-the-op-it-landed'}}` REFUSES rank `19`"*, which attributes the verdict to the IDENTITY the return
  // names. `PIN-7` (ii)'s operative sentence attributes it to the credit rule and to the re-run: the credit
  // check runs with the invoked-for op `null`, so THE ORDINAL GROUND IS NOT APPLIED and THE MEMBERSHIP
  // GROUND STANDS ALONE — and the synthetic attempt holds NOTHING before the repair. **So a `{ok: true, op}`
  // return is CREDITED WHATEVER IDENTITY IT NAMES, and what decides the registration is the RE-RUN over that
  // identity (`D-94`).** Read that way, `G3-23`'s arm refuses because of the state its own body meets at the
  // re-run and not because of the op — and a body that ADMITS the state its re-run hands it leaves the
  // registration STANDING on a return naming an identity the route never landed. **THIS CELL ASSERTS THE PIN
  // AND DRIVES BOTH ARMS OF THAT ROW'S OWN INPUT, so the divergence is legible at one reading.**
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** a return naming an identity the repair did not land being
  // TURNED AWAY BEFORE THE RE-RUN (ask-count `1` instead of `2`, and a refusal where the body admitted the
  // state); a return that is not the repairable arm still being re-run; a route-write that does not stand
  // after a registration refusal (`PIN-7` (iv)).
  const readings = [];
  for (const arm of ['own', 'forged-admitted', 'forged-refused', 'declined', 'noop']) {
    let asked = 0;
    let caught = null;
    const store = make();
    const drive = attempt(() => store.addConstraint({ address: ['q'], id: `credit-${arm}` }, (context) => {
      asked += 1;
      if (context.op !== null) {
        return arm === 'forged-refused'
          ? { message: 'the re-run refuses the state it was handed' }
          : true;
      }
      return {
        message: 'the pair judges the absence of its own key',
        repair: (repairRecord) => {
          const landed = repairRecord.write(['q'], 'mem', 7);
          if (arm === 'own') return { ok: true, op: landed.op };
          if (arm === 'forged-admitted' || arm === 'forged-refused') {
            return { ok: true, op: { opId: 'an-op-identity-this-store-never-landed' } };
          }
          if (arm === 'declined') return { ok: false, message: 'declined, and the op I landed is mine to keep' };
          return { ok: true };
        },
      };
    }));
    if (drive.threw) caught = plainRefusal(drive.value, `the ${arm} registration refusal`);
    let landedValue = null;
    const readBack = attempt(() => store.read(['q']));
    landedValue = readBack.threw ? { status: plainRefusal(readBack.value, 'read(["q"])').status } : readBack.value;
    readings.push({ arm, asked, status: caught === null ? 'stood' : caught.status, landed: landedValue, named: named(store).length });
  }

  // **THE CREDITARY ARMS ARE RE-RUN TWICE AND THE REST ARE NOT RE-RUN AT ALL.** `own` returns the record's
  // own op and the body admits the state it landed (`PIN-7` (iii)); **both `forged` arms name an identity the
  // store never landed and the credit still admits them — the membership ground alone — so the re-run runs,
  // and it is the re-run's own verdict that stands or falls: the admitting body leaves the registration
  // STANDING, the refusing one refuses it at rank `19`.**
  const own = readings.find((r) => r.arm === 'own');
  const forgedAdmitted = readings.find((r) => r.arm === 'forged-admitted');
  const forgedRefused = readings.find((r) => r.arm === 'forged-refused');
  const declined = readings.find((r) => r.arm === 'declined');
  const noop = readings.find((r) => r.arm === 'noop');

  assert.deepEqual({ asked: own.asked, status: own.status }, { asked: 2, status: 'stood' },
    'the arm returning the op the route landed is CREDITED and the registration STANDS (`PIN-7` (ii)(iii))');
  assert.equal(forgedAdmitted.asked, 2,
    'a return naming an identity the repair never landed is STILL CREDITED — the ordinal ground is not applied and the membership ground stands alone (`PIN-7` (ii)) — so the re-run RUNS');
  assert.equal(forgedAdmitted.status, 'stood',
    'and with a body that ADMITS the state its re-run hands it, the registration STANDS: the identity\'s provenance is not the test at a registration, the re-run is (PIN-7 (ii); D-94 (1))');
  assert.equal(forgedRefused.asked, 2, 'the same identity, with a body that refuses at the re-run, is credited and re-run all the same');
  assert.equal(forgedRefused.status, 'ConstraintRefusedAtRegistration',
    'and there it is the RE-RUN that refuses the registration at rank `19` — the verdict `verification.md §2.2` `G3-23` attributes to the identity, traced here to its declared ground (`D-94`; `PIN-7` (ii))');
  assert.deepEqual({ asked: declined.asked, status: declined.status }, { asked: 1, status: 'ConstraintRefusedAtRegistration' },
    'the `{ok: false, message}` arm is NOT credited, so the pair is not re-run and the registration refuses (`PIN-7` (ii); `guide §7.6`\'s closed two-arm set)');
  assert.deepEqual({ asked: noop.asked, status: noop.status }, { asked: 1, status: 'ConstraintRefusedAtRegistration' },
    'and a `{ok: true}` return with NO `op` is an identity the credit check does not admit, so it too is not re-run (`guide §7.6`)');
  for (const reading of readings) {
    assert.deepEqual(reading.landed, 7, `a write the route landed before a refusal STANDS (${reading.arm}) — a registration composes no rollback (PIN-7 (iv))`);
    assert.equal(reading.named, reading.status === 'stood' ? 1 : 0, `a refused registration leaves the entry as it stood (${reading.arm}) (index.d.ts, constraints())`);
  }

  t.diagnostic(`SCREG-10 · THE CREDIT: ${JSON.stringify(readings.map((r) => ({ arm: r.arm, asked: r.asked, status: r.status, landed: r.landed })))}. `
    + `A credited repair is re-run and an uncredited one is not; the identity's provenance is not the test at a registration, `
    + `because the attempt holds nothing before the repair (PIN-7 (ii); D-94 (1)). The route's landing stands on every arm (PIN-7 (iv)). `
    + `FINDING, REPORTED AND NOT ENCODED: verification.md §2.2 G3-23 prints the forged-op arm as REFUSING rank 19 and so `
    + `attributes the verdict to the identity; PIN-7 (ii) credits it and leaves the verdict to the re-run, as both forged arms here read.`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 11 — THE LOAD INSTANT DOES NOT VALIDATE THE SUPPLIED LIST FOR RESOLVABILITY
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_11_the_load_instant_does_not_validate_the_list_for_resolvability', (t) => {
  // **THE DECLARATION.** A boot over an existing `filePath` is ONE OF THE INSTANTS THAT WOULD APPLY A PAIR
  // (`PIN-4` (iv); `D-90` (4)), and `D-90` (5) DELETES the boot's list-wide walk: **a well-formed pair whose
  // parent does not resolve neither refuses the list nor reaches the shape arm — it registers and is
  // skipped** (`PIN-5` (i)). **THE LOADED STATE IS NOT VALIDATED FOR RESOLVABILITY**, and no list is refused
  // for it (`guide §7.2` (5), `b-1`).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** any thrown refusal at that boot; an ask of the skipped body; a
  // pair missing from `constraints()`; a boot that did not load the file's own state.
  const dir = mkdtempSync(join(tmpdir(), 'screg-blind-'));
  const filePath = join(dir, 'registration-instant.json');
  const seed = make({ filePath });
  seed.write(['x'], 'file', { ok: 0 });

  let asked = 0;
  const booted = attempt(() => make({
    filePath,
    constraints: [
      { address: ['win', 'tabs'], id: 'boot-skip', constraint: () => { asked += 1; return { message: 'never runs at a boot whose parent is absent from the file' }; } },
    ],
  }));
  assert.equal(booted.threw, false, 'THE BOOT RETURNS AN INSTANCE: a pair whose parent does not resolve does not refuse the list (`PIN-5` (i); `D-90` (5))');
  assert.equal(asked, 0, 'and the boot ASKS it ZERO TIMES (`PIN-2` (ii); `PIN-4` (iv))');
  assert.deepEqual(named(booted.value), [{ address: [['win', 'tabs']], id: 'boot-skip' }], 'the pair is CARRIED and named (`PIN-4` (i))');
  assert.deepEqual(booted.value.read(['x']), { ok: 0 }, 'and the boot LOADED the file\'s own state (`guide §9.1`)');

  // **THE OTHER RESOLVING ARM AT THE SAME INSTANT.** A shape-valid pair whose parent is the register is not
  // absent from the store's reckoning at all: it is APPLIED, and its own key's absence is what it judges
  // (`PIN-2` (iv); `verification.md §2.1` `G3-04`).
  let askedOwnKey = 0;
  const bootedOwnKey = attempt(() => make({
    filePath,
    constraints: [{ address: ['must'], id: 'boot-own-key', constraint: () => { askedOwnKey += 1; return true; } }],
  }));
  assert.equal(bootedOwnKey.threw, false, 'the boot RETURNS AN INSTANCE for a well-formed pair at a register parent (`verification.md §2.1` `G3-04`)');
  assert.equal(askedOwnKey, 1, 'and the boot ASKS it once — the absence of its own key is the state it judges (`PIN-2` (iv))');

  t.diagnostic(`SCREG-11 · THE LOAD INSTANT: a boot over a file carrying ["x"] with the pair ["win","tabs"] (parent absent from the `
    + `file) STOOD, asked ${asked} time(s) and named ${JSON.stringify(named(booted.value))}; the same boot with the pair ["must"] `
    + `STOOD and asked ${askedOwnKey} time(s). The loaded state is not validated for resolvability (PIN-5 (i); D-90 (5); guide §7.2 (5)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 12 — THE MALFORMED LIST IS STILL THE SHAPE ARM, ON BOTH ROUTES, WITH ONE SENTENCE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_12_the_malformed_list_is_still_refused_at_both_instants_with_one_sentence', (t) => {
  // **THE DECLARATION.** `ConstraintListInvalid` keeps its rank `16`, its sentence and its own triggers, and
  // what remains of it at those two instants **is THE MALFORMED LIST AND NOTHING ELSE** — an element whose
  // `address` is not a segment array, an `id` that is not a string, the list's own outside forms, and the
  // package's three construction-time rejections (`PIN-5` (ii)(iii); `guide §7.2` (5), `b-2`) — **so A
  // WELL-FORMED PAIR IS NEVER ANSWERED BY THE SHAPE ARM** (`PIN-5` (ii), `b-3`; `D-90` (5)). One text serves
  // the two routes (`sites §3` row 10).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** the malformed element standing on either route; the
  // well-formed element of cell 11 drawing this status; two different sentences for one malformed input; a
  // `log` other than `[]`; a fifth member on the form.
  const dir = mkdtempSync(join(tmpdir(), 'screg-blind-malformed-'));
  const filePath = join(dir, 'malformed.json');
  make({ filePath }).write(['x'], 'file', { ok: 0 });

  const malformed = () => [{ address: 'must', id: 'not-an-address', constraint: () => true }];
  const atConstruction = attempt(() => make({ constraints: malformed() }));
  const atBoot = attempt(() => make({ filePath, constraints: malformed() }));

  assert.equal(atConstruction.threw, true, 'a malformed element refuses the list at CONSTRUCTION (`PIN-5` (ii); `guide §7.2` (5))');
  assert.equal(atBoot.threw, true, 'and at a boot over an existing `filePath` (`PIN-5` (ii))');
  const one = plainRefusal(atConstruction.value, 'the malformed list at construction');
  const other = plainRefusal(atBoot.value, 'the malformed list at a boot');
  for (const refusal of [one, other]) {
    assert.equal(refusal.status, 'ConstraintListInvalid', 'the shape arm answers `ConstraintListInvalid`, rank `16` (`guide §8.1`)');
    assert.deepEqual(refusal.log, [], 'and it carries `log: []`: no evaluation was entered (`PIN-5` (ii); `guide §8.0a`)');
    assert.equal(refusal.address, null, 'a constraint list\'s validation names no act at an address and says so with the declared `null` (`D-77`)');
  }
  assert.equal(one.message, other.message, 'ONE text serves the two routes at the same input (`sites §3` row 10; `PIN-5` (iii))');

  // **AND THE SHAPE ARM STOPS AT THE MALFORMED ELEMENT.** The list carries a well-formed pair beside it, and
  // that pair's body is never asked: the shape arm is taken ahead of the evaluation.
  let asked = 0;
  const withBoth = attempt(() => make({
    constraints: [
      { address: 'not-a-segment-array', id: 'still-malformed', constraint: () => true },
      { address: ['fine'], id: 'well-formed-beside-it', constraint: () => { asked += 1; return true; } },
    ],
  }));
  assert.equal(withBoth.threw, true, 'the malformed element refuses the list whatever stands beside it (`PIN-5` (ii))');
  assert.equal(plainRefusal(withBoth.value, 'the mixed malformed list').status, 'ConstraintListInvalid', 'and with the same status');
  assert.equal(asked, 0, 'a well-formed pair is never answered by the shape arm, and the shape arm is taken before any evaluation (`PIN-5` (ii); `sites §3` row 9)');

  t.diagnostic(`SCREG-12 · THE SHAPE ARM: construction ${one.status} / boot ${other.status}, messages byte-identical `
    + `(${one.message === other.message}), both with log ${JSON.stringify(one.log)} and address ${JSON.stringify(one.address)}, `
    + `sentence ${JSON.stringify(one.message)}; the well-formed element beside a malformed one was asked ${asked} time(s). `
    + `PIN-5 leaves the malformed list and nothing else.`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 13 — `value` IS READ ONCE: THE IN-FLIGHT RECORD IS A DATUM AND NOT A WINDOW
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_13_value_is_read_once_and_a_write_does_not_refresh_the_record', (t) => {
  // **THE DECLARATION.** The registration record's `value` is the value read at the instant the record was
  // BUILT — read once, before the invocation, and **NOT RE-READ AFTER ANY WRITE THE ROUTE LANDS** (`D-95` (1);
  // `Q2`'s default; `contract.md §8`). The reading that would make a record's member a moving value is
  // refused by name (`D-95` (2)(a)), and the consequence is declared at the point the unit meets it: **the
  // re-run's context is where the pair meets the repair's state**, and the in-flight record's `value` stays
  // the value the pair was asked against (`D-95` (4)).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** a held record whose `value` changes after the route's write; a
  // re-run whose context does not carry the landed value; a `write` member standing on the body's record.
  let held = null;
  let insideRepair = null;
  const seen = [];
  const store = make();
  const drive = attempt(() => store.addConstraint({ address: ['v'], id: 'read-once' }, (context) => {
    seen.push({ opIsNull: context.op === null, value: context.value === undefined ? 'undefined' : JSON.stringify(context.value) });
    if (context.op === null) {
      held = context;
      return {
        message: 'the pair judges the absence of its own key',
        repair: (repairRecord) => {
          const landed = repairRecord.write(['v'], 'mem', 7);
          insideRepair = {
            heldValue: held.value === undefined ? 'undefined' : JSON.stringify(held.value),
            heldKeys: Object.keys(held).sort(),
            hasWrite: typeof held.write,
          };
          return { ok: true, op: landed.op };
        },
      };
    }
    return true;
  }));

  assert.equal(drive.threw, false, 'the registration STANDS on the op the repair returned (`PIN-7` (iii))');
  assert.equal(seen.length, 2, 'the pair is asked at the registration and once more at the re-run (`PIN-7` (iii))');
  assert.deepEqual(insideRepair.heldValue, 'undefined',
    'THE RECORD\'S `value` IS NOT REFRESHED BY THE WRITE THE ROUTE LANDS — it is the value at the instant the record was built (`D-95` (1)(2))');
  assert.equal(insideRepair.hasWrite, 'undefined', 'and the body\'s record carries no route at any instant (`D-92`)');
  assert.deepEqual(insideRepair.heldKeys, ['address', 'attempt', 'op', 'tier', 'value'],
    'the body\'s record is the five-member evaluation context at a registration (`clause-context §1.1`)');
  assert.deepEqual(seen[0], { opIsNull: true, value: 'undefined' }, 'the registration ask was handed the pre-write absence (`D-95` (1))');
  assert.deepEqual(seen[1], { opIsNull: false, value: '7' }, 'and the RE-RUN is where the pair meets the repair\'s state: its value is the op\'s own landing (`D-95` (4))');
  assert.deepEqual(store.read(['v']), 7, 'the store holds the landed value (`PIN-6` (iv))');

  t.diagnostic(`SCREG-13 · READ ONCE: the held record read ${JSON.stringify(insideRepair)} inside the repair, after the route's `
    + `write landed 7; the two asks read ${JSON.stringify(seen)}; read(["v"]) = ${JSON.stringify(store.read(['v']))}. `
    + `A record is a datum and not a window; the re-run is where the repair's state is met (D-95 (1)(4); Q2).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 14 — THE RE-RUN IS AN INSTANT THE RULE REACHES, AND IT RUNS ON A CREDITED REPAIR
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_14_the_re_run_reads_the_rule_and_a_flattened_parent_asks_the_pair_once_more', (t) => {
  // **THE DECLARATION.** THE RE-RUN ALWAYS HAPPENS AFTER A CREDITED REPAIR — never omitted, deferred or
  // short-circuited — **and the pair-application rule is read INSIDE it** (`D-94` (1)(2); `Q3`'s `(i) YES`;
  // `PIN-4` (iv)'s last sentence). **THE ONE REACHABLE ARM IS A REPAIR THAT MAKES ITS OWN PAIR'S PARENT CEASE
  // TO BE A CONTAINER**: under `D-96` (4) a LEAF written over that parent does NOT skip the pair — the pair's
  // presence declares that parent a container, so the re-run ASKS it, the body meets a state it does not admit
  // at its own address, and **a refusing body REFUSES THE REGISTRATION at rank `19`**; **and the repair's
  // landing STANDS afterwards, because a registration composes no rollback** (`PIN-7` (iv)).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** a registration that STANDS because the pair was SKIPPED at the
  // re-run — the arm `D-96` (4) withdrew — which shows as one ask instead of two and no refusal; a repair's
  // landing missing after the refusal.
  const address = ['window', 'tabs'];
  let asked = 0;
  const asks = [];
  const store = make();
  store.write(['window'], 'mem', { tabs: { active: true } });

  const drive = attempt(() => store.addConstraint({ address, id: 're-run-reads-the-rule' }, (context) => {
    asked += 1;
    asks.push({ opIsNull: context.op === null, value: context.value === undefined ? 'undefined' : JSON.stringify(context.value) });
    if (context.op === null) {
      return {
        message: 'the pair judges a state it does not admit',
        repair: (repairRecord) => {
          const landed = repairRecord.write(['window'], 'mem', 'flattened');   // a LEAF over the pair's own parent
          return { ok: true, op: landed.op };
        },
      };
    }
    // the pair's own address, read by the body itself (`D-50`'s rule of use: read what you judge)
    const own = attempt(() => store.read(address));
    asks[asks.length - 1].ownAddress = own.threw ? plainRefusal(own.value, 'read(["window","tabs"])').status : 'read';
    return own.threw ? { message: 'my own address cannot be read under the parent my repair landed' } : true;
  }));

  assert.equal(drive.threw, true, 'the re-run ASKS the pair under the flattened parent and the refusing body REFUSES the registration (`D-96` (4))');
  const caught = plainRefusal(drive.value, 'the re-run\'s registration refusal');
  assert.equal(caught.status, 'ConstraintRefusedAtRegistration', 'the refusal is rank `19`, the registration verdict (`guide §8.1`; `D-96` (4))');
  assert.equal(asked, 2, 'THE RE-RUN RAN AND ASKED THE PAIR: a credited repair is re-run, and the rule is read INSIDE it (`D-94` (1)(2); `PIN-7` (iii))');
  assert.equal(asks[1].opIsNull, false, 'the re-run\'s context is the evalution over the op the repair returned (`PIN-7` (iii); `D-95` (4))');
  assert.equal(asks[1].ownAddress, 'LeafHasNoDownstream', 'the parent the repair landed is a LEAF, so the pair\'s own address cannot be read (`PIN-2` (ii), third arm)');
  assert.deepEqual(store.read(['window']), 'flattened', 'A WRITE THE ROUTE LANDED BEFORE A REFUSAL STANDS — a registration composes no rollback (`PIN-7` (iv))');
  assert.deepEqual(named(store), [], 'and the refused registration leaves the entry exactly as it stood (`index.d.ts`, `constraints()`)');

  t.diagnostic(`SCREG-14 · THE RE-RUN: the pair was asked ${asked} time(s) (${JSON.stringify(asks)}), the parent the repair landed reads `
    + `as a leaf, the registration REFUSED ${caught.status}, and read(["window"]) = ${JSON.stringify(store.read(['window']))} afterwards. `
    + `The rule is read inside the re-run and the refusal does not undo the landing (D-94 (1)-(2); D-96 (4); PIN-7 (iv)). `
    + `NOTE, REPORTED AND NOT ASSERTED: the "0 pairs asked" arm D-94 (1) names is unreachable through this route, because the `
    + `record carries no \`delete\` (PIN-6 (vi)) and a write cannot leave a node unresolvable — so the arm that empties the set is the `
    + `delete-parent arm, which no repair at a registration instant can perform.`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 15 — `PIN-9`: A SKIPPED PAIR CANNOT BE RESCUED BY ITS OWN REPAIR, AND A PAIR AT ITS OWN KEY CAN
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_15_a_skipped_pair_is_never_asked_so_its_repair_cannot_create_its_parent', (t) => {
  // **THE DECLARATION.** A pair whose parent is absent is never asked, **so nothing runs to create the
  // parent** — a repair it carries cannot reach the arm (`PIN-9`; `D-91` (iv)). **AND THE COMPLEMENT IS
  // DECLARED: a pair whose OWN KEY is absent is APPLIED and may repair itself**, and that is the only arm a
  // repair can rescue (`PIN-9`; `guide §7.2` (3)).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** the repair of a skipped pair running; the pair being asked; a
  // node created where the skipped pair's parent does not stand; the own-key arm failing to stand.
  let skippedAsked = 0;
  let skippedRepairs = 0;
  const skipped = make({
    constraints: [
      {
        address: ['window', 'tabs'],
        id: 'cannot-be-rescued',
        constraint: () => {
          skippedAsked += 1;
          return { message: 'refused', repair: () => { skippedRepairs += 1; return { ok: false, message: 'declined' }; } };
        },
      },
    ],
  });
  assert.equal(skippedAsked, 0, 'a pair under an absent parent is NEVER ASKED (`PIN-2` (ii); `PIN-9`)');
  assert.equal(skippedRepairs, 0, 'so NOTHING RUNS to create that parent: its repair is unreachable (`PIN-9`; `D-91` (iv))');
  const noWindow = attempt(() => skipped.read(['window']));
  assert.equal(plainRefusal(noWindow.value, 'read(["window"])').status, 'AddressNotFound', 'and the parent does not stand after the construction (`PIN-9`)');
  assert.deepEqual(named(skipped), [{ address: [['window', 'tabs']], id: 'cannot-be-rescued' }], 'the pair is carried regardless (`PIN-4` (i))');

  let ownAsked = 0;
  const own = make();
  const rescued = attempt(() => own.addConstraint({ address: ['window'], id: 'may-repair-itself' }, (context) => {
    ownAsked += 1;
    if (context.op !== null) return true;
    return {
      message: 'the absence of my own key is the state I judge',
      repair: (repairRecord) => {
        const landed = repairRecord.write(['window'], 'mem', { tabs: {} });
        return { ok: true, op: landed.op };
      },
    };
  }));
  assert.equal(rescued.threw, false, 'a pair whose OWN key is absent IS APPLIED and may repair itself (`PIN-9`; `guide §7.2` (3))');
  assert.equal(ownAsked, 2, 'it is asked at the registration and once more at the re-run over the op its repair landed (`PIN-7` (iii))');
  assert.deepEqual(own.read(['window']), { tabs: {} }, 'and the node it named now stands (`PIN-6` (iv))');
  assert.deepEqual(named(own), [{ address: [['window']], id: 'may-repair-itself' }], 'with the pair carried (`PIN-4` (i))');

  t.diagnostic(`SCREG-15 · PIN-9: the pair at ["window","tabs"] was asked ${skippedAsked} time(s) and its repair ran ${skippedRepairs} time(s), `
    + `with read(["window"]) = ${noWindow.value.status}; the pair at ["window"] was asked ${ownAsked} time(s) and read(["window"]) = `
    + `${JSON.stringify(own.read(['window']))} afterwards. To have a repair create a node, register the pair AT that node's address `
    + `(PIN-9; D-91 (iv); guide §7.2 (3)).`);
});

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════
// 16 — THE SKIP INSIDE A PASS: THE ACT'S OWN SUBTREE REACHES THE PAIR AND IS SKIPPED THERE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════

test('screg_blind_16_a_delete_of_the_parent_reaches_its_pair_and_is_skipped_there', (t) => {
  // **THE DECLARATION.** The PASS over a `write`, a `delete` or a `rollback` is the fifth instant
  // (`PIN-4` (iv); `D-90` (4)). **A `delete` of `['window']` reaches the pair's home entry — the delete's own
  // subtree contains it — so the pair IS in the act's `triggered` set and, under the rule, is SKIPPED there
  // rather than asked; the delete therefore SUCCEEDS on a state the pair would have refused** (`PIN-4` (iii);
  // `D-96` (5): the arm a skip survives on is absence alone).
  //
  // **THE READING THAT WOULD MAKE THIS FAIL:** the `delete` refusing; an ask-count that rises across it; a
  // register that still holds `window`.
  let asked = 0;
  const store = make();
  const pair = { address: ['window', 'tabs'], id: 'skipped-in-the-pass' };
  const registered = attempt(() => store.addConstraint(pair, (context) => {
    asked += 1;
    return context.value === undefined ? { message: 'a state this pair does not admit' } : true;
  }));
  assert.equal(registered.threw, false, 'the pair is registered while its parent is absent (`PIN-4` (i))');
  assert.equal(asked, 0, 'and it is skipped at the add route (`PIN-2` (ii))');

  // **THE ACT THAT MAKES THE PARENT STAND AND TOUCHES THE PAIR'S ADDRESS.** The written value contains the
  // pair's key, so the pair is IN the act's `triggered` set and is ASKED with the op's own landed value
  // (`PIN-4` (ii); `D-56`/`D-66` unchanged).
  const first = attempt(() => store.write(['window'], 'mem', { tabs: { active: true } }));
  assert.equal(first.threw, false, 'a write whose value contains the pair\'s key asks the pair and answers its admission (`PIN-4` (ii))');
  assert.equal(asked, 1, 'the pair was ASKED once by that write — its parent now stands and its address was touched (`PIN-4` (ii); `D-66`)');
  assert.equal(first.value.triggered.length, 1, 'the act reports the pair it triggered (`index.d.ts`, `WriteRecord.triggered`)');

  // **AND THE `delete`, WHOSE OWN SUBTREE REACHES THE PAIR, IS SKIPPED THERE.** A body that refuses absence is
  // the falsifier: if the pair were asked at the delete, its context value would be the absence the delete
  // lands and the delete would refuse.
  const removed = attempt(() => store.delete(['window']));
  assert.equal(removed.threw, false, 'the delete LANDS: the pair it reached is SKIPPED, not asked (`PIN-4` (iii); `D-90` (4))');
  assert.equal(asked, 1, 'and the ask-count is UNMOVED across the delete — a skip is not a judgement (`PIN-3`)');
  assert.deepEqual(store.read([]), {}, 'the register no longer holds `window` (`PIN-4` (iii))');
  assert.deepEqual(removed.value.address, ['window'], 'the delete answers what it removed (`index.d.ts`, `DeleteRecord.address`)');
  assert.deepEqual(named(store), [{ address: [['window', 'tabs']], id: 'skipped-in-the-pass' }], 'the pair is CARRIED still, for the first later instant its parent stands (`PIN-4` (i)(ii); `D-90` (3))');

  t.diagnostic(`SCREG-16 · THE SKIP INSIDE A PASS: the pair at ["window","tabs"] was asked ${asked} time(s) in total — 0 at the add `
    + `route, 1 at the write that touched its address, 0 more at the delete of its parent; the delete answered address `
    + `${JSON.stringify(removed.value.address)} and the register read ${JSON.stringify(store.read([]))}. A skip is not a refusal, `
    + `and the delete succeeds on a state the pair would have refused (PIN-4 (iii); D-90 (4); D-96 (5)).`);
});
