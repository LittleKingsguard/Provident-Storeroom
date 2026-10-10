# `distribution` — what the main package ships, the five platform manifests field by field, the licence and its sites, the types and the closed set's carriage, and the metadata

**KIND: `carrier`.** **This part holds the `distribution` concern — the clauses `docs/specs/storeroom-publish/contract.md §2` (`§2.1`–`§2.5`) declares — as the unit's own authored text, carried here WHOLE and clause for clause**: **each clause keeps its `§`-number, its rule text, its tables and its authority tag unchanged.** **A citation to a clause of this part names THIS part's path plus the `§`-number**, because *a bare `§n` across two documents is not an edge* (`[A1 — the kind rule is stated here as this document's own declaration; read with `[A3 docs/specs/storeroom-js/package.md — the sibling directory's `carrier` header, cited as the form's precedent | requirement]`]`).

**AND THIS PART HAS NO RELOCATED SPAN:** **it was authored in the SAME pass as the contract document, so there is no pre-existing span to move; what it carries is the SAME CLAUSES at their second home.** **A clause of this part that the contract document's `§2` does not carry is a FINDING**, and this part's one admissible addition is the TABLES' OWN ROWS where a table is too wide for the document's own statement of it.

---

## §1. The distribution's own scope, stated once

**THIS PART BINDS EXACTLY FIVE THINGS, AND NOTHING ELSE:** **(i)** what the main package ships and what its allowlist refuses (`§2`); **(ii)** the five platform artefacts' manifests, field by field (`§3`); **(iii)** the licence notice, its declaration sites and its six artefacts (`§4`); **(iv)** the types and the closed set's carriage (`§5`); and **(v)** the metadata and the publish configuration (`§6`). `[A1 docs/specs/storeroom-publish/contract.md §2 | requirement]`

**AND ONE NEGATIVE SCOPE:** **this part declares NO store-side clause and NO load-path clause** — the resolution is the `resolution` part's and the store's contract is cited, never amended. **AND ONE NAMING RULE THIS PART OBEYS: THE BINDING LIBRARY IS SPELLED ONLY AS *"a Node-API binding library"* AND IS NEVER NAMED, because a named library is a SECOND externally-sourced vocabulary token that would owe a second dossier row and re-trigger STEP 0 for the delta** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-16`; `[A4 docs/specs/storeroom-js-adoption-dossier.md · Node-API / napi — the one externally-sourced token that unit's dossier carries, cited | cross-reference]`).

---

## §2. What the main package ships — `A85`(1), and the limitation it declares

### §2.1 The allowlist, and the binary that does not ship

1. **`build/Release` LEAVES `files`.** **The main package's `files` allowlist is exactly `index.mjs` · `README.md` · `index.d.ts`.**
2. **NO BINARY SHIPS, AT ANY KEY, ON ANY TARGET.** **A tarball that is byte-identical for every publisher is the property this clause protects: with the binary excluded, the released bytes do not depend on which machine published them.**
3. **RUNG TWO BECOMES A CHECKOUT-ONLY RUNG.** **In a published install, rung two's module-relative path resolves to a file the tarball does not carry; rung one therefore carries every covered consumer, and rung two carries the in-place developer loop and every battery that exists today** (`docs/specs/storeroom-publish/resolution.md §2.1`).
4. **AND THE ONE THING THIS CLAUSE DOES NOT DO, STATED SO THE ALLOWLIST IS NOT READ AS A WEAKENING: it does not remove the entry, the shipped `README.md` or the types, and it adds no `postinstall` build-on-install route.** `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(1) | requirement]`
5. **AND THE ONE READING THIS ALLOWLIST OWES ITS LICENCE SIBLING, STATED HERE SO THE TWO CELLS READ AS ONE DECLARATION: the main package's licence copy IS NOT AN ALLOWLIST ENTRY.** **The contract document's `§2.1` item 1 fixes WHAT THE MANIFEST DECLARES — the three entries above and nothing else — and `§2.3` item 2 of that document fixes WHAT THE ARTEFACT CARRIES; the copy is landed by THE RELEASE'S OWN ASSEMBLY STEP, which copies the repository's `LICENSE` byte-for-byte into each of the six artefacts' tarballs, the same step that lands the five platform artefacts' copies at this part's `§4.3` item 2.** **SO A `LICENSE` ROW ADDED TO THE MAIN PACKAGE'S `files` ARRAY IS A FINDING, and the copy's absence from that array is not a missing notice.** `[A1 docs/specs/storeroom-publish/contract.md §2.1 — the clause this item reconciles, at the contract document's own home | declared parameter semantics]`

### §2.2 The uncovered-target answer, declared as a limitation with its consequence

1. **A CONSUMER ON AN UNCOVERED KEY GETS NO BINARY, NO BUILDABLE ROUTE FROM THE TARBALL, AND NO `build.rs`, `Cargo.toml` OR `src/**`.**
2. **THEIR ONLY ROUTE IS TO BUILD THE STORE CRATE FROM ITS SOURCE THEMSELVES, AND THAT REQUIREMENT IS PRINTED IN THE SHIPPED `README.md` SECTION RATHER THAN DISCOVERED** (`docs/specs/storeroom-publish/contract.md §9` · `Q3-3`).
3. **THE DECLARATION IS A LIMITATION AND NOT A PROMISE: no clause of this part claims that an uncovered consumer's route is supported, tested or witnessed, because the crate's own build is a step outside every install this unit performs.**
4. **AND THE SOURCE ARCHIVE IS PRICED AND NOT ADOPTED: where the answer is ever wanted actionable, the store crate's source is a SEPARATE, NON-REGISTRY distribution with its own provenance subject, and NOTHING of it enters the npm tarball or the registry under any of the six names** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-2`, `PUB-DD-22`; `[A1 docs/specs/storeroom-publish-proposal.md §10.1 · `Q-1`(a) and its named mitigation | declared parameter semantics]`).
5. **AND ONE CONSEQUENCE OF THE COVERED/UNCOVERED SPLIT, STATED SO IT IS READ WITH THE MATRIX: a covered consumer needs NO Rust toolchain; an uncovered consumer needs one.** `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(1) | state or fail-state declaration]`

---

## §3. The five platform artefacts, field by field

### §3.1 The manifests' source paths, and the artefact set

| # | The artefact | Its manifest's source path | Its tracked content | Its published content |
| --- | --- | --- | --- | --- |
| 1 | `@provident-storeroom/js-linux-x64-gnu` | `bindings/js/platforms/linux-x64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |
| 2 | `@provident-storeroom/js-linux-arm64-gnu` | `bindings/js/platforms/linux-arm64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |
| 3 | `@provident-storeroom/js-darwin-x64` | `bindings/js/platforms/darwin-x64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |
| 4 | `@provident-storeroom/js-darwin-arm64` | `bindings/js/platforms/darwin-arm64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |
| 5 | `@provident-storeroom/js-win32-x64-msvc` | `bindings/js/platforms/win32-x64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |

**AND THE ONE PROHIBITION THAT GOVERNS THE WHOLE TABLE: NO BINARY IS EVER COMMITTED TO THE TRACKED TREE**, so each platform directory carries its manifest and nothing that a build produces (`[A3 docs/specs/storeroom-js/package.md §3.2 — the no-committed-binary prohibition | prohibition]`). **AND A SIXTH PLATFORM DIRECTORY, A SIXTH MANIFEST AND A SIXTH NAME ARE EACH A FINDING**, because a further target is a BOUNDED AMENDMENT and not a build flag (`[A3 docs/specs/storeroom-js/contract.md §0.2 · `DD-25` | prohibition]`). `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-23` | declared parameter semantics]`

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): THE TABLE ABOVE IS RE-EMITTED ROW BY ROW WITH ITS AS-FILED SPELLING, BESIDE THE OPERATIVE ONE.** `RCA-8(d)` ANNOTATE-BESIDE: **the artefact table above and the prohibition under it stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it moves no row, adds no directory and writes no byte outside this directory and the two JS-unit cells `docs/specs/storeroom-publish-proposal.md §12` names.** **THE RULING IS `A86` — *"Change org to `@auspicion`"* — at its operative default `A86`(a): THE SCOPE SEGMENT ALONE IS REPLACED, and the LABEL after the separator is UNMOVED.**

| # | The as-filed artefact (RE-EMITTED VERBATIM) | The OPERATIVE artefact | Its manifest's source path | Its tracked content | Its published content |
| --- | --- | --- | --- | --- | --- |
| 1 | `@provident-storeroom/js-linux-x64-gnu` | **`@auspicion/js-linux-x64-gnu`** | `bindings/js/platforms/linux-x64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |
| 2 | `@provident-storeroom/js-linux-arm64-gnu` | **`@auspicion/js-linux-arm64-gnu`** | `bindings/js/platforms/linux-arm64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |
| 3 | `@provident-storeroom/js-darwin-x64` | **`@auspicion/js-darwin-x64`** | `bindings/js/platforms/darwin-x64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |
| 4 | `@provident-storeroom/js-darwin-arm64` | **`@auspicion/js-darwin-arm64`** | `bindings/js/platforms/darwin-arm64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |
| 5 | `@provident-storeroom/js-win32-x64-msvc` | **`@auspicion/js-win32-x64-msvc`** | `bindings/js/platforms/win32-x64/package.json` | the manifest, and NO binary | the manifest, the `.node` built for the target by CI, and the licence copy |

**AND THE ARITHMETIC IS UNMOVED, PRINTED WITH ITS TERMS: `5` artefact rows = `5` source paths = `5` operative names, `3` of the `5` carrying a toolchain suffix (`-gnu` twice, `-msvc` once) and `2` carrying none — `3 + 2 = 5` ✓** — **and the SOURCE PATH, the TRACKED CONTENT and the PUBLISHED CONTENT columns are UNMOVED IN EVERY ROW.** **AND THE PRICED ALTERNATIVE `A86`(b) — `@auspicion/storeroom-js-<label>` — IS CARRIED AND UNAPPLIED: its one-line reversal must be taken BEFORE the first platform publish** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-15`'s `alt` cell; `docs/specs/storeroom-publish-proposal.md §12`). `[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a) — the five artefacts' scope segment replaced | declared parameter semantics]`

### §3.2 The fields — one row per field, one value per artefact

**EVERY FIELD BELOW IS DECLARED ONCE, AND A FIELD NOT LISTED IS NOT DECLARED BY ANY CLAUSE OF THIS UNIT.**

| # | The field | What it carries | The rule it obeys |
| --- | --- | --- | --- |
| 1 | **`name`** | the artefact's own declared name, spelled EXACTLY as `resolution.md §3.1`'s table prints it | **one of the five, and no sixth; its scope is `@provident-storeroom`** (`P-PUB-6`) |
| 2 | **`version`** | **`0.1.0` for the first release, and thereafter THE MAIN PACKAGE'S OWN `version`, character for character** | **the coupling rule: the five artefacts share ONE version with the main package, and the main package's `optionalDependencies` pins the five at EXACTLY it** (`PUB-DD-10`; `P-PUB-8`) |
| 3 | **`os`** | **the artefact's own operating system, as the field's documented token** — `linux` for rows 1–2, `darwin` for rows 3–4, `win32` for row 5 | **the field carries an OPERATING SYSTEM and CANNOT express a C LIBRARY, which is why a `-gnu` artefact is installable on a musl host and the loader's one arm answers the resulting `dlopen` failure** (`PUB-DD-8`; `resolution.md §4.2`) |
| 4 | **`cpu`** | **the artefact's own architecture, as the field's documented token** — `x64` for rows 1, 3 and 5; `arm64` for rows 2 and 4 | same rule as `os`: **the pair `os` × `cpu` is an INSTALL-SKIP filter and NOT the loader's key**, which is `process.platform` × `process.arch` (`resolution.md §4.1`) |
| 5 | **`files`** | **the artefact's own allowlist: the manifest's sibling `.node` path AND the licence copy** | **an artefact whose allowlist omits its `.node` cannot be loaded by rung one, and one whose allowlist omits the licence copy ships no notice** (`P-PUB-7`) |
| 6 | **the `.node`'s own EXPOSED PATH** | **the artefact's `.node` at its own package root, carrying the crate's declared target name `storeroom_js_binding` with the `.node` extension** | **the path is INSIDE the platform artefact and is NOT exported as a subpath of the main package**: rung one `require`s the package NAME, and the platform artefact's own `main`/`exports` resolution reaches the `.node` (`resolution.md §2.1`; `[A3 docs/specs/storeroom-js/package.md §1.3 item 1 — the one arms-bearing entry of the MAIN package, cited | cross-reference]`) |
| 7 | **`engines`** | **`{ "node": ">=18.0.0" }`, the same floor the main package declares** | **the floor is a DECLARATION and not a measurement this unit took, and NO Node-API version floor and no ABI assertion is declared by any artefact** (`[A3 docs/specs/storeroom-js/package.md §1.4 items 1–2 — the engine floor and the refused ABI floor, cited | cross-reference]`) |
| 8 | **the licence FIELD and the NOTICE** | **the manifest's own `license` field reading `AGPL-3.0`, AND the licence copy in the artefact's own `files`** | **the notice travels with each artefact, and the per-artefact copy is NOT a fifth declaration SITE** (`§4`; `PUB-DD-11`) |
| 9 | **`publishConfig`** | **`{ "access": "public" }`** | **a scoped name is private by default, so the field is what makes each artefact PUBLIC; its absence would publish five private artefacts and the main package's install would not resolve them** (`PAR-PUB-20`) |

**ARITHMETIC, PRINTED WITH ITS TERMS: `9` declared fields × `5` artefacts = `45` field cells, of which `3` fields (`os` · `cpu` · the exposed path) carry a PER-ARTEFACT value and `6` carry the SAME value across all five — `3 + 6 = 9` ✓, and no field is left undeclared.** `[A1 | numeric or census claim]`

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): FIELD `1`'s RULE CELL, RE-EMITTED WITH ITS AS-FILED SPELLING AND RE-READ AT THE NEW SCOPE.** `RCA-8(d)` ANNOTATE-BESIDE: **field `1`'s row and the `45`-cell arithmetic above stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it edits no field row, adds no field and moves no figure.** **THE AS-FILED RULE IS RE-EMITTED VERBATIM: *"one of the five, and no sixth; its scope is `@provident-storeroom`"* (`P-PUB-6`).** **THE OPERATIVE RULE IS THE SAME RULE AT THE NEW SCOPE: one of the five, and no sixth; ITS SCOPE IS `@auspicion`.** **SO FIELD `1`'s WHAT-IT-CARRIES CELL — *"the artefact's own declared name, spelled EXACTLY as `resolution.md §3.1`'s table prints it"* — IS UNMOVED AND ITS OBSERVABLE GAINS NO FIFTH READING: the table it points at now prints the five operative names, and the five homes' comparison is made at `@auspicion`** (`docs/specs/storeroom-publish/resolution.md §3.1`; `docs/specs/storeroom-publish/contract.md §1.3`; `P-PUB-6`). **AND FIELD `9`'s RULE IS UNMOVED AND RE-READ: *"a scoped name is private by default, so the field is what makes each artefact PUBLIC"* is TRUE of `@auspicion` exactly as it was of the old scope, so `publishConfig: { "access": "public" }` keeps its five artefacts' force and NO cell of field `9` moves** — **so the `45`-cell arithmetic and its `3 + 6 = 9` ✓ are BOTH UNMOVED** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-15`; `docs/specs/storeroom-publish-proposal.md §12`). `[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a) — the scope segment of the five names alone | declared parameter semantics]`

### §3.3 And the one field this part REFUSES, stated so its absence is a decision

**NO `optionalDependencies` FIELD IS DECLARED ON ANY PLATFORM ARTEFACT.** **A platform artefact carries its own `.node` and nothing else, so a platform artefact that depended on another platform artefact would let an install pull a SECOND target's binary into a consumer's tree — which is exactly the substitution `A-1` and the exact pins exist to bound.** `[A1 docs/specs/storeroom-publish-proposal.md §8.1 · `W-2` — the differently-versioned-copy window | prohibition]`

---

## §4. The licence — the four sites, the six notices, and the refused copy

### §4.1 The declaration sites and the two spellings

| # | The SITE | Its spelling | What it answers |
| --- | --- | --- | --- |
| (i) | the MAIN package's manifest `license` field | `AGPL-3.0` | a registry metadata reader |
| (ii) | `bindings/js/README.md` | `AGPL-3.0` | a documentation reader |
| (iii) | `docs/specs/storeroom-js/package.md §3.4` | `AGPL-3.0` | this project's own contract reader |
| (iv) | `bindings/js/Cargo.toml`'s `license` field | `AGPL-3.0-or-later` | the crate's own consumers, reading an SPDX expression |

**THE DISTRIBUTION'S DECLARED FACT IS `AGPL-3.0` AT SITES (i)–(iii), AND SITE (iv)'s SPDX EXPRESSION ADMITS THE `-or-later` CLAUSE; BOTH NAME THE REPOSITORY'S OWN `LICENSE` FILE, AND NO CLAUSE OF THIS UNIT CHANGES IT.** **THE DIVERGENCE IS DECLARED AND NOT REPAIRED**, because the two sites answer two different readers and a re-spelling of either would move a byte of a file this unit does not own (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-12`; `[A3 docs/specs/storeroom-js/package.md §3.4 item 3 — the four sites and the two spellings, at their own home | cross-reference]`). **A FIFTH SITE, OR A THIRD SPELLING, IS A FINDING.** `[A1 docs/specs/storeroom-publish-proposal.md §4 item 3 — the licence dispositions re-decided rather than inherited | declared parameter semantics]`

### §4.2 The six artefacts' notices — answered rather than assumed

1. **EACH OF THE SIX ARTEFACTS CARRIES A COPY OF THE REPOSITORY'S OWN `LICENSE`**: the main package and each of the five platform artefacts alike. **The copy travels with the artefact, so an install of a platform artefact ALONE carries the licence text** — which matters because each target artefact is installable on its own.
2. **AND EACH PLATFORM ARTEFACT'S MANIFEST `license` FIELD READS `AGPL-3.0`**, so the field and the copy agree within each artefact.
3. **THE PER-ARTEFACT COPY IS NOT A FIFTH DECLARATION SITE.** **`docs/specs/storeroom-js/package.md §3.4` item 3's site list is a list of AUTHORED DECLARATIONS ABOUT the licence — statements at a home — while a tarball's own copy is the licence's TEXT travelling with an artefact; so the count of SITES stays `4` and the count of artefacts CARRYING A NOTICE is `6`.** **The reading is declared here because the union's row `4` asks for the answer rather than assuming it** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-11`; `[A1 docs/specs/storeroom-publish-proposal-review.md §3.2 · union row `4` — the five artefacts' own notices, a gate-2 carriage answered five at once | requirement]`).
4. **AND THE `alt`, PRICED BECAUSE THE ANSWER OWES ONE: A REFERENCE INSTEAD OF A COPY** — priced: an install of a platform artefact alone would then carry no licence text, and the reference would be unreachable for exactly the consumer the matrix exists to serve; **and NO PER-ARTEFACT NOTICE** — priced: it leaves `K7`'s remaining limb unanswered, which is the one thing the condition forbids; **both available with a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment.** `[A1 docs/specs/storeroom-publish/contract.md §0.3 | declared parameter semantics]`

### §4.3 `bindings/js/LICENSE` is refused, and the appendix's lines are filled by the architect's own act

1. **`bindings/js/LICENSE` IS REFUSED.** **`[M]` no such file exists in the tree, and none is written by any pass: a copied licence inside the sibling crate is what the refusal exists to prevent, because a second copy can drift.**
2. **THE TARBALL'S OWN COPY IS THEREFORE AN ARTEFACT-LEVEL FACT AND NOT A CRATE-LEVEL FILE:** the licence's TEXT reaches an artefact through the release's own assembly step, which copies the repository's `LICENSE` byte-for-byte into each artefact's tarball (`docs/specs/storeroom-publish/contract.md §9` · `Q3-5`).
3. **AND THE TWO LINES THE DELIVERABLE ENUMERATES ARE THE ARCHITECT'S OWN ACTS: the AGPL appendix's programme-name line is `Provident-Storeroom` and its copyright line is `Copyright (C) 2026 Auspicion Innovations LLC`, both already signed by him; and no clause of this unit moves a byte of the repository's `LICENSE`** (`PUB-DD-12`). `[A1 docs/specs/storeroom-publish-proposal.md §3 item 4 | cross-reference]`

---

## §5. The types and the closed set's carriage — `A85`(2)

### §5.1 The file, its path and its exposure

1. **THE TYPES SIT AT `bindings/js/index.d.ts`**, are **AUTHORED** (not generated), are **listed in the main package's `files`**, and are **reached through the main package's `types` field.**
2. **NO `typesVersions` MAP, NO SECOND DECLARATION FILE AND NO `@types/…` PACKAGE IS SHIPPED** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-21`).
3. **AND THE `alt`, PRICED: A SEPARATE `@types/provident-storeroom` PACKAGE** — priced: it adds a SEVENTH artefact to the release's mandated order and a second publisher identity to the provenance subject, while the types describe this package's own declared surface and nothing else; **available with a fresh ruling, followed by a bounded amendment and one `files` edit.** `[A1 docs/specs/storeroom-publish/contract.md §0.3 | declared parameter semantics]`

### §5.2 What the declaration carries — three parts and nothing else

1. **THE EIGHT VERBS OF THE CLAIMED ESM ENTRY, EXACTLY AS THE SIBLING DIRECTORY ENUMERATES THEM**, and **no ninth name** (`[A3 docs/specs/storeroom-js/package.md §1.3 items 3–4 — the entry's named-export set, and the finding rule its *"AND NOTHING ELSE"* carries | cross-reference]`).
2. **THE INSTANCE'S OWN MEMBER SET — `{ register, on, off }`, THREE OWN MEMBERS AND NOTHING ELSE** (`[A3 docs/specs/storeroom-js/package.md §1.3 item 4 — the instance's operative member set, reconciled at its own home | cross-reference]`).
3. **THE FAILURE SURFACE — the thrown `{status, message}`, with exactly two members** (`docs/specs/storeroom-publish/contract.md §1.4`; `[A3 docs/specs/storeroom-js/contract.md §2.5 — the single failure form | cross-reference]`).
4. **AND ONE THING THE DECLARATION MUST NOT CARRY, STATED SO THE FINDING RULE IS CHECKABLE: it must declare NO store type, NO store verb, NO `findAddress`, NO release verb and NO constraint or repair seam** — each is a declaration the sibling directory refuses, and a `.d.ts` that carried one would declare a surface the package does not publish. `[A1 | prohibition]`
5. **AND THE RESERVED WORD'S OWN CARRIAGE IS DECLARED HERE, BECAUSE ITEM 1'S *"EXACTLY AS THE SIBLING DIRECTORY ENUMERATES THEM"* NAMES NO SPELLING FOR `delete` AND A DECLARATION CANNOT BIND THAT NAME AS AN IDENTIFIER.** **THE EIGHTH VERB IS CARRIED IN THE DECLARATION BY A DECLARATION-PLUS-EXPORT PAIR AND BY NO OTHER SPELLING: the function is DECLARED under a non-reserved identifier — `declare function deleteOp(instance, address, tier?)` — and EXPORTED under the name the entry publishes, `export { deleteOp as delete }`, so the ESM surface's own name is `delete` and the declaration's local binding is `deleteOp`.** **THE REASON IT IS DECLARED RATHER THAN LEFT TO A READER: `export function delete(…)` is NOT A PARSEABLE DECLARATION, so a consumer's compiler reads NO SURFACE from a file that spells it so rather than a mis-typed one** — **and `deleteOp` is a LOCAL BINDING of the declaration file and NOT a NINTH NAME: item 1's *"no ninth name"* counts EXPORTED names, the export set is the eight and no ninth, and the pair above is the only lawful carriage of the eighth.** **AND THE PAIR IS THE ONLY SPELLING THIS DECLARATION MAY USE: an `export function delete(…)` row, an alias re-export (`export { deleteOp as default }`), a second alias name and a `.d.ts` that omits the verb each remain FINDINGS** (`docs/specs/storeroom-publish/contract.md §2.2`; `docs/specs/storeroom-publish/contract.md §2.4` item 2; `P-PUB-7`). `[A1 — the carriage is this part's own declaration, its subject being the declaration FILE's syntax where the entry's own runtime spelling is the sibling directory's | requirement]`

### §5.3 The closed set's carriage — `A85`(2)'s shape, and the store's membership

1. **THE `status` IS A UNION OVER A DECLARED-BUT-OPEN SET.** **The store's fifteen members are DISCOVERABLE in the type, AND an unknown status is still typed** — the union's members beside an explicit escape — **so the type survives a ruling that moves the set.**
2. **THE SET'S MEMBERSHIP IS DECLARED IN THE TYPE'S OWN PROSE AS THE STORE'S AND NOT THE PACKAGE'S**, and **an immutably-enumerated union in `0.1.0` is REFUSED**: the set has already moved `14 → 15` and the store's own park prices a sixteenth, so an immutable union would mis-type a LAWFUL refusal (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-3`; `[A3 docs/specs/storeroom-native/contract.md §8.1 — the closed `15`, whose membership is the store contract's to close | cross-reference]`).
3. **AND THE PACKAGE MINTS NO MEMBER, WIDENS NO SET AND RENAMES NONE** — **so the type's escape arm is the ONLY thing that makes an unknown status typable, and its absence would be a finding rather than a strictness.** `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(2) | declared parameter semantics]`

---

## §6. The metadata, the publish configuration, and the six-artefact census

### §6.1 The fields supplied, and the three declared absent

| # | The field | What it carries | The rule |
| --- | --- | --- | --- |
| 1 | **`name`** | **`provident-storeroom` — the MAIN package's identity, UNSCOPED, as the architect's ruling names it** | `A82`; **the main package does NOT move with the platform names' scope** |
| 2 | **`description`** | **a LONG description naming the unit, the deliverable and the binding's own route** | **no remote is needed for this field** |
| 3 | **`keywords`** | **supplied** | **a search surface, and no remote is needed for it** |
| 4 | **`author`** | **supplied** | **no remote is needed for it** |
| 5 | **`license`** | **`AGPL-3.0`** | `§4.1` site (i) |
| 6 | **`engines`** | **`{ "node": ">=18.0.0" }`** | the floor is a declaration, not a measurement |
| 7 | **`exports`** | **exactly ONE arms-bearing entry, the ESM one** | **a wildcard, a deep import to the addon and a CJS arm are each refused** (`[A3 docs/specs/storeroom-js/package.md §1.3 items 1–2 | prohibition]`) |
| 8 | **`files`** | **`index.mjs` · `README.md` · `index.d.ts`** | `§2.1` |
| 9 | **`types`** | **`index.d.ts`** | `§5.1` |
| 10 | **`optionalDependencies`** | **the five declared names, each pinned EXACTLY at the main package's own `version`** | **the coupling rule and the load-bearing pins** (`PUB-DD-10`; `resolution.md §3.2` item 4) |
| 11 | **`publishConfig`** | **`{ "access": "public" }`** | **`A82`'s ruling is a PUBLIC release, and the field is what declares it to the registry** |
| 12 | **`type`** | **`"module"`** | **the claimed realm is Node ESM alone, and this field is the manifest's own half of that claim** |
| — | **`repository`** | **ABSENT — DECLARED ABSENT RATHER THAN GUESSED** | **`[M]` this repository carries no remote this project's own records name, and an immutable field naming a path that does not resolve is a finding by the project's own citation rule** |
| — | **`homepage`** | **ABSENT — declared absent** | as above |
| — | **`bugs`** | **ABSENT — declared absent** | as above |

**ARITHMETIC, PRINTED WITH ITS TERMS: `12` fields supplied + `3` fields declared ABSENT = `15` manifest fields this part declares, and the three absences are DECLARATIONS rather than omissions — `12 + 3 = 15` ✓.** `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-7` | numeric or census claim]`

### §6.2 The three absences, priced

**SUPPLYING THE THREE FIELDS WITH A URL THE ARCHITECT NAMES** — **priced: it is one line each and reverses nothing, and it is available THE MOMENT A REMOTE EXISTS; until then the URL would name a path that does not resolve, which is the finding the absence exists to avoid.** **And SUPPLYING A PLACEHOLDER URL** — **priced: a placeholder is a path that does not resolve, spelled as though it did, and it is worse than the declared absence.** **Both available with a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment.** `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-7` | declared parameter semantics]`

### §6.3 The six-artefact census — what the release publishes, and in what order

| # | The artefact | Its kind | Its version | When it publishes |
| --- | --- | --- | --- | --- |
| 1 | `@provident-storeroom/js-linux-x64-gnu` | platform | the main package's own | **first of the five** |
| 2 | `@provident-storeroom/js-linux-arm64-gnu` | platform | the main package's own | before the main package |
| 3 | `@provident-storeroom/js-darwin-x64` | platform | the main package's own | before the main package |
| 4 | `@provident-storeroom/js-darwin-arm64` | platform | the main package's own | before the main package |
| 5 | `@provident-storeroom/js-win32-x64-msvc` | platform | the main package's own | **last of the five** |
| 6 | `provident-storeroom` | the MAIN package | the tag's own | **LAST, ALWAYS** |

**ARITHMETIC, PRINTED WITH ITS TERMS: `6` artefacts = `5` platform + `1` main — `5 + 1 = 6` ✓ — and the ORDER is the partial-publish arm's precondition rather than a convenience: the main package is LAST so that a failure before it leaves nothing a consumer can install incomplete** (`docs/specs/storeroom-publish/release.md §3`; `P-PUB-8`). `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(4) | numeric or census claim]`

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): THE CENSUS'S FIVE PLATFORM ROWS, RE-EMITTED WITH THEIR AS-FILED SPELLINGS BESIDE THEIR OPERATIVE NAMES — AND ROW `6`, THE MAIN PACKAGE, NAMED AS UNMOVED.** `RCA-8(d)` ANNOTATE-BESIDE: **the census table above and its `5 + 1 = 6` ✓ arithmetic stand BYTE-FOR-BYTE and are read THROUGH this clause; THIS clause is a PURE INSERTION — it moves no row, changes no kind, changes no version and moves no order.** **THE RULING IS `A86`, and it changes an ORG and not the main package's identity** (`docs/specs/storeroom-publish-proposal.md` `§12`).

| # | The as-filed artefact (RE-EMITTED VERBATIM) | The OPERATIVE artefact | Its kind | Its version | When it publishes |
| --- | --- | --- | --- | --- | --- |
| 1 | `@provident-storeroom/js-linux-x64-gnu` | **`@auspicion/js-linux-x64-gnu`** | platform | the main package's own | **first of the five** |
| 2 | `@provident-storeroom/js-linux-arm64-gnu` | **`@auspicion/js-linux-arm64-gnu`** | platform | the main package's own | before the main package |
| 3 | `@provident-storeroom/js-darwin-x64` | **`@auspicion/js-darwin-x64`** | platform | the main package's own | before the main package |
| 4 | `@provident-storeroom/js-darwin-arm64` | **`@auspicion/js-darwin-arm64`** | platform | the main package's own | before the main package |
| 5 | `@provident-storeroom/js-win32-x64-msvc` | **`@auspicion/js-win32-x64-msvc`** | platform | the main package's own | **last of the five** |
| 6 | **`provident-storeroom`** | **`provident-storeroom` — UNMOVED** | the MAIN package | the tag's own | **LAST, ALWAYS** |

**AND THE ONE ROW THAT MUST NOT MOVE IS NAMED IN THE TABLE ABOVE AND IN THIS CLAUSE, STATEMENT FOR STATEMENT: ROW `6`, THE MAIN PACKAGE, PRINTS `provident-storeroom` BEFORE AND AFTER THIS PASS — UNSCOPED, AS `A82` RULED IT — and this pass's own check of that row is one of the six named under `parameter-semantics.md §2.1`'s confirmation clause.** **SO THE ARITHMETIC `5 + 1 = 6` ✓ IS UNMOVED, the `5` platform rows' KIND, VERSION and ORDER are unmoved, and the ORDER's own load-bearing property — the main package LAST — is untouched** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-6`, `PUB-DD-15`; `distribution.md §6.1` item 1). `[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86` — the org change and the identity that does not move | numeric or census claim]`

### §6.4 The binding-library class — spelled, never named

**THE EXPORT LAYER IS BUILT WITH A NODE-API BINDING LIBRARY, AND THIS PART NAMES NO LIBRARY.** **The class is spelled the way the sibling directory spells it, so NO SECOND EXTERNALLY-SOURCED VOCABULARY TOKEN enters this unit's contract and the JS unit's dossier owes NO SECOND ROW** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-16`; `[A3 docs/specs/storeroom-js/package.md §4.3 item 3 — the class spelled and the family named only in a priced default's own cell | requirement]`). **AND ONE CONSEQUENCE, STATED SO THE RULE IS NOT READ AS A GAP: a later pass that WANTS to name a library owes the dossier row the re-trigger requires, and that duty is named at `docs/specs/storeroom-publish/contract.md §9`.** `[A1 | prohibition]`

---

**END OF THIS PART.** **It carries the contract document's `§2` clauses whole and DECLARES NOTHING the contract does not already carry: the `§`-numbers, the fields, the tables and every authority tag are the contract document's own.**

**⟶ RECONCILED 2026-10-11 — THE `U-STOREROOM-PUBLISH` GATE-8 DOCUMENTATION REVIEW (`role_documentation_reviewer`): THE TWO CELLS OF THIS PART THAT OVER- OR UNDER-CLAIM THE SHIPPED MANIFESTS, EACH WITH ITS AS-FILED READING AND BOTH READINGS WHERE THE CORRECT ONE IS UNDECIDABLE FROM THESE DOCS.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — `§1`'s scope, `§2`'s allowlist and limitation clauses with `§2.1` item `5`'s licence-carriage reconciliation, `§3`'s two `A86`-reconciled tables and `§3.2`'s ten field groups, `§4`'s sites and six notices, `§5`'s types, `§6`'s metadata, census and library-class clauses, and the `END OF THIS PART` foot — STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION at the file's foot, it edits no field row, adds no field, moves no figure and re-decides no rule. THIS PASS RAN NOTHING.**

1. **`§3.2` FIELD `5` — `files` — AS FILED:** *"the artefact's own allowlist: **the manifest's sibling `.node` path AND the licence copy**"*, with the rule *"an artefact whose allowlist omits its `.node` cannot be loaded by rung one, and one whose allowlist omits the licence copy ships no notice"*. **THE BUILD'S OWN BYTES, ALL FIVE MANIFESTS READ: `bindings/js/platforms/{linux-x64,linux-arm64,darwin-x64,darwin-arm64,win32-x64}/package.json` each carry `"files": ["storeroom_js_binding.node", "LICENSE", "README.md"]` — THREE entries, not two.** **BOTH READINGS ARE LIVE, AND THE FIELD'S OWN WORDS DO NOT SETTLE WHICH:** **(i) READ AS A MINIMUM — *"the allowlist names the `.node` and the licence copy"* — the cell is SATISFIED and the third entry is an undeclared but lawful addition, and then this part UNDER-COUNTS the artefact's published content by one entry; (ii) READ AS THE WHOLE LIST — *"the allowlist is the `.node` path and the licence copy"* — the shipped `README.md` entry is a THIRD allowlist member no clause of this part declares, and then the cell OVER-CLAIMS its own completeness.** **THE PART'S OWN OTHER CELLS LEAN TO (i) AND NOT DECISIVELY: `§3.1`'s TRACKED-CONTENT column reads *"the manifest, and NO binary"* and its PUBLISHED-CONTENT column reads *"the manifest, the `.node` built for the target by CI, and the licence copy"*, and the release's own workflow's removal step states that *"the tracked platform directory carries its manifest and its own `README.md` and nothing else"* — so the `README.md` is DECLARED AT THE WORKFLOW AND UNDECLARED HERE.** **THE FINDING IS THEREFORE A DECLARATION GAP AND NOT A BUILD DEFECT: an entry the build ships which this part's field table does not name.** **OWNER: `role_spec_writer`, on a bounded amendment of this directory or a fresh ruling — NAMED, not repaired here, and NO FIELD ROW, ENTRY OR FIGURE MOVES BY THIS ITEM** (`[A1 bindings/js/platforms/*/package.json`; A1 `.github/workflows/publish.yml`; A3 `docs/specs/storeroom-publish/contract.md` `§2.2` | declared parameter semantics]`).
2. **`§4.3` ITEM `1` — AS FILED:** *"**`bindings/js/LICENSE` IS REFUSED.** **`[M]` no such file exists in the tree, and none is written by any pass: a copied licence inside the sibling crate is what the refusal exists to prevent, because a second copy can drift**"*, read with `§4.3` item `2` and `PUB-DD-12`. **THE BUILD'S OWN BYTES: the tracked tree carries NO `bindings/js/LICENSE` — the refusal's own observable HOLDS — while the release's step `3` LANDS ONE AT PACK TIME (`test ! -e bindings/js/LICENSE` · `cp LICENSE bindings/js/LICENSE` · a byte-for-byte equality check) and the `if: always()` step after the publish REMOVES IT and re-asserts the absence.** **SO THE TWO HALVES ARE BOTH TRUE AND THE ROW'S LITERAL WORDING DOES NOT SAY WHICH BYTE IT REFUSES: the refusal is of a TRACKED OR DRIFTING COPY, and the pack-time copy is neither — it is the mechanism `§4.2` item `1` and `§2.1` item `5` require, and it never outlives the release act. THE RECONCILIATION IS TAKEN AT THE CONTRACT DOCUMENT'S OWN FOOT (`docs/specs/storeroom-publish/contract.md`'s gate-8 clause item `3`), and this item names it at the part's own home so the two homes read as one declaration.** **NO CLAUSE, SITE OR COUNT MOVES: the four sites stay four, the six notices stay six, and `bindings/js/LICENSE` is still REFUSED as a tracked or persisting file** (`[A1 .github/workflows/publish.yml`; A3 `docs/specs/storeroom-js/contract.md` `§0.2` · `DD-43`; A1 `bindings/js/README.md` | prohibition]`).
