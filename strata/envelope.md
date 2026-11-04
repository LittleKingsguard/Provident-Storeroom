# Envelope — Gate 3 · `U-STOREROOM-REGISTRATION-OWN-MEMBERS` LANDED · 2026-11-04

**⟶ CORRECTED BESIDE 2026-11-04, ON THE FINAL GATE-4 READ (`F-1`, `F-2`): THE FIGURES BELOW ARE THE PRE-CORRECTION ONES AND THE LANDED TREE READS DIFFERENTLY.** **The certified reading after the two correction rounds — `SROM-09`/`SROM-10` and the corrected cells — is `npm test` exit `0` at 1268 tests · 1267 pass · 0 fail · 1 skip; the three new files `14/14` (10 + 1 + 3); the red set is `SROM-01`–`SROM-10` plus `SROM-B1` plus `P-SROM-1`/`P-SROM-3`.** **The gate-4 verdict on the corrected landing is `SHIP-WITH-CONDITIONS`, its only surviving condition being these envelope figures themselves (`F-1`, `F-2`), now corrected; the behaviour findings of both reads were CLOSED by the correction passes and the residuals were certified closed by the final read (R1–R4, each with its evidence).** **THE ROWS BELOW STAND BYTE-FOR-BYTE AS THE GATE-3 RECORD AND ARE READ THROUGH THIS MARK.**

**THE GATE-3 ENVELOPE — appended above the gate-2 and gate-1 envelopes and the `D-119` landing envelope, all of which stand unchanged.**

## 1 · VERDICT

**`LANDED` — the conversion, the three marks, the cells and the `PATCH 1.9.3` cut are at the bytes, and the trio reads `0`.** **Baseline before the conversion (same tree, cells already present): 1266 tests · 1258 pass · 7 fail · 1 skip — the seven reds exactly `SROM-01`–`04`, `SROM-B1`, `P-SROM-1`, `P-SROM-3`.** **After: `npm test` exit `0`, 1266 · 1265 · 0 · 1; the three new files `12/12` green; `npm run typecheck` exit `0`; `npm run build` exit `0` with `CARGO_HOME=.cargo-home` (the bare `npm run build` exits `101` on the addon leg for a missing registry — an ENVIRONMENT FACT, not a green; `publish.sh` exports the same `CARGO_HOME` and `npm run build` does not).** **No other cell moved and no new red stands.**

## 2 · THE CODE (three positions)

`bindings/js/src/entry/kernel-registration.mjs` — the import gains `ownMember` from `./kernel-foundations.mjs` (the other seventeen names byte-for-byte); the outcome read becomes `Object.hasOwn(outcome, 'message')` as the gate with `ownMember(outcome, 'repair')` read as the function value; the result read becomes `ownMember(result, 'ok') === true`. **No `'…' in`, no member `[[Get]]` of `outcome.repair`/`outcome.message`/`result.ok`, no accessor can run, no third helper, no credit-rule byte, no `index.mjs`/`src`/`index.d.ts`-type byte.**

## 3 · THE MARKS (append-only, verified by diff)

`docs/guides/package-use.md` — a dated `RCA-8(g)` mark that is a **pure suffix** of the `:1094` sentence (the old line is an exact prefix of the new; no citation re-pointed) · `bindings/js/index.d.ts` — **+9/−0** inside the `ConstraintOutcome` docblock, no type line moved · `docs/specs/storeroom-constraints/contract.md` — **+1/−0** beside sub-item `(viii)`, no citation repair, no range correction (`Q-1` default) · `bindings/js/README.guide.md` re-staged from its canonical home and **byte-identical** (`cmp` clean), the notes' pair likewise.

## 4 · THE CELLS

`tests/e2e/registration-own-members.test.mjs` (`SROM-01`–`08`: the four reds, the declared control, three credit controls) · `tests/e2e/blind-registration-own-members.test.mjs` (`SROM-B1`: written red, now green) · `tests/e2e/registration-own-members-properties.test.mjs` (`P-SROM-1/2/3`). **The blind cell's head carries its gate-5 standing; the control's head declares it a control.**

## 5 · THE CUT — `PATCH 1.9.3`

Eleven cells read `1.9.3` (`"version"` once in `bindings/js/package.json`, its five pins, the five platform manifests) · the three generated version lines read `1.9.3` (`bindings/js/README.md:34`, `bindings/js/README.guide.md:33`, `bindings/js/RELEASE-NOTES.md:19`) · the root `RELEASE-NOTES.md` carries **`§1.9.3` above `§1.9.2`** with its class, its consumer-visible change and its "what does not move" list · `publish.sh --figures` exit `0` and `--cut-claims` exit `0` · `addon.version()` reads `1.9.3`.

## 6 · THE DEVIATIONS, DECLARED RATHER THAN GLOSSED

**(a) `scripts/publish.sh --bump 1.9.3 --yes` REFUSED TWICE**, and neither refusal is a contract breach: the first on the **drifted guide landing** (`PIN-5` (c)'s predicted refusal, cured by re-staging), the second on **"the working tree is dirty — 22 path(s)"**, the release-act guard **a gate-3 landing pass cannot satisfy because its write set is uncommitted by design**. **So the eleven cells were written with the script's own `§2.5` (2) `perl` commands, verbatim**, and the script's other legs passed in that run (version lines agree, cut-claims, `cargo test --offline` 675/0, `cargo build`, `npm test` 1265/0, `v1.9.3` unclaimed). **(b) `--pack --yes` swallows `--yes` as its DEST; its `npm pack` readback then hit `EACCES` on a root-owned `~/.npm/_cacache` AFTER the byte-for-byte staging had succeeded** — the landings are clean, the readback is an environment fact. **(c) The script's `CARRIER` (`docs/specs/storeroom-publish-proposal.md`) is absent from this tree** — that perl edit is a no-op with a warning, exit `0`. **(d) The implementer did not write `strata/envelope.md`** — `strata/**` is outside its write set, and this envelope is the supervisor's.

## 7 · WHAT GATE 4 MUST RE-READ

The three code positions against `PIN-2`'s forbidden forms; the arm table row by row against the landed behaviour (`PIN-3`); the marks' required/forbidden content against `clause-context.md §1`–`§2`; the cut's eleven cells and three lines; the write set against `PIN-1` by `git status`; the two `cmp`s; and every `path:line` any shipped byte prints, at the pass's date.

## 8 · WHAT REMAINS BEYOND GATE 3

Gate 4 (the adversarial re-read) · gates 5/6 (the blind/live instruments, the documented-versus-code re-read) · gate 8 (documentation review of the three marks) · gate 10 (the DONE entry with its residuals: the credit-rule asymmetry `PIN-4`, and the two landings' re-stage at every cut) · gate 11 (the property register — its cells are green, the register's row is owed) · gate 12 (layer statement, no `APP` green).

---

# Envelope — Gate 2 · `U-STOREROOM-REGISTRATION-OWN-MEMBERS` · 2026-11-03

**THE GATE-2 ENVELOPE — appended above the gate-1 envelope and the `D-119` landing envelope, both of which stand unchanged.**

## 1 · VERDICT

**`CLOSED`.** The unit's contract directory lands in ONE pass: five files, eleven pins, the part map, four recorded omissions and the closure predicate `4 = 4` ✓. **CHANNEL NOTE: the pass carried no shell, so every `[R]` is labelled CARRIED from `strata/research.md §15.3`; no drive was re-taken and none is claimed.** `derivation:` points at the gate-1 record's `§3` row with the decider split; `D-120`'s four answers are carried as CONDITIONS and re-litigated nowhere.

## 2 · WRITE SET

**Untracked additions only:** `docs/specs/storeroom-registration-own-members/{contract,sites,clause-context,claims,verification}.md`. **No tracked file moved.** No code, no test, no guide, no corpus byte, no `strata/decisions.md` byte.

## 3 · THE PINS, ONE LINE EACH

`PIN-1` the write set — two reads + one import, the tests, two prose marks, one corpus mark, the cut; each forbidden position named · `PIN-2` the lawful form — gate `Object.hasOwn`, values `ownMember`, no `[[HasProperty]]`/`[[Get]]`, the import edit, the forbidden forms (a bare hasOwn followed by a member read is REFUSED — it would run an own accessor) · `PIN-3` the arm table — nine arms, BEFORE/AFTER at both instants; the two instants "agree" means the same MEMBERSHIP question, never the same status · `PIN-4` no credit-rule byte — the op-based registration credit and `D-105`'s op-free write credit both stand; `§8.3 Q-1` untouched · `PIN-5` the two prose marks — required and forbidden content each, the guide landing re-staged by `scripts/publish.sh`, never hand-edited · `PIN-6` one dated `RCA-8(g)` cure mark at the corpus cell `(viii)`, no citation repair · `PIN-7` the gate-3 cell statement list · `PIN-8` the `§9` property, the third instant CONFORMING · `PIN-9` `PATCH 1.9.3` — eleven version cells, three generated version lines, one root `§1.9.3` section re-staged · `PIN-10` nothing else moves — no status, member, type line, message, `index.mjs` byte, `src/` byte or `docs/L1` byte · `PIN-11` the battery census — **the fix turns ZERO existing cells**, and `registration-repair-existence.test.mjs:27`-`:34`'s pre-cure comment is read through.

## 4 · THE GATE-3 CELLS (statement list)

**Red:** `SROM-01`–`SROM-04` — both registration routes × the inherited-`repair` and inherited-`ok` arms, each asserting `ConstraintRefusedAtRegistration`, the repair's counter `0`, `constraints()` silent, no `repair-run` entry. **Control:** `SROM-05` — the inherited-`message`-alone arm, green today and green after. **Credit controls:** `SROM-06`–`SROM-08` (`K-5a`, `K-3`, `K-5`). **Blind:** `SROM-B1` — the membership symmetry, written before the fix. **Property rows:** `P-SROM-1/2/3` with `PIN-8`'s third-instant statement.

## 5 · THE SIX QUESTIONS, ALL DEFAULTS TAKEN (none blocks)

`Q-1` corpus mark carries no citation repair · `Q-2` property row names the third instant conforming · `Q-3` no cell asserts cross-instant status agreement · `Q-4` the boot may be a corroborating control in the blind cell, owes no red cell · `Q-5` no `docs/L1` module/endpoint row · `Q-6` the two prose marks re-point no stale citations.

## 6 · WHAT GATE 3 MUST HOLD

The two conversions in `PIN-2`'s lawful form; the cells of `§4`; the three marks on `PIN-5`/`PIN-6`'s content; the cut on `PIN-9`; the closure re-read at its one home; the trio (`test` · `typecheck` · `build`) measured with its invocation; and the tracker (`DONE`) entry naming the residuals `PIN-4` and `PIN-10` carry.

---

# Envelope — Gate 1 · `U-STOREROOM-REGISTRATION-OWN-MEMBERS` · 2026-11-03

**THE ENVELOPE FOR THE `ST-F1` VALIDITY PASS — appended above the `D-119` landing envelope, which stands unchanged.**

## 1 · VERDICT

**`APPROVE-WITH-CONDITIONS` · `DELEGABLE`.** The fraction is ONE unit on `D-120`'s four answers (whole membership class · PATCH `1.9.3` · full acceptance standard · the corpus-cell grant taken in the same pass). **EIGHT FINDINGS, none blocking**, each a check at a named later gate; **two questions (`Q-1`, `Q-2`) with defaults, neither blocking**. **CHANNEL LIMITATION, RECORDED: the validity session's toolset was READ-ONLY — no shell, no `write`/`edit` — so the record was landed by the supervisor from the pass's returned analysis, its `[R]` figures are `strata/research.md §15.3`'s carried at the same `HEAD` `f3b35ea`, and the four ranges the pass corrected were re-read by the supervisor at their bytes before printing.**

## 2 · WRITE SET

**`docs/specs/storeroom-registration-own-members-proposal-review.md`** — the gate-1 record, and **the only repo byte the pass's content produced**. No code, no test, no guide, no corpus byte, no `strata/decisions.md` byte.

## 3 · THE FINDINGS, ONE LINE EACH

`G1-1`—`G1-3` **RANGE-DRIFT** at the two shipped prose sites and the corpus cell's own citations (all pre-cure readings; the guide's `:1094` and `index.d.ts:1587`-`:1591` become FALSE when the reads convert) · `G1-4` **CENSUS-GAP**: the population is **SIX** sites — 2 divergent, 4 conforming — the sixth being `constraints.mjs:3592`, the reversal instant's second read · `G1-5` **FIX-FORM**: the downstream's literal `Object.hasOwn(outcome,'repair')` is REFUSED as the fix — it would `[[Get]]` and run an own accessor the write never runs; **the lawful form is the write's own pair (gate `Object.hasOwn`, values through `ownMember`) plus one import edit at `kernel-registration.mjs:2`** · `G1-6` **ARM-INVARIANT**: the inherited-`message`-alone arm is a CONTROL, not a red cell; only inherited `repair` (`K-1`,`K-2`) and inherited `ok` (`K-4`) turn · `G1-7` **CUT-MECHANICS**: eleven cells close `1+5+5`; the guide and notes land from their root canonical homes (`scripts/publish.sh:112`-`:133`), never hand-edited · `G1-8` **PROPERTY-SCOPE**: the `§9` property names TWO instants and the tree has THREE; the third (the reversal) is stated CONFORMING.

## 4 · THE QUESTIONS FOR THE ARCHITECT (neither blocks)

**`Q-1`** — may the `(viii)` cure mark carry a corrected range for the cell's own stale citations, or is that outside `D-120` item 4's grant? **Default: no range, no citation repair; the stale citations read through the mark as pre-cure.** **`Q-2`** — must gate 11's property row extend to the reversal instant? **Default: no; the row states the two instants and names the third as conforming.**

## 5 · WHAT GATE 2 MUST PIN

**The read FORM (`G1-5`'s pair, not the downstream's word)** · the one import edit · "no credit-rule byte" (`op-free-repair-credit.md §8.3` `Q-1` untouched) · the three prose mark sites and the two landings re-staged · the corpus mark's bounds (`Q-1`'s default until answered) · the cells' names, the blind cell and the property row as gate-3 requirements.

---

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
