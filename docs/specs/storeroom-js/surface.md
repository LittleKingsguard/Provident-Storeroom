# `surface` — the verbs that cross, `findAddress`'s non-exposure, the handle clause, the registry, the single failure form and the delivery rules

**KIND: `carrier`.** **This part holds RELOCATED SECTIONS of `docs/specs/storeroom-js/contract.md`'s own
text — its `§2` (`§2.1`–`§2.10`) — WHOLE**: **the relocated span keeps its `§`-number, its tables, its prose
and its authority citations unchanged**, and *a relocation is not a re-derivation — no claim gains or loses
an authority by moving* (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — the kind rule, and
§C.11.9 — the ordinary cross-reference clause | requirement]`). **A citation to it names THIS part's path
plus the `§`-number**, because *a bare `§n` across two documents is not an edge* (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`). **The relocation is SPAN-BY-SPAN
and BYTE-EXACT against the baseline, and the pass's own record enumerates the citation re-spellings it
required as a REQUIREMENT list, one line per re-spelled citation, old form → new form** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v), and its class (v-2) | requirement]`).

---

## §2. The JS surface — the verbs that cross, the handle, and the registry

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried at
`docs/specs/storeroom-js/surface.md` (`§1`–`§9` of this document, relocated WHOLE), the `carrier` part this
directory's map declares for it**; a citation to it names that part's path plus the `§`-number (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`).

### §2.1 The construction call

**`storeCreate(cfg)` crosses as ONE JS function taking ONE plain object.** **`cfg` carries the store's THREE
declared keys — `filePath` · `journalLength` · `listeners` — and the package passes each through WITHOUT
adding a default, a rename or a fourth key** (`DD-36`). **A returned value is the package's own instance
handle** — an opaque JS object whose identity the package owns (**`ListenerHandle` is NOT this handle: this
is the PACKAGE's wrapper around the store's instance, and no clause of this directory exposes any member of
it**). **Every outside form of `cfg` and of its three keys answers the store's own code and returns no
instance** (`§1.3`; `parameter-semantics.md` `PAR-JS-1`–`PAR-JS-4`)
(`[A3 docs/specs/storeroom-native/contract.md §7.1 — the construction input set | state or fail-state
declaration]`).

```
storeCreate(cfg) -> Instance          // throws {status, message} on failure; never returns a partial instance

cfg = {
  filePath:      string | absent,     // PAR-JS-2 — absent is IN DOMAIN (the register is created at mem)
  journalLength: number,              // PAR-JS-3 — REQUIRED, a positive integer counting ENTRIES
  listeners:     { address, handle }[] // PAR-JS-4 — REQUIRED, may be EMPTY, duplicates KEPT
}
```

### §2.2 The address verbs — `read` · `readLiteral` · `write` · `delete`

```
read(instance, address, tier?)        -> JS value          // the assembled value, a leaf's literal, or the whole register
readLiteral(instance, address, tier?)  -> JS value          // the SAME read, narrowed: the target must be a leaf
write(instance, address, tier, value)  -> { op, watched, triggered }
delete(instance, address, tier?)       -> { address, tiers, triggered }
rollback(instance, opId)               -> { opId, undoneOps, restoredTo }
```
**EVERY ONE OF THE FIVE IS SYNCHRONOUS AND RETURNS A FRESH JS VALUE** (`§1.1`'s deep copy out). **THE PACKAGE
PERFORMS NO ARITY CHECK, NO DEFAULTING AND NO VALIDATION OF ITS OWN** (`DD-46`): **a missing, an extra or a
wrong-shaped argument reaches the store's own carrier value and answers the store's own code.** **`read`'s
`tier` accepts ZERO TO MANY — one token or an array — and an array is an ANY-MATCH set, not a union of
values, not an ordered preference and not a filter** (`DD-37`). **`write`'s `tier` is REQUIRED and SINGULAR;
`delete`'s `tier` is OPTIONAL and EXACTLY ONE when present.**
(`[A3 docs/specs/storeroom-native/contract.md §4.1 · §3.1 · §4.3 · §6.3 — the four verbs' own signatures |
requirement]`)

### §2.3 The handle clause — the construction's string, the returned opaque, and the accepted hazard

1. **THE TOKEN'S DOMAIN IS THE PROCESS, AND IT IS THE STORE'S DECLARED DOMAIN.** **A store-minted handle is
   UNIQUE PER PROCESS: no OTHER token the store mints — in this instance, in ANY other instance of THIS
   process, or at ANY LATER moment of THIS process — is equal to it.** **The construction ADOPTS the
   caller's tokens verbatim rather than re-minting them, and a caller-spelled token is instance-local
   because only the instance the caller handed it to holds it.**
   (`[A1 docs/specs/storeroom-js-proposal.md §13 · A69 — *"Proceed on b"*; A3
   docs/specs/storeroom-native/contract.md §0.4 clause 2's dated reconciliation | requirement]`)
2. **TWO JS SPELLINGS FOR ONE TYPE, ONE PER DIRECTION, AND NEITHER DIRECTION IS THE OTHER'S.**
   **IN:** the construction's `listeners[]` takes each handle as a **plain `string`**. **OUT:** every handle a
   verb RETURNS is the package's **opaque JS value** wrapping the token, whose token is PRIVATE and readable
   by no JS code; the package compares handle identity **internally**, by the token it holds. **`unlisten`
   accepts the OPAQUE form ONLY.** (`DD-14`)
3. **THE TWO ACCEPTED CONSEQUENCES, PRINTED WITH THE CLAUSE BECAUSE A CLAUSE THAT HIDES ITS OWN HAZARD IS
   NOT A CLAUSE.** **(i) A PRIOR SESSION'S HANDLE IS OUTSIDE THE DOMAIN, AND WHERE THE CURRENT PROCESS HAS
   SINCE MINTED THE SAME TOKEN IT NAMES *THAT* REGISTRATION — a declared CROSS-PROCESS hazard, not a
   defended property: the counter restarts at each process, and handle identity is TOKEN EQUALITY ALONE.
   THE PACKAGE'S OWN DOCUMENTATION MUST STATE THAT A HANDLE MUST NOT BE CARRIED ACROSS A PROCESS RELOAD**
   (`DD-28`). **(ii) THE CONTAINMENT NOTE STANDS OPEN AND IS NOT DEFENDED HERE: the `listener-<n>` namespace
   is guessable — and the package's own surface never spells a token, so the hazard is reachable only by a
   caller that guesses one, which `DD-28` refuses to document.**
   (`[A1 docs/specs/storeroom-js-proposal.md §13 · A69 — its accepted-consequence cell; A3
   docs/specs/storeroom-native/parameter-semantics.md §2.13 — `PAR-13`'s four outside-value classes | state
   or fail-state declaration]`)
4. **`unlisten` OVER ANY VALUE OUTSIDE THE DOMAIN IS A NO-OP SUCCESS.** **A value a foreign instance minted,
   a value a prior session minted, a value the store never minted at all (fabricated), a blank token and a
   non-opaque value are EACH a no-op success at `unlisten`: no code is produced and NO OTHER REGISTRATION IS
   REMOVED** (`§1.3`'s `ListenerHandle` rows; `parameter-semantics.md` `PAR-JS-8`).
   (`[A3 docs/specs/storeroom-native/parameter-semantics.md §2.13 — class (A), (B), (C) and (D), each with
   its declared answer | state or fail-state declaration]`)
5. **THE HANDLE'S PRESENCE IN A TRIGGERED SET IS DECIDED BY ADDRESS AND BY NOTHING ELSE:** **a handle
   appears in a trigger's list EXACTLY where its listener's address is a PREFIX of the triggering address**
   (`[A3 docs/specs/storeroom-native/contract.md §6.5 item 3 | requirement]`).

### §2.4 The registry — the package's own state, and its four rules

**THE STORE RETURNS HANDLES AND INVOKES NOTHING** (`A57`); **so a JS listener is a FUNCTION the PACKAGE must
hold, and the package owns a PER-INSTANCE REGISTRY keyed by the opaque handle it returned. THE FOUR RULES,
AND NO FIFTH:**
1. **AN UNREGISTERED HANDLE FIRES NOTHING, SILENTLY.** A handle returned in a `triggered` list with **no**
   registered function invokes nothing and reports nothing — **no code, no warning, no log**.
2. **A SECOND REGISTRATION FOR THE SAME HANDLE REPLACES THE FIRST.** **One handle, one function** — the
   registry is **not** a fan-out, and the replaced function is dropped without notice.
3. **A LAWFUL DUPLICATE FIRES ONCE PER DISTINCT HANDLE.** Where two construction entries at one address
   carry the caller's SAME token, the store returns **that token ONCE** in the triggered set where the store
   minted it, and the registry fires **one** invocation per DISTINCT handle — **not one per occurrence, and
   not one per entry** (the store's own `DD-42` is the mint's non-collision rule and its lawful
   caller-spelled collision; this rule is the package's own reading of it).
4. **`unlisten` WITHDRAWS THE REGISTRATION, NEVER THE FUNCTION.** **Withdrawal is the STORE's; invocation is
   the PACKAGE's.** `unlisten` removes the store-side home entry; **the package's registry entry stands**,
   so a function whose handle is withdrawn **simply never fires again** — and a later re-`listen` at the same
   address mints a **DIFFERENT** handle, whose registration is a NEW registry entry. **The registry is
   released with the instance and by nothing else** (`DD-15`, `DD-17`).
   (`[A1 docs/specs/storeroom-js-proposal.md §9.2 — the supervisor's priced `K9` rule, as adopted; A1
   docs/specs/storeroom-js-proposal.md §18 · A57 — *"a handle that it returns to alert the client of the
   trigger"* | requirement]`)

### §2.5 The single failure form

**A FAILURE CROSSES AS A THROWN PLAIN OBJECT WITH EXACTLY TWO MEMBERS, AND THERE IS EXACTLY ONE SUCH
FORM:**
```
{ status: string, message: string }
```
1. **`status` is the store's own member token VERBATIM** — one of the store's closed `15` members, as a JS
   `string`, **never an index, never a lowercased or prefixed variant and never a package-minted code** —
   **and a code the store returns that lies outside the closed set is passed through VERBATIM rather than
   re-mapped** (`DD-40`).
2. **`message` is the store's own GENERATED message VERBATIM** — never empty, never a placeholder and never
   hand-authored by the package.
3. **THE FAILURE IS THROWN AND NEVER RETURNED.** There is **no** returned tagged union, **no** `{ok, value}`
   envelope, **no** `Promise` rejection (**every verb is synchronous**) and **no** `Error` subclass: **the
   object thrown is a plain object whose prototype is the caller realm's `Object.prototype` and whose two
   members are exactly `status` and `message`** (`DD-12`).
4. **NO DISCRIMINATION RULE IS OWED.** **A caller that stores a value whose shape is indistinguishable from
   this object and then cannot tell its own input from a genuine failure carries an UNSUPPORTED
   ANTI-PATTERN** — the architect's own ruling — **so this unit declares no discrimination helper, no
   branded record and no third member** (`DD-13`).
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · A64; A3 docs/specs/storeroom-native/contract.md §8.3 — the
   error's closed two-member shape | state or fail-state declaration]`)

### §2.6 The constraint/repair pattern — a usage pattern over declared verbs, never a seam

**CONSTRAINT AND REPAIR EVALUATION IS CLIENT-SIDE.** **The JS side holds the constraint functions; the
crossing this subject needs is ALREADY IN the surface (`write` out, `rollback` in).** **The pattern, stated
in full because it is the whole of what this unit declares about it:** **evaluate constraints AFTER a
`write` returns; on a violation, call `rollback` with the `JournalOp.opId` THAT WRITE RETURNED.**
**NO constraint verb, NO repair verb, NO constraint parameter, NO constraint record and NO function-carrying
parameter is declared — and the store's own surface takes no function at any position** (`DD-16`).
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A73 — *"Constraint/Repair is client-side, using rollback to
reverse constraint violations."*; A3 docs/specs/storeroom-native/contract.md §7.3 — the constraint seam's
own boundary | requirement]`)

### §2.7 Listener delivery — the window, the order and a throwing body

1. **`triggered` CROSSES AS A JS ARRAY OF THE PACKAGE'S OWN OPAQUE HANDLES**, fresh on every call, in the
   two records the store's own contract declares (`WriteResult` and `DeleteReceipt`).
2. **THE INVOCATION IS THE CALLER'S, AND THE PACKAGE PERFORMS IT AFTER THE VERB HAS RETURNED.** **The
   invocation is SYNCHRONOUS and happens after the store call has completed and the record has been
   copied out** (`DD-22`).
3. **NO ORDER IS ASSERTED.** The store declares the returned set's order unobservable, so **this unit asserts
   MEMBERSHIP ONLY**: a drive compares **sets**, never sequences, and **no clause of this unit promises a
   registration order, an address order or a tier order** (`DD-22`).
4. **A THROWING LISTENER BODY IS NOT CAUGHT, NOT RETRIED AND NOT REPORTED.** **The exception propagates out
   of the package's own invocation loop; the store's verb result is already complete and copied out, so the
   throw neither rolls back nor alters anything the store did** (`DD-23`).
   (`[A3 docs/specs/storeroom-native/contract.md §6.5 item 5 — *"NO ORDER IS DECLARED FOR THE LIST"*; A1
   docs/specs/storeroom-js-proposal.md §15 · A73's neighbourhood — the firing window is this unit's own
   carriage | ordering claim]`)

### §2.8 The two file-behaviour readings a JS caller will meet

1. **A `delete` AND A `rollback` PERFORM NO FILE I/O.** **`file`-tier durability is produced by a
   successful `file`-tier `write` ONLY**, so **a JS caller that deletes or rolls back a `file`-tier version
   and then constructs a FRESH instance over an equal `cfg.filePath` sees the removed version STAND AGAIN**
   — **that re-boot is the store's own declared boot and is the declared consequence of this reading, NOT a
   defect** (`DD-45`).
2. **THE PACKAGE DOCUMENTS BOTH READINGS AND COMPENSATES FOR NEITHER.** **The package performs no
   compensating file write and no re-commit**, and **a `file`-tier write that fails answers
   `FileCommitFailed` AFTER the store's own automatic journal rollback has run**
   (`[A3 docs/specs/storeroom-native/contract.md §7.2 items 3–6 | state or fail-state declaration]`).

### §2.9 `findAddress` IS NOT EXPOSED — the non-exposure clause, and its consequence

**`findAddress` IS AN INTERNAL TOOL AND THIS UNIT DOES NOT EXPOSE IT.** **The architect's words, verbatim:
*"find address is an internal tool - JS only needs read + edit functions and listeners"*** (`A63`).
**CONSEQUENCES, EACH STATED SO NOTHING IS LEFT TO INFERENCE:**
1. **THE JS SURFACE IS EXACTLY `storeCreate` · `read` · `readLiteral` · `write` · `delete` · `rollback` ·
   `listen` · `unlisten` — `8` verbs — plus the returned records.** **No `NodeRef` crosses, no reference
   crosses, and `findAddress`'s *"returns reference"* has no JS spelling.**
2. **A FAILED READ IS THE EXISTENCE PROBE.** **Because no resolver is exposed, a JS caller asks whether an
   address exists by `read`ing it: a `read` that resolves answers the value, and a `read` that does not
   answers a thrown `{status, message}`.** **THEREFORE ALL `15` FAIL CODES REMAIN REACHABLE FROM JS** — the
   walk's `9` address codes on the address verbs, the value taxonomy's `ValueNotAdmitted`, the two
   construction members, `JournalOpUnknown`, `RollbackCompacted`, `ReadTargetIsBranch` and
   `ContainerKindConflict` — **and no code is left without a JS-reachable trigger.**
3. **NO `exists()` VERB, NO `findAddress` SHIM AND NO BINDING-SIDE RESOLVER IS DECLARED** — an `exists()`
   verb would be a **store-surface addition** and a shim would be a **second resolver**, and the store's own
   contract declares exactly ONE shared resolver (`§2.1`).
   (`[A1 docs/specs/storeroom-js-proposal.md §8 · A63; A1 docs/specs/storeroom-js-proposal.md §10 · A65 — no
   reference crosses either way, so the non-exposure is entailed by the copy discipline and not merely a
   surface choice | prohibition]`)

### §2.10 `listen` and `unlisten` — the crossing's two registration verbs

```
listen(instance, address)      -> Handle    // mints a token, populates the store's home, wraps it for JS
unlisten(instance, handle)     -> undefined  // drops ONE store-side home entry; a no-op success for anything else
```
**`listen`'s `address` is `AddressArg`'s domain and NOTHING MORE** — **a listener carries NO tier qualifier:
its address is the WHOLE of its key** (`[A3 docs/specs/storeroom-native/contract.md §6.5 — the listener
record's closed two-member set | requirement]`). **`unlisten` returns `undefined` on success, including on
its no-op success, and throws exactly where the store does** — **and the store throws nowhere on a withdrawal
except for a malformed argument's shape.** (`[A3 docs/specs/storeroom-native/contract.md §0.4 — the
`Store::listen`/`Store::unlisten` rows | requirement]`)

---

**END OF THIS PART.** **It carries the contract's `§2` whole and declares nothing the contract does not
already carry: the `§`-numbers, the rules, the signatures and every authority citation are the contract
document's own** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a carrier introduces no
claim of its own | requirement]`).
