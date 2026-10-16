// `U-STOREROOM-CONSTRAINTS` — THE CALLER-SIDE CONSTRAINT KERNEL. ZERO DEPENDENCIES.
//
// The kernel lives in the Node.js space and reaches the store through the store's own declared
// verbs (`kernel-surface.md §1` item 1). It holds no store of its own: every one of the five items
// takes THE CALLER'S OWN STORE INSTANCE first.
//
// THE FIVE ITEMS AND NOTHING ELSE (`kernel-surface.md §1` item 2):
//   K-1 register(store, address, id, constraint) -> Handle
//   K-2 commit(store, address, tier, value)      -> CommitRecord
//   K-3 runAttempt(store, commit)                -> AttemptReport
//   K-4 log(store, attempt)                      -> LogEntry[]
//   K-5 report(store, attempt)                   -> AttemptReport
//
// EVERY ARGUMENT'S DOMAIN, EVERY RECORD'S MEMBER SET AND EVERY STATE TOKEN ARE READ FROM THE
// CONTRACT DIRECTORY: `parameter-semantics.md §2.1`–`§2.17`, `attempt-lifecycle.md §2.4`,
// `composition-and-states.md §2.6`, `fail-surface.md §1`–`§2`.

// THE MODULE'S WHOLE IMPORT FOOTPRINT, AND IT CARRIES NO SECOND LOAD PATH (`kernel-surface.md §1` item
// 1's fixture clause; `parameter-semantics.md §2.7`'s no-second-route clause; `A: docs/decisions.md` ·
// `A110`): the caller's own instance's package and NOTHING ELSE — no `createRequire`, no addon path, no
// native module and no dependency of the module's own. Every op this kernel credits is an op the
// caller's own instance's verb calls answered.
import { write as storeWrite, rollback as storeRollback, read as storeRead } from 'provident-storeroom';

// ---------------------------------------------------------------------------------------------
// `fail-surface.md §2` — THE KERNEL'S OWN CLOSED STATE SET, `8` MEMBERS AND NO NINTH.
// ---------------------------------------------------------------------------------------------
// `fail-surface.md §1.1` ITEM 1 (a) — THE ONE SPELLING, AND IT IS THE TOKEN: a refusal's `status` carries
// `KC-1`…`KC-8` and NOTHING ELSE. The full names (`ConstraintViolated` …) are LABELS: they keep exactly
// one declared use — the `name` column of `§2`'s table, and a citation beside a token — and NO clause
// spells a member's VALUE as a name. `status` and `LogEntry.state` therefore read THE SAME TOKEN STRING,
// related by IDENTITY (`§1.1` item 1 (c)). THE CENSUS DOES NOT MOVE: `8` members (`2 + 2 + 2 + 1 + 1`)
// on `13` sites (`1 + 4 + 4 + 3 + 1`).
const KC = {
  address: 'KC-1', // ConstraintAddressRefused
  arg: 'KC-2', // ConstraintArgRefused
  violated: 'KC-3', // ConstraintViolated
  repairFailed: 'KC-4', // ConstraintRepairFailed
  repairRepeat: 'KC-5', // ConstraintRepairRepeat
  repeat: 'KC-6', // ConstraintRepeat
  attemptOpen: 'KC-7', // ConstraintAttemptOpen
  rollbackFloor: 'KC-8', // ConstraintRollbackFloor
};

/** The eight tokens above, as the ONE list a member's own value is checked against — the kernel's own
 *  token is NEVER named as a store code (`fail-surface.md §1.1` item 1 (a); `§2`'s `KC-4` row). */
const KC_TOKENS = Object.values(KC);

/**
 * `composition-and-states.md §2.6` item 5 (b) — THE COMPOSITION'S TWO FLOOR CODES, AND THE WHOLE OF THAT
 * PART: "AN OP THE COMPOSITION STILL OWES WHOSE CALL FAILS EITHER FLOOR CODE — `RollbackCompacted` OR
 * `JournalOpUnknown` — IS `KC-8`". The step's `answer` carries THE STORE'S OWN CODE on the throwing arm
 * (item 3), so the floor is read off the step's own `answer` and off no other member.
 */
const STORE_FLOOR_CODES = ['RollbackCompacted', 'JournalOpUnknown'];

/**
 * **THE PASS'S OWN BOOKKEEPING OF WHAT ITS CHECK-OFFS CONSUMED, CARRIED TO THE TERMINAL ARM
 * (`docs/specs/storeroom-js/surface.md §2.7` item 7's keying, read with `§2.4` item 8 (c) AS CORRECTED
 * 2026-10-15 and `docs/decisions.md` · `A117` (D5)).**
 *
 * **THE CHECK-OFF KEEPS ITS ACT AND ITS LAW UNCHANGED**: it is still THE ONLY LAWFUL REMOVAL on a passing
 * write (`kernel-surface.md §2.1` item 2), it still removes the evaluated identity's entry from the
 * residue by identity (`releasePending` below), and every `pending`-based assertion about it stands — the
 * residue is still the returned set MINUS the checked-off entries and MINUS nothing else, and a SIFT is
 * still unlawful. **WHAT `A117` (D5) ADDS IS WHAT THE CHECK-OFF CONSUMED**: *"the check-off consumes the
 * evaluated pair's own delivery of that identity, NOT that identity's whole owed delivery"* — the carrier
 * has ONE entry per address, and the entry's own owed firings are not counted in `pending`; they are
 * counted where the owed firings live, THE PACKAGE'S REGISTRY. So the identity a checked-off pair stood
 * under is NOT an identity with no owed firing when a registration at that same address owes it one.
 *
 * **THIS MEMBER IS THAT FINDING, AND IT IS NOT A SECOND CHANNEL**: the entry already resolves a handle to
 * its registered function for the residue, and this member names the identities whose pair the pass
 * evaluated and checked off — the entry resolves THE SAME WAY over them at the terminal arm and delivers
 * each ONCE (`§2.7` item 6: the other listeners are reached ONCE every constraint has passed). `A117`
 * (D6): **NO MEMBER IS ADDED** — `CommitRecord` keeps its four members, the store keeps one home entry per
 * address, and this finding is carried on the record under a SYMBOL key, which `Object.keys`,
 * `Object.getOwnPropertyNames` and every declared census read past, so the named-shape set does not move.
 *
 * **AND IT IS PUBLISHED ONLY ON THE PASSING ARM** (`runAttempt`'s success arm, immediately before
 * `settleArm`): on a FAILING write `A114` (D1)/(D2) discards the other listeners and NOTHING is delivered,
 * so the arm's residue is empty AND the checked-off identity stands for no delivery — the marker is never
 * placed on a closed attempt.
 */
const CHECKED_OFF = Symbol.for('provident-storeroom.checked-off-at-the-terminal-arm');

/**
 * **⟶ ADDED 2026-10-15 (`surface.md §2.11` clauses 1–2; `contract.md §7.2` item 2 as amended) — THE PASSING
 * ARM'S OWN MARK, PLACED BY THE KERNEL AND READ BY THE ENTRY'S SEAM.**
 *
 * **THE SEAM'S TERMINAL ARM PERFORMS THE STORE'S `file`-TIER COMMIT ON ITS PASSING ARM ALONE** (clause 1:
 * *"the `file` tier, the TERMINAL ARM and the PASSING ARM alone"*), **and BOTH ARMS REACH THE SAME
 * `settle` CALL** — `settleArm` is the one seam instant this kernel takes, and it is taken on the failing
 * arm too, where clause 1 refuses the write a save and a store call of its own. **THE ARM IS THIS
 * KERNEL'S OWN FACT AND NOBODY ELSE'S**, so it is told to the entry under a SYMBOL key, exactly as the
 * check-off list is (`CHECKED_OFF` above): **NO MEMBER IS ADDED** to `CommitRecord` (`A117` (D6)), the
 * record's four members and its `pending` member are untouched, and a census of either moves by nothing.
 * **THE SYMBOL IS A WELL-KNOWN ONE DECLARED ON BOTH SIDES**, so the entry imports no kernel and the
 * kernel imports no entry.
 */
const SETTLED_ON_THE_PASSING_ARM = Symbol.for('provident-storeroom.settled-on-the-passing-arm');

/**
 * **⟶ ADDED 2026-10-15 (`surface.md §2.11` clause 5; `fail-surface.md §1.1` item 3; `kernel-surface.md §2.1`
 * items 3–5) — THE FAILED SAVE'S OWN MARK, PLACED BY THE ENTRY'S SEAM ON THE RECORD IT WAS HANDED.**
 *
 * **THE SAVE IS A CONSTRAINT EVALUATED LAST, AND THE PASS REPORTS ITS FAILURE AS IT REPORTS ANY OTHER**
 * (clause 5): the failed save's arm is the TERMINAL ACT — the per-op rollback composition FIRST, then the
 * ONE `outcome` entry, then the refusal — so the closed attempt's FINAL log carries that entry, the
 * terminal answer is that closed record's FINAL report (`K-4`/`K-5`), and the report's `rollback` member
 * carries the rollback the composition PERFORMED. **THE ARM CANNOT BE READ OFF THE THROWN FORM**: the
 * store's own verb produced this failure, so its code crosses on the STORE's channel and its two-member
 * form reaches the caller unchanged (`§1.2` item 2) — the KERNEL's token stands in the `outcome` entry's
 * `state` (`§1.2` item 3's repair-arm pattern, read at this arm).
 *
 * **SO THE ENTRY TELLS THE KERNEL WHICH ARM IT IS, ON THE IDENTITY THE KERNEL HOLDS**, exactly as
 * `SETTLED_ON_THE_PASSING_ARM` tells the entry: it is set by `settleOn` at the ONE call the arm is made of
 * — the store's `commit_file`, taken as the terminal arm's FIRST act — and it carries THE VERY THROWABLE
 * the seam rethrew, so the kernel's own catch can tell the failed save from a BODY OF THE DELIVERED SET
 * THAT THREW, which is NOT caught, not retried and not reported (`§2.7` item 4). **IT IS A SYMBOL KEY ON
 * PURPOSE** (`A117` (D6)): `CommitRecord` keeps its four members and no census moves.
 */
const SAVE_FAILED_AT_THE_TERMINAL_ARM = Symbol.for('provident-storeroom.save-failed-at-the-terminal-arm');

/** `fail-surface.md §1.1` — ONE THROWN PLAIN OBJECT, EXACTLY THREE MEMBERS, NEVER AN `Error`. */
function refuse(status, message, log) {
  throw { status, message, log: log === undefined ? [] : log };
}

// ---------------------------------------------------------------------------------------------
// `PAR-C-1` — THE REGISTRATION KEY'S `address`: the store's own domain, unchanged and not
// re-declared here.
// ---------------------------------------------------------------------------------------------
function inDomainAddress(address) {
  if (!Array.isArray(address)) return false;
  for (const segment of address) {
    if (typeof segment === 'string') continue;
    if (typeof segment === 'number' && Number.isInteger(segment) && segment >= 0) continue;
    return false;
  }
  return true;
}

/** `PAR-C-2` — the registration key's `id`: a non-empty `string` and nothing else. */
function inDomainId(id) {
  return typeof id === 'string' && id.length > 0;
}

/**
 * `attempt-lifecycle.md §2.4` item 2 — THE ADDRESS HALF OF THE PAIR KEY, AND THE REGISTRY'S OWN KEY FOR
 * ONE ADDRESS — WITH EACH SEGMENT'S OWN CLASS MARKER, WHICH IS THIS SPELLING'S WHOLE POINT: an INDEX
 * (`i`) bears THE SEGMENT'S OWN SIGNLESS DECIMAL DIGITS immediately, a KEY (`k`) bears THE SEGMENT'S OWN
 * CHARACTER COUNT, and each is then followed by `:`, by the segment VERBATIM and by `;`; the segments so
 * spelled are joined with `/`. THE MARKER IS WHAT KEEPS THE TWO DECLARED SEGMENT CLASSES APART — the
 * withdrawn UNMARKED spelling spelled an index `3` and the key `'3'` IDENTICALLY, so its "injective"
 * claim was false over a domain closed at exactly two classes — and the `;` is a delimiter the field's
 * own grammar cannot carry, so a `;`, a `:`, a `/`, a `#`, a NUL or the empty segment `0:` INSIDE a
 * segment is that segment's own character and never a separator: `['a/b'],'c'` spells `k:3;a/b` against
 * `['a','b'],'c'`'s `k:1;a/k:1;b`, `['v',3]`'s second segment spells `i:3;` and not a character count,
 * `['a\0b']` and `['a','b']` are two addresses, and the empty address spells the empty string. NO
 * READER MAY STRIP THE MARKER, and no clause of this module re-spells a key anywhere else.
 */
function addressToken(address) {
  let token = '';
  for (let i = 0; i < address.length; i += 1) {
    if (i > 0) token += '/';
    const segment = address[i];
    if (typeof segment === 'number') token += `i:${segment};`;
    else {
      const text = String(segment);
      token += `k:${text.length}:${text};`;
    }
  }
  return token;
}

/**
 * `attempt-lifecycle.md §2.4` item 2 — THE PAIR TOKEN: THE ADDRESS HALF ABOVE, then ONE `#`, then the
 * bare `id`. `(['a','b'],'x')` spells `k:1;a/k:1;b#x`, `(['a'],'b#x')` spells `k:1;a#b#x`, `(['a/b'],'c')`
 * spells `k:3;a/b#c`, `(['v',3],'x')` spells `k:1;v/i:3;#x` and `([],'x')` spells `#x` — the `#` the
 * address half cannot carry being the one separator between the two halves.
 */
function pairKey(address, id) {
  return `${addressToken(address)}#${id}`;
}

// ---------------------------------------------------------------------------------------------
// THE KERNEL'S OWN CALLER-SIDE STATE. ONE `WeakMap` KEYED BY THE INSTANCE THE CALLER PASSED, so
// two stores never share a registry and this module retains no store of its own.
// ---------------------------------------------------------------------------------------------
const KERNELS = new WeakMap();

// THE ATTEMPT RECORDS ARE THE KERNEL'S OWN CALLER-SIDE SHAPE AND ARE KEYED BY THE `AttemptRef`, NOT BY
// THE INSTANCE: a reader answers "from the record and not from the store instance"
// (`ck_surface_K4_the_readers_answer_from_the_record_and_not_from_the_store_instance`; `§2.1` item 4).
const LIVE = new Map();
const CLOSED = new Map();
let ATTEMPTS = 0;

function kernelFor(store) {
  let kernel = KERNELS.get(store);
  if (kernel === undefined) {
    kernel = {
      // The registration registry, keyed by the pair token, in first-registration order per
      // address (`kernel-surface.md §2.1` item 1, `CC-7`).
      pairs: new Map(),
      byAddress: new Map(),
      // address token -> the store's own adopted home handle for that address.
      homes: new Map(),
      // pair token -> THE STORE'S OWN ADOPTED HANDLE the pair's registration answered. The kernel
      // "mints no token for a store-minted handle" (`§2.2` item 1) and "THE ONE THING THE KERNEL DOES
      // WITH THE HANDLE IS RECORD IT" (`§2.2` item 3) — so the handle the delivery is keyed by is
      // recorded here and nowhere else.
      handles: new Map(),
      // address token -> the AttemptRef.id holding it.
      held: new Map(),
    };
    KERNELS.set(store, kernel);
  }
  return kernel;
}

// ---------------------------------------------------------------------------------------------
// THE MESSAGE LOG (`kernel-surface.md §2.5` item 1; `PAR-C-4`). SIX MEMBERS, `seq` ASCENDING FROM
// `1`, ONE KIND PER ENTRY: `constraint-check` | `repair-run` | `commit` | `outcome`.
// ---------------------------------------------------------------------------------------------
function append(attempt, kind, id, opId, message, state) {
  attempt.log.push({
    seq: attempt.log.length + 1,
    kind,
    id: id === undefined ? null : id,
    opId: opId === undefined ? null : opId,
    message,
    state: state === undefined ? null : state,
  });
}

/** A withdrawn entry takes its `seq` with it: the log's ordinals stay `1..n` (`§2.5` item 1). */
function withdraw(attempt, entry) {
  const at = attempt.log.indexOf(entry);
  if (at === -1) return;
  attempt.log.splice(at, 1);
  for (let i = 0; i < attempt.log.length; i += 1) attempt.log[i].seq = i + 1;
}

// ---------------------------------------------------------------------------------------------
// THE REPAIR'S OWN OP (`PAR-C-7`; `parameter-semantics.md §2.7`'s `observable` cell — the seam's ONE
// home; `A: docs/decisions.md` · `A110`).
//
// THE REPAIR'S OWN RETURN CARRIES IT, AND THAT RETURN IS ITS ONE CARRIER: *"THE KERNEL READS THE OP
// THE REPAIR LANDED OFF THE REPAIR'S OWN RETURN AND NOWHERE ELSE — the op it APPENDS to the
// attempt's `ops` IS `returnValue.op`."* THE ROUTE `A110` DELETES IS **DELETED AND NOT WIDENED**: no
// `createRequire`, no addon load path, no addon-verb interception window, no monkey-patch and no
// second dependency stands in this module, so the import footprint above is the whole of what the
// kernel loads and the caller's own instance is the only way it ever reaches the store.
//
// AND `returnValue.op`'s ONE DECLARED VALUE IS THE STORE'S OWN OP VALUE, THE ONE ITS OWN `write`
// ANSWERED WITH — *"so a return carrying any other identity has carried no op at all."* A repair's
// edit that lands mints a FRESH op: the journal is append-only and `AttemptRecord.ops` holds the ops
// THIS attempt created, so an identity the attempt ALREADY HOLDS is provably not this repair's own
// landing. The member is therefore decided CALLER-SIDE, off the return and off the attempt's own
// record and off nothing else, and every value outside it is THE APP'S OWN DEFECT — *"the kernel
// credits NO op, the attempt takes arm `(d)` and fails `KC-4`, its `repair-run` entry is appended,
// and the kernel's own generated sentence names the unrecognized or unlanded `op`."*
// ---------------------------------------------------------------------------------------------

/**
 * THE OP THE REPAIR'S OWN RETURN CARRIES, OR `null` WHERE IT CARRIES NONE.
 *
 * `null` answers BOTH halves of `§2.7`'s clause at once: an `ok === true` return whose `op` is
 * ABSENT or `undefined`, and one whose `op` is NOT the op the repair actually landed — a value that
 * is no op at all (an op is an object carrying a non-empty string `opId`), an op this attempt
 * ALREADY HOLDS, or an op that PROVABLY LANDED BEFORE THIS REPAIR'S OWN EDIT. Each is read as a
 * repair that produced NO OP (`parameter-semantics.md §2.7` — *"a return carrying any other identity
 * has carried no op at all"*; `attempt-lifecycle.md §2.4` item 4's arm `(d)`).
 *
 * `invokedFor` IS THE OP THIS EVALUATION CARRIED — the op the repair was invoked for — and it is
 * the second ground's whole term: the repair's own edit lands INSIDE this invocation, and the
 * store's own `seq` is "the entry's append ordinal, strictly increasing from 1"
 * (`A: docs/specs/storeroom-native/write-and-read.md §6.2`), so an op whose own ordinal does not
 * stand ABOVE the ordinal of the op this repair was invoked for CANNOT be an op this repair
 * landed — it landed at or before it. The member is read CALLER-SIDE, off the return's own value and
 * off the attempt's own record and off nothing else: the kernel reaches no journal and loads no
 * second route. Where either ordinal is not a number the ground is not applied, and the membership
 * ground above stands alone.
 */
function landedOp(attempt, returned, invokedFor) {
  if (!('op' in returned)) return null;
  const candidate = returned.op;
  if (candidate === null || typeof candidate !== 'object') return null;
  if (typeof candidate.opId !== 'string' || candidate.opId.length === 0) return null;
  for (const held of attempt.ops) {
    if (held !== null && typeof held === 'object' && held.opId === candidate.opId) return null;
  }
  const floor = invokedFor !== null && invokedFor !== undefined && typeof invokedFor.seq === 'number'
    ? invokedFor.seq
    : null;
  if (floor !== null && typeof candidate.seq === 'number' && candidate.seq <= floor) return null;
  return candidate;
}

/**
 * THE KERNEL'S OWN GENERATED SENTENCE FOR THAT ARM: *"the kernel's own generated sentence names the
 * unrecognized or unlanded `op`"* (`§2.7`'s home, verbatim). It names the identity the malformed
 * return carried — the `opId` where the member carried one, the member's own value where it did not
 * — and never the attempt's address alone.
 */
function landedOpDefect(attempt, pair, returned) {
  const where = JSON.stringify(attempt.address);
  if (!('op' in returned) || returned.op === undefined) {
    return `the repair ${pair.id} returned \`ok: true\` and carried no op at ${where}`;
  }
  return `the repair ${pair.id} returned \`ok: true\` and named the unrecognized or unlanded op `
    + `${opSpelling(returned.op)} at ${where}`;
}

/** One returned `op` member's identity, spelled for the kernel's own sentence: an `opId` where the
 *  member carried one, and the member's own class where it carried no op at all. */
function opSpelling(value) {
  if (value !== null && typeof value === 'object' && typeof value.opId === 'string') {
    return JSON.stringify(value.opId);
  }
  if (typeof value === 'string') return JSON.stringify(value);
  if (value === null) return 'null';
  return `a ${typeof value} (which is no op)`;
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
  const home = store.on(address, noopListener);

  const key = pairKey(address, id);
  const standing = kernel.pairs.get(key);
  // THE PAIR'S OWN IDEMPOTENCE: a second registration under the SAME pair key keeps the replaced
  // registration's POSITION and replaces only its function (`§2.1` item 1; `CC-7`).
  if (standing === undefined) {
    kernel.pairs.set(key, { address, id, constraint });
    kernel.handles.set(key, home);
    const token = addressToken(address);
    const list = kernel.byAddress.get(token);
    if (list === undefined) kernel.byAddress.set(token, [key]);
    else list.push(key);
    if (!kernel.homes.has(token)) kernel.homes.set(token, home);
  } else {
    standing.constraint = constraint;
  }
  return home;
}

/** The store holds ONE registration per address, and its `listen` takes a function. */
function noopListener() {}

// ---------------------------------------------------------------------------------------------
// `K-2` `commit(store, address, tier, value) -> CommitRecord`
// ---------------------------------------------------------------------------------------------
export function commit(store, address, tier, value) {
  const kernel = kernelFor(store);
  const token = inDomainAddress(address) ? addressToken(address) : null;

  // THE ADDRESS THE ATTEMPT HOLDS REFUSES A SECOND ATTEMPT BEFORE THE WRITE VERB IS REACHED, and
  // the refused call opens no attempt and leaves no entry (`KC-7`; `kernel-surface.md §2.1` item 2).
  if (token !== null && kernel.held.has(token)) {
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
  if (token !== null) kernel.held.set(token, token);

  // THE STORE'S OWN VERB CHOOSES WHICH REFUSAL ANSWERS. An out-of-domain `tier` and an absent
  // `value` are THE STORE'S own code on THE STORE'S own channel, and the kernel mints no `KC-2` for
  // either (`kernel-surface.md §2.1` item 2; `parameter-semantics.md §2.14`). WHERE THE VERB REFUSES, NO
  // ATTEMPT WAS OPENED, SO THE ADDRESS IS LEFT UNHELD: the hold taken above is released and the store's
  // own throwable reaches the caller UNCHANGED AND UNCONVERTED (`fail-surface.md §1.2` item 2) — a
  // refused write leaves no hold behind (`ck_surface_K2_an_out_of_domain_tier_is_the_store_s_own_code_on_the_store_s_own_channel`).
  ATTEMPTS += 1;
  const attempt = {
    ref: { id: `attempt-${ATTEMPTS}` },
    store,
    address: address.slice(),
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
  if (typeof store.settle === 'function') store.settle(record);

  let written;
  try {
    // **THE FIFTH POSITION** (`kernel-surface.md §1` item 5's dated spelling; `surface.md §2.12` item 1
    // stage 2): the kernel drives the Rust store with the record identity `K-2` opened or joined, so the
    // kernel's own store leg IS the entry's own write and its delivery is withheld for the terminal arm.
    written = storeWrite(store, address, tier, value, record);
  } catch (refusal) {
    if (token !== null) kernel.held.delete(token);
    throw refusal;
  }

  attempt.write = written;
  attempt.ops = [written.op];
  LIVE.set(attempt.ref.id, attempt);

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
// `K-3` `runAttempt(store, commit) -> AttemptReport`
// ---------------------------------------------------------------------------------------------
export function runAttempt(store, commitRecord) {
  const kernel = kernelFor(store);
  const id = commitAttemptIdOf(commitRecord);
  const attempt = LIVE.get(id);
  if (attempt === undefined) {
    // A CLOSED or UNKNOWN attempt is KC-2 — and NEVER KC-7, whose `K-3` site is the RE-ENTRANT call
    // for a LIVE attempt (`fail-surface.md §2`'s KC-2 row; `kernel-surface.md §2.3` item 3).
    refuse(KC.arg, `no open constraint attempt answers to ${id}`, []);
  }
  // `kernel-surface.md §2.1` item 3's `RD-9` CLAUSE, READ WITH `attempt-lifecycle.md §2.4` item 1: the
  // `AttemptRef` is MINTED BY THE KERNEL INSTANCE (its `id` "unique within the kernel instance"), so a
  // `CommitRecord` whose attempt was opened by ANOTHER instance names an attempt THE KERNEL INSTANCE
  // HANDED THE RECORD HOLDS NONE FOR. That call is THIS refusal — `KC-2`, NO STATE MOVED AND NO ENTRY
  // APPENDED — and NEVER a run of another instance's attempt: the attempt's own `store` is the instance
  // its `K-2` reached, and what is refused here is refused BEFORE `status` moves, so the caller's own
  // attempt stands OPEN, its pair unevaluated, and its address held by ITS OWN run alone (item 4's
  // unconstrained-argument clause is declared for `K-4`/`K-5` and is not widened to `K-3`).
  if (attempt.store !== store) {
    refuse(KC.arg,
      `no open constraint attempt answers to ${id}: it was opened through another store instance`,
      []);
  }
  if (attempt.status === 'running') {
    // THE RE-ENTRANT `K-3`, refused by the SAME `KC-7` member a live address answers with.
    refuse(KC.attemptOpen,
      `the constraint attempt at ${JSON.stringify(attempt.address)} is already running`, []);
  }

  attempt.status = 'running';
  const terminalArm = runToCompletion(kernel, attempt);
  if (terminalArm !== null) {
    // A FAILING LANDING: the arm's own terminal act, its per-op rollback composition, and the throw
    // of `fail-surface.md §1.1`'s form carrying the log.
    terminal(kernel, attempt, terminalArm.status, terminalArm.message);
    // **⟶ INSTANT (b) ON THE FAILING ARM, AND IT PRECEDES THE REFUSAL** (`docs/decisions.md` · `A116`
    // (D1); `surface.md §2.4` item 9's table row (b): *"AT THE PASS'S TERMINAL ARM … after the last
    // constraint of the attempt has been evaluated and before `runAttempt` returns to the calling
    // process"*). The attempt is already CLOSED and the DISCARD has already emptied the member
    // (`attempt-lifecycle.md §2.4` item 8 (i) (5); `terminal` above), so the residue this seam reads
    // stands EMPTY and the arm delivers ZERO — *"on a write that fails on constraints THE OTHER LISTENERS
    // ARE DISCARDED"* (`§2.7` item 6, read at item 7 (d)) — while the delivery itself is still owed at
    // this instant and is taken HERE rather than skipped, because the residue and not the arm decides
    // what it reaches (`§2.7` item 7 (c): *"the empty delivery is a NO-OP AND NOT A FAILURE"*).
    settleArm(store, attempt);
    // THE ARM IS READ OFF THE CLOSED ATTEMPT WHERE THE COMPOSITION'S OWN FLOOR OVERRODE IT: a still-owed
    // op's call meeting `RollbackCompacted`/`JournalOpUnknown` is `KC-8` and not the pass's own arm
    // (`composition-and-states.md §2.6` item 5 (b); `KC-8`'s own row).
    refuse(attempt.throwState, attempt.throwMessage, attempt.log);
  }

  // THE SUCCESS ARM: the registry entry removed and the five-member report — **AND THE `commit` ENTRY IS
  // NOT APPENDED HERE** (`DEF-2026-10-16-B`; `kernel-surface.md §2.1` item 3's `LogKind` table: `commit`
  // = "the attempt's SUCCESS arm, appended once"; `composition-and-states.md §2.7` items 5 and 7 put it on
  // the PASSED arm's own sequence). The save is A CONSTRAINT EVALUATED LAST (`surface.md §2.11` clause 5),
  // so an arm that appends this entry BEFORE the save's own instant appends it on an arm whose save may
  // not stand — and the entry's own declared text then LIES beside the `outcome` entry the failure arm
  // appends (`§2.1` item 4 (ii)). **THE APPEND THEREFORE FOLLOWS THE SAVE'S OWN SUCCESS**, below: it stands
  // on the passing arm alone, appended once, and it closes that arm's log.
  const closed = close(kernel, attempt, 'passed');
  // **⟶ INSTANT (b) ON THE PASSING ARM — THE ORDERING LAW'S WHOLE POINT** (`docs/decisions.md` · `A116`
  // (D1); `surface.md §2.7` item 6): *"for a write, the surface runs the write's TRIGGERED CONSTRAINTS
  // FIRST, and THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY CONSTRAINT HAS PASSED"*. Every constraint
  // of this attempt has now been evaluated — the pass reached its terminal arm — and the delivery follows
  // it, at THIS instant, before this item returns to the calling process. The attempt is closed FIRST so
  // that a listener body's own kernel act meets a disposed attempt rather than a live one.
  //
  // AND THE PASS'S OWN CHECK-OFFS ARE PUBLISHED HERE, BEFORE THE SEAM IS REACHED (`A117` (D5)): the
  // identities this attempt's pass evaluated and checked off are what the terminal arm resolves beside
  // the residue, so that a registration standing at one of those identities' addresses — the firing the
  // check-off did NOT consume — is delivered ONCE at this instant (`§2.7` item 6). It is placed on the
  // PASSING arm ALONE: the failing arm above delivered nothing and published nothing.
  publishCheckedOff(attempt);
  // **⟶ AND THE PASSING ARM'S OWN MARK IS TAKEN WITH THEM** (`SETTLED_ON_THE_PASSING_ARM` above;
  // `surface.md §2.11` clause 2): the seam's terminal arm performs the store's `file`-tier commit on THIS
  // arm alone — *"the `file` tier, the TERMINAL ARM and the PASSING ARM alone"* (clause 1) — and the
  // failing arm above reaches the same `settle` call with the same record in hand and owes no save.
  if (attempt.record !== undefined) {
    attempt.record[SETTLED_ON_THE_PASSING_ARM] = true;
  }
  // **⟶ AND THE SAVE IS A CONSTRAINT EVALUATED LAST, SO THE PASS THAT FAILED REPORTS IT** (`surface.md
  // §2.11` clause 5; `kernel-surface.md §2.1` items 3–5; `fail-surface.md §1.1` items 1 and 3;
  // `composition-and-states.md §2.6` item 3). **THIS IS THE ONE ARM ON WHICH THE PASSING ARM'S OWN FIRST
  // ACT FAILS**, and the clause reads it exactly as it reads every other failing landing: *"a save that
  // fails IS A CONSTRAINT VIOLATION"*, `ok === false`, the log gains the ONE `outcome` entry, and the
  // report is the run's answer and never the passing arm's.
  //
  // **THE ARM IS READ OFF THE IDENTITY THE SEAM MARKS AND OFF NOTHING ELSE** (`SAVE_FAILED_AT_THE_TERMINAL_
  // ARM` above): a BODY OF THE DELIVERED SET that throws is NOT this arm — `§2.7` item 4 leaves it NOT
  // caught, not retried and not reported — so it is rethrown with the attempt standing just as it stood.
  //
  // **THE TERMINAL ACT IS THIS MODULE'S ONE TERMINAL ACT, TAKEN VERBATIM** (`terminal` below): the per-op
  // rollback composition FIRST — ROLLBACK FIRST, MESSAGE SECOND — then the attempt's ONE `outcome` entry,
  // whose `state` is the token the composition's own floor decides (`KC-8` where the still-owed op's call
  // meets the store's own `JournalOpUnknown`, the failed save's arm being the store's own `§7.2` item 3
  // rollback and the entry it rolled back being gone) and the pass's own token `KC-3` where no floor is met.
  // **THE CALLER MEETS NEITHER FORM**: the store's verb produced this failure, so its code crosses on the
  // STORE's channel, in the store's own two-member form, VERBATIM AND UNCONVERTED (`§1.2` item 2) — the
  // kernel's token standing in the `outcome` entry's `state` — and THE VERY THROWABLE THE SEAM REWROTE is
  // what leaves this call.
  try {
    settleArm(store, attempt);
  } catch (saveFailure) {
    if (attempt.record === undefined
      || attempt.record[SAVE_FAILED_AT_THE_TERMINAL_ARM] !== saveFailure) {
      throw saveFailure;
    }
    // **AND THE PIN THE PASSING ARM TOOK IS RELEASED WITH IT** (`composition-and-states.md §2.6` item 3's
    // `checkpoint` member's own domain, read at item 8 (iii); item 1's filter; item 2's *"WHERE THE ATTEMPT
    // PASSED NO CHECKPOINT, THE CALL LIST IS ITEM 2'S OWN — THE WHOLE LIST"*). **THE MEMBER IS *"the opId of
    // the op whose LANDING left the attempt's LAST VALID STATE, or null where no such landing exists FOR
    // THAT ADDRESS"*** — and on THIS arm no landing of this attempt left one: the store's own failure arm
    // has ALREADY restored the pre-state and popped the entry (`src/store.rs`'s `commit_file`; `§8.1` #15;
    // clause 5's ROLLBACK FIRST), so the pass's own pin stood on a landing the save unsaid. **THE PIN IS
    // THEREFORE `null` AND THE COMPOSITION'S CALL LIST IS THE WHOLE OF `ops`** — item 1's filter excludes
    // the op a `null` member names from nothing — so the per-op call THIS ARM OWES IS ISSUED and its step
    // stands in the report's `rollback`: *"the report carries the rollback that actually happened"*
    // (`§2.6` item 3). Where the pinned op still stands in the store the call returns and the step records
    // `'ok'`; where the failed save's own rollback took it the store answers `JournalOpUnknown` and the
    // composition's floor reads `KC-8` in the ONE `outcome` entry (item 5 (b); item 6 (a)).
    attempt.checkpoint = null;
    terminal(kernel, attempt, KC.violated,
      typeof saveFailure.message === 'string'
        ? saveFailure.message
        : `the attempt's own save at ${JSON.stringify(attempt.address)} failed`);
    throw saveFailure;
  }
  // **THE `commit` ENTRY: THE ATTEMPT'S SUCCESS ARM, APPENDED ONCE, ON THIS ARM ALONE**
  // (`DEF-2026-10-16-B`; `kernel-surface.md §2.1` item 3's `LogKind` table — *"`commit` = the attempt's
  // success arm, appended once"*, its `id` `null`, its `opId` the attempt's last op, its `state` `null`;
  // `composition-and-states.md §2.7` items 5 and 7: *"one `constraint-check` entry per registered pair is
  // appended, THEN the `commit` entry"*). **THE SAVE HAS STOOD** — the call above returned and this arm was
  // not reached by the failed-save path — **SO IT IS APPENDED HERE AND ONLY HERE, AFTER every
  // `constraint-check` entry of the pass, AND IT CLOSES THE LOG**: it is the PASSED arm's LAST entry, and
  // the failing arm above appended its own ONE `outcome` entry and NO `commit` entry at all
  // (`kernel-surface.md §2.1` item 4 (ii); item 3's two rows read together — the two one-shot arms never
  // stand in one log). **AND NOTHING IS APPENDED TO THIS LOG AFTER IT**: the delivered set's bodies ran
  // before this line and reach this attempt's log by no act (`§2.7` item 6), the record this attempt's
  // report carries being the same list this line closes.
  append(attempt, 'commit', null, attempt.ops[attempt.ops.length - 1].opId,
    `every constraint registered at ${JSON.stringify(attempt.address)} passed; the commit stands`);
  return closed;
}

/**
 * **THE SEAM'S TERMINAL INSTANT, TAKEN AT THE ONE PLACE BOTH ARMS REACH** (`surface.md §2.4` item 9 (b);
 * `PAR-JS-19`; `A116` (D1)–(D2)): the record identity `K-2` answered, handed once more to THE INSTANCE'S
 * OWN `settle` member — the member the kernel CALLS and the entry IMPLEMENTS — so that the entry delivers
 * the residue standing in that record's `pending` at this instant through ITS OWN registry
 * (`§2.7` item 7 (a)–(b)). **A SECOND CALL FOR THE SAME IDENTITY IS THE DELIVERY** (`PAR-JS-19`'s
 * domain cell: *"the first call on this instance for a given identity IS the adoption, and the SECOND
 * call for that identity is the delivery"*), so the record this reads is the very record instant (a)
 * adopted and never a copy of it.
 *
 * **THE MEMBER IS REACHED WITH NO ADDON CALL AND NO STORE VERB**, on the caller's own instance object —
 * the same object every item of this surface takes first.
 */
function settleArm(store, attempt) {
  const record = attempt.record;
  if (record === undefined) return;
  if (typeof store.settle === 'function') store.settle(record);
}

/**
 * THE PASS LOOP OF ONE ATTEMPT — the first pass and, for EVERY repair the pass lands, the op's own
 * ATOMIC LANDING EVALUATION followed by THE RE-RUN.
 *
 * `attempt-lifecycle.md §2.4` item 5 (iv): a pass's evaluated set is EVERY PAIR STANDING AT THE
 * ATTEMPT'S OWN `address` WHEN THAT PASS BEGINS — the first pass and every re-run alike, the pairs that
 * had already run INCLUDED, the pair whose repair just ran INCLUDED and a pair whose repair is
 * registered but has not run INCLUDED — each evaluated ONCE in clause (ii)'s first-registration order,
 * with NO EXCLUSION AND NO SKIP.
 *
 * `kernel-surface.md §2.3` item 1 — the OTHER rule: "EVERY WRITE THAT LANDS AT AN ADDRESS THE KERNEL
 * REGISTERS PAIRS AT RUNS, AFTER THE WRITE VERB RETURNED AND BEFORE ANY OTHER KERNEL ACT, ONE PASS OVER
 * EVERY PAIR REGISTERED AT THAT ADDRESS against THAT ONE OP's value and tier, its `AttemptContext.op`
 * naming that op". A repair's own op is such a landing, and THIS is the arm "a repair's edit lands, the
 * re-run evaluates EVERY pair at the attempt's address against THAT op, and where one of those
 * evaluations does not return the pass arm THE ATTEMPT MOVES THROUGH THE RE-RUN'S OWN FOUR
 * COMBINATIONS" names — so the repair's op is evaluated BEFORE the re-run, and the checkpoint therefore
 * moves to THE REPAIR'S OWN OP.
 *
 * Returns `null` on the success arm, and the attempt's terminal arm otherwise.
 */
function runToCompletion(kernel, attempt) {
  for (;;) {
    // EVERY RUN READS THE ATTEMPT'S OWN SET, IN CLAUSE (ii)'s ORDER, AGAINST THE LANDING'S OWN OP:
    // `attempt-lifecycle.md §2.4` item 5 (iv) fixes ONE scope for the first pass and every re-run alike,
    // and `kernel-surface.md §2.3` item 1's atomic landing evaluation — whose own one home is that item —
    // is the arm a repair's op landing owes: "a repair's edit lands, the re-run evaluates EVERY pair at
    // the attempt's address against THAT op, and where one of those evaluations does not return the pass
    // arm THE ATTEMPT MOVES THROUGH THE RE-RUN'S OWN FOUR COMBINATIONS". So the op a repair landed becomes
    // THE NEXT RUN'S `op`, and every pair at the attempt's address — the pairs that had already run
    // included — is evaluated against it, with no exclusion and no skip. THE RUN'S LANDING IS THE
    // ATTEMPT'S LAST OP, AND THE RUN'S ADDRESS IS THAT OP'S OWN ADDRESS.
    const landing = attempt.ops[attempt.ops.length - 1];
    const run = evaluate(kernel, attempt, landing);
    if (run.terminal !== null) return run.terminal;
    if (!run.rerun) return null;
  }
}

/**
 * ONE EVALUATION RUN — a LANDING'S OWN PASS. `attempt-lifecycle.md §2.4` item 5 (iv): "a pass's evaluated
 * set is THE PAIRS STANDING AT THE ATTEMPT'S OWN `address` WHEN THAT PASS BEGINS … the first pass and
 * every re-run alike … the pairs that had already run INCLUDED, the pair whose repair just ran INCLUDED
 * and a pair whose repair is registered but has not run INCLUDED … each evaluated ONCE in clause (ii)'s
 * first-registration order, WITH NO EXCLUSION AND NO SKIP." Every run — the commit's own landing, the
 * repair's own landing and the re-run alike — therefore evaluates THAT ONE SET, against the op whose
 * landing it reads. Answers:
 *   `{ terminal }` — the attempt's terminal arm, an EXISTING `KC` member, where one was reached;
 *   `{ terminal: null, rerun: true }` — a repair landed and its op was added to the attempt;
 *   `{ terminal: null, rerun: false }` — the pass arm, the `checkpoint` member pinned at that op.
 */
function evaluate(kernel, attempt, landing) {
  // THE PASS'S OWN ADDRESS IS THE ATTEMPT'S (`attempt-lifecycle.md §2.4` item 5 (iv): "THE KERNEL
  // EVALUATES THE PAIRS IT REGISTERED AT THE ATTEMPT'S OWN ADDRESS — the first pass and every re-run
  // alike — and NOT the union of the store's prefix-selected addresses"), WHILE THE OP EVERY EVALUATION
  // CARRIES IS THE LANDING'S OWN — the repair's op where a repair's edit landed, and the attempt's first
  // write where the pass is the commit's own landing.
  // THE PASS'S OWN EVALUATED SET IS FIXED WHEN THE PASS BEGINS — a SNAPSHOT of the registry's rows for
  // the attempt's address AT THAT INSTANT, and never a live view of the registry this pass reads again:
  // "a PASS's evaluated set is FIXED WHEN THE PASS BEGINS — it is every pair registered at the attempt's
  // address AT THAT INSTANT, each evaluated once in clause (ii)'s order", so "A `K-1` THAT RETURNS
  // DURING A PASS APPENDS A PAIR TO THE REGISTRY WITHOUT APPENDING ANY ENTRY TO THAT PASS AND WITHOUT
  // BEING EVALUATED BY IT: the new pair enters the NEXT pass's set" (`attempt-lifecycle.md §2.4` item 5
  // (iv); `CX-12`). The snapshot is ALSO the set the layer (a) delivery of this run is read over.
  const standing = kernel.byAddress.get(addressToken(attempt.address));
  const list = standing === undefined ? undefined : standing.slice();
  // THE ATOMIC LANDING EVALUATION'S OWN ARM-TAKING IS `attempt-lifecycle.md §2.4` item 4's arms, read
  // over THE PAIR THAT FAILED AT THAT OP (`kernel-surface.md §2.3` item 1; `§2.4`: `KC-3` where that pair
  // is NOT in `ran` before this run and no repair is registered for it; `KC-6` where it IS in `ran` and
  // is NOT in `appliedRepairs`; `KC-5` where it IS in `ran` and IS in `appliedRepairs`; and arm (b)
  // where its repair is registered and has not run).
  //
  // `§2.4` ITEM 5 (ii)–(iii): "THE ATTEMPT TRANSITIONS AT THE FIRST EVALUATING PAIR WHOSE OUTCOME IS A
  // VIOLATION: THAT PAIR'S OWN ARM DECIDES WHAT HAPPENS NEXT", and "where two pairs of one pass would
  // violate, the FIRST in clause (ii)'s order decides and THE SECOND IS NOT EVALUATED". THE DECISION IS
  // THEREFORE TAKEN INSIDE THE LOOP AT THE FIRST VIOLATING PAIR WHATEVER ITS FORM: a return standing
  // OUTSIDE the three declared arms is READ AS the `{message}` arm (`PAR-C-5`; item 4's arm (c)
  // predicate), so it is a violation of exactly the same standing as the caller's own `{message}` arm
  // and is disposed of by the SAME predicates — NEVER carried to the end of the pass, where a later
  // pair's landed repair would supersede the arm the attempt took first.
  if (list !== undefined) {
    for (const key of list) {
      const pair = kernel.pairs.get(key);
      if (pair === undefined) continue;
      // `kernel-surface.md §2.3` item 1 — THE OP WHOSE LANDING LEFT THE STATE THIS EVALUATION RUNS AT,
      // VERBATIM, and the value that write returned, VERBATIM: "the data the constraint confirms".
      const op = landing;
      const context = {
        address: attempt.address.slice(),
        attempt: attempt.ref,
        op,
        tier: op.tier === undefined ? null : op.tier,
        value: op.after === undefined ? undefined : op.after.value,
      };

      // THE ENTRY IS OPENED BEFORE THE BODY RUNS, so a body that reads the record's own log mid-flight
      // reads its own evaluation's entry — and it is WITHDRAWN where the body returns nothing
      // (`kernel-surface.md §2.5` item 1; `PAR-C-6`).
      append(attempt, 'constraint-check', pair.id, op.opId, `the evaluation of ${pair.id}`);
      const check = attempt.log[attempt.log.length - 1];
      let outcome;
      try {
        outcome = pair.constraint(context);
      } catch (body) {
        // A body that threw returned nothing, so no `constraint-check` entry stands; the attempt is
        // closed and the BODY'S OWN THROWABLE reaches the caller unchanged and unconverted, carrying
        // no kernel state token at all (`PAR-C-6`; `NX-2`; `composition-and-states.md §2.7` item 13).
        withdraw(attempt, check);
        terminal(kernel, attempt, null, `the constraint ${pair.id} threw; the attempt is closed`);
        throw body;
      }

      // THE CONSTRAINT'S OWN OUTCOME — A CLOSED THREE-ARM SET (`PAR-C-5`). A value outside the three
      // arms is read as the `{message}` arm and never as an arm of its own.
      let text;
      let repair = null;
      if (outcome === true) {
        text = `the constraint ${pair.id} passed at ${JSON.stringify(attempt.address)}`;
      } else if (outcome !== null && typeof outcome === 'object' && 'message' in outcome) {
        text = typeof outcome.message === 'string' && outcome.message.length > 0
          ? outcome.message
          : unrecognized(pair);
        if ('repair' in outcome && typeof outcome.repair === 'function') repair = outcome.repair;
      } else {
        text = unrecognized(pair);
      }

      check.message = text;

      // THE VIOLATION ARMS (`attempt-lifecycle.md §2.4` item 4 (b)–(f)), read off THE PAIR THAT FAILED
      // and off nothing else. THE ONE DISCRIMINATOR IS THE PAIR'S OWN REGISTRY MEMBERSHIP READ AT THE
      // INSTANT BEFORE THIS EVALUATION, TOGETHER WITH `ran` (`kernel-surface.md §2.5` item 3;
      // `fail-surface.md §2`'s `KC-5`/`KC-6` rows): `KC-5` iff in `ran` AND in `appliedRepairs`;
      // `KC-6` iff in `ran` AND OUT of `appliedRepairs` — whether or not a repair is registered for the
      // pair, and NEVER off a repair-run COUNT.
      const ran = attempt.ran.includes(key);
      if (!ran) attempt.ran.push(key);
      if (outcome === true) continue;
      if (repair === null) {
        // ARMS (c), (e) AND (f) — THE PAIR'S FIRST-EVALUATION ARM AND ITS TWO REPEAT ARMS, taken
        // AT ONCE at the first violating pair whatever the form its return carried
        // (`attempt-lifecycle.md §2.4` item 4's disjointness rule and item 5 (ii)–(iii)). Arm (c)'s
        // predicate is "NOT in `ran` before this evaluation and no repair registered for it"; a pair
        // IN `ran` is a repeat and never this arm, so its own token is read first.
        if (ran) {
          return { terminal: attempt.appliedRepairs.includes(key)
            ? { status: KC.repairRepeat,
              message: `the pair ${pairKey(pair.address, pair.id)} violated a re-run and its repair had `
                + 'already been applied' }
            : { status: KC.repeat,
              message: `the pair ${pairKey(pair.address, pair.id)} violated a re-run and no repair had `
                + 'been applied to it' },
            rerun: false };
        }
        return { terminal: { status: KC.violated, message: text }, rerun: false };
      }
      // LIMB (f) — A REPEAT BY A PAIR WHOSE REGISTERED REPAIR HAS NOT RUN IS TAKEN HERE AND NOT BELOW:
      // "NO repair function is invoked a second time" (`P-SM-6`; `kernel-surface.md §2.5` item 3), the
      // pair's own registry membership and never a repair-run count being the discriminator.
      if (ran && !attempt.appliedRepairs.includes(key)) {
        return { terminal: { status: KC.repeat,
          message: `the pair ${pairKey(pair.address, pair.id)} violated a re-run and no repair had `
            + 'been applied to it' },
          rerun: false };
      }
      // LIMB (e) — THE PAIR'S REPAIR HAS ALREADY RUN AND IS RECORDED AS APPLIED, so the second repair is
      // never invoked and the repeat is `KC-5`.
      if (ran) {
        return { terminal: { status: KC.repairRepeat,
          message: `the pair ${pairKey(pair.address, pair.id)} violated a re-run and its repair had `
            + 'already been applied' },
          rerun: false };
      }

      // ARM (b) — THE PAIR'S REPAIR RUNS THROUGH THE CALLER'S OWN VERB, AND THE OP IT LANDED IS READ
      // OFF ITS OWN RETURN AND NOWHERE ELSE (`§2.7`). THE ENTRY'S `opId` IS THE ROW'S OWN VALUE FROM THE
      // INSTANT IT IS APPENDED — "THE OP THE REPAIR PRODUCED WHERE IT PRODUCED ONE, ELSE THE OP IT WAS
      // INVOKED FOR" (`kernel-surface.md §2.5` item 1's `repair-run` row) — so on EVERY arm the entry
      // names THE OP THIS EVALUATION CARRIED, and only the arm that produced an op rewrites it below.
      append(attempt, 'repair-run', pair.id, op.opId, 'the pair\'s repair was attempted');
      const entry = attempt.log[attempt.log.length - 1];
      let result;
      try {
        result = repair({
          address: attempt.address.slice(),
          id: pair.id,
          op,
          tier: context.tier,
          value: context.value,
          // **⟶ ADDED 2026-10-15 (`surface.md §2.11` clause 6; the architect's ruling of 2026-10-15;
          // `kernel-surface.md §2.3` item 2).** **THE REPAIR IS PASSED THE COMMIT IT IS PART OF**, and it is
          // passed THE ONE OBJECT THIS CALL HANDS IT — the context itself — *"so that they can make their
          // own write call use that commit"*: *"Repair functions are returned by the constraint that they
          // are triggered by. As externally-provided code, they should be using the package surface
          // functions, which means they will need to be passed the commit they are part of so that they can
          // make their own write call use that commit."* **THE FORM IS THE ONE `write`'s FIFTH POSITION
          // ADMITS**: its class test is *"an object position is a record position only where it CARRIES A
          // `pending` MEMBER whose value is present and not `undefined`"* (`§2.4` item 9 (g) item 1), and the
          // member this context carries is THE COMMIT'S OWN `pending`, VERBATIM — the record `K-2` returned,
          // the one `attempt.record` names, so the repair's write passes THE CONTEXT and the position reads
          // the commit it stands for. **IT IS A CLASS TEST AND NEVER AN IDENTITY TEST** (the position's own
          // clause), so a fresh list is handed and the record's own member is not aliased. **NO MEMBER OF
          // THE DECLARED FIVE IS MOVED**: `address` · `id` · `op` · `tier` · `value` stand as `§2.3` item 2
          // prints them, and the commit is carried beside them.
          pending: attempt.record === undefined ? [] : attempt.record.pending.slice(),
        });
      } catch (body) {
        // THE REPAIR-RUN ENTRY IS APPENDED BEFORE THE THROW, and the attempt's outcome entry carries
        // `KC-4` (`ck_states_a_repair_body_that_throws_reaches_the_caller_unconverted`).
        //
        // AND WHERE THE STORE'S OWN VERB REFUSED THE REPAIR'S EDIT, THE ENTRY'S `message` NAMES THE
        // STORE'S OWN CODE — `fail-surface.md §2`'s `KC-4` row's `observable` cell, read with `§1.2`
        // item 3: "THE KERNEL'S GENERIC DESCRIPTION OF THE ATTEMPTED REPAIR ALONE DOES NOT SATISFY IT,
        // AND THE CODE IS THE STORE'S OWN TOKEN — `WriteParentNotLink` in this unit's own repair window
        // — and never a kernel string and never a `KC` token." The body threw the store's own form up
        // through the kernel, so the code is read off that throwable's `status` and it is a STORE code
        // (the store's form is `{status, message}`, carrying no `log` member — `§1.2` item 2; the
        // kernel's own form carries three members, and a `KC` token is never named as a store code).
        // The entry's `state` stays `null`; the thrown form's `status` is `KC-4`.
        const storeCode = body !== null && typeof body === 'object'
          && typeof body.status === 'string'
          && body.status.length > 0
          && !('log' in body)
          && !KC_TOKENS.includes(body.status)
          ? body.status
          : null;
        if (storeCode !== null) {
          entry.message = `the repair ${pair.id} was attempted and the store refused its own edit — the `
            + `store's answer is ${storeCode}`;
          terminal(kernel, attempt, KC.repairFailed, entry.message);
          // **⟶ AND THE FORM THAT CROSSES TO THE CALLER IS THE KERNEL'S OWN** (`kernel-surface.md §2.3`
          // item 2 (iii): the attempt *"moves to `FAILING` with `KC-4`"*, and *"the thrown form's `status`
          // is NEVER a store member"*) — **the very form the FAILING arm above throws**, carrying the
          // store's own token in its MESSAGE and not in its `status` (§1.2 item 3). **A BODY WHOSE THROW
          // CARRIES NO STORE CODE REACHES THE CALLER UNCONVERTED**, below: the unconverted throw is that
          // body's own arm and this conversion is the refused-verb's.
          refuse(attempt.throwState, attempt.throwMessage, attempt.log);
        }
        terminal(kernel, attempt, KC.repairFailed, `the repair ${pair.id} threw; the attempt is closed`);
        throw body;
      }

      // THE REPAIR'S OWN RESULT — A CLOSED TWO-ARM SET (`PAR-C-8`), WHOSE SUCCESS ARM'S THIRD MEMBER
      // IS THE OP THE REPAIR LANDED. AN `ok === true` RETURN WHOSE `op` IS ABSENT, `undefined` OR NOT
      // THE OP THE REPAIR ACTUALLY LANDED HAS CARRIED NO OP AND IS THE APP'S OWN DEFECT: it is read as
      // a repair that produced no op, so it fails `KC-4` whether or not the pair's repair had been
      // recorded as applied (`§2.7`'s home; `§2.8`'s outside values; `A: docs/decisions.md` · `A110`).
      const ok = result !== null && typeof result === 'object' && result.ok === true;
      const produced = ok ? landedOp(attempt, result, op) : null;
      if (produced === null) {
        const carried = ok
          ? landedOpDefect(attempt, pair, result)
          : result !== null && typeof result === 'object' && result.ok === false
            && typeof result.message === 'string' && result.message.length > 0
            ? result.message
            : `the repair ${pair.id} produced no op at ${JSON.stringify(attempt.address)}`;
        entry.message = carried;
        return { terminal: { status: KC.repairFailed, message: carried }, rerun: false };
      }

      // THE OP THE REPAIR PRODUCED IS ADDED and the pair enters `appliedRepairs`. The attempt then
      // returns to the evaluation through THAT OP's OWN ATOMIC LANDING EVALUATION and the re-run.
      entry.opId = produced.opId;
      entry.message = `the repair ${pair.id} landed ${produced.opId}`;
      attempt.ops.push(produced);
      attempt.appliedRepairs.push(key);
      // THE LAYER (a) DELIVERY OF THIS RUN'S OWN HANDLES, ONE PER EVALUATED PAIR (`kernel-surface.md
      // §2.1` item 2; `§2.2` item 2): every handle this attempt's write returned that stands for a pair
      // THIS RUN evaluated has now been checked off as it passed — it was invoked in the kernel's own
      // window — so it leaves `CommitRecord.pending`, the member the caller's own loop reads its work
      // off, THAT LOOP BEING ONE INVOKER AMONG THE JS SURFACE'S ORDERED LAYERS AND NEVER THE ONLY ONE
      // (`A: docs/decisions.md` · `A112`). A handle whose pair this run did NOT evaluate STANDS IN THE
      // MEMBER for that caller's own loop, and is never delivered twice.
      releasePending(kernel, attempt, list);
      return { terminal: null, rerun: true };
    }
  }
  // A RUN THAT REACHES THIS LINE REACHED NO ARM INSIDE ITS LOOP: EVERY PAIR OF ITS OWN SNAPSHOT
  // RETURNED THE PASS ARM OR LANDED A REPAIR, and a landed repair returned `rerun: true` above, its op's
  // own landing evaluation following (`attempt-lifecycle.md §2.4` item 5 (i), (iv)).
  releasePending(kernel, attempt, list);
  // THE PASS ARM — EVERY PAIR OF THIS RUN'S OWN SET RETURNED THE PASS ARM, SO THE LANDING LEFT A VALID
  // STATE AND THE EVALUATION'S RESULT IS PINNED HERE, AT THE ATTEMPT'S OWN `checkpoint` MEMBER, AND AT
  // THAT LANDING'S OP (`composition-and-states.md §2.6` item 8 (i)–(ii), (iii); `kernel-surface.md §2.3`
  // item 1). A run whose pair set is EMPTY is still a pair set: it returns the pass arm vacuously and
  // PINS THE MEMBER AT THAT LANDING'S OP, so the `null` arm of item 8 (iii) is never that arm.
  //
  // AND THE VALUE IS ADDRESS-WIDE: THE CHECKPOINT IS "THE `opId` OF THE LAST LANDING THAT LEFT EVERY
  // REGISTERED PAIR AT THE ATTEMPT'S OWN ADDRESS PASSING", so the pin belongs to the attempt's ADDRESS —
  // a landing BESIDE it (a repair's op at a descendant address, whose pair set this attempt's scope does
  // not reach) pins no member of this attempt and moves nothing (`§2.6` item 8 (i)'s foreign-landing
  // clause; `VD-3`; `VD-6`). A violation arm returned above and therefore LEAVES THE MEMBER UNMOVED, so
  // an earlier pin survives a later landing that failed.
  if (addressToken(landing.address) === addressToken(attempt.address)) attempt.checkpoint = landing.opId;
  return { terminal: null, rerun: false };
}

/**
 * A RUN'S OWN LAYER (a) DELIVERY — one per evaluated pair, each carrying that pair's own function
 * (`kernel-surface.md §2.1` item 2; `§2.2` item 2). The handle each evaluated pair's registration stands
 * behind has now been invoked in the kernel's own window — THE PAIR'S PASS HAS CHECKED IT OFF AS IT
 * PASSED — so it has left the member BY ITS OWN PASS and it STILL STANDS in `triggered`, the store's own
 * returned set, which no removal ever reaches (`A: docs/decisions.md` · `A112`).
 *
 * **AND THE CHECK-OFF REMOVES EVERY OCCURRENCE OF THE IDENTITY IT EVALUATED — the entry's OWN pass is
 * the removal's warrant** (`surface.md §2.7` item 7 (a): the member is the returned set *"MINUS the
 * entries the pass checked off as they passed … AND MINUS NOTHING ELSE"*; `§2.4` item 8 (c): a body of
 * a checked-off identity run at the delivery instant is a FAILURE of that item). **THE SINGLE-OCCURRENCE
 * REMOVAL THIS SITE ONCE SHIPPED — `indexOf` + `splice`, one entry per evaluated pair — LEFT ONE
 * OCCURRENCE STANDING WHERE THE STORE'S OWN LIST CARRIED THAT IDENTITY TWICE** (the lawful
 * caller-spelled duplicate: two construction entries at one address carrying the caller's same token
 * resolve to ONE home entry and ONE handle, which the store returns TWICE — `DD-42` clause 3; `DD-39`;
 * `surface.md §2.4`'s dated clause (ii); `PAR-JS-15`), **so the residue delivered that identity's
 * function a second time AT THE DELIVERY INSTANT — an entry the pass checked off, delivered.** **THE
 * DISCARD BESIDE THIS SITE ALREADY REMOVES BY THE SET (`terminal`'s `filter` against the failed write's
 * own returned set, `:892`), and the check-off now removes by the identity it evaluated** — ONE warrant,
 * every occurrence of it, and NO occurrence counts as a second entry for a set the pass has passed.
 *
 * **⟶ AND WHAT THE CHECK-OFF CONSUMED IS RECORDED AS IT IS TAKEN** (`docs/decisions.md` · `A117` (D5)):
 * the removal below is `A117`'s *"check-off consumes the evaluated pair's own delivery of that identity"*
 * and it is NOT *"that identity's whole owed delivery"* — so the identity it took is pushed onto the
 * attempt's own `checkedOff` list, which the PASSING arm publishes onto the record (`publishCheckedOff`)
 * for the terminal arm's delivery to resolve exactly as it resolves the residue. **THE REMOVAL ITSELF IS
 * UNTOUCHED BY THE RECORDING** — same warrant, same by-identity extent, same member, `pending`-based
 * assertions intact.
 */
function releasePending(kernel, attempt, keys) {
  const record = attempt.record;
  if (record === undefined || keys === undefined) return;
  for (const key of keys) {
    const handle = kernel.handles.get(key);
    if (handle === undefined) continue;
    record.pending = record.pending.filter((h) => h !== handle);
    if (!attempt.checkedOff.includes(handle)) attempt.checkedOff.push(handle);
  }
}

/**
 * **THE PASSING ARM'S OWN PUBLICATION — `A117` (D5)'s finding PLACED ON THE RECORD THE TERMINAL ARM
 * HANDS TO THE INSTANCE'S SEAM.**
 *
 * It is called at `runAttempt`'s success arm, AFTER the attempt is CLOSED and BEFORE `settleArm`, and it
 * is called THERE and on NO FAILING ARM (`terminal`'s arm reaches none of this): on a write that fails on
 * constraints the other listeners are DISCARDED (`§2.7` item 6 read at item 7 (d); `A114` (D1)/(D2)), so
 * the arm's residue is empty AND a checked-off identity stands for NO delivery, its body never run — the
 * failing arm stays `0` of the failed write's own set and `0` for the identity too.
 *
 * **THE KEY IS A SYMBOL** (`CHECKED_OFF` above): `CommitRecord` keeps its four members (`A117` (D6)), the
 * record's enumerable shape does not move, and every census that reads a record's members reads them
 * through the same four.
 */
function publishCheckedOff(attempt) {
  const record = attempt.record;
  if (record === undefined || attempt.checkedOff.length === 0) return;
  Object.defineProperty(record, CHECKED_OFF, {
    value: attempt.checkedOff.slice(),
    enumerable: false,
    configurable: true,
    writable: true,
  });
}

/** `PAR-C-5`'s outside value, read as the `{message}` arm with the KERNEL's own generated sentence. */
function unrecognized(pair) {
  return `the constraint ${pair.id} returned a value outside the three declared outcome arms at `
    + `${JSON.stringify(pair.address)}`;
}

/**
 * The attempt reference a READER was handed — THE `AttemptRef` RECORD OR ITS `id` STRING AND NOTHING
 * ELSE (`attempt-lifecycle.md §2.4` item 1: "`K-4`/`K-5` accept either the `AttemptRef` record or its
 * `id` string and NOTHING ELSE"; `parameter-semantics.md §2.15`). A `CommitRecord` is NOT an
 * `AttemptRef` — it carries four members, its `attempt` among them — so a reference that is neither of
 * the two declared forms is `null` here and is refused `KC-2` by the caller, never answered out of the
 * live map and never reaching `KC-7`'s subject.
 */
function attemptIdOf(reference) {
  if (typeof reference === 'string') return reference;
  if (reference !== null && typeof reference === 'object' && typeof reference.id === 'string') {
    return reference.id;
  }
  return null;
}

/** `K-3`'S OWN ARGUMENT IS THE `CommitRecord` `K-2` RETURNED (`kernel-surface.md §2.1` item 2), and the
 *  attempt it names is the `AttemptRef` that record carries. */
function commitAttemptIdOf(commitRecord) {
  if (commitRecord !== null && typeof commitRecord === 'object'
      && commitRecord.attempt !== null && typeof commitRecord.attempt === 'object'
      && typeof commitRecord.attempt.id === 'string') {
    return commitRecord.attempt.id;
  }
  return attemptIdOf(commitRecord);
}

/**
 * THE TERMINAL ACT (`attempt-lifecycle.md §2.4` item 3's terminal-arm clause; item 7;
 * `composition-and-states.md §2.7` item 13): the per-op rollback composition runs FIRST, then the
 * attempt's final record is placed in the closed store.
 *
 * THE THROWN FORM'S `status` AND THE `outcome` ENTRY'S `state` ARE ONE TOKEN, and where a still-owed
 * op's own call meets a compacted base the composition's own answer is `KC-8` — that token being both
 * the arm's and the entry's (`composition-and-states.md §2.6` items 5 (b) and 6 (a), (iv);
 * `fail-surface.md §2`'s `KC-8` row). The CONSTRAINT-body path passes `null` and its entry's `state` is
 * `null`; the repair-body path passes `KC-4`'s token.
 *
 * AND THE ATTEMPT-RECORD ENTRY THE ADDRESS WAS HELD BY IS REMOVED ON EVERY TERMINAL ARM, the standing
 * remainder being THE COMMIT REGISTRY'S OWN ENTRY and never that open `AttemptRecord` entry
 * (`§2.4` item 3's terminal-arm clause; item 8 (i) (3); `contract.md §5.2`'s retain row) — so a fresh
 * `K-2` at that address RETURNS a `CommitRecord` and is never refused `KC-7`, whose own subject is the
 * attempt that IS live.
 */
function terminal(kernel, attempt, status, message) {
  const floor = composeRollback(kernel, attempt);
  // THE COMPOSITION'S OWN FLOOR, TAKEN OFF THE MEMBER IT WAS DECIDED ON (`composition-and-states.md
  // §2.6` item 5 (b)): a still-owed op's call meeting either floor code makes the arm `KC-8` WHATEVER
  // the pass's own arm was, and nothing is restored (item 6 (a), (c)).
  const finalStatus = floor === null ? status : KC.rollbackFloor;
  const finalMessage = floor === null
    ? message
    : `the per-op rollback met the store's own ${floor.code} at ${floor.opId}`;
  // THE `outcome` ENTRY — appended ONCE, and `state` is THE ARM'S ONE TOKEN: the floor is answered IN THIS
  // SAME ENTRY where the attempt would also have had a failure arm, and NO SECOND ENTRY IS APPENDED
  // (`kernel-surface.md §2.5` item 1's kind table; `§2.6` item 6 (a), (b)).
  append(attempt, 'outcome', null, attempt.ops[attempt.ops.length - 1].opId, finalMessage, finalStatus);
  // THE DISCARD RULE, AT ITS ONE OBSERVABLE (`attempt-lifecycle.md §2.4` item 8 (i) (5), read with
  // `kernel-surface.md §2.1` item 2's discarded-set clause; `A: docs/decisions.md` · `A112`): where the
  // attempt's own write FAILED the registered constraints at its landing and could not be repaired, its
  // composition is ROLLED BACK and THE DISCARD ACTS ON THAT WRITE'S OWN RETURNED SET AND REACHES EVERY
  // HANDLE OF IT — no handle of that write being delivered by either layer — WHILE AN ENTRY FOR A HANDLE
  // OF ANY OTHER WRITE STANDS, the whole-member clear being WITHDRAWN BY NAME AS THE SECOND, UNLAWFUL
  // REMOVAL. THE FAILED WRITE'S OWN RETURNED SET IS READ OFF THE WRITE ITSELF (`attempt.write`'s own
  // `triggered`, the record's `triggered` member VERBATIM) AND NEVER DERIVED FROM THE ATTEMPT'S ADDRESS OR FROM THE
  // AUTHOR OF ANY REGISTRATION: the store's own trigger selection is prefix-inclusive, so a handle it
  // returned for a registration at a PREFIX address IS a member of THIS write's returned set and LEAVES
  // with every other handle of it, its pair being one NO pass of this attempt evaluates and no check-off
  // therefore reaching it. An entry for a handle THIS WRITE DID NOT RETURN — which is what "an entry for
  // a handle of any other write" means — STANDS. So this is the ONE
  // REMOVAL PER ARM beside a check-off, and a body already run is never un-run; a PASSING attempt
  // discards nothing (its own removals are the check-offs `releasePending` performs), and the member is
  // NEVER cleared as a whole.
  if (attempt.record !== undefined) {
    const returnedSet = attempt.write.triggered;
    attempt.record.pending = attempt.record.pending.filter((h) => !returnedSet.includes(h));
  }
  attempt.status = 'closed';
  attempt.throwState = finalStatus;
  attempt.throwMessage = finalMessage;
  attempt.report = {
    attempt: attempt.ref,
    // THE `outcome` MEMBER IS THE ATTEMPT'S OWN TWO-ARM ANSWER — `'passed'` or `'failed'` — and NEVER
    // the arm's `KC` token, which belongs to the thrown form's `status` and to the `outcome` ENTRY's
    // `state` (`PAR-C-5`'s observable: "its terminal record placed with `outcome: 'failed'`"; the two
    // members read the same token string only in `status`/`state`, `fail-surface.md §1.1` item 1 (c)).
    outcome: 'failed',
    ops: attempt.ops.slice(),
    log: attempt.log,
    rollback: attempt.rollback.slice(),
  };
  CLOSED.set(attempt.ref.id, attempt.report);
  release(kernel, attempt);
}

/**
 * THE ONE REMOVAL EVERY TERMINAL ARM OWES (`attempt-lifecycle.md §2.4` item 3; `composition-and-states.md
 * §2.7` item 13): the attempt's OPEN-RECORD entry — the entry the address was HELD by — is removed, so
 * the address is left FREE and a fresh `K-2` there RETURNS rather than being refused `KC-7`. What is
 * retained is the CLOSED record (`K-4`/`K-5`'s arm) and, behind it, the commit registry's own entry —
 * and NOT this map's.
 */
function release(kernel, attempt) {
  LIVE.delete(attempt.ref.id);
  kernel.held.delete(addressToken(attempt.address));
}

/** The success arm's own bookkeeping, shared with `terminal`'s removal rule. */
function close(kernel, attempt, outcome) {
  attempt.status = 'closed';
  const report = {
    attempt: attempt.ref,
    outcome,
    ops: attempt.ops.slice(),
    log: attempt.log,
    rollback: [],
  };
  attempt.report = report;
  CLOSED.set(attempt.ref.id, report);
  release(kernel, attempt);
  return report;
}

/**
 * `composition-and-states.md §2.6` ITEM 2, ITEM 5 (a) AND ITEM 8 (iii) — THE PER-OP ROLLBACK COMPOSITION.
 *
 * THE CALL LIST IS ITEM 2'S OWN ON BOTH ARMS — `A111`'s RE-SPELLING, WHICH SUPERSEDES BY NAME THE
 * SINGLE-OP READING OF ITEM 8 (iii)'S *"THE ATTEMPT'S FIRST OP ALONE"* SENTENCE — AND THE KERNEL ISSUES
 * ONE CALL PER STILL-OWED OP: THE NUMBER OF CALLS ISSUED IS THE NUMBER OF STEPS RECORDED (item 5 (a)
 * (i), item 3).
 *
 * (1) THE ORDER (item 2, declared by the kernel and by nothing store-side): **the repaired ops
 *     first, in REVERSE of the order they were created, and the attempt's first write's op LAST** —
 *     "so the composition is `ops` minus its first entry, reversed, then that first entry last, and the
 *     order is TOTAL over `ops`". SO THE CALL LIST'S FIRST CALL IS THE LIST'S LAST ENTRY — THE ATTEMPT'S
 *     OWN FIRST OP. AND WHERE THE `checkpoint` MEMBER NAMES AN OP THE LIST IS FIXED AT COMPOSITION TIME
 *     AS `ops` UP TO AND EXCLUDING THAT OP, REVERSED; THE STOP OP IS NEVER PASSED, because no call is
 *     issued over the `checkpoint` op or over anything at or before it (item 4's reach/stop clause,
 *     item 5 (b)) — and the `checkpoint` op is not a member of the list, not an op the walk re-shapes it
 *     against.
 *
 * (2) AN OP AN EARLIER RETURNED CALL'S OWN `undoneOps` MEMBER ALREADY REPORTS UNDONE IS NOT A STILL-OWED
 *     OP: the kernel ISSUES NO CALL over it and records NO step for it (item 5 (a)'s skip clause and its
 *     `VF-10` bullet, whose worked case is the live run's own `E2E-C-2.7`, where the second call over an
 *     op the first call had already reversed was answered `RollbackCompacted` and left the address's
 *     entry standing). THE PREDICATE IS THE STORE'S OWN MEMBER AND NEVER AN INFERENCE ABOUT WHAT A LATER
 *     CALL WOULD DO, and `performed` holds it: the `opId`s EARLIER RETURNED CALLS REPEATED — a THROWING
 *     call undoes nothing (`undoneOps: []`), so it can never put an op on that list. THE STEP COUNT IS
 *     THEREFORE THE CALLS ISSUED AND MAY RUN BELOW THE LIST'S SIZE.
 *
 * SO THE WALK NEVER STOPS SHORT OF AN OP IT STILL OWES: `failed` is THAT CALL'S OWN ANSWER (`true` iff
 * it threw), a `true` step carries no claim that the walk stopped, and an op the walk never reached
 * carries no step at all because no call was issued over it.
 *
 * THE ONE MEMBER THE STORE'S OWN REPORT IS READ FOR BESIDE THE SKIP IS THE FLOOR (`item 5 (b)`): an op
 * the composition STILL OWES — one whose `opId` stands in NO earlier step's `undoneOps` member — whose
 * call fails either floor code is `KC-8`. `KC-8` is answered in the attempt's ONE `outcome` entry,
 * naming the store's own code, and the composition STOPS at that failing call: no call is issued over an
 * op after it (item 6 (a); `fail-surface.md §2`'s `KC-8` row).
 *
 * EACH STEP'S MEMBERS ARE THE STORE'S OWN (`§2.6` item 3): `answer` is THE LITERAL `'ok'` where the call
 * RETURNED and THE STORE'S OWN CODE where it THREW; `undoneOps` is the store's own report of the
 * reversals it performed, and `[]` on the throwing arm, where nothing was undone; `restoredTo` is the
 * store's `RollbackResult.restoredTo` on the returning arm and, on the throwing arm, THE STATE THE NAMED
 * OP'S OWN SUBTREE STOOD AT read through the store's own `read` verb — a TWO-MEMBER `BaseState` on BOTH
 * arms; and `checkpoint` is the attempt's ONE value, on every step of the attempt.
 */
function composeRollback(kernel, attempt) {
  // (1) THE CALL LIST, FIXED WHEN THE COMPOSITION BEGINS AND IN ITEM 2'S OWN ORDER ON BOTH ARMS: `ops`
  // up to and excluding the `checkpoint` op where the member NAMES one (so the stop op is no member of
  // the list at all), REVERSED — the repaired ops in reverse of their creation and THE FIRST WRITE'S OP
  // LAST. Where the member is `null` the list is the whole of `ops` under that same order.
  const callList = [];
  for (const op of attempt.ops) {
    if (attempt.checkpoint !== null && op.opId === attempt.checkpoint) break;
    callList.push(op);
  }
  callList.reverse();
  // THE REVERSALS EARLIER RETURNED CALLS PERFORMED — the store's own reports, the only member item 5's
  // "still owes" predicate (and item 5 (a)'s skip) is decided by.
  const performed = [];
  let floor = null;
  for (const op of callList) {
    const owed = !performed.includes(op.opId);
    // (2) THE SKIP: an op an earlier returned call's own `undoneOps` already reports undone is not still
    // owed, so NO call is issued over it and no step stands for it (item 5 (a)).
    if (!owed) continue;
    let answer = 'ok';
    let failed = false;
    let record = null;
    try {
      record = storeRollback(attempt.store, op.opId);
    } catch (thrown) {
      failed = true;
      answer = thrown !== null && typeof thrown === 'object' && typeof thrown.status === 'string'
        ? thrown.status
        : 'the call threw';
    }
    if (failed && floor === null && STORE_FLOOR_CODES.includes(answer)) {
      floor = { opId: op.opId, code: answer };
    }
    const undoneOps = record !== null && Array.isArray(record.undoneOps) ? record.undoneOps : [];
    attempt.rollback.push({
      opId: op.opId,
      answer,
      failed,
      undoneOps,
      // THE THROWING ARM CANNOT READ A RETURNED `RollbackResult`: the state stands at the NAMED OP's own
      // subtree, read at the store's own verb (item 3).
      restoredTo: record !== null && record.restoredTo !== undefined && record.restoredTo !== null
        ? record.restoredTo
        : baseState(attempt.store, op.address),
      checkpoint: attempt.checkpoint,
    });
    for (const undone of undoneOps) {
      if (!performed.includes(undone)) performed.push(undone);
    }
    // AND THE WALK STOPS AT THE FAILING CALL: a call that met either floor code is the composition's
    // LAST — "the walk STOPS at the failing call" (`§2.6` item 6 (a); `fail-surface.md §2`'s `KC-8`
    // row), so no call is issued over an op after it and none of those ops carries a step.
    if (floor !== null) break;
  }
  return floor;
}

/**
 * THE STORE'S OWN BASE STATE AT ONE ADDRESS, READ THROUGH THE STORE'S OWN VERB (`composition-and-states.md
 * §2.6` item 3: the state that address stands at once the call has returned, read through the store's own
 * `read`). BOTH members are always carried: a state that is not present carries `value` as `undefined`,
 * so the two-member shape never depends on the arm the call took.
 */
function baseState(store, address) {
  try {
    return { present: true, value: storeRead(store, address) };
  } catch (refused) {
    // `AddressNotFound` is the store's own arm for an address that stands nowhere: ABSENT, and still
    // the declared two-member `BaseState`.
    return { present: false, value: undefined };
  }
}

// ---------------------------------------------------------------------------------------------
// `K-4` `log(store, attempt) -> LogEntry[]` — the attempt's own log, OPEN or CLOSED alike.
// ---------------------------------------------------------------------------------------------
export function log(store, reference) {
  const id = attemptIdOf(reference);
  const live = LIVE.get(id);
  if (live !== undefined) return live.log;
  const closed = CLOSED.get(id);
  if (closed !== undefined) return closed.log;
  refuse(KC.arg, `no constraint attempt answers to ${id}`, []);
}

// ---------------------------------------------------------------------------------------------
// `K-5` `report(store, attempt) -> AttemptReport`
// ---------------------------------------------------------------------------------------------
export function report(store, reference) {
  const id = attemptIdOf(reference);
  const live = LIVE.get(id);
  if (live !== undefined) {
    // `K-5` OVER AN ATTEMPT THAT IS STILL OPEN IS `KC-7` — "which is how a drive reads that the attempt
    // IS live" (`kernel-surface.md §2.1` item 5; `fail-surface.md §2`'s `KC-7` row). THIS IS THE MEMBER
    // THE OPEN ATTEMPT ANSWERS WITH AND NOT `KC-2`: a live record carries no final report at all, so an
    // open record is refused whether the attempt is mid-run or has not yet begun.
    refuse(KC.attemptOpen, `the constraint attempt ${id} is still open`, []);
  }
  const closed = CLOSED.get(id);
  if (closed !== undefined) return closed;
  // AN UNKNOWN REFERENCE IS KC-2 AND NEVER KC-7 (`kernel-surface.md §2.1` item 5).
  refuse(KC.arg, `no constraint attempt answers to ${id}`, []);
}
