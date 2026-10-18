# DOWNSTREAM REQUIREMENTS — FULL REVIEW AND DISPOSITION (2026-10-17, supervisor)

**EVERY CLAIM MADE BY THE DOWNSTREAM PROJECT ACROSS BOTH REPORTS, CHECKED AGAINST PUBLISHED `0.4.0` AND THIS PROJECT'S OWN CONTRACT. EACH ROW IS A DISPOSITION, NOT A RESTATEMENT.**

## MET — THE DOWNSTREAM PROJECT CONFIRMS THESE AND SO DOES THIS PROJECT

| # | Requirement | Status |
|---|---|---|
| **R1** | `addConstraint({address, id}, fn)` + `constraintOn`/`constraintOff` | **MET** — three of the twelve members, since `A127` |
| **R2/R11** | the write-time evaluation point; a consumer never touching a separate call still gets constraints and listeners | **MET** — the kernel travels in `files` and the write itself evaluates. **THIS WAS THE `0.2.0` FAILURE AND `A121`'s OWN SUBJECT** |
| **R4** | the three return arms (`true` / `{message}` / `{message, repair}`) with the address and landed value in the context | **MET** — and the registration instant's context is declared (`address` the pair's own, `tier`/`op` null, `value` READ) |
| **R5** | the repair is invoked and its write lands | **MET**, and `A135` (3) extends it: a repair registered against a violating state is now ATTEMPTED at registration, its op landing durably |
| **R10** | the join key is the caller's `(address, id)`; a duplicate replaces in place | **MET** — `A126`'s overwrite semantics |
| **R13** | the repair's own op — PARTIAL | **PARTIAL, and the downstream reading is exact: reachable only through the repair's own closure.** **`0.4.0` WIDENS THIS: the refusal now carries the attempt's log, so `log[].opId` and the repair entries cross — WHICH THE DOWNSTREAM PROJECT ITSELF REPORTS AS ITS OWN NEW PROBLEM (see `D-1` below).** |

## NOT PRESENT — CONFIRMED, AND EACH NEEDS A SCOPE RULING RATHER THAN A FIX

**`R3` — THE COMMIT REGISTRY.** **This project's earlier review said the downstream reading was accurate on facts but wrong on framing: the kernel's tokens are ROUTED to the attempt entry by `A120` (2), not discarded.** **⟹ AND `0.4.0` CHANGES THIS MATERIALLY: the entry's `log` NOW CROSSES, so the route the framing-correction pointed at IS reachable — yet the refusal still carries `FileCommitFailed` rather than a `KC` token, WHICH IS `A120` (2) AS LANDED LAW.** **SO `R3` IS NOW A RULING REQUEST, NOT A GAP: the downstream project wants the verdict labelled with the kernel's token, and this project's contract explicitly refuses that because the store's closed set has no room for one.** **IT SHOULD BE PUT TO THE ARCHITECT EXPLICITLY RATHER THAN RECUR AS FEEDBACK.**

**`R6`/`R7` — A CONSTRAINT'S NAME IN A COMMIT RECORD; the repair's op recorded beyond its closure.** **NOT PRESENT, CONFIRMED. `§72` NAMED THESE AS CANDIDATE `0.4.0` SCOPE AND `0.4.0` CARRIED NEITHER — THE DOWNSTREAM PROJECT READ THIS PROJECT'S OWN RECORD ACCURATELY.** **⟹ BUT NOTE: `log[].id` IS THE FAILING CONSTRAINT'S BARE ID, so part of `R7`'s substance NOW CROSSES. THE REMAINDER — the name IN A COMMIT RECORD — is unbuilt.**

**`R14` — A PER-GRAPH SPLIT.** **⟹ ANSWERED BY RULING `A137`, WHICH THE DOWNSTREAM PROJECT HAS NOT SEEN: *"It doesn't need a per-graph split, it can get that by creating multiple stores."* SUPERVISOR-VERIFIED ON INSTALLED `0.4.0`: instances are `WeakMap`-keyed; a constraint on one store does NOT refuse a write to the same address on another; journals mint distinct op ids; and a rollback in one leaves the other virtually untouched.** **SO `R14` IS NOT A SHORTFALL — the capability exists and is measured. THIS IS THE SINGLE MOST IMPORTANT CORRECTION TO SEND DOWNSTREAM: IT REMOVES ONE ITEM FROM THEIR CATALOGUE.**
**AND THE `'secure'` TIER IS SEPARATE FROM `R14` AND IS SETTLED: `crossing.md:342`'s `TierArg` row 1 makes it an explicit OUTSIDE value, and the architect CONFIRMED *"Secure being refused is correct."* NO CONSUMER-SIDE WORK CAN CHANGE IT, AND NO FURTHER ASK IS OWED.**

**`R16` — A REMOVAL ROUTE AND A DECLARED BOUND.** **NOT PRESENT, CONFIRMED. AND THE NAMING HAZARD IS REAL: `constraintOff` IS THE DISABLE HALF OF A TOGGLE, NOT A REMOVAL — a downstream reader looking for removal finds a toggle and mistakes it for one, which is what happened in their review.** **`0.4.0` DID NOT ADDRESS IT.** **AND THE RELATED `CLOSED`-GROWS-WITHOUT-DELETION OBSERVATION IS THE SAME SUBJECT: the attempt record's closed arm retains with no eviction route and the only bound is the journal length.** **⟹ NOTE: THIS IS THE SAME SUBJECT AS THE `DEF-2026-10-17-A` RESIDUES, WHERE A LANDED TEST PINS A SENTENCE ABOUT RETENTION.** **A bound is a `MINOR`-shaped addition and belongs in a scope ruling.**

## ⟹ AND THE TWO DEFECTS `0.4.0` DID NOT FIX, BOTH CONFIRMED TODAY

**`D-1` — THE LOG'S `opId` IS AN UNDO HANDLE, NOT A RECORD.** **The downstream project's `D-1` requires that datum to be a record and never the argument a reversal takes. `0.4.0` HANDS IT OUT AS EXACTLY THAT ARGUMENT — the kernel drives `rollback(op.opId)` per op.** **This project's corpus declares NOTHING about `log[].opId`'s kind.** **⟹ THIS IS A REAL, UNANSWERED REQUIREMENT, AND IT IS SHARPENED BY THE TEMPORAL-STOP WORK NOW IN FLIGHT: once the reversal gains a floor, the id's role could be DECLARED as a record with the reversal taking a separate floor argument — WHICH WOULD SATISFY `D-1` AND THE FLOOR IN ONE AMENDMENT.** **THAT CONNECTION SHOULD NOT BE MISSED.**

**THE REVERSAL OVERSHOOT.** **Confirmed and reproduced on installed `0.4.0`, cause traced to `src/store.rs:2191`'s address-prefix scope — which is `M-5` AS DECLARED LAW.** **A store contract amendment is in flight.**

## THE TYPED-DECLARATION GAP — CONFIRMED BY INSPECTION **AND** BY PROBE

**`bindings/js/index.d.ts:144` DECLARES `readonly constraints?: readonly { readonly address: Address; readonly id: string }[]` — **NO BODY MEMBER**.** **SUPERVISOR-PROBED ON INSTALLED `0.4.0`: the batch route ACCEPTS an element carrying a body (`{address, id, constraint}`) AND ACCEPTS one carrying only `address`+`id`.** **SO THE RUNTIME TAKES A BODY AND THE DECLARATION DOES NOT TYPE ONE — typed code needs a cast, exactly as reported.** **⟹ THIS SITS INSIDE `DEF-2026-10-16-Q`'S SUBJECT: the declaration is now TYPE-CHECKED but nothing tests it AGAINST THE RUNTIME'S SHAPE.** **It should be added to that defect's remedy, and it is the concrete instance that shows why a type-check alone is insufficient.**

## WHAT THIS PROJECT OWES DOWNSTREAM, IN ONE LIST

1. **`A137` — the per-graph split needs no work; create multiple stores.** Removes `R14` from their catalogue.
2. **`R3`'s reframing as a RULING REQUEST rather than a gap** — the verdict's label is `A120` (2) as landed law, and changing it needs the architect.
3. **`D-1` and the temporal-stop floor are ONE amendment** — declare `log[].opId` a record and let the reversal take its floor separately.
4. **`R16`'s removal route and bound, plus the `CLOSED` retention gap** — a `MINOR`-shaped scope ruling.
5. **The declaration's missing body member**, inside `DEF-Q`'s remedy.
6. **The reversal overshoot** — in flight.
