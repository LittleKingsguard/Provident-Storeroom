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

**END OF THE ARCHIVE.** **One region, NAMED by its source path and `§`; the source leaves a one-line pointer
and re-emits no byte of it; the operative declaration is `docs/specs/storeroom-js/surface.md §2.12`**
(`RCA-8(g)`).
