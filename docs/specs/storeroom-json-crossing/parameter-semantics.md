# PARAMETER SEMANTICS — `U-STOREROOM-JSON-CROSSING`

**Part of `contract.md`.** The rows below are normative for both directions. They are read with the contract's `§2`–`§5`. `[T]`

## §1 — THE PARAMETER ROWS

| # | Parameter | Direction | Admitted form | Outside / refusal | Position |
| --- | --- | --- | --- | --- | --- |
| 1 | `value` | copy-in | string, finite number, boolean, dense genuine array, plain object | the sixteen classes in `contract.md §2` | value |
| 2 | object member `key` | copy-in | a JS string without a lone surrogate | `a string carrying a lone surrogate` (class row 10) | key |
| 3 | array `index` | copy-in | a non-negative integer index present in a dense array | a hole refuses the whole array as `a sparse array` (class row 16) | value of the element; the member position is the index |
| 4 | object / array shape | both | plain object or genuine dense array with no own accessor and no own Symbol-keyed member | class rows 5, 12, 13, 14, 15, 16 | value or member |
| 5 | `value` | copy-out | the same bare tree | none: the store's admitted model has no outside value on this route | value |
| 6 | number / `-0` | both | finite binary64; `-0` normalizes to `0` | non-finite number (class row 7) | value |
| 7 | `depth` | both | `0…126` | `127` and beyond: `a value over the walk ceiling` (class row 8) | value |
| 8 | `nodes` | both | `0…999,999` | `1,000,000` and beyond: `a value over the walk ceiling` (class row 8) | value |

**No row is optional; no row accepts a union of an admitted and an outside form; no row coerces.** `[T]`

## §2 — THE POSITION MAPPING

- **Value position.** The written value itself, a member value reached by the walk, or an array element. The root position is `the write's value argument`; below it the position is `member <path> of the write's value argument`, where `<path>` is the segment path joined by `/` and each string key is single-quoted.
- **Array index position.** An element's path segment is the index bare: `member 0 of the write's value argument`. The index is a declared member position, not a key position.
- **Member-key position.** A key holding a lone surrogate cannot be spelled; its path segment is `'<key: a string carrying a lone surrogate>'`. The key is never dropped and the whole value is refused.
- **Class position.** The class spelling is the exact reason text in `contract.md §2`, never a converted class and never a marker letter.

**The failing target's own spelling is PART ONE's `<subject>`.** The store's target rule quotes it; the package does not add a second quoting. `[A1 bindings/js/index.mjs:819 | valueTargetSpelling; :891 | valuePosition]`

**⟶ AMENDED 2026-10-23 — THE GATE-3 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): ONE LINE CITE IS RE-POINTED AND THE SUBJECT'S THREE EXCEPTIONS ARE CROSS-REFERRED.** **The clause above stands byte-for-byte and is read THROUGH this one; THIS clause re-decides no position and adds no class.** `bindings/js/index.mjs:819 | valueTargetSpelling` **reads `:914`** (the gate-3 landing moved it); `:891 | valuePosition` resolves unmoved. **AND THE CLAUSE ABOVE'S SUBJECT RULE IS NOT UNIVERSAL, WHICH IS DECLARED AT ITS OWN HOME AND NOT RE-DECIDED HERE: `contract.md §2.1`'s clause of 2026-10-23 names the three arms of `§2` whose `<subject>` is not a target spelling — row 8's node-ceiling arm (the class spelling), row 13's `Array`-subclass arm (the value's own empty rendering) and row 10's member-key arm (the value argument's name, because the unpaired code unit has no spelling that can cross) — and no fourth subject spelling is declared for any arm.** `[A1 bindings/js/index.mjs:914 | valueTargetSpelling, opened at this pass's read; contract.md §2.1 | the three arm subjects | cross-reference]`

## §3 — THE REFUSAL MESSAGE

**The message is assembled in exactly two parts:**

1. **PART ONE — the store generator's bytes.** `storeErrorMessage('ValueRefusedAtBoundary', args)` with `MessageArgs.segment = <subject>` renders:
   `<subject> is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays`
2. **PART TWO — the package's appended clause.** `, the value at <position> is <class>`

**No other slot is used.** The store adds no `MessageArgs` member for the class or the position. The package mints neither the status nor PART ONE. There is no second message source and no unsubstituted placeholder. `[A1 src/error.rs:81 | storeErrorMessage; docs/specs/storeroom-native/contract.md §8.2]`

**Worked example.** `write(['v'], 'mem', {a: 10n})` renders:

> `'10n' is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays, the value at member 'a' of the write's value argument is a bigint`

The status is `ValueRefusedAtBoundary`. The value is refused before any verb; no store call, node, anchor, or journal is created. `[T]`

## §4 — THE CEILINGS

**Depth `128` and nodes `1,000,000` are the crate's and govern both directions.** The package's pre-amendment `64` is not a second bound. `65` and `66` are admitted depth values; `129` and `130` are refused. The node ceiling is counted by the crate's conversion, not by a second package counter. `[A2 docs/decisions.md · A148 Q6]`

**⟶ AMENDED 2026-10-23 — THE GATE-3 PROOFREADING PASS (`role_proofreader`; `RCA-8(g)`): THE CEILINGS' CITATION IS RE-SPELLED, BECAUSE `A148` CARRIES NO `Q6`.** **The clause above stands byte-for-byte and is read THROUGH this one; THIS clause moves no ceiling and no figure.** `A148 Q6` **is read as `A148`'s ceiling follow-up, carried at `docs/specs/storeroom-json-crossing-proposal-review.md §4`'s answer table, third `Follow-up` row (*"Crate `128` governs"*), that row's recorded questions being `Q1`–`Q5` only** — the re-spelling `contract.md §4`'s clause of the same date states in full. `[A2 docs/decisions.md · `A148` follow-ups; docs/specs/storeroom-json-crossing-proposal-review.md §4 — its answer table's three `Follow-up` rows | cross-reference]`

**A depth or node refusal uses row 8's class (`a value over the walk ceiling`) and the same status.** It is not `ValueNotAdmitted`, and it is not a store-produced error. `[T]`

**⟶ AMENDED 2026-10-23 (`A149`) — THE CEILING ROWS AND THE `§4` CLAUSE ABOVE ARE RE-DERIVED TO THE OPERATIVE RANGE: DEPTH `126` ON BOTH ROUTES, NODES `0…999,999`, AND THE REFUSAL IS THE WALK'S, ANSWERED BEFORE ANY STORE VERB** (`RCA-8(g)`: **the two clauses above stand byte-for-byte and are read THROUGH this one — the ceiling ANSWER they print is re-derived here and NOTHING ELSE of them moves, so the `128` and `1,000,000` printed above are re-read as the crate's CONVERSION bounds and are not the crossing's admission bound from this date**). **(1) `§1`'s rows `7` and `8` are re-derived in place: `depth` `0…126` and `nodes` `0…999,999`, the row above the ceiling's being `127` for depth and `1,000,000` for nodes; no other row moves and the row census stays `8`.** **(2) `126` is the highest admitted depth and `127` and beyond is refused; `65` and `66` remain admitted depth values; the root consumes the crate's first node, so the value's own node range is `0…999,999` and a value of `1,000,000` nodes is refused as the same class.** **(3) WHERE THE REFUSAL IS ANSWERED, STATED EXACTLY AS `contract.md §4` NOW STATES IT — at the package's walk, before any store verb, at a declared VALUE POSITION: the root's own is `the write's value argument` and below it `member <path> of the write's value argument` (this part's `§2`); at the depth ceiling the position is the declared value position at which the walk counts past the ceiling and PART ONE's `<subject>` is that value's own spelling, while at the node ceiling the position stays the root and PART ONE's `<subject>` is the class spelling (`contract.md §2.1` row `8`).** **(4) The status is `ValueRefusedAtBoundary` on both ceilings — rank `17`, never a store-produced error and never `ValueNotAdmitted` — so the sentence above stands where it places that answer.** **(5) THE SENTENCE ABOVE'S *"counted by the crate's conversion, not by a second package counter"* IS RE-DERIVED, BECAUSE THE OPERATIVE COUNT IS THE PACKAGE WALK'S OWN: `NODE_CEILING` is the walk's counter in `bindings/js/index.mjs`, its root visit being its first increment, which is why the value's own node range is `0…999,999` and a dense top-level array's last admitted length is `999,999`; the crate conversion keeps its own `1,000,000` as the CONVERSION's bound, and the crossing's admission bound is the walk's.** `[A2 docs/decisions.md · A149 | the operative ceilings and the refusal position; A2 docs/specs/storeroom-json-crossing-live-report.md §5 · §6 — `LIVE-X1`/`LIVE-X2` | the measured ground; contract.md §4 · §2.1 | the same figures and the same position | numeric or census claim]`

## §5 — THE `-0` PIN

**`-0` normalizes to `0` at the binding boundary.** The sign of zero is not a crossing a caller may rely on; the store's own sign behavior is unmoved. `[A2 docs/decisions.md · A140]`

## §6 — COPY DISCIPLINE FOR PARAMETERS

**Every admitted parameter is deep-copied once in the direction it travels.** No member is shared, no node is aliased, and no second copy is made. A caller's mutation after a member is visited is not observed; a mutation before the visit is. The crossing does not snapshot. `[A2 docs/decisions.md · A140; contract.md §4]`

**⟶ RECONCILED 2026-10-24 — THE DOCUMENTATION REVIEW (`role_documentation_reviewer`; `RCA-8(g)`): THIS PART'S MARKER DATES AND ITS ONE STALE CODE LINE CITE ARE RECONCILED AGAINST THE BUILD, AND NO ROW, POSITION, CLASS OR FIGURE MOVES.** **Every clause of this part stands byte-for-byte and is read THROUGH this one; THIS clause re-decides no ceiling, re-spells no position and adds no row.**

**(a) THE DATE — THE MARKERS STAND AND THE FILINGS ARE `2026-10-24`.** The `§2` gate-3 proofreading clause and the `§4` clauses of `2026-10-23` (the `A148 Q6` re-spelling and the `A149` re-derivation) record landings of **`2026-10-24`**, one day after the marker: the proofreading insertions into this file measured **`17:23` on `2026-10-24`** (`docs/specs/storeroom-json-crossing-live-report.md §10`), and the `A149` landing is the source edit `bindings/js/index.mjs`'s `const ENCODER_CEILING = 126` at mtime **`2026-10-24 19:09:06`** with the addon built `19:09:49` and restaged `19:09:51` (`… §11`). **No marker is rewritten — they are cited by `A149` and by the review record — and this item is their resolution of record** (`docs/defects.md` · `DEF-2026-10-24-A`). **The gate-`4`/gate-`5` runs those clauses cite ran on `2026-10-23` and their dates are unmoved.**

**(b) THE ONE STALE CODE LINE CITE, OPENED AT THIS PASS'S READ.** `§3`'s tag `src/error.rs:81 | storeErrorMessage` reads **`:95`**, the function's own doc line, with the `fn` at **`:97`** (the store's set is `CODES: [&str; 17]` at `:58`, `ValueRefusedAtBoundary` last at `:75`, rank `17` ✓). **`§2`'s two cites resolve and are unmoved:** `bindings/js/index.mjs:914 | valueTargetSpelling` ✓ and `:891 | valuePosition` ✓.

**(c) THE CENSUS AND THE CEILINGS, MEASURED AND AGREEING.** `§1` carries **`8` rows**, and rows `7`/`8` read `0…126` and `0…999,999` — which is the build: `ENCODER_CEILING = 126` and `NODE_CEILING = 1_000_000` at `bindings/js/index.mjs:1042`–`:1043`, with the walk refusing at `depth > ENCODER_CEILING` (`:1111`) and at `fault.nodes > NODE_CEILING` (`:1085`), the root counted as the first node — so `126` is admitted on both routes, `127` is refused at the walk before any verb with the class `a value over the walk ceiling` and the status `ValueRefusedAtBoundary`, and `999,999` nodes are admitted while `1,000,000` is refused. **`§3`'s worked example is the spelling the executed cells reproduce character for character** (`JC-B27` at `bindings/js/test/json-crossing-blinded.test.mjs`, `LIVE-B44` in the live runner), and `§5`'s `-0` pin and `§6`'s copy discipline are unmoved. **No row of this part is stale.** `[A1 bindings/js/index.mjs:1042 · :1043 · :1085 · :1111 · :914 · :891, and src/error.rs:58 · :75 · :95 · :97, each opened at this pass's read; A2 docs/specs/storeroom-json-crossing-live-report.md §10 · §11 | the landing dates and the re-drive; docs/defects.md · `DEF-2026-10-24-A` | cross-reference and numeric or census claim]`
