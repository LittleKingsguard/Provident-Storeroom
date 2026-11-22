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
| `C-12` | a registration reaches no terminal arm and no delivery seam | **VERIFIED at the bytes ON ITS DATE — AND FALSE FROM `2026-11-06` BY RULING (`D-125` item 1), NOT BY DRIFT** | `kernel-registration.mjs`'s `closeRegistrationAttempt` (`:812`–`:840`), its own clause; the synthetic attempt's close performs no store act. **⟶ RE-DERIVED `2026-11-06` BY THE SUPERVISOR AS `PIN-13` ASSIGNS: the claim's first half is gone and its second half was already false.** **(a) THE DELIVERY SEAM IS REACHED FROM TO-DAY**: `U-STOREROOM-CREATION-SWEEP` gives `closeRegistrationAttempt` a delivery on its passing arm, behind the save, and `D-125` item 1 widens it to **four instants** — `storeCreate`, a boot over an existing `filePath`, `addConstraint` and a re-arm — so *"no delivery seam"* is superseded by name and the code's own sentence *"IT STILL OPENS NO `K-2` AND STILL DELIVERS NO LISTENER"* is re-derived in the same unit. **(b) THIS ROW'S RANGE WAS STALE AND ITS SECOND CLAIM WAS ALREADY UNTRUE**: the close stands at `:928`, not `:812`–`:840`, and *"the synthetic attempt's close performs no store act"* was falsified by `D-106` arm 1 (the save) and `D-107` item 1 (the rollback composition) **before** this unit. **What survives, and is why the row is corrected rather than retired: on its own date it was true, it was the measurement `D-123`'s block rested on, and the fact it established is the fact the ruling reverses.** |
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


## §19 · The creation as an editing action — the constraint check, the repair flow, and the listener that has no recipient (`2026-11-06` · `3f24248`)

**THE REQUEST, VERBATIM FROM THE PRODUCT'S OWNER, `2026-11-06`:**

> "The store creation should be treated as an editing action because it changes the existing data state, and therefore should check all relevant constraints (and subsequent repair flows) and fire listeners"

**WHAT THIS SECTION IS.** The intake audit for that request, filed under the intake rule that a note goes to `role_l0_research`. **IT DESIGNS NOTHING, RANKS NOTHING, DECIDES NOTHING AND OPENS NO UNIT.** Its companion gate-1 record is `strata/proposals.md` · `P-2`. Its `HEAD` is **`3f24248`**, and every citation below was read at that tree.

**CHANNEL LIMIT, RECORDED BECAUSE IT IS PART OF THE PROVENANCE.** This pass held **no shell**: it could read files and nothing else. **So no driver was re-driven, and every behavioural figure in §19.4 is the SUPERVISOR's transcript, read against the drivers' own source** (`scratch/l0-probe/probe.mjs`, `scratch/l0-probe/probe2.mjs`). Every other figure in this section is a byte citation and is printed with its `path:line`.

---

### §19.1 · What the corpus says today, at the bytes

**THE SUBJECT SPLITS INTO THREE VERBS, AND THE CORPUS ANSWERS THEM DIFFERENTLY.** *"changes the existing data state"*; *"should check all relevant constraints (and subsequent repair flows)"*; *"and fire listeners"*. **The first two are shipped behaviour at one of the construction's arms; the third has no recipient at the instant it names and no delivery seam at any instant the construction reaches.**

#### (i) THE CONSTRUCTION'S OWN NUMBERED STEPS — `src/store.rs`'s `storeCreateWithConstraints`

**The sequence is declared at `src/store.rs:649`–`:655` and implemented in the order it prints**, from `:671`:

| step | the byte | what it does |
|---|---|---|
| 2 | `src/store.rs:675`–`:686` | `journalLength` — the one argument whose absence is still an error |
| 3 | `:687`–`:702` | the `filePath` DRY RUN, `path_is_reachable`; the register's tier fixed |
| **3-bis** | `:703`–`:709` | **`construction_listeners(&cfg.listeners)?`** — every `listeners[]` entry validated *before* the create, *"a rejected array admits NOTHING"* |
| **4-bis** | `:710`–`:717` | **`construction_constraints(constraints)?`** — the list's own shape validation at the store's own code |
| **4b** | `:718`–`:747` | **the exclusive create** (`create_new`), which *"LEAVES IT ZERO-LENGTH: AN EMPTY FILE AND NO BYTE"* |
| **5** | `:748`–`:754` | **the HOME MAP POPULATED FROM `listeners[]`** — `home.adopt(address, handle)` **and nothing else: no function is stored, because the record has no place to put one** |
| 6 | `:757` | `Store::empty(file_path, journal_length, register_tier, home)` — the registry generated over the already-populated home |
| **7** | `:758`–`:761` | **the boot:** `let _loaded = store.boot_load();` — with the clause *"the home is NOT re-populated from the file, so a fresh instance over an equal path loads NO registration (`DD-38`)"* |
| — | `:811`–`:815` | the replay's floor (`store.born = store.capture_register()`), then `Ok(store)` |

**AND THE STEPS ARE STEPS OF A CONSTRUCTION THAT PERFORMS NO CONSTRAINT ACT AT ALL.** The list is validated at 4-bis and **evaluated nowhere in this function**: `let _pairs = construction_constraints(constraints)?;` yields a Vec that **no later line of `storeCreateWithConstraints` reads** (`:717` binds it as `_pairs`; the function ends at `:815`). **The store cannot evaluate a constraint, and says so — `src/lib.rs:12`–`:17`: *"The listener's ORDER, its CALLBACK INVOCATION and a throwing body are still not this unit's: **the store RETURNS the triggered listeners' handles and INVOKES NOTHING**"*.**

#### (ii) WHERE THE CONSTRAINT ACT ACTUALLY HAPPENS — the package's act order in `bindings/js/index.mjs`'s `storeCreate`

**The construction's constraint checking is the PACKAGE's act, performed AFTER the addon call returns** — and therefore **after the boot**, which is the fact the request's first premise turns on:

1. `bindings/js/index.mjs:183` — `const batch = admittedConstraintBatch(cfg);` (step 2's member checks; `B-1`/`B-2`/`B-3`, `frame.mjs:245`–`:342`).
2. `bindings/js/index.mjs:186` — `id = addon_.storeCreate(encoded);` — **the whole Rust construction, boot included.**
3. `bindings/js/index.mjs:1625` — `installRegistrationSave(instance, state);` — *"the construction's batch arming walk below reaches `K-1` BEFORE either of those two seams runs"*.
4. `bindings/js/index.mjs:1654`–`:1661` — **the batch walk:** `for (let i = 0; i < batch.length; i += 1) { try { carryConstraint(state, instance, batch[i].addresses, batch[i].id, batch[i].constraint); } catch (refusal) { registrationCrossing(refusal, batch[i].addresses[0]); } }`.
5. `bindings/js/index.mjs:1695`– — **`cfg.listeners` applied afterwards through the store's own `listen`**, and the mirror written with `{key, handle}` and no function.

**SO THE STATE A BATCH BODY IS ASKED AGAINST IS THE BOOTED STATE.** The batched evaluation runs at `:1654`, after `:186`'s construction has loaded the file's admitted keys at `Tier::File` — which is why `§19.4`'s `C2` reads `[seed]` as `"stand"` and `[i]` as `"repaired"` at the same instant, and why the request's *"it changes the existing data state"* describes a state the check already sees.

**AND THE BATCH IS NOT ONE ACT:** each element reaches `carryConstraint` in its own `try` (`:1654`–`:1661`), each registration opens its own synthetic attempt and its own close, and each close owes **one save per registration** and a rollback **over everything its own route landed** (`kernel-registration.mjs:905`–`:912`, `:952`–`:965`). **There is no "the creation's commit" in the tree.**

#### (iii) THE REGISTRATION INSTANT — `bindings/js/src/entry/kernel-registration.mjs`

- **the scope, at its own words** (`:229`–`:232`): *"the kernel EVALUATES THAT ONE CONSTRAINT AGAINST THE STORE'S CURRENT STATE, ONCE, BEFORE THE HANDLE IS RETURNED.** The scope is THAT ONE PAIR and no other: no pass is opened over the registry and no other registered pair is re-evaluated."*
- **the pair-application rule is read first** (`:360`): `if (pairApplication(store, address) !== PAIR_APPLICABLE) return null;` — with `:341`–`:342`: *"**A PAIR WHOSE PARENT DOES NOT RESOLVE IS SKIPPED AT EVERY REGISTRATION INSTANT** — construction, a boot over an existing `filePath`, `addConstraint` and a re-arm alike"*.
- **the body is invoked at the registration's own commit** (`:366`, `:384`–`:393`), and **the repair flow follows** (`:398`–`:408`): a non-`true` outcome carrying a `repair` reaches `registrationAttempt`, *"on the synthetic attempt `3-bis` (a) declares — **the attempt of THIS commit, holding THIS list by reference** (`D-53`)"*.
- **the close** is `closeRegistrationAttempt(kernel, attempt, landed, outcome = 'failed', purged = null)` at **`:928`**; its passing arm names the last `file`-tier landing to the instance's save channel (`:930`–`:950`), its refusing arms compose a rollback (`:951`–`:965`), and it then publishes the report and drops the handoff (`:966`–`:992`).

#### (iv) **THE NO-DELIVERY CLAUSE — `PIN-6` (v)**, `bindings/js/src/entry/kernel-registration.mjs:510`–`:512`

> **"IT RUNS NO PASS OF ITS OWN** (`PIN-6` (v)): it appends no `constraint-check` entry, no `outcome` entry and no terminal act, **delivers no listener**, and opens no attempt — **the pair is judged by the registration's own re-run over the op it landed** (`PIN-7` (iii))."

**AND THE CLOSE'S OWN DOCBLOCK SAYS THE SAME AT THE SIBLING SITE** (`:888`–`:893`): *"**IT STILL OPENS NO `K-2` AND STILL DELIVERS NO LISTENER** — and it REACHES the per-op rollback composition on its FOUR REFUSING arms and the SAVE on its passing one, both from 2026-11-02"*.

**THE BYTE THAT MAKES THE CLAUSE A FACT RATHER THAN A DECLARATION:** the whole module contains **no `deliver` call**. A search for `\bdeliver\s*\(` over `bindings/js/src/entry/` returns exactly three sites — `delivery.mjs:105` (the definition, `export function deliver(state, triggered, triggeringAddress)`), `delivery.mjs:880` (the terminal arm's own call), and `constraints.mjs:3037` (the reversal's judgement's call, `D-117`). **`kernel-registration.mjs` reaches neither.**

#### (v) `strata/research.md §13.2`'s row `C-12`, unchanged in its claim

`strata/research.md:471`:

> | `C-12` | a registration reaches no terminal arm and no delivery seam | **VERIFIED at the bytes** | `kernel-registration.mjs`'s `closeRegistrationAttempt` (`:812`–`:840`), its own clause; the synthetic attempt's close performs no store act |

**THE RANGE IS STALE** (the close stands at `:928`; see `A-6`), **and the evidence column's SECOND half — *"the synthetic attempt's close performs no store act"* — is now FALSE, because `D-106`/`D-107` gave that close the save and the rollback composition** (`:930`–`:965`). **The claim's FIRST half — no terminal arm, no delivery seam — is UNMOVED and is re-verified at (iv) above.**

#### (vi) **`DD-38` — the zero-registration boot**, `docs/specs/storeroom-native/contract.md:563`

> **"THE HOME IS INSTANCE-SCOPED AND SESSION-SCOPED AND IS OUT OF THE `file` BYTES AND OUT OF THE JOURNAL**: a registration is **not** a `write` and **is not** a `delete`, so it appends no entry (`§6.1`'s two tracked verbs stand); **the home is not serialized into `cfg.filePath`**, so a fresh `storeCreate` over an equal path **loads no registration** and the boot's shipped answer — *"nothing is watched"* — **stands for the listener surface too**; **a registration is dropped at PROCESS EXIT with `mem`**"

**AND ITS BOOT CLAUSE IS RESTATED AT THE ITEM THAT READS THE FILE** — `contract.md:4072`: *"item 6's *"loaded if the file exists"* is read on a ZERO-LENGTH FILE: the content is the empty text, `0` register keys load, **`0` registrations load**, and NO code is produced."*

#### (vii) **`Store::boot_load`, and the load-instant walk that was DELETED `2026-11-02`** — `D-90` (5), carried as `PIN-5` (i)

`src/store.rs:1675`–`:1684`:

```rust
fn boot_load(&mut self) -> Option<usize> {
    let image = self.read_file_image();
    match image {
        FileImage::NoImage => None,
        FileImage::Refused => Some(0),
        FileImage::Members(members) => Some(self.install_file_image(&members)),
    }
}
```

**The function performs the load and nothing else.** It mints each admitted member at `Tier::File` (`install_file_image`, `:1719`–`:1727`) and **populates no home, asks no pair and evaluates no constraint.** `:1652`–`:1654`: *"the boot loads the `file` tier's content if the file exists — **step 7 of `§7.1`'s amended sequence, which produces `0` registrations (`DD-38`)**."*

**THE WALK THAT ONCE STOOD AT THE LOAD INSTANT IS GONE, AND ITS DELETION IS PRINTED AT ITS OWN SITE** — `src/store.rs:784`–`:787`:

> **"⟶ AND THE WALK ITSELF IS DELETED 2026-11-02 — `D-90` (5), CARRIED AS `PIN-5` (i) AND NOT NARROWED.** `RCA-8(g)` ANNOTATE-BESIDE: **every byte above stands BYTE-FOR-BYTE as the reading of its own dates and is read THROUGH this clause; what goes is the `if loaded.is_some() { for pair in &pairs { … } }` block that stood here, and this frame now proceeds to the replay's floor below unchanged.**"

with the ruling's own words beside it (`:789`–`:797`): *"Constraints that would be applied to an address that can't be walked to yet should be skipped … A constraint that can be walked to but doesn't exist … should be applied. This is a global rule, not a batch-only one"* — **so an unresolvable parent SKIPS its pair and no list-wide refusal stands for it** (`D-90`, `strata/decisions.md:4598`; its item 5 at `:4630`–`:4636`).

**SO THE TWO BINDINGS THE DELETION LEFT WITHOUT A READER ARE NAMED FOR WHAT THEY ARE** (`:807`–`:810`): *"`_loaded` still PERFORMS the load … and `_pairs` still PERFORMS the list's own shape validation, which is the arm that survives."*

#### (viii) **THE GUIDE'S `§6` SENTENCE ABOUT A BOOT** — `docs/guides/package-use.md:495`–`:499`

> "**Listeners fire on `write` and `delete`, and never on a read.** A read is not a change, and a store that fired on reads would fire on every render; **nor does a boot or any read-driven traversal fire a listener** (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/write-and-read.md §6.5`)."

**THIS IS THE CORPUS'S ONLY SENTENCE THAT NAMES THE BOOT AND A FIRING IN ONE CLAUSE, AND IT IS A CLOSED LIST OF TWO FIRING ACTS.** The request reverses it rather than filling a silence.

#### (ix) WHERE THE LISTENER STANDS AT THE INSTANT THE REQUEST NAMES

| the fact | the byte |
|---|---|
| the store's listener record closes at two members, and one of them is a token | `src/records.rs:253`–`:260`: *"the listener RECORD, CLOSED at `{ address, handle }`"*; `docs/specs/storeroom-native/contract.md:910` |
| the construction admits `{ address, handle }` and nothing else | `src/args.rs:302` — `ListenerEntry::Entry { address, handle } => {` — the arm reads the two fields and has no third |
| **the refusing byte for a third key** | `bindings/js/src/entry/frame.mjs:31`–`:32` — `const keys = Object.keys(entry); if (keys.length !== 2 \|\| !Object.hasOwn(entry, 'address') \|\| !Object.hasOwn(entry, 'handle')) {` |
| the function arrives only later, through `register` | `docs/specs/storeroom-js/surface.md:417`–`:424`, `:437`–`:444`; its answer is `undefined` (`:440`) |
| a construction answers an INSTANCE and no record, so it has no `triggered` member to deliver | `docs/specs/storeroom-native/contract.md:2799`–`:2803`; `surface.md:1650`–`:1651`: *"`triggered` CROSSES AS A JS ARRAY OF THE PACKAGE'S OWN HANDLES … in the two records the store's own contract declares (`WriteResult` and `DeleteReceipt`)"* |

**THE CONSEQUENCE, STATED AS A FACT ABOUT THE INSTANT AND NOT AS A RULING:** at the moment `storeCreate` asks a batch body and runs a repair, **every handle a `cfg.listeners[]` element named stands in the home with no body behind it.** *"fire listeners"* therefore names, at best, **an owed firing to a body that cannot exist yet** — the caller registers only after the instance is returned.

---

### §19.2 · The claims ledger

**Method.** Every arm below was read at the bytes of this tree at `HEAD` `3f24248`; the behavioural arms that cite `§19.4` are the **supervisor's** drives, carried as his. **Nothing in the tree was written by this pass.**

| # | claim | verdict | evidence |
|---|---|---|---|
| `A-1` | **a `storeCreate` carrying `cfg.constraints` ASKS each admitted element's body once, at that element's own address, before it returns** — the checking verb is shipped | **VERIFIED at the bytes** | `bindings/js/index.mjs:1654`–`:1661` (each element in its own `try` → `carryConstraint`); `kernel-registration.mjs:336`–`:389` (the pair-application predicate, then the context, then the invocation); the scope at `:229`–`:232`; `docs/specs/storeroom-native/contract.md §7.3` (a)(ii) at `:4235` |
| `A-2` | **the repair flow follows at the create** — a non-`true` outcome carrying a `repair` IS attempted, on a synthetic attempt of the registration's own commit, and its edit STANDS | **VERIFIED at the bytes, and MEASURED (`§19.4` `B1`, `C2`)** | `kernel-registration.mjs:398`–`:408`; the close `:928`; `contract.md §7.3` (b) `3-bis` at `:4250`–`:4258`, whose `(f)` reads *"AND DOES THE REPAIR'S OP LAND — YES. REGISTRATION IS A MUTATING ACT ON STATE 3"* |
| `A-3` | **the create's registration DELIVERS to no listener — the module contains no `deliver` call at all** | **VERIFIED for the delivery seam; `OPEN` for what the batch repair's own write record carried** | `PIN-6` (v) at `kernel-registration.mjs:510`–`:512`; the close's clause at `:888`–`:893`; the `deliver(` census — `delivery.mjs:105`, `:880`, `constraints.mjs:3037`, and no fourth site. **`OPEN`: neither driver reads the batch repair's write record's `triggered` member, so whether that set named the adopted handle is UNMEASURED here** |
| `A-4` | **a `cfg.listeners[]` element adopted at the create carries NO BODY, and no create-time firing is replayed into a later `register`** | **VERIFIED at the bytes, and MEASURED (`§19.4` `A3`, `B3`, `C5`)** | `src/records.rs:253`–`:260`; `src/args.rs:302`; `frame.mjs:31`–`:32`; `index.mjs:1695`– (the mirror takes `{key, handle}` and no function); `surface.md:437`–`:444`; the drives' three zeroes |
| `A-5` | **the refusing byte for a third key on a `listeners[]` element is the ENCODER, not `isLawfulListenerElement`** | **VERIFIED — CORRECTED ROW** | **the refusing byte is `bindings/js/src/entry/frame.mjs:31`–`:32`** (`keys.length !== 2` → `appendOwn(encoded, { bad: 'entry' })`, answered `AddressMalformed` on `listeners`), with `src/args.rs:302` as its Rust-side admission. **`bindings/js/src/entry/class-decision.mjs:1209`–`:1213` would ADMIT a third member**: it tests `isPlainObjectValue`, `Object.hasOwn` for the two members, a non-blank string handle and `inDomainAddress(entry.address)` — **and reads no key count at all** |
| `A-6` | **`strata/research.md §13.2`'s `C-12` is sound in its claim and STALE in its cited range, and its evidence column's second half is now false** | **VERIFIED — RANGE CORRECTED** | the close is `closeRegistrationAttempt` at **`kernel-registration.mjs:928`** (the row cites `:812`–`:840`, which is the re-run's body-throw arm); *"the synthetic attempt's close performs no store act"* is falsified by `:930`–`:950` (the save) and `:952`–`:965` (the composition). **The claim — no terminal arm, no delivery seam — is re-verified at §19.1 (iv)** |
| `A-7` | **`D-106`'s ARM 1 is at work at the create: the passing close saves the last `file`-tier landing, so a `file`-tier repair at the create is durable while a `mem`-tier one leaves the file as the exclusive create left it** | **VERIFIED at the bytes, and MEASURED (`§19.4` `B2` vs `C3`/`C4`)** | `kernel-registration.mjs:930`–`:950`, `lastFileLanding` `:1008`–`:1027` (*"A REGISTRATION THAT MOVED NO `file`-TIER DATA SAVES NOTHING AND IS ATTEMPTED ONCE FOR NOTHING"*, `:911`–`:912`); the exclusive create at `src/store.rs:718`–`:747`; `contract.md §10.4` part 3 at `:4830` |
| `A-8` | **the boot arm loads the file's admitted keys and NO registration, and the load-instant walk that once validated the supplied list is deleted** | **VERIFIED at the bytes, and MEASURED (`§19.4` `A2`, `C1`–`C2`)** | `src/store.rs:758`–`:761`, `boot_load` `:1675`–`:1684`; `D-90` (5) at `strata/decisions.md:4630`–`:4636` and the deletion clause `src/store.rs:784`–`:798`; `DD-38` at `contract.md:563`; `§7.2` item 6 at `:4072`; `C4`'s durability read |

**THE TWO CORRECTIONS THE GATE-1 PASS LANDED, AND THIS PASS RE-READ, ARE `A-5` AND `A-6`.** Both were verified by the supervisor at their bytes before that record was written, and both are re-verified here: **the carrier of the two-member rule is the encoder and not the JS predicate** (`A-5`), and **`C-12`'s range had outlived its bytes while its claim had not** (`A-6`).

---

### §19.3 · The collision census

**WHAT THIS TABLE IS.** Every decision row, contract clause, spec clause and guide sentence that **would stop being true** if the request were honoured as written — each with its site and its exact sentence. **A row whose verdict reads `STANDS` is carried because it constrains the request rather than because it collides with it, and the difference is printed rather than left to a reader.**

| # | the site | the sentence, verbatim | its verdict under the request |
|---|---|---|---|
| `X-1` | `strata/decisions.md:2730` · **`D-38`** | `DEF-W`: *"**A reversal must now be judged** — **at the state it leaves, never per unwinding step** (a per-step check is unsound: an unwinding composition passes through intermediate states no constraint would approve…). **A reversal whose terminal state violates a registered constraint FAILS and says so**"* (`:2747`–`:2752`) | **STANDS — and it is the corpus's one precedent for the shape the request reaches for**: a non-`write` act judged at the state it leaves. **`D-38` says nothing about a creation and names no delivery.** |
| `X-2` | `docs/specs/storeroom-native/contract.md:563` · **`DD-38`** | *"a registration is **not** a `write` and **is not** a `delete`, so it appends no entry (`§6.1`'s two tracked verbs stand)"*; and *"a fresh `storeCreate` over an equal path **loads no registration** and the boot's shipped answer — *"nothing is watched"* — **stands for the listener surface too**"* | **PARTLY STOPS.** The first sentence stops being true if *"creation as an editing action"* makes the create itself an act of that class (a journaled edit). **The second stands at the create** and would stop only if the BOOT were the creation being ruled on. **Two homes share the identifier and only this one bears on the subject — `D-38` is `X-1`.** |
| `X-3` | `strata/decisions.md:4598` · **`D-90`** | item 4: *"**THE RULE IS GLOBAL AND THE BATCH-ONLY READING IS WITHDRAWN.** Every instant that would apply a pair reads it: **the batch at construction**, **the list at a boot over an existing `filePath`**, **`addConstraint`**, **the toggles that re-arm a held pair**, and **the pass over a write, a `delete` or a `rollback`**"* (`:4626`–`:4629`) | **STOPS if *"all relevant"* means a sweep; STANDS if it means each supplied pair.** The five instants are a closed list and **a sixth is a new row's to open.** Its item 5 (`:4630`) already superseded the boot's list-wide refusal, and the deletion is at `src/store.rs:784`–`:798`. |
| `X-4` | `strata/decisions.md:4655` · **`D-91`** | item 1: *"**THE ARM IS THE WRITE ROUTE, AND THE TIMING DOES NOT MOVE.** The batch's evaluation stays where it is — at construction, and at a boot over an existing `filePath`. **The DEFERRAL arm is not taken**"* (`:4663`–`:4665`); item 4: *"**THE ROUTE IS READ AT EVERY REGISTRATION INSTANT, NOT AT CONSTRUCTION ALONE** — construction, a boot over an existing `filePath`, `addConstraint`, and a re-arm"* (`:4679`–`:4680`) | **STANDS, and it is a SUPPORT**: construction is already a registration instant, and the batch already runs after the boot (§19.1 (ii)). **What it does not name — and no clause anywhere names — is a DELIVERY at that instant.** |
| `X-5` | `strata/decisions.md:4780` · **`D-94`** | item 3: *"**A caller sees the difference only on the arm above:** the registration succeeds rather than refusing at rank `19`, and **the arm where the pair itself refuses again is untouched**"* (`:4798`–`:4802`) | **STOPS.** A delivery at the create is a **second** caller-observable difference on the registration arm, and this sentence declares the caller's view to be **only** the success-vs-rank-19 difference. |
| `X-6` | `strata/decisions.md:4861` · **`D-96`** | item 1: *"A pair is **SKIPPED exactly when its PARENT DOES NOT RESOLVE** … and **a parent that RESOLVES applies the pair, whether it resolves as a CONTAINER or as a LEAF**"* (`:4870`–`:4873`); item 4: *"a body that refuses refuses the registration — rank `19` `ConstraintRefusedAtRegistration`, `KC-5` where the refusing pair is the repaired one"* (`:4883`–`:4887`) | **PARTLY STOPS.** Item 1 **STANDS and constrains any *"all relevant"* reading** — a skipped pair's body never runs, so nothing of it can fire. Item 4 stops being the whole of that arm's answer if a delivery follows a refusal, because the row's only declared observable there is the refusal. |
| `X-7` | `strata/decisions.md:5300` · **`D-104`** | item 2: *"**The repair's write's listeners ARE delivered — in the COMMIT's delivery**, after the pass, with the other listeners"* (`:5314`–`:5316`) | **STOPS.** The row fixes **one** carrier — the commit's delivery — and the request asks for a second. **This is the row the request is closest to: it is the corpus's declaration that a repair's write's listeners are a real recipient set, reached at an instant the row did not name.** |
| `X-8` | `strata/decisions.md:5383` · **`D-106`** | item 3, arm 1: *"The registration's synthetic attempt closes **without reaching the terminal arm** (`kernel-registration.mjs`'s `closeRegistrationAttempt`, whose own clause says it *"reaches neither the per-op rollback composition nor the delivery seam"*)"* (`:5420`–`:5425`) | **STANDS for the delivery half and is STALE for the rollback half** — `D-107` item 1 gave the refusing arms a composition, and the build has it at `:952`–`:965`; the close is at `:928`, not where that row's clause stood. **The delivered half is the byte that says a creation fires nothing.** |
| `X-9` | `strata/decisions.md:5475` · **`D-107`** | item 1: *"**A REFUSAL ROLLS BACK** — the architect's words are unconditional and the defect is the standing edit, not the unsaved one"* (`:5494`–`:5501`) | **STANDS, and it is a SUPPORT**: an editing creation already undoes what it landed, per registration. **What it does not answer is what a fired listener observed before the rollback.** |
| `X-10` | `strata/decisions.md:5698` · **`D-111`** | item 3: *"the shipped sentence *"a failing pass performs no save at all"* is TRUE and stands"* (`:5723`–`:5727`) | **STANDS**: a compensating reversal is not an act and owes no save. **A create-time delivery would not move it.** |
| `X-11` | `strata/decisions.md:5749` · **`D-112`** | item 2: *"**SO `Store::rollback` DOES NOT SAVE, AND THE STORE'S `save_file_delta` CALL IS NOT THE REVERSAL'S CARRIER**"* (`:5766`–`:5769`) | **STANDS, and it is the ordering the request would inherit**: a save that ran before its judgement would have saved a state the judgement may refuse. |
| `X-12` | `strata/decisions.md:6005` · **`D-117`** | item 1: *"**A REVERSAL'S JUDGEMENT DELIVERS ITS BATCH — the reversal is not a check and its silence is REFUSED BY NAME**"* (`:6022`–`:6026`); item 2: *"**THE ORDER IS THE WRITE'S TERMINAL ARM'S, INSTANT FOR INSTANT**: **ask → repairs land → re-run → SAVE → DELIVER → the member's record**"* (`:6027`–`:6032`) | **STANDS, and it is the corpus's ONLY delivery outside a caller's write.** A creation's delivery would be the **second** such instant and would owe **the same order, instant for instant** — including *"**No delivery occurs on the throwing arm, on the failing arm, or where nothing was fired**"* (`:6031`–`:6032`). |
| `X-13` | `strata/research.md:471` · **`C-12`** | *"a registration reaches no terminal arm and no delivery seam \| **VERIFIED at the bytes** \| … `closeRegistrationAttempt` (`:812`–`:840`) … the synthetic attempt's close performs no store act"* | **STOPS for its first half** (the request asks for a delivery seam there); **its range is stale and its second half is already false** — see `A-6`. |
| `X-14` | `docs/specs/storeroom-native/contract.md:3959` · **`§7.1`** | the `cfg` block closes at `filePath` · `journalLength` (`:3961`–`:3967`); *"**any third key on `cfg`** \| **ignored**"* (`:3977`); *"**`cfg`'s member set is CLOSED at exactly the two declared keys** … so in a typed crate a third key is UNREPRESENTABLE"* (`:3987`–`:3989`) | **STANDS and CONSTRAINS**: *"treat creation as editing"* has **no config key to ride** at this contract. `surface.md:105`–`:109` says the same one layer up (*"the package still adds no default, no rename and no FIFTH key (`DD-36`)"*). |
| `X-15` | `docs/specs/storeroom-native/contract.md:4001` · **`§7.2`** | item 6: *"`0` register keys load, **`0` registrations load**, and NO code is produced"* (`:4072`); item 2: *"after every constraint of that write's triggered set has passed, and before ANY listener body of the delivered set runs, the surface performs the commit"* (`:4005`) | **STANDS for item 2's order and STOPS for item 6's zero if the boot becomes the ruled creation** (`DD-38`'s own sentence is the same fact at its own row). |
| `X-16` | `docs/specs/storeroom-native/contract.md:4349` · **`§8.1` item 16** | *"**A CONSTRAINTS VALIDATION FAILURE AT EITHER INSTANT — AT CONSTRUCTION / STARTUP, OR AT LOAD OF THE LOADED STATE AGAINST THE SUPPLIED LIST — ANSWERS THIS CODE AND THE INSTANCE IS NOT RETURNED**"* | **STANDS, and it exposes a GAP the request opens**: the closed set has **no member for a listener body's throw at a creation** — rank `18` `ConstraintBodyThrew` reaches the caller only where **the kernel marked** the value (`surface.md:2070`), and no delivery site exists at that instant to set a mark. |
| `X-17` | `docs/specs/storeroom-native/contract.md:4830` · **`§10.4` part 3** | *"**A successful exclusive create produces AN EMPTY FILE AND NO BYTE — the file's length is `0` and NO register key, NO journal entry and NO registration is committed**"* | **STANDS** for the create arm, and it is why `§19.4`'s `B2` reads `<zero-length>`. **It stops being the whole story on the arm where a batch repair lands** — `C3` measures bytes after the construction. |
| `X-18` | `docs/specs/storeroom-native/contract.md:4831` · **`§10.4` part 4** | *"**THE CONSTRUCTION'S ARGUMENT ORDER IS FIXED AS PART OF THIS AMENDMENT: EVERY ARGUMENT IS VALIDATED BEFORE THE CREATE** … the create is performed as the LAST act of the construction's ARGUMENT VALIDATION … **THE SEVEN-STEP ORDER IS NOT RENUMBERED**"* | **STANDS and CONSTRAINS**: nothing new may be validated after the create. **A constraint pass is not an ARGUMENT validation and already runs after it** (§19.1 (ii)) — so the request's *"check"* is on the legal side of this byte; its *"fire"* is not reached by it. |
| `X-19` | `docs/specs/storeroom-native/contract.md:4832` · **`§10.4` part 5** | *"**AND BECAUSE NO ARGUMENT IS VALIDATED AFTER THE CREATE (part 4), EVERY CONSTRUCTION THAT FAILS LEAVES NOTHING BEHIND: no file, no directory and no byte**"* | **STOPS as a guarantee over the whole act** if a fired body's throw can fail a `storeCreate` after the store exists — **the construction's own file and the saved repair's bytes would then stand behind a throwing `storeCreate`** (`C3`). |
| `X-20` | `docs/specs/storeroom-js/surface.md:23` · **`§2.1`** | *"**`cfg` carries the store's FOUR declared keys — `filePath` · `journalLength` · `listeners` · `constraints` — and the package passes each through WITHOUT adding a default, a rename or a fourth key**"* (`:25`–`:27`); `(d)`: *"the package still adds no default, no rename and no FIFTH key (`DD-36`)"* (`:105`–`:109`) | **STANDS**: no key exists for a creation-time firing switch, and the key set's closure is declared twice on this page. |
| `X-21` | `docs/specs/storeroom-js/surface.md:273` · **`§2.3`** | item 5: *"**so the trigger list names both kinds, and the KERNEL filters it: an element whose handle is a constraint's `id` is ASKED, a listener's is DELIVERED**"* (`:314`–`:315`) | **STANDS and is the mechanism a creation-delivery would have to reuse** — **and it requires a TRIGGER LIST, which a construction does not produce** (`contract.md:2799`–`:2803`; `surface.md:1650`–`:1651`). |
| `X-22` | `docs/specs/storeroom-js/surface.md:1648` · **`§2.7` item 7** | *"**WHERE THE WRITE WAS ISSUED THROUGH `commit` AND ITS ATTEMPT'S PASS IS RUN BY `runAttempt`, THE PACKAGE'S DELIVERY OF THE TRIGGERED HANDLES DOES **NOT** OCCUR INSIDE THE STORE VERB'S WINDOW: IT FOLLOWS THE PASS, AND ITS INSTANT IS THE PASS'S TERMINAL ARM**"* (`:1714`); item 2: *"**THE INVOCATION IS THE CALLER'S, AND THE PACKAGE PERFORMS IT AFTER THE VERB HAS RETURNED**"* (`:1652`–`:1653`) | **STOPS as a closed list of instants**: a create-time delivery would be a **third** instant, and item 7's is the terminal arm's. |
| `X-23` | `docs/specs/storeroom-js/surface.md:1908` · **`§2.12`** | `(iii)`: *"the BATCH is a CONSTRUCTION-TIME input — read at the store's two validation instants and NOT persisted — while the ADD route is a POST-CREATION act over the entry's own set"* (`:2042`); item 3: *"The state VIOLATES it and a repair DOES stand registered for the pair → THE SAME THROW AS (ii), **because the repair does NOT run at registration**"* (`:2064`) | **STANDS for `(iii)`'s construction-time character, and STOPS for the delivery question it does not face.** **`OPEN`: `:2064` is contradicted by `D-91` and `D-106` and by the supervisor's own `B1`/`C2` — the repair DOES run at registration on the add route and at the create.** Whether that sentence still governs any arm is **not resolved by this pass and is not this request's subject**; it is recorded so no later pass reads it as a live declaration. |
| `X-24` | `docs/guides/package-use.md:495` · **`§6`** | *"**Listeners fire on `write` and `delete`, and never on a read.** … **nor does a boot or any read-driven traversal fire a listener**"* (`:497`–`:499`) | **STOPS.** This is the one shipped consumer sentence the request reverses, and it names the **boot** explicitly. |

---

### §19.4 · The measurements

**WHAT THIS SUBSECTION IS, AND WHOSE THE WORK IS.** The drives are **the supervisor's**; their output is carried below **verbatim and unedited**, labelled as his. This pass could not run, re-run or extend one line of them (`§19.5`, item 1). **Everything this pass added is the reading of those outputs against the drivers' own source and against the bytes of §19.1.**

**THE DRIVERS.** `scratch/l0-probe/probe.mjs` (arm `A`, the boot over an existing file; arm `B`, a `mem`-tier repair at a create) and `scratch/l0-probe/probe2.mjs` (arm `C`, a `file`-tier repair at a create, written through the store's own `closeRegistrationAttempt` save), each constructing its stores through `storeCreate` from `bindings/js/index.mjs`, each under its own `fs.mkdtempSync` directory, and each reading the file **as bytes** (`fs.readFileSync`).

**THE OUTPUT, VERBATIM — THE SUPERVISOR'S:**

```
--- A: file to load -------------------------------------------
A1 file after a caller file write: {"a":1}
A2 boot read of [a]: 1 | listener fired during create: 0
A3 fired after register (still create-time history): 0
A4 fired after a caller write that reaches L: 1
--- B: constraint repairing nonexistent data ------------------
B1 create returned an instance; repair landed [b] = 7 | listener fired during create: 0
B2 file bytes after construction: <zero-length>
B3 fired after register: 0
B4 fired after a caller write that reaches LB: 1
--- C: file-tier repair at construction -----------------------
C1 file before the boot-with-constraints: {"seed":"stand"}
C2 in-memory [i] and [seed]: "repaired" "stand" | fired during create: 0
C3 file bytes after the construction: {"i":"repaired","seed":"stand"}
C4 a fresh instance over that path reads [i]: "repaired"
C5 fired after register: 0
C6 fired after a caller write that reaches LI: 1
```

**WHAT EACH ARM IS, AT ITS SOURCE — so the output's labels are not trusted as descriptions:**

| the line | the driver's bytes | what it did |
|---|---|---|
| `A1` | `probe.mjs:12`–`:14` | a first instance writes `['a']` at `file`; the bytes are read |
| `A2` | `probe.mjs:16`–`:23` | **the BOOT arm:** a second `storeCreate` over the same path, with `listeners: [{ address: ['a'], handle: 'L' }]` and `constraints: []`; the read answers the booted value; the counter `firedA` is printed |
| `A3` | `probe.mjs:24`–`:25` | `s2.register('L', …)` **after** the call, then the same counter — **it stays `0`: no create-time history is replayed into a body that arrives later** |
| `A4` | `probe.mjs:26`–`:27` | a caller's own `s2.write(['a'], 'mem', 2)` — the body fires, once |
| `B1` | `probe.mjs:31`–`:43` | **a batch constraint at `['b']`** whose body, on `undefined`, returns a repair writing `['b']` at **`mem`**; the create returns an instance and the repair's value stands in memory |
| `B2` | `probe.mjs:44`–`:45` | the file's bytes after the construction — **`<zero-length>`, which is the exclusive create's own image and NOT a lost save** (`§10.4` part 3): the repair moved no `file`-tier data, so `D-106`'s arm owes it nothing (`kernel-registration.mjs:911`–`:912`) |
| `B3` / `B4` | `probe.mjs:46`–`:49` | `register` after the create fires nothing; a later caller write that reaches `LB` fires once |
| `C1` | `probe2.mjs:11`–`:13` | a first instance seeds `['seed']` at `file` — *"so the file carries an image"* |
| `C2` | `probe2.mjs:15`–`:28` | **the boot-with-constraints:** a second `storeCreate` over that path carrying a pair at `['i']` whose repair writes **at `file`**; **the booted key `[seed]` and the repaired `[i]` stand at the same instant** — the check saw the loaded state |
| `C3` | `probe2.mjs` `:29` | the file's bytes after the construction — **`{"i":"repaired","seed":"stand"}`: the repair's `file`-tier landing was SAVED by the registration's passing close** (`D-106` arm 1) |
| `C4` | `probe2.mjs:31`–`:32` | **the durability check:** a fresh instance over the same path reads `"repaired"` |
| `C5` / `C6` | `probe2.mjs:34`–`:37` | `register` after the create fires nothing; a later caller write fires once |

**THE FOUR THINGS THE DRIVES MEASURE BESIDE THE REQUEST.** **(1)** A create carrying a batch **does check and does repair** — `B1` and `C2` are the two arms of the request's first two verbs, and neither needed a byte. **(2)** A repair's edit is durable **exactly when it moves `file`-tier data or a container** — `C3`/`C4` against `B2`, which is `D-106` arm 1 at the create and not a new rule. **(3)** The check runs against the **booted** state — `C2`'s `[seed]` stands while `[i]` is repaired. **(4)** Nothing is delivered anywhere near the creation — `A2`, `B1`, `C2`'s `fired during create: 0`.

**AND THE ONE READING THIS PASS REFUSES TO TAKE FROM THEM — `"listener fired during create: 0"` IS AN ABSENCE OF A BODY AND NOT AN INVOCATION COUNT.** **The counter the three lines print is a variable no function can increment at that instant:** `probe.mjs:16` declares `let firedA = 0` and `:24` is the only site that ever writes it; `probe.mjs:30`/`:46` and `probe2.mjs:15`/`:34` are the same for `firedB` and `fired`. **So the `0` is arithmetically forced whether or not a delivery was attempted, and a `0` from this driver cannot distinguish *"the delivery seam ran and found no body"* from *"no delivery seam was reached"*.** **A count of invocations would require a body registered BEFORE the create, and no lawful route puts one there** — the construction adopts handles (`src/args.rs:302`) and the function arrives only through `register` (`surface.md:437`–`:444`). **The `C-12`-class claim is therefore established at the BYTES (§19.1 (iv)) and NOT by these three zeroes.** The `A3`/`B3`/`C5` zeroes are a different and real measurement — **a create-time firing is not replayed into a later `register`** — because there the body does exist and the counter is live.

**WHAT COULD NOT BE MEASURED, AND WHY — EACH NAMED SO IT IS NOT READ AS MEASURED:**

1. **No arm was re-driven.** This pass held no shell. Every figure above is the supervisor's transcript, dated by his run and not by this note.
2. **`A-3`'s `OPEN` half — what the batch repair's own write record carried in `triggered`.** Neither driver reads the record `r.write(…)` returned inside a repair body. **So whether a create-time repair's write named the adopted handle in its own fired set is UNMEASURED.** It is the single fact that would separate *"a set existed and nothing delivered it"* from *"no set was ever computed"*, and **nothing in this note asserts which it is.**
3. **A refused registration at the create was not driven.** `D-107`'s rollback composition (`kernel-registration.mjs:952`–`:965`) and `D-118`'s creation-state regeneration run on that arm, and **no output above reaches it** — `B1`/`C2` are both passing arms.
4. **The `listeners[]` third-key refusal was not driven.** `A-5` is a byte reading of `frame.mjs:31`–`:32` and `src/args.rs:302`; **no drive in `scratch/l0-probe/` supplies a three-keyed element.**
5. **Multi-pair creates were not driven.** Both drivers construct **one** pair; the N-registrations-N-closes shape (`§19.1` (ii)) is a bytes reading only.
6. **`temp`-tier repairs and a `delete` inside a repair body at the create were not driven**; `lastFileLanding`'s third disjunct (`kernel-registration.mjs:1014`–`:1023`) is a bytes reading only.
7. **A fired body's throw at a creation has no arm to drive**, because no delivery site exists at that instant (§19.3 `X-16`).
8. **No `APP`-layer statement is made anywhere above**: nothing here was read from inside an Electron app or from a registry install.

---

### §19.5 · OPEN QUESTIONS — the record does not answer these, and this note supplies no default

**Each is put as the question the corpus leaves, with the bytes that make it a question and no answer. `P-2` holds a second, gate-1 list with defaults; THAT LIST IS THE GATE'S AND NOT THIS NOTE'S — nothing here carries a default, a recommendation or a preference.**

1. **THE SCOPE OF *"all relevant"*.** Does the phrase mean **each supplied pair asked once at its own address** (which is shipped, `A-1`), **a sweep over every registered pair**, or **also the pairs a repair's own write reached** (`D-104`/`D-105`'s landing mechanism)? The instant declares its own scope at `kernel-registration.mjs:229`–`:232` (*"THAT ONE PAIR and no other"*), and `D-90` (4) names five instants and no sixth (`strata/decisions.md:4626`–`:4629`). **The words do not choose, and the corpus does not.**
2. **WHICH ARM OF THE CONSTRUCTION IS *"the creation"*.** The exclusive-create arm changes no datum (`contract.md:4830`; `D-106`'s closing item: *"it changes no file-tier data and is out by that ground"*, `strata/decisions.md:5458`–`:5459`); the boot arm replaces state by a **load** (`src/store.rs:1675`; `§7.2` item 6); the batch arm edits by a **repair** (`A-2`). **The request says *"it changes the existing data state"* — of which arm, and does a boot count as a creation at all?**
3. **WHAT *"fire listeners"* MEANS WHEN NO BODY EXISTS.** At the instant named, every adopted handle stands with no function (`src/records.rs:253`–`:260`; `src/args.rs:302`; `surface.md:437`–`:444`). **Is the firing (i) deferred to the first `register` that fills a body, (ii) carried by a callable on the `listeners[]` element, (iii) declared to fire at the first later act that reaches the address, or (iv) not owed at all?** **Each answer moves a different declared surface, and the corpus declares none.**
4. **THE INSTANT, IF THERE IS ONE.** `D-117` fixed one order for a delivery outside a caller's write — *"ask → repairs land → re-run → SAVE → DELIVER"* (`strata/decisions.md:6027`–`:6032`) — and `§2.7` item 7 fixed the write's instant to the pass's terminal arm (`surface.md:1714`). **A creation's order is named nowhere**, and **`D-94` item 3 declares the caller's view of a registration to be the success-vs-rank-19 difference ALONE** (`:4798`–`:4802`). **Where in the create's order may a body run, if anywhere?**
5. **THE CALLABLE'S PROVENANCE, IF ONE IS ADMITTED.** The store's listener record is closed at two members and the encoder refuses a third key (`A-5`). **Is the function carried on the element (which moves the encoder, the element's declared shape and the arming point), on the store's record (which moves `src/records.rs` and `src/args.rs`), or nowhere?** **`D-26`/`D-27` moved exactly one key in this direction and the record says so at `frame.mjs:70`–`:74`; the request names none.**
6. **THE SEAT, IF ANYTHING IS HELD.** A deferred set must live somewhere until a `register` fills a body. **`D-58` item 2 bounds client-returned data to *"THE INSTANCE'S LIFETIME AND NOTHING LONGER, and within the instance it is THE OPEN COMMIT'S — not the closed one's"*** (`strata/decisions.md:3514`–`:3515`), and the registration's commit is **closed** at `closeRegistrationAttempt` (`:966`–`:992`, with `dropHandoff` at `:986`). **May a set survive the close at all?**
7. **WHAT A FIRED BODY'S THROW DOES TO A `storeCreate` THAT HAS NOT YET RETURNED.** `§10.4` part 5's *"EVERY CONSTRUCTION THAT FAILS LEAVES NOTHING BEHIND"* (`contract.md:4832`) is a guarantee about the file; **a body that throws after the store exists and after a `file`-tier repair was saved (`C3`) would leave both.** **Which value does the caller receive, and does the instance exist?** **No clause of this corpus states it for any non-write delivery instant** — `D-117` item 5 records only that a listener a reversal fires *"now runs before the member returns"* (`strata/decisions.md:6042`–`:6045`).
8. **IS THE BATCH ONE ACT OR N?** Each element gets its own registration, its own close, its own save and its own rollback route (`§19.1` (ii)). **A *"creation's"* rollback scope, save count and delivery set do not exist as objects in this tree.** **Does *"the creation"* name one act, or N?**
9. **WHETHER A REFUSED REGISTRATION FIRES ANYTHING.** `D-107` item 1 makes a refusal roll back; `D-117` item 2 leaves the throwing arm, the failing arm and the empty batch silent. **A create whose pair N−1 passed and whose pair N refuses has, on any reading, already run pair N−1's repair and saved its `file` bytes (`C3`). Does anything fire for it?**
10. **WHETHER THE GUIDE'S SENTENCE IS TO BE REVERSED OR THE REQUEST NARROWED.** `docs/guides/package-use.md:497`–`:499` is a **closed list of two firing acts naming the boot**. **A ruling here reverses a shipped consumer sentence; a narrowing here leaves the sentence intact.** **The two are not the same act and the record does not choose between them.**

**AND ONE FACT NO ANSWER REMOVES.** *"fire listeners"* names a recipient that **cannot exist** at the instant the request names: the handle arrives at the construction, the body arrives at `register`, and `register` answers `undefined` (`surface.md:440`). **So every shape of the third verb is either a deferred firing or a firing at a later act — never an invocation during the call.** **That is not a clause and not a ruling; it is the order of two acts.**

**FILES READ.** `src/{store,args,records,lib}.rs`; `bindings/js/index.mjs` (`storeCreate` `:130`–`:1766`'s construction region, the batch walk `:1654`–`:1661`, the listeners' `listen` pass `:1695`–); `bindings/js/src/entry/{kernel-registration,frame,class-decision,delivery,constraints}.mjs`; `bindings/js/src/{facade,crossing}.rs`; `docs/specs/storeroom-native/contract.md` (`§0.2` `DD-38`–`DD-40`, `§7.1`, `§7.2`, `§7.3`, `§8.1` #16, `§10.4` parts 1–7); `docs/specs/storeroom-js/surface.md` (`§2.1`, `§2.3`, `§2.4` items 5 and 9, `§2.7`, `§2.12`); `docs/guides/package-use.md` (`§6`, `§7.2`); `strata/decisions.md` (`D-38`, `D-58`, `D-90`, `D-91`, `D-94`, `D-96`, `D-104`, `D-106`, `D-107`, `D-111`, `D-112`, `D-117`); `strata/research.md` (`§13.2`, `§16`, `§17`); `strata/proposals.md` (`P-2`); `scratch/l0-probe/{probe,probe2}.mjs`; `scratch/l0-intake/creation-as-edit/proposal-section.md`.

---

### §19.6 · 1 · VERDICT

**`ESTABLISHED` — AND THE SUBJECT IS THREE-VALUED AT THE BYTES.** **The request's first two verbs — *"should check all relevant constraints (and subsequent repair flows)"* — ARE SHIPPED BEHAVIOUR AT THE CREATE, at one element per supplied pair and per registration, with the check made against the booted state (`A-1`, `A-2`, `C2`).** **The third — *"and fire listeners"* — has NO RECIPIENT at the instant it names and NO DELIVERY SEAM at any instant the construction reaches** (`A-3`, `A-4`, `PIN-6` (v), `C-12`). **`strata/decisions.md` holds NO ROW on the subject**: no row treats a creation as an editing act, and `D-106`'s rule reaches the create only because the batch's repair writes there. **The note decides nothing, and the request's third verb reverses one shipped guide sentence whatever shape it is given (`X-24`).**

### §19.6 · 2 · WRITE SET

**`strata/research.md` — this section, and no other byte of the repository.** **No code, no test, no declaration, no guide, no contract, no `strata/decisions.md` byte and no `strata/proposals.md` byte.** **This pass WROTE NOTHING: it held no shell and no write channel, and this section was returned to the supervisor as text.** **`scratch/l0-probe/{probe,probe2}.mjs` are the supervisor's and are not this note's to move.**

### §19.6 · 3 · FINDINGS (one line each)

- **`F-1`** The construction's numbered steps are `store.rs:675`–`:815`, and **no step of them evaluates a constraint** — the list is validated at 4-bis (`:710`–`:717`) and bound as `_pairs`, read by no later line.
- **`F-2`** The constraint act is the **package's**, at `index.mjs:1654`–`:1661`, i.e. **after** `index.mjs:186`'s `addon_.storeCreate` — **so a batch body is asked against the BOOTED state** (`C2`).
- **`F-3`** The repair flow follows at the create through `D-91`'s route, on a synthetic attempt of the registration's own commit (`kernel-registration.mjs:398`–`:408`), and it **lands** (`B1`, `C2`).
- **`F-4`** The registration instant **delivers nothing**, and carries a clause that says so in those words — `PIN-6` (v), `kernel-registration.mjs:510`–`:512`.
- **`F-5`** The whole of `kernel-registration.mjs` contains **no `deliver` call**; the three `deliver(` sites in the entry are `delivery.mjs:105`, `:880` and `constraints.mjs:3037`.
- **`F-6`** At the create every adopted handle **has no body**: the store's record closes at `{address, handle}` (`src/records.rs:253`–`:260`), the construction admits those two fields (`src/args.rs:302`), and the function arrives at `register` (`surface.md:437`–`:444`).
- **`F-7`** The create leaves the file **zero-length** on the exclusive-create arm (`contract.md:4830`; `B2`) and **saves a `file`-tier repair's image on the registration's passing close** (`kernel-registration.mjs:930`–`:950`; `C3`, `C4`).
- **`F-8`** A create-time firing is **not replayed** into a later `register` — `A3`, `B3`, `C5` all read `0` **with a live body already registered**, which is a real measurement and unlike the `fired during create: 0` lines.
- **`F-9`** **`"listener fired during create: 0"` is an ABSENCE OF A BODY and not an invocation count** — the counter has no writing site at that instant, so the zero is arithmetically forced.
- **`F-10`** The refusing byte for a third key on a `listeners[]` element is **`frame.mjs:31`–`:32`** (`keys.length !== 2`), **not `isLawfulListenerElement`** (`class-decision.mjs:1209`–`:1213`), which would admit a third member; `src/args.rs:302` is its Rust-side admission.
- **`F-11`** `strata/research.md:471`'s `C-12` cites `kernel-registration.mjs:812`–`:840`; **the close stands at `:928`** — and that row's evidence column's second half (*"the synthetic attempt's close performs no store act"*) **is already false** (`:930`–`:965`).
- **`F-12`** The guide declares **two** firing acts and names the boot in a non-firing clause — `docs/guides/package-use.md:497`–`:499`; **the request reverses a shipped sentence.**
- **`F-13`** The delivery the request reaches for **does not exist at any instant the create reaches**, and the corpus's only delivery outside a caller's write is `D-117`'s reversal, which fixed an order the create does not have.
- **`F-14`** `surface.md:2064` declares *"the repair does NOT run at registration"*, and **`D-91`, `D-106` and the drives contradict it** — recorded `OPEN` at `X-23` and resolved by nothing here.
- **`F-15`** `D-106` item 3's quoted clause *"reaches neither the per-op rollback composition nor the delivery seam"* **is half stale**: the composition is at `kernel-registration.mjs:952`–`:965` and the delivery half still stands.

### §19.6 · 4 · THE QUESTIONS FOR THE ARCHITECT

**Ten, `Q-1`…`Q-10` at §19.5, none carrying a default, none a recommendation, and none answered here.** **Their load-bearing four, in the order the corpus puts them:** **`Q-1` the scope of *"all relevant"*** (five named instants and no sixth, `D-90` (4)) · **`Q-2` which arm is *"the creation"*** (an empty file, a load, and a batch repair are three different acts at three different bytes) · **`Q-3` what a firing is when no body exists** (the fact no answer removes) · **`Q-7` what a fired body's throw does to a `storeCreate` that has not yet returned** (a value that would leave a created file and a saved repair's bytes behind a throwing call).

### §19.6 · 5 · WHAT THE NEXT GATE MUST HOLD

**On the bytes, before anything is scoped:** **the two corrections at `A-5` and `A-6`, re-read at `frame.mjs:31`–`:32` and at `kernel-registration.mjs:928`** · **`C-12`'s evidence column re-derived** (`F-11`) · **`X-23`'s `:2064` disposed of by name rather than read as live** · **and `D-106` item 3's half-stale parenthetical marked at its own cell** (`F-15`). **On the request:** **an answer to `Q-1` and `Q-2` before any shape is priced**, because the first moves which instants exist and the second moves whether there is an act at all. **On the instruments:** **a drive that reads the batch repair's write record's `triggered` member** (the one unmeasured fact behind `A-3`, and the fact that separates *"a set was computed and dropped"* from *"no set was ever computed"*); **a drive of a refused registration at the create** (`D-107`'s composition, never driven here); **a drive of a three-keyed `listeners[]` element**; **and a multi-pair create**. **On the prose:** **`docs/guides/package-use.md:497`–`:499` moves in the same pass as any ruling, whatever the ruling is**, and **`D-106` item 5 and `D-107` item 4 are the architect's two ordered departures from ANNOTATE-BESIDE — no layer may substitute the convention here.**

---

**SOURCE STATUS — NAMING THIS PASS'S CHANNEL LIMIT: `role_l0_research` held READ-ONLY FILE ACCESS AND NO SHELL, so NO DRIVER WAS RE-DRIVEN by this pass and every behavioural figure in §19.4 is either (a) a byte citation at `HEAD` `3f24248`, or (b) the SUPERVISOR'S transcript read against the drivers' own source (`scratch/l0-probe/probe.mjs`, `scratch/l0-probe/probe2.mjs`). Every one of §19.5's eight unmeasured items is unmeasured because this channel could not run a driver, and each is named so it is not read as measured.**

---

## §20 · The CJS entry request — a require condition for provident-storeroom (the exports map, the declared realm, and the runtime predicate)

**WHAT THIS FILE IS, AND THE RULE THIS SECTION IS FILED UNDER.** The intake note for one feature request received from a downstream project, filed under the intake rule that a note goes to `role_l0_research`. **IT DESIGNS NOTHING, RANKS NOTHING, DECIDES NOTHING AND OPENS NO UNIT.** It recommends no arm of the request's own predicate and answers no question the corpus already puts to the architect. What it does is narrower: it reads the declared surface the request would move at its bytes, it separates what was VERIFIED here from what is CARRIED, and it puts the questions back with the bytes that make each one a question.

**CHANNEL LIMIT, RECORDED FIRST BECAUSE IT GOVERNS EVERY VERDICT BELOW.** This pass held **no shell and no write channel** — four read-only file operations and nothing else. **So no driver was re-driven, no `node` invocation was made, `git status` could not be read, and this section was written nowhere: it is returned to the supervisor as text to land** (the file's own convention — `§19.5` item 1, `strata/research.md:1460`: *"No arm was re-driven. This pass held no shell."*). **Every behavioural statement below is either (a) a byte citation at `HEAD` `5cfb329`, or (b) marked CARRIED** — from the relay, the fork's filed request, the downstream records, or **this corpus's own cells** — and the difference is printed rather than left to a reader.

**⟶ LANDED 2026-11-17 BY THE L0 SUPERVISOR, FROM THIS PASS'S RETURNED TEXT.** The section below is `role_l0_research`'s returned text, landed by the supervisor because the pass held no write channel. The supervisor read the note at its `path:line` citations against `HEAD` `5cfb329` (clean tree; `git status` empty before landing), spot-checked the load-bearing sites — the manifest, `DD-4`/`DD-24`/`DD-38`, `§3.2`/`§9`'s `HO-1`, the eight cells, `D-6`/`D-7`, `constraints.mjs:86`, `brief.md:65`–`:67`, the shipped README/guide sentences — and corrected **ONE** evidence sentence: `K-15`'s grep line, from the pass's two named sites to the truthful reading (the grep returns ZERO hits). **No ruling is taken, no claim re-derived, and no other sentence of the returned text is changed.** The cell-level verification this corrected sentence belongs to: `grep -rn '20\.19\|22\.12'` over the tracked tree returns nothing; `RELEASE-NOTES.md:19`/`:58`, `bindings/js/package.json:3`–`:52`, `contract.md:580`, `:603`, `:617`, `:2365`, `:3383`, `:3923`, `constraints.mjs:86`, `blind-cjs-interop.test.mjs:84`/`:148`, `blind-installed-surface.test.mjs:553`/`:557`–`:561`, `staged-install/package-entry.test.mjs:150`–`:155`/`:333`, `blind-package-surface.test.mjs:158`–`:161`, `live-drive.mjs:851`, `:865`–`:869`, `tests/e2e/greens.mjs:1633`, `strata/decisions.md:449`–`:450`/`:565`/`:1002` all resolve at this `HEAD`; `docs/specs/storeroom-js/package.md` is confirmed absent (archive only). **The only modified byte after this pass is `strata/research.md`.**

**DATE:** 2026-11-17. **BRANCH:** `main`. **HEAD:** `5cfb3296eaa7baeafa08db58356bc8150b9bf436` — the supervisor's reading; this pass cannot run `git`. **THE PACKAGE MEASURED:** `provident-storeroom` `1.11.0` at `bindings/js/` in this checkout (`bindings/js/package.json:3`), whose built addon stands at the ignored path `bindings/js/build/Release/storeroom_js_binding.node` (a file that exists at that path, by glob this pass). **NODE:** `v24.20.0` — not measured here; carried from the workspace's statement and corroborated at a byte: `tests/e2e/staged-install/package-entry.test.mjs:153`, *"on the declared toolchain (Node `v24.20.0`)"*.

---

### §20.1 · The request, verbatim, and its provenance chain

#### (i) THE RELAY, VERBATIM (the whole subject of this note)

> Request from downstream Provident-Electron project:
>
> 1 · Upstream (provident-storeroom) — the only real fix. Add a condition to the exports map: "require": "./index.mjs" (or a default). Their acceptance predicate is the right one — boot the unmodified built main, zero fork bytes changed. Two caveats to add to the request: it only works where require(esm) is unflagged (Node ≥20.19/22.12), and it requires the module graph to be synchronous (no top-level await), because require(esm) cannot wait. This package qualifies today. We cannot make this change here — the packages are never modified (D-5, D-52); the fork's filed request is the correct vehicle, and our measurement now corroborates it.

**THREE THINGS THE RELAY OWNS, AND THIS NOTE TREATS EACH AS A CLAIM TO CHECK RATHER THAN A PREMISE:** the manifest's shape; the acceptance predicate; **"This package qualifies today"** — i.e. the synchronous-graph predicate.

#### (ii) THE FILED REQUEST — a fork's, `2026-11-16`

`/media/ryanr/Shared Files/Projects/Astrographer/docs/feature-requests/provident-storeroom-cjs-entry-request.md` (42 lines, read whole). Its own words, at its own sites:

- the need (`:8`–`:9`): *"A `require`-able entry — or a `default` condition — in the package's `exports` map, so a CommonJS Electron main bundle can load `provident-storeroom` the way it loads every other dependency."*
- the manifest as the fork measured it (`:15`–`:17`): *"`package.json` declares `"type": "module"` and `exports: { ".": { "types": "./index.d.ts", "import": "./index.mjs" } }`, with **no `main`, no `require`, no `default`**"*; *"A CJS `main.cjs` that `require`s it fails at load with **`ERR_PACKAGE_PATH_NOT_EXPORTED`**."*
- the workarounds, all measured and refused (`:18`–`:20`): *"a subpath import, a manifest shim, `createRequire`, `require.resolve`, and `--experimental-require-module` all fail; only an **absolute path** works, which is unlawful inside a shipped bundle."*
- **the silent-inline half** (`:21`–`:23`): *"**esbuild exits 0 and silently INLINES the ESM-only package** (measured: +2,667,936 B stripped, 15 package-path comments, `var import_meta = {}` in the bundle) when the `--external:` flag is omitted — a corrupt build that looks successful."*
- **THE ACCEPTANCE PREDICATE, THREE ARMS** (`:25`–`:35`): arm 1 — *"**`exports["."].require` → `./index.mjs`** (or a `default` condition). Measured: the fork's **already-built, unmodified `main.cjs` boots**, writes `{"display":{}}` to its profile, and the renderer arms — **zero fork bytes changed**"*; arm 2 — *"A published CJS build (`"main"` + `"require"` → a `.cjs` entry), if a dual build is preferred"*; arm 3 — *"A documented, supported statement that the package is ESM-only and that a CJS host must use a dynamic `await import()` seam — in which case a fork pays a Promise boundary across its store construction sites (18 files here)"*.
- its own evidence list (`:37`–`:42`).

#### (iii) THE DOWNSTREAM RECORDS — a consumer's, quoted as provenance only

- `Astrographer/docs/defects.md:33`, row **`STOREROOM-EXPORTS-MAP-IMPORT-ONLY`**: **"HIGH (PACKAGE) — OPEN, handed off; the fork's main cannot load the package"**; the four-part shape (symptom / reproduction / suspected root cause / *"**UPSTREAM, one line:** add `"require": "./index.mjs"` (or a `default` condition) to the exports map — measured to boot the fork's **unmodified** `main.cjs` with **zero fork bytes** changed"*); and its closing rule, *"**The package is NEVER patched here (D-9).**"*
- `Astrographer/docs/HANDOFF.md:241`–`:247`, the `2026-11-16` section: *"`provident-storeroom@1.11.0` ships an ESM-only exports map (`{types, import}`, no `main`/`require`/`default`), so this fork's CommonJS Electron main **cannot load it**"*.
- `Provident-Electron/strata/decisions.md:6301`–`:6315`, **`D-297`** (ACTIVE, `2026-11-16`), read whole: the symptom (`Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in …`), **the reproduction measured in that tree** — *"`node -e "require('provident-storeroom')"` answers exactly that error, while `await import('provident-storeroom')` succeeds"* (`:6305`) — the suspected root cause, the proposed fix shape, **the fork's green** (*"The fork measured that predicate green: its unmodified built main boots with the added condition and **zero fork bytes changed**"*), **its own second half** (*"Measured here on a two-line probe importing `storeCreate`: `213,948` bytes, fifteen package-path comments and a `var import_meta = {}` at exit `0`; the same probe with the flag emits `154` bytes"*, `:6307`), and its own refusal (`:6313`): *"the package is not patched (`D-5`, `D-52`); no `require` condition is authored anywhere in this tree"*.

#### (iv) THE PROVENANCE TENSION, STATED SO IT IS NOT CONFLATED

**The relay's `D-5`/`D-52` are the DOWNSTREAM project's rows, and this repository's `D-5` and `D-52` are different subjects entirely.** Read at their own bytes: `Provident-Electron/strata/decisions.md:99` — **`D-5` — A package finding belongs to the unit that surfaced it** (*"a defect or requirement gap in `provident-ssr` or `provident-storeroom` is still recorded with symptom, reproduction, suspected root cause and proposed fix shape, still upstream-owned, and the packages are still never modified"*, `:104`–`:106`) — and `:1153` — **`D-52` — Corrigendum to `D-5`** (*"a unit's record **stays live in `strata/records/`**"*). **This repository's `D-5` is `strata/decisions.md:370`, "the strata preset's test-role write scopes are kept" (`role_l1_test_writer` → `tests/e2e/`, `role_l2_test_writer` → `tests/integration/<module>/`, `role_l3_test_writer` → `tests/unit/<module>/`, `:387`–`:389`); this repository's `D-52` is `:3271`, "THE THREE ENFORCEMENT RULES ARE REFUTED BY MEASUREMENT".** **So the relay's authority to come upstream is the FILED REQUEST and this architect's fresh ruling — not a row of a consumer's register** (`Q-10`).

---

### §20.2 · The declared surface the request would move, at the bytes

#### (i) THE SHIPPED MANIFEST — `bindings/js/package.json` at `HEAD`, whole

| line | field | its value |
|---|---|---|
| `:3` | `version` | `"1.11.0"` |
| `:5` | `type` | `"module"` |
| `:24`–`:26` | `engines` | `{ "node": ">=18.0.0" }` |
| `:27`–`:32` | `exports` | `{ ".": { "types": "./index.d.ts", "import": "./index.mjs" } }` |
| `:33` | `types` | `"index.d.ts"` |
| `:34`–`:42` | `files` | `index.mjs` · `README.md` · `README.guide.md` · `RELEASE-NOTES.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs` |
| `:43`–`:49` | `optionalDependencies` | **five** names, each pinned `"1.11.0"` (`@auspicion/provident-storeroom-js-{linux-x64-gnu, linux-arm64-gnu, darwin-x64, darwin-arm64, win32-x64-msvc}`) |
| `:50`–`:52` | `publishConfig` | `{ "access": "public" }` |

**AND THE THREE ABSENCES THE REQUEST NAMES ARE ABSENCES AT THE BYTES:** **no `main`**, **no `require` condition**, **no `default` condition** — the whole map is the two conditions of `:28`–`:31`. **The request's quote of the manifest is TRUE of this checkout, field for field.**

#### (ii) THE ENTRY'S OWN HEADER — `bindings/js/index.mjs:1`–`:4`

```
// `provident-storeroom` — **THE CLAIMED REALM: Node ESM, ALONE** (`package.md §1.1`, `A70`).
//
// **THE ONE ARMS-BEARING ENTRY** (`package.md §1.3` item 1, `DD-24`) — the `exports` map publishes it and
// publishes nothing else: no wildcard, no deep import to the addon and no CJS arm (`§1.2`, `HO-1`).
```

#### (iii) THE LIVE OPERATIVE HOMES — `docs/specs/storeroom-js/contract.md`

- **`:3383` — the declared-surface row.** *"the package | ONE arms-bearing `exports` arm (the ESM one), no wildcard, no CJS arm, no `main`, no `.cjs`; `"engines": { "node": ">=18.0.0" }`; `AGPL-3.0` in `package.json`'s `license` and in `bindings/js/README.md`; the `5`-target prebuild matrix named in `optionalDependencies`; the addon documented as INTERNAL and as no entry point (`§3.1`–`§3.4`; `DD-24`, `DD-25`, `DD-38`, `DD-43`)"* — **the row the note's subject would move.**
- **`§3.1` at `:2279`–`:2283`** — the realm claim, stated so it can be falsified: *"**THE ARCHITECT'S RULING, VERBATIM: *"Node ESM"*** (`docs/specs/storeroom-js-proposal.md` `§15` · `A70`) … a consumer `import`s the package as an ES module … **the package reaches the addon INTERNALLY** — an addon being a CJS artefact, that internal reach is the package's own `createRequire`-style step and **is NOT a second claimed realm** (`DD-4`)."*
- **`§3.2` at `:2365` — the `HO-1` row: "Node CJS — a consumer that spells `require('…')`"**, whose *"Why it is unclaimed, at the carrier's own terms"* reads *"the carrier reaches JS through an addon that IS a CJS artefact, but `A70` claimed the ESM entry alone; a CJS consumer would need a second published arm"*, whose declared answer reads *"**the package publishes NO CJS arm and NO `require` entry** (`DD-24`, `DD-4`); a CJS consumer is served by the consumer's own ESM interop, which is the consumer's side of the boundary"*, and whose revisit condition reads *"a fresh ruling that claims CJS, followed by a bounded amendment"*.
- **`§9` at `:3923` — the same row in the handoff ledger**, with its owner and its positive revisit condition spelled out: *"a fresh ruling claiming CJS, recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of this directory"*; its OWNER cell: *"**the consuming project's own agents** (`A2`'s route)"*.
- **`DD-4` at `:580`** — pins *"the package's ESM entry reaches the `.node` addon through a `createRequire`-style internal shim, and the shim is NOT a documented, supported, second entry point"*; REFUSES *"a documented `require()` entry; a second `.node` load path; an `exports` map publishing a CJS arm"*; its alternative, priced: *"**publishing a CJS arm as a co-equal entry** — priced: it would make `require` a claimed realm, which `A70` did not claim, and it would oblige the CJS/ESM dual-package hazard's own clause; available with a fresh ruling"*; its reversal point: *"a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment"*.
- **`DD-24` at `:603`** — pins *"the package's `exports` map publishes EXACTLY ONE arms-bearing entry — the ESM one — and every other subpath a consumer could spell is either absent or an internal file the `exports` map does not expose"*; REFUSES *"a co-equal CJS arm; a deep-import path to the `.node`; a wildcard `"./*"` export"*; its alternative, priced: *"**a CJS arm beside the ESM one** — priced: it is a SECOND claimed realm, and `A70` claimed exactly one; available with a fresh ruling"*.
- **`DD-38` at `:617`** — *"the package declares `"engines": { "node": ">=18.0.0" }`, which is the floor the Node-API carrier's own version needs and not a floor this unit measures"*; REFUSES *"an unbounded engine floor; a floor justified by a measurement this pass did not take; an Electron-specific floor"*; its alternative, priced: *"**a higher floor (`>=20`)** — priced: it would exclude consumers the carrier itself serves, and the version is a declaration rather than a measurement; available with a bounded amendment"*.

#### (iv) THE ARCHIVED HOME, AND A CITATION DISCREPANCY THE CORPUS MAY OWE

**`docs/specs/storeroom-js/package.md` DOES NOT EXIST AT THIS `HEAD`** — a glob of `docs/specs/storeroom-js/*.md` returns exactly two files, `surface.md` and `contract.md`; the only `package.md` in the tree is **`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md`**. **Yet it is cited as a live authority by the entry, by the live contract and by the brief:**

- `bindings/js/index.mjs:1`–`:4` cites `package.md §1.1`, `§1.3` item 1, `§1.2`;
- `docs/specs/storeroom-js/contract.md:21` — *"the handoff rows are `HO-1`…`HO-7` (`package.md` `§2`)"*;
- `strata/brief.md:67` — the realm bullet's citation is *"(`docs/specs/storeroom-js/package.md §1`)"*, a path with no file at it;
- `docs/guides/package-use.md:147` cites the **archive** path for the same fact (`archive/pre-strata-docs-2026-10-24/…/package.md §1`–`§2`, *"archived"*) — so the shipped guide and the brief disagree about whether that document is live.

**THE ARCHIVED TEXT ITSELF, at its own bytes (read whole for `§1`–`§2`):**

- **`§1.1`, `:32`–`:36`** — *"**THE ARCHITECT'S RULING, VERBATIM: *"Node ESM"*** … the package reaches the addon INTERNALLY** — an addon being a CJS artefact, that internal reach is the package's own `createRequire`-style step and **is NOT a second claimed realm** (`DD-4`)."*
- **`§1.2`, `:44`–`:46`** — *"**THE ADDON IS A CJS ARTEFACT AND THE ESM ENTRY REACHES IT THROUGH THE PACKAGE'S OWN INTERNAL STEP** (`DD-4`). **There is exactly ONE `.node` load per instance construction, at exactly one path, and the path is a file the `exports` map does not expose.**"*
- **`§1.3` items 1–3, `:90`–`:96`** — *"**THE `exports` MAP PUBLISHES EXACTLY ONE ARMS-BEARING ENTRY — the ESM one** — **and every other subpath a consumer could spell is either absent or an internal file the map does not expose** (`DD-24`)"*; *"**A WILDCARD `"./*"` EXPORT IS REFUSED** … **a deep import is refused for the same reason**"*; *"**`import`ing the entry yields a namespace or default whose NAMED EXPORTS are exactly the verbs of `surface.md §2` and the package's own instance handle factory — and NOTHING ELSE.**"*
- **`§1.3` item 4, `:105`–`:107`** — the addon's five internal names.
- **`§1.4`, `:121`–`:122`** — *"**THE PACKAGE DECLARES `"engines": { "node": ">=18.0.0" }`** (`DD-38`). **The floor is a DECLARATION and not a measurement this pass took.**"*
- **`§1.5`, `:134`–`:136`** — *"**THE PACKAGE CLAIMS `{ Node ESM }` AND PROMISES NO OTHER REALM.** … **no clause of this package's documentation may describe an unclaimed realm as supported.**"*
- **`§2`, `:149` — the `HO-1` row** (identical in its declared answer to the live `§3.2` row above).
- **`§2`, `:161`** — *"**ARITHMETIC, PRINTED WITH ITS TERMS: `7` rows = `6` unclaimed realms (`HO-1`…`HO-6`) + `1` route (`HO-7`) — `6 + 1 = 7` ✓.**"*

**THE FACT, STATED AS A FACT AND NOT AS A FINDING OF THIS NOTE:** `HO-1`'s substance is live at `contract.md §3.2:2365` and `§9:3923`, while **its cited home is retired to the archive**; **the `package.md` citations at `index.mjs:1`–`:4`, `contract.md:21` and `brief.md:67` therefore point at a path with no file at it** — a citation question the owning pass may owe (`Q-7`'s neighbourhood, and see `§20.6`'s FINDINGS).

#### (v) THE SHIPPED CONSUMER DOCUMENTS THAT STATE ESM-ONLY

- **`bindings/js/README.md:3`–`:6`** — *"**THE CLAIMED REALM IS `{ Node ESM }` AND NOTHING ELSE** (`A70`, `package.md §1.1`): you `import` this package as an ES module from a Node runtime whose ABI carries a Node-API addon. **Every other realm is UNCLAIMED and each owes its declared answer** (`package.md §2`: Node CJS, Electron `main`, `preload` and `renderer`, the browser, `worker_threads` and any IPC route). **No other realm is described here as supported.**"*
- **`bindings/js/README.md:46`–`:48`** — *"**The `exports` map publishes EXACTLY ONE arms-bearing entry — the ESM one** (`package.md §1.3`, `DD-24`), and its whole content is: no wildcard export, no deep import to the addon and no CJS arm. **The addon is reached INTERNALLY by the package's own resolution step and is not an entry point.**"*
- **`bindings/js/README.guide.md`** — the landed copy of `docs/guides/package-use.md` (`README.md:17`–`:27`: *"that step copies its one authored home, `docs/guides/package-use.md`, byte-for-byte to this package's root as `README.guide.md`"*; both files read **2483 lines** this pass — **line-count only; the byte-for-byte equality is `scripts/publish.sh`'s assertion, which this pass did not run**).
- **`docs/guides/package-use.md:130`** — *"**Which realm you are in:** you must be in **Node ESM**. **No other realm is claimed** (§1)."*
- **`docs/guides/package-use.md:146`–`:149`** — *"**THE CLAIMED REALM IS `{ Node ESM }` AND NOTHING ELSE** … **Node CJS, Electron's `main`/`preload`/`renderer`, the browser, `worker_threads` and any IPC route are each UNCLAIMED** — the package's own readme enumerates them one by one and describes no other realm as supported."*
- **`docs/guides/package-use.md:2038`** — the installed-package table's `type` row: *"`module` — **the entry is ESM and there is no CJS arm**"*; **`:2041`** — the `exports` row: *"**ONE arm** — `"."` → `{ "types": "./index.d.ts", "import": "./index.mjs" }`"*; **`:2071`–`:2077`** — *"**★ THE `exports` MAP HAS ONE ARM, AND THAT IS A PROMISE ABOUT WHAT IS REACHABLE** … **There is no wildcard export, no deep import to the addon and no CJS arm**"*.
- **`bindings/js/RELEASE-NOTES.md:19`** — *"PUBLISH-NOTES-VERSION-LINE: THE VERSION THIS CHANGE LIST DESCRIBES IS `1.11.0`."*; **`:58`** — *"## §1.11.0 · a MINOR — the creation sweep: …"*. **The change list states no realm sentence and no module-system sentence** (a grep for `CJS|require|module system|realm` returns only `:60`, `:64`, `:82`'s constraint-list material and the version line). **AND ONE ABSENCE WORTH NAMING FOR `Q-2`'s ARM 3: no shipped document tells a CJS host to use a dynamic `await import()` seam** — `docs/guides/package-use.md` and `bindings/js/README.md` contain **no** `await import` / dynamic-import sentence at all (grep, zero hits in either file). **The corpus's declared answer to a CJS consumer is a *realm* sentence (`HO-1`), not a recipe.**

#### (vi) THE CORPUS'S **TESTED** REFUSAL — the cells that pin the map exactly

**These are the cells that would turn RED on any `require` or `default` condition. Every assertion below is quoted from its own bytes.**

| # | site | the assertion, verbatim | reads |
|---|---|---|---|
| `X-1` | `tests/e2e/blind-cjs-interop.test.mjs:84`–`:91` | *"THE ONE `exports` ARM CARRIES EXACTLY TWO CONDITIONS — `types` and `import` — and NO `require`, `node` or `default` condition stands anywhere in the map"*; `assert.deepEqual(Object.keys(MANIFEST.exports['.']), ['types', 'import']);` and `for (const condition of ['require', 'node', 'default', 'browser', 'worker', 'electron']) { assert.equal(condition in MANIFEST.exports['.'], false, \`the arm declares no ${condition} condition\`); }` | the **checkout's** manifest (`:44`, `readFileSync(join(PACKAGE_DIR, 'package.json'))`) |
| `X-2` | `tests/e2e/blind-cjs-interop.test.mjs:134`–`:150` | *"`HO-1` … THE DECLARED ANSWER FOR A `require` IS THE MAP'S REFUSAL: a CJS consumer's `require` of the name resolves NO arm, and the error is `ERR_PACKAGE_PATH_NOT_EXPORTED`"*; `assert.equal(printed, 'REFUSED ERR_PACKAGE_PATH_NOT_EXPORTED');` (`:148`) | a **consumer install** — `:62`–`:67` builds a temp `node_modules` and `symlinkSync(PACKAGE_DIR, …)` |
| `X-3` | `tests/e2e/blind-cjs-interop.test.mjs:93`–`:99` | *"`main` IS ABSENT: the package publishes no legacy entry"*; `assert.equal('main' in MANIFEST, false);` and `assert.equal(JSON.stringify(MANIFEST.exports).includes('.cjs'), false);` | the checkout's manifest |
| `X-4` | `tests/e2e/blind-installed-surface.test.mjs:557`–`:561` | `assert.deepEqual(Object.keys(exports['.']).sort(), ['import', 'types']);` · `assert.equal('require' in exports['.'], false, 'a CJS arm reached the one arm (\`HO-1\`)');` · `assert.equal('default' in exports['.'], false);` | **the packed tarball** — `:553` `entryManifest(site.bareTarball)` |
| `X-5` | `tests/e2e/staged-install/package-entry.test.mjs:333` | `assert.equal(PKG.exports['.'].require, undefined, 'no \`require\` arm is published');` (the `HO-1` row of `HO_ROWS`, `:331`–`:335`) | the staged install's manifest |
| `X-6` | `tests/e2e/blind-package-surface.test.mjs:158`–`:161` | *"its two conditions are `types` and `import`"*; `assert.deepEqual(Object.keys(arm).sort(), ['import', 'types']);` · `assert.equal(arm.import, './index.mjs');` | the checkout's manifest |
| `X-7` | `tests/e2e/live-drive.mjs:851`–`:852` (`LIVE-11.1`) | *"the `exports['.']` arms carry NO `require` arm — no CJS entry is published"*; `!Object.prototype.hasOwnProperty.call(dot, 'require')` | the checkout's manifest — a **reporting runner** (`D-21`) |
| `X-8` | `tests/e2e/greens.mjs:1633`–`:1634` (`JSG-12.5`) | *"no require arm is published: CJS is an UNCLAIMED realm"*; `!(arm && typeof arm === 'object' && ('require' in arm)) && !JSON.stringify(ex).includes('.cjs')` | the checkout's manifest — a **greens runner** |

**AND THE CELLS THAT READ THE MAP WITHOUT PINNING ITS CONDITION SET — so they would NOT move.** `tests/e2e/blind-package-surface.test.mjs:233` reads only `manifest.exports['.'].import`, `…['.'].types` and `manifest.types` (the allowlist-reachability cell, `:225`–`:237`); `tests/e2e/addon-adoption.test.mjs:1768` reads only `exports['.'].import` (to locate the entry whose source it then reads from the text), and `:2413` builds `exportedPaths` from `pkg.exports['.'].types` and `pkg.exports['.'].import` only, asserting at `:2416` that **no `exports` condition points into the artefact's own directory**. **A `require` condition naming `./index.mjs` would leave all three of those cells green** (byte-reading, not a run).

#### (vii) THE INSTALL-SHAPE RULING — which cells are `O3`'s, and the sentence that puts the map's assertion there

**`strata/decisions.md:422` — `D-6`**, whose architect's words are *"Use O3 for e2e publish-readiness, O4 for earlier tests"* (`:429`), and whose operative sentence for this note is `:449`–`:450`:

> **The `exports` map is therefore asserted where the install shape is assembled, and nowhere else** — which is also where `D-4`'s publish-shape evidence lives.

with the split criterion at `:447`–`:449` (*"a publish-readiness cell is one whose subject is *whether the package as shipped resolves and runs*, and it takes **`O3`**; every earlier cell takes **`O4`**"*). **`strata/decisions.md:553` — `D-7`** confirms the packaged-resolution claim is `O3`'s alone: *"**`R-2` IS CONFIRMED.** The packaged-resolution claim — *the name resolves through the `exports` map* — lives **exclusively in the `O3` set**. The earlier set claims **nothing about `exports`**"* (`:565`–`:568`).

**WHICH CELLS ARE THE INSTALL-SHAPE (`O3`) SET BY THAT CRITERION, at the bytes:** `X-2` (`blind-cjs-interop`'s consumer-install cell — a temp `node_modules`, a symlink, a child `node -e` from that root), `X-4` (`blind-installed-surface`, driving the **packed tarball**), `X-5` (`staged-install/package-entry`), and the `O3`-shaped limb at `blind-package-surface:156`–`:161` (which reads the checkout's manifest, not an install — **so its route tag is a question for the tagging pass, not a fact this note settles**). **`X-1`, `X-3`, `X-6`, `X-7`, `X-8` read the checkout's own manifest and are route-tagged by the cells' own history, not by this note** (`D-6` `:464`–`:466`: *"**Which cells are "publish-readiness"** … **L1 declares it** — L0 does not, and this ruling does not list them."*).

#### (viii) THE TYPE SURFACE — the staging, the two legs, and the fixture

- **root `package.json:8`** — `"typecheck:stage": "node -e \"…fs.copyFileSync('bindings/js/'+f,'typecheck/node_modules/provident-storeroom/'+f)\""` over `for (const f of ['package.json','index.d.ts'])` — **two files staged, and `index.mjs` is NOT one of them**; `:9`–`:10` run **two** legs: `tsc -p tsconfig.typecheck.json` then `tsc -p tsconfig.typecheck.nodenext.json`.
- **`tsconfig.typecheck.json:106`–`:107`** — `"module": "esnext"`, `"moduleResolution": "node10"`; **`:122`** — `"include": ["typecheck/**/*.ts"]`.
- **`tsconfig.typecheck.nodenext.json:66`–`:67`** — `"module": "nodenext"`, `"moduleResolution": "nodenext"`; **`:74`** — the same include.
- **`typecheck/consumer-fixture.ts:82`** — `import { storeCreate } from 'provident-storeroom';` — **the package specifier, never a relative path** (`:6`–`:10`, and the leg's own rationale at `tsconfig.typecheck.json:12`–`:20`).
- **the staged copy is a COMMITTED tree file** — `typecheck/node_modules/provident-storeroom/package.json` reads `1.11.0` with the same two-condition `exports` map (read whole, 53 lines) — **so the staged manifest is a second copy of the map, regenerated by `typecheck:stage`.**
- **root `package.json:4` sets `"type": "module"` for the whole repository**, so the fixture is in a module scope whose format is ESM on both legs.

**WHAT IS A BYTE FACT AND WHAT IS OPEN:** the `types` condition stands FIRST in the map's own key order (`package.json:29` before `:30`), the fixture reaches the package by name, and the staging copies the manifest that carries the condition. **Whether a third condition changes either leg's resolution is NOT MEASURED here** (`tsc` was not run; no TypeScript resolution was observed). Recorded as `Q-7` with its byte facts and **no answer**.

#### (ix) THE CORPUS ALREADY MEASURES THE MECHANISM — and it separates "the map refuses" from "require(esm) works"

**Two cells in this tree already speak to the request's mechanism, and they are the strongest byte-evidence the note can carry without a shell:**

- **`tests/e2e/live-drive.mjs:865`–`:869` (`LIVE-11.6`, a run *reported* by that runner, CARRIED here):** the runner computes `const cjsEntry = thrown(() => req(path.join(pkgDir, 'index.mjs')));` and asserts *"`require()` of the ESM entry succeeds through NODE'S OWN `require(esm)` interop and yields the SAME namespace the ESM import yields — its one remaining name, `storeCreate` — **the consumer's side, not a second published arm**"*, with `!cjsEntry.threw && Object.keys(cjsEntry.value).sort().join(',') === 'storeCreate'`. **So at the ENTRY'S OWN PATH, on the declared toolchain, the corpus already holds that a CJS `require` of this ESM entry loads** — the load path the request's arm 1 would reach by name.
- **`tests/e2e/staged-install/package-entry.test.mjs:150`–`:155`:** *"**A `require()` of the bare specifier is NOT asserted to throw**: on the declared toolchain (Node `v24.20.0`) the RUNTIME supplies `require(esm)` interop of its own, which is the consumer's own side of the boundary (`HO-1`) and not a published arm of this package."* **That comment is the corpus's own statement of exactly why `X-2`'s refusal is a MAP fact and not a loader fact** — the same distinction the request turns on.

**AND THE TWO CELLS DIFFER IN SUBJECT, WHICH IS THE WHOLE OF THIS INTAKE: `X-2` refuses because no condition names an arm for a `require`; `LIVE-11.6` loads because the path bypasses the map. The request asks for the first to be given a condition, not for the second to be changed.**

#### (x) THE PACKAGE'S OWN GRAPH — the files, and the one `require(esm)` call already shipped

**THE ESM GRAPH THE ENTRY LOADS** — `bindings/js/index.mjs` (:79–:83 Node builtins; :85–:95 the package's own) plus **13 modules** under `bindings/js/src/entry/` (`class-decision` · `carrier` · `refusal` · `artefact` · `kernel-commit` · `kernel-terminal` · `state` · `kernel-attempt` · `constraints` · `kernel-foundations` · `kernel-registration` · `delivery` · `frame`) plus the barrel `bindings/js/src/constraint-kernel.mjs` (4 lines, re-exporting `register`/`remove`, `commit`, `runAttempt`, `log`/`report`) — the figure `strata/brief.md:61` prints (*"`bindings/js/src/entry/` (13 files)"*).

**AND ONE SHIPPED CALL ALREADY DEPENDS ON REQUIRE-OF-ESM, WHICH THE REQUEST DOES NOT MENTION AND `Q-3` TURNS ON:**

- `bindings/js/index.mjs:96`–`:99` — `const require_ = createRequire(import.meta.url);` … `adoptModuleContext(import.meta.url, require_, ADDON_PATH);`
- `bindings/js/src/entry/artefact.mjs:13`–`:19` — `export let require_ = null;` … `require_ = requireBase;` (the entry's own module context, handed in, `I-29`)
- **`bindings/js/src/entry/constraints.mjs:86`** — `if (KERNEL === null) KERNEL = require_('./src/constraint-kernel.mjs');` — **a CJS `require` of an `.mjs` file**, lazy, on the first constraint act (`:77`–`:83`: *"**THE KERNEL, RESOLVED ON THE FIRST CONSTRAINT ACT AND NEVER AT LOAD** … the module is reached as a FILE"*).

**SO THE PACKAGE'S DECLARED `engines` FLOOR (`>=18.0.0`) AND ITS OWN KERNEL ROUTE ALREADY PART COMPANY AT ONE BYTE:** the kernel load is `require`-of-ESM, which is exactly the mechanism the request's caveat says is unflagged only at `≥20.19`/`≥22.12`. **What happens on Node 18 at that line is NOT measured here** (no shell; one Node version present) and is put as `Q-3` rather than asserted. **What IS a byte fact is that the shipped constraint path does not use `import()` anywhere** — a grep for `await` over every `.mjs` under `bindings/js/` returns **zero hits**, in the entry, the parts and the barrel alike.

#### THE COLLISION INVENTORY — nothing ranked, and every entry's own state

**THE CORPUS DOES NOT TREAT THIS AS AN UNKNOWN DEFECT. IT DECLARES THE REFUSAL *AND* PRICES THE ALTERNATIVE**, and the two are printed separately below so no reader collapses "this is forbidden" into "this was never considered".

| site | what it says today | its state |
|---|---|---|
| `docs/specs/storeroom-js/contract.md:3383` | *"ONE arms-bearing `exports` arm (the ESM one), no wildcard, no CJS arm, no `main`, no `.cjs`"* | **DECLARED SURFACE — would move** |
| `contract.md:580` · `DD-4` | refuses *"an `exports` map publishing a CJS arm"*; the alternative is *"available with a fresh ruling"* | **DECLARED REFUSAL + PRICED ALTERNATIVE** |
| `contract.md:603` · `DD-24` | *"EXACTLY ONE arms-bearing entry — the ESM one"*; the alternative is *"a SECOND claimed realm … available with a fresh ruling"* | **DECLARED REFUSAL + PRICED ALTERNATIVE** |
| `contract.md:617` · `DD-38` | the `>=18.0.0` floor; the alternative is *"a higher floor (`>=20`) … available with a bounded amendment"* | **DECLARED DEFAULT + PRICED ALTERNATIVE** |
| `contract.md:2365` · `§3.2` `HO-1` | *"NO CJS arm and NO `require` entry"*; revisit: *"a fresh ruling that claims CJS, followed by a bounded amendment"* | **DECLARED REFUSAL + POSITIVE REVISIT CONDITION** |
| `contract.md:3923` · `§9` `HO-1` | the same, with owner *"the consuming project's own agents"* and the revisit *"a fresh ruling … recorded as an ACTIVE `docs/decisions.md` row"* | **DECLARED + OWNED** |
| `archive/…/package.md:90`–`:96`, `:134`, `:149` | the same three cells at their retired home | **ARCHIVED AUTHORITY, CITED AS LIVE** |
| `bindings/js/README.md:3`–`:6`, `:46`–`:48` | *"No other realm is described here as supported"*; *"no CJS arm"* | **SHIPPED DOCUMENT — would move** |
| `docs/guides/package-use.md:130`, `:146`–`:149`, `:2038`, `:2041`, `:2071`–`:2077` (+ its landed copy `bindings/js/README.guide.md`) | *"you must be in Node ESM. No other realm is claimed"*; *"the entry is ESM and there is no CJS arm"* | **SHIPPED DOCUMENT — would move; the landing must move with it (`README.md:24`–`:27`)** |
| `strata/brief.md:65`–`:67` | *"The claimed realm is Node ESM and nothing else. Node CJS … are each unclaimed"* | **BRIEF — would move** |
| `X-1`…`X-8` (§20.2 (vi)) | eight assertions pinning the two-condition map, the absent `main`, and the refusal's error text | **TESTED REFUSAL — the RED set** |
| `strata/decisions.md` | **NO ROW** — a grep for `exports map` / `\bCJS\b` / `require arm` returns six hits and none rules on the map's conditions (`:144` the publish gate's `files` note, `:350` `D-4`'s non-reach, `:435`/`:440`/`:449`/`:565` the `O3`/`O4` route tags and `R-2`) | **NO RULING — so a fresh ruling is the only route either way** |
| `tests/e2e/staged-install/package-entry.test.mjs:150`–`:155` | *"A `require()` of the bare specifier is NOT asserted to throw … the RUNTIME supplies `require(esm)` interop of its own, which is the consumer's own side of the boundary (`HO-1`) and not a published arm"* | **THE CORPUS'S OWN DISTINCTION, already written down** |
| `tests/e2e/live-drive.mjs:865`–`:869` (`LIVE-11.6`) | *"`require()` of the ESM entry succeeds through NODE'S OWN `require(esm)` interop … the consumer's side, not a second published arm"* | **THE MECHANISM, ALREADY MEASURED AT THE PATH ROUTE** |
| `scripts/publish.sh:232`–`:282`, `:96`–`:109`, `:1191`–`:1229` | the version is generated into three shipped documents and asserted; **eleven version cells** move together (`1` main + `5` pins + `5` platforms); the main manifest must carry `"version"` exactly once | **RELEASE PAPERWORK — a manifest change touches the cut, not the map** |
| `docs/specs/storeroom-publish/contract.md:117` · `PUB-DD-9` | *"a PATCH re-cuts the tag and re-publishes the six; a MINOR adds a member to the declared surface or a target to the matrix and is a BOUNDED AMENDMENT of this contract; a MAJOR carries any change to the STORE'S closed set's carriage in the types or to the resolution rule's order"* | **CLASS RULE — and a `require` condition fits none of the three literally** (`Q-6`) |
| `bindings/js/index.mjs:96`–`:99`, `src/entry/artefact.mjs:13`–`:19`, `src/entry/constraints.mjs:86` | the package already requires an `.mjs` through `createRequire` | **A DEPENDENCY ON THE SAME MECHANISM — stated, not ranked** |

**AND THE SECOND HALF OF THE REQUEST — the silent-inline trap — HAS NO HOME IN THIS CORPUS AT ALL:** a grep of `docs/guides/` and `bindings/js/README*` for `esbuild`, `bundle`, or an externalisation sentence finds **nothing about a bundler inlining this package** (the guide's `§1` speaks of realms, tiers and refusals, `:142`–`:149`). **Where such a sentence could lawfully live is a QUESTION (`Q-9`), not a design, and nothing here proposes one.**

---

### §20.3 · The claims ledger

**METHOD.** `V-` = read at the bytes of this tree at `HEAD` `5cfb329`. `C-` = CARRIED (from the relay, the filed request, the downstream records, or this corpus's own driver/cell output which this pass did not run). `U-` = UNVERIFIABLE HERE (no shell / no network / no esbuild). **No claim below was measured by executing anything.**

| # | the claim | verdict | evidence |
|---|---|---|---|
| `K-1` | **the shipped manifest is as the request quotes it**: `type: module`, `exports["."] = {types, import}`, **no `main`, no `require`, no `default`**, `engines.node ">=18.0.0"`, version `1.11.0` | **VERIFIED** | `bindings/js/package.json:3`, `:5`, `:24`–`:26`, `:27`–`:32`, `:33`, `:34`–`:42`, `:43`–`:49` — quoted whole at §20.2 (i) |
| `K-2` | **the entry's own header states the realm claim and the one-arm/no-CJS rule** | **VERIFIED** | `bindings/js/index.mjs:1`–`:4` (quoted) |
| `K-3` | **the live contract declares the same surface, in one cell that names `no CJS arm` and `no main`** | **VERIFIED** | `docs/specs/storeroom-js/contract.md:3383` |
| `K-4` | **`DD-4` and `DD-24` forbid a CJS arm and price it as "available with a fresh ruling"; the reversal point is an ACTIVE `docs/decisions.md` row + a bounded amendment** | **VERIFIED** | `contract.md:580`; `:603` |
| `K-5` | **`DD-38` declares the `>=18.0.0` floor as a DECLARATION and prices "a higher floor (`>=20`)" as a bounded amendment** | **VERIFIED** | `contract.md:617` |
| `K-6` | **`HO-1` is live at `§3.2:2365` and `§9:3923`, and its cited home `package.md §2` exists only in the archive** | **VERIFIED** | `contract.md:2365`, `:3923`, `:21`; glob of `docs/specs/storeroom-js/*.md` → `surface.md`, `contract.md` only; `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md:149` |
| `K-7` | **`strata/brief.md` cites `docs/specs/storeroom-js/package.md §1` as a live authority at a path with no file** | **VERIFIED — a citation discrepancy** | `strata/brief.md:67` vs the glob above; the shipped guide cites the **archive** path for the same fact (`docs/guides/package-use.md:147`) |
| `K-8` | **eight cells pin the map's two-condition shape, the absent `main`, and the refusal's exact error text `ERR_PACKAGE_PATH_NOT_EXPORTED`** | **VERIFIED at the cells' own assertions** | `§20.2` (vi), `X-1`…`X-8`, each with `path:line` |
| `K-9` | **three cells read the map without pinning its condition set, and would stay green** | **VERIFIED at the bytes (not run)** | `blind-package-surface.test.mjs:225`–`:237`; `addon-adoption.test.mjs:1768`, `:2413`–`:2416` |
| `K-10` | **`D-6`/`D-7` place the `exports`-map assertion in the `O3` install-shape set and nowhere else** | **VERIFIED** | `strata/decisions.md:449`–`:450`; `:565`–`:568` |
| `K-11` | **the shipped ESM graph has NO top-level `await` — indeed no `await` token at all** | **VERIFIED at the bytes; NOT DRIVEN** | a grep for `await` over every `*.mjs` under `bindings/js/` returns **zero matches** (entry, 13 parts, barrel) — and the request's *"cannot wait"* predicate therefore has no byte in this package to bite (`Q-1`'s caveat, `§20.4`) |
| `K-12` | **the package's own kernel route already `require`s an `.mjs`** | **VERIFIED at the bytes; its RUNTIME behaviour on any Node is UNVERIFIED** | `bindings/js/src/entry/constraints.mjs:86`; `artefact.mjs:13`–`:19`; `index.mjs:96`–`:99`; the docblock at `constraints.mjs:77`–`:83` |
| `K-13` | **a CJS `require` of the ENTRY PATH succeeds on the declared toolchain through Node's own require(esm) interop, yielding `storeCreate` alone** | **CARRIED** — this corpus's own cell asserts it; this pass ran nothing | `tests/e2e/live-drive.mjs:865`–`:869` (`LIVE-11.6`) |
| `K-14` | **a CJS `require` of the BARE SPECIFIER is refused today with `ERR_PACKAGE_PATH_NOT_EXPORTED`** | **CARRIED** — asserted by a cell that builds a real consumer install; not run here | `tests/e2e/blind-cjs-interop.test.mjs:134`–`:150`; the downstream measures the same error at `Provident-Electron/strata/decisions.md:6305` |
| `K-15` | **require(esm) is unflagged only at Node `≥20.19.0` / `≥22.12.0` (and 23.x+)** | **CARRIED** — and **no byte of this repository carries that figure** | a grep for `20\.19|22\.12` over the tracked tree returns **ZERO hits**; the nearest bytes state the *declared toolchain* `v24.20.0` (`package-entry.test.mjs:153`) and the corpus's `require(esm)` interop cells (`live-drive.mjs:865`–`:869`), **neither of which states a floor** |
| `K-16` | **the package's declared floor (`>=18.0.0`) and require(esm)'s unflagged floor are different populations, and the package's own kernel route sits on the second** | **VERIFIED as two facts; the CONSEQUENCE on Node 18 is UNVERIFIED** | `bindings/js/package.json:24`–`:26` + `constraints.mjs:86`; `contract.md:617` (`DD-38`); `Q-3` |
| `K-17` | **arm 1's green — the fork's unmodified built `main.cjs` boots with the added condition and zero fork bytes changed** | **CARRIED** | filed request `:29`–`:31`, `:41`–`:42`; `defects.md:33`; `D-297:6305` |
| `K-18` | **the esbuild silent-inline trap** (a green build that inlines the package; the request's `+2,667,936 B`, `15` comments, `var import_meta = {}`; the downstream's `213,948` B vs `154` B) | **UNVERIFIABLE HERE** | `node_modules/` carries exactly one package (`typescript`) — **no esbuild**; no network; no shell. The two figure sets are the request's and the downstream's own measurements of **two different probes** and are not reconciled here |
| `K-19` | **no shipped document tells a CJS host to use a dynamic `await import()` seam** (so `Q-2`'s arm 3 is not shipped today) | **VERIFIED** — grep for `await import|dynamic import|import()` in `docs/guides/package-use.md` and `bindings/js/README.md` → **zero matches** | §20.2 (v) |
| `K-20` | **the `typecheck` staging copies `package.json` + `index.d.ts` only, and both legs resolve the package by specifier** | **VERIFIED at the bytes** | `package.json:8`–`:10`; `tsconfig.typecheck.json:106`–`:107`, `:122`; `tsconfig.typecheck.nodenext.json:66`–`:67`, `:74`; `typecheck/consumer-fixture.ts:82`; the committed staged copy `typecheck/node_modules/provident-storeroom/package.json` |
| `K-21` | **the relay's `D-5`/`D-52` are the DOWNSTREAM's rows, and this repository's rows of those ids are different subjects** | **VERIFIED** | `Provident-Electron/strata/decisions.md:99`, `:1153` vs `strata/decisions.md:370`, `:3271` |
| `K-22` | **this repository's register holds NO row on the map's conditions** | **VERIFIED** — six hits for `exports map|\bCJS\b|require arm`, none a ruling | `strata/decisions.md:144`, `:350`, `:435`, `:440`, `:449`, `:565` |
| `K-23` | **the request's error is not something else**: the corpus's own expected text is `ERR_PACKAGE_PATH_NOT_EXPORTED`, not `ERR_REQUIRE_ESM` and not `MODULE_NOT_FOUND` | **VERIFIED at the cell** (`:148`), **CARRIED as behaviour** | `blind-cjs-interop.test.mjs:148` |

**AND THE ONE CLAIM THE TREE REFUTES, STATED SO AGREEMENT IS NOT MANUFACTURED: NONE.** **The request's three checkable premises — the manifest's shape, the refusal's identity, and "This package qualifies today" (a synchronous graph) — all hold at this `HEAD`** (`K-1`, `K-8`/`K-14`, `K-11`). **The one fact that cuts against the request's implicit frame is not a refutation of it but a floor collision (`K-16`), and it is put as a question.**

---

### §20.4 · The drives — **this channel held no shell**, so no arm was driven

**WHAT WAS IMPOSSIBLE, SAID PLAINLY.** This pass held four read-only file operations. **It ran no `node`, no `require()`, no `tsc`, no `git`, and it could not create a temp directory or copy the package.** So **every behavioural arm of the request is either CARRIED (`K-13`, `K-14`, `K-17`) or OPEN (`K-18`, `K-16`'s consequence)** — and none is reported as measured.

**WHAT THE BYTES GIVE IN PLACE OF THE DRIVES, arm by arm:**

| the arm the note would have driven | what this pass can say instead | its verdict |
|---|---|---|
| **(1) CONTROL — `require('provident-storeroom')` with the manifest unmodified** | the corpus asserts the outcome **and its exact string**: `assert.equal(printed, 'REFUSED ERR_PACKAGE_PATH_NOT_EXPORTED')`, from a real temp consumer install (`symlinkSync(PACKAGE_DIR, …)`, a child `node -e`) | **CARRIED** (`blind-cjs-interop.test.mjs:134`–`:150`) |
| **(1-bis) CONTROL — `import('provident-storeroom')` succeeds** | the manifest's `import` condition names `./index.mjs`, which exists; and `blind-installed-surface.test.mjs:564`–`:571` drives the bare specifier from inside a consumer tree and asserts the namespace equals `NAMESPACE_NAMES` | **VERIFIED at the map; CARRIED as behaviour** |
| **(2) PROBE — the copy's map gains `"require": "./index.mjs"`, then `require` the name** | the mechanism is already asserted at the **path** route: `LIVE-11.6`'s `req(path.join(pkgDir, 'index.mjs'))` succeeds and yields `storeCreate` | **CARRIED** (`live-drive.mjs:865`–`:869`) — **but the map step itself was not driven** |
| **(3) PROBE — a minimal boot `storeCreate` + a mem write + a read** | the lawful call shape is documented and can be quoted rather than invented: `storeCreate({ journalLength: 256, listeners: [], filePath, constraints })` (`docs/guides/package-use.md:263`–`:268`), with `filePath` OPTIONAL (`:266`), and `store.write(address, tier, value, commit?)` / `store.read(address, tier?)` (`:277`–`:279`) | **NOT DRIVEN — no output exists** |
| **(4) THE `default` ARM — the same with `"default": "./index.mjs"`** | **no difference was observed by this pass, because nothing was observed.** The cells that pin the map (`X-1`, `X-4`) refuse `default` with the same hardness as `require` (`blind-installed-surface.test.mjs:561`), and `greens.mjs:1630` reads `arm.import ?? arm.default` when locating the ESM arm — **so the two arms are NOT interchangeable at the corpus's own instruments** | **OPEN — a fact about the cells, not a measurement of resolution** |
| **(5) NODE VERSION** | `v24.20.0`, **not measured here**; carried from the workspace and corroborated at `package-entry.test.mjs:153` | **CARRIED** |
| **the esbuild arm** | `node_modules/` holds `typescript` alone; no network; no shell | **UNVERIFIABLE HERE** (`K-18`) |

**AND THE DRIVES, PRINTED SO A PASS WITH A SHELL RUNS THEM UNCHANGED** — *these commands are NOT runs, they are the next gate's instrument, written down because a note that names an arm without naming how it would be driven leaves the next pass to re-invent it:*

```
# (1) CONTROL, manifest unmodified. Outside the repo; the package copied, never edited in place.
T=$(mktemp -d); mkdir -p "$T/node_modules"; cp -r bindings/js/{index.mjs,index.d.ts,package.json} \
  bindings/js/src bindings/js/build "$T/node_modules/" ; mv "$T/node_modules" "$T/pkg"   # assemble by hand
mkdir -p "$T/consumer/node_modules"; ln -s "$T/pkg" "$T/consumer/node_modules/provident-storeroom"
cd "$T/consumer" && node -e "require('provident-storeroom')"                       # expect ERR_PACKAGE_PATH_NOT_EXPORTED
cd "$T/consumer" && node -e "import('provident-storeroom').then(m=>console.log(typeof m.storeCreate))"

# (2) PROBE, the COPY's exports["."] gains the condition (the checkout's manifest is never touched).
#     then, from the same consumer dir:
node -e "const m=require('provident-storeroom'); console.log(Object.keys(m)); console.log(m.storeCreate && typeof m.storeCreate)"
node -e "const m=require('provident-storeroom'); const s=m.storeCreate({journalLength:8,listeners:[]}); s.write(['k'],'mem',1); console.log(s.read(['k'],'mem'))"

# (4) the default arm: repeat (2) with "default": "./index.mjs" instead of "require".
# (3)'s green would measure: the condition resolves; the graph loads synchronously under require (no
#     ERR_REQUIRE_ASYNC_MODULE); the addon loads through the entry's own createRequire(import.meta.url)
#     (index.mjs:96-99, artefact.mjs:232); and the store constructs.
```

**NO OUTPUT IS PRINTED FOR ANY OF THE ABOVE, BECAUSE NONE EXISTS.** `§19.5`'s convention is repeated here verbatim as this pass's own: *"This pass held no shell"* (`strata/research.md:1460`).

---

### §20.5 · OPEN QUESTIONS — the record does not answer these, and this note supplies no default

**Each is put as the question the corpus leaves, with the bytes that make it a question and no answer, no recommendation and no preference.**

1. **WHETHER THE FRESH RULING `DD-24` NAMES IS TAKEN AT ALL — may this package publish a `require` (or `default`) condition?** `DD-24`'s alternative cell says *"a CJS arm beside the ESM one — priced: it is a SECOND claimed realm, and `A70` claimed exactly one; available with a fresh ruling"* (`contract.md:603`); `DD-4`'s says *"available with a fresh ruling"* with the reversal *"a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment"* (`contract.md:580`); `HO-1`'s revisit condition says the same (`contract.md:3923`). **This repository's register holds no row on the subject (`K-22`). A note cannot take a ruling, and this one does not.**

2. **WHICH ARM OF THE ACCEPTANCE PREDICATE** — `require` → `./index.mjs`; `default` → `./index.mjs`; a published CJS build and a `main`; or the documented ESM-only statement (arm 3)? **AND DOES ARM 1 vs ARM 3 CHANGE WHAT `HO-1` MEANS?** Today `HO-1`'s declared answer is a *realm* sentence — *"a CJS consumer is served by the consumer's own ESM interop, which is the consumer's side of the boundary"* (`contract.md:2365`) — i.e. **arm 3's substance already exists as the package's declared answer, and what arm 3 adds is only the statement that the seam is *supported*** (*"a documented, supported statement …, in which case a fork pays a Promise boundary"*, filed request `:33`–`:35`); **arm 1 moves `require` from an unclaimed realm into a claimed one or into a supported workaround, and the corpus's own vocabulary distinguishes those** (`DD-4`'s price: *"it would make `require` a claimed realm"*). **Which the architect means is not settled anywhere.** And `K-19` is the byte fact beside it: **no shipped document carries the `await import()` seam sentence today.**

**⟶ `Q-1` AND `Q-2` ANSWERED 2026-11-17 BY `D-128`** (`strata/decisions.md`): *"Proceed with arm 1"* — the fresh ruling `DD-4`/`DD-24` name is TAKEN; the package publishes `"require": "./index.mjs"` (the ESM arm, a third condition, no `.cjs`); **arm 2 is refused and arm 3 is not taken**, so `DD-4`'s dual-package price and `DD-24`'s "SECOND claimed realm" price stay untaken. **The exact floor string, the cut class and `HO-1`'s post-arm-1 sentence remain OWED** (see `D-128`'s unsettled list); `Q-4`, `Q-5`, `Q-9`, `Q-10` stand open.

3. **THE `engines` FLOOR.** `"node": ">=18.0.0"` (`package.json:24`–`:26`; `DD-38`, `contract.md:617`) against require(esm)'s unflagged floor `≥20.19`/`≥22.12` (`K-15`, CARRIED — **no byte of this tree carries that figure**). **Does the floor move, does the condition carry a documented caveat, or does nothing move?** **AND THE FACT THAT SHARPENS IT: the shipped constraint path already calls `require_('./src/constraint-kernel.mjs')` (`constraints.mjs:86`) — an `.mjs` required through CJS** — so the package's *existing* surface already sits above the require(esm) floor on one route, whatever this request does. **What a `require` condition would answer on a Node below the floor (`ERR_REQUIRE_ESM` at the loader? the map's `ERR_PACKAGE_PATH_NOT_EXPORTED` still?) and whether that is better or worse for those consumers is UNVERIFIED HERE** — one Node version exists and this channel could not install another (`K-16`).

**⟶ `Q-3` ANSWERED 2026-11-17 BY `D-127`** (`strata/decisions.md`): *"Bump the floor, there's no backwards compatibility concerns"* — the floor is RAISED, `DD-38`'s carrier-only ground and its exclusion objection are WITHDRAWN, and the exact string is owed (see `D-127`'s unsettled item 1; no figure is named by the ruling). **`Q-1`, `Q-2`, `Q-4`–`Q-10` stand open.**

4. **THE SYNCHRONOUS-GRAPH PREDICATE AS A PERMANENT CONSTRAINT.** The request's second caveat is *"it requires the module graph to be synchronous (no top-level await), because require(esm) cannot wait"*, and its verdict is *"This package qualifies today"* — **true at the bytes (`K-11`: no `await` token anywhere in `bindings/js/**/*.mjs`)**. **If the condition lands, what keeps the graph from gaining a top-level `await` later, and where would that rule live?** **No such rule stands today** — the corpus's instruments pin the *manifest* (§20.2 (vi)) and the *whole-file* rewrites (`DEF-2026-10-02`), **not the graph's synchronicity**; `scripts/publish.sh`'s preflights read versions, tags, locks and shipped files, not module top levels. **A future `await` would silently convert a working `require` into `ERR_REQUIRE_ASYNC_MODULE`, and nothing in this tree would redden.**

5. **WHICH CELLS AND ROWS MOVE, AND WHO OWNS THE RE-DERIVATION.** The RED set on `require` is **`X-1`, `X-2`, `X-4`, `X-5`, `X-6`, `X-7`, `X-8`**; on `default` it is **`X-1`, `X-4`, `X-6`, `X-7`** (and `X-5`'s `require === undefined` cell would stay green — a `default` is not a `require`). **The rows that would move are `DD-4`, `DD-24`, `HO-1` (at `§3.2` and at `§9`), `contract.md:3383`, `§3.1`'s realm claim at `:2279`–`:2283`, the archive's `package.md §1.1`–`§1.5` and `§2` (annotate-beside, never rewritten), the shipped README/guide sentences, and `strata/brief.md:65`–`:67`.** **The doctrine puts a deliberate surface change's cells in the owning test pass's hands; the corpus's nearest instruments are `D-5` (`strata/decisions.md:387`–`:391` — `role_l1_test_writer` owns `tests/e2e/`, and every one of `X-1`…`X-8` lives under it) and `D-16` (`:1002`–`:1012` — a cell corrected *"inside the wave"* rather than carried as a red, with the executor named and the write walls stated).** **Whether the five `e2e` files' conditions are re-derived by `role_l1_test_writer`, by the landing pass, or by a wave, and whether the archived `package.md` cells get a read-through clause or stay as the archive's own date, is not decided here.** Recorded, not decided.

6. **THE VERSION CLASS AND THE RELEASE PAPERWORK.** `PUB-DD-9` (`docs/specs/storeroom-publish/contract.md:117`) declares three classes and **a `require` condition fits none of them literally**: *"a PATCH re-cuts the tag and re-publishes the six; a MINOR adds a member to the declared surface or a target to the matrix and is a BOUNDED AMENDMENT of this contract; a MAJOR carries any change to the STORE'S closed set's carriage in the types or to the resolution rule's order"*. **Is a new `exports` condition "a member of the declared surface" (`MINOR`), or a re-cut of an existing arm (`PATCH`)?** **And what does the paperwork require?** `scripts/publish.sh` generates and asserts **three** shipped version lines from the manifest (`:232`–`:282`), moves **eleven** version cells together (`:96`–`:109`), and refuses unless the main manifest carries `"version"` exactly once (`:1227`–`:1229`). **A manifest-only change still touches the cut; whether it needs a `RELEASE-NOTES.md` section, and of what class, is the architect's (`§1.11.0`'s own header is a `MINOR` on `D-126` item 3, `RELEASE-NOTES.md:60`).**

7. **THE TYPE SURFACE.** Do `typecheck/` staging, `tsconfig.typecheck.nodenext.json`, or `index.d.ts` need any re-read if the map gains a condition? **THE BYTES:** the `types` condition stands **first** in the map's key order (`package.json:29`); the staging copies `package.json` + `index.d.ts` and **not** `index.mjs` (`package.json:8`); the fixture imports by specifier (`consumer-fixture.ts:82`) in a repository whose root sets `"type": "module"` (`package.json:4`); the two legs are `node10` and `nodenext` (`tsconfig.typecheck.json:107`, `tsconfig.typecheck.nodenext.json:67`). **Whether any of that moves under a third condition is OPEN — no `tsc` was run.** **Is any CJS-typed consumer path affected? OPEN, and note that no CJS consumer of the *types* exists in this tree.**

8. **THE ACCEPTANCE STANDARD.** The request's predicate is *"boot the unmodified built main, zero fork bytes changed"* (relay; filed request `:29`–`:31`). **Is the upstream's acceptance the same predicate reproduced in a scratch consumer here — which this pass did NOT run (§20.4) — or a different standard?** And **is the downstream's green (their built `main.cjs`, `D-297:6305`) sufficient as CARRIED evidence for a ruling, or does the upstream re-measure it before any ruling?** **Nothing here decides which, and `K-17` is CARRIED rather than verified.**

9. **THE SECOND HALF — the esbuild silent-inline trap.** esbuild exits `0` and inlines this ESM-only package when `--external:provident-storeroom` is omitted (filed request `:21`–`:23`; the downstream measured the same class, `D-297:6307`). **Is documenting it here — in the shipped `README.guide.md` / `docs/guides/package-use.md`, or in the README — in scope of any upstream unit, or is it the consumer's own guide?** **Nothing in this corpus discusses bundling this package at all (§20.2's inventory, last row), and the package's own `HO-` set names no bundler realm.** **Where a warning could lawfully live is the question; this note proposes no home.** *(`K-18`: the figures themselves are UNVERIFIABLE HERE.)*

10. **THE PROVENANCE TENSION.** The relay derives its authority from *"the packages are never modified (D-5, D-52)"* — **the DOWNSTREAM project's rows (`Provident-Electron/strata/decisions.md:99`, `:1153`)**, whose obligation is that *"a defect or requirement gap … is still recorded with symptom, reproduction, suspected root cause and proposed fix shape, still upstream-owned, and the packages are still never modified"*. **This repository's `D-5` and `D-52` are unrelated subjects (`strata/decisions.md:370`, `:3271`).** **So the request's authority here is the FILED REQUEST plus this architect's fresh ruling — nothing in a consumer's register binds this tree, and nothing in this tree binds a consumer.** **Confirming that reading is the architect's; the note records the two registers side by side and chooses neither.**

---

### §20.6 · 1 · VERDICT

**`ESTABLISHED` — THE REQUEST'S PREMISE IS TRUE AT THE BYTES (the manifest, the error and the sync graph all read as the request states them), AND THE CORPUS DOES NOT OWE IT AS AN UNKNOWN DEFECT: IT DECLARES THE REFUSAL AND PRICES THE ALTERNATIVE "available with a fresh ruling", SO THE SUBJECT IS A FRESH RULING AND NOT A FIX.** **Three premises, three verdicts: the manifest is field-for-field what the request quotes (`K-1`); the refusal is tested with the exact error the request names (`X-2`/`K-23`); the graph is `await`-free and qualifies today (`K-11`).** **The surface the request would move is declared in five live places, shipped in four, tested in eight cells, and priced in three `DD` rows — and this repository's `decisions.md` holds no row on it (`K-22`).** **The note decides nothing; the one fact it adds that no party had stated is that the shipped constraint route already `require`s an `.mjs` (`K-12`) — which is why the `engines` floor question (`Q-3`) is sharper than the request's caveat makes it.**

### §20.6 · 2 · WRITE SET

**`strata/research.md` — this section, and no other byte of the repository.** **No code, no test, no declaration, no guide, no contract, no `bindings/js/**` byte (the manifest above all), no `docs/specs/**`, no `docs/guides/**`, no `strata/{decisions,proposals,envelope,brief}.md`, no `scripts/` and no `scratch/` byte.** **This pass WROTE NOTHING AT ALL: it held no shell and no write channel, `git status` could not be read, and this section was returned to the supervisor as text.** **No temp directory was created and no probe file exists anywhere.**

### §20.6 · 3 · FINDINGS (one line each)

- **`F-1`** The shipped manifest is exactly as the request quotes it — `"type": "module"`, `exports["."] = {types, import}`, **no `main`, no `require`, no `default`**, `engines.node ">=18.0.0"`, `1.11.0` (`bindings/js/package.json:3`–`:49`).
- **`F-2`** The entry's own header states the claim and the refusal in one place: *"THE CLAIMED REALM: Node ESM, ALONE"* … *"no wildcard, no deep import to the addon and no CJS arm"* (`index.mjs:1`–`:4`).
- **`F-3`** The live contract declares the same surface at `contract.md:3383` (*"ONE arms-bearing `exports` arm (the ESM one), no wildcard, no CJS arm, no `main`, no `.cjs`"*) and forbids it twice, in `DD-4` (`:580`) and `DD-24` (`:603`).
- **`F-4`** Both `DD` rows PRICE the alternative rather than leaving it unconsidered — *"available with a fresh ruling"*, reversal *"a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment"* — and `HO-1` carries the same positive revisit condition, twice (`:2365`, `:3923`).
- **`F-5`** **This repository's register holds NO row on the map's conditions** — six `exports`/`CJS` hits and none a ruling (`K-22`), so a change requires a new row and not the amendment of an old one.
- **`F-6`** The refusal is **tested with its exact error text**: `assert.equal(printed, 'REFUSED ERR_PACKAGE_PATH_NOT_EXPORTED')` (`blind-cjs-interop.test.mjs:148`), from a real consumer install (`:62`–`:67`).
- **`F-7`** **Eight cells pin the two-condition map** (`X-1`…`X-8`), and **three cells read the map without pinning its condition set** and would stay green (`K-9`) — so the RED set is bounded and enumerable before any ruling.
- **`F-8`** `D-6`/`D-7` put the map's assertion **in the `O3` install-shape set and nowhere else** (`decisions.md:449`, `:565`), and **`L1` owns which cells those are** (`:464`–`:466`).
- **`F-9`** **The graph is `await`-free**: a grep for `await` over every `.mjs` under `bindings/js/` returns zero, so the request's *"This package qualifies today"* is TRUE at the bytes.
- **`F-10`** **The corpus already measures the mechanism at the path route** — `LIVE-11.6` asserts `require()` of the ESM entry succeeds through Node's own require(esm) interop and yields `storeCreate`, *"the consumer's side, not a second published arm"* (`live-drive.mjs:865`–`:869`), and `package-entry.test.mjs:150`–`:155` states the same distinction in prose.
- **`F-11`** **The package's own kernel route already `require`s an `.mjs`** — `constraints.mjs:86`, `KERNEL = require_('./src/constraint-kernel.mjs')`, lazily, through `createRequire(import.meta.url)` handed in at `index.mjs:96`–`:99`. **The declared `>=18.0.0` floor and require(esm)'s unflagged floor are therefore already in tension on an existing route, and no document says so.**
- **`F-12`** **No byte of this repository carries the `20.19`/`22.12` floor** the request's caveat names (`K-15`), so that figure is CARRIED and would enter the corpus for the first time if a ruling used it.
- **`F-13`** **`docs/specs/storeroom-js/package.md` does not exist at this `HEAD`**, yet it is cited as a live authority by `index.mjs:1`–`:4`, `contract.md:21` and `strata/brief.md:67`; the only copy is the archive's, and the shipped guide cites the archive path for the same fact (`package-use.md:147`).
- **`F-14`** **No shipped document tells a CJS host to use a dynamic `await import()` seam** (`K-19`), so the request's arm 3 is not shipped today — its substance exists only as `HO-1`'s realm sentence.
- **`F-15`** **The second half of the request has no home in this corpus**: no shipped document discusses a bundler externalising this package at all, and no `HO-` row names a bundler — so a silent-inline warning is a real question and not an existing sentence to edit.
- **`F-16`** **The version machinery is not moved by a map change but is touched by any release**: three generated version lines (`publish.sh:232`–`:282`), eleven version cells (`:96`–`:109`), and `PUB-DD-9`'s three classes (`storeroom-publish/contract.md:117`) — **none of which fits a new `exports` condition literally** (`Q-6`).
- **`F-17`** **The `typecheck` staging copies two files and not `index.mjs`** (`package.json:8`), the fixture imports by the package specifier (`consumer-fixture.ts:82`), and the `types` condition stands first in the map's key order (`package.json:29`) — **the effect of a third condition on either leg is OPEN, not measured** (`Q-7`).
- **`F-18`** **The provenance tension is real and the ids collide across registers**: the relay's `D-5`/`D-52` are `Provident-Electron`'s (`:99`, `:1153`), this repository's are `:370` (test-role write scopes) and `:3271` (enforcement rules) — **and the filed request itself cites a third spelling, `D-9`, for the same "never patched" rule** (filed request `:3`; `defects.md:33`).

### §20.6 · 4 · THE QUESTIONS FOR THE ARCHITECT

**Ten, `Q-1`…`Q-10` at §20.5, none carrying a default, none a recommendation, none answered here.** **Their load-bearing four, in the order the corpus puts them:** **`Q-1` whether the fresh ruling `DD-24` names is taken at all** (the row says the alternative is *"available with a fresh ruling"*, and no ruling exists — `K-22`) · **`Q-2` which arm, and what arm 1 does to `HO-1`'s meaning** (a claimed realm vs a supported workaround; arm 3's substance already stands as `HO-1`'s declared answer while its *"documented, supported"* sentence does not exist — `K-19`) · **`Q-3` the floor** (`>=18.0.0` declared; require(esm) unflagged only at `≥20.19`/`≥22.12`; **and the package's own kernel route already requires an `.mjs`** — `F-11`) · **`Q-4` what keeps the graph synchronous afterwards** (nothing does today, and a future `await` would convert a working `require` into `ERR_REQUIRE_ASYNC_MODULE` with no cell to redden).

### §20.6 · 5 · WHAT THE NEXT GATE MUST HOLD

**On the bytes, before anything is scoped:** **the citation discrepancy at `F-13` disposed of by name** (`package.md` is archive-only; `index.mjs:1`–`:4`, `contract.md:21` and `brief.md:67` cite it as live) · **`F-11`'s kernel `require` read at `constraints.mjs:86` and put to the architect inside `Q-3`, not resolved by a pass** · **and `K-15`'s carried floor marked as carried wherever it is used**, because no byte of this tree supplies it.

**On the request:** **an answer to `Q-1` before `Q-2`**, because the first decides whether there is a subject at all; **then `Q-2` before any cell is priced**, because arm 1, arm 2 and arm 3 move three different surfaces (an arm, a build, a sentence) and only arm 1 reddens `X-2`.

**On the instruments:** **a drive of `§20.4`'s four arms, unchanged, in a temp tree outside the repository** — the control, the `require` probe, the minimal `storeCreate`/write/read boot, and the `default` variant — **because every behavioural claim in this note is CARRIED and none is measured**; **and a Node below the require(esm) floor** (an installable `18.x` or `20.18`) **if `Q-3` is to be answered by measurement rather than by argument**, since that is the one population where the request's caveat and the package's declared floor disagree.

**On the prose, if a ruling lands:** **the shipped sentences move in the same pass as the cells** — `bindings/js/README.md:3`–`:6` and `:46`–`:48`, `docs/guides/package-use.md:130`/`:146`–`:149`/`:2038`/`:2041`/`:2071`–`:2077` **and its landed copy `bindings/js/README.guide.md`** (the landing is `scripts/publish.sh`'s and is byte-asserted, `README.md:24`–`:27`), `strata/brief.md:65`–`:67`, and the live contract's `contract.md:3383` / `§3.1:2279`–`:2283` / `§3.2:2365` / `§9:3923` with `DD-4` and `DD-24` re-derived at their own cells — **while the archived `package.md` cells are ANNOTATE-BESIDE and are never rewritten** (`DEF-2026-10-02`, the convention the live contract states at `contract.md:2312`–`:2315`).

---

**SOURCE STATUS — NAMING THIS PASS'S CHANNEL LIMIT: `role_l0_research` held READ-ONLY FILE ACCESS, WITH NO SHELL, NO WRITE CHANNEL AND NO NETWORK.** **So `git status` was not read, no `node`, `tsc` or `esbuild` was run, no probe was created, and NOTHING WAS WRITTEN: this section is returned to the supervisor as text to land.** **Every claim in §20.3 is either a byte citation at `HEAD` `5cfb329` or marked CARRIED; the six arms of §20.4 are UNRUN and their commands are printed for the next pass rather than their outputs invented; and `K-18`'s esbuild half is UNVERIFIABLE HERE because `node_modules/` carries only `typescript`.**

---

## §21 · The intake question — does a write that lands the standing value fire a listener? (`2026-11-17` · `5cfb329`)

**THE REQUEST, VERBATIM FROM THE PRODUCT'S OWNER, `2026-11-17`:**

> "Change detection on writes so that 'writing' the current existing value at an address doesn't fire listeners (because nothing changed)"

**ITS INTAKE, AND BY WHOSE CALL.** A **feature request** from the product's owner, filed under the intake rule that a note or a
feature request goes to `role_l0_research`. **THE OWNER'S OWN INSTRUCTION ON ITS SHAPE: *"Mark, analyze as proposal, but do not
proceed to implementation."*** So this section **audits the record and does not design, scope, price or recommend**; the intake
verdict is `strata/proposals.md` · `P-3`, and **nothing here opens a unit, a pin or a contract directory.**

**PROVENANCE, AND ITS LIMIT — WHAT THIS SECTION OWES ITS READER.** Three sources, kept apart:

1. **A `role_l0_research` audit of this date** (read-only, no shell): **its returned text is landed here by the L0 supervisor**,
   because the pass holds no write channel. Every `path:line` it printed was **re-read by the supervisor at the bytes**, and **two of
   its sentences are CORRECTED at the sentence they correct** — `§21.1 (iii)` (the brief's *"and by nothing else"*) and `§21.3 (b)`
   (`save_owed`'s existence) — **both corrections found by `role_l0_critique` and verified here against the bytes.**
2. **A MEASUREMENT BY THE SUPERVISOR, `2026-11-17`** — the probe in `§21.7`, run by him, its two arms printed verbatim. It is **the
   only driven figure in this section and it is marked as driven at every site it appears.**
3. **`role_l0_validity` and `role_l0_critique`'s read-only passes of this date**, whose citations the supervisor re-read. Where a
   pass's reading is withdrawn it is **named and withdrawn**, never absorbed.

**AND ONE ENVIRONMENT FACT OF THIS SECTION'S OWN DATE, RECORDED SO A LATER READER DOES NOT READ THE FILE AS ONE PASS'S SUCCESSIVE
STATE: `strata/research.md` gained a DIFFERENT request's `§20` — the CJS entry request — at `11:18` today, while this request's
audit was in flight.** Both sections are uncommitted at this writing and **neither is swept into the other's record**: `§20` is that
pass's, `§21` is this one's.

---

### §21.1 · The firing rule the record declares, at its own bytes

**(i) THE OPERATIVE ROW — A UNIVERSAL OVER *EVERY SUCCESSFUL WRITE*, WITH TWO ARMS AND NO VALUE TERM.**
`docs/specs/storeroom-native/contract.md:3028`–`:3033`, `§5.8`'s `P-TP-8` row part **(a)**:

> "**(a) THE HANDLE SET IS EXACTLY THE TRIGGERED SET.** **After any successful `write` at address `X` with the write's tier `t`,
> `WriteResult.triggered` is EXACTLY the set of `handle`s whose registration stands at an address `W` that is a PREFIX of `X`
> (descendant-inclusive, `DD-18`) **or that the act TOUCHED** (`D-66`, 2026-10-29; `§6.5` item 3's second arm — the ancestor arm is
> unmoved and the touched arm is the operative widening), **and NO MEMBER is added and none omitted**"

**and its failure list at `:3149`–`:3150` names the omission as the row's own red:**

> "**Against the re-derived half, each new:** **a MISSING handle where a listener's address is a prefix of the write's**; **a handle
> returned where no listener's address is a prefix**;"

**SO THE QUANTIFIER IS `any successful write`, AND THE TWO ARMS ARE POSITIONAL (`PREFIX`) AND REACH-BASED (`TOUCHED`). There is no
third arm, no `tier` arm, and no value arm.**

**(ii) THE SELECTION RULE STATED AS A RULE.** `docs/specs/storeroom-native/contract.md:3674`–`:3676`:

> "**A registration is returned after a successful `write` or `delete` at `X` iff ITS ADDRESS IS A PREFIX OF `X` (as above) OR THE
> ACT TOUCHED ITS ADDRESS**"

and the archived authority (`archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-native/write-and-read.md:1438`–`:1440`,
`ARCHIVED` — cited as history and not as live law):

> "**AND THE PREFIX RULE DECIDES MEMBERSHIP AND NOTHING ELSE:** a listener bound at `W` is triggered by a successful `write` or
> `delete` at `X` **iff `W` is a PREFIX of `X`**"

**(iii) THE BRIEF'S EXCLUSION, AND WHY IT IS NOT THE STRONGEST BYTE.** `strata/brief.md:255`:

> "`triggered` membership is decided by address prefix and by nothing else"

**⟶ CORRECTED AT THIS LINE (`role_l0_critique` `C-17`, re-read here): THE SENTENCE IS ALREADY OUTSTRIPPED BY THE TREE.** The landed
predicate is **two** arms — `src/store.rs:3571`–`:3577`:

```rust
3571: fn registration_triggered(
3572:     registration: &[Segment],
3573:     address: &[Segment],
3574:     touched: &[Vec<Segment>],
3575: ) -> bool {
3576:     is_prefix(registration, address) || touched.iter().any(|path| path == registration)
3577: }
```

— and `contract.md:3030`–`:3032` carries the second arm as **operative**. **So the brief's *"and by nothing else"* overstates the
rule; `P-TP-8` (a) is the row that carries it, and it carries the touched arm beside the prefix arm.**

**(iv) THE CODE'S ONE SITE, AND THE INPUT IT IS HANDED.** `src/store.rs:2652`–`:2657`:

```rust
2652:        let touched = if self.home.is_empty() {
2653:            Vec::new()
2654:        } else {
2655:            self.touched_below(&segments, &captured, &doomed_tiers, Some(&value))
2656:        };
2657:        let watched = self.watched_for(&segments, &touched);
2658:        let triggered = self.triggered_for(&segments, &touched);
```

**THE TWO ARGUMENTS ARE THE ACT'S ADDRESS AND ITS TOUCHED SET AND NOTHING ELSE**, and `triggered_for`'s whole body is a filter over
the registration home (`src/store.rs:2183`, filtering at `:2200`–`:2207` on `registration_triggered(&listener.address, address,
touched)`).

---

### §21.2 · THE CONTRADICTION THIS AUDIT FOUND — the criterion is stated in CHANGE-TERMS and the predicate is not

**THIS IS THE SECTION'S LOAD-BEARING FINDING AND IT IS WHAT THE REQUEST'S FATE TURNS ON.**

**(i) THE ARCHITECT'S STATED CRITERION NAMES VALUE CHANGE.** `strata/decisions.md:3765`–`:3766` (`D-66`):

> "**IT COMPLETES `D-56` WITH THE DIRECTION IT LEFT OUT, AND THE CRITERION IS THE SAME ONE**: **a pair is asked when the act
> CHANGES THE VALUE AT THE PAIR'S ADDRESS.**"

restated inside the crate's own docblock for the predicate, `src/store.rs:3566`–`:3570`:

> "**THE TWO ARMS ARE ONE CRITERION AND NOT TWO RULES**: a pair is asked (and a listener told) when the act **CHANGES THE VALUE AT
> ITS ADDRESS** — the value read at a prefix contains its subtree, so a change anywhere below it moves it; **and a node the act
> CREATED OR PURGED has a value that changed, so its own registration is reached.**"

**(ii) AND `D-66`'s *CHANGE* IS COMPUTED FROM WHAT THE ACT CARRIED, NOT FROM WHAT STOOD.** `strata/decisions.md:3781`–`:3782`:

> "**The criterion is not "descendant", it is "TOUCHED"** — **and touched is computable from the act's kind and the value it
> carried.**"

carried into `touched_below`'s own clause, `src/store.rs:2247`–`:2254`:

> "**ITS TWO ARMS, EACH A PROPERTY OF WHAT THE ACT MOVED:** * **WHAT THE ACT WROTE** — `written`'s own path set below the act's
> address: an object contributes one path per own member name, an array one per index … * **WHAT THE ACT REMOVED** — every captured
> path whose ENCLOSING version was removed"

**(iii) SO THE RECORD HOLDS TWO SENTENCES ABOUT ONE PREDICATE AND THEY DISAGREE.** **The criterion says a firing is a value change;
the instantiation computes a reach with no value term at all** (`§21.1 (iv)`). **The request under intake is therefore not asking
the corpus for a new semantic: it is asking which of the corpus's own two sentences is true of the act it names** — which is why the
intake verdict is `BLOCKED-ON-SEMANTICS` on a **reconciliation** ground rather than on an absence (`P-3` §1). **A pass that files
this request as *"a feature the corpus never specified"* files it wrong, and sends its reader to design something the record already
declares.**

**(iv) THE PLACE THE TWO SETS' CONVERGENCE IS ITSELF RULED, AND WHAT IT COSTS A PACKAGE-SIDE SHAPE.** `strata/decisions.md:3861`:

> "**and the PASS becomes a FILTER over `triggered` rather than a walk over `kernel.pairs`** — **an element whose handle is a
> constraint's `id` is asked; a listener's is delivered.** **ONE PREDICATE, in the store, where the per-tier versions live.**"

with `:3863` (*"Restoring the registration makes the store's answer the only answer"*) and the same move recorded at the code's site,
`bindings/js/src/entry/kernel-attempt.mjs:638`–`:646` (*"**AND THE SET IS THE STORE'S OWN `triggered`, FILTERED — `D-69`,
2026-10-29. THIS LINE IS THE WHOLE OF THE MOVE.** … **NOW THE KERNEL COMPUTES NONE**"*). **So a second, package-side predicate
deciding who is actually INVOKED while the store still decides who is ASKED is the asymmetry `D-67` was filed on**
(`strata/decisions.md:3803`: *"A CONSTRAINT AT A TOUCHED DESCENDANT IS ASKED; A LISTENER AT THE SAME ADDRESS IS NEVER TOLD."*) —
**one layer up, with the roles swapped.** It is priced as `P-3` §5's `(b)` and the price is not the one a first reading guesses.

---

### §21.3 · The code's own answer

**(a) NO COMPARISON OF THE LANDED VALUE AGAINST THE STANDING VALUE IS TAKEN BEFORE THE SET IS BUILT.** The lines between the mint and
the trigger set (`§21.1 (iv)`) read the value **only** to hand `touched_below` its `written` argument (`:2655`) — the path walk of
what was written — and **not one of them reads a pre-state against a post-state.** `StoreValue` carries `PartialEq` with its `Object`
a `BTreeMap` (*"structural equality is key-order-insensitive by construction"*, `src/value.rs:13`–`:15`), **so a comparison would be
cheap; that it is available and not taken is the fact.**

**(b) `op.before` IS NOT THE STANDING VALUE — IT IS A READ VIEW, AND AT A SHADOWED ADDRESS IT IS A LIST.** `src/store.rs:2036`–`:2038`:

> "The declared `before`/`restoredTo` view of an address: `present` and the value a read answers there. **Where the operation touched
> MORE THAN ONE version at the addressed node, the value is the ordered list of the values it touched**, in `§5.1`'s canonical tier
> order"

**AND THE STORE HAS A SECOND CHANGE TEST ON THE WRITE PATH THAT COMPARES NO VALUES AT ALL. ⟶ CORRECTED AT THIS LINE
(`role_l0_critique` `C-8`, re-read here): this audit's first text said *"the store compares no value anywhere on the write path"*,
and that sentence is TRUE ONLY OF A VALUE COMPARISON.** `src/store.rs:1666`–`:1674`:

```rust
1666:    fn save_owed(&self, index: usize) -> bool {
1667:        let entry = &self.journal[index];
1668:        if entry.op.tier == Some(Tier::File) {
1669:            return true;
1670:        }
1671:        entry.captured.iter().any(|before| {
1672:            before.tier == Tier::File
1673:                && !entry.after.iter().any(|now| now.tier == before.tier && now.path == before.path)
1674:        })
```

**ITS GROUND IS A DEPARTURE, NOT A VALUE** (`:1640`–`:1642`: *"**TRUE EXACTLY WHEN THE ACT THE ENTRY NAMES MOVED AT LEAST ONE VERSION
STANDING AT `Tier::File`**"*), and its own docblock speaks the request's language while meaning something else (`:1659`–`:1660`: *"so
the count would have made every shadowing write eligible and **written a byte for a datum nothing durable moved**"*). **THE `file`-TIER
SAVE IS OWED ON THE OP'S TIER WORD ALONE** — the first disjunct at `:1668` short-circuits before any departure test — **which is
exactly what the probe in `§21.7` measures: the bytes identical, the mtime moved.** **The store's ONE image-equality guard sits on the
state-keyed save** (`:3418`–`:3421`: `if standing == durable { return Ok(()); }`), **and its caller is the reversal's save, not a
verb's.**

**(c) THE JOURNAL AND `seq` MOVE UNCONDITIONALLY.** `src/store.rs:2639`–`:2645` appends with no branch above it, and `append` bumps
`self.last_seq += 1; op.seq = self.last_seq;` (`:2122`–`:2123`).

**(d) NO LAYER ABOVE THE CRATE ADDS OR SUBTRACTS A CONDITION.** Five hops, each read: the addon entry (`bindings/js/src/facade.rs:743`–`:744`,
no test on the answer) · the crossing (`bindings/js/src/crossing.rs:1108`–`:1109`, `triggered: triggers(&result.triggered)`) · the
instance method (`bindings/js/index.mjs:565`, `:649`–`:651`) · the commit act (`bindings/js/src/entry/kernel-commit.mjs:186`–`:188`,
the set carried whole) · the delivery (`bindings/js/src/entry/delivery.mjs:984`–`:988`,
`const triggered = Array.isArray(record.pending) ? record.pending.slice() : [];`) and its invocation loop (`delivery.mjs:156`). **The
one condition in the chain is the residue's own arm, and its subject is which delivery instant this is — not whether anything
changed.**

---

### §21.4 · The constraint axis — ruled, adjacent, and one word this section does NOT read

**`strata/decisions.md:97`–`:99`, `D-1-bis`:**

> "**The constraint mechanism is unconditional on the write/commit path**, over the triggered handle set. There is nothing
> conditional to defer, which is the ground under `D-1`: the lazy-and-separable reach has no subject because the mechanism is always
> present."

**AT ALL THREE OF ITS SITES THE WORD'S SUBJECT IS WHETHER THE MECHANISM IS ALWAYS PRESENT** (a refusal of the lazy-and-separable
configuration: `:42`–`:43`, `:62`–`:63`), **and its declared input is *"the triggered handle set"*** — so **whether `unconditional`
also binds that input's PREDICATE is a reading no row of this record answers, and this section does not take it.** It is `P-3`'s
`Q-6`, and it is the architect's.

**TWO CONSEQUENCES THAT ARE NOT QUESTIONS ONCE A LAYER IS CHOSEN.** **(i)** The pass's evaluated set **is** the store's returned one
— `kernel-attempt.mjs:648`–`:649` (`const stored = attempt.record === undefined ? undefined : attempt.record.triggered;`), declared
at `bindings/js/index.d.ts:971`–`:972` (*"`pending` is SEEDED AS A CLONE OF `triggered`"*) — **so a store-side narrowing narrows the
pass by construction.** **(ii)** The same returned set also seeds the **repair-credit** membership (`kernel-attempt.mjs:656`–`:658`;
`D-105` item 3, `strata/decisions.md:5347`) — **so a store-side narrowing narrows that set too, a consequence beyond `triggered`,
`watched` and the pass, and one no earlier text of this audit carried.**

---

### §21.5 · The neighbours that already touch "no change"

| # | the neighbour | what the record declares | site |
|---|---|---|---|
| `N-1` | a `delete` at an ABSENT address | **a refusal** — the walk's own code; no `triggered` at all (`D-4`) | `docs/specs/storeroom-native/contract.md:2322` |
| `N-2` | a `delete` that removes NOTHING | **a SUCCESS: `tiers: []`, `triggered: []`, no journal entry** — the corpus's one already-declared change-conditioned arm, keyed on REMOVAL | `contract.md:2321`, `:3040`–`:3041`; `src/records.rs:194`–`:196` |
| `N-3` | an idempotent RE-WRITE | **the act is NAMED once and only its ANSWER is declared** — *"it would make **an idempotent re-write (`write(a, tier, v)` twice) a failure**"* is the price `DD-11` refuses; **its trigger set is not mentioned** | `contract.md:469` |
| `N-4` | `triggered: []` on a WRITE | **SILENT.** The corpus declares what `[]` means for the residue, for a registration instant's count, and for `discarded` (`D-75`/`D-78`, `docs/specs/storeroom-js/surface.md:230`, `:235`–`:236`: *"`undefined` IS NOT `[]`"*) — **and it nowhere says what a caller may conclude about the DATA from an empty trigger set.** That silence is `P-3`'s `Q-5` | as cited |
| `N-5` | the `file`-tier save on an unchanged write | **owes a save and performs it** (`§21.3 (b)`; measured, `§21.7`) | as cited |
| `N-6` | THE CORPUS'S ONE SHIPPED CHANGE PREDICATE | **the reversal's judgement skips an address it did not move** — *"A STANDING THIS REVERSAL DID NOT MOVE IS NOT A STANDING IT LEFT"* — implemented as `if (sameStanding(one.before, after) === true) continue;`, `sameStanding` structural over the store's decoded values | `bindings/js/src/entry/constraints.mjs:2534`–`:2545`, helper `:3483`–`:3490`; declared `docs/specs/storeroom-js/contract.md:1826`; shipped to consumers at `docs/guides/package-use.md:1284` (*"a request whose watch shows no moved address is consumed and asks nothing"*) and `:1219` — **⟶ CORRECTED AT THIS LINE: this row first carried `package-use.md:490`, which is the refused-reversal clause and does not state the change test; the two sites above are the guide's own and were re-read this date.** |
| `N-7` | the reversal's JUDGING INSTANT | **terminal state, never per step** — *"A REVERSAL IS JUDGED AT THE TERMINAL STATE IT LEAVES, AND NEVER PER UNWINDING STEP"* | `docs/specs/storeroom-js/contract.md:1811` |

**`N-6` IS THE SECTION'S SECOND FINDING, STATED AS A FACT AND NOT AS AN ARGUMENT: *"no change ⇒ not asked, not refused, not
witnessed"* is NOT new semantics in this product — it is the REVERSAL's law, shipped, declared and guided. The request extends it
from one instant to another, and `N-7` is the precedent its instant must be argued against.**

---

### §21.6 · What the tests already drive

**`T-1` — THE ONE CELL THAT DRIVES A REPEATED IDENTICAL WRITE AND ASSERTS A FIRING COUNT.** `tests/e2e/json-crossing.test.mjs`'s
FRESHNESS LIMB — its state table says *("a second identical write at the same address | a SECOND invocation")* (`:4357`) — asserted
at `:4517`–`:4521`:

```js
4517:  const second = crossingCall(() => control.store.write(drivenAddress, 'mem', 'x'));
4518:  assert.equal(second.raised, false,
4519:    `the freshness limb: the control's second identical write must be ADMITTED; …`);
4520:  assert.equal(control.fired.length, 2,
4521:    `the freshness limb: a second trigger set fires the registered listener again; …`);
```

**⟶ AND THE SUPERVISOR'S READING OF THAT CELL, WHICH IS NARROWER THAN *"a cell asserts the amplification"* (`role_l0_critique`
`C-16`, re-read here): the cell's SUBJECT is the ARGUMENT's freshness** — `:4522`–`:4534` assert two distinct array objects, the
array's density and the address value — **so `:4520` is a precondition the subject is driven over, and a re-derivation that keeps the
subject can keep the count by changing the second write's value.** **The cell is a token to re-derive, not a semantic the suite
defends.**

**`T-2` — the store-level cell that writes one value twice and asserts only the answer.**
`tests/integration/store-core/e2e_json_round_trip.rs:880`–`:882` (*"And writing the SAME value again is a success, never a
`PairOccupied` refusal (`DD-11`)"*): it registers no listener and asserts no firing count.

**THE MEASURED NEGATIVES, WITH THE PATTERNS AS RUN.** Over `tests/integration/store-core/`,
`twice|a second time|same value again|repeated identical|identical write` → `15` matches, **none a repeated identical write with a
firing count**; over `tests/`, `same value twice|twice with the same|identical write|writes? the same value` → `3` matches, of which
**only `T-1`'s own row** is the intake's act and the others are a throw-arm cell and prose. **NO CELL OF THE BATTERIES ASSERTS A ZERO
FIRING COUNT ON A REPEATED IDENTICAL WRITE: the corpus's coverage of this request's case is one cell expecting TWO invocations, and
nothing expecting one or none.**

---

### §21.7 · THE MEASUREMENT — `MEASURED`, by the supervisor, `2026-11-17`

**WHAT WAS DRIVEN AND THROUGH WHAT:** the checkout's own entry — `import { storeCreate } from '…/bindings/js/index.mjs'` — against
the prebuilt addon **`bindings/js/build/Release/storeroom_js_binding.node`, mtime `2026-11-11 13:24`** (the `1.11.0` cut), node
`v24.20.0`. **No build was run and nothing was installed**; the drives are throwaway scripts under `/tmp`.

**ARM 1 — `mem`, one listener at `['a']` registered by `listen('w-a', [['a']])` then `register('w-a', fn)`, four writes:**

| write | value | `triggered` | `op.seq` | `op.before` | `op.after` | body ran |
|---|---|---|---|---|---|---|
| 1 | `1` | `[{handle:'w-a', address:['a']}]` | `1` | `{present:false}` | `{present:true, value:1}` | yes |
| 2 | `1` **(identical)** | `[{handle:'w-a', address:['a']}]` | `2` | `{present:true, value:1}` | `{present:true, value:1}` | **yes** |
| 3 | `2` | `[{handle:'w-a', address:['a']}]` | `3` | `{present:true, value:1}` | `{present:true, value:2}` | yes |
| 4 | `2` **(identical)** | `[{handle:'w-a', address:['a']}]` | `4` | `{present:true, value:2}` | `{present:true, value:2}` | **yes** |

**the listener's one argument both times `['a']`, and the body's own record of four invocations: `["a"] · ["a"] · ["a"] · ["a"]`. THE
IDENTICAL WRITE FIRES; SO DOES A CHANGED ONE — the set carries no value term in either direction, which is `§21.1`'s row
instantiated.**

**ARM 2 — `file`, a real `filePath`, one listener at `['k']`, the same value written twice at `file`:**

- both answers carried `triggered: [{handle:'w-f', address:['k']}]`, `op.seq` moved `1 → 2`, the second op read `before
  {present:true, value:'v'}` beside `after {present:true, value:'v'}`, and **the body ran twice**;
- **the file's bytes were IDENTICAL across the two writes (`{"k":"v"}` both times) and its MTIME MOVED** (`1794935547002.66` →
  `1794935547028.66`) — **so the durable save was performed for an act that moved no durable datum.** That figure is `§21.3 (b)`'s
  `save_owed` short-circuit, measured — **it is not a change test and it is not evidence FOR one**: `save_owed` never compared a value.

**WHAT THE MEASUREMENT DOES NOT SETTLE, NAMED.** It drives **one address, scalar values, and no constraint pair, no repair and no
distinct tiers at one address** — so it says nothing about the touched arm on a structured value (`Q-8`), about a repair's landing
(`Q-7`), or about a shadowed address's list-shaped `before`. **Those are `P-3`'s questions and not this section's figures.**

---

### §21.8 · SUMMARY

**TOKEN: `SPECIFIED-FIRES` — and beside it `§21.2`'s `CONTRADICTORY`, which is the token that matters to the architect.** The
returned set is declared **by a universal over every successful write whose arms are positional and reach-based and whose failure list
counts a missing handle as a red** (`P-TP-8` (a), `contract.md:3028`–`:3033`, `:3149`–`:3150`), and it is **MEASURED to fire on an
identical write** (`§21.7`). **The record's own CRITERION sentence, however, says a firing is a VALUE CHANGE** (`D-66`,
`strata/decisions.md:3765`–`:3766`, restated at `src/store.rs:3566`–`:3570`) **while its INSTANTIATION carries no value term**
(`:3571`–`:3577`). **So the request does not lack a subject in the record; it finds two sentences in the record that disagree about
the same act, and asks which one governs.** No clause anywhere names *"change detection"*, *"no-op write"* or an equal-value write
(`0` matches repo-wide, patterns `change detection|no-op write|equal-value|equal value`).

**WHAT THE RECORD ANSWERS.** The firing rule (§21.1) · the code's answer at four anchors (§21.3) · the constraint axis as a quotation
with its boundary printed (§21.4) · the neighbours, including **the corpus's one shipped change predicate (`N-6`, the reversal's)**
and **the one cell that drives the intake's act (`T-1`, which expects TWO invocations)** (§21.5–§21.6).

**WHAT IT REFUSES TO ANSWER, NAMED AS SILENCE.** **(S-1)** what a caller may conclude about the DATA from `triggered: []` on a write ·
**(S-2)** whether `D-1-bis`'s *"unconditional"* binds the trigger set's input predicate · **(S-3)** whether an identical **structured**
write at a parent — which touches its own members by construction (`touched_below`'s `written` arm, `src/store.rs:2247`–`:2250`) —
counts as *"nothing changed"* · **(S-4)** whether a repair's landing is compared at the spelled value or at the landed one.

**THE MEASUREMENT'S STATUS: `MEASURED`, `2026-11-17`, two arms, through the checkout's own entry and the `1.11.0` cut's prebuilt
addon — the figures in `§21.7` and nothing more.** **THE INTAKE'S VERDICT IS `strata/proposals.md` · `P-3`; this section decides
nothing, scopes nothing, prices nothing and opens no unit.**
## §22 · The async-listener request — a returned promise with no declared destination (`2026-11-17` · `e3136af`)

**THE REQUEST, VERBATIM FROM THE PRODUCT'S OWNER, `2026-11-17`:**

> "Add async listener support"

**ITS INTAKE, AND BY WHOSE CALL.** A **feature request** in four words with no elaboration, filed under the intake rule that a
note or a feature request goes to `role_l0_research`. **No clause is being violated by the tree** — this is not a defect report —
so the gate-1 question is *what the record declares about this, what the runtime does today, and which declared sets each
candidate reading would move*, not *what is broken*. **Nothing here opens a unit, a pin or a contract directory, and no arm is
chosen, ranked or recommended.**

**PROVENANCE, AND ITS LIMIT — WHAT THIS SECTION OWES ITS READER, AND TWO OF THE THREE LIMBS ARE SHORT.**

1. **A `role_l0_research` audit of this date whose channel held FOUR READ-ONLY FILE OPERATIONS AND NO SHELL.** It ran no `node`,
   no `git`, no `mktemp`, no `import()`. **NOT ONE FIGURE IN THIS SECTION IS DRIVEN**; every one is a `read-at-path:line`.
   `§20.4`'s convention is repeated verbatim as this section's own (`strata/research.md:1803`).
2. **AND IT HELD NO WRITE CHANNEL EITHER**, so this section was **composed by the pass and landed by the supervisor**, and
   `strata/research.md` stood at `2,208` lines ending `§19`'s successor `§21` while the audit was in flight. `§21` is another
   pass's uncommitted work and **not one byte of it was read as this section's own**.
3. **`HEAD` IS VERIFIED BY FILE-READ AND NOT BY `git`**: `.git/HEAD:1` reads `ref: refs/heads/main` and
   `.git/refs/heads/main:1` reads `e3136afdb351515b41bc6c82d0e4c17e392eeb01`.

**THE SIX FACTS THIS AUDIT WAS HANDED, EACH RE-READ, THREE CORRECTED AND ONE QUALIFIED.** They are disposed of one by one at
`§22.2`, and the corrections are: **the invocation is at `delivery.mjs:206`, not `~:215`**; **the closed status set is `22`, not
`20`** (`src/error.rs:171`); **the instance declares `15` own members, not `14`** (`bindings/js/index.d.ts:1087`'s `readTiered` is
the fifteenth); and **`PAR-JS-12`'s declared home is not a live file** — `docs/specs/storeroom-js/` carries `surface.md` and
`contract.md` only, and the row's bytes stand at `.reflow-backup/…/parameter-semantics.md:455`–`:463`, a gitignored path whose
absence is a **filed** corpus condition (`docs/specs/storeroom-corpus-citation-integrity-proposal-review.md:30`).

---

### §22.1 · What the record declares — (i) the return value and the invocation instant

**(i) THE RETURN VALUE IS DECLARED UNREAD, IN THREE PLACES AT TWO LAYERS.**

- **The parameter row's own `domain` cell**, verbatim (`PAR-JS-12`): *"ANY JS function the caller registers for a handle the
  package returned or adopted. **The package's invocation passes the triggering ADDRESS as its argument; no other argument is
  declared and no return value is read**"* (`.reflow-backup/docs/specs/storeroom-js/parameter-semantics.md:463`).
- **The surface clause that carries it**, verbatim: *"**NO OTHER ARGUMENT IS DECLARED AND NO RETURN VALUE IS READ**"*
  (`docs/specs/storeroom-js/surface.md:1716`–`:1717`, `§2.7` item 5).
- **The shipped loop's own docblock**, which quotes the row at the site that performs the invocation
  (`bindings/js/src/entry/delivery.mjs:101`–`:102`).

**AND THE CODE KEEPS IT.** `bindings/js/src/entry/delivery.mjs:206` is
`externalCall(state.receiver, () => listener(decodeSegments(address)));` — the thunk's answer is *answered* by
`state.mjs:338`–`:342` (*"answers what the invocation answered"*) and the call site reads none of it. **The listener's return
value has no destination in the shipped package, by declaration and by construction.**

**(ii) THE INVOCATION'S INSTANT IS DECLARED AND IT IS SYNCHRONOUS.** `§2.7` item 2, verbatim: *"THE INVOCATION IS THE CALLER'S,
AND THE PACKAGE PERFORMS IT AFTER THE VERB HAS RETURNED. **The invocation is SYNCHRONOUS** and happens after the store call has
completed and the record has been copied out"* (`surface.md:1654`–`:1663`). **AND THE SAME ITEM CARVES ITS OWN EDGE, WHICH IS
WHERE EVERY ASYNC ARM WILL LAND:** *"A BODY THAT RAN AFTER THE PACKAGE'S VERB RETURNED TO THE CALLER HAS RUN AT AN INSTANT THIS
ITEM DOES NOT DECLARE"* (`:1660`–`:1662`). **So the clause declares a synchronous body AFTER the store call and BEFORE the
package's verb returns — and it says, in its own words, that it does not declare what happens after the verb returns.**

---

### §22.2 · (ii) The ordering law, and the measurement it is owed

**THE LAW IS `A112`, AND IT IS UNMOVED.** `§2.7` item 6, verbatim: *"For a write, the surface runs the write's TRIGGERED
CONSTRAINTS FIRST, and THE OTHER LISTENERS ARE REACHED ONLY ONCE EVERY CONSTRAINT HAS PASSED; on a write that fails on
constraints THE OTHER LISTENERS ARE DISCARDED"* (`surface.md:1726`; its homes `docs/specs/storeroom-constraints/contract.md:15`,
`:657`).

**THE SAVE-PRECEDES-DELIVERY HALF IS DECLARED AT THE TERMINAL ARM ITSELF**, verbatim: *"THE `file`-TIER SAVE, FIRST, BEFORE ANY
BODY OF THE DELIVERED SET IS INVOKED … THE ACT IS THE FIRST THING THAT ARM DOES"* (`delivery.mjs:858`–`:864`).

**AND THE SHIPPED ORDER, AT FIVE BYTES.** `kernel-attempt.mjs:220`'s `runAttempt` → `passInCommitScope` → `close(kernel, attempt,
'passed')` at `:389` → `bumpMark` at `:410` → `publishCheckedOff` at `:423` → `settleArm(store, attempt)` at `:452` → the entry's
`TERMINAL_ARM` → `terminalArm` → the save at `delivery.mjs:939` → the residue's delivery at `:987` → **and only then**
`drainRestart(store, report)` at `:270`. **So the delivery is inside the write's own pass and before the kernel's drain, and the
supervisor's second fact is verified to the byte.**

**AND THE CONFORMANCE MEASUREMENT IS `OWED`.** The archived tracker (`docs/next-steps.md` `N7`) measured the law **red** on
2026-10-15, and the brief records that this pass did not re-measure it — *"Whether delivery now follows the pass is `OWED` a
measurement, not a claim either way"* (`strata/brief.md:344`–`:358`). **This section did not re-measure it either, and it held no
shell to try.** **A request that moves the delivery's instant therefore moves a law whose conformance is unmeasured on this
branch** — a fact a gate-1 pass must carry rather than discover at gate 3.

---

### §22.3 · (iii) The delivery window's membership rules, all five, at their bytes

The window is closed, snapshotted and unordered, and the five rules are shipped as orders in one loop
(`bindings/js/src/entry/delivery.mjs:107`–`:208`):

1. **The recipient set is SNAPSHOTTED WHEN THE WINDOW OPENS, BEFORE THE FIRST INVOCATION** (`:107`–`:121`; the defect it closes
   is named: the as-built loop read `state.registry.get(handle)` *inside* the loop, so which of a registration and a
   withdrawal took effect depended on the home `HashMap`'s iteration order).
2. **A REGISTRATION, A REPLACEMENT OR A WITHDRAWAL MADE DURING THE WINDOW TAKES EFFECT AT THE NEXT TRIGGER, AND AT NO ELEMENT OF
   THIS ONE** (`:116`–`:121`; `CF-DUP-3`; `off`'s own arm, *"`off` DOES NOT CANCEL A DELIVERY IN FLIGHT"*).
3. **ONE INVOCATION PER DISTINCT HANDLE**, deduped on **`entry.handle` and never on the element** (`:130`–`:135`, `:154`–`:166`) —
   the defect it closes: a handle at `['a']` and at `['a','b']` both prefix-matching a write at `['a','b','c']` fired **twice**.
4. **NO ORDER IS ASSERTED** — *"a drive compares SETS, never sequences"* (`surface.md:1664`–`:1666`; `DD-22`; `DD-37` declares the
   store's returned order insignificant).
5. **A HANDLE THE REGISTRY HOLDS NO FUNCTION FOR FIRES NOTHING, SILENTLY** — no code, no warning, no log, no throw
   (`surface.md:390`–`:391`; `delivery.mjs:188` is the whole of the arm), **and a constraint's handle is SKIPPED here because
   it is ASKED by the pass and never delivered** (`delivery.mjs:173`–`:182`; `D-69`).

**AND `D-72`'s NESTING MODEL, WHICH IS THE ONE THESE RULES ARE BUILT ON:** *"windows are live at once, NESTED, **every level a
synchronous call on one thread**"*, so *"`A`'s whole chain completes before the window that fired it invokes its next listener"*,
with four properties named as real and **none declared up the stack** — *"DEPTH IS UNBOUNDED; THE CROSS-WINDOW ORDER IS REAL AND
UNDECLARED; RE-ENTRANCY IS UNAVOIDABLY OPEN; and NOTHING ABOVE SEES BELOW"* (`surface.md:1770`–`:1777`). **Every one of those four
sentences is a statement about a synchronous stack.**

---

### §22.4 · (iv) Who owns the invocation — `A57`, and the split it forces

**THE STORE RETURNS HANDLES AND INVOKES NOTHING** (`A57`; `surface.md:387`, the ruling's own words at `:405` — *"a handle that it
returns to alert the client of the trigger"*). **So the invocation is the PACKAGE's, and the package's registry is the
handle→function map** (`surface.md:388`–`:403`, four rules and *"no fifth"*). **AND `D-69` split the registration into two kinds
without moving the boundary:** a registration is a **handle and a body**, the store's home holds `{address, handle}` and never a
function (a function cannot cross into Rust at any depth — `frame.mjs:42`–`:44`), and **"an element whose handle is a constraint's
`id` is asked; a listener's is delivered"** (`strata/decisions.md:3848`; `delivery.mjs:173`–`:182`).

**THE CONSEQUENCE FOR THIS REQUEST, IN ONE SENTENCE:** *no async arm can move the invocation into the store.* **The store has no
place to put a promise, a queue or a flush rule** — `A57` forbids the invocation crossing, `DD-17`'s *"the store runs NO background
work"* forecloses the queue (`docs/specs/storeroom-js/contract.md:2504`–`:2510`), and `DD-23`'s price names that absence as its own
ground. **Whichever arm is taken, it is a move on the JS side and on the JS side only.**

---

### §22.5 · (v) What the record already declares about async, promises, microtasks and rejection handling — **it is not nothing**

**THE ABSENCE FIRST, STATED AS AN ABSENCE.** A search of `docs/specs/**`, `strata/decisions.md`, `strata/research.md`,
`docs/guides/**` and every `.mjs` doc block for `async` · `Promise` · `microtask` · `unhandledRejection` · `awaited` finds **no
clause, no row, no cell, no ruling and no guide sentence that declares what happens to a listener's returned promise.** There is
**no `Promise` handler, no scheduler and no queue in the shipped package**: a grep of `bindings/js/**` for
`\bPromise\b|unhandledRejection|process\.on|\.then\(|\.catch\(` returns **four matches, all prose**
(`README.guide.md:1515`, `:1985`, `README.md:155`, `index.d.ts:499`), and the `async` token appears in the entry only in
`index.mjs:11`'s sentence about ***asynchronous module evaluation at load***. **That absence is a finding: a listener may return
a promise today, and nothing declares what becomes of it.**

**AND THE SUBJECT IS NOT UNDECLARED — IT IS DECLARED REFUSED, AND PRICED.** This is the section's load-bearing finding, and it is
one row of the design-defaults table, `DD-22` (`docs/specs/storeroom-js/contract.md:602`):

- **`What it pins`:** *"the package invokes a registered listener function **SYNCHRONOUSLY** AFTER the verb's own call has
  returned … and NO ORDER IS ASSERTED"*.
- **`What it REFUSES`:** a declared invocation order; an invocation before the verb returns; **"an asynchronous invocation with an
  undeclared scheduler"**.
- **`alt`:** *"an ordering guarantee … — priced: …; **and an async delivery — priced: it needs a queue, a flush rule and a failure
  channel for a throwing body, none of which any ruling names; both available with a fresh ruling"***.
- **the reversal instrument:** *"a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment"*.

**AND THE THROWING BODY'S DISPOSITION IS A SECOND DECLARED REFUSAL, `DD-23`** (`contract.md:603`; its law at
`surface.md:1667`–`:1669`): *"a registered function that throws is NOT caught, NOT retried and NOT reported"*, with
**"catching and reporting a throwing body"** among its refused alternatives — priced as *"the report would need a failure channel
the package does not own (`DD-12`'s single form is the STORE's), and `A74`'s no-background-work reading leaves no queue to report
through"*.

**SO THE RECORD HOLDS THREE SENTENCES THAT MEET THIS REQUEST AND NO FOURTH:**

1. the invocation is **synchronous** and its return value **unread** (`PAR-JS-12`; `surface.md:1654`, `:1716`);
2. an **async invocation** is **REFUSED**, and priced as available with a fresh ruling (`DD-22`, `contract.md:602`);
3. a **throwing body's** disposition is **declared** — not caught, not retried, not reported — and **catching it is REFUSED and
   priced** (`DD-23`, `contract.md:603`; `surface.md:1667`).

**WHAT IS *NOT* DECLARED, NAMED SO IT IS NOT INVENTED:** what "fires once" means for a body that has not settled; which window a
suspended body's later registration belongs to; whether a post-`await` write names a commit; whether a delivery outcome may reach
the caller; and whether `A112`'s ordering survives a suspension. **Those are `§22.7`'s questions, and this section supplies no
default for any of them.**

---

### §22.6 · The claims ledger

| id | the claim | verdict | `path:line` |
|---|---|---|---|
| `AL-0` | `HEAD` is `e3136af` | **VERIFIED by file-read, not `git`** | `.git/HEAD:1`; `.git/refs/heads/main:1` |
| `AL-1` | the package ships `1.12.0` with the `require` condition on the one ESM entry | **VERIFIED** | `bindings/js/package.json:3`, `:27`–`:33` |
| `AL-2` | the closed status set is **`22`**, ranked `1`…`22`; `ListenerBodyThrew` at `21`, `FileImageRefused` at `22` | **VERIFIED** | `src/error.rs:171`–`:196`; `index.d.ts:421`–`:444` |
| `AL-3` | the instance declares **`15`** own members | **VERIFIED** | `index.d.ts:1047`, `:1049`, `:1087`, `:1121`, `:1140`, `:1148`, `:1213`, `:1228`, `:1273`, `:1287`, `:1292`, `:1325`, `:1327`, `:1329`, `:1416` |
| `AL-4` | the listener's type is `(address: Address) => void`, and the only runtime admission is `typeof … === 'function'` | **VERIFIED at the bytes; the TypeScript assignability of an `async` function to `() => void` is a language rule and NOT DRIVEN** | `index.d.ts:573`; `delivery.mjs:188`; `surface.md:392`–`:393` |
| `AL-5` | the **construction** route also admits an `async` listener: the third member is required, its **type** is not tested there | **VERIFIED** | `frame.mjs:48`–`:52`; `:45`–`:47` |
| `AL-6` | `PAR-JS-12`'s operative sentence: *"no other argument is declared and no return value is read"* | **VERIFIED — at a gitignored path; its live citations are quotations** | `.reflow-backup/docs/specs/storeroom-js/parameter-semantics.md:463`; `surface.md:1716`–`:1717`; `delivery.mjs:101`–`:102` |
| `AL-7` | a non-function registration is a JS `TypeError` carrying **no `status` and no `message`** — *"the ONE failure form this unit's package throws that is NOT the store's"* | **VERIFIED** | `.reflow-backup/…/parameter-semantics.md:465`, `:477`–`:484` |
| `AL-8` | **the invocation is declared `SYNCHRONOUS`, after the store call, and the clause explicitly does NOT declare a body that runs after the package's verb returned** | **VERIFIED** | `surface.md:1654`–`:1663` |
| `AL-9` | the return value has no destination in the shipped loop | **VERIFIED** | `delivery.mjs:206`; `state.mjs:338`–`:342` |
| `AL-10` | **`DD-22` REFUSES an asynchronous invocation, and prices an async delivery as available with a fresh ruling** | **VERIFIED — the load-bearing finding** | `contract.md:602` |
| `AL-11` | **`DD-23` declares a throwing body uncaught and REFUSES "catching and reporting", priced on the absence of a failure channel the package does not own** | **VERIFIED** | `contract.md:603`; `surface.md:1667`–`:1669` |
| `AL-12` | a **synchronous** listener throw propagates to the caller and leaves the triggering write **unanswered** — measured on this tree 2026-10-29 | **CARRIED** from the clause's own measurement; **not re-driven here** | `surface.md:1791`–`:1815`, `:1803`–`:1806` |
| `AL-13` | the four window rules — snapshot at open, a mid-window registration deferred, one invocation per distinct handle deduped on `entry.handle`, no order asserted | **VERIFIED** | `delivery.mjs:107`–`:121`, `:130`–`:135`, `:154`–`:166`, `:184`–`:208`; `surface.md:1664`–`:1666` |
| `AL-14` | `D-72`'s nesting law is premised on *"every level a synchronous call on one thread"* | **VERIFIED** | `surface.md:1770`–`:1777` |
| `AL-15` | the save is the terminal arm's FIRST act, before any body of the delivered set | **VERIFIED** | `delivery.mjs:858`–`:864`, `:939`, `:987` |
| `AL-16` | the delivery is inside the write's own pass and **before** the kernel's drain | **VERIFIED** | `kernel-attempt.mjs:389`, `:452`, `:270` |
| `AL-17` | **`A112`'s conformance is `OWED` a measurement on this branch**, and the archived tracker measured it red | **VERIFIED as the record's own statement; NOT re-measured** | `strata/brief.md:344`–`:358` |
| `AL-18` | the store invokes nothing; a function cannot cross into Rust at any depth; the store runs no background work | **VERIFIED** | `surface.md:387`; `frame.mjs:42`–`:44`; `contract.md:2504`–`:2510` |
| `AL-19` | the write record's member set is `FOUR` and `pending` is read, never owned | **VERIFIED at the clause; the member names are CARRIED from a greens run** (`A112-A4`: `keys=[attempt,op,pending,triggered]`) | `delivery.mjs:873`–`:874`, `:1018`; `blind-greens-a112-final.gate5-first.txt:4` |
| `AL-20` | no `PAR-JS` row exists for a listener's return value; the set's operative range is `PAR-JS-1`…`PAR-JS-27` | **VERIFIED at the count's home** | `contract.md:45` |
| `AL-21` | an `async` function as a **stored value** is refused `ValueNotAdmitted` (row 8) — an asymmetry with its admission as a listener | **VERIFIED** | `contract.md:937`; `carrier.mjs:254` |
| `AL-22` | **the commit bracket cannot span a microtask**: `EXTERNAL_COMMIT`/`EXTERNAL_DEPTH` are restored and the leg list closed in a `finally` that runs at the body's first suspension; a post-`await` write therefore finds `undefined`/`0`/no bracket | **VERIFIED at the bytes; the runtime consequence NOT DRIVEN** | `state.mjs:811`–`:845`, `:667`, `:675`, `:305`–`:307`, `:363`–`:365`, `:384`–`:388` |
| `AL-23` | a post-`await` listener write names no commit and therefore **opens its own**, and its constraint pass **does** run | **mechanism VERIFIED; behaviour NOT DRIVEN** | `state.mjs:667`; `constraints.mjs:810`, `:817` |
| `AL-24` | a listener body's own kernel act meets a **closed** attempt by design | **VERIFIED** | `kernel-attempt.mjs:415`–`:416` |
| `AL-25` | the shipped graph has **no top-level `await`**; `bindings/js/` carries `15` `.mjs` files | **file count VERIFIED by glob; the token claim CARRIED** | glob `bindings/js/**/*.mjs` → 15; `strata/research.md:1748` (`§20.3`'s `K-11`) |
| `AL-26` | **the synchronous-graph law's subject is the LOAD-TIME MODULE GRAPH**, and the corpus itself distinguishes a top-level `await` from an `await` inside an `async` body | **VERIFIED** | `contract.md:2379`; `bindings/js/index.mjs:10`–`:12` |
| `AL-27` | the corpus declares the invocation synchronous at its own test bytes: a Rust cell and a JS trace | **VERIFIED at the bytes, NOT RUN** | `tests/integration/binding-crossing/addon_adoption.rs:708`–`:709`; `tests/e2e/convenience.test.mjs:349`; `tests/e2e/surface.test.mjs:626` |
| `AL-28` | **twenty-one test files argue their own totality FROM synchrony**, each wrapping a synchronous call in a `try`/`catch` that captures a throw as a value — a pattern a **rejection does not satisfy** | **VERIFIED; the count is a grep's** | the 21 paths printed at `§22.7`'s first price |
| `AL-29` | the closed set's census is declared in the native contract and the declaration agrees member for member | **VERIFIED** | `src/error.rs:171`–`:196`; `index.d.ts:421`–`:444` |

**AND THE ONE CLAIM THE TREE REFUTES, STATED SO AGREEMENT IS NOT MANUFACTURED: NONE.** Every checkable sentence this section
prints is true at `HEAD` `e3136af`. **The two figures that were false when this audit was handed its subject — "twenty" for the
status set and "fourteen" for the member set — are corrected at `§22.0` and at `AL-2`/`AL-3`, and they were the supervisor's and
the brief's and not the tree's.**

---

### §22.7 · THE MEASUREMENT — **`NOT DRIVEN`**, and the instrument written down

**WHAT WAS IMPOSSIBLE, SAID PLAINLY.** This pass held four read-only file operations. **It ran no `node`, no `git`, no `mktemp`,
no `import()`, and it could not create a temp directory.** So **not one arm of this request is measured**, and **no exit code,
no `stderr` and no output exists to print.** `§20.4`'s convention is repeated verbatim (`strata/research.md:1803`).

**WHAT THE BYTES GIVE IN PLACE OF THE DRIVES, arm by arm:**

| the arm | what this pass can say instead | its verdict |
|---|---|---|
| **(a) an `async` listener that REJECTS** | the body is invoked (`delivery.mjs:206`); its promise is answered to `externalCall` and read by nobody (`state.mjs:338`–`:342`); no handler exists anywhere in `bindings/js/**` (grep: four prose matches); **and the caller's `write` IS answered**, so `§2.7` item 10's *"UNANSWERED"* does not hold. **Whether the process then dies is a NODE fact** (`AL-17`), and no byte of this tree states it | mechanism **VERIFIED**; fatality **EXTERNAL, NOT DRIVEN** |
| **(b) an `async` listener that RESOLVES** | the body's post-`await` statements run **after the window closed** — an instant `§2.7` item 2 *"does not declare"* (`surface.md:1660`–`:1662`) | **UNDECLARED INSTANT** |
| **(c) a listener that throws SYNCHRONOUSLY** | `write` throws **that same object** and answers nothing — the declared `D-73` channel, **measured on this tree 2026-10-29** | **CARRIED** (`surface.md:1804`–`:1806`) |
| **(d) an `async` listener that awaits and THEN writes** | the bracket is gone (`AL-22`), so the write names **no commit** (`openCommit`'s `state.mjs:667`) and **opens its own**; **the constraint pass runs for it** (`constraints.mjs:810`, `:817`); its legs are appended to **no open bracket** (`state.mjs:363`–`:365`); and its `write` meets an **already-closed** attempt (`kernel-attempt.mjs:415`–`:416`) | mechanism **VERIFIED**; the pass's behaviour **NOT DRIVEN** |
| **the process's exit code** | nothing in this tree carries one | **NOT DRIVEN — the next gate's first figure** |

**AND THE DRIVES, PRINTED SO A PASS WITH A SHELL RUNS THEM UNCHANGED:**

```
T=$(mktemp -d)                                     # outside the repository
cd "$T"
cat > drive.mjs <<'EOF'
const { storeCreate } = await import('/media/ryanr/Shared Files/Projects/Provident-Storeroom/bindings/js/index.mjs');
const tag = process.argv[2];
const store = storeCreate({ journalLength: 16, listeners: [] });
store.listen('h', [['a']]);
let reached = 'not-reached';
process.on('exit', (c) => console.log(`${tag} exit=${c} last-statement=${reached}`));
if (tag === 'A') store.register('h', async () => { throw new Error('A-rejected'); });
if (tag === 'B') store.register('h', async () => { /* resolves */ });
if (tag === 'C') store.register('h', () => { throw new Error('C-sync-threw'); });
if (tag === 'D') store.register('h', async (address) => {
  await null;                                       // one microtask hop, and nothing else
  reached = 'post-await-write';
  store.write(['b'], 'mem', 1);                     // names a commit? runs a pass?
});
reached = 'before-write';
const record = store.write(['a'], 'mem', 1);
reached = 'after-write-returned';
console.log(`${tag} record=${JSON.stringify(record)}`);
await new Promise((r) => setImmediate(r));          // let the microtask queue drain
reached = 'after-drain';
EOF
node drive.mjs A; echo "A exit=$?"
node drive.mjs B; echo "B exit=$?"
node drive.mjs C; echo "C exit=$?"
node drive.mjs D; echo "D exit=$?"
```

**EACH ARM MUST RECORD, AND NOTHING IN THIS TREE PREDICTS:** the exit code · the whole of `stderr` · **whether the write's record
was returned** · and **whether the throwable surfaced at the `write` call, at the microtask drain, or never.**

**AND THE ADDON THE DRIVES NEED IS BUILT**: `bindings/js/build/Release/storeroom_js_binding.node` is present at this `HEAD` (glob,
one path), so **no build is owed** — `§21.7`'s drives used the `1.11.0` cut's binary, and this `HEAD` is `1.12.0`, so **the
next pass must state which binary it drove and its mtime.**

---

### §22.8 · THE ARMS — priced, none chosen, none ranked

**No class is claimed** (`D-124` item 3's discipline). Each **Moves** cell names the declared set at `path:line`.

| `#` | the shape | what moves | what it contradicts |
|---|---|---|---|
| **(1a)** | **keep the invocation synchronous; `await` each returned promise before the next invocation** | `deliver`'s signature `delivery.mjs:105`; the loop `:184`–`:208`; `terminalArm`'s call `:987`; the kernel's terminal instant `kernel-attempt.mjs:452` → `:550`; `runAttempt` → `constraints.mjs:817`, `:1008`; `write`'s and `delete`'s return types `index.d.ts:1121`, `:1140`; **`§2.7` item 2's word `SYNCHRONOUS`** (`surface.md:1655`); `D-72`'s nesting law (`surface.md:1770`–`:1777`); **the commit bracket `state.mjs:811`–`:845`**; `D-73`'s throw channel (`surface.md:1793`–`:1803`) — the caller's `write` could no longer receive the body's error; `convenience.test.mjs:349`; the **21** files of `AL-28` | **`DD-22`'s refused row** (`contract.md:602`) → a fresh ACTIVE row + bounded amendment. **Member set unmoved (15) · status set unmoved (22) · record's four members unmoved · `pending` unmoved** |
| **(1b)** | **keep it synchronous; `catch` the returned promise and report it somewhere** | `delivery.mjs:206`; **a failure channel the package does not own** — `DD-12`'s single crossed form is the store's (`contract.md:590`–`:591`; `surface.md §2.5`); if a status: `src/error.rs:171`–`:196` **`22 → 23`** and `index.d.ts:421`–`:443` | **`DD-23`** (`contract.md:603`; `surface.md:1667`–`:1669`) **and `DD-12`'s single-form rule** — two refusals, two reversals. **Member set unmoved · record unmoved** |
| **(2)** | **make delivery asynchronous** — `write`/`delete` answer a promise, or gain an async arm, or the delivery moves after the write returns | as (1a), **plus**: `D-117`'s order loses DELIVER from `runAttempt`; `D-125` item 1's **four registration instants** become async (`surface.md:1728`); `D-104`'s repair-leg channel loses its synchronous hand-off (`state.mjs:372`–`:388`); an async arm adds a member → `index.d.ts` **`15 → 16`** | **the largest move on the board:** `DD-22` item 2, `D-72`, `D-73`, `D-117`, `D-125`, `D-104`, and 21+ cells. **The store is untouched — `A57` stands and `triggered` keeps its shape** |
| **(3)** | **accept async bodies and forbid them** — a class refusal at `register` | `PAR-JS-12`'s `the values OUTSIDE it` and `the declared answer` cells (`.reflow-backup/…/parameter-semantics.md:464`–`:465`); `surface.md §2.4` item 5's spelling (`:419`–`:424`); `index.d.ts:572`–`:573`, `:1325`; the construction's step-2 refusal (`frame.mjs:45`–`:47`) | **no status minted** — the `TypeError` form is already declared (`AL-7`), so **`CODES` stays 22 and the member set stays 15** — **but the class test is the hazard the corpus refuses** (`state.mjs:1005`–`:1007`; `delivery.mjs:29`–`:40`; `DD-34`). **It refuses the request; it does not support it** |
| **(4)** | **a new member, or a second registration form, for async bodies** | the instance's member set **`15 → 16`** (`index.d.ts:1032`–`:1416`) **or** a third position on `register` (`DD-46`'s no-arity-check rule, `contract.md:628`; `§2.4` item 5's fixed spelling); `surface.md §2.4` item 9 (f)'s enumeration; **the census roster** (`strata/envelope.md:326` records the 29 files re-derived to the member count); `typecheck/consumer-fixture.ts` and the **staged declaration copy**, re-staged and never hand-edited | **`surface.md §2.9`'s namespace unmoved** (`storeCreate` alone). **Status set unmoved · record unmoved · `A112`/`D-72`/`D-73` untouched** |
| **(5)** | **declare the disposition as the CALLER's** — the returned value stays unread and one guide sentence says *"attach your own handler"* | **nothing.** Zero clause, zero cell, zero member, zero status, zero record | **none — and that is the finding: a priced arm that moves nothing.** It answers *"no crash"* and not *"awaited"*, *"ordered"* or *"observable"* |

**THE TWENTY-ONE FILES `AL-28` COUNTS, PRINTED SO THE FIGURE IS CHECKABLE AND NOT ASSERTED.** Each carries
*"Every drive … is synchronous, so this is total"* around a `try`/`catch` that answers a throw as a value:
`tests/e2e/pair-application-rule.test.mjs:128` · `in-commit-restart.test.mjs:64` · `resolution-log.test.mjs:88` ·
`direct-pass-restart.test.mjs:80` · `repair-listener-delivery.test.mjs:92` · `downstream-claims.test.mjs:96` ·
`def-ae-restore-mark.test.mjs:61` · `creation-sweep.test.mjs:68` · `direct-pass-commit-invariant.test.mjs:77` ·
`cross-kind-handle-only.test.mjs:60` · `tests/unit/js-constraints/resolution-log.test.mjs:50` ·
`repair-restart-state-machine.test.mjs:74` · `op-free-repair-credit.test.mjs:81` · `external-commit.test.mjs:64` ·
`registration-write-route.test.mjs:124` · `refused-reversal-restore.test.mjs:63` · `registration-repair-existence.test.mjs:181` ·
`restore-file-save.test.mjs:48` · `registration-own-members.test.mjs:132` · `repair-in-commit.test.mjs:63` ·
`creation-sweep-gate4.test.mjs:64`. **A REJECTION IS NOT CAPTURED BY `try`/`catch`, so every one of those helper docblocks becomes
false the moment a body can settle later.**

**TWO PRICES THESE SHAPES SHOW, STATED AS PRICES AND NOT AS ADVICE.**

- **`(1a)`, `(1b)` and `(2)` each collide with a DIFFERENT declared sentence; `(3)`, `(4)` and `(5)` collide with none.** The first
  three move the **mechanism**; the last three move a **sentence or a member**. **So the request's fate turns on one question
  before any price is meaningful** (`AL-1`), and no price in this table resolves it.
- **`D-71`/`D-76` and the closed record bound every arm that would answer *"did the body settle?"*.** `§2.7` item 9 (ii) is
  explicit: *"The record's member set is UNMOVED … no member carries a listener's commit, and neither `triggered` nor the log gains
  one"* (`surface.md:1757`–`:1758`). That is `AL-5`, and it is the `P-3` `C-25` class — a ruling away, four times landed.

---

### §22.9 · THE CORPUS'S OWN PRECEDENT — and the synchronous-graph law, stated precisely

**`§20` (`strata/research.md:1532`–`:1884`) is the prior intake that touches an asynchronous boundary**, and it is cited here
rather than re-derived: **`K-11`** (`:1748`) records that the shipped graph carries **no top-level `await`** — and **`§20.5`'s
`Q-4`** (`:1821`) asked what would keep it that way, the answer being **no rule at that date**. **`D-129` item 5** took the
proposal, and the law now sits at **`docs/specs/storeroom-js/contract.md §3.1`'s foot** (`:2379`) — enforced by the `O3`
install-shape `require` cell (`tests/e2e/require-route-install.test.mjs:6`; the sentinel `blind-cjs-interop.test.mjs:216`).

**STATE PRECISELY WHETHER AN ASYNC-LISTENER SEAM VIOLATES THAT LAW. IT DOES NOT — AND THE CORPUS'S OWN WORDS ARE THE REASON.**

1. **The law's SUBJECT is the load-time module graph.** `contract.md:2379`, verbatim: *"THE ENTRY'S LOAD-TIME MODULE GRAPH IS
   SYNCHRONOUS: **no module the entry reaches at load** may carry a top-level `await` **or any other asynchronous module
   evaluation**"*; `bindings/js/index.mjs:10`–`:12` says the same. **A caller-supplied `async` function is not a module the entry
   reaches at load, and a runtime promise is not an asynchronous module evaluation.**
2. **The corpus has ALREADY drawn that line, inside the law's own clause.** The alternative instrument — a static token scan — was
   **priced and not taken** because *"a text scan cannot distinguish a **top-level `await`** from an **`await` inside an `async`
   body** without parsing JavaScript"* (`contract.md:2379`). **The corpus names the two cases and reaches only the first.**
3. **WHAT WOULD VIOLATE IT:** an `await` at the top level of any of the `15` shipped `.mjs` files — e.g. a scheduler written as a
   top-level `await` in `index.mjs` or a new entry part — which would convert a working `require` into
   `ERR_REQUIRE_ASYNC_MODULE`. **What would not:** a `queueMicrotask`, a `Promise.resolve().then(…)` inside a function body, or an
   `async` listener's own body.
4. **THIS IS THE SECTION'S ONE ANTICIPATED MISREADING, NAMED SO IT IS NOT TAKEN.** A reader who assumes the sync-graph law forbids
   this request is reading a law about **module evaluation** as a law about **function invocation**. **It does not forbid it.**
   What it does mean for arm `(2)` is that an async delivery built on a load-time asynchronous evaluation in a shipped graph file
   would break the `require` route, and the `O3` cell is the instrument that would redden.

**AND THE OTHER THREE PRIOR INTAKES TOUCH NOTHING OF THIS REQUEST.** `P-1` is a readout's tier, `P-2` a creation's editing action,
`P-3` change-detection (`strata/proposals.md:18`, `:259`, `:581`); `§21` is a value predicate on the firing set
(`strata/research.md:1886`–`:2208`). **The nearest shapes are `P-3`'s `§5 (c)` and `(e)`** (`:763`, `:765`) — an opt-in verb and a
caller's-act sentence — which are the precedents arms `(4)` and `(5)` stand on. **No prior intake has priced asynchronous
delivery: the pricing stands once, at `DD-22`'s `alt` cell (`contract.md:602`), and it is one sentence long.**

---

### §22.10 · OPEN QUESTIONS — the record does not answer these, and this section supplies no default and no recommendation

1. **`AL-1` — WHAT DOES "SUPPORT" MEAN?** No-crash · awaited-before-the-next-invocation · ordered against `A112` ·
   observably-settled-to-the-caller. **Four words admit all four; the four are four different arms; the record names none.**
2. **`AL-2` — IS A LISTENER'S REJECTION A REFUSAL (a status), a warning, or silence?** No member of the closed set carries it
   (`src/error.rs:171`–`:196`); `DD-12` admits exactly one crossed failure form and it is the **store's** (`contract.md:590`–`:591`);
   `DD-23` refuses *"catching and reporting a throwing body"* on the ground that the channel does not exist.
3. **`AL-3` — IF IT IS A STATUS: WHICH RANK, AND WHICH CHANNEL?** A new rank `23` beside `FileImageRefused` (`src/error.rs:195`);
   **or `ListenerBodyThrew` at rank `21` widened** (`:193`), which is the byte-cheap alternative the `Q-4` precedent already
   priced (`strata/envelope.md:59`) and `D-124` item 2 answered as *mint*; **or no status at all**, which leaves a caller unable to
   tell a rejected body from a resolved one.
4. **`AL-4` — IS A POST-`await` LISTENER WRITE IN SCOPE, AND WHAT DOES IT NAME?** Today it names no commit and opens one **by
   `D-45`'s superseded depth fallback** rather than by `D-46`'s declared rule (`AL-22`, `AL-23`). Whether that is the intended arm,
   a declared absence, or a defect is stated nowhere.
5. **`AL-5` — MAY THE WRITE'S ANSWER CARRY DELIVERY OUTCOMES?** `D-71`'s *"the caller does not need to know"* is a **permission** and
   `D-76` item 1 withdrew the hardened prohibition — but `§2.7` item 9 (ii) declares the record's member set **UNMOVED**
   (`surface.md:1757`–`:1758`), so any such arm is a fifth member on a four-member record (`delivery.mjs:1018`).
6. **`AL-6` — DOES THE ORDERING LAW SURVIVE A SUSPENSION?** `A112` orders the layers *"once every constraint has passed"*
   (`surface.md:1726`) and `D-72` declares the nesting *"every level a **synchronous call on one thread**"* with *"`A`'s whole chain
   completes before the window that fired it invokes its next listener"* (`surface.md:1770`–`:1777`). **If a body suspends, does
   the window wait for its chain, or does the next listener run at the suspension?** No clause answers — and `A112`'s conformance is
   itself `OWED` on this branch (`AL-17`).
7. **`AL-7` — WHAT DOES "ONE INVOCATION PER DISTINCT HANDLE" MEAN FOR A BODY THAT HAS NOT SETTLED?** Rule 3 and the loop count
   **invocations** (`surface.md:394`–`:398`; `delivery.mjs:165`) and say nothing of completions or of a second body arriving while
   the first is suspended.
8. **`AL-8` — WHICH WINDOW DOES A SUSPENDED BODY'S REGISTRATION BELONG TO?** The snapshot is taken *"BEFORE THE FIRST INVOCATION"*
   and a mid-window registration *"TAKES EFFECT AT THE NEXT TRIGGER, and at no element of this one"* (`delivery.mjs:107`–`:121`).
   **A body that suspends and then registers has left the window it was invoked in** — is that "during the window" or "at the next
   trigger"? Undeclared.
9. **`AL-9` — DOES THE REQUEST REACH THE FOUR REGISTRATION INSTANTS?** `D-125` item 1 delivers at `storeCreate`, a boot,
   `addConstraint` and a re-arm (`surface.md:1728`), and a body's throw **there** already refuses the act at rank `21`
   (`surface.md:1675`–`:1678`). **Does an async body at those four instants refuse the act, defer the act's answer, or nothing?**
10. **`AL-10` — IS THE SYNCHRONOUS-GRAPH LAW READ AS REACHING A RUNTIME INVOCATION?** `§22.9` states that its subject is the
    load-time module graph and that a caller's `async` body is outside it — **and that reading is this audit's and not the
    architect's.**
11. **`AL-11` — WHICH VERBS ARE IN SCOPE?** `write` alone, or also `delete` and a `rollback`'s judgement, which deliver through the
    same `deliver` (`delivery.mjs:984`–`:987`; `constraints.mjs:1008`)?
12. **`AL-12` — THE RELEASE CLASS.** `MINOR` by `PUB-DD-9`'s *"a fix inside the declared surface"* precedent, or `MAJOR` because a
    returned value's meaning moves? **No class is claimed here** — `D-124` item 3's discipline.

---

### §22.11 · SUMMARY

**TOKEN: `SPECIFIED-REFUSED`.** The record answers this request in **three sentences and no fourth**, and **two of them are
refusals with a price**: the invocation is **synchronous with its return value unread** (`PAR-JS-12`,
`.reflow-backup/…/parameter-semantics.md:463`; `surface.md:1654`, `:1716`); **an async invocation is REFUSED and priced as
available with a fresh ruling** (`DD-22`, `contract.md:602`); and **a throwing body is declared uncaught, with "catching and
reporting" REFUSED and priced on the absence of a failure channel the package does not own** (`DD-23`, `contract.md:603`;
`surface.md:1667`). **So the request does not lack a subject in the record — it finds one declared sentence it would contradict and
one it would take, and a pricing six words long.**

**WHAT THE RECORD ANSWERS.** The invocation's instant and its window (§22.1) · the ordering law and its `OWED` measurement
(§22.2) · the five membership rules (§22.3) · `A57`'s ownership split and why no arm can move the invocation into the store
(§22.4) · the two declared refusals (§22.5) · six arms priced and none chosen (§22.8) · the synchronous-graph law's true subject and
the misreading it invites (§22.9).

**WHAT IT REFUSES TO ANSWER, NAMED AS SILENCE.** **(S-1)** what "support" means (§`AL-1`) · **(S-2)** a rejection's disposition
(`AL-2`, `AL-3`) · **(S-3)** whether a post-`await` write is in scope and what it names (`AL-4`) · **(S-4)** whether the answer may
carry delivery outcomes (`AL-5`) · **(S-5)** whether `A112`/`D-72` survive a suspension (`AL-6`) · **(S-6)** what "one invocation"
means for an unsettled body (`AL-7`) · **(S-7)** a suspended registration's window (`AL-8`) · **(S-8)** the four registration
instants' fate (`AL-9`).

**THE MEASUREMENT'S STATUS: `NOT DRIVEN`.** **This channel held no shell.** The instrument is written down and unrun
(`§22.7`), the addon it needs is built at this `HEAD` (`bindings/js/build/Release/storeroom_js_binding.node`), and **not one figure
of this section is a run transcript.** **THIS SECTION DECIDES NOTHING, SCOPES NOTHING, PRICES NOTHING AND OPENS NO UNIT.**

---

### §22.12 · POSTSCRIPT — THE OWNER'S ANSWER AND THE MEASUREMENT, NOW TAKEN (`DRAFT`, supervisor's own pass, `2026-11-17`)

**WHAT THIS POSTSCRIPT IS, AND WHAT IT IS NOT.** `§22` above is `role_l0_research`'s text of this date, returned to the supervisor
for landing because **that channel held no write operation**; it is landed here **unamended**, its own `NOT DRIVEN` markers
standing as its author left them. **This postscript records two things that did not exist when it was written** — the owner's
answer to `AL-1`, and the four drives `§22.7` printed but could not run — and **it re-prices no arm, decides no `AL` question and
opens no unit.** Where it and `§22` disagree, **this postscript is the later read of the same bytes and names the disagreement
rather than absorbing it.**

**ENVIRONMENT OF THE DRIVES, PRINTED SO NOTHING IS SWEPT IN.** Node `v24.20.0`; `HEAD` `e3136af`; the addon the drives reached is
`bindings/js/build/Release/storeroom_js_binding.node`, **`1,456,712` bytes, mtime `2026-11-17 22:46:21.806 −0600`**; the entry was
imported **by absolute path through the checkout rung**; every drive ran in a `mktemp -d` directory **outside the repository**, so
**no byte of the tree was written and no file-tier version exists to have moved.** Each store was
`storeCreate({journalLength: 16, listeners: []})` — `mem` tier, no `filePath`, hence **no file I/O on any arm**.

#### (1) THE OWNER'S ANSWER TO `AL-1` — **ARM `(2)`, GIVEN `2026-11-17`**

**The question `AL-1` put was *what "support" means*, and the owner has answered it, verbatim:**

> **"Await listeners before the write answers"**

**What that fixes, in `§22.8`'s own numbering:** **the subject of the next gate is arm `(2)` — delivery made genuinely
asynchronous, with the write's answer moving to a promise or to an async arm**, and **not** `(1a)` in-place awaiting, not
`(1b)` catch-and-report, not `(3)` refusal, not `(4)` a new member or registration form, and not `(5)` the caller's own
disposition. **`§22.8`'s other five arms are not withdrawn by this sentence — they are simply not the chosen shape**, and
**`§22.8`'s own warning stands: arm `(2)` is the largest move on the board** (it names `DD-22` item 2, `D-72`, `D-73`, `D-117`,
`D-125`, `D-104` and the twenty-one cells of `AL-28`). **`AL-1` is answered; `AL-2`…`AL-12` are NOT** — in particular **`AL-5`
(the answer's member set) and `AL-6` (whether `A112`/`D-72` survive a suspension) are now load-bearing on the chosen arm**,
because an answer that carries delivery outcomes and a window that waits for a suspended chain are the two questions that decide
what `write` returns.

#### (2) THE FOUR DRIVES — **RUN, WITH THEIR OUTPUT, `2026-11-17`**

**The instrument is `§22.7`'s, run unchanged except that every arm also installed `process.on('unhandledRejection')` and printed
through it, so that the rejection's *instant* is observable as well as its fatality; the fifth drive below removes that handler
and is the fatality's own measurement.**

```
T=$(mktemp -d); cd "$T"
cat > drive.mjs <<'EOF'
const { storeCreate } = await import('/media/ryanr/Shared Files/Projects/Provident-Storeroom/bindings/js/index.mjs');
const tag = process.argv[2];
const store = storeCreate({ journalLength: 16, listeners: [] });
store.listen('h', [['a']]);
let reached = 'not-reached';
const log = (...a) => console.log(`[${tag}]`, ...a);
process.on('exit', (c) => console.log(`[${tag}] exit=${c} last-statement=${reached}`));
process.on('unhandledRejection', (e) => log('UNHANDLED', e && e.message));
if (tag === 'A') store.register('h', async () => { throw new Error('A-rejected'); });
if (tag === 'B') store.register('h', async () => { /* resolves */ });
if (tag === 'C') store.register('h', () => { throw new Error('C-sync-threw'); });
if (tag === 'D') store.register('h', async (address) => {
  await null;
  reached = 'post-await-write';
  const rec = store.write(['b'], 'mem', 1);
  log('post-await write record=', JSON.stringify(rec).slice(0, 160));
});
reached = 'before-write';
let record, thrown;
try { record = store.write(['a'], 'mem', 1); } catch (e) { thrown = e; }
reached = 'after-write-returned';
log('thrown=', thrown && (thrown.message || thrown.status));
log('record=', record ? JSON.stringify(record).slice(0, 200) : String(record));
await new Promise((r) => setImmediate(r));
reached = 'after-drain';
EOF
for arm in A B C D; do echo "=== ARM $arm ==="; node drive.mjs $arm 2>&1; echo "[shell exit=$?]"; done
```

**OUTPUT, VERBATIM** (records truncated at 200 characters by the drive itself; the ellipsis is the drive's, not this file's):

```
=== ARM A ===
[A] thrown= undefined
[A] record= {"op":{"opId":"op-1","kind":"write","address":["a"],"tier":"mem","before":{"present":false},"after":{"present":true,"value":1},"seq":1,"compacted":false},"watched":[["a"]],"triggered":[{"handle":"h","
[A] UNHANDLED A-rejected
[A] exit=0 last-statement=after-drain
[shell exit=0]
=== ARM B ===
[B] thrown= undefined
[B] record= {"op":{"opId":"op-1",…
[B] exit=0 last-statement=after-drain
[shell exit=0]
=== ARM C ===
[C] thrown= C-sync-threw
[C] record= undefined
[C] exit=0 last-statement=after-drain
[shell exit=0]
=== ARM D ===
[D] thrown= undefined
[D] record= {"op":{"opId":"op-1",…
[D] post-await write record= {"op":{"opId":"op-2","kind":"write","address":["b"],"tier":"mem","before":{"present":false},"after":{"present":true,"value":1},"seq":2,"compacted":false},"watch
[D] exit=0 last-statement=after-drain
[shell exit=0]
```

**AND THE FIFTH DRIVE — THE FATALITY, WITH NO HANDLER INSTALLED.** Same entry, same `mem` store, one `async` body that throws:

```
T=$(mktemp -d); cd "$T"
cat > fatal.mjs <<'EOF'
const { storeCreate } = await import('/media/ryanr/Shared Files/Projects/Provident-Storeroom/bindings/js/index.mjs');
const store = storeCreate({ journalLength: 16, listeners: [] });
store.listen('h', [['a']]);
store.register('h', async () => { throw new Error('A-rejected-NO-HANDLER'); });
const r = store.write(['a'], 'mem', 1);
console.log('write answered, record.op.opId =', r.op.opId);
await new Promise((res) => setImmediate(res));
console.log('survived the drain');
EOF
node fatal.mjs; echo "[shell exit=$?]"
```

```
write answered, record.op.opId = op-1
[shell exit=1]
[stderr]
file:///tmp/…/fatal.mjs:4
store.register('h', async () => { throw new Error('A-rejected-NO-HANDLER'); });
                                        ^

Error: A-rejected-NO-HANDLER
    at file:///tmp/…/fatal.mjs:4:41
    at file:///…/bindings/js/src/entry/delivery.mjs:206:42
    at value (file:///…/bindings/js/src/entry/state.mjs:825:18)
    at externalCall (file:///…/bindings/js/src/entry/state.mjs:340:45)
    at deliver (file:///…/bindings/js/src/entry/delivery.mjs:206:7)
    at terminalArm (file:///…/bindings/js/src/entry/delivery.mjs:987:5)
    at [provident-storeroom.terminal-arm] (file:///…/bindings/js/index.mjs:1790:14)
    at settleArm (file:///…/bindings/js/src/entry/kernel-attempt.mjs:550:69)
    at passInCommitScope (file:///…/bindings/js/src/entry/kernel-attempt.mjs:452:5)
    at file:///…/bindings/js/src/entry/kernel-attempt.mjs:256:16

Node.js v24.20.0
```

**`survived the drain` DID NOT PRINT, AND THE SHELL EXIT CODE IS `1`.** **`write` HAD ALREADY ANSWERED** — its record is on stdout
above the crash — **and the process then died of the listener body's rejection.** *(`[shell exit=N]` is the shell's echo of `$?` after
`node` exited; the `[A] exit=0` lines inside the earlier output are the drive's own `process.on('exit')` handler printing, not the
shell's figure.)*

#### (3) THE FOUR FINDINGS, AND WHICH `§22` CLAIMS THEY MOVE

| id | what the drive shows | `§22` claims moved |
|---|---|---|
| **`M-1`** | **A synchronous throw is the declared channel and behaves as declared.** `write` throws **the body's own error object** (`C-sync-threw`) and returns **no record** (`record= undefined`); the process survives. | **CONFIRMS** `D-73`/`K-11`'s synchronous half (`surface.md:1791`–`:1815`), re-measured on **this** HEAD at `1.12.0`, where the clause's own figure was `2026-10-29`. |
| **`M-2`** | **An `async` body's rejection never reaches the caller, and kills the process after the caller has been answered.** With a handler: `thrown= undefined`, the record is returned, **and the rejection surfaces after the write returned** (`[A] UNHANDLED` prints after the record line). Without a handler: **exit `1`**, the body's error as an uncaught exception, `survived the drain` never printed. | **PROMOTES `K-17` from `EXTERNAL, NOT DRIVEN` to `DRIVEN`** — an unhandled rejection on this floor is **fatal**, measured, not carried from Node's documented default. **REFUTES `§2.7` item 10's *"the caller's write is UNANSWERED"* for an async body**, exactly as `§22.4`'s prediction said it would: *the caller IS answered*, and the failure lands on the process instead. **`K-11`'s asynchronous half moves from `DERIVED` to `DRIVEN`.** |
| **`M-3`** | **An `async` body that resolves leaves statements to run after the window has closed and after `write` returned.** Nothing refuses it, nothing reports it, and no cell observes it. | **CONFIRMS `K-14`** — the instant `§2.7` item 2 *"does not declare"* (`surface.md:1660`–`:1662`) **is reachable today by any caller**. |
| **`M-4`** | **A post-`await` listener write LANDS, and lands as an ordinary second operation.** `store.write(['b'], 'mem', 1)` inside the body after one `await null` answers a `WriteRecord` with `op-2`, `seq` `2`, `before:{present:false}`, `after:{present:true,value:1}` — the same shape an outside call gets. | **PROMOTES `AL-23`'s mechanism to a measured outcome for the write itself**; **`AL-22`'s bracket finding is NOT contradicted but NOT tested either** — this drive carried **no constraint and no `file` tier**, so **whether that write's own pass ran, and whether the constraint pass ran for it, is `OWED` a second drive** with a constraint registered at `['b']` and a comparison of `watched`/`triggered` across the two ops. **It is not green and it is not red; it is unmeasured, named here so it is not read as settled.** |

#### (4) WHAT THE POSTSCRIPT DOES NOT SETTLE

- **`A112`'s conformance stays `OWED`** (`strata/brief.md:344`–`:358`; `K-16`). These drives delivered a `mem`-tier write with **no
  constraint registered**, so **they do not touch the constraints-before-listeners order at all** and **cannot turn its red green
  or its green red.**
- **`AL-2`…`AL-12` stand unanswered**, and the owner's choice of arm `(2)` makes **`AL-5`** and **`AL-6`** decide more than they did
  an hour ago: an answer that carries delivery outcomes, and a window that waits for a suspended chain, are the two questions that
  fix what `write` returns.
- **TypeScript assignability of an `async` function to `Listener = (address: Address) => void`** (`index.d.ts:573`) was **not**
  exercised: `tsc` was not run. **The three typecheck legs remain as research `§22` left them — `NOT DRIVEN`.**
- **`AL-10` — whether the synchronous-graph law reaches a runtime invocation — is the architect's reading to give**, and `§22.9`
  states the audit's reading as an audit's. **Nothing in this postscript moves it.**

**THIS POSTSCRIPT DECIDES NOTHING, SCOPES NOTHING, RE-PRICES NOTHING AND OPENS NO UNIT. The gate-1 pass on the owner's chosen arm
is a separate delegation, and this record is one of its inputs.**
## §23 · The six-key config — a save the package performs, and a channel that carries listener return values (`2026-11-17` · `e3136af`)

**PROVENANCE, AND ITS LIMIT — WHAT THIS SECTION OWES ITS READER.**

1. **`role_l0_research`**, this date, **read-only and shell-less**: four file operations at a time. **It ran no `node`, no `git`, no `mktemp` and no `import()`**, and **it held no write channel**, so `strata/**` stands untouched and **this section is returned as text for the supervisor to land.** `§20.4`'s convention is repeated verbatim (`strata/research.md:1803`).
2. **`HEAD` IS VERIFIED BY FILE-READ AND NOT BY `git`**: `.git/HEAD:1` reads `ref: refs/heads/main`; `.git/refs/heads/main:1` reads `e3136afdb351515b41bc6c82d0e4c17e392eeb01`. **`HEAD` `e3136af` — `VERIFIED`, by a file-read.**
3. **Date `2026-11-17`.** The tree carries `strata/research.md §20`/`§21`/`§22`/`§22.12`, `strata/proposals.md P-3`/`P-4` and `strata/decisions.md D-127`…`D-130` as earlier passes' uncommitted work. **No byte of any of them is read as this section's own**, and where this section and one of them disagree the disagreement is **named**.
4. **NOT ONE FIGURE IN THIS SECTION IS DRIVEN.** Every one is a `read-at-path:line`; every arm that would need an exit code is marked **`NOT DRIVEN`**.

**THE REQUEST, VERBATIM FROM THE PRODUCT'S OWNER, `2026-11-17`** — as handed to this pass, quoted whole at `§23.0` below. **It is TWO subjects and it says so by its own two bullets**; they collide with **different declared sets**, so each is audited in its own part.

**ITS INTAKE, AND BY WHOSE CALL.** A **feature request** from the product's owner, filed under the intake rule that a note or a feature request goes to `role_l0_research`. **No clause is being violated by the tree** — this is not a defect report. **The gate-1 question is *what the record declares about this, what the runtime does today, and which declared set each candidate reading would move*.** **Nothing here opens a unit, a pin or a contract directory, and no arm is chosen, ranked or recommended.**

**THE TWO RULES THAT BIND EVERY LINE.** **First: where the record is silent, this section says SILENT — an absence is never a prohibition and never a permission.** **Second: a figure carried from another document is not a measurement.** The closed status set is **twenty-two** (`src/error.rs:171`–`:196`, `CODES: [&str; 22]`) **plus the one new member `D-130` has ruled and nobody has yet named** (`strata/decisions.md:6749`), and **the instance declares fifteen own members** (`bindings/js/index.d.ts:1047`, `:1049`, `:1087`, `:1121`, `:1140`, `:1148`, `:1213`, `:1228`, `:1273`, `:1287`, `:1292`, `:1325`, `:1327`, `:1329`, `:1416`). **Both were re-read at those bytes for this section; several upstream documents still print twenty, sixteen, twelve and fourteen, and they are listed at `§23.10`.**

**AND ONE ENVIRONMENT FACT OF THE TREE'S OWN STATE, SO A LATER READER DOES NOT READ IT AS A SUCCESSIVE STATE OF ONE PASS: `docs/specs/storeroom-js/` carries `surface.md` and `contract.md` only, and `docs/specs/storeroom-native/` carries `contract.md` only** (glob, this date). **`parameter-semantics.md`, `store-model.md`, `write-and-read.md` and `seams-and-lifecycle.md` are ABSENT.** The first survives at the gitignored path `.reflow-backup/docs/specs/storeroom-js/parameter-semantics.md`; **the other three have no copy in this tree.** **Where a claim's home is one of those three, this section says so and marks the claim `UNVERIFIABLE` rather than reasoning from what the file probably says.**

---

### §23.0 · The request, in its own words, split at its own seam

> Add two optional ones:
> - saveCall, which is a (async optional) function that the package invokes when saving instead of writing to the filePath, expecting a return of `True` or a verbose error log. This will provide more flexibility in implementation for ex. saving to an object-store DB, or for the future WASM version to choose different local storage methods
> - channel, which is an interface function used for batching the writes when communicating from backend<-->frontend. If a channel is registered, the store will pass the listeners and their return values with the write receipt so that it can communicate the events (example use case: server-side listener fires when writing a new tab, and makes an external DB read to get the tab data. Result is passed to channel as {listenerHandle: <data>, ...}. (End of package scope) Channel function returns data to client so that it can load the data.)

**THREE THINGS THE REQUEST'S OWN TEXT DOES NOT SAY, NAMED SO THEY ARE NOT INVENTED.** **(1) It never says WHERE either key lives** — a `cfg` key, an instance member, a module export or a position on an existing verb. *"Add two optional ones"* has no antecedent noun in the sentence that follows it. **(2) It never says what `saveCall`'s `True` is** — a boolean, a truthy value, or the store's own outcome shape. **(3) It never says whether `saveCall` REPLACES the `filePath` or stands beside it** — *"instead of writing to the filePath"* reads as replacement, and the same sentence keeps `filePath` in its own text. **Each is an open question and each is filed at `§23.13` without a default.**

---

### §23.1 · PART A (i) — what `commit_file` carries and returns, and whether any caller can supply the bytes

**(a) THE ENTRY'S WHOLE SURFACE IS ONE POSITION, AND IT IS AN OP ID OR ITS ABSENT CARRIER.** `bindings/js/src/facade.rs:1034`–`:1035`:

```rust
1034: #[napi(js_name = "commitFile")]
1035: fn verb_commit_file(env: Env, receiver: This<Object<'_>>, op_id_pos: JsVal<'_>) -> NapiRet<'static> {
```

and its own declaration, `facade.rs:1028`–`:1030`, verbatim: *"**NO POSITION IS MINTED AND NO ARITY MOVES**: the absent carrier is one of the six DECLARED VALUES of the one position this entry has, so `commitFile`(1) counts one before and one after, the census stays `10 + 2 = 12` and `4 + 12 = 16`"*. **The two readings are both keys and neither is a payload** — `:1064`–`:1065`:

```rust
1064:             JsOpIdArg::Str(token) => store.commit_file(token)?,
1065:             JsOpIdArg::Absent => store.save_state()?,
```

**So the entry carries an IDENTITY and returns `undefined`.** `§2.11` clause 8 (`docs/specs/storeroom-js/surface.md:1915`) says it in the declared words: *"`"commitFile"` IS THE EIGHTH VERB OF THIS SET … its one argument is an op id and its answer is `undefined`"*.

**(b) THE STORE'S FUNCTION CARRIES THE SAME ONE THING.** `src/store.rs:1581` is `pub fn commit_file(&mut self, op_id: &str) -> Result<(), StoreError>`. **Its answer type is `()` on the success arm and a `StoreError` on the refusal arm — no image, no bytes, no handle.**

**(c) THE BYTES ARE COMPOSED INSIDE THE STORE AND NOWHERE ELSE, FROM THE STORE'S OWN STATE.** `store.rs:1516` is `let text = json::encode(&self.file_snapshot());`, and `file_snapshot` (`:1482`–`:1492`) walks **the register's `file`-tier anchors** — `pair_at(self.register, &key, Tier::File)` → `assemble_at_tier(reference, Tier::File)`. **The caller's op id selects which version of THAT state gets named `saved`; it never selects what is in it.** The write itself is a sibling-and-rename, `:1525`–`:1527`:

```rust
1525:         let temp = format!("{}.snst-commit-{}", self.file_path, std::process::id());
1526:         let committed = std::fs::write(&temp, text.as_bytes())
1527:             .and_then(|_| std::fs::rename(&temp, &self.file_path));
```

**(d) SO: CAN A CALLER EVER SUPPLY THE BYTES? NO — AND THERE IS NO SECOND ROUTE IN THE TREE.** The store names two keys on its one writer and no third: `commit_file` (op-keyed) and `save_state`/`save_file_delta` (state-keyed), `store.rs:1613`–`:1618` — *"**the store writes on TWO keys and no third**"*. **`save_file_delta`'s subject is `&[]`, the register** (`:1620`–`:1622`), **and its guard is an IMAGE comparison, `:3418`–`:3421`.** **`read_file_image` is *"THE ONE PLACE THE BYTES AT `file_path` ARE READ AND DECODED"*** (`:1714`). **No addon entry, no position, no symbol channel and no package act hands the store a byte to write.** **The census of write-producing acts is `2`, and both compose from `self`.**

**(e) AND THE ONE HONEST CAVEAT: `commit_file` CARRIES NO EMPTY-PATH GUARD.** `:1581`–`:1611` tests the journal entry, `save_owed` and `saved`, and **nothing tests `self.file_path.is_empty()`** — while the sibling state-keyed save does (`:3411`–`:3413`). **What happens when a `file`-tier op reaches `write_file` on a path-less store is therefore a reading of the bytes and `NOT DRIVEN`**: `file_path` is the empty `String` where `cfg.filePath` was absent (`:690`, `:730`), so `:1525`'s sibling name is `".snst-commit-<pid>"` and `:1527`'s rename target is the empty path. **No clause of the tree declares that state's answer.** It is `SC-3`.

---

### §23.2 · PART A (ii) — the tier of a store with a `saveCall` and no `filePath`

**THE TIER IS FIXED AT CREATION, AND `file` IS DEFINED BY A PROBE OF A PATH — SO A `saveCall` STORE WITH NO `filePath` IS A `mem` STORE, AND A `mem` STORE OWES NO SAVE.**

**(a) THE DECLARED RULE, THREE TIMES AT THREE LAYERS.** `docs/specs/storeroom-native/contract.md:2807`–`:2808`, `P-TP-6`'s instance clause:

> "the register's tier is **FIXED AT CREATION** to `file` where a REACHABLE path was provided and to `mem` where the path was ABSENT, **and it never moves**"

`§10.4` part 3 (`:4870`): *"**A successful exclusive create … FIXES THE REGISTER AT `file`**"*. `strata/brief.md:206`–`:207` (UC-2): *"The register's tier is fixed at creation — `file` where `filePath` was provided and passed the probe, `mem` otherwise — and never moves."* **And the code, `store.rs:730`–`:747`: `let register_tier = if file_path.is_empty() { Tier::Mem } else { … Tier::File };`.**

**(b) `file`'s DEFINITION IS THE PROBE, AND THE PROBE IS A PATH PREDICATE.** `§10.4` part 1 (`:4868`), verbatim: *"**A PROVIDED `filePath` is REACHABLE iff (a) the path EXISTS and a WRITE-MODE OPEN of it succeeds … or (b) the path is ABSENT and the process can perform an EXCLUSIVE CREATE at it** … **NO SECOND PREDICATE IS AUTHORED**"*. **`file` is not a policy a caller chooses; it is the answer to a filesystem question about a path.** A store with a `saveCall` and no `filePath` has **no path for the probe to ask about**, and therefore **no `file` tier at all**.

**(c) AND THE CONSEQUENCE IS DECISIVE: THE SAVE WOULD NEVER FIRE.** The eligibility ground is `save_owed`, `store.rs:1666`–`:1674` — *"**ITS GROUND IS A DEPARTURE, NOT A VALUE** … **TRUE EXACTLY WHEN THE ACT THE ENTRY NAMES MOVED AT LEAST ONE VERSION STANDING AT `Tier::File`**"* (`:1640`–`:1642`). **On a store whose every version stands below `file`, `save_owed` answers `false` for every op, `commit_file` returns `Ok(())` at its second line (`:1589`–`:1591`), and `write_file` is never reached.** **So a `saveCall` bolted onto a `filePath`-less store would be invoked zero times, and a caller's "durable" write would be durable nowhere.** **The store's own docblock states the same fact from the other side, `:3403`: *"A PATH-LESS INSTANCE CANNOT OWN A `file`-TIER NODE (`§1.6`), so no byte is touched and nothing is owed."***

**(d) THAT SENTENCE'S DECLARED HOME IS ABSENT, SO ITS CITATION IS `UNVERIFIABLE`.** `store-model.md §1.6` is **not in this tree** (`docs/specs/storeroom-native/` carries `contract.md` alone). **What is `VERIFIED` is the code's two early returns (`:1721`, `:3411`) and one carried corroboration** (`docs/specs/storeroom-file-save-coverage/carrier.md:153`: *"a path-less store answers `Ok(())` … and touches nothing (`§1.6` — an instance with no `filePath` owns no [file-tier node])"*). **The declaration itself is `UNVERIFIABLE` at its home and is not reasoned from.**

**(e) SO THE REQUEST'S OWN TWO EXAMPLES DO NOT MEET THE TIER MODEL AS IT STANDS.** *"saving to an object-store DB"* and *"the future WASM version to choose different local storage methods"* both name a register whose durability does not come from a probe of a filesystem path. **The corpus's durability is `file`-tier's alone and `file` is a path that passed a probe.** **A `saveCall` store is therefore either (i) a `file` store whose bytes go somewhere else — in which case the probe, `FilePathUnreachable` and `FileImageRefused` all keep a subject that no longer matches their ground — or (ii) a `mem` store, in which case nothing is owed and `saveCall` never runs.** **Both are priced at `§23.12` and neither is chosen.**

---

### §23.3 · PART A (iii) — what breaks, named by `path:line`

**Each row is one of `BREAKS` (a declared sentence or declared mechanism loses its subject or its producer), `MOVES` (a figure or a name changes and nothing else), or `SILENT` (nothing in the tree governs it, so nothing breaks and nothing is permitted).**

| # | the declared thing | its bytes | what a `saveCall` does to it | verdict |
|---|---|---|---|---|
| `A-B1` | **`save_owed`, the eligibility ground** | `src/store.rs:1666`–`:1674`; ground `:1640`–`:1642` | **Nothing** — the predicate is over the journal entry's two records, and a `saveCall` that runs at the same position reads the same answer. **It breaks only if `saveCall` is declared OWED ON AN ACT THE PREDICATE CALLS INELIGIBLE** — i.e. if a `mem`-tier act must reach it (§23.2 (c)). | **SILENT on the predicate's own bytes; `MOVES` only under the second reading** |
| `A-B2` | **`FileCommitFailed` and its rollback** — *"ON THE FAILURE ARM THE STORE ROLLS THE WRITE BACK FIRST AND ANSWERS SECOND"* | `src/store.rs:1564`–`:1568`, `:1601`–`:1609`; `surface.md:1899` (`§2.11` cl. 5); `brief.md:246`–`:247`; rank `15`, `src/error.rs:186` | **BREAKS.** The rollback lives in `commit_file`'s `Err(failure)` arm — `journal.remove(index)`, `restore(home, &entry.captured)`, `restore_compaction`, `last_seq -= 1`, then `Err`. **A save performed by a caller-supplied function has no such arm**, so `§2.11` cl. 5's declared observable — *"the caller receives the failure and NEVER the rolled-back state"* — has **no producer**, and the journal entry stands. | **BREAKS (mechanism lost)** |
| `A-B3` | **the boot/load path and `FileImageRefused` (rank `22`)** | `src/store.rs:1714`–`:1737`, `:786`–`:787`; rank `22` at `src/error.rs:195`; `contract.md:4344`; `store.rs:958` (the three classes `NoImage`/`Image`/`Refused`) | **BREAKS for any arm that changes the storage.** `read_file_image` is ***"THE ONE PLACE THE BYTES AT `file_path` ARE READ AND DECODED"*** (`:1714`), and the construction's third class is a *present, non-empty image the loader REFUSES*. **Bytes that arrive from an object store were never written by `write_file` and, if persisted in the read's shape rather than the image's, are an image the loader refuses — i.e. `FileImageRefused` at `filePath`.** **AND: NOTHING IN THE TREE DECLARES A RESTORE-FROM-OUTSIDE ROUTE** (`contract.md:4201`: *"the refusal precedes every save — so **NO REMOVAL ARM IS DECLARED AND NO ROLLBACK COMPOSES**"*, and no install arm beside it). | **BREAKS on the storage half; SILENT on the restore half — there is no route to declare** |
| `A-B4` | **the two-instances-over-one-`filePath` hazard** | `docs/specs/storeroom-js/contract.md:2512`–`:2517`; `:3244`–`:3245`; `S-TWO-PATHS` at `:3250`–`:3251`; failure list `:3255`–`:3256` | **The hazard's SUBJECT changes and no sentence moves.** The sentence is *"TWO INSTANCES OVER ONE `cfg.filePath` ARE THE CALLER'S OWN HAZARD"*, and its mechanism is *"the second instance's `file`-tier write CLOBBERS the first's bytes"* — which is `write_file`'s rename. **Remove the path and the clique moves to the backend, where nothing declares it.** **AND THE PACKAGE MAY NOT ANSWER IT**: *"a package-side refusal of a second instance over one path"* is on `P-SR-6`'s FAILURE LIST (`:3256`). | **SILENT for the new hazard; the old sentence's mechanism is `MOVES`-adjacent, not broken** |
| `A-B5` | **the terminal arm's save-first order** — *"THE ACT IS THE FIRST THING THAT ARM DOES, before any body of the delivered set is invoked"* | `delivery.mjs:858`–`:864`, `:888`–`:947`, `:987`; `surface.md:1896` (`§2.11` cl. 2), `:1897` (cl. 3 (ii)) | **The ORDER survives; the ACT'S IDENTITY moves.** A `saveCall` invoked at the same position, before `:987`'s `deliver`, satisfies cl. 2 verbatim. **What breaks is cl. 3 (ii) the instant `saveCall` is `async`**: *"NO LISTENER BODY RUNS BEFORE THE SAVE ON THE PASSING ARM"* becomes *"no body runs before the save SETTLES"*, which is `D-130`'s answered window (`decisions.md:6751`) and **not** `§2.7` item 2's synchronous one (`surface.md:1654`–`:1663`). | **`MOVES` if synchronous; BREAKS-into-a-`REVERSAL` if `async`** (`DD-22`, `contract.md:602`) |
| `A-B6` | **`D-117`'s chain** — *"ask → repairs land → re-run → SAVE → DELIVER → the member's record"* | `strata/decisions.md:6034`; its four instants at `:6029`–`:6039`; shipped chain `kernel-attempt.mjs:452` → `:550` → `delivery.mjs:987` | **Nothing moves in the ORDER, and the chain gains a suspension it does not declare.** `D-117` item 2 names SAVE as one instant; a `saveCall` that settles asynchronously makes that instant a *region*, and **`D-117`'s own instant-for-instant reading is what `D-125` item 1's four registration instants reuse** (`surface.md:1728`). | **`MOVES` synchronously; SILENT on the settled reading** |
| `A-B7` | **every `file`-tier test cell** | the `file-tier-save` battery (`tests/e2e/file-tier-save/scenarios.mjs`, `FTS-*`, with `FTS-12.1`'s member census), `tests/construction_access_probe.rs`'s `acp_*` cells, `S-CONSTRUCT`/`S-PROBE-DRY`/`S-TWO-PATHS`/`S-COUNT` | **WHICH CELLS REDDEN IS A MEASUREMENT AND IS `NOT DRIVEN`.** What can be said at the bytes: **every cell whose premise is "the bytes at `cfg.filePath` moved"** — the save's three durability observables at `surface.md:1898` (a fresh instance over an equal `filePath` reads the version) — **has no subject once the bytes are not at `filePath`.** | **`NOT DRIVEN`; the premise is named** |
| `A-B8` | **`A57`'s split, at its package-side half** | `surface.md:387`; `frame.mjs:42`–`:44`; `brief.md:331`–`:332` (§5 inv. 5) | **Nothing.** *"The store invokes no callback. Delivery is the client's act."* A `saveCall` is **the PACKAGE invoking a caller's function** — exactly the shape `A57` permits and `brief.md:331` declares. **`A57` is NOT moved by `saveCall`, and a pass that files this request as an `A57` breach has read the wrong boundary.** | **nothing at all — and that is a finding** |
| `A-B9` | **who performs a durable write** | `brief.md:241`–`:244` (*"the write verb itself performs no file I/O on any of its arms — the save belongs to the package's terminal arm"*); `DD-28`'s *"produced by a successful `file`-tier `write` ONLY"* read through `D-106` item 2 (`decisions.md:5419`–`:5424`); `brief.md:333`–`:334` (§5 inv. 6, *"The file is the store's. Never read, edit, parse or migrate it by hand; a migration reads through the store and writes through the store"*) | **This is the request's real collision and it is a DECLARATION, not a refusal.** The corpus says the *package* performs the save — the bytes are the *store's* and the *act* is the package's. **A `saveCall` moves the bytes out of the store's one writer, and `brief.md:333`'s invariant speaks of a "hand" and of a "migration" and does not reach a caller-supplied callback.** | **`MOVES` a declaration; `brief.md` inv. 6 is SILENT about this case** |
| `A-B10` | **`DD-17`/`A74`'s premise** — *"the store runs NO background work, holds NO OS handle beyond the path it was given … and COMMITS SYNCHRONOUSLY, **so there is no in-flight state to flush and no async resource whose abandonment could lose data**"* | `docs/specs/storeroom-js/contract.md:2506`–`:2510`, under `§3.5`'s `A74` ruling *"Not needed"* (`:2504`) | **An `async` `saveCall` is precisely *"an async resource whose abandonment could lose data"*.** This is the nearest thing in the corpus to a refusal of the async half, **and it is a stated PREMISE of a ruling about `dispose()`, not a `REFUSES` cell** — so it is a `DECLARATION` that loses its premise. | **`MOVES` (a premise, not a refusal)** |
| `A-B11` | **the construction's four-key set** | `index.d.ts:207`–`:219`; `surface.md:171`; `brief.md:205`; `contract.md:3981`, `:3991`–`:3996`; `frame.mjs:211`–`:221` | **A `saveCall` key is a FIFTH key, and a fifth key is IGNORED TODAY — silently, with no code and no refusal** (`frame.mjs:218`: *"A key BEYOND the four is IGNORED and produces no code"*; `index.mjs:345`; `contract.md:3981` — *"any third key on `cfg` \| **ignored**"*; `:3991`–`:3996` — *"no third key produces a code, no third key is refused"*). **So a caller who passes `saveCall` today gets no error and no save.** The arity figure `4` moves to `5`. | **`MOVES` a figure. NOT a refusal anywhere.** |
| `A-B12` | **the addon's entry set and `commitFile`'s arity** | `facade.rs:1028`–`:1030` (*"NO POSITION IS MINTED AND NO ARITY MOVES"*); `surface.md:1915` (the dispatcher set of `8`); `§2.11` cl. 7 (`:1905`) | **Only reached by an arm in which the STORE must hand the package its image.** `D-112`'s own row already put that class of question to L1 and called it *"a declaration and not an implementer's choice"* (`decisions.md:5784`–`:5788`), naming exactly three forms — *"a tenth addon entry, a position on the existing one, or a package act that reaches the store's own writer through a channel the corpus already declares"*. **That is the corpus's ONLY prior text about a pluggable writer, and it is about the reversal's carrier, not about a backend.** | **`MOVES` a declaration; the precedent is `D-112`'s unclosed question** |
| `A-B13` | **`cfg` must be a plain own-property object or `AddressMalformed`** | `frame.mjs:204`–`:210` | **Nothing.** A `saveCall` on a plain `cfg` passes the class test; a `saveCall` that is not a function is a **new outside value with no declared answer** (`SC-2`). | **SILENT** |

**THE THREE-PART ANSWER TO *"which of these break"*, IN ONE LINE EACH.** **The order and the predicate do not break** (`A-B1`, `A-B5`-sync, `A-B6`-sync). **The failure machinery does** (`A-B2`, `A-B3`). **The hazards and the censuses merely move** (`A-B4`, `A-B7`, `A-B11`, `A-B12`). **`A57` is untouched** (`A-B8`). **And the sentence that actually collides is `brief.md:241`–`:244` plus `DD-28`-through-`D-106`: who performs a durable write.**

---

### §23.4 · PART A (iv) — is there any prior ruling on a pluggable persistence backend? **NO — and the negative is a searched set, printed.**

**THE SEARCHES, STATED AS WHAT THEY SEARCHED AND WHAT THEY RETURNED.**

| the searched set | the pattern | the return |
|---|---|---|
| `strata/**` (all six files) | `saveCall` · `save call` · `object store` · `object-store` · `localStorage` · `IndexedDB` · `WASM` · `wasm` | **`0` matches** |
| `docs/specs/**` (all `.md`) | `saveCall` · `object store` · `object-store` · `localStorage` · `IndexedDB` · `\bWASM\b` · `\bwasm\b` · `pluggable` · `persistence backend` · `backend` | **`9` matches, and not one is the subject**: four are `storeCreate`'s returned *object* (`contract.md:1579`; `surface.md:423`, `:982`, `:2066`), one is **git's** object store (`docs/specs/storeroom-publish/contract.md:877`), three are **refusals of WASM as a LOAD route** (`contract.md:3272`, `:3277`, `:3423`), and one is prose about a *channel* the corpus already declares — `decisions.md:5787`, `D-112`'s own unclosed carrier question. |
| `strata/**` | `\bchannel\b` · `batch(ing)?` | **`159` matches, all of them either `DD-12`/`DD-23`'s *failure channel*, the `Symbol.for` *channel* device (`state.mjs:99`), the repair-leg *channel* (`D-104`), or the `cfg.constraints` *batch*.** **NOT ONE names a caller-supplied function that batches writes.** |

**(a) THE ONE REFUSAL THE SEARCH DOES SURFACE, AND IT IS NOT THE ONE A FIRST READING GUESSES.** `docs/specs/storeroom-js/contract.md:3272`, `P-SR-7`'s boot property: *"**NO other realm, no second addon, no subprocess, no shared library and no WASM module is loaded at any point to reach the store**"*, with `S-ONE-ADDON` at `:3276`–`:3277` repeating *"no WASM instantiation"*. **Its SUBJECT is the LOAD-TIME reach of the store, and its ground is `A70`'s one-claimed-realm ruling.** **It is NOT a refusal of a WASM BUILD of the store** — and the owner's sentence names *"the future WASM version"*, which is a different thing from a WASM module loaded to reach a Node-API addon. **This section does not read the refusal wider than its subject; it also does not read it as permission.** It is `SC-8`.

**(b) THE ONE PRIOR TEXT THAT COMES NEAREST, AND ITS EXACT SCOPE.** `strata/decisions.md:5784`–`:5788`, `D-112`'s *"WHAT IT DOES NOT SETTLE"*: **the reversal's post-judgement save needs a carrier, and *"whether the carrier is a tenth addon entry, a position on the existing one, or a package act that reaches the store's own writer through a channel the corpus already declares, is a declaration and not an implementer's choice."*** **That question was answered in the next two sessions** — `D-116` item 2 (`:5960`) took the state-keyed absent carrier, and `facade.rs:1022`–`:1033` records the landing. **So the corpus's only prior deliberation about who reaches the store's writer ended in "the store's own writer, reached by a different key" — never in "a caller's function".**

**(c) AND THE THREE PRIOR INTAKES TOUCH NOTHING OF THIS.** `P-1` is a readout's tier, `P-2` a creation's editing action, `P-3` change-detection, `P-4` an awaited listener (`strata/proposals.md:18`, `:259`, `:581`, and this date's `P-4`); `§21` is a value predicate (`strata/research.md:1886`–`:2208`); `§22` is the async listener. **No prior intake prices a persistence backend.**

**(d) THE VERDICT ON (iv): SILENT.** **No clause, no row, no cell, no guide sentence and no ruling declares a pluggable persistence backend, a caller-supplied save function, or a route by which bytes reach the store's file other than its own writer.** **The nearest sentences are a refusal of a WASM *load* (`P-SR-7`), a premise about no async resource (`A74`), and an unclosed carrier question (`D-112`) — and none of the three is the subject.**

---

### §23.5 · PART B (i) — what a listener's return value is declared to be read as, and every place that would need amending

**(a) THE DECLARED SENTENCE IS A NEGATIVE AND IT IS AT THREE SITES AT TWO LAYERS — ONE OF WHICH IS NOT A LIVE FILE.**

- **The kept contract's own item**, verbatim: *"**NO OTHER ARGUMENT IS DECLARED AND NO RETURN VALUE IS READ**"* — `docs/specs/storeroom-js/surface.md:1716`–`:1717` (`§2.7`'s second item 5). **LIVE.**
- **The register row's `domain` cell**, `PAR-JS-12`: *"The package's invocation passes the triggering ADDRESS as its argument; **no other argument is declared and no return value is read**"* — `.reflow-backup/docs/specs/storeroom-js/parameter-semantics.md:463`. **The row is `VERIFIED` at its bytes; ITS LIVE HOME `docs/specs/storeroom-js/parameter-semantics.md` IS ABSENT FROM THIS TREE**, so the citation is to a gitignored path — a **filed corpus condition** (`docs/specs/storeroom-corpus-citation-integrity-proposal-review.md:30`), named by `§22`'s `AL-6` and by `P-4`'s `W-5`.
- **The shipped loop's own docblock at the site that performs the invocation**, `bindings/js/src/entry/delivery.mjs:101`–`:102`, quoting the row: *"the package's invocation passes the triggering ADDRESS as its argument; no other argument is declared and no return value is read"*.

**(b) AND THE CODE KEEPS IT, AT ONE LINE.** `delivery.mjs:206`:

```js
206:       externalCall(state.receiver, () => listener(decodeSegments(address)));
```

**The thunk's answer is *answered* by the channel — `bindings/js/src/entry/state.mjs:338`–`:342`, `:340` is `if (typeof channel === 'function') return channel(run);`, and its own clause at `:330`–`:332` reads *"and answers what the invocation answered"* — and the call site reads none of it.** **So the return value has no destination in the shipped package: not the record, not a log, not `state`, not the caller.** That is `VERIFIED` at the bytes.

**(c) THE ADMISSION IS TYPE-ONLY AND IT IS `void`.** `bindings/js/index.d.ts:572`–`:573`: `export type Listener = (address: Address) => void;` — *"The caller's listener: any JS function, invoked with the triggering address as its ONE argument."* **The runtime admission is `typeof listener === 'function'` and nothing else** (`delivery.mjs:188`). **Whether an `async` function is assignable to `() => void` is a TypeScript language rule and `NOT DRIVEN`** — `tsc` was not run this pass and no byte of this tree carries the answer.

**(d) EVERY PLACE THAT WOULD NEED AMENDING, ENUMERATED SO NONE IS READ AS UNTOUCHED.**

| # | the site | what it declares | what reading the return value does to it |
|---|---|---|---|
| `B-A1` | `docs/specs/storeroom-js/surface.md:1716`–`:1717` | *"NO RETURN VALUE IS READ"* | **the sentence moves.** Its own home is a kept contract, so **a bounded amendment is available at it** (`W-5`). |
| `B-A2` | `.reflow-backup/…/parameter-semantics.md:463` (`PAR-JS-12`) | the row's `domain` cell | **moves with `B-A1`; its home is ABSENT, so an amendment has no live address** (`NQ-6`). |
| `B-A3` | `bindings/js/src/entry/delivery.mjs:101`–`:102` | the site's own docblock | **moves in place.** |
| `B-A4` | `bindings/js/src/entry/delivery.mjs:206`, `:188` | the invocation and its admission | **the call site gains a read; the admission gains a second test only if a non-function answer is refused.** |
| `B-A5` | `bindings/js/index.d.ts:573` | `Listener = (address: Address) => void` | **the return type becomes non-`void`** — and every consumer's function type is still assignable, so this is a widening. |
| `B-A6` | `docs/specs/storeroom-js/surface.md:1654`–`:1663` (`§2.7` item 2) | the invocation is SYNCHRONOUS and *"A BODY THAT RAN AFTER THE PACKAGE'S VERB RETURNED TO THE CALLER HAS RUN AT AN INSTANT THIS ITEM DOES NOT DECLARE"* | **a return value that arrives from an `async` body arrives at exactly that undeclared instant.** `D-130` item 4 has ruled the *waiting* (`decisions.md:6751`); **this item is still unamended `RM-2`.** |
| `B-A7` | `docs/specs/storeroom-js/surface.md:1667`–`:1669` (`§2.7` item 4) + `contract.md:603` (`DD-23`) | *"A THROWING LISTENER BODY IS NOT CAUGHT, NOT RETRIED AND NOT REPORTED"*; *"catching and reporting"* REFUSED | **a `try`/`catch` around `:206` to capture a rejection is the refused act.** `D-130` item 1 rules a rejection *is* a refusal (`:6748`) — **so the refusal is now the status's job and the `catch` is still refused.** |
| `B-A8` | `bindings/js/index.d.ts:498`–`:499` | the failure form is *"never an `Error` subclass, never a returned tagged union and **never a `Promise` rejection**"* | **moves** if a channel failure or a rejected body crosses as a rejection. |
| `B-A9` | `docs/specs/storeroom-js/surface.md:1275`–`:1278` (`§2.5` item 3) | *"no `Promise` rejection (**every verb is synchronous**)"* | **moves, and its parenthesis is the premise.** |
| `B-A10` | `docs/specs/storeroom-js/surface.md:1757`–`:1758` (`D-76` item 1's tail) | *"**The record's member set is UNMOVED by the correction: no member carries a listener's commit, and neither `triggered` nor the log gains one**"* | **this is the sentence a `{listenerHandle: data}` map meets — see `§23.7`, where its true extent is read.** |
| `B-A11` | `docs/specs/storeroom-js/contract.md:602` (`DD-22`) | the invocation is synchronous; an async one is REFUSED absent a declared scheduler | **moves if the channel is flushed asynchronously** (`§23.6`). |
| `B-A12` | `strata/decisions.md:3915`–`:3916` (`D-71`) | *"The caller does not need to know about the outcome of the listeners"* | **NOT AMENDED — and this is the finding of `§23.7`.** By `D-76` item 1's own correction (`:4065`–`:4073`) that sentence **is a PERMISSION**, not a prohibition: *"**A PERMISSION BECAME A PROHIBITION**"*. |
| `B-A13` | `docs/specs/storeroom-js/surface.md:1738`–`:1777` (`§2.7` item 9) | the three independence clauses and `D-72`'s nesting | **the independence clauses do not move** (a return value is not a commit outcome). **`D-72`'s premise *"every level a synchronous call on one thread"* moves only under an async flush** — `D-130` item 5 names the interference hazard the caller's (`:6752`). |

**(e) THE HONEST CLASSIFICATION, STATED BEFORE ANY ARM IS PRICED.** **`§2.7` item 5's sentence is a DECLARATION and not a refusal.** It sits in a `domain`/`observable` chain that states the parameter's extent; it is **not** in a `what it REFUSES` cell of any `DD` row, and `D-76`'s whole lesson is that reading such a sentence as a wall is the corpus's own recorded failure mode. **So the request does not meet a declared refusal at `B-A1` — it meets a declared sentence it would rewrite.** **The two refusals it does meet are `DD-23`'s (`B-A7`) and `DD-22`'s scheduler half (`B-A11`), and both are for the FAILURE and the ASYNC arm, not for the carrying of a value.**

---

### §23.6 · PART B (ii) — per-write call or batched flush, and what flush boundary the record could host

**(a) THE REQUEST ASKS FOR BOTH AND THE TWO ARE ONE WORD APART IN ITS OWN TEXT.** *"an interface function used for batching the writes"* names a batch; *"If a channel is registered, **the store will pass the listeners and their return values with the write receipt**"* names a **per-write** carriage. **The record answers neither reading, and the request's own sentence carries both.**

**(b) "BATCHING" IS EXACTLY WHAT `DD-22` PRICES AND NO RULING NAMES.** `docs/specs/storeroom-js/contract.md:602`, the `What it REFUSES` cell: *"a declared invocation order; an invocation before the verb returns; **an asynchronous invocation with an undeclared scheduler**"*; and the `alt` cell: *"**and an async delivery — priced: it needs a queue, a flush rule and a failure channel for a throwing body, none of which any ruling names; both available with a fresh ruling**"*.

**So the flush rule is NAMED AS ABSENT AND PRICED — that is a `REVERSAL`-class requirement, not a silence and not a wall.** `D-130` has since supplied one third of the price and not the other two: **item 1 gives the failure a shape** (a new status, `:6748`–`:6749`), **item 4 gives a boundary — *"the answer is withheld until the delivered set has SETTLED"*** (`:6751`) — **and no ruling names a QUEUE, a FLUSH RULE FOR A BATCH OF WRITES, or an order.** `D-130` item 3 answers that the waiting *"does not assert an order"* (`:6750`).

**(c) THE BOUNDARY `D-130` SUPPLIES IS A DELIVERED-SET BOUNDARY AND NOT A WRITE-BATCH BOUNDARY, AND THE DIFFERENCE IS THE WHOLE QUESTION.** *"the delivered set"* is the set a **single** verb's delivery carries. **`D-130` item 3's *"`§2.7` item 3 stands UNAMENDED"* is the byte that keeps it per-write.** **A channel that accumulated across two writes would need a boundary BETWEEN writes, and no instant in the record is one:** the five delivery call sites each fire at their own act's instant (`§23.9`), the kernel's `drainRestart` is a **restart** drain and not a write drain (`kernel-attempt.mjs:270`), and **a commit's `pending` is a set of handles, never a pending batch of receipts** (`index.d.ts:969`–`:993`).

**(d) WHAT FLUSH BOUNDARY THE RECORD COULD HOST, QUOTING ONLY WHAT EXISTS.** **Three exist and each is a different thing:**

1. **THE PER-WRITE CALL** — the receipt exists on every arm (`WriteRecord`, `index.d.ts:616`–`:620`), so a per-write call has a carrier **today** with no new boundary. **This is `D-130`'s settled-set boundary read at one write.**
2. **A PER-PASS DRAIN** — the kernel's drain is **real and shipped** but its subject is the **restart request** (`D-42`/`D-54`; `kernel-attempt.mjs:270`), not a batch of writes. **Co-opting it would be a new subject on an existing instant.**
3. **A COUNT OR A TICK** — **SILENT.** No timer, no scheduler, no queue and no flush rule exists anywhere in `bindings/js/**`: `DD-17`'s clause says the store *"runs NO background work"* (`contract.md:2507`–`:2508`), and `A74`'s `dispose()` refusal rests on *"no in-flight state to flush"* (`:2509`). **A tick would be a scheduler, and `DD-22` refuses an invocation with an undeclared one.**

**(e) SO (ii)'s ANSWER, IN ONE LINE: the record hosts the PER-WRITE call and no batch.** **The batch reading meets `DD-22`'s scheduler refusal (`REVERSAL`), its `alt`'s missing queue and flush rule (`price owed`), and `A74`'s no-background-work premise (`DECLARATION`, lost).**

---

### §23.7 · PART B (iii) — what the channel's own return value could reach, given the census

**(a) THE THREE DECLARED MEMBER SETS IT COULD LAND ON, EACH AT ITS BYTES.**

| the record | its typed members | its non-enumerable own accessors | the census device |
|---|---|---|---|
| **`WriteRecord`** — what a `write` answers | **three**: `op` `index.d.ts:617`, `watched` `:618`, `triggered` `:620` | **two**: `discarded` (declared `:621`–`:644`, `enumerable: false`, `configurable: true`), `log` (`:645`–`:680`, same) | `Object.keys(write(...))` is **three**; `Object.getOwnPropertyNames` gains the accessor's name, *"which is declared rather than discovered"* (`:662`–`:663`) |
| **`CommitRecord`** — what the kernel's commit carries | **four**: `attempt` `:964`, `op` `:966`, `triggered` `:968`, `pending` `:993` | none declared | `3 + 1 = 4` ✓ — `surface.md:1922` |
| **`DeleteRecord`** — what a `delete` answers | `address` `:702`, `tiers` `:703`, `triggered` `:705`, `op` `:725`, `commit` `:759` | `discarded` at `:803` | — |

**(b) THE CENSUS DEVICE IS REAL, SHIPPED TWICE, AND CHEAP — AND IT ALREADY HAS A PRECEDENT THAT CROSSED THE VERY SENTENCE THAT LOOKS LIKE A WALL.** `A117` (D6) is the `Symbol.for`-keyed, non-enumerable own property; `D-119` item 3 declares it again, verbatim: *"`A117` (D6)'s device — a `Symbol.for`-keyed, non-enumerable own accessor, the one `discarded` already uses — **is the precedent for attaching a datum without moving a census**"* (`strata/decisions.md:6119`–`:6123`).

**(c) AND HERE IS THE FINDING THAT MAKES `B-A10` SMALLER THAN IT LOOKS.** **`D-76` item 1's tail — *"The record's member set is UNMOVED by the correction: no member carries a listener's commit, and neither `triggered` nor the log gains one"* (`surface.md:1757`–`:1758`) — has already been read through twice, by the two acts that added `WriteRecord`'s two accessors.** `discarded` was added by `D-75` on **2026-10-29**, the same day as `D-76`; `log` was added by `D-119` on **2026-11-02**, twelve days later. **Each states its own reasoning through the census rule and neither moved a declared member.** **So the honest reading of `:1757`–`:1758` is what it says: it states the extent of *that correction*, and it is not a standing prohibition.** **A `{listenerHandle: data}` map riding the same device would move no census at all** — **and that is a finding, not a recommendation: it is one of `§23.12`'s arms and it is priced there and not chosen.**

**(d) AND WHERE THE OWNER'S OWN PARENTHESIS PUTS THE CHANNEL'S ANSWER: OUTSIDE.** *"(End of package scope) Channel function returns data to client so that it can load the data."* **The channel's return value is the CALLER's datum and its destination is the caller's client.** **Nothing in the package declares a destination for a channel's answer, and the owner's own sentence says the package's responsibility ends at the invocation.** **So this is SILENT, and it is silent by the request's own words and not by an absence in the corpus.**

**(e) THE ONE THING A CHANNEL'S ANSWER COULD *NOT* REACH WITHOUT A REVERSAL: the caller's own record, as a `triggered`-shaped member.** `triggered`'s element type is total and two-membered — `TriggerPair = { handle, address }` (`index.d.ts:695`–`:698`), and **`§2.5` item 2's totality is a declared prohibition on a bare handle standing in `pending`** (`surface.md:1731`; `index.d.ts:976`–`:978`). **A `{listenerHandle: data}` value pushed into `triggered` or `pending` would breach the pair's totality.** **A new member beside them would not** — which is `D-119` item 3's own two choices.

---

### §23.8 · PART B (iv) — is a channel failure a refusal, and if so which status

**(a) THE CLOSED SET IS TWENTY-TWO AND `D-130` HAS RULED A TWENTY-THIRD AND NAMED NONE OF IT.** `src/error.rs:171`–`:196`; `bindings/js/index.d.ts:421`–`:444` (twenty-two literals plus the `(string & {})` escape). **`D-130` item 2, verbatim: *"A NEW member is appended to the closed set — `src/error.rs`'s `CODES`, `22 → 23` … and `ListenerBodyThrew` at rank `21` is NOT the carrier. The store's set is the architect's and this row mints NO NAME, NO SLUG, NO RANK POSITION AND NO MESSAGE"*** (`strata/decisions.md:6749`).

**(b) A CHANNEL FAILURE HAS FOUR CANDIDATE DISPOSITIONS AND THE RECORD DECIDES NONE.** **`D-130` item 3 of what it does not settle is exactly this question in the listener's own voice:** *"**WHERE THE STATUS CROSSES.** Four live sites still declare that a rejection is not the failure form … **This row says WHAT the failure is; it does not say HOW it reaches the caller**"* (`:6758`). **A channel's failure is one layer further out than a body's rejection, and it inherits the same gap plus one.**

**(c) THE ONE THING THAT IS DECLARED: A FAILURE CROSSES THROUGH ONE FORM AND ONE ONLY.** `docs/specs/storeroom-js/contract.md:591` (`DD-12` re-derived): *"**A FAILURE CROSSES AS A THROWN PLAIN OBJECT OF EXACTLY THREE MEMBERS, `{ status, message, log }` … ONE FORM, THREE MEMBERS — NOT TWO FORMS AND NOT THREE MEMBERS SOMETIMES**"*, with `address` the fourth from `D-77` (`index.d.ts:498`, `:501`–`:502`). **And `DD-23`'s `What it REFUSES` cell names *"a collected error report"* and *"catching and reporting a throwing body"*** (`contract.md:603`), priced on *"a failure channel the package does not own"*.

**(d) SO (iv)'s ANSWER, IN THREE CLAUSES.** **(1) A channel failure that CROSSES AS A REFUSAL** must be one of the closed set's members, so it needs either `D-130`'s unnamed 23rd, **or a 24th** — and **no row mints either.** **(2) A channel failure that is CAUGHT AND REPORTED** is `DD-23`'s refused act — a **`REVERSAL`**. **(3) A channel that THROWS THROUGH to the caller** — *"a registered function that throws is NOT caught, NOT retried and NOT reported: the exception propagates out of the package's own invocation loop"* (`surface.md:1667`–`:1668`) — **is the already-declared channel, applied one layer out**: it needs **no** status, and it makes the channel's failure the caller's own throw. **All three are open; `CH-4` files the choice with no default.**

**(e) AND `D-130` ITEM 2 PUTS THE PLURALITY QUESTION SHARPER, WHICH THIS SECTION MUST SAY HOW.** *"**Which rejection crosses when several bodies reject**"* is `D-130`'s **open item 2** (`:6757`): *"with `start all`, `N` bodies can reject in one delivery and the package's form carries ONE `{status, message, log, address}`. First to settle wins, a declared order, a list, or one refusal per call — **SILENT**, and this row does not choose."* **A channel that carries EVERY listener's return value makes that plurality STRUCTURAL rather than accidental**: under `D-130`'s `start all`, `N` bodies settle into `N` values, and a channel whose contract is *"pass the listeners and their return values"* must carry `N` answers where the failure form carries **one**. **So the request and `D-130` are not two questions — they are the same plurality question at two ends of the same window, and a channel that answers it one way forecloses the other.** **`CH-3` files it.**

---

### §23.9 · PART B (v) — the delivery instants, and the `rollback`'s judgement

**(a) THE DELIVERY SITES, COUNTED THIS DATE — FIVE CALLS OF `deliver`, AND `strata/research.md §19`'s `A-3` (*"and no fourth site"*) IS STALE OF THIS TREE.**

| # | the instant | the call site | what is declared at it |
|---|---|---|---|
| 1 | **a caller's `write`**, at the terminal arm | `bindings/js/src/entry/delivery.mjs:987` | `D-117`'s SAVE → DELIVER (`decisions.md:6034`); `D-130`'s settlement window |
| 2 | **a caller's `delete`** | `bindings/js/index.mjs:887` | `D-49`'s witness; the delivery's set is `receipt.commit.pending` or `receipt.triggered` (`:882`–`:884`) |
| 3 | **a `rollback`'s judgement** | `bindings/js/src/entry/constraints.mjs:3037` | `D-117` item 1 — *"a reversal's judgement DELIVERS its batch"* (`decisions.md:6029`–`:6039`), per leg, running handle list held across |
| 4 | **the creation and a boot** | `bindings/js/index.mjs:334` (inside `deliverAtTheCreation`) | `D-125` item 1; the set is *"the ADOPTED set ∩ the addresses that RESOLVE"*, one `deliver` call per address (`surface.md:1728`) |
| 5 | **`addConstraint` and a re-arm** | `bindings/js/src/entry/delivery.mjs:575` (inside `registrationDelivery`, reached under `REGISTRATION_DELIVER`, `:518`, installed at `:524`) | `D-104`/`D-125`; the set is *"THE STORE'S OWN `triggered`"*, *"the very record `write` answers"* (`:497`–`:500`); `state.registrationDelivery !== 'triggered'` is the creation-silence guard, `:544` |

**`surface.md:1728` declares the closed list of delivery instants as SEVEN** — *"a caller's `write` and `delete` at their terminal arm; a reversal's judgement after its save (`D-117` item 1); a repair's write at a LANDING (`D-104`); and NOW the four REGISTRATION INSTANTS"* (i.e. `2 + 1 + 1 + 4 = 8` counts, `7` classes since create-and-boot are one act — `F-3`/`D-90` (5), read at `delivery.mjs:536`–`:539`).

**(b) SO A CHANNEL IS INVOKED AT ALL FIVE, AND THE REQUEST'S OWN EXAMPLE IS THE HARDEST ONE.** *"server-side listener fires when writing a new tab"* is site 1. **But a channel that must carry *"the listeners and their return values"* at site 4 has a delivery whose set is *"the ADOPTED set ∩ the addresses that RESOLVE"* — and at a creation the adopted bodies are armed at `index.mjs`'s construction walk, so the set is non-empty where a path resolves** (`surface.md:1728`; `index.mjs:301`–`:339`). **At site 5 the set is a repair's `triggered` and the act answers an IDENTITY, not a record** (`surface.md:1728`; `NQ-5` at `proposals.md:1257`). **So "the write receipt" — the request's own phrase — exists at exactly sites 1 and 2 and at no other site.** **`CH-2` files it.**

**(c) AND `D-117`'s judgement is the one where a channel's *return* has the least declared home.** `constraints.mjs:3037` delivers **per leg** of the judgement's repair set, with the running handle list held across the calls (`delivery.mjs:502`–`:505`). **The reversal's own record is `{opId, undoneOps, restoredTo}`** (`index.d.ts:845`–`:847`) — ***"the reversal's own record is unchanged … no member is added"*** (`decisions.md:6050`–`:6051`). **So a channel answer at that instant has nowhere to land in the record that is already closed at three members.** **`CH-5` files it.**

**(d) AND ONE FACT OF THE FOUR REGISTRATION INSTANTS THAT A CHANNEL MAKES WORSE, NAMED SO IT IS NOT DISCOVERED AT GATE 3.** At sites 4 and 5 the invocation is **wrapped**, `delivery.mjs:572`–`:582`:

```js
575:       deliver(state, call, legAddress);
576:     } catch (thrown) {
...
580:       state.listenerFailure = { thrown, address: legAddress };
581:       return undefined;
```

**A body's throw there is caught into a one-slot package state slot, `state.listenerFailure`, and converted to rank `21` by the act that called it** (`delivery.mjs:510`–`:517`). **`D-130` item 5's open item 5 names that slot as a package-internal state a suspension would corrupt** (`:6760`: *"`state.listenerFailure` (`delivery.mjs:580`) … **Those are the DESIGN's obligation**"*). **A channel that must read a return value at those two sites adds a second consumer of a slot that is already declared single.**

---

### §23.10 · THE CLAIMS LEDGER — `KC-1`…`KC-41`

| id | the claim | verdict | `path:line` |
|---|---|---|---|
| `KC-1` | `HEAD` is `e3136af` | **VERIFIED by file-read, not `git`** | `.git/HEAD:1`; `.git/refs/heads/main:1` |
| `KC-2` | the closed status set is **`22`**, ranked `1`…`22`; `FileCommitFailed` at `15`, `ListenerBodyThrew` at `21`, `FileImageRefused` at `22` | **VERIFIED** | `src/error.rs:171` (`[&str; 22]`), `:186`, `:193`, `:195`, `:196`; `index.d.ts:421`–`:444` |
| `KC-3` | the instance declares **`15`** own members | **VERIFIED** | `index.d.ts:1047`, `:1049`, `:1087`, `:1121`, `:1140`, `:1148`, `:1213`, `:1228`, `:1273`, `:1287`, `:1292`, `:1325`, `:1327`, `:1329`, `:1416` |
| `KC-4` | `cfg`'s declared set is **four** keys and no fifth | **VERIFIED** | `index.d.ts:207`–`:219`; `surface.md:171`; `brief.md:205`; `contract.md:3240`–`:3241` |
| `KC-5` | **a caller-supplied key beyond the four is IGNORED, with no code and no refusal** | **VERIFIED** | `frame.mjs:211`–`:221` (`:218`); `index.mjs:345`; `contract.md:3981`, `:3991`–`:3996` |
| `KC-6` | a `cfg` that is not a plain own-property object is `AddressMalformed` | **VERIFIED** | `frame.mjs:204`–`:210` |
| `KC-7` | **`commitFile`'s ONE position is an op id or its absent carrier; no position is minted and no arity moves** | **VERIFIED** | `facade.rs:1034`–`:1035`, `:1058`–`:1065`, `:1028`–`:1033` |
| `KC-8` | **no route by which a caller supplies the bytes.** The image is composed from the store's own state and written sibling-and-rename | **VERIFIED** | `store.rs:1516`, `:1482`–`:1492`, `:1525`–`:1527`; `:1613`–`:1618` (*"two keys and no third"*) |
| `KC-9` | the register's tier is **fixed at creation** — `file` where a reachable path was provided, `mem` otherwise — and never moves | **VERIFIED** | `contract.md:2807`–`:2808`, `:4868`, `:4870`; `store.rs:730`–`:747`; `brief.md:206`–`:207` |
| `KC-10` | a path-less instance owns no `file`-tier node | **VERIFIED at the code's two early returns only; its declared home `store-model.md §1.6` is ABSENT → the DECLARATION is `UNVERIFIABLE`** | `store.rs:1721`, `:3403`, `:3411`; carried corroboration `docs/specs/storeroom-file-save-coverage/carrier.md:153` |
| `KC-11` | **`save_owed`'s ground is a departure — *"TRUE EXACTLY WHEN THE ACT … MOVED AT LEAST ONE VERSION STANDING AT `Tier::File`"*** | **VERIFIED** | `store.rs:1666`–`:1674`, `:1640`–`:1642` |
| `KC-12` | **a failed save rolls the write back FIRST and answers `FileCommitFailed` SECOND** | **VERIFIED** | `store.rs:1564`–`:1568`, `:1601`–`:1609`; `surface.md:1899`; `brief.md:246`–`:247` |
| `KC-13` | the boot's one read of the path has **three** classes; a present, non-empty refused image is rank `22` | **VERIFIED** | `store.rs:944`–`:958`, `:1706`–`:1737`, `:786`–`:787`; `contract.md:4344`; `src/error.rs:195` |
| `KC-14` | **nothing in the tree declares a restore-from-outside route** | **VERIFIED as a NEGATIVE at `§23.4`'s searched set; the corrupt arm's clause is positive (`no rollback composes`, `the bytes stand`)** | `contract.md:4201`; `store.rs:1714` |
| `KC-15` | **two instances over one `filePath` are the caller's own declared hazard**, and a package-side refusal of a second instance is a FAILURE | **VERIFIED** | `docs/specs/storeroom-js/contract.md:2512`–`:2517`, `:3244`–`:3245`, `:3250`–`:3251`, `:3255`–`:3256` |
| `KC-16` | **the terminal arm's save is its FIRST act, before any body of the delivered set** | **VERIFIED** | `delivery.mjs:858`–`:864`, `:888`–`:947`, `:987`; `surface.md:1896`, `:1897` |
| `KC-17` | **`D-117`'s order is ask → repairs land → re-run → SAVE → DELIVER → the member's record** | **VERIFIED** | `strata/decisions.md:6034` |
| `KC-18` | **`DD-17`/`A74`'s premise: no background work, no OS handle beyond the path, synchronous commit — *"there is no in-flight state to flush and no async resource whose abandonment could lose data"*** | **VERIFIED** | `docs/specs/storeroom-js/contract.md:2504`–`:2510` |
| `KC-19` | **`a `{listenerHandle: data}` map on the receipt is a new member on a closed record** | **VERIFIED as to the closure; the cheap device is `A117` (D6)** | `index.d.ts:616`–`:620`, `:621`–`:680`, `:962`–`:993`; `surface.md:1922`; `decisions.md:6116`–`:6123` |
| `KC-20` | **`PAR-JS-12`'s sentence: *"no other argument is declared and no return value is read"*** | **VERIFIED at a gitignored path; its live home `docs/specs/storeroom-js/parameter-semantics.md` IS ABSENT from this tree** | `.reflow-backup/docs/specs/storeroom-js/parameter-semantics.md:463`; `surface.md:1716`–`:1717`; `delivery.mjs:101`–`:102` |
| `KC-21` | the `PAR-JS` set's operative range is **`PAR-JS-1`…`PAR-JS-27`**, `23 + 4 = 27` | **VERIFIED** | `docs/specs/storeroom-js/contract.md:45` |
| `KC-22` | **the listener's declared type is `(address: Address) => void`; the runtime admission is `typeof listener === 'function'`** | **VERIFIED at the bytes; TS assignability of an `async` function to `() => void` is a language rule and `NOT DRIVEN`** | `index.d.ts:573`; `delivery.mjs:188` |
| `KC-23` | **the return value has NO destination in the shipped loop; `externalCall` answers it and the call site reads none** | **VERIFIED** | `delivery.mjs:206`; `state.mjs:338`–`:342`, `:330`–`:332` |
| `KC-24` | **`D-71`'s sentence is a PERMISSION, not a prohibition — `D-76` item 1's own correction** | **VERIFIED** | `strata/decisions.md:3915`–`:3916`, `:4065`–`:4073` |
| `KC-25` | **`D-76` item 1's tail declares the record's member set UNMOVED — and it has been read through twice, by `discarded` and `log`** | **VERIFIED** | `surface.md:1757`–`:1758`; `index.d.ts:621`–`:644` (`D-75`, 2026-10-29), `:645`–`:680` (`D-119`, 2026-11-02) |
| `KC-26` | **`WriteRecord` = three typed + two non-enumerable own accessors; `CommitRecord` = four** | **VERIFIED** | `index.d.ts:617`–`:620`, `:621`–`:644`, `:645`–`:680`; `:964`, `:966`, `:968`, `:993` |
| `KC-27` | **`DD-22` REFUSES *"an asynchronous invocation with an undeclared scheduler"* and prices a queue, a flush rule and a failure channel as unnamed** | **VERIFIED — the load-bearing Part-B byte** | `docs/specs/storeroom-js/contract.md:602` |
| `KC-28` | **`DD-23` declares a throwing body uncaught and REFUSES *"catching and reporting"*** | **VERIFIED** | `contract.md:603`; `surface.md:1667`–`:1669` |
| `KC-29` | **a failure crosses as ONE thrown plain object, `{status, message, log, address}`; *"never a `Promise` rejection"*; *"every verb is synchronous"*** | **VERIFIED** | `contract.md:591`; `index.d.ts:498`–`:502`; `surface.md:1275`–`:1278` |
| `KC-30` | **`D-130` rules a rejected body is a NEW status, `22 → 23`, with name, rank and message OWED; all bodies started together; interference the caller's own hazard; the answer withheld until the delivered set settles** | **VERIFIED** | `strata/decisions.md:6736`–`:6749`, `:6751`–`:6752` |
| `KC-31` | **`D-130` item 2 of what it does not settle: *"which rejection crosses when several bodies reject"* is SILENT** | **VERIFIED** | `strata/decisions.md:6757` |
| `KC-32` | **`D-130` item 3 of what it does not settle: WHERE the status crosses is SILENT** | **VERIFIED** | `strata/decisions.md:6758` |
| `KC-33` | **the delivery's call census is FIVE `deliver(` sites — `index.mjs:334`, `:887`; `delivery.mjs:575`, `:987`; `constraints.mjs:3037`** | **VERIFIED by grep this date; `strata/research.md §19`'s `A-3` (*"and no fourth site"*) is STALE of this tree** | the five sites |
| `KC-34` | **`surface.md:1728` declares the delivery's closed list of instants, four of them registration instants** | **VERIFIED** | `surface.md:1728` |
| `KC-35` | **a reversal's judgement delivers, at `D-117`'s order, and its own record is unchanged at three members** | **VERIFIED** | `constraints.mjs:3037`; `decisions.md:6029`–`:6039`, `:6050`–`:6051`; `index.d.ts:845`–`:847` |
| `KC-36` | **`P-SR-7` refuses a WASM module *"loaded at any point to reach the store"*** — its subject is the LOAD, not a WASM build | **VERIFIED at the clause; the subject-reading is this audit's and not the architect's** | `docs/specs/storeroom-js/contract.md:3272`, `:3276`–`:3277`, `:3423` |
| `KC-37` | **`D-112` put the reversal's save carrier to L1 and named three forms, one of which is *"a package act that reaches the store's own writer through a channel the corpus already declares"*** — the corpus's ONLY prior text near a pluggable writer, and it is unclosed and about a different act | **VERIFIED; the later resolution is `D-116` item 2's state-keyed absent carrier** | `strata/decisions.md:5784`–`:5788`; `facade.rs:1022`–`:1033` |
| `KC-38` | **no ruling, clause, cell or guide sentence anywhere names a pluggable persistence backend, `saveCall`, a batching channel, an object store, `localStorage` or `IndexedDB`** | **VERIFIED as a NEGATIVE; the searched sets and the nine non-subject matches are printed at `§23.4`** | as printed |
| `KC-39` | **`brief.md §5` invariant 6: *"The file is the store's. Never read, edit, parse or migrate it by hand; a migration reads through the store and writes through the store"*** | **VERIFIED; its subject is a hand and a migration and it does not reach a caller-supplied callback** | `strata/brief.md:333`–`:334` |
| `KC-40` | **`commit_file` carries NO empty-path guard, and `write_file` carries none either** | **VERIFIED at the bytes; the consequence is `NOT DRIVEN`** | `store.rs:1581`–`:1611`, `:1515`–`:1533`, against `:3411`–`:3413` |
| `KC-41` | **`read` at the empty address answers the whole register** — the route an arm that serializes package-side would take | **VERIFIED** | `index.d.ts:1034` |

**AND THE STALE FIGURES THIS PASS FOUND IN UPSTREAM DOCUMENTS, LISTED SO A CARRIED NUMBER IS NOT READ AS A MEASUREMENT** (the second binding rule). **Each is `MOVES`-class and each is named at its own byte; NONE is this section's to correct.**
- **`index.d.ts:218`** prints *"the instance's `12` own members (`4 → 12` ✓)"*. **The tree says `15`.**
- **`index.d.ts:997`–`:999`** prints *"THE FOURTEEN OWN MEMBERS … `10 + 1 + 1 + 2 = 14` ✓"*, and **`:1003`** names the same figure again. **The tree says `15`** — already filed as a stale class at `strata/proposals.md:1103` (`C-9`).
- **`index.d.ts:325`–`:339`** prints *"THE SIXTEEN MEMBERS BELOW"*. **The tree says `22`**; the same file's own `:415` prints the correct algebra `= 22`.
- **`docs/specs/storeroom-js/surface.md:1269`** prints *"one of the store's closed `16` members"*. **The tree says `22`.**
- **`docs/specs/storeroom-native/contract.md:3981`** prints *"any **third** key on `cfg`"*. **The declared set is `four`** (`surface.md:171`), so the row's subject is now the fifth.
- **`strata/brief.md:244`** prints *"A `delete` performs no file I/O at any tier scope and a `rollback` performs none either"*, and **`brief.md:335`** prints *"only `file`-tier writes touch bytes"*. **`D-106` and `D-112` moved both, and the tree saves at a `delete`'s terminal arm and at a reversal's judgement** (`src/store.rs:1581`, `:3411`); `P-4`'s `C-3` names `surface.md:1819`–`:1823` as the same stale class.
- **`strata/decisions.md:5435`** quotes the eligibility predicate as `if self.journal[index].op.tier != Some(Tier::File) { return Ok(()) }`. **The shipped line is `if !self.save_owed(index) { return Ok(()) }`**, `src/store.rs:1589` — the row's own item 2 supersedes it.

---

### §23.11 · THE COLLISION INVENTORY — `REVERSAL` / `DECLARATION` / nothing

**The three classes are used in the senses the intake gives them: a `REVERSAL` is a DECLARED REFUSAL — a sentence in a `what it REFUSES` cell, or a declared prohibition — which the fresh ruling every `DD` row names is the instrument for; a `DECLARATION` is a declared state, figure, order or member set that MOVES and is amended by a bounded amendment; and *nothing at all* is a collision that does not exist. A SILENCE is named SILENT and is never counted as either.**

#### Part A — `saveCall`

| # | the declared sentence / set | its bytes | class | why |
|---|---|---|---|---|
| `A-C1` | `cfg` is **four declared keys and no fifth** | `index.d.ts:208`–`:219`; `surface.md:171`; `brief.md:205` | **`DECLARATION`** | the arity figure `4 → 5`. **`surface.md:171`'s own 2026-10-16 clause rules that *"NO FIFTH KEY"* is *"a CONSTRAINT ON THE PACKAGE'S OWN PASSING — THE PACKAGE ADDS NO KEY THE CALLER DID NOT SUPPLY"*; it is not a refusal of a caller's key, and the same ruling makes a caller's extra key IGNORED.** |
| `A-C2` | a caller-supplied key beyond the four is **IGNORED, never refused** | `contract.md:3981`, `:3991`–`:3996`; `frame.mjs:218`; `index.mjs:345` | **`DECLARATION`** | it declares an ANSWER (ignore). **A key the caller supplies and the package silently drops is today's state and not a wall.** |
| `A-C3` | **`file` is defined by a PROBE of a path, and *"NO SECOND PREDICATE IS AUTHORED"*** | `contract.md:4868` (`§10.4` pt. 1), `:4870` (pt. 3) | **`REVERSAL`** — *the only one Part A meets* | a `file` tier that is not a probed path **is a second answer to the reachability question**, and the clause refuses authoring it in those words. **Any arm making `file` reachable without a path reverses this clause.** |
| `A-C4` | the register's tier is **fixed at creation and never moves** | `contract.md:2807`–`:2808`; `store.rs:730`–`:747`; `brief.md:206`–`:207` | **`DECLARATION`** | the figure `file`/`mem` moves; the fixity need not. **This is where a `saveCall`-without-`filePath` store is adjudicated: it is `mem`, and `save_owed` never fires.** |
| `A-C5` | **`save_owed`'s ground: *"TRUE EXACTLY WHEN THE ACT … MOVED AT LEAST ONE VERSION STANDING AT `Tier::File`"*** | `store.rs:1666`–`:1674`, `:1640`–`:1642` | **nothing at all** | the predicate is over the journal entry's own two records and a `saveCall` at the same position reads the same answer. **A priced arm that moves nothing is a finding too.** |
| `A-C6` | **a failed save rolls back FIRST and answers `FileCommitFailed` SECOND** | `store.rs:1564`–`:1568`, `:1601`–`:1609`; `surface.md:1899`; `brief.md:246`–`:247` | **`DECLARATION` whose MECHANISM IS LOST** | the order is declared, and its producer is `commit_file`'s `Err` arm. **A save performed outside the store leaves the declaration standing and the mechanism with no home** — which is worse than a moved figure and is not a `REVERSAL`. |
| `A-C7` | **the boot's three classes, and rank `22` `FileImageRefused`** | `store.rs:958`, `:1706`–`:1737`, `:786`–`:787`; `contract.md:4344`; `src/error.rs:195` | **`DECLARATION` at its own subject; SILENT at the restore** | **no clause refuses a restore-from-outside route; none declares one.** §23.4's negative stands. |
| `A-C8` | **two instances over one `filePath` are the caller's own hazard; a package-side refusal is a FAILURE** | `contract.md:2512`–`:2517`, `:3244`–`:3245`, `:3255`–`:3256` | **SILENT at the new clique; `DECLARATION` at the old words** | *"a package-side refusal of a second instance over one path"* on `P-SR-6`'s failure list is a **declared refusal of a refusal** — it forbids the package answering this hazard, which binds any arm here. |
| `A-C9` | **the terminal arm's save-first order and its before-any-body clause** | `delivery.mjs:858`–`:864`, `:888`–`:947`; `surface.md:1896`, `:1897` | **`DECLARATION`**; **`REVERSAL` only through the async half** | an `async saveCall` makes cl. 3 (ii) *"no body before the save"* a settled-set clause, which is `DD-22`'s refusal (`contract.md:602`). |
| `A-C10` | **`D-117`'s chain, instant for instant** | `decisions.md:6034`; `surface.md:1728` | **`DECLARATION`** | the SAVE instant becomes a region; the order does not move. |
| `A-C11` | **`DD-17`/`A74`: *"no in-flight state to flush and no async resource whose abandonment could lose data"*** | `contract.md:2506`–`:2510` | **`DECLARATION` (a premise, not a `REFUSES` cell)** | **the nearest thing to a refusal of `async` anywhere, and it is a stated premise of a ruling about `dispose()`.** Not called a refusal here. |
| `A-C12` | **`commitFile`'s arity `1`, the dispatcher set's `8`, the addon's `5`, `10 + 2 = 12`, `4 + 12 = 16`** | `facade.rs:1028`–`:1033`; `surface.md:1915`, `:1917` | **`DECLARATION`** | reached only by an arm in which the store must hand the package its image. |
| `A-C13` | **`brief.md §5` inv. 6 — *"The file is the store's. Never read, edit, parse or migrate it by hand"*** | `brief.md:333`–`:334` | **SILENT for a caller-supplied callback** | the invariant's subject is *a hand* and *a migration*. **Not called a refusal.** |
| `A-C14` | **`A57` / inv. 5 — the store invokes no callback** | `surface.md:387`; `brief.md:331`–`:332`; `frame.mjs:42`–`:44` | **nothing at all** | the package invoking is the permitted half. **A pass filing this as `A57` breach has read the wrong boundary.** |
| `A-C15` | **`cfg`'s plain-object class gate** | `frame.mjs:204`–`:210` | **nothing at all** for a plain-object `cfg`; **SILENT** for a non-function `saveCall` | a new outside value with no declared answer. |
| `A-C16` | **every `file`-tier cell** | `FTS-*`; `acp_*`; `S-TWO-PATHS`, `S-PROBE-DRY`, `S-CONSTRUCT`, `S-COUNT` | **`NOT DRIVEN`** | **which redden is a measurement.** |

#### Part B — `channel`

| # | the declared sentence / set | its bytes | class | why |
|---|---|---|---|---|
| `B-C1` | **`PAR-JS-12`: *"no other argument is declared and no return value is read"*** | `surface.md:1716`–`:1717`; `.reflow-backup/…/parameter-semantics.md:463`; `delivery.mjs:101`–`:102` | **`DECLARATION`** | it is a parameter's `domain` sentence at a kept contract, **not a `what it REFUSES` cell**. **`P-4`'s `W-5` states the amendment home and calls it available; this section agrees and does not soften it.** |
| `B-C2` | **`D-71`: *"The caller does not need to know about the outcome of the listeners"*** | `decisions.md:3915`–`:3916` | **nothing at all** | **by `D-76` item 1's own correction it is a PERMISSION** (`:4065`–`:4073`). **A channel carrying return values does not reverse it.** |
| `B-C3` | **`D-76` item 1's tail: *"The record's member set is UNMOVED by the correction"*** | `surface.md:1757`–`:1758` | **`DECLARATION`, and it has already been read through twice** | `discarded` (`index.d.ts:621`–`:644`) and `log` (`:645`–`:680`) were added under `A117` (D6) / `D-119` item 3 after it. **Its extent is that correction's.** |
| `B-C4` | **`WriteRecord` = 3 typed; `CommitRecord` = 4; `DeleteRecord`'s own set; `triggered`/`pending`'s element type is the total `{handle, address}` pair** | `index.d.ts:616`–`:620`, `:962`–`:993`, `:695`–`:698`; `surface.md:1731`, `:1922` | **`DECLARATION` at the member count; `REVERSAL` at the pair's totality** | **a `{listenerHandle: data}` value pushed INTO `triggered` or `pending` breaches the total pair type, and that totality is a declared prohibition** (`surface.md:1731`). **A new member BESIDE them moves a census and not a refusal.** |
| `B-C5` | **`DD-22` refuses *"an asynchronous invocation with an undeclared scheduler"*; its `alt` prices a queue, a flush rule and a failure channel as unnamed** | `contract.md:602` | **`REVERSAL`** for a batched/asynchronous channel | **the instrument is named at the row: *"a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment"*.** |
| `B-C6` | **`DD-23` declares a throwing body uncaught and REFUSES *"catching and reporting"*; a *"collected error report"* is a refused alternative; a *"rollback triggered by a listener's throw"* too** | `contract.md:603`; `surface.md:1667`–`:1669` | **`REVERSAL`** | a channel that captures a body's throw to carry it is the refused act. |
| `B-C7` | **the failure crosses through ONE form, `{status, message, log, address}`, and *"never a `Promise` rejection"*; *"every verb is synchronous"*** | `contract.md:591`; `index.d.ts:498`–`:502`; `surface.md:1275`–`:1278` | **`REVERSAL`** for a rejection-crossing channel; **`DECLARATION`** for a thrown four-member with the 23rd member | the form's one-ness is a declared refusal of a second form. |
| `B-C8` | **`D-72`'s nesting — *"every level a synchronous call on one thread"*** | `surface.md:1770`–`:1777`; `decisions.md:3937`–`:3953` | **`DECLARATION`** | `D-130` item 4 has already moved the premise by ruling the wait (`:6751`); **`AL-6`/`RM-5` remain open and `A112`'s conformance stays `OWED`** (`brief.md:344`–`:358`). |
| `B-C9` | **the delivery's closed list of instants, and *"ONCE PER DISTINCT HANDLE AT EVERY INSTANT; NO DELIVERY ON A REFUSING ARM"*** | `surface.md:1728`, `:1664`–`:1666` | **`DECLARATION`** | a channel invoked at each of the five sites moves no instant; **a channel that accumulates ACROSS sites has no declared instant to fire at** (`§23.6 (d)`). |
| `B-C10` | **a reversal's judgement delivers, and the reversal's record is unchanged at `{opId, undoneOps, restoredTo}`** | `constraints.mjs:3037`; `decisions.md:6029`–`:6039`, `:6050`–`:6051`; `index.d.ts:845`–`:847` | **`DECLARATION`** | a channel's answer at that instant has **no declared destination**, and the record is closed at three. |
| `B-C11` | **`state.listenerFailure` is ONE slot, `delivery.mjs:580`** | `decisions.md:6760`; `delivery.mjs:580` | **`DECLARATION` (already named open by `D-130` item 5 of its unsettled)** | a channel reading a return value at the four registration instants becomes a **second consumer** of a slot declared single. |
| `B-C12` | **`A74`'s *"no in-flight state to flush"*** | `contract.md:2509` | **`DECLARATION`** | a batch is in-flight state by definition. |
| `B-C13` | **the instance's fifteen own members** | `index.d.ts:1047`–`:1416` | **`DECLARATION`** | only if the channel is an instance member at all — **which the request never says** (`§23.0`). |
| `B-C14` | **the census over `Object.keys` / `Object.getOwnPropertyNames`** | `surface.md:1922`; `decisions.md:6116`–`:6123` | **nothing at all, if the member rides `A117` (D6)'s device** | **a priced arm that moves no census is a finding.** |
| `B-C15` | **`brief.md §5` inv. 3 — *"No own member of the instance is data. The only route to state is a read"*** | `brief.md:328` | **nothing at all** | a return value is not instance state. |

---

### §23.12 · THE ARMS — priced, none chosen, none ranked

**No release class is claimed** (`D-124` item 3's discipline). **Each `Moves` cell names the declared set at `path:line`. A priced arm whose `Moves` cell reads NONE is a finding and is printed as one.**

#### Part A — `saveCall`

| `#` | the shape | what moves | what it meets |
|---|---|---|---|
| **(a)** | **the store gains a readout of its own image; the package persists it through `saveCall`** | **a NEW addon entry or a NEW position on the existing one** — reaching `file_snapshot` (`store.rs:1482`–`:1492`) or the `json::encode` at `:1516`, either of which is *"a tenth addon entry, a position on the existing one, or a package act that reaches the store's own writer"* (`decisions.md:5787`) → the addon's `5` exports or `commitFile`'s arity `1` (`facade.rs:1028`–`:1033`), the dispatcher set's `8` (`surface.md:1915`), the censuses `10 + 2 = 12` / `4 + 12 = 16`; `delivery.mjs:939`'s one-position call; **`store.rs:1564`–`:1609`'s rollback mechanism has no home** (`A-B2`); `§2.11` cl. 5 (`surface.md:1899`); **`brief.md:241`–`:244`'s *"the save belongs to the package's terminal arm"*** reads differently — **the package now writes**; `§7.2` `M-12`'s *"the whole serialized state is written to a sibling and renamed over the path"* (`store.rs:1494`–`:1495`) has no actor. **Member set `15` unmoved · status set `22` unmoved · record members unmoved** | **`D-112`'s unclosed class, reopened**; **`A-C6` loses its mechanism**; **and the image stays the STORE's composition, so `FileImageRefused` keeps a coherent subject** |
| **(b)** | **the package serializes the register through `read([])` and the store never saves** | **`read` at the empty address answers the whole register** (`index.d.ts:1034`) — so the call exists — **and the answer is `read`'s ASSEMBLY, not the store's IMAGE**: `file_snapshot` (`store.rs:1482`–`:1492`) walks `assemble_at_tier(reference, Tier::File)`, and `write_file`'s own verification re-decodes the text and refuses an image the loader would refuse (`:1522`–`:1524`). **A blob persisted outside that pair is not this store's image, so a boot over it answers rank `22` `FileImageRefused`** (`store.rs:1737`; `contract.md:4344`) — **and there is NO restore-from-outside route to declare one** (`contract.md:4201`). Moves: `store.rs:1516`–`:1533` whole; `contract.md:4344`; **`§10.4` part 3's *"FIXES THE REGISTER AT `file`"***; **`brief.md:333`'s *"a migration reads through the store and writes through the store"* — this arm reads through the store and writes AROUND it**; `DD-28`'s *"produced by a successful `file`-tier `write` ONLY"* read through `D-106` | **`A-C3`'s `REVERSAL`** (a `file` register with no probed path) **and `A-C7`'s silent restore**; **the cheapest arm at the store's bytes and the dearest at the boot's** |
| **(c)** | **`saveCall` receives the commit's op/record only, and the consumer replays it** | **NOTHING IN THE STORE MOVES** — the op is the store's own eight-member `JournalOp` (`index.d.ts:599`–`:606`: `opId`, `kind`, `address`, `tier`, `before`, `after`, `seq`, `compacted`) and `before`/`after` are `BaseState = {present, value}` (`:576`–`:583`), which is a **replayable delta**. The package already holds the record at `delivery.mjs:887`–`:947`. **Moves: `§2.11` cl. 2's act identity, `:939`'s call, and the *order* sentence's subject — the store's own save would still run, or be suppressed** | **NO `REVERSAL`**; **`A-C5` moves nothing** (the predicate still answers, the answer is ignored); **and the arm's real cost is that a delta is not an image** — `before`/`after` at a shadowed address is a LIST (`store.rs:2036`–`:2038`), so a consumer replaying deltas meets a shape the store's image never has |
| **(d)** | **`saveCall` is advisory and the store still writes when a `filePath` exists** | **NOTHING MOVES** — `commit_file` runs exactly as at `store.rs:1581`–`:1611`; `saveCall` is a second, unread notification; `save_owed`, `FileCommitFailed`, the rollback, the boot and the two-instance hazard all keep their producers. **The only sentence engaged is `cfg`'s arity** (`A-C1`, `DECLARATION`) **and `PAR-JS-12`'s cousin for a `cfg` callback's return value, which does not exist** | **a priced arm that moves nothing but one figure** — and **it does not do what the request asks**: *"instead of writing to the filePath"*. **It is printed as the arm whose `Moves` cell is nearly empty, which is the finding and not a merit** |

#### Part B — `channel`

| `#` | the shape | what moves | what it meets |
|---|---|---|---|
| **(a)** | **a per-write call, carrying each triggered listener's return value** | `delivery.mjs:206`'s discarded answer becomes read; `:188`'s admission; `:984`–`:987`'s call at the terminal arm gains a channel step; **a new member on `WriteRecord` (3 → 4 typed) or a third non-enumerable own accessor (census UNMOVED)** — `index.d.ts:616`–`:620`, `:621`–`:680`; `surface.md:1716`–`:1717`; `surface.md:1757`–`:1758`; `index.d.ts:573`; `delivery.mjs:101`–`:102`; **`state.mjs:338`–`:342`** (`externalCall` answers the thunk, so the value is already in the package's hand and no store byte moves) | **NO `REVERSAL` on the carrying** — `B-C1` is a `DECLARATION` and `B-C2` is a permission. **`§2.7` item 2's synchronous instant is met only if the value is available synchronously — which `D-130`'s `start all` + settle-wait makes available at exactly the answer's instant** (`decisions.md:6751`); **`DD-22`'s scheduler refusal binds only if the flush is scheduled**, and this arm schedules nothing |
| **(b)** | **accumulate across writes and flush on a declared boundary** | **the boundary does not exist, so the arm must MINT one** — `constraints.mjs:3037`'s per-leg drain is a **judgement** drain (`D-117`); `kernel-attempt.mjs:270`'s `drainRestart` is a **restart** drain (`D-42`/`D-54`); `pending` is a set of handles and never a batch of receipts (`index.d.ts:969`–`:993`); `DD-17`'s *"no in-flight state to flush"* (`contract.md:2509`); **`DD-22`'s queue + flush rule + failure channel, none named** (`contract.md:602`) | **`DD-22`'s `REVERSAL`** on the scheduler; **`A74`'s `DECLARATION` lost**; **and a count or a tick is a scheduler, which is the refused item verbatim** |
| **(c)** | **the channel receives and its answer IS the receipt** | **`WriteRecord`'s three typed members are replaced by a caller-supplied value** — `index.d.ts:616`–`:620`; every deep-equality over a write's answer; `index.d.ts:1121`'s return type; the `discarded`/`log` accessors' reason for existing (`:637`–`:643`, `:676`–`:679`); **`D-119`'s item 4** — *"a `write` to it throws under strict mode"* and *"the same list, the same objects and the same positions a refusal about this commit carries"* (`decisions.md:6124`–`:6128`) | **the largest move on Part B's board and it collides with `D-119`'s own one-list law**: the receipt is `D-119`'s, and a channel's answer cannot be it without the caller losing the log |
| **(d)** | **the channel is invoked only when a listener returned a value** | **NOTHING DECLARED MOVES** — *"a registered function invoked after a write whose address scope covers its listener's address"* is `PAR-JS-12`'s `observable` (`.reflow-backup/…:468`), and **an invocation conditioned on a return value is behaviour no clause names**. **Moves: nothing at `path:line`; it is a new condition with no declared home** | **SILENT** — and this is the arm whose price is that **the condition itself is undeclared**, which is a cost and not a clearance |

**TWO PRICES THESE SHAPES SHOW, STATED AS PRICES AND NOT AS ADVICE.**
- **On Part A, the expensive arms are the ones that keep the store's image coherent, and the cheap one (`(c)`) buys its cheapness by making the durable artefact a DELTA rather than an IMAGE** — i.e. by moving the store's `file_snapshot`/`write_file` pair out of the path and putting a replayer in its place. **Nothing is recommended; the trade is `SC-5`.**
- **On Part B, a per-write call schedules nothing, so it meets `DD-22`'s scheduler refusal not by reversing it but by never reaching it** — **and a batched flush reaches it on its first line.** **That asymmetry is the single most consequential fact in this section, and it is a fact, not a recommendation.**

---

### §23.13 · THE OPEN QUESTIONS — none with a default, none with a recommendation

**Each names who can answer it.** **No row carries *"nothing moves"* as a default; `P-3`'s lesson is that a default on the wrong fork is a silent ruling** (`strata/proposals.md:1238`).

#### Part A — `saveCall`

| `#` | the question | who can answer |
|---|---|---|
| **`SC-1`** | **WHERE does `saveCall` live?** A fifth `cfg` key; an instance member (which moves `15 → 16`); a module export (which moves `§2.9`'s one-name namespace); or a position on `storeCreate` (which moves `PAR-JS`'s set). **The request says *"Add two optional ones"* with no antecedent noun.** | **the architect** — and `A-C1`'s figure moves with the answer |
| **`SC-2`** | **What is `saveCall`'s declared answer, and what is its OUTSIDE form?** *"expecting a return of `True` or a verbose error log"* — is `True` a boolean, a truthy value, or the store's own outcome shape (`{ok: true, op}` is the kernel's credit form, `kernel-registration.mjs`'s registration credit)? **And a non-function `saveCall` — is it `cfg`'s `AddressMalformed` class gate (`frame.mjs:204`–`:210`), a registration-style `TypeError` (`PAR-JS-12`'s one non-store form), or ignored like a fifth key (`contract.md:3981`)?** | **the architect**; **the non-function arm is a measurement of which existing refusal fires** |
| **`SC-3`** | **What does a `file`-tier op answer on a path-less store?** `commit_file` carries no empty-path guard (`store.rs:1581`–`:1611`) while its state-keyed sibling does (`:3411`–`:3413`), and `write_file` at `:1525` would name `".snst-commit-<pid>"` and rename onto `""`. **Is this a defect, a declared no-op, or unreachable because a `file`-tier write on a `mem` register is refused somewhere this section did not find?** | **a measurement, then the architect if the measurement finds an act** — **`NOT DRIVEN`** |
| **`SC-4`** | **Does `saveCall` REPLACE `cfg.filePath` or stand beside it?** The request's own sentence says *"instead of writing to the filePath"* **and keeps `filePath` in its text.** *"advisory … and the store still writes when a `filePath` exists"* is `§23.12 (d)` — **and it does not do what the sentence asks.** | **the architect** |
| **`SC-5`** | **If the package persists, is the durable artefact the store's IMAGE or a DELTA the consumer replays?** An image keeps `write_file`'s re-decode verification (`store.rs:1522`–`:1524`) and `FileImageRefused`'s subject (`:1737`); a delta is replayable from `JournalOp`'s `before`/`after` (`index.d.ts:599`–`:606`) **but a shadowed address's `before` is a LIST** (`store.rs:2036`–`:2038`). | **the architect** |
| **`SC-6`** | **Who rolls a failed save back?** `§2.11` cl. 5's *"the store rolls the write back … and the caller receives `FileCommitFailed` after that rollback"* (`surface.md:1899`) is declared and its producer is `commit_file`'s `Err` arm (`store.rs:1601`–`:1609`). **If the save leaves the store, does the store gain a rollback entry, does the package compose one (which would be a second rollback mechanism), or does the declaration lose its mechanism?** | **the architect** — a store-side act and a package-side mechanism are different classes |
| **`SC-7`** | **What is a `saveCall`-backed register's TIER, and does `file` remain a probed path?** `§10.4` pt. 1 refuses a second reachability predicate in those words (`contract.md:4868`). **`file` is the only tier durability is a property of** (`brief.md:241`), and `save_owed` keys on it (`store.rs:1666`). | **the architect** — **and if `file` is redefined, this is the section's one `REVERSAL`** |
| **`SC-8`** | **Is *"the future WASM version"* in scope of `P-SR-7`'s *"no WASM module is loaded at any point to reach the store"*?** This section's reading is that the clause's subject is the load-time reach and not a WASM build — **and that reading is this audit's and not the architect's.** | **the architect** |
| **`SC-9`** | **Which `file`-tier cells turn, and which of the four `S-CONSTRUCT` strategies and the `acp_*` probe cells lose their premise?** | **a measurement** — `NOT DRIVEN` |
| **`SC-10`** | **Does a second instance over one BACKEND stand under the two-instance hazard's declared reading, or does it need its own sentence?** `contract.md:2512`–`:2517` declares the hazard for a `filePath`, and `:3256` forbids the package answering it. | **the architect** |
| **`SC-11`** | **The release class.** `MAJOR` if a probed `file` tier moves; `MINOR` if a fifth key is admitted beside it. **No class is claimed here** (`D-124` item 3's discipline). | **the architect, once the shape is named** |

#### Part B — `channel`

| `#` | the question | who can answer |
|---|---|---|
| **`CH-1`** | **WHERE does `channel` live, and is it a `cfg` key or a registration act?** *"If a channel is registered"* names a registration verb that does not exist; a `cfg` key inherits `A-C1`'s arity move; an instance member moves `15 → 16`. | **the architect** |
| **`CH-2`** | **At WHICH of the five delivery sites is the channel invoked?** *"with the write receipt"* exists at sites 1 and 2 and at no other (`§23.9 (a)`); sites 4 and 5 answer an identity and a repair's `triggered` (`surface.md:1728`). | **the architect** |
| **`CH-3`** | **Which value crosses when SEVERAL listeners return one?** This is `D-130`'s own open item 2 in the listener's voice — *"First to settle wins, a declared order, a list, or one refusal per call — SILENT"* (`decisions.md:6757`) — **and a channel that carries every value makes it structural.** **Does the `{listenerHandle: data, …}` map fix it by construction (one entry per handle), or does a key collision across a replaced handle need a rule?** | **the architect** |
| **`CH-4`** | **Is a channel failure a refusal, and by which route?** A thrown four-member carrying the 23rd status `D-130` has ruled but not named; a caught-and-reported failure (`DD-23`'s refused act, `contract.md:603`); or a throw through to the caller (`surface.md:1667`–`:1668`). **`D-130` item 3 of its unsettled says *"it does not say HOW it reaches the caller"* (`:6758`).** | **the architect** |
| **`CH-5`** | **Where does the channel's answer LAND, if anywhere inside the package?** A new member on `WriteRecord` (3 → 4 typed, or a third accessor under `A117` (D6), census unmoved); nothing (the owner's *"(End of package scope)"*); or a `DeleteRecord`/reversal asymmetry. **The reversal's record is closed at three and *"no member is added"*** (`decisions.md:6050`–`:6051`). | **the architect** |
| **`CH-6`** | **Is the channel per-write or batched, and if batched, WHAT IS THE FLUSH BOUNDARY?** A per-pass drain, a count, a tick. **`DD-22` prices a queue and a flush rule as unnamed and refuses an invocation with an undeclared scheduler** (`contract.md:602`); **`DD-17` declares *"no in-flight state to flush"*** (`:2509`). | **the architect; a tick would also need a measurement of the sync-graph law** (`contract.md:2379`) |
| **`CH-7`** | **Is the channel invoked only when a listener returned a value?** Nothing in the tree conditions an invocation on a body's answer; `PAR-JS-12`'s `observable` declares *"a registered function invoked after a write whose address scope covers its listener's address"* with no value term. | **the architect** |
| **`CH-8`** | **What is the channel's declared answer, and is a non-function channel refused where a non-function `saveCall` is?** `PAR-JS-12`'s `TypeError` is *"the ONE failure form this unit's package throws that is NOT the store's"* (`.reflow-backup/…:465`) — **a second such site is a second form, and `DD-12`'s one-form law is a declared refusal.** | **the architect** |
| **`CH-9`** | **Does the request move `A112`'s conformance, and is its measurement now taken before or after?** `A112`'s green is `OWED` on this branch and the archived tracker measured it red on 2026-10-15 (`brief.md:344`–`:358`; `P-4`'s `FR-6`/`RM-5`). | **a measurement, then the architect** — `NOT DRIVEN` |
| **`CH-10`** | **Does `channel` compose with `D-130`, or restate it?** `D-130` item 4 has ruled the answer waits until the delivered set settles; a channel invoked at that instant with each listener's value is **`D-130`'s window plus one read**, and the architect has not been asked whether the channel's value is inside or beside that window. | **the architect** |
| **`CH-11`** | **The release class.** | **the architect** |

---

### §23.14 · THE MEASUREMENT — `NOT DRIVEN`, and the instrument written down

**WHAT WAS IMPOSSIBLE, SAID PLAINLY.** This pass held no shell. **It ran no `node`, no `git`, no `mktemp` and no `import()`, and it could not create a temp directory.** **Not one arm of either Part is measured, and no exit code, no `stderr` and no output exists to print.** `§20.4`'s convention is repeated verbatim (`strata/research.md:1803`).

| the arm | what this pass can say instead | its verdict |
|---|---|---|
| **`saveCall` on a `filePath`-less store** | `register_tier` is `Mem` (`store.rs:730`–`:731`); `save_owed` answers `false` for every op that moved nothing at `Tier::File` (`:1666`–`:1674`); `commit_file` returns `Ok(())` at `:1590` | mechanism **VERIFIED**; the observable — **`saveCall` invoked `0` times** — **`NOT DRIVEN`** |
| **a `file`-tier write on a `filePath`-less store** | `commit_file` carries no empty-path guard (`:1581`–`:1611`) and `write_file` carries none (`:1515`–`:1533`); `file_path` is `""` (`:690`, `:730`) | **`NOT DRIVEN`** — this is `SC-3`, and it is the section's sharpest unmeasured fact |
| **a `saveCall` that returns `false` or throws** | `§2.11` cl. 5's rollback lives in `commit_file`'s `Err` arm (`:1601`–`:1609`); a package-side save has no such arm | **`NOT DRIVEN`; the mechanism's absence is `VERIFIED`** |
| **a channel at a per-write call** | `externalCall` already answers the thunk's value to the caller (`state.mjs:338`–`:342`) and `delivery.mjs:206` discards it — **so the value is in the package's hand with no store byte moved** | mechanism **VERIFIED**; the carriage **`NOT DRIVEN`** |
| **a batched channel** | no timer, scheduler, queue or flush rule exists in `bindings/js/**`; `DD-17` `contract.md:2507`–`:2509`; `DD-22` `:602` | **`NOT DRIVEN`; the absence is `VERIFIED`** |
| **an `async` listener's return value at the receipt** | `D-130` item 4's settle-wait (`decisions.md:6751`) is a **ruling and not a shipped byte**; nothing implements it | **`NOT DRIVEN`** |
| **TypeScript assignability of `async` to `Listener`** | `index.d.ts:573`; `tsc` was not run | **`NOT DRIVEN`** |

**AND THE DRIVES, PRINTED SO A PASS WITH A SHELL RUNS THEM UNCHANGED** — **each in a `mktemp -d` outside the repository, each stating the addon it drove and its mtime, and each recording the whole of `stderr` beside `stdout`:**

```
T=$(mktemp -d); cd "$T"
cat > save.mjs <<'EOF'
const { storeCreate } = await import('/media/ryanr/Shared Files/Projects/Provident-Storeroom/bindings/js/index.mjs');
const tag = process.argv[2];
// ARM 1: a mem store, a fifth key present, a `file`-tier write.  Does commitFile run at all?
// ARM 2: a filePath store; the file's sha256 and mtime before and after an identical write.
// ARM 3: a filePath store with an unwritable parent swapped in AFTER construction (post-construction drift).
let cfg = { journalLength: 16, listeners: [] };
if (tag !== '1') cfg = { ...cfg, filePath: `${process.cwd()}/${tag}.json` };
if (tag === '1') cfg.saveCall = () => { throw new Error('saveCall REACHED on a path-less store'); };
const store = storeCreate(cfg);
let reached = 'not-reached';
process.on('exit', (c) => console.log(`[${tag}] exit=${c} last=${reached}`));
process.on('unhandledRejection', (e) => console.log(`[${tag}] UNHANDLED`, e && e.message));
reached = 'before-write';
let rec, thrown;
try { rec = store.write(['k'], tag === '1' ? 'file' : 'file', 'v'); } catch (e) { thrown = e; }
reached = 'after-write';
console.log(`[${tag}] thrown=`, thrown && (thrown.status || thrown.message));
console.log(`[${tag}] rec=`, rec ? JSON.stringify(rec).slice(0, 240) : String(rec));
EOF
for arm in 1 2 3; do echo "=== ARM $arm ==="; node save.mjs $arm 2>&1; echo "[shell exit=$?]"; done

# AND BESIDE IT, THE BYTES:
#   ARM 1 must record whether the process wrote `.snst-commit-<pid>` into $T (ls -a) — SC-3's observable.
#   ARM 2 must record sha256sum and stat -c %Y of the path across an identical write — D-106 item 2's / save_owed's.
#   ARM 3 must record the status of the write after the parent becomes unwritable — FileCommitFailed BEFORE any rollback observable.
# AND ONE MORE, WHICH IS PART B's:
cat > chan.mjs <<'EOF'
const { storeCreate } = await import('/media/ryanr/Shared Files/Projects/Provident-Storeroom/bindings/js/index.mjs');
const store = storeCreate({ journalLength: 16, listeners: [], channel: (...a) => console.log('CHANNEL', JSON.stringify(a).slice(0, 200)) });
store.listen('h', [['a']]); store.register('h', () => { console.log('BODY RAN'); return { data: 42 }; });
console.log('rec=', JSON.stringify(store.write(['a'], 'mem', 1)).slice(0, 200));
EOF
node chan.mjs 2>&1; echo "[shell exit=$?]"
# It must record: whether the fifth key `channel` produced ANY diagnostic (KC-5 predicts none), and whether
# the listener's returned value reached any declared member (KC-23 predicts it did not).
```

**EACH MUST RECORD, AND NOTHING IN THIS TREE PREDICTS:** the exit code · the whole of `stderr` · **whether the act reached the store's writer at all** · **whether a fifth `cfg` key produced a diagnostic** (KC-5 predicts it does not) · **and whether a listener's returned value reached any declared member** (KC-23 predicts it does not). **The addon a PASS needs is built at this `HEAD`** (`bindings/js/build/Release/storeroom_js_binding.node`, present — `§22.7` records it at `1,456,712` bytes), **so no build is owed; the next pass must state WHICH binary it drove and its mtime.**

---

### §23.15 · SUMMARY

**TOKEN: `PART-A: SILENT-AT-THE-SUBJECT, DECLARED-AT-THE-TIER` · `PART-B: DECLARED-SENTENCE, PLUS TWO REFUSALS ON ITS ASYNC AND FAILURE ARMS`.**

**One sentence per subject, as the seven things require:**

> **`saveCall` meets NO declared refusal whose subject it is, and it meets one declared refusal one subject over: the corpus nowhere declares a pluggable persistence backend, a caller-supplied save, or a route by which bytes reach the store's file other than its own writer (`0` matches across `strata/**` and `docs/specs/**` at the patterns printed at `§23.4`) — but `§10.4` part 1 REFUSES *"a second reachability predicate"* in those words, and `file` is defined by a probe of a path, so any `saveCall` store is either a `mem` register on which `save_owed` never fires and the function is invoked zero times, `OR` a `file` register whose `file` is no longer the thing the clause defines.**
>
> **`channel` meets a declared SENTENCE it would rewrite — *"no other argument is declared and no return value is read"* (`surface.md:1716`–`:1717`; `PAR-JS-12`) — and NOT a refusal, because `D-71`'s *"does not need to know"* is a PERMISSION by `D-76` item 1's own correction; `AND` on its two harder readings it meets two refusals squarely: `DD-22`'s *"an asynchronous invocation with an undeclared scheduler"*, which a BATCHED flush reaches on its first line and a per-write call never reaches at all, and `DD-23`'s *"catching and reporting a throwing body"*, which a channel that reports a body's failure is.**

**WHAT THE RECORD ANSWERS.** **Part A:** the entry's one position and the store's one writer (§23.1) · the tier fixed at creation and `file`'s probe (§23.2) · the eleven-row break inventory (§23.3) · the prior rulings **`NONE`**, with the searched set printed (§23.4). **Part B:** the three sites of the return-value sentence and the thirteen amendments it would owe (§23.5) · `DD-22`'s flush price and the three boundaries the record could host, one of which is a scheduler (§23.6) · the three member sets and the census device that already crossed `D-76` item 1's tail twice (§23.7) · a channel failure's four candidate dispositions, none decided, and `D-130`'s plurality made structural (§23.8) · the five delivery sites and the reversal's closed three-member record (§23.9).

**WHAT IT REFUSES TO ANSWER, NAMED AS SILENCE — ELEVEN `SC` AND ELEVEN `CH`, and the eight that matter most.**
- **`SC-1`** where either key lives · **`SC-2`** what `saveCall`'s `True` is and what a non-function one answers · **`SC-3`** what a `file`-tier op does on a path-less store (`NOT DRIVEN`) · **`SC-5`** image or delta · **`SC-6`** who rolls a failed save back · **`SC-7`** whether `file` remains a probed path.
- **`CH-2`** which of the five delivery sites · **`CH-3`** which value crosses when several do · **`CH-4`** a channel failure's disposition · **`CH-5`** where the answer lands · **`CH-6`** per-write or batched, and the flush boundary if batched.
- **NO ROW CARRIES A DEFAULT AND NONE CARRIES A RECOMMENDATION.**

---

### §23.16 · POSTSCRIPT — THE OWNER'S THREE ANSWERS AND THREE DRIVES, TAKEN AFTER THE AUDIT (`DRAFT`, supervisor's own pass, `2026-11-17`)

**WHAT THIS POSTSCRIPT IS.** `§23` above is `role_l0_research`'s text of this date, landed **unamended** because that channel held
no write operation; its `NOT DRIVEN` markers stand as its author left them. **This postscript records two things that did not
exist when it was written**: **the owner's answers to three questions the supervisor put to him while the audit ran**, and
**three drives the supervisor then took** — the first of which **answers `§23.13`'s `SC-3` and corrects the audit's reading of
it.** **It re-prices no arm, decides no `SC`/`CH` question, and opens no unit.** **The owner's answers are recorded formally as
`strata/decisions.md` · `D-131`; this postscript is the measurement beside them.**

#### (1) THE OWNER'S THREE ANSWERS, `2026-11-17`, VERBATIM

> **`saveCall`'s payload — "The store's own file image"** (the option whose own words were: *"The store gains a readout of its
> own image and the package hands that to `saveCall`. Keeps the store the writer of record; costs a new store readout and a new
> boot route back in."*)
>
> **`channel`'s boundary — "Per write, its return is the receipt"** (the option whose own words were: *"The channel is invoked per
> write and its return value IS what the caller receives (the data the client loads), replacing or extending the receipt."*)
>
> **`saveCall` beside `filePath` — "Both allowed, saveCall wins"**

**NO ARM OF `§23.12` IS WITHDRAWN BY THESE ANSWERS; THREE ARE NARROWED.** **`(a)` on Part A is CHOSEN** — and it is the arm that
needs the new store readout `§23.3`'s `A-B12` names and `D-112` priced as *"a declaration and not an implementer's choice"*.
**`(c)` on Part B is CHOSEN** — per-write, and **its return is the receipt** — which `§23.12` priced as **the largest move on
Part B's board**, colliding with `D-119`'s one-list law and with `WriteRecord`'s three typed members. **And `(d)` on Part A
(advisory, the store still writes) is REFUSED by the owner's own third answer reversed**: instead, **the store keeps its
`filePath` route (`both allowed`) and `saveCall` takes precedence on the write path (`saveCall wins`).**

#### (2) THE DRIVES — RUN, WITH THEIR OUTPUT

**Environment, printed so nothing is swept in:** Node `v24.20.0`; `HEAD` `e3136af`; the addon is
`bindings/js/build/Release/storeroom_js_binding.node`, **`1,456,712` bytes, mtime `2026-11-17 22:46:21`**; every drive ran in a
`mktemp -d` outside the repository; the store was `storeCreate({journalLength: 16, listeners: []})`, plus `filePath` and the two
new keys on the arms that name them.

```
T=$(mktemp -d); cd "$T"
cat > d2.mjs <<'EOF'
const { storeCreate } = await import('/media/ryanr/Shared Files/Projects/Provident-Storeroom/bindings/js/index.mjs');
const tag = process.argv[2];
const called = [];
let cfg = { journalLength: 16, listeners: [] };
if (tag === 'withfile') cfg.filePath = `${process.cwd()}/store.json`;
if (tag === 'keys') { cfg.saveCall = () => { called.push('saveCall'); return true; };
                      cfg.channel  = () => { called.push('channel');  return { x: 1 }; }; }
const store = storeCreate(cfg);
store.listen('h', [['a']]);
store.register('h', () => { called.push('body'); return { data: 42 }; });
let rec, thrown;
try { rec = store.write(['a'], tag === 'withfile' ? 'file' : 'mem', 1); } catch (e) { thrown = e; }
console.log(`[${tag}] filePath=${cfg.filePath ?? '(none)'} thrown=${thrown && (thrown.status || thrown.message)}`);
if (rec) console.log(`[${tag}] keys=${JSON.stringify(Object.keys(rec))} own=${JSON.stringify(Object.getOwnPropertyNames(rec))}`);
console.log(`[${tag}] called=${JSON.stringify(called)}`);
EOF
node d2.mjs withfile; node d2.mjs keys; node d2.mjs pathless   # pathless = no filePath, a `file`-tier write
```

```
[withfile] filePath=/tmp/tmp.UhVYZ3tqcB/store.json thrown=undefined
[withfile] keys=["op","watched","triggered"] own=["op","watched","triggered","discarded","log"]
[withfile] called=["body"]
[keys]     filePath=(none) thrown=undefined
[keys]     keys=["op","watched","triggered"] own=["op","watched","triggered","discarded","log"]
[keys]     called=["body"]
[pathless] thrown=ParentAnchorMonotonicityViolation
[pathless] called=[]
```

**(a) `SC-3` IS ANSWERED, AND THE AUDIT'S READING OF IT IS CORRECTED.** **A `file`-tier write on a path-less store IS REFUSED —
measured — and it is refused BEFORE anything happens: `ParentAnchorMonotonicityViolation`, the delivered set is EMPTY
(`called=[]`, so no body ran), and no `.snst-commit-<pid>` file stands in the directory afterwards** (the drive's own `ls -a`
shows the script and nothing else). **So the missing empty-path guard `§23.1` (e) found in `commit_file` (`store.rs:1581`–`:1611`)
is NOT reached on this path: the write is refused one layer earlier, and `write_file` is never entered.** **What remains owed is
not the act but its SIGNAL — the caller learns `ParentAnchorMonotonicityViolation`, a status whose own subject is anchor
monotonicity, for a write refused because the register carries no `file` tier at all.** **That is a status-subject question and
it is nobody's to answer here: it is filed as a finding and not as a defect.**

**(b) A `file`-tier write on a store WITH a `filePath` SUCCEEDS AND WRITES THE FILE, and the delivery runs (`called=["body"]`).**
**`store.json` stood in the directory afterwards.** So the tier explanation is confirmed from the other side: `file` is entered
by the path, and the save's bytes land at the path.

**(c) THE TWO KEYS ARE IGNORED SILENTLY, TODAY, EXACTLY AS `frame.mjs:218` SAYS — measured.** **With `saveCall` and `channel`
both supplied, the construction succeeds, NEITHER FUNCTION IS EVER CALLED (`called=["body"]`), NO DIAGNOSTIC IS PRODUCED, and
the write's answer is byte-for-byte the ordinary one.** **And the listener's returned value `{data: 42}` reaches NO declared
member**: `Object.keys(record)` is `["op","watched","triggered"]` and `Object.getOwnPropertyNames(record)` is
`["op","watched","triggered","discarded","log"]` — **so `§23.12`'s `B-C` carriage row and `§23.13`'s `CH-5` are measured at
today's tree: nothing carries a return value, and nothing calls a channel.**

**WHAT THE DRIVES DO NOT MEASURE, SAID SO THEY ARE NOT READ AS SETTLED.** The `ParentAnchorMonotonicityViolation` arm did not
drive a `file`-tier write on a store whose `filePath` is present but unwritable, nor a save failure's rollback; **`SC-6`, `SC-7`,
`SC-9` and every Part B arm stay `NOT DRIVEN`.** **`A112`'s conformance stays `OWED`.** **And nothing here implements or prices the
async delivery `D-130` rules — that machinery does not exist yet.**

---

## §24 · The WASM question, after `saveCall` (`2026-11-17` · `HEAD` `e3136af`, tree uncommitted) — what the save's offload DID and DID NOT remove

**THE QUESTION, FROM THE PRODUCT'S OWNER, VERBATIM:** *"With saveCall now providing a way to offload the question of saving a file, is there anything else structurally preventing a WASM version of the store from being assessible in the client side directly?"*

**WHAT `saveCall` + `initialImage` REMOVED, SAID PLAINLY.** On a path-less `saveCall` store the package performs the durable save through the caller's function, the store never writes a byte, and no reconstruction from a file happens (`D-133` item 3; `D-144` item 5); the load side is `initialImage`, decoded by the store's own tail (`D-135` item 1). **So the PERSISTENCE dependence on a filesystem is answered for that arm — the store's state lives entirely in its register and its journal, and both halves of durability are caller-owned.** **That is the largest thing that was in the way, and it is gone.**

**WHAT REMAINS — MEASURED, AND DIVIDED BY CLASS.**

1. **CODE · SEVEN PLATFORM CALLS ARE STILL COMPILED INTO `src/store.rs`.** A grep of `src/*.rs` returns **exactly these, all in one file**: `std::fs::OpenOptions::new()` ×2 · `std::fs::write` · `std::fs::rename` · `std::fs::remove_file` · `std::fs::symlink_metadata` · `std::fs::read_to_string` — **and one `std::process::id()`**, which names the commit sibling. **They are UNREACHABLE at runtime on a path-less store** (the writer is abstained from and no file is read), **but they are compiled, and on `wasm32-unknown-unknown` `std::fs` is unsupported and `process::id()` has no browser equivalent at all.** **The remedy is small and it has a home already**: the `file` tier is ONE writer and ONE reader in ONE file, so a `#[cfg]` over that pair is a bounded act. **A WASI target would compile them, but it buys a virtual filesystem the browser then has to shim — the dearest route and the least honest one.**
2. **CROSSING · THE ADDON IS NODE-API AND THE PACKAGE'S LOADER IS A NODE API.** `bindings/js/src/*.rs` is `napi`, and the package reaches the artefact through `createRequire(import.meta.url)` (`bindings/js/index.mjs`'s own load, `artefact.mjs`). **A WASM build needs a SECOND CROSSING and a SECOND LOADER** — that is the largest remaining work, and it is not a port of the store but of the boundary: the corpus's whole discipline at the crossing (one thrown form, class-first reads, no coercion, `carryRefusal`'s unconverted crossing) lives there.
3. **REALM · A BROWSER BUILD IS A NEW CLAIMED REALM, AND THAT IS A DECLARATION AND NOT A CODE FACT.** `docs/specs/storeroom-js/contract.md:3272`'s `P-SR-7` — *"NO other realm, no second addon, no subprocess, no shared library and **no WASM module** is loaded at any point to reach the store"* — with `S-ONE-ADDON` repeating *"no WASM instantiation"*, **is a refusal of the LOAD-TIME REACH of the store and not of a WASM BUILD of it** (the reading `§23`'s `SC-8` files, marked there as the audit's and not the architect's). **But `A70`'s one-claimed-realm ruling, `DD-24`'s refusal of a *"SECOND claimed realm"*, and `HO-1`'s *supported-route* reading all point the same way**: **a client-side WASM store is the act of claiming a second realm, and no code can claim it by shipping.**
4. **AND ONE ORDER CONSTRAINT, SMALLER.** The synchronous-graph law (`contract.md:2379`; `D-129` item 4) governs the entry's load-time graph, **and `WebAssembly.instantiate` is asynchronous in a browser** — so a WASM entry cannot honour a synchronous load-time graph unless the host instantiates the module BEFORE the entry runs and injects it. **The same class of constraint `NEW-1`'s `O3` sentinel polices for `require`; not a blocker, an ordering.**

**WHAT IS *NOT* IN THE WAY, SAID SO THE LIST IS NOT READ AS LONGER THAN IT IS.** **The store's own model already fits a single-threaded host** (`D-72`: *"every level a synchronous call on one thread"*) · **the journal is in memory** · **the JSON codec is the crate's own** (no `serde`, no OS) · **the node budget and the depth ceiling are budgets, not platform facts** · **delivery's asynchrony is the PACKAGE's** and the store stays synchronous (`D-147` item 2: *"a construction's save is synchronous"*) · and **`A57`** (*the store returns handles and invokes nothing*) is a property a WASM boundary inherits unchanged.

**THE ANSWER, IN ONE PARAGRAPH.** **`saveCall` removed the persistence blocker and left three: seven `std::fs` calls and one `process::id()` compiled into one file, a Node-API crossing that a second realm would have to re-author, and the realm claim itself.** **The first is a bounded `#[cfg]`; the second is the real work; the third is the architect's to make and no pass may make it by building.** **`SC-8` stays open and is now the question that stands between the second and the third: whether a WASM BUILD is in `P-SR-7`'s scope at all — and this section's reading, like the audit's before it, is a reading.**

## §24 · THE `P-3` SEMANTIC INTAKE — LANDED 2026-11-17, AND ITS OWN CHANNEL NOTE

**THE PASS HELD NO WRITE CHANNEL AND NO SHELL**: its tool set carried read tools only, so **its returned text is landed here by the supervisor**, on the
precedent this file already records for the same class of pass (`strata/research.md` §21). **NOTHING IN IT IS A MEASUREMENT**: it names §21.7's figures as
that section's, at that section's date, and reads the code that would produce them.

**AND ITS FIRST OPERATIVE FINDING IS A WARNING FOR ANY LATER PASS: `P-3`'s OWN `path:line` RANGES HAVE DRIFTED.** Twelve of them now resolve to different
subjects because the tree moved after the proposal was written — **while the two that carry the contradiction (`docs/specs/storeroom-native/contract.md:3028`–`:3033`
and `:3149`–`:3150`) stand exactly where `P-3` printed them.** **So `P-3`'s ARGUMENT SURVIVES AND ITS LINE NUMBERS DO NOT**, and a gate-2 pass that pins them
without re-reading would pin air. **The drift table is the document's §0.3 and it is the first thing to read.**

---

# `P-3` · The semantic intake — the comparison's subject, the equality, what a no-change write still owes, what it answers, and whose break

**WHAT THIS NOTE IS.** The research intake for `P-3`'s gate-1 block (`strata/proposals.md:589`, `:616`–`:661`, verdict `BLOCKED-ON-SEMANTICS`). **IT DESIGNS NOTHING, RANKS NOTHING, DECIDES NOTHING AND OPENS NO UNIT.** It answers the five questions the block leaves open **by option and by ground**, and it ends with the questions only the architect can answer, each carrying a default I can defend.

**DATE OF READING:** this pass, on the working tree as it stands. **Every `path:line` below was read at these bytes.**

**READ THIS NOTE THROUGH §0.3.** The gate-1 record's own citations have drifted under the tree that landed after it, and three of the ranges it rests on now resolve to *different subjects*. A reader who re-derives from `P-3`'s printed ranges will read the wrong bytes.

---

## §0 · Provenance, channel, and the citation drift a re-deriver must not inherit

### §0.1 · What I did and did not do

**READ, NOT DRIVEN.** No shell was held: no `npm test`, no `cargo test`, no drive against the addon. **So this note makes no measurement and re-takes none of `strata/research.md §21.7`'s figures** (`strata/research.md:2153`–`:2183`) — it names them as that section's, at that section's date, and reads the code that would produce them.

**THE ONE THING A READ CAN ESTABLISH AND A DRIVE CANNOT:** *whether a comparison is even expressible at each candidate site* — which pre-state each candidate site can see, and which of the store's own relations is already in scope there. That is §1's and §2's whole subject, and every claim in them is a claim about the bytes.

### §0.2 · The channel

**THE PASS HELD NO WRITE CHANNEL.** Its tool set carried read tools only. **So this note is landed by the supervisor from the pass's returned text**, on the precedent `strata/research.md:1897`–`:1902` records for the `P-3` audit itself (*"its returned text is landed here by the L0 supervisor, because the pass holds no write channel"*). **No repository byte was moved by this pass.**

### §0.3 · THE CITATION DRIFT — three ranges in the gate-1 record now name other subjects

**THE TREE MOVED AFTER `P-3` WAS WRITTEN AND THE RANGES DID NOT TRAVEL WITH IT.** Each row below was read on both sides.

| what `P-3` / `§21` cites | what stands there now | where the cited subject actually stands now |
|---|---|---|
| `src/store.rs:3566`–`:3570`, the criterion docblock | `restoreMark`'s docblock | **`src/store.rs:4193`–`:4197`** — *"THE TWO ARMS ARE ONE CRITERION AND NOT TWO RULES"* |
| `src/store.rs:3571`–`:3577`, `registration_triggered` | inside `restoreMark`'s body | **`src/store.rs:4198`–`:4204`** |
| `src/store.rs:2652`–`:2657`, the write's reach | `derived_key` / `findAddress` | **`src/store.rs:3001`–`:3007`** |
| `src/store.rs:1666`–`:1674`, `save_owed` | `assemble` region | **`src/store.rs:1949`–`:1961`** |
| `src/store.rs:2221`–`:2225`, the projection law | `capture_below` | **`src/store.rs:2563`–`:2579`**, `watched_for` |
| `src/store.rs:2036`–`:2038`, the `before` view | elsewhere | **`src/store.rs:2346`–`:2348`** |
| `src/store.rs:2247`–`:2254`, `touched_below`'s two arms | `rebuild` | **`src/store.rs:2593`–`:2600`** |
| `src/store.rs:2564`–`:2567`, the read's selection | `watched_for`'s comment | **`src/store.rs:1379`–`:1385`**, `lowest` |
| `docs/guides/package-use.md:497`–`:499`, the closed firing list | the rollback / constraint clause | **`docs/guides/package-use.md:547`–`:549`**, and its correction at `:551`–`:561` |
| `docs/specs/storeroom-js/contract.md:2109`–`:2111`, the re-entrancy clause | elsewhere | **`docs/specs/storeroom-js/contract.md:2183`–`:2185`** |
| `docs/specs/storeroom-native/contract.md:3674`–`:3676`, the selection rule stated as a rule | `M-9`'s mark clause | **`docs/specs/storeroom-native/contract.md:3707`–`:3717`** |
| `contract.md:1794`, `:2237` (the read-selection rule) | unverified this pass | **NOT RE-READ — I claim nothing about these two** |

**WHAT SURVIVED THE DRIFT, AND IT MATTERS BECAUSE TWO OF `P-3`'S LOAD-BEARING ROWS ARE HERE:** `docs/specs/storeroom-native/contract.md:3028`–`:3033` (`P-TP-8` (a)) and `:3149`–`:3150` (its failure list) stand **at exactly the printed lines**, read and confirmed. **Three ranges moved; the two that carry the contradiction did not.**

**SO THE DRIFT IS A PRICE AND NOT A REFUTATION:** `P-3`'s *argument* survives; **its line numbers do not, and a gate-2 pass that pins them without re-reading would pin air.** The corpus has this class filed (`strata/walkthrough.md:88`–`:92`, cited at `strata/envelope.md:387`–`:388`): *"the figure was true when measured and was falsified by the ruling that made it true."*

---

## §1 · THE COMPARISON'S SUBJECT — what is *"the current existing value at an address"* on this store

### §1.1 · The sentence the request must be read against, at its own bytes

**`src/store.rs:4193`–`:4197`, verbatim:**

> **"THE TWO ARMS ARE ONE CRITERION AND NOT TWO RULES**: a pair is asked (and a listener told) when the act **CHANGES THE VALUE AT ITS ADDRESS** — the value read at a prefix contains its subtree, so a change anywhere below it moves it; **and a node the act CREATED OR PURGED has a value that changed, so its own registration is reached.**"

**WHAT THAT DOCBLOCK MAKES THE SUBJECT, SAID EXACTLY — AND IT IS NOT ONE THING, IT IS THREE, AND THE DOCBLOCK ITSELF DISTINGUISHES THEM:**

1. **"THE VALUE AT ITS ADDRESS" IS THE VALUE READ AT A PREFIX, AND IT CONTAINS ITS SUBTREE** — so the subject of the *ancestor* arm is **the assembled read of a whole branch**, not a leaf and not a node's own scalar. The store's `register_triggered` (`:4198`–`:4204`) is then `is_prefix(registration, address) || touched.iter().any(…)` — **a predicate over ADDRESSES with no value operand at all**, which is `P-TP-8` (a)'s landed form (`contract.md:3028`–`:3033`) and the reason `P-3`'s premise is a *reconciliation* and not a gap.
2. **"A NODE THE ACT CREATED OR PURGED HAS A VALUE THAT CHANGED"** — so the subject of the *touched* arm is **not a value at all but a membership fact about the versions the act created or removed.** This is the arm `Q-4` names and no version of the request mentions.
3. **THE DOCBLOCK'S OWN SECOND HALF IS THE ONLY PLACE IN THE TREE THAT DEFINES *"CHANGED"* OPERATIONALLY — and it defines it by CREATION AND PURGE, not by comparison.** **So the corpus's own criterion sentence, read whole, does not authorize a value comparison: it authorizes a reach.** The value comparison the request wants is a *fourth* thing the sentence does not name, which is why `§21.2` calls this a disagreement and not a specification gap.

### §1.2 · The five candidates for the subject, each grounded at its bytes

**`(S-1) THE VERSION AT THE WRITTEN TIER.`** The store holds versions keyed by the composite `(key, tier)` — `src/records.rs:14`–`:17`: *"each key's own inner entry is keyed by the TIER — because 'at most ONE child anchor per key/index and tier' is the composite key, so two versions of one key are two anchors and each stands under its own tier."* **The written tier's own version is reachable at the write path**: `anchors = self.refs_at(parent_link, &key)` (`src/store.rs:2912`), then `selected = anchors.iter().min_by_key(rank)` (`:2913`–`:2916`).
**WHAT IT COSTS:** nothing new — the version is already in hand, and `StoreValue` is `PartialEq` (`src/value.rs:15`).
**WHAT IT GETS WRONG:** **every tier-crossing write.** A `mem` write at an address where a `file` version stands purges nothing at `file` (`doomed` filters `rank ≤ rank(write tier)`, `:2937`–`:2941`; `file` is rank `2`, `mem` rank `1` — `src/records.rs:26`–`:33`), so the subject "the `mem` version" is **ABSENT before the act and present after** — a `None`-to-`Some` comparison that reports *"changed"* on every first lower-tier write and *"unchanged"* only when a `mem` version already stood at the same value. **The request's own canonical case (write the standing value at an address) is exactly the second one, and the case where a real change occurred is exactly the first — so this candidate is right about the act's own tier and blind to what the address reads as.**

**`(S-2) THE VALUE AN UNQUALIFIED READ ANSWERS.`** `src/store.rs:1379`–`:1385`, `lowest`: *"`§2.3`: the selection is by `rank` ASCENDING — the lowest-persistence anchor answers."* Declared as the rule and corrected in the guide by `D-122`: **an unqualified read selects the LOWEST-persistence version present — the shadowing one** (`strata/envelope.md:299`–`:304`).
**WHAT IT COSTS:** one `read` per write (or a re-derivation of the same selection), plus the assembled subtree walk (`assemble`).
**WHAT IT GETS WRONG:** three named cases.
- **(i) A SHADOW THAT MOVES AND A READ THAT DOES NOT.** Write `file V` at `['a']` in a `filePath` store, then write `mem V`. Before: read answers `V` (the `file` version). After: read answers `V` (the `mem` version). **Equal at every member — and the address now stands at two tiers where it stood at one.** The `readTiered` answer moved (`{_tier:'file'}` → `{_tier:'mem'}`), `save_owed`'s own docblock calls this shape out (`src/store.rs:1940`–`:1943`: *"a `mem`- or `temp`-tier SCALAR at the same address SHADOWS the durable version, leaves it standing"*), and **the request's subject reports "nothing changed".**
- **(ii) A PURGE AT A TIER THE READ NEVER SHOWED.** Write `file {x:1}` at `['a']`, then `mem {x:1}`, then `file {x:1}` again. The last write's `doomed` is **every version at the address** (rank ≤ `2`), so the `mem` version is purged and the `file` one re-minted — `read` answers `{x:1}` on both sides. **A version left the register and the subject saw nothing.**
- **(iii) THE TOUCHED ARM ENTIRELY.** A structured write touches one path per own member name (`append_value_paths`, `src/store.rs:4213`–`:4229`), so a **second identical structured write at a parent** moves no assembled value at the parent and touches every member below it, where a registration may stand. This is `Q-4`, and a read-answer subject cannot see it by construction.

**`(S-3) THE WHOLE PER-TIER STANDING AT THE PAIR'S NODE — THE LIST.`** **This is the subject the gate-1 block names and `strata/research.md:2037`–`:2041` grounds:** `src/store.rs:2346`–`:2348` — *"The declared `before`/`restoredTo` view of an address: `present` and the value a read answers there. **Where the operation touched MORE THAN ONE version at the addressed node, the value is the ordered list of the values it touched**, in `§5.1`'s canonical tier order."* Implemented at `src/store.rs:2375`–`:2382`: `if touched.len() > 1` → `StoreValue::Array(ordered …)` sorted by `Reverse(rank)` — **file, mem, temp.**
**WHAT IT COSTS:** the comparison is over a `Vec<StoreValue>` — a `Vec` compare, and the two lists must be built on both sides of the act (`capture` at `:2911`, `after_state = self.capture(&home)` at `:2992` — **both already exist on the write path**).
**WHAT IT GETS WRONG — AND THE COST IS STRUCTURAL, NOT INCIDENTAL:** **the subject is a LIST ONLY WHERE MORE THAN ONE VERSION STOOD AT THE PAIR'S OWN NODE.** At exactly one version it collapses to that version's value (`:2383`–`:2391`), and **at ZERO versions it is `absent_state()`** (`:2362`–`:2363`, `:2354`–`:2358`: `present: false`, value `StoreValue::Undefined`). **So the subject's TYPE is not stable across the write it is comparing: an address that stood at one tier and now stands at two goes from `V` to `[V, V]`, and an address that stood at two and now stands at one goes from `[V, V]` to `V` — both are "changed" under a type-strict compare and both are "unchanged" under a member-wise one.** **Whichever relation is picked, the tier-set's cardinality is part of the subject and is not part of the equality unless the architect says it is.** That is a question, and it is in §6.

**`(S-4) THE PAIR'S ADDRESS RATHER THAN THE LEAF — WHICH IS WHAT THE STORE ALREADY USES, AND THE ONE PLACE IT MATTERS MOST.`** The write's pre-state is captured at **`PairHome { link, key }`** (`src/store.rs:604`–`:607`, `:2907`–`:2911`) — *"the LINK its key stands on, and the key"*, recorded because *"the operation's own write may re-mint the anchor the walk would otherwise find"* (`:600`–`:602`). **So the store's subject is ALREADY the pair, not the leaf**: `delete` was corrected on exactly this point and the correction is on the record — `src/store.rs:3065`–`:3074`: *"the `pair_home` call this replaces resolved the LINK of the first version standing at the key, so for a STRUCTURED target it captured the versions of a node that holds none — measured: the entry held an EMPTY before-state, and a reversal of a structured delete restored nothing at all."*
**WHAT IT COSTS:** nothing — it is what the write already does.
**WHAT IT GETS WRONG:** nothing about the store, but **it settles nothing about the value**: a pair's `captured` is a `Vec<Captured>`, and the pair's `before` view is the read-view above. **Choosing the pair as the subject decides WHERE the comparison looks and not WHAT it compares — which is §2's question and not §1's.** The request's phrase *"the current existing value at an address"* is satisfied by the pair; it is the word *"value"* that remains undecided.

**`(S-5) A BRANCH WHOSE DESCENDANTS ALL STAND.`** **The store HAS this subject and it is the one the criterion sentence's first clause names** — `src/store.rs:4194`: *"the value read at a prefix contains its subtree, so a change anywhere below it moves it."* It is `assemble` (`:1466`) / `assemble_all` (`:1625`), reached by `read` through `walk`.
**WHAT IT COSTS:** a whole-subtree assembly per write — **and the store does NOT pay it today on the write path.** `touched_below` deliberately walks the *written value's own paths* rather than assembling (`:2593`–`:2600`, `:2618`–`:2624`), and the comment gives the measured reason: *"a dense array of `999,999` members written at one address materialises `999,999` paths, and a scan per append is `O(n^2)` — measured as a HANG, not a slowness"* (`:2618`–`:2621`).
**WHAT IT GETS WRONG:** **it is the only candidate that is CORRECT about the case `S-2` gets wrong (i) — and it is the candidate with the worst cost, on the one shape the corpus has already measured as a hang.** A branch subject is right and unaffordable as a per-write default; **a per-write branch comparison is the one shape the corpus's own performance record refuses in advance.**

**`(S-6) THE DURABLE BYTES / THE ACT'S DEPARTURE — the referent `D-106` already uses on the write path.`** `src/store.rs:1949`–`:1961`, `save_owed`: *"An op is eligible exactly when at least one version standing at `Tier::File` LEFT THE REGISTER DURING THE ACT — wrote over, replaced at its own tier, or PURGED"* (`:1930`–`:1932`), read off `Entry::captured` against the entry's own post-state.
**WHAT IT COSTS:** nothing — it is `O(captured)` over records the entry already holds.
**WHAT IT GETS WRONG:** **it answers a DIFFERENT question (did a durable version leave?) and says `true` on every `file`-tier write** by its first disjunct (`:1951`–`:1953`), *before* any departure test. **So the store's one shipped change test on the write path is not a value comparison and would answer "changed" for the request's canonical `file`-tier case.** `strata/research.md:2176`–`:2178` measured the consequence — bytes identical, mtime moved — and named it correctly: *"it is not a change test and it is not evidence FOR one."*

### §1.3 · THE CASE WHERE THE ADDRESS DOES NOT RESOLVE AT ALL

**THE SUBJECT IS ABSENT, AND THE WRITE DOES NOT REFUSE — IT MINTS.** For a write, *"the address does not resolve"* is **not a pre-condition and not a failure**: `write` resolves the parent tier-agnostically (`src/store.rs:2836`–`:2837`), captures the pair (empty `captured`), purges nothing, and mints (`:2967`–`:2968`). `state_from_captured` then answers `absent_state()` (`:2362`–`:2363`).
**SO FOR A WRITE THE "NOTHING STOOD THERE" CASE IS UNAMBIGUOUS AT THE STORE AND ALREADY DECIDED AT THE CRITERION**: the docblock's own words — *"a node the act CREATED OR PURGED has a value that changed"* (`:4195`–`:4196`). **A first write is a change by declaration, and no suppression can reach it without repealing that clause.**
**THE OTHER VERBS DIVERGE, AND THAT IS WHERE THE CASE REALLY LIVES:**
- **`read` at a non-resolving address REFUSES** — `src/store.rs:2734`–`:2744` walks and the walk's own arm answers `AddressNotFound` (`:1355`–`:1361`).
- **`delete` at a non-resolving address REFUSES** — `src/store.rs:3056`–`:3062`, with `L-3`'s code.
- **`delete` that RESOLVES but removes NOTHING is a SUCCESS carrying `tiers: []`, `triggered: []` and `op: None`** — `src/store.rs:3098`–`:3109`, and it is **the corpus's ONE already-shipped change-conditioned arm**, keyed on removal.
**SO THE STORE ALREADY HAS A "NOTHING CHANGED ⇒ NOTHING FIRES" ARM AND IT IS THE `delete`'s, KEYED ON REMOVAL AND NOT ON VALUE.** It returns `triggered: []` **and mints no op** (`:3106`–`:3108`: *"`D-3`: nothing was removed, so NO entry was appended and there is no op to name"*). **That arm is §3's precedent and §4's precedent at once, and `P-3`'s gate-1 does not name it:** it is the tree's own answer to *"what does a write owe when nothing moved"*, taken on the verb that already has the case.

### §1.4 · WHAT §1 SETTLES, STATED AS A LIMIT AND NOT A RULING

**THE SUBJECT AND THE EQUALITY ARE TWO QUESTIONS AND THE GATE-1 BLOCK CONFLATES THEM.** §1 shows the store can name **six** subjects and that **four of them are already materialised on the write path with no new work** (`S-1` anchors, `S-3` captured/after_state, `S-4` the pair, `S-6` the entry). **§2 shows that choosing the subject does not choose the relation, and that the relations disagree on shapes the store already contains.** **Both must be named in one sentence, or a landing pass will implement the first and inherit the second.**

---

## §2 · THE EQUALITY — what makes two states *"the same"* on this store

### §2.1 · The four places the corpus already decides equality, at their bytes

**`(E-A) THE STORE'S OWN `PartialEq` OVER `StoreValue` — STRUCTURAL, AND KEY-ORDER-INSENSITIVE BY CONSTRUCTION.`** `src/value.rs:13`–`:15`: *"`Object` is a `BTreeMap` so structural equality is key-order-insensitive by construction (`§5.2` `P-IM-1`'s failure list)"*, with `#[derive(Clone, Debug, PartialEq)]` on `StoreValue` (`:15`).
**WHAT IT IS EXACTLY:** a variant-tagged, member-wise compare. **Class-strict for free** (a variant tag is part of the compare); **insertion-order-blind for free** (a `BTreeMap` has no insertion order); **`-0 == 0` is TRUE** (IEEE, inherited through `f64`'s `PartialEq`); `NaN` is unreachable because it is the separate `NonFinite` variant (`src/value.rs:24`–`:32`) and `is_admitted` refuses it (`:42`).
**ITS HOME:** inside `src/`. **THE ONE THING IT CANNOT SEE:** whether the compared value came from a `file` or a `mem` version — **tiers are not part of a `StoreValue`.**

**`(E-B) THE CANONICAL ENCODING — `src/json.rs`.`** The `file` tier's image is canonical: `canonical_number` (`:109`–`:117`) writes *"the shortest decimal spelling that parses back to the same `f64`, WRITTEN IN POSITIONAL NOTATION"* (`:86`–`:90`), objects *"serialises it in sorted key order and the bytes are deterministic"* (`:46`).
**WHAT IT IS EXACTLY:** **the same relation as (E-A) on every shape except one, and the exception is declared:** `if n == 0.0 { return String::from("0") }` (`:110`–`:115`) — **the ONE declared normalization**, and its own clause says why: *"a `file`-tier `-0` reads back `0`, because only the committed bytes carry the spelling, while a `mem`/`temp` `-0` keeps its sign by never being routed through this image"* (`:111`–`:113`).
**SO (E-B) IS (E-A) *PLUS* A NORMALIZATION AND *PLUS* AN ENCODING COST — it agrees with (E-A) everywhere except that it is only defined for a `file`-tier state, and it costs a full serialization per comparison.** It is the most expensive relation in view and it buys no discrimination (E-A) lacks.

**`(E-C) THE CORPUS'S `sameStanding` — THE ONE SHIPPED CHANGE PREDICATE, AND IT IS THE PACKAGE'S.`** `bindings/js/src/entry/constraints.mjs:3636`–`:3642`: *"WHETHER TWO STANDINGS ARE THE SAME STATE … IT IS STRUCTURAL AND IT IS TAKEN ON THE STORE'S OWN DECODED VALUES: `Object.is` for the primitives, then `length` and index for the arrays and own keys, by `[[GetOwnProperty]]` and never by a chain read … A state that differs only in key ORDER is the SAME state."* Its one caller is the reversal's judgement — `constraints.mjs:2690`–`:2706`, `movedStanding`, with the skip at `:2695`: `if (sameStanding(one.before, after) === true) continue;`, declared at `docs/specs/storeroom-js/contract.md` (§1826 of its own numbering) and guided at `docs/guides/package-use.md` (`N-6`, `strata/research.md:2111`).
**WHAT IT IS EXACTLY: (E-A)'s relation read in JS, WITH ONE DIVERGENCE THAT IS DECLARED AND MEASURABLE — `Object.is(-0, 0)` is FALSE** (`:3643`), where `PartialEq` says equal. **So the corpus's two shipped equality relations disagree at exactly one admitted value class, and `P-3`'s own §8 names that fork** (*"the corpus's `sameStanding` versus the store's `PartialEq`, which differ at `-0`"*, `strata/proposals.md:870`).
**ITS HOME:** the package, over decoded values — **so it cannot see a tier, and it costs a `read` per address.**

**`(E-D) REFERENCE IDENTITY — available and WRONG IN BOTH DIRECTIONS.`** The store's handle to a node is an arena index (`src/records.rs:127`–`:133`, `node: usize`), and every mint allocates a **fresh** one: `new_ref` pushes a new `NodeRef` (`src/store.rs:1244`–`:1245`), and `mint` (`:2073`) is called on every write, always (`:2968`).
**WHAT IT IS EXACTLY — AND THE FINDING, WHICH IS THE SHARPEST THING IN THIS SECTION:**
- **On the equal-tier arm the old version is purged first** (`doomed` is every version at `rank ≤ rank(write tier)`, `:2937`–`:2941`; an equal-tier version is included), so `remove_refs` (`:2967`) drops it and `mint` allocates a new reference. **An identical re-write at the same tier ALWAYS changes reference identity — the exact case the request wants to call "nothing changed".**
- **On the shadowing arm nothing is purged and nothing at the higher tier is touched** (the `file` version's reference survives), so **the write that DID change the address's per-tier standing leaves every surviving version's identity unmoved.**
**So reference identity is *inverted* on the two cases that matter.** It is the cheapest relation in view and it is the only one that is provably wrong on both. **It is named here because it is the relation a first implementation reaches for, and because the tree's arena makes it look available.**

**`(E-E) THE DEPARTURE RELATION — `save_owed`'s — WHICH IS A VERSION-SET DIFFERENCE AND NOT A VALUE COMPARISON.`** `src/store.rs:1954`–`:1960`: *"a `file`-tier `Captured` in the pre-state with NO COUNTERPART in the post-state left the register during the act."* **It compares `(tier, path)` membership, never a value.**
**WHAT IT IS EXACTLY: the only relation in the tree that is TIER-AWARE, and it is blind to values by design.** It would answer *"unchanged"* for a `mem` write of a different value over a `mem` version — **because the `mem` version left and a `mem` version returned at the same path.** So it is not a candidate for this request, **but it is the ground the architect must distinguish from the one he picks**, because both would be called "change" in the same sentence.

**`(E-F) THE MEMBER-SET RULE — `D-22`/`DD-22`, WHICH DECIDES SET EQUALITY AND NOT VALUE EQUALITY.`** Its subject is *"a drive compares sets, never sequences"* (`DD-22`, cited at `bindings/js/src/entry/delivery.mjs:186`–`:187` and `strata/research.md:2111`), and it settles that **the trigger set's and the watched set's ORDER is unobservable**. **It does not decide what makes two VALUES the same, and it may not be borrowed to.** `P-3`'s gate-1 does not cite it as an equality ground and neither does this note.

### §2.2 · THE FOUR CASES THE REQUEST NAMES, PRICED AGAINST EVERY RELATION

**THE FOUR CASES ARE THE TASK'S AND EACH IS A CASE THE STORE CONTAINS, NOT A HYPOTHETICAL.** The table gives what each relation answers; **where a relation is wrong, the reason is the store's own mechanics and not a preference.**

| the case | (E-A) `PartialEq` | (E-B) canonical | (E-C) `sameStanding` | (E-D) identity | (E-E) departure |
|---|---|---|---|---|---|
| **structurally equal but a different CLASS** — `Num(1.0)` vs `Str("1")` | **distinguishes** (variant tag) | **distinguishes** | **distinguishes** (`Object.is`) | n/a | n/a |
| **a `Map` whose insertion order differs** | **IMPOSSIBLE AT THE STORE** — a `Map` is `NonPlainCollection` (`src/value.rs:32`, `is_admitted` `:45`) and the crossing refuses it before it is stored (`bindings/js/src/crossing.rs:753`–`:755`: `if o.has_accessor \|\| !is_plain(o) { return StoreValue::NonPlainCollection; }`), so the write is `ValueNotAdmitted` (`src/store.rs:2808`–`:2810`) | impossible | **IMPOSSIBLE over decoded values** (`sameStanding` reads own keys, order-blind, `:3640`–`:3641`) — **BUT REACHABLE if the comparison is taken over the CALLER'S ARGUMENT before the crossing**, where a `Map`'s key order is real | n/a | n/a |
| **a shadowed address where one tier changed and another did not** | **ONLY IF the relation is handed the per-tier LIST** — `Vec` compare sees cardinality. Handed ONE value, it is blind (§1.2 `S-2` (i)) | same as (E-A), plus an encode | **blind** — it compares *the read answer*, one value | **inverted** (§2.1) | **sees it** — a `mem` version departing is a departure |
| **a value equal at the pair but whose DESCENDANT moved** | **blind at the pair's own node** — an assembled-subtree compare would see it (`S-5`) and costs the assembly; a pair-node compare cannot | blind | **blind** — `sameStanding` over the addressed read sees the subtree only because `read` assembles it, so it costs a full assembly per write | blind | **sees the purge case, blind to the touched case** |

**AND ONE MORE, WHICH IS THE ONE THAT DECIDES THE ARCHITECT'S SENTENCE AND IS NOT IN THE REQUEST'S FOUR: `-0` vs `0`.** Both are admitted (`Num(-0.0)` is finite, `src/value.rs:42`). **(E-A) and (E-B) say EQUAL; (E-C) says DIFFERENT** (`Object.is`, `constraints.mjs:3643`). **A landing pass that writes "the same" without naming the relation silently picks one of two shipped answers — and the corpus's own §8 already flagged it as a question** (`strata/proposals.md:870`).

### §2.3 · WHAT §2 SETTLES

**THE CORPUS DOES NOT LACK AN EQUALITY — IT HAS TWO, AND THEY DISAGREE AT ONE VALUE CLASS AND AT ONE COST.** `(E-A)` is free and tier-blind; `(E-C)` is the corpus's shipped idiom and costs a `read` per address; `(E-D)` is cheap and inverted; `(E-B)` buys nothing `(E-A)` does not and costs an encode.
**AND NO RELATION IN VIEW IS BOTH TIER-AWARE AND VALUE-AWARE.** The only tier-aware relation the write path holds is `(E-E)`, which is value-blind. **So "the same value at the same tier set" is a relation the tree does not contain and would have to be composed — and composing it is a decision, not an implementation.** It is `Q-2`.

---

## §3 · WHAT THE "NO CHANGE" SUPPRESSES — and what it must NOT

**THE REQUEST NAMES LISTENERS AND ONLY LISTENERS:** *"'writing' the current existing value at an address doesn't fire listeners"*. **A write performs a fixed sequence of acts and `triggered` is one of the LAST.** Every act below is a site at its bytes, with what a no-change write owes, **in both branches of the one question that splits everything: DOES IT MINT AN OP?**

### §3.0 · The write's acts, in the order the code takes them

Read from `src/store.rs:2798`–`:3019`:

| # | act | site | mint-no-op | mint-an-op |
|---|---|---|---|---|
| 1 | `capture` the pair's pre-state | `:2911` | owed (needed to decide at all) | owed |
| 2 | purge `doomed`, take `doomed_tiers` | `:2937`–`:2966` | **must still run or the write is not performed** | runs |
| 3 | `remove_refs` + `mint` | `:2967`–`:2968` | **see below — this is the fork** | runs |
| 4 | build `op` | `:2969`–`:2987` | **not built** | built |
| 5 | `after_state = capture` | `:2992` | owed only if 4 is | owed |
| 6 | `append` → `seq` bump → compaction DROP | `:2995` → `:2441`–`:2450`, `:2451`–`:2466` | **not reached** | **runs, and can drop the oldest entry** |
| 7 | `touched_below` / `watched_for` / `triggered_for` | `:3001`–`:3007` | the sets are still computed unless suppressed | computed |
| 8 | return `WriteResult { op, watched, triggered }` | `:3014`–`:3018` | **`op` has no value to carry** | carries the op |

### §3.1 · THE CONSTRAINT PASS — *"does a write of the standing value still ask the pairs?"*

**THE PASS'S EVALUATED SET **IS** THE STORE'S RETURNED SET — THERE IS NO SECOND PREDICATE TO SUPPRESS.** `bindings/js/src/entry/kernel-attempt.mjs:669`–`:670`:

```
669:  const stored = attempt.record === undefined ? undefined : attempt.record.triggered;
670:  const list = pairsTriggered(kernel, stored, attempt.repairPaired);
```

with the clause above it, verbatim: *"THE LIST READ IS THE COMMIT'S OWN STORE ANSWER — `record.triggered`, the set the store returned at the instant this commit's act landed"* (`:652`–`:654`). `record.triggered` is set from the store's own answer at `bindings/js/src/entry/kernel-commit.mjs:187`–`:188` (`record.triggered = written.triggered; record.pending = written.triggered.slice();`).
**SO THE ANSWER IS NOT A DESIGN CHOICE AT THE STORE-SIDE LAYER — IT IS A CONSEQUENCE:** **a store-side narrowing narrows the constraint pass by construction**, and **a package-side narrowing leaves the pass intact** because the store's set never moved. **That is the whole of `P-3`'s `Q-2`, and it is decided by where the comparison sits, not by what the request says.**
**AND THE SAME SET FEEDS A THIRD CONSUMER THE GATE-1 DOES NOT NAME — `D-105`'s REPAIR CREDIT.** `kernel-attempt.mjs:1100`–`:1122` widens the examined set with `attempt.repairPaired`, and `:1121`–`:1122` says it plainly: *"`record.triggered` IS UNMOVED — it is the store's own returned set."* **So the repair-credit membership narrows with the set, exactly as `strata/research.md:2096`–`:2098` records.**

### §3.2 · THE REPAIR FLOWS — and `D-152`, which is the corpus's most recent word on this exact word

**THE ORDER IS `D-117`'s AND IT IS INSTANT-FOR-INSTANT:** `strata/decisions.md:6034`–`:6039`: *"ask → repairs land → re-run → SAVE → DELIVER → the member's record. THE SAVE PRECEDES EVERY DELIVERED BODY … No delivery occurs on the throwing arm, on the failing arm, or where nothing was fired."*
**`D-168` IS THE JUDGEMENT'S SUBJECT AND IT IS THE CURRENT STATE, ALWAYS.** `strata/decisions.md:8674`–`:8675`: *"the subject is what the store answers at the instant the judgement runs"*, and `:8676`–`:8677`: `kernel-terminal.mjs`'s `baseState(store, address)` is *"`{ present: true, value: store.read(address) }` — the terminal judgement's base is a READ OFF THE STORE at the moment it is taken."* **Read at the bytes: `bindings/js/src/entry/kernel-terminal.mjs:482`–`:484`.** Two consequences a no-change write meets: **(i) the pass's `context.value` is the READ answer and never the per-tier list — so the pass's subject and §1's subject are already two different things on this tree; (ii) `present: true` is unconditional there, so the pass is told the address stands even where `read` would refuse.**
**AND THE RULING THAT BEARS MOST DIRECTLY ON THIS REQUEST IS NOT IN `P-3` AT ALL: `D-152`, `2026-11-17`, verbatim *"Fires only the listeners changed by the writes"* / *"Compute within the store"* (`strata/decisions.md:7996`–`:7997`).** **Its mechanism, read at `:8003`–`:8010`, is a WRITE-EXISTENCE test and not a value-equality test:** *"THE SET A REGISTRATION INSTANT OWES IS THE LISTENERS ITS REPAIR WRITES CHANGED … A REGISTRATION THAT WRITES NOTHING FIRES NOTHING"*, and *"the set is not minted by the package: it is UNIONED from the writes the pass landed, each of which the store has already answered."*
**SO THE CORPUS'S NEWEST USE OF THE WORD "CHANGED" MEANS *"the write landed"*, NOT *"the value differs"* — and that is a warning about the referent, from the same date, in the architect's own words.** **A landing pass that reads `D-152` as a value test would be reading a mechanism that does not contain one.** **AND THE TWO RULINGS INTERACT BY CONSTRUCTION:** if the store's predicate narrows, `D-152`'s union narrows with it (`:8007`–`:8010`'s *"each of which the store has already answered"*), so **`P-3` silently changes a registration instant's firing set — an instant `D-125` item 1 widened to four** (`strata/decisions.md:6520`–`:6522`).

### §3.3 · `D-106` ARM 2'S SAVE ELIGIBILITY — *"the act moved nothing, so is the op eligible?"*

**THE ELIGIBILITY RULE IS THE STORE'S AND IT IS TWO DISJUNCTS WITH ONE MEANING.** `src/store.rs:1770`–`:1772`: *"AN OP IS ELIGIBLE EXACTLY WHEN THE ACT IT NAMES MOVED AT LEAST ONE VERSION STANDING AT `Tier::File`. The first disjunct is the op's own tier word (`op.tier == Some(Tier::File)` …); the second is the WHOLE-TARGET `delete`, whose `op.tier` is `None` and whose own entry records the versions it removed WITH THEIR TIERS."* Implementation: `save_owed` at `:1949`–`:1961`; called from `commit_file` at `:1811`.
**THE ANSWER FOR A NO-CHANGE WRITE, IN BOTH BRANCHES:**
- **`mem`/`temp`-tier, no op minted:** no `commit_file` is reached at all (the terminal arm needs `answer.op`, `delivery.mjs:1216`–`:1219`), and `save_owed`'s second disjunct would answer `false` anyway (no `file` version departed). **No save owed, none performed — and nothing lost.**
- **`file`-tier, no op minted:** **no save is performed — and that is a durable loss of a different kind: the op the act would have carried is the record the save keys on** (`commit_file` looks the entry up BY OP ID, `:1804`–`:1810`). No op, no carrier.
- **`file`-tier, op minted (today's behaviour):** `save_owed` returns `true` **by the first disjunct, BEFORE any departure test** (`:1951`–`:1953`), so **the save runs and the file is rewritten for an act that moved no durable datum** — bytes identical, mtime moved, measured at `strata/research.md:2176`–`:2178`.
**SO: SUPPRESSING LISTENERS DOES NOT SUPPRESS THE SAVE, AND THE REQUEST DOES NOT ASK IT TO. The `file` tier's rewrite is a durable act the request leaves standing, and `D-106` item 2's rule** — *"The file must save after ANY action that changes the file-tier data, without exception"* (`strata/decisions.md:5419`–`:5421`) — **is the clause that would have to be read to reach it. It does not answer this case: the act changed nothing, and the rule's antecedent is false.** **Whether a no-change `file` write should still save is `Q-9`, and the tree's answer today is YES, for a reason that is not a change test.**

### §3.4 · THE JOURNAL ENTRY — *"does a no-change write mint an op at all?"*

**TODAY IT DOES, UNCONDITIONALLY, AND THE APPEND CARRIES THREE CONSEQUENCES BEYOND THE ENTRY.**
1. **The entry is appended with no branch above it:** `src/store.rs:2995` (`let op = self.append(op, captured.clone(), after_state, Some(home.clone()));`), and `append` bumps the sequence at `:2441`–`:2442`: `self.last_seq += 1; op.seq = self.last_seq;`.
2. **The compaction can DROP the oldest entry as a direct consequence:** `:2451`–`:2466` — the loop removes the oldest entry while `self.journal.len() > self.journal_length` (the clause at `:2457`–`:2460`), and `D-160` item 1 made the cap a **bound** and not a mark (`strata/decisions.md:8406`; `RELEASE-NOTES.md:112`–`:124`).
3. **So a no-change write that mints an op CONSUMES A JOURNAL SLOT AND CAN DESTROY THE OLDEST OP'S REVERSIBILITY.** `D-160` item 3's watermark then tells the two refusals apart: an op the compaction dropped answers `RollbackCompacted`, an id that never named an op answers `JournalOpUnknown` (`RELEASE-NOTES.md:118`–`:120`).
**AND THE CORPUS'S OWN PERFORMANCE WORK WAS DRIVEN ON EXACTLY THIS ACT:** `src/store.rs:2429` names the benchmark — *"47 · 125 · 472 · 1,850 · 7,277 MB at 1k · 2k · 4k · 8k · 16k writes **on one unchanged address**"*. **So "a write of the standing value, over and over" is the corpus's measured worst case for journal growth, and the request names the act that produced it.**
**IF IT MINTS NO OP, THEN `rollback` AND `restoreMark` LOSE A POSITION, AND THE CORPUS'S PROPERTY SAYS SO:**
- **`rollback` is keyed on the op id** — an id no entry names fails `JournalOpUnknown` (`M-11`, `contract.md:3678`; `src/store.rs`'s own `commit_file` no-op arm at `:1804`–`:1810`).
- **`restoreMark` replays the journal's own entries** (`src/store.rs:3589`–`:3598` in that method's docblock), so **a state the journal does not record is a state no mark can reach.** A no-change write that mints nothing removes one *reachable* position from the store's history — **which is exactly what the act did not change, so the loss is invisible until a caller holds a mark they expected to exist.**
- **AND `P-TP-8` (g) IS A DECLARED PROPERTY THAT A NO-OP MINT BREAKS BY NAME:** `docs/specs/storeroom-native/contract.md:3056`–`:3059`: *"**`WriteResult.op.opId` subsequently resolves in the journal: `rollback(opId)` does not fail `JournalOpUnknown`** … and the journal's tracked verbs remain exactly `write` and `delete`."* **A write that answers a `WriteResult` whose `op.opId` names no entry falsifies (g). A write that answers no `op` at all contradicts `WriteRecord.op`'s non-optional type (`bindings/js/index.d.ts:716`). There is no third arm.** This is the single hardest constraint in §3 and it is §4's subject.

### §3.5 · `D-169`'s legs and `D-170`'s drain — what a suppressed pass stops consuming

**THE LEGS ARE RECORDED PER INVOCATION AND THE SLOT IS CLEARED WHEN A BRACKET OPENS.** `strata/decisions.md:8701`–`:8703`: *"`REPAIR_LEGS_LAST = [];` in the bracket's opening, before the run … what moves is that a bracket opening in between now leaves nothing for a stale read to take."* Driven both ways by `tests/e2e/leg-carriage.test.mjs` (`:8704`–`:8711`).
**THE DRAIN CONSUMES ONLY ITS OWN WINDOW, BY A PREDICATE:** `strata/decisions.md:8723`–`:8728`: `consumeRaisedRaises(record, window)` with `if (raise.window !== window) { keep; continue; }` (`bindings/js/src/entry/constraints.mjs:2599`–`:2614` in that row's numbering).
**WHAT A NO-CHANGE WRITE OWES HERE, AND IT IS NOT FREE EITHER WAY:**
- **The raise's birth is inside a pass** — `strata/decisions.md:8737`–`:8739`: *"a raise is created inside a pass (`raiseReversal` runs from a body the pass is asking), and every pass drains, so a raise cannot be born into a window that has no consumer."* **A store-side suppression empties the pass, so no body runs, so no raise is born — which is harmless.** 
- **But a raise raised by an ENCLOSING window and destined for THIS write's drain would have no consumer at this act** — and the corpus's guarantee is exactly *"every pass drains"*. **A write whose pass does not run is a write that does not drain, and the window's own lifetime becomes the answer.** The row's residual was measured unreachable on the shapes it drove (`:8733`–`:8739`); **it does not drive a pass that is empty by suppression.** This is not a defect — it is an untested interaction, and it belongs in §7.

### §3.6 · THE RECEIPT — `op` / `triggered` / `log` / `discarded`, and the delivered set's `bodyFailures` / `returnedValues`

**THE RECORD'S DECLARED MEMBER SET IS THREE AND ITS OWN-PROPERTY CENSUS IS SEVEN.** `bindings/js/index.d.ts:715`–`:719` declares `op`, `watched`, `triggered`; four non-enumerable accessors ride beside them — `discarded` (`:720`–`:743`), `log` (`:744`–`:779`), `bodyFailures` (`:780`–`:819`), `returnedValues` (`:820`–`:858`) — and `D-150` item 1 pins the census: **`Object.keys` reads `["op","watched","triggered"]`; `Object.getOwnPropertyNames` reads SEVEN** (`strata/decisions.md:7930`–`:7933`).

- **`op`** — non-optional (`:716`), and **the journal-resolution property (§3.4) is declared on it.** A no-change write's `op` is the one member §4 turns on.
- **`triggered`** — **`[]` WOULD COME TO MEAN TWO THINGS AND THE CORPUS HAS ALREADY RULED THAT CLASS:** `docs/specs/storeroom-js/surface.md:235` (`D-75`/`D-78`: *"`undefined` IS NOT `[]`, AND THE TWO ARE NOT SPELLINGS OF ONE READING"*, *"an ABSENT member and an EMPTY list are different claims"*), and the store's existing `[]` on a write means **no registration stood at a prefix** (`docs/specs/storeroom-native/contract.md:3033`–`:3034`). **Under any suppression `[]` reads both meanings and the two are indistinguishable from `[]` alone** — that is `Q-5` and it is a debt a landing pass may not leave.
- **`log`** — **a passing write answers at least ONE entry, `kind === 'commit'`, and `[]` is never that arm's answer:** `index.d.ts:750`–`:756`, and the entry is appended unconditionally at `bindings/js/src/entry/kernel-attempt.mjs:506`–`:507`. **So a no-change write that still opens an attempt still answers `log: [commit]`; one that opens no attempt answers `[]` — and `[]` there is the *"no attempt"* claim** (`docs/specs/storeroom-js/surface.md:1380`, which spends a whole clause distinguishing an arm that carries no attempt from `[]`). **The suppression forces a choice between two meanings `log` already carries.**
- **`discarded`** — *"`[]` means the pass's drain consumed and JUDGED every raise of this window"* (`index.d.ts:730`–`:731`). **A write with no pass answers `[]` for a third reason and the member's own sentence becomes ambiguous at the same seam as `triggered`'s.**
- **`bodyFailures` and `returnedValues`** — both are *"PRESENT ON EVERY ARM AND ANSWERS ONE SHARED FROZEN `{}` WHERE NOTHING STANDS"* (`index.d.ts:804`, `:843`–`:846`), and both are **defined so that no reader can tell *"no settle ran"* from *"the settle found no rejection"*** (`:805`–`:807`, `D-150` item 2). **A no-change write whose delivered set is empty answers the same frozen `{}` — so these two members are the ONLY members in the record that a suppression does not make ambiguous, and that is because the corpus already paid for the ambiguity once and refused it.**

### §3.7 · THE ONE THING §3 ESTABLISHES THAT NO OPTION ESCAPES

**EVERY ACT BELOW `triggered` IS REACHED THROUGH THE OP OR THROUGH THE PASS, AND THE TWO ARE ONE CHAIN: no pass, no ask, no repair, no raise consumed, no credit; no op, no save, no journal position, no `P-TP-8` (g).** **So the request's one-word subject — *"listeners"* — cannot be changed without changing the store's answer to *"was this an operation"*, and the store's answer to that is the journal.** **That is the costliest finding in this note and it is §3's summary sentence: a no-change write is not a narrower write, it is a different KIND of act, and the tree has one such act already — the `delete` that removed nothing (`src/store.rs:3098`–`:3109`) — which answers `triggered: []`, `op: None`, and no journal entry.**

---

## §4 · WHAT THE WRITE ANSWERS

**THE SURFACE HAS ROOM FOR FOUR ANSWERS AND THE TREE ALREADY HOLDS ONE OF THEM.** Each is grounded in the surface's own vocabulary.

### §4.1 · `(A-1)` THE SAME RECEIPT WITH AN EMPTY `triggered`

**THE FORM:** `{ op, watched, triggered: [], log, discarded, … }` — every member present, `triggered` empty.
**GROUND IN THE SURFACE:** the shape is lawful as a shape — `triggered` is `readonly TriggerPair[]` (`index.d.ts:719`) and `[]` is a member of it; `watched` is a separate member and **must not narrow with it** (`P-TP-8` (e), `contract.md:3048`–`:3052`; the projection law at `src/store.rs:2567`–`:2570`: *"the two lists must be produced by ONE predicate or the projection is false"* — **so an empty `triggered` with a non-empty `watched` is the incoherence `P-3` §7 item 2 already refuses**).
**WHAT IT COSTS:** the two-meanings debt (§3.6, `Q-5`), **and it answers a question about the DATA the corpus nowhere declares** (`strata/research.md:2109`, `N-4`).
**WHAT IT GETS WRONG:** **at the store-side layer it is unreachable without narrowing `watched` too** — so `(A-1)` is only available at the package layer, where the store's set stood intact and `watched` is passed through unchanged.

### §4.2 · `(A-2)` A RECEIPT WHOSE `op` RECORDS A LANDING THAT CHANGED NOTHING — **TODAY'S ANSWER, AND THE ONE THE REQUEST'S MEASUREMENT ALREADY SHOWS**

**THE FORM:** `op.before` and `op.after` both present and equal, `seq` advanced, `opId` resolving in the journal.
**GROUND IN THE SURFACE, AT ITS BYTES:** this is **exactly what the shipped tree answers**, driven and printed at `strata/research.md:2164`: write #2 of four — `op.seq` `2`, `op.before` `{present:true, value:1}`, `op.after` `{present:true, value:1}`, body ran **yes**. **The record already has the vocabulary to say *"a landing that changed nothing"* and says it by `before` equalling `after`.** `BaseState` is two members (`index.d.ts:669`–`:672`), and nothing forbids them agreeing.
**WHAT IT COSTS:** **nothing at the surface** — the record is unmoved, `triggered` stays meaningful, `P-TP-8` (g) holds, `log`/`discarded`/`bodyFailures`/`returnedValues` keep their meanings.
**WHAT IT GETS WRONG:** **it is not an answer to the request at all if the request wants silence** — the listener fires and the record says "equal". **It IS the answer if the architect reads the request as *"a caller must be able to tell"*: today a caller CAN tell, by comparing `op.before` and `op.after`, and the corpus ships that idiom** (`sameStanding`, §2.1 (E-C)) — **which is why `P-3`'s `(e)` shape exists and costs zero** (`strata/proposals.md:773`).

### §4.3 · `(A-3)` AN EXISTING STATUS — **UNAVAILABLE, AND THE REASON IS DECISIVE**

**THE STATUS SET IS A *REFUSAL* SET AND IS CARRIED BY ONE INTERFACE.** `bindings/js/index.d.ts:632`–`:645`: `StoreRefusal { status: StoreStatus; message; log; address }` — **`status` occurs on the refusal and on nothing else.** `StoreStatus` (`:506`–`:530`) is the closed union of **twenty-three** literals (`src/error.rs:188`: `pub const CODES: [&str; 23]`), and `src/error.rs:18`–`:24` declares it *"the CLOSED set, ranked `1`…`16`"* with every later widening appended at the next rank and **no rank of `1`…`n` moving** (`:176`).
**SO:** every one of the twenty-three is a refusal; **a no-change write that SUCCEEDS can answer no existing status, because the set contains no success member and no member whose subject is *"nothing changed"*.** **`(A-3)` is not a cheap option — it is a category error the surface's own typing refuses.**

### §4.4 · `(A-4)` A NEW STATUS — rank `24`, and what the closed set's own history says about it

**IF a status is minted, its rank is `24`:** the set's convention is append-only with no rank moving (`src/error.rs:176`), and rank `23` `ListenerBodyRejected` is the current highest (`src/error.rs:174`–`:176`; `bindings/js/index.d.ts:529`).
**DOES THE CLOSED SET ALLOW IT?** **The set has been widened SEVEN times by appended rank — `13` `FilePathUnreachable` (`src/error.rs:19`–`:20`), `16` `ConstraintListInvalid` (`:24`), `17` `ValueRefusedAtBoundary` (`:45`–`:47`), `18`/`19` the body-throw pair (`:60`–`:62`), `20` `ConstraintPassRefused` (`:85`), `21` `ListenerBodyThrew` (`:115`–`:117`), `22` `FileImageRefused` (`:141`–`:144`), `23` `ListenerBodyRejected` (`:173`–`:176`) — so the set is CLOSED TO THE ENUMERATION AND OPEN TO APPEND BY RULING.** **An eighth append is lawful on the architect's word and on nothing else.**
**WHAT IT COSTS, PRICED AT THE TREE'S OWN EXPERIENCE:**
- **The declaration exists twice and the second is a staged copy that is NEVER hand-edited** — `bindings/js/index.d.ts` and `typecheck/node_modules/provident-storeroom/index.d.ts` (`strata/proposals.md:771`).
- **The census is re-derived at every site and the census can be SILENTLY WRONG:** `strata/envelope.md:18`–`:21` records the `20 → 21` re-derivation *"at all seven sites"*, and **§5.2 below shows a census that has ALREADY drifted and is GREEN.**
- **AND THE CATEGORY PROBLEM REMAINS:** a success arm's datum would sit in the set that `StoreRefusal` alone carries.
**WHAT IT GETS WRONG:** **it answers a refusal where the request asks for a silence** — and it makes the no-change write *a failure*, which is the one thing `DD-11` refuses: *"it would make an idempotent re-write (`write(a, tier, v)` twice) a failure"* (`docs/specs/storeroom-native/contract.md:469`, cited at `strata/research.md:2108`).

### §4.5 · WHAT §4 ESTABLISHES

**THE SURFACE HAS EXACTLY ONE ANSWER THAT COSTS NOTHING AND ONE THAT COSTS EVERYTHING, AND THE REQUEST NAMES NEITHER.** `(A-2)` is today's answer and requires no surface byte; `(A-1)` requires the package layer and owes the `[]` sentence; `(A-3)` is unavailable by typing; `(A-4)` is an append away and makes an idempotent re-write a failure. **A fifth form is reachable and is a ruling away rather than an implementation — a member on the closed record, the device `op`, `discarded`, `commit`, `log`, `bodyFailures` and `returnedValues` landed with SEVEN times** (`strata/proposals.md:844`–`:847`). **That is `Q-4`.**

---

## §5 · THE BREAK, AND WHOSE

### §5.1 · THE TREE'S OWN CELLS — one turns, one stands, and the census has already drifted

**THE CELL THAT TURNS — AND IT IS THE ONLY ONE IN `tests/**` THAT DRIVES THIS ACT AND ASSERTS A FIRING COUNT.** `tests/e2e/json-crossing.test.mjs`, the FRESHNESS LIMB:
- **its state table declares the expectation**: `:4357` — *"the FRESHNESS LIMB, on the control alone: a second identical write at the same address | a SECOND invocation"*;
- **it drives the act**: `:4521` — `control.store.write(drivenAddress, 'mem', 'x')`, the **same value at the same address at the same tier** after `:4516`–`:4518` settled the first;
- **it asserts the count**: `:4524` — `assert.equal(control.fired.length, 2, 'the freshness limb: a second trigger set fires the registered listener again')`;
- **and it then indexes the second invocation**: `:4526`–`:4527` — `const secondArgument = control.fired[1].address;`, which under suppression is a **`TypeError` on `undefined`**, not a clean assertion failure.
**SO THIS CELL FAILS LOUDLY, AT THREE ASSERTIONS, AND ITS FAILURE IS THE SUITE'S ONLY WITNESS TO THE OLD SEMANTIC.**
**AND ITS SUBJECT IS NARROWER THAN *"a firing count"*:** `:4528`–`:4536` assert **the argument's freshness** — two distinct array objects, each dense, each carrying both segments. **`strata/research.md:2135`–`:2138` is right: `:4524` is a PRECONDITION the subject is driven over, and a re-derivation that keeps the subject can keep the count by changing the second write's value.** **That is `C-16` and it makes the cell a TOKEN TO RE-DERIVE and not a defended semantic.**

**THE CELL THAT STANDS.** `tests/integration/store-core/e2e_json_round_trip.rs:880`–`:882`: *"And writing the SAME value again is a success, never a `PairOccupied` refusal (`DD-11`)"* — `ok(store.write(…, v_num(2.0)), "DD-11")`. **It registers no listener and asserts no firing count, so a listener-only suppression leaves it green — and an answer-level change would turn it red.**

**★ THE CENSUS CLASS HAS ALREADY FAILED ONCE AND IS STILL GREEN, WHICH IS THE HAZARD ANY LANDING PASS INHERITS.** `tests/e2e/blind-entry-surface.test.mjs:319`–`:320` asserts `STATUS_RANK_ORDER.length === 22` and `new Set(…).size === 22`; **its own head says it copies two homes** — `src/error.rs`'s `pub const CODES` and `index.d.ts`'s `StoreStatus` (`:64`–`:74`) — **and both homes now read TWENTY-THREE** (`src/error.rs:188`; `bindings/js/index.d.ts:529`). **The copy printed `[&str; 22]` for `CODES`' arity at `:69`; the home prints `[&str; 23]`.** **So a hand census drifted, stayed self-consistent, and its cells stayed green.** **The file's own head names the rule this is a failure of** (`:72`–`:74`: *"A copy that disagrees with either home is a finding at the home and not a licence to move this array quietly"*) — **and here the finding is that the disagreement is invisible because the cell asserts the copy against itself.** **Any new status, member or count this request mints inherits that blindness.**

### §5.2 · THE DOCUMENTS THAT TURN, each at its own byte

| document | what it states | what a suppression does to it |
|---|---|---|
| `docs/specs/storeroom-native/contract.md:3028`–`:3033` | `P-TP-8` (a): after **any** successful `write`, `triggered` is **exactly** the prefix∪touched set, **"and NO MEMBER is added and none omitted"** | **CONTRADICTED** — a suppression *omits* members. **This is the row, and it needs a bounded amendment, which it has had twice** (`:3015`–`:3020`, `:3672`–`:3684` per `P-3` §8; the second of those has itself since been superseded by `D-160` item 5 at `:3672`) |
| `contract.md:3149`–`:3150` | the failure list: *"**a MISSING handle where a listener's address is a prefix of the write's**"* is the row's own RED | **makes a declared failure the shipped behaviour** |
| `contract.md:3056`–`:3059` | `P-TP-8` (g): `WriteResult.op.opId` **subsequently resolves in the journal** | **broken by a write that answers no `op`** (§3.4) |
| `contract.md:3707`–`:3717` | the selection rule stated as a rule, and **`D-66`'s criterion quoted inside it** at `:3709` | the operative clause would have to be re-stated; **the criterion sentence and the instantiation already disagree there in one paragraph** |
| `docs/guides/package-use.md:547`–`:549` | *"Listeners fire on `write` and `delete`, on a `rollback`'s judgement, and at the four REGISTRATION instants — and never on a read"* | **the closed firing list moves** — and its own correction at `:551`–`:561` is the precedent that **this class of sentence is rewritten in place, not annotated** (`D-125` item 2 (iii)) |
| `docs/specs/storeroom-js/contract.md:2183`–`:2185` | **RE-ENTRANCY IS UNAVOIDABLY OPEN** — *"a listener that writes at the address it was delivered for fires itself again … nothing detects it and nothing is meant to"* | **a persisted change test would DETECT one form of the very re-entry this clause declares undetected** — *"a sentence a landing pass would have to re-spell in the same pass, not a sentence it can leave"* (`P-3` §2's fourth *against*) |
| `bindings/js/index.d.ts:715`–`:719` and its four accessors | the record's declared three and its seven-name census | a member, a narrowed member, or a new status moves the file **twice** (`typecheck/node_modules/…` is a staged copy) |
| `src/store.rs:4193`–`:4197` | the criterion docblock | **already says the criterion in change-terms; it is the corpus's ground FOR the request and would not move** |

### §5.3 · CONSUMER EXPECTATIONS — three, and each is a sentence a consumer can act on today

1. **"A body fires once per write that reaches it."** `docs/guides/package-use.md:547`'s list and `index.d.ts:718`'s `triggered` are the vocabulary; `docs/specs/storeroom-js/contract.md:2183`'s re-entrancy clause is the strong form (*"a listener that writes at the address it was delivered for fires itself again"*). **Under suppression a self-write of the same value stops firing itself — so the clause's example becomes conditional on a value.**
2. **"`triggered` names who will be invoked."** `deliver`'s loop runs over the set (`bindings/js/src/entry/delivery.mjs:250`–`:287`), and the terminal arm's delivered set is `record.pending` + the checked-off identities (`:1288`). **Under a package-side suppression `triggered` names MORE than is invoked — the asymmetry `D-67` was filed on, one layer up** (`strata/decisions.md:3803`).
3. **"A write's `op` is a journal position."** `P-TP-8` (g) (`contract.md:3056`–`:3059`) and `rollback`'s own lookup. **A consumer that caches a mark per write (`journalMark`) loses one position per no-change write.**

### §5.4 · CLASS — WHAT A `MAJOR` MUST CARRY HERE, AND WHAT `D-190` ALREADY DECIDED ABOUT THAT

**THE CLASS PRECEDENT IS DIRECTLY ON POINT AND IT WAS DECIDED FOR A SMALLER MOVE.** `D-190` is the architect's **`MAJOR — bump to 2.0.0`**, recorded at `RELEASE-NOTES.md:64`–`:66`, and **the reason it moved from `MINOR` to `MAJOR` is ONE SENTENCE:** *"`D-189` item 2 removes `readonly compacted: boolean` from the PUBLISHED `JournalOp` (`bindings/js/index.d.ts`), and removing a declared member is breaking against `1.12.0`"* (`RELEASE-NOTES.md:66`–`:70`; `bindings/js/index.d.ts:685`–`:696` is that member's own removal clause and names `D-190`).
**SO THE CORPUS'S OWN PRECEDENT IS: A PUBLISHED DECLARATION MEMBER LEAVING OR CHANGING MEANING IS `MAJOR`.** **A returned member's MEANING changing on a shipped verb is not smaller than a member leaving** — it is larger for every consumer who already reads it, which is `P-3` §5's own reading of `(a)` (*"MAJOR — a returned member's meaning moves on a shipped verb, and four declared sets move with it"*, `strata/proposals.md:768`).
**WHAT A `MAJOR` MUST CARRY IN THIS PROJECT — read off `RELEASE-NOTES.md:58`–`:134` and `strata/envelope.md`'s own cut discipline:**
- **a root `RELEASE-NOTES.md` section above the previous one, naming the class in the heading** (`:58`: *"a MAJOR — the second claimed realm, the save arm it made possible, AND THE REMOVAL OF A PUBLISHED DECLARATION MEMBER"*);
- **a "WHAT A CONSUMER ON `<previous>` MEETS, AT EACH ENTRY POINT" block** (`:84`–`:134`), entry by entry;
- **the version moving EVERY site together** — `RELEASE-NOTES.md:70`–`:74`: *"the main manifest's `version`, its FIVE exact `optionalDependencies` pins, and the SIX `platforms/*/package.json` versions"*, and **`bindings/js/package.json:3` already reads `2.0.0`, so a second `MAJOR` is `3.0.0` and that is the architect's word**;
- **the three generated version lines** re-derived — `bindings/js/README.md`, `bindings/js/README.guide.md`, `bindings/js/RELEASE-NOTES.md` — and **both landings re-staged byte-for-byte, never hand-edited** (`RELEASE-NOTES.md:20`–`:21`, `strata/envelope.md:310`–`:312`);
- **every census site re-derived, and the fail-set census re-derived at all seven** if a status is minted (`strata/envelope.md:18`–`:21`);
- **the class claim itself recorded as a ruling, not inferred** — `D-124` item 3's discipline, kept by `D-190`.

**AND A CONSUMER'S MIGRATION SENTENCE WOULD HAVE TO SAY, IN THE SHAPE `RELEASE-NOTES.md:84` uses, SOMETHING LIKE:** *"on `X.0.0`, a `write` that lands the value the address already stands at no longer fires the listeners registered there; `triggered` on that write carries — / is — / is absent, and `op` — / records an op that changed nothing / — . Read `<member>` to tell the two cases apart."* **THAT SENTENCE CANNOT BE WRITTEN UNTIL `Q-1`…`Q-4` ARE ANSWERED, AND THAT IS THE PRECISE SENSE IN WHICH THIS IS A `MAJOR`'S SUBJECT AND NOT A PASS'S.**

### §5.5 · DOES IT PAIR WITH `P-2` OR STAND ALONE?

**THE ARCHITECT HAS ALREADY SAID IT STANDS FIRST, AND HE HAS ALSO SAID `P-2`'s BLOCK IS LIFTED AND `P-3` REMAINS THE CYCLE'S FIRST UNIT.** `strata/decisions.md:9354`: *"**`P-3` REMAINS THE CYCLE'S FIRST UNIT** (the architect's *"Start with P-3"*): this row is the intake answer and mints no unit."* **So the ORDER is declared.** **WHAT IS NOT DECLARED IS THE CLASS PAIRING, AND THE TWO REQUESTS TOUCH THE SAME `MAJOR` QUESTION:**
- **`P-2`'s break is behavioural** — `strata/decisions.md:9353`: *"a construction that today boots and arms would start refusing and firing — so it is a `MAJOR`'s subject or nobody's."*
- **`P-3`'s break is a returned member's meaning** — §5.4 above.
**BOTH WOULD LAND ON THE SAME VERSION LINE, AND THE TREE HAS ALREADY SPENT `2.0.0`.** **Whether they share one `3.0.0` or take two is `Q-10`, and the cost of getting it wrong is the one `D-158`→`D-190` already paid: a class claim superseded at its own sentence** (`RELEASE-NOTES.md:60`–`:66`).

---

## §6 · THE QUESTIONS ONLY THE ARCHITECT CAN ANSWER

**EVERY ONE IS THE ARCHITECT'S. Every default is a DEFAULT and none is a recommendation. `P-3` §4's nine (`strata/proposals.md:747`–`:757`) stand unchanged and are NOT re-asked here; the rows below are the questions THIS note's five sections raise, and where a row is `P-3`'s own it is marked so the two records cannot drift.**

| `#` | the question | the default if he does not answer | whose |
|---|---|---|---|
| **`Q-1`** | **SHADOWED-ADDRESS EQUALITY — WHAT IS THE SUBJECT AND IS THE TIER SET PART OF IT?** The per-tier standing is a **list** only where more than one version stands (`src/store.rs:2375`–`:2382`), collapses to one value at one (`:2383`–`:2391`), and is `absent` at none (`:2362`–`:2363`). **So a write that takes an address from one tier to two changes the subject's TYPE.** Does the comparison see the tier set, or only the values? | **the per-tier LIST, at the pair's own node, with the tier set part of the subject** — it is the only subject that makes `readTiered`'s answer (`D-121-ter`) agree with the firing rule, and it is the referent `strata/research.md:2037`–`:2041` already names. **A value-only reading is the alternative and it is cheaper; it cannot see a `mem` write that shadows an equal `file` value (§1.2 `S-2` (i)) and would silence the act that changed the tier model** | **the architect's — BLOCKING** |
| **`Q-2`** | **THE EQUALITY'S RELATION — which of `PartialEq`, `sameStanding`, the canonical encoding, or a composition of two?** The corpus has **two** and they disagree at `-0` (`src/value.rs:15` vs `constraints.mjs:3643`); **the only tier-aware relation in the tree is value-blind** (`save_owed`, `src/store.rs:1954`–`:1960`). | **the store's `PartialEq` over `StoreValue`, compared over `Q-1`'s subject** — it is free, it is already `derive`d, and it is the only relation that lives where `D-69`'s one predicate lives (*"ONE PREDICATE, in the store, where the per-tier versions live"*, `strata/decisions.md:3861`). **The `-0` divergence is then decided AGAINST `sameStanding`, and the architect must know that: the reversal's judgement would keep one answer and the write's firing rule the other** | **the architect's — BLOCKING, and it is `P-3`'s `Q-1`+`Q-2`+`Q-3` asked at the relation** |
| **`Q-3`** | **DOES A NO-CHANGE WRITE MINT AN OP?** It mints one unconditionally today (`src/store.rs:2995`, `:2441`–`:2442`), and the append can **drop the oldest journal entry** (`:2451`–`:2466`). **Minting keeps `P-TP-8` (g) (`contract.md:3056`–`:3059`) and `rollback`'s reachability and keeps the compaction cost; not minting removes a journal position and falsifies (g) at the answered record.** | **IT MINTS ONE, and the suppression is narrower than the act** — the op is the carrier of the save (`commit_file` looks the entry up by id, `src/store.rs:1804`–`:1810`), of (g), and of `rollback`'s reach, **and the tree has no arm that answers a `WriteRecord` with no `op`.** **The alternative — the `delete`-that-removed-nothing shape (`:3098`–`:3109`, `op: None`, no entry) — is the corpus's one shipped precedent and it changes `WriteRecord.op`'s type from `JournalOp` to `JournalOp \| null` (`index.d.ts:716`), which is a surface break of its own** | **the architect's — BLOCKING** |
| **`Q-4`** | **WHAT DOES THE RECEIPT CARRY?** Four answers are priced in §4: `(A-1)` the same receipt with `triggered: []` · `(A-2)` today's receipt whose `op.before` equals `op.after` · `(A-3)` a new status — **unavailable, the set is a refusal set** · `(A-4)` rank `24`. **And a fifth is a ruling away: a member on the closed record, the device seven members have already landed with.** | **`(A-1)` with the `[]` sentence written in the same pass** — `(A-2)` alone answers the request with nothing new and is available today, **which is precisely why it may be what he actually wants if the request is about telling rather than silencing**; `(A-1)` is the default only because the request's verb is *"fire"* and not *"report"*. **`Q-5`'s sentence is the debt either way** | **the architect's — BLOCKING** |
| **`Q-5`** | **DOES THE SUPPRESSION REACH THE CONSTRAINTS, OR ONLY THE LISTENERS?** **They are one predicate and one returned set** (`src/store.rs:2546`–`:2553` and `:2571`–`:2577`; `contract.md:3048`–`:3052`'s projection law; `kernel-attempt.mjs:669`–`:670`). **A store-side narrowing narrows the pass, `D-105`'s repair-credit set and `D-152`'s registration-instant union by construction; a package-side one narrows only the delivery and creates `D-67`'s asymmetry one layer up.** | **THE PASS NARROWS WITH THE FIRING — the two are one predicate by `D-69`, and a write that a pair would have refused on must not become admissible because its value was equal.** **This is `P-3`'s `Q-2`'s consequence read at the constraint axis, and it is the row whose default is a silent ruling if it is not named** | **the architect's — BLOCKING** |
| **`Q-6`** | **DOES THE RULE REACH THE TOUCHED ARM?** A second identical STRUCTURED write touches one path per own member (`src/store.rs:4213`–`:4229`) **where no assembled value changed**, so the request's words narrow `D-66`'s descendant arm. | **THE TOUCHED ARM IS NOT NARROWED** — `P-3`'s `Q-4` default stands and is re-derived here: a registration there was told by `D-66`'s ruling and not by this request, and §2's table shows every value relation is blind to it anyway | **the architect's — `P-3`'s `Q-4`, unchanged** |
| **`Q-7`** | **AT WHICH INSTANT — the spelled value or the landed one, and does a repair's write obey the same rule?** `D-118`'s order puts the repair after the ask (`D-117`, `:6034`–`:6039`); the set is computed inside the write (`src/store.rs:3001`–`:3007`) and the save and pass follow it. | **the landing, before any repair** — `P-3`'s `Q-7` default, unchanged, because the set is computed inside the write and a repair cannot retroactively silence it. **But a repair's OWN write is a separate act whose suppression would change `D-104`/`D-152`'s delivered union, and that half is NOT decided by this default** | **the architect's — `P-3`'s `Q-7`, and its repair half is open** |
| **`Q-8`** | **DOES A NO-CHANGE `file`-TIER WRITE STILL SAVE?** `save_owed`'s first disjunct answers `true` before any departure test (`src/store.rs:1951`–`:1953`), so **today it saves, and the file is rewritten with identical bytes while its mtime moves** (`strata/research.md:2176`–`:2178`). `D-106` item 2's rule (`strata/decisions.md:5419`–`:5421`) does not reach the case: *"any action that changes the file-tier data"* — this action does not. | **IT STILL SAVES** — `D-106` item 2 is the only clause in reach and its antecedent is false, so no clause in the tree forbids the save; and the save is the op's own eligibility ground, whose movement would be a second change to a rule that has already been amended twice. **The cost is named: the request's own act is the one the corpus's journal-retention RCA benchmarked** (`src/store.rs:2429`) | **the architect's** |
| **`Q-9`** | **DOES `D-152` SURVIVE, AND IS ITS *"CHANGED"* NOW RE-READ?** `D-152` (`strata/decisions.md:7991`, `2026-11-17`) rules *"Fires only the listeners changed by the writes"* and its mechanism is a **write-existence** union of the store's answered sets (`:8003`–`:8010`). **A store-side value test changes the sets it unions, at four instants `D-125` item 1 widened.** | **`D-152` STANDS AND ITS `"changed"` IS READ AS ACT-EXISTENCE, NOT VALUE EQUALITY** — that is what its own mechanism says, and reading it as a value test would import `P-3`'s undecided relation into a different ruling by inference. **Under `Q-5`'s store-side default its union narrows with the store's set and that consequence is his to accept or refuse** | **the architect's** |
| **`Q-10`** | **CLASS, AND DOES IT PAIR WITH `P-2`?** `D-190` is `MAJOR — bump to 2.0.0` for **removing one published declaration member** (`RELEASE-NOTES.md:64`–`:70`); `bindings/js/package.json:3` already reads `2.0.0`; `P-3` is declared *"the cycle's first unit"* and `P-2`'s break is behavioural (`strata/decisions.md:9353`–`:9354`). **So: `MAJOR`, and one version line or two?** | **`MAJOR`, STANDING ALONE ON ITS OWN VERSION** — the request has its own subject, its own declarations and its own sentence to write, and pairing two unrelated breaks on one number would make one release note carry two migrations. **`2.0.0` is spent, so the number is `3.0.0` and that is his word, not a pass's** (`D-124` item 3's discipline) | **the architect's — BLOCKING for scope** |
| **`Q-11`** | **IS THE SHIPPED DEFAULT FLIPPED, OR IS THE BEHAVIOUR OPT-IN?** `P-3`'s `Q-9` default stands: **the shipped default STANDS and nothing lands** — and this owner's own precedent on the same fork is opt-in (`P-1` → `D-121`, a third verb, `strata/proposals.md:212`–`:214`). | **the shipped default STANDS; the behaviour is an option or a verb** — restated here only because `Q-3` and `Q-4` cannot be pinned on a default that is itself a silent flip | **the architect's — `P-3`'s `Q-9`, unchanged** |
| **`Q-12`** | **WHAT MAY A CALLER CONCLUDE FROM `triggered: []`, AND HOW DOES IT TELL THE TWO CASES APART?** `docs/specs/storeroom-js/surface.md:235` (`D-78`) says an absent member and an empty list are different claims; the store's existing `[]` means *"no registration stood at a prefix"* (`contract.md:3033`–`:3034`). | **the sentence is owed in the same pass and the two cases are declared indistinguishable from `[]` alone** — `P-3`'s `Q-5` default, unchanged; §3.6 shows `log` and `discarded` inherit the same ambiguity at the same seam | **the architect's — a debt a landing pass may not leave** |

---

## §7 · WHAT I COULD NOT ESTABLISH FROM THE TREE

**EACH OF THESE IS A PLACE WHERE THE TREE DOES NOT DECIDE, AND I HAVE NOT FILLED IT WITH A PLAUSIBLE READING.**

1. **WHETHER A PASS THAT RUNS EMPTY STILL DRAINS ITS WINDOW.** `D-170`'s guarantee is *"every pass drains"* (`strata/decisions.md:8737`–`:8739`), and a suppressed pass is a pass that does not run. **The residual was measured unreachable on the shapes that row drove; a pass emptied by a value test is not one of them.** No clause answers it and no cell drives it. §3.5.
2. **WHETHER `D-152`'s *"changed"* AND THIS REQUEST'S *"changed"* ARE ONE WORD.** The row's mechanism is act-existence; the request's is value-equality; the two share a spelling and neither document distinguishes them. **A ruling is needed and I have not inferred one.** §3.2.
3. **THE `-0` ARM'S DIRECTION.** `src/value.rs:15` and `constraints.mjs:3643` give two answers and **no clause says which governs a firing rule.** `A59` (c) governs the *file image* (`src/json.rs:111`–`:113`) and says nothing about a comparison. §2.1.
4. **WHETHER A SHADOWING WRITE OF AN EQUAL VALUE IS *"A CHANGE"* IN THE CORPUS'S OWN TERMS.** `save_owed`'s docblock calls the shadowing write one that *"leaves it standing"* (`src/store.rs:1940`–`:1943`) and refuses it a save; `D-66`'s criterion calls creation-and-purge changes. **Neither says whether minting a `mem` version over an equal `file` version is a change.** This is the single case on which §1's and §2's answers converge, and the tree is silent. §1.2, §2.2.
5. **WHETHER `WriteRecord.op` MAY BECOME OPTIONAL.** The `delete`'s receipt `op` is `Option<JournalOp>` (`src/records.rs:223`) and the write's is not (`bindings/js/index.d.ts:716`). **No clause explains the asymmetry, and no clause forbids closing it — and closing it would be a published-member change of the class `D-190` already paid for.** §3.4, §4.
6. **WHETHER ANY CLAUSE RELIED ON A NO-CHANGE WRITE *FIRING*.** The corpus's one cell says it does (`json-crossing.test.mjs:4357`); the re-entrancy clause's example depends on it (`storeroom-js/contract.md:2183`–`:2185`). **No clause declares the firing a capability.** `P-3` §6 already withdrew the argument that an equal-value write is the product's *only* re-check lever (`strata/proposals.md:813`–`:817`) — `addConstraint`/re-arm re-run unconditionally — **so the capability claim is dead, and what remains is an expectation with no clause behind it.**
7. **`P-3`'s OWN RANGES.** Twelve of them drifted (§0.3). **Two I did not re-read at all** — `docs/specs/storeroom-native/contract.md:1794` and `:2237` — and I make no claim about them. **A gate-2 pass must re-take every `path:line` in `P-3` at the landing date**, which is this project's standing rule anyway.
8. **WHETHER `tests/e2e/blind-entry-surface.test.mjs`'s 22 is a LIVE RED OR A SILENT GREEN.** I read the array (22 literals) and the assertion (`length, 22`) and the two homes (23 each) and **the cell is self-consistently green on a copy that disagrees with both homes.** **Whether some other cell catches it in CI is a run, and this pass held no shell.** §5.1.

---
