# `parameter-semantics` — every declared parameter of the resolution and of the manifests, its domain, its outside values, and the declared answer for each

**KIND: `carrier`** — **and this part ALSO CARRIES ITS OWN AUTHORED ROWS, which are its admissible content under this unit's own part map row: the relocated `§6`-shaped INDEX below, plus the authored `PAR-PUB-1`…`PAR-PUB-34` rows.** **A citation to this part names its PATH plus the `§`-number**, because *a bare `§n` across two documents is not an edge*.

**AND ONE SCOPE STATEMENT, SO THIS PART IS NOT MISTAKEN FOR ANOTHER UNIT'S:** **the store's parameter rows are `PAR-1`…`PAR-14` and live at `docs/specs/storeroom-native/parameter-semantics.md`; the JS unit's are `PAR-JS-1`…`PAR-JS-18` and live at `docs/specs/storeroom-js/parameter-semantics.md`. THEY ARE CITED HERE AND NEVER RESTATED.** **This part's rows are `PAR-PUB-1`…`PAR-PUB-34` — the RESOLUTION's and the MANIFESTS' own declared parameters — and they are a SEPARATE, UNCAPPED surface that is NOT the typed register's** (`[A3 docs/specs/storeroom-js/parameter-semantics.md — the sibling set's own scope statement and its uncapped surface, cited as the form's precedent | requirement]`). **THE `≤ 8` CAP DOES NOT REACH THIS SURFACE: `34` rows are lawful because the cap is the REGISTER's, and a parameter row is not a register row.**

**AND ONE DECLARATION THIS PART OWES AT ITS OWN HEAD: EVERY ROW BELOW IS A RESIDUAL OF A CLAUSE OF THIS UNIT'S CONTRACT OR OF THE SIBLING DIRECTORY'S, AND EACH OUTSIDE VALUE'S DECLARED ANSWER IS THE ANSWER THE CLAUSE IT CITES ALREADY FIXES.** **A row that DECLARES a parameter the contract does not carry is a FINDING.** `[A1 | declared parameter semantics]`

---

## §1. The parameter-semantics index — one row per declared parameter, and where its row lives

| Row | The declared parameter | Its kind | Where it is declared | Its row's home |
| --- | --- | --- | --- | --- |
| **`PAR-PUB-1`** | the MAIN package's `name` | `parameter` | `docs/specs/storeroom-publish/contract.md §2.5`; `distribution.md §6.1` | `§2.1` |
| **`PAR-PUB-2`** | the main package's `version` | `parameter` | `contract.md §3.2`; `release.md §2.2` | `§2.2` |
| **`PAR-PUB-3`** | the main package's `files` | `parameter` | `contract.md §2.1`; `distribution.md §2.1` | `§2.3` |
| **`PAR-PUB-4`** | the main package's `types` and the `.d.ts`'s path | `parameter` | `contract.md §2.4`; `distribution.md §5.1` | `§2.4` |
| **`PAR-PUB-5`** | the main package's `exports` map | `parameter` | `distribution.md §6.1` item 7 | `§2.5` |
| **`PAR-PUB-6`** | the main package's `engines` | `parameter` | `distribution.md §3.2` item 7 | `§2.6` |
| **`PAR-PUB-7`** | the main package's `license` field | `parameter` | `contract.md §2.3`; `distribution.md §4.1` | `§2.7` |
| **`PAR-PUB-8`** | the main package's `optionalDependencies` — five names, five exact pins | `parameter` | `contract.md §3.2`; `release.md §2.2` | `§2.8` |
| **`PAR-PUB-9`** | the main package's `publishConfig` | `parameter` | `distribution.md §6.1` item 11 | `§2.9` |
| **`PAR-PUB-10`** | the main package's `description` | `parameter` | `distribution.md §6.1` item 2 | `§2.10` |
| **`PAR-PUB-11`** | the main package's `keywords` | `parameter` | `distribution.md §6.1` item 3 | `§2.11` |
| **`PAR-PUB-12`** | the main package's `author` | `parameter` | `distribution.md §6.1` item 4 | `§2.12` |
| **`PAR-PUB-13`** | `repository` — DECLARED ABSENT | `parameter` | `contract.md §2.5`; `distribution.md §6.1` | `§2.13` |
| **`PAR-PUB-14`** | `homepage` — DECLARED ABSENT | `parameter` | `contract.md §2.5`; `distribution.md §6.1` | `§2.13` |
| **`PAR-PUB-15`** | `bugs` — DECLARED ABSENT | `parameter` | `contract.md §2.5`; `distribution.md §6.1` | `§2.13` |
| **`PAR-PUB-16`** | the main package's `type` | `parameter` | `distribution.md §6.1` item 12 | `§2.14` |
| **`PAR-PUB-17`** | a PLATFORM artefact's `name` | `parameter` | `contract.md §1.3`; `resolution.md §3.1`; `distribution.md §3.2` item 1 | `§3.1` |
| **`PAR-PUB-18`** | a platform artefact's `version` | `parameter` | `release.md §2.2`; `distribution.md §3.2` item 2 | `§3.2` |
| **`PAR-PUB-19`** | a platform artefact's `os` | `parameter` | `distribution.md §3.2` item 3 | `§3.3` |
| **`PAR-PUB-20`** | a platform artefact's `cpu` | `parameter` | `distribution.md §3.2` item 4 | `§3.3` |
| **`PAR-PUB-21`** | a platform artefact's `files` and its exposed `.node` path | `parameter` | `distribution.md §3.2` items 5–6 | `§3.4` |
| **`PAR-PUB-22`** | a platform artefact's `license` field and its notice | `parameter` | `contract.md §2.3`; `distribution.md §4.2` | `§3.5` |
| **`PAR-PUB-23`** | a platform artefact's `engines` | `parameter` | `distribution.md §3.2` item 7 | `§3.6` |
| **`PAR-PUB-24`** | a platform artefact's `publishConfig` | `parameter` | `distribution.md §3.2` item 9 | `§3.7` |
| **`PAR-PUB-25`** | the five declared platform names — the closed key set | `vocabulary-token` | `contract.md §1.3`; `resolution.md §3` | `§4.1` |
| **`PAR-PUB-26`** | a platform artefact's manifest SOURCE path | `parameter` | `distribution.md §3.1` | `§4.2` |
| **`PAR-PUB-27`** | the workflow file's PATH | `parameter` | `contract.md §3.1`; `release.md §1.1` | `§4.3` |
| **`PAR-PUB-28`** | the CI's five per-target RUNNERS | `parameter` | `release.md §1.2` | `§4.4` |
| **`PAR-PUB-29`** | the tag, and the version it fixes | `parameter` | `contract.md §3.2`; `release.md §2.1` | `§4.5` |
| **`PAR-PUB-30`** | the module-relative addon path at rung two | `parameter` | `contract.md §1.1`; `resolution.md §2.1` item 2 | `§4.6` |
| **`PAR-PUB-31`** | the runtime platform key — `process.platform` × `process.arch` | `parameter` | `contract.md §1.2`; `resolution.md §4.1` | `§4.7` |
| **`PAR-PUB-32`** | the version READ — the addon's own self-report against the package's version | `return-field` (it consumes the addon's report and the manifest's field) | `contract.md §1.5`; `resolution.md §5.1` | `§4.8` |
| **`PAR-PUB-33`** | the arm's `message` — WHO AUTHORS it, by the reachability of the store's generator | `return-field` (it is what the arm's `message` member carries) | `contract.md §1.4` item 6; `resolution.md §5.3` item 6 | `§4.9` |
| **`PAR-PUB-34`** | the both-paths subject's JOIN — its separator, its order, and the generator's one subject slot | `vocabulary-token` (the join is a rendering of two subjects) | `contract.md §1.4` item 2; `contract.md §1.5` item 6; `resolution.md §5.3b` | `§4.10` |

**ARITHMETIC, PRINTED WITH ITS TERMS: `34` rows = `12` MAIN-package fields (`PAR-PUB-1`…`PAR-PUB-12`) + `3` DECLARED-ABSENT fields (`PAR-PUB-13`…`PAR-PUB-15`) + `1` realm field (`PAR-PUB-16`) + `8` PLATFORM-artefact fields (`PAR-PUB-17`…`PAR-PUB-24`) + `10` resolution/manifest-location parameters (`PAR-PUB-25`…`PAR-PUB-34`) — **`12 + 3 + 1 + 8 + 10 = 34` ✓** — **and the set is UNCAPPED, because the `≤ 8` cap is the REGISTER's and no parameter row is a register row.** **AND THE PRE-PASS COUNT THIS MOVES, PRINTED SO THE MOVEMENT IS NOT READ AS A SILENT RESTATEMENT: the set stood at `32` rows = `12 + 3 + 1 + 8 + 8` before the bounded two-clause pass of `PUB-CF-7`/`PUB-CF-12` and stands at `34` after it — `PAR-PUB-33` (the arm's `message`'s author, `PUB-DD-25`) and `PAR-PUB-34` (the both-paths subject's join, `PUB-DD-26`) — and NO PRE-PASS ROW IS MOVED, DROPPED OR RENUMBERED: `PAR-PUB-1`…`PAR-PUB-32` keep their numbers, their clauses and their homes byte-for-byte.** `[A1 | numeric or census claim]`

---

## §2. The MAIN package's declared fields — `PAR-PUB-1` … `PAR-PUB-16`

**EVERY ROW BELOW CARRIES ITS KIND, ITS UNIT, ITS DOMAIN, THE VALUES OUTSIDE IT, THE DECLARED ANSWER FOR EACH, ITS SUPPLIER, ITS EVALUATOR AND ITS OBSERVABLE.**

### §2.1 `PAR-PUB-1` — the main package's `name`

- **Kind:** `parameter`. **Unit:** the package's registry identity, a name.
- **Domain:** **exactly `provident-storeroom`** — the single unscoped identity the architect's ruling names.
- **Outside values, and their declared answers:** **a scoped spelling (`@provident-storeroom/…`)** → **REFUSED: the main package's unscoped identity is a ruling, and a scope would reverse it**; **the sibling directory's old identity (`@provident-storeroom/js`)** → **REFUSED: it is the identity the amendment moves, and it must not survive in the manifest, the seven self-referencing test files or the two blind rows**; **a name colliding with the store's crate** → **REFUSED**.
- **Supplier:** the architect (the identity), the implementer (the manifest byte). **Evaluator:** `S-SCOPE` and `S-MANIFEST`. **Observable:** the manifest's `name` field, read with the seven test files' specifier and the two blind rows.
  **⟶ AND THE TWO COUNTED TERMS OF THIS ROW ARE CORRECTED BESIDE THEMSELVES 2026-10-11 BY THE `U-STOREROOM-PUBLISH` CLOSE-OUT PROOFREADING PASS (`role_proofreader`), `RCA-8(d)` ANNOTATE-BESIDE: the row above stands byte-for-byte — its domain, its three outside values and their declared answers, its supplier, its evaluator, its home and its citations — and is read THROUGH this correction; THIS clause is a PURE INSERTION and it MINTS NO ROW: the set stays `34` rows.** **THE COUNTED TERMS: (1) THE `seven test files` THE ROW'S OBSERVABLE NAMES — the tree carries NINE files under `bindings/js/test/**` that import the package by its own name: the seven the row names, plus this unit's own `publish.test.mjs` and `publish-generators.test.mjs`, each self-referencing `provident-storeroom`; and (2) THE `two blind rows` — the tree carries THREE: `JSG-12.10`, `JSG-12.12` AND `JSG-12.18` (the `files` allowlist), which `docs/specs/storeroom-js-greens.md`'s `JSG-12` clause, item `5`, prints as the publish unit's own addition.** **SO THE OBSERVABLE'S SUBJECT IS UNMOVED — a name-for-name comparison of the manifest's identity against every site that self-references it — and its count moves `7 + 2 = 9` to `9 + 3 = 12` sites; NO FIGURE OF THE ROW'S DOMAIN MOVES AND NO `PAR-PUB` ROW IS MOVED, DROPPED, RENUMBERED OR ADDED.** `[A3 bindings/js/test/*.test.mjs` — the nine self-referencing files at their own specifiers; A3 `docs/specs/storeroom-js-greens.md` `JSG-12`'s clause item `5` and its `§2` heads — the three identity rows | numeric or census claim]`
- **Home:** `§2.1`. **Cited:** `docs/specs/storeroom-publish/contract.md §2.5`; `distribution.md §6.1` item 1. `[A2 docs/decisions.md · the `A82`/`A83` row of 2026-10-11 — *"public at provident-storeroom:0.1.0"* | declared parameter semantics]`

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): THIS ROW IS CHECKED AND IT HOLDS.** `RCA-8(d)` ANNOTATE-BESIDE: **the row above stands BYTE-FOR-BYTE — its domain, its three outside values with their declared answers, its supplier, its evaluator, its observable, its home and its citations — and it is read THROUGH this clause; THIS clause is a PURE INSERTION and it MINTS NO ROW: the set stays `34` rows.** **THE CHECK: the `§12` pass moves the FIVE PLATFORM names' scope segment from `@provident-storeroom` to `@auspicion` and moves NO cell that prints the MAIN package's identity.** **SO THIS ROW'S DOMAIN IS UNMOVED AT *"exactly `provident-storeroom` — the single unscoped identity the architect's ruling names"*, and its own first outside value — *"a scoped spelling (`@provident-storeroom/…`)"* → REFUSED — is RE-READ WITH THE NEW ORG NAMED: a scoped spelling at THIS field, whether its scope is `@auspicion` or `@provident-storeroom`, is REFUSED, because the main package's unscoped identity is a ruling and a scope would reverse it.** **AND THE SECOND OUTSIDE VALUE IS RE-READ THE SAME WAY AND IS NOT WITHDRAWN: the sibling directory's own main identity `@provident-storeroom/js` remains the identity `DD-26` carries, is REFUSED at this field, and is NOT one of the five platform names this pass re-scopes.** **THE TWO HOME-CELLS THIS CONFIRMATION NAMES BESIDE ITS OWN: `distribution.md §6.1` item 1 and `distribution.md §6.3` row `6`, each read this pass and each found STANDING at `provident-storeroom`** (`docs/specs/storeroom-publish-proposal.md` `§12`; `docs/specs/storeroom-publish/contract.md` `§0.3` · `PUB-DD-6`, `PUB-DD-15`). `[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86` — the ruling changes an ORG and not the main package's identity | declared parameter semantics]`

**⟶ RECONCILED 2026-10-11 AGAIN — THE `A88` PROJECT-TOKEN PASS (`role_spec_writer`): THIS ROW IS CHECKED AGAIN AND IT HOLDS AGAIN — THE PROJECT TOKEN REACHES THE FIVE PLATFORM NAMES AND NOT THE MAIN PACKAGE'S IDENTITY.** `RCA-8(d)` ANNOTATE-BESIDE: **the row above and both clauses under it stand BYTE-FOR-BYTE — its domain, its three outside values with their declared answers, its supplier, its evaluator, its observable, its home and its citations — and each is read THROUGH this clause; THIS clause is a PURE INSERTION and it MINTS NO ROW: the set stays `34` rows.** **THE RULING `A88` ORDERS A CHANGE TO THE PLATFORM PACKAGE NAMES AND SAYS NOTHING OF THE MAIN PACKAGE** — its own words are *"Change the platform package names to specify the project they are for, this organization will be used for multiple"*, and its own `NOT PINS` cell records that *"the main package's identity does not move: `A82`'s unscoped `provident-storeroom` stands, its own name already specifying the project"* (`docs/decisions.md` · the ACTIVE `A88` row of 2026-10-11). **SO THIS ROW'S DOMAIN IS UNMOVED AT *"exactly `provident-storeroom` — the single unscoped identity the architect's ruling names"*, and its own first outside value — *"a scoped spelling (`@provident-storeroom/…`)"* → REFUSED — is RE-READ WITH BOTH OPERATIVE SCOPES NAMED: a scoped spelling at THIS field is REFUSED whether its scope is `@auspicion` or `@provident-storeroom`, because the main package's unscoped identity is a ruling and a scope would reverse it.** **AND ONE READING THIS PASS OWES, STATED SO THE PROJECT TOKEN IS NOT TAKEN FOR A SECOND IDENTITY CHANGE: the five PLATFORM names now carry the WORD `provident-storeroom` INSIDE a scoped name, while THIS field carries the same word AS THE WHOLE NAME — the same project named at two different kinds of identity — and the five platform names' token does NOT migrate into this field.** **THE FIVE CELLS OF THIS IDENTITY, EACH READ THIS PASS AND EACH FOUND STANDING, NONE EDITED: `distribution.md §6.1` item `1` · `distribution.md §6.3` row `6` · this row's own domain · `release.md §1.4` step `5`'s subject · `release.md §4.2` act `1`'s *"five scoped, one unscoped"*** (`docs/specs/storeroom-publish-proposal.md` `§14`; `docs/specs/storeroom-publish/contract.md` `§0.3` · `PUB-DD-29`). `[A1 docs/decisions.md · the ACTIVE `A88` row of 2026-10-11; A1 docs/specs/storeroom-publish-proposal.md §14 | declared parameter semantics]`

### §2.2 `PAR-PUB-2` — the main package's `version`

- **Kind:** `parameter`. **Unit:** a semantic version string.
- **Domain:** **the tag's own version — `0.1.0` for the first release and thereafter exactly the tag's `v<major>.<minor>.<patch>` value.**
- **Outside values:** **a version that differs from the tag's** → **REFUSED by the tag rule**; **a version differing from the five platform artefacts'** → **REFUSED by the coupling rule**; **an untagged commit's own version** → **REFUSED: no publication happens from an untagged commit**.
- **Supplier:** the architect (the tag), the implementer (the manifest byte). **Evaluator:** `S-TAG`. **Observable:** the manifest's `version` read against the tag and against the five platform manifests' `version`.
- **Home:** `§2.2`. **Cited:** `contract.md §3.2`; `release.md §2.2`. `[A3 docs/specs/storeroom-js/contract.md §0.2 · `DD-42` | declared parameter semantics]`

**⟶ RECONCILED 2026-10-11 — THE RELEASE-VERSION PASS (`role_spec_writer`), ON `A89` (§15): THIS ROW'S DOMAIN IS RE-EMITTED AT ITS AS-FILED READING AND RE-READ AT `0.1.1`, WITH `0.1.0` NAMED AS THE BOOTSTRAP VERSION THAT CARRIES NO ACCEPTANCE FIGURE.** `RCA-8(d)` ANNOTATE-BESIDE: **the row above stands BYTE-FOR-BYTE — its kind, its unit, its three outside values with their declared answers, its supplier, its evaluator, its observable, its home and its citations — and it is read THROUGH this clause; THIS clause is a PURE INSERTION and it MINTS NO ROW: the set stays `34` rows, and `PAR-PUB-2`'s number and home are UNMOVED.**
- **The as-filed domain, RE-EMITTED VERBATIM: *"the tag's own version — `0.1.0` for the first release and thereafter exactly the tag's `v<major>.<minor>.<patch>` value."***
- **THE OPERATIVE DOMAIN: the tag's own version — `0.1.1` FOR THE SHIPPED TREE, the first release the workflow performs, and thereafter exactly the tag's `v<major>.<minor>.<patch>` value.** **`0.1.0` IS NAMED BESIDE IT AS THE BOOTSTRAP VERSION: the version `A87`'s local route published, whose six artefacts are PLACEHOLDERS BY CONSTRUCTION — the five platform tarballs deliberately empty — and which therefore CARRIES NO ACCEPTANCE FIGURE, `LIVE/INSTALL` having neither run nor being able to pass against it** (`docs/specs/storeroom-publish-proposal.md §15` · `A89`(4); `docs/decisions.md` · the ACTIVE `A89` row of 2026-10-11; `docs/specs/storeroom-publish/release.md §5`'s bootstrap clause).
- **SO THE DOMAIN'S ONE MOVED TERM IS THE FIGURE `0.1.0` → `0.1.1`, AND THE ROW'S THREE OUTSIDE VALUES ARE UNMOVED AT THE OPERATIVE FIGURE: a version that differs from the tag's → REFUSED by the tag rule; a version differing from the five platform artefacts' → REFUSED by the coupling rule; an untagged commit's own version → REFUSED.** **AND THE COUPLING RULE IS PRINTED WHERE THIS ROW STANDS, BECAUSE THE FIGURE IS COUPLED RATHER THAN FREE: every platform artefact's `version` equals its EXACT PIN in the main package, and BOTH equal the released version — which is why the bump MOVES SIX MANIFESTS TOGETHER** (`docs/specs/storeroom-publish/resolution.md §3.1` item `4`; `docs/specs/storeroom-publish/contract.md §3.2`; `PUB-DD-10`). **AND THE PRICED ALTERNATIVE STANDS CARRIED AND UNAPPLIED: a version bump that moved the main package's `version` WITHOUT moving the five platform manifests' — priced: the five pins would resolve nothing at a consumer's install, the coupling rule would be broken on the side the load path depends on, and rung one would miss at every covered key.** `[A1 docs/specs/storeroom-publish-proposal.md §15 · `A89`(1)–(4); A1 docs/decisions.md · the ACTIVE `A89` row of 2026-10-11; read with `docs/specs/storeroom-publish/release.md §5.4`'s bootstrap clause | declared parameter semantics]`

### §2.3 `PAR-PUB-3` — the main package's `files`

- **Kind:** `parameter`. **Unit:** a set of published paths.
- **Domain:** **exactly `index.mjs` · `README.md` · `index.d.ts`.**
- **Outside values:** **`build/Release`** → **REFUSED: the binary leaves the allowlist**; **any `.node`** → **REFUSED**; **a path absent from the tree** → **REFUSED: a listed file that does not exist publishes an incomplete tarball**; **a directory carrying the crate's sources** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the manifest's `files` array and the packed tarball's own listing.
- **Home:** `§2.3`. **Cited:** `contract.md §2.1`; `distribution.md §2.1`. **AND ONE MECHANISM THIS ROW NAMES, SO ITS DOMAIN IS NOT READ AS DENYING THE ARTEFACT ITS NOTICE: the main package's `files` array names THREE PUBLISHED PATHS AND NO `LICENSE` ROW, while the artefact's own licence copy is landed by THE RELEASE'S OWN ASSEMBLY STEP at `distribution.md §4.3` item 2 — so the copy is an ARTEFACT-LEVEL fact of the tarball and not a fourth entry of this allowlist, and a `LICENSE` row added here is a value OUTSIDE the domain above.** `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(1) | declared parameter semantics]`

### §2.4 `PAR-PUB-4` — the main package's `types` and the `.d.ts`'s path

- **Kind:** `parameter`. **Unit:** a path to a declaration file.
- **Domain:** **`index.d.ts`, relative to the package root, and the same file listed in `files`.**
- **Outside values:** **a `types` value absent from `files`** → **REFUSED: the declared surface would be missing from the tarball**; **a `typesVersions` map** → **REFUSED**; **a second declaration file** → **REFUSED**; **an `@types/…` package** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-TYPES`; `S-MANIFEST`. **Observable:** the `types` field, the `files` array and the shipped file's own presence.
- **Home:** `§2.4`. **Cited:** `contract.md §2.4`; `distribution.md §5.1`. `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(2) | declared parameter semantics]`

### §2.5 `PAR-PUB-5` — the main package's `exports` map

- **Kind:** `parameter`. **Unit:** a subpath map.
- **Domain:** **exactly ONE arms-bearing entry — the ESM one, at the package root.**
- **Outside values:** **a wildcard `"./*"`** → **REFUSED: it would expose the addon's path**; **a deep import to the `.node`** → **REFUSED**; **a CJS arm** → **REFUSED: it is a second claimed realm**; **a second ESM entry** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the `exports` map, and the entry's own resolvability by the package's name.
- **Home:** `§2.5`. **Cited:** `distribution.md §6.1` item 7. `[A3 docs/specs/storeroom-js/package.md §1.3 items 1–2 | declared parameter semantics]`

### §2.6 `PAR-PUB-6` — the main package's `engines`

- **Kind:** `parameter`. **Unit:** a runtime version range.
- **Domain:** **exactly `{ "node": ">=18.0.0" }`.**
- **Outside values:** **an unbounded floor (absent `engines`)** → **REFUSED: the floor is a declared parameter**; **a floor justified by a measurement this unit did not take** → **REFUSED**; **a Node-API version floor** → **REFUSED; the package declares NO ABI assertion**; **an Electron-specific floor** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the `engines` field, read with the shipped documentation's statement that the Node-API version is the sibling crate's build target.
- **Home:** `§2.6`. **Cited:** `distribution.md §3.2` item 7. `[A3 docs/specs/storeroom-js/package.md §1.4 items 1–2 | declared parameter semantics]`

### §2.7 `PAR-PUB-7` — the main package's `license` field

- **Kind:** `parameter`. **Unit:** an SPDX-shaped licence token.
- **Domain:** **exactly `AGPL-3.0`.**
- **Outside values:** **`AGPL-3.0-or-later` at this site** → **REFUSED: the `-or-later` spelling belongs to the crate's SPDX manifest field alone, and a THIRD spelling is a finding**; **a licence other than the repository's** → **REFUSED**; **an absent field** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-LICENCE`; `S-MANIFEST`. **Observable:** the field, read with the other three declared sites.
- **Home:** `§2.7`. **Cited:** `contract.md §2.3`; `distribution.md §4.1`. `[A3 docs/specs/storeroom-js/package.md §3.4 item 3 | declared parameter semantics]`

### §2.8 `PAR-PUB-8` — the main package's `optionalDependencies`

- **Kind:** `parameter`. **Unit:** five name→version pairs.
- **Domain:** **exactly the five declared names, each mapped to the main package's own `version`, EXACTLY — no range, no caret, no tilde, no wildcard.**
- **Outside values:** **a sixth name** → **REFUSED**; **an unscoped name** → **REFUSED**; **a range in any of the five** → **REFUSED: `W-2`'s hoisting window re-opens**; **a version other than the main package's** → **REFUSED**; **an absent entry** → **REFUSED: rung one would miss at a covered key**; **a `dependencies` entry instead** → **REFUSED: the five are optional by design, so an uncovered target's install does not fail on them**.
- **Supplier:** the implementer. **Evaluator:** `S-KEYSET`; `S-SCOPE`. **Observable:** the five keys and their five values, read name for name against `resolution.md §3.1`'s table.
- **Home:** `§2.8`. **Cited:** `contract.md §3.2`; `release.md §2.2`. `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(4) and `§8.1` · `W-2` | declared parameter semantics]`

### §2.9 `PAR-PUB-9` — the main package's `publishConfig`

- **Kind:** `parameter`. **Unit:** a publish-time registry directive.
- **Domain:** **`{ "access": "public" }` — the field the ruling's *"public"* makes operative.**
- **Outside values:** **an absent field on a SCOPED package** → **REFUSED for the five platform artefacts: a scoped name is private by default, so its absence publishes five private artefacts and the main package's install cannot resolve them**; **`"access": "restricted"`** → **REFUSED: it contradicts the public release**; **a `registry` override** → **REFUSED: no other registry is declared by any clause**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the `publishConfig` field of the main package and of each platform artefact.
- **Home:** `§2.9`. **Cited:** `distribution.md §6.1` item 11; `§3.2` item 9. `[A2 docs/decisions.md · the `A82`/`A83` row of 2026-10-11 — the public release | declared parameter semantics]`

### §2.10 `PAR-PUB-10` — the main package's `description`

- **Kind:** `parameter`. **Unit:** a free-text string.
- **Domain:** **a LONG description naming this unit, its deliverable and the binding's own route.**
- **Outside values:** **an empty string** → **REFUSED**; **a one-word description** → **REFUSED: the field is declared long**; **a description claiming a realm the package does not claim** → **REFUSED**; **a URL** → **REFUSED at this field: the three URL-bearing fields are declared absent**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the `description` field.
- **Home:** `§2.10`. **Cited:** `distribution.md §6.1` item 2. `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(6) | declared parameter semantics]`

### §2.11 `PAR-PUB-11` — the main package's `keywords`

- **Kind:** `parameter`. **Unit:** a list of search tokens.
- **Domain:** **supplied; no remote is needed for this field.**
- **Outside values:** **an absent field** → **REFUSED: the field is supplied by this unit's declaration**; **a token naming an unclaimed realm** → **REFUSED**; **a token naming the store's crate** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the `keywords` array.
- **Home:** `§2.11`. **Cited:** `distribution.md §6.1` item 3. `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(6) | declared parameter semantics]`

### §2.12 `PAR-PUB-12` — the main package's `author`

- **Kind:** `parameter`. **Unit:** an authorship string.
- **Domain:** **supplied; no remote is needed for this field.**
- **Outside values:** **an absent field** → **REFUSED**; **an author disagreeing with the licence's copyright line** → **REFUSED**; **a placeholder** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the `author` field, read with the repository's `LICENSE` copyright line.
- **Home:** `§2.12`. **Cited:** `distribution.md §6.1` item 4. `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(6) | declared parameter semantics]`

### §2.13 `PAR-PUB-13` / `PAR-PUB-14` / `PAR-PUB-15` — `repository`, `homepage`, `bugs`: DECLARED ABSENT

- **Kind:** `parameter` (each). **Unit:** a URL-bearing manifest field.
- **Domain:** **ABSENT. The three fields are not present in the manifest, and their absence IS the declaration.**
- **Outside values, and their declared answers:** **a field PRESENT naming a path that does not resolve** → **REFUSED: an immutable field naming an unresolving path is a finding by the project's own citation rule**; **a placeholder URL** → **REFUSED, and worse than the absence, because it is spelled as though it resolved**; **a field present where no remote exists** → **REFUSED for the same reason**.
- **Supplier:** the architect, when he names a remote; **until then, no supplier and the absence is operative.** **Evaluator:** `S-MANIFEST`. **Observable:** the three fields' absence, and the declared reason.
- **Home:** `§2.13`. **Cited:** `contract.md §2.5`; `distribution.md §6.1` and `§6.2`. `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(6) | declared parameter semantics]`

### §2.14 `PAR-PUB-16` — the main package's `type`

- **Kind:** `parameter`. **Unit:** a module-system token.
- **Domain:** **exactly `"module"`.**
- **Outside values:** **`"commonjs"`** → **REFUSED: the claimed realm is Node ESM alone**; **an absent field** → **REFUSED: the manifest would then not declare its own module system**; **a second entry point for a CJS consumer** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the `type` field, read with the `exports` map.
- **Home:** `§2.14`. **Cited:** `distribution.md §6.1` item 12. `[A2 docs/decisions.md · the `A70`–`A74` row — the claimed realm is Node ESM | declared parameter semantics]`

---

## §3. A PLATFORM artefact's declared fields — `PAR-PUB-17` … `PAR-PUB-24`

**EACH ROW APPLIES TO EACH OF THE FIVE PLATFORM ARTEFACTS, AND EACH ROW'S DOMAIN IS PER-ARTEFACT WHERE THE VALUE DIFFERS BY TARGET.**

### §3.1 `PAR-PUB-17` — a platform artefact's `name`

- **Kind:** `parameter`. **Unit:** a registry identity.
- **Domain:** **one of the five declared names, spelled EXACTLY as `resolution.md §3.1`'s table prints it, its scope `@provident-storeroom` and its second segment `js-<target>-<arch>[-<toolchain>]`.**
- **Outside values:** **a sixth name** → **REFUSED**; **an unscoped name** → **REFUSED**; **a name whose scope is not `@provident-storeroom`** → **REFUSED**; **a name dropping a suffix its artefact carries** (`-gnu` or `-msvc`) → **REFUSED**; **the alternative literal reading `@provident-storeroom/<label>[-<toolchain>]`** → **REFUSED: the five spellings read identically in all five homes**.
- **Supplier:** the architect (the scope and the ruling), the implementer (the manifest byte). **Evaluator:** `S-SCOPE`. **Observable:** the five keys in the main package's `optionalDependencies`, the five platform manifests' `name` fields, and the entry's construction.
- **Home:** `§3.1`. **Cited:** `contract.md §1.3`; `resolution.md §3.1`; `distribution.md §3.2` item 1. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-15` | declared parameter semantics]`

**⟶ RECONCILED 2026-10-11 — THE `A86` SCOPE PASS (`role_spec_writer`): `PAR-PUB-17`'S DOMAIN, RE-EMITTED WITH ITS AS-FILED SPELLING AND RE-READ AT THE NEW SCOPE.** `RCA-8(d)` ANNOTATE-BESIDE: **the row above stands BYTE-FOR-BYTE — its kind, its unit, its supplier, its evaluator, its observable, its home and its citations — and it is read THROUGH this clause; THIS clause is a PURE INSERTION and it MINTS NO ROW: the set stays `34` rows, and `PAR-PUB-17`'s own number and home are UNMOVED.** **THE RULING IS `A86` — *"Change org to `@auspicion`"* — at its operative default `A86`(a): THE SCOPE SEGMENT ALONE IS REPLACED.**
- **The as-filed domain, RE-EMITTED VERBATIM: *"one of the five declared names, spelled EXACTLY as `resolution.md §3.1`'s table prints it, its scope `@provident-storeroom` and its second segment `js-<target>-<arch>[-<toolchain>]`."***
- **The OPERATIVE domain: one of the five declared names, spelled EXACTLY as `docs/specs/storeroom-publish/resolution.md §3.1`'s table prints it, ITS SCOPE `@auspicion` and its second segment `js-<target>-<arch>[-<toolchain>]`.** **The five operative values are `@auspicion/js-linux-x64-gnu` · `@auspicion/js-linux-arm64-gnu` · `@auspicion/js-darwin-x64` · `@auspicion/js-darwin-arm64` · `@auspicion/js-win32-x64-msvc`** (`docs/specs/storeroom-publish/resolution.md §3.1`).
- **The outside values, re-stated with their declared answers, THE OLD SCOPE AMONG THEM:** **a sixth name** → **REFUSED**; **an unscoped name** → **REFUSED**; **a name whose scope is not `@auspicion`** → **REFUSED** — **and its converse is now a REFUSAL TOO: a name whose scope IS `@provident-storeroom`** → **REFUSED: it is the scope this ruling moves the five away from, and a manifest spelling it is the stale identity rather than a lawful one**; **a name dropping a suffix its artefact carries** (`-gnu` or `-msvc`) → **REFUSED**; **the alternative literal reading `@auspicion/<label>[-<toolchain>]`** → **REFUSED: the five spellings read identically in all five homes, and the second segment `js-…` is UNMOVED by this ruling, which replaces the scope segment ALONE.**
- **AND THE PRICED ALTERNATIVE, CARRIED AND UNAPPLIED: `A86`(b) — `@auspicion/storeroom-js-<label>` — is a NAME the five could carry at the cost of a longer name and of reading differently from the main package's `provident-storeroom`; its reversal is the SAME ONE LINE and MUST BE TAKEN BEFORE THE FIRST PLATFORM PUBLISH, because after it a scoped name is spent** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-15`'s `alt` cell; `docs/specs/storeroom-publish-proposal.md §12`).
- **The supplier, the evaluator and the observable are UNMOVED:** **the architect (the scope and the ruling), the implementer (the manifest byte)** · **`S-SCOPE`** · **the five keys in the main package's `optionalDependencies`, the five platform manifests' `name` fields, and the entry's construction.** `[A1 docs/specs/storeroom-publish-proposal.md §12 · `A86`(a) — the five platform names' scope segment replaced, the second segment unmoved | declared parameter semantics]`

**⟶ RECONCILED 2026-10-11 AGAIN — THE `A88` PROJECT-TOKEN PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING *"Change the platform package names to specify the project they are for, this organization will be used for multiple"* (`docs/specs/storeroom-publish-proposal.md` `§14`; `docs/decisions.md` · the ACTIVE `A88` row of 2026-10-11): `PAR-PUB-17`'S DOMAIN IS RE-EMITTED AT ITS AS-FILED SPELLING AND RE-READ AT THE PROJECT TOKEN, AND EVERY OUTSIDE VALUE'S DECLARED ANSWER IS RE-STATED WITH THE SUPERSEDED SPELLING AMONG THE REFUSED VALUES.** `RCA-8(d)` ANNOTATE-BESIDE: **the row above and both clauses under it stand BYTE-FOR-BYTE — its kind, its unit, its supplier, its evaluator, its observable, its home and its citations — and each is read THROUGH this clause; THIS clause is a PURE INSERTION and it MINTS NO ROW: the set stays `34` rows, and `PAR-PUB-17`'s own number and home are UNMOVED.**
- **The as-filed domain, RE-EMITTED VERBATIM: *"one of the five declared names, spelled EXACTLY as `resolution.md §3.1`'s table prints it, its scope `@provident-storeroom` and its second segment `js-<target>-<arch>[-<toolchain>]`."***
- **THE OPERATIVE DOMAIN, AND THE ONE THE `A86` CLAUSE ABOVE PRINTS IS NOW THE SUPERSEDED READING: one of the five declared names, spelled EXACTLY as `docs/specs/storeroom-publish/resolution.md §3.1`'s table's OPERATIVE column prints it — its SCOPE `@auspicion`, its PROJECT TOKEN `provident-storeroom` INSERTED before the language marker, and its second segment `provident-storeroom-js-<target>-<arch>[-<toolchain>]`.** **The five operative values are `@auspicion/provident-storeroom-js-linux-x64-gnu` · `@auspicion/provident-storeroom-js-linux-arm64-gnu` · `@auspicion/provident-storeroom-js-darwin-x64` · `@auspicion/provident-storeroom-js-darwin-arm64` · `@auspicion/provident-storeroom-js-win32-x64-msvc`** (`docs/specs/storeroom-publish/resolution.md §3.1`; `docs/specs/storeroom-publish/contract.md §1.3`).
- **The outside values, re-stated with their declared answers, WITH THE RETIRED SCOPE, THE SUPERSEDED SPELLING AND A THIRD ORG ALL REFUSED:** **a sixth name** → **REFUSED**; **an unscoped name** → **REFUSED**; **a name whose scope is not `@auspicion`** → **REFUSED** — **and its converse is a REFUSAL TOO: a name whose scope IS `@provident-storeroom`** → **REFUSED: it is the scope `A86` moved the five away from, and a manifest spelling it is the stale identity rather than a lawful one**; **a name whose spelling is `@auspicion/js-<label>`** → **REFUSED: the language-marker-only shape that was OPERATIVE from the `A86` pass to this one and that `A88`(a) SUPERSEDES, so a manifest, an entry or an attempt set still carrying it is a FINDING**; **a third org's scope (neither `@auspicion` nor `@provident-storeroom`)** → **REFUSED**; **a name dropping a suffix its artefact carries** (`-gnu` or `-msvc`) → **REFUSED**; **the alternative literal reading `@auspicion/provident-storeroom-<label>[-<toolchain>]`** → **REFUSED: the five spellings read identically in all five homes, and the LANGUAGE MARKER `js-…` is UNMOVED by this ruling, which inserts the project token BESIDE it rather than in place of it.**
- **AND THE PRICED ALTERNATIVE, CARRIED, PRICED AND UNAPPLIED: `A88`(b) — `@auspicion/provident-storeroom-<label>`, the PROJECT TOKEN REPLACING the language marker — is a NAME the five could carry at the cost of the marker that survives for a reader meeting a platform name without the main package beside it; its reversal is the SAME ONE LINE and MUST BE TAKEN BEFORE THE FIRST PLATFORM PUBLISH, because after it a scoped name is spent** (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-29`; `docs/specs/storeroom-publish-proposal.md §14`). **AND `A86`(b) — `@auspicion/storeroom-js-<label>` — IS SUPERSEDED BY `A88` AND IS ASSERTED BY NO CELL OF THIS SET.**
- **AND THE OUTSIDE-VALUE COUNT IS RE-PRINTED WITH ITS TERMS, BECAUSE THIS PASS MOVES `3` OF THEM AND STRIKES NONE:** **the as-filed row's own `5` members are RE-EMITTED VERBATIM so the movement is not read as a restatement — *"a sixth name"* → REFUSED; *"an unscoped name"* → REFUSED; *"a name whose scope is not `@provident-storeroom`"* → REFUSED; *"a name dropping a suffix its artefact carries (`-gnu` or `-msvc`)"* → REFUSED; *"the alternative literal reading `@provident-storeroom/<label>[-<toolchain>]`"* → REFUSED.** **THE THREE THAT MOVED, EACH WITH WHAT IT NOW READS: the third member's scope (`@provident-storeroom` → `@auspicion`, so the member refuses a foreign scope AND names the retired one beside it); the fifth member's alternative literal reading (`@provident-storeroom/<label>` → `@auspicion/provident-storeroom-<label>`, the project token with the language marker DROPPED, which is now `A88`(b)'s own spelling and so is refused BOTH as an alternative literal reading and as the priced alternative); and the two members the `A86` pass added beside the third (the old-scope converse and a third org), both KEPT.** **AND THE ONE MEMBER THIS PASS ADDS: the superseded `@auspicion/js-<label>` spelling, REFUSED BY NAME rather than left to be caught only as a disagreement across the five homes.** **SO THE MEMBER SET IS `6` AT THIS READING — a sixth name · an unscoped name · a name whose scope is not `@auspicion` (its converse the retired `@provident-storeroom`, and a third org among them) · the superseded `@auspicion/js-<label>` spelling · a name dropping a carried suffix · the alternative literal reading — and the arithmetic with the as-filed row is `5` as-filed members PLUS `3` re-readings and `1` addition, with NO member struck: `5` + `1` = `6` ✓.**
- **The supplier, the evaluator and the observable are UNMOVED:** **the architect (the SCOPE, the RULING and now the PROJECT TOKEN), the implementer (the manifest byte)** · **`S-SCOPE`** · **the five keys in the main package's `optionalDependencies`, the five platform manifests' `name` fields, and the entry's construction.** `[A1 docs/decisions.md · the ACTIVE `A88` row of 2026-10-11; A1 docs/specs/storeroom-publish-proposal.md §14 · `A88`(a)(b) — the project token INSERTED before the language marker, and the priced shorter reading | declared parameter semantics]`

### §3.2 `PAR-PUB-18` — a platform artefact's `version`

- **Kind:** `parameter`. **Unit:** a semantic version string.
- **Domain:** **the MAIN package's own `version`, character for character.**
- **Outside values:** **a version other than the main package's** → **REFUSED by the coupling rule**; **an absent field** → **REFUSED**; **a version differing between two platform artefacts** → **REFUSED**.
- **Supplier:** the implementer, from the tag. **Evaluator:** `S-TAG`. **Observable:** the five platform manifests' `version` fields, read against the main package's.
- **Home:** `§3.2`. **Cited:** `release.md §2.2`; `distribution.md §3.2` item 2. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-10` | declared parameter semantics]`

### §3.3 `PAR-PUB-19` / `PAR-PUB-20` — a platform artefact's `os` and `cpu`

- **Kind:** `parameter` (each). **Unit:** an install-skip filter token pair.
- **Domain:** **`os` ∈ {`linux`, `darwin`, `win32`}, per artefact** (`linux` for rows 1–2, `darwin` for rows 3–4, `win32` for row 5); **`cpu` ∈ {`x64`, `arm64`}, per artefact** (`x64` for rows 1, 3, 5; `arm64` for rows 2, 4). **The pair is an INSTALL-SKIP FILTER and NOT the loader's key.**
- **Outside values:** **a `libc` token or a musl/gnu token in either field** → **REFUSED: the format's field set carries `os` and `cpu` and cannot express a C library, and no clause of this unit declares a libc mechanism**; **a field absent** → **REFUSED: the artefact would then be installable everywhere**; **a pair matching no declared target** → **REFUSED**; **an arch the target's artefact was not built for** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-PLATFORM`; `S-MANIFEST`. **Observable:** the five manifests' `os` and `cpu` fields, read against `resolution.md §4.1`'s table.
- **Home:** `§3.3`. **Cited:** `distribution.md §3.2` items 3–4. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-8` | declared parameter semantics]`

### §3.4 `PAR-PUB-21` — a platform artefact's `files`, and its exposed `.node` path

- **Kind:** `parameter`. **Unit:** a set of published paths, and one path inside it.
- **Domain:** **the artefact's own allowlist carries ITS `.node` (at its package root, named with the crate's declared target name `storeroom_js_binding` and the `.node` extension) AND ITS LICENCE COPY. The `.node` path is INSIDE the platform artefact and is NOT a subpath of the main package.**
- **Outside values:** **an allowlist omitting the `.node`** → **REFUSED: rung one could not load it**; **an allowlist omitting the licence copy** → **REFUSED: the artefact would ship no notice**; **a `.node` for another target** → **REFUSED**; **an `exports` map of the platform artefact exposing a deep subpath to the `.node` from a consumer's own graph** → **REFUSED: the reach is rung one's, by the package NAME**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`; `S-RESOLVE`. **Observable:** the platform manifest's `files`, and the packed platform tarball's own listing.
- **Home:** `§3.4`. **Cited:** `distribution.md §3.2` items 5–6. `[A1 | declared parameter semantics]`

### §3.5 `PAR-PUB-22` — a platform artefact's `license` field and its notice

- **Kind:** `parameter`. **Unit:** a licence token, and a text file.
- **Domain:** **the field reads `AGPL-3.0`, and the artefact's `files` carries a copy of the repository's own `LICENSE`, byte-for-byte.**
- **Outside values:** **an absent field, and an absent copy** → **REFUSED, each: the artefact would ship no notice or no declared licence**; **`AGPL-3.0-or-later` at the field** → **REFUSED: it would be a third spelling**; **a reference instead of a copy** → **REFUSED: an install of the artefact ALONE would carry no licence text**; **a `LICENSE` file committed under `bindings/js/`** → **REFUSED: that path is the refused arm**.
- **Supplier:** the implementer; the repository's `LICENSE` is the architect's act. **Evaluator:** `S-LICENCE`. **Observable:** each platform manifest's `license` field and the artefact's own licence copy.
- **Home:** `§3.5`. **Cited:** `contract.md §2.3`; `distribution.md §4.2`. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-11` | declared parameter semantics]`

### §3.6 `PAR-PUB-23` — a platform artefact's `engines`

- **Kind:** `parameter`. **Unit:** a runtime version range.
- **Domain:** **`{ "node": ">=18.0.0" }`, the same floor the main package declares.**
- **Outside values:** **a different floor between the main package and a platform artefact** → **REFUSED**; **an absent field** → **REFUSED**; **a Node-API floor** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the five platform manifests' `engines` fields, read against the main package's.
- **Home:** `§3.6`. **Cited:** `distribution.md §3.2` item 7. `[A3 docs/specs/storeroom-js/package.md §1.4 item 1 | declared parameter semantics]`

### §3.7 `PAR-PUB-24` — a platform artefact's `publishConfig`

- **Kind:** `parameter`. **Unit:** a publish-time registry directive.
- **Domain:** **`{ "access": "public" }`.**
- **Outside values:** **an absent field** → **REFUSED: a scoped name defaults to private, and the main package's install would then fail to resolve the five**; **`"restricted"`** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the five platform manifests' `publishConfig` fields.
- **Home:** `§3.7`. **Cited:** `distribution.md §3.2` item 9. `[A2 docs/decisions.md · the `A82`/`A83` row — the public release | declared parameter semantics]`

---

## §4. The resolution's and the manifests' declared parameters — `PAR-PUB-25` … `PAR-PUB-34`

### §4.1 `PAR-PUB-25` — the five declared platform names, and the closed key set

- **Kind:** `vocabulary-token`. **Unit:** a closed set of five names.
- **Domain:** **exactly the five; the entry `require`s one of them by SELECTION from the closed table and never computes one.**
- **Outside values:** **a name outside the five** → **REFUSED: `C-1` closes the set, so `W-3` cannot exist**; **a computed name assembled from tokens** → **REFUSED**; **a speculative fallback on an uncovered pair** → **REFUSED**; **a sixth name** → **REFUSED: a bounded amendment, never a build flag**.
- **Supplier:** the architect (the scope and the ruling), the implementer (the entry's table). **Evaluator:** `S-KEYSET`; `S-SCOPE`. **Observable:** the entry's table's own five rows, read against the five manifests and the main package's five pins.
- **Home:** `§4.1`. **Cited:** `contract.md §1.3`; `resolution.md §3`. `[A1 docs/specs/storeroom-publish-proposal.md §9 · `A84`(a)(c) | declared parameter semantics]`

### §4.2 `PAR-PUB-26` — a platform artefact's manifest SOURCE path

- **Kind:** `parameter`. **Unit:** a tracked directory.
- **Domain:** **`bindings/js/platforms/<label>/`, one per label: `linux-x64` · `linux-arm64` · `darwin-x64` · `darwin-arm64` · `win32-x64`.**
- **Outside values:** **a platform manifest under another directory** → **REFUSED**; **a sixth platform directory** → **REFUSED**; **a binary committed inside a platform directory** → **REFUSED: no binary is ever committed**; **a platform manifest inside the main package's own directory** → **REFUSED: the main package's allowlist carries three files and no manifest of another identity**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the five tracked manifests' paths.
- **Home:** `§4.2`. **Cited:** `distribution.md §3.1`. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-23` | declared parameter semantics]`

### §4.3 `PAR-PUB-27` — the workflow file's PATH

- **Kind:** `parameter`. **Unit:** a tracked file path.
- **Domain:** **`/.github/workflows/publish.yml`, from the repository root.**
- **Outside values:** **a workflow outside `/.github/workflows/`** → **REFUSED**; **a publish step driven by a script no tracked file declares** → **REFUSED**; **a token, secret or credential written into any tracked byte** → **REFUSED**.
- **Supplier:** the implementer (`Q3-5`). **Evaluator:** `S-TAG`; `S-MANIFEST`. **Observable:** the file's own path, and its declared inputs matched to `release.md §1`.
- **Home:** `§4.3`. **Cited:** `contract.md §3.1`; `release.md §1.1`. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-23` | declared parameter semantics]`

### §4.4 `PAR-PUB-28` — the CI's five per-target runners

- **Kind:** `parameter`. **Unit:** five host-provided runner labels.
- **Domain:** **one per target: `ubuntu-24.04` · `ubuntu-24.04-arm` · `macos-13` · `macos-14` · `windows-2022`.**
- **Outside values:** **one runner serving two targets** → **REFUSED: a cross-compiled artefact is a build this matrix did not perform**; **a runner absent from the table** → **REFUSED**; **a self-hosted runner** → **REFUSED: no clause declares one**.
- **Supplier:** the implementer (`Q3-5`). **Evaluator:** `S-TAG`. **Observable:** the workflow's job matrix, read against this row's table.
- **Home:** `§4.4`. **Cited:** `release.md §1.2`. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-7` | declared parameter semantics]`

### §4.5 `PAR-PUB-29` — the tag, and the version it fixes

- **Kind:** `parameter`. **Unit:** a git tag.
- **Domain:** **`v<major>.<minor>.<patch>`, whose version is the MAIN package's `version`.**
- **Outside values:** **an untagged commit's head** → **REFUSED: no publication happens from an untagged commit**; **a tag whose version differs from the six manifests'** → **REFUSED**; **a tag re-cut on the SAME version after a failure** → **REFUSED where the main package already published (the immutability arm), and LAWFUL before it (the in-place arm)**.
- **Supplier:** the architect. **Evaluator:** `S-TAG`. **Observable:** the tag, and the six manifests' `version` fields.
- **Home:** `§4.5`. **Cited:** `contract.md §3.2`; `release.md §2.1`. `[A3 docs/specs/storeroom-js/contract.md §0.2 · `DD-42`; A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-5` | declared parameter semantics]`

### §4.6 `PAR-PUB-30` — the module-relative addon path at rung two

- **Kind:** `parameter`. **Unit:** a filesystem path inside the installed package.
- **Domain:** **`build/Release/storeroom_js_binding.node`, constructed from the entry module's own location (`import.meta.url`'s directory) joined with `build`, `Release` and the crate's declared target name with the `.node` extension.**
- **Outside values:** **a path relative to the process's working directory** → **REFUSED**; **an environment-variable override** → **REFUSED**; **a parent-directory search** → **REFUSED**; **a second `.node` path** → **REFUSED**; **a path derived from the consumer's own tree** → **REFUSED**; **an absent file in a published install** → **NOT a refusal: it is the DECLARED ABSENT FORM's normal case, because a `files`-restricted tarball does not carry `build/Release`**.
- **Supplier:** the implementer. **Evaluator:** `S-RESOLVE`; `S-INPLACE`. **Observable:** the path construction read from the entry's own bytes, and the in-place loop's resolution.
- **Home:** `§4.6`. **Cited:** `contract.md §1.1`; `resolution.md §2.1` item 2. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-20` | declared parameter semantics]`

### §4.7 `PAR-PUB-31` — the runtime platform key

- **Kind:** `parameter`. **Unit:** a pair of runtime strings.
- **Domain:** **`process.platform` × `process.arch`, whose selection is a TOTAL FUNCTION returning one of the five declared names or the token `NOT COVERED`.**
- **Outside values, and their declared answers:** **any pair outside the five** → **`NOT COVERED`, and the declared answer is rung two then the single declared absence, with RUNG ONE NOT ATTEMPTED**; **a pair a future runtime reports and this table does not list** → **`NOT COVERED` by the table's own last row, so no pair reaches a speculative key**; **a musl runtime on `linux` · `x64` or `linux` · `arm64`** → **NOT a domain value: the pair is covered, so the `-gnu` name is attempted and the resulting `dlopen` failure is answered by the one declared arm**; **a `libc`-derived value in the key** → **REFUSED: no clause of this unit declares a libc mechanism**.
- **Supplier:** the runtime. **Evaluator:** `S-PLATFORM`; `S-MUSL`. **Observable:** the table's own answer for a given pair, and the rung the answer reaches.
- **Home:** `§4.7`. **Cited:** `contract.md §1.2`; `resolution.md §4.1`. `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(7) | declared parameter semantics]`

### §4.8 `PAR-PUB-32` — the version READ

- **Kind:** `return-field` (it consumes the addon's own report and the manifest's `version`). **Unit:** two version strings, compared.
- **Domain:** **exact string equality between the addon's own reported version and the main package's `version` — at RUNG ONE ALONE.**
- **Outside values, and their declared answers:** **a different string** → **THE SINGLE DECLARED FAILURE ARM** (`FilePathUnreachable`, the rung-one artefact's own path as its subject), **and NO fallback to rung two**; **an empty string** → **the same arm**; **a value that is not a string** → **the same arm**; **an `addon.version` that is not callable** → **the same arm**; **a version read attempted at rung two** → **REFUSED: the read does not apply where no rung-one load occurs**; **a comparison by range or by major** → **REFUSED: the predicate is exact equality**; **a mismatch ACCEPTED** → **REFUSED: it would leave `B-1`'s detection absent**; **a second failure shape for the state** → **REFUSED**.
- **Supplier:** the addon (its self-report), the manifest (the package's own `version`). **Evaluator:** `S-VERSION`; `S-ONEARM`. **Observable:** the load's own outcome for a substituted artefact, one drive per direction.
- **Home:** `§4.8`. **Cited:** `contract.md §1.5`; `resolution.md §5.1`. `[A1 docs/specs/storeroom-publish-proposal.md §9 · `A84`(b); A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-17`–`PUB-DD-19` | declared parameter semantics]`

### §4.9 `PAR-PUB-33` — the arm's `message`, and WHO AUTHORS it

- **Kind:** `return-field` (it is what the arm's `message` member carries). **Unit:** a string, authored by the store's generator or reproduced from its clause.
- **Domain:** **THE TWO-ARM SPLIT, ON THE REACHABILITY OF THE STORE'S GENERATOR — which is reached ONLY through the addon: (a) WHERE AN ARTEFACT LOADED FAR ENOUGH TO EXPOSE `errorMessage`, THE STORE'S OWN GENERATOR AUTHORS THE STRING; (b) WHERE NO ARTEFACT DID — the `absent` and `present-unloadable` states — THE ENTRY REPRODUCES THE GENERATOR'S OWN CLAUSE BYTE-FOR-BYTE AT THE DECLARED SUBJECT.**
- **Outside values, and their declared answers:** **a package-authored message** → **REFUSED: the string becomes the package's own text, so the single-author rule falls and the two arms can drift with nothing comparing them**; **a hand-authored template bearing the generator's words** → **REFUSED: the reproduction is the generator's clause, and a re-spelled clause is a FINDING**; **a message string not derivable from the store's own generator's clause** → **REFUSED**; **a package-minted status** → **REFUSED: the status is the store's `FilePathUnreachable` member carried VERBATIM**; **a second failure shape for the string's home** → **REFUSED**; **no message at all where the generator is unreachable** → **REFUSED: a two-member form cannot carry its absence, and the absent consumer would read less than a substituted one**; **the rendering WITHOUT the subject's apostrophes** → **REFUSED: the declared rendering is the artefact's own, `'<subject>' is not reachable at construction, …`**.
- **Supplier:** the addon (the generator, where reachable) and the entry (its reproduction of the generator's clause where it is not). **Evaluator:** `S-ONEARM`; `S-TAXONOMY`. **Observable:** the arm's own `message` in each state, asserted against the generator's own rendering and against the artefact's own `errorMessage` where the artefact loaded.
- **Home:** `§4.9`. **Cited:** `contract.md §1.4` item 6; `contract.md §1.4` item 7; `resolution.md §5.3` item 6; `resolution.md §5.3a`. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-25`; A1 docs/specs/storeroom-publish-proposal-review.md §1.1 · the implementer's `CF-1` | declared parameter semantics]`

**AND THE THIRD TRIGGER CONDITION OF ARM (b), DECLARED BECAUSE THE TWO-ARM SPLIT DID NOT COVER A THIRD STATE — THE LOADED ARTEFACT THAT CARRIES NO USABLE GENERATOR.** **The domain above splits the authoring by the REACHABILITY OF THE GENERATOR; that reachability has THREE conditions under which it fails, and the third is not the absent or the unloadable artefact but ONE THAT LOADED:** an artefact that loaded at rung one and whose own `version` did not match, while its `errorMessage` is absent, or its own generator throws, or it answers a value that is not a `string`. **The declared answer is arm (b) — the generator's own clause reproduced byte-for-byte — AND ITS SUBJECT IS RUNG ONE'S OWN PATH ALONE, never the both-paths join of `PAR-PUB-34`, because at this state only rung one was tried.** **A `message` at this state that appends the rung-two path, or that names the module-relative addon path in place of the rung-one artefact's own, is a value OUTSIDE this row's domain.** **Its `alt` is priced at `contract.md §1.4` item 7: a second failure shape for the state, REFUSED for the reason given there.** **AND THIS CLAUSE ADDS NO ROW: the set stays `34` rows and `§1`'s arithmetic stands as printed** (`docs/specs/storeroom-publish/contract.md §1.4` item 7; `resolution.md §5.3a`). `[A1 — the sub-case is a declaration of this part's own row, read with the clause that pins it | declared parameter semantics]`

### §4.10 `PAR-PUB-34` — the both-paths subject's JOIN

- **Kind:** `vocabulary-token` (the join is a rendering of two subjects, not a value the package computes). **Unit:** a separator, an order, and the generator's one subject slot.
- **Domain:** **THREE DECLARED PARTS, WHERE BOTH RUNGS WERE TRIED AND NEITHER YIELDED A LOADABLE ARTEFACT: (a) the separator is `', '`; (b) the order is RUNG ONE FIRST and RUNG TWO SECOND, the order the load path tried them; and (c) each path is kept inside the generator's own `'<subject>'` slot, the declared rendering being `''<rung one's resolved name>', '<rung two's module-relative path>'' is not reachable at construction, the path must exist or the application must be able to write it`.**
- **Outside values, and their declared answers:** **a separator other than `', '`** → **REFUSED**; **an order other than rung one then rung two** → **REFUSED: it would state a walk the loader did not take**; **a rendering that quoted the joined pair once** → **REFUSED**; **a joined spelling that is not the generator's own subject slot mapped across the two paths** → **REFUSED**; **a second failure shape minted for the two-subject case** → **REFUSED**; **a third subject, a second `.node` path or a computed name inside the join** → **REFUSED**; **WHERE ONLY ONE RUNG WAS TRIED (an uncovered key, whose rung one is never attempted)** → **NOT a join at all: the subject is rung two's path alone, and the join does not apply**.
- **Supplier:** the entry (the join's rendering), the store's generator (the slot the join is rendered into). **Evaluator:** `S-ONEARM`. **Observable:** the arm's `message` at a covered key with both rungs missed, read for both subjects, for their order and for their separator.
- **Home:** `§4.10`. **Cited:** `contract.md §1.4` item 2; `contract.md §1.5` item 6; `resolution.md §5.3b`. `[A1 docs/specs/storeroom-publish/contract.md §0.3 · `PUB-DD-26`; A1 docs/specs/storeroom-publish-proposal-review.md §1.1 · the implementer's `CF-2` | declared parameter semantics]`

---

## §5. What this part does not declare

1. **IT DECLARES NO STORE PARAMETER** — the store's rows are `PAR-1`…`PAR-14` at their own home, cited and never restated.
2. **IT DECLARES NO JS-SURFACE PARAMETER** — the JS unit's rows are `PAR-JS-1`…`PAR-JS-18` at their own home, cited and never restated; **this part's rows are the RESOLUTION's and the MANIFESTS' own.**
3. **IT DECLARES NO REGISTER ROW** — a parameter row is NOT a register row, the register's cap is `≤ 8` and holds at `8 ≤ 8`, and this set's `34` rows are uncapped.
4. **IT PUTS NO QUESTION TO THE ARCHITECT** — every outside value's answer above is the answer a clause of this unit or of a sibling directory already fixes.
5. **AND IT ADOPTS NO IDENTIFIER FROM OUTSIDE THIS PROJECT**: `napi-rs` and `napi-sys` are unnamed here as everywhere else in this directory, so no second dossier row is owed (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-16`).

---

**END OF THIS PART.** **Its `§1` index maps each row to the clause that declares it, and its `§2`–`§4` rows carry each parameter's kind, unit, domain, outside values, declared answers, supplier, evaluator and observable — DECLARING NOTHING the contract does not already carry.**

**⟶ INSERTED 2026-10-11 — THE RANGE-ONLY RECONCILIATION (`role_spec_writer`, the bounded bootstrap-clause pass): TWO `PUB-DD` ROWS ARE ADDED, `0` `PAR-PUB` ROWS ARE ADDED, AND ONE OUTSIDE VALUE IS RE-READ WITH THE BOOTSTRAP NAMED.** `RCA-8(d)` ANNOTATE-BESIDE: **every byte above — the head's `KIND` and scope clauses, `§1`'s relocated index and its `34`-row arithmetic, `§2`–`§4`'s rows with their domains, outside values, declared answers, suppliers, evaluators, observables, homes and citations, and the `END OF THIS PART` foot — STANDS BYTE-FOR-BYTE and is read THROUGH this clause; THIS clause is a PURE INSERTION at the file's foot, it MINTS NO ROW, MOVES NO ROW, RENUMBERS NO `§` and re-decides no rule.** **THIS PASS RAN NOTHING; the `1,178`-byte measurement it names is quoted from the dry run the brief reports, at the site that carries it.**

1. **THE TWO CELLS THAT CITE THE `PUB-DD` RANGE ARE READ FORWARD, AND NEITHER IS RE-SPELLED.** **`§1`'s index cites the `PUB-DD` family at `PUB-DD-1`…`PUB-DD-26` and `§4.3`'s home line cites `PUB-DD-23`; the bounded bootstrap-clause pass inserts `PUB-DD-27` (the FIRST PUBLISH OF THE SIX NAMES — the token-authenticated bootstrap, its hand-reproduced assembly, its dry-run instrument, its price and its reversal) and `PUB-DD-28` (the FIRST RELEASE'S PROVENANCE at `0.1.0`, DECLARED-NOT-ATTESTED), so the family's OPERATIVE range is `PUB-DD-1`…`PUB-DD-28` (`26 + 2 = 28` ✓).** **NO CELL OF THIS PART MOVES: the range is a citation rather than a row of this set** (`docs/specs/storeroom-publish/release.md §5`; `docs/specs/storeroom-publish/contract.md`'s bootstrap clause item `6`). `[A1 docs/specs/storeroom-publish/release.md §5` · `PUB-DD-27`, `PUB-DD-28` | cross-reference]`
2. **AND `PAR-PUB-27`'S THIRD OUTSIDE VALUE IS RE-READ WITH THE BOOTSTRAP NAMED, SO NO READER READS `release.md §5.2` AS SATISFYING OR BREACHING IT.** **THE CELL READS** *"**a token, secret or credential written into any tracked byte** → **REFUSED**"* **for the workflow file's path, and IT HOLDS BYTE-FOR-BYTE: the bootstrap's token is NEVER A TRACKED BYTE.** **`§5.1`'s interactive login writes no file of this repository at all, and `§5.2`'s temporary path is a `secrets.*` REFERENCE — which is why THAT route is priced and NOT recommended, and why adopting it would owe a bounded amendment of the four declarations `release.md §5.2` item `2` names BEFORE the first name is claimed** (`release.md §5.2`; `docs/specs/storeroom-publish/contract.md §2.5` item `4`; `PUB-DD-7`). **AND NO PASS OF THIS UNIT HOLDS, WRITES OR RUNS EITHER ROUTE.** `[A1 docs/specs/storeroom-publish/release.md §5.1` · `§5.2`; A1 `docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-28` | declared parameter semantics]`
3. **AND THE SET IS UNMOVED, WITH ITS ARITHMETIC RE-PRINTED SO THE NON-MOVEMENT IS READABLE WITHOUT A DIFF: `34` rows = `12` MAIN-package fields (`PAR-PUB-1`…`PAR-PUB-12`) + `3` DECLARED-ABSENT fields (`PAR-PUB-13`…`PAR-PUB-15`) + `1` realm field (`PAR-PUB-16`) + `8` PLATFORM-artefact fields (`PAR-PUB-17`…`PAR-PUB-24`) + `10` resolution/manifest-location parameters (`PAR-PUB-25`…`PAR-PUB-34`) — `12 + 3 + 1 + 8 + 10 = 34` ✓ — because THE BOOTSTRAP IS AN ACT RATHER THAN A DECLARED PARAMETER: it adds NO field to any manifest, NO key to the resolution, NO token to the load path and NO name to the closed five-name set, so it falls OUTSIDE this part's declared surface** (`docs/specs/storeroom-publish/release.md §5.1`; `§5.6`). **AND `§5`'s OWN FIVE ITEMS STAND UNMOVED: no store parameter, no JS-surface parameter, no register row, no question to the architect, and no identifier adopted from outside this project.** `[A1 | numeric or census claim]`
