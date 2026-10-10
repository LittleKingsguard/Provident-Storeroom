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

**END OF THE PROPOSAL. §1 is the ruling. §2 states the form and what it buys. §3 enumerates the deliverable. §4 corrects the four refuted cells. §5 adopts the findings by reference. §6 bounds the filing. §7 is the provenance.**
