# `acceptance` — the JS test layer, its LAYER label, the round-trip property and the `HO-` handoff ledger

**KIND: `carrier`.** **This part holds RELOCATED SECTIONS of `docs/specs/storeroom-js/contract.md`'s own
text — its `§4` (`§4.1`–`§4.5`) — WHOLE**: **the relocated span keeps its `§`-number, its tables, its prose
and its authority citations unchanged**, and *a relocation is not a re-derivation — no claim gains or loses
an authority by moving* (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — the kind rule, and
§C.11.9 — the ordinary cross-reference clause | requirement]`). **A citation to it names THIS part's path
plus the `§`-number**, because *a bare `§n` across two documents is not an edge* (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`). **The relocation is SPAN-BY-SPAN
and BYTE-EXACT against the baseline, and the pass's own record enumerates the citation re-spellings it
required as a REQUIREMENT list, one line per re-spelled citation, old form → new form** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v), and its class (v-2) | requirement]`).

---

## §4. The acceptance layer — the runner, the pattern, and the LAYER label

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried at
`docs/specs/storeroom-js/acceptance.md` (`§1`–`§5` of this document, relocated WHOLE)**, the `carrier` part
this directory's map declares for it (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 |
requirement]`).

### §4.1 The runner and the pattern

1. **THE JS LAYER RUNS UNDER `node --test`.** **The suite uses `node:test` and `node:assert`; it drives the
   package through its CLAIMED ESM ENTRY POINT and never the `.node` addon directly** (`DD-18`).
   **A test that loads the addon itself is a finding: it would not drive the crossing, only the store.**
2. **THE RUST LAYER RUNS `cargo test` IN `bindings/js/`.** **The conversion core's per-class table is
   drivable there, because the crate declares the `rlib` half** (`package.md §4.1`; `DD-19`).
3. **THE SUITE'S OWN PATTERN, STATED SO IT IS CHECKABLE:** **one test per crossing row of `§1.2`/`§1.3`
   (the accepted form and each refused form), one test per verb's success shape, one test per code the
   surface can reach, one test per registry rule of `§2.4`, and one test per `HO-` row — the last asserting
   only that the package EXPOSES NO entry for that realm.**

4. **THE SUITE'S OWN FILE SET, NAMED SO NO CLOSURE-ARITHMETIC OF THIS DIRECTORY MOVES:** **the JS suite and
   the sibling crate's Rust tests live under `bindings/js/`, NOT under this spec directory and NOT under the
   store's `tests/**`** (`DD-19`) — **so the `test-cases` part of this directory is a derived INVENTORY and
   never the suite itself** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6 binding rule 1 |
   requirement]`).
5. **THE TOOLCHAIN THE RUNNER NEEDS IS ON THE DECLARED PROBE AND IS NOT RE-MEASURED HERE:** **Node
   `v24.20.0`, which ships `node --test`; and Rust `1.98.0` with an offline-capable `cargo` for the sibling
   crate's own leg** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-10`'s figure-with-its-site
   rule; docs/next-steps.md `L-4`'s probe as that record reads it | numeric or census claim]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), CLOSING THE RED SET'S CONTRACT
FINDINGS 1, 2, 3 AND 5 (`archive/gate3/storeroom-js-red-set.md` §5 items 1, 2, 3 and 5) AT THIS SECTION.**
`RCA-8(d)` ANNOTATE-BESIDE: **the items above stand byte-for-byte and the two numbered items BELOW this
clause are the as-filed `4` and `5`, still numbered `4` and `5` and moved by no byte; the numbered clauses
`6`–`9` are PURE INSERTIONS placed here, between item `3` and item `4`, so that NOTHING in the as-filed item
list is renumbered, re-ordered or split.** **They are the acceptance consequences of the four declarations
the same pass lands, and the numbering is deliberately NOT contiguous: the as-filed `1`–`5` keep their own
numbers and the insertions carry the numbers `6`–`9` beside them.**

**6. THE DRIVE FOR A LONE SURROGATE BELONGS TO THE JS LAYER, AND IT CANNOT BELONG TO THE RUST LAYER.** **A JS
`string` carrying a LONE SURROGATE (e.g. a string holding the single code unit `\uD800`) is not valid UTF-8,
so NO Rust `String` can carry it and NO Rust cell can even CONSTRUCT the input.** **The class is therefore
driven at the JS boundary ALONE — through the package's own claimed ESM entry — and its declared answer is
`crossing.md §1.2` row 1's: the whole value is refused `ValueNotAdmitted`, at the PACKAGE's own walk, BEFORE
any verb is called.** **A Rust-side cell that reports this class as driven is a FINDING, and a Rust-side cell
that silently drops the class from the table is a FINDING** (`crossing.md §1.2` row 1's lone-surrogate clause
and `§1.4` item 9; `archive/gate3/storeroom-js-red-set.md` §5 item 5)
(`[A3 docs/specs/storeroom-js/crossing.md §1.2 · §1.4 item 9 | requirement]`).

**7. THE ABSENT-VERSUS-`undefined` READING IS DRIVEN AT BOTH ARITIES AND AT BOTH MEMBERSHIPS.** **The rule is
declared ONCE at `docs/specs/storeroom-js/crossing.md §1.3`'s absent-versus-`undefined` clause, and this
layer DRIVES it: a VERB's trailing `tier` by the call's own ARITY (`a.read(address)`, `a.read(address, undefined)` and
`a.read(address, null)` are THREE states, and `a.read(address, undefined)` folds to the ABSENT row — the three
exemplars being re-spelled 2026-10-16 to the METHOD form, the receiver being the store and no position being an
instance), and a `cfg` key by
`in`-MEMBERSHIP (`{filePath: undefined}` and an ABSENT `filePath` are TWO states, and the first answers
`AddressMalformed` while the second is IN DOMAIN).** **`ConstructionArgumentMissing` is told apart from
`AddressMalformed` by the ANSWER and not by the surface, because at the JS boundary an ABSENT key and a key
present carrying `undefined` are distinguishable ONLY by the `in`-test** (`archive/gate3/storeroom-js-red-set.md`
§5 item 4) (`[A3 docs/specs/storeroom-js/contract.md §1.3 — the absent-versus-`undefined` rule; `DD-46`;
`PAR-JS-3` | requirement]`).

**⟶ ADJUDICATED 2026-10-16, IN-WRITING, BECAUSE TWO DOCUMENTS OF THIS UNIT ANSWERED ONE CALL TWICE (`role_spec_writer`; `RCA-8(d)` ANNOTATE-BESIDE: the item above stands BYTE-FOR-BYTE and is read THROUGH this clause).** **THE CONFLICT, AT ITS TWO SITES: `parameter-semantics.md §2.6` (`PAR-JS-6`) lists `undefined` in its `the values OUTSIDE it` cell and answers `AddressMalformed` for it, while this item reads *"`a.read(address, undefined)` folds to the ABSENT row"*.** **THE READING IS ADJUDICATED AND NOT CHOSEN SILENTLY: `a.read(address, undefined)` IS A SUPPLIED VALUE AT THE `tier` POSITION, SO IT TAKES `PAR-JS-6`'s OUTSIDE-VALUE ANSWER AND THROWS THE STORE'S OWN `{status, message}` WITH `status` `AddressMalformed` — and the ONE FORM THAT FOLDS TO THE ABSENT ROW IS THE CALL THAT SUPPLIED NOTHING THERE, `a.read(address)`.** **THE REASON: `PAR-JS-6` is the OPERATIVE DECLARATION of this parameter's domain and of its outside values, and the `AddressMalformed` answer is the one `crossing.md §1.3`'s `TierArg` row 4 already carries; the acceptance layer is an inventory that DRIVES declared behaviour and declares none, so where the two answer one call differently the inventory is read through the parameter row and never the row through the inventory.** **AND WHAT THIS DOES NOT MOVE: the THREE STATES stand — the three calls remain three states and the ABSENT row is reached by ONE of them — and `crossing.md §1.3`'s absent-versus-`undefined` rule keeps its whole force, its *"folds"* clause being the COLLAPSED STATE the two calls share AT THE CARRIER and never a declaration that `undefined` carries the ABSENT answer, which is the reading `PAR-JS-6` and `PAR-JS-20`'s *"SUPPLIED WITH `undefined` … IS REFUSED"* law state at their own homes.** **AND THE DEFECT RAN GREEN BEFORE IT WAS FOUND: `bindings/js/test/surface.test.mjs` asserted `PAR-JS-6`'s answer PRE-CHANGE, so a drive of this item's as-filed reading and a drive of the row's answer are TWO cells and only one of them was ever green** (`parameter-semantics.md §2.6` and `§2.20`; `crossing.md §1.3`'s absent-versus-`undefined` rule and its `TierArg` row 4; `surface.md §2.5`'s single form).

**8. THE RUST LEG NAMES ITS MANIFEST EXPLICITLY, AND A LEG THAT RUNS THE WRONG PACKAGE IS VOID.** **The leg's
command is `cargo test --manifest-path bindings/js/Cargo.toml --no-fail-fast`, taken at the
REPOSITORY ROOT; the manifest is named explicitly so the resolution cannot become the root package's.** **A
reported figure whose executed-cell count belongs to the store's suite is VOID and must be re-taken, and a
figure reported without its site and its layer is VOID** (`package.md §4.2` item 4's dated clause;
`archive/gate3/storeroom-js-red-set.md` §3)
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-10`; `DD-19` | requirement]`).

**9. THE REGISTRATION SITE'S OWN DRIVE, AND THE TWO THROW SITES IT MUST SEPARATE.** **A drive reaches the
registry through `register(handle, listener)` — the ONE member of the object `storeCreate` returned
(`surface.md §2.4` item 5) — and NEVER through the module namespace, because `register` is not a named
export.** **A drive MUST distinguish the TWO throw sites: `§2.5`'s `{status, message}` for a VERB, and
`PAR-JS-12`'s JS `TypeError` for a REGISTRATION — AND THIS ITEM IS READ WITH ONE LATER ADDITION, 2026-10-15: `docs/specs/storeroom-js/surface.md` `§2.4` item 9 (b) declares a THIRD site, the ORDERING SEAM's `settle` refusal, whose `status` member is ABSENT and whose STRING `message` member is REQUIRED AND NOT FORBIDDEN, while ITS re-spelling of *"NO `message` member"* is read AT THAT SEAM AND NOT as a prohibition of THIS registration site's own refusal's message — and a `TypeError`
thrown by a VERB remains a FINDING.** **A drive that reads the registry through any spelling other than
that member is a FINDING** (`archive/gate3/storeroom-js-red-set.md` §5 item 1)
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-15`; A3 docs/specs/storeroom-js/surface.md §2.4
item 5; `PAR-JS-12` | requirement]`).

**⟶ ADDED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
*"Apply narrowed c"*: THE TRIO'S NARROWED LEG, DECLARED AT THIS SECTION'S RUNNER AND LAYER CELL, SO THE
DIRECTORY THAT OWNS THIS CRATE'S VALIDATION CARRIES IT AND NOT ONLY THE TRACKER.** `RCA-8(d)`
ANNOTATE-BESIDE: **every item above stands byte-for-byte and is not restated; THIS clause is a PURE
INSERTION, it adds no item, no `§`-number, no register row and no `DD` row, and it moves no figure.**

**THE LEG.** **THE TRIO NOW CARRIES ONE ADDED, NARROWED LEG, AND ITS COMMAND FOR THIS UNIT'S SIBLING
CRATE** — **the independent crate under `bindings/js/`, reached by naming its own manifest, and NEVER the
store's root package — IS:**

```
cargo clippy --manifest-path bindings/js/Cargo.toml --tests -- -D clippy::correctness
```

**taken at the REPOSITORY ROOT**, exactly as `§4.1` item 8 requires the sibling crate's own test leg to be
taken. **The manifest is named explicitly for the SAME reason that item states: so the resolution cannot
become the root package's, and so a reading of this leg's green is a reading of THIS crate and not of the
store's.** **A NON-ZERO EXIT FROM THIS COMMAND FAILS THE TRIO** — the leg is a gate and not a report. **THE
LEG'S DEFINITION AND ITS FIRST HOME ARE THE STORE'S: the trio, its two commands, the crate each addresses,
the failure rule and the narrowing's reason and measurement stand at
`docs/specs/storeroom-native/implementation-plan.md` `§8.5`'s dated clause of this date, which is the ONE
HOME of the trio's definition; this clause declares the sibling crate's half and points there rather than
restating it** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-10`'s figure-with-its-site rule
read onto the leg's own command | requirement]`).

**AND THE LAYER THIS LEG IS GREEN AT, RESTATED BECAUSE THIS SECTION OWNS THE LABEL.** **The leg's subject is
the TEST TARGETS of the sibling crate — a `cargo clippy --tests` invocation covers that crate's test targets
and the library they test, and nothing else** — **so its green is `ENVELOPE/PURE`-green and it claims no
`APP`-green**, exactly as `§4.2` items 1–3 declare of every figure of this unit. **`§4.2` item 3's rule is
UNMOVED by this clause and is read with it: NO `APP`-green may be claimed from a node test, and none from a
`cargo clippy` leg either.** **NO FIGURE IS PRINTED BY THIS CLAUSE, and the leg's own measured figures remain
the gate's to print with their site and their layer** (`§4.2`; `[A1
docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-10`; A3 docs/specs/storeroom-js/acceptance.md §4.2 |
numeric or census claim]`).

**AND ONE THING THIS CLAUSE EXPLICITLY DOES NOT DO, SO NOTHING OF THIS DIRECTORY MOVES WITH IT.** **It
re-labels no figure, re-measures no green, re-runs no leg, weakens no assertion of the red set, and leaves
`§4.1`'s pattern, `§4.3`'s round-trip property and `§4.4`'s red-set ownership exactly as printed.** **And it
adds NO leg of its own beyond the one command above: the store's half of the leg is the store directory's,
and its declaration stands at the home this clause names** (`[A1 | requirement]`).

**A NOTE FOR A FUTURE AUTHOR, RECORDED AS A NOTE AND NOT AS A RULE OF THIS CONTRACT: rustc IGNORES AN
`#[allow]` WRITTEN ON AN ITEM-POSITION `macro_rules!` INVOCATION.** **Probe-measured, rustc prints
`unused_attributes` — *"the built-in attribute `allow` will be ignored, since it's applied to the macro
invocation"* — and the lint fires anyway, because the lint level governing an expanded literal is the level
of the generated item's scope.** **So a TARGETED allow must travel THROUGH the macro: the store's own JSON
round-trip battery's `rt_case!` gained an asterisk-quantified attribute slot that forwards an allow onto the
cell it generates, and because `*` admits ZERO attributes every other cell expands byte-identically.** **This
is recorded because a later reader would otherwise re-derive it, and it obliges nothing of this directory: it
is not a leg, not a claim and not a rule of the contract.** **AND THE ALLOW'S OWN ADMISSIBILITY IS THE STORE'S
CLAUSE'S TO STATE, not this part's** (`[T: the rustc behaviour, recorded as a NOTE for a future author and
not as a rule of the contract | OBSERVATION]`).

**AND THE ITEM-3 PATTERN'S OWN CORRECTION, STATED SO THE TWO SITES ARE NOT CONFUSED:** **item 3 above's
*"one test per registry rule of `§2.4`"* now has a DRIVE, and its site is `surface.md §2.4` item 5's
`register(handle, listener)` — reached through an instance and never through the module namespace.** **No
clause of item 3 moves: the pattern is met, not widened** (`[A1
docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-17`; A3 docs/specs/storeroom-js/surface.md §2.4 item 5 |
requirement]`).

**⟶ AND THE `§4.1` NUMBERING DISCLOSURE, LANDED 2026-10-11 BY THE BOUNDED DIVERGENCE SWEEP (`role_spec_writer`)
BECAUSE THE TWO HOMES OF THIS RELOCATED SPAN DISAGREE ABOUT THEIR OWN NUMBERING.** `RCA-8(d)`
ANNOTATE-BESIDE: **the clause above and every item above stand byte-for-byte; THIS clause ADDS NO ITEM, and
no item's number, order or text moves.** **THE DEFECT IT DISPOSES OF, NAMED AT BOTH HOMES: THIS part's `§4.1`
prints its items `1` · `2` · `3` · `4` · `5` — **with the inserted clauses `6`–`9` standing BESIDE them as the
clause above states** — while the contract document's own `§4.1` — the HOME of this text, which its `§4`
authority note declares a relocation of `acceptance.md`'s `§4` WHOLE — prints `1` · `4` · `5` and NOTHING
ELSE, so items `2` and `3` are ABSENT there and `4`–`5` are printed as if contiguous.** **THE DISPOSITION:
this part is NOT at fault, NO byte of its numbering moves, and the fault is the home's `§4.1` item list,
which dropped two as-filed items and renumbered the rest without a disclosure while the disclosure was
written here.** **THE NAMED REPAIR OF A LATER BOUNDED PASS: renumber the contract document's `§4.1` item list
to its own declared `1`–`9` — item `1`, the as-filed `2` and `3` RESTORED (because a contiguous `1`–`9`
cannot be printed while two of them are absent), the as-filed `4` and `5` at their own places and the
insertions `6`–`9` where this part places them — with a dated disclosure beside the renumbered list so `git
diff` still recovers every pre-pass byte.** **UNTIL THAT PASS LANDS, a reader of either home reads the two
lists through this clause** (`[A1 | ordering claim]`).

**⟶ AND THE HOME'S OWN TWIN DISCLOSURE IS LANDED, 2026-10-11, BY THE BOUNDED CLOSE-OUT PASS
(`role_spec_writer`), SO THIS CLAUSE'S *"UNTIL THAT PASS LANDS"* NOW NAMES A SITE RATHER THAN AN OWED ONE.**
`RCA-8(d)` ANNOTATE-BESIDE: **every byte above stands; THIS clause adds no item and moves no number.** **The
contract document's `§4.1` now carries a dated item `6` that states the same two facts from the home's side:
the home prints `1` · `4` · `5`, THIS part prints `1`–`5` with `6`–`9` beside them, the home is the faulty
site, and the exact repair — RESTORE the home's items `2` and `3` from this part's own bytes (this part's
item `2`, *"THE RUST LAYER RUNS `cargo test` IN `bindings/js/`"*, and its item `3`, the suite's own pattern),
then print the list contiguously as `1`–`9` with the as-filed `4` and `5` at their own places and the
insertions `6`–`9` where this part places them, WITH A DATED DISCLOSURE BESIDE THE RENUMBERED LIST — is named
there as a later bounded pass's work and NOT taken in either home.** **SO A READER OF EITHER HOME NOW READS
THE TWO LISTS THROUGH TWO DATED CLAUSES THAT STATE THE SAME TWO FACTS, and neither home's numbering moves**
(`[A3 docs/specs/storeroom-js/contract.md §4.1 item 6 — this clause's home-side twin; A1 | ordering claim]`).

### §4.2 The LAYER label — and the rule no pass may break

1. **THIS UNIT'S JS-SIDE GREEN IS `ENVELOPE/PURE`, AND THE LABEL TRAVELS WITH EVERY FIGURE.**
   **Every reported figure names its SITE (the command and the directory it ran in) and its LAYER.**
   (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-10`; A1
   docs/specs/storeroom-js-proposal-review.md §5 — the layer discipline | numeric or census claim]`)
2. **THE ASSEMBLED/`APP` LAYER FOR THIS UNIT IS `NONE`.** **The unit delivers a LIBRARY — a sibling crate
   and a JS package — and exposes no rendered surface, no IPC and no MCP/UI tool surface; there is no
   assembled application to be green.**
3. **NO `APP`-GREEN MAY BE CLAIMED FROM A NODE TEST, AND NO `APP`-GREEN MAY BE CLAIMED FROM A `cargo test`
   EITHER.** **A node-suite green is `ENVELOPE/PURE`-green and never `APP`-green** (`DD-20`).
4. **THE STORE'S GREEN IS NOT RE-LABELLED AND NOT RE-MEASURED AS THIS UNIT'S.** **The store's suite is
   re-run, when it is re-run at all, as a NON-REGRESSION RECORD; the figure reported for it is the one the
   artifact that carries it prints, and the as-filed figures the gate-1 record names are marked HISTORICAL
   at their own sites** (`DD-31`, `DD-33`).

### §4.3 The round-trip property — the architect's directive, in JS terms

**THE DIRECTIVE'S OWN WORDS: *"passing in various JSON … expect exact match in all cases"*** (`A39`'s
neighbourhood; the store's `e2e_json_round_trip` battery is the Rust half). **THE PROPERTY THIS UNIT'S JS
LAYER ASSERTS, STATED IN THE JS-SIDE EQUALITY TERMS OF `crossing.md §1.5`:**
**for every value `v` in the layer's corpus, `a.read(address)` after
`a.write(address, tier, v, commit?)` — `a` being the object `storeCreate(cfg)` returned, THE RECEIVER, and not a position — must be EQUAL to `v` UNDER THE RELATION OF `crossing.md §1.5` —
member-SET equality for objects, array index order significant, and `Object.is` where sign or `NaN` matters.**
**⟶ `RCA-8(g)` MOVE-OUT, PERFORMED 2026-10-16: THE MODULE-FORM PROPERTY LINE AND ITS 2026-10-16 RE-SPELLING CLAUSE — which printed this property as *"the declared signature"* with `read(instance, address)` after `write(instance, address, tier, v, commit?)` — HAVE LEFT THIS FILE and stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §21`, whose source path and `§` are named there; the property, its relation (`crossing.md §1.5`'s), its corpus and its TWO exclusions are UNMOVED, and only the CALL SHAPE it is stated over moves.** **AND `contract.md §4.3` — this section's own relocation — carries the method form with it and re-emits no byte of the moved regions** (`RCA-8(g)`; `docs/decisions.md` · `A127`, 2026-10-16).

**⟶ `A127` CLAUSE, AUTHORED 2026-10-16 AT THIS SECTION (`role_spec_writer`; `A: docs/decisions.md` · `A127`, 2026-10-16, `ACTIVE`, read with `A128`; `RCA-8(g)`) — THE ROUND-TRIP PROPERTY'S DECLARED SHAPE, ITS RECEIVER RULE AND ITS REFUSAL SEMANTICS, WITH EVERY FIGURE IT STATES RESOLVING TO A HOME THAT EXISTS.** **THE DECLARED SHAPE IS THE METHOD FORM AND NOTHING ELSE:** `a.read(address, tier?)` and `a.write(address, tier, value, commit?)`, EACH CALLED ON `a` — the object `storeCreate(cfg)` returned — whose `tier` is REQUIRED and SINGULAR on `write` and ZERO TO MANY on `read`, whose `commit` is the OPTIONAL position `4` DECLARED LAST, and whose `value` is the value under test; **the corpus, the relation and the TWO exclusions are declared above at this section's own bytes and are not restated here.**
1. **THE RECEIVER RULE.** **THE RECEIVER IS THE STORE: no position of either call is an instance, and the first position of each is `address`.** **The product's member set is TWELVE — `10 + 1 + 1 = 12` ✓ — declared at `docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s clause of this date; its state is held PRIVATELY and a drive reaches it through the declared members and through nothing else (`surface.md §2.1` (e) item 1); and the ONE-SPELLING RULE reaches every site of this directory, its NINE sites being listed with their FILE at `surface.md §2.4` item 3 and re-stated at `surface.md §2.9` item 1's clause of this date** (`A127`; `surface.md §2.1` (e) item 3).
2. **THE REFUSAL SEMANTICS THE ROUND TRIP INHERITS.** **A `read` or a `write` refused for an outside `address`, an outside `tier`, an outside `value` or an absent target answers the store's OWN thrown `{status, message}` — `surface.md §2.5`'s single form, a member of the store's closed `16`-member set — and the layer asserts NO package-side code and NO package-side message**; **the ONE exception at this property's own two verbs is named rather than left implicit: an `undefined` SUPPLIED at `write`'s position `4` is outside the domain and refused by `surface.md §2.2` clause 4's declared arity reading, which is the only arity reading this surface declares** — **and the drive this section's property declares supplies NO fourth argument, so the position is ABSENT, IN DOMAIN, and no default is fabricated for it.** **⟶ AND THE TWO ORDINALS OF THIS SENTENCE ARE CORRECTED `5 → 4` AT THIS CELL, 2026-10-21 (`role_spec_writer`; `RCA-8(g)`: the sentence's SUBSTANCE — the one exception, its clause, its domain reading and the drive's own absent supply — is UNMOVED): the position is `write`'s FOURTH, `a.write(address, tier, value, commit?)` at `surface.md §2.2`, and the drive still supplies no argument at it.** **A THIRD EXCLUSION, A SECOND FAILURE FORM AT A VERB, or a `TypeError` thrown by a VERB remains a FINDING** (`surface.md §2.4` item 9 (b)'s ordering-seam clause — the one site whose `status` member is ABSENT — stands at that seam and is not a verb's form); **and NO CODE IS MINTED by this clause** (`parameter-semantics.md` `PAR-JS-17`; `surface.md §2.5` items 1–4).
3. **WHAT THIS CLAUSE MOVES, AND WHAT IT DOES NOT.** **IT ADDS NO ROW TO ANY REGISTER, NO `§`-NUMBER, NO CODE AND NO EXCLUSION; the `PAR-JS` set's count is UNMOVED at `PAR-JS-1`…`PAR-JS-25`, whose ONE home is `parameter-semantics.md §1`'s clause of this date; the typed register keeps its `8` rows; and the `HO-` ledger keeps its `SEVEN` rows (`§4.5` below).** **Its one subject is the property's SHAPE, and that shape's superseded module-form bytes stand at `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md §21` and are re-emitted nowhere** (`RCA-8(g)`; `docs/specs/spec-scope-and-structure/contract.md §C.11.6`).

**AND THE SIX LIMBS OF THE PROVENANCE CHECK THIS CLAUSE OWES, READ AND STATED RATHER THAN INTENDED: (a) the moved bytes are GONE from this file's §4.3 — ✓; (b) the pointer resolves to `§21` of the archive named in it, a region that exists — ✓; (c) the archive's region count and footer read TWENTY-ONE at both its head clauses and its end — ✓; (d) the site the bytes actually stood at is this section's `§4.3`, its own property line and its own re-spelling clause — ✓; (e) every citation written or repaired by this clause was OPENED and confirmed to exist — ✓; and (f) each such target was opened and confirmed to SAY WHAT THIS CLAUSE CLAIMS IT SAYS — ✓: `surface.md §2.4` item 3 read at its rule sentence and its NINE-site file-spelled list, `surface.md §2.9` item 1's clause read at its list and its `9`, `surface.md §2.4` item 9 (f)'s clause read at its ten-method table and its `10 + 1 + 1 = 12`, `surface.md §2.1` (e) items 1 and 3 read at their own sentences, `parameter-semantics.md §1`'s clause read at its `PAR-JS-1`…`PAR-JS-25`, and `crossing.md §1.5` read as the equality relation this property names.**
**THE CORPUS AND THE TWO EXCLUSIONS, AND NOTHING ELSE:** **the corpus is `various JSON` — a string, a
boolean, a finite number, an empty object, an empty array, a nested object, a nested array, an object
holding an array holding an object, and a value carrying an integer-like key beside a non-integer-like one;
and TWO DECLARED EXCLUSIONS stand: (i) a `file`-tier `-0` is read back as `0` after a boot — the declared
file-image normalization, asserted by the STORE's battery and NOT by this layer (`DD-5`); and (ii) object
member ORDER is not compared, because the engine re-orders integer-like keys.** **`0` other exclusion is
declared, and a third exclusion is a finding**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-14`'s round-trip property; A3
docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 — **THE STORE UNIT'S OWN `P-IM-1`, NOT THIS UNIT'S REGISTER ROW: the re-mint of 2026-10-17 (`DEF-2026-10-16-S`) renamed THIS unit's eight ids to `P-SR-1`…`P-SR-8` and reaches no id of `docs/specs/storeroom-native/`, so this citation is UNMOVED AND UNTOUCHED** | requirement]`).

**⟶ AMENDED 2026-10-21 BY `A140`: EXCLUSION (i) IS READ AT THE PACKAGE BOUNDARY, NOT ONLY THE FILE TIER.** **A `-0` written at `mem`, `temp` or `file` reads back `0`, because the binding's conversion core normalizes it; the store's native `mem`/`temp` sign rule is unmoved, and the file tier's own normalization is still the store's. The exclusion count remains `2`, and a third is still a finding** (`A140`; `DD-5`).

**AND THE ONE THING THIS PROPERTY DOES NOT CLAIM, STATED SO THE LAYER'S HONESTY IS CHECKABLE:** **the
FILE-IMAGE CANONICAL NUMBER SPELLING IS OUTSIDE THIS UNIT'S ACCEPTANCE LAYER.** **`docs/specs/storeroom-native/contract.md
§7.2` item 7 (c) says no verb returns JSON text, so a JS test can reach the canonical image only by reading
`cfg.filePath` behind the package's back — which `DD-5` REFUSES.** **The rule is therefore asserted by the
STORE's own Rust battery against the file's bytes, and this unit cites it rather than re-proving it**
(`[A1 docs/specs/storeroom-js-proposal.md §9.1 · `K4` — the canonical spelling is observable only through the
`file` bytes; A3 docs/specs/storeroom-native/contract.md §7.2 item 7 | prohibition]`).

### §4.4 The red set — authored from this contract alone, run and reported BEFORE implementation

**THIS UNIT'S RED SET IS ITS OWN, LIVES IN `bindings/js/`, IS AUTHORED FROM THIS CONTRACT ALONE, AND IS RUN
AND ITS FAILING SET REPORTED BEFORE ANY IMPLEMENTATION** (`DD-19`). **The store's `tests/**` is re-run as a
non-regression record, never rewritten, and no assertion is weakened**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.2 item 3 — the red set's ownership; A1
docs/specs/storeroom-js/implementation-plan.md §2 — `Q2`'s own phase | requirement]`).

**AND THE REGISTER'S LAYER, NAMED SO THE EXECUTION IS CHECKABLE:** **the typed register's `8` rows (`§5.1`–`§5.8`)
are executed at the gate the plan's phase table names, each row printing its strategy id and its verdict,
with `un-run` a FAILURE** (`[A1 docs/specs/storeroom-js/implementation-plan.md §4 item 8 |
requirement]`).

### §4.5 The `HO-` handoff ledger

**SEVEN ROWS — `HO-1`…`HO-7` — each with the duty, its owner, and its positive revisit condition. NO
HANDOFF IS DISCHARGED AS A PATCH, and this unit dispatches no implementer into any consumer**
(`contract.md §9`; `package.md §2`; `DD-21`, `DD-41`)
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-7`; A1 docs/specs/storeroom-js-proposal.md §9 ·
A2 — *"integration into Provident-Electron will be delegated to that project's agents"* | requirement]`).

**AND THE LEDGER'S OWN ARITHMETIC, PRINTED WITH ITS TERMS: `7` rows = `6` unclaimed realms + `1` route —
`6 + 1 = 7` ✓ — and NO row is a bare `OWED`: each names an owner and a positive revisit condition**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-7` · `AR-12` | numeric or census claim]`).

---

**END OF THIS PART.** **It carries the contract's `§4` whole and declares nothing the contract does not
already carry: the `§`-numbers, the rules, the property and every authority citation are the contract
document's own** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a carrier introduces no
claim of its own | requirement]`).

**⟶ AND THE SWEEP RECORD THIS PART POINTS AT, ADDED 2026-10-11 BY THE BOUNDED DIVERGENCE SWEEP
(`role_spec_writer`).** `RCA-8(d)` ANNOTATE-BESIDE: **no clause above moves.** **The unit's divergence table —
every row's contract cell against the shipped build, with the side that must move and its reason — is the
contract document's own `SW-1` clause, printed in `docs/specs/storeroom-js/contract.md`'s register span**;
**the rows that touch THIS part are the RUST LEG's declaration against the command the tree prints, the
`ENVELOPE/PURE` label and the `APP`-layer `NONE` reading, and the RED SET's own two rows — the registration
site's still-`un-run` `S-REG` line after `§2.4` item 5 declared that site, and the declared forms that no JS
cell drives.** **Nothing in this part is widened by that clause: the acceptance layer's runner, its pattern,
its layer label and its round-trip property stand exactly as printed** (`[A1
docs/specs/storeroom-js/contract.md · the sweep clause | cross-reference]`).
