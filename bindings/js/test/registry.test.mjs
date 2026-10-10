// `surface.md §2.3`–`§2.4`, `§2.7`, `§2.10` — THE HANDLE, THE PACKAGE'S OWN REGISTRY, THE DELIVERY, AND THE
// TWO REGISTRATION VERBS, driven at the package's own boundary.
//
// **THE CONTRACT FINDING THIS FILE'S AUTHORING EXPOSED IS CLOSED, AND THE CELLS BELOW KEEP THE READING THE
// REMAND MOVED.** `contract.md §2.4` declares a PER-INSTANCE REGISTRY that holds **the caller's FUNCTION**
// for a handle and invokes it (`DD-15`, `DD-22`). **THE REGISTRATION SITE'S REFUSAL'S FORM MOVED AGAIN ON
// 2026-10-11 AND THIS FILE'S ONE CELL THAT ASSERTED IT WAS RE-DERIVED:** as filed, `parameter-semantics.md
// §2.12` (`PAR-JS-12`) and `surface.md §2.4` item 5 (d) declared a JS `TypeError` carrying no `status` and no
// `message`; **`A76`'s bounded declaration pass reconciled both to `surface.md §2.5`'s SINGLE form with the
// store's closed-set `AddressMalformed`** (`surface.md §2.5` item 5 (g); `parameter-semantics.md §2.12`'s
// second dated exception clause), so **a `TypeError` escaping ANY site of this package is a FINDING**. **As
// this red set was authored, NO clause of `docs/specs/storeroom-js/**` declared the SPELLING of that
// registration site** — `§2.1`'s *"no clause of this directory exposes any member of it"* and `package.md
// §1.3` item 3's *"NOTHING ELSE"* appeared to close it off — **so the function halves of the registry's rules
// were reported `un-run`, and `un-run` IS A FAILURE** (`acceptance.md §4.4`). **THE BOUNDED CORRECTION PASS
// OF 2026-10-11 DECLARED THE SITE** (`§2.4` item 5 / `surface.md §2.4` item 5: `register(handle, listener)
// -> undefined`, the ONE member of the object `storeCreate` returned — a member of the PACKAGE's own wrapper
// and not of the store's instance), **and the function halves are now DRIVEN at `register.test.mjs`'s
// `S-REG` and `S-FIRE-WINDOW` lines.** **NOTHING IS DUPLICATED HERE:** the cells below are the ones the
// DECLARED verbs reach — the handle's two spellings, `unlisten`'s no-op set, the prefix test and the
// withdrawal — and the cell at rule 4 that names the function half points at `register.test.mjs` rather than
// restating it.
//
// **STATES ENUMERATED BEFORE THE CELLS WERE AUTHORED:** a minted handle · a caller-spelled token at the
// construction · two different handles at one address · the SAME token twice at one address · a bare string
// at `unlisten` · a foreign instance's handle · a blank token · a non-opaque value · an absent handle · a
// prefix-qualified registration set · a registration outside the write's scope · a `delete`'s triggered set.
// **AND THE TWO STATES THE 2026-10-11 `V-1` RE-DERIVATION ADDED TO THIS LIST:** **a REPEAT `listen` at an
// address that IS ALREADY REGISTERED** (whose declared answer is the entry's OWN handle — `write-and-read.md
// §6.5` item 12 (c)) and **two DIFFERENT addresses registered on ONE instance** (whose declared answer is two
// DIFFERENT handles, each binding its own address — `§2.3` item 1 with `§6.5` item 10 (b)).

import test from 'node:test';
import assert from 'node:assert/strict';

import { storeCreate, read, write, delete as remove, listen, unlisten } from '@provident-storeroom/js';

function mem(listeners = []) {
  return storeCreate({ journalLength: 8, listeners });
}

// ---------------------------------------------------------------------------------------------
// `§2.3` the handle
// ---------------------------------------------------------------------------------------------

test('handle_the_construction_takes_a_plain_string_and_the_return_value_is_opaque', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const record = write(inst, ['a'], 'mem', 1);
  const returned = record.triggered[0];
  assert.equal(record.triggered.length, 1);
  assert.notEqual(typeof returned, 'string', 'the returned handle is NOT the token string (DD-14)');
});

test('handle_the_returned_token_is_readable_by_no_js_code', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const returned = write(inst, ['a'], 'mem', 1).triggered[0];
  const spellings = [
    String(returned),
    JSON.stringify(returned),
    Object.keys(returned).join(','),
    Object.getOwnPropertyNames(returned).join(','),
    Object.getOwnPropertySymbols(returned).join(','),
    typeof returned.toString === 'function' ? returned.toString() : '',
  ];
  for (const spelling of spellings) {
    assert.ok(
      !String(spelling).includes('l1'),
      `the token is PRIVATE and readable by no JS code; got \`${spelling}\``,
    );
  }
});

// **THE CELL BELOW WAS RE-DERIVED BY THE 2026-10-11 `V-1` PASS, BECAUSE ITS FIRST FORM ASSERTED AN
// EXPECTATION THE DECLARED BEHAVIOUR DOES NOT SUPPORT.** As first authored it called `listen(i, ['a'])` twice
// and required **TWO DIFFERENT handles**. **THE DECLARED ANSWER IS THE OTHER ONE, AND THE STORE'S CONTRACT IS
// ITS AUTHORITY:** **`docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c)** — *"a `listen(address)`
// whose address IS already registered returns the EXISTING entry's handle rather than minting a second one"* —
// **read with `§6.5` item 2's ADDRESS-LEVEL IDEMPOTENCE** (*"registering the same address twice is idempotent
// at the address level: the returned list carries DISTINCT addresses"*) **and with `§6.5` item 8 (a)'s ONE
// home** (*"the store instance owns exactly ONE home map … registrations keyed by the listener's `address`"*,
// `A45`/`A48`). **So a repeat `listen` at a registered address MINTS NOTHING and returns the entry's own
// handle, and `A69`'s per-process uniqueness is NOT weakened by that clause:** it quantifies over **the tokens
// the store MINTS** (`§2.3` item 1 — *"no OTHER token the store mints … is equal to it"*, with the store's
// `parameter-semantics.md §2.13`/`PAR-13` uniqueness domain), and the repeat mints no token at all.
//
// **CONTRACT FINDING, REPORTED AND NOT PAPERED OVER — NO CLAUSE OF `docs/specs/storeroom-js/**` DECLARES THE
// REPEAT-`listen` ANSWER, AS OF THIS RUN.** `surface.md §2.10`/`contract.md §2.10` print *"mints a token,
// populates the store's home"* (the NOT-registered case); `§2.3` item 1 declares the MINTED token's
// per-process uniqueness; and `§2.4` rule 4's *"a later re-`listen` at the same address mints a DIFFERENT
// handle"* is the AFTER-`unlisten` case, where the home entry is already gone. **The declared authority for
// the registered-address state is therefore the store's `§6.5` item 12 (c), cited here rather than a
// unit-side rule invented beside it** — and a unit-side clause stating it outright is a bounded amendment of
// `docs/specs/storeroom-js/`, reported to the supervisor.
test('handle_a_repeat_listen_at_a_registered_address_returns_the_entries_own_handle', () => {
  const inst = mem();
  const minted = listen(inst, ['a']);
  const repeat = listen(inst, ['a']);
  // **NO SECOND ENTRY EXISTS:** `A45`'s one home holds ONE entry per address, so ONE write at that address
  // triggers EXACTLY ONE handle — never two, and never none.
  const first = write(inst, ['a'], 'mem', 1);
  assert.equal(first.triggered.length, 1, '`§6.5` item 8 (a): ONE home entry per address, so ONE handle');
  // **AND THE REPEAT HANDS BACK THE VERY VALUE THE FIRST CALL RETURNED — `===`, WHICH IS WHAT `§2.3` ITEM 2
  // MAKES ASSERTABLE AND `§5.5`'s STILL-REGISTERED ARM REQUIRES** (*"MINTS NOTHING and RETURNS THE EXISTING
  // ENTRY'S HANDLE — the SAME opaque value — so no new registry entry arises"*): the package's registry is
  // keyed by handle identity (`§2.4` item 6 (b): *"the matching is the registry's own lookup BY THAT IDENTITY
  // AND BY NOTHING ELSE"*), so a second, equal-but-distinct opaque value keyed by the same token would be
  // exactly the NEW registry entry this arm declares does NOT arise — and it would break here.
  assert.equal(
    repeat,
    minted,
    '`§2.3` item 6 / `§5.5`\'s STILL-REGISTERED arm: the two calls answer ONE opaque value, never two',
  );
  // ...AND THE SAME VALUE CARRIES THE TRIGGER, ONCE (`§6.5` item 10 (d) (iii)'s prefix test at the
  // registration's own address).
  assert.equal(first.triggered[0], minted, 'the ONE home entry\'s handle IS this value');
  // **AND THE REPEAT NAMES THAT ENTRY ITSELF:** `unlisten` removes exactly the entry whose handle it is
  // handed (`§6.5` item 12's *"which is why `unlisten` over the returned handle removes exactly one entry"*),
  // so withdrawing the REPEAT's value withdraws the address's registration — which IS NOT what a second,
  // separately-minted entry would leave behind.
  assert.equal(unlisten(inst, repeat), undefined);
  const after = write(inst, ['a'], 'mem', 2);
  assert.deepEqual(after.triggered, [], 'the repeat\'s value names the entry the first `listen` minted');
  // ...and the FIRST call's value names that same, now-withdrawn entry: the two calls name ONE entry, and the
  // withdrawal over an already-removed entry is the ordinary no-op success (`§2.3` item 4).
  assert.equal(unlisten(inst, minted), undefined);
  assert.ok(minted !== undefined && repeat !== undefined, 'both calls returned handles, never a unit');
});

// **THE PART THE CELL WAS REALLY REACHING FOR, DRIVEN BESIDE IT — BECAUSE THE CONTRACT DECLARES IT AND NO
// CELL REACHED IT** (`§2.3` item 1's per-process mint; `§6.5` item 10 (b)'s binding BY ADDRESS; `§2.3` item 4
// and `§2.4` item 5 (d)'s two declared answers for a value ANOTHER instance minted; the unit's `§2.3` item 2
// wrapper identity and `PAR-JS-8`'s *"a value a FOREIGN instance minted"*).
test('handle_a_mint_is_unique_per_process_and_two_addresses_on_one_instance_differ', () => {
  const owner = mem();
  const other = mem();
  const atA = listen(owner, ['a']);
  const atB = listen(owner, ['b']);
  assert.ok(atA !== atB, '`§2.3` item 1: two mints are two tokens, and no mint repeats another');
  // BINDING IS BY ADDRESS AND BY NOTHING ELSE (`§6.5` item 10 (b)): each registration fires for its own
  // address alone — and a write at an address no registration is a prefix of fires nothing (`§6.5` item 3).
  assert.equal(write(owner, ['a'], 'mem', 1).triggered.length, 1);
  assert.equal(write(owner, ['b'], 'mem', 1).triggered.length, 1);
  assert.deepEqual(write(owner, ['c'], 'mem', 1).triggered, []);
  // THE SAME ADDRESS ON A SECOND INSTANCE IS A SECOND MINT, and the two are DISTINGUISHABLE — which is what
  // `A69`'s per-process domain means across instances (`§2.3` item 1: *"in ANY other instance of THIS
  // process"*): the foreign value names NO entry of this one.
  const foreign = listen(other, ['a']);
  assert.ok(foreign !== atA, 'the same address on another instance is another mint');
  // `unlisten` over the foreign value is the declared NO-OP SUCCESS and removes NOTHING here (`§2.3` item 4;
  // `PAR-JS-8`'s *"a value a FOREIGN instance minted"*), so the owner's own registration still fires.
  assert.equal(unlisten(owner, foreign), undefined);
  assert.equal(write(owner, ['a'], 'mem', 2).triggered.length, 1, 'NO OTHER REGISTRATION IS REMOVED');
  // **⟶ AND AT THE REGISTRATION SITE THE SAME CLASS ANSWERS THE OPERATIVE DECLARED FORM — RE-DERIVED
  // 2026-10-11, BECAUSE THE AS-FILED CELL ASSERTED A FORM THE CLAUSE HAS SINCE RE-SPELLED.**
  //
  // **THE CLAUSE THIS CELL RESTS ON, CITED HERE AS THE RE-DERIVATION'S AUTHORITY: `docs/specs/storeroom-js/
  // surface.md §2.5` item 5 (g)** — *"the registration site's refusal IS a rejection under `A76` and travels
  // in THIS section's single form, with its `status` drawn from the store's closed set — the store's own
  // `AddressMalformed`, whose declared trigger already covers 'a present argument outside its domain' and 'an
  // absent required argument' — and its `message` generated as clause (d) declares. … THE `TypeError` IS NOT
  // WITHDRAWN AS A WORD: it is the SHAPE of the failure at the registration site … and a later bounded
  // amendment of this directory re-spells those two cells to this section's form"* — **read with
  // `parameter-semantics.md §2.12`'s SECOND dated exception clause**, the other home of the same
  // reconciliation (*"THE REGISTRATION SITE'S REFUSAL IS DELIVERED IN … `surface.md §2.5`'s SINGLE FORM —
  // `{status, message}` — with its `status` drawn from the store's CLOSED `15`-member set … the store's own
  // `AddressMalformed`"*).
  //
  // **WHAT THE CELL ASSERTED BEFORE AND WHAT IT ASSERTS NOW.** As filed it required
  // `err instanceof TypeError && !('status' in err) && !hasOwnProperty(err, 'message')` — the WITHDRAWN
  // form (`§2.4` item 5 (d) as filed). **It now asserts the DECLARED form and its DECLARED CONTENT, and it
  // is STRONGER rather than weaker:** the record's member set is EXACTLY `{status, message}`; its status is
  // the closed-set member `AddressMalformed`; **the message carries the FAILING TARGET** — the foreign
  // handle, rendered as the store's own generator renders a non-segment value, *"PRINTED AS ITS OWN VALUE,
  // SINGLE-QUOTED"* (`§2.5` item 5 (a)) — **the CLASS that failed** (item 5 (b), whose class half is
  // MANDATORY: *"the reason is the CLASS the value HAS … never as a class the value could be converted to"*)
  // **and the POSITION** (item 5 (b): *"the ARGUMENT POSITION for a verb's arguments"* — here `register`'s
  // FIRST argument); and **nothing reached the store**, which the write below the assertion measures.
  assert.throws(
    () => owner.register(foreign, () => {}),
    (err) =>
      !(err instanceof TypeError) &&
      Object.getPrototypeOf(err) === Object.prototype &&
      Object.keys(err).sort().join(',') === 'message,status' &&
      err.status === 'AddressMalformed' &&
      err.message.includes('[object Object]') && // the failing TARGET (item 5 (a))
      err.message.includes('first argument') && // ...the POSITION (item 5 (b))
      err.message.includes('plain object') && // ...and the CLASS that failed (item 5 (b), mandatory)
      err.message.includes('THIS INSTANCE'), // ...and WHY: the site admits this instance's opaque spelling alone
  );
  assert.equal(write(owner, ['a'], 'mem', 3).triggered.length, 1, 'nothing reached the store on that case');
});

test('handle_a_caller_spelled_token_is_adopted_verbatim_and_is_lawful', () => {
  const inst = mem([{ address: ['a'], handle: 'listener-1' }]);
  const record = write(inst, ['a'], 'mem', 1);
  assert.equal(record.triggered.length, 1, 'A69: the construction ADOPTS the caller\'s tokens verbatim');
});

test('handle_a_blank_token_is_outside_the_domain_at_the_construction', () => {
  assert.throws(
    () => mem([{ address: ['a'], handle: '' }]),
    (err) => err.status === 'AddressMalformed',
  );
});

// ---------------------------------------------------------------------------------------------
// `§2.3` item 4 / `§5.5`'s `S-OPAQUE` — `unlisten` over every outside value is a NO-OP SUCCESS
// ---------------------------------------------------------------------------------------------

test('registry_rule_4_unlisten_over_a_bare_string_is_an_unknown_handle_and_a_no_op_success', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  listen(inst, ['b']);
  assert.equal(unlisten(inst, 'l1'), undefined, 'a bare string is an UNKNOWN handle');
  assert.equal(unlisten(inst, 'listener-1'), undefined);
  assert.equal(unlisten(inst, ''), undefined, 'a blank token is the same no-op success');
  // NO OTHER REGISTRATION IS REMOVED: the `b` mint still fires.
  const record = write(inst, ['b'], 'mem', 2);
  assert.equal(record.triggered.length, 1);
});

test('registry_rule_4_unlisten_over_a_foreign_handle_fabricated_or_non_opaque_is_a_no_op_success', () => {
  const owner = mem();
  const foreign = mem();
  const kept = listen(owner, ['a']);
  const foreignHandle = listen(foreign, ['a']);
  assert.equal(unlisten(owner, foreignHandle), undefined, 'a foreign instance\'s value is a no-op success');
  assert.equal(unlisten(owner, 42), undefined, 'a non-opaque value is a no-op success');
  assert.equal(unlisten(owner, {}), undefined);
  assert.equal(unlisten(owner, undefined), undefined, 'an absent handle is a no-op success');
  const record = write(owner, ['a'], 'mem', 1);
  assert.equal(record.triggered.length, 1, 'NO OTHER REGISTRATION IS REMOVED');
  assert.ok(kept !== undefined && kept !== foreignHandle);
});

test('registry_the_withdrawal_removes_the_store_side_home_entry_and_never_the_function', () => {
  const inst = mem();
  const handle = listen(inst, ['a']);
  unlisten(inst, handle);
  const record = write(inst, ['a'], 'mem', 1);
  assert.deepEqual(
    record.triggered,
    [],
    '§2.4 rule 4: `unlisten` withdraws the store-side home entry, so the handle does not appear again',
  );
  // **⟶ RE-DERIVED 2026-10-11 (`role_test_writer`), BECAUSE THE AS-FILED LINE ASSERTED THE REFUTED SENTENCE
  // IN THE ONE CASE THE OPERATIVE RULE EXCLUDES.** As filed this cell read, verbatim —
  // `assert.ok(again !== handle, 'a re-\`listen\` at the same address mints a DIFFERENT handle');` — under a
  // comment saying *"`DD-15`: the package's own registry entry stands — a later re-`listen` mints a DIFFERENT
  // handle whose registration is a NEW registry entry."* **THE DRIVE ITSELF IS RIGHT — this `unlisten` DID
  // remove the address's home entry, so the re-`listen` here DOES mint a fresh handle. THE COMMENT'S SUBJECT
  // IS WHAT MOVED: it stated the mint as the rule about "the same address", where the operative rule makes it
  // the WITHDRAWN case's ALONE.**
  //
  // **THE OPERATIVE RULE, AT ITS OWN BYTES, `docs/specs/storeroom-js/contract.md §2.3` item 6** — *"`listen(address)`
  // where the address is NOT in the home mints a fresh store-unique token; `listen(address)` where the address
  // IS ALREADY REGISTERED returns the EXISTING entry's handle and adds NO second entry"* — **which the same
  // item states as an INHERITANCE from `docs/specs/storeroom-native/write-and-read.md §6.5` item 12 (c)**
  // (*"a `listen(address)` whose address IS already registered returns the EXISTING entry's handle rather than
  // minting a second one"*), **read with item 2's address-level idempotence and `A45`'s ONE home entry per
  // address, and with `§5.5`'s dated re-derivation of `S-WITHDRAW`'s own printed subject**, whose two arms are
  // printed there as a table: **the WITHDRAWN arm** (the `unlisten` REMOVED the address's one store-side home
  // entry ⇒ *"a later `listen` at that address MINTS A FRESH token"*) **and the STILL-REGISTERED arm** (the
  // `unlisten` ahead of it was one of `§2.3` item 4's NO-OP SUCCESSES, which remove NOTHING ⇒ *"a later
  // `listen` at that address MINTS NOTHING and RETURNS THE EXISTING ENTRY'S HANDLE — the SAME opaque value"*).
  // **THE CELL ITSELF IS UNTOUCHED, ASSERTION BY ASSERTION, AND IT NOW DRIVES THE WITHDRAWN ARM WITH ITS OWN
  // NAME SAID OUT LOUD, so the ONE case the sentence is true of is not read as the whole rule.** **THE SAME
  // RE-DERIVATION IS DRIVEN AT ITS OTHER HALF — the STILL-REGISTERED arm — IN THE CELL ABOVE**
  // (`handle_a_repeat_listen_at_a_registered_address_returns_the_entries_own_handle`) **and in this file's
  // sibling `register.test.mjs` at `P-SM-5`'s `S-WITHDRAW` line.** (The function half of the rule — that a
  // WITHDRAWN handle's function "simply never fires again" — is driven at `register.test.mjs`'s `S-REG` line,
  // which reaches the registration site `§2.4` item 5 declared; this cell keeps the STORE-side half it can
  // reach.)
  const again = listen(inst, ['a']);
  assert.ok(
    again !== handle,
    '§5.5\'s WITHDRAWN arm: the `unlisten` ABOVE removed the address\'s home entry, so this re-`listen` ' +
      'mints a FRESH handle — *"a later `listen` at that address MINTS A FRESH token"* — and it is NOT the ' +
      'still-registered arm, where the SAME opaque value would come back',
  );
  const second = write(inst, ['a'], 'mem', 2);
  assert.equal(second.triggered.length, 1);
});

// ---------------------------------------------------------------------------------------------
// `§2.3` item 5 / `§5.8`'s `S-TRIGGER` — membership is the prefix test and nothing else
// ---------------------------------------------------------------------------------------------

test('registry_the_triggered_handle_set_is_exactly_the_prefix_set_descendant_inclusive', () => {
  const inst = mem([
    { address: ['a'], handle: 'at-a' },
    { address: ['a', 'b'], handle: 'at-ab' },
    { address: ['zzz'], handle: 'at-zzz' },
  ]);
  // The containers the write runs through are created first: a write's parent is resolved BY ADDRESS.
  write(inst, ['a'], 'mem', {});
  write(inst, ['a', 'b'], 'mem', {});
  const record = write(inst, ['a', 'b', 'c'], 'mem', 1);
  assert.equal(record.triggered.length, 2, 'the prefix set, descendant-inclusive, on a WRITE');
  const outside = write(inst, ['q'], 'mem', 1);
  assert.deepEqual(outside.triggered, [], 'a write outside every registration\'s scope fires nothing');
});

test('registry_a_delete_fires_its_own_triggered_set_on_the_same_prefix_test', () => {
  const inst = mem([
    { address: ['a'], handle: 'at-a' },
    { address: ['zzz'], handle: 'at-zzz' },
  ]);
  write(inst, ['a'], 'mem', 1);
  const receipt = remove(inst, ['a'], 'mem');
  assert.equal(receipt.triggered.length, 1, 'A43: a delete FIRES');
  assert.deepEqual(receipt.tiers, ['mem']);
});

// ---------------------------------------------------------------------------------------------
// `§5.5`'s `S-REG-DUP` and `§5.8`'s `S-SET` — a set, never a sequence
// ---------------------------------------------------------------------------------------------

// **⟶ RE-DERIVED 2026-10-11 — THE RECONCILED READING OF `§2.4` RULE 3, WHOSE TWO INDEPENDENT OBSERVABLES
// THIS ONE CELL NOW DRIVES ONE BY ONE.** `RCA-8(d)` ANNOTATE-BESIDE: **this is the ONE re-derivation the
// bounded doc pass of 2026-10-11 named as owing (`docs/specs/storeroom-js/backup/
// GATE5-DOC-2026-10-11-manifest.md` item 1), and no clause of the cell's subject moves with it.**
//
// **THE CLAUSE, CITED AT ITS OWN BYTES — `docs/specs/storeroom-js/surface.md` §2.4's dated clause of
// 2026-10-11, whose twin stands at `docs/specs/storeroom-js/contract.md` §2.4:** *"(i) THE INVOCATION COUNT
// — ONE PER DISTINCT IDENTITY, AND IT IS THE PACKAGE'S OWN RULE. One identity invoked ONCE, however many
// occurrences carry it … so in CASE B the duplicate token's ONE function runs ONCE"*; *"(ii) THE ARRAY'S
// ELEMENT MULTIPLICITY — THE STORE'S OWN DECLARED LIST, CARRIED OUT FAITHFULLY AND NOT DEDUPLICATED AT THE
// BOUNDARY. `triggered` crosses as a fresh JS array of the handles the store's own list carries … so in
// CASE B THE JS-OBSERVABLE `triggered` CARRIES THE TOKEN TWICE, and a drive may assert the array's LENGTH
// (`2`) and its DISTINCT-identity count (`1`) TOGETHER; `§2.7` item 3's *"no order is asserted"* is UNMOVED
// by either figure"*.** **THE STORE-SIDE CLAUSES THE TWO HALVES REST ON, AT THEIR OWN HOMES:
// `docs/specs/storeroom-native/contract.md §0.2`'s `DD-42`** — *"`listen` MUST NOT MINT A TOKEN EQUAL TO ANY
// TOKEN THE HOME ALREADY HOLDS … and `triggered` carries NO DUPLICATED MEMBER … and the construction's
// adopted tokens are untouched by the mint's own rule … in THAT case — and only that case — `triggered`
// carries the token twice"* — **and `DD-39`**, whose duplicate case declares *"`listeners[]` may be EMPTY …
// and a DUPLICATE is ADMITTED AND BOTH ENTRIES ARE KEPT — the construction is a POPULATION step and not a
// registration verb … the home then holds two entries at one address with two DIFFERENT handles, and a
// trigger returns **both**"*; **read with `write-and-read.md §6.5` item 12 (b)'s ADOPTION VERBATIM and that
// contract's `§0.4` clause 2 (b), and with `docs/specs/storeroom-js/test-cases.md`'s own row, which prints
// this drive's licence verbatim** (*"a drive may assert the array's LENGTH (`2`) and its DISTINCT-identity
// count (`1`) TOGETHER"*).
//
// **THE CELL AS FILED, RE-EMITTED BESIDE THE READING THAT REPLACES IT, BECAUSE ITS WORDING AND ITS FIGURE
// POINTED TWO WAYS.** As filed, this cell's comment read — verbatim — *"`§2.4` rule 3: where two construction
// entries at one address carry the caller's SAME token, the store returns that token ONCE where the store
// minted it, and the registry fires ONE invocation per DISTINCT handle — not one per occurrence and not one
// per entry."* — and its ONE assertion read, verbatim —
// `assert.equal(record.triggered.length, 1, 'one DISTINCT handle, not one per occurrence and not one per entry');`.
// **THE WORDING IS THE INVOCATION RULE AND IT IS RIGHT** (`§2.4` rule 3; its dated clause (i)) — **so it is
// carried LIVE, at the assertion it belongs to, in group (2) below.** **THE LENGTH FIGURE IS WHAT THE
// CLAUSE REFUTES:** the cell stated the PACKAGE's invocation count AS IF IT WERE the STORE's array, and in
// this state — the caller-spelled duplicate — the two figures differ (`1` invocation, `2` members).
//
// **ORDER, AND WHY IT IS NOT AN ADJUSTMENT TO DODGE THE FAILING FIGURE.** The two INVOCATION halves —
// groups (2) and (3) — are driven BEFORE the array-multiplicity half, group (1), **so that the one figure
// the clause moved cannot mask their verdicts**: an assertion that aborts its cell leaves the halves after
// it `un-run`, and `un-run` IS A FAILURE (`acceptance.md §4.4`). **NOTHING IS WEAKENED BY THE ORDER: all
// three groups are asserted, every group is drivable on its own, and group (1) still fails against any
// boundary that collapses.**
//
// **AND THE CAUSE OF THAT FAILURE IS NAMED HERE RATHER THAN DODGED, BECAUSE THE CLAUSE ITSELF NAMES IT: THE
// SHIPPED BUILD DEDUPLICATES AT THE BOUNDARY.** `bindings/js/index.mjs`'s `wrapHandles` pushes each token's
// handle into its output *"AT MOST ONCE"*, so the shipped observable answers `1` where clause (ii) declares
// `2` — **and the clause takes no finding against either side, leaving *"WHICH SIDE THE DIVERGENCE SITS ON
// … FOR THE PASS THAT RECONCILES THE BUILD TO THIS CLAUSE"*.** **THE DRIVE BELOW ASSERTS THE DECLARED
// READING, so it is RED against the shipped build and its cause is the IMPLEMENTATION.** **AND THE
// RECONCILING PASS OWES ONE THING BESIDE IT, STATED HERE SO IT IS NOT DISCOVERED: `deliver` iterates the
// array ELEMENT BY ELEMENT, so carrying this state's token TWICE while `deliver`'s loop stays as shipped
// would invoke the one registered function TWICE — the per-identity dedup must stand at DELIVERY, where
// clause (i) puts it, and it must be the BOUNDARY's dedup that moves.**
test('registry_a_lawful_duplicate_token_fires_once_for_the_distinct_handle', () => {
  // (0) THE STATE: TWO CONSTRUCTION `listeners[]` ENTRIES AT ONE ADDRESS CARRYING THE CALLER'S SAME TOKEN
  // (`DD-39`'s duplicate case). `held` is the handle the caller holds for that ONE token: a `listen` at an
  // already-registered address returns the EXISTING entry's handle and mints nothing (`surface.md §2.3`'s
  // dated clause; `write-and-read.md §6.5` item 12 (c)), and BOTH entries carry the one token, so both
  // occurrences wrap to it — **so the handle group (2) registers IS that token's handle, never a second
  // identity, and group (1) pins the two array members to this very value.**
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l1' },
  ]);
  const held = listen(inst, ['a']);
  const record = write(inst, ['a'], 'mem', 1);

  // (2) THE INVOCATION IS THE PACKAGE'S — ONE PER DISTINCT IDENTITY, however many occurrences carry it:
  // **"not one per occurrence, and not one per entry"**, the as-filed wording, asserted where it belongs.
  // **THIS IS THE HALF THE CELL'S NAME WAS REACHING FOR, AND IT IS NOW ITS OWN ASSERTION RATHER THAN AN
  // INFERENCE FROM THE ARRAY'S LENGTH** (`§2.4` rule 3; its dated clause (i); `§2.4` item 6 (b)–(e)).
  // AND THE INVOCATION'S OWN VIEW IS FIXED BESIDE IT: exactly ONE argument (`A77`; `surface.md §2.7`
  // item 5) and that argument is the TRIGGERING ADDRESS — the verb's own `address` argument verbatim, and
  // never the id that selected the function (`parameter-semantics.md §2.12`'s dated clause, its three arms;
  // `PAR-JS-15`'s dated clause; `A77`'s consequence (4)).
  let invocations = 0;
  const seen = [];
  inst.register(held, function (...args) {
    invocations += 1;
    seen.push({ argc: arguments.length, address: args[0] });
  });
  write(inst, ['a'], 'mem', 2);
  assert.equal(
    invocations,
    1,
    'ONE invocation per DISTINCT identity — not one per occurrence, and not one per entry',
  );
  assert.equal(seen.length, 1, 'exactly one invocation was recorded');
  assert.equal(seen[0].argc, 1, 'A77 / §2.7 item 5: the invocation\'s view is ONE argument');
  assert.deepEqual(seen[0].address, ['a'], '...and it is the TRIGGERING ADDRESS, never the matched id');

  // (3) THE DISTINCT CASE, DRIVEN BESIDE IT SO THE TWO RULES CAN BE TOLD APART: TWO DIFFERENT tokens at ONE
  // address are TWO distinct identities (`DD-39`: both entries KEPT, each with its OWN handle), so the
  // array carries TWO members AND TWO invocations follow — one per identity, never one per array. **THIS IS
  // THE DRIVE THAT MAKES THE PAIR OF RULES FAIL-ABLE: change either multiplicity and one of the two drives
  // breaks.** The registration is PER MEMBER and the counters are keyed BY MEMBER, so NO ORDER IS ASSERTED
  // (`§2.7` item 3; `DD-22`; `§5.8`'s *"a drive that asserts a sequence"* is on the failure list).
  const distinct = mem([
    { address: ['a'], handle: 'x1' },
    { address: ['a'], handle: 'x2' },
  ]);
  const first = write(distinct, ['a'], 'mem', 1);
  assert.equal(first.triggered.length, 2, 'two entries, two tokens: the store returns BOTH');
  assert.equal(new Set(first.triggered).size, 2, '...and they are TWO distinct identities, never one twice');
  const fired = new Map();
  for (const id of first.triggered) fired.set(id, 0);
  for (const id of first.triggered) distinct.register(id, () => { fired.set(id, fired.get(id) + 1); });
  const second = write(distinct, ['a'], 'mem', 2);
  assert.equal(second.triggered.length, 2, 'the distinct identities stand on the second write too');
  assert.equal(fired.size, 2, 'two registrations, two DISTINCT identities');
  for (const count of fired.values()) {
    assert.equal(count, 1, `the function registered for one DISTINCT identity ran once; it ran ${count} time(s)`);
  }

  // (1) THE ARRAY'S MULTIPLICITY IS THE STORE'S — CARRIED ELEMENT FOR ELEMENT AND NEVER DEDUPLICATED AT THE
  // BOUNDARY: this state's TWO occurrences cross, **and the two members are ONE IDENTITY, asserted MEMBER BY
  // MEMBER and never by size — each is the handle the caller holds for that one token, and the set's
  // distinct-identity count is `1`** (`§2.4`'s dated clause (ii); `crossing.md §1.3`'s returned-record rows;
  // `PAR-JS-15`; `§2.7` item 1).
  assert.equal(
    record.triggered.length,
    2,
    'the ARRAY\'s multiplicity is the STORE\'s: the caller-spelled duplicate\'s token is carried TWICE',
  );
  assert.equal(record.triggered[0], held, '...and the first occurrence IS the handle the caller holds for that token');
  assert.equal(record.triggered[1], held, '...element for element: the second occurrence carries the SAME identity');
  assert.equal(new Set(record.triggered).size, 1, '...while the DISTINCT-identity count is ONE');
});

test('registry_the_triggered_set_is_compared_as_a_set_and_no_order_is_asserted', () => {
  const inst = mem([
    { address: ['a'], handle: 'l1' },
    { address: ['a'], handle: 'l2' },
    { address: ['a'], handle: 'l3' },
  ]);
  const first = write(inst, ['a'], 'mem', 1);
  const second = write(inst, ['a'], 'mem', 2);
  assert.equal(first.triggered.length, 3);
  // Membership only: the two enumerations may differ and no drive may treat that as a failure (DD-22).
  assert.equal(new Set(first.triggered).size, new Set(second.triggered).size);
  assert.ok(first.triggered !== second.triggered, 'fresh on every call');
});

// ---------------------------------------------------------------------------------------------
// `§2.7` — the delivery window, and the two registration verbs
// ---------------------------------------------------------------------------------------------

test('delivery_the_record_is_complete_before_the_window_opens', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  const record = write(inst, ['a'], 'mem', 1);
  // Everything the window could need is already in the returned value: the handle set, the watched
  // addresses, the op and the state halves — no member is filled in later.
  assert.equal(record.triggered.length, 1);
  assert.deepEqual(record.watched, [['a']]);
  assert.equal(record.op.after.present, true);
  assert.equal(read(inst, ['a']), 1, 'the store\'s result is COMPLETE and copied out');
});

test('delivery_unlisten_returns_the_unit_on_success_including_its_no_op_success', () => {
  const inst = mem();
  const handle = listen(inst, ['a']);
  assert.equal(unlisten(inst, handle), undefined);
  assert.equal(unlisten(inst, 'not-a-handle'), undefined, 'its no-op success returns the same unit');
  assert.equal(unlisten(inst, 'not-a-handle'), undefined, 'and it is idempotent');
});

test('delivery_listen_carries_no_tier_qualifier_its_address_is_the_whole_of_its_key', () => {
  const inst = mem();
  const handle = listen(inst, ['a', 'b']);
  write(inst, ['a'], 'mem', {});
  write(inst, ['a', 'b'], 'mem', {});
  const atDepth = write(inst, ['a', 'b', 'c'], 'mem', 1);
  assert.equal(atDepth.triggered.length, 1, 'the listener binds by ADDRESS alone');
  const sibling = write(inst, ['a'], 'mem', 1);
  assert.deepEqual(sibling.triggered, [], 'a write ABOVE the registration does not fire it');
  assert.ok(handle !== undefined);
});

test('delivery_the_watched_member_is_a_list_of_addresses_and_never_a_list_of_handles', () => {
  const inst = mem([{ address: ['a'], handle: 'l1' }]);
  write(inst, ['a'], 'mem', {});
  const record = write(inst, ['a', 'b'], 'mem', 1);
  assert.deepEqual(record.watched, [['a']], 'PAR-JS-14: an address is a SEGMENT LIST');
  for (const address of record.watched) assert.ok(Array.isArray(address));
});
