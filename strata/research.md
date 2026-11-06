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

---

## §15 · The sixth downstream report — `ST-F1`, the inherited-repair divergence re-filed as a fix request

**WHAT THIS SECTION IS.** The intake note for one downstream report, filed under the intake rule that a note goes to
`role_l0_research`. **IT RECORDS WHAT WAS VERIFIED, WHAT THE PRIOR RECORD ALREADY DISPOSES OF, AND WHAT REMAINS THE
ARCHITECT'S — it designs nothing, cures nothing, ranks nothing, opens no unit, mints no ruling and assigns no version.**
Its companion dispositions are the prior record's and are named at `§15.5`, not invented here.

**⟶ CHANNEL FAILURE, RECORDED AGAIN AND FOR THE THIRD TIME.** The `role_l0_research` delegation was attempted on this
intake and FAILED AT STARTUP, deterministically, before reading a byte: `tools.restrict() names unknown global tools
"web_search", "web_fetch"` — the same failure `§1` records, still unrepaired. **So this note is filed by L0 directly, in its
intake capacity, as the least-bad route rather than as the channel's own work; when the role's tool set is repaired a
research pass should re-derive it.** Nothing here depends on the reporter's hands being L0's.

**DATE:** 2026-11-03. **BRANCH:** `main` at `f3b35ea`, whose `bindings/js/package.json` reads `"version": "1.9.2"` at its
own bytes. **THE PACKAGE MEASURED:** this checkout's own entry `bindings/js/index.mjs` through its addon
`bindings/js/build/Release/storeroom_js_binding.node`, under Node `v24.20.0`; **every drive below ran from `/tmp`, wrote
no repository byte, and is O4-shaped** (path entry, `D-6`).

---

### §15.1 · THE REPORT (condensed, faithful, and it is the DOWNSTREAM'S words restated rather than judged)

**THE FINDING.** One returned shape answers two different things at the two evaluation instants, because the two instants
read the same caller-supplied object by different rules: **the registration instant (`storeCreate`'s batch, `addConstraint`)
reads `'repair' in outcome` — a `[[HasProperty]]` walk of the prototype chain — while the write's evaluation reads
`Object.hasOwn(outcome, 'message')` and then `ownMember(outcome, 'repair')` — `[[GetOwnProperty]]`, own members only.**
So a constraint whose `message`/`repair` are **inherited** registers cleanly, its repair is invoked once at registration,
and the first write that trips the arm refuses with no repair at all.

**WHAT A CONSUMER SEES, in the report's own condensed form:** `const outcome = Object.create({ message, repair })` with
`constraints: [{ address, id, constraint: () => outcome }]` — the construction stands and the inherited repair has already
run once; `store.write(…)` then throws `{ status: 'ConstraintPassRefused', message: '… returned a value outside the three
declared outcome arms' }`. **The author's code is shaped plausibly and their repair worked at registration; it fails on the
first real write, and the sentence does not name the cause.**

**WHY THE REPORT CALLS IT A DEFECT RATHER THAN A STYLE NOTE, in the report's three grounds:** it is silent at the moment of
authorship (registration is the permissive arm); it is silent until traffic; and — the report's own strongest sentence —
**"the narrowing created it: 1.9.0 moved the write-time arm to `Object.hasOwn` and never moved the registration-time arm
with it."** *(That provenance sentence is REFUTED below, `C-6`; the defect it describes is not.)*

**THE PROPOSED FIX, verbatim from the report:** *"One word, at the other arm: read `Object.hasOwn(outcome, 'repair')` at the
registration instant too. Then an inherited repair is refused where it is authored, and the two instants agree. Documentation
and typing need nothing — `ConstraintOutcome` already declares the members as own."*

**THE REPORT'S OWN DISCHARGE TABLE:** filed 2026-10-30 against 1.6.1; re-read against every release since; 1.6.2 gave the
arm an example and a docblock, 1.8.0 typed it, and 1.9.0–1.9.2 changed nothing — so the divergence is documented upstream
and unfixed upstream. **The report's own app is immune by construction** (all thirteen declarations build refusals as object
literals; its `VA-14`/`VA-15` cells pin that and measure the divergence rather than quote it). **So the report asks only for
the package fix, and it does not patch downstream** (that project's own `D-5`).

---

### §15.2 · THE CLAIMS LEDGER

**Method.** Each claim was re-measured by this pass at the bytes or by a drive in `§15.3`; **the report's own framing was
not trusted as a finding and its release-history sentence is corrected where the tree answers otherwise.** Arms are `K-…`
for the drives.

| # | the claim, one line | verdict | evidence |
|---|---|---|---|
| `C-1` | **The registration instant's outcome read is a prototype-chain read: `'message' in outcome && 'repair' in outcome && typeof outcome.repair === 'function'`** | **VERIFIED** | `bindings/js/src/entry/kernel-registration.mjs:399`-`:401` (`[[HasProperty]]` twice and a `[[Get]]` at `:401`'s `? outcome.repair`), inside `registrationEvaluation`; the comment above it (`:394`-`:397`) states the outcome is *"read as the landing pass reads it"*, the symmetry its own code falsifies. **The report's `'repair' in outcome` half is exact; the test also chain-reads `message`.** |
| `C-2` | **The write's evaluation reads own members only: `Object.hasOwn(outcome, 'message')`, then `ownMember(outcome, 'repair')`** | **VERIFIED** | `bindings/js/src/entry/kernel-attempt.mjs:810`-`:818`; `ownMember` is the descriptor form at `bindings/js/src/entry/kernel-foundations.mjs:882`-`:886`. **The report's cited range `:810-818` resolves EXACTLY at this date** — a citation that did not need re-anchoring. |
| `C-3` | **The second divergence of the same class: the repair's own RESULT `ok` is chain-read at registration and own-read at the write** | **VERIFIED** | registration: `const ok = result !== null && typeof result === 'object' && result.ok === true;` at `bindings/js/src/entry/kernel-registration.mjs:676`; write: `ownMember(result, 'ok')` at `bindings/js/src/entry/kernel-attempt.mjs:1028`. **The report does not name this arm; the record does** (`repair-arm-surface §4` item 4). |
| `C-4` | **An inherited `repair` registers and is invoked once at registration, and the same shape is read as carrying NO repair at the next write, which refuses `ConstraintPassRefused` with the `unrecognized` sentence** | **VERIFIED — DRIVE `K-1` AND `K-2`** | `K-1` (`addConstraint`): registration `"stood"`, the write threw `{"status":"ConstraintPassRefused","message":"the constraint p returned a value outside the three declared outcome arms at a"}`, `runs = 1`. `K-2` (`storeCreate`'s batch): construction `"stood"`, the pair `constraints()` names `[{"address":[["a"]],"id":"p"}]`, the first write threw the same status and sentence, `runs = 1`. |
| `C-5` | **The report's exact snippet — batch, `repair: (rc) => rc.write(['a'], 'mem', 1)` — "returns normally; the batch is adopted; the repair has already run once"** | **CORRECTED — DRIVE `K-3`** | The snippet **is refused at the construction**: `{"status":"ConstraintRefusedAtRegistration","message":"'a' was refused by its own constraint at registration in 'constraints', a registered constraint must answer true for the state its pair is registered at"}` — because the registration's credit wants `{ok: true, op}` (`kernel-registration.mjs:676`-`:679`) and the snippet's repair returns the store's `WriteRecord` (no `ok`). **The divergence is not reached by that snippet; it is reached with a CREDITED repair, which is `K-1`/`K-2`.** The report's symptom is real and the record already demonstrates it — its minimal reproduction is imprecise, and the imprecision is the registration's own credit rule and not the divergence. |
| `C-6` | **"1.9.0 moved the write-time arm to `Object.hasOwn` and never moved the registration-time arm with it"** | **REFUTED** | The write's own-member outcome read landed at `2770a61`, *"Address the known debts: the read half of the prototype class, and three records"* (`2026-10-26`, the `D-35` read half), which the code's own comment records at `bindings/js/src/entry/kernel-attempt.mjs:799`-`:804` and `kernel-foundations.mjs:876`-`:877` (*"measured: an inherited `message` became the refusal's message…"*). **`git show 1a0d252` (`1.9.0`, `D-105`) changed the RESULT read (`ownMember(result,'ok')`) and did not touch the outcome read at all** — measured: the commit's diff over `kernel-attempt.mjs` has no `Object.hasOwn(outcome,` or `ownMember(outcome,` line. **So the asymmetry was created on 2026-10-26, not in 1.9.0 — it is older than the report's provenance sentence says.** The report's CONCLUSION (a half-landed change, not a design) survives; its DATE does not. |
| `C-7` | **The package's own notes name it as a measured divergence rather than a bug** | **VERIFIED** | `docs/specs/storeroom-repair-arm-surface/contract.md` `§4` items 3 and 4 (RECORDED, FIXED NOWHERE, OWED to a code-bearing unit); `docs/specs/storeroom-constraint-registration-instant/contract.md` `§4` item 3 and `claims.md` `C-37` (NOT that unit's); `docs/specs/storeroom-constraint-outcome-proposal-review.md` `§9` (the property a future code-bearing unit should own); the landed corpus cell `docs/specs/storeroom-constraints/contract.md:361`-`:405` (sub-item `(viii)`, OWED). **All five carry the same two facts and none claims the reads agree.** |
| `C-8` | **The write's sentence does not name the cause** | **VERIFIED** | the sentence is the kernel's own `unrecognized` template, `bindings/js/src/entry/kernel-attempt.mjs:1384`-`:1387`, verbatim *"the constraint `<id>` returned a value outside the three declared outcome arms at `<address>`"* — it names neither the instant nor the membership rule. **This is the same class `D-88` (2) records as a sentence-text defect and disposes of as a recorded row rather than a unit.** |
| `C-9` | **The report's release-history sentence ("1.6.2 gave the arm an example and a docblock; 1.8.0 typed it; 1.9.0–1.9.2 changed nothing")** | **CARRIED, half-verified** | the typing half is VERIFIED: `9afb411` mints the six repair-outcome types and `fd34789` cuts `1.8.0` (`D-102`); the docblock/example half is **CARRIED** — the guide's `§7.6` clause of 2026-10-30 is at `docs/guides/package-use.md:1088`-`:1096` and its worked example is a later clause of the same section; **this pass did not re-derive which commit first landed each.** No claim below rests on it. |
| `C-10` | **`VA-14`/`VA-15` hold the downstream app's immunity, and the app is immune by construction** | **UNVERIFIABLE HERE** | those cells live in the downstream repository (`Provident-Electron`), which this checkout does not carry; **this pass read the claim and re-derived nothing of it.** What IS verifiable here is that the record's own reproductions match the report's symptom (`C-4`). |
| `C-11` | **"Typing needs nothing — `ConstraintOutcome` already declares the members as own"** | **VERIFIED** | `bindings/js/index.d.ts` declares the closed three-arm `ConstraintOutcome` and its members, and states *"THE TYPE DECLARES THE SHAPE AND NEVER THE READ"* at `:1587`-`:1589` — **so a fix moves no type byte; what would move is the shipped PROSE that scopes the rule to one instant** (`§15.6` `Q-4`). |

**TERMS: the claims (`11`), VERIFIED (`7`), CORRECTED (`1` = `C-5`), REFUTED (`1` = `C-6`), CARRIED (`1` = `C-9`), UNVERIFIABLE HERE (`1` = `C-10`).**

---

### §15.3 · THE DRIVES, VERBATIM

**Harness.** The checkout's own entry by path; no harness, no harness directory, no repository byte written. Each arm on a
fresh store; `mem` tier except `K-3` (which is the report's snippet and refuses at the construction). **`K-1`, `K-2` and
`K-4` are the divergence; `K-3` is the report's imprecise reproduction; `K-5`/`K-5a` are the credit control; `K-6` is the
inherited-message-only arm.**

```
K-1 addConstraint, inherited message/repair, repair credited at ['b'] (the contract's own reproduction):
A registration "stood"
A write threw {"status":"ConstraintPassRefused","message":"the constraint p returned a value outside the three declared outcome arms at a"}
A runs 1

K-2 storeCreate's batch, same shape, repair credited through rc.write at ['b']:
B construction "stood"
B write at a threw {"status":"ConstraintPassRefused","message":"the constraint p returned a value outside the three declared outcome arms at a"}
B runs 1
B carried pairs [{"address":[["a"]],"id":"p"}]

K-3 the report's exact snippet (repair returns the store's WriteRecord, not {ok:true, op}):
C construction threw {"status":"ConstraintRefusedAtRegistration","message":"'a' was refused by its own constraint at registration in 'constraints', a registered constraint must answer true for the state its pair is registered at"}

K-4 the second divergence — an inherited `ok` on the repair's return:
D registration "stood"
D write threw {"status":"ConstraintPassRefused","message":"the repair p produced no op at a"}

K-5 the same shape with the repair's write UNSUPPORTED (no commit at the fourth position — `D-103`'s refused route), as a control:
E registration "stood"
E write threw {"status":"ConstraintPassRefused","message":"the repair p produced no op at a"}
E runs 2

K-5a the credit control — every member OWN and the repair's write on the supported route (the context at the fourth position):
E2 registration "stood"
E2 write "stood"
E2 runs 2

K-6 an inherited `message` alone, no repair — the registration refuses and the pair is withdrawn:
F registration threw {"status":"ConstraintRefusedAtRegistration","message":"'a' was refused by its own constraint at registration in 'constraints', a registered constraint must answer true for the state its pair is registered at"}
F write after the refusal "stood"
F carried pairs []
```

**WHAT THE DRIVES ESTABLISH, EACH READ OFF ITS OWN LINE.** **`K-1` and `K-2` reproduce the report's symptom at BOTH
registration routes**: the inherited repair runs once at registration, and the first write reads the same shape as carrying
no repair and refuses `ConstraintPassRefused` with the `unrecognized` sentence. **`K-3` shows the report's exact snippet
never reaches that symptom** and is refused by the registration's own credit rule — so the report's minimal reproduction
names a shape it has not itself driven to the claimed arm; the record's reproduction (`K-1`) is the one that exhibits it.
**`K-4` exhibits the second divergence of the same class on the repair's own `ok`.** **`K-5` and `K-5a` are a pair and they
prove the credit route is the SUPPORTED one at the write (`D-103`): an own-member outcome with the repair's write on the
fourth-position route stands at both instants (`K-5a`), and the same shape with a three-position repair's write refuses
"produced no op" (`K-5`)** — so `K-1`'s write refusal is the divergence and not an unsupported repair route, because `K-1`'s
refusal happens BEFORE the repair is invoked (the arm reads no repair at all). **`K-6` shows an inherited `message` alone is
refused at registration, after which the pair is withdrawn and a later write asks nothing.**

---

### §15.4 · THE SITE INVENTORY — FOUR READS, A THIRD INSTANT, AND THE HELPERS

**THE DIVERGENT SITES (registration).**

| site at `HEAD` | the read | rule | standing |
|---|---|---|---|
| `bindings/js/src/entry/kernel-registration.mjs:399`-`:401` | `'message' in outcome` · `'repair' in outcome` · `typeof outcome.repair === 'function'` | `[[HasProperty]]` ×2 + `[[Get]]` — **the chain** | **DIVERGENT** — the report's subject and the corpus cell's subject |
| `bindings/js/src/entry/kernel-registration.mjs:676` | `result.ok === true` (then `landedOp`'s own `op` read, `kernel-foundations.mjs:1105`-`:1131`) | `[[Get]]` on `ok` — **the chain**; `op` was already own-only | **DIVERGENT** — the same class; the report's filing does not name it, the record does (`repair-arm-surface §4` item 4) |

**THE CONFORMING SITES (the write's evaluation and a third instant).**

| site at `HEAD` | the read | rule | standing |
|---|---|---|---|
| `bindings/js/src/entry/kernel-attempt.mjs:810`-`:818` | `Object.hasOwn(outcome, 'message')`, `ownMember(outcome, 'message')`, `ownMember(outcome, 'repair')` | `[[GetOwnProperty]]` | conforming; the report's own target of comparison |
| `bindings/js/src/entry/kernel-attempt.mjs:1028`-`:1033` | `ownMember(result, 'ok')`, `ownMember(result, 'message')` | `[[GetOwnProperty]]` | conforming — the second divergence's own fixed half (`D-35` read half, 2026-10-26) |
| `bindings/js/src/entry/constraints.mjs:2810`-`:2814` | `Object.hasOwn(outcome, 'message')`, `ownDataMember(outcome, 'repair')` | `[[GetOwnProperty]]` | **conforming — and it is a THIRD instant**: the reversal's judgement (`rollback`'s pass) reads the same closed outcome by the own-member rule, so **two of the three instants that read a caller's outcome already agree with each other and the registration instant is the lone outlier** |

**THE HELPERS, EACH READ AT ITS OWN BYTES.** `ownMember` (`bindings/js/src/entry/kernel-foundations.mjs:882`-`:886`) is
`Object.getOwnPropertyDescriptor` with the descriptor's `value` taken only where it is one — an accessor answers `undefined`.
**Its docblock carries the MEASUREMENT the divergence is:** *"measured: an inherited `message` became the refusal's message,
an inherited `{ok, op}` was CREDITED as the repair's landed op, and an inherited `status` was read as a store code"*
(`:876`-`:877`). **So the divergence was known when the helper was written, and only the write-side instants were converted.**

**NO OTHER CHAIN READ OF A CALLER-SUPPLIED OUTCOME OR REPAIR RESULT STANDS** in `bindings/js/src/entry/`, `bindings/js/index.mjs`
or `bindings/js/index.d.ts` — a grep for `'repair' in`, `'message' in`, `result.ok ===`, `Object.hasOwn(outcome` and
`ownMember(result` returns exactly the five sites above. **The two divergent reads are the whole population.**

---

### §15.5 · THE PRIOR RECORD'S DISPOSITIONS, EACH QUOTED AT ITS BYTES

**`docs/specs/storeroom-repair-arm-surface/contract.md` `§4` item 3** — *"DEFECT, RECORDED HERE AND FIXED NOWHERE —
`PAR-C-5`'s CLOSED OUTCOME IS READ TWO WAYS BY THE TWO INSTANTS, AND THE REGISTRATION READ IS THE PROTOTYPE'S"* — with
SYMPTOM, a 19-line REPRODUCTION, SUSPECTED ROOT CAUSE and a PROPOSED FIX SHAPE whose `(2)` reads: *"the registration
instant's test becomes the landing instant's own-member discipline — one shared own-member reader, `Object.hasOwn(outcome,
'message')` with `ownMember(outcome, 'repair')` read only inside that branch — so one returned shape answers ONE thing at
both instants. That edit is a behaviour byte; it belongs to a code-bearing unit, and only after it lands may a shipped
clause state the rule symmetrically."* **THE FIX IS OWED TO A CODE-BEARING UNIT — owner: that unit's pass; revisit
condition: the defect re-opens at the first passing code unit that touches `addConstraint`'s outcome read.**

**`docs/specs/storeroom-repair-arm-surface/contract.md` `§4` item 4** — *"DEFECT, RECORDED HERE AND FIXED NOWHERE —
`PAR-C-8`'S RESULT IS READ TWO WAYS ON ITS `ok` MEMBER… THE SECOND DIVERGENCE OF ITEM 3'S CLASS, ONE CLASS AND NOT ONE
INCIDENT"* — the same standing and the same owed owner, its fix shape `(2)`: *"one shared own-member read —
`ownMember(result,'ok')`"*.

**`docs/specs/storeroom-constraint-registration-instant/contract.md` `§4` item 3** — *"THE `D-35`/`D-36` REGRESSION THE
SIBLING RECORDS IS NOT THIS UNIT'S AND IS NOT CURED BY IT"* — *"It is a REGRESSION against `D-36` and is OWED TO A
CODE-BEARING UNIT; THIS UNIT TOUCHES THE SAME MODULE BUT NOT THAT READ"* (its `PIN-1` (i) omits the read from its write set
by name). **So the unit that owns the registration module was built, tested and landed, and it did not take this read — a
scope decision, recorded rather than absorbed.**

**THE LANDED CORPUS CELL — `docs/specs/storeroom-constraints/contract.md:361`-`:405`, sub-item `(viii)`** (appended
2026-10-30 on `D-85` items 1 and 3 read as the grant, `D-86`): *"THE CONSTRAINT OUTCOME'S TWO INSTANTS ANSWER THE SAME SHAPE
DIFFERENTLY"*, the two reads at their then-live ranges, **the classification — *"this site CONTRADICTS A CLOSURE and is no
unruled gap — `D-35` declares the defence to be parameter access, and `D-36` closes that parameter-access class AS
IMPLEMENTED on a PROVENANCE distinction"* — so what it records IS A REGRESSION**; **OWNER: *"a CODE-BEARING UNIT NAMED BY ITS
SHAPE AND BY NO UNIT NUMBER"*; POSITIVE REVISIT CONDITION: *"THE FIRST PASSING CODE-BEARING UNIT THAT TOUCHES
`addConstraint`'S OUTCOME READ LANDING"***; and its bounds — it names no repair, asserts nothing harmless, assigns the instant
nowhere, and *"NO CLAUSE OF THIS DIRECTORY MAY BE READ AS SETTLING IT."*

**`strata/decisions.md` · `D-35` (`:2517`) and `D-36` (`:2647`)** — the class and its closure: `D-35` classes *"a non-own
read of a CALLER-SUPPLIED value"* as the parameter-access hole (*"a caller gets a status outside the closed set and a
caller-authored message, not because they broke anything but because the package read a supplied object through a chain it
should not consult"*), and `D-36` declares that class **CLOSED AS IMPLEMENTED** on a provenance distinction — **a value the
caller supplied is read by own-property forms; a value the package minted is read with the realm's prototype methods.**
**The registration reads are of a CALLER-SUPPLIED value, so they sit inside the closed class — no new ruling is needed to
classify them, and none may be read as authorising the chain read.**

**THE SHIPPED PROSE THAT SCOPES THE RULE TO ONE INSTANT, AND WHICH A FIX WOULD MOVE (each at its `HEAD` bytes).**
`docs/guides/package-use.md:1094` — *"AT THE WRITE'S OWN EVALUATION — AT THAT INSTANT AND NO OTHER — THE KERNEL READS
`message` AND `repair` AS OWN MEMBERS … THIS IS THE ONLY SENTENCE IN THIS GUIDE THAT STATES THAT RULE, AND IT IS THE LANDING
INSTANT'S: the registration act reads the same closed outcome at `bindings/js/src/entry/kernel-registration.mjs:330-332`,
where an inherited `repair` IS seen and invoked … that divergence is OWED to a code-bearing unit and is contradicted by no
sentence here"*. `bindings/js/index.d.ts:1587`-`:1589` — *"THE TYPE DECLARES THE SHAPE AND NEVER THE READ: at the write's own
evaluation `message` and `repair` are read as OWN members, while at a registration instant the same closed outcome is read
through the prototype chain … which is `D-35`'s recorded defect and is OWED to a code-bearing unit"*. **Both clauses are
TRUE of `HEAD` and would become FALSE the moment the registration reads were converted — which is why the record says a
shipped clause may state the rule symmetrically only AFTER the fix lands.**

---

### §15.6 · WHAT THE RECORD DOES NOT ANSWER — THE QUESTIONS FOR THE ARCHITECT

**Each carries the default the record implies; none is decided here.** **`Q-1` is the one that decides the unit's size.**

**`Q-1` · SCOPE — the `repair` read alone, the outcome's two members, or the whole class (both reads at the registration
instant)?** **The downstream asks for one word: `Object.hasOwn(outcome, 'repair')`.** **The record's fix shape is wider:
the landing instant's discipline for `message` AND `repair` (`repair-arm-surface §4` item 3 (2)), and item 4's `ok` is the
same class and the same owed standing.** **Three readings, each with what it leaves standing:** (i) **repair only** — an
inherited `repair` is refused at registration, and `'message' in outcome` stays a chain read, so an inherited `message`
STILL answers two things at the two instants and the corpus cell's first divergence survives; (ii) **the outcome's two
members, own-read** — both divergences of the corpus cell close, the guide's `:1094` and `index.d.ts:1587` clauses can be
re-stated symmetrically, and item 4 (`ok`) remains; (iii) **the whole class — the outcome's two members AND the result's
`ok`** — every read of a caller-supplied outcome or repair return at every instant is own-member, and the property
`constraint-outcome §9` names has something to measure. **DEFAULT IMPLIED BY THE RECORD: (iii)** — the record's fix shapes
name both arms, the `K-4` drive exhibits item 4, and a unit that fixes one arm of a recorded class leaves the other owed
with the same owner. **But it is the architect's, and (i) is the report's own ask.**

**`Q-2` · THE VERSION — does the unit land as a cut (PATCH `1.9.3`) with release notes, or code + tests only?**
**The record's own precedents:** `D-104` wrapped a behaviour fix into a PATCH (*"This is a behavior defect, wrap into the
fix patch"*), `D-102`/`D-100` moved MINOR numbers for surface changes, and a fix here moves NO type, NO member, NO status
and NO message — it changes what a malformed-by-inheritance outcome is REFUSED at, at one instant. **DEFAULT IMPLIED:
PATCH `1.9.3`, eleven cells moving together**, on `PUB-DD-9`'s *"a fix inside the declared surface"* row. **What the record
does NOT decide is whether the unit cuts at all or lands unversioned** (several units here land code without cutting).

**`Q-3` · THE CORPUS CELL — does the code-bearing unit also dispose of the landed `(viii)` cell (a dated mark recording the
cure), or does that wait for a pass with scope inside the kept contracts?** **The cell's own revisit event is *"the first
passing code-bearing unit that touches `addConstraint`'s outcome read LANDING"* — so the event is this unit's, and the cell
becomes a record of a CURED regression whose successor state is unstated.** **`D-87` (1) grants no scope inside the nine kept
contracts; `D-85`/`D-86` granted exactly one cell, append-only.** **DEFAULT IMPLIED: the unit lands its code and its tests and
leaves the cell's disposal to a pass that asks for the grant** — the cell's rule is that it is *"RECORDED and NOT CURED"*,
and a marked cure needs its own admission; **the cost of the default is a corpus byte that describes a state the code no
longer holds.**

**`Q-4` · THE PROSE — which shipped sites move, and may they?** **`docs/guides/package-use.md:1094` and
`bindings/js/index.d.ts:1587`-`:1589` both assert the one-instant scope and both would be FALSE after a fix; the guide's
sentence *"this divergence is OWED … and is contradicted by no sentence here"* would also be stale.** **The record says only
AFTER the fix may a shipped clause state the rule symmetrically** — it does not say the fixing unit owns those edits.
**DEFAULT IMPLIED: the unit appends dated `RCA-8(g)` marks at both sites (append-only, no sentence deleted), and the guide's
generated landing `bindings/js/README.guide.md` is re-staged from its authored home** — that is what every prior prose
correction here has done. **What it does NOT decide is whether the marks say *"the rule is symmetric"* or *"the rule is the
landing instant's and the registration was converted by `D-nn`"` — the second is the append-only form the project prefers.**

**`Q-5` · ACCEPTANCE — what red set and what blind cell does the unit owe?** **The unit is `CODE-BEARING` with a behaviour
change, so by the precedent of `U-STOREROOM-CONSTRAINT-REGISTRATION-INSTANT` it owes: a real `tests/e2e/` red set (committed
cells), a blind instance where the battery can turn, and a property row over generated shapes.** **The record's property is
already named in words at `constraint-outcome §9`: *"at BOTH evaluation instants the same returned outcome answers the same
membership question … so a generated inherited-member shape can neither register a repair that the write then refuses to
read, nor carry a sentence at one instant that the other answers with `unrecognized`."*** **DEFAULT IMPLIED: a `tests/e2e/`
cell family driving the report's shape at both registration routes and both arms, plus one blind cell pinning the
membership symmetry, plus that property row** — the report's `VA-14`/`VA-15` are the downstream's cells and are not the
package's to copy.

**`Q-6` — ADJACENT AND NOT THIS UNIT'S, NAMED SO IT IS NOT DISCOVERED AS A MISS: the registration instant's CREDIT RULE is
op-based (`{ok: true, op}` required, `kernel-registration.mjs:676`-`:679`) while the write's credit is op-FREE since `D-105`
(`appliedRepairs`, `kernel-attempt.mjs:1048`-`:1052`) — the guide's own clause records this as open question `Q-1` of
`docs/L1/op-free-repair-credit.md §8.3` (*"the registration instant is a second credit site and keeps its own rule"*).**
**A unit touching the registration's result read will meet that rule and MUST NOT change it** unless a ruling says so — `K-3`
is the drive that exhibits its cost (a plausible repair refused at registration), and it is a separate subject from the
membership divergence.

---

### §15.7 · SUMMARY ENVELOPE

**VERIFIED.** The two divergent reads at their `HEAD` bytes (`kernel-registration.mjs:399`-`:401` and `:676`), the two
conforming write-side reads (`kernel-attempt.mjs:810`-`:818` and `:1028`-`:1033`), the third conforming instant
(`constraints.mjs:2810`-`:2814`), the symptom at both registration routes (`K-1`, `K-2`), the second divergence (`K-4`),
the credit controls (`K-5`, `K-5a`), the five prior records that name the defect and fix it nowhere, `D-35`/`D-36`'s class
and its closure, and the two shipped clauses that scope the rule to one instant.

**CORRECTED.** The report's provenance sentence (`C-6`: the asymmetry is `2770a61`, 2026-10-26, not 1.9.0 — 1.9.0 moved the
RESULT read); the report's minimal reproduction (`C-5`: it refuses at the construction on the credit rule and never reaches
the claimed write arm; `K-1` is the reproduction that does).

**REFUTED.** None of the report's substantive claims. The defect it describes is real, is recorded, and is a REGRESSION
against a declared closure.

**OPEN.** The five questions of `§15.6` (scope · version · the corpus cell · the prose · acceptance), each with its default,
and the adjacent credit-rule question `Q-6` which is not this unit's.

**FILES READ.** `strata/brief.md`, `strata/decisions.md` (`D-35`, `D-36`, `D-85`, `D-86`, `D-87`, and `D-88` by its
disposition), `strata/walkthrough.md`; `docs/specs/storeroom-repair-arm-surface/contract.md`, `docs/specs/
storeroom-repair-arm-surface-proposal-review.md`; `docs/specs/storeroom-constraint-registration-instant/contract.md`,
`claims.md`; `docs/specs/storeroom-constraint-outcome/contract.md`, `docs/specs/storeroom-constraint-outcome-proposal-
review.md`; `docs/specs/storeroom-constraints/contract.md` (`§0.1` item 5 `(viii)`); `bindings/js/src/entry/kernel-registration.mjs` (`:399`-`:401`,
`:676`-`:710`, `:320`-`:400`); `bindings/js/src/entry/kernel-attempt.mjs` (`:780`-`:830`, `:860`-`:915`,
`:1024`-`:1034`, `:1384`-`:1387`); `bindings/js/src/entry/constraints.mjs` (`:2790`-`:2830`); `bindings/js/src/entry/
kernel-foundations.mjs` (`:876`-`:886`, `:1105`-`:1131`); `bindings/js/index.d.ts` (`:1390`-`:1435`, `:1586`-`:1590`);
`docs/guides/package-use.md` (`§7.6`, `:1088`-`:1135`); `bindings/js/RELEASE-NOTES.md` (`§1.6.2`, `§1.7.0`, `§1.8.0`,
`§1.8.1` heads); the git objects `2770a61`, `1a0d252`, `21a3db2`, `9afb411`, `fd34789`, `f3b35ea`; and the seven drives of
`§15.3`, run from `/tmp` against this checkout's entry and addon.

---

## §16 · The intake question — is the durability tier carried on RETURNED data? (`2026-11-06` · `2c2b882`)

**THE QUESTION, AS PUT BY THE ARCHITECT — VERBATIM:** *"The returned json passed to read requests, listeners, constraints,
etc. should include the durability tier of the data object (`'file'`, `'mem'`, or `'temp'`) as a data property (ex. `_tier` or
similar). Does it currently do this or did this get dropped from the spec?"*

**THE ANSWER, AND ITS TOKEN: `NEVER SPECIFIED`.** No contract clause, no `D-` ruling, no research note, no pending item, no
defect row and no release note of this repository declares that a returned datum carries the tier of the version it came from
— **so nothing was dropped, because there was never an original clause.** If the requirement came from a conversation this
corpus does not hold, **that is why it is absent here: `strata/decisions.md` is the only authority for intent and it carries
no row on this subject** (its `D-` headings enumerated whole this date: `123`, none naming a returned tier).

### §16.1 · What the surface declares TODAY, verb by verb (all `OPERATIVE`, read at the bytes)

| what the caller gets | the declared shape | the site |
|---|---|---|
| `read` · `readLiteral` | **a BARE VALUE — no wrapper, no envelope** — `read(address: Address, tier?: TierSet): unknown` | `bindings/js/index.d.ts:975`, `:977`; `docs/specs/storeroom-native/contract.md:2166`, `:2188`–`:2192` (*"the same absence of any wrapper"*), the arm table `R-1`…`R-5` at `:2226`–`:2232` (`R-1`: *"its value, verbatim"*) |
| a **listener body** | **ONE argument, the TRIGGERING ADDRESS, and nothing else** | `bindings/js/index.d.ts:500`–`:501`; `docs/specs/storeroom-js/surface.md:1695`–`:1706` (*"NO OTHER ARGUMENT IS DECLARED AND NO RETURN VALUE IS READ"*) |
| a **constraint body** | `AttemptContext` — five members, **and `tier` IS one of them** | `bindings/js/index.d.ts:1492`, `:1521`–`:1527` |
| `write`'s record | `{ op, watched, triggered }` + non-enumerable `discarded`/`log`; **the tier rides `op.tier`** | `bindings/js/index.d.ts:530`, `:544`–`:548` |
| `delete`'s receipt | `{ address, tiers, triggered, op }` — **the only ANSWER carrying a tier SET, and it reports what the delete REMOVED** | `bindings/js/index.d.ts:629`–`:653`; `src/records.rs:199`–`:214` |
| `rollback`'s record | `{ opId, undoneOps, restoredTo }` — **no tier anywhere; `restoredTo` is a `BaseState` of `{present, value}`** | `bindings/js/index.d.ts:509`–`:512`, `:772`–`:775` |

**AND THE CONSTRAINT'S `tier` IS NOT THE ANSWER TO THIS QUESTION, WHICH THE ARCHIVED CLAUSE STATES IN ITS OWN WORDS:**
*"`tier` ANSWERS 'which tier did THIS ATTEMPT'S landing write at' … SO `tier` IS NOT INFERRED FROM THE `value`'s OWN
SELECTION — the tier the `read` happened to select is NOT the tier the attempt landed at"*
(`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-constraints/kernel-surface.md:476`, `ARCHIVED`; the live shape it
describes is `docs/L1/repair-outcome-types.md:86`, `:114`, and `tier` is `null` at a registration's FIRST ask while `value`
there is a real read).

### §16.2 · The searches, stated as what they searched and what they returned

`_tier` as a data property: **`0`** occurrences repo-wide in `*.md` — the single `_tier` hit anywhere in this tree is the
identifier `assemble_at_tier` at `docs/specs/storeroom-native/contract.md:761`; `tierOf`/`tier_of` in `*.md`: **`0`**; the
`{value, tier}` envelope form in `*.md`: **`0`**; `provenance` (`98` hits) and `envelope` (`122` hits): **none on a data
object's tier**; `durabilit\w*` (`30` hits): **all about which ACT owes a save** (`DD-28`, `D-106`); `strata/walkthrough.md`
and `strata/envelope.md`: **`0`** hits on `tier`; `strata/research.md`: `20` hits, **all the fifth report's file-tier-save
arms**; `scratch/**`: `16` hits, **all test-name lines** (`SCRATCH`; one reads `delivery_listen_carries_no_tier_qualifier`).
Corpora swept whole: `docs/specs/**`, `docs/guides/`, `docs/L1/`, `archive/pre-strata-docs-2026-10-24/docs/**`,
`.reflow-backup/docs/**`, `bindings/js/**`, `src/**`, `tests/**`, the three root notes.

### §16.3 · What the corpus does say, and it says the opposite — TWO REFUSALS, NOT AN OMISSION

1. **A read's answer carries no accompanying member, and that is a DECLARED line** — *"a `read` or a `readLiteral` answers a
   VALUE and carries no such member"*, stated where `discarded`'s presence is declared (`docs/specs/storeroom-js/contract.md:1298`).
2. **The crossing forbids exactly the shape a `_tier` member would be** — a copy-out object *"carries exactly the stored OWN
   ENUMERABLE STRING-KEYED member set, with no tag, class token or envelope in any member"*
   (`docs/specs/storeroom-json-crossing/contract.md:836`; and `:826`, `:48`). **AND A REGISTER KEY IS ANY STRING**, so `_tier`
   is a legal key a caller may store: a member the package adds and a member the caller wrote would be the same member, and
   no clause of this corpus distinguishes them.
3. **The standing remedy for "I need more than I was handed" is a READ, ruled by the architect** — *"If a constraint needs to
   look for the data at a given location, it can read()"* (`strata/decisions.md` `D-50`, `:3182`; *"the machinery owes the
   constraint one value and the constraint owes itself the rest"*, `:3190`–`:3192`).

### §16.4 · Every route by which a caller can learn a version's tier TODAY

**ON THE SHIPPED JS SURFACE:** **(1)** a tier-narrowed `read`/`readLiteral` answering vs refusing `TierNotFound` — one call
per tier, a probe and not a readout (`index.d.ts:975`; `L-TIER` at `docs/specs/storeroom-native/contract.md:1715`);
**(2)** `TierNotFound`'s message, **which names the tiers that are present** — `src/error.rs:345`–`:349`:
*"`{} is not a version of '{container}', versions are at {tierlist}`"*, fed by `present.to_vec()` at `:724`–`:744`, and
reaching JS only as the refusal's generated `message`; **(3)** `record.op.tier` on a `write`; **(4)** `receipt.tiers` on a
`delete` (destructively); **(5)** `context.tier` inside a constraint/repair body (the ACT's tier, §16.1); **(6)** the boot
differential over an equal `cfg.filePath` (`DD-28`), by inference and for `file` alone.

**NATIVE-ONLY, NOT REACHABLE FROM JS:** `Store::findAddress(address, tier?) -> &NodeRef`, whose `NodeRef.anchor.tier` is a
`Tier` (`src/store.rs:2231`–`:2245`; `src/records.rs:84`, `:127`–`:133`) — **`findAddress` does not cross**: *"`findAddress` IS
AN INTERNAL TOOL AND THIS UNIT DOES NOT EXPOSE IT"* (`docs/specs/storeroom-js/contract.md:2195`, `:2200`, `:2207`, `:3368`;
and the addon's `#[napi]` export set at `bindings/js/src/facade.rs:570`–`:983` carries no such call).
**CARRIER-INTERNAL AND DECLARED CLOSED:** the journal's per-version capture — *"each with its tier … no member of it crosses
any verb, no read or `findAddress` surfaces it"* (`docs/specs/storeroom-native/contract.md:718`, `DD-50`).

### §16.5 · The adjacent finding this question exposes — a CONTRADICTION on which version an unqualified read lands on

**THE OPERATIVE CLAUSE:** **a zero-tier read selects the LOWEST-persistence anchor** —
`docs/specs/storeroom-native/contract.md:1789`–`:1794` (*"`temp` (rank 0) is selected before `mem` … before `file`"*),
restated at `:3302`–`:3306` (*"the lower-persistence anchor IS the shadowing one, and an unqualified read selects it"*) and at
arm `R-4` (`:2231`), and **measured**: `tests/integration/store-core/properties.rs:469`–`:472` asserts the unqualified answer
is the `mem` version over a standing `file` one and `:482`–`:485` that *"the landing is the LOWEST-persistence anchor"*, the
sharpest carrier being `tests/integration/store-core/walk_and_resolver.rs:316`–`:343` (`s2_3_zero_tiers_select_the_lowest_
persistence_anchor`: one key at `file` `1`, `mem` `2`, `temp` `3`, the unqualified read answering `3`) — with
`docs/specs/storeroom-file-save-coverage/arms.md:246`–`:250` recording that an earlier draft had it backwards and an
examiner's read corrected it.

**THE CONTRADICTING TEXT, WHICH CONTRADICTS ITSELF INSIDE ONE FILE:** `docs/guides/package-use.md:386`–`:387` — *"the newer
version is added alongside and the MORE persistent one wins the unqualified read"* — where the same file's table at `:403`
says `read`/`readLiteral` with `tier` absent is *"legal — the lowest persistence present"*; **and the page SHIPS**: its
generated landing `bindings/js/README.guide.md:387` carries the same bytes.

**⟶ CORRECTED AT THIS LINE, 2026-11-06, BY `§17`'s PASS — THE CLAUSE ABOVE READ *"`strata/brief.md:219`–`:220` carries the
guide's version of that sentence"* AND THAT READING IS WITHDRAWN.** `strata/brief.md:219`–`:220` carries the **contract's
predicate** (*"the shadow wins the unqualified read"*) while defining `shadow` as *"the key holds a **more** persistent
version than the write's"* — **the guide's DEFINITION on the contract's PREDICATE, which is the seam the contradiction grows
from**: the contract names the **lower**-persistence anchor *"the shadowing one"* (`docs/specs/storeroom-native/contract.md:3304`),
so the brief's sentence reads Side B under its own definition and Side A under the contract's use of the word. `§17` carries
the census and the discriminating cells; **the subject is filed there in full and the question stays the architect's.**
**AND IT IS STILL LOAD-BEARING FOR §16's OWN SUBJECT**: whether a caller can tell which version it received is a different
question from whether the store can name it.

### §16.6 · SUMMARY ENVELOPE

**VERDICT.** `NEVER SPECIFIED` — the corpus states no such requirement and dropped none.

**NOT VERIFIED.** That any consumer has ever needed it: **no clause of `docs/guides/` and no report in `strata/research.md`
asks for it.**

**ANSWERED BY THE ARCHITECT, 2026-11-06 — the intake he chose:** the request goes **as a proposal**, through
`role_l0_validity` with `role_l0_critique`, and its record is `strata/proposals.md` (`P-1`), whose verdict is
**`BLOCKED-ON-SEMANTICS`**; the adjacent contradiction goes **as its own intake**, which is `§17` here.

**ADJACENT, FILED.** §16.5's contradiction, carried in full at `§17` (the crate implements the least-persistent
selection; `NONE` of `strata/decisions.md`'s `123` `D-` rows decides it; the two Side-B carriers are the guide and its
generated landing).

**FILES READ.** `bindings/js/index.d.ts`; `src/{store,records,error,value,args}.rs`;
`bindings/js/src/{facade,crossing}.rs`; `docs/specs/storeroom-native/contract.md`; `docs/specs/storeroom-js/{contract,surface}.md`;
`docs/specs/storeroom-json-crossing/contract.md`; `docs/specs/storeroom-file-save-coverage/arms.md`; `docs/guides/package-use.md`;
`docs/L1/repair-outcome-types.md`; `strata/{brief,decisions,research,walkthrough,envelope}.md`;
`archive/pre-strata-docs-2026-10-24/docs/**`; `tests/integration/store-core/properties.rs` (`:474`, `:483`).

---

## §17 · The unqualified read's selection — the guide against the contract, FILED (`2026-11-06` · `2c2b882`)

**FILED ON THE ARCHITECT'S OWN INSTRUCTION of this date**, when `§16`'s adjacent finding was put to him with the choice to file
it as its own intake or leave it recorded: **he chose to file it.** So this section is a **separate intake** and not a
continuation of `§16`, and it resolves nothing — it establishes the law at the crate's bytes, the documents on each side, the
rulings that do and do not decide it, and the cells that discriminate the two readings.

### §17.1 · The law at the crate's own bytes — SIDE A, and there is no reading of the code that gives Side B

| the step | the bytes | what it settles |
|---|---|---|
| the tier argument's zero arm | `src/args.rs:197`–`:199` — `TierArg::Absent => Ok(TierSel::All)`; and `:210`–`:215` — *"An array of 0 tokens is read as the ZERO-TIER arm"* → also `TierSel::All`; `:172`–`:177` — `TierSel::All => true` matches **every** anchor | **an absent tier does not narrow the set**; it admits all anchors |
| the selection | `src/store.rs:1146`–`:1152` — `fn lowest`: `min_by_key(|reference| self.refs[**reference].anchor.tier.rank())`, with `Tier::rank` = `file 2 > mem 1 > temp 0` (`src/records.rs:27`–`:33`) | **the LOWEST-rank version answers** — `temp` before `mem` before `file` |
| the walk | `src/store.rs:2265`–`:2276` (`read`), `:2279`–`:2295` (`readLiteral`) — the same `read_tier_sel` → `walk` → selection | **`read` and `readLiteral` select alike**; `readLiteral` narrows only to leaf-ness |
| a branch's assembly | `src/store.rs:1214`–`:1228` `select_member`, `Some(self.lowest(&matched))`, whose own comment at `:1211`–`:1213` reads *"The zero-tier arm (`TierSel::All`) matches every anchor, so `A28`'s lowest-persistence selection runs at every address and nothing is omitted"* | **the rule is PER CHILD**: one object, each key's own rank-lowest version |
| not a counter-example | `assemble_at_tier` (`src/store.rs:1306`–`:1356`) reads `pair_at(link, &key, tier)` — the one anchor `A34` bounds to `0 or 1` at a fixed pair — and is the `file` snapshot path (`:1359`–`:1369`), **not a selection** | the snapshot path is not the read's rule |

**AND TWO SHIPPED, NON-SPEC BYTES SAY THE SAME THING INDEPENDENTLY:** `bindings/js/src/entry/constraints.mjs:2269` — *"the
zero-tier `read` answers the LOWEST-tier version present at each key (`src/store.rs`'s `select_member`)"* — and `write`'s own
parent resolution reuses the same arm (`src/store.rs:2335`, `self.walk(&parents, &TierSel::All)`).

### §17.2 · The operative contract states Side A eight times, and makes Side B a DECLARED FAILURE

`docs/specs/storeroom-native/contract.md`: **`:1789`–`:1794`** (*"ZERO tiers passed … the walk selects the LOWEST-PERSISTENCE
anchor … `temp` (rank 0) is selected before `mem` … before `file`"*); **`:3304`** (*"the lower-persistence anchor IS the
shadowing one, and an unqualified read selects it"*); **`:2231`** (arm `R-4`, *"only the node of the lowest-persistence anchor is
translated"*); **`:2006`** (arm `W-5`, *"the shadow wins the unqualified read"*); **`:1863`** (the `read` row's absent-tier cell,
*"legal — lowest persistence"*); **`:470`** (`DD-12`, the lowest-persistence fall-through *"reserved to the zero-tier arm"*);
**`:1736`–`:1767`** (the assembly, per address); and — decisively — **`:2586`–`:2588`, where the failable property names the
OTHER reading as a failure:** *"a shadow that does not win the unqualified read … **a read that answers the higher-persistence
version**"*. **SO SIDE B IS NOT AN ALTERNATIVE READING OF THIS CONTRACT: IT IS ON THE CONTRACT'S OWN FAILURE LIST.**

### §17.3 · No ruling decides it — `NONE`

`strata/decisions.md`'s `123` `D-` headings were searched whole for `lowest|shadow|unqualified|zero-tier|persistence` (`3`
hits, none on read selection: `:978` a helper constant that *"shadows"*, `:3799`/`:3805` a listener/purge row) and for
`select|A34|A28|landing|which version` (`32` hits, none deciding it; the one `R-4` heading at `:1366` is a **namesake** about
the `register`/`listen` asymmetry). **`A28`, `A11` and `A24` are not in `strata/decisions.md` at all** — they live in the
ARCHIVED set (`archive/pre-strata-docs-2026-10-24/docs/decisions.md:104`, `:114`, and `:567`, where `A24`'s own row records
that it *"does **not** restate the ZERO-tier arm's selection rule"*). **So the law here is the CONTRACT's and the CRATE's, and
no architect's ruling touches it.**

**⟶ CORRECTED AT THIS LINE, `2026-11-06`, BECAUSE THE FIGURE OUTLIVED ITS BYTES — AND THE MARK GOVERNS EVERY PRINT OF `123`
IN `§§16`–`§17` (`:952`, `:1052`, `:1166`).** **THE `123` IS TRUE OF THE FILE AS IT STOOD WHEN EACH SEARCH RAN AND IS NOT TRUE OF
THE FILE NOW: `strata/decisions.md` prints `126` `D-` headings at this date** (`grep -c '^### ' + a `D-` prefix match; the
instrument is printed so the figure can be re-taken),
**the three new rows being `D-121` (`:6174`), `D-121-ter` (`:6201`) and `D-121-quater` (`:6232`) — all three landed AFTER `§16`
and `§17` were written, and none of them decides which version an unqualified read lands on.** **THE SEARCH'S CONCLUSION IS
UNMOVED AND IS NOW STRONGER RATHER THAN WEAKER:** `D-121-ter:6215` names **`src/store.rs:1143`–`:1152`'s lowest-rank selection**
as *"the tier of the version the read selected"* — **that is Side A, quoted as the crate's own rule, and it arrives from the
architect's hand rather than from a ruling on the contradiction.** **SO THE SUBJECT OF `§17` STANDS EXACTLY AS FILED: no ruling
decides which side the GUIDE states (`docs/guides/package-use.md:387` and its landing), and the operative law is still the
contract's and the crate's.** **AND THE LESSON IS THE WALKTHROUGH'S OWN (`strata/walkthrough.md:88`–`:92`): a figure that
describes a pass is the first casualty of the next pass, so every count in this record is read with its date or re-measured.**

### §17.4 · The census — Side A everywhere; Side B is ONE authored text and its generated landing

**SIDE A (`20` carrier groups):** the operative contract's eight sites above · `docs/specs/storeroom-file-save-coverage/arms.md:246`–`:250` · the crate (`src/store.rs:1143`–`:1152`, `:1214`–`:1228`; `src/args.rs:197`–`:215`) · a shipped entry comment
(`constraints.mjs:2269`) · the guide's own **parameter table** (`docs/guides/package-use.md:403`, *"legal — the lowest
persistence present"*) **and the copy of that table in its landing** (`bindings/js/README.guide.md:403`) · and the measured
battery (`§17.5`).

**SIDE B (`2` carriers, and they are ONE text):** `docs/guides/package-use.md:386`–`:387` — *"When the key holds a version at a
tier MORE persistent than the write's, the newer version is added alongside and **the more persistent one wins the unqualified
read**"* — and its **generated, shipped** landing `bindings/js/README.guide.md:387`, **byte-identical**: `cmp` clean this date
and one `sha256` for both, `5e9cc292dcbab477ef2056dc29fcb832eba3c29f93f7cc9edd048fa18c713e23`, `2332` lines each. **The landing is
GENERATED — the canonical home is `docs/guides/package-use.md`, the assembly copies it, and `scripts/publish.sh:108`–`:120`
REFUSES when the two differ** (*"`README.guide.md` is a GENERATED landing: an edit belongs in the canonical file, and this script
REFUSES when the two differ"*). **Nothing in `docs/specs/**`, `docs/L1/**`, `README.md` or either archive carries Side B.**

**AND THE GUIDE CONTRADICTS ITSELF INSIDE ONE FILE:** its `:387` says the more persistent version wins; its `:403` says the
absent tier is *"the lowest persistence present"*. **Sixteen lines apart, in the document that ships to every consumer.**

**AND `strata/brief.md:219`–`:220` IS NOT A THIRD SIDE-B CARRIER — CORRECTED AT `§16.5`, WHOSE SENTENCE IS WITHDRAWN THERE:** the
brief carries the **contract's predicate** (*"the shadow wins the unqualified read"*) on the **guide's DEFINITION** (*"the key
holds a **more** persistent version than the write's"*). **The contract calls the LOWER-persistence anchor *"the shadowing one"*
(`:3304`), so the brief's sentence reads Side B under its own definition and Side A under the contract's use of the word** —
which is exactly the seam the guide's `:387` grew from, and it is why two halves of the corpus were never seen to disagree.

### §17.5 · The discriminating cells — the battery is Side A's, and it is not marginal

**The sharpest drive: `tests/integration/store-core/walk_and_resolver.rs:316`–`:343`**
(`s2_3_zero_tiers_select_the_lowest_persistence_anchor`) — writes `file` `1`, `mem` `2`, `temp` `3` at ONE key and asserts the
unqualified read answers `3` (*"§2.3: rank ascending — temp first"*) and that the **0-token set** answers `3` too. **Side B
answers `1` and turns both assertions.**

**The record's own cell: `tests/integration/store-core/properties.rs:469`–`:485`** — `:469`–`:472` the unqualified read answers
`"trial"` over a standing `"durable"`; `:473`–`:477` the qualified `file` probe answers `"durable"`; `:482`–`:485`
`landing_tier(...) == Tier::Mem`, *"the landing is the LOWEST-persistence anchor at the key"*.

**And the population, each re-read as a source text this date:** `properties.rs:1291`–`:1294` (`P-SM-4`'s three ordered pairs,
each asserting *"an unqualified read answers the LOWER rank"*); `read_and_delete.rs:85`–`:89`; `tiers_and_purge.rs:154`–`:158`;
`write_arms.rs:345`; `e2e_listener_firing.rs:1009`–`:1010` (*"§3.4 W-5 + A11: 'the shadow wins the unqualified read'"*);
`e2e_json_round_trip.rs:829`, `:844`; `store-args/gate4_red_set_fix.rs:1082`, `:1182`; across the boundary `tests/e2e/greens.mjs:908`
(`JSG-07.2`, *"after a LESS persistent write the unqualified read selects the SHADOW: 1"*),
`tests/e2e/file-save-coverage-properties.test.mjs:504`–`:505`, `tests/e2e/live-drive.mjs:359`; plus ~`30` assertions that read
their expected tier from the zero-tier helper `landing_tier` (`tests/integration/support/mod.rs:576`–`:586`).

### §17.6 · What this does and does not decide

**IT DECIDES NOTHING, AND IT CHANGES NO CODE.** The crate implements Side A and the operative contract declares Side A eight
times and Side B a failure — **so the defect, if it is one, is in TWO DOCUMENT BYTES: a consumer guide's sentence (`:387`) and
its generated landing.** **Whether that is a defect row, a prose-correction unit, or a fresh ruling is the architect's call and
is not decided here** — and it is put to him with `P-1`'s questions rather than beside them, because `§16`'s subject and this
one meet at the same question: **what a caller is entitled to know about the version it received.**

**WHAT NO PASS HAS ESTABLISHED, STATED PLAINLY.** *When* `:387` acquired *"the more persistent one wins"* is **not** answered by
this pass — no `git blame`/`git log` was run, so the sentence is dated by nothing here; the ARCHIVED guide
(`archive/pre-strata-docs-2026-10-24/docs/guides/package-use.md:471`) shows an earlier form pairing *"the more persistent one
survives"* with *"the shadow wins the unqualified read"*, which is where the collapse plausibly happened, **and a plausible
seam is not a provenance.** **No test was executed in this pass:** every red/green statement above is derived from the
assertions' source text and the selection code, not from a run.

### §17.7 · SUMMARY ENVELOPE

**VERIFIED.** The crate's selection (Side A, `§17.1`); the contract's eight Side-A sites and its failure list (`§17.2`); `NONE`
of `strata/decisions.md`'s `123` `D-` rows deciding it (`§17.3`); the census — Side A at `20` carrier groups, Side B at exactly
two carriers that are one authored text and its generated landing (`§17.4`); the guide/landing byte-identity by `cmp` and one
`sha256` (`2332` lines each); the guide's own self-contradiction at `:387` against `:403`; and the discriminating cells.

**CORRECTED.** `§16.5`'s *"the brief carries the guide's version of that sentence"* — **withdrawn at that line**, the corrected
reading being the definition/predicate seam of `§17.4`.

**OPEN, AND THE ARCHITECT'S.** What to do about the two Side-B bytes, and who owns it; and `§16`'s own ten questions in
`strata/proposals.md` `P-1`.

**NOT VERIFIED, BY INSTRUMENT.** When `:387` was rewritten and by whom (no `git log`/`git blame` run); and every red/green
statement (no harness executed — source text and code only).

**FILES READ.** `src/{store,args,records}.rs`; `bindings/js/src/entry/constraints.mjs`; `bindings/js/index.d.ts`;
`docs/specs/storeroom-native/contract.md` (`§2.2`–`§2.3`, `§4.1`–`§4.2`, `§5.1`–`§5.4`, `DD-12`, `DD-27`);
`docs/specs/storeroom-file-save-coverage/arms.md`; `docs/guides/package-use.md`; `bindings/js/README.guide.md`;
`scripts/publish.sh`; `strata/{brief,decisions,research}.md`; `archive/pre-strata-docs-2026-10-24/docs/{decisions.md,guides/package-use.md}`;
`tests/integration/store-core/{walk_and_resolver,properties,read_and_delete,tiers_and_purge,write_arms,e2e_listener_firing,e2e_json_round_trip}.rs`;
`tests/integration/{support/mod.rs,store-args/gate4_red_set_fix.rs}`; `tests/e2e/{greens.mjs,live-drive.mjs,file-save-coverage-properties.test.mjs}`.


---

## §18 · POSTSCRIPT — THE AUDITS' OWN CITATIONS AFTER THE LANDING (`2026-11-06`)

**THIS SECTION EXISTS FOR ONE REASON: `§16` AND `§17` CITE CODE LINES, AND `U-STOREROOM-TIER-READOUT`'S LANDING MOVED THEM.** The store
gained `compile_tiered`/`read_tiered` above `write`, the addon gained one entry, the declaration gained a member and a union, and the
facade gained one entry and a docblock — **so every code citation in the two sections above is a PRE-LANDING reading taken at `HEAD`
`2c2b882`, and it must be read as its own date, not as the tree.** **The audits' citations into `strata/decisions.md` are NOT stale**
— that file was appended and its `§16`/`§17` line references were re-taken when the four rulings landed (`D-121` `:6174` ·
`D-121-ter` `:6201` · `D-121-quater` `:6232` · `D-121-quinquies` `:6252`; the file prints `127` `D-` headings and `6267` lines).

**THE MOVES, STATED SO A READER CAN RE-FIND ANY OF THEM WITHOUT RE-DERIVING THE WHOLE MAP:** `src/store.rs` — **every cited line from
`:1301` on shifts `+95`, and from `:2297` on `+125`** (`read` `:2265`→`:2360` · `register_ref_for` `:2260`→`:2355` · `findAddress`
`:2231`→`:2326` · the leaf mint `:1699`→`:1794` · the two container arms `:1685`/`:1692`→`:1780`/`:1787` · `select_member`'s
`Some(self.lowest(…))` `:1143`·`:1147`–`:1152` **UNMOVED**). `bindings/js/index.d.ts` — `StoreInstance` `:960`→`:978`, `read`
`:975`→`:993`, `readLiteral` `:977`→`:995`, `file ends` `:1680`→`:1736`, and the new `TieredNode` at `:201` with `readTiered` at
`:1033`. `bindings/js/src/facade.rs` — `read` `:570`→`:581`, the census sentences `:375`/`:408`/`:980`→`:375`/`:419`/`:1030`, the
arity table `:394`–`:397`→`:403`–`:408`. `bindings/js/index.mjs` — `read` `:276`–`:304` unmoved in bytes, the new member at `:313`.
`docs/specs/storeroom-native/contract.md` — **`+2` from `:2198`** (the third granted mark), so `R-1`…`R-5` read `:2228`–`:2234` and
the register's reference clause reads `:2349`–`:2357`.

**THE DISCHARGE OF THIS POSTSCRIPT.** The audit's subject does not move: **`§16`'s `NEVER SPECIFIED` and `§17`'s Side-B
contradiction are both still true of the corpus as audited**, and the landing decided neither.

**⟶ AND THE ARCHITECT SETTLED IT, `2026-11-06`, IN THREE WORDS — *"Correct guide"*, recorded as `D-122`. THE SENTENCE ABOVE IS THE
READING OF ITS OWN MOMENT AND IS READ THROUGH THIS MARK.** `docs/guides/package-use.md:386`–`:387` now states the store's own rule —
an unqualified read selects the **LOWEST**-persistence version present, the shadowing one — with the contract's `§2.3` selection and
`readTiered` cited beside it; **its generated landing was re-staged by the publish script's own assembly** (`cmp` clean, one
`sha256`, `2332` lines / `352840` bytes each, never hand-edited); **and `strata/brief.md`'s definitional inversion was corrected at
its own bytes.** **`NO` contract clause, cell, status or code byte moved — the fix was in the two documents that were wrong, which is
what `§17.4`'s census measured them to be (Side A at `20` carrier groups, Side B at exactly two carriers that are one authored text
and its generated landing).** **SO `§16`'s `NEVER SPECIFIED`, `§17`'s Side-A finding and this postscript's re-map all stand, and the
one thing `§17` left to the architect is CLOSED.**
