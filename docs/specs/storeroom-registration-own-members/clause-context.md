# `clause-context` — the three clauses this unit lands as REQUIREMENT LISTS (`§1`, `§2`), and the `§1.9.3` section's content list (`§3`)

**WHAT THIS PART IS.** **The three prose/corpus clauses `PIN-5` and `PIN-6` bind, and the release section `PIN-9` binds — each as a REQUIRED-CONTENT list and a FORBIDDEN-CONTENT list, site by site, with nothing drafted.** **NO SENTENCE OF ANY OF THEM IS WRITTEN HERE, and this part is the one place a gate-3 author reads before writing one.** **The rule it applies throughout: an `RCA-8(g)` mark is APPEND-ONLY — every standing sentence remains, is read THROUGH the mark, and is neither deleted nor re-spelled** (`PIN-5`, `PIN-6`).

---

## §1 · THE TWO PROSE MARKS

### 1.1 `docs/guides/package-use.md:1094` — the guide's mark

**THE STANDING SENTENCE, NAMED SO THE MARK IS WRITTEN BESIDE THE RIGHT ONE.** **The paragraph at `:1094` opens by requiring `message` on the repair arm** (*"AND `message` IS REQUIRED ON THE REPAIR ARM, BECAUSE THE KERNEL READS IT FIRST"*), **declares the `message`-not-a-non-empty-string substitution at the write's instant**, **and then states the rule the fix converts.** **The three sub-sentences the mark must be able to sit beside, quoted at their bytes:**

- **`AT THE WRITE'S OWN EVALUATION — AT THAT INSTANT AND NO OTHER — THE KERNEL READS `message` AND `repair` AS OWN MEMBERS OF THE OBJECT YOUR FUNCTION RETURNED: a pair carried on a prototype is NOT SEEN there, and such a return answers the unrecognized sentence instead`** — **the one-instant scope, which the conversion makes FALSE as a scope and TRUE as a rule.**
- **`THIS IS THE ONLY SENTENCE IN THIS GUIDE THAT STATES THAT RULE, AND IT IS THE LANDING INSTANT'S: the registration act reads the same closed outcome at `bindings/js/src/entry/kernel-registration.mjs:330-332`, where an inherited `repair` IS seen and invoked, so ONE RETURNED SHAPE ANSWERS TWO DIFFERENT THINGS AT THE TWO INSTANTS … and that divergence is OWED to a code-bearing unit and is contradicted by no sentence here`** — **the divergence and its OWED standing, which the conversion CURES.**
- **`THE EXAMPLE BELOW ESCAPES THE QUESTION BY CONSTRUCTION: it returns ONE OBJECT LITERAL whose two members are own members, so both instants read it alike`** — **the example's own immunity, which stays TRUE and needs no mark.**

**REQUIRED CONTENT — the mark states, in its own dated words, and in this order, with nothing added:**

1. **That the registration instant's read of the closed outcome's `message` and `repair` was converted to the own-member rule at this unit's landing** — one dated sentence naming the conversion as the act.
2. **That the divergence the paragraph records is therefore CURED rather than owed** — the OWED sentence's own subject answered, without re-spelling it.
3. **That the rule the paragraph states holds at BOTH instants** — stated as a consequence of (1), and said of the OWN-MEMBER RULE and of nothing else.
4. **That the write's side is UNCHANGED, the substitution clause included** — a `message` present and not a non-empty string still keeps the repair readable and still answers the `unrecognized` sentence at the write, and this sentence is owed because a reader who takes the mark for a change at the write would be misled.

**FORBIDDEN CONTENT — each a gate-8 finding if it appears:**

- **a re-print of the arm set or of any arm of `PIN-3`'s table** (the mark names no arm, counts no member and prints no table);
- **any sentence that a TYPE narrows, that a type states the read, or that the declaration moved** (`PIN-5` (b)'s prohibition repeated at this site because a guide reader also reads the `.d.ts`);
- **any sentence that a refusal message moved, was re-spelled, gained or lost a member** — no status, no rank and no sentence of `src/error.rs` moved (`PIN-10`);
- **any sentence a reader could take as a NEW ARM, a fourth outcome arm or a new return shape**;
- **any re-print of a member census or of a record's member count**;
- **any `KC` token**;
- **any correction, correction-of-a-correction, or re-spelling of the paragraph's own citations** (`kernel-attempt.mjs:686-699`, `:690-696`, `kernel-registration.mjs:330-332`) — all three are PRE-CURE READINGS and two land on other subjects' prose at `HEAD` (`sites.md §3` row `15`; `Q-1`'s default applied at the prose site by `Q-6`'s default);
- **any sentence stating that the two instants' CREDIT RULES agree, or that the same status answers at both** (`PIN-4` (iv);
- **any sentence touching the clause's frame at `:1090` or any other clause of `§7.6`** (the section opens at `:1071`).

### 1.2 `bindings/js/index.d.ts:1587`-`:1591` — the declaration's mark

**THE STANDING CLAUSE, QUOTED AT ITS BYTES** (`[T]`, read at this pass): **`THE TYPE DECLARES THE SHAPE AND NEVER THE READ: at the write's own evaluation `message` and `repair` are read as OWN members, while at a registration instant the same closed outcome is read through the prototype chain (`kernel-registration.mjs:377`-`:380`) — ONE RETURNED SHAPE ANSWERING TWO DIFFERENT THINGS AT THE TWO INSTANTS, which is `D-35`'s recorded defect and is OWED to a code-bearing unit, and nothing here is read as symmetric.`**

**REQUIRED CONTENT — the same four facts as `§1.1`, in the docblock's own register:**

1. **The registration instant's read was converted to the own-member rule at this unit's landing** (dated).
2. **The clause's *"ONE RETURNED SHAPE ANSWERING TWO DIFFERENT THINGS"* reading is CURED rather than owed.**
3. **The type still DECLARES the shape and never the read** — the clause's own thesis, which the conversion confirms rather than amends.
4. **The members' classes are unmoved**: `message` is still not declared non-empty and `repair` is still declared no further than `function` — a reader must not take the mark for a narrowing or a widening.

**FORBIDDEN CONTENT — the four of `§1.1`'s first six, plus two of this site's own:**

- **a re-print of the arm set; a type claim; a message claim; a new-arm reading; a census; a `KC` token** (as `§1.1`);
- **any byte of a TYPE LINE**: `ConstraintOutcome` (`:1602`-`:1610`), `RegistrationRepairContext` (`:1572`-`:1574`) and `RepairOutcome` (`:1613`-`:1628`) are UNMOVED, `Constraint` stays `(context: unknown) => unknown`, and no alias, no member and no docblock elsewhere in the file moves (`sites.md §2`);
- **any re-point of the docblock's own two WRITE-side citations** (`:1578`'s `kernel-attempt.mjs:705`-`:727`, `:1584`'s `:718`-`:724`): **the fix falsifies neither, and `Q-6`'s default forbids the re-point.**

### 1.3 The landing, and why it is not a third clause

**`bindings/js/README.guide.md` IS A GENERATED LANDING AND CARRIES NO AUTHORED SENTENCE.** **`docs/guides/package-use.md` is the ONE AUTHORED HOME and `scripts/publish.sh`'s `assemble_guide` (`:167`-`:182`) copies it BYTE-FOR-BYTE to `bindings/js/README.guide.md`, refusing when the two differ** (`PIN-5` (c); `GUIDE_CANONICAL`/`GUIDE_LANDED` at `:119`-`:120`). **SO THE GUIDE'S MARK IS WRITTEN ONCE, AT THE CANONICAL SITE, AND THE LANDING IS THE STAGE'S OUTPUT** — **a hand edit of the landing is a gate-10 fail and no clause of this unit may describe it as an editable file.**

---

## §2 · THE CORPUS MARK — `docs/specs/storeroom-constraints/contract.md:361`-`:405`, sub-item `(viii)`

**THE CELL THE MARK CURES, NAMED BY ITS OWN SENTENCES SO THE MARK IS WRITTEN BESIDE THE RIGHT SUB-ITEM** (`[T]`, read at this pass): **its subject — *"ONE RETURNED SHAPE — the object a caller's constraint returns — ANSWERS TWO DIFFERENT THINGS at the registration instant and at the write's own evaluation"* (`:365`-`:367`) · its two measured divergences (`:376`-`:381`) · the 2026-10-30 mark that already reads it (`:381`) · its classification *"this site CONTRADICTS A CLOSURE … SO WHAT THIS CELL RECORDS IS A REGRESSION"* (`:384`-`:387`) · its ownership sentence (`:387`-`:389`) · its **POSITIVE REVISIT CONDITION** (`:390`-`:392`) · its bounds (`:394`-`:398`) · and *"NO CLAUSE OF THIS DIRECTORY MAY BE READ AS SETTLING IT"* (`:405`).**

**REQUIRED CONTENT — one dated mark, and this is the whole of it:**

1. **Its own date**, which is gate 3's landing date and not this pass's.
2. **That this unit's landing converted BOTH registration-instant reads — the outcome's `message`/`repair` and the result's `ok` — to the own-member rule.**
3. **That the cell's SUBJECT is therefore CURED rather than standing** — the state its own revisit condition named as its successor.
4. **That the cell's classification, its owner-by-shape sentence, its revisit event and its own bounds stand BYTE-FOR-BYTE and are read THROUGH the mark** — the append-only form's own closing sentence, owed at this site because the cell already carries one mark in that form.

**FORBIDDEN CONTENT — `PIN-6` (iii), and each is a gate-8 finding:**

- **any deletion and any re-spelling of a standing sentence of the cell** — *"appending, deleting nothing, moving no standing byte"* (`D-120` item 4);
- **a re-print of the reads' arms, or of any arm of `PIN-3`'s table**;
- **a re-print or re-derivation of the `D-35`/`D-36` classification** — the mark records a cure and adjudicates no closure;
- **a re-print of the cell's ownership sentence, its revisit event or its bounds**;
- **a second cell, a second `OWED` row, a second document or a second subject** (`D-86`'s narrowing);
- **any citation repair or range correction for the cell's own stale citations (`:371`, `:376`, its two code cites)** — pre-cure readings, read THROUGH the mark (`Q-1`'s default);
- **any byte of the `OWED` enumeration's own state sentence at `:400`-`:405`, and any byte of the file outside the sub-item** (`sites.md §2`).

---

## §3 · THE `§1.9.3` SECTION — `PIN-9`'s content list, and where it lands

**WHERE.** **Root `RELEASE-NOTES.md` is the ONE AUTHORED HOME; the section is added ABOVE the existing `## §1.9.2` heading at `:58`, and `bindings/js/RELEASE-NOTES.md` follows BY THE STAGING MECHANISM and never by a hand edit** (`scripts/publish.sh:122`-`:133`, `assemble_release_notes` at `:187`-`:202`; `sites.md §1.4` item 12).

**THE SHAPE THE FILE ALREADY USES, SO THE NEW SECTION IS INDISTINGUISHABLE IN FORM** (`[T]`, from `:58`-`:63`): **a `## §<version> · a PATCH — <the subject in one line>` heading, then one paragraph declaring THE VERSION, ITS CLASS and what it carries, then a numbered list with one behaviour per line, then a horizontal rule.**

**REQUIRED CONTENT — three limbs, and nothing else:**

1. **WHAT A CONSUMER SEES, one line each and all three owed:**
   - **the two instants now answer the same membership question** — the registration instant reads a returned outcome's `message`/`repair` and a repair's return's `ok` as OWN members, exactly as the write's evaluation does;
   - **an INHERITED member is refused at the registration** — a constraint whose `message`/`repair` the shape carries on a prototype no longer registers a repair the write then refuses to read, so the failure surfaces where the constraint is authored rather than at the first write;
   - **the WRITE's sentence is unchanged** — an inherited or outside-arm return still answers the kernel's `unrecognized` sentence at a write, and no refusal's text moves at either instant.
2. **WHAT DOES NOT MOVE, named in one sentence each: the twenty-status set** (no rank, no member) · **the fourteen instance members** · **the declared type set** (`ConstraintOutcome`, `RepairOutcome`, `RepairContext` and the registration instant's `RegistrationRepairContext` all as they stand) · **every refusal message** · **and the credit rules** — *"the registration instant's op-based credit and the write's op-free credit are TWO rules and this release does not unify them"* (`PIN-4`).
3. **THE FIGURE AND NO TAG: the release DESCRIBES `1.9.3`** — **and no sentence claims, asserts or denies a tag** (`D-57`'s operative reading at `RELEASE-NOTES.md:17` and `:23`: *"the cut-state is not a document's to state"*).

**FORBIDDEN CONTENT:**

- **a claim that a TYPE narrows, widens, or gains or loses a member**;
- **a claim that a refusal MESSAGE moved, was re-spelled or changed its arm**;
- **a re-print of the arm table** (`PIN-3`) — the section describes what a consumer sees and enumerates no arm;
- **any sentence presenting the credit rules as unified or the asymmetry as closed** (`PIN-4`; the `§8.3` `Q-1` is open and is not this release's);
- **any tag claim, in any tense** (`D-57`);
- **any figure this directory does not print** — no count of cells, no count of commits and no line number (`D-57`'s discipline and this corpus's one-home rule for figures);
- **the downstream's `VA-14`/`VA-15`** — not this repository's cells (`D-120` item 3);
- **a second version line**: `PUBLISH-NOTES-VERSION-LINE` stands exactly once, at `:19`, and the section repeats no figure that line carries (`scripts/publish.sh:270`-`:274` refuses a second marked line).

**AND WHAT THE SECTION DOES NOT DO, SAID SO IT IS NOT DISCOVERED LATER: it is not a changelog.** **It declares ONE behaviour and its non-movers, in the form every released section of this file uses, and every earlier section stands byte-for-byte above and below it.**

---

**TERMS: the clauses this part fixes (`4` = the guide's mark · the declaration's mark · the landing's rule · the corpus mark), the section's content list (`1`), the sentences this part drafts (`0`), the sites it opens beyond the five of `PIN-1` (`0`).**
