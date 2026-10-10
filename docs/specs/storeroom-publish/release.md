# `release` — the CI inputs, the tag/version rule and the five artefacts' coupling, the partial-publish arm, and the release acts

**KIND: `carrier`.** **This part holds the `release` concern — the clauses `docs/specs/storeroom-publish/contract.md §3` (`§3.1`–`§3.4`) declares — as the unit's own authored text, carried here WHOLE and clause for clause**: **each clause keeps its `§`-number, its rule text, its tables and its authority tag unchanged.** **A citation to a clause of this part names THIS part's path plus the `§`-number**, because *a bare `§n` across two documents is not an edge* (`[A1 — the kind rule is stated here as this document's own declaration; read with `[A3 docs/specs/storeroom-js/package.md — the sibling directory's `carrier` header, cited as the form's precedent | requirement]`]`).

**AND THIS PART HAS NO RELOCATED SPAN:** **it was authored in the SAME pass as the contract document, so there is no pre-existing span to move; what it carries is the SAME CLAUSES at their second home.** **A clause of this part that the contract document's `§3` does not carry is a FINDING**, and this part's one admissible addition is the TABLES' OWN ROWS.

**AND ONE STATEMENT THIS PART'S OWN AUTHOR IS BOUND BY, PRINTED FIRST BECAUSE THE WHOLE PART IS ABOUT AN ACT NO PASS MAY TAKE: THIS PART DECLARES WHAT THE RELEASE MUST SATISFY; IT PERFORMS NOTHING.** **No pass of this unit publishes, packs, tags, installs or attests, and this part writes no workflow file, creates no manifest and holds no token.** `[A1 docs/specs/storeroom-publish-proposal.md §6 item 4 — *"THE RELEASE ITSELF REMAINS THE ARCHITECT'S ACT"* | prohibition]`

---

## §1. The CI inputs — the workflow's path, its host, the five runners, the actor, the subject and the six steps

### §1.1 The workflow's path, its host, and what is absent today

1. **THE WORKFLOW FILE IS `/.github/workflows/publish.yml`.** **`[M]` NO SUCH FILE EXISTS IN THE TREE TODAY and no `.github/` directory exists; what is absent is the FILE — the matrix, the tag form and the CI's duty are landed text** (`[A3 docs/specs/storeroom-js/package.md §3.3 — the CI's three-fold duty and the trigger, landed | cross-reference]`).
2. **ITS HOST IS GITHUB ACTIONS, WITH OIDC PROVENANCE, AS THE DECLARED DEFAULT.**
3. **AND THE `alt`, PRICED: ANOTHER CI HOST, WITH PROVENANCE DECLARED RATHER THAN ATTESTED** — priced: the attestation's consumer-side verification is lost and the record must say so, while the declared default's provenance integrates natively only with the default host; **and NO CI AT ALL** — priced: the five artefacts are built by hand, the reproducibility claim *"per target"* is declared but UNWITNESSED, and the release act loses its own evidence; **all available with a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment.** `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-7` | declared parameter semantics]`

### §1.2 The five per-target runners — one runner per target, and no runner serving two

| # | The target | Its runner | What it builds |
| --- | --- | --- | --- |
| 1 | `linux-x64` | `ubuntu-24.04` | the sibling crate for the target, and the artefact |
| 2 | `linux-arm64` | `ubuntu-24.04-arm` | the sibling crate for the target, and the artefact |
| 3 | `darwin-x64` | `macos-13` | the sibling crate for the target, and the artefact |
| 4 | `darwin-arm64` | `macos-14` | the sibling crate for the target, and the artefact |
| 5 | `win32-x64` | `windows-2022` | the sibling crate for the target, and the artefact |

**AND ONE RULE GOVERNS THE RUNNER SET: EACH RUNNER BUILDS ITS OWN TARGET AND NO OTHER**, **because a cross-compiled artefact would make *"a consumer on a covered target needs NO Rust toolchain"* a claim about a build this matrix did not perform.** **AND THE RUNNER NAMES ARE A DECLARED DEFAULT: a runner renamed or retired by its host is a one-line change to this table and to the workflow file, and the change is a bounded amendment rather than a finding.** `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-7` | declared parameter semantics]`

### §1.3 The tag's actor and the provenance subject

1. **THE TAG'S ACTOR IS THE ARCHITECT.** **The release acts are his, and NO PASS TAGS A COMMIT** (`§4.1`).
2. **THE PROVENANCE SUBJECT IS THE TAGGED COMMIT OF THIS REPOSITORY**, recorded as the attestation's subject, **and its reach is DECLARED RATHER THAN ASSUMED: where the source repository is not publicly reachable, the attestation is DECLARED-NOT-ATTESTED in the record.**
3. **AND ONE CONSEQUENCE, STATED SO THE DEFAULT IS NOT READ AS A SILENT CLAIM: an attestation whose source a consumer cannot reach is NOT verifiable by that consumer, so the record must say which of the two it is rather than let a reader assume the stronger.** `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(6) | requirement]`

### §1.4 The six publish steps, in order

| # | The step | Its subject | Its precondition |
| --- | --- | --- | --- |
| **1** | **BUILD** | the sibling crate, per target, on that target's own runner — **and the sibling crate's own `cargo test` on AT LEAST the host target** | the tagged commit checked out |
| **2** | **ASSEMBLE** | each platform artefact's published content: its manifest, its `.node` and the licence copy | step 1's artefact for the target |
| **3** | **BUILD THE MAIN PACKAGE'S CONTENT** | the entry, the shipped `README.md` and the authored `.d.ts` — **and NO binary** (`docs/specs/storeroom-publish/distribution.md §2.1`) | the tagged commit |
| **4** | **PUBLISH THE FIVE PLATFORM ARTEFACTS** | the five declared names, at the tag's own version | **the scope `@provident-storeroom` is owned**, and the five names are claimable |
| **5** | **PUBLISH THE MAIN PACKAGE — LAST, ALWAYS** | `provident-storeroom`, at the tag's own version, with its five exact pins already resolved in the registry | **all five platform artefacts are published**; **a publish with `k` of five landed is refused by the order's own rule** |
| **6** | **ATTEST** | the provenance attestation for the tagged commit's bytes | the host's OIDC federation, at the declared level of reach (`§1.3` item 2) |

**ARITHMETIC, PRINTED WITH ITS TERMS: `6` steps = `3` build/assemble steps + `2` publish steps + `1` attestation — `3 + 2 + 1 = 6` ✓ — and the ONE ordering property that is load-bearing is step 5's LAST place, which the partial-publish arm exists to make safe** (`§3`). `[A1 docs/specs/storeroom-publish/contract.md §3.1; read with `[A3 docs/specs/storeroom-js/package.md §3.3 item 2 — the CI's three-fold duty, cited | cross-reference]` | numeric or census claim]`

**AND ONE PROHIBITION ON THE STEPS, STATED SO NO PASS READS THEM AS ITS OWN:** **no tracked byte of this unit carries a registry token, an OIDC subject claim, a secret or a credential, and no pass runs any step of this table** (`§4.1`). `[A1 | prohibition]`

---

## §2. The tag/version rule, the coupling rule, and the semver policy

### §2.1 Version equals tag

1. **THE TAG'S FORM IS `v<major>.<minor>.<patch>`.**
2. **THE MAIN PACKAGE'S `version` IS THAT TAG'S VERSION.**
3. **NO PUBLICATION HAPPENS FROM AN UNTAGGED COMMIT** (`[A3 docs/specs/storeroom-js/contract.md §0.2 · `DD-42` — the publish step's trigger and versioning policy | requirement]`).
4. **AND THE `alt`, PRICED: PUBLISHING FROM THE BRANCH HEAD ON EVERY MERGE** — priced: an artefact with no identity to name and no reproducible tag to rebuild from, while reproducibility per target is the build's own declared property; **available with a fresh ruling, followed by a bounded amendment.** `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-9` | declared parameter semantics]`

### §2.2 The five artefacts' coupling rule — one rule, and the version equality it makes a requirement

1. **THE FIVE PLATFORM ARTEFACTS' `version` EQUALS THE MAIN PACKAGE'S `version`, CHARACTER FOR CHARACTER.**
2. **THE MAIN PACKAGE'S `optionalDependencies` PINS THE FIVE AT EXACTLY THAT VERSION** — **five exact pins, no range, no caret, no tilde and no wildcard** — **so a substituted or differently-versioned copy cannot be resolved by name** (`docs/specs/storeroom-publish/resolution.md §3.2` item 4; `PUB-DD-10`).
3. **AND THE ORDER COMPLETES THE RULE: the five are published BEFORE the main package**, so the main package's pins resolve at install time (`§1.4` step 5).
4. **A PLATFORM ARTEFACT AT ANOTHER VERSION, A RANGE IN ANY OF THE FIVE PINS, AND A PLATFORM ARTEFACT PUBLISHED AFTER THE MAIN PACKAGE ARE EACH A FINDING.** `[A1 docs/specs/storeroom-publish-proposal-review.md §3.2 · union rows `26` and `28` — the semver policy and the coupling rule | requirement]`

### §2.3 The semver policy, as a `DD`-shaped row

| The class of change | What it is | What it requires | Who admits it |
| --- | --- | --- | --- |
| **PATCH** | **a fix inside the declared surface** | **re-cut the tag and re-publish the SIX artefacts; the previous version is deprecated if it was half-published** | the architect's release act |
| **MINOR** | **a member ADDED to the declared surface, or a target ADDED to the matrix** | **a BOUNDED AMENDMENT of `docs/specs/storeroom-publish/` FIRST — because a sixth name is a bounded amendment and not a build flag — and the amendment's own six-artefact order carries the new target** | the architect's ruling, then his release act |
| **MAJOR** | **a change to the resolution rule's ORDER, or a change to the carriage of the store's closed set in the types** | **a bounded amendment of this directory, and where the change reaches the sibling directory, the bounded amendment of BOTH homes** | the architect's ruling, then his release act |
| **NOT A PACKAGE BUMP BY ITSELF** | **a change to the STORE'S OWN closed set's membership** | **nothing at this unit, while the types carry a union over a declared-but-open set** — **the set's membership is the store's, and a sixteenth member is typable without a package change** | the store's own contract |

**AND THE ONE CLAUSE THAT MAKES THE TABLE OPERATIVE: THE SEMVER POLICY IS DECLARED THIS UNIT'S OWN AND `DD`-SHAPED, SO IT IS A REVERSIBLE DEFAULT AND NOT AN INHERITED RULE** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-9`). **AND ITS `alt`, PRICED: A PER-ARTEFACT VERSION, each tracking its own history** — priced: five versions must then be coupled by a rule naming which COMBINATIONS are lawful, and the loader's exact pins would have to resolve a compatibility MATRIX rather than a version; **available with a fresh ruling, followed by a bounded amendment.** `[A1 docs/specs/storeroom-publish-proposal-review.md §3.2 · union row `26` — the semver policy as a `DD`-shaped row, this unit's carriage | declared parameter semantics]`

---

## §3. The partial-publish arm — one clause, both windows

### §3.1 The window, stated as the arithmetic it is

**NPM VERSIONS ARE IMMUTABLE, AND THE RELEASE PUBLISHES SIX ARTEFACTS IN A MANDATED ORDER.** **So if `k` of six lands — a name refused, a token expiry, a CI outage, a registry fault — the version is HALF-SPENT, and the arm below is what makes the state lawful rather than unplanned.**

| The window | What happened | The arm | Why it works |
| --- | --- | --- | --- |
| **BEFORE the main package** — `k` ≤ `5` of the six | **some platform artefacts landed and the main package did not** | **RECOVER IN PLACE ON THE SAME VERSION: publish the missing `6 − k` late, against the SAME tag and the SAME version** | **NOTHING A CONSUMER CAN INSTALL IS INCOMPLETE, because no main package exists to install — a consumer cannot reach the five platform artefacts through this package's own pins, and an install of one of them alone is the consumer's own act** |
| **AFTER the main package** — all six landed and something later failed | **the main package is published and the release as a whole is impaired** | **DEPRECATE-AND-RE-PUBLISH AT THE NEXT PATCH: re-cut the tag as `v0.1.1`, publish the six anew, and DEPRECATE the half-published version with a message naming its replacement** | **npm's immutability means the main package can never be re-published to unify a consumer set installed at `t1` with one installed at `t2`, so the ONLY arm that leaves a consumer able to install a COMPLETE release is a fresh version** |

**AND THE ORDER IS THE ARM'S PRECONDITION: the main package's LAST place is what makes the first window the normal case rather than a hope.** `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(4) | state or fail-state declaration]`

### §3.2 What this clause REFUSES

1. **AN UNPUBLISH OF A PUBLISHED VERSION AS THE PRIMARY ARM** — **npm versions are immutable, so it is not available**, and a re-publish of a version the registry holds is refused by the registry itself.
2. **AN IN-PLACE RECOVERY OF THE MAIN PACKAGE** — **the same immutability, and the reason the arm spends a version when nothing else can work.**
3. **A RELEASE ATTEMPTED WITH NO DECLARED ARM** — **this is a STOP CONDITION of the release act and not a risk** (`docs/specs/storeroom-publish/implementation-plan.md §5` · stop condition `J`).
4. **AND THE ONE DISCLOSURE THE FIRST WINDOW OWES, STATED SO IT IS NOT HIDDEN: an in-place recovery makes a version's BYTES TIME-DEPENDENT — a consumer who installed at `t1` has a different SET of artefacts from one at `t2` — and the clause accepts that cost ONLY in a window where no consumer can have installed a complete release.** `[A1 docs/specs/storeroom-publish-proposal.md §10.1 · `Q-4`(a) with (b) as its precondition | requirement]`

### §3.3 The `alt`, priced, per window

| The window | Its `alt` | Its price |
| --- | --- | --- |
| before the main package | **deprecate and re-publish at the next patch** | **it spends a version on a failure that left nothing a consumer could install incompletely**, and it makes the six-artefact order's own protection worthless |
| after the main package | **recover in place on the same version** | **the version's bytes become time-dependent AND the main package can never be re-published to unify the two consumer sets**, so the arm would leave two populations the same version number cannot distinguish |
| either | **no declared arm** | **the honest cost: the state is unplanned, and the next failure has no lawful route at all** |
| either | **an unpublish of the published version** | **not available: npm versions are immutable** |

**ALL THREE AVAILABLE ARMS' REVERSAL INSTRUMENT IS THE SAME: a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment — and the clause NAMES BOTH WINDOWS so either may be re-decided ALONE** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-5`). `[A1 | declared parameter semantics]`

---

## §4. The release acts and their actor

### §4.1 No pass publishes, and what a pass's ceiling is

1. **NO PASS PUBLISHES, PACKS, TAGS, INSTALLS OR ATTESTS.**
2. **A PASS'S CEILING IS THE CONTRACT, THE RED SET, THE GREEN, THE ADVERSARIAL PASS, THE BLIND GREENS, THE DOC GATES, THE TRIO, AND THE RECORD THAT ASKS FOR HIS ACT — AND THE RELEASE ACT ITSELF IS NOT IN THAT LIST.**
3. **AND THE ONE THING THIS PART DOES NOT DO: it does not name a secret, a token, a credential or an OIDC claim as a value — the workflow file's own content is `Q3`'s and is authored outside this directory.** `[A1 docs/specs/storeroom-publish-proposal.md §6 item 4; `docs/specs/storeroom-publish/implementation-plan.md §2` · `Q9` | prohibition]`

### §4.2 The acts, enumerated so the record that asks for them is checkable

| # | The act | Its actor | Its instrument |
| --- | --- | --- | --- |
| **1** | **claiming the six names** — five scoped, one unscoped | **the architect** | his registry account, and the scope's ownership `PUB-DD-6`'s precondition names |
| **2** | **creating the tag** | **the architect** | the tag's form (`§2.1` item 1) |
| **3** | **publishing the five platform artefacts, then the main package, IN THAT ORDER** | **the architect** | `§1.4`'s six steps |
| **4** | **the provenance attestation** | **the architect** | the host's OIDC federation, at the declared level of reach (`§1.3` item 2) |
| **5** | **running the `LIVE/INSTALL` battery against the RELEASED bytes** | **the live-scenario role, ON HIS RELEASE ACT** | `docs/specs/storeroom-publish/acceptance.md §2` |
| **6** | **deciding the partial-publish arm if `k` of six lands** | **the architect** | `§3.1` |
| **7** | **the licence line's final reading** | **the architect** | `docs/specs/storeroom-publish/distribution.md §4.1` |
| **8** | **admitting the unit's `DONE` row and moving the ledger** | **the architect** | the tracker's `## OPEN` closing arithmetic |

**ARITHMETIC, PRINTED WITH ITS TERMS: `8` acts = `7` release acts (`1`–`7`) + `1` admission (`8`) — `7 + 1 = 8` ✓ — and ONE of the eight (`5`) is performed by a role RATHER THAN by him, ON his act's own occurrence.** `[A1 docs/specs/storeroom-publish/contract.md §3.4 and `§0.3` · `PUB-DD-4` | numeric or census claim]`

### §4.3 The ledger and the plan's blocked cells

1. **THE LEDGER MOVES `2 DONE / 0 open` UNITS = `2` → `3 DONE / 0 open` UNITS = `3`, ON THE ARCHITECT'S ADMISSION AT THE CLOSE-OUT, AND NO PASS TAKES THE MOVE** (`PUB-DD-4`).
2. **`Q9` IS BLOCKED BY THE ARCHITECT'S OWN ACT AND BY THE PARTIAL-PUBLISH ARM'S DECLARATION; `Q10` IS BLOCKED BY `Q9`; `Q11` IS BLOCKED BY THE ADMISSION** (`docs/specs/storeroom-publish/implementation-plan.md §3`).
3. **AND ONE FIGURE THIS UNIT DOES NOT REPORT AT ANY OF ITS OWN GATES: the released bytes' digest, which is the registry's own post-release integrity field** (`docs/specs/storeroom-publish/contract.md §6` · figure `13` and the `RECORDED-GAP` clause). `[A1 | ordering claim]`

---

**END OF THIS PART.** **It carries the contract document's `§3` clauses whole and DECLARES NOTHING the contract does not already carry: the `§`-numbers, the rules, the tables and every authority tag are the contract document's own.**
