# GREENS — the blind-scenario set for `U-STOREROOM-HELD-LISTENER-IDENTITY` (`D-GP-SHLI`), authored at gate 5 (`P5`) from the documentation alone

**Role.** `role_blind_test_writer`. **AUTHORED FROM THE DOCUMENTATION ALONE.** The inputs read were the
contract directory `docs/specs/storeroom-held-listener-identity/` (`contract.md` and its nine parts:
`identity-and-domain.md` · `listen-verb.md` · `constraint-sites.md` · `trigger-and-pair.md` ·
`constraint-identity.md` · `removal-members.md` · `kernel-selection.md` · `remove-member.md` ·
`test-cases.md` · `implementation-plan.md`), the four STEP-0 adoption dossiers at
`docs/specs/storeroom-held-listener-identity-adoption-dossier.md`,
`…-p6-adoption-dossier.md`, `…-p7-adoption-dossier.md`, `…-p8-adoption-dossier.md` — **read at their heads
and status clauses, where each declares *"A GATE-2 INPUT AND AN ENTRY CONDITION, NOT A CONTRACT"* and
*"It pins no behaviour"*, so NO scenario of this set is derived from one** — `docs/pending.md`'s
`## HELD —` sections and their `⟶` rulings (`P-5` · `P-6` · `P-7` · `P-8`, and every labelled block those
sections cite: `R-B1`–`R-B4`, `(C-1)`–`(C-3)`, `(D-i)`–`(D-vi)`, `(F-1)`–`(F-3)`, `(M-1)`–`(M-3)`,
`(O-1)`–`(O-4)`, `(R1)`–`(R4)`, `(X-1)`–`(X-7)`, `(Y-1)`–`(Y-3)`, `(Z-1)`–`(Z-7)`, `(AA-1)`–`(AA-8)`, and the
`⟶ THE HOLD IS SUPERSEDED` clause), and the existing spec corpus under `docs/specs/` (`storeroom-native/`,
`storeroom-js/`, `storeroom-constraints/`) **where the directory's clauses cite it** —
`docs/specs/storeroom-js/surface.md §2.3`/`§2.5`, `docs/specs/storeroom-constraints/kernel-surface.md`
`§1`/`§2.1`/`§2.2`/`§2.5` and `fail-surface.md §1.1`, `attempt-lifecycle.md §2.4`, and
`docs/specs/storeroom-native/contract.md §8.1`'s closed set.

**NO BYTE OF `bindings/js/index.mjs`, `bindings/js/src/**`, `src/**`, `bindings/js/test/**` OR `tests/**` WAS
READ, AND NO RED-SET, ADVERSARIAL REPORT OR GATE RECORD WAS READ.** Both consumer modules were reached
**only as imports**, through the homes their own clauses declare: the package's claimed ESM entry
(`docs/specs/storeroom-js/package.md §1.1`) and the kernel module's declared checkout home
`bindings/js/src/constraint-kernel.mjs` (`docs/specs/storeroom-constraints/kernel-surface.md §1` item 1).
**The only bytes this pass writes inside the repository are this document and its driver,
`bindings/js/greens/held-listener-identity-greens.mjs`.**

**Layer.** This set is an **`ENVELOPE/PURE`** set and **NOTHING MORE**: it drives two modules through their
declared surfaces, in-process. **THE ASSEMBLED/`APP` LAYER FOR THIS CHANGE IS `NONE`, NO `APP`-GREEN IS
CLAIMED ANYWHERE IN THIS FILE OR IN ITS DRIVER, and no figure of this pass is a node-suite, a `cargo test`
or a battery figure** — the two figures reported are **the driver's own assertion counts**.

**Bounds, declared so no figure below is read as more than it is.** **`OWED` subjects are NOT driven:**
`K-6`'s removal on a purged pair's stale handle (`contract.md §2.9` item 7, `§10` item 4); what a caller who
deletes then re-registers is told (`§2.1` item 8); `triggeringAddress`'s declared home (`§2.4` item 7);
`DD-53`'s stale-row disposition (`§10` item 7); `evaluate`'s `pair === undefined` skip (`§10` item 12).
**`UNSUPPORTED` subjects are NOT driven:** a listener's or constraint's mid-window mutation of another entry
(`contract.md §2.2` item 9; `P: docs/pending.md · (AA-6)`). **NO COST IS ASSERTED** (`implementation-plan.md
§4` item 1; `kernel-selection.md §6` item 1), **NO ORDER IS ASSERTED over `triggered`, `pending`, `watched`
or `constraints()`** (`DD-37`, `DD-22`; `test-cases.md §5` item 2), **and no observable is invented for a
state the contract declines to give one** (`listen-verb.md §5` item 3's withdrawal, carrying `HLI-14`'s
scope).

---

## §1. THE SCENARIO SET — 14 scenarios, each bound to its clause

| id | The clause(s) it drives (and the ruling where one governs) |
| --- | --- |
| **HLI-01** | **THE SURFACE AND THE MEMBER SET.** The module namespace's one name; the product's own member set `14` (`10 + 1 + 1 + 2 = 14` ✓); both remove members reached through the product alone; `listen`'s arity `2`; the merged-away names absent — `contract.md §2.7 item 9`, `§5.7` `S-MEMBER-COUNT`, `§2.9 item 1`; `removal-members.md §7 items 2–3`; `listen-verb.md §1 item 1`; `package.md §1.3 item 3`; `P: docs/pending.md · (AA-5)` |
| **HLI-02** | **THE HANDLE'S STRING DOMAIN AND ITS REFUSAL CLASSES.** A fresh well-formed string ADMITTED at `listen` and naming a NEW entry; the five classes of `LF-1` and the wider non-string set; the surface's one thrown form (`{status, message, log}`, `AddressMalformed`), non-empty and placeholder-free; a refused `listen` reaching no store act; `unlisten`'s no-op success over the same values and its removal of no other registration; `removeListener`'s DECLARED REVERSAL (thrown) — `identity-and-domain.md §1 item 1`, `§2 items 1–3` (with the 2026-10-18 amendment), `§6` `O-1`/`O-3`; `listen-verb.md §2.1`, `§8` `LF-1`; `contract.md §2.1 items 1/4/5`, `§4` `F-1`/`F-3`/`F-4`/`F-6`, `§2.7 item 5`; `removal-members.md §5 rows 1/4/5/6/7`, `§6 item 1`; `P: docs/pending.md · P-6` · `R-B4` · `P-5's (R2)` |
| **HLI-03** | **`listen`'s SET POSITION, POSITION 2.** The empty array IN the domain; a set of one and of two; the six outside classes (ABSENT · `null` · a non-array · a BARE SEGMENT LIST · an array carrying a member outside the store's address domain · an array of arrays that is not itself a set); the one thrown form and no store act; the class-first discriminator — `listen-verb.md §2.2 items 1–4`, `§8` `LF-2`; `contract.md §2.2 items 2/10`, `§4` `F-2`; `parameter-semantics.md` `PAR-HL-2`; `P: docs/pending.md · P-7`'s set ruling |
| **HLI-04** | **THE PURGE EVERYTHING BY HANDLE.** `listen`'s declared return `undefined`; one handle at N addresses → ONE entry; `listen(h, S2)` purging `S1` WHOLESALE at every address it stood at; `S2` installed and never a union; the idempotence IN EFFECT; a reused handle REPLACING — `contract.md §2.2 items 3–4/10`, `§3` `S-3`/`S-4`/`S-5`, `§5.2` `S-PURGE-SET`/`S-PURGE-ALL`, `§5.1` `P-HL-1`; `listen-verb.md §3 items 1–2`, `§8` `LF-4`/`LF-6`; `parameter-semantics.md` `PAR-HL-3`/`PAR-HL-4`; `P: docs/pending.md · (R1)` · `(M-1)` · `(Y-1)` |
| **HLI-05** | **THE THREE STATES AND THE ONE TRANSITION.** State 2's invocation; state 1's declared silence after `unlisten`; the entry KEPT (state 1, not state 3); re-arming by `register`; `removeListener` → state 3, where `register` THROWS; a later `listen` creating a FRESH reserved entry; `unlisten`'s no-op success after a removal — `listen-verb.md §4` (states 1–3 and `T`), `§8` `LF-5`; `identity-and-domain.md §3 items 1–2`, `§4`; `contract.md §2.2 item 5`, `§3` `S-6`/`S-7`, `§2.7 item 2`; `removal-members.md §2 items 1/3/4`; `P: docs/pending.md · P-5`'s explicit-delete ruling |
| **HLI-06** | **THE TWO NEW MEMBERS' WHOLE REMOVAL.** `removeListener`'s `undefined` and the total withdrawal of the handle's store entries at BOTH its addresses; `register` refused afterwards; a later `listen` re-creating the entry; `removeConstraint`'s `undefined`, the read model shrinking by exactly one and dropping the pair, the address no longer enforced, a fresh `addConstraint` answering a DIFFERENT identity; the fail arms THROWING (never a returned discriminant) with rule (ii)'s `TypeError` and NO `status`; a thrown arm leaving the read model unmoved — `removal-members.md §2 items 2–4`, `§3 items 1–3`, `§4 item 4`, `§5 row 1`, `§6 item 2`, `§8` `RF-1`/`RF-3`/`RF-4`/`RF-7`; `contract.md §2.7 items 2–3/7–8`, `§5.7` `S-REMOVE-WHOLE`/`S-REMOVE-ATOMIC`, `§4` `F-8`; `constraint-identity.md §3 item 2`; `P: docs/pending.md · P-5's (R3)`/`(R4)` · `(AA-2)` |
| **HLI-07** | **THE `{handle, address}` PAIR IN BOTH RETURNED RECORDS.** `WriteResult`'s three members with `watched` carrying ADDRESSES and `triggered` carrying PAIRS; `DeleteReceipt`'s three members and its pair list; the supplied handle carried unchanged; no `triggeredAddresses` array; the one-invocation dedupe on `entry.handle` with the WRITTEN address as the single argument; the carried `address` asserted by MEMBERSHIP alone; the pair's `address` differing from the argument at a strict prefix and equal at the written address — `contract.md §2.4 items 1/6/7`, `§5.3` `S-PAIR-SHAPE`/`S-PAIR-TOTAL`/`S-PAIR-DISTINCT`; `trigger-and-pair.md §1`, `§2 items 1/4`, `§5 items 2–4`, `§8` `TF-2` (narrowed 2026-10-18)/`TF-5`/`TF-6`; `P: docs/pending.md · P-7`'s pair and dedupe rulings |
| **HLI-08** | **THE KERNEL'S EXACT-ADDRESS SELECTION, ON THE STORE'S OWN TRIGGERING ADDRESS.** Three pairs at an ancestor, the write's own and a descendant address with the store's prefix-selected set carrying TWO of them; the pass's evaluated set is EXACTLY ONE — the write's own address's pair; the record's four members and its pair lists; a two-address pair evaluated ONCE; `KC-7` refused at a held address and a non-held address admitted — `kernel-selection.md §1 items 1–4`, `§3 items 1–3`, `§4 item 2`, `§7` `KF-1`/`KF-2`/`KF-3`/`KF-7`/`KF-11`; `contract.md §2.8 items 1/6/7`, `§5.4` `S-SEL-EXACT`/`S-SEL-SNAPSHOT`/`S-SEL-DEDUPE`, `§2.9`; `kernel-surface.md §2.1 items 1–2`, `§2.5 item 1`; `attempt-lifecycle.md §2.4 item 5 (iv)` and `:193`; `constraint-identity.md §4 item 5`, `§8` `IF-9`; `P: docs/pending.md · (AA-1)` · `R-B3` · `(M-3)` |
| **HLI-09** | **THE IDENTITY'S STORE-SIDE HOME, AND THE ONE ACT THAT DELETES IT.** The opaque identity; no own enumerable member; a second `addConstraint` at the SAME pair answering the SAME value; two pairs answering two unequal values; the full `constraintOff`/`constraintOn` cycle leaving the identity the SAME and the pair CARRIED; the enumeration's elements carrying exactly `address` and `id`, as a SET, with no identity enumerated — `constraint-identity.md §1 item 3`, `§2 items 1–3`, `§3 item 3`, `§4 items 3–4`, `§5` `IF-1`–`IF-6`; `contract.md §2.6 items 1–6`, `§5.6`; `constraint-sites.md §1 sites 2–3`; `js corpus surface.md §2.12 item 4/6`; `P: docs/pending.md · (AA-2)` · `(X-1)` · `P-7`'s keying ruling |
| **HLI-10** | **`pending`'s POP, THE SEEDING CLONE, THE FOUR MEMBERS, AND THE DISCARD.** The record's FOUR members and no fifth; the seeding as a clone by the SAME ELEMENT IDENTITIES; every element a pair at `K-2`'s return; the checked-off identity GONE from `pending` after the pass while the un-evaluated entry STANDS; `pending`'s size the STILL-PENDING count and never the returned set's size; `triggered` unmoved; the failed write running ZERO bodies of its own set and its bubbled log carrying `outcome.state = KC-3` and a `constraint-check` entry with `state: null` — `contract.md §2.4 items 3/4/8/9`, `§5.3` `S-PAIR-TOTAL`; `trigger-and-pair.md §3 items 1–5`, `§4 items 1–3`, `§6 items 1–2/4`, `§8` `TF-1`/`TF-3`/`TF-4`/`TF-7`/`TF-8`; `kernel-surface.md §2.5 item 1`; `fail-surface.md §1.1 item 1/3`; `attempt-lifecycle.md §2.4 item 4 arm (c)`; `P: docs/pending.md · P-7`'s `pending` ruling · `(AA-7)` |
| **HLI-11** | **THE CONFLICT TEST AT `register`** — `addConstraint`-only, package-side `TypeError`, NO `status`. The kernel's own stub NOT refused at an address a caller's pair stands at; `listen` at a pair's address SUCCEEDING (no conflict test there); a CALLER's registration at that address REFUSED; the refusal a `TypeError` with `status` ABSENT, `log: []`, a non-empty package-authored message naming BOTH SIDES; the read model untouched — `constraint-sites.md §5 items 1–6`, `§6 items 1–3`, `§7` `CF-7`; `contract.md §2.3 items 8–9`, `§4` `F-9`; `listen-verb.md §7 item 1`, `§8` `LF-8`; `parameter-semantics.md` `PAR-HL-7`/`PAR-HL-32`; `P: docs/pending.md · (C-1)` · `(C-2)` · `(C-3)` and pass 8's *"Purge wins at listen — conflict is addConstraint-only"* / *"Move the test to register"* / *"Package-side TypeError — no new code"* |
| **HLI-12** | **THE SET-VALUED PAIR ADMITTED AT `addConstraint`, AND THE TOGGLES.** A pair whose `address` is a SET of two admitted; ONE row from `constraints()` per pair (`IF-7`) with the `address` member's type moved; the pair enforced at EITHER address (set membership, not equality); `constraintOff`/`constraintOn` returning `undefined`, leaving the element count unmoved and the identity the SAME; the parked stub passing while off; a toggle naming an uncarried pair THROWING a `TypeError` with no `status` — `constraint-identity.md §4 items 1–5`, `§5` `IF-7`/`IF-8`; `contract.md §2.3 item 7`, `§2.6 items 4–6`; `constraint-sites.md §1 sites 2–3`, `§7` `CF-8`; `removal-members.md §3 item 3`; `parameter-semantics.md` `PAR-HL-8`/`PAR-HL-12`/`PAR-HL-13`; `P: docs/pending.md · P-7`'s `1. (one id, N addresses)` |
| **HLI-13** | **`K-6`, THE KERNEL'S SIXTH ITEM.** The module's own export set against the extent `5 → 6`; the item reachable as `remove`; success `undefined` (never a record); the kernel's rows gone (a second `K-6` refused `KC-2` in the kernel's own three-member form); the store's entry withdrawn (`triggered`/`watched` empty); the read model shrunk and a fresh `addConstraint` answering a DIFFERENT identity; a no-row pair refused `KC-2` with nothing moved; no `KC` member minted; the recommended `S-K6-ROUTE` presence instrumentation, driven AT ITS DECLARED LIMIT — `remove-member.md §1–§7` (`MF-1`–`MF-9`); `contract.md §2.9 items 1–7`, `§5.8` `S-K6-EXTENT`/`S-K6-ROUTE` (with its limit clause)/`S-K6-ANSWER`; `kernel-surface.md §1 item 2`, `§2.1 items 1/2`; `fail-surface.md §1.1`; `parameter-semantics.md` `PAR-HL-29`–`PAR-HL-31`/`PAR-HL-38`; `P: docs/pending.md · R-B2` · `(D-iv)` · `(M-2)` |
| **HLI-14** | **THE PURGED PAIR: `listen`'s PURGE REACH IS UNCONDITIONAL, AND THE PAIR STILL EVALUATES.** A pair registered through `K-1` and ENFORCED; an app's `listen` at that address under that handle SUCCEEDING (no conflict test at `listen`); the pair STILL EVALUATING after it (the violating write still refused, its log still naming `KC-3`); the address re-created under the SAME handle — `listen-verb.md §5 items 1–4`, `§8` `LF-8`; `contract.md §2.2 item 7`, `§3` `S-18`; `kernel-selection.md §5`; `fail-surface.md §1.1 item 3`; `P: docs/pending.md · P-5`'s `(F-3)` and `(C-1)`/`(C-2)` item (iv) |

**Coverage against the brief's eleven items.** (1) the handle's string domain and its refusal classes →
**HLI-02**; (2) `listen(handle, addresses)` arity `2` and its set position → **HLI-01** + **HLI-03**;
(3) the purge-everything-by-handle rule → **HLI-04**; (4) the two new members' whole removal → **HLI-06**
(+ **HLI-05** at the `unlisten`/`removeListener` reversal); (5) the `{handle, address}` pair in both
returned records → **HLI-07**; (6) the kernel's exact-address selection using the store's triggering address
→ **HLI-08**; (7) the identity's store-side home → **HLI-09**; (8) `pending`'s pop → **HLI-10**;
(9) the conflict test at `register` → **HLI-11**; (10) the set-valued pair admitted at `addConstraint` and
the toggles → **HLI-12**; (11) the `K-6` removal → **HLI-13**. **AND THE ONE SCENARIO THE BRIEF'S LIST DOES
NOT NAME — `HLI-14` — is bound at the clauses its own row names: `listen`'s unconditional purge reach and
the purged-pair state's two declared halves.**

---

## §2. HOW EACH SCENARIO WAS EXECUTED, AND THE FIGURE CENSUS

**This is a SELF-VERIFIED set only in the sense the gate forbids pretending otherwise, so it is stated
plainly: the expectations were authored from the documents and the run was executed by the same pass that
authored them — THIS IS A REVIEW FINDING AGAINST THIS ARTIFACT BY CONSTRUCTION, and it is reported as one at
`§3.1` and to the supervisor. What follows is the executable record so a second pass can re-run it
independently.**

**The method, in four clauses.**

1. **THE DRIVER.** `bindings/js/greens/held-listener-identity-greens.mjs` — **14 scenarios, in the order of
   `§1`, one `{ }` block each, cell for cell.** Each cell is one call of the driver's `A(id, clause,
   expectation, cond, observed)` helper, which counts the assertion, attributes it to its scenario and, on a
   false `cond`, prints `FAIL <id> · expected · observed · clause` and records it. **EVERY CELL'S EXPECTED
   VALUE WAS WRITTEN FROM THE CLAUSE CITED IN ITS OWN `A(...)` CALL, BEFORE THE RUN.**
2. **THE TWO CONSUMER MODULES, AND NOTHING ELSE.** The package's claimed ESM entry
   (`../index.mjs`) — the one product-surface import — and the kernel module's declared checkout home
   (`../src/constraint-kernel.mjs`), whose five items the kernel scenarios reach through the call shapes
   `kernel-surface.md §2.1` prints (`register(store, address, id, constraint)` ·
   `commit(store, address, tier, value)` · `runAttempt(store, attempt)` · `log(store, attempt)`) plus
   `K-6 remove(store, pair)` (`remove-member.md §3` item 1). **No third module is imported, no path is
   spelled in a drive, no addon is loaded by anything but the package's own declared resolution, and no
   module interception and no monkey-patch is used** — except at **`HLI-13.14`**, which performs the
   `S-K6-ROUTE` presence instrumentation **the contract itself declares**, on a per-instance object the
   drive owns.
3. **THE SCRATCH AREA.** Every `cfg` is built in a `fs.mkdtempSync` directory under the platform temp root
   and removed at the end of the run; **nothing is written inside the repository by the run.**
4. **THE VERDICT RULE.** A divergence is a **FINDING** with the clause on each side and is never a pass; **no
   assertion is weakened to make a scenario pass, and no failing cell is re-worded after it is seen.** Where
   a **drive** (never an expectation) was malformed, the drive was corrected, re-driven, and the correction
   is named at `§2.1` below.

**THE RUN.** `node bindings/js/greens/held-listener-identity-greens.mjs`, from the repository root, against
the live tree, **three times, producing identical counts.**

```
AUTHORED 174 · EXECUTED 174 · PASS 173 · FAIL 1
```

**AND THE DRIVER'S EXIT CODE IS `1`, on purpose: the run's verdict is `173 PASS · 1 FAIL`, and the driver
exits non-zero whenever any cell FAILS, so a re-runner reading the exit code meets the same figure the
census prints.** **`F-1` is the one FAIL; it is a FINDING with the clause printed on each side at `§3`, and
it is not a red that awaits an implementer's fix inside this unit (`F-1`'s closing paragraph says why).**

**THE FIGURE CENSUS, printed with its terms.** **`14` scenarios · `174` assertions, of which `173` PASS and
`1` FAILS.** The per-scenario terms, each printed with the scenario's own count:

| id | assertions | PASS | FAIL |
| --- | --- | --- | --- |
| **HLI-01** | 8 | 8 | 0 |
| **HLI-02** | 26 | 26 | 0 |
| **HLI-03** | 11 | 11 | 0 |
| **HLI-04** | 10 | 10 | 0 |
| **HLI-05** | 11 | 11 | 0 |
| **HLI-06** | 15 | 15 | 0 |
| **HLI-07** | 13 | 13 | 0 |
| **HLI-08** | 13 | 13 | 0 |
| **HLI-09** | 11 | 11 | 0 |
| **HLI-10** | 11 | 11 | 0 |
| **HLI-11** | 11 | 11 | 0 |
| **HLI-12** | 14 | 14 | 0 |
| **HLI-13** | 14 | 13 | **1** |
| **HLI-14** | 6 | 6 | 0 |
| **TOTAL** | **174** | **173** | **1** |

**`8 + 26 + 11 + 10 + 11 + 15 + 13 + 13 + 11 + 11 + 11 + 14 + 14 + 6 = 174` ✓**, and
**`173 + 1 = 174` ✓**, and **`13 + 1 = 14` scenarios ✓**. **THE SET'S FIRST RUN READ `174 · 170 PASS · 4
FAIL` (`HLI-07.8` · `HLI-07.9` · `HLI-13.1` · `HLI-13.12`); THREE of those four cells were THIS DOCUMENT'S
OWN DRIVING ERRORS and are named with their corrections at `§2.1`, and the FOURTH — `HLI-13.1` — is `§3`'s
`F-1` and stands. THIS TABLE IS THE CORRECTED DRIVER'S CENSUS, three consecutive runs, identical.**

### §2.1 THE TWO DRIVES THIS PASS CORRECTED, AND THE ONE THING NOT WEAKENED

**Two cells FAILED on the set's first run and BOTH were the driver's own ordering, not a clause's reading.
EACH CORRECTION TOUCHES A DRIVE AND MOVES NO EXPECTATION.**

1. **`HLI-07.8` / `HLI-07.9`.** The write's invocation count was read **after** the `delete` of the same
   address had re-triggered the same handle, so the count the cells compared was **two writes'** and the
   `address` list carried an entry the write did not make. **The correction: the count and the argument are
   captured at the WRITE's own instant** (`argsAfterWrite`), and the `delete`'s own re-trigger is left where
   it belongs — in `HLI-07.6`/`.7`, on the delete receipt's shape. **The expectations — one invocation for a
   two-address handle, and the written address as its one argument — are UNMOVED, and both cells now PASS.**
2. **`HLI-13.12`.** The read model was compared against a reading taken **before** `HLI-13.10`'s own fresh
   `addConstraint`, which legitimately grows it by one. **The correction: the reading is taken IMMEDIATELY
   BEFORE the refused `K-6`.** **The expectation — a refused `K-6` moves nothing — is UNMOVED, and the cell
   now PASSES.**

**AND THE ONE THING NO CORRECTION DID: `HLI-13.1`'s expectation was NOT relaxed.** It asserts the kernel
module's own export set against the extent the directory declares, and it FAILS. It is reported at `§3`.
**`HLI-11` ALSO TOOK NO SIDE:** both conflict directions were driven, the identity-keyed direction is
asserted, and the `addConstraint`-at-a-listener's-address direction is **recorded in the driver's own
`RECORDED AND NOT ASSERTED` block and reprinted at `§3.2`**, because the directory's two clauses print
opposite arrows and a blind set may not pick one.

---

## §3. THE FINDINGS — each with the clause on each side

### F-1 — **the kernel module's own export set carries a seventh name, and no clause of the corpus names it** (1 assertion: `HLI-13.1`) — **OPEN**

**The clause.** `remove-member.md §5` item 1 prints the extent and its arithmetic —
*"The kernel's surface is `6` items — `K-1` `register` · `K-2` `commit` · `K-3` `runAttempt` · `K-4` `log` ·
`K-5` `report` · `K-6` `remove` — `5 + 1 = 6` ✓"* — and `§7`'s `MF-6` row names **the searched set and the
falsifier in one line**: *"a seventh name reachable on the kernel's surface | any item beyond `K-6` | NONE |
**the module's own export set**"*. `contract.md §2.9` item 5 prints the same set and the same arithmetic.

**The drive.** `Object.keys(await import('../src/constraint-kernel.mjs')).sort()` — the module's own export
set, which is the searched set `MF-6` names, at the module's declared checkout home
(`kernel-surface.md §1` item 1).

| the drive | expected from the clause | observed |
| --- | --- | --- |
| the kernel module's own export set | **exactly the six declared items** — `['commit','log','register','remove','report','runAttempt']` | **`['commit','isKernelHandle','log','register','remove','report','runAttempt']` — SEVEN names, the extra being `isKernelHandle`** |

**Which side is wrong, stated as a finding and not decided by this pass.** **`isKernelHandle` is named by NO
clause of the twelve files of this directory, by no clause of `docs/specs/storeroom-constraints/` (searched:
`kernel-surface.md`, `fail-surface.md`, `parameter-semantics.md`, `contract.md`, `attempt-lifecycle.md`), and
by no byte of `docs/pending.md`** — the spelling occurs nowhere in the corpus this pass read. Two resolutions
are open and BOTH are doc-side: **(a)** the name is a module-internal helper and `MF-6`'s searched set —
*"the module's own export set"* — is what must be tightened, since it currently reads the whole export set as
the surface's extent; or **(b)** the name IS a surface item and the extent figure `5 + 1 = 6` is short by one
at every site that prints it (`remove-member.md §5` item 2's four sites, `kernel-surface.md §1` item 2's
extent sentence, `parameter-semantics.md §1`'s `PAR-C-13` row, `docs/specs/storeroom-constraints/contract.md`'s
index region). **This pass takes no side and mints no seventh `K` id.**

**AND THE ONE THING THAT KEEPS THIS FROM BEING READ AS AN UN-HARDENED REGRESSION OF THIS CHANGE: the same
figure is printed by the PRECEDING unit's clause**, `kernel-surface.md §1` item 1, which declares that
*"the five items it exports are the five `§2.1` already declares, so the surface's extent and every census of
this part are UNMOVED by this row"* — so the extra export is **not minted by `K-6`'s landing** and its clause
predates this directory. **It is a doc/live drift the greens set surfaces, and it is reported to the
supervisor as such rather than as a defect of this unit.**

### F-2 — **THE SELF-VERIFICATION FINDING AGAINST THIS ARTIFACT** (not an assertion; a review finding by
construction)

**The brief's own rule: *"A self-verified greens set (authored by the same agent who implemented) is a review
finding."*** **The implementing agent and the authoring agent here are DIFFERENT ROLES — `role_blind_test_writer`
authored and ran this set and wrote no line of the implementation — but THEY ARE THE SAME SESSION AND THE
SAME PASS, and that is the whole of the mitigation.** **What is verifiable by a reader: the driver is a
tracked artifact at `bindings/js/greens/held-listener-identity-greens.mjs`, it is re-runnable with one
`node` command from the repository root, each cell carries its clause in the source, and its output prints
per-scenario counts.** **What is NOT verifiable from this document alone: that no expectation was authored
after seeing a result.** **THE REMEDY THIS PASS RECOMMENDS, and it is the supervisor's to take: an
independent pass re-runs the driver and diffs the per-scenario census against `§2`'s table.**

### §3.2 RECORDED AND NOT ASSERTED — two observations, each with the reason it is not a cell

1. **THE CONFLICT'S DIRECTION.** **BOTH directions were driven.** The **identity-keyed** direction — *"a
   caller who registers a function at a pair's address IS refused while the kernel's stub at the same address
   is NOT"* (`constraint-sites.md §5` item 2) — **is asserted at `HLI-11.2`/`.4` and PASSES.** The
   **`addConstraint`-at-a-listener's-address** direction — `contract.md §2.3` item 8's first sentence,
   *"A constraint/listener conflict arises AT `addConstraint` AT AN ADDRESS A LISTENER IS ALREADY REGISTERED
   AT — ONE DIRECTION, NOT TWO"* — **was driven and observed NOT to refuse: the `addConstraint` succeeded and
   both the listener's pair and the kernel's stood at that address.** **THIS CELL IS NOT ASSERTED, because the
   directory's own two clauses print opposite arrows:** `§2.3` item 8's first sentence puts the refusing act
   at `addConstraint`, while `§2.3` item 8's identity-keying clause and `constraint-sites.md §5` item 2 put it
   at the CALLER's registration; **the operative ruling text** (`P: docs/pending.md`, pass 8: *"Purge wins at
   listen — conflict is addConstraint-only"* · *"Move the test to register"* · *"Package-side TypeError — no
   new code"*) **is what the live matches**, and a blind set that took a side here would be taking one on the
   provenance of a clause rather than on its reading. **OWNER: the directory's author; the resolution is a
   dated clause at `contract.md §2.3` item 8 or at `constraint-sites.md §5` item 1, naming which of the two
   arrows governs.**
2. **THE PURGED PAIR'S SILENCE.** `listen-verb.md §5` item 3 **WITHDRAWS the assertability of the pair's
   store-standing and keeps ENFORCEMENT alone**: *"`no invocation`" is indistinguishable from "invoked a
   no-op"*. **`HLI-14` therefore asserts the ENFORCEMENT half (`HLI-14.4`/`.5`) and the entry's
   re-creation (`.6`), and asserts NOTHING about a body's invocation — exactly as that clause requires.**
   **AND ONE THING `HLI-14`'s DRIVE FIXES FOR A LATER PASS, recorded because it is the reason the purge is
   drivable at all under the per-handle identity: `listen(h, S)` purges THE HANDLE'S OWN entries, so an app's
   `listen` at a kernel-held address destroys the kernel's home entry ONLY when the app spells THE SAME
   handle — which `K-1`'s own return supplies.** **This set spells it so (`HLI-14.3`), and a drive that
   spelled a different handle would have driven nothing of `(F-3)`.**

### §3.3 A THIRD OBSERVATION, RECORDED AND DELIBERATELY NOT ASSERTED

**A WRITE THE REGISTERED CONSTRAINTS REFUSE ANSWERS A STORE STATUS THAT NO CLAUSE OF THIS DIRECTORY'S
INPUTS FIXES.** **Observed at `HLI-06.7`/`HLI-10.8`/`HLI-12.4` and at every other failing-pass drive in this
set: the package's own `write` verb throws `{status: 'FileCommitFailed', message: <the constraint's own
message>, log: [constraint-check, outcome{KC-3}]}` — while the KERNEL's own item for the SAME pass throws
`{status: 'KC-3', ...}` (`kernel-surface.md §2.1` item 3's failing arm), and `A120` (2) declares that no
caller-side status carries a `KC` token (`surface.md:1811` item 2, in the js corpus).** **The log half is
DECLARED and IS asserted (`HLI-10.9`–`.11`: the three-member form, `outcome.state = KC-3`, the
`constraint-check` entry's `state: null`); the STATUS half is NOT asserted, because no clause this pass read
names the store code a constraint-violating WRITE answers — `§8.1`'s `ConstraintListInvalid` is declared at
three instants and **none of them is a write** (`contract.md §8.1` #16's three-instants clause; its own drive
is the construction/load/registration validation), and the js corpus's own clause for a failed SAVE
(`surface.md:1629`, rank `#15`) is about the FILE tier's save act.** **OWNER: the directory's author (a
`PAR-HL` row or a dated clause naming the code at that arm), and until it lands no drive may assert it.**
**It is printed here so the next pass does not discover it as a mystery, and it is NOT counted as a FAIL: a
greens set may only fail a clause it can cite on the other side.**

---

## §4. WHAT THIS SET DID NOT DRIVE, AND WHY

1. **EVERY `OWED` SUBJECT OF `§10`.** `K-6` on a purged pair's stale handle (`§2.9` item 7 · `§10` item 4;
   `remove-member.md §4` item 5); what a caller who deletes then re-registers is told (`§2.1` item 8 ·
   `§10` item 5); `triggeringAddress`'s declared home (`§2.4` item 7 · `§10` item 6); `DD-53`'s stale-row
   disposition (`§10` item 7); the set-position key's implementation at `carriesConstraintAt`/`kernel.pairs`
   (`§10` item 10); `evaluate`'s `pair === undefined` skip (`§10` item 12). **A drive asserting any of these
   would assert what the contract declines to settle** (`remove-member.md §4` item 5's closing sentence:
   *"UNTIL IT LANDS, THE DRIVE ASSERTS THE ARMS OF `§4` ITEM 2 AND NOT A FOURTH"*).
2. **THE `UNSUPPORTED` MID-WINDOW MUTATION** (`contract.md §2.2` item 9; `P: docs/pending.md · (AA-6)`;
   `test-cases.md §5` item 1 (i)): *"mutating constraints or listeners FROM WITHIN OTHER CONSTRAINTS OR
   LISTENERS IS UNSUPPORTED BEHAVIOUR, and no clause owes a rule for what such a mutation does"*.
3. **THE DISCARD'S OWN `pending` OBSERVABLE, at the failed-write arm.** `trigger-and-pair.md §4` item 1 (ii)'s
   filter is reached by the pass, but **its result is not readable through any declared member on that arm**:
   the failed write THROWS and returns no record, so the `pending` member the discard writes is the
   kernel's own record, and the caller holds none. **The half that IS declared and IS driven is the arm's
   other observable — "zero bodies of that write's own set run" (`§4` item 3; `HLI-10.8`) — and the
   `releasePending` filter's positive observable is driven on the PASSING arm (`HLI-10.4`/`.5`), where the
   check-off's *"every occurrence of that identity gone"* IS readable off the held record.**
4. **THE PAIR'S STORE-STANDING AFTER A PURGE** (`listen-verb.md §5` item 3's withdrawal) — see `§3.2` item 2.
5. **ANY COST, ANY TIMING, ANY ORDER, AND THE `~32` MEMBER-FIGURE CELLS ACROSS `bindings/js/test/**`.** The
   scan `(AA-1)` accepts is a plan price (`implementation-plan.md §4` item 1); `triggered`/`pending`/
   `watched`/`constraints()` are compared as SETS and never as sequences (`DD-37`/`DD-22`; `test-cases.md
   §5` item 2); and the member-count constant at `bindings/js/test/a127-surface.test.mjs:99` is the TEST
   WRITER's act and not this set's (`contract.md §8` item 5: *"this pass names them and edits none"*).
6. **THE `APP` LAYER, WHICH IS `NONE`.** No assembled-layer green is claimed, and none is available
   (`implementation-plan.md §5` item 3).

---

**`run: 2026-10-18 — node bindings/js/greens/held-listener-identity-greens.mjs, three consecutive runs, IDENTICAL counts: 14 scenarios · 174 assertions · 173 PASS · 1 FAIL (HLI-13.1). Layer ENVELOPE/PURE; APP layer NONE. Every scenario was executed against the live tree with no implementation byte read by the authoring pass, and the two drive corrections this pass took are named at §2.1 with their expectations unmoved.`**
