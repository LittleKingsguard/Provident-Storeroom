# ARCHIVE — the bytes the `A122` pass of 2026-10-16 moved out of `docs/specs/storeroom-js/`

**This file is the one home of the clause `docs/specs/storeroom-js/surface.md` displaced on `2026-10-16`** —
it NAMES its source path and its `§`, and it is written under `RCA-8(g)`: **the superseded bytes are MOVED
OUT byte-exactly and the source leaves a ONE-LINE POINTER, never the displaced text beside its
replacement.** **No rule lives here: this is the record of the clause that WAS, and a drive may assert
nothing from it** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a relocation carries its
text and moves no claim; `RCA-8(g)` — move out, leave a one-line pointer | requirement]`).

---

## §1. MOVED OUT OF `docs/specs/storeroom-js/surface.md §2.6` (the section's whole text, as filed)

**Reason for the move: the `CLIENT-SIDE` premise is FALSIFIED FOR THE WRITE PATH by `A122`
(`docs/decisions.md`, 2026-10-16) — a four-position `write` enters the kernel's `K-2`, so the entry-side
crossing this clause declares is not the whole of the path — and the operative law now stands at
`docs/specs/storeroom-js/surface.md §2.12`.** **The bytes, byte-exactly as they stood:**

**CONSTRAINT AND REPAIR EVALUATION IS CLIENT-SIDE.** **The JS side holds the constraint functions; the
crossing this subject needs is ALREADY IN the surface (`write` out, `rollback` in).** **The pattern, stated
in full because it is the whole of what this unit declares about it:** **evaluate constraints AFTER a
`write` returns; on a violation, call `rollback` with the `JournalOp.opId` THAT WRITE RETURNED.**
**NO constraint verb, NO repair verb, NO constraint parameter, NO constraint record and NO function-carrying
parameter is declared — and the store's own surface takes no function at any position** (`DD-16`).
(`[A1 docs/specs/storeroom-js-proposal.md §15 · A73 — *"Constraint/Repair is client-side, using rollback to
reverse constraint violations."*; A3 docs/specs/storeroom-native/contract.md §7.3 — the constraint seam's
own boundary | requirement]`)

---

## §2. MOVED OUT OF `docs/specs/storeroom-js/contract.md §1`'s `Q1` amendment index table, THE MODULE-NAMESPACE CELL (the cell's operative sentence, as filed)

**ADDED 2026-10-16 — the repointing-and-supersession pass (`role_spec_writer`).** **Reason for the move: the
cell's figure is SUPERSEDED by the two dated clauses of 2026-10-16 — `docs/specs/storeroom-js/surface.md §2.9`
item 1's dated clause (`8 → 9` at the module namespace) and `§2.4` item 9 (f)'s dated clause (`4 → 5` at the
instance's own member set) — so the operative reading of the cell stands at those two clauses and the cell
itself leaves a one-line pointer.** **The bytes, quoted byte-exactly as they stood at their own row:**

> **UNMOVED: `8` verbs, no ninth, and NEITHER `on` NOR `off` is a named export** (`§2.9` item 1)

**AND THE ONE-LINE POINTER THE SOURCE CARRIES FROM THIS DATE:** *"the operative figures are `§2.9` item 1's
dated clause of 2026-10-16 (NINE named exports) and `§2.4` item 9 (f)'s dated clause of the same date (FIVE own
members); the superseded cell is at `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md §2`."*
**AND THE BOUNDARY OF THE QUOTE IS DECLARED SO NOTHING IS LEFT TO A BYTE DIFF: the quoted bytes above are the
whole of the superseded region's own sentence, and the ONE clause the source cell carried BESIDE it — its
trailing cross-reference — is the cell's own and is NOT a byte the source moved out.** **NO RULE LIVES HERE:
a drive may assert nothing from this section** (`RCA-8(g)`; `docs/decisions.md` · `A123`, 2026-10-16).

---

**END OF THE ARCHIVE.** **TWO REGIONS, EACH NAMED BY ITS SOURCE PATH AND `§`; each source leaves a one-line pointer
and re-emits no byte of it; the operative declarations are `docs/specs/storeroom-js/surface.md §2.12` and
`§2.9` item 1's and `§2.4` item 9 (f)'s dated clauses of 2026-10-16** (`RCA-8(g)`).
