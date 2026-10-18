# RE-MEASURE OF THE `48`-CELL SET AT ITS OWN BYTES — `role_test_writer`, 2026-10-18

**THE SPEC PASS'S CLAIM**: `(S1) 30` + `(S2) 13` + `(S3) 5` = `48`, of which `46` red-or-moved and `2` UNMOVED.
**THIS TABLE RE-MEASURES EVERY LINE. WHERE IT DIFFERS, THE MEASUREMENT BELOW GOVERNS AND THE DIFFERENCE IS NAMED.**

Baseline before this pass (verified, exit 0 each):
`node --test test/*.test.mjs` 499/499/0 · `greens.mjs` 256/256/0 · `live-drive.mjs` 100/100/0 ·
`scenarios.mjs` cells=96 pass=90 fail=0 conflict=0 observed=6, all 12 PASS.

---

## (S1) — OWN-MEMBER-SET / OWN-KEY-COUNT ASSERTIONS (`30` claimed)

*(A)/(D) class: the census cell — subject is the member set; the figure moves `13 -> 12`.*

| # | File | Line | What stands there | Measured? |
|---|------|------|-------------------|-----------|
| 1 | test/a127-surface.test.mjs | 94 | `THE_TWELVE = [...THE_TEN,'register','settle','constraints']` — THIRTEEN names | ✓ |
| 2 | test/a127-surface.test.mjs | 190 | `a127_the_products_own_member_set_is_exactly_twelve`: `own.length === 13` | ✓ (spec said :196) |
| 3 | test/a127-surface.test.mjs | 202 | `deepEqual(own, THE_TWELVE.sort())` — same cell, second assertion | ✓ |
| 4 | test/a127-surface.test.mjs | 206 | `a127_each_of_the_twelve_members_is_an_own_callable` over `THE_TWELVE` | ✓ |
| 5 | test/a127-surface.test.mjs | 626 | `deepEqual(getOwnPropertyNames, THE_TWELVE)` in `a127_no_store_reaching_verb_throws...` | ✓ |
| 6 | test/constraints-publication.test.mjs | 197-198 | `TWELVE_MEMBERS`, thirteen entries | ✓ |
| 7 | test/constraints-publication.test.mjs | 331 | `deepEqual(own, TWELVE_MEMBERS)` | ✓ |
| 8 | test/constraints-publication.test.mjs | 507 | ditto | ✓ |
| 9 | test/constraints-publication.test.mjs | 539 | ditto | ✓ |
| 10 | test/constraints-publication.test.mjs | 558 | ditto | ✓ |
| 11 | test/constraints-publication.test.mjs | 880 | ditto | ✓ |
| 12 | test/constraints-publication.test.mjs | 910 | ditto | ✓ |
| 13 | test/constraints-publication.test.mjs | 993 | ditto | ✓ |
| 14 | test/constraints-publication.test.mjs | 1025 | ditto | ✓ |
| 15 | test/a126-constraint-methods.test.mjs | 62-64 | `TWELVE_MEMBERS`, thirteen entries | ✓ |
| 16 | test/a126-constraint-methods.test.mjs | 400 | `deepEqual(own, TWELVE_MEMBERS)` | ✓ |
| 17 | test/a126-constraint-methods.test.mjs | 530 | ditto | ✓ |
| 18 | test/a126-constraint-methods.test.mjs | 559 | ditto | ✓ |
| 19 | test/a126-constraint-methods.test.mjs | 608 | ditto | ✓ |
| 20 | test/a126-constraint-methods.test.mjs | 632 | ditto | ✓ |
| 21 | test/file-tier-save-properties.test.mjs | 850-855 | literal thirteen-name array | ✓ |
| 22 | test/file-tier-save.test.mjs | 1421 | literal thirteen-name array | ✓ |
| 23 | test/convenience.test.mjs | 1143 | literal thirteen-name array | ✓ |
| 24 | test/publish.test.mjs | 4235 | literal thirteen-name array | ✓ |
| 25 | test/publish.test.mjs | 4267 | literal thirteen-name array | ✓ |
| 26 | test/round-trip.test.mjs | 168 | `twelve.length === 13` | ✓ |
| 27 | greens/greens.mjs | 83-84 | `PRODUCT_MEMBERS` — thirteen names, **DEAD (no reader)** | ✓ |
| 28 | greens/greens.mjs | 300 | `JSG-01.9` thirteen-name expectation | ✓ |
| 29 | greens/live-drive.mjs | 190-191 | `LIVE-13.3` thirteen-name equality | ✓ |
| 30 | greens/live-drive.mjs | 1164 | `LIVE-13.23` thirteen-name regex | ✓ |
| 31 | greens/live-drive.mjs | 1270 | `LIVE-13.19` thirteen-name equality | ✓ |
| 32 | greens/file-tier-save/scenarios.mjs | 988 | `FTS-12.1` thirteen-name array | ✓ |

**MEASURED: `32` SITES.** The spec pass printed `30` with terms `2 constants + 2 cells in a127 + 8 in
constraints-publication + 5 in a126 + 4 single sites + 2 in publish = 23` in `test/**` plus `7` in
`greens/**`. **Its `greens` limb is wrong**: it named `greens.mjs:84` and `:300`, `live-drive.mjs:189-191`,
`:1161-1164`, `:1269-1270`, `scenarios.mjs:984` and `:988` as SEVEN and then counted `JSG-01.9`'s two
lines and `live-drive`'s three cells as three — the actual hits are `greens.mjs:83` (a constant) +
`greens.mjs:300` + `live-drive:190` + `:1164` + `:1270` + `scenarios:988` = `6` sites over `5` cells and
`1` dead constant, and **the spec's own `23 + 7 = 30` therefore under-counts `test/**` by one** (it
asserts `:626` as part of "`1`" inside `a127`'s `4`, which is right) and **over-counts `greens/**` by one**.
The pass's `34` was withdrawn at its own bytes for the same reason; what it replaced it with is still off by
two in opposite directions. **MEASURED TOTAL: `32`, not `30`.**

## (S2) — THE `settle` MEMBER'S OWN CELLS (`13` claimed)

*(A) class: the subject is the removed member.*

| # | File | Line | What stands there | Measured? |
|---|------|------|-------------------|-----------|
| 1 | test/a127-surface.test.mjs | 364-366 | `a127_settle_answers_undefined_for_an_object_carrying_pending` — calls `a.settle({pending:[]})` | ✓ |
| 2 | test/a127-surface.test.mjs | 598-605 | `a127_settle_over_an_absent_argument_throws...` — `a.settle()` + `typeof`/`length` preconditions | ✓ |
| 3 | test/a127-surface.test.mjs | 609-616 | `a127_settle_over_the_empty_object_throws...` — `a.settle({})` + preconditions | ✓ |
| 4 | test/a127-surface.test.mjs | 182 | `for (const name of ['register','settle','on','off'])` — namespace-absence row | ✓ **NOT IN THE SPEC'S LIST** |
| 5 | test/constraints-publication.test.mjs | 202 | `FOUR_MEMBERS = ['register','settle']` — the constant | ✓ |
| 6 | test/constraints-publication.test.mjs | 338 | `FOUR_MEMBERS.length === 2` — its assertion | ✓ |
| 7 | test/constraints-publication.test.mjs | 316 | `names.includes('settle') === false` — **UNMOVED** (namespace, not member) | ✓ |
| 8 | test/convenience.test.mjs | 1155-1159 | `typeof inst.settle === 'function'` | ✓ (spec said :1155-1165) |
| 9 | test/convenience.test.mjs | 1160-1162 | `inst.settle.length === 1` | ✓ same cell |
| 10 | test/convenience.test.mjs | 1163-1167 | the descriptor/enumerability assertion | ✓ same cell |
| 11 | test/constraint-kernel-deltamodel.test.mjs | 1268 | `store.settle(orphan)` route (i) adoption | ✓ |
| 12 | test/constraint-kernel-deltamodel.test.mjs | 1302 | `store.settle(orphan)` route (i) delivery | ✓ |
| 13 | test/publish.test.mjs | 657 | a STUB product declaring `settle(record)` | ✓ |
| 14 | test/publish-generators.test.mjs | 317 | a STUB product declaring `settle(record)` | ✓ |
| 15 | greens/greens.mjs | 1252-1253 | `JSG-14.1` — `typeof i14.settle === 'function'` | ✓ |
| 16 | greens/greens.mjs | 1254-1256 | `JSG-14.2` — **UNMOVED** (namespace) | ✓ |
| 17 | greens/greens.mjs | 1257-1258 | `JSG-14.3` — `settle.length === 1` | ✓ |
| 18 | greens/greens.mjs | 1259-1290 | `sRow`/`sRows` — the seven outside-value rows | ✓ |
| 19 | greens/greens.mjs | 1289 | the `Proxy` row | ✓ (inside `JSG-14.5`) |
| 20 | greens/greens.mjs | 1300-1303 | `JSG-14.5`'s assertion over `rProxy`/`rAbsentRow`/`rUndefRow` | ✓ |

**MEASURED: `20` SITES OVER `16` CELLS** (three of the `convenience` hits are one cell; `sRows` and the
`Proxy` row are one cell at `JSG-14.4`/`.5`). The spec pass printed `13` by *subtracting* the two UNMOVED
naming sites (`constraints-publication:316`, `JSG-14.2`) from a `15`-site enumeration — but its `15` omitted
`a127-surface:182` (the namespace-absence loop that names `settle`) and omitted `a127-surface`'s two
`length` preconditions being *part of* the cells at `:598`/`:609`, and **counted `JSG-14.4` and `JSG-14.5`
as three sites (`sRow`, the `Proxy` row) when they are two cells over `sRows`**.
**MEASURED: `16` cells, `2` of which are UNMOVED — `14` red-or-moved and `2` UNMOVED.**

## (S3) — THE BARE-WRITE PATH (`5` claimed)

*(B) class: the distinction is dead; every write enters the kernel.*

| # | File | Line | What stands there | Measured? |
|---|------|------|-------------------|-----------|
| 1 | greens/greens.mjs | 1344-1348 | `JSG-15.1` — the bare write's post-store-call instant, `bareCalls.length === 2` | ✓ |
| 2 | greens/greens.mjs | 1352-1353 | `JSG-15.2` — "the bare write WITHHOLDS NOTHING" | ✓ |
| 3 | greens/greens.mjs | 1462-1465 | `JSG-16.3` — the instrument control at an address no pair holds | ✓ |
| 4 | greens/live-drive.mjs | 283-287 | the bare verb's no-file-I/O control | ✓ |
| 5 | greens/file-tier-save/scenarios.mjs | 434-436 | `FTS-05.1` — a bare file-tier write performs NO save | ✓ |
| 6 | test/constraint-kernel-deltamodel.test.mjs | 1238-1380 | `ck_neg_dm_07` — **THE WHOLE CELL** drives two "bare write" routes and asserts the next bare write's window | ✓ **NOT IN THE SPEC'S LIST** |
| 7 | test/constraint-kernel-deltamodel.test.mjs | 1315 | `store.write(...,'the bare write after the abandoned adoption')` | ✓ |
| 8 | test/constraint-kernel-deltamodel.test.mjs | 1338 | `store.write(...,'the second bare write')` | ✓ |
| 9 | test/constraint-kernel-deltamodel.test.mjs | 1367 | `store.write(...,'the bare write after the refused commit')` | ✓ |

**MEASURED: `5` CELLS — the spec pass's `5` is CORRECT** — but its (S3) list is the five *greens* cells and
it **omits `ck_neg_dm_07` entirely**, which is `21` lines of comment plus `~140` lines of drive whose whole
subject is a "bare caller-made write" — *"COULD NOT BE MADE MEANINGFUL" once the distinction is dead unless
its subject is re-read*. It is counted here as **ONE cell** and appears at `48` in the spec's arithmetic
neither as red nor as moved. **THE SPEC PASS'S `(S3)` IS A `greens/**`-ONLY SEARCH**; the bare-write class
also exists in `test/**` and the spec's searched-set sentence says it searched both trees.

---

## MEASURED TOTAL AND THE ARITHMETIC

| Set | Spec pass claimed | MEASURED | Difference |
|-----|-------------------|----------|------------|
| (S1) member-set constants + asserting cells | 30 | **32** | +2 |
| (S2) `settle` member cells | 13 | **16** (`14` moved/red + `2` UNMOVED) | +3 |
| (S3) bare-write path cells | 5 | **6** (`5` greens + `1` suite cell `ck_neg_dm_07`) | +1 |
| **TOTAL** | **48** | **54** | **+6** |

`32 + 16 + 6 = 54` ✓. Unmoved: `2` → `52` red-or-moved and `2` UNMOVED, `52 + 2 = 54` ✓.

**THE `48` IS WITHDRAWN AT ITS OWN BYTES. THE TRUE SET IS `54`.** The six additional sites are named above
by number; none is a cell the spec pass marked unmoved and none is a sweep.

---

# SPEC-CONFLICT ESCAPE — ONE CLEAR, UNRESOLVABLE CONFLICT, RETURNED TO THE SUPERVISOR

**Filed by `role_test_writer`, 2026-10-18. NOT resolved here and NOT papered over.**

## The two clauses, each at its own bytes

**`surface.md §2.11` clause 2 (unamended, 2026-10-15, still operative):**
> *"ON THE PASSING ARM … AND FOR A RECORD WHOSE OWN `op` CARRIES A `file`-TIER WRITE, THE TERMINAL ARM
> PERFORMS THE STORE'S `commit_file` ACT AS ITS OWN STEP … A WRITE THAT DID NOT REACH THE PASSING ARM PERFORMS
> NO SAVE"*

**`surface.md §2.12` item 1's amended clause (2026-10-18), item `2` (ii):**
> *"AN INSTANCE THAT CARRIES NO PAIR AT THE ADDRESS STILL ENTERS THE KERNEL … the kernel's pass over an address
> with no registered pair evaluates NOTHING **and PASSES**, so the write proceeds to the terminal arm's delivery
> exactly as `§2.7` items 6–7 declare"*

## The contradiction, measured

A four-position `file`-tier write at an address carrying **no** constraint pair:
- reaches `K-2` under `§2.12` item 1 (gate removed), and its attempt **PASSES** (nothing to evaluate);
- therefore *"reached the passing arm"* is **TRUE** of it under `§2.11` clause 2's own test;
- therefore `§2.11` clause 2 **requires** the terminal arm to perform `commit_file`;
- and the observable is a **written file**.

**MEASURED at the current tree:** a fresh `storeCreate({filePath, journalLength: 8, listeners: []})` leaves a
**0-byte** image; after `s.write(['a'],'file',1)` the image is **`{"a":1}`, 7 bytes**. The save fires.

**THE SPEC ITSELF SAYS BOTH THINGS.** `§2.12` item 1 itemizes `FTS-05.1` into the (S3) set as *"a DUTY TO
RE-DERIVE and NOT A DEFECT: … the COUNT each asserts is preserved"* — but `FTS-05.1`'s subject is **not a
count**: it asserts *"the file keeps the construction's zero-byte image"*, i.e. the save's **absence**. So the
(S3) instruction is inapplicable to that cell by its own words.

## Why a test writer cannot close it

Two declarations are each explicit and they cannot both hold for this state. Closing it requires ONE of:
1. an amendment to `§2.11` clause 2 narrowing *"passing arm"* to exclude an attempt that evaluated no pair, or
2. an amendment to `§2.12` item 1 stating that a gate-less write reaches `K-2` but its attempt is not `§2.11`'s
   *"passing arm"* for the save's purposes, or
3. a ruling that the save now fires on every `file`-tier four-position write, with `§2.11` clause 2 re-spelled
   and `FTS-05.1` + `LIVE-4.8` + `S-ARG5`'s image limb re-derived to the new truth.

**MOST LIKELY THE ARCHITECT RULED ON THE DELIVERY AND NOT ON THE SAVE.** The three rulings are about *whether a
write reaches the kernel* and *who carries delivery*; **none of them mentions `commit_file`**, and `§2.11`
clause 2's own subject — the `file`-tier save's arm — is untouched by all three. **THE PROBABLE READING IS THAT
`§2.12` item 1 needs the same narrowing `§2.7` item 8 received:** a *"passing arm"* for the save's purposes is
an attempt the pass **evaluated** something over, and an attempt that evaluated nothing is `§2.11` clause 2's
*"did not reach the passing arm"*. **BUT THAT SENTENCE IS NOT IN THE CORPUS, SO IT IS NOT LAW AND I HAVE NOT
WRITTEN A TEST TO IT.**

**THREE CELLS STAND RED ON THIS ONE CAUSE, EACH MEASURED:** `greens/file-tier-save/scenarios.mjs`'s
`FTS-05.1` (RED: `image="{\"a\":1}"`) · `greens/live-drive.mjs`'s `LIVE-4.8` (RED) ·
`test/file-tier-save.test.mjs`'s `fts_S_ARG5_an_absent_fifth_argument_opens_or_joins_its_commit_and_the_write_
proceeds` (RED on its image limb: expected `''`, read `'{"arg5-absent-…":"absent-carried"}'`).
**NO FOURTH CELL IS NAMED: a claim that `LIVE-13.8` asserted the same image was CHECKED AND IS FALSE — no such
cell exists in `greens/live-drive.mjs` — so it is withdrawn here rather than left standing.** **NO CELL WAS
DELETED AND NO EXPECTATION WEAKENED ON ANY OF THE THREE.**

---

# THE FOUR RUNS, BEFORE → AFTER (`role_test_writer`, 2026-10-18)

| Instrument | BASELINE (supervisor-verified) | AFTER | Exit before → after |
|---|---|---|---|
| `node --test test/*.test.mjs` | `499` / `499` / `0` | `499` / `468` / **`31`** | `0 → 1` |
| `node greens/greens.mjs` | `256` / `256` / `0` | `256` / `256` / **`0`** | `0 → 0` |
| `node greens/live-drive.mjs` | `100` / `100` / `0` | `100` / `99` / **`1`** | `0 → 1` |
| `node greens/file-tier-save/scenarios.mjs` | cells `96` pass `90` fail `0` obs `6` | cells `96` pass `89` fail **`1`** obs `6` | `0 → 1` |

**CELL COUNT PRESERVED AT `499` IN THE SUITE AND `256`/`100`/`96` IN THE GREENS — NOTHING DELETED.**

## The `31` suite reds — NONE IN A FILE THIS PASS TOUCHED

All `31` stand in `constraint-kernel-{states,repairop,rollback,properties,negatives,test}.test.mjs`,
`file-tier-save.test.mjs`'s `S-ARG5` image limb and `ordering.test.mjs`'s `ord_` cell — **every one of them
driven by `bindings/js/index.mjs`'s and `bindings/js/src/constraint-kernel.mjs`'s in-flight rewrite**, which
this pass may not edit. Their shared signature is the store's `KC-8` floor reading `KC-4`
(`actual 'KC-4' / expected 'KC-8'`) plus the image limb of the conflict below. **THEY ARE THE IMPLEMENTATION
BEING IN FLIGHT AND ARE REPORTED AS SUCH, NOT RE-DERIVED AGAINST.**

## The `1` live-drive red and the `1` scenarios red — ONE CAUSE, THE CONFLICT ABOVE

`LIVE-4.8` and `FTS-05.1` both assert `§2.11` clause 2's save ABSENCE; both are red because the uniform path
now performs the save. **Same cause, and it is the SPEC-CONFLICT ESCAPE filed above — not a re-derivation
failure and not a weakened cell.**

## THE `LAYER` / `APP_LAYER` HOMES — CONFIRMED BYTE-IDENTICAL

`greens.mjs` was touched (its `PRODUCT_MEMBERS` constant and the `JSG-01.9` / `JSG-14` / `JSG-15` / `JSG-16.3`
cells). **THE THREE HOMES `test/register.test.mjs`'s `S-LAYER` CELL READS WERE `diff`ed AGAINST
`git show HEAD:bindings/js/greens/greens.mjs` AND ALL THREE ARE IDENTICAL:**
`const LAYER = 'ENVELOPE/PURE'` · `const APP_LAYER = 'NONE'` · `LAYER: ENVELOPE/PURE.   APP LAYER: NONE.`
**NO FALSE GREEN WAS MANUFACTURED.** `live-drive.mjs` and `scenarios.mjs` carry none of these lines.
