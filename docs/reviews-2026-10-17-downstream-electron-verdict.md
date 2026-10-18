# REVIEW OF THE DOWNSTREAM `Provident-Electron` VERDICT ON `provident-storeroom@0.3.1`

**REVIEWED 2026-10-17 BY THE SUPERVISOR AGAINST THIS REPOSITORY'S OWN BYTES AND RECORDS.** **VERDICT ON THE VERDICT: ACCURATE ON THE FACTS, WITH ONE FRAMING CORRECTION THAT MATTERS, AND ONE ATTRIBUTION THE DOWNSTREAM PROJECT SHOULD NOT CARRY ALONE.**

## WHAT THE VERDICT GETS RIGHT, CHECKED AT THE BYTES

**The R2/R11 finding is confirmed and is the important one.** *"Four writes at a constrained address produced four invocations, with no settle, no kernel call, no second pass"* — **the constraint kernel traverses in `files` as a fourth entry and the write-time evaluation point is real.** **That is the requirement `0.2.0` failed, and `A121` — *"the constraint and repair engine is the point of the session and must be a reachable member at the next release"* — is answered by it.** The downstream reading agrees with this project's own `A121` disposition.

**R1 confirmed:** `addConstraint`, `constraintOn`, `constraintOff` are three of the twelve members (`index.mjs:1887`, `:1895`).
**R4 confirmed:** the three return arms and the context carrying the address and landed value (`A120`, `fts_S_REPAIR_CTX_*`).
**R5 confirmed:** the repair is invoked and its write lands; the record's own `FTS` cells pin it.
**R10 confirmed:** the join key is the caller's `(address, id)` pair — `addConstraint(pair, constraint)` takes the pair as its first position since `A127` dropped the store position; a duplicate replaces in place (`A126`).

## THE FRAMING CORRECTION — R3 IS NOT AN OVERSIGHT, IT IS `A120` (2) AS RULED

**The verdict's facts on R3 are exactly right:** a refused write throws `{status:'FileCommitFailed', message}`; **the per-attempt log and the `KC` tokens are absent from the thrown object and unreachable at the surface.** **Verified: `index.mjs:2947`'s clause states it as the design, and `constraintCrossing` (`:2952`–`:2960`) converts a kernel refusal to the store's two-member form, throwing the refusal verbatim only when its status is NOT a `KC` token.** **The kernel's own `refuse` (`constraint-kernel.mjs:134`) builds `{status, message, log}` — a THREE-member object — and the entry strips the third.**

**BUT THIS IS A RULING, NOT A GAP — `A120` (2), ACTIVE, the architect's own words of 2026-10-16:** *"THE ENTRY CARRIES THE KERNEL'S TOKEN; THE THROW KEEPS THE STORE'S."* **Its recorded reason:** *"no caller-side status can carry a `KC` token"* — the store's closed `16`-member status set has no room for one — **and the attempt's entry carries the kernel's composed token (`KC-8` at the floor, `KC-3` without one) while the throw carries the store's.** **The `Object.keys(caught)` census that pins exactly two members green would be disturbed by a third.**

**SO THE DOWNSTREAM STATEMENT *"the per-attempt log and the kernel's eight KC tokens are discarded at the failing arm and stripped at the surface"* DESCRIBES THE RULED BEHAVIOUR CORRECTLY AND MISREADS IT AS AN ABSENCE.** **The information is not discarded — it is ROUTED: it lives on the attempt's own entry, which is exactly where R6/R7's subject lives.** **The correct downstream ask is therefore NOT *"stop discarding it"* but *"expose the attempt entry the ruling already populates"* — a DIFFERENT requirement with a different remedy.**

## WHAT THE VERDICT IS RIGHT TO CALL ABSENT — CONFIRMED AGAINST THE SPECS

- **R6/R7 — NOT PRESENT, CONFIRMED.** Nothing carries a constraint's name into a commit record; the repair's op id is reachable only through the repair's own closure. **There is no clause promising either, and R13's PARTIAL follows from it.**
- **R14 — NOT PRESENT, CONFIRMED, AND IT IS DECLARED AS OUT OF DOMAIN RATHER THAN MISSING.** **`crossing.md:342`'s `TierArg` row 1 makes `'secure'` an explicit `OutOfDomainTier` outside value, in writing.** **So `'secure'` is refused BY DECLARED DESIGN, not by omission — and `UK-5` being wholly consumer-side is the correct consequence, not a defect.** **The downstream verdict's *"there is no graph concept at all"* is accurate; its implication that this is a shortfall is a scope question for the architect, not a defect in this release.**
- **R16 — NOT PRESENT, CONFIRMED: there is no removal route and no declared bound beyond `journalLength`.** **Note the naming: `constraintOff` is the DISABLE half of a toggle, not a removal** (`index.mjs:1895`, `§2.12` item 2 (a)) — **so a downstream reader looking for removal will find a toggle and mistake it for one, which this review records as a real hazard worth naming.**

## THE ATTRIBUTION THAT SHOULD NOT REST ON THE DOWNSTREAM PROJECT ALONE

**The verdict closes with *"it is the half that is ours"*.** **On this evidence that is half right and half not.** **R3 (as reframed), R6, R7 and R16 are requirements a CONSUMER must be given a surface for — so they are this project's to rule on, because the published package is this project's only deliverable (`A121`'s own mandate).** **R14 is a tier the store refuses by declared design, which no consumer-side work can change.** **A downstream project driving the published surface is entitled to report what it cannot reach; it is not the party that can add the surface.**

## WHAT I RECOMMEND THIS PROJECT DO ABOUT IT

1. **Correct the R3 framing in the reply to downstream** — the tokens are not discarded, they are routed to the attempt entry by `A120` (2); ask for the EXPOSURE of that entry rather than its repair.
2. **Treat R6/R7/R16 as a candidate `0.4.0` scope, not a `0.3.x` patch** — each adds a surface, and `MINOR` is "a member ADDED".
3. **Answer R14 explicitly**: whether a graph concept is in scope for this project at all, since `'secure'`'s refusal is currently declared law (`crossing.md:342`).
4. **Note the `constraintOff`-is-not-removal hazard in the guides**, since a downstream reader has already been misled by it in a review.


---

# ADDENDUM — IS THE CONSTRAINT-VIOLATION AND REPAIR-ATTEMPT LOG REACHABLE BY A CLIENT?

**THE ARCHITECT'S QUESTION, ANSWERED BY MEASUREMENT ON THE PUBLISHED `0.3.1` BYTES. THE ANSWER IS: THE KERNEL WRITES IT AND THE KERNEL CAN READ IT, BUT NO CLIENT CAN REACH EITHER.**

## WHAT THE KERNEL HAS

**`bindings/js/src/constraint-kernel.mjs` exports FIVE items (`kernel-surface.md §1` item 2): `register` · `commit` · `runAttempt` · `log(store, attempt) -> LogEntry[]` · `report(store, attempt) -> AttemptReport`.** **`K-4`'s own clause (`:1302`) reads *"the attempt's own log, OPEN or CLOSED alike"*, and `K-5` returns the attempt report.** **So the log EXISTS, is per-attempt, is built entry by entry (`:236`, `attempt.log.push({seq, …})`), and is readable through two exported functions.** **THE KERNEL'S OWN REFUSAL OBJECT IS THREE-MEMBERED — `refuse(status, message, log)` at `:134` builds `{status, message, log}`.**

## WHAT A CLIENT CAN REACH — THREE MEASURED BLOCKERS, ALL OF THEM STRUCTURAL

1. **THE MODULE IS NOT IMPORTABLE.** The `exports` map declares **one entry, `.`**, so a deep import is refused at the resolution layer: **`import('provident-storeroom/src/constraint-kernel.mjs')` → `ERR_PACKAGE_PATH_NOT_EXPORTED`.** The kernel travels **as a `files` entry — shipped, present on disk, and NOT a reachable subpath.** That is `A122`'s own shape: *"the exports arm set is UNMOVED, the subpath shape is REFUSED BY NAME, and the kernel's five items stay INTERNAL ORCHESTRATION STAGES that no consumer verb exposes."*
2. **THE PRODUCT CARRIES NO MEMBER FOR IT.** Measured on a live instance: **twelve members, and `a.log` and `a.report` are both `undefined`.** The twelve are the ten methods plus `register` and `settle`; **no member returns a log or a report.**
3. **THE THROWN REFUSAL CARRIES TWO KEYS.** `Object.keys(caught)` is **`["status","message"]`** — `status: 'FileCommitFailed'`, and `message` carrying the constraint's own text. **The kernel's third member (`log`) is stripped at the entry's crossing (`constraintCrossing`, `index.mjs:2952`–`:2960`), per `A120` (2) — and the `Object.keys(caught)` census that pins exactly two members green is a landed assertion.**

## SO, PRECISELY

- **IS THE LOG WRITTEN?** Yes — per attempt, entry by entry, with a sequence number and the kernel's composed `KC` token on the entry (`KC-8` at the floor, `KC-3` without one).
- **IS IT READABLE?** Yes — **by the kernel, through `K-4`/`K-5`.**
- **IS IT REACHABLE BY A CLIENT?** **No — not by deep import (refused at resolution), not as a product member (absent), and not on the thrown object (stripped to two keys by a ruled, test-pinned crossing).**
- **WHAT A CLIENT CAN LEARN FROM A REFUSAL:** the store's `FileCommitFailed` status and a message. **Measured: a constraint registered as `{address:['k'], id:'c1'}` returning `{message:'refused by c1'}` produces a thrown `message` of `refused by c1` — so THE CONSTRAINT'S OWN MESSAGE IS PRESENT, while THE ATTEMPT'S LOG, THE SEQUENCE OF ATTEMPTS, THE `KC` TOKEN AND THE REPAIR HISTORY ARE NOT.** **A client therefore learns WHAT failed and NOT WHICH constraint, HOW MANY attempts, WHAT each attempt did, or WHETHER a repair ran.** *(The upstream reading that a client *"cannot learn which constraint failed"* is right for a constraint that returns no message, and wrong where the constraint's own message is supplied — the id itself never crosses.)*

## THE RELEVANT ASYMMETRY, AND WHY THIS IS A SURFACE QUESTION RATHER THAN A BUG

**Nothing here is broken:** the crossing behaves exactly as `A120` (2) rules, the deep-import refusal is `A122`'s declared shape, and the two-key throw is pinned by a green census. **The gap is that a facility the kernel builds on every attempt has NO declared route to the consumer — and the downstream project's own `R6`/`R7` are asking for exactly that route under a different name.** **THIS IS THEREFORE ONE REQUIREMENT, NOT THREE:** exposing the attempt entry the ruling already populates would simultaneously answer the downstream `R6`/`R7` ask and make the log reachable, **and it is a `MINOR` change to the declared surface — a member added — which is a `0.4.0` shape of work, not a `0.3.x` patch.**


---

# SECOND ADDENDUM — THE DOWNSTREAM DEFECT CLAIMS, VERIFIED INDIVIDUALLY ON INSTALLED `0.3.1`

**THE ARCHITECT ASKED FOR THESE TO BE REVIEWED FOR ACCURACY. EACH WAS DRIVEN IN A CLEAN CONSUMER DIRECTORY AGAINST THE PUBLISHED PACKAGE. TWO CONFIRM — ONE OF THEM WORSE THAN REPORTED. ONE DOES NOT REPRODUCE AS DESCRIBED, AND THE REAL BEHAVIOUR IS DIFFERENT AND MORE INTERESTING.**

## CLAIM 1 — THE FORGED-STATUS PATH: **CONFIRMED, AND WIDER THAN REPORTED**

**REPRODUCED EXACTLY:** `storeCreate({journalLength:64, listeners:[], get constraints(){ throw {status:'AddressMalformed', message:'FORGED BY THE CALLER'} }})` **throws `{"status":"AddressMalformed","message":"FORGED BY THE CALLER"}` — A CALLER-CHOSEN STATUS PRESENTED AS THE STORE'S OWN REFUSAL.**
**⟶ AND THE SUPERVISOR'S EXTENSION SHOWS IT IS NOT A NARROW HOLE ABOUT `status`: ANY VALUE A CALLER THROWS FROM THAT GETTER IS RE-SURFACED THROUGH THE STORE'S REFUSAL SHAPE —**
- a thrown plain object with a `status` → **that status, verbatim** (`AddressMalformed | FORGED`);
- a thrown `TypeError('genuine internal conflict')` → **`object | genuine internal conflict`** — an exception that is NOT a store refusal, wearing the refusal's clothes;
- a thrown bare string → **`object | [object Object]`** — a string coerced into a refusal object;
- a thrown `undefined` → **`TypeError: Cannot read properties of undefined (reading 'status')`** — the internal read itself faulting.
**SO THE DEFECT IS NOT *"a caller can forge a status"* BUT *"THE CALLER'S OWN EXCEPTION IS CAUGHT AND RE-SHAPED BY A PATH THAT ASSUMES IT IS THE STORE'S."*** **That is a larger finding, and it is the same class as `DEF-2026-10-17-A`/`-E`: an internal crossing that does not distinguish what it is crossing.** **The fix must not merely validate `status` — it must not present a caller's own throw as a store refusal at all.**

## CLAIM 2 — THE REVERSAL OVERSHOOTS ITS OWN SCOPE: **CONFIRMED, AND IT DESTROYS LAWFUL STATE**

**REPRODUCED EXACTLY:** seed `'good'`, register the constraint, then write `'bad'` → **the write throws `FileCommitFailed` *"only good is admitted"*, and the NEXT READ ANSWERS `AddressNotFound` — *"'k' does not exist in 'address', it holds no keys'"*. A LAWFUL, PRE-EXISTING VALUE THAT NO CONSTRAINT EVER JUDGED IS GONE.**
**AND THE DOWNSTREAM READING IS RIGHT ABOUT WHY IT MATTERS: the reversal removes MORE THAN THE ATTEMPT'S OWN ASSOCIATION, and it exposes NO op list a caller could inspect.** **This project's own clauses NAME the correct target and are more specific than a whole-value reversal — `composition-and-states.md`'s atomicity clause fixes the checkpoint as *"THE OP OF THE LAST WRITE THAT LEFT A VALID STATE"* and states *"ONLY THE OPS AFTER IT ARE UNDONE, AND THE OPS BEFORE IT — AND THE CHECKPOINT OP ITSELF — ARE NEVER UNDONE, WHETHER OR NOT THE ATTEMPT CREATED THEM."*** **SO THE CONTRACT ALREADY SAYS THE SEEDED VALUE MUST SURVIVE, AND THE BUILD DOES NOT HONOUR IT.** **THIS IS A CONTRACT-VERSUS-BUILD DEFECT, NOT A GAP IN THE CONTRACT.**

## CLAIM 3 — THE REPAIR TRAP: **DOES NOT REPRODUCE AS DESCRIBED, AND THE MEASURED BEHAVIOUR IS DIFFERENT**

**THE CLAIM:** *"a repair that closes over the instance and calls `write(addr, tier, val)` … meets 'a constraint attempt is already open at ['k']' and the outer write fails as 'the store refused its own edit'."*
**MEASURED — IT DOES NOT:** a repair closing over the instance calling `a.write(['k'],'mem',{v:'good'})` **PROCEEDS, no throw**; the same with the handed context threaded **also proceeds**. **A third variant — the constraint calling the instance's `write` NESTED INSIDE ITS OWN BODY — ALSO PROCEEDS, and the nested write neither threw nor ran (`inside: null`).**
**⟶ AND HERE IS THE REAL FINDING, WHICH IS WORSE THAN THE REPORTED ONE: IN EVERY VARIANT THE WRITE *PROCEEDS* AND THE VALUE STAYS `{"v":"bad"}` — THE REPAIR NEVER LANDS.** **A constraint that returns `{message, repair}` reports success while the value it was supposed to fix is unchanged, and NOTHING TELLS THE CALLER.** **So the downstream project's `R8`-side complaint is real, but the failure is silent non-repair rather than a thrown 'attempt already open'.**
**CARRIED AS A QUALIFIED CLAIM: the downstream observer may have met that message under a DIFFERENT spelling than the one reproduced here (a repair invoked on a later attempt, or a nested write on an instance already inside an attempt). THIS REVIEW DOES NOT DISPUTE THAT THEY SAW IT; IT RECORDS THAT THE THREE SPELLINGS TESTED DID NOT PRODUCE IT, AND THAT THE BEHAVIOUR THEY DID PRODUCE — SILENT NON-REPAIR — IS ITSELF A DEFECT WORTH MORE THAN THE ONE REPORTED.**

## DISPOSITION

**Claims 1 and 2 are CONFIRMED and file as defects against `0.3.1`; claim 3 is NOT REPRODUCED as described, and the measured behaviour replaces it.** **All three belong to the constraint engine's own unit, which is where the downstream verdict already says the boundary of this package's responsibility lies.** **They are NOT in the returned `0.3.1` and must not be reported as fixed there.**
