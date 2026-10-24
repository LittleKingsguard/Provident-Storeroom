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
| 7 | `depth` | both | `0…128` | `129` and beyond: `a value over the walk ceiling` (class row 8) | value |
| 8 | `nodes` | both | `0…1,000,000` | over the ceiling: `a value over the walk ceiling` (class row 8) | value |

**No row is optional; no row accepts a union of an admitted and an outside form; no row coerces.** `[T]`

## §2 — THE POSITION MAPPING

- **Value position.** The written value itself, a member value reached by the walk, or an array element. The root position is `the write's value argument`; below it the position is `member <path> of the write's value argument`, where `<path>` is the segment path joined by `/` and each string key is single-quoted.
- **Array index position.** An element's path segment is the index bare: `member 0 of the write's value argument`. The index is a declared member position, not a key position.
- **Member-key position.** A key holding a lone surrogate cannot be spelled; its path segment is `'<key: a string carrying a lone surrogate>'`. The key is never dropped and the whole value is refused.
- **Class position.** The class spelling is the exact reason text in `contract.md §2`, never a converted class and never a marker letter.

**The failing target's own spelling is PART ONE's `<subject>`.** The store's target rule quotes it; the package does not add a second quoting. `[A1 bindings/js/index.mjs:819 | valueTargetSpelling; :891 | valuePosition]`

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

**A depth or node refusal uses row 8's class (`a value over the walk ceiling`) and the same status.** It is not `ValueNotAdmitted`, and it is not a store-produced error. `[T]`

## §5 — THE `-0` PIN

**`-0` normalizes to `0` at the binding boundary.** The sign of zero is not a crossing a caller may rely on; the store's own sign behavior is unmoved. `[A2 docs/decisions.md · A140]`

## §6 — COPY DISCIPLINE FOR PARAMETERS

**Every admitted parameter is deep-copied once in the direction it travels.** No member is shared, no node is aliased, and no second copy is made. A caller's mutation after a member is visited is not observed; a mutation before the visit is. The crossing does not snapshot. `[A2 docs/decisions.md · A140; contract.md §4]`
