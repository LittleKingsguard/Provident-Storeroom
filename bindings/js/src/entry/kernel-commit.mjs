// `D-13` (`docs/L1/kernel-subdivision.md` §1 part `9c`) — the commit act: bytes moved from `bindings/js/src/constraint-kernel.mjs`; no logic changed.
import { KC, refuse, inDomainAddress, kernelFor, attemptHeldAt, appendOwn } from './kernel-foundations.mjs';
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
      `a constraint attempt is already open at ${JSON.stringify(address)}; it is disposed of by its own `
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
    log: [],
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

