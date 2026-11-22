// **⟶ THE CLASS-DECISION INSTRUMENT, HELD BY THE REALM AND INSTALLED INTO THIS PART — ADDED 2026-11-17**
// (`D-156` item 1 and its item 1 of the unsettled — *"WHERE THE DETECTOR IS INJECTED … the five parts that
// import `node:util` (`frame.mjs` · `class-decision.mjs` · `carrier.mjs` · `delivery.mjs` · `constraints.mjs`,
// **25 `types.isProxy` sites**) must take their class-decision instrument from the realm"*; the loader split's
// row for them, `docs/L3/wasm-realm/design.md` §5: *"`node:util` in five parts | one import line swapped for a
// local helper | **neutralised**, conditional on §4's instrument"*).
//
// **WHAT IT IS, AT THE BYTE: THE ONE PREDICATE `DD-34`'s `Proxy` REFUSAL IS DECIDED WITH.** Each of those five
// parts imported `node:util`'s `types` for EXACTLY ONE predicate and nothing else — `types.isProxy` — and the
// twenty-five call sites are the whole of that import's use. **They call `isProxyOf` from here instead**, so no
// part carries a `node:` specifier for the class decision and the decision itself is unmoved: same predicate,
// same position in the order (`A76`: the class decision is taken on the value AS IT IS, before any read, before
// any trap can run), same refusal.
//
// **AND IT IS A MODULE-LEVEL INSTRUMENT ON PURPOSE** (`A117` (D6)'s discipline, read at its own words: *"NO
// MEMBER IS ADDED"* — the device *"is the precedent for attaching a datum without moving a census"*, the record's
// `Object.keys` and `Object.getOwnPropertyNames` being *"invisible to both"* — `surface.md §2.11` clause 9): it
// is NOT a member of any record, NOT an instance slot and NOT a symbol key on any value, so **no census anywhere
// in this package moves** and no store instance carries a second member for it. The seam is one module-level
// `let`, one setter and one predicate.
//
// **THE NODE ARM'S INSTRUMENT IS `types.isProxy` ITSELF, AND `index.mjs` INSTALLS IT AT LOAD.** The other arm's
// is `structuredClone` (`D-156` item 1: *"a `Proxy` exotic object is NOT serializable … so `try {
// structuredClone(value) } catch { refuse }` restores a detector that RUNS NO TRAP BEFORE THE REFUSAL"*), and
// **the instrument differs there while the ANSWER does not** — every refusal this predicate feeds stays
// rank-neutral and class-for-class what the Node arm answers.
//
// ★ **THE DEFAULT IS `false`, AND THIS IS THE MOST DANGEROUS LINE IN THIS FILE, SO IT IS STATED AT ITS BYTE:
// BEFORE AN INSTRUMENT IS INSTALLED, `isProxyOf` ANSWERS `false` — "not a `Proxy`" — FOR EVERY VALUE, WHICH IS A
// SILENT LOSS OF `DD-34`'S REFUSAL AND LETS A TRAP RUN.** It is the arm taken deliberately: the alternative —
// answering `true` until an instrument arrives, i.e. *"refuse everything"* — refuses every value's prototype link
// at `classSpelling`, `targetSpelling` and the address walk, so **no value crosses and no store can be
// constructed at all**; a lost refusal degrades the boundary, a default refusal destroys the arm. **THE LOSS IS
// UNREACHABLE ON THE NODE ARM ONLY BECAUSE THE ENTRY INSTALLS `types.isProxy` AT ITS OWN LOAD, BEFORE ANY PART
// CAN CLASSIFY ANYTHING** (`index.mjs`, at the head of the module, `D-156`; `docs/L3/wasm-realm/design.md` §5) —
// **so the entry's installation is the thing that makes this default unreachable, and a part driven without that
// entry has NO `Proxy` detector at all.** `tests/e2e/class-instrument.test.mjs` is the cell that holds both
// halves of that sentence: the entry installs, and the un-installed predicate answers `false`.
//
// **NO `node:` SPECIFIER APPEARS IN THIS FILE AND NONE MAY** — that is the whole of the seam: the realm supplies
// the instrument and this file only holds it and answers with it.

/// **THE INSTALLED INSTRUMENT, OR `null` BEFORE AN ENTRY INSTALLS ONE.** Module-level, unexported and not a
/// member of anything (`A117` (D6)); `installClassInstrument` is its only writer and `isProxyOf` its only reader.
let instrument = null;

/// **THE ONE SETTER, CALLED BY AN ENTRY AT ITS OWN LOAD** (`D-156`; `docs/L3/wasm-realm/design.md` §5). **A
/// NON-FUNCTION IS REFUSED** rather than held: a truthy non-function stored here would throw at the FIRST
/// classification instead of at the install, which is a host `TypeError` out of a caller's first verb and a
/// second failure form on a path `DD-12` allows none. The refusal is a load-time programming error and is a
/// plain `TypeError` on purpose — **it is NOT a store refusal, it mints no status (`DD-40`) and it can reach no
/// caller**, because the only caller is an entry's own evaluation.
export function installClassInstrument(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('installClassInstrument: the class-decision instrument is a function');
  }
  instrument = fn;
}

/// **THE ONE PREDICATE THE FIVE PARTS CALL** (`D-156`'s 25 sites) — **the installed instrument's answer, and
/// `false` where none is installed** (the default stated at the head of this file, with its consequence). **THE
/// ANSWER IS COERCED TO A BOOLEAN BY `=== true`**, so an instrument answering a truthy non-boolean cannot admit a
/// value by accident and one answering nothing cannot refuse one: the two arms of this predicate are the two
/// booleans, exactly as `util.types.isProxy` answered. **A THROWING INSTRUMENT IS NOT CAUGHT HERE** — on the arm
/// that needs a `try`, the `try` is the instrument's own (`D-156` item 1's `structuredClone` probe), so a
/// failure inside an instrument is its author's and never silently read as *"not a `Proxy`"* — which would be a
/// second, hidden copy of this file's default.
export function isProxyOf(value) {
  return instrument === null ? false : instrument(value) === true;
}
