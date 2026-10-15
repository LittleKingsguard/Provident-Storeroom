# Handoff — store-side defects surfaced by `U-STOREROOM-CONSTRAINTS` (2026-10-13)

**To:** the store's own units (`storeroom-native`, `storeroom-js`) and the architect.
**From:** the gate supervisor for `U-STOREROOM-CONSTRAINTS` (the constraint/repair kernel at `bindings/js/src/constraint-kernel.mjs`, `55,930` B, five exports).
**Why:** gate 6's independent LIVE runs of the unit's battery found that two behaviours the unit's contract attributes to the store do not hold on the shipped package. **Nothing in the package was patched** — these are recorded here and in `docs/defects.md`, as the process requires.

## 1. `DEF-2026-10-13-K` — the store's own delivery INVOKES registered bodies inside the verb call

The store's declared law: **the store never invokes anything — it RETURNS the handles** (the unit's `kernel-surface.md §2.2` item 2, read from the store's own surface docs).

**Observed live** (gate 6, second run, `scratch/live-constraints-gate6-v2-out.txt`):

| window | what ran by the time the kernel's own `commit` returned |
| --- | --- |
| same-address registration | the body ran **1×** — with the **store's** argument `[['a']]` — while the caller's own loop invoked **0** entries |
| descendant window | the body ran **1×** by `K-2`'s return against the caller's own loop's **1** |
| beta window | the body ran **2×**, one of them **re-entrant inside the body's own `K-2`** |

**Consequences the unit cannot absorb caller-side:** the clause *"the caller's own loop is layer (b)'s only invoker"* is false live; a verb call issued inside a delivered body meets the kernel's own `KC-7` hold, and that throw travels back up the **caller's own `K-2`**, which then returns **no record at all**. The blind greens set parks `E2E-C-8.7` because of it.

## 2. `DEF-2026-10-13-L` — the store's own `write` return carries no `pending` member

**Observed live:** a caller's own `store.write` under a registration returns `keys = ["op", "watched", "triggered"]` — **no `pending`**, and no `CommitRecord` on any caller-side verb call. The kernel's `CommitRecord.pending` (the handles the caller's own loop invokes) is therefore sourced from `triggered` alone, and the battery's delivery-layer rows (`E2E-C-8`, `E2E-C-10`, `E2E-C-16`) cannot be driven to their declared observations on the closed surface.

## 3. The store-side layer the unit records as `OWED` (not a defect — a boundary)

The unit's claims that depend on the store evaluating constraints **at every landing** (the per-landing address-scoped pass) and on a **non-null `checkpoint`** are `OWED` to the store-side pass (`J-20`–`J-22`, `contract.md §0.1` item 5 (i)). Every node cell in the unit reads `checkpoint: null`; the unit's green is **envelope-green** on that layer and says so (`RCA-12`). The architect's ruling `A111` withdrew the failed commit's pre-state claim for the same reason: the store's own `rollback` is subtree-total (`write-and-read.md §6.4` — `M-5` scope, `M-7` backward walk, `M-8` totality), so a failed commit at an address the caller already wrote to undoes the caller's own earlier write there, and no caller-side target can aim past it.

## 4. What the store-side units would need to decide

1. Re-declare the delivery law (who invokes a registered body, and when) — `DEF-2026-10-13-K`.
2. Declare the `pending` member of a write's own return, or state that the caller's handles are read from `triggered` alone — `DEF-2026-10-13-L`.
3. The op-scoped rollback / per-landing pass that would make the unit's `OWED` claims deliverable — `J-20`–`J-22`.
