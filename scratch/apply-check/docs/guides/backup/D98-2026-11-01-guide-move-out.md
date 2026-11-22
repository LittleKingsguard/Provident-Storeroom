# Archive — the superseded passage moved out of the consumer guide on `2026-11-01` (`D-98`)

**This file is the ONE HOME of the passage moved out below, under `RCA-8(g)` — the superseded bytes are MOVED OUT
BYTE-EXACTLY and the source leaves a ONE-LINE POINTER, never the displaced text beside its replacement** (`DEF-2026-10-02`'s
project convention, and `strata/walkthrough.md` §4's first spelling). **No rule lives here: this is the record of what
WAS, and a drive may assert nothing from it.** **The move is `D-98` item 5's, and its declaration is
`docs/L1/cross-kind-handle-only.md` §4.1.**

**WHY IT MOVED, AND THE GROUND IS `D-98` ITEM 5's OWN SENTENCE: it is the measurement OF THE DEFECT and not of the
rule.** `strata/decisions.md` `D-98` (`:5033`–`:5034`) names the passage with that verdict in as many words —
*"`docs/guides/package-use.md`'s `§7.3` (`:920`–`:932`, **whose 2026-10-26 measured paragraph at `:927` is the
measurement OF THE DEFECT and not of the rule**)"*. **So what it measured is a refusal the ruling DECLARES LAWFUL** —
`D-98` item 1 (i): *"A constraint pair and a listener MAY stand at ONE ADDRESS"* — and a consumer guide that prints
the defect's own measurement beside the corrected rule teaches the refusal the guide no longer makes. **The bytes
therefore leave the shipped document and its one pointer stands in their place; the rule they measured is stated at
`§7.3`'s clause of this date, as the guide's own content.**

**THE SOURCE PATH, THE PRE-MOVE LINE RANGE, AND THE DATE — with the computed hash of the moved bytes.**

| § | Source path | Pre-move lines | Date | Bytes | `sha256` of the region as moved |
| --- | --- | --- | --- | --- | --- |
| `§1` | `docs/guides/package-use.md` | `927`–`932` (six whole lines) | `2026-11-01` | `623` | `6e27608136c6d2a6418d8136018851dd6bcbd901ded2387732dcf52406183388` |

**THE INSTRUMENT, PRINTED BECAUSE A HASH WITHOUT IT IS NOT A MEASUREMENT.** The region is the six lines `927`–`932` of
`docs/guides/package-use.md` **as the tree stood at `HEAD` immediately before this pass**, taken whole-line and with
their terminating newlines, and the figure is `sed -n '927,932p' docs/guides/package-use.md | sha256sum` run at that
tree — read at that byte range and at no other. Beside the hash, four counts the same extraction gives: **`6` lines**
(`wc -l`), **`623` bytes** (`wc -c`), **a final byte of `\n`** (`tail -c 1 | od -An -c`), and **no trailing space on
any of the six lines** (`grep -n ' $'` returns nothing). **`bindings/js/README.guide.md`'s copy of the same region was
byte-identical to it on that tree** (`cmp -s docs/guides/package-use.md bindings/js/README.guide.md` exits `0` at
`301345` bytes each), so the same six lines and the same hash stood at the generated landing as well, and this move
lands at both because the landing is re-staged from the canonical text and never hand-edited
(`scripts/publish.sh:167`–`:182`; its drift guard at `:1069`–`:1074`).

**PARITY LIMBS, STATED SO THE MOVE CAN BE CHECKED RATHER THAN TRUSTED.** **limb (i)** — the region is ABSENT from its
source and the source prints a one-line pointer in its place: **HOLDS**, checked by search over
`docs/guides/package-use.md` in this pass (the opening words *"Measured 2026-10-26, from the constraint-then-listener
direction"* occur nowhere in that file after the move). **limb (ii)** — the content below IS the content hashed
above, taken at the move, and the hash was taken from the PRE-MOVE bytes (the `HEAD` tree) so it fixes the region as
it stood and not the post-move tree: **HOLDS**, and it is reproducible from this file alone by the extraction named
under `§1`.

---

## §1. MOVED OUT OF `docs/guides/package-use.md` — *"Measured 2026-10-26, from the constraint-then-listener direction"*

**Where it stood:** `§7.3`'s second paragraph, `docs/guides/package-use.md` lines `927`–`932`, the whole of the
paragraph and nothing of its neighbours. **The bytes that remain at `§7.3` are the heading and the rule paragraph
that preceded it, the dated clause of `2026-11-01` that states the corrected rule, and the one-line pointer.**

**Why it moved:** **`D-98` declares the act it measured LAWFUL** — `listen('h1', [['a']])` beside a constraint pair at
`['a']` under a DIFFERENT handle stands, because *"the restriction is that a listener and a constraint cannot have the
same **handle**"* — **so the passage prints the defect's measurement and not the rule** (`D-98` item 5, quoted above),
and its own shared rule sentence read the **address** (*"a listener and a constraint do not share one"*) where the
ruling reads the **handle**. **What replaces it is the law itself, stated at the guide's `§7.3` as that section's own
content** — a pair and a listener at ONE address are lawful, the restriction is the handle in both directions, and a
`listen` at a pair's address STANDS — **and the exact four refusal texts that now carry the rule are
`docs/L1/cross-kind-handle-only.md` §3.4 and §3.6's, asserted whole at the five cell homes named there.**

**The bytes, byte-exactly as they stood at the source** — between the fences and with no prefix added by this record,
so the block IS the hashed region (`623` bytes, `6` lines, `sha256`
`6e27608136c6d2a6418d8136018851dd6bcbd901ded2387732dcf52406183388`):

```text
**Measured 2026-10-26, from the constraint-then-listener direction:** with `c1` armed at `['a']`,
`store.listen('h1', [['a']])` threw the **one plain form** — `Object.keys` `["status","message","log","address"]`, `status`
`'AddressMalformed'`, `log` `[]` — whose message names BOTH sides and carries the shared rule sentence **"a
listener and a constraint do not share one"**. **The form is the surface's one thrown form and NOT a `TypeError`**
(`index.d.ts`, `addConstraint`'s and `register`'s cross-kind clauses). **No state moves: the rejection is taken
after the positions' class tests and before any store call.**
```

**What stands at the source now:** ONE pointer line, in the paragraph's place, naming this record and this section —
*"the measurement that stood here measured the address refusal this guide's rule no longer makes; its bytes are at
`docs/guides/backup/D98-2026-11-01-guide-move-out.md §1`."* — **and the corrected rule stands above it as `§7.3`'s own
dated clause, so a consumer reads the law first and the withdrawn measurement's address second.**
