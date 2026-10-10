# `parameter-semantics` — every declared parameter of the resolution and of the manifests, its domain, its outside values, and the declared answer for each

**KIND: `carrier`** — **and this part ALSO CARRIES ITS OWN AUTHORED ROWS, which are its admissible content under this unit's own part map row: the relocated `§6`-shaped INDEX below, plus the authored `PAR-PUB-1`…`PAR-PUB-32` rows.** **A citation to this part names its PATH plus the `§`-number**, because *a bare `§n` across two documents is not an edge*.

**AND ONE SCOPE STATEMENT, SO THIS PART IS NOT MISTAKEN FOR ANOTHER UNIT'S:** **the store's parameter rows are `PAR-1`…`PAR-14` and live at `docs/specs/storeroom-native/parameter-semantics.md`; the JS unit's are `PAR-JS-1`…`PAR-JS-18` and live at `docs/specs/storeroom-js/parameter-semantics.md`. THEY ARE CITED HERE AND NEVER RESTATED.** **This part's rows are `PAR-PUB-1`…`PAR-PUB-32` — the RESOLUTION's and the MANIFESTS' own declared parameters — and they are a SEPARATE, UNCAPPED surface that is NOT the typed register's** (`[A3 docs/specs/storeroom-js/parameter-semantics.md — the sibling set's own scope statement and its uncapped surface, cited as the form's precedent | requirement]`). **THE `≤ 8` CAP DOES NOT REACH THIS SURFACE: `32` rows are lawful because the cap is the REGISTER's, and a parameter row is not a register row.**

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

**ARITHMETIC, PRINTED WITH ITS TERMS: `32` rows = `12` MAIN-package fields (`PAR-PUB-1`…`PAR-PUB-12`) + `3` DECLARED-ABSENT fields (`PAR-PUB-13`…`PAR-PUB-15`) + `1` realm field (`PAR-PUB-16`) + `8` PLATFORM-artefact fields (`PAR-PUB-17`…`PAR-PUB-24`) + `8` resolution/manifest-location parameters (`PAR-PUB-25`…`PAR-PUB-32`) — **`12 + 3 + 1 + 8 + 8 = 32` ✓** — **and the set is UNCAPPED, because the `≤ 8` cap is the REGISTER's and no parameter row is a register row.** `[A1 | numeric or census claim]`

---

## §2. The MAIN package's declared fields — `PAR-PUB-1` … `PAR-PUB-16`

**EVERY ROW BELOW CARRIES ITS KIND, ITS UNIT, ITS DOMAIN, THE VALUES OUTSIDE IT, THE DECLARED ANSWER FOR EACH, ITS SUPPLIER, ITS EVALUATOR AND ITS OBSERVABLE.**

### §2.1 `PAR-PUB-1` — the main package's `name`

- **Kind:** `parameter`. **Unit:** the package's registry identity, a name.
- **Domain:** **exactly `provident-storeroom`** — the single unscoped identity the architect's ruling names.
- **Outside values, and their declared answers:** **a scoped spelling (`@provident-storeroom/…`)** → **REFUSED: the main package's unscoped identity is a ruling, and a scope would reverse it**; **the sibling directory's old identity (`@provident-storeroom/js`)** → **REFUSED: it is the identity the amendment moves, and it must not survive in the manifest, the seven self-referencing test files or the two blind rows**; **a name colliding with the store's crate** → **REFUSED**.
- **Supplier:** the architect (the identity), the implementer (the manifest byte). **Evaluator:** `S-SCOPE` and `S-MANIFEST`. **Observable:** the manifest's `name` field, read with the seven test files' specifier and the two blind rows.
- **Home:** `§2.1`. **Cited:** `docs/specs/storeroom-publish/contract.md §2.5`; `distribution.md §6.1` item 1. `[A2 docs/decisions.md · the `A82`/`A83` row of 2026-10-11 — *"public at provident-storeroom:0.1.0"* | declared parameter semantics]`

### §2.2 `PAR-PUB-2` — the main package's `version`

- **Kind:** `parameter`. **Unit:** a semantic version string.
- **Domain:** **the tag's own version — `0.1.0` for the first release and thereafter exactly the tag's `v<major>.<minor>.<patch>` value.**
- **Outside values:** **a version that differs from the tag's** → **REFUSED by the tag rule**; **a version differing from the five platform artefacts'** → **REFUSED by the coupling rule**; **an untagged commit's own version** → **REFUSED: no publication happens from an untagged commit**.
- **Supplier:** the architect (the tag), the implementer (the manifest byte). **Evaluator:** `S-TAG`. **Observable:** the manifest's `version` read against the tag and against the five platform manifests' `version`.
- **Home:** `§2.2`. **Cited:** `contract.md §3.2`; `release.md §2.2`. `[A3 docs/specs/storeroom-js/contract.md §0.2 · `DD-42` | declared parameter semantics]`

### §2.3 `PAR-PUB-3` — the main package's `files`

- **Kind:** `parameter`. **Unit:** a set of published paths.
- **Domain:** **exactly `index.mjs` · `README.md` · `index.d.ts`.**
- **Outside values:** **`build/Release`** → **REFUSED: the binary leaves the allowlist**; **any `.node`** → **REFUSED**; **a path absent from the tree** → **REFUSED: a listed file that does not exist publishes an incomplete tarball**; **a directory carrying the crate's sources** → **REFUSED**.
- **Supplier:** the implementer. **Evaluator:** `S-MANIFEST`. **Observable:** the manifest's `files` array and the packed tarball's own listing.
- **Home:** `§2.3`. **Cited:** `contract.md §2.1`; `distribution.md §2.1`. `[A1 docs/specs/storeroom-publish-proposal.md §11 · `A85`(1) | declared parameter semantics]`

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

## §4. The resolution's and the manifests' declared parameters — `PAR-PUB-25` … `PAR-PUB-32`

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

---

## §5. What this part does not declare

1. **IT DECLARES NO STORE PARAMETER** — the store's rows are `PAR-1`…`PAR-14` at their own home, cited and never restated.
2. **IT DECLARES NO JS-SURFACE PARAMETER** — the JS unit's rows are `PAR-JS-1`…`PAR-JS-18` at their own home, cited and never restated; **this part's rows are the RESOLUTION's and the MANIFESTS' own.**
3. **IT DECLARES NO REGISTER ROW** — a parameter row is NOT a register row, the register's cap is `≤ 8` and holds at `8 ≤ 8`, and this set's `32` rows are uncapped.
4. **IT PUTS NO QUESTION TO THE ARCHITECT** — every outside value's answer above is the answer a clause of this unit or of a sibling directory already fixes.
5. **AND IT ADOPTS NO IDENTIFIER FROM OUTSIDE THIS PROJECT**: `napi-rs` and `napi-sys` are unnamed here as everywhere else in this directory, so no second dossier row is owed (`docs/specs/storeroom-publish/contract.md §0.3` · `PUB-DD-16`).

---

**END OF THIS PART.** **Its `§1` index maps each row to the clause that declares it, and its `§2`–`§4` rows carry each parameter's kind, unit, domain, outside values, declared answers, supplier, evaluator and observable — DECLARING NOTHING the contract does not already carry.**
