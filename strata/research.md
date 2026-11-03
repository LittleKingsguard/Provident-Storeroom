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

---

## §9 · The second downstream report — the `addConstraint` arm measured against a RESERVATION

**THE REPORT.** The downstream measured, on the published artefact: `listen('dup', [['q']])` → `"dup"`, then
`addConstraint({address: ['q'], id: 'dup'}, …)` → **ANSWERED**; while `register('pair1', fn)` at a carried pair's id
threw `B-5`, and a colliding handle at a distinct address threw too — so, the report reads, the handle test "works
everywhere except `addConstraint`", declared two-directional and implemented one-directional.

**VERIFIED — AND THE FINDING IS REFUTED AS A PACKAGE DEFECT.** Drives on this checkout's `1.7.0` build, one fresh
instance per arm:

| arm | the drive | measured |
|---|---|---|
| `a2` | the report's exact drive: `listen('dup', [['q']])` **with no `register`**, then `addConstraint({address: ['q'], id: 'dup'})` | **ANSWERED** — the entry `listen` wrote is a **RESERVATION** (`off: true`, no function), and that is the **declared lawful arm** |
| `b3` | `listen('dup', [['q']])`, **`register('dup', fn)`**, then `addConstraint({…, id: 'dup'})` | **THROWS** `AddressMalformed`, `B-4`'s §3.6 text |
| `c3` | a LIVE listener at `['x']`, the pair at `['q']` — one handle, two addresses | **THROWS** the same — the arm reads the HANDLE, not the address |
| `d1` | a listener claiming a carried pair's id — the other direction | **THROWS** `B-5` |

**So the arm fires in both directions, for a LIVE listener, at any address.** `D-25`'s own words carry the subject —
*"a pair whose `id` equals a **LIVE** LISTENER's handle is REJECTED"* — `listenerStandingAt` reads exactly
`off === false` **and** a function **and** `kind !== 'constraint'` (`delivery.mjs`), and
`docs/L1/cross-kind-handle-only.md` §9.4's closing paragraph declares the reserved case lawful: a pair may take a
reservation's handle, because that is `D-24`'s same-kind overwrite of an entry that **fires nothing and carries no
kind**. The report's drive omitted the `register`, and its conclusion is the reservation arm, not a missing test.

**THE GAP IT DOES FIND, AND IT IS OWED — A DOCUMENTATION GAP.** The guide's `§7.3` states the rule without its
subject: *"a listener and a constraint do not share one handle"* reads as **unconditional**, and a reader who
listens without registering is told the handle is taken where the declared law says a reservation does not block a
pair's `id`. **The fix is one dated clause at the guide's `§7.3` naming the LIVE listener and pointing at `§6.2`'s
reservation** — a documents act, not a behaviour change. **The app is unaffected**: its `subscribe` registers.

**FILES READ.** `docs/guides/package-use.md` (`§7.3`); `docs/L1/cross-kind-handle-only.md` (`§9.4`); `strata/decisions.md`
(`D-25`); `bindings/js/src/entry/delivery.mjs`'s `listenerStandingAt`; and the drives above, run against
`bindings/js/index.mjs` at this tree.

---

## §10 · The third downstream report — `ST-F2`, the repair-credit contract and the misleading sentence

**THE REPORT.** A downstream project filed `ST-F2`: a repair that does its correction and returns `undefined` is refused
`ConstraintPassRefused` — *"the repair `<id>` produced no op at `<address>`"* — with a landed, legal state and a log
whose `constraint-check` entry says the pair PASSED; the credit requires the repair to return the store's own
`WriteRecord.op`; nothing a consumer reads says so; the sentence names the CALLER's address where the repair may have
written elsewhere; and the return type is untyped. The report's own discharge table: (i) a worked example delivered in
`1.6.2`; (ii) the shape documented in `index.d.ts`, the TYPE not — `Constraint` is still `(context: unknown) => unknown`
and no `RepairContext`/`RepairOutcome` alias exists; (iii) the sentence's address not delivered.

**VERIFIED AT THE BYTES.** The credit path is `landedOp` (`bindings/js/src/entry/kernel-foundations.mjs:1105`): the
return's OWN `op` (`ownMember`, `[[GetOwnProperty]]`), an `opId` that is a non-empty string, absent from `attempt.ops`,
and — where the invoked-for op carries a `seq` — a strictly greater one. The fall-through sentence is
`bindings/js/src/entry/kernel-attempt.mjs:911`, interpolating `addressSpelling(attempt.address)`; the sibling arm
(`landedOpDefect`) composes the same address. `Constraint` is `(context: unknown) => unknown` (`index.d.ts:1300`), and
the docblock ABOVE it declares the omission in so many words: *"NOTHING HERE MINTS A TYPE, A SYMBOL, AN ALIAS … `Constraint`
below is unmoved, one `unknown` in and one `unknown` out."* The guide's `§7.6` carries the two-arm set, the worked example
(`{ok: true, op: landed.op}`), the per-instant divergence, the sentence copied verbatim WITH its caveat — *"the address in
that sentence is the ATTEMPT's, and it is no claim about where the repair wrote … this clause claims no correction and no
fix of it"* — and the verdict rule.

**THE RECORD HAS ALREADY DISPOSED OF IT.** `D-88` (2) (`strata/decisions.md:4531`) rules the sentence's address a
**recorded defect and not a unit**: it is filed at `docs/L1/open-items-2026-10-25.md §6` row `5` as **OPEN, recorded, not
repaired**, **no successor unit queued**; two lawful outcomes and no third — the text changes (a behaviour byte needing
its own ruling and its own version) or the text stands and the guide teaches it; and naming the repair's address at that
instant would need a store reach `D-67` forbids, because the return is the op's only carrier. **So the report's
factual claims stand and are already on the record; its asks are answered by the record's own dispositions — (i)
delivered, (ii) declared-unminted by the docblock, (iii) a recorded defect row.** **The one decision the record leaves
open is the architect's: mint the types, move the sentence's text, or leave the record as it stands.**

**FILES READ.** `bindings/js/src/entry/kernel-foundations.mjs` (`landedOp`, `landedOpDefect`); `bindings/js/src/entry/
kernel-attempt.mjs` (`:878`–`:912`); `bindings/js/index.d.ts` (`:1270`–`:1300`); `docs/guides/package-use.md` (`§7.6`,
`:1040`–`:1105`); `strata/decisions.md` (`D-88`); `docs/L1/open-items-2026-10-25.md` (`§6` row `5`).

---

## §11 · The published `1.8.0` — the downstream's verification of the shipped artefact

**THE PUBLICATION.** `v1.8.0` is tagged at `fd34789` and the release is live in the registry (the downstream reads it as
`latest`). **The release is a TYPE SURFACE, and the downstream's own instrument says so:** `git diff --stat
v1.7.0..v1.8.0 -- bindings/js/src src` is **EMPTY** at this tree — no line under `bindings/js/src` and none under `src`.

**THE DOWNSTREAM'S VERIFICATION, EACH CLAIM CHECKED AT ITS BYTES HERE:**

| claim | verdict |
|---|---|
| `Constraint` is typed, the six names exist, `RepairOutcome` is the closed two-arm set, `write`'s fourth position is `CommitCarrier`, and `grep -c 'repair:' index.d.ts` moved `0 → 1` | **VERIFIED** — `Constraint = (context: AttemptContext) => ConstraintOutcome`; the six names; `CommitCarrier` on `write`; the count reads `1` |
| `Constraint` NARROWS: a `(context: unknown) => unknown` body no longer assigns (`TS2322`) | **VERIFIED** — the fixture's two cells were re-derived for exactly that reason, and the release declares it (`D-102` (ii)) |
| (iii) — the sentence's address — is **NOT** fixed and is byte-identical | **VERIFIED** — `bindings/js/src/entry/kernel-attempt.mjs:911` still interpolates `addressSpelling(attempt.address)`; the drive's shape (pair at `['a']`, the repair landing at `['b']`, both standing) is the arm the sentence names wrongly |
| the two instants — landing 6 members, registration 7, `write`'s fourth position ACCEPTED at the landing and REFUSED at the registration — are unchanged in fact and now NAMED in the types (`RegistrationRepairContext extends RepairContext`, narrowed by `'write' in`) | **VERIFIED** — the records are built at the sites the declaration cites; the type names them; the behaviour is unmoved (`D-35`'s own read) |

**SO THE PUBLISHED RELEASE DOES EXACTLY WHAT IT DECLARED — TWO OF THE THREE LIMBS.** **The third is a RECORDED
DISPOSITION and not an omission**: `D-88` (2) rules the sentence a recorded defect with two lawful outcomes (change the
text on its own ruling and version, or teach it), `D-101` item 4 says `ST-F2`'s (iii) is answered by that disposition,
and the release's own "what does not move" list names it. **The inherited-repair divergence is `D-35`'s recorded defect,
declared inside `index.d.ts` as OWED to a code-bearing unit.** **The two remaining limbs are therefore the record's open
items and the architect's to queue — this note decides nothing.**

**FILES READ.** `strata/decisions.md` (`D-88`, `D-101` items 2 and 4, `D-102`); `bindings/js/index.d.ts`; the tag set
(`v1.7.0` → `v1.8.0`); `bindings/js/src/entry/kernel-attempt.mjs`; the `git diff --stat` instruments above.

---

## §12 · The fourth confirmation — a repair's write's own listeners, and the delivery batch

**THE QUESTION.** *"Confirm that the listeners returned by a repair are evaluated in the same batch as the listeners from
the original write."*

**THE ANSWER, AT THE BYTES: NO — and they are in neither batch.** The chain, each link read:

1. **THE DELIVERY'S SET IS THE COMMIT'S `pending` RESIDUE.** `delivery.mjs`'s `terminalArm` takes the record the
   kernel's channel is handed (`attempt.record` — the COMMIT's record), reads `record.pending.slice()`, and calls
   `deliver` with it (`:828`). `pending` was seeded once at the commit's act — `kernel-commit.mjs:169`'s
   `record.pending = written.triggered.slice()` — the ORIGINAL write's returned set — and the pass checks its own
   evaluated pairs off it (`releasePending`).
2. **A REPAIR'S WRITE IS A DIFFERENT RECORD.** It is the `write` member's own `{op, watched, triggered}`
   (`index.mjs:443`–`:448`), returned to the repair body — and its `triggered` listeners are carried THERE, never merged
   into the commit's `pending`.
3. **ITS OWN DELIVERY IS WITHHELD.** A call that names the commit (`n ≥ 4`) is "the leg", and the member's own comment is
   explicit: *"THIS FRAME IS THE LEG AND ITS DELIVERY IS WITHHELD … its silence is total"* — the delivery is deferred to
   the kernel's terminal arm.
4. **AND THE TERMINAL ARM DELIVERS THE COMMIT'S SET, NOT THE LEG'S.** So the repair's write's `triggered` listeners are
   read by nothing: not the residue (they are not in `pending`), not the leg (the leg is never delivered), not the delete's
   member (that is the delete's), and not a listener's write (that opens its own commit).

**WHAT THAT MEANS.** **A repair's edit can fire a listener that nothing invokes.** The record is SILENT on it: no clause
says the repair's write's listeners are delivered, and none says they are dropped — which is precisely the finding, and it
is the one the architect's own step 8 was written against (*"any new non-constraint listeners are bookmarked to be run
after commit"*). **The intended design and the build disagree at this seam, and the build is the side that moves nothing.**
**A same-batch design needs one of two changes, both behaviour bytes**: the terminal arm's set becomes the commit's
`pending` PLUS the leg's `triggered` listeners (de-duplicated by identity, `§2.4` rule 3), or the repair's write's
`triggered` listeners are merged into the commit's `pending` at the repair arm. **Neither is declared; no ruling is taken
here; the item is filed for the architect.**

**FILES READ.** `bindings/js/index.mjs` (the `write` member, `:312`–`:497`); `bindings/js/src/entry/delivery.mjs`
(`terminalArm`, `:730`–`:828`); `bindings/js/src/entry/kernel-commit.mjs` (`:169`); `bindings/js/src/entry/kernel-attempt.mjs`
(`releasePending`, the repair arm); `docs/guides/package-use.md` §6.4, §7.6.

---

## §13 · The fifth downstream report — the store does not save after a repair's `file`-tier write at a registration instant

**ITS RULING IS `strata/decisions.md` · `D-106`.** This section is the record of what was **measured** and what remains
**open**; it designs nothing and decides nothing beyond the ruling's own words.

### §13.1 · THE REPORT, AND ITS ARGUMENT

**THE CLAIM.** *"The store doesn't save after a repair writes at the file tier during constraint registration or store
creation."*

**THE ARGUMENT THE REPORT MAKES, condensed but faithful — and every citation in it resolves at the bytes:**

- **The save is the terminal arm's act, not the verb's**: guide `§9.2` (*"the terminal arm performs the store's
  `commit_file` as its first act on the PASSING arm"*), `index.d.ts:631` (*"the save is the ARM's, at the record's own
  op"*).
- **A registration performs no terminal act at all**: guide `§7.2` (4) (*"THE WRITE RUNS NO PASS OF ITS OWN … it appends
  no constraint-check entry, no outcome entry and no terminal act, delivers no listener, and opens no attempt"*),
  `kernel-registration.mjs:486`–`:488` — **verified at those exact bytes**.
- **So the repair's write joins the registration's commit, that commit has no terminal arm, and no bytes are written.**
- **And the report's own warning about the corpus**: `§9.3` names the **producers** of the bytes and `§9.2` names the
  **instant**; a pass that cites only the producers concludes *"it is a file-tier write, so it is durable"*, and that is
  the false step.

**THE REPORT'S OWN DISPOSITION, VERBATIM:** *"That is a package finding with symptom, reproduction, suspected root cause
and proposed fix shape, and it belongs to the unit that surfaced it rather than being worked around here. Want it filed?"*
— **ANSWERED: FILED, here, and the answer to the second half is `D-106` item 5 (the text correction rides in the unit).**

### §13.2 · THE CLAIMS LEDGER

**Method.** Every arm below was driven by L0 against **this tree at `1a0d252`**, on Node `v24.20.0`, with the checkout's
own addon (`bindings/js/build/Release/storeroom_js_binding.node`); every store got its own `filePath` under a temp
directory; the file was read **as bytes** (`fs.readFileSync`) rather than through a second instance wherever a byte reading
answers the question, and a second instance was used only where the boot's own answer was the claim. **Nothing in the tree
was written**; the drivers live outside the repository and their verbatim output is §13.3.

| # | claim | verdict | evidence |
|---|---|---|---|
| `C-1` | a repair's `file`-tier write at a **registration instant** lands in memory and **does not save** | **VERIFIED** | `addConstraint` answers an identity, `read` is `42`, the file still reads `{"seed":"stand"}` |
| `C-2` | the same at `constraintOn`'s **re-arm** | **VERIFIED** | in-memory `8`, file unchanged |
| `C-3` | the same at **`storeCreate` carrying `cfg.constraints`** | **VERIFIED** | in-memory `99`, file **zero-length**, and a second instance answers `AddressNotFound` for the repaired address **and for everything else** |
| `C-4` | the same at a **boot** over an existing `filePath` carrying `constraints` | **VERIFIED** | in-memory `"repaired"`, file still `{"i":"boot-state"}` |
| `C-5` | the record is durable **only** when some unrelated caller saves | **VERIFIED** | after `write(['unrelated'],'file',true)` the file reads `{"f":42,"seed":"stand","unrelated":true}` — the registration's repair rode along |
| `C-6` | a repair's `file`-tier write at the **LANDING** instant **does** save | **VERIFIED (control)** | file reads `{"g":5,"seed":"stand"}`; the repair's route there is `store.write(addr, tier, value, ctx)` — the context at the **fourth** position, because the landing instant's repair record has **six** members and no `write` |
| `C-7` | a plain caller's `file`-tier write **does** save | **VERIFIED (control)** | file reads `{"a":1}` |
| `C-8` | a **tier-named** `file` delete **does** save | **VERIFIED (control)** | file reads `{}` after `delete(['j'],'file')` |
| `C-9` | a **whole-target** `delete` changes file-tier data and **does not save** | **VERIFIED** | memory `AddressNotFound`, file still `{"k":1}`, second instance reads `1` |
| `C-10` | a **successful** `rollback` restoring a `file`-tier version **does not save** | **VERIFIED** | memory `1`, file still `{"l":2}`, second instance reads `2` |
| `C-11` | the save is reached only from `terminalArm`, gated on `SETTLED_ON_THE_PASSING_ARM` and `answer.op.tier === 'file'` | **VERIFIED at the bytes** | `delivery.mjs:736`–`:788`; `state.mjs`'s `commitFile` (`:1202`) |
| `C-12` | a registration reaches no terminal arm and no delivery seam | **VERIFIED at the bytes** | `kernel-registration.mjs`'s `closeRegistrationAttempt` (`:812`–`:840`), its own clause; the synthetic attempt's close performs no store act |
| `C-13` | the addon's `write` verb performs **no file I/O on any arm** | **VERIFIED at the bytes — AND THE RANGE CORRECTED 2026-11-02 by the L1 spec pass, which read it and was right**: this row printed `:2352`–`:2356`, which is the write's `touched` computation; **the clause stands at `:2358`–`:2363`** (the all-caps line at `:2360`) and **the verb ends at `:2369`** | `src/store.rs:2358`–`:2363`: *"THE `file` TIER'S DURABLE COMMIT IS NO LONGER A VERB'S ARM AT ALL"*; `write_file` is reached from `commit_file` alone |
| `C-14` | guide `§9.2`'s *"`store.write(addr,'file',value)` COMMITS, with no kernel attempt and no terminal arm in the path"* is **false of the package surface** | **VERIFIED — the sentence names the wrong mechanism** | `index.mjs:396`–`:397` routes a three-position write to `constraints.mjs`'s `constraintWrite` (`:788`), which calls `kernel.commit` then `kernel.runAttempt`; the save is the terminal arm's (`C-11`). **The clause is true only as an EFFECT ("it commits") and false as a PATH** |
| `C-15` | `§9.3`'s *"a successful `rollback` performs no file I/O"* is true | **VERIFIED** | `C-10`'s arm; the guide's own words, unmoved |
| `C-16` | the report's *"the save is the ARM's, at the record's own op"* reading of `index.d.ts:631` | **VERIFIED, AND THE RANGE CORRECTED 2026-11-02 — L0's own first reading was wrong twice**: the delete bullet spans **`:628`–`:632`** (`:633` opens the NEXT bullet, *"THE LOG AND THE REPORT ARE ANSWERABLE BY REF"*, and a range reaching `:633` would delete a live bullet), and the withheld sentence runs **`:631`–`:632`** | `:628`–`:632`, the delete's clause, verbatim |

### §13.3 · THE DRIVES, VERBATIM

**The probe's own output, unedited** (each line's label is the arm it names; `B`/`D`/`E`/`F`/`H`/`I` are the defective
arms, `A`/`G`/`J` the controls):

```
A0 file at construction: <zero-length>
A1 after a plain caller write (control: expect {"a":1}): {"a":1}
B0 file before addConstraint: {"seed":"stand"}
B1 addConstraint answered: an identity (PASSING arm) | threw: null
B2 in-memory read of the repaired address: 42
B3 file after a PASSING registration repair (claim: unchanged = NO SAVE): {"seed":"stand"}
D1 storeCreate threw: null
D2 in-memory read after construction: 99
D3 file after construction (claim: zero-length = NO SAVE): <zero-length>
D4 second instance over the same path — [seed]: <AddressNotFound> | [d]: <AddressNotFound>
E1 file before the second instance: {"seed":"stand"}
E2 second instance — [seed]: "stand" | [e]: <AddressNotFound>
F1 after the registration repair: {"seed":"stand"}
F2 after an UNRELATED caller save (does the earlier repair ride along?): {"f":42,"seed":"stand","unrelated":true}
G0 addConstraint answered: identity | threw: null
G1 file after the registration instant (unsaved, as case B showed): {"seed":"stand"}
G2 write(['g'],'file',1) threw: null
G3 in-memory: 5
G4 file after a LANDING-instant repair that PASSED (control: expect the repair saved): {"g":5,"seed":"stand"}
H0 the pair is carried: [{"address":[["h"]],"id":"ch"}]
H1 after addConstraint: {"seed":"stand"}
H3 constraintOn threw: null
H4 in-memory read of the repaired address: 8
H5 file after the re-arm instant (claim: unchanged = no save): {"seed":"stand"}
I0 the file the boot will read: {"i":"boot-state"}
I1 the boot threw: null
I2 in-memory after the boot: "repaired"
I3 file after the boot-time repair (claim: unchanged = no save): {"i":"boot-state"}
J0 after the write: {"j":1}
J1 after delete(['j'],'file')  (declared: SAVED): {}
K0 after the write: {"k":1}
K1 in-memory after the whole-target delete: <AddressNotFound>
K2 after delete(['k'])  (declared: NOT saved): {"k":1}
K3 a second instance over the same path reads [k]: 1
L0 after two file-tier writes: {"l":2}
L1 rollback answered, undoneOps: ["op-6"]
L2 in-memory after the rollback: 1
L3 after a SUCCESSFUL rollback  (declared: NOT saved): {"l":2}
L4 a second instance over the same path reads [l]: 2
```

**TWO CORRECTIONS TO L0's OWN FIRST DRIVER, recorded because they are how a wrong reading is manufactured:** its repair
bodies refused **every** state, so their re-runs refused as well and every arm looked like a *refused* registration
(the refusal was the body's, not the save's); and its landing-instant control called `ctx.write` on a record that has **no
such member** at that instant (six members, not seven — `PIN-6` (ii)), so the `TypeError` it threw was read as a failed
attempt. **§13.3's output is the second and third drivers, with state-dependent bodies and the landing route spelled as
`store.write(…, ctx)`.** A measurement that does not distinguish *"the body refused"* from *"the save did not run"* is not
a measurement of the save.

### §13.4 · THE PACKAGE FINDING — symptom, reproduction, root cause, fix shape

**THE FINDING BELONGS TO THE UNIT THAT SURFACED IT** (`D-106` item 5): it is recorded here at the unit's request and its
correction is that unit's write set.

- **SYMPTOM.** A repair that does exactly what the convention asks — perform the import, write one whole legal record at
  the `file` tier, let the pass accept it — produces a record that is **not durable** until some unrelated caller saves.
  At a **construction**, nothing is durable at all: the file is zero-length and a second instance finds nothing.
- **REPRODUCTION.** §13.3's `B`/`D`/`H`/`I` arms, each six lines, each on a fresh temp path; the minimal form is
  `storeCreate({journalLength: 256, listeners: [], filePath, constraints: [{address: ['d'], id: 'cd', constraint: (ctx) =>
  ctx.value === 99 ? true : {message: 'refused', repair: (r) => ({ok: true, op: r.write(['d'], 'file', 99).op})}}]})` →
  `read(['d'])` is `99`, the file is **zero-length**.
- **SUSPECTED ROOT CAUSE, CONFIRMED AT THE BYTES.** The save lives at **one** site —
  `delivery.mjs`'s `terminalArm` → `state.mjs`'s `commitFile` → the addon's `commitFile` → `Store::commit_file` — and that
  site is reached only by the kernel's **attempt** path (`runAttempt`). The **registration instant closes its synthetic
  attempt without a terminal act** (`kernel-registration.mjs`'s `closeRegistrationAttempt`, whose own clause says so), and
  **the store's write verb writes no byte**, so a `file`-tier write performed at an instant that opens no attempt is a
  write nothing ever saves. **The corpus's guard against a second save — the per-record marker — is untouched and is the
  constraint the fix must respect** (`storeroom-js/contract.md`: *"a save performed twice for one record"* is the named
  `S-ARM-SAVE` FAILS-IT state).
- **PROPOSED FIX SHAPE, PRICED — L1's to declare, printed here so the unit starts from a factual board.** For **arm 1**
  the carrier exists: the repair's write **is a `file`-tier journal op**, so a save keyed to **that op** is lawful under
  the once-per-record law, and the design question is *where* it is named — at the registration's close, at the re-run's
  passing arm, or by widening `terminalArm`'s gate to an op the registration's commit carries. For **arms 2 and 3** no
  op-keyed carrier exists (`op.tier` is `None`, and a rollback appends no entry), so each needs a **native-side** decision:
  a tier-less op made eligible, or an op-less save entry point, either of which also has to answer the per-record marker.

### §13.5 · OPEN QUESTIONS — the record does not answer these and no recommendation is made

1. **ARM 1'S NAMING INSTANT.** The candidate sites are three (the registration's close, the re-run's passing arm, a
   widened terminal-arm gate) and they differ in what they save when a registration's commit carries **several** repairs:
   one save at the end covers all of them by image, while a save per repair re-serializes the same image more than once
   (lawful under the marker only if each op is a different record).
2. **ARMS 2 AND 3'S CARRIER.** Tier-lessness and op-lessness are the two declared facts; whether the store's writer grows
   a second eligibility arm or the *acts* grow an op is a **native contract** question (`DD-28`'s own home), not a
   package one.
3. **THE FAILING ARM'S SAVE.** A registration whose repair lands and whose **re-run then refuses** leaves the repair's
   edit standing in memory (`§7.2` (4): *"a write the route lands before a refusal STANDS, because a registration composes
   no rollback"*). **If the rule holds without exception, that edit owes a save too** — and the state it leaves is one the
   registration declined to endorse. Measured incidentally (`§13.1`'s first driver, `B` with an always-refusing body):
   the edit stood in memory and the file did not move. **Not put to the architect and not decided.**
4. **A LISTENER BODY'S WRITE.** It opens its own commit and reaches the kernel (`D-43`), so it is conforming by
   construction — asserted from the code and **not driven** here.
5. **THE CONSTRUCTION'S WRITE.** A `storeCreate` creates the file zero-length and commits no key (`S-COUNT`); it changes
   no file-tier data, so `D-106` puts it out of scope. **It is named so a later pass does not re-open it as a miss.**
6. **ONE STALE FIGURE IN AN INPUT, FOUND WHILE CHECKING AN ANCHOR — NOT THIS UNIT'S TO FIX.** `strata/brief.md §2`'s
   inventory table prints `store.rs` **2,472** lines and calls the seven figures *"all … unmoved"*; **the file is 3,086
   lines at 2026-11-02** (`wc -l`, this date). **The brief is an input and this note is not its owner** — recorded so the
   next pass that reads the table measures rather than copies.

**FILES READ.** `strata/brief.md`, `strata/walkthrough.md`, `strata/decisions.md` (`D-32`, `D-98`, `D-104`, `D-105`);
`bindings/js/index.mjs` (the `write` member `:312`–`:501`, `addConstraint` `:944`–, `:1477`); `bindings/js/index.d.ts`
(`:625`–`:640`); `bindings/js/README.guide.md` (`§7.2` (4) `:914`, `§9.2` `:1692`–`:1716`, `§9.3` `:1718`–`:1758`);
`bindings/js/src/entry/delivery.mjs` (`terminalArm` `:700`–`:831`); `bindings/js/src/entry/kernel-registration.mjs`
(`:462`–`:503` the route, `:812`–`:840` the close); `bindings/js/src/entry/kernel-terminal.mjs`; `bindings/js/src/entry/
state.mjs` (`commitFile` `:1202`); `bindings/js/src/entry/constraints.mjs` (`constraintWrite` `:788`–`:878`);
`bindings/js/src/entry/kernel-attempt.mjs` (`:855`–`:915` the repair context); `bindings/js/src/facade.rs`
(`verb_commit_file` `:963`–`:1000`, the `#[napi]` attribute at `:962`); `src/store.rs` (`write` `:2152`–`:2369`,
`write_file` `:1371`, `commit_file`
`:1414`–`:1445`); `docs/specs/storeroom-js/contract.md` (the per-record marker, `:684`); and the drivers of §13.2/§1

---

## §14 · BOOKMARKS — operations recorded, not worked

**WHAT THIS SECTION IS.** `D-109`'s second sentence was *"bookmark the bookkeeping operation for after implementation"*.
**A bookmark here is an operation with a named owner and a POSITIVE REVISIT CONDITION** — the exit walkthrough's own
requirement (`strata/walkthrough.md` §3 item 12: *"Each residual needs a named owner and a positive revisit condition, or it
will be read later as something the unit settled"*). **Nothing in this section is a unit, a ruling, or work in progress.**

### `BK-1` — the dirty-tree boundary set is re-measured and every record that prints the old figure is corrected

**STATE: `RESERVED`** — not started, not scheduled by this unit, and carried into `U-STOREROOM-FILE-SAVE-COVERAGE`'s `DONE`
entry as a residual it does not repair (`D-109` item 4).

**WHAT IS OWED.** The downstream's own correction, recorded because it is theirs and because it contradicts several reports
that repeated the other figure: **the dirty-tree boundary set is TWO ROWS IN ONE FILE — `S-1` and `REG-EXEC` — and not the
four-in-three and six-in-four that earlier passes carried forward.** **The operation is: re-measure it, then correct every
record that prints the stale figure** — and correct them by re-reading, not by propagating one number into another.

**AND THE CITATION THE REPORT ATTACHED TO IT DOES NOT RESOLVE, WHICH IS PART OF THE OWED WORK.** The report says *"the
brief's own §6 says the same — `one trivial no-op edit reads 2 failed`"*. **`strata/brief.md` §6 carries no such sentence**
(`grep` for `2 failed`, `no-op edit` and `dirty`, this date, all miss): its §6 is the `A112` ordering question, the kernel's
ship shape, `LIVE / INSTALL`, the symlink limitation and two instrument gaps. **So the figure is the report's measurement
with no resolvable home in the brief**, and a later pass must either find where the figure actually lived or state it as a
fresh measurement with its own instrument. **A citation that does not resolve is a defect by definition, not a typo.**

**OWNER.** The pass that owns the records carrying the figure — **the reports and tracker records that print
four-in-three/six-in-four, not this unit and not `strata/brief.md`**, which carries no dirty-tree figure at all. **Where
the records live outside this repository, the correction is the downstream's and the bookmark is the pointer that keeps it
from being read as settled here.**

**REVISIT CONDITION — POSITIVE AND CHECKABLE.** **When `U-STOREROOM-FILE-SAVE-COVERAGE`'s implementation has landed and its
`DONE` entry is written, `BK-1` becomes workable**: the measurement needs a clean baseline tree, a single trivial no-op
edit, one suite run, and the failed-row census read off that run — which is exactly what the unit's own landing forbids
while it is in flight, because a dirty tree is the unit's own red set.

**WHAT `BK-1` IS NOT.** It is not a finding about `Provident-Storeroom`'s code, not a status, not a version, and not a
reason to reopen `D-85`'s or `CD-10`'s re-derivation — **those are the downstream's own and their correction is theirs to
land.**3.3.
