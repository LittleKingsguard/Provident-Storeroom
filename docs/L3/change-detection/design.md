# `P-3` change detection on writes — design

**LANDED 2026-11-17 BY THE SUPERVISOR.** Written by `role_l3_designer` at this tree's `HEAD`; **that role holds no write channel, so its returned text is landed
here** (the same channel limitation `strata/research.md §24` records for the intake). **It implements nothing, writes no cell, amends no spec and moves no other
repository byte.** Every runtime statement in it is `NOT DRIVEN`; the measured facts it cites are `strata/research.md §21.7`'s and are marked as that section's.

**ITS GROUND IS `strata/decisions.md · D-193`** (the architect's *"P-3 checks literal equivalence, not reference equality"*), **`strata/research.md §24`** (the
semantic intake) and **`strata/proposals.md · P-3`**. **`D-193`'s four settled consequences and its four standing defaults are NOT re-opened in it.**

**★ AND IT IS `READY-FOR-GATE-3` AT ITS §§2–4 AND `BLOCKED` AT ONE CLAUSE**: ***`O-1` — does `watched` narrow with `triggered`, and does `P-TP-8` (e) move with (a)?*** **There is no third
arm**: the store's own projection law says the two lists come from **one predicate**, and `P-TP-8` (e) declares `watched` exactly the prefix set *"with no member added,
none omitted"* — **so either (e) is amended beside (a), or the two lists disagree and the store's own sentence is false.** **`O-1` IS THE ARCHITECT'S AND IT STOPS THE DESIGN.**

---

# `P-3` CHANGE DETECTION ON WRITES — module design

**PROVENANCE.** Written `2026-11-17` at this tree's `HEAD` by **`role_l3_designer`**, landed by the supervisor because that role holds no write channel. **Its brief is `strata/decisions.md` · `D-193` (the architect's word, quoted whole below), `strata/research.md §24` (the semantic intake) and `strata/proposals.md` · `P-3`.** **It implements nothing, writes no cell, amends no spec, and moves no repository byte.** Every runtime statement in it is **`NOT DRIVEN`**; the only measured facts it cites are `strata/research.md:2176`–`:2178` and `§21.7`, and each is marked as that section's, at that section's date.

**THE OWNING MODULE.** **`store-core`** — module `1`, *"Hold the register, walk addresses, and perform the verbs — tiers and purge, the journal and rollback, the listener home, the file image and its boot, and construction"* (`docs/L1/module-map.md:397`) — because the ruling places the comparison where `D-69`'s one predicate lives. The three package sites §4 names are **consumers**, and §4 says at each whether it is narrowed or untouched. **The proposed landing path is `docs/L3/change-detection/design.md`**, on the naming precedent of `docs/L3/delivery-settle/`, `docs/L3/wasm-realm/` and `docs/L3/image-export-and-save-call/` (a unit slug, not a module id).

**THE RULING THIS DESIGN BUILDS ON, VERBATIM** (`strata/decisions.md:9391`–`:9393`): *"P-3 checks literal equivalence, not reference equality"*. **Its four settled consequences are `D-193` items 1–4 and they are NOT re-opened here**: the subject is **one literal** and **not** the per-tier list (`item 1`); the relation is **the store's own `PartialEq` over `StoreValue`** (`item 1`); **`file V` then `mem V` fires nothing although `readTiered` moves** (`item 3`, *"a later pass must not 'fix' this as a defect"`*); **`0` over a standing `-0` does not fire although the reversal's judgement would call it moved** (`item 4`). **The four defaults `D-193` item 5 leaves standing are taken as the design's board and are not re-asked**: `Q-3` a no-change write **mints an op** · `Q-4` the receipt is the same one with `triggered: []` · `Q-5` the suppression **reaches the constraints** · `Q-10` **its own `MAJOR`**.

---

## §1 · Provenance, channel, and the citations re-taken at this HEAD

**THE CHANNEL.** This pass held read tools and no shell. **So it makes no measurement, drives no cell and re-takes none of `strata/research.md §21.7`'s figures**; where it cites one it names it as that section's. **No repository byte was written, and the design document below is the whole of its output.**

**THE INTAKE'S OWN WARNING IS TAKEN AND EXTENDED.** `strata/research.md:3398`–`:3401` records that **twelve of `P-3`'s `path:line` ranges have drifted** and that a gate-2 pass *"must re-read rather than inherit"*. **I re-read them. Eleven of the twelve moved again, and I found five the intake did not name** — the largest being that **`bindings/js/index.mjs` is now `183` lines** (`docs/L2`'s subdivision, `D-2`/`D-156` landed): the entry's `write` member, the `state` literal and the three-position route **are not in that file any more**.

| what `P-3` / `§24` / `§21` cites | what stands there now | where the cited subject actually stands at this HEAD |
|---|---|---|
| `src/store.rs:3566`–`:3570`, the criterion docblock | elsewhere | **`src/store.rs:4193`–`:4197`** — *"THE TWO ARMS ARE ONE CRITERION AND NOT TWO RULES"* |
| `src/store.rs:3571`–`:3577`, the predicate | elsewhere | **`src/store.rs:4198`–`:4204`**, and **its name is `registration_triggered`, not `register_triggered`** — the misspelling is in this unit's brief and in `§24`, twice |
| `src/store.rs:2652`–`:2657`, the write's reach | elsewhere | **`:3001`–`:3007`** |
| `src/store.rs:1666`–`:1674` and `:1668`, `save_owed` | elsewhere | **`:1949`–`:1961`**, its short-circuit disjunct at **`:1951`–`:1953`** |
| `src/store.rs:2221`–`:2225`, the projection law | elsewhere | **`:2563`–`:2579`**, the law itself at **`:2567`–`:2570`** |
| `src/store.rs:2036`–`:2038`, the `before` view | elsewhere | **`:2346`–`:2392`**, the list arm at **`:2375`–`:2382`** |
| `src/store.rs:2247`–`:2254`, `touched_below`'s arms | elsewhere | **`:2593`–`:2600`**, its measured-hang note at **`:2618`–`:2621`** |
| `src/store.rs:2564`–`:2567`, the read's selection | elsewhere | **`:1379`–`:1385`** (`lowest`), realised at **`:2405`–`:2417`** (`state_now`) |
| `docs/guides/package-use.md:497`–`:499`, the closed firing list | the rollback / constraint clause | **`:547`–`:549`**, corrected in place at **`:551`–`:566`** |
| `docs/specs/storeroom-js/contract.md:2109`–`:2111`, the re-entrancy clause | elsewhere | **`:2183`–`:2185`** |
| `docs/specs/storeroom-native/contract.md:3674`–`:3676` | `M-9`'s mark clause | **`:3707`–`:3717`** |
| `contract.md:3149`–`:3150` (the failure list's *"MISSING handle"* row) | **`:3149` is the column head** | **`:3150`–`:3151`** |
| **`bindings/js/index.mjs:396`–`:397`** (the three-position `write`'s route) | **`index.mjs` is 183 lines and holds no member** | **`bindings/js/src/entry/instance.mjs:641`–`:643`** |
| **`bindings/js/index.mjs:475`–`:497`** (the `state` literal) | same | **moved whole into `src/entry/instance.mjs`** by the loader split (`D-156` item 1) |
| **`constraints.mjs:788`**, `constraintWrite` | elsewhere | **`constraints.mjs:829`**, its return build at **`:912`–`:916`**, its accessors at **`:938`** and **`:948`** |
| **`constraints.mjs:3636`–`:3642` / `:3643`**, `sameStanding` | elsewhere | **`:3642`–`:3643`**; its one caller `movedStanding` at **`:2690`**, the skip at **`:2695`** |
| **`delivery.mjs:105`**, `deliver` | elsewhere | **`:189`**, four positions (`settlement` added by the settle unit) |
| **`delivery.mjs:826` / `:875` / `:987`** | elsewhere | `terminalArm` head **`:1190`**; the save gate **`:1213`–`:1232`**; the `commitFile` call **`:1272`–`:1273`**; the delivery assignment **`:1349`** |
| `kernel-attempt.mjs:669`–`:670` (the pass's set) | — | **unmoved**, read and confirmed |
| `kernel-commit.mjs:186`–`:188` (`record.triggered`) | — | **`:187`–`:188`**, read and confirmed |
| `docs/specs/storeroom-native/contract.md:3028`–`:3033` (`P-TP-8` (a)) and `:3056`–`:3059` ((g)) | — | **both stand exactly where printed**, read and confirmed; **(e) is `:3047`–`:3052`** |

**SO THE DRIFT IS A PRICE AND NOT A REFUTATION, AND THIS DESIGN IS WRITTEN AGAINST THE RE-TAKEN BYTES** — `strata/walkthrough.md:88`–`:92`'s class, cited at `strata/envelope.md:387`–`:388`: *"the figure was true when measured and was falsified by the ruling that made it true."*

---

## §2 · Where the comparison is taken, and why that instant

### §2.1 · The two literals, named at their bytes

**THE BEFORE LITERAL** is **the assembled value of the lowest-rank version standing at the pair's own node, read out of the `Vec<Captured>` the write takes at `src/store.rs:2911`** — `let captured = self.capture(&home);`.

- **What `captured` holds, at its own bytes:** `capture` (`src/store.rs:2172`–`:2185`) pushes one entry per version standing at the pair (`path: Vec::new()`, `under: None`, `tier`), and **every entry's `value` is `self.assemble_all(reference)`** (`:2180`) — *the value a read answers there, subtree included*. **So the pre-literal is already assembled and already in hand; the design assembles nothing.**
- **Which of those entries is "the literal at the address", when more than one stands:** **the lowest one by `tier.rank()`** — the same selection `§2.3` declares for an unqualified read at `lowest` (`:1379`–`:1385`, `min_by_key(rank)`), and the selection `state_now` realises (`:2405`–`:2417`: `self.canonical(...)` then `anchors.first()`, with `canonical` sorting by rank ascending at `:1298`–`:1301`). **This is derived from `D-193` item 1 and is not a choice this design takes on its own authority**: the ruling fixes the subject at **one literal and not the per-tier list**, and the only tier-blind single literal an address with two standings has is the one an unqualified read answers. **It is recorded as DERIVATION and it is `O-2`** so the architect may correct it in one word.

**THE AFTER LITERAL** is **the `value` parameter the act lands** (`src/store.rs:2802`), carried verbatim into the record at `:2976`–`:2979` (`after: BaseState { present: true, value: value.clone() }`).

- **And the two literals are the same predicate on both sides, which is what makes this a comparison and not a pairing of accidents:** after the mint at `:2968`, every surviving version at the pair stands at a rank **above** the write's (`doomed` is `rank ≤ rank(write tier)`, `:2937`–`:2941`), so the minted version is the lowest-rank version present and **the unqualified read after the act answers exactly `value`** — the same `lowest`/`assemble_all` composition as the pre-side. **So the rule has one sentence: the act is a change iff the value an unqualified read answers at the address is not the literal it will answer afterwards.**

**THE RELATION.** `StoreValue`'s derived `PartialEq` (`src/value.rs:15`) — class-strict for free (the variant tag is part of the compare), key-order-blind for free (`Object` is a `BTreeMap`, `:22`), `-0 == 0` true (inherited through `f64`), `NaN` unreachable (`NonFinite` is its own variant, `:30`, refused by `is_admitted`, `:42`).

### §2.2 · The line, and why that instant

**The comparison stands at `src/store.rs:2911`–`:2916`** — one boolean computed on the two literals immediately after `captured`, `anchors` and `selected` are in hand — and it is **consumed at `:3006`–`:3007`**, where the two returned lists are built.

**WHY THAT INSTANT, IN THREE REASONS AND NO FOURTH:**

1. **IT IS THE LAST INSTANT AT WHICH THE PRE-LITERAL EXISTS.** `self.remove_refs(parent_link, &doomed, false)` at **`:2967`** destroys the versions the pre-literal is assembled from; the arena rows are the removal's and no value can be read off them afterwards. **A comparison taken after `:2967` is a comparison against a value that has already been taken away** — the store's own recorded lesson on exactly this hazard is `touched_below`'s, which takes the tiers *"BEFORE THEY LEAVE THE ARENA"* (`:2954`–`:2959`).
2. **IT COSTS NOTHING, AND THAT IS A FACT ABOUT `capture`, NOT AN OPTIMISM.** `capture` assembles every standing version whether or not anything reads it (`:2180`, `:2231`) — `capture` is unconditional at `:2911` and the journal's `before` needs it. **So the design adds no assembly, no walk and no store member.** It is the intake's `S-4` (the pair) carrying `S-3`'s materialisation, and it is why the intake's *"four of six subjects are free"* (`strata/research.md:3507`) is true here and the branch subject `S-5` is not: a per-write branch comparison is the corpus's own measured `O(n²)` hang (`:2618`–`:2621`).
3. **IT PRECEDES ANY REPAIR, WHICH IS `Q-7`'s DEFAULT AND `D-193`'s OWN PHRASE.** The ruling compares *"the literal the act would land"* — the act's own landing, not the state a repair leaves. `D-117`'s order is instant-for-instant (*"ask → repairs land → re-run → SAVE → DELIVER"*, `strata/decisions.md:6034`–`:6039`), and the set is computed inside the write. **A repair cannot retroactively silence the act that asked it**, because the set was answered before the ask.

### §2.3 · The operand the design does NOT use, and why naming it matters

**`state_from_captured` (`src/store.rs:2361`–`:2392`) is the cheapest-looking pre-state on the path and it is the WRONG one**, which is worth printing because it is the mistake a first implementation makes:

- it is exactly what `before` at `:2969` is built from, and `before` is what `op.before` carries;
- **and where more than one version stood at the node it answers the per-tier LIST** — `if touched.len() > 1 { … StoreValue::Array(ordered …) }`, sorted by `Reverse(rank)` (`:2375`–`:2382`).

**`D-193` item 1 puts that list outside the subject.** So the comparison's pre-side is the **single lowest-rank literal**, and `state_from_captured` is used for the journal record and for nothing else. **Two consequences follow, and neither is a defect this design may repair:**

- **`op.before` and the comparison's before are not the same operand** at a node standing at two versions — `op.before.value` is `[V, V]` where the comparison saw `V`. That is why §5 refuses to offer `op.before`/`op.after` as a faithful second reading of the rule.
- **`state_from_captured`'s single-version arm is not rank-ordered either**: `touched.first()` at `:2383`–`:2387` takes the first node-level capture, and `capture` pushes in `refs_at` order (`:1288`–`:1291`), not in tier order. **The design does not touch it** — `op.before` is the journal's, and the one arm that needs rank order is the comparison's own, which takes it explicitly. **Filed as a note, not a unit.**

### §2.4 · When the address does not resolve

**THE SUBJECT IS ABSENT, AND THE WRITE IS A CHANGE — AND THAT IS NOT A SPECIAL CASE, IT IS A CONSEQUENCE OF THE TAXONOMY.**

- **Absence is decided once and unmistakably on this path.** `capture` pushes one entry per version at the pair (`:2172`–`:2184`), so **`captured.is_empty()` if and only if no version stood**, and that is the same test `state_from_captured` uses to answer `absent_state()` (`:2362`–`:2363`; the absent spelling is `present: false, value: StoreValue::Undefined`, `:2354`–`:2359`).
- **No admitted value can compare equal to the absent state, because `Undefined` is not admitted.** `is_admitted` (`src/value.rs:39`–`:47`) admits `Str`, `Bool`, a finite `Num`, `Object` and `Array`, and answers `_ => false` for `Undefined` (`:26`, `:45`); `write` refuses an inadmissible value before it reaches the pair (`src/store.rs:2806`–`:2810`). **So "absent → any write is a change" needs no branch at all**: a first write compares `Undefined` with an admitted literal and the compare cannot succeed.
- **And it is declared besides, by the criterion's own second half** (`src/store.rs:4195`–`:4196`: *"a node the act CREATED OR PURGED has a value that changed, so its own registration is reached"*), whose ruling is `D-66`'s (`strata/decisions.md:3765`–`:3769`: *"those nodes exist after the write and did not before"*). **A first write is a change by declaration and no suppression can reach it without repealing that clause — this design does not, and §3 shows `triggered` carrying the full set there.**

---

## §3 · What the no-change outcome suppresses — enumerated, each with its before and after

**THE ACTS ARE TAKEN IN THE ORDER THE WRITE TAKES THEM** (`src/store.rs:2798`–`:3019`), and the column that matters is the third: **what a no-change write leaves standing and why.** **"Stands" below means the act is performed exactly as it is today; it does not mean the act is unaffected.**

| # | the act | its bytes | BEFORE (a write that moves the literal) | AFTER (a no-change write) | the ground |
|---|---|---|---|---|---|
| 1 | **the delivered set `triggered`** | `:3007`; `triggered_for` `:2529`–`:2554`; the predicate `:4198`–`:4204` | every registration whose address is a prefix of the act's, **or** whose address the act touched | **the touched arm alone** — `[]` wherever nothing was touched | `D-193` item 1 + `Q-5`; the narrowing wraps **the prefix arm only** (§4.1, §9) |
| 2 | **`watched`** | `:3006`; `watched_for` `:2563`–`:2579` | the address projection of `triggered` | **the address projection of the narrowed `triggered`** (therefore also `[]`) | the store's own law: *"the two lists must be produced by ONE predicate or the projection is false"* (`:2567`–`:2570`). **This narrows `P-TP-8` (e) as well as (a), and that is `O-1`** |
| 3 | **the constraint pass** | `kernel-attempt.mjs:669`–`:670`, reading `record.triggered`, set at `kernel-commit.mjs:187`–`:188` | every pair registered at the address is asked, against the op's own value | **no pair is asked** | `Q-5`'s default: the pass's evaluated set **is** the store's returned set — there is no second predicate to suppress (`kernel-attempt.mjs:652`–`:654`) |
| 4 | **the repair flows** | `D-117`/`D-118`'s order (`strata/decisions.md:6034`–`:6039`) | a pair may refuse and a repair may land, be re-run and be credited (`D-105`) | **no ask, so no refusal, no repair, no re-run, no credit** | a consequence of row 3, not a second rule; `D-193` item 5's `Q-5` |
| 5 | **the journal op** | `:2995`; `append` `:2434`–`:2450` | an op is minted, `seq` bumps (`:2441`–`:2442`) | **AN OP IS STILL MINTED** (`Q-3`), **`seq` still bumps, and the compaction can still DROP the oldest entry** (`:2451`–`:2466`) | `Q-3`'s default: the op carries the save, `P-TP-8` (g) and `rollback`'s reach, and the alternative makes `WriteRecord.op` optional (`index.d.ts:716`) — a break of its own |
| 6 | **the `file` save** | `save_owed` `:1949`–`:1961`, short-circuit `:1951`–`:1953`; reached from `commit_file` `:1811`; the package's gate `delivery.mjs:1213`–`:1232`; the call `:1272`–`:1273` | the save runs | **THE SAVE STANDS.** `save_owed`'s **first disjunct answers `true` before any departure test** (`:1951`–`:1953`), so `commit_file` reaches `write_file` and **the file is rewritten with identical bytes while its mtime moves** | `Q-8`'s default, and it is a *composition* of `Q-3` and `Q-8` and not either one: the terminal arm's gate needs `answer.op` (`:1218`–`:1219`), so the save is reachable **because** the op was minted. **Measured at `strata/research.md:2176`–`:2178`** (bytes identical, mtime moved) |
| 7 | **the log entries** | `kernel-attempt.mjs:506` appends `commit` unconditionally; the accessor `constraints.mjs:948` | `[constraint-check × n, commit]` | **`[commit]`** — one entry, `kind === 'commit'` | `index.d.ts:750`–`:756`: *"`[]` is never that arm's answer."* **The suppression cannot empty `log`**, and a design that emptied it would move a declared observable for no reason |
| 8 | **the discarded witness** | the accessor `constraints.mjs:938`; the drain `consumeRaisedRaises` (`strata/decisions.md:8723`–`:8728`) | a raise a pair's body made is reported or judged | **`[]`** — and it is `[]` because **no body ran and therefore no raise was born**, not because a raise was lost | `D-170`'s mechanism, verbatim: *"a raise is created inside a pass … and every pass drains"* (`strata/decisions.md:8737`–`:8739`). **The pass still runs and still drains** (row 3 empties its *set*, not its *frame*) |
| 9 | **`D-169`'s legs** | `REPAIR_LEGS_LAST` (`strata/decisions.md:8701`–`:8703`) | a repair's invocation records a leg; a read takes it | **no repair invocation happens, so no leg is recorded** | **loss, never mis-attribution** — the same asymmetry the settle unit declares at its `§4` slot 5. **No clause is touched**: `D-169` governs a bracket's *slot*, and an empty slot is its correct state |
| 10 | **`bodyFailures`, `returnedValues`** | `index.d.ts:780`–`:819`, `:820`–`:858`; the frozen empty map at `:843`–`:846` | the delivered set's entries | **the one shared frozen `{}`, present on both** | **the ONLY two of the receipt's seven names the suppression cannot make ambiguous**, and the reason is that the corpus already refused this ambiguity once: *"the same fact whether no settle ran at all or a settle found none"* (`D-150` item 2) |
| 11 | **`op` itself** | `index.d.ts:716` (non-optional) | the record's op | **the record's op**, `opId` resolving in the journal | `P-TP-8` (g) (`docs/specs/storeroom-native/contract.md:3056`–`:3059`) holds **because** `Q-3` mints |

**AND THE ONE THING THAT IS NOT A ROW BECAUSE IT IS NOT AN ACT: the write itself.** A no-change write still purges `doomed`, still mints (`:2967`–`:2968`), still records, still appends, still returns. **It is not a narrower write; it is the same write with a narrower answer** — which is `Q-3`'s and `Q-4`'s whole point, and the opposite of the `delete`-that-removed-nothing's shape (`:3098`–`:3109`, `triggered: []`, `op: None`, no entry), the corpus's one already-shipped precedent. **That precedent is deliberately NOT taken**: it answers no `op`, which is a published-member break `D-193` item 5's `Q-3` refused.

---

## §4 · The three sites the change touches, at their bytes

### §4.1 · The store's one predicate — **NARROWED**

**THE BYTES.** `registration_triggered` is one free function at **`src/store.rs:4198`–`:4204`**, and it has exactly two callers — `:2548` inside `triggered_for` (`:2529`) and `:2572` inside `watched_for` (`:2563`) — which have exactly two verb callers: the write's at **`:3006`–`:3007`** and the delete's at **`:3185`**. **That is the whole population, verified by grep at this HEAD.**

**THE CHANGE, AS A SIGNATURE AND NOT A BODY:**

```
fn registration_triggered(registration: &[Segment], address: &[Segment],
                          touched: &[Vec<Segment>], changed: bool) -> bool
    //  (changed && is_prefix(registration, address)) || touched.iter().any(|path| path == registration)
fn triggered_for(&self, address: &[Segment], touched: &[Vec<Segment>], changed: bool) -> Vec<ListenerTrigger>
fn watched_for  (&self, address: &[Segment], touched: &[Vec<Segment>], changed: bool) -> Vec<Vec<Segment>>
```

**THE TERM GOES INSIDE THE PREDICATE AND WRAPS THE PREFIX ARM ALONE.** That is the design's single most load-bearing sentence and §9 states the failure it prevents: **an empty-vector short-circuit at `:3006`–`:3007` would silently narrow the TOUCHED arm**, which `Q-6`'s default forbids and which `D-66`'s own derivation grounds (a touched node *"exists after the write and did not before"*, `strata/decisions.md:3768`–`:3769`) — for a second identical structured write the touched descendants are re-created, so their own registration is reached **by the criterion's second half and not by the first**.

**AND THE ADDED POSITION FORCES ONE CALL SITE TO ANSWER IT: the delete's, at `:3185`, passes `changed = true`.** The delete keeps its own removed-nothing arm (`:3098`–`:3109`) and `D-193`'s subject is a `write`'s literal; a delete that reaches `:3185` has removed at least one version and **the value at its address did move**. The delete's rows are therefore unmoved (`§7`'s scope: `write` alone), and the position exists so that a later arm cannot pass the term by omission.

**ZERO NEW MEMBERS.** No `Entry` field, no `JournalOp` field, no `Store` field, no new function. The boolean is a local of `write`.

### §4.2 · The package's `constraintWrite` — **UNTOUCHED, AND NARROWED BY CONSEQUENCE**

**THE BYTES.** `bindings/js/src/entry/constraints.mjs:829`, reached from `bindings/js/src/entry/instance.mjs:641`–`:643`; it reads the store's own answer at `:914`–`:915` (`watched: answer.watched, triggered: answer.triggered`) and hands the record out at `:912`–`:916`.

**IT MOVES ZERO BYTES, AND `Q-5` IS DISCHARGED BY CONSTRUCTION RATHER THAN BY AN EDIT**: the pass's evaluated set is `record.triggered` (`kernel-attempt.mjs:669`–`:670`), which `kernel-commit.mjs:187` took verbatim from the store's answer. **A store-side narrowing narrows the pass, `D-105`'s repair-credit set and `D-152`'s registration-instant union without one package byte being written.** That is `D-69`'s *"ONE PREDICATE, in the store, where the per-tier versions live"* (`strata/decisions.md:3861`) and the reason `Q-2`'s layer was decided by where the comparison sits.

### §4.3 · The terminal arm's save — **UNTOUCHED, AND THE SAVE STANDS**

**THE BYTES.** `delivery.mjs:1190` `terminalArm`; the gate `:1213`–`:1232` (`record[SETTLED_ON_THE_PASSING_ARM] === true` at `:1215`, `answer.op !== null/undefined` at `:1218`–`:1219`); the `file` save call `:1272`–`:1273`; `state.mjs:1352` `commitFile`; `src/store.rs:1803`–`:1814` (`commit_file` looks the entry up **by op id** and asks `save_owed` at `:1811`).

**NOTHING NARROWS.** The gate's last class was already removed by `D-106` item 2 (`:1220`–`:1231`) and the eligibility question is now asked of the store — so **a no-change `file` write, which mints an op and whose `save_owed` short-circuits at `:1951`–`:1953`, reaches `write_file` and rewrites the same bytes.** **The receipt says nothing about it and no cell is red**: the durable act stands, and `D-106` item 2's rule (*"the file must save after ANY action that changes the file-tier data"*, `strata/decisions.md:5419`–`:5421`) has a false antecedent here and is therefore neither obeyed nor broken. **`O-5` asks the architect whether it should now be skipped; the default is that it still saves.**

### §4.4 · What a PACKAGE-SIDE-only narrowing would cost — `P-3`'s shape `(b)`, priced

**`P-3`'s six shapes are priced at `strata/proposals.md:766`–`:773` and none is chosen there; `D-193` chose the store by choosing the store's literal.** The cost of `(b)` is recorded here so that no later pass re-opens it cheaply:

1. **THE SEAM GAINS AN INPUT IT DOES NOT CARRY.** `deliver(state, triggered, triggeringAddress, settlement)` (`delivery.mjs:189`) receives **the set and the address only** (`strata/proposals.md:656`–`:660`), and the listener's one argument is an address (`index.d.ts:573`). **So `(b)` must capture, per delivered registration, the pre-act literal at THAT registration's address** — because an ancestor registration's address is not the act's, and the act's `op.before` is the *pair's* view and the per-tier list where two versions stood (§2.3). That is the reversal's own device, re-implemented (`constraints.mjs:2690`–`:2705`).
2. **IT LEAVES THE STORE'S TWO SETS TOTAL AND THE DELIVERY NARROWER THAN THEM** — so **`triggered` names MORE than is invoked**, which is *"`D-67`'s filed asymmetry, one layer up"* (`strata/proposals.md:697`–`:699`; `strata/decisions.md:3803`; `research.md §5.3` (2)).
3. **AND IT VIOLATES `Q-5`'s DEFAULT OUTRIGHT**: the pairs at the address would still be asked, so **a write a pair would have refused on becomes admissible because its value was equal** — the one consequence `D-193` item 5's `Q-5` names in as many words.
4. **`P-TP-8` (a) would stand byte-for-byte**, which is `(b)`'s only saving, and it is bought with a second predicate in the layer `D-67` and `D-69` spent a defect to unify.

---

## §5 · The receipt's sentence — `Q-4`'s `D-78` debt

### §5.1 · What a caller may conclude from `triggered: []`

**UNDER THE RULING, `[]` ON A WRITE NOW CARRIES TWO CLAIMS AND THEY ARE BOTH TRUE OF IT:**

- **(A) *"no registration stood at a prefix of this act's address, and the act touched no registered address"*** — the reading the store's `[]` has always carried (`docs/specs/storeroom-native/contract.md:3039`–`:3041` states it for the `delete`'s arm; for the `write` it was the only reading there was);
- **(B) *"registrations stood, and the literal the act landed is the literal the address already answered."***

**AND THE TWO ARE INDISTINGUISHABLE FROM `[]` ALONE. That is stated plainly because the architect has not ruled and a landing pass may not invent the ruling** (`P-3`'s `Q-5`; the intake's `Q-12`).

**THE CORPUS'S OWN DEVICE DOES NOT ANSWER THIS ONE.** `docs/specs/storeroom-js/surface.md:235` (`D-78`) draws its axis between **an ABSENT member and an EMPTY list** — *"this act cannot discard a raise"* versus *"it can, and this time nothing was discarded"* — and its remedy is to make the member **present** so it can say so (`:233`). **Here the member is present in both readings; the ambiguity is inside one array, not across presence.** **So `D-78`'s sentence is owed and is not `D-78`'s shape** — that is `O-4`.

### §5.2 · The second reading the receipt already appears to offer, and why it is not faithful

**`op.before` and `op.after` are on every write's record (`index.d.ts:716`) and a caller can compare them today** — `sameStanding` is the corpus's shipped idiom for exactly that (`constraints.mjs:3642`–`:3643`), and `P-3`'s `(e)` shape rests on it (`strata/proposals.md:773`, *"zero clause, zero cell, zero version line"*). **It is NOT a faithful substitute for the store's answer, and the reason is §2.3:** `op.before` is `state_from_captured`'s answer, which is **the per-tier LIST where more than one version stood** (`:2375`–`:2382`), while the comparison's pre-literal is **one value**. **So at an address standing at two versions a caller reads *"changed"* (`[V,V]` against `V`) on exactly the write the store ruled unchanged** — and that is the same address `D-193` item 3's price lives at. **The store's own predicate is the only faithful reading of the rule, and it is not on the receipt.**

### §5.3 · The options, with their costs — the row is **OPEN** (`O-4`)

| `#` | the shape | what it costs | what it gets wrong |
|---|---|---|---|
| **(i)** | **declare the two indistinguishable from `[]` alone**, in one guide clause and one declaration clause | a guide sentence (`docs/guides/package-use.md §6`, whose landing copy `bindings/js/README.guide.md` is `scripts/publish.sh`'s and is **never hand-edited**) and one `index.d.ts` docblock. **Zero runtime byte, zero cell.** | a caller cannot act on the difference; the corpus's `D-78` precedent treats this class as a debt, not a disposition |
| **(ii)** | **a non-enumerable own accessor on the write's record** — `changed: boolean` — the device `op`, `discarded`, `commit`, `log`, `bodyFailures` and `returnedValues` landed with **seven times** | `Object.keys` unmoved; **`getOwnPropertyNames` `7 → 8`** (`index.d.ts:840`); the declaration **twice** (`bindings/js/index.d.ts` and `typecheck/node_modules/provident-storeroom/index.d.ts`, re-staged, never hand-edited); **and two census cells move** — `tests/e2e/blind-entry-module.test.mjs`'s `WriteRecord` cell and `tests/e2e/surface.test.mjs`, named at `index.d.ts:736`–`:742` | **a new published name the architect has not ruled**, and one the record's own docblocks call *"outside this pass's write scope"* |
| **(iii)** | **make `watched` carry it** — e.g. non-empty on a no-change write | one predicate, no member | **REFUSED.** `watched` is the address projection of `triggered` (`src/store.rs:2567`–`:2570`), and an empty `triggered` beside a non-empty `watched` is the incoherence `P-3` §7 item 2 refuses by name |
| **(iv)** | **a status** — a success arm carrying *"nothing changed"* | rank `24` appendable by ruling (`src/error.rs:176`) | **REFUSED as a category error**: `status` occurs on `StoreRefusal` and on nothing else (`index.d.ts:632`–`:645`), and it would make an idempotent re-write a failure — `DD-11`, cited at `strata/research.md`:3673` |

**THE DEFAULT IF HE DOES NOT ANSWER IS `(i)`** — because the ruling settles the *shape* of the receipt (§3 row 1) and only the *sentence* is owed, and because `(ii)` mints a published name on a pass's own authority.

---

## §6 · The cells

### §6.1 · The existing cells that turn — and the ones that do not

**THE ONE THAT TURNS, at three assertions and one `TypeError`.** `tests/e2e/json-crossing.test.mjs`, the FRESHNESS LIMB:

- its state table declares the expectation at **`:4357`** — *"the FRESHNESS LIMB, on the control alone: a second identical write at the same address | a SECOND invocation"*;
- it drives the act at **`:4521`** — `crossingCall(() => control.store.write(drivenAddress, 'mem', 'x'))`, the same value at the same address at the same tier;
- **`:4524`** — `assert.equal(control.fired.length, 2, …)` — **fails cleanly: it reads `1`**;
- **`:4526`–`:4527`** — `const secondArgument = control.fired[1].address;` — **a `TypeError` on `undefined`, not an assertion failure**, so the red is loud and ugly rather than informative;
- and `:4528`–`:4536`, the limb's actual subject (*"each invocation receives a FRESH array"*), is **unreachable** once there is one invocation.

**ITS SUBJECT IS NARROWER THAN A FIRING COUNT, AND THAT MAKES IT A TOKEN TO RE-DERIVE AND NOT A SEMANTIC THE SUITE DEFENDS** (`P-3`'s `C-16`, `strata/proposals.md:714`–`:717`): *"a re-derivation that keeps the subject can keep the count by changing the second write's value."* **The design requires exactly that re-derivation, and names it so it is not discovered at the gate: `:4521`'s `'x'` becomes a value the first write did not land.**

**THE CELLS THAT STAND, NAMED SO THE CENSUS IS HONEST RATHER THAN OPTIMISTIC** — I read each and each varies its values or registers no listener:

- `tests/integration/store-core/e2e_json_round_trip.rs:880`–`:882` (`DD-11`, *"writing the SAME value again is a success"*) — **green**: it registers no listener and asserts no firing count, so a listener-only narrowing leaves it green and an *answer-level* change would turn it red. **That asymmetry is the cheapest single argument for `Q-3`'s default.**
- `tests/integration/store-core/e2e_listener_firing.rs` — the whole file: `lf_c7` (`:1063`) promotes `1.0 → 2.0 → 3.0`, `lf_c8` (`:1104`) purges `1.0`/`2.0` under a `3.0`, `lf_f1` (`:1975`) and `lf_f2` (`:2040`) each vary every value, `lf_a6` (`:536`) writes three creations. **All green — and `lf_c7` is green by the accident of its three values, which it never declares as load-bearing** (§10).
- `tests/e2e/registry.test.mjs:362`–`:375` (`1` then another `1` at another address), `:333`/`:344` (`1` then `2`), `tests/integration/store-core/watched_addresses.rs` (every drive varies its value) — **green**.
- **`tests/integration/js-constraints/constraint-kernel-properties.test.mjs:1121`** — `store.write(address, 'mem', 1).triggered`, asserted to carry both handles (`:1122`–`:1126`) inside a row whose declared subject is *"the handle check is the store's on both arms"*. **Green if and only if its fixed-seed address draw never repeats an address with the same value at the same tier.** **This is the cell §10 names as the one most likely to turn that nobody expects**, and it is a property row — it cannot be read; it must be driven.

### §6.2 · The new cells the design requires

**Each row carries the one-line change that would redden it**, because a cell that cannot be reddened is not a cell.

| cell | the drive | the assertion | reddened by |
|---|---|---|---|
| **`CD-1`** the canonical case | `listen(['a'],h)`; `write(['a'],'mem',1)`; `write(['a'],'mem',1)` | the second record's `triggered` is `[]` **and** `watched` is `[]`; `read(['a'])` is `1`; the first write's set carried `h` | making the second value `2` |
| **`CD-2`** `D-193` item 3's price, first direction | a `filePath` store; `write(['a'],'file','V')`; `write(['a'],'mem','V')` | `triggered: []`, **`readTiered(['a'])` reads `{_tier:'mem'}` where it read `{_tier:'file'}`, `versions_at` grows 1 → 2** | asserting `triggered` is non-empty — **and this cell exists to make that red a DECLARED state, not a defect** |
| **`CD-3`** the price's second direction | `write(['a'],'mem','V')`; `write(['a'],'file','V')` | `triggered: []` although the `mem` version is **PURGED** (`doomed`, `:2937`–`:2941`) and the address stands at one version where it stood at one, at another tier | asserting the purge fires |
| **`CD-4`** absence is a change | `listen(['a','b'],h)`; one write at `['a','b']` | `triggered` carries `h`; and the compare cannot succeed because `Undefined` is inadmissible (`src/value.rs:45`) | writing nothing first, or asserting `[]` |
| **`CD-5`** the ancestor goes silent too | `listen(['a'],hA)`, `listen(['a','b'],hAB)`; `write(['a','b'],'mem',1)` twice | the second record's set is `[]` — **`hA` is not reached either**, because the ancestor's assembled read did not move | asserting `hA` fires (**this is `O-6`; the derivation is §2.1's**) |
| **`CD-6`** the touched arm STANDS (`Q-6`) | `listen(['a','b','c'],h)`; `write(['a','b'],'mem',{c:1,d:2})` twice | the second record's set **carries `h`** — the touched arm is not narrowed | asserting `[]` |
| **`CD-7`** class-strictness | `write(['a'],'mem',1)`; `write(['a'],'mem','1')` | **fires** — variant tag is part of `PartialEq` | asserting `[]` |
| **`CD-8`** key-order blindness | `write(['a'],'mem',{x:1,y:2})`; `write(['a'],'mem',{y:2,x:1})` | **silent** — `Object` is a `BTreeMap` (`src/value.rs:22`) | asserting a fire |
| **`CD-9`** `D-193` item 4's price | `write(['a'],'mem',-0)`; `write(['a'],'mem',0)` | **silent**, *and* `sameStanding(0,-0) === false` asserted beside it so the two relations' disagreement is on the record | asserting a fire |
| **`CD-10`** the save stands (`Q-8`) | a `filePath` store; `write(['a'],'file',1)` twice; read the file's bytes and `statSync(…).mtimeMs` around the second | the bytes are identical and **the mtime moved**; `commitFile` ran once per op (`Entry::saved`, `src/store.rs:1814`–`:1815`) | asserting the mtime is unmoved |
| **`CD-11`** the op is minted (`Q-3`) | two identical writes | the second record's `op` is present, `op.opId` **resolves through `rollback(opId)` without `JournalOpUnknown`** (`P-TP-8` (g)), and `seq` advanced | asserting `op` is `null` |
| **`CD-12`** the pass is silenced with the firing (`Q-5`) | a pair at `['a']` whose body would REFUSE `1`; then `write(['a'],'mem',1)` after `1` stands | the write **passes**, `record.log` carries **no `constraint-check`** entry and **one `commit`** entry | asserting the pair was asked |
| **`CD-13`** the receipt's census | one ordinary write, one no-change write, one `delete` | `Object.keys` is `["op","watched","triggered"]`; **`getOwnPropertyNames` reads SEVEN**; on the no-change arm `log[0].kind === 'commit'`, `discarded` is `[]`, `bodyFailures` and `returnedValues` are the shared frozen `{}` | asserting `log` is `[]`, or asserting `bodyFailures` is absent |
| **`CD-14`** `D-152`'s registration instant narrows (`O-7`) | a pair whose repair lands the literal already standing, at `addConstraint` | the instant delivers **nothing** — the union is the store's answered sets, and this one is empty | asserting one delivery |
| **`CD-15`** the projection law survives | any no-change write with three registrations at three prefixes | `watched` equals the addresses of `triggered`, **as sets** (`DD-22`) — both `[]` | asserting a non-empty `watched` |
| **`CD-16`** the re-entrancy sentence | a listener at `['a']` whose body calls `write(['a'],'mem',1)` after `1` stands | the body runs **once**, not twice | asserting two invocations — **this is the sentence `docs/specs/storeroom-js/contract.md:2183`–`:2185` must be re-spelled in the same pass** |

**THEIR HOME, PER `D-5`'s SCOPES.** `CD-1`…`CD-13` and `CD-15` are **unit** cells on `store-core`: `tests/unit/store-core/change_detection.rs` (a new file in a scope that already carries Rust at `tests/unit/binding-crossing/`). `CD-14` and `CD-16` are **package** facts and belong to `js-constraints`/`js-surface` unit cells (`tests/unit/js-constraints/`). **The design names cells and writes none** — the `role_l3_test_writer` cycle holds that pen.

---

## §7 · The class and the migration sentence

### §7.1 · The class, and the number that is not mine

**`MAJOR`, STANDING ALONE ON ITS OWN VERSION** (`D-192` item 5's `Q-10` default, kept by `D-193` item 5). **The precedent is directly on point and was decided for a smaller move**: `D-190` is **`MAJOR — bump to 2.0.0`** because `D-189` item 2 removed one published declaration member (`RELEASE-NOTES.md:64`–`:70`). **A returned member's MEANING moving on a shipped verb is not smaller than a member leaving** — it is larger for every consumer who already reads it, and `P-TP-8` (a) and (e) both move with it.

**`2.0.0` IS SPENT** — the file's own generated line reads `PUBLISH-NOTES-VERSION-LINE: THE VERSION THIS CHANGE LIST DESCRIBES IS `2.0.0`` (`RELEASE-NOTES.md:19`), and `scripts/publish.sh --figures` refuses on any disagreement. **So the next number is `3.0.0`, and that is the architect's word and not this pass's** (`D-124` item 3's discipline, kept by `D-190`). **The version moves TWELVE SITES TOGETHER** — *"the main manifest's `version`, its FIVE exact `optionalDependencies` pins, and the SIX `platforms/*/package.json` versions"* (`RELEASE-NOTES.md:70`–`:74`) — **and the three generated version lines are re-derived and re-staged byte-for-byte, never hand-edited.**

### §7.2 · The consumer's migration sentence, in `RELEASE-NOTES.md:84`'s own shape

`RELEASE-NOTES.md:84`'s shape is **"WHAT A CONSUMER ON `<previous>` MEETS, AT EACH ENTRY POINT:"**, entry by entry, each naming what moved and what a consumer must now do. **Written in that voice, with the two things the shape forbids left out — no cut-state claim and no present-tense claim about what is released** (`RELEASE-NOTES.md:17`, `:23`):

> **WHAT A CONSUMER ON `2.0.0` MEETS, AT EACH ENTRY POINT:**
>
> 1. **`write` STOPS FIRING THE LISTENERS REGISTERED WHERE THE VALUE DID NOT MOVE.** A `write` that lands **the literal the address already stands at** answers the same record with **`triggered: []` and `watched: []`**, and no listener body runs — **at the act's address, and at every ANCESTOR of it**, because the ancestor's assembled value did not move either. **The test is on the literal and on nothing else**: `file V` then `mem V` **fires nothing** although `readTiered` moves from `file` to `mem`; a `mem V` then `file V` **fires nothing** although the `mem` version is destroyed; `-0` over `0` **fires nothing** although a reversal's judgement would call it moved. **`op` still records the landing, and a `file`-tier write still saves.**
>
> 2. **A CONSTRAINT PAIR AT THAT ADDRESS IS NO LONGER ASKED, AND THAT IS NOT A WEAKENING.** The pass evaluates the store's returned set; the set is now empty, so no pair is asked, nothing is repaired and nothing is refused — **on the same act, and on the same evidence `D-152` already used for the registration instants** (*"a registration that writes nothing fires nothing"*).
>
> 3. **`triggered: []` CANNOT TELL YOU *"no registration stood"* FROM *"nothing changed."*** **The member is present either way and its emptiness is the same emptiness** — `D-78`'s device does not reach this axis. **`op.before` beside `op.after` is a second reading and a partial one**: at an address that stood at two tiers `op.before.value` is the per-tier list, so the two will disagree with the rule at exactly the address the rule's price lives at.
>
> 4. **THE GUIDE'S FIRING LIST AND THE RE-ENTRANCY CLAUSE ARE RE-SPELLED IN THIS RELEASE, IN PLACE.** `docs/guides/package-use.md:547`–`:549`'s closed list gains the value condition, and `docs/specs/storeroom-js/contract.md:2183`'s *"a listener that writes at the address it was delivered for fires itself again … nothing detects it and nothing is meant to"* becomes conditional on a value — **because this release is the thing that now detects one form of it.**

### §7.3 · The three acts the class owes beyond the notes

- **`P-TP-8`'s bounded amendment** — `(a)`'s *"NO MEMBER is added and none omitted"* and `(e)`'s parallel sentence (`docs/specs/storeroom-native/contract.md:3028`–`:3033`, `:3047`–`:3052`), plus the failure list's *"a MISSING handle where a listener's address is a prefix of the write's"* (`:3150`–`:3151`) — **which this ruling makes the shipped behaviour.** **The row is amendable and has been amended twice** (`:3015`–`:3020`, `:3672`–`:3684`), **and it is a spec act, not an implementer's edit** — no module owns its contract (`docs/L1/module-map.md:1072`).
- **The declaration** — `bindings/js/index.d.ts`'s `triggered`/`watched` docblocks, and `typecheck/node_modules/provident-storeroom/index.d.ts` **re-staged, never hand-edited**.
- **The guides** — `docs/guides/package-use.md §6` in place (the precedent is `D-125` item 2 (iii)'s correction at `:551`–`:566`: *"this class of sentence is rewritten in place, not annotated"*), and its generated landing `bindings/js/README.guide.md` is `scripts/publish.sh`'s.

---

## §8 · The open questions the design hits and cannot answer

**EVERY ONE IS THE ARCHITECT'S, EVERY DEFAULT IS A DEFAULT AND NONE IS A RECOMMENDATION**, and **the rows `D-193` already decided are not re-asked**: the relation (`item 1`), the list's exclusion (`item 1`), the shadowing price (`item 3`), `-0` (`item 4`), the op (`item 5`/`Q-3`), the receipt's shape (`Q-4`), the pass (`Q-5`), the class (`Q-10`).

| `#` | the question | the default if he does not answer | whose |
|---|---|---|---|
| **`O-1`** | **DOES `watched` NARROW WITH `triggered`, AND DOES `P-TP-8` (e) MOVE WITH (a)?** `D-193` ruled the FIRING and said nothing about `watched`. The store's own law says the two are one predicate (`src/store.rs:2567`–`:2570`), and `P-TP-8` (e) declares `watched` exactly the prefix set *"with no member added, none omitted"* (`contract.md:3047`–`:3052`). **There is no third arm**: either (e) is amended beside (a), or the two lists disagree and the store's own projection law is false. | **`watched` NARROWS WITH `triggered`, and (e) is amended in the SAME bounded amendment as (a)** — the projection law is the store's own sentence and `P-3` §4's preamble already discharges the question *"by derivation"* (`strata/proposals.md:742`–`:745`) | **the architect's — and it is the row that can stop the design (§10)** |
| **`O-2`** | **WHICH LITERAL IS *"the literal at the address"* WHEN TWO VERSIONS STAND?** `D-193` item 1 declines the per-tier list and fixes one literal; it does not say which. | **the lowest-rank version's assembled value** — the unqualified read's answer (`lowest`, `src/store.rs:1379`–`:1385`; `state_now`, `:2405`–`:2417`), derived at §2.1 and marked as derivation | the architect's confirmation |
| **`O-3`** | **DOES THE RULE SILENCE ANCESTORS?** A registration at `['a']` for an equal re-write at `['a','b']`. **The criterion sentence read whole says yes** (*"a pair is asked when the act CHANGES THE VALUE AT THE PAIR'S ADDRESS"*, `strata/decisions.md:3765`–`:3766`) — the ancestor's assembled value did not move — **and no shipped cell separates the two cases**, so the consequence is derived here and unmeasured. | **YES, THE ANCESTOR GOES SILENT** — it is the criterion, and a design that spared ancestors would be testing a different address than the registration's own | **the architect's** |
| **`O-4`** | **`Q-12`: WHAT MAY A CALLER CONCLUDE FROM `triggered: []`, AND HOW DOES IT TELL THE TWO CASES APART?** §5 prices four answers. | **`(i)` — declared indistinguishable from `[]` alone, the sentence written in the same pass** (`D-193` item 5's `Q-4` debt, unchanged) | **the architect's — a debt a landing pass may not leave** |
| **`O-5`** | **DOES A NO-CHANGE `file`-TIER WRITE STILL SAVE?** `save_owed`'s first disjunct answers `true` before any departure test (`src/store.rs:1951`–`:1953`), so today it does, and the file is rewritten with identical bytes while its mtime moves (`strata/research.md:2176`–`:2178`). **`D-106` item 2's rule has a false antecedent here and neither commands nor forbids it** — and the store now HAS a change test it did not have. | **IT STILL SAVES** — the save is the op's own eligibility ground, whose movement would be a second change to a rule amended twice; **the cost is named: a no-change `file` write performs a durable act that moved no durable datum** | **the architect's** |
| **`O-6`** | **DOES `D-152` SURVIVE, AND IS ITS *"changed"* NOW RE-READ?** `D-152` (`strata/decisions.md:7991`, `2026-11-17`) rules *"Fires only the listeners changed by the writes"* and its mechanism is a **write-existence** union of the store's answered sets (`:8003`–`:8010`). **A store-side value test changes the sets it unions, at four instants `D-125` item 1 widened.** | **`D-152` STANDS AND ITS *"changed"* IS READ AS ACT-EXISTENCE, NOT VALUE EQUALITY** — that is what its own mechanism says; **and its union narrows with the store's set, which is the consequence he must know he is accepting** | **the architect's** |
| **`O-7`** | **DOES A REPAIR'S OWN WRITE OBEY THE SAME RULE?** `Q-7`'s landing default is unchanged, and its **repair half is open**: a repair's write is the same verb, so mechanically it obeys — and its consequence is that `D-104`/`D-152`'s delivered union loses a member whenever a repair lands the literal already standing. | **YES, MECHANICALLY — no special case, because a special case would be a second predicate by another name** | **the architect's** |
| **`O-8`** | **THE VERSION NUMBER.** The class is `MAJOR`; `2.0.0` is spent; **twenty sites move together when the number is named.** | **`3.0.0`, on its own line** — and the number is his word, not a pass's (`D-124` item 3) | **the architect's** |

---

## §9 · What this design does not touch, and its riskiest line

**NOT TOUCHED, NAMED SO A GATE CAN CHECK IT.** Every `delete` byte (its `triggered_for` call at `:3185` gains the position and answers `true`) · the `rollback` and the boot (their firing is the judgement's and `D-164`'s) · the creation and the four registration instants (**`P-2` is a separate unit, `D-191`, and lands after this one**) · `touched_below` and the touched arm (`Q-6`) · `op`, `op.before`, `op.after` and every journal member · `save_owed`, `commit_file`, `entry_file` and the save's eligibility · `state_from_captured` · the record's declared three and its four accessors · **no status, rank or message** · the instance's member set · `bindings/js/index.mjs`'s `183` lines · `modules.json` (`triggered_for`/`watched_for` are crate-internal and have no endpoint row) · every contract, guide and `strata/**` byte.

**THE DESIGN'S RISKIEST LINE** is §4.1's:

> **the term wraps the prefix arm and not the predicate.**

**What would falsify it:** an implementation that short-circuits the two returned lists where `changed` is false — `if !changed { (Vec::new(), Vec::new()) }` on both sides of `:3006`–`:3007`. **That reads as the same optimisation and it silently narrows the TOUCHED arm**, so a second identical structured write would stop firing at `['a','b','c']` — which `Q-6`'s default forbids and `D-66`'s own derivation grounds. **It is a one-token difference with a whole family of fires behind it, and `CD-6` is the cell that catches it.**

**THE SECOND RISK, CHEAPER AND MORE LIKELY:** the boolean reading `state_from_captured`'s answer — the per-tier list — instead of the lowest-rank captured entry. **That is `D-193` item 1 undone by a one-line shortcut**, and it fails *at the address the ruling's price lives at* while staying green on every ordinary scalar re-write. **`CD-2` and `CD-3` are the cells that catch it**, and they catch it only because they read `readTiered` and the version set beside the record.

---

## §10 · The one cell most likely to turn that nobody expects

**`tests/integration/js-constraints/constraint-kernel-properties.test.mjs:1121`**, inside `ck_prop_P_IM_1_the_handle_check_is_the_store_s_on_both_arms` (`:1097`):

```
const atTheAddress = store.write(address, 'mem', 1).triggered;   // :1121
assert.equal(carriesHandle(atTheAddress, handle), true, …);      // :1122
assert.equal(carriesHandle(atTheAddress, appHandle), true, …);   // :1125
```

**WHY NOBODY WOULD LOOK AT IT.** Its declared subject is *"the handle check is the store's on both arms"* (`:1097`) — a registration/identity property. **Nothing in its title, its clause, its comments or its row id mentions changing a value, and the word "change" does not occur in it.** It reads `triggered` on a write of the constant `1`, over a **fixed seed** (`SEEDS['P-IM-1'] ^ 0xCC9E2D51`, `:1102`), from a per-attempt random address draw.

**THE MECHANISM, EXACTLY.** Under this design `triggered` is empty whenever the literal at `address` already equals `1` at that tier. **So the cell turns if and only if its deterministic draw ever returns an address it has already used with the value `1` at `mem`.** That is a property of the seed, not of the code — **and I cannot drive it: this pass held no shell.** What I *can* say at the bytes is that nothing in the cell forbids the repeat: it registers a pair at the drawn address each attempt (`:1116`–`:1117`) and never asserts the address is fresh.

**THE TWO CELLS BESIDE IT, EACH ONE STEP FROM THE SAME RED, NAMED SO THE GATE DOES NOT HAVE TO FIND THEM:**

- **`tests/integration/store-core/e2e_listener_firing.rs:1063` `lf_c7`** — *"THE TIER-PROMOTION FLOW … each step firing the listener bound there"*, asserted *"EXACTLY `{h}` at EVERY step"* (`:1060`). **It is green only because its three values are `1.0`, `2.0`, `3.0`** (`:1066`, `:1077`, `:1082`), **and the cell never declares those values load-bearing.** Give its three steps one value and all three assertions go silent — **which is `D-193` item 3's price expressed as a tier promotion**, the single most likely shape for a future maintainer to re-derive it into.
- **`tests/e2e/held-listener-identity-greens.mjs:676`–`:681` (`HLI-08.4`)** — *"the store's own returned set carries TWO pairs — the ancestor's and the exact one's"*, asserted `triggered.length === 2`. **Its subject is the PASS's selection, and an ancestor pair disappearing is `O-3`'s consequence arriving in a cell that counts constraint-checks rather than firings.** Green today (`:667` writes a new value at a new address); it is the runner whose *figure* would move silently under a re-derived drive.

---
