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

  // THE STORE'S OWN VERB CHOOSES WHICH REFUSAL ANSWERS. An out-of-domain `tier` and an absent
  // `value` are THE STORE'S own code on THE STORE'S own channel, and the kernel mints no `KC-2` for
  // either (`kernel-surface.md §2.1` item 2; `parameter-semantics.md §2.14`).
  const written = storeWrite(store, address, tier, value);

  ATTEMPTS += 1;
  const attempt = {
    ref: { id: `attempt-${ATTEMPTS}` },
    store,
    address: address.slice(),
    tier,
    value,
    commit,
    ops: [written.op],
    log: [],
    ran: [],
    appliedRepairs: [],
    rollback: [],
    checkpoint: null,
    status: 'open',
    report: null,
  };

  const record = {
    attempt: attempt.ref,
    op: written.op,
    triggered: written.triggered,
    // `kernel-surface.md §2.1` item 2 — THE FOURTH MEMBER: "`pending` CARRIES THE HANDLES THIS CALL'S
    // WRITE RETURNED THAT THE KERNEL HAS NOT INVOKED IN ITS OWN WINDOW — LAYER (b)'s SET, WHOSE LAYER IS
    // FIXED BY THE WRITE THAT RETURNED EACH HANDLE AND BY NOTHING ELSE". `K-2` is the caller's own verb
    // call and the kernel invokes nothing in its window here, so EVERY handle this write returned stands
    // in the member at this instant; a handle whose pair a LATER pass evaluates is dropped from it by
    // that pass's own layer (a) delivery, and where the write failed the registered constraints at its
    // landing "its set is DISCARDED rather than carried, so its handles appear in `triggered` and in
    // `pending` NEVER" (`attempt-lifecycle.md §2.4` item 8 (i) (5), the discard rule's one home).
    pending: written.triggered.slice(),
  };
  attempt.record = record;

  LIVE.set(attempt.ref.id, attempt);
  if (token !== null) kernel.held.set(token, attempt.ref.id);

  // "so `triggered` then stands as the store's own returned set while `pending` is `[]` and no handle of
  // that write is invoked by either layer" (`kernel-surface.md §2.1` item 2, the discarded-set clause): the
  // handle the KERNEL's own adopted home entry stands for is the one this write's landing already handed
  // to the kernel's own window, so it is carried by neither member again — an already-run handle being a
  // member of `triggered` and of `pending` NEVER.
  const home = kernel.homes.get(token === null ? '' : token);
  record.pending = written.triggered.filter((handle) => handle !== home);
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
    // THE ARM IS READ OFF THE CLOSED ATTEMPT WHERE THE COMPOSITION'S OWN FLOOR OVERRODE IT: a still-owed
    // op's call meeting `RollbackCompacted`/`JournalOpUnknown` is `KC-8` and not the pass's own arm
    // (`composition-and-states.md §2.6` item 5 (b); `KC-8`'s own row).
    refuse(attempt.throwState, attempt.throwMessage, attempt.log);
  }

  // THE SUCCESS ARM: the `commit` entry, the registry entry removed, and the five-member report.
  append(attempt, 'commit', null, attempt.ops[attempt.ops.length - 1].opId,
    `every constraint registered at ${JSON.stringify(attempt.address)} passed; the commit stands`);
  return close(kernel, attempt, 'passed');
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
      // THIS RUN evaluated has now been invoked in the kernel's own window, so `CommitRecord.pending` —
      // LAYER (b)'s ONLY WORK LIST — stops carrying it. A handle whose pair this run did NOT evaluate
      // stands there as any caller-made write's handle does, and is never delivered twice.
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
 * behind has now been invoked in the kernel's own window, so it is carried by `pending` NEVER.
 */
function releasePending(kernel, attempt, keys) {
  const record = attempt.record;
  if (record === undefined || keys === undefined) return;
  for (const key of keys) {
    const handle = kernel.handles.get(key);
    if (handle === undefined) continue;
    const at = record.pending.indexOf(handle);
    if (at !== -1) record.pending.splice(at, 1);
  }
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
  // `kernel-surface.md §2.1` item 2's discarded-set clause): where the attempt's own write FAILED the
  // registered constraints at its landing and could not be repaired, its composition is ROLLED BACK and
  // "THE TRIGGERED SET THAT WRITE RETURNED IS DISCARDED WHOLE: NO HANDLE IN IT IS DELIVERED BY EITHER
  // LAYER … so `triggered` then stands as the store's own returned set while `pending` is `[]` and no
  // handle of that write is invoked by either layer." The member the caller's own loop runs off —
  // layer (b)'s ONLY work list — is therefore EMPTIED here, on EVERY terminal arm of the attempt and on
  // NO OTHER: a body already run is never un-run, and what the member carries is exactly the handles not
  // yet invoked, so the discard reaches them and nothing else. A PASSING attempt discards nothing.
  if (attempt.record !== undefined) attempt.record.pending = [];
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
