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
// entry has NO `Proxy` detector at all.**
//
// ⟶ **AMENDED 2026-11-17 — THE DEFAULT'S SENTENCE NAMES THE SET OF CELLS THAT HOLDS IT, AND THE SET THIS FILE
// ONCE NAMED WAS NOT LANDED.** The block above read *"`tests/e2e/class-instrument.test.mjs` is the cell that holds
// both halves of that sentence: the entry installs, and the un-installed predicate answers `false`"*; **that path
// does not exist in this tree** (`tests/e2e/` carries no `class-instrument` cell — read at the directory), and
// **no cell anywhere drives `installClassInstrument` with no instrument installed**. **The two halves are held,
// after this amendment, by the cells that do drive the seam**: `tests/e2e/blind-installed-surface.test.mjs` holds
// the module set (`class-instrument.mjs` is one of the eighteen parts the packed set carries), and the arm's own
// cells hold the installed arm (`tests/e2e/wasm-arm.test.mjs` — a value crosses by value, and a `Proxy` is
// refused with no trap run, which is only true of an arm whose instrument IS the probe). **NO BYTE OF THE
// PREDICATE MOVES WITH THIS SENTENCE**: it says where a claim is held and not what the code does.
//
// **NO `node:` SPECIFIER APPEARS IN THIS FILE AND NONE MAY** — that is the whole of the seam: the realm supplies
// the instrument and this file only holds it and answers with it.
//
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// **⟶ `D-167` · THE SEAM GAINS A SECOND PREDICATE, BECAUSE THE PROBE ANSWERS TWO DIFFERENT QUESTIONS AND THE
// RULING SEPARATES THEM — 2026-11-17.**
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
//
// **THE ARCHITECT'S WORDS, VERBATIM: *"The clone requirement is for data that has to enter the Rust store.
// constraints, listeners, and the saveCall do not"*** (`D-167`, answering the finding `D-166` is). **THE FINDING
// IT ANSWERS, MEASURED AT ITS OWN INSTRUMENT: `structuredClone` throws for BOTH a `Proxy` AND any object carrying
// a function** — `structuredClone({ saveCall: () => {} })` and `structuredClone(new Proxy({}, {}))` fail
// identically (`DataCloneError`) — **so on the WASM arm the one instrument classified every `saveCall` `cfg` as
// "a Proxy" and refused it, and the arm could not construct the one store it exists for.**
//
// **SO THE SEAM HOLDS TWO PREDICATES AND EACH ANSWERS ONE QUESTION:**
//   * **`isProxyOf` — THE DATA QUESTION**, unmoved in meaning: *does this value enter the Rust store?* It is the
//     write's value, an address, a tier, a value's class and a value's prototype link — **and on the WASM arm it
//     is still the `structuredClone` probe, so `DD-34`'s property is kept on that arm exactly as `D-156` states
//     it: a `Proxy` is refused and NOT ONE TRAP RUNS** (`CW-7` in `tests/e2e/wasm-arm.test.mjs` is that cell).
//   * **`isProxyOfCarrier` — THE CARRIER QUESTION**: *is this the package's own carrier — the `cfg` it is read
//     from, the `listeners` and `constraints` arrays and their elements, the save the caller hands in, the commit
//     record the package builds?* **A carrier DOES NOT CROSS**, so `invariant 2`'s domain (*"if it cannot cross
//     IPC it cannot be stored"*) says nothing about it and the probe must not be asked of it.
//
// **AND THE SPLIT CANNOT LIVE INSIDE `isPlainObjectValue`, WHICH IS THE ONE PLACE IT WOULD LOOK NATURAL**: that
// predicate is **shared** between `cfg` (a carrier) and the values a verb admits (data), so a decision taken
// inside it would move the value crossing with the carrier gate. **THE SPLIT LIVES AT THE CALL** — the carrier
// gates call the carrier predicate and every data site keeps `isProxyOf` — and `class-decision.mjs` carries a
// carrier-shaped sibling of `isPlainObjectValue` (`isPlainObjectCarrier`) for the one gate whose subject is the
// `cfg` OBJECT itself rather than a member of it.
//
// **THE TWO PREDICATES ON EACH ARM, STATED TOGETHER SO NEITHER IS READ AS THE OTHER:**
//   * **THE NODE ARM: BOTH ARE `types.isProxy`, AND NOTHING ABOUT THAT ARM MOVES.** `types.isProxy` is precise
//     there — it answers *"is this exotic object a `Proxy`"* and invokes nothing — so it is the right answer to
//     BOTH questions and the entry installs it twice. **Every Node cell that drives a `Proxy` at a carrier gate
//     still refuses it in the same form with the same message** (`NG-JS-*`, `F-RA-12`, `DD-34`), because
//     `isProxyOfCarrier(v)` and `isProxyOf(v)` are the same answer on that arm by construction.
//   * **THE WASM ARM: `isProxyOf` IS THE `structuredClone` PROBE AND `isProxyOfCarrier` ANSWERS `false`.** **THE
//     DECLARATION, AND IT IS THE WHOLE OF THE PRICE: a `Proxy` AT A CARRIER GATE IS NOT DETECTED ON THAT ARM** —
//     because the only platform signal that distinguishes a `Proxy` from its target is `structuredClone`, and
//     **it cannot distinguish a `Proxy` from a function-carrying carrier**, and **the carriers the API requires
//     are function-bearing by definition** (`cfg.saveCall`, a listener's `listener`, a constraint's
//     `constraint`). **A `cfg` that is a `Proxy` on that arm is therefore READ, not refused** — `encodeConfig`
//     reads its four declared keys by `Object.hasOwn` and never by `in` (`A76`/`JS-5`), so what an un-detected
//     carrier costs that arm is a `get` of exactly the keys the API declares and nothing wider; and **the value
//     crossing keeps `DD-34` whole** — the arm's one claimed property in this matter is about what it STORES.

/// **THE INSTALLED DATA INSTRUMENT, OR `null` BEFORE AN ENTRY INSTALLS ONE.** Module-level, unexported and not a
/// member of anything (`A117` (D6)); `installClassInstrument` is its only writer and `isProxyOf` its only reader.
let instrument = null;

/// **⟶ AND THE CARRIER INSTRUMENT IS ITS OWN SLOT FROM 2026-11-17** (`D-167`) — a second module-level `let`, no
/// member on any record, its one writer the same setter and its one reader `isProxyOfCarrier` below. **TWO SLOTS
/// AND NOT ONE, BECAUSE THE TWO ANSWERS DIFFER ON ONE ARM**: a single slot could only hold one of them, and the
/// arm that needs them apart is the arm whose instrument cannot answer the second question at all.
let carrierInstrument = null;

/// **THE ONE SETTER, CALLED BY AN ENTRY AT ITS OWN LOAD** (`D-156`; `docs/L3/wasm-realm/design.md` §5). **A
/// NON-FUNCTION IS REFUSED** rather than held: a truthy non-function stored here would throw at the FIRST
/// classification instead of at the install, which is a host `TypeError` out of a caller's first verb and a
/// second failure form on a path `DD-12` allows none. The refusal is a load-time programming error and is a
/// plain `TypeError` on purpose — **it is NOT a store refusal, it mints no status (`DD-40`) and it can reach no
/// caller**, because the only caller is an entry's own evaluation.
///
/// **⟶ AND IT TAKES BOTH INSTRUMENTS FROM 2026-11-17 — `D-167`'s one seam, two questions.** The second position
/// is the carrier answer and **it is REQUIRED**: an entry that installed only the data instrument would leave
/// `isProxyOfCarrier` at its `false` default, which on the Node arm would be a silent loss of the `DD-34`
/// refusal at every carrier gate — the exact class of loss this file's head declares as the dangerous default.
/// **A call that omits it therefore fails at its own evaluation**, where the mistake is, and not at the first
/// caller that hands a `Proxy` a `cfg`. `undefined` is refused like any other non-function: **absence is not a
/// lawful spelling of "answer `false`"** — the arm that answers `false` says so by passing a function that
/// answers `false` (the WASM fork's own install), so the declaration is written at the call that takes it.
export function installClassInstrument(fn, carrierFn) {
  if (typeof fn !== 'function') {
    throw new TypeError('installClassInstrument: the class-decision instrument is a function');
  }
  if (typeof carrierFn !== 'function') {
    throw new TypeError('installClassInstrument: the carrier class-decision instrument is a function');
  }
  instrument = fn;
  carrierInstrument = carrierFn;
}

/// **THE ONE PREDICATE THE FIVE PARTS CALL AT A DATA SITE** (`D-156`'s 25 sites) — **the installed instrument's
/// answer, and `false` where none is installed** (the default stated at the head of this file, with its
/// consequence). **THE ANSWER IS COERCED TO A BOOLEAN BY `=== true`**, so an instrument answering a truthy
/// non-boolean cannot admit a value by accident and one answering nothing cannot refuse one: the two arms of this
/// predicate are the two booleans, exactly as `util.types.isProxy` answered. **A THROWING INSTRUMENT IS NOT
/// CAUGHT HERE** — on the arm that needs a `try`, the `try` is the instrument's own (`D-156` item 1's
/// `structuredClone` probe), so a failure inside an instrument is its author's and never silently read as *"not a
/// `Proxy`"* — which would be a second, hidden copy of this file's default.
export function isProxyOf(value) {
  return instrument === null ? false : instrument(value) === true;
}

/// **⟶ THE CARRIER PREDICATE — `D-167`, ADDED 2026-11-17. THE ONE PREDICATE THE CARRIER GATES CALL, AND THE
/// ANSWER IS THE ARM'S OWN.**
///
/// **A CARRIER IS THE PACKAGE'S OWN DATA, AND IT DOES NOT ENTER THE RUST STORE** — `cfg` itself, the `listeners`
/// and `constraints` arrays and their elements, and the commit record the package builds — **so the probe that
/// decides what may CROSS (`invariant 2`: *"if it cannot cross IPC it cannot be stored"*) has no subject here.**
/// **THE ARCHITECT'S RULING, VERBATIM: *"The clone requirement is for data that has to enter the Rust store.
/// constraints, listeners, and the saveCall do not"*** (`D-167`).
///
/// **THE NODE ARM ANSWERS `types.isProxy`, EXACTLY AS `isProxyOf` DOES, AND THAT IS NOT A SHORTCUT**: that
/// instrument is PRECISE there — it reads the exotic object's own internal slot, invokes no handler and throws
/// for nothing — so it is the right answer to this question too, and **every Node cell that drives a `Proxy` at a
/// carrier gate keeps its refusal, its form and its message** (`NG-JS-*`, `F-RA-12`, `DD-34`). **NO BYTE OF THE
/// NODE ARM'S BEHAVIOUR MOVES WITH THIS PREDICATE**; only the name at six carrier gates does.
///
/// ★ **THE WASM ARM ANSWERS `false` — FOR EVERY VALUE — AND THIS IS THE DECLARATION, SAID WHERE THE PREDICATE IS
/// DECIDED AND NOT ONLY WHERE IT IS INSTALLED: A `Proxy` AT A CARRIER GATE IS NOT DETECTED ON THAT ARM.** **THE
/// GROUND IS THE PLATFORM'S AND IT IS NOT A PREFERENCE:** the only signal that distinguishes a `Proxy` from its
/// target is `structuredClone`, and **it cannot distinguish a `Proxy` from a function-carrying carrier** — both
/// throw `DataCloneError` (`D-166` items 1–2, measured) — **and the carriers this API requires are function-bearing
/// by definition: `cfg.saveCall`, a listener's `listener`, and a constraint's `constraint`.** The three ways to
/// make the probe answer anyway were priced by `D-166` item 4 and each is refused on a stated ground: projecting
/// around the functions **reads members of the object being tested**, which is the trap hazard the refusal exists
/// to prevent; a `Proxy`-only signal **does not exist in ECMAScript**; and there is no fourth. **SO THIS ARM
/// CHOOSES BETWEEN TWO REFUSALS IT CANNOT TELL APART AND TAKES THE ONE THAT LEAVES THE STORE CONSTRUCTIBLE.**
/// **WHAT IT COSTS, NAMED AT ITS SEAT:** a `cfg` handed as a `Proxy` on that arm is read rather than refused —
/// `encodeConfig` takes its four declared keys by `Object.hasOwn` (`A76`/`JS-5`) and reads those keys' values and
/// no member the API does not declare, so the traps an un-detected handler sees are the reads the construction
/// must make anyway; **a carrier gate is not a place where a trap can run that a construction would not run.** **AND
/// WHAT IT DOES NOT COST: the value crossing.** `isProxyOf` above still answers the probe at every DATA site, so a
/// `Proxy` handed to a verb as a VALUE is still refused in the declared form with **NO TRAP RUN** — `DD-34`'s
/// property is kept on this arm for the one population it is about, which is the data that enters the store.
///
/// **THE DEFAULT IS `false`, AND IT IS THE SAME DIRECTION THE DATA PREDICATE'S DEFAULT TAKES, FOR A STRONGER
/// REASON:** a default `true` here would refuse every `cfg` ever constructed (*"'cfg' is a Proxy"* for an object
/// that is not one), so the arm would construct no store at all. **AND IT IS UNREACHABLE ON THE NODE ARM BY THE
/// ENTRY'S OWN INSTALLATION**, exactly as `isProxyOf`'s default is: `index.mjs` installs `types.isProxy` at both
/// positions at its own load, before any part can classify anything.
export function isProxyOfCarrier(value) {
  return carrierInstrument === null ? false : carrierInstrument(value) === true;
}
