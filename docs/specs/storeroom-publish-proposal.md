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
**END OF THE PROPOSAL. §1 is the ruling. §2 states the form and what it buys. §3 enumerates the deliverable. §4 corrects the four refuted cells. §5 adopts the findings by reference. §6 bounds the filing. §7 is the provenance.**
