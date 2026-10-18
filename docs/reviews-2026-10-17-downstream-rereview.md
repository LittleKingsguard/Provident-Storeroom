# DOWNSTREAM REQUESTS — RE-REVIEWED AGAINST THE CURRENT TREE (2026-10-17, supervisor)

**EVERY ITEM FROM `docs/reviews-2026-10-17-downstream-requirements-disposition.md` IS RE-CHECKED HERE AGAINST THE TREE AS IT NOW STANDS, BECAUSE FIVE RULINGS AND A TEMPORAL STOP HAVE LANDED SINCE THAT DOCUMENT WAS WRITTEN. SEVERAL DISPOSITIONS HAVE CHANGED AND THIS SUPERSEDES THEM.**

## ⟶ THE HEADLINE CORRECTION: `R6`/`R7` ARE NOW SUBSTANTIALLY DELIVERED, AND THE DOWNSTREAM REPORT DID NOT KNOW

**SUPERVISOR-PROBED ON THE TREE: a store with a registered constraint whose pair is `{address:['k'], id:'named-c1'}`, violated by a later write, THROWS `FileCommitFailed` CARRYING:**
```
log entries: [{"seq":1,"kind":"constraint-check","id":"named-c1"}, {"seq":2,"kind":"outcome","id":null}]
```
**SO THE FAILING CONSTRAINT'S **NAME** — `named-c1`, the caller's own `id` — REACHES THE CONSUMER IN THE THROWN LOG'S `constraint-check` ENTRY (`kind`), WITH ITS SEQUENCE (`seq`).** **THE DOWNSTREAM CLAIM *"a consumer reading `err.status` cannot learn which constraint failed"* IS TRUE OF `status` ALONE AND FALSE OF THE FAILURE.** **THE `0.4.0` LOG ROUTE DELIVERED THIS, AND IT WAS DECLARED IN `§95` AS `R3` MET AS NARROWED — but their catalogue still records `R6`/`R7` as absent.**
**⟹ WHAT REMAINS OF `R6`/`R7`, NARROWED: *"a constraint's name IN A COMMIT RECORD"* — where the record is the COMMIT'S, not the attempt's log — is still unbuilt. And the repair's op id `R13` called PARTIAL: it now crosses IN THE LOG's entries (`opId` is a declared entry member), so `R13`'s substance moved too.** **BOTH NEED RE-ASSESSMENT DOWNSTREAM BEFORE ANY WORK IS COMMISSIONED, because the facility they asked for largely exists and their catalogue says it does not.**

## FULL DISPOSITION AGAINST THE CURRENT TREE

| # | Item | Disposition NOW |
|---|---|---|
| **R1** | `addConstraint`, `constraintOn`, `constraintOff` | **MET** — three of thirteen members; **the set moved `12 → 13` this cycle** |
| **R2/R11** | the write-time evaluation point | **MET** — the kernel travels in `files`; the write itself evaluates |
| **R4** | the three return arms | **MET** — and the registration instant declares the evaluation context (`address` the pair's own, `tier`/`op` absent, `value` READ) |
| **R5** | the repair is invoked and its write lands | **MET**, and **RULING 3 EXTENDS IT: a repair registered against a violating state is ATTEMPTED at registration and its op LANDS durably** |
| **R10** | the join key is the caller's `(address, id)` | **MET** |
| **R13** | the repair's own op | **MOVED — the op id crosses the failure in the log's entries, so the reach is no longer only the repair's closure. RE-ASSESS DOWNSTREAM.** |
| **R3** | a verdict labelled with the kernel's token | **SETTLED AS NARROWED BY RULING, AND MET: `R3`'s in-scope half — reading which constraints failed from the error message — IS DELIVERED by the log's `id`. The out-of-scope half (live-read of a running commit) is ruled out. `A120` (2)'s status provenance is undisturbed.** |
| **R6/R7** | a constraint's name in a COMMIT RECORD; the repair's op beyond its closure | **NARROWED — the NAME reaches the consumer in the thrown log (`seen above`). The COMMIT-RECORD half is unbuilt. RE-ASSESS DOWNSTREAM.** |
| **R14** | a per-graph split | **ANSWERED BY RULING `A137` — not a shortfall.** `"It doesn't need a per-graph split, it can get that by creating multiple stores."` **SUPERVISOR-VERIFIED: instances are independently keyed; a constraint on one store does NOT refuse another's write to the same address; journals mint distinct op ids; a rollback in one leaves the other standing.** **REMOVES `R14` FROM THEIR CATALOGUE.** |
| **R16** | a removal route and a declared bound | **NOT PRESENT, and the naming hazard stands: `constraintOff` is the DISABLE HALF OF A TOGGLE, not a removal.** **`0.4.1` DOES NOT ADDRESS IT.** **⟹ AND THE NEW `constraints()` MEMBER MAKES THE HAZARD SHARPER RATHER THAN BETTER: a consumer can now READ a pair that is disabled, which is correct and declared — *"a disabled pair DOES appear"* — but a reader who expects removal will find the same pair still listed after `constraintOff` and may conclude the toggle failed.** **THE GUIDE OWES THAT SENTENCE.** |
| **`D-1`** | the log's `opId` is an undo handle, not a record | **STILL OPEN AND NOW SHARPER: `0.4.1`'s TEMPORAL STOP GIVES THE SEPARATION `D-1` NEEDS — the floor is the named op's own `seq`, so the reversal no longer depends on the id's reach — BUT NO CLAUSE DECLARES `log[].opId` A RECORD RATHER THAN AN UNDO HANDLE.** **⟹ THE CHANGE THIS CYCLE MAKES IS THE ONE THAT WOULD LET `D-1` BE SATISFIED BY A DECLARATION ALONE, and the declaration is owed.** |
| **THE REVERSAL OVERSHOOT** | **FIXED THIS CYCLE** — `src/store.rs`'s scope filter carries the temporal bound; three probes including one that discriminated the two limbs; the Rust suite went `1 FAILED → 0`; the clause that had called it a *"standing limit"* is withdrawn | **CARRIES INTO `0.4.1`** |
| **THE FORGED-STATUS PATH** | **CLOSED at `0.4.0`**, which their own report confirms | — |
| **THE TYPED-DECLARATION GAP** | **REFUTED IN ITS DOWNSTREAM FORM, WITH A REAL REMNANT** — the declaration's optional body member is CORRECT (`PAR-JS-21`'s evaluator forbids the package-side validation a required member would be), and a body-less element is declared LAWFUL AND NOT A CARRIED PAIR (`§2.12` clause (d), three clauses). **THE REMNANT: a caller who type-checks a pair and gets SILENCE receives no signal, and the silence is declared correct. A clause declaring a SIGNAL is owed — and if the remedy is a refusal it needs a CODE, which collides with the closed `16`.** |
| **`CLOSED` grows without deletion** | **NOT ADDRESSED** — the attempt record retains with no eviction route and the only bound is the journal length. **Same subject as `R16`.** |

## WHAT THIS PROJECT OWES DOWNSTREAM, IN ONE LIST — REVISED

1. **A RE-ASSESSMENT REQUEST, NOT WORK: `R6`/`R7`/`R13` ARE LARGELY DELIVERED by the `0.4.0` log route** — the failing constraint's name and the op id both cross the failure. **Their catalogue predates that and should be re-driven before anything is commissioned.**
2. **`A137` — remove `R14`** (multiple stores).
3. **`R16` + the `CLOSED` retention: one scope ruling, `MINOR`-shaped.** Plus **the guide sentence** the new read makes necessary: a disabled pair still appears, and that is not a failed toggle.
4. **`D-1` — now satisfiable BY DECLARATION ALONE**, because the temporal stop removed the reversal's dependence on the id's reach. **The declaration is owed.**
5. **The signal for a lawful body-less batch element** — spec-side, with the closed-`16` collision named if it is to be a refusal.
6. **`typecheck/consumer-fixture.ts` does not exercise `log` or `constraints()`** — owed to its owner.
