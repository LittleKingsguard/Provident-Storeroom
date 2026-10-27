// `D-13` (`docs/L1/kernel-subdivision.md` §1 part `9a`) — the kernel's foundations: bytes moved from `bindings/js/src/constraint-kernel.mjs`; no logic changed.
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
// `A110`): **NOTHING** — no `createRequire`, no addon path, no native module and no dependency of the
// module's own. Every op this kernel credits is an op the caller's own instance's verb calls answered.
//
// **⟶ AND THE ENTRY IS NOT IMPORTED EITHER, FROM 2026-10-16 ON `A127` (`surface.md §2.9` item 1's and
// `§2.4` item 9 (f)'s `A127` clauses).** The import that stood here — `{ write, rollback, read }` from
// `'provident-storeroom'` — is REMOVED WITH THE TEN NAMES IT NAMED (`11 → 1` ✓): **the module namespace
// carries ONE name, `storeCreate`, and every store-reaching act is a METHOD of the object it returned**, so
// this module reaches the store through the caller's own instance's members and through nothing else (the
// fourth position's record included — `store.write(address, tier, value, record)`). **ORDINAL CORRECTED
// 2026-10-21: the old "fifth" was the retired `call(instance, verb, args)` dispatcher's ARRAY frame (that
// dispatcher deleted at `export-set-and-dispatch.md §2`), and the per-verb entries' surplus trailing
// parameter has since been removed, so `write`'s commit position is the FOURTH of the method's four
// positions — `surface.md §2.2`: `a.write(address, tier, value, commit?)`.** **THE KERNEL'S OWN
// IMPORT FOOTPRINT IS THEREFORE EMPTY, WHICH IS WHAT THIS HEADER HAS DECLARED ALL ALONG** (`§1` item 1;
// the paragraph at `THE REPAIR'S OWN OP` below, whose *"the caller's own instance is the only way it ever
// reaches the store"* is now the code and no longer only the sentence).

// ---------------------------------------------------------------------------------------------
// `fail-surface.md §2` — THE KERNEL'S OWN CLOSED STATE SET, `8` MEMBERS AND NO NINTH.
// ---------------------------------------------------------------------------------------------
// `fail-surface.md §1.1` ITEM 1 (a) — THE ONE SPELLING, AND IT IS THE TOKEN: a refusal's `status` carries
// `KC-1`…`KC-8` and NOTHING ELSE. The full names (`ConstraintViolated` …) are LABELS: they keep exactly
// one declared use — the `name` column of `§2`'s table, and a citation beside a token — and NO clause
// spells a member's VALUE as a name. `status` and `LogEntry.state` therefore read THE SAME TOKEN STRING,
// related by IDENTITY (`§1.1` item 1 (c)). THE CENSUS DOES NOT MOVE: `8` members (`2 + 2 + 2 + 1 + 1`)
// on `13` sites (`1 + 4 + 4 + 3 + 1`).
export const KC = {
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
export const KC_TOKENS = Object.values(KC);

/**
 * `composition-and-states.md §2.6` item 5 (b) — THE COMPOSITION'S TWO FLOOR CODES, AND THE WHOLE OF THAT
 * PART: "AN OP THE COMPOSITION STILL OWES WHOSE CALL FAILS EITHER FLOOR CODE — `RollbackCompacted` OR
 * `JournalOpUnknown` — IS `KC-8`". The step's `answer` carries THE STORE'S OWN CODE on the throwing arm
 * (item 3), so the floor is read off the step's own `answer` and off no other member.
 */
export const STORE_FLOOR_CODES = ['RollbackCompacted', 'JournalOpUnknown'];

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
export const SETTLED_ON_THE_PASSING_ARM = Symbol.for('provident-storeroom.settled-on-the-passing-arm');

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
export const SAVE_FAILED_AT_THE_TERMINAL_ARM = Symbol.for('provident-storeroom.save-failed-at-the-terminal-arm');

/** `fail-surface.md §1.1` — ONE THROWN PLAIN OBJECT, EXACTLY THREE MEMBERS, NEVER AN `Error`. */
export const KERNEL_REFUSAL = Symbol.for('provident-storeroom.kernel-refusal');

/// **⟶ ADDED 2026-10-18 — THE TERMINAL ARM'S CHANNEL, SPELLED ON THIS SIDE TOO** (`docs/specs/storeroom-js/
/// surface.md §2.7`'s clause of 2026-10-18, item `2`; `§2.4` item 9's `REMOVED-WHOLE` pointer of the
/// same date). **`settle` WAS THE CHANNEL AND IS NO LONGER A MEMBER OF THE PRODUCT; THE TERMINAL ARM'S ACT
/// IS STILL THE ENTRY'S TO PERFORM** — `§2.11` clause 2's `file`-tier save and `§2.7` item `7`'s
/// residue delivery — **so this module reaches it under a `Symbol.for` key, exactly as it reaches the two
/// record marks above.** **NO KERNEL ITEM IS MINTED** (`§1` item 2: the extent stays FIVE) **and NO MEMBER IS
/// ADDED** to the product (`§2.4` item 9 (f): TWELVE own members, *"AND NOTHING ELSE"*): the key is
/// invisible to `Object.keys` and to `Object.getOwnPropertyNames` (`A117` (D6)).
export const TERMINAL_ARM = Symbol.for('provident-storeroom.terminal-arm');
export function refuse(status, message, log) {
  throw {
    status,
    message,
    log: log === undefined ? [] : log,
    [KERNEL_REFUSAL]: true,
  };
}

/**
 * **⟶ ADDED 2026-10-26 ON THE ARCHITECT'S RULING (`DEF-S`, VERBATIM: *"Expand the returned error set for both
 * S/N"*) — THE MARK THIS KERNEL SETS ON A VALUE **IT** CAUGHT FROM A CONSTRAINT BODY.**
 *
 * **WHY A MARK IS THE WHOLE OF THE FIX, AND NOT A SHAPE TEST AT THE CROSSING.** The entry's
 * `registrationCrossing` and `constraintCrossing` re-throw an UNMARKED value as itself, and that is
 * `DEF-A`'s protection: *a caller's shaped `{status, message}` must never be answered as the package's
 * refusal.* **So the crossing cannot tell a body's own throw from a FORGED object by looking at members — the
 * forged object carries every member the body's `Error` does not — and the only thing that can tell them
 * apart is WHO CAUGHT IT.** That is this function: it is called from the three frames that invoke a
 * caller-authored CONSTRAINT BODY (`register`'s registration evaluation, its synthetic attempt's re-run, and
 * a landing's pass), and from nowhere else. **A REPAIR BODY'S THROW IS NOT MARKED**: `fail-surface.md §1.1`
 * item 5's *"untouched and unconverted"* arm for it is unmoved by this pass, and the kernel-level cells that
 * pin it (`ck_states` / `ck_neg_10` / `ck_p_neg_17`'s arm 2) keep their identity assertion whole.
 *
 * **THE IDIOM IS `DEF-A`'S OWN: a `Symbol.for` key both sides spell** (`KERNEL_REFUSAL` above;
 * `SETTLED_ON_THE_PASSING_ARM`; `SAVE_FAILED_AT_THE_TERMINAL_ARM`), so the entry imports no kernel and the
 * kernel imports no entry, and `Object.keys` on the thrown value is unmoved — the mark is invisible to every
 * census of the member set. **WHAT THE VALUE UNDER THE KEY IS, AND WHY BOTH FACTS TRAVEL ON ONE KEY:** it is
 * a null-prototype record `{ address, log }` — the pair's own address spelling (the `<SEGMENT>` slot the
 * `§8.2` clause prints) and the log AS IT STOOD WHEN THE BODY THREW (`§2.5` item 4's timing trap, taken
 * before the attempt is disposed of). **THE MARK'S PRESENCE IS THE IDENTITY; THE TWO MEMBERS ARE THE
 * CROSSING'S SLOTS.** A mark that carried no slots would force the entry to author a sentence it holds no
 * subject for, which `DD-52` forbids.
 *
 * **AN OBJECT KEEPS ITS OWN IDENTITY AND IS MARKED IN PLACE** — `caught === thrown` still holds for it at
 * this layer, which is what the kernel-level cells assert. **A PRIMITIVE CANNOT CARRY A MEMBER**, so it
 * crosses as this frame's own carrier `{ value: thrown, [CONSTRAINT_BODY_THREW]: … }` (and so does a value
 * whose mark cannot be set — a frozen or sealed object, or a `Proxy` whose `defineProperty` trap refuses):
 * the carrier is the kernel's value, the mark is on it, and the entry reads the mark and never the `value`
 * member. **NO MEMBER OF THE CALLER'S OWN FORM IS FORGED, RENAMED OR DROPPED.**
 */
export const CONSTRAINT_BODY_THREW = Symbol.for('provident-storeroom.constraint-body-threw');

/// **THE MARK'S ONE WRITER** — called only from the frames that invoke a caller-authored CONSTRAINT body.
/// `address` is the pair's own address (the place the body was evaluated) and `log` the attempt's log where
/// one stands at the instant of the throw, `[]` where none does (a registration opens no attempt before its
/// body returns).
export function markBodyThrow(thrown, address, log) {
  const carried = Object.create(null);
  carried.address = address.map((segment) => String(segment)).join('/');
  carried.log = Array.isArray(log) ? log : [];
  const isObject = thrown !== null && (typeof thrown === 'object' || typeof thrown === 'function');
  if (isObject === false) return { value: thrown, [CONSTRAINT_BODY_THREW]: carried };
  try {
    // **THE MARK IS A SYMBOL-KEYED OWN MEMBER, DEFINED AND NOT ASSIGNED**: `[[Set]]` walks the chain and a
    // caller's prototype could divert it, exactly as `appendOwn`'s clause reads (`refusal.mjs`).
    Object.defineProperty(thrown, CONSTRAINT_BODY_THREW, {
      value: carried,
      writable: true,
      enumerable: false,
      configurable: true,
    });
    return thrown;
  } catch {
    // A FROZEN, SEALED OR TRAP-REFUSING VALUE CANNOT CARRY THE MARK, so the mark travels on this frame's own
    // carrier and the caller's value travels beside it under `value`.
    return { value: thrown, [CONSTRAINT_BODY_THREW]: carried };
  }
}

/// **WHETHER A VALUE IS A REFUSAL THIS KERNEL BUILT** — the entry's crossing and this kernel's own repair
/// arm both ask this and nothing else.
///
/// **IT IS NOT AN EXPORT, AND THE REASON IS THE SPEC'S OWN CLOSED COUNT:** `kernel-surface.md §1` item 2
/// declares the module's export set as **EXACTLY the five `K-1`–`K-5` items** — *"the kernel exports no
/// route, no addon handle and no sixth name"* — so a predicate exported from here would be a SIXTH NAME and
/// a FINDING. **The mark is therefore read through the `Symbol.for` key itself, which both sides spell**
/// (`KERNEL_REFUSAL` above), and the fact travels on the VALUE rather than in the module's namespace —
/// exactly as `SETTLED_ON_THE_PASSING_ARM` and `SAVE_FAILED_AT_THE_TERMINAL_ARM` already travel.
export function isKernelRefusal(value) {
  return value !== null && typeof value === 'object' && value[KERNEL_REFUSAL] === true;
}

// ---------------------------------------------------------------------------------------------
// `PAR-C-1` — THE REGISTRATION KEY'S `address`: the store's own domain, unchanged and not
// re-declared here.
// ---------------------------------------------------------------------------------------------
export function inDomainAddress(address) {
  if (!Array.isArray(address)) return false;
  // **⟶ AND THE WALK IS A LOCAL INDEX LOOP AND NOT `for … of` — `D-35`'s READ HALF, CLOSED 2026-10-26.**
  // `K-2`'s `address` IS THE CALLER'S OWN ARRAY (`write` hands the raw position here through
  // `constraintWrite`), and `for … of` takes `Array.prototype[Symbol.iterator]` OFF A MUTABLE PROTOTYPE at the
  // moment of the call: a deleted iterator threw the raw host `TypeError` *"address is not iterable"* out of a
  // LAWFUL `write`, and a forged one decided which segments the domain test saw — a caller's function standing
  // where the store's own domain verdict belongs. **THE FORM IS THE CONTRACT'S OWN** — item `(1c)(i)`'s local
  // index loop over the array's own exotic `length` and its own indices — and NO ANSWER MOVES: the same
  // segments, the same order, the same `false` at the same member.
  for (let i = 0; i < address.length; i += 1) {
    const segment = address[i];
    if (typeof segment === 'string') continue;
    if (typeof segment === 'number' && Number.isInteger(segment) && segment >= 0) continue;
    return false;
  }
  return true;
}

/** `PAR-C-2` — the registration key's `id`: a non-empty `string` and nothing else. */
export function inDomainId(id) {
  return typeof id === 'string' && id.length > 0;
}

/**
 * **⟶ `addressToken` IS DELETED — `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`).** **THE ARCHITECT'S
 * GROUND, VERBATIM: *"Address token doesn't need to exist because it doesn't need to be a map key. The kernel
 * receives the triggering addresses from the store now, it doesn't need an internal lookup"*** (`P:
 * docs/pending.md · M-3`; `contract.md §2.8` item 2 item (2)). **THE PASS-6 CORRECTION THAT KEPT IT ALIVE ON
 * THE GROUND THAT IT HAS *"FIVE SURVIVING CALLERS"* IS SUPERSEDED: the callers survive, but EACH IS A LOOKUP
 * THAT SHOULD NOT EXIST.**
 *
 * **WHAT REPLACES EACH OF ITS SITES, EACH NAMED AS THE RULING NAMES IT:**
 *   **(i)** its own `pairKey` use — **THE COMPOSITE KEY'S ADDRESS HALF GOES, and `pairs` IS KEYED BY `id`
 *   ALONE**, which is what *"one id, N addresses"* already declared (`(M-3)` item (i); `contract.md §2.6`
 *   item 4);
 *   **(iii)** `commit`'s `kernel.held` membership test — **replaced by A STRUCTURAL COMPARISON of the
 *   attempt's address against the LIVE attempts' addresses**, since there are as many live attempts as there
 *   are nesting levels and a scan over them is bounded by NESTING DEPTH (`(M-3)` item (iii));
 *   **(iv)** `evaluate`'s checkpoint test — **a STRUCTURAL, SEGMENT-WISE COMPARISON WITH `string` AND `number`
 *   DISTINGUISHED**, the exact distinction the `k:`/`i:` prefixes carried (`(M-3)` item (iv));
 *   **(v)** `release`'s `kernel.held.delete` — gone with (iii) (`(M-3)` item (v)).
 *
 * **AND THE PER-PASS SNAPSHOT IS MATERIALISED FROM `attempt.address` AGAINST `kernel.pairs`** — one scan per
 * LANDING, whose cost `(AA-1)` prices and accepts (`contract.md §2.8` items 1 and 6).
 */

/**
 * **⟶ `pairKey`, `PAIR_KEYS`, `pairRowCarrying` AND `pairKeyOf` ARE DELETED, AND `kernel.pairs` AND
 * `kernel.handles` ARE KEYED BY THE PAIR'S `id` ALONE — 2026-10-24 (`D-29`, verbatim: *"Handle becomes the
 * internal ID"*).** **The bytes that stood here declared *"THE PAIR'S KEY IS THE PAIR — `(address, id)`"* and
 * stand as text read THROUGH this clause** (`DEF-2026-10-02`: no whole-file rewrite; `RCA-8(d)`
 * ANNOTATE-BESIDE).
 *
 * **WHAT `D-29` SUPERSEDES, AT ITS OWN TWO SUBJECTS.** (1) The `(id, address-set)` keying — `index.mjs:5237`'s
 * limb and `contract.md §2.6` item 4's *"one id, N addresses"* — **is now simply *"one `id`, ONE PAIR"***. (2)
 * **`K-1`'s *"a second `register` at the same `id` begins a pair of its own"* is SUPERSEDED: it does not,
 * because there is only ever one pair per `id`.** So the key is the plain `id` string — a `Map` key that needs
 * no `WeakMap` of tuples, no reference comparison and no second home — and `kernel.handles` is keyed the same
 * way. **`pairRowCarrying`'s function-identity discriminator existed only to keep two same-`id` pairs apart,
 * a state `D-29` makes IMPOSSIBLE rather than refuses, so it and `pairKeyOf` are unreachable and gone.**
 *
 * **`pairRowAt` STANDS AND IS UNCHANGED:** `K-6` names a pair by a caller-spelled address SET and
 * `registrationAttempt` by the attempt's own address, so the row's own `addresses` member is still what the
 * match reads. **ITS `key` IS NOW THE ROW'S `id` AND NO LONGER A TUPLE**, which is the only difference.
 *
 * **(The tuple form's own ground, preserved as the reading it carried: *"the pair key is unique over
 * (address, id)"* — `contract.md §5.1`'s `S-KEY` — and `constraint-identity.md §5` `IF-2`'s *"two
 * `addConstraint` calls at two DIFFERENT pairs → TWO identities"*. Under `D-24`'s instance-scoped handle the
 * `id` is unique across the instance, so `S-KEY`'s uniqueness survives with the address half dropped.)**
 */

/**
 * **THE PAIR, SPELLED FOR THE KERNEL'S OWN SENTENCE** — the address's segments joined by `/`, then `#`, then
 * the `id`: the spelling `attempt-lifecycle.md §2.4` item 2 declares for the SENTENCE it labels and the one
 * the four repeat-arm messages carried while the registry key WAS that spelling. **THE KEY IS NO LONGER A
 * STRING** (`pairKey` above), so the sentence reads the pair's own members rather than interpolating a
 * registry key: **NO OBSERVABLE OF THE MESSAGE MOVES** — the same slots, the same separator and the same `id`
 * — and no reading of the joining as injective is asserted anywhere, that demand being the KEY's and the key
 * being the tuple.
 */
export function pairSpelling(pair, address) {
  return `${(address === undefined ? pair.addresses[0] : address).map((segment) => String(segment)).join('/')}`
    + `#${pair.id}`;
}

/// **⟶ DELETED 2026-10-24 (`D-29`): `pairRowCarrying` HAD NO SUBJECT LEFT.** Its doc read: *"THE ROW A PAIR
/// STANDS UNDER, FOUND BY THE FUNCTION IDENTITY THE PAIR'S OWN CALLS SHARE … TWO DISTINCT PAIRS THAT SHARE ONE
/// `id` CARRY TWO DIFFERENT FUNCTIONS and are therefore never confused"*. **Under `D-29` two distinct pairs
/// cannot share one `id` — `kernel.pairs` is keyed by the `id` alone and a second `K-1` at a standing `id`
/// EXTENDS that one row — so the discriminator distinguishes nothing and `pairKeyOf`'s reverse lookup has no
/// caller.** `pairRowAt` below is the only structural lookup that survives, and it survives for `K-6`.

/**
 * **THE ROW A PAIR STANDS UNDER, FOUND STRUCTURALLY OVER ITS OWN ADDRESS SET** — the pairs whose `id` is this
 * one and whose `addresses` carries this address, by a scan over `kernel.pairs` (`contract.md §2.8` items 1
 * and 6). **IT REPLACES THE `id`-ONLY KEY LOOKUP AND NOTHING ELSE**: `K-6` names a pair by a caller-spelled
 * `address` SET and `registrationAttempt` names it by the attempt's own address, neither of which is
 * necessarily the array a registration was keyed by, so the row's own `addresses` member is what the match
 * reads — exactly as `pairsAtAddress` reads it for the pass.
 */
export function pairRowAt(kernel, address, id) {
  for (const [key, pair] of kernel.pairs) {
    if (pair.id !== id) continue;
    if (pair.addresses.some((standing) => sameAddress(standing, address))) return { key, pair };
  }
  return null;
}

/**
 * **THE STRUCTURAL ADDRESS COMPARISON — SEGMENT-WISE, WITH `string` AND `number` DISTINGUISHED**
 * (`P: docs/pending.md · (M-3)` item (iv), verbatim). **IT REPLACES THE STRING SPELLING `addressToken` built
 * for the same job, and NO OBSERVABLE MOVES**: a landing at `['a', 0]` and an attempt at `['a', '0']` are
 * DIFFERENT addresses and the comparison answers `false`, exactly as the prefixes made it.
 */
export function sameAddress(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) return false;
  if (left.length !== right.length) return false;
  for (let i = 0; i < left.length; i += 1) {
    const a = left[i];
    const b = right[i];
    if (typeof a !== typeof b) return false;
    if (a !== b) return false;
  }
  return true;
}

// ---------------------------------------------------------------------------------------------
// THE KERNEL'S OWN CALLER-SIDE STATE — **THE INSTANCE OWNS IT, IN A SLOT ON THE INSTANCE ITSELF**, so
// two stores never share a registry, this module retains no store of its own, and NOTHING STANDS AT
// MODULE LEVEL TO BE KEYED BY ONE.
// ---------------------------------------------------------------------------------------------
// **⟶ THE MODULE-LEVEL `WeakMap` THAT STOOD HERE IS DELETED.** `kernel-surface.md §1` item 5 declares the
// kernel *"imports no store package, **holds no instance handle**, keeps no store member and **carries no
// module-level store**"* — and a `WeakMap` keyed by the store is a MODULE-LEVEL STORE keyed by it, weak or
// not. **AND `D-30` HAD ALREADY REMOVED THE MAP'S ONLY WORK**: with the attempt records moved INTO the
// record `kernelFor(store)` creates, the map held a record that is the instance's own and answered nothing
// the instance could not answer itself, so after that move it was PURE INDIRECTION — a module-level table
// standing between a store and its own kernel.
//
// **THE SLOT IS A SYMBOL-KEYED OWN PROPERTY ON THE STORE, AND IT IS THE SPELLING CONVENTION THIS FILE
// ALREADY USES** for `TERMINAL_ARM`, `FORGET_PAIR` and `STORE_INDEX`: a `Symbol.for` key, so the key can be
// spelled on the side that reads it without that side holding this module's reference. **IT IS DEFINED WITH
// `Object.defineProperty` AND `enumerable: false`, SO THE PRODUCT'S DECLARED FOURTEEN OWN MEMBERS ARE
// UNMOVED**: `Object.keys` and `Object.getOwnPropertyNames` both read past a symbol key (`A117` (D6);
// `surface.md §2.11` clause 9), the precedent `STORE_INDEX` and the two record marks already stand on, so
// no member-counting cell can see the slot.
//
// **AND IT IS READABLE FROM THE STORE ALONE** — not from a closure only the entry holds, and not through a
// second argument — which is what the six items require: `K-1`–`K-6` take the caller's own store first BY
// DECLARATION, so something must go from the store to its record, and the batteries and the package's own
// `constraints.mjs` reach those items through the barrel HOLDING ONLY A STORE OBJECT.
const KERNEL_SLOT = Symbol.for('provident-storeroom.kernel');

// **⟶ THE ATTEMPT RECORDS ARE THE INSTANCE'S OWN, AND THE MODULE-LEVEL `LIVE`/`CLOSED` MAPS AND THE
// MODULE-LEVEL `ATTEMPTS` COUNTER THAT STOOD HERE ARE GONE** (`D-30`, verbatim: *"Make it instance-scoped -
// Creating a new store should create a new stack."*; read with `A137`: *"the registries and the journals are
// independent and a constraint on one store does not refuse a write to the same address on another"*).
// **THEY STAND IN THE RECORD `kernelFor(store)` CREATES, BESIDE `pairs` AND `handles`, AND ARE KEYED BY THE
// `AttemptRef`'s `id` WITHIN THAT INSTANCE** — `attempt-lifecycle.md §2.4` item 1's own scope: the `id` is
// *"unique within the kernel instance"*, which is exactly what the counter counts and what the two maps hold.
// The bytes that stood here declared the records *"KEYED BY THE `AttemptRef`, NOT BY THE INSTANCE"* and are
// read THROUGH this clause (`DEF-2026-10-02`: no whole-file rewrite): the readers still answer "from the
// record and not from the store instance" (`ck_surface_K4_the_readers_answer_from_the_record_and_not_from_
// the_store_instance`; `§2.1` item 4), the record being THE INSTANCE'S and `K-4`/`K-5` taking the instance
// first. **AND THE SCOPE'S OLD COST IS THE ONE `D-30` NAMES**: with one module-level map, a live attempt in
// one instance held its address against a `K-2` in EVERY OTHER, only an address ever being compared.

/**
 * **THE ACCESSOR IS UNMOVED AND ITS BACKING STORE IS THE INSTANCE** — the six items keep taking the caller's
 * own store first, and every `kernelFor(store)` call site in the four part modules keeps calling this one
 * function: only the accessor's BACKING STORE changes, so no caller moves, no import moves and the barrel
 * (`src/constraint-kernel.mjs`) is not touched.
 *
 * **CREATE-ON-MISS IS PRESERVED AND IT LIVES IN THE `undefined` ARM BELOW**: a store carrying no slot yet
 * gets the default record here, so a read on a FRESH store answers an EMPTY kernel and is then refused
 * `KC-2` by the reader that found nothing in it — never a different answer and never a throw. **A read that
 * silently became a different answer on a fresh store would be a behaviour change, and the arm below is the
 * one place that cannot happen**: the slot is defined IN THE SAME ACT that creates the record, so no
 * observation can see a record that is not the instance's own, and a store that already carries one is never
 * given a second.
 */
export function kernelFor(store) {
  let kernel = store[KERNEL_SLOT];
  if (kernel === undefined) {
    kernel = {
      // **THE REGISTRATION REGISTRY, KEYED BY THE PAIR — `(address, id)` — AND UNIQUE OVER THAT TUPLE**
      // (`contract.md §5.1`'s `S-KEY`; `kernel-surface.md §2.1` item 1, `CC-7`), in first-registration order.
      // **ONE ROW PER PAIR, CARRYING EVERY ADDRESS IT STANDS AT** — `{ addresses, id, constraint }` — so *"one
      // pair, N registry rows, removal clears all N"* is one row here and N at the store (`contract.md §2.6`
      // item 4). **THE KEY IS A STRUCTURAL `[address, id]` TUPLE AND NOT A SPELLED STRING** (`pairKey` above):
      // no separator exists to collide, `addressToken` is not reintroduced, and a pair at a different address
      // is a DIFFERENT row however the two pairs would spell.
      pairs: new Map(),
      // **⟶ `byAddress` IS DELETED** (`P: docs/pending.md · R-B3`, the operative ruling, verbatim: *"Delete
      // byAddress — attempt.address already carries it"*; `contract.md §2.8` item 2 item (1)): `evaluate` and
      // `registrationRerun` READ THE PAIR LIST OFF `attempt.address`, which is IN HAND ONE FRAME ABOVE the
      // only two `byAddress.get` calls. **THEY SO READING `kernel.pairs` BY ADDRESS IS A SCAN, NOT AN INDEX.**
      //
      // **⟶ AND `kernel.homes` IS DELETED WHOLE, with its `has` guard in ONE ACT** (`P: docs/pending.md ·
      // D-v`, verbatim: *"`kernel.homes` … DELETED. It is written once and READ NOWHERE in the file — dead
      // state"*; `contract.md §2.8` item 3): **the guard and the map's declaration leave together, so no
      // intermediate tree holds a guarded write to a deleted map** (`kernel-selection.md §2` item 5).
      //
      // pair id -> THE STORE'S OWN HANDLE the pair's registration answered. The kernel "mints no token for a
      // store-minted handle" (`§2.2` item 1) and "THE ONE THING THE KERNEL DOES WITH THE HANDLE IS RECORD IT"
      // (`§2.2` item 3) — so the handle the delivery is keyed by is recorded here and nowhere else.
      // **THIS IS NOT RETIRED** (`P: docs/pending.md · R-B3`, item (ii), verbatim: *"it is what the
      // `pending`/check-off machinery keys on, and P-7's pair shape lands in that same list"*).
      handles: new Map(),
      // **⟶ `kernel.held` IS DELETED WITH `addressToken`'s site (v)**: the `KC-7` membership test is now a
      // STRUCTURAL comparison against the live attempts' addresses (`P: docs/pending.md · M-3`, items (iii)
      // and (v)), and **THE REFUSAL ITSELF IS UNMOVED** — a second `K-2` at a HELD address is refused
      // (`contract.md §2.8` item 7; `S-20`).
      //
      // **AND THE INSTANCE IS RECORDED BESIDE THE STATE SO A KERNEL-SIDE ACT CAN REACH THE APP'S OWN PUBLISHED
      // MEMBERS WITHOUT A SECOND POSITION BEING THREADED THROUGH** (`contract.md §2.9` item 2: `K-6` calls
      // `removeListener`, and this is how the kernel holds the instance it acts on).
      // **THE INSTANCE'S OWN ATTEMPT STATE — THE LIVE RECORDS, THE CLOSED RECORDS AND THE COUNTER THE ATTEMPT
      // `id` IS MINTED FROM** (`D-30`'s clause above). **`live` IS ALSO WHAT `KC-7`'s HOLD READS**: an attempt
      // is placed here the instant the store's write verb returns and is removed by its own terminal act
      // (`release`), so THIS map's membership IS the hold and no second structure is taken
      // (`attempt-lifecycle.md §2.4` item 8 (ii) (g); `contract.md §2.8` item 7).
      live: new Map(),
      closed: new Map(),
      attempts: 0,
      store,
    };
    // **THE SLOT IS DEFINED AND THE RECORD IS PUBLISHED IN THE SAME ACT** (`Object.defineProperty`, exactly as
    // `STORE_INDEX` is defined on this same object in `index.mjs`), so there is no instant at which a store
    // carries a record nobody can read or a record that is not its own. **`enumerable: false` IS THE WHOLE OF
    // THE FOURTEEN-MEMBER GUARDRAIL**: `Object.keys` and `Object.getOwnPropertyNames` read past it, while
    // `Object.getOwnPropertySymbols` and a direct `store[KERNEL_SLOT]` read reach it — which is the ONE
    // observable this slot exists for, and it is the store's own, not a table's.
    Object.defineProperty(store, KERNEL_SLOT, {
      value: kernel,
      enumerable: false,
      writable: false,
      configurable: false,
    });
  }
  return kernel;
}

// ---------------------------------------------------------------------------------------------
// THE LAWFUL APPEND — ADDED 2026-10-25 ON THE BLIND PASS'S `F8-2` WRITE VECTOR, AND IT IS A LOCAL COPY ON
// PURPOSE: THIS MODULE'S OWN HEADER DECLARES AN EMPTY IMPORT FOOTPRINT (`§1` item 1; `A110`), so the kernel
// may not reach the entry's `appendOwn` (`./refusal.mjs`) and defines the same one form here instead.
//
// `attempt.log.push(…)` WAS `Array.prototype.push`, WHICH PERFORMS `[[Set]]` AND THEREFORE WALKS THE
// PROTOTYPE CHAIN: with an own getter-only accessor at `Array.prototype[0]` a caller's lawful `write` threw
// the raw host `TypeError` *"Cannot set property 0 of [object Array] which has only a getter"* at this frame
// (`append`, below), out of a call the walk had ADMITTED. `Object.defineProperty` DEFINES the own data
// property push would have defined on a clean prototype — same `writable`/`enumerable`/`configurable` flags,
// same element, same order, same `length` — and consults no chain.
// ---------------------------------------------------------------------------------------------
export function appendOwn(list, value) {
  Object.defineProperty(list, list.length, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
  return list;
}

// ---------------------------------------------------------------------------------------------
// THE LAWFUL MEMBER READ — ADDED 2026-10-26 ON `D-35`'S READ HALF, AND IT IS A LOCAL COPY ON THE SAME
// GROUND THE APPEND ABOVE IS: THIS MODULE'S OWN HEADER DECLARES AN EMPTY IMPORT FOOTPRINT (`§1` item 1;
// `A110`), so the kernel may not reach the entry's `ownMember` (`./refusal.mjs`) and defines the same
// `[[GetOwnProperty]]` read here instead. No second form is minted: the two helpers are the same bytes.
//
// **THE HAZARD A MEMBER READ LEAVES BEHIND, STATED AS THE LANGUAGE STATES IT.** `value[name]` is a
// `[[Get]]` and `name in value` is a `[[HasProperty]]`; BOTH WALK THE PROTOTYPE CHAIN. The values this
// module reads them off are THE CALLER'S OWN RETURNS AND THROWS — a constraint's outcome, a repair's
// return, a repair's body's throwable — so a member carried only by a prototype decided a kernel verdict
// (measured: an inherited `message` became the refusal's message, an inherited `{ok, op}` was CREDITED as
// the repair's landed op, and an inherited `status` was read as a store code).
//
// **THE FORM IS THE DESCRIPTOR'S OWN** — `Object.getOwnPropertyDescriptor`, which consults no prototype —
// and the descriptor's `value` is taken only where it IS one, so an ACCESSOR is not run and answers
// `undefined` here exactly as an absent member does. No user code runs on any path this helper serves.
export function ownMember(value, name) {
  const descriptor = Object.getOwnPropertyDescriptor(value, name);
  if (descriptor === undefined || !Object.hasOwn(descriptor, 'value')) return undefined;
  return descriptor.value;
}

// ---------------------------------------------------------------------------------------------
// THE MESSAGE LOG (`kernel-surface.md §2.5` item 1; `PAR-C-4`). SIX MEMBERS, `seq` ASCENDING FROM
// `1`, ONE KIND PER ENTRY: `constraint-check` | `repair-run` | `commit` | `outcome`.
// ---------------------------------------------------------------------------------------------
export function append(attempt, kind, id, opId, message, state) {
  appendOwn(attempt.log, {
    seq: attempt.log.length + 1,
    kind,
    id: id === undefined ? null : id,
    opId: opId === undefined ? null : opId,
    message,
    state: state === undefined ? null : state,
  });
}

/** A withdrawn entry takes its `seq` with it: the log's ordinals stay `1..n` (`§2.5` item 1). */
export function withdraw(attempt, entry) {
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
 * second route.
 *
 * **⟶ AND THE ORDINAL GROUND IS DECISIVE WHERE THE FLOOR IS KNOWN, WHICH IT WAS NOT BEFORE 2026-10-26**
 * (`parameter-semantics.md §2.8`'s `observable` cell — *"a `{ok: true}` repair with NO `op`, or with
 * an `op` that is not the one it landed, whose declared answer is the kernel's `KC-4`"*; `§2.7`'s
 * *"a return carrying any other identity has carried no op at all"*). Measured before this date: a
 * repair returning `{ok: true, op: {opId: 'not-the-op-it-landed'}}` — an object carrying an `opId` and
 * NO ordinal — was CREDITED, its identity joined `attempt.ops`, and the FAILING arm's per-op
 * rollback then met the store's own `JournalOpUnknown` at it, answering `KC-8`: a state the clause
 * gives to the composition's floor and to nothing of the repair's. **THE COMPARISON THE CLAUSE ORDERS
 * IS SUPPLIED BY THIS GROUND AND NEEDS NO SECOND CARRIER**: `returnValue.op`'s one declared value is
 * THE STORE'S OWN OP VALUE, and every op the store's own `write` answers with carries `seq`, so a
 * return whose `op` carries no ordinal has nothing to stand above the floor with and CANNOT be shown
 * to be an op this repair landed. It is therefore `null` here — arm `(d)`, `KC-4` — exactly as an op
 * that landed at or before the invocation is. **WHERE THE FLOOR IS NOT KNOWN** (`invokedFor` `null`,
 * which is the registration instant's own call) **and WHERE THE INVOKED-FOR OP ITSELF CARRIES NO
 * ORDINAL, the ground is not applied and the membership ground stands alone, exactly as it did.**
 */
export function landedOp(attempt, returned, invokedFor) {
  // **⟶ AND EVERY MEMBER BELOW IS READ AS THE RETURN'S OWN — `D-35`'s READ HALF, CLOSED 2026-10-26.**
  // `returned` IS THE CALLER'S REPAIR RETURN. `'op' in returned` walked the chain and `returned.op` walked it
  // again, so a prototype's `op` was CREDITED as the op the repair landed — measured: a repair returning
  // `Object.create({ ok: true, op: <a real op> })` had its write ADMITTED, because the two members the credit
  // reads stood on `Object.prototype` and on nothing the return carried. **`ownMember` is
  // `[[GetOwnProperty]]`**: an inherited or accessor-carried `op` is ABSENT here, which is this function's
  // declared `null` — *"a return carrying any other identity has carried no op at all"*.
  const candidate = ownMember(returned, 'op');
  if (candidate === undefined) return null;
  if (candidate === null || typeof candidate !== 'object') return null;
  const candidateOpId = ownMember(candidate, 'opId');
  if (typeof candidateOpId !== 'string' || candidateOpId.length === 0) return null;
  for (const held of attempt.ops) {
    if (held !== null && typeof held === 'object' && held.opId === candidateOpId) return null;
  }
  const floor = invokedFor !== null && invokedFor !== undefined && typeof invokedFor.seq === 'number'
    ? invokedFor.seq
    : null;
  // THE ORDINAL GROUND, DECISIVE WHERE THE FLOOR IS KNOWN (⟶ 2026-10-26): a candidate carrying NO
  // ordinal cannot stand above the op this repair was invoked for, so it is no op this repair landed
  // and this function answers `null` — arm `(d)`, `KC-4`. A candidate carrying one must stand strictly
  // above the floor. Nothing else is read.
  const candidateSeq = ownMember(candidate, 'seq');
  if (floor !== null && (typeof candidateSeq !== 'number' || candidateSeq <= floor)) return null;
  return candidate;
}

/**
 * THE KERNEL'S OWN GENERATED SENTENCE FOR THAT ARM: *"the kernel's own generated sentence names the
 * unrecognized or unlanded `op`"* (`§2.7`'s home, verbatim). It names the identity the malformed
 * return carried — the `opId` where the member carried one, the member's own value where it did not
 * — and never the attempt's address alone.
 */
export function landedOpDefect(attempt, pair, returned) {
  const where = JSON.stringify(attempt.address);
  // **⟶ THE MEMBER IS READ AS THE RETURN'S OWN HERE TOO** (`D-35`'s read half): the arm that names *"carried no
  // op"* and the arm that spells the op must agree with `landedOp`'s own answer, and a chain read would let a
  // prototype decide which of the two sentences the caller is handed.
  const member = ownMember(returned, 'op');
  if (member === undefined) {
    return `the repair ${pair.id} returned \`ok: true\` and carried no op at ${where}`;
  }
  return `the repair ${pair.id} returned \`ok: true\` and named the unrecognized or unlanded op `
    + `${opSpelling(member)} at ${where}`;
}

/** One returned `op` member's identity, spelled for the kernel's own sentence: an `opId` where the
 *  member carried one, and the member's own class where it carried no op at all. */
function opSpelling(value) {
  // **⟶ `opId` IS THE CALLER'S RETURN'S OWN MEMBER** (`D-35`'s read half, 2026-10-26): this spelling is the
  // one place the sentence's identity is taken, so it is taken own-only — an inherited `opId` is no identity
  // this kernel read, and it must not become one in the message either.
  const opId = ownMember(value, 'opId');
  if (value !== null && typeof value === 'object' && typeof opId === 'string') {
    return JSON.stringify(opId);
  }
  if (typeof value === 'string') return JSON.stringify(value);
  if (value === null) return 'null';
  return `a ${typeof value} (which is no op)`;
}

/**
 * **THE PASS'S EVALUATED SET, MATERIALISED FROM `attempt.address` AGAINST `kernel.pairs`** — the ONE
 * replacement for `byAddress`'s index, declared at `contract.md §2.8` item 6 (`HL-DD-6`) and
 * `kernel-selection.md §3` item 1.
 *
 * **THE SET IS THE PAIRS WHOSE OWN ADDRESS IS THE ATTEMPT'S — selected by an EXACT-ADDRESS match and NEVER
 * widened to `triggered`'s prefix set** (`P: docs/pending.md · (AA-1)`, verbatim: *"the pass selects the rows
 * whose address IS the triggering address, which PRESERVES the EXACT-ADDRESS RULE rather than widening it to
 * `triggered`'s prefix set"*; `contract.md §2.8` item 1).
 *
 * **IT IS A SCAN, AND THE COST IS PRICED AND ACCEPTED** (`P: docs/pending.md · (AA-1)`, verbatim: *"selecting
 * rows by address is a scan over `kernel.pairs` … THAT GROUND WAS WRONG AND IS WITHDRAWN: the store names the
 * ADDRESS, and the kernel selects"*).
 *
 * **AND THE RESULT IS MATERIALISED ONCE, WHICH IS WHAT IMPLEMENTS `CX-12`'s *"the pass's evaluated set is
 * FIXED WHEN THE PASS BEGINS"*** (`P: docs/pending.md · R-B3`'s snapshot clause; `contract.md §2.8` item 6):
 * the returned list is a fresh array, so a `K-1` that returns DURING the pass enters the NEXT pass's set and
 * no earlier one, and a pair PURGED mid-pass is still evaluated by the pass that began with it
 * (`kernel-selection.md §3` item 5).
 *
 * **THE ORDER IS THE PAIR'S FIRST-REGISTRATION ORDER AT THE ADDRESS** — `attempt-lifecycle.md:193`'s *"clause
 * (ii)'s first-registration order"* — **and `kernel.pairs`' own `Map` iteration supplies it**, which is the
 * order the ruling says is preserved *"by the store's own returned order, not by an index's append order"*
 * (`P: docs/pending.md · M-3`, its closing sentence; `contract.md §2.8` item 6's `HL-DD-6`).
 */
export function pairsAtAddress(kernel, address) {
  const out = [];
  for (const [key, pair] of kernel.pairs) {
    for (const standing of pair.addresses) {
      if (sameAddress(standing, address)) {
        appendOwn(out, key);
        break;
      }
    }
  }
  return out;
}

/**
 * **WHETHER A LIVE ATTEMPT STANDS AT THIS ADDRESS — the structural replacement for `kernel.held.has(token)`**
 * (`P: docs/pending.md · M-3` item (iii), verbatim). **THE SCAN IS OVER THE LIVE ATTEMPTS AND IS BOUNDED BY
 * NESTING DEPTH, not by pair count**, which is why the ruling accepts it: *"there are as many live attempts as
 * there are nesting levels"*.
 *
 * **AND THE ANSWER IS THE DECLARED REFUSAL'S SUBJECT AND NOTHING ELSE**: a second `K-2` at the SAME address is
 * refused `KC-7`; one at a DESCENDANT address meets no attempt of its own and is ADMITTED
 * (`kernel-surface.md §2.1` item 2's hold clause; `contract.md §2.8` item 7).
 *
 * **⟶ AND THE SCAN IS SCOPED TO ONE KERNEL INSTANCE** (`D-30`; `A137`): it takes the kernel the caller's own
 * store answers and iterates THAT kernel's live attempts. **THE ITERATION IS OTHERWISE UNMOVED** — the same
 * `values()` walk, the same structural `sameAddress` comparison, the same first-match `true` — so the only
 * thing that changes is WHICH records are scanned.
 */
export function attemptHeldAt(kernel, address) {
  for (const attempt of kernel.live.values()) {
    if (sameAddress(attempt.address, address)) return true;
  }
  return false;
}

