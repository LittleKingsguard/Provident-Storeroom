# STEP-0 ADOPTION DOSSIER — the receiver ruling of `U-STOREROOM-JS`, slug `storeroom-js-oop-0.3.0`

**Role.** `role_spec_writer`, the SETTLED-RULING LANDS OF 2026-10-16, whose entry condition is gate 1's PASSED verdict (`A127` amended, `A128`) and the architect's go-ahead. **READ-ONLY for every repo byte except this file, the unit's own directory `docs/specs/storeroom-js/**` and that directory's `backup/`.** **This pass authored this file and edited only the unit's own directory:** no tracker byte, no `docs/decisions.md` byte, no `bindings/js/**` byte, no `docs/skills/**` byte and **no byte under `../Provident-Electron/**`** was written. **Nothing was run** — no test, no install, no build, no typecheck, no publish, no version bump, no writing `git` command.

**A GATE-1 INPUT AND AN ENTRY CONDITION, NOT A CONTRACT.** **It pins no behaviour of its own** — no signature, no return shape and no fail-state is AUTHORED here; every behavioural statement this file makes is a CITATION of a clause of the unit's own contract files, named by path and `§`. **Its rows are ZERO because the unit adopts nothing, and the zero is argued at `§3` and nowhere else.**

**Layer discipline.** `[T]` = a claim about a text/contract/tracker/record, **read at its own bytes by this pass**. `[M]` = a measurement of a path. **No `APP` claim is made anywhere in this file** — nothing here asserts what the package does at runtime.

---

## 0. THE DOSSIER STATUS HEADER (the schema's fields, this unit's values)

- **Unit:** `U-STOREROOM-JS`.
- **The adoption this dossier records, named by its slug:** **`storeroom-js-oop-0.3.0`** — the receiver ruling the architect gave 2026-10-16 in the words *"Creating a store returns an interface object that contains the store data and has the surface functions as methods"* · *"Functions that do not require an existing store (ex. storeCreate) remain discrete"* · *"Store's state is held privately."* · *"Inconsistency - all store-modifying acts should operate by method, not function"*, recorded as the `ACTIVE` row `A127` in `docs/decisions.md`, with the version class fiatted by `A128`.
- **Produced:** 2026-10-16 — **AFTER gate 1's verdict of PASS**, in the SETTLED-RULING LANDS pass the architect authorised. Gate-1 record: `archive/reviews/2026-10-16-constraints-publication-gate1.md`.
- **Content hash:** **OWED** — **not computed by this pass**, because this pass runs no hashing command (no shell is granted to this role): the file's own as-authored size is recorded here as `OWED` and the discharge is a supervisor-visible debt, not a silent omission. **NO SNAPSHOT CLAIM IS MADE IN ITS PLACE.**
- **Rows:** **`0` adopted-identifier rows (cap `8`)** · **`0` open** · **`0` answered in an architect ruling — there is no row to answer.** **The zero is argued, not assumed: `§3`.**
- **Status:** **`ZERO-ROWS`** — **the zero-row form, with its written rationale at `§3`, and NO exemption from a non-empty list is claimed because no list exists.** **The fail-loud direction is respected: STEP 0 DID RUN, this dossier EXISTS, and the unit's own gate-1 record and proposal review are its entry conditions.**
- **Collision block:** **populated with `4` rows — `0` hits and `4` negative checks, each recorded with the corpus it actually searched** (`§2`). **The adjacent project's corpus `../Provident-Electron/**` is NAMED AS UNSWEPT and no reading of it is taken or claimed** (`§2.4`).

**THE ARITHMETIC, PRINTED WITH ITS TERMS: `0` adopted-identifier rows = `0` `defined` + `0` `undefined-until-answered`; `0 + 0 = 0` ✓. Open-semantics entries: `0` = `0` `OPEN` + `0` `OVERFLOW`; `0 + 0 = 0` ✓. Collision rows: `4` = `0` hits reconciled by row id + `4` negative checks recorded with their searched set; `0 + 4 = 4` ✓.**

---

## 1. THE ADOPTED IDENTIFIER ROWS

**THE TABLE IS EMPTY, AND EMPTINESS IS THE CLAIM THIS SECTION MAKES.** **There is no row to print, so the section prints the two things a reader needs in place of rows: what the enumeration source would have been, and why it supplies nothing.**

**THE ENUMERATION SOURCE, NAMED AND THEN CLOSED.** **A row exists where the unit adopts a CONTRACT IDENTIFIER FROM AN EXTERNALLY-SOURCED DECLARATION — an outside vocabulary, an outside signature, an outside prohibition.** **THIS UNIT'S DECLARED SURFACE IS NOT EXTERNALLY SOURCED: it is (i) the architect's own directive, recorded as `ACTIVE` rows in `docs/decisions.md`, and (ii) the unit's own contract files, authored in this repository.** **THE UNIT'S DECLARED SURFACE, NAMED CLAUSE BY CLAUSE SO THE NEGATIVE IS CHECKABLE:**
1. **The module namespace and the product's member set** — `docs/specs/storeroom-js/surface.md §2.9` item 1's `A127` clause of 2026-10-16 (**the ONE name `storeCreate`**) and `§2.1`'s `A127` clause of that date.
2. **The twelve own members and their arity, positions, answers and refusals** — `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `A127` clause of that date, whose table is the surface's ONE declaration of the ten methods.
3. **The construction call, its four `cfg` keys and the returned opaque** — `docs/specs/storeroom-js/contract.md §2.1` and `§2` (`storeCreate(cfg) -> Instance`).
4. **The parameter set of the crossing** — `docs/specs/storeroom-js/parameter-semantics.md §1`'s clause of 2026-10-16 (**`PAR-JS-1`…`PAR-JS-25`**, `23 + 2 = 25` ✓) with the rows `§2.1`–`§2.25` and the `VACATED` row `§2.23`.
5. **The store-side law every verb reaches** — `docs/specs/storeroom-native/contract.md` (the store's own contract, a separate unit's surface, cited by the store's `§7.1`, `§8.1` and `§8.2`).
**NOT ONE OF THE FIVE IS AN EXTERNALLY-SOURCED DECLARATION, AND NOT ONE IS MINED: each is in-project.**

---

## 2. THE COLLISION BLOCK — `4` NEGATIVE CHECKS, `0` HITS

**THE FORM.** Each row names the candidate prohibition/vocabulary set it checked, **the corpus the check actually searched**, and the result. **A hit is reconciled or relaxed EXPLICITLY; a negative check is RECORDED, and the record names the searched set so a later pass does not have to infer it from a byte diff.**

| # | The candidate set checked | The corpus this pass actually searched | The result, and what it rests on |
| --- | --- | --- | --- |
| `AC-1` | **The one-name namespace** — is there a clause anywhere in the unit that forbids the module namespace to carry ONE name, or that caps its size? | `docs/specs/storeroom-js/**` — every `§2.9`, `§2.1` and `§2.5` clause, read at its own bytes | **NO HIT: no clause of the unit declares a FLOOR on the namespace size. The declared figures were CEILINGS and counts (`8`, `9`, `11`) and each is superseded by `A127`'s `11 → 1` ✓** (`surface.md §2.9` item 1's `A127` clause). **AND ONE PROHIBITION STANDS UNRELAXED AND IS NOT HIT: *"no `exists()` verb, no `findAddress` shim, no binding-side resolver"*** (`surface.md §2.9` item 1) — **`A127` adds no name, so it neither relaxes nor reaches it.** |
| `AC-2` | **The receiver ruling against the unit's ONE-ROUTE rules** — does moving ten names to methods create a SECOND route to a subject the unit declares reachable one way? | `docs/specs/storeroom-js/**`, `§2.4` items 5–9 and `§2.12` items 1–4 in particular; `docs/decisions.md`'s `A122` row, read at its own bytes | **NO HIT, AND THE CHECK IS THE REASON TWO NAMES WERE MERGED RATHER THAN KEPT: `on(address, listener)` and `off(handle)` would each have been a SECOND SPELLING of a sequence the twelve-member product already declares through `listen`, `register` and `unlisten`, so both are MERGED AWAY and the unit is left with ONE spelling per subject** (`surface.md §2.4` item 9 (f)'s `A127` clause, items `2` and `3`). **`A122`'s seam is untouched: `settle` remains the kernel's one internal member and no consumer route to it is created** (`surface.md §2.4` item 9; `contract.md §5.0`'s clause of this date). |
| `AC-3` | **The PUBLISH-side prohibition** — does this unit's own text anywhere declare the RELEASE CLASS of `0.3.0`, its ground, or a semver delta? | `docs/specs/storeroom-js/**` — every byte this pass authored and every byte it read | **NO HIT, AND THE NEGATIVE IS DELIBERATE: no byte of `docs/specs/storeroom-js/**` declares the class or its ground. The class is fiatted at `docs/decisions.md`'s `A128` row and its HOME is `release.md §2.3`, a PUBLISH-pass cell, so nothing in this unit is a second home for it** (`surface.md §2.9`'s removal clause of this date, its final sentence). **AND THE REMOVAL ITSELF CARRIES THE MIGRATION MAP THE UNIT'S OWN READERS NEED: TEN PUBLISHED NAMES, NO DEPRECATION WINDOW, one map from each of the ten to its method spelling** (`surface.md §2.9`'s removal-versus-deprecation clause of this date; `A128`). |
| `AC-4` | **The store-side vocabulary collision** — does any of the ten names, or `register`/`settle`, collide with an identifier the STORE's own contract already owns, in a way that would make one spelling mean two things? | `docs/specs/storeroom-native/contract.md`'s declared surface, as cited by this unit (`§7.1`, `§8.1`, `§8.2`, `§5.2`) | **NO HIT: the ten names, `register` and `settle` are the PACKAGE's own vocabulary, and the store's own members are reached only through the verbs this package declares; the store's closed `16`-member code set is neither minted, reached nor widened by the ten methods' rule (ii)** (`surface.md §2.4` item 9 (f)'s `A127` clause; `surface.md §2.12` item 4's replacement clause of this date). |

### 2.4 The corpus that is NAMED AS UNSWEPT

**`../Provident-Electron/**` IS NOT SWEPT BY THIS PASS, AND THE NON-SWEEP IS RECORDED RATHER THAN LEFT TO INFERENCE.** **THE ADJACENT PROJECT IS THE UNIT'S SOLE ACTIVE CONSUMER (`A128`'s own ground), its prohibition corpus and its own specs were NOT read, and no `AC-` row above rests on any byte of it.** **A later pass that needs that corpus MUST TAKE ITS OWN READING AND ADD ITS OWN ROWS: the negative checks above are negatives about the corpora they NAME, and this file claims no more than that.**

---

## 3. THE ZERO-ROW RATIONALE — the adopted-identifier count is `0`, argued

**WHAT THE ZERO CLAIMS.** **This unit's declared surface is authored IN-PROJECT: the architect's directive, recorded as an `ACTIVE` row of `docs/decisions.md` (`A127`, with `A124` · `A125` · `A126` · `A128` about it) and transcribed at `§1`'s five clauses of this file, and the unit's own contract files.** **NOTHING IN THAT SURFACE IS AN EXTERNALLY-SOURCED CONTRACT IDENTIFIER, so there is no row for STEP 0 to enumerate: the vocabulary is supplied by the directive and by this repository's own parts.**

**THE TRIGGER SOURCES EXAMINED, EACH FOUND EMPTY.**
1. **No fork disposition exists for this unit** — no `SCH-*`/`SC-*` row names `U-STOREROOM-JS`: **the limb has no member.**
2. **No `A-d*` ADOPTION ruling lands this unit** — `A127` is a RECEIVER ruling about this project's own surface and its own two artifacts, not the adoption of an outside declaration; **the limb has no member.**
3. **No adopted contract of this unit exists**, so no amendment of an adopted contract can re-trigger the dossier: **the limb has no member.**
4. **The limb *"any other cited external source of a contract element"* is EMPTY**: the only outside artifacts any clause of this unit names are (i) the store's own contract `docs/specs/storeroom-native/contract.md`, which is **this repository's own text and a separate unit's surface, cited as a source of law and not adopted as a vocabulary**, and (ii) `../Provident-Electron/**`, **which is the unit's consumer and is UNSWEPT** (`§2.4`) — **neither is a source of a contract element, so neither triggers a row.**

**AND ONE OBLIGATION THE ZERO DOES NOT DISCHARGE, NAMED BECAUSE A SILENT ZERO IS REFUSED AND A ZERO MISREAD AS QUIET ASSENT IS WORSE: the receiver ruling's SUBJECTS were the ten names and the ten methods, and their operative declaration lives at `surface.md §2.4` item 9 (f)'s `A127` clause and `§2.1`'s `A127` clause — so THIS DOSSIER'S ZERO IS A STATEMENT ABOUT ADOPTION AND IS NO STATEMENT ABOUT THE CONTRACT. It pins no behaviour, relaxes no prohibition, moves no ledger count and answers no open question of the unit** (`docs/specs/storeroom-js/contract.md §5.0`'s zero-row rationale of this date — the TYPED register's own zero, a different instrument whose zero has its own ground).

**AND THE ONE THING THE ZERO DOES NOT COVER, STATED SO NO READER OVER-READS IT.** **The version class `MINOR`, its fiat and its sole-active-consumer ground are NOT this dossier's cell and NOT this pass's: they belong to the PUBLISH pass's `release.md §2.3`** (`surface.md §2.9`'s removal clause of this date, its final sentence; `A128`).

---

## 4. WHAT THIS DOSSIER IS NOT, AND WHAT IT OWES

**IT IS NOT A CONTRACT CLAUSE.** No byte of it pins a signature, a return shape, a state or a fail-state; every behavioural statement in it names the clause that pins it, by path and `§`.

**IT IS NOT A SECOND HOME.** Where it states a figure, the figure's ONE home is named: the namespace's `1` at `surface.md §2.9` item 1, the member set's `12` at `surface.md §2.4` item 9 (f), the parameter set's `25` at `parameter-semantics.md §1`, and the register's `8` at `contract.md §5.0`.

**IT OWES THREE THINGS, AND THEY ARE RECORDED RATHER THAN SILENTLY CARRIED.**
1. **Its own content hash** — `OWED` at `§0`, because this role runs no command.
2. **Its own line and byte counts** — `OWED` with the hash, on the same ground.
3. **The tracker-side closure of `DEF-2026-10-16-O`** — **NOT OWED BY THIS PASS BUT NAMED HERE AS OWED BY THE SUPERVISOR: the defect's two limbs are answered in this unit's own files (its live sentence at `surface.md §2.12` item 4 and its retired-spelling byte at the same section), and `docs/defects.md` lies OUTSIDE this pass's wall, so the row's own state is a tracker landing** (`surface.md §2.12` item 4's clause of this date).

---

## 5. THE AMENDMENTS ROW

| # | Date | The change | Its authority | Its effect on this file's counts |
| --- | --- | --- | --- | --- |
| — | — | **NO AMENDMENT HAS BEEN MADE TO THIS FILE SINCE IT WAS AUTHORED.** | — | — |

**THE ROW IS PRINTED EMPTY ON PURPOSE, SO THAT A LATER EDIT IS VISIBLE AS AN EDIT AND NOT AS ORIGINAL TEXT** (`docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v)`'s requirement-list discipline, applied here to this file's own history).

---

## 6. PROVENANCE

**THE RECORDS THIS FILE RESTS ON, EACH READ AT ITS OWN BYTES BY THIS PASS:**
1. **`docs/decisions.md`** — the `A127` and `A128` rows of 2026-10-16, and the `A122` · `A124` · `A125` · `A126` rows they read with.
2. **`archive/reviews/2026-10-16-constraints-publication-gate1.md`** — the gate-1 record: `§20`–`§24`, whose `§23` names the slug this file carries, the zero-row refusal and the fiat's two owed items.
3. **`docs/specs/storeroom-js-proposal-review.md`** — the reviewed proposal's verdict, this pass's entry condition.
4. **The unit's own files** — `contract.md`, `surface.md`, `parameter-semantics.md` and the parts beside them, each read at the clauses this file cites.

**AND THE CITATION THE FORM TAKES PRECEDENT FROM, NAMED SO THIS FILE'S SHAPE IS NOT A NEW INVENTION: the schema of `docs/specs/storeroom-js-adoption-dossier.md` and `docs/specs/storeroom-native-adoption-dossier.md`, with the ZERO-ROW precedent at the latter's `§3-bis`.**

(`[A2 docs/decisions.md` · `A127` · `A128` · `A126` · `A122`; A3 archive/reviews/2026-10-16-constraints-publication-gate1.md `§20`–`§24`; A3 docs/specs/storeroom-native-adoption-dossier.md `§3-bis` — the zero-row form cited as precedent | requirement]`).
