# Envelope — L4 · `D-119` LANDED

**The L1 envelope below stands unchanged.**

## 1 · VERDICT

**`LANDED-WITH-CONDITIONS`.** Form, cache, carriers, prose and line 6 are at the bytes. **Two declaration bytes the tree corrects:** **(i) §6.2 row 2's *"`log` appended last"* misses the install order** — `constraintDelete` installs `commit` then `log`, and `index.mjs` installs `discarded` after it, so a receipt reads `…,"commit","log","discarded"`; **the re-derived cell must place `log` BEFORE `discarded`.** **(ii) §1.9.1's TITLE still reads *"five behaviours"*, undeclared by §8(a).**

## 2 · WRITE SET

`constraints.mjs` — `defineResolutionLog` and frozen empty list; installed in `constraintWrite` and both `constraintDelete` arms; `judgeReversal` answers its `judgementLog`, frozen at that frame's `finally`. `kernel-foundations.mjs` — `COMMIT_LOG_SHARED`, before the freeze, `isExtensible`-guarded. `index.mjs` — `rollback`. `index.d.ts` — three docblocks, no typed line. Guide's four positions, `README.md`, both landings, note `FIVE → SIX` + line 6. **`src/` gains no byte; no manifest, status, arity, addon entry or `BK-1`.**

## 3 · THE SEVEN DRIVES (verbatim)

1. `Object.keys = ["op","watched","triggered"]` · `own names = [...,"discarded","log"]` · getter, `enumerable:false`, `configurable:true` · `kinds = ["constraint-check","repair-run","constraint-check","commit"]`.
2. `length = 1 kinds = ["commit"]`.
3. `log === commit[COMMIT_LOG] = true` · `own names = [...,"commit","log","discarded"]` · `D-3 arm: log = [], has = true`.
4. `kinds = ["repair-run"]` · `frozen = true` · `read r = 7` · quiet arm `log = [], has = true`.
5. `keys = own names = ["status","message","log","address"]` · `kinds = ["constraint-check","outcome"], frozen = true`; a refusing reversal keeps its own one entry.
6. `instance = 14` · `barrel = 6 names` · sealed report five before/after · `symbols = [Symbol(…commit-log-shared)]` · double seal: no throw.
7. §4.

## 4 · THE SUITES

**node: 1,242 · 1,238 pass · 3 fail · 1 skipped** (baseline `1,241 / 0`): §6.2's rows 2–4 — `surface.test.mjs:762`, `refused-reversal-restore.test.mjs:255`, `downstream-claims.test.mjs:861`. **Row 1 turns OUTSIDE the glob**: `held-listener-identity-greens.mjs` `175 · 174 pass · 1 fail`. **No other cell moved**: `greens.mjs` 250/4, `discard-witness.mjs` 82/3, equal to a stashed baseline. **cargo: 675 · 0 failed**; no Rust byte touched.

## 5 · THE NOTE'S SIXTH LINE, verbatim

> 6. **A PASSING CALL ANSWERS WITH THE COMMIT'S LOG — THE ENTRIES YOUR ACT APPENDED, ON A RESOLUTION AND NOT ONLY ON A REFUSAL.** A `write` and a `delete` that pass answer with the commit's own list at `record.log`: the `constraint-check` entry for each pair the pass asked, the `repair-run` entry for every repair that landed, and the `commit` entry that closes the arm — **in the order the commit appended them**, and **the same list, the same entries and the same positions a refusal about that commit carries** — so a manual data change can read what it moved downstream of its own request. **A `rollback` that passes carries its judgement's list, which is where a repair the judgement ran leaves its entry.** **The member is non-enumerable and present on every passing answer, and `[]` means this act appended nothing it can report — a nested call inside a constraint or repair body answers `[]` because the commit it joined has not crossed, and the act that owns that commit reports it** (`D-119`).

## 6 · WHAT GATE 4 MUST RE-READ

`resolutionLogOf` and the `judgedList` freeze · `RSL-1`–`RSL-9` owed · §6.2 row 2's order and row 1's out-of-glob cell · §1.9.1's title · `Q-1`, `Q-2` open.

---

# Envelope — `U-STOREROOM-FILE-SAVE-COVERAGE` · L1 declaration of `D-119`'s carrier · 2026-11-02 · `5325526`

**THE PREVIOUS ENVELOPE — the `α`/`β`/`γ` declaration of the same date — IS SUPERSEDED BY ITS OWN LANDING AT `5325526`; no byte of it is deleted.**

## 1 · VERDICT

**`DECLARED`.** `resolution-log.md` declares the form, the cache, the six answers, the order, the stability rule, the
cells, the prose, the note's sixth line and the write set. **Two questions are open and neither blocks (`Q-1`, `Q-2`).**
Figures re-read with `read`/`grep` this date; no shell, so no leg was run.

## 2 · THE FORM CHOSEN, AND THE OTHER'S PRICE

**(a) — a non-enumerable own ACCESSOR at the name `log`, on the `discarded` precedent**, declared in a docblock and not
as a typed line: `Object.keys`, every deep-equality, the FOURTEEN, the record shapes and the barrel move by nothing.
**`Object.getOwnPropertyNames` is the one census that moves, and four cells turn:** `HLI-07.6` and
`surface.test.mjs:762`–`:766` (a delete receipt's own names, six to seven), and `refused-reversal-restore:255` with
`downstream-claims:861` (*"a lawful reversal carries NO log"*, which `D-119` reverses for one member).

**(b) — a declared ENUMERABLE member — is refused and priced: it turns roughly twenty cells** (the `Object.keys`
censuses of all three records, `json-crossing`'s rebuild-and-compare, three `.d.ts` censuses), **breaks every consumer
deep-equality over `{op, watched, triggered}`, and loses `1.9.1`'s PATCH class — a MINOR of its own.**

## 3 · THE CACHE

**It is the SEALED REPORT's `log`, which the entry already holds** — `sealHandoff` freezes list and report before
`dropHandoff` strips the closed map's copy, and the entry's frame holds that report until the answer is built. **No
`WeakMap`, no instance slot, no module map is minted.** **One fact is kept where the seal computes it** —
`Symbol.for('provident-storeroom.commit-log-shared')`, a non-enumerable own `data` property: does this call own the
list. **Released with the answer and by nothing else** — `kernel.closed` (four members, no `log`), `kernel.live`, the
registry and the instance name it nowhere — **so `D-58` is intact and `src/` gains no byte.**

## 4 · WHICH ANSWERS CARRY IT, AND WHAT `[]` MEANS

- **`write` → `record.log`; `delete` → `receipt.log`** (the list `receipt.commit` names, by identity): **the commit's
  entries in append order — the index is the ordinal (`D-65`) — ending with the passing arm's `commit` entry.**
- **`rollback` → `record.log`, the JUDGEMENT's list**, frozen at its frame's end: **a `repair-run` entry there is the
  downstream edit `D-113`/`D-117` make exactly this ruling's subject.** **Its refusal differs in content, not identity**
  (`reversalRefusal` mints its own one-entry list), so the identity rule is scoped to `write`/`delete`.
- **`addConstraint`, the toggles, and `storeCreate` with `cfg.constraints` carry nothing** — the identity is minted once
  per pair (a member there would be a slot two calls share), the toggles answer `undefined`, and the batch's only seat
  is the instance, where a closed commit's log cached is what `D-58`'s bound forbids.
- **`[]` means *this act appended nothing it can report*, in four shapes:** the JOINED arm, a `D-3` delete, a
  `rollback`'s non-judging arms, a judgement that appended nothing. **A passing write with NO pair is NOT one of them**
  — `commit` is appended unconditionally, so it answers `[commit]`; a cell asserting `[]` there is false. **The joined
  arm's `[]` collides with item 1's *"same as on failure"* — declared on item 4 and `D-58` item 1, and put as `Q-2`.**

## 5 · THE CELLS, THE PROSE, THE NOTE, THE WRITE SET

**Cells:** two new paths (`tests/e2e/resolution-log.test.mjs`, `RSL-1`–`RSL-9`; `tests/unit/js-constraints/resolution-log.test.mjs`)
and four turned, each re-derived; **no blind instance owed** — `RSL-3`/`RSL-4` assert the two arms a reader would get
wrong. **Prose, seven:** guide `§8.0a`, `§6.5a`, `§9.2`, `§7.6`; `README.md`; three `index.d.ts` docblocks; the landing
re-staged. **The note:** `§1.9.1`'s head reads SIX, its sixth line printed verbatim at §8 — class unmoved, `PATCH`,
`1.9.1`. **Write set:** five code positions, all inside `sites.md §1`'s files; `src/` gains no byte; no module and no
endpoint moves.

## 6 · QUESTIONS FOR THE ARCHITECT

**Two, neither blocking.** **`Q-1`** — *must the `storeCreate` batch hand its entries to the caller, and may `D-58`'s
bound be relaxed for one closed commit?* **`Q-2`** — *on the joined arm, where `D-119` item 1 and item 4 cannot both
hold, which gives way?* **`[]` is declared; the alternative is one line and two cells.**
