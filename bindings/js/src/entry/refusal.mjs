// `D-2` (`docs/L1/entry-subdivision.md` §1 part `2`) — bytes moved from `bindings/js/index.mjs`; no logic changed.
/// `surface.md §2.5`: **THE SINGLE FAILURE FORM** — a THROWN plain object carrying EXACTLY
/// `{status, message, log}`. **The status and the message are the store's own and are carried
/// VERBATIM** (`docs/specs/storeroom-js/surface.md §2.5` items 1–2, `DD-40`): this function constructs the form out of the refusal the addon
/// threw and mints no code of its own and authors no message of its own.
///
/// **⟶ AND THE FORM CROSSES AT THREE MEMBERS FROM 2026-10-16 — `surface.md §2.5` ITEM 4, THE ARCHITECT'S
/// RULING OF THAT DATE: *"`log` IS PRESENT ON EVERY FAILURE THIS SURFACE THROWS, AND `[]` IS ITS DECLARED
/// VALUE WHERE THE FAILURE'S CAUSE HAS NO ATTEMPT AT ALL."*** **The three-member member set is FLAT ACROSS
/// ARMS and not conditional:** a `read`/`readLiteral`/`delete`/`rollback` store refusal with no attempt
/// live, the construction's own `cfg`-side refusals, `a.register`'s refusal and the constraint methods'
/// `TypeError` all carry `log: []` — **the EMPTY ARRAY, never an absent member, never `null`, and never a
/// placeholder entry** — while every failure whose attempt exists carries that attempt's own entries
/// (`§2.5` items 3–4 and 10 (i)–(iii); `docs/specs/storeroom-js/surface.md §2.12` item 1's mark of the same date). **AND WHERE A STORE ACT
/// PRODUCED IT, THE STORE'S `status` AND `message` ARE PRESERVED BYTE-FOR-BYTE AND `log` IS ATTACHED BESIDE
/// THEM — nothing is converted, a member is added** (`§2.5` item 10 (ii); `fail-surface.md §1.2`'s
/// *"the kernel NEVER CONVERTS ONE CHANNEL'S FAILURE INTO THE OTHER'S FORM"* stands whole).
///
/// **THE `log` MEMBER IS AN ORDINARY OWN ENUMERABLE DATA MEMBER** — written with the object literal below,
/// **not `Object.defineProperty`, not a getter, not on a prototype and not behind a `Symbol`** — so
/// `Object.keys(caught)` reads exactly `["log","message","status"]` and its length is `3` on every arm
/// (`docs/specs/storeroom-js/surface.md §2.5` item 9). **IT IS NOT `defineProperty`'D BECAUSE A MEMBER THAT IS NOT ENUMERABLE IS NOT A MEMBER
/// A CANONICAL CENSUS CAN SEE**, and it is not a getter because a client reads a list and not a call.
///
/// **⟶ AND ITS TWO STORE MEMBERS ARE READ OFF THE STORE'S OWN REFUSAL AND OFF NOTHING ELSE — CORRECTED
/// 2026-10-17 (`A64`'s one form read with `surface.md §2.5` item 5 (e)).** **THE CONSTRUCTION BELOW ONCE
/// READ `refusal.status` AND `refusal.message` OF WHATEVER IT WAS HANDED, WITH NO PROVENANCE TEST AT ALL**,
/// and the two failures that cost are named rather than left to be re-derived: **a caller's own throwable
/// reached it by ONE mis-scoped `try`** (see `storeCreate` below, where that throwable now surfaces as
/// itself), **and a value that is not an object at all — most sharply the runtime's own `undefined`, where
/// NO refusal object exists because an exception is already pending — made THIS FRAME fault on
/// `refusal.status`**, so a caller read *"Cannot read properties of undefined (reading 'status')"* where the
/// value its own body threw was the whole of what it was owed.
///
/// **THE TEST IS PROVENANCE'S OWN SHAPE AND NOT A CLASS DECISION OF THIS UNIT'S:** the store's refusal is a
/// plain object whose `status` and `message` are `string`s (`docs/specs/storeroom-native/contract.md §8.3`'s
/// closed two-member form; `docs/specs/storeroom-js/surface.md §2.5` items 1–2), and **a value that is not that object is NOT this form's
/// provenance** — so it is THROWN AS ITSELF, by the one line below, and **NEITHER A STATUS NOR A MESSAGE IS
/// MINTED FOR IT AND NO `log` IS ADDED TO A VALUE THAT IS NOT THE STORE'S FORM.**
///
/// **⟶ THE PROVENANCE TEST IS *"IS THIS THE STORE'S TWO-MEMBER FORM?"* AND NOT *"DOES THIS CARRY A
/// `log`?"*, AND THAT DISTINCTION IS THE WHOLE OF THE CORRECTION THIS MEMBER FORCED.** The two-member
/// presence test **was** the earlier discriminator at the crossing (`constraintCrossing`'s own history: it
/// discriminated on `log`'s PRESENCE) — **and now that EVERY surface failure carries `log`, presence alone
/// can no longer tell a store refusal, a kernel refusal and a CALLER'S FORGED OBJECT apart.** **THE TEST
/// REPLACED IT IS THE STORE'S FORM ITSELF — `status` a `string` AND `message` a `string`, both READ OFF THE
/// HANDED VALUE AND NEITHER MINTED** — and `log` is then **ATTACHED BESIDE THE TWO, NEVER READ AS THE
/// DISCRIMINATOR** (`refusalLog` below). A caller's forged `{status, message}` thrown from a constraint body
/// carries both strings and would pass this test — **which is why this function is never ON the body-throw
/// path at all**: the body's throwable leaves `runAttempt` unconverted and reaches the caller without
/// passing here (`fail-surface.md §1.1` item 5; see `constraintCrossing`'s rethrow). **SO NO BYTE OF THIS
/// FRAME'S PROVENANCE TEST MOVES: every store refusal this package crosses — the eight verbs, the
/// construction, the `16`-code set — keeps its `status` and its `message` member for member and byte for
/// byte, and the ONE member this date adds is `log`.**
export function fail(refusal, log) {
  if (refusal === null || typeof refusal !== 'object'
    || typeof refusal.status !== 'string' || typeof refusal.message !== 'string') {
    throw refusal;
  }
  throw { status: refusal.status, message: refusal.message, log: refusalLog(log) };
}

/// **THE ONE PLACE A REFUSAL'S `log` MEMBER IS DECIDED** — `surface.md §2.5` item 4's flat reading, taken
/// once so no arm can spell it differently. **AN ABSENT ARGUMENT IS THE DECLARED `[]`**: the failure's cause
/// has no attempt at all (a store refusal with no attempt live, a `cfg`-side refusal, a `register` refusal,
/// a constraint-method `TypeError`) — *"the EMPTY ARRAY, never an absent member, never `null`, and never a
/// placeholder entry"*. **A LIST HANDED IN IS THE ATTEMPT'S OWN AND CROSSES VERBATIM** (`docs/specs/storeroom-js/surface.md §2.5` item 3: *"THE
/// ATTEMPT'S OWN MESSAGE LOG, VERBATIM … CARRIED AND NOT RE-SHAPED"*), and it is **NOT COPIED**: a copy would
/// be a second list and the spec's *"the same list the attempt record held"* is a statement about identity
/// of content, which a copy preserves while costing an allocation on every failure — and **a copy would also
/// silently paper over the timing trap below**, because a copy taken late reads the same bytes as one taken
/// early. The list crosses as it stands, and `[]` is minted fresh at each no-attempt failure so that no two
/// failures alias one array.
///
/// **A `log` THAT IS NOT AN ARRAY IS A FINDING AT THE SITE THAT PRODUCED IT** (`docs/specs/storeroom-js/surface.md §2.5` item 9) — this
/// function declares no arm for it and answers the empty array rather than propagating a shape the spec
/// calls impossible: the alternative is a failure whose `log` is `null` or a non-array, which the same item
/// names as the finding verbatim.
export function refusalLog(log) {
  return Array.isArray(log) ? log : [];
}

