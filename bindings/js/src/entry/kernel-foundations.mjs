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
// **⟶ AND THE SET OPENS TO `9` ON 2026-10-28 — `D-53`'s THIRD RULING, THE ARCHITECT'S WORD: *"Open the token
// set"*** (`strata/decisions.md` · `D-53`; `D-52`'s rule 3 is its measurement: **`KC-8` CROSSED AS TWO
// STATUSES** — a constraint refusal whose composition met the floor, and a failed save — **so neither arm was
// derivable from the log's terminal state**). **THE SENTENCE ABOVE STANDS BYTE-FOR-BYTE AND IS READ THROUGH
// THIS ONE: `9` MEMBERS AND NO TENTH, ON `14` SITES.** **THE APPENDED MEMBER IS `KC-9`, THE SAVE ARM'S OWN —
// `ConstraintSaveFailed`** — so a save failure and a constraint refusal cross with DIFFERENT statuses AND each
// is derivable from the log's terminal state: the save arm's ONE `outcome` entry carries `KC-9` and a constraint
// refusal's carries `KC-3`/`KC-5`/`KC-6`/`KC-8` (`KC-9`'s own row, `kernel-attempt.mjs`'s save arm, and
// `kernel-terminal.mjs`'s precedence clause: **the FLOOR DOES NOT OVERWRITE THIS TOKEN, which is what keeps the
// two arms apart where the save's own composition meets a floor code**).
// `fail-surface.md §1.1` ITEM 1 (a) — THE ONE SPELLING, AND IT IS THE TOKEN: a refusal's `status` carries
// `KC-1`…`KC-9` and NOTHING ELSE. The full names (`ConstraintViolated` …) are LABELS: they keep exactly
// one declared use — the `name` column of `§2`'s table, and a citation beside a token — and NO clause
// spells a member's VALUE as a name. `status` and `LogEntry.state` therefore read THE SAME TOKEN STRING,
// related by IDENTITY (`§1.1` item 1 (c)). THE CENSUS MOVES BY THE RULING AND BY NOTHING ELSE:
// `8 → 9` members (`2 + 2 + 2 + 1 + 1 + 1`) on `13 → 14` sites (`1 + 4 + 4 + 3 + 1 + 1`, the last being the
// save arm's own, `kernel-attempt.mjs`).
export const KC = {
  address: 'KC-1', // ConstraintAddressRefused
  arg: 'KC-2', // ConstraintArgRefused
  violated: 'KC-3', // ConstraintViolated
  repairFailed: 'KC-4', // ConstraintRepairFailed
  repairRepeat: 'KC-5', // ConstraintRepairRepeat
  repeat: 'KC-6', // ConstraintRepeat
  attemptOpen: 'KC-7', // ConstraintAttemptOpen
  rollbackFloor: 'KC-8', // ConstraintRollbackFloor
  saveFailed: 'KC-9', // ConstraintSaveFailed
};

/** The nine tokens above, as the ONE list a member's own value is checked against — the kernel's own
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

/// **⟶ ADDED 2026-10-28 — `D-55` ITEM 1, THE ARCHITECT, VERBATIM: *"Include a thrown message in the message
/// log. Obviously."*** **THE MEASURED DEFECT (`DEF-AK`):** a constraint body that threw its own `Error`
/// crossed as the rank-`18` `ConstraintBodyThrew` whose `log` carried **only the attempt's `outcome` entry** —
/// the thrown value's own literal occurred **zero times** in it — while the crossed sentence said *"a
/// constraint body's throwable crosses as this refusal"*. **The commit's log now carries the throwable's own
/// form, written into the ONE `outcome` entry the terminal act appends at the frame that caught the body —
/// before the attempt is disposed of and before the record is handed off** (`kernel-attempt.mjs`'s `evaluate`;
/// no second entry and no fifth `kind` is minted).
///
/// **WHAT THE FORM IS, AND WHY IT NAMES WHAT IT READ RATHER THAN A CLASS.** The value is the CALLER'S OWN —
/// it may be an `Error`, a string, a number, an object with no `message`, a `Proxy` — so the spelling is
/// built from **own data members only** (`ownMember`, `[[GetOwnProperty]]`, `D-35`'s read half) and from the
/// language's own `typeof`. **NO PROTOTYPE IS CONSULTED**: `instanceof`, `constructor.name` and
/// `Object.prototype.toString` all walk a chain a caller owns, and a `Proxy`'s trap would RUN here, on a
/// refusal path. **AND A CLASS IS NEVER CLAIMED**: *"an object whose own `message` member is the string …"*
/// is true of an `Error` and of a plain object alike, which is what the reading supports.
///
/// **THE FORM IS NAMED AND NOT SILENTLY STRINGIFIED**: a thrown string is *"a string whose text is …"*, a
/// number *"a number whose value is …"*, a thrown `void 0` *"no value at all"*, an object without a `message`
/// *"an object carrying no own string `message` member"*. A consumer therefore reads WHAT KIND of value the
/// body threw beside whatever text it carried.
///
/// **IT IS TOTAL, AND THE ONLY READ THAT COULD RUN CALLER CODE IS THE GUARDED ONE**: this frame invokes
/// nothing of the caller's — `ownMember` is `[[GetOwnProperty]]` and consults no chain — and the one trap it
/// can trip (a `Proxy`'s `getOwnPropertyDescriptor`) is inside a `try`, whose arm past it answers a sentence of
/// this frame's own. **NO `undefined` IS EVER PRINTED** (`native/contract.md §8.2` property (c); the `DEF-Q`
/// sweep reads every entry's message for it): a thrown `void 0` says *"no value at all"* and a missing member
/// is named as absent rather than spelled.
export function throwableForm(thrown) {
  if (thrown === null) return '`null`';
  const kind = typeof thrown;
  if (kind === 'undefined') return 'no value at all (the body threw `void 0`)';
  if (kind === 'string') return `a string whose text is ${JSON.stringify(thrown)}`;
  if (kind === 'number') return `a number whose value is ${String(thrown)}`;
  if (kind === 'boolean') return `a boolean whose value is ${String(thrown)}`;
  if (kind === 'bigint') return `a bigint whose value is ${String(thrown)}`;
  if (kind === 'symbol') return 'a symbol, which carries no text a log can print';
  if (kind === 'function') return 'a function, which carries no message';
  let message;
  let name;
  try {
    message = ownMember(thrown, 'message');
    name = ownMember(thrown, 'name');
  } catch {
    // A `Proxy` whose `getOwnPropertyDescriptor` trap throws cannot be read at all: this frame says so and
    // runs nothing further (`D-35`: the refusal path invokes no caller code it was not already handed).
    return 'an object this frame could not read, so its form is not printed';
  }
  const named = typeof name === 'string' && name.length > 0 ? ` named ${JSON.stringify(name)}` : '';
  if (typeof message === 'string') {
    return `an object${named} whose own \`message\` member is the string ${JSON.stringify(message)}`;
  }
  return `an object${named} carrying no own string \`message\` member`;
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
  return `${addressSpelling(address === undefined ? pair.addresses[0] : address)}#${pair.id}`;
}

/**
 * **THE ADDRESS, SPELLED FOR THE KERNEL'S OWN SENTENCES — ONE RENDERING, DECLARED ONCE, AND THIS IS IT.**
 *
 * **`D-48`'s `DEF-AB` ROW IS THE MEASUREMENT THIS FUNCTION CLOSES: THE SAME ADDRESS WAS PRINTED TWO WAYS
 * ACROSS TWO MESSAGES OF ONE RECORD.** `pairSpelling` above spells an address's segments joined by `/`
 * (`a/b#x`); every other sentence the kernel built spelled the very same address through
 * `JSON.stringify(address)` — `["a"]` — so one attempt's log carried *"the constraint `x` passed at
 * `["a"]`"* beside *"the pair `a#x` violated a re-run …"*. **THE `DEF-Q` DEFECT CLASS AT ANOTHER SITE**, and
 * the rendering that fixes it is the one `pairSpelling` already carried: **the address's segments joined by
 * `/`, and never a JSON array.** There is now ONE spelling, ONE home, and both readers take it here.
 *
 * **IT TAKES THE SEGMENTS AS THE REGISTRY ROW AND THE JOURNAL OP CARRY THEM** — strings and non-negative
 * integers — and renders a segment through `String` alone, exactly as `pairSpelling` always has: **no
 * quoting, no bracketing and no second escaping rule is introduced, and no member of any sentence moves.**
 * A local index loop is used, so no `Array.prototype.map`/`join` is read off a mutable prototype on a refusal
 * path (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`).
 */
export function addressSpelling(address) {
  let spelled = '';
  for (let position = 0; position < address.length; position += 1) {
    spelled += position === 0 ? `${String(address[position])}` : `/${String(address[position])}`;
  }
  return spelled;
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

/**
 * **⟶ ADDED 2026-10-29 — `isAddressPrefix`: THE PASS'S OWN MEMBERSHIP TEST, AND IT IS `D-56`'S SENTENCE IN
 * ONE FUNCTION.** The architect, verbatim: *"A listener/constraint should fire when the descendants of its
 * targeted address node change, because the descendants become part of the object that is read from that
 * address"* (`strata/decisions.md` · `D-56`). **THE GROUND IS SEMANTIC AND NOT A PREFERENCE: the value read at
 * a prefix CONTAINS its subtree, so a change at a descendant CHANGES what a read at the ancestor returns** —
 * and a pair standing at the ancestor therefore **judges an object that moved.**
 *
 * **THE SET, STATED ONCE: a pair is asked when THE ACT'S ADDRESS IS AT OR BELOW THE PAIR'S ADDRESS** — *"the
 * pair's address is a prefix of the act's address (equality included)"* (`D-56`). **So `isAddressPrefix(standing,
 * act)` is `true` exactly where the pair stands AT the act's address OR AT ONE OF ITS ANCESTORS**, and `false`
 * for a pair standing at a DESCENDANT — the unruled direction, which `D-56` requires to be MEASURED rather than
 * implemented, and which this predicate therefore does not reach.
 *
 * **IT IS STRUCTURAL AND SEGMENT-WISE, WITH `string` AND `number` DISTINGUISHED, EXACTLY AS `sameAddress` IS**
 * (`P: docs/pending.md · (M-3)` item (iv)): a pair at `['a', 0]` is NOT asked by an act at `['a', '0']`, so the
 * widening changes WHICH DEPTHS are members and NOT how a segment is compared. **A SEGMENT COUNT OF ZERO IS A
 * PREFIX OF EVERY ADDRESS** — the root pair's own reading, and the same one the trigger set's prefix rule gives.
 */
export function isAddressPrefix(prefix, address) {
  if (!Array.isArray(prefix) || !Array.isArray(address)) return false;
  if (prefix.length > address.length) return false;
  for (let i = 0; i < prefix.length; i += 1) {
    const a = prefix[i];
    const b = address[i];
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
      // **⟶ AND THE COMMIT'S FRAME, 2026-10-28 (`D-53`)**: the stack of attempts whose commit the kernel is, at
      // this instant, invoking caller code inside. `K-2` reads its top and joins that attempt's list; a write
      // reached with no frame standing OPENS a commit and starts its own list. It is the instance's own, exactly
      // as `live`/`closed` are (`D-30`), so no two stores share a frame and no module-level stack exists.
      frames: [],
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
// ⟶ `D-45`'S MARKER, SPELLED ON THIS SIDE TOO — 2026-10-27
//
// **THE RULING IS THE ARCHITECT'S, VERBATIM: *"For 43, how is a listener supposed to be able to reuse the outer
// verb's commit? The listener is an externally-passed function and should be making calls at the package
// surface. It should be opening a new commit by default of entering at the surface"*** (`strata/decisions.md` ·
// `D-45`). **SO A CALL ENTERING THE SURFACE FROM AN EXTERNALLY-SUPPLIED FUNCTION OPENS A NEW COMMIT BY DEFAULT,
// AND ONLY THE PACKAGE'S OWN INTERNAL CONTINUATION JOINS.** The marker's implementation is `state.mjs`'s — the
// depth, the per-window record and the join rule are that file's — and THIS module reaches it the way it reaches
// every entry side: **a `Symbol.for` key, spelled on both sides, neither side importing the other**
// (`kernel-surface.md §1` item 1's empty import footprint; `A110`; the same device `SETTLED_ON_THE_PASSING_ARM`,
// `TERMINAL_ARM` and `COMMIT_SCOPE` cross this boundary by).
//
// **AND WHAT THIS MODULE OWES IT IS THE SITES: THE THREE FRAMES THAT INVOKE A CALLER-AUTHORED CONSTRAINT BODY**
// (`registrationEvaluation`, `registrationRerun`, `kernel-attempt.mjs`'s `evaluate`) **AND THE ONE THAT INVOKES
// A REPAIR BODY** (`kernel-attempt.mjs`'s arm (b) and `kernel-registration.mjs`'s state 3). **IT MARKS NOTHING
// ELSE**: a store verb the kernel calls, a record it appends and a crossing it takes are the package's own acts
// and run at the depth the enclosing commit was opened at, which is what keeps an ordinary write's count at
// ONE for its whole length. **A STORE THAT CARRIES NO SUCH CHANNEL ANSWERS THE INVOCATION UNMARKED** (the
// `state.mjs` fallback, byte for byte): a store this package never installed the seam on, whose call then joins
// as it joined before `D-45` — the conservative side, and never a commit the mark did not ask for.
//
// **⟶ AMENDED 2026-10-27 — THE COMMIT A CALL NAMES DECIDES, AND AUTHORSHIP IS ONLY THE FALLBACK WHERE NONE CAN BE
// NAMED (`D-46`).** **The clause above — *"A CALL ENTERING THE SURFACE FROM AN EXTERNALLY-SUPPLIED FUNCTION OPENS
// A NEW COMMIT BY DEFAULT, AND ONLY THE PACKAGE'S OWN INTERNAL CONTINUATION JOINS"* — stands BYTE-FOR-BYTE and is
// read THROUGH this one**, which states the operative rule and names the one sentence of that clause the shipped
// tree no longer implements. **THE ARCHITECT, VERBATIM: *"A listener should be operating at the surface and opening a
// new commit"* · *"A constraint's repair needs to stay as part of the same commit so that it can be tracked as
// part of the commit process"* · *"The original way of maintaining this was to accept an optional parameter on
// entry for the commit id, so that a constraint can identify which open commit it is repairing"***
// (`strata/decisions.md` · `D-46`). **SO: A CALL THAT NAMES A COMMIT ON ITS OWN ENTRY JOINS THAT COMMIT, AND A
// CALL THAT NAMES NONE OPENS A NEW ONE.** **THE POSITION IS `write`'s FOURTH**, whose domain is a RECORD (an object
// carrying an own, present `pending`) and never an id token; **and where the package itself invokes caller code,
// the name is the one that invocation was handed** (`state.mjs`'s `EXTERNAL_COMMIT`): **the kernel names the
// attempt's commit when it invokes a REPAIR, and names nothing when it invokes a listener body or a constraint
// body.** **AUTHORSHIP — THE MARK THIS BLOCK DECLARES — IS THE FALLBACK OF THE FALLBACK: it decides ONLY where
// neither position stands** (`state.mjs`'s `openCommit` reads the entry's name first, the invocation's name
// second, and the depth mark only where neither exists).
//
// **AND THE SITES SENTENCE ABOVE IS CORRECTED AT ITS REPAIR-BODY HALF, BY NAME.** The two frames that invoke a
// REPAIR body — `kernel-attempt.mjs`'s arm (b) and `kernel-registration.mjs`'s state 3 — **NO LONGER CALL THIS
// MODULE'S `externalCall`**: each reaches the same `Symbol.for` channel at its SECOND position with the attempt's
// commit named (that file's own local `repairInCommit`, the same key spelled again), because **A REPAIR IS NOT AN
// ACT AT THE SURFACE CLAIMING A COMMIT OF ITS OWN — IT IS PART OF THE ATTEMPT BEING TRACKED**, so the write its
// body makes must join the attempt's window and the attempt's record must describe the repair it performed. **THE
// THREE FRAMES THAT INVOKE A CALLER-AUTHORED CONSTRAINT BODY STILL CALL `externalCall`, WHICH NAMES NOTHING AND
// IS THEREFORE THE OPENS ARM** (`registrationEvaluation`, `registrationRerun`, and `kernel-attempt.mjs`'s
// `evaluate`), **and *"IT MARKS NOTHING ELSE"* STANDS**: what moved is the answer this module's one call site
// gives, not the set of frames it is reached from. **A STORE THAT CARRIES NO SUCH CHANNEL STILL ANSWERS THE
// INVOCATION UNMARKED** — `run()` at this frame, and a repair's own write then opening its own commit — which is
// the rule's absent arm and never a commit nobody named.
// ---------------------------------------------------------------------------------------------
const EXTERNAL_CALL = Symbol.for('provident-storeroom.external-call');

/// **THE INVOCATION OF A CALLER-SUPPLIED FUNCTION, THROUGH THE CHANNEL** — one argument, the thunk that makes
/// the call; the answer is the invocation's own and a throwable crosses unchanged. **AND IT NAMES NO COMMIT, ON
/// PURPOSE: A CALL THROUGH THIS HELPER IS `D-46`'S ABSENT ARM.** A caller-authored constraint body is handed a
/// context carrying no commit (`kernel-surface.md §2.3` item 1) and a listener body is handed the triggering
/// address and nothing else, so neither has a name to supply and the call opens its own commit. **A REPAIR is
/// the one invocation that DOES have a name, and it is made by the invoking file's own channel call at the second
/// position — never here** (`D-46` item 2; the amendment beside this block above).
export function externalCall(store, run) {
  const channel = store !== null && typeof store === 'object' ? store[EXTERNAL_CALL] : undefined;
  if (typeof channel === 'function') return channel(run);
  return run();
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
// **⟶ THE MESSAGE LOG BELONGS TO THE COMMIT, NOT TO THE ATTEMPT — `D-53`, 2026-10-28.**
//
// **THE ARCHITECT, VERBATIM: *"If it's part of the same commit, then it uses the same message log. If it opens a
// new commit, it uses the new commit's message log. Constraints/Repairs should always use the same commit.
// Listeners should open a new commit, because the triggering commit already passed constraints"***
// (`strata/decisions.md` · `D-53`). **A COMMIT IS THE UNIT OF WORK AND AN ATTEMPT IS THE CONSTRAINT-JUDGED WRITE
// INSIDE IT**, so a commit that holds several attempts — a check, its repair, the repair's own write, the re-run
// — holds ONE list, and every one of those attempts appends to it: **`attempt.log` IS the commit's list, carried
// by reference, and it is not a copy of anybody's.**
//
// **WHAT THAT DISSOLVES, SAID BECAUSE IT WAS ASKED AS A QUESTION.** `D-52`'s rule 2 asked where a nested
// attempt's report is merged into its host's, and how a merged entry keeps *"its own attempt identity"* when
// `seq` is *"the ordinal of the list it stands in"* and the six declared members leave no room for a seventh.
// **THERE WAS NEVER A MERGE TO PERFORM: a constraint body's write is part of the same commit, so its entries
// ARE this list's entries, the crossed report IS this list, no entry is renumbered and `seq` keeps its
// declaration because there is ONE list.** `DEF-AK`'s *"one inner refusal, two hosts"* is the measurement of it.
// **⟶ AND THE CLAUSE'S OWN CONCLUSION OUTLIVED ITS PREMISE, 2026-10-28 — `D-65`.** *"No entry is renumbered
// because there is ONE list"* is the SAME FACT that removes the member: a position nothing merges into is a
// position the array index states, so `seq` no longer has a declaration to keep (`strata/decisions.md` ·
// `D-65`). **THE SUBJECT ABOVE IS UNMOVED** — one list, no merge, no seventh member.
//
// **THE KEY IS A `Symbol.for` SPELLING ON THE COMMIT'S OWN RECORD, AND BOTH SIDES SPELL IT** (`A117` (D6)): the
// entry's terminal arm attaches this list to a failed save's crossing, and it holds the `CommitRecord` and
// nothing else — so the list travels ON the record under a symbol key that `Object.keys` and
// `Object.getOwnPropertyNames` read past, and the record keeps its FOUR declared members.
export const COMMIT_LOG = Symbol.for('provident-storeroom.commit-log');

// ---------------------------------------------------------------------------------------------
// **⟶ THE HANDOFF'S OWN SEAL — `D-55` ITEM 6, `DEF-AO`, ADDED 2026-10-28.** The architect, verbatim:
// *"Attempts don't log. This is what the commits are for. The commits have their log handed off to the client
// and are dropped after closing out."* **SO THE RECORD IS HANDED OFF ONCE, AT THE END OF THE COMMIT'S OWN
// PROCESSING, AND A RECORD THAT CHANGES AFTER THE HANDOFF IS NOT A RECORD.**
//
// **WHAT WAS MEASURED BEFORE THIS ACT EXISTED.** The drain amends the REPORT a pass already closed — it sets
// `outcome` and appends the refusal's entry to the report's list — and the list it appends to is THE COMMIT'S
// OWN, held by reference by every attempt of the commit, the crossed refusals included. A consumer that took
// the closed report (or a refusal carrying that list) before the drain therefore held a record that moved
// under it. **FREEZING AT THE SEAL MAKES THE HANDED-OFF RECORD FINAL**: the drain's amendment happens BEFORE
// this call (it is part of closing out), and nothing after it can append, renumber or re-member the list.
//
// **WHAT IT FREEZES, AND WHY THE LOG'S SEAL IS THE COMMIT'S.** `D-53` makes the message log THE COMMIT'S: an
// attempt's `log` is that one list, carried by reference, and every attempt of the commit appends to it — a
// constraint body's nested write, a repair's write, the re-run. **SO THE REPORT IS SEALED AT EVERY ATTEMPT'S
// HANDOFF AND THE LIST IS SEALED AT THE HANDOFF OF THE ATTEMPT WHOSE SCOPE OWNS IT** (the one whose commit is
// not an enclosing invocation's list, read off `commitLogInFlight`): freezing the list at a NESTED attempt's
// handoff would stop the enclosing attempt's own `append` and turn a lawful write into a raw host `TypeError`
// — measured, and the reason the `shared` argument exists. **THE LIST IS SEALED WITH ITS COMMIT**, which is
// what *"the commits have their log handed off to the client and are dropped after closing out"* says.
//
// **IT FREEZES TWO THINGS AND ONLY TWO**: the report's `log` array (where this attempt's scope owns it) and
// the report itself. **NO MEMBER MOVES, NO MEMBER IS ADDED, AND THE LIST'S IDENTITY IS UNCHANGED** — `D-53`'s
// *"the crossed report IS that list"* is a statement about WHICH array crosses, and the same array crosses
// (frozen): `K-5`, `K-4` and every refusal built from it read the same entries at the same POSITIONS — the
// array index is the position (`D-65`, 2026-10-28), and the seal freezes the list so no index moves either.
// **A PASSING ATTEMPT'S REPORT IS SEALED TOO** — its log is handed off exactly once and drops with the commit.
export function sealHandoff(report, shared) {
  if (report === null || typeof report !== 'object') return report;
  // THE REPORT'S OWN `log` MEMBER, READ AS A MEMBER OF THE OBJECT THIS FRAME BUILT (`kernel-terminal.mjs`
  // places the commit's list there and nothing else): an absent or non-array member is not this act's, and
  // `refusalLog`'s own rule (`surface.md §2.5` item 4) is that a `log` is a list on every arm.
  const log = report.log;
  if (shared !== true && Array.isArray(log) === true) Object.freeze(log);
  Object.freeze(report);
  return report;
}

// **THE COMMIT'S FRAME — THE ONE STRUCTURE THAT MAKES "THE SAME COMMIT" A FACT RATHER THAN A CONVENTION.** It is
// a per-instance stack on the kernel record (`kernel.frames`, created by `kernelFor`), pushed by the kernel
// around each invocation IT makes of caller code that belongs to an attempt — a constraint body at a landing,
// at a registration's evaluation, at its re-run; a repair body — and popped in a `finally`.
//
// **`K-2` READS IT AND NOTHING ELSE DECIDES THE LOG**: a write the kernel reaches from inside such an
// invocation JOINS the innermost frame's list; a write reached from anywhere else — a caller's own top-level
// write, and A LISTENER BODY'S WRITE, which the ENTRY invokes at the terminal arm with no frame of this
// kernel's standing — OPENS a commit and therefore starts a list of its own (`D-53`: *"Listeners should open a new
// commit, because the triggering commit already passed constraints"* — what the listener saw was already
// approved, so what it does now is a NEW QUESTION and must not inherit the old verdict).
export function enterCommitFrame(kernel, log) {
  appendOwn(kernel.frames, { log });
}

/** The pop, and it is a local index loop for the reason every other list surgery here is (`contract.md §2.1`'s
 *  clause of 2026-10-24 on `F7-1`): no `Array.prototype.pop` is read on a path a caller's prototype can reach. */
export function leaveCommitFrame(kernel) {
  const kept = [];
  for (let i = 0; i + 1 < kernel.frames.length; i += 1) appendOwn(kept, kernel.frames[i]);
  kernel.frames = kept;
}

/** **THE LOG OF THE COMMIT THE KERNEL IS INSIDE, OR `null` WHERE IT IS INSIDE NONE** — the one read `K-2` takes
 *  to decide whether this write joins a commit or opens one. */
export function commitLogInFlight(kernel) {
  return kernel.frames.length === 0 ? null : kernel.frames[kernel.frames.length - 1].log;
}

// ---------------------------------------------------------------------------------------------
// THE MESSAGE LOG (`kernel-surface.md §2.5` item 1; `PAR-C-4`). FIVE MEMBERS — `kind` · `id` · `opId` ·
// `message` · `state` — ONE KIND PER ENTRY: `constraint-check` | `repair-run` | `commit` | `outcome`.
//
// **⟶ AND THE ENTRY CARRIES NO `seq`, 2026-10-28 — `D-65`: THE ARRAY INDEX IS THE POSITION.** `RCA-8(g)`
// ANNOTATE-BESIDE: the clause above read *"SIX MEMBERS, `seq` ASCENDING FROM `1`"* and **every other byte of
// this file stands as the reading of its own date, read THROUGH this one.** **THE RULING, THE ARCHITECT, ONE
// WORD: *"Drop it"*** (`strata/decisions.md` · `D-65`), given to the question why a log entry carries `seq` at
// all — **and the question is the answer**: `seq: attempt.log.length + 1` IS the index of the entry being
// appended, so the member was a SECOND SOURCE OF TRUTH for a fact the array already encodes, and only one of
// the two is authoritative. **THE MEMBER IS REMOVED, NOT RE-SPELLED**: `DEF-AI`'s own demand offered both routes
// (*"mint `seq` from the attempt's counter, **or omit the member**"*) and this is the one that cannot drift —
// **there is no second copy of the position, so there is nothing left to disagree with the journal's ordinal.**
// **THE POSITION SURVIVES AS THE INDEX AND AS NOTHING ELSE**: the entry at `log[i]` IS the `i`-th position of
// the list it stands in, and a reader that wants the ordinal reads the index it already holds.
//
// **⟶ AND THE ENTRY IS NAMED BY AN ITERATION AND NOT BY TWO LOOSE IDENTITIES — 2026-10-28, `D-53`'s FIRST
// RULING: *"Both combined to identify which constraint iteration it is on"*.** **THE ARCHITECT'S ANSWER TO
// `D-52`'s rule 1, read with `D-53`'s own gloss: *"an entry carries the PAIR identity and the OP identity
// together, and the PAIR identifies WHICH CONSTRAINT of that pair's evaluations is being spoken about … The two
// columns are not alternatives — they are one identity"*.** **THE SUBJECT OF AN ENTRY IS THE ITERATION, AND AN
// ITERATION IS A PAIR AT AN OP** — which is why no single acted-upon object could supply both, and why the old
// `(attempt, kind, id, opId, message, state)` signature (two loose strings in two adjacent positions) could be
// fed one value where the other belonged.
//
// **SO THE SIGNATURE TAKES THE ITERATION AS ONE OBJECT AT ONE POSITION, and reads its two members as its OWN
// data members** (`D-35`'s read half: `[[GetOwnProperty]]` and never a `[[Get]]` that walks a caller's chain):
//   * `iteration.pair` — the registry row (`{ addresses, id, constraint }`) the entry speaks about, or `null`
//     where the kind names none (the `commit` entry names no pair, and the `outcome` entry names one only where
//     the arm has one);
//   * `iteration.op` — the journal op the iteration is judged at, or `null` where the kind names none.
// **`id` IS READ OFF THE PAIR AND `opId` OFF THE OP**: a caller cannot put an id in the op's place, because
// there is no place for one.
//
// **⟶ AND THE ENTRY IS FIVE MEMBERS FROM 2026-10-28 (`D-65`): THE APPEND MINTS NO `seq`.** The position the
// member used to restate is the position this append GIVES the entry — the length of the list BEFORE the
// append — so `log[log.length - 1] === entry` and the index is the ordinal, stated by the array and by no
// member (`strata/decisions.md` · `D-65`; `index.d.ts`'s `LogEntry` carries the five).
export function append(attempt, kind, iteration, message, state) {
  const held = iteration !== null && typeof iteration === 'object' ? iteration : null;
  const pair = held === null ? undefined : ownMember(held, 'pair');
  const op = held === null ? undefined : ownMember(held, 'op');
  const id = pair === undefined || pair === null || typeof pair.id !== 'string' ? null : pair.id;
  const opId = op === undefined || op === null || typeof op.opId !== 'string' ? null : op.opId;
  appendOwn(attempt.log, {
    kind,
    id,
    opId,
    message,
    state: state === undefined ? null : state,
  });
}

/** **A WITHDRAWN ENTRY TAKES ITS POSITION WITH IT, AND NOTHING NEEDS RENUMBERING — `D-65`, 2026-10-28.** The
 *  clause here read *"A withdrawn entry takes its `seq` with it: the log's ordinals stay `1..n` (`§2.5` item
 *  `1`)"* and then rewrote every remaining entry's member. **THERE IS NO MEMBER TO REWRITE**: the array index
 *  IS the position, so a splice leaves the list's positions `0..n-1` contiguous by construction and the
 *  renumbering loop had nothing left to do (`strata/decisions.md` · `D-65`). **THE SUBJECT IS UNMOVED** — a
 *  withdrawn entry is withdrawn, and every entry that remains stands at the index it now holds. */
export function withdraw(attempt, entry) {
  const at = attempt.log.indexOf(entry);
  if (at === -1) return;
  attempt.log.splice(at, 1);
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
  const where = addressSpelling(attempt.address);
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
 * **THE PASS'S EVALUATED SET — A FILTER OVER THE STORE'S OWN `triggered`, AND NO SECOND REACH.**
 *
 * **`D-69`, THE RULING, VERBATIM: *"It doesn't need to mint an inert listener body, it already should require a
 * constraint function with a handle"*** (`strata/decisions.md`). **THE REGISTRATION IS A HANDLE AND A BODY, AND A
 * PAIR HAS BOTH** — its `id` is the handle (`D-29`), its `constraint` is the body (`D-26`) — **so `K-1` hands the
 * store what the pair already has, `triggered` names the pair's `id` beside the listeners' handles, and this
 * function asks the elements whose handle is a CONSTRAINT'S `id`.** **WHAT IT REPLACES IS `pairsAtAddress`, WHOSE
 * WALK OVER `kernel.pairs` COMPUTED A SECOND REACH** — `D-67`'s own finding: *"the store computes the reach of an
 * act, and the kernel computed a second one"*. **THAT WALK IS GONE.**
 *
 * **THE ONE PREDICATE IS THE STORE'S** (`src/store.rs`'s `registration_triggered`, over the set
 * `Store::touched_below` materialises from the versions the store itself holds): **the registration's address is
 * a PREFIX of the act's (`D-56`) or the act TOUCHED it (`D-66`), and `touched` is computed WHERE THE VERSIONS
 * LIVE** — which is what closes `D-66`'s per-tier residual, a higher-persistence write that purges a value the
 * crossing's `before` state collapsed into one array per tier. **`D-56`'s and `D-66`'s predicates did not
 * disappear; they MOVED INTO `triggered_for` and they are read here as their answer.**
 *
 * **WHAT THIS FUNCTION STILL DECIDES, AND IT IS ONE THING: THE ORDER.** `HL-8` ITEM 6's rule — each pair
 * evaluated once in its FIRST-REGISTRATION order — survives both rulings, and the store's list is a SET whose
 * order is UNSPECIFIED (`DD-37`: the home is a `HashMap`). **So the registry supplies the ORDER and the store
 * supplies the MEMBERSHIP**: the loop walks `kernel.pairs` (whose `Map` iteration IS `D-39`'s registration
 * sequence) and admits a pair iff the store's returned set names its `id`. **THE WALK COMPUTES NO REACH** — it
 * compares one string per row per element, an EQUALITY test and never an address relation. **EACH PAIR IS
 * EVALUATED AT MOST ONCE** (`contract.md §2.6` item 5) and the set is ONE SNAPSHOT taken at pass start (`CX-12`).
 *
 * **THE ELEMENTS ARE `{handle, address}`** (`contract.md §2.4` item 1) — the store's own list, read through its
 * own members by `ownMember` (`D-35`'s read half). **A LIST THAT IS NOT AN ARRAY HAS NO MEMBER AND ANSWERS THE
 * EMPTY SET**: a drive that hands one is not a pass this kernel opened, and the pass over no pair is the pass
 * arm (`contract.md §2.8` item 1).
 */
export function pairsTriggered(kernel, triggered) {
  const out = [];
  if (!Array.isArray(triggered)) return out;
  for (const [key, pair] of kernel.pairs) {
    for (let i = 0; i < triggered.length; i += 1) {
      const element = triggered[i];
      if (element === null || typeof element !== 'object') continue;
      // **THE PAIR'S `id` IS ITS HANDLE — `D-29`, verbatim: *"Handle becomes the internal ID"* — so the store's
      // element names the pair by the very string the registry is keyed by.**
      if (ownMember(element, 'handle') === pair.id) {
        appendOwn(out, key);
        break;
      }
    }
  }
  return out;
}

/**
 * **WHETHER A PAIR STANDS AT ONE OF THE ADDRESSES ONE OF ITS ELEMENTS NAMES** — the store's list read for a
 * single pair, the arm `K-6`'s row lookup and `pairsTriggered`'s membership test are both written from.
 *
 * **IT IS THE ONE MEMBERSHIP TEST AND IT IS NOT A REACH**: it compares the pair's `id` with the element's
 * `handle` and asks nothing about any address (`D-69`).
 */
export function triggeredNames(triggered, id) {
  if (!Array.isArray(triggered)) return false;
  for (let i = 0; i < triggered.length; i += 1) {
    const element = triggered[i];
    if (element === null || typeof element !== 'object') continue;
    if (ownMember(element, 'handle') === id) return true;
  }
  return false;
}

/**
 * **THE ADDRESSES AN ACT TOUCHED BELOW ITS OWN ADDRESS — `D-66`'s OWN COMPUTATION, AND ITS TWO ARMS.**
 *
 * **⟶ AND A WRITE'S SET IS NOW THE UNION OF THE TWO VALUES' PATH SETS — `D-66` READ SYMMETRICALLY, 2026-10-29.**
 * `RCA-8(g)` ANNOTATE-BESIDE: **every clause below stands BYTE-FOR-BYTE as the reading of its own date and is read
 * THROUGH this clause; the one sentence it supersedes is the write arm's *"exactly the paths its value contains"*,
 * named here rather than overwritten.** **THE RESIDUAL, MEASURED**: **a write that REPLACES a node DROPS the
 * sub-paths the old value carried** — `{c: 1}` written over `{c: {x: 1}}` leaves `['a','b','c','x']`
 * **present-before and absent-after**, which IS a change to what a read there returns, **and under the
 * written-value-only arm its pair was not asked.** **THE CRITERION `D-66` NAMED ALREADY DECIDES IT** — *"a pair is
 * asked when the act changes the value at the pair's address"* — **and a path that DISAPPEARS changed as surely as
 * a path that APPEARS.** **SO THE WRITE'S TOUCHED SET IS SYMMETRIC: the paths of the value it WROTE
 * (`after.value`) TOGETHER WITH the paths of the value it REPLACED (`before.value`) — their union, a path in both
 * being appended once — and `op.before.value` is the source of the second half.** **THE DELETE ARM IS UNCHANGED**
 * (the whole subtree of the value it removed, below). **THE ONE PLACE IS THIS FUNCTION**: `pairsAtAddress` calls it
 * once at pass start and both pass call sites inherit the widened set with no byte of their own moving.
 *
 * **A FIRST WRITE AT AN ADDRESS HAS NO BEFORE VALUE, AND THAT IS `present: false`, NOT AN ABSENCE OF THE MEMBER**:
 * `state_from_captured` answers `Store::absent_state()` where nothing was captured (`src/store.rs`), so
 * `op.before` is ALWAYS an object carrying `present` and `value` — `present === false` on the first write, and
 * `absentState` is the arm that touches nothing. **So the union on a first write is the written value's path set
 * exactly, and no arm of this function throws on it** (measured in `DW-13.6`).
 *
 * **A WRITE TOUCHES EXACTLY THE PATHS ITS VALUE CONTAINS.** The value is `after.value`, the state the write
 * installs (`JournalOp`'s `after`, `src/records.rs`). **Its path set, stated for each class of value:**
 *   * **a SCALAR** — a string, a number, a boolean or `null` — **contains no path at all**: it has no members, so
 *     the write touches nothing below its own address. A pair at `['a','b','c']` is asked for a write of `"foo"`
 *     at `['a','b']` only because it was asked by `D-56`'s arm (its address is not below the act's) — it is not
 *     asked at all, and that is the truth: `['a','b','c']` stands neither before nor after the act;
 *   * **an ARRAY** contributes **its own indices, as `number` segments and never as strings** (`contract.md §1`'s
 *     segment law: an index key is a non-negative integer, so `[7, 8]` written at `['a','b']` touches
 *     `['a','b',0]` and `['a','b',1]` and NOT `['a','b','0']`), each recursed into by the same rule one level
 *     down;
 *   * **a NESTED OBJECT** contributes **one path per own member name, as a `string` segment**, each recursed into
 *     by the same rule one level down — so `{p:{q:1}}` written at `['n','o']` touches `['n','o','p']` AND
 *     `['n','o','p','q']`, which is `D-66`'s *"a nested object touches its own sub-paths, by the same rule one
 *     level down"*.
 *
 * **A DELETE TOUCHES THE WHOLE SUBTREE AT ITS ADDRESS**, and its path set is read off the SAME computation
 * applied to the state the delete removed: `before.value` (`JournalOp`'s `before`), because a descendant of a
 * deleted node is **absent after the act and was not before**. **THE `after` STATE IS ABANDONED BY THE SAME
 * ARGUMENT**: a delete leaves absence, so `after` has no members to walk. **THIS ARM IS UNCHANGED BY THE UNION
 * ABOVE, AND IT IS NOW THE WRITE'S `before` ARM THAT IS THE ONE IT SHARES**: the delete's `before` was already
 * this function's second reader, so the symmetric write arm adds no new state, no new member and no new walk —
 * it adds the ONE call that the delete arm already made.
 *
 * **AND AN ABSENT STATE TOUCHES NOTHING**: `present !== true` returns the empty set — which is the delete that
 * removed nothing (`D-3`: no op stands at all), the write whose value carries no members, **and the first write at
 * an address, whose `before` is absent (`appendStatePaths` is where that guard now stands, once for every state
 * either arm reads).**
 *
 * **MEASURED BEFORE THIS FUNCTION WAS WRITTEN, AND IT IS REACHABLE**: `op.kind` answers `"write"` or `"delete"`,
 * `op.address` the act's own segments, `op.after.value` the FULL DECODED TREE a write installed
 * (`{c:'foo', d:'bar'}` crosses as exactly that plain object — `frame.mjs`'s `decodeValue`) and `op.before.value`
 * the subtree a delete removed (`{c:{x:1}, d:'bar'}`). **NO `src/**` BYTE AND NO `index.mjs` BYTE HAD TO MOVE**, so
 * the store's op already carried the value JS needs.
 *
 * **⟶ AND `op.before` IS PRESENT ON EVERY WRITE THE PASS EVALUATES, MEASURED AGAIN FOR THE SECOND HALF OF THE UNION,
 * 2026-10-29** (`DW-13.6`): **`JournalOp`'s `before` is a non-`Option` `BaseState`** (`src/records.rs`), so the
 * crossing carries it unconditionally (`frame.mjs`'s `decodeJournalOp` reads `encoded.before` for every kind), and
 * a write's `before` is `state_from_captured`, **which answers `Store::absent_state()` — `present: false` — where
 * nothing was captured and a `present: true` value everywhere else.** **SO THE MEMBER IS NEVER MISSING AND THE
 * FIRST-WRITE CASE IS A STATE AND NOT AN ERROR**: the union is the written value's path set alone, and the arms
 * above take it without a throw.
 *
 * **NO METHOD IS TAKEN FROM A MUTABLE PROTOTYPE**: `Array.isArray` is the same intrinsic `decodeValue` uses, the
 * member census is `Object.keys`, each member is read by `ownMember` (`D-35`'s read half), and every append is
 * `appendOwn`.
 */
export function touchedAddresses(act) {
  const out = [];
  if (act === null || typeof act !== 'object') return out;
  const address = ownMember(act, 'address');
  if (!Array.isArray(address)) return out;
  const base = [];
  for (let i = 0; i < address.length; i += 1) appendOwn(base, address[i]);
  // **THE KIND CHOOSES THE STATES, AND IT IS THE ACT'S OWN KIND AND NOT A DEFAULT**: a delete's `before` is the
  // one state that names what it MOVED (it leaves absence, so `after` has no members to walk); **a write's `after`
  // AND ITS `before` are the TWO states that name what it moved** — what it installed and what it displaced.
  if (ownMember(act, 'kind') === 'delete') {
    appendStatePaths(out, base, ownMember(act, 'before'));
    return out;
  }
  appendStatePaths(out, base, ownMember(act, 'after'));
  // **THE REPLACED VALUE'S PATHS JOIN THE WRITTEN VALUE'S — THE UNION, AND THE ONE `sameAddress` RULE THE TWO
  // HALVES OF THE SET ALREADY COMPARE WITH.** A path BOTH values carried was appended by the line above and is
  // not appended again, so the returned list is a set and the touched-descendant arm reads one list and no
  // second. **A FIRST WRITE ADDS NOTHING HERE**: its `before` state is `present: false` and touches nothing.
  const replaced = [];
  appendStatePaths(replaced, base, ownMember(act, 'before'));
  for (let i = 0; i < replaced.length; i += 1) {
    if (touchesAddress(out, replaced[i]) === false) appendOwn(out, replaced[i]);
  }
  return out;
}

/** One state half's path set, appended under `base` — **the guard `touchedAddresses` states once for both arms of
 *  a write and for the delete's one**: a state that is not an object, or whose `present` is not `true`, has no
 *  members and touches nothing (`D-3`'s delete that removed nothing; the first write at an address). */
function appendStatePaths(out, base, state) {
  if (state === null || typeof state !== 'object') return;
  if (ownMember(state, 'present') !== true) return;
  appendValuePaths(out, base, ownMember(state, 'value'));
}

/** One value's path set, appended under `prefix` — the walk `touchedAddresses` states the rule of. Each member's
 *  address is built FRESH (a copy of `prefix` plus the one segment), so no address on the returned list is an
 *  alias of another and none is a view into the act's own value. */
function appendValuePaths(out, prefix, value) {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      const address = [];
      for (let j = 0; j < prefix.length; j += 1) appendOwn(address, prefix[j]);
      appendOwn(address, i);
      appendOwn(out, address);
      appendValuePaths(out, address, value[i]);
    }
    return;
  }
  if (value === null || typeof value !== 'object') return;
  const names = Object.keys(value);
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const address = [];
    for (let j = 0; j < prefix.length; j += 1) appendOwn(address, prefix[j]);
    appendOwn(address, name);
    appendOwn(out, address);
    appendValuePaths(out, address, ownMember(value, name));
  }
}

/** **WHETHER ONE PAIR'S STANDING ADDRESS IS ONE THE ACT TOUCHED** — `D-66`'s second admission, beside
 *  `isAddressPrefix`'s first. The comparison is `sameAddress`, so a pair at `['a', 0]` is not admitted by a
 *  touched `['a', '0']` and the two arms of the set compare segments by ONE rule. */
function touchesAddress(touched, standing) {
  for (let i = 0; i < touched.length; i += 1) {
    if (sameAddress(touched[i], standing)) return true;
  }
  return false;
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

