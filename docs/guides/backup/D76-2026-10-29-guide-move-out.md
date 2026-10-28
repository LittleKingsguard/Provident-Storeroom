# Archive — the two superseded passages moved out of the consumer guide on `2026-10-29`

**This file is the ONE HOME of the two passages moved out below, under `RCA-8(g)`: the superseded bytes are MOVED OUT BYTE-EXACTLY and the source leaves a ONE-LINE POINTER, never the displaced text beside its replacement.** **No rule lives here: this is the record of what WAS, and a drive may assert nothing from it.** **The move is `D-76` ITEM 3, on the downstream's `DEF-AT`, and it is the discipline this guide's own consumers apply to their own documents.**

**WHY THESE TWO AND NOT A THIRD.** **Both are passages the guide still printed after a later clause in the same document had superseded them:** **the first is contradicted two paragraphs below it in `§7.8`** (by `D-56`, and by measurement); **the second is falsified by `§7.8`** (and by the measurement that section prints). **Each is the class `RCA-8(g)` keeps meeting — a correction applied at one site and not at the others — and the remedy it prescribes is not annotation but a move.**

**THE SOURCE PATHS AND PRE-MOVE LINE RANGES.** **Both regions stood in the CANONICAL guide, `docs/guides/package-use.md`, whose bytes are the authored home; `bindings/js/README.guide.md` is its generated landing and carried the same bytes until this move.** **The line numbers are those of `package-use.md` as committed at `HEAD` immediately before this pass (`9e7a766`), and they are the numbers `D-76` cites for the second passage only by its own, earlier reading — that record prints `:1979` for it, which is a line number of an earlier tree; the figure that governs is this table's.**

| § | Source path | Pre-move lines | Bytes | `sha256` of the region as moved |
| --- | --- | --- | --- | --- |
| `§1` | `docs/guides/package-use.md` | `1044`–`1046` (the sentence, not the whole lines) | `227` | `b1f5f52556c4869716749645a81e1862db4b3c88e89a34d030b7a64db7f05943` |
| `§2` | `docs/guides/package-use.md` | `2006` (one line, the whole of it) | `2,194` | `13ac606f04649047541cb06ed94ef01754d1c212056a973719ba6636d3518c7b` |

**AND THE ONE FIGURE THAT IS NOT THE SOURCE'S: `§2`'s source line is `2,195` bytes INCLUDING its terminating newline, and the `2,194` above is the QUOTATION's own count** — a blockquote carries no last newline, so the hash fixes the bytes quoted below and not the line terminator. **`§1`'s `227` is the sentence's own count with the newlines INSIDE it included.**

**PARITY LIMBS `A133` REQUIRES:** **limb (i)** — each moved region is ABSENT from its source and the source prints a one-line pointer in its place: **HOLDS**, checked by search in this pass. **limb (ii)** — the content below is the content hashed above, taken at the move: **HOLDS**, and the hashes were taken from `git show HEAD:docs/guides/package-use.md` so they fix the PRE-MOVE bytes and not the post-move tree.

---

## §1. MOVED OUT OF `docs/guides/package-use.md` — *"A pair at an ANCESTOR address is not asked by the delete's pass"*

**Where it stood:** `§7.8`'s delete paragraph, the SECOND of the three sentences that paragraph printed, at lines `1044`–`1046`. **The bytes that remain at those lines are the two sentences around it; the moved sentence is the three-line span quoted here.**

**Why it moved:** **`D-56` rules the opposite** — *"A listener/constraint should fire when the descendants of their targeted address node change, because the descendants become part of the object that is read from that address"* — **and the guide's own `§7.8` clause two paragraphs below prints the corrected rule AND the measurement of it** (the ancestor pair is asked, its refusal crosses, the delete rolls back). **So the passage was contradicted by the same document, a few lines away, in the same section.** **The bytes, byte-exactly as they stood at the source:**

> **A pair at an ANCESTOR address is not asked by the delete's
> pass** — the pass keeps the write's exact-address rule and not the trigger set's prefix widening — even though
> such a listener DOES fire for the delete (`§6.4`).

**What stands at the source now:** the paragraph's two surviving sentences, and a one-line pointer to this file's `§1` in the moved sentence's place. **The operative rule is `D-56`'s, printed at the same section's clause below.**

---

## §2. MOVED OUT OF `docs/guides/package-use.md` — *"your `delete`'s own pass is still a measurement and not a behaviour … IT NEVER CALLS THE KERNEL"*

**Where it stood:** one line, line `2006`, the whole of it.

**Why it moved:** **`D-55` item `3` BUILT the pass that clause said no shape at that version admitted** — a `delete` now has a commit and an attempt of its own kind, runs a pass at its own journal op, appends that attempt's `outcome` entry, and delivers AFTER it — **so the clause is FALSE of the shipped tree, and the guide's own `§7.8` above prints the operative statement and the measurement.** **The bytes, byte-exactly as they stood at the source:**

> **⟶ AND YOUR `delete`'S OWN PASS IS STILL A MEASUREMENT AND NOT A BEHAVIOUR, 2026-10-28 — `D-55` ITEM 3 · `DEF-X`.** `RCA-8(g)` ANNOTATE-BESIDE: **every clause of this section and of §12.6 above stands BYTE-FOR-BYTE; this clause answers the question a consumer asked about `1.2.0` by measuring `1.3.0`.** **THE RULING, THE ARCHITECT, VERBATIM: *"A delete is an editing verb and must pass constraints. This includes all of the relevant commit and message logic."*** **SO IT MUST — AND NO SHAPE AT THIS VERSION ADMITS ONE, WHICH IS WHAT THE MEASUREMENT SAYS RATHER THAN WHAT AN INTENTION SAYS.** **A `delete`'s path, verb by verb:** the entry's `delete` opens a commit window of its own (`openCommits` is `1` inside its delivery), calls the addon's `delete` entry, builds the record `{address, tiers, triggered, op}`, delivers the triggering set, reads the witness and closes the window. **IT NEVER CALLS THE KERNEL**: no `K-2` opens an attempt, no `K-3` runs a pass, no message log is minted and no terminal entry is appended — so the pair standing at the deleted address is asked exactly as often as its registration asked it, and NOT ONCE FOR THE DELETE. **AND THE ONE PASS SHAPE THE ARTEFACT HAS CANNOT STAND IN**: `K-2` **LANDS A WRITE OF ITS OWN BEFORE `K-3` JUDGES**, so a pass driven at the deleted address judges a state the delete is not in (measured: the store after it holds the value `K-2` wrote). **WHAT WOULD HAVE TO BE BUILT, SAID PLAINLY AND NOT BUILT HERE:** **a delete would have to be GIVEN a commit and an attempt of its own** — a `K-2`-shaped opening that takes the delete's own op instead of a write's, a commit list minted for it, a pass over the pairs standing at the deleted address against the state the delete leaves, a terminal arm that appends that log's `outcome` entry, and the delivery moved AFTER the pass so its listeners see a judged state — **and the current `delete` verb has none of those.** **A delete performed INSIDE a pass IS judged**, and that is the third case §12.6 above declares — but that is the pass's check, not the delete's. (`tests/e2e/discard-witness.mjs`'s `DW-10.8` prints the path, the counts and the pass shape it drove.)

**What stands at the source now:** a one-line pointer to this file's `§2` in the clause's place, naming `§7.8` as the operative statement. **The ruling the clause recorded — `D-55` item `3`, verbatim: *"A delete is an editing verb and must pass constraints. This includes all of the relevant commit and message logic."* — stays legible here and at the guide's `§7.8`, and the SHAPE it said would have to be built was built in `1.4.0`.**
