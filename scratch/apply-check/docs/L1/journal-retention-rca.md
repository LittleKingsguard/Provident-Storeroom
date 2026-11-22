# RCA — memory grows although the journal is capped and the store does not grow

**THE QUESTION, IN THE ARCHITECT'S WORDS:** *"why the memory usage is expanding even when the journal is capped and the store is remaining the same size"*.

**THE ANSWER IN ONE SENTENCE: THE CAP IS A MARK AND NOT A BOUND — `journalLength` bounds the count of entries whose `op.compacted` is FALSE, while EVERY entry additionally carries the COMPLETE LIST of already-compacted op ids at the moment it was written, a list that grows by one id per write, is re-cloned on every write, and is never dropped.** The journal's total size is therefore **quadratic** in the write count, and the per-write cost rises **linearly** with it.

Written `2026-11-17` by the **L0 supervisor** from measurement and from the bytes. **It moves nothing, cures nothing and chooses no design** — §6 prices four cures and picks none.

---

## §1 · The mechanism, at its bytes

**EVERY WRITE DOES THIS, IN THIS ORDER.**

1. **`src/store.rs:2653`–`:2659` — A FRESH CLONE OF ONE STRING PER ALREADY-COMPACTED ENTRY, ON EVERY WRITE.**

   ```rust
   let compacted_before: Vec<String> = self
       .journal
       .iter()
       .filter(|entry| entry.op.compacted)
       .map(|entry| entry.op.opId.clone())
       .collect();
   ```

   **On the N-th write that vector has `N − journal_length` elements**, and every element is a fresh `String` clone of an op id.

2. **`src/store.rs:2299`–`:2334` — `append` STORES IT IN THE ENTRY IT PUSHES.**

   ```rust
   self.journal.push(Entry { op, captured, after, home, compacted, saved: false });
   ```

   So **entry N carries a list of `N − journal_length` op ids**, and that list is retained for the life of the store.

3. **THE COMPACTION LOOP BOUNDS THE FLAG AND NOT THE VECTOR.** The loop counts `!entry.op.compacted`, breaks at `journal_length`, and otherwise **sets the oldest uncompacted entry's flag true** — and, once per step, re-assembles the whole base state:

   ```rust
   self.journal[oldest].op.compacted = true;
   self.base_state = self.assemble_all(self.register_ref);   // a FULL register snapshot, per compacted entry
   ```

4. **AND NOTHING EVER REMOVES AN ENTRY.** `journal` is only ever **pushed to** (`:2310`); the file carries **no `retain`, no `truncate`, no `remove`** on it. **The vector grows by one entry per write for the store's whole life**, which is exactly why the cap does not bound memory.

5. **THE LIST IS LOAD-BEARING, WHICH IS WHY IT IS STORED AND NOT DERIVED.** `restore_compaction` (`:2212`–`:2217`) re-marks entries from it on a reconstruction (`entry.op.compacted = compacted.contains(&entry.op.opId)`), so the list is how a rebuilt store re-learns which ops were compressed. **The defect is its SIZE and its PER-WRITE CLONE, not its purpose.**

---

## §2 · The arithmetic, and the measurement that confirms it

**If the retention is the per-entry list, the per-write cost is `(N − journal_length)/2 × (size of one op id)`** — the mean list length times one `String` clone (~60 bytes with heap overhead).

| `journalLength` cap | N writes | measured KB/write | predicted KB/write |
|---|---|---|---|
| 64 | 1,000 | 46 | 27 |
| 64 | 2,000 | 61 | 57 |
| **64** | **4,000** | **115** | **115** ✓ |
| 1,024 | 4,000 | 75 | 87 |
| 4 | 4,000 | 116 | 117 ✓ |

**AND THE TOTAL IS QUADRATIC, WHICH IS THE SAME FACT SEEN FROM THE OTHER SIDE** — one store, `journalLength: 64`, an unchanged single-key register:

```
N = 1,000   rss +  47 MB
N = 2,000   rss + 125 MB      (× 2.7 for × 2 writes)
N = 4,000   rss + 472 MB      (× 3.8)
N = 8,000   rss + 1,850 MB    (× 3.9)
N = 16,000  rss + 7,277 MB    (× 3.9 — and the Node heap gives out here)
```

**A factor of ~4 for a doubling of N is a quadratic, and the only quadratic term in the write path is the list in §1 item 1.**

---

## §3 · Why the second realm dies at ~12,000 writes

**The same quadratic on a fixed heap.** The WASM module's linear memory is bounded; the first run of this drive read **8,000 writes OK · 12,000 OK · 16,000 `RuntimeError: unreachable` at `alloc::rust_oom`**. **It is not a different defect and not a wasm-specific one** — it is the same curve meeting a lower ceiling, which is also why the arm's writes cost ~200 µs against the Node arm's: the clone in §1 item 1 is on the hot path and grows with the store's age.

---

## §4 · What is ruled out, and by what

| the hypothesis | the probe that refutes it |
|---|---|
| **"the journal holds too many ops"** | the rate does **not** track the cap: `124` · `113` · `75` KB/write at caps `4` · `64` · `1024` for the same 4,000 writes. It tracks the **difference** `N − cap`, which is the list's length — not the op count. |
| **"a per-address history grows"** | 8,000 writes to **one** address cost 226 KB/write and 8,000 writes to **8,000 distinct** addresses cost 226 KB/write — identical, and the list is op ids, which carry no address. |
| **"V8 is leaking"** | `heapUsed` grows ~**3.7 KB/write** while `rss` grows 226 KB/write at the same point: **the quadratic term is native, not JS**, and the ~3.7 KB is the package's own per-write records, a separate and much smaller summand. |
| **"the register is growing"** | the drive writes the same one-key value (`{a: 1}`) to the same address every time: **the store's observable content is constant**, which is the question as asked. |

---

## §5 · The second cost, which is separate

**`self.base_state = self.assemble_all(self.register_ref)` runs INSIDE the compaction loop** — once for every entry it compacts. Once the journal is full, **every write compacts one entry and therefore rebuilds the register's ENTIRE snapshot**. On a store with a large register that is **O(store size) work per write**, plus a large transient allocation per write that the allocator need not return to the OS.

**IT IS NOT THE QUADRATIC AND IT IS NOT THE RETENTION** — `base_state` is *replaced*, so the previous snapshot is dropped — **but it is the reason RSS is a misleading instrument here, and it is a real cost on a big store.**

---

## §6 · The cures, priced and not chosen

**THE JOURNAL'S SEMANTICS ARE A DECLARATION, NOT AN IMPLEMENTATION DETAIL** — compaction deliberately does not drop history, because `RollbackCompacted` exists precisely to *refuse* a rollback past the floor while still being able to *name* the ops that were compressed. **So no cure below is taken by this document.**

| cure | what it costs | what it buys |
|---|---|---|
| **(a) STORE ONLY WHAT THIS WRITE MARKED** (0 or 1 ids) instead of the whole set, and let a replay accumulate the lists **in journal order** | `restore_compaction` changes from a *set membership* test to an ordered fold; one clause of the replay's contract | **O(1) per write, linear total** — the quadratic disappears with no semantic change |
| **(b) DERIVE IT** — the compacted set is exactly the prefix of entries before the last `journal_length` uncompacted ones, so the list need not be stored at all | `restore_compaction` recomputes from the journal's own order; the field `compacted: Vec<String>` and its per-write clone both vanish | **nothing is stored, nothing is cloned**; the smallest diff of the four |
| **(c) TRUNCATE THE JOURNAL to the base state** and keep `base_state` + the last `journal_length` ops | the biggest change: every consumer of `journal[index]` (`rollback`, `restoreMark`, the reverse walk, `durable_projection`) must read the floor through `base_state` — **and that is what `base_state` was built for** (`:2331` calls it *"the walk's floor"*) | **a real bound**: memory becomes O(store + journal_length) |
| **(d) STORE A COUNT instead of ids** — the compacted prefix's length | `restore_compaction` re-marks by position | O(1) storage; keeps the field's shape |

**AND ONE CELL IS OWED WHATEVER IS CHOSEN**: a drive that takes N writes and reads **`heapUsed` (not `rss`)** against a declared ceiling. **No such cell exists**, which is why a quadratic that a store reaches in twelve thousand writes has lived through every green battery this session ran.

---

## §7 · THE CURE LANDED `2026-11-17` — `D-160` took arm (c), and the drive is re-taken

**THE ARCHITECT'S *"Compaction dropping history is the point"* IS `D-160`, AND THE JOURNAL NOW DROPS.** The per-entry `compacted: Vec<String>` — the list of every already-compacted op id, cloned on every write — is **gone**, with the field on `Entry`, the parameter on `append`, the `compacted_before` clone at `:2653`, the `regenerate` filter that skipped marked entries, and `restore_compaction` with both of its callers. **The loop now `remove`s the oldest entry and keeps the `base_state` rebuild it already did.**

**★ AND THE MARK LOOKED NECESSARY FOR ONE REASON, WHICH THE PATCH REFUTED AT THE BYTES.** A dropped op must answer `RollbackCompacted` while an id that never existed answers `JournalOpUnknown` — and with the ids gone the two look alike. **The discriminator is a watermark and not a list**: `journal_floor` carries the ordinal of the last dropped op, **in the ids' OWN numbering** — and **this document's §6 assumed `op-<seq>`, which is FALSE**: `op.seq` is the journal's per-instance append ordinal while the id comes from a process-wide atomic (`src/store.rs:38`, `:60`–`:62`), so **two instances both start `seq` at 1 and take different ids, and no op-id parser existed anywhere in `src/`.**

**THE RCA'S OWN DRIVE, RE-TAKEN ON THE FIXED TREE** — one store, one unchanged address, `journalLength: 64`:

| N writes | `rss` before | **`rss` now** | `heapUsed` per write |
|---|---|---|---|
| 1,000 | 47 MB | **19.0 MB** | 4.9 KB |
| 2,000 | 125 MB | **27.9 MB** | 2.9 KB |
| 4,000 | 472 MB | **43.4 MB** | 3.7 KB |
| 8,000 | 1,850 MB | **56.5 MB** | 2.9 KB |
| 16,000 | 7,277 MB | **110.1 MB** | 2.4 KB |

**7,277 → 110.1 MB is 66×, and the doubling ratio is now `1.47 · 1.56 · 1.30 · 1.95` where the old tree read `2.7 · 3.8 · 3.9 · 3.9`** — **the per-write cost FALLS with N instead of rising**, which is what a bounded journal looks like.

**AND THE ARM THAT DIED AT 16,000 NOW DOES 40,000** — driven live on the staged WebAssembly package: **40,000 writes in 3,819 ms (`95 µs/write`, against ~200 µs before), the value read back intact**, and the two refusals distinct on the Node arm: **a rollback to the DROPPED op answers `RollbackCompacted`; an id never minted answers `JournalOpUnknown`.**

**THE CELLS**: `tests/e2e/journal-compaction.test.mjs` (three: the two refusals at a dropped id and an unknown one; the journal bounded with every verb still answering; **a memory ceiling that reads `heapUsed` and not `rss`, declared at `16 KB` per write against a measured `4.66`–`4.74`, with the old figure `~115 KB/write` stated in its message so a return to the quadratic cannot pass**), plus the re-cut Rust and JS cells listed in the envelope.

**MEASURED, EVERY LEG.** `npm test` **`1362` / `1361` / `0`** · `npm run typecheck` **exit `0`** · `cargo test` **22 `ok` / 0 FAILED** · `cargo check --target wasm32` **0 errors** · `npm run build` **exit `0`** · the package stages.

**AND ONE DECLARATION THIS CURE PUTS BACK IN FRONT OF THE ARCHITECT.** `journalLength` is now **the width of the compensation window**: where the window has taken an op that a composition must reverse, the store refuses and the landed edits stand. **`D-108` item 2's *"no landed edit survives a refusal … unconditional"* is therefore CONDITIONAL ON THE WINDOW'S WIDTH again**, and that is a ruling this document does not make.

---

## §8 · THE SECOND RETENTION — WHAT THE 4.7 KB IS, LITERALLY

**THE ARCHITECT ASKED WHAT DATA IS STORED TO REACH A ~4.7 KB PER-WRITE FIGURE. THE ANSWER IS TWO THINGS, AND NEITHER OF THEM IS THE STORE'S JOURNAL.**

### 8.1 · MOST OF THE FIGURE IS UNCOLLECTED GARBAGE, NOT RETENTION

**`heapUsed` counts LIVE PLUS NOT-YET-COLLECTED.** With the collector pinned (`global.gc()` twice on each side of the drive, `--expose-gc`), the same 4,000-write drive reads:

| | per write |
|---|---|
| **unpinned** (what `JC-MEMORY` measures) | **~10 KB allocated** |
| **pinned** (`gc()` on both sides) | **~0.8 KB RETAINED** |

**So ~9 of the ~10 KB is garbage the collector had not taken yet**, and the cell's `4.66–4.74` is that mix at its own moment. **The pinned figure is the one that describes the store: ~0.8 KB per write.**

### 8.2 · AND THE 0.8 KB IS A KERNEL REPORT PER WRITE, IN A MAP NOTHING EVER PRUNES

**THE RETAINED BYTES ARE `kernel.closed`**, and they are the package's, not the store's:

- **`src/entry/kernel-terminal.mjs:128`** — `kernel.closed.set(attempt.ref.id, attempt.report)` on the terminal arm;
- **`:158`** — the same on the failed arm, with its report `{ outcome: 'failed', ops: attempt.ops.slice(), log: attempt.log, rollback: attempt.rollback.slice() }`;
- **`:481`** — `dropHandoff` writes `{ attempt, outcome, ops, rollback }` under the same map;
- **`src/entry/kernel-registration.mjs:1146`** — the registration instant's own report.

**AND NOTHING DELETES FROM IT.** `grep` finds `closed.set` and `closed.get` (four readers: `kernel-attempt.mjs:291`, `kernel-terminal.mjs:449`, `:505`) and **no `closed.delete`, no prune, no cap, no clear** anywhere in `src/entry/`. **So every write leaves one attempt record and its report in an unbounded `Map` keyed by attempt id, for the life of that store's kernel** — the kernel being the object at `store[KERNEL_SLOT]` (`kernel-foundations.mjs:710`).

**THE SHAPE, MEASURED, PER VERB** (4,000 calls, collector pinned):

| the call | retained per call |
|---|---|
| **`write`** | **~700–745 B** |
| `read` | ~27 B |
| `constraints()` (no store call) | ~4 B |

**`write` is the only verb with an attempt, and the attempt is the retained thing** — one report carrying the attempt record, its `ops` and `rollback` arrays (both sliced fresh) and its `log`.

### 8.3 · SO THE SAME DEFECT EXISTS TWICE, ONE LAYER APART

**`D-160` fixed the store's half: the journal marks became drops and the per-entry op-id list went.** **The package's half is untouched and has the same shape** — a `Map` keyed per act, written on every act, read back by id, and never pruned. **It is why `JC-MEMORY` still reads ~4.7 KB after the store was bounded, and it is why the pinned figure is not zero.**

**WHAT IT NEEDS, PRICED AND NOT CHOSEN** (it is the package's, and the kernel's attempt lifecycle is declared in `attempt-lifecycle.md`):

**⟶ AND THE ONE IS CHOSEN, `2026-11-17` — `D-162` TOOK THE FIRST CURE, AND §9 IS ITS LANDING** (`RCA-8(d)`
ANNOTATE-BESIDE: **the three cures below stand BYTE-FOR-BYTE as the reading of this section's date and are read THROUGH
this clause**). **THE ARCHITECT'S INSTRUCTION WAS *"Proceed with fix for package-side defect"*, AND THE CURE IT BUYS IS
CURE `1` WITH A NUMBER ATTACHED: `CLOSED_ATTEMPT_WINDOW = 1024`, one writer (`sealClosedReport`) at all four seal
points, and the `Map`'s own insertion order as the FIFO** (`strata/decisions.md` · `D-162` items 1–3). **What a pruned
id meets is `KC-2`, the same refusal an id that never named an attempt already met** (`D-162` item 4), **and the
declaration it implies is stated so it can be overruled: a closed attempt's record is retained for the most recent
`1024` attempts and not for the store's whole life** (`D-162` item 5). **CURES `2` AND `3` STAY PRICED AND UNCHOSEN, AND THIS
PASS DOES NOT RE-OPEN THEM: `D-162` item 5 NAMES CURE `2` — *"a `WeakMap` keyed by the attempt is the alternative that
needs no window at all"* — as the declaration it could be overruled into, and cure `3`'s drop-on-the-terminal-act
remains a decision the same act could take; neither is taken by this tree, and neither is refuted here.**
**AND THE FIGURE MOVED WHERE THIS SECTION SAID IT WOULD: retained per `write`, pinned, `~700–745 B → 0.04–0.19 B`; flat
at `0.75 MB` at both 4,000 and 16,000 writes** (§9's table). **THE CELL THIS SECTION ASKED FOR EXISTS**: `KAW-1` and
`KAW-2` in `tests/e2e/kernel-attempt-window.test.mjs`, the second with the pinned figure in its message and the reason
it reads unpinned stated at its own byte (`D-162` item 6).

1. **BOUND IT BY THE ATTEMPTS THAT CAN STILL BE ASKED ABOUT** — a closed report is read for a *commit record* and by the terminal's own lookups, so the bound is the number of attempts a live commit frame may still name, not the number ever made.
2. **OR KEY IT WHERE IT DIES WITH ITS SUBJECT** — a `WeakMap` keyed by the attempt (or by the commit record) would need no pruning at all, **if the readers hold the attempt rather than its id** — `:291` reads it by an id derived from a commit record, so the record and the attempt are both in hand at that site, which makes the `WeakMap` reachable.
3. **OR DROP ON THE ATTEMPT'S OWN TERMINAL ACT** — `release` already removes the attempt from `live`; the report's retention is a separate decision the same act could take.

**AND THE CELL SHOULD PIN THE COLLECTOR.** `JC-MEMORY`'s figure is a mix, so its message should say which half it bounds; a cell that calls `global.gc()` where available and asserts the RETAINED figure measures the thing the ruling is about.

---

## §9 · THE PACKAGE-SIDE FIX LANDED `2026-11-17` — `D-161`'s map is a window, and the retention is gone

**THE SECOND UNBOUNDED MAP IS BOUNDED, AND IT TOOK TWO ATTEMPTS AT THE MECHANISM — THE FIRST ONE REDDENED A HOSTILE-HOST CELL AND THAT IS THE INTERESTING PART.**

**WHAT LANDED**: `kernel-foundations.mjs` gains **`CLOSED_ATTEMPT_WINDOW = 1024`** and **`sealClosedReport`**, and **all four seal points go through it** (`kernel-terminal.mjs:128`/`:158`/`:481`, `kernel-registration.mjs:1146`) — no path can seal a report and skip the bound. **The window's FIFO is the `Map`'s OWN INSERTION ORDER**: a re-seal deletes and re-sets, so *"the most recent N"* stays true of a repeated seal, and the eviction loop drops the oldest until the size is the window.

**★ AND THE FIRST MECHANISM WAS A PLAIN ARRAY, AND THE CORPUS REFUSED IT AT ITS OWN BYTE.** `closedOrder.push(id)` **reddened `crossing · contract.md §2.1 item (1c)`**: that cell puts a **getter-only accessor on `Array.prototype`'s index `1`**, and a plain array's `push` writes its index through `[[Set]]` — so a lawful `write` **threw** `TypeError: Cannot set property 1 … which has only a getter`, from the seal, inside the store's own pass. **The rule the corpus already carried is that an array the package builds is DEFINED and never SET**; a `Map` writes its own internal table and consults no prototype, **so the fix is immune to that class of host mutation by construction** — and the cell that caught it is the reason to trust it.

**THE MEASUREMENT, WITH THE COLLECTOR PINNED** (`docs/L1/journal-retention-rca.md` §8.1's instrument):

| | before `D-161` | **after** |
|---|---|---|
| retained per `write`, pinned | **~700–745 B** | **0.04–0.19 B** |
| retained at 4,000 / 16,000 writes | 3.26 MB / 12.66 MB (growing) | **0.75 MB / 0.75 MB (flat)** |
| the unpinned figure `JC-MEMORY` reads | ~10 KB/write | ~4.7 KB/write (unchanged — it is garbage) |

**AND THE TWO HALVES ARE HELD APART ON PURPOSE**: `JC-MEMORY` still reads the **unpinned** figure and says so; **`KAW-2`** reads it too and declares a ceiling wide enough for the collector's own garbage, **so what it catches is a return to per-write RETENTION, which runs to hundreds of bytes and thousands once a map is unbounded again** — the pinned figure is in its message as what the fix actually produces.

**WHAT A PRUNED ID CHANGES, AND IT IS NOTHING A CALLER CAN SEE BUT AGE**: `log(store, reference)` answers a held closed attempt with the empty list (its log crossed with the report) and **a pruned id with `KC-2`** — **the same refusal an id that never named an attempt already meets.** `KAW-1` drives both, and asserts the two refusals are equal.

**MEASURED, EVERY LEG.** `npm test` **`1364` / `1363` / `0`** (two new cells) · `npm run typecheck` **exit `0`** · `cargo test` **22 `ok` / 0 FAILED** · `cargo check --target wasm32` **0 errors** · `npm run build` **exit `0`** · the package stages.

**AND ONE DECLARATION THIS FIX IMPLIES, NAMED RATHER THAN BURIED**: **a closed attempt's record is retained for the most recent `1024` attempts and not for the store's whole life.** That is the store's own discipline one layer up (`D-160` item 3 — *history past a window answers a declared refusal*), and it is a declaration the architect may overrule by naming a different window or a different mechanism (a `WeakMap` keyed by the attempt is priced in §8.3 and would need no window at all).
