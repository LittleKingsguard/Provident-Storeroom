# The addon-surface changes requested — a top-level summary (2026-10-18)

**What this is.** The architect's rulings across one session, consolidated. **The authority is `docs/decisions.md`'s ACTIVE rows — `SIX` of them govern the two addon units — cited below by name** (that file's header warns its line anchors drift); this summary is the reading, not the source. The full derivation is archived at `archive/addon-surface-session/2026-10-18/`.

**AND THE COUNT IS CORRECTED 2026-10-19 (`role_spec_writer`): it read `FIVE`, which was true when this summary was written. A SIXTH row was recorded after it — *"FUNCTION REBINDING ON THE STORE IS UNSUPPORTED BREAKING BEHAVIOUR…"* (`docs/decisions.md`'s ACTIVE section, the first row of its table) — and this summary's own reading of `§3.E` depends on it, so leaving it out made this document's authority list incomplete against the very ruling it cites. THE SUMMARY IS THE FINDING HERE AND NOT THE CONTRACTS: a stale copy is corrected toward `docs/decisions.md`, never the reverse. The three copies of the figure — this head, this `§1` heading, and `docs/specs/storeroom-addon-adoption/contract.md`'s *"The five rulings below are the authority"* — now all read `SIX`.**

**What was asked, at the top.** Three concerns raised at code review, and the corrective rulings that followed:

1. **The Node-API boundary was hand-written.** The crate declares the ABI itself in an `extern "C"` block and calls it through `unsafe`.
2. **Debugging showed the wrong thing.** Every store verb routed through one dispatcher, so the verb never appeared as a frame.
3. **Instance identity was redundant**, and stores had no lifecycle — a client could not release one.

---

## §1. THE SIX RULINGS

| Row | The architect's words | What it decides |
| --- | --- | --- |
| **SPLITS AT THE DEPENDENCY BOUNDARY** | *"Split and proceed."* | two units, their boundary, their order, the freeze, four conditions |
| **THE BINDING CRATE FETCHES ON BUILD** | *"Fetch on build."* | `--offline` leaves the binding crate's commands at `ELEVEN` sites; the store's keep theirs |
| **THE STORE IS TORN DOWN BY A GC FINALIZER** | *"Add a store teardown…"* · *"Finalizer"* · *"Wait for file writes to finish before calling finalizer"* | teardown, the file's fate, the wait, the refusal |
| **FOUR CLAUSES … ARE HALLUCINATED OR MISREAD** | *"I know it reverses clauses, the clauses were hallucinated and/or misread"* | four void clauses; the failure form's true member count |
| **THE `STEP 0` ADOPTION DOSSIER IS SEQUENCED IN TWO PASSES** | *"Rule the sequencing"* | the dossier's two passes; the `≤ 8` figure is a budget, not a cap |
| **FUNCTION REBINDING ON THE STORE IS UNSUPPORTED BREAKING BEHAVIOUR…** | *"Function rebinding on the store falls into the category of 'The client is trusted to not attempt unsupported breaking behavior'."* · *"I know re-binding the JS surface is breaking behavior. Stop complaining about it…"* | rebinding is unsupported and the package owes no guard; `U-STOREROOM-ADDON-SURFACE`'s cost count is `1`, and the one cost is the DETACHED CALL |

**AND THE SIXTH ROW IS ADDED HERE 2026-10-19 (`role_spec_writer`) BECAUSE `§3.E` ALREADY RESTS ON IT.** It was cited by name in a surface contract and appeared in **neither this table nor this summary's authority list** — *the two omissions were the same omission, and closing it is why the figure above moves.* It governs these two units directly: it fixes the cost count at `1`, it withdraws the register row and the test-cell pair the earlier text built, and it settles the one thing that separated the detached call from rebinding.

---

## §2. UNIT ONE — `U-STOREROOM-ADDON-ADOPTION`

**A boundary replacement and a lifecycle addition. No verb's signature, return shape or failure changes; the wire is byte-identical.**

**A. THE LIBRARY REPLACES THE HAND-WRITTEN ABI.** A Node-API binding library of the `napi-rs` family enters `bindings/js/Cargo.toml` at a caret floor of `"3.14"`; the `Cargo.lock` stays uncommitted. What goes: the `extern "C"` block, four type aliases, the `unsafe` calls, and the hand-built export table. **What stays untouched: the pure-Rust conversion core** — zero `napi`, zero `unsafe` — **and that is a checkable clause, not an observation.**

**B. THE BUILD FETCHES.** `--offline` leaves the binding crate's declared commands at **eleven sites** — *the figure is stated once, at `docs/specs/storeroom-addon-adoption/command-sites-and-residue.md §2`, which enumerates all eleven and names site `11` the declared clippy leg* — **AND SITE `5`, THE ROOT `build` SCRIPT, IS TWO COMMANDS IN ONE SCRIPT: ITS FIRST HALF IS THE STORE'S AND IS UNMOVED, ITS SECOND HALF IS THE BINDING CRATE'S AND LOSES `--offline`, AND THE SCRIPT IS NEVER ONE OCCURRENCE** (*added 2026-10-20, `role_spec_writer`: the store's half was always named below, and the site table left the two reading as one command, from which a cell was derived demanding `--offline` present and absent of the same string — an unsatisfiable cell. **THE FIGURE IS UNMOVED AND NOTHING IS WITHDRAWN; the two halves are one site and two commands.***); **the store's commands keep it**, and the asymmetry is the ruling. `--manifest-path` stays everywhere — it is not a network flag. **`scripts/publish.sh`'s `PKGS = 1` preflight is rewritten to prove the same property honestly**: the lock's package set exactly matches what the manifests declare.

**C. THE STORE IS TORN DOWN BY A FINALIZER.** `napi` supplies the hook; **no verb is added** — a client that holds its reference forever leaks exactly as today, so no leak becomes worse.

- **It frees the one store that instance owns, and no other** — verified: one construction is one store in its own memory.
- **The file persists and teardown does not touch it.** **Reopening is already the designed path**: the construction creates the file when absent and, on `AlreadyExists`, falls through to an existing write-open that deliberately never truncates. **The persisting file is the seed of the next construction.**
- **The ownership model changes**: a vector cannot lose one element without shifting later indices (re-pointing store #2's calls to store #3) or holding a tombstone that grows unboundedly — **so the store is per-object owned.**
- **The wait is per-store, on a count of open commits.**

**D. THE COUNT — the mechanism, at its final form.** **The count is the number of open commits in the store. A verb brackets it iff it OPENS A COMMIT; a verb finding an extant commit JOINS it rather than opening a second. It is incremented when a commit opens and decremented once on the final return to the client.**

**Five verbs open a commit: `write` · `delete` · `addConstraint` · `constraintOn` · `listen`.**
**Eight do not**, each by a reason the rule supplies: `constraintOff` and the three removals (**removing or disabling cannot fire**) · `register` · `commitFile` (**it writes the file, not the store**) · `rollback` · the three read verbs.

**And the join rule is what makes the count exact**: a nested call passes the extant commit rather than opening a second, so the count cannot drift. **This is the same shape as `write`'s fifth position — the commit record a kernel-driven write carries. The bracketing is not a mechanism beside the commit; it is the commit's own lifetime, observed.**

**E. THE FAILURE FORM.** **Three members — `status`, `message`, `log` — never an `Error`.** **`stack` is part of neither the form nor a prohibition**: it appeared once in a stale header and is an artefact of a plain object having none. **And the obligation that keeps the form: every refusal throws the VALUE, never the library's idiomatic error** — the ergonomic path would breach it.

**F. WHAT IT PRODUCES FOR UNIT TWO: THE FREEZE** — the built artefact's `sha256`, the export name set, and the boundary source's byte count.

---

## §3. UNIT TWO — `U-STOREROOM-ADDON-SURFACE`

**A refactor. A consumer of the package cannot observe it except in one named case.**

**A. ONE ENTRY PER VERB.** The export set moves `5 → 13` — four standing (`version` · `errorMessage` · `storeCreate` · `register`) plus nine per-verb entries. **`call` is deleted; it was the dispatcher.** **`removeListener` gains its own entry** — it was a live arm the filing omitted. **`commit` is neither an export nor an arm: it is `write`'s fourth position.** The verb stops being data and becomes the frame's name.

**B. THE RECEIVER REPLACES THE INDEX.** The integer the package minted dies; each entry resolves its store from the Node-API `this`. **The receiver is a routing carrier, not an authority carrier** — the index was unforgeable only because the caller never saw it, which is obscurity.

**C. ONE REFUSAL ARM.** **A call whose receiver names no live store refuses, in the one declared form** — covering **both** a detached call and a call on a collected store, because they are the same observable. **No member binding and no `WeakMap` lookup**: binding exists only to support a listener that is a store member, **and that is not supported.**

**D. THE JS UNWRAP.** Two wrappers are deleted, and each member calls its own entry directly. **The write wrapper's `ValueNotAdmitted` re-render is preserved** — it moves into the member's body. **`state.id` has three sites and they move together**, the third being on the registration path outside both wrappers.

**E. THE DECLARED COST — ONE, AND IT IS THE DETACHED CALL.** **The first, and the only one: `const { read } = layout; read(…)` is legal today and throws after this change.** Named as a regression, not as a design choice.

**AND THE CONTRACTS ARE REDUCED TO THE SAME ONE LINE — REDUCED 2026-10-19 (`role_spec_writer`), ON THE ARCHITECT'S RULING: *"I know re-binding the JS surface is breaking behavior. Stop complaining about it. A consumer doesn't get to complain that they deliberately broke a package surface and it doesn't work right."* REBINDING A STORE'S FUNCTION IS UNSUPPORTED BREAKING BEHAVIOUR AND THE PACKAGE OWES NO GUARD FOR IT.** **THE MATERIAL REMOVED, NAMED SO ITS ABSENCE IS CHECKABLE: the verbatim ruling restated in each directory, the withdrawn capability-change reading kept beside its successor, the register row `PAR-SAS-15`, the views' `V-6`/`V-12` pair, and the category-with-siblings construction — the list naming a store-member listener, an external supply of `write`'s fifth position and a detached call as siblings.** **THE DETACHED CALL IS NOT REBINDING AND IS NOT REDUCED WITH IT: it is this unit's one declared cost and a real regression.**

**F. ITS WITNESS.** The standing suite does not witness the split, and **a cell's identity must not come from the artefact being changed**. So a **golden capture** is taken before the split against the frozen artefact and diffed case by case after — with each new entry obliged to have at least one cell driving it. **AND THE DIFF COMPARES EVERYTHING EXCEPT THE KEY-SET CELLS** — *added 2026-10-19, because the artefact's key set moves `5 → 13` between the capture and the diff: the key set IS the change and `P-SAS-1` asserts it directly, so a parity diff that included it would fail FOR THE RIGHT REASON and mask every other diff.*

---

## §4. WHAT WAS VOIDED, AND WHY IT MATTERS

**Four clauses the work was measured against turned out to be inventions, and this is the session's most consequential finding:**

| The void clause | What it actually was |
| --- | --- |
| *the export layer is built with a binding library* | a requirement naming an artefact that appears in no manifest, no lock, no build script and no test |
| *the declaration file is hand-authored, not generated* | **a regex** — one publication cell asserting a banner's absence |
| *dependencies are pinned by the caret requirement* | **an empty restatement** — the crate had no versioned dependency at all |
| *never a `stack`* | **a stale header whose body had already moved** |

**And the class of the problem, recorded as a defect: nothing in this repository could distinguish a fabricated clause from a real one.** A clause cited only by clauses derived from it forms a closed loop with no external referent, and that loop is the fabrication signature. **The work paid for that three times** — a filing rejected, a second returned, a third judged flawed — all three measured against clauses that were themselves inventions.

---

## §5. HOW THE WORK WAS GOVERNED, AND WHAT THAT COST

**Six proposal filings, a gate-1 record with eleven conditions, two STEP-0 dossiers, and nine gate-2 review passes.**

**The specification's substance was settled early. Its bookkeeping was not.** **Eleven passes returned `8 → 2 → 1 → 1 → 8 → 7 → 1 → 1 → 1` findings**, and **every closure pass introduced at least one new instance of the same class** — *a claim stated at more than one site where the copies disagree*. The class moved body → part → section header → closure clause → index region → the audit of the audit, each time smaller and one layer deeper. ***(The sequence is extended 2026-10-19, `role_spec_writer`: it once ended at the seventh pass's `7`. The eighth and ninth passes each returned ONE finding, and the ninth's pair — a view's shared line and a row filed under the wrong heading — are `A-1`/`A-2`, both closed in this pass.)***

**The remedy taken was regeneration.** The amendment-layered pair — 839 KB carrying five amendment layers and supersession clauses at dozens of sites — was **archived byte-exactly and deleted**; both units were re-authored from the rulings at **~103 KB, 16 files**, with **no supersession clauses, no amendment layers and no audit tables.** A position appears once and cites the ruling that made it true; the derivation lives in the archive.

**And the honest residue, recorded rather than hidden.** **The three instances this clause once named — a drive whose walk set disagreed with its own body, a dossier row count stated as fixed, and two unqualified `stack` sentences — WERE each closed by a later pass, and the `stack` count itself was low: the verifying pass found FOUR in the surface's contract, of which one was live law and three were already qualified.** **THE CLASS IS NOT CURED BY THEIR CLOSURE, AND THE MECHANISM IS STATED SO IT IS NOT DISCOVERED AGAIN: a hand editing one site leaves its siblings, at a rate roughly equal to what each pass removes.** **THE PASS COUNT IS STATED ONCE, AT `§5` — `Eleven passes returned 8 → 2 → 1 → 1 → 8 → 7 → 1 → 1 → 1 findings`, and every closure pass introduced at least one new instance.** **IT IS NOT RESTATED HERE.** **AND ONE FINDING OF THE LAST PASS WAS OF A KIND THE OTHERS WERE NOT, RECORDED BECAUSE IT IS THE CHEAPEST REMEDY DEMONSTRATED: two findings — `V-6` unrouted and a drive-forgeability gap — were ARTEFACTS OF A NON-PROBLEM HAVING BEEN DOCUMENTED AT LENGTH, and both disappeared when the material was REDUCED to one sentence rather than repaired.** **A documented non-problem generates findings about itself.** **THE PROPOSED REMEDY, NOT YET RUN, is unchanged: a mechanical checker that enumerates every site stating each claim and reports disagreement — the sweep the review passes were doing by eye, which is exactly what the class evades.**

---

## §6. WHERE THINGS SIT

- **`docs/specs/storeroom-addon-adoption/`** and **`docs/specs/storeroom-addon-surface/`** — the two contracts, live. **Both are `NOT DELEGABLE` on the NINTH pass's findings; the specification's content is settled and the remaining findings are bookkeeping.** ***(Corrected 2026-10-19, `role_spec_writer`: both cells once read "the seventh pass's findings". The pass count above moved and these two cells were its copies; `§5` is the count's one home and this clause is not a second one.)***
- **`archive/addon-surface-session/2026-10-18/`** — 27 files, 797,024 bytes: the six filings, the two dossiers, the gate-1 record, both live contract directories as they stand, and the two trackers. Hash-listed at its `INDEX.md`.
- **`archive/addon-surface-regen/2026-10-18/`** — 21 files, 839,239 bytes: the pre-regeneration pair.
- **The red set has not been authored.** Gate 3 is the next step, and it is blocked only by the NINTH pass's findings — none of which changes what the software must do.
