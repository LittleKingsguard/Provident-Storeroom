# `resolution` — the three rungs and their order, the five scoped names and the closed key set, the total platform table, the version read and its subject-narrowing, the state taxonomy and the ONE failure arm

**KIND: `carrier`.** **This part holds the `resolution` concern — the clauses `docs/specs/storeroom-publish/contract.md §1` (`§1.1`–`§1.5`) declares — as the unit's own authored text, carried here WHOLE and clause for clause**: **each clause keeps its `§`-number, its rule text, its tables and its authority tag unchanged**, and *no claim gains or loses an authority by standing in this part beside the contract document* (`[A1 — the kind rule is stated here as this document's own declaration; read with `[A3 docs/specs/storeroom-js/package.md — the sibling directory's `carrier` header, cited as the form's precedent | requirement]`]`). **A citation to a clause of this part names THIS part's path plus the `§`-number, and a citation to the contract document's own home names that path plus the `§`-number**, because *a bare `§n` across two documents is not an edge*.

**AND THIS PART HAS NO RELOCATED SPAN, STATED SO ITS `carrier` KIND IS NOT MISREAD:** **this unit's contract document was authored in the SAME pass as this part, so there is no pre-existing span to move; what this part carries is the SAME CLAUSES at their second home, with their authority tags re-emitted VERBATIM beside each clause.** **A clause of this part that the contract document's `§1` does not carry is a FINDING:** **this part DECLARES NOTHING the contract does not already carry**, and its one admissible addition is the TABLES' OWN ROWS where a table is too wide for the document's own statement of it.

---

## §1. The resolution's own scope, stated once

**THIS PART BINDS EXACTLY FIVE THINGS, AND NOTHING ELSE:** **(i)** the load path's three rungs and their order (`§2`); **(ii)** the five declared platform names and the closed key set the code obeys (`§3`); **(iii)** the total platform table, the musl state and every uncovered pair's declared answer (`§4`); **(iv)** the version read, its subject-narrowing and the arm it answers to (`§5`); and **(v)** the `4 × 3` state taxonomy with the unit's single declared failure arm and its subject (`§5`). `[A1 docs/specs/storeroom-publish/contract.md §1 — this part's subject, at the contract document's own home | requirement]`

**AND ONE NEGATIVE SCOPE, STATED SO THIS PART IS NOT READ AS WIDER THAN IT IS:** **this part declares NO store-side clause, NO `StoreValue` or argument carrier, NO verb of the JS surface, and NO manifest field** — the JS unit's contract owns the crossing and the surface, and the `distribution` part owns the manifests. **A load-path need that appeared to require `bindings/js/src/**` would be a CONTRACT FINDING and not a clause here** (`[A1 docs/specs/storeroom-publish/implementation-plan.md §5 — stop condition `D`, *"`bindings/js/src/**` is reached"* | prohibition]`).

---

## §2. The rungs, in order — `A83`'s order with `A84`'s names

### §2.1 The order, three rungs, and nothing else

1. **RUNG ONE — THE SCOPED PLATFORM PACKAGE FOR THIS RUNTIME'S KEY.** **The entry `require`s THE ONE NAME THE CLOSED KEY SET DECLARES FOR THE RUNTIME'S `process.platform` × `process.arch` PAIR, and NO OTHER NAME.** **EVERY THROW of that `require` is TREATED AS A MISS** (a `MODULE_NOT_FOUND` for an absent package, an `ERR_DLOPEN_FAILED` for a present-but-unloadable artefact, and any other throw alike), **so the loader moves to rung two — never a thrown package failure, and never an absorbed state.**
2. **RUNG TWO — THE MODULE-RELATIVE ADDON.** **Failing rung one, the entry `require`s the module-relative path `build/Release/storeroom_js_binding.node` BESIDE THE ENTRY MODULE, constructed from `import.meta.url`'s own directory and joined with `build`, `Release` and the crate's declared target name `storeroom_js_binding` with the `.node` extension — and from NO other source: no environment variable, no configuration key, no path relative to the process's working directory, and no search of a parent directory.**
3. **RUNG THREE — THE DECLARED ABSENT-ADDON FORM.** **Failing rung two, the entry answers the DECLARED ABSENT-ADDON FORM — the store's own `FilePathUnreachable` member carried VERBATIM with the store's own generated string at the SUBJECT OF THE PATHS THAT WERE TRIED — and NO instance is returned.**

**AND THE ORDER IS THE LAW:** **no rung is skipped, reordered or short-circuited; a rung-two success is NEVER reported as rung one; and rung three is REACHED ONLY WHEN BOTH rung one and rung two have been tried and neither yielded a loadable artefact.** **THE ONE DECLARED SKIP IS NOT A SHORT-CIRCUIT: AT AN UNCOVERED KEY NO NAME EXISTS BY `C-1`'s CLOSEDNESS, SO RUNG ONE IS NOT ATTEMPTED AT ALL (`§4`), and that is the closed key set's own property rather than a rung being passed over.** `[A1 docs/specs/storeroom-publish/contract.md §1.1 | ordering claim]`

### §2.2 The rung-by-pair table — which rungs are attempted for each class of key

| The key class | Rung one attempted? | Rung two attempted? | Rung three's subject when reached | The version read applies? |
| --- | --- | --- | --- | --- |
| **a covered key (`§3`'s five)** | **YES** — the one declared name | **yes, when rung one missed** | **both paths** (rung one's resolved name and rung two's module-relative path) | **YES, at rung one's load** |
| **an uncovered key (`§4`'s declared pairs)** | **NO** — no name exists for it under `C-1` | **yes** | **rung two's module-relative path alone**, because rung one was never attempted and has no path to report | **NO** — no rung-one load occurs |
| **the musl state (a state, never a key)** | **YES** — the `-gnu` name, because `libc` is not readable from the pair | **yes, when rung one missed** | **both paths** | **YES, whenever rung one loads** |

**ARITHMETIC, PRINTED WITH ITS TERMS: `3` key classes × `2` rungs = `6` cells, of which `5` carry an attempted rung and `1` (the uncovered class's rung one) is DECLARED NOT ATTEMPTED with its reason — `5 + 1 = 6` ✓, and NO cell is unstated.** `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-8` | numeric or census claim]`

### §2.3 The rung-one catch's declared width, with its `alt` priced

**THE CATCH TREATS EVERY THROW AS A MISS, AND THE ALTERNATIVE IS PRICED BECAUSE A PINNED SEMANTIC OWES ONE.** **THE ALTERNATIVE — CLASSIFYING THE THROW, and moving on only for `MODULE_NOT_FOUND`** — **is priced: it would make a PRESENT-BUT-BROKEN platform artefact answer a SECOND failure shape the single arm does not admit, and it would give the taxonomy's `present-unloadable` state no declared answer at a covered key where rung two is available.** **Available with a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment of `docs/specs/storeroom-publish/`.** `[A1 docs/specs/storeroom-publish/contract.md §1.1 | declared parameter semantics]`

---

## §3. The five declared names, and the closed key set the code obeys — `A84`'s `A-1` and `C-1`

### §3.1 The five names, decided once

**THE FIVE PLATFORM NAMES, EACH BEING THE SCOPE `@provident-storeroom`, A SEPARATOR `/`, AND THE LABEL `js-<target>-<arch>[-<toolchain>]`:**

| # | The label | The declared name | The scope | The second segment |
| --- | --- | --- | --- | --- |
| 1 | `linux-x64` | `@provident-storeroom/js-linux-x64-gnu` | `@provident-storeroom` | `js-linux-x64-gnu` |
| 2 | `linux-arm64` | `@provident-storeroom/js-linux-arm64-gnu` | `@provident-storeroom` | `js-linux-arm64-gnu` |
| 3 | `darwin-x64` | `@provident-storeroom/js-darwin-x64` | `@provident-storeroom` | `js-darwin-x64` |
| 4 | `darwin-arm64` | `@provident-storeroom/js-darwin-arm64` | `@provident-storeroom` | `js-darwin-arm64` |
| 5 | `win32-x64` | `@provident-storeroom/js-win32-x64-msvc` | `@provident-storeroom` | `js-win32-x64-msvc` |

**AND THE DECISION THAT MAKES THE TABLE READABLE ONCE: THE FIVE SPELLINGS READ IDENTICALLY IN ALL FIVE HOMES** — this contract and this part, the entry's own construction, `bindings/js/package.json`'s five keys, `docs/specs/storeroom-js/package.md §3.2`'s table, and that unit's `contract.md` `DD-25`/`DD-26` — **and the two homes of the sibling directory are amended at `Q3` inside the `A82`+`A84` two-home amendment** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-15`; `[A1 docs/specs/storeroom-publish-proposal-review.md §1.1 · `AV-F2` and `§5.2` · `AV-2` — the undecidable spelling and its condition | requirement]`). `[A1 docs/specs/storeroom-publish-proposal.md §9 · `A84`(a) — the five scoped names | declared parameter semantics]`

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): THE TABLE ABOVE IS RE-EMITTED ROW BY ROW WITH ITS AS-FILED SPELLING, BESIDE THE OPERATIVE FIVE NAMES.** `RCA-8(d)` ANNOTATE-BESIDE: **the five-name table and the decision clause under it stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it moves no row, adds no key and writes no byte outside this directory and the two JS-unit cells `docs/specs/storeroom-publish-proposal.md §12` names.** **THE RULING IS `A86` — *"Change org to `@auspicion`"* — and the reading applied is `A86`(a), THE SCOPE SEGMENT ALONE REPLACED.**

| # | The label | The as-filed declared name (RE-EMITTED VERBATIM) | The OPERATIVE declared name | The scope | The second segment |
| --- | --- | --- | --- | --- | --- |
| 1 | `linux-x64` | `@provident-storeroom/js-linux-x64-gnu` | **`@auspicion/js-linux-x64-gnu`** | **`@auspicion`** | `js-linux-x64-gnu` |
| 2 | `linux-arm64` | `@provident-storeroom/js-linux-arm64-gnu` | **`@auspicion/js-linux-arm64-gnu`** | **`@auspicion`** | `js-linux-arm64-gnu` |
| 3 | `darwin-x64` | `@provident-storeroom/js-darwin-x64` | **`@auspicion/js-darwin-x64`** | **`@auspicion`** | `js-darwin-x64` |
| 4 | `darwin-arm64` | `@provident-storeroom/js-darwin-arm64` | **`@auspicion/js-darwin-arm64`** | **`@auspicion`** | `js-darwin-arm64` |
| 5 | `win32-x64` | `@provident-storeroom/js-win32-x64-msvc` | **`@auspicion/js-win32-x64-msvc`** | **`@auspicion`** | `js-win32-x64-msvc` |

**AND THE ONE FIGURE THAT DOES NOT MOVE, PRINTED WITH ITS TERMS: `5` names, `3` of them carrying a toolchain suffix (`-gnu` twice, `-msvc` once) and `2` carrying none — `3 + 2 = 5` ✓ — so the REPLACED SEGMENT IS THE FIRST ONE IN EVERY ROW AND THE LABEL, THE SECOND SEGMENT AND THE SUFFIX ARE UNMOVED IN ALL FIVE** (`docs/specs/storeroom-publish/contract.md §1.2`; `docs/specs/storeroom-publish/contract.md §1.3`). **AND THE PRICED ALTERNATIVE STANDS: `A86`(b) — `@auspicion/storeroom-js-<label>` — is CARRIED AND UNAPPLIABLE-BY-THIS-CLAUSE, and its one-line reversal must be taken BEFORE the first platform publish, because after it a scoped name is spent** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-15`'s `alt` cell). **AND THE FIVE HOMES `§3.1`'s decision clause names now COMPARE AT THE NEW SCOPE: this contract and this part, the entry's construction, `bindings/js/package.json`'s five keys, `docs/specs/storeroom-js/package.md §3.2`'s table and that unit's `contract.md` `DD-25`/`DD-26` — and a sixth spelling of any of the five, OR ONE OF THE FIVE AT THE OLD SCOPE, is a FINDING** (`P-PUB-6`; `docs/specs/storeroom-publish-proposal.md §12`). `[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a) — the five names' scope segment replaced | declared parameter semantics]`

### §3.2 The closed key set — the rule the code obeys

1. **THE ENTRY NEVER COMPUTES A NAME OUTSIDE THE FIVE.** **The name is SELECTED from the closed table by the runtime's pair and NEVER BUILT by concatenating a platform token, an architecture token and a toolchain token at any depth of the entry.** **A computed name outside the five, and a computed name assembled from parts, are EACH a FINDING.** (`P-PUB-2`)
2. **`A84`'s `C-1` MAKES THE RULE THE CODE FOLLOWS**, so **`W-3` — a name outside the five, computed speculatively — CANNOT EXIST** (`docs/specs/storeroom-publish-proposal.md §9` · `A84`(c)).
3. **A SPECULATIVE FALLBACK IS REFUSED EXPLICITLY:** **a table that guesses a name when the pair is uncovered is a FINDING**, and an uncovered pair's declared answer (`§4`) never includes rung one.
4. **THE FIVE PINS ARE EXACT AND ARE LOAD-BEARING CONTRACT.** **The five `optionalDependencies` pin `0.1.0` exactly, five times; NO caret, tilde, wildcard or `>=` range is lawful**, because npm's dedupe could otherwise satisfy the loader's `require` with a DIFFERENTLY-VERSIONED copy hoisted into the consumer's tree (`docs/specs/storeroom-publish-proposal.md §8.1` · `W-2`; `docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-10`).
5. **AND THE SCOPE'S OWN EFFECT, STATED AS THE STRUCTURAL CLAIM IT IS: EACH OF THE FIVE NAMES IS CLAIMABLE ONLY BY THE SCOPE'S OWNER, SO THE NAMES CANNOT BE FILLED BY A THIRD PARTY** — **its observable is a name-for-name comparison of the five spellings across the five homes `§3.1` names.** (`P-PUB-6`; `PUB-DD-6`) `[A1 docs/specs/storeroom-publish-proposal.md §9 · `A84`(a)(c) | requirement]`

---

## §4. The total platform table — every pair answered, and the musl state named

### §4.1 The five covered keys, and the pairs the table leaves uncovered

**THE RUNTIME KEY IS THE PAIR `process.platform` × `process.arch`, AND THE SELECTION IS A TOTAL FUNCTION OF THAT PAIR: the table returns one of the five declared names or the token `NOT COVERED`, and NO other value.**

| The pair (`process.platform`, `process.arch`) | The table's value | The rung it reaches |
| --- | --- | --- |
| `linux` · `x64` | `@provident-storeroom/js-linux-x64-gnu` | rung one, then rung two |
| `linux` · `arm64` | `@provident-storeroom/js-linux-arm64-gnu` | rung one, then rung two |
| `darwin` · `x64` | `@provident-storeroom/js-darwin-x64` | rung one, then rung two |
| `darwin` · `arm64` | `@provident-storeroom/js-darwin-arm64` | rung one, then rung two |
| `win32` · `x64` | `@provident-storeroom/js-win32-x64-msvc` | rung one, then rung two |
| **EVERY OTHER PAIR** — **including each of these, named so none is left unstated: `linux` · `ia32` · `linux` · `ppc64` · `linux` · `ppc64le` · `linux` · `s390` · `linux` · `s390x` · `linux` · `arm` · `linux` · `mips` · `linux` · `mipsel` · `linux` · `mips64el` · `linux` · `riscv64` · `linux` · `loong64` · `freebsd` · ANY arch · `openbsd` · ANY arch · `sunos` · ANY arch · `aix` · ANY arch · `android` · ANY arch · `win32` · `ia32` · `win32` · `arm64` · `win32` · `arm` · `darwin` · `ia32` · `darwin` · `arm` · and any pair a future Node runtime may report that is not one of the five above** | **`NOT COVERED`** | **rung two, then the single declared absence — RUNG ONE IS NOT ATTEMPTED, and NO SIXTH NAME IS COMPUTED** |

**AND THE TABLE'S COMPLETENESS IS ITS OWN CLAIM, STATED SO IT CAN BE FALSIFIED: the domain is `process.platform`'s value set crossed with `process.arch`'s value set as the runtime DOCUMENTS them, and the table's answer is TOTAL over that domain — an unlisted pair is covered by the table's LAST row, which is the `NOT COVERED` row, so no pair reaches a speculative key.** `[A1 docs/specs/storeroom-publish/contract.md §1.2 | requirement]`

**⟶ AND ONE LINE ON WHAT THE `A86` PASS DOES TO THIS TABLE, STATED SO THE SET'S SHAPE IS NOT MISTAKEN FOR A CELL OF IT** (`RCA-8(d)` ANNOTATE-BESIDE: **the table above and the completeness claim under it stand BYTE-FOR-BYTE and are read THROUGH this line; it is a PURE INSERTION — it adds no row, drops no pair and moves no figure**): **THE FIVE ROWS' NAMES MOVE BY THEIR SCOPE SEGMENT ALONE AND BECOME `@auspicion/js-<label>`, so THIS TABLE'S ANSWER SET IS STILL `5` NAMES + THE TOKEN `NOT COVERED` AND NOTHING ELSE.** **THE CARDINALITY IS UNMOVED AT `5`, the `NOT COVERED` row's own subject and its enumerated pairs are UNMOVED, and NO SIXTH ROW IS INTRODUCED by the re-scope — a re-scope is not a widening, and the row `6` below the five is a `NOT COVERED` arm rather than a name** (`docs/specs/storeroom-publish/resolution.md §3.1`; `docs/specs/storeroom-publish/contract.md §1.2`; `docs/specs/storeroom-publish/contract.md §1.3`). `[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a) — the re-scope of the five names | numeric or census claim]`

### §4.2 The musl case — the answer is FORCED, and it is not a sixth name

**`A85`(7) RULES THE MUSL ANSWER *"NOT A DEFAULT — FORCED BY `C-1` + `K3`"*, SO ITS FOUR TERMS ARE:** **(i)** **a musl runtime CANNOT get a sixth name, because `C-1` closes the key set at the five and `K3` demands totality**; **(ii)** **its declared answer is RUNG TWO and then THE SINGLE DECLARED ABSENCE**; **(iii)** **`libc`'s absence from the `-gnu`/`-msvc` fields is a consequence of the package format's own field set, which carries `os` and `cpu` and cannot express a C library**; **and (iv)** **the `dlopen` failure the installer's `-gnu` artefact produces on a musl host is answered by the ONE declared arm.** **AND ONE WATCH ITEM IS OBEYED: NO clause of this part DEFINES `libc` or `musl` — no detection algorithm, no value set and no measured domain is declared for either, because such a definition would be a NEW IDENTIFIER ARRIVING BY AMENDMENT** (`[A4 docs/specs/storeroom-publish-adoption-dossier.md · the zero-row rationale, `§2.2` item 2 | prohibition]`). `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(7) and `§10.3` · `Q-7` | state or fail-state declaration]`

### §4.3 The `alt` this answer carries, priced

**A SIXTH NAME (`…-linux-x64-musl` AND ITS SIBLINGS)** — **priced: it is a bounded amendment of the five-name set in FOUR homes** (this contract and this part, the entry's construction, the sibling directory's `package.md §3.2` and that unit's `contract.md` `DD-25`), **it adds a sixth artefact to the release's mandated order and a sixth pin to the main package's manifest, and it re-opens the totality `K3` demands by making the key set CONDITIONAL ON A C LIBRARY the `os`/`cpu` fields cannot express, so the pair alone would no longer select a name**; **available only with a fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by that bounded amendment** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-8`). `[A1 | declared parameter semantics]`

---

## §5. The version read, the state taxonomy, and the ONE failure arm

### §5.1 The version read — `B-1`, at rung one

1. **THE ADDON'S OWN VERSION IS READ AT LOAD: THE ONE NAME OF ITS EXPORT SET THAT EXISTS FOR THIS PURPOSE IS CALLED AS A FUNCTION AND ANSWERS A `string`** (`[A3 docs/specs/storeroom-js/package.md §1.3 item 4 — the addon's export set, `version` among the five, and its declared duty *"so the artefact can be audited from itself"* | cross-reference]`). **THE PACKAGE'S OWN VERSION IS READ FROM THE PACKAGE'S OWN MANIFEST — the same artefact whose `version` the release's tag fixes — and never passed in, configured or defaulted.**
2. **THE COMPARISON IS EXACT STRING EQUALITY.** **Any other outcome is the mismatch arm: a different string, an empty string, a value that is not a string, and an addon whose `version` is not callable alike** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-19`).
3. **THE READ APPLIES AT RUNG ONE ALONE.** **A rung-two load performs NO version comparison**, because that artefact is the checkout's own, built beside the entry from the same tree the package is read from, and the in-place developer loop and every battery that exists today resolve at rung two with no published package present (`PUB-DD-18`; `S-INPLACE`).
4. **AND THE READ IS NOT AN ABI PROBE, WHICH IS THE SUBJECT-NARROWING THIS CLAUSE OWES.** **`[M]` the JS unit's contract refuses *"a runtime ABI check in the package's own load path"* BY NAME, because it *"would need a failure form the single form of `surface.md §2.5` does not admit"* (`docs/specs/storeroom-js/package.md §1.4` item 3).** **THE READING DECLARED HERE, AND THE ONE THE AMENDMENT WILL WRITE INTO THAT CELL: that refusal's SUBJECT IS A PROBE OF THE RUNTIME'S ABI — an assertion about the HOST's Node-API version — while A VERSION READ IS NOT AN ABI CHECK: it reads THIS ARTEFACT'S OWN SELF-REPORT and asserts nothing about the runtime.** **SO THE TWO ARE NOT IN CONFLICT, AND THE CELL'S SUBJECT IS NARROWED TO WHAT IT REFUSED.** **AND THE NARROWING IS A `Q3` DUTY AND NOT AN EDIT HERE** (`docs/specs/storeroom-publish/contract.md §9`; `[A1 docs/specs/storeroom-publish-proposal-review.md §5.2 · `AV-5` | requirement]`).
5. **AND THE ONE CLAIM THIS CLAUSE DOES NOT MAKE: the read is NOT a digest check, NOT a signature check and NOT a provenance check.** **`B-2` and `B-3` are PRICED AT THE FILING AND NOT ADOPTED as this unit's load-path fix** (`docs/specs/storeroom-publish-proposal.md §8.2`–`§8.3`; `[A1 docs/specs/storeroom-publish-proposal.md §8.2` and `§8.3` | prohibition]`). `[A1 docs/specs/storeroom-publish-proposal.md §9 · `A84`(b) | requirement]`

### §5.2 The four states, each with its declared answer

| The state (the resolved artefact) | What it IS | The declared answer | The arm it answers to |
| --- | --- | --- | --- |
| **`absent`** | **no artefact was found at either rung** — rung one threw and rung two threw | **THE DECLARED ABSENT FORM**, and NO instance is returned | the single declared failure arm (`§5.3`) |
| **`present-unloadable`** | **an artefact was found and its `require` threw** — an `ERR_DLOPEN_FAILED` at rung one, a broken local artefact at rung two, or any other throw | **THE DECLARED ABSENT FORM**, and NO instance is returned; **the throw of rung one is a MISS, so rung two is still attempted** | the single declared failure arm (`§5.3`) |
| **`present-wrong-version`** | **an artefact loaded AT RUNG ONE and its own `version` did not match the package's** | **THE SINGLE FAILURE ARM**, with the rung-one artefact's own path as its subject, and **NO fallback to rung two** | the single declared failure arm (`§5.3`) |
| **`present-right-version`** | **an artefact loaded and, where the read applies, its `version` matched** — rung one loaded and matched, or rung two loaded at a key where the read does not apply | **SUCCESS**, and NO rung-two attempt is made where rung one succeeded | — |

**AND THE `4 × 3` MATRIX IS THE CONTRACT DOCUMENT'S OWN TABLE, CARRIED AT ITS HOME AND NOT RE-PRINTED HERE: `docs/specs/storeroom-publish/contract.md §1.4`'s table enumerates the `4` states against the `3` key classes — covered, uncovered, musl — with `11` cells carrying a declared answer and `1` cell (the uncovered `present-wrong-version`) DECLARED UNREACHABLE, because the version read never applies where no rung-one load occurs.** `[A1 docs/specs/storeroom-publish/contract.md §1.4 | state or fail-state declaration]`

### §5.3 The single declared failure arm, its form and its subject — fixed ONCE

1. **THE FORM.** **A THROWN PLAIN OBJECT whose member set is EXACTLY `{status, message}`** — **its `status` is the store's own `FilePathUnreachable` member carried VERBATIM as a JS `string`, and its `message` is the store's own GENERATOR'S STRING for that code at the subject the next item fixes.** **NO other failure shape exists anywhere in this unit: not a returned union, not an `Error` subclass, not a `Promise` rejection, not a third member, and not a package-authored status.** (`P-PUB-4`; `P-PUB-5`)
2. **THE SUBJECT, IN ONE CLAUSE.** **The subject is the ADDON ARTEFACT'S OWN PATH — the file the load path reached — and where BOTH RUNGS WERE TRIED AND NEITHER YIELDED A LOADABLE ARTEFACT, the subject is BOTH PATHS, rung one's resolved name and rung two's module-relative path, so a consumer on an uncovered key reads exactly which two things were tried.** **`cfg.filePath` is NEVER the subject of this unit's arm**: that path is the store's own construction argument, and a `cfg.filePath` failing the store's construction-time reachability probe is a SEPARATE state the store's contract declares (`[A3 docs/specs/storeroom-native/contract.md §8.1` #13 and `§8.2`'s `FilePathUnreachable` row | state or fail-state declaration]`).
3. **NO FALLBACK EXISTS, AND THIS IS THE WHOLE OF THE CLAUSE.** **The package NEVER falls back to a JavaScript store, NEVER absorbs a state silently, NEVER degrades to a partial instance or a no-op verb, and NEVER substitutes a package-authored message, status or instance for it.** **AND THE LOAD PATH HAS EXACTLY THREE OUTCOMES — `success`, `the declared absent form`, `the single failure arm` — and NO fourth.** (`P-PUB-5`)
4. **AND THE STATE'S OWN DECLARATION AT THE SIBLING DIRECTORY IS CITED AND NOT RE-OPENED** (`[A3 docs/specs/storeroom-js/contract.md §2.5 item 5 — the absent-or-failed-addon state, its status, its message's home and the no-fallback rule | cross-reference]`); **THIS UNIT'S ADDITION IS THE VERSION READ, WHICH EXTENDS THE SAME ARM TO A STATE THAT DECLARATION DOES NOT NAME.** `[A1 docs/specs/storeroom-publish-proposal.md §9 · `A84`(b) and `§11` · `A85`(7) | state or fail-state declaration]`
5. **AND THE `alt` A PINNED ANSWER OWES, PRINTED: A SECOND ANSWER FOR THE UNCOVERED CLASS (a distinct absent form naming the uncovered key as such)** — **priced: it gives the failure channel a second producer of a status or a second shape, and it would make the uncovered consumer's observable differ from a covered consumer's when nothing about their SITUATION differs — both saw two paths tried and no loadable artefact; available with a fresh ruling** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-17`). `[A1 | declared parameter semantics]`
6. **THE AUTHORING SPLIT THAT GOVERNS WHAT THE `message` OF ITEM 1 IS WHERE THE GENERATOR IS UNREACHABLE — CARRIED HERE AS THE CONTRACT DOCUMENT'S `§1.4` item 6 CARRIES IT.** **WHERE AN ARTEFACT LOADED FAR ENOUGH TO EXPOSE `errorMessage`, THE STORE'S OWN GENERATOR AUTHORS THE STRING; WHERE NO ARTEFACT DID — the `absent` and `present-unloadable` states, because the generator is reached only through the artefact that failed — THE ENTRY REPRODUCES THE GENERATOR'S OWN CLAUSE BYTE-FOR-BYTE AT THE DECLARED SUBJECT, LAWFULLY: NO PACKAGE-MINTED STATUS, THE STRING IS THE STORE'S OWN CLAUSE AND NOT A PACKAGE-AUTHORED TEMPLATE, AND ITS AUTHOR IS NAMED AS THE ARTEFACT THAT FAILED — so ONE AUTHOR SPEAKS IN BOTH ARMS.** **AND THE RENDERING: THE BUILT ARTEFACT RENDERS THE SUBJECT QUOTED** — `'<subject>' is not reachable at construction, the path must exist or the application must be able to write it` — **so the UNQUOTED spelling item 2 uses when it NAMES the subject is read as the slot's FILLING and NEVER as the slot's rendering** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-25`). `[A1 | state or fail-state declaration]`

### §5.3a The third state the two-arm split did not cover — carried here as the contract document's `§1.4` item 7 carries it

**IT IS A SUB-CASE OF `§5.3` ITEM 6'S ARM (b) AND NOT A THIRD ARM, AND IT ARISES AT ONE STATE: AN ARTEFACT LOADED AT RUNG ONE AND ITS OWN `version` DID NOT MATCH THE PACKAGE'S, WHILE THAT SAME ARTEFACT'S `errorMessage` IS ABSENT, OR ITS OWN GENERATOR THROWS, OR IT ANSWERS A VALUE THAT IS NOT A `string`.** **THE GENERATOR IS THEREFORE UNREACHABLE THROUGH A FUNCTION even though the artefact loaded, and arm (b) answers with the generator's own clause reproduced byte-for-byte.** **AND ITS SUBJECT IS RUNG ONE'S OWN PATH ALONE — never the both-paths join of `§5.3b`: at this state only rung one was tried, because the walk returns at the arm and rung two's `require` is reached on no evaluation.** **A message that appends rung two's path here, or that names the module-relative addon path in place of the rung-one artefact's own, is a FINDING.**

**AND THE `alt` THIS SUB-CASE CARRIES, PRICED AS `§5.3` ITEM 5 PRICES ITS OWN: A SECOND FAILURE SHAPE FOR THE STATE (an `Error`, or a package-authored token)** — **priced: it gives the failure channel a second producer and a second shape, which `§5.3` item 1 and `P-PUB-5`'s failure list both forbid, and it makes a consumer whose artefact LOADED read a form a consumer whose artefact was ABSENT never meets; available with a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-25`). `[A1 | state or fail-state declaration]`

### §5.3b The both-paths subject's join — the separator, the order, and the one-slot rendering — carried here as the contract document's `§1.5` item 6 carries it

**IT APPLIES EXACTLY WHERE `§5.3` item 2 FIXES THE TWO-PATH SUBJECT: where BOTH RUNGS WERE TRIED and neither yielded a loadable artefact.** **(a) THE SEPARATOR IS `', '` — a comma and one space; (b) THE ORDER IS RUNG ONE FIRST AND RUNG TWO SECOND, the order the load path tried them; and (c) EACH PATH IS KEPT INSIDE THE GENERATOR'S OWN `'<subject>'` SLOT — the `FilePathUnreachable` arm's clause carries ONE subject slot, so TWO SUBJECTS ARE RENDERED IN THE ONE SLOT BY MAPPING THE GENERATOR'S OWN RENDERING ACROSS THE TWO PATHS AND JOINING THE RENDERINGS BY THE SEPARATOR.** **THE DECLARED RENDERING IS `''<rung one's resolved name>', '<rung two's module-relative path>'' is not reachable at construction, the path must exist or the application must be able to write it` — two quoted subjects inside the one slot, the outer apostrophes being the clause's own around the whole slot and the two inner pairs each subject's own.** **AND THE READING THAT GOVERNS: the subject names every subject THE LOAD PATH TRIED — both paths where both rungs were tried, and rung two's path alone where rung one was never attempted at all, which is `§2.2`'s uncovered cell and item 2's own term *"the paths that were TRIED"*.** **SO `§2.2`'s uncovered cell HOLDS, and the live battery's `LIVE-8.7` — a COVERED key, where rung one IS attempted — is SUPERSEDED in its one-path expectation by this reading, its owner `role_live_scenario_runner`, and NO byte of that battery is written by this pass** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-26`; `docs/specs/storeroom-publish/contract.md §1.5` item 6). `[A1 | requirement]`

### §5.4 The `alt` cells this part's pins carry, in one place

| The pin | Its `alt` | Its price | Its instrument |
| --- | --- | --- | --- |
| the mismatch's status (`FilePathUnreachable`, verbatim from the store's closed set) | a package-owned code for the state | it MINTS a code the closed set does not hold, gives the failure channel a second producer of a status, and puts a second externally-sourced vocabulary token beside the one-row dossier | a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment |
| the read's scope (rung one alone) | guard both rungs | the in-place loop's own artefact would be refused whenever the two manifests' versions differ, so the existing battery would read `BROKEN` on a version edit alone | the same instrument |
| the predicate (exact string equality) | a semver-compatible comparison, or a major-only comparison | a substitution differing only in its patch (or only below the major) would PASS the check the mitigation exists to make | the same instrument |
| the catch's width (every throw is a miss) | classify the throw and move on only for `MODULE_NOT_FOUND` | a present-but-broken platform artefact would answer a SECOND failure shape the single arm does not admit | the same instrument |
| the uncovered class's answer (the absent form, subject = rung two's path alone) | a distinct absent form naming the uncovered key | a second producer of a status, and two observables for one situation | the same instrument |
| the both-paths subject's join — the separator `', '` and the order rung one then rung two (`PUB-DD-26`) | the order reversed, or a different separator (`'; '` · `' + '` · a newline) | purely presentational, so it reverses no behaviour — but it is observable at the arm's message, so every drive that reads the two subjects in the order they were tried would have to be re-spelled with the clause | the same instrument |
| the `message`'s author where the generator is unreachable — arm (b), the generator's own clause reproduced byte-for-byte (`PUB-DD-25`) | the entry authors the string itself; or no message is produced where the generator is unreachable | the string becomes the PACKAGE'S text, so the single-author rule falls and the two arms can drift with nothing comparing them; or the absent consumer reads a form a two-member shape cannot carry | the same instrument |

`[A1 docs/specs/storeroom-publish/contract.md §0.3 — the rows these prices belong to | declared parameter semantics]`

---

**END OF THIS PART.** **It carries the contract document's `§1` clauses whole and DECLARES NOTHING the contract does not already carry: the `§`-numbers, the rules, the tables and every authority tag are the contract document's own.**
