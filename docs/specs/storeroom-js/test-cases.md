## `test-cases` — a derived INVENTORY, and it contains NO executable tests

**It contains NO executable tests, and it writes none.** This part is a **derived INVENTORY** of the cases
the unit's contract **already pins**: every row below cites the `§n` that pins it, and **no row declares a
case, a label or a requirement the contract does not already carry** — a new declaration in this part is a
**gate-2 finding** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6 binding rule 1 and §C.11.6 —
the `view` kind and the first-line statement that binding rule requires | requirement]`). **The inventory is
DERIVED from `docs/specs/storeroom-js/contract.md` and its parts, and the CONTRACT'S TEXT IS THE AUTHORITY
FOR EVERY ROW; this part is not** — the case text lives at the cited `§n`, and this table is a pointer set
for a reader and for the TestWriter's own gate.

**KIND: `view`.** **It relocates nothing, derives everything, and adds no claim of its own.**

**AND THE INVENTORY'S OWN CENSUS, PRINTED WITH ITS TERMS AND CHECKED AGAINST ITS OWN LIST: the table's rows
are numbered `1`…`71`, so the inventory carries `71` rows — and the figure is read off the LAST ROW'S OWN
NUMBER and not off any grouping, because a grouping would be a second arithmetic. AND THE GROUPING IS
PRINTED BESIDE IT AS A READER'S AID AND NEVER AS AN EQUALITY: `13` rows over the crossing's value variants
(rows 1–13) · `14` rows over the carriers' accepted/refused forms and the two construction arguments (rows
14–27 — `14` rows, because the `AddressArg`, `TierArg`/`TierSetItem`, `OpIdArg`, the two construction arguments
and `ListenersArg`/`ListenerHandle` blocks are each represented by more than one row) · `11` rows over the
verbs, the returned records and the failure form (rows 28–38) · `7` rows over the handles, the registry,
delivery and the two file-behaviour readings (rows 39–45) · `1` row for the constraint pattern (row 46) ·
`8` rows over the package, the realm, the publish story and the ownership clause (rows 47–54) · `17` rows
over the acceptance layer, the register, the parameter set, the census regions, the findings, the closure
and the plan (rows 55–71) — **and the seven block figures sum as `13 + 14 + 11 + 7 + 1 + 8 + 17 = 71` ✓,
which is the row count the FIRST sentence prints.** **No row is a test; a row is a POINTER to the clause
that pins the case, and where a row names a number the number is the contract's own** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.7 — the entry-counted unit, applied to this part's own
table | numeric or census claim]`).

| # | The case, as the contract pins it | Its source, in the `path §n` form | The pinning citation it carries |
| --- | --- | --- | --- |
| 1 | **A `string` crosses in and out, and `''` is a legal value** | `docs/specs/storeroom-js/contract.md` §1.2 row 1 | §1.2's row 1; `docs/specs/storeroom-js/crossing.md` §1.2 — **read with that row's LONE-SURROGATE clause, whose drive belongs to the JS layer (2026-10-11)** |
| 2 | **A `boolean` crosses in and out** | §1.2 row 2 | §1.2's row 2 |
| 3 | **A finite `number` crosses in and out, fractional and integral alike, and both `0` and `-0` are admitted IN MEMORY** | §1.2 row 3 | §1.2's row 3; `docs/specs/storeroom-js/crossing.md` §1.5 clause 3 |
| 4 | **A plain object crosses in and out, INCLUDING a cross-realm plain object and `Object.create(null)`** | §1.2 row 4 and §1.4 item 4 | §1.4 item 4 (e); `docs/specs/storeroom-js/crossing.md` §1.4 |
| 5 | **A dense array crosses in and out, index order preserved** | §1.2 row 5 and §1.5 clause 2 | §1.5's clause 2 |
| 6 | **`null` is refused `ValueNotAdmitted` at any depth** | §1.2 row 6 | §1.2's row 6; `docs/specs/storeroom-native/contract.md` §1.4 |
| 7 | **An `{a: undefined}` member refuses the WHOLE value, and the key is never dropped** | §1.2 row 7 and §1.4 item 3 | §1.4's item 3 |
| 8 | **A function is refused** | §1.2 row 8 | §1.2's row 8 |
| 9 | **A symbol is refused, and a `Symbol`-KEYED own property refuses the whole value** | §1.2 row 9 and §1.4 item 1 | §1.4's item 1 |
| 10 | **A `bigint` is refused — which is why the store's out-of-bounds numeric refusal is a DEFENSE-IN-DEPTH rule with no JS-reachable instance** | §1.2 row 10 | §1.2's row 10; `docs/specs/storeroom-js-proposal.md` §8 · `A62` |
| 11 | **A non-finite number is refused** | §1.2 row 11 | §1.2's row 11 |
| 12 | **A cyclic value is refused, and an acyclic DIAMOND is NOT refused** | §1.2 row 12 and §1.4 item 6 | §1.4's item 6 |
| 13 | **A non-plain collection is refused — a `Map`, a `Set`, a typed array, a `Date`, a `RegExp`, a class instance, a `Proxy`, an object wrapper** | §1.2 row 13 and §1.4 item 4 (f)–(g) | §1.4's items 4 (f)/(g); `DD-34` |
| 14 | **An address is a JS array of segments; `''` is a legal key; `[]` resolves to the register** | §1.3 `AddressArg` rows 1–3; §2.2 | §1.3's `AddressArg` rows 1–3 |
| 15 | **`'a.b'` is NOT a delimited address and is refused as a SHAPE** | §1.3 `AddressArg` row 6 | §1.3's `AddressArg` row 6 |
| 16 | **A `Proxy` over an array is refused at the argument boundary** | §1.3 `AddressArg` row 12 | §1.3's `AddressArg` row 12; `DD-34` |
| 17 | **A cross-realm array IS accepted, and a sparse array is refused** | §1.3 `AddressArg` rows 13–14 | §1.3's `AddressArg` rows 13–14; `DD-8` |
| 18 | **`tier` on `read`/`readLiteral` accepts ABSENT, one token or an array, and an array is an ANY-MATCH set** | §1.3 `TierArg` rows 1–3; §2.2 | §1.3's `TierArg` rows 1–3; `DD-37` |
| 19 | **`tier` on `write` is REQUIRED and SINGULAR: absent → `AddressMalformed`, any array of any length → `OutOfDomainTier`** | §1.3 `TierArg` rows 2–3 | §1.3's `TierArg` rows 2–3; `docs/specs/storeroom-native/contract.md` §3.1.1 |
| 20 | **`tier` on `delete` is OPTIONAL and exactly one when present; a tier the target does not hold is a SUCCESS with `tiers: []`** | §1.3 `TierArg` rows 1–4; §2.2 | §1.3's `TierArg` rows 1–4; `docs/specs/storeroom-native/contract.md` §4.4 |
| 21 | **`null`/`undefined` for a `tier` answers `AddressMalformed` and a non-string/out-of-domain token answers `OutOfDomainTier`** | §1.3 `TierArg` rows 4–7 and `TierSetItem` rows 1–4 | §1.3's `TierArg` rows 4–7 and `TierSetItem` rows 1–4 |
| 22 | **An `opId` the journal does not hold answers `JournalOpUnknown`; a blank one answers `AddressMalformed`** | §1.3 `OpIdArg` rows 2–3 | §1.3's `OpIdArg` rows 2–3; `docs/specs/storeroom-native/contract.md` §6.4 `M-11` |
| 23 | **An ABSENT `filePath` is IN DOMAIN and creates the register at `mem`; an unreachable path answers `FilePathUnreachable` and creates nothing** | §1.3 `FilePathArg` rows 1–6; §3.2 | §1.3's `FilePathArg` rows 1–6 |
| 24 | **An ABSENT `journalLength` is the ONE absence the construction still refuses: `ConstructionArgumentMissing`** | §1.3 `JournalLengthArg` row 2 | §1.3's `JournalLengthArg` row 2; `docs/specs/storeroom-native/contract.md` §8.1 #12 |
| 25 | **Every other out-of-domain `journalLength` answers `AddressMalformed`, with NO coercion of a numeric string, a boolean or a `bigint`** | §1.3 `JournalLengthArg` rows 3–12 | §1.3's `JournalLengthArg` rows 3–12 |
| 26 | **`listeners[]` may be EMPTY; a DUPLICATE address is kept with both entries and both handles** | §1.3 `ListenersArg` rows 1–2; §2.1 | §1.3's `ListenersArg` row 1; `docs/specs/storeroom-native/parameter-semantics.md` §2.12 |
| 27 | **An ABSENT `listeners` answers `AddressMalformed` and no instance is returned** | §1.3 `ListenersArg` row 5 | §1.3's `ListenersArg` row 5 |
| 28 | **`storeCreate(cfg)` takes one plain object with the store's three keys and passes them through unmodified** | §2.1 | §2.1's `cfg` block; `DD-36` |
| 29 | **Every verb is SYNCHRONOUS and returns a FRESH JS value; the package performs no arity check, no defaulting and no validation of its own** | §2.2 | §2.2's closing paragraph; `DD-46` |
| 30 | **`read` on a leaf returns the stored literal; on a branch it returns the assembled value; on the empty address it returns the whole register** | §2.2; `docs/specs/storeroom-native/contract.md` §4.1 | §2.2's signature block |
| 31 | **`readLiteral` narrows the read to a leaf and answers `ReadTargetIsBranch` on a branch** | §2.2; §2.9 item 2 | §2.9's item 2; `docs/specs/storeroom-native/contract.md` §8.1 #8 |
| 32 | **`write` returns `{ op, watched, triggered }` and a failed write returns NOTHING** | §2.2 | §2.2's signature block; `docs/specs/storeroom-native/contract.md` §3.6 |
| 33 | **`delete` returns `{ address, tiers, triggered }`, with `address` VERBATIM and `tiers` in canonical order** | §2.2 and §6's `PAR-JS-16` | §2.2's signature block; `docs/specs/storeroom-native/contract.md` §4.4 |
| 34 | **A failure crosses as a THROWN plain object whose member set is EXACTLY `{status, message}` and whose prototype is the caller realm's `Object.prototype`** | §2.5 items 1–3 | §2.5's items 1–3; `DD-12` |
| 35 | **A code outside the store's closed set is passed through VERBATIM and re-mapped to nothing** | §2.5 item 1 | §2.5's item 1; `DD-40` |
| 36 | **NO discrimination rule is owed between a stored value and a failure record** | §2.5 item 4 | §2.5's item 4; `docs/specs/storeroom-js-proposal.md` §8 · `A64` |
| 37 | **ALL 15 fail codes remain reachable from JS, because a failed `read` IS the existence probe** | §2.9 item 2 | §2.9's item 2; `docs/specs/storeroom-js-proposal.md` §8 · `A63` |
| 38 | **The JS surface is exactly `8` verbs plus the returned records, and no `NodeRef` crosses** | §2.9 item 1 | §2.9's item 1 |
| 39 | **The handle's construction spelling is a plain `string`; a returned handle is OPAQUE and its token is unreadable from JS; `unlisten` accepts the opaque form only** | §2.3 items 1–2 | §2.3's items 1–2; `DD-14` |
| 40 | **`unlisten` over a foreign-instance, a prior-session, a fabricated, a blank or a non-opaque handle is a NO-OP SUCCESS that removes no other registration** | §2.3 item 4 | §2.3's item 4; `docs/specs/storeroom-native/parameter-semantics.md` §2.13 |
| 41 | **The prior-session hazard is DECLARED, not defended, and the package's documentation must say a handle must not cross a reload** | §2.3 item 3 (i) | §2.3's item 3; `docs/specs/storeroom-js-proposal.md` §13 · `A69`; `DD-28` |
| 42 | **The registry's four rules: an unregistered handle fires nothing silently; a second registration replaces the first; a lawful duplicate fires once per DISTINCT handle; `unlisten` withdraws the registration and never the function** | §2.4 items 1–4 | §2.4's four rules; `docs/specs/storeroom-js-proposal.md` §9.2 · `K9` — **read with §2.4 item 5, the registration site's declared spelling (2026-10-11)** |
| 43 | **A listener is invoked AFTER the verb has returned, synchronously, and NO ORDER is asserted — set membership only** | §2.7 items 1–3 | §2.7's items 1–3; `DD-22`; `docs/specs/storeroom-native/contract.md` §6.5 item 5 |
| 44 | **A throwing listener body is neither caught, retried nor reported, and it alters nothing the store did** | §2.7 item 4 | §2.7's item 4; `DD-23` |
| 45 | **A `delete` and a `rollback` perform NO file I/O, so a fresh boot over an equal path re-loads the last successful `file` WRITE's bytes** | §2.8 items 1–2 | §2.8's items 1–2; `DD-45`; `docs/specs/storeroom-native/contract.md` §7.2 item 5 |
| 46 | **The constraint/repair pattern is client-side: evaluate after a `write`, and reverse a violation with `rollback` over the op the write returned — no constraint verb, no function parameter** | §2.6 | §2.6's whole clause; `docs/specs/storeroom-js-proposal.md` §15 · `A73` |
| 47 | **The claimed realm is Node ESM ALONE, reached through one ESM entry, with the addon loaded internally and not documented as an entry point** | §3.1 and `docs/specs/storeroom-js/package.md` §1.1–§1.3 | §3.1's whole clause; `docs/specs/storeroom-js-proposal.md` §15 · `A70` |
| 48 | **The `7` `HO-` rows exist, each with an owner and a positive revisit condition, and NO handoff is discharged as a patch** | §3.2 and §9 | §3.2's table; §9's ledger; `DD-21`, `DD-41` |
| 49 | **The prebuild matrix is `5` targets, produced on a release tag, hosted as the registry's own per-target artefacts, and NO BINARY IS EVER COMMITTED to the tracked tree** | §3.3 items 1–3 | §3.3's items 1–3; `DD-25`, `DD-42` |
| 50 | **`AGPL-3.0` is the distribution's declared fact, declared at three named sites, and the licence file is not copied into the sibling crate** | §3.3 item 4 | §3.3's item 4; `DD-43` |
| 51 | **The sibling crate is an INDEPENDENT crate at `bindings/js/` with `crate-type = ["cdylib", "rlib"]` and ONE path dependency — never a workspace member** | §3.4 items 1–3 | §3.4's items 1–3; `docs/specs/storeroom-js-proposal.md` §11 · `A68` |
| 52 | **The `rlib` half is what makes the crossing's per-class table drivable in Rust WITHOUT a Node runtime** | §3.4 item 3 | §3.4's item 3; `docs/specs/storeroom-js-proposal-review.md` §5.2 item 4 |
| 53 | **One `Store` per instance, caller-owned: no `dispose()`, no `close()`, no finalizer, and nothing to flush** | §3.5 and §3.5's §5.1 items 1–3 | §3.5's whole clause; `docs/specs/storeroom-js-proposal.md` §15 · `A74` |
| 54 | **Two instances over one `cfg.filePath` are the caller's own declared hazard: each boots and the second's `file` write clobbers the first's bytes** | §3.5's hazard clause | §3.5's closing hazard paragraph; `docs/specs/storeroom-native/contract.md` §7.2 item 5–6 |
| 55 | **The JS layer runs under `node --test`, drives the CLAIMED ESM ENTRY and never the addon directly, and the Rust layer runs `cargo test` in `bindings/js/`** | §4.1 items 1–2 | §4.1's items 1–2; `DD-18`, `DD-19` — **read with `package.md` §4.2 item 4's dated clause, which names the manifest EXPLICITLY so the command cannot resolve the root (2026-10-11)** |
| 56 | **The suite's pattern: one test per crossing row, per verb success shape, per reachable code, per registry rule and per `HO-` row** | §4.1 item 3 | §4.1's item 3 |
| 57 | **The LAYER label: this unit's JS-side green is `ENVELOPE/PURE`, this unit's `APP` layer is `NONE`, and no node-green may be reported as an `APP`-green** | §4.2 items 1–4 | §4.2's items 1–4; `DD-20` |
| 58 | **The round-trip property: `read` after `write` is EQUAL to the written value under the declared relation, with exactly TWO declared exclusions and no third** | §4.3 | §4.3's whole clause; `docs/specs/storeroom-js-proposal-review.md` §5.4 · `AR-14` |
| 59 | **The canonical number spelling is OUTSIDE this unit's acceptance layer and is asserted by the STORE's own Rust battery** | §4.3's closing paragraph and `docs/specs/storeroom-js/crossing.md` §4 | §4.3's closing paragraph; `DD-5` |
| 60 | **The red set is authored from this contract alone, run, and its failing set reported BEFORE implementation; the store's `tests/**` is never rewritten** | §4.4 | §4.4's whole clause; `DD-19` |
| 61 | **The register's `8` rows are executed with every row printing its strategy id and verdict, `un-run` being a failure** | §4.4's closing paragraph and §5's census | §5's census paragraph; `docs/specs/storeroom-js/implementation-plan.md` §4 item 8 |
| 62 | **The register's `8` rows, their properties, their strategy ids and their failure lists** | §5.1–§5.8 | §5.1's `P-IM-1` · §5.2's `P-IM-2` · §5.3's `P-IM-3` · §5.4's `P-SM-4` · §5.5's `P-SM-5` · §5.6's `P-SM-6` · §5.7's `P-TP-7` · §5.8's `P-TP-8` — **the `8` and no ninth: `§0.2`'s `19` `P-TP-9` citations were reconciled to rows that exist by the pass of 2026-10-11** |
| 63 | **The parameter-semantics set is `18` rows, one per declared JS parameter, each with its domain, its outside values and a declared answer for each** | §6 and `docs/specs/storeroom-js/parameter-semantics.md` §2 | §6's index; `parameter-semantics.md` §2.1–§2.18 |
| 64 | **The `PAR-JS-12` exception: a non-function registration throws a JS-side `TypeError` carrying no `status` and no `message`, and it never reaches the store** | `docs/specs/storeroom-js/parameter-semantics.md` §2.12's exception clause | `parameter-semantics.md` §2.12's exception clause |
| 65 | **Every figure carries its site and its layer, and the store's green is quoted at the figure the artifact that carries it prints (`377`), with `374` and the other as-filed readings marked HISTORICAL** | §7.1 and §7.2 | §7.1's table; §7.2's `G-17` clause; `DD-33` |
| 66 | **`P-1`'s `28` rows are disposed of ROW BY ROW exactly once, with the `secure` row and `J-13`'s absence printed and the census marked non-re-derivable** | §7.3 | §7.3's table and its arithmetic; `docs/specs/storeroom-js-proposal-review.md` §5.4 · `AR-8` |
| 67 | **The five CONTRACT FINDINGS for the store's author exist and are reported, never patched inline** | §8 | §8's table and its closing paragraph |
| 68 | **This directory's closure predicate reads `6 = 6` and its state is `CLOSED`, with the `3` recorded omissions held to NEITHER side** | the index region's closure-state bullet and §0.1 item 10 | the closure-state bullet; §0.1's item 10 |
| 69 | **The design-defaults table's `47` rows, each authored row carrying a priced `alt` cell and a reversal cell naming an instrument and never a park** | §0.2 | §0.2's table and its census clause |
| 70 | **The plan's `Q0`–`Q9` phase table, its NOT-touched set, its stop conditions and its reconciled acceptance criterion** | `docs/specs/storeroom-js/implementation-plan.md` §1–§5 | the plan's own §1–§5, read with its dated reconciliation clause |
| 71 | **No unit row is admitted, no `DONE` row is re-opened and no ledger count moves: `docs/next-steps.md` stands `1 DONE / 2 open` UNITS = `3`** | the contract document's closing clause | the contract document's closing clause; `docs/specs/storeroom-js-proposal-review.md` §6 item 2 |

**AND THE INVENTORY'S OWN HONEST NOTE, PRINTED SO THE COUNT ABOVE IS NOT READ AS A CAP:** **this part
carries no cap, no budget and no census obligation — a `view` part's rows are pointers, and a name that
would carry nothing is omitted rather than written empty** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.6 and §C.3 — the kind rule and the omission rule |
requirement]`). **The TestWriter's own gate derives its cases FROM the contract's `§n` and not from this
table; this table's only promise is that every row's target exists.**

**⟶ CORRECTED 2026-10-11 — THE BOUNDED COMBINED REPAIR (`role_spec_writer`): ROW `71`'S LEDGER FIGURE, READ
THROUGH THIS DATED CLAUSE.** `RCA-8(d)` ANNOTATE-BESIDE: **no row of the `71` is added, removed or renumbered
and no pointer count moves — this clause is a PURE INSERTION beside the inventory, and row `71`'s own printed
words stand byte-for-byte as filed.** **THE AS-FILED CELL READS** *"No unit row is admitted, no `DONE` row is
re-opened and no ledger count moves: `docs/next-steps.md` stands `1 DONE / 2 open` UNITS = `3`"* **— AND
`1 DONE / 2 open` IS THE TRACKER'S PRE-`N2`-CLOSE-OUT READING, not an error of this part.** **THE OPERATIVE
FIGURE IS `2 DONE / 1 open` UNITS = `3` (`2 + 1 = 3` ✓), and the close-out that moves it is the
`U-STOREROOM-JS` CLOSE-OUT OF 2026-10-11 AT COMMIT `86b3a02`, which carries the ledger to `3 DONE / 0 open`
UNITS = `3` (`3 + 0 = 3` ✓).** **AND THE TWO READINGS THE ARCHITECT MUST CHOOSE BETWEEN — whether the listener
AMENDMENT counts as a unit — STAND IN THE TRACKER'S OWN HEAD LINE, which is the cell that carries them; the
tracker's head line, its closing clause and its row are the SUPERVISOR'S LANDING, and no tracker byte is written
from this part.** **The row's own subject is UNMOVED: no unit row is admitted, no `DONE` row is re-opened and no
ledger count is moved by any gate of this unit** (`docs/next-steps.md`'s head line; `docs/open-items-review.md`
`§2` item `6` and `§2-bis`; the contract document's closing clause, read through its own `§10` ledger clause)
(`[T: this part's row `71` and its ledger figure, each with its own reading | numeric or census claim]`).

**⟶ AND ROW `65`'S FIGURE IS RE-STATED, LANDED 2026-10-11 BY THE BOUNDED CLOSE-OUT PASS
(`role_spec_writer`): THE STORE'S GREEN IS `379` PASS · `0` FAIL.** `RCA-8(d)` ANNOTATE-BESIDE: **no row of
the `71` is added, removed or renumbered and no pointer count moves — this clause is a PURE INSERTION beside
the inventory, and row `65`'s own printed words stand byte-for-byte as filed.** **THE AS-FILED CELL, QUOTED
SO `git diff` RECOVERS IT WHERE IT STANDS:** *"Every figure carries its site and its layer, and the store's
green is quoted at the figure the artifact that carries it prints (`377`), with `374` and the other as-filed
readings marked HISTORICAL"*. **THE OPERATIVE FIGURE IS `379` PASS · `0` FAIL — the store's root suite,
`cargo test --offline --no-fail-fast`, at the REPOSITORY ROOT, its root `Cargo.toml` byte-identical — because
the `+2` are the two LISTENER CELLS `docs/specs/storeroom-native/write-and-read.md §6.5` item 14 (d)–(e)
required, whose home is `tests/watched_addresses.rs` (its own count moves `19` → `21`), so `379 = 377 + 2`.**
**`377` JOINS `374` AND `373 PASS / 1 FAIL` AS AN AS-FILED READING MARKED HISTORICAL, each with its own tree,
and NOTHING IS WITHDRAWN.** **THE ROW'S OWN SUBJECT IS UNMOVED: every figure still carries its site and its
layer, and the store's green is still QUOTED at the figure the artifact that carries it prints.** **This
clause re-measures nothing — this pass holds no execution verb — and it edits no other row of the inventory**
(`docs/specs/storeroom-js/contract.md` `§7.1`–`§7.2`'s dated clauses of 2026-10-11 — the same figure's other
homes; `DD-33`; `[A3 docs/specs/storeroom-native/write-and-read.md §6.5 item 14 (d)–(e) — the two cells the
`+2` are | numeric or census claim]`).

**⟶ AMENDED 2026-10-11 — THE BOUNDED CORRECTION PASS (`role_spec_writer`), ON THE RED SET'S SIX CONTRACT
FINDINGS (`archive/gate3/storeroom-js-red-set.md` §5).** `RCA-8(d)` ANNOTATE-BESIDE: **the table above stands
byte-for-byte and its `71`-row census DOES NOT MOVE: no row is added to it, removed from it or renumbered by
this clause.** **THE CORRECTED CLAUSES THIS PART'S ROWS NOW POINT AT, AND THE FOUR ROWS THIS PASS ADDS
BESIDE — never inside — the numbered inventory above, so a numbering stays a numbering and a numbering is
never re-cut:**

| The case, as the corrected contract now pins it | Its source, in the `path §n` form | The pinning citation it carries |
| --- | --- | --- |
| **The registration site's spelling: `register(handle, listener)` on the OBJECT `storeCreate` returned; a non-function, an outside-domain handle, a handle this instance never minted and an absent member are EACH declared a JS-side `TypeError` carrying NO `status` and NO `message`, and re-registering a handle replaces its function** | `docs/specs/storeroom-js/contract.md` §2.4 item 5 · `docs/specs/storeroom-js/surface.md` §2.4 item 5 | §2.4's item 5; `PAR-JS-12`; `P-SM-5`'s `S-REG` |
| **A JS `string` carrying a LONE SURROGATE is refused `ValueNotAdmitted` at the PACKAGE's own walk, before any verb is called — a BOUNDARY-ONLY class with no Rust constructible input, so its drive belongs to the JS layer** | `docs/specs/storeroom-js/crossing.md` §1.2 row 1's lone-surrogate clause · §1.4 item 9; `docs/specs/storeroom-js/acceptance.md` §4.1 item 6 | crossing's row 1 clause; §1.4's item 9; `acceptance.md` §4.1's item 6 |
| **The ABSENT-versus-`undefined` reading: a verb's trailing `tier` distinguishes the two by ARITY, so `f(a)`, `f(a, undefined)` and `f(a, null)` stand as three states; a `cfg` key distinguishes them by `in`-membership, so an ABSENT key and a key present carrying `undefined` stand as two; and the construction's two required keys are told apart by the ANSWER, `ConstructionArgumentMissing` against `AddressMalformed`** | `docs/specs/storeroom-js/crossing.md` §1.3's absent-versus-`undefined` rule; `docs/specs/storeroom-js/contract.md` §1.3 | crossing's rule clause; `DD-46`; `PAR-JS-3`'s and `PAR-JS-4`'s rows |
| **The declared Rust command's site, and the acceptance consequence: `cargo test --manifest-path bindings/js/Cargo.toml --offline --no-fail-fast` taken at the REPOSITORY ROOT, with the manifest named EXPLICITLY so the resolution cannot silently become the root package's — a leg that silently runs the wrong package is not a leg** | `docs/specs/storeroom-js/package.md` §4.2 item 4 · `docs/specs/storeroom-js/acceptance.md` §4.1 item 2 | package's §4.2 item 4; acceptance's §4.1 item 2; `DD-19` |

**AND THE ONE COUNT THIS CLAUSE PRINTS, SO THE TWO ARITHMETICS AGREE: the numbered inventory above carries
`71` rows and the corrected-pointer table beside it carries `4` — `71 + 4 = 75` pointers in this part, and
the `71` remains the figure the census sentence above prints, because it is read off the last row's own
number and the four rows below the note carry no number at all** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.7 — the entry-counted unit, and the rule that a
grouping is never a second arithmetic | numeric or census claim]`). **No row of the `71` names a case the
contract does not pin, and no row of the four declares one.**

**⟶ AND THE CLOSE-OUT PASS'S OWN POINTERS, ADDED 2026-10-11 BESIDE — NEVER INSIDE — THE NUMBERED INVENTORY
ABOVE, SO THE `71` STANDS AS THE FIRST CENSUS SENTENCE PRINTS IT.** `RCA-8(d)` ANNOTATE-BESIDE: **no row of
the `71` and no row of the four above is added, removed or renumbered by this clause; THIS table is a second
pointer set, and its rows carry no number at all.** **The four cases the bounded close-out pass declares, each
citing the `§n` that pins it:**

| The case, as the close-out pass's clauses now pin it | Its source, in the `path §n` form | The pinning citation it carries |
| --- | --- | --- |
| **A repeat `listen` at an address that is ALREADY REGISTERED mints nothing and returns the entry's OWN handle, so two `listen` calls at one held address answer the SAME opaque value and a trigger fires that one handle ONCE; a later `listen` mints a DIFFERENT handle only where the withdrawal removed the address; and the second-registration routes are the construction's `listeners[]` duplicate and the withdraw-then-re-register pair** | `docs/specs/storeroom-js/contract.md` §2.3 item 6 · `docs/specs/storeroom-js/surface.md` §2.3's dated clause · `docs/specs/storeroom-js/parameter-semantics.md` §2.8's dated clause | §2.3's item 6; `docs/specs/storeroom-native/write-and-read.md` §6.5 item 12 (c); `DD-15`; `P-SM-5`'s `S-WITHDRAW` |
| **The ABSENT-or-FAILED-ADDON state: `storeCreate` throws the single form with the status `FilePathUnreachable` and returns NO instance, the message's home is the store's own generator (reached through the addon where it loaded far enough to carry it, and carried at ONE documented package-side site where the generator IS the thing that failed), and NO FALLBACK to a JS store, a partial instance or a package-authored message exists** | `docs/specs/storeroom-js/contract.md` §2.5 item 5 · `docs/specs/storeroom-js/package.md` §1.2 item 4 | §2.5's item 5; package's §1.2 item 4; `P-TP-7`'s `S-LOAD`; `A75` |
| **The internal addon's export set is EXACTLY FIVE NAMES — `version` · `errorMessage` · `storeCreate` · `call` · `register` — and none of the five is a named export of the claimed ESM entry, whose named exports are the `8` verbs and `NOTHING ELSE`** | `docs/specs/storeroom-js/contract.md` §3.1's dated clause · `docs/specs/storeroom-js/package.md` §1.3 item 4 | contract's §3.1 dated clause; package's §1.3 item 4; `P-TP-7`'s `S-LOAD` and `S-ONE-ADDON` |
| **The declared Rust type set reconciled to the build: `JsValue`'s `14` states (RE-DERIVED, unmoved), `JsProto`'s `4` (`ForeignPlain` included — the ONE figure that moves), `JsHandleArg`'s `4` and `JsHandle`'s private token, the eight carriers' counts beside `crossing.md §1.6`'s row counts, `JsJournalLengthArg::TooLarge(u64)` beside row 12, `from_store_value`'s `-> JsValue`, and `JsJournalOp`'s `kind: String` with its two tokens** | `docs/specs/storeroom-js/package.md` §4.5 items 2–4, each with its own dated clause · `docs/specs/storeroom-js/crossing.md` §1.6's dated clause and §1.3's row-12 clause | package's §4.5 items 2–4; crossing's §1.6 and §1.3 dated clauses; `DD-7`; `DD-39` |

**AND THE ONE COUNT THIS CLAUSE PRINTS, SO THE THREE POINTER SETS' ARITHMETICS AGREE: the numbered inventory
carries `71` rows, the four-row corrected-pointer table carries `4`, and THIS table carries `4` — so this
part holds `71 + 4 + 4 = 79` pointers, while the `71` remains the figure the census sentence at this part's
head prints, because it is read off the last row's own number and the eight rows below it carry no number at
all** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.7 — the entry-counted unit, and the rule
that a grouping is never a second arithmetic; §C.11.6 — a `view` part declares nothing the contract does not
already carry | numeric or census claim]`). **No row of this table names a case the contract does not pin,
and no row of it declares a requirement of its own.**

**⟶ AND THE BOUNDED DECLARATION PASS'S OWN POINTERS, ADDED 2026-10-11 BESIDE — NEVER INSIDE — THE NUMBERED
INVENTORY ABOVE, SO THE `71` STANDS AS THE FIRST CENSUS SENTENCE PRINTS IT.** `RCA-8(d)` ANNOTATE-BESIDE: **no
row of the `71`, of the four above or of the four beside them is added, removed or renumbered by this clause;
THIS table is a THIRD pointer set, its rows carry no number at all, and it declares no case the contract does
not already pin.** **The FIVE cases the bounded declaration pass's clauses pin, each citing the `§n` that pins
it — the pass that lands the validation order, the no-repair prohibition, the verbose rejection's content and
the id-matching model on the architect's rulings `A76`/`A77`:**

| The case, as the declaration pass's clauses now pin it | Its source, in the `path §n` form | The pinning citation it carries |
| --- | --- | --- |
| **The validation order: for EVERY JS value and EVERY argument, the CLASS is decided FIRST on the value as it is — before any conversion and before any `Array.isArray`-style shortcut — the SHAPE is tested against the permitted set SECOND, and ADMIT or REFUSE is THIRD; a class decision is NEVER deferred and never revisited after a coercion, and the four shipped defects it forbids are named as its own negative examples (a `bigint` through the numeric arm; a `Number()` call throwing a host `TypeError`; `Array.isArray` short-circuiting the prototype test so a class extending `Array` is admitted; a member read through the prototype chain so a prototype-carrying object is admitted), the `cfg`/wire-member reading included** | `docs/specs/storeroom-js/crossing.md` §1.7 | crossing's §1.7, items (a)–(d) and its four named defects; `docs/specs/storeroom-js-proposal.md` §18 · `A76`; `§1.2` row 5 and `§1.3`'s `AddressArg` row 11 |
| **The no-repair prohibition: NOTHING at the boundary converts, substitutes, defaults, truncates or "fixes up" a non-conforming input — a non-conforming value is REFUSED, and the refusal's class is the class the value HAS; a caller who expected a coercion gets a refusal, and that is the declared intent** | `docs/specs/storeroom-js/crossing.md` §1.8 | crossing's §1.8 and its one clause; `docs/specs/storeroom-js-proposal.md` §18 · `A76`; `DD-1`'s carrier pass-through, read beside it |
| **What *"verbose"* means: the rejection carries the FAILING TARGET rendered as the store's generator renders it, PLUS THE REASON — the class that failed and, where the contract declares one, the position — ALL INSIDE the single declared failure form, with a `status` drawn from the store's closed set and NO package-minted code; never a second form and never a raw host error; and the registration site's refusal is read through that form and that set** | `docs/specs/storeroom-js/surface.md` §2.5 item 6 | surface's §2.5 item 6, items (a)–(g); `docs/specs/storeroom-native/contract.md` §8.2's generator rule and §8.1 #1; `A76`'s reach clause; `DD-40`; `A64` |
| **The id-matching model: the store passes an ID back when a listener is triggered, the ID is the value REGISTRATION returned, the JS side matches that identity to the function it was registered with, and an ID the package holds NO function for fires NOTHING — an ASSERTABLE OBSERVABLE (no invocation, no log, no throw); the four registry rules are read through it (an unregistered id fires nothing · re-registration replaces the function and not the identity · one invocation per DISTINCT id · `unlisten` withdraws the registration and never the function)** | `docs/specs/storeroom-js/surface.md` §2.4 item 6 · `docs/specs/storeroom-js/surface.md` §2.7 item 5 | surface's §2.4 item 6, items (a)–(f), and its §2.7 item 5; `docs/specs/storeroom-js-proposal.md` §18 · `A77`; `P-SM-5`; `P-TP-8` |
| **The id and the triggering ADDRESS are TWO DIFFERENT DATA: the id is the matched identity carried in `triggered` and it decides WHICH function is invoked, while the invocation's ONE argument is the TRIGGERING ADDRESS — the verb's own `address` argument, whose producer and arms are declared (the `write` arm, the tier-present `delete` arm and the tier-absent `delete` arm each carrying the caller's address verbatim, and a no-op `listen` producing no trigger and therefore no address)** | `docs/specs/storeroom-js/parameter-semantics.md` §2.12's dated clause · `docs/specs/storeroom-js/parameter-semantics.md` §2.15's dated clause | `PAR-JS-12`'s dated clause and `PAR-JS-15`'s dated clause; `docs/specs/storeroom-js/surface.md` §2.7 item 5; `A77` |

**AND TWO ROWS OF THE POINTER SETS ABOVE ARE READ THROUGH THE RECONCILIATION BELOW, SO A TESTWRITER DOES NOT
DERIVE THE FORM THEY PRINT AS THE OPERATIVE ONE.** **THE ROWS: the corrected-pointer table's FIRST row (the
registration site) and the numbered inventory's row `64` (the `PAR-JS-12` exception) — each of which prints
the registration site's refusal as a JS `TypeError` carrying NO `status` and NO `message`.**

**⟶ RECONCILED 2026-10-11 — THE BOUNDED DECLARATION PASS (`role_spec_writer`), ON `A76`: THE REGISTRATION
SITE'S REFUSAL FORM.** `RCA-8(d)` ANNOTATE-BESIDE: **the `71` rows and the two pointer sets above stand
byte-for-byte and this clause adds no row to any of them; it states the operative form the two rows are read
THROUGH, and the rows' own printed words are named as the form declared at the bounded correction pass of
2026-10-11.** **THE OPERATIVE FORM IS THE SINGLE ONE, AND IT IS DECLARED AT
`docs/specs/storeroom-js/surface.md §2.5` item 6 (g): the registration site's refusal travels in
`{status, message}`, with its `status` drawn from the store's closed `15`-member set — the store's own
`AddressMalformed` — and its `message` generated on the path that item declares.** **THE SITE, ITS DOMAIN, ITS
TWO ARGUMENT POSITIONS, ITS REPLACEMENT ARM AND ITS UNLISTEN-CONTRAST ARE UNMOVED** (**`§2.4` item 5 (b)–(d);
`docs/specs/storeroom-js/parameter-semantics.md §2.12`'s second dated exception clause**)
(`[A1 docs/specs/storeroom-js-proposal.md §18 · `A76` — the verbose rejection travels inside the one form, and
`A76`'s reach clause licenses no second form | requirement]`).

**AND THE ONE COUNT THIS CLAUSE PRINTS, SO THE FOUR POINTER SETS' ARITHMETICS AGREE: the numbered inventory
carries `71` rows, the corrected-pointer table carries `4`, the close-out pass's table carries `4`, and THIS
table carries `5` — so this part holds `71 + 4 + 4 + 5 = 84` pointers, while the `71` remains the figure the
census sentence at this part's head prints, because it is read off the last row's own number and the `13` rows
below it carry no number at all** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.7 — the
entry-counted unit, and the rule that a grouping is never a second arithmetic; §C.11.6 — a `view` part declares
nothing the contract does not already carry | numeric or census claim]`). **No row of this table names a case
the contract does not pin, and no row of it declares a requirement of its own.**

**⟶ AND THE BLIND GREENS PASS'S OWN POINTERS, ADDED 2026-10-11 BESIDE — NEVER INSIDE — EVERY SET ABOVE, SO THE
`71` STANDS AS THE FIRST CENSUS SENTENCE PRINTS IT.** `RCA-8(d)` ANNOTATE-BESIDE: **no row of the `71`, of the
three four-row sets, of the five-row set or of the `13` unnumbered rows below them is added, removed or
renumbered by this clause; THIS table is a FIFTH pointer set, its rows carry no number at all, and it declares
no case the contract does not already pin.** **The THREE cases the blind greens pass's reconciled cells now
pin, each citing the `§n` that pins it:**
| The case, as the blind greens pass's cells now pin it | Its source, in the `path §n` form | The pinning citation it carries |
| --- | --- | --- |
| **The entry's named exports are the `8` of the SURFACE — `delete` · `listen` · `read` · `readLiteral` · `rollback` · `storeCreate` · `unlisten` · `write` — and of the internal addon's FIVE names the FOUR internal-only ones (`version` · `errorMessage` · `call` · the addon's own `register`) are absent from the module graph while the FIFTH, `storeCreate`, is the entry's own construction verb and factory; the instance's own member set is exactly `{ register }`; a NINTH entry name and a SIXTH addon name are each a FINDING** | `docs/specs/storeroom-js/package.md` §1.3 item 4's dated clause · `docs/specs/storeroom-js/contract.md` §3.1's dated clause of the same date | package's §1.3 item 3 (the clause that governs) and item 4's dated clause; contract's §3.1 dated clause; surface's §2.4 item 5 (a); `archive/gate5/storeroom-js-greens-run.md` §4 · `F-DOC-1`, with `JSG-01` (`13/13`) and `JSG-12.13` |
| **The lawful duplicate's multiplicity: where the STORE MINTED the token, ONE identity is reachable once — `triggered` carries it once and ONE invocation follows; where TWO CONSTRUCTION ENTRIES AT ONE ADDRESS CARRY ONE TOKEN BY THE CALLER'S OWN ACT, the STORE's own declaration governs the array — `triggered` carries that token TWICE — while the INVOCATION COUNT stays the PACKAGE's rule, ONE per DISTINCT identity, so that token's one function runs ONCE; and a drive may assert the array's LENGTH (`2`) and its DISTINCT-identity count (`1`) TOGETHER** | `docs/specs/storeroom-js/surface.md` §2.4's dated clause of 2026-10-11 · `docs/specs/storeroom-js/contract.md` §2.4's dated clause of the same date | surface's §2.4 rule 3 and its dated clause; contract's §2.4 rule 3 dated clause; `docs/specs/storeroom-native/contract.md` §0.2 · `DD-42` and `DD-39`, read with that contract's §0.4 clause 2 (b); `write-and-read.md §6.5` item 12 (b); `P-SM-5`; `P-TP-8` |
| **The composite `message`'s authority split, stated ONCE: SEGMENT ONE is the store's own generator's string for the answering code at the failing TARGET's spelling, verbatim; SEGMENT TWO is the BOUNDARY's own and is APPENDED after a separator, carrying the CLASS (mandatory) and the POSITION (conditional); the `status` is neither segment's text and is carried verbatim from the store's closed set; a boundary-authored string that STANDS IN FOR Segment One is a FINDING** | `docs/specs/storeroom-js/surface.md` §2.5 item 5 (b)'s dated clause of 2026-10-11 | surface's §2.5 item 5 (b)–(d) and its `CF-3` clause, read through the dated clause that states the split; `docs/specs/storeroom-native/contract.md` §8.2's generator rule; `archive/gate4/storeroom-js-adversarial.md` §A · `JS-3`; `A76` |

**AND THE ONE COUNT THIS CLAUSE PRINTS, SO THE FIVE POINTER SETS' ARITHMETICS AGREE: the numbered inventory
carries `71` rows, the corrected-pointer table carries `4`, the close-out pass's table carries `4`, the
bounded declaration pass's table carries `5`, and THIS table carries `3` — so this part holds
`71 + 4 + 4 + 5 + 3 = 87` pointers, while the `71` remains the figure the census sentence at this part's head
prints, because it is read off the last row's own number and every row below it carries no number at all**
(`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.7 — the entry-counted unit, and the rule that a
grouping is never a second arithmetic; §C.11.6 — a `view` part declares nothing the contract does not already
carry | numeric or census claim]`). **No row of this table names a case the contract does not pin, and no row
of it declares a requirement of its own.**

**⟶ AND THE BOUNDED `A78` RE-HOMING PASS'S OWN POINTERS, ADDED 2026-10-11 BESIDE — NEVER INSIDE — EVERY SET
ABOVE, SO THE `71` STANDS AS THE FIRST CENSUS SENTENCE PRINTS IT.** `RCA-8(d)` ANNOTATE-BESIDE: **no row of the
`71`, of the three four-row sets, of the five-row set, of the three-row set or of the `13` unnumbered rows
below them is added, removed or renumbered by this clause; THIS table is a SIXTH pointer set, its rows carry
no number at all, and it declares no case the contract does not already pin.**
**AND ONE FACT THIS TABLE OWES ITS READER BEFORE ITS ROWS ARE READ, BECAUSE THE ROWS BELOW MOVE CLAUSES AND
NOT BEHAVIOUR: THE `A78` RE-HOMING IS A RE-HOMING OF AUTHORITY AND NOT A BEHAVIOUR CHANGE — the shipped
`listen`/`unlisten` and the one authoritative home DO implement the firing, and the package's registry and
invocation DO implement only the delivery — so every pointer above stands as it stood, and the four rows
below state WHICH CLAUSE NOW OWNS WHICH RULE AND WHICH ONE MERELY POINTS AT THE OWNER.** **The FOUR cases the
re-homing pass's clauses now pin, each citing the `§n` that pins it:**

| The case, as the re-homing pass's clauses now pin it | Its source, in the `path §n` form | The pinning citation it carries |
| --- | --- | --- |
| **The firing's authority: WHICH listener fires · WHEN it fires · WHAT it is bound to · WHICH ids a trigger returns · the home's registration semantics (`listen`/`unlisten`) · the address-prefix rule · the process-scoped handle are ALL STORE BEHAVIOUR, and the STORE's contract is their authority; no consumer's, binding's or package's artifact is their home — the package side owns the DELIVERY only (the id→function registry, the invocation, its argument and the failure form)** | `docs/specs/storeroom-native/write-and-read.md` §6.5 item 14 · `docs/specs/storeroom-native/contract.md` §6.5's dated clause of 2026-10-11 | `write-and-read.md` §6.5 item 14, clause (a), on the architect's ruling `docs/specs/storeroom-js-proposal.md` §19 · `A78` (*"Listener behavior is part of store."*); the store contract's `§6.5` dated clause, which states the same authority at the store's own foot |
| **The registration's effect timing relative to a trigger: WHAT A TRIGGER'S RETURNED SET CONTAINS IS WHAT THE ONE HOME HELD WHEN THE TRIGGER WAS COMPUTED, and a `listen` or an `unlisten` that lands AFTER that computation takes effect at the NEXT trigger — the returned set being FIXED at the moment of its computation; and the registration's effect on a trigger's set contents is the STORE's rule while the invocation is the PACKAGE's** | `docs/specs/storeroom-native/write-and-read.md` §6.5 item 14 (d) and its (e) · `docs/specs/storeroom-js/surface.md` §2.4's re-homing clause of 2026-10-11 | `write-and-read.md` §6.5 item 14 (d)–(e), with its (f) argument — the returned list's order being UNOBSERVABLE, a rule tying an outcome to an occurrence's POSITION would make an observable depend on an unobservable; `docs/specs/storeroom-native/contract.md` §6.5 item 5 (*"NO ORDER IS DECLARED FOR THE LIST"*) with `DD-22`/`DD-37`; `docs/pending.md`'s `CF-DUP-3` clause, whose corner this rule now owns at its store-side home; `surface.md` §2.4's `CF-DUP-3` clause, read as that home's POINTER |
| **The package's own delivery half of the same rule, and the ONE thing the package does with the list it holds: the invocation happens AFTER the store's verb has returned, the package reads the list IT HOLDS once per DISTINCT identity, so an identity whose function was absent when the list was read is not invoked at a later occurrence of it in that list, an identity registered between two occurrences is not invoked in that list, and a replacement made during it takes effect at the NEXT trigger — none of the three reaching back into a list already in flight** | `docs/specs/storeroom-js/surface.md` §2.4's re-homing clause of the 2026-10-11 pass · `docs/specs/storeroom-js/contract.md` §2.4's re-homing clause of the same date · `docs/specs/storeroom-js/surface.md` §2.7 item 2 | `surface.md` §2.4's re-homing clause, clauses (3)–(4); `contract.md` §2.4's re-homing clause, clause 3; `surface.md` §2.7 item 2 (the window) and item 3 (membership only); `§2.4` rules 1–3 and item 6 (b)–(e) |
| **The `listen`/`unlisten` crossing signatures inherit the home's semantics and declare no second reading of it: what the JS side keeps is the two SPELLINGS (a plain `string` in at the construction, the package's OPAQUE value out, accepted by `unlisten` alone, its token unreadable) and the `AddressArg`-domain pass-through with no tier qualifier, while WHICH address a registration binds to, WHAT `listen` does at an address already held, WHAT `unlisten` removes, WHICH values it declines as a no-op success and WHAT the home holds afterwards are the store's** | `docs/specs/storeroom-js/surface.md` §2.10's re-homing clause of 2026-10-11 · `docs/specs/storeroom-js/parameter-semantics.md` §2.8's re-homing clause of the same date | `surface.md` §2.10's re-homing clause, clauses 1–3; `parameter-semantics.md` `PAR-JS-8`'s re-homing clause, clauses 1–3; `write-and-read.md` §6.5 items 8 (a)/(d), 12 and 14; `docs/specs/storeroom-native/parameter-semantics.md` §2.13 (`PAR-13`) |

**AND THE ONE COUNT THIS CLAUSE PRINTS, SO THE SIX POINTER SETS' ARITHMETICS AGREE: the numbered inventory
carries `71` rows, the corrected-pointer table carries `4`, the close-out pass's table carries `4`, the
bounded declaration pass's table carries `5`, the blind greens pass's table carries `3`, and THIS table
carries `4` — so this part holds `71 + 4 + 4 + 5 + 3 + 4 = 91` pointers, while the `71` remains the figure the
census sentence at this part's head prints, because it is read off the last row's own number and every row
below it carries no number at all** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.7 — the
entry-counted unit, and the rule that a grouping is never a second arithmetic; §C.11.6 — a `view` part declares
nothing the contract does not already carry | numeric or census claim]`). **No row of this table names a case
the contract does not pin, and no row of it declares a requirement of its own; and NO ROW ABOVE IS A TEST — the
TestWriter derives its cases from the `§n` each row names and never from this table**
(`[A1 docs/specs/storeroom-js-proposal.md §19 · `A78` — the ruling this pointer set is derived from; A3
docs/specs/storeroom-native/write-and-read.md §6.5 items 8 (a)/(d), 10 (d)–(e), 11, 12 and 14 — the store's
listener clauses, each row's own target | requirement]`).

**⟶ AND THE `Q1` CONTRACT AMENDMENT'S OWN POINTERS — THE TWO NEW INSTANCE MEMBERS — ADDED 2026-10-11 BESIDE,
NEVER INSIDE, THE NUMBERED INVENTORY ABOVE, SO THE `71` STANDS AS THE FIRST CENSUS SENTENCE PRINTS IT.**
`RCA-8(d)` ANNOTATE-BESIDE: **no row of the `71`, of the five four-or-five-row pointer sets or of the `13`
unnumbered rows below them is added, removed or renumbered by this clause; THIS table is a SEVENTH pointer set,
its rows carry no number at all, and it declares no case the contract does not already pin.**
**AND ONE FACT THIS TABLE OWES ITS READER BEFORE ITS ROWS ARE READ:** **the two members below are the amendment's
own — `A79`'s shape, `A80`'s deregistration and `A81`'s validation — and every row's target is a clause of THIS
directory: `docs/specs/storeroom-js/surface.md §2.1`'s and `§2.4` item 7's, `contract.md §5.5`'s dated
re-derivation, and `docs/specs/storeroom-js/parameter-semantics.md §2.8`'s and `§2.12`'s dated clauses.** **The
FOUR `DD` rows the amendment authors are `contract.md §0.2`'s `DD-51`…`DD-54` and each is a priced, reversible
default; NO ROW BELOW DECLARES ONE AND NO ROW BELOW IS A TEST.**

| The case, as the `Q1` amendment's clauses now pin it | Its source, in the `path §n` form | The pinning citation it carries |
| --- | --- | --- |
| **`on`'s signature and its return: `on(address, listener) -> handle` is a member of the object `storeCreate` returned, its `address` is `AddressArg`'s domain and NOTHING MORE, and it returns the package's OPAQUE handle; `off(handle) -> undefined` takes that form ONLY and returns `undefined` on every success; the module namespace stays at the EIGHT declared verbs and `listen`/`unlisten` stay un-overloaded** | `docs/specs/storeroom-js/surface.md` §2.1's dated clause · `docs/specs/storeroom-js/surface.md` §2.4 item 7 · `docs/specs/storeroom-js/contract.md` §5.5's dated re-derivation clause | surface's §2.1 and §2.4 item 7; contract's §5.5 dated clause; `docs/specs/storeroom-js-proposal.md` §8 · `A79`; `§2.9` item 1's `8`-name count, UNMOVED |
| **`on`'s ATOMICITY ORDER: validation runs FIRST — the CLASS on the value as it is, never repaired — and only then the store's `listen`, then the registry's registration: VALIDATE → LISTEN → REGISTER; so a refused `address` or `listener` leaves NO store-side home entry, NO registry entry, NO node minted and NO journal entry appended** | `docs/specs/storeroom-js/surface.md` §2.4 item 7 (a) · `docs/specs/storeroom-js/parameter-semantics.md` §2.12's dated clause · `docs/specs/storeroom-js/crossing.md` §1.7 | surface's §2.4 item 7 (a); `parameter-semantics.md` `PAR-JS-12`'s dated clause; crossing's §1.7–§1.8; `docs/specs/storeroom-js-proposal.md` §18 · `A76` and §8 · `A81` |
| **`on` AT A HELD ADDRESS: it returns that address's EXISTING handle — the store's address-level idempotence — and REPLACES the registry's function, so ONE identity carries ONE function and the replaced function is dropped without notice** | `docs/specs/storeroom-js/surface.md` §2.4 item 7 (a) · `docs/specs/storeroom-js/contract.md` §5.5's dated re-derivation clause | surface's §2.4 item 7 (a) and rules 2–3; `docs/specs/storeroom-native/write-and-read.md` §6.5 item 12 (c); `docs/specs/storeroom-js-proposal.md` §8 · `A79` |
| **`off`'s TWO REMOVALS, AND THE RECONCILIATION: it validates its handle FIRST, then performs the store-side `unlisten` AND removes the PACKAGE'S OWN registry entry — while `unlisten` KEEPS rule 4 VERBATIM (the store-facing withdrawal only, the registry entry STANDING): rule 4 is SUPPLEMENTED, NOT EXCEPTED, and the declared asymmetry survives exactly as written** | `docs/specs/storeroom-js/surface.md` §2.4 item 7 (b) · `docs/specs/storeroom-js/parameter-semantics.md` §2.8's dated clause | surface's §2.4 item 7 (b) and rules 1–4; `parameter-semantics.md` `PAR-JS-8`'s dated clause; `docs/specs/storeroom-js-proposal.md` §8 · `A80`; `§2.9` item 1 |
| **BOTH MEMBERS ARE DELIVERY-SIDE ONLY: neither states, alters nor promises any firing rule — WHICH listener fires, WHEN it fires and WHICH ids a trigger returns are the STORE's — and neither is a release verb; a drive derives its firing terms from `docs/specs/storeroom-native/write-and-read.md §6.5` item 14 and finds no `dispose()`/`close()` at either layer** | `docs/specs/storeroom-js/surface.md` §2.4 item 7 (c) | surface's §2.4 item 7 (c); `docs/specs/storeroom-native/write-and-read.md` §6.5 item 14; `docs/specs/storeroom-js-proposal.md` §19 · `A78`; `§3.5` · `docs/specs/storeroom-js-proposal.md` §15 · `A74` |
| **THE REFUSAL AT BOTH NEW SITES IS THE SINGLE FORM: a non-function `listener`, an `address` outside `AddressArg`'s domain, and an `off` handle this instance never minted or adopted are EACH answered `AddressMalformed` — a member of the store's closed `15`-member set, minted by nothing — in a thrown `{status, message}` whose message carries the failing target and the reason (the class, and the ARGUMENT POSITION `on`'s or `off`'s), and NEVER a second failure form and NEVER a raw host `TypeError`** | `docs/specs/storeroom-js/parameter-semantics.md` §2.17's dated clause · `docs/specs/storeroom-js/parameter-semantics.md` §2.8's and §2.12's dated clauses · `docs/specs/storeroom-js/surface.md` §2.4 item 7 (a)–(b) · `docs/specs/storeroom-js/surface.md` §2.5 item 5 | `parameter-semantics.md` `PAR-JS-17`'s, `PAR-JS-8`'s and `PAR-JS-12`'s dated clauses; surface's §2.5 items 1–5; `A76`'s reach clause; `docs/specs/storeroom-js-proposal.md` §8 · `A81`; `DD-40` |
| **`off` REMOVES NO MORE THAN THE HANDLE NAMES, AND A REGISTRY ENTRY DOES NOT OUTLIVE ITS INSTANCE: `off(h)` withdraws the store-side home entry that handle names and removes the package's registry entry for THAT identity, leaving every OTHER registration standing; `off` over a handle outside the domain is `AddressMalformed` where `unlisten` over the same value is a NO-OP SUCCESS — the two verbs answer one value differently BY DECLARATION; and the registry is released with the instance and by nothing else** | `docs/specs/storeroom-js/surface.md` §2.4 item 7 (b)–(c) · `docs/specs/storeroom-js/contract.md` §5.5's dated re-derivation clause | surface's §2.3 item 4, §2.4 rules 1–4 and item 7 (b); contract's §5.5 dated clause; `docs/specs/storeroom-js/parameter-semantics.md` §2.8's dated clause; `DD-15` · `DD-17`; `docs/specs/storeroom-js-proposal.md` §8 · `A80` |

**AND THE ONE COUNT THIS CLAUSE PRINTS, SO THE SEVEN POINTER SETS' ARITHMETICS AGREE: the numbered inventory
carries `71` rows, the corrected-pointer table carries `4`, the close-out pass's table carries `4`, the bounded
declaration pass's table carries `5`, the blind greens pass's table carries `3`, the `A78` re-homing pass's table
carries `4`, and THIS table carries `7` — so this part holds `71 + 4 + 4 + 5 + 3 + 4 + 7 = 98` pointers, while the
`71` remains the figure the census sentence at this part's head prints, because it is read off the last row's own
number and every row below it carries no number at all** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.7 — the entry-counted unit, and the rule that a grouping is
never a second arithmetic; §C.11.6 — a `view` part declares nothing the contract does not already carry |
numeric or census claim]`). **No row of this table names a case the contract does not pin, and no row of it
declares a requirement of its own; and NO ROW ABOVE IS A TEST — the TestWriter derives its cases from the `§n`
each row names and never from this table**
(`[A1 docs/specs/storeroom-js-proposal.md §8 · `A79` · `A80` · `A81` — the rulings this pointer set is derived
from; A3 docs/specs/storeroom-js/surface.md §2.4 item 7 — the clause the six member-rows' targets resolve to;
A3 docs/specs/storeroom-js/parameter-semantics.md §2.8's and §2.12's dated clauses — the two re-derived
parameter rows | requirement]`).
