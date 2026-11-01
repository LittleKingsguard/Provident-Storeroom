# Research — the cross-kind intake (a constraint and a listener at one address)

**WHAT THIS FILE IS.** The intake note for one downstream report, filed under the intake rule that a note goes to
`role_l0_research`. **IT IS A RECORD OF WHAT WAS VERIFIED AND WHAT REMAINS OPEN — it designs nothing, ranks nothing,
decides nothing and opens no unit.** Its companion ruling is `strata/decisions.md` · `D-98`.

**CHANNEL FAILURE, RECORDED BECAUSE IT IS PART OF THE NOTE'S PROVENANCE.** The `role_l0_research` delegation was
attempted twice and FAILED AT STARTUP both times, deterministically, before reading a byte:
`tools.restrict() names unknown global tools "web_search", "web_fetch"; known global tools: …` — the role's configured
tool set names two tools this harness does not carry. **So this note was filed by L0 directly, in its intake capacity,
as the least-bad route rather than as the channel's own work.** When the role's tool set is repaired, a research pass
should re-derive and replace this note; nothing here depends on the reporter's hands being L0's.

**DATE:** 2026-11-01. **BRANCH:** `main`. **THE PACKAGE MEASURED:** `provident-storeroom` `1.6.2`, installed at
`/media/ryanr/Shared Files/Projects/Provident-Electron/node_modules/provident-storeroom`, whose `index.mjs` is
**byte-identical** to this checkout's `bindings/js/index.mjs` (`sha256
d3790c75b582ff4334a872da696abd1adbeab9bef3b92d7f9af5ee17aefd7a38`, both). **THE APP:** `Provident-Electron` at
`/media/ryanr/Shared Files/Projects/Provident-Electron` (`bd2b119` the failing record, `664d9dd` its fix, `62a30de`
the documentation commit after it).

---

## §1 · The inputs

### §1.1 · The downstream report (the app's own account, condensed but faithful)

`src/main/tabs-record/index.ts`'s `subscribe(handler)` delivered nothing, and the report says it had **two independent
faults, both measured**:

1. **The address was refused.** `standing.listen(HANDLE, [TABS_RECORD_ADDRESS])` with `TABS_RECORD_ADDRESS = ['tabs']`,
   where all five of the record's constraint pairs stand. The throw was swallowed by a bare `catch`, and the teardown
   returned a function that unlistened `null`.
2. **`register` was never called.** `handler` occurs exactly twice in the pre-fix file — the interface declaration and
   the parameter — so even a lawful `listen` would have fired nothing ("an unregistered handle fires nothing, silently",
   guide §6.3 rule 1).
3. **A third, latent fault:** one fixed `HANDLE` string per module meant a second `subscribe` overwrote the first's
   body (`register` replaces) and the first's teardown withdrew the handle whole (`unlisten` withdraws whole) — measured
   `{first: 0, second: 1}`, unchanged after one withdrawal.

The report's own framing of the refusal: *"The package rejects a cross-kind duplicate at one address … The operative
clause is 'a listener and a constraint do not share one'"*, read from guide §7.3 and the package's `D-25`; and its own
verdict on the message: *"That is a package reporting defect, distinct from the refusal being correct."*

The report's closing facts: the chain had no consumer in `src/renderer/`, so **nothing in the app was observably
broken**; the fix landed in `664d9dd` (not `62a30de`, which is documentation only); the fix installs at `['tabs','order']`,
calls `register`, mints one handle per subscription, writes nothing in the body and contains the caller's throw.

### §1.2 · The architect's ruling (recorded as `D-98`)

Verbatim: **"Constraints and listeners can share the same address, but not handle"**; and, restated: **"A constraint
and a listener can share an address, as can multiple constraints/listeners. The restriction is that a listener and a
constraint cannot have the same *handle*."** The intended function: cross-kind co-location at one address is LAWFUL;
multiple constraints and multiple listeners at one address are LAWFUL; the only cross-kind restriction is a SHARED
HANDLE (a listener's handle equal to a pair's `id`), both directions.

---

## §2 · The claims ledger

**Method.** Every claim below was re-measured by this pass (drives in §6) or read at the bytes; the leads in §1 were
not trusted as findings. Arms are labelled `K-…` for the package drives and `A-…` for the app-side checks.

| # | claim | verdict | evidence |
|---|---|---|---|
| C-1 | the app's pre-fix `subscribe` called `listen` at `['tabs']` and swallowed the throw | **VERIFIED** | `git show bd2b119:src/main/tabs-record/index.ts` — the `subscribe` body, `:655`–`:666`: `try { handle = standing.listen(HANDLE, [TABS_RECORD_ADDRESS]) } catch { return () => undefined }` |
| C-2 | `register` was never called; `handler` occurs exactly twice | **VERIFIED** | same file, `grep -n "handler"` → `:53` (the interface declaration) and `:655` (the parameter), and no other line |
| C-3 | the pre-fix throw is the cross-kind `AddressMalformed` with the reported message | **VERIFIED** | `K-1` (this pass's drive) reproduces the message byte for byte; the app's own docblock records the same `MEASURED 2026-11-01, the installed 1.6.2` |
| C-4 | the message's FIRST SENTENCE is false (the segment is legal; the container is a defaulted `''`) | **VERIFIED** | `K-1` and `K-3`…`K-6`: every cross-kind arm prints `"'<segment>' is not a legal address segment in ''"`; the segment is written to and read from elsewhere in the same store (the batch pairs at `['tabs']` were constructed, and other writes to `['tabs','order']` succeed), so the segment is legal |
| C-5 | the message is composed by `boundaryReject` as `${generated}, ${clause}` | **VERIFIED** | `bindings/js/src/entry/artefact.mjs:360`–`:378`; `generated = addon.errorMessage(status, subject[, container])`, and the cross-kind call sites pass NO container (so the store's default `''` renders) |
| C-6 | the package refuses a listener at a constraint's address **as a rule** | **VERIFIED AS BEHAVIOUR; REFUTED AS THE INTENDED RULE** | `K-1`/`K-3`/`K-6` measure the refusals; `D-98` declares the intended function, and the refusal is its defect |
| C-7 | `constraintOff` frees the address; a descendant address is lawful | **VERIFIED** | `K-17` (`constraintOff` then `listen` → `"h"`), `K-18` (`constraintOn` after → success), `K-2` (`listen('h',[['tabs','order']])` → `"h"`) |
| C-8 | a mixed set refuses whole; `log: []` and `address: null` say nothing about which member offended | **VERIFIED** | `K-4`: `Object.keys` `["status","message","log","address"]`, `log` `[]`, `address` `null`, message names the pair |
| C-9 | the fix is `664d9dd`, not `62a30de` | **VERIFIED** | `git show 62a30de --stat` → documentation only; `git show 664d9dd:src/main/tabs-record/index.ts` carries `listen` + `register` + `handleFor()` + the contained body |
| C-10 | PRE-FIX triggered = 5 constraint handles / 0 deliveries; POST-FIX = 5 + the listener / 1 delivery | **VERIFIED** | `K-19`/`K-20` reproduce both; the post-fix `triggered` reads the five pair ids plus `tabs-record:1@tabs/order`, and the handler is called once |
| C-11 | the fixed-`HANDLE` starvation: `{first: 0, second: 1}`, unchanged after one withdrawal | **VERIFIED** | `K-21`: `register` at one handle replaces the body; `unlisten` withdraws the handle whole; the drive counts exactly the reported figures |
| C-12 | the chain has no renderer consumer yet | **UNVERIFIABLE HERE** | the claim is about the app's `src/renderer/`, which this repo does not carry; not re-read |
| C-13 | "the refusal being correct" (the report's framing) | **REFUTED** by `D-98`'s ruling | the ruling's three clauses (§1.2) and the measured defect arms `K-1`/`K-4`/`K-7`/`K-8` |

---

## §3 · The record's state (quoted at its sites)

**`D-25` (2026-10-24), verbatim ruling:** *"Attempting to overwrite a listener with a constraint or vice versa is
rejected"*. **Its subject, at its own words:** *"The overwrite rule is scoped by kind. A duplicate handle of the same
kind is an overwrite (`D-24`). A duplicate handle ACROSS kinds … is REJECTED."* — **the HANDLE is the subject.**

**`D-29` (2026-10-24), verbatim ruling:** *"Listen cannot overwrite constraint, only other listeners"*, *"Handle
becomes the internal ID"*. **Its open mechanism question:** *"Is `listen`'s cross-kind test IDENTITY-based …, ADDRESS-based
…, or BOTH? The ruling's intent is settled — no cross-kind overwrite — and **the address dimension is NECESSARY,
because §2.2 item 7's purge is address-reaching**; whether the identity dimension is also tested is L1/L2's to declare
against `Home::purge`."* — **the sentence in bold is the one `D-98` withdraws, and §4 says why the ground is false.**

**`D-27`:** the batch's stricter rule — *"Reject duplicate handles in batch - regardless of listener/constraint type"*
— the batch's `id`-equal-to-an-adopted-handle refusal is **HANDLE-based and kept**.

**`D-69`:** *"a constraint is mechanically the same as a listener … the distinction is whether it is registered as a
constraint … or as a listener"* — one trigger set, filtered by kind; and the registry entry now carries its `kind`.

**The guide (`docs/guides/package-use.md §7.3`, `:920`–`:932`):** *"A duplicate handle of the SAME kind is an overwrite.
A duplicate handle ACROSS KINDS — a listener where a constraint stands, or a constraint where a listener stands — is
REJECTED"*, with its 2026-10-26 measurement at `:927` (*"with `c1` armed at `['a']`, `store.listen('h1', [['a']])
threw"*) — **the measurement OF THE DEFECT.**

**`docs/L1/surface-deltas.md`, the `B-5` row (`:271`):** its condition column reads *"`register` where a constraint's
`id` stands"* — **a HANDLE condition** — while the code it reconciles (`§2.5`, quoted at `:405`–`:415`) is
`constraintAtAnyAddress(state, handle)`, an ADDRESS-SET intersection. **The declaration and its build disagree, and
`D-98` reads the declaration.**

**`docs/specs/storeroom-held-listener-identity/contract.md`:** `§2.3` item 9 and `§4` `F-9` — the condition *"`register`
at an address a CALLER's constraint pair stands at"* (ADDRESS-based, `:393`) and the form cell naming both sides and
the shared sentence. **Read through `D-98`, the condition becomes a HANDLE condition.**

---

## §4 · Why `D-29`'s address-necessity ground is false at the build

`D-29`'s ground: the purge is address-reaching, so a listener's act could destroy a pair's home entries. **The purge is
BY HANDLE at every layer:**

- `src/store.rs`'s `listen` (`:2576`): *"(1) THE PURGE … the purge takes the handle"* — `self.home.purge(handle)`
  (`:2601`); its docblock at `:2565` reads *"the purge is BY HANDLE and it is UNCONDITIONAL"*.
- `Home::purge` (`src/store.rs:476`): `bucket.retain(|listener| listener.handle.to_string() != token)` (`:484`) — a
  different handle's rows are untouched.
- the package's mirror purge (`bindings/js/index.mjs:821`): `state.home = state.home.filter((row) => row.handle !== handle)`.

**And the co-location works when the order allows it (`K-22`):** a listener first and a pair added after at one
address — `listen`, `register`, `addConstraint` all succeed, and a write triggers both, the pair asked and the listener
delivered once. **So the address dimension guards against a destruction that cannot occur, and the one state it would
guard (`K-23`/`K-24`, a SHARED handle) is already refused by the identity dimension.**

---

## §5 · The sites inventory

### §5.1 · CODE

| site | what it is | dimension | ruling's disposition |
|---|---|---|---|
| `bindings/js/index.mjs:797`–`:806` | `listen`'s `B-6` — `constraintOverwrittenByListen(state, handle, addresses)`; the `boundaryReject` at `:799` | **ADDRESS** (dimension 2) **and HANDLE** (dimension 1) | dimension 2 is the defect; dimension 1 kept |
| `bindings/js/src/entry/delivery.mjs:369`–`:380` | `registerOn`'s `B-5` — `constraintAtAnyAddress(state, handle)`; the `boundaryReject` at `:370` | **ADDRESS** | the defect; the identity test it must keep is the handle's |
| `bindings/js/src/entry/delivery.mjs:450`–`:468` | `constraintAtAnyAddress` — home rows of the handle × pair addresses | **ADDRESS** | the helper's subject moves to the handle |
| `bindings/js/src/entry/delivery.mjs:518`–`:560` | `constraintOverwrittenByListen` — dimension 1 (`handle === entry.id`), dimension 2 (set ∩ pair's addresses), the kernel's exemption, the `enabled` skip | **BOTH** | dimension 2 removed; dimension 1 kept; the `enabled` skip is open (§7) |
| `bindings/js/index.mjs:987`–`:995` | `addConstraint`'s arm — `listenerStandingAt(state, site.id)` | **HANDLE** | kept; the message moves (§5.3) |
| `bindings/js/src/entry/frame.mjs:309`–`:315` | the batch's `B-3` — an element `id` equal to an adopted listener's `handle` | **HANDLE** | kept; the message moves (§5.3) |
| `bindings/js/src/entry/kernel-registration.mjs:127` | the comment naming the deleted prefix exemption and the *"a listener and a constraint do not share one"* test | comment | read through `D-98` |

### §5.2 · DOCUMENTS

| site | what it states | dimension |
|---|---|---|
| `docs/guides/package-use.md:920`–`:932` (`§7.3`) | the cross-kind duplicate is rejected, both directions; the 2026-10-26 measurement at `:927` | **ADDRESS** as written (measured); the HANDLE reading governs |
| `docs/guides/package-use.md:916`–`:918` (`§7.2`'s batch paragraph) | the batch's cross-kind collision (`D-27`) | **HANDLE** (kept) |
| `docs/specs/storeroom-held-listener-identity/contract.md:393` (`§4` `F-9`) | condition *"register at an address a CALLER's constraint pair stands at"*; form cell naming both sides | **ADDRESS** → becomes a HANDLE condition |
| `docs/specs/storeroom-held-listener-identity/contract.md:180`–`:184` (`§2.3` item 9) | the form reconciliation (`AddressMalformed`, `{status, message, log, address}`) | form kept; the message loses the false half |
| `bindings/js/index.d.ts:997`–`:1010` (`register`) | the cross-kind clause: one thrown form, `AddressMalformed`, *"naming BOTH SIDES and carrying the shared rule sentence"* | form kept; message owes |
| `bindings/js/index.d.ts:961`–`:982` (`addConstraint`) | *"a pair whose `id` equals a LIVE LISTENER'S HANDLE is REJECTED"* | **HANDLE** (kept) |
| `bindings/js/index.d.ts:238`–`:252` (`StoreConfig.constraints`) | the batch's cross-kind collision (`D-27`) | **HANDLE** (kept) |
| `docs/specs/storeroom-js/surface.md:2075` (`§2.4` (iii)) | `addConstraint`'s listener-handle arm | **HANDLE** (kept) |
| `docs/L1/surface-deltas.md:271` (`B-5` row) / `:405`–`:415` (`§2.5`) | the declared condition (HANDLE) and the code it reconciles (ADDRESS) | the disagreement `D-98` resolves |
| `bindings/js/src/entry/kernel-registration.mjs:127` | the exemption comment (see §5.1) | comment |

### §5.3 · THE MESSAGES, AT ALL FOUR ARMS (verbatim, from the drives)

- `listen`: `"'tabs' is not a legal address segment in '', segments are strings or non-negative integers, the listener
  'h' cannot be installed at tabs: the constraint 'tabs-must-stand' stands there, and a listener and a constraint do not
  share one"` — **the generated half is false**; the clause half is true.
- `register`: `"'k' is not a legal address segment in '', segments are strings or non-negative integers, the listener
  'r1' cannot be registered at k: the constraint 'pair1' stands at that address, and a listener and a constraint do not
  share one"` — same shape.
- `addConstraint`: `"'p' is not a legal address segment in '', segments are strings or non-negative integers, the
  listener 'hx' cannot share its handle with the constraint 'hx' at p: a listener and a constraint do not share one"` —
  same shape.
- `batch`: `"''ck'' is not a valid constraint entry in 'constraints', a constraint entry is an address and an id, and
  the address is a segment array, the batch element at position 0 names the handle 'shared-handle', and this
  construction adopts a listener under that handle at lk: a listener and a constraint do not share one"` — **the
  generated half claims the element is an invalid entry, which it is not**; the clause is true.

### §5.4 · CELLS (what each asserts, and which dimension)

| cell | file:line | asserts | dimension | disposition |
|---|---|---|---|---|
| the identity arm | `tests/e2e/blind-listener-surface.test.mjs:280`–`:302` | a listener registered where a pair's `id` stands is REFUSED; nothing moves | **HANDLE** | kept (message moves) |
| the form cell | `tests/e2e/blind-listener-surface.test.mjs:303`–`:338` | the one plain form, `AddressMalformed`, `log: []`, and the shared sentence | **HANDLE** | kept; the sentence moves with §5.3 |
| `DEF-N` | `tests/e2e/blind-defect-cases.test.mjs:68`, `:794`–`:802` | `addConstraint`'s direction: one plain form + the shared sentence | **HANDLE** | kept (message moves) |
| the batch arm | `tests/e2e/blind-constraints-surface.test.mjs:133` | batch `id` equal to an adopted handle → `ConstraintListInvalid` | **HANDLE** | kept (message moves) |
| `G3-22` | `tests/e2e/registration-write-route.test.mjs:380`–`:400` | **records as a finding** that a listener cannot be installed at a pair's address; works around it by binding at the register | **ADDRESS** | the finding's subject stands as a finding; the workaround re-derives after the fix |
| `HLI-11.3`/`.3.a` | `tests/e2e/held-listener-identity-greens.mjs:882`–`:912` | a listener at a pair's address under an app handle is REFUSED `AddressMalformed`, nothing moved | **ADDRESS** | **asserts the defect**; re-derives |
| malformed-shape list | `tests/e2e/registration-instant-properties.test.mjs:323` | `'cross-kind-collision'` among the malformed shapes | mixed (the property's own shapes) | re-read against the ruling |
| the comments | `tests/e2e/constraints-publication.test.mjs:838`, `:931` | the register-side cross-kind arm's form, as prose | form | prose moves with §5.3 |
| the comment | `tests/e2e/file-tier-save/scenarios.mjs:164` | *"a listener and a constraint do not share one handle"*, then the address reading | **HANDLE sentence; ADDRESS behaviour** | the sentence is `D-98`'s; the behaviour contradicts it |

---

## §6 · The drives (commands and outputs, verbatim)

**Harness.** Node (the environment's own); the package is the app's installed `1.6.2`; every probe lives in `/tmp` and
imports its `index.mjs`; the addon is the app's platform package. **No project script was run and no tree was
touched.** 29 arms; the outputs below are the raw lines.

```
THROW K-1 listen('h',[['tabs']]) (different handles, one address) => AddressMalformed log=[] address=null
      message="'tabs' is not a legal address segment in '', segments are strings or non-negative integers, the listener 'h' cannot be installed at tabs: the constraint 'tabs-must-stand' stands there, and a listener and a constraint do not share one"
THROW K-2 listen('tabs-must-stand',[['tabs','order']]) (same handle, different address) => AddressMalformed
OK    K-3 listen('h',[['tabs','order']]) => "h"
THROW K-4 listen('h2',[['tabs'],['tabs','order']]) (mixed set, refuses whole) => AddressMalformed
OK    K-5 listen('a',[['x','y']]) => "a" ; K-6 listen('b',[['x','y']]) => "b"        (two listeners, one address)
OK    K-7 listen('r1',[['k']]) => "r1" ; K-8 addConstraint(pair1@['k']) => {}        (a listener first)
THROW K-9 register('r1', fn) after the pair stands => AddressMalformed               (B-5, the address arm)
OK    K-10 listen('hx',[['p']]) => "hx" ; K-11 register('hx', fn) => undefined
THROW K-12 addConstraint({id:'hx'} @ ['q']) => AddressMalformed                     (identity, intended)
OK    K-13 listen('tabs-record:1@tabs/order',[['tabs','order']]) => "…@tabs/order" ; K-14 register => undefined
OK    K-15 write(['tabs']) => triggered [5 pair ids + tabs-record:1@tabs/order] ; calls: 1
THROW K-16 listen('tabs-record',[['tabs']]) (the app's original arm) => AddressMalformed
OK    K-17 constraintOff => undefined ; K-18 listen('h',[['tabs']]) => "h" ; constraintOn => undefined
      (a disabled pair frees the address; re-enable succeeds with a listener standing there)
THROW K-19 construction: listeners [{address:['tabs'],handle:'L'}] + batch pair P@['tabs'] => AddressMalformed
      (the adopted listeners are applied through `listen` after the batch arms)
OK    K-20 listener first, pair after: listen/register/addConstraint all OK; write(['k']) => triggered
      [{handle:'r1',address:['k']},{handle:'P',address:['k']}]; r1 deliveries: 1
OK    K-21 one handle, two subscriptions: register(h, f1), register(h, f2) => f1 starved; unlisten(h) =>
      the handle withdrawn whole  (the app's latent fault, reproduced)
THROW K-22 register('tabs-must-stand') (the pair's own id) => AddressMalformed
THROW K-23 listen('tabs-must-stand',[['x','y']]) (same id elsewhere) => AddressMalformed
THROW K-24 the batch: listeners [{address:['lk'],handle:'shared-handle'}] + pair id 'shared-handle' =>
      ConstraintListInvalid ("…''ck'' is not a valid constraint entry…")
THROW K-25 register('cross-form-id') after addConstraint({id:'cross-form-id'}) => AddressMalformed
      (the identity arm the blind-listener cell :303 drives)
OK    K-26 five pairs at ['tabs'] => construction stands ; K-27 constraintOn over a listener => OK
OK    K-28 post-fix shape: triggered [5 pair ids + handle], deliveries 1 ; K-29 pre-fix: 0 deliveries
```

**App-side checks (read-only):** `git show bd2b119:src/main/tabs-record/index.ts | grep -n handler` → `:53`, `:655`;
the `subscribe` body at `:655`–`:666`; `git show 62a30de --stat` → docs only; `git show 664d9dd:src/main/tabs-record/index.ts`
→ `LISTENER_ADDRESS = TABS_ORDER_ADDRESS`, `handleFor()`, `listen` + `register`, the contained body.

**Byte identity:** `sha256sum` on the checkout's `bindings/js/index.mjs` and the app's installed copy → the same hash
(`d3790c75…`), so the drives speak for this tree's source at its own last measurement.

---

## §7 · OPEN questions (the record does not answer these; no recommendation is made here)

1. **THE MESSAGE'S FORM AND ITS GENERATION.** All four cross-kind arms compose the store's `AddressMalformed` segment
   template with a hand-authored clause; the generated half is false. What the message should be — which generator
   row/clause, which container (none?), whether the status moves — is a declaration this note does not take. The
   constraints on it are the one-form rule (`surface.md §2.5`) and `strata/brief.md`'s UC-10.
2. **THE DISABLED-PAIR ASYMMETRY.** `constraintOverwrittenByListen` skips pairs with `entry.enabled !== true`;
   `constraintAtAnyAddress` does not filter on `enabled`. Measured: a disabled pair frees the address for `listen`;
   the same pair's handle is still tested by `register`; and `constraintOn` re-enables over a listener standing at the
   pair's address. Whether a DISABLED pair's handle blocks a listener's claim of it — and what a later `constraintOn`
   does with a listener standing under the pair's own id — is unanswered.
3. **THE CONSTRUCTION'S ORDER.** The batch is armed before `cfg.listeners` are applied (measured: the construction
   refuses when they share an address). Whether that order is a rule or an accident is not decided anywhere read.
4. **WHAT ELSE THE ADDRESS DIMENSION WAS GUARDING.** The dimension was added on `D-29`'s stated ground (the purge); the
   ground is false at the build. Whether any OTHER clause (a delivery, a dedupe, a mirror state) relied on listeners and
   pairs never sharing an address — the drives at `K-20`/`K-26`/`K-27` say no at the store's own triggers, but this note
   claims nothing beyond the store's observable answers.
5. **THE DOWNSTREAM'S `src/renderer/` CLAIM** (no consumer yet) is unverifiable from this repository.

---

## §8 · SUMMARY envelope

**VERIFIED.** The app's failing record and its two independent faults; the fix's revision and shape; the pre/post-fix
delivery counts; the one-handle starvation; the package's cross-kind refusals are ADDRESS-based at `listen` and
`register`; the identity refusals are HANDLE-based at `addConstraint` and the batch; the message composition and the
false generated half at all four arms; the store's purge is handle-keyed at `src/store.rs:476`/`:484` and `:2601`; the
installed `1.6.2` is byte-identical to this checkout's `index.mjs`.

**REFUTED.** The report's premise that the address-based refusal is the intended rule (`D-98` declares otherwise); and,
with it, the guide §7.3 reading as it stands and the `F-9` condition as written.

**OPEN.** Four questions (§7), all of them declarations another layer owes.

**FILES READ.** `strata/brief.md`, `strata/walkthrough.md`, `strata/decisions.md` (`D-25`, `D-29`, `D-27`, `D-69`,
`D-98`); `docs/guides/package-use.md` (`§7.2`, `§7.3`); `docs/specs/storeroom-held-listener-identity/contract.md`
(`§2.3` item 9, `§4` `F-9`); `docs/specs/storeroom-js/surface.md` (`§2.4` (iii)); `docs/L1/surface-deltas.md` (`B-5`,
`§2.5`); `bindings/js/index.mjs`; `bindings/js/src/entry/artefact.mjs`, `delivery.mjs`, `frame.mjs`,
`kernel-registration.mjs`, `kernel-foundations.mjs`; `bindings/js/index.d.ts`; `src/store.rs`; `src/error.rs`;
`tests/e2e/blind-listener-surface.test.mjs`, `blind-defect-cases.test.mjs`, `blind-constraints-surface.test.mjs`,
`registration-write-route.test.mjs`, `held-listener-identity-greens.mjs`, `registration-instant-properties.test.mjs`,
`constraints-publication.test.mjs`, `file-tier-save/scenarios.mjs`; the app's `src/main/tabs-record/index.ts` at
`bd2b119`/`664d9dd`; the app's installed `provident-storeroom` `1.6.2`.
