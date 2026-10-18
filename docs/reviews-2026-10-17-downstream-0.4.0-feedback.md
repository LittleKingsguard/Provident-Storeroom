# REVIEW OF THE DOWNSTREAM REPORT AGAINST PUBLISHED `0.4.0` (2026-10-17, supervisor)

**EVERY CLAIM WAS DRIVEN IN A CLEAN CONSUMER DIRECTORY AGAINST THE INSTALLED `0.4.0`. VERDICT: THE REPORT IS ACCURATE ON EVERY CLAIM I COULD TEST, AND ITS CONTRADICTION CLAIM IS CORRECT — THE ERROR IS THIS PROJECT'S.**

## CLAIM 1 — "THE RELEASE NOTE SAYS THE REGISTRATION-TIME EVALUATION IS *IMPLEMENTED NOWHERE*, BUT THE INSTALLED `0.4.0` RUNS ONE" — **CONFIRMED. OUR DOCUMENT IS FALSE AND THE OBSERVED BEHAVIOUR IS REAL.**

**`docs/release-0.4.0-commands.md:49` READS, VERBATIM AND STILL IN THE TREE: *"RULING 3 IS IMPLEMENTED NOWHERE… UNTIL THAT LANDS, `0.4.0` SHIPS RULINGS 1 AND 2 AND NOT 3."* AND `:51`: *"the registration-time evaluation is declared and not implemented."***
**⟶ THAT TEXT WAS WRITTEN WHEN THE MESSAGE ROUTE WAS STILL BLOCKING — AND THEN THE ARCHITECT RESOLVED THE ROUTE, THE IMPLEMENTATION LANDED, AND THE DOCUMENT WAS NEVER UPDATED.** **The implementation is recorded in this project's own gate-1 record at `§82` (*"RULING 3 IMPLEMENTED and proven live: all three registration states…"*), so the two documents contradict each other and THE RELEASE-FACING ONE IS THE STALE ONE.** **A release document that undersells what shipped is as wrong as one that oversells — and this one would have told a consumer a facility was absent while it was live. RECORDED AS THE SUPERVISOR'S ERROR.**

## CLAIM 2 — "`0.4.0` NOW HANDS THE ROLLBACK ARGUMENT TO THE CALLER IN `log[].opId`" — **CONFIRMED AT THE MECHANISM, AND THE REPORT'S CAUTION IS SOUND.**

**The refusal's `log` entries carry `opId` (supervisor-verified earlier this session: a real entry reads `{seq:1, kind:'constraint-check', id:'c1', opId:'op-1', state:null}`), AND THE KERNEL'S REVERSAL DRIVES THE STORE'S `rollback(op.opId)` PER OP.** **SO THE DATUM A CONSUMER NEEDS AS A RECORD IS THE VERY ARGUMENT A REVERSAL TAKES — a handle-shaped value being handed out as provenance.** **TO REVERSAL-PROOF IT, THE PROJECT'S OWN CONTRACT WOULD NEED THE LOG'S `opId` TO BE DECLARED A RECORD AND NOT AN UNDO HANDLE — AND **NOTHING IN THE CORPUS DECLARES THAT TODAY**. THE OBSERVATION IS ACCURATE AND IS FILED AS A REQUIREMENT AGAINST THE CONSTRAINT UNIT.**

## CLAIM 3 — "THE REVERSAL STILL OVERSHOOTS" — **CONFIRMED. SUPERVISOR-REPRODUCED ON INSTALLED `0.4.0`:**

```
seed ['k']='good'  ·  register a body that PASSES the current state  ·  arm it  ·  write 'bad'
  violating write -> FileCommitFailed | "only good is admitted"
  READ AFTER THREW: AddressNotFound | "'k' does not exist in 'address', it holds no keys"   <-- the lawful pre-existing value is GONE
```
**A VALUE NO CONSTRAINT EVER JUDGED IS DESTROYED, AND IT IS THE SAME DEFECT `DEF-2026-10-17` ALREADY CARRIES FROM `0.3.1`.** **The contract's own atomicity clause is more specific than the build — its checkpoint is *"the op of the last write that left a valid state"* and *"only the ops after it are undone"* — SO THIS IS CONTRACT-VERSUS-BUILD AND NOT A GAP IN THE CONTRACT.** **IT SURVIVED THE `0.4.0` CYCLE BECAUSE IT WAS FILED AND NOT FIXED.**

## CLAIM 4 — PERSISTING DEFECTS, EACH CHECKED

- **"A constraint verdict is labelled `FileCommitFailed` while the kernel's real token is demoted into the log"** — **CONFIRMED, AND IT IS `A120` (2) AS RULED**: *"the entry carries the kernel's token; the throw keeps the store's"*, because the store's closed `16`-member set has no room for a `KC` token and the two-key census is a landed assertion. **SO THIS IS A DECLARED DESIGN THE DOWNSTREAM PROJECT WISHES OTHERWISE — A REQUIREMENT AGAINST THIS PROJECT, NOT A DEFECT IN THIS RELEASE.** **It should be ruled on explicitly rather than left to recur as feedback.**
- **"CLOSED still grows without deletion"** — **CONFIRMED AS A DESIGN GAP: the attempt record's `CLOSED` arm retains without an eviction route; the bound is the journal length and no other.** **A requirement, and consistent with the downstream `R16`.**
- **"The shipped declaration still declares `{address, id}` elements with no body member, so typed code cannot use the batch route without a cast"** — **CONFIRMED BY INSPECTION OF THE DECLARATION'S OWN CLAIM.** **A real type-level gap, and it sits squarely inside `DEF-2026-10-16-Q`'s subject (the declaration ships and is now type-checked, but nothing tests it AGAINST THE RUNTIME'S SHAPE).** **It should be added to that defect's remedy.**
- **"Closed at `0.4.0`: the forged-status path I measured open at `0.3.1`"** — **CONFIRMED, AND THIS PROJECT CLAIMS IT TOO: ruling 2's fix, the discriminator replaced by a symbol-branded identity mark because the log's presence became forgeable.**

## CLAIM 5 — "ITS OWN REVIEW HAD NAMED R6/R7/R16 AS CANDIDATE `0.4.0` SCOPE — ONLY R7 SHIPPED" — **CONFIRMED, AND THE PROJECT'S OWN RECORD AGREES.**

**`§72` of this project's review named R6/R7/R16 as candidate `0.4.0` scope; the `0.4.0` release carries none of them as such. THE DOWNSTREAM PROJECT IS READING THE PROJECT'S OWN RECORD ACCURATELY, WHICH IS THE POINT OF WRITING IT DOWN.**

## ⟶ ONE THING THE REPORT SAYS THAT THIS PROJECT SHOULD CORRECT IN ITS OWN FAVOUR, AND ONE IT SHOULD NOT

**IT SAYS THE REGISTRATION REFUSAL MESSAGE *"misnames a well-formed pair as 'not a valid constraint entry'"* — AND THAT IS TRUE AND IS A FINDING THIS PROJECT ALREADY RECORDED.** **`§8.2`'s row was minted for a SHAPE failure, and the registration instant is a STATE failure; the owed per-instant `<mismatch clause>` was escalated to the architect and remains owed.** **SO A WELL-FORMED PAIR IS TOLD ITS ENTRY IS INVALID — EXACTLY THE MISDIRECTION THE SUPERVISOR PREDICTED WHEN THE PHRASE QUESTION WAS FIRST PUT. THE REPORT INDEPENDENTLY FOUND IT ON PUBLISHED BYTES, WHICH RAISES ITS SEVERITY ABOVE "OWED".**
**AND THE REPORT'S *"U-STORE-CONSTRAINT-REGISTRY STANDS UNCHANGED"* IS CORRECT: `0.4.0` supplies the evaluation and the trace, and does not supply the commit register, the per-graph split, the returned-not-thrown refusal or the declared bound.**
