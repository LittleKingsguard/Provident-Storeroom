// `D-13` (`docs/L1/kernel-subdivision.md` §1 part `9c`) — the commit act: bytes moved from `bindings/js/src/constraint-kernel.mjs`; no logic changed.
import { KC, refuse, inDomainAddress, kernelFor, attemptHeldAt, appendOwn, addressSpelling, commitLogInFlight, COMMIT_LOG } from './kernel-foundations.mjs';
// ---------------------------------------------------------------------------------------------
// `K-2` `commit(store, address, tier, value) -> CommitRecord`
// ---------------------------------------------------------------------------------------------
export function commit(store, address, tier, value) {
  const kernel = kernelFor(store);
  const held = inDomainAddress(address);

  // **⟶ THE `KC-7` MEMBERSHIP TEST IS A STRUCTURAL COMPARISON AGAINST THE LIVE ATTEMPTS' ADDRESSES**
  // (`P: docs/pending.md · M-3` item (iii), verbatim: *"the attempt's address is carried on the attempt and
  // compared STRUCTURALLY against the live attempts' addresses, since there are as many live attempts as there
  // are nesting levels and a scan over them is bounded by nesting depth, not by pair count"*).
  // **THE REFUSAL ITSELF IS UNMOVED** — `kernel-surface.md §2.1` item 2's hold clause, cited at
  // `contract.md §2.8` item 7: a second `K-2` at a HELD address is refused BEFORE the write verb is reached,
  // and a `K-2` at a DESCENDANT address is ADMITTED because the hold is taken at the call's OWN address.
  // **AND A DRIVE ASSERTS THE REFUSAL AND NOT THE MAP IT CAME FROM** (`contract.md §8` item 12).
  // **⟶ AND THE SCAN IS THE INSTANCE'S OWN** (`D-30`): it reads THIS store's kernel's live attempts, so a live
  // attempt in ONE instance refuses no `K-2` in ANOTHER at the same address (`A137`), while a second `K-2` at a
  // HELD address WITHIN the instance is refused exactly as it stood. **THE ADDRESS COMPARISON ITSELF IS UNMOVED.**
  if (held && attemptHeldAt(kernel, address)) {
    refuse(KC.attemptOpen,
      `a constraint attempt is already open at ${addressSpelling(address)}; it is disposed of by its own `
      + 'K-3 and by no other act',
      []);
  }

  // THE HOLD IS TAKEN AT `K-2`'S OWN ACT AND BEFORE THE STORE'S WRITE VERB IS REACHED
  // (`attempt-lifecycle.md §2.4` item 8 (ii) (g) term (1); `A: docs/decisions.md` · `A112`): the store
  // invokes nothing, so the only invocation window that can stand inside `K-2` is the SURFACE's, and a
  // listener body's own nested `K-2` while `K-2` stands is inside `K-2`'s own window — so the address
  // this call commits at is HELD from this instant, its token already in hand. The set below is what the
  // head's `kernel.held.has(token)` refusal reads, and the map's values are only ever `has`ed and
  // `delete`d (`release`). `KC-7`'s `K-2` half is refused ONLY at the address that already holds the
  // live attempt: a nested `K-2` at a DESCENDANT address meets no hold of its own and is ADMITTED.
  // ── (the hold is THIS INSTANCE's live-attempt map's own membership from here on: no second structure is
  // taken, and the map is `kernel.live` — `D-30`'s per-store record, not a module-level one) ───────────

  // THE STORE'S OWN VERB CHOOSES WHICH REFUSAL ANSWERS. An out-of-domain `tier` and an absent
  // `value` are THE STORE'S own code on THE STORE'S own channel, and the kernel mints no `KC-2` for
  // either (`kernel-surface.md §2.1` item 2; `parameter-semantics.md §2.14`). WHERE THE VERB REFUSES, NO
  // ATTEMPT WAS OPENED, SO THE ADDRESS IS LEFT UNHELD: the hold taken above is released and the store's
  // own throwable reaches the caller UNCHANGED AND UNCONVERTED (`fail-surface.md §1.2` item 2) — a
  // refused write leaves no hold behind (`ck_surface_K2_an_out_of_domain_tier_is_the_store_s_own_code_on_the_store_s_own_channel`).
  kernel.attempts += 1;
  // **⟶ AND THE ATTEMPT'S ADDRESS IS A LOCAL INDEX COPY OF THE CALLER'S ARRAY, NOT `address.slice()` —
  // `D-35`'s READ HALF, CLOSED 2026-10-26.** `commit`'s `address` IS THE CALLER'S OWN POSITION (`write` hands
  // the raw argument to `constraintWrite`, which hands it here), and `address.slice()` takes
  // `Array.prototype.slice` OFF A MUTABLE PROTOTYPE at the moment of the call: a deleted `slice` threw the raw
  // host `TypeError` *"address.slice is not a function"* out of a LAWFUL `write`, and a forged one decided the
  // address every later kernel act compares — the hold, the pass's evaluated set and the report's spelling.
  // **THE FORM IS THE CONTRACT'S OWN** (`contract.md §2.1` item `(1c)(i)`: a local index loop, appending by
  // `appendOwn`), and NO ANSWER MOVES: the same segments, the same order, a FRESH array as before.
  const addressCopy = [];
  for (let i = 0; i < address.length; i += 1) appendOwn(addressCopy, address[i]);
  // **⟶ AND THE ATTEMPT'S LOG IS THE COMMIT'S LOG — `D-53`, 2026-10-28.** A write the kernel reaches from inside
  // an invocation it made of caller code that BELONGS TO AN ATTEMPT (a constraint body's verb at a landing, a
  // repair body's write, a registration's body) is part of that attempt's commit, so it JOINS that commit's one
  // list; a write reached with no such frame standing — a caller's own write, and a LISTENER BODY's write, which
  // the entry invokes at the terminal arm — OPENS a commit and starts a fresh list, because *"the triggering
  // commit already passed constraints"* and what the listener does now is a new question (`D-53`).
  // **ONE LIST PER COMMIT AND NO MERGE**: the entries a nested write mints are this list's entries, their
  // POSITION is this list's index (the array index is the ordinal; `D-65`, 2026-10-28), and the crossed report of
  // the enclosing refusal IS this list (`D-52`'s rule 2 is dissolved rather than answered — there are not two
  // lists to reconcile).
  const joined = commitLogInFlight(kernel);
  const commitLog = joined === null ? [] : joined;
  const attempt = {
    ref: { id: `attempt-${kernel.attempts}` },
    store,
    address: addressCopy,
    tier,
    value,
    commit,
    // THE WRITE'S OWN RETURNED SET, HELD ON THE ATTEMPT ITSELF: the failing arm's discard reads it and
    // never a derivation from the attempt's address (`attempt-lifecycle.md §3` item 8: the failing arm
    // reads `triggered` as the store's returned set VERBATIM).
    write: null,
    ops: [],
    // THE COMMIT'S OWN LIST, BY REFERENCE (`D-53`): the attempt holds a reference to it and mints no second one.
    log: commitLog,
    ran: [],
    appliedRepairs: [],
    rollback: [],
    checkpoint: null,
    // `A117` (D5): THE IDENTITIES THIS ATTEMPT'S PASSES CHECKED OFF, in the order the check-offs were
    // taken — the finding the passing arm publishes onto the record (`publishCheckedOff`) so that the
    // terminal arm resolves each the way the residue is resolved and delivers the firing a registration
    // at that identity's address still owes (`CHECKED_OFF` above). It is the ATTEMPT'S OWN and never the
    // record's: no `CommitRecord` member is added (`A117` (D6)).
    checkedOff: [],
    status: 'open',
    report: null,
  };

  // **⟶ ADDED 2026-10-15 — THE `A116` ORDERING-SEAM PASS: INSTANT (a), TAKEN HERE SO IT STANDS BEFORE THE
  // STORE'S WRITE VERB IS CALLED.** `docs/decisions.md` · `A116` (D1)/(D2) declares the seam — a member
  // of the object `storeCreate` returned, which THE KERNEL CALLS and THE ENTRY IMPLEMENTS — and
  // `surface.md §2.4` item 9's table fixes this instant: *"BEFORE THE STORE'S WRITE VERB IS CALLED …
  // inside `commit`, for a write the kernel has issued, before the store's own `write` verb is reached"*.
  // The identity the seam receives IS THE RECORD IDENTITY `commit` returns — the same object, not a copy
  // of it (`PAR-JS-19`'s argument cell) — so the record the seam adopts below is built FIRST, and this
  // call is the adoption that makes the write in flight one whose in-window delivery is WITHHELD.
  //
  // THE MEMBER IS REACHED THE ONE WAY THIS SURFACE REACHES THE INSTANCE'S OWN MEMBERS, WITH NO ADDON CALL
  // AND NO STORE VERB: the caller's own instance object carries it. **AND A `write` VERB THE INSTANCE DID
  // NOT ADOPT A RECORD FOR — a bare caller-made write made through this same `store` — reaches no such
  // member and is answered by the package's own post-verb instant, `§2.7` item 8's, unmoved** (`§2.4`
  // item 9 (e): *"a caller's addressable sub-surface on that handle is the three members `§2.4` item 5 and
  // item 7 declare"* — this arm is the kernel's own and never a caller's).
  const record = {
    attempt: attempt.ref,
    op: null,
    triggered: [],
    // `kernel-surface.md §2.1` item 2 — THE FOURTH MEMBER, AS `A: docs/decisions.md` · `A112` RE-SPELLS
    // IT: "`pending` IS THE WHOLE RETURNED SET ... THE KERNEL WRITES THE ENTIRE RETURNED SET OF
    // TRIGGERED CONSTRAINTS AS `pending` AND CHECKS EACH OFF AS IT PASSES", and sifting a subset out of
    // the returned set is UNNECESSARY AND UNLAWFUL. `K-2` is the caller's own verb call and the kernel
    // invokes no pair in its window here, so EVERY handle this write returned stands in the member at
    // this instant; a handle whose pair a LATER pass evaluates leaves it only by being checked off as it
    // passes (`releasePending`), and where the write failed the registered constraints at its landing
    // "its set is DISCARDED rather than carried, so its handles appear in `triggered` and in `pending`
    // NEVER" (`attempt-lifecycle.md §2.4` item 8 (i) (5), the discard rule's one home).
    pending: [],
  };
  attempt.record = record;
  // **⟶ AND THE LOG TRAVELS ON THE COMMIT'S OWN RECORD, UNDER A SYMBOL KEY — `D-53`.** The record is the
  // commit's JS identity: the fourth position names it, the entry adopts it, and the terminal arm holds it when
  // it must tell a failed save's crossing WHICH LOG the commit's verdict stands in (`delivery.mjs`'s save arm
  // reads it through `state.mjs`'s `commitLogOf`, which spells the same key). **NO MEMBER IS ADDED**: `Object.keys` and
  // `Object.getOwnPropertyNames` read past a symbol (`A117` (D6)), so `CommitRecord` keeps its four members and
  // every census of it moves by nothing.
  Object.defineProperty(record, COMMIT_LOG, {
    value: commitLog,
    enumerable: false,
    writable: false,
    configurable: true,
  });
  // **⟶ INSTANT (a)'S SEAM CALL IS WITHDRAWN, 2026-10-18** (`docs/specs/storeroom-constraints/kernel-surface.md
  // §2.1` item 2's clause of that date: *"the call of `settle(record)` THIS ITEM MAKES AT INSTANT (a) … IS
  // WITHDRAWN"*). **WITH ONE ACTOR THERE IS NOTHING TO WITHHOLD**: the record is built and complete BEFORE the
  // store's own write verb is reached — THE ORDER that clause protects — and no member is called here.

  let written;
  try {
    // **THE FOURTH POSITION** (`kernel-surface.md §1` item 5's dated spelling; `surface.md §2.12` item 1
    // stage 2): the kernel drives the Rust store with the record identity `K-2` opened or joined, so the
    // kernel's own store leg IS the entry's own write and its delivery is withheld for the terminal arm.
    // **ORDINAL CORRECTED 2026-10-21**: the old "fifth" was the retired `call(instance, verb, args)`
    // dispatcher's ARRAY frame (that dispatcher deleted at `export-set-and-dispatch.md §2`), the per-verb
    // entries' surplus trailing parameter since removed, so the commit position is the FOURTH of `write`'s
    // four positions — `surface.md §2.2`: `a.write(address, tier, value, commit?)`.
    written = store.write(address, tier, value, record);
  } catch (refusal) {
    throw refusal;
  }

  attempt.write = written;
  attempt.ops = [written.op];
  kernel.live.set(attempt.ref.id, attempt);

  // **THE MEMBERS THE WRITE'S OWN RETURN CARRIES, READ OFF IT VERBATIM** (`A112`; `§2.2` item 2): the
  // record above was built with the four members the seam's own adoption is keyed by — the identity alone
  // is what adoption reads — and the write's returned set is then written into `triggered` and into
  // `pending` AS ONE LIST, member for member and by the SAME handle identities, which is the state `K-2`
  // answers its caller with.
  record.op = written.op;
  record.triggered = written.triggered;
  record.pending = written.triggered.slice();

  // ── THE ORIGINAL BODY OF THIS ITEM, KEPT BESIDE THE INSERTION ABOVE ────────────────────────────────
  //
  //   ATTEMPTS += 1;
  //   const attempt = { … write: written, ops: [written.op], … };
  //   const record = { attempt: attempt.ref, op: written.op, triggered: written.triggered,
  //                    pending: written.triggered.slice() };
  //   attempt.record = record;
  //   LIVE.set(attempt.ref.id, attempt);
  //
  // THE MOVE IS THE SEAM'S OWN CONSEQUENCE AND MOVES NO RULE: the attempt's five members, the record's
  // four members and the instant the record is placed in `LIVE` all stand as they stood, and the ONE
  // difference is that the record stands before the write verb is reached, which is the instant `A116`
  // (D1) fixes.

  // THE SET THE WRITE RETURNED IS CARRIED WHOLE (`A112`): the handle the kernel's own adopted home entry
  // stands for is NOT subtracted here — that subtraction is the sift `A112` withdraws by name. It leaves
  // the member when its own pair's pass checks it off (`releasePending`), and the rolled-back arm's
  // discard is the throw path's own rule (`terminal`/`close`).
  return record;
}

// ---------------------------------------------------------------------------------------------
// **⟶ ADDED 2026-10-29 — `commitRemoval`: THE DELETE-SHAPED COMMIT ACT. `D-55` ITEM 3, `DEF-X`.**
//
// **THE RULING, THE ARCHITECT, VERBATIM: *"A delete is an editing verb and must pass constraints. This includes
// all of the relevant commit and message logic."*** (`strata/decisions.md` · `D-55` item `3`). **THE MEASURED
// OBSTACLE IT ANSWERS WAS PRINTED, NOT ASSUMED**: a `delete` opens its own commit window and reaches the
// addon's `delete` directly — **no `K-2`, no `K-3`, no log and no terminal entry** — and **the only pass shape
// the artefact had (`K-2` then `K-3`) LANDS A WRITE FIRST** (`storeAfter = {"c":2}`), so any pass driven
// through it judges a state the delete is not in. **SO THE DELETE GETS AN ATTEMPT OF ITS OWN KIND, AND THIS IS
// IT** — the commit act's remove-shaped sibling, and NOT a re-used `K-2`.
//
// **IT OPENS LIKE ANY OTHER, AND THE TWO THINGS IT SHARES WITH `K-2` ARE THE TWO THAT MATTER:**
//   * **`D-44` IS KEPT BY THE CALLER AND RE-CHECKED HERE**: the attempt is opened inside the delete's own
//     commit window (the member opens it before this act is reached, `index.mjs`'s `delete`), so no check this
//     pass runs stands outside one — and a store this package did not build carries no commit scope at all, so
//     `runAttempt` fails closed exactly as it does for a write.
//   * **`D-53` IS KEPT BY THE SAME READ `K-2` TAKES**: `commitLogInFlight` answers the enclosing invocation's
//     list where this delete was called from caller code that BELONGS TO an attempt (a constraint body's
//     `delete`, a repair's), and `null` at a consumer's own call. **ONE LIST PER COMMIT, AND A DELETE'S ENTRIES
//     JOIN IT** — there is no second list and no merge.
//
// **WHAT IT DOES NOT DO IS LAND A WRITE.** `K-2` calls the store's `write`. **This act mints an `AttemptRecord`
// of kind `delete` and calls THE STORE'S OWN LEG THE CALLER HANDS IT** — the addon's `delete`, already crossed
// by the entry — so **the state the attempt is judged at is the state the delete LEFT and never a state a probe
// wrote.** The act's own answer (`removal`) is the delete's declared receipt: its `op` is the DELETE's journal
// op and so THE ATTEMPT'S ONE LANDING (`attempt.ops`), which is what the pass's context carries and what the
// failing arm's composition rolls back; its `triggered` set is the store's own returned set, kept on
// `attempt.write` for the terminal act's discard rule exactly as a failed write's is.
//
// **⟶ AND IT MINTS THE `CommitRecord` TOO, 2026-10-29 — THE FOUR MEMBERS, THE SYMBOL-KEYED LOG, AND THE ONE
// IDENTITY THE WHOLE COMMIT'S MACHINERY IS KEYED BY.** The `DEF-X` build measured the four residuals this
// closes and printed them; each is a `K-2` behaviour that follows from the record and from nothing else:
//   * **ADOPTION** — the record is what `K-2` hands the store's own verb at its fourth position, and what the
//     entry holds so that the TERMINAL ARM performs the delivery and the save. A delete has no fourth position
//     (its declared arity is `delete(address, tier)`), so the entry adopts the record it holds the same way it
//     adopts a write's: it stands the delete's own returned receipt in the leg slot the terminal arm reads
//     (`index.mjs`'s `delete`), and the RECORD is what `settleArm` hands that arm.
//   * **THE `pending` RESIDUE** — written exactly as `K-2` writes it: the returned set WHOLE at this instant,
//     and a handle leaves it only by its own pair's check-off (`releasePending`) or by the failing arm's
//     discard (`terminal`). **NO SIFT**: the delete's own returned set is carried, member for member.
//   * **THE `file`-TIER SAVE** — the terminal arm's save is gated on the record this act mints
//     (`SETTLED_ON_THE_PASSING_ARM`, placed by the passing arm) and on the leg the entry adopted, so a
//     `file`-tier delete SAVES its own op exactly as a `file`-tier write saves its own.
//   * **`K-4`/`K-5` BY REF** — the record carries `attempt`, the `AttemptRef` those two items accept, so the
//     delete's log and report are answerable after a PASSING delete and not only from a refusal's log.
// **THE RECORD'S FOUR MEMBERS AND ITS SYMBOL-KEYED LOG ARE `K-2`'S OWN, SPELLED THE SAME WAY**: the log is
// defined with `Object.defineProperty` under `COMMIT_LOG` and is not a fifth member (`A117` (D6)), so a census
// of any record moves by nothing.
//
// **THE `D-3` ARM IS KEPT AND A HELD ADDRESS IS JOINED RATHER THAN REFUSED** (the ground is printed at the act
// itself and it is a measurement, not a preference: a repair has no fourth position to name its commit at, so
// a `KC-7` here would make a lawful repair's `delete` unlawful):
//   * **A REFUSED STORE VERB LEAVES NO ATTEMPT** (`D-3`'s neighbour): the addon's own refusal crosses back
//     unchanged, and because the attempt is placed in `kernel.live` only AFTER the act answered an op, a
//     refused delete holds nothing and closes nothing — `K-2`'s own rule, reached by the same structure.
//   * **AND AN ACT THAT REMOVED NOTHING IS `D-3`'S SUCCESS WITH `tiers: []`**: no journal entry was appended,
//     so there is no op, no landing to judge and no edit to undo — **this act answers `null`, the entry mints
//     no pass, and nothing is added to any log.** A delete that changed nothing cannot be refused by a
//     constraint, because it is not an edit. **NO `KC` TOKEN IS MINTED FOR IT AND NO TENTH TOKEN EXISTS.**
//
// **WHAT IT ANSWERS.** The attempt record, open and live — **carrying `attempt.record`, the `CommitRecord` this
// act minted** — for the pass the caller runs next (`entry`'s `constraintDelete`), or `null` on the `D-3` arm.
// **NO KERNEL ITEM IS MINTED**: `kernel-surface.md §1` item
// `2` closes the kernel's EXPORT SET at the five `K-1`–`K-5` items and that barrel
// (`src/constraint-kernel.mjs`) is untouched — this function is a part module's own act, reached by the entry
// the way every other kernel part is, and it is named by no `K-` number.
export function commitRemoval(store, address, tier, remove) {
  const kernel = kernelFor(store);
  // **NO `KC-7` REFUSAL IS TAKEN AT THIS OPENING, AND THE ASYMMETRY WITH `K-2` IS NAMED BECAUSE IT IS
  // MEASURED.** `K-2` refuses a second attempt at a HELD address, and a REPAIR at that address is admitted only
  // because it NAMES the enclosing commit at `write`'s fourth position (`D-46`). **A delete has no such
  // position** — the member's arity is the declared `delete(address, tier)` and this pass changes no
  // declaration — so a repair that edits by `delete` at the attempt's own address (the shape
  // `tests/integration/js-constraints/constraint-kernel-negatives.test.mjs`'s `P-NEG-22` drives, and
  // `parameter-semantics.md §2.7` blesses) would be refused by a hold it had no way to name its way out of,
  // and a lawful repair would stop being lawful. **SO THIS ACT REFUSES NOTHING ON THAT GROUND**: it joins the
  // address as a second attempt record and places itself in `kernel.live` below, which keeps the hold the
  // enclosing attempt already has (`attemptHeldAt` stays true there for every nested `K-2`, unchanged) and
  // takes the hold itself where the address was free. **THE COUNT `reversalAtRest` READS IS UNMOVED IN
  // MEANING**: an open delete attempt IS an open attempt, so a reversal raised inside its pass is a step.
  kernel.attempts += 1;
  // THE ATTEMPT'S ADDRESS IS A LOCAL INDEX COPY of the caller's array, never `address.slice()` (`D-35`'s read
  // half; the same form `commit` above takes and for the same measured reason).
  const addressCopy = [];
  for (let i = 0; i < address.length; i += 1) appendOwn(addressCopy, address[i]);
  // THE COMMIT'S ONE LIST, BY REFERENCE, OR A FRESH ONE WHERE THIS DELETE OPENED THE COMMIT (`D-53`).
  const joined = commitLogInFlight(kernel);
  const ref = { id: `attempt-${kernel.attempts}` };
  const attempt = {
    // **THE KIND — the discriminator the write's attempt never needed**: an attempt that landed no write is
    // judged against the DELETE's op, and it now owes the SAME `CommitRecord` a write's attempt does.
    kind: 'delete',
    ref,
    // **THE NAME THE BODIES THIS PASS INVOKES JOIN** (`D-46`/`D-53`). The record below is that name from now
    // on — `kernel-attempt.mjs`'s `evaluate` hands `attempt.record` to the invocation channel where one exists —
    // and this one-member object STANDS AS THE RECORD'S ABSENT ARM, so a body's write joins the delete's commit
    // instead of opening a second one on either arm.
    name: { attempt: ref },
    store,
    address: addressCopy,
    tier,
    // THE SUBJECT IS WHAT THE DELETE REMOVES, NOT A VALUE: the after-state is absence, and the op carries what
    // stood before it (its `before`) per tier (`D-55` item `3`'s *"the addresses and the tiers"*).
    value: undefined,
    commit: undefined,
    // The store's own returned set, kept whole for the terminal act's discard rule (`terminal`).
    write: null,
    // THE DELETE'S JOURNAL OP IS THE ATTEMPT'S ONE LANDING — empty until the act answers one.
    ops: [],
    log: joined === null ? [] : joined,
    ran: [],
    appliedRepairs: [],
    rollback: [],
    checkpoint: null,
    checkedOff: [],
    status: 'open',
    report: null,
  };
  // **THE RECORD, BUILT BEFORE THE STORE'S LEG IS CALLED — `K-2`'s OWN INSTANT AND `K-2`'s OWN FOUR MEMBERS**
  // (`kernel-surface.md §2.1` item 2; `A112` re-spells the fourth: *"`pending` IS THE WHOLE RETURNED SET"*).
  // Its members are FILLED from the receipt below; it is built here so the commit's identity exists before the
  // act lands anything, exactly as it does for a write.
  const record = {
    attempt: attempt.ref,
    op: null,
    triggered: [],
    pending: [],
  };
  attempt.record = record;
  // AND THE COMMIT'S LIST TRAVELS ON IT UNDER THE SYMBOL KEY, VERBATIM AS `K-2` DEFINES IT (`D-53`): ONE LIST
  // PER COMMIT, and the record is the identity it hangs from. **NO MEMBER IS ADDED** (`A117` (D6)).
  Object.defineProperty(record, COMMIT_LOG, {
    value: attempt.log,
    enumerable: false,
    writable: false,
    configurable: true,
  });
  // **THE STORE'S OWN LEG, AND IT IS THE CALLER'S** (`kernel-surface.md §1` item 1's empty import footprint:
  // this module reaches no entry and no addon of its own; the thunk is the entry's own addon call).
  const removal = remove();
  // `D-3`: nothing was removed — no entry was appended, so there is no op to name and no state to judge. **NO
  // ATTEMPT IS OPENED AND NO RECORD CROSSES**: the receipt is the whole answer, its `tiers` and `triggered`
  // empty, and the record built above dies with this attempt.
  if (removal === null || typeof removal !== 'object' || removal.op === null || removal.op === undefined) {
    attempt.status = 'closed';
    return null;
  }
  attempt.write = removal;
  attempt.ops = [removal.op];
  // **THE RECEIPT'S OWN MEMBERS, READ OFF IT VERBATIM — `K-2`'s three assignments at its own record's name.**
  // `triggered` is the store's returned set and `pending` is that set WHOLE (no sift; `A112`), so the residue
  // the terminal arm delivers and the failing arm's discard reads are the delete's own, unfiltered.
  record.op = removal.op;
  record.triggered = removal.triggered;
  record.pending = removal.triggered.slice();
  // THE ATTEMPT IS PLACED LIVE HERE, BEFORE THE FIRST BODY OF THE PASS RUNS: the store's own `delete` invokes
  // nothing, so there is no window between the act and this line in which a caller's code could interleave —
  // and the address is held from this instant through the pass and its terminal act, exactly as `K-2` holds
  // it. **THE MAP IS ALSO THE COUNT OF OPEN ATTEMPTS** the restart's at-rest discriminator reads
  // (`constraints.mjs`'s `reversalAtRest`), so a reversal raised inside this pass is a step and not a
  // judgement.
  kernel.live.set(ref.id, attempt);
  return attempt;
}

