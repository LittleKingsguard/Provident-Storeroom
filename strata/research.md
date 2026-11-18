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
