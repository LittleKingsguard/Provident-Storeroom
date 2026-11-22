// `D-2` (`docs/L1/entry-subdivision.md` §1 part `2`) — bytes moved from `bindings/js/index.mjs`; no logic changed.
/// `surface.md §2.5`: **THE SINGLE FAILURE FORM** — a THROWN plain object carrying EXACTLY
/// `{status, message, log, address}`. **The status and the message are the store's own and are carried
/// VERBATIM** (`docs/specs/storeroom-js/surface.md §2.5` items 1–2, `DD-40`): this function constructs the form out of the refusal the addon
/// threw and mints no code of its own and authors no message of its own.
///
/// **⟶ AND THE FORM CROSSED AT THREE MEMBERS FROM 2026-10-16 — `surface.md §2.5` ITEM 4, THE ARCHITECT'S
/// RULING OF THAT DATE: *"`log` IS PRESENT ON EVERY FAILURE THIS SURFACE THROWS, AND `[]` IS ITS DECLARED
/// VALUE WHERE THE FAILURE'S CAUSE HAS NO ATTEMPT AT ALL."*** **The member set is FLAT ACROSS
/// ARMS and not conditional:** a `read`/`readLiteral`/`delete`/`rollback` store refusal with no attempt
/// live, the construction's own `cfg`-side refusals, `a.register`'s refusal and the constraint methods'
/// `TypeError` all carry `log: []` — **the EMPTY ARRAY, never an absent member, never `null`, and never a
/// placeholder entry** — while every failure whose attempt exists carries that attempt's own entries
/// (`§2.5` items 3–4 and 10 (i)–(iii); `docs/specs/storeroom-js/surface.md §2.12` item 1's mark of the same date). **AND WHERE A STORE ACT
/// PRODUCED IT, THE STORE'S `status` AND `message` ARE PRESERVED BYTE-FOR-BYTE AND `log` IS ATTACHED BESIDE
/// THEM — nothing is converted, a member is added** (`§2.5` item 10 (ii); `fail-surface.md §1.2`'s
/// *"the kernel NEVER CONVERTS ONE CHANNEL'S FAILURE INTO THE OTHER'S FORM"* stands whole). **THE ARITY IS
/// FOUR FROM 2026-10-29 AND THE FLATNESS READING IS ANNOTATED BESIDE, NOT WITHDRAWN** (`D-77`: `address` is
/// present on every arm, `null` where nothing is nameable).
///
/// **THE `log` MEMBER IS AN ORDINARY OWN ENUMERABLE DATA MEMBER** — written with the object literal below,
/// **not `Object.defineProperty`, not a getter, not on a prototype and not behind a `Symbol`** — so
/// `Object.keys(caught)` reads exactly `["status","message","log","address"]` and its length is `4` on every
/// arm (`docs/specs/storeroom-js/surface.md §2.5` item 9). **IT IS NOT `defineProperty`'D BECAUSE A MEMBER THAT IS NOT ENUMERABLE IS NOT A MEMBER
/// A CANONICAL CENSUS CAN SEE**, and it is not a getter because a client reads a list and not a call.
///
/// **⟶ AND THE FORM CROSSES AT FOUR MEMBERS FROM 2026-10-29 — `D-77`, THE ARCHITECT'S RULING, ONE WORD:
/// *"New member"*.** **THE MEASUREMENT IT ANSWERS**: **a caller's own act refused and a caller's act that
/// PASSED while a LISTENER threw cross with the same `status`, the same `message`, the same keys and the same
/// two log entries** — only the `opId` differs, **and a refused act answers no `op` for the caller to key
/// against** — so the caller read `ConstraintPassRefused` and concluded its own write did not happen while the
/// store says it did. **THE FOURTH MEMBER IS *WHICH ACT WAS REFUSED*, AND IT IS THE ADDRESS THE REFUSAL IS
/// ABOUT**: the caller wrote an address and knows it, **so `equal` means the caller's own act and `different`
/// means a listener's, and a retry is a decision rather than a guess**. **IT IS PRESENT ON EVERY REFUSAL,
/// `null` WHERE THERE IS NOTHING TO NAME** — *"a member absent on some arm is the `DEF-AH` defect wearing a new
/// name"* (`strata/decisions.md` · `D-77`). **THE CLOSED STATUS SET IS NOT REACHED: twenty stays twenty**, and
/// the member is no heuristic a caller has to reproduce.
///
/// **THE NAME IS THE DECLARATION'S OWN CONVENTION AND NOT A NEW ONE (`bindings/js/index.d.ts`).** Its three
/// siblings are ONE BARE NOUN EACH NAMING EXACTLY THE THING CARRIED — `status` (the store's code), `message`
/// (the store's sentence), `log` (the attempt's entries) — **and the package spells this datum `address` at
/// every signature it appears in**: `read(address, tier?)`, `write(address, tier, value, commit?)`,
/// `delete(address, tier)`, `listen(handle, addresses)`, `AttemptContext.address`, `JournalOp.address`,
/// `pair.address`. **`refusedAddress` WOULD BE A SECOND WORD FOR A DATUM THE WHOLE DECLARATION ALREADY CALLS
/// `address`**, and `act` would name no address at all.
///
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
/// **⟶ AND THE TWO MEMBERS IT CARRIES ARE READ AS THE HANDED VALUE'S *OWN* DATA PROPERTIES AND OFF NO CHAIN
/// — `D-35`'s FIRST NAMED PARAMETER-ACCESS HOLE, CLOSED 2026-10-25.** The form was once built by reading
/// `refusal.status` and `refusal.message` with an ORDINARY MEMBER READ, which is a `[[Get]]` and walks the
/// property chain. **The failure that costs is measured:** with an own `status`/`message` installed on
/// `Object.prototype` — by a caller, inside their own realm, breaking nothing of their own — a refusal whose
/// own two members were missing (the native half's own dropped-`status` state, `facade.rs`'s
/// `throw_refusal`) crossed here as **THREE OWN KEYS CARRYING THE PROTOTYPE'S STRINGS**: a status outside the
/// closed seventeen and a message the package did not generate. **THE READING IS THE WHOLE OF THE DEFECT:
/// the package had built ITS form out of data it read back off a supplied object through a mutable
/// prototype.**
///
/// **THE CURE IS THE PRINCIPLE AND NOT A NARROWER CHAIN WALK: THE FORM IS BUILT FROM THE STORE'S OWN
/// `status` AND `message` — the two bytes the crate's `Refusal` put on the value this function was handed —
/// AND FROM NOTHING THE CHAIN CAN ANSWER.** [`ownMember`] performs `[[GetOwnProperty]]`, which consults no
/// prototype at all, so a key reached only through a chain is ABSENT here and the provenance test above
/// answers exactly as it does for a value that carries no such member: **the value is thrown AS ITSELF and
/// neither a status nor a message is minted for it.** **NOTHING ELSE MOVES:** a genuine store refusal still
/// crosses byte-for-byte (its own bytes are the core's own bytes), the `log` member is still attached
/// beside them, and the shape of the thrown form — a fresh plain object literal with exactly
/// `{status, message, log, address}` (`D-77`'s fourth member, added beside the other three) — is the
/// declaration's own (`D-35`; `surface.md §2.5` items 1–2; the `F8-2` class).
export function fail(refusal, log, address) {
  if (refusal === null || typeof refusal !== 'object') {
    throw refusal;
  }
  const status = ownMember(refusal, 'status');
  const message = ownMember(refusal, 'message');
  if (typeof status !== 'string' || typeof message !== 'string') {
    throw refusal;
  }
  // **THE PARAMETER IS REBOUND TO THE OWN-ONLY PROJECTION THE TWO LINES ABOVE ALREADY TOOK, AND THAT IS THE
  // WHOLE OF THE CURE AT THIS SITE**: `status` and `message` ARE the own data property values — no chain was
  // consulted to read them — so the throw below builds this frame's one plain form out of the store's own two
  // bytes and can no longer be answered by a prototype. **THE THROW'S OWN BYTES ARE UNMOVED** (`NG-PUB-F`'s
  // control is cut on that line, and a control is re-cut by its owner rather than by this pass): its two
  // member reads are the projection's own members, so nothing it evaluates reaches a chain.
  //
  // **AND THE THIRD POSITION IS THE FOURTH MEMBER — THE ADDRESS THE REFUSAL IS ABOUT (`D-77`).** **A SITE THAT
  // KNOWS THE ACT'S ADDRESS HANDS IT; A SITE WHOSE REFUSAL IS ABOUT NO ACT HANDS NOTHING, AND `null` IS ITS
  // DECLARED VALUE** (`refusalAddress` below) — the member is PRESENT on every arm either way.
  refusal = { status, message };
  throw {
    status: refusal.status,
    message: refusal.message,
    log: refusalLog(log),
    address: refusalAddress(address),
  };
}

/// **THE ONE PLACE A REFUSAL'S FOURTH MEMBER IS DECIDED** — `D-77`'s *which act was refused*, taken once so no
/// arm can spell it differently.
///
/// **ITS DOMAIN IS THE CALLER'S OWN ADDRESS DOMAIN AND NOTHING ELSE** (`bindings/js/index.d.ts`'s `Address`,
/// the segment array the caller writes): **the caller compares what it wrote with what it caught, so the
/// answer is spelled the way the question was** — `equal` means its own act, `different` means a listener's.
/// **A FRESH DENSE LIST, BUILT BY INDEX** (`appendOwn`, the file's own idiom): the refusal's own array is never
/// an alias of the caller's argument and no `Array.prototype` member is taken on a refusal path
/// (`contract.md §2.1`'s clause of 2026-10-24 on `F7-1`).
///
/// **EVERY OTHER VALUE IS THE DECLARED `null`, WHICH IS *"THERE IS NOTHING TO NAME"* AND NOT AN ABSENT
/// MEMBER** — absent for a refusal whose subject is a config, a list, a handle, an attempt identity or an
/// addon path, none of which is an act at an address. **A NON-ARRAY IS `null` RATHER THAN A FINDING**: the
/// encoder's own carriers (`{k:'L', s:[…]}`) are not addresses, and this helper's callers hand it either the
/// segment list or nothing.
export function refusalAddress(address) {
  if (Array.isArray(address) === false) return null;
  const segments = [];
  for (let i = 0; i < address.length; i += 1) appendOwn(segments, address[i]);
  return segments;
}

/// **ONE MEMBER OF A HANDED VALUE, READ AS AN OWN DATA PROPERTY OR NOT AT ALL** — `[[GetOwnProperty]]`'s
/// answer, taken through `Object.getOwnPropertyDescriptor`, **which consults no prototype chain**.
///
/// **THE DESCRIPTOR'S OWN `value` IS READ BY `Object.hasOwn` AND NOT BY A MEMBER READ**: an ACCESSOR
/// descriptor carries no `value` at all, so an ordinary read would answer whatever the chain holds under that
/// name — the very hole this helper exists to close, reintroduced one level down. **A DESCRIPTOR WITHOUT AN
/// OWN `value` THEREFORE ANSWERS `undefined`, which is the absent answer**, and the caller's provenance test
/// refuses it exactly as it refuses a missing member. The member's `string` class and not its descriptor is
/// what `fail` tests beside it.
function ownMember(value, name) {
  const descriptor = Object.getOwnPropertyDescriptor(value, name);
  if (descriptor === undefined || !Object.hasOwn(descriptor, 'value')) return undefined;
  return descriptor.value;
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

/// **⟶ AND AN ARRAY THE PACKAGE BUILDS IS EXTENDED BY *DEFINING AN OWN PROPERTY*, NEVER BY `[[Set]]` — ADDED
/// 2026-10-25 ON THE BLIND PASS'S FINDING, THE WRITE VECTOR OF THE CLASS `F8-2` NAMED.**
///
/// **THE HAZARD THE INDEX LOOP LEFT BEHIND, STATED AS THE LANGUAGE STATES IT.** `list[list.length] = value`,
/// `list[i] = value` and `Array.prototype.push` all perform `[[Set]]`, and `[[Set]]` WALKS THE PROTOTYPE CHAIN.
/// Where `Array.prototype` carries an own ACCESSOR at that index with no setter — a getter-only member, which
/// a caller may install and which `C-11` forbids the package to freeze away — `[[Set]]` answers `false` and
/// this package's strict frames raise the RAW HOST `TypeError` *"Cannot set property 0 of [object Array] which
/// has only a getter"*: **out of a LAWFUL call, before any verdict, with `reads === 0` — no user code run and
/// no store verb reached.** The measured states: `storeCreate(lawfulCfg)` threw inside the addon load's own
/// `tried` list, `write(…)` threw inside the argument carrier's, and both were reported as the defect the
/// earlier `F8-2` sweep's *index loop* replacement had created.
///
/// **THE FORM IS THE LANGUAGE'S OWN AND IT INTRODUCES NO THIRD RULE: an array LITERAL, `Array.of(…)` and
/// `Object.defineProperty` DEFINE own properties and never consult the chain** — item `(1c)(ii)` already
/// names `Object.defineProperty` as a lawful static, so this helper reaches nothing a governed path does not
/// already use. **The own data property it defines is byte-for-byte the one `[[Set]]` would have defined on a
/// clean prototype:** `writable`, `enumerable` and `configurable` all `true`, which is what an array element
/// always is.
///
/// **NOTHING ELSE MOVES:** the list, its order, its `length` (an array's exotic own data property answers the
/// append index) and every element it carries are the ones it carried before; the return value is the list, so
/// a call site reads as the append it replaced.
export function appendOwn(list, value) {
  Object.defineProperty(list, list.length, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
  return list;
}

