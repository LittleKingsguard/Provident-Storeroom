# PROPOSAL — `U-STOREROOM-PUBLISH`: the published package as a DELIVERABLE

**Filed 2026-10-11 by the supervisor, on the architect's ruling: *"Published package is a deliverable."*** **A FILING, NOT A CONTRACT:** it asserts no behaviour clause, licenses no code task, admits no unit row. **Gate state: GATE 1 OPENED, NOT PASSED** — the four steps run on THIS FILE, then the architect's go-ahead. **THE FORM IS DETERMINED BY THE RULING: A NEW UNIT** — the published package is a governed ARTIFACT of this project, not merely a delivered act, which is limb (ii) of the form question the previous filing's `§10` elaborated and priced.

**Supersession, stated plainly:** **this filing SUPERSEDES `docs/specs/storeroom-js-publish-proposal.md` as the artifact-under-review for the publish work.** That filing's gate 1 ran and returned `FLAWED` (`1-validity.md`) and `BLOCKED-ON-SEMANTICS` (`2-critique.md`); **its findings, its `F1`–`F4` cut and its `24` counter-cases, `12` decisions and `20` conditions are THIS UNIT'S STARTING EVIDENCE and are adopted here by reference rather than re-derived**, with its four refuted cells corrected in `§4` below. **The old filing gets a dated pointer clause; nothing in it is deleted.**

## §1. THE ARCHITECT'S RULING, VERBATIM

> Published package is a deliverable

## §2. WHAT THAT MAKES THIS UNIT — the form, and what it buys

**A NEW UNIT, `U-STOREROOM-PUBLISH`, whose DELIVERABLE IS THE PUBLISHED PACKAGE** — the main package, the five platform artefacts, the licence notice they carry, the types, and the evidence that a consumer can install and use them. **THE CONSEQUENCES, EACH ONE OF `§10`'s SIX:**

1. **A FULL GATE 1 runs on this filing** — the four steps, then the architect's go-ahead.
2. **THE UNIT GETS ITS OWN REGISTER (`≤ 8` ROWS, ITS OWN `derivation:` CLAUSE)** — **and that is the form's sharpest gain: the RESOLUTION RULE is a NEW STATE MACHINE over the load path, and it can live here as ITS OWN FAILABLE ROW rather than re-deriving the JS unit's full `8 ≤ 8`.** **THE JS UNIT'S CONTRACT IS NOT THE HOME OF THIS RULE.**
3. **ITS OWN RED SET**, authored from ITS contract alone, run before its implementation.
4. **THE LEDGER MOVES: `2 DONE / 1 open` UNITS = `3`** — the store, the JS unit, and this one.
5. **IT MAY DECLARE ITS OWN ACCEPTANCE LAYER — and it MUST, because the install-time verification has no label today** (the previous gate's `K11`: an install-time proof is neither `ENVELOPE/PURE` nor `LIVE/ASSEMBLED PACKAGE`, so its figure is VOID as authored). **THIS FILING PROPOSES `LIVE/INSTALL`: a real consumer's install of the RELEASED bytes, in a clean directory, through a real package manager, exercised to a final resolved state — additive, `APP` still `NONE`, and never a substitute for the unit's own node legs.**
6. **ITS OWN `DONE` ROW, its own gates, its own records.**

## §3. THE DELIVERABLE, ENUMERATED (so the unit has a definition of done)

1. **The main package** — the identity `A82` ruled (`provident-storeroom`, `0.1.0`, public), its ESM entry, its `files`, its licence notice, its types, its metadata.
2. **The five platform artefacts** — one per target, each installable on its own, each carrying its `.node` **and its own notice**.
3. **The resolution rule** — the entry finds its binary by the order `A83` ruled, with **exactly one failure arm**.
4. **The licence notice** — `Auspicion Innovations LLC` (the architect's own act, commit `e0704e7`) **with the AGPL appendix's programme-name line completed** (`§11`'s named placeholder), and the question of whether the five platform artefacts carry a copy of their own answered rather than assumed.
5. **The types** — the eight verbs, the instance's `{ register, on, off }`, and the failure surface, **with the closed fifteen-member set's enumeration decided** (enumerated as a union and declared immutable-in-version, or typed as an open `string` — `K8`).
6. **The evidence** — `LIVE/INSTALL` (§2.5), plus the CI inputs that produce the bytes it installs.

## §4. THE CORRECTIONS THE PREVIOUS FILING OWES, ADOPTED HERE AS THIS UNIT'S FIRST ACTS

**The four cells the previous gate refuted are corrected by this unit's contract, not by editing the old filing's prose:**
1. **The CI is NOT new** — `package.md §3.2`/`§3.3` and `DD-42` already declare the matrix, the tag rule and the build. **WHAT IS ABSENT IS THE WORKFLOW FILE** — so this unit's contract declares the **workflow's path, host, per-target runners, the tag's actor and the provenance subject**, as the **unlanded execution of a landed clause** (the previous filing's `F-6`), not as a new gap.
2. **The five artefact names are PINNED** (`package.md §3.2`, `DD-25`: a further target is *"a bounded amendment and not a build flag"*) — so the previous filing's *"declared rather than guessed"* becomes **a total table over the five declared names, with every uncovered combination answered by rung two and then by the one absence arm** (`K3`).
3. **The licence dispositions are RE-DECIDED, not inherited**: `bindings/js/LICENSE` is **`DD-43`'s REFUSED arm** and would be a **fifth declaration site** (`package.md §3.4` item 3) — so the tarball's own copy is **declared as the artefact-level fact `§3.4` item 2 already states**, and the spelling divergence stays **declared, not repaired** (its row 26 routes the repair to the contract at a bounded amendment, and this unit may BE that amendment or may decline).
4. **The rename's blast radius is the WHOLE list, not a manifest edit**: `package.json`'s `name` and the five keys · the **SHIPPED** `README.md` · **SEVEN test files that reach the package by SELF-REFERENCE through `name`** · the **TWO BLIND ASSERTIONS** (`JSG-12.10`, `JSG-12.12`) which must be **re-issued by their own author role** · `package.md §3.1`/`§3.2` **and** `contract.md`'s `DD-26` row, **both homes, with a same-pass backup** (`DEF-14`) — and **`DD-26` is an ACTIVE row, so `A82` lands as a BOUNDED AMENDMENT of the JS unit's directory alongside this unit's own clauses.**

## §5. THE STARTING FINDINGS, ADOPTED BY REFERENCE (this unit's raw material, not re-derived)

**`24` counter-cases, `12` decisions and `20` conditions stand as filed at `archive/gate1/storeroom-publish-review/{1-validity,2-critique}.md`.** **THE ONES THIS UNIT'S CONTRACT MUST ANSWER FIRST, each with the previous gate's id:**
- **`K1` the rung-one failure taxonomy** — a corrupt `.node`, a libc mismatch inside one `-gnu` name, a predated ABI: **the catch cannot tell `MODULE_NOT_FOUND` from `ERR_DLOPEN_FAILED`**, so the contract declares **what each state IS and which arm answers it** — and `A83`'s *"ONE failure arm"* must be reconciled with a taxonomy that has more than one state.
- **`K2` the wrong-version binary** — no version read on the load path, while the addon exports `version` with no caller; and `package.md §1.4` item 3 **refuses a runtime ABI check there by name** — so the reconciliation is the contract's.
- **`K3` the mapping's totality** — one declared answer per state, the key set closed at the five declared names.
- **`K4` the unscoped names' hijack surface** — **the entry `require`s a COMPUTED NAME, so whoever registers a platform package first has their binary loaded into a consumer's process.** **THE ARCHITECT HAS NOT RULED THIS, and it is this unit's to put to him**: accept it (with a declared mitigation, e.g. a digest or version check), or re-consider the scope.
- **`K5` the two blind assertions**, **`K6` the amendment form for `DD-26`**, **`K7`'s remaining two licence limbs**, **`K8` the closed set's enumeration**, **`K9` authored vs generated types**, **`K10`/`K11` the smoke test's exclusive halves and its missing layer** (answered by `LIVE/INSTALL` above, §2.5), **`K12` the published bytes tied to no figure**, **`K13` the uncovered-target answer**, **`K14` `libc` absent from `os`/`cpu` and the optional-dependency skip**, **`K16` no partial-publish arm**, **`K19` the ledger and the `## OPEN` arithmetic**, **`K24` no path for the five packages or the workflow, and the reused `Qn` ids**.

## §6. THE FILING'S OWN BOUNDS

1. **IT ADMITS NO UNIT ROW** and licenses no code task; the ledger move in `§2.4` is the unit's **open** row.
2. **IT IS NOT THE CONTRACT** — every clause is owed at gate 2 by `role_spec_writer`, in this unit's own pattern-C directory (`docs/specs/storeroom-publish/`), exhaustive enough for a TestWriter.
3. **THE STORE DOES NOT MOVE** (`src/**`, `tests/**`, its `379`); **the JS unit moves only by the bounded amendment `§4` item 4 names**; the crossing core is untouched.
4. **THE RELEASE ITSELF REMAINS THE ARCHITECT'S ACT** — no pass publishes, in this unit or any other; what changes is that **the artifact it produces is now a governed deliverable with a contract, a register, a red set and a layer**.
5. **NOTHING WAS RUN by this filing beyond read-only inspection** — no `npm`, `cargo`, `node`, pack, install or publish.

## §7. PROVENANCE

**READ AT ITS OWN BYTES:** the previous gate's two reports (the `22` findings and the `24`/`12`/`20` sets) · `bindings/js/package.json`, `index.mjs`'s loader, `README.md` · `docs/specs/storeroom-js/{package,surface,contract,acceptance,implementation-plan}.md` · `docs/pending.md`'s `P-4` · the four trackers · the architect's rulings `A70`–`A83` verbatim · **and the architect's own licence act (commit `e0704e7`, `Copyright (C) 2026 Auspicion Innovations LLC`)**. **NOTHING WAS PUBLISHED, PACKED, BUILT OR RUN.**

## §8. THE HIJACK SURFACE REVIEWED — the threat model refined, and the options priced

**<⟶ APPENDED, DATED, on the architect's request: *"Review options for hijack surface mitigation."* It takes NO ruling.**

### 8.1 THE THREAT MODEL, REFINED — because `K4` AS STATED OVERSTATES IT, AND THE MITIGATION DEPENDS ON WHICH WINDOW IS REAL

**`K4`'s words:** *the entry `require`s a COMPUTED NAME, so whoever registers `provident-storeroom-linux-x64-gnu` first has their binary loaded into a consumer's process.* **THE MECHANISM IS REAL, BUT ITS ENABLING CONDITIONS ARE NARROWER THAN THAT SENTENCE IMPLIES, AND EACH WINDOW HAS A DIFFERENT FIX.** **The load path is `require(<name>)` resolved by the CONSUMER'S RESOLVER — which was populated at install time from THIS package's `optionalDependencies`, where the versions are EXACT PINS (`"0.1.0"`, five times).** **So a squatter wins only if the squatter's package is what RESOLVES under a name-and-version this manifest declares.** **THE FOUR REAL WINDOWS, EACH NAMED:**

| # | The window | What actually happens | Its severity |
| --- | --- | --- | --- |
| **W-1** | **BEFORE this project publishes the five names** — they are unclaimed | An attacker may register one. **But a name registered at a version THIS manifest pins becomes UNPUBLISHABLE BY US** (npm rejects a duplicate name@version), so the attack lands as a **DENIAL of the release, not a hijack of a consumer** — **and today no consumer can install the package at all** (nothing is published). | **DENIAL — real, and closable by claiming first.** |
| **W-2** | **A DIFFERENTLY-VERSIONED COPY HOISTED INTO THE TREE** by another dependency (or by a consumer's own install of a platform package) | npm's dedupe/hoisting could satisfy the loader's `require` with a foreign copy **if the exact pin is ever relaxed** (a caret range, a `*`, or a transitive requirement from another package). **With the exact pins as filed, npm resolves the declared version.** | **REAL ONLY IF THE PINS LOOSEN — so the pins are load-bearing contract, not manifest trivia.** |
| **W-3** | **A NAME OUTSIDE THE FIVE DECLARED ONES** — if the resolution ever computes a speculative key | `K3` already forbids it. **This window is the one `K3` exists to close**, and it is closed by contract, not by a check. | **CLOSED BY `K3`'s TOTALITY, if the clause lands.** |
| **W-4** | **A CONSUMER WHO INSTALLS A PLATFORM PACKAGE DIRECTLY** (or a bundler that resolves it) | That is the consumer's own act on a name they chose; the loader's rung one then loads whatever they installed. | **OUT OF SCOPE — it is not this package's resolution.** |

**AND ONE THING THAT IS *NOT* A WINDOW, STATED SO IT IS NOT CONFUSED WITH ONE: `require` of an ABSENT package throws `MODULE_NOT_FOUND` and the loader falls to rung two and then to the single declared absence.** **An unclaimed name therefore degrades SAFELY today** — the danger is **denial (W-1)** and **substitution (W-2)**, not a silent load.

### 8.2 THE OPTIONS, PRICED

**(A) REMOVE THE SEAM STRUCTURALLY — three variants.**
- **`A-1` SCOPE THE FIVE PLATFORM PACKAGES while the MAIN package stays unscoped** (`@provident-storeroom/js-linux-x64-gnu` …). **A scoped name is claimable only by the scope's owner, so the seam closes COMPLETELY, and it does NOT disturb `A82`** — that ruling named **the main package's** identity, and the five names were always the **supervisor's priced derivation** (`§8` item 2 of the superseded filing), so correcting the derivation is inside the ruling rather than beside it. **Cost:** the main package's `optionalDependencies` name scoped packages while the package itself is unscoped (normal, and worth one clause saying why); and the scope must be owned before the first publish. **RECOMMENDED — it is the only option that removes the seam rather than detecting it.**
- **`A-2` CLAIM THE FIVE UNSCOPED NAMES** (`provident-storeroom-linux-x64-gnu` …) as real platform packages **before** any consumer installs. **Cost:** cheap and effective **against `W-1`'s denial**, but it does **not** survive a name transfer, and it leaves the namespace as the only guard. **RECOMMENDED AS A COMPLEMENT to `A-1` if the scope is refused — not as a substitute.**
- **`A-3` RE-DECIDE THE SCOPE** (back to `@provident-storeroom/js` for the main package). **Cost:** it reverses the architect's ruling. **Not recommended; recorded because it is the strongest structural fix and it is his to take.**

**(B) DETECT SUBSTITUTION AT LOAD — three variants.**
- **`B-1` READ THE ADDON'S OWN `version` AND COMPARE IT WITH THE PACKAGE'S.** **The addon ALREADY EXPORTS `version`** (*"so the artefact can be audited from itself"*) **and NO CALLER USES IT** — the instrument exists and is unwired. **A mismatch is answered by the SINGLE DECLARED FAILURE ARM, never by a fallback** — so a substituted artefact becomes a *declared refusal*, and **this also closes `K2`** (the wrong-version state) with the same clause. **THE RECONCILIATION IT OWES:** `package.md §1.4` item 3 **refuses a *runtime ABI check* in the load path BY NAME** — **and a version read is not an ABI check: it is a read of THIS artefact's own self-report**, so the clause's subject must be narrowed to what it refused (probing the *runtime's* ABI) and the read declared as its own. **Cost: one exported-function call; no dependency; no file read.** **RECOMMENDED — cheapest real mitigation, and it fixes two findings at once.**
- **`B-2` HASH THE `.node` AGAINST A MANIFEST DIGEST.** **Cost:** a ~1 MB hash per load; **five platform-specific digests** to carry (or a per-platform package declaring its own, which the main package cannot verify without trusting it); and **it defends against accident and registry substitution only** — an attacker able to replace the binary can usually edit the digest beside it. **Gain over `B-1`: narrow. PRICED, NOT RECOMMENDED AS PRIMARY.**
- **`B-3` RELY ON NPM'S PROVENANCE/ATTESTATION** (`npm audit signatures`, sigstore). **Cost:** it is a *consumer-side install-policy* control, not a loader control; it does not apply uniformly to `optionalDependencies`; and it requires the CI provenance this unit already owes. **RECOMMENDED AS A PUBLISH-SIDE OBLIGATION, NOT AS THE LOAD-PATH FIX.**

**(C) CHANGE WHAT CAN WIN — two variants.**
- **`C-1` CLOSE THE KEY SET AT THE FIVE DECLARED NAMES** (what `K3` already demands): the entry must never `require` a computed name outside the declared set, so **`W-3` cannot exist**. **Cost: none beyond `K3`'s clause. RECOMMENDED — and it is already required.**
- **`C-2` SHIP THE BINARY INSIDE THE MAIN PACKAGE — no computed `require` at all.** A binary that ships in the tarball you installed **cannot be hijacked**, because nothing is resolved by name. **Cost:** it changes the DISTRIBUTION SHAPE from *"one main + five deps"* to **per-platform main packages** (the same six names, a different graph) or to a single package carrying one platform's binary — **which is the "per-platform tarballs" candidate the superseded filing priced and set aside.** **THE STRONGEST STRUCTURAL FIX; THE MOST EXPENSIVE IN SHAPE.** **RECOMMENDED ONLY IF THE ARCHITECT WANTS THE MATRIX GONE.**

**(D) DECLARE IT A CONSUMER HAZARD.** **Cost:** zero, and honest — a lockfile plus `npm ci` plus an integrity-checking registry client is the standard control. **BUT THIS PROJECT'S OWN DISCIPLINE PREFERS A STRUCTURAL FIX WHERE ONE EXISTS**, and one does. **NOT RECOMMENDED ALONE; recommended as the fallback's wording if `A`/`B` are both refused.**

### 8.3 THE RECOMMENDATION, PRICED AND REVERSIBLE

**TAKE THREE, IN THIS ORDER: `A-1` (scope the five platform packages — the seam removed), `B-1` (the version read on load — substitution detected, `K2` closed, one failure arm), and `C-1` (`K3`'s total table — no name outside the five).** **Together they close `W-1`'s denial, `W-2`'s substitution and `W-3`'s speculation, and they leave `W-4` where it belongs — the consumer's own act.** **`A-2` is the complement if the scope is refused; `B-2`, `B-3` and `D` are priced, and `C-2` is available if the matrix itself is unwanted.** **NOTHING HERE IS A RULING: the seam is a consequence of `A82`'s naming, so the architect may close it by scope, by detection, or by accepting it in writing — and the last of those is legitimate if said out loud, which is what this section exists to make possible.**
## §9. THE ARCHITECT'S MITIGATION RULING OF 2026-10-11 — `A-1`, `B-1` and `C-1` adopted

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Implement the three recommendations

**THE RULING, TRANSCRIBED AS `A84` — it adopts `§8.3`'s three, and with them the whole of `§8`'s threat model as the unit's starting reading.**

| # | The option | What it settles |
| --- | --- | --- |
| **`A-1`** | **SCOPE THE FIVE PLATFORM PACKAGES** while the MAIN package stays unscoped (`A82`'s `provident-storeroom`) — `@provident-storeroom/js-linux-x64-gnu` and its four siblings | **A scoped name is claimable only by the scope's owner, so `W-1`'s denial and `W-2`'s substitution are removed STRUCTURALLY, not detected.** **AND IT DOES NOT DISTURB `A82`:** that ruling named **the main package's** identity, and the five names were the **supervisor's priced derivation** (`§8` item 2 of the superseded filing) — correcting a derivation is inside the ruling. **BLAST RADIUS:** `package.json`'s five `optionalDependencies` keys · the entry's resolved-name construction · `package.md §3.2`'s five-name table **and** `contract.md`'s `DD-25`/`DD-26` cells (**both homes**) · the two blind assertions (`JSG-12.12` names five unscoped labels; `JSG-12.10` names the main package's identity, which does NOT move) · and the record cells that print the old five. |
| **`B-1`** | **WIRE THE VERSION READ ON LOAD** — the addon's own `version` compared with the package's, a mismatch answered by the **SINGLE DECLARED FAILURE ARM** | **The instrument already exists and is unwired** (the addon exports `version` *"so the artefact can be audited from itself"*, with no caller on the load path). **IT CLOSES `K2` (the wrong-version state) WITH THE SAME CLAUSE, and it detects `W-2`'s substitution even where a scope cannot help.** **THE RECONCILIATION IT OWES: `package.md §1.4` item 3 refuses a *runtime ABI check* in the load path BY NAME, and a VERSION READ IS NOT AN ABI CHECK — it is a read of THIS artefact's own self-report — so that clause's SUBJECT is narrowed to what it refused (probing the RUNTIME's ABI) and the read is declared as its own.** |
| **`C-1`** | **CLOSE THE KEY SET AT THE FIVE DECLARED NAMES** | **`W-3` cannot exist: the entry never `require`s a computed name outside the declared set.** `K3` already demands the total table; this ruling makes it the rule the code follows. |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE THREE ARE ONE COHERENT MITIGATION: `A-1` removes the seam, `B-1` detects what a seam would leave, `C-1` bounds what can even be named — and together they close `W-1`, `W-2` and `W-3`, leaving `W-4` (a consumer installing a platform package directly) as the consumer's own act.** **(2) `B-1` AND `C-1` ARE CODE-BEARING: the version read is a new load-path state with its own failure arm, and the closed table is a new admission rule — so both are this unit's CONTRACT clauses and its RED SET's drives, authored from the contract, run before the code.** **(3) `A-1` TOUCHES THE JS UNIT'S CONTRACT IN TWO HOMES: `package.md §3.2`'s five-name table and `contract.md`'s `DD-25`/`DD-26` rows — so the rename's bounded amendment (already owed for `A82` per `§4` item 4) now carries BOTH the main package's unscoped name AND the five scoped platform names in the same pass, with a same-pass backup (`DEF-14`).** **THE GATE'S ORDER IS UNCHANGED: `§8`'s review and this ruling close the SEMANTIC input; steps 3 and 4 of gate 1 then run on this filing, the contract follows at gate 2, and the red set precedes the code at gate 3.**
## §10. THE OPEN QUESTIONS ELABORATED — the four the gate put to the architect, and three the rulings themselves opened

**<⟶ APPENDED, DATED, on the architect's request: *"Elaborate on open questions."* It takes NO ruling. Each row is answerable in ONE LINE, and each carries a recommendation so that *"defaults"* is always a lawful answer.**

### 10.1 THE FOUR THE GATE PUT — each with its options priced

**`Q-1` — DOES THE MAIN PACKAGE SHIP ANY BINARY?** *(closes union row 16: `F-12`, `K13`, `D-4`; conditions `AR-11`, `AR-18`.)*
**THE STATE:** `bindings/js/package.json`'s `files` is `index.mjs · README.md · build/Release`. Once the five platform packages exist, a publish from one machine would tuck **one platform's** `.node` into a main package that claims five.
- **(a) DROP `build/Release` from `files`.** The tarball ships no binary; **rung one carries every consumer**; **rung two becomes a checkout-only rung** — which is exactly the in-place developer loop and every battery that exists today. **Cost:** `K13`'s uncovered-target consumer gets **no binary and no buildable route** (the tarball carries no manifest, no `src/**`, no `build.rs`), so their only route is to build the crate themselves — **which `A71`'s publish-with-prebuilds ruling exists to remove.** **Mitigation available:** declare the uncovered-target answer honestly and, if the architect wants it actionable, ship the **crate's** source in a *second*, non-registry distribution (a source archive) rather than in the npm tarball.
- **(b) KEEP `build/Release` in `files`.** The tarball would carry the publisher's platform binary **and** five claimed artefacts. **Cost:** a package whose bytes depend on **which machine published it** — the one thing a reproducible release cannot have — and it would give rung two a binary on the publisher's platform only, which is worse than no binary (it makes the *same* package behave differently by publisher).
- **(c) SHIP ONE BINARY IN A PER-PLATFORM *MAIN* PACKAGE** — i.e. collapse the matrix (`C-2` of `§8.2`). **Cost:** it changes the distribution shape; **gains:** no computed name exists to hijack, and `K13` dissolves.
**RECOMMENDATION: (a).** It is the only one compatible with *"the tagged commit's bytes are the released bytes"*, it preserves the in-place loop verbatim, and it makes the uncovered-target answer a **declared limitation** instead of a silent one — with the source-archive mitigation available if the architect wants that answer actionable. **REVERSAL: one line, and it is a `files` edit.**

**`Q-2` — MAY THE `.d.ts` ENUMERATE THE STORE'S CLOSED FIFTEEN-MEMBER SET AS AN IMMUTABLE UNION?** *(closes union row 17's `K8`/`K9` halves; condition `AR-13`.)*
**THE STATE:** the store owns a **closed** fail set of fifteen, whose membership has already moved once (`14 → 15`), and `P-4` prices a **sixteenth** for a future carrier. An **immutable** `0.1.0` type that enumerates it would **mint a second authority for a set the store's contract owns** (`§0.1` item 9: *"MINTS NO CODE, WIDENS NO SET"*) — and the shipped build already emits a status outside the declared set on three paths (`SW-1` row 10's minted `"TypeError"`).
- **(a) AN OPEN `string` FOR `status`,** with the closed set **declared in prose** (the docs') and narrowed at the consumer's own assertion. **Cost:** a consumer loses compile-time exhaustiveness; **gain:** no type can be falsified by a later ruling.
- **(b) AN IMMUTABLE UNION** of the fifteen, with the **version-bump rule** that any set change is a **major** (per `§8` item 4's default). **Cost:** every added member makes every installed `0.1.0` type **narrow and wrong**, and the store's own precedent (a sixteenth already priced) says the set **will** move; the union would then mis-type a *lawful* refusal.
- **(c) A UNION OVER A DECLARED-BUT-OPEN SET** — a `storeStatus` union **plus** an explicit escape (`| (string & {})`), so the known members are discoverable and an unknown one is still typed. **Cost:** slightly weaker exhaustiveness; **gain:** it survives a ruling, and it is honest about what the package can know.
**RECOMMENDATION: (c)** — it is (a)'s safety with (b)'s discoverability, and it states in the type itself that the set's **membership is the store's, not the package's**. **AND THE COMPANION DECISION, `K9`: AUTHORED OR GENERATED?** — **the unit's plan declares a *generated* `.d.ts` and a binding library that the shipped crate does not depend on, while the crate is deliberately dependency-free.** **RECOMMENDATION: authored**, with the generator recorded as a later option — and the `implementation-plan.md`'s build-surface row amended in the same pass if the architect agrees.

**`Q-3` — IS A PUBLISHED PACKAGE A GOVERNED ARTIFACT WHOSE LEDGER ROW THIS UNIT MOVES?** *(closes union rows 18 and 21; condition `AR-22`'s ledger half.)*
**THE STATE:** his ruling *"Published package is a deliverable"* made the **form** a new unit; the ledger's census rule (his own) says an **amendment is a row and never a unit**, so a **unit** moves it. The tracker currently reads **`2 DONE / 1 open` UNITS = `3`** — `N6`'s row was opened at this filing, so the move is **already taken**; what is owed is his **confirmation** that the count is his to admit (and not a pass's).
- **(a) CONFIRM: the ledger moves `2 DONE / 1 open` → `3 DONE / 0 open` UNITS = `3` on the unit's close-out, admitted by his act.** **Cost:** none; **gain:** the published package is governed exactly as the other two units are.
- **(b) DECLARE THE UNIT A NON-UNIT OPERATION** — the released package is a delivered act with a checklist. **Cost:** it **reverses** the form ruling, leaves the deliverable without a contract, and re-opens the whole form question `§10` of the superseded filing answered.
**RECOMMENDATION: (a).** It is what *"is a deliverable"* already means, and it is the only reading under which the register, the red set and the layer this unit has just been given are governed artifacts rather than a pass's private bookkeeping.

**`Q-4` — THE PARTIAL-PUBLISH ARM.** *(closes union row 24; condition `AR-16`.)*
**THE STATE:** npm versions are **immutable**; the release publishes **six artefacts in a mandated order** (five platform packages, then the main). If `k` of six lands (a name refused, a token expiry, a CI outage, a registry fault), **`0.1.0` is half-spent** and no clause declares a recovery.
- **(a) DEPRECATE AND RE-PUBLISH UNDER A NEW VERSION** (`0.1.1`): the tag is re-cut, the six artefacts publish anew, and the half-published `0.1.0` is **deprecated** with a message naming its replacement. **Cost:** a version number is spent on a failure; the tag's immutability rule (`DD-42`) needs one clause saying **a failed release may be re-cut as the next patch**. **Gain:** it is the only arm that leaves a consumer able to install a **complete** release.
- **(b) RECOVER IN PLACE ON `0.1.0`** — publish the missing `k` late, against the same tag. **Cost:** **the version's bytes become time-dependent** (a consumer who installed at `t1` has a different set from one at `t2`), and npm's immutability means the *main* package can never be re-published to unify them — so recovery works only if the **main** package was the last to publish, which the mandated order makes the normal case but not a guarantee. **Gain:** no version is spent.
- **(c) DECLARE NO RECOVERY ARM** — the release is atomic in intent and a failure requires an architect's ruling. **Cost:** the honest one is that the state is unplanned; **gain:** no clause forecloses a later choice.
**RECOMMENDATION: (a) with (b) as its precondition** — i.e. **order the publishes so the main package is last** (the ruling already does), **declare that a failure before the main package is recovered in place on the same version**, and **a failure after it is answered by deprecate-and-re-publish at the next patch.** That is one clause covering both windows, and it spends a version only when nothing else can work.

### 10.2 THREE THE RULINGS THEMSELVES OPENED — not the gate's, but `A-1`'s and the CI's

**`Q-5` — `A-1` RE-INTRODUCES A SCOPE, SO AN NPM ORG MUST BE OWNED.** **`A82` dissolved the scope-ownership problem by making the MAIN package unscoped; `A-1` then scoped the five PLATFORM packages (`@provident-storeroom/js-linux-x64-gnu` …), and a scoped name exists only inside an npm org/scope.** **So `A-1`'s structural fix costs exactly one thing: the `@provident-storeroom` scope must be owned (or the platform packages re-scoped to an org the architect owns) before the first platform publish.** **THE OPTIONS: (a) own `@provident-storeroom` — recommended, and the same org can carry later packages; (b) scope the platform packages to another org he owns (a different scope for platform artefacts than the project's name suggests — a small naming cost, no structural change); (c) return to unscoped platform names, which is `A-1` refused and `W-1`/`W-2` re-opened.** **ANSWERABLE IN ONE LINE: which scope owns the five.**

**`Q-6` — THE CI HOST, THE RUNNERS AND THE PROVENANCE SUBJECT.** **`package.md §3.2`/`§3.3` and `DD-42` already declare the matrix, the tag and the build — but the repository carries NO remote this project's own records name, no `.npmrc`, and no CI configuration of any kind** (`[M]`: the earlier gate measured the absence set). **The unit's contract owes the workflow's PATH, its HOST, the per-target RUNNER, the TAG's ACTOR and the PROVENANCE subject — and a provenance attestation whose source repository a consumer cannot reach is not verifiable.** **THE OPTIONS: (a) GitHub Actions with OIDC provenance — recommended if the repository is (or will be) public there, since npm's provenance integrates with it natively; (b) another CI host, with provenance declared rather than attested; (c) no CI — the five artefacts built by hand and the release act unchanged, with the reproducibility claim *"per target"* declared but unwitnessed.** **ANSWERABLE IN ONE LINE: which host builds the tagged bytes, and is the source repository public?** **AND THE METADATA RIDES WITH IT (`D-11`): `repository`/`homepage`/`bugs` need the remote's URL, and this repository carries none — so either the architect names one, or the fields are declared absent rather than guessed (an immutable manifest field naming a path that does not resolve is a finding by the project's own citation rule).**

### 10.3 ONE THAT IS **NOT** OPEN — derivable, and recorded so it is not asked

**`Q-7` — THE MUSL ANSWER IS FORCED, NOT CHOSEN.** **`C-1` closes the key set at the five declared names and `K3` demands totality, so a `-musl` runtime CANNOT get a sixth name.** **Therefore: a musl runtime takes rung two (the in-place path when it exists) and then the single declared absence — and the contract must SAY that, with the musl case named in its table.** **`libc`'s absence from the `os`/`cpu` fields follows: the fields cannot express musl, so the *installer* will install the `-gnu` artefact on a musl host and the *loader* must answer the resulting `dlopen` failure with the one declared arm** (`K14`). **No ruling is owed here; the clause is.** **AND THE SAME HOLDS FOR EVERY UNCOVERED PAIR (`linux ia32`, `linux ppc64le`, `linux s390x`, `freebsd`, `win32 ia32`, `sunos`, `android`): one declared answer each, in a total table, and none of them a new name.**

### 10.4 THE SHORT FORM — what to answer, and what each answer closes

| # | The question, in one line | The recommendation | What it closes |
| --- | --- | --- | --- |
| **1** | Does the main package ship a binary? | **no** — drop `build/Release` from `files`; the uncovered-target answer is declared, with a source archive if you want it actionable | row 16 · `AR-11`, `AR-18` |
| **2** | Does the `.d.ts` enumerate the closed set immutably? | **no** — a union over a declared-but-open set (`\| (string & {})`), authored, with the generator recorded as a later option | row 17 · `AR-13` |
| **3** | Does the unit move the ledger? | **yes** — `3 DONE / 0 open` UNITS = `3`, on your admission at the close-out | rows 18, 21 · `AR-22`'s ledger half |
| **4** | The partial-publish arm? | **recover in place before the main package; deprecate-and-re-publish at the next patch after it** — one clause, both windows | row 24 · `AR-16` |
| **5** | Which scope owns the five platform packages? | **`@provident-storeroom`**, or another org you own — named in one line | `A-1`'s precondition |
| **6** | Which host builds the tagged bytes, and is the source public? | **named by you**; the metadata fields follow from the answer, or are declared absent | `AR-14` · `D-11` |
| **7** | *(not a question)* the musl and uncovered-pair answers | **forced** by `C-1` + `K3`: one declared answer each, and no new name | `AR-3`, `AR-17` |
## §11. THE ARCHITECT'S DEFAULT RULING OF 2026-10-11 — *"Proceed with defaults"*, and the seven carried as priced, reversible defaults

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Proceed with defaults

| # | The question | The default ADOPTED (`§10`'s recommendation) | Its REVERSAL POINT |
| --- | --- | --- | --- |
| **`A85`(1)** | **`Q-1` does the main package ship a binary?** | **NO — `build/Release` LEAVES `files`.** Rung one carries every consumer; **rung two is the checkout-only rung it already is** in the in-place loop and in every battery; **the uncovered-target answer is DECLARED as a limitation**, with the store crate's source offered as a **separate, non-registry archive** if that answer is ever wanted actionable. | one line + a `files` edit; the source-archive option is additive |
| **`A85`(2)** | **`Q-2` may the `.d.ts` enumerate the closed set immutably?** | **NO — a UNION OVER A DECLARED-BUT-OPEN SET** (the fifteen discoverable, an unknown status still typed), **AUTHORED not generated**, with the closed set's membership **declared in prose as the store's**. The generator is recorded as a later option. | one line; the type file is one artifact, and its authoring is a `files`-level change |
| **`A85`(3)** | **`Q-3` does the unit move the ledger?** | **YES — `2 DONE / 1 open` → `3 DONE / 0 open` UNITS = `3` ON THE ARCHITECT'S ADMISSION at the close-out**, the unit's `DONE` row being his to admit exactly as the other two were. | the admission itself; a pass may not move a count |
| **`A85`(4)** | **`Q-4` the partial-publish arm** | **ONE CLAUSE COVERING BOTH WINDOWS: the six publishes are ordered so the MAIN package is LAST; a failure BEFORE it is RECOVERED IN PLACE on the same version (nothing a consumer installed is incomplete); a failure AFTER it is answered by DEPRECATE-AND-RE-PUBLISH at the next patch.** | one line; the clause names both windows so either may be re-decided alone |
| **`A85`(5)** | **`Q-5` which scope owns the five platform packages?** | **`@provident-storeroom`** — the scope `A-1`'s names already spell — **carried as a priced default whose PRECONDITION is that the scope is owned before the first platform publish**, and whose reversal is a one-line re-scope of the five names (manifest + entry + `package.md §3.2` + `DD-25`/`DD-26`, one pass). | one line before the first publish; after it, a rename |
| **`A85`(6)** | **`Q-6` the CI host, runners, provenance and metadata** | **GITHUB ACTIONS WITH OIDC PROVENANCE AS THE DECLARED DEFAULT**, with the workflow's path, its five runners, the tag's actor and the provenance subject declared in this unit's contract; **THE SOURCE REPOSITORY'S VISIBILITY IS DECLARED, NOT ASSUMED — a provenance attestation whose source a consumer cannot reach is declared-not-attested in the record.** **THE METADATA FIELDS (`repository`/`homepage`/`bugs`) ARE DECLARED ABSENT rather than guessed**, since an immutable field naming a path that does not resolve is a finding by the project's own citation rule — **and `keywords`, a long `description` and `author` are supplied without a remote.** | any host, one line; the metadata fields are written the moment a remote exists |
| **`A85`(7)** | **`Q-7` the musl answer and the uncovered pairs** | **NOT A DEFAULT — FORCED BY `C-1` + `K3`:** one declared answer each, **rung two then the single declared absence**, and **NO SIXTH NAME**. `libc`'s absence from `os`/`cpu` follows, with the `dlopen` failure answered by the one declared arm. | none available — a sixth name is a bounded amendment, and the clause says so |

**AND FOUR CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) EVERY DEFAULT IS PRICED AND REVERSIBLE, AND EACH NAMES ITS INSTRUMENT — NO DEFAULT IS A SILENT CHOICE, AND NONE IS A PARK.** **(2) THE TWO WHOSE PRECONDITIONS ARE FACTS ONLY THE ARCHITECT KNOWS (`A85`(5)'s scope and `A85`(6)'s host/visibility) ARE CARRIED AS DEFAULTS WITH THEIR PRECONDITIONS WRITTEN INTO THE CLAUSE, so the contract can be authored now and the release act is not blocked by them.** **(3) THE SEMANTIC INPUT FOR GATE 1 IS NOW CLOSED: `A82` names the identity, `A83` fixes the order, `A84` settles the three mitigations, `A85` carries the seven defaults, and the licence lines are signed — so STEP 4 MAY RUN ON ITS OWN DETERMINATION.** **(4) NOTHING HERE ADMITS A UNIT ROW: `A85`(3)'s ledger move is HIS admission, and a pass may not take it.**
## §12. THE ARCHITECT'S SCOPE RULING OF 2026-10-11 — the five platform packages move to `@auspicion`

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Change org to @auspicion

**THE RULING, TRANSCRIBED AS `A86` — it changes the SCOPE the five platform packages live in, and it answers `A85`(5)'s precondition with an org rather than with a name.**

| # | What it answers | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A86`** | **`A85`(5) — *"which scope owns the five platform packages?"*, carried as a priced default whose precondition was that the scope be owned** | ***"Change org to @auspicion"*** | **THE FIVE PLATFORM PACKAGES MOVE FROM `@provident-storeroom/…` TO `@auspicion/…`, so the precondition is an org the architect controls rather than one named after the project.** **`A-1`'s structural guarantee is unchanged: a scoped name is claimable only by the scope's owner, so `W-1`'s denial and `W-2`'s substitution stay closed.** **AND THE MAIN PACKAGE IS UNTOUCHED: `A82` ruled it UNSCOPED (`provident-storeroom`), and this ruling changes an ORG, not that identity.** |

**ITS DERIVATION — AND THE ONE PLACE THE RULING ADMITS TWO READINGS, EACH STATED SO THE CHOICE IS VISIBLE.** **The five declared names are `@provident-storeroom/js-<label>`; the ruling names the ORG and is silent on the `js-` part after it. Two readings follow:**
- **`A86`(a) — THE LITERAL READING (the operative default, because it is the minimal change the words order): the scope alone is replaced, so the five become `@auspicion/js-linux-x64-gnu` · `…/js-linux-arm64-gnu` · `…/js-darwin-x64` · `…/js-darwin-arm64` · `…/js-win32-x64-msvc`.**
- **`A86`(b) — THE IDENTITY-PRESERVING READING (priced as the alternative): `@auspicion/storeroom-js-<label>`, which keeps the project's own name in every artefact's identity — at the cost of a longer name and of reading differently from the main package's `provident-storeroom`.** **ITS REVERSAL IS THE SAME ONE LINE, and it must be taken BEFORE the first platform publish: after it, a scoped name is spent.**
**THE SUPERVISOR CARRIES `(a)`, and says so, because a scope change is what was ordered and `(b)` is a naming preference the architect may take in one line at no cost — today.**

**⟶ AND THE BLAST RADIUS'S TWO COUNTED TERMS ARE CORRECTED BESIDE THEMSELVES, 2026-10-11 BY THE `U-STOREROOM-PUBLISH` CLOSE-OUT PROOFREADING PASS (`role_proofreader`), `RCA-8(d)` ANNOTATE-BESIDE: item `6`'s and item `7`'s bytes stand as filed and are read THROUGH this correction, and NOTHING ABOVE MOVES.** **ITEM `6` names the blind set's TWO moving rows — `JSG-12.12` (which moves) and `JSG-12.10` (which does not); THE SET'S OWN RE-DERIVATION AT THIS UNIT'S `Q5` EQUIVALENT ADDED A THIRD IDENTITY ROW, `JSG-12.18` (the `files` allowlist), so the identity-row set the rename's sweep must read is THREE and not two** (`docs/specs/storeroom-js-greens.md` `JSG-12`'s clause, item `5`). **AND ITEM `7`'s COUNTER-CELL FAMILY IS RE-READ AGAINST THE TREE: the RED set's `S-SCOPE` cells and `NG-PUB-H` stand, and the JS leg's OWN self-referencing files now number NINE — the seven of item `4`'s class plus this unit's `publish.test.mjs` and `publish-generators.test.mjs`, each of which imports the package by its own name — so the rename's test-side radius is `9` specifiers and not `7`** (`bindings/js/test/*.test.mjs`). **NO BINARY MOVES, NO BEHAVIOUR MOVES, THE STORE IS UNTOUCHED, AND NO FIGURE OF THIS FILING IS WITHDRAWN.** `[A3 docs/specs/storeroom-js-greens.md` `JSG-12`'s clause item `5`; A3 `bindings/js/test/*.test.mjs` — the nine self-referencing files at their own specifiers | numeric or census claim]`

**ITS BLAST RADIUS, NAMED SO IT IS NOT DISCOVERED LATER — and it is the SAME CLASS the project has now walked twice, so the count is knowable:**
1. **`bindings/js/platforms/<label>/package.json` × 5** — each `name`, the scope segment only.
2. **`bindings/js/index.mjs`** — `PLATFORM_NAMES`' five literals.
3. **`bindings/js/package.json`** — the five `optionalDependencies` KEYS (values stay `0.1.0`).
4. **The unit's contract** — `distribution.md §3.1`/`§3.2`'s five-name table, `resolution.md §3.1`, `contract.md`'s `PUB-DD-15`/`PUB-DD-6` and `§5.6`'s `S-SCOPE` failure list, `parameter-semantics.md`'s `PAR-PUB-17` and `§2.1`.
5. **The JS unit's contract** — `package.md §3.2`'s five-name table **and** `contract.md`'s `DD-25`/`DD-26` cells (**both homes**), which `A84`'s `A-1` already owed a bounded amendment.
6. **The BLIND set** — `JSG-12.12` (the five names, character-for-character) is the row that moves; **`JSG-12.10` (the main package's identity) does NOT**.
7. **The RED set** — `S-SCOPE`'s four cells and `NG-PUB-H`'s manifests; the counter-cell family reads the contract's table.
8. **The LIVE battery** — `LIVE-8.7`'s rung-one subject, which names the platform package it `require`d.
9. **The records** — the gate records that print the five, and the artefact digest is **unaffected** (a name is not bytes).
**NO BINARY MOVES, NO BEHAVIOUR MOVES, AND THE STORE IS UNTOUCHED.**
## §13. THE ARCHITECT'S BOOTSTRAP RULING OF 2026-10-11 — `A87`: THE LOCAL ROUTE

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Local bootstrap

**`A87` ADOPTS `release.md §5.1`'s ROUTE (a) — and the constraint it answers is his own finding, not the supervisor's: *"The package needs to exist on npm in order to be configured for trusted publishing."*** **WHAT IT PINS:**
1. **THE SIX FIRST PUBLISHES ARE PERFORMED LOCALLY, BY THE ARCHITECT, WITH A TOKEN-AUTHENTICATED PUBLISH — NOT BY THE WORKFLOW.** Trusted publishing is configured **per package and requires the package to exist**, while the workflow's two publish sites authenticate **by OIDC alone**; so the workflow **cannot** perform a first publish, and it is **not edited to do so**.
2. **THE STAGING IS REPRODUCED BY HAND, and it is the step that matters:** the built target's `.node` **and** the licence copy into each of the five platform directories, and the licence copy at the packaging root for the main package, **with the staged bytes removed afterwards** — because a hand publish that skips the staging ships **a `1,178`-byte tarball of `package.json` and `README.md` alone**, which is the dry run's own measurement.
3. **THE ORDER IS UNCHANGED AND LOAD-BEARING: the five platform artefacts first, the main package LAST** (its `optionalDependencies` pin the five at exactly `0.1.0`), with **the partial-publish arm** as the recovery clause.
4. **`0.1.0`'s SIX ARTEFACTS ARE `DECLARED-NOT-ATTESTED`** (`release.md §5.3`): `--provenance` is an OIDC capability, the bootstrap is token-authenticated outside the workflow, and **no attesting route exists within the declared design** — so the acceptance layer runs over those bytes and **no figure from it may imply an attestation for them**.
5. **AND `0.1.0` IS IMMUTABLE: THE BOOTSTRAP IS THE RELEASE, NOT A REHEARSAL.** The dry run and the two-stage assembly are therefore **preconditions**; and **`v0.1.1` is the first tag the workflow itself publishes** — from there the steady state is exactly as written (tag-triggered, OIDC, provenance, no secret).
**REVERSAL: a fresh ruling plus a bounded amendment of `docs/specs/storeroom-publish/`, TAKEN BEFORE THE FIRST NAME IS CLAIMED — after it, there is no reversal, only a rename and a fresh version.** **AND `release.md §5.2`'s route (b) — a temporary token path in the workflow — is thereby DECLINED, and stands priced in the record.**
## §14. THE ARCHITECT'S PROJECT-TOKEN RULING OF 2026-10-11 — `A88`: the org is multi-project, so every platform name must name its project

**<⟶ APPENDED, DATED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM.**

> Change the platform package names to specify the project they are for, this organization will be used for multiple

**THE RULING, TRANSCRIBED AS `A88` — it SUPERSEDES `A86`(a)'s scope-only reading and ADOPTS `A86`(b)'s identity-preserving form, with a REASON the earlier pricing did not have: `@auspicion` is a MULTI-PROJECT org, so a platform name that carries only a language marker is ambiguous inside it.** **`A86`'s own priced alternative was `@auspicion/storeroom-js-<label>`; this ruling's requirement is stronger and simpler — the name must NAME THE PROJECT.**

| # | What it answers | The ruling (verbatim) | What it settles |
| --- | --- | --- | --- |
| **`A88`** | **`A86`(b) — the identity-preserving reading, which `A86`(a)'s operative default displaced** | ***"Change the platform package names to specify the project they are for, this organization will be used for multiple"*** | **THE FIVE NAMES GAIN THE PROJECT TOKEN. The scope stays `@auspicion`; what changes is that the name after it identifies the PROJECT and not merely the carrier's language — so six artefacts of several projects can live in one org without collision.** |

**ITS DERIVATION — TWO READINGS, BOTH STATED, ONE OPERATIVE, AND THE MOMENT OF NO RETURN NAMED.** **The names today are `@auspicion/js-<label>`; the requirement is that they specify the project. Two readings follow:**
- **`A88`(a) — THE ADDITIVE READING (the operative default, because it is the least destructive edit that satisfies the requirement and loses no existing token): the project token is INSERTED before the language marker, so the five become `@auspicion/provident-storeroom-js-linux-x64-gnu` · `…-js-linux-arm64-gnu` · `…-js-darwin-x64` · `…-js-darwin-arm64` · `…-js-win32-x64-msvc`.** **Every token that was there is still there; the project is named; the language marker survives for a reader who meets the name without the main package beside it.**
- **`A88`(b) — THE SHORTER READING (priced as the alternative): the project token REPLACES the language marker, so the five become `@auspicion/provident-storeroom-linux-x64-gnu` and its four siblings — the `js` being redundant once the project is named, because this project's only published carrier IS its JS binding.** **Its reversal is the same one-line re-spelling, and it must be taken BEFORE THE FIRST PLATFORM PUBLISH: after it, a scoped name is spent and the alternative becomes a deprecate-and-re-publish.**
**THE MAIN PACKAGE'S IDENTITY DOES NOT MOVE: `A82`'s unscoped `provident-storeroom` stands** — this ruling orders a change to the PLATFORM names, and the main package's own name already specifies the project.

**ITS BLAST RADIUS — the same class the project has now walked THREE times, so the count is knowable and the list is finite:**
1. **`bindings/js/platforms/<label>/package.json` × 5** — each `name`.
2. **`bindings/js/index.mjs`** — `PLATFORM_NAMES`' five literals.
3. **`bindings/js/package.json`** — the five `optionalDependencies` KEYS (values stay the exact pin `0.1.0`).
4. **The unit's contract** — `distribution.md §3.1`/`§3.2`, `resolution.md §3.1`/`§4.1`, `contract.md §1.3` and `§5.6`'s `S-SCOPE` failure list, **`PUB-DD-6`/`PUB-DD-15`**, `parameter-semantics.md §2.1`/`§3.1` (`PAR-PUB-1`/`PAR-PUB-17`).
5. **The JS unit's contract** — `package.md §3.1`/`§3.2` **and** `contract.md`'s `DD-25`/`DD-26` (**both homes, AMENDED and never superseded**).
6. **The BLIND set** — `JSG-12.12` (the five names, character-for-character). **`JSG-12.10` (the main package's identity) does NOT move.**
7. **The RED set** — `S-SCOPE`'s cells, `FIVE_NAMES`, `FORBIDDEN_NAME_SHAPES`, the scratch tree's package names, `NG-PUB-B`'s concatenation fixture, `NG-PUB-H`'s manifests.
8. **The LIVE battery** — `LIVE-8.7`'s rung-one declaration.
9. **The workflow** — the five `matrix.include[].name` fields and the comment naming the scope.
10. **Six READMEs** — the main package's rung-one table and the five platform READMEs' titles.
11. **The records** — every gate record that prints the five. **The artefact digest is UNAFFECTED: a name is not bytes.**
**NO BINARY MOVES, NO BEHAVIOUR MOVES, AND THE STORE IS UNTOUCHED.**
**END OF THE PROPOSAL. §1 is the ruling. §2 states the form and what it buys. §3 enumerates the deliverable. §4 corrects the four refuted cells. §5 adopts the findings by reference. §6 bounds the filing. §7 is the provenance.**
