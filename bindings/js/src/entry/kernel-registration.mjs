// `D-13` (`docs/L1/kernel-subdivision.md` §1 part `9b`) — the registration act, its evaluation, and the registry's removal: bytes moved from `bindings/js/src/constraint-kernel.mjs`; no logic changed.
import { KC, KERNEL_REFUSAL, markBodyThrow, refuse, inDomainAddress, inDomainId, pairRowAt, sameAddress, kernelFor, append, appendOwn, landedOp, pairsTriggered, enterCommitFrame, leaveCommitFrame } from './kernel-foundations.mjs';
import { dropHandoff } from './kernel-terminal.mjs';

/// **⟶ ADDED 2026-10-27 — `D-46`'s NAME ON A REPAIR INVOCATION'S OWN ENTRY, SPELLED HERE AS
/// `kernel-attempt.mjs` SPELLS IT.** **THE RULING, THE ARCHITECT, VERBATIM: *"A constraint's repair needs to stay
/// as part of the same commit so that it can be tracked as part of the commit process … The original way of
/// maintaining this was to accept an optional parameter on entry for the commit id, so that a constraint can
/// identify which open commit it is repairing"*** (`strata/decisions.md` · `D-46`). **SO STATE `3`'S REPAIR NAMES
/// THE SYNTHETIC ATTEMPT'S OWN COMMIT** — the record `3-bis` (a) declares *"the `CommitRecord` of the
/// registration act"*, which is the same object the repair's context carries at its `pending` member — **and the
/// write that repair body makes JOINS it instead of opening a second**: the op it lands is the synthetic
/// attempt's op, and the commit the registration opened still describes the repair it performed.
///
/// **AND `D-45`'S MARKING OF THIS SITE IS UN-MARKED BY NAME.** This frame invoked the repair body through the
/// entry's `externalCall`, which names nothing and is therefore the OPENS arm; `D-46` item `2` reverses it: **a
/// repair is part of the attempt being tracked and is not external code claiming a commit of its own.**
///
/// **THE KEY IS A `Symbol.for` SPELLING AND NEITHER SIDE IMPORTS THE OTHER** (`kernel-surface.md §1` item 1's
/// empty import footprint; the device `COMMIT_SCOPE` and `RESTART_DRAIN` cross by), **NO MEMBER IS ADDED TO ANY
/// RECORD AND NONE TO THE PRODUCT** (`A117` (D6)), and **no kernel item is minted** (`§1` item 2). **A STORE THAT
/// CARRIES NO SUCH CHANNEL ANSWERS THE INVOCATION WITH NOTHING NAMED**, and the repair's write opens its own
/// commit — the rule's absent arm, never a commit nobody named.
const EXTERNAL_CALL = Symbol.for('provident-storeroom.external-call');

/// **⟶ AND `D-69`'S REGISTRATION CHANNEL, SPELLED ON THIS SIDE TOO — 2026-10-29.** `delivery.mjs`'s
/// `installRegistrationSeam` installs it and this module reaches it, **and neither side imports the other**: the
/// same `Symbol.for` device `EXTERNAL_CALL`, `TERMINAL_ARM`, `COMMIT_SCOPE` and `FORGET_PAIR` already cross by
/// (`kernel-surface.md §1` item 1's empty import footprint; `A110`). **IT TAKES THE HANDLE `listen` WAS JUST GIVEN,
/// THE PAIR'S OWN CONSTRAINT FUNCTION, AND THE KIND** — and it mints nothing: no kernel item (`K-1`…`K-6` and no
/// seventh name, `§1` item 2), no member on any record, no store act.
const REGISTER_BODY = Symbol.for('provident-storeroom.register-body');

/// **THE INVOCATION OF A REPAIR BODY, WITH THE SYNTHETIC ATTEMPT'S COMMIT NAMED ON ITS ENTRY** — one call, its
/// answer the body's own, and a throwable crosses unchanged. **THE SECOND COPY OF THE FIVE-LINE FORM
/// `kernel-attempt.mjs` DECLARES**, because the two part files share no import and neither may reach the entry
/// (`kernel-surface.md §1` item 1) or the other's private bytes.
function repairInCommit(store, commit, run) {
  const channel = store !== null && typeof store === 'object' ? store[EXTERNAL_CALL] : undefined;
  if (typeof channel === 'function') return channel(run, commit);
  return run();
}

/// **⟶ AND THE CONSTRAINT BODY'S INVOCATION AT THE REGISTRATION INSTANT NAMES THE REGISTRATION'S OWN COMMIT —
/// `D-53`, 2026-10-28: *"Constraints/Repairs should always use the same commit"*.** `D-46` named the commit for
/// the repair alone; **`D-53` states the invariant both kinds of caller-authored body obey, and a CONSTRAINT BODY
/// IS A CHECK: the commit the registering verb opened (`addConstraint`'s bracket, `docs/specs/storeroom-js/
/// surface.md §4.1`) is the commit it is asked inside, so a verb it calls JOINS that window and never opens a
/// second.** **A LISTENER BODY STILL NAMES NOTHING**: the entry invokes it at the terminal arm, where *"the
/// triggering commit already passed constraints"*, so what it does is a new question (`D-53`).
function constraintInCommit(store, commit, run) {
  const channel = store !== null && typeof store === 'object' ? store[EXTERNAL_CALL] : undefined;
  if (typeof channel === 'function') return channel(run, commit);
  return run();
}
// ---------------------------------------------------------------------------------------------
// `K-1` `register(store, address, id, constraint) -> Handle`
// ---------------------------------------------------------------------------------------------
export function register(store, address, id, constraint) {
  const kernel = kernelFor(store);

  // CHANNEL (i) — THE KERNEL'S OWN, REFUSED BEFORE THE STORE'S `listen` IS CALLED.
  if (!inDomainAddress(address)) {
    refuse(KC.address,
      'the registration address is outside the store\'s own address domain: an address is an array of '
      + 'string keys or non-negative integer indices, the empty array included',
      []);
  }
  if (!inDomainId(id) || typeof constraint !== 'function') {
    refuse(KC.arg,
      'a registration\'s key is an address and a NON-EMPTY STRING id, and its third argument is a '
      + 'function',
      []);
  }

  // CHANNEL (ii) — THE STORE'S OWN. An in-domain address the store's own listener machinery refuses
  // throws THE STORE'S OWN CODE, in the store's own form, at this call and unconverted.
  //
  // **⟶ AND THE ACT IS THE PRODUCT'S TWO DECLARED HALVES, FROM 2026-10-16 ON `A127`** (`surface.md §2.4`
  // item 9 (f)'s `A127` clause): the combined `on(address, listener)` is MERGED AWAY, so the home entry is
  // minted by `listen` and its function placed by `register` — ONE act, the two members the product
  // declares, and no second spelling of either. `listen` keeps the address-level idempotence the removed
  // route read (`write-and-read.md §6.5` item 12 (c)): a repeat at an address the home already holds mints
  // nothing and answers the entry's own handle.
  //
  // **⟶ AND THE CALLER-SPELLED HANDLE IS A STRING THE KERNEL ITSELF SPELLS**, because the kernel IS a caller
  // of the app's own verbs (`contract.md §2.9` item 2's route: *"the kernel already reaches a store verb … so
  // `K-6` withdraws through the same route rather than inventing a second one"*). **ONE ADDRESS HOLDS ONE
  // KERNEL-OWNED REGISTRATION**, and the address's own spelling is the handle's own spelling — so two pairs at
  // ONE address share ONE store entry, which is the declared consequence `(Y-1)` carries (`contract.md §2.2`
  // item 7; `listen-verb.md §5` item 4).
  // **⟶ `listen` ANSWERS `undefined` AND THE KERNEL ALREADY KNOWS THE HANDLE IT SPELLED** — the caller
  // supplied it, so there is nothing to return (`contract.md §2.2` item 10; `PAR-HL-3`). **SO THE KERNEL SPELLS
  // THE HANDLE ONCE AND USES IT AT BOTH VERBS**, which is exactly the *"handle replaces token in all cases"*
  // rule read at this site (`P: docs/pending.md · P-5`, ruling (3)).
  // **⟶ THE PAIR'S OWN HANDLE IS ONE HANDLE STANDING OVER EVERY ADDRESS THE PAIR HAS, AND THIS IS WHAT MAKES
  // THE PURGE'S REACH TOTAL** (`P: docs/pending.md · (Y-1)`, verbatim: *"THE PURGE TAKES THE OLD HANDLE AND
  // REMOVES EVERY ENTRY THAT HANDLE NAMES, WHEREVER IT STANDS"*; `contract.md §2.9` item 7). **`kernel.handles`
  // HOLDS ONE HANDLE PER PAIR AND NOT ONE PER ADDRESS**, so `K-6` hands that handle to the published
  // `removeListener` ONCE and consults no count of addresses.
  // **⟶ AMENDED 2026-10-24 (`D-29`, verbatim: *"Handle becomes the internal ID"*): THE PAIR'S IDENTITY KEY IS
  // THE `id` ALONE, AND A SECOND REGISTRATION AT THE SAME `id` DOES NOT BEGIN A SECOND PAIR.** The bytes that
  // stood here declared the key to be the tuple `(address, id)` and told the two arms apart BY ADDRESS; **that
  // reading is superseded and stands as text read THROUGH this clause** (`DEF-2026-10-02`). So `kernel.pairs`
  // and `kernel.handles` are keyed by the caller's own `id`, the lookup is one `Map.get`, and
  // `pairRowCarrying`'s function-identity fallback has no work left to do: **the row under this `id` IS the
  // pair this call extends, whatever address it names.**
  const key = id;
  const standing = kernel.pairs.get(key);
  // **THE SET IS THE PAIR'S, NOT THE CALL'S** — this call's address joined to every address the pair already
  // stands at — so the ONE handle is given all N in the single `listen` below and `K-6`'s purge is total in
  // one call (`contract.md §2.2` item 3; `§2.9` item 7; `P: docs/pending.md · (Y-1)`).
  const set = standing === undefined
    ? [address.slice()]
    : (standing.addresses.some((held) => sameAddress(held, address))
      ? standing.addresses
      : [...standing.addresses, address.slice()]);
  // ═══════════════════════════════════════════════════════════════════════════════════════════════
  // **⟶ THE PAIR'S OCCUPANCY OF ITS HOME ENTRY, REPLACED 2026-10-24 — `D-22`, `D-23`, `D-24` AND `D-29`.**
  // ═══════════════════════════════════════════════════════════════════════════════════════════════
  //
  // **THE DEFECT THE THREE DELETED SYMBOLS WERE, NAMED AT ITS OWN BYTES.** `listen` stopped answering a handle
  // on 2026-10-18, so *"adoption"* became impossible and the kernel did the only thing left — **it SPELLED
  // one**: `constraint@` + `JSON.stringify(address)`, armed at `store.listen(home, set)` and
  // `store.register(home, noopListener)`. **That spelling was a SEAM and not a decision** (`strata/decisions.md`
  // `:1411`): a prefix in the same string namespace application handles live in, which the entry then had to
  // EXEMPT WHOLESALE from its *"a listener and a constraint do not share one"* test to let the kernel arm its
  // own inert body — **and that blanket exemption was the door an application caller walked through into an
  // accepted-but-never-delivered registration** (`Q2`'s hazard).
  //
  // **WHAT STANDS NOW, IN FOUR DECLARED PROPERTIES:**
  //   1. **WHAT IT CALLS: `store.listen(id, set)` — the published member, two positions, the handle first.**
  //      **THE CALLER'S OWN `id` IS THE HANDLE** (`D-23`: *"Setting a constraint should expect a handle name to
  //      be used for handle and process/error logging purposes"*; `D-24`: *"The handle becomes the id"*), so the
  //      kernel neither mints a spelling nor derives one from the address: **no kernel-authored identity is
  //      left to reserve** (`D-23`).
  //   2. **WHAT IT DOES WITH THE RETURN: IT ADOPTS IT.** `D-22` makes `listen` answer the handle on success;
  //      this row stores the ANSWERED value as the pair's handle — *"adopted, never minted by the kernel"*,
  //      which is what `kernel-surface.md` declared all along and what `FTS-12.4`'s adoption observable
  //      (`store.listen(addr) === K-1` by reference equality) can now assert instead of failing as
  //      unsatisfiable.
  //   3. **IT MAKES NO SECOND CALL. `store.register(home, noopListener)` IS DELETED, NOT RE-POINTED** — a handle
  //      the registry holds NO function for fires NOTHING, SILENTLY (`surface.md §2.4` rule 1), which is
  //      precisely the noop's whole behaviour, **so the deletion is behaviour-preserving and removes the one
  //      registration that ever needed the exemption** (`D-25`: *"under `D-22` the kernel registers nothing, so
  //      nothing needs to get past the test"*).
  //   4. **THE REGISTRY ENTRY THE `listen` CREATES STAYS RESERVED** and `K-6`'s route (`removeListener`) removes
  //      it whole — so a `removeConstraint` still leaves nothing behind.
  // **⟶ AND THE REGISTRATION'S OWN BODY IS HANDED OVER WITH THE HANDLE — `D-69`, 2026-10-29.**
  //
  // **THE RULING: *"It doesn't need to mint an inert listener body, it already should require a constraint function
  // with a handle"*** (`strata/decisions.md`). **WHAT `D-22` DELETED WAS `store.register(home, noopListener)`** — a
  // SEAM, because it fabricated a LISTENER to make a handle (`:134`'s sentence, unmoved: *"IT MAKES NO SECOND CALL.
  // `store.register(home, noopListener)` IS DELETED, NOT RE-POINTED"*). **WHAT IT SHOULD HAVE BEEN, AND IS NOW, IS
  // THE PAIR'S OWN FUNCTION**: the registration is a HANDLE AND A BODY, the pair has both — `id` (`D-29`) and
  // `constraint` (`D-26`) — **so no second call is made here and no body is invented: the ONE call that stands is
  // handed both members it always had, and the inert spelling does not return.** **THE KIND IS NAMED BECAUSE THE
  // ENTRY ADMITS EITHER** (`delivery.mjs`'s `installRegistrationSeam`, whose own clause states the shape and the two
  // places the kinds part company).
  //
  // **THE CHANNEL IS REACHED AFTER THE STORE VERB AND NOT INSTEAD OF IT**: `listen` writes the home entry — the
  // handle at its address set — and the body fills the SAME registration's other slot, which is what makes
  // `triggered` name this pair's `id` beside the listeners' handles and the pass able to filter it. **A STORE THAT
  // CARRIES NO SUCH CHANNEL ANSWERS NOTHING AND NOTHING IS TOLD** (the device's own absent arm, `state.mjs`'s
  // fallback read at `externalCall`/`bumpMark`): such a store is not this package's product, and its kernel is not
  // this kernel's pass.
  const adopted = store.listen(id, set);
  const install = store[REGISTER_BODY];
  if (typeof install === 'function') install.call(store, id, constraint, 'constraint');
  // **THE PAIR'S OWN IDEMPOTENCE: a second registration under the SAME pair keeps the replaced registration's
  // PLACE and replaces only its function** (`kernel-surface.md §2.1` item 1; `CC-7`). **AND UNDER
  // PURGE-THEN-ADD THE STANDING ARM IS NO LONGER THE ORDINARY PATH** — a re-registration over a held pair
  // purges first (`(O-3)` item (i): *"there is no position to keep, because the old handle's entries are
  // purged before the new one is added"*) — so this branch answers the DIRECT `K-1` call and the idempotence
  // is kept for it alone.
  if (standing === undefined) {
    kernel.pairs.set(key, { addresses: set, id, constraint });
    kernel.handles.set(key, adopted);
  } else {
    // **THE ROW STANDS UNDER ITS OWN KEY AND THE KEY DOES NOT MOVE**, so a re-registration at a pair already
    // held replaces the row's FUNCTION and extends its set, and the identity the row answers by is the one it
    // was keyed with. **AND THE HANDLE THE ROW ADOPTS IS RE-ADOPTED**: a later `K-1` re-lists the same `id` at
    // an extended set, so the value the store answers at THAT act is the pair's standing handle.
    standing.constraint = constraint;
    standing.addresses = set;
    kernel.handles.set(key, adopted);
  }



  // ═══════════════════════════════════════════════════════════════════════════════════════════════
  // THE THIRD STEP — THE REGISTRATION-TIME EVALUATION (`docs/specs/storeroom-native/contract.md §7.3`
  // (b) states 1–3 and its `3-bis` clause of 2026-10-16; `kernel-surface.md §2.1` item 1's third step).
  // ═══════════════════════════════════════════════════════════════════════════════════════════════
  //
  // **WHAT THIS STEP OWES, IN THE RULING'S OWN TERMS: after channels (i) and (ii) are passed and the pair
  // stands in the registry, the kernel EVALUATES THAT ONE CONSTRAINT AGAINST THE STORE'S CURRENT STATE,
  // ONCE, BEFORE THE HANDLE IS RETURNED.** The scope is THAT ONE PAIR and no other: no pass is opened over
  // the registry and no other registered pair is re-evaluated.
  //
  // **⟶ THE THREE STATES, EACH ANSWERED HERE AND AT NO OTHER SITE:**
  //   (i)   the state PASSES → the call returns the handle exactly as before, and nothing else happened;
  //   (ii)  it VIOLATES and NO repair is registered → the registration is REFUSED;
  //   (iii) it VIOLATES and a repair IS registered → THE REPAIR IS ATTEMPTED on the synthetic attempt
  //         `3-bis` (a) declares, and its outcome answers the call as (i) or as (ii).
  //
  // **AND WHAT THE KERNEL HANDS THE SURFACE IS A CODE AND ITS SLOTS, NEVER A SENTENCE.** This module owns
  // no message generator, and `kernel-surface.md §1` item 2 closes its surface at the FIVE `K-1`…`K-5`
  // items with no sixth name — so it imports none, is handed none, and declares no channel to one. The
  // refusal it throws carries `status` (the STORE's member, `A120` (2)) and the `§8.2` row's own slot
  // VALUES, and the surface renders the text through the generator it already holds. **NO `KC` TOKEN IS
  // MINTED:** the synthetic attempt's own terminal token stays inside this module (`registrationRefusal`).
  const refused = registrationEvaluation(kernel, store, address, id, constraint);
  if (refused !== null) {
    // **A REFUSED REGISTRATION LEAVES THE REGISTRY EXACTLY AS IT STOOD** (`§2.1` item 1's sentence, whose
    // regulatory force reaches this third refusing act — `§7.3` (b) state 2's own reading of it): the pair
    // row this call wrote is withdrawn, with its handle and its place in the address's order list.
    withdrawRegistration(kernel, address, id, standing === undefined, adopted);
    throw refused;
  }
  return adopted;
}

/**
 * **WITHDRAWING THE REGISTRY ROW A REFUSED REGISTRATION WROTE** — `kernel-surface.md §2.1` item 1: *"a
 * refused registration leaves the registry exactly as it stood"*, read at `docs/specs/storeroom-native/
 * contract.md §7.3` (b) state 2 by that item's own clause (*"the sentence's `2` counts `KC` CHANNELS and
 * the registration-time refusal is a THIRD REFUSING ACT carrying no `KC` token, so the sentence's FIGURE IS
 * UNMOVED while its regulatory force (no entry on a refusal) reaches this third act"*).
 *
 * **WHAT IT UNDOES IS THIS CALL'S OWN WRITE AND NOTHING ELSE**, which is why the prior-standing fact is
 * passed in: on the FRESH arm the pair row, its handle and its address-list entry all go; on the
 * REPLACEMENT arm (a second `register` under a pair that already stood) the row's own POSITION and handle
 * are left exactly as they were — the pair's idempotence rule (`CC-7`) puts the replaced registration's
 * position back by never moving it.
 */
function withdrawRegistration(kernel, address, id, fresh, home) {
  if (!fresh) return;
  // **⟶ THE KERNEL'S OWN ROWS GO WITH THE HANDLE — `U-STOREROOM-HELD-LISTENER-IDENTITY`.** The `byAddress`
  // reads and its delete that stood here are DELETED WITH THE INDEX (`P: docs/pending.md · R-B3`), and the
  // address's row is now one of the pair's own N addresses.
  // **⟶ THE KEY IS THE PAIR THIS CALL NAMED — `(address, id)`** (`contract.md §5.1`'s `S-KEY`), so a refused
  // registration withdraws THIS call's own row and never the row of a pair standing at another address under
  // the same `id`. `remove`, below, matches the row by its own `addresses` member, so the two spellings agree.
  const key = id;
  kernel.pairs.delete(key);
  kernel.handles.delete(key);
  // **⟶ AND THE SENTENCE THAT STOOD HERE — *"no clause of this unit declares a kernel-side withdrawal of
  // it"* — IS FALSIFIED AND IS REPLACED, NOT AMENDED** (`P: docs/pending.md · R-B2`, verbatim: *"the new item
  // DOES withdraw the store-side home entry"*; `contract.md §2.9` item 1; `remove-member.md §1` item 2):
  // **`K-6` IS THE KERNEL-SIDE WITHDRAWAL**, and it reaches the app's own published `removeListener` rather
  // than a store-side private act. **A REFUSED REGISTRATION WITHDRAWS THE ADDRESS'S HOME ENTRY THROUGH THAT
  // ROUTE**, which is the one route the kernel has for it (`remove-member.md §2` item 2).
  try {
    // **A FAILED WITHDRAWAL IS SWALLOWED HERE AND ONLY HERE**: this frame runs on a refusal path whose own
    // throwable is already the answer the caller must see, so a second throwable would replace the declared
    // refusal with an undeclared one. **THE STATE IT LEAVES IS `(D-vi)`'S — the pair's REGISTRY standing and
    // its STORE standing are two facts** (`contract.md §2.8` item 5).
    remove(kernel.store, { address: [address], id });
  } catch {
    // declared silence: the refusal being carried is the caller's answer
  }
  return home;
}

/**
 * **THE REGISTRATION-TIME EVALUATION, AT ITS ONE SITE** (`docs/specs/storeroom-native/contract.md §7.3`
 * (b) and its `3-bis` clause of 2026-10-16; `kernel-surface.md §2.1` item 1's third step and `§2.3` item
 * 1's clause of 2026-10-17). It answers `null` on state 1 and on state 3's passing arm, and **the refusal
 * to throw** on state 2 and on state 3's failing one.
 *
 * **THE EVALUATION'S CONTEXT IS `§2.3` ITEM 1'S CLAUSE OF 2026-10-17, MEMBER FOR MEMBER, AND IT IS THE
 * SAME FIVE MEMBERS AS AT A LANDING** — `address` the pair's own; `tier` ABSENT, spelled `null`; `value`
 * THE STORE'S CURRENT VALUE AT THE PAIR'S ADDRESS, READ AND NOT LANDED; `attempt` the synthetic attempt's
 * `AttemptRef` on state 3 and `null` on states 1/2; `op` ABSENT, spelled `null`. **A SIXTH MEMBER IS
 * REFUSED BY NAME** (`5 + 1 = 6` is refused at that item's (6)), and both `null`s are THAT CLAUSE's own
 * spellings of an absence inside a closed record, taken from the `RollbackStep.checkpoint` precedent, and
 * are not tokens minted here.
 *
 * **THE `value` IS OBTAINED BY THE STORE'S OWN `read` AT THE PAIR'S ADDRESS WITH THE TIER ARGUMENT
 * OMITTED** — the zero-tier call — **and where that read REFUSES `AddressNotFound` the member carries
 * `undefined`**, which is that clause's (3) (e) arm. **NO `null` IS MINTED FOR IT** (`DD-12` forbids a
 * READ answering one) and no `AddressNotFound` code is put in a `Value` slot: the fresh-pair outcome is
 * the CALLER'S OWN BODY's answer to absence, and no clause decides which a given body is.
 *
 * **⟶ AND THE BODY'S OWN THROW IS NOT CONVERTED HERE.** A throw out of the constraint body at this instant
 * SURFACES AS ITSELF (`fail-surface.md §1.1` item 5, at `kernel-surface.md §2.3` item 1's clause of
 * 2026-10-17): not re-shaped into this module's form, not wrapped, and carrying no `KC` token. So the
 * invocation below is NOT wrapped — a throwing body reaches the caller as the very value it threw.
 */
function registrationEvaluation(kernel, store, address, id, constraint) {
  // **⟶ THE REGISTRATION'S OWN COMMIT AND ITS OWN ONE LIST — `D-53`, 2026-10-28.** A registration is a commit
  // (`addConstraint`'s and `constraintOn`'s brackets open one, and `3-bis` (a) already declares *"the
  // `CommitRecord` of the registration act"*), so the record is built FIRST and the list beside it: **a verb the
  // body calls is part of this commit, its entries are this list's entries, and the synthetic attempt a repair
  // needs (state `3`) is an attempt of this same commit** — it appends to this list and mints no second one.
  const commitRecord = { attempt: null, op: null, triggered: [], pending: [] };
  const commitLog = [];
  // **⟶ AMENDED 2026-10-26 (`DEF-S`; the architect's ruling, verbatim: *"Expand the returned error set for
  // both S/N"*): THE BODY'S THROW IS MARKED AT THE FRAME THAT CAUGHT IT, and no attempt stands at this
  // instant (`null`), so the mark carries the `[]` its clause declares. **THE THROWABLE'S IDENTITY IS
  // UNMOVED HERE** — a kernel-level caller still meets the very value the body threw — while the entry's
  // `registrationCrossing` converts A MARKED VALUE ONLY into this surface's one failure form, and an
  // unmarked throw is still the caller's own (`markBodyThrow`, `kernel-foundations.mjs`).
  let outcome;
  const context = registrationContext(store, address, null);
  // **⟶ AND THE BODY IS INVOKED WITH THE REGISTRATION'S COMMIT NAMED — `D-53`, 2026-10-28.** The clause this
  // replaces read *"the body is invoked with nothing named … so a verb it calls OPENS ITS OWN COMMIT"*
  // (`D-45`, `D-46` item `1`), and **`D-53`'s invariant reverses it for constraints: *"Constraints/Repairs should
  // always use the same commit"*** — a constraint body is asked, and the check it is asked by is this commit.
  // **THE FRAME IS PUSHED FOR EXACTLY THE INVOCATION AND POPPED IN A `finally`**, so a nested write appends to this
  // registration's list and a throwable leaves no frame standing.
  // **THE CONTEXT IS BUILT ABOVE THE INVOCATION** (`kernel-surface.md §2.3` item 1), so the store read the context
  // owes is this verb's own act and not the body's.
  enterCommitFrame(kernel, commitLog);
  try {
    outcome = constraintInCommit(store, commitRecord, () => constraint(context));
  } catch (body) {
    // **AND THE MARK CARRIES THIS COMMIT'S LIST** (`markBodyThrow`'s second slot): a registration-time body that
    // threw after its own verbs appended carries those entries to the crossing, where `[]` used to be.
    throw markBodyThrow(body, address, commitLog);
  } finally {
    leaveCommitFrame(kernel);
  }
  // THE OUTCOME IS `PAR-C-5`'S CLOSED THREE-ARM SET, read as the landing pass reads it: `true` is the pass
  // arm; an object carrying `message` is the violation arm (its `repair`, where present, the repair the
  // caller registered); a value outside the three arms is READ AS the `{message}` arm (`VA-11`) and never as
  // an arm of its own. **A REPAIR THE OUTCOME DOES NOT CARRY IS NO REPAIR REGISTERED FOR THE PAIR.**
  if (outcome === true) return null;
  const repair = outcome !== null && typeof outcome === 'object' && 'message' in outcome
    && 'repair' in outcome && typeof outcome.repair === 'function'
    ? outcome.repair
    : null;
  // STATE 2 — THE STATE VIOLATES IT AND NO REPAIR IS REGISTERED. Nothing is attempted and no attempt is
  // opened; the refusal carries the store's code and the row's own slots.
  if (repair === null) return registrationRefusal(address, id, commitLog);
  // STATE 3 — THE REPAIR IS ATTEMPTED, on the synthetic attempt `3-bis` (a) declares — **the attempt of THIS
  // commit, holding THIS list by reference** (`D-53`).
  return registrationAttempt(kernel, store, { address, id, repair, log: commitLog, commit: commitRecord });
}

/// **THE FIVE-MEMBER EVALUATION CONTEXT** (`kernel-surface.md §2.3` item 1's clause of 2026-10-17), built
/// at ONE site so states 1, 2 and 3 hand the caller's body the SAME record and only `attempt` moves:
/// `null` on states 1 and 2, the synthetic attempt's `AttemptRef` on state 3.
function registrationContext(store, address, attemptRef) {
  return {
    address: address.slice(),
    // `tier` — ABSENT, and `op` — ABSENT: the two members carrying the landing's own absence, spelled
    // `null` on that clause's (2) and (5).
    tier: null,
    // `value` — READ, not landed, and `undefined` at an address holding nothing (that clause's (3) (e)).
    value: readCurrent(store, address),
    attempt: attemptRef,
    op: null,
  };
}

/// The store's current value at an address, read NOT landed: the zero-tier call whose tier argument is
/// OMITTED, and `undefined` where that read refuses.
function readCurrent(store, address) {
  try {
    return store.read(address);
  } catch (refused) {
    return undefined;
  }
}

/**
 * **THE SIX-MEMBER `RepairContext` THE REPAIR IS HANDED AT REGISTRATION** (`kernel-surface.md §2.3` item
 * 2's shape, its sixth member `pending: Handle[]` added 2026-10-15; `surface.md §2.11` clause 6, the one
 * home of the architect's ruling that a repair *"IS PASSED THE COMMIT IT IS PART OF"*).
 *
 * **THE REPAIR'S CONTEXT IS NOT THE CONSTRAINT'S CONTEXT, AND THE TWO ARE NOT INTERCHANGEABLE**: the
 * constraint receives the FIVE-member `AttemptContext` and the repair the SIX-member `RepairContext`, whose
 * extra member is the commit's own `pending` — *"so that they can make their own write call use that
 * commit"*. **THE SYNTHETIC ATTEMPT'S OWN `commit` MEMBER IS WHAT THIS SLOT CARRIES** (`3-bis` (a): *"the
 * `CommitRecord` of the registration act"*), handed as a FRESH LIST the way the landing instant hands it, so
 * the record's member is never aliased and a repair that mutated its context's list moves nothing on the
 * commit.
 *
 * **AND THE ABSENCE AT THIS INSTANT IS SPELLED BY THE `AttemptContext`'S OWN CLAUSE, NOT MINTED HERE:** there
 * is no landing, so `op` is `null` (that clause's (5)) and `tier` is `null` (its (2)) — the two absences the
 * `RollbackStep.checkpoint` precedent already fixes — while `value` is the store's CURRENT value at the
 * pair's address, read and not landed (its (3)). **`id` IS THE PAIR'S OWN**, which the constraint's context
 * does not carry at all, the repair's shape declaring it.
 */
function registrationRepairContext(store, address, id, commitRecord) {
  return {
    address: address.slice(),
    id,
    // `tier` — ABSENT, spelled `null`; `value` — READ, not landed; `op` — ABSENT, spelled `null`.
    tier: null,
    value: readCurrent(store, address),
    op: null,
    // THE COMMIT THE REPAIR IS PART OF — a FRESH LIST, never the record's own member (`§2.3` item 2).
    pending: Array.isArray(commitRecord.pending) ? commitRecord.pending.slice() : [],
  };
}

/**
 * **STATE 3 — THE SYNTHETIC ATTEMPT AND THE REPAIR IT CARRIES** (`docs/specs/storeroom-native/contract.md
 * §7.3` (b) `3-bis` (a)–(f); `attempt-lifecycle.md §2.4` items 1, 3, 4 arm (b)).
 *
 * **THE ATTEMPT'S RECORD IS ITEM 1's NINE MEMBERS UNCHANGED — NO TENTH MEMBER IS MINTED AND NO MEMBER'S
 * DOMAIN MOVES:** `ref`, `commit`, `ops`, `log`, `ran`, `appliedRepairs`, `open`, `rollback`, `checkpoint`.
 * **ITS `address` IS THE PAIR'S OWN**, **`ITS `checkpoint` BEGINS `null`*** — that member's declared `null`
 * arm, because no landing at that address has yet left it valid for THIS attempt — and **its `ref` is a
 * kernel-minted `AttemptRef` unique within the instance**. **Its `log` is a real `LogEntry[]` carrying this
 * kernel's own entries — each at its own index, which IS its ordinal since `D-65` removed the member
 * (2026-10-28)** — and the `constraint-check` and `repair-run` entries arm (b) appends stand in
 * it. **IT IS TERMINAL-AWARE ON BOTH ARMS**: it reaches `PASSED` or `FAILING` and closes, and no
 * registration leaves an open attempt in the registry.
 *
 * **THE OP THE REPAIR LANDS IS HELD BY THIS ATTEMPT AND NOTHING ELSE** — `3-bis` (a)'s selection of the
 * synthetic branch, so principle (1) (*"a repair's op is an attempt's op"*) still binds and no op is
 * admitted outside one.
 *
 * **AND ITS OP LANDS DURABLY** (`3-bis` (f)): the repair's edit goes through the store's OWN verbs, its
 * `op` is a real `JournalOp` in the store's own journal, readable back through every read verb at that
 * address, and it stands after the registration returns. **THIS IS NOT A DRY RUN**, and no clause of that
 * contract may be read as one. **ON SUCCESS NO LOG CROSSES** (`3-bis` (c), under `A135` (1)'s
 * failure-only bubbling): the caller receives the identity ALONE, and the repair's outcome is carried by
 * this attempt's own `log` and `ops` — the two carriers that clause fixes.
 *
 * **ON FAILURE THE REGISTRATION IS REFUSED** (`3-bis` (d)'s arms (d)/(e)/(f)): the store's
 * `ConstraintListInvalid` is answered in the SAME form and with the SAME THREE SLOTS as state 2's. The
 * synthetic attempt's `KC-4`/`KC-5`/`KC-6` **stays inside this module** and reaches no caller, because the
 * caller's act is the registration and it is the registration that is refused (`§7.3` (e)'s re-reading).
 */
function registrationAttempt(kernel, store, pair) {
  const address = pair.address;
  // **THE SYNTHETIC ATTEMPT'S OWN ROW IDENTITY IS THE PAIR — `(address, id)`** (`contract.md §5.1`'s
  // `S-KEY`). **IT IS READ OFF THE REGISTRY, NOT MINTED HERE**: the key values stand in `kernel.pairs` and in
  // `attempt.ran`/`appliedRepairs`, and every reader below compares them BY IDENTITY (`includes`), so the
  // token this attempt carries must be THE ROW'S OWN KEY OBJECT and a second, equal-looking tuple would be a
  // different identity. The pair standing at this address IS registered (the caller's `K-1` completed), and
  // where it is not, the freshly derived key is the one the next `K-1` at the same array will answer.
  const row = pairRowAt(kernel, address, pair.id);
  // **⟶ AND THE KEY IS THE PAIR'S `id` FROM 2026-10-24** (`D-29`): the registry is keyed by the `id` alone, so
  // a row that stands answers its own key — which IS its `id` — and a row that does not is named by the same
  // string. **THE `pairKey` TUPLE IS DELETED** and with it the note that *"a second, equal-looking tuple would
  // be a different identity"*: a string key compares by VALUE, so the identity the attempt carries and the
  // identity the next `K-1` answers are the same key whether or not a row stands.
  const key = row === null ? pair.id : row.key;
  kernel.attempts += 1;
  const attempt = {
    ref: { id: `attempt-${kernel.attempts}` },
    store,
    address: address.slice(),
    tier: null,
    value: undefined,
    // `commit` — THE REGISTRATION ACT'S OWN `CommitRecord` (`3-bis` (a)): this kernel's four members, with
    // no write's op and no write's triggered set, because a registration lands no `K-2` of its own. **⟶ IT IS THE
    // RECORD THE EVALUATION ALREADY BUILT AND NAMED (`D-53`), not a second one**, so the commit the constraint
    // body was asked inside and the commit its repair joins are ONE.
    commit: pair.commit,
    write: null,
    ops: [],
    // **AND THE LIST IS THAT COMMIT'S OWN, BY REFERENCE** (`D-53`).
    log: pair.log,
    ran: [],
    appliedRepairs: [],
    rollback: [],
    checkpoint: null,
    checkedOff: [],
    status: 'open',
    report: null,
  };

  // ARM (b) VERBATIM: the `constraint-check` entry and the `repair-run` entry are appended, the repair runs
  // through the caller's own verb, and the op its `{ok: true, op}` return names is added to `ops` while its
  // pair is appended to BOTH `ran` and `appliedRepairs` (`3-bis` (b): the pair JOINS both members — of the
  // SYNTHETIC attempt, and of no other). **THE PAIR ENTERS `ran` BEFORE THE REPAIR RUNS**, which is that
  // arm's own ordering and is what makes the repeat arms reachable at the re-run below.
  // **⟶ AND THE TWO ENTRIES ARE NAMED BY THE ITERATION — `D-53`'s first ruling.** This arm names no OP (`3-bis`
  // (a)'s synthetic attempt has landed nothing when these are appended): the pair stands, the op is the declared
  // `null` absence, and the `repair-run` entry's `opId` is rewritten below where the repair lands one.
  append(attempt, 'constraint-check', { pair, op: null }, `the evaluation of ${pair.id}`);
  appendOwn(attempt.ran, key);
  append(attempt, 'repair-run', { pair, op: null }, 'the pair\'s repair was attempted at registration');

  let result;
  const repairContext = registrationRepairContext(store, address, pair.id, attempt.commit);
  try {
    // **⟶ RE-DERIVED 2026-10-27 — STATE `3`'S REPAIR NAMES THE SYNTHETIC ATTEMPT'S COMMIT AND IS NO LONGER
    // MARKED AS AN OWNER OF ITS OWN (`D-46` item `2`).** `D-45` invoked it through the entry's `externalCall`,
    // so the write it made OPENED a second commit and the registration act's own commit record no longer
    // described the repair it performed. **THE RULING: *"A constraint's repair needs to stay as part of the same
    // commit so that it can be tracked as part of the commit process"*** — so `repairInCommit` hands the channel
    // **the record `3-bis` (a) declares as *"the `CommitRecord` of the registration act"***, **which is the very
    // object `registrationRepairContext` copy-carries at the repair's `pending` member**: a repair that supplies
    // that context at `write`'s fourth position names the same commit by its own hand, and the two spellings
    // cannot disagree (the entry's position wins where it is supplied, and the invocation's name is the fallback
    // where it is not — `state.mjs`'s `openCommit`).
    // **AND THE FRAME STANDS FOR THIS INVOCATION TOO (`D-53`)**: the repair's verbs append to this commit's list.
    enterCommitFrame(kernel, attempt.log);
    result = repairInCommit(store, attempt.commit, () => pair.repair(repairContext));
  } catch (body) {
    // A REPAIR WHOSE BODY THROWS IS A FAILED REPAIR AND THE REGISTRATION IS REFUSED — the caller's act is
    // the registration, so the refusal is this module's one form (`3-bis` (d); the `KC` boundary at (e)).
    // **THE BODY'S THROWABLE IS NOT CONVERTED INTO A STORE FORM AND IS NOT REACHED BY THE CALLER HERE**: it
    // is caught so the attempt can close and the registration can be refused in the declared form; a drive
    // that expected the body's own value out of `addConstraint` has read a route no clause declares.
    closeRegistrationAttempt(kernel, attempt);
    return registrationRefusal(address, pair.id, attempt.log);
  } finally {
    leaveCommitFrame(kernel);
  }

  const ok = result !== null && typeof result === 'object' && result.ok === true;
  const produced = ok ? landedOp(attempt, result, null) : null;
  if (produced === null) {
    // ARM (d) — THE REPAIR PRODUCED NO OP: `{ok: false, message}`, an outside-form return, or an
    // `ok === true` return whose `op` is absent, `undefined` or not the one it landed.
    closeRegistrationAttempt(kernel, attempt);
    return registrationRefusal(address, pair.id, attempt.log);
  }

  appendOwn(attempt.ops, produced);
  appendOwn(attempt.appliedRepairs, key);
  const entry = attempt.log[attempt.log.length - 1];
  entry.opId = produced.opId;
  entry.message = `the repair ${pair.id} landed ${produced.opId}`;

  // THE RE-RUN — `3-bis` (d)'s arms (e)/(f) and `3-bis` (e)'s ordinary landing rules: the repair's op
  // LANDED, so the pairs registered at ITS OWN landing's address are evaluated by the ordinary pass
  // (`kernel-surface.md §2.3` item 1), in first-registration order, against THAT op.
  const failed = registrationRerun(kernel, attempt, produced, key);
  if (failed !== null) {
    closeRegistrationAttempt(kernel, attempt);
    return registrationRefusal(address, pair.id, attempt.log);
  }
  // THE PASSING ARM: `PASSED` → `CLOSED` and the registration STANDS. **NO LOG CROSSES**, and the repair's
  // edit STANDS in the store — the side effect the architect's trust clause licenses (`3-bis` (f)).
  closeRegistrationAttempt(kernel, attempt, 'passed');
  return null;
}

/// **THE SYNTHETIC ATTEMPT'S RE-RUN** — every pair standing at the attempt's own address, evaluated once
/// against the repair's own op (`attempt-lifecycle.md §2.4` item 5 (iv)'s evaluated set, which the
/// registration instant neither widens nor displaces). Answers `null` where the re-run passes and the arm's
/// token where it does not.
///
/// **THE ARM IS READ OFF THE PAIR THAT FAILED AND OFF NOTHING ELSE** (item 4's disjointness rule): the
/// pair under repair is IN `ran` — arm (b) wrote it — and arm (b) has just put it in `appliedRepairs`, so a
/// repeat by the repair's OWN edit reaches `(e)`; a pair IN `ran` and NOT in `appliedRepairs` reaches
/// `(f)`. **`(c)` is unreachable here**, the pair's own function having already run at this instant.
function registrationRerun(kernel, attempt, produced, key) {
  // **⟶ THE PAIR LIST IS READ OFF `attempt.address` AND NOT OFF AN INDEX** (`P: docs/pending.md · R-B3`,
  // verbatim: *"Delete byAddress — attempt.address already carries it"*; `contract.md §2.8` item 2 item (1)).
  // **THE ADDRESS IS IN HAND ONE FRAME ABOVE the `byAddress.get` call that stood here**, and the store→kernel
  // channel is `record` alone (`A117` (D6) forbids a fifth member).
  //
  // **AND THE SELECTION IS A PREFIX MATCH ON A PAIR'S OWN ADDRESS, AS OF 2026-10-29 (`D-56`).** `RCA-8(g)`
  // ANNOTATE-BESIDE: **the sentence that stood here read** *"the pass's set is the pairs WHOSE OWN ADDRESS IS THE
  // ATTEMPT'S, which preserves `attempt-lifecycle.md §2.4` item 5 (iv)'s exact-address rule rather than widening
  // it to the store's prefix-selected `triggered`"* (`P: docs/pending.md · (AA-1)`; `contract.md §2.8` item 1) —
  // **and `D-56` supersedes that rule**: *"A listener/constraint should fire when the descendants of its targeted
  // address node change, because the descendants become part of the object that is read from that address"*.
  // **SO THE SET HERE IS `pairsAtAddress`'s AND MOVES WITH IT** — the pairs whose own address is a PREFIX of the
  // attempt's, equality included — because a registration's re-run is not a second kind of pass and mints no
  // second membership rule. **THE WIDENING IS THE FUNCTION'S AND NOT THIS MODULE'S**: the call below is byte-for-
  // byte what it was, and the registration instant inherits `D-56` by CALLING the one selection function.
  // **EACH ELEMENT IS EVALUATED AT MOST ONCE**, so a pair standing at N addresses whose two addresses are both
  // prefixes of the act is reached once (`contract.md §2.6` item 5).
  //
  // **⟶ AND THE SET HERE IS HANDED THE REPAIR'S OWN OP — `D-66`, 2026-10-29.** **`D-56` COULD SAY THE CALL BELOW WAS
  // BYTE-FOR-BYTE WHAT IT WAS BECAUSE ITS WIDENING WAS A PROPERTY OF THE ADDRESS ALONE** (*"the registration
  // instant inherits `D-56` by CALLING the one selection function"*, the sentence above). **`D-66`'s criterion is
  // TOUCHED, which is a property of THE ACT'S KIND AND THE VALUE IT CARRIED**, and the act whose change this
  // re-run judges is **the repair's** — `produced`, the op the repair's own edit landed and which every context
  // below already carries as `op`. **SO ONE ARGUMENT IS ADDED AND NOT ONE RULE**: the membership test is still
  // `pairsAtAddress`'s alone, the registration's re-run still mints no second kind of pass, and a repair that
  // wrote `{c, d}` at the attempt's address now asks the pairs standing at `['…','c']` and `['…','d']` as `D-66`
  // requires. **THE SNAPSHOT'S OWN PROPERTIES ARE UNMOVED** (`CX-12`; `HL-8` item 6): one materialisation, frozen
  // here, one registration order.
  // **⟶ AND THE SET IS THE STORE'S OWN `triggered`, FILTERED — `D-69`, 2026-10-29.** The bytes that stood here read
  // `pairsAtAddress(kernel, attempt.address, produced)`, so the registration's re-run COMPUTED A REACH of its own
  // out of the repair's op — the same reach the store had already computed for the act, in the one place the
  // per-tier versions live (`D-67`: *"the store computes the reach of an act, and the kernel computed a second
  // one"*). **IT NO LONGER COMPUTES ONE**: `pairsTriggered` asks a store-returned list which of the registry's rows
  // it names, and `D-56`'s and `D-66`'s predicates stand in `src/store.rs`.
  //
  // **AND THE LIST THIS INSTANT HAS IS `pending`'S OWN — THE SET THE STORE NAMED FOR THE PAIR THE REGISTRATION
  // EVALUATED — BECAUSE A REGISTRATION LANDS NO ACT OF ITS OWN.** `3-bis` (a) declares *"the `CommitRecord` of the
  // registration act"*, and that record carries no write's `triggered` set (*"with no write's op and no write's
  // triggered set, because a registration lands no `K-2` of its own"*, `registrationAttempt`'s own clause). **SO
  // THE RE-RUN'S SET IS THE ONE PAIR THIS INSTANT WAS EVER ABOUT**: `register`'s third step declares its scope
  // once — *"The scope is THAT ONE PAIR and no other: no pass is opened over the registry and no other registered
  // pair is re-evaluated"* — **and a re-run of a registration is not a pass over the registry.** The pair is named
  // by its OWN REGISTRY KEY, the identity `3-bis` (a) reads off the row, and no second membership rule is minted.
  const list = [key];
  for (const evaluated of list) {
    const pair = kernel.pairs.get(evaluated);
    if (pair === undefined) continue;
    let outcome;
    const context = {
      address: attempt.address.slice(),
      tier: produced.tier === undefined ? null : produced.tier,
      value: produced.after === undefined ? undefined : produced.after.value,
      attempt: attempt.ref,
      op: produced,
    };
    // **⟶ AND THE RE-RUN'S BODIES ARE OF THIS COMMIT TOO — `D-53`.** The clause this replaces read *"this body is
    // invoked with nothing named too … the third of the three that invoke a caller-authored constraint body"*
    // (`D-45`): **the three frames name the attempt's commit now, and the registration's re-run names the same
    // one its repair joined.** The context is built ABOVE the invocation.
    enterCommitFrame(kernel, attempt.log);
    try {
      outcome = constraintInCommit(attempt.store, attempt.commit, () => pair.constraint(context));
    } catch (body) {
      // **⟶ ADDED 2026-10-26 (`DEF-S`, the same ruling): a body thrown at the synthetic attempt's re-run is
      // marked at this frame too — the mark carries the attempt's own log and address, and the entry's
      // crossing converts a marked value only** (`markBodyThrow`, `kernel-foundations.mjs`).
      // **⟶ AND NEITHER THIS FRAME NOR THE REGISTRATION-TIME EVALUATION ABOVE APPENDS A THROWABLE ENTRY, 2026-10-28
      // — `DEF-AK`'s RECORDED ARM IS THE LANDING'S.** The re-run appends no `constraint-check` entry for the
      // evaluation it threw in (the pair's own function ran at the registration instant), and no `outcome`
      // entry stands because this throwable propagates before any terminal act — so there is no entry of the
      // closed four this frame could honestly extend, and no fifth `kind` is minted for it. The registration
      // instant's `log` is `surface.md §2.5` item 4's declared `[]` and stays it (`DEF-S`'s own cell reads it).
      throw markBodyThrow(body, attempt.address, attempt.log);
    } finally {
      leaveCommitFrame(kernel);
    }
    if (outcome === true) continue;
    attempt.terminalArm = attempt.appliedRepairs.includes(key) ? 'KC-5' : 'KC-6';
    return attempt.terminalArm;
  }
  return null;
}

/**
 * **THE REFUSAL THE REGISTRATION ANSWERS — `ConstraintRefusedAtRegistration` WITH ITS `§8.2`-GENERATED
 * MESSAGE — COMPOSED HERE AS A CODE AND ITS SLOTS, AND RENDERED BY THE SURFACE.**
 *
 * **⟶ AND THE CODE MOVES FROM `ConstraintListInvalid` TO THE SET'S NINETEENTH MEMBER, 2026-10-26 — `DEF-N`,
 * ON THE ARCHITECT'S RULING, VERBATIM: *"Expand the returned error set for both S/N"*.** **THE DEFECT THE
 * MOVE CLOSES, MEASURED: a pair that is `{address: ['a'], id: 'c1'}` — an address that is a segment array and
 * an id that is a string — was refused with `'a' is not a valid constraint entry in 'constraints', a
 * constraint entry is an address and an id, and the address is a segment array`, and `ConstraintListInvalid`
 * is the STORE's malformed-ENTRY code (`docs/specs/storeroom-native/contract.md §8.1` #16 and `§8.2`'s row).
 * SO THE SHAPE CODE NAMED A SHAPE THAT IS FINE.** **THE SET GREW BY ONE ARM AND `ConstraintListInvalid`
 * KEEPS ITS OWN TRIGGER — the malformed element at create or at load — AND ITS OWN SENTENCE, unmoved**
 * (`§8.1` #16; `§8.2`). **THE VERDICT IS THE ARM: the registration evaluation answered non-`true` and the
 * body stands against the store's current state** — states (ii) and (β) of
 * `docs/specs/storeroom-js/surface.md §2.12` item 3, at the ADD route and at `constraintOn`'s re-enable
 * alike, since the enable arm re-registers the entry's own element through this same `K-1`.
 *
 * **⟶ THIS IS THE ROUTE THE ARCHITECT SETTLED, AND IT IS NOT A MESSAGE FROM A SECOND SOURCE.** `DD-52`
 * forbids a code's message being produced from a second source, and `§8.2`'s one row declares the slots
 * this instant supplies: **`<CONTAINER>` the pair's own list name, `constraints`**; and **`<SEGMENT>` the
 * ADDED PAIR's `address` spelling, joined by `/`** — the pair's OWN address and not a failing element's,
 * because at this instant the entry is WELL-FORMED and the pair is SUBMITTED rather than found wrong.
 * (`<KEYLIST>`, the row's third slot, is the added pair's members present; no slot of it is asserted here,
 * `§8.2` clause 3 declaring that the sentence the slots make is asserted by NO clause of that contract.)
 *
 * **THE FIXED PHRASE *"is not a valid constraint entry in"* IS THE SHAPE ROW'S AND IS NOT RENDERED HERE FROM
 * 2026-10-26 ON** — it stands at `§8.2`'s `ConstraintListInvalid` row, unmoved, and it describes an entry
 * that failed its own validity check; **a WELL-FORMED pair whose FUNCTION DID NOT PASS is the other arm and
 * takes its own row** (`§8.2`'s `ConstraintRefusedAtRegistration` row, whose fixed phrase reads *"was
 * refused by its own constraint at registration in"*). **A HAND-AUTHORED REGISTRATION MESSAGE IS A FAIL OF
 * `P-TP-9` AND NONE STANDS HERE**: not a byte of either text is written in this module, and the sentence is
 * produced by the store's own generator at the surface's existing `errorMessage` path.
 *
 * **THE VALUE CARRIES THIS MODULE'S OWN MARK** (`KERNEL_REFUSAL`) so the surface can tell it from a
 * caller's throw, and the mark is set HERE — in the frame that BUILT the value — and never by a test over
 * members. **A CALLER'S OWN THROWN VALUE STILL SURFACES AS ITSELF**: the 2026-10-17 forgery fix's whole
 * point, and the five shapes are re-probed with this arm in place.
 */
function registrationRefusal(address, id, log) {
  return {
    status: 'ConstraintRefusedAtRegistration',
    segment: address.map((segment) => String(segment)).join('/'),
    container: 'constraints',
    id,
    log: Array.isArray(log) ? log : [],
    [KERNEL_REFUSAL]: true,
  };
}

/// **THE SYNTHETIC ATTEMPT'S TERMINAL ACT — `PASSED` OR `FAILING`, AND `CLOSED` FROM THOSE TWO AND FROM
/// NOWHERE ELSE** (`attempt-lifecycle.md §2.4` item 3). It reaches neither the per-op rollback composition
/// nor the delivery seam: **the registration instant opens no `K-2`, delivers no listener and composes no
/// rollback** — the repair's edit STANDS on the passing arm (`3-bis` (f)), and a failed repair's own state
/// is left where the store's own verb left it (`3-bis` (d): the store's state is left where the composition
/// restored it, which for an attempt with no rollback composed is the state the verb produced).
function closeRegistrationAttempt(kernel, attempt, outcome = 'failed') {
  attempt.status = 'closed';
  const report = {
    attempt: attempt.ref,
    outcome,
    ops: attempt.ops.slice(),
    log: attempt.log,
    rollback: [],
  };
  attempt.report = report;
  // **THE TWO RECORDS ARE THE ATTEMPT'S OWN INSTANCE'S** (`D-30`): the caller's `store` is the one this
  // synthetic attempt was opened against, and its kernel is IN HAND ONE FRAME ABOVE, so no second position
  // and no second lookup is taken.
  kernel.closed.set(attempt.ref.id, report);
  // **⟶ AND THE REGISTRATION'S COMMIT DROPS ITS LOG ON CLOSE TOO — `D-58`, 2026-10-28.** The synthetic attempt
  // resolves or rejects here, and the list was handed off on the refusing arm by the refusal the caller builds
  // from `attempt.log` (the attempt object, not this record). **What the store retains is the outcome, the ops
  // and the reversal's record; what the client was handed it lets go**, exactly as the landing pass's own arm
  // does (`kernel-attempt.mjs`'s handoff).
  dropHandoff(kernel, report);
  kernel.live.delete(attempt.ref.id);
  return report;
}


/// **⟶ DELETED 2026-10-24 (`D-22`, verbatim: *"Discard the noop prefix"*) — THREE MODULE-PRIVATE SYMBOLS, AND
/// THE KERNEL'S SIX-EXPORT CENSUS IS UNCHANGED BECAUSE NONE OF THEM WAS EVER AN EXPORT.**
///
/// **`noopListener` (`function noopListener() {}`), `KERNEL_HANDLE_PREFIX` (`'constraint@'`) and
/// `noopHandleFor(address)` (`constraint@` + `JSON.stringify(address)`) ARE GONE, WITH THEIR DOC BLOCKS.**
/// The bytes that stood here declared *"the store holds ONE registration per address, and its `register`
/// takes a function"* and spelled the kernel's own reserved handle; **they stand as the reading they carried
/// and are read THROUGH this clause** (`DEF-2026-10-02`: no whole-file rewrite).
///
/// **WHAT REPLACES EACH, ONE BY ONE** (`docs/L1/surface-deltas.md` §4.1):
///   * **`noopListener` → NOTHING.** The kernel registers no body: a handle the registry holds **no function**
///     for **fires nothing, silently** (`surface.md §2.4` rule 1), which is the noop's whole behaviour, so
///     `K-1`'s `store.register` call is DELETED and the inert body has no subject.
///   * **`KERNEL_HANDLE_PREFIX` → NOTHING.** There is no kernel-authored spelling left to reserve (`D-23`:
///     *"There is no kernel-authored identity left to reserve, so the prefix is not merely discarded — it has
///     nothing left to name"*), so the entry's own `KERNEL_HANDLE_PREFIX` and its blanket exemption of
///     kernel-prefixed handles die with it (`index.mjs`).
///   * **`noopHandleFor` → THE CALLER'S OWN `id`**, which is already `K-1`'s third position (`D-23`/`D-24`).
///
/// **THE SIX `export` SITES ARE UNTOUCHED** — `register` (`K-1`), `commit` (`K-2`), `runAttempt` (`K-3`),
/// `log` (`K-4`), `report` (`K-5`) and `remove` (`K-6`) — **so `held-listener-identity-greens.mjs`'s six-name
/// census and the kernel battery's cells read the same module namespace they read before.**

// ---------------------------------------------------------------------------------------------
// `K-6` `remove(store, pair) -> undefined`
//
// **⟶ THE KERNEL'S DECLARED EXTENT MOVES `5 → 6`** — *"Add a sixth kernel item (K-6)"* (`P: docs/pending.md ·
// R-B2`, verbatim; `contract.md §2.9` item 1). **The extent's arithmetic, printed with its terms: `K-1`
// `register` · `K-2` `commit` · `K-3` `runAttempt` · `K-4` `log` · `K-5` `report` · `K-6` `remove` —
// `5 + 1 = 6` ✓** (`remove-member.md §5` item 1).
//
// **THE ROUTE, STATED ONCE FOR BOTH ACTS, AND IT IS THE RULING'S:** *"the kernel already reaches a store verb
// (`store.listen` / `store.register`), so `K-6` withdraws through the same route rather than inventing a
// second one — and the proposal must state that route once, for both acts"* (`P: docs/pending.md · (D-iv)`,
// verbatim). **SO `K-6` CALLS THE APP'S OWN REMOVAL VERB — `removeListener`, THE PRODUCT'S PUBLISHED MEMBER —
// AND NOT A STORE-SIDE PRIVATE ACT** (`contract.md §2.9` item 2; `remove-member.md §2` items 2–3). **THE CHAIN
// IS `removeConstraint → K-6 → removeListener → the store's purge`, AND IT HAS NO CYCLE** (`contract.md §2.9`
// item 6).
//
// **AND `K-6` DOES NOT ENUMERATE ADDRESSES AND DOES NOT CONSULT A COUNT: it hands the handle to
// `removeListener`, whose purge reach is total** (`P: docs/pending.md · (Y-1)`, verbatim: *"the kernel does not
// need to know N because it does not enumerate addresses at all"*; `contract.md §2.9` item 7).
// ---------------------------------------------------------------------------------------------
export function remove(store, pair) {
  const kernel = kernelFor(store);

  // CHANNEL (i) — THE KERNEL'S OWN, REFUSED BEFORE ANY STORE VERB IS REACHED (`remove-member.md §4` item 2
  // (i): *"a pair outside the kernel's domain is `KC-2`, thrown in the kernel's own form BEFORE any store verb
  // is reached"*; the two-channel rule at `kernel-surface.md §2.1` item 1's throws bullet).
  if (pair === null || typeof pair !== 'object' || Array.isArray(pair)) {
    refuse(KC.arg,
      'a removal\'s pair is a plain object carrying an `address` SET and a NON-EMPTY STRING id',
      []);
  }
  if (!Array.isArray(pair.address) || !inDomainId(pair.id)) {
    refuse(KC.arg,
      'a removal\'s pair is a plain object carrying an `address` SET and a NON-EMPTY STRING id',
      []);
  }
  // **THE PAIR'S `address` IS READ AT THE TWO SPELLINGS THE CONSTRAINT METHODS DECLARE** — one address (the
  // registration act's own form) or the set the pair stands over (`constraint-identity.md §6`'s pair table;
  // `PAR-HL-30`). **THE DISCRIMINATOR IS THE MEMBER'S CLASS**, the same rule `listen`'s set position takes
  // (`listen-verb.md §2.2` item 4): an array whose first member is an array is a SET.
  const set = pair.address.length > 0 && Array.isArray(pair.address[0]) ? pair.address : [pair.address];
  for (const address of set) {
    if (!inDomainAddress(address)) {
      refuse(KC.arg,
        'a removal\'s pair carries an address outside the store\'s own address domain',
        []);
    }
  }

  // CHANNEL (ii) — A PAIR THE KERNEL HOLDS NO ROW FOR IS `KC-2` AND NO STATE MOVES (`remove-member.md §4`
  // item 2 (ii); `contract.md §4` `F-12`). **THE REGISTRY IS UNMOVED BY THAT REFUSAL.**
  //
  // **⟶ AND THE ROW IS FOUND STRUCTURALLY, BECAUSE THE KEY IS THE PAIR — `(address, id)`** (`contract.md §5.1`'s
  // `S-KEY`; `pairKey` above). **A CALLER NAMES A PAIR BY ONE ADDRESS OR BY THE SET IT STANDS OVER, and neither
  // spelling is the array the registration was keyed by**, so the `id`-only lookup that stood here is replaced
  // by the row's OWN `addresses` member, the same member `pairsAtAddress` matches for the pass
  // (`contract.md §2.8` items 1 and 6). **NOTHING IS ENUMERATED BY `K-6` ITSELF AND NO COUNT IS CONSULTED** —
  // this scan answers WHICH row the caller named and reads no address of the pair's set for a store act
  // (`P: docs/pending.md · (Y-1)`; `contract.md §2.9` item 7).
  //
  // **AND WHERE TWO ROWS SHARE ONE `id` AT TWO DIFFERENT ADDRESSES, EACH NAMES ITSELF**: the pairs this tree's
  // callers register are the ones a `K-6` is handed (the entry spells its own removal from the row's own
  // `addresses`), and the first row whose address set carries one of the caller's addresses answers. **THE
  // PURGE'S REACH IS THAT ROW'S OWN HANDLE'S AND NOTHING WIDER** (`§2.2` item 3's `S-PURGE-SET`): a different
  // handle bound at the same address is NOT purged, and a pair at another address under the same `id` is a
  // DIFFERENT pair.
  const row = pairRowAt(kernel, set[0], pair.id);
  if (row === null) {
    refuse(KC.arg, `no constraint pair answers to '${pair.id}'`, []);
  }
  const { key } = row;

  // **THE SUCCESS ARM: THE KERNEL'S ROW AND ITS ADDRESS ROWS GO, AND THE STORE'S HOME ENTRIES ARE WITHDRAWN
  // THROUGH THE APP'S OWN PUBLISHED MEMBER** (`contract.md §2.9` items 3–4; `remove-member.md §4` item 1).
  // **ITS ANSWER IS `undefined`** — *"matching `removeConstraint`'s own answer"* (`P: docs/pending.md · P-5`'s
  // `(R3)`; `contract.md §2.9` item 3; `PAR-HL-31`).
  //
  // **⟶ THE ADDRESSES ARE NOT ENUMERATED AND NO COUNT IS CONSULTED: `K-6` READS THE PAIR'S OWN STORE HANDLE
  // OFF THE ROW IT ALREADY HOLDS AND HANDS IT TO THE PUBLISHED VERB ONCE, WHOSE PURGE REACH IS TOTAL** (`P:
  // docs/pending.md · (Y-1)`, verbatim: *"THE KERNEL DOES NOT NEED TO KNOW N BECAUSE IT DOES NOT ENUMERATE
  // ADDRESSES AT ALL: THE PURGE TAKES THE OLD HANDLE AND REMOVES EVERY ENTRY THAT HANDLE NAMES, WHEREVER IT
  // STANDS"*; `contract.md §2.9` item 7; `remove-member.md §6` item 4). **`K-1` GIVES A PAIR ONE HANDLE
  // STANDING OVER EVERY ADDRESS OF ITS SET** — that is what makes a single call total.
  const home = kernel.handles.get(key);
  kernel.pairs.delete(key);
  kernel.handles.delete(key);
  // **AND THE ENTRY'S OWN READ MODEL IS TOLD, THROUGH THE ONE CHANNEL THE KERNEL HAS FOR IT** — the
  // `FORGET_PAIR` symbol both sides spell, exactly as `TERMINAL_ARM` and `CHECKED_OFF` travel (`A117` (D6):
  // a symbol key adds no member). **`K-6`'s success must leave the pair GONE FROM `constraints()`**
  // (`contract.md §3` `S-19`; `remove-member.md §4` item 1). **WHERE THE INSTANCE CARRIES NO SUCH CHANNEL —
  // an instance that is not this package's product — there is nothing to tell and nothing is told.**
  //
  // **⟶ AND THE READ-MODEL DELETE IS NOT A POSITION.** **`K-6`'S DECLARED SHAPE IS THE TWO POSITIONS OF
  // `PAR-HL-29`/`PAR-HL-30` AND ITS DECLARED RETURN OF `PAR-HL-31`, AND NO THIRD POSITION EXISTS**
  // (`contract.md §2.9` item 3; `remove-member.md §3` item 2's two priced alternatives, both refused). **THE
  // DELETE IS THEREFORE UNCONDITIONAL**, and the two PURGES the constraint site takes (`constraint-sites.md
  // §1` rows 1–3: `addConstraint`'s overwrite arm, `constraintOn`, `constraintOff`) delete the row and then
  // WRITE IT BACK THEMSELVES through `K-1` — because `(O-3)`'s purge-then-add re-registers the element at the
  // SAME pair identity, so no identity a toggle must keep is lost (`constraint-identity.md §5` `IF-5`;
  // `P: docs/pending.md · (O-3)` item (iv)'s obligation; `(AA-2)`). **`removeConstraint` IS THE ONE ACT THAT
  // DELETES AN IDENTITY, AND IT IS THE ONE ACT THAT DOES NOT RE-ADD** (`contract.md §2.6` item 3).
  const forget = store[Symbol.for('provident-storeroom.forget-pair')];
  if (typeof forget === 'function') forget.call(store, pair.id);
  // **CHANNEL (iii) — THE STORE'S OWN REFUSAL CROSSES UNCONVERTED** (`remove-member.md §4` item 2 (iii);
  // `contract.md §4` `F-13`; `fail-surface.md §1.2` item 2): this frame converts nothing, catches nothing and
  // mints no `KC` token, so the store's own code reaches the caller in the store's own form.
  // **A PURGED PAIR'S STALE HANDLE IS `OWED`'S ARM AND IS NOT DECLARED HERE** (`contract.md §2.9` item 7;
  // `remove-member.md §4` item 5): the removal names the handle the ROW holds, and whether a no-op or a
  // purge is reached on the stale state is the spec writer's unsettled subject. **THIS FRAME ASSERTS NO
  // FOURTH ARM** — it performs the declared one and lets whatever the store answers cross.
  if (home !== undefined) store.removeListener(home);
  return undefined;
}
